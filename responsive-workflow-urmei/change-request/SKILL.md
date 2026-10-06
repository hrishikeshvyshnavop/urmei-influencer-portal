---
name: change-request
description: Handle a new client change request for URMEI end to end. Covers intake into a requirement file, clarifying questions with options, answers, Figma design one flow at a time (each its own sub-section, then approval), the review round, the client message, and only then the code build. Use when the user says "new requirement from the client", "client wants…", or pastes a client message about a change.
---

# Change request workflow

How a client change goes from message to design to build. It's based on the Collections request (`T-31`, October 2026): `REQUIREMENT-COLLECTIONS.md`, `COLLECTIONS-ANSWERS.md` and `COLLECTIONS-FLOWS.md` are the worked example. Figma ids, components and tokens are in `../_shared/workfile.md`, and script traps are in `../_shared/figma-gotchas.md`.

## 1. Intake: write it down before any design

1. Add a `T-nn` row to `TRACKER.md`, using the next free number. Commit messages start `T-nn: …`.
2. Create `REQUIREMENT-<TOPIC>.md` with:
   - the client's message, verbatim, with who sent it and when
   - the scope, split into MVP and post-MVP
   - the code it would touch
3. Commit.

## 2. Clarify with questions that have options

- List the open questions in the requirement file. Give each one 2–4 lettered options, and mark the smallest-MVP option as the suggestion.
- Walk through them **one question at a time** with the user. Record each answer under its question.
- Write a short `<TOPIC>-ANSWERS.md`: a summary table plus each question with just its answer. This is the version to send to the client.
- **Check every new request against the agreed answers.** If one conflicts (for example, reordering after "not in MVP"), say so, design it as an add-on, and update the answers only once the user confirms.
- When an answer changes, keep a note of the original answer and the date.

## 3. Design in Figma, one flow at a time

**Before writing anything**
- Run a read-only check that the locked items still exist: the main file's page `794:24650`, and the Work File's `2320:42706`. Never write to either.
- Find sections by **name**, not by a remembered id. Ids change when the page is re-copied.
- If frames disappear while you work, someone else is editing. Stop, report it, and don't recreate anything without asking.

**Where the work goes**
- All work for a topic lives in one top-level section on the flows page `2650:50683` (e.g. `[Influencer] Collections`).
- Each flow is its own numbered sub-section (`NN - Title`), stacked top to bottom in **user-journey order**. Propose the order and get approval before rearranging.
- Mobile drafts go on Hrishi Workspace (`751:80091`) until they're approved.
- **One flow, then approval, then the next.** Only batch when the user says so ("do all").

**Building a flow**
- Clone the closest existing screen, and reuse the file's own components: Button, Inputbox, Toast, Notification Banner, Item Dropdown, Tab and Dialog Product Summary. Don't hand-build look-alikes.
- **Cover:** use the `Cover` component (clone `2796:71327`) with a path-style title, e.g. "Board ⋮ → Delete collection → Delete". If a flow has a second entry point, it gets a second row with its own cover.
- **Steps:** show the click, the dialog or state, then the result (toast or updated screen). Stack edge cases under the screen they branch from.
- **Cursor:** every action gets a clone of **Pointer Container** `2775:169244`, with its fingertip (21, 9) on the target.
- **Icons:** always library icon instances, never typed glyphs (‹ › ✕ ★ ⋮). For chip or tag close, use `_Tag x close` at 18×18 with the 14px icon.
- **Disabled:** use the Button's `State=Disabled` variant, never opacity. After a variant swap, clear any white fill left on the icon. `Item Dropdown` has no disabled state, so for a disabled row keep opacity 1 and use the disabled text token.
- **Tokens:** bind spacing and padding to `spacing/*`, radius to `border/radius/*`, and colours to library variables.
- **Annotations:** use the file's `Annotation` component, one simple sentence each, with the dot on the exact element. The card sits outside the screen; stretch the leader if needed. Category is Info, or Development for dev decisions.
- **Toasts:** reversible removals get **Undo** (Toast `Show Button` → "Undo") and no confirmation dialog. Confirmation dialogs are only for destructive actions (delete, remove from shop).
- **Frames:** full pages end at the footer, with no clipping and no blank strip below it. Dialog views are 1440×900 (desktop) or 375×812 (mobile).
- **Check:** take one screenshot per finished flow, and fix what it shows before reporting.

**Naming and tidy-up** (follow `../organize-flow/SKILL.md`)
- Name frames `NN.S <Sub-section> — <State> — <Device>` and covers `NN.0 <Sub-section> — Cover`.
- Rename generic layers. Restack sub-sections 200px apart, and refit sections.

## 4. Review round

- Write the open decisions down, in the flows file and, if useful, on the Figma section.
- Draft the client message. Give a full version with links, and a short thread reply built around one screenshot. Check that each link opens on the right frame and that the client has view access.

## 5. Close the loop

- Record the client's reply, the decisions, the changed answers (with the original and the date), the open questions, and the Figma ids. They go in the requirement file and in `<TOPIC>-FLOWS.md`, which lists every flow, its frames, its status, and an old → new frame-name table if anything was renumbered.
- Commit after each step under the same `T-nn`.

## 6. Build, only after the designs are approved

- Open a new `T-nn` for the code and follow `CLAUDE.md`.
- Verify in the dev server at 1440×900 and 1920×1200, including the empty states.
- Only the user ticks **Live**, after checking the Vercel deploy.
