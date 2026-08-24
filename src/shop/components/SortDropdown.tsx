import { useRef, useState } from 'react'
import { SORT_OPTIONS, type SortId } from '../data/catalogue'
import { FloatingPanel } from './FloatingPanel'
import { Icon } from './Icon'

type SortDropdownProps = {
  value: SortId
  onChange: (next: SortId) => void
}

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span className="flex size-[16px] shrink-0 items-center justify-center rounded-full border border-border-outlined">
      {selected && <span className="size-[8px] rounded-full bg-surface-primary-500" />}
    </span>
  )
}

/** Search Results' sort control (Figma `1184:70079`) — a closed pill reading
 *  "Sort By: <selection>" that opens a radio-button list of the same five
 *  options the design specifies (Relevance, Commission low/high, Latest
 *  Arrivals, Top Performing), all backed by real product fields. */
export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const selected = SORT_OPTIONS.find((option) => option.id === value) ?? SORT_OPTIONS[0]

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-[285px] items-center justify-between rounded-sm border border-border-default bg-surface-secondary-100 px-md py-ten"
      >
        <span className="text-body-md font-medium text-text-secondary-1000">
          Sort By: {selected.label}
        </span>
        <Icon
          name="chevron-down"
          srcSize={24}
          className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
        />
      </button>

      <FloatingPanel
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        width={285}
        align="left"
        className="flex flex-col items-start overflow-clip rounded-lg border border-border-default bg-surface-secondary-100 px-md shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
      >
        <ul role="listbox" className="flex w-full flex-col items-start">
          {SORT_OPTIONS.map((option) => (
            <li key={option.id} className="w-full">
              <button
                type="button"
                role="option"
                aria-selected={option.id === value}
                onClick={() => {
                  onChange(option.id)
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
