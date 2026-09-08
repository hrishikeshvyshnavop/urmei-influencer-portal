import { Box, Check, DollarSign, Megaphone, ShoppingBag, Star, StarOff, X, type LucideIcon } from 'lucide-react'

/**
 * These ids are written into `localStorage` by `logShopActivity`, so the two
 * favorite ones keep their old "featured" spelling: renaming them would leave
 * every already-logged entry unlabelled. Only the copy below changed when the
 * feature was renamed to Favorites.
 */
export type ShopActivityType =
  | 'sale'
  | 'commission-confirmed'
  | 'commission-settled'
  | 'product-added'
  | 'product-removed'
  | 'product-featured'
  | 'product-unfeatured'
  | 'shop-published'

export type ShopActivity = {
  id: string
  type: ShopActivityType
  /** The product name, empty for activity types that aren't product-specific. */
  detail: string
  /** Earnings only: the sum the row prints after its label, e.g. `S$1.50`. */
  amount?: number
  at: number
}

/**
 * Wording and glyphs come from the design's Activity Item set (Figma
 * `1584:96889`), which spells favourite the British way even though the
 * feature is Favorites everywhere else in the product. `product-unfeatured`
 * and `shop-published` aren't drawn there but real actions log them, so they
 * stay and borrow the same voice.
 */
export const ACTIVITY_LABELS: Record<ShopActivityType, string> = {
  sale: 'Sale happened!',
  'commission-confirmed': 'Commission confirmed:',
  'commission-settled': 'Commission settled:',
  'product-added': 'Added to shop',
  'product-removed': 'Removed from shop',
  'product-featured': 'Added a product as favourite',
  'product-unfeatured': 'Removed a product from favourite',
  'shop-published': 'Shop published',
}

export const ACTIVITY_ICONS: Record<ShopActivityType, LucideIcon> = {
  sale: ShoppingBag,
  'commission-confirmed': Check,
  'commission-settled': DollarSign,
  'product-added': Box,
  'product-removed': X,
  'product-featured': Star,
  'product-unfeatured': StarOff,
  'shop-published': Megaphone,
}

const ACTIVITY_LOG_KEY = 'urmei.shop-activity-log'
const MAX_ACTIVITIES = 30

export function loadShopActivities(): ShopActivity[] {
  try {
    const raw = window.localStorage.getItem(ACTIVITY_LOG_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ShopActivity[]
  } catch {
    return []
  }
}

/** Called wherever a real shop action happens (add/remove/feature/publish) so
 *  Home's Recent Activities and the full Recent Activities page reflect what
 *  the creator actually did instead of fixture data. */
export function logShopActivity(type: ShopActivityType, detail = '', amount?: number) {
  try {
    const activity: ShopActivity = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, type, detail, at: Date.now() }
    if (amount !== undefined) activity.amount = amount
    const next = [activity, ...loadShopActivities()].slice(0, MAX_ACTIVITIES)
    window.localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(next))
  } catch {
    // The current session still works when storage is unavailable.
  }
}

/** The bold sum on an earnings row, in the portal's `S$1.50` style. */
export function formatActivityAmount(amount: number): string {
  return `S$${amount.toFixed(2)}`
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** Matches the "Today, 4:15 PM" / "Yesterday, 5:55 PM" style already used
 *  across the portal, falling back to a full date once older than that. */
export function formatActivityTime(at: number): string {
  const date = new Date(at)
  const now = new Date()
  const time = date
    .toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(/ /g, ' ')

  if (isSameDay(date, now)) return `Today, ${time}`

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (isSameDay(date, yesterday)) return `Yesterday, ${time}`

  const day = date.getDate()
  const month = date.toLocaleString('en-GB', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}, ${time}`
}
