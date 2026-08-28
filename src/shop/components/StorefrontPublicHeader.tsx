import LanguageSelector from '../../portal/components/LanguageSelector'
import { CONTENT_COLUMN } from '../layout'
import { Icon } from './Icon'

/** The header's fixed height in design px (Figma `916:65707`). `min-h` rather
 *  than `h` so it stays stable on viewports narrow enough for
 *  `LanguageSelector` to hide itself. */
const HEADER_HEIGHT = 88

/** Section links in the design. Rendered as plain text, not buttons — see the
 *  component note below.
 *
 *  `Creators` deliberately departs from the Figma node cited below, which still
 *  reads `Influencers`: the product renamed that audience to "creator"
 *  everywhere, so the copy here is deliberately ahead of the design file. Don't
 *  "correct" it back the next time this node is re-synced. */
const NAV_LINKS = ['Categories', 'Brands', 'Creators', 'Offers']

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
 *
 * Responsive across ordinary desktop widths (1280–1920): the design is a
 * single 1440px frame, and its two halves — nav on the left, search + country
 * + actions on the right — are both wide enough on their own that at anything
 * narrower than about 1400px they collide. Nothing here can wrap (single-word
 * nav links, a one-line search placeholder) or usefully truncate except the
 * search field's own placeholder text, so it's the one piece asked to give:
 * `shrink-0` on both rigid halves plus letting the search box shrink and grow
 * within its own row keeps every other element at its natural, undistorted
 * size at every width in range.
 */
export function StorefrontPublicHeader() {
  return (
    <header className="flex w-full justify-center rounded-b-[16px] bg-surface-secondary-300">
      {/* The bar's fill spans the viewport; its contents sit in the same
          `CONTENT_COLUMN` as every band below, so the wordmark lines up with
          the breadcrumb and the product grids. Without the column's `max-w`
          this row hugged the raw viewport edge, which only matched the rest of
          the page at exactly 1440px. */}
      <div
        className={`flex items-center justify-between py-md-2 ${CONTENT_COLUMN}`}
        style={{ minHeight: HEADER_HEIGHT }}
      >
        <div className="flex h-full shrink-0 items-center gap-md-sm">
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
            padding — the same result, one box less.

            This side is left shrinkable (unlike the nav group above) because
            it's the only place the header can absorb width pressure: the search
            box is the one child that can actually get narrower without content
            spilling out of its box. */}
        <div className="flex min-w-0 items-center gap-sm">
          {/* `min-w-0`: a flex item's automatic minimum size otherwise defaults
              to its content's own min-content size, which — for a *nested* flex
              container like this one — Chrome computes generously enough that
              shrinking stalled well short of what was actually needed, spilling
              this row past the header's right padding instead of the search box
              giving up the rest of the room it's entitled to. `w-[300px]` (the
              design's own width) doubles as this item's flex basis, so at rest
              — plenty of room, nothing being asked to shrink or grow — it
              renders at exactly 300px, matching Figma. `grow` lets it reclaim
              the design width whenever the row has room to give it; `shrink`
              with a 160px floor lets it give width back below ~1400px, where
              the nav side (which can't shrink at all — see below) needs it.
              Below 160 the icon and truncated placeholder stop reading as a
              search field at all, so that's the floor. */}
          <div className="flex min-w-[160px] max-w-[300px] w-[300px] grow shrink items-center gap-sm rounded-sm border border-border-default px-md-sm py-sm">
            <Icon name="search" />
            <p className="flex-1 truncate text-body-sm text-text-secondary-700">
              Find your fav beauty picks.
            </p>
          </div>

          {/* Wrapped, not passed a className, because `LanguageSelector` takes
              none — and it needs the same protection as the nav links: its
              button can't compress either, so leaving it shrinkable would just
              move the overflow here instead of fixing it. */}
          <div className="shrink-0">
            <LanguageSelector />
          </div>

          {/* The three action slots sit flush against each other; the 48px slots
              supply the spacing between the 20px glyphs inside them. */}
          <div className="flex shrink-0 items-center">
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
      </div>
    </header>
  )
}
