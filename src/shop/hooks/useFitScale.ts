import { useEffect, useState } from 'react'

/**
 * viewport width / designWidth, kept up to date on resize. Listens both to
 * `window.resize` and a `ResizeObserver` on the document root — belt and
 * suspenders, since some viewport changes (devtools-driven resizes,
 * pinch-zoom, browser automation) don't reliably fire one or the other.
 * Capped at 1 so the design only ever shrinks to fit narrower viewports,
 * matching the rest of the portal, which never scales content up beyond its
 * design size on large screens — it just centers it with room to spare.
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
