import type { Product, ShopItem } from '../types'

export type CreatorReview = {
  item: ShopItem
  text: string
  /** Photos the creator attached — up to three thumbnails in the card. */
  photos: string[]
}

const SERUM_PHOTOS = ['/urmei/reviews/serum-1.png', '/urmei/reviews/serum-2.png', '/urmei/reviews/serum-3.png']
const EYE_CREAM_PHOTOS = [
  '/urmei/reviews/eye-cream-1.png',
  '/urmei/reviews/eye-cream-2.png',
  '/urmei/reviews/eye-cream-3.png',
]

/** The design's two reviews (Figma `957:29053` / `957:29073`), kept for the
 *  product kinds they were written about. */
const BY_KIND: { match: RegExp; text: string; photos: string[] }[] = [
  {
    match: /eye cream/i,
    text: 'Finally an eye cream that actually works. The rose formula feels luxurious and my dark circles have faded noticeably.',
    photos: EYE_CREAM_PHOTOS,
  },
  {
    match: /serum|ampoule|essence/i,
    text: 'This serum transformed my morning routine. It absorbs instantly and leaves my skin feeling plump and dewy all day. After three weeks, my fine lines are visibly reduced and my skin tone looks so much more even — I have already repurchased twice.',
    photos: SERUM_PHOTOS,
  },
]

const GENERIC: { text: string; photos: string[] }[] = [
  {
    text: 'A staple on my shelf. Lightweight, layers well under makeup and my skin has never felt calmer. I reach for it every single day.',
    photos: SERUM_PHOTOS,
  },
  {
    text: 'I was sceptical at first, but a month in my skin feels softer and looks brighter. The texture is lovely and a little goes a long way.',
    photos: EYE_CREAM_PHOTOS,
  },
  {
    text: 'Gentle enough for my sensitive skin and it does exactly what it promises. No breakouts, no irritation — just happy skin.',
    photos: [],
  },
]

function seed(id: string) {
  let hash = 0
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) % 100000
  }
  return hash
}

function reviewFor(product: Product): Omit<CreatorReview, 'item'> {
  const kind = BY_KIND.find((entry) => entry.match.test(product.name))
  if (kind) return { text: kind.text, photos: kind.photos }
  const generic = GENERIC[seed(product.id) % GENERIC.length]
  return { text: generic.text, photos: generic.photos }
}

/**
 * The creator's product reviews on the storefront (Figma `957:29042`). There
 * is no review-writing flow yet, so every product in the shop carries a
 * placeholder review derived deterministically from the product — the same
 * product reads the same everywhere. One review per product, even when the
 * product was added more than once for different variants.
 */
export function reviewsForShop(items: ShopItem[]): CreatorReview[] {
  const seen = new Set<string>()
  return items.flatMap((item) => {
    if (seen.has(item.product.id)) return []
    seen.add(item.product.id)
    return [{ item, ...reviewFor(item.product) }]
  })
}
