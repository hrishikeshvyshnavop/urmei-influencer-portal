---
name: figma-refine
description: Figma Structure & Naming Refiner. Detect whether the selected Figma object is a Section, Frame, Component or Component Set, then run only that type's cleanup — section organization and flow layout, frame structure cleanup, or component refactoring and standardization — renaming layers in Sentence case and simplifying structure without any visual change. Use when the user asks to refine, clean up, restructure or standardize the naming of a Figma section, frame or component.
---

# Figma structure & naming refiner

Refine Figma sections, frames and components based on the selected object's type, while preserving the existing design and content. First decide whether the selection is a **Section**, **Frame**, **Component** or **Component Set**, then apply only that type's workflow.

## URMEI setup

- Work only in the Work File (`FdmVPJo1j4t8s9gej1H7Yb`). Ids, the **locked** handoff design (never edit it), components and tokens are in `../_shared/workfile.md`; script traps are in `../_shared/figma-gotchas.md`. Before any page-wide write, check every locked id still exists; if one is missing, stop and ask.
- Load `figma:figma-use` before any `use_figma` call. Set `figma.skipInvisibleInstanceChildren = false` in every script.
- Read the selection first (`get_metadata` / a read-only script), and take a screenshot before and after every write so visual integrity can be checked.

## In the pipelines

This is the last step wherever design comes out. Every workflow that builds Figma frames or components runs it on what it just made, before its own screenshot check:

| Pipeline | When it runs | On what |
| --- | --- | --- |
| `responsive-flow` | Stage 6, step 1 (after the pairs are laid out) | every new mobile frame |
| `change-request` | step 3, at the end of each flow, before the screenshot check | every frame and component built for that flow |
| `mobile-screen` | after building, before verifying | every new or adapted frame |

In a pipeline:
- Run **Workflow 2 (Frame)** on each new frame and **Workflow 3 (Component)** on each new or changed component. Don't run Workflow 1: `organize-flow` owns section layout and names there.
- **Who names what:** `organize-flow` names the section, cover and screen frames (`NN - Title`, `NN.S Flow — State — Device`). This skill names everything inside a frame or component, in Sentence case.
- Touch only what this run created or changed. Never touch desktop frames in `responsive-flow`, older screens, or the locked ids.
- Don't stop for approval: the refine is lossless by definition. Put its completion report into the pipeline's final report.

Run on its own (the user names this file and gives a link), it uses all three workflows below, including Workflow 1 for a section.

## Core rules

**Preserve the design.**
- Don't redesign the UI.
- Don't change existing text, copy, images, icons or content.
- Don't change colours, typography, dimensions or visual styling unless the selected workflow explicitly requires it.
- Don't modify the internal content of screens.
- Only modify structure, naming, organization, spacing, constraints and component properties where applicable.
- Preserve the existing visual hierarchy and intended layout.

**Visual integrity safeguard.** Every structural change must be visually lossless. When renaming, removing, flattening, reorganizing or restructuring layers, don't:
- cause visual changes or layout shifts
- change an element's position or size
- change spacing, alignment, padding or dimensions unintentionally
- break Auto Layout behaviour
- break constraints or resizing behaviour
- change clipping or overflow behaviour
- hide, resize, move or displace content
- introduce unexpected gaps or overlaps
- alter the visual appearance of the screen

Before removing a nested frame, make sure its removal won't affect the visual result or functionality. If removing or restructuring a layer could cause any visual or functional break, keep the existing structure. The result should visually match the original unless the selected workflow explicitly requires a change.

## Naming convention

- Use **Sentence case** for layer names.
- Names must be clear, descriptive and meaningful to AI tools such as Claude and Codex.
- Replace generic names (`Frame 123`, `Group 45`, `Rectangle 12`) when the layer's purpose can be identified.
- Name equivalent layers the same way across variants and states.
- Don't rename visible UI copy unless the layer name itself is being standardized.
- Name the purpose or role of the layer, not its appearance.

| Bad | Good |
| --- | --- |
| `Frame 123` | `Header`, `Navigation`, `Content`, `Footer` |
| `Group 45` | `Product card` |
| `Rectangle 12` | `Product image` |
| `Text 34` | `Product title`, `Supporting text` |
| — | `Primary action` |

## Object type detection

Before making any change:
1. Identify the selected object's Figma type: `SECTION`, `FRAME`, `COMPONENT` or `COMPONENT_SET`.
2. Apply only the workflow for that type.
   - Don't apply Section changes to Frames.
   - Don't apply Component changes to Sections or Frames.
3. Preserve all unrelated structure and content.

## Workflow 1 — Section: organization & flow cleanup

**Actions**
- Rename the section and its relevant child layers in clear Sentence case.
- Use the existing cover as the primary entry point.
- Arrange sections in a logical sequence.
- Keep the cover and section headings on a consistent contextual theme.
- Standardize section background colours where required.
- Section titles use Sentence case, follow consecutive numbering, and visually align with the cover structure.
- Organize screens by user flow:
  - Happy-path screens come first.
  - Edge cases go directly below their happy-path screen.
  - Related states stay visually grouped with their flow.
  - Sub-flows go below the relevant main flow.
- Treat these as edge cases or alternate states, placed under the relevant happy path: error, empty, loading, validation, permission or access, no-results, success or confirmation, and any other exceptional or alternate state.
- Desktop and mobile spacing:
  - same screen, desktop ↔ mobile: **50px** gap
  - different screens: **200px** gap
- Adjust section-level padding and alignment where necessary.
- Don't modify, move or resize anything inside the screens; preserve every screen's appearance while reorganizing.

**Screen organization example**

```
Screen 1 — Happy path
    Error state
    Empty state
    Loading state
    Validation state
    Other edge cases

Screen 2 — Happy path
    Error state
    Empty state
    Other edge cases

Screen 3 — Happy path
    Success state
    Confirmation state
```

The link between a happy-path screen and its states must be clear from both the spatial layout and the layer names.

**Section completion report**

```
Section cleanup completed.

1. Sections renamed: X
2. Layers renamed: X
3. Screens reordered: X
4. Sections reorganized: X
5. Desktop/mobile pairs aligned: X
6. Nested structures removed: X
7. Auto layout / alignment cleaned up: X
8. Edge cases grouped under happy paths: X
```

## Workflow 2 — Frame: structure cleanup

**Actions**
- Rename all relevant layers in Sentence case, replacing unclear or generic names with descriptive ones.
- Identify unnecessary nested frames, and remove one only when that is visually and structurally safe.
- Keep frames that provide meaningful layout, Auto Layout, constraints, padding, alignment, component structure or clipping.
- Fix Auto Layout only when needed for structural consistency.
- Correct padding and spacing only where the existing structure is clearly inconsistent.
- Fix alignment and constraints where necessary.
- Don't alter the frame's internal content or visual design, and don't rewrite or modify any visible text.
- Keep the hierarchy as simple as possible without breaking functionality.
- If a structural change introduces any visual or functional risk, undo it and keep the original structure.

**Visual verification** — after cleanup, confirm:
- element positions, dimensions, spacing and alignment are unchanged
- padding is unchanged unless intentionally corrected
- Auto Layout and constraints behave correctly
- content stays visible, with no new clipping, gaps or overlaps
- the frame visually matches the original

Structural cleanup never takes priority over visual fidelity.

**Frame completion report**

```
Frame cleanup completed.

1. Nested frames removed: X
2. Layers renamed: X
3. Auto Layout fixes: X
4. Padding fixes: X
5. Alignment fixes: X
6. Unnecessary layers removed: X
7. Visual changes introduced: 0
8. Visual integrity verified: Yes
```

## Workflow 3 — Component or Component Set: refactoring & standardization

**Actions**
- Rename all component layers in Sentence case, and name them the same way across every variant.
- Find and fix inconsistent variant naming; rename variant properties where required.
- Add missing component properties only when they are clear and necessary.
- Standardize equivalent properties across variants; variant values use consistent Sentence case.
- Preserve the component's appearance, behaviour, dimensions, styling and visible content.
- Don't remove layers that the component's behaviour needs.
- Preserve existing Auto Layout, constraints, interactions and resizing behaviour.
- Apply every change consistently across all relevant variants, and don't introduce visual differences between variants the design doesn't already have.
- If a refactor could break a variant, keep the existing structure.

**Consistency checks** — confirm:
- layer names, variant property names and variant value patterns are consistent across variants
- component properties are meaningful and clear
- Auto Layout and constraints still work
- dimensions are stable
- appearance, interactions and behaviour are preserved

**Component completion report**

```
Component refactoring completed.

1. Components renamed: X
2. Layers renamed: X
3. Variants standardized: X
4. Variant properties updated: X
5. Component properties added: X
6. Inconsistent structures fixed: X
7. Visual changes introduced: 0
8. Component behavior preserved: Yes
```

## Final validation

Before finishing, confirm:
- the correct object-type workflow was used
- names follow Sentence case, and generic names were replaced wherever the purpose is identifiable
- unnecessary structural complexity was reduced only where safe
- no visible content was modified
- no unintended visual change occurred, and no Auto Layout or constraint behaviour broke
- nothing was moved, resized, hidden, clipped or displaced unintentionally
- for Sections: desktop/mobile spacing follows the 50px / 200px rule, and edge cases sit directly under their happy-path screens

If any structural change causes a visual or functional issue, revert it. Visual fidelity beats structural simplification.

The result should be a Figma file that is cleaner, easier for AI tools such as Claude and Codex to understand, and structurally consistent, with the same visual design and behaviour.
