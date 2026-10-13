# Production-ready checklist for a URMEI mobile screen

A screen is production ready when a developer can build it without asking a question, and it survives real content, real devices and real users. Review every area below. Spacing has its own detailed standard in `spacing-rules.md`, and it is area 1 here.

The house references are `mobile-screen/SKILL.md` (frame and chrome contract), `mobile-screen/references/responsive-system.md` (type ramp and tokens) and `mobile-screen/references/main-file-mobile-flows.md` (the main file's mobile designs, components and conventions).

Severity:
- **P1:** blocks shipping. It will look broken or be unusable, or a developer can't build it as drawn.
- **P2:** visible inconsistency or a missing piece a user will hit.
- **P3:** polish and handoff hygiene.

---

## 1. Layout and spacing
See `spacing-rules.md`: the gutter, rhythm, proximity, cross-screen consistency, the 4pt scale and token binding.

## 2. Frame and device chrome
- The frame is 375 wide, its height hugs, and it is at least 812 tall. **P1** if it's wrong.
- The **Status Bar** instance (library set `2:2041`) is at the top, and the **Home Indicator** instance (library set `2:1824`) at the bottom (`../../_shared/workfile.md`). Both must be live instances, not detached, resized or redrawn. **P1** if missing or broken.
- Nothing interactive sits in the top 47 or bottom 34 safe areas. Sticky bottom bars keep the HI under them. **P1**.
- The content wouldn't clip at 390 or 430 wide: containers FILL, nothing is hard-fixed at 343. **P2**, found through area 9.

## 3. Typography
- Every text node uses a library text style (`Body/*`, `Heading/*`). Raw font settings are **P2**.
- Titles use the same style as their desktop twin, e.g. page title `body-xxl-regular`. There's no invented mobile size. **P2**.
- The family is Figtree only. Inter, Arial or Roboto leftovers are **P2**. The status bar's SF Pro is exempt.
- Minimum size is 12 for anything a user must read, and 10 only for fine print (`body-xxs`). **P2**.
- Long text is handled: product names clamp or truncate with an ellipsis (`textTruncation` or max lines), and nothing overflows its box or overlaps. Test the longest real string on the screen. **P1** if it overlaps.
- Line length stays readable, and paragraph text isn't justified. Alignment is consistent: body copy left-aligned, centring only in empty states and dialogs. **P3**.
- Casing matches the house rules: section labels in uppercase Heading ST ("MY SHOP"), buttons as the design system cases them. **P3**.

## 4. Colour and contrast
- Fills and strokes come from colour variables or styles (`surface/*`, `border/color/*`, `text/*`). A raw hex that matches a token is **P3**. A raw hex that matches no token is **P2**.
- **WCAG AA contrast:**
  - text under 18px needs 4.5:1, and 18px+ or 14px+ bold needs 3:1
  - icons and control borders need 3:1 against their background
  - placeholder `#b1b1b1` on white is 2.1:1, so flag it wherever it carries meaning, not just a hint
  - **P1** on primary content or actions, **P2** elsewhere
- State isn't shown by colour alone. Errors carry an icon or text as well as red, and a selected tab has a weight or underline as well as a colour. **P2**.
- Brand colours are used consistently, e.g. the alert red `#EE4442` for errors and the primary for the CTA. **P2**.

## 5. Components and consistency
- Use library or Work File component instances. A detached copy of something that exists as a component (Button, Tost, Header, Search, Pagination, Footer) is **P2**. The tell is a FRAME named like a component.
- No instance should have a missing main component. **P1**, because the developer has nothing to map.
- A variant should match its state, e.g. a disabled CTA uses `State=Disabled`, not an opacity override. Leftover overrides after a variant swap count here, like an icon colour kept from the old variant (see the gotchas in `mobile-screen/SKILL.md`). **P2**.
- One pattern per job across the flow:
  - every dialog is a bottom sheet or a centred dialog, matching the main file for that flow
  - every success message is the same toast
  - every back affordance is the same
  **P2**.
- Icons are one set, one stroke weight, and 16/20/24 on the grid, centred in their hit box. **P3**.

## 6. States and edge cases
Each screen in the flow needs the states its desktop has. For a production flow, it needs these too:
- default, empty, loading (skeleton or spinner, if data loads), error, success, and disabled (a CTA before the form is valid)
- long content: a long name, many chips, a big number such as S$12,345.67, and a region list that wraps
- a filled form, a form with inline errors, and the keyboard open on input screens (does the CTA stay reachable?)
- first-time vs returning, where the flow has both

A missing state the desktop has is **P1**. A missing production state (loading, long content, keyboard) is **P2**. List the missing states per screen; don't draw them during the review.

## 7. Content and copy
- Use real, final-looking copy. Lorem ipsum, "Text", "Label", "Button" or placeholder names are **P1**.
- Terminology: **"Favorite(s)"**, never "Featured", in the UI. The one exception is the activity-log labels, which follow the design's British "favourite" (see `CLAUDE.md`). **P2**.
- The same number reads the same across the flow's screens: stats, counts such as "All Picks (1)", prices. Currency is formatted `S$45`, `S$1,234.50`. **P2**.
- The same action is worded the same on every screen, e.g. "Publish Shop" vs "Publish" vs "Publish Changes", which should only differ by state. **P2**.
- Errors say what went wrong and what to do ("Bank details missing · Add bank details"). **P2**.

## 8. Interaction and ergonomics
- Touch targets are at least 44×44 with at least 8 between them. **P1** on primary actions, **P2** otherwise (38px buttons are house style; suggest a 44 hit area in code).
- The primary action is in the thumb zone (lower half) or sticky at the bottom on long forms and lists. **P2**.
- Every screen has a way back or a way to close: a back chevron, a sheet close or a scrim tap. Destructive actions confirm. **P1** if missing.
- Horizontal scrollers show a peek of the next card, so it's clear they scroll. **P2**.
- The hand `Cursor` appears where the desktop twin has one, on the same element (the user's rule, 2026-09-25). **P3**.
- Where the flow is prototyped, the connections match the flow order. **P3**, and only if prototypes exist.

## 9. Responsive build readiness (developer handoff)
- Everything is auto layout down to the component level. A frame with several children positioned absolutely at depth ≤3 won't translate to flex. **P2**, or **P1** for the page's main content column. The exceptions are deliberate overlays: cursor, toast, badge dot and scrim.
- Sizing modes express intent. Full-width children are **FILL**, not a fixed 343. Text blocks are FILL or HUG, not fixed-height boxes that clip. Frames grow vertically (HUG). **P2**.
- Images use the right fill mode (FILL/crop) at a stated aspect ratio, and have no empty image fills. Avatars are circular via radius, not a mask hack. **P2**.
- There are no hidden junk layers, stray off-frame nodes or zero-size frames inside the screen. **P3**.
- Layers have meaningful names, with no `Frame 2007737768`. Run `/organize-flow` for this rather than renaming by hand. **P3**.
- Frame names follow `NN.S Flow — State — Mobile`. **P3**.

## 10. Desktop parity and flow completeness
- **House rules for My Shop (2026-09-25):**
  - every full-page shop or home mobile ends with `Footer/Mobile/Default` above the HI
  - the "Your Picks" toolbar shows only when the shop has products
  - the dashed "Add Product" card never shows once a product exists
  Breaking any of these is **P1**. Details are in `readiness-log.md`.
- **The desktop is a coverage reference, not a design reference** (user's rule, 2026-09-25; see "Source-of-truth order" in `final-design.md`). Check *that* the mobile has what the desktop has. Take *how* it looks from the final design. Never edit desktop frames. A difference justified only by the desktop, such as a control state, layout, pattern or wording, goes in the report as a **parity note** (no severity, the user decides). It is not a fix.
- Every desktop screen in the section has its mobile twin beside it. A missing twin is **P1**.
- The mobile keeps the desktop's content, actions and information. Something dropped without an alternative (e.g. a sidebar filter that has no mobile sheet) is **P1**. This is about coverage: the alternative's design comes from the final design's patterns.
- It restructures rather than shrinks: columns stack, the sidebar becomes tabs or a sheet, the header splits into Header + Search wrap (`responsive-system.md`). A scaled-down desktop is **P1**.
- Order of steps: a user can walk from the first to the last screen with every transition drawn. **P2** for a gap.

## 11. Accessibility (beyond contrast and targets)
- A logical reading order: the top-to-bottom layer order matches the visual order. **P3**.
- Icon-only buttons have a clear meaning (a label in the dev notes is fine). **P3**.
- Form fields have visible labels, not placeholder-only labels. **P2**.
- Focus and selected states are visible on tabs, chips and radios. **P2**.
