# Shop personalization (MVP): Figma flows

Tracked as `T-38`. The scope and answers are in `REQUIREMENT.md` (MVP section) and `ANSWERS.md`. The post-MVP vision flows (`T-33`) are recorded in `REQUIREMENT.md`, not here.

## Where

- **File:** the Work File `FdmVPJo1j4t8s9gej1H7Yb`.
- **Page:** `Personlisation` `3223:139063`. The old flows page `2650:50683` was no longer in the file on 2026-10-16, and the user chose this page.
- **Top-level section:** `[Influencer] Shop Personalization (MVP) | 16.10.26` `3225:139064` (the page's former empty `Section 1`).
- **Built from:** Work File screens (`[Influencer] Shop Experience` › 09 Shop Preview: My Shop `1619:36894`, storefront preview `1619:36970`). The banner was rebuilt from the main file's WIP design `2383:87228`, since nodes can't be copied between files.

## Flows

Order proposed on 2026-10-16. The user asked for 02 first.

| # | Flow | Sub-section | Status |
|---|---|---|---|
| 01 | My Shop: stats row removed and the collections nudge | — | Not started |
| 02 | Open the banner editor | `3230:53715` | Desktop built 2026-10-16, awaiting approval |
| 03 | Change the backdrop | — | Not started |
| 04 | Feature a collection | — | Not started |
| 05 | Feature a product | — | Not started |
| 06 | Two featured items | — | Not started |
| 07 | Remove or replace a featured item | — | Not started |
| 08 | Storefront tabs: Picks and Posts | — | Not started |
| 09 | Featured item no longer available | — | Not started |
| 10 | Follower notification | — | On hold (follow feature to confirm) |

### 02 - Open the banner editor (desktop, awaiting approval)

**Two entry points (user, 2026-10-16):** the My Shop card now has a permanent **Edit Banner** button (outlined, `edit-3` icon) beside Preview Storefront, so creators can see that the banner is editable without opening the preview. It opens the preview with the panel already open. The preview's empty slot is the second way in. Each entry has its own row and cover.

| Row | Frame | Id | What it shows |
|---|---|---|---|
| 1 | `02.0` Cover | `3230:53716` | "My Shop → Edit Banner" (remote `Cover` component) |
| 1 | `02.1` My Shop Click Edit Banner | `3235:17173` | My Shop with the stats block hidden (Q9) and the new **Edit Banner** button. The cursor is on it. The card is detached (`Shop info card`) so the button could be added |
| 1 | `02.2` Edit Banner Panel | `3233:16959` | 1440 × 900. A 440px right panel over the preview: Header (Edit Banner, close ✕) · **Backdrop** (5 presets: Ripple Lines (selected, Default), Soft Dots, Grid, Plain, Valentine's Day (Seasonal)) · **Featured Items** (0/2, "Nothing featured yet", Add Featured Item) · Footer (Cancel, **Save Changes** disabled) |
| 2 | `02` Sub-flow From Preview Cover | `3235:17704` | "My Shop → Preview Storefront → Edit Banner" |
| 2 | `02.3` My Shop Click Preview Storefront | `3230:53725` | Same card with Edit Banner. The cursor is on **Preview Storefront** |
| 2 | `02.4` Preview Empty Banner Slot | `3230:53801` | The new **Banner** (1440 × 485): the Ripple Lines backdrop, the identity card, and a dashed **featured slot** ("Feature a collection or product", **Edit Banner**). The cursor is on the slot's button, which opens `02.2` |

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
