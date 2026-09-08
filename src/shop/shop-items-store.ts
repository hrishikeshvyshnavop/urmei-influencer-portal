import { PRODUCTS } from './data/catalogue'
import type { ShopItem } from './types'

const ITEMS_KEY = 'urmei.shop-items'
const PUBLISHED_AT_KEY = 'urmei.shop-published-at'
const UNPUBLISHED_CHANGES_KEY = 'urmei.shop-has-unpublished-changes'
const PUBLISH_BLOCKED_KEY = 'urmei.shop-publish-blocked'

type PersistedShopItem = { id: string; productId: string; favorite: boolean; variant: string; addedAt: number | null }

/**
 * `src/App.tsx` fully remounts the shop screen on every hash change (`Fragment
 * key={hash}`), which would otherwise wipe `shop/App.tsx`'s in-memory item
 * list whenever the user navigates to Home and back. Persisting here keeps
 * added products, publish state, and unpublished-changes across that
 * remount. Only the product id + favorite flag + chosen variant are stored;
 * the product itself is always looked up fresh from the catalogue, so a
 * persisted entry for a product that no longer exists is dropped instead of
 * crashing.
 */
export function loadShopItems(): ShopItem[] {
  try {
    const raw = window.localStorage.getItem(ITEMS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as PersistedShopItem[]
    return parsed
      .map((entry) => {
        const product = PRODUCTS.find((item) => item.id === entry.productId)
        // `variant` predates this field — fall back to the product's default
        // so shop items persisted before it shipped still load correctly.
        return product
          ? {
              id: entry.id,
              product,
              // `favorite` was `featured` before the rename, and `addedAt`
              // postdates both — read the old shapes rather than silently
              // un-favoriting every product already in a saved shop.
              favorite:
                entry.favorite ??
                (entry as unknown as { featured?: boolean }).featured ??
                false,
              variant: entry.variant ?? product.variant,
              addedAt: entry.addedAt ?? null,
            }
          : null
      })
      .filter((item): item is ShopItem => item !== null)
  } catch {
    return []
  }
}

export function saveShopItems(items: ShopItem[]) {
  try {
    const persisted: PersistedShopItem[] = items.map((item) => ({
      id: item.id,
      productId: item.product.id,
      favorite: item.favorite,
      variant: item.variant,
      addedAt: item.addedAt,
    }))
    window.localStorage.setItem(ITEMS_KEY, JSON.stringify(persisted))
  } catch {
    // The current session still works when storage is unavailable.
  }
}

/**
 * When the shop was last published, as epoch milliseconds. It used to be the
 * formatted string the Store Card prints; it became a timestamp so per-product
 * affiliate links can be compared against it (`hasLiveLink`), and the display
 * string is now formatted at the point it is shown.
 *
 * A stored value from before that change is not a number. Rather than losing
 * the publish state, such a shop is treated as having published everything it
 * held at the moment it is first read — and the healed value is written back
 * immediately, because this is read fresh on the portal-routed stats pages too
 * and a `Date.now()` recomputed on every call would keep counting products
 * added later as live.
 */
export function loadPublishedAt(): number | null {
  try {
    const raw = window.localStorage.getItem(PUBLISHED_AT_KEY)
    if (raw === null) return null
    const stored = Number(raw)
    if (Number.isFinite(stored)) return stored
    const healed = Date.now()
    savePublishedAt(healed)
    return healed
  } catch {
    return null
  }
}

export function savePublishedAt(value: number | null) {
  try {
    if (value === null) window.localStorage.removeItem(PUBLISHED_AT_KEY)
    else window.localStorage.setItem(PUBLISHED_AT_KEY, String(value))
  } catch {
    // The current session still works when storage is unavailable.
  }
}

export function loadHasUnpublishedChanges(): boolean {
  try {
    return window.localStorage.getItem(UNPUBLISHED_CHANGES_KEY) === '1'
  } catch {
    return false
  }
}

export function saveHasUnpublishedChanges(value: boolean) {
  try {
    if (value) window.localStorage.setItem(UNPUBLISHED_CHANGES_KEY, '1')
    else window.localStorage.removeItem(UNPUBLISHED_CHANGES_KEY)
  } catch {
    // The current session still works when storage is unavailable.
  }
}

/** Set when a publish was attempted with zero products — the shop never
 *  actually goes live, but the page reflects the attempt (disabled Shop URL,
 *  working Preview) until either a product is added or publish succeeds. */
export function loadPublishBlocked(): boolean {
  try {
    return window.localStorage.getItem(PUBLISH_BLOCKED_KEY) === '1'
  } catch {
    return false
  }
}

export function savePublishBlocked(value: boolean) {
  try {
    if (value) window.localStorage.setItem(PUBLISH_BLOCKED_KEY, '1')
    else window.localStorage.removeItem(PUBLISH_BLOCKED_KEY)
  } catch {
    // The current session still works when storage is unavailable.
  }
}
