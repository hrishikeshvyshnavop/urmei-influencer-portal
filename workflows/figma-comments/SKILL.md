# Figma comments: watch, triage, fix in parallel

Use this when the user says "start monitoring the comments", "check the comments" or "fix the comments". It watches the Work File's comment threads, sorts each new comment, and fixes the minor ones with parallel agents while you, the coordinator, keep the shared pieces. The reply rules come from the `change-request` workflow's "Figma comment loop" and the memory note on comment replies. This file adds the watcher, the triage and the parallel dispatch.

## Setup

1. **Token.** The scripts read `FIGMA_TOKEN`, or else `.figma-token` at the repo root (git-ignored). If neither exists, ask the user for a personal access token with comment read/write scope. Never commit it, and never paste it into a file outside `.figma-token`.
2. **Backlog.** Run `node workflows/figma-comments/references/scripts/open.mjs --since <today>`. It lists unresolved threads whose latest message is human. Handle them before the new ones.
3. **Watch.** Start the watcher under the Monitor tool (`timeout_ms` 1800000), and re-arm it each time it expires:
   `node workflows/figma-comments/references/scripts/watch.mjs`
   Each event is one line: `NEW id=… parent=… node=… by=…: message`. A `parent` means it's a reply in an existing thread (often an answer to a question you asked). It polls every 60s (`POLL_SECONDS` changes that). State lives in `.figma-comments/seen.json` (git-ignored). Your own replies start with the alien and are skipped.
4. **Session.** Call `create_session` for the Work File once, load `figma:figma-use` (plus `figma:figma-generate-design` before visible edits), and read `../_shared/figma-gotchas.md`.

## Triage each comment

Find where it points first. `node` is the frame. For the exact layer, use the comment's `node_offset` (from `GET /comments`) against the frame's children, plus a screenshot.

| Kind | Examples | Who does it |
| --- | --- | --- |
| **Minor, local** | Copy, a single tag/label, a cursor, spacing in one frame, renaming | A parallel agent |
| **Shared** | Anything in a main component (`My Shop banner`, `Toast`, `Backdrop tile`, `Featured slot`, `Collection Card`), or a change that repeats across many frames (every toast, every banner) | You, one at a time |
| **New section / options** | "Give 3 options", "build as a new section" | A parallel agent with its own new section |
| **Conflicts with a decision** | It contradicts `ANSWERS.md`, an annotation rule, or another comment | Nobody yet: reply with the finding and 2 options, then wait |
| **Question** | "What's your thought?" | Answer with the facts (and a recommendation) |

Check the facts before acting: `change-requests/<topic>/ANSWERS.md` and `FLOWS.md`, `../_shared/workfile.md`, the other screens, and the earlier replies in the thread. Comments from the user (Hrishi) such as "C1: …" are instructions. Act on them unless they break something.

## Reply protocol

Use `node workflows/figma-comments/references/scripts/reply.mjs <comment_id> "<text>"` (or a message file for multi-line text). It adds the alien prefix and marks the reply as seen. Figma won't accept a reply to a reply, so when the watcher reports a reply (`parent=…`), the script posts to the thread's root instead.
1. Reply **"On it."** as soon as you take a comment (or hand it to an agent).
2. When it's done and screenshot-checked, reply **"Fixed. <one line>"** with a short numbered list of what changed, then a separate **"Closed."**
3. A question or conflict gets a short, friendly reply with numbered options and your recommendation. Don't post "Closed" until it's settled.
4. Never resolve a thread. Never quote question ids ("Q6") in annotations.

## Parallel agents

Dispatch an agent (`subagent_type: "fork"`) for each minor or new-section comment, all in one message so they run together. Rules:
- **Each agent owns disjoint nodes.** Give it the frame ids or a new section it may touch, and list what it must not touch (main components, other sections, toasts). Two agents must never write to the same frame or component. If two comments land on the same frame, one agent takes both.
- **The coordinator owns shared components** and every repeat-across-frames change. Do those yourself, one at a time, while the agents run.
- **Each agent prompt includes:** the comment id and text, the node id, the session id, "load `figma:figma-use` (and `figma-generate-design`)", the figma-gotchas and change-request Figma rules, the refine pass on new frames (`../figma-refine/SKILL.md`), a screenshot check, the reply command (On it / Fixed / Closed, or options and wait), and "append one line to `change-requests/<topic>/FLOWS.md`, don't commit".
- **Cap it at about 4 agents at once.** Use more only if the user asks.
- **When an agent reports back,** check its screenshot evidence and relay a one-line summary to the user.

Don't run the `Workflow` tool for this unless the user asks for a workflow run by name: plain `Agent` forks are enough.

## Full review round ("review all design once more")

1. List the page's sections, then fork one **read-only** reviewer per section group (about 4), all in one message. No agent edits a node.
2. Each reviewer checks: flow continuity, cursor targets, decisions in `ANSWERS.md`/`FLOWS.md`, copy, spacing, clipping, components, annotations and covers. It skips anything already settled, verifies each issue on a screenshot, and posts at most about 6 pinned comments:
   `node workflows/figma-comments/references/scripts/comment.mjs <frame_id> <x> <y> "<text>"`
   The first line is `Review N · <flow>-<n> (High|Medium|Low)`, then a blank line, then the issue and a suggested fix.
3. The coordinator merges the reports, removes duplicates across sections, logs the round in `FLOWS.md`, and gives the user a severity summary. Fixes wait for the user's go-ahead (or follow the On it → Fixed loop as they reply).

## Log and wrap up

- Log every outcome in `change-requests/<topic>/FLOWS.md` in the same turn (agents log their own).
- Update `workfile.md` when a component or product rule changes.
- Tell the user, briefly: what's fixed, what's waiting on an answer, and what's still running. Commit only when asked.
