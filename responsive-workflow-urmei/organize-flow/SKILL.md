---
name: organize-flow
description: Tidy the URMEI Figma flow sections (Work File FdmVPJo1j4t8s9gej1H7Yb, flows page 2462:56445) without touching any design. Renames every layer to clear, AI-readable names, numbers and title-cases section and screen names, keeps the existing cover as the flow's entry point, lays out desktop/mobile pairs (50px apart, 200px between screens, happy path first, coverless edge cases stacked under the Default screen they branch from, covered edge cases and sub-flows in rows below), standardizes section backgrounds and spacing, then reports what changed. Use when the user runs /organize-flow or asks to clean up, rename, tidy or organize Figma flow sections.
---

# Organize flow sections

Tidy one or more flow sections in the Work File (`FdmVPJo1j4t8s9gej1H7Yb`, flows page `2462:56445`). This is housekeeping only. Section ids, the **locked** final-design frames (never touch them) and the shared script gotchas are in `../_shared/workfile.md` and `../_shared/figma-gotchas.md`.

**Never change design or frame contents.** No fills, sizes, text or layout inside a screen. Two things are allowed:
- renaming layers
- moving the **top-level** children of a section (covers, screens, nested sections)

The one content exception is a cover heading whose wording contradicts the section title (e.g. "Featured" vs "Favorite"). Report every such change.

Load `figma:figma-use` before any `use_figma` call. Set `figma.skipInvisibleInstanceChildren = false` in every script. Scripts roll back on error, so each section is one retry-safe call.

## Defaults (confirmed by the user, 2026-09-25)

- **Scope:** the flow sub-sections 03 → 10 inside `[Influencer] Shop Experience` (`2446:56196`), unless the user names others. Skip the locked final-design sub-sections `2384:76022` and `2384:77979` (the two named `-`).
- **Renaming depth:** every layer at every depth, including instance sublayers. Skip a layer if Figma refuses the rename.
- **Background:** every section gets the most common existing section fill (the warm beige).
- **Wording:** "Favorite", never "Featured", in section, cover and frame names.
- **Stacking:** sub-sections in number order top to bottom, 200px apart, left edges aligned, inside their parent section.

## Names

**Sections:** `NN - Title In Title Case`, numbered consecutively, e.g. `04 - Add Favorite Product`. Keep small words lower-case (and, or, the, a, of, to, in, on, for, from) unless first.

**Screen frames:** `NN.S Flow Name — State — Device`
- `NN` is the section number. `S` is the screen number: a desktop and its mobile twin share it, and numbering runs through the happy path first, then the edge-case rows.
- `State` comes from the frame's old name, which is usually the last path segment, e.g. `success-toast` becomes `Success Toast`.
- `Device` is `Desktop` or `Mobile`. A screen with several mobile variants gets a suffix: `Mobile`, `Mobile 2`…
- Example: `04.2 Add Favorite — Success Toast — Mobile`.

**Covers:**
- Main cover: `NN.0 Flow Name — Cover`.
- Edge-case or sub-flow cover: `NN Flow Name — Edge Case — <topic> — Cover`, with the topic taken from the cover's own title.

**Nested sections** (sub-flows such as "Detailed product stats"): `NN.S Title In Title Case`.

**Inner layers:** `Role / Detail`, title case.
- Keep an existing name when it's already descriptive. Title-case it and swap "Featured" for "Favorite".
- Replace generic names (`Frame 2007737768`, `Frame 46`, `Group 12`, `Rectangle 5`, `Vector`, `Ellipse 3`, `Union`, `Mask group`, bare numbers, `-`) with a name derived from the layer:
  - **Text:** `Text / <first 4–5 words>`
  - **Instance:** `<main component name, variant props stripped> / <its label>`
  - **Image fill:** `Image`, or `Image / <nearby title>`
  - **Auto-layout frame:** `Row` or `Stack` (by direction) `/ <first text inside>`. With a single child, use that child's role.
  - **Vector inside an icon:** `Icon Path`. Other shapes: `Shape` or `Divider` (thin lines).
- Keep these names as they are: `Status Bar / iPhone 13 Mini`, `Home Indicator`, `Cursor`, `Tost`.

## Layout inside a section

1. **Classify the top-level children:**
   - cover: ≥1900 wide
   - desktop screen: 1000–1500 wide
   - mobile screen: 360–400 wide
   - nested section
2. **Split into rows.** The first cover starts the **happy path**. Each later cover starts an **edge-case or sub-flow row** with the screens that followed it. Nested sections get their own row after the edge cases.
   - **Edge cases without a cover don't get a row** (user, 2026-09-30). Stack each one under the happy-path **Default** screen it branches from: same x, the first 200px below that screen's bottom, each next one 200px below the previous. For example, Invalid Email and Account Exists go under Verify Email Default, and the OTP errors go under OTP Default. Refit the section afterwards.
3. **Pair screens.** A mobile frame belongs to the nearest desktop on its left in the same row. Several mobiles can share one desktop.
4. **Place the rows.**
   - All rows start at x = 100. Row 1 is at y = 100, and each later row starts 200px below the previous row's tallest frame, counting the edge-case columns hanging under row 1.
   - Within a row, put the cover first. Then 200px before each screen group: the desktop, then its mobiles 50px apart.
   - Top-align everything in a row.
5. **Fit the section** to its children with 100px padding, and set its fill to the standard background.

## Lessons from the first run (2026-09-25)

- **Run one retry-safe `use_figma` call per section.** A 7k-layer section renames in a single call. Three sections in parallel is fine.
- **Title case:** keep only real acronyms in caps (URL, OTP, FAQ, KPI, UI, UX, ID, CTA, PDP). Lower-case any other all-caps word, so "SORT" becomes "Sort" and "SHOP" becomes "Shop".
- **Cover topics:** strip a leading "Edge case" from a cover title before building `— Edge Case — <topic>`, to avoid "Edge Case — Edge Case".
- **Check nested sections still exist before you rely on them.** "Detailed product stats" had disappeared, leaving its frames loose in the parent. Recreate the sub-flow section (`figma.createSection()`, same fill), move the frames in, and name them from their real state, not the neighbouring row.
- **Edge-case cover keywords:** edge, fail, error, without, with no, full, empty, no product, no result. Other covers after the main one are **sub-flows**, e.g. Sort, Brand Listing, "…from detail page".
- **Mobile-only screens:** a mobile whose leading number differs from the previous mobile in the group starts its own screen group, e.g. Publish Shop's 10 "no affiliate link".
- **Loose non-screen layers** (a stray `Button`, a loose text) are placed at the bottom of the section and reported, never deleted.

## Lessons from the Request Flow run (2026-09-30)

- **Rename children before their parents, then do a second pass for icon paths.** A post-order pass names a vector `Shape` before its parent frame becomes `Icon`. Rename any `Shape` vector under an `Icon…` ancestor to `Icon Path` afterwards.
- **Fix misleading library names too, not just generic ones:** `Set Password Button` becomes `Button / <label>`, `K.Beauty Text` becomes `Text / …`, and `Delivery Date Header` gets a name derived from its content.
- **Skip the whole `Annotation / Cursor (not for build)` subtree**, like `Cursor`.
- **Two frames with the same name** (the two "Verification progress" frames) get their states from what each one shows: `Verification in Progress` and `Verification Error`.

## After all sections

- Stack the sections in number order, 200px apart, inside their parent section. Refit the parent.
- Update `mobile-screen/references/existing-mobile-screens.md` if frame names in it changed meaningfully. Node ids stay the same, so a short note is enough.
- **Report:**
  - layers renamed, total and per section
  - sections and frames renamed
  - cover headings changed
  - rows created, i.e. edge cases moved below the happy path
  - background changes
  - anything skipped and why
