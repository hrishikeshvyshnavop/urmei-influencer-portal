# Shop collections: Figma flows

Every Collections flow in the Work File, with its status. Tracked as `T-31`. The requirement and decisions are in `REQUIREMENT-COLLECTIONS.md` and `COLLECTIONS-ANSWERS.md`.

Last updated: 2026-10-06.

**Links:** `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=<id>`. Write the id with `-` instead of `:`, e.g. `2777-67314`.

**Workflow:** build one flow at a time, each in its own new section, then wait for approval before starting the next. Reviewed sections are locked: later changes go in an add-on section. Icons are always library icon instances, never typed characters (rules in `responsive-workflow-urmei/_shared/workfile.md`). The product card at the top of a dialog is always the **Dialog Product Summary** component (set `2799:73542` on Components — Dev Handoff; Desktop/Mobile, `Show Availability` off by default; padding uses tokens). It was applied to all 5 desktop dialogs in 05 and the 3 mobile WIP dialogs on 2026-10-06. Cursors are always a clone of the **Pointer Container** group `2775:169244` (70×73, fingertip at 21, 9). Place it with its fingertip on the target, positioned ABSOLUTE in the top-level screen frame. All the Collections and mobile WIP cursors were switched to it on 2026-10-06.

## Status key

| Status | Meaning |
|---|---|
| 🔒 Shared | Shown to the client in round 1 (01 and 02). Now editable. |
| ✅ Approved | Approved by you; not in client review yet. |
| 🟡 Awaiting approval | Built and waiting for your go-ahead. |
| 🗄️ Archived | Kept on Hrishi Workspace; not part of the design. |
| 🧪 WIP | Draft on Hrishi Workspace. Not in review yet. |
| 💡 Add-on | Outside the agreed decisions. Needs client sign-off. |
| ⬜ Planned | Not built yet. |

## Figma structure

Every Collections design is in **one section** on the flows page `2650:50683`: **[Influencer] Collections | 06.10.26** (`2764:66587`). Sub-sections follow the **user journey** (approved 2026-10-06), stacked top to bottom, left-aligned, 200px apart. Each sub-section has its cover first, then screens 200px apart; edge cases are stacked under their default screen.

| # | Sub-section | Id | Flow (below) |
|---|---|---|---|
| 01 | Create Collection | `2764:66613` | A |
| 02 | Edit Collection | `2801:72058` | A |
| 03 | Delete Collection | `2801:72375` | A |
| 04 | Empty Collections | `2792:108198` | C |
| 05 | Add to Collection | `2792:71522` | B |
| 06 | Collection Name Errors | `2788:69743` | 7 |
| 07 | Creator Product Page | `2792:108199` | D |
| 08 | Open Collection & Remove a Product | `2777:67314` | 1 |
| 09 | Empty Collection Page | `2780:67176` | 2 |
| 10 | Edit and Delete from Collection Page | `2789:70752` | 9 |
| 11 | Reorder Collections | `2771:66587` | F |
| 12 | Copy Collection Link | `2781:67699` | 3 |
| 13 | Unpublished Shop | `2786:68996` | 5 |
| 14 | Storefront Preview | `2788:239935` | 8 |
| 15 | Collections on the Storefront | `2757:65060` | E |
| 16 | Storefront Without Collections | `2782:68420` | 4 |

Journey groups:
- **Managing collections:** 01–04, Create, Edit and Delete (split out of the old "Collections" sub-section on 2026-10-06), then Empty Collections
- **Filling a collection:** 05–07
- **Inside a collection:** 08–11
- **Sharing:** 12–14
- **Shopper:** 15–16

> Order check: sub-sections 04–07 now read Empty Collections → Add to Collection → Name Errors → Creator Product Page. They appear to have been moved in Figma after the approved order, which was Name Errors → Empty → Product Page → Add. The current Figma order is kept.

- **New flows** go in where they fit in the journey. Renumber everything after them.
- **Mobile drafts** stay on Hrishi Workspace › Collections — Mobile (WIP) `2767:51554`.

> **Deleted from the file (noticed 2026-10-06):** the old mobile frames 11.1–11.5, the empty-board options A–E frame (`2760:65839`) and the overview panel (`2791:71522`). Restore them from Figma's version history, or rebuild them if they're still needed.

### Frame names: old → new

Frames were renamed to `NN.S <Sub-section> — <State> — <Device>` to match their sub-section (2026-10-06). The ids didn't change. The flow tables below still use the old numbers.

| Old | New | Id |
|---|---|---|
| 11.1 | 01.1 | `2750:146644` |
| 11.2 | 01.2 | `2750:146556` |
| 11.3 | 02.1 | `2750:146310` |
| 11.4 | 02.2 | `2750:146394` |
| 11.5 | 03.2 | `2750:146476` |
| 11.26 | 06.1 | `2788:69750` |
| 11.27 | 06.2 | `2788:70108` |
| 11.28 | 06.3 | `2788:70448` |
| 11.1a | 04.1 | `2758:65509` |
| 11.1b | 04.2 | `2758:65790` |
| 11.9 | 07.1 | `2763:65814` |
| 11.6 | 05.1 | `2753:64411` |
| 11.7 | 05.6 | `2753:64849` |
| 11.8 | 05.5 | `2753:65379` |
| 11.7a | 05.7 | `2755:64723` |
| 11.7b | 05.8 | `2755:65115` |
| 11.11 | 08.1 | `2777:67321` |
| 11.12 | 08.2 | `2777:67713` |
| 11.13 | 08.3 | `2777:68123` |
| 11.14 | 08.4 | `2779:67017` |
| 11.15 | 09.1 | `2780:67183` |
| 11.16 | 09.2 | `2780:67260` |
| 11.17 | 09.3 | `2780:67668` |
| 11.31 | 10.1 | `2789:70759` |
| 11.32 | 10.2 | `2789:70963` |
| 11.33 | 10.3 | `2789:71394` |
| 11.34 | 10.4 | `2789:71559` |
| 11.10 | 11.1 | `2771:66588` |
| 11.10a | 11.2 | `2783:69022` |
| 11.18 | 12.1 | `2781:67717` |
| 11.19 | 12.2 | `2781:67860` |
| 11.20 | 12.3 | `2781:68015` |
| 11.21 | 12.4 | `2781:68313` |
| 11.22 | 13.1 | `2786:69003` |
| 11.23 | 13.2 | `2786:69408` |
| 11.29 | 14.1 | `2788:239942` |
| 11.30 | 14.2 | `2788:240237` |
| 04.1 | 15.1 | `2757:65132` |
| 04.2 | 15.2 | `2757:65695` |
| 04.3 | 15.3 | `2763:66163` |
| 04.4 | 16.1 | `2782:68431` |
| 04.5 | 16.2 | `2782:68945` |

New screens added on 2026-10-06: 01.3 Collection Created toast `2801:71721`, 02.3 Collection Updated toast `2801:72068`, 03.1 Card Menu Delete collection `2801:72385`, 03.3 Collection Deleted toast `2801:72668`. 01.2 is now filled in ("Night-time reset").

Covers are named `NN.0 <Sub-section> — Cover` and use the `Cover` component (path-style title) in 01–05.

## Flows

### Flow A: Manage collections (My Shop) 🔒

Section `2764:66613`, row 1. Cover `2750:146638`.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 11.1 | Collections tab: board grid and New Collection | `2750:146644` | deleted |
| 11.2 | Create collection dialog | `2750:146556` | deleted |
| 11.3 | Board ⋮ menu: Edit details, Copy collection link, Delete collection | `2750:146310` | deleted |
| 11.4 | Edit collection dialog | `2750:146394` | deleted |
| 11.5 | Delete collection confirmation | `2750:146476` | deleted |

### Flow B: Add a product to collections (first-time creator) 🟡

Sub-section **05 - Add to Collection** (`2792:71522`). It was rebuilt on 2026-10-06 as a first-time creator's path. The cover is the new `Cover` component: "All Picks → ⋮ → Add to collection → New collection → Save".

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 05.1 | All Picks › product ⋮ menu › **Add to collection** (cursor), Collections (1) | `2753:64411` | `2767:52214` |
| 05.2 | Add to collection dialog, first time: only "Favourites" (0 products); cursor on **New Collection** | `2797:71078` | ⬜ |
| 05.3 | **Create collection** dialog, filled in ("My morning routine", 18/40); cursor on Create Collection | `2797:71531` | ⬜ |
| 05.4 | Back in Add to collection: "My morning routine" (New) ticked; cursor on **Save** | `2797:72068` | ⬜ |
| 05.5 | Toast "Added to My morning routine", Collections (2) | `2753:65379` | `2767:52482` |

Edge cases, stacked under 05.2:

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 05.6 | Returning creator with 3 collections (multi-select) | `2753:64849` | `2768:52438` |
| 05.7 | Many collections: search box and scrolling list | `2755:64723` | `2768:52809` |
| 05.8 | No collections: empty box, Save disabled | `2755:65115` | `2768:53270` |

### Flow C: Empty collections 🔒 (mobile 🧪)

Section `2764:66613`, row 3. Cover `2758:65461`.

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 11.1a | No collections yet | `2758:65509` | `2767:51671` |
| 11.1b | A collection with no products | `2758:65790` | `2767:51943` |
| — | Empty board: options A–E (decision needed) | deleted (`2760:65839`) | — |

### Flow D: Creator product page 🔒 (mobile 🧪)

Section `2764:66613`, row 4.

| # | Screen | Desktop | Mobile (WIP) |
|---|---|---|---|
| 11.9 | Product page: Add To Collection button, "In 2 collections" chips. Three Info annotations explain what changed from Favorites: badge removed, button renamed, chips added | `2763:65814` | `2767:52753` |

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

### Flow 1: Open collection & remove a product ✅ (approved 2026-10-06; renamed from "Collection Detail")

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

### Flow 6: Favorites are now Collections 🗄️ Archived (2026-10-06)

Not needed: Favorites was never released to creators, so there are no existing favourites to move (Q13 updated). The section `2787:69374` was moved to Hrishi Workspace as "Archived — Favorites Are Now Collections".

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
