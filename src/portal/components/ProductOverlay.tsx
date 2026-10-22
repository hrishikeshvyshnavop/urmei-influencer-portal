import { useEffect, useState } from "react";
import RequestSampleFlow from "./RequestSampleFlow";
import { loadPublishedAt, loadShopItems, saveShopItems } from "../../shop/shop-items-store";
import { setShopItemCount } from "../../shop/shop-status";
import { logShopActivity } from "../../shop/activity-log";
import { affiliateLinkFor, hasLiveLink } from "../../shop/data/shop";
import { productStatsHash } from "../../shop/data/stats";
import { AddToShopWithCollections } from "../../shop/components/AddToShopWithCollections";
import { Toast } from "../../shop/components/Toast";
import { CollectionPicker } from "../../shop/components/CollectionPicker";
import { collectionsFor, loadCollections, removeItemFromCollection, restoreItemInCollection, saveCollections, type Collection } from "../../shop/collections-store";
import { RemoveFromCollectionDialog } from "../../shop/components/RemoveFromCollectionDialog";
import { BrowseOverlay } from "../../shop/screens/BrowseOverlay";
import { ProductDetail, type ShopMode } from "../../shop/screens/ProductDetail";
import type { Product, ShopItem } from "../../shop/types";

type OverlayToast = {
  message: string;
  variant?: "success" | "error";
  action?: { label: string; onClick: () => void };
};

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
  const [collectingItem, setCollectingItem] = useState<ShopItem | null>(null);
  const [unlinking, setUnlinking] = useState<{ item: ShopItem; collection: Collection } | null>(null);

  /** Flow 18: remove from one collection after the confirm, with Undo. */
  const confirmRemoveFromCollection = (item: ShopItem, collection: Collection) => {
    const { next, index } = removeItemFromCollection(loadCollections(shopItems), collection.id, item.id);
    saveCollections(next);
    setUnlinking(null);
    setToast({
      message: `Removed from ${collection.name}. Still in your shop.`,
      action: {
        label: "Undo",
        onClick: () => {
          saveCollections(restoreItemInCollection(loadCollections(shopItems), collection.id, item.id, index));
          setToast(null);
        },
      },
    });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

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
      collections: collectionsFor(item.id, loadCollections(shopItems)),
      onRemoveFromCollection: (collectionId: string) => {
        const collection = loadCollections(shopItems).find((c) => c.id === collectionId);
        if (collection) setUnlinking({ item, collection });
      },
      variant: item.variant,
      onAddToCollection: () => setCollectingItem(item),
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
        <AddToShopWithCollections
          product={pendingProduct}
          existingVariants={shopItems
            .filter((item) => item.product.id === pendingProduct.id)
            .map((item) => item.variant)}
          onClose={() => setPendingProduct(null)}
          onAdd={(variant) => {
            const newItem: ShopItem = {
              id: crypto.randomUUID(),
              product: pendingProduct,
              favorite: false,
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
            return newItem;
          }}
          onDone={(message) => {
            setPendingProduct(null);
            setToast({ message });
          }}
        />
      ) : null}

      <RequestSampleFlow product={sampleProduct} onClose={() => setSampleProduct(null)} />

      {unlinking ? (
        <RemoveFromCollectionDialog
          productName={unlinking.item.product.name}
          collectionName={unlinking.collection.name}
          onClose={() => setUnlinking(null)}
          onConfirm={() => confirmRemoveFromCollection(unlinking.item, unlinking.collection)}
        />
      ) : null}
      {collectingItem ? (
        <CollectionPicker
          item={collectingItem}
          onClose={() => setCollectingItem(null)}
          onSaved={(message) => {
            setCollectingItem(null);
            setToast({ message });
          }}
        />
      ) : null}
      {toast ? <Toast message={toast.message} variant={toast.variant} action={toast.action} /> : null}
    </>
  );
}
