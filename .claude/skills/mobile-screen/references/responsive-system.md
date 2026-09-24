# How responsiveness works on the `Respodsiveness` page

Notes from inspecting the actual node structure (not just the visuals) of `FdmVPJo1j4t8s9gej1H7Yb` → page `Respodsiveness` (`node-id=1802-19394`). Read this before adapting a desktop screen to mobile, or before eyeballing "how big should this text be".

## Breakpoints

Only **two real breakpoints** exist: **375px (mobile)** and **1440px (desktop)**. Other widths seen on the canvas are not breakpoints:

- `500` / `940` — desktop's own internal split (Side Accent Panel 500 + Form Area 940 = 1440), not a separate screen size.
- `800` — fixed-size modal/dialog cards (e.g. Tour Dialog), independent of viewport width.
- `1920×1080` — section "cover" slides (divider art between sections), not a real screen.

Screens are paired by name suffix and sit side by side on the canvas: `"01 — Apply landing — desktop"` next to `"02 — Apply landing — mobile"`. There is no tablet breakpoint.

## Typography — one fixed scale, not fluid

Text styles come from a **remote shared library** ("K-Beauty - Work file"), not local styles in this file — `figma.getLocalTextStylesAsync()` returns 0; every text node instead has a `textStyleId` pointing at the library. The ramp is named `Body/body-{size}-{weight}` plus a few `Heading/*`:

| Style | Size / Line-height | Used for |
|---|---|---|
| `body-xxs-regular` / `-medium` | 10/16 | fine print (safety notes, timestamps) |
| `body-xs-regular` / `-medium` | 12/19 | helper text, captions |
| `body-sm-regular` / `-medium` | 14/22 | field labels, body copy, tabs |
| `body-md-regular` / `-medium` / `-bold` | 16/22 | primary body text, nav |
| `body-lg-medium` | 18/27 | list-row titles (e.g. "Instagram") |
| `body-xl-bold` | 20/30 | emphasis headings |
| `body-xxl-regular` / `-bold` | 24/36 | **page titles — used identically on both mobile and desktop** |
| `Heading/body-sm-medium(ST)` | 16/22, +10% tracking, uppercase | small uppercase section labels |
| `Heading/h6` | 24/34 semibold | card-level heading |
| `Heading/h2` | 48/62 | marketing hero headlines only (landing pages) |

**Key finding: the same named style is reused at both breakpoints.** A mobile page title and a desktop page title both bind to `body-xxl-regular` — there is no separate "mobile scale" that shrinks type. Responsiveness is delivered entirely through *layout*, not fluid typography. Don't invent a smaller font size for mobile titles — match the desktop screen's style name.

## Spacing / color — bound variables, in theory; inconsistent in practice

Padding, gaps, radii, and border colors are meant to come from **remote Figma Variables** (e.g. a frame's `paddingLeft` resolving to `spacing/md` = 16), not raw numbers. The full scale seen in use, all from the same remote library, single mode each (no light/dark or breakpoint-based mode switching — same values at both mobile and desktop):

| Token | Value | Token | Value |
|---|---|---|---|
| `spacing/none` | 0 | `spacing/lg` | 24 |
| `spacing/xs` | 4 | `spacing/md 2` | 20 |
| `spacing/ten` | 10 | `spacing/xl` | 28 |
| `spacing/sm` | 8 | `spacing/xxl` | 32 |
| `spacing/md-sm` | 12 | `spacing/3xl` | 36 |
| `spacing/fourteen` | 14 | `spacing/5xl` | 64 |
| `spacing/md` | 16 | `spacing/margin` | 120 (desktop page margin) |

Radius: `border/radius/sm`(6, the dominant default for cards/inputs) `/md`(8, buttons/larger containers) `/lg`(10, big modals) `/infinite`(9999, pills/avatars). Color: `border/color/default` (#e5e5e5).

**Component internals are reliable.** Every `Button` instance checked binds `paddingLeft/Right` → `spacing/md` and `paddingTop/Bottom` → `spacing/sm`, consistently, at both breakpoints.

**The page-level gutter is not reliable — don't assume a single "correct" mobile margin.** A survey of 87 mobile screens' outer `Content` frame found:
- **29 use a 16px left/right gutter, 18 use 24px.** No clean rule — there's a loose lean toward 24px on auth/profile-setup screens and 16px on main-app screens (Home, Help/FAQ, Recent Activities), but it breaks both ways within the same flow.
- Most of these page-level paddings are **hardcoded numbers, not bound variables** — only roughly a third of screens actually bind the gutter to `spacing/md`. Binding is much more common (and much more consistent) at the component level than at the page-chrome level.
- Section-to-section `itemSpacing` (gap between major blocks) is the one macro-level value that's fairly consistent: almost always **24 or 32**.

**Standard for new work: the left/right gutter is 16px** (see `SKILL.md`), bound via `figma.variables.importVariableByKeyAsync(key)` (find the key with `search_design_system`, `entity: "variable"`) + `setBoundVariable` rather than typing the raw number — that's what the better-maintained screens in the file do, and it keeps new work consistent even though a lot of existing screens aren't.

## How layout actually adapts between breakpoints

Since type and spacing tokens stay constant, adaptation happens structurally:

- Desktop's two-column layouts (settings sidebar + content, side-accent-panel + form) collapse to a **single-column stack** on mobile.
- Desktop's inline global header (logo + nav + search + lang + bell + avatar in one 1440-wide bar) splits into **separate stacked rows** on mobile — a `Header` row (logo, notification bell, avatar), then a `Search Wrap` row below it. Utility/settings pages (Recent Activities, FAQs, Manage Account) drop the search row entirely and use `Header` alone.
- Desktop sidebar nav (vertical list) becomes a **horizontal tab row** on mobile.
- Multi-column field grids (e.g. First name / Last name side by side) become **stacked single fields**.
- Every mobile screen still carries the shared **Status Bar** (`node-id=1802-19413`) pinned top and **Home Indicator** (`node-id=1802-19438`) pinned bottom — see `SKILL.md` in this folder for the chrome contract.
