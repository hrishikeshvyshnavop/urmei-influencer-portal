import { useEffect, useState } from 'react'

/**
 * viewport width / designWidth, capped at 1, kept up to date on resize.
 * Listens both to `window.resize` and a `ResizeObserver` on the document
 * root — belt and suspenders, since some viewport changes (devtools-driven
 * resizes, pinch-zoom, browser automation) don't reliably fire one or the
 * other. Capped so the design never scales up past its natural size on
 * screens wider than `designWidth` — it just centers with room to spare,
 * like the rest of the portal, instead of blowing up larger than Figma.
 */
export function useFitScale(designWidth: number): number {
  const [scale, setScale] = useState(() => Math.min(1, document.documentElement.clientWidth / designWidth))

  useEffect(() => {
    function update() {
      setScale(Math.min(1, document.documentElement.clientWidth / designWidth))
    }
    update()
    window.addEventListener('resize', update)
    const observer = new ResizeObserver(update)
    observer.observe(document.documentElement)
    return () => {
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [designWidth])

  return scale
}
