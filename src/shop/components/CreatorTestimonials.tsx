import { useState } from 'react'
import ProfilePhoto from '../../portal/components/ProfilePhoto'
import WriteReviewModal from '../../portal/components/WriteReviewModal'
import { getSavedDisplayName } from '../../portal/profile-status'
import { loadSampleRequests, type SampleReview } from '../../portal/sample-requests'
import {
  productReviewFor,
  reviewMonth,
  saveProductReview,
  testimonialsFor,
} from '../data/creator-testimonials'
import type { Product } from '../types'
import { Button } from './Button'

function CarouselButton({
  direction,
  onClick,
}: {
  direction: 'previous' | 'next'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'previous' ? 'Previous review' : 'Next review'}
      onClick={onClick}
      className="flex items-center justify-center overflow-clip rounded-full border border-border-default p-md-sm"
    >
      <img
        src={direction === 'previous' ? '/urmei/pdp/chevron-left.svg' : '/urmei/pdp/chevron-right.svg'}
        alt=""
        width={16}
        height={16}
        className="block size-4"
      />
    </button>
  )
}

/** The creator's own word on this product: a review from its page, or else
 *  one written for a delivered sample of it. */
function ownReviewFor(product: Product): SampleReview | undefined {
  return (
    productReviewFor(product.id) ??
    // Seeded requests carry no product id, so fall back to the name match
    // Your Reviews uses ("Low pH Good Morning Gel Cleanser (50ml)").
    loadSampleRequests().find(
      (request) =>
        request.review &&
        (request.productId ? request.productId === product.id : request.productName.startsWith(product.name)),
    )?.review
  )
}

type Slide = { author: string; avatar?: string; month: string; text: string; own: boolean }

/**
 * "What Creators Say" (Figma `1030:25483`): one other creator's quote at a
 * time, with the month it was written, their avatar and a verified badge, and
 * a "1 / n" pager that wraps at both ends. Each page change slides the new
 * quote in from the side it came from; the pager count itself stays still.
 */
function WhatCreatorsSay({ product, ownReview }: { product: Product; ownReview?: SampleReview }) {
  // Once the creator has reviewed the product, their quote leads as
  // "<Name> (You)" (Figma `1030:30435`), ahead of other creators'.
  const testimonials: Slide[] = [
    ...(ownReview
      ? [{ author: getSavedDisplayName('Charlotte'), month: reviewMonth(ownReview.writtenAt), text: ownReview.text, own: true }]
      : []),
    ...testimonialsFor(product).map((testimonial) => ({ ...testimonial, own: false })),
  ]
  const [index, setIndex] = useState(0)
  // Null until the pager is first used, so the opening quote doesn't animate.
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)
  const current = testimonials[Math.min(index, testimonials.length - 1)]!
  const step = (by: number) => {
    setDirection(by > 0 ? 'next' : 'prev')
    setIndex((value) => (value + by + testimonials.length) % testimonials.length)
  }
  const slide = direction ? `motion-carousel-${direction}` : ''

  return (
    <section
      aria-label="What creators say"
      className="flex min-h-[194px] w-full items-center gap-5xl bg-surface-secondary-300 p-3xl"
    >
      <div className="flex w-[280px] shrink-0 flex-col gap-md self-start">
        <h2 className="text-body-md font-medium tracking-[1.6px] whitespace-nowrap text-text-secondary-700 uppercase">
          What Creators Say
        </h2>
        <p className="flex items-center gap-sm">
          <img src="/urmei/pdp/quote.svg" alt="" width={19} height={19} className="block size-[19px]" />
          <span key={index} className={`text-body-xs whitespace-nowrap text-text-secondary-600 uppercase ${slide}`}>
            {current.month}
          </span>
        </p>
      </div>

      {/* Clips the slide-in so it never spills past the panel's padding. */}
      <div className="flex min-w-px flex-1 flex-col gap-xxl self-stretch overflow-x-clip">
        {/* Keyed on the page so each change remounts and replays the slide. */}
        <blockquote key={index} className={`text-body-lg font-medium text-text-secondary-1000 ${slide}`}>
          "{current.text}"
        </blockquote>
        <div className="flex w-full items-center justify-between">
          <div key={index} className={`flex items-center gap-md ${slide} ${slide ? 'motion-carousel-trail' : ''}`}>
            <span className="relative size-9 shrink-0">
              {current.own ? (
                <span className="relative block size-full overflow-hidden rounded-[18px]">
                  <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
                </span>
              ) : (
                <img
                  src={current.avatar}
                  alt=""
                  className="size-full rounded-[18px] object-cover"
                />
              )}
              {/* The storefront reviews' blue verified badge, kept at the same
                  scale to the avatar (17.78px on 40px there, 16px on 36px here). */}
              <img
                src="/urmei/reviews/badge-check.svg"
                alt=""
                width={17.7778}
                height={17.7778}
                className="absolute -right-[3px] -bottom-px block size-4"
              />
            </span>
            <p className="text-body-md font-medium whitespace-nowrap text-text-secondary-1000">
              {current.author}
              {current.own ? <span className="text-text-secondary-700"> (You)</span> : null}
              <span className="sr-only">, verified creator</span>
            </p>
          </div>
          <div className="flex items-center gap-md-sm">
            <CarouselButton direction="previous" onClick={() => step(-1)} />
            <p className="text-body-sm whitespace-nowrap text-text-secondary-900" aria-live="polite">
              {index + 1} / {testimonials.length}
            </p>
            <CarouselButton direction="next" onClick={() => step(1)} />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * The "Used this product? Share your review." prompt (Figma `1030:25501`),
 * open to any creator, sample or not. It opens the same rating modal a
 * delivered sample uses, and steps aside once this product has a review.
 */
function WriteReviewCta({ onSubmit }: { onSubmit: (review: SampleReview) => void }) {
  const [writing, setWriting] = useState(false)

  return (
    <>
      <div className="flex min-h-[94px] w-full items-center justify-between gap-md rounded-md border border-border-default bg-surface-secondary-100 px-md-2 py-md">
        <div className="flex items-center gap-md">
          <span className="flex shrink-0 items-center rounded-full bg-portal-star p-[4.545px]">
            <img
              src="/urmei/sample-requests/star.svg"
              alt=""
              width={15.9091}
              height={15.9091}
              className="block size-[15.9091px]"
            />
          </span>
          <div className="flex flex-col">
            <p className="text-body-md font-medium text-surface-primary-900">
              Used this product? Share your review.
            </p>
            <p className="text-body-sm text-text-secondary-600">
              Even without a sample request, let other creators know what you think.
            </p>
          </div>
        </div>
        <Button variant="primary" className="shrink-0" onClick={() => setWriting(true)}>
          Write a Review
        </Button>
      </div>

      {writing && (
        <WriteReviewModal
          onClose={() => setWriting(false)}
          onSubmit={(review) => {
            setWriting(false)
            onSubmit(review)
          }}
        />
      )}
    </>
  )
}

export function CreatorTestimonials({ product }: { product: Product }) {
  const [ownReview, setOwnReview] = useState(() => ownReviewFor(product))

  return (
    <div className="flex w-full flex-col gap-lg">
      {/* Keyed on the review so a new one resets the pager onto it. */}
      <WhatCreatorsSay key={ownReview ? 'reviewed' : 'not-reviewed'} product={product} ownReview={ownReview} />
      {ownReview ? null : (
        <WriteReviewCta
          onSubmit={(review) => {
            const stamped = { ...review, writtenAt: new Date().toISOString() }
            saveProductReview(product.id, stamped)
            setOwnReview(stamped)
          }}
        />
      )}
    </div>
  )
}
