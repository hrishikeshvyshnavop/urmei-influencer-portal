import type { ShopItem } from '../types'
import { Icon } from './Icon'
import { ItemMenu, type ItemMenuAction } from './ItemMenu'

type ShopProductCardProps = {
  item: ShopItem
  onViewDetails: () => void
  onCopyLink: () => void
  onToggleFeatured: () => void
  onRemoveFromShop: () => void
  /**
   * Only set on the Featured tab: the card swaps its top-left "Featured" badge
   * for a rank + reorder footer ("#N Featured", ‹ ›).
   */
  featuredRank?: { rank: number; canMoveUp: boolean; canMoveDown: boolean }
  onReorder?: (direction: 'up' | 'down') => void
}

function ReorderButton({
  direction,
  enabled,
  onClick,
}: {
  direction: 'left' | 'right'
  enabled: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={onClick}
      aria-label={direction === 'left' ? 'Move earlier in featured order' : 'Move later in featured order'}
      className={[
        'flex items-center justify-center overflow-clip rounded-sm p-xs',
        enabled ? 'border border-border-default bg-surface-secondary-100' : 'bg-surface-secondary-300',
      ].join(' ')}
    >
      <Icon name={direction === 'left' ? 'chevron-left' : 'chevron-right'} />
    </button>
  )
}

export function ShopProductCard({
  item,
  onViewDetails,
  onCopyLink,
  onToggleFeatured,
  onRemoveFromShop,
  featuredRank,
  onReorder,
}: ShopProductCardProps) {
  const { product, featured } = item
  const isFeaturedTab = featuredRank !== undefined

  const actions: ItemMenuAction[] = [
    { label: 'View product details', onSelect: onViewDetails },
    { label: 'Copy affiliate link', onSelect: onCopyLink },
    { label: featured ? 'Remove from featured' : 'Add to featured', onSelect: onToggleFeatured },
    { label: 'Remove from shop', onSelect: onRemoveFromShop, destructive: true },
  ]

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onViewDetails}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onViewDetails()
        }
      }}
      className="flex w-full cursor-pointer flex-col overflow-clip rounded-sm border border-border-default text-left"
    >
      <div className="relative aspect-square w-full overflow-clip">
        <img
          src={product.shopCardImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        {featured && !isFeaturedTab && (
          <span className="absolute top-md-sm left-md-sm flex items-center rounded-full bg-surface-secondary-900 px-sm py-xs text-body-xxs font-medium whitespace-pre text-text-secondary-100">
            {'★  Featured '}
          </span>
        )}
        {/* Stops the card's own onClick from also firing when opening the menu or picking an item. */}
        <div className="absolute top-md-sm right-md-sm" onClick={(event) => event.stopPropagation()}>
          <ItemMenu actions={actions} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-md-sm bg-surface-secondary-200">
        <div className="flex w-full flex-col gap-[6px] px-ten pt-fourteen pb-fourteen">
          <div className="flex w-full flex-col gap-[2px] border-b border-border-default pb-ten">
            <div className="flex w-full flex-col">
              <p className="text-body-xs font-medium text-text-secondary-600">{product.brand}</p>
              <p className="truncate text-body-md font-medium text-text-secondary-1000">
                {product.name}
              </p>
              <p className="text-body-xs text-text-secondary-700">{item.variant}</p>
            </div>
            <div className="flex w-full items-center gap-sm">
              <p className="text-body-md font-medium text-text-secondary-1000">{product.price}</p>
              <span className="flex w-fit items-center justify-center gap-xs rounded-[24px] bg-surface-secondary-300 px-sm py-xs text-body-xs text-text-secondary-900">
                <span className="font-medium text-text-secondary-1000">{product.commissionBadge}</span> Commission
              </span>
            </div>
          </div>
          <p className="text-body-xs font-medium text-text-secondary-700">
            {product.regions.join('  ·  ')}
          </p>
        </div>

        {featuredRank && (
          <div
            className="flex w-full flex-col items-start bg-surface-tertiary-100 px-ten py-[6px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between">
              <p className="text-body-xs font-medium text-text-secondary-700">
                #{featuredRank.rank} Featured
              </p>
              <div className="flex items-center gap-[2px]">
                <ReorderButton
                  direction="left"
                  enabled={featuredRank.canMoveUp}
                  onClick={() => onReorder?.('up')}
                />
                <ReorderButton
                  direction="right"
                  enabled={featuredRank.canMoveDown}
                  onClick={() => onReorder?.('down')}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
