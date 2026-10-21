import { useRef, useState } from 'react'
import { STAT_PERIODS, type StatPeriodId } from '../data/stats'
import { setStatsPeriod, useStatsPeriod } from '../stats-period'
import { FloatingPanel } from './FloatingPanel'
import { Icon } from './Icon'
import { RadioDot } from './RadioDot'

/**
 * The period filter — the one component every period choice in the product
 * uses: the stats row on Home and My Shop, the breakdown pages, a product's
 * stats page and Recent Activities. It always offers `STAT_PERIODS`. Left
 * uncontrolled it reads and sets the shared stats period (`stats-period.ts`),
 * so every stats surface shows the same choice; pass `value`/`onChange` to
 * filter something else, as Recent Activities does. A borderless text trigger
 * with a chevron that opens a right-aligned radio list (Figma `350:44963`,
 * file `cehltPtMoGWEtKbF7k3MQQ`).
 */
export function PeriodFilter({
  prefix,
  value: controlledValue,
  onChange,
  label = 'Period',
}: {
  /** Muted lead-in before the selection — the stats row reads "Showing:
   *  All Time" (Figma `236:24886`); the stat pages have none. */
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
  const selected = STAT_PERIODS.find((option) => option.id === value) ?? STAT_PERIODS[STAT_PERIODS.length - 1]

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
        width={200}
        align="right"
        className="flex flex-col items-start overflow-clip rounded-lg border border-border-default bg-surface-secondary-100 px-md shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
      >
        <ul role="listbox" aria-label={label} className="flex w-full flex-col items-start">
          {STAT_PERIODS.map((option) => (
            <li key={option.id} className="w-full">
              <button
                type="button"
                role="option"
                aria-selected={option.id === value}
                onClick={() => {
                  choose(option.id)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-sm px-xs py-ten text-left"
              >
                <RadioDot selected={option.id === value} />
                <span className="text-body-sm text-text-secondary-1000">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </FloatingPanel>
    </>
  )
}
