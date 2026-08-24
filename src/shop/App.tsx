import { useEffect, useState } from 'react'
import { AddToShopModal } from './components/AddToShopModal'
import { PublishShopDialog } from './components/PublishShopDialog'
import { RemoveProductDialog } from './components/RemoveProductDialog'
import { Toast } from './components/Toast'
import { searchProducts } from './data/catalogue'
import { PROFILE_COMPLETE, SHOP_URL, affiliateLinkFor, formatPublishedAt } from './data/shop'
import { BrowseOverlay } from './screens/BrowseOverlay'
import { CatalogueHome } from './screens/CatalogueHome'
import { MyShop } from './screens/MyShop'
import { ProductDetail } from './screens/ProductDetail'
import { ProductDetailPage } from './screens/ProductDetailPage'
import { SearchResults } from './screens/SearchResults'
import { StorefrontPreview } from './screens/StorefrontPreview'
import { setShopItemCount, setShopPublished } from './shop-status'
import type { OverlayView, Product, ShopItem } from './types'

/** Business rules confirmed for the shop flow. */
const MAX_PRODUCTS = 16
const MAX_FEATURED = 6
/** Simulated backend flakiness for reordering featured items — Figma documents
 *  both a success (frame 02) and a failure (frame 04) outcome for the same
 *  action with no visible trigger difference, so this picks randomly. */
const REORDER_FAILURE_RATE = 0.2

type ToastState = {
  message: string
  top: number
  variant?: 'success' | 'error'
  action?: { label: string; onClick: () => void }
}

export default function App() {
  const [items, setItems] = useState<ShopItem[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [overlay, setOverlay] = useState<OverlayView | null>(null)
  const [query, setQuery] = useState('')
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [nextId, setNextId] = useState(1)
  const [viewingItemId, setViewingItemId] = useState<string | null>(null)
  const [removalCandidate, setRemovalCandidate] = useState<ShopItem | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const [publishOpen, setPublishOpen] = useState(false)
  const [profileComplete, setProfileComplete] = useState(PROFILE_COMPLETE)
  const [publishedAt, setPublishedAt] = useState<string | null>(null)
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false)

  useEffect(() => {
    setShopItemCount(items.length)
  }, [items.length])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  /** Only meaningful once the shop has been published at least once. */
  function markChanged() {
    if (publishedAt !== null) setHasUnpublishedChanges(true)
  }

  const featuredCount = items.filter((item) => item.featured).length
  // Derived (not a snapshot) so the detail overlay stays in sync when its item
  // changes underneath it, and auto-closes if the item is removed from the shop.
  const viewingItem = items.find((item) => item.id === viewingItemId) ?? null

  function openCatalogue() {
    setQuery('')
    setOverlay({ kind: 'catalogue' })
  }

  function runSearch(nextQuery: string) {
    setQuery(nextQuery)
    setOverlay({ kind: 'results', query: nextQuery })
  }

  /** Shown wherever a "feature this" action can't be satisfied because all
   *  `MAX_FEATURED` slots are already taken — the Shop's "⋮" menu, the Add to
   *  Shop modal's feature toggle, and the Product Detail page all hit this. */
  function showFeaturedSlotsFullToast(top: number) {
    setToast({
      message: 'Product failed to add as featured',
      top,
      variant: 'error',
      action: { label: 'Manage Slot', onClick: () => setActiveTab('featured') },
    })
  }

  function confirmAdd(featured: boolean) {
    if (!pendingProduct) return
    if (items.length >= MAX_PRODUCTS) {
      setPendingProduct(null)
      return
    }
    const slotsFull = featured && featuredCount >= MAX_FEATURED
    setItems((current) => [
      ...current,
      { id: `shop-item-${nextId}`, product: pendingProduct, featured: featured && !slotsFull },
    ])
    setNextId((current) => current + 1)
    setPendingProduct(null)
    if (slotsFull) {
      showFeaturedSlotsFullToast(92)
    } else {
      setToast({ message: 'Product added to your shop', top: 92 })
    }
    markChanged()
  }

  function confirmPublish() {
    if (!profileComplete) return
    setPublishedAt(formatPublishedAt(new Date()))
    setPublishOpen(false)
    setHasUnpublishedChanges(false)
    setShopPublished(true)
    setToast({ message: 'Your shop published successfully', top: 150 })
  }

  function toggleFeatured(item: ShopItem) {
    if (item.featured) {
      setItems((current) =>
        current.map((row) => (row.id === item.id ? { ...row, featured: false } : row)),
      )
      setToast({ message: 'Product Removed From Featured', top: 150 })
      markChanged()
      return
    }

    if (featuredCount >= MAX_FEATURED) {
      showFeaturedSlotsFullToast(150)
      return
    }

    setItems((current) => current.map((row) => (row.id === item.id ? { ...row, featured: true } : row)))
    setToast({ message: 'Product Added to Featured', top: 150 })
    markChanged()
  }

  /** The actual removal, run once the confirm dialog is accepted. */
  function performRemoveFromShop(item: ShopItem) {
    setItems((current) => current.filter((row) => row.id !== item.id))
    setViewingItemId((current) => (current === item.id ? null : current))
    setRemovalCandidate(null)
    setToast({ message: 'Product removed from your shop', top: 150 })
    markChanged()
  }

  /** Reorders within the featured subset only; every other item keeps its slot. */
  function reorderFeatured(id: string, direction: 'up' | 'down') {
    if (Math.random() < REORDER_FAILURE_RATE) {
      setToast({
        message: "Couldn't save the new order, we put it back the way it was",
        top: 150,
        variant: 'error',
      })
      return
    }

    setItems((current) => {
      const featuredIndices = current
        .map((item, index) => (item.featured ? index : -1))
        .filter((index) => index >= 0)
      const order = featuredIndices.map((index) => current[index])
      const position = order.findIndex((item) => item.id === id)
      const swapWith = direction === 'up' ? position - 1 : position + 1
      if (position < 0 || swapWith < 0 || swapWith >= order.length) return current

      const nextOrder = order.slice()
      const temp = nextOrder[position]
      nextOrder[position] = nextOrder[swapWith]
      nextOrder[swapWith] = temp

      const next = current.slice()
      featuredIndices.forEach((index, k) => {
        next[index] = nextOrder[k]
      })
      return next
    })
    markChanged()
  }

  function copyAffiliateLink(item: ShopItem) {
    navigator.clipboard?.writeText(affiliateLinkFor(item.product)).catch(() => {})
    setToast({ message: 'Affiliate link copied to clipboard', top: 150 })
  }

  function copyShopLink() {
    navigator.clipboard?.writeText(SHOP_URL).catch(() => {})
    setToast({ message: 'Shop link copied to clipboard', top: 150 })
  }

  const results = overlay?.kind === 'results' ? searchProducts(overlay.query) : []

  /** Builds the featured/remove/affiliate-link controls shared by both places
   *  ProductDetail is reused for an item that's already in the shop. */
  function shopModeFor(item: ShopItem, showPerformance: boolean) {
    return {
      featured: item.featured,
      onToggleFeatured: () => toggleFeatured(item),
      onRemoveFromShop: () => setRemovalCandidate(item),
      affiliateLink: affiliateLinkFor(item.product),
      onCopyLink: () => copyAffiliateLink(item),
      showPerformance,
    }
  }

  return (
    <>
      {previewOpen ? (
        <StorefrontPreview
          items={items}
          onClose={() => setPreviewOpen(false)}
          onCopyShopLink={copyShopLink}
        />
      ) : viewingItem ? (
        <ProductDetailPage
          item={viewingItem}
          shopMode={shopModeFor(viewingItem, true)}
          onBackToShop={() => setViewingItemId(null)}
        />
      ) : (
        <MyShop
          items={items}
          featuredLimit={MAX_FEATURED}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBrowse={openCatalogue}
          onPreview={() => setPreviewOpen(true)}
          published={publishedAt !== null}
          publishedAt={publishedAt}
          hasUnpublishedChanges={hasUnpublishedChanges}
          onPublish={() => setPublishOpen(true)}
          onViewDetails={(item) => setViewingItemId(item.id)}
          onCopyLink={copyAffiliateLink}
          onToggleFeatured={toggleFeatured}
          onRemoveFromShop={(item) => setRemovalCandidate(item)}
          onReorderFeatured={reorderFeatured}
        />
      )}

      {overlay && (
        <BrowseOverlay onClose={() => setOverlay(null)}>
          {overlay.kind === 'catalogue' && (
            <CatalogueHome query={query} onQueryChange={setQuery} onSearch={runSearch} />
          )}

          {overlay.kind === 'results' && (
            <SearchResults
              query={query}
              results={results}
              onQueryChange={setQuery}
              onSearch={runSearch}
              onBackToCatalogue={openCatalogue}
              onOpenProduct={(product) =>
                setOverlay({ kind: 'detail', query: overlay.query, product })
              }
              onAddToShop={setPendingProduct}
            />
          )}

          {overlay.kind === 'detail' &&
            (() => {
              const shopItem = items.find((item) => item.product.id === overlay.product.id)
              return (
                <ProductDetail
                  product={overlay.product}
                  onBackToCatalogue={openCatalogue}
                  onBackToResults={() => setOverlay({ kind: 'results', query: overlay.query })}
                  onAddToShop={() => setPendingProduct(overlay.product)}
                  shopMode={shopItem ? shopModeFor(shopItem, false) : undefined}
                />
              )
            })()}
        </BrowseOverlay>
      )}

      {pendingProduct && (
        <AddToShopModal
          product={pendingProduct}
          featuredCount={featuredCount}
          featuredLimit={MAX_FEATURED}
          onClose={() => setPendingProduct(null)}
          onConfirm={confirmAdd}
          onFeatureBlocked={() => showFeaturedSlotsFullToast(92)}
        />
      )}

      {publishOpen && (
        <PublishShopDialog
          profileComplete={profileComplete}
          onClose={() => setPublishOpen(false)}
          onPublish={confirmPublish}
          /* Stands in for navigating to profile settings, which this section does not cover. */
          onCompleteProfile={() => setProfileComplete(true)}
        />
      )}

      {removalCandidate && (
        <RemoveProductDialog
          product={removalCandidate.product}
          onClose={() => setRemovalCandidate(null)}
          onConfirm={() => performRemoveFromShop(removalCandidate)}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          top={toast.top}
          variant={toast.variant}
          action={toast.action}
        />
      )}
    </>
  )
}
