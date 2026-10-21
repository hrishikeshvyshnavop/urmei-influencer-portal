import { useEffect, useState } from 'react'
import { logShopActivity } from './activity-log'
import { MAX_PRODUCTS } from './limits'
import { AddToShopModal } from './components/AddToShopModal'
import { CollectionDialog } from './components/CollectionDialog'
import { DeleteCollectionDialog } from './components/DeleteCollectionDialog'
import { RemoveFromCollectionDialog } from './components/RemoveFromCollectionDialog'
import { AddToCollectionDialog } from './components/AddToCollectionDialog'
import { addedToShopMessage, collectionLinkFor, collectionsFor, collectionsSavedMessage, createCollection, removeItemFromCollection, restoreItemInCollection, deleteCollection, loadCollections, moveCollection, saveCollections, setItemCollections, updateCollection, type Collection } from './collections-store'
import { PublishShopDialog } from './components/PublishShopDialog'
import { RemoveProductDialog } from './components/RemoveProductDialog'
import { Toast } from './components/Toast'
import RequestSampleFlow from '../portal/components/RequestSampleFlow'
import { getSetupManageAccountRoute, isProfileSetupComplete } from '../portal/components/SetupBanner'
import { EMPTY_FILTERS, PRODUCTS, searchProducts, type ProductFilters } from './data/catalogue'
import { SHOP_URL, affiliateLinkFor, hasLiveLink } from './data/shop'
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
import { productStatsHash } from './data/stats'
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
import { navigate, routeUrl } from '../router'

/** Simulated backend flakiness for reordering favorite items — Figma documents
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
  const [collections, setCollections] = useState<Collection[]>(() => loadCollections(loadShopItems()))
  const [newCollectionOpen, setNewCollectionOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [deletingCollection, setDeletingCollection] = useState<Collection | null>(null)
  /** The item whose collections are being picked, plus any collections made
   *  from inside that dialog (they show "New" and arrive ticked). */
  const [collectingItem, setCollectingItem] = useState<ShopItem | null>(null)
  const [newFromPicker, setNewFromPicker] = useState<string[]>([])
  /** A product page chip's × awaiting confirmation (flow 18). */
  const [unlinking, setUnlinking] = useState<{ item: ShopItem; collection: Collection } | null>(null)
  const [openCollectionId, setOpenCollectionId] = useState<string | null>(null)
  /** The collection being filled from the catalogue (flow 09): results say
   *  "Add to Collection" and Add to shop arrives with it ticked. */
  const [collectionTarget, setCollectionTarget] = useState<string | null>(null)
  const [boardMotion, setBoardMotion] = useState<{ id: string; kind: 'moved' | 'failed'; at: number } | null>(null)
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
  const [sampleProduct, setSampleProduct] = useState<Product | null>(null)
  const [viewingItemId, setViewingItemId] = useState<string | null>(null)
  const [removalCandidate, setRemovalCandidate] = useState<ShopItem | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const [publishOpen, setPublishOpen] = useState(false)
  const [profileComplete] = useState(isProfileSetupComplete)
  const [publishedAt, setPublishedAt] = useState<number | null>(loadPublishedAt)
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(loadHasUnpublishedChanges)
  const [publishBlocked, setPublishBlocked] = useState(loadPublishBlocked)

  useEffect(() => {
    setShopItemCount(items.length)
    saveShopItems(items)
  }, [items])

  useEffect(() => {
    saveCollections(collections)
  }, [collections])

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
   *  `/shop/brand/:name` entry point (see `initialBrandFilter` above). */
  function selectBrand(name: string) {
    setInitialFilters({ ...EMPTY_FILTERS, brands: [name] })
    setQuery('')
    setOverlay({ kind: 'results', query: '' })
  }

  function confirmAdd(collectionIds: string[], variant: string) {
    if (!pendingProduct) return
    if (items.length >= MAX_PRODUCTS) {
      setPendingProduct(null)
      return
    }
    const id = crypto.randomUUID()
    setItems((current) => [
      ...current,
      { id, product: pendingProduct, favorite: false, variant, addedAt: Date.now() },
    ])
    if (collectionIds.length > 0) {
      setCollections((current) => setItemCollections(current, id, collectionIds))
    }
    setPendingProduct(null)
    setNewFromPicker([])
    setToast({
      // Named, as in flow 21 (Figma `1970:102469` "Added to Favorites").
      message: collectionTarget
        ? `Added to ${collections.find((c) => c.id === collectionTarget)?.name ?? 'collection'}`
        : addedToShopMessage(collections.filter((c) => collectionIds.includes(c.id))),
    })
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
    setPublishedAt(Date.now())
    setHasUnpublishedChanges(false)
    setPublishBlocked(false)
    setPublishBlockedShared(false)
    setShopPublished(true)
    setToast({ message: 'Your shop published successfully' })
    logShopActivity('shop-published')
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

  /** New collections start at #1 on the storefront (Collections Q7). */
  function addCollection(name: string, description: string) {
    const next = createCollection(collections, name, description)
    setCollections(next)
    setNewCollectionOpen(false)
    markChanged()
    // From the Add to collection / Add to shop dialogs the new board just
    // joins the list, ticked; the toast comes when that dialog saves
    // (Figma `1862:86823`).
    if (collectingItem || pendingProduct) {
      setNewFromPicker((current) => [...current, next[0].id])
      return
    }
    setToast({ message: `${name.trim()} created` })
  }

  function saveItemCollections(item: ShopItem, collectionIds: string[]) {
    const before = collections.filter((c) => c.itemIds.includes(item.id)).map((c) => c.id)
    const added = collections.filter((c) => collectionIds.includes(c.id) && !before.includes(c.id))
    setCollections((current) => setItemCollections(current, item.id, collectionIds))
    setCollectingItem(null)
    setNewFromPicker([])
    setToast({ message: collectionsSavedMessage(added) })
    markChanged()
  }

  function saveCollectionDetails(id: string, name: string, description: string) {
    setCollections((current) => updateCollection(current, id, name, description))
    setEditingCollection(null)
    setToast({ message: 'Collection updated' })
    markChanged()
  }

  /** Copy from the design (Figma `1862:87448`). */
  function removeCollection(collection: Collection) {
    setCollections((current) => deleteCollection(current, collection.id))
    setDeletingCollection(null)
    setOpenCollectionId((current) => (current === collection.id ? null : current))
    setToast({
      message: `${collection.name} is no longer in the collection, but its products are still available in your shop.`,
    })
    markChanged()
  }

  function confirmRemoveFromCollection(item: ShopItem, collection: Collection) {
    const { next, index } = removeItemFromCollection(collections, collection.id, item.id)
    setCollections(next)
    setUnlinking(null)
    markChanged()
    setToast({
      message: `Removed from ${collection.name}. Still in your shop.`,
      action: {
        label: 'Undo',
        onClick: () => {
          setCollections((current) => restoreItemInCollection(current, collection.id, item.id, index))
          setToast(null)
        },
      },
    })
  }

  /** Flow 08: the collection page's card menu removes at once, with Undo
   *  (reversible, so no confirm). */
  function removeFromOpenCollection(item: ShopItem, collection: Collection) {
    const { next, index } = removeItemFromCollection(collections, collection.id, item.id)
    setCollections(next)
    markChanged()
    setToast({
      message: `Removed from ${collection.name}. Still in your shop.`,
      action: {
        label: 'Undo',
        onClick: () => {
          setCollections((current) => restoreItemInCollection(current, collection.id, item.id, index))
          setToast(null)
        },
      },
    })
  }

  /** Flow 13: the page says "Collection link copied"; from a board, which
   *  doesn't show the name, the toast names it. */
  function copyCollectionLink(collection: Collection, from: 'page' | 'board') {
    navigator.clipboard?.writeText(collectionLinkFor(collection)).catch(() => {})
    setToast({ message: from === 'page' ? 'Collection link copied' : `Link to ${collection.name} copied` })
  }

  /** Each move saves at once with no toast: the board moving is the feedback.
   *  A failed save snaps back with the old error toast (Collections Q7). */
  function reorderCollection(id: string, direction: 'earlier' | 'later') {
    if (Math.random() < REORDER_FAILURE_RATE) {
      setBoardMotion({ id, kind: 'failed', at: Date.now() })
      setToast({
        message: "Couldn't save the new order, we put it back the way it was",
        variant: 'error',
      })
      return
    }
    setCollections((current) => moveCollection(current, id, direction))
    setBoardMotion({ id, kind: 'moved', at: Date.now() })
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
  // Results follow the *submitted* search, not the box's live text: clearing
  // the box or typing a new keyword leaves the list alone until Enter, so the
  // page doesn't reflow (and jump) on every keystroke.
  const results = overlay?.kind === 'results' ? searchProducts(overlay.query) : []

  /** Builds the favorite/remove/affiliate-link controls for the standalone
   *  Product Detail page of an item already in the shop. */
  function shopModeFor(item: ShopItem, showPerformance: boolean) {
    return {
      collections: collectionsFor(item.id, collections),
      onRemoveFromCollection: (collectionId: string) => {
        const collection = collections.find((c) => c.id === collectionId)
        if (collection) setUnlinking({ item, collection })
      },
      variant: item.variant,
      onAddToCollection: () => setCollectingItem(item),
      onRemoveFromShop: () => setRemovalCandidate(item),
      affiliateLink: affiliateLinkFor(item.product),
      onCopyLink: () => copyAffiliateLink(item),
      published: hasLiveLink(item, publishedAt),
      statsHref: productStatsHash(item.id, 'shop'),
      showPerformance,
    }
  }

  return (
    <>
      {previewOpen ? (
        <StorefrontPreview
          items={items}
          collections={collections}
          onClose={() => setPreviewOpen(false)}
          onCopyShopLink={copyShopLink}
          onCopyCollectionLink={(collection) => copyCollectionLink(collection, 'page')}
        />
      ) : viewingItem ? (
        <ProductDetailPage
          item={viewingItem}
          shopMode={shopModeFor(viewingItem, true)}
          onBackToShop={() => setViewingItemId(null)}
          onRequestSample={() => setSampleProduct(viewingItem.product)}
        />
      ) : (
        <MyShop
          items={items}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onBrowse={openCatalogue}
          onPreview={() => setPreviewOpen(true)}
          onViewShop={() => {
            // Same origin as whatever's running, not a hardcoded deployment:
            // the storefront reads the shop from this browser's localStorage,
            // so pointing at the deployed URL from a dev server opened a
            // *different* app with a different (usually empty) shop — the
            // storefront looked broken when the data simply wasn't there.
            window.open(routeUrl('/shop/view'), '_blank')
          }}
          published={publishedAt !== null}
          publishedAt={publishedAt}
          hasUnpublishedChanges={hasUnpublishedChanges}
          publishBlocked={publishBlocked}
          onPublish={() => setPublishOpen(true)}
          onViewDetails={(item) => setViewingItemId(item.id)}
          onCopyLink={copyAffiliateLink}
          onAddToCollection={setCollectingItem}
          onRemoveFromShop={(item) => setRemovalCandidate(item)}
          collections={collections}
          onNewCollection={() => setNewCollectionOpen(true)}
          onMoveCollection={reorderCollection}
          onEditCollection={setEditingCollection}
          onDeleteCollection={setDeletingCollection}
          openCollectionId={openCollectionId}
          onOpenCollection={setOpenCollectionId}
          onCopyCollectionLink={copyCollectionLink}
          onRemoveFromCollection={removeFromOpenCollection}
          boardMotion={boardMotion}
          onAddProductsToCollection={(collection) => {
            setCollectionTarget(collection.id)
            openCatalogue()
          }}
        />
      )}

      {overlay && (
        <BrowseOverlay
          onClose={() => {
            setOverlay(null)
            setCollectionTarget(null)
          }}
          scrollKey={overlay.kind === 'detail' ? `detail:${overlay.product.id}` : overlay.kind}
          scrollResetKey={overlay.kind === 'results' ? overlay.query : undefined}
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
              addLabel={collectionTarget ? 'Add to Collection' : undefined}
            />
          )}

          {overlay.kind === 'detail' && (
            <ProductDetail
              product={overlay.product}
              animateOnMount
              onBackToCatalogue={openCatalogue}
              onBackToResults={() => setOverlay({ kind: 'results', query: overlay.query })}
              onAddToShop={() => setPendingProduct(overlay.product)}
              onRequestSample={() => setSampleProduct(overlay.product)}
            />
          )}
        </BrowseOverlay>
      )}

      {pendingProduct && (
        <AddToShopModal
          product={pendingProduct}
          collections={collections}
          initialCollectionIds={collectionTarget ? [collectionTarget] : []}
          title={collectionTarget ? 'Add this product to collection?' : undefined}
          newCollectionIds={newFromPicker}
          onNewCollection={() => setNewCollectionOpen(true)}
          existingVariants={items
            .filter((item) => item.product.id === pendingProduct.id)
            .map((item) => item.variant)}
          onClose={() => {
            setPendingProduct(null)
            setNewFromPicker([])
          }}
          onConfirm={confirmAdd}
        />
      )}

      {publishOpen && (
        <PublishShopDialog
          profileComplete={profileComplete}
          hasProducts={items.length > 0}
          onClose={() => setPublishOpen(false)}
          onPublish={confirmPublish}
          onCompleteProfile={() => { navigate(getSetupManageAccountRoute()) }}
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

      <RequestSampleFlow product={sampleProduct} onClose={() => setSampleProduct(null)} />

      {collectingItem && (
        <AddToCollectionDialog
          item={collectingItem}
          collections={collections}
          newCollectionIds={newFromPicker}
          onNewCollection={() => setNewCollectionOpen(true)}
          onClose={() => {
            setCollectingItem(null)
            setNewFromPicker([])
          }}
          onSave={(ids) => saveItemCollections(collectingItem, ids)}
        />
      )}

      {newCollectionOpen && (
        <CollectionDialog
          mode="create"
          takenNames={collections.map((c) => c.name)}
          onSubmit={addCollection} onClose={() => setNewCollectionOpen(false)} />
      )}

      {editingCollection && (
        <CollectionDialog
          mode="edit"
          takenNames={collections.filter((c) => c.id !== editingCollection.id).map((c) => c.name)}
          initialName={editingCollection.name}
          initialDescription={editingCollection.description}
          onSubmit={(name, description) => saveCollectionDetails(editingCollection.id, name, description)}
          onClose={() => setEditingCollection(null)}
        />
      )}

      {unlinking && (
        <RemoveFromCollectionDialog
          productName={unlinking.item.product.name}
          collectionName={unlinking.collection.name}
          onClose={() => setUnlinking(null)}
          onConfirm={() => confirmRemoveFromCollection(unlinking.item, unlinking.collection)}
        />
      )}

      {deletingCollection && (
        <DeleteCollectionDialog
          name={deletingCollection.name}
          productCount={
            deletingCollection.itemIds.filter((id) => items.some((item) => item.id === id)).length
          }
          onClose={() => setDeletingCollection(null)}
          onConfirm={() => removeCollection(deletingCollection)}
        />
      )}

      {toast && (
        <Toast message={toast.message} variant={toast.variant} action={toast.action} />
      )}
    </>
  )
}
