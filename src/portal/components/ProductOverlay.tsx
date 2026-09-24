import { useEffect, useState } from "react";
import RequestSampleFlow from "./RequestSampleFlow";
import { MAX_FAVORITES } from "../../shop/limits";
import { loadPublishedAt, loadShopItems, saveShopItems } from "../../shop/shop-items-store";
import { setShopItemCount } from "../../shop/shop-status";
import { logShopActivity } from "../../shop/activity-log";
import { affiliateLinkFor, hasLiveLink } from "../../shop/data/shop";
import { productStatsHash } from "../../shop/data/stats";
import { AddToShopModal } from "../../shop/components/AddToShopModal";
import { Toast } from "../../shop/components/Toast";
import { BrowseOverlay } from "../../shop/screens/BrowseOverlay";
import { ProductDetail, type ShopMode } from "../../shop/screens/ProductDetail";
import type { Product, ShopItem } from "../../shop/types";
import { navigate } from "../../router";

type OverlayToast = {
  message: string;
  variant?: "success" | "error";
  action?: { label: string; onClick: () => void };
};

/** The toast's "Manage Favorite" action. */
function goToShop() {
  navigate("/shop");
}

/**
 * The full-page "Product Details" overlay, opened over whatever page the
 * creator is on so they never leave it — the same overlay Home's Recommended
 * Products open. It carries the product page's own actions: add to shop (or,
 * for a product already there, favorite / remove / copy link) and request a
 * sample, each with its toast. Pass `product` to open it, `null` to keep it
 * closed; the toast outlives the overlay.
 */
export default function ProductOverlay({
  product,
  onClose,
  showReviews = false,
}: {
  product: Product | null;
  onClose: () => void;
  /** Adds "What Creators Say" (led by the creator's own review) under the product. */
  showReviews?: boolean;
}) {
  const [shopItems, setShopItems] = useState(loadShopItems);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [sampleProduct, setSampleProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<OverlayToast | null>(null);
  const favoriteCount = shopItems.filter((item) => item.favorite).length;

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showFavoriteSlotsFullToast = () => {
    setToast({
      message: "Product failed to add as Favorite",
      variant: "error",
      action: { label: "Manage Favorite", onClick: goToShop },
    });
  };

  const toggleFavorite = (item: ShopItem) => {
    if (!item.favorite && favoriteCount >= MAX_FAVORITES) {
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

  const removeFromShop = (item: ShopItem) => {
    setShopItems((current) => {
      const next = current.filter((row) => row.id !== item.id);
      saveShopItems(next);
      setShopItemCount(next.length);
      return next;
    });
    logShopActivity("product-removed", `${item.product.brand} ${item.product.name}`);
    setToast({ message: "Product removed from your shop" });
    onClose();
  };

  const shopModeFor = (viewed: Product): ShopMode | undefined => {
    const item = shopItems.find((row) => row.product.id === viewed.id);
    if (!item) return undefined;
    return {
      favorite: item.favorite,
      variant: item.variant,
      onToggleFavorite: () => toggleFavorite(item),
      onRemoveFromShop: () => removeFromShop(item),
      affiliateLink: affiliateLinkFor(item.product),
      onCopyLink: () => {
        navigator.clipboard?.writeText(affiliateLinkFor(item.product)).catch(() => {});
        setToast({ message: "Affiliate link copied to clipboard" });
      },
      published: hasLiveLink(item, loadPublishedAt()),
      statsHref: productStatsHash(item.id, "home"),
    };
  };

  return (
    <>
      {product ? (
        <BrowseOverlay onClose={onClose} title="Product Details">
          <ProductDetail
            product={product}
            hideBreadcrumb
            onAddToShop={() => setPendingProduct(product)}
            onRequestSample={() => setSampleProduct(product)}
            shopMode={shopModeFor(product)}
            showReviews={showReviews}
          />
        </BrowseOverlay>
      ) : null}

      {pendingProduct ? (
        <AddToShopModal
          product={pendingProduct}
          favoriteCount={favoriteCount}
          favoriteLimit={MAX_FAVORITES}
          existingVariants={shopItems
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

      <RequestSampleFlow product={sampleProduct} onClose={() => setSampleProduct(null)} />

      {toast ? <Toast message={toast.message} variant={toast.variant} action={toast.action} /> : null}
    </>
  );
}
