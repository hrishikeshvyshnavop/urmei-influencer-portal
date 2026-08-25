import { Button } from './Button'
import { Icon } from './Icon'

/** Shown on the Featured tab when the shop has products but none are
 *  featured yet (Figma `1362:74210`) — distinct from `EmptyShop`, which
 *  covers a shop with no products at all. */
export function EmptyFeatured({ onGoToAllPicks }: { onGoToAllPicks: () => void }) {
  return (
    <div className="flex h-[471px] w-full items-center">
      <div className="flex h-full flex-1 flex-col items-start overflow-clip rounded-lg border-2 border-dashed border-surface-secondary-500 bg-surface-secondary-100">
        <div className="flex flex-1 w-full flex-col items-center justify-center gap-[18px] overflow-clip bg-surface-secondary-100">
          <div className="flex w-[278px] flex-col items-center gap-fourteen">
            <span className="flex size-[64px] items-center justify-center rounded-[100px] bg-surface-tertiary-500 p-md-sm">
              <Icon name="star-outline" size={28} />
            </span>
            <div className="flex w-full flex-col items-center gap-xs text-center">
              <p className="text-body-xl font-medium text-text-secondary-1000">
                No featured products yet
              </p>
              <p className="text-body-xs text-text-secondary-700">
                Feature up to 6 of your picks to put them first on your storefront
              </p>
            </div>
          </div>
          <Button onClick={onGoToAllPicks}>Go to all picks</Button>
        </div>
      </div>
    </div>
  )
}
