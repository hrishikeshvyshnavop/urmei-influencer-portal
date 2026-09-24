import { parseCurrency, parsePercent } from './catalogue'
import type { Product, ShopItem } from '../types'

/**
 * The shop's performance figures.
 *
 * Mock, but deterministic: every number is derived from the product id, so a
 * product reads the same on My Shop's stats row, on a stat breakdown page and
 * on its own product-stats page instead of three unrelated sets of digits.
 * The Figma frames each carry their own mock totals (200/150/S$110 on
 * `1619:39241`, 354 on `1619:39559`, 50/10/S$100 on `1603:40560`), so no fixed
 * set of numbers would match all of them; these are generated instead.
 */

/** The five figures the stats row shows, in the order the design draws them. */
export const STAT_METRICS = [
  'clicks',
  'sales',
  'commissionPending',
  'commissionOwned',
  'commissionSettled',
] as const

export type StatMetric = (typeof STAT_METRICS)[number]

type MetricSpec = {
  /** Hash segment for the breakdown page, e.g. `/shop/stats/commission-pending`. */
  slug: string
  /** Uppercase label on the stats row, and the hero label on the breakdown. */
  label: string
  /** Breadcrumb tail and page title case, e.g. "Commission pending". */
  crumb: string
  /** Formats a total for the row and the hero card. */
  format: (value: number) => string
  /** Trailing word on a product row, e.g. "30 Clicks". */
  rowUnit: string
  /**
   * Row copy when a product has nothing to report. The frames word this
   * differently per metric: "No dues" for pending (`1619:39786`), "Nothing to
   * show" for owned (`1619:40237`), "All settled" for settled (`1619:40455`).
   */
  rowEmpty: string
  /**
   * Only clicks and sales carry the period selector and the "vs. previous
   * 7 days" delta; the commission frames draw neither.
   */
  trend: boolean
  /** Hero value suffix — total sales reads "320 UNITS" (`1619:40010`). */
  heroSuffix?: string
}

const currency = (value: number) => `S$${value}`

export const STAT_SPECS: Record<StatMetric, MetricSpec> = {
  clicks: {
    slug: 'clicks',
    label: 'TOTAL CLICKS',
    crumb: 'Clicks',
    format: String,
    rowUnit: 'Clicks',
    rowEmpty: 'No clicks yet',
    trend: true,
  },
  sales: {
    slug: 'sales',
    label: 'TOTAL SALES',
    crumb: 'Sales',
    format: String,
    rowUnit: 'Units sold',
    rowEmpty: 'No sales yet',
    trend: true,
    heroSuffix: 'UNITS',
  },
  commissionPending: {
    slug: 'commission-pending',
    label: 'COMMISSION PENDING',
    crumb: 'Commission pending',
    format: currency,
    rowUnit: 'Commission pending',
    rowEmpty: 'No dues',
    trend: false,
  },
  commissionOwned: {
    slug: 'commission-owned',
    // The design labels this "COMMISSION OWNED" on both the row and the
    // product tile, though the frame itself is named `commission-earned`.
    label: 'COMMISSION OWNED',
    crumb: 'Commission owned',
    format: currency,
    rowUnit: 'Commission owned',
    rowEmpty: 'Nothing to show',
    trend: false,
  },
  commissionSettled: {
    slug: 'commission-settled',
    label: 'COMMISSION SETTLED',
    crumb: 'Commission settled',
    format: currency,
    rowUnit: 'Commission settled',
    rowEmpty: 'All settled',
    trend: false,
  },
}

export type ProductStats = {
  clicks: number
  sales: number
  commissionPending: number
  commissionOwned: number
  commissionSettled: number
  /** Percentage of clicks that converted, shown on the Performance tab. */
  conversionRate: number
  /** The product's own commission rate, shown as "Commission Per Sale". */
  commissionPerSale: number
}

/** Stable pseudo-random in [0, 1) from a product id. */
function seed(id: string) {
  let hash = 0
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) % 100000
  }
  return (hash % 997) / 997
}

export function statsForProduct(product: Product): ProductStats {
  const base = seed(product.id)
  const clicks = Math.round(10 + base * 90)
  const sales = Math.round(clicks * (0.05 + base * 0.15))
  const commissionPerSale = parsePercent(product.commissionPerSale)
  const earned = Math.round(
    sales * parseCurrency(product.price) * (commissionPerSale / 100),
  )
  const settled = Math.round(earned * (0.4 + base * 0.4))
  const pending = earned - settled
  return {
    clicks,
    sales,
    commissionPending: pending,
    // "Owned" is the full commission the sales earned, of which some part is
    // settled and the rest still pending.
    commissionOwned: earned,
    commissionSettled: settled,
    conversionRate: clicks === 0 ? 0 : Math.round((sales / clicks) * 1000) / 10,
    commissionPerSale,
  }
}

/** The row totals: every metric summed across the shop's products. */
export function shopTotals(items: ShopItem[]): Record<StatMetric, number> {
  return items.reduce(
    (totals, item) => {
      const stats = statsForProduct(item.product)
      for (const metric of STAT_METRICS) totals[metric] += stats[metric]
      return totals
    },
    { clicks: 0, sales: 0, commissionPending: 0, commissionOwned: 0, commissionSettled: 0 },
  )
}

/**
 * Change against the previous period, as the frames show it: +4% on clicks
 * (`1619:39559`), -4% on sales (`1619:40010`). Derived from the total so it
 * stays put across renders rather than flickering a new number each time.
 */
export function trendFor(metric: StatMetric, total: number) {
  const magnitude = total === 0 ? 0 : ((total * 7) % 12) + 1
  const up = metric === 'clicks'
  return { up, percent: Math.round(magnitude) }
}


/**
 * Where the user entered the stats pages from. Both Home and My Shop carry a
 * stats row into the same breakdown screens, so the breadcrumb has to lead back
 * the way the user actually came rather than always to one of them. It travels
 * in the hash (`?from=`) so a reload or a shared link keeps the trail.
 */
export type StatsOrigin = 'home' | 'shop'

export const ORIGIN_CRUMBS: Record<StatsOrigin, { label: string; hash: string }> = {
  home: { label: 'Home', hash: '/home' },
  // The nav item and the shop's own product-detail crumb both say "My Shop".
  shop: { label: 'My Shop', hash: '/shop' },
}

/** A deep link with no origin reads as the shop's, which is where these live. */
export function parseStatsOrigin(value: string | null): StatsOrigin {
  return value === 'home' ? 'home' : 'shop'
}

/** `/shop/stats/clicks?from=home` — one metric's breakdown. */
export function statsBreakdownHash(metric: StatMetric, origin: StatsOrigin) {
  return `/shop/stats/${STAT_SPECS[metric].slug}?from=${origin}`
}

/**
 * `/shop/stats/product/a2?from=home&via=clicks` — one product's stats. `via`
 * is the breakdown the user came through, and is absent when they arrived
 * straight from a product's performance card.
 */
export function productStatsHash(itemId: string, origin: StatsOrigin, via?: StatMetric) {
  const trail = `from=${origin}${via ? `&via=${STAT_SPECS[via].slug}` : ''}`
  return `/shop/stats/product/${encodeURIComponent(itemId)}?${trail}`
}

function entryFor(
  metric: StatMetric,
  totals: Record<StatMetric, number>,
  origin: StatsOrigin,
) {
  return {
    label: STAT_SPECS[metric].label,
    value: STAT_SPECS[metric].format(totals[metric]),
    href: statsBreakdownHash(metric, origin),
  }
}

/** My Shop's row: all five metrics (Figma `1619:39241`). */
export function statsRowEntries(items: ShopItem[]) {
  const totals = shopTotals(items)
  return STAT_METRICS.map((metric) => entryFor(metric, totals, 'shop'))
}

/**
 * Home's row is a different five (Figma `1584:90876`): it opens on the product
 * count and drops commission pending, where My Shop — the page you manage the
 * products on — carries pending and no count. Total products has no breakdown
 * page of its own, so its chevron goes to the shop.
 */
export function homeStatsRowEntries(items: ShopItem[]) {
  const totals = shopTotals(items)
  return [
    { label: 'TOTAL PRODUCTS', value: String(items.length), href: '/shop' },
    entryFor('clicks', totals, 'home'),
    entryFor('sales', totals, 'home'),
    entryFor('commissionOwned', totals, 'home'),
    entryFor('commissionSettled', totals, 'home'),
  ]
}

/** Resolves a hash segment back to a metric, or null for an unknown one. */
export function metricFromSlug(slug: string): StatMetric | null {
  return STAT_METRICS.find((metric) => STAT_SPECS[metric].slug === slug) ?? null
}
