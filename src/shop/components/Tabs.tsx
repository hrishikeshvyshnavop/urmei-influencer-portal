export type Tab = { id: string; label: string }

type TabsProps = {
  tabs: Tab[]
  activeId: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      className="flex w-full items-center gap-lg border-b border-border-default bg-surface-secondary-100"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={[
              'flex items-center justify-center gap-[6px] py-ten text-body-sm',
              isActive
                ? 'border-b border-surface-secondary-1000 font-medium text-surface-primary-500'
                : 'text-text-secondary-700',
            ].join(' ')}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
