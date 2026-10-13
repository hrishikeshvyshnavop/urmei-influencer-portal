# Mobile plan — Sample Request & Review a Product

> **Archived 2026-09-28: built.** Kept for history. Node ids predate the page move; see `../../../_shared/workfile.md` for current ones.

Status: **built** (2026-09-25) inside the user's copy of the board on Responsiveness (`2384-65541`), not in the 01–10 column. See `existing-mobile-screens.md`. This follows the `/mobile-screen` new-flow workflow, steps 1–3.

- **Reference:** main file `cehltPtMoGWEtKbF7k3MQQ`, board `1030:27074`: 11 sub-flows, 35 desktop screens, 4 developer notes.
- **Work File copy of the board:** `2248-21224` on the page "Sample Request & Review Product" (`2248:20562`). No mobile frames exist yet.

## Decisions (user)

- **Placement:** **copy the board to Responsiveness** as new section(s) in the right-hand column, below `10 - Stats Breakdown`, and build the mobiles there (50px beside each desktop). Run `/organize-flow` afterwards. Numbering would continue at **11**.
- **Rating:** **bottom sheet** with the 1–10 scale.
- **Review form:** **full-height bottom sheet** for every state.
- **Developer notes:** keep **once, beside the desktop**; don't duplicate them for mobile.
- **Cursors:** mirror the desktop's. **Wording:** "Favorite", title case.

## Sources to reuse (Work File)

- **Account menu:** `2126-20651` (Onboarding 07).
- **Product pages:**
  - in-shop, with What Creators Say and the review CTA: `2360-57678`
  - catalogue, with Request Sample: `2320-46453`
- **Sheets:** `popup` from `2230-77536` / `2366-61376`. Product summary block: `2320-45094`.
- **Fields and addresses:** text fields from `2004-22278`, and address rows from the Apply form (`2126-17660` area).
- **Toasts:** success `2332-38320`, error `2348-55780`.
- **Chrome and templates:** footer `2321-52957`, cursor `2344:77335`, storefront preview `2368-62381` (the template for the long public PDP).
- **Desktop restack recipe:** see `mobile-screen/SKILL.md` gotchas.

## Screens by sub-flow

| Sub-flow (main-file section) | Desktop | Bucket | Mobile |
|---|---|---|---|
| 01 Sample Requests `1030:27076` | 01 Account Menu, 02 Request List, 03/04 Pending Request Details, 06 Shipped Request Details | Reuse + New | Account menu = `2126-20651`. **Request list** and **request details** (status pill, product row, timeline, tracking) are restacked from their desktops. These become the base for 06, 07 and 08 |
| 02 Request a Sample: Happy Path `1030:27669` | 3 screens | Adapt | `2320-46453` PDP, then the request **sheet** (summary, quantity, address, Confirm), then the requested state with a toast |
| 03 Request a Sample: No Address `1030:28125` | 2 | Adapt | The same sheet with the missing-address warning and Confirm disabled |
| 04 Change Shipping Address `1030:28438` | 2 | Adapt | Request sheet → full-height **address sheet** |
| 05 Add Shipping Address `1030:28763` | 2 | Adapt | Address sheet, empty and then filled |
| 06 Cancel a Request `1030:27424` | 3 | Adapt | Details → confirm sheet → cancelled state with a toast |
| 07 Rejected Request `1030:27601` | 1 | Adapt | Details with the rejected banner |
| 08 Write a Review `1030:30661` | 8 (01, 02, 03a, 03b, 04, 04a, 05, 06) | Adapt + New | Delivered details → rating sheet → review-form sheet for each state → submitted ("Your review · n/10") |
| PDP Creator Review Section `1030:29091` | 1 (1440×5347) | New | Restacked like `2368-62381`: gallery, details, creator reviews carousel, recommendations, footer |
| Creator Adding Product Review `1030:29148` | 4 | Reuse + Adapt | Account menu, review request default/active, and the PDP with the review sheet |
| Creator Reviews List View `1030:30185` | 3 | Reuse + New | Account menu, **Your Reviews list** restacked (photos under the text), and the PDP reviews display |

**Build order:** 01 first (it creates the request list and details base), then 02–08, then the three review sub-flows. Finish with `/organize-flow` on the new sections.
