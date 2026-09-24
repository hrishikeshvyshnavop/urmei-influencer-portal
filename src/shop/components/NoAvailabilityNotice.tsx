import { useState } from 'react'
import CountryModal from '../../portal/components/CountryModal'

type NoAvailabilityNoticeProps = {
  /** The shopper's selected market, named in the title. */
  country: string
  /** Renders the design's "Change Country" button, which opens the same
   *  `CountryModal` the header's language panel opens.
   *
   *  Set on the public storefront, where the market is the shopper's own and
   *  switching it is the way out of an empty storefront. Left off in the
   *  creator's preview, whose header offers no country control either — the
   *  region there belongs to the creator's account. */
  allowCountryChange?: boolean
}

/**
 * "No products available in <market> yet" notice (Figma `1616:66139`, "Notice /
 * market has no availability yet"). Shown on a storefront whose picks all fall
 * outside the shopper's selected market — distinct from the per-product notice
 * on a product page, which names the country and offers a Notify me button
 * (`StorefrontProductDetail`).
 *
 * Shared by the creator's storefront preview and the public storefront, which
 * differ in the gap the surrounding column puts around it and in whether the
 * market can be changed from here.
 */
export function NoAvailabilityNotice({ country, allowCountryChange = false }: NoAvailabilityNoticeProps) {
  const [countryModalOpen, setCountryModalOpen] = useState(false)

  return (
    <div className="flex w-full items-center gap-md overflow-clip rounded-md bg-surface-tertiary-100 px-lg py-md-2">
      {/* The design leads both lines at 1.4 rather than at the body tokens'
          22px, which is what keeps the row 86px tall. */}
      <div className="flex min-w-px flex-1 flex-col items-start gap-xs">
        <p className="w-full text-body-md leading-[1.4] font-semibold text-text-secondary-1000">
          No products available in {country} yet
        </p>
        <p className="w-full text-body-sm leading-[1.4] text-text-secondary-700">
          Tap the bell on any product to get notified when it becomes available.
        </p>
      </div>
      {allowCountryChange ? (
        <>
          <button
            type="button"
            onClick={() => setCountryModalOpen(true)}
            className="shrink-0 cursor-pointer rounded-lg bg-surface-secondary-100 px-md py-md-sm text-body-sm font-medium whitespace-nowrap capitalize text-text-secondary-1000"
          >
            Change Country
          </button>
          <CountryModal open={countryModalOpen} onClose={() => setCountryModalOpen(false)} />
        </>
      ) : null}
    </div>
  )
}
