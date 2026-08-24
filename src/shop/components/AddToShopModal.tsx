import { useState } from 'react'
import type { Product } from '../types'
import { Icon } from './Icon'
import { Toggle } from './Toggle'
import { VariantSelect } from './VariantSelect'

type AddToShopModalProps = {
  product: Product
  featuredCount: number
  featuredLimit: number
  onClose: () => void
  onConfirm: (featured: boolean) => void
  /** Called instead of enabling the toggle when all `featuredLimit` slots are
   *  already taken — the caller shows the 6/6 limit toast. */
  onFeatureBlocked: () => void
}

export function AddToShopModal({
  product,
  featuredCount,
  featuredLimit,
  onClose,
  onConfirm,
  onFeatureBlocked,
}: AddToShopModalProps) {
  const [featured, setFeatured] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(product.variant)
  const atLimit = featuredCount >= featuredLimit
  const nextFeaturedCount = featured ? featuredCount + 1 : featuredCount

  function handleFeatureToggle(next: boolean) {
    if (next && atLimit) {
      onFeatureBlocked()
      return
    }
    setFeatured(next)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-scrim" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add this product to your shop?"
        className="flex w-[525px] flex-col items-center overflow-clip rounded-lg border border-border-default bg-surface-secondary-100"
      >
        <div className="flex w-full items-center justify-between border-b border-border-default px-lg py-md">
          <p className="flex-1 text-body-xl font-semibold text-text-secondary-1000">
            Add this product to your shop?
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex w-[40px] items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
          >
            <Icon name="x" srcSize={24} />
          </button>
        </div>

        <div className="flex w-full flex-col gap-lg px-lg pt-md pb-lg">
          <div className="flex w-full flex-col gap-[18px]">
            <div className="flex w-full flex-col gap-fourteen overflow-clip rounded-[7px] bg-surface-secondary-300">
              <div className="flex w-full items-center rounded-t-md bg-surface-tertiary-100 px-ten py-sm">
                <p className="text-body-xs font-medium text-text-secondary-700">
                  This product is available only in{' '}
                  <span className="text-text-secondary-900">{product.regions.join(' & ')}</span>
                </p>
              </div>

              <div className="flex w-full items-center gap-lg px-md pb-[15px]">
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
                      onChange={setSelectedVariant}
                    />
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

            <div className="flex w-full items-center justify-between rounded-[12px] bg-surface-secondary-300 p-md-sm">
              <div className="flex flex-col justify-center gap-[2px]">
                <p className="text-body-sm text-surface-secondary-1000">Feature on home storefront</p>
                <p className="text-body-xxs font-medium text-text-secondary-700">
                  {nextFeaturedCount}/{featuredLimit} Featured products added
                </p>
              </div>
              <Toggle
                checked={featured}
                onChange={handleFeatureToggle}
                label="Feature on home storefront"
                disabled={atLimit}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onConfirm(featured)}
            className="flex w-full items-center justify-center gap-sm rounded-md bg-surface-primary-500 px-md py-sm text-body-sm font-medium text-text-secondary-100"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
