import { Icon } from './Icon'

type AddProductTileProps = {
  onClick: () => void
  /** 434px in the All Picks grid; 468px to match the taller Favorite-tab cards. */
  height?: number
  /** "Add To Collection" on a collection page (flow 21, Figma `1970:102222`). */
  label?: string
}

export function AddProductTile({ onClick, height = 434, label = 'Add Product' }: AddProductTileProps) {
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
        <span className="text-body-md font-medium text-text-secondary-1000">{label}</span>
        <span className="text-body-xs text-text-secondary-700">Choose from the catalogue</span>
      </span>
    </button>
  )
}
