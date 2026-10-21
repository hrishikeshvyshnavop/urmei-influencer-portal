import { useRef } from 'react'
import type { Collection } from '../collections-store'
import { useHasOverflowX } from '../hooks/useHasOverflowX'
import { CONTENT_COLUMN } from '../layout'
import type { ShopItem } from '../types'
import { Icon } from './Icon'

/** How far one click of the row's prev/next scrolls: one board and its gap. */
const SCROLL_STEP = 288 + 16

type StorefrontCollectionsProps = {
  /** In the creator's chosen order; empty ones are dropped here. */
  collections: Collection[]
  items: ShopItem[]
  /** Titles the row: "CHARLOTTE'S COLLECTIONS" (Figma `1862:82577`). */
  ownerName: string
  /** Replaces "<NAME>'S COLLECTIONS", e.g. "More collections from <name>"
   *  on a collection page or "In <name>'s collections" under a product. */
  title?: string
  /** Opens a board; the storefront collection page is flow 16. */
  onSelect?: (collection: Collection) => void
  /** A full-bleed background needs the page's own bleed helper in the
   *  scaled preview; the public page paints it directly. */
  bleed?: boolean
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
  ownerName,
  title,
  onSelect,
  bleed = false,
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
  const canScroll = useHasOverflowX(scrollRef, boards.length)

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
        'flex w-full flex-col items-center gap-md-2 py-3xl',
        bleed
          ? 'bleed-x before:bg-gradient-to-b before:from-surface-tertiary-100/0 before:to-surface-tertiary-100'
          : 'bg-gradient-to-b from-surface-tertiary-100/0 to-surface-tertiary-100',
      ].join(' ')}
    >
      <div className={`flex items-center gap-md-2 ${CONTENT_COLUMN}`}>
        <p className="flex-1 text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
          {title ?? <>{ownerName}&rsquo;s collections</>}
        </p>
        {/* Only when the row overflows; arrows that scroll nothing read as broken. */}
        {canScroll && (
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
        )}
      </div>
      <div className={CONTENT_COLUMN}>
        <div ref={scrollRef} className="flex w-full gap-md overflow-x-auto [scrollbar-width:none]">
          {boards.map(({ collection, items: boardItems }) => (
            <button
              key={collection.id}
              type="button"
              disabled={!onSelect}
              onClick={() => onSelect?.(collection)}
              className="flex w-[288px] shrink-0 flex-col items-start gap-md-sm overflow-clip text-left enabled:cursor-pointer"
            >
              <div className="flex gap-[2px] overflow-clip rounded-md">
                <BoardImage item={boardItems[0]} className="h-[288px] w-[191px]" />
                <div className="flex flex-col gap-[2px]">
                  <BoardImage item={boardItems[1]} className="h-[143px] w-[95px]" />
                  <BoardImage item={boardItems[2]} className="h-[143px] w-[95px]" />
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-xs overflow-clip">
                <p className="w-full text-body-md font-medium text-text-secondary-1000">{collection.name}</p>
                {collection.description && (
                  <p className="w-full truncate text-body-sm leading-[20px] text-text-secondary-700">
                    {collection.description}
                  </p>
                )}
                <p className="text-body-xs leading-[18px] font-medium text-text-secondary-700">
                  {boardItems.length} {boardItems.length === 1 ? 'product' : 'products'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function BoardImage({ item, className }: { item?: ShopItem; className: string }) {
  return item ? (
    <img src={item.product.shopCardImage} alt="" className={`pointer-events-none object-cover ${className}`} />
  ) : (
    <span aria-hidden="true" className={`bg-surface-secondary-300 ${className}`} />
  )
}
