import type { ShopItem } from '../types'
import { PRODUCTS } from './catalogue'

export type CreatorReview = {
  item: ShopItem
  text: string
  /** Photos the creator attached — up to three thumbnails in the card. */
  photos: string[]
  /** ISO date the review was written, shown in Review Details. */
  writtenOn: string
}

export const SERUM_PHOTOS = ['/urmei/reviews/serum-1.png', '/urmei/reviews/serum-2.png', '/urmei/reviews/serum-3.png']
const EYE_CREAM_PHOTOS = [
  '/urmei/reviews/eye-cream-1.png',
  '/urmei/reviews/eye-cream-2.png',
  '/urmei/reviews/eye-cream-3.png',
]

/** The design's two reviews (Figma `957:29053` / `957:29073`). */
const BY_KIND: { text: string; photos: string[] }[] = [
  {
    text: 'Finally an eye cream that actually works. The rose formula feels luxurious and my dark circles have faded noticeably.',
    photos: EYE_CREAM_PHOTOS,
  },
  {
    text: 'This serum transformed my morning routine. It absorbs instantly and leaves my skin feeling plump and dewy all day. After three weeks, my fine lines are visibly reduced and my skin tone looks so much more even — I have already repurchased twice.',
    photos: SERUM_PHOTOS,
  },
]

/**
 * Ten placeholder reviews, handed out by position so the carousel shows ten
 * different ones. Lengths vary on purpose: the card clamps at three lines and
 * the longer ones are what the Review Details modal (Figma `915:28947`) is for.
 */
const REVIEWS: { text: string; photos: string[] }[] = [
  BY_KIND[1],
  BY_KIND[0],
  {
    text: 'A staple on my shelf. Lightweight, layers well under makeup and my skin has never felt calmer. I reach for it every single day.',
    photos: SERUM_PHOTOS,
  },
  {
    text: "This night cream has a soothing texture and a calming scent, perfect for bedtime. While I enjoyed it, I found it could be a bit heavy for my combination skin. That said, my drier patches absolutely loved it — the overnight hydration is real. I woke up with noticeably softer skin around my forehead and cheeks. If you have dry to normal skin, this is a must-try. For combination skin like mine, I'd recommend using it every other night and pairing it with a lighter moisturizer on alternate days.",
    photos: EYE_CREAM_PHOTOS,
  },
  {
    text: 'Gentle enough for my sensitive skin and it does exactly what it promises. No breakouts, no irritation — just happy skin.',
    photos: [],
  },
  {
    text: 'I was sceptical at first, but a month in my skin feels softer and looks brighter. The texture is lovely and a little goes a long way, so one bottle has lasted me far longer than I expected. It sits nicely under sunscreen without pilling, which is rare for anything this hydrating.',
    photos: SERUM_PHOTOS,
  },
  {
    text: 'My go-to on travel days. Two drops and the tightness from the flight is gone.',
    photos: [],
  },
  {
    text: "I've tried a lot of cleansers and this is the one I keep coming back to. It foams just enough to feel like it's working, rinses clean without that squeaky, stripped feeling, and never stings around my eyes. My skin barrier has been noticeably happier since I switched — fewer red patches, less flaking in winter, and makeup goes on smoother the next morning. Worth every cent.",
    photos: EYE_CREAM_PHOTOS,
  },
  {
    text: 'The glow is real. Friends keep asking what I changed in my routine — this is it.',
    photos: SERUM_PHOTOS,
  },
  {
    text: 'Took about two weeks to see a difference, but the dark spots from last summer have faded a lot. The scent is subtle and it absorbs quickly, so it fits into a busy morning. I now use it every day and pair it with a gentle moisturiser at night; my skin tone looks more even than it has in years.',
    photos: [],
  },
]

/** The storefront always shows at least this many reviews, topping the shop's
 *  own products up from the catalogue when it holds fewer. */
export const REVIEW_COUNT = 10

/** A review's date, a fortnight apart and newest first, so the modal's
 *  "March 15, 2026" line reads like a real history. */
function writtenOn(index: number) {
  const date = new Date(Date.UTC(2026, 2, 15))
  date.setUTCDate(date.getUTCDate() - index * 14)
  return date.toISOString().slice(0, 10)
}

/**
 * The creator's product reviews on the storefront (Figma `957:29042`). There
 * is no review-writing flow yet, so these are placeholders: one per product
 * in the shop (even when a product was added for several variants), topped up
 * with catalogue products until there are ten, each with its own text. An
 * empty shop has no reviews.
 */
export function reviewsForShop(items: ShopItem[]): CreatorReview[] {
  if (items.length === 0) return []
  const seen = new Set<string>()
  const reviewed: ShopItem[] = items.filter((item) => {
    if (seen.has(item.product.id)) return false
    seen.add(item.product.id)
    return true
  })
  for (const product of PRODUCTS) {
    if (reviewed.length >= REVIEW_COUNT) break
    if (seen.has(product.id)) continue
    seen.add(product.id)
    reviewed.push({ id: `review-${product.id}`, product, favorite: false, addedAt: null, variant: product.variant })
  }
  return reviewed.map((item, index) => ({
    item,
    ...REVIEWS[index % REVIEWS.length],
    writtenOn: writtenOn(index),
  }))
}
