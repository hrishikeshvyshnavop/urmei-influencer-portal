export type BackdropColorTokens = {
  /** Profile/creator card surface. Can be a solid colour or a gradient. */
  profileCard: string
  /** Collection board metadata surface. */
  collectionCard: string
  /** Product card metadata surface. */
  productCard: string
  /** The content side of the banner featured product and collection cards. */
  featuredCard: string
  /** Accent color for the FEATURED eyebrow label. */
  featuredLabel: string
}

const plain: BackdropColorTokens = {
  profileCard: '#f8f8f8',
  collectionCard: '#ffffff',
  productCard: '#ffffff',
  featuredCard: '#ffffff',
  featuredLabel: '#667085',
}

/**
 * Card surfaces paired with each banner backdrop. The profile card tint,
 * featured card surface and FEATURED label follow the shopper's-view frames
 * (main file `2906:75188`, "Assets 22.10.26", one banner per preset). Keep
 * these tokens separate from the artwork so a backdrop can be replaced
 * without changing component markup or scattering colour decisions through
 * the storefront.
 */
export const BACKDROP_COLORS: Record<string, BackdropColorTokens> = {
  plain,
  'ripple-lines': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #cfe3f7 97.38%)',
    collectionCard: '#f5faff',
    productCard: '#f5faff',
    featuredCard: '#fffbf0',
    featuredLabel: '#0f6bc3',
  },
  'soft-dots': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #dcf2e8 97.38%)',
    collectionCard: '#f5fcf8',
    productCard: '#f5fcf8',
    featuredCard: '#fff0fc',
    featuredLabel: '#0d804d',
  },
  grid: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #e8e2f9 97.38%)',
    collectionCard: '#faf8ff',
    productCard: '#faf8ff',
    featuredCard: '#f9fcf2',
    featuredLabel: '#7b69ae',
  },
  checks: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #ffd9c2 97.38%)',
    collectionCard: '#fffaf6',
    productCard: '#fffaf6',
    featuredCard: '#f0f9ff',
    featuredLabel: '#9c6545',
  },
  stripes: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #fff5cc 97.38%)',
    collectionCard: '#fffdf0',
    productCard: '#fffdf0',
    featuredCard: '#f0f3ff',
    featuredLabel: '#8a6a00',
  },
  blush: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #fccfca 97.38%)',
    collectionCard: '#fff7f9',
    productCard: '#fff7f9',
    featuredCard: '#f0f9ff',
    featuredLabel: '#99626f',
  },
  sand: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #f2ddbc 97.38%)',
    collectionCard: '#fdf8f0',
    productCard: '#fdf8f0',
    featuredCard: '#f3f6fc',
    featuredLabel: '#816e50',
  },
  'valentines-day': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #ffe3ed 97.38%)',
    collectionCard: '#fff3f7',
    productCard: '#fff3f7',
    featuredCard: '#f8f5ff',
    featuredLabel: '#d31574',
  },
  'lunar-new-year': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #f9d2d2 97.38%)',
    collectionCard: '#fff5f5',
    productCard: '#fff5f5',
    featuredCard: '#eafbfb',
    featuredLabel: '#c62828',
  },
  christmas: {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #d4f2e1 97.38%)',
    collectionCard: '#f4fbf6',
    productCard: '#f4fbf6',
    featuredCard: '#fce5f2',
    featuredLabel: '#1f5e3b',
  },
  'new-year': {
    profileCard: 'linear-gradient(121.56deg, #ffffff 8.86%, #d2d9ef 97.38%)',
    collectionCard: '#f6f8fc',
    productCard: '#f6f8fc',
    featuredCard: '#f5edd8',
    featuredLabel: '#1d2b53',
  },
}

export function backdropColors(id: string): BackdropColorTokens {
  return BACKDROP_COLORS[id] ?? plain
}

