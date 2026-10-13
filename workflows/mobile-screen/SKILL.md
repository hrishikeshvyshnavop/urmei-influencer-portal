---
name: mobile-screen
description: Project-specific checklist for building or updating responsive iOS mobile screens in the URMEI Influencer Portal Figma file (FdmVPJo1j4t8s9gej1H7Yb). Use this whenever the user asks to design, build, mock up, or make responsive any mobile/iOS screen, frame, or view in Figma for this project — including phrases like "design this screen for mobile", "make this responsive in Figma", "build the mobile version", or "add the status bar/home indicator", and whenever the user pastes a Figma link to a new flow to be done for mobile (it then checks the existing mobile designs first and reuses them). It supplies the frame-sizing rules and the two required chrome components (status bar, home indicator) that every screen in this file must include; it does not replace figma-use or figma-generate-design, which handle the actual Figma MCP mechanics — load those alongside this one to execute the work.
---

# URMEI mobile screens

Every mobile screen in the Work File shares one frame and chrome contract. Apply this checklist whenever you build a screen or bring one in line. Use `figma:figma-use` (mandatory before any `use_figma`) and, for multi-section screens, `figma:figma-generate-design` to do the node work.

**Read first:**
- `../_shared/workfile.md`: pages, sections, **locked frames**, component ids and keys, tokens, and the product rules (Favorites cap, Shop Info Card states and so on).
- `../_shared/figma-gotchas.md`: script mechanics and layout traps from earlier runs.
- `references/mobile-inventory.md`: **current ids** of every mobile frame, by section. Clone one instead of building from scratch.
- `references/existing-mobile-screens.md`: build notes per flow (its ids are older; use the inventory's).

## File scope

- **Build and edit only in the Work File** `FdmVPJo1j4t8s9gej1H7Yb`. A link into another file (e.g. the main design file `cehltPtMoGWEtKbF7k3MQQ`) is reference only: read it with `get_metadata` / `get_screenshot` / `get_design_context`, then build here.
- New mobile screens go into their flow's section on the flows page (`workfile.md` → "Sections"), 50px beside their desktop twin.
- **Never edit the locked final design or desktop frames** (`workfile.md` → "Locked"; `mobile-design-review/references/final-design.md` → "Source-of-truth order"). Clone from them.
- The Status Bar, Home Indicator, Header and Search are **library components**. Import them by key (`workfile.md`), or clone an existing instance. Prefer cloning other parts, such as buttons, inputs and footers, from frames already in this file.

## Frame contract

- **Width:** 375. **Height:** hugs its content, minimum 812. A long screen grows downward rather than clipping.
- **Gutter:** 16px left/right on the page content wrapper, bound to `spacing/md`. Never type the raw number. Legacy screens mix 16 and 24; new and updated screens use 16.
- **Chrome:** the Status Bar is the top-most layer at the top edge. The Home Indicator is the bottom-most layer at the bottom edge. Both are live instances, never resized, detached or redrawn. App pages also carry the Header + Search wrap chrome, per `mobile-design-review/references/final-design.md` → "Chrome reference".
- Full-page shop and home screens end with `Footer/Mobile/Default` above the Home Indicator. Dialog and sheet screens (812 tall) don't get one.

## Building a screen

1. Create or clone the frame at 375 × (hug, min 812).
2. Add the chrome per the contract above.
3. Build the content from the reference the user points at, using library tokens, text styles and components. Don't hardcode styles.
4. Check it: the frame is ≥812 tall, the chrome is intact, the gutter is bound, and nothing clips (screenshot it).

## New flow from a pasted link

Use this when the user pastes a link to a flow (a section or board of desktop screens) and wants its mobile screens. The aim is to reuse the main file's mobile designs, not to design from scratch.

1. **Read the flow.** Run `get_metadata` + `get_screenshot` on the link and list its screens and states (default, empty, error, popup, toast). Parse large output in a subagent.
2. **Match every screen** against `references/main-file-mobile-flows.md`, and put it in one of three buckets:
   - **Reuse:** the same screen or state already has a mobile design. Its main-file node is the reference.
   - **Adapt:** a close sibling exists. Name it and what changes.
   - **New:** nothing comparable exists. Name the catalogue building blocks to assemble it from.

   Screenshot each candidate before bucketing it, because names in these files are often wrong. Also check `references/existing-mobile-screens.md` for a Work File frame to clone, and check whether the flow already has a half-built section on the page.
3. **Show the reuse plan and wait for approval.** One table: screen | bucket | main-file reference | Work File frame to clone | what changes. Say where the frames will go. Don't create or edit any node until the user approves.
4. **Build in the Work File** (Figma can't copy frames between files). Clone the matching Work File frame where one exists, otherwise follow "Building a screen". Build Reuse first, then Adapt, then New, so later screens can clone the earlier ones. The desktop-restack recipe is in `figma-gotchas.md`.
5. **Verify.** Screenshot every frame next to its reference and fix any differences. Recheck the frame contract.
6. **Update the catalogues.** Add each new frame's id to `references/mobile-inventory.md`, and its size, source and build notes to `references/existing-mobile-screens.md` under its flow. Add any main-file screens that `main-file-mobile-flows.md` is missing.

## House rules from the user

- **Cursors:** when a desktop screen shows the hand `Cursor`, its mobile twin gets one on the same element (placement recipe in `figma-gotchas.md`).
- **Wording:** "Favorite", never "Featured". Title case on screen names.
- **Toasts** follow 04.7 (`2348:55780`): full width 343, height hugs, bottom-anchored in the `Tost` wrapper.
- **Shop Info Card buttons:** stacked vertically, both full width, Preview Storefront first, 8px gap (`spacing/sm`). Labels and status line follow the state table in `workfile.md`.
- **PDP:** the `Stack / What Creators Say` wrapper holds the inner `Stack / What Creators Say` and the `Performance Section`, as on 07.3. The modal PDP (Recommended Product Detail over My Shop) stays as it is.

## References

- `references/mobile-inventory.md`: current mobile frame ids (regenerate with its script after a reorganisation).
- `references/existing-mobile-screens.md`: Work File mobile frames by flow, with build notes. Older ids; see the inventory's "Stale ids".
- `references/main-file-mobile-flows.md`: the main design file's mobile board, with conventions and building blocks.
- `references/responsive-system.md`: breakpoints, the type ramp, and how layouts adapt from desktop to mobile.
- `references/archive/`: finished build plans, kept for history.
