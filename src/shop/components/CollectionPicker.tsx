import { useState } from 'react'
import {
  collectionsSavedMessage,
  createCollection,
  loadCollections,
  saveCollections,
  setItemCollections,
} from '../collections-store'
import { loadShopItems } from '../shop-items-store'
import type { ShopItem } from '../types'
import { AddToCollectionDialog } from './AddToCollectionDialog'
import { CollectionDialog } from './CollectionDialog'

/**
 * Add to collection for screens outside My Shop (Home's product overlay and
 * the portal's product overlay): the same dialog and New collection step as
 * My Shop, reading and saving the collections store itself because those
 * screens hold no collections state of their own.
 */
export function CollectionPicker({
  item,
  onClose,
  onSaved,
}: {
  item: ShopItem
  onClose: () => void
  /** Gets the toast line to show. */
  onSaved: (message: string) => void
}) {
  const [collections, setCollections] = useState(() => loadCollections(loadShopItems()))
  const [newIds, setNewIds] = useState<string[]>([])
  const [creating, setCreating] = useState(false)

  return (
    <>
      <AddToCollectionDialog
        item={item}
        collections={collections}
        newCollectionIds={newIds}
        onNewCollection={() => setCreating(true)}
        onClose={onClose}
        onSave={(ids) => {
          const added = collections.filter((c) => ids.includes(c.id) && !c.itemIds.includes(item.id))
          const next = setItemCollections(collections, item.id, ids)
          saveCollections(next)
          setCollections(next)
          onSaved(collectionsSavedMessage(added))
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
