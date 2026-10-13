# Existing mobile screens — check here before building a new one

> **For current node ids, use `mobile-inventory.md`** (generated from the live file on 2026-09-28). This file keeps the build notes. About a third of its ids are stale since the page move (Responsiveness `1802:19394` → flows page `2462:56445`); `mobile-inventory.md` → "Stale ids" lists which ones.

Catalog of mobile (375px) frames that already exist in `FdmVPJo1j4t8s9gej1H7Yb` ("[MVP] Influencer Portal | Work File"), page **Responsiveness** (`node-id=1802-19394`). **Read this before starting a new mobile screen or shop flow** — reuse/extend a frame listed here instead of rebuilding it from scratch. Link format: `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-%257C-Work-File?node-id=<id>`.

> Correction to `SKILL.md`: that file says new screens go inside a section at `node-id=1810-20063` ("Section 1") — **that node does not exist** (verified 2026-09-23, `get_metadata` returns not-found). The real top-level sections on the Responsiveness page holding shop mobile work are the two listed below. Use one of those, not `1810-20063`.

> **Renamed by `/organize-flow` (2026-09-25):** every frame in the 10 flow sections now follows `NN.S Flow — State — Desktop/Mobile`, and sections are titled `01 - Add Product` … `10 - Stats Breakdown`, with Add/Remove Featured renamed to **04 - Add Favorite Product** and **05 - Remove Favorite Product**. The column is re-stacked 01→10. **Node ids didn't change**, so every id below still works; only the names differ. Inner layer names changed too. Stat tiles, for example, are now `Text / TOTAL CLICKS` rather than `Total Products Label`, so find text by `characters`, not by old layer names. Section 10's product stats now live in the recreated sub-section `2381-64707`.

> **Stale entries (checked 2026-09-25):** `2153-42552` (the BROWSE & ADD PRODUCT section below) is no longer on the page. The current section is **`2320-42706`** ("BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26"), which holds a newer copy of the main file's board `1174:34352`. `2222-16744` (My Shop / Unpublished) and `2231-79376` are **deleted**, so use the Publish Shop section's `2224-76254` instead. Re-check any node id below with `get_screenshot` before cloning it.

> **My Shop rules applied (2026-09-25):**
> - Every full-page My Shop mobile in sections 03–10 now ends with a `Footer/Mobile/Default` (a clone of `2384:80274`), so the frames are 450–690px taller than the sizes listed below.
> - Populated shops no longer have the dashed "Add Product" card.
> - Empty-state shops no longer have the "Your Picks" toolbar.
> - Rows were reflowed, and node ids are unchanged.
> See `mobile-design-review/references/readiness-log.md`.

## Cursors on mobile screens (added 2026-09-25)

Every mobile screen whose desktop shows the hand cursor now has one on the same element. Each is a 70×73 clone of `2344:77335`, placed absolute in the top-level frame:

| Mobile | Cursor | Points at |
|---|---|---|
| Publish 01 `2224-76254` | `2355-57049` | Publish Shop button |
| Publish 02 `2153-45302` | `2355-57114` | Publish (sheet) |
| Publish 10 `2334-37777` | `2355-57147` | ⋮ on card 1 |
| Add Featured 01 `2231-78919` | `2355-57082` | Publish Shop button |
| Add Featured 02 `2235-36634` / 07 `2260-36845` | `2235-36708` / `2260-36950` | "Add to featured" menu item (existing, inside the menu) |
| Remove Featured 01 `2342-38585` | `2355-57181` | "Remove from Favorites" menu item |
| Remove Featured 04 `2343-38910` | `2355-57208` | "Remove from Favorites" button |
| Reorder 01 `2352-207169` | `2355-57241` | › on card 1 |
| Copy Link 01 `2360-57021` | `2360-57126` | "Copy affiliate link" menu item |
| Copy Link 03 / 04 `2360-57678` / `2360-58025` | own `Cursor` | the affiliate link's copy icon |

No cursor was added to the Publish section's `2230-77752` (09): its desktop twin (Add product empty state, cursor on Browse Product) no longer matches that frame's state.

## 00 - Request Flow (Apply Now with email verification) — `node-id=2660-53392` (built 2026-10-01)

16 mobiles, one beside each desktop. Ids are in `mobile-inventory.md`. Every one is a clone of an existing mobile from the old Onboarding flows (`2650:*`):

- **Email screens** (00.2, 00.3, 00.9, 00.10) clone 02.1 / 02.2 Enter Email.
  - "Welcome back!" is hidden.
  - The title, the `Inputbox` helper text ("We'll send a one-time code to this email.") and the footer "Already have an account? Log In" are overrides.
  - The error states set the Inputbox `State=Error`, which brings in a red asterisk. It's hidden (`label > Vector`) to match the desktop.
- **OTP screens** (00.4, 00.5, 00.11–00.13) clone 02.3 / 02.4 Enter OTP, retitled "Enter OTP to verify your email", with the button label "Verify Email".
  - 00.11 restyles the resend line from the desktop text: "Resend OTP" is underlined.
  - 00.12 and 00.13 hold a clone of the desktop's red `Error` / `Info` row. In 00.13 it replaces the hidden countdown.
- **The email and OTP clones had 24 gutters.** Their content frames are now bound to `spacing/md` (16), with the children set to FILL.
- **Apply form screens** clone 01.2 / 01.3 / 01.4 / 01.6.
  - Filled values come from 01.3's `Inputbox`es. The originals are hidden as `Inputbox (replaced)`.
  - In 00.15 the social list is 01.3's (Instagram and TikTok connected), and the old one is hidden as `Social platforms list (replaced)`.
  - Button states (Connect, Start Verification, Submit) follow each desktop.
  - The mobiles keep the corrected copy ("…URMEI:", "to help verify your reach."). The desktop says "to helps verify your reach as a creator".
- **Cursors** are clones of each desktop's `Annotation / Cursor (not for build)`, absolute, with the fingertip on the same element. `2344:77335` no longer exists. 00.15 has no cursor because its desktop cursor points below that frame's 900px crop.

## [Ecommerce] Storefront & Consumer Experience — Mobile — `node-id=2652-66074`

Built 2026-09-30 on the **Sample Request & Review Product** page `2248:20562` (the user's link), right of the old Sample Request board, from the main file's desktop flow `236:19239`. The main file's Responsive page has no storefront mobiles, so every screen is an Adapt. Mobile only: the desktops stay in the main file. Row 1 is the storefront (S1–S4, R1) and row 2 the PDP (P1–P4).

**Figma links**
- Section: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2652-66074
- S1 Default: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2652-66075
- S2 Followed: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2654-29530
- S3 No Picks in This Market: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2654-29922
- S4 Vietnam Localization: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2654-221838
- R1 Review Detail Sheet: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-227545
- P1 PDP Default: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-29976
- P2 PDP Not Available: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-222516
- P3 Notify Me Sheet: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-223354
- P4 Notify Me Confirmed: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-226477

| Screen | Id | Built from | Notes |
|---|---|---|---|
| S1 Storefront — Default | `2652:66075` | 09.2 Storefront Preview `2650:130464` | Modal "Your shop preview" header hidden. **Shopper chrome:** `Header` `Device=Mobile, Type=E-Commerce, Page=Default` (key `9080bb36f03927cecc0d6fa34ccae6f750262ba7`) + Search Wrap + `Breadcrumb Step Count=3` (Home / Influencers / Charlotte) in a `spacing/md` wrap. The cloned `Creator profile card section` and `Reviews section` main components were swapped for **instances** of the 09.2 originals, so the storefront and preview stay in sync |
| S2 Storefront — Followed | `2654:29530` | S1 | Follow → `Button=Outlined`, "Following". Favorite Picks hidden (as desktop) |
| S3 Storefront — No Picks in This Market | `2654:29922` | S1 | `No Availability Notice` under the creator card (`surface/tertiary/300`, radius md, title + hint + full-width outlined Change Country). Every card: `Tag` shown "Not Available", price hidden, bag icon hidden and a DS Icon Library `bell` (key `d161a40b96b2b19c9b2ef6ea1b70ecca7899ccfa`) put in the same 44px button |
| S4 Storefront — Vietnam Localization | `2654:221838` | S1 | Vietnamese strings, prices as `520.000₫`. The last All Picks card is a copy of S3's unavailable card ("Chưa có hàng"). Figtree renders Vietnamese fine here, so the desktop's missing glyphs are a font problem in that frame only. The Button component forces Title Case ("Theo Dõi") |
| R1 Storefront — Review Detail Sheet | `2655:227545` | P3 | Bottom sheet over S1 (scrolled to the reviews). The product row (with chevron), reviewer, full text and photos are cloned from the reviews card. It has no CTA; the body gets 40px bottom padding to clear the Home Indicator. An opaque status bar sits over the scrolled underlay |
| P1 PDP — Default (from Storefront) | `2655:29976` | 09.1 Public PDP `2650:145003` | Header swapped from MVP Portal to E-Commerce. A new `Creator Market Bar` (avatar + "You're shopping **Charlotte's Picks**", "SG · SGD") sits under the search. Purchase `Type=One Time` (the desktop default). Similar / More from Brand / Campaign / Newsletter / Features hidden |
| P2 PDP — Not Available in Market | `2655:222516` | P1 | Image `Tag` "Not Available". Price, Size and Type hidden. `Not Available Notice` card: title, hint, full-width primary Notify Me, divider, "Available in Singapore". Market bar "VN · VND" |
| P3 PDP — Notify Me Sheet, Signed In | `2655:223354` | 02.2 Request Sheet `2650:140824` | Underlay = P2 clone. Deliver-to hidden; the message section becomes a read-only email field. Fine print sits under it. Sheet bottom-anchored (`y = 812 − h`), cursor on Notify Me. The shopper email is `alex.tan@gmail.com`, not the creator's |
| P4 PDP — Notify Me Confirmed | `2655:226477` | 03.2 Confirm Dialog `2650:126372` | Popup **detached** (the popup component can't stack its buttons): circle-check icon, centred title and text, buttons stacked full width (Done, then Back to Charlotte's Shop), close ✕ hidden, centred vertically |

## Sample Request & Review a Product — `node-id=2384-65541`

Built 2026-09-25 inside the user's copy of the main-file board `1030:27074`. The board sits beside Profile Settings on Responsiveness, at x≈101965. There are 36 mobile frames, each 50px right of its desktop, and `/organize-flow` has been applied. The 11 sub-sections are numbered **01 – 11** inside `2384-65542`. Screen names come from the mobile names, because several desktop frame names were wrong (e.g. "Account Menu" on a product page). Each developer note sits once, under the screen it annotates.

| Sub-section | Mobile screens | How they were built |
|---|---|---|
| 01 Sample Requests | 5 | Account menu = copy of `2126-20651`. Request list and 3 request-details pages (Approved, Waiting, Shipped) restacked from their desktops: the 2-column details row goes VERTICAL, and the tracking line wraps |
| 02 Request a Sample: Happy Path | 3 | Catalogue product page `2320-46453` with the cursor on Request Sample. **Request sheet** (desktop dialog restacked into a bottom sheet). Requested state: Request Sample swapped to `State=Disabled`, plus a success toast with a **View Requests** action (`2320-46686`, action shown) |
| 03 No Address | 2 | Product page with the cursor, then a sheet with the no-address empty state and Submit disabled |
| 04 Change Shipping Address | 2 | Request sheet, then **Select delivery address** sheet (radio cards, Add New) |
| 05 Add Shipping Address | 2 | Select-address sheet, then **Add shipping address** sheet (fields in one column, frame 1004 tall) |
| 06 Cancel a Request | 3 | Cancellable details, then a confirm **sheet** (popup instance widened to 375), then cancelled |
| 07 Rejected Request | 1 | Details with the rejected banner |
| 08 Write a Review | 8 | Delivered details: the "sample delivered · Write a Review" card is stacked vertically with a full-width button, and the cursor is on it. Then the rating sheet and five review-form sheets (uploading, filled, upload error, photo added, low rating), then submitted with the toast "Thanks for sharing your review with us!". **The 1–10 rating row wraps into 5×2** (tiles (width−32)/5). The rating gradient bar is set to FILL. The text-area component is set to HUG so the 152px input doesn't overlap "Add Photo" |
| 09 Product Page with Creator Reviews | 1 | **New public PDP** restacked from the 1440×5347 desktop: details in one column, What Creators Say, and carousels for Similar Products and More from Brand (160-wide cards), Reviews (300-wide cards) and Campaign Spotlight (200-wide). Newsletter stacked with a 260-tall image, then features, the mobile footer and the HI. Price rows wrap as whole labels |
| 10 Creator Adding Product Review | 4 | In-shop PDP `2360-57678` with the cursor on Write A Review, then the rating sheet, then the review-form sheet with the cursor on "8", then the page with **your own review** in What Creators Say (desktop quote, 3 photos `Submitted photos row`, "Charlotte Wynn (You)" truncated so the pager fits, review CTA hidden) |
| 11 Creator Reviews List View | 3 | Account menu with the cursor on Your Reviews, the **Your Reviews list** restacked (names wrap to 2 lines), and the PDP reviews display (copy of 10's own-review page) |

**Reusable from this flow:** bottom sheets for request, select-address, add-address, cancel-confirm, rating and review-form, the request-details page, the Your Reviews list, and the public PDP. **Cursor rule refinement:** mirror only cursors that are *visible* on the desktop. Several desktops keep hidden cursor groups under their overlays; don't copy those. When the desktop's cursor target sits under a sheet on mobile, drop the cursor.

## [Influencer] Profile Settings & Notification — `node-id=2375-62087`

Built 2026-09-25 inside this section, which sits away from the column at x≈101741. `/organize-flow` has been applied: each mobile frame is 50px right of its desktop.

**Rows:**
- **01 - Notification** (`2375-62088`)
- **02 - Profile & Settings** (`2375-62288`): the happy path in row 1, then the Address, Shipping & Billing sub-flow in row 2.

| # | Mobile | node-id | Notes |
|---|---|---|---|
| 01.1 | Notification — Empty State | `2389-65047` | Full-screen panel: My Shop `2368-62138` underneath, then a scrim, then the desktop drawer widened to 375 at y=47, then a white Status Bar and the HI. The bell well is restored to 48×48 and centred |
| 01.2 | Notification — With Items | `2389-65316` | Same, with the Today / Yesterday / Last Week groups and the tinted unread rows |
| 02.1 | Profile Edit Form | `2386-63654` | Copy of `2004-22278` with the footer added |
| 02.2 | Social Accounts Connected | `2386-63995` | Copy of `2024-22599` with the footer added |
| 02.3 | Bank Details Empty State | `2386-64183` | **Manage Account template**: `2024-22599` with the tab switched to Bank (tab variants swapped; labels restored), the banner and ⚠ shown, and the desktop's `columns` content panel restacked, followed by the footer |
| 02.4 | Add Bank Details | `2389-64125` | Bottom sheet over 02.3. The modal is restacked to 375 with top radius 16. **Its GRID field rows were converted to one column, the fields set to HUG height, and the labels set to `primaryAxisAlignItems = MIN`.** The frame grows past 812 (881) |
| 02.5 | Bank Details Connected | `2386-64411` | Bank tab with no banner and no ⚠. The card is laid out vertically, with the details then the delete/edit buttons |
| 02.6 | Addresses Empty State | `2386-64642` | Addresses tab with the "No address added" empty state |
| 02.7 | Add First Address | `2389-64426` | Full-height sheet with 9 fields in one column plus the default shipping/billing checkboxes (frame 1132 tall) |
| 02.8 | Addresses Set As Menu | `2386-64863` | Address cards laid out vertically (details, then Set As / delete / edit). Title-row badges hug and wrap. **Cursor** on the Office row's Set As |
| 02.9 | Set As Pop-up | `2389-64758` | Small bottom sheet over 02.8 with the checkboxes and Cancel / Confirm |
| 02.10 | Addresses Set As Done | `2386-65156` | Office carries both Default badges |
| 02.11 | Delete Bank Details Confirm | `2422-63734` | 375×812. A clone of 02.5 as the underlay, the scrim, and a centred 335 dialog (final-design pattern `2384:78404`): "Delete bank details?", the app's copy, Keep Details (Outlined lg) / Delete (Destructive lg). No desktop twin |
| 02.12 | Delete Address Confirm | `2422-63841` | Same pattern over a clone of 02.10: "Delete this address?", Keep Address / Delete. No desktop twin, and the app has no address-delete confirm yet |

**Restack recipe for Manage Account screens:** copy the template, `setTab`, toggle `notification-banner` and the Bank ⚠, then replace the last child of `Content` with `columns.children[1]` from the desktop. After that, make every auto-layout frame HUG its height, convert header rows and `address /` rows to VERTICAL, and let `title row`s wrap with HUG children. For modals, convert GRID rows to VERTICAL and set the field instances to `layoutSizingVertical = 'HUG'`, or they squash to 28px.

**Sheet update 2026-09-25:** 02.4 and 02.7 are now fixed 812 frames. The form scrolls inside the sheet, and Cancel/primary sit in a sticky `fixed-button-bar` above the HI. On 02.7, the checkboxes and the first-address note are below the scroll fold.

**Chrome update 2026-09-25:** all ten 02 frames now carry the house Header instance and Search wrap (cloned from `2384:80767` / `2384:80768`) in place of the template's detached 88px header, so each frame is 38px taller than the sizes noted above.

The stray `2375-62626` ("Bank details" loose text) sits at the bottom of 02 and is flagged, not deleted.

## PUBLISH SHOP section — `node-id=2230-78005`

Updated 2026-09-25 to the main file's newer revision of the flow, `03 - Publish Shop` (`cehltPtMoGWEtKbF7k3MQQ`, section `236:22430`). The section holds old desktop copies and cover cards, and each mobile frame sits beside its desktop twin. The frames were updated in place. The only exceptions are 03, which was replaced because it was wrong, and 10, which is new. The section is 18725 wide.

| # | Screen | node-id | Size | Main-file desktop | Notes |
|---|---|---|---|---|---|
| 01 | My Shop / Unpublished (1 pick, not yet published) | `2224-76254` | 375×1563 | `236:22437` | Preview Storefront is **enabled** (`Button=Outlined, State=Default`, `2:138`). Tabs read "All Picks (1) / Favorites (1)". The shop has a "Not published yet" caption |
| 02 | Confirm publish (bottom sheet) | `2153-45302` (named "1") | 375×812 | `236:22581` | Sheet over the empty shop: "Publish your shop?" with Cancel / Publish, and the copy says "Favorite products" |
| 03 | Published: success toast | `2332-38320` | 375×1618 | `236:22513` | Replaced `2230-76592`, which showed the toast over an **unpublished** card. Copied from `2229-57939`. It has the published card (URL, Preview Storefront + View Shop, "Last Published on …"), the stats card and the toast "Your shop published successfully". The badge reads "★ Favorite" |
| 07 | Publish failed: bank details missing | `2230-76758` | 375×812 | `236:22677` | Behind the sheet is a copy of 03 with no toast, plus Manage Account's `notification-banner` under the Header ("To publish your shop, you need to add bank details"). The sheet shows the error row "Bank details missing · Add bank details", and Publish is disabled |
| 08 | Publish changes: shop goes offline | `2230-77536` | 375×812 | `236:22765` | Behind the sheet is a copy of 09 with no toast, with Preview Storefront and **Publish Changes** enabled. The sheet reads "Publish changes?" with the warning "This takes your shop offline…" |
| 09 | Published, no products: offline toast | `2230-77752` | 375×1505 | `236:22823` | Published card with the URL, Preview Storefront and **Publish** both disabled, and "Last Published" hidden. It has the stats card, "All Picks (0) / Favorites (0)" and the "Your shop is empty" card. The toast reads "This takes your shop offline", with `triangle-alert` swapped in for the check icon and recoloured to the toast text colour. The desktop draws no toast here; the user asked for one |
| 10 | No affiliate link before publish: card menu open | `2334-37777` | 375×1563 | `236:22864` | Copy of 01 plus the `Options List` from `2235-36634`, with its `Cursor` child deleted. A cursor on the ⋮ button (`2355-57147`) was added back later to match the main-file desktop. The menu reads View product details / Remove from Favorites / Remove from shop. **"Copy affiliate link" is hidden**, because an unpublished item has no link |

**Stats on these screens follow the new desktop** (user's choice, 2026-09-25): TOTAL CLICKS 20 · TOTAL SALES 10 · COMMISSION PENDING S$40 · COMMISSION EARNED S$80 · COMMISSION SETTLED S$40. The desktop has no Total Products tile, but it does have Commission Pending. This differs from the "Stats block" section below, which is the older 5-metric set.

**Mobile dialogs are bottom sheets:** a `popup` frame at the bottom of a 375×812 overlay, laid over a copy of the page behind it. Swap in a different page behind the sheet to change the state, as 07 and 08 do.

## Add Featured Product section — `node-id=2061-41656` (complete as of 2026-09-25)

Every desktop in this section now has a mobile version 100px to its right. The section is 21739 wide after frames were shifted to make room.

| Desktop | Mobile | Notes |
|---|---|---|
| 01 publish-shop / my-shop / default `2231-78843` | `2231-78919` | (existing) |
| 02 context-menu-open `2231-78762` | `2235-36634` | (existing) The **toast was removed** on 2026-09-25; it belonged to 03. See the frame's own entry below |
| 03 success-toast `2231-79547` | **`2348-55109`** | New. Copy of 02: menu closed, "★ Favorite" badge shown with the badge row set to SPACE_BETWEEN, "Favorites (1)", "Publish Changes", toast "Product added to Favorites". Stats use the Publish Shop five (53% · 34 · S$845 · S$845 · S$0) |
| empty-state `2061-42375` | `2238-36643` | (existing) |
| 05 featured-tab-full `2061-41657` | `2242-36731` | (existing) |
| 07 context-menu-slots-full `2061-41839` | `2260-36845` | (existing) **Moved** beside its desktop; it used to sit after 08 |
| 08 error-toast-slots-full `2061-42067` | **`2348-55355`** | New. Copy of 07: menu closed, badges read "★ Favorite", same stats. The **error toast with an action button** (`2348-55780`) is copied from the mobile `Tost` in `2320-46565`, with its hidden action `Button` shown ("Manage Favorites"). The icon is swapped to `x-circle` (`745:46281`) and recoloured red (#EE4442, taken from the desktop toast). The inner Toast's `itemSpacing` was cut from 108 to 12, with hug height and centred items, so a two-line message fits. **Reuse this toast for any error or action toast** |

## 08 - Remove Product from Shop section — `node-id=2364-57473`

Built 2026-09-25. It's a **copy** of the container's `2344-62881`, placed in the right-hand column at x=73490, as with 01–07. Section width is 10568.

| # | Screen | node-id | Notes |
|---|---|---|---|
| 01 | Card hover | `2366-60539` | Copy of `2360-57021`: published, **2 picks** (Water Bank + COSRX Snail; the second card is a copy of the first with new texts and the image fill from `2242-37102`), "All Picks (2) / Favorites (2)". Cursor on card 1's ⋮ |
| 02 | Card menu open | `2366-60815` | Same, with the menu open. The cursor `2366-60920` points at **Remove from shop**. It was moved out of the menu because the `Options List` clips its content |
| 03 | Confirm remove (bottom sheet) | `2366-61376` | Copy of `2230-77536`. Behind the sheet is 01 without its cursor. The sheet reads "Remove this product from your shop?". Its body holds the availability banner and product summary from `2320-45094` (size row hidden), and the original text and banner are hidden. Buttons read Cancel / **Remove This Product**, with a cursor on Remove |
| 04 | Removed toast | `2366-61082` | Snail only, "(1)", "Publish Changes", toast "Product removed from your shop" |

## 09 - Shop Preview section — `node-id=2364-57887`

| # | Screen | node-id | Notes |
|---|---|---|---|
| 01 | My Shop default | `2368-62138` | 1 pick, not a favorite (badge hidden, row set to MAX), "Favorites (0)". Stats 700 · 700 · S$845 · S$845 · S$0. Cursor on **Preview Storefront** |
| 02 | **Storefront preview (new)** | `2368-62381` | The desktop `2364-57970` restacked to 375: Status Bar + preview header ("/\/\ Your shop preview" + ✕). The creator card is detached from `Influencer Profile Card` and laid out vertically, with a 72px avatar, Follow, Copy Shop Link and a wrapping About-me strip. **Charlotte's Favorite Picks** is a horizontal scroll of 160-wide cards with 3:4 images. **Charlotte's Reviews** has the title block, then 300-wide review cards in a horizontal scroll. **All Picks** is a 2-column wrap of detached 166-wide cards, followed by pagination, the mobile footer and the HI. Price rows wrap, with texts set to WIDTH_AND_HEIGHT so "SAVE 30%" stays whole. **Clone this for any storefront or shop-preview mobile screen** |

## 10 - Stats Breakdown section — `node-id=2364-58157`

The section is 15010 wide, with each mobile frame 100px right of its desktop. The period-menu frame sits under Clicks, and **Detailed product stats** (`2364-58343`) sits under Total sales, re-spaced to 6145 wide.

| # | Screen | node-id | Notes |
|---|---|---|---|
| 01 | Favorites tab | `2372-61440` | Copy of Reorder 01 `2352-207169`, with cursors on the **TOTAL CLICKS** tile and on card 1's › |
| 02 | Total clicks | `2372-61754` | **Metric page (new)**, restacked from its desktop: Status Bar/Header/Search wrap, then "Home › Clicks" + All Time ⌄, then the big-number card, a full-width product search, and product rows (thumbnail, brand, name, variant, value + unit, ›), followed by the mobile footer. Cursor on All Time |
| 02b | Total clicks, period menu open | `2372-62140` | The period `Filter` menu (Last 7/14/30/90 Days, All Time) is right-aligned under the All Time button |
| 03 | Commission pending | `2372-62923` | Same template with its own figures |
| 04 | Total sales | `2372-62546` | 〃 |
| 05 | Commission earned | `2372-63306` | 〃 |
| 06 | Commission settled | `2372-63689` | 〃 |
| 07 | Product stats: Sales tab | `2372-64239` | **Product stats (new)**: breadcrumb "Home › Stats › product", then the product card (full width, 240-tall image), "Added to shop on …", Sales/Performance/Details pills, and the tiles |
| 08 | Product stats: Performance tab | `2372-64504` | The tile grid was converted from fixed-row GRID to a wrapping 2-up auto layout, because the grid kept a 362 height |
| 09 | Product stats: Details tab | `2372-64763` | The actions row is stacked vertically: price/commission tiles, then the share-link card (40px thumbnail, link + Copy), then "Available in Singapore & Malaysia" |

## 07 - Copy Affiliate Link section — `node-id=2344-78578`

Built 2026-09-25. Mobile frames sit 100px right of each desktop, and the section is 10530 wide. Stats: 200 · 150 · S$110 · S$310 · S$290.

| # | Screen | node-id | Desktop | Notes |
|---|---|---|---|---|
| 01 | My Shop, card menu open | `2360-57021` | `2344-78585` | Copy of `2235-36634`. The ★ Favorite badge is shown, with its row set to SPACE_BETWEEN. It reads "Favorites (1)". The menu reads View product details / Copy affiliate link / Remove from Favorites / Remove from shop. The menu's own cursor `2360-57126` points at **Copy affiliate link** |
| 02 | Link copied | `2360-57261` | `2344-78666` | Copy of 01 with the menu removed, plus a success toast reading "Link copied" |
| 03 | Product page, cursor on copy icon | `2360-57678` | `2344-78743` | Copy of `2343-38910` (Remove Featured 04) with Request Sample shown again. **New block `What creators say + review CTA`** (`2360-57967`) is the desktop's `2344-78831` restacked for 375 (details below). Performance reads TOTAL UNIT SOLD 2 · LINK CLICKS 700 · CONVERSION RATE 10% · COMMISSION SETTLED S$0, plus a full-width **View Other Stats** button (`Button=Outlined, Size=md`, `2:106`, icons hidden). A cursor sits on the affiliate link's `copy` icon |
| 04 | Product page, Link copied | `2360-58025` | `2344-78868` | Copy of 03 plus the "Link copied" toast. The cursor stays on the copy icon, as on the desktop |

**Reusable mobile blocks from this flow:**
- **What Creators Say card:** the `Editorial frame` inside `2360-57967`. It's laid out vertically with a gap of 16 and padding of 16/20: the "What Creators Say" label and MARCH 2026, then the quote (wrapping), then the author row with Elizabeth on the left and ‹ 1 / 24 › on the right (SPACE_BETWEEN). When restacking a desktop block, set `primaryAxisSizingMode = 'AUTO'`, or the card keeps the desktop's fixed 194 height and clips the quote.
- **Review CTA:** `Pdp-write-a-review-cta` in the same block. It's laid out vertically: star + title + description, then a full-width "Write A Review" button.
- **Mobile in-shop product page, complete:** 03 now has every desktop section: gallery, details, buttons, affiliate link, accordions, What Creators Say, review CTA, Performance with View Other Stats, and the footer. Clone 03 for any new product-detail screen reached from My Shop, in preference to `2343-38910`.

## 06 - Reorder Favorite section — `node-id=2344-77290`

Built 2026-09-25. Mobile frames sit 100px right of each desktop, and the section is 10434 wide. All three are copies of `2289-38912`. That frame's heading says "(4/4)" but it held **6** cards, so cards 5–6 were removed and card 4's › set to `State=Disabled` (`7:23410`). Stats are this desktop's figures: 200 · 150 · S$110 · S$310 · S$290 (Clicks, Sales, Pending, Earned, Settled).

| # | Screen | node-id | Desktop | Notes |
|---|---|---|---|---|
| 01 | Favorites tab, default | `2352-207169` | `2344-77297` | "All Picks (4) / Favorites (4)". Cards #1 Water Bank, #2 Snail, #3 Green Tea, #4 First Care. First ‹ and last › disabled |
| 02 | Reordered | `2352-207719` | `2344-77344` | Cards 1 and 2 swapped (Snail #1, Water Bank #2), with the ‹ states moved to match: card 1 disabled, card 2 enabled. "Publish Changes" is set to HUG and Preview Storefront to FILL, so the pair fits a 311-wide row |
| 04 | Reorder failed, error toast | `2352-207529` | `2344-77382` | The original order, plus the error toast `2348-55780` with its action button hidden: "Couldn't save the new order, we put it back the way it was" |

**Stepper buttons:** to change a ‹ › button's state, `swapComponent` between `7:23414` (Default) and `7:23410` (Disabled), then check that the chevron icon survived the swap.

## Remove Featured Product section — `node-id=2248-33651`

Built 2026-09-25 from the section's own desktop frames. This flow has no main-file twin. Mobile frames sit 100px right of each desktop: the later frames were shifted right to make room, and the section was widened to 12729. The UI copy uses **"Favorite"**, not the desktop's "Featured" (user's choice).

| # | Screen | node-id | Size | Desktop | Notes |
|---|---|---|---|---|---|
| 01 | Favorites tab 6/6, card menu open | `2342-38585` | 375×1678 | `2248-33652` | Copy of `2242-36731` (horizontal scroll with rank footers) plus the `Options List` from `2235-36703` on the **1st** card (the menu's own `Cursor` was deleted; a new one, `2355-57181`, points at "Remove from Favorites"), the only card fully visible. The menu reads View product details / Copy affiliate link / Remove from Favorites / Remove from shop |
| 02 | Removed, success toast | `2342-38965` | 375×1678 | `2248-33706` | Copy of 01 without the menu. The 4th card is removed and the ranks are renumbered #1–#5. It reads "Favorite products (5/6)" and "Favorites (5)", "View Shop" becomes **"Publish Changes"**, and the toast reads "Product removed from Favorites" |
| 04 | Product detail in my shop (favorited) | `2343-38910` | 375×2853 | `2248-33752` | Built from the PDP column `2320-46612` (inside `2320-46565`). The modal header is swapped for Status Bar + Header + Search wrap copied from `2242-36731`, and the breadcrumb reads "My shop › Water Bank…" (3rd level and trailing chevron hidden). A dark "★ Favorite" badge sits top-right on the image. Request sample is hidden, and the affiliate link is filled in and dark. The buttons are **Remove from Favorites** / Remove From Shop. A **Performance** block (Page header copy + stats card with the period row and 5th tile hidden) shows TOTAL UNITS SOLD 128 · COMMISSION EARNED S$568.32 · LINK CLICKS 2,410 · CONVERSION RATE 10%, followed by the **mobile footer** `2321-52957` |
| 05 | Product detail, removed, toast | `2343-39217` | 375×2853 | `2248-33875` | Copy of 04. The button reads "Add to Favorites" (no star icon: the button instance has no icon slot), the badge is hidden, and the toast reads "Product removed from Favorites" |

**Reusable from this flow:** 04 is the first mobile **in-shop product page**, with the app header, performance block and footer. Clone it for any product-detail screen reached from My Shop, rather than the catalogue's modal-style PDP.

**Stale PDP ids:** `2145-36673` and `2145-36780` (Product Detail Default / Added) are gone. Their current copies are `2320-46453` and `2320-46565` in section `2320-42706`.

## BROWSE & ADD PRODUCT section — `node-id=2153-42552` (gone, see the note above)

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

The source of truth is the main design file's mobile stats (`cehltPtMoGWEtKbF7k3MQQ`, node `794-26005`). Its exact copy in the Work File is **`2126-18146`** ("Application stats section" on "04.2 Home — Shop Completed — Mobile", formerly "06 — Shop completed — mobile"). **Clone that node** whenever a mobile screen needs shop stats, and change only the five `Total Products Value` texts.

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

## Updates from the 2026-09-25 whole-page review

- **03 - Publish Shop:** 03.2 / 03.4 / 03.5 are now centred dialogs (final-design pattern `2384:78404`), not bottom sheets. 03.2's underlay is `2426:223385` (a copy of 03.1).
- **08 - Remove Product:** 08.3 `2366-61376` is now a centred 335 dialog, with the HI at frame level (y778). Stats pages 10.2–10.10 have `Page Content` top padding 24, so each is 16–40px taller.
- **Onboarding & Home:**
  - Help Center (`2126-19174`) now has the house Header + Search wrap and a footer.
  - Recent Activities (`2126-19252`) gained a Search wrap and a footer.
  - Home 02/06 gained footers.
  - The logout confirmation (`2126-20809`) is now a centred 335 dialog ("Logout dialog", `2126-20953`).
- **Sample Request & Review:**
  - Full pages now end with the mobile footer.
  - 05.2 is 812 with a scrolling form and a sticky `fixed-button-bar`.
  - 06.2 is a centred 335 dialog (Keep Request / Cancel Request as Destructive).
  - The sheet underlays (M …) predate the footers; they're clipped at 812, so nothing shows.

**2026-09-30 organize pass:** every Onboarding & Home frame was renamed to `NN.S Flow — State — Device` (ids unchanged), and the Sample Request sections now sit in the recreated parent `2617:56695`. The nested stats sub-flow is `10.8 Detailed Product Stats` (`2381:64707`).
