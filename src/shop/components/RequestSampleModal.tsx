import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import FieldGrid from '../../portal/components/FieldGrid'
import { ADDRESS_MODAL_FIELDS } from '../../portal/form-fields'
import {
  formatAddress,
  loadShippingAddresses,
  saveShippingAddresses,
  type ShippingAddress,
} from '../../portal/shipping-address'
import type { SampleShippingAddress } from '../sample-requests'
import type { Product } from '../types'
import { Icon } from './Icon'

type RequestSampleModalProps = {
  product: Product
  variant?: string
  onClose: () => void
  onSubmit: (input: { shippingAddress: SampleShippingAddress }) => void
}

/** Split for the "New address" form's own sub-groups (label / address /
 *  contact) rather than one flat list of eight fields — the shared field
 *  order itself (and Manage Account's own form) is untouched. */
const NEW_ADDRESS_LABEL_FIELD = ADDRESS_MODAL_FIELDS.filter((field) => field.name === 'label')
const NEW_ADDRESS_CONTACT_FIELDS = ADDRESS_MODAL_FIELDS.filter((field) => field.name === 'phone')
const NEW_ADDRESS_LOCATION_FIELDS = ADDRESS_MODAL_FIELDS.filter(
  (field) => field.name !== 'label' && field.name !== 'phone',
)

/**
 * "Request a sample" — a standalone flow, independent of whether the product
 * is in the creator's shop (see docs/prd/creator-reviews-and-sample-requests.md
 * §5.2). Urmei approves every request manually for now, so this only ever
 * writes a `requested` record; there's no in-app approval step here.
 *
 * Picks from the creator's saved addresses (the same list Manage Account
 * manages) rather than asking them to retype one — "Add address" saves a new
 * one into that same list instead of throwing it away after this one request.
 */
export function RequestSampleModal({ product, variant, onClose, onSubmit }: RequestSampleModalProps) {
  const [addresses, setAddresses] = useState<ShippingAddress[]>(loadShippingAddresses)
  const [selectedId, setSelectedId] = useState<string | null>(
    () => (addresses.find((address) => address.isDefault) ?? addresses[0] ?? null)?.id ?? null,
  )
  const [addingNew, setAddingNew] = useState(addresses.length === 0)
  const [values, setValues] = useState<Record<string, string>>({ country: 'Singapore' })
  const [showErrors, setShowErrors] = useState(false)

  // The modal only actually unmounts once the parent clears its pending
  // target, so closing (either way) first plays the exit animation via
  // `data-state` and defers the real callback instead of firing it — and
  // unmounting the panel — immediately. Mirrors AddToShopModal.
  const [closing, setClosing] = useState<false | 'cancel' | 'confirm'>(false)
  const closeTimeoutRef = useRef<number | null>(null)
  const pendingSubmitRef = useRef<SampleShippingAddress | null>(null)

  function finishClose(kind: 'cancel' | 'confirm') {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (kind === 'confirm' && pendingSubmitRef.current) onSubmit({ shippingAddress: pendingSubmitRef.current })
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

  useEffect(() => () => {
    if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function startAddingAddress() {
    setValues({ country: 'Singapore' })
    setShowErrors(false)
    setAddingNew(true)
  }

  function handleSubmit() {
    if (addingNew) {
      setShowErrors(true)
      const complete = ADDRESS_MODAL_FIELDS.every((field) => field.optional || (values[field.name] ?? '').trim())
      if (!complete) return
      const newAddress: ShippingAddress = {
        id: `address-${Date.now()}`,
        isDefault: addresses.length === 0,
        fields: values,
      }
      const next = [...addresses, newAddress]
      saveShippingAddresses(next)
      setAddresses(next)
      setSelectedId(newAddress.id)
      setAddingNew(false)
      pendingSubmitRef.current = newAddress.fields
      requestClose('confirm')
      return
    }
    const selected = addresses.find((address) => address.id === selectedId)
    if (!selected) return
    pendingSubmitRef.current = selected.fields
    requestClose('confirm')
  }

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-scrim p-4"
      data-state={closing ? 'closed' : 'open'}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose('cancel')
      }}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        onAnimationEnd={handleExitAnimationEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Request a product sample"
        data-state={closing ? 'closed' : 'open'}
        className="motion-modal-panel my-auto flex w-[640px] max-w-full shrink-0 flex-col items-start overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">Request a sample</p>
          <button
            type="button"
            aria-label="Close"
            onClick={() => requestClose('cancel')}
            className="flex size-[40px] items-center justify-center overflow-clip rounded-md border border-border-default"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex max-h-[70vh] w-full flex-col gap-lg overflow-y-auto px-lg pt-md pb-lg">
          <div className="flex w-full items-center gap-md-sm">
            <img
              src={product.shopCardImage}
              alt=""
              className="size-[48px] shrink-0 rounded-sm border border-border-default object-cover"
            />
            <div className="flex min-w-px flex-1 flex-col">
              <p className="text-body-xxs font-medium text-text-secondary-700">{product.brand}</p>
              <p className="truncate text-body-sm font-medium text-text-secondary-1000">{product.name}</p>
              {variant && <p className="truncate text-body-xs text-text-secondary-700">{variant}</p>}
            </div>
          </div>

          <div className="flex w-full flex-col gap-md-sm rounded-lg border border-border-default p-md-sm">
            <p className="text-body-sm font-medium text-text-secondary-1000">Shipping address</p>

            <div className="flex w-full flex-col gap-sm">
              {addresses.map((address) => {
                const selected = !addingNew && selectedId === address.id
                return (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(address.id)
                      setAddingNew(false)
                    }}
                    className={[
                      'flex w-full items-start gap-sm rounded-md border p-md-sm text-left',
                      selected ? 'border-surface-primary-500 bg-surface-tertiary-100' : 'border-border-default',
                    ].join(' ')}
                  >
                    <Icon name={selected ? 'radio-selected' : 'radio'} size={16} className="mt-[2px]" />
                    <span className="flex min-w-px flex-1 flex-col gap-xs">
                      <span className="text-body-sm font-medium text-text-secondary-1000">
                        {address.fields.label || 'Address'}
                      </span>
                      <span className="text-body-xs text-text-secondary-700">{formatAddress(address.fields)}</span>
                    </span>
                  </button>
                )
              })}

              {!addingNew && (
                <button
                  type="button"
                  onClick={startAddingAddress}
                  className="flex w-full items-center justify-center gap-sm rounded-md border border-dashed border-border-default px-md py-sm text-body-sm font-medium text-text-secondary-1000"
                >
                  <Icon name="plus" />
                  Add address
                </button>
              )}
            </div>

            <div
              className={`grid w-full transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                addingNew ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={`flex w-full flex-col gap-md-sm border-t border-border-default pt-md-sm transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
                    addingNew ? 'translate-y-0 opacity-100 delay-75' : '-translate-y-1 opacity-0 delay-0'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <p className="text-body-xs font-medium text-text-secondary-700">New address</p>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setAddingNew(false)}
                        className="text-body-xs font-medium text-text-secondary-700 underline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <FieldGrid
                    fields={NEW_ADDRESS_LABEL_FIELD}
                    values={values}
                    showErrors={showErrors}
                    onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
                  />

                  <div className="flex w-full flex-col gap-sm">
                    <p className="track-section text-body-xxs font-medium text-text-secondary-600">Address</p>
                    <FieldGrid
                      fields={NEW_ADDRESS_LOCATION_FIELDS}
                      values={values}
                      showErrors={showErrors}
                      onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
                    />
                  </div>

                  <div className="flex w-full flex-col gap-sm">
                    <p className="track-section text-body-xxs font-medium text-text-secondary-600">Contact</p>
                    <FieldGrid
                      fields={NEW_ADDRESS_CONTACT_FIELDS}
                      values={values}
                      showErrors={showErrors}
                      onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={closing !== false || (!addingNew && !selectedId)}
            className="flex w-full items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100 disabled:bg-surface-secondary-300 disabled:text-text-secondary-500"
          >
            Submit request
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
