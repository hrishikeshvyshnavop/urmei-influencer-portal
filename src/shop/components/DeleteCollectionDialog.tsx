import { ConfirmDialog } from './ConfirmDialog'

type DeleteCollectionDialogProps = {
  name: string
  productCount: number
  onClose: () => void
  onConfirm: () => void
}

/**
 * "Delete this collection?" (Figma `1862:87536`, main file). Deleting only
 * removes the grouping; the products stay in My Shop and in their other
 * collections (Collections Q8).
 */
export function DeleteCollectionDialog({ name, productCount, onClose, onConfirm }: DeleteCollectionDialogProps) {
  const products = `${productCount} ${productCount === 1 ? 'product stays' : 'products stay'}`
  return (
    <ConfirmDialog
      title="Delete this collection?"
      confirmLabel="Delete Collection"
      onClose={onClose}
      onConfirm={onConfirm}
      message={
        <>
          &ldquo;{name}&rdquo; will be removed from your shop and storefront. Its {products} in My Shop and
          in any other collections {productCount === 1 ? 'it is' : 'they are'} in.
        </>
      }
    />
  )
}
