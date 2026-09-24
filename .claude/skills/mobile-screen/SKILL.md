---
name: mobile-screen
description: Project-specific checklist for building or updating responsive iOS mobile screens in the URMEI Influencer Portal Figma file (FdmVPJo1j4t8s9gej1H7Yb). Use this whenever the user asks to design, build, mock up, or make responsive any mobile/iOS screen, frame, or view in Figma for this project — including phrases like "design this screen for mobile", "make this responsive in Figma", "build the mobile version", or "add the status bar/home indicator". It supplies the frame-sizing rules and the two required chrome components (status bar, home indicator) that every screen in this file must include; it does not replace figma-use or figma-generate-design, which handle the actual Figma MCP mechanics — load those alongside this one to execute the work.
---

# URMEI Figma mobile screen essentials

Every mobile screen in the URMEI Influencer Portal Figma file ("[MVP] Influencer Portal | Work File", `FdmVPJo1j4t8s9gej1H7Yb`) shares the same iOS chrome and frame contract. Apply this checklist whenever you design a new screen or bring an existing one in line, before or alongside using `figma-generate-design` / `figma-use` to do the actual node work.

**Before building a new screen, read `references/existing-mobile-screens.md`.** It catalogs which mobile screens already exist (with node-ids) — reuse or extend one of those instead of building the same screen from scratch.

## File scope — work only in the Work File

**All node creation and editing for this skill happens exclusively in `FdmVPJo1j4t8s9gej1H7Yb` ("[MVP] Influencer Portal | Work File").** Never create or mutate nodes in any other Figma file, even when the user's `/mobile-screen` argument is a link into a different file (e.g. the main "[MVP] Influencer Portal" design file).

- Treat a link into another file as **reference only**: use `get_metadata` / `get_screenshot` / `get_design_context` there to see what the target screen looks like, then build the actual mobile frame back in `FdmVPJo1j4t8s9gej1H7Yb`.
- New mobile screens go inside one of the shop-flow sections on the **Responsiveness** page (`node-id=1802-19394`) — see `references/existing-mobile-screens.md` for the current sections (`node-id=2153-42552` "BROWSE & ADD PRODUCT" is the canonical/most-current one) and which frame to extend. (The node-id `1810-20063` this line used to point to does not exist in the file — don't use it.)
- The Status Bar and Home Indicator chrome components live natively in this file (see below), so build them as real component instances via `use_figma` — do not attempt to `importComponentByKeyAsync`/`importComponentSetByKeyAsync` them from another file (cross-file import by key only works for published team-library components, and these are not published as such — it will fail with "Component with key ... not found"). Likewise, prefer cloning any other reusable piece (logos, buttons, inputs) from existing frames already inside this same file over reaching into a different file.
- If a needed design-system component genuinely isn't available inside `FdmVPJo1j4t8s9gej1H7Yb` (not even via `search_design_system` scoped to this file), rebuild it as a plain frame/vector matching the reference screenshot instead of pulling it from another file.

## Frame sizing

- Width: fixed **375px** (iPhone 13 Mini reference width).
- Height: **automatic / hug contents**, with a **minimum of 812px** (iPhone 13 Mini reference height). A screen with more content than fits in 812px should grow the frame downward rather than scroll-clip or overflow.
- Content gutter: the page-level content wrapper's left/right padding is **16px** — bind it to the `spacing/md` variable (via `search_design_system` with `entity: "variable"` + `figma.variables.importVariableByKeyAsync` + `setBoundVariable`) rather than a hardcoded number. Existing screens in the file are inconsistent here (some use 24px, many aren't bound to a variable at all — see `references/responsive-system.md`), but new/updated screens should standardize on 16px bound to `spacing/md`.

## Required chrome on every screen

Two components from the shared file must appear on every screen, at the correct position, not redrawn from scratch:

- **Status Bar** (iPhone 13 Mini) — pinned to the **top** of the frame.
  Reference: `node-id=1802-19413` in the file above.
- **Home Indicator** — pinned to the **bottom** of the frame.
  Reference: `node-id=1802-19438` in the file above.

When building a screen:
1. Pull these two components from the file (reuse the existing component instances rather than recreating the visuals — use `get_design_context` / component search from `figma-use` to find and instance them).
2. Place the Status Bar as the top-most layer, aligned to the frame's top edge.
3. Place the Home Indicator as the bottom-most layer, aligned to the frame's bottom edge.
4. Build the screen's actual content between the two, based on whatever design/reference the user points you at for that specific screen (an existing Figma frame, a screenshot, or a description).

## Workflow

1. Load `figma-use` (mandatory before any `use_figma` call) and, for multi-section screens, `figma-generate-design`.
2. Create or open the target frame at 375 × (auto, min 812) px.
3. Instance the Status Bar and Home Indicator components per the positions above.
4. Build the screen content responsively within that frame based on the design the user references, keeping existing design-system tokens/components from the file rather than hardcoding new styles.
5. Confirm the frame's final height is ≥812px and that neither chrome component was distorted, resized, or detached from its source component.
