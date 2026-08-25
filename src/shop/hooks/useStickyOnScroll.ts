import { useLayoutEffect, useState, type RefObject } from 'react'

type StickyState = { stuck: boolean; top: number; left: number; width: number; bottom: number }

/**
 * Emulates `position: sticky; top: 0` for content rendered at `sentinelRef`'s
 * position. Real CSS sticky can't do this here — `ScaledBox`'s
 * `transform: scale()` ancestor makes a transformed element the containing
 * block for its descendants, degrading both `position: sticky` and
 * `position: fixed` to behave like `static`/relative-to-that-ancestor
 * instead of the viewport (see `SearchResults`'s matching comment).
 *
 * Sticking has to wait until `sentinelRef` actually scrolls up to the
 * container's own top edge — not just "any scroll at all" — otherwise the
 * fixed copy jumps to its final position before the real content has
 * scrolled to match, covering whatever's still sitting underneath (e.g. the
 * top of the Filters list) for every scroll position short of that point.
 * Waiting for the real crossing point is what a native sticky header does
 * too, and it still reads as "sticks right away" here since the gap above
 * the toolbar (breadcrumb + search box) is short.
 *
 * Once stuck, the caller should render its content fixed at the returned
 * `{ top, left, width }` via a portal to `document.body` instead — same
 * escape hatch `FloatingPanel` uses for dropdowns clipped by
 * `overflow: hidden`. `widthRef` supplies the left/width to match (typically
 * the row the sticky content visually replaces). `bottom` is the scroll
 * container's own bottom edge, for bounding a tall sticky panel (e.g. the
 * Filters list) to the visible viewport instead of overflowing past it.
 * Scroll updates are batched to one per animation frame so scrolling stays
 * smooth even though every update reads layout.
 */
export function useStickyOnScroll(
  sentinelRef: RefObject<HTMLElement | null>,
  widthRef: RefObject<HTMLElement | null>,
): StickyState {
  const [state, setState] = useState<StickyState>({ stuck: false, top: 0, left: 0, width: 0, bottom: 0 })

  useLayoutEffect(() => {
    const sentinel = sentinelRef.current
    const widthSource = widthRef.current
    if (!sentinel || !widthSource) return

    let scrollParent: HTMLElement | null = sentinel.parentElement
    while (scrollParent) {
      if (getComputedStyle(scrollParent).overflowY === 'auto') break
      scrollParent = scrollParent.parentElement
    }
    if (!scrollParent) return

    function update() {
      const containerRect = scrollParent!.getBoundingClientRect()
      const sentinelTop = sentinel!.getBoundingClientRect().top
      const widthRect = widthSource!.getBoundingClientRect()
      setState({
        stuck: sentinelTop <= containerRect.top,
        top: containerRect.top,
        left: widthRect.left,
        width: widthRect.width,
        bottom: containerRect.bottom,
      })
    }

    let frame = 0
    function onScroll() {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    scrollParent.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      scrollParent!.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sentinelRef, widthRef])

  return state
}
