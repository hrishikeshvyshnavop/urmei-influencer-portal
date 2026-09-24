import { useRef, useState } from 'react'
import { STAT_PERIODS, type StatPeriodId } from '../data/stats'
import { setStatsPeriod, useStatsPeriod } from '../stats-period'
import { FloatingPanel } from './FloatingPanel'
import { Icon } from './Icon'

/**
 * The period filter — the one component every period choice in the product
 * uses: the stats row on Home and My Shop, the breakdown pages, a product's
 * stats page and Recent Activities. It always offers `STAT_PERIODS`. Left
 * uncontrolled it reads and sets the shared stats period (`stats-period.ts`),
 * so every stats surface shows the same choice; pass `value`/`onChange` to
 * filter something else, as Recent Activities does. A borderless text trigger
 * with a chevron that opens a right-aligned list; only closed states are
 * drawn, so the open list is conventional.
 */
export function PeriodFilter({
  prefix,
  value: controlledValue,
  onChange,
  label = 'Period',
}: {
  /** Muted lead-in before the selection — the stats row reads "Showing:
   *  All time" (Figma `236:24886`); the stat pages have none. */
  prefix?: string
  value?: StatPeriodId
  onChange?: (next: StatPeriodId) => void
  /** Accessible name, e.g. "Activity period". */
  label?: string
}) {
  const sharedValue = useStatsPeriod()
  const value = controlledValue ?? sharedValue
  const choose = onChange ?? setStatsPeriod
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const selected = STAT_PERIODS.find((option) => option.id === value) ?? STAT_PERIODS[0]

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${selected.label}`}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-sm rounded-sm px-2 py-1 text-body-sm font-medium text-text-secondary-1000"
      >
        <span className="capitalize">
          {prefix && <span className="text-text-secondary-700">{prefix} </span>}
          {selected.label}
        </span>
        <Icon name="chevron-down" srcSize={24} className={open ? 'rotate-180' : ''} />
      </button>

      <FloatingPanel
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        width={180}
        align="right"
        className="flex flex-col items-start overflow-clip rounded-md border border-border-default bg-surface-secondary-100 shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
      >
        {STAT_PERIODS.map((option) => (
          <button
            key={option.id}
            type="button"
            role="option"
            aria-selected={option.id === value}
            onClick={() => {
              choose(option.id)
              setOpen(false)
            }}
            className={[
              'w-full px-md py-sm text-left text-body-sm capitalize hover:bg-surface-secondary-300',
              option.id === value
                ? 'font-medium text-text-secondary-1000'
                : 'text-text-secondary-700',
            ].join(' ')}
          >
            {option.label}
          </button>
        ))}
      </FloatingPanel>
    </>
  )
}
