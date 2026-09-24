import { useLayoutEffect, useRef, useState } from 'react'
import ProfilePhoto from '../../portal/components/ProfilePhoto'
import type { CreatorReview } from '../data/reviews'
import type { ShopItem } from '../types'
import { Icon } from './Icon'

/** Two cards side by side, as in the design — the counter pages through them. */
const REVIEWS_PER_PAGE = 2

function ReviewCard({ review, onSelect }: { review: CreatorReview; onSelect: (item: ShopItem) => void }) {
  const { product } = review.item
  const textRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [clamped, setClamped] = useState(false)

  // "Read more" only when the three-line clamp actually cut something off —
  // the design's second card is short enough to show whole and has no link.
  useLayoutEffect(() => {
    const element = textRef.current
    if (element && !expanded) setClamped(element.scrollHeight > element.clientHeight)
  }, [review.text, expanded])

  return (
    <div className="flex min-w-0 flex-1 flex-col items-start overflow-clip rounded-lg border border-border-default bg-surface-secondary-300">
      {/* The product header opens that product, hence the chevron. */}
      <button
        type="button"
        onClick={() => onSelect(review.item)}
        className="flex w-full items-center gap-md rounded-lg bg-surface-secondary-300 px-md py-fourteen text-left"
      >
        {/* Brand over name only — Figma `915:28650` dropped the thumbnail. */}
        <span className="flex min-w-0 flex-1 flex-col items-start">
          <span className="w-full text-body-sm text-text-secondary-700 uppercase">{product.brand}</span>
          <span className="w-full truncate text-body-sm font-medium text-text-secondary-1000">
            {product.name}
          </span>
        </span>
        <span className="flex w-[40px] shrink-0 items-center justify-center p-md-sm">
          <Icon name="chevron-right" />
        </span>
      </button>

      <div className="flex w-full flex-1 items-start gap-fourteen rounded-[10px] border border-border-muted bg-surface-secondary-100 px-md py-fourteen drop-shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
        <span className="relative size-[40px] shrink-0">
          <span className="relative block size-full overflow-hidden rounded-full">
            <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
          </span>
          <img
            src="/urmei/reviews/badge-check.svg"
            alt="Verified creator"
            className="absolute right-[-1.78px] bottom-[-1.78px] size-[17.778px]"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-fourteen">
          <div className="flex w-full flex-col items-start gap-xs">
            <p ref={textRef} className={`w-full text-body-sm text-text-secondary-700 ${expanded ? '' : 'line-clamp-3'}`}>
              {`“${review.text}”`}
            </p>
            {(clamped || expanded) && (
              <button
                type="button"
                onClick={() => setExpanded((current) => !current)}
                className="text-[14px] font-medium text-text-secondary-900 underline"
              >
                {expanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
          {review.photos.length > 0 && (
            <div className="flex w-full items-center gap-sm">
              {review.photos.slice(0, 3).map((photo) => (
                <img key={photo} src={photo} alt="" className="size-[48px] shrink-0 rounded-md object-cover" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * "CHARLOTTE'S REVIEWS" (Figma `957:29042`, updated `915:28650`) — between the favorite strip and
 * All Picks: a titled sidebar with a page counter, and two review cards, each
 * a product header over the creator's verified review and attached photos.
 */
export function StorefrontReviews({
  reviews,
  ownerName,
  onSelect,
}: {
  reviews: CreatorReview[]
  ownerName: string
  onSelect: (item: ShopItem) => void
}) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(reviews.length / REVIEWS_PER_PAGE))
  const current = Math.min(page, totalPages)
  const visible = reviews.slice((current - 1) * REVIEWS_PER_PAGE, current * REVIEWS_PER_PAGE)

  return (
    <section className="flex w-full justify-center bg-surface-secondary-100 py-5xl">
      <div className="flex w-full max-w-[1440px] items-start gap-5xl px-margin">
        <div className="flex w-[300px] shrink-0 flex-col items-start justify-between gap-lg self-stretch">
          <div className="flex w-full flex-col items-start gap-md">
            <h2 className="w-full text-h4 text-text-secondary-1000 uppercase">{ownerName}&rsquo;s Reviews</h2>
            <p className="w-full text-body-sm text-text-secondary-700">
              Curated essentials hand-picked by {ownerName}. Tested daily, reviewed honestly, only the products
              that made the cut.
            </p>
          </div>
          {/* Hidden with a single page, like the favorite strip's arrows. */}
          {totalPages > 1 && (
            <div className="flex items-center gap-md-sm">
              <button
                type="button"
                aria-label="Previous reviews"
                disabled={current === 1}
                onClick={() => setPage(current - 1)}
                className="flex items-center justify-center overflow-clip rounded-full border border-border-default p-md-sm disabled:opacity-40"
              >
                <Icon name="chevron-left" />
              </button>
              <p className="text-body-sm whitespace-nowrap text-text-secondary-900">
                {current} / {totalPages}
              </p>
              <button
                type="button"
                aria-label="Next reviews"
                disabled={current === totalPages}
                onClick={() => setPage(current + 1)}
                className="flex items-center justify-center overflow-clip rounded-full border border-border-default p-md-sm disabled:opacity-40"
              >
                <Icon name="chevron-right" />
              </button>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-stretch gap-md self-stretch">
          {visible.map((review) => (
            <ReviewCard key={review.item.id} review={review} onSelect={onSelect} />
          ))}
          {/* Keep a lone last review at half width rather than stretching it. */}
          {visible.length < REVIEWS_PER_PAGE && <div className="min-w-0 flex-1" />}
        </div>
      </div>
    </section>
  )
}
