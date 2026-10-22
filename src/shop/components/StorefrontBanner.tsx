import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import ProfilePhoto from '../../portal/components/ProfilePhoto'
import { getSavedBio, getSavedDisplayName } from '../../portal/profile-status'
import { backdropById } from '../data/backdrops'
import { backdropColors } from '../data/backdrop-colors'
import { FOLLOWER_STATS } from '../data/shop'
import type { AvailableFeatured } from '../featured'
import { Button } from './Button'
import { CollectionCover } from './CollectionCover'
import { Icon } from './Icon'
import { ScaledBox } from './ScaledBox'

type StorefrontBannerProps = {
  backdropId: string
  featured: AvailableFeatured[]
  /** The in-app preview keeps the banner content at the 1440px design width,
   *  while the backdrop itself still bleeds to the viewport edges. */
  scaleContent?: boolean
  onCopyLink: () => void
  onOpenFeatured: (featured: AvailableFeatured) => void
}

/** A featured card on the shopper's banner (`Storefront featured card`,
 *  main file `I2799:104166;3568:50919`): copy and a View button on the
 *  left, the collection's cover or the product photo on the right. */
function StorefrontFeaturedCard({ featured, onOpen, surface, labelColor }: { featured: AvailableFeatured; onOpen: () => void; surface: string; labelColor: string }) {
  const isCollection = featured.kind === 'collection'
  const title = isCollection ? featured.collection.name : featured.item.product.name
  const body = isCollection ? featured.collection.description : featured.item.product.brand
  const image = (src: string | undefined, className: string) =>
    src ? (
      <img src={src} alt="" className={`pointer-events-none object-cover ${className}`} />
    ) : (
      <span aria-hidden="true" className={`bg-surface-secondary-300 ${className}`} />
    )

  return (
    <div className="flex w-[500px] max-w-full items-stretch overflow-clip rounded-[16px] bg-white">
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[12.5px] p-lg" style={{ backgroundColor: surface }}>
        <div className="flex w-full flex-col gap-xs">
          <p className="text-[9.38px] leading-[12.5px] font-semibold tracking-[0.75px]" style={{ color: labelColor }}>FEATURED</p>
          <p className="line-clamp-2 text-[18.76px] leading-[28.14px] font-semibold text-text-secondary-1000">{title}</p>
          {body && <p className="line-clamp-2 text-[10.94px] leading-[17.2px] font-medium text-featured-body">{body}</p>}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="self-start rounded-[6.25px] border border-border-default bg-surface-secondary-100 px-[12.5px] py-[6.25px] text-[10.94px] leading-[17.2px] font-medium whitespace-nowrap text-text-secondary-1000 capitalize"
        >
          {isCollection ? 'View Collection' : 'View Product'}
        </button>
      </div>
      {isCollection ? (
        <CollectionCover items={featured.items} className="min-h-[180px] w-[180px] shrink-0" gapClassName="gap-xs" leadClassName="flex-1" />
      ) : (
        <div className="relative w-[180px] shrink-0 self-stretch">
          {image(featured.item.product.shopCardImage, 'absolute inset-0 size-full')}
        </div>
      )}
    </div>
  )
}

/**
 * The shopper's banner (`Storefront banner (e-com)`, main file
 * `2799:104166`): the backdrop full width, the profile card tinted for that
 * backdrop on the left, and up to two featured cards stacked on the right.
 * With nothing featured the card takes the full width. The storefront
 * preview passes the saved banner; the public storefront the published one
 * (flow 06).
 */
export function StorefrontBanner({ backdropId, featured, scaleContent = false, onCopyLink, onOpenFeatured }: StorefrontBannerProps) {
  const backdrop = backdropById(backdropId)
  const colors = backdropColors(backdropId)
  const [following, setFollowing] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  const content = (
    <div className="relative mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-fourteen px-6 py-[30px] lg:px-margin">
        <div
          className={`flex min-w-[min(100%,560px)] flex-1 flex-col overflow-clip rounded-[16px] p-xxl shadow-banner-card ${featured.length > 0 ? 'min-h-[374px]' : ''}`}
          style={{ background: colors.profileCard }}
        >
          <div className="flex flex-col items-start gap-md">
            <span className="relative size-[124px] shrink-0 overflow-hidden rounded-full">
              <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
            </span>
            {/* `Identity text`: 12px between the bio and the actions, under
                the avatar's 16. */}
            <div className="flex w-full flex-col items-start gap-md-sm">
              <div className="flex w-full flex-col gap-md-sm">
                <div className="flex w-full flex-col gap-xs">
                  <div className="flex items-center gap-md-sm">
                    <p className="text-body-xxl font-semibold text-text-secondary-1000">{getSavedDisplayName('Charlotte')}</p>
                    <p className="text-body-sm text-text-secondary-700">@charlotte</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-md gap-y-sm">
                    <span className="flex items-center gap-sm text-body-sm text-text-secondary-700">
                      <img src="/urmei/home/follower.svg" alt="URMEI" className="h-[14px] w-[26px]" />
                      <span>
                        <span className="font-medium text-text-secondary-1000">{FOLLOWER_STATS.urmei}</span> Followers
                      </span>
                    </span>
                    <span className="flex items-center gap-sm text-body-sm font-medium text-text-secondary-1000">
                      <Icon name="tiktok-dark" />
                      {FOLLOWER_STATS.tiktok}
                    </span>
                    <span className="flex items-center gap-sm text-body-sm font-medium text-text-secondary-1000">
                      <Icon name="instagram-dark" />
                      {FOLLOWER_STATS.instagram}
                    </span>
                  </div>
                </div>
                <p className="line-clamp-2 text-body-sm text-text-secondary-700">{getSavedBio()}</p>
              </div>
              <div className="flex items-center gap-md">
                <Button variant={following ? 'outline' : 'primary'} onClick={() => setFollowing((current) => !current)}>
                  {following ? 'Following' : 'Follow'}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    onCopyLink()
                    setCopied(true)
                  }}
                  className="flex cursor-pointer items-center gap-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
                >
                  Copy Shop Link
                  {copied ? (
                    <Check aria-hidden="true" className="size-4 shrink-0 text-text-success" strokeWidth={2} />
                  ) : (
                    <Icon name="copy" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {featured.length > 0 && (
          <div className="flex max-w-full shrink-0 flex-col justify-center gap-fourteen">
            {featured.map((item) => (
              <StorefrontFeaturedCard
                key={`${item.ref.kind}:${item.ref.id}`}
                featured={item}
                surface={colors.featuredCard}
                labelColor={colors.featuredLabel}
                onOpen={() => onOpenFeatured(item)}
              />
            ))}
          </div>
        )}
    </div>
  )

  return (
    /* The banner hugs its content (434 at 1440 with a featured card: 30 + the
       374 profile card + 30, main file `2799:104165`); the 1440×558 backdrop
       art is pinned to the top and clipped, as in the design. */
    <section aria-label="Shop banner" className="relative w-full overflow-clip">
      <img src={backdrop.image} alt="" className="pointer-events-none absolute inset-0 size-full object-cover object-top" />
      {scaleContent ? (
        <div className="flex w-full justify-center">
          <ScaledBox width={1440}>{content}</ScaledBox>
        </div>
      ) : content}
    </section>
  )
}
