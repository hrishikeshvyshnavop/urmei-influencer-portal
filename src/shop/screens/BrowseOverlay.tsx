import { useEffect, useRef, type ReactNode } from 'react'
import { ScaledBox } from '../components/ScaledBox'
import { Icon } from '../components/Icon'

type BrowseOverlayProps = {
  onClose: () => void
  children: ReactNode
  /** Defaults to the catalogue-browse heading; overridden for other reuses of this shell. */
  title?: string
  /** Identifies which view is showing (catalogue/results/detail, plus the
   *  product id for detail) — changing it resets the body's scroll to the
   *  top, since navigating between views swaps `children` in place rather
   *  than remounting this overlay or its scrolling container. */
  scrollKey?: string
}

/**
 * Full-screen "Browse and find products to add" panel. It sits over the My Shop
 * page, starting below the site header, with a scrim across the whole viewport.
 * The panel is capped at the app's 1440px screen width (matching every other
 * shop screen's `ScaledBox`); `ScaledBox` shrinks it to fit narrower viewports
 * without reflowing or forcing horizontal scroll.
 *
 * The header and the body sit in two separate `ScaledBox`es (rather than one,
 * scrolled as a unit) so the header can stay put while only the body scrolls:
 * `transform` on an ancestor breaks `position: sticky` for any descendant, and
 * `ScaledBox` itself applies `transform: scale()`, so a sticky header nested
 * inside it could never actually stick. Keeping it outside the scrolling body
 * entirely sidesteps that rather than fighting it.
 */
export function BrowseOverlay({ onClose, children, title = 'Browse and find products to add', scrollKey }: BrowseOverlayProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  // Deliberately leaves `html`'s `scrollbar-gutter: stable` (global.css)
  // alone: overriding it made the scrim reach the true window edge, but
  // since that's a property of `html` it also resized every other
  // descendant — including the site header sitting behind this (only
  // 50%-opaque) scrim — producing a visible width jump when the overlay
  // opened. The header, and everything else on the page, already respects
  // that same reserved gutter, so the scrim matching it too leaves nothing
  // mismatched to leak through on the right edge.
  useEffect(() => {
    const previousBody = document.body.style.overflow
    const previousHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBody
      document.documentElement.style.overflow = previousHtml
    }
  }, [])

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0)
  }, [scrollKey])

  return (
    <div
      // z-40, matching every other full-screen modal in this app
      // (ProductTour, ProfileMenu, SetProfilePhoto, ...) rather than z-30,
      // which ties the site header's own z-index — the scrim should sit
      // unambiguously above the header, dimming it like the rest of the
      // page behind it, not fight it for stacking order. `paddingTop: 88`
      // keeps the panel's own content below the header's real position
      // without needing to carve the scrim itself.
      className="fixed inset-0 z-40 flex flex-col bg-scrim"
      style={{ paddingTop: 88 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex w-full justify-center overflow-x-hidden" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
        <ScaledBox width={1440} className="shrink-0 overflow-clip rounded-t-[10px] bg-surface-secondary-100">
          <header className="flex w-full items-center justify-between border-b border-border-default bg-surface-secondary-100 px-margin py-[20px]">
            <div className="flex items-center gap-md-2">
              <img src="/assets/img/urmei-mark.svg" alt="" className="h-[15.999px] w-[29.573px]" />
              <p className="text-body-lg font-medium text-text-secondary-1000">{title}</p>
            </div>
            <button
              type="button"
              aria-label="Close browse"
              onClick={onClose}
              className="flex size-[38px] items-center justify-center"
            >
              <Icon name="x" size={24} />
            </button>
          </header>
        </ScaledBox>
      </div>

      <div ref={bodyRef} className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-surface-secondary-100">
        <div className="flex min-h-full w-full justify-center" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
          <ScaledBox width={1440} className="min-h-full shrink-0 rounded-b-lg bg-surface-secondary-100">
            {children}
          </ScaledBox>
        </div>
      </div>
    </div>
  )
}
