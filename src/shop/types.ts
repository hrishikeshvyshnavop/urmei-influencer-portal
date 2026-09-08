export type Product = {
  id: string
  brand: string
  name: string
  /** Top-level shelf the product sits under, used for the storefront product
   *  page's breadcrumb (`Home > Skincare > Serums > ...`, Figma `916:66734`).
   *  Display-ready — title case, singular. Deliberately separate from the
   *  browse filters' `CATEGORIES` list, which is a flat set of upper-case
   *  keyword facets rather than a two-level shelf hierarchy. */
  department: string
  /** Shelf within `department`, e.g. "Serums". Display-ready — title case,
   *  plural, matching the design's own crumb text. */
  category: string
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
  /** Commission span across the product's variants, e.g. "12% - 15%" — the
   *  commission counterpart to `priceRange`, and shown directly beneath it on
   *  the browse overlay's result row (Figma `28:18377`). Deliberately separate
   *  from `commissionBadge`, which is the single figure quoted once a variant
   *  has been chosen (the add-to-shop modal, the shop card, the remove
   *  dialog); a row that spans every variant has to quote a span. */
  commissionRange: string
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
}

export type ShopItem = {
  /** Unique per added row — the same product can be added more than once,
   *  provided each addition is for a different variant (see
   *  `AddToShopModal`, which blocks re-adding one already in `variant`). */
  id: string
  product: Product
  favorite: boolean
  /** When the product was added to the shop, for the product-stats page's
   *  "Added to shop on 19 Sep 2025" line. Null for items persisted before
   *  the field existed. */
  addedAt: number | null
  variant: string
}

export type OverlayView =
  | { kind: 'catalogue' }
  | { kind: 'brands' }
  | { kind: 'results'; query: string }
  | { kind: 'detail'; query: string; product: Product }
