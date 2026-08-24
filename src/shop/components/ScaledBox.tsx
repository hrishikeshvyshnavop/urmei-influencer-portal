import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useFitScale } from '../hooks/useFitScale'

type ScaledBoxProps = {
  /** The Figma-matched width this content is built at. */
  width: number
  className?: string
  children: ReactNode
}

/**
 * Renders `children` at a fixed design width, scaled as a whole (never
 * reflowed) to fill narrower viewports — shrinking below `width`, capped at
 * 1 above it — so every proportion stays identical to Figma below the design
 * width, and the page just centers with room to spare above it, like the
 * rest of the portal.
 *
 * A CSS transform doesn't shrink the space an element occupies in normal flow,
 * so a negative bottom margin compensates for that gap once scaled down —
 * otherwise anything stacked below this box (e.g. a footer) would leave a
 * blank gap equal to the unscaled height.
 */
export function ScaledBox({ width, className = '', children }: ScaledBoxProps) {
  const scale = useFitScale(width)
  const ref = useRef<HTMLDivElement>(null)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new ResizeObserver((entries) => setNaturalHeight(entries[0].contentRect.height))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        width,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        marginBottom: naturalHeight * (scale - 1),
      }}
      className={`shrink-0 ${className}`}
    >
      {children}
    </div>
  )
}
