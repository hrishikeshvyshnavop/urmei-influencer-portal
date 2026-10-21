import { ConfirmDialog } from './ConfirmDialog'

/** "Remove from this collection?" (Figma `1862:81877`): the product leaves one
 *  collection only; it stays in the shop and its other collections. */
export function RemoveFromCollectionDialog({
  productName,
  collectionName,
  onClose,
  onConfirm,
}: {
  productName: string
  collectionName: string
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <ConfirmDialog
      title="Remove from this collection?"
      confirmLabel="Remove"
      onClose={onClose}
      onConfirm={onConfirm}
      message={
        <>
          {productName} will be removed from &ldquo;{collectionName}&rdquo;. It stays in your shop and in
          your other collections.
        </>
      }
    />
  )
}
