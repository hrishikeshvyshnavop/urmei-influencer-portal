import ProfilePhoto from '../../portal/components/ProfilePhoto'
import type { Collection } from '../collections-store'
import { CONTENT_COLUMN } from '../layout'
import type { ShopItem } from '../types'
import { Icon } from './Icon'
import { StorefrontCollections } from './StorefrontCollections'
import { StorefrontProductCard } from './StorefrontProductCard'

type StorefrontCollectionPageProps = {
  collection: Collection
  /** Every shop item; the collection's own are picked out here. */
  items: ShopItem[]
  /** For "More collections from <name>", in the creator's order. */
  collections: Collection[]
  ownerName: string
  country: string
  onSelectItem: (item: ShopItem) => void
  onSelectCollection: (collection: Collection) => void
  onCopyLink: () => void
}

/**
 * One collection on the storefront (flow 16, Figma `1862:82265`, main file):
 * "Collection by <name> @handle", the name, description and count with
 * "Copy collection link", the "In this collection" grid, then "More
 * collections from <name>" with the creator's other boards.
 */
export function StorefrontCollectionPage({
  collection,
  items,
  collections,
  ownerName,
  country,
  onSelectItem,
  onSelectCollection,
  onCopyLink,
}: StorefrontCollectionPageProps) {
  const byId = new Map(items.map((item) => [item.id, item]))
  const own = collection.itemIds
    .map((id) => byId.get(id))
    .filter((item): item is ShopItem => item !== undefined)

  return (
    <div className="flex w-full flex-col items-center">
      <div className={CONTENT_COLUMN}>
        <div className="flex w-full items-start justify-between py-sm">
          <div className="flex flex-col items-start gap-md-sm">
            <div className="flex items-center gap-ten">
              <span className="relative size-[32px] shrink-0 overflow-hidden rounded-full">
                <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
              </span>
              <p className="text-body-sm leading-[20px] font-medium text-text-secondary-1000">
                Collection by {ownerName}
              </p>
              <p className="text-body-sm leading-[20px] font-medium text-text-secondary-700">@charlotte</p>
            </div>
            <h1 className="text-[32px] leading-[40px] font-semibold text-text-secondary-1000">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="text-body-md leading-[24px] text-text-secondary-700">{collection.description}</p>
            )}
            <p className="text-body-sm leading-[20px] font-medium text-text-secondary-700">
              {own.length} {own.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <button
            type="button"
            onClick={onCopyLink}
            className="flex shrink-0 items-center justify-center gap-sm px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
          >
            Copy collection link
            <Icon name="copy" />
          </button>
        </div>
      </div>

      <section className={`flex flex-col items-center gap-md-2 py-3xl ${CONTENT_COLUMN}`}>
        <p className="w-full text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
          In this collection
        </p>
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-x-md gap-y-lg">
          {own.map((item) => (
            <StorefrontProductCard
              key={item.id}
              product={item.product}
              className="w-full"
              available={item.product.regions.includes(country)}
              onClick={() => onSelectItem(item)}
            />
          ))}
        </div>
      </section>

      <StorefrontCollections
        title={`More collections from ${ownerName}`}
        collections={collections.filter((other) => other.id !== collection.id)}
        items={items}
        onSelect={onSelectCollection}
      />
    </div>
  )
}

/**
 * "This collection isn't available" (flow 17, Figma `1862:82022`): reached
 * from a shared link to a collection that was deleted, emptied, or has
 * nothing in the shopper's market. The creator's other collections keep the
 * shopper browsing.
 */
export function CollectionUnavailable({
  ownerName,
  items,
  collections,
  onVisitStorefront,
  onSelectCollection,
}: {
  ownerName: string
  items: ShopItem[]
  collections: Collection[]
  onVisitStorefront: () => void
  onSelectCollection: (collection: Collection) => void
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className={CONTENT_COLUMN}>
        <div className="flex w-full flex-col items-center gap-ten px-lg py-[96px] text-center">
          <h1 className="text-[32px] leading-[40px] font-semibold text-text-secondary-1000">
            This collection isn&rsquo;t available
          </h1>
          {/* The design writes "Her other picks"; kept neutral because the
              creator's pronouns aren't known. */}
          <p className="w-[560px] max-w-full text-body-md leading-[24px] text-text-secondary-700">
            {ownerName} may have removed it, or it has no products in your market right now. Their other
            picks are still here.
          </p>
          <span aria-hidden="true" className="h-[12px]" />
          <button
            type="button"
            onClick={onVisitStorefront}
            className="flex items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100 capitalize"
          >
            Visit {ownerName}&rsquo;s Storefront
          </button>
        </div>
      </div>
      <StorefrontCollections
        title={`More collections from ${ownerName}`}
        collections={collections}
        items={items}
        onSelect={onSelectCollection}
      />
    </div>
  )
}
