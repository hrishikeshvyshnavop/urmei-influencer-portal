import { Button } from './Button'
import { Icon } from './Icon'

export function EmptyShop({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="flex h-[471px] w-full items-center">
      <div className="flex h-full flex-1 flex-col items-start overflow-clip rounded-lg border-2 border-dashed border-surface-secondary-500 bg-surface-secondary-100">
        <div className="flex flex-1 w-full flex-col items-center justify-center gap-[18px] overflow-clip bg-surface-secondary-100">
          <div className="flex w-[278px] flex-col items-center gap-fourteen">
            <img src="/assets/img/store-empty.svg" alt="" className="size-[64px]" />
            <div className="flex w-full flex-col items-center gap-xs text-center">
              <p className="text-body-xl font-medium text-text-secondary-1000">
                Your shop is empty
              </p>
              <p className="text-body-xs whitespace-nowrap text-text-secondary-700">
                Browse our products and add your first pick to your shop.
              </p>
            </div>
          </div>
          <Button onClick={onBrowse} leftIcon={<Icon name="plus-inverse" />}>
            Browse product
          </Button>
        </div>
      </div>
    </div>
  )
}
