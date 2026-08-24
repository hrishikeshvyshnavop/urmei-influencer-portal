import ShopUrl from '../../portal/components/ShopUrl'
import { Button } from './Button'
import { Icon } from './Icon'

type StoreCardProps = {
  /** Rounds only the top when the KPI strip sits directly underneath. */
  attachedBelow?: boolean
  /** Publishing needs at least one product in the shop. */
  canPublish?: boolean
  published?: boolean
  /** Formatted timestamp shown under the actions once published. */
  publishedAt?: string | null
  /** True once something (reordering, adding, removing, featuring) has changed
   *  since the last publish — swaps "View Shop" for "Publish changes". */
  hasUnpublishedChanges?: boolean
  onPublish?: () => void
  onPreview?: () => void
  onViewShop?: () => void
}

export function StoreCard({
  attachedBelow = false,
  canPublish = false,
  published = false,
  publishedAt = null,
  hasUnpublishedChanges = false,
  onPublish,
  onPreview,
  onViewShop,
}: StoreCardProps) {
  return (
    <div
      className={[
        'flex w-full flex-col items-start bg-surface-secondary-300 px-[28px] py-xxl',
        attachedBelow ? '' : 'rounded-lg drop-shadow-[0_4px_10px_rgba(0,0,0,0.03)]',
      ].join(' ')}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-[26px]">
          <img
            src="/assets/img/charlotte-avatar.png"
            alt=""
            className="size-[84px] rounded-full object-cover"
          />
          <div className="flex w-[297px] flex-col gap-sm">
            <div className="flex items-center gap-[6px]">
              <p className="text-body-xxl font-semibold text-text-secondary-1000">Charlotte</p>
              <p className="text-body-md font-medium text-text-secondary-700">@charlotte</p>
            </div>
            <ShopUrl published={published} variant="shop" />
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-[15px]">
          <div className="flex items-center gap-md-sm">
            {published ? (
              <Button variant="outline" onClick={onPreview} leftIcon={<Icon name="eye-enabled" />}>
                Preview Storefront
              </Button>
            ) : (
              <Button variant="ghost" disabled leftIcon={<Icon name="eye" />}>
                Preview Storefront
              </Button>
            )}

            {published ? (
              hasUnpublishedChanges ? (
                <Button onClick={onPublish}>Publish changes</Button>
              ) : (
                <Button onClick={onViewShop}>View Shop</Button>
              )
            ) : canPublish ? (
              <Button onClick={onPublish}>Publish shop</Button>
            ) : (
              <Button variant="ghost" disabled>
                Publish shop
              </Button>
            )}
          </div>

          {published && publishedAt && (
            <p className="text-body-sm font-medium text-text-secondary-700">
              Last Published on {publishedAt}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
