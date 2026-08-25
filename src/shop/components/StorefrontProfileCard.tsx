import { useState } from 'react'
import ProfilePhoto from '../../portal/components/ProfilePhoto'
import { getSavedDisplayName } from '../../portal/profile-status'
import { FOLLOWER_STATS } from '../data/shop'
import { BioModal } from './BioModal'
import { Button } from './Button'
import { Icon } from './Icon'

type StorefrontProfileCardProps = {
  onCopyLink: () => void
}

/**
 * The influencer card at the top of the storefront preview (Figma `917:53526`,
 * frame `1211:72383`; the followed state and bio popup are `1105:12707`) —
 * avatar, name/handle, follower counts across URMEI/TikTok/Instagram, a
 * "Follow" button that toggles to an outlined "Following" state (this is a
 * preview, not a live social graph, so there's no real follow relationship
 * to persist), a "Read bio" button that opens the bio popup, and a copy-link
 * button.
 */
export function StorefrontProfileCard({ onCopyLink }: StorefrontProfileCardProps) {
  const [following, setFollowing] = useState(false)
  const [bioOpen, setBioOpen] = useState(false)
  const name = getSavedDisplayName('Charlotte')

  return (
    <div className="flex w-full items-start justify-between gap-md rounded-lg bg-surface-secondary-300 px-lg py-xxl">
      <div className="flex flex-1 items-center gap-4xl-1">
        <span className="relative size-[126px] shrink-0 overflow-hidden rounded-full">
          <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
        </span>
        <div className="flex flex-1 flex-col items-start gap-ten">
          <div className="flex w-full flex-col items-start gap-xs">
            <div className="flex items-center gap-[6px]">
              <p className="text-body-xxl font-semibold text-text-secondary-1000">{name}</p>
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
            <Button
              variant={following ? 'outline' : 'primary'}
              className="w-[132px]"
              onClick={() => setFollowing((current) => !current)}
            >
              {following ? 'Following' : 'Follow'}
            </Button>
            <Button variant="outline" className="w-[132px]" onClick={() => setBioOpen(true)}>
              Read bio
            </Button>
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

      {bioOpen && <BioModal name={name} onClose={() => setBioOpen(false)} />}
    </div>
  )
}
