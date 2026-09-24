import { ChevronRight } from 'lucide-react'
import { PeriodSelect, type PeriodOption } from './PeriodSelect'

export type StatEntry = {
  label: string
  value: string
  /** Where the stat's own breakdown page lives. */
  href: string
}

/**
 * One stat column: the value on top, the uppercase label and a chevron
 * beneath it, the whole thing a link into the stats it summarises. Shared with
 * the product-detail performance card (`1605:43038`), which draws the same
 * columns inside a different shell.
 */
export function StatColumn({ label, value, href }: StatEntry) {
  return (
    <a
      href={href}
      className="flex min-w-px flex-1 flex-col items-center justify-center gap-ten rounded-md px-2 py-md-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-secondary-1000"
    >
      <p className="text-body-xxl font-semibold whitespace-nowrap text-text-secondary-1000">
        {value}
      </p>
      <p className="flex items-center gap-1 text-body-xs font-medium tracking-[0.5px] whitespace-nowrap text-text-secondary-700 uppercase">
        {label}
        <ChevronRight aria-hidden="true" className="size-3 shrink-0" strokeWidth={1.5} />
      </p>
    </a>
  )
}

/**
 * The five shop totals under the store card (Figma `1619:39241`), each column
 * a link into that metric's breakdown page. Dividers sit between columns, not
 * around them. My Shop passes `period` for the "Showing: All time" selector
 * pinned to the card's top-right corner (`236:24886`), which also grows the
 * card's top edge to make room; Home's row has none.
 */
export function StatsRow({
  stats,
  period,
}: {
  stats: StatEntry[]
  period?: {
    options: readonly PeriodOption[]
    value: string
    onChange: (next: string) => void
  }
}) {
  return (
    <div
      className={[
        'flex w-full flex-col rounded-lg border border-border-muted bg-surface-secondary-100 px-[28px] pb-xxl',
        period ? 'gap-[17px] pt-[15px]' : 'items-center pt-xxl',
      ].join(' ')}
    >
      {period && (
        <div className="flex w-full justify-end">
          <PeriodSelect prefix="Showing:" {...period} />
        </div>
      )}
      <div className="flex w-full items-stretch">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex min-w-px flex-1 items-stretch">
            {index > 0 && <div className="w-px shrink-0 bg-border-default" />}
            <StatColumn {...stat} />
          </div>
        ))}
      </div>
    </div>
  )
}
