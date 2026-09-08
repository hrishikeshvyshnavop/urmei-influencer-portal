import { Fragment } from 'react'
import { Button } from './Button'
import { STAT_SPECS, statsForProduct } from '../data/stats'
import { StatColumn } from './StatsRow'
import type { Product } from '../types'

/**
 * The "PERFORMACE" block on a shop item's product-detail page (Figma
 * `1605:43038`) — kept spelled as designed.
 *
 * Four columns drawn exactly like My Shop's stats row, plus a "View other
 * stats" cell. Every column and the button lead to this product's own stats
 * page, which breaks the same figures out by tab; the frame gives each label a
 * chevron but no per-label destination, and only three of the four metrics
 * have a breakdown page of their own, so they share one.
 */
export function PerformanceStats({
  product,
  statsHref,
}: {
  product: Product
  statsHref: string
}) {
  const stats = statsForProduct(product)
  const columns = [
    { label: 'TOTAL UNIT SOLD', value: String(stats.sales) },
    { label: 'LINK CLICKS', value: String(stats.clicks) },
    { label: 'CONVERSION RATE', value: `${stats.conversionRate}%` },
    {
      label: STAT_SPECS.commissionSettled.label,
      value: STAT_SPECS.commissionSettled.format(stats.commissionSettled),
    },
  ]

  return (
    <div className="flex w-full flex-col items-end gap-3xl px-margin pb-5xl">
      <div className="flex h-[52px] w-full items-center overflow-clip">
        <div className="flex flex-col gap-xs whitespace-nowrap">
          <p className="text-body-xl font-medium text-text-secondary-1000">PERFORMACE</p>
          <p className="text-body-md text-text-secondary-700">How this product is doing in your shop</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center rounded-[20px] border border-border-muted bg-surface-secondary-100 px-[28px] py-xxl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {/* Dividers are siblings, not children of a column, so the frame's
            16px gap falls on both sides of each rule. */}
        <div className="flex w-full items-stretch gap-md">
          {columns.map((column) => (
            <Fragment key={column.label}>
              <StatColumn {...column} href={statsHref} />
              <div className="w-px shrink-0 bg-border-default" />
            </Fragment>
          ))}
          <div className="flex min-w-px flex-1 items-center justify-center">
            <Button
              variant="outline"
              onClick={() => {
                window.location.hash = statsHref
              }}
            >
              View other stats
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
