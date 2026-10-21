---
name: mobile-design-review
description: Senior UX/UI production-readiness workflow for the URMEI mobile (375px) designs in the Figma Work File (FdmVPJo1j4t8s9gej1H7Yb, flows page 2462:56445). First syncs every mobile screen to the user's final design (diffs each screen against its reference frame, auto-applies approved rules, applies the user's marks from chat row numbers or `claude:` Figma annotations, reports new differences), then reviews every aspect a 20-year designer signs off — spacing, chrome, typography, colour and contrast, components, states, copy, ergonomics, handoff, desktop parity, accessibility — and fixes the approved findings, tracking each section in a readiness log. Use when the user runs /mobile-design-review, pastes a final-design or reference link to match, or asks to sync, update, match, review, audit, QA, polish or make production ready any mobile or responsive flow, section or screen in Figma — including spacing-only reviews.
---

# Mobile design review — make it production ready

Review the mobile flows in the Work File (`FdmVPJo1j4t8s9gej1H7Yb`, flows page `2462:56445`; ids, locked frames and product rules in `../_shared/workfile.md`, script gotchas in `../_shared/figma-gotchas.md`) the way a designer with twenty years of product work signs off a handoff. The question for every screen: **could a developer build this without asking anything, and would it survive real content, real devices and real users?**

The skill runs in two phases:
- **Review** is read-only.
- **Fix** runs only on the user's approval.

Never edit during a review.

Load `figma:figma-use` before any `use_figma` call. Start every script with `figma.skipInvisibleInstanceChildren = false`. A failed script rolls back completely, so rerun it whole.

## References (read before starting)

- **`references/production-checklist.md`**: the 11 areas, what is checked in each, and the default severity.
- **`references/spacing-rules.md`**: the detailed spacing standard (area 1).
- **`references/audit-script.js`**: the read-only measuring script.
- **`../_shared/workfile.md`** and **`../_shared/figma-gotchas.md`**: ids, locked frames, components, tokens, product rules and script traps. Shared with the other Figma skills.
- **`references/readiness-log.md`**: the status of every section, the **Open decisions** to raise with the user first, and the **Decisions log** of approved rules. Read it first, and update it after every review and fix.
- **`references/final-design.md`**: the final-design reference frames and the chrome spec. It is the source of truth.
- **`references/sync-script.js`**: the read-only diff against the final design, which also collects `claude:` annotations.
- From `mobile-screen/`: `SKILL.md` (frame and chrome contract, house rules), `references/responsive-system.md` (type ramp, tokens) and `references/main-file-mobile-flows.md` (the main file's mobile designs, which are the reference for what "correct" looks like). Also `references/existing-mobile-screens.md` (current node ids; stale ones are noted there).

## Sync to final design (run this first, every time)

The user's **final design** (`references/final-design.md`) is the source of truth. Before any review, and whenever the user says to sync, update or match the final design, run this loop on the target sections:

1. **Read the rules.**
   - `final-design.md`: the reference frames per archetype and the chrome spec.
   - The **Decisions** list in `readiness-log.md`: every rule there has been approved.
   If the user has pasted a new reference link, screenshot it and inspect it first. Record it in `final-design.md` as a rule, with the date and node id, before applying it.
2. **Diff.** Run `references/sync-script.js` with `TARGET_IDS` set to the sections. It sorts each mobile screen by archetype, compares its slots (chrome, content padding, tabs, toolbar, Add Product card, footer, order) against the reference frame, and collects the user's marks (step 4).
3. **Auto-apply what's approved.** A difference that an approved rule covers is fixed without asking, e.g. the chrome spec, the footer, the Your Picks toolbar, or the Add Product card. Keep each fix script retry-safe and idempotent, meaning it checks before changing. Shift absolute cursors that sit below a resized block. Afterwards, reflow the section's rows (200px gaps), refit the section and restack the column, as the 2026-09-25 pass did.
4. **Apply the user's marks.** The user can mark changes in two ways:
   - **In chat:** reply with the row numbers from the sync report, e.g. "apply 2, 5, 7".
   - **In Figma:** add a Dev Mode annotation on the node that starts with `claude:`, e.g. `claude: match reference padding` or `claude: remove this`. The sync script returns every `claude:` annotation. Apply each one. Then remove that annotation, or replace it with `done: <what changed>` if the user wants a trail, and log it.
   A mark whose intent isn't clear gets one question. Never guess.
5. **Report new differences** that no rule or mark covers, as a numbered table: `# | screen (node) | slot | now | final design | proposed fix`. Don't apply these. The user approves by row number or marks them in Figma. When the user approves a difference as a **general rule** ("do this everywhere"), add it to the Decisions list in `readiness-log.md` and to `final-design.md`, so every later sync auto-applies it.
6. **Verify.** Screenshot a sample of the changed frames (a full page, a dialog, and one per archetype touched). Rerun the sync and confirm that the approved differences are gone.
7. **Log it.** Add a dated line under Decisions (what was applied and to how many frames) and update the section rows. Then continue with Phase 1.

## Scope

- **One section or a link:** review it.
- **"All" / "every mobile design":** work section by section, **01 → 10**, in the order of `readiness-log.md`. Do one full review, then its fixes, then move to the next section. Don't audit everything first and fix later, because findings go stale and the report gets too long to act on. After each section, give a one-line status and continue unless the user stops you.
- **"Just spacing" or another single area:** run only that area (set `CHECKS` in the script) and use the same report format.
- Only mobile frames (360–400 wide) are reviewed **and edited**. Desktop frames are read-only.
- **The desktop says *what*, the final design says *how*** (user's rule, 2026-09-25). Desktop twins are the reference for **coverage** only: which screens, states, content and actions must exist. Layout, spacing, components, control choice, dialog pattern and copy come from the final design and its patterns (`final-design.md` → "Source-of-truth order"). A difference whose only source is the desktop is a **parity note** for the user, never a fix.
- Check that node ids exist before planning around them (`get_metadata` on the page or section).

## Phase 1 — Review

1. **Inventory.** Run `get_metadata` on the section and list every screen as id, name, size and device. Pair each mobile with its desktop twin, and list every desktop **without** a mobile, since that's a P1 parity finding. Order the screens by flow step. Parse large output in a subagent.
2. **Look first.** `get_screenshot` every mobile and its desktop twin. Before measuring anything, note your first impressions: hierarchy, where the eye lands, what feels cramped, loose or off-brand, and what's missing compared with the desktop (content and states, not styling). Then compare the mobile with the final design's nearest frame or pattern for *how* it should look. The numbers won't catch these.
3. **Measure.** Run `audit-script.js` with `ROOT_IDS` set to the section (one section per call). It returns per screen:
   - frame and chrome checks, and the gutter
   - a spacing histogram and off-scale values
   - text styles, fonts, small text, untruncated fixed text boxes, and "Featured" or placeholder copy
   - contrast failures and unbound colours
   - missing main components, likely-detached frames, and opacity used as a state
   - frames without auto layout, fixed widths that should FILL, empty image fills, and off-frame or zero-size nodes
   - touch targets, text inside the gutter, and controls in the HI zone
   - counts of hidden layers and default names
4. **Build the fingerprint.** Make one table per section: a row per screen and a column per role (gutter, header → content, section gap, card padding, list gap, CTA height, bottom padding, title style, primary colour, toast or sheet pattern). Bold the outliers. Cross-screen drift is the finding users feel most.
5. **Judge.** Go through `production-checklist.md` area by area for every screen. Areas 6 (states), 7 (copy), 8 (ergonomics) and 10 (parity) are judgment calls the script can't make, so do them from the screenshots. Use the desktop twins for coverage and the final design for how the screen should look. Confirm every script hit in the screenshot. Drop false positives, such as a deliberate full-bleed image or a decorative 10px label, and say briefly that you dropped them.
6. **Report** (format below), then ask which fixes to apply.

## Report format

```
## Production review — <NN - Section> (<n> mobile screens, <m> desktops)

**Verdict:** Ready | Ready after P1 fixes | Not ready — <one sentence on the biggest problem>
**Scorecard (1–5):** Layout & spacing · Chrome · Type · Colour & contrast · Components · States · Copy · Ergonomics · Handoff · Parity · A11y

### Coverage
<desktop → mobile pairs; missing mobiles; missing states per screen>

### Fingerprint
<table, outliers bold>

### Findings
| # | Sev | Area | Screen (node) | Element | Now | Should be | Why | Fix |
|---|-----|------|---------------|---------|-----|-----------|-----|-----|
```

- **Ranking:** P1 first. Within a severity, put the finding that hits the most screens first. Merge identical findings into one row that lists every node.
- **Why** is design reasoning in one clause, e.g. "fails AA at 2.1:1: an unreadable price in sunlight" or "breaks proximity: the label reads as part of the next field".
- **Fix** is concrete and executable, e.g. "bind paddingLeft/Right → `spacing/md`" or "swap to `State=Disabled`".
- **Links:** `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=<id with - for :>`.
- **Ending:** close with **What's working** (2–3 lines) and **Fix order** (the few changes that fix the most).
- Mark findings that need a **design decision** rather than a mechanical fix, like a missing loading state or which dialog pattern to use. These go to the user as questions, not fixes.
- For a long review the user may share, offer once, in one line, to publish it as a page.

## Phase 2 — Fix (only on approval)

Ask which fixes to apply: all P1s, P1 and P2, everything mechanical, or chosen rows. Then:

1. **Screenshot before.** Keep the pre-fix screenshot of every frame you'll touch.
2. **Fix mechanical findings in place,** one retry-safe `use_figma` call per screen or per finding type. Follow `mobile-screen/SKILL.md` for every edit:
   - 375 wide and ≥812 tall with the height hugging, chrome instances intact, a 16px gutter bound to `spacing/md`
   - bind every spacing and colour value you set to its variable; never type raw numbers
   - use library text styles, not raw font settings
   - swap variants rather than overriding opacity, then copy the correct icon strokes after the swap (see `../_shared/figma-gotchas.md`)
3. **Draw missing states or screens** only when the user approves them. Build them per `mobile-screen/SKILL.md`, using the final design's pattern for the job (`final-design.md` → "Final-design patterns"), cloning the nearest existing mobile frame, beside their desktop twin (or at the end of the row when there is none). Name them `NN.S Flow — State — Mobile`.
4. **Leave these alone:** design decisions the user hasn't answered, and anything outside the approved rows. Layer renaming is `/organize-flow`'s job; suggest it instead of doing it here.
5. **Verify.**
   - Screenshot every edited frame and compare it with its pre-fix screenshot and the final design's reference or pattern. Use the desktop twin only to confirm nothing was dropped.
   - Rerun `audit-script.js` on the section and confirm the fixed findings are gone and nothing new appeared.
   - Report what changed, which rows were fixed, what was skipped and why, and what still needs a decision.
6. **Record it.**
   - Update the section's row in `readiness-log.md` with the date, the status, and the open P1/P2 counts.
   - Add new frames to `mobile-screen/references/existing-mobile-screens.md`.
   - If the user settles a house value, e.g. "section gaps are 24 everywhere", write it into `spacing-rules.md` or `production-checklist.md` with the date.

A section is **Ready** when it has no open P1 or P2, every desktop has a mobile, and every desktop state has a mobile state. Only mark a section **Ready** with the user's agreement.
