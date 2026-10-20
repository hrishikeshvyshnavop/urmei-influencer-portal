# Shop personalization (MVP): Figma flows

Tracked as `T-38`. The scope and answers are in `REQUIREMENT.md` (MVP section) and `ANSWERS.md`. The post-MVP vision flows (`T-33`) are recorded in `REQUIREMENT.md`, not here.

## New page: Backdrop & Featured Items (user, 2026-10-19)

> **Current home of the backdrop and featured-items flows.** User: "build all flow in a separate section in new page". Page **Personalisation — Backdrop & Featured Items** `3350:84583`. Section `[Influencer] Shop Personalization (MVP) — Backdrop & Featured Items` `3350:84584`. Flows 01–02 are copies of the Primary Flows on the Personlisation page (that page keeps the originals). Frames sit 200px apart, sub-sections 200px apart (user: "fix the spacing frame to frame"). Cover titles are short plain sentences (user: "make all cover text more simplified").

| Sub-section | Frames | What it shows |
|---|---|---|
| `01 - Change Backdrop` `3350:84585` | 01.0 Cover ("Pick a new backdrop for your banner"), 01.1–01.6 | Same as the approved flow 01 |
| `02 - Add Featured Items` `3350:84974` | 02.0 Cover ("Feature up to 2 collections or products"), 02.1–02.4; Edit cover ("Change your featured items"), 02.5–02.7 | Same as flow 02 |
| `03 - Search in the Picker` `3352:31506` | 03.0 Cover ("Search for an item to feature"), 03.1 Search Matches `3352:31516`, 03.2 No Matches `3352:33877`, 03.3 Search Cleared `3352:36135` | Search "morning" → 1 collection; "retinol" → "No matches" empty state with **Clear Search**; cleared → full list, ticks kept |
| `04 - Nothing to Feature Yet` `3352:123374` | 04.0 Cover ("Nothing to feature yet"), 04.1 Empty Shop Click Add Featured Items `3352:123384`, 04.2 Picker Empty `3352:125529` | Empty shop (Shop details `No products`, tabs (0)); the picker says "Nothing to feature yet" with **Browse Catalogue**; Add to Banner disabled, search hidden |
| `05 - Featured Item No Longer Available` `3352:129668` | 05.0 Cover, 05.1 Marked on My Shop `3352:129678`, 05.2 Removed with Undo `3352:131832`, 05.3 Shopper View `3352:133953` | Creator sees the product marked "No longer available" (new `Featured slot` `State=Unavailable`) with the bin; Remove → "Removed from banner" + Undo; shoppers only see what's left |
| `06 - Shopper's View` `3352:323102` | 06.0 Cover ("What shoppers see on the banner"), 06.1 Two `3352:323112`, 06.2 One `3352:323383`, 06.3 None `3352:323700` | The public storefront (e-commerce header, from Latest `1616:66340`) with the `Storefront banner` in each state; nothing featured = profile card only |

**Decisions drawn here, to confirm:** an unavailable featured item is hidden from shoppers and marked for the creator (not auto-removed); the Featured box shows on an empty shop and its picker points to the catalogue; search covers collections and products together and keeps ticks.

**Comment fixes (2026-10-19, new page):**
- "fix the button" (Featured slot): the remove (bin) button sits on a white round background, 8px in from the image's top-right corner.
- "Can we follow this layout??" (main file `2383:87286`, Banner card): `Featured slot` Collection / Product / Unavailable rebuilt at 400 × 160. The text column has an eyebrow (FEATURED COLLECTION / FEATURED PRODUCT / NO LONGER AVAILABLE, SemiBold 10, 8% tracking), a SemiBold 18 title (2 lines max), the count or brand, and the button. The images run edge to edge on the right: the collection uses a 3-image grid with a "+N products" overlay (new text prop `More count`), and the product uses one image.
- "This is how e commerce side collection section will looks like" (`Section / Collections` `3351:191187`): copied into every shopper storefront frame (05.3, 06.1–06.3), between Favorite Picks and All Picks.
- "fix stacking" (Featured slot collection images): the media sits flush to the card edges (`strokesIncludedInLayout` off), the image gaps are 2px, and the +N overlay is centred. The eyebrows were removed in Figma by the user after the rebuild.
- "Should the product name in title case?": answered no. Keep the catalogue's sentence case, as on every product card; brand stays in caps. Nothing changed.
- "this section will be no longer but the gradient should be applied to the collection section" (06.1): Favorite Picks is removed from the shopper storefront frames (05.3, 06.1–06.3); its gradient (transparent to #F2EFED, top to bottom) is now the Collections section fill. Storefront order: banner → Collections → All Picks.
- "add icon" (03.2): Clear Search has the `x` icon on the left.
- "not visible here" (03.3 collection tiles): the tile checkboxes have a `border/color/default` stroke and a soft shadow, on all 15 collection pick tiles on the page.
- Each comment now gets an "On it" reply when work starts, then a "Fixed" reply (user: "add a message if work started").

**Self-review (2026-10-19, user: "review by yourself and add comments"):** 9 comments posted on the new page; all **fixed and closed** the same day (checked by screenshot):
- 02.3: product tile checkboxes are hard to see on light photos.
- 02.3: products repeat in the picker.
- 02.6: the unticked tile lost its checkbox.
- 03.1: the cursor floats in empty space.
- 03.1: the search field shrinks when filled, and its back arrow looks odd in a dialog.
- 05.1: the unavailable card needs an "Unavailable" tag.
- 05.2: 1 of 2 leaves an empty gap; suggests a "+ Add another" slot.
- 06.2: the single featured card should be centred.
- 02.4: the My Shop collection cards lack the "+N products" overlay that the storefront cards have.

**Self-review fixes (2026-10-19):**
- Featured pick tile checkboxes have a border and shadow.
- The two repeated products are replaced with Veil all-in-one peptide serum (SORAÉ) and Clarifying cream duo (COSNORI).
- In 03.1 and 03.2 the search field is full width with no back arrow, and the 03.1 cursor is on the field.
- `Featured slot` Unavailable has an "Unavailable" tag on the image.
- `Featured items` One has a creator-only "+ Add Another" dashed slot, bound to `Show header`.
- Banner content's Featured area centres its content vertically.
- All 64 My Shop `Collection Card` instances show "+N products".
- Neethu's "need to fix the text description" (01.1): the Featured items empty body now reads "Show up to 2 collections or products on your banner. Only you see this box.", centred.

- "need more clarity here" (01.5): the gallery count reads "Showing 4 seasonal backdrops", and "12 backdrops" on All (was "4 seasonal" / "12 presets"). Closed.
- "remove" (Neethu, 01.2): the gallery count label is removed from 01.2, 01.3, 01.5 and 01.6 (this replaces the "Showing 4 seasonal backdrops" wording above); the filter pills carry the counts. Closed.
- Featured items empty body, final copy (user, in Neethu's thread): "You can select any two products or collections to feature. These will be displayed alongside the banner in your shop." This replaces the earlier wording. Closed.
- Profile card colour (Neethu: "define this color and follow same color on all pages"): user chose **A**. `Banner content` Identity is now bound to `surface/secondary/300` (#F8F8F8), the same token as the Home `Creator profile card section` and the e-commerce `Influencer Profile Card`. Closed.
- Picker checkboxes (Neethu: "checkbox is not clear here", user: "Still the shadow looks off"): no shadow. Unticked = white with a 1.5px `border/color/dark` border. Ticked = `surface/secondary/1000` fill, white tick, 1.5px white outer stroke. Applied to the `Featured pick tile` set and the collection pick tiles. Closed.

- "do we need a clear search here?" (Neethu, 03.2): no. The Clear Search button is removed (`Show button` off); the search field's x clears the search, and the cursor is on it. This replaces the earlier "add icon" fix on that button. Closed.
- "this component should be same as the check box component we are using" (Neethu): fact check showed the tiles already used the library `_checkbox` (the same one inside `checkbox-with-label`), but restyled. The overrides are reset to stock, and each checkbox sits on a 24px white `Checkbox chip` (6px radius) so it reads on photos. This replaces the custom checkbox styling above. Closed.
- "empty state style is different from the design language" (Neethu, ref main file `1862:87349`): `Picker empty state` now matches the reference. It has a 64px circle icon well (`surface/tertiary/500`, 28px icon), a `Body/body-xl-medium` title and a `Body/body-xs-regular` body. Gaps are 14 (icon to text), 4 (title to body) and 18 (to the button). The button is outlined inside the dialog. On the My Shop page (04.1) it sits in a dashed box (2px, 8/6 dash, 10 radius, 471 tall) with a primary button. Closed.
- "fill the card" ×2 (Neethu, 06.1, top and bottom of the featured area): in `Banner content` the Featured area fills the row height. `Featured items` and its slots fill too, so 1 card takes the full profile-card height and 2 cards split it. Closed.
- "need to fix the IA and hierarchy" (Neethu, 06.1 profile card): the user approved the proposal ("Go with the proposal"). `Banner content` Identity now reads avatar → name (`Body/body-xxl-bold`, kept) over @handle → stats row (URMEI followers, TikTok, Instagram) → bio → Follow / Copy Shop Link. It applies to every banner. This replaces the side-by-side name + handle row from earlier on 2026-10-19. Closed.
- "make top and bottom 16px, update everywhere" (user, 02.2 dialog header): the dialog `Header` padding goes from 24/24 to 16/16 on all 11 dialogs on the page (7 Add featured items, 4 Choose a backdrop). The dialogs are 16px shorter, and the 9 cursors inside them moved up 16px. Closed.
- "match this style" (user, ref main file `1862:87536` "Delete this collection?"): every dialog `Header` title is `Body/body-xl-bold` (was body-lg-medium), with 16/24 padding, the bottom divider and the 40px outlined close. The 01.6 "Discard this backdrop?" dialog is rebuilt on the same pattern: 525 wide, header with close, message `Body/body-md-regular`, and Keep Choosing / Discard as two full-width buttons (12 gap). Closed.
- "check the CTA area too" (user): all 11 dialog `Footer`s have 16/24 padding and a 12px button gap (was 24/24, 8). The top divider stays because the lists scroll. The 3 cursors on footer buttons were re-centred. Closed.
- "updated everywhere?" (user, profile card IA): checked all 65 `Banner content` instances (34 on Personlisation, 31 on the new page). All use the new order; the 54 My Shop ones hide the actions as before.
- Comment prefix changed to the alien monster (user: "add alien emoji monster whatever commenting you are adding"). It is sent as 👾 plus U+FE0E; a plain 👾 is stored as ":space_invader:".
- "looks off" (user, 05.3 one featured item): the full-height fill turned a single card's images into thin strips. `Featured slot` gains a **Size** property: `Compact` (the existing horizontal cards) and `Tall` (images on top, filling, then text; added for Collection, Product and Unavailable). `Storefront banner` One uses Tall; the creator's `Featured items` One keeps Compact plus "+ Add Another". The bin is bound to `Show remove` on every variant and is off on all storefront cards (one had leaked). Closed.
- Aesthetics pass (user, chat, on "Frame 2" `3393:196022`): a polished copy, "Frame 2 — Polished" `3395:51313`, sits beside the original, which is untouched. Both cards are white with a `border/color/default` stroke, a soft shadow (0 4 16, 6%) and a 12 radius. The profile card is horizontal: a 120px avatar left, then name, @handle, stats and bio (480 wide), vertically centred, with 40 padding. Change Backdrop is a white button with a dark stroke and shadow. The banner padding is 20/36. Still a draft: not applied to the `Banner content` component.
- IA pass (user, chat: "Improve the IA", on "Frame 2" `3393:196022`): a copy, "Frame 2 — IA" `3399:51325`, cloned from the Polished draft, sits to its right. Both earlier frames are untouched. (1) **Page header:** "Last Published on …" moves under the My Shop title, in place of the "Your curated URMEI storefront." tagline, so the title row says what the page is and what state the shop is in, and Preview Storefront / View Shop stand alone on the right. (2) **Banner header** `3399:53368`, on white above the backdrop: "Shop banner" with "The first thing shoppers see. Choose a backdrop and up to 2 featured items.", and Change Backdrop moves here from the floating toolbar. It used to sit over the Featured box, so it read as a Featured control. Everything on the backdrop is now what shoppers see, plus the creator-only Featured box. (3) **Featured items:** the box title is "Featured items", matching the Add featured items picker. Each card names its type: "Collection · 6 products" and "Product · Mousse Douce" (this also fixes the "MOUSE DOUCE" typo). Still a draft: not applied to `Banner content`.
- "make this more minimal" (user, chat, on `Featured items` `3332:57991`): edited on the main component, so it reaches all 35 instances on the page. In One and Two the cards lose their stroke (the box's own border is enough), the shopper CTAs View Collection / Shop Now are hidden (this box is creator-only, and the storefront uses `Storefront banner`), and the card text aligns with the "Featured" header. Add Another becomes a plain text button with the plus icon in a slimmer dashed row. Empty is unchanged (its copy is final). The `Featured slot` set itself is untouched, so the storefront cards keep their buttons.
- "IA Fix" (user, chat, on `Identity` `3398:204211` in the scratch frame `Desktop - 1` › `Frame 8`): edited in place. The avatar (now 72) sits beside the name and @handle in a new `Profile header` row `3402:54330`, so who the creator is reads as one unit. Below it, `Stats and bio` (gap 12) holds the stats and then the bio. The order is unchanged: avatar → name → @handle → stats → bio. In the stats, the numbers are Medium in the name's dark colour, and the "Followers" label stays muted. Identity gets 32px side padding (`spacing/xxl`; it was 0) and keeps its `surface/secondary/300` fill, which keeps the text readable over the card's new gradient. Not applied to `Banner content`.
- "need to show 2 products here as featured" (user, chat, on `Desktop - 1` `3398:204210`): the user had restyled `Frame 8` into a single 1200-wide card (profile left, space-between). On its right, a new `Featured` column `3403:126364` (480 wide, gap 16) holds two `Featured slot` instances (`State=Product, Size=Compact`, `Show remove` off, as on the storefront): the Mousse Douce eye cream, and ANNA LOGOR's Hydra veil brightening essence (image and name from the page's Featured pick tiles). `Frame 8` gets 32 top and bottom padding with HUG height (now 400), so the cards don't touch its edges. Identity hugs its height with clipping off, because its fixed 192 height had clipped the bio's first glyph.
- "need an 5 iteration for this" (user, chat, on `Option 1` `3398:204210`, the user's renamed `Desktop - 1`): five layout options, stacked under Option 1, 120 apart. All use the same profile and the same two `Featured slot` products. Option 2 `3408:54407`: profile left (440), two **Tall** product cards side by side. Option 3 `3408:54508`: profile across the top (header, then stats and bio in a row), two Compact cards in a row below. Option 4 `3408:54579`: products lead (Tall cards on the left), profile right (380). Option 5 `3408:54678`: a full-height divider (`border/color/default`) between the profile and a "Featured picks" label over Compact cards. Option 6 `3408:54751`: a centred profile (avatar over the name), Compact cards in a row below. On the Tall variant, Brand and Product name aren't bound to the component properties, so they're set as text.
- "fix every options spacing" (user, chat): one system across Options 1–6. Each frame has 64 top and bottom padding and 120 at the sides. Each card (`Frame 8`) has 32 padding all round and hugs its content. Columns are 48 apart and centred; stacked rows are 32 apart. Inside the profile, the header is 20 above the stats, and the stats are 12 above the bio. The avatar is 16 from the name (12 when stacked), and the product cards are 16 apart (12 under the Option 5 label). Option 1's uneven 16/40 card padding is gone.
- **Chosen (user, 2026-10-20): Option 4 — Products lead, profile right** `3408:54579`. Two Tall featured product cards on the left, the profile (380 wide) on the right. Options 1–3, 5 and 6 stay on the canvas as explored alternatives. Not yet applied to `Banner content` or `Storefront banner`.
- "fix the spacing" (user, chat, on `Identity` `3404:206556`, inside the user's Option 4 placed in "Frame 2 — Polished" › Shop banner): Preview Storefront / View Shop and the status line (`Shop actions`) had been placed inside `Stats and bio`, 12 below the bio. They move out into their own group in Identity. Identity's groups (header, stats and bio, actions) are now 24 apart, and the status line is 8 under the buttons (was 10). The two Tall product cards now size to their content and share one height (376), so the photos match (217) and the brand and name start on the same line. Before, card 2's one-line name left its photo taller.
- "My Shop / Your curated URMEI storefront. this part looks off" (user, chat, on "Frame 2 — Polished" `3404:204542`): the title sat alone in a 100-tall white band over the #FAFAFA banner area. With its actions moved into the profile card, the band was empty, and it split the page into two strips. The title block (`Page title` `3404:204547`) moves into the banner area, 40 below the nav and 24 above the card, and the white `Page header` band is removed.
- "build our idea with this reference" (user, chat; Refero `bb531a57-1b94-4ba7-b96d-718040caf98b`, a Lovable profile page, shared as a screenshot because Refero needs a sign-in): a new frame, "My Shop — Profile cover (ref: Lovable)" `3411:56489`, sits 200 below "Frame 2 — Polished". The **Cover** is the shop's backdrop (a `Backdrop` instance, Blush preset), 1200×240 with a 24 radius, and Change Backdrop sits in its top-right corner. The 144 avatar has a 4px white ring and overlaps the cover's bottom-left. In the **Profile** row, the left side holds the name (36/44) over a meta line (@handle • URMEI followers, TikTok, Instagram), then the bio (640 wide). The right side holds Last Published, Preview Storefront and View Shop. Below is **Featured items** (header "Featured items 2 of 2" + Edit), then the two Tall product cards (384 wide, 24 apart), unboxed. Everything reuses the existing components and layers. The page title is dropped, as in the reference: the nav already marks My Shop. Not yet applied to any component.
- "make all height to 558" (user, chat, on the `Backdrop` set `3287:28680`): all 12 variants and their `Pattern` layers go from 1440×518 to 1440×558, and the set is re-gridded (rows 80 apart). Instances at the default size follow (18 on the page). Resized ones keep their own size (1200×240 cover, 560×162 thumbnails, 1440×4xx/5xx/6xx banners). Christmas's `Pattern` is empty, so it renders plain white. That was already so before this change: a placeholder until the launch presets are chosen.
- "CTAs are missing here" (user, chat, on `Frame 10` `3412:210573`, the user's My Shop page built on Option 5 with the Valentine's Day backdrop): the creator's three CTAs are added. (1) `Shop actions` `3416:55284`: Preview Storefront and View Shop, with "Last Published on …" 8 below, sit under the bio as their own group. Identity's groups are 24 apart. (2) Change Backdrop `3416:55304` sits absolute in the backdrop's top-right corner, right-aligned with the card, centred in the 64 top padding. (3) The "Featured picks" label is now in a `Header` row `3416:55310` with the Edit button on the right.
- "featured product … does not have any highlight" (user, chat, on `---` `3412:210698`, the Lovable-style page): the Featured items cards looked the same as the Collections boards below. Three directions are built as copies to its right, 160 apart:
  - **A — Shop window** `3419:55603`: the featured products move onto the cover, so the banner itself displays them (closest to the brief's "featured items in the banner"); the separate section is removed.
  - **B — Spotlight panel** `3419:163034`: the section sits in a panel tinted with the backdrop colour (#FCE4EC, 24 radius, 32 padding). Its heading reads "Charlotte's featured picks" with a supporting line, and two large Tall cards fill the width.
  - **C — Editorial block** `3419:163420`: a dark block (the primary button's fill, 24 radius). On the left, an intro column: the eyebrow "Featured", the headline "Charlotte's picks" (40/48, white), a supporting line and a white Edit. On the right, two Tall cards (320 wide).
- "need this to be more refined" (user, on A `3419:55603`): the window is now a frosted panel (white 72%, 24 background blur, 1px white stroke, soft shadow, 20 radius, 20 padding). The heading "Featured by Charlotte" is 18/26 Medium, with Edit on the right. The cards are **Compact** product cards (380×160, side by side, 12 apart). The Tall card's photo can't take a height override (it stays at 217), which made the cover 556 tall. The panel (812×244) sits on the right with even 48 margins, the cover drops to 340, and Change Backdrop moves to the cover's empty top-left.
- "add about in this page" (user, chat, on `Frame 2007737763` `3412:213078`, the user's My Shop page with the Valentine's Day backdrop): the profile card had no bio. An `About` block `3425:59371` fills the empty right side of the Identity row (48 from the profile header, fills the width). It holds an "ABOUT" label in the same style as "FEATURED PRODUCT", 8 above the bio ("Sharing the products I love…").
- "how will be like" → "About added here" (user, on `Frame 2007737764` `3412:213549`, the My Shop page whose card carries Preview Storefront / View Shop on the right): the shop buttons fill the card's right side, so `About` `3428:56836` is its own row under the identity row, above the divider and Featured Product. It's 720 wide so the lines stay readable, with the card's 32 rhythm. The section (`Frame 2007737763`) now hugs (was fixed 722) and grows to 657. The `Backdrop` pattern is fixed at 558, so a clipped second instance, `Backdrop (repeat)` `3428:163886`, continues it below. **For the build: the backdrop is a repeating background that grows with the banner's content.**
- "user not have easy to find the tabs like Backdrop / Featured items / Collections (3) / Products (12)" (user, on `Customize banner dialog` `3436:216632`): the section switch (Backdrop / Featured items) and the filter (Collections / Products) were the same dark `Pill Tab`, so the two levels looked like one row of filters. A copy, "Customize banner dialog — Clear tabs" `3440:58349`, sits 160 to the right; the original is untouched. Its sections are the underline `Tab` component (library set `306:47641`, the storefront's tab, badge off) in a full-width `Section tabs` bar `3440:58719` (gap 24, 1px bottom rule matching the dialog header's divider). The Collections / Products pills stay as the filter inside Featured items.
- **Flows updated to the new My Shop page (user, 2026-10-20: "updated the shop page to this so update the flow based on this", on `3436:216586`).** Decisions are in `ANSWERS.md`: Personalize Shop opens one Customize banner dialog (Backdrop / Featured items tabs), and an empty featured row shows a dashed prompt. One flow at a time.
  - **New component `My Shop banner`** set `3447:59481` (Components — Backdrop & Featured Items, under Storefront banner). `Featured=Two` `3447:59162` is the user's design, with the copy cleaned up: the card names were doubled, the collection card carried product text, and the bio ended with a stray quote mark. Card 1 is ANNA LOGOR, Hydra veil brightening essence, with Shop Now. Card 2 is "COLLECTION · 5 PRODUCTS", Copy my wedding look, with View Collection. `Featured=None` `3447:59163` shows a 133-tall dashed prompt (2px, 8/6 dash, 10 radius): "Feature up to 2 products or collections" + Add Featured Items. The nested `Backdrop` is exposed, so the preset can be swapped on each instance.
  - **01 Change Backdrop — done.** In all six screens, the old Header, page header and Shop banner are replaced by a `My Shop banner` instance that keeps each screen's backdrop (Soft Dots; Valentine's Day in 01.4). The page content's top padding is 48. The four dialogs (01.2, 01.3, 01.5, 01.6) are now **Customize banner**, with the underline `Section tabs` (Backdrop active) at the top of the right column and "Select a backdrop" under it. Apply Backdrop becomes Save Changes, and the helper reads "Nothing changes until you save." Each dialog is re-centred (786 tall, y 57) and its cursors move with their targets: +45 inside the gallery and footer, unchanged on the 01.6 confirm. In 01.1 the cursor's ripple is centred on Personalize Shop. The 01.6 confirm reads "Discard your changes?" with Keep Editing / Discard, and the 01.4 toast reads "Banner updated". Screens are renamed (01.1 Click Personalize Shop, 01.2 Customize Banner on Backdrop Tab, 01.4 Banner Saved, 01.6 Close with Unsaved Pick). Four annotations are reworded, and a new one on 01.1 explains the single entry point. The dialog preview still shows the current `Storefront banner` (the shopper's view); it changes in 06.
  - "default theme should be plain" (user, 2026-10-20, per R2): `My Shop banner` defaults to **Plain** (was Valentine's Day). In flow 01 the starting backdrop is now Plain, not Soft Dots: the banners in 01.1, 01.2, 01.3, 01.5 and 01.6 are Plain, and 01.4 keeps the saved Valentine's Day. In 01.2 and 01.5 the Plain tile is the selected current one and the preview shows Plain. 01.3 and 01.6 keep Valentine's Day picked. The 01.6 confirm reads "Your banner keeps Plain.", the 01.2 annotation says "(Plain, the default)", and 01.2 is renamed "… Current Plain".
- **Final (user, 2026-10-20): "Customize banner dialog — Clear tabs" `3440:58349`.** Backdrop / Featured items are underline tabs at the top of the right column, and Collections / Products stay as filter pills inside Featured items. Flow 01's dialogs already use the same tab bar; flow 02 will use this dialog for the Featured items tab.
- "use more coloured themes as background, now everything looks lighter shades" (user, 2026-10-20): the presets are recoloured from grey-on-white into real colour themes. Each has a mid-tone background with its pattern in a deeper shade of the same hue, so the white card still stands out. This is applied to the `Backdrop` set `3287:28680` and to the matching `Backdrop thumbnail / …` components (Dev Handoff › 17 Backdrop Picker), so the picker tiles match. **Plain stays white and is the default** (R2). Ripple Lines: sky #CFE3F7 / #7FAEDB. Soft Dots: mint #CDEBDD / #6DBE9A. Grid: lavender #E2D9F7 / #B19EE6. Checks: peach #FFE0CC / #FFC4A1. Stripes: butter #FFF0B3 / #F2CF5B. Blush: gradient #F7B6CB → #FFD3B5. Sand: gradient #E9CFA6 → #F7E6CB. Valentine's Day: rose #F8BBD0, hearts #EC6A98. Lunar New Year: unchanged (already red and gold). Christmas: pine #1F5E3B; the thumbnail has white snow, but the full backdrop's pattern layer is still empty, so it's solid green until the art is drawn. New Year: navy #1D2B53 under the existing confetti. Every instance follows, including the flow 01 banners and previews.
- "initially this would be empty state" (Figma comment on 01.1, 2026-10-20): agreed. Flow 01 runs before anything is featured, so all six of its `My Shop banner` instances are `Featured=None` (the dashed prompt), matching the dialog previews and leading into flow 02. 01.4 keeps the saved Valentine's Day; its override had been reset to Plain and is restored. Thread: On it → Fixed → Closed.
- "update based on the context since here can edit the featured items" (Figma comment on the 01.2 dialog title, 2026-10-20): the dialog covers the backdrop and the featured items and opens from Personalize Shop, so its title is now **"Personalize shop"** (was "Customize banner"). Changed in the four flow 01 dialogs, the final dialog `3440:58349` and the earlier `3436:216632`; the dialogs are renamed `Personalize shop dialog`. Flow 02 uses the same title. Thread closed.
- "fix it" (Figma comment on the 01.6 confirm, 2026-10-20): the message named only the backdrop and left "Plain." alone on a line. It now reads "You have changes that aren't saved yet. If you discard them, your shop stays as it is.", which works for both tabs. Thread closed.
- "Preview doesn't match the design" (Figma comment on the 01.2 preview, 2026-10-20): the dialog preview showed the old `Storefront banner`. `My Shop banner` gains three booleans: **Show nav** (the Header), **Creator controls** (Personalize Shop, Preview Storefront / View Shop / Last Published, the None prompt and the One slot's Add Another) and **Shopper actions** (Follow / Copy Shop Link, default off). Its variant roots now hug their content at 1440 wide, the backdrop stretches behind them, and the card hugs. In the four flow 01 dialogs, the preview is a `My Shop banner` instance (nav off, creator off, shopper on) rescaled to 560 and clipped in an 8-radius frame, on that screen's backdrop (Plain in 01.2 and 01.5, Valentine's Day in 01.3 and 01.6). This is also the base for flow 06 (Shopper's View). Thread closed.
- "Should this be needed in every thumbnail?" (Figma comment on the 01.5 Seasonal filter, 2026-10-20): answered in the thread. Under the Seasonal filter the tag repeats on every tile. Suggested showing "Seasonal" only under All, and keeping "Default" on Plain and "New" on new presets. **Approved in the thread ("go ahead")**: in 01.5 the Seasonal tiles' tags are off (`Show note` false on Valentine's Day, Lunar New Year and Christmas), and New Year keeps "New". **Rule:** a tag that only repeats the active filter is hidden, so "Seasonal" shows only under All, "Default" stays on Plain and "New" stays on new presets. Thread closed.
  Follow-up "Add the context for the dev team as annotation": an Info annotation on the 01.5 `Tiles` `3350:84863` states the rule. Closed.
  - **02 Add Featured Items — done (2026-10-20).** `My Shop banner` gains **`Featured=One`** `3454:46469`: the collection card plus a dashed "Add Another" slot, which is creator-only. The featured cards now show the flow's picks: MOUSE DOUCE · Resurrection renew radiance eye cream, and "COLLECTION · 6 PRODUCTS" · My morning routine with its board photos and +3. In all seven screens, the old Header, page header and Shop banner are replaced by `My Shop banner` on Plain (the default): **None** in 02.1–02.3 (nothing saved yet), **Two** in 02.4–02.6, **One** in 02.7. The page content's top padding is 48. The three dialogs (02.2, 02.3, 02.6) are rebuilt from the final `3440:58349` dialog, titled Personalize shop, on the Featured items tab. Each screen's heading, count, search, Collections/Products filters and tiles move across unchanged, keeping their ticks and disabled states. Each preview is the scaled shopper view, One in 02.2 and 02.6 and Two in 02.3. The dialogs are 1120×872 at 160,24. Cursors: 02.1 on Add Featured Items in the dashed prompt, 02.2 on the Products filter, 02.3 and 02.6 on Save Changes. **02.5 is now "Click Personalize Shop to Edit"**, with the cursor on Personalize Shop, because the Edit link is gone. Annotations: three were re-attached (the 02.1 prompt; 02.5 "no separate Edit"; 02.6 Save Changes), one is new on the 02.6 tabs (opens on Backdrop, switch to Featured items; Add Featured Items and Add Another open straight on that tab), and two are reworded (02.2 "both filters"; 02.7 toast "the empty slot shows Add Another"). The toasts keep their text ("Featured items added" / "Featured items updated").
- "update as 2 grid" (Figma comment on the 02.2 collection tiles, 2026-10-20): the collection tiles are now a **2-column grid**. Each `Collection Card` is 224 wide (the grid is 464 with 3px side padding and a 10 gap), so the 3:2 cover is 149 tall. The selection ring and checkbox chip follow, and the cursor stays on the Products filter. The product tiles stay at three across, since they're single photos (said in the thread). Thread closed.
- "make it consistent" (Figma reply in the grid thread, 2026-10-20): the product tiles are now two across as well, in 02.3, 02.6 and the final dialog `3440:58349` (226 wide, 12 gap). In the `Featured pick tile` set `3334:57810`, the `Thumbnail frame` is now 3:2 with its aspect ratio locked (146×97 at the default width), so the photo grows with the tile: 226×150 here, matching the 224×149 collection boards. Older screens that still use the tile at 146 now show a 97-tall photo (was 112); flows 03–05 get rebuilt anyway. Thread closed.
- "Instead showing the socials and bio show [Shop URL field `3445:229839`]" (Figma comment on the 01.1 banner, 2026-10-20): on My Shop the creator needs their shop link, and the socials and bio are what shoppers see. `My Shop banner` gains **Socials and bio** (default on: the Socials row and the Bio) and **Shop URL** (default off: the "Shop URL · urmei.com/shop/charlotte" field with copy, under the name). All 20 creator instances in flows 01–05 (Creator controls on) have socials and bio off and Shop URL on. The 11 previews and shopper instances keep socials and bio. Thread closed.
  - **03 Search in the Picker — done (2026-10-20).** In the three screens the page shows `My Shop banner` None on Plain, with Shop URL on. The dialogs are rebuilt from the final dialog (Personalize shop, Featured items tab). Each one keeps its search state ("morning" matches; "retinol" no matches with the picker empty state; search cleared) and has a One preview (My morning routine ticked). Collection tiles are 2 across. The 03.1 and 03.2 cursors sit on the search field's clear ✕. The moved annotations kept their text, and "both tabs" now reads "both filters".
  - **04 Nothing to Feature Yet — done.** Both screens use None. The 04.1 cursor is on Add Featured Items in the dashed prompt. In 04.2 the dialog shows the picker empty state (Nothing to feature yet + Browse Catalogue) with a None preview, **Save Changes is disabled** (Button State=Disabled; nothing to save), and the cursor is on Browse Catalogue. The "Featured box still shows on an empty shop" note is re-attached to the new banners.
  - **05 Featured Item No Longer Available — done.** `My Shop banner` gains **`Featured=Two unavailable`** `3461:312131`: card 1 has its photo at 40% and its copy at 60%, the note "Shoppers no longer see it. Remove it or pick another.", an "Unavailable" tag on the photo, and the bin (Remove from banner) in place of Shop Now. Card 2 is unchanged. 05.1 uses it, with the cursor on the bin and the annotation re-attached. 05.2 is One with the Undo toast. 05.3 (storefront) is the shopper view, One.
  - **06 Shopper's View — done.** On 05.3 and 06.1–06.3, the old `Storefront banner` in the banner block (renamed `Banner`, now hugging) is replaced by a full-width `My Shop banner` set to nav off, creator off, shopper actions on, socials and bio on, Plain. The states are Two (06.1), One (06.2) and None (06.3: profile card only, no prompt). The annotations moved across, and the 06.1 cursor is on View Collection. The old `Storefront banner` component is no longer used in flows 01–06.
- "Still there is a issue with the button" (Figma reply on the 01.6 confirm, 2026-10-20): Keep Editing was 2px wider than Discard, because the outlined button's stroke counts towards its width while the filled one has none. Both are now fixed at 232.5 with a 12 gap, and the layer is renamed `Keep editing button`. **Rule for paired buttons:** give them a fixed equal width rather than FILL when one is outlined and one is filled. Thread closed.
- Fixes on "Frame 9" `3412:214123` ("Option 5 — Divider and labelled picks", user in chat: "fix the issues"). The doubled product names are reset through the slots' `Product name` property. The bio's stray closing quote is gone. The label reads "FEATURED" (two items; it was "FEATURED PRODUCT") and the layer is renamed from "Bio" to "Section label". Both frames now hug: the inner frame was 641 tall with 680 of content, so the banner was clipped and a blank band showed below. The backdrop stretches to the full banner height (it was 11px short) and the bottom padding is 40 (was 64).

Every comment thread follows On it → Fixed → (checked) Closed, and is never resolved.

**Components moved (user: "component regarding this should add to new page in correct order"):** section `Components — Backdrop & Featured Items` `3353:131427` on the new page, top to bottom: Backdrop `3287:28680` → Featured pick tile `3334:57810` → **Picker empty state** `3350:171571` (new) → Featured slot `3306:20522` (new variant `State=Unavailable` `3350:171587`) → Featured items `3332:57991` → Shop details `3309:22050` → Banner content/Desktop `3287:18416` → Storefront banner `3343:75228`. The empty `Backdrops` section `3311:21873` was deleted. Backdrop picker / Backdrop tile stay on Dev Handoff (section 17); Collection board stays on Personlisation (no longer used in the flows).

**Change Backdrop button (user, 2026-10-19: "add stroke for this btn"):** the toolbar button in `Banner content/Desktop` now has a `border/color/dark` stroke, so it reads on every backdrop.

## Primary screen and primary flows (user, 2026-10-19)

> **The primary screen is `My shop — Desktop` `3287:33154`** (Personlisation page, at -6695, 44261). Every new frame starts from it. It's built from components: `Shop details`, `Banner content/Desktop` (toolbar with Change Backdrop, two `Featured slot`s, Show second slot), the `Backdrop` set (absolute, stretches with the banner), the Collections tab, with token spacing (24 / 32 / 64).

The current flows live in **`[Influencer] Shop Personalization (MVP) — Primary Flows — Lead Review`** `3321:24528`. The older top-level sections `01 - Change Backdrop` `3302:17696` and `02 - Add Featured Item` `3307:20249` are renamed "— Superseded by Primary Flows" and kept for reference.

**Flow frames use Shop details `State=Published`.** The primary screen itself is set to "No products", which doesn't fit a shop with 12 picks and 3 collections. That's flagged to the user, and the primary was left unchanged.

**Experimental (user, 2026-10-19): one modal for both.** "Merge this into a single modal so the user can manage it in one place." Section `Experimental - Customize Banner (Single Modal) — Lead Review` `3338:67999`: the banner toolbar shows one **Customize Banner** button; the **Customize banner** dialog has **Backdrop / Featured items** tabs over the gallery column, a live preview of both, and one **Save Changes**.

| Frame | Id | What it shows |
|---|---|---|
| `E.1` My Shop Click Customize Banner | `3338:68000` | Toolbar button relabelled Customize Banner (cursor) |
| `E.2` Backdrop Tab, Pick Valentine's Day | `3338:70201` | Backdrop tab; preview on Valentine's Day; cursor on the Featured items tab |
| `E.3` Featured Items Tab, Pick 2 | `3338:73068` | Featured items tab, 2 of 2; preview on Valentine's Day with both items; cursor on Save Changes |
| `E.4` Banner Saved | `3338:77495` | My Shop with Valentine's Day and both items; "Banner updated" toast with Undo (reverts both) |

**Comment feedback (2026-10-19, Figma comments on 02.3):** "looks off for the stroke": the selected pick tile now has a ring with a 3px white gap. "Looks off here" (the preview): the preview now hides the Featured header and creator controls (new `Show header` boolean on Featured items) and is scaled from a 1200px banner. Both threads got a "🤖 Claude: Fixed …" reply. "Use this component for the collections" (pinned beside a Collection Card instance): the picker's Collections tab (02.2) now shows each collection as a **Collection Card** instance (Dev Handoff `3122:85580`: 3-image cover, +N products, title) with a checkbox on the cover and a ring when selected. The picker grid was also fixed to 3 per row (tiles 146 wide). "Follow the grid style of the collection here" (on the user's loose dialog copy `3329:90259`): its Collections tab now uses the same Collection Card grid, and the leftover Seasonal pill is hidden.

**More comment fixes (2026-10-19):**
- "use latest component here" (02.1 Collections row): the My Shop collection cards are now **Collection Card** instances (42, on the primary screen and in Primary Flows). They no longer have the reorder bar or menu.
- "update the text size" (02.2): the +N overlay on the picker tiles is 14 / 9 px.
- "fix the spacing here" (02.3 preview) and "spacing looks odd" (02.4): the profile card content is centred vertically in Banner content; previews have even padding and flush, centred featured cards.
- "this corner radius looks off" (02.2): the selected ring radius is 11 (cover 8 + 3px gap).
- "Show an iteration by merging this and send the link in thread" (page comment over the two loose dialogs): new **merged iteration** `3347:90174` beside them: one "Customize banner" dialog with both on one screen (Backdrop row of 5 tiles + See All 12, then Featured items with search, pills and grid), live preview, one Save Changes. The link was posted in the thread, along with the tabs version (`3338:67999`) for comparison.
- "No, preview is not needed for the Add featured items" (02.6): the Preview column is removed from the Add featured items picker (02.2, 02.3, 02.6, loose copy); the dialog is 536 wide with just the selection column. The Customize banner dialogs keep their preview.
- "fix the cut off here" (02.2): the ring was clipped by the scroll area; the collection grid now has 4px top / 3px side padding, gap 10.
- **Componentised (user): the preview banner is now the `Storefront banner` component** (Featured None / One / Two, exposed Backdrop). It replaces the hand-built content in all 20 gallery previews, keeping each one's backdrop and featured state.

**Status (user, 2026-10-19): `01 - Change Backdrop` is fixed.** "This flow is fixed."

**02 rebuilt (user, 2026-10-19): one Featured items card instead of two slots.** "Make it a container, 1 card that can select 2 products or collections."
- **New component `Featured items`** `3332:57991` (`State=Empty` / `One` / `Two`). Empty: a dashed creator-only prompt, "Feature collections or products · Pick up to 2" + **Add Featured Items**. One / Two: a "Featured · n of 2" header with **Edit**, then the item cards (Featured slot, remove hidden). It replaces the two slots inside `Banner content/Desktop` (the `Show second slot` boolean was deleted). The area grows with its content, with a minimum height so the empty state lines up with the profile card.
- **The picker looks like the Choose a backdrop gallery** (user): a 1120 dialog with a live **Preview** (Banner content at the shopper's view, on Soft Dots, showing the current picks), then "Select up to 2 to feature · n of 2 selected", **search** (user: "search to be introduced"), **Collections (3) / Products (12)** pills, and a grid of the new **`Featured pick tile`** component `3334:57810` (Default / Selected / Disabled; checkbox `_checkbox`). At 2 of 2 the unticked tiles are disabled. Footer: Cancel / **Add to Banner** (or **Save Changes** when editing).

| Frame | Id | What it shows |
|---|---|---|
| `02.0` Cover | — | "My Shop → Add Featured Items → pick up to 2 collections or products → Add to Banner" |
| `02.1` My Shop Click Add Featured Items | `3333:75395` | Empty Featured items card; cursor on Add Featured Items |
| `02.2` Pick a Collection | `3333:77594` | Gallery picker, Collections: "My morning routine" ticked, 1 of 2, preview shows it; cursor on Products |
| `02.3` Pick a Product, 2 of 2 | `3333:79867` | Products: the first ticked, the rest disabled, 2 of 2; preview shows both; cursor on Add to Banner |
| `02.4` Two Items Featured | `3333:82132` | "Featured · 2 of 2" card with both items; "Featured items added" toast with Undo |
| `02` Sub-flow Edit Cover | — | "My Shop → Featured · Edit → uncheck an item → Save Changes" |
| `02.5` Click Edit | `3333:84390` | Cursor on the card's Edit |
| `02.6` Uncheck a Product | `3333:86626` | Products with nothing ticked (the product was unticked), 1 of 2; cursor on Save Changes |
| `02.7` One Item Featured | `3333:88932` | "Featured · 1 of 2"; "Featured items updated" toast with Undo |

The rows for `02` in the table below are the old two-slot frames (`3321:84339`–`3321:97882`), deleted on 2026-10-19.

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

## Design review of section `3350:84583` (Claude, 2026-10-20)

A read-only review of flows 01–06 against ANSWERS, this file and the Figma rules. I posted 15 comments, prefixed "👽︎ Claude:" (the prefix is now just "👽︎") on the frames. None are resolved, and no Figma changes were made yet.
- **High:** the dialog changes size and position between flows and tabs (`3350:85017`); the picker's collection covers don't match My Shop (`3350:85017`); the storefront shows 5 collections where My Shop shows 3 (`3352:323112`).
- **Medium:** the "MOUSE DOUCE" typo; the 03.1 → 03.2 search-clear continuity; two disabled-tile styles; the unavailable card's copy promises a replace action that doesn't exist.
- **Questions:** whether the creator sees shopper CTAs on My Shop; whether the new banner replaces Option 4 (`3408:54579`) from the 2026-10-20 decision; the one-item layout; the missing Picks/Posts tabs (Q6); whether Save goes live right away or still needs publishing.
- **Low:** an empty left column in the dialogs, small inconsistencies (tags, plurals, search icon, checkbox contrast, Personalize Shop chip), and missing steps (01.6 cancel click, 02.5 → 02.6 tab switch, 02.6 cursor, All Picks brand/photo mismatches).

### Review follow-ups from Figma comments (2026-10-20)

- **Left column, 3 options:** a new section, `01.2 - Preview Column - 3 Options` `3468:8256`, sits right of flow 01.
  - A `3468:8257`: a full storefront preview, which I recommend.
  - B `3468:8957`: the banner preview plus a "Your banner" summary card.
  - C `3468:9657`: the preview on top, with the gallery below at 7 tiles per row.
  - Each option has an Info annotation. Waiting for a pick.
- **Dialog size:** all 11 Personalize shop dialogs in flows 01–04 are now 1120×840 at y30.
  - Header: the `FormModal` spec (16px padding, 20px SemiBold title).
  - Footer: the same footer in every dialog.
  - Body: 696px. In flow 01 the tiles viewport grew to fill it.
  - Cursors moved with their targets.
- **Typo:** "MOUSE DOUCE" → "MOUSSE DOUCE" in 8 instance overrides.
- **Save vs publish (user):** Save keeps the change as a draft, and the creator still taps Publish Changes, as in the main file's `236:23059`.
  - Agreed change for 01.4, 02.4 and 02.7: the toast says "… saved. Publish to go live", and the banner's primary button becomes Publish Changes. Not applied yet.
- **Shopper CTAs on My Shop:** I offered two options in the thread.
  - 1, recommended: the creator sees Edit plus a Replace/Remove menu.
  - 2: the CTAs open Preview Storefront.
- **One-item layout (user, 2026-10-20):** a half-width card. Queued.
- **Unavailable item (user, 2026-10-20):** update the card with a Replace action and add the Replace flow. Queued.
- **Done, approved in chat ("go ahead", 2026-10-20):**
  - **Publish after save:** 01.4, 02.4 and 02.7 show Publish Changes as the primary button, and the toast reads "… saved. Publish to go live". There's an annotation on the toast.
  - **Flow 03 order:** 03.2 is now Search Cleared, and 03.3 No Matches is stacked under 03.1 as an edge case. Sections 04–06 moved down to make room.
  - **Option C on the Featured items tab:** added as `3472:12178`.
  - **Unavailable card:** the `Featured=Two unavailable` variant's card has Replace + Remove (Ghost) buttons, and the bin is hidden. The copy reads "Shoppers no longer see it. Replace it or remove it." The brand label reads MOUSSE DOUCE. The 05.1 cursor is on Remove.
  - **New Replace row in flow 05:**
    - Cover `3472:107055`.
    - 05.4 Click Replace `3472:107064`.
    - 05.5 Picker opens with the slot free `3472:107266`. The unavailable item isn't listed.
    - 05.6 New item picked `3472:107672`.
    - 05.7 Replaced, Publish to go live `3472:108244`.
    - Section 06 moved down.
  - **One-item layout:** in `Featured=One`, card 2 is a fixed 560 (half width).
- **Picks / Posts tabs (user):** they stay in the Creator Portal only. The e-commerce storefront has no tabs for now and might get them later.
- **Option C chosen (user comment, 2026-10-20):** all 13 Personalize shop dialogs now put the preview on top and the picker below.
  - Frames: 01.2, 01.3, 01.5, 01.6, 02.2, 02.3, 02.6, 03.1–03.3, 04.2, 05.5 and 05.6.
  - Size: 1120×860 at y20.
  - Preview box: 1072×200. The backdrop tab scales it to 1.914×, the featured tab to 1.2×.
  - Picker viewport: 223px on the backdrop tab (7 tiles per row), 169px on the featured tab (4 per row).
  - Empty states are centred in the viewport, and cursors moved with their targets.
  - The options section `3468:8256` stays as the record of A/B/C. This replaces the earlier 1120×840 side-by-side spec.
- **Collections consistent (user comment):** 3 collections everywhere. Night-time reset and Travel essentials were removed from 05.3, 06.1–06.3 and option A.
- **Small consistency fixes (user comment):**
  - The Backdrop tile `Note tag` has a 1px border, so "Default" reads as a chip like Seasonal/New.
  - The "+1" collection covers say "product".
  - Checkbox chips (pick tile set `3334:57810` and the collection pick chips) have a border and a soft shadow.
  - The banner set's Personalize shop button has a border on every backdrop.
  - Not changed: the search field's Filled state hides the search icon. It's the library Search component, and it matches the rest of the portal.
- **Dev handoff (user comment):** plain-English Info annotations are on the toast and the Publish Changes button in 01.4, 02.4, 02.7 and 05.7:
  - Save makes a draft, and shoppers don't see it yet.
  - Publish Changes makes it live and updates Last Published.
  - When everything is live, the button says View Shop.
- **Open:** the scroll fade in the backdrop picker. I recommended removing it; waiting for an answer.
- **K-Beauty components (user comments):**
  - The backdrop tile tags now use the K-Beauty **Tag** (sm, outlined; set key `00e69d32…`). It's larger than the old tag, with darker Medium 12 text. The tile set's `Note` text property was removed, because the library Tag has no text property, so each tile's label is an override.
  - All 51 category pills use the K-Beauty **Pill Tab** (set key `242d626d…`), with the same spec as the local copy.
- **Picker covers:** the picker's collection tiles use the same cover photos as the My Shop cards (18 tiles).
- **Disabled tiles:** my earlier finding was wrong. All the disabled tiles use the same Disabled state; the Salt & Stone photo has a dark background, so it looks grey. Recommended: no change.
- **Missing steps:**
  - New 01.6 "Click Close with an Unsaved Pick" `3478:11699`. The discard confirm is now 01.7 at x8780, and the section was widened. The options section moved right.
  - New 02.6 "Opens on Backdrop, Click Featured Items Tab" `3478:11954`. The old 02.6 and 02.7 are now 02.7 "Product Unchecked, Click Save" and 02.8.
  - Not done: the All Picks brand/photo placeholders. I asked whether to pull real catalogue data.
- **Shopper CTAs (user picked option 1):** in the banner set, Shop Now and View Collection are bound to `Shopper actions`, and a new **Edit** button is bound to `Creator controls`. Edit opens the Featured items tab. There's no separate Replace/Remove menu; the unavailable card keeps its own. Annotated in 02.4.
- **Open:** search bar width. I recommended one row: pills on the left, a 360px search on the right.
- **Banner layout (user):** the current layout is fixed, and Option 4 `3408:54579` is superseded. ANSWERS.md is updated.
- **Scroll fade (user picked 1):** removed from all 15 pickers. The cut-off row signals the scroll.
- **Collection Card `Show checkbox` (user comment):** a boolean on `3122:85580` shows a checkbox chip at the top right of the cover, with the nested `_checkbox` exposed. The 15 picker tiles now use it instead of a loose chip frame. Recorded in `workfile.md`.
- **Disabled tiles (user picked 1):** left as they are.
- **Search bar (user picked 1):** in every Featured items picker, a `Filters` row holds the pills on the left and a 360px search on the right. The picks viewport went from 169 to 223px (same as Backdrop), and dialogs stay at 860.
- **Preview cut-off (user comment):** every dialog preview now fills 1072×200. The banner instance is widened at native size (backdrop stretches, card stays centred), then scaled to 200 high. All 15 previews.
- **Featured card alignment (user comment):** in the banner set, every Featured card uses `counterAxisAlignItems = CENTER`, so the content is vertically centred everywhere.
- **Search cut-off (user comment):** turned off clipping on the 9 `Filters` rows. I could not reproduce it after that; asked which frame. **Theme hard to see in the preview:** offered (1) show the nav strip, recommended, or (2) zoom out.

## Second design review (Claude, 2026-10-20)

After all the comments were addressed, I posted 10 new comments, numbered "Review 2 · n/10".
- **High:**
  - The 01.3 cursor isn't on Save Changes.
  - The 01.7 cursor sits under the confirm modal.
  - 05.2 removal shows View Shop rather than Publish Changes. I asked whether removal is a draft.
- **Medium:**
  - 02.5 should use the new Edit button.
  - The 02.6 → 02.7 uncheck step is missing.
  - There's a stray cursor in 06.1.
  - Save is enabled in 03.1–03.3 and 05.5 with nothing changed.
- **Low:**
  - The 01.4 toast wording differs from the others.
  - The Seasonal tags drop in the filtered view.
  - No result frame after Discard.
- **Hearts barely visible (user comment):** the banner shows only about 24px of backdrop around the card with the nav hidden, which affects the storefront too. I proposed 48px top and bottom padding in the banner component; waiting for an answer.
- **Review 2 · 1 (user: Fix):** the 01.3 cursor is now on Save Changes.
- **Toast wording (user):** "… Publish changes to go live" everywhere (01.4, 02.4, 02.8, 05.7). It matches the Publish Changes button.
- **After Discard (user: add a screen):** new 01.8 "Discarded, Backdrop Unchanged" `3489:11124` at x10420, with an annotation. Section 01 widened, and sections 02–06 moved down. Note: the user deleted the options section `3468:8256`, so the option ids above no longer resolve.
- **02.5 uses Edit (user: fix as recommended):** the cursor is on the product card Edit button. Removed the tab-switch frame `3478:11954` and renumbered: 02.6 Product Unchecked, Click Save; 02.7 One Item Featured. Asked whether to add the "both ticked, click checkbox" frame.
- **Uncheck step (user: add it):** new 02.6 "Edit Opens Featured Items, Uncheck a Product" `3490:10400`: 2 of 2, cursor on the product checkbox, Save disabled. Renumbered to 02.7 Product Unchecked, Click Save, and 02.8 One Item Featured.
- **Consistent publish wording (user):** all 5 toasts now end in "Publish changes to go live". 05.2 removal is a draft too, with Publish Changes and an annotation (settles Review 2 · 3).
- **Toast truncation (user):** the library Toast is a fixed 375px with one line. Each toast instance was widened to fit its message (377–430px) and recentred, all 5 toasts. Dev note: the toast should grow to fit its text instead of truncating.
- **Seasonal tag rule (user: go ahead):** an Info annotation on the 01.5 Seasonal pill: hide the Seasonal tag under the Seasonal filter; New and Default always show.
- **Save always enabled (user):** enabled Save in 01.2, 01.5, 02.6 and 04.2, and rewrote the 3 "disabled until something changes" annotations. With no changes, Save just closes the dialog. Settles Review 2 · 7.
- **Left-aligned search options (C2, user: "Build as a new section"):** new section `Search Bar Options — Left-Aligned — Lead Review` `3504:301653` (to the right of the flows) has a cover `3504:301654` and 3 clones of 02.3, each with an Info annotation on the search field:
  1. A `3504:301663`: a full-width search row above the pills. The picks area loses 50px.
  2. B `3504:302282`: one row, with the 360px search first and the pills after. The height is unchanged. **Recommended.**
  3. C `3504:302901`: pills first, with the 360px search left-aligned below them. The picks area loses 50px.

  Waiting for a choice before rolling it out to the 15 pickers.
- **No Undo (C3, and Neethu's "remove" on 02.8):** changes only go live on Publish, so Undo was removed from all 5 toasts (01.4, 02.4, 02.8, 05.2, 05.7). Each toast now hugs its message and is recentred. The toast annotations say there's no Undo. 05.2 is renamed "Removed, Publish to Go Live".
- **No New tag (Neethu, user: "Drop it"):** the New Year tile now matches the other seasonal tiles: "Seasonal" under All, no tag under the Seasonal filter (01.2, 01.3, 01.5, 01.6, 01.7). Both tag-rule annotations now say there's no New tag. This replaces the "New always shows" part of the Seasonal tag rule above.
- **No dark-background photos (C1):** the Salt & Stone bottle on black (`a7867f16…`) is swapped for the same bottle on white (`2ed7fa79…`). That's 43 layers on the page plus the 4 `My Shop banner` Featured variants on Personlisation. This also settles the "disabled tiles look grey" note.
- **Unavailable tag (C4):** the tag now uses the old storefront's "NOT AVAILABLE" badge (white pill, Figtree SemiBold 11 caps, from `1616:66035`) in `Featured=Two unavailable` and both `Featured slot` `State=Unavailable` sizes.
- **Unavailable CTAs (C5):** the unavailable card shows **Edit** (outlined, opens Featured items) and **Remove** (ghost). The note now reads "Shoppers no longer see it. Edit to pick another, or remove it."
- **Applied backdrop carries forward (C6):** every backdrop in flows 02–06 changed from Plain to Valentine's Day, which is what 01.4 applied: 33 instances across the My Shop banners, the dialog previews and the storefront banners. Flow 01 still starts on Plain.
- **Preview right side empty (user comment on 02.6):** the `Backdrop` set's (`3287:28680`) `Pattern` frames were 1440 wide with Scale children, so stretched banners (the dialog previews) showed a plain right third. Every pattern now repeats to 2880, clipped, with its children pinned left (no stretch). The 1440 banners are unchanged. Open: the Christmas variant's Pattern is empty (no snow); I asked whether to add it.

## Third design review (Claude, 2026-10-20)

Four read-only reviewers ran in parallel (01, 02, 03–04, 05–06) and posted 17 pinned comments labelled "Review 3 · <flow>-n". Nothing was changed yet.
- **High:**
  - 01.8 "Discarded, Backdrop Unchanged" `3489:11124` is gone from the file, so flow 01 ends at the Discard confirm (01-1).
  - In 05.6 the preview still shows the unavailable eye cream although Auto kernel farming cream is ticked (05-1).
- **Medium:**
  - 02.6 shows the empty "Add Featured Items" banner behind the dialog, but should show Two (02-1).
  - The 02.5 banner annotation says there's no Edit while the cursor is on Edit (02-2).
  - A single featured card fills only half the row (02.7 preview, 06.2): stretch it, as recommended (02-3, 06-2).
  - The 05.2 annotation says shoppers keep seeing the removed item until Publish, which conflicts with "never shown" (05-5).
  - The 05.1/05.4 annotations still describe the old tag and bin (05-3).
- **Stale annotation copy, repeated across flows:**
  - "Both featured items" where 0–1 are picked (02.2, 02.7, 03.1–03.3, 04.2, 05.5, 05.6).
  - "Opens on Backdrop" on the Edit path.
  - "Save applies" where it should be "saves a draft".
  - The Tiles note on no-match/empty pickers.
- **Low:**
  - 05.4 and its edge-case cover still say "Replace"; rename them to "Edit".
  - The 04.0 cover subtitle reads "Empty Shop".
  - 03.3 needs a "Clear search" button.
  - Hide the 0-count pills in 04.2.
  - 02.6 is at x 3860 and last in the layer order.
- **Review 3 · 01-1 (user: "2"):** 01.8 is not rebuilt (it was removed on purpose). Instead, an Info annotation on the 01.7 Discard button `3445:231028` describes the result: the dialog closes, the banner is unchanged, View Shop stays, and no toast.
- **Review 3 · 02-1, 02-2, 02-5 (user: fix):**
  - The 02.6 banner behind the dialog is now Featured=Two (on Valentine's Day).
  - The 02.5 banner annotation now describes the Edit → Featured items tab path.
  - 02.6 is at x 3858, and in the layer order between 02.5 and 02.7.
- **Review 3 batch (user approvals):**
  - 02-3 option 2: `Featured cards` `3454:46505` in Featured=One is centred, so a lone card keeps half width; the 06.2 annotation is reworded to match.
  - 02-4 and 03-1: 19 annotations rewritten page-wide (preview "what is picked so far", the Edit/Backdrop tab paths, Save = draft).
  - 03-2: the hidden Tiles annotations are removed from 03.3 and 04.2.
  - 03-3: the 03.3 empty state shows an outlined Clear search button. Both empty states (03.3, 04.2) had their padding cut from 48 to 19 so their buttons fit the 225px viewport.
  - 05-3 and 05-5: the 05.1/05.4 banner and 05.2 toast annotations are updated (NOT AVAILABLE badge, Edit/Remove, shoppers never see it).
- **Review 3 · 04-2, 05-4 (option 2), 05.5 notes (user: fix):**
  - The 04.0 cover subtitle is now "04 Nothing to Feature Yet".
  - The edge-case cover is titled "Edit an unavailable item" (the subtitle keeps Replace), and 05.4's frame name is unchanged.
  - The 05.5/05.6 annotations were already fixed in the page-wide pass.
- **Review 3 · 05-1 (user: fix):** in the 05.6 preview, featured card 1 now shows Auto kernel farming cream (LOVB LOVB, photo `183cad46`), matching the ticked tile and 05.7.
