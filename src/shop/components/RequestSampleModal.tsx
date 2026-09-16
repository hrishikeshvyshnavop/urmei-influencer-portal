import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import FieldGrid from '../../portal/components/FieldGrid'
import { ADDRESS_MODAL_FIELDS } from '../../portal/form-fields'
import {
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
  onSubmit: (input: { shippingAddress: SampleShippingAddress; note?: string }) => void
}

function formatAddress(fields: Record<string, string>): string {
  const unit = fields.floorNo && fields.unitNumber ? `#${fields.floorNo}-${fields.unitNumber}` : undefined
  return [fields.blockNo, fields.street, fields.building, unit, fields.postalCode, fields.country]
    .filter((part) => part && part.trim().length > 0)
    .join(', ')
}

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
  const [note, setNote] = useState('')

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
      onSubmit({ shippingAddress: newAddress.fields, note: note.trim() || undefined })
      return
    }
    const selected = addresses.find((address) => address.id === selectedId)
    if (!selected) return
    onSubmit({ shippingAddress: selected.fields, note: note.trim() || undefined })
  }

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-scrim p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Request a product sample"
        className="motion-modal-panel my-auto flex w-[525px] max-w-full shrink-0 flex-col items-start overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">Request a sample</p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
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

          <p className="text-body-xs text-text-secondary-700">
            Urmei reviews every sample request manually — check the Samples page for status updates.
          </p>

          <div className="flex w-full flex-col gap-sm">
            <p className="text-body-sm font-medium text-text-secondary-1000">Shipping address</p>

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
                    selected ? 'border-surface-primary-500' : 'border-border-default',
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

            {addingNew ? (
              <div className="flex w-full flex-col gap-md-sm rounded-md border border-border-default bg-surface-secondary-100 p-md-sm">
                <div className="flex w-full items-center justify-between">
                  <p className="text-body-sm font-medium text-text-secondary-1000">Add address</p>
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
                  fields={ADDRESS_MODAL_FIELDS}
                  values={values}
                  showErrors={showErrors}
                  onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
                />
              </div>
            ) : (
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

          <label className="flex w-full flex-col gap-xs">
            <span className="text-body-sm font-medium text-text-secondary-1000">
              Note to Urmei <span className="font-normal text-text-secondary-600">(optional)</span>
            </span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              placeholder="Anything Urmei should know about this request"
              className="w-full resize-none rounded-md border border-border-default bg-surface-secondary-100 px-md py-sm text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-600 focus:border-border-outlined"
            />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!addingNew && !selectedId}
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
