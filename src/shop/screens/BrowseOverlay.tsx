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

  // `html { scrollbar-gutter: stable }` (global.css) permanently reserves the
  // scrollbar's width so toggling scroll elsewhere in the app never shifts
  // layout — but that reservation also caps `vw`/`fixed inset-0` a scrollbar's
  // width short of the true window edge, so the scrim's right side never
  // reaches it, leaving a sliver of the page showing through undimmed. Safe
  // to lift only while this fully covers the screen: nothing behind it can
  // shift layout since it's hidden, and scrolling is locked below anyway.
  useEffect(() => {
    const previousBody = document.body.style.overflow
    const previousHtml = document.documentElement.style.overflow
    const previousGutter = document.documentElement.style.scrollbarGutter
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.scrollbarGutter = 'auto'
    return () => {
      document.body.style.overflow = previousBody
      document.documentElement.style.overflow = previousHtml
      document.documentElement.style.scrollbarGutter = previousGutter
    }
  }, [])

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0)
  }, [scrollKey])

  return (
    <div
      // `top: 88` (not `inset-0` + padding) so the scrim's own dark
      // background stops short of the site header instead of painting over
      // it — with equal z-index and later DOM order, a full-height scrim
      // would otherwise darken the header instead of leaving it visible.
      className="fixed inset-x-0 bottom-0 z-30 flex flex-col bg-scrim"
      style={{ top: 88 }}
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
