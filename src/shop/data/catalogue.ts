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
    shopVariant: '50 ML | Blue gel cream',
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
    shopVariant: '100 ML | Clear essence',
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
    shopVariant: '50 ML | Light green',
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
    shopVariant: '60 ML | Golden serum',
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
    shopVariant: '150 ML | Clear toner',
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
    shopVariant: '60 ML | White cream',
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
    shopVariant: '50 ML | Purple serum',
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
    shopVariant: '20 G | Berry balm',
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
    shopVariant: '150 ML | Clear gel',
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
    shopVariant: '30 ML | Amber oil',
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
    shopVariant: '60 ML | Amber cream',
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
    shopVariant: '30 ML | Amber serum',
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
    shopVariant: '135 ML | Clear essence',
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
    shopVariant: '150 ML | Green essence',
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
    shopVariant: '50 ML | Light cream',
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
    shopVariant: '120 ML | Clear lotion',
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
    shopVariant: '25 ML | White cream',
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
    shopVariant: '20 ML | Clear serum',
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
    shopVariant: '50 ML | Amber serum',
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
}

export const EMPTY_FILTERS: ProductFilters = {
  brands: [],
  priceBuckets: [],
  ratingThresholds: [],
  categories: [],
  ingredients: [],
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return (
    filters.brands.length > 0 ||
    filters.priceBuckets.length > 0 ||
    filters.ratingThresholds.length > 0 ||
    filters.categories.length > 0 ||
    filters.ingredients.length > 0
  )
}

export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    if (filters.brands.length && !filters.brands.includes(product.brand)) return false

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
