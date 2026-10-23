# Figma files: URMEI context

The four Figma files the user pointed at on 2026-10-23, with what each holds. Ids were read from Figma that day; sections get re-copied, so find a section by name if an id stops resolving. Build rules (locked pages, components, tokens) live in `workflows/_shared/workfile.md`; this file is the map.

| File | Key | Portal | Use |
| --- | --- | --- | --- |
| [[MVP] Influencer Portal](https://www.figma.com/design/cehltPtMoGWEtKbF7k3MQQ/-MVP--Influencer-Portal?node-id=794-24650) | `cehltPtMoGWEtKbF7k3MQQ` | Creator portal (this repo) | Main design file: the locked web + mobile handoff and the new-feature page |
| [K-Beauty — Project](https://www.figma.com/design/jjLjjHCNlAAusOC5rnqhNr/K-Beauty---Project?node-id=1303-37860) | `jjLjjHCNlAAusOC5rnqhNr` | E-commerce portal | The URMEI shopping site |
| [K-Beauty — Work file](https://www.figma.com/design/BtZLL72dc5VxlwW45GLnQN/K-Beauty---Work-file?node-id=3197-24124) | `BtZLL72dc5VxlwW45GLnQN` | Both | Shared component library |
| [MVP] Influencer Portal \| Work File | `FdmVPJo1j4t8s9gej1H7Yb` | Creator portal | Where all new Figma building happens (see `workflows/_shared/workfile.md`) |

## 1. Creator portal, with mobile (MVP): `cehltPtMoGWEtKbF7k3MQQ`

Page **-> Responsive Design (Web & Mob)** `794:24650` is the final desktop and mobile design handed to dev. **It's locked: read and clone from it, never edit it.** Its mobile board `1174:34352` is catalogued in `workflows/mobile-screen/references/main-file-mobile-flows.md`.

Other pages: ✅ Updated Design - 09.09.26 `236:15116` (below), -> Visual Design - 24.08.26 `0:1`, Page 6 `1857:24922`, Cover `1:2`.

## 2. New features of the MVP creator portal: page `236:15116`

[✅ Updated Design - 09.09.26](https://www.figma.com/design/cehltPtMoGWEtKbF7k3MQQ/-MVP--Influencer-Portal?node-id=236-15116) is the client-facing page for the base MVP flows plus every feature added since. Not locked. Desktop frames, named `NN.S Flow — State — Desktop`.

### Base MVP flows

| Section | Id | Sub-sections |
| --- | --- | --- |
| [Influencer] Onboarding & Home Experience | `236:15508` | 00 Request Flow · 01 Registration & OTP Verification · 02 Profile setup & payment connection `2574:45326` · 03 Product Tour · 04 Home · 05 Help Center FAQ & Recent Activities · 06 Account Menu · 12 Language & Region |
| [Influencer] Profile settings & Notification | `236:18577` | 01 Notification · 02 Profile & Settings · Manage account — Addresses (shipping & billing) `2574:47137` |
| [Ecommerce] Storefront & Consumer Experience | `236:19239` | 01 Multi-market influencer storefront · 02 Product detail · Creator review in their storefront profile `915:28509` |
| [Influencer] Shop Experience | `236:20302` | 01 Add Product · 02 Search Filter and sort · 03 Publish Shop · 04 Add Favorite · 05 Remove Favorite · 06 Reorder Favorite · 07 Copy Affiliate Link · 08 Remove Product from Shop · 09 Shop Preview · 10 Stats Breakdown |

### New features (newest last)

| Date | Section | Id | Task / change request | What it adds |
| --- | --- | --- | --- | --- |
| 19.09.26 | Sample request & Review a product flow | `1030:27074` | — (built in code) | Request a sample, shipping address, cancel / rejected, write a review, creator reviews on the PDP |
| 30.09.26 | 00 - Request Flow | `1552:51223` | — (built in code: `/apply`, `/apply/verify`) | Apply Now with email + OTP verification: 00.1 landing → 00.2–00.5 verify email / OTP → 00.6–00.7 apply form → 00.8 submitted; errors 00.9–00.13; identity verification 00.14–00.15; the "Creator Account Approved" email |
| 07.10.26 | [NEW] Collections | `1862:81644` | `T-31`, `change-requests/collections/` | 21 flows: 01 Create · 02 Edit · 03 Delete · 04 Empty · 05 Add to Collection · 06 Name Errors · 07 Creator Product Page · 08 Open & Remove a Product · 09 Browse & Add Product to Collection `1970:101055` · 10 Edit / 11 Delete from Collection Page · 12 Reorder · 13 Copy Collection Link · 14 Unpublished Shop · 15 Storefront Preview · 16 Collections on the Storefront · 17 No Longer Available · 18 Remove from Product Page · 19 Add from Product Page · 20 Add from Search Results · 21 Browse & Add to Existing Collection `1970:101729`. Its 09 and 21 exist only in this file. |
| 15.10.26 | {NEW} Ideation Storefront — personalization | `2383:87224` | `T-33` / `T-38`, `change-requests/shop-personalization/` | Exploration only: storefront banner with one / two collections, two products, tabs (Posts, All Picks, Reviews) and a seasonal (Valentine's Day) theme, with annotations |
| 21.10.26 | ✨ NEW Personalization | `2799:103759` | `T-38`, `change-requests/shop-personalization/` | The MVP slice, six flows (below) |
| 22.10.26 | Assets 22.10.26 | `2906:75188` | `T-38` | Eleven copies of 06.1 Shopper's View — Two Featured Items, one per backdrop preset |

### ✨ NEW Personalization (21.10.26): the MVP slice

The creator customizes their storefront banner from My Shop: a backdrop, plus up to two featured items (collections or products). Changes go live on Publish.

| Flow | Id | Frames |
| --- | --- | --- |
| 01 Change Backdrop | `2799:105072` | 01.1 My Shop, click Change Backdrop → 01.2 dialog, current Plain → 01.3 Valentine's Day previewed → 01.4 banner saved; 01.5 Seasonal filter; 01.6–01.7 close with an unsaved pick → "Discard unsaved changes?" |
| 02 Add Featured Items | `2799:103760` | 02.1 click Add Featured Items → 02.2 pick a collection → 02.3 pick a product (2 of 2) → 02.4 two featured → 02.5–02.7 Change, uncheck one, Save → 02.8–02.9 one featured, Preview Storefront |
| 03 Search in the Picker | `2799:104205` | 03.1 matches · 03.2 cleared · 03.3 no matches |
| 04 Nothing to Feature Yet | `2799:104394` | 04.1 empty shop, click Add Featured Items → 04.2 picker empty (Browse Catalogue) |
| 05 Featured Item No Longer Available | `2799:104497` | 05.1 marked on My Shop → 05.2 removed, publish to go live; 05.3 shopper view; 05.4–05.7 Change → picker with the slot free → new item → replaced, publish to go live |
| 06 Shopper's View | `2799:104827` | 06.1 two featured · 06.2 one · 06.3 nothing featured |

Rules and decisions for these flows are in `change-requests/shop-personalization/REQUIREMENT.md`, `ANSWERS.md` and `FLOWS.md`; the components (Backdrop, My Shop banner, Storefront banner (e-com), Featured pick tile…) are in `workflows/_shared/workfile.md`. No code yet.

## 3. E-commerce portal: `jjLjjHCNlAAusOC5rnqhNr`

The shopper-facing K-Beauty site (the second portal; sort a screen by portal first). The linked page is **✨ 🛒 E-commerce Platform | 11.08.26** `1303:37860`, the current e-commerce visual design. The creator portal's storefront and PDP (`/shop/view`, `src/shop/`) should match it.

Other pages worth knowing: 🗂️ Foundations `1579:8`, 📦 Components `1646:86686`, ✨ Promotions - 07.09.26 `15287:5360`, 🏠 Updates `14165:105100`, ✅ Category | My orders | Address - 02.09.26 `14668:109324`, 👤 Guest User Login `12354:33659`, 🌐 Global Localization `9834:108130`, 🍪 Cookies `7633:17048`, ✅ Create Campaign `7522:114617`, 👥 Influencer Portal | 16.12.2025 `2532:7460` (older creator design), 💬 Client Feedback `2391:74789`, prototypes `3634:8352` (e-commerce) and `3233:101539` (influencer).

## 4. Components: `BtZLL72dc5VxlwW45GLnQN`

**💠Components** `3197:24124` is the shared component page for both portals. Some components there aren't published to the library (e.g. Pill Tab `3563:65314`), so the Work File rebuilds them locally; check `workflows/_shared/workfile.md` before rebuilding another. The file also holds the final presentations (influencer `6153:91998`, e-commerce `5557:136703`), Client Comments `6115:34587`, Asset Ratio Guidelines `8136:12400`, Promos & Coupons `9186:148235`, and the designers' workspaces.
