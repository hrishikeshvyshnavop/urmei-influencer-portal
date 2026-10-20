# Shop collections: Figma flows

Every Collections flow in the Work File, with its status. Tracked as `T-31`. The requirement and decisions are in `change-requests/collections/REQUIREMENT.md` and `change-requests/collections/ANSWERS.md`.

Last updated: 2026-10-07.

**Links:** `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=<id>`. Write the id with `-` instead of `:`, e.g. `2777-67314`.

**Workflow:** build one flow at a time, each in its own new section, then wait for approval before starting the next. Reviewed sections are locked: later changes go in an add-on section. Icons are always library icon instances, never typed characters (rules in `workflows/_shared/workfile.md`). The product card at the top of a dialog is always the **Dialog Product Summary** component (set `2799:73542` on Components — Dev Handoff; Desktop/Mobile, `Show Availability` off by default; padding uses tokens). It was applied to all 5 desktop dialogs in 05 and the 3 mobile WIP dialogs on 2026-10-06. Cursors are always a clone of the **Pointer Container** group `2775:169244` (70×73, fingertip at 21, 9). Place it with its fingertip on the target, positioned ABSOLUTE in the top-level screen frame. All the Collections and mobile WIP cursors were switched to it on 2026-10-06.

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
| 10 | Edit from Collection Page | `2805:249371` | 9 |
| 11 | Delete from Collection Page | `2789:70752` | 9 |
| 12 | Reorder Collections | `2771:66587` | F |
| 13 | Copy Collection Link | `2781:67699` | 3 |
| 14 | Unpublished Shop | `2786:68996` | 5 |
| 15 | Storefront Preview | `2788:239935` | 8 |
| 16 | Collections on the Storefront | `2757:65060` | E |
| 17 | Collection No Longer Available | `2782:68420` | 4 |
| 18 | Remove from Product Page | `2839:73643` | D |
| 19 | Add from Product Page 💡 | `2847:75873` | G |
| 20 | Add from Search Results 💡 | `2852:77845` | G |

Journey groups:
- **Managing collections:** 01–04, Create, Edit and Delete (split out of the old "Collections" sub-section on 2026-10-06), then Empty Collections
- **Filling a collection:** 05–07
- **Inside a collection:** 08–12
- **Sharing:** 13–15
- **Shopper:** 16–17
- **Add-on:** 19–20 sit at the bottom for now. If the client approves them, they belong with "Filling a collection" (before 05), which means renumbering 05–18.

> Order check: sub-sections 04–07 now read Empty Collections → Add to Collection → Name Errors → Creator Product Page. They appear to have been moved in Figma after the approved order, which was Name Errors → Empty → Product Page → Add. The current Figma order is kept.

- **New flows** go in where they fit in the journey. Renumber everything after them.
- **Main-file copy:** the client-facing copy is **[NEW] Collections | 07.10.26** `1862:81644` in the main file (`cehltPtMoGWEtKbF7k3MQQ`, page `236:15116`). It differs from the table above in two places (organized 2026-10-13):
  - **09:** `Browse & Add Product to Collection` `1970:101055` replaces Empty Collection Page. Its 09.1 is the empty collection page, and it goes on to browse the catalogue, search, and add the product with the collection ticked.
  - **21 (new):** `Browse & Add Product to Existing Collection` `1970:101729`. It starts from the collection page's "Add to collection" tile.

  Neither flow is in the Work File yet.
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

**Detailed flows (2026-10-06):**

- **10 Edit and Delete from Collection Page** now has two rows, each with its own Cover:
  - **Edit:** 10.1 page with the cursor on Edit Details `2803:72325` → 10.2 Edit dialog ("Favourites" renamed to "My all-time favourites") → 10.3 page with the new name and a "Collection updated" toast `2803:72698`.
  - **Delete:** 10.4 page with the cursor on ⋮ `2803:73083` → 10.5 menu → 10.6 confirmation → 10.7 grid with a "deleted" toast.
- **12 Copy Collection Link** now has two rows, each with a Cover: from the collection page (12.1–12.2), and from the board ⋮ menu (12.3–12.4).
- **12 Reorder Collections, no toast after a move (decided 2026-10-06):** to match the old Reorder Favorite flow, the screen after the order change, with its "moved to #n" toast, was removed (`2783:69022`). The flow is now the cover plus 12.1. A failed save would use the old error toast ("Couldn't save the new order, we put it back the way it was"). That screen isn't drawn yet.
- **Split, 2026-10-06:** "Edit and Delete from Collection Page" is now two sub-sections, **10 Edit from Collection Page** (`2805:249371`) and **11 Delete from Collection Page** (`2789:70752`), each with its own cover.
- **Disabled states, 2026-10-06:** a disabled button always uses the Button component's `State=Disabled` variant, never opacity. That's how the file builds Preview Storefront, Publish shop and the old Favorites arrows. The 22 end-of-row ‹ › reorder arrows were switched from 40% opacity to `Button=Outlined icon, Size=sm, State=Disabled`. Copy Link (14.1) already used `Button=Outlined, Size=md, State=Disabled`. One exception: `Item Dropdown` has no Disabled state. The greyed "Copy collection link" menu item (14.2) therefore stays at full opacity, with its text bound to `typography/color/secondary/500`, the same disabled colour (#d5d5d5) as disabled button labels. **Colour check (2026-10-06):** disabled buttons use a #f8f8f8 fill, a #e5e5e5 border and a #d5d5d5 label and icon, all from tokens. The `copy` icon on the disabled Copy Link (14.1 and 09.2) kept a white fill after the variant swap. That fill was removed, so no white square shows behind the icon.

Covers are named `NN.0 <Sub-section> — Cover`. **Every** sub-section now uses the `Cover` component with a path-style title, e.g. "Board ⋮ → Delete collection → Delete" (clean-up, 2026-10-06).

**Product page: remove from a collection (2026-10-06).** On the creator product page, each collection chip now has a ✕. It's the library **`_Tag x close`** (Size=lg, resized to 18×18 with a 14px icon), the same close the applied-filter tags in Search & Filter use. The first version used the raw 24px `x` icon, which looked too big and was replaced. The chip's gap and padding use `spacing/sm` and `spacing/md-sm`. Clicking ✕ removes the product from that collection only; it stays in the shop. Clicking the chip still opens the collection.
- **New screens:** 07.2 cursor on the ✕ of "My morning routine" (`2813:256881`), then 07.3 showing "In 1 collection" and the toast "Removed from My morning routine. Still in your shop." (`2813:256997`).
- **Annotation and cover:** the 07.1 "New" annotation mentions the ✕, and the cover now reads "My Shop → product page → add to or remove from a collection".

**07 Creator Product Page, now a proper flow (2026-10-06).** Two rows, each with a Cover:
- **Add:** 07.1 product page (annotations; cursor on Add To Collection) → 07.2 Add to collection dialog over the page, ticking "Copy my wedding look", cursor on Save (`2817:72990`) → 07.3 "In 3 collections" with the toast "Added to Copy my wedding look" (`2817:73472`).
- **Remove:** 07.4 cursor on a chip's ✕ → 07.5 toast "Removed from My morning routine. Still in your shop." with **Undo**. (07.6, the "last product" edge case `2817:73831`, was later removed in Figma.)

**Undo rule (2026-10-06):** removing a product from a collection has **no confirmation dialog**, because it's reversible and the product stays in the shop. The toast instead shows an **Undo** action, using the Toast component's `Show Button`, relabelled "Undo" with no icon. This applies on the product page (07.5, 07.6) and the collection page (08.3). If it was the collection's last product, the toast also says the collection is now hidden from the storefront. Confirmation dialogs stay only on destructive actions: Delete collection and Remove from shop.

**Footer clipping (07.x):** the full product-page frames (07.1, 07.3, 07.4, 07.5) were fixed at 2253px while the footer ends at 2334px, which cut off its last 81px, including the social icons. They now end at the footer's bottom. 07.2 is a 900px dialog view and stays cropped on purpose.

**Footer spacing (15.2):** the storefront preview frame had a fixed height that left 104px blank under the footer. It now hugs its content. No other Collections screen had the same gap.

**Empty states, matched to the main design (2026-10-06).** The pattern comes from "Your shop is empty" on 03.6 Publish Shop (main file `1347:38109`; the Work File copy is the "Favorite Slot 1 / Empty" box):
- **Box:** a dashed box (2px, 8/6 dash, 10px corners, surface fill).
- **Icon:** a 64px round icon well.
- **Text:** a Medium 20 title over a Regular 12 body, from tokens. Both hug their text and don't wrap.
- **Action:** a primary button.

Our three empty states were rebuilt from that box:
- **04.1 No collections:** `layout-grid` icon, "No collections yet", **+ New Collection**.
- **09.2 Empty collection page:** `shopping-bag` icon, "No products in this collection yet", **Go to All Picks**. Its page container now hugs, so the footer sits below the box.
- **05.8 Add to collection dialog:** same pattern, compact (300px). The button is **outlined** so it doesn't compete with the dialog's Save.

The mobile WIP empty states on Hrishi Workspace still use the old dashed box.

**Clean-up, 2026-10-06:**
- **Covers:** the 7 old-style covers (04, 06, 09, 12, 14, 15, 16) were replaced with the Cover component.
- **Annotation names:** 7 were renumbered to their current screen, e.g. `Annotation / 06.3`.
- **Generic layers:** 228 were renamed (`Text / …`, `Row / …`, `Stack / …`, `Image`, `Icon Path`, `Shape`, `Divider`). Cursor and annotation internals were skipped.
- **Layout:** sub-sections were refitted and restacked 200px apart.
- **17:** it's now only the dead-link case (the "no collections" storefront screen was removed in Figma). It was renamed **Collection No Longer Available**, with the cover "Shared collection link → Collection isn't available" and three one-line annotations (entry, why, dev link format).

## Code build source (`T-41`, 2026-10-19)

The code is built from the main design file, not the Work File drafts. Section **[NEW] Collections | 07.10.26** `1862:81644` in `cehltPtMoGWEtKbF7k3MQQ` ([link](https://www.figma.com/design/cehltPtMoGWEtKbF7k3MQQ/-MVP--Influencer-Portal?node-id=1862-81644&m=dev)) holds 21 desktop flows. The user shared it on 2026-10-19 as the context for the code. Where it differs from the Work File flows above, this section wins for the build.

| # | Flow | Code status |
|---|---|---|
| 01 | Create Collection | Built on `feature/collections`: Collections tab replaces Favorites, collection boards with ‹ › reorder, New collection dialog, "<name> created" toast |
| 02 | Edit Collection | Built: the board ⋮ menu with Edit details, the shared Collection dialog in edit mode (prefilled, Save Changes), "Collection updated" toast. The menu's Copy collection link and Delete collection rows arrive with flows 13 and 03 |
| 03 | Delete Collection | Built: "Delete collection" (red) in the board ⋮ menu, the "Delete this collection?" confirm with the product count, and the design's toast. Products stay in the shop |
| 04 | Empty Collections | Built: with no collections the tab shows the dashed "No collections yet" box (layout-grid icon, primary New Collection) and the toolbar drops the arrows hint. `EmptyFavorites` removed |
| 05 | Add to Collection | Built: "Add to collection" replaces Add/Remove Favorite in the product card ⋮ menu (My Shop). The "Add to collection" dialog has the product summary (new `DialogProductSummary`), checkbox rows with product counts, ticked for collections the product is already in, and New Collection, which opens the create dialog; the new board comes back ticked and labelled "New". Above 5 collections it adds "(n)", a search box and a 240px scrolling list; with none it shows the dashed "No collections yet" box. Save stays off until something changes. The toast reads "Added to <name>" / "Added to n collections" / "Collections updated". The product page's own Add to collection is flow 07 |
| 06 | Collection Name Errors | Built in the shared collection dialog: "Enter a collection name" on submit when empty; while over 40 characters "45/40 · Use 40 characters or fewer" (the field no longer hard-caps); a duplicate name (case-insensitive, excluding itself when editing) shows 'You already have a collection called "…"'. Placeholders follow the design ("e.g. My morning routine", "One line about this collection") |
| 07 | Creator Product Page | Built: the product page (My Shop "View product details", Home and the portal product overlay) swaps "Add/Remove From Favorite" for "Add to Collection" and drops the ★ Favorite badge on the image. Under the affiliate link: "In n collections · Shoppers can find it in each one" with a chip per collection. One `CollectionPicker` serves Home and the overlay. Each chip's × (flow 18) is built too |
| 18 | Remove from Product Page | Built (with 07, on request): chip × → "Remove from this collection?" (new shared `ConfirmDialog`, which `DeleteCollectionDialog` now uses too) → removed from that collection only; toast "Removed from <name>. Still in your shop." with Undo, which puts it back in the same position. Works from My Shop, Home and the product overlay |
| 08 | Open Collection & Remove a Product | Built: a board's cover or info opens the collection page inside the Collections tab (`CollectionPage`). It has "‹ All collections", the name with "description · n products", Copy Link / Edit Details / ⋮, and the products as shop cards. The card menu has "Remove from collection" (removes at once; "Removed from <name>. Still in your shop." with Undo). Back returns to the boards; deleting the open collection does too |
| 10, 11 | Edit / Delete from the collection page | Built by wiring: Edit Details opens the edit dialog; ⋮ → Delete collection opens the delete confirm |
| 12 | Reorder Collections | Built with 01 (the ‹ › arrows, the failure snap-back toast). Motion added 2026-10-20 (user: make the reorder more intuitive): boards slide to their new places (`useFlip`, 360ms, `--ease-portal`); the moved board lifts (soft shadow, 2% scale) and stays above its neighbours while they pass; a failed save shakes it briefly. Respects reduced motion |
| 13 | Copy Collection Link | Built: page "Copy Link" → "Collection link copied"; board menu "Copy collection link" → "Link to <name> copied". The link uses the fixed id (`urmei.com/shop/charlotte/collections/<id>`) so it survives renames (dev annotation `1862:82119`) |
| 14 | Unpublished Shop | Built: before the first publish, Copy Link is disabled on the page and the board menu row is greyed; Edit and Delete still work (`ItemMenuAction.disabled`) |
| 09 | Browse & Add Product to Collection | Built: an empty collection page shows the dashed "No products in this collection yet" box with "Add product to collection". That opens the catalogue; while filling, result rows say "Add to Collection", Add to shop arrives with the collection ticked, and the toast is "Added to collection". The target clears when the catalogue closes |
| 19, 20 | Add from Product Page / Search Results | Built: the Add to shop dialog's Favorite toggle is replaced by an optional "Choose collections (optional)" checklist (shared `CollectionChecklist`, with New Collection). Nothing ticked means All Picks only. The toast is "Added to your shop and to <name>" / "… to n collections" / "Product added to your shop". It is the same in My Shop, Home and the product overlay (`AddToShopWithCollections`). The leftover favourites code is gone from those screens. **Conflicts with ANSWERS Q10** ("only from products already in My Shop"); the design's own annotation `1913:36640` asks for confirmation. Built as designed, pending the user's confirmation |
| 15 | Storefront Preview | Built: the in-app storefront preview swaps "<Name>'s favorite picks" for "<Name>'s collections", a new shared `StorefrontCollections` row. It shows the boards in the creator's order, 288px three-image covers over name, description and count, the ‹ › scroll once the row overflows, and the same gradient band. Empty collections are hidden (annotation `1862:82709`); with none left the row is omitted. Boards aren't clickable yet: the storefront collection page is flow 16 |
| 16 | Collections on the Storefront | Built: the public `/shop/view` replaces Favorite Picks with the Collections row; a board opens `/shop/view/collections/<id>`. That collection page (`StorefrontCollectionPage`) has "Collection by <name> @handle", the name, description and count, "Copy collection link" ("Collection link copied"), "In this collection", and "More collections from <name>". A product opened from it shows "You're shopping <name>'s collection · <collection>" in the market bar, and under the product "In <name>'s collections". The in-app preview opens the same page in place |
| 17 | Collection No Longer Available | Built: a link to a deleted or emptied collection, or one with nothing shipping to the shopper's market, shows "This collection isn't available" with "Visit <name>'s Storefront" and the other collections. The design's "Her other picks" is written "Their other picks", since the creator's pronouns aren't known |
| 21 | Browse & Add Product to Existing Collection | Built: a non-empty collection page ends with an "Add To Collection · Choose from the catalogue" tile. That opens the catalogue in the same fill mode as flow 09; the dialog title reads "Add this product to collection?" and the toast names the collection ("Added to Favourites"). Flow 09's toast now names it too (the design had "Added to collection") |

Facts the design adds:
- the board subtitle reads "Group your picks into boards. Use the arrows to set the order shoppers see"
- the position row reads "#n on storefront"
- an empty board reads "No products yet / Add picks from the All Picks tab" and "0 products · Won't appear on your storefront"
- a new collection lands at #1

Flows and frames:

### 01 - Create Collection (`1862:87949`)

- `1862:88254` 01.0 Create Collection — Cover
- `1862:88159` 01.1 Create Collection — My Shop Collections Tab — Desktop
- `1862:88052` 01.2 Create Collection — Create Collection Dialog — Desktop
- `1862:87950` 01.3 Create Collection — Collection Created Toast — Desktop

### 02 - Edit Collection (`1862:87654`)

- `1862:87948` 02.0 Edit Collection — Cover
- `1862:87849` 02.1 Edit Collection — Card Menu Open — Desktop
- `1862:87742` 02.2 Edit Collection — Edit Collection Dialog — Desktop
- `1862:87655` 02.3 Edit Collection — Collection Updated Toast — Desktop

### 03 - Delete Collection (`1862:87378`)

- `1862:87653` 03.0 Delete Collection — Cover
- `1862:87554` 03.1 Delete Collection — Card Menu Delete Collection — Desktop
- `1862:87449` 03.2 Delete Collection — Delete Collection Confirm — Desktop
- `1862:87379` 03.3 Delete Collection — Collection Deleted Toast — Desktop

### 04 - Empty Collections (`1862:87332`)

- `1862:87377` 04.0 Empty Collections — Cover
- `1862:87333` 04.1 Empty Collections — No Collections Empty State — Desktop

### 05 - Add to Collection (`1862:86015`)

- `1862:87331` 05.0 Add to Collection — Cover
- `1862:87178` 05.1 Add to Collection — Pick Menu Add to Collection — Desktop
- `1862:87012` 05.2 Add to Collection — Add to Collection Dialog First Time — Desktop
- `1862:86852` 05.3 Add to Collection — Create Collection from Add to Collection — Desktop
- `1862:86683` 05.4 Add to Collection — New Collection Selected — Desktop
- `1862:86543` 05.5 Add to Collection — Added to Collection Toast — Desktop
- `1862:86371` 05.6 Add to Collection — Returning Creator With Collections — Desktop
- `1862:86178` 05.7 Add to Collection — Many Collections — Desktop
- `1862:86016` 05.8 Add to Collection — No Collections — Desktop

### 06 - Collection Name Errors (`1862:85718`)

- `1862:86014` 06.0 Collection Name Errors — Cover
- `1862:85916` 06.1 Collection Name Errors — Create Collection Name Required — Desktop
- `1862:85818` 06.2 Collection Name Errors — Create Collection Name Too Long — Desktop
- `1862:85719` 06.3 Collection Name Errors — Create Collection Duplicate Name — Desktop
- `1862:85817` Annotation / 06.3

### 07 - Creator Product Page (`1862:85320`)

- `1862:85717` 07.0 Creator Product Page — Cover
- `1862:85590` 07.1 Creator Product Page — Product Page Click Add to Collection — Desktop
- `1862:85441` 07.2 Creator Product Page — Add to Collection Dialog — Desktop
- `1862:85321` 07.3 Creator Product Page — Added to Collection Toast — Desktop
- `1862:85716` Annotation / 07.1 / Add To Collection
- `1862:85715` Annotation / 07.1 / Favorite removed

### 08 - Open Collection & Remove a Product (`1862:84805`)

- `1862:85319` 08.0 Open Collection & Remove a Product — Cover
- `1862:85176` 08.1 Open Collection & Remove a Product — Open Collection — Desktop
- `1862:85019` 08.2 Open Collection & Remove a Product — Product Menu Remove from Collection — Desktop
- `1862:84892` 08.3 Open Collection & Remove a Product — Removed from Collection Toast — Desktop
- `1862:84806` 08.4 Open Collection & Remove a Product — Back to All Collections — Desktop

### 09 - Browse & Add Product to Collection (`1970:101055`)

- `1970:101728` 09.0 Browse & Add Product to Collection — Cover
- `1970:101437` 09.1 Browse & Add Product to Collection — Empty Collection Click Add Products — Desktop
- `1970:101494` 09.2 Browse & Add Product to Collection — Catalogue Default — Desktop
- `1970:101597` 09.3 Browse & Add Product to Collection — Catalogue Search Autocomplete — Desktop
- `1970:101208` 09.4 Browse & Add Product to Collection — Search Results Click Add to Collection — Desktop
- `1970:101056` 09.5 Browse & Add Product to Collection — Add to Shop Dialog With Collection — Desktop
- `1970:101322` 09.6 Browse & Add Product to Collection — Added to Collection Toast — Desktop

### 10 - Edit from Collection Page (`1862:84174`)

- `1862:84635` 10.0 Edit from Collection Page — Cover
- `1862:84483` 10.1 Edit from Collection Page — Collection Page Click Edit Details — Desktop
- `1862:84319` 10.2 Edit from Collection Page — Edit Collection Dialog — Desktop
- `1862:84175` 10.3 Edit from Collection Page — Collection Updated Toast — Desktop

### 11 - Delete from Collection Page (`1862:83634`)

- `1862:84173` 11.0 Delete from Collection Page — Cover
- `1862:84021` 11.1 Delete from Collection Page — Collection Page Click More — Desktop
- `1862:83867` 11.2 Delete from Collection Page — More Menu Delete Collection — Desktop
- `1862:83705` 11.3 Delete from Collection Page — Delete Collection Confirm — Desktop
- `1862:83635` 11.4 Delete from Collection Page — Collection Deleted Toast — Desktop

### 12 - Reorder Collections (`1862:83537`)

- `1862:83633` 12.0 Reorder Collections — Cover
- `1862:83538` 12.1 Reorder Collections — Reorder Collections — Desktop

### 13 - Copy Collection Link (`1862:83052`)

- `1862:83053` 13 Copy Collection Link — Sub-flow — From Board Menu — Cover
- `1862:83536` 13.0 Copy Collection Link — Cover
- `1862:83384` 13.1 Copy Collection Link — Copy Link from Collection Page — Desktop
- `1862:83240` 13.2 Copy Collection Link — Collection Link Copied Toast — Desktop
- `1862:83141` 13.3 Copy Collection Link — Copy Link from Board Menu — Desktop
- `1862:83054` 13.4 Copy Collection Link — Collection Link Copied from Grid — Desktop

### 14 - Unpublished Shop (`1862:82806`)

- `1862:83051` 14.0 Unpublished Shop — Cover
- `1862:82908` 14.1 Unpublished Shop — Collection Page Unpublished Shop — Desktop
- `1862:82807` 14.2 Unpublished Shop — Board Menu Unpublished Shop — Desktop
- `1862:82906` Annotation / 14.2
- `1862:82907` Annotation / 14.2

### 15 - Storefront Preview (`1862:82561`)

- `1862:82805` 15.0 Storefront Preview — Cover
- `1862:82710` 15.1 Storefront Preview — Click Preview Storefront — Desktop
- `1862:82562` 15.2 Storefront Preview — Storefront Preview With Collections — Desktop
- `1862:82709` Annotation / 15.2

### 16 - Collections on the Storefront (`1862:82121`)

- `1862:82560` 16.0 Collections on the Storefront — Cover
- `1862:82376` 16.1 Collections on the Storefront — Storefront With Collections — Desktop
- `1862:82265` 16.2 Collections on the Storefront — Collection Page — Desktop
- `1862:82122` 16.3 Collections on the Storefront — Product Detail from a Collection — Desktop

### 17 - Collection No Longer Available (`1862:82021`)

- `1862:82120` 17.0 Collection No Longer Available — Cover
- `1862:82022` 17.1 Collection No Longer Available — Collection Isn't Available Page — Desktop
- `1862:82119` Annotation / 17.1 / Dev: link format
- `1862:82117` Annotation / 17.1 / Entry
- `1862:82118` Annotation / 17.1 / Why

### 18 - Remove from Product Page (`1862:81645`)

- `1862:82020` 18.0 Remove from Product Page — Cover
- `1862:81895` 18.1 Remove from Product Page — Click Chip Remove — Desktop
- `1862:81760` 18.2 Remove from Product Page — Remove from Collection Confirm — Desktop
- `1862:81646` 18.3 Remove from Product Page — Removed with Undo — Desktop

### 19 - Add from Product Page (`1913:35813`)

- `1913:35814` 19.0 Add from Product Page — Cover
- `1913:35815` 19.1 Add from Product Page — Product Page Click Add to Shop — Desktop
- `1913:35948` 19.2 Add from Product Page — Add to Shop Dialog With Collections — Desktop
- `1913:36119` 19.3 Add from Product Page — Favorites Ticked — Desktop
- `1913:36467` 19.4 Add from Product Page — Added Toast on Search Results — Desktop
- `1913:36573` 19.5 Add from Product Page — My Shop After Adding — Desktop
- `1913:36290` 19.6 Add from Product Page — Returning Creator With Collections — Desktop
- `1913:36640` Annotation / 19.2 / Add-on
- `1913:36641` Annotation / 19.2 / Optional

### 20 - Add from Search Results (`1913:36642`)

- `1913:36643` 20.0 Add from Search Results — Cover
- `1913:36644` 20.1 Add from Search Results — Search Results Click Add to Shop — Desktop
- `1913:36758` 20.2 Add from Search Results — Add to Shop Dialog over Search Results — Desktop
- `1913:36911` 20.3 Add from Search Results — Added Toast on Search Results — Desktop
- `1913:36910` Annotation / 20.2 / Variant

### 21 - Browse & Add Product to Existing Collection (`1970:101729`)

- `1970:102354` 21.0 Browse & Add Product to Existing Collection — Cover
- `1970:102222` 21.1 Browse & Add Product to Existing Collection — Collection Page Click Add to Collection — Desktop
- `1970:101988` 21.2 Browse & Add Product to Existing Collection — Catalogue Default — Desktop
- `1970:102091` 21.3 Browse & Add Product to Existing Collection — Catalogue Search Autocomplete — Desktop
- `1970:101874` 21.4 Browse & Add Product to Existing Collection — Search Results Click Add to Collection — Desktop
- `1970:101730` 21.5 Browse & Add Product to Existing Collection — Add to Collection Dialog — Desktop
- `1970:102355` 21.6 Browse & Add Product to Existing Collection — Added to Collection Toast — Desktop

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

### Flow G: Add from the catalogue 💡 Add-on (2026-10-07)

Sub-sections **19 - Add from Product Page** (`2847:75873`) and **20 - Add from Search Results** (`2852:77845`), split on 2026-10-07 (one per entry point). Both were built from the old "01 - Add Product" flow (`2843:73670`). In the catalogue's "Add this product to your shop?" dialog, the old **"Add this to your Favourite Picks" toggle (0/4)** is replaced by an optional **"Add to collections"** list (the Add to collection rows from 05.2/05.6, with New Collection). Nothing ticked = the product goes to All Picks only. **This conflicts with Q10** ("only from products already in My Shop"), so it needs client sign-off; Q10 is unchanged until then. Annotated on 19.2.

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 19.0 | Cover: "Add from the product page" (subtitle: Product page → Add to shop → pick collections → Confirm) | `2847:75874` | — |
| 19.1 | Catalogue product page, cursor on Add Product To My Shop | `2847:75883` | ⬜ |
| 19.2 | Dialog, first-time creator: only "Favourites" (0 products), cursor on its checkbox. Annotations: "New: … please confirm this change" (the add-on), and optional | `2847:76249` | ⬜ |
| 19.3 | Favourites ticked, cursor on Confirm | `2847:76666` | ⬜ |
| 19.4 | Back on search results, toast "Added to your shop and to Favourites" | `2847:77503` | ⬜ |
| 19.5 | My Shop: All Picks (1) and **Collections (1)** tabs; the ★ Favourite badge is gone | `2847:77935` | ⬜ |

Edge case, under 19.2:

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 19.6 | Returning creator with 3 collections, "My morning routine" ticked, cursor on Confirm. Annotation: New Collection opens the Create collection dialog and returns ticked | `2847:77066` | ⬜ |

**20 - Add from Search Results: without opening the product page (2026-10-07).** Cover 20.0 `2849:77133`: "Add from search results" (subtitle: Search results → Add to shop → pick collections → Confirm).

| # | Screen | Desktop | Mobile |
|---|---|---|---|
| 20.1 (was 19.7) | Search results, cursor on a result's **+ Add To Shop** | `2849:77142` | ⬜ |
| 20.2 (was 19.8) | The same dialog over the search results, Favourites ticked, cursor on Confirm. Annotation: the result shows a price range, so the variant is picked here | `2849:77559` | ⬜ |
| 20.3 (was 19.9) | Back on search results, toast "Added to your shop and to Favourites" | `2849:78014` | ⬜ |

Annotations don't point to other screens (the 19.7 note that referred to 19.2 was removed). Generic layer names in 19–20 were renamed (1,241 layers). The loose "01 - Add Product" section was moved down (y 62799 → about 65864) so the grown Collections section doesn't overlap it. Its frames weren't changed.

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
10. **Add to collections from the catalogue (19–20, add-on):** goes beyond Q10. If approved, update Q10 (keep the original answer and date) and move 19–20 into the "Filling a collection" group.
