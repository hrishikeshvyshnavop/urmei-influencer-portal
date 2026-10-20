import { useLayoutEffect, useRef, type RefObject } from 'react'

const DURATION = 360 // --motion-slow
const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)' // --ease-portal

/**
 * Slides children to their new places when their order changes (FLIP): each
 * `[data-flip-key]` child is measured after every render, and if it moved it
 * animates from its old position instead of jumping. Positions are read
 * relative to the container, so scrolling between renders doesn't count as a
 * move. Skipped for prefers-reduced-motion.
 */
export function useFlip(containerRef: RefObject<HTMLElement | null>, orderKey: string) {
  const positions = useRef(new Map<string, { left: number; top: number }>())

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const next = new Map<string, { left: number; top: number }>()
    container.querySelectorAll<HTMLElement>('[data-flip-key]').forEach((child) => {
      const key = child.dataset.flipKey!
      const now = { left: child.offsetLeft, top: child.offsetTop }
      next.set(key, now)
      const before = positions.current.get(key)
      if (!before || reduce) return
      const dx = before.left - now.left
      const dy = before.top - now.top
      if (dx === 0 && dy === 0) return
      child.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        { duration: DURATION, easing: EASING },
      )
    })
    positions.current = next
  }, [containerRef, orderKey])
}
