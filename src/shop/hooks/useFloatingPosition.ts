import { useLayoutEffect, useState, type RefObject } from 'react'

export type FloatingAlign = 'left' | 'right'

type Position = { top: number; left: number }

/**
 * Fixed-position screen coordinates for a floating panel anchored below
 * `triggerRef`, recalculated whenever `open` becomes true and on scroll/resize
 * while it stays open.
 */
export function useFloatingPosition(
  triggerRef: RefObject<HTMLElement | null>,
  open: boolean,
  { width, align = 'left', gap = 4 }: { width: number; align?: FloatingAlign; gap?: number },
): Position {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 })

  useLayoutEffect(() => {
    if (!open) return

    function update() {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      setPosition({
        top: rect.bottom + gap,
        left: align === 'right' ? rect.right - width : rect.left,
      })
    }

    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [open, triggerRef, width, align, gap])

  return position
}
