# Shop personalization: client requirement

Received about 2026-10-09 (the thread showed "3 days ago" on 2026-10-12). Status: **internal review (2026-10-12).** It's post-MVP: the client asked for a draft flow to show the idea, not a build. There's an HTML concept board with six ideas, and three of them have desktop Figma drafts. They went to Rayboy and Neethu KU to pick 2–3 to develop further. No code yet. Tracked as `T-33` in `TRACKER.md`.

Links: this follows on from Collections (`T-31`, `change-requests/collections/REQUIREMENT.md`). Its post-MVP item, "photos, videos, etc.", was left **Undecided** there, and this thread picks it up. It touches the storefront's creator card (`src/shop/components/StorefrontProfileCard.tsx`).

## MVP scope (2026-10-16)

**A slice of this request is now in the MVP**, tracked as `T-38`. Everything below this section is the post-MVP vision work (`T-33`) and is kept as history. Where the two disagree, this section wins.

**Source design:** the main design file `cehltPtMoGWEtKbF7k3MQQ`, section `{NEW} WIP Storefront — personalization | 15.10.26` `2383:87224` ([link](https://www.figma.com/design/cehltPtMoGWEtKbF7k3MQQ/-MVP--Influencer-Portal?node-id=2383-87224)). It's marked WIP, it's shopper-side storefront only, and it's desktop only. Read-only for us: we build in the Work File.

**Not in the MVP (user, 2026-10-16):** **Posts**. The design's `Posts (8)` tab, with its 4-column wall of photo, video and note posts, stays post-MVP. Frames that show the Posts tab (`01.1`, `02.1`, `04.1`, `06.1`) are reference for the banner only.

### Meeting notes, 10 October 2026, 11:00 (verbatim)

The user pasted these on 2026-10-16 as "the new requirement". They are the MVP requirement, and where they differ from the WIP design `2383:87224`, they win.

> **Design and Preview**
> - Backdrops: Use default backdrops with preset updates. Custom uploads are excluded from the MVP, as they may require admin moderation.
> - Preview: Allow creators to preview their storefronts.
> - Stats: Hide shop-page stats; they already appear on the home page.
> - Management: Allow users and creators to edit and manage their shop pages and access a shop preview.
>
> **Collections and Products**
> - Featured Items: Create a flow to feature collections and products within the banner.
> - Banner Customization: Define a flow for how users can change the banner for creator profiles.
> - Nudges: Encourage creators to add collections with prompts such as, "Hey, add collections."
> - Post-MVP: Allow users to add posts to a collection when the content is relevant to the products in that collection.
>
> **Content and Reviews**
> - Reviews: Keep the old reviews layout and remove the new one.
> - Post-MVP: Merge content and reviews, including filters.
>
> **Notifications and Creator Updates**
> - Include a "View product/collection" link in notifications announcing new creator collections or products in the storefront.
>
> **MVP Scope**
> - Include: Banners, collections, and products.
> - Exclude: Custom banners and admin approval.
>
> **Follow-Up Actions**
> - Define the flow for featuring collections and products in the profile banner.
> - Clarify upload moderation requirements beyond the MVP.
> - Add collections and banners to the prototype after the design is locked.

### What the MVP design shows

| Flow | Cover | Frame | What it shows |
|---|---|---|---|
| 01 Banner — One Collection | `2383:87225` | `01.1` `2383:87226` (Posts tab) | Profile card on the left. On the right, one **featured collection** card: eyebrow ("This week's edit"), title, a one-line description, View Collection, and the first three photos, with the last tile showing "+n products" |
| 02 Banner — Two Collections | `2383:87336` | `02.1` `2383:87337` (Posts tab) | Two featured collection cards stacked on the right |
| 03 Banner — Two Products | `2383:87463` | `03.1` `2383:87464` (All Picks tab) | Two **featured product** cards: brand, name and the creator's own line about it |
| 04 Banner — Two Products | `2383:87572` | `04.1` `2383:87573` (Posts tab) | Same banner as 03, on the Posts tab |
| 05 Banner — Two Products | `2383:87680` | `05.1` `2383:87681` (Reviews tab) | Same banner as 03, on the Reviews tab (six review cards) |
| 06 Banner — Valentine's Day | `2383:87887` | `06.1` `2383:87888` (Posts tab) | A **seasonal theme**: a pink Valentine's backdrop behind the banner; the content is unchanged |

The page under the banner is the same in every frame: Header, `Banner` (1440 × 485, Ripple Lines backdrop, profile card plus banner cards), `Section / Collections`, `Section / Tabbed content` (pill tabs **All Picks**, **Posts** and **Reviews** with counts), `Footer / Client`.

**Annotations in the design (verbatim):**
- Featured collection (`2383:87334`): "A featured collection shows the collection's first three photos. The last tile counts the remaining products, and View Collection opens the collection."
- Tabs (`2383:87335`): "Pill tabs: All Picks, Posts and Reviews, each with its item count. All Picks opens by default."
- Banner limit (`2383:87462`): "Maximum 2 products or collections can be shown in the banner."
- Featured product (`2383:87571`): "A featured product shows one product with the brand, name and the creator's own line about it."
- Seasonal theme (`2383:88021`): "Seasonal theme: only the backdrop behind the banner changes for the occasion. The banner content and layout stay the same."

### MVP scope (meeting notes + design, updated 2026-10-16)

| | Item | Source | Notes |
|---|---|---|---|
| ✅ In | **Banner backdrop**: the creator picks from URMEI's preset backdrops | Notes: Backdrops, Banner Customization | Ripple Lines by default. URMEI can add or update presets, e.g. seasonal ones such as the design's Valentine's Day (`06.1`) |
| ✅ In | **Featured items in the banner**: up to **2** collections or products | Notes: Featured Items; design annotation | Design draws one collection, two collections and two products. Mixing one of each isn't drawn |
| ✅ In | Featured product's own line | Design | The creator writes it |
| ✅ In | **Storefront preview** for the creator | Notes: Preview, Management | Already exists in code (`StorefrontPreview`); it must show the banner |
| ✅ In | **Creator edits and manages the shop page** | Notes: Management | The creator-side flow; not designed yet |
| ✅ In | **Hide shop-page stats** | Notes: Stats | They stay on Home. Removes the stats row from My Shop |
| ✅ In | **Nudge to add collections** ("Hey, add collections") | Notes: Nudges | Where it shows isn't decided |
| ✅ In | **Reviews keep the old layout** | Notes: Reviews; Q6 | The current two-card sliding section (`StorefrontReviews`, Figma `957:29042`), now inside the **Posts** tab. The design's new review cards (`05.1`) are **dropped** |
| ✅ In | **Tabs: Posts and Picks** | Client's latest comment; Q6 | Posts holds reviews only in the MVP. Picks is the product grid |
| ✅ In | **"View product/collection" link in notifications** about a creator's new collection or product | Notes: Notifications | Who receives them isn't decided |
| ✅ In | Collections section on the storefront | Collections (`T-31`) | Already designed |
| ❌ Out | Custom banner uploads, and the admin approval/moderation they'd need | Notes: Backdrops, MVP Scope | Moderation rules to be clarified post-MVP |
| ❌ Out | Posts | User, 2026-10-16; Notes: Post-MVP | Including posts inside a collection |
| ❌ Out | Merging content and reviews, with filters | Notes: Post-MVP | |
| ~~❓ Open~~ | ~~The design's tab bar (All Picks / Posts / Reviews)~~ | — | Replaced 2026-10-16 by Q6: the tabs are Posts and Picks |

**After the design is locked:** add collections and banners to the prototype (notes, Follow-Up Actions).

### Missing designs (needed before the build)

The `2383:87224` section only shows what **shoppers** see. There are no MVP designs yet for:
1. **The creator side**, the meeting notes' "Define the flow for featuring collections and products in the profile banner": the creator picks the backdrop, chooses the featured collections or products, writes the product line, and opens the preview. The Work File's `Customise Shop` section `3139:88043` was drawn for the post-MVP options (tab order, pinned reviews, announcement bar) and has only its first flow. It doesn't match this scope. The main file's Collections copy `1862:81644` (checked 2026-10-16) has no personalization screens either.
2. **The collections nudge**.
3. **The notification** with its "View product/collection" link.
4. **My Shop without the stats row**.
5. **Empty and edge states**: no featured items, a collection with fewer than three products, a featured item removed from the shop or unpublished.
6. **The storefront with Posts and Picks tabs**, with the old reviews layout inside Posts (replaces "the storefront without the tabs", 2026-10-16).
7. **Mobile** versions of every frame.

### Code it would touch

- `src/shop/components/StorefrontProfileCard.tsx`: the banner, backdrop and featured cards beside the profile card
- `src/shop/screens/StorefrontPreview.tsx` and `src/shop/screens/StandaloneStorefront.tsx`: the banner, plus the All Picks / Reviews tabs
- `src/shop/components/StorefrontReviews.tsx`: Reviews becomes a tab instead of a section
- My Shop (`src/shop/`): the creator's controls, once they're designed
- A new persisted record for the featured items, the product lines and the theme (localStorage, like the other `*-status.ts` modules)

### Requirement R1: backdrops scale to 10+ (2026-10-19)

> User: *"in future there can be 10+ themes comes so this designs should be scalable to that"*

The backdrop picker is a component with category filters (All / Classic / Seasonal), a scrolling strip and a collapsible grid. A new theme is a new thumbnail, with no layout change. Built as `Backdrop picker` / `Backdrop tile` (Work File, Dev Handoff › 17), and used on every picker screen.

### Requirement R2: the default backdrop is Plain #FFFFFF (2026-10-19)

> User: *"default should be plain FFF"*

A banner with no backdrop picked is plain white (#FFFFFF). **Plain** is the first preset in every picker, tagged "Default" and selected by default. Ripple Lines is an ordinary Classic preset. This replaces the earlier design, where Ripple Lines was the default.

### MVP open questions

Each one will be asked on its own, with lettered options. The meeting notes settled part of the original list (2026-10-16).

1. Where does the creator choose the backdrop and featured items?
   **Answer (2026-10-16): an edit panel in the storefront preview.** An "Edit banner" button on the preview opens a panel where the creator picks the backdrop, then up to 2 featured items, so editing and previewing happen in one place. The other options were a Customise Shop page under My Shop, or featuring each item from its own ⋮ menu.
2. Can the banner mix one collection and one product?
   **Answer (2026-10-16): yes, any 2.** Up to 2 items of either kind: 2 collections, 2 products, or 1 of each. The 1 + 1 layout needs designing. The other options were same kind only, or a single item.
3. ~~Who sets the seasonal theme?~~ **Partly answered by the notes:** backdrops are URMEI presets with "preset updates", and there are no custom uploads. Still open: does a seasonal preset switch on for every shop automatically, or only when the creator picks it? And which presets are there at launch?
   **Answer (2026-10-16): the creator picks.** URMEI adds seasonal presets to the backdrop list, and a shop changes only if its creator chooses one. Nothing is switched on automatically, so URMEI needs no scheduling control. The other options were automatic for every shop, or automatic with an opt-out. Still open: which presets are there at launch.
4. What does the banner show when nothing is featured: only the profile card, or the collections nudge?
   **Answer (2026-10-16): the profile card only.** Shoppers see just the profile card on the backdrop. In the creator's preview, the empty slot shows a dashed "Feature a collection or product" prompt that opens the edit panel. The other options were filling the slot automatically, or showing the collections nudge there.
5. Is the featured product's line required, and how long can it be?
   **Changed 2026-10-19 (user): removed from the MVP.** Asked "Creator line, do we need this?", the user chose to remove it. The picker has no "Why you love it" field, there's no line-missing error, and the product card shows image, brand, name and Shop Now. The original answer is below.
   **Answer (2026-10-16): required, up to 80 characters.** The creator writes the line when featuring the product and can't save without it, so every featured product card matches the design. This needs a "required" error state and a 0/80 counter in the edit panel. The other options were optional (80 characters) or no line in the MVP.
6. Do the storefront tabs go, now that Posts is out and Reviews keeps its old layout?
   **Answer (2026-10-16, from the client's latest comment, relayed by the user; the comment isn't recorded verbatim yet): two tabs, Posts and Picks.** In the MVP, the **Posts** tab holds only the creator's reviews, in the old layout. Creator photo, video and note posts join the same tab post-MVP, so "Posts not in the MVP" still holds. **Picks** is the product grid (today's All Picks). The user gave the order as "Posts, Picks". **Follow-up answer (2026-10-16): Picks opens first.** Shoppers land on the product grid, with Posts one click away (the other option was Posts first). Still to confirm: the tabs' exact labels. The other options were removing the tabs, All Picks + Reviews tabs, or one tab with Reviews below.
7. Where does the "add collections" nudge show (My Shop, Home, the storefront preview), and when does it stop?
   **Answer (2026-10-16): on My Shop, until the first collection.** A creator with no collections sees a dismissible banner on My Shop. It disappears once they create their first collection or dismiss it. The other options were Home plus My Shop, or the storefront preview only.
8. Who receives the new-collection or new-product notifications (the creator, or shoppers who follow the creator), and where does the link go?
   **Answer (2026-10-16): followers.** Shoppers who follow the creator are notified, and "View product/collection" opens that item on the public storefront. **Dependency:** this portal has no shopper-side notifications today (the bell drawer is the creator's), so the shopper surface needs designing, or it belongs to the shopper app. The other options were the creator's own bell, or both.
9. Which stats are hidden: just My Shop's stats row, or any others?
   **Answer (2026-10-16): only My Shop's stats row.** The five-metric row comes off My Shop. Home keeps it, and the stat pages and product stats stay reachable from Home. The other options were also removing the product performance card, or hiding storefront stats only.

### Proposed flow order (2026-10-16, awaiting approval)

All the flows go in one new top-level section on the Work File's flows page `2650:50683`: `[Influencer] Shop Personalization (MVP) | 16.10.26`. Each flow is a numbered sub-section, desktop first, in creator-journey order. One flow is built and approved before the next is started.

| # | Flow | Who | Screens (draft) | Based on |
|---|---|---|---|---|
| 01 | My Shop: stats row removed and the collections nudge | Creator | My Shop without the stats row → the nudge banner (no collections) → dismissed → gone after the first collection | Q7, Q9 |
| 02 | Open the banner editor | Creator | Row 1: My Shop **Edit Banner** button → panel. Row 2: My Shop → Preview Storefront → empty banner slot with the dashed prompt → "Edit banner" opens the panel | Q1, Q4; Edit Banner button (2026-10-16) |
| 03 | Change the backdrop | Creator | Panel: backdrop presets, including seasonal (Ripple Lines is the default) → select → Save → the preview updates | Q3 |
| 04 | Feature a collection | Creator | Panel: "Add featured item" → pick a collection → Save → the banner shows one collection | Q2 |
| 05 | Feature a product | Creator | Pick a product → the required line with 0/80 → errors (required, too long) → Save → the banner shows the product | Q2, Q5 |
| 06 | Two featured items | Creator | 2 collections, 2 products, 1 + 1; at the limit the add button is disabled ("Maximum 2") | Q2 |
| 07 | Remove or replace a featured item | Creator | Remove from the panel → Undo toast → the banner falls back to 1 item or the profile card only | Q4 |
| 08 | Storefront tabs: Picks and Posts | Shopper | Picks opens first → the Posts tab with the old reviews layout → Posts empty state | Q6 |
| 09 | Featured item no longer available | Both | A featured product removed from the shop, a collection deleted, or the shop unpublished → what the banner and the panel show | Edge cases |
| 10 | Follower notification | Shopper | The notification "<Creator> added a new collection/product" → View product/collection → the item on the storefront | Q8; **on hold** until following is confirmed for the MVP |

Mobile follows once desktop is approved.

### Update log

Every change to this request is recorded here, newest first, with the date, what changed and its source. See `workflows/change-request/SKILL.md`, "Keep the md files current".

| Date | Change | Source |
|---|---|---|
| 2026-10-19 | Review round on the new page `3350:84583` (Neethu, the user, and Claude's self-review). Every Figma comment was handled On it → Fixed → Closed (never resolved). Main decisions: the profile card colour is `surface/secondary/300` on Home, My Shop and the e-commerce storefront; the profile card order is name → @handle → stats → bio → Follow / Copy Shop Link; the Featured empty copy is "You can select any two products or collections to feature. These will be displayed alongside the banner in your shop."; featured cards fill the profile card's height, and a single shopper card uses `Featured slot` Size=Tall; picker checkboxes are the stock `_checkbox` on a white chip; the picker empty state follows the portal empty-state style (main file `1862:87349`); no Clear Search button (the field's x clears); no gallery count label; dialogs follow the main file's `1862:87536` (16/24 header and footer, `Body/body-xl-bold` title). Full list in `FLOWS.md` | Figma comments |
| 2026-10-19 | Shopper storefront layout changed: **Favorite Picks is no longer on the storefront**. The order is now banner (backdrop + featured items) → Collections (the e-commerce `Section / Collections` `3351:191187`, with Favorite Picks' gradient, transparent to #F2EFED) → All Picks. Applied to frames 05.3 and 06.1–06.3. `Featured slot` cards follow the main file's Banner card `2383:87286`. Collection pick tiles' checkboxes got a border and shadow so they show on photos | User, Figma comments |
| 2026-10-19 | New page "Personalisation — Backdrop & Featured Items" `3350:84583`: flows 01–02 copied, new flows 03 Search in the Picker, 04 Nothing to Feature Yet, 05 Featured Item No Longer Available, 06 Shopper's View; frames 200px apart; simpler cover text; components moved there in build order; new `Picker empty state` and `Featured slot` `State=Unavailable`; Change Backdrop button stroke. Details in `FLOWS.md` | User in chat |
| 2026-10-16 | `REFERO-PROMPT.md` output switched to **Refero's own screen format**, verbatim as `refero_get_screen` returns it (example the user pasted: Column `77562542-…`), plus a `Relevance to URMEI` block per screen. This replaces the ScreenSpec-template version written earlier the same day | User, in chat |
| 2026-10-16 | (Replaced, see above) `REFERO-PROMPT.md` asked for each screen as a **ScreenSpec** (the Vonnue `screenspec` template: tags, Colors, Description / Layout / Functions, Site), plus a "Relevance to URMEI" block, saved to `refero-screenspecs.md` | User, in chat |
| 2026-10-16 | Wrote `REFERO-PROMPT.md`: a Refero MCP prompt (8 patterns A–H, from side-panel customiser to seasonal theming) and quick search-box queries, following the Vonnue design skills' Refero format | User, in chat |
| 2026-10-16 | **Edit Banner button on My Shop** (user's answer to "how does the creator know the banner is editable?"): a permanent outlined Edit Banner button in the shop card, beside Preview Storefront, opens the preview with the panel open. Flow 02 now has two rows (Edit Banner; Preview → empty slot) and was renumbered 02.1–02.4 (table in `FLOWS.md`). The other options were a one-time announcement banner, both, or a mini banner preview in the card | User, in chat |
| 2026-10-16 | **Flow 02 built** (desktop, awaiting approval) on the `Personlisation` page (user's choice), section `[Influencer] Shop Personalization (MVP) | 16.10.26` `3225:139064`, sub-section `3230:53715`: `02.0`–`02.3` and 3 Info annotations. Details in `FLOWS.md` | Us, build |
| 2026-10-16 | The user asked to build flow **02 Open the banner editor** first. **Blocked before any write:** the Work File no longer has the flows page `2650:50683` or the `Shop Personalization` page `3144:112253`. A new page, `Personlisation` `3223:139063`, holds one empty `Section 1` `3225:139064`. The locked `2320:42706` is still there. Nothing was written; waiting for the user to say where to build | Us, read-only check |
| 2026-10-19 | The Add featured items picker has no preview (comment); merged "Customize banner" iteration `3347:90174` (backdrop row + featured grid on one screen) posted in the thread | Figma comments |
| 2026-10-19 | Comment round 2: Collection Card in the My Shop row, overlay text size, preview / banner spacing (identity centred), ring radius 11. Storefront banner component (Featured None / One / Two, exposed Backdrop) replaces all 20 preview banners | Figma comments; user, in chat |
| 2026-10-19 | Comment: Collection Card component used for the picker's Collections tab; picker grid fixed to 3 per row. New standing rule "components first" (every reusable thing is a component) added to `workflows/_shared/workfile.md` and the change-request workflow | Figma comment; user, in chat |
| 2026-10-19 | Experimental single "Customize banner" modal (Backdrop + Featured items tabs, one Save), section `3338:67999`. Comment fixes on 02.3: the selected-tile ring and the preview's shopper view (Featured items `Show header`) | User, in chat and Figma comments |
| 2026-10-19 | Flow 01 Change Backdrop marked **fixed**. Flow 02 rebuilt: one Featured items card (pick up to 2 together, edit to change); the picker restyled like the backdrop gallery (live preview, search, Collections/Products, tile grid). New components: Featured items, Featured pick tile. Figma comments set up as the trigger for work (polling watcher, replies prefixed "🤖 Claude:") | User, in chat |
| 2026-10-19 | Lead review requested: message drafted with links to `01 - Change Backdrop` `3321:24529` and `02 - Add Featured Items` `3321:84338` | User, in chat |
| 2026-10-19 | Follow and Copy Shop Link removed from the banner in the creator portal: new `Show shopper actions` boolean on Banner content, off on all 30 My Shop instances (primary screen included), kept on in the 12 gallery previews | User, in chat |
| 2026-10-19 | Collection board component (Order First / Middle / Last; text props) made from the My Shop collection card; all 45 copies on the page replaced with instances, keeping their text, images and order | User, in chat |
| 2026-10-19 | Gallery previews never show Change Backdrop: Show Change Backdrop is off on all 11 Banner content instances inside `Banner preview` frames (the preview is the shopper's view) | User, in chat |
| 2026-10-19 | **`3287:33154` is the primary screen.** New section `Primary Flows` `3321:24528`: flow 01 Change Backdrop (6 frames, using the Backdrop component; Soft Dots → Valentine's Day) and flow 02 Add Featured Items (7 frames, two slots, remove with Undo), all cloned from the primary. The older 01/02 sections are marked superseded. The flows use Shop details = Published (the primary shows "No products", flagged) | User, in chat |
| 2026-10-19 | User's full My Shop layout `3287:33154` tidied: token gaps (title → shop card `spacing/lg` 24, banner → tabs `spacing/xxl` 32, bottom `spacing/5xl` 64; changed from 28 / 36 on request), the backdrop stretches with the banner, the content toolbar fills, layers renamed (`My shop — Desktop`, `Page content`, `Shop body`, `Shop banner`) | User, in chat |
| 2026-10-19 | Backdrops section: 12 full-size backdrop components (1200 × 518) on the user's canvas; Banner content gets a Show second slot boolean (1 or 2 featured items) | User, in chat |
| 2026-10-19 | Q5 changed: the creator line on featured products is removed from the MVP (was required, 80 characters). Featured slot content updated (data, empty-slot copy, text properties) | User, in chat |
| 2026-10-19 | Shop details built as its own component (Published / Published with edits / Never published / No products) and used in flows 01–02; kept out of Banner content | User, in chat |
| 2026-10-19 | Flow 02 Add Featured Item built on My Shop (8 frames: pick a collection, pick a product with its line, the error, both full, remove with Undo); new Featured slot component (Empty / Collection / Product) nested in Banner content | User, in chat |
| 2026-10-19 | Change Backdrop renumbered as flow **01**; its banners use the Banner content component; Change Backdrop moved into the component (Toolbar row, Show Change Backdrop boolean). Flow **02 Add Featured Item** started | User, in chat |
| 2026-10-19 | Full Change Backdrop flow built with the gallery (option B), starting from idea 1's Shop card: open, Soft Dots previewed, applied with Undo, Seasonal filter, discard confirm. Section 13 `3302:17696` | User, in chat |
| 2026-10-19 | Banner content made a responsive component set (Desktop / Mobile, text props); URMEI logo restored before the follower count on all 31 banners; @handle moved next to the name; gallery previews use the component on the Soft Dots backdrop | User, in chat |
| 2026-10-19 | Empty banner shows two featured slots (Slot 1 of 2, Slot 2 of 2), each with its own Add Featured Item, in `3287:18332` | User, in chat |
| 2026-10-19 | R2: the default backdrop is Plain #FFFFFF. Plain thumbnail set to #FFFFFF, Plain first, tagged Default and selected in every Backdrop picker variant; 29 default banners on the page lost the ripple pattern; gallery tiles and the idea 4 strip updated | User, in chat |
| 2026-10-19 | Gallery preview rebuilt with auto layout (backdrop layer, profile card, featured slot; URMEI text styles and tokens) in 12.1 and 12.2 | User, in chat |
| 2026-10-19 | Gallery option B (centred modal) liked; the preview bezel replaced by a light hairline border in both options | User, in chat |
| 2026-10-19 | Change Backdrop gallery built as two options (full-page modal, centred modal) after a Windows-style theme reference: live preview on the left, a big-tile grid on the right, Apply Backdrop. Section 12 `3288:15466` | User, in chat (screenshot) |
| 2026-10-19 | All 43 annotation cards converted into Figma's built-in annotations (Info category) on their layers; the picker radios (04.2, 05.1, 05.2) now use the portal's radio button component | User, in chat |
| 2026-10-19 | Idea 1: the Shop details row (URL, Last Published, Preview Storefront, View Shop) moved above the banner in the Shop card | User, in chat |
| 2026-10-19 | Change backdrop approved: the scalable Backdrop picker strip on the banner (flow 03, and the same picker in idea 1's 11.2) | User, in chat |
| 2026-10-19 | R1 added: backdrops must scale to 10+. Built the Backdrop picker (Strip / Grid / Grid expanded) and Backdrop tile components with 12 presets (7 placeholders), and swapped them into 17 screens | User, in chat |
| 2026-10-19 | Idea 1: the banner's Follow button hidden on My Shop (a creator can't follow their own shop) | User, in chat |
| 2026-10-19 | Idea 1 fix: the merged Shop URL field restored with its copy icon (the merge had dropped it), and the banner's Add Featured Item button shown again (hidden by mistake) | User asked how to copy the link |
| 2026-10-19 | Idea 1: the banner's Copy Shop Link hidden on My Shop; the shop link shows once, in the Shop details row | User, in chat |
| 2026-10-19 | Idea 1: the live banner and the store card merged into one Shop card (banner on top, URL / Last Published / Preview Storefront / View Shop row under it), because both showed the photo and name | User, in chat |
| 2026-10-19 | 7 ideas for editing the banner from My Shop (live banner, Banner tab, card menu, shop card strip, side drawer, toast after adding, setup checklist) built as section 11 `3270:5623`, in lead review | User asked in chat ("build every idea") |
| 2026-10-19 | Flows 03–07 built in option B (backdrop, feature a collection, feature a product with its line and error, two items, remove with Undo): 21 frames, 5 covers, 16 annotations. The page was marked for review ("— Lead Review" in the section names) and renamed to the guidelines (16 section, cover and frame names, 1,773 inner layers) | User asked in chat; design |
| 2026-10-19 | Edit Banner editor: **option B (edit on the banner) chosen**; the full flow is to be built in that style. Replaces the overlay panel `02.2` as the editor (the 2026-10-16 Q1 answer, "a panel inside the storefront preview", now reads "edit mode on the banner inside the storefront preview") | User, in chat |
| 2026-10-19 | Three Edit Banner editor options added to flow 02 (`02.5` A docked panel, `02.6` B edit on the banner, `02.7` C dialog with preview), under the approved rows; one to pick | User asked in chat; design |
| 2026-10-19 | Flow 01 built as three options in sub-section `3250:17341`: A page banner, B promo card, C Collections tab coach mark, plus the nudge-gone state. Proposed: the default Favourites collection doesn't end the nudge. Flow 02 moved below 01 | Design |
| 2026-10-19 | Flow 02 (Open the banner editor) approved. Flow 01 next, as three design options for the collections nudge | User, in chat |
| 2026-10-16 | Proposed a 10-flow order for the MVP designs (awaiting approval); flow 10 is on hold until following is confirmed | Us, proposal |
| 2026-10-16 | Q8 answered: followers get the notification, and the link opens the item on the public storefront (needs a shopper-side surface). Q9 answered: only My Shop's stats row is removed. All 9 MVP questions answered; `ANSWERS.md` written | User, in chat |
| 2026-10-16 | Q6 follow-up: Picks opens first. Q7 answered: the collections nudge is a dismissible banner on My Shop, shown until the first collection | User, in chat |
| 2026-10-16 | Q6 answered from the client's latest comment: tabs are **Posts** (reviews only in the MVP, in the old layout) and **Picks**. Posts content stays post-MVP. Open: which tab opens first, and the client comment verbatim | User, relaying the client |
| 2026-10-16 | Q5 answered: the featured product line is required, up to 80 characters | User, in chat |
| 2026-10-16 | Q4 answered: with nothing featured, shoppers see only the profile card; the creator's preview shows a dashed prompt that opens the edit panel | User, in chat |
| 2026-10-16 | Q3 answered: seasonal backdrops are presets the creator picks; none switch on automatically | User, in chat |
| 2026-10-16 | Q2 answered: the banner takes any 2 items, including 1 collection + 1 product (that layout still needs designing) | User, in chat |
| 2026-10-16 | Q1 answered: the backdrop and featured items are edited in a panel inside the storefront preview ("Edit banner") | User, in chat |
| 2026-10-16 | Meeting notes of 10 Oct 2026 (11:00) added verbatim as the MVP requirement. Scope table rewritten. **Changes from the design:** Reviews keep the old layout (the new Reviews tab is dropped); custom uploads and admin approval are out. **New in scope:** preview, hidden shop-page stats, collections nudge, notification link. Open question 3 partly answered; questions 6–9 added; missing designs 2–6 added | Meeting notes, pasted by the user |
| 2026-10-16 | The user shared the main file's `[NEW] Collections | 07.10.26` `1862:81644` as the new creator portal designs. It's the Collections client copy (`T-31`; flows 01–21 match `change-requests/collections/FLOWS.md`). It's what a featured collection's View Collection opens (16.2 Collection page `1862:82265`), but it has **no personalization screens**: nothing to pick featured items, write a product line or set a theme. So "Missing designs" item 1 is still open | User, in chat |
| 2026-10-16 | MVP scope added from the main file's `2383:87224`. Posts is out of the MVP. Opened `T-38` | User, in chat |

## Client thread (verbatim)

Nelson Seh (client), replying to Neethu KU:

> @Neethu KU It would also be great if you can draft a post MVP flow to envision this with creators being able to add their own photo/video content like Pinterest. Add some personalization features for background banners, etc. An example to use as a reference is we want creators to be able to curate their own shop like how a physical shop layout works. When you enter a shop, normally what shops do is they place the newest/freshest products right in front of the entrance depending on what they want to promote. And the whole ambience of the shop can also be decorated based on an ongoing promotion or seasonal holiday. that's the general idea we want to bring to life

Neethu KU, 3 days ago:

> @Nelson Seh sure, we can do that. Just one clarification: which component are you referring to as the background banner in your comment?
> Currently, we don't have a banner component in the design.

Nelson Seh, 3 days ago:

> @Neethu KU was referring to the grey background banner in the creator's profile that we show on the creator's shop. But if you have other ideas for personalizing the shop please suggest as well. that idea was just top of mind

Neethu KU, 3 days ago:

> I understand what you're trying to achieve. Let me brainstorm and come up with a few ideas to achieve this goal.

## What was asked

A **post-MVP draft flow**, a vision piece rather than a build commitment. The goal is to let a creator curate their shop the way a physical store is laid out.

| # | Idea | Source |
|---|---|---|
| 1 | Creators add their **own photo and video content**, Pinterest-style, alongside products | Client |
| 2 | **Personalise the background banner**: the grey panel behind the creator's profile card on the storefront (`StorefrontProfileCard`, `bg-surface-secondary-300`) | Client, clarified |
| 3 | **"Front of the store"**: the creator chooses what shoppers see first (the newest products or a current promotion) | Client, via the shop analogy |
| 4 | **Seasonal or promotional theming**: the shop's whole look changes for an ongoing promotion or holiday | Client, via the shop analogy |
| 5 | **Other personalisation ideas from us**: the client explicitly invited suggestions | Client |

Our side has committed to brainstorming ideas and coming back with options.

## Relation to agreed Collections answers

- Collections are ordered by the creator with ‹ › arrows, and there's no hide feature. A "front of the store" slot (#3) has to sit alongside that order, not contradict it. Flag any conflict before designing.
- Collections have no cover image (first few product images). Photo/video content (#1) may reopen that.
- The Collections MVP doesn't cover stats or the activity log. The same goes for this request unless the client asks.

## Concept board (2026-10-12)

An HTML concept board for internal review, built before any Figma work: https://claude.ai/artifact/8B7nPcVULVqEfVUv9mVU9m (private until shared). It shows six concepts on a live storefront mock, with a desktop/mobile toggle:

| Key | Concept | Answers | Effort | Suggested |
|---|---|---|---|---|
| A | Custom banner (colour, pattern, photo) | Client: background banner | S | Phase 1 |
| B | Shop window (1–3 products under the profile, each with the creator's note; see below) | Client: newest products at the entrance | M | Phase 1 |
| C | Seasonal themes (URMEI-made: banner, accent, promo ribbon, dates) | Client: decorate for a promotion or holiday | M | Phase 2 |
| D | Posts (Pinterest-style photos, videos and notes with product tags) | Client: photo/video content | L | Phase 3 |
| E | Shop floor plan (reorder sections with arrows, toggle optional ones) | Our idea | S | Phase 1 |
| F | Announcement bar (one line, up to 80 characters, end date) | Our idea | S | Phase 1 |

The phases are a suggestion and haven't been agreed with the client.

**Shop window, version 2 (2026-10-12):** redesigned on the board (`#window` opens it directly).
- **Layouts:** three to choose from.
  - **Spotlight** (default): the creator's photo on the left with the headline and end date, and a "shelf" of product cards on the right.
  - **Trio:** three equal tiles, each with the creator's note over the image.
  - **Single feature:** one hero product with the note as a quote, Add to bag and View product, and "Also in the window" thumbnails.
- **Creator notes:** a one-line note per product, in the creator's own words.
- **Label:** New in, Back in stock, On sale or Limited. A running seasonal theme overrides it.
- **End date:** tomorrow, in n days, or none.
- **Buying:** Add to bag straight from the window, with sale prices shown crossed out.
- **Mobile:** Spotlight and Single feature stack, and Trio becomes a swipeable row.

It isn't in Figma yet. Spotlight would be flow 04.

## Figma (Work File)

Top-level section `[Influencer] Shop Personalization (Post-MVP) | 12.10.26` `2903:78274` on the flows page `2650:50683`. It's a draft for review, not locked.

| Flow | Sub-section | Frames | Status |
|---|---|---|---|
| 01 - Posts on the Storefront (concept D) | `2903:78275` | `01.0` Cover `2903:78276` · `01.1` Storefront With Posts — Desktop `2903:78285` (cloned from Collections 16.1 `2757:65132`, which matches the main file's `1862:82376`) | Desktop draft, 2026-10-12. No mobile yet. |
| 02 - Announcement Bar (concept F) | `2910:78536` | `02.0` Cover `2910:78537` · `02.1` Storefront With Announcement — Desktop `2910:78546` (from 16.1 `2757:65132`) | Desktop draft, 2026-10-12. No mobile or creator-side editor yet. |
| 03 - Custom Banner (concept A) | `2921:78784` | `03.0` Cover `2921:78785` · `03.1` Photo Banner — Desktop `2921:78798` · `03.2` Colour Banner (Sage) — Desktop `2921:79268` | Desktop draft, 2026-10-12. Done as instance overrides on the `Influencer Profile Card`; a real build would add a banner property to the component. No pattern banner, mobile or creator-side picker yet. |

**Lead review section (2026-10-12):** `[Influencer] Shop Personalization (Post-MVP) — Lead Review | 12.10.26`, `2996:103805`. It's the user's own section. Its flows run left to right, each with a cover:
- **01 Posts:** cover `2903:78276`, frame `2903:78285`, 4 annotations.
- **02 Announcement Bar:** cover `2910:78537`, frame `2910:78546`, 2 annotations.
- **03 Persistent Banner:** cover `3000:80673`, then:
  - `03.1` Photo Backdrop Behind Card `2996:102574`: the recommended direction. A full-width photo behind the profile card, with the card untouched. 2 annotations, `3000:80682` and `3000:80688`.
  - `03.2` Photo Inside Card `2996:103398`: shown as an alternative for comparison. It changes the card, which is why it isn't recommended. 1 annotation, `3000:80694`. Its header and breadcrumb order was fixed.

The old section `2903:78274` now holds only `03 - Custom Banner` `2921:78784`.

In 01.1, `Section / Posts` `2903:78750` sits between Collections and Reviews. It's a 4-column wall of photos, videos (play button and length) and text notes. Photos carry product-tag dots, and each post has a "Shop n products" row. Four Info annotations explain it.

**Review meeting (2026-10-12):** the banner stays **persistent**: it is always on the storefront, and creators can't remove it. Only its vibe changes. **The `Influencer Profile Card` itself is never changed** (user, 2026-10-12): every theme is a layer placed *over* the card. The card keeps its grey `surface` fill, bound to its variable, and all its content.

- **`01.1` `2983:100162`, default vibe:** `Banner Overlay / Warm (over card)` `2992:80216` is an absolute frame above the card in `Stack / Charlotte`. Its warm gradient is in Multiply blend and transparent on the left, so the avatar and text are untouched.
- **`01.2` `2989:79952`, Chinese New Year:** placed to the right of `01.1`. The team's reference, `2981:113463`, turns the whole top of the page red: a campaign strip, a red band around the card, arcs and coins. This version keeps the season inside the banner instead. `Season Overlay / Chinese New Year (over card)` `2989:80327` sits above the card and holds:
  - a blush gradient (Multiply), fading in from the right
  - a gold coin-ring lattice (Multiply, masked so it fades out before the name)
  - two lanterns hanging from the top edge
  - a `Season chip` `2989:80570` reading "Chinese New Year Edit · until 21 Feb", with the library sparkles icon
  
  Nothing else on the page changes. Two annotations, `2990:80230` (left) and `2990:80236` (right), cover: the banner is persistent and only its look changes; URMEI supplies the themes; the theme switches off on its end date; the art stays on the right so the text remains readable.

- **`01.1` clean copy `2991:100937` (user's frame, 2026-10-12), the current direction:** the season goes **outside the banner**, never on the card. `Season Backdrop / Chinese New Year (behind card)` `2995:80455` is an absolute frame at the back of the page frame, from under the header to 36px below the card. It holds:
  - a gradient that starts light behind the breadcrumb, so it stays readable, and turns lacquer red from the card's top edge
  - a gold coin-ring lattice and two lanterns on each side of the card
  - a `Season ribbon` in the gutter under the card: "Chinese New Year Edit · Charlotte's picks for the season · Until 21 Feb"
  
  The card `2991:100979` and its contents are untouched. The earlier on-card overlay, `2993:80462`, was removed.

**Background themes board (2026-10-12):** `[Influencer] Shop Personalization — Background Themes | 12.10.26`, `3019:81003`, below the lead review section. Each tile is a 1440 × 500 crop of the clean storefront `3001:103829`. The theme is a `Backdrop / … (behind card)` frame, 372px tall, placed absolute behind the page from under the header to 56px below the card. The card is untouched. Art sits in the side gutters and the strip under the card, and the area behind the breadcrumb stays light. Every tile has an Info annotation. All art is vector, with no AI images (user's choice).
- **`04 - Default Backdrops` `3019:81004`:** cover `3019:81005`. Six tiles:
  - Warm Linen `3019:81014`
  - Botanical Line `3019:81395`
  - Soft Arches `3019:81770`
  - Creator Tint `3019:82145` (colours taken from the creator's photo)
  - Silk Wave `3019:82520`
  - Speckle `3019:82895`
  - Nine more patterns, added later the same day on a flat pale base with no top fade:
    - Awning Stripes `3027:82320`
    - Gingham `3027:82398`
    - Polka Dots `3027:82501`
    - Ripple Lines `3027:82966`
    - Foam Bubbles `3027:83048`
    - Petal Blooms `3027:83245`
    - Glow Sparkles `3027:83530`
    - Monogram `3027:83642` (the creator's initial)
    - Sunburst `3027:83865`
    
    Sections 05 and 06 moved down to make room.
- **`05 - Seasonal Backdrops` `3019:83270`:** cover `3019:83271`. Six tiles, each with a `Season ribbon` (a clone of the season chip) under the card:
  - Chinese New Year `3019:83280` (redrawn in this system)
  - Christmas `3019:83655`
  - Hari Raya `3019:84030`
  - Deepavali `3019:84405`
  - 11.11 Mega Sale `3019:84780`
  - Valentine's Day `3019:85155`

- **`06 - Backdrop Edge Alternatives` `3023:81841`:** alternatives to the top fade from the page colour into the theme colour, all on Chinese New Year. Cover `3023:81842`. Five tiles:
  - Current Top Fade, for reference `3023:81851`
  - Hard Split: colour from the card's midline `3023:82079`
  - Full Bleed + Light Breadcrumb `3023:82308`
  - Shaped Edge: scallops at the card's top `3023:82614`
  - Framed Panel: a rounded inset panel with a white breadcrumb `3023:82843`

**Shortlist (user, 2026-10-12):** the user's own `Section 1`, `3028:68275`, holds copies of the chosen tiles:
- **Defaults:** Speckle `3026:65896`, Botanical Line `3026:66193`, Gingham `3028:66957`, Petal Blooms `3028:67110`, Ripple Lines `3028:67445`.
- **Season:** Valentine's Day `3028:68106`.
- **Edges, both on Chinese New Year:** Full Bleed + Light Breadcrumb `3028:67577` and Hard Split `3028:67859`.

The Botanical Line copy's art was redrawn on 2026-10-12, inside its backdrop `3026:66194`:
- **Sprigs:** leaves are attached along a curved stem, each with a midrib, plus a tip leaf.
- **Eucalyptus:** a round-leaf sprig.
- **Citrus:** slices with a rind, pith and eight segments.
- **Droplets:** upright, with a highlight.
- **Spacing:** motifs keep an even minimum distance in the gutters and strips, and none are clipped at an edge.

The Petal Blooms copy `3028:67110` was also redrawn, inside its backdrop `3028:67111`:
- **Flowers:** five separate petals, each with a pointed base and a rounded tip, a fine petal line, a centre and five stamen dots.
- **Variety:** buds with sepals, and sage leaf pairs.
- **Spacing:** the same even spacing as Botanical Line, with no clipping and the breadcrumb left clear.

The Valentine's copy `3028:68106` got a new gradient in its backdrop `3028:68107`. The cream strip and the sudden switch to pink are gone, and so is the muddy rose at the bottom. In their place:
- A full-bleed blush gradient from `#FCE7EB` to `#F9D3DA` to `#F4BCC7`.
- Three soft radial glows: deeper rose at the bottom right, rose on the left, and a white lift at the top centre.

The breadcrumb stays dark and readable on the light top.

Not yet drawn: mobile, and the creator's opt-out control.

**Client delivery section (2026-10-13):** the user's `Section 3`, `3086:71893`, is now `[Influencer] Shop Personalization (Post-MVP) — Client Delivery | 13.10.26`. It holds seven numbered sub-sections, stacked 200px apart, each opening with a cover:

| Flow | Sub-section | Contents |
|---|---|---|
| 01 - Posts on the Storefront | `3089:84676` | Cover `2903:78276`, `01.1` `2903:78285`, 3 annotations |
| 02 - Announcement Bar | `3089:84677` | Cover `2910:78537`, `02.1` `2910:78546`, 2 annotations |
| 03 - Persistent Banner | `3089:84678` | Cover `3000:80673`, `03.1` `2996:102574` (recommended), `03.2` `2996:103398` (alternative), 2 annotations |
| 04 - Default Backdrops | `3089:84679` | New cover, plus the shortlisted tiles: `04.1` Speckle `3026:65896`, `04.2` Botanical Line `3026:66193`, `04.3` Gingham `3028:66957`, `04.4` Petal Blooms `3028:67110`, `04.5` Ripple Lines `3028:67445` |
| 05 - Seasonal Backdrop | `3089:84719` | New cover, plus `05.1` Valentine's Day `3028:68106` |
| 06 - Backdrop Edges | `3089:84735` | New cover, plus `06.1` Full Bleed + Light Breadcrumb `3028:67577` and `06.2` Hard Split `3028:67859` (both on Chinese New Year) |
| 07 - Hero Band | `3089:84757` | New cover, plus `07.1`–`07.3`: the three slides `3068:84319`, `3068:84785`, `3068:85165`. `07.4` `3097:84796` is a generic version of slide 3 ("Most loved · My most-loved picks · Shop Bestsellers"), with two Info notes: `3097:85618` says it's an exploration only, and `3097:85624` proposes how the creator manages slides (My Shop → Customise shop → Hero band) |
| 08 - All Personalization Together | `3096:84511` | Cover `3096:84512`, plus `08.1` `3096:84521`: one storefront with everything at once. It's a clone of `01.1` with the announcement bar, then the hero band (slide 1, Ripple Lines backdrop) in place of the profile card (the old card is hidden), then Collections, Posts, Reviews and All Picks. 5 Info annotations. |

Each tile in 04–06 carries a clone of its Info annotation from the Background Themes board. The hero band has no annotations yet.

Renamed frames (old → new):
- `04.6`/`04.2`/`04.8`/`04.12`/`04.10` Default Backdrop → `04.1`–`04.5` Default Backdrops
- `05.6` → `05.1`
- `06.3` → `06.1`; `06.2` keeps its number
- "Ripple Lines / Hero Band — Final — Slide n" → `07.n Hero Band — Slide n, <title> — Desktop`

The emptied sections (`2996:103805`, `Section 1` `3028:68275`, `Section 2` `3062:69715`) are hidden beside it, not deleted. The duplicate `03.1` frame `3085:85696` was moved out next to them and is still visible.

**Hero band iterations (2026-10-14):** five alternatives to the user's `Hero Band (Slide 1)` `3108:68320`, which sits loose on the flows page next to `08.1`. They're stacked 200px apart below it, each with an Info annotation on the right. The `Influencer Profile Card` and the Ripple Lines backdrop are untouched, and only the banner changes:

| # | Idea | Frame | What changes |
|---|---|---|---|
| 1 | Shoppable Spotlight | `3111:84686` | A mini shelf of 3 products (brand, name, price) and "View all products" on the slide; arrows move next to the dots |
| 2 | Split Editorial | `3111:84845` | Copy on a solid cream panel, photo on the right half, no scrim; Primary button; segmented progress bar with "01 / 03" |
| 3 | Story Tabs | `3111:84990` | Named tabs (This week's edit · New in · Gift guide) replace the dots |
| 4 | Peek Deck | `3111:85130` | Active slide 500 wide, with the next slide peeking at the right edge; arrows inside the active slide |
| 5 | Limited-time Promo | `3111:85263` | Countdown pill, dashed discount-code chip with the copy icon, "Shop the sale". Codes aren't in the product, so this needs a decision |

The user picked **2 Split Editorial** and asked for five more in that style (2026-10-14). They're stacked below iteration 5, each cloned from `3111:84845` with an Info annotation:

| # | Idea | Frame | What changes |
|---|---|---|---|
| 2.1 | Creator Note | `3113:84989` | Mirrored (photo left), the title is a quote signed with the creator's avatar and name, arrows on the photo |
| 2.2 | Arch Frame | `3113:85133` | Panel tinted to the Ripple Lines backdrop (`#E6EEF3`), photo in an arch that bleeds off the bottom |
| 2.3 | Edit Preview | `3113:85273` | Overlapping product thumbnails and "6 products in this edit" under the button; the dots move onto the photo |
| 2.4 | Night Edition | `3113:85419` | Dark panel (`#2B2826`), cream text, Secondary button, slide 2's copy and photo |
| 2.5 | Collage | `3113:85564` | One main photo plus two detail photos, like a magazine spread; arrows on the main photo |

The user then asked for five options free of the card-plus-banner layout (2026-10-14). The `Influencer Profile Card` is still unchanged in all of them, but it can move. Stacked below 2.5, each with an Info annotation:

| # | Idea | Frame | What changes |
|---|---|---|---|
| 3.1 | Magazine Cover | `3120:85296` (644 tall) | Full-width cover: 44px title on a cream panel, photo across the right half. The card moves down and overlaps the cover like a masthead |
| 3.2 | Bento Board | `3120:85485` | No carousel: all three edits as tiles (one tall, two small) beside the card |
| 3.3 | Shop Window | `3120:85646` | The client's "front of the shop": a header panel with an end-date chip, plus 3 product cards with a label (New in, Back in stock, On sale), price (sale price crossed out) and the creator's one-line note |
| 3.4 | Lookbook | `3121:85426` | Four tall cards (edit, routine, gift guide, video), Pinterest or Highlights style, with a next arrow |
| 3.5 | Watch & Shop | `3121:85587` | The creator's video (play, mute, 0:45, progress line) beside its products and "Shop the video" |

**Showcase inside the banner (2026-10-14):** the user asked for ideas that put products, collections or video in the banner itself. Base: the user's `Section / Posts` `3125:108966`, with the Ripple Lines backdrop and the unchanged `Influencer Profile Card`. Each idea is a copy stacked 200px below it. The content is a `Showcase / …` frame (508 × 152) layered over the empty middle of the grey panel, between the bio and Copy Shop Link, so the card itself isn't edited. Each has an Info annotation on the right.

| # | Idea | Frame | What's in the banner |
|---|---|---|---|
| 1 | Product Shelf | `3127:104161` | "Charlotte's picks" with View all, and 3 pinned product cells (thumb, brand, name, price) |
| 2 | Collections Peek | `3127:104199` | The first 3 collections as `Collection Card` instances (description off, +N tile), with See all |
| 3 | Watch & Shop | `3127:104258` | A 16:9 muted video (play, 0:45, mute, progress) beside its title, product thumbs and "Shop the video" |
| 4 | Story Highlights | `3127:104293` | Five round covers (New in, collections, a video with a play badge). Dark ring = new, grey ring = viewed |
| 5 | Mixed Spotlight | `3127:104328` | Three labelled tiles (Product, Collection, Video) with a scrim caption |

Icons: `play` and `volume-x` come from the DS- Icon Library (the same `play` the Posts flow uses), and `chevron-right` from URMEI. The card's avatar holds two stacked image fills: a stock photo under Charlotte's (`19e7e171…`, the top one). Copy the top one.

**Tabbed storefront (2026-10-14):** `Storefront — Tabbed Iteration | 14.10.26` `3127:292013` replaces the long scroll with one shared header and four tabs, each its own frame:
- All Picks `3127:292014`
- Collections `3127:292673`
- Posts `3127:293338`
- Reviews `3127:294003`

The header is the profile card on the Ripple Lines backdrop. Under it is a pill tab bar with counts ("All Picks (20)"). The user approved the design and asked for its personalisation options. From a list of 19, the user approved these 7 (2026-10-14):

| # | Option | What the creator controls |
|---|---|---|
| 1 | Backdrop | Pick the pattern behind the profile card (the 04 Default Backdrops set) |
| 3 | Announcement bar | One line above the header, up to 80 characters, with an end date (flow 02) |
| 5 | Tab order | The order of the four tabs |
| 6 | Landing tab | Which tab shoppers open on |
| 7 | Hide a tab | Turn off Collections, Posts or Reviews. All Picks can't be turned off |
| 9 | Default sort | All Picks opens on Newest, Best selling or Creator's order (drag to arrange) |
| 16 | Pinned reviews | Up to 3 reviews shown first on the Reviews tab |

Not taken, for now: seasonal backdrop, banner showcase, tab counts toggle, product labels, creator notes, featured collection, collection cover, pinned post, wall layout, photo reviews first, accent colour and tab intro line.

Next: the questions below, then Figma, one flow at a time.

**Tabbed storefront questions** (asked one at a time, 2026-10-14):
1. *Where does the creator change these settings?* **Answer: a Customise shop page under My Shop**, with one panel per setting and a Save button. The other options were editing on the storefront itself, or a split panel with a live preview.
2. *How do tab order and landing tab work together?* **Answer: the first tab is the landing tab.** That's one control: the creator orders the tabs and the shop opens on the first. A hidden tab can't be first. The other option was two separate settings.
3. *How does the creator reorder the tabs, and products for "Creator's order"?* **Answer: up and down arrows on each row**, matching the agreed Collections answer. The other options were drag handles, or both.
4. *What does a tab with no content show?* **Answer: an empty state.** The tab stays as long as the creator leaves it on, and shoppers see an empty-state message inside it (the main design's dashed empty-state box). The other option was hiding empty tabs automatically.

Defaults kept from the earlier annotations, not asked again: announcements up to 80 characters with an end date; Ripple Lines is the default backdrop, with the five shortlisted backdrops as the other choices; All Picks can't be hidden; up to 3 pinned reviews.

**Customise Shop flows (2026-10-14):** a new top-level section, `[Influencer] Shop Personalization — Customise Shop | 14.10.26` `3139:88043`, on the flows page at x 47000, y 1113. It has one numbered sub-section per flow, and each flow is approved before the next is started. The agreed order:
1. 01 Customise Shop Page
2. 02 Backdrop
3. 03 Announcement Bar
4. 04 Tabs
5. 05 All Picks Sort
6. 06 Pinned Reviews

| Flow | Sub-section | Frames | Status |
|---|---|---|---|
| 01 - Customise Shop Page | `3139:88044` | `01.0` Cover `3139:88045` · `01.1` My Shop Entry Point `3139:88054` · `01.2` Customise Shop Default `3140:88237` | Desktop built, awaiting approval |

- **`01.1`** is a clone of Collections `01.1` (`2750:146644`). The My Shop header gains a **Customise Shop** button (Outlined, with the `sliders-horizontal` icon from the DS Icon Library), and the cursor is on it.
- **`01.2`** is the new page. It has a breadcrumb (My Shop › Customise Shop), the title, and **Preview Storefront** at the top right, then five panels:
  - **Backdrop:** five thumbnails cloned from the shortlist. Ripple Lines is selected and marked "Default".
  - **Announcement bar:** a Message field with a 0/80 counter, and an Ends on date field.
  - **Tabs:** four rows, each with ↑/↓ arrows. The arrows use the Disabled variant at the ends of the list. All Picks is marked "Opens first" and "Always shown"; the other three have a "Show on storefront" checkbox.
  - **All Picks order:** a Sort by select set to Newest.
  - **Pinned reviews:** a dashed empty state with Choose Reviews.
- **Footer of `01.2`:** Cancel and Save Changes, with Save disabled.
- **Annotations:** three Info annotations, `3140:277981`, `3140:277993` and `3140:278005`.
- **On/off control:** there's no switch component in the libraries, so tab visibility uses the file's `_checkbox`.

## Code it would touch (later, if built)

- `src/shop/components/StorefrontProfileCard.tsx`: the banner behind the profile card
- `src/shop/screens/StorefrontPreview.tsx` and `src/shop/screens/StandaloneStorefront.tsx`: storefront layout, front-of-store slot, theming
- My Shop (`src/shop/`): the creator-side controls for banner, theme and content
- A new persisted record for banner/theme/media (localStorage, like the other `*-status.ts` modules)

## Review round (internal)

Message to Rayboy and Neethu KU, drafted 2026-10-12 (final version):

> @Rayboy @Neethu KU Some post-MVP ideas for personalising creators' storefronts, from Nelson's comment. Which 2–3 should I develop further?
>
> 🎨 https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=2903-78274
> 🧪 https://claude.ai/artifact/8B7nPcVULVqEfVUv9mVU9m

Before it goes out, the concept board has to be shared from its Share menu (it's private), and both of them need access to the Work File.

**Waiting on:** which 2–3 concepts to take further. **Then:**
1. Mobile versions of the chosen flows.
2. The creator-side screens (My Shop → Customise).
3. A client message to Nelson.

## Open questions

These are to walk through one at a time (change-request step 2) once the concepts are picked. None is answered yet. Each one comes from its concept on the board.

| Concept | Question |
|---|---|
| A Custom banner | Can creators upload any photo, or only choose from colours and patterns URMEI provides? |
| B Shop window | Are the per-product notes required, or optional with no note shown when empty? |
| C Seasonal themes | Can URMEI switch a theme on for every creator at once, for a platform-wide sale like 11.11? |
| D Posts | Do photos and videos need review by URMEI before they go live? |
| E Shop floor plan | Which sections are fixed in place, and which can creators move or turn off? |
| F Announcement bar | Can the bar link to outside websites, or only to things inside the shop? |
| All | If several are taken, should we cap how many can show at the top of the shop (announcement, ribbon, banner, window) at once? |

Defaults in the Figma annotations are proposals, not decisions: video up to 60 s and muted in place, commission on post sales, 80-character announcements that stay closed once dismissed, a 1200 × 200 banner photo, five banner colours, and automatic light text.

**Ripple Lines as a full-page theme (2026-10-14):** on the new `Shop Personalization` page `3144:112253`, below the tabbed storefront copy `3144:112254`, there's a new section, `Storefront — Ripple Lines Full-Page Theme | 14.10.26` `3149:18306`. It holds one frame, `01.1 Storefront — Ripple Lines Theme (Minimal) — All Picks — Desktop` `3149:18307`, cloned from `3144:112255`. The user asked for it to be minimal, so the theme is only:
- **Page base:** the pale ripple base (`#F5F8FA`) behind the whole page.
- **Backdrop:** the existing Ripple Lines backdrop behind the card.
- **One accent:** ink `#2F4A5C` on the active tab and the current page.
- **Ripple edge:** a thin 56px strip of ripples above the footer (`Theme / Ripple Edge`).

The header, footer, profile card and product cards are unchanged. Gutter ripples, tinted badges, ink bag buttons, outlined pills and a sign-off chip were tried and then removed for being too busy. 3 Info annotations: `3151:18676`, `3151:18779`, `3151:18725`.

**Card + edits carousel, alternative layouts (2026-10-14):** the user's `Frame 2007737799` `3147:114474` puts the `Influencer Profile Card` (597 wide) beside a 592 × 284 edits carousel. Three alternatives are stacked 200px apart below it, at x 2714, y 4600 on the `Shop Personalization` page. Each has an Info annotation:

| Layout | Frame | What changes |
|---|---|---|
| A: Hero above card | `3155:18634` | The carousel runs full width (1201 × 284) and the card sits underneath at full width |
| B: Card with edits list | `3155:18717` | The carousel is replaced by three stacked rows (thumbnail, eyebrow, title, chevron), with the current edit highlighted |
| C: Card with promo strip | `3155:18822` | The card stays full width, with a slim 112px strip under it: photo, eyebrow and title, progress, button and arrows |

**Promo strip, minimal (2026-10-14):** the user placed layout C inside `Storefront — Tabbed — All Picks — Desktop` as `3156:116451`, with the strip above the card. Its `Promo strip` `3156:116452` was then made minimal:
- **Size:** 64px tall, with a 64px photo.
- **Copy:** eyebrow and title on one line, with the title in `Body/body-md-medium`.
- **Link:** "View Product" is now a `Plain-button` text link with `chevron-right`.
- **Pager:** the progress bars are gone. `Pager` is ‹ 01 / 03 › with the arrows at Size sm.

The generic frames were renamed `Content` and `Actions`. The older copies of layout C (`3155:18822`, `3156:114728`, `3156:115014`) were left untouched.

**Centred profile storefront (2026-10-14):** built from a Refero reference the user shared: Telescope's saved-items profile (`telescope.fyi/@liambasil/saved`). It's adapted to URMEI, so it uses Charlotte's data and URMEI components, not Telescope's branding. Section `Storefront — Centred Profile (Reference: Telescope saves) | 14.10.26` `3159:18802`, to the right of everything on the `Shop Personalization` page. Frame `01.1 Storefront — Centred Profile — All Picks — Desktop` `3159:18803`, top to bottom:
1. **Header:** the URMEI header.
2. **Profile:** centred. A 128px avatar with an ink ring and a "URMEI CREATOR" badge, the name at 56px, the bio, and stats for Picks, Followers and Reviews. Then `Button` Primary "Follow" and Outlined "Copy Shop Link".
3. **Tabs:** underline tabs (All Picks, Collections, Posts, Reviews) with a full-width rule.
4. **Picks grid:** a 4-column masonry of the 8 shop products at varied image heights. Each card has a personal badge (Holy grail, Daily use, New find or Repurchased, a clone of the card `Tag`) and the Add to bag button, with the name and "brand · price" below.
5. **Footer:** the URMEI footer.

This is the first design to replace the `Influencer Profile Card` rather than layer over it, so it's an alternative to discuss, not a change to the card. 3 Info annotations: `3159:277754`, `3159:277760`, `3159:277766`.
