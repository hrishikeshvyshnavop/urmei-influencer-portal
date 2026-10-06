# Shop collections: Figma flows

Every Collections flow in the Work File, with its status. Tracked as `T-31`. The requirement and decisions are in `REQUIREMENT-COLLECTIONS.md` and `COLLECTIONS-ANSWERS.md`.

Last updated: 2026-10-06.

**Links:** `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=<id>`. Write the id with `-` instead of `:`, e.g. `2777-67314`.

**Workflow:** build one flow at a time, each in its own new section, then wait for approval before starting the next. Reviewed sections are locked: later changes go in an add-on section. Icons are always library icon instances, never typed characters (rules in `responsive-workflow-urmei/_shared/workfile.md`).

## Status key

| Status | Meaning |
|---|---|
| 🔒 In review | In `[Collections] Review Round 1`. Locked: don't edit. |
| ✅ Approved | Approved by you; not in client review yet. |
| 🟡 Awaiting approval | Built and waiting for your go-ahead. |
| 🧪 WIP | Draft on Hrishi Workspace. Not in review yet. |
| 💡 Add-on | Outside the agreed decisions. Needs client sign-off. |
| ⬜ Planned | Not built yet. |

## Sections

| Section | Page | Id | Status |
|---|---|---|---|
| [Collections] Review Round 1 \| 06.10.26 | Flows `2650:50683` | `2764:66587` | 🔒 |
| › Review notes panel | | `2764:66588` | 🔒 |
| › 11 - Collections in My Shop | | `2764:66613` | 🔒 |
| › 04 - Creator Collections on the Storefront | | `2757:65060` | 🔒 |
| [Collections] Add-on — Reorder Collections \| 06.10.26 | Flows | `2771:66587` | 💡 |
| [Collections] Flow — Collection Detail \| 06.10.26 | Flows | `2777:67314` | ✅ |
| [Collections] Flow — Empty Collection Page \| 06.10.26 | Flows | `2780:67176` | 🟡 |
| Collections — Mobile (WIP) \| 06.10.26 | Hrishi Workspace `751:80091` | `2767:51554` | 🧪 |

## Flows

### Flow A: Manage collections (My Shop) 🔒

Section `2764:66613`, row 1. Cover `2750:146638`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.1 | Collections tab: board grid and New Collection | `2750:146644` | `2747:62796` |
| 11.2 | Create collection dialog | `2750:146556` | `2748:231758` |
| 11.3 | Board ⋮ menu: Edit details, Copy collection link, Delete collection | `2750:146310` | `2748:232054` |
| 11.4 | Edit collection dialog | `2750:146394` | `2748:232323` |
| 11.5 | Delete collection confirmation | `2750:146476` | `2748:232618` |

### Flow B: Add a product to collections 🔒 (mobile 🧪)

Section `2764:66613`, row 2. Cover `2753:64405`.

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 11.6 | All Picks › product menu › Add to collection | `2753:64411` | `2767:52214` |
| 11.7 | Add to collection dialog (multi-select) | `2753:64849` | `2768:52438` |
| 11.7a | Many collections: search box and scrolling list | `2755:64723` | `2768:52809` |
| 11.7b | No collections: empty box, Save disabled | `2755:65115` | `2768:53270` |
| 11.8 | Toast: "Added to My morning routine" | `2753:65379` | `2767:52482` |

### Flow C: Empty collections 🔒 (mobile 🧪)

Section `2764:66613`, row 3. Cover `2758:65461`.

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 11.1a | No collections yet | `2758:65509` | `2767:51671` |
| 11.1b | A collection with no products | `2758:65790` | `2767:51943` |
| — | Empty board: options A–E (decision needed) | `2760:65839` | — |

### Flow D: Creator product page 🔒 (mobile 🧪)

Section `2764:66613`, row 4.

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 11.9 | Product page: Add To Collection button, "In 2 collections" chips | `2763:65814` | `2767:52753` |

### Flow E: Collections on the storefront (shopper) 🔒 (mobile 🧪)

Section `2757:65060`. Cover `2757:65061`.

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 04.1 | Storefront: [Creator]'s Collections row | `2757:65132` | `2770:52701` |
| 04.2 | Collection page at its own link | `2757:65695` | `2770:53181` |
| 04.3 | Product page opened from a collection | `2763:66163` | `2770:53816` |

### Flow F: Reorder collections 💡

Section `2771:66587`. Conflicts with Q7 ("no reordering in the MVP"). Keep it out of the review until the client agrees.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.10 | Position strip "#n on storefront" with ‹ › arrows (the existing Reorder Favorite pattern) | `2771:66588` | ⬜ |

### Flow 1: Collection detail ✅ (approved 2026-10-06)

Section `2777:67314`. Cover `2777:67315`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.11 | Collection detail: back button, Copy Link, Edit Details, ⋮ for delete, the collection's products | `2777:67321` | ⬜ |
| 11.12 | Product menu: Remove from collection | `2777:67713` | ⬜ |
| 11.13 | Toast "Removed from Favourites. Still in your shop." Cursor on All collections. | `2777:68123` | ⬜ |
| 11.14 | Back to All Collections: the grid, Favourites now 3 products | `2779:67017` | ⬜ |

### Flow 2: Empty collection page 🟡

Section `2780:67176`. Cover `2780:67177`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.15 | Collections grid (4): the creator opens the empty "Night-time reset" board | `2780:67183` | ⬜ |
| 11.16 | Empty collection page: "0 products", Copy Link disabled (hidden from shoppers), empty box, Go to All Picks | `2780:67260` | ⬜ |
| 11.17 | All Picks tab after Go to All Picks, cursor on a product's ⋮ (continues into Flow B) | `2780:67668` | ⬜ |

## Planned (one at a time, after approval)

| Flow | Screens | Status |
|---|---|---|
| 3 | Copy collection link confirmation | ⬜ |
| 4 | Storefront with no collections (the collections row is hidden) | ⬜ |
| — | Mobile for Flow 1 and Flow F | ⬜ |
| — | Move the mobile WIP frames into review once approved | ⬜ |

## Open decisions

These are also on the review notes panel `2764:66588`:

1. Empty board design: option A–E.
2. Collections with no products are hidden from shoppers.
3. "New Collection" in Add to collection opens the Create dialog.
4. The shopper top bar names the collection only when the shopper arrives from it.
5. The product page row shows only the collections that contain the product.
6. Breadcrumbs on product pages stay category-based.
7. Reordering (Flow F): does the client want it in the MVP?
