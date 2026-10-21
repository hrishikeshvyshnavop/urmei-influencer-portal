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
| 1 | Where the banner is edited | In an edit mode on the banner itself, inside the storefront preview (changed 2026-10-19; was an "Edit banner" panel) |
| 2 | Featured items | Up to 2 of either kind: 2 collections, 2 products, or 1 of each |
| 3 | Seasonal backdrops | URMEI presets that the creator picks; nothing switches on automatically |
| 4 | Nothing featured | Shoppers see only the profile card; the creator's preview shows a prompt to feature something |
| 5 | Featured product line | **Not in the MVP** (changed 2026-10-19; was "required, up to 80 characters") |
| 6 | Storefront tabs | **Picks** (opens first) and **Posts** (only reviews for now, in the old layout). **Creator Portal only for now** (user, 2026-10-20); the e-commerce storefront has no tabs yet |
| 7 | "Add collections" nudge | A dismissible banner on My Shop, shown until the first collection |
| 8 | New collection/product notification | Sent to the creator's followers; the link opens the item on the public storefront |
| 9 | Hidden stats | Only My Shop's stats row; Home keeps it |

## Questions and answers

1. **Where does the creator choose the backdrop and the featured items?** In an edit panel inside the storefront preview.
2. **Can the banner mix one collection and one product?** Yes. Any 2 items.
3. **How do seasonal backdrops reach a shop?** The creator picks one from URMEI's presets. None switch on automatically.
4. **What does the banner show when nothing is featured?** Only the profile card. The creator's preview shows a "Feature a collection or product" prompt.
5. **Is the featured product's line required?** Not in the MVP: a featured product shows its image, brand and name, with no creator line (changed 2026-10-19 by the user; the original answer, 2026-10-16, was "yes, up to 80 characters").
6. **Which tabs does the storefront have?** Picks, which opens first, and Posts. For the MVP, Posts holds only the creator's reviews, in the old layout; creator posts join it later. **Update (user, 2026-10-20):** the tabs are in the Creator Portal only. The e-commerce storefront shows Collections, then All Picks, with no tabs for now, and may get them later.
7. **Where does the "add collections" nudge show?** On My Shop, until the creator makes their first collection or dismisses it.
8. **Who is notified about a creator's new collection or product?** The creator's followers. "View product/collection" opens the item on the public storefront.
9. **Which stats are hidden?** Only My Shop's stats row.

## Decided in the design review (2026-10-19)

- **Storefront order:** banner (backdrop + up to 2 featured items) → Collections → All Picks. Favorite Picks is no longer on the storefront.
- **Profile card:** one colour everywhere (`surface/secondary/300`, #F8F8F8), and the order is name → @handle → stats → bio → Follow / Copy Shop Link.
- **A featured item that becomes unavailable:** hidden from shoppers, and marked "Unavailable" for the creator, who can remove it (Undo available).
- **Empty shop:** the Featured box still shows; its picker says "Nothing to feature yet" with Browse Catalogue.

## Decided after the review (2026-10-20)

- **Banner layout with 2 featured products:** the products lead. Two tall product cards (image on top) sit on the left, and the profile sits in a narrow column on the right (Work File `3408:54579`, Option 4 of 6). **Superseded (user, Figma comment, 2026-10-20):** the banner stays as designed: the white profile card, with the featured items as Compact cards below the divider, on My Shop and on the storefront. Option 4 is not used. The one-item layout is a half-width card (see below).

- **New My Shop page (user, 2026-10-20; Work File `3436:216586`):** the backdrop runs behind the nav. One white card holds the avatar, name, @handle, stats and bio on the left, with Preview Storefront, View Shop and "Last Published on …" on the right. Below a divider sit the two featured items as Compact cards. There's no page title. The banner has one creator button, **Personalize Shop** (top right, on the backdrop).
- **One entry point (user, 2026-10-20):** Personalize Shop opens a single **Customize banner** dialog. Its two underline tabs are **Backdrop** and **Featured items**, beside a live preview, with Cancel / Save Changes. This replaces the separate Choose a backdrop and Add featured items dialogs and the Edit link on the featured area. Flows 01 and 02 become the two tabs of this dialog.
- **Nothing featured (user, 2026-10-20):** below the divider, the creator sees a dashed prompt, "Feature up to 2 products or collections", with Add Featured Items. It opens the Customize dialog on the Featured items tab. Shoppers see the card without the featured row.

- **Customize banner dialog, final (user, 2026-10-20):** Work File `3440:58349`. Underline tabs for the sections (Backdrop, Featured items) and pills for the Featured items filter (Collections, Products).

- **Creator banner shows the Shop URL, not socials and bio (user, Figma comment, 2026-10-20):** on My Shop the identity is name + @handle + the Shop URL field with copy. The storefront (shopper view) shows the socials and bio.

- **Save is a draft; Publish makes it live (user, Figma comment, 2026-10-20):** Save Changes stores the banner as a draft. The banner's primary button becomes **Publish Changes**, and shoppers see the change after the creator publishes. "Last Published" updates only then. This is the same pattern as My Shop (main file `236:23059`). It covers every banner change, including removing or replacing a featured item. Every toast ends "… Publish changes to go live". **Save Changes is always enabled** (user, 2026-10-20): with no changes, Save just closes the dialog, with no toast.
- **Dialog layout (user, Figma comment, 2026-10-20):** the preview sits on top and the picker below (option C, `3472:12178`), at one size in every flow (1120×860).
- **One featured item (user, Figma comment, 2026-10-20):** a half-width card. This settles the one-item layout.
- **Two dialogs, not tabs (user, 2026-10-20):** Backdrop and Featured items are separate dialogs again, each with the preview on top and no section tabs. This replaces "One entry point" and the tabbed Customize banner dialog above.
  - The banner button is now **Change Backdrop** (renamed from Personalize Shop) and opens the **Change backdrop** dialog only.
  - Add Featured Items, Add Another and Edit on a featured card open the **Featured items** dialog.
  - Every dialog is centred in the window (user, 2026-10-20).
- **Featured items picker layout (user, 2026-10-20):** the search sits on its own row under the Collections / Products pills, left-aligned. The heading reads "Select up to 2 to feature · n of 2 selected" on one line, with the count and dot in `typography/color/secondary/700`.
- **Creator vs shopper buttons on featured cards (user, Figma comment, 2026-10-20):** creators see **Edit**, which opens the Featured items tab. Shoppers see Shop Now / View Collection.
- **Unavailable featured item (user, Figma comment, 2026-10-20):** the card offers **Replace** and **Remove**. Replace opens the picker with that slot free.
- **Collections count:** 3 collections everywhere in the designs (My Shop, picker, storefront).

## Still open

- **Exact tab labels:** "Posts" and "Picks", or "All Picks"?
- **Launch presets:** which backdrops are there at launch, and which seasonal ones? The picker now holds 10+ (12 shown, 7 of them placeholders), grouped as Classic and Seasonal.
- **Follow feature:** Q8 needs creators to have followers. In Collections (`change-requests/collections/ANSWERS.md` #17), "Follow a creator" is still post-MVP and undecided, yet the storefront design shows a Follow button and a follower count. Confirm that following is in the MVP.
- **Where followers see notifications:** this portal has no shopper-side notifications.
- **Client comment for Q6:** record it verbatim.
- **Only the creator's own items (user, 2026-10-21):** the Featured items dialog says so under its title: "You can only feature products and collections from your shop."
- **Dialog height (user, 2026-10-21):** the Featured items dialog uses the window height minus 40px top and bottom (max-height `calc(100vh - 80px)`), so more items show in the first scroll. Only the grid scrolls. Change backdrop fits its full preset grid.

