import { useEffect, useState } from 'react'
import { logShopActivity } from './activity-log'
import { AddToShopModal } from './components/AddToShopModal'
import { PublishShopDialog } from './components/PublishShopDialog'
import { RemoveProductDialog } from './components/RemoveProductDialog'
import { Toast } from './components/Toast'
import { getSetupManageAccountRoute, isProfileSetupComplete } from '../portal/components/SetupBanner'
import { EMPTY_FILTERS, PRODUCTS, searchProducts, type ProductFilters } from './data/catalogue'
import { DEPLOYED_APP_URL, SHOP_URL, affiliateLinkFor, formatPublishedAt } from './data/shop'
import { BrandsList } from './screens/BrandsList'
import { BrandsListSkeleton } from './components/BrandsListSkeleton'
import { BrowseOverlay } from './screens/BrowseOverlay'
import { CatalogueHome } from './screens/CatalogueHome'
import { CatalogueHomeSkeleton } from './components/CatalogueHomeSkeleton'
import { MyShop } from './screens/MyShop'
import { ProductDetail } from './screens/ProductDetail'
import { ProductDetailPage } from './screens/ProductDetailPage'
import { ProductDetailSkeleton } from './components/ProductDetailSkeleton'
import { SearchResults } from './screens/SearchResults'
import { SearchResultsSkeleton } from './components/SearchResultsSkeleton'
import { StorefrontPreview } from './screens/StorefrontPreview'
import {
  loadHasUnpublishedChanges,
  loadPublishBlocked,
  loadPublishedAt,
  loadShopItems,
  saveHasUnpublishedChanges,
  savePublishBlocked,
  savePublishedAt,
  saveShopItems,
} from './shop-items-store'
import { setPublishBlocked as setPublishBlockedShared, setShopItemCount, setShopPublished } from './shop-status'
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
  variant?: 'success' | 'error'
  action?: { label: string; onClick: () => void }
}

export default function App({ initialBrowse = false, initialProductId, initialAddProductId, initialSearch, initialBrandFilter }: { initialBrowse?: boolean; initialProductId?: string; initialAddProductId?: string; initialSearch?: string; initialBrandFilter?: string }) {
  const [items, setItems] = useState<ShopItem[]>(loadShopItems)
  const [activeTab, setActiveTab] = useState('all')
  const [overlay, setOverlay] = useState<OverlayView | null>(() => {
    if (initialProductId) {
      const product = PRODUCTS.find((item) => item.id === initialProductId)
      if (product) return { kind: 'detail', query: '', product }
    }
    if (initialSearch) return { kind: 'results', query: initialSearch }
    // The brand filter goes into the Filters panel, not the search box — the
    // results view still opens with an empty query, matching the header
    // search's `initialSearch` entry point.
    if (initialBrandFilter) return { kind: 'results', query: '' }
    return initialBrowse ? { kind: 'catalogue' } : null
  })
  const [query, setQuery] = useState(initialSearch ?? '')
  const [initialFilters, setInitialFilters] = useState<ProductFilters>(() =>
    initialBrandFilter ? { ...EMPTY_FILTERS, brands: [initialBrandFilter] } : EMPTY_FILTERS,
  )
  const [pendingProduct, setPendingProduct] = useState<Product | null>(() => initialAddProductId ? PRODUCTS.find((item) => item.id === initialAddProductId) ?? null : null)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [viewingItemId, setViewingItemId] = useState<string | null>(null)
  const [removalCandidate, setRemovalCandidate] = useState<ShopItem | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const [publishOpen, setPublishOpen] = useState(false)
  const [profileComplete] = useState(isProfileSetupComplete)
  const [publishedAt, setPublishedAt] = useState<string | null>(loadPublishedAt)
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(loadHasUnpublishedChanges)
  const [publishBlocked, setPublishBlocked] = useState(loadPublishBlocked)

  useEffect(() => {
    setShopItemCount(items.length)
    saveShopItems(items)
  }, [items])

  useEffect(() => {
    savePublishedAt(publishedAt)
  }, [publishedAt])

  useEffect(() => {
    saveHasUnpublishedChanges(hasUnpublishedChanges)
  }, [hasUnpublishedChanges])

  useEffect(() => {
    savePublishBlocked(publishBlocked)
  }, [publishBlocked])

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

  /** Selecting a brand pre-checks it in the Filters panel instead of typing
   *  it into the search box — matches the standalone Brands page's own
   *  `#/shop/brand/:name` entry point (see `initialBrandFilter` above). */
  function selectBrand(name: string) {
    setInitialFilters({ ...EMPTY_FILTERS, brands: [name] })
    setQuery('')
    setOverlay({ kind: 'results', query: '' })
  }

  /** Shown wherever a "feature this" action can't be satisfied because all
   *  `MAX_FEATURED` slots are already taken — the Shop's "⋮" menu, the Add to
   *  Shop modal's feature toggle, and the Product Detail page all hit this. */
  function showFeaturedSlotsFullToast() {
    setToast({
      message: 'Product failed to add as featured',
      variant: 'error',
      action: { label: 'Manage Slot', onClick: () => setActiveTab('featured') },
    })
  }

  function confirmAdd(featured: boolean, variant: string) {
    if (!pendingProduct) return
    if (items.length >= MAX_PRODUCTS) {
      setPendingProduct(null)
      return
    }
    const slotsFull = featured && featuredCount >= MAX_FEATURED
    setItems((current) => [
      ...current,
      { id: crypto.randomUUID(), product: pendingProduct, featured: featured && !slotsFull, variant },
    ])
    setPendingProduct(null)
    if (slotsFull) {
      showFeaturedSlotsFullToast()
    } else {
      setToast({ message: 'Product added to your shop' })
    }
    logShopActivity('product-added', `${pendingProduct.brand} ${pendingProduct.name}`)
    markChanged()
  }

  function confirmPublish() {
    if (!profileComplete) return
    setPublishOpen(false)
    // Publishing with nothing in the shop doesn't go live — per the warning
    // copy ("Publishing with no products will unpublish your shop"), it
    // actively reverts an already-published shop back to unpublished, not
    // just a no-op, so the page shows the blocked-publish state (Figma
    // `1362:73958`) until a product is added and it's published again.
    if (items.length === 0) {
      setPublishedAt(null)
      setHasUnpublishedChanges(false)
      setPublishBlocked(true)
      setPublishBlockedShared(true)
      setShopPublished(false)
      return
    }
    setPublishedAt(formatPublishedAt(new Date()))
    setHasUnpublishedChanges(false)
    setPublishBlocked(false)
    setPublishBlockedShared(false)
    setShopPublished(true)
    setToast({ message: 'Your shop published successfully' })
    logShopActivity('shop-published')
  }

  function toggleFeatured(item: ShopItem) {
    if (item.featured) {
      setItems((current) =>
        current.map((row) => (row.id === item.id ? { ...row, featured: false } : row)),
      )
      setToast({ message: 'Product Removed From Featured' })
      logShopActivity('product-unfeatured', `${item.product.brand} ${item.product.name}`)
      markChanged()
      return
    }

    if (featuredCount >= MAX_FEATURED) {
      showFeaturedSlotsFullToast()
      return
    }

    setItems((current) => current.map((row) => (row.id === item.id ? { ...row, featured: true } : row)))
    setToast({ message: 'Product Added to Featured' })
    logShopActivity('product-featured', `${item.product.brand} ${item.product.name}`)
    markChanged()
  }

  /** The actual removal, run once the confirm dialog is accepted. */
  function performRemoveFromShop(item: ShopItem) {
    setItems((current) => current.filter((row) => row.id !== item.id))
    setViewingItemId((current) => (current === item.id ? null : current))
    setRemovalCandidate(null)
    setToast({ message: 'Product removed from your shop' })
    logShopActivity('product-removed', `${item.product.brand} ${item.product.name}`)
    markChanged()
  }

  /** Reorders within the featured subset only; every other item keeps its slot. */
  function reorderFeatured(id: string, direction: 'up' | 'down') {
    if (Math.random() < REORDER_FAILURE_RATE) {
      setToast({
        message: "Couldn't save the new order, we put it back the way it was",
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
    setToast({ message: 'Affiliate link copied to clipboard' })
  }

  function copyShopLink() {
    navigator.clipboard?.writeText(SHOP_URL).catch(() => {})
    setToast({ message: 'Shop link copied to clipboard' })
  }

  // Derived from the live `query` (not `overlay.query`, frozen at the last
  // Enter/suggestion submit) so results/empty-vs-all track every keystroke,
  // including clearing the box back down to nothing.
  const results = overlay?.kind === 'results' ? searchProducts(query) : []

  /** Builds the featured/remove/affiliate-link controls for the standalone
   *  Product Detail page of an item already in the shop. */
  function shopModeFor(item: ShopItem, showPerformance: boolean) {
    return {
      featured: item.featured,
      variant: item.variant,
      onToggleFeatured: () => toggleFeatured(item),
      onRemoveFromShop: () => setRemovalCandidate(item),
      affiliateLink: affiliateLinkFor(item.product),
      onCopyLink: () => copyAffiliateLink(item),
      published: publishedAt !== null,
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
          onViewShop={() => {
            window.open(`${DEPLOYED_APP_URL}/#/shop/view`, '_blank')
          }}
          published={publishedAt !== null}
          publishedAt={publishedAt}
          hasUnpublishedChanges={hasUnpublishedChanges}
          publishBlocked={publishBlocked}
          onPublish={() => setPublishOpen(true)}
          onViewDetails={(item) => setViewingItemId(item.id)}
          onCopyLink={copyAffiliateLink}
          onToggleFeatured={toggleFeatured}
          onRemoveFromShop={(item) => setRemovalCandidate(item)}
          onReorderFeatured={reorderFeatured}
        />
      )}

      {overlay && (
        <BrowseOverlay
          onClose={() => setOverlay(null)}
          scrollKey={overlay.kind === 'detail' ? `detail:${overlay.product.id}` : overlay.kind}
          skeleton={
            overlay.kind === 'catalogue' ? (
              <CatalogueHomeSkeleton />
            ) : overlay.kind === 'brands' ? (
              <BrandsListSkeleton />
            ) : overlay.kind === 'results' ? (
              <SearchResultsSkeleton />
            ) : (
              <ProductDetailSkeleton />
            )
          }
        >
          {overlay.kind === 'catalogue' && (
            <CatalogueHome
              query={query}
              onQueryChange={setQuery}
              onSearch={runSearch}
              onViewAllBrands={() => setOverlay({ kind: 'brands' })}
            />
          )}

          {overlay.kind === 'brands' && (
            <BrandsList onBackToCatalogue={openCatalogue} onSelectBrand={selectBrand} />
          )}

          {overlay.kind === 'results' && (
            <SearchResults
              query={query}
              results={results}
              initialFilters={initialFilters}
              onQueryChange={setQuery}
              onSearch={runSearch}
              onBackToCatalogue={openCatalogue}
              onOpenProduct={(product) =>
                setOverlay({ kind: 'detail', query: overlay.query, product })
              }
              onAddToShop={setPendingProduct}
            />
          )}

          {overlay.kind === 'detail' && (
            <ProductDetail
              product={overlay.product}
              animateOnMount
              onBackToCatalogue={openCatalogue}
              onBackToResults={() => setOverlay({ kind: 'results', query: overlay.query })}
              onAddToShop={() => setPendingProduct(overlay.product)}
            />
          )}
        </BrowseOverlay>
      )}

      {pendingProduct && (
        <AddToShopModal
          product={pendingProduct}
          featuredCount={featuredCount}
          featuredLimit={MAX_FEATURED}
          existingVariants={items
            .filter((item) => item.product.id === pendingProduct.id)
            .map((item) => item.variant)}
          onClose={() => setPendingProduct(null)}
          onConfirm={confirmAdd}
          onFeatureBlocked={() => showFeaturedSlotsFullToast()}
        />
      )}

      {publishOpen && (
        <PublishShopDialog
          profileComplete={profileComplete}
          hasProducts={items.length > 0}
          onClose={() => setPublishOpen(false)}
          onPublish={confirmPublish}
          onCompleteProfile={() => { window.location.hash = getSetupManageAccountRoute() }}
        />
      )}

      {removalCandidate && (
        <RemoveProductDialog
          product={removalCandidate.product}
          variant={removalCandidate.variant}
          onClose={() => setRemovalCandidate(null)}
          onConfirm={() => performRemoveFromShop(removalCandidate)}
        />
      )}

      {toast && (
        <Toast message={toast.message} variant={toast.variant} action={toast.action} />
      )}
    </>
  )
}
