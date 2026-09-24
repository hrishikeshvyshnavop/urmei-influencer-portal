import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import ProfilePhoto from '../../portal/components/ProfilePhoto'
import { getSavedBio, getSavedDisplayName } from '../../portal/profile-status'
import { FOLLOWER_STATS } from '../data/shop'
import { Button } from './Button'
import { Icon } from './Icon'

type StorefrontProfileCardProps = {
  onCopyLink: () => void
}

/**
 * The creator card at the top of the storefront preview (Figma `1619:36970`) —
 * avatar, name/handle, follower counts across URMEI/TikTok/Instagram, a
 * "Follow" button that toggles to an outlined "Following" state (this is a
 * preview, not a live social graph, so there's no real follow relationship to
 * persist), a copy-link button, and the About me strip attached underneath.
 *
 * The bio used to sit behind a "Read bio" popup; the strip shows it outright
 * instead, so the button and its modal are gone.
 */
export function StorefrontProfileCard({ onCopyLink }: StorefrontProfileCardProps) {
  const [following, setFollowing] = useState(false)
  // The copy icon turns into a green tick for a moment after copying, the
  // same confirmation the Shop URL field gives (`portal/components/ShopUrl`).
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])
  const name = getSavedDisplayName('Charlotte')
  const bio = getSavedBio()

  return (
    <div className="flex w-full flex-col items-start rounded-lg bg-surface-secondary-300">
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
              <div className="flex h-[22px] items-center gap-sm">
                <img src="/urmei/home/follower.svg" alt="URMEI" className="h-[14px] w-[25.881px]" />
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
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onCopyLink()
            setCopied(true)
          }}
          className="flex shrink-0 items-center gap-sm rounded-md px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
        >
          Copy shop Link
          {copied ? (
            <Check aria-hidden="true" className="size-4 shrink-0 text-text-success" strokeWidth={2} />
          ) : (
            <Icon name="copy" />
          )}
        </button>
      </div>

      {/* Attached under the grey card, not floating: one rounded stack, with
          the strip's own white fill and hairline giving the split. */}
      <div className="flex w-full items-center justify-center rounded-[10px] border border-border-muted bg-surface-secondary-100 p-[20px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
        <p className="flex-1 text-body-sm text-text-secondary-700">
          <span className="font-medium text-text-secondary-900">About me :</span>{' '}
          {`“${bio}”`}
        </p>
      </div>
    </div>
  )
}
