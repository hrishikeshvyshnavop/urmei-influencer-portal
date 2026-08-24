import { useRef, useState } from 'react'
import { FloatingPanel } from './FloatingPanel'
import { Icon } from './Icon'

export type ItemMenuAction = {
  label: string
  onSelect: () => void
  destructive?: boolean
}

/**
 * The "⋮" dropdown on a shop product card — View product details, Copy
 * affiliate link, Add/Remove featured, Remove from shop.
 */
export function ItemMenu({ actions }: { actions: ItemMenuAction[] }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Product options"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center justify-center overflow-clip rounded-sm bg-surface-secondary-100 p-xs"
      >
        <Icon name="more-vertical" />
      </button>

      <FloatingPanel
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        width={260}
        align="right"
        className="flex flex-col items-start overflow-clip rounded-md border border-border-default bg-surface-secondary-100 shadow-[0_4px_4px_rgba(0,0,0,0.05)]"
      >
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => {
              setOpen(false)
              action.onSelect()
            }}
            className={[
              'flex w-full items-center justify-center px-md py-sm text-body-sm font-medium whitespace-nowrap hover:bg-surface-secondary-300',
              action.destructive ? 'text-surface-other-alert' : 'text-text-secondary-1000',
            ].join(' ')}
          >
            <span className="w-full text-left">{action.label}</span>
          </button>
        ))}
      </FloatingPanel>
    </>
  )
}
