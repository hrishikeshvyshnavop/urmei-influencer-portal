# Shop personalization (MVP): Figma flows

Tracked as `T-38`. The scope and answers are in `REQUIREMENT.md` (MVP section) and `ANSWERS.md`. The post-MVP vision flows (`T-33`) are recorded in `REQUIREMENT.md`, not here.

## Primary screen and primary flows (user, 2026-10-19)

> **The primary screen is `My shop — Desktop` `3287:33154`** (Personlisation page, at -6695, 44261). Every new frame starts from it. It's built from components: `Shop details`, `Banner content/Desktop` (toolbar with Change Backdrop, two `Featured slot`s, Show second slot), the `Backdrop` set (absolute, stretches with the banner), the Collections tab, with token spacing (24 / 32 / 64).

The current flows live in **`[Influencer] Shop Personalization (MVP) — Primary Flows — Lead Review`** `3321:24528`. The older top-level sections `01 - Change Backdrop` `3302:17696` and `02 - Add Featured Item` `3307:20249` are renamed "— Superseded by Primary Flows" and kept for reference.

**Flow frames use Shop details `State=Published`.** The primary screen itself is set to "No products", which doesn't fit a shop with 12 picks and 3 collections. That's flagged to the user, and the primary was left unchanged.

| Sub-section | Frame | Id | What it shows |
|---|---|---|---|
| `01 - Change Backdrop` `3321:24529` | `01.0` Cover | — | "My Shop → Change Backdrop → pick a backdrop → Apply Backdrop" |
| | `01.1` My Shop Click Change Backdrop | `3321:24530` | Primary screen (Soft Dots); the cursor is on the toolbar's Change Backdrop |
| | `01.2` Gallery Open, Current Backdrop Soft Dots | `3321:26753` | Gallery (option B) over My Shop; Soft Dots selected, preview on Soft Dots (a `Backdrop` instance), Apply disabled; cursor on Valentine's Day |
| | `01.3` Valentine's Day Previewed | `3321:31553` | Valentine's Day selected and previewed; Apply enabled (cursor) |
| | `01.4` Backdrop Applied | `3321:35020` | The banner's `Backdrop` switched to Valentine's Day; "Backdrop applied" toast with Undo |
| | `01.5` Seasonal Filter | `3321:37231` | Under 01.2: Seasonal pill, 4 seasonal tiles |
| | `01.6` Close with Unapplied Pick | `3321:42273` | Under 01.3: "Discard this backdrop?" ("…Valentine's Day… Your banner keeps Soft Dots.") |
| `02 - Add Featured Items` `3321:84338` | `02.0` Cover | — | "My Shop → Add Featured Item → pick a collection or product → Add to Banner" |
| | `02.1` My Shop Click Add Featured Item | `3321:84339` | Both slots empty; cursor on Slot 1's Add Featured Item |
| | `02.2` Pick a Collection | `3321:86544` | Picker, Collections tab, "My morning routine"; cursor on Add to Banner |
| | `02.3` Collection Added to Slot 1 | `3321:88857` | Slot 1 = Collection; "Added to your banner" toast with Undo |
| | `02.4` Slot 2 Pick a Product | `3321:91084` | Products tab (no creator line); cursor on Add to Banner |
| | `02.5` Both Slots Featured | `3321:93406` | Collection + Product; no Add button; toast |
| | `02` Sub-flow Remove Cover | — | "My Shop → featured item → Remove → Undo" |
| | `02.6` Click Remove | `3321:95646` | Cursor on the product slot's bin |
| | `02.7` Removed with Undo | `3321:97882` | Slot 2 empty again; "Removed from banner" toast with Undo |

## Where

- **File:** the Work File `FdmVPJo1j4t8s9gej1H7Yb`.
- **Page:** `Personlisation` `3223:139063`. The old flows page `2650:50683` was no longer in the file on 2026-10-16, and the user chose this page.
- **Top-level section:** `[Influencer] Shop Personalization (MVP) | 16.10.26` `3225:139064` (the page's former empty `Section 1`).
- **Built from:** Work File screens (`[Influencer] Shop Experience` › 09 Shop Preview: My Shop `1619:36894`, storefront preview `1619:36970`). The banner was rebuilt from the main file's WIP design `2383:87228`, since nodes can't be copied between files.

## Page state (2026-10-19)

- **Marked for review:** the section names carry "— Lead Review", the file's convention (as on the Post-MVP section). The main section was renamed `[Influencer] Shop Personalization (MVP) — Lead Review | 16.10.26`, but someone then ungrouped it, so sections 02–07 now sit directly on the page (stacked 200px apart at x -359). Flow 01 is three page-level sections, one per option (A `3248:18221`, B `3248:18220`, C `3248:18219`). Its "Nudge gone" row was deleted in the file.
- **Renamed to the guidelines:** 16 section, cover and frame names (`organize-flow`: frames `NN.S Flow — State — Device`, option covers `NN Flow — Sub-flow — <option> — Cover`) and 1,773 inner layers to Sentence case (`figma-refine`; generic names such as `Frame 46` became `Image`, `Vector` became `Icon path`/`Shape`; library instance names kept).

## Banner content component, URMEI logo, handle by the name (user, 2026-10-19)

- **URMEI logo restored:** the main file's design shows the URMEI mark before the follower count. All 31 banners on the page now have it (`Row / Followers`: logo 26×14 + "445 Followers").
- **Responsive component:** the user made the banner content a component; it's now the set **Banner content** `3295:16532` with Desktop (resizable, min 900) and Mobile (343, stacked) variants. Details are in `workflows/_shared/workfile.md`.
- **Handle by the name:** user asked "should the user name move along with the name, as the before design?" Yes. In both variants "Charlotte @charlotte" now sits in a **Name row**, and the stats row is **Socials** (URMEI followers, TikTok, Instagram).
- **Gallery previews use the component:** in 12.2 the user swapped in a Banner content instance. Both 12.1 and 12.2 now wrap that instance in a **Banner preview** frame: auto layout, hairline border, `border/radius/lg`, with the picked backdrop (Soft Dots) as an absolute layer behind it. My hand-built 12.1 preview was replaced.

## Two featured slots (user, 2026-10-19)

"Make 2 slots for adding 2 things." In the banner `3287:18332` (Banner content in a 2-column grid: Identity + `Featured slots`), the two duplicated empty slots became **Featured slot 1 / empty** and **Featured slot 2 / empty**. Each reads "Add a collection or product" and "Slot n of 2. Only you see this box.", with an **Add Featured Item** button (`plus`) instead of Edit Banner. Both fill the column at equal height, with their content centred. The single-slot empty state in flows 02–07 and 11 hasn't been changed to two slots yet.

## Default backdrop is Plain #FFFFFF (user, 2026-10-19)

Every banner shown in its default state is now plain white: 29 banners on the page had the Ripple Lines layer hidden and a #FFFFFF fill. In the Backdrop picker (all three variants), **Plain** is first, tagged "Default" and selected; Ripple Lines has no tag. Frames that show a picked backdrop (03.2–03.4 and the gallery previews, all Soft Dots) are unchanged. Wherever these notes say "Ripple Lines (selected, Default)", read Plain.

## Annotations are built in (user, 2026-10-19)

All 43 `Annotation` component cards on the Personlisation page were converted into Figma's **built-in annotations** (category **Info**). Each is attached to the layer it describes (the toast, dialog, picker, card or button) and the cards were deleted. The "Annotations" lists below give the old card ids; the text is unchanged. To see them, open Dev Mode or turn on annotations (Shift+Y).

## Scalable backdrop picker (user, 2026-10-19)

"In future there can be 10+ themes, so these designs should be scalable to that." Every hand-built 5-tile picker was replaced by the **Backdrop picker** component (Dev Handoff › 17 Backdrop Picker, `3279:1793`; details in `workflows/_shared/workfile.md`), with 12 presets:
- **Strip** (on the banner in edit mode): 02.6 and every edit-mode frame in 03–07, plus 11.2. It has All / Classic (8) / Seasonal (4) filters, a row that scrolls sideways with arrows (5 visible plus a peek), and notes as tags on the thumbnail (Default, Seasonal, New). In 03.2 and 03.4 the Soft Dots tile is selected.
- **Grid** (2 rows + Show All 12 Backdrops; an expanded variant has Show Fewer): 11.3 Banner tab, 11.7 popover, 11.8 drawer.
- Not changed: the superseded `02.2` panel and options `02.5` / `02.7`.
- The 03.1 annotation now explains the scaling. Seven presets (Checks, Stripes, Blush, Sand, Lunar New Year, Christmas, New Year) are placeholders until the launch list is chosen.

## Flows

Order proposed on 2026-10-16. The user asked for 02 first.

| # | Flow | Sub-section | Status |
|---|---|---|---|
| 01 | My Shop: stats row removed and the collections nudge | `3250:17341` | Desktop: 3 options built 2026-10-19, pick one |
| 02 | Open the banner editor | `3230:53715` | Desktop approved 2026-10-19. Editor: **option B (edit on the banner) chosen** 2026-10-19; full flow to build |
| 03 | Change the backdrop | `3265:2293` | Desktop (option B) built 2026-10-19. **Approved 2026-10-19** (user: "for change backdrop this is ok"), with the scalable Backdrop picker strip |
| 04 | Feature a collection | `3266:3265` | Desktop (option B) built 2026-10-19, in review |
| 05 | Feature a product | `3266:6146` | Desktop (option B) built 2026-10-19, in review |
| 06 | Two featured items | `3266:8217` | Desktop (option B) built 2026-10-19, in review |
| 07 | Remove a featured item | `3266:9972` | Desktop (option B) built 2026-10-19, in review. Replace = remove + add, not drawn separately |
| 08 | Storefront tabs: Picks and Posts | — | Not started |
| 09 | Featured item no longer available | — | Not started |
| 10 | Follower notification | — | On hold (follow feature to confirm) |
| **01 (new)** | **Change Backdrop** (My Shop + gallery) | `3302:17696` | Desktop built 2026-10-19, in lead review. Was section 13; renumbered **01** (user: "this should be flow one") |
| **02 (new)** | **Add Featured Item** (My Shop) | `3307:20249` | Desktop built 2026-10-19, in lead review (user: "start doing the Add Featured Item flow too") |
| 12 | Change Backdrop gallery (options) | `3288:15466` | 2 options built 2026-10-19. The user likes **B, centred modal** ("looks great") |
| 11 | Edit Banner from My Shop (ideas) | `3270:5623` | 7 ideas built 2026-10-19, in lead review; pick one or more |

### 02 - Add Featured Item (desktop, 2026-10-19)

Section `02 - Add Featured Item — Lead Review`, placed under flow 01. It uses the same My Shop base as 01.1 (Shop card with a **Banner content** instance, Show Change Backdrop on). Each slot is a **Featured slot** instance, switched per frame (`State`). Picks apply straight away on My Shop, with Undo toasts (the same model as Apply Backdrop). The dialogs are the `Add featured item` picker from the earlier flows 04/05, with the portal's radio buttons. The notes are built-in Info annotations.

| Frame | Id | What it shows |
|---|---|---|
| `02.0` Cover | `3307:24026` | "My Shop → Add Featured Item → pick a collection or product → Add to Banner" |
| `02.1` My Shop Click Add Featured Item | `3307:20250` | Both slots empty; the cursor is on Slot 1's **Add Featured Item** |
| `02.2` Pick a Collection | `3307:20647` | The picker over My Shop: Collections tab, "My morning routine" selected, cursor on **Add to Banner** |
| `02.3` Collection Added to Slot 1 | `3307:21229` | Slot 1 = Collection card; Slot 2 still empty; "Added to your banner" toast with Undo |
| `02.4` Slot 2 Pick a Product | `3307:21642` | Products tab, the first product selected, cursor on Add to Banner. The "Why you love it" field was removed on 2026-10-19 (Q5 changed) |
| ~~`02.5` Line Missing Error~~ | ~~`3307:22214`~~ | **Deleted 2026-10-19:** the creator line is out of the MVP (Q5 changed) |
| `02.6` Both Slots Featured | `3307:22786` | Collection + Product cards, no Add button, "Added to your banner" toast |
| `02` Sub-flow Remove Cover | `3307:24035` | "My Shop → featured item → Remove → Undo" |
| `02.7` Click Remove | `3307:23208` | Both featured; the cursor is on the product card's bin |
| `02.8` Removed with Undo | `3307:23619` | Slot 2 empty again; "Removed from banner" toast with Undo |

**New component, `Shop details`** `3309:22050` (user: "build component its own"): the My Shop card's top row with the four StoreCard states. It's swapped into all 14 frames of flows 01–02 (Published). It sits outside Banner content because that component also renders on the storefront.

**New component, `Featured slot`** `3306:20522` (next to Banner content): `State=Empty` `3306:20485` (the creator-only "Add a collection or product" box, `Slot label` text prop), `State=Collection` `3306:20497`, `State=Product` `3306:20507` (the featured cards from flows 04/05; the product name truncates to one line). `Show remove` boolean controls the bin. 400 wide in the set; inside Banner content both slots fill the column.

### Backdrops section and the slot-count property (user, 2026-10-19)

- **Backdrops:** "take this as canvas, add all the backdrops into it and add to a section of backdrops". The user's empty 1200 × 518 frame became `Backdrop / Plain`, and the other 11 presets were drawn at the same size. All 12 are components in section `Backdrops` `3311:21873`. The user then combined them into the set `Backdrop` `3287:28680`, and on request every variant was widened to **1440 × 518** with its pattern redrawn at that width (ids in `workflows/_shared/workfile.md`).
- **Slot count:** "add property to show 1, 2 featured product". `Banner content/Desktop` has a **Show second slot** boolean (on = 2 slots, off = 1 slot filling the column).
- **Featured slot content:** the empty-slot copy is updated, the creator line removed, and text properties added (see `workfile.md`).

### Renumbering (user, 2026-10-19)

The My Shop direction is now the main journey: **01 Change Backdrop** (this section, formerly 13), then **02 Add Featured Item**. The older flow list above (01 nudge, 02–07 in the preview's edit mode) is kept for reference. The nudge options are now grouped in the user's `Nudge` section.

### 01 - Change Backdrop: full flow (desktop, 2026-10-19; formerly 13)

Frames renamed `01.0`–`01.6` (`01.n Change Backdrop — <state> — Desktop`); the section is `01 - Change Backdrop — Lead Review`. The live banner in every frame is now a **Banner content** instance (Desktop, **Show Change Backdrop** on) over its backdrop layer (Plain; Soft Dots in 01.4). The loose Change Backdrop chip was removed: the button now lives in the component's **Toolbar** row.

(Old section-13 notes:)

The user asked for "the full flow for this" (gallery option B), starting from idea 1 (`11.1`, the merged Shop card with the live banner). Page-level section `13 - Change Backdrop with the Gallery — Lead Review`. Every frame is built on the user's copy of 11.1; the gallery frames are 1440 × 900 with the option B dialog over it. The notes are built-in Info annotations.

| Frame | Id | What it shows |
|---|---|---|
| `13.0` Cover | `3302:21716` | "My Shop → Change Backdrop → pick a backdrop → Apply Backdrop" |
| `13.1` My Shop Click Change Backdrop | `3287:22364` | The Shop card with the live banner (Plain). The cursor is on the banner's **Change Backdrop** |
| `13.2` Gallery Open, Current Backdrop Plain | `3303:20630` | The gallery opens with **Plain** (Default) selected, the preview plain, and **Apply Backdrop disabled**. The cursor is on Soft Dots |
| `13.3` Soft Dots Previewed | `3303:21158` | Soft Dots selected, the preview on Soft Dots, Apply enabled (cursor) |
| `13.4` Backdrop Applied | `3303:20214` | Back on My Shop: the live banner on Soft Dots, and a "Backdrop applied" toast with **Undo** |
| `13.5` Seasonal Filter | `3303:21681` | Under 13.2: **Seasonal** pill active, only the 4 seasonal tiles shown, count "4 seasonal" (cursor on the pill) |
| `13.6` Close with Unapplied Pick | `3303:22447` | Under 13.3: "Discard this backdrop?" ("You picked Soft Dots but haven't applied it. Your banner keeps Plain.") with Keep Choosing / **Discard** (cursor) |

**Open point (annotated on 13.4):** does an applied backdrop reach shoppers straight away, or with the next Publish?

### 12 - Change Backdrop gallery: 2 options (desktop, 2026-10-19)

The user asked for a theme gallery, like Windows' "Select a theme to apply" (reference screenshot: a large device preview on the left, a grid of big theme tiles on the right), as a full-page modal or a modal. Page-level section `12 - Change Backdrop Gallery (Options) — Lead Review`. Both options reuse the **Backdrop tile** component (scaled up) and the real banner as the preview, shown with Soft Dots. The cursor is on **Apply Backdrop**, and the notes are built-in Info annotations.

| Option | Frame | Id | What it shows |
|---|---|---|---|
| A Full-page modal | `12.1` | `3288:15467` | 1440 × 900 takeover: header "Choose a backdrop" + close; **Preview** (the banner in a dark device bezel, 640 wide, "Nothing changes until you apply it."); "Select a backdrop to apply · 12 presets", category pills, and a 3-column scrolling grid of tiles at 1.3×; footer Cancel / **Apply Backdrop** |
| B Centred modal | `12.2` | `3288:16243` | My Shop behind a 50% scrim; a 1120 × 759 dialog with the same parts (preview 560 wide, tiles at 1.15×, 3 rows visible with a scroll fade) |

**Preview built with auto layout (user, 2026-10-19):** the preview is no longer a scaled copy of the banner. `Banner preview` is a horizontal auto-layout frame (`spacing/lg` padding, `spacing/md` gap, white, hairline border, `border/radius/lg`). It holds an absolute **Backdrop / soft dots** layer (stretch constraints, clipped), then a **Profile card** (avatar 40, name `Body/body-md-medium`, bio and stats `Body/body-xs-regular`, Follow + Copy Shop Link) and a **Featured slot / empty** (dashed, "Feature a collection or product", Add Featured Item). Both cards fill the width and the frame hugs their height.

**Feedback (user, 2026-10-19):** B "looks great", but the preview's dark device bezel "looks off". In both options the preview is now just the banner with a 1px `border/color/default` hairline and `border/radius/lg` corners (`Banner preview`, 560 wide in B, 640 in A), rebuilt from a fresh banner copy.

**Open point:** confirm B, and decide whether the gallery replaces the on-banner strip for Change Backdrop or is opened from it ("See all").

### 11 - Edit Banner from My Shop: 7 ideas (desktop, 2026-10-19)

The user asked for ideas for editing the backdrop and featured items from My Shop instead of the preview, then said "build every idea". This is a page-level section, `11 - Edit Banner from My Shop (Ideas) — Lead Review` (x -359, y 26964). It has one row per idea, each with a sub-flow cover (`11 Edit Banner from My Shop — Idea — <n Name> — Cover`). All frames are clones of `02.1` (My Shop). Every frame has a cursor on the action and one Info annotation.

| Idea | Frames | Ids | What it shows |
|---|---|---|---|
| 1 Live banner on My Shop | `11.1`, `11.2` | `3270:5624`, `3270:5991` | One **Shop card** (`3274:6820` / `3274:6900`): the real storefront banner (scaled to 1200) with **Change Backdrop** on it and the featured slot's Add Featured Item, with a **Shop details** row (shop URL · Last Published · Preview Storefront · View Shop). The row was moved **above** the banner on 2026-10-19 (user), so the main shop actions come first, as on today's My Shop. 11.2 opens the backdrop picker under the button. **Merged 2026-10-19 (user):** the banner and the old store card both showed the photo and name, so the store card is hidden and its URL, date and buttons moved under the banner. The banner's **Follow** and **Copy Shop Link** row is hidden here (user: a creator can't follow their own shop; "links are placed in 2 places"). The banner's own **Copy Shop Link** is hidden here too (user: "links are placed in 2 places"), so the shop link shows once, in the Shop details row. That row also carries the unpublished state ("Publish shop to get your URL"). The creator copies the link with the **copy** icon in the bordered Shop URL field (`3276:6830` / `3276:6911`). The first merge had dropped that field's box and icon by mistake; it was restored the same day |
| 2 Banner tab | `11.3` | `3270:6519` | A third My Shop tab, **Banner**: "Your banner", a live preview, then the Backdrop and Featured Items settings side by side, with Cancel / Save Changes |
| 3 Card menu | `11.4`, `11.5` | `3270:7079`, `3270:7377` | The product card's more menu with **Feature on Banner** (Add to Collection, Copy Affiliate Link, Remove from Shop). 11.5: an "On banner" tag on the card and a "Featured on your banner" toast with Undo |
| 4 Banner strip in the shop card | `11.6`, `11.7` | `3271:6252`, `3271:6568` | A row under the shop card: "Banner · Backdrop: [swatch] Ripple Lines Change · Featured: My morning routine · 1 of 2 Change". 11.7: the Pick a backdrop popover |
| 5 Side drawer | `11.8` | `3271:7046` | Edit Banner opens a 440px drawer over My Shop (30% scrim): a Preview of the banner, then Backdrop, Featured Items, Cancel / Save Changes |
| 6 Toast after adding | `11.9` | `3271:7586` | An "Added to your shop" toast with a **Feature on Banner** action, also for a new collection |
| 7 Setup checklist | `11.10` | `3271:7891` | A "Make your shop yours" card: 1 of 3 done, a progress bar, and three steps (backdrop done; feature a collection and feature a product, each with Choose), plus a close button |

**Recommended:** 3 + 4 together (feature from the item's menu, backdrop and featured settings in the shop card strip), with 6 as a cheap extra. 1 is the strongest single option if the space is acceptable.

**Open points:** these ideas assume edits apply from My Shop without the preview's edit mode. Pick which ones replace or add to flows 03–07. Ideas 3 and 6 still need a home for the backdrop, so each needs to be paired with 1, 2, 4 or 5.

### 03–07 - The option B editing flows (desktop, 2026-10-19)

All frames are clones of `02.6` (1440 × 900): the Edit banner bar (Cancel, Save Changes), the dashed banner outline, the faded page and the backdrop picker on the banner's edge. Save Changes is disabled until something changes. The cursor is on the action in each frame, and each frame has one Info annotation.

| Frame | Id | What it shows |
|---|---|---|
| `03.0` Cover | `3265:6210` | "Edit Banner → pick a backdrop → Save Changes" |
| `03.1` Edit Mode Click Soft Dots | `3265:2294` | Edit mode, cursor on Soft Dots |
| `03.2` Soft Dots Previewed | `3265:2832` | The banner shows the dot backdrop live, the tile is selected, Save Changes is on (cursor) |
| `03.3` Saved | `3265:3670` | Edit mode closed, the dot backdrop kept, "Banner saved" toast |
| `03.4` Cancel Unsaved Changes | `3265:4523` | Under 03.2: "Discard banner changes?" with Keep Editing / Discard (cursor) |
| `03.5` Discarded Banner Unchanged | `3265:5378` | Under 03.4: the preview with the old Ripple Lines backdrop |
| `04.0` Cover | `3266:6137` | "Edit Banner → Add Featured Item → pick a collection → Save Changes" |
| `04.1` Edit Mode Click Add Featured Item | `3266:3266` | Cursor on the slot's Add Featured Item |
| `04.2` Pick a Collection | `3266:3804` | **Add featured item** dialog (560px): Collections / Products pill tabs, the creator's 3 collections as radio rows ("My morning routine" selected), Cancel / **Add to Banner** (cursor) |
| `04.3` Collection Featured | `3266:4405` | The banner shows a **Featured collection card** (3-image cover, name, count, View Collection, a bin to remove it) and "Add Featured Item · 1 of 2 featured". Save on (cursor) |
| `04.4` Saved | `3266:5272` | Out of edit mode, the collection card on the banner, "Banner saved" toast |
| `05.0` Cover | `3266:8208` | "Edit Banner → Add Featured Item → Products → pick one and write a line → Add to Banner" |
| `05.1` Pick a Product and Write a Line | `3266:6147` | Products tab, the first product selected, **Why you love it\*** filled in (47/80), cursor on Add to Banner |
| `05.2` Line Missing Error | `3266:6746` | Under 05.1: empty line, red border, "Add a line about this product." (0/80) |
| `05.3` Product Featured | `3266:7345` | **Featured product card** (image, brand, name, the line in quotes, Shop Now, bin). Save on (cursor) |
| `06.0` Cover | `3266:9963` | "Edit Banner → a second featured item → limit of 2 → Save Changes" |
| `06.1` Collection and Product at the Limit | `3266:8218` | Both cards and "2 of 2 featured. Remove one to add another." instead of the add button. Save on (cursor) |
| `06.2` Saved | `3266:9092` | Both items on the banner, "Banner saved" toast |
| `07.0` Cover | `3266:11716` | "Edit Banner → remove a featured item → Undo or Save Changes" |
| `07.1` Click Remove | `3266:9973` | Two items, cursor on the product card's bin |
| `07.2` Removed with Undo | `3266:10840` | Collection only, Add Featured Item is back (1 of 2), "Removed from banner" toast with **Undo**, Save on |

**Open points for review:**
- **When a saved banner reaches shoppers:** straight away, or with the next Publish like other shop edits. The designs show only "Banner saved".
- **Error colour:** the red (#D92D20) is a raw colour. The URMEI library has no error token yet.
- **Radios:** they use the `circle` / `circle-dot` icons, because the library has no radio component.
- **Mobile:** these flows have no mobile frames yet. Mobile comes after desktop approval.

### 01 - My Shop collections nudge (desktop, 3 options, 2026-10-19)

The user asked for three different options for this flow. Each option has its own row and cover. A fourth row shows My Shop once the nudge is gone. The sub-section sits above 02, which was moved down. Every frame is a clone of `02.1`, so it keeps the hidden stats row (Q9) and the Edit Banner button. The second tab now reads **Collections (1)**, the default Favourites collection from Collections Q4, instead of "Favourites (0)".

| Row | Frame | Id | What it shows |
|---|---|---|---|
| A | `01.0` Option A Cover | `3251:18435` | "My Shop → Option A: page banner → Create Collection or close" |
| A | `01.1` Option A Page Banner | `3250:17342` | A full-width **Notification Banner** (Desktop) under the header, with the `layout-grid` icon: "New: group your picks into collections, so shoppers can browse them like shelves in a shop." The action is **Create Collection**, with a close button on the right (`Ghost icon` button in a `Collections nudge banner` wrapper, since the component has no close). The cursor is on Create Collection |
| A | `01.2` Option A Dismiss | `3250:17623` | Same, cursor on the close button |
| B | `01.0` Option B Cover | `3251:18444` | "My Shop → Option B: promo card → Create Collection, Maybe Later or close" |
| B | `01.3` Option B Promo Card | `3250:17904` | A 1200px tinted card between the shop card and the tabs: a sample **Collection Card** ("My morning routine", 3 products), "Hey Charlotte, add your first collection", a body line, **Create Collection** (primary) and **Maybe Later** (ghost), plus a close button. The cursor is on Create Collection |
| B | `01.4` Option B Dismiss | `3250:18185` | Same, cursor on the close button |
| C | `01.0` Option C Cover | `3251:18453` | "My Shop → Option C: Collections tab coach mark → Create Collection or Not Now" |
| C | `01.5` Option C Coach Mark | `3250:18466` | A 340px popover anchored under the **Collections** tab, with a beak: icon well, "New: Collections", close button, body line, **Not Now** (ghost sm) and **Create Collection** (primary sm). The cursor is on Create Collection |
| C | `01.6` Option C Dismiss | `3250:18747` | Same, cursor on Not Now |
| End | `01.0` Nudge Gone Cover | `3251:18462` | "Nudge dismissed, or first collection made → My Shop without the nudge" |
| End | `01.7` Nudge Gone | `3250:19028` | My Shop without the nudge, the same for every option |

**How they differ:**
- **A, page banner:** the most visible, and it reuses the setup banner pattern. It's also the easiest to dismiss without reading, and it competes with the setup banner (bank details) when both apply.
- **B, promo card:** the most persuasive, since the sample board shows what a collection looks like. It takes the most space (226px) and pushes the picks down.
- **C, coach mark:** the lightest, and it points at where collections live. It covers part of the page, so it suits a one-time hint more than a reminder that stays.

**Annotations (Info):**
- `3251:18471` on 01.1 Create Collection: it opens the Collections tab with the Create collection dialog open.
- `3251:18477` on 01.1 shop card: My Shop no longer shows the stats row; Home keeps it.
- `3251:18483` on 01.2 close: closing hides the banner for good.
- `3251:18489` on 01.3 sample board (radios and the 04.2/05.x pickers now use the portal's **radio button** component, label hidden, 2026-10-19): it's an example, not one of the creator's collections.
- `3251:18495` on 01.4 close: Maybe Later and close both hide the card for good.
- `3251:18501` on 01.5 coach mark: it points at the Collections tab.
- `3251:18507` on 01.6 Not Now: Not Now and close both hide the coach mark for good.
- `3251:18513` on 01.7 Collections tab: the nudge shows until the creator makes a collection of their own; the default Favourites doesn't count.

**Open points for review:**
- Pick one option (A, B or C).
- **Proposed rule, to confirm:** every shop starts with a "Favourites" collection (Collections Q4), so "until the first collection" is read as the first collection the creator makes.
- A dismissed nudge never comes back. Another choice would be to bring it back after a set time.
- Create Collection's destination (the Collections tab with the Create collection dialog) is described in an annotation, not drawn, because the Create dialog lives in the main file's Collections copy.

### 02 - Open the banner editor (desktop, approved 2026-10-19)

**Two entry points (user, 2026-10-16):** the My Shop card now has a permanent **Edit Banner** button (outlined, `edit-3` icon) beside Preview Storefront, so creators can see that the banner is editable without opening the preview. It opens the preview with the panel already open. The preview's empty slot is the second way in. Each entry has its own row and cover.

| Row | Frame | Id | What it shows |
|---|---|---|---|
| 1 | `02.0` Cover | `3230:53716` | "My Shop → Edit Banner" (remote `Cover` component) |
| 1 | `02.1` My Shop Click Edit Banner | `3235:17173` | My Shop with the stats block hidden (Q9) and the new **Edit Banner** button. The cursor is on it. The card is detached (`Shop info card`) so the button could be added |
| 1 | `02.2` Edit Banner Panel | `3233:16959` | 1440 × 900. A 440px right panel over the preview: Header (Edit Banner, close ✕) · **Backdrop** (5 presets: Ripple Lines (selected, Default), Soft Dots, Grid, Plain, Valentine's Day (Seasonal)) · **Featured Items** (0/2, "Nothing featured yet", Add Featured Item) · Footer (Cancel, **Save Changes** disabled) |
| 2 | `02` Sub-flow From Preview Cover | `3235:17704` | "My Shop → Preview Storefront → Edit Banner" |
| 2 | `02.3` My Shop Click Preview Storefront | `3230:53725` | Same card with Edit Banner. The cursor is on **Preview Storefront** |
| 2 | `02.4` Preview Empty Banner Slot | `3230:53801` | The new **Banner** (1440 × 485): the Ripple Lines backdrop, the identity card, and a dashed **featured slot** ("Feature a collection or product", **Edit Banner**). The cursor is on the slot's button, which opens `02.2` |

**Editor options (user, 2026-10-19):** after approving 02, the user asked for three options for the Edit Banner editor itself. They are rows 3–5 of the sub-section, under the approved rows, each with its own cover. All three start from a clone of `02.2`, and the cursor is on the **Soft Dots** backdrop. `02.2`'s overlay panel stays as the current design.

| Row | Frame | Id | What it shows |
|---|---|---|---|
| 3 | `02.0` Option A Cover | `3258:2234` | "My Shop → Edit Banner → Option A: docked panel, the preview zooms to fit" |
| 3 | `02.5` Option A Docked Panel | `3257:1613` | The same 440px panel, but the preview is scaled to 1000px beside it instead of under it, so the whole banner, featured slot included, stays visible. The header's close button is hidden behind the panel |
| 4 | `02.0` Option B Cover | `3258:2243` | "My Shop → Edit Banner → Option B: edit right on the banner" |
| 4 | `02.6` Option B Edit on the Banner | `3257:2273` | No panel. An **Edit banner bar** under the header ("Editing your banner", Cancel, Save Changes disabled). The banner gets a dashed outline, the page below fades (70% white), the featured slot's button reads **Add Featured Item** (`plus`), and a floating **Backdrop picker** with the 5 presets sits on the banner's bottom edge |
| 5 | `02.0` Option C Cover | `3258:2252` | "My Shop → Edit Banner → Option C: dialog with a live preview" |
| 5 | `02.7` Option C Dialog with Preview | `3257:3104` | A 1104 × 726 centred dialog over a 50% scrim: the panel's header, a **Preview** column (the banner scaled to 640 × 216, "This is how your banner looks to shoppers once you save.") beside the Backdrop and Featured Items sections, and the panel's Cancel / Save Changes footer |

**How they differ:**
- **Current (`02.2`), overlay panel:** familiar, but it covers the featured slot, which is the thing being edited.
- **A, docked panel:** fixes that with the least change. The preview gets small, about 70%.
- **B, on the banner:** the most direct, since every change shows full size where it lands. It needs an edit mode on the page, and featured-item picking still needs its own dialog.
- **C, dialog:** keeps the page untouched until Save, and everything is in one place. The preview is the smallest of the three.

**Annotations (Info):** `3258:2261`, `3258:2267` (A: the preview fits; changes apply live but save only on Save Changes), `3258:2273`, `3258:2279` (B: edit mode; the picker sits on the banner), `3258:2285`, `3258:2291` (C: a scaled preview beside the settings; the page behind stays unchanged until saved).

**Decision (user, 2026-10-19): option B, edit on the banner.** "Option B works well, so need the full flow for that." The overlay panel (`02.2`) and options A and C are superseded but kept in the file for reference. This also settles the earlier open point about the panel covering the featured slot.

**Old → new frame names (2026-10-16):**

| Old | New |
|---|---|
| `02.1` My Shop Click Preview Storefront | `02.3` |
| `02.2` Preview Empty Banner Slot | `02.4` |
| `02.3` Edit Banner Panel | `02.2` |
| (new) | `02.1` My Shop Click Edit Banner, and the second cover |

**Annotations (Info):**
- `3235:17713` on the 02.1 Edit Banner button: it's always in the shop card and opens the preview with the panel open.
- `3233:17644` on the 02.4 slot: only the creator sees it; with nothing featured, shoppers see the profile card only.
- `3233:17652` on the 02.2 Valentine's tile: the presets are URMEI's, with no uploads; seasonal ones apply only if picked.
- `3233:17659` on 02.2 Save: Save stays disabled until something changes, and the preview updates live.

**Refine:** I ran Workflow 2 on 02.4 and 02.2 (numbered 02.2 and 02.3 at the time). 17 of the layers I created or changed were renamed to Sentence case, including `Frame 2007737009` → `Banner and favorite picks`, `-` → `Page content`, and the panel's parts (`Edit banner panel`, `Section / backdrop`, `Backdrop option / …`, `Save changes button`). There was no visual change. In 02.1 and 02.3 the detached card was named `Shop info card` and the new button `Edit banner button`. Nothing else was renamed in those two.

**Open points for review:**
- The panel covers the right half of the banner, including the featured slot. If the live preview has to show the slot while the panel is open, the panel could push the page left instead of overlaying it.
- The other backdrop presets (Soft Dots, Grid, Plain) are placeholders until the launch presets are chosen.
- The backdrop thumbnails and the ripple pattern are SVG vectors drawn for this flow. They aren't components yet.
