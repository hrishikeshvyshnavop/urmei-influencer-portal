# URMEI Figma Work File: shared reference

This is the single source for the node ids, page ids, components and tokens that the Figma skills (`mobile-screen`, `mobile-design-review`, `organize-flow`) need. Update it here, not in the skills. Verified on **2026-09-28**. Ids change when sections get reorganised, so **re-verify before relying on one** (see `figma-gotchas.md` → "Before you write").

## File and pages

- **Work File:** `FdmVPJo1j4t8s9gej1H7Yb` ("[MVP] Influencer Portal | Work File"). All building and editing happens here.
- **Main design file:** `cehltPtMoGWEtKbF7k3MQQ`. It is reference only. Its **-> Responsive Design (Web & Mob)** page `794:24650` is now the **locked final design** (user, 2026-10-06): never write to it. Its mobile board `1174:34352` is catalogued in `mobile-screen/references/main-file-mobile-flows.md`.

| Page | Id | What's there |
|---|---|---|
| **-> Responsive Design (Web & Mob)** | `2650:50683` (was `2462:56445` until 2026-09-30; node ids are now `2650:*`) | All current flows, desktop and mobile. It replaced the "Responsiveness" page `1802:19394` on 2026-09-28, so treat any `1802:*` id as dead. |
| **Components — Dev Handoff** | `2613:16624` | Every local main component (2026-09-30): one section per component (`01`–`11`), each holding just the component name above the component set (the user dropped the spec cards). New local components go here the same way. |
| Hrishi Workspace | `751:80091` | The old Browse & Add section `2320:42706`, the mobile footer `2321:52957` |
| Sample Request & Review Product | `2248:20562` | The original Sample Request board copy `2248-21224`, desktop only |

## Sections on the flows page

| Section | Id | Sub-sections |
|---|---|---|
| [Influencer] Shop Experience | `2740:68609` (was `2650:122758`, `2446:56196`; the page's sections were re-copied on 2026-10-06, so ids below may be stale: find sections by name) | 01 Browse & Add Product `2650:134083` · 02 Search, Filter, Sort & Brand Listing `2650:132140` · 03 Publish Shop `2650:126001` · 04 Add Favorite `2650:122759` · 05 Remove Favorite `2650:124892` · 06 Reorder Favorite `2650:128216` · 07 Copy Affiliate Link `2650:127137` · 08 Remove Product `2650:128987` · 09 Shop Preview `2650:130075` · 10 Stats Breakdown `2650:130728` |
| [Influencer] Onboarding & Home Experience | `2446:47735` | 00 Request Flow `2446:47736` · 01 Registration & OTP Verification `2446:48508` · 03 Product Tour `2446:49613` · 04 Home `2446:48783` · 05 Help Center FAQ `2446:49401` · 06 Recent Activities `2446:49508` · 07 Account Menu & Logout `2446:50986` · 08 Language Selector `2446:51445` (no 02; frames renamed `NN.S Flow — State — Device` on 2026-09-30, e.g. Home "06 — Shop completed — mobile" is now `04.2 Home — Shop Completed — Mobile`) |
| **00 - Request Flow** (new, top level) | `2660:53392` (was `2627:107198`) | The Apply Now flow with email verification. Mobiles were added on 2026-10-01, one 50px beside each desktop (ids in `mobile-screen/references/mobile-inventory.md`). The happy path is `00.1` Landing → `00.2`/`00.3` Verify Email → `00.4`/`00.5` Verify Email OTP → `00.6`/`00.7` Apply Form → `00.8` Submitted. Edge cases are stacked under their Default screen: `00.9`–`00.10` email errors, `00.11`–`00.13` OTP errors, `00.14`–`00.15` identity verification states. The old `00 Request Flow` `2446:47736` inside Onboarding & Home is still there, and which of the two is current hasn't been confirmed. |
| **[Influencer] Collections** | `2764:66587` (2026-10-06, `T-31`) | One sub-section per flow, 01–15 (list in `COLLECTIONS-FLOWS.md` › Figma structure). Not locked. |
| [Influencer] Profile Settings & Notification | `2375:62087` | 01 Notification `2375:62088` · 02 Profile & Settings `2375:62288` |
| [Influencer] Sample Request & Review | `2617:56695` | 01 Sample Requests `2384:65543` · 02 Request a Sample: Happy Path `2384:66136` · 03 Request a Sample: No Address `2384:66596` · 04 Change Shipping Address `2384:66909` · 05 Add Shipping Address `2384:67268` · 06 Cancel a Request `2384:65891` · 07 Rejected Request `2384:66068` · 08 Write a Review `2384:69218` · 09 Product Page with Creator Reviews `2384:67626` · 10 Creator Adding Product Review `2384:67720` · 11 Creator Reviews List View `2384:68757`. The old parent `2384:65541` was dissolved; this one was recreated on 2026-09-30. |

## Locked: never edit

These are the design handed off to the dev team (user's rule, 2026-09-28). You may read them and clone from them, but never change them.

- The **final design** is the whole **-> Responsive Design (Web & Mob)** page `794:24650` in the **main file** `cehltPtMoGWEtKbF7k3MQQ` (user, 2026-10-06). Never write to that file's page. The old Work File ids `2384:76022` / `2384:77979` no longer exist.
- `2320:42706`: BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26 (Hrishi Workspace).

Every page-wide write script must check that these ids still exist, and exclude any node whose ancestor chain contains one. Snippet in `figma-gotchas.md`.

## Components and reference frames

| Thing | Id / key | Notes |
|---|---|---|
| Status Bar / iPhone 13 Mini | set `2:2041`, `Mode=Light` `2:2042`, key `1c1ba5e2bd7e14a7fe8d2e575a4a4af1f02a98ef` | **Library** component. Import by key or clone an instance. Fill `#f8f8f8`, 47 tall. |
| Home Indicator | set `2:1824`, `Dark Mode=NO` `2:1825`, key `f9657d9e0ad6921a9248e5c387f2d7606843e929` | Library. 34 tall. |
| Header (mobile) | `Device=Mobile, Type=MVP Portal, Page=Default` `2105:74735`, key `2e60ce43733e2152c5a1e54b8a177cb8e21edaaa` | Library |
| Search | `state=Default` `2:3606` | Library, inside the `Search wrap` frame |
| Toast | main `2500:58708` (library) | The Work File wrapper instance is named `Tost`. The finished error toast is `2348:55780`. |
| **Notification Banner** | set `2454:68390` (Dev Handoff page) | Local. `Device` Desktop/Mobile, `Message`, `Show Action`, `Icon`, exposed `action` Button. All banners are instances of it. |
| **Product Affiliate Link** | set `2605:97740` (Dev Handoff page) | Local. `State` Published/Unpublished, `Link` text property. Fills its column, so one component serves desktop (568) and mobile (343). Unpublished shows "Publish shop to get your product URL" and no copy icon (`hasLiveLink`). Every PDP's link row is an instance of it (2026-09-30). |
| **What Creators Say** | set `2609:97872` (Dev Handoff page) | Local, built from 09.1 (`2404:64593`). `Device` Desktop (1200, side by side) / Mobile (343, stacked, pager on its own row), `Show Photos` boolean, text props Date, Quote, Name, Counter. Avatar and photo images are per-instance fill overrides. Every PDP's review card is an instance of it (2026-09-30). |
| **Dialog Product Summary** | set `2799:73542` (Dev Handoff › 12 Dialog Product Summary; Desktop `2799:73520`, Mobile `2799:73541`) | Local, 2026-10-06. The product card at the top of product dialogs (Add to collection, Remove product…). The product row padding is bound to `spacing/md` (16) on all sides; its gap is `spacing/lg` (desktop) or `spacing/md-sm` (mobile). The radius and fill keep their library tokens. The `Show Availability` boolean shows the flush "Available only in …" strip (off by default). Every Collections dialog uses it. |
| **Settings Tabs** | set `2459:68480` (Dev Handoff page) | Local. `Active` Profile/Addresses/Social Accounts/Bank Details, `Bank Warning` boolean. |
| **Account Menu** | set `2602:108370` (Dev Handoff page): `Device=Desktop` `2602:108315` (330 dropdown), `Device=Mobile` `2602:108331` (343 sheet card + View Profile + close ✕) | Local, 2026-09-30. Text props `Name`, `Email`. All six header profile menus on the flows page are instances of it; the old frames are hidden beside them. |
| Mobile footer | `Footer/Mobile/Default`: `2321:52957` (Hrishi Workspace), final-design copy `2384:80274` | |
| **Cursor** | **Pointer Container** group `2775:169244` (on 05.1 in [Influencer] Collections; user, 2026-10-06) | Clone it for every cursor, never the old `2344:77335` / `2740:75107`. It's 70×73, with the fingertip at (21, 9). Place it ABSOLUTE in the top-level screen frame (or a non-clipping parent), at the target's centre minus (21, 9). |
| Close ✕ | `2384:78407` (`Button=Outlined icon, Size=md`) | |
| Centred confirm dialog | `2384:78404` (final design) | |
| Chrome reference | `2384:87491` (Status Bar + Header + Search wrap, 375×173) | |
| My Shop populated / empty | `2384:80204` / `2384:80765` | Final design |
| PDP canonical structure | 07.3 desktop `2344:78743`, mobile `2360:57678` | `Stack / What Creators Say` > [`Stack / What Creators Say`, `Performance Section`] |
| Mobile shop stats card | `2348:55137` | 5 metrics + "Showing" filter |
| Mobile reviews carousel | `2368:62493` (09.2 Storefront Preview) | The final design for every mobile review display: header `2368:62494`, cards row `2368:62503` |

## Library tokens (URMEI Design System)

Import with `figma.variables.importVariableByKeyAsync(key)` and bind with `setBoundVariable`. Find others with `search_design_system` (`entity: "variable"`, scoped to the URMEI Design System library key).

| Token | Value | Key |
|---|---|---|
| `spacing/xs` | 4 | `ba48da47b66e7db6ca6d5b4e2fe4f49f8d1a63f5` |
| `spacing/sm` | 8 | `8ca871a6a651b26bf53f3acf7cdfee97588463c8` |
| `spacing/md-sm` | 12 | `4cadb98785f846cb34433d7786651b6398a7931d` |
| `spacing/md` | 16 (the mobile gutter) | `632ed28e60ef5fb2d2f5a0f16cdd96c8da2dec0a` |
| `spacing/lg` | 24 | `8f028c48c403e20710eb6338dc087ae7b8828f98` |
| `spacing/8xl` | 120 (the desktop margin) | `83d418bbc87936213544320a290af3d3f5ead756` |
| `border/radius/xs` · `sm` · `md` · `lg` · `infinite` | 4 · 6 · 8 · 10 · 9999 | `b6f8682c…6b` · `6ede169e…6d` · `35bebd43…fb` · `bbb6df7b…bc` · `512b8e16…f1` (full keys: `b6f8682cfe2c2789cba28c4474b6c0cad8000f6b`, `6ede169e1394a6fc008c6d42808de0cc8c5fd26d`, `35bebd43a0eec842cd6aaf38f8d5a95134b2dbfb`, `bbb6df7b0287aadaabf41e84254cf515c38f67fc`, `512b8e16ffcc923a06e7676c179917a351509cf1`) |
| `border/color/default` | #e5e5e5 | `c44692ef1a879f64aec40aee42c042f90a7e2e80` |
| `border/color/dark` | #464646 | `0135812535a74f995c6588d7f470c43eb02fcd80` |
| `surface/secondary/100` | #fffefd | `d93517b686f3c802991aa3aea5409972420841db` |
| `surface/primary/500` | #403e3c | `bac52ff50c5d13a08cb47a154970a4cc90f0e2e9` |
| `typography/color/secondary/700` | #757575 | `db0f0405e5d1946bfceb126c410a6107f19a9545` |
| Text style `Body/body-md-medium` | 16/22 | `ef1832b2f17ac5577c9046d2b9195b9170bf12b6` (`importStyleByKeyAsync`) |
| Text style `Body/body-sm-medium` | 14/22 | `59b9ce0a5d57501e3760a859e8a551d43f0f24c8` |

There is **no token for `#2d2305`**, the banner text colour. The app hardcodes it too.

## Product rules the designs must follow

These come from the app code (the source of product truth) and from the user's decisions.

- **Favorites:** the word is "Favorite(s)", never "Featured". The cap is **4** (`src/shop/limits.ts`).
- **Shop Info Card** (`src/shop/components/StoreCard.tsx`):

  | State | Preview button | Second button | URL field | Status line |
  |---|---|---|---|---|
  | Published, no changes | Preview Storefront | View Shop | live URL | Last Published on … |
  | Published, with edits | Preview Storefront | Publish changes | live URL | Last Published on … |
  | Never published, has products | Preview Shop | Publish shop | "Publish shop to get your URL" | hidden |
  | Never published, no products | Preview Storefront (disabled) | Publish shop (disabled) | placeholder | hidden |
  | Publish blocked (0 products) | Preview Storefront (muted) | Publish shop (disabled) | "Your store URL is currently disabled." | hidden |

- **Shop Info Card layout (user, 2026-09-28):** on mobile, the two buttons stack vertically, both full width, Preview Storefront first, 8px apart (`spacing/sm`). On never-published cards the status line is hidden. The `Name row` (name over @handle) is vertical with a 0 gap, left-aligned (user, 2026-09-29). Applied in both the Work File and the main file's Responsive Design page.
- **Profile edit form, mobile (user, 2026-09-29):** there's no Save button at the bottom of the form. After the first edit, a `Sticky Save Bar` pins to the bottom above the Home Indicator: Discard (outlined) and Save Changes (primary), each half the width, 8px apart, with no helper text (the user dropped "You have unsaved changes"; it's hidden in the Work File frames). Leaving with unsaved edits opens "Discard unsaved changes?" (Keep Editing / Discard). Saving shows the "Profile changes saved" toast. Frames 02.1a–02.1c are in the Work File (`2550:51968`, `2550:52326`, `2550:52706`) and in the main file's Responsive page (`1467:55846`, `1467:56231`, `1467:56638`). Desktop keeps its inline Save.
- **Shop stats row** (`src/shop/data/stats.ts`): Total clicks, Total sales, Commission pending, Commission earned, Commission settled, plus the "Showing" period filter.
- **PDP Performance** (`src/shop/components/PerformanceStats.tsx`): Total unit sold, Link clicks, Conversion rate, Commission settled, plus "View other stats".
- **Icons, never typed glyphs (user, 2026-10-06):** never draw an icon with a text character (‹ › « » ← → + ✕ × ★ ⋮ ✓). Use a library icon instance. Inside a button, turn on the Button's `show left icon` / `Show Right Icon` property and `swapComponent` its icon slot (import the icon with `importComponentByKeyAsync`). For a text-style link with an icon, use `Button=Plain-button` (clone e.g. `2740:65115`). Standing pairings:
  - back link: `chevron-left`
  - copy link: `copy`
  - edit: `edit-3`
  - delete: `trash-2`
  - share: `share`
  - add: `plus`
  - more menu: the product card's ⋮ button (`Button=Outlined icon, Size=sm`, `more-vertical`)

  Icon keys (URMEI library, 16px):

  | Icon | Key |
  |---|---|
  | `chevron-left` | `4844c5d22f7d8ed854628f7e5c4023abbcad9695` |
  | `arrow-left` | `1435e335fd11b8d72882af31afd46619084fc5dd` |
  | `copy` | `cb49caf4063fc64b9a98d5246dc39879f4b2922a` |
  | `edit-3` | `ca6abba734753723d86c1c7a0a58968bc1ce4b79` |
  | `trash-2` | `e671ac63a304db96230b863dac24148b79f7837b` |
  | `share` | `9219fd6c0334a2b2116e73cb27c2f450729047dd` |

  First applied to Collections flow 1 (`2777:67314`).
- **Annotations (user, 2026-10-06):** explain a screen with the file's own `Annotation` component, never a hand-made note card.
  - **Source:** clone an existing instance, e.g. `2740:85668`. It comes from the remote set `Annotation`, with variants `up`, `down`, `left`, `right` and an `annotation` text property.
  - **Category:** a nested chip with variants Development / Client / Feasibility / Content / Info.
  - **Placement:** put the pointer dot on the exact element it describes. With `left`, the dot is at x 0, vertical centre, on a 243px leader, so the card (302px) sits outside the screen; the dot needs x ≥ 1197 on a 1440 frame.
  - **Spacing:** keep cards from overlapping. Leave about 330px between dots, since cards are about 315 tall, and give the screen to the right enough gap (about 700px).
  - **Example:** Collections Flow 4 (`2782:68420`).
- **Disabled = the variant, never opacity (user, 2026-10-06):** show a disabled button with the Button's `State=Disabled` variant (e.g. `Button=Outlined icon, Size=sm, State=Disabled` for ‹ › arrows, `Button=Primary, Size=md, State=Disabled`). Don't fade it with opacity. `Item Dropdown` has no Disabled state yet, so for a disabled menu row keep opacity 1 and bind the text to `typography/color/secondary/500` (#d5d5d5, the disabled label colour). After swapping to Disabled, clear any white fill left on the icon instance: disabled icons have no fill and a #d5d5d5 stroke.
- **The Button component forces Title Case.** A layer reading "Publish changes" renders as "Publish Changes". Set layer text to the app's wording anyway.
