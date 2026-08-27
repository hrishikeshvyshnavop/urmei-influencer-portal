/**
 * "No products available for shipping to your country" banner (Figma
 * `916:65473`, "Notice / market has no availability yet"). Shown on a
 * storefront whose picks all fall outside the shopper's selected market —
 * distinct from the per-product notice on a product page, which names the
 * country and offers a Notify me button (`StorefrontProductDetail`).
 *
 * Shared by the creator's storefront preview and the public storefront, which
 * differ only in the gap the surrounding column puts around it.
 */
export function NoAvailabilityNotice() {
  return (
    <div className="flex w-full flex-col items-start gap-xs rounded-md bg-surface-tertiary-100 px-lg py-md-2">
      <p className="w-full text-body-md font-medium text-text-secondary-1000">
        Currently, there are no products available for shipping to your country.
      </p>
      <p className="w-full text-body-sm text-text-secondary-700">
        Tap the bell icon to get notified when it becomes available.
      </p>
    </div>
  )
}
