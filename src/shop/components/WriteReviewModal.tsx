import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CreatorReview } from '../creator-reviews'
import type { Product } from '../types'
import { Icon } from './Icon'

type WriteReviewModalProps = {
  product: Product
  initialReview: CreatorReview | null
  onClose: () => void
  onSubmit: (input: { comment: string; socialPostUrl?: string }) => void
}

/**
 * The creator's own review of a product in their shop — a comment plus an
 * optional link to the social post it came from (Figma-less; new for the
 * creator-reviews PRD). Kept separate from the shopper `rating`/`reviewCount`
 * aggregate on `Product` — how this surfaces on the storefront is still an
 * open product question.
 */
export function WriteReviewModal({ product, initialReview, onClose, onSubmit }: WriteReviewModalProps) {
  const [comment, setComment] = useState(initialReview?.comment ?? '')
  const [socialPostUrl, setSocialPostUrl] = useState(initialReview?.socialPostUrl ?? '')
  const canSubmit = comment.trim().length > 0

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit({ comment: comment.trim(), socialPostUrl: socialPostUrl.trim() || undefined })
  }

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-scrim p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={initialReview ? 'Edit your review' : 'Write a review'}
        className="motion-modal-panel my-auto flex w-[525px] max-w-full shrink-0 flex-col items-start overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">
            {initialReview ? 'Edit your review' : 'Write a review'}
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-[40px] items-center justify-center overflow-clip rounded-md border border-border-default"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex w-full flex-col gap-lg px-lg pt-md pb-lg">
          <div className="flex w-full items-center gap-md-sm">
            <img
              src={product.listImage}
              alt=""
              className="size-[48px] shrink-0 rounded-sm border border-border-default object-cover"
            />
            <div className="flex min-w-px flex-1 flex-col">
              <p className="text-body-xxs font-medium text-text-secondary-700">{product.brand}</p>
              <p className="truncate text-body-sm font-medium text-text-secondary-1000">{product.name}</p>
            </div>
          </div>

          <label className="flex w-full flex-col gap-xs">
            <span className="text-body-sm font-medium text-text-secondary-1000">Your review</span>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              placeholder="What did you think of this product?"
              className="w-full resize-none rounded-md border border-border-default bg-surface-secondary-100 px-md py-sm text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-600 focus:border-border-outlined"
            />
          </label>

          <label className="flex w-full flex-col gap-xs">
            <span className="text-body-sm font-medium text-text-secondary-1000">
              Social post link <span className="font-normal text-text-secondary-600">(optional)</span>
            </span>
            <input
              type="url"
              value={socialPostUrl}
              onChange={(event) => setSocialPostUrl(event.target.value)}
              placeholder="https://"
              className="w-full rounded-md border border-border-default bg-surface-secondary-100 px-md py-sm text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-600 focus:border-border-outlined"
            />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100 disabled:bg-surface-secondary-300 disabled:text-text-secondary-500"
          >
            {initialReview ? 'Save changes' : 'Submit review'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
