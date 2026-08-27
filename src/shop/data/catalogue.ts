import type { Product } from '../types'

export const CATEGORIES = [
  { label: 'SERUM', image: '/assets/img/cat-serum.png' },
  { label: 'SUNCARE', image: '/assets/img/cat-suncare.png' },
  { label: 'EYE CREAM', image: '/assets/img/cat-eye-cream.png' },
  { label: 'CLEANSER', image: '/assets/img/cat-cleanser.png' },
  { label: 'LOTION', image: '/assets/img/cat-lotion.png' },
  { label: 'MOISTURIZER', image: '/assets/img/cat-moisturizer.png' },
]

/**
 * Figma's "Brands" tiles are generic placeholder logo marks, not each brand's
 * real wordmark, so there's no faithful image for all 7 catalogue brands —
 * these reuse the 5 available placeholders against 5 of the 7 real brands.
 */
export const BRAND_LOGOS = [
  { name: 'LANEIGE', image: '/assets/img/brand-1.png' },
  { name: 'COSRX', image: '/assets/img/brand-2.png' },
  { name: 'INNISFREE', image: '/assets/img/brand-3.png' },
  { name: 'SULWHASOO', image: '/assets/img/brand-4.png' },
  { name: 'ETUDE HOUSE', image: '/assets/img/brand-5.png' },
]

export const INGREDIENTS = [
  { label: 'Retinol', image: '/assets/img/ing-retinol.png' },
  { label: 'Glycolic Acid', image: '/assets/img/ing-glycolic-acid.png' },
  { label: 'Vitamin C', image: '/assets/img/ing-vitamin-c.png' },
  { label: 'Niacinamide', image: '/assets/img/ing-niacinamide.png' },
]

export const PRICE_BUCKETS = [
  { id: 'under-20', label: 'Under S$20', test: (price: number) => price < 20 },
  { id: '20-40', label: 'S$20 – S$40', test: (price: number) => price >= 20 && price <= 40 },
  { id: '40-60', label: 'S$40 – S$60', test: (price: number) => price > 40 && price <= 60 },
  { id: 'above-60', label: 'Above S$60', test: (price: number) => price > 60 },
]

export const RATING_THRESHOLDS = [
  { min: 4, label: '4★ & up' },
  { min: 3, label: '3★ & up' },
]

export const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'commission-asc', label: 'Commission (low to high)' },
  { id: 'commission-desc', label: 'Commission (high to low)' },
  { id: 'latest', label: 'Latest Arrivals' },
  { id: 'top-performing', label: 'Top Performing' },
] as const
export type SortId = (typeof SORT_OPTIONS)[number]['id']

/** Autocomplete entries offered under the catalogue search field. */
export const SEARCH_SUGGESTIONS = [
  {
    text: 'LANEIGE Water Bank Blue Hyaluronic Cream',
    thumbnail: '/assets/img/featured-laneige.png',
  },
]

/** Shared across every product — the Figma flow only specs the collapsed
 *  accordion state, never distinct copy per product. */
const PLACEHOLDER_DETAILS = {
  productDetails:
    'A lightweight formula that delivers its key actives for long-lasting results without a heavy finish.',
  ingredients:
    'Water, Glycerin, Dimethicone, Butylene Glycol, Panthenol, Squalane, and the active ingredient named above.',
  howToUse:
    'After cleansing, warm a small amount between fingertips and press gently over the face and neck, morning and night.',
  returns:
    'Sourced directly from the brand. Unopened items can be returned within 30 days of delivery.',
}

/** Shared across every product — Figma only demos these numbers for one
 *  product (Water Bank) on the product-detail page, so every other product
 *  inherits them rather than inventing unverified performance history. */
const PLACEHOLDER_PERFORMANCE = {
  unitsSold: 128,
  commissionEarned: 'S$568.32',
  linkClicks: '2,410',
  conversionRate: '10%',
}

export const PRODUCTS: Product[] = [
  {
    id: 'laneige-water-bank',
    brand: 'LANEIGE',
    name: 'Water Bank Blue Hyaluronic Cream',
    variant: '100 ML | Clear essence',
    variantOptions: ['10 ML | Clear essence', '50 ML | Clear essence', '100 ML | Clear essence'],
    priceRange: 'S$57 - S$89',
    price: 'S$45',
    modalCompareAt: 'S$87',
    shopCompareAt: 'S$52',
    savePct: 'SAVE 13%',
    commissionBadge: '12%',
    commissionPerSale: '10% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.2,
    reviewCount: 52,
    oneTimePurchase: 'S$27.00 Pay once',
    subscription: 'Get product for S$25/Month',
    listImage: '/assets/img/featured-laneige.png',
    heroImage: '/assets/img/featured-laneige.png',
    thumbnails: Array(5).fill('/assets/img/featured-laneige.png'),
    shopCardImage: '/assets/img/featured-laneige.png',
    keywords: ['laneige', 'water', 'bank', 'blue', 'hyaluronic', 'cream', 'moisturizer'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'cosrx-snail-96',
    brand: 'COSRX',
    name: 'Advanced Snail 96 Mucin Power Essence',
    variant: '100 ML | Clear essence',
    variantOptions: ['30 ML | Clear essence', '50 ML | Clear essence', '100 ML | Clear essence'],
    priceRange: 'S$19 - S$24',
    price: 'S$19',
    modalCompareAt: 'S$24',
    shopCompareAt: 'S$24',
    savePct: 'SAVE 20%',
    commissionBadge: '15%',
    commissionPerSale: '15% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.6,
    reviewCount: 214,
    oneTimePurchase: 'S$19.00 Pay once',
    subscription: 'Get product for S$17/Month',
    listImage: '/assets/img/featured-cosrx.png',
    heroImage: '/assets/img/featured-cosrx.png',
    thumbnails: Array(5).fill('/assets/img/featured-cosrx.png'),
    shopCardImage: '/assets/img/featured-cosrx.png',
    keywords: ['cosrx', 'snail', 'mucin', 'power', 'essence', 'serum'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'innisfree-green-tea-seed',
    brand: 'INNISFREE',
    name: 'Green Tea Seed Hyaluronic Cream',
    variant: '50 ML | Light green',
    variantOptions: ['25 ML | Light green', '50 ML | Light green', '80 ML | Light green'],
    /* Figma's own shop-card shows the "compare at" price below the current one
       even though it's lower — copied as designed rather than corrected. */
    priceRange: 'S$38 - S$52',
    price: 'S$52',
    modalCompareAt: 'S$38',
    shopCompareAt: 'S$38',
    savePct: 'SAVE 15%',
    commissionBadge: '10%',
    commissionPerSale: '10% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.3,
    reviewCount: 89,
    oneTimePurchase: 'S$52.00 Pay once',
    subscription: 'Get product for S$47/Month',
    listImage: '/assets/img/featured-innisfree.png',
    heroImage: '/assets/img/featured-innisfree.png',
    thumbnails: Array(5).fill('/assets/img/featured-innisfree.png'),
    shopCardImage: '/assets/img/featured-innisfree.png',
    keywords: ['innisfree', 'green', 'tea', 'seed', 'hyaluronic', 'cream', 'moisturizer'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'sulwhasoo-first-care',
    brand: 'SULWHASOO',
    name: 'First Care Activating Serum',
    variant: '60 ML | Golden serum',
    variantOptions: ['15 ML | Golden serum', '30 ML | Golden serum', '60 ML | Golden serum'],
    priceRange: 'S$89 - S$108',
    price: 'S$89',
    modalCompareAt: 'S$108',
    shopCompareAt: 'S$108',
    savePct: 'SAVE 17%',
    commissionBadge: '18%',
    commissionPerSale: '18% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.7,
    reviewCount: 312,
    oneTimePurchase: 'S$89.00 Pay once',
    subscription: 'Get product for S$80/Month',
    listImage: '/assets/img/featured-sulwhasoo.png',
    heroImage: '/assets/img/featured-sulwhasoo.png',
    thumbnails: Array(5).fill('/assets/img/featured-sulwhasoo.png'),
    shopCardImage: '/assets/img/featured-sulwhasoo.png',
    keywords: ['sulwhasoo', 'first', 'care', 'activating', 'serum'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'somebymi-30-days-miracle',
    brand: 'SOME BY MI',
    name: 'AHA BHA PHA 30 Days Miracle Toner',
    variant: '150 ML | Clear toner',
    variantOptions: ['30 ML | Clear toner', '100 ML | Clear toner', '150 ML | Clear toner'],
    priceRange: 'S$15 - S$19',
    price: 'S$15',
    modalCompareAt: 'S$19',
    shopCompareAt: 'S$19',
    savePct: 'SAVE 21%',
    commissionBadge: '14%',
    commissionPerSale: '14% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.4,
    reviewCount: 501,
    oneTimePurchase: 'S$15.00 Pay once',
    subscription: 'Get product for S$13/Month',
    listImage: '/assets/img/featured-somebymi.png',
    heroImage: '/assets/img/featured-somebymi.png',
    thumbnails: Array(5).fill('/assets/img/featured-somebymi.png'),
    shopCardImage: '/assets/img/featured-somebymi.png',
    keywords: ['some', 'by', 'mi', 'aha', 'bha', 'pha', 'glycolic', 'acid', 'miracle', 'toner', 'cleanser'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'etudehouse-soonjung',
    brand: 'ETUDE HOUSE',
    name: 'SoonJung 2x Barrier Intensive Cream',
    variant: '60 ML | White cream',
    variantOptions: ['20 ML | White cream', '40 ML | White cream', '60 ML | White cream'],
    priceRange: 'S$22 - S$28',
    price: 'S$22',
    modalCompareAt: 'S$28',
    shopCompareAt: 'S$28',
    savePct: 'SAVE 21%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.1,
    reviewCount: 76,
    oneTimePurchase: 'S$22.00 Pay once',
    subscription: 'Get product for S$19/Month',
    listImage: '/assets/img/featured-etudehouse.png',
    heroImage: '/assets/img/featured-etudehouse.png',
    thumbnails: Array(5).fill('/assets/img/featured-etudehouse.png'),
    shopCardImage: '/assets/img/featured-etudehouse.png',
    keywords: ['etude', 'house', 'soonjung', 'barrier', 'intensive', 'cream', 'moisturizer'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'missha-time-revolution',
    brand: 'MISSHA',
    name: 'Time Revolution Night Repair Ampoule',
    variant: '50 ML | Purple serum',
    variantOptions: ['25 ML | Purple serum', '50 ML | Purple serum', '90 ML | Purple serum'],
    priceRange: 'S$38 - S$45',
    price: 'S$38',
    modalCompareAt: 'S$45',
    shopCompareAt: 'S$45',
    savePct: 'SAVE 15%',
    commissionBadge: '16%',
    commissionPerSale: '16% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.5,
    reviewCount: 167,
    oneTimePurchase: 'S$38.00 Pay once',
    subscription: 'Get product for S$34/Month',
    /* Same photo COSRX uses — the Figma mock itself reuses this asset for both cards. */
    listImage: '/assets/img/featured-cosrx.png',
    heroImage: '/assets/img/featured-cosrx.png',
    thumbnails: Array(5).fill('/assets/img/featured-cosrx.png'),
    shopCardImage: '/assets/img/featured-cosrx.png',
    keywords: ['missha', 'time', 'revolution', 'night', 'repair', 'ampoule', 'serum'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'laneige-lip-sleeping-mask',
    brand: 'LANEIGE',
    name: 'Lip Sleeping Mask',
    variant: '20 G | Berry balm',
    variantOptions: ['8 G | Berry balm', '20 G | Berry balm'],
    priceRange: 'S$28 - S$32',
    price: 'S$28',
    modalCompareAt: 'S$32',
    shopCompareAt: 'S$32',
    savePct: 'SAVE 13%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.8,
    reviewCount: 940,
    oneTimePurchase: 'S$28.00 Pay once',
    subscription: 'Get product for S$25/Month',
    listImage: '/assets/img/featured-laneige.png',
    heroImage: '/assets/img/featured-laneige.png',
    thumbnails: Array(5).fill('/assets/img/featured-laneige.png'),
    shopCardImage: '/assets/img/featured-laneige.png',
    keywords: ['laneige', 'lip', 'sleeping', 'mask', 'balm'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'cosrx-low-ph-cleanser',
    brand: 'COSRX',
    name: 'Low pH Good Morning Gel Cleanser',
    variant: '150 ML | Clear gel',
    variantOptions: ['50 ML | Clear gel', '150 ML | Clear gel'],
    priceRange: 'S$17 - S$21',
    price: 'S$17',
    modalCompareAt: 'S$21',
    shopCompareAt: 'S$21',
    savePct: 'SAVE 19%',
    commissionBadge: '15%',
    commissionPerSale: '15% Per Sale',
    regions: ['Singapore'],
    rating: 4.5,
    reviewCount: 388,
    oneTimePurchase: 'S$17.00 Pay once',
    subscription: 'Get product for S$15/Month',
    /* Reuses COSRX's featured photo, same as MISSHA above — no distinct export for this SKU. */
    listImage: '/assets/img/featured-cosrx.png',
    heroImage: '/assets/img/featured-cosrx.png',
    thumbnails: Array(5).fill('/assets/img/featured-cosrx.png'),
    shopCardImage: '/assets/img/featured-cosrx.png',
    keywords: ['cosrx', 'low', 'ph', 'good', 'morning', 'gel', 'cleanser'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'innisfree-bija-trouble-oil',
    brand: 'INNISFREE',
    name: 'Bija Trouble Facial Oil',
    variant: '30 ML | Amber oil',
    variantOptions: ['15 ML | Amber oil', '30 ML | Amber oil'],
    priceRange: 'S$29 - S$34',
    price: 'S$29',
    modalCompareAt: 'S$34',
    shopCompareAt: 'S$34',
    savePct: 'SAVE 15%',
    commissionBadge: '10%',
    commissionPerSale: '10% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.2,
    reviewCount: 143,
    oneTimePurchase: 'S$29.00 Pay once',
    subscription: 'Get product for S$26/Month',
    listImage: '/assets/img/featured-innisfree.png',
    heroImage: '/assets/img/featured-innisfree.png',
    thumbnails: Array(5).fill('/assets/img/featured-innisfree.png'),
    shopCardImage: '/assets/img/featured-innisfree.png',
    keywords: ['innisfree', 'bija', 'trouble', 'facial', 'oil'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'sulwhasoo-concentrated-ginseng',
    brand: 'SULWHASOO',
    name: 'Concentrated Ginseng Renewing Cream',
    variant: '60 ML | Amber cream',
    variantOptions: ['5 ML | Amber cream', '60 ML | Amber cream'],
    priceRange: 'S$165 - S$195',
    price: 'S$165',
    modalCompareAt: 'S$195',
    shopCompareAt: 'S$195',
    savePct: 'SAVE 15%',
    commissionBadge: '18%',
    commissionPerSale: '18% Per Sale',
    regions: ['Singapore'],
    rating: 4.6,
    reviewCount: 201,
    oneTimePurchase: 'S$165.00 Pay once',
    subscription: 'Get product for S$149/Month',
    listImage: '/assets/img/featured-sulwhasoo.png',
    heroImage: '/assets/img/featured-sulwhasoo.png',
    thumbnails: Array(5).fill('/assets/img/featured-sulwhasoo.png'),
    shopCardImage: '/assets/img/featured-sulwhasoo.png',
    keywords: ['sulwhasoo', 'concentrated', 'ginseng', 'renewing', 'cream', 'moisturizer'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'somebymi-retinol-serum',
    brand: 'SOME BY MI',
    name: 'Retinol Intense Reactivating Serum',
    variant: '30 ML | Amber serum',
    variantOptions: ['15 ML | Amber serum', '30 ML | Amber serum'],
    priceRange: 'S$18 - S$23',
    price: 'S$18',
    modalCompareAt: 'S$23',
    shopCompareAt: 'S$23',
    savePct: 'SAVE 22%',
    commissionBadge: '14%',
    commissionPerSale: '14% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.3,
    reviewCount: 267,
    oneTimePurchase: 'S$18.00 Pay once',
    subscription: 'Get product for S$16/Month',
    listImage: '/assets/img/featured-somebymi.png',
    heroImage: '/assets/img/featured-somebymi.png',
    thumbnails: Array(5).fill('/assets/img/featured-somebymi.png'),
    shopCardImage: '/assets/img/featured-somebymi.png',
    keywords: ['some', 'by', 'mi', 'retinol', 'intense', 'reactivating', 'serum'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'etudehouse-soonjung-essence',
    brand: 'ETUDE HOUSE',
    name: 'SoonJung Hydro Barrier Essence',
    variant: '135 ML | Clear essence',
    variantOptions: ['50 ML | Clear essence', '135 ML | Clear essence'],
    priceRange: 'S$24 - S$29',
    price: 'S$24',
    modalCompareAt: 'S$29',
    shopCompareAt: 'S$29',
    savePct: 'SAVE 17%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore'],
    rating: 4.4,
    reviewCount: 118,
    oneTimePurchase: 'S$24.00 Pay once',
    subscription: 'Get product for S$21/Month',
    listImage: '/assets/img/featured-etudehouse.png',
    heroImage: '/assets/img/featured-etudehouse.png',
    thumbnails: Array(5).fill('/assets/img/featured-etudehouse.png'),
    shopCardImage: '/assets/img/featured-etudehouse.png',
    keywords: ['etude', 'house', 'soonjung', 'hydro', 'barrier', 'essence'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'missha-artemisia-essence',
    brand: 'MISSHA',
    name: 'Time Revolution Artemisia Treatment Essence',
    variant: '150 ML | Green essence',
    variantOptions: ['30 ML | Green essence', '150 ML | Green essence'],
    priceRange: 'S$36 - S$42',
    price: 'S$36',
    modalCompareAt: 'S$42',
    shopCompareAt: 'S$42',
    savePct: 'SAVE 14%',
    commissionBadge: '16%',
    commissionPerSale: '16% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.6,
    reviewCount: 229,
    oneTimePurchase: 'S$36.00 Pay once',
    subscription: 'Get product for S$32/Month',
    /* Same photo COSRX uses, as with this brand's other SKU above. */
    listImage: '/assets/img/featured-cosrx.png',
    heroImage: '/assets/img/featured-cosrx.png',
    thumbnails: Array(5).fill('/assets/img/featured-cosrx.png'),
    shopCardImage: '/assets/img/featured-cosrx.png',
    keywords: ['missha', 'time', 'revolution', 'artemisia', 'treatment', 'essence'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    /* No product in the catalogue matched the "SUNCARE" category tile before this. */
    id: 'cosrx-aloe-sun-cream',
    brand: 'COSRX',
    name: 'Aloe Soothing Sun Cream SPF50',
    variant: '50 ML | Light cream',
    variantOptions: ['50 ML | Light cream'],
    priceRange: 'S$21 - S$25',
    price: 'S$21',
    modalCompareAt: 'S$25',
    shopCompareAt: 'S$25',
    savePct: 'SAVE 16%',
    commissionBadge: '15%',
    commissionPerSale: '15% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.4,
    reviewCount: 176,
    oneTimePurchase: 'S$21.00 Pay once',
    subscription: 'Get product for S$19/Month',
    listImage: '/assets/img/featured-cosrx.png',
    heroImage: '/assets/img/featured-cosrx.png',
    thumbnails: Array(5).fill('/assets/img/featured-cosrx.png'),
    shopCardImage: '/assets/img/featured-cosrx.png',
    keywords: ['cosrx', 'aloe', 'soothing', 'sun', 'suncare', 'sunscreen', 'spf'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    /* No product in the catalogue matched the "LOTION" category tile before this. */
    id: 'laneige-water-bank-lotion',
    brand: 'LANEIGE',
    name: 'Water Bank Blue Hyaluronic Lotion',
    variant: '120 ML | Clear lotion',
    variantOptions: ['120 ML | Clear lotion'],
    priceRange: 'S$48 - S$55',
    price: 'S$48',
    modalCompareAt: 'S$55',
    shopCompareAt: 'S$55',
    savePct: 'SAVE 13%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.3,
    reviewCount: 310,
    oneTimePurchase: 'S$48.00 Pay once',
    subscription: 'Get product for S$43/Month',
    listImage: '/assets/img/featured-laneige.png',
    heroImage: '/assets/img/featured-laneige.png',
    thumbnails: Array(5).fill('/assets/img/featured-laneige.png'),
    shopCardImage: '/assets/img/featured-laneige.png',
    keywords: ['laneige', 'water', 'bank', 'blue', 'hyaluronic', 'lotion', 'moisturizer'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    /* "EYE CREAM" previously only "matched" by accident, via the unrelated
     * word "cream" shared with several face-cream products. */
    id: 'etudehouse-soonjung-eye-cream',
    brand: 'ETUDE HOUSE',
    name: 'SoonJung Barrier Repair Eye Cream',
    variant: '25 ML | White cream',
    variantOptions: ['25 ML | White cream'],
    priceRange: 'S$19 - S$23',
    price: 'S$19',
    modalCompareAt: 'S$23',
    shopCompareAt: 'S$23',
    savePct: 'SAVE 17%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore'],
    rating: 4.2,
    reviewCount: 64,
    oneTimePurchase: 'S$19.00 Pay once',
    subscription: 'Get product for S$17/Month',
    listImage: '/assets/img/featured-etudehouse.png',
    heroImage: '/assets/img/featured-etudehouse.png',
    thumbnails: Array(5).fill('/assets/img/featured-etudehouse.png'),
    shopCardImage: '/assets/img/featured-etudehouse.png',
    keywords: ['etude', 'house', 'soonjung', 'barrier', 'repair', 'eye', 'cream'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    /* No product in the catalogue matched the "Niacinamide" ingredient tile before this. */
    id: 'cosrx-niacinamide-serum',
    brand: 'COSRX',
    name: 'Niacinamide 15 Glow Targeting Serum',
    variant: '20 ML | Clear serum',
    variantOptions: ['20 ML | Clear serum'],
    priceRange: 'S$23 - S$27',
    price: 'S$23',
    modalCompareAt: 'S$27',
    shopCompareAt: 'S$27',
    savePct: 'SAVE 15%',
    commissionBadge: '15%',
    commissionPerSale: '15% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.5,
    reviewCount: 198,
    oneTimePurchase: 'S$23.00 Pay once',
    subscription: 'Get product for S$20/Month',
    listImage: '/assets/img/featured-cosrx.png',
    heroImage: '/assets/img/featured-cosrx.png',
    thumbnails: Array(5).fill('/assets/img/featured-cosrx.png'),
    shopCardImage: '/assets/img/featured-cosrx.png',
    keywords: ['cosrx', 'niacinamide', 'glow', 'targeting', 'serum', 'brightening'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    /* "Vitamin C" previously only "matched" by accident — its second search
     * term, the single letter "c", is a substring of nearly every product. */
    id: 'somebymi-vitamin-c-serum',
    brand: 'SOME BY MI',
    name: 'Galactomyces Pure Vitamin C Glow Serum',
    variant: '50 ML | Amber serum',
    variantOptions: ['50 ML | Amber serum'],
    priceRange: 'S$20 - S$24',
    price: 'S$20',
    modalCompareAt: 'S$24',
    shopCompareAt: 'S$24',
    savePct: 'SAVE 17%',
    commissionBadge: '14%',
    commissionPerSale: '14% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.4,
    reviewCount: 152,
    oneTimePurchase: 'S$20.00 Pay once',
    subscription: 'Get product for S$18/Month',
    listImage: '/assets/img/featured-somebymi.png',
    heroImage: '/assets/img/featured-somebymi.png',
    thumbnails: Array(5).fill('/assets/img/featured-somebymi.png'),
    shopCardImage: '/assets/img/featured-somebymi.png',
    keywords: ['some', 'by', 'mi', 'galactomyces', 'pure', 'vitamin', 'c', 'vitamin-c', 'glow', 'serum'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  // One product per Brands-page tile (Figma 1364:16002) so selecting any
  // brand there always lands on a non-empty listing — these brands don't
  // otherwise appear in the catalogue above, and reuse each brand's own
  // logo card as product imagery since there's no real product photography.
  {
    id: 'etude-dear-darling-tint',
    brand: 'ETUDE',
    name: 'Dear Darling Water Tint',
    variant: '5 G | Coral shade',
    variantOptions: ['5 G | Coral shade', '5 G | Rose shade'],
    priceRange: 'S$14 - S$16',
    price: 'S$14',
    modalCompareAt: 'S$16',
    shopCompareAt: 'S$16',
    savePct: 'SAVE 13%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.3,
    reviewCount: 64,
    oneTimePurchase: 'S$14.00 Pay once',
    subscription: 'Get product for S$12/Month',
    listImage: '/urmei/brands/brand-01.png',
    heroImage: '/urmei/brands/brand-01.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-01.png'),
    shopCardImage: '/urmei/brands/brand-01.png',
    keywords: ['etude', 'dear', 'darling', 'water', 'tint', 'lip'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'allies-of-skin-vitamin-c-serum',
    brand: 'Allies of Skin',
    name: 'Vitamin C Brightening Serum',
    variant: '30 ML | Amber serum',
    variantOptions: ['30 ML | Amber serum'],
    priceRange: 'S$78 - S$92',
    price: 'S$78',
    modalCompareAt: 'S$92',
    shopCompareAt: 'S$92',
    savePct: 'SAVE 15%',
    commissionBadge: '10%',
    commissionPerSale: '10% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.6,
    reviewCount: 41,
    oneTimePurchase: 'S$78.00 Pay once',
    subscription: 'Get product for S$70/Month',
    listImage: '/urmei/brands/brand-02.png',
    heroImage: '/urmei/brands/brand-02.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-02.png'),
    shopCardImage: '/urmei/brands/brand-02.png',
    keywords: ['allies', 'of', 'skin', 'vitamin', 'c', 'brightening', 'serum'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'rae-cosmetics-setting-powder',
    brand: 'rae Cosmetics',
    name: 'Barely There Setting Powder',
    variant: '8 G | Translucent',
    variantOptions: ['8 G | Translucent'],
    priceRange: 'S$18 - S$22',
    price: 'S$18',
    modalCompareAt: 'S$22',
    shopCompareAt: 'S$22',
    savePct: 'SAVE 18%',
    commissionBadge: '13%',
    commissionPerSale: '13% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.1,
    reviewCount: 37,
    oneTimePurchase: 'S$18.00 Pay once',
    subscription: 'Get product for S$16/Month',
    listImage: '/urmei/brands/brand-03.png',
    heroImage: '/urmei/brands/brand-03.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-03.png'),
    shopCardImage: '/urmei/brands/brand-03.png',
    keywords: ['rae', 'cosmetics', 'barely', 'there', 'setting', 'powder'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'porcelain-skincare-retinol-cream',
    brand: 'Porcelain Skincare',
    name: 'Renewal Retinol Night Cream',
    variant: '50 ML | White cream',
    variantOptions: ['50 ML | White cream'],
    priceRange: 'S$62 - S$74',
    price: 'S$62',
    modalCompareAt: 'S$74',
    shopCompareAt: 'S$74',
    savePct: 'SAVE 16%',
    commissionBadge: '11%',
    commissionPerSale: '11% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.5,
    reviewCount: 58,
    oneTimePurchase: 'S$62.00 Pay once',
    subscription: 'Get product for S$56/Month',
    listImage: '/urmei/brands/brand-04.png',
    heroImage: '/urmei/brands/brand-04.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-04.png'),
    shopCardImage: '/urmei/brands/brand-04.png',
    keywords: ['porcelain', 'skincare', 'renewal', 'retinol', 'night', 'cream'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'klavuu-pearlsation-eye-cream',
    brand: 'KLAVUU',
    name: 'Pure Pearlsation Revitalizing Eye Cream',
    variant: '20 ML | Pearl cream',
    variantOptions: ['20 ML | Pearl cream'],
    priceRange: 'S$34 - S$40',
    price: 'S$34',
    modalCompareAt: 'S$40',
    shopCompareAt: 'S$40',
    savePct: 'SAVE 15%',
    commissionBadge: '14%',
    commissionPerSale: '14% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.4,
    reviewCount: 73,
    oneTimePurchase: 'S$34.00 Pay once',
    subscription: 'Get product for S$30/Month',
    listImage: '/urmei/brands/brand-05.png',
    heroImage: '/urmei/brands/brand-05.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-05.png'),
    shopCardImage: '/urmei/brands/brand-05.png',
    keywords: ['klavuu', 'pure', 'pearlsation', 'revitalizing', 'eye', 'cream'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'browhaus-brow-gel-duo',
    brand: 'Browhaus',
    name: 'Browhaus Brow Gel Duo',
    variant: '2 X 3 G | Taupe',
    variantOptions: ['2 X 3 G | Taupe', '2 X 3 G | Ash brown'],
    priceRange: 'S$28 - S$32',
    price: 'S$28',
    modalCompareAt: 'S$32',
    shopCompareAt: 'S$32',
    savePct: 'SAVE 12%',
    commissionBadge: '15%',
    commissionPerSale: '15% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.2,
    reviewCount: 29,
    oneTimePurchase: 'S$28.00 Pay once',
    subscription: 'Get product for S$25/Month',
    listImage: '/urmei/brands/brand-06.png',
    heroImage: '/urmei/brands/brand-06.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-06.png'),
    shopCardImage: '/urmei/brands/brand-06.png',
    keywords: ['browhaus', 'brow', 'gel', 'duo'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'btf-hydra-glow-essence',
    brand: 'BTF',
    name: 'Hydra Glow Essence',
    variant: '80 ML | Clear essence',
    variantOptions: ['80 ML | Clear essence'],
    priceRange: 'S$24 - S$29',
    price: 'S$24',
    modalCompareAt: 'S$29',
    shopCompareAt: 'S$29',
    savePct: 'SAVE 17%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.0,
    reviewCount: 22,
    oneTimePurchase: 'S$24.00 Pay once',
    subscription: 'Get product for S$21/Month',
    listImage: '/urmei/brands/brand-07.png',
    heroImage: '/urmei/brands/brand-07.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-07.png'),
    shopCardImage: '/urmei/brands/brand-07.png',
    keywords: ['btf', 'hydra', 'glow', 'essence'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'sigi-skin-pore-serum',
    brand: 'SIGI SKIN',
    name: 'Pore Perfecting Serum',
    variant: '30 ML | Clear serum',
    variantOptions: ['30 ML | Clear serum'],
    priceRange: 'S$42 - S$48',
    price: 'S$42',
    modalCompareAt: 'S$48',
    shopCompareAt: 'S$48',
    savePct: 'SAVE 13%',
    commissionBadge: '13%',
    commissionPerSale: '13% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.5,
    reviewCount: 46,
    oneTimePurchase: 'S$42.00 Pay once',
    subscription: 'Get product for S$38/Month',
    listImage: '/urmei/brands/brand-08.png',
    heroImage: '/urmei/brands/brand-08.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-08.png'),
    shopCardImage: '/urmei/brands/brand-08.png',
    keywords: ['sigi', 'skin', 'pore', 'perfecting', 'serum'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'liht-radiance-oil',
    brand: 'Liht',
    name: 'Radiance Renewal Oil',
    variant: '30 ML | Amber oil',
    variantOptions: ['30 ML | Amber oil'],
    priceRange: 'S$32 - S$38',
    price: 'S$32',
    modalCompareAt: 'S$38',
    shopCompareAt: 'S$38',
    savePct: 'SAVE 16%',
    commissionBadge: '11%',
    commissionPerSale: '11% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.3,
    reviewCount: 19,
    oneTimePurchase: 'S$32.00 Pay once',
    subscription: 'Get product for S$29/Month',
    listImage: '/urmei/brands/brand-09.png',
    heroImage: '/urmei/brands/brand-09.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-09.png'),
    shopCardImage: '/urmei/brands/brand-09.png',
    keywords: ['liht', 'radiance', 'renewal', 'oil'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'mudo-labs-barrier-moisturizer',
    brand: 'MUDO LABS',
    name: 'Barrier Repair Moisturizer',
    variant: '60 ML | White cream',
    variantOptions: ['60 ML | White cream'],
    priceRange: 'S$36 - S$42',
    price: 'S$36',
    modalCompareAt: 'S$42',
    shopCompareAt: 'S$42',
    savePct: 'SAVE 14%',
    commissionBadge: '12%',
    commissionPerSale: '12% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.4,
    reviewCount: 33,
    oneTimePurchase: 'S$36.00 Pay once',
    subscription: 'Get product for S$32/Month',
    listImage: '/urmei/brands/brand-10.png',
    heroImage: '/urmei/brands/brand-10.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-10.png'),
    shopCardImage: '/urmei/brands/brand-10.png',
    keywords: ['mudo', 'labs', 'barrier', 'repair', 'moisturizer'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
  {
    id: 'boundary-daily-sunscreen',
    brand: 'BOUNDARY',
    name: 'Daily Defense Sunscreen SPF50',
    variant: '50 ML | Clear lotion',
    variantOptions: ['50 ML | Clear lotion'],
    priceRange: 'S$26 - S$30',
    price: 'S$26',
    modalCompareAt: 'S$30',
    shopCompareAt: 'S$30',
    savePct: 'SAVE 13%',
    commissionBadge: '13%',
    commissionPerSale: '13% Per Sale',
    regions: ['Singapore', 'Malaysia'],
    rating: 4.6,
    reviewCount: 51,
    oneTimePurchase: 'S$26.00 Pay once',
    subscription: 'Get product for S$23/Month',
    listImage: '/urmei/brands/brand-11.png',
    heroImage: '/urmei/brands/brand-11.png',
    thumbnails: Array(5).fill('/urmei/brands/brand-11.png'),
    shopCardImage: '/urmei/brands/brand-11.png',
    keywords: ['boundary', 'daily', 'defense', 'sunscreen', 'spf50'],
    details: PLACEHOLDER_DETAILS,
    performance: PLACEHOLDER_PERFORMANCE,
  },
]

/**
 * Case-insensitive match across brand, name and keywords. The literal query
 * "All" (any case) bypasses matching entirely and returns the full catalogue —
 * used by the catalogue's "View All" action alongside the regular per-term search.
 * An empty (or whitespace-only) query means the same thing: with the search
 * box cleared there's no active term to narrow by, so show everything rather
 * than nothing — that's what lets clearing the box fall straight back to the
 * full catalogue instead of flashing an empty-results state.
 */
export function searchProducts(query: string): Product[] {
  const trimmed = query.trim()
  if (trimmed === '' || trimmed.toLowerCase() === 'all') return PRODUCTS

  // Single-character terms (e.g. the "C" in "Vitamin C") are a substring of
  // almost every product and would swamp real matches with noise.
  const terms = trimmed.toLowerCase().split(/\s+/).filter((term) => term.length > 1)
  if (terms.length === 0) return []
  return PRODUCTS.filter((product) => {
    const haystack = [product.brand, product.name, ...product.keywords].join(' ').toLowerCase()
    return terms.some((term) => haystack.includes(term))
  })
}

/** All brands actually present in the catalogue, in catalogue order — the
 *  Brand filter's checkbox list (Figma `1184:70079` names brands we don't
 *  carry, like "Dr. Jart+", so this derives the real list instead). */
export const FILTER_BRANDS = Array.from(new Set(PRODUCTS.map((product) => product.brand)))

function parseCurrency(value: string): number {
  return Number(value.replace(/[^0-9.]/g, ''))
}

function parsePercent(value: string): number {
  return Number(value.replace(/[^0-9.]/g, ''))
}

export type ProductFilters = {
  brands: string[]
  priceBuckets: string[]
  ratingThresholds: number[]
  /** `CATEGORIES`/`INGREDIENTS` labels, matched the same loose way `searchProducts`
   *  matches a typed query — so "clicking a category" and "checking a category
   *  filter" behave identically. */
  categories: string[]
  ingredients: string[]
  /** `Product.regions` values. Matched exactly rather than through `haystack`,
   *  since a product's markets are structured data, not free text. */
  countries: string[]
}

export const EMPTY_FILTERS: ProductFilters = {
  brands: [],
  priceBuckets: [],
  ratingThresholds: [],
  categories: [],
  ingredients: [],
  countries: [],
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return (
    filters.brands.length > 0 ||
    filters.priceBuckets.length > 0 ||
    filters.ratingThresholds.length > 0 ||
    filters.categories.length > 0 ||
    filters.ingredients.length > 0 ||
    filters.countries.length > 0
  )
}

export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    if (filters.brands.length && !filters.brands.includes(product.brand)) return false

    if (
      filters.countries.length &&
      !filters.countries.some((country) => product.regions.includes(country))
    ) {
      return false
    }

    if (filters.priceBuckets.length) {
      const price = parseCurrency(product.price)
      const inSelectedBucket = filters.priceBuckets.some((id) =>
        PRICE_BUCKETS.find((bucket) => bucket.id === id)?.test(price),
      )
      if (!inSelectedBucket) return false
    }

    if (filters.ratingThresholds.length) {
      const minRating = Math.min(...filters.ratingThresholds)
      if (product.rating < minRating) return false
    }

    const haystack = [product.brand, product.name, ...product.keywords].join(' ').toLowerCase()
    if (
      filters.categories.length &&
      !filters.categories.some((category) => haystack.includes(category.toLowerCase()))
    ) {
      return false
    }
    if (
      filters.ingredients.length &&
      !filters.ingredients.some((ingredient) => haystack.includes(ingredient.toLowerCase()))
    ) {
      return false
    }

    return true
  })
}

/** `relevance` keeps `products`' incoming order (already relevance-ranked by
 *  `searchProducts`). `latest` has no real timestamp to sort by, so it uses
 *  reverse catalogue order as a stand-in for "newest first". */
export function sortProducts(products: Product[], sortBy: SortId): Product[] {
  if (sortBy === 'relevance') return products

  const sorted = [...products]
  if (sortBy === 'commission-asc') {
    sorted.sort((a, b) => parsePercent(a.commissionBadge) - parsePercent(b.commissionBadge))
  } else if (sortBy === 'commission-desc') {
    sorted.sort((a, b) => parsePercent(b.commissionBadge) - parsePercent(a.commissionBadge))
  } else if (sortBy === 'latest') {
    sorted.reverse()
  } else if (sortBy === 'top-performing') {
    sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
  }
  return sorted
}
