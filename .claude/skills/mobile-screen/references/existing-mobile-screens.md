# Existing mobile screens — check here before building a new one

Catalog of mobile (375px) frames that already exist in `FdmVPJo1j4t8s9gej1H7Yb` ("[MVP] Influencer Portal | Work File"), page **Responsiveness** (`node-id=1802-19394`). **Read this before starting a new mobile screen or shop flow** — reuse/extend a frame listed here instead of rebuilding it from scratch. Link format: `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-%257C-Work-File?node-id=<id>`.

> Correction to `SKILL.md`: that file says new screens go inside a section at `node-id=1810-20063` ("Section 1") — **that node does not exist** (verified 2026-09-23, `get_metadata` returns not-found). The real top-level sections on the Responsiveness page holding shop mobile work are the two listed below. Use one of those, not `1810-20063`.

## BROWSE & ADD PRODUCT section — `node-id=2153-42552`

The current, most complete pass at this flow (higher node-ids = built later than the "Add Product" section below, and mostly supersedes it). All frames are 375px wide with full Status Bar / Header / Home Indicator chrome unless noted.

| Screen | node-id | Size | Notes |
|---|---|---|---|
| My Shop / Empty state | `2145-35899` | 375×1073 | |
| My Shop / Product added | `2145-40665` | 375×1460 | |
| Catalogue — Default (categories / brands / ingredients browse) | `2190-74648` | 375×2092 | |
| Catalogue — Search-autocomplete state | `2190-74761` | 375×2182 | Same screen as above with a query typed + dropdown result |
| Search Results — Default | **missing** | — | Only an unchromed content fragment exists (`2190-74928`, "Product detail content" — misnamed, it's actually the search-results list: breadcrumb, search bar, Filters/Sort row, product rows, pagination). No Status Bar/Header/Home Indicator wrapper. Build the full screen by wrapping this content in the standard chrome, following `SKILL.md`. |
| Search Results — No results | `2145-40151` | 375×812 | |
| Search Results — Success toast | `2145-36203` | 375×1170 | |
| Product Detail — Default | `2145-36673` | 375×1666 | |
| Product Detail — Added | `2145-36780` | 375×1666 | |
| Product Detail — Confirm popup | `2145-35002` | 375×812 | |
| Product Detail — Confirm popup / Dropdown open | `2145-35093` | 375×812 | |
| My Shop / Unpublished (Publish Shop — default, 1 pick, not yet published) | `2222-16744` | 375×1198 | Built 2026-09-23 — see below |
| **Component:** Product Card (search-results row) | `2180-71804` | 343×233 | Horizontal row: thumb + brand/title, price range + commission badge, "Available region" list, "Add To Shop" button. This is the canonical mobile product row — reuse it for any Search Results / list-style product screen instead of rebuilding a card. (Different from the 2-column grid tile used on My Shop — see below.) |

**Note on the Empty State frame (`2145-35899`):** as of 2026-09-23 it already carries a button row (Preview Storefront — disabled — and Publish Shop) plus a "Not published yet: Add products" caption, both set `visible: false` by default. These are the same nodes the Unpublished screen below turns on — if you clone this frame again, check for hidden nodes before rebuilding a button row from scratch.

## ⚠️ Add Product section (earlier pass) — `node-id=2061-43187` — DELETED

This section (and everything inside it, including the "My Shop / Default — Mobile" populated/published screen built earlier in this session, id `2133-16713`) **was deleted from the file** outside of any action taken here — confirmed gone via `get_metadata` on 2026-09-23. It is no longer available to clone or reference. The two frames once flagged here as "unique, not superseded" (`2081-72865` "Recommended product detail — mobile" and `1993-24344` "Home / Recommended Product Detail — Mobile") were lost with it and have no replacement in the BROWSE & ADD PRODUCT section — flag this if that content is needed again.

**Consequence — this is still a real gap:** the populated/published "My Shop" mobile state (with real stats row, "View Shop" button, Last Published date) does not currently exist anywhere in the file. Rebuild it if/when needed, following the same recipe as `2222-16744` below (clone the Empty State frame, swap in the populated content) rather than starting from a blank frame.

## My Shop / Unpublished — Mobile (Publish Shop flow, default state) — `node-id=2222-16744`

Built 2026-09-23, inside the BROWSE & ADD PRODUCT section. Matches the desktop "01 — publish-shop / my-shop / default" screen (`2061-42425`, 1 product added, not yet published). Built by **cloning the current Empty State — Mobile frame** (`2145-35899`) rather than from scratch:
- Turned on (`visible = true`) the hidden Preview Storefront (disabled)/Publish Shop button row and the "Not published yet" caption already present in that frame — see note above.
- Swapped the Publish Shop button's variant from `State=Disabled` to `State=Default` (component set has both; use `swapComponent`, don't restyle by hand).
- Updated tab labels to "All Picks (1)" / "Favorites (0)".
- Replaced the empty-state illustration box with a 2-column product grid: a real product card cloned from the desktop `1619-36927` "Featured product lisiting" frame **keeping its "★ Featured" badge this time** (it auto-features a creator's first pick — the populated-state card built earlier had dropped this badge, which was correct for that different, already-published state) + an Add Product dashed tile cloned from `1619-36953`.
- **Gotcha:** cloned instance-swap nodes (the featured badge, the caption text) can carry a hidden `visible: false` from their source even when they look present in a screenshot check — always check `.visible` explicitly on cloned nodes that don't render, rather than assuming a missing sub-tree.

## My Shop / Published — context menu open — `node-id=2235-36634`

Built 2026-09-24 as the mobile for desktop `2231-78762` ("02 — add-featured / my-shop / context-menu-open"). Loose on the page (not in a section), right of `2231-79376`, which is the same screen in the *unpublished* state. Built by cloning `2231-79376`, swapping its Shop Info Card for the published card from `2229-57939` (Success toast — Mobile), and adding the canonical **Application stats section** (see "Stats block" below) with the desktop's figures: 1 / 53% / 34 / S$845 / S$0. The ★ Featured badge is hidden (the product isn't featured yet) and its row is set to right-align so the ⋮ button stays in the top-right corner. **This is also the populated/published My Shop mobile state that was listed as a gap above** — clone it (and close the menu) instead of rebuilding.

## My Shop / Published — Featured tab, empty — `node-id=2238-36643`

Built 2026-09-24 as the mobile for desktop `2061-42375` (in the Add Featured Product section). Loose on the page, right of `2235-36634`. Built by cloning `2235-36634`:
- **Tabs:** Favorites is the selected tab. The two tab instances were swapped between their `Select=Yes` and `Select=No` variants, then the labels restored.
- **Toolbar:** the Add Product button is hidden and the text reads "Featured products (0/6)".
- **Product list:** replaced with the desktop's empty "Add area" (`2061-42399`): star well, "No featured products yet", "Go To All Picks". It's fixed at 400 tall, and the description wraps centred.
- **Border:** the dashed border (8/6 dash, radius 10) is copied from the desktop's parent slot frame `2061-42398`. The "Add area" clone alone has no border.
- **Stats:** 1 / 0% / 0 / S$845 / S$0.

## My Shop / Published — Favorites tab full (6/6) — `node-id=2242-36731`

Built 2026-09-24 as the mobile for desktop `2061-41657` ("05 — add-featured / my-shop / featured-tab-full"). Loose on the page, right of `2238-36643`, which it was cloned from. Choices the user confirmed:
- **Copy:** tabs read "All Picks (9)" / "Favorites (6)" and the heading reads "Favorite products (6/6)". The Favorites wording deliberately overrides the desktop's "Featured".
- **Stats:** the 5-tile block, set to 7 / 53% / 34 / S$845 / S$0.
- **Cards:** one per row, 32px gap. Each card keeps its "#n Featured" rank footer with the ← → buttons, and long names cut with "…" (`textTruncation: ENDING`, inherited from the desktop).
- **Card source:** the six cards are the desktop's "Featured product lisiting" component instances (main `400:16257`, a single component with no variants), stretched to FILL (343) with the image frame set to FILL and made square at 341×341.
- **Gotcha:** that component's ⋮ button is absolutely positioned and pinned left inside a non-auto-layout image frame. On an instance its `x`/constraints can't be overridden ("relative-transform" error), so the cards were **detached** and the ⋮ button moved to 10px from the right with a `MAX` constraint. Nested buttons and icons are still instances. Reuse these detached cards for any mobile card list that needs the rank footer.

- **Update 2026-09-24:** the Favorites list is now a **horizontal scroll** (user request). "Product list section" is HORIZONTAL, gap 12, 359 wide (it bleeds to the screen's right edge), with 16px right padding, clips content and has `overflowDirection: HORIZONTAL`. The cards are 260 wide with a 258px square image, so the next card peeks. The ‹ › rank buttons now match the layout direction. Rank labels read "#1 Favorite" through "#6 Favorite". The first card's ‹ and the last card's › are set to `State=Disabled`.

## My Shop / Published — context menu, slots full — `node-id=2260-36845`

Built 2026-09-24 as the mobile for desktop `2061-41839` ("07 — add-featured / my-shop / context-menu-slots-full"). It sits in the "Add Featured Product" section, cloned from `2235-36634` with the toast removed. All Picks (7) / Favorites (6), stats 7 / 53% / 34 / S$845 / S$0, and no Add Product slot, matching the desktop. It has seven one-per-row cards: the first six have the ★ Featured badge (with the badge row set to SPACE_BETWEEN) and the image fills copied from the desktop cards. The 7th card (Missha) carries the open ⋮ menu.

## Stats block — how stats are done on mobile

The source of truth is the main design file's mobile stats (`cehltPtMoGWEtKbF7k3MQQ`, node `794-26005`). Its exact copy in the Work File is **`2126-18146`** ("Application stats section" on "06 — Shop completed — mobile"). **Clone that node** whenever a mobile screen needs shop stats, and change only the five `Total Products Value` texts.

- 343×407 card: `surface/secondary/100` fill, `border/color/muted` border, radius 10, 16px padding and gap, soft drop shadow.
- Header row: right-aligned "Showing: All time ⌄" dropdown button. There is **no "Performance" title**.
- A 2×2 grid of grey tiles (`surface/secondary/300`, radius 8, 12px padding, gap 14 horizontal and 16 vertical): TOTAL PRODUCTS, TOTAL CLICKS, TOTAL SALES, COMMISSION EARNED. Below it, one full-width COMMISSION SETTLED tile.
- Tile contents: an uppercase body-xs-medium label in `#757575` wrapping to two lines, a chevron-right on every tile, and the value in body-xxl-bold (24/36) `#222`.
- Only **five metrics**. There is no Commission Pending, and desktop's "Commission Owned" maps to **Commission Earned**.
- **Don't use** the older "Stats Card" with the "Performance" title, flat white 2-column list and six metrics (e.g. `2229-58131` in `2229-57939`). It's outdated. The smaller 246/280/292px "Application stats section" nodes on other screens are different content (catalogue/product stats), not this block.

## Other shop-adjacent mobile frames (not part of either section above)

| Screen | node-id | Size |
|---|---|---|
| Manage Account / Profile | `2004-22278` | — |
| Manage Account / Social Accounts | `2024-22599` | — |

(Manage Account, not shop — listed for completeness since they live on the same Responsiveness page.)
