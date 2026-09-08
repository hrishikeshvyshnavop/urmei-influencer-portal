import { Button } from './Button'
import { Icon } from './Icon'

/** Shown on the Favorites tab when the shop has products but none are
 *  favorited yet (Figma `1603:40560`) — distinct from `EmptyShop`, which
 *  covers a shop with no products at all. The cap comes from the caller so
 *  this copy can't drift from the rule it describes. */
export function EmptyFavorites({
  limit,
  onGoToAllPicks,
}: {
  limit: number
  onGoToAllPicks: () => void
}) {
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
                No Favorite products yet
              </p>
              <p className="text-body-xs text-text-secondary-700">
                Favorite up to {limit} of your picks to put them first on your storefront
              </p>
            </div>
          </div>
          <Button onClick={onGoToAllPicks}>Go To All Picks</Button>
        </div>
      </div>
    </div>
  )
}
