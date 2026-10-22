import { cn } from '../../lib/utils'

type PillTabsProps<T extends string> = {
  label: string
  tabs: { id: T; label: string }[]
  activeId: T
  onChange: (id: T) => void
}

/**
 * The library's Pill Tab filters (main file `2739:88407`): the active pill is
 * filled `surface/tertiary/1000` with light text, the rest are outlined.
 * Used by the Change backdrop and Featured items dialogs.
 */
export function PillTabs<T extends string>({ label, tabs, activeId, onChange }: PillTabsProps<T>) {
  return (
    <div className="flex shrink-0 flex-wrap gap-sm" role="group" aria-label={label}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-pressed={activeId === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'cursor-pointer rounded-full border px-md py-sm text-body-md whitespace-nowrap',
            activeId === tab.id
              ? 'border-transparent bg-surface-tertiary-1000 text-text-secondary-100'
              : 'border-border-default text-text-secondary-700',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
