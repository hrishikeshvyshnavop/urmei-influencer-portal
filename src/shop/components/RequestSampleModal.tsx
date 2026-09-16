import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { SampleShippingAddress } from '../sample-requests'
import type { Product } from '../types'
import { Icon } from './Icon'

type RequestSampleModalProps = {
  product: Product
  variant?: string
  onClose: () => void
  onSubmit: (input: { shippingAddress: SampleShippingAddress; note?: string }) => void
}

const EMPTY_ADDRESS: SampleShippingAddress = {
  fullName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  postalCode: '',
  country: '',
}

function Field({
  label,
  value,
  onChange,
  required = true,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  return (
    <label className="flex w-full flex-col gap-xs">
      <span className="text-body-sm font-medium text-text-secondary-1000">
        {label} {required ? null : <span className="font-normal text-text-secondary-600">(optional)</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-border-default bg-surface-secondary-100 px-md py-sm text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-600 focus:border-border-outlined"
      />
    </label>
  )
}

/**
 * "Request a sample" — a standalone flow, independent of whether the product
 * is in the creator's shop (see docs/prd/creator-reviews-and-sample-requests.md
 * §5.2). Urmei approves every request manually for now, so this only ever
 * writes a `requested` record; there's no in-app approval step here.
 */
export function RequestSampleModal({ product, variant, onClose, onSubmit }: RequestSampleModalProps) {
  const [address, setAddress] = useState<SampleShippingAddress>(EMPTY_ADDRESS)
  const [note, setNote] = useState('')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const canSubmit =
    address.fullName.trim().length > 0 &&
    address.addressLine1.trim().length > 0 &&
    address.city.trim().length > 0 &&
    address.postalCode.trim().length > 0 &&
    address.country.trim().length > 0

  function update<K extends keyof SampleShippingAddress>(key: K, value: string) {
    setAddress((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit({
      shippingAddress: { ...address, addressLine2: address.addressLine2?.trim() || undefined },
      note: note.trim() || undefined,
    })
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

          <div className="flex w-full flex-col gap-md-sm">
            <Field label="Full name" value={address.fullName} onChange={(value) => update('fullName', value)} />
            <Field
              label="Address line 1"
              value={address.addressLine1}
              onChange={(value) => update('addressLine1', value)}
            />
            <Field
              label="Address line 2"
              value={address.addressLine2 ?? ''}
              onChange={(value) => update('addressLine2', value)}
              required={false}
            />
            <div className="flex w-full items-start gap-md-sm">
              <Field label="City" value={address.city} onChange={(value) => update('city', value)} />
              <Field label="Postal code" value={address.postalCode} onChange={(value) => update('postalCode', value)} />
            </div>
            <Field label="Country" value={address.country} onChange={(value) => update('country', value)} />
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
            disabled={!canSubmit}
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
