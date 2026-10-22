import { useState, useSyncExternalStore, type CSSProperties } from 'react'
import { Icon } from '../components/Icon'
import AppFooter from '../../portal/components/AppFooter'
import { getSelectedCountry, subscribeToSelectedCountry } from '../../portal/country-status'
import { getSavedDisplayName } from '../../portal/profile-status'
import { CreatorMarketBar } from '../components/CreatorMarketBar'
import { EmptyStorefront } from '../components/EmptyStorefront'
import { NoAvailabilityNotice } from '../components/NoAvailabilityNotice'
import { ScaledBox } from '../components/ScaledBox'
import { StorefrontHeader } from '../components/StorefrontHeader'
import { StorefrontBreadcrumb } from '../components/StorefrontBreadcrumb'
import { StorefrontProductCard } from '../components/StorefrontProductCard'
import { StorefrontProductDetail } from '../components/StorefrontProductDetail'
import { StorefrontBanner } from '../components/StorefrontBanner'
import { StorefrontReviews } from '../components/StorefrontReviews'
import { StorefrontCollections } from '../components/StorefrontCollections'
import { StorefrontCollectionPage } from '../components/StorefrontCollectionPage'
import type { Collection } from '../collections-store'
import { reviewsForShop } from '../data/reviews'
import type { ShopItem } from '../types'
import type { AvailableFeatured } from '../featured'
import { backdropColors } from '../data/backdrop-colors'

type StorefrontPreviewProps = {
  items: ShopItem[]
  /** Board order as the creator set it; the preview drops empty ones. */
  collections: Collection[]
  onClose: () => void
  onCopyShopLink: () => void
  onCopyCollectionLink: (collection: Collection) => void
  /** The saved banner (`T-38`): the preview shows it before it's published. */
  backdropId: string
  featured: AvailableFeatured[]
}

/** Also the threshold above which pagination appears at all — 8 or fewer
 *  picks all fit on one page, so the controls stay hidden. */
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
    <section className="flex w-full flex-col items-center gap-md-2 px-margin py-3xl">
      <p className="w-full max-w-[1200px] text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
        All Picks
      </p>
      {/* 16px between columns, 24px between rows — the design's own gaps
          (`916:65835` spaces its cards 296px apart at 280 wide). A uniform 24
          here made the columns 282px, so this grid's cards came out 6px
          narrower than the same cards on the public storefront. */}
      <div className="grid w-full max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-x-md gap-y-lg">
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
 * A live preview of the creator's public storefront (Figma section
 * `917:53442`), reached from the "Preview Storefront" button on `StoreCard`
 * (enabled only once the shop is published). Shows the real shop contents
 * rather than the section's placeholder products. The Collections row (flow
 * 15, Figma `1862:82562`) replaced Favorite Picks: the creator's boards in
 * their order, empty ones hidden, and no row at all when none has a product.
 * With no products at
 * all (e.g. everything removed after publishing), swaps both product
 * sections for the dedicated empty state.
 */
export function StorefrontPreview({ items, collections, onClose, onCopyShopLink, onCopyCollectionLink, backdropId, featured }: StorefrontPreviewProps) {
  const name = getSavedDisplayName('Charlotte')
  const country = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry)
  const hasAvailableItems = items.some((item) => item.product.regions.includes(country))
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  /** A board opened in the preview (flow 16), and the collection a product
   *  was opened from, for the market bar. */
  const [openCollection, setOpenCollection] = useState<Collection | null>(null)
  const [fromCollection, setFromCollection] = useState<Collection | null>(null)

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center overflow-x-clip bg-surface-secondary-100"
      style={
        {
          '--shop-product-card': backdropColors(backdropId).productCard,
        } as CSSProperties
      }
    >
      {/* The footer never shares the first screenful, however short the
          preview: the chrome and content fill at least the window ("Footer
          below the fold" in CLAUDE.md). */}
      <div className="flex min-h-screen w-full flex-col">
        {/* `position: sticky` can't live *inside* `ScaledBox` — its offsets are
            resolved in the box's pre-transform coordinate space, so a stuck
            element drifts by `scrollY × (1 - scale)`, which grows without bound
            as you scroll. Sticking an untransformed wrapper and scaling its
            contents instead keeps the chrome pinned exactly. The bars span the
            window, as on Home; each scales only its contents, at the page's
            design width, so they resolve to the same scale. */}
        <div className="sticky top-0 z-30 flex w-full flex-col">
          <StorefrontHeader onClose={onClose} />
          {selectedItem && (
            <CreatorMarketBar
              name={name}
              country={country}
              collectionName={fromCollection?.name}
              onBack={() => setSelectedItem(null)}
              designWidth={1440}
            />
          )}
        </div>

        <div className="flex w-full flex-1 flex-col items-center">
          {!selectedItem && !openCollection && (
            <StorefrontBanner
              backdropId={backdropId}
              featured={featured}
              scaleContent
              onCopyLink={onCopyShopLink}
              onOpenFeatured={(item) =>
                item.kind === 'collection' ? setOpenCollection(item.collection) : setSelectedItem(item.item)
              }
            />
          )}

          <div className="flex w-full flex-1 justify-center">
          <ScaledBox width={1440} className="flex flex-col items-start bg-surface-secondary-100">
            <main className="flex w-full flex-col items-start">
              {selectedItem ? (
                <StorefrontProductDetail
                  item={selectedItem}
                  country={country}
                  creatorName={name}
                  onBack={() => setSelectedItem(null)}
                />
              ) : openCollection ? (
                <div className="flex w-full flex-col gap-md-2 pt-md-2">
                  <div className="px-margin">
                    <StorefrontBreadcrumb
                      items={[
                        { label: 'Home', onClick: () => setOpenCollection(null) },
                        { label: 'Creators', onClick: () => setOpenCollection(null) },
                        { label: name, onClick: () => setOpenCollection(null) },
                        { label: openCollection.name },
                      ]}
                    />
                  </div>
                  <div className="px-margin">
                    <button
                      type="button"
                      onClick={() => setOpenCollection(null)}
                      className="flex cursor-pointer items-center gap-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
                    >
                      <Icon name="chevron-left" />
                      {name}&rsquo;s storefront
                    </button>
                  </div>
                  <StorefrontCollectionPage
                    collection={openCollection}
                    items={items}
                    collections={collections}
                    ownerName={name}
                    country={country}
                    onSelectItem={(item) => {
                      setFromCollection(openCollection)
                      setSelectedItem(item)
                    }}
                    onSelectCollection={setOpenCollection}
                    onCopyLink={() => onCopyCollectionLink(openCollection)}
                  />
                </div>
              ) : (
                <>
                  {items.length > 0 && !hasAvailableItems && (
                    <div className="flex w-full flex-col px-margin pt-md-2">
                      <NoAvailabilityNotice country={country} />
                    </div>
                  )}

                  {items.length === 0 ? (
                    <EmptyStorefront name={name} />
                  ) : (
                    <>
                      <StorefrontCollections
                        collections={collections}
                        items={items}
                        bleed
                        onSelect={(collection) => {
                          setFromCollection(null)
                          setOpenCollection(collection)
                        }}
                      />
                      <StorefrontReviews
                        reviews={reviewsForShop(items)}
                        ownerName={name}
                        onSelect={setSelectedItem}
                      />
                      <AllPicks items={items} country={country} onSelect={setSelectedItem} />
                    </>
                  )}
                </>
              )}
            </main>
          </ScaledBox>
          </div>
        </div>
      </div>

      {/* Outside the scaled box, so it spans the window as on every other page. */}
      <AppFooter />
    </div>
  )
}
