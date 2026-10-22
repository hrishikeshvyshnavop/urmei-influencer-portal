import type { FeaturedRef } from './banner-store'
import type { Collection } from './collections-store'
import { PRODUCTS } from './data/catalogue'
import type { Product, ShopItem } from './types'

export type ResolvedFeatured =
  | { kind: 'collection'; ref: FeaturedRef; collection: Collection; items: ShopItem[] }
  | { kind: 'product'; ref: FeaturedRef; item: ShopItem }
  /** A featured product that has left the shop, or isn't sold in the market
   *  being viewed: the creator still sees it, marked NOT AVAILABLE, until they
   *  change or remove it. Shoppers never do. */
  | { kind: 'unavailable'; ref: FeaturedRef; product: Product }

export type AvailableFeatured = Exclude<ResolvedFeatured, { kind: 'unavailable' }>

/** A collection's items in cover order, skipping any no longer in the shop. */
export function collectionItems(collection: Collection, items: ShopItem[]) {
  const byId = new Map(items.map((item) => [item.id, item]))
  return collection.itemIds
    .map((id) => byId.get(id))
    .filter((item): item is ShopItem => item !== undefined)
}

/**
 * Turns the saved featured refs into what the banner draws. A product that
 * left the shop, or isn't sold in `country`, comes back `unavailable`
 * (flow 05, Work File annotation on 05.1); a collection that was deleted or
 * emptied is skipped.
 */
export function resolveFeatured(
  refs: FeaturedRef[],
  items: ShopItem[],
  collections: Collection[],
  country: string,
): ResolvedFeatured[] {
  return refs.flatMap((ref): ResolvedFeatured[] => {
    if (ref.kind === 'product') {
      const item = items.find((row) => row.id === ref.id)
      if (item) {
        return item.product.regions.includes(country)
          ? [{ kind: 'product', ref, item }]
          : [{ kind: 'unavailable', ref, product: item.product }]
      }
      const product = PRODUCTS.find((row) => row.id === ref.productId)
      return product ? [{ kind: 'unavailable', ref, product }] : []
    }
    const collection = collections.find((row) => row.id === ref.id)
    if (!collection) return []
    const covered = collectionItems(collection, items)
    return covered.length > 0 ? [{ kind: 'collection', ref, collection, items: covered }] : []
  })
}

/** "+3" / "products" for the products beyond the three on a cover. */
export function moreLabel(count: number) {
  const extra = count - 3
  return extra > 0 ? { count: `+${extra}`, label: extra === 1 ? 'product' : 'products' } : null
}

/** What shoppers see: the unavailable ones are left out (05.3). */
export const shopperFeatured = (featured: ResolvedFeatured[]) =>
  featured.filter((item): item is AvailableFeatured => item.kind !== 'unavailable')
