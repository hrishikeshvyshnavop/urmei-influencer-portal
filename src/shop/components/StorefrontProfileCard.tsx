import ProfilePhoto from '../../portal/components/ProfilePhoto'
import { getSavedDisplayName } from '../../portal/profile-status'
import { FOLLOWER_STATS } from '../data/shop'
import { Button } from './Button'
import { Icon } from './Icon'

type StorefrontProfileCardProps = {
  onCopyLink: () => void
}

/**
 * The influencer card at the top of the storefront preview (Figma `917:53526`,
 * frame `1211:72383`) — avatar, name/handle, follower counts across URMEI/TikTok/
 * Instagram, "Follow"/"Read bio" buttons (decorative — this is a preview, not
 * the live public storefront, so neither has a real action), and a copy-link
 * button.
 */
export function StorefrontProfileCard({ onCopyLink }: StorefrontProfileCardProps) {
  return (
    <div className="flex w-full items-start justify-between gap-md rounded-lg bg-surface-secondary-300 px-lg py-xxl">
      <div className="flex flex-1 items-center gap-4xl-1">
        <span className="relative size-[126px] shrink-0 overflow-hidden rounded-full">
          <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
        </span>
        <div className="flex flex-1 flex-col items-start gap-ten">
          <div className="flex w-full flex-col items-start gap-xs">
            <div className="flex items-center gap-[6px]">
              <p className="text-body-xxl font-semibold text-text-secondary-1000">{getSavedDisplayName('Charlotte')}</p>
              <p className="text-body-md font-medium text-text-secondary-700">@charlotte</p>
            </div>
            <div className="flex items-center gap-sm">
              <img src="/urmei/home/follower.svg" alt="URMEI" className="h-[14px] w-[26px]" />
              <p className="text-body-sm font-medium text-text-secondary-700">
                {FOLLOWER_STATS.urmei} Followers
              </p>
            </div>
            <div className="flex items-center gap-md">
              <div className="flex items-center gap-xs">
                <Icon name="tiktok" size={12} />
                <p className="text-body-sm font-medium text-text-secondary-700">{FOLLOWER_STATS.tiktok}</p>
              </div>
              <div className="flex items-center gap-xs">
                <Icon name="instagram" size={16} />
                <p className="text-body-sm font-medium text-text-secondary-700">{FOLLOWER_STATS.instagram}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-ten">
            <Button className="w-[132px]">Follow</Button>
            <Button variant="outline" className="w-[132px]">Read bio</Button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onCopyLink}
        className="flex shrink-0 items-center gap-sm rounded-md px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
      >
        Copy shop Link
        <Icon name="copy" />
      </button>
    </div>
  )
}
