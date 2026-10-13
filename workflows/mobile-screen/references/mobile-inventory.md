# Mobile frame inventory: current ids

This lists every mobile screen frame (360–400 wide) on the flows page `2462:56445`, by section, with its height. It was generated from the live file on **2026-09-28**. **Use these ids.** `existing-mobile-screens.md` keeps the build notes, but many of its ids are older (see "Stale ids" at the end). Regenerate this file with the read-only script at the bottom after any reorganisation. 🔒 marks a locked section (read and clone only).

## [Influencer] Shop Experience `2446:56196`

**03 - Publish Shop** `2230:78005` (6 desktops)
- `2224:76254` 03.1 My-shop Default (2032)
- `2153:45302` 03.2 Confirm Dialog (812)
- `2332:38320` 03.3 Success Toast (2489)
- `2499:58387` 03.4 Publish Failed Dialog (812). **Rebuilt**; it was `2230:76758`.
- `2230:77536` 03.5 Publish Failed Dialog (812)
- `2230:77752` 03.6 Empty State (2139)
- 03.7 Card Menu Open (`2334:37777`) no longer exists.

**04 - Add Favorite Product** `2061:41656` (7 desktops)
- `2231:78919` 04.1 My-shop Default (2032)
- `2235:36634` 04.2 Context Menu Open (2489)
- `2348:55109` 04.3 Success Toast (2489)
- `2238:36643` 04.4 Empty State (2368)
- `2242:36731` 04.5 Favorite Tab Full (2418)
- `2260:36845` 04.6 Context Menu Slots Full (5675)
- `2348:55355` 04.7 Error Toast Slots Full (5675). This is the toast reference.

**05 - Remove Favorite Product** `2248:33651` (4 desktops)
- `2342:38585` 05.1 Context Menu Open (2418)
- `2342:38965` 05.2 Success Toast (2418)
- `2343:38910` 05.3 Product-detail Default (3364)
- `2343:39217` 05.4 Success Toast (3364)

**06 - Reorder Favorite** `2344:77290` (3 desktops)
- `2352:207169` 06.1 Favorites-tab Default (2418)
- `2352:207719` 06.2 Reordered (2418)
- `2352:207529` 06.3 Error Toast (2418)

**07 - Copy Affiliate Link** `2344:78578` (4 desktops)
- `2360:57021` 07.1 Hover Card (2489)
- `2360:57261` 07.2 Success Toast (2489)
- `2360:57678` 07.3 Product-detail Default (3418). This is the **PDP structure reference**.
- `2360:58025` 07.4 Success Toast (3418)

**08 - Remove Product from Shop** `2364:57473` (4 desktops)
- `2366:60539` 08.1 Hover Card (3020)
- `2366:60815` 08.2 Context Menu Open (3020)
- `2366:61376` 08.3 Confirm Remove Dialog (812)
- `2366:61082` 08.4 Success Toast (2489)

**09 - Shop Preview** `2364:57887` (2 desktops)
- `2368:62138` 09.1 My-shop Default (2489)
- `2368:62381` 09.2 Storefront Preview (3794)

**10 - Stats Breakdown** `2364:58157` (7 desktops)
- `2372:61440` 10.1 Favorites Tab (2418)
- `2372:61754` 10.2 Total Clicks (2060)
- `2372:62546` 10.3 Total Sales (2060)
- `2372:62923` 10.4 Commission Pending (2060)
- `2372:63306` 10.5 Commission Earned (2060)
- `2372:63689` 10.6 Commission Settled (2060)
- `2372:62140` 10.7 Total Clicks, Period Menu Open (2060)
- Sub-flow **Detailed Product Stats** `2381:64707` (3 desktops):
  - `2372:64239` 10.8 Sales Tab (1630)
  - `2372:64504` 10.9 Performance Tab (1540)
  - `2372:64763` 10.10 Details Tab (1670)

**🔒 Final design `2384:76022`** (6 desktops): catalogue, brand, search and filter
- `2384:76660` 02 Catalogue Default (2164)
- `2384:76867` Brand (861)
- `2384:76943` search-results-filter-expanded (812)
- Filter frames: `2384:76990` (the sticky-bar reference), `2384:77083`, `2384:77181`, `2384:77254` (812 each)
- `2384:77327` (812)
- `2384:77702` 08 Search results Success toast (1170)
- `2384:76023` 11 Search results No results (812)

**🔒 Final design `2384:77979`** (11 desktops): My Shop and PDP
- `2384:80765` 01 My shop Empty state (1565). This is the chrome reference `2384:87491`.
- `2384:79650` / `2384:79706` Browse Products, Catalogue Default (2092 / 2182)
- `2384:79248` Product detail content (1346)
- `2384:79768` 05 Product detail Default (1666). This is the modal PDP.
- `2384:78345` 06 Confirm popup (812). Centred dialog `2384:78404` is inside it.
- `2384:78437` 07 Confirm popup, Dropdown open (812)
- `2384:79390` 08 Search results Success toast (1170)
- `2384:79880` 09 Product detail Added (1666)
- `2384:80204` 10 My shop Product added (1944) and `2384:80313` (long, 3537)
- `2384:80509` 05 Favorites tab full (2357)

## 00 - Request Flow (Apply Now with email verification) `2660:53392`

Top-level section on page `2650:50683`, built 2026-10-01. Desktop columns are 2065 apart (desktop, 50, mobile, 200); edge cases are stacked under their Default.

- `2666:58399` 00.1 Apply Landing (812)
- `2666:56266` 00.2 Verify Email Default (812)
  - `2666:56447` 00.9 Invalid Email (812)
  - `2666:56552` 00.10 Email Already Has Account (812)
- `2666:56358` 00.3 Verify Email Filled (812)
- `2666:56655` 00.4 Verify Email OTP Default (812)
  - `2666:56820` 00.11 OTP Resend Available (812)
  - `2666:56902` 00.12 OTP Incorrect Code (812)
  - `2666:56989` 00.13 OTP Too Many Attempts (812)
- `2666:56737` 00.5 Verify Email OTP Filled (812)
- `2666:58508` 00.6 Apply Form Default (2136)
- `2666:59199` 00.7a Apply Form Filled, Not Verified (2136), twin of desktop `2660:53557` (that desktop is also named "00.7")
  - `2666:59594` 00.14 Verification in Progress (2028)
  - `2666:59978` 00.15 Verification Error (2014)
- `2666:58884` 00.7 Apply Form Filled (1919)
- `2666:58445` 00.8 Application Submitted (812)

## [Influencer] Onboarding & Home Experience `2446:47735`

> **Stale (2026-10-01):** the page was replaced, and this section is now `2650:118471`. Its 01 Request Flow mobiles are `2650:119212` landing, `2650:119026` form default, `2650:118862` form filled, `2650:118688` in progress, `2650:118519` error and `2650:118473` submitted. Its 02 Registration & OTP mobiles are `2650:119457` / `2650:119388` email default/filled and `2650:119317` / `2650:119245` OTP default/filled. The `2446:*` ids below don't resolve.

The older copy of this section, the `2126:*` ids, is on Hrishi Workspace now. Use these ids.

- **00 Request flow** `2446:47736`:
  - `2446:48476` Apply landing
  - `2446:48290` Apply form default
  - `2446:48126` Apply form filled
  - `2446:47952` Verification in progress
  - `2446:47783` Verification error
  - `2446:47737` Application submitted
- **01 Registration & OTP** `2446:48508`:
  - `2446:48721` Enter email
  - `2446:48652` Enter email filled
  - `2446:48581` Enter OTP
  - `2446:48509` Enter OTP filled
- **03 Product tour** `2446:49613`:
  - `2446:50327` Welcome
  - `2446:50491` Track your impact
  - `2446:50656` Curated products
  - `2446:50821` Earn commissions
- **04 Home** `2446:48783`:
  - `2446:49115` First-time user (2294)
  - `2446:48784` Shop completed (3275)
- **05 Help Center FAQ** `2446:49401`: `2446:49449`
- **06 Recent activities** `2446:49508`: `2446:49548`
- **07 Account menu & logout** `2446:50986`:
  - `2446:50987` Account menu
  - `2446:51391` Logout confirmation
- **08 Language selector** `2446:51445`: `2446:51446`

## [Influencer] Profile Settings & Notification `2375:62087`

- **01 Notification** `2375:62088`:
  - `2389:65047` 01.1 Empty State
  - `2389:65316` 01.2 With Items
- **02 Profile & Settings** `2375:62288`:
  - `2386:63654` 02.1 Profile Edit Form (bottom Save Changes hidden on mobile: saving moved to the sticky bar)
  - `2550:51968` 02.1a Profile Edited, Sticky Save Bar (812 viewport, row 3 at y 5100)
  - `2550:52326` 02.1b Unsaved Changes Dialog
  - `2550:52706` 02.1c Profile Saved Toast
  - `2386:63995` 02.2 Social Accounts Connected
  - `2386:64183` 02.3 Bank Details Empty State
  - `2389:64125` 02.4 Add Bank Details
  - `2386:64411` 02.5 Bank Details Connected
  - `2386:64642` 02.6 Addresses Empty State
  - `2389:64426` 02.7 Add First Address
  - `2386:64863` 02.8 Addresses Set As Menu
  - `2389:64758` 02.9 Set As Pop-up
  - `2386:65156` 02.10 Addresses Set As Done
  - `2422:63734` 02.11 Delete Bank Details Confirm
  - `2422:63841` 02.12 Delete Address Confirm

## Sample request & Review a product flow `2384:65541` › Flows `2384:65542`

- **01 Sample Requests** `2384:65543`:
  - `2396:58696` 01.1 Account Menu
  - `2396:58854` 01.2 Request List
  - `2396:59062` 01.3 Pending (approved)
  - `2396:59498` 01.4 Shipped
  - `2396:59284` 01.5 Pending (waiting)
- **02 Request a Sample: Happy Path** `2384:66136`:
  - `2400:64684` 02.1 Product Page (a modal PDP)
  - `2400:65005` 02.2 Request Sheet
  - `2400:65348` 02.3 Requested Toast
- **03 No Address** `2384:66596`:
  - `2400:65633` 03.1 Product Page
  - `2400:65940` 03.2 Request Sheet, No Address
- **04 Change Shipping Address** `2384:66909`:
  - `2400:66285` 04.1 Request Sheet
  - `2400:66625` 04.2 Select Delivery Address Sheet
- **05 Add Shipping Address** `2384:67268`:
  - `2400:67034` 05.1
  - `2400:67443` 05.2
- **06 Cancel a Request** `2384:65891`:
  - `2402:81769` 06.1 Cancellable Details
  - `2402:82007` 06.2 Confirmation
  - `2402:82127` 06.3 Cancelled
- **07 Rejected Request** `2384:66068`: `2402:82341` 07.1
- **08 Write a Review** `2384:69218`:
  - `2402:82534` 08.1 Delivered Details
  - `2402:82787` 08.2 Rating Sheet
  - `2402:82921` 08.3 Photo Uploading
  - `2402:83093` 08.4 Filled
  - `2402:83438` 08.5 Photo Added
  - `2402:83786` 08.6 Submitted
  - `2402:83614` 08.7 Low Rating
  - `2402:83265` 08.8 Upload Error
- **09 Product Page with Creator Reviews** `2384:67626`: `2404:64589` 09.1 Public PDP (5927)
- **10 Creator Adding Product Review** `2384:67720`:
  - `2404:62101` 10.1 Review Prompt
  - `2404:62450` 10.2 Rating Sheet
  - `2404:62729` 10.3 Review Form
  - `2404:63067` 10.4 Own Review Shown
- **11 Creator Reviews List View** `2384:68757`:
  - `2404:63403` 11.1 Account Menu
  - `2404:63726` 11.2 Review List
  - `2404:63918` 11.3 Reviews Display

## [Ecommerce] Storefront & Consumer Experience — Mobile `2652:66074` (page `2248:20562`, added 2026-09-30)

- `2652:66075` S1 Storefront — Default (4982)
- `2654:29530` S2 Storefront — Followed (4342)
- `2654:29922` S3 Storefront — No Picks in This Market (4999)
- `2654:221838` S4 Storefront — Vietnam Localization (4951)
- `2655:227545` R1 Storefront — Review Detail Sheet (812)
- `2655:29976` P1 PDP — Default (from Storefront) (4010)
- `2655:222516` P2 PDP — Not Available in Market (3840)
- `2655:223354` P3 PDP — Notify Me Sheet, Signed In (812)
- `2655:226477` P4 PDP — Notify Me Confirmed (812)

> **2026-09-30:** the flows page is now **`2650:50683`** and every id above this section changed to `2650:*` (e.g. 09.2 is `2650:130464`, 09.1 Public PDP `2650:145003`). `2462:56445` no longer exists. Regenerate this file with the script below, pointed at the new page.

## Stale ids in `existing-mobile-screens.md`

Checked on 2026-09-28. Of its 151 ids, 102 are current.

- **Moved to Hrishi Workspace:**
  - `2004:22278`, `2024:22599` (the old Manage Account mobiles, since superseded by 02.x)
  - all `2126:*` (the old Onboarding copy)
  - `2229:57939`, `2289:38912`
  - `2320:*`, including the locked `2320:42706`
  - `2321:52957` (the mobile footer, still valid as a clone source)
- **Moved to other pages:** `1619:36927` and `1619:36953` (Influencer Portal v2), and `400:16257` (Sharon).
- **No longer exist:**
  - `1802:19394` (the old page), `1810:20063`, `1993:24344`, `2081:72865`, `2133:16713`
  - all `2145:*` except those listed above
  - `2153:42552` (the old Browse & Add section), `2180:71804`, `2190:74648`, `2190:74761`, `2190:74928`, `2222:16744`, `2229:58131`, `2230:76592`
  - `2230:76758` (03.4, now `2499:58387`), `2231:79376`, `2334:37777` (03.7)
  - `2344:62881`, `2355:57147`, `2364:58343`, `794:26005`

## Regenerating this file

Run this read-only script with `use_figma`, then rewrite the lists above from its output:

```js
const pg = await figma.getNodeByIdAsync('2462:56445'); await figma.setCurrentPageAsync(pg);
const out = []; const walk = (sec, path) => { const m = sec.children.filter(c => c.type === 'FRAME' && c.width >= 360 && c.width <= 400);
  if (m.length) out.push({ section: path + sec.name.trim(), id: sec.id, mobiles: m.sort((a, b) => (a.y - b.y) || (a.x - b.x)).map(f => `${f.id}|${f.name.trim()}|${Math.round(f.height)}`) });
  for (const c of sec.children) if (c.type === 'SECTION') walk(c, path + sec.name.trim().slice(0, 30) + ' › '); };
for (const s of pg.children.filter(c => c.type === 'SECTION')) walk(s, ''); return out;
```
