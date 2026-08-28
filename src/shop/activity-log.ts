import { Megaphone, PackageMinus, PackagePlus, Star, StarOff, type LucideIcon } from 'lucide-react'

export type ShopActivityType =
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
  at: number
}

export const ACTIVITY_LABELS: Record<ShopActivityType, string> = {
  'product-added': 'Product added to shop',
  'product-removed': 'Product removed from shop',
  'product-featured': 'Product added to featured',
  'product-unfeatured': 'Product removed from featured',
  'shop-published': 'Shop published',
}

export const ACTIVITY_ICONS: Record<ShopActivityType, LucideIcon> = {
  'product-added': PackagePlus,
  'product-removed': PackageMinus,
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
export function logShopActivity(type: ShopActivityType, detail = '') {
  try {
    const activity: ShopActivity = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, type, detail, at: Date.now() }
    const next = [activity, ...loadShopActivities()].slice(0, MAX_ACTIVITIES)
    window.localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(next))
  } catch {
    // The current session still works when storage is unavailable.
  }
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
