---
name: responsive-flow
description: One-command pipeline that turns a pasted Figma link to a desktop flow section in the URMEI Work File (FdmVPJo1j4t8s9gej1H7Yb) into finished mobile (375px) screens. It reads the flow, matches every desktop to an existing mobile to clone, shows one reuse-plan table and waits for "go", then builds every mobile, mirrors the desktop cursors, lays out desktop/mobile pairs, screenshot-verifies, runs the production review on the new section and updates the catalogues. Use when the user runs /responsive-flow, pastes a flow or section link and asks for its mobile/responsive screens, or asks to "make this flow responsive", "give me the mobile screens for this link" or "automate the responsive flow".
---

# Responsive flow: link in, mobile screens out

The user pastes a Work File link to a desktop flow section. This skill delivers that flow's mobile screens, ready for review. It **orchestrates the existing skills**, so their rules apply unchanged:

- `mobile-screen`: the frame contract, the reuse buckets and the house rules (cursors, Favorite wording, toasts, Shop Info Card, PDP).
- `organize-flow`: the pair layout and naming.
- `mobile-design-review`: the production review.
- `_shared/workfile.md` and `_shared/figma-gotchas.md`: ids, locked frames, tokens, product rules and script traps.

Load `figma:figma-use` before the first `use_figma`. Reusable scripts are in `references/scripts.md`. The first worked run (00 Request Flow, 2026-10-01) is in `mobile-screen/references/existing-mobile-screens.md`.

**One approval stop (the user's choice, 2026-10-01).** Stages 1–2 are read-only and end with the plan table. After the user says "go", stages 3–7 run without stopping, and everything is reported at the end. If the user's "go" leaves a question in the plan unanswered, take the recommended default and say so in the report.

**Standing rules:**
- Build only in the Work File.
- Never delete anything: hide, rename or move instead.
- Never edit desktop frames' contents. Moving them is allowed because it's part of layout.
- Never touch the locked ids.

## Stage 1: Read the flow (read-only)

1. Parse `node-id` from the link (`2660-53392` → `2660:53392`).
2. Run `get_metadata` on it. Big output goes to a file, so parse it with Python (script A). List every frame with its id, name, size, x/y and whether it has a cursor (`Annotation / Cursor…` / `Cursor`). Find the section's page with a `use_figma` parent walk.
3. Screenshot every desktop at `maxDimension` 720. Group the screens into happy-path columns (same x) and edge cases (stacked below a Default).
4. Note duplicate or wrong names, and desktop frames that crop their content (frame height < `Form Area` height).

## Stage 2: Match and plan (read-only), then stop

1. **Find candidate mobiles** on the flows page with script B: every 360–400-wide frame, keyed by its normalised state name. Ids go stale whenever the page is replaced, so trust script B over the inventory. Also check `mobile-screen/references/main-file-mobile-flows.md` for main-file designs.
2. **Screenshot each candidate** next to its desktop before bucketing it, because names lie.
3. **Diff the copy** with script C (desktop texts vs candidate texts). This shows exactly what to override.
4. **Read the states** with script D (Inputbox / Button / OTP box `State` and `Fill` values per screen). Error, filled and disabled states come from these variant values, not from restyling.
5. **Show one table:** `# | Screen | Bucket (Reuse/Adapt/New) | Mobile to clone | What changes`.
   - Under it, say where the frames go. If there isn't room for a 375 frame 50px beside each desktop, plan to move the desktops.
   - List at most three questions, each with a recommended default.
6. **Wait for "go".** Nothing is written before that.

## Stage 3: Build (after "go")

Build in order: Reuse, then Adapt, then New, so later screens can clone earlier ones. Use one `use_figma` per screen family (for example all email screens), retry-safe, and return every id. Use helpers E1–E4 from `references/scripts.md`.

- **Clone the mobile into the target section,** named after its desktop (`… — Desktop` → `… — Mobile`). Place it temporarily at desktop x + width + 50.
- **Gutter:** bind the content frame's `paddingLeft` / `paddingRight` to `spacing/md` and set its 327-wide children to FILL (legacy clones have 24px gutters).
- **Copy:** override texts to the desktop's wording. Keep the earlier mobile wording only where it fixes a desktop typo, and report it.
- **States:** set variant properties (`State=Error/Filled/Disabled`, button `Label`) from script D's desktop values. Then hide whatever the variant drags in that the desktop doesn't show (for example the error Inputbox's required asterisk, `label > Vector`).
- **Desktop-only blocks** (error rows, info lines): clone the desktop node into the mobile's auto-layout. Set it to FILL, and set its text to `textAutoResize = 'HEIGHT'` with `layoutGrow = 1`.
- **Swapping filled fields:** insert the filled sibling's instance at the old index, then hide the old one and rename it `… (replaced)`.
- **Rules from `mobile-screen` → "House rules"** apply as written.

## Stage 4: Cursors

Each desktop that shows a cursor gets one on its mobile twin.

1. Hit-test the desktop cursor's fingertip (30% / 12% of the graphic) with script F. That gives the target's label.
2. Find the same label on the mobile.
3. Clone the **desktop's own cursor node** into the mobile frame and set it ABSOLUTE, with the fingertip on the target's centre. For a text target, use the same offset into the text.
4. If the desktop cursor sits outside its frame's crop, skip it and report it.

## Stage 5: Lay out pairs

Use script G:
- Columns follow the desktop x order.
- Each mobile sits 50px right of its desktop. Columns are `1440 + 50 + 375 + 200` = 2065 apart.
- Rows in a column start at y 100 and step by `max(desktop, mobile) height + 200`.
- The cover stays first.
- Grow the section to fit, and never shrink it.

## Stage 6: Verify and review

1. **Screenshot every new mobile** (`node.screenshot`, scale ~0.5) and compare it with its desktop: copy, states, cursor target, nothing clipped, chrome intact, height ≥ 812. Fix differences with targeted scripts.
2. **Run `mobile-design-review` Phase 1** on the new section only. Report its findings table, but **don't apply fixes**: they need approval under that skill.

## Stage 7: Record

1. In `mobile-screen/references/mobile-inventory.md`, add a section block with every new id and height. Mark any stale ids you found.
2. In `mobile-screen/references/existing-mobile-screens.md`, add one build-notes block for the flow: sources, overrides, quirks and cursors.
3. In `_shared/workfile.md`, update the section's id and status.
4. Regenerate the `responsive-workflow` bundle from the sources (its "Regenerating" section), so it includes these edits and this skill.
5. Don't commit unless the user asks.

## Final report

- **The new frames:** a table with name, id, height, and source cloned.
- **Layout changes:** frames moved, and the section size.
- **Judgment calls:** defaults taken, wording kept, skipped cursors.
- **The review findings,** from Stage 6.
- **Questions for the user,** at most three.
