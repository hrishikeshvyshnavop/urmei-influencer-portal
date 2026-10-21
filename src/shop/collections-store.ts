import { SHOP_URL } from './data/shop'
import type { ShopItem } from './types'

const COLLECTIONS_KEY = 'urmei.shop-collections'

/** The design's limits (Collections Q5): name required, up to 40 characters;
 *  description optional, up to 100. */
export const COLLECTION_NAME_MAX = 40
export const COLLECTION_DESCRIPTION_MAX = 100

/**
 * A named group of shop items (`T-31` / `T-41`). The array order *is* the
 * storefront order the creator sets with the card arrows (Collections Q7), so
 * index 0 shows as "#1 on storefront". A product can sit in any number of
 * collections (Q3), and deleting a collection never removes products (Q8).
 */
export type Collection = {
  id: string
  name: string
  description: string
  /** Shop item ids, in the order their images fill the board cover. */
  itemIds: string[]
  createdAt: number
}

/**
 * Every shop starts with one renamable "Favourites" collection (Q4). It is
 * seeded from whatever the old Favorites tab held, so a creator who already
 * marked favourites sees them in it.
 */
function seedCollections(items: ShopItem[]): Collection[] {
  return [
    {
      id: 'favourites',
      name: 'Favourites',
      description: '',
      itemIds: items.filter((item) => item.favorite).map((item) => item.id),
      createdAt: Date.now(),
    },
  ]
}

export function loadCollections(items: ShopItem[]): Collection[] {
  try {
    const raw = window.localStorage.getItem(COLLECTIONS_KEY)
    if (!raw) return seedCollections(items)
    const parsed = JSON.parse(raw) as Collection[]
    // Drop ids for items that have since left the shop, so a board never
    // counts or draws a product that is gone.
    const known = new Set(items.map((item) => item.id))
    return parsed.map((collection) => ({
      ...collection,
      itemIds: collection.itemIds.filter((id) => known.has(id)),
    }))
  } catch {
    return seedCollections(items)
  }
}

export function saveCollections(collections: Collection[]) {
  try {
    window.localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections))
  } catch {
    // Storage full or blocked: the in-memory list still works for this visit.
  }
}

/** A new collection starts at #1 on the storefront (Q7). */
export function createCollection(
  collections: Collection[],
  name: string,
  description: string,
): Collection[] {
  const created: Collection = {
    id: `collection-${Date.now()}`,
    name: name.trim(),
    description: description.trim(),
    itemIds: [],
    createdAt: Date.now(),
  }
  return [created, ...collections]
}

/** Edit details: only the name and description change; position and
 *  products stay put. */
export function updateCollection(
  collections: Collection[],
  id: string,
  name: string,
  description: string,
): Collection[] {
  return collections.map((collection) =>
    collection.id === id
      ? { ...collection, name: name.trim(), description: description.trim() }
      : collection,
  )
}

/** Removes the grouping only; its products stay in the shop (Q8). */
export function deleteCollection(collections: Collection[], id: string): Collection[] {
  return collections.filter((collection) => collection.id !== id)
}

/** Puts an item in exactly the given collections: added to the end of the
 *  ones it joins, dropped from the ones it leaves (Add to collection). */
export function setItemCollections(
  collections: Collection[],
  itemId: string,
  collectionIds: string[],
): Collection[] {
  return collections.map((collection) => {
    const wanted = collectionIds.includes(collection.id)
    const has = collection.itemIds.includes(itemId)
    if (wanted === has) return collection
    return {
      ...collection,
      itemIds: wanted
        ? [...collection.itemIds, itemId]
        : collection.itemIds.filter((id) => id !== itemId),
    }
  })
}

/** "Earlier" moves a board towards #1, "later" towards the end. */
export function moveCollection(
  collections: Collection[],
  id: string,
  direction: 'earlier' | 'later',
): Collection[] {
  const from = collections.findIndex((collection) => collection.id === id)
  const to = direction === 'earlier' ? from - 1 : from + 1
  if (from < 0 || to < 0 || to >= collections.length) return collections
  const next = [...collections]
  ;[next[from], next[to]] = [next[to], next[from]]
  return next
}

/** The toast line after saving an item's collections (Figma `1862:86682`). */
export function collectionsSavedMessage(added: Collection[]): string {
  if (added.length === 1) return `Added to ${added[0].name}`
  if (added.length > 1) return `Added to ${added.length} collections`
  return 'Collections updated'
}

/** The collections an item is in, in board order, for the product page's
 *  "In collections" chips (Figma `1862:85653`). */
export function collectionsFor(
  itemId: string,
  collections: Collection[],
): { id: string; name: string }[] {
  return collections
    .filter((c) => c.itemIds.includes(itemId))
    .map((c) => ({ id: c.id, name: c.name }))
}

/** Takes an item out of one collection, returning where it sat so Undo can
 *  put it back in the same place (flow 18, Figma `1862:81645`). */
export function removeItemFromCollection(
  collections: Collection[],
  collectionId: string,
  itemId: string,
): { next: Collection[]; index: number } {
  const index = collections.find((c) => c.id === collectionId)?.itemIds.indexOf(itemId) ?? -1
  const next = collections.map((c) =>
    c.id === collectionId ? { ...c, itemIds: c.itemIds.filter((id) => id !== itemId) } : c,
  )
  return { next, index }
}

/** Undo for `removeItemFromCollection`. */
export function restoreItemInCollection(
  collections: Collection[],
  collectionId: string,
  itemId: string,
  index: number,
): Collection[] {
  return collections.map((c) => {
    if (c.id !== collectionId || c.itemIds.includes(itemId)) return c
    const itemIds = [...c.itemIds]
    itemIds.splice(index < 0 ? itemIds.length : index, 0, itemId)
    return { ...c, itemIds }
  })
}

/** A collection's shareable link. It uses the fixed id, not the name, so a
 *  link shared before a rename still works (Figma `1862:82119`). */
export function collectionLinkFor(collection: Collection): string {
  return `${SHOP_URL}/collections/${collection.id}`
}

/** The toast after Add to shop (Figma `1913:36467`): with nothing ticked the
 *  product only joins All Picks, as before. */
export function addedToShopMessage(added: Collection[]): string {
  if (added.length === 1) return `Added to your shop and to ${added[0].name}`
  if (added.length > 1) return `Added to your shop and to ${added.length} collections`
  return 'Product added to your shop'
}
