import LanguageSelector from '../../portal/components/LanguageSelector'
import { Icon } from './Icon'

/** The header's fixed height in design px (Figma `916:65707`). `min-h` rather
 *  than `h` so it stays stable on viewports narrow enough for
 *  `LanguageSelector` to hide itself. */
const HEADER_HEIGHT = 88

/** Section links in the design. Rendered as plain text, not buttons — see the
 *  component note below. */
const NAV_LINKS = ['Categories', 'Brands', 'Influencers', 'Offers']

/** The count drawn on the cart badge in Figma. A design literal, not state:
 *  there is no cart on this page to read a real number from. */
const CART_COUNT = 8

/**
 * The public storefront's site header (Figma `916:65707`, "Header /
 * E-commerce"): wordmark, category nav, search, country switcher, and the
 * notification/cart/account actions.
 *
 * Everything except the country switcher is **presentational**. This page is
 * the only consumer-facing screen in the project — there is no catalogue
 * browse, search, notification feed, cart or shopper account behind it — so
 * those pieces render as text and images rather than buttons and inputs. That
 * way the header matches the design without offering controls that silently do
 * nothing when clicked; each gets its real markup when its screen exists.
 * `LanguageSelector` is the exception: it is the design's Country control and
 * it already works, so it is wired up for real.
 *
 * Distinct from `StorefrontHeader`, which is the in-app *preview* chrome
 * (wordmark + close button) for the creator's own shop.
 */
export function StorefrontPublicHeader() {
  return (
    <header
      className="flex w-full items-center justify-between rounded-b-[16px] bg-surface-secondary-300 px-margin py-md-2"
      style={{ minHeight: HEADER_HEIGHT }}
    >
      <div className="flex h-full items-center gap-md-sm">
        <img src="/urmei/home/logo.svg" alt="URMEI" className="h-4 w-[109px]" />
        {/* No gap between the links: each carries the design's own 16px
            horizontal padding, which is what sets them apart. */}
        <div className="flex items-center">
          {NAV_LINKS.map((label) => (
            <span
              key={label}
              className="flex items-center justify-center rounded-md px-md py-sm text-body-md font-medium tracking-[1.6px] text-text-secondary-1000 uppercase"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Centred rather than the design's `items-start`: there, the search bar
          stretches to the row's height and re-centres its 38px box with 5px of
          padding — the same result, one box less. */}
      <div className="flex items-center gap-sm">
        <div className="flex w-[300px] items-center gap-sm rounded-sm border border-border-default px-md-sm py-sm">
          <Icon name="search" />
          <p className="flex-1 truncate text-body-sm text-text-secondary-700">
            Find your fav beauty picks.
          </p>
        </div>

        <LanguageSelector />

        {/* The three action slots sit flush against each other; the 48px slots
            supply the spacing between the 20px glyphs inside them. */}
        <div className="flex items-center">
          <span className="relative flex size-[48px] items-center justify-center rounded-sm">
            <Icon name="bell" size={20} />
            <span className="absolute top-[9px] left-[28px] size-[5px] rounded-full bg-surface-other-alert" />
          </span>
          <span className="relative flex size-[48px] items-center justify-center rounded-sm">
            <Icon name="shopping-cart" size={20} />
            <span className="absolute top-[2px] left-[22px] flex size-[22px] items-center justify-center rounded-full bg-surface-primary-900 text-body-xs font-medium text-text-secondary-100">
              {CART_COUNT}
            </span>
          </span>
          <span className="flex size-[48px] items-center justify-center rounded-sm">
            {/* The source is a tall portrait, so a centred square crop lands on
                her hands. Biased up the frame to sit on the face, the way the
                design's circle is cropped. */}
            <img
              src="/assets/img/avatar-header.png"
              alt=""
              className="size-9 rounded-full object-cover [object-position:50%_28%]"
            />
          </span>
        </div>
      </div>
    </header>
  )
}
