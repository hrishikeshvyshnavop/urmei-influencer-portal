import type { ReactNode } from 'react'
import { moreLabel } from '../featured'
import type { ShopItem } from '../types'
import { cn } from '../../lib/utils'

const MORE_SIZES = {
  lg: ['text-body-xl', 'text-body-xs'],
  md: ['text-body-sm', 'text-body-xs'],
  sm: ['text-[14px] leading-none', 'text-[9px]'],
} as const

/** The "+N products" scrim on the last cover tile for the products beyond
 *  the three shown (Collection Card `2794:82137`, main file); nothing at three
 *  or fewer. */
export function MoreOverlay({ count, size = 'lg' }: { count: number; size?: keyof typeof MORE_SIZES }) {
  const more = moreLabel(count)
  if (!more) return null
  const [countClass, labelClass] = MORE_SIZES[size]
  return (
    <span className="absolute inset-0 flex flex-col items-center justify-center bg-scrim text-center font-medium whitespace-nowrap text-text-secondary-100">
      <span className={countClass}>{more.count}</span>
      <span className={labelClass}>{more.label}</span>
    </span>
  )
}

function Tile({ item, className, children }: { item?: ShopItem; className?: string; children?: ReactNode }) {
  return (
    <span className={cn('relative block min-h-0 min-w-0 flex-1 overflow-clip', className)}>
      {item ? (
        <img src={item.product.shopCardImage} alt="" className="pointer-events-none absolute inset-0 size-full object-cover" />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 bg-surface-secondary-300" />
      )}
      {children}
    </span>
  )
}

type CollectionCoverProps = {
  items: ShopItem[]
  /** The cover's box: its size and rounding. */
  className?: string
  /** Space between tiles. */
  gapClassName?: string
  /** The first tile's width beside the stacked pair, e.g. `w-[188px] flex-none`;
   *  twice the stack's width by default. */
  leadClassName?: string
  moreSize?: keyof typeof MORE_SIZES
}

/**
 * A collection's cover, shared by My Shop's boards, the storefront row, the
 * banner's featured cards and the featured picker so they always agree. It
 * follows the product count instead of leaving blank tiles: one product fills
 * the cover, two sit side by side in equal halves, and three or more put the
 * first beside the next two stacked, with "+N products" over the third.
 */
export function CollectionCover({
  items,
  className,
  gapClassName = 'gap-[2px]',
  leadClassName = 'flex-[2]',
  moreSize = 'lg',
}: CollectionCoverProps) {
  const [first, second, third] = items
  const box = cn('flex overflow-clip', gapClassName, className)
  if (items.length <= 1) {
    return (
      <span className={box}>
        <Tile item={first} />
      </span>
    )
  }
  if (items.length === 2) {
    return (
      <span className={box}>
        <Tile item={first} />
        <Tile item={second} />
      </span>
    )
  }
  return (
    <span className={box}>
      <Tile item={first} className={leadClassName} />
      <span className={cn('flex min-w-0 flex-1 flex-col', gapClassName)}>
        <Tile item={second} />
        <Tile item={third}>
          <MoreOverlay count={items.length} size={moreSize} />
        </Tile>
      </span>
    </span>
  )
}
