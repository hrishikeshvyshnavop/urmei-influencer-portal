import { useRef, useState } from 'react'
import type { Collection } from '../collections-store'
import { useHasOverflowX } from '../hooks/useHasOverflowX'
import { CONTENT_COLUMN } from '../layout'
import type { ShopItem } from '../types'
import { CollectionCover } from './CollectionCover'
import { Icon } from './Icon'

/** How far one click of the row's prev/next scrolls: one board and its gap. */
const SCROLL_STEP = 288 + 16

type StorefrontCollectionsProps = {
  /** In the creator's chosen order; empty ones are dropped here. */
  collections: Collection[]
  items: ShopItem[]
  /** Replaces "COLLECTIONS", e.g. "More collections from <name>"
   *  on a collection page or "In <name>'s collections" under a product. */
  title?: string
  /** Opens a board; the storefront collection page is flow 16. */
  onSelect?: (collection: Collection) => void
  /** On the public e-commerce storefront, replace carousel arrows with an
   *  in-place View All action once more than four boards are available. */
  showViewAll?: boolean
  /** A full-bleed background needs the page's own bleed helper in the
   *  scaled preview; the public page paints it directly. */
  bleed?: boolean
  /** The fade-to-tint background; the collection page sits on plain white. */
  tinted?: boolean
  /** Extra classes for the section, e.g. `flex-1` so its tint runs down to
   *  the footer when it's the last thing on a short page. */
  className?: string
  /** Optional width treatment for pages that intentionally do not use the 1440px container. */
  contentClassName?: string
}

/**
 * The storefront's Collections row (flows 15 and 16, Figma `1862:82577`, main
 * file): the creator's boards in their order, each a 288px three-image cover
 * over name, description and product count, scrolling sideways with ‹ ›
 * arrows once they overflow. Empty collections are hidden, so the preview
 * shows what shoppers really see (annotation `1862:82709`). It replaced the
 * Favorite Picks strip.
 */
export function StorefrontCollections({
  collections,
  items,
  title,
  onSelect,
  showViewAll = false,
  bleed = false,
  tinted = true,
  className,
  contentClassName = CONTENT_COLUMN,
}: StorefrontCollectionsProps) {
  const byId = new Map(items.map((item) => [item.id, item]))
  const boards = collections
    .map((collection) => ({
      collection,
      items: collection.itemIds
        .map((id) => byId.get(id))
        .filter((item): item is ShopItem => item !== undefined),
    }))
    .filter((board) => board.items.length > 0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)
  const canScroll = useHasOverflowX(scrollRef, boards.length)
  const hasViewAll = showViewAll && boards.length > 4
  const visibleBoards = hasViewAll && !showAll ? boards.slice(0, 4) : boards

  if (boards.length === 0) return null

  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    })
  }

  return (
    <section
      className={[
        'flex w-full flex-col items-center gap-xxl py-5xl',
        !tinted
          ? ''
          : bleed
            ? 'bleed-x before:bg-gradient-to-b before:from-surface-tertiary-100/0 before:to-surface-tertiary-100'
            : 'bg-gradient-to-b from-surface-tertiary-100/0 to-surface-tertiary-100',
        className,
      ].join(' ')}
    >
      <div className={`flex items-center gap-md-2 ${contentClassName}`}>
        <p className="flex-1 text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
          {title ?? 'Collections'}
        </p>
        {hasViewAll ? (
          !showAll && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-body-sm font-medium text-text-secondary-1000"
            >
              View All
            </button>
          )
        ) : canScroll ? (
          <div className="flex items-start gap-sm">
            <button
              type="button"
              aria-label="Scroll collections left"
              onClick={() => scroll('left')}
              className="flex items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
            >
              <Icon name="chevron-left" />
            </button>
            <button
              type="button"
              aria-label="Scroll collections right"
              onClick={() => scroll('right')}
              className="flex items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
            >
              <Icon name="chevron-right" />
            </button>
          </div>
        ) : null}
      </div>
      <div className={contentClassName}>
        <div
          ref={scrollRef}
          className={[
            'flex w-full gap-md [scrollbar-width:none]',
            showAll ? 'flex-wrap overflow-visible' : 'overflow-x-auto',
          ].join(' ')}
        >
          {visibleBoards.map(({ collection, items: boardItems }) => (
            <button
              key={collection.id}
              type="button"
              disabled={!onSelect}
              onClick={() => onSelect?.(collection)}
              className="flex w-[288px] shrink-0 flex-col items-start gap-md-sm overflow-clip text-left enabled:cursor-pointer"
            >
              <CollectionCover items={boardItems} className="aspect-[3/2] w-full rounded-md" />
              {/* Collection Card (main file `2794:82137`): a 3:2 cover, then the
                  name and a description of up to two lines straight on the
                  section, no fill and no product count. */}
              <div className="flex w-full flex-col items-start gap-xs overflow-clip">
                <p className="w-full truncate text-body-md font-medium text-text-secondary-1000">{collection.name}</p>
                {collection.description && (
                  <p className="line-clamp-2 min-h-[40px] w-full text-body-sm leading-[20px] text-text-secondary-700">
                    {collection.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
