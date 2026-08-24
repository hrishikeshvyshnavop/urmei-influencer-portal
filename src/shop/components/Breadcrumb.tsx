import { Icon } from './Icon'

type Crumb = { label: string; onClick?: () => void }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex h-[38px] items-center">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.label} className="flex items-center">
            {index > 0 && <Icon name="chevron-right" className="mx-1" />}
            {isLast || !item.onClick ? (
              <span className="text-body-sm text-text-secondary-700">{item.label}</span>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="text-body-sm text-text-secondary-1000 hover:underline"
              >
                {item.label}
              </button>
            )}
          </span>
        )
      })}
    </nav>
  )
}
