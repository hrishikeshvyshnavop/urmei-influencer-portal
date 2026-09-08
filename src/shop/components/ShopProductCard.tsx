import type { ReactNode } from 'react'
import type { ShopItem } from '../types'
import { Icon } from './Icon'
import { ItemMenu, type ItemMenuAction } from './ItemMenu'

type ShopProductCardProps = {
  item: ShopItem
  onViewDetails: () => void
  /** Omitted while the product has no affiliate link yet — before the shop is
   *  published, or for a product added since the last publish — and the menu
   *  then simply has no "Copy affiliate link" row (Figma `1610:44155`). */
  onCopyLink?: () => void
  onToggleFavorite: () => void
  onRemoveFromShop: () => void
  /**
   * Only set on the Favorite tab: the card swaps its top-left "Favorite" badge
   * for a rank + reorder footer ("#N Favorite", ‹ ›).
   */
  favoriteRank?: { rank: number; canMoveUp: boolean; canMoveDown: boolean }
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
      aria-label={direction === 'left' ? 'Move earlier in favorite order' : 'Move later in favorite order'}
      className={[
        'flex items-center justify-center overflow-clip rounded-sm p-xs',
        enabled ? 'border border-border-default bg-surface-secondary-100' : 'bg-surface-secondary-300',
      ].join(' ')}
    >
      <Icon name={direction === 'left' ? 'chevron-left' : 'chevron-right'} />
    </button>
  )
}

type ProductListingCardProps = {
  item: ShopItem
  /** Rendered over the image's top-right corner — where the shop's card puts
   *  its overflow menu. The stats pages pass nothing. */
  imageAction?: ReactNode
  /** The Favorite tab replaces the top-left badge with a rank footer. */
  hideFavoriteBadge?: boolean
  /**
   * The product-stats page's variant (Figma `1652:59725`): brand, name and
   * variant only — no price, commission pill, regions or divider, because the
   * page prints all three of those in its own right-hand column.
   */
  titleOnly?: boolean
  footer?: ReactNode
}

/**
 * The design's "Featured product listing" (Figma `1619:40709`) — the card with
 * no controls of its own. My Shop wraps it in a click target and hangs its menu
 * off `imageAction`; the product-stats page shows it bare, which is why this is
 * a component and not markup inlined in `ShopProductCard`.
 */
export function ProductListingCard({
  item,
  imageAction,
  hideFavoriteBadge,
  titleOnly,
  footer,
}: ProductListingCardProps) {
  const { product, favorite } = item

  return (
    <div className="flex w-full flex-col overflow-clip rounded-sm border border-border-default">
      <div className="relative aspect-square w-full overflow-clip">
        <img
          src={product.shopCardImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        {favorite && !hideFavoriteBadge && (
          <span className="absolute top-md-sm left-md-sm flex items-center rounded-full bg-surface-secondary-900 px-sm py-xs text-body-xxs font-medium whitespace-pre text-text-secondary-100">
            {'\u2605  Favorite'}
          </span>
        )}
        {imageAction && <div className="absolute top-md-sm right-md-sm">{imageAction}</div>}
      </div>

      <div className="flex w-full flex-col gap-md-sm bg-surface-secondary-200">
        <div className={`flex w-full flex-col px-ten pt-fourteen pb-fourteen ${titleOnly ? "" : "gap-[6px]"}`}>
          <div
            className={`flex w-full flex-col ${
              titleOnly ? "" : "gap-[2px] border-b border-border-default pb-ten"
            }`}
          >
            <div className="flex w-full flex-col">
              <p className="text-body-xs font-medium text-text-secondary-600">{product.brand}</p>
              {/* The design gives this line a 25px box with 22px leading, which
                  is what keeps the card's text block exactly 91px tall. */}
              <div className="flex h-[25px] w-full flex-col justify-center">
                <p className="truncate text-body-md font-medium text-text-secondary-1000">
                  {product.name}
                </p>
              </div>
              <p className="text-body-xs text-text-secondary-700">{item.variant}</p>
            </div>
            {titleOnly ? null : (
            <div className="flex w-full items-center gap-sm">
              <p className="text-body-md font-medium text-text-secondary-1000">{product.price}</p>
              <span className="flex w-fit items-center justify-center gap-xs rounded-[24px] bg-surface-secondary-300 px-sm py-xs text-body-xs text-text-secondary-900">
                <span className="font-medium text-text-secondary-1000">{product.commissionBadge}</span> Commission
              </span>
            </div>
            )}
          </div>
          {titleOnly ? null : (
            <p className="text-body-xs font-medium text-text-secondary-700">
              {product.regions.join('  \u00b7  ')}
            </p>
          )}
        </div>

        {footer}
      </div>
    </div>
  )
}

export function ShopProductCard({
  item,
  onViewDetails,
  onCopyLink,
  onToggleFavorite,
  onRemoveFromShop,
  favoriteRank,
  onReorder,
}: ShopProductCardProps) {
  const { favorite } = item
  const isFavoriteTab = favoriteRank !== undefined

  const actions: ItemMenuAction[] = [
    { label: 'View product details', onSelect: onViewDetails },
    ...(onCopyLink ? [{ label: 'Copy affiliate link', onSelect: onCopyLink }] : []),
    { label: favorite ? 'Remove from Favorite' : 'Add to Favorite', onSelect: onToggleFavorite },
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
      className="w-full cursor-pointer text-left"
    >
      <ProductListingCard
        item={item}
        hideFavoriteBadge={isFavoriteTab}
        imageAction={
          // Stops the card's own onClick from also firing when opening the menu or picking an item.
          <div onClick={(event) => event.stopPropagation()}>
            <ItemMenu actions={actions} />
          </div>
        }
        footer={
          favoriteRank && (
            <div
              className="flex w-full flex-col items-start bg-surface-tertiary-100 px-ten py-[6px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex w-full items-center justify-between">
                <p className="text-body-xs font-medium text-text-secondary-700">
                  #{favoriteRank.rank} Favorite
                </p>
                <div className="flex items-center gap-[2px]">
                  <ReorderButton
                    direction="left"
                    enabled={favoriteRank.canMoveUp}
                    onClick={() => onReorder?.('up')}
                  />
                  <ReorderButton
                    direction="right"
                    enabled={favoriteRank.canMoveDown}
                    onClick={() => onReorder?.('down')}
                  />
                </div>
              </div>
            </div>
          )
        }
      />
    </article>
  )
}
