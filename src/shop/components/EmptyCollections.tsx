import { Button } from './Button'
import { Icon } from './Icon'

/** Shown on the Collections tab once every collection has been deleted
 *  (Figma `1862:87357`, main file): the shop's dashed empty box with the
 *  layout-grid glyph and a primary New Collection button. It replaced the old
 *  Favorites empty state, which used the same box. */
export function EmptyCollections({ onNewCollection }: { onNewCollection: () => void }) {
  return (
    <div className="flex h-[471px] w-full items-center">
      <div className="flex h-full flex-1 flex-col items-start overflow-clip rounded-lg border-2 border-dashed border-surface-secondary-500 bg-surface-secondary-100">
        <div className="flex flex-1 w-full flex-col items-center justify-center gap-[18px] overflow-clip bg-surface-secondary-100">
          <div className="flex flex-col items-center gap-fourteen">
            <span className="flex size-[64px] items-center justify-center rounded-[100px] bg-surface-tertiary-500 p-md-sm">
              <Icon name="layout-grid" size={28} />
            </span>
            <div className="flex flex-col items-center gap-xs text-center">
              <p className="text-body-xl font-medium text-text-secondary-1000">No collections yet</p>
              <p className="text-body-xs text-text-secondary-700">
                Group your picks into collections like &ldquo;My morning routine&rdquo;. Shoppers browse
                them as boards on your storefront.
              </p>
            </div>
          </div>
          <Button onClick={onNewCollection} leftIcon={<Icon name="plus-inverse" />}>
            New Collection
          </Button>
        </div>
      </div>
    </div>
  )
}
