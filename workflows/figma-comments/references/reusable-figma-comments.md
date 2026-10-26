# Figma comments workflow (reusable)

This is a portable version of `workflows/figma-comments/`, written for any project and any Figma file. Copy this one file into another repo, fill in **Project settings**, and save the five scripts below. Then ask Claude to "follow `<path>/reusable-figma-comments.md` and start monitoring the comments".

What it does:
- Watches a Figma file's comment threads.
- Sorts each new comment.
- Hands the minor ones to parallel agents, while you, the coordinator, keep the shared components.
- Replies in each thread as you go: On it → Fixed → Closed.

## Project settings

Fill these in once per project. Every rule below refers to them by name.

| Setting | Value | Example (URMEI) |
| --- | --- | --- |
| `FILE_KEY` | The Figma file whose comments are watched (set as env `FIGMA_FILE_KEY`). | `FdmVPJo1j4t8s9gej1H7Yb` |
| `SCRIPTS_DIR` | Where the scripts live. | `workflows/figma-comments/references/scripts` |
| `OWNER` | The person whose comments are instructions, not suggestions. | Hrishi |
| `SHARED_COMPONENTS` | Main components that only the coordinator edits. | `Toast`, `Collection Card`, `My Shop banner` |
| `DECISIONS` | Where agreed product and design decisions are written down. | `change-requests/<topic>/ANSWERS.md` |
| `LOG` | Where each outcome is logged. | `change-requests/<topic>/FLOWS.md` |
| `FIGMA_RULES` | Project notes on Figma components, tokens and script traps. | `workflows/_shared/workfile.md`, `figma-gotchas.md` |
| `REFINE_STEP` | Optional cleanup pass run on every new frame. | `workflows/figma-refine/SKILL.md` |
| `PREFIX` | The marker that starts every reply Claude posts (env `COMMENT_PREFIX`). The scripts use it to skip Claude's own comments. | `👽︎` |

## Setup

1. **Token.** The scripts read `FIGMA_TOKEN`, or else a `.figma-token` file at the project root. If neither exists, ask the user for a personal access token with comment read and write scope.
   - Never commit the token.
   - Never write it anywhere except `.figma-token`.
   - Add these two lines to `.gitignore`:
     ```
     .figma-token
     .figma-comments/
     ```
2. **Backlog.** List the threads that still need an answer, and handle them before any new comments:
   ```bash
   node SCRIPTS_DIR/open.mjs --since <yyyy-mm-dd>
   ```
   It lists unresolved threads whose latest message came from a person.
3. **Watch.** Run the watcher under the Monitor tool with `timeout_ms` set to 1800000, and start it again each time it expires:
   ```bash
   node SCRIPTS_DIR/watch.mjs
   ```
   - Each event is one line: `NEW id=… parent=… node=… by=…: message`.
   - A `parent` value means the comment is a reply in an existing thread, often an answer to a question you asked.
   - It checks every 60s. Set `POLL_SECONDS` to change that.
   - Its state is kept in `.figma-comments/seen.json`.
   - Comments that start with `PREFIX` are skipped.
4. **Figma session.** Open one Figma MCP session for `FILE_KEY`. Load `figma:figma-use`, and also `figma:figma-generate-design` before any visible edit. Then read `FIGMA_RULES`.

All commands run from the project root.

## Triage each comment

First find what the comment points at. `node` is the frame. To find the exact layer, compare the comment's `client_meta.node_offset` with the frame's children, and take a screenshot.

| Kind | Examples | Who handles it |
| --- | --- | --- |
| **Minor, local** | Copy, one label or tag, a cursor, spacing inside one frame, a rename | A parallel agent |
| **Shared** | Any change to a `SHARED_COMPONENTS` main component, or a change that repeats across many frames | You, one at a time |
| **New section / options** | "Give 3 options", "build this as a new section" | A parallel agent, in its own new section |
| **Conflicts with a decision** | It contradicts `DECISIONS`, an annotation rule or another comment | Nobody yet: reply with what you found and 2 options, then wait |
| **Question** | "What do you think?" | You: answer with the facts and a recommendation |

Before acting, check the facts in `DECISIONS`, `LOG`, `FIGMA_RULES`, the related screens and the earlier replies in the thread. Comments from `OWNER` are instructions, so act on them unless they would break something. If a comment is unclear, ask in its thread, not in chat.

## Reply protocol

Post replies with:

```bash
node SCRIPTS_DIR/reply.mjs <comment_id> "<text>"
```

For multi-line text, pass the path to a text file instead. The script:
- adds `PREFIX` to the reply;
- records the reply as seen, so the watcher skips it;
- posts to the thread's first comment when it is given a reply's id, because Figma rejects a reply to a reply.

Steps:
1. Reply **"On it."** as soon as you take a comment, or hand it to an agent.
2. When the work is done and checked on a screenshot, reply **"Fixed. <one line>"** with a short numbered list of what changed. Then post a separate **"Closed."** reply.
3. Answer a question or a conflict with a short, friendly reply that gives numbered options and your recommendation. Don't post "Closed." until it's settled.
4. Never resolve a thread; the person who commented resolves it. Don't cite internal ids such as question numbers in replies or annotations.
5. Check each comment against the facts before you act. If it's wrong, push back kindly and say why.

## Parallel agents

Send one agent (`subagent_type: "fork"`) for each minor or new-section comment, all in one message so they run at the same time.

- **Each agent owns its own nodes.** Give it the frame ids, or the new section, it may touch. List what it must not touch: `SHARED_COMPONENTS`, other sections, anything that repeats across frames. Two agents must never write to the same frame or component. If two comments are on the same frame, one agent takes both.
- **The coordinator owns the shared work.** You make every `SHARED_COMPONENTS` change and every change that repeats across frames yourself, one at a time, while the agents run.
- **Each agent's prompt includes:**
  - the comment id, its text and its node id;
  - the Figma session id;
  - which Figma skills to load;
  - the rules in `FIGMA_RULES`;
  - `REFINE_STEP` for any new frame;
  - a screenshot check;
  - the reply commands (On it / Fixed / Closed, or options and then wait);
  - "append one line to `LOG`, don't commit".
- **Run at most about 4 agents at once,** unless the user asks for more.
- **When an agent reports back,** check its screenshots, then give the user a one-line summary.

Plain `Agent` forks are enough for this. Use the `Workflow` tool only if the user asks for it.

## Full review round

Run this when the user says "review all the designs once more".

1. List the page's sections. Send one **read-only** reviewer per group of sections, about 4 in all, in one message. No reviewer edits a node.
2. Each reviewer checks:
   - flow continuity;
   - what each cursor points at;
   - `DECISIONS`;
   - copy, spacing and clipping;
   - components, annotations and covers.

   It skips anything already settled, confirms each issue on a screenshot, and posts at most about 6 pinned comments:
   ```bash
   node SCRIPTS_DIR/comment.mjs <frame_id> <x> <y> "<text>"
   ```
   Each comment starts with `Review N · <flow>-<n> (High|Medium|Low)`, then a blank line, then the issue and a suggested fix.
3. The coordinator merges the reports, removes issues reported for more than one section, logs the round in `LOG`, and gives the user a summary by severity. Fixes wait for the user's go-ahead, or follow the On it → Fixed loop as people reply.

## Log and wrap up

- Log every outcome in `LOG` in the same turn. Agents log their own.
- When a shared component or product rule changes, update `FIGMA_RULES` or `DECISIONS`.
- Tell the user briefly what's fixed, what's waiting for an answer and what's still running. Commit only when asked.

## Scripts

Save these five files in `SCRIPTS_DIR`. They need Node 18 or later, for the built-in `fetch`, and have no other dependencies. Settings come from environment variables:
- `FIGMA_FILE_KEY` (required);
- `FIGMA_TOKEN`, or the `.figma-token` file;
- `COMMENT_PREFIX` (optional);
- `POLL_SECONDS` (optional).

The token file and the state folder are found relative to the folder you run the scripts from, so always run them from the project root.

### `lib.mjs`

```js
// Shared helpers for the comment scripts: settings, token, API calls, seen-state.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
export const FILE_KEY = process.env.FIGMA_FILE_KEY;
if (!FILE_KEY) throw new Error('Set FIGMA_FILE_KEY to the Figma file whose comments you want');
export const PREFIX = process.env.COMMENT_PREFIX || '👽︎'; // alien + text variation selector; a bare emoji is stored as shortcode text
const stateDir = path.join(root, '.figma-comments');
const API = `https://api.figma.com/v1/files/${FILE_KEY}/comments`;

export function token() {
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN.trim();
  const file = path.join(root, '.figma-token');
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8').trim();
  throw new Error('No Figma token: set FIGMA_TOKEN or put it in .figma-token (git-ignored)');
}

// Comments whose message starts with the prefix are Claude's own; compare the first two code units
// so the check survives Figma dropping the variation selector.
export const isOwn = (c) => c.message.startsWith(PREFIX.slice(0, 2));

export async function getComments() {
  const res = await fetch(API, { headers: { 'X-Figma-Token': token() } });
  if (!res.ok) throw new Error(`GET comments: HTTP ${res.status}`);
  return (await res.json()).comments ?? [];
}

export async function postComment(payload) {
  const message = payload.message.startsWith(PREFIX) ? payload.message : `${PREFIX} ${payload.message}`;
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'X-Figma-Token': token(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, message }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`POST comment: HTTP ${res.status} ${JSON.stringify(body)}`);
  markSeen([body.id]);
  return body;
}

export async function postReply(commentId, message) {
  // Figma rejects a reply to a reply, so always answer on the thread's root comment
  if (commentId) {
    const target = (await getComments()).find((c) => c.id === commentId);
    if (target?.parent_id) commentId = target.parent_id;
  }
  return postComment(commentId ? { message, comment_id: commentId } : { message });
}

const seenFile = () => path.join(stateDir, 'seen.json');

export function readSeen() {
  return fs.existsSync(seenFile()) ? new Set(JSON.parse(fs.readFileSync(seenFile(), 'utf8'))) : null;
}

export function markSeen(ids) {
  fs.mkdirSync(stateDir, { recursive: true });
  const seen = readSeen() ?? new Set();
  for (const id of ids) seen.add(id);
  fs.writeFileSync(seenFile(), JSON.stringify([...seen]));
}

export const readText = (arg) => (fs.existsSync(arg) ? fs.readFileSync(arg, 'utf8').trim() : arg);

export const oneLine = (c) =>
  `id=${c.id} parent=${c.parent_id || '-'} node=${c.client_meta?.node_id ?? ''} by=${c.user.handle}: ${c.message.replace(/\s+/g, ' ').slice(0, 400)}`;
```

### `watch.mjs`

```js
// Polls the file's comments and prints one line per new human comment (run it under Monitor).
// The first run only records what exists, so old comments don't flood the stream.
import { getComments, readSeen, markSeen, oneLine, isOwn } from './lib.mjs';

const INTERVAL = Number(process.env.POLL_SECONDS || 60) * 1000;

if (!readSeen()) markSeen((await getComments()).map((c) => c.id));

let failures = 0;
for (;;) {
  try {
    const seen = readSeen();
    const fresh = (await getComments())
      .filter((c) => !seen.has(c.id))
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
    for (const c of fresh) if (!isOwn(c)) console.log(`NEW ${oneLine(c)}`);
    if (fresh.length) markSeen(fresh.map((c) => c.id));
    failures = 0;
  } catch (e) {
    if (++failures === 3) console.log(`WATCHER ERROR (3 in a row): ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, INTERVAL));
}
```

### `open.mjs`

```js
// Lists unresolved threads whose last message is human (nobody has answered with the prefix yet).
// Usage: node open.mjs [--since 2026-10-20]
import { getComments, oneLine, isOwn } from './lib.mjs';

const sinceIdx = process.argv.indexOf('--since');
const since = sinceIdx > -1 ? process.argv[sinceIdx + 1] : '';
const all = await getComments();
const roots = all.filter((c) => !c.parent_id && !c.resolved_at && c.created_at >= since);
for (const root of roots.sort((a, b) => a.created_at.localeCompare(b.created_at))) {
  const thread = [root, ...all.filter((c) => c.parent_id === root.id)].sort((a, b) => a.created_at.localeCompare(b.created_at));
  const last = thread.at(-1);
  if (isOwn(last)) continue;
  console.log(`OPEN ${oneLine(root)}${last !== root ? `\n  latest: ${oneLine(last)}` : ''}`);
}
```

### `reply.mjs`

```js
// Usage: node reply.mjs <comment_id|-> <message-file | "text">
// Replies in the thread with the prefix. Pass "-" as the id to post a new top-level comment (no pin).
import { postReply, readText } from './lib.mjs';

const [id, arg] = process.argv.slice(2);
if (!id || !arg) throw new Error('Usage: node reply.mjs <comment_id|-> <message-file | "text">');
const body = await postReply(id === '-' ? null : id, readText(arg));
console.log(body.id);
```

### `comment.mjs`

```js
// Usage: node comment.mjs <frame_node_id> <x> <y> <message-file | "text">
// Posts a new top-level comment pinned at (x, y) inside the frame, with the prefix.
import { postComment, readText } from './lib.mjs';

const [nodeId, x, y, arg] = process.argv.slice(2);
if (!nodeId || !arg) throw new Error('Usage: node comment.mjs <frame_node_id> <x> <y> <message-file | "text">');
const body = await postComment({
  message: readText(arg),
  client_meta: { node_id: nodeId, node_offset: { x: Number(x), y: Number(y) } },
});
console.log(body.id);
```
