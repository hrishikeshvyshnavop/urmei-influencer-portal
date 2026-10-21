import type { Collection } from '../collections-store'
import { hasLiveLink } from '../data/shop'
import type { ShopItem } from '../types'
import { Button } from './Button'
import { Icon } from './Icon'
import { ItemMenu } from './ItemMenu'
import { AddProductTile } from './AddProductTile'
import { ShopProductCard } from './ShopProductCard'

type CollectionPageProps = {
  collection: Collection
  items: ShopItem[]
  publishedAt: number | null
  onBack: () => void
  onCopyLink: () => void
  onEditDetails: () => void
  onDelete: () => void
  onViewDetails: (item: ShopItem) => void
  onCopyAffiliateLink: (item: ShopItem) => void
  onRemoveFromCollection: (item: ShopItem) => void
  onRemoveFromShop: (item: ShopItem) => void
  /** Empty collection: browse the catalogue to fill it (flow 09). */
  onAddProducts: () => void
}

/**
 * One collection inside My Shop's Collections tab (flow 08, Figma `1862:85176`,
 * main file): "‹ All collections", the name with "description · n products",
 * Copy Link / Edit Details / ⋮ (Delete collection), then the collection's
 * products as shop cards whose menu removes from this collection only.
 * Copy Link stays off until the shop has been published (flow 14).
 */
export function CollectionPage({
  collection,
  items,
  publishedAt,
  onBack,
  onCopyLink,
  onEditDetails,
  onDelete,
  onViewDetails,
  onCopyAffiliateLink,
  onRemoveFromCollection,
  onRemoveFromShop,
  onAddProducts,
}: CollectionPageProps) {
  const count = `${items.length} ${items.length === 1 ? 'product' : 'products'}`
  const published = publishedAt !== null

  return (
    <div className="flex w-full flex-col items-start gap-lg">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
      >
        <Icon name="chevron-left" />
        All collections
      </button>

      <div className="flex w-full items-center justify-between gap-lg">
        <div className="flex min-w-px flex-1 flex-col gap-[6px]">
          <p className="text-body-xxl text-text-primary-1000">{collection.name}</p>
          <p className="text-body-md whitespace-pre-wrap text-text-secondary-700">
            {collection.description ? `${collection.description}  ·  ${count}` : count}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-sm">
          <Button
            variant="outline"
            onClick={onCopyLink}
            disabled={!published}
            title={published ? undefined : 'Publish shop to get your URL'}
            leftIcon={<Icon name="copy" />}
          >
            Copy Link
          </Button>
          <Button variant="outline" onClick={onEditDetails} leftIcon={<Icon name="edit-3" />}>
            Edit Details
          </Button>
          <ItemMenu
            label={`${collection.name} options`}
            actions={[{ label: 'Delete collection', destructive: true, onSelect: onDelete }]}
          />
        </div>
      </div>

      {items.length === 0 && (
        // Figma `1970:101437`: the shop's dashed empty box.
        <div className="flex h-[471px] w-full flex-col items-center justify-center gap-[18px] rounded-lg border-2 border-dashed border-surface-secondary-500 bg-surface-secondary-100">
          <div className="flex flex-col items-center gap-fourteen">
            <span className="flex size-[64px] items-center justify-center rounded-[100px] bg-surface-tertiary-500 p-md-sm">
              <Icon name="layout-grid" size={28} />
            </span>
            <div className="flex max-w-[560px] flex-col items-center gap-xs text-center">
              <p className="text-body-xl font-medium text-text-secondary-1000">
                No products in this collection yet
              </p>
              <p className="text-body-xs text-text-secondary-700">
                Open a pick&rsquo;s menu in All Picks and choose Add to collection. Shoppers won&rsquo;t
                see this collection until it has a product.
              </p>
            </div>
          </div>
          <Button onClick={onAddProducts} leftIcon={<Icon name="plus-inverse" />}>
            Add product to collection
          </Button>
        </div>
      )}
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-lg">
        {items.map((item) => (
          <ShopProductCard
            key={item.id}
            item={item}
            onViewDetails={() => onViewDetails(item)}
            onCopyLink={hasLiveLink(item, publishedAt) ? () => onCopyAffiliateLink(item) : undefined}
            onRemoveFromCollection={() => onRemoveFromCollection(item)}
            onRemoveFromShop={() => onRemoveFromShop(item)}
          />
        ))}
        {items.length > 0 && <AddProductTile label="Add To Collection" onClick={onAddProducts} />}
      </div>
    </div>
  )
}
