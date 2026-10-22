import { useEffect, useState, useSyncExternalStore } from 'react'
import AppFooter from '../../portal/components/AppFooter'
import { getSelectedCountry, subscribeToSelectedCountry } from '../../portal/country-status'
import { getSavedDisplayName } from '../../portal/profile-status'
import { CreatorMarketBar } from '../components/CreatorMarketBar'
import { EmptyStorefront } from '../components/EmptyStorefront'
import { NoAvailabilityNotice } from '../components/NoAvailabilityNotice'
import { StorefrontBreadcrumb } from '../components/StorefrontBreadcrumb'
import { StorefrontProductCard } from '../components/StorefrontProductCard'
import { StorefrontProductDetail } from '../components/StorefrontProductDetail'
import { StorefrontBanner } from '../components/StorefrontBanner'
import { StorefrontPublicHeader } from '../components/StorefrontPublicHeader'
import { StorefrontReviews } from '../components/StorefrontReviews'
import { StorefrontCollections } from '../components/StorefrontCollections'
import { CollectionUnavailable, StorefrontCollectionPage } from '../components/StorefrontCollectionPage'
import { collectionLinkFor, collectionsFor, loadCollections, type Collection } from '../collections-store'
import { navigate } from '../../router'
import { Toast } from '../components/Toast'
import { reviewsForShop } from '../data/reviews'
import { SHOP_URL } from '../data/shop'
import { CONTENT_COLUMN } from '../layout'
import { loadShopItems } from '../shop-items-store'
import { loadPublishedBackdrop, loadPublishedFeatured } from '../banner-store'
import { resolveFeatured, shopperFeatured } from '../featured'
import type { ShopItem } from '../types'

const PICKS_PER_PAGE = 8
function AllPicks({
  items,
  country,
  onSelect,
}: {
  items: ShopItem[]
  country: string
  onSelect: (item: ShopItem) => void
}) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / PICKS_PER_PAGE))
  const visible = items.slice((page - 1) * PICKS_PER_PAGE, page * PICKS_PER_PAGE)

  return (
    <section className={`flex flex-col items-center gap-md-2 py-3xl ${CONTENT_COLUMN}`}>
      <p className="w-full text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
        All Picks
      </p>
      {/* 16px between columns, 24px between rows — the design's own gaps.
          Its cards are a fixed 280px, which leaves 32px unused at the end
          of each four-up row; letting them flex instead keeps the grid
          flush with the column (288px a card at 1440px) and still reflows
          to fewer columns on narrower viewports. */}
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-x-md gap-y-lg">
        {visible.map((item) => (
          <StorefrontProductCard
            key={item.id}
            product={item.product}
            className="w-full"
            available={item.product.regions.includes(country)}
            onClick={() => onSelect(item)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-sm pt-md">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="size-[38px] disabled:opacity-40"
          >
            <img src="/assets/icons/page-prev.svg" alt="" className="size-full" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-current={pageNumber === page ? 'page' : undefined}
              onClick={() => setPage(pageNumber)}
              className={[
                'flex size-[38px] items-center justify-center overflow-clip rounded-md text-body-sm leading-[1.4] font-medium',
                pageNumber === page
                  ? 'bg-surface-primary-500 text-text-secondary-100'
                  : 'border border-border-default bg-surface-secondary-100 text-text-secondary-1000',
              ].join(' ')}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            disabled={page === totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="size-[38px] disabled:opacity-40"
          >
            <img src="/assets/icons/page-next.svg" alt="" className="size-full" />
          </button>
        </div>
      )}
    </section>
  )
}

/**
 * The real public storefront page — what "View Shop" opens (in a new tab)
 * once the shop is published with no pending changes. Reads the persisted
 * shop items directly, since a new tab starts with no shared state from the
 * Manage Shop tab that opened it.
 *
 * Availability follows the market chosen in the header's country switcher, the
 * same way the creator's own preview does: picks that don't ship there are
 * badged and lose their price and buy action, a storefront with nothing
 * available at all says so above the picks (Figma `916:65413`), and opening
 * such a pick lands on a product page offering to notify instead of to buy
 * (`916:66693`).
 */
export function StandaloneStorefront({ collectionId }: { collectionId?: string } = {}) {
  const items = loadShopItems()
  const collections = loadCollections(items)
  const name = getSavedDisplayName('Charlotte')
  const country = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry)
  // Shoppers only ever see the published banner (flow 06), and never a
  // featured product that isn't sold in their market.
  const backdropId = loadPublishedBackdrop()
  const featured = shopperFeatured(resolveFeatured(loadPublishedFeatured(), items, collections, country))
  const hasAvailableItems = items.some((item) => item.product.regions.includes(country))
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  /** The collection a product was opened from, for the market bar (16.3). */
  const [fromCollection, setFromCollection] = useState<Collection | null>(null)

  // A shared link: /shop/view/collections/<id> (flows 16 and 17). Missing,
  // emptied, or nothing shipping to this market reads as unavailable.
  const linkedCollection = collectionId
    ? collections.find((collection) => collection.id === collectionId) ?? null
    : null
  const linkedAvailable =
    linkedCollection !== null &&
    items.some(
      (item) => linkedCollection.itemIds.includes(item.id) && item.product.regions.includes(country),
    )
  const openCollection = (collection: Collection) => {
    setSelectedItem(null)
    navigate(`/shop/view/collections/${collection.id}`)
  }

  const [linkCopied, setLinkCopied] = useState(false)
  useEffect(() => {
    if (!linkCopied) return
    // Matches the toast's own 3.2s lifecycle animation.
    const timer = window.setTimeout(() => setLinkCopied(false), 3200)
    return () => window.clearTimeout(timer)
  }, [linkCopied])

  const [copiedMessage, setCopiedMessage] = useState('Shop link copied to clipboard')
  // Same wording as the in-app preview's toast (`shop/App.tsx`).
  const copyShopLink = () => {
    navigator.clipboard?.writeText(SHOP_URL).catch(() => {})
    setCopiedMessage('Shop link copied to clipboard')
    setLinkCopied(true)
  }
  const copyCollectionLink = (collection: Collection) => {
    navigator.clipboard?.writeText(collectionLinkFor(collection)).catch(() => {})
    setCopiedMessage('Collection link copied')
    setLinkCopied(true)
  }

  const clearSelection = () => setSelectedItem(null)
  const selectFrom = (collection: Collection | null) => (item: ShopItem) => {
    setFromCollection(collection)
    setSelectedItem(item)
  }

  const hasCollections = collections.some((collection) =>
    collection.itemIds.some((id) => items.some((item) => item.id === id)),
  )
  const showFavorite = items.length > 0 && hasCollections
  // "<Name>'s Reviews" sits between Collections and All Picks, as in the
  // in-app preview (Figma `957:29042`); with no collections it leads straight
  // into All Picks.
  const reviews = reviewsForShop(items)
  const reviewsSection =
    reviews.length > 0 ? (
      <StorefrontReviews reviews={reviews} ownerName={name} onSelect={setSelectedItem} />
    ) : null
  const picks =
    items.length === 0 ? (
      <EmptyStorefront name={name} />
    ) : (
      <AllPicks items={items} country={country} onSelect={setSelectedItem} />
    )

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-surface-secondary-100">
      {/* The footer never shares the first screenful, however short the shop
          or product page: everything above it fills at least the window, the
          same rule as `AppShell`'s `footerBelowFold`. */}
      <div className="flex min-h-screen w-full flex-col items-center">
        {/* The site header stays put while the page scrolls, and on a product
            page the market bar sticks under it — so which market's prices you're
            looking at, and whose shop, stay on screen the whole way down. Both
            live in one sticky wrapper rather than sticking separately: stacked
            `top-0` / `top-[88px]` offsets would have to be kept in step with the
            header's height by hand, whereas one wrapper just carries whatever is
            inside it. Plain CSS sticky works here because this screen, unlike the
            in-app preview, has no `ScaledBox` transform above it to break it.

            The breadcrumb is deliberately left out of the wrapper — it's page
            content, not chrome, and scrolls away with the rest. */}
        <div className="sticky top-0 z-30 flex w-full flex-col items-center">
          <StorefrontPublicHeader />
          {selectedItem && (
            /* A product page swaps the site breadcrumb for the market bar, which
               states whose picks these are and which market's prices and stock
               are being shown (Figma `916:66693`). The page's own breadcrumb
               comes back from inside `StorefrontProductDetail`, as the product's
               shelf path. */
            <CreatorMarketBar
              name={name}
              country={country}
              collectionName={fromCollection?.name}
              onBack={() => {
                clearSelection()
                if (fromCollection) navigate(`/shop/view/collections/${fromCollection.id}`)
              }}
            />
          )}
        </div>

        {!selectedItem && (
          /* Static, like the site nav above it: the shelves above this page have
             no screens to point at yet. */
          <div className={CONTENT_COLUMN}>
            <StorefrontBreadcrumb
              items={
                linkedCollection && linkedAvailable
                  ? [
                      { label: 'Home', onClick: () => navigate('/shop/view') },
                      { label: 'Creators', onClick: () => navigate('/shop/view') },
                      { label: name, onClick: () => navigate('/shop/view') },
                      { label: linkedCollection.name },
                    ]
                  : [
                      { label: 'Home', onClick: () => navigate('/shop/view') },
                      { label: 'Creators', onClick: () => navigate('/shop/view') },
                      { label: name, onClick: () => navigate('/shop/view') },
                    ]
              }
            />
          </div>
        )}

        <main className="flex w-full flex-1 flex-col items-center">
          {selectedItem ? (
            <>
              <div className={CONTENT_COLUMN}>
                <StorefrontProductDetail
                  item={selectedItem}
                  country={country}
                  creatorName={name}
                  onBack={clearSelection}
                />
              </div>
              {/* "In <name>'s collections" (Figma `1862:82122`): the boards
                  this product is in. Outside the column so its tint runs
                  edge to edge; it centres its own content in the column. */}
              <StorefrontCollections
                title={`In ${name}'s collections`}
                collections={collections.filter((collection) =>
                  collectionsFor(selectedItem.id, collections).some((c) => c.id === collection.id),
                )}
                items={items}
                onSelect={openCollection}
              />
            </>
          ) : collectionId ? (
            linkedCollection && linkedAvailable ? (
              <StorefrontCollectionPage
                collection={linkedCollection}
                items={items}
                collections={collections}
                ownerName={name}
                country={country}
                onSelectItem={selectFrom(linkedCollection)}
                onSelectCollection={openCollection}
                onCopyLink={() => copyCollectionLink(linkedCollection)}
              />
            ) : (
              <CollectionUnavailable
                ownerName={name}
                items={items}
                collections={collections.filter((collection) => collection.id !== collectionId)}
                onVisitStorefront={() => navigate('/shop/view')}
                onSelectCollection={openCollection}
              />
            )
          ) : (
            <>
              {/* The banner runs the full width straight under the breadcrumb
                  (06.1–06.3, main file `2799:104829`), with the first section
                  directly below it. */}
              <StorefrontBanner
                backdropId={backdropId}
                featured={featured}
                onCopyLink={copyShopLink}
                onOpenFeatured={(item) => (item.kind === 'collection' ? openCollection(item.collection) : selectFrom(null)(item.item))}
              />
              <div className="flex w-full flex-col items-center gap-3xl">
                {/* Nothing here ships to the selected market (`1616:66073`). */}
                {items.length > 0 && !hasAvailableItems && (
                  <div className={`${CONTENT_COLUMN} pt-3xl`}>
                    <NoAvailabilityNotice country={country} allowCountryChange />
                  </div>
                )}
                {showFavorite ? (
                  <StorefrontCollections
                    collections={collections}
                    items={items}
                    showViewAll
                    onSelect={openCollection}
                  />
                ) : (
                  reviewsSection ?? picks
                )}
              </div>
              {showFavorite && reviewsSection}
              {(showFavorite || reviewsSection) && picks}
            </>
          )}
        </main>

        {/* Figma `916:65859` — breathing room between the last section and the
            footer, on top of the section's own bottom padding. A product page
            brings its own, shorter (64px) spacer. A collection page has none: its
            tinted "More collections" row stretches to the footer instead. */}
        {!selectedItem && !collectionId && <div className="h-[80px] w-full shrink-0" />}
      </div>

      <AppFooter />

      {linkCopied ? <Toast message={copiedMessage} /> : null}
    </div>
  )
}
