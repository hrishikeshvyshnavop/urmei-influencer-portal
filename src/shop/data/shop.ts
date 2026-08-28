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
 * Featured Product section shows ("urmei.co/s/sam-lee/water-bank-cream") — kept
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

/** Matches the timestamp format in frame 03: "24 Aug 2026, 9:30 AM". */
export function formatPublishedAt(date: Date): string {
  const day = date.getDate()
  const month = date.toLocaleString('en-GB', { month: 'short' })
  const year = date.getFullYear()
  const time = date
    .toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(/\u202f/g, ' ')
  return `${day} ${month} ${year}, ${time}`
}
