# Agent workflows

Plain-file workflows for Claude to read and follow, e.g. "follow `workflows/responsive-flow/SKILL.md` for <link>". They are not slash commands, except `change-request`, which the stub `.claude/skills/change-request/SKILL.md` loads automatically.

Each workflow is a folder: its `SKILL.md`, plus a `references/` folder for its catalogues, logs and scripts. Finished plans and superseded reports go in `references/archive/` with a date in the file name. Facts that more than one workflow needs belong in `_shared/`, not copied into each.

| Folder | Use it to | Works in |
| --- | --- | --- |
| `change-request/` | Take a client change from message → requirement → questions → Figma (one flow at a time) → review → client message → code. Output goes in `change-requests/<topic>/`. | Repo + Figma |
| `clarify/` | Ask before assuming. | — |
| `laws-of-ux/` | Check a screen, flow or component against the 30 Laws of UX (paraphrased from lawsofux.com, with URMEI-specific guidance and a review checklist). Cite laws by name in design reviews. | Figma + code |
| `responsive-flow/` | Paste a Work File flow link; plan (one approval stop), build, verify and record its mobile screens. Orchestrates the three below. | Figma |
| `mobile-screen/` | Build or adapt a mobile screen; holds the frame catalogues. | Figma |
| `organize-flow/` | Rename, number and lay out a flow section. | Figma |
| `figma-refine/` | Refine a selected Section, Frame or Component (Set): detect its type, then rename layers in Sentence case and clean up structure with no visual change. Runs as the last design step of `responsive-flow`, `change-request` and `mobile-screen`. | Figma |
| `mobile-design-review/` | Production-readiness review and approved fixes; holds the readiness log and the open-problems summary (`references/design-problems.md`). | Figma |
| `responsive-workflow/` | **Generated** one-file bundle of the four responsive workflows plus `_shared/`. Don't edit it: edit the sources and run `node workflows/responsive-workflow/build.mjs`. | — |
| `_shared/` | Not a workflow. `workfile.md` (Figma ids, locked frames, components, tokens, product rules) and `figma-gotchas.md` (`use_figma` traps). | — |
