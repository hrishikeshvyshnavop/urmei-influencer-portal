export type CreatorReview = {
  id: string
  /** The shop row this review is for — a creator's experience can differ by
   *  variant, so a review belongs to a `ShopItem`, not just a product id. */
  shopItemId: string
  productId: string
  comment: string
  socialPostUrl?: string
  createdAt: number
  updatedAt: number
}

const CREATOR_REVIEWS_KEY = 'urmei.creator-reviews'

export function loadCreatorReviews(): CreatorReview[] {
  try {
    const raw = window.localStorage.getItem(CREATOR_REVIEWS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CreatorReview[]
  } catch {
    return []
  }
}

function saveCreatorReviews(reviews: CreatorReview[]) {
  try {
    window.localStorage.setItem(CREATOR_REVIEWS_KEY, JSON.stringify(reviews))
  } catch {
    // The current session still works when storage is unavailable.
  }
}

export function reviewForShopItem(shopItemId: string): CreatorReview | null {
  return loadCreatorReviews().find((review) => review.shopItemId === shopItemId) ?? null
}

/** Creates or updates the creator's one review for this shop item. */
export function saveCreatorReview(
  shopItemId: string,
  productId: string,
  input: { comment: string; socialPostUrl?: string },
): CreatorReview {
  const reviews = loadCreatorReviews()
  const existing = reviews.find((review) => review.shopItemId === shopItemId)
  const now = Date.now()
  const next: CreatorReview = existing
    ? { ...existing, comment: input.comment, socialPostUrl: input.socialPostUrl, updatedAt: now }
    : {
        id: `${now}-${Math.random().toString(36).slice(2)}`,
        shopItemId,
        productId,
        comment: input.comment,
        socialPostUrl: input.socialPostUrl,
        createdAt: now,
        updatedAt: now,
      }
  const merged = existing
    ? reviews.map((review) => (review.shopItemId === shopItemId ? next : review))
    : [...reviews, next]
  saveCreatorReviews(merged)
  return next
}
