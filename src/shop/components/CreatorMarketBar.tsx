import ProfilePhoto from '../../portal/components/ProfilePhoto'

/** The bar states which market the shopper is buying in, and its currency. */
const CURRENCY_BY_COUNTRY: Record<string, string> = {
  Singapore: 'SGD',
  Indonesia: 'IDR',
  Malaysia: 'MYR',
  Thailand: 'THB',
  Vietnam: 'VND',
}

type CreatorMarketBarProps = {
  name: string
  country: string
  /** Tapping the creator's name returns to their storefront. */
  onBack: () => void
}

/**
 * "You're shopping <creator>'s Picks · Shipping to <country>" strip shown above
 * a product page in the storefront preview (Figma `916:66683`). Rendered by
 * `StorefrontPreview` rather than the product page itself, so it can sit in the
 * same sticky block as the preview header.
 */
export function CreatorMarketBar({ name, country, onBack }: CreatorMarketBarProps) {
  const currency = CURRENCY_BY_COUNTRY[country] ?? CURRENCY_BY_COUNTRY.Singapore

  return (
    <div className="flex w-full items-center justify-between overflow-clip border-b border-border-default bg-surface-secondary-100 px-margin py-md-sm">
      <div className="flex items-center gap-sm">
        <span className="relative size-[24px] shrink-0 overflow-hidden rounded-full">
          <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="" />
        </span>
        <p className="text-body-sm leading-[1.4] whitespace-nowrap text-text-secondary-700">
          You&apos;re shopping{' '}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-body-sm leading-[1.4] font-semibold whitespace-nowrap text-text-secondary-1000 underline"
        >
          {name}&apos;s Picks
        </button>
      </div>
      <p className="text-body-sm leading-[1.4] font-medium whitespace-nowrap text-text-secondary-1000">
        Shipping to {country} · {currency}
      </p>
    </div>
  )
}
