import { useLayoutEffect, useState, type RefObject } from 'react'

/**
 * Whether `ref`'s content is wider than its visible box — i.e. whether there
 * is actually anything to scroll horizontally. Use it to hide scroll controls
 * that would do nothing: a strip holding one or two cards on a wide screen has
 * no overflow, so its prev/next arrows are decoration.
 *
 * `itemCount` re-measures when the content changes. A `ResizeObserver` on the
 * scroller alone can't catch that: the scroller is `w-full`, so adding or
 * removing a card leaves its own box exactly the same size while the content's
 * width changes underneath it.
 *
 * Measured in a layout effect so the controls are absent on the very first
 * paint rather than appearing and then vanishing.
 */
export function useHasOverflowX(ref: RefObject<HTMLElement | null>, itemCount: number): boolean {
  const [hasOverflow, setHasOverflow] = useState(false)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    // Sub-pixel layout widths can leave `scrollWidth` a hair over
    // `clientWidth` with nothing actually clipped, so require a whole pixel.
    const measure = () => setHasOverflow(node.scrollWidth - node.clientWidth >= 1)

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [ref, itemCount])

  return hasOverflow
}
