import { useRef, useState, useSyncExternalStore } from 'react'
import AppFooter from '../../portal/components/AppFooter'
import { getSelectedCountry, subscribeToSelectedCountry } from '../../portal/country-status'
import { getSavedDisplayName } from '../../portal/profile-status'
import { CreatorMarketBar } from '../components/CreatorMarketBar'
import { EmptyStorefront } from '../components/EmptyStorefront'
import { Icon } from '../components/Icon'
import { NoAvailabilityNotice } from '../components/NoAvailabilityNotice'
import { ScaledBox } from '../components/ScaledBox'
import { StorefrontHeader } from '../components/StorefrontHeader'
import { StorefrontProductCard } from '../components/StorefrontProductCard'
import { StorefrontProductDetail } from '../components/StorefrontProductDetail'
import { StorefrontProfileCard } from '../components/StorefrontProfileCard'
import { StorefrontReviews } from '../components/StorefrontReviews'
import { reviewsForShop } from '../data/reviews'
import { useHasOverflowX } from '../hooks/useHasOverflowX'
import { CONTENT_COLUMN } from '../layout'
import type { ShopItem } from '../types'

type StorefrontPreviewProps = {
  items: ShopItem[]
  onClose: () => void
  onCopyShopLink: () => void
}

/** Also the threshold above which pagination appears at all — 8 or fewer
 *  picks all fit on one page, so the controls stay hidden. */
const PICKS_PER_PAGE = 8
/** How far one click of the favorite-strip's prev/next scrolls — one card + its gap. */
const FAVORITES_SCROLL_STEP = 288 + 16

function FavoritePicks({
  items,
  country,
  /** The storefront owner's display name: the strip is titled after them
   *  ("CHARLOTTE'S FAVORITE PICKS", Figma `1619:36970`). */
  ownerName,
  onSelect,
}: {
  items: ShopItem[]
  country: string
  ownerName: string
  onSelect: (item: ShopItem) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canScroll = useHasOverflowX(scrollRef, items.length)

  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -FAVORITES_SCROLL_STEP : FAVORITES_SCROLL_STEP,
      behavior: 'smooth',
    })
  }

  return (
    <section className="flex w-full flex-col items-center gap-md-2 bg-gradient-to-b from-surface-tertiary-500/0 to-surface-tertiary-500 py-3xl">
      <div className={`flex items-center gap-md-2 ${CONTENT_COLUMN}`}>
        <p className="flex-1 text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
          {ownerName}&rsquo;s favorite picks
        </p>
        {/* Only when the strip actually overflows. With a handful of favorite
            picks every card is already on screen, and arrows that scroll
            nothing read as broken controls. */}
        {canScroll && (
          <div className="flex items-start gap-sm">
            <button
              type="button"
              aria-label="Scroll favorite products left"
              onClick={() => scroll('left')}
              className="flex items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
            >
              <Icon name="chevron-left" />
            </button>
            <button
              type="button"
              aria-label="Scroll favorite products right"
              onClick={() => scroll('right')}
              className="flex items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
            >
              <Icon name="chevron-right" />
            </button>
          </div>
        )}
      </div>
      {/* The card track is the 1200px content column, not the full page width
          (Figma `916:65772`), so the page margin does the clipping and the row
          starts and ends on the same edges as the profile card above it. The
          margin has to sit on this wrapper rather than as the scroller's own
          padding: as padding it scrolls with the content, which put the
          overflow out in the page margin instead of clipped against it. */}
      <div className={CONTENT_COLUMN}>
        <div
          ref={scrollRef}
          className="flex w-full gap-md overflow-x-auto [scrollbar-width:none]"
        >
          {items.map((item) => (
            <StorefrontProductCard
              key={item.id}
              product={item.product}
              /* 288px, matching All Picks rather than the design's 280 — asked
                 for directly, so the two sections' cards are the same size.
                 It also divides the 1200px column exactly four ways
                 (4 x 288 + 3 x 16 = 1200), so a row of four is flush with the
                 column edge. */
              className="w-[288px]"
              available={item.product.regions.includes(country)}
              onClick={() => onSelect(item)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

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
 * rather than the section's placeholder products — "Top Favorite Products"
 * mirrors the Favorite tab and is omitted entirely when nothing is favorite,
 * since the Figma frames never show that empty case. With no products at
 * all (e.g. everything removed after publishing), swaps both product
 * sections for the dedicated empty state.
 */
export function StorefrontPreview({ items, onClose, onCopyShopLink }: StorefrontPreviewProps) {
  const favoriteItems = items.filter((item) => item.favorite)
  const name = getSavedDisplayName('Charlotte')
  const country = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry)
  const hasAvailableItems = items.some((item) => item.product.regions.includes(country))
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      {/* `position: sticky` can't live *inside* `ScaledBox` — its offsets are
          resolved in the box's pre-transform coordinate space, so a stuck
          element drifts by `scrollY × (1 - scale)`, which grows without bound
          as you scroll. Sticking an untransformed wrapper and scaling its
          contents instead keeps the chrome pinned exactly. Both boxes share a
          design width, so they resolve to the same scale. */}
      <div className="sticky top-0 z-30 flex w-full justify-center">
        <ScaledBox width={1440} className="flex flex-col items-start">
          <StorefrontHeader onClose={onClose} />
          {selectedItem && (
            <CreatorMarketBar name={name} country={country} onBack={() => setSelectedItem(null)} />
          )}
        </ScaledBox>
      </div>

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
            ) : (
              <>
                <div className="flex w-full flex-col gap-md-2 px-margin pt-md-2">
                  <StorefrontProfileCard onCopyLink={onCopyShopLink} />
                  {items.length > 0 && !hasAvailableItems && <NoAvailabilityNotice />}
                </div>

                {items.length === 0 ? (
                  <EmptyStorefront name={name} />
                ) : (
                  <>
                    {favoriteItems.length > 0 && (
                      <FavoritePicks
                        items={favoriteItems}
                        country={country}
                        ownerName={name}
                        onSelect={setSelectedItem}
                      />
                    )}
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

          <AppFooter />
        </ScaledBox>
      </div>
    </div>
  )
}
