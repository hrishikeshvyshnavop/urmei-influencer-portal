import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import AppShell from "./components/AppShell";
import Button from "./components/Button";
import RecentActivities from "./components/RecentActivities";
import TopProducts from "./components/TopProducts";
import ProfilePhoto from "./components/ProfilePhoto";
import SetupBanner from "./components/SetupBanner";
import { requestProductTour } from "./tour-status";
import { useHasShopItems, useIsPublishBlocked, useIsShopPublished } from "../shop/shop-status";
import { MAX_FAVORITES } from "../shop/limits";
import { loadPublishedAt, loadShopItems, saveShopItems } from "../shop/shop-items-store";
import { logShopActivity } from "../shop/activity-log";
import { StatsRow } from "../shop/components/StatsRow";
import { homeStatsRowEntries, productStatsHash } from "../shop/data/stats";
import ShopUrl from "./components/ShopUrl";
import { PRODUCTS } from "../shop/data/catalogue";
import { affiliateLinkFor, hasLiveLink } from "../shop/data/shop";
import type { Product, ShopItem } from "../shop/types";
import { AddToShopModal } from "../shop/components/AddToShopModal";
import { RequestSampleModal } from "../shop/components/RequestSampleModal";
import { WriteReviewModal } from "../shop/components/WriteReviewModal";
import { reviewForShopItem, saveCreatorReview } from "../shop/creator-reviews";
import {
  SAMPLE_REQUEST_STATUS_LABELS,
  loadSampleRequests,
  submitSampleRequest,
  type SampleRequest,
  type SampleShippingAddress,
} from "../shop/sample-requests";
import { BrowseOverlay } from "../shop/screens/BrowseOverlay";
import { ProductDetail, type ShopMode } from "../shop/screens/ProductDetail";
import { setShopItemCount } from "../shop/shop-status";
import { Toast } from "../shop/components/Toast";

const productImages = [
  { productId: "laneige-water-bank", image: "/urmei/home/product-1.png", title: "Water Bank Blue Hyaluronic Cream" },
  { productId: "cosrx-snail-96", image: "/urmei/home/product-2.png", title: "Advanced Snail 96 Mucin Power Essence" },
  { productId: "innisfree-green-tea-seed", image: "/urmei/home/product-3.png", title: "Green Tea Seed Hyaluronic Serum" },
  { productId: "sulwhasoo-first-care", image: "/urmei/home/product-4.png", title: "First Care Activating Serum" },
];

// Backfills the carousel once a curated product above has been added to the
// shop (and so is filtered out of "Recommended") — pulled from the wider
// catalogue so the section always has 4 items to show.
const recommendedFallbacks = PRODUCTS.filter(
  (product) => !productImages.some((item) => item.productId === product.id),
).map((product) => ({ productId: product.id, image: product.shopCardImage, title: product.name }));

const recommendedPool = [...productImages, ...recommendedFallbacks];

const questions = [
  ["Can I upload tutorials and reviews?", "Yes. You can add tutorials and product reviews to content linked from your shop."],
  ["Can I track my campaign performance?", "Campaign reporting will show reach, engagement, clicks, and attributed sales."],
  ["How many campaigns can I run?", "You can participate in every campaign for which your profile is eligible."],
  ["Do I need design skills to start?", "No. URMEI provides product assets and guided tools to help you publish."],
];

function ProductCard({ productId, image, title, onAdd, onViewDetails }: { productId: string; image: string; title: string; onAdd: (productId: string) => void; onViewDetails: (productId: string) => void }) {
  const product = PRODUCTS.find((item) => item.id === productId)!;
  return (
    <article className="min-w-[260px] flex-1 snap-start sm:min-w-[285px]">
      <button type="button" onClick={() => onViewDetails(productId)} aria-label={`View details for ${title}`} className="block w-full cursor-pointer overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark"><img src={image} alt={title} className="aspect-square w-full object-cover" /></button>
      <div className="flex flex-col gap-md-sm pt-[14px] pb-[14px]">
        <div className="flex flex-col gap-[2px]">
          <p className="text-body-xs font-medium text-portal-placeholder">{product.brand}</p>
          <h3 className="truncate text-body-md font-medium text-portal-text">{title}</h3>
          <p className="text-body-xs text-portal-muted">{product.variant}</p>
          <div className="flex items-center gap-2 pt-1 text-body-md font-medium">
            <span className="text-portal-text">{product.price}</span>
            <span className="flex w-fit items-center justify-center gap-xs rounded-[24px] bg-surface-secondary-300 px-sm py-xs text-body-xs text-text-secondary-900">
              <span className="font-medium text-text-secondary-1000">{product.commissionBadge}</span> Commission
            </span>
          </div>
        </div>
        <Button variant="portalOutline" className="w-full !rounded-md !border-border-outlined" onClick={() => onAdd(productId)}>Add to Shop</Button>
      </div>
    </article>
  );
}

/** Home's own toast state — the same shape the shop's `Toast` takes, so the
 *  blocked-favorite toast reads identically on both pages. */
type HomeToast = {
  message: string;
  variant?: "success" | "error";
  action?: { label: string; onClick: () => void };
};

/** Hoisted out of the toast's action object: assigning `window.location.hash`
 *  inside an object literal trips `react-hooks/immutability`. */
function goToShop() {
  window.location.hash = "#/shop";
}

function goToSamples() {
  window.location.hash = "#/samples";
}

function goToSampleRequest(id: string) {
  window.location.hash = `#/samples/${id}`;
}

export default function Home({
  firstVisit = false,
}: {
  firstVisit?: boolean;
}) {
  const hasShopItems = useHasShopItems();
  const isShopPublished = useIsShopPublished();
  const isPublishBlocked = useIsPublishBlocked();
  const [shopItems, setShopItems] = useState(loadShopItems);
  const favoriteShopItemCount = shopItems.filter((item) => item.favorite).length;
  const recommendedProducts = recommendedPool
    .filter((product) => !shopItems.some((item) => item.product.id === product.productId))
    .slice(0, 4);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [sampleRequests, setSampleRequests] = useState<SampleRequest[]>(loadSampleRequests);
  const [sampleTarget, setSampleTarget] = useState<Product | null>(null);
  const [reviewTarget, setReviewTarget] = useState<ShopItem | null>(null);
  const [toast, setToast] = useState<HomeToast | null>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const productsRef = useRef<HTMLDivElement>(null);

  const updateCarouselControls = () => {
    const carousel = productsRef.current;
    if (!carousel) return;
    setCanScrollBack(carousel.scrollLeft > 1);
    setCanScrollForward(
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
    );
  };

  useEffect(() => {
    const carousel = productsRef.current;
    if (!carousel) return;
    updateCarouselControls();
    const resizeObserver = new ResizeObserver(updateCarouselControls);
    resizeObserver.observe(carousel);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const scrollProducts = (direction: number) => {
    const carousel = productsRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: "smooth",
    });
  };

  /** The blocked-favorite toast, shown from both the add modal and the
   *  overlay's Add To Favorite. Its action can only reach the shop's All Picks
   *  tab from here — the favorites tab is local state inside the shop app —
   *  but that is where the badges and the "Remove from Favorite" menu live. */
  const showFavoriteSlotsFullToast = () => {
    setToast({
      message: "Product failed to add as Favorite",
      variant: "error",
      action: { label: "Manage Favorite", onClick: goToShop },
    });
  };

  /** Real shop-management actions for the product-detail overlay opened from
   *  this page's "Recommended Products" carousel — mirrors `shop/App.tsx`'s
   *  own toggle/remove/add-to-shop logic so the two entry points stay
   *  consistent, without navigating away from Home to reach them. */
  const toggleFavoriteFromHome = (item: ShopItem) => {
    // The cap is enforced here too, not just in the shop: this overlay can
    // favorite a product without ever opening My Shop, and four slots is few
    // enough to walk into from either side.
    if (!item.favorite && favoriteShopItemCount >= MAX_FAVORITES) {
      showFavoriteSlotsFullToast();
      return;
    }
    setShopItems((current) => {
      const next = current.map((row) => (row.id === item.id ? { ...row, favorite: !row.favorite } : row));
      saveShopItems(next);
      return next;
    });
    logShopActivity(item.favorite ? "product-unfeatured" : "product-featured", `${item.product.brand} ${item.product.name}`);
    setToast({ message: item.favorite ? "Product Removed From Favorite" : "Product Added to Favorites" });
  };

  const removeFromShopFromHome = (item: ShopItem) => {
    setShopItems((current) => {
      const next = current.filter((row) => row.id !== item.id);
      saveShopItems(next);
      setShopItemCount(next.length);
      return next;
    });
    logShopActivity("product-removed", `${item.product.brand} ${item.product.name}`);
    setViewingProduct(null);
  };

  const latestSampleRequestFor = (productId: string) =>
    sampleRequests
      .filter((request) => request.productId === productId)
      .sort((a, b) => b.requestedAt - a.requestedAt)[0];

  /** "Request sample" until one exists for this product, then its status —
   *  mirrors `shop/App.tsx`'s own helper so the two entry points read the
   *  same way regardless of which one a creator used. */
  const sampleActionLabelFor = (productId: string) => {
    const existing = latestSampleRequestFor(productId);
    return existing ? `Sample ${SAMPLE_REQUEST_STATUS_LABELS[existing.status].toLowerCase()}` : "Request sample";
  };

  /** Once a product already has a request, opens its order-summary page
   *  instead of a fresh request form — same reasoning as shop/App.tsx's
   *  openSampleFlow, so a creator can't submit a duplicate from here either. */
  const openSampleFlow = (product: Product) => {
    const existing = latestSampleRequestFor(product.id);
    if (existing) {
      goToSampleRequest(existing.id);
      return;
    }
    setSampleTarget(product);
  };

  const confirmSampleRequest = (input: { shippingAddress: SampleShippingAddress }) => {
    if (!sampleTarget) return;
    const request = submitSampleRequest({ product: sampleTarget, ...input });
    setSampleRequests((current) => [request, ...current]);
    setSampleTarget(null);
    setToast({
      message: "Sample request sent to Urmei for approval",
      action: { label: "View status", onClick: goToSamples },
    });
    logShopActivity("sample-requested", `${request.productBrand} ${request.productName}`);
  };

  const reviewActionLabelFor = (shopItemId: string) => (reviewForShopItem(shopItemId) ? "Edit review" : "Write a review");

  const confirmReview = (input: { comment: string; socialPostUrl?: string }) => {
    if (!reviewTarget) return;
    const isNew = !reviewForShopItem(reviewTarget.id);
    saveCreatorReview(reviewTarget.id, reviewTarget.product.id, input);
    setReviewTarget(null);
    setToast({ message: isNew ? "Review saved" : "Review updated" });
    if (isNew) logShopActivity("product-reviewed", `${reviewTarget.product.brand} ${reviewTarget.product.name}`);
  };

  const shopItemFor = (product: Product) => shopItems.find((row) => row.product.id === product.id);

  const shopModeFor = (product: Product): ShopMode | undefined => {
    const item = shopItemFor(product);
    if (!item) return undefined;
    return {
      favorite: item.favorite,
      variant: item.variant,
      onToggleFavorite: () => toggleFavoriteFromHome(item),
      onRemoveFromShop: () => removeFromShopFromHome(item),
      affiliateLink: affiliateLinkFor(item.product),
      onCopyLink: () => { navigator.clipboard?.writeText(affiliateLinkFor(item.product)).catch(() => {}); },
      // Same rule the shop uses: the link exists only once this product has
      // been on the live storefront.
      published: hasLiveLink(item, loadPublishedAt()),
      statsHref: productStatsHash(item.id, "home"),
    };
  };

  return (
    <AppShell
      className="bg-[#fffefd] text-portal-text"
      onShowTour={requestProductTour}
      onShowHelp={() => { window.location.hash = "#/help-center"; }}
    >

      <SetupBanner />

      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-8 lg:px-[120px]">
        <section className="overflow-hidden rounded-lg bg-portal-surface shadow-store-card">
          <div className="flex min-h-[208px] flex-col gap-2.5 bg-portal-surface px-6 py-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.03)] lg:px-8">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="Charlotte" />
              </div>
              <div>
                <div className="flex items-end gap-1.5">
                  <h1 className="text-body-xxl font-semibold">Charlotte</h1>
                  <span className="pb-1 text-body-sm font-medium text-portal-muted">@charlotte</span>
                </div>
                <p className="flex items-center gap-2 text-body-sm font-medium text-portal-muted"><img src="/urmei/home/follower.svg" alt="URMEI" className="h-[14px] w-[26px]" />445 Followers</p>
              </div>
            </div>
            <div className="flex gap-4 text-body-sm font-medium text-portal-muted">
              <span className="flex items-center gap-1"><img src="/urmei/home/tiktok-stat.svg" alt="TikTok" className="size-[14px]" />112.2K</span><span className="flex items-center gap-1"><img src="/urmei/home/instagram-stat.svg" alt="Instagram" className="size-[14px]" />15.4K</span>
            </div>
            <ShopUrl
              published={isShopPublished}
              variant="shop"
              unpublishedLabel={isPublishBlocked ? "Your store URL is currently disabled." : undefined}
            />
          </div>
          {!hasShopItems ? (
            <div className="flex flex-col items-start gap-5 rounded-[10px] border border-portal-surface bg-portal-light p-6 sm:flex-row sm:items-center sm:gap-10 lg:p-8">
              <div className="flex min-w-0 flex-1 items-center gap-6">
                <img src="/urmei/home/store.svg" alt="" className="size-16 shrink-0" />
                {/* A shop that was published and then emptied back out to zero
                    products (`isPublishBlocked`) is disabled rather than
                    never set up — same distinction the Shop URL card above
                    already makes — so it gets its own copy instead of the
                    first-time setup message. */}
                {isPublishBlocked ? (
                  <div className="min-w-0 flex-1"><h2 className="text-body-xxl font-medium">Your shop is disabled</h2><p className="text-body-md text-portal-muted">Add a product and publish your shop to enable it again.</p></div>
                ) : (
                  <div className="min-w-0 flex-1"><h2 className="text-body-xxl font-medium">Create online shop</h2><p className="text-body-md text-portal-muted">Curate your products and publish your shop to start earning.</p></div>
                )}
              </div>
              <Button variant="portal" className="w-full sm:w-auto" onClick={() => { window.location.hash = "#/shop"; }}>
                Setup Shop
              </Button>
            </div>
          ) : null}
          {hasShopItems && isShopPublished ? (
            // The same five totals the shop's own row shows, from the same
            // module — Home used to hardcode zeros and a "TOTAL PRODUCTS"
            // column the design has since dropped.
            <StatsRow stats={homeStatsRowEntries(shopItems)} />
          ) : null}
        </section>

        {!firstVisit && hasShopItems ? (
          <>
            <RecentActivities />
            {isShopPublished && shopItems.length >= 2 ? <TopProducts items={shopItems} /> : null}
          </>
        ) : null}

        <section className="py-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="track-section text-body-md font-medium uppercase">Recommended Products</h2>
            <div className="flex gap-2">
              <Button
                variant="portalOutline"
                aria-label="Previous products"
                onClick={() => scrollProducts(-1)}
                disabled={!canScrollBack}
                className="!size-10 !rounded-md !p-0 disabled:!border-portal-surface disabled:!bg-portal-light disabled:!text-portal-disabled disabled:!opacity-100"
              >
                <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </Button>
              <Button
                variant="portalOutline"
                aria-label="Next products"
                onClick={() => scrollProducts(1)}
                disabled={!canScrollForward}
                className="!size-10 !rounded-md !p-0 disabled:!border-portal-surface disabled:!bg-portal-light disabled:!text-portal-disabled disabled:!opacity-100"
              >
                <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
          <div
            ref={productsRef}
            role="region"
            aria-label="Recommended products carousel"
            onScroll={updateCarouselControls}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[0, 1].flatMap((page) =>
              recommendedProducts.map((product) => (
                <ProductCard
                  key={`${page}-${product.productId}`}
                  {...product}
                  onAdd={(productId) => setPendingProduct(PRODUCTS.find((item) => item.id === productId) ?? null)}
                  onViewDetails={(productId) => setViewingProduct(PRODUCTS.find((item) => item.id === productId) ?? null)}
                />
              )),
            )}
          </div>
        </section>

        <section id="help-center" className="scroll-mt-24 py-6">
          <div className="flex items-center justify-between"><h2 className="track-section text-body-md font-medium uppercase">Help Center</h2><a href="#/help-center" className="flex items-center gap-2 text-body-sm font-medium">View All <ChevronRight size={16} /></a></div>
          <div className="mt-2">
            {questions.map(([question, answer], index) => {
              const expanded = openQuestion === index;
              return <div key={question} className="border-b border-portal-border last:border-0"><button onClick={() => setOpenQuestion(expanded ? null : index)} aria-expanded={expanded} className="flex w-full items-center justify-between py-4 text-left text-body-md font-medium"><span>{question}</span><ChevronDown size={20} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} /></button><div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="min-h-0 overflow-hidden"><p className="pb-4 text-body-sm text-portal-muted">{answer}</p></div></div></div>;
            })}
          </div>
        </section>
      </main>

      {pendingProduct ? (
        <AddToShopModal
          product={pendingProduct}
          favoriteCount={favoriteShopItemCount}
          favoriteLimit={MAX_FAVORITES}
          existingVariants={loadShopItems()
            .filter((item) => item.product.id === pendingProduct.id)
            .map((item) => item.variant)}
          onClose={() => setPendingProduct(null)}
          onFavoriteBlocked={showFavoriteSlotsFullToast}
          onConfirm={(favorite, variant) => {
            const newItem: ShopItem = {
              id: crypto.randomUUID(),
              product: pendingProduct,
              favorite,
              variant,
              addedAt: Date.now(),
            };
            setShopItems((current) => {
              const next = [...current, newItem];
              saveShopItems(next);
              setShopItemCount(next.length);
              return next;
            });
            logShopActivity("product-added", `${pendingProduct.brand} ${pendingProduct.name}`);
            setPendingProduct(null);
            setToast({ message: "Product added to your shop" });
          }}
        />
      ) : null}

      {viewingProduct ? (
        <BrowseOverlay onClose={() => setViewingProduct(null)} title="Product Details">
          <ProductDetail
            product={viewingProduct}
            hideBreadcrumb
            onAddToShop={() => { setPendingProduct(viewingProduct); setViewingProduct(null); }}
            shopMode={shopModeFor(viewingProduct)}
            onRequestSample={() => openSampleFlow(viewingProduct)}
            sampleActionLabel={sampleActionLabelFor(viewingProduct.id)}
            onWriteReview={() => {
              const item = shopItemFor(viewingProduct);
              if (item) setReviewTarget(item);
            }}
            reviewActionLabel={(() => {
              const item = shopItemFor(viewingProduct);
              return item ? reviewActionLabelFor(item.id) : undefined;
            })()}
          />
        </BrowseOverlay>
      ) : null}

      {sampleTarget ? (
        <RequestSampleModal
          product={sampleTarget}
          onClose={() => setSampleTarget(null)}
          onSubmit={confirmSampleRequest}
        />
      ) : null}

      {reviewTarget ? (
        <WriteReviewModal
          product={reviewTarget.product}
          initialReview={reviewForShopItem(reviewTarget.id)}
          onClose={() => setReviewTarget(null)}
          onSubmit={confirmReview}
        />
      ) : null}

      {toast ? <Toast message={toast.message} variant={toast.variant} action={toast.action} /> : null}
    </AppShell>
  );
}
