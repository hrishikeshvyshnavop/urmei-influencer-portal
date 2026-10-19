# Mobile readiness log

The status of every mobile flow section in the Work File (`FdmVPJo1j4t8s9gej1H7Yb`, flows page `2462:56445`). Update a row after each review or fix pass. Section ids and locked frames are in `../../_shared/workfile.md`.

Statuses:
- **Not reviewed**
- **Reviewed:** findings are open.
- **Fixing:** some fixes are applied.
- **Ready:** no open P1 or P2, full coverage, and agreed by the user.

| Section | Node | Status | Open P1 | Open P2 | Missing mobiles / states | Last pass |
|---|---|---|---|---|---|---|
| 03 - Publish Shop | `2230-78005` | Fixing | 1 (03.5/03.6 Shop Info Card state: code vs desktop, decision) | 1 (banner above the Search wrap on 03.5; 03.4 was rebuilt by the user with it below, `2499:58387`) | production: publishing/loading, network error | 2026-09-28 consistency passes |
| 04 - Add Favorite Product | `2061-41656` | Fixing | 0 (favorites cap resolved: 4) | 0 | none missing | 2026-09-28 |
| 05 - Remove Favorite Product | `2248-33651` | Fixing | 0 | 1 (PDP figures differ from 07.3, decision) | production: long PDP name, menu dismiss | 2026-09-28 PDP structure |
| 06 - Reorder Favorite | `2344-77290` | Fixing | 0 | 0 | production: reorder loading | 2026-09-28 |
| 07 - Copy Affiliate Link | `2344-78578` | Fixing | 0 | 1 (PDP figures differ from 05.3, decision) | none missing | 2026-09-28 PDP structure |
| 08 - Remove Product from Shop | `2364-57473` | Fixing | 0 | 1 (touch targets, code) | production: remove error | 2026-09-28 |
| 09 - Shop Preview | `2364-57887` | Fixing | 0 | 1 (detached pagination: no component) | none | 2026-09-28 |
| 10 - Stats Breakdown | `2364-58157` | Fixing | 0 | 2 (`MetricsCard` contrast is component-level; red trend "4%" 3.57:1) | production: loading, empty list | 2026-09-25 |
| Onboarding & Home Experience | `2446-47735` | Fixing | 0 | 0 | production: OTP error/expired, invalid email, apply-form errors, Recent Activities empty, Home loading | 2026-09-25 |
| Sample Request & Review | `2384-65541` | Fixing | 1 (01.2 "Add a review" before delivery, product question) | 4 (library destructive contrast, red banner text in an instance, no 14 SemiBold style, touch targets) | production: list loading, submit error, keyboard | 2026-09-28 PDP structure |
| Profile Settings & Notification | `2375-62087` | Fixing | 0 | 1 (touch targets, code) | still missing: save/add toasts, form errors, filled/enabled Save | 2026-09-28 components |

Sections 01 and 02 (Add Product) are gone. The locked final design covers that flow.

## Open decisions (start here)

Each item is carried over from the 2026-09-25 handoff (archived in `archive/handoff-2026-09-25.md`), unless marked new. Move an item to the log below once the user answers it.

1. **Grey stats labels:** keep the darker `secondary/800`, or revert to the final design's `#757575` where the final design shows the element?
2. **Red banner text** (Sample Request 06–07): keep it or undo it? It was applied under a gap fill that hadn't been approved.
3. **Product page figures:** 05.3 and 05.4 show 128 / 2,410 / 10% / S$0, while 07.x, 10.x and 11.3 show 2 / 700 / 10% / S$0. The app gives one product the same figures everywhere, so which set is canonical?
4. **Early "Add a review" link** on Sample Request 01.2 (Requested, Approved and Shipped). The app allows a review only after delivery. Product question.
5. **Locked profile fields (02.1):** a parity note only.
6. **Proposed gap fills** (approve or reject each):
   - `#b1b1b1` meaningful text → `secondary/700`
   - a close ✕ on non-confirm dialogs
   - `#fdecec` banner text → `primary/1000`
   - down-trend % text → `secondary/800`
   - rank-footer text → `secondary/800`
7. **New (2026-09-28): the final design was edited by mistake.** The radius passes and the modal pass reached `2384:76022` and `2384:77979` while the lock still pointed at the dissolved `2384:76021`. The radius snaps were 12/16/24 → 10, 7 → 8, 5.09 → 6 and 2.5 → 4. The two dialogs `2384:78404` and `2384:78496` got a border and 24 padding. **Restore from version history.**
8. **New: Shop Info Card state on 03.5 and 03.6.** The code reads 03.5 as "published, 0 products" (Publish changes + date line) and 03.6 as "publish blocked" (URL disabled, Preview muted, Publish shop disabled). Desktop shows "Publish shop" on both. Also: should never-published cards with products read "Preview Shop" (as in the code)?
9. **New: Button casing.** The library Button forces Title Case ("Publish Changes"), while the app uses sentence case ("Publish changes"). Change the component or the code?
10. **New: desktop leftovers** (the desktop is read-only unless approved):
    - 13 `Profile & KPA` stats cards (Total products, "Commission owned", no filter)
    - the 10.1 stats card has 20 top padding
    - the Home card variant has no Commission pending
11. **New: toast top.** A toast with a button or a second line grows to top 42, over the 47px status bar.
12. **New: toast copy.** "Favorites are full (4/4)" + "Manage", and "Couldn't save the new order" + "Try again". Not approved yet.

**Resolved 2026-09-28:**
- The banner position on 03.4: the user rebuilt the frame (`2230:76758` → `2499:58387`) with the banner below the Search wrap, the action linked to 02.3, and a stacked Shop Info Card. 03.5 still needs the same move.
- The favorites cap is 4 (old decision 3).
- Dialog body padding (old decision 7): aligned to the library `popup`, header 16/24 and body 16/24/24.

## Decisions log

Record the user's answers to design-decision findings here, with the date, so later sections apply them without asking again.

**2026-09-25: the reference is the final design, not the desktop (user's rule).** Don't derive mobile fixes from the desktop twin, and never edit desktop frames. Where the final design has no screen for a flow (e.g. Manage Account), use its patterns: centred 335 confirm dialog (`2384:78404`), a long form as an 812 sheet with a scrolling body and a sticky `fixed-button-bar` above the HI (Filter `2384:76990`), and the close ✕ as `Button=Outlined icon, Size=md` (`2384:78407`). A desktop-only difference is reported, not applied. So the 02.1 locked-fields finding was dropped.

**2026-09-25: My Shop mobile rules.** These match the final reference section `2384:76021` ("BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26 (Final design)"), mobile `2384:80204`.

1. **Footer on every full-page shop or home mobile.** Use `Footer/Mobile/Default` (clone `2384:80274`), placed between `Content` and the Home Indicator. The 812px sheet/dialog screens don't get one, because it would sit hidden behind the popup.
2. **The "Your Picks / Everything you add appears here + Add Product" toolbar** (`Content Toolbar`) shows on the All Picks tab when the shop has products. It's **removed in the empty state**, where the tab bar is followed directly by the "Your shop is empty" card.
3. **The dashed "Add Product / Choose from the catalogue" card** (`Add Product Slot` / `Add Product Tile — Mobile`) is **removed once a product is added**. The toolbar's "+ Add Product" button is the only add entry point.

Applied to sections 03–10 on 2026-09-25:
- 14 cards removed
- 3 empty-state toolbars removed (03.6 `2230:77752`, 03.2 `2153:45302`, 03.5 `2230:77536`)
- 23 footers added

Rows inside the sections were reflowed to keep 200px gaps, and the column was restacked.

**2026-09-25: Chrome matches the final reference `2384:87491`** (Status Bar + Header + Search wrap). This is auto-applied, and the spec is in `final-design.md`. Applied to 40 mobile frames in sections 03–10:
- Header `paddingBottom` 16 → 8 (80 → 72 tall)
- Search wrap padding 16 → 0/16/16/16, fill white → #f8f8f8 (bound), bottom radius 10 (bound). 70 → 54 tall
- 14 absolute cursors shifted up with their content

Exempt: `2368:62381` (09.2 Storefront Preview, shopper header).

**2026-09-25: chrome spec applied to Profile Settings & Notification** (`2375:62087`):
- The detached 88px white `Header` on the 10 Manage Account mobiles (02.1–02.10, the 3 sheet underlays included) was replaced with clones of reference `2384:80767` Header and `2384:80768` Search wrap. Each frame is +38 tall.
- The 01.1/01.2 notification underlays' Header pb 16 → 8, and their Search wrap 70 → 54 (bound).
- 1 cursor shifted (02.8). Row 2 of `02 - Profile & Settings` moved down 38 to keep the 200 gap, and both sections were refit.

**2026-09-25: fix pass on Profile Settings & Notification** (mobile frames only):
- **Sheets:** 02.4 and 02.7 are now 812 frames. Each sheet is 752 tall with a scrolling `popup / body` and a sticky `fixed-button-bar` (p10/24/42/24, top border). Buttons end 8px above the HI. On 02.9, the Set As sheet's bottom padding is now 42.
- **Spacing:** `Content` bottom padding 40 → 48, with L/R bound to `spacing/md` (10 frames). `Stack Wrapper` gap 40 → 32 (8 frames). `Settings Tabs` is FILL, clipped and scrolls horizontally (10 frames).
- **Text and colour:** 72 texts got library styles. 73 paints bound to tokens; `#ffffff`, `#000000`, `#e6e6e6` and `#996108` have no exact token and stay raw. On the 01.2 unread rows, `#757575` → `typography/color/secondary/800` (4.9:1).
- **Components:** 4 detached close buttons were replaced with the Button instance. The 01.x status bar is now white. The drawer's left border was removed, and its list fills the drawer. Beauty Niche's calendar icon was swapped for `chevron-down`.
- **Copy (mobile only):** "up to 2 MB", "When you have notifications, they'll show up here.", "URMEI sends your payout", "Add Bank Details", "Add Address", "Charlotte Wong", "Account number:", "started following you on URMEI". The desktop and the code still carry the old copy.
- **New frames:** 02.11 Delete Bank Details Confirm `2422:63734` and 02.12 Delete Address Confirm `2422:63841`, both centred dialogs.

**Sections 01 and 02** (`2344:45391`, `2344:43434`) are no longer on the page as of 2026-09-25. The final section `2384:76021` covers that flow.

**2026-09-25: My Shop spacing matches the final design.** Auto-applied, per the user's instruction to update automatically from the findings:
- `Content` padding 16/16/16/16 → **24/16/48/16**, gap 32 (reference `2384:80209`): 23 frames
- `Shop content wrapper` gap 32 → **16** between the "MY SHOP" page header and the Shop Info Card: 23 frames, dialog underlays included
- 7 cursors shifted with their content

The reference uses raw values, not variables. Binding 24 to `spacing/lg` is an open P3.


**2026-09-25: My Shop tab labels are `Body/body-md`** (16px, medium when selected and regular otherwise), per reference Tab Bar `2384:80233`. This is auto-applied, and applies only to My Shop pages. The catalogue, brand, product detail and sample-request tab bars stay `Body/body-sm`, as they are in the final design (`2384:76685`, `2384:79793`). Applied to the visible tabs of 25 frames:
- 03.1–03.7
- 04.1–04.7
- 05.1–05.2
- 07.1–07.2
- 08.1–08.4
- 09.1
- Notification 01.1–01.2

Frames that already matched: section 06, 10.1, and the older `2320:*` My Shop frames. Tell a My Shop screen by its "MY SHOP" page title, not by the header's "My Shop" link: every frame has the link, so matching on it catches the catalogue and product detail frames as well.

**2026-09-25: My Shop product cards match reference `2384:80247`** (`Featured product listing`, in `2384:80204`). Applied on the user's approval:
- The overflow "⋯" on 31 All Picks cards: `Button=Outlined icon, Size=md` (40px) → a clone of the reference `Size=sm` (24px, radius 6).
- The Favorite badge label on 29 cards: `body-xxs-medium` → `body-xs-medium`.
- The badge padding on 2 cards (03.1 `2224:76296`, 03.7 `2334:37819`): 4/16 → 4/8.
- The old "Product Card — Mobile (favorite)" cards in 03.3 and 03.4 were replaced with clones of the reference card, keeping their text. They are now `2411:228344` and `2411:228377`.
- The dashed Add Product Slot was removed from Notification 01.1 and 01.2 (decision 3). Those frames are a fixed 812 tall, so no reflow was needed.
- 06.2's reorder button `2352:207814` had no background; it now has the Default fill again.

A rerun of the comparison finds no differences. The Favorites carousel cards (260w) already matched.


**2026-09-25: chrome spec applied to Sample Request & Review** (`2384:65541`). This was auto-applied to all 34 mobile frames:
- Header `paddingBottom` → 8, L/R bound to `spacing/md`
- Search wrap padding 0/16/16/16 (bound), bottom radius 10 bound to `border/radius/lg`, fill copied from `2224:76254`
- 3 page cursors shifted up with their content

**2026-09-25: whole-page pass** (five parallel forks, mobile only; no desktop or final-design frame touched). Sections 03–10 were restacked at 200 gaps (06–10 moved by 3–32px), with no page overlaps.
- **03–04:** the Publish confirms 03.2/03.4/03.5 are now centred dialogs, and 03.2's underlay is a copy of 03.1 (`2426:223385`). The 03.5 banner reads "Your storefront stays hidden until you add products and publish your shop." "Featured" → "Favorite" on 14 frames. 16 styles, 24 tokens.
- **05–07:** PDP rhythm fixed (Content pb 24, last block → footer 48, variants gap 16). Copy: "appear" and "TOTAL UNITS SOLD". 7 styles, 18 tokens, and 06 row 2 moved down 24.
- **08–10:** 08.3 is now a centred dialog. On the stats pages, `Page Content` is 24/…/48 with L/R bound. 09.2 top padding 40 → 24. Copy: "About me:" and "★ Favorite". Section 10 rows reflowed.
- **Onboarding & Home:**
  - The chrome spec applied to Home, Help Center (the detached header swapped) and Recent Activities (Search wrap added), and footers added to 4 pages.
  - Login/OTP gutter 24 → 16, and apply-flow bottom padding 40 → 48.
  - The logout sheet is now a centred dialog.
  - Lorem ipsum replaced with the app's FAQ answer, and copy typos fixed.
- **Sample Request & Review:**
  - 10 footers added, and 12 short sheets now end 8 above the HI.
  - 05.2 is now an 812 sticky-bar form, and 06.2 a centred dialog with a Destructive button.
  - 3 ✕ buttons replaced with instances, 41 styles, 34 tokens.
  - Copy fixes (17 Sep 2026, Orchard Road, Lucky Plaza, URMEI, "Tell others"). The section is now 14910×33310.
- **Needs the user's call, the contrast rule conflict:** the forks for 05–07, 08–10, Onboarding and Sample darkened `#757575` → `secondary/800` on `#f8f8f8` tiles, including elements the final design itself shows at `#757575`. The 03–04 fork left them alone. By the source-of-truth order, the final design wins where it covers the element.

**Proposed gap fills (awaiting the user; not rules yet):**
1. Meaningful text in `#b1b1b1` on a light surface → `typography/color/secondary/700`. Placeholders and disabled labels are exempt. (Already used on the "Publish shop to get your URL" helper and on a 07 note.)
2. Every non-confirm centred dialog gets the `2384:78407` close ✕ (e.g. Change Language).
3. Text on a `#fdecec` alert banner → `typography/color/primary/1000`, keeping the red icon and tint. (Partly applied on 06–07 in the Sample section before approval.)
4. Down-trend % text on a tinted tile → `secondary/800`, with the ▼ glyph kept red.
5. Text on the `#f2efed` rank footer → `secondary/800` (4.59:1). This would override the final design's `/700`.


**2026-09-28: Favorites cap is 4 (user: "Favorite products (0/4) everywhere"), resolving open decision 3.** The flows now live on page `2462:56445` "-> Responsive Design (Web & Mob)".
- Mobile 04.4 (0/6 → 0/4), 04.5 (6/6 → 4/4), 05.1 (6/6 → 4/4), 05.2 (5/6 → 3/4). The extra favourite cards were removed (2, 2, 2), and the Favorites tab counts updated to (4), (4), (3). "appears" → "appear" on 04.4 and 04.5.
- The desktop twins still read "Featured products (x/6)", and are left for the user under the desktop read-only rule.
- **The mobile shop stats card is the canonical five metrics:** Total clicks, Total sales, Commission pending, Commission earned, Commission settled, with the "Showing" filter (clone of `2348:55137`). On 04.2, 04.4, 04.5, 04.6 and Home "06 — Shop completed — mobile", the old "Total products" card was replaced, keeping each screen's figures. Commission pending was taken from the desktop twin. Each card is 19px shorter.
- Still open: the final-design mobile `2384:80537` (locked) uses the old Total products set, and 13 desktop `Profile & KPA` cards (03.x/04.x/05.x) still show Total products and "Commission owned", with no filter.

**2026-09-28: approved edit to the locked final design.** The user asked for the mobile empty state `2384:80765` ("01 — Add product / My shop / Empty state — Mobile") to show the Shop Info Card buttons the way its desktop twin `2384:78848` does. Added `Stack / Preview Storefront` `2533:86830` to its card `2384:80776`: Preview Storefront (Outlined) and Publish shop (Primary), both `State=Disabled`, stacked full width with an 8px gap. The disabled eye icon stroke `#d5d5d5` was copied from desktop, and the status line is hidden. This matches `StoreCard.tsx` for "never published, no products". Nothing else in the frame changed.
