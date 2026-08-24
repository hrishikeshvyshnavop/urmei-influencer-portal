import type { Product } from '../types'
import { Icon } from './Icon'

type StorefrontProductCardProps = {
  product: Product
}

/**
 * Read-only product card used across the storefront preview (Figma `917:53442`)
 * — both the "Top Featured Products" strip and the "All Picks" grid share this
 * exact card, just a discount badge that only some products have.
 */
export function StorefrontProductCard({ product }: StorefrontProductCardProps) {
  const hasDiscount = product.shopCompareAt.trim().length > 0

  return (
    <div className="flex h-[460px] w-[280px] shrink-0 flex-col items-start gap-md-sm">
      <div className="aspect-[280/373.33] w-full overflow-clip rounded-sm">
        <img src={product.shopCardImage} alt="" className="size-full object-cover" />
      </div>
      <div className="flex w-full items-center gap-fourteen">
        <div className="flex flex-1 flex-col items-start">
          <p className="w-full text-body-sm text-text-secondary-700">{product.brand}</p>
          <div className="flex w-full flex-col items-start gap-xs">
            <p className="w-full truncate text-body-md font-medium text-text-secondary-1000">
              {product.name}
            </p>
            <div className="flex w-full items-center gap-sm">
              <p className="text-body-lg font-medium text-text-secondary-1000">{product.price}</p>
              {hasDiscount && (
                <div className="flex flex-1 items-center gap-[6px]">
                  <p className="text-body-sm font-medium text-text-secondary-600 line-through">
                    {product.shopCompareAt}
                  </p>
                  <p className="text-body-xs text-text-success">{product.savePct}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="flex shrink-0 items-center justify-center rounded-full bg-surface-primary-500 p-md-sm">
          <Icon name="shopping-bag" srcSize={16.5} size={20} />
        </span>
      </div>
    </div>
  )
}
