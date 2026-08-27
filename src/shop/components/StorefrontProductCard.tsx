import type { Product } from '../types'
import { Icon } from './Icon'

type StorefrontProductCardProps = {
  product: Product
  /** Width of the card's own box, and the only thing that sets its size —
   *  everything inside is relative to it. The "Top Featured Products" strip
   *  passes a fixed width so cards keep a consistent size while scrolling;
   *  the "All Picks" grid passes `w-full` so each card fills its responsive
   *  grid column instead of overflowing it — a fixed width there caused
   *  columns to overlap below ~1440px wide, since a grid column doesn't
   *  shrink a fixed-width child to fit. The 280px default is the design's
   *  own card width, for callers with no opinion. */
  className?: string
  /** Whether the product ships to the storefront's currently previewed
   *  country. Unavailable products swap the add-to-cart action for a
   *  notify-me one and get a "Not available" badge (Figma `916:65413`). */
  available?: boolean
  /** Opens the product detail page (Figma `916:66643`) when set. */
  onClick?: () => void
}

/**
 * Read-only product card used across the storefront preview (Figma `917:53442`)
 * — both the "Top Featured Products" strip and the "All Picks" grid share this
 * exact card, just a discount badge that only some products have.
 *
 * Height follows the content rather than the design's fixed 460px. That 460 is
 * arithmetic on a 280px-wide card (373.33 image + 12 gap + 75 info = 460.33),
 * so it stops being true the moment the card is any other width — at 288 the
 * image is 384 and the content runs 11px past a pinned box. Inside the featured
 * strip that was visible: `overflow-x: auto` makes `overflow-y` compute to
 * `auto`, so the spill turned into a stray vertical scroll within the row.
 * Cards in a row still line up — both the flex strip and the grid stretch their
 * items to the tallest.
 */
export function StorefrontProductCard({
  product,
  className = 'w-[280px]',
  available = true,
  onClick,
}: StorefrontProductCardProps) {
  const hasDiscount = product.shopCompareAt.trim().length > 0

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className={`flex shrink-0 flex-col items-start gap-md-sm ${onClick ? 'cursor-pointer text-left' : ''} ${className}`}
    >
      <div className="relative aspect-[280/373.33] w-full overflow-clip rounded-sm">
        <img src={product.shopCardImage} alt="" className="size-full object-cover" />
        {!available && (
          <>
            <span className="absolute top-md-sm left-md-sm flex items-center rounded-full bg-white px-[10px] py-[5px] text-[11px] font-semibold tracking-[0.6px] whitespace-pre text-text-secondary-1000">
              NOT AVAILABLE
            </span>
            <img
              src="/assets/icons/action-notify-me.svg"
              alt="Notify me when available"
              className="absolute right-md-sm bottom-md-sm size-[44px]"
            />
          </>
        )}
      </div>
      <div className="flex w-full items-center gap-fourteen">
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="w-full text-body-sm text-text-secondary-700">{product.brand}</p>
          <div className="flex w-full flex-col items-start gap-xs">
            <p className="w-full truncate text-body-md font-medium text-text-secondary-1000">
              {product.name}
            </p>
            {available && (
              <div className="flex w-full items-center gap-sm">
                <p className="shrink-0 text-body-lg font-medium text-text-secondary-1000">{product.price}</p>
                {hasDiscount && (
                  <div className="flex min-w-0 flex-1 items-center gap-[6px]">
                    <p className="shrink-0 text-body-sm font-medium text-text-secondary-600 line-through">
                      {product.shopCompareAt}
                    </p>
                    <p className="truncate text-body-xs text-text-success">{product.savePct}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {available && (
          <span className="flex shrink-0 items-center justify-center rounded-full bg-surface-primary-500 p-md-sm">
            <Icon name="shopping-bag" srcSize={16.5} size={20} />
          </span>
        )}
      </div>
    </div>
  )
}
