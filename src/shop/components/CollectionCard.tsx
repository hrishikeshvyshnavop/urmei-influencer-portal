import type { Collection } from '../collections-store'
import type { ShopItem } from '../types'
import { Icon } from './Icon'
import { ItemMenu, type ItemMenuAction } from './ItemMenu'

type CollectionCardProps = {
  collection: Collection
  /** The collection's items, already resolved, in cover order. */
  items: ShopItem[]
  /** 1-based storefront position. */
  position: number
  canMoveEarlier: boolean
  canMoveLater: boolean
  onMove: (direction: 'earlier' | 'later') => void
  /** The board's ⋮ menu (Figma `1862:87897`); Edit details so far. */
  menuActions: ItemMenuAction[]
  /** Opens the collection page (flow 08, Figma `1862:85176`). */
  onOpen: () => void
}

/** One cover tile; a missing product leaves the slot as a quiet swatch. */
function CoverImage({ item, className }: { item?: ShopItem; className: string }) {
  return item ? (
    <img
      src={item.product.shopCardImage}
      alt=""
      className={`pointer-events-none object-cover ${className}`}
    />
  ) : (
    <span aria-hidden="true" className={`bg-surface-secondary-300 ${className}`} />
  )
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'earlier' | 'later'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'earlier' ? 'Move earlier on storefront' : 'Move later on storefront'}
      disabled={disabled}
      onClick={onClick}
      className={[
        'flex items-center justify-center overflow-clip rounded-sm p-xs',
        disabled
          ? 'cursor-not-allowed bg-surface-secondary-300'
          : 'cursor-pointer border border-border-default bg-surface-secondary-100',
      ].join(' ')}
    >
      <Icon
        name={direction === 'earlier' ? 'chevron-left' : 'chevron-right'}
        className={disabled ? 'opacity-30' : ''}
      />
    </button>
  )
}

/**
 * A collection board on My Shop's Collections tab (Figma `1862:87974`, main
 * file): a 282px three-image cover drawn from the collection's first products,
 * the "#n on storefront" row with the ‹ › reorder arrows, then name,
 * description and product count. An empty collection gets the dashed
 * "No products yet" cover and says it won't appear on the storefront.
 */
export function CollectionCard({
  collection,
  items,
  position,
  canMoveEarlier,
  canMoveLater,
  onMove,
  menuActions,
  onOpen,
}: CollectionCardProps) {
  const isEmpty = items.length === 0
  const count = `${items.length} ${items.length === 1 ? 'product' : 'products'}`

  return (
    <article className="relative flex w-[282px] flex-col items-start overflow-clip">
      {menuActions.length > 0 && (
        <div className="absolute top-md-sm right-md-sm z-10">
          <ItemMenu label={`${collection.name} options`} actions={menuActions} />
        </div>
      )}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${collection.name}`}
        className="block cursor-pointer text-left"
      >
      {isEmpty ? (
        <div className="flex size-[282px] flex-col items-center justify-center gap-xs rounded-t-md border border-dashed border-[#ccc] bg-[#f6f5f4]">
          <p className="text-body-sm leading-[20px] font-medium text-text-secondary-1000">
            No products yet
          </p>
          <p className="text-body-xs leading-[18px] text-text-secondary-700">
            Add picks from the All Picks tab
          </p>
        </div>
      ) : (
        <div className="flex gap-[2px] overflow-clip rounded-t-md">
          <CoverImage item={items[0]} className="h-[282px] w-[188px]" />
          <div className="flex flex-col gap-[2px]">
            <CoverImage item={items[1]} className="h-[140px] w-[92px]" />
            <CoverImage item={items[2]} className="h-[140px] w-[92px]" />
          </div>
        </div>
      )}
      </button>

      <div className="flex w-full items-center justify-between bg-surface-tertiary-100 px-ten py-[6px]">
        <p className="text-body-xs font-medium whitespace-nowrap text-text-secondary-700">
          #{position} on storefront
        </p>
        <div className="flex items-center gap-[2px]">
          <ArrowButton direction="earlier" disabled={!canMoveEarlier} onClick={() => onMove('earlier')} />
          <ArrowButton direction="later" disabled={!canMoveLater} onClick={() => onMove('later')} />
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="flex w-full cursor-pointer flex-col items-start gap-xs overflow-clip pt-md-sm text-left"
      >
        <h3 className="w-full text-body-md font-semibold text-text-secondary-1000">
          {collection.name}
        </h3>
        {collection.description && (
          <p className="w-full truncate text-body-sm leading-[20px] text-text-secondary-700">
            {collection.description}
          </p>
        )}
        <p className="text-body-xs leading-[18px] font-medium whitespace-pre text-text-secondary-700">
          {isEmpty ? `${count}  ·  Won't appear on your storefront` : count}
        </p>
      </button>
    </article>
  )
}
