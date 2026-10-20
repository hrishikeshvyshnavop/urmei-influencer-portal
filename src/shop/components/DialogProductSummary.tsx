import type { Product } from '../types'

/**
 * The product card at the top of product dialogs (Figma component
 * `1857:25209` "Dialog Product Summary"): image, brand, name, chosen variant,
 * price with the struck-through compare-at and the commission badge, on the
 * light surface. Used by Add to collection; the older Remove product and Add
 * to shop dialogs still draw their own copy of it.
 */
export function DialogProductSummary({ product, variant }: { product: Product; variant: string }) {
  return (
    <div className="flex w-full items-center gap-lg overflow-clip rounded-md bg-surface-secondary-300 p-md">
      <img
        src={product.heroImage}
        alt=""
        className="h-[135px] w-[136px] shrink-0 rounded-lg border border-border-default object-cover"
      />
      <div className="flex min-w-px flex-1 flex-col gap-fourteen">
        <div className="flex w-full flex-col gap-[6px]">
          <div className="flex w-full flex-col gap-xs">
            <p className="text-body-xxs font-medium text-text-secondary-700">{product.brand}</p>
            <p className="text-body-sm font-medium text-text-secondary-1000">{product.name}</p>
          </div>
          <p className="text-body-xs text-text-secondary-700">{variant}</p>
        </div>
        <div className="flex w-full items-center gap-[6px]">
          <div className="flex items-center gap-xs">
            <p className="text-body-md font-medium text-text-secondary-1000">{product.price}</p>
            <p className="text-body-xs font-medium text-text-secondary-600 line-through">
              {product.modalCompareAt}
            </p>
          </div>
          <span className="flex items-center justify-center gap-xs rounded-[24px] bg-surface-tertiary-500 px-sm py-[2px] text-body-xs text-text-secondary-900">
            <span className="font-medium text-text-secondary-1000">{product.commissionBadge}</span>{' '}
            Commission
          </span>
        </div>
      </div>
    </div>
  )
}
