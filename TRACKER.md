# Work Tracker

Tick each box as the work moves forward. A row's status is its furthest ticked box.

Each task has a permanent ID (`T-01`, `T-02`, …). New tasks take the next free number, and IDs are never reused or renumbered, so a task keeps its ID as it moves between sections. Each commit message starts with its task's ID and title (`T-23: …`), so `git log --grep T-23` finds the work.

| Status | Meaning |
| --- | --- |
| ⬜ Not started | Not committed yet (idea, or edits still in the working tree) |
| 📝 Committed | Committed locally, not on the remote yet |
| ⬆️ Pushed | On `origin` (`main` or a feature branch) |
| 🟢 Live | Deployed and checked on the Vercel site |

Last updated: 2026-10-21

## In progress

| ID | Work | Branch | Committed | Pushed | Live | Status |
| --- | --- | --- | :-: | :-: | :-: | --- |
| T-52 | Generate six distinct product-specific gallery views and wire them into the creator and storefront PDP carousels | `main` | [x] | [ ] | [ ] | Committed |
| T-01 | Period filter as radio list, adds Last 14 Days, All Time last (Figma `350:44963`) (`cfa61bb`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-02 | Shared `RadioDot` for the sort and period lists (`04310da`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-03 | Drop Total Products from the stats row (`018c7ef`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-04 | One profile photo picker for setup and Manage Account (`db1642d`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-05 | Review photos in Your Reviews and What Creators Say (`0d08e10`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-06 | Profile photo pans in any direction in the crop modal (`daaa15c`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-23 | Review photos match Figma `1030:29096` (48px, 8px corners, 14px under the text) in What Creators Say, Your Reviews and a sample request's Your review card, via shared `ReviewPhotos` (`git log --grep T-23`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-24 | Keep the footer below the fold on the public storefront (`/shop/view`), however short the shop or product page (`git log --grep T-24`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-25 | Keep the footer below the fold on a sample request's details page (`/sample-requests/<id>`) (`git log --grep T-25`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-26 | Keep the footer below the fold on Your Reviews (`/reviews`), and add the "Footer below the fold" rule to CLAUDE.md (`git log --grep T-26`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-27 | Apply "Footer below the fold" to every remaining page: Home, Help Center, Brands, stat breakdowns, product stats, a My Shop item's page and the in-app storefront preview (`git log --grep T-27`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-28 | Pick several photos at once when writing a review (each loads in its own spinner tile, picks past the 3-photo cap are ignored, a broken file drops out while the rest are kept), and show a review's photos under its text on the Sample Requests list (`git log --grep T-28`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-42 | Add the `laws-of-ux` workflow (`workflows/laws-of-ux/SKILL.md`): the 30 Laws of UX from lawsofux.com, paraphrased with URMEI guidance and a review checklist (`git log --grep T-42`) | `main` | [x] | [ ] | [ ] | 📝 Committed |

| T-43 | Add a direct `/shop/preview` route and clickable storefront breadcrumbs; keep the active collection breadcrumb non-clickable | `main` | [ ] | [ ] | [ ] | Not started |
| T-44 | Profile setup per market (main file `2574:45326`): shipping address Country locked to the market, fields per market (Singapore: postal code + two lines; Malaysia: optional State/Province and City; Indonesia: both required), saved as Home; bank details payout currency starts on the market's currency; locked selects read muted (`git log --grep T-44`) | `feature/shop-personalization` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-45 | Review Details and Manage Account addresses per market (main file `2574:45437`, `2574:47137`): Review Details shows DOB read-only, the header's market selector, dark read-only Applying Country and the outlined Disconnect; the Add/Edit address modal takes Recipient phone with the market's dial code, Country locked to the market with that market's fields (Malaysia: optional State/Province and City; Indonesia: required), and an Address type (Home/Work); demo addresses and older saved ones move to the two-line format; a new `disabled` field state (muted value) separate from read-only `locked` (`git log --grep T-45`) | `feature/shop-personalization` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-46 | Header search: picking a product suggestion opens its Product Detail page (`/shop/product/<id>`) instead of the search results list; submitting typed text still lists results (`git log --grep T-46`) | `staging` | [x] | [x] | [ ] | ⬆️ Pushed |

## Shipped to `main`

These commits are pushed to `origin/main`. Tick **Live** once you've checked them on the deployed site.

| ID | Work | Commit | Committed | Pushed | Live | Status |
| --- | --- | --- | :-: | :-: | :-: | --- |
| T-07 | Call it Commission Earned, not Commission Owned | `26b8fa8` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-08 | Improve layout handling for viewport widths | `7b7cd38` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-09 | Refactor Manage Account, storefront styling | `43158cd` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-10 | Delivery cost and return policy on the storefront product page | `c543a3a` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-11 | Apply and review forms start at the header's edge | `34a779f` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-12 | Name the empty market and offer a way out | `2496599` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-13 | Manage Account setup requirements | `97c7033` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-14 | Replace the apply landing hero image | `7ed607a` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-15 | One shared stats period across the portal | `e50f508` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-16 | Unified search inputs, stat-page period filters, review details | `ae35577` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-17 | Sample requests, bank details and account forms match the designs | `459f9b1` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-18 | Serve `index.html` for every path on Vercel | `2649aa0` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-19 | Route by URL path instead of the hash | `4be977e` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-20 | Split addresses into default shipping and billing | `15e2555` | [x] | [x] | [ ] | ⬆️ Pushed |

## Backlog

| ID | Work | Committed | Pushed | Live | Status |
| --- | --- | :-: | :-: | :-: | --- |
| T-21 | Convert `public/urmei/apply-hero.png` to WebP (`4c824f5`, docs `bb1e141`) | [x] | [x] | [ ] | ⬆️ Pushed |
| T-22 | Clear the lint errors: `activity-log.ts` whitespace, plus effect setState in `ManageAccount` and `ApplyCreator` (`0ac43ac`) | [x] | [x] | [ ] | ⬆️ Pushed |
| T-31 | Shop collections (replace Favorites): requirement, answers, and the Figma flows list. `change-requests/collections/REQUIREMENT.md`, `change-requests/collections/ANSWERS.md`, `change-requests/collections/FLOWS.md` (Figma section `[Influencer] Collections` `2764:66587`). Design only; building it is a later task (`git log --grep T-31`) | [x] | [x] | [ ] | ⬆️ Pushed |
| T-32 | Track the Figma workflow folder `workflows/` (it was local-only) and add the `change-request` workflow for new client requests (`git log --grep T-32`) | [x] | [x] | [ ] | ⬆️ Pushed |
| T-33 | Shop personalization (post-MVP vision): `change-requests/shop-personalization/REQUIREMENT.md`, HTML concept board (6 ideas), and desktop Figma drafts 01 Posts, 02 Announcement Bar, 03 Custom Banner (Figma section `[Influencer] Shop Personalization (Post-MVP)` `2903:78274`). In internal review with Rayboy and Neethu KU (`git log --grep T-33`) | [x] | [x] | [ ] | ⬆️ Pushed |
| T-34 | Reorganise the agent files: `responsive-workflow-urmei/` → `workflows/`, client requests into `change-requests/<topic>/`, indexes for both, a build script for the responsive bundle, drop the tracked `debug.log`, and replace the stale `AGENTS.md`/`README.md` (`git log --grep T-34`) | [x] | [x] | [ ] | ⬆️ Pushed |
| T-35 | Social account revoked from the platform (Instagram, Facebook, YouTube, TikTok): requirement, agreed plan and answers in `change-requests/social-disconnect/` (`REQUIREMENT.md`, `ANSWERS.md`, `FLOWS.md`). Desktop design in Figma section `[Influencer] Social Connection Lost` `3061:84210`: all 9 desktop flows built (01 approved, 02–09 in review; Q2 option to pick); mobile after approval; code later | [x] | [x] | [ ] | ⬆️ Pushed |
| T-37 | Add the `figma-refine` workflow (`workflows/figma-refine/SKILL.md`): Figma structure and naming refiner for Sections, Frames and Components, wired in as the last design step of `responsive-flow`, `change-request` and `mobile-screen` (`git log --grep T-37`) | [ ] | [ ] | [ ] | ⬜ Not started |
| T-38 | Shop personalization, MVP slice (meeting notes of 10 Oct 2026): preset banner backdrops, up to 2 featured collections or products in the banner, storefront preview, hidden shop-page stats, collections nudge, "View product/collection" link in notifications, old reviews layout kept. Out: Posts, custom uploads, admin approval. WIP design: the main file's `2383:87224` (shopper side only; creator side not designed). Details in the MVP section of `change-requests/shop-personalization/REQUIREMENT.md`; 9 questions answered in `ANSWERS.md`; flow 02 built on the Work File's `Personlisation` page `3223:139063` (`FLOWS.md`), approved 2026-10-19; primary screen `3287:33154`; current flows in `Primary Flows` `3321:24528` (01 Change Backdrop, 02 Add Featured Items) in lead review; earlier explorations kept; flow 01 built as 3 options (`3250:17341`), awaiting a pick; 2026-10-19: page `Personalisation — Backdrop & Featured Items` `3350:84583` with flows 01–06 (Change Backdrop, Add Featured Items, Search, Nothing to Feature, Item No Longer Available, Shopper's View) and the components in build order, reviewed through Figma comments (`FLOWS.md`); 2026-10-20: My Shop banner set and the minimal Featured items pass; 2026-10-21: in the main file's `NEW Personalization - 20.10.26` `2799:103759`, annotations cut to two design-system `Annotation` cards (card colour on 06.2, Save Changes toast on 01.4); 2026-10-22: storefront banner colours per preset (profile tint, featured card, FEATURED label) from the main file's `Assets 22.10.26` `2906:75188`; 2026-10-22: fixed "Add Another" / "Change" on the My Shop featured row passing the click event as a preselected pick, which filled the second slot and blocked adding one; 2026-10-22: My Shop follows the same backdrop colours as the storefront (featured card surface, product and collection card surfaces); 2026-10-22: "+N products" scrim on collection covers (My Shop and storefront), the Featured items dialog's no-collections state as a Picker empty state (`2799:104328`), dark TikTok/Instagram icons on the storefront banner (`2799:104149`), plain-white "more collections" on the collection page; 2026-10-22: the product page's "In <name>'s collections" row drops the card fill, so its text sits straight on the section as designed; 2026-10-22: that row's tint runs edge to edge (it sat inside the product's column), and the collection page, breadcrumb and "You're shopping" bar keep to the 1440px content column on wide screens; 2026-10-22: collection covers adapt to the product count (one fills the cover, two sit in equal halves, three or more keep the stacked pair) on My Shop, the storefront, both banners and the featured picker, through one `CollectionCover`; 2026-10-22: the backdrop colours only the banner now (profile card, featured cards, FEATURED label); product and collection cards stay neutral on My Shop and the storefront | `feature/shop-personalization` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-41 | Build Collections (`T-31` designs) in code: collections replace Favorites in My Shop (create, rename, delete, reorder with arrows, add products from My Shop), the collection page, the storefront board grid and `/shop/view/<collection>` links. Spec: `change-requests/collections/`; build source: the main file's section `1862:81644` (21 flows, listed in `FLOWS.md` › Code build source). All 21 flows built (storefront, collection page, unavailable link, storefront preview, My Shop collections, add to collection, product page, collection page, copy link, unpublished, catalogue add); 2026-10-22: filling a collection with a variant already in the shop adds the existing item (its collections pre-ticked, Confirm disabled until the ticks change) instead of blocking it | `feature/collections` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-42 | Add the `figma-comments` workflow (`workflows/figma-comments/SKILL.md`): watch the Work File's comment threads with a Monitor poller, sort each comment, fix minor ones with parallel agents, reply On it → Fixed → Closed. Token in git-ignored `.figma-token` | [x] | [x] | [ ] | ⬆️ Pushed |
