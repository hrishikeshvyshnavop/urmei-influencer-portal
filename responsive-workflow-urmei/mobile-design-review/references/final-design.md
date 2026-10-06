# Final design: the source of truth for mobile

The user's **final design** is the reference every mobile flow is synced to. When it disagrees with `main-file-mobile-flows.md` or with older frames on the canvas, the final design wins.

- **The final design:** the two `-` sub-sections `2384:76022` and `2384:77979`, inside `[Influencer] Shop Experience` (`2446:56196`) on the flows page `2462:56445`. They were the section `2384:76021` "BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26 (Final design)" until it was dissolved (seen 2026-09-28).
  https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=2384-77979
- **It is locked** (see `../../_shared/workfile.md` → "Locked"). Read and clone from it, never edit it.
- If the user names a newer final section, add it here. Keep the old one listed as superseded.

## Source-of-truth order (user's rule, 2026-09-25)

**The desktop says *what* a screen must contain. The final design says *how* it looks and behaves.** The desktop is drawn for a mouse on a 1440 canvas, with hover, a sidebar, two-column forms and centred modals. Copying it to a 375 touch screen imports decisions that were never made for a phone. The final design is where those mobile decisions were actually made.

When sources disagree, the higher one wins:
1. **The final design** (this file): its frames, then its patterns (below).
2. **Approved Decisions** in `readiness-log.md`.
3. **House values** in `spacing-rules.md` and `production-checklist.md`.
4. **The main file's mobile board** (`mobile-screen/references/main-file-mobile-flows.md`).
5. **The desktop twin**, for **coverage only**: which screens, states, content and actions exist. Never for layout, spacing, components, control choice, dialog pattern or copy.

In practice:
- **Never edit a desktop frame.** Desktop frames are read-only references.
- **Never apply a change whose only justification is "the desktop does it".** Report it as a **parity note** for the user to decide. It is not a fix row. Example: 02.1's locked name and email fields (dropped, 2026-09-25).
- **When a flow has no final-design screen**, build from the final design's **patterns** (below), not from the desktop's layout.
- **When the desktop and the app (code) disagree on behaviour,** that's a product question. Ask it, and fix neither.
- **A defect is a defect whatever any twin says**, e.g. a calendar icon on a non-date field, grammar, or copy that contradicts the product (5 MB vs `PHOTO_MAX_MB` 2). Fix it on mobile. Say that the desktop and the code still carry it, but don't touch them unless asked.

## Final-design patterns and gap fills (auto-applied, 2026-09-25)

These apply wherever a mobile screen needs the pattern, including flows the final design doesn't cover.

- **The final design itself is read-only** (user's rule, 2026-09-25, restated 2026-09-28). Never edit, move or restyle anything inside `2384:76022` or `2384:77979`. Clone from it; don't change it.
- **Gap fills stay** (user's rule, 2026-09-25). Where the final design doesn't show something, the approved gap fill below is the rule. It is applied like a final-design value. It is labelled **Gap fill** so its origin stays visible. If a later final design covers the same job, the final design replaces the gap fill.

| Job | Pattern | Source |
|---|---|---|
| Confirm dialog: shape | **Centred dialog**, 335 wide (20 margins), header p16/16/16/20 with the title (`Body/body-xl-bold`) and a close ✕ | Final design `2384:78404` |
| Confirm dialog: body and actions | Radius 12. Body text `Body/body-sm-regular` secondary. A Cancel + primary pair (the final dialog has one full-width button); a destructive action uses `Button=Destructive button`. Scrim over the page underlay, HI on top | **Gap fill**: the app's `ConfirmDialog` and house values |
| Button bar above the HI | Fixed at the bottom, padding 10 top / 8 bottom, sitting directly above the HI | Final design, Filter `2384:76990` / `2384:77081` |
| Long form in a sheet | **812 frame**. The sheet is fixed height from y=60, the body scrolls (`clipsContent`, `overflowDirection: VERTICAL`), and the button bar is p10/24/42/24 with a top border `border/color/default` and fill `surface/secondary/100`, holding Cancel + primary **8 above the HI**. The frame never grows past 812 | **Gap fill**: the final Filter is a full page, not a sheet, and its bar has 16 sides |
| Short sheet | Hugs its content and is anchored to the bottom. The last row ends **8 above the HI** (bottom padding 8 + 34) | **Gap fill**: extended from the Filter bar |
| Close ✕ | `Button=Outlined icon, Size=md` **instance**, never a drawn frame | Final design `2384:78407` |
| Secondary text on a tinted row (`#f8f8f8`) | `typography/color/secondary/800` (#6c6c6c, 4.9:1). `/700` (#757575) fails there at 4.34:1 | **Gap fill**: a WCAG AA fix, using a final-design token |
| Full-screen panel (drawer made mobile) | Status Bar fill `surface/secondary/100`, the same surface as the panel. No leftover desktop edge border | **Gap fill**: the Profile Settings & Notification build notes |

## Known gaps in the reference frames

- The reference frames have **no Home Indicator**. Ours keep it (house frame contract), and the sync ignores the difference.
- `2384:80509` (favorites) and `2384:79768` (PDP) still carry the **old 80/70 chrome**, so the chrome spec below overrides them.
- `2384:79768` is a PDP **modal over My Shop**, while our PDPs are full pages, so the sync compares chrome only for `pdp`.
- There's no reference for the **stats pages** (section 10) or the storefront preview. Their differences go to the user.

## Reference frames by archetype

`sync-script.js` sorts each mobile screen into one of these archetypes and diffs it against the reference. **Keep the `REFS` map in the script in step with this table.**

| Archetype | How it's recognised | Reference frame |
|---|---|---|
| `myshop-populated` | "MY SHOP" + "Your Picks" | `2384:80204` 10 — My shop / Product added — Mobile (a long version is `2384:80313`) |
| `myshop-empty` | "Your shop is empty" | `2384:80765` 01 — My shop / Empty state — Mobile |
| `myshop-favorites` | "MY SHOP", no "Your Picks" | `2384:80509` 05 — Favorites tab full — Mobile |
| `pdp` | "Product details" accordion | `2384:79768` 05 — Product detail / Default — Mobile |
| `catalogue` | "…categories" + "Brands" | `2384:76660` 02 — Catalogue / Default — Mobile |
| `overlay` | ≤812 tall with a popup, sheet or menu | `2384:78345` 06 — Product detail / Confirm popup — Mobile. Chrome only, no footer |
| `page` | anything else with the standard chrome (stats, storefront…) | chrome slots only, against `2384:80204` |
| `unstructured` | no `Header` layer | compared by screenshot only |

## Chrome reference: Status Bar + Header + Search (user's rule, 2026-09-25)

Reference `2384:87491` (inside `2384:80765`), 375×173. **Match it on every mobile screen that has the app header.** This rule is auto-applied.

| Layer | Spec |
|---|---|
| `Status Bar / iPhone 13 Mini` | Instance `Mode=Light` (`2:2042`), fill `#f8f8f8`, 47 tall |
| `Header` | Instance `Header / Device=Mobile, Type=MVP Portal, Page=Default` (`2105:74735`). 72 tall, padding **16/16/8/16** (L/R bound to `spacing/md`), fill bound to `VariableID:…/278:58` (#f8f8f8), bottom radius 10 bound to `VariableID:…/167:3` |
| `Search wrap` | Frame, 54 tall, padding **0/16/16/16** (bound to `spacing/md`), fill #f8f8f8 (bound to the same variable as the header), bottom radius 10 (bound to `…/167:3`), holding `Search/Default` 343×38 |

The public storefront preview (`09.2`, `2368:62381`) uses the shopper storefront header, so it's exempt.

**How it was applied:** set the header's `paddingBottom` to 8. On the search wrap, set `paddingTop` to 0 and bind the fill, radius and side/bottom padding. Then shift the absolute cursors below the chrome by the height change (−24, or −8 where the wrap was already 54). Dialog frames need no shift, because their underlay page is clipped inside a fixed 812 frame.

## My Shop spacing (auto-applied, 2026-09-25)

- `Content`: padding **24/16/48/16**, gap 32.
- Page header ("MY SHOP") → Shop Info Card: **16**. In our frames this is `Shop content wrapper.itemSpacing`. The reference nests the two in their own gap-16 frame, which is why the slot diff can't see it, so check it directly.

## Other reference values (from `2384:80204`)

These are compared by the sync. They are **not** auto-applied until the user approves them.

| Slot | Reference |
|---|---|
| `Shop Info Card` | p16, gap 20 |
| `Tabs and content section` | gap 32. `Tab Bar` gap 24. `Content Toolbar` gap 16 |
| `Footer/Mobile/Default` | p32/16/32/16, gap 32 (clone `2384:80274`) |

## My Shop tab bar (auto-applied, 2026-09-25)

The `Tab Bar` on a My Shop page (All Picks / Favorites) matches `2384:80233`. Labels are **`Body/body-md-medium`** on the selected tab and **`Body/body-md-regular`** on the others. The bar has a 24 gap and no padding, a `#e5e5e5` bottom border, and is 42 tall. Tab bars on the catalogue, brand, product detail and sample-request frames stay `Body/body-sm`, as they are in the reference.

## Product card (auto-applied, 2026-09-25)

Every My Shop product card matches `2384:80247` on All Picks (343 wide) and the `2384:80509` cards in the Favorites carousel (260 wide):
- The image's overflow button is `Button=Outlined icon, Size=sm` (24px, radius 6).
- The Favorite badge has padding 4/8, radius 999 and fill `#464646`, with a `Body/body-xs-medium` label.
- The product name is `body-md-medium`, truncated at the end.
- Replace a card with a different structure by a clone of the reference card, and copy its text across.

## House patterns set by the user on 2026-09-28 (auto-applied)

These were applied page-wide on 2026-09-28, except the banner position: 03.5 still has the banner above the Search wrap (03.4 was rebuilt with it below). Apply them to any new or changed screen. The component and token ids are in `../../_shared/workfile.md`.

| Job | Pattern |
|---|---|
| Account-setup banner | An instance of the **Notification Banner** component. On mobile it sits **below the Search wrap** (the Status Bar, Header and Search wrap stay one chrome block) and scrolls with the content. `Show Action` is on for My Shop screens and off on Manage Account screens. |
| Manage Account tabs | An instance of the **Settings Tabs** component. 44 tall, 8px side padding (the first tab is flush with the gutter), a scrolling row, and the ⚠ **before** "Bank Details". The underline is on the tab items (1px `border/color/default`, 2px `border/color/dark` when active), never on the row. |
| Corner radius | Every radius is bound to a `border/radius/*` token. Off-scale values snap to the nearest one; pills use `infinite`. |
| Modals | Title styles bound. Panel `surface/secondary/100`. Form modals get the 40/12 shadow. Mobile centred dialogs get a 1px `border/color/default` border and a header divider, with padding like the library `popup`: header 16/24, body 16/24/24. |
| Toasts | Follow 04.7 (`2348:55780`). The inner toast FILLs the width (343) and hugs its height, bottom-anchored in the `Tost` wrapper. |
| Options List (card ⋮ menu) | The right edge is flush with the ⋮ button, 4px below it. |
| Shop Info Card | Buttons stacked vertically, both full width, 8px gap. The labels, URL field and status line follow the state table in `workfile.md`. |
| PDP (in-shop, desktop + mobile) | `Stack / What Creators Say` > [inner `Stack / What Creators Say` (Editorial frame + `Pdp-write-a-review-cta`), `Performance Section` (`Performance header` + `Performance Stats Content` > `Stats Card`)]. Mobile outer padding 8/16/48/16, gap 32. The modal PDP stays as it is. The public PDP (09.1) has no Performance. |
| PDP action buttons (`Action buttons row` › `Type wrapper`) | Stacked vertically, both full width (343), 12 gap (`spacing/md-sm`): Remove from Favorites / Add to Favorites (Outlined, lg), then Remove from shop (Destructive, lg). Set by the user on 05.3 (`2343:38969`) and applied to every in-shop mobile PDP on 2026-09-28. **Desktop** keeps the buttons side by side, with the gap bound to the same 12 (`spacing/md-sm`, 9 PDPs). |
| Creator reviews (mobile) | **Final design: 09.2 `Reviews section` `2368:62493`** (user, 2026-09-28). On every mobile PDP, `Stack / What Creators Say` holds a `Reviews carousel` (gap 24): the title "WHAT CREATORS SAY" (the storefront says "<Name>'S REVIEWS" plus its description), the ‹ n / N › controls (40px round, `border/color/default`), then a scrolling row of 300px review cards (gap 12, overflow visible so the next card peeks). A card is a product header (brand + name + ›, `#f8f8f8`) over a white review block (verified avatar, 3-line quote, Read more, up to 3 photos, only when the review has them). The product header shows the page's own product. Applied to 05.3, 05.4, 07.3, 07.4, 10.1–10.4, 11.3 and 09.1, replacing the old editorial quote block. |
| Review CTA (`Pdp-write-a-review-cta`) | 16 padding (`spacing/md`). A 24×24 icon well with 4 padding and a 16 icon. Icon → text 12, title → description 4, and on mobile text → button 16. Height hugs. |
| Performance Section | The app's 4 metrics (Total unit sold, Link clicks, Conversion rate, Commission settled) plus "View other stats". Desktop is one row; mobile is a 2×2 grid with a full-width button. |
| Shop stats card | The 5 metrics + "Showing" filter (clone `2348:55137`). |
| Favorites | Capped at **4** everywhere: headings `(n/4)`, the tab count, cards, ★ badges and storefront Favorite Picks. |
