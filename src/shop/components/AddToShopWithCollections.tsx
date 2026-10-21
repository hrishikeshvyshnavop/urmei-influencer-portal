import { useState } from 'react'
import {
  addedToShopMessage,
  createCollection,
  loadCollections,
  saveCollections,
  setItemCollections,
} from '../collections-store'
import { loadShopItems } from '../shop-items-store'
import type { Product, ShopItem } from '../types'
import { AddToShopModal } from './AddToShopModal'
import { CollectionDialog } from './CollectionDialog'

/**
 * Add to shop for screens outside My Shop (Home and the portal's product
 * overlay): the same dialog with its optional "Choose collections" section,
 * reading and saving the collections store itself because those screens hold
 * no collections state of their own. The caller adds the shop item.
 */
export function AddToShopWithCollections({
  product,
  existingVariants,
  onClose,
  onAdd,
  onDone,
}: {
  product: Product
  existingVariants: string[]
  onClose: () => void
  /** Adds and persists the item, returning it so it can join collections. */
  onAdd: (variant: string) => ShopItem
  /** Gets the toast line to show. */
  onDone: (message: string) => void
}) {
  const [collections, setCollections] = useState(() => loadCollections(loadShopItems()))
  const [newIds, setNewIds] = useState<string[]>([])
  const [creating, setCreating] = useState(false)

  return (
    <>
      <AddToShopModal
        product={product}
        collections={collections}
        newCollectionIds={newIds}
        onNewCollection={() => setCreating(true)}
        existingVariants={existingVariants}
        onClose={onClose}
        onConfirm={(ids, variant) => {
          const item = onAdd(variant)
          if (ids.length > 0) saveCollections(setItemCollections(collections, item.id, ids))
          onDone(addedToShopMessage(collections.filter((c) => ids.includes(c.id))))
        }}
      />
      {creating && (
        <CollectionDialog
          mode="create"
          takenNames={collections.map((c) => c.name)}
          onClose={() => setCreating(false)}
          onSubmit={(name, description) => {
            const next = createCollection(collections, name, description)
            saveCollections(next)
            setCollections(next)
            setNewIds((current) => [...current, next[0].id])
            setCreating(false)
          }}
        />
      )}
    </>
  )
}
