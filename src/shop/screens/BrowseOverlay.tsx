import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ScaledBox } from '../components/ScaledBox'
import { Icon } from '../components/Icon'

/** How long the boneyard skeleton stands in for the real view — long enough
 *  to read as a deliberate load rather than a flicker, short enough that
 *  switching views inside the overlay still feels snappy. */
const CONTENT_LOAD_DELAY_MS = 550

/** Views (by `scrollKey`) that have already played their skeleton once this
 *  session. Module-level rather than component state so it survives closing
 *  and reopening the overlay — once a view's "loaded", revisiting it goes
 *  straight to the real content instead of replaying the boneyard. */
const loadedViewKeys = new Set<string>()

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
  /** Boneyard placeholder shown for `CONTENT_LOAD_DELAY_MS` whenever
   *  `scrollKey` changes (including the overlay's first open), standing in
   *  for `children` while shaped like the view about to appear. Views that
   *  don't pass one skip the loading state entirely. */
  skeleton?: ReactNode
}

/**
 * Full-screen "Browse and find products to add" panel. It sits over the My Shop
 * page, starting below the site header, with a scrim across the whole viewport.
 * The body is capped at the app's 1440px screen width (matching every other
 * shop screen's `ScaledBox`); `ScaledBox` shrinks it to fit narrower viewports
 * without reflowing or forcing horizontal scroll. The overlay's own header bar
 * spans the full viewport width instead — unscaled, sitting outside the body's
 * `ScaledBox` — both so it reads as the overlay's chrome rather than more of
 * the (narrower) page content, and so it can stay fixed in place while only
 * the body scrolls: `transform` on an ancestor breaks `position: sticky` for
 * any descendant, and `ScaledBox` applies `transform: scale()`, so a sticky
 * header nested inside one could never actually stick.
 */
export function BrowseOverlay({
  onClose,
  children,
  title = 'Browse and find products to add',
  scrollKey,
  skeleton,
}: BrowseOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const shouldLoad = (key: string | undefined) =>
    skeleton !== undefined && key !== undefined && !loadedViewKeys.has(key)
  const [contentLoading, setContentLoading] = useState(() => shouldLoad(scrollKey))
  const contentLoadTimeoutRef = useRef<number | null>(null)

  // A new `scrollKey` means a different view than whatever's currently
  // loaded — reset the skeleton state during render (React's documented
  // pattern, also used by SearchResults' own page reset) rather than via an
  // effect, since an effect can't set state synchronously on its own.
  const [loadedScrollKey, setLoadedScrollKey] = useState(scrollKey)
  if (scrollKey !== loadedScrollKey) {
    setLoadedScrollKey(scrollKey)
    setContentLoading(shouldLoad(scrollKey))
  }

  // Closing plays the panel's slide-out first and defers the real `onClose`
  // — and the unmount it triggers — instead of firing it immediately, so the
  // overlay animates away instead of vanishing.
  const [closing, setClosing] = useState(false)
  const closeTimeoutRef = useRef<number | null>(null)

  function finishClose() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    onClose()
  }

  function requestClose() {
    if (closing) return
    setClosing(true)
    // `onAnimationEnd` normally finishes the close, but CSS animations can
    // stall while the tab is backgrounded — this guarantees it still closes.
    closeTimeoutRef.current = window.setTimeout(finishClose, 300)
  }

  function handleExitAnimationEnd() {
    if (closing) finishClose()
  }

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current)
    },
    [],
  )

  // Escape closes the overlay — unless something is stacked on top of it (the
  // add-to-shop and request-sample modals, the review modal, an open select or
  // menu), in which case that layer owns the key and closes first. Re-bound
  // every render so the handler always sees the current `closing` state.
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      const layerAbove = document.querySelector(
        '[aria-modal="true"], [data-radix-popper-content-wrapper], [role="menu"], [role="listbox"]',
      )
      if (layerAbove) return
      requestClose()
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  })

  // Locking scroll via `overflow: hidden` (with or without also pinning
  // `body` to `position: fixed`) breaks every `position: sticky` element on
  // the page behind this overlay: sticky needs an actual scrolling box to
  // stick within, and once that box can't scroll, sticky elements fall back
  // to their static in-flow position — while the page is still scrolled, so
  // My Shop's sticky header/banner render far off-screen, briefly visible
  // through the scrim's fade as it opens or closes. Block the scroll input
  // itself instead of touching the page's own overflow/position: the page
  // stays completely untouched (so its sticky elements keep computing
  // correctly), and it can't visibly scroll anyway since this overlay
  // already covers and hit-tests over the whole viewport.
  useEffect(() => {
    // Parts of the overlay's own chrome get portaled out to `document.body`
    // when they stick (`SearchResults`' toolbar and filter rail, which can't
    // use `position: sticky` inside a scaled ancestor). Those are still the
    // overlay, so a `contains` check against the overlay's own elements
    // misses them and the guards below would cancel their scrolling — they
    // opt back in with `data-overlay-scroll`.
    const isPortaledChrome = (target: EventTarget | null) =>
      target instanceof Element && target.closest('[data-overlay-scroll]') !== null

    const isInsideBody = (target: EventTarget | null) =>
      (bodyRef.current?.contains(target as Node) ?? false) || isPortaledChrome(target)
    const isInsideOverlay = (target: EventTarget | null) =>
      (rootRef.current?.contains(target as Node) ?? false) || isPortaledChrome(target)

    const onWheel = (event: WheelEvent) => {
      if (!isInsideBody(event.target)) event.preventDefault()
    }
    const onTouchMove = (event: TouchEvent) => {
      if (!isInsideBody(event.target)) event.preventDefault()
    }
    const scrollKeys = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '])
    const onKeyDown = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key) && !isInsideOverlay(event.target)) event.preventDefault()
    }

    // The page keeps its own scroll control while the overlay is up — a second
    // scrollbar beside the overlay's own, and `scrollbar-gutter: stable`
    // (global.css) reserves its width whether or not it's drawn, leaving a
    // strip at the screen's edge that the overlay can't cover: nothing
    // positioned in the page paints inside that reserved gutter (a probe at
    // `right: -15px` doesn't render, and `100vw` stops at the gutter's inner
    // edge), so it showed the bare page canvas as a pale band.
    //
    // Removing the scrollbar and releasing the gutter drops both at once: the
    // overlay then spans the true window width with nothing left over at the
    // edge, so `inset-0` covers it exactly. The page behind does reflow ~15px
    // wider for as long as the overlay is open, which is what
    // `scrollbar-gutter: stable` normally exists to prevent — but the scrim
    // covers it, so none of that is visible.
    //
    // Both properties are inherited, and the viewport's scrollbar takes its
    // values from the root, so `body` is pinned back to the defaults to stop
    // `none` reaching the overlay's own scrollers and erasing the results
    // list's scrollbar with it.
    const root = document.documentElement
    const previousRootScrollbarWidth = root.style.scrollbarWidth
    const previousRootScrollbarGutter = root.style.scrollbarGutter
    const previousBodyScrollbarWidth = document.body.style.scrollbarWidth
    root.style.scrollbarWidth = 'none'
    root.style.scrollbarGutter = 'auto'
    document.body.style.scrollbarWidth = 'auto'

    // Belt and braces now that the page has no scrollbar to grab: holding the
    // position covers any route the guards above don't — a thumb drag if a
    // platform still draws one, or a programmatic scroll — without touching
    // the page's own overflow.
    const { scrollX, scrollY } = window
    const holdScrollPosition = () => window.scrollTo(scrollX, scrollY)

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', holdScrollPosition, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', holdScrollPosition)
      root.style.scrollbarWidth = previousRootScrollbarWidth
      root.style.scrollbarGutter = previousRootScrollbarGutter
      document.body.style.scrollbarWidth = previousBodyScrollbarWidth
    }
  }, [])

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0)

    if (!shouldLoad(scrollKey)) return

    contentLoadTimeoutRef.current = window.setTimeout(() => {
      setContentLoading(false)
      if (scrollKey !== undefined) loadedViewKeys.add(scrollKey)
    }, CONTENT_LOAD_DELAY_MS)
    return () => {
      if (contentLoadTimeoutRef.current !== null) window.clearTimeout(contentLoadTimeoutRef.current)
    }
    // `skeleton`/`shouldLoad` intentionally excluded: `shouldLoad` is a fresh
    // closure every render, and only `scrollKey` marks an actual view change
    // worth reloading for.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollKey])

  return (
    <div ref={rootRef} className="fixed inset-0 z-30">
      {/* Pure background layer, kept separate from the content layer below so
          it can't shift that layer's own `justify-center` math off
          true-center. `inset-0` reaches the true window edge unaided: the
          scroll lock releases `scrollbar-gutter` while the overlay is open, so
          there's no reserved sliver left to stretch over — and stretching a
          layer into that gutter never worked anyway, since nothing in the page
          paints there. */}
      <div
        aria-hidden="true"
        data-state={closing ? 'closed' : 'open'}
        className="motion-modal-backdrop absolute inset-0 bg-scrim"
      />

      <div
        onAnimationEnd={handleExitAnimationEnd}
        data-state={closing ? 'closed' : 'open'}
        className="motion-browse-panel relative flex h-full flex-col"
        style={{ paddingTop: 88 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) requestClose()
        }}
      >
        <header className="flex w-full shrink-0 items-center justify-between border-b border-border-default bg-surface-secondary-100 px-margin py-[20px]">
          <div className="flex items-center gap-md-2">
            <img src="/assets/img/urmei-mark.svg" alt="" className="h-[15.999px] w-[29.573px]" />
            <p className="text-body-lg font-medium text-text-secondary-1000">{title}</p>
          </div>
          <button
            type="button"
            aria-label="Close browse"
            onClick={requestClose}
            className="flex size-[38px] items-center justify-center"
          >
            <Icon name="x" size={24} />
          </button>
        </header>

        {/* Thin, track-less scrollbar to match the Filters rail's. Left at the
            platform default this was a full-width classic scrollbar whose pale
            track read as a white band down the edge of the screen, right next
            to the scrim. */}
        <div
          ref={bodyRef}
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-surface-secondary-100 [scrollbar-color:var(--color-border-outlined)_transparent] [scrollbar-width:thin]"
        >
          <div className="flex min-h-full w-full justify-center" onMouseDown={(event) => { if (event.target === event.currentTarget) requestClose() }}>
            <ScaledBox width={1440} className="min-h-full shrink-0 rounded-b-lg bg-surface-secondary-100">
              {contentLoading && skeleton !== undefined ? skeleton : children}
            </ScaledBox>
          </div>
        </div>
      </div>
    </div>
  )
}
