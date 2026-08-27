import { useEffect, useState } from 'react'
import { Accordion } from './Accordion'
import { Button } from './Button'
import { Icon } from './Icon'
import { NotifyMeDialog } from './NotifyMeDialog'
import { StorefrontBreadcrumb } from './StorefrontBreadcrumb'
import type { ShopItem } from '../types'

type StorefrontProductDetailProps = {
  item: ShopItem
  country: string
  onBack: () => void
  /** Storefront owner, for the notify-me confirmation's "Back to X's shop".
   *  Defaults to the design's creator so the preview can leave it off. */
  creatorName?: string
}

/** "50 ML | Clear essence" -> "50ml" — the size Figma shows on the size chips
 *  and appended to the product title. */
function variantSizeSuffix(variant: string): string {
  return variant.split('|')[0]!.trim().replace(/\s+/g, '').toLowerCase()
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <span className="flex items-center py-xs">
      <Icon name={selected ? 'radio-selected' : 'radio'} size={16} />
    </span>
  )
}

/**
 * The customer-facing product page inside the storefront preview (Figma
 * `916:66643`). The design's own e-commerce header (nav links, search, cart)
 * is deliberately skipped — the preview already has `StorefrontHeader` — and
 * the creator market bar above it is rendered by `StorefrontPreview`, which
 * owns the sticky block. The purchase block is replaced by a notify-me notice
 * when the product doesn't ship to the previewed country, matching the
 * storefront's own availability treatment (`916:65605`).
 */
export function StorefrontProductDetail({
  item,
  country,
  onBack,
  creatorName = 'Charlotte',
}: StorefrontProductDetailProps) {
  const { product } = item
  const [notifyOpen, setNotifyOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.variant)
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time')
  const [quantity, setQuantity] = useState(1)
  const available = product.regions.includes(country)
  const hasDiscount = product.shopCompareAt.trim().length > 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex w-full flex-col items-center">
      {/* Product Details / Desktop — the 1200px content column */}
      <div className="flex w-full max-w-[1200px] flex-col items-start">
        {/* The product's own shelf path (Figma `916:66734`), not the route that
            got here: Home is the only crumb with somewhere to go, since the
            department and category pages don't exist yet. */}
        <StorefrontBreadcrumb
          items={[
            { label: 'Home', onClick: onBack },
            { label: product.department },
            { label: product.category },
            { label: product.name },
          ]}
        />

        <div className="flex w-full items-start gap-5xl">
          {/* Image Gallery */}
          <div className="flex min-w-0 flex-1 flex-col items-start gap-md-sm">
            <div className="relative aspect-[533/531.45] w-full overflow-clip rounded-lg">
              <img
                src={product.heroImage}
                alt={product.name}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute top-0 right-0 flex items-center justify-end gap-sm p-md">
                <button
                  type="button"
                  aria-label="Save to wishlist"
                  className="flex items-center justify-center overflow-clip rounded-md bg-surface-primary-500 p-md-sm"
                >
                  <Icon name="heart" size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Share product"
                  className="flex items-center justify-center overflow-clip rounded-md bg-surface-secondary-100 p-md-sm"
                >
                  <Icon name="share" size={16} />
                </button>
              </div>
              {!available && (
                /* Larger than the product card's badge (`916:65608`): 12px text
                   and 14/7 padding, inset 20px rather than 12px. */
                <span className="absolute top-md-2 left-md-2 flex items-center overflow-clip rounded-full bg-white px-[14px] py-[7px] text-body-xs leading-[1.4] font-semibold tracking-[0.6px] whitespace-pre text-text-secondary-1000">
                  NOT AVAILABLE
                </span>
              )}
            </div>

            {/* Thumbnail Carousel — the arrows occupy a thumbnail slot each. */}
            <div className="flex w-full items-center gap-md-sm">
              <div className="flex aspect-square min-w-0 flex-1 items-center justify-center overflow-clip rounded-sm">
                <button
                  type="button"
                  aria-label="Previous images"
                  className="flex w-[40px] items-center justify-center overflow-clip rounded-full border border-border-default p-md-sm"
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
                  <img src={thumbnail} alt="" className="absolute inset-0 size-full rounded-sm object-cover" />
                </div>
              ))}
              <div className="flex aspect-square min-w-0 flex-1 items-center justify-center overflow-clip rounded-sm">
                <button
                  type="button"
                  aria-label="Next images"
                  className="flex w-[40px] items-center justify-center overflow-clip rounded-full border border-border-default p-md-sm"
                >
                  <Icon name="chevron-right" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Column */}
          <div className="flex w-[568px] shrink-0 flex-col items-start gap-xxl">
            {/* Purchase Options */}
            <div className="flex w-full flex-col items-start gap-md">
              {/* Product Overview */}
              <div className="flex w-full flex-col items-start gap-ten">
                <div className="flex w-full flex-col items-start gap-xs">
                  <div className="flex w-full flex-col items-start gap-[2px]">
                    <p className="w-full text-body-sm font-medium text-text-secondary-700">{product.brand}</p>
                    <p className="w-full text-body-md font-medium text-text-secondary-1000">
                      {product.name} ({variantSizeSuffix(selectedSize)})
                    </p>
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

                {available && (
                  /* Price and Delivery */
                  <div className="flex w-full flex-col items-start gap-[2px]">
                    <div className="flex w-full items-center">
                      <div className="flex items-center gap-ten">
                        <p className="text-body-xxl font-semibold whitespace-nowrap text-text-secondary-1000">
                          {product.price}
                        </p>
                        {hasDiscount && (
                          <div className="flex items-center gap-xs">
                            <p className="text-body-sm leading-[22px] whitespace-nowrap text-text-secondary-600 line-through">
                              {product.shopCompareAt}
                            </p>
                            <span className="flex items-center justify-center rounded-[99px] bg-[rgba(152,237,156,0.3)] px-md-sm py-xs text-body-xs font-medium whitespace-nowrap text-text-success">
                              {product.savePct}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="w-full text-body-md font-medium text-text-tertiary-900">
                      Delivered in 2–3 days
                    </p>
                  </div>
                )}
              </div>

              {available ? (
                <>
                  {/* Size Selector */}
                  <div className="flex flex-col items-start justify-center gap-sm">
                    <p className="whitespace-nowrap text-body-md font-medium text-text-secondary-1000">
                      Choose Size
                    </p>
                    <div className="flex items-center gap-sm">
                      {product.variantOptions.map((option) => {
                        const isSelected = option === selectedSize
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedSize(option)}
                            className={[
                              'flex items-center justify-center rounded-sm px-md-sm py-[6px] text-body-sm font-medium whitespace-nowrap',
                              isSelected
                                ? 'bg-surface-primary-500 text-text-secondary-100'
                                : 'border border-border-outlined text-text-secondary-700',
                            ].join(' ')}
                          >
                            {variantSizeSuffix(option)}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Type — subscription card + CTA row */}
                  <div className="flex w-full flex-col items-start gap-fourteen">
                    <div className="flex w-[343px] flex-col items-start rounded-lg border border-border-default bg-surface-secondary-100 px-md">
                      <button
                        type="button"
                        onClick={() => setPurchaseType('one-time')}
                        className="flex w-full items-start gap-md-sm border-b border-border-default py-[18px] text-left"
                      >
                        <Radio selected={purchaseType === 'one-time'} />
                        <span className="flex min-w-px flex-1 flex-col items-start justify-center">
                          <span className="w-full text-body-md font-medium text-text-secondary-1000">
                            One-time purchase
                          </span>
                          <span className="w-full text-body-md text-text-secondary-700">
                            {product.oneTimePurchase}
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPurchaseType('subscribe')}
                        className="flex w-full items-start gap-md-sm py-[18px] text-left"
                      >
                        <Radio selected={purchaseType === 'subscribe'} />
                        <span className="flex min-w-px flex-1 flex-col items-start justify-center gap-[6px]">
                          <span className="w-full text-body-md font-medium text-text-secondary-1000">
                            {product.subscription}
                          </span>
                          <span className="flex w-full items-center gap-sm rounded-[48px] bg-surface-tertiary-100 px-md py-xs">
                            <Icon name="auto-delivery" size={16} />
                            <span className="flex-1 text-body-xs font-medium text-surface-tertiary-1000">
                              Monthly Refill • Auto-delivery
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>

                    <div className="flex w-full items-center gap-md-sm">
                      {/* `self-stretch` matches Figma's `self-stretch` + `h-full`
                          on this input, so it's exactly as tall as the buttons
                          beside it rather than hugging its own content. */}
                      <div className="flex items-center gap-sm self-stretch rounded-md border border-border-default px-md py-xs">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                          className="flex items-center justify-center overflow-clip rounded-sm p-xs"
                        >
                          <Icon name="minus" size={16} />
                        </button>
                        <span className="whitespace-nowrap text-body-md font-medium text-text-secondary-1000">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity((current) => current + 1)}
                          className="flex items-center justify-center overflow-clip rounded-sm p-xs"
                        >
                          <Icon name="plus" size={16} />
                        </button>
                      </div>
                      <Button variant="outline" className="min-w-px flex-1">
                        Add To Bag
                        {/* The dark-stroke export — `shopping-bag` is the light
                            variant for the product card's filled circle. No
                            `srcSize`: this export is larger than its slot, so
                            the preflight `max-width` already fits it to 16px
                            and a transform on top would shrink it twice. */}
                        <Icon name="shopping-cart" size={16} />
                      </Button>
                      <Button variant="primary" className="min-w-px flex-1">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                /* Panel / Not available in market (`916:66778`) */
                <div className="flex w-full flex-col items-start gap-md overflow-clip rounded-md bg-surface-tertiary-100 p-md-2">
                  <div className="flex w-full flex-col items-start gap-[6px]">
                    <p className="text-body-lg leading-[1.4] font-semibold text-text-secondary-1000">
                      This product doesn&apos;t ship to {country} yet.
                    </p>
                    <p className="w-full text-body-sm leading-[1.4] text-text-secondary-700">
                      Get notified as soon as it becomes available in your country.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    className="w-[198px]"
                    onClick={() => setNotifyOpen(true)}
                  >
                    <Icon name="bell-inverse" size={16} />
                    Notify me
                  </Button>
                  <div className="h-px w-full bg-[#e6e5e4]" />
                  <p className="text-body-sm leading-[1.4] text-text-secondary-700">
                    Available in {product.regions.join(', ')}
                  </p>
                </div>
              )}
            </div>

            <Accordion
              items={[
                { icon: 'info', title: 'Product Details', body: product.details.productDetails },
                { icon: 'flask', title: 'Ingredients', body: product.details.ingredients },
                { icon: 'book-open', title: 'How To Use', body: product.details.howToUse },
              ]}
            />
          </div>
        </div>
      </div>

      {/* spacer / before footer */}
      <div className="h-[64px] w-full shrink-0" />

      {notifyOpen && (
        <NotifyMeDialog
          product={product}
          country={country}
          creatorName={creatorName}
          onClose={() => setNotifyOpen(false)}
          onBackToShop={() => {
            setNotifyOpen(false)
            onBack()
          }}
        />
      )}
    </div>
  )
}
