# Shop collections: client requirement

Received 2026-10-06. Status: **not started**. Tracked as `T-31` in `TRACKER.md`.

Links: replaces the current **Favorites** feature in My Shop and the storefront (`src/shop/limits.ts` cap of 4, `ShopItem.favorite`, the storefront's Favorite Picks section).

## Client message (verbatim)

> We are rethinking changing the way we want to do favorites. We would like to have a comprehensive personalization feature for the creator's shop making the space like Pinterest, where creator's can curate their own collections/boards and add products to each collection.
>
> The idea is to give creator sufficient flexibility to make the space their own. Example: a creator could create a collection/board that says "My morning routine" and add products accordingly or "Copy my wedding look".
>
> Each collection would have a name and description which is a one-liner to add more context to the nature of the collection.
>
> Practically for MVP, I don't think we should make too many adjustments now. But to prevent rework later, can we make the collection name editable instead of fixing it as "Favourites" and allow for multiple collections?

Follow-up from Nelson Seh:

> Post MVP, we should think about giving creators the ability to add other types of content other than products on URMEI. Examples of such content would be photos, videos, etc. This would help to create a hook for consumers and give them a reason to follow a creator. Thoughts?

## Scope

### MVP (requested now)

| # | Requirement |
|---|---|
| 1 | A creator can have **multiple collections** instead of one fixed "Favorites" list. |
| 2 | Each collection has an **editable name**, so it is no longer fixed as "Favourites". |
| 3 | Each collection has a **one-line description** that adds context, e.g. "My morning routine" or "Copy my wedding look". |
| 4 | A creator can **add products** to each collection. |

### Long-term vision

- A Pinterest-style, personalised shop where creators curate their own boards.

### Post-MVP (raised for discussion, not agreed)

- Let creators add content other than products to their shop, such as photos and videos, so shoppers have a reason to follow a creator.

## Open questions for the client

1. **Cap:** Is there a limit on the number of collections, or on the products in each? Favorites is capped at 4 today.
2. **Membership:** Can one product sit in several collections?
3. **Default:** Does a new shop start with one collection, for example "Favourites", or with none?
4. **Storefront:** How does the storefront show several collections: one section each, tabs, or a board grid like Pinterest? What happens to the "Favorite Picks" section?
5. **Order:** Can the creator reorder collections, and the products inside each one?
6. **Description:** Is the description required or optional, and how long can it be?
7. **Design:** Will Figma frames come for create, edit and delete collection, and for the storefront view?
8. **Migration:** Existing favourites need to move into the first collection.

## Code touch points (current Favorites)

- `src/shop/limits.ts`: favorites cap (4)
- `ShopItem.favorite` in `src/shop/data/*`, which also reads the legacy `featured` key
- `ShopProductCard`: the favorite-rank footer and the overflow-menu action
- Storefront "Favorite Picks" section, in the in-app preview and on `/shop/view`
- `shop/activity-log.ts`: the `product-featured` / `product-unfeatured` activity ids
