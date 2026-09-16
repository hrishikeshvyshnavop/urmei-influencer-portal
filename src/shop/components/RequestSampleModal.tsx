import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import FieldGrid from '../../portal/components/FieldGrid'
import { ADDRESS_FIELDS_BY_COUNTRY, type FieldSpec } from '../../portal/form-fields'
import {
  loadShippingAddresses,
  saveShippingAddresses,
  type ShippingAddress,
} from '../../portal/shipping-address'
import type { SampleShippingAddress } from '../sample-requests'
import type { Product } from '../types'
import { Checkbox } from './Checkbox'
import { Icon } from './Icon'

type RequestSampleModalProps = {
  product: Product
  variant?: string
  onClose: () => void
  onSubmit: (input: { shippingAddress: SampleShippingAddress; note?: string }) => void
}

/** Same shape as Manage Account's own address modal (`ADDRESS_MODAL_FIELDS`)
 *  minus the address label, which only matters for a saved, named address. */
const REQUEST_ADDRESS_FIELDS: FieldSpec[] = [
  ...ADDRESS_FIELDS_BY_COUNTRY.Singapore!.map((field) =>
    field.name === 'floorNo' || field.name === 'unitNumber' ? { ...field, optional: true } : field,
  ),
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Select',
    autoComplete: 'country-name',
    options: ['Singapore', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam'],
  },
  {
    name: 'phone',
    label: 'Recipient phone',
    placeholder: '',
    type: 'tel',
    autoComplete: 'tel',
    fullWidth: true,
  },
]

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
 * Defaults to whatever address Manage Account has on file (the one marked
 * "For sample shipping", or the first saved one) rather than asking a
 * creator who already has an address in their profile to retype it.
 */
export function RequestSampleModal({ product, variant, onClose, onSubmit }: RequestSampleModalProps) {
  const [addresses] = useState<ShippingAddress[]>(loadShippingAddresses)
  const savedAddress = addresses.find((address) => address.isDefault) ?? addresses[0] ?? null

  const [useSaved, setUseSaved] = useState(savedAddress !== null)
  const [values, setValues] = useState<Record<string, string>>({ country: 'Singapore' })
  const [saveForFuture, setSaveForFuture] = useState(addresses.length === 0)
  const [showErrors, setShowErrors] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function handleSubmit() {
    if (useSaved && savedAddress) {
      onSubmit({ shippingAddress: savedAddress.fields, note: note.trim() || undefined })
      return
    }
    setShowErrors(true)
    const complete = REQUEST_ADDRESS_FIELDS.every((field) => field.optional || (values[field.name] ?? '').trim())
    if (!complete) return
    if (saveForFuture) {
      saveShippingAddresses([
        ...addresses,
        { id: `address-${Date.now()}`, isDefault: addresses.length === 0, fields: values },
      ])
    }
    onSubmit({ shippingAddress: values, note: note.trim() || undefined })
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

          {savedAddress && (
            <div className="flex items-center gap-ten" role="tablist" aria-label="Shipping address">
              <button
                type="button"
                role="tab"
                aria-selected={useSaved}
                onClick={() => setUseSaved(true)}
                className={[
                  'rounded-full border px-md py-sm text-body-sm transition-colors duration-200',
                  useSaved
                    ? 'border-transparent bg-surface-tertiary-1000 text-text-secondary-100'
                    : 'border-border-default bg-surface-secondary-100 text-text-secondary-700',
                ].join(' ')}
              >
                Saved address
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!useSaved}
                onClick={() => setUseSaved(false)}
                className={[
                  'rounded-full border px-md py-sm text-body-sm transition-colors duration-200',
                  !useSaved
                    ? 'border-transparent bg-surface-tertiary-1000 text-text-secondary-100'
                    : 'border-border-default bg-surface-secondary-100 text-text-secondary-700',
                ].join(' ')}
              >
                Different address
              </button>
            </div>
          )}

          {useSaved && savedAddress ? (
            <div className="flex w-full flex-col gap-xs rounded-md border border-border-default bg-surface-secondary-100 p-md-sm">
              <p className="text-body-sm font-medium text-text-secondary-1000">
                {savedAddress.fields.label || 'Saved address'}
              </p>
              <p className="text-body-xs text-text-secondary-700">{formatAddress(savedAddress.fields)}</p>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-md-sm">
              <FieldGrid
                fields={REQUEST_ADDRESS_FIELDS}
                values={values}
                showErrors={showErrors}
                onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
              />
              <Checkbox
                checked={saveForFuture}
                onChange={setSaveForFuture}
                label="Save this address for future requests"
              />
            </div>
          )}

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
            className="flex w-full items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100"
          >
            Submit request
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
