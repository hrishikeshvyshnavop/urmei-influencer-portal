import { BACKDROPS, DEFAULT_BACKDROP_ID } from './data/backdrops'

const BACKDROP_KEY = 'urmei.shop-backdrop'
const PUBLISHED_BACKDROP_KEY = 'urmei.shop-published-backdrop'

/**
 * The banner, its backdrop and featured items, kept twice (`T-38`, flows 01
 * and 02): the saved one My Shop shows, and the published one shoppers see.
 * Save Changes in either dialog only updates the saved one (a draft that
 * turns View Shop into Publish Changes); publishing copies it across.
 */
function load(key: string): string {
  try {
    const stored = window.localStorage.getItem(key)
    return stored && BACKDROPS.some((backdrop) => backdrop.id === stored) ? stored : DEFAULT_BACKDROP_ID
  } catch {
    return DEFAULT_BACKDROP_ID
  }
}

function save(key: string, id: string) {
  try {
    window.localStorage.setItem(key, id)
  } catch {
    // The current session still works when storage is unavailable.
  }
}

export const loadBackdrop = () => load(BACKDROP_KEY)
export const saveBackdrop = (id: string) => save(BACKDROP_KEY, id)
export const loadPublishedBackdrop = () => load(PUBLISHED_BACKDROP_KEY)
export const savePublishedBackdrop = (id: string) => save(PUBLISHED_BACKDROP_KEY, id)

/** One featured banner item: a collection, or a shop item (not a catalogue
 *  product, so it follows the item's own variant). Up to two, in pick order.
 *  A product also keeps its catalogue id, so the card can still show its
 *  name and photo once the item has left the shop (flow 05). */
export type FeaturedRef = { kind: 'collection' | 'product'; id: string; productId?: string }

export const MAX_FEATURED = 2

const FEATURED_KEY = 'urmei.shop-featured'
const PUBLISHED_FEATURED_KEY = 'urmei.shop-published-featured'

function loadRefs(key: string): FeaturedRef[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (ref): ref is FeaturedRef =>
          typeof ref === 'object' && ref !== null &&
          (ref.kind === 'collection' || ref.kind === 'product') && typeof ref.id === 'string' &&
          (ref.productId === undefined || typeof ref.productId === 'string'),
      )
      .slice(0, MAX_FEATURED)
  } catch {
    return []
  }
}

function saveRefs(key: string, refs: FeaturedRef[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(refs))
  } catch {
    // The current session still works when storage is unavailable.
  }
}

export const loadFeatured = () => loadRefs(FEATURED_KEY)
export const saveFeatured = (refs: FeaturedRef[]) => saveRefs(FEATURED_KEY, refs)
export const loadPublishedFeatured = () => loadRefs(PUBLISHED_FEATURED_KEY)
export const savePublishedFeatured = (refs: FeaturedRef[]) => saveRefs(PUBLISHED_FEATURED_KEY, refs)

export const sameFeatured = (a: FeaturedRef[], b: FeaturedRef[]) =>
  a.length === b.length && a.every((ref, index) => ref.kind === b[index].kind && ref.id === b[index].id)
