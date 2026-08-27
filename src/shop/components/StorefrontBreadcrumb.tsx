import { Icon } from './Icon'

export type StorefrontCrumb = {
  label: string
  /** Omit for a crumb with nowhere to go — see the component note. */
  onClick?: () => void
}

/**
 * Breadcrumb row for the public storefront (Figma `916:66734`): 4px between
 * crumbs, 16px chevrons, 16px of vertical padding, and the trailing crumb
 * muted and allowed to truncate so a long product name can't push the row wide.
 *
 * Separate from `Breadcrumb`, which serves the in-app browse overlay: that one
 * is a fixed 38px row with 8px either side of each chevron, and greys any crumb
 * without an `onClick`. Here most crumbs have nowhere to go — the shelves above
 * a product page have no screens yet — so an unclickable crumb keeps the full
 * dark colour and just isn't interactive, which is what the design shows.
 */
export function StorefrontBreadcrumb({ items }: { items: StorefrontCrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex w-full items-center gap-xs py-md">
      {items.map((item, index) => {
        const last = index === items.length - 1
        return (
          <div
            key={`${item.label}-${index}`}
            /* Only the trailing crumb flexes: it absorbs the leftover width so
               `truncate` has a box to clip against, while the shelves above it
               stay at their natural width. */
            className={`flex min-w-px items-center gap-xs ${last ? 'flex-1' : ''}`}
          >
            {index > 0 && <Icon name="chevron-right" />}
            {item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className="text-body-sm whitespace-nowrap text-text-secondary-1000 hover:underline"
              >
                {item.label}
              </button>
            ) : (
              <span
                className={
                  last
                    ? 'min-w-px truncate text-body-sm text-text-secondary-700'
                    : 'text-body-sm whitespace-nowrap text-text-secondary-1000'
                }
              >
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
