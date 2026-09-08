import { Icon } from './Icon'

type AddProductTileProps = {
  onClick: () => void
  /** 434px in the All Picks grid; 468px to match the taller Favorite-tab cards. */
  height?: number
}

export function AddProductTile({ onClick, height = 434 }: AddProductTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ height }}
      className="flex w-full flex-col items-center justify-center gap-md-sm rounded-lg border-2 border-dashed border-surface-secondary-500 bg-surface-secondary-100"
    >
      <span className="flex size-[40px] items-center justify-center rounded-full border border-border-default">
        <Icon name="plus" />
      </span>
      <span className="flex flex-col items-center gap-xs">
        <span className="text-body-md font-medium text-text-secondary-1000">Add Product</span>
        <span className="text-body-xs text-text-secondary-700">Choose from the catalogue</span>
      </span>
    </button>
  )
}
