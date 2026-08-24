import { FOLLOWER_STATS } from '../data/shop'
import { Button } from './Button'
import { Icon } from './Icon'

type StorefrontProfileCardProps = {
  onCopyLink: () => void
}

/**
 * The influencer card at the top of the storefront preview (Figma `917:53442`,
 * frame `970:79779`) — avatar, name/handle, follower counts across URMEI/TikTok/
 * Instagram, a "Follow" button (decorative — this is a preview, not the live
 * public storefront, so there's no real follow action), and a copy-link button.
 */
export function StorefrontProfileCard({ onCopyLink }: StorefrontProfileCardProps) {
  return (
    <div className="flex w-full items-start justify-between gap-md rounded-lg bg-surface-secondary-300 px-lg py-xxl">
      <div className="flex flex-1 items-center gap-4xl-1">
        <img
          src="/assets/img/charlotte-avatar.png"
          alt=""
          className="size-[126px] rounded-full object-cover"
        />
        <div className="flex flex-1 flex-col items-start gap-ten">
          <div className="flex w-full flex-col items-start gap-xs">
            <div className="flex items-center gap-[6px]">
              <p className="text-body-xxl font-semibold text-text-secondary-1000">Charlotte</p>
              <p className="text-body-md font-medium text-text-secondary-700">@charlotte</p>
            </div>
            <div className="flex items-center gap-xs">
              <img src="/assets/img/urmei-mark.svg" alt="" className="h-[9px] w-[16.633px]" />
              <p className="text-body-sm font-medium text-text-secondary-700">
                {FOLLOWER_STATS.urmei} Followers
              </p>
            </div>
            <div className="flex items-center gap-md">
              <div className="flex items-center gap-xs">
                <Icon name="tiktok" srcSize={12} />
                <p className="text-body-sm font-medium text-text-secondary-700">
                  {FOLLOWER_STATS.tiktok} Followers
                </p>
              </div>
              <div className="flex items-center gap-xs">
                <Icon name="instagram" srcSize={16} />
                <p className="text-body-sm font-medium text-text-secondary-700">
                  {FOLLOWER_STATS.instagram} Followers
                </p>
              </div>
            </div>
          </div>
          <Button className="w-[132px]">Follow</Button>
        </div>
      </div>

      <button
        type="button"
        onClick={onCopyLink}
        className="flex shrink-0 items-center gap-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
      >
        Copy Share Link
      </button>
    </div>
  )
}
