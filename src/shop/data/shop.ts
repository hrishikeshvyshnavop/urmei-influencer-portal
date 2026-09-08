/**
 * Shop-level configuration for the Publish Shop flow (Figma section `917:55402`).
 */

export const SHOP_URL = 'urmei.com/shop/charlotte'

/** Follower counts shown on the creator profile card (Shop Preview, `917:53526`). */
export const FOLLOWER_STATS = {
  urmei: 445,
  tiktok: '1.5k',
  instagram: 200,
}

/**
 * Per-product affiliate link, in the short-link format frame `04` of the Remove
 * Favorite Product section shows ("urmei.co/s/sam-lee/water-bank-cream") — kept
 * on the Charlotte handle used everywhere else in this app rather than the
 * mock's "sam-lee", and slugified from the product name.
 */
export function affiliateLinkFor(product: { name: string }): string {
  const slug = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `urmei.co/s/charlotte/${slug}`
}

/**
 * Whether this product has an affiliate link yet. The link is minted when the
 * shop goes live with the product in it, so an unpublished shop has none at
 * all and a product added since the last publish has none of its own — the
 * card menu drops "Copy affiliate link" entirely in that state (Figma
 * `1610:44155` draws the menu with three items, no link).
 *
 * Items persisted before `addedAt` existed count as published: they were in
 * the shop before the field, so any publish since then included them.
 */
export function hasLiveLink(
  item: { addedAt: number | null },
  publishedAt: number | null,
): boolean {
  if (publishedAt === null) return false
  return item.addedAt === null || item.addedAt <= publishedAt
}

/** Matches the timestamp format in frame 03: "24 Aug 2026, 9:30 AM". */
/**
 * "24 Aug 2026" — the date half of every timestamp the shop prints. `month:
 * 'short'` alone renders September as "Sept" in current ICU, which is four
 * letters where every frame shows three, so it's trimmed.
 */
export function formatShopDate(date: Date): string {
  const month = date.toLocaleString('en-GB', { month: 'short' }).slice(0, 3)
  return `${date.getDate()} ${month} ${date.getFullYear()}`
}

export function formatPublishedAt(date: Date): string {
  const time = date
    .toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(/\u202f/g, ' ')
  return `${formatShopDate(date)}, ${time}`
}
