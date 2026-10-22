export type BackdropColorTokens = {
  /** Profile/creator card surface. Can be a solid colour or a gradient. */
  profileCard: string
  /** Collection board metadata surface. */
  collectionCard: string
  /** Product card metadata surface. */
  productCard: string
  /** Accent color for the FEATURED eyebrow label. */
  featuredLabel: string
}

const plain: BackdropColorTokens = {
  profileCard: '#f8f8f8',
  collectionCard: '#ffffff',
  productCard: '#ffffff',
  featuredLabel: '#667085',
}

/**
 * Card surfaces paired with each banner backdrop. Keep these tokens separate
 * from the artwork so a backdrop can be replaced without changing component
 * markup or scattering colour decisions through the storefront.
 */
export const BACKDROP_COLORS: Record<string, BackdropColorTokens> = {
  plain,
  'ripple-lines': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #e4effa 97.38%)',
    collectionCard: '#f5faff',
    productCard: '#f5faff',
    featuredLabel: '#426a91',
  },
  'soft-dots': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #e3f4ec 97.38%)',
    collectionCard: '#f5fcf8',
    productCard: '#f5fcf8',
    featuredLabel: '#3d7658',
  },
  grid: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #efeafb 97.38%)',
    collectionCard: '#faf8ff',
    productCard: '#faf8ff',
    featuredLabel: '#66558f',
  },
  checks: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #fff0e6 97.38%)',
    collectionCard: '#fffaf6',
    productCard: '#fffaf6',
    featuredLabel: '#9a6244',
  },
  stripes: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #fff8d9 97.38%)',
    collectionCard: '#fffdf0',
    productCard: '#fffdf0',
    featuredLabel: '#8b762c',
  },
  blush: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #fde4ea 97.38%)',
    collectionCard: '#fff7f9',
    productCard: '#fff7f9',
    featuredLabel: '#9a5269',
  },
  sand: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #f6ecdc 97.38%)',
    collectionCard: '#fdf8f0',
    productCard: '#fdf8f0',
    featuredLabel: '#846a49',
  },
  'valentines-day': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #ffe3ed 97.38%)',
    collectionCard: '#fff3f7',
    productCard: '#fff3f7',
    featuredLabel: '#a04e6e',
  },
  'lunar-new-year': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #fbe3e3 97.38%)',
    collectionCard: '#fff5f5',
    productCard: '#fff5f5',
    featuredLabel: '#a04b4b',
  },
  christmas: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #e3efe8 97.38%)',
    collectionCard: '#f4fbf6',
    productCard: '#f4fbf6',
    featuredLabel: '#3f7658',
  },
  'new-year': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #e6e9f2 97.38%)',
    collectionCard: '#f6f8fc',
    productCard: '#f6f8fc',
    featuredLabel: '#59647d',
  },
}

export function backdropColors(id: string): BackdropColorTokens {
  return BACKDROP_COLORS[id] ?? plain
}

