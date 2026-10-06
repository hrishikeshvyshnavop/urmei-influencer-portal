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
| [Collections] Flow — Reorder Collections \| 06.10.26 | Flows | `2771:66587` | 🟡 |
| [Collections] Flow — Collection Detail \| 06.10.26 | Flows | `2777:67314` | ✅ |
| [Collections] Flow — Empty Collection Page \| 06.10.26 | Flows | `2780:67176` | ✅ |
| [Collections] Flow — Copy Collection Link \| 06.10.26 | Flows | `2781:67699` | ✅ |
| [Collections] Flow — Storefront Without Collections \| 06.10.26 | Flows | `2782:68420` | 🟡 |
| [Collections] Flow — Unpublished Shop \| 06.10.26 | Flows | `2786:68996` | 🟡 |
| [Collections] Flow — Favorites Are Now Collections \| 06.10.26 | Flows | `2787:69374` | 🟡 |
| [Collections] Flow — Collection Name Errors \| 06.10.26 | Flows | `2788:69743` | 🟡 |
| [Collections] Flow — Storefront Preview \| 06.10.26 | Flows | `2788:239935` | 🟡 |
| [Collections] Flow — Edit and Delete from Collection Page \| 06.10.26 | Flows | `2789:70752` | 🟡 |
| Collections — Mobile (WIP) \| 06.10.26 | Hrishi Workspace `751:80091` | `2767:51554` | 🧪 |

## Layout on the flows page

The Collections sections sit in **one vertical column** at the right of the flows page (`2650:50683`). Left edges are aligned at x = 67298, with 400px between sections, read top to bottom. Review Round 1 stayed where it was. Only the other sections were moved, and nothing inside any section changed (2026-10-06).

| # | Section | Id | Flow |
|---|---|---|---|
| 1 | [Collections] Review Round 1 | `2764:66587` | A–E (locked) |
| 2 | Flow — Reorder Collections | `2771:66587` | F |
| 3 | Flow — Collection Detail | `2777:67314` | 1 |
| 4 | Flow — Empty Collection Page | `2780:67176` | 2 |
| 5 | Flow — Copy Collection Link | `2781:67699` | 3 |
| 6 | Flow — Storefront Without Collections | `2782:68420` | 4 |
| 7 | Flow — Unpublished Shop | `2786:68996` | 5 |
| 8 | Flow — Favorites Are Now Collections | `2787:69374` | 6 |
| 9 | Flow — Collection Name Errors | `2788:69743` | 7 |
| 10 | Flow — Storefront Preview | `2788:239935` | 8 |
| 11 | Flow — Edit and Delete from Collection Page | `2789:70752` | 9 |

New Collections sections go at the bottom of this column, 400px below the last one. Mobile drafts stay on Hrishi Workspace (`2767:51554`).

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

### Flow F: Reorder collections 🟡 (in scope since 2026-10-06)

Section `2771:66587`, renamed from "Add-on". Cover `2783:69343`. Q7 is now updated: creators set the order and the storefront follows it. Every Collections grid in Flows 1–3 now shows the position strip. Review Round 1 is locked and does not have it yet.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.10 | Position strip "#n on storefront" with ‹ › arrows (the existing Reorder Favorite pattern); cursor on a › | `2771:66588` | ⬜ |
| 11.10a | After the move: My morning routine now #3, toast "My morning routine moved to #3" | `2783:69022` | ⬜ |

### Flow 1: Collection detail ✅ (approved 2026-10-06)

Section `2777:67314`. Cover `2777:67315`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.11 | Collection detail: back button, Copy Link, Edit Details, ⋮ for delete, the collection's products | `2777:67321` | ⬜ |
| 11.12 | Product menu: Remove from collection | `2777:67713` | ⬜ |
| 11.13 | Toast "Removed from Favourites. Still in your shop." Cursor on All collections. | `2777:68123` | ⬜ |
| 11.14 | Back to All Collections: the grid, Favourites now 3 products | `2779:67017` | ⬜ |

### Flow 2: Empty collection page ✅ (approved 2026-10-06)

Section `2780:67176`. Cover `2780:67177`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.15 | Collections grid (4): the creator opens the empty "Night-time reset" board | `2780:67183` | ⬜ |
| 11.16 | Empty collection page: "0 products", Copy Link disabled (hidden from shoppers), empty box, Go to All Picks | `2780:67260` | ⬜ |
| 11.17 | All Picks tab after Go to All Picks, cursor on a product's ⋮ (continues into Flow B) | `2780:67668` | ⬜ |

### Flow 3: Copy collection link ✅ (approved 2026-10-06)

Section `2781:67699`. Cover `2781:67700`. A creator can copy a collection's link from two places.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.18 | Collection page: cursor on Copy Link | `2781:67717` | ⬜ |
| 11.19 | Toast "Collection link copied" | `2781:67860` | ⬜ |
| 11.20 | Collections grid › board ⋮ menu: Copy collection link (hover) | `2781:68015` | ⬜ |
| 11.21 | Grid with toast "Link to My morning routine copied" | `2781:68313` | ⬜ |

### Flow 4: Storefront without collections 🟡

Section `2782:68420`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 04.4 | Storefront when a creator has no collections, or all are empty: the Collections row is hidden | `2782:68431` | ⬜ |
| 04.5 | A shared link to a deleted or empty collection: "This collection isn't available", a Visit Charlotte's Storefront button, and More collections from Charlotte | `2782:68945` | ⬜ |

**How shoppers get here.** Shown on the screens as the file's `Annotation` component: category Info, plus one Development note.

- **04.4: the creator's main storefront** (`urmei.com/shop/<creator>`).
  - **Reached from:** the creator's bio link, URMEI's Creators listing or search, or the Creators › Creator breadcrumb or top bar on a product page.
  - **Why the Collections row is hidden:**
    1. A new creator: the shop starts with an empty Favourites.
    2. The creator deleted all their collections.
    3. Every collection is empty.
    4. Nothing is available in the shopper's market (see 01.3, "no picks in this market").
  - **What the shopper sees:** no empty box or message.
- **04.5: a collection's own link** (`urmei.com/shop/<creator>/<collection>`).
  - **Reached from:** outside only, through a link the creator shared earlier (Instagram, a story, a message, a bookmark). Never from inside the storefront, because collection rows only show collections the shopper can open.
  - **Why the collection can't be shown:**
    1. It was deleted after the link was shared.
    2. Every product was removed.
    3. Nothing in it is available in the shopper's market.
    4. It was renamed, if the link is built from the name. This is open decision 8.

### Flow 5: Unpublished shop 🟡

Section `2786:68996`. The shop has never been published, so it has no live links. This follows the existing `hasLiveLink` rule.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.22 | Collection page: Shop Info card shows "Publish shop to get your URL" and Publish Shop; Copy Link disabled (annotation) | `2786:69003` | ⬜ |
| 11.23 | Board ⋮ menu: Copy collection link greyed out; Edit and Delete still work (annotation) | `2786:69408` | ⬜ |

### Flow 6: Favorites are now Collections 🟡

Section `2787:69374`. An existing creator's first visit after launch (Q13).

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.24 | All Picks with the `Notification Banner` component: "Favorites are now Collections…", a **View Collections** action, and a badge on the Collections tab | `2787:69381` | ⬜ |
| 11.25 | Collections tab after View Collections; annotation on the migrated "Favourites" (old order, #1, banner shows once) | `2787:69782` | ⬜ |

### Flow 7: Collection name errors 🟡

Section `2788:69743`. Uses the `Inputbox` Error variant. The same errors apply in Edit (11.4).

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.26 | Name required: "Enter a collection name" | `2788:69750` | ⬜ |
| 11.27 | Too long: "45/40 · Use 40 characters or fewer" | `2788:70108` | ⬜ |
| 11.28 | Duplicate: "You already have a collection called …"; Development annotation (open decision 9) | `2788:70448` | ⬜ |

### Flow 8: Storefront preview 🟡

Section `2788:239935`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.29 | Collections grid: cursor on Preview Storefront | `2788:239942` | ⬜ |
| 11.30 | "Your shop preview": Favorite Picks replaced by the Collections row from 04.1, in the creator's order, empty ones hidden (annotation) | `2788:240237` | ⬜ |

### Flow 9: Edit and delete from the collection page 🟡

Section `2789:70752`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.31 | Edit Details opens the Edit dialog over the collection page (Favourites, 10/40, 48/100) | `2789:70759` | ⬜ |
| 11.32 | ⋮ menu under the more button: Delete collection | `2789:70963` | ⬜ |
| 11.33 | Delete confirmation: "Favourites" will be removed; its 4 products stay | `2789:71394` | ⬜ |
| 11.34 | Back on the grid, Collections (2), positions renumbered, toast "Favourites deleted. Its products are still in your shop." | `2789:71559` | ⬜ |

### Reordering in the approved flows (2026-10-06)

The grids in 11.14 (`2779:67017`), 11.15 (`2780:67183`), 11.20 (`2781:68015`) and 11.21 (`2781:68313`) now show the "#n on storefront" strip. The empty board reads "Not on storefront yet".

## Planned (one at a time, after approval)

| Flow | Screens | Status |
|---|---|---|
| — | Show reordering in the next client review round (Round 1 is locked) | ⬜ |
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
7. ~~Reordering~~: decided 2026-10-06. It's in scope (Flow F).
8. **Collection link format (dev):** if the link is built from the collection name, renaming breaks every link already shared. Use a fixed id in the link, or redirect old links to the new name.
9. **Unique collection names:** we assumed names must be unique per creator, ignoring case. This keeps links unique (11.28). Confirm with the client.
