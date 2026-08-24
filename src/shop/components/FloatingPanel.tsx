import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useFloatingPosition, type FloatingAlign } from '../hooks/useFloatingPosition'

type FloatingPanelProps = {
  open: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLElement | null>
  width: number
  align?: FloatingAlign
  className?: string
  children: ReactNode
}

/**
 * Portals `children` onto `document.body` as a `position: fixed` panel
 * anchored just below `triggerRef`, so it can't be clipped by an ancestor's
 * `overflow: hidden`/`clip` — e.g. a card or modal that clips its own rounded
 * corners. `overflow: hidden` clips descendants regardless of their own
 * positioning scheme, so an `absolute`/`fixed` dropdown nested inside one
 * still gets cut off; only moving it out of that DOM subtree via a portal
 * avoids it.
 *
 * Closes on any pointerdown outside both the trigger and the panel itself.
 */
export function FloatingPanel({
  open,
  onClose,
  triggerRef,
  width,
  align = 'left',
  className = '',
  children,
}: FloatingPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const position = useFloatingPosition(triggerRef, open, { width, align })

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (triggerRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      onClose()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, onClose, triggerRef])

  if (!open) return null

  return createPortal(
    <div
      ref={panelRef}
      style={{ position: 'fixed', top: position.top, left: position.left, width }}
      className={`z-50 ${className}`}
    >
      {children}
    </div>,
    document.body,
  )
}
