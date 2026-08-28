# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Note on `AGENTS.md`:** The repo also contains `AGENTS.md`, which describes a customized Next.js setup. That guidance is **stale** — the project was migrated off Next.js to Vite + React (commit `bee914a`). There is no Next.js here; ignore the "read `node_modules/next/dist/docs/`" instruction. This file reflects the actual stack.
>
> **Note on the repo name:** the directory and `package.json` are still named `samara` from an earlier marketing-site project. Those files were removed — this repo now contains only the URMEI creator portal.

## Commands

```bash
npm run dev      # Start Vite dev server (HMR)
npm run build    # Type-check (tsc -b) then production build (vite build)
npm run lint     # ESLint over the repo
npm run preview  # Serve the production build locally
```

There is no test runner configured.

## Stack

- **Vite 8** + `@vitejs/plugin-react` — SPA, no SSR/router/framework.
- **React 19** with `StrictMode`. Entry: `src/main.tsx` → mounts `App` into `#root` (`index.html`).
- **TypeScript** in strict mode with `noUnusedLocals`/`noUnusedParameters`. Bundler module resolution; `.tsx` extensions importable.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (not PostCSS). There is no `tailwind.config.js` — theme tokens are defined in CSS.

## Architecture

This is the **URMEI creator portal** — a set of standalone full-screen auth and onboarding screens implemented from Figma. There is no data layer.

- `src/App.tsx` selects a screen from `window.location.hash` via `useSyncExternalStore`. There is no router dependency; each `case` renders one screen and passes navigation callbacks down. Routes:
  `#/login` (default), `#/apply`, `#/apply/form`, `#/apply/success`, `#/forgot-password`, `#/check-inbox`, `#/reset-password`, `#/set-password`.
- `src/portal/` holds one file per screen. Figma's "filled"/"error" frames are implemented as interactive state inside their screen, not as separate routes.
  - `SetPassword.tsx` serves both the registration and password-reset frames — same markup, copy swapped via the exported `setPasswordCopy` / `resetPasswordCopy` objects.
- `src/portal/components/` holds the shared pieces:
  - `PortalLayout.tsx` — sticky side accent panel + header + vertically centred content column. Used by every screen except `ApplyLanding` (no header in the design) and `ApplyCreator` (own scrolling layout).
  - `PortalHeader.tsx` — zero-height `sticky top-0` wrapper so the header overlays the accent photo instead of consuming layout height.
  - `EmailField.tsx` (16px padding, body-md) vs `TextField.tsx` (12px padding, body-sm) — two distinct input sizes from the design system; pick by screen.
  - `PasswordField.tsx`, `Checkbox.tsx`, `SocialAccountRow.tsx`.

## Styling conventions

- Global styles live in `src/global.css`, imported once in `main.tsx`. It uses Tailwind v4's `@import "tailwindcss"` and an `@theme` block.
- **Design tokens are defined in `@theme`**, not a JS config, and mirror the Figma library: `--font-sans` (Figtree), the `--color-portal-*` ramp, and a `--text-body-*` / `--text-h*` scale that carries its own line-height. Use the generated utilities (`text-body-sm`, `bg-portal-dark`, `text-portal-muted`) rather than hardcoding hex or px.
- `src/portal/components/Button.tsx` is the shared button, with a typed `variant` system mapped through `variantClasses`. **Add new button styles as a variant here** rather than restyling buttons ad hoc; it spreads native `ButtonHTMLAttributes`. Filled variants carry `border-transparent` so they match the height of outlined ones sitting beside them.
- Expect rendered boxes to be ~2px taller than the Figma frame where a border is involved: Figma draws strokes inside the frame, CSS borders add to the box.

## Assets

Assets exported from Figma live in `public/urmei/` and are referenced by absolute path (e.g. `src="/urmei/side-panel.jpg"`). Icons are exported SVGs, not hand-written markup — several are raw vector fragments positioned by the percentage insets the Figma output specifies, so keep the nested wrapper spans when copying one.

`public/urmei/apply-hero.png` is the 2.5 MB Figma export used by the apply landing page; convert it to WebP before shipping to production.
