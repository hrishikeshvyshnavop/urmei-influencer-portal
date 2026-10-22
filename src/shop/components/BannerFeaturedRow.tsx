import { MAX_FEATURED } from '../banner-store'
import { backdropColors } from '../data/backdrop-colors'
import type { ResolvedFeatured } from '../featured'
import { CollectionCover } from './CollectionCover'
import { cn } from '../../lib/utils'
import { Icon } from './Icon'

type BannerFeaturedRowProps = {
  featured: ResolvedFeatured[]
  /** Add Featured Items, Add Another and Change all open the Featured items
   *  dialog with the current picks ticked. */
  onEdit: () => void
  onRemove: (featured: ResolvedFeatured) => void
  featuredLabelColor?: string
  featuredSurface?: string
}

/** A collection's 133px square cover: the first image on the left, two
 *  stacked on the right, "+N products" over the last (main file
 *  `I2799:103926;3447:58904`). */
function SquareCover({ featured }: { featured: Extract<ResolvedFeatured, { kind: 'collection' }> }) {
  return <CollectionCover items={featured.items} className="size-[133px] shrink-0 rounded-lg" leadClassName="flex-1" moreSize="md" />
}

function FeaturedCard({ featured, onChange, onRemove, labelColor, surface }: { featured: ResolvedFeatured; onChange: () => void; onRemove: () => void; labelColor: string; surface: string }) {
  const unavailable = featured.kind === 'unavailable'
  const title =
    featured.kind === 'collection'
      ? featured.collection.name
      : featured.kind === 'product'
        ? featured.item.product.name
        : featured.product.name
  return (
    <div className="flex min-w-[min(300px,100%)] flex-1 items-center overflow-clip rounded-lg shadow-[0_0_28px_0_rgba(0,0,0,0.03)]" style={{ backgroundColor: surface }}>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-md-sm px-md-2 py-md-sm">
        <div className="flex w-full flex-col gap-xs">
          <p className={cn('text-body-xs', unavailable && 'opacity-60')} style={{ color: labelColor }}>FEATURED</p>
          <p className={cn('w-full truncate text-body-md font-medium text-text-secondary-1000', unavailable && 'opacity-60')}>
            {title}
          </p>
          {/* The product left the shop (05.1, `I2799:104500;3461:312171`). */}
          {unavailable && (
            <p className="text-body-xs text-text-secondary-700">
              Shoppers no longer see it. Change to pick another, or remove it.
            </p>
          )}
        </div>
        {/* Creator-only: shoppers see View Collection / Shop Now instead. */}
        <div className="flex items-start gap-sm">
          <button
            type="button"
            onClick={onChange}
            className="flex cursor-pointer items-center justify-center rounded-md border border-border-default px-sm py-xs text-body-xs font-medium text-text-secondary-1000 capitalize"
          >
            Change
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex cursor-pointer items-center justify-center rounded-md px-sm py-xs text-body-xs font-medium text-text-secondary-1000 capitalize"
          >
            Remove
          </button>
        </div>
      </div>
      {featured.kind === 'collection' ? (
        <SquareCover featured={featured} />
      ) : (
        <span className="relative size-[133px] shrink-0">
          <img
            src={featured.kind === 'product' ? featured.item.product.shopCardImage : featured.product.shopCardImage}
            alt=""
            className={cn('pointer-events-none size-full rounded-lg object-cover', unavailable && 'opacity-40')}
          />
          {unavailable && (
            <span className="absolute top-sm left-sm rounded-full bg-white px-ten py-[5px] text-[11px] leading-[13px] font-semibold tracking-[0.6px] whitespace-nowrap text-text-secondary-1000">
              NOT AVAILABLE
            </span>
          )}
        </span>
      )}
    </div>
  )
}

/**
 * The featured row under the divider in the My Shop banner card (flow 02):
 * a dashed prompt with nothing featured, one card plus a dashed Add Another
 * slot, or two cards side by side.
 */
export function BannerFeaturedRow({
  featured,
  onEdit,
  onRemove,
  featuredLabelColor = backdropColors('plain').featuredLabel,
  featuredSurface = backdropColors('plain').featuredCard,
}: BannerFeaturedRowProps) {
  return (
    <div className="flex w-full flex-col border-t border-border-default pt-lg">
      {featured.length === 0 ? (
        <div className="flex h-[133px] w-full flex-col items-center justify-center gap-md-sm rounded-lg border-2 border-dashed border-border-dashed">
          <p className="text-center text-body-md font-medium text-text-secondary-1000">
            Feature up to {MAX_FEATURED} products or collections
          </p>
          <button
            type="button"
            onClick={onEdit}
            className="flex cursor-pointer items-center justify-center gap-sm rounded-md border border-border-default px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
          >
            <Icon name="plus" />
            Add Featured Items
          </button>
        </div>
      ) : (
        <div className="flex w-full flex-wrap gap-md">
          {featured.map((item) => (
            <FeaturedCard
              key={`${item.ref.kind}:${item.ref.id}`}
              featured={item}
              onChange={onEdit}
              onRemove={() => onRemove(item)}
              labelColor={featuredLabelColor}
              surface={featuredSurface}
            />
          ))}
          {featured.length < MAX_FEATURED && (
            <div className="flex h-[133px] min-w-[min(300px,100%)] flex-1 items-center justify-center rounded-lg border-2 border-dashed border-border-dashed">
              <button
                type="button"
                onClick={onEdit}
                className="flex cursor-pointer items-center gap-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
              >
                <Icon name="plus" />
                Add Another
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
