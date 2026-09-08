/**
 * The shop's capacity rules, shared because two screens can add products: the
 * shop itself and Home's quick-add. A limit that lives in one component drifts
 * from the copy in the other — Home was hardcoding 6 favorite slots after the
 * design moved to 4.
 */

/** Products a shop can hold. */
export const MAX_PRODUCTS = 16

/** Favorite slots — "Favorite products (n/4)" throughout Figma section 04
 *  (`1603:40560`), which also words the rule as "Favorite up to 4 of your
 *  picks to put them first on your storefront". */
export const MAX_FAVORITES = 4
