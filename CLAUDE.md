# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Note on `AGENTS.md` and `README.md`:** `AGENTS.md` only points other agents here, and `README.md` is the short human overview. This file is the full reference. The project was migrated off Next.js to Vite + React (commit `bee914a`), so there is no Next.js here.
>
> **Note on Figma files:** node ids in code comments come from two files. Checked on 2026-09-25:
> - **Work File `FdmVPJo1j4t8s9gej1H7Yb`:** the `15xx:*`–`16xx:*` ids, e.g. `1584:96889` Activities, `1594:34810` filter panel, `1619:57134` notifications drawer, `1652:59743` product stats.
> - **Main design file `cehltPtMoGWEtKbF7k3MQQ`:** the `1030:*` ids (sample requests and Write a Review), the storefront PDP's `236:*`, and `350:*`.
> - **Neither file:** some `916:*` / `957:*` ids no longer resolve, so treat those as historical.
>
> Comments citing the main file usually name it.
>
> **Figma design work:** the Work File's current page ids, the **locked handoff design** (the whole main-file page `794:24650` "-> Responsive Design (Web & Mob)", plus the Work File's `2320:42706`: never edit them; build only in the Work File), components, tokens and product rules all live in `workflows/_shared/workfile.md`. Script traps are in `workflows/_shared/figma-gotchas.md`. Before any page-wide Figma write, check that every locked id still exists. If one is missing, stop and ask.

## Commands

There is no test runner configured, so verify UI changes by running the dev server and checking the page.

**Work tracking:** tasks live in `TRACKER.md` with permanent `T-nn` IDs. A new task takes the next free number, and IDs are never reused. Commit messages start `T-nn: <title>`, so `git log --grep T-nn` finds a task. Update the task's tracker row in the same commit. Only the user ticks **Live**, after checking the Vercel deploy.

**Where things live** (repo root):

| Path | What it holds |
| --- | --- |
| `src/`, `public/` | The app (see Architecture and Assets). |
| `TRACKER.md` | Every task, by `T-nn`. |
| `workflows/` | The agent-driven workflows: one folder per workflow, each with its `SKILL.md` and its own `references/`. `workflows/README.md` is the index. |
| `change-requests/` | One folder per client change request (`change-requests/<topic>/`): `REQUIREMENT.md`, then `ANSWERS.md` and `FLOWS.md` as the request reaches those steps. `change-requests/README.md` lists them with their task and status. |
| `.claude/` | Claude Code config only: `launch.json` and the thin auto-loading `skills/change-request` stub. No workflow content lives here. |

Don't drop new working documents at the root: a client request goes in `change-requests/<topic>/`, and a workflow note or report goes in its workflow's `references/` (finished or superseded ones in `references/archive/`, with a date in the name).

**Agent workflows** (`workflows/`). These are plain files, moved out of `.claude/skills/` on 2026-10-01 (and renamed from `responsive-workflow-urmei/` on 2026-10-13), so they don't run as slash commands. To use one, ask Claude to read and follow it, e.g. "follow `workflows/responsive-flow/SKILL.md` for <link>".
- `responsive-flow`: the automated pipeline. Paste a Work File flow link and it plans the mobile screens (one approval stop), then builds, places cursors, lays out pairs, verifies, reviews and updates the catalogues. It orchestrates the skills below; its scripts are in `references/scripts.md`.
- `mobile-screen`: building Figma mobile screens, including the new-flow reuse workflow and its catalogs in `references/`.
- `organize-flow`: tidying Figma flow sections.
- `mobile-design-review`: a senior-designer production-readiness review of the mobile flows (spacing, type, colour, components, states, copy, handoff, parity), then approved fixes, tracked per section in its `references/readiness-log.md`. `references/design-problems.md` is the 2026-09-30 summary of open problems compiled from that log.
- `responsive-workflow`: all of the above responsive skills and their references (plus `_shared/`) copied verbatim into one file, in workflow order (setup → build → organize → review → track). It's a generated bundle: edit the sources, then run `node workflows/responsive-workflow/build.mjs`.
- `figma-refine`: the Figma structure and naming refiner. It detects whether the selection is a Section, Frame or Component (Set) and runs only that type's cleanup (section flow layout, frame structure, or component variants and properties), renaming in Sentence case with no visual change. It's a pipeline step, not a separate command: `responsive-flow`, `change-request` and `mobile-screen` run it on every frame and component they build, before their screenshot check. `organize-flow` still names sections, covers and screen frames; the refiner names everything inside them.
- `figma-comments`: watches the Work File's comment threads with a Monitor poller, sorts each comment, and fixes the minor ones with parallel agents while the coordinator keeps the shared components, replying On it → Fixed → Closed. Start it with "start monitoring the comments". The token goes in git-ignored `.figma-token`.
- `clarify`: ask before assuming.
- `change-request`: the one exception to "plain files". The thin skill `.claude/skills/change-request/SKILL.md` loads it automatically whenever a client requirement, request or message comes up, so nobody has to name it. That skill only points here, so edit this source. The workflow covers how a client change goes from message to build. Intake into `change-requests/<topic>/REQUIREMENT.md`, then questions with options and `change-requests/<topic>/ANSWERS.md`, then Figma one flow at a time (each a numbered sub-section, approved before the next), then review and the client message, and only then code. It also lists the Figma rules for cursors, icons, covers, annotations, disabled states, toasts and frames. The worked example is Collections (`T-31`): `change-requests/collections/REQUIREMENT.md`, `change-requests/collections/ANSWERS.md`, `change-requests/collections/FLOWS.md`.
- `_shared/`: not a skill. It holds the Work File reference (`workfile.md`) and the `use_figma` gotchas (`figma-gotchas.md`) that the three Figma skills share. Update facts there, not in each skill.

`responsive-flow`, `mobile-screen`, `organize-flow`, `figma-refine` and `mobile-design-review` work in Figma, not in this codebase.

## Stack

- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (not PostCSS). There is no `tailwind.config.js` — theme tokens are defined in CSS.

## Architecture

This is the **URMEI creator portal**, implemented from Figma. It covers auth and apply, profile setup, Home, Manage Account, sample requests and reviews, My Shop, the catalogue, the storefront and the stats pages. **There is no backend.** Everything a user does (shop items, favorites, publish state, reviews, profile, bank details, notifications read state) is persisted in `localStorage` by small per-feature modules (`*-status.ts`, `sample-requests.ts`, `bank-account.ts`, `shop/data/*`). Figures such as stats and placeholder reviews are derived deterministically in code.

- `src/App.tsx` selects a screen from the URL path via `useSyncExternalStore`. There is no router dependency; each `case` renders one screen and passes navigation callbacks down. `src/router.ts` owns routing on the History API: `navigate(path)` (never assign `location.hash` or `location.href` to move between screens), `currentRoute()` (path plus query — the stats pages read `?from=…&via=…`), a document-level click handler that turns same-origin `<a href="/…">` into `navigate()` so plain anchors don't reload, and `upgradeLegacyHashRoute()` so old `/#/route` links still land. Real paths reach the server, so **production hosting must fall back to `index.html`** for unknown paths. `vercel.json` rewrites every path to it, and Vite's dev and preview servers already do this. Routes:
  `/login`, `/apply`, `/apply/form`, `/apply/success`, plus the profile-setup, onboarding, home and shop routes — see the `switch` in `App.tsx` for the current list.
- Screen- and component-level notes live next to the code: `src/portal/CLAUDE.md` (screens, `bank-account.ts`, the shared `portal/components/`) and `src/shop/CLAUDE.md` (My Shop, catalogue, storefront, stats).
- `src/components/ui/` holds the shadcn primitives (`components.json`: new-york style, lucide icons): Radix-backed `select`, `popover`, `dropdown-menu`, `checkbox`, `calendar` (react-day-picker) and `pagination`. The portal's `TextField`, `Checkbox`, `LanguageSelector` and `ProfileMenu` are built on them, so restyle through those wrappers. `@/` resolves to `src/` (`tsconfig.json`, `vite.config.ts`). `src/lib/form-validation.ts` has `scrollToFirstError` for the forms.

## Styling conventions

- **Rule: Footer below the fold.** On a full page the footer never shows in the first screenful, however short the content — it always starts at or below the bottom edge of the window, so the viewer scrolls to reach it. Pages built on `AppShell` pass `footerBelowFold`; a page with its own chrome wraps its header and content in a `min-h-screen` flex column with the footer outside it and gives `<main>` `flex-1` (as `shop/screens/StandaloneStorefront.tsx` does). Never size content off the viewport (`min-h-[calc(100vh-…)]`) instead: it ignores the setup banner and the sticky market bar. Every page with a footer follows it: all `AppShell` pages pass `footerBelowFold`, and the public storefront (`/shop/view`) and the in-app storefront preview wrap their own chrome. Check a new page at 1440×900 and 1920×1200 with its shortest content (empty state).
- Global styles live in `src/global.css`, imported once in `main.tsx`. It uses Tailwind v4's `@import "tailwindcss"` and an `@theme` block.
- **Design tokens are defined in `@theme`**, not a JS config, and mirror the Figma library: `--font-sans` (Figtree), the `--color-portal-*` ramp, and a `--text-body-*` / `--text-h*` scale that carries its own line-height. Use the generated utilities (`text-body-sm`, `bg-portal-dark`, `text-portal-muted`) rather than hardcoding hex or px.
- `src/components/Button.tsx` is the one button, with a typed `variant` system mapped through its `variants` record (the shop's `primary`/`outline`/`ghost` and the portal's `portal*` set). `src/portal/components/Button.tsx` and `src/shop/components/Button.tsx` only re-export it. **Add new button styles as a variant there** rather than restyling buttons ad hoc; it spreads native `ButtonHTMLAttributes`. Filled variants carry `border-transparent` so they match the height of outlined ones sitting beside them.
- Merge classes with `cn` from `src/lib/utils.ts`, not plain `twMerge`. It teaches `tailwind-merge` the theme's `text-body-*` / `text-h*` sizes. Without that, `twMerge` treats them as text colours and drops them when they meet `text-portal-*` / `text-text-*`. If you add a font-size token to `@theme`, add it there too.
- **Overlay stacking**: the portal's own layers run 40–70 (notifications drawer 40, profile menu 60, `FormModal` and the language modal 70). Radix hard-codes `z-index: 50` on the wrapper it portals every select list, popover and dropdown menu into, so `global.css` lifts `[data-radix-popper-content-wrapper]` to 80 — without it a select opened inside a modal paints behind the panel and reads as a dead control. A `z-*` class on the content itself is inert; the content box is static inside that wrapper.
- Expect rendered boxes to be ~2px taller than the Figma frame where a border is involved: Figma draws strokes inside the frame, CSS borders add to the box.

## Assets

Assets exported from Figma live in `public/urmei/` and are referenced by absolute path (e.g. `src="/urmei/side-panel.jpg"`). Icons are exported SVGs, not hand-written markup — several are raw vector fragments positioned by the percentage insets the Figma output specifies, so keep the nested wrapper spans when copying one.

`public/urmei/apply-hero.webp` is the apply landing hero, converted from the 1.4 MB Figma PNG export (quality 82, alpha kept, ~52 KB). Export new photos the same way rather than shipping raw PNGs.
