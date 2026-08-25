import ProfilePhoto from '../../portal/components/ProfilePhoto'
import ShopUrl from '../../portal/components/ShopUrl'
import { getSavedDisplayName } from '../../portal/profile-status'
import { Button } from './Button'
import { Icon } from './Icon'

type StoreCardProps = {
  /** Rounds only the top when the KPI strip sits directly underneath. */
  attachedBelow?: boolean
  published?: boolean
  /** Formatted timestamp shown under the actions once published. */
  publishedAt?: string | null
  /** True once something (reordering, adding, removing, featuring) has changed
   *  since the last publish — swaps "View Shop" for "Publish changes". */
  hasUnpublishedChanges?: boolean
  /** Set after publishing was attempted with zero products — the shop never
   *  went live, but Preview still works and the Shop URL/Publish button
   *  reflect the blocked attempt (Figma `1362:73958`) until a product is
   *  added or a real publish succeeds. */
  publishBlocked?: boolean
  onPublish?: () => void
  onPreview?: () => void
  onViewShop?: () => void
}

export function StoreCard({
  attachedBelow = false,
  published = false,
  publishedAt = null,
  hasUnpublishedChanges = false,
  publishBlocked = false,
  onPublish,
  onPreview,
  onViewShop,
}: StoreCardProps) {
  return (
    <div
      className={[
        'flex w-full flex-col items-start bg-surface-secondary-300 px-[28px] py-xxl drop-shadow-[0_4px_10px_rgba(0,0,0,0.03)]',
        attachedBelow ? '' : 'rounded-lg',
      ].join(' ')}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-[26px]">
          <span className="relative size-[84px] shrink-0 overflow-hidden rounded-full">
            <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
          </span>
          <div className="flex w-[297px] flex-col gap-sm">
            <div className="flex items-center gap-[6px]">
              <p className="text-body-xxl font-semibold text-text-secondary-1000">{getSavedDisplayName('Charlotte')}</p>
              <p className="text-body-md font-medium text-text-secondary-700">@charlotte</p>
            </div>
            <ShopUrl
              published={published}
              variant="shop"
              unpublishedLabel={publishBlocked ? 'Your store URL is currently disabled.' : undefined}
            />
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-[15px]">
          <div className="flex items-center gap-md-sm">
            {published ? (
              <Button variant="outline" onClick={onPreview} leftIcon={<Icon name="eye-enabled" />}>
                Preview Storefront
              </Button>
            ) : publishBlocked ? (
              // Clickable, but still rendered muted — the shop never
              // actually went live, so the button looks the same as the
              // disabled case even though Preview works (Figma `1362:73958`).
              <Button
                variant="ghost"
                onClick={onPreview}
                leftIcon={<Icon name="eye" />}
                className="font-normal text-text-secondary-500"
              >
                Preview Storefront
              </Button>
            ) : (
              <Button variant="ghost" disabled leftIcon={<Icon name="eye" />} className="font-normal">
                Preview Storefront
              </Button>
            )}

            {published ? (
              hasUnpublishedChanges ? (
                <Button onClick={onPublish}>Publish changes</Button>
              ) : (
                <Button onClick={onViewShop}>View Shop</Button>
              )
            ) : (
              <Button onClick={onPublish} disabled={publishBlocked}>
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
