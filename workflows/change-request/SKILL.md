---
name: change-request
description: Handle a new client change request for URMEI end to end. Covers intake into a requirement file, clarifying questions with options, answers, Figma design one flow at a time (each its own sub-section, then approval), the review round, the client message, and only then the code build. Use when the user says "new requirement from the client", "client wants…", or pastes a client message about a change.
---

# Change request workflow

How a client change goes from message to design to build. It's based on the Collections request (`T-31`, October 2026): `change-requests/collections/REQUIREMENT.md`, `change-requests/collections/ANSWERS.md` and `change-requests/collections/FLOWS.md` are the worked example. Figma ids, components and tokens are in `../_shared/workfile.md`, and script traps are in `../_shared/figma-gotchas.md`.

## Keep the md files current (every step)

Each time anything about a request changes, update its md files **in the same turn**, before reporting back. Changes include a new client message, a scope decision from the user ("X is not in the MVP"), an answered question, a new or changed Figma link, a built or approved flow, or a review outcome.

1. **`REQUIREMENT.md`**: change the section the update affects (scope, missing designs, open questions, Figma ids, status line). Then add a row to its **Update log**: date, what changed, source (client, user in chat, review). Newest first. Never delete the old text a decision overrides: mark it as replaced and give the date.
2. **`ANSWERS.md`** (once it exists): update any answer the change affects, and note the original answer and its date.
3. **`FLOWS.md`** (once it exists): update the flow's frames, ids and status.
4. **`change-requests/README.md`**: update the request's status column.
5. **`TRACKER.md`**: update the task's row and the "Last updated" date.

Don't wait to be asked, and don't save the update for the end of a step. If the user gives a decision in chat, it goes in the files before the next design or code action.

## 1. Intake: write it down before any design

1. Add a `T-nn` row to `TRACKER.md`, using the next free number. Commit messages start `T-nn: …`.
2. Create `change-requests/<topic>/REQUIREMENT.md` (`<topic>` in kebab-case, e.g. `shop-personalization`) with:
   - the client's message, verbatim, with who sent it and when
   - the scope, split into MVP and post-MVP
   - the code it would touch
3. Add the request's row to `change-requests/README.md`. Everything the request produces later (`ANSWERS.md`, `FLOWS.md`, concept boards) goes in the same folder, never at the repo root.
4. Commit.

## 2. Clarify with questions that have options

- List the open questions in the requirement file. Give each one 2–4 lettered options, and mark the smallest-MVP option as the suggestion.
- Walk through them **one question at a time** with the user. Record each answer under its question.
- Write a short `change-requests/<topic>/ANSWERS.md`: a summary table plus each question with just its answer. This is the version to send to the client.
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
- **Components first:** anything reusable (it repeats, or a later flow will need it) is built as a component or component set with variants and properties, and placed as instances; existing hand-built copies are converted and replaced. Full rule in `../_shared/workfile.md` › Product rules.
- **Cover:** use the `Cover` component (clone `2796:71327`) with a path-style title, e.g. "Board ⋮ → Delete collection → Delete". If a flow has a second entry point, it gets a second row with its own cover.
- **Steps:** show the click, the dialog or state, then the result (toast or updated screen). Stack edge cases under the screen they branch from.
- **Cursor:** every action gets a clone of **Pointer Container** `2775:169244`, with its fingertip (21, 9) on the target.
- **Icons:** always library icon instances, never typed glyphs (‹ › ✕ ★ ⋮). For chip or tag close, use `_Tag x close` at 18×18 with the 14px icon.
- **Disabled:** use the Button's `State=Disabled` variant, never opacity. After a variant swap, clear any white fill left on the icon. `Item Dropdown` has no disabled state, so for a disabled row keep opacity 1 and use the disabled text token.
- **Tokens:** bind spacing and padding to `spacing/*`, radius to `border/radius/*`, and colours to library variables.
- **Annotations (changed 2026-10-19, user):** use Figma's **built-in annotations** (`node.annotations = [{label, categoryId}]`), attached to the exact layer being described: the button, card, dialog or toast, never a backdrop shape, and never a layer inside an instance. Category **Info** (the file's custom category; `figma.annotations.getAnnotationCategoriesAsync()`), or Development for dev decisions. One simple sentence each. The old `Annotation` component cards are retired; the earlier rule was "use the file's `Annotation` component, with the dot on the exact element". Write them for the reader of the design: no internal references such as "(Q6)" or "Q5"; say the decision itself instead. The card sits outside the screen; stretch the leader if needed. Category is Info, or Development for dev decisions.
- **Toasts:** reversible removals get **Undo** (Toast `Show Button` → "Undo") and no confirmation dialog. Confirmation dialogs are only for destructive actions (delete, remove from shop).
- **Dialogs (2026-10-19):** follow the main file's `1862:87536` ("Delete this collection?"). The header has 16/24 padding, a `Body/body-xl-bold` title, a bottom divider and the 40px outlined close. The footer is 16/24 with a 12 gap and keeps the divider when the body scrolls. A confirm dialog's message is `Body/body-md-regular`, with two full-width buttons.
- **Empty states:** clone the "Favorite Slot 1 / Empty" box (Work File copy of the main file's 03.6 "Your shop is empty", `1347:38109`). It has a dashed box, a 64px icon well with a library icon, a Medium 20 title and Regular 12 body (hugging, no wrap), and a primary button, or an outlined one inside a dialog. Make the page containers hug so the footer moves down.
- **Frames:** full pages end at the footer, with no clipping and no blank strip below it. Dialog views are 1440×900 (desktop) or 375×812 (mobile).
- **Check:** after the refine below, take one screenshot per finished flow, and fix what it shows before reporting.

**Naming and tidy-up** (follow `../organize-flow/SKILL.md`)
- Name frames `NN.S <Sub-section> — <State> — <Device>` and covers `NN.0 <Sub-section> — Cover`.
- Restack sub-sections 200px apart, and refit sections.

**Refine** (follow `../figma-refine/SKILL.md`, "In the pipelines")
- At the end of every flow, before its screenshot check, run Workflow 2 on each frame built for it and Workflow 3 on each component made or changed. Inner layers get Sentence case names; nothing may change visually.
- Include the refine completion report when you report the flow for approval.

## Figma comment loop (2026-10-19)

When a Figma comment arrives (from the comment watcher), or when you review the design yourself:
1. **Check the facts first.** Look at the requirement and answers, the product rules in `../_shared/workfile.md`, the other screens and components, and earlier thread replies.
2. **Critique if needed.** If the comment conflicts with a decision, would break another screen, or there's a better option, change nothing yet. Reply in the thread in a short, friendly way: what you found, plus a suggestion or 2 options. Act once someone answers.
3. **Otherwise** reply "On it", fix it, check it with a screenshot, then reply "Fixed. <one line>" and "Closed." Never resolve the thread.
4. **Prefix:** start every reply and comment with the alien monster sent as `👾︎` + " Claude:". A plain emoji is stored as shortcode text, so no icon shows.
5. **Log** each outcome in the request's `FLOWS.md` in the same turn.

## 4. Review round

- Write the open decisions down, in the flows file and, if useful, on the Figma section.
- Draft the client message. Give a full version with links, and a short thread reply built around one screenshot. Check that each link opens on the right frame and that the client has view access.

## 5. Close the loop

- Record the client's reply, the decisions, the changed answers (with the original and the date), the open questions, and the Figma ids. They go in the requirement file and in `change-requests/<topic>/FLOWS.md`, which lists every flow, its frames, its status, and an old → new frame-name table if anything was renumbered.
- Commit after each step under the same `T-nn`.

## 6. Build, only after the designs are approved

- Open a new `T-nn` for the code and follow `CLAUDE.md`.
- Verify in the dev server at 1440×900 and 1920×1200, including the empty states.
- Only the user ticks **Live**, after checking the Vercel deploy.
