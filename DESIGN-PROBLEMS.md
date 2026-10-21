# Mobile design — open problems

Figma Work File `FdmVPJo1j4t8s9gej1H7Yb`, flows page `2462:56445` ("-> Responsive Design (Web & Mob)").
Compiled 2026-09-30 from `.claude/skills/mobile-design-review/references/readiness-log.md` (last passes 2026-09-25 / 2026-09-28). No section is **Ready** yet.

Links: `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=<id>`

## 1. Urgent

| # | Problem | Where | Action |
|---|---|---|---|
| 1 | **The locked final design was edited by mistake.** Radius snaps (12/16/24 → 10, 7 → 8, 5.09 → 6, 2.5 → 4) and a border + 24 padding on two dialogs reached the final design while the lock pointed at a dissolved id. | `2384:76022`, `2384:77979`; dialogs `2384:78404`, `2384:78496` | Restore from version history |

## 2. Decisions needed

| # | Problem | Where | Options |
|---|---|---|---|
| 2 | **Product page figures disagree.** One product should read the same everywhere. | 05.3/05.4 show 128 / 2,410 / 10% / S$0; 07.x, 10.x, 11.3 show 2 / 700 / 10% / S$0 | Pick the canonical set |
| 3 | **"Add a review" shows before delivery.** The app only allows a review after delivery. | Sample Request 01.2 (Requested, Approved, Shipped) | Remove the link, or change the product rule |
| 4 | **Shop Info Card state is unclear.** Code reads 03.5 as "published, 0 products" and 03.6 as "publish blocked"; desktop shows "Publish shop" on both. Also: should never-published cards with products read "Preview Shop"? | 03.5, 03.6 | Match code or desktop |
| 5 | **Grey stats labels.** Several were darkened `#757575` → `secondary/800` for contrast, including elements the final design shows at `#757575`. | Sections 05–10, Onboarding, Sample Request | Keep the darker token or revert to the final design |
| 6 | **Red banner text** was changed without approval. | Sample Request 06–07 | Keep or undo |
| 7 | **Button casing.** The library Button forces Title Case ("Publish Changes"); the app uses sentence case ("Publish changes"). | All buttons | Change the component or the code |
| 8 | **Toast grows over the status bar.** A toast with a button or a second line tops out at 42, over the 47px status bar. | Toasts with actions | Re-anchor the toast wrapper |
| 9 | **Toast copy not approved:** "Favorites are full (4/4)" + "Manage", "Couldn't save the new order" + "Try again". | 04 / 06 toasts | Approve or rewrite |
| 10 | **Proposed gap fills** (approve or reject each): `#b1b1b1` meaningful text → `secondary/700`; close ✕ on non-confirm dialogs; `#fdecec` banner text → `primary/1000`; down-trend % → `secondary/800`; rank-footer text → `secondary/800` | Page-wide | Approve per item |

## 3. Open findings by section

| Section | Node | P1 | P2 |
|---|---|---|---|
| 03 - Publish Shop | `2230-78005` | Shop Info Card state (#4) | The banner sits above the Search wrap on 03.5; 03.4 was rebuilt with it below (`2499:58387`) |
| 05 - Remove Favorite Product | `2248-33651` | — | PDP figures differ from 07.3 (#2) |
| 07 - Copy Affiliate Link | `2344-78578` | — | PDP figures differ from 05.3 (#2) |
| 08 - Remove Product from Shop | `2364-57473` | — | Touch targets below 44px |
| 09 - Shop Preview | `2364-57887` | — | Pagination is detached, with no component |
| 10 - Stats Breakdown | `2364-58157` | — | `MetricsCard` contrast is set in the component; red trend "4%" is 3.57:1 (fails AA) |
| Sample Request & Review | `2384-65541` | Early "Add a review" (#3) | Library destructive colour contrast; red banner text inside an instance; no 14 SemiBold text style; touch targets |
| Profile Settings & Notification | `2375-62087` | — | Touch targets |
| 04 - Add Favorite Product | `2061-41656` | — | — |
| 06 - Reorder Favorite | `2344-77290` | — | — |
| Onboarding & Home Experience | `2446-47735` | — | — |

## 4. Missing states (not drawn yet)

| Section | Missing |
|---|---|
| 03 - Publish Shop | Publishing / loading, network error |
| 05 - Remove Favorite Product | Long product name on the PDP, menu dismiss |
| 06 - Reorder Favorite | Reorder loading |
| 08 - Remove Product from Shop | Remove error |
| 10 - Stats Breakdown | Loading, empty list |
| Onboarding & Home Experience | OTP error / expired, invalid email, apply-form errors, Recent Activities empty, Home loading |
| Sample Request & Review | List loading, submit error, keyboard open |
| Profile Settings & Notification | Save / add toasts, form errors, filled / enabled Save button |

## 5. Desktop leftovers (desktop is read-only unless approved)

- 13 `Profile & KPA` stats cards (03.x/04.x/05.x) still show "Total products" and "Commission owned", with no period filter.
- The desktop twins still read "Featured products (x/6)"; the product is now "Favorites", capped at 4.
- The final-design mobile `2384:80537` (locked) still uses the old "Total products" stats set.
- The 10.1 stats card has 20 top padding.
- The Home card variant has no Commission pending.
- Locked profile fields (02.1): a parity note only.
