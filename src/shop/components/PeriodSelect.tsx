import { useRef, useState } from 'react'
import { FloatingPanel } from './FloatingPanel'
import { Icon } from './Icon'

export type PeriodOption = { id: string; label: string }

type PeriodSelectProps<T extends PeriodOption> = {
  options: readonly T[]
  value: string
  onChange: (next: string) => void
  /** Muted lead-in before the selection — My Shop's stats card reads
   *  "Showing: All time" (Figma `236:24886`); the stat pages have none. */
  prefix?: string
}

/**
 * The borderless period dropdown the stats surfaces share: a text trigger with
 * a chevron that opens a right-aligned list. Only closed states are drawn, so
 * the open list is conventional.
 */
export function PeriodSelect<T extends PeriodOption>({
  options,
  value,
  onChange,
  prefix,
}: PeriodSelectProps<T>) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const selected = options.find((option) => option.id === value) ?? options[0]!

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
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
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="option"
            aria-selected={option.id === value}
            onClick={() => {
              onChange(option.id)
              setOpen(false)
            }}
            className={[
              'w-full px-md py-sm text-left text-body-sm hover:bg-surface-secondary-300',
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
