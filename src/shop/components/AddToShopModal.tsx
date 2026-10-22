import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Collection } from '../collections-store'
import { useCollectionSelection } from '../hooks/useCollectionSelection'
import type { Product } from '../types'
import { CollectionChecklist } from './CollectionChecklist'
import { Icon } from './Icon'
import { VariantSelect } from './VariantSelect'

type AddToShopModalProps = {
  product: Product
  /** The creator's collections, for the optional "Choose collections"
   *  section that replaced the Favorite toggle (Figma `1913:35948`). */
  collections: Collection[]
  /** Pre-ticked, e.g. the collection being filled from its empty page
   *  (flow 09, Figma `1970:101056`). */
  initialCollectionIds?: string[]
  /** Collections made from this dialog: shown "New", arriving ticked. */
  newCollectionIds: string[]
  onNewCollection: () => void
  /** Variants of this same product already in the shop — including when
   *  there's only one variant to begin with, which makes the product itself
   *  the thing that's already added. Re-adding one is blocked rather than
   *  creating an indistinguishable duplicate row. */
  existingVariants: string[]
  onClose: () => void
  /** Filling a collection from the catalogue: "Add this product to
   *  collection?" (flow 21, Figma `1970:101835`). */
  title?: string
  /** Filling a collection only: the collections the shop's item for this
   *  variant is already in, or null when the variant isn't in the shop. An
   *  already-added variant then shows those ticked and Confirm saves the
   *  ticks onto that item instead of being blocked. */
  existingCollectionIds?: (variant: string) => string[] | null
  /** Nothing ticked means All Picks only, as before (annotation `1913:36641`). */
  onConfirm: (collectionIds: string[], variant: string) => void
}

export function AddToShopModal({
  product,
  collections,
  initialCollectionIds = [],
  newCollectionIds,
  onNewCollection,
  existingVariants,
  onClose,
  onConfirm,
  existingCollectionIds,
  title = 'Add this product to your shop?',
}: AddToShopModalProps) {
  const ticksFor = (variant: string) => {
    const existing = existingCollectionIds?.(variant)
    return existing ? [...new Set([...existing, ...initialCollectionIds])] : initialCollectionIds
  }
  const [selectedVariant, setSelectedVariant] = useState(product.variant)
  const { selected, toggle, reset } = useCollectionSelection(ticksFor(product.variant), newCollectionIds)
  const alreadyAdded = existingVariants.includes(selectedVariant)
  const existing = alreadyAdded ? existingCollectionIds?.(selectedVariant) ?? null : null
  // An added variant can still be confirmed while filling a collection, once
  // the ticks differ from the collections it is already in.
  const changed =
    existing !== null &&
    (selected.length !== existing.length || selected.some((id) => !existing.includes(id)))
  const canConfirm = !alreadyAdded || changed

  function changeVariant(variant: string) {
    setSelectedVariant(variant)
    reset(ticksFor(variant))
  }

  // The modal only actually unmounts once the parent clears `pendingProduct`,
  // so closing (either way) first plays the exit animation via `data-state`
  // and defers the real callback instead of firing it — and unmounting the
  // panel — immediately.
  const [closing, setClosing] = useState<false | 'cancel' | 'confirm'>(false)
  const closeTimeoutRef = useRef<number | null>(null)

  function finishClose(kind: 'cancel' | 'confirm') {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (kind === 'confirm') onConfirm(selected, selectedVariant)
    else onClose()
  }

  function requestClose(kind: 'cancel' | 'confirm') {
    // Ignore a second trigger once the exit animation is already underway —
    // otherwise a rapid double-click could swap the pending action mid-close.
    if (closing) return
    setClosing(kind)
    // `onAnimationEnd` normally finishes the close, but CSS animations can
    // stall while the tab is backgrounded (or never start under
    // prefers-reduced-motion edge cases) — this guarantees it still closes.
    closeTimeoutRef.current = window.setTimeout(() => finishClose(kind), 300)
  }

  function handleExitAnimationEnd() {
    if (closing) finishClose(closing)
  }

  // Escape cancels, like the close button. Re-bound every render so it sees
  // the current `closing` state.
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      // An open variant dropdown takes the key first.
      if (document.querySelector('[data-radix-popper-content-wrapper], [role="listbox"]')) return
      requestClose('cancel')
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  })

  useEffect(() => () => {
    if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousOverscroll = document.body.style.overscrollBehavior
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.overscrollBehavior = previousOverscroll
    }
  }, [])

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-scrim p-4"
      data-state={closing ? 'closed' : 'open'}
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) requestClose('cancel') }}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        onAnimationEnd={handleExitAnimationEnd}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-state={closing ? 'closed' : 'open'}
        className="motion-modal-panel my-auto flex w-[525px] max-w-full shrink-0 flex-col items-center overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">{title}</p>
          <button
            type="button"
            aria-label="Close"
            onClick={() => requestClose('cancel')}
            className="flex size-[40px] items-center justify-center overflow-clip rounded-md border border-border-default"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex w-full flex-col gap-lg px-lg pt-md pb-lg">
          <div className="flex w-full flex-col gap-[18px]">
            <div className="flex w-full flex-col overflow-clip rounded-[7px] bg-surface-secondary-300">
              <div className="flex w-full items-center rounded-t-md bg-surface-tertiary-100 px-ten py-sm">
                <p className="text-body-xs font-medium text-text-secondary-700">
                  Available only in{' '}
                  <span className="text-text-secondary-900">{product.regions.join(' & ')}</span>
                </p>
              </div>

              <div className="flex w-full items-center gap-lg p-md">
                <img
                  src={product.heroImage}
                  alt=""
                  className="h-[135px] w-[136px] rounded-[16px] border border-border-default object-cover"
                />
                <div className="flex flex-1 flex-col gap-fourteen">
                  <div className="flex w-full flex-col gap-[6px]">
                    <div className="flex w-full flex-col gap-xs">
                      <p className="text-body-xxs font-medium text-text-secondary-700">
                        {product.brand}
                      </p>
                      <p className="text-body-sm font-medium text-text-secondary-1000">
                        {product.name}
                      </p>
                    </div>
                    <VariantSelect
                      options={product.variantOptions}
                      value={selectedVariant}
                      onChange={changeVariant}
                    />
                    {alreadyAdded && !existingCollectionIds && (
                      <p className="text-body-xs font-medium text-surface-other-alert">
                        This variant is already in your shop
                      </p>
                    )}
                    {existing !== null && !changed && (
                      <p className="text-body-xs text-text-secondary-700">Choose collections to add it to.</p>
                    )}
                  </div>

                  <div className="flex w-full items-center gap-[6px]">
                    <div className="flex items-center gap-xs">
                      <p className="text-body-md font-medium text-text-secondary-1000">
                        {product.price}
                      </p>
                      <p className="text-body-xs font-medium text-text-secondary-600 line-through">
                        {product.modalCompareAt}
                      </p>
                    </div>
                    <span className="flex items-center justify-center gap-xs rounded-[24px] bg-surface-tertiary-500 px-sm py-[2px] text-body-xs text-text-secondary-900">
                      <span className="font-medium text-text-secondary-1000">
                        {product.commissionBadge}
                      </span>{' '}
                      Commission
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CollectionChecklist
              title="Choose collections (optional)"
              collections={collections}
              selected={selected}
              onToggle={toggle}
              newCollectionIds={newCollectionIds}
              onNewCollection={onNewCollection}
              emptyBox={false}
            />
          </div>

          <button
            type="button"
            onClick={() => requestClose('confirm')}
            disabled={!canConfirm}
            className="flex w-full items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100 disabled:bg-surface-secondary-300 disabled:text-text-secondary-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
