# Shop personalization (MVP): answers

Answered 2026-10-16. The requirement, the meeting notes and the full options are in the MVP section of `change-requests/shop-personalization/REQUIREMENT.md`. Tracked as `T-38` in `TRACKER.md`. The post-MVP vision work stays under `T-33`.

**Current scope: Figma designs only.** The codebase does not change until the designs are approved.

## In and out of the MVP

- **In:**
  - preset banner backdrops
  - up to 2 featured collections or products in the banner
  - the storefront preview, where the banner is edited
  - storefront tabs: Posts and Picks
  - the old reviews layout
  - a nudge to add collections
  - a "View product/collection" link in follower notifications
  - My Shop without its stats row
- **Out:**
  - custom banner uploads and the admin approval they'd need
  - creator posts (photos, videos, notes)
  - merging content and reviews with filters

## Summary

| # | Topic | Decision |
|---|---|---|
| 1 | Where the banner is edited | An "Edit banner" panel inside the storefront preview |
| 2 | Featured items | Up to 2 of either kind: 2 collections, 2 products, or 1 of each |
| 3 | Seasonal backdrops | URMEI presets that the creator picks; nothing switches on automatically |
| 4 | Nothing featured | Shoppers see only the profile card; the creator's preview shows a prompt to feature something |
| 5 | Featured product line | Required, up to 80 characters |
| 6 | Storefront tabs | **Picks** (opens first) and **Posts** (only reviews for now, in the old layout) |
| 7 | "Add collections" nudge | A dismissible banner on My Shop, shown until the first collection |
| 8 | New collection/product notification | Sent to the creator's followers; the link opens the item on the public storefront |
| 9 | Hidden stats | Only My Shop's stats row; Home keeps it |

## Questions and answers

1. **Where does the creator choose the backdrop and the featured items?** In an edit panel inside the storefront preview.
2. **Can the banner mix one collection and one product?** Yes. Any 2 items.
3. **How do seasonal backdrops reach a shop?** The creator picks one from URMEI's presets. None switch on automatically.
4. **What does the banner show when nothing is featured?** Only the profile card. The creator's preview shows a "Feature a collection or product" prompt.
5. **Is the featured product's line required?** Yes, up to 80 characters.
6. **Which tabs does the storefront have?** Picks, which opens first, and Posts. For the MVP, Posts holds only the creator's reviews, in the old layout; creator posts join it later.
7. **Where does the "add collections" nudge show?** On My Shop, until the creator makes their first collection or dismisses it.
8. **Who is notified about a creator's new collection or product?** The creator's followers. "View product/collection" opens the item on the public storefront.
9. **Which stats are hidden?** Only My Shop's stats row.

## Still open

- **Exact tab labels:** "Posts" and "Picks", or "All Picks"?
- **Launch presets:** which backdrops are there at launch, and which seasonal ones?
- **Follow feature:** Q8 needs creators to have followers. In Collections (`change-requests/collections/ANSWERS.md` #17), "Follow a creator" is still post-MVP and undecided, yet the storefront design shows a Follow button and a follower count. Confirm that following is in the MVP.
- **Where followers see notifications:** this portal has no shopper-side notifications.
- **Client comment for Q6:** record it verbatim.
