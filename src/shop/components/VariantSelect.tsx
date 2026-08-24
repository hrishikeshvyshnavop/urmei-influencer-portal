import { useRef, useState } from 'react'
import { FloatingPanel } from './FloatingPanel'
import { Icon } from './Icon'

type VariantSelectProps = {
  options: string[]
  value: string
  onChange: (value: string) => void
}

/**
 * The size/variant pill in the "Add to shop" modal (Figma `1159:62549`) — a
 * real dropdown, not a static label. The currently selected option keeps the
 * same highlighted-row treatment used for hover elsewhere in this app.
 */
export function VariantSelect({ options, value, onChange }: VariantSelectProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-fit items-center rounded-[12px] border border-border-default bg-surface-secondary-300 py-[2px] pr-[6px] pl-ten"
      >
        <p className="text-body-xs text-text-secondary-900">{value}</p>
        <span className="flex items-center justify-center overflow-clip rounded-sm p-xs">
          <Icon
            name="chevron-down"
            srcSize={24}
            className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
          />
        </span>
      </button>

      <FloatingPanel
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        width={260}
        align="left"
        className="overflow-clip rounded-md border border-border-default bg-surface-secondary-100 shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
      >
        <ul role="listbox" className="flex w-full flex-col items-start">
          {options.map((option) => (
            <li key={option} className="w-full">
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={[
                  'w-full px-md py-sm text-left text-body-sm font-medium whitespace-nowrap text-text-secondary-1000 hover:bg-surface-secondary-300',
                  option === value ? 'bg-surface-secondary-300' : '',
                ].join(' ')}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </FloatingPanel>
    </>
  )
}
