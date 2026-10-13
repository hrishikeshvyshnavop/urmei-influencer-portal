# Mobile spacing standard — what a review measures against

House values come from the main file's mobile board (`cehltPtMoGWEtKbF7k3MQQ` `1174:34352`, catalogued in `mobile-screen/references/main-file-mobile-flows.md`) and from the rules in `mobile-screen/SKILL.md`. Where the canvas disagrees with them, the canvas is the finding.

## 1. Scale

All spacing tokens come from the remote library and have one mode, so the values are the same on mobile and desktop.

| Class | Values | Review rule |
|---|---|---|
| **Core (4pt)** | 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 64 | Expected everywhere |
| **Legacy tokens** | 2 (`spacing/two`), 10 (`spacing/ten`), 14 (`spacing/fourteen`) | Allowed inside components, such as chips, footer groups and filter headers. At page or section level, flag as P3 and suggest the nearest core value |
| **Off-scale** | anything else (6, 13, 15, 18, 22, 33, 108…) | P2, or P1 if it breaks rhythm or alignment. Exceptions: optical nudges of 1–2px inside an icon or badge, and fixed chrome (Status Bar 47, HI 34) |

Radius is not spacing, but check it in the same pass. The values are `/xs` 4, `/sm` 6, `/md` 8, `/lg` 10, `/infinite`. The same component should use the same radius on every screen.

## 2. House values by layer

| Layer | House value | Notes |
|---|---|---|
| Screen width | 375, height hugs with a minimum of 812 | |
| **Page gutter (L/R)** | **16**, bound to `spacing/md` | 24 is legacy and still found on auth/setup screens and confirm-popup underlays. Within one flow it must not mix |
| Status Bar | 47 tall, top edge, nothing overlapping | |
| Header | pt16 pb8 px16, bottom radius 10, `#f8f8f8` | Search wrap under it is px16 pb16 |
| Header/search → first content | 24 (`Content` pt24) | Page title → its card is 16 |
| **Section gap** (between major blocks) | **32** in app pages (My Shop wrapper), **24** in detail columns (PDP) | Choose one per screen type and keep it through the flow |
| Card padding | 16 | Product row card p16 gap12. Empty-state card p33 is a known oddity, so flag it as P3 |
| List of cards | gap 16 | Brand grid gap 12. Catalogue brand grid gap 16 is known drift |
| Row inside a card | gap 12 (thumb ↔ text), 4–8 (label ↔ value) | |
| Buttons | px16 py8 (sm) or py12 (full-width CTA). Primary CTA height 46–48 | Component internals are reliably bound, so review only overrides |
| Bottom sheet | top radius 10, head pt24 pb12 px16, rows h46 px16. The last row or button bar ends **8 above the HI** (bottom padding 42 including the HI) | Final design wins over the old pb32 (2026-09-25). Long forms: 812 frame, scrolling body, sticky `fixed-button-bar` (`final-design.md` patterns) |
| Centred dialog | 335 wide (20 side margins), radius 12, body p16 gap16 | |
| Last content → Footer | pb48 on `Content` | |
| Home Indicator | 34 tall, bottom edge, **nothing interactive in it** | |
| **Touch targets** | **≥44×44** (Apple HIG) | 38px pagination, close and page buttons are house style. Flag them P2 and suggest a 44 hit area in code, because they're a real miss on primary actions |

## 3. The checklist — how a senior designer reads a screen

Work through these in order for every screen. The first four are about structure, and most P1s come from them.

1. **Edges.** Is the gutter identical on every screen of the flow? Does nothing but deliberate full-bleed (images, header, footer, horizontal scrollers) touch the edge? Horizontal scrollers should start at the gutter and bleed off the right edge, which shows there's more.
2. **Proximity (Gestalt).** Space inside a group must be smaller than space between groups. The test: internal gap < external gap, ideally by at least one step (8 → 16, 16 → 24/32). A label closer to the next field than to its own field, or a price closer to the next card, is P1.
3. **Rhythm.** Walk the screen top to bottom and read the gaps in order, e.g. `24 · 16 · 32 · 32 · 12 · 32`. A healthy screen uses 2–3 values in a repeating pattern. Many different values, or one odd value in a run, means nobody set a system.
4. **Hierarchy through space.** More space above a section heading than below it, because the heading belongs to what follows. Equal space on both sides makes the heading float. The biggest gaps should separate the most important breaks.
5. **Cross-screen identity.** The same component (card, header, sheet, toast, tab row, stats tile) must have the same padding, gap and radius on every screen. Compare the fingerprint columns.
6. **Alignment.** Do text left edges line up down the screen, at the gutter or on one inner indent? Are icons optically centred in their buttons, and do icon rows align to text baselines, not boxes? Are numbers in stats tiles on one baseline?
7. **Density fit.** Mobile needs air and a thumb-sized layout, not a scaled-down desktop. Watch for desktop gaps (48+, 120 margin) carried into mobile, and for mobile cards packed tighter than 12 between rows.
8. **Touch and safe areas.** Targets ≥44. At least 8 between adjacent tap targets. Primary CTA reachable and not in the HI zone. Sticky bars account for the HI (the filter bar has a 28 HI under it).
9. **States.** Error, empty and toast versions of a screen keep the default's spacing. An error message shouldn't collapse the gap under its field, and an empty-state card should sit where the list starts.
10. **Tokens.** Page- and section-level values bound to `spacing/*` variables. Correct but unbound is P3. Unbound and off-scale is reported under that value's own severity.

## 4. Known drift on the canvas (don't rediscover as news, but do report where it appears)

- Gutter 16 vs 24: 29 of 87 surveyed screens use 16, 18 use 24, and only about a third are bound (`responsive-system.md`).
- The confirm-popup underlays (`1174:36676`, `1174:36768`) use 24.
- Brand grid gap 12 vs the catalogue's 16.
- Empty-state shop card p33 gap26, both off-scale.
- Filter chips row: the last two chips use Inter 11. That's type, not spacing, but mention it if seen.
- Adapted toasts: the inner Toast's `itemSpacing` 108 must be 12 (`mobile-screen/SKILL.md` gotchas).
