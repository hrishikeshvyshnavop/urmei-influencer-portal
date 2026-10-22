import { useEffect, useMemo } from 'react'
import type { Collection } from '../collections-store'
import { useCollectionSelection } from '../hooks/useCollectionSelection'
import type { ShopItem } from '../types'
import { CollectionChecklist } from './CollectionChecklist'
import { DialogProductSummary } from './DialogProductSummary'
import { Icon } from './Icon'

type AddToCollectionDialogProps = {
  item: ShopItem
  collections: Collection[]
  /** Collections created from this dialog: they show "New" instead of a count
   *  and start ticked (Figma `1862:86823`). */
  newCollectionIds: string[]
  onNewCollection: () => void
  onClose: () => void
  /** Called with the full set of collection ids the item should be in. */
  onSave: (collectionIds: string[]) => void
}

/**
 * "Add to collection" (Figma `1862:87152` and states, main file): the product
 * summary, then "Choose collections", and Cancel / Save. With no collections
 * the list becomes the dashed "No collections yet" box and Save stays off
 * (`1862:86156`).
 */
export function AddToCollectionDialog({
  item,
  collections,
  newCollectionIds,
  onNewCollection,
  onClose,
  onSave,
}: AddToCollectionDialogProps) {
  const initial = useMemo(
    () => collections.filter((collection) => collection.itemIds.includes(item.id)).map((c) => c.id),
    // Only the membership at open time counts as "unchanged".
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.id],
  )
  const { selected, toggle } = useCollectionSelection(initial, newCollectionIds)
  const changed =
    selected.length !== initial.length || selected.some((id) => !initial.includes(id))

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-scrim" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add to collection"
        className="flex max-h-[calc(100vh-32px)] w-[525px] flex-col items-center overflow-y-auto rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">Add to collection</p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex w-[40px] items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex w-full flex-col gap-lg px-lg pt-md pb-lg">
          <DialogProductSummary product={item.product} variant={item.variant} />

          <CollectionChecklist
            title="Choose collections"
            collections={collections}
            selected={selected}
            onToggle={toggle}
            newCollectionIds={newCollectionIds}
            onNewCollection={onNewCollection}
            emptyBox
          />

          <div className="flex w-full items-center gap-md-sm">
            <button
              type="button"
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-sm rounded-md border border-surface-primary-200 px-md py-sm text-body-sm font-medium text-text-secondary-1000"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!changed}
              onClick={() => onSave(selected)}
              className="flex flex-1 items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100 capitalize disabled:cursor-not-allowed disabled:bg-surface-secondary-300 disabled:text-text-secondary-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
