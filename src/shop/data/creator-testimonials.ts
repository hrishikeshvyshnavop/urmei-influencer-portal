import type { SampleReview } from '../../portal/sample-requests'
import type { Product } from '../types'
import { SERUM_PHOTOS } from './reviews'

/** One other creator's word on a product — the PDP's "What Creators Say"
 *  carousel (Figma `1030:25483`). */
export type CreatorTestimonial = {
  author: string
  avatar: string
  /** "MARCH 2026" — the month the review was written, as the design prints it. */
  month: string
  text: string
  /** Photos attached to the review, shown as up to three 48px thumbnails
   *  under the quote (Figma `1030:29096`); most quotes have none. */
  photos?: string[]
}

/** Placeholder portraits (randomuser.me), one per creator so no two quotes
 *  share a face. The design's own avatar is Charlotte, the signed-in creator,
 *  so it can't stand in for anyone else. */
const avatar = (n: number) => `/urmei/pdp/creators/creator-${n}.jpg`

/**
 * There is no reviews backend, so these stand in for what other creators have
 * said. The design's own quote leads; each product gets the same set in a
 * rotation seeded from its id, so a product reads the same on every visit.
 */
const TESTIMONIALS: CreatorTestimonial[] = [
  {
    author: 'Elizabeth',
    avatar: avatar(1),
    month: 'March 2026',
    text: "This serum genuinely transformed my skincare routine — lightweight, fast-absorbing, and gentle enough for daily use. It's one of the few products in my shop I've personally repurchased.",
    photos: SERUM_PHOTOS,
  },
  {
    author: 'Mei Lin',
    avatar: avatar(2),
    month: 'February 2026',
    text: 'My followers ask about this one more than anything else I link. The texture is lovely, it layers well under makeup, and my skin feels calmer after a couple of weeks.',
  },
  {
    author: 'Priya',
    avatar: avatar(3),
    month: 'January 2026',
    text: 'Gentle enough for my sensitive skin and it does exactly what it promises. No breakouts, no irritation — an easy one to recommend.',
  },
  {
    author: 'Sofia',
    avatar: avatar(4),
    month: 'December 2025',
    text: "I was sceptical at first, but a month in my skin looks brighter and feels softer. A little goes a long way, which my audience appreciates.",
  },
]

function seed(id: string) {
  let hash = 0
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) % 100000
  }
  return hash
}

export function testimonialsFor(product: Product): CreatorTestimonial[] {
  // The design's quote always opens; the rest rotate per product.
  const [lead, ...rest] = TESTIMONIALS
  const offset = seed(product.id) % rest.length
  return [lead!, ...rest.slice(offset), ...rest.slice(0, offset)]
}

/* ── The creator's own review of a product ───────────────────────────── */

export const PRODUCT_REVIEWS_KEY = 'urmei.product-reviews'

/**
 * Reviews the creator is treated as having already written — the three the
 * Your Reviews frame shows (Figma `1030:30341`), on real catalogue products so
 * each row opens a product page. Anything saved in storage for the same
 * product replaces its seed.
 */
const SEEDED_PRODUCT_REVIEWS: Record<string, SampleReview> = {
  'laneige-water-bank': {
    rating: 8,
    text: 'Incredibly hydrating without feeling sticky or heavy. My skin looks noticeably dewier after just a week of use. The only downside is the pump dispenses a bit too much product each time.',
    photos: [],
    writtenAt: '2026-03-18T10:00:00.000Z',
  },
  'laneige-water-bank-lotion': {
    rating: 10,
    text: "Hands down the best moisturizer I've tried this year. It layers beautifully under sunscreen and makeup, and my dry patches have completely disappeared since I started using it.",
    photos: [],
    writtenAt: '2026-03-09T10:00:00.000Z',
  },
  'etudehouse-soonjung': {
    rating: 9,
    text: "I've recommended this to everyone in my family. The formula absorbs in seconds, keeps skin soft all day, and the subtle botanical scent is a lovely touch without being overpowering.",
    photos: [],
    writtenAt: '2026-02-24T10:00:00.000Z',
  },
}

function readProductReviews(): Record<string, SampleReview> {
  try {
    const stored = JSON.parse(window.localStorage.getItem(PRODUCT_REVIEWS_KEY) ?? '{}')
    return { ...SEEDED_PRODUCT_REVIEWS, ...(stored && typeof stored === 'object' ? stored : {}) }
  } catch {
    return { ...SEEDED_PRODUCT_REVIEWS }
  }
}

/** Every product review this creator has written, keyed by product id. */
export function allProductReviews(): Record<string, SampleReview> {
  return readProductReviews()
}

/** The review this creator wrote from a PDP's "Write a Review" prompt, if any. */
export function productReviewFor(productId: string): SampleReview | undefined {
  return readProductReviews()[productId]
}

/** Same storage caveat as sample reviews: photos are data URLs, so a full
 *  quota drops the write and the review only lasts the session. */
export function saveProductReview(productId: string, review: SampleReview) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(PRODUCT_REVIEWS_KEY) ?? '{}')
    const reviews = stored && typeof stored === 'object' ? stored : {}
    reviews[productId] = { ...review, writtenAt: review.writtenAt ?? new Date().toISOString() }
    window.localStorage.setItem(PRODUCT_REVIEWS_KEY, JSON.stringify(reviews))
  } catch {
    // The page still reflects the review this session.
  }
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** "March 2026" from an ISO timestamp; the current month when there is none. */
export function reviewMonth(writtenAt: string | undefined) {
  const date = writtenAt ? new Date(writtenAt) : new Date()
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}
