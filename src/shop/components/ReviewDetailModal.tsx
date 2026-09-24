import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import ProfilePhoto from '../../portal/components/ProfilePhoto'
import type { CreatorReview } from '../data/reviews'
import type { ShopItem } from '../types'
import { Icon } from './Icon'

/** "March 15, 2026" — the design's date line under the reviewer's name. */
const reviewDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

/**
 * Review Details (Figma `915:28947`): the whole of one creator review, opened
 * from its storefront card. The product box on top opens that product, the
 * reviewer row carries the verified badge and the date, and the full text
 * reads unclamped above the review's photos at 64px.
 */
export function ReviewDetailModal({
  review,
  ownerName,
  onClose,
  onSelectProduct,
}: {
  review: CreatorReview
  ownerName: string
  onClose: () => void
  onSelectProduct: (item: ShopItem) => void
}) {
  const titleId = useId()
  const { product } = review.item

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-scrim p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="motion-modal-panel flex max-h-full w-[480px] max-w-full flex-col overflow-hidden rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full shrink-0 items-center justify-between border-b border-border-default px-lg py-md">
          <h2 id={titleId} className="text-body-xl text-text-secondary-1000">
            Review Details
          </h2>
          <button
            type="button"
            aria-label="Close"
            autoFocus
            onClick={onClose}
            className="flex w-[40px] cursor-pointer items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex w-full flex-col gap-md-2 overflow-y-auto p-lg">
          <button
            type="button"
            onClick={() => onSelectProduct(review.item)}
            className="flex w-full cursor-pointer items-center gap-md rounded-lg bg-surface-secondary-300 px-md py-fourteen text-left"
          >
            <span className="flex min-w-0 flex-1 items-center gap-md">
              <img src={product.shopCardImage} alt="" className="size-[56px] shrink-0 rounded-lg object-cover" />
              <span className="flex min-w-0 flex-1 flex-col items-start">
                <span className="w-full text-body-sm text-text-secondary-700 uppercase">{product.brand}</span>
                <span className="w-full truncate text-body-md font-medium text-text-secondary-1000">
                  {product.name}
                </span>
              </span>
            </span>
            <span className="flex w-[40px] shrink-0 items-center justify-center p-md-sm">
              <Icon name="chevron-right" />
            </span>
          </button>

          <div className="h-px w-full shrink-0 bg-border-default" />

          <div className="flex w-full flex-col gap-md-2">
            <div className="flex w-full items-center gap-md-sm">
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
              <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
                <span className="text-body-sm font-medium text-text-secondary-1000">{ownerName}</span>
                <time dateTime={review.writtenOn} className="text-body-xs text-text-secondary-700">
                  {reviewDate.format(new Date(review.writtenOn))}
                </time>
              </span>
            </div>
            <p className="w-full text-body-md whitespace-pre-line text-text-secondary-900">{review.text}</p>
          </div>

          {review.photos.length > 0 && (
            <div className="flex w-full items-start gap-sm">
              {review.photos.slice(0, 3).map((photo) => (
                <img key={photo} src={photo} alt="" className="size-[64px] shrink-0 rounded-md object-cover" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
