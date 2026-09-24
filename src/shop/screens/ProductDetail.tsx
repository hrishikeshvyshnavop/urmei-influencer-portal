import { BookOpen, FlaskConical, Info, Undo2 } from 'lucide-react'
import { Accordion } from '../components/Accordion'
import { Breadcrumb } from '../components/Breadcrumb'
import { CreatorTestimonials } from '../components/CreatorTestimonials'
import { Icon } from '../components/Icon'
import { PerformanceStats } from '../components/PerformanceStats'
import type { Product } from '../types'

type BreadcrumbItem = { label: string; onClick?: () => void }

export type ShopMode = {
  favorite: boolean
  /** The variant actually chosen when this item was added to the shop —
   *  distinct from the product's catalogue-wide `variant`/`variantOptions`. */
  variant: string
  onToggleFavorite: () => void
  onRemoveFromShop: () => void
  affiliateLink: string
  onCopyLink: () => void
  /** Whether this item is on the live storefront — false for an unpublished
   *  shop and for a product added since the last publish. The link row shows a
   *  "publish first" placeholder instead, matching the Shop URL field. */
  published: boolean
  /** Only the My Shop "view details" reuse shows the PERFORMANCE block. */
  showPerformance?: boolean
  /** This item's stats page, where the performance card's columns lead. */
  statsHref: string
}

type ProductDetailProps = {
  product: Product
  /** Applies the subtle entry transition when this view opens inside a modal shell. */
  animateOnMount?: boolean
  onBackToCatalogue?: () => void
  onBackToResults?: () => void
  onAddToShop?: () => void
  onRequestSample?: () => void
  /** Overrides the default Catalogue › Search › name trail — used when this
   *  screen is reused from My Shop's "View product details" menu action. */
  breadcrumbItems?: BreadcrumbItem[]
  /** Hides the trail when the detail view is opened directly from Home. */
  hideBreadcrumb?: boolean
  /** Replaces the "Add product to shop" CTA, e.g. for an item already in the shop. */
  ctaLabel?: string
  ctaDisabled?: boolean
  /** Shows "What Creators Say" and the review prompt even outside My Shop's
   *  own page — the Your Reviews list opens products with it, so the review
   *  that led there is on screen. */
  showReviews?: boolean
  /** Set when viewing an item already in the shop: swaps the single CTA for
   *  favorite/remove management buttons, an affiliate-link row, and adds the
   *  "PERFORMANCE" stats section below. */
  shopMode?: ShopMode
}

/** "50 ML | Blue gel cream" -> "50ml" — the size suffix Figma appends to the
 *  product title once a specific variant is in the shop (`980:25543`). */
function variantSizeSuffix(variant: string): string {
  return variant.split('|')[0]!.trim().replace(/\s+/g, '').toLowerCase()
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
  onRequestSample,
  breadcrumbItems,
  hideBreadcrumb = false,
  ctaLabel = 'Add product to shop',
  ctaDisabled = false,
  shopMode,
  showReviews = false,
}: ProductDetailProps) {
  const showPerformance = Boolean(shopMode?.showPerformance)
  const showReviewSection = showReviews || showPerformance

  // Not-yet-added products have no chosen variant, so fall back to the
  // catalogue's default — Figma (980:25543) shows the size on this page
  // whether or not the item is in the shop.
  const displayVariant = shopMode ? shopMode.variant : product.variant

  return (
    <div className={`flex w-full flex-col items-start ${animateOnMount ? 'motion-product-detail' : ''}`}>
      {!hideBreadcrumb && (
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
      )}

      <div className={`flex w-full items-start gap-5xl px-margin ${showReviewSection ? '' : 'pb-5xl'} ${hideBreadcrumb ? 'pt-lg' : ''}`}>
        {/* Image gallery */}
        <div className="flex min-w-0 flex-1 flex-col items-start gap-md-sm">
          <div className="relative aspect-[533/531.45] w-full overflow-clip rounded-lg">
            <img
              src={product.heroImage}
              alt={product.name}
              className="absolute inset-0 size-full object-cover"
            />
            {shopMode?.favorite && (
              <div className="absolute top-0 right-0 flex items-center p-md">
                <span className="flex items-center gap-sm rounded-md bg-surface-primary-800 px-md py-sm text-body-sm font-medium text-text-tertiary-100 capitalize">
                  <Icon name="star-featured" />
                  Favorite
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
                    {product.name} ({variantSizeSuffix(displayVariant)})
                  </p>
                  <p className="text-body-md text-text-secondary-700">{displayVariant}</p>
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
                  <div className="flex w-full flex-col gap-lg p-md">
                    <div className="flex w-full items-center gap-lg">
                      <StatPair label="Commission" value={product.commissionPerSale} />
                      <div className="h-[40px] w-px bg-border-default" />
                      <StatPair label="Available Regions" value={product.regions.join(', ')} />
                    </div>
                    {/* Figma `1030:27801` — the sample request sits inside the commission card. */}
                    {onRequestSample && (
                      <button
                        type="button"
                        onClick={onRequestSample}
                        className="flex w-full items-center justify-center gap-sm rounded-lg bg-surface-secondary-300 px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
                      >
                        Request sample
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {shopMode ? (
                <>
                  <div className="flex w-full items-center gap-md-sm">
                    <button
                      type="button"
                      onClick={shopMode.onToggleFavorite}
                      className="flex flex-1 items-center justify-center gap-sm rounded-md border border-border-default px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
                    >
                      {shopMode.favorite ? 'Remove From Favorite' : 'Add To Favorite'}
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
              { icon: Info, title: 'Product Details', body: product.details.productDetails },
              { icon: FlaskConical, title: 'Ingredients', body: product.details.ingredients },
              { icon: BookOpen, title: 'How To Use', body: product.details.howToUse },
              { icon: Undo2, title: 'Authenticity & Return Policy', body: product.details.returns },
            ]}
          />
        </div>
      </div>

      {/* Figma `1030:25394`: under the product sits what other creators say,
          the prompt to review it, then this item's performance. */}
      {showReviewSection && (
        <div className="flex w-full flex-col gap-[72px] px-margin pt-3xl pb-[100px]">
          <CreatorTestimonials product={product} />
          {shopMode && showPerformance ? (
            <PerformanceStats product={product} statsHref={shopMode.statsHref} />
          ) : null}
        </div>
      )}
    </div>
  )
}
