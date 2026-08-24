import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import AppShell from "./components/AppShell";
import Button from "./components/Button";
import RecentActivities from "./components/RecentActivities";
import TopProducts from "./components/TopProducts";
import ProfilePhoto from "./components/ProfilePhoto";
import { VERIFICATION_STORAGE_KEY } from "./VerificationPartner";
import { PAYMENT_STORAGE_KEY } from "./PaymentPartner";
import { isSetupRequired } from "./setup-status";
import { useHasShopItems, useIsShopPublished } from "../shop/shop-status";
import ShopUrl from "./components/ShopUrl";
import { PRODUCTS } from "../shop/data/catalogue";
import type { Product } from "../shop/types";
import { AddToShopModal } from "../shop/components/AddToShopModal";
import { setShopItemCount } from "../shop/shop-status";
import { Toast } from "../shop/components/Toast";

const productImages = [
  { productId: "laneige-water-bank", image: "/urmei/home/product-1.png", title: "Water Bank Blue Hyaluronic Cream" },
  { productId: "cosrx-snail-96", image: "/urmei/home/product-2.png", title: "Advanced Snail 96 Mucin Power Essence" },
  { productId: "innisfree-green-tea-seed", image: "/urmei/home/product-3.png", title: "Green Tea Seed Hyaluronic Serum" },
  { productId: "sulwhasoo-first-care", image: "/urmei/home/product-4.png", title: "First Care Activating Serum" },
];

const products = [0, 1].flatMap((page) =>
  productImages.map((product, index) => ({
    ...product,
    id: `${page}-${index}`,
  })),
);

const questions = [
  ["Can I upload tutorials and reviews?", "Yes. You can add tutorials and product reviews to content linked from your shop."],
  ["Can I track my campaign performance?", "Campaign reporting will show reach, engagement, clicks, and attributed sales."],
  ["How many campaigns can I run?", "You can participate in every campaign for which your profile is eligible."],
  ["Do I need design skills to start?", "No. URMEI provides product assets and guided tools to help you publish."],
];

function hasCompletedAction(storageKey: string) {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return false;
    return (JSON.parse(value) as { status?: string }).status === "complete";
  } catch {
    return false;
  }
}

function ProductCard({ productId, image, title, onAdd }: { productId: string; image: string; title: string; onAdd: (productId: string) => void }) {
  return (
    <article className="min-w-[260px] flex-1 snap-start sm:min-w-[285px]">
      <button type="button" onClick={() => { window.location.hash = `#/shop/product/${productId}`; }} aria-label={`View details for ${title}`} className="block w-full cursor-pointer overflow-hidden rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark"><img src={image} alt={title} className="aspect-square w-full object-cover" /></button>
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <p className="text-[10px] leading-4 text-portal-muted">LANEIGE</p>
          <h3 className="text-body-sm text-portal-text">{title}</h3>
          <p className="text-[10px] leading-4 text-portal-muted">50 ML | Blue gel cream</p>
          <div className="flex items-center gap-2 text-body-sm">
            <span className="font-medium text-portal-text">S$45</span>
            <span className="text-[11px] text-portal-placeholder line-through">S$52</span>
            <span className="text-[11px] text-portal-success">SAVE 13%</span>
          </div>
        </div>
        <p className="text-[10px] leading-4 text-portal-muted">Singapore&nbsp;&nbsp;•&nbsp;&nbsp;Malaysia</p>
        <Button variant="portalOutline" className="w-full" onClick={() => onAdd(productId)}>Add to Shop</Button>
      </div>
    </article>
  );
}

export default function Home({
  firstVisit = false,
  onShowTour,
}: {
  firstVisit?: boolean;
  onShowTour?: () => void;
}) {
  const hasShopItems = useHasShopItems();
  const isShopPublished = useIsShopPublished();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const [identityComplete] = useState(() =>
    hasCompletedAction(VERIFICATION_STORAGE_KEY),
  );
  const [paymentComplete] = useState(() =>
    hasCompletedAction(PAYMENT_STORAGE_KEY),
  );
  const [setupWasSkipped] = useState(isSetupRequired);
  const productsRef = useRef<HTMLDivElement>(null);
  const setupComplete =
    identityComplete && paymentComplete && !setupWasSkipped;

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
    if (!showAddedToast) return;
    const timer = window.setTimeout(() => setShowAddedToast(false), 3200);
    return () => window.clearTimeout(timer);
  }, [showAddedToast]);

  const scrollProducts = (direction: number) => {
    const carousel = productsRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <AppShell
      className="motion-page bg-[#fffefd] text-portal-text"
      shadow
      onShowTour={() => onShowTour?.()}
      onShowHelp={() => { window.location.hash = "#/help-center"; }}
    >

      {!setupComplete ? (
        <aside
          className="flex w-full flex-col items-start justify-between gap-3 border-b border-[#e6e5e4] bg-[#fffefd] px-6 py-3 sm:flex-row sm:items-center lg:px-[120px]"
          aria-label="Account setup required"
        >
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <img
              src="/urmei/icon-triangle-alert.svg"
              alt=""
              className="mt-px size-5 shrink-0 sm:mt-0"
            />
            <p className="text-body-md font-medium text-[#2d2305]">
              To publish your shop, you need to verify your identity and connect
              a payment method.
            </p>
          </div>
          <Button
            variant="portalOutline"
            className="shrink-0 bg-[#fffefd]"
            onClick={() => {
              window.location.hash = identityComplete ? "#/payment" : "#/verify";
            }}
          >
            Complete action
          </Button>
        </aside>
      ) : null}

      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-8 lg:px-[120px]">
        <section className="overflow-hidden rounded-[10px] bg-portal-surface shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
          <div className="flex min-h-[208px] flex-col gap-2.5 px-6 py-6 lg:px-8">
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
            <ShopUrl published={isShopPublished} />
          </div>
          {!hasShopItems ? (
            <div className="flex min-h-[128px] flex-col items-start gap-5 rounded-[10px] border border-portal-surface bg-[#f2efed] p-6 sm:flex-row sm:items-center lg:gap-10 lg:p-8">
              <img src="/urmei/home/store.svg" alt="" className="size-16" />
              <div className="min-w-0 flex-1"><h2 className="text-body-xxl font-medium">Set Up Your Shop</h2><p className="text-body-sm text-portal-muted">Curate your product collection and publish your shop to start earning</p></div>
              <Button variant="portal" onClick={() => { window.location.hash = "#/shop"; }}>Set Up Shop</Button>
            </div>
          ) : null}
        </section>

        {!firstVisit && hasShopItems ? (
          <>
            <RecentActivities />
            <TopProducts />
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
                className="!size-8 !p-0 disabled:!border-portal-surface disabled:!bg-portal-light disabled:!text-portal-disabled disabled:!opacity-100"
              >
                <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </Button>
              <Button
                variant="portalOutline"
                aria-label="Next products"
                onClick={() => scrollProducts(1)}
                disabled={!canScrollForward}
                className="!size-8 !p-0 disabled:!border-portal-surface disabled:!bg-portal-light disabled:!text-portal-disabled disabled:!opacity-100"
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
            {products.map((product) => <ProductCard key={product.id} {...product} onAdd={(productId) => setPendingProduct(PRODUCTS.find((item) => item.id === productId) ?? null)} />)}
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
          featuredCount={0}
          featuredLimit={6}
          onClose={() => setPendingProduct(null)}
          onFeatureBlocked={() => {}}
          onConfirm={() => {
            setShopItemCount(1);
            setPendingProduct(null);
            setShowAddedToast(true);
          }}
        />
      ) : null}
      {showAddedToast ? <Toast message="Product added to your shop" /> : null}
    </AppShell>
  );
}
