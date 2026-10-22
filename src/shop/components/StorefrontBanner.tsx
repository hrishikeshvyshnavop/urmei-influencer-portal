import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import ProfilePhoto from '../../portal/components/ProfilePhoto'
import { getSavedBio, getSavedDisplayName } from '../../portal/profile-status'
import { backdropById } from '../data/backdrops'
import { FOLLOWER_STATS } from '../data/shop'
import { moreLabel, type AvailableFeatured } from '../featured'
import { Button } from './Button'
import { Icon } from './Icon'

type StorefrontBannerProps = {
  backdropId: string
  featured: AvailableFeatured[]
  onCopyLink: () => void
  onOpenFeatured: (featured: AvailableFeatured) => void
}

/** A featured card on the shopper's banner (`Storefront featured card`,
 *  main file `I2799:104166;3568:50919`): copy and a View button on the
 *  left, the collection's cover or the product photo on the right. */
function StorefrontFeaturedCard({ featured, onOpen }: { featured: AvailableFeatured; onOpen: () => void }) {
  const isCollection = featured.kind === 'collection'
  const title = isCollection ? featured.collection.name : featured.item.product.name
  const body = isCollection ? featured.collection.description : featured.item.product.brand
  const more = isCollection ? moreLabel(featured.items.length) : null
  const image = (src: string | undefined, className: string) =>
    src ? (
      <img src={src} alt="" className={`pointer-events-none object-cover ${className}`} />
    ) : (
      <span aria-hidden="true" className={`bg-surface-secondary-300 ${className}`} />
    )

  return (
    <div className="flex w-[500px] max-w-full items-stretch overflow-clip rounded-[16px] bg-white">
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[12.5px] bg-featured-surface p-lg">
        <div className="flex w-full flex-col gap-xs">
          <p className="text-[9.38px] leading-[12.5px] font-semibold tracking-[0.75px] text-featured-eyebrow">FEATURED</p>
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
        <div className="flex w-[180px] shrink-0 gap-xs">
          <div className="relative min-w-0 flex-1">{image(featured.items[0]?.product.shopCardImage, 'absolute inset-0 size-full')}</div>
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            {image(featured.items[1]?.product.shopCardImage, 'h-[88px] w-full')}
            <div className="relative h-[88px] w-full overflow-clip">
              {image(featured.items[2]?.product.shopCardImage, 'absolute inset-0 size-full')}
              {more && (
                <span className="absolute inset-0 flex flex-col items-center justify-center bg-scrim text-center font-medium text-text-secondary-100">
                  <span className="text-body-xl">{more.count}</span>
                  <span className="text-body-xs">{more.label}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        image(featured.item.product.shopCardImage, 'h-[180px] w-[180px] shrink-0')
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
export function StorefrontBanner({ backdropId, featured, onCopyLink, onOpenFeatured }: StorefrontBannerProps) {
  const backdrop = backdropById(backdropId)
  const [following, setFollowing] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  return (
    <section aria-label="Shop banner" className="relative w-full overflow-clip">
      <img src={backdrop.image} alt="" className="pointer-events-none absolute inset-0 size-full object-cover" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-end gap-fourteen px-6 py-[30px] lg:px-margin">
        {/* 374 tall beside featured cards (two 180px cards and the gap);
            with nothing featured it hugs its content (06.3). */}
        <div
          className={`flex min-w-[min(100%,560px)] flex-1 flex-col overflow-clip rounded-[16px] p-xxl shadow-banner-card ${featured.length > 0 ? 'min-h-[374px]' : ''}`}
          style={{ backgroundImage: backdrop.storefrontCard }}
        >
          <div className="flex flex-col items-start gap-md">
            <span className="relative size-[124px] shrink-0 overflow-hidden rounded-full">
              <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
            </span>
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
                    <Icon name="tiktok" />
                    {FOLLOWER_STATS.tiktok}
                  </span>
                  <span className="flex items-center gap-sm text-body-sm font-medium text-text-secondary-1000">
                    <Icon name="instagram" />
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
        {featured.length > 0 && (
          <div className="flex max-w-full shrink-0 flex-col justify-center gap-fourteen">
            {featured.map((item) => (
              <StorefrontFeaturedCard
                key={`${item.ref.kind}:${item.ref.id}`}
                featured={item}
                onOpen={() => onOpenFeatured(item)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
