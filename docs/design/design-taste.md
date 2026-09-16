# Design Taste: the URMEI Creator Portal

A working reference for what "on-brand" looks and feels like in this codebase, derived from the actual design tokens and components (`src/global.css`, `src/components/Button.tsx`, `src/portal/components/*`), not just the Figma source. Use this when a screen needs a judgment call the design file doesn't spell out.

## 1. Overall character

The portal reads as a **quiet, editorial, premium-DTC** product, not a dashboard or a typical SaaS admin tool. It leans on warm off-black/off-white neutrals rather than pure black/white or brand-color-heavy UI, generous whitespace, large lifestyle photography, and restrained motion. Nothing shouts — hierarchy comes from spacing and weight, not from saturated color or heavy borders. Think "boutique creator-brand app," closer to a fashion or beauty D2C site than a marketplace ops console.

## 2. Color: warm neutrals, one dark anchor, sparing accent

The palette (`--color-portal-*` in `src/global.css`) is almost entirely a warm greige ramp — not true grayscale:

- **Ink / dark anchor:** `#403e3c` (`portal-dark`) — used for primary buttons and the darkest accents. It's a warm charcoal, not `#000`.
- **Body text:** `#222222` → `#464646` → `#6c6c6c` → `#757575`, stepping down through `portal-text` / `portal-body` / `portal-subtle` / `portal-muted` for a clear but soft hierarchy — never pure black.
- **Surfaces:** `#fffefd` (`portal-light`), `#fdfdfd` (`portal-card`), `#f8f8f8` (`portal-surface`), `#efece9`/`#f2efed` (`portal-tint`/`portal-tick`) — a tight cluster of near-whites and warm off-whites, used to separate surface layers (page vs. card vs. inset well) without a visible color jump.
- **Borders:** one workhorse, `#e5e5e5` (`portal-border`), everywhere a hairline is needed.
- **Signal colors are used sparingly and specifically:** alert/error is `#ee4442`, success text is `#28802c` (a darker green than the `#66bb6a` used for success *borders/lines*, kept as two separate tokens because the light green washes out as text), and there's a single warm "notice" tone (`#a07539`) for one specific social-requirement callout. There is no general-purpose brand blue/purple/teal — status color is the only place saturated color appears.

**Taste rule:** if a new UI element needs a color, reach for the neutral ramp first. Only pull a signal color (`portal-alert`, `portal-success*`) when you're actually communicating state (error, success, warning) — never for decoration or to differentiate a "feature" visually.

## 3. Typography: Figtree, restrained scale, sentence case

- **Typeface:** Figtree throughout (`--font-sans`), a rounded, friendly, humanist sans — not a geometric/grotesk. Weights are limited to 400/500/600 (regular/medium/semibold) — no light or heavy display weights.
- **Scale:** a modest, evenly-stepped body scale (`body-xxs` 10px → `body-xl` 20px → `body-xxl` 24px) plus a few heading sizes (`h6` 24px, `h4` 32px, `h3` 40px, `h2` 48px) — there's no huge hero display size; the largest heading (48px) is still restrained for a marketing-adjacent product.
- **Case:** copy defaults to **sentence case**, not Title Case or ALL CAPS. Several button variants explicitly `capitalize` in CSS rather than relying on hand-typed casing. The one deliberate exception is `.track-section` — 1.6px letter-spacing on small semibold section labels, an editorial-magazine device used sparingly for section eyebrows, not body copy.
- **Line-height is generous relative to size** (e.g. 14px text gets 22px line-height) — text blocks breathe rather than sitting tight, reinforcing the calm, uncluttered feel.

## 4. Shape & elevation: soft, low, and quiet

- **Corner radius** is small and consistent: `radius-xs` 4px → `radius-lg` 10px. Buttons and inputs sit at 6–10px — rounded enough to feel soft, never pill-shaped or sharp-cornered (badges/chips are the exception, using full `rounded-full`/`rounded-[24px]` for pill treatment).
- **Shadows are almost absent.** Only two are defined, both extremely subtle: `shadow-ds-sm` (`0 1px 2px rgba(16,24,40,.05)`) and `shadow-store-card` (`0 4px 20px rgba(0,0,0,.03)`) — a 3–5% opacity soft glow, not a drop shadow. Depth comes from a 1px `portal-border` hairline and a slightly different surface tone, not elevation shadows. Product/listing cards (`ShopProductCard.tsx`) are just `rounded-sm border border-border-default` — a bordered box, no shadow by default.
- **Borders over fills** for separating content: cards, inputs, and dividers use the single `#e5e5e5` hairline rather than background-color blocking wherever possible.

## 5. Motion: fast, functional, one easing curve

`src/global.css` names this outright as a "minimal motion language." Everything shares:

- Three durations only — `--motion-fast` 160ms, `--motion-base` 240ms, `--motion-slow` 360ms.
- One custom easing, `--ease-portal: cubic-bezier(0.22, 1, 0.36, 1)` — a soft ease-out (fast start, gentle settle), used almost everywhere instead of `ease`/`ease-in-out`.
- Motion is entrance/exit choreography (fade+rise for cards/pages, scale+fade for modals/popovers, slide for drawers/bottom-sheets), never decorative looping animation (the one spin/pulse is reserved for loading states).
- Interactive feedback is a single, tiny scale: buttons `active:scale-[0.98]` — a subtle press, not a bounce.
- `prefers-reduced-motion` is respected globally (durations collapse to ~0).

**Taste rule:** new transitions should reuse `--motion-fast/base/slow` and `--ease-portal` rather than inventing new timing. If something needs motion beyond fade/slide/scale, that's a sign it's probably too flashy for this product.

## 6. Component conventions

- **Buttons** (`src/components/Button.tsx`): the primary filled button is `portal-dark` on `portal-light` text — the warm-charcoal-on-cream ink pairing, not black-on-white. Filled variants use `border-transparent` (not "no border") specifically so they match the height of outlined siblings sitting next to them. Outline/ghost/muted variants exist for a clear but restrained hierarchy of emphasis — there is no "danger red" button variant; destructive actions are marked via menu-item styling instead (e.g. "Remove from shop" in `ShopProductCard`'s overflow menu), not a loud button.
- **Inputs** (`TextField.tsx`): 12–16px padding, a 6px radius, a `portal-border` hairline that turns `portal-dark` on focus (not a bright brand-color focus ring) plus a soft `ring-2 ring-portal-surface` halo. Errors turn the border `portal-alert` and *stay* red even while focused/being fixed — the taste is "keep telling the truth," not hide the error the moment someone starts typing. A required field gets a small red asterisk icon, not bold/red label text.
- **Cards**: bordered, no shadow, small radius (`rounded-sm`), a rounded-full dark pill badge for overlays like "Best seller" tags (`bg-surface-secondary-900`, white text) — badges are dark-on-light, not colored.
- **Imagery**: full-bleed lifestyle photography is a primary brand device — the auth/portal side panel (`PortalLayout.tsx`) is a sticky 35%-width full-height photo, not an illustration or gradient. Where there's no photo, the neutral palette carries the page on its own rather than filling space with color blocks or iconography.

## 7. Copy & microcopy tone

Labels and empty states read as **plain, first-person-friendly, slightly warm** rather than corporate or terse system-speak — e.g. "No Notifications Yet!", "Publish shop to get your product URL", hint text delivered as a full sentence with a small info glyph rather than a cryptic tooltip. Errors state the problem plainly and don't apologize or over-explain.

## 8. Quick checklist for new UI

- Reach for the neutral greige ramp before any other color; save signal colors for actual state.
- Keep radius in the 4–10px range; reserve full-pill rounding for badges/chips only.
- Skip drop shadows — use a hairline border and a one-step surface-tone change instead.
- Animate with `--motion-fast/base/slow` + `--ease-portal`; keep interactive feedback to a subtle scale, not bounce/spin.
- Sentence case by default; reserve tracked-out small caps for section eyebrows only.
- If a card/section needs presence, reach for a photo before reaching for color.
