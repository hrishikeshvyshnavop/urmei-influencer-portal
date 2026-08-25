import { useRef, useState } from 'react'
import AppFooter from '../../portal/components/AppFooter'
import { Icon } from '../components/Icon'
import { StorefrontProductCard } from '../components/StorefrontProductCard'
import { StorefrontProfileCard } from '../components/StorefrontProfileCard'
import { SHOP_URL } from '../data/shop'
import { loadShopItems } from '../shop-items-store'

const PICKS_PER_PAGE = 8
/** How far one click of the featured-strip's prev/next scrolls — one card + its gap. */
const FEATURED_SCROLL_STEP = 280 + 16

/**
 * "Top featured products" horizontal strip — its own component (rather than
 * reused from `StorefrontPreview`) because that screen is the in-app editor
 * preview (its own header/close chrome); this is the real public page opened
 * in a new tab by "View Shop", so it needs plain public-site chrome instead.
 */
function TopFeaturedProducts({ items }: { items: ReturnType<typeof loadShopItems> }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -FEATURED_SCROLL_STEP : FEATURED_SCROLL_STEP,
      behavior: 'smooth',
    })
  }

  return (
    <section className="flex w-full flex-col items-center gap-md-2 bg-gradient-to-b from-surface-tertiary-500/0 to-surface-tertiary-500 py-3xl">
      <div className="flex w-full items-center gap-md-2 px-margin">
        <p className="flex-1 text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
          Top featured products
        </p>
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
      </div>
      <div
        ref={scrollRef}
        className="flex w-full gap-md overflow-x-auto px-margin [scrollbar-width:none]"
      >
        {items.map((item) => (
          <StorefrontProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </section>
  )
}

function AllPicks({ items }: { items: ReturnType<typeof loadShopItems> }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / PICKS_PER_PAGE))
  const visible = items.slice((page - 1) * PICKS_PER_PAGE, page * PICKS_PER_PAGE)

  return (
    <section className="flex w-full flex-col items-center gap-md-2 px-margin py-3xl">
      <p className="w-full max-w-[1200px] text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
        All Picks
      </p>
      <div className="grid w-full max-w-[1200px] grid-cols-4 gap-lg">
        {visible.map((item) => (
          <StorefrontProductCard key={item.id} product={item.product} />
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
 */
export function StandaloneStorefront() {
  const items = loadShopItems()
  const featuredItems = items.filter((item) => item.featured)

  const copyShopLink = () => {
    navigator.clipboard?.writeText(SHOP_URL).catch(() => {})
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-surface-secondary-100">
      <header className="flex w-full items-center justify-center border-b border-border-default bg-surface-secondary-100 px-margin py-md-2">
        <img src="/urmei/home/logo.svg" alt="URMEI" className="h-4 w-[109px]" />
      </header>

      <main className="flex w-full flex-col items-start">
        <div className="w-full px-margin pt-md-2">
          <StorefrontProfileCard onCopyLink={copyShopLink} />
        </div>

        {featuredItems.length > 0 && <TopFeaturedProducts items={featuredItems} />}

        <AllPicks items={items} />
      </main>

      <AppFooter />
    </div>
  )
}
