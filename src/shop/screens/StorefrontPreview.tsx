import { useRef, useState } from 'react'
import AppFooter from '../../portal/components/AppFooter'
import { getSavedDisplayName } from '../../portal/profile-status'
import { Icon } from '../components/Icon'
import { ScaledBox } from '../components/ScaledBox'
import { StorefrontProductCard } from '../components/StorefrontProductCard'
import { StorefrontProfileCard } from '../components/StorefrontProfileCard'
import type { ShopItem } from '../types'

type StorefrontPreviewProps = {
  items: ShopItem[]
  onClose: () => void
  onCopyShopLink: () => void
}

const PICKS_PER_PAGE = 4
/** How far one click of the featured-strip's prev/next scrolls — one card + its gap. */
const FEATURED_SCROLL_STEP = 280 + 16

function StorefrontHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex w-full items-center justify-between rounded-b-[16px] border-b border-border-default bg-surface-secondary-100 px-margin py-md-2">
      <button type="button" onClick={onClose} className="flex items-center gap-md-2">
        <img src="/assets/img/urmei-mark.svg" alt="" className="h-[16px] w-[29.573px]" />
        <p className="text-body-lg font-medium text-text-secondary-1000">Your shop preview</p>
      </button>
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="flex size-[38px] items-center justify-center overflow-clip"
      >
        <Icon name="x" size={24} />
      </button>
    </header>
  )
}

function TopFeaturedProducts({ items }: { items: ShopItem[] }) {
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

function AllPicks({ items }: { items: ShopItem[] }) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / PICKS_PER_PAGE))
  const visible = items.slice((page - 1) * PICKS_PER_PAGE, page * PICKS_PER_PAGE)

  return (
    <section className="flex w-full flex-col items-center gap-md-2 px-margin py-3xl">
      <p className="w-full max-w-[1200px] text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
        All picks by {getSavedDisplayName('Charlotte')}
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
 * A live preview of the influencer's public storefront (Figma section
 * `917:53442`), reached from the "Preview Storefront" button on `StoreCard`
 * (enabled only once the shop is published). Shows the real shop contents
 * rather than the section's placeholder products — "Top Featured Products"
 * mirrors the Featured tab and is omitted entirely when nothing is featured,
 * since the Figma frames never show that empty case.
 */
export function StorefrontPreview({ items, onClose, onCopyShopLink }: StorefrontPreviewProps) {
  const featuredItems = items.filter((item) => item.featured)

  return (
    <div className="flex min-h-screen w-full justify-center">
      <ScaledBox width={1440} className="flex min-h-screen flex-col items-start bg-surface-secondary-100">
        <StorefrontHeader onClose={onClose} />

        <main className="flex w-full flex-col items-start">
          <div className="w-full px-margin pt-md-2">
            <StorefrontProfileCard onCopyLink={onCopyShopLink} />
          </div>

          {featuredItems.length > 0 && <TopFeaturedProducts items={featuredItems} />}

          <AllPicks items={items} />
        </main>

        <AppFooter />
      </ScaledBox>
    </div>
  )
}
