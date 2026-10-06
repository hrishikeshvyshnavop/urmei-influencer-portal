# Shop collections: client requirement

Received 2026-10-06. Status: **questions answered. Scope for now is Figma designs only; no code changes.** Tracked as `T-31` in `TRACKER.md`. Answers on their own: `COLLECTIONS-ANSWERS.md`.

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

## Decisions (2026-10-06)

| Topic | Decision |
|---|---|
| Collections per creator | No limit |
| Products per collection | No limit |
| One product in several collections | Yes |
| New shop | Starts with one "Favourites" collection, renamable |
| Name / description | Name required (max 40), description optional (max 100) |
| Cover image | None; first few product images |
| Reordering | Not in MVP; newest first |
| Deleting a collection | Products stay in My Shop |
| Hiding a collection | **No hide feature** (changed 2026-10-06): every collection shows on the storefront once the shop is published |
| Adding products | Only from My Shop |
| Storefront | Pinterest-style board grid; a board opens its products |
| Shareable link | Each collection gets its own link, e.g. `/shop/view/<collection>` |
| Existing favourites | Move into "Favourites" automatically |
| Figma | Full designs (create, edit, delete, storefront, mobile) |
| Stats / activity log | Neither in MVP |
| Post-MVP photos/videos, "follow a creator" | Undecided |

Note: the board grid and per-collection links go beyond the client's "not too many adjustments" for the MVP.

**Current scope: Figma designs only.** Design every screen the decisions above need, desktop and mobile, in the Work File. The codebase does not change until the designs are approved and a new task is opened for the build.

## Questions and answers

Each question lists its options, followed by the answer chosen on 2026-10-06.

### Collections basics

**Q1. How many collections can a creator have?**
- a) No limit
- b) A fixed limit, e.g. 10
- c) One for now, with only its name editable; more collections later

**Answer:** a) No limit

**Q2. How many products can one collection hold?**
- a) No limit
- b) A fixed limit, e.g. 20
- c) Keep today's Favorites cap of 4

**Answer:** a) No limit

**Q3. Can the same product be in more than one collection?**
- a) Yes, a product can be in any number of collections
- b) No, each product belongs to one collection only

**Answer:** a) Yes, a product can be in any number of collections

**Q4. What does a new shop start with?**
- a) One default collection called "Favourites" that the creator can rename
- b) No collections until the creator makes one
- c) A few starter collections, e.g. "Favourites" and "New in"

**Answer:** a) One default collection called "Favourites" that the creator can rename

**Q5. Is the one-line description required, and how long can the name and description be?**
- a) Name required (max 40 characters), description optional (max 100 characters)
- b) Both required
- c) Both optional, with a placeholder name such as "Untitled collection"

**Answer:** a) Name required (max 40 characters), description optional (max 100 characters)

**Q6. Does a collection have a cover image?**
- a) No, it is shown through its first few product images
- b) Yes, the creator picks one of the products as the cover
- c) Yes, the creator uploads a cover image

**Answer:** a) No, it is shown through its first few product images

### Managing collections

**Q7. Can creators reorder collections and the products inside them?**
- a) Yes, both, by drag and drop
- b) Collections only; products stay in the order they were added
- c) Not in the MVP: newest first

**Answer:** c) Not in the MVP: newest first

**Q8. What happens to the products when a collection is deleted?**
- a) They stay in My Shop; only the grouping is removed
- b) They are removed from the shop too
- c) The creator chooses each time

**Answer:** a) They stay in My Shop; only the grouping is removed

**Q9. Can a creator hide one collection without unpublishing the whole shop?**
- a) Yes, each collection has its own visible or hidden toggle
- b) No, every collection goes live when the shop is published
- c) Collections can be saved as drafts and published one at a time

**Answer:** b) No. Every collection goes live when the shop is published.

_Changed 2026-10-06: the first answer was a) a per-collection visible/hidden toggle. It was dropped, so there is no hidden state, badge or "Hide from storefront" action._

**Q10. Where are products added to a collection from?**
- a) Only from products already in My Shop
- b) Also straight from the catalogue, which adds the product to My Shop at the same time
- c) Both, plus a "Save to collection" action on the product page

**Answer:** a) Only from products already in My Shop

### Storefront (what shoppers see)

**Q11. How do collections appear on the storefront?**
- a) One section per collection, in place of "Favorite Picks"
- b) Tabs, one per collection, above the product grid
- c) A Pinterest-style board grid; opening a board shows its products
- d) "Favorite Picks" stays and the other collections appear below it

**Answer:** c) A Pinterest-style board grid; opening a board shows its products

**Q12. Does each collection get its own shareable link?**
- a) Yes, e.g. `/shop/view/<collection>`, which creators can share on social media
- b) No, collections are only seen on the creator's storefront page
- c) Later, after the MVP

**Answer:** a) Yes, e.g. `/shop/view/<collection>`, which creators can share on social media

### Migration, design and tracking

**Q13. What happens to creators' existing favourites when this ships?**
- a) They move automatically into a collection called "Favourites"
- b) They are cleared and creators start again
- c) They move, and the creator is asked to name the collection

**Answer:** a) They move automatically into a collection called "Favourites"

**Q14. Will Figma designs come for this?**
- a) Yes, full designs for create, edit, delete, the storefront and mobile
- b) Only the main screens; we follow the existing patterns for the rest
- c) No designs; we build it in the current style and the client reviews it

**Answer:** a) Yes, full designs for create, edit, delete, the storefront and mobile

**Q15. Should stats and the activity log track collections?**
- a) Activity log only, e.g. "Added to collection", "Collection renamed"
- b) Activity log and stats per collection (views, clicks, sales)
- c) Neither in the MVP

**Answer:** c) Neither in the MVP

### Post-MVP (photos and videos)

**Q16. Where would photos and videos live?**
- a) Inside collections, next to products
- b) In a separate content feed on the storefront
- c) Both

**Answer:** Undecided; left open until after the MVP

**Q17. What does "follow a creator" mean for shoppers?**
- a) Shoppers create accounts and follow creators inside URMEI
- b) Shoppers subscribe by email for a creator's new collections
- c) It links to the creator's social accounts; no shopper accounts

## Code touch points (current Favorites)

- `src/shop/limits.ts`: favorites cap (4)
- `ShopItem.favorite` in `src/shop/data/*`, which also reads the legacy `featured` key
- `ShopProductCard`: the favorite-rank footer and the overflow-menu action
- Storefront "Favorite Picks" section, in the in-app preview and on `/shop/view`
- `shop/activity-log.ts`: the `product-featured` / `product-unfeatured` activity ids

**Answer:** Undecided; left open until after the MVP
