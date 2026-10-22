export type BackdropCategory = 'classic' | 'seasonal'

export type Backdrop = {
  id: string
  name: string
  category: BackdropCategory
  /** The full-width artwork behind the My Shop banner (1440 × 558, SVG). */
  image: string
  /** The 122 × 80 tile thumbnail in the Change backdrop dialog (SVG). */
  thumbnail: string
  /** The profile card's fill on this backdrop. Each preset has its own card
   *  colour, set here rather than in the design (main file annotation on
   *  `2806:62080`); only Plain keeps the grey card. */
  cardClassName: string
  /** The storefront profile card's fill on this backdrop (main file
   *  `I2799:104166;3568:50827`): white fading into a light tint of the
   *  preset. Valentine's Day is the design's; the others follow it. */
  storefrontCard: string
  /** A light companion tint for featured product and collection cards. */
  featuredSurface: string
}

const preset = (id: string, name: string, category: BackdropCategory, tint: string, featuredSurface: string, cardClassName = 'bg-white'): Backdrop => ({
  id,
  name,
  category,
  storefrontCard: `linear-gradient(121.56deg, #ffffff 8.86%, ${tint} 97.38%)`,
  featuredSurface,
  image: `/urmei/backdrops/${id}.svg`,
  thumbnail: `/urmei/backdrops/thumbs/${id}.svg`,
  cardClassName,
})

/**
 * The 12 banner backdrop presets, in the dialog's order (main file
 * `2799:105207`). Plain (#FFFFFF) is the default. SVGs exported from the
 * Work File's `Backdrop` set (`3287:28680`, each preset's background plus
 * its 2880px pattern, clipped to 1440 by the viewBox) and its
 * `Backdrop thumbnail / …` components (`3277:185`–`3277:482`). Christmas's
 * snow is the thumbnail's, tiled at 2× (added to the set on 2026-10-22).
 * Custom uploads are out of the MVP.
 */
export const BACKDROPS: Backdrop[] = [
  preset('plain', 'Plain', 'classic', '#f8f8f8', '#f8f8f8', 'bg-surface-secondary-300'),
  preset('ripple-lines', 'Ripple Lines', 'classic', '#e4effa', '#f0f7ff'),
  preset('soft-dots', 'Soft Dots', 'classic', '#e3f4ec', '#f0fbf5'),
  preset('grid', 'Grid', 'classic', '#efeafb', '#f7f4ff'),
  preset('checks', 'Checks', 'classic', '#fff0e6', '#fff7f1'),
  preset('stripes', 'Stripes', 'classic', '#fff8d9', '#fffced'),
  preset('blush', 'Blush', 'classic', '#fde4ea', '#fff3f6'),
  preset('sand', 'Sand', 'classic', '#f6ecdc', '#fcf6ed'),
  preset('valentines-day', "Valentine's Day", 'seasonal', '#ffe3ed', '#fff0f5'),
  preset('lunar-new-year', 'Lunar New Year', 'seasonal', '#fbe3e3', '#fff2f2'),
  preset('christmas', 'Christmas', 'seasonal', '#e3efe8', '#f1faf4'),
  preset('new-year', 'New Year', 'seasonal', '#e6e9f2', '#f3f5fb'),
]

export const DEFAULT_BACKDROP_ID = 'plain'

export function backdropById(id: string): Backdrop {
  return BACKDROPS.find((backdrop) => backdrop.id === id) ?? BACKDROPS[0]
}
