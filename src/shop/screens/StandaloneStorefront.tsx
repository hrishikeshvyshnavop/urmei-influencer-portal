import { useRef, useState, useSyncExternalStore } from 'react'
import AppFooter from '../../portal/components/AppFooter'
import { getSelectedCountry, subscribeToSelectedCountry } from '../../portal/country-status'
import { getSavedDisplayName } from '../../portal/profile-status'
import { CreatorMarketBar } from '../components/CreatorMarketBar'
import { EmptyStorefront } from '../components/EmptyStorefront'
import { Icon } from '../components/Icon'
import { NoAvailabilityNotice } from '../components/NoAvailabilityNotice'
import { StorefrontBreadcrumb } from '../components/StorefrontBreadcrumb'
import { StorefrontProductCard } from '../components/StorefrontProductCard'
import { StorefrontProductDetail } from '../components/StorefrontProductDetail'
import { StorefrontProfileCard } from '../components/StorefrontProfileCard'
import { StorefrontPublicHeader } from '../components/StorefrontPublicHeader'
import { SHOP_URL } from '../data/shop'
import { useHasOverflowX } from '../hooks/useHasOverflowX'
import { CONTENT_COLUMN } from '../layout'
import { loadShopItems } from '../shop-items-store'
import type { ShopItem } from '../types'

const PICKS_PER_PAGE = 8
/** How far one click of the featured-strip's prev/next scrolls — one card + its gap. */
const FEATURED_SCROLL_STEP = 288 + 16

/**
 * "Top featured products" horizontal strip — its own component (rather than
 * reused from `StorefrontPreview`) because that screen is the in-app editor
 * preview (its own header/close chrome); this is the real public page opened
 * in a new tab by "View Shop", so it needs plain public-site chrome instead.
 */
function TopFeaturedProducts({
  items,
  country,
  onSelect,
}: {
  items: ShopItem[]
  country: string
  onSelect: (item: ShopItem) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canScroll = useHasOverflowX(scrollRef, items.length)

  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -FEATURED_SCROLL_STEP : FEATURED_SCROLL_STEP,
      behavior: 'smooth',
    })
  }

  return (
    <section className="flex w-full flex-col items-center gap-md-2 bg-gradient-to-b from-surface-tertiary-100/0 to-surface-tertiary-100 py-3xl">
      <div className={`flex items-center gap-md-2 ${CONTENT_COLUMN}`}>
        <p className="flex-1 text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
          Top featured products
        </p>
        {/* Only when the strip actually overflows. With a handful of featured
            picks every card is already on screen, and arrows that scroll
            nothing read as broken controls. */}
        {canScroll && (
          <div className="flex items-start gap-sm">
            <button
              type="button"
              aria-label="Scroll featured products left"
              onClick={() => scroll('left')}
              className="flex items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
            >
              <Icon name="chevron-left" />
            </button>
            <button
              type="button"
              aria-label="Scroll featured products right"
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
export function StandaloneStorefront() {
  const items = loadShopItems()
  const featuredItems = items.filter((item) => item.featured)
  const name = getSavedDisplayName('Charlotte')
  const country = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry)
  const hasAvailableItems = items.some((item) => item.product.regions.includes(country))
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)

  const copyShopLink = () => {
    navigator.clipboard?.writeText(SHOP_URL).catch(() => {})
  }

  const clearSelection = () => setSelectedItem(null)

  const showFeatured = items.length > 0 && featuredItems.length > 0
  const picks =
    items.length === 0 ? (
      <EmptyStorefront name={name} />
    ) : (
      <AllPicks items={items} country={country} onSelect={setSelectedItem} />
    )

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-surface-secondary-100">
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
          <CreatorMarketBar name={name} country={country} onBack={clearSelection} />
        )}
      </div>

      {!selectedItem && (
        /* Static, like the site nav above it: the shelves above this page have
           no screens to point at yet. */
        <div className={CONTENT_COLUMN}>
          <StorefrontBreadcrumb
            items={[{ label: 'Home' }, { label: 'Influencers' }, { label: name }]}
          />
        </div>
      )}

      <main className="flex w-full flex-col items-center">
        {selectedItem ? (
          <div className={CONTENT_COLUMN}>
            <StorefrontProductDetail
              item={selectedItem}
              country={country}
              creatorName={name}
              onBack={clearSelection}
            />
          </div>
        ) : (
          <>
            {/* The 36px gap belongs between the profile card and the *first*
                section only (Figma `916:65747` wraps exactly those two). The
                page frame itself has no gap, so every section after the first
                is spaced by its own 36px top padding alone. */}
            <div className="flex w-full flex-col items-center gap-3xl">
              <div className={CONTENT_COLUMN}>
                <StorefrontProfileCard onCopyLink={copyShopLink} />
              </div>
              {/* Nothing here ships to the selected market. Sits in the same
                  36px column as the card rather than tucked under it the way
                  the preview does — the edge frame's column is 952px tall,
                  which is 200 + 36 + 88 + 36 + 592. */}
              {items.length > 0 && !hasAvailableItems && (
                <div className={CONTENT_COLUMN}>
                  <NoAvailabilityNotice />
                </div>
              )}
              {showFeatured ? (
                <TopFeaturedProducts
                  items={featuredItems}
                  country={country}
                  onSelect={setSelectedItem}
                />
              ) : (
                picks
              )}
            </div>
            {showFeatured && picks}
          </>
        )}
      </main>

      {/* Figma `916:65859` — breathing room between the last section and the
          footer, on top of the section's own bottom padding. A product page
          brings its own, shorter (64px) spacer. */}
      {!selectedItem && <div className="h-[80px] w-full shrink-0" />}

      <AppFooter />
    </div>
  )
}
