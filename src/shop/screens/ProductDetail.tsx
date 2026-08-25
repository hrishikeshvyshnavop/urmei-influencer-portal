import { Accordion } from '../components/Accordion'
import { Breadcrumb } from '../components/Breadcrumb'
import { Icon } from '../components/Icon'
import { PerformanceStats } from '../components/PerformanceStats'
import type { Product } from '../types'

type BreadcrumbItem = { label: string; onClick?: () => void }

export type ShopMode = {
  featured: boolean
  /** The variant actually chosen when this item was added to the shop —
   *  distinct from `product.shopVariant`, which is just the catalogue default. */
  variant: string
  onToggleFeatured: () => void
  onRemoveFromShop: () => void
  affiliateLink: string
  onCopyLink: () => void
  /** The link only resolves once the shop is live — shows a "publish first"
   *  placeholder instead, matching the Shop URL field's own state. */
  published: boolean
  /** Only the My Shop "view details" reuse shows the PERFORMACE block. */
  showPerformance?: boolean
}

type ProductDetailProps = {
  product: Product
  /** Applies the subtle entry transition when this view opens inside a modal shell. */
  animateOnMount?: boolean
  onBackToCatalogue?: () => void
  onBackToResults?: () => void
  onAddToShop?: () => void
  /** Overrides the default Catalogue › Search › name trail — used when this
   *  screen is reused from My Shop's "View product details" menu action. */
  breadcrumbItems?: BreadcrumbItem[]
  /** Replaces the "Add product to my shop" CTA, e.g. for an item already in the shop. */
  ctaLabel?: string
  ctaDisabled?: boolean
  /** Set when viewing an item already in the shop: swaps the single CTA for
   *  featured/remove management buttons, an affiliate-link row, and adds the
   *  "PERFORMACE" stats section below. */
  shopMode?: ShopMode
}

function StatPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-xs">
      <p className="text-body-sm font-medium text-text-tertiary-800">{label}</p>
      <p className="text-body-md font-medium text-text-secondary-1000">{value}</p>
    </div>
  )
}

export function ProductDetail({
  product,
  animateOnMount = false,
  onBackToCatalogue,
  onBackToResults,
  onAddToShop,
  breadcrumbItems,
  ctaLabel = 'Add product to my shop',
  ctaDisabled = false,
  shopMode,
}: ProductDetailProps) {
  return (
    <div className={`flex w-full flex-col items-start ${animateOnMount ? 'motion-product-detail' : ''}`}>
      <div className="w-full px-margin py-sm">
        <Breadcrumb
          items={
            breadcrumbItems ?? [
              { label: 'Catalogue', onClick: onBackToCatalogue },
              { label: 'Search', onClick: onBackToResults },
              { label: product.name },
            ]
          }
        />
      </div>

      <div className="flex w-full items-start gap-5xl px-margin pb-5xl">
        {/* Image gallery */}
        <div className="flex min-w-0 flex-1 flex-col items-start gap-md-sm">
          <div className="relative aspect-[533/531.45] w-full overflow-clip rounded-lg">
            <img
              src={product.heroImage}
              alt={product.name}
              className="absolute inset-0 size-full object-cover"
            />
            {shopMode?.featured && (
              <div className="absolute top-0 right-0 flex items-center p-md">
                <span className="flex items-center gap-sm rounded-md bg-surface-primary-800 px-md py-sm text-body-sm font-medium text-text-tertiary-100 capitalize">
                  <Icon name="star-featured" />
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="flex w-full items-center gap-md-sm">
            <div className="flex aspect-square min-w-0 flex-1 items-center justify-center overflow-clip rounded-sm">
              <button
                type="button"
                aria-label="Previous images"
                className="flex size-[40px] items-center justify-center overflow-clip rounded-full border border-border-default"
              >
                <Icon name="chevron-left" />
              </button>
            </div>
            {product.thumbnails.map((thumbnail, index) => (
              <div
                key={`${thumbnail}-${index}`}
                className={[
                  'relative aspect-square min-w-0 flex-1 rounded-sm',
                  index === 0 ? 'border border-border-outlined' : '',
                ].join(' ')}
              >
                <img
                  src={thumbnail}
                  alt=""
                  className="absolute inset-0 size-full rounded-sm object-cover"
                />
              </div>
            ))}
            <div className="flex aspect-square min-w-0 flex-1 items-center justify-center overflow-clip rounded-sm">
              <button
                type="button"
                aria-label="Next images"
                className="flex size-[40px] items-center justify-center overflow-clip rounded-full border border-border-default"
              >
                <Icon name="chevron-right" />
              </button>
            </div>
          </div>
        </div>

        {/* Details column */}
        <div className="flex w-[568px] flex-col items-start gap-xxl">
          <div className="flex w-full flex-col items-start gap-lg">
            <div className="flex w-full flex-col gap-md-sm">
              <div className="flex w-full flex-col gap-sm">
                <div className="flex w-full flex-col gap-[2px]">
                  <p className="text-body-sm font-medium text-text-secondary-700">
                    {product.brand}
                  </p>
                  <p className="w-[481px] text-body-xl font-medium text-text-secondary-1000">
                    {product.name}
                  </p>
                  {shopMode && (
                    <p className="text-body-md text-text-secondary-700">{shopMode.variant}</p>
                  )}
                </div>
                <div className="flex w-full items-center gap-[6px]">
                  <span className="flex w-[46px] items-center gap-[6px]">
                    <Icon name="star" size={20} />
                    <span className="flex-1 text-body-sm font-medium text-text-secondary-1000">
                      {product.rating}
                    </span>
                  </span>
                  <span className="flex-1 text-body-sm text-text-secondary-600">
                    ({product.reviewCount})
                  </span>
                </div>
              </div>
              <div className="flex w-full items-center gap-md-sm">
                {shopMode ? (
                  <>
                    <p className="text-body-xl font-medium text-text-secondary-1000">
                      {product.price}
                    </p>
                    {product.shopCompareAt.trim().length > 0 && (
                      <>
                        <p className="text-body-md text-text-secondary-600 line-through">
                          {product.shopCompareAt}
                        </p>
                        <span className="flex items-center justify-center rounded-[99px] bg-[rgba(152,237,156,0.3)] px-md-sm py-xs text-body-xs font-medium text-text-success">
                          {product.savePct}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-body-xl font-medium text-text-secondary-1000">
                    {product.priceRange}
                  </p>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-md-2">
              <div className="flex w-full flex-col items-start gap-md">
                <div className="flex w-full flex-col gap-sm">
                  <p className="text-body-sm text-text-secondary-800">
                    Purchase options for customers{' '}
                  </p>
                  <div className="flex w-full flex-col overflow-clip rounded-[12px] bg-surface-tertiary-300 p-md-2">
                    <div className="flex w-full items-center gap-lg px-md">
                      <div className="flex w-[244px] flex-col gap-xs">
                        <p className="text-body-md font-medium text-text-secondary-1000">
                          One-time purchase
                        </p>
                        <p className="text-body-sm font-medium text-text-tertiary-800">
                          {product.oneTimePurchase}
                        </p>
                      </div>
                      <div className="h-[40px] w-px bg-border-default" />
                      <div className="flex w-[244px] flex-col gap-xs">
                        <p className="text-body-md font-medium text-text-secondary-1000">
                          Monthly subscription
                        </p>
                        <p className="text-body-sm font-medium text-text-tertiary-800">
                          {product.subscription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start justify-center rounded-lg border border-border-default bg-surface-secondary-100">
                  <div className="flex w-full items-center gap-lg p-md">
                    <StatPair label="Commission" value={product.commissionPerSale} />
                    <div className="h-[40px] w-px bg-border-default" />
                    <StatPair label="Available Regions" value={product.regions.join(', ')} />
                  </div>
                </div>
              </div>

              {shopMode ? (
                <>
                  <div className="flex w-full items-center gap-md-sm">
                    <button
                      type="button"
                      onClick={shopMode.onToggleFeatured}
                      className="flex flex-1 items-center justify-center gap-sm rounded-md border border-border-default px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
                    >
                      {shopMode.featured ? 'Remove from featured' : 'Add to featured'}
                    </button>
                    <button
                      type="button"
                      onClick={shopMode.onRemoveFromShop}
                      className="flex flex-1 items-center justify-center gap-sm rounded-md border border-surface-other-alert px-md py-sm text-body-sm font-medium text-surface-other-alert capitalize"
                    >
                      <Icon name="trash-2" />
                      Remove from shop
                    </button>
                  </div>

                  <div className="flex w-full items-center justify-between rounded-md border border-border-default bg-surface-secondary-100 px-md-sm py-[6px]">
                    <div className="flex w-[240px] flex-col whitespace-nowrap">
                      <p className="mb-[-2px] text-body-xxs text-text-secondary-700">
                        Product affiliate link
                      </p>
                      {shopMode.published ? (
                        <p className="truncate text-body-sm font-medium text-text-secondary-900">
                          {shopMode.affiliateLink}
                        </p>
                      ) : (
                        <p className="truncate text-body-sm font-medium text-text-secondary-600">
                          Publish shop to get your product URL
                        </p>
                      )}
                    </div>
                    {shopMode.published ? (
                      <button type="button" aria-label="Copy affiliate link" onClick={shopMode.onCopyLink}>
                        <Icon name="copy" />
                      </button>
                    ) : (
                      <Icon name="copy" />
                    )}
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onAddToShop}
                  disabled={ctaDisabled}
                  className={[
                    'flex w-full items-center justify-center gap-sm rounded-md px-md py-sm text-body-sm font-medium capitalize',
                    ctaDisabled
                      ? 'cursor-default bg-surface-secondary-300 text-text-secondary-500'
                      : 'bg-surface-primary-500 text-text-secondary-100',
                  ].join(' ')}
                >
                  {ctaLabel}
                </button>
              )}
            </div>
          </div>

          <Accordion
            items={[
              { icon: 'info', title: 'Product Details', body: product.details.productDetails },
              { icon: 'flask', title: 'Ingredients', body: product.details.ingredients },
              { icon: 'book-open', title: 'How To Use', body: product.details.howToUse },
              { icon: 'return', title: 'Authenticity & Return Policy', body: product.details.returns },
            ]}
          />
        </div>
      </div>

      {shopMode?.showPerformance && <PerformanceStats data={product.performance} />}
    </div>
  )
}
