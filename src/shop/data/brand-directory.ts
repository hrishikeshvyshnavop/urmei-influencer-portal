export type BrandDirectoryTile = { name: string; image: string }

const brands = {
  etude: { name: 'ETUDE', image: '/urmei/brands/brand-01.png' },
  alliesOfSkin: { name: 'Allies of Skin', image: '/urmei/brands/brand-02.png' },
  rae: { name: 'rae Cosmetics', image: '/urmei/brands/brand-03.png' },
  porcelain: { name: 'Porcelain Skincare', image: '/urmei/brands/brand-04.png' },
  klavuu: { name: 'KLAVUU', image: '/urmei/brands/brand-05.png' },
  browhaus: { name: 'Browhaus', image: '/urmei/brands/brand-06.png' },
  btf: { name: 'BTF', image: '/urmei/brands/brand-07.png' },
  sigiSkin: { name: 'SIGI SKIN', image: '/urmei/brands/brand-08.png' },
  liht: { name: 'Liht', image: '/urmei/brands/brand-09.png' },
  mudoLabs: { name: 'MUDO LABS', image: '/urmei/brands/brand-10.png' },
  boundary: { name: 'BOUNDARY', image: '/urmei/brands/brand-11.png' },
} as const

/**
 * Reproduces the exact 5x4 grid from Figma 1364:16002 — several brands recur
 * across rows there rather than each tile being unique. Shared by the
 * standalone Brands page and the catalogue browse overlay's "Brands" list so
 * both stay in sync with a single source of truth for the grid contents;
 * each consumer decides what a tile does on click (the standalone page
 * treats index 4 as a link to the general catalogue instead of Etude's own
 * page — see `src/portal/Brands.tsx`).
 */
export const BRAND_DIRECTORY_TILES: BrandDirectoryTile[] = [
  brands.alliesOfSkin,
  brands.rae,
  brands.porcelain,
  brands.klavuu,
  brands.etude,
  brands.etude,
  brands.browhaus,
  brands.etude,
  brands.btf,
  brands.sigiSkin,
  brands.liht,
  brands.etude,
  brands.mudoLabs,
  brands.boundary,
  brands.etude,
  brands.boundary,
  brands.etude,
  brands.btf,
  brands.sigiSkin,
  brands.boundary,
]
