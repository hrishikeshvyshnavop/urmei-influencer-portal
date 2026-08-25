export type Product = {
  id: string
  brand: string
  name: string
  /** Variant shown in the add-to-shop modal, e.g. "100 ML | Clear essence" — the
   *  default selection whenever the modal opens fresh for this product. */
  variant: string
  /** Choices offered by the modal's size dropdown; always includes `variant`. */
  variantOptions: string[]
  /** Range shown in search results and on the detail page */
  priceRange: string
  /** Single price shown in the modal and on the shop card */
  price: string
  /** Struck-through price in the modal */
  modalCompareAt: string
  /** Struck-through price on the shop card */
  shopCompareAt: string
  savePct: string
  commissionBadge: string
  commissionPerSale: string
  regions: string[]
  rating: number
  reviewCount: number
  oneTimePurchase: string
  subscription: string
  listImage: string
  heroImage: string
  thumbnails: string[]
  shopCardImage: string
  /** Extra terms the catalogue search matches on. */
  keywords: string[]
  /** Accordion bodies. Placeholder copy — the Figma flow only specs the collapsed state. */
  details: { productDetails: string; ingredients: string; howToUse: string; returns: string }
  /** Shown on the product-detail page once the item is in the shop. Figma only demos
   *  these numbers for one product (Water Bank); every other product inherits them. */
  performance: { unitsSold: number; commissionEarned: string; linkClicks: string; conversionRate: string }
}

export type ShopItem = {
  /** Unique per added row — the same product can be added more than once,
   *  provided each addition is for a different variant (see
   *  `AddToShopModal`, which blocks re-adding one already in `variant`). */
  id: string
  product: Product
  featured: boolean
  variant: string
}

export type OverlayView =
  | { kind: 'catalogue' }
  | { kind: 'brands' }
  | { kind: 'results'; query: string }
  | { kind: 'detail'; query: string; product: Product }
