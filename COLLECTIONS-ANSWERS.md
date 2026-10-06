# Shop collections: answers

Answered 2026-10-06. Requirement and full options: `REQUIREMENT-COLLECTIONS.md`. Tracked as `T-31` in `TRACKER.md`.

**Current scope: Figma designs only.** Desktop and mobile, in the Work File. The codebase does not change until the designs are approved.

## Summary

| # | Topic | Decision |
|---|---|---|
| 1 | Collections per creator | No limit |
| 2 | Products per collection | No limit |
| 3 | One product in several collections | Yes |
| 4 | New shop | Starts with one "Favourites" collection, renamable |
| 5 | Name / description | Name required (max 40 characters), description optional (max 100 characters) |
| 6 | Cover image | None; shown through its first few product images |
| 7 | Reordering | Creators set the order with arrows; the storefront follows it (changed 2026-10-06) |
| 8 | Deleting a collection | Products stay in My Shop |
| 9 | Hiding a collection | No hide feature: every collection shows once the shop is published (changed 2026-10-06) |
| 10 | Adding products | Only from products already in My Shop |
| 11 | Storefront | Pinterest-style board grid; opening a board shows its products |
| 12 | Shareable link | Each collection gets its own link, e.g. `/shop/view/<collection>` |
| 13 | Existing favourites | Not needed: Favorites was never released (changed 2026-10-06) |
| 14 | Figma | Full designs: create, edit, delete, storefront and mobile |
| 15 | Stats / activity log | Neither in the MVP |
| 16 | Photos and videos (post-MVP) | Undecided |
| 17 | "Follow a creator" (post-MVP) | Undecided |

## Questions and answers

### Collections basics

**Q1. How many collections can a creator have?**
No limit.

**Q2. How many products can one collection hold?**
No limit.

**Q3. Can the same product be in more than one collection?**
Yes, a product can be in any number of collections.

**Q4. What does a new shop start with?**
One default collection called "Favourites" that the creator can rename.

**Q5. Is the one-line description required, and how long can the name and description be?**
The name is required (max 40 characters). The description is optional (max 100 characters).

**Q6. Does a collection have a cover image?**
No. A collection is shown through its first few product images.

### Managing collections

**Q7. Can creators reorder collections and the products inside them?**
Yes, for collections. Creators set the order of their collections with the ‹ › arrows under each board. The storefront shows collections in that order. A new collection starts at #1 and can be moved; an empty one says "Not on storefront yet" until it has a product. Each move saves at once (toast "<collection> moved to #n"). Products inside a collection are not reordered in the MVP.

_Changed 2026-10-06: the first answer was "not in the MVP, newest first"._

**Q8. What happens to the products when a collection is deleted?**
They stay in My Shop. Only the grouping is removed.

**Q9. Can a creator hide one collection without unpublishing the whole shop?**
No. Every collection goes live when the shop is published. There is no hidden state, badge or "Hide from storefront" action.

_Changed 2026-10-06: the first answer was a per-collection visible/hidden toggle._

**Q10. Where are products added to a collection from?**
Only from products already in My Shop.

### Storefront (what shoppers see)

**Q11. How do collections appear on the storefront?**
As a Pinterest-style board grid. Opening a board shows its products.

**Q12. Does each collection get its own shareable link?**
Yes, e.g. `/shop/view/<collection>`, which creators can share on social media.

### Migration, design and tracking

**Q13. What happens to creators' existing favourites when this ships?**
Not needed. Favorites was never released to creators, so there are no existing favourites to move. Every shop simply starts with the default "Favourites" collection (Q4).

_Changed 2026-10-06: the first answer was "they move automatically into a collection called Favourites"._

**Q14. Will Figma designs come for this?**
Yes, full designs for create, edit, delete, the storefront and mobile.

**Q15. Should stats and the activity log track collections?**
Neither in the MVP.

### Post-MVP

**Q16. Where would photos and videos live?**
Undecided. Left open until after the MVP.

**Q17. What does "follow a creator" mean for shoppers?**
Undecided. Left open until after the MVP.
