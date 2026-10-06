---
name: responsive-workflow
description: The complete URMEI responsive (mobile 375px) design workflow in one file. It merges every responsive skill and reference (mobile-screen, organize-flow, mobile-design-review, the shared Work File reference and Figma gotchas, the inventories, logs and scripts) verbatim, in workflow order. Use when the user runs /responsive-workflow, or asks for the whole responsive process end to end: set up, build mobile screens, organize flow sections, review and fix to production readiness, and hand off, in the Figma Work File (FdmVPJo1j4t8s9gej1H7Yb).
---

# URMEI responsive workflow (all-in-one)

This file puts every responsive skill and reference into one file, **verbatim**, in the order you use them. Generated on 2026-10-01 from `responsive-workflow-urmei/`. **The source files are still the ones to edit.** If a source changes, regenerate this file (see "Regenerating" at the end) rather than editing the copies below.

Load `figma:figma-use` before any `use_figma` call. Relative links inside the copied files (`references/…`, `../_shared/…`) point at the original files, and every one of them is also copied below.

## The workflow

| Step | What you do | Parts below |
|---|---|---|
| **0. Automate** | Paste a flow link: read, plan (one approval stop), build, cursors, layout, verify, review, record. It runs steps 1–5 for you. | 0.1 responsive-flow skill · 0.2 scripts |
| **1. Setup** | Read the Work File reference. Check the locked ids exist. Learn the script traps. | 1.1 workfile.md · 1.2 figma-gotchas.md |
| **2. Build** | Build or adapt mobile screens. Reuse main-file designs and clone existing frames. | 2.1 mobile-screen skill · 2.2–2.5 references |
| **3. Organize** | Rename layers, number and lay out the screens, tidy the sections. | 3.1 organize-flow skill |
| **4. Review and fix** | Sync to the final design, run the production-readiness review, apply the approved fixes. | 4.1 mobile-design-review skill · 4.2–4.6 references and scripts |
| **5. Track** | Log each section's status and open decisions. | 5.1 readiness-log.md |
| **6. History** | Finished plans and old handoffs, for context only. | 6.1–6.3 archive |

Standing rules (from the user; details in the parts below):
- Build and edit only in the Work File. Write to the main design file (`cehltPtMoGWEtKbF7k3MQQ`) only after an explicit go-ahead, and then only on its Responsive Design page `794:24650`, mobile only.
- Never edit the locked final design (`2384:76022`, `2384:77979`) or `2320:42706`, and never edit desktop frames unless asked.
- Never delete layers in Figma: hide, rename or move them instead.
- The final design says how a screen looks. The desktop says what it contains.

## Contents

- [Automate: the responsive-flow skill (link in, mobile screens out)](#responsive-flow-skill-md) — `responsive-flow/SKILL.md`
- [Automate: reusable scripts for each stage](#responsive-flow-references-scripts-md) — `responsive-flow/references/scripts.md`
- [Setup: the Work File, pages, locked frames, components, tokens, product rules](#_shared-workfile-md) — `_shared/workfile.md`
- [Setup: use_figma script traps and recipes](#_shared-figma-gotchas-md) — `_shared/figma-gotchas.md`
- [Build: the mobile-screen skill (frame contract, new-flow reuse)](#mobile-screen-skill-md) — `mobile-screen/SKILL.md`
- [Build: breakpoints, type ramp, desktop-to-mobile rules](#mobile-screen-references-responsive-system-md) — `mobile-screen/references/responsive-system.md`
- [Build: current mobile frame ids by section](#mobile-screen-references-mobile-inventory-md) — `mobile-screen/references/mobile-inventory.md`
- [Build: Work File mobile frames by flow, with build notes](#mobile-screen-references-existing-mobile-screens-md) — `mobile-screen/references/existing-mobile-screens.md`
- [Build: the main design file's mobile board and building blocks](#mobile-screen-references-main-file-mobile-flows-md) — `mobile-screen/references/main-file-mobile-flows.md`
- [Organize: the organize-flow skill](#organize-flow-skill-md) — `organize-flow/SKILL.md`
- [Review: the mobile-design-review skill](#mobile-design-review-skill-md) — `mobile-design-review/SKILL.md`
- [Review: the final design, source-of-truth order, chrome reference](#mobile-design-review-references-final-design-md) — `mobile-design-review/references/final-design.md`
- [Review: spacing rules](#mobile-design-review-references-spacing-rules-md) — `mobile-design-review/references/spacing-rules.md`
- [Review: production-readiness checklist](#mobile-design-review-references-production-checklist-md) — `mobile-design-review/references/production-checklist.md`
- [Track: readiness log and open decisions](#mobile-design-review-references-readiness-log-md) — `mobile-design-review/references/readiness-log.md`
- [Review: sync script (diffs screens against the final design)](#mobile-design-review-references-sync-script-js) — `mobile-design-review/references/sync-script.js`
- [Review: audit script](#mobile-design-review-references-audit-script-js) — `mobile-design-review/references/audit-script.js`
- [Archive: Profile Settings & Notification build plan](#mobile-screen-references-archive-plan-profile-settings-notification-md) — `mobile-screen/references/archive/plan-profile-settings-notification.md`
- [Archive: Sample Request & Review build plan](#mobile-screen-references-archive-plan-sample-request-and-review-md) — `mobile-screen/references/archive/plan-sample-request-and-review.md`
- [Archive: 2026-09-25 review handoff](#mobile-design-review-references-archive-handoff-2026-09-25-md) — `mobile-design-review/references/archive/handoff-2026-09-25.md`


---

<a id="responsive-flow-skill-md"></a>

# SOURCE: `responsive-flow/SKILL.md`

> Step 0 · Automate: the responsive-flow skill (link in, mobile screens out, one approval stop)

---
name: responsive-flow
description: One-command pipeline that turns a pasted Figma link to a desktop flow section in the URMEI Work File (FdmVPJo1j4t8s9gej1H7Yb) into finished mobile (375px) screens. It reads the flow, matches every desktop to an existing mobile to clone, shows one reuse-plan table and waits for "go", then builds every mobile, mirrors the desktop cursors, lays out desktop/mobile pairs, screenshot-verifies, runs the production review on the new section and updates the catalogues. Use when the user runs /responsive-flow, pastes a flow or section link and asks for its mobile/responsive screens, or asks to "make this flow responsive", "give me the mobile screens for this link" or "automate the responsive flow".
---

# Responsive flow: link in, mobile screens out

The user pastes a Work File link to a desktop flow section. This skill delivers that flow's mobile screens, ready for review. It **orchestrates the existing skills**, so their rules apply unchanged:

- `mobile-screen`: the frame contract, the reuse buckets and the house rules (cursors, Favorite wording, toasts, Shop Info Card, PDP).
- `organize-flow`: the pair layout and naming.
- `mobile-design-review`: the production review.
- `_shared/workfile.md` and `_shared/figma-gotchas.md`: ids, locked frames, tokens, product rules and script traps.

Load `figma:figma-use` before the first `use_figma`. Reusable scripts are in `references/scripts.md`. The first worked run (00 Request Flow, 2026-10-01) is in `mobile-screen/references/existing-mobile-screens.md`.

**One approval stop (the user's choice, 2026-10-01).** Stages 1–2 are read-only and end with the plan table. After the user says "go", stages 3–7 run without stopping, and everything is reported at the end. If the user's "go" leaves a question in the plan unanswered, take the recommended default and say so in the report.

**Standing rules:**
- Build only in the Work File.
- Never delete anything: hide, rename or move instead.
- Never edit desktop frames' contents. Moving them is allowed because it's part of layout.
- Never touch the locked ids.

## Stage 1: Read the flow (read-only)

1. Parse `node-id` from the link (`2660-53392` → `2660:53392`).
2. Run `get_metadata` on it. Big output goes to a file, so parse it with Python (script A). List every frame with its id, name, size, x/y and whether it has a cursor (`Annotation / Cursor…` / `Cursor`). Find the section's page with a `use_figma` parent walk.
3. Screenshot every desktop at `maxDimension` 720. Group the screens into happy-path columns (same x) and edge cases (stacked below a Default).
4. Note duplicate or wrong names, and desktop frames that crop their content (frame height < `Form Area` height).

## Stage 2: Match and plan (read-only), then stop

1. **Find candidate mobiles** on the flows page with script B: every 360–400-wide frame, keyed by its normalised state name. Ids go stale whenever the page is replaced, so trust script B over the inventory. Also check `mobile-screen/references/main-file-mobile-flows.md` for main-file designs.
2. **Screenshot each candidate** next to its desktop before bucketing it, because names lie.
3. **Diff the copy** with script C (desktop texts vs candidate texts). This shows exactly what to override.
4. **Read the states** with script D (Inputbox / Button / OTP box `State` and `Fill` values per screen). Error, filled and disabled states come from these variant values, not from restyling.
5. **Show one table:** `# | Screen | Bucket (Reuse/Adapt/New) | Mobile to clone | What changes`.
   - Under it, say where the frames go. If there isn't room for a 375 frame 50px beside each desktop, plan to move the desktops.
   - List at most three questions, each with a recommended default.
6. **Wait for "go".** Nothing is written before that.

## Stage 3: Build (after "go")

Build in order: Reuse, then Adapt, then New, so later screens can clone earlier ones. Use one `use_figma` per screen family (for example all email screens), retry-safe, and return every id. Use helpers E1–E4 from `references/scripts.md`.

- **Clone the mobile into the target section,** named after its desktop (`… — Desktop` → `… — Mobile`). Place it temporarily at desktop x + width + 50.
- **Gutter:** bind the content frame's `paddingLeft` / `paddingRight` to `spacing/md` and set its 327-wide children to FILL (legacy clones have 24px gutters).
- **Copy:** override texts to the desktop's wording. Keep the earlier mobile wording only where it fixes a desktop typo, and report it.
- **States:** set variant properties (`State=Error/Filled/Disabled`, button `Label`) from script D's desktop values. Then hide whatever the variant drags in that the desktop doesn't show (for example the error Inputbox's required asterisk, `label > Vector`).
- **Desktop-only blocks** (error rows, info lines): clone the desktop node into the mobile's auto-layout. Set it to FILL, and set its text to `textAutoResize = 'HEIGHT'` with `layoutGrow = 1`.
- **Swapping filled fields:** insert the filled sibling's instance at the old index, then hide the old one and rename it `… (replaced)`.
- **Rules from `mobile-screen` → "House rules"** apply as written.

## Stage 4: Cursors

Each desktop that shows a cursor gets one on its mobile twin.

1. Hit-test the desktop cursor's fingertip (30% / 12% of the graphic) with script F. That gives the target's label.
2. Find the same label on the mobile.
3. Clone the **desktop's own cursor node** into the mobile frame and set it ABSOLUTE, with the fingertip on the target's centre. For a text target, use the same offset into the text.
4. If the desktop cursor sits outside its frame's crop, skip it and report it.

## Stage 5: Lay out pairs

Use script G:
- Columns follow the desktop x order.
- Each mobile sits 50px right of its desktop. Columns are `1440 + 50 + 375 + 200` = 2065 apart.
- Rows in a column start at y 100 and step by `max(desktop, mobile) height + 200`.
- The cover stays first.
- Grow the section to fit, and never shrink it.

## Stage 6: Verify and review

1. **Screenshot every new mobile** (`node.screenshot`, scale ~0.5) and compare it with its desktop: copy, states, cursor target, nothing clipped, chrome intact, height ≥ 812. Fix differences with targeted scripts.
2. **Run `mobile-design-review` Phase 1** on the new section only. Report its findings table, but **don't apply fixes**: they need approval under that skill.

## Stage 7: Record

1. In `mobile-screen/references/mobile-inventory.md`, add a section block with every new id and height. Mark any stale ids you found.
2. In `mobile-screen/references/existing-mobile-screens.md`, add one build-notes block for the flow: sources, overrides, quirks and cursors.
3. In `_shared/workfile.md`, update the section's id and status.
4. Regenerate the `responsive-workflow` bundle from the sources (its "Regenerating" section), so it includes these edits and this skill.
5. Don't commit unless the user asks.

## Final report

- **The new frames:** a table with name, id, height, and source cloned.
- **Layout changes:** frames moved, and the section size.
- **Judgment calls:** defaults taken, wording kept, skipped cursors.
- **The review findings,** from Stage 6.
- **Questions for the user,** at most three.

---

<a id="responsive-flow-references-scripts-md"></a>

# SOURCE: `responsive-flow/references/scripts.md`

> Step 0 · Automate: the reusable scripts for each stage

# responsive-flow scripts

These all worked on the 00 Request Flow run (2026-10-01). Replace the `<…>` placeholders. Every `use_figma` script starts with the page preamble:

```js
figma.skipInvisibleInstanceChildren = false;
const sec = await figma.getNodeByIdAsync('<SECTION_ID>');
let pg = sec; while (pg && pg.type !== 'PAGE') pg = pg.parent;
await figma.setCurrentPageAsync(pg);
```

## A. Summarise a saved `get_metadata` dump (Bash + Python)

```bash
python - <<'EOF'
import json, xml.etree.ElementTree as ET
x = json.load(open('<SAVED_FILE>', encoding='utf-8'))[0]['text']
root = ET.fromstring(x)
def show(n, d, maxd):
    if d > maxd: return
    a = n.attrib
    print('  '*d + f"{n.tag} {a.get('id')} '{a.get('name')}' {a.get('width')}x{a.get('height')} @({a.get('x')},{a.get('y')})" + (' HIDDEN' if a.get('hidden') == 'true' else ''))
    for c in n: show(c, d+1, maxd)
show(root, 0, 2)
EOF
```

## B. Find candidate mobiles on the page (`use_figma`, read-only)

```js
// preamble, then:
const out = [];
for (const f of pg.findAll(n => n.type === 'FRAME' && n.width >= 360 && n.width <= 400 && n.parent.type === 'SECTION'))
  out.push(`${f.id}|${f.name.trim()}|${Math.round(f.height)}|in ${f.parent.name.trim()}`);
return out.filter(s => /<KEYWORDS e.g. otp|email|apply|request/>/i.test(s));
```

## C. Copy diff between a desktop and a candidate mobile (read-only)

```js
const vis = n => { for (let a = n; a && a.type !== 'PAGE'; a = a.parent) if (!a.visible) return false; return true; };
const texts = async id => { const f = await figma.getNodeByIdAsync(id);
  return [...new Set(f.findAll(n => n.type === 'TEXT' && vis(n)).map(n => n.characters.trim()).filter(t => t && !/^(9:41|EN|\|)$/.test(t)))]; };
const pairs = [['<label>', '<DESKTOP_ID>', '<MOBILE_ID>']];
const r = {};
for (const [k, d, m] of pairs) { const a = await texts(d), b = await texts(m);
  r[k] = { onlyDesktop: a.filter(t => !b.includes(t)), onlyMobile: b.filter(t => !a.includes(t)) }; }
return r;
```

## D. Variant states per screen (read-only)

```js
const states = async id => { const f = await figma.getNodeByIdAsync(id);
  return f.findAll(n => n.type === 'INSTANCE' && n.visible && n.componentProperties && (n.componentProperties.State || n.componentProperties.Fill))
    .map(n => { const p = {}; for (const [k, v] of Object.entries(n.componentProperties)) if (v.type !== 'INSTANCE_SWAP') p[k.split('#')[0]] = v.value; return `${n.name}: ${JSON.stringify(p)}`; }); };
return { desktop: await states('<DESKTOP_ID>'), mobile: await states('<MOBILE_ID>') };
```

## E. Build helpers (paste into the build script)

```js
const md = await figma.variables.importVariableByKeyAsync('632ed28e60ef5fb2d2f5a0f16cdd96c8da2dec0a'); // spacing/md
// E1 load every font in a subtree (SF Pro in the Status Bar isn't installed, hence try/catch)
const loadAll = async root => { const seen = new Set(); for (const t of root.findAll(n => n.type === 'TEXT'))
  for (const s of t.getStyledTextSegments(['fontName'])) { const k = s.fontName.family + '|' + s.fontName.style;
    if (seen.has(k)) continue; seen.add(k); try { await figma.loadFontAsync(s.fontName); } catch (e) {} } };
// E2 clone a mobile next to its desktop, named after it
const make = async (srcId, deskId) => { const src = await figma.getNodeByIdAsync(srcId), desk = await figma.getNodeByIdAsync(deskId);
  const f = src.clone(); sec.appendChild(f); f.name = desk.name.replace(/Desktop\s*$/, 'Mobile');
  f.x = desk.x + desk.width + 50; f.y = desk.y; await loadAll(f); return { f, desk }; };
// E3 bind the 16 gutter on the content frame (child index 2 after Status Bar + Header; check per family)
const gutter = (frame, content = frame.children[2]) => { content.setBoundVariable('paddingLeft', md); content.setBoundVariable('paddingRight', md);
  for (const c of content.children) if (Math.round(c.width) === 327) c.layoutSizingHorizontal = 'FILL'; return content; };
// E4 button label + state through component properties
const setLabel = (btn, label, state) => { const p = {}; const lk = Object.keys(btn.componentProperties).find(k => k.startsWith('Label'));
  if (lk) p[lk] = label; if (state) p.State = state; btn.setProperties(p);
  if (!lk) { const t = btn.findOne(n => n.type === 'TEXT'); if (t) t.characters = label; } };
// E5 copy text styling (underlined link parts etc.) from a desktop text with the same characters
const copyStyle = async (from, to) => { for (const s of from.getStyledTextSegments(['fontName', 'fills', 'textDecoration', 'fontSize'])) {
  try { await figma.loadFontAsync(s.fontName); } catch (e) {} if (s.end > to.characters.length) continue;
  to.setRangeFontName(s.start, s.end, s.fontName); to.setRangeFills(s.start, s.end, s.fills);
  to.setRangeTextDecoration(s.start, s.end, s.textDecoration); to.setRangeFontSize(s.start, s.end, s.fontSize); } };
```

Traps seen on the run:
- After `State=Error`, the Inputbox's helper text sits under `helper text` rather than `Frame 2007736359`. Find it with `/helper|2007736359/i` on the parent name.
- The mobile Inputbox set isn't the desktop one. Its Error variant shows a required `Vector` that the desktop hides.
- The OTP row isn't always named `OTP row`. Find the boxes by instance name `Frame 2007736386…`.

## F. Desktop cursor targets (read-only)

```js
const out = {};
for (const f of sec.children) { if (f.type !== 'FRAME') continue;
  const c = f.children.find(n => /Cursor/.test(n.name)); if (!c) continue;
  const bb = c.absoluteBoundingBox, fx = bb.x + bb.width * 0.30, fy = bb.y + bb.height * 0.12, fb = f.absoluteBoundingBox;
  const inside = n => { for (let a = n; a && a !== f; a = a.parent) if (a === c) return true; return false; };
  const hits = f.findAll(n => n.visible && !inside(n) && n.absoluteBoundingBox && (() => { const b = n.absoluteBoundingBox; return fx >= b.x && fx <= b.x + b.width && fy >= b.y && fy <= b.y + b.height; })());
  out[f.name.trim()] = { cursor: c.id, cropped: fy > fb.y + fb.height, hits: hits.filter(n => n.type === 'INSTANCE' || n.type === 'TEXT').slice(-3).map(n => n.type + ' ' + n.name + (n.type === 'TEXT' ? ' «' + n.characters.slice(0, 30) + '»' : '')) }; }
return out;
```

Placing the cursor on the mobile:

```js
const c = deskCursor.clone(); mobile.appendChild(c); c.layoutPositioning = 'ABSOLUTE';
const a = target.absoluteBoundingBox, m = mobile.absoluteBoundingBox;
c.x = Math.round(a.x - m.x + a.width / 2 - c.width * 0.30); c.y = Math.round(a.y - m.y + a.height / 2 - c.height * 0.12);
```

## G. Lay out desktop/mobile pairs

```js
const pairs = { '<DESKTOP_ID>': '<MOBILE_ID>' /* … every pair */ };
const desks = []; for (const id of Object.keys(pairs)) desks.push(await figma.getNodeByIdAsync(id));
const cols = {}; for (const d of desks) (cols[Math.round(d.x)] = cols[Math.round(d.x)] || []).push(d);
let x = <FIRST_COLUMN_X e.g. cover.x + cover.width + 200>, maxBottom = 0;
for (const cx of Object.keys(cols).map(Number).sort((a, b) => a - b)) { let y = 100;
  for (const d of cols[cx].sort((a, b) => a.y - b.y)) { const m = await figma.getNodeByIdAsync(pairs[d.id]);
    d.x = x; d.y = y; m.x = x + d.width + 50; m.y = y; y += Math.max(d.height, m.height) + 200; }
  maxBottom = Math.max(maxBottom, y - 200); x += 1440 + 50 + 375 + 200; }
sec.resizeWithoutConstraints(Math.max(sec.width, x - 100), Math.max(sec.height, maxBottom + 100));
```

---

<a id="_shared-workfile-md"></a>

# SOURCE: `_shared/workfile.md`

> Step 1 · Setup: the Work File, pages, locked frames, components, tokens, product rules

# URMEI Figma Work File: shared reference

This is the single source for the node ids, page ids, components and tokens that the Figma skills (`mobile-screen`, `mobile-design-review`, `organize-flow`) need. Update it here, not in the skills. Verified on **2026-09-28**. Ids change when sections get reorganised, so **re-verify before relying on one** (see `figma-gotchas.md` → "Before you write").

## File and pages

- **Work File:** `FdmVPJo1j4t8s9gej1H7Yb` ("[MVP] Influencer Portal | Work File"). All building and editing happens here.
- **Main design file:** `cehltPtMoGWEtKbF7k3MQQ`. It is reference only, except for its **-> Responsive Design (Web & Mob)** page `794:24650`, whose mobile frames the user has you update too (2026-09-29). Its mobile board `1174:34352` is catalogued in `mobile-screen/references/main-file-mobile-flows.md`.

| Page | Id | What's there |
|---|---|---|
| **-> Responsive Design (Web & Mob)** | `2462:56445` (**gone on 2026-09-30:** the page is now `2650:50683`, its node ids are `2650:*`, and the locked ids `2384:76022` / `2384:77979` don't resolve. Re-verify before any page-wide write) | All current flows, desktop and mobile. It replaced the "Responsiveness" page `1802:19394` on 2026-09-28, so treat any `1802:*` id as dead. |
| **Components — Dev Handoff** | `2613:16624` | Every local main component (2026-09-30): one section per component (`01`–`11`), each holding just the component name above the component set (the user dropped the spec cards). New local components go here the same way. |
| Hrishi Workspace | `751:80091` | The old Browse & Add section `2320:42706`, the mobile footer `2321:52957` |
| Sample Request & Review Product | `2248:20562` | The original Sample Request board copy `2248-21224`, desktop only |

## Sections on the flows page

| Section | Id | Sub-sections |
|---|---|---|
| [Influencer] Shop Experience | `2446:56196` | 03 Publish Shop `2230:78005` · 04 Add Favorite `2061:41656` · 05 Remove Favorite `2248:33651` · 06 Reorder Favorite `2344:77290` · 07 Copy Affiliate Link `2344:78578` · 08 Remove Product `2364:57473` · 09 Shop Preview `2364:57887` · 10 Stats Breakdown `2364:58157` (nested `10.8 Detailed Product Stats` `2381:64707`) · **final design** `2384:76022` and `2384:77979` |
| [Influencer] Onboarding & Home Experience | `2446:47735` | 00 Request Flow `2446:47736` · 01 Registration & OTP Verification `2446:48508` · 03 Product Tour `2446:49613` · 04 Home `2446:48783` · 05 Help Center FAQ `2446:49401` · 06 Recent Activities `2446:49508` · 07 Account Menu & Logout `2446:50986` · 08 Language Selector `2446:51445` (no 02; frames renamed `NN.S Flow — State — Device` on 2026-09-30, e.g. Home "06 — Shop completed — mobile" is now `04.2 Home — Shop Completed — Mobile`) |
| **00 - Request Flow** (new, top level) | `2660:53392` (was `2627:107198`) | The Apply Now flow with email verification. Mobiles were added on 2026-10-01, one 50px beside each desktop (ids in `mobile-screen/references/mobile-inventory.md`). The happy path is `00.1` Landing → `00.2`/`00.3` Verify Email → `00.4`/`00.5` Verify Email OTP → `00.6`/`00.7` Apply Form → `00.8` Submitted. Edge cases are stacked under their Default screen: `00.9`–`00.10` email errors, `00.11`–`00.13` OTP errors, `00.14`–`00.15` identity verification states. The old `00 Request Flow` `2446:47736` inside Onboarding & Home is still there, and which of the two is current hasn't been confirmed. |
| [Influencer] Profile Settings & Notification | `2375:62087` | 01 Notification `2375:62088` · 02 Profile & Settings `2375:62288` |
| [Influencer] Sample Request & Review | `2617:56695` | 01 Sample Requests `2384:65543` · 02 Request a Sample: Happy Path `2384:66136` · 03 Request a Sample: No Address `2384:66596` · 04 Change Shipping Address `2384:66909` · 05 Add Shipping Address `2384:67268` · 06 Cancel a Request `2384:65891` · 07 Rejected Request `2384:66068` · 08 Write a Review `2384:69218` · 09 Product Page with Creator Reviews `2384:67626` · 10 Creator Adding Product Review `2384:67720` · 11 Creator Reviews List View `2384:68757`. The old parent `2384:65541` was dissolved; this one was recreated on 2026-09-30. |

## Locked: never edit

These are the design handed off to the dev team (user's rule, 2026-09-28). You may read them and clone from them, but never change them.

- `2384:76022` and `2384:77979`: the **final design** (the two `-` sub-sections in `2446:56196`). Their old parent `2384:76021` "(Final design)" was dissolved.
- `2320:42706`: BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26 (Hrishi Workspace).

Every page-wide write script must check that these ids still exist, and exclude any node whose ancestor chain contains one. Snippet in `figma-gotchas.md`.

## Components and reference frames

| Thing | Id / key | Notes |
|---|---|---|
| Status Bar / iPhone 13 Mini | set `2:2041`, `Mode=Light` `2:2042`, key `1c1ba5e2bd7e14a7fe8d2e575a4a4af1f02a98ef` | **Library** component. Import by key or clone an instance. Fill `#f8f8f8`, 47 tall. |
| Home Indicator | set `2:1824`, `Dark Mode=NO` `2:1825`, key `f9657d9e0ad6921a9248e5c387f2d7606843e929` | Library. 34 tall. |
| Header (mobile) | `Device=Mobile, Type=MVP Portal, Page=Default` `2105:74735`, key `2e60ce43733e2152c5a1e54b8a177cb8e21edaaa` | Library |
| Search | `state=Default` `2:3606` | Library, inside the `Search wrap` frame |
| Toast | main `2500:58708` (library) | The Work File wrapper instance is named `Tost`. The finished error toast is `2348:55780`. |
| **Notification Banner** | set `2454:68390` (Dev Handoff page) | Local. `Device` Desktop/Mobile, `Message`, `Show Action`, `Icon`, exposed `action` Button. All banners are instances of it. |
| **Product Affiliate Link** | set `2605:97740` (Dev Handoff page) | Local. `State` Published/Unpublished, `Link` text property. Fills its column, so one component serves desktop (568) and mobile (343). Unpublished shows "Publish shop to get your product URL" and no copy icon (`hasLiveLink`). Every PDP's link row is an instance of it (2026-09-30). |
| **What Creators Say** | set `2609:97872` (Dev Handoff page) | Local, built from 09.1 (`2404:64593`). `Device` Desktop (1200, side by side) / Mobile (343, stacked, pager on its own row), `Show Photos` boolean, text props Date, Quote, Name, Counter. Avatar and photo images are per-instance fill overrides. Every PDP's review card is an instance of it (2026-09-30). |
| **Settings Tabs** | set `2459:68480` (Dev Handoff page) | Local. `Active` Profile/Addresses/Social Accounts/Bank Details, `Bank Warning` boolean. |
| **Account Menu** | set `2602:108370` (Dev Handoff page): `Device=Desktop` `2602:108315` (330 dropdown), `Device=Mobile` `2602:108331` (343 sheet card + View Profile + close ✕) | Local, 2026-09-30. Text props `Name`, `Email`. All six header profile menus on the flows page are instances of it; the old frames are hidden beside them. |
| Mobile footer | `Footer/Mobile/Default`: `2321:52957` (Hrishi Workspace), final-design copy `2384:80274` | |
| Cursor | `2344:77335` (70×73 group). **Gone on 2026-10-01**: clone a desktop's `Annotation / Cursor (not for build)` instead | Fingertip at 30%/12% of the graphic |
| Close ✕ | `2384:78407` (`Button=Outlined icon, Size=md`) | |
| Centred confirm dialog | `2384:78404` (final design) | |
| Chrome reference | `2384:87491` (Status Bar + Header + Search wrap, 375×173) | |
| My Shop populated / empty | `2384:80204` / `2384:80765` | Final design |
| PDP canonical structure | 07.3 desktop `2344:78743`, mobile `2360:57678` | `Stack / What Creators Say` > [`Stack / What Creators Say`, `Performance Section`] |
| Mobile shop stats card | `2348:55137` | 5 metrics + "Showing" filter |
| Mobile reviews carousel | `2368:62493` (09.2 Storefront Preview) | The final design for every mobile review display: header `2368:62494`, cards row `2368:62503` |

## Library tokens (URMEI Design System)

Import with `figma.variables.importVariableByKeyAsync(key)` and bind with `setBoundVariable`. Find others with `search_design_system` (`entity: "variable"`, scoped to the URMEI Design System library key).

| Token | Value | Key |
|---|---|---|
| `spacing/xs` | 4 | `ba48da47b66e7db6ca6d5b4e2fe4f49f8d1a63f5` |
| `spacing/sm` | 8 | `8ca871a6a651b26bf53f3acf7cdfee97588463c8` |
| `spacing/md-sm` | 12 | `4cadb98785f846cb34433d7786651b6398a7931d` |
| `spacing/md` | 16 (the mobile gutter) | `632ed28e60ef5fb2d2f5a0f16cdd96c8da2dec0a` |
| `spacing/lg` | 24 | `8f028c48c403e20710eb6338dc087ae7b8828f98` |
| `spacing/8xl` | 120 (the desktop margin) | `83d418bbc87936213544320a290af3d3f5ead756` |
| `border/radius/xs` · `sm` · `md` · `lg` · `infinite` | 4 · 6 · 8 · 10 · 9999 | `b6f8682c…6b` · `6ede169e…6d` · `35bebd43…fb` · `bbb6df7b…bc` · `512b8e16…f1` (full keys: `b6f8682cfe2c2789cba28c4474b6c0cad8000f6b`, `6ede169e1394a6fc008c6d42808de0cc8c5fd26d`, `35bebd43a0eec842cd6aaf38f8d5a95134b2dbfb`, `bbb6df7b0287aadaabf41e84254cf515c38f67fc`, `512b8e16ffcc923a06e7676c179917a351509cf1`) |
| `border/color/default` | #e5e5e5 | `c44692ef1a879f64aec40aee42c042f90a7e2e80` |
| `border/color/dark` | #464646 | `0135812535a74f995c6588d7f470c43eb02fcd80` |
| `surface/secondary/100` | #fffefd | `d93517b686f3c802991aa3aea5409972420841db` |
| `surface/primary/500` | #403e3c | `bac52ff50c5d13a08cb47a154970a4cc90f0e2e9` |
| `typography/color/secondary/700` | #757575 | `db0f0405e5d1946bfceb126c410a6107f19a9545` |
| Text style `Body/body-md-medium` | 16/22 | `ef1832b2f17ac5577c9046d2b9195b9170bf12b6` (`importStyleByKeyAsync`) |
| Text style `Body/body-sm-medium` | 14/22 | `59b9ce0a5d57501e3760a859e8a551d43f0f24c8` |

There is **no token for `#2d2305`**, the banner text colour. The app hardcodes it too.

## Product rules the designs must follow

These come from the app code (the source of product truth) and from the user's decisions.

- **Favorites:** the word is "Favorite(s)", never "Featured". The cap is **4** (`src/shop/limits.ts`).
- **Shop Info Card** (`src/shop/components/StoreCard.tsx`):

  | State | Preview button | Second button | URL field | Status line |
  |---|---|---|---|---|
  | Published, no changes | Preview Storefront | View Shop | live URL | Last Published on … |
  | Published, with edits | Preview Storefront | Publish changes | live URL | Last Published on … |
  | Never published, has products | Preview Shop | Publish shop | "Publish shop to get your URL" | hidden |
  | Never published, no products | Preview Storefront (disabled) | Publish shop (disabled) | placeholder | hidden |
  | Publish blocked (0 products) | Preview Storefront (muted) | Publish shop (disabled) | "Your store URL is currently disabled." | hidden |

- **Shop Info Card layout (user, 2026-09-28):** on mobile, the two buttons stack vertically, both full width, Preview Storefront first, 8px apart (`spacing/sm`). On never-published cards the status line is hidden. The `Name row` (name over @handle) is vertical with a 0 gap, left-aligned (user, 2026-09-29). Applied in both the Work File and the main file's Responsive Design page.
- **Profile edit form, mobile (user, 2026-09-29):** there's no Save button at the bottom of the form. After the first edit, a `Sticky Save Bar` pins to the bottom above the Home Indicator: Discard (outlined) and Save Changes (primary), each half the width, 8px apart, with no helper text (the user dropped "You have unsaved changes"; it's hidden in the Work File frames). Leaving with unsaved edits opens "Discard unsaved changes?" (Keep Editing / Discard). Saving shows the "Profile changes saved" toast. Frames 02.1a–02.1c are in the Work File (`2550:51968`, `2550:52326`, `2550:52706`) and in the main file's Responsive page (`1467:55846`, `1467:56231`, `1467:56638`). Desktop keeps its inline Save.
- **Shop stats row** (`src/shop/data/stats.ts`): Total clicks, Total sales, Commission pending, Commission earned, Commission settled, plus the "Showing" period filter.
- **PDP Performance** (`src/shop/components/PerformanceStats.tsx`): Total unit sold, Link clicks, Conversion rate, Commission settled, plus "View other stats".
- **The Button component forces Title Case.** A layer reading "Publish changes" renders as "Publish Changes". Set layer text to the app's wording anyway.

---

<a id="_shared-figma-gotchas-md"></a>

# SOURCE: `_shared/figma-gotchas.md`

> Step 1 · Setup: use_figma script traps and recipes

# `use_figma` gotchas in the Work File

These are the lessons from real runs, shared by every Figma skill in this project. Load `figma:figma-use` before any `use_figma` call. This file adds what that skill doesn't cover.

## Before you write

- **Check that ids exist.** Sections get moved, dissolved and copied (the flows page itself was replaced on 2026-09-28). Run `get_metadata` or a read-only script on the page first, and check the locked ids in `workfile.md`. **If a locked id is missing, stop and ask.** A stale id silently protects nothing, and on 2026-09-28 that let two page-wide passes edit the final design.
- **Exclude locked subtrees by ancestry** in every page-wide script:
  ```js
  const LOCKED = ['2384:76022', '2384:77979', '2320:42706'];
  for (const id of LOCKED) if (!(await figma.getNodeByIdAsync(id))) throw new Error('locked id missing: ' + id);
  const isLocked = n => { for (let a = n; a && a.type !== 'PAGE'; a = a.parent) if (LOCKED.includes(a.id)) return true; return false; };
  ```
- **Look for duplicates.** The page has held two copies of a section at once. Confirm with the user which one is current.
- **Desktop frames are read-only** unless the user asks for a desktop change (see `mobile-design-review/references/final-design.md`).

## Script mechanics

- Start every script with `figma.skipInvisibleInstanceChildren = false`. Otherwise `findAll` silently skips instance children in clones, such as tab labels.
- **A failed script rolls back completely.** Fix it and rerun the whole script. Don't patch half of it.
- **Layout reads can be stale in the same script.** After changing `layoutMode`, sizing or visibility, a `height` read in the same pass may still give the old value (on 2026-09-28 this reported a 0 change for a stack that had grown 54). Derive deltas from the children (`row.height - button.height`), or measure in a second read-only call before you shift overlays.
- **"Missing" can mean opacity 0.** Before rebuilding an element that doesn't show, check its `visible` and `opacity`, and its parent's `clipsContent`. Frames copied from a hover state have carried `opacity: 0`: the mobile PDPs' affiliate-link `copy` icon, fixed on 2026-09-28.
- **Hidden nodes don't re-lay-out.** A hidden frame keeps its old size until it's shown. Don't treat its size as a failure.
- **Load fonts before any text write**, including `textAutoResize`, `characters`, and appending text nodes. Load each node's current fonts via `getStyledTextSegments(['fontName'])`. The Status Bar uses SF Pro, which isn't installed, so wrap bulk font loads in try/catch.
- **Don't use `node.query('[name="…"]')`** for names with spaces or symbols. Use `findAll(n => n.name === …)`. Names can carry trailing spaces, so match with `name.trim()`.
- **Changing a property default on a component** can flip instances that relied on the default. After you change a boolean default or a main component's visibility, set every instance's value explicitly.
- **Setting `strokesIncludedInLayout`:** on an auto-layout row with a bottom border, `true` pushes children up by the stroke width. Keep it `false`, and draw per-item underlines on the items.

## Layout traps

- **Fixed-height frames clip new content.** Many desktop pages are `layoutMode: NONE` with a fixed height, and some have a fixed `Wireframe` frame. After you add a block, grow the frame and move the footer. Desktop rule (07.4): `Footer.y = stack bottom − 64` (the footer tucks into the stack's bottom padding), and the frame and the background `Container` end at the footer's bottom.
- **Fixed-height cards collapse gaps.** A vertical card with a fixed height and space-between squashes a new gap to 0. Set `primaryAxisSizingMode = 'AUTO'` (vertical) or `counterAxisSizingMode = 'AUTO'` (horizontal).
- **A FILL-height child in a vertical stack collapses.** When a horizontal row becomes vertical, set its children's `layoutSizingVertical = 'HUG'`.
- **Toast wrappers are bottom-anchored.** `Tost` is a 118px wrapper with `primaryAxisAlignItems: MAX`. A taller toast grows upward (the top goes from 64 to 42, over the status bar).
- **Moving content moves nothing absolute.** Cursors, menus and toasts are `ABSOLUTE` overlays. When a block above them changes height, shift overlays that sit below it, and move overlays that point *into* the block by the target's own delta. A cursor on a dialog belongs to the dialog, so don't move it with the page.
- **A cursor or menu inside a `clipsContent` parent gets clipped.** Re-parent it to the top-level frame, or to a non-clipping ancestor, as ABSOLUTE and keep its absolute position.

## Component traps

- **Swapping a variant keeps the old icon colour.** Copy the icon's `strokes` from a correct instance afterwards.
- **Adapting the success toast** into a warning or error toast: copy the icon stroke across, and set the inner Toast's `itemSpacing` from 108 to 12, with HUG height. Or reuse the finished error toast `2348:55780`.
- **The Button component forces Title Case** on its label.
- **`createSlice()` crops don't render image fills.** Verify images with `get_screenshot` on the frame.

## Recipes

- **Restacking a desktop frame into a mobile one:**
  1. Clone the desktop frame. Find `Header` and `Footer` **by name before** calling `resize(375, h)`.
  2. Insert the Status Bar, Header and Search wrap (see `workfile.md`), then the mobile footer and the Home Indicator.
  3. Set the content padding to 16. Set inner frames wider than 343 to FILL.
  4. Switch side-by-side rows to VERTICAL. Make long card rows horizontal scrolls with `clipsContent`.
  5. Fix fixed heights (AUTO/HUG), fixed-row grids, and FILL-vertical thumbnails.
- **Placing a cursor:** clone `2344:77335` and append it to the top-level mobile frame as ABSOLUTE, at the target's centre minus (21, 9).
- **Replacing a frame with a component instance:** insert the instance at the old frame's index. Copy `layoutSizingHorizontal`, `visible`, the text properties and the prototype reactions (`setReactionsAsync`). Then remove the old frame, and report old → new ids.

---

<a id="mobile-screen-skill-md"></a>

# SOURCE: `mobile-screen/SKILL.md`

> Step 2 · Build: the mobile-screen skill (frame contract, new-flow reuse)

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

---

<a id="mobile-screen-references-responsive-system-md"></a>

# SOURCE: `mobile-screen/references/responsive-system.md`

> Step 2 · Build: breakpoints, type ramp, desktop-to-mobile rules

# How responsiveness works in the Work File

Notes from inspecting the node structure (not just the visuals) of the Work File `FdmVPJo1j4t8s9gej1H7Yb`. Surveyed on the old Responsiveness page, which was replaced by `2462:56445` on 2026-09-28; the findings still hold. Current ids and token keys are in `../../_shared/workfile.md`. Read this before adapting a desktop screen to mobile, or before eyeballing "how big should this text be".

## Breakpoints

Only **two real breakpoints** exist: **375px (mobile)** and **1440px (desktop)**. Other widths seen on the canvas are not breakpoints:

- `500` / `940` — desktop's own internal split (Side Accent Panel 500 + Form Area 940 = 1440), not a separate screen size.
- `800` — fixed-size modal/dialog cards (e.g. Tour Dialog), independent of viewport width.
- `1920×1080` — section "cover" slides (divider art between sections), not a real screen.

Screens are paired by name suffix and sit side by side on the canvas: `"01 — Apply landing — desktop"` next to `"02 — Apply landing — mobile"`. There is no tablet breakpoint.

## Typography — one fixed scale, not fluid

Text styles come from a **remote shared library** ("K-Beauty - Work file"), not local styles in this file — `figma.getLocalTextStylesAsync()` returns 0; every text node instead has a `textStyleId` pointing at the library. The ramp is named `Body/body-{size}-{weight}` plus a few `Heading/*`:

| Style | Size / Line-height | Used for |
|---|---|---|
| `body-xxs-regular` / `-medium` | 10/16 | fine print (safety notes, timestamps) |
| `body-xs-regular` / `-medium` | 12/19 | helper text, captions |
| `body-sm-regular` / `-medium` | 14/22 | field labels, body copy, tabs |
| `body-md-regular` / `-medium` / `-bold` | 16/22 | primary body text, nav |
| `body-lg-medium` | 18/27 | list-row titles (e.g. "Instagram") |
| `body-xl-bold` | 20/30 | emphasis headings |
| `body-xxl-regular` / `-bold` | 24/36 | **page titles — used identically on both mobile and desktop** |
| `Heading/body-sm-medium(ST)` | 16/22, +10% tracking, uppercase | small uppercase section labels |
| `Heading/h6` | 24/34 semibold | card-level heading |
| `Heading/h2` | 48/62 | marketing hero headlines only (landing pages) |

**Key finding: the same named style is reused at both breakpoints.** A mobile page title and a desktop page title both bind to `body-xxl-regular` — there is no separate "mobile scale" that shrinks type. Responsiveness is delivered entirely through *layout*, not fluid typography. Don't invent a smaller font size for mobile titles — match the desktop screen's style name.

## Spacing / color — bound variables, in theory; inconsistent in practice

Padding, gaps, radii, and border colors are meant to come from **remote Figma Variables** (e.g. a frame's `paddingLeft` resolving to `spacing/md` = 16), not raw numbers. The full scale seen in use, all from the same remote library, single mode each (no light/dark or breakpoint-based mode switching — same values at both mobile and desktop):

| Token | Value | Token | Value |
|---|---|---|---|
| `spacing/none` | 0 | `spacing/lg` | 24 |
| `spacing/xs` | 4 | `spacing/md 2` | 20 |
| `spacing/ten` | 10 | `spacing/xl` | 28 |
| `spacing/sm` | 8 | `spacing/xxl` | 32 |
| `spacing/md-sm` | 12 | `spacing/3xl` | 36 |
| `spacing/fourteen` | 14 | `spacing/5xl` | 64 |
| `spacing/md` | 16 | `spacing/margin` | 120 (desktop page margin) |

Radius: `border/radius/sm`(6, the dominant default for cards/inputs) `/md`(8, buttons/larger containers) `/lg`(10, big modals) `/infinite`(9999, pills/avatars). Color: `border/color/default` (#e5e5e5).

**Component internals are reliable.** Every `Button` instance checked binds `paddingLeft/Right` → `spacing/md` and `paddingTop/Bottom` → `spacing/sm`, consistently, at both breakpoints.

**The page-level gutter is not reliable — don't assume a single "correct" mobile margin.** A survey of 87 mobile screens' outer `Content` frame found:
- **29 use a 16px left/right gutter, 18 use 24px.** No clean rule — there's a loose lean toward 24px on auth/profile-setup screens and 16px on main-app screens (Home, Help/FAQ, Recent Activities), but it breaks both ways within the same flow.
- Most of these page-level paddings are **hardcoded numbers, not bound variables** — only roughly a third of screens actually bind the gutter to `spacing/md`. Binding is much more common (and much more consistent) at the component level than at the page-chrome level.
- Section-to-section `itemSpacing` (gap between major blocks) is the one macro-level value that's fairly consistent: almost always **24 or 32**.

**Standard for new work: the left/right gutter is 16px** (see `../SKILL.md`), bound via `figma.variables.importVariableByKeyAsync(key)` (find the key with `search_design_system`, `entity: "variable"`) + `setBoundVariable` rather than typing the raw number — that's what the better-maintained screens in the file do, and it keeps new work consistent even though a lot of existing screens aren't.

## How layout actually adapts between breakpoints

Since type and spacing tokens stay constant, adaptation happens structurally:

- Desktop's two-column layouts (settings sidebar + content, side-accent-panel + form) collapse to a **single-column stack** on mobile.
- Desktop's inline global header (logo + nav + search + lang + bell + avatar in one 1440-wide bar) splits into **separate stacked rows** on mobile — a `Header` row (logo, notification bell, avatar), then a `Search Wrap` row below it. Utility/settings pages (Recent Activities, FAQs, Manage Account) drop the search row entirely and use `Header` alone.
- Desktop sidebar nav (vertical list) becomes a **horizontal tab row** on mobile.
- Multi-column field grids (e.g. First name / Last name side by side) become **stacked single fields**.
- Every mobile screen still carries the library **Status Bar** pinned top and **Home Indicator** pinned bottom (ids and keys in `../../_shared/workfile.md`; the contract is in `../SKILL.md`).

---

<a id="mobile-screen-references-mobile-inventory-md"></a>

# SOURCE: `mobile-screen/references/mobile-inventory.md`

> Step 2 · Build: current mobile frame ids by section

# Mobile frame inventory: current ids

This lists every mobile screen frame (360–400 wide) on the flows page `2462:56445`, by section, with its height. It was generated from the live file on **2026-09-28**. **Use these ids.** `existing-mobile-screens.md` keeps the build notes, but many of its ids are older (see "Stale ids" at the end). Regenerate this file with the read-only script at the bottom after any reorganisation. 🔒 marks a locked section (read and clone only).

## [Influencer] Shop Experience `2446:56196`

**03 - Publish Shop** `2230:78005` (6 desktops)
- `2224:76254` 03.1 My-shop Default (2032)
- `2153:45302` 03.2 Confirm Dialog (812)
- `2332:38320` 03.3 Success Toast (2489)
- `2499:58387` 03.4 Publish Failed Dialog (812). **Rebuilt**; it was `2230:76758`.
- `2230:77536` 03.5 Publish Failed Dialog (812)
- `2230:77752` 03.6 Empty State (2139)
- 03.7 Card Menu Open (`2334:37777`) no longer exists.

**04 - Add Favorite Product** `2061:41656` (7 desktops)
- `2231:78919` 04.1 My-shop Default (2032)
- `2235:36634` 04.2 Context Menu Open (2489)
- `2348:55109` 04.3 Success Toast (2489)
- `2238:36643` 04.4 Empty State (2368)
- `2242:36731` 04.5 Favorite Tab Full (2418)
- `2260:36845` 04.6 Context Menu Slots Full (5675)
- `2348:55355` 04.7 Error Toast Slots Full (5675). This is the toast reference.

**05 - Remove Favorite Product** `2248:33651` (4 desktops)
- `2342:38585` 05.1 Context Menu Open (2418)
- `2342:38965` 05.2 Success Toast (2418)
- `2343:38910` 05.3 Product-detail Default (3364)
- `2343:39217` 05.4 Success Toast (3364)

**06 - Reorder Favorite** `2344:77290` (3 desktops)
- `2352:207169` 06.1 Favorites-tab Default (2418)
- `2352:207719` 06.2 Reordered (2418)
- `2352:207529` 06.3 Error Toast (2418)

**07 - Copy Affiliate Link** `2344:78578` (4 desktops)
- `2360:57021` 07.1 Hover Card (2489)
- `2360:57261` 07.2 Success Toast (2489)
- `2360:57678` 07.3 Product-detail Default (3418). This is the **PDP structure reference**.
- `2360:58025` 07.4 Success Toast (3418)

**08 - Remove Product from Shop** `2364:57473` (4 desktops)
- `2366:60539` 08.1 Hover Card (3020)
- `2366:60815` 08.2 Context Menu Open (3020)
- `2366:61376` 08.3 Confirm Remove Dialog (812)
- `2366:61082` 08.4 Success Toast (2489)

**09 - Shop Preview** `2364:57887` (2 desktops)
- `2368:62138` 09.1 My-shop Default (2489)
- `2368:62381` 09.2 Storefront Preview (3794)

**10 - Stats Breakdown** `2364:58157` (7 desktops)
- `2372:61440` 10.1 Favorites Tab (2418)
- `2372:61754` 10.2 Total Clicks (2060)
- `2372:62546` 10.3 Total Sales (2060)
- `2372:62923` 10.4 Commission Pending (2060)
- `2372:63306` 10.5 Commission Earned (2060)
- `2372:63689` 10.6 Commission Settled (2060)
- `2372:62140` 10.7 Total Clicks, Period Menu Open (2060)
- Sub-flow **Detailed Product Stats** `2381:64707` (3 desktops):
  - `2372:64239` 10.8 Sales Tab (1630)
  - `2372:64504` 10.9 Performance Tab (1540)
  - `2372:64763` 10.10 Details Tab (1670)

**🔒 Final design `2384:76022`** (6 desktops): catalogue, brand, search and filter
- `2384:76660` 02 Catalogue Default (2164)
- `2384:76867` Brand (861)
- `2384:76943` search-results-filter-expanded (812)
- Filter frames: `2384:76990` (the sticky-bar reference), `2384:77083`, `2384:77181`, `2384:77254` (812 each)
- `2384:77327` (812)
- `2384:77702` 08 Search results Success toast (1170)
- `2384:76023` 11 Search results No results (812)

**🔒 Final design `2384:77979`** (11 desktops): My Shop and PDP
- `2384:80765` 01 My shop Empty state (1565). This is the chrome reference `2384:87491`.
- `2384:79650` / `2384:79706` Browse Products, Catalogue Default (2092 / 2182)
- `2384:79248` Product detail content (1346)
- `2384:79768` 05 Product detail Default (1666). This is the modal PDP.
- `2384:78345` 06 Confirm popup (812). Centred dialog `2384:78404` is inside it.
- `2384:78437` 07 Confirm popup, Dropdown open (812)
- `2384:79390` 08 Search results Success toast (1170)
- `2384:79880` 09 Product detail Added (1666)
- `2384:80204` 10 My shop Product added (1944) and `2384:80313` (long, 3537)
- `2384:80509` 05 Favorites tab full (2357)

## 00 - Request Flow (Apply Now with email verification) `2660:53392`

Top-level section on page `2650:50683`, built 2026-10-01. Desktop columns are 2065 apart (desktop, 50, mobile, 200); edge cases are stacked under their Default.

- `2666:58399` 00.1 Apply Landing (812)
- `2666:56266` 00.2 Verify Email Default (812)
  - `2666:56447` 00.9 Invalid Email (812)
  - `2666:56552` 00.10 Email Already Has Account (812)
- `2666:56358` 00.3 Verify Email Filled (812)
- `2666:56655` 00.4 Verify Email OTP Default (812)
  - `2666:56820` 00.11 OTP Resend Available (812)
  - `2666:56902` 00.12 OTP Incorrect Code (812)
  - `2666:56989` 00.13 OTP Too Many Attempts (812)
- `2666:56737` 00.5 Verify Email OTP Filled (812)
- `2666:58508` 00.6 Apply Form Default (2136)
- `2666:59199` 00.7a Apply Form Filled, Not Verified (2136), twin of desktop `2660:53557` (that desktop is also named "00.7")
  - `2666:59594` 00.14 Verification in Progress (2028)
  - `2666:59978` 00.15 Verification Error (2014)
- `2666:58884` 00.7 Apply Form Filled (1919)
- `2666:58445` 00.8 Application Submitted (812)

## [Influencer] Onboarding & Home Experience `2446:47735`

> **Stale (2026-10-01):** the page was replaced, and this section is now `2650:118471`. Its 01 Request Flow mobiles are `2650:119212` landing, `2650:119026` form default, `2650:118862` form filled, `2650:118688` in progress, `2650:118519` error and `2650:118473` submitted. Its 02 Registration & OTP mobiles are `2650:119457` / `2650:119388` email default/filled and `2650:119317` / `2650:119245` OTP default/filled. The `2446:*` ids below don't resolve.

The older copy of this section, the `2126:*` ids, is on Hrishi Workspace now. Use these ids.

- **00 Request flow** `2446:47736`:
  - `2446:48476` Apply landing
  - `2446:48290` Apply form default
  - `2446:48126` Apply form filled
  - `2446:47952` Verification in progress
  - `2446:47783` Verification error
  - `2446:47737` Application submitted
- **01 Registration & OTP** `2446:48508`:
  - `2446:48721` Enter email
  - `2446:48652` Enter email filled
  - `2446:48581` Enter OTP
  - `2446:48509` Enter OTP filled
- **03 Product tour** `2446:49613`:
  - `2446:50327` Welcome
  - `2446:50491` Track your impact
  - `2446:50656` Curated products
  - `2446:50821` Earn commissions
- **04 Home** `2446:48783`:
  - `2446:49115` First-time user (2294)
  - `2446:48784` Shop completed (3275)
- **05 Help Center FAQ** `2446:49401`: `2446:49449`
- **06 Recent activities** `2446:49508`: `2446:49548`
- **07 Account menu & logout** `2446:50986`:
  - `2446:50987` Account menu
  - `2446:51391` Logout confirmation
- **08 Language selector** `2446:51445`: `2446:51446`

## [Influencer] Profile Settings & Notification `2375:62087`

- **01 Notification** `2375:62088`:
  - `2389:65047` 01.1 Empty State
  - `2389:65316` 01.2 With Items
- **02 Profile & Settings** `2375:62288`:
  - `2386:63654` 02.1 Profile Edit Form (bottom Save Changes hidden on mobile: saving moved to the sticky bar)
  - `2550:51968` 02.1a Profile Edited, Sticky Save Bar (812 viewport, row 3 at y 5100)
  - `2550:52326` 02.1b Unsaved Changes Dialog
  - `2550:52706` 02.1c Profile Saved Toast
  - `2386:63995` 02.2 Social Accounts Connected
  - `2386:64183` 02.3 Bank Details Empty State
  - `2389:64125` 02.4 Add Bank Details
  - `2386:64411` 02.5 Bank Details Connected
  - `2386:64642` 02.6 Addresses Empty State
  - `2389:64426` 02.7 Add First Address
  - `2386:64863` 02.8 Addresses Set As Menu
  - `2389:64758` 02.9 Set As Pop-up
  - `2386:65156` 02.10 Addresses Set As Done
  - `2422:63734` 02.11 Delete Bank Details Confirm
  - `2422:63841` 02.12 Delete Address Confirm

## Sample request & Review a product flow `2384:65541` › Flows `2384:65542`

- **01 Sample Requests** `2384:65543`:
  - `2396:58696` 01.1 Account Menu
  - `2396:58854` 01.2 Request List
  - `2396:59062` 01.3 Pending (approved)
  - `2396:59498` 01.4 Shipped
  - `2396:59284` 01.5 Pending (waiting)
- **02 Request a Sample: Happy Path** `2384:66136`:
  - `2400:64684` 02.1 Product Page (a modal PDP)
  - `2400:65005` 02.2 Request Sheet
  - `2400:65348` 02.3 Requested Toast
- **03 No Address** `2384:66596`:
  - `2400:65633` 03.1 Product Page
  - `2400:65940` 03.2 Request Sheet, No Address
- **04 Change Shipping Address** `2384:66909`:
  - `2400:66285` 04.1 Request Sheet
  - `2400:66625` 04.2 Select Delivery Address Sheet
- **05 Add Shipping Address** `2384:67268`:
  - `2400:67034` 05.1
  - `2400:67443` 05.2
- **06 Cancel a Request** `2384:65891`:
  - `2402:81769` 06.1 Cancellable Details
  - `2402:82007` 06.2 Confirmation
  - `2402:82127` 06.3 Cancelled
- **07 Rejected Request** `2384:66068`: `2402:82341` 07.1
- **08 Write a Review** `2384:69218`:
  - `2402:82534` 08.1 Delivered Details
  - `2402:82787` 08.2 Rating Sheet
  - `2402:82921` 08.3 Photo Uploading
  - `2402:83093` 08.4 Filled
  - `2402:83438` 08.5 Photo Added
  - `2402:83786` 08.6 Submitted
  - `2402:83614` 08.7 Low Rating
  - `2402:83265` 08.8 Upload Error
- **09 Product Page with Creator Reviews** `2384:67626`: `2404:64589` 09.1 Public PDP (5927)
- **10 Creator Adding Product Review** `2384:67720`:
  - `2404:62101` 10.1 Review Prompt
  - `2404:62450` 10.2 Rating Sheet
  - `2404:62729` 10.3 Review Form
  - `2404:63067` 10.4 Own Review Shown
- **11 Creator Reviews List View** `2384:68757`:
  - `2404:63403` 11.1 Account Menu
  - `2404:63726` 11.2 Review List
  - `2404:63918` 11.3 Reviews Display

## [Ecommerce] Storefront & Consumer Experience — Mobile `2652:66074` (page `2248:20562`, added 2026-09-30)

- `2652:66075` S1 Storefront — Default (4982)
- `2654:29530` S2 Storefront — Followed (4342)
- `2654:29922` S3 Storefront — No Picks in This Market (4999)
- `2654:221838` S4 Storefront — Vietnam Localization (4951)
- `2655:227545` R1 Storefront — Review Detail Sheet (812)
- `2655:29976` P1 PDP — Default (from Storefront) (4010)
- `2655:222516` P2 PDP — Not Available in Market (3840)
- `2655:223354` P3 PDP — Notify Me Sheet, Signed In (812)
- `2655:226477` P4 PDP — Notify Me Confirmed (812)

> **2026-09-30:** the flows page is now **`2650:50683`** and every id above this section changed to `2650:*` (e.g. 09.2 is `2650:130464`, 09.1 Public PDP `2650:145003`). `2462:56445` no longer exists. Regenerate this file with the script below, pointed at the new page.

## Stale ids in `existing-mobile-screens.md`

Checked on 2026-09-28. Of its 151 ids, 102 are current.

- **Moved to Hrishi Workspace:**
  - `2004:22278`, `2024:22599` (the old Manage Account mobiles, since superseded by 02.x)
  - all `2126:*` (the old Onboarding copy)
  - `2229:57939`, `2289:38912`
  - `2320:*`, including the locked `2320:42706`
  - `2321:52957` (the mobile footer, still valid as a clone source)
- **Moved to other pages:** `1619:36927` and `1619:36953` (Influencer Portal v2), and `400:16257` (Sharon).
- **No longer exist:**
  - `1802:19394` (the old page), `1810:20063`, `1993:24344`, `2081:72865`, `2133:16713`
  - all `2145:*` except those listed above
  - `2153:42552` (the old Browse & Add section), `2180:71804`, `2190:74648`, `2190:74761`, `2190:74928`, `2222:16744`, `2229:58131`, `2230:76592`
  - `2230:76758` (03.4, now `2499:58387`), `2231:79376`, `2334:37777` (03.7)
  - `2344:62881`, `2355:57147`, `2364:58343`, `794:26005`

## Regenerating this file

Run this read-only script with `use_figma`, then rewrite the lists above from its output:

```js
const pg = await figma.getNodeByIdAsync('2462:56445'); await figma.setCurrentPageAsync(pg);
const out = []; const walk = (sec, path) => { const m = sec.children.filter(c => c.type === 'FRAME' && c.width >= 360 && c.width <= 400);
  if (m.length) out.push({ section: path + sec.name.trim(), id: sec.id, mobiles: m.sort((a, b) => (a.y - b.y) || (a.x - b.x)).map(f => `${f.id}|${f.name.trim()}|${Math.round(f.height)}`) });
  for (const c of sec.children) if (c.type === 'SECTION') walk(c, path + sec.name.trim().slice(0, 30) + ' › '); };
for (const s of pg.children.filter(c => c.type === 'SECTION')) walk(s, ''); return out;
```

---

<a id="mobile-screen-references-existing-mobile-screens-md"></a>

# SOURCE: `mobile-screen/references/existing-mobile-screens.md`

> Step 2 · Build: Work File mobile frames by flow, with build notes

# Existing mobile screens — check here before building a new one

> **For current node ids, use `mobile-inventory.md`** (generated from the live file on 2026-09-28). This file keeps the build notes. About a third of its ids are stale since the page move (Responsiveness `1802:19394` → flows page `2462:56445`); `mobile-inventory.md` → "Stale ids" lists which ones.

Catalog of mobile (375px) frames that already exist in `FdmVPJo1j4t8s9gej1H7Yb` ("[MVP] Influencer Portal | Work File"), page **Responsiveness** (`node-id=1802-19394`). **Read this before starting a new mobile screen or shop flow** — reuse/extend a frame listed here instead of rebuilding it from scratch. Link format: `https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-%257C-Work-File?node-id=<id>`.

> Correction to `SKILL.md`: that file says new screens go inside a section at `node-id=1810-20063` ("Section 1") — **that node does not exist** (verified 2026-09-23, `get_metadata` returns not-found). The real top-level sections on the Responsiveness page holding shop mobile work are the two listed below. Use one of those, not `1810-20063`.

> **Renamed by `/organize-flow` (2026-09-25):** every frame in the 10 flow sections now follows `NN.S Flow — State — Desktop/Mobile`, and sections are titled `01 - Add Product` … `10 - Stats Breakdown`, with Add/Remove Featured renamed to **04 - Add Favorite Product** and **05 - Remove Favorite Product**. The column is re-stacked 01→10. **Node ids didn't change**, so every id below still works; only the names differ. Inner layer names changed too. Stat tiles, for example, are now `Text / TOTAL CLICKS` rather than `Total Products Label`, so find text by `characters`, not by old layer names. Section 10's product stats now live in the recreated sub-section `2381-64707`.

> **Stale entries (checked 2026-09-25):** `2153-42552` (the BROWSE & ADD PRODUCT section below) is no longer on the page. The current section is **`2320-42706`** ("BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26"), which holds a newer copy of the main file's board `1174:34352`. `2222-16744` (My Shop / Unpublished) and `2231-79376` are **deleted**, so use the Publish Shop section's `2224-76254` instead. Re-check any node id below with `get_screenshot` before cloning it.

> **My Shop rules applied (2026-09-25):**
> - Every full-page My Shop mobile in sections 03–10 now ends with a `Footer/Mobile/Default` (a clone of `2384:80274`), so the frames are 450–690px taller than the sizes listed below.
> - Populated shops no longer have the dashed "Add Product" card.
> - Empty-state shops no longer have the "Your Picks" toolbar.
> - Rows were reflowed, and node ids are unchanged.
> See `mobile-design-review/references/readiness-log.md`.

## Cursors on mobile screens (added 2026-09-25)

Every mobile screen whose desktop shows the hand cursor now has one on the same element. Each is a 70×73 clone of `2344:77335`, placed absolute in the top-level frame:

| Mobile | Cursor | Points at |
|---|---|---|
| Publish 01 `2224-76254` | `2355-57049` | Publish Shop button |
| Publish 02 `2153-45302` | `2355-57114` | Publish (sheet) |
| Publish 10 `2334-37777` | `2355-57147` | ⋮ on card 1 |
| Add Featured 01 `2231-78919` | `2355-57082` | Publish Shop button |
| Add Featured 02 `2235-36634` / 07 `2260-36845` | `2235-36708` / `2260-36950` | "Add to featured" menu item (existing, inside the menu) |
| Remove Featured 01 `2342-38585` | `2355-57181` | "Remove from Favorites" menu item |
| Remove Featured 04 `2343-38910` | `2355-57208` | "Remove from Favorites" button |
| Reorder 01 `2352-207169` | `2355-57241` | › on card 1 |
| Copy Link 01 `2360-57021` | `2360-57126` | "Copy affiliate link" menu item |
| Copy Link 03 / 04 `2360-57678` / `2360-58025` | own `Cursor` | the affiliate link's copy icon |

No cursor was added to the Publish section's `2230-77752` (09): its desktop twin (Add product empty state, cursor on Browse Product) no longer matches that frame's state.

## 00 - Request Flow (Apply Now with email verification) — `node-id=2660-53392` (built 2026-10-01)

16 mobiles, one beside each desktop. Ids are in `mobile-inventory.md`. Every one is a clone of an existing mobile from the old Onboarding flows (`2650:*`):

- **Email screens** (00.2, 00.3, 00.9, 00.10) clone 02.1 / 02.2 Enter Email.
  - "Welcome back!" is hidden.
  - The title, the `Inputbox` helper text ("We'll send a one-time code to this email.") and the footer "Already have an account? Log In" are overrides.
  - The error states set the Inputbox `State=Error`, which brings in a red asterisk. It's hidden (`label > Vector`) to match the desktop.
- **OTP screens** (00.4, 00.5, 00.11–00.13) clone 02.3 / 02.4 Enter OTP, retitled "Enter OTP to verify your email", with the button label "Verify Email".
  - 00.11 restyles the resend line from the desktop text: "Resend OTP" is underlined.
  - 00.12 and 00.13 hold a clone of the desktop's red `Error` / `Info` row. In 00.13 it replaces the hidden countdown.
- **The email and OTP clones had 24 gutters.** Their content frames are now bound to `spacing/md` (16), with the children set to FILL.
- **Apply form screens** clone 01.2 / 01.3 / 01.4 / 01.6.
  - Filled values come from 01.3's `Inputbox`es. The originals are hidden as `Inputbox (replaced)`.
  - In 00.15 the social list is 01.3's (Instagram and TikTok connected), and the old one is hidden as `Social platforms list (replaced)`.
  - Button states (Connect, Start Verification, Submit) follow each desktop.
  - The mobiles keep the corrected copy ("…URMEI:", "to help verify your reach."). The desktop says "to helps verify your reach as a creator".
- **Cursors** are clones of each desktop's `Annotation / Cursor (not for build)`, absolute, with the fingertip on the same element. `2344:77335` no longer exists. 00.15 has no cursor because its desktop cursor points below that frame's 900px crop.

## [Ecommerce] Storefront & Consumer Experience — Mobile — `node-id=2652-66074`

Built 2026-09-30 on the **Sample Request & Review Product** page `2248:20562` (the user's link), right of the old Sample Request board, from the main file's desktop flow `236:19239`. The main file's Responsive page has no storefront mobiles, so every screen is an Adapt. Mobile only: the desktops stay in the main file. Row 1 is the storefront (S1–S4, R1) and row 2 the PDP (P1–P4).

**Figma links**
- Section: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2652-66074
- S1 Default: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2652-66075
- S2 Followed: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2654-29530
- S3 No Picks in This Market: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2654-29922
- S4 Vietnam Localization: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2654-221838
- R1 Review Detail Sheet: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-227545
- P1 PDP Default: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-29976
- P2 PDP Not Available: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-222516
- P3 Notify Me Sheet: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-223354
- P4 Notify Me Confirmed: https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/-MVP--Influencer-Portal-|-Work-File?node-id=2655-226477

| Screen | Id | Built from | Notes |
|---|---|---|---|
| S1 Storefront — Default | `2652:66075` | 09.2 Storefront Preview `2650:130464` | Modal "Your shop preview" header hidden. **Shopper chrome:** `Header` `Device=Mobile, Type=E-Commerce, Page=Default` (key `9080bb36f03927cecc0d6fa34ccae6f750262ba7`) + Search Wrap + `Breadcrumb Step Count=3` (Home / Influencers / Charlotte) in a `spacing/md` wrap. The cloned `Creator profile card section` and `Reviews section` main components were swapped for **instances** of the 09.2 originals, so the storefront and preview stay in sync |
| S2 Storefront — Followed | `2654:29530` | S1 | Follow → `Button=Outlined`, "Following". Favorite Picks hidden (as desktop) |
| S3 Storefront — No Picks in This Market | `2654:29922` | S1 | `No Availability Notice` under the creator card (`surface/tertiary/300`, radius md, title + hint + full-width outlined Change Country). Every card: `Tag` shown "Not Available", price hidden, bag icon hidden and a DS Icon Library `bell` (key `d161a40b96b2b19c9b2ef6ea1b70ecca7899ccfa`) put in the same 44px button |
| S4 Storefront — Vietnam Localization | `2654:221838` | S1 | Vietnamese strings, prices as `520.000₫`. The last All Picks card is a copy of S3's unavailable card ("Chưa có hàng"). Figtree renders Vietnamese fine here, so the desktop's missing glyphs are a font problem in that frame only. The Button component forces Title Case ("Theo Dõi") |
| R1 Storefront — Review Detail Sheet | `2655:227545` | P3 | Bottom sheet over S1 (scrolled to the reviews). The product row (with chevron), reviewer, full text and photos are cloned from the reviews card. It has no CTA; the body gets 40px bottom padding to clear the Home Indicator. An opaque status bar sits over the scrolled underlay |
| P1 PDP — Default (from Storefront) | `2655:29976` | 09.1 Public PDP `2650:145003` | Header swapped from MVP Portal to E-Commerce. A new `Creator Market Bar` (avatar + "You're shopping **Charlotte's Picks**", "SG · SGD") sits under the search. Purchase `Type=One Time` (the desktop default). Similar / More from Brand / Campaign / Newsletter / Features hidden |
| P2 PDP — Not Available in Market | `2655:222516` | P1 | Image `Tag` "Not Available". Price, Size and Type hidden. `Not Available Notice` card: title, hint, full-width primary Notify Me, divider, "Available in Singapore". Market bar "VN · VND" |
| P3 PDP — Notify Me Sheet, Signed In | `2655:223354` | 02.2 Request Sheet `2650:140824` | Underlay = P2 clone. Deliver-to hidden; the message section becomes a read-only email field. Fine print sits under it. Sheet bottom-anchored (`y = 812 − h`), cursor on Notify Me. The shopper email is `alex.tan@gmail.com`, not the creator's |
| P4 PDP — Notify Me Confirmed | `2655:226477` | 03.2 Confirm Dialog `2650:126372` | Popup **detached** (the popup component can't stack its buttons): circle-check icon, centred title and text, buttons stacked full width (Done, then Back to Charlotte's Shop), close ✕ hidden, centred vertically |

## Sample Request & Review a Product — `node-id=2384-65541`

Built 2026-09-25 inside the user's copy of the main-file board `1030:27074`. The board sits beside Profile Settings on Responsiveness, at x≈101965. There are 36 mobile frames, each 50px right of its desktop, and `/organize-flow` has been applied. The 11 sub-sections are numbered **01 – 11** inside `2384-65542`. Screen names come from the mobile names, because several desktop frame names were wrong (e.g. "Account Menu" on a product page). Each developer note sits once, under the screen it annotates.

| Sub-section | Mobile screens | How they were built |
|---|---|---|
| 01 Sample Requests | 5 | Account menu = copy of `2126-20651`. Request list and 3 request-details pages (Approved, Waiting, Shipped) restacked from their desktops: the 2-column details row goes VERTICAL, and the tracking line wraps |
| 02 Request a Sample: Happy Path | 3 | Catalogue product page `2320-46453` with the cursor on Request Sample. **Request sheet** (desktop dialog restacked into a bottom sheet). Requested state: Request Sample swapped to `State=Disabled`, plus a success toast with a **View Requests** action (`2320-46686`, action shown) |
| 03 No Address | 2 | Product page with the cursor, then a sheet with the no-address empty state and Submit disabled |
| 04 Change Shipping Address | 2 | Request sheet, then **Select delivery address** sheet (radio cards, Add New) |
| 05 Add Shipping Address | 2 | Select-address sheet, then **Add shipping address** sheet (fields in one column, frame 1004 tall) |
| 06 Cancel a Request | 3 | Cancellable details, then a confirm **sheet** (popup instance widened to 375), then cancelled |
| 07 Rejected Request | 1 | Details with the rejected banner |
| 08 Write a Review | 8 | Delivered details: the "sample delivered · Write a Review" card is stacked vertically with a full-width button, and the cursor is on it. Then the rating sheet and five review-form sheets (uploading, filled, upload error, photo added, low rating), then submitted with the toast "Thanks for sharing your review with us!". **The 1–10 rating row wraps into 5×2** (tiles (width−32)/5). The rating gradient bar is set to FILL. The text-area component is set to HUG so the 152px input doesn't overlap "Add Photo" |
| 09 Product Page with Creator Reviews | 1 | **New public PDP** restacked from the 1440×5347 desktop: details in one column, What Creators Say, and carousels for Similar Products and More from Brand (160-wide cards), Reviews (300-wide cards) and Campaign Spotlight (200-wide). Newsletter stacked with a 260-tall image, then features, the mobile footer and the HI. Price rows wrap as whole labels |
| 10 Creator Adding Product Review | 4 | In-shop PDP `2360-57678` with the cursor on Write A Review, then the rating sheet, then the review-form sheet with the cursor on "8", then the page with **your own review** in What Creators Say (desktop quote, 3 photos `Submitted photos row`, "Charlotte Wynn (You)" truncated so the pager fits, review CTA hidden) |
| 11 Creator Reviews List View | 3 | Account menu with the cursor on Your Reviews, the **Your Reviews list** restacked (names wrap to 2 lines), and the PDP reviews display (copy of 10's own-review page) |

**Reusable from this flow:** bottom sheets for request, select-address, add-address, cancel-confirm, rating and review-form, the request-details page, the Your Reviews list, and the public PDP. **Cursor rule refinement:** mirror only cursors that are *visible* on the desktop. Several desktops keep hidden cursor groups under their overlays; don't copy those. When the desktop's cursor target sits under a sheet on mobile, drop the cursor.

## [Influencer] Profile Settings & Notification — `node-id=2375-62087`

Built 2026-09-25 inside this section, which sits away from the column at x≈101741. `/organize-flow` has been applied: each mobile frame is 50px right of its desktop.

**Rows:**
- **01 - Notification** (`2375-62088`)
- **02 - Profile & Settings** (`2375-62288`): the happy path in row 1, then the Address, Shipping & Billing sub-flow in row 2.

| # | Mobile | node-id | Notes |
|---|---|---|---|
| 01.1 | Notification — Empty State | `2389-65047` | Full-screen panel: My Shop `2368-62138` underneath, then a scrim, then the desktop drawer widened to 375 at y=47, then a white Status Bar and the HI. The bell well is restored to 48×48 and centred |
| 01.2 | Notification — With Items | `2389-65316` | Same, with the Today / Yesterday / Last Week groups and the tinted unread rows |
| 02.1 | Profile Edit Form | `2386-63654` | Copy of `2004-22278` with the footer added |
| 02.2 | Social Accounts Connected | `2386-63995` | Copy of `2024-22599` with the footer added |
| 02.3 | Bank Details Empty State | `2386-64183` | **Manage Account template**: `2024-22599` with the tab switched to Bank (tab variants swapped; labels restored), the banner and ⚠ shown, and the desktop's `columns` content panel restacked, followed by the footer |
| 02.4 | Add Bank Details | `2389-64125` | Bottom sheet over 02.3. The modal is restacked to 375 with top radius 16. **Its GRID field rows were converted to one column, the fields set to HUG height, and the labels set to `primaryAxisAlignItems = MIN`.** The frame grows past 812 (881) |
| 02.5 | Bank Details Connected | `2386-64411` | Bank tab with no banner and no ⚠. The card is laid out vertically, with the details then the delete/edit buttons |
| 02.6 | Addresses Empty State | `2386-64642` | Addresses tab with the "No address added" empty state |
| 02.7 | Add First Address | `2389-64426` | Full-height sheet with 9 fields in one column plus the default shipping/billing checkboxes (frame 1132 tall) |
| 02.8 | Addresses Set As Menu | `2386-64863` | Address cards laid out vertically (details, then Set As / delete / edit). Title-row badges hug and wrap. **Cursor** on the Office row's Set As |
| 02.9 | Set As Pop-up | `2389-64758` | Small bottom sheet over 02.8 with the checkboxes and Cancel / Confirm |
| 02.10 | Addresses Set As Done | `2386-65156` | Office carries both Default badges |
| 02.11 | Delete Bank Details Confirm | `2422-63734` | 375×812. A clone of 02.5 as the underlay, the scrim, and a centred 335 dialog (final-design pattern `2384:78404`): "Delete bank details?", the app's copy, Keep Details (Outlined lg) / Delete (Destructive lg). No desktop twin |
| 02.12 | Delete Address Confirm | `2422-63841` | Same pattern over a clone of 02.10: "Delete this address?", Keep Address / Delete. No desktop twin, and the app has no address-delete confirm yet |

**Restack recipe for Manage Account screens:** copy the template, `setTab`, toggle `notification-banner` and the Bank ⚠, then replace the last child of `Content` with `columns.children[1]` from the desktop. After that, make every auto-layout frame HUG its height, convert header rows and `address /` rows to VERTICAL, and let `title row`s wrap with HUG children. For modals, convert GRID rows to VERTICAL and set the field instances to `layoutSizingVertical = 'HUG'`, or they squash to 28px.

**Sheet update 2026-09-25:** 02.4 and 02.7 are now fixed 812 frames. The form scrolls inside the sheet, and Cancel/primary sit in a sticky `fixed-button-bar` above the HI. On 02.7, the checkboxes and the first-address note are below the scroll fold.

**Chrome update 2026-09-25:** all ten 02 frames now carry the house Header instance and Search wrap (cloned from `2384:80767` / `2384:80768`) in place of the template's detached 88px header, so each frame is 38px taller than the sizes noted above.

The stray `2375-62626` ("Bank details" loose text) sits at the bottom of 02 and is flagged, not deleted.

## PUBLISH SHOP section — `node-id=2230-78005`

Updated 2026-09-25 to the main file's newer revision of the flow, `03 - Publish Shop` (`cehltPtMoGWEtKbF7k3MQQ`, section `236:22430`). The section holds old desktop copies and cover cards, and each mobile frame sits beside its desktop twin. The frames were updated in place. The only exceptions are 03, which was replaced because it was wrong, and 10, which is new. The section is 18725 wide.

| # | Screen | node-id | Size | Main-file desktop | Notes |
|---|---|---|---|---|---|
| 01 | My Shop / Unpublished (1 pick, not yet published) | `2224-76254` | 375×1563 | `236:22437` | Preview Storefront is **enabled** (`Button=Outlined, State=Default`, `2:138`). Tabs read "All Picks (1) / Favorites (1)". The shop has a "Not published yet" caption |
| 02 | Confirm publish (bottom sheet) | `2153-45302` (named "1") | 375×812 | `236:22581` | Sheet over the empty shop: "Publish your shop?" with Cancel / Publish, and the copy says "Favorite products" |
| 03 | Published: success toast | `2332-38320` | 375×1618 | `236:22513` | Replaced `2230-76592`, which showed the toast over an **unpublished** card. Copied from `2229-57939`. It has the published card (URL, Preview Storefront + View Shop, "Last Published on …"), the stats card and the toast "Your shop published successfully". The badge reads "★ Favorite" |
| 07 | Publish failed: bank details missing | `2230-76758` | 375×812 | `236:22677` | Behind the sheet is a copy of 03 with no toast, plus Manage Account's `notification-banner` under the Header ("To publish your shop, you need to add bank details"). The sheet shows the error row "Bank details missing · Add bank details", and Publish is disabled |
| 08 | Publish changes: shop goes offline | `2230-77536` | 375×812 | `236:22765` | Behind the sheet is a copy of 09 with no toast, with Preview Storefront and **Publish Changes** enabled. The sheet reads "Publish changes?" with the warning "This takes your shop offline…" |
| 09 | Published, no products: offline toast | `2230-77752` | 375×1505 | `236:22823` | Published card with the URL, Preview Storefront and **Publish** both disabled, and "Last Published" hidden. It has the stats card, "All Picks (0) / Favorites (0)" and the "Your shop is empty" card. The toast reads "This takes your shop offline", with `triangle-alert` swapped in for the check icon and recoloured to the toast text colour. The desktop draws no toast here; the user asked for one |
| 10 | No affiliate link before publish: card menu open | `2334-37777` | 375×1563 | `236:22864` | Copy of 01 plus the `Options List` from `2235-36634`, with its `Cursor` child deleted. A cursor on the ⋮ button (`2355-57147`) was added back later to match the main-file desktop. The menu reads View product details / Remove from Favorites / Remove from shop. **"Copy affiliate link" is hidden**, because an unpublished item has no link |

**Stats on these screens follow the new desktop** (user's choice, 2026-09-25): TOTAL CLICKS 20 · TOTAL SALES 10 · COMMISSION PENDING S$40 · COMMISSION EARNED S$80 · COMMISSION SETTLED S$40. The desktop has no Total Products tile, but it does have Commission Pending. This differs from the "Stats block" section below, which is the older 5-metric set.

**Mobile dialogs are bottom sheets:** a `popup` frame at the bottom of a 375×812 overlay, laid over a copy of the page behind it. Swap in a different page behind the sheet to change the state, as 07 and 08 do.

## Add Featured Product section — `node-id=2061-41656` (complete as of 2026-09-25)

Every desktop in this section now has a mobile version 100px to its right. The section is 21739 wide after frames were shifted to make room.

| Desktop | Mobile | Notes |
|---|---|---|
| 01 publish-shop / my-shop / default `2231-78843` | `2231-78919` | (existing) |
| 02 context-menu-open `2231-78762` | `2235-36634` | (existing) The **toast was removed** on 2026-09-25; it belonged to 03. See the frame's own entry below |
| 03 success-toast `2231-79547` | **`2348-55109`** | New. Copy of 02: menu closed, "★ Favorite" badge shown with the badge row set to SPACE_BETWEEN, "Favorites (1)", "Publish Changes", toast "Product added to Favorites". Stats use the Publish Shop five (53% · 34 · S$845 · S$845 · S$0) |
| empty-state `2061-42375` | `2238-36643` | (existing) |
| 05 featured-tab-full `2061-41657` | `2242-36731` | (existing) |
| 07 context-menu-slots-full `2061-41839` | `2260-36845` | (existing) **Moved** beside its desktop; it used to sit after 08 |
| 08 error-toast-slots-full `2061-42067` | **`2348-55355`** | New. Copy of 07: menu closed, badges read "★ Favorite", same stats. The **error toast with an action button** (`2348-55780`) is copied from the mobile `Tost` in `2320-46565`, with its hidden action `Button` shown ("Manage Favorites"). The icon is swapped to `x-circle` (`745:46281`) and recoloured red (#EE4442, taken from the desktop toast). The inner Toast's `itemSpacing` was cut from 108 to 12, with hug height and centred items, so a two-line message fits. **Reuse this toast for any error or action toast** |

## 08 - Remove Product from Shop section — `node-id=2364-57473`

Built 2026-09-25. It's a **copy** of the container's `2344-62881`, placed in the right-hand column at x=73490, as with 01–07. Section width is 10568.

| # | Screen | node-id | Notes |
|---|---|---|---|
| 01 | Card hover | `2366-60539` | Copy of `2360-57021`: published, **2 picks** (Water Bank + COSRX Snail; the second card is a copy of the first with new texts and the image fill from `2242-37102`), "All Picks (2) / Favorites (2)". Cursor on card 1's ⋮ |
| 02 | Card menu open | `2366-60815` | Same, with the menu open. The cursor `2366-60920` points at **Remove from shop**. It was moved out of the menu because the `Options List` clips its content |
| 03 | Confirm remove (bottom sheet) | `2366-61376` | Copy of `2230-77536`. Behind the sheet is 01 without its cursor. The sheet reads "Remove this product from your shop?". Its body holds the availability banner and product summary from `2320-45094` (size row hidden), and the original text and banner are hidden. Buttons read Cancel / **Remove This Product**, with a cursor on Remove |
| 04 | Removed toast | `2366-61082` | Snail only, "(1)", "Publish Changes", toast "Product removed from your shop" |

## 09 - Shop Preview section — `node-id=2364-57887`

| # | Screen | node-id | Notes |
|---|---|---|---|
| 01 | My Shop default | `2368-62138` | 1 pick, not a favorite (badge hidden, row set to MAX), "Favorites (0)". Stats 700 · 700 · S$845 · S$845 · S$0. Cursor on **Preview Storefront** |
| 02 | **Storefront preview (new)** | `2368-62381` | The desktop `2364-57970` restacked to 375: Status Bar + preview header ("/\/\ Your shop preview" + ✕). The creator card is detached from `Influencer Profile Card` and laid out vertically, with a 72px avatar, Follow, Copy Shop Link and a wrapping About-me strip. **Charlotte's Favorite Picks** is a horizontal scroll of 160-wide cards with 3:4 images. **Charlotte's Reviews** has the title block, then 300-wide review cards in a horizontal scroll. **All Picks** is a 2-column wrap of detached 166-wide cards, followed by pagination, the mobile footer and the HI. Price rows wrap, with texts set to WIDTH_AND_HEIGHT so "SAVE 30%" stays whole. **Clone this for any storefront or shop-preview mobile screen** |

## 10 - Stats Breakdown section — `node-id=2364-58157`

The section is 15010 wide, with each mobile frame 100px right of its desktop. The period-menu frame sits under Clicks, and **Detailed product stats** (`2364-58343`) sits under Total sales, re-spaced to 6145 wide.

| # | Screen | node-id | Notes |
|---|---|---|---|
| 01 | Favorites tab | `2372-61440` | Copy of Reorder 01 `2352-207169`, with cursors on the **TOTAL CLICKS** tile and on card 1's › |
| 02 | Total clicks | `2372-61754` | **Metric page (new)**, restacked from its desktop: Status Bar/Header/Search wrap, then "Home › Clicks" + All Time ⌄, then the big-number card, a full-width product search, and product rows (thumbnail, brand, name, variant, value + unit, ›), followed by the mobile footer. Cursor on All Time |
| 02b | Total clicks, period menu open | `2372-62140` | The period `Filter` menu (Last 7/14/30/90 Days, All Time) is right-aligned under the All Time button |
| 03 | Commission pending | `2372-62923` | Same template with its own figures |
| 04 | Total sales | `2372-62546` | 〃 |
| 05 | Commission earned | `2372-63306` | 〃 |
| 06 | Commission settled | `2372-63689` | 〃 |
| 07 | Product stats: Sales tab | `2372-64239` | **Product stats (new)**: breadcrumb "Home › Stats › product", then the product card (full width, 240-tall image), "Added to shop on …", Sales/Performance/Details pills, and the tiles |
| 08 | Product stats: Performance tab | `2372-64504` | The tile grid was converted from fixed-row GRID to a wrapping 2-up auto layout, because the grid kept a 362 height |
| 09 | Product stats: Details tab | `2372-64763` | The actions row is stacked vertically: price/commission tiles, then the share-link card (40px thumbnail, link + Copy), then "Available in Singapore & Malaysia" |

## 07 - Copy Affiliate Link section — `node-id=2344-78578`

Built 2026-09-25. Mobile frames sit 100px right of each desktop, and the section is 10530 wide. Stats: 200 · 150 · S$110 · S$310 · S$290.

| # | Screen | node-id | Desktop | Notes |
|---|---|---|---|---|
| 01 | My Shop, card menu open | `2360-57021` | `2344-78585` | Copy of `2235-36634`. The ★ Favorite badge is shown, with its row set to SPACE_BETWEEN. It reads "Favorites (1)". The menu reads View product details / Copy affiliate link / Remove from Favorites / Remove from shop. The menu's own cursor `2360-57126` points at **Copy affiliate link** |
| 02 | Link copied | `2360-57261` | `2344-78666` | Copy of 01 with the menu removed, plus a success toast reading "Link copied" |
| 03 | Product page, cursor on copy icon | `2360-57678` | `2344-78743` | Copy of `2343-38910` (Remove Featured 04) with Request Sample shown again. **New block `What creators say + review CTA`** (`2360-57967`) is the desktop's `2344-78831` restacked for 375 (details below). Performance reads TOTAL UNIT SOLD 2 · LINK CLICKS 700 · CONVERSION RATE 10% · COMMISSION SETTLED S$0, plus a full-width **View Other Stats** button (`Button=Outlined, Size=md`, `2:106`, icons hidden). A cursor sits on the affiliate link's `copy` icon |
| 04 | Product page, Link copied | `2360-58025` | `2344-78868` | Copy of 03 plus the "Link copied" toast. The cursor stays on the copy icon, as on the desktop |

**Reusable mobile blocks from this flow:**
- **What Creators Say card:** the `Editorial frame` inside `2360-57967`. It's laid out vertically with a gap of 16 and padding of 16/20: the "What Creators Say" label and MARCH 2026, then the quote (wrapping), then the author row with Elizabeth on the left and ‹ 1 / 24 › on the right (SPACE_BETWEEN). When restacking a desktop block, set `primaryAxisSizingMode = 'AUTO'`, or the card keeps the desktop's fixed 194 height and clips the quote.
- **Review CTA:** `Pdp-write-a-review-cta` in the same block. It's laid out vertically: star + title + description, then a full-width "Write A Review" button.
- **Mobile in-shop product page, complete:** 03 now has every desktop section: gallery, details, buttons, affiliate link, accordions, What Creators Say, review CTA, Performance with View Other Stats, and the footer. Clone 03 for any new product-detail screen reached from My Shop, in preference to `2343-38910`.

## 06 - Reorder Favorite section — `node-id=2344-77290`

Built 2026-09-25. Mobile frames sit 100px right of each desktop, and the section is 10434 wide. All three are copies of `2289-38912`. That frame's heading says "(4/4)" but it held **6** cards, so cards 5–6 were removed and card 4's › set to `State=Disabled` (`7:23410`). Stats are this desktop's figures: 200 · 150 · S$110 · S$310 · S$290 (Clicks, Sales, Pending, Earned, Settled).

| # | Screen | node-id | Desktop | Notes |
|---|---|---|---|---|
| 01 | Favorites tab, default | `2352-207169` | `2344-77297` | "All Picks (4) / Favorites (4)". Cards #1 Water Bank, #2 Snail, #3 Green Tea, #4 First Care. First ‹ and last › disabled |
| 02 | Reordered | `2352-207719` | `2344-77344` | Cards 1 and 2 swapped (Snail #1, Water Bank #2), with the ‹ states moved to match: card 1 disabled, card 2 enabled. "Publish Changes" is set to HUG and Preview Storefront to FILL, so the pair fits a 311-wide row |
| 04 | Reorder failed, error toast | `2352-207529` | `2344-77382` | The original order, plus the error toast `2348-55780` with its action button hidden: "Couldn't save the new order, we put it back the way it was" |

**Stepper buttons:** to change a ‹ › button's state, `swapComponent` between `7:23414` (Default) and `7:23410` (Disabled), then check that the chevron icon survived the swap.

## Remove Featured Product section — `node-id=2248-33651`

Built 2026-09-25 from the section's own desktop frames. This flow has no main-file twin. Mobile frames sit 100px right of each desktop: the later frames were shifted right to make room, and the section was widened to 12729. The UI copy uses **"Favorite"**, not the desktop's "Featured" (user's choice).

| # | Screen | node-id | Size | Desktop | Notes |
|---|---|---|---|---|---|
| 01 | Favorites tab 6/6, card menu open | `2342-38585` | 375×1678 | `2248-33652` | Copy of `2242-36731` (horizontal scroll with rank footers) plus the `Options List` from `2235-36703` on the **1st** card (the menu's own `Cursor` was deleted; a new one, `2355-57181`, points at "Remove from Favorites"), the only card fully visible. The menu reads View product details / Copy affiliate link / Remove from Favorites / Remove from shop |
| 02 | Removed, success toast | `2342-38965` | 375×1678 | `2248-33706` | Copy of 01 without the menu. The 4th card is removed and the ranks are renumbered #1–#5. It reads "Favorite products (5/6)" and "Favorites (5)", "View Shop" becomes **"Publish Changes"**, and the toast reads "Product removed from Favorites" |
| 04 | Product detail in my shop (favorited) | `2343-38910` | 375×2853 | `2248-33752` | Built from the PDP column `2320-46612` (inside `2320-46565`). The modal header is swapped for Status Bar + Header + Search wrap copied from `2242-36731`, and the breadcrumb reads "My shop › Water Bank…" (3rd level and trailing chevron hidden). A dark "★ Favorite" badge sits top-right on the image. Request sample is hidden, and the affiliate link is filled in and dark. The buttons are **Remove from Favorites** / Remove From Shop. A **Performance** block (Page header copy + stats card with the period row and 5th tile hidden) shows TOTAL UNITS SOLD 128 · COMMISSION EARNED S$568.32 · LINK CLICKS 2,410 · CONVERSION RATE 10%, followed by the **mobile footer** `2321-52957` |
| 05 | Product detail, removed, toast | `2343-39217` | 375×2853 | `2248-33875` | Copy of 04. The button reads "Add to Favorites" (no star icon: the button instance has no icon slot), the badge is hidden, and the toast reads "Product removed from Favorites" |

**Reusable from this flow:** 04 is the first mobile **in-shop product page**, with the app header, performance block and footer. Clone it for any product-detail screen reached from My Shop, rather than the catalogue's modal-style PDP.

**Stale PDP ids:** `2145-36673` and `2145-36780` (Product Detail Default / Added) are gone. Their current copies are `2320-46453` and `2320-46565` in section `2320-42706`.

## BROWSE & ADD PRODUCT section — `node-id=2153-42552` (gone, see the note above)

The current, most complete pass at this flow (higher node-ids = built later than the "Add Product" section below, and mostly supersedes it). All frames are 375px wide with full Status Bar / Header / Home Indicator chrome unless noted.

| Screen | node-id | Size | Notes |
|---|---|---|---|
| My Shop / Empty state | `2145-35899` | 375×1073 | |
| My Shop / Product added | `2145-40665` | 375×1460 | |
| Catalogue — Default (categories / brands / ingredients browse) | `2190-74648` | 375×2092 | |
| Catalogue — Search-autocomplete state | `2190-74761` | 375×2182 | Same screen as above with a query typed + dropdown result |
| Search Results — Default | **missing** | — | Only an unchromed content fragment exists (`2190-74928`, "Product detail content" — misnamed, it's actually the search-results list: breadcrumb, search bar, Filters/Sort row, product rows, pagination). No Status Bar/Header/Home Indicator wrapper. Build the full screen by wrapping this content in the standard chrome, following `SKILL.md`. |
| Search Results — No results | `2145-40151` | 375×812 | |
| Search Results — Success toast | `2145-36203` | 375×1170 | |
| Product Detail — Default | `2145-36673` | 375×1666 | |
| Product Detail — Added | `2145-36780` | 375×1666 | |
| Product Detail — Confirm popup | `2145-35002` | 375×812 | |
| Product Detail — Confirm popup / Dropdown open | `2145-35093` | 375×812 | |
| My Shop / Unpublished (Publish Shop — default, 1 pick, not yet published) | `2222-16744` | 375×1198 | Built 2026-09-23 — see below |
| **Component:** Product Card (search-results row) | `2180-71804` | 343×233 | Horizontal row: thumb + brand/title, price range + commission badge, "Available region" list, "Add To Shop" button. This is the canonical mobile product row — reuse it for any Search Results / list-style product screen instead of rebuilding a card. (Different from the 2-column grid tile used on My Shop — see below.) |

**Note on the Empty State frame (`2145-35899`):** as of 2026-09-23 it already carries a button row (Preview Storefront — disabled — and Publish Shop) plus a "Not published yet: Add products" caption, both set `visible: false` by default. These are the same nodes the Unpublished screen below turns on — if you clone this frame again, check for hidden nodes before rebuilding a button row from scratch.

## ⚠️ Add Product section (earlier pass) — `node-id=2061-43187` — DELETED

This section (and everything inside it, including the "My Shop / Default — Mobile" populated/published screen built earlier in this session, id `2133-16713`) **was deleted from the file** outside of any action taken here — confirmed gone via `get_metadata` on 2026-09-23. It is no longer available to clone or reference. The two frames once flagged here as "unique, not superseded" (`2081-72865` "Recommended product detail — mobile" and `1993-24344` "Home / Recommended Product Detail — Mobile") were lost with it and have no replacement in the BROWSE & ADD PRODUCT section — flag this if that content is needed again.

**Consequence — this is still a real gap:** the populated/published "My Shop" mobile state (with real stats row, "View Shop" button, Last Published date) does not currently exist anywhere in the file. Rebuild it if/when needed, following the same recipe as `2222-16744` below (clone the Empty State frame, swap in the populated content) rather than starting from a blank frame.

## My Shop / Unpublished — Mobile (Publish Shop flow, default state) — `node-id=2222-16744`

Built 2026-09-23, inside the BROWSE & ADD PRODUCT section. Matches the desktop "01 — publish-shop / my-shop / default" screen (`2061-42425`, 1 product added, not yet published). Built by **cloning the current Empty State — Mobile frame** (`2145-35899`) rather than from scratch:
- Turned on (`visible = true`) the hidden Preview Storefront (disabled)/Publish Shop button row and the "Not published yet" caption already present in that frame — see note above.
- Swapped the Publish Shop button's variant from `State=Disabled` to `State=Default` (component set has both; use `swapComponent`, don't restyle by hand).
- Updated tab labels to "All Picks (1)" / "Favorites (0)".
- Replaced the empty-state illustration box with a 2-column product grid: a real product card cloned from the desktop `1619-36927` "Featured product lisiting" frame **keeping its "★ Featured" badge this time** (it auto-features a creator's first pick — the populated-state card built earlier had dropped this badge, which was correct for that different, already-published state) + an Add Product dashed tile cloned from `1619-36953`.
- **Gotcha:** cloned instance-swap nodes (the featured badge, the caption text) can carry a hidden `visible: false` from their source even when they look present in a screenshot check — always check `.visible` explicitly on cloned nodes that don't render, rather than assuming a missing sub-tree.

## My Shop / Published — context menu open — `node-id=2235-36634`

Built 2026-09-24 as the mobile for desktop `2231-78762` ("02 — add-featured / my-shop / context-menu-open"). Loose on the page (not in a section), right of `2231-79376`, which is the same screen in the *unpublished* state. Built by cloning `2231-79376`, swapping its Shop Info Card for the published card from `2229-57939` (Success toast — Mobile), and adding the canonical **Application stats section** (see "Stats block" below) with the desktop's figures: 1 / 53% / 34 / S$845 / S$0. The ★ Featured badge is hidden (the product isn't featured yet) and its row is set to right-align so the ⋮ button stays in the top-right corner. **This is also the populated/published My Shop mobile state that was listed as a gap above** — clone it (and close the menu) instead of rebuilding.

## My Shop / Published — Featured tab, empty — `node-id=2238-36643`

Built 2026-09-24 as the mobile for desktop `2061-42375` (in the Add Featured Product section). Loose on the page, right of `2235-36634`. Built by cloning `2235-36634`:
- **Tabs:** Favorites is the selected tab. The two tab instances were swapped between their `Select=Yes` and `Select=No` variants, then the labels restored.
- **Toolbar:** the Add Product button is hidden and the text reads "Featured products (0/6)".
- **Product list:** replaced with the desktop's empty "Add area" (`2061-42399`): star well, "No featured products yet", "Go To All Picks". It's fixed at 400 tall, and the description wraps centred.
- **Border:** the dashed border (8/6 dash, radius 10) is copied from the desktop's parent slot frame `2061-42398`. The "Add area" clone alone has no border.
- **Stats:** 1 / 0% / 0 / S$845 / S$0.

## My Shop / Published — Favorites tab full (6/6) — `node-id=2242-36731`

Built 2026-09-24 as the mobile for desktop `2061-41657` ("05 — add-featured / my-shop / featured-tab-full"). Loose on the page, right of `2238-36643`, which it was cloned from. Choices the user confirmed:
- **Copy:** tabs read "All Picks (9)" / "Favorites (6)" and the heading reads "Favorite products (6/6)". The Favorites wording deliberately overrides the desktop's "Featured".
- **Stats:** the 5-tile block, set to 7 / 53% / 34 / S$845 / S$0.
- **Cards:** one per row, 32px gap. Each card keeps its "#n Featured" rank footer with the ← → buttons, and long names cut with "…" (`textTruncation: ENDING`, inherited from the desktop).
- **Card source:** the six cards are the desktop's "Featured product lisiting" component instances (main `400:16257`, a single component with no variants), stretched to FILL (343) with the image frame set to FILL and made square at 341×341.
- **Gotcha:** that component's ⋮ button is absolutely positioned and pinned left inside a non-auto-layout image frame. On an instance its `x`/constraints can't be overridden ("relative-transform" error), so the cards were **detached** and the ⋮ button moved to 10px from the right with a `MAX` constraint. Nested buttons and icons are still instances. Reuse these detached cards for any mobile card list that needs the rank footer.

- **Update 2026-09-24:** the Favorites list is now a **horizontal scroll** (user request). "Product list section" is HORIZONTAL, gap 12, 359 wide (it bleeds to the screen's right edge), with 16px right padding, clips content and has `overflowDirection: HORIZONTAL`. The cards are 260 wide with a 258px square image, so the next card peeks. The ‹ › rank buttons now match the layout direction. Rank labels read "#1 Favorite" through "#6 Favorite". The first card's ‹ and the last card's › are set to `State=Disabled`.

## My Shop / Published — context menu, slots full — `node-id=2260-36845`

Built 2026-09-24 as the mobile for desktop `2061-41839` ("07 — add-featured / my-shop / context-menu-slots-full"). It sits in the "Add Featured Product" section, cloned from `2235-36634` with the toast removed. All Picks (7) / Favorites (6), stats 7 / 53% / 34 / S$845 / S$0, and no Add Product slot, matching the desktop. It has seven one-per-row cards: the first six have the ★ Featured badge (with the badge row set to SPACE_BETWEEN) and the image fills copied from the desktop cards. The 7th card (Missha) carries the open ⋮ menu.

## Stats block — how stats are done on mobile

The source of truth is the main design file's mobile stats (`cehltPtMoGWEtKbF7k3MQQ`, node `794-26005`). Its exact copy in the Work File is **`2126-18146`** ("Application stats section" on "04.2 Home — Shop Completed — Mobile", formerly "06 — Shop completed — mobile"). **Clone that node** whenever a mobile screen needs shop stats, and change only the five `Total Products Value` texts.

- 343×407 card: `surface/secondary/100` fill, `border/color/muted` border, radius 10, 16px padding and gap, soft drop shadow.
- Header row: right-aligned "Showing: All time ⌄" dropdown button. There is **no "Performance" title**.
- A 2×2 grid of grey tiles (`surface/secondary/300`, radius 8, 12px padding, gap 14 horizontal and 16 vertical): TOTAL PRODUCTS, TOTAL CLICKS, TOTAL SALES, COMMISSION EARNED. Below it, one full-width COMMISSION SETTLED tile.
- Tile contents: an uppercase body-xs-medium label in `#757575` wrapping to two lines, a chevron-right on every tile, and the value in body-xxl-bold (24/36) `#222`.
- Only **five metrics**. There is no Commission Pending, and desktop's "Commission Owned" maps to **Commission Earned**.
- **Don't use** the older "Stats Card" with the "Performance" title, flat white 2-column list and six metrics (e.g. `2229-58131` in `2229-57939`). It's outdated. The smaller 246/280/292px "Application stats section" nodes on other screens are different content (catalogue/product stats), not this block.

## Other shop-adjacent mobile frames (not part of either section above)

| Screen | node-id | Size |
|---|---|---|
| Manage Account / Profile | `2004-22278` | — |
| Manage Account / Social Accounts | `2024-22599` | — |

(Manage Account, not shop — listed for completeness since they live on the same Responsiveness page.)

## Updates from the 2026-09-25 whole-page review

- **03 - Publish Shop:** 03.2 / 03.4 / 03.5 are now centred dialogs (final-design pattern `2384:78404`), not bottom sheets. 03.2's underlay is `2426:223385` (a copy of 03.1).
- **08 - Remove Product:** 08.3 `2366-61376` is now a centred 335 dialog, with the HI at frame level (y778). Stats pages 10.2–10.10 have `Page Content` top padding 24, so each is 16–40px taller.
- **Onboarding & Home:**
  - Help Center (`2126-19174`) now has the house Header + Search wrap and a footer.
  - Recent Activities (`2126-19252`) gained a Search wrap and a footer.
  - Home 02/06 gained footers.
  - The logout confirmation (`2126-20809`) is now a centred 335 dialog ("Logout dialog", `2126-20953`).
- **Sample Request & Review:**
  - Full pages now end with the mobile footer.
  - 05.2 is 812 with a scrolling form and a sticky `fixed-button-bar`.
  - 06.2 is a centred 335 dialog (Keep Request / Cancel Request as Destructive).
  - The sheet underlays (M …) predate the footers; they're clipped at 812, so nothing shows.

**2026-09-30 organize pass:** every Onboarding & Home frame was renamed to `NN.S Flow — State — Device` (ids unchanged), and the Sample Request sections now sit in the recreated parent `2617:56695`. The nested stats sub-flow is `10.8 Detailed Product Stats` (`2381:64707`).

---

<a id="mobile-screen-references-main-file-mobile-flows-md"></a>

# SOURCE: `mobile-screen/references/main-file-mobile-flows.md`

> Step 2 · Build: the main design file's mobile board and building blocks

# Main design file — shop-flow mobile screens (reference recipe)

How the mobile (375px) screens of the shop flows are built in the **main design file** `cehltPtMoGWEtKbF7k3MQQ` ("[MVP] Influencer Portal"), board **`1174:34352`** ("BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26", 25516×7820). Inspected 2026-09-25 with `get_metadata`, `get_screenshot`, `get_design_context` and `get_variable_defs`.

> **Reference only. Do not edit this file in Figma.** Per `SKILL.md`, every node you create or change goes in the Work File `FdmVPJo1j4t8s9gej1H7Yb`. Use this document, and the linked frames, to see *what* to build. Then build it in the Work File by cloning that file's own frames and components (see `existing-mobile-screens.md`). Several screens below already have Work File copies, listed in the "Work File copy" column.

Link format: `https://www.figma.com/design/cehltPtMoGWEtKbF7k3MQQ/-MVP--Influencer-Portal?node-id=<id-with-hyphen>`, for example [`1174-39096`](https://www.figma.com/design/cehltPtMoGWEtKbF7k3MQQ/-MVP--Influencer-Portal?node-id=1174-39096).

## 1. How to use this

- **You're adding a mobile screen to one of these flows** (catalogue, search, filter, sort, brand listing, product detail, add-to-shop, My Shop): find the closest screen in §3. Clone its Work File copy if one exists, otherwise its structure. Then change only what differs, using the blocks in §4.
- **You need a sub-part** (a product row, sheet, dialog, toast or pagination): go to §4 for the node-id and the exact spec.
- **Check §5 before copying anything.** Several frames here break the chrome contract in `SKILL.md`: a missing Status Bar or Home Indicator, 24px gutters, fixed heights. Don't copy those faults into the Work File.

## 2. Global mobile conventions (as observed)

### Board layout
- The board holds two sections, both named `-`:
  - **`1174:36310`** holds flow "BROWSE & ADD PRODUCT to shop" (one row, y≈249).
  - **`1174:34353`** holds the other four flows in one row, left→right: "Edge case (Search): No product found", "SEARCH FILTER", "SORT", "BRAND LISTING".
- Each flow starts with a 1920×1080 **cover** frame (`00 — … / Cover`), then desktop (1440) frames, each followed by its mobile (375) twin(s) immediately to its right.
- The subtitle on the SEARCH FILTER, SORT and BRAND LISTING covers is copy-pasted ("Performance KPIs and the Lifetime / month / week date-range filter."). Ignore it.

### Frame size
- The width is always **375**.
- Heights vary with the content: 812 (overlays, sheets, dialogs), 861, 1170, 1346, 1565, 1666, 1944, 2092–2182, 2357, 3537.
- **Overlay/state frames are fixed at 812 and clip taller content.** The confirm-popup frames clip a 1490-tall page. The No-results frame clips 1566-tall content. Don't copy this pattern. `SKILL.md` requires hug height with a minimum of 812.

### iOS chrome
- **Status Bar:** instance `Status Bar / iPhone 13 Mini` (main component set `794:24895`, default variant `794:24896`), 375×47, `Mode=Light`. It is filled `surface/secondary/300` (#f8f8f8) when it sits above the grey app header (e.g. `1174:39097`), and transparent/white above white modal pages.
- **Home Indicator:** instance `Home Indicator` (main `794:24916`), 375×34. It contains a 134×5 black bar with radius 10, 8px from the bottom.
- **Sticky bottom bars use a 28-tall Home Indicator** (e.g. `1174:35320` inside the filter bar), with the bar filled `surface/secondary/1000` #222. Its main component was not verified.
- **Many frames are missing one or both** (see §5):
  - Screens with the dark footer have no Home Indicator.
  - Frames drawn as an overlay on top of an underlying page have their Status Bar covered.

### Two page archetypes

| Archetype | Used by | Top → bottom |
|---|---|---|
| **A. App page** | My Shop (empty, product added, favorites) | Status Bar 47 → `Header` 72 (or 80) → `Search wrap` 54 (or 70) → `Content` (white, px16 pt24 pb48, inner wrapper gap 32) → `Footer/Mobile/Default` 686 |
| **B. Full-screen "modal" page** (desktop's centred modal becomes a full-screen page on mobile) | Catalogue, autocomplete, search results, no results, product detail, brand listing | Status Bar 47 → `Modal header` 71 → (Breadcrumb 54) → page sections → Home Indicator 34 |

- **App header** (`Header` instance, e.g. `1174:39098`):
  - Fill `surface/secondary/300` #f8f8f8, bottom-left/right radius `border/radius/lg` 10, padding pt16 pb8 px16 (`spacing/md`), `justify-between`.
  - Left: `Logo` 148.75×16. The screenshot shows a hamburger drawn before the wordmark. Not verified whether that's part of the logo vector or a separate layer.
  - Right, `User Actions`:
    - Bell in a 48×48 button (radius `Radii/radius-iconButton` 6) with a 5px `surface/other/alert` #ee4442 dot at left 28 / top 9.
    - Country chip: 20px flag, "EN" in body-md-medium, px8, h48.
    - 36px round avatar in a 48 button.
  - Height is **72** on `1174:39096`/`38535`/`38644` and **80** on `1174:38840` and on the underlying pages.
- **Search wrap** (e.g. `1174:39099`):
  - Fill #f8f8f8, bottom radius 10, px16, pb16, pt0 (54 tall). The underlying pages use p16 all round (70 tall).
  - Contains a `Search/Default` 343×38.
- **Modal header** (e.g. `1174:37581`):
  - White, border-bottom `border/color/default`, p16, `justify-between`, 71 tall.
  - Title "Browse and find products to add" in `Body/body-lg-medium` (18/27) #222.
  - Close: a 38×38 box (p24, gap `spacing/md 2`) holding a 24px `x` icon, no border.
  - **Variant:** the confirm-popup frames use an 86-tall header with a 30×16 logo glyph before a two-line title, at 24px gutters (`1174:36678`).
- **Breadcrumb** (instance, e.g. `1174:37587`):
  - p16, gap4, `Body/body-sm-regular`.
  - Ancestors are #222; the current page is `typography/color/secondary/700` #757575. Separator: 16px chevron.
  - On the product detail page the last crumb is `flex-1` and truncates.

### Gutter and spacing
- **Content gutter is 16** (`spacing/md`) on every Archetype A/B page, **except** the confirm-popup underlay pages (`1174:36676`, `1174:36768`), which use **24**.
- Cards inside that gutter are 343 wide.
- **Section rhythm:**
  - Catalogue sections use py24 (`Offer`, `Brands`, `Ingredients`) or p16 (`Categories`), with gap16 inside.
  - The My Shop wrapper uses gap32; page header to card is gap16.
  - Search-results lists use gap16 between cards.
  - The PDP content column uses gap24.
- **Exceptions:**
  - Filter chips row: px12.
  - Brand grid: gap12, where the catalogue brand grid uses gap16.
  - No-results empty state: px32.

### Typography
All text is Figtree (`typography/font-family/secondary`), from the remote library styles. There's no mobile-specific scale; mobile uses the same styles as desktop.

| Style | Size/LH | Seen as |
|---|---|---|
| `Body/body-xxs-regular` / `-medium` | 10/16 | Shop URL label, brand line in the confirm dialog |
| `Body/body-xs-regular` / `-medium` / `-bold` | 12/19 | brand line on product cards, badges, "Available region", slider value (bold) |
| `Body/body-sm-regular` / `-medium` | 14/22 | breadcrumb, search text, card titles, list rows, buttons |
| `Body/body-md-regular` / `-medium` / `-bold` | 16/22 | subtitles, prices, footer links, sort-dropdown label, results count (bold) |
| `Heading/body-sm-medium(ST)` | 16/22, +10% (1.6px) tracking, uppercase | section headers ("FEATURED CATEGORIES", "BRANDS"), "FILTERS" pill, "FILTER" header, footer group titles |
| `Body/body-lg-medium` | 18/27 | modal header title, "Sort By" sheet title |
| `Body/body-xl-regular` / `-medium` / `-bold` | 20/30 | "MY SHOP", "Your Picks", PDP title and price, empty-state titles, dialog title (bold) |
| `Body/body-xxl-medium` / `-bold` | 24/36 | offer headline "GET 15% EXTRA", stat values |

### Colour tokens (from `get_variable_defs`)

| Token | Value | Use |
|---|---|---|
| `surface/primary/500` | #403e3c | primary buttons, active page number, selected checkbox/radio, active search border |
| `surface/primary/800` | #2c2927 | mobile footer background |
| `surface/secondary/100` | #fffefd | page/sheet/card surface |
| `surface/secondary/200` | #fdfdfd | filter category rail, product-card info area |
| `surface/secondary/300` | #f8f8f8 | app header, search wrap, Shop Info Card, commission badge, selected dropdown row |
| `surface/secondary/400` | #e5e5e5 | slider track, toggle off-track |
| `surface/secondary/900` | #464646 | "Favorite" badge on cards |
| `surface/secondary/1000` | #222222 | — |
| `surface/secondary/modal` | #00000080 | backdrop, selected tab underline |
| `surface/tertiary/100` | #f2efed | availability banner, favorite rank footer, footer social circles |
| `surface/tertiary/300` | #f8f7f6 | PDP purchase-options card |
| `surface/tertiary/500` | #efece9 | filter chips, empty-state icon well, commission badge in the dialog |
| `surface/other/alert` | #ee4442 | notification dot, "Remove From Shop" |
| `typography/color/secondary/1000` | #222222 | primary text |
| `typography/color/secondary/900` | #464646 | size selector text |
| `typography/color/secondary/800` | #6c6c6c | category labels, "Purchase options" label |
| `typography/color/secondary/700` | #757575 | secondary text, placeholders |
| `typography/color/secondary/600` | #b1b1b1 | brand line on cards, strikethrough price, disabled URL |
| `typography/color/secondary/100` / `200` | #fffefd / #fdfdfd | text on dark (buttons, footer) |
| `typography/color/tertiary/800` | #777674 | PDP stat labels |
| `typography/color/primary/1000` | #1f1c1a | "Your Picks" heading |
| `typography/color/other/success` | #28802c | "Save 12%" text (on rgba(152,237,156,0.3), raw) |
| `border/color/default` | #e5e5e5 | all hairlines, inputs, outlined buttons |
| `border/color/outlined` | #b1b1b1 | radio ring, selected thumbnail |
| `border/color/muted` | #f8f8f8 | stats card border |
| `icon/color/primary` / `secondary` / `disabled` | #403e3c / #757575 / #d5d5d5 | icons |

**Raw, non-token values found:**
- #e6e6e6 on the product row card border.
- #d5d5d5 on the Filters pill border.
- #09090b on dropdown row text.
- #f8f8f8 hard-coded on several cards.
- Inter 11px on two filter chips.

### Spacing, radius and shadow tokens
- **Spacing:**
  - `spacing/none` 0, `spacing/two` 2, `spacing/xs` 4, `spacing/sm` 8, `spacing/ten` 10, `spacing/md-sm` 12, `spacing/fourteen` 14, `spacing/md` 16, `spacing/md 2` 20, `spacing/lg` 24, `spacing/xxl` 32.
  - Also `gap/horizontal/element/compact` 4 and `Size/size-button-xl` 48.
- **Radius:** `border/radius/none` 0, `/xs` 4 (checkbox, chips), `/sm` 6 (inputs, sort dropdown, thumbnails, product grid card), `/md` 8 (buttons, dropdown list, URL field), `/lg` 10 (cards, image, sheet top, header bottom), `/infinite` 9999 (avatars, round icon buttons).
- **Raw radii:** 12 (dialog, offer card, toggle plate, size pill), 16 (dialog thumbnail), 24 (badges).
- **Shadows:**
  - `Shadows/sm`: 0 1 2 #1018280D, on the search suggestions list and radios.
  - Sticky filter bar: 0 2 8 rgba(99,99,99,0.2).
  - Dropdown list: drop-shadow 0 4 2 rgba(0,0,0,0.05).
  - The sort sheet has no shadow (the backdrop does the job).

### Buttons (library `Button` instances)
All button internals are bound to tokens.
- **Primary:**
  - Fill `surface/primary/500`, radius `border/radius/md` 8, text body-sm-medium `secondary/100`, capitalized.
  - Sizes: px16 py8 (38 tall, e.g. "Add To Shop" with a 16px plus icon, which hugs its label), px16 py12 (46 tall: full-width "Browse & Add Product", "Add Product To My Shop", "Apply Filters"), and an explicit `h-46` "Confirm".
- **Outlined:** border `border/color/default`, radius 8, px16 py12, #222 text (e.g. "+ Add Product", "Preview Storefront").
- **Soft:** fill `surface/secondary/300`, radius 10, px16 py8, full width ("Request Sample").
- **Danger outline:** "Remove From Shop", red border and text (see `1174:38211`). Exact tokens not verified.
- **Icon buttons:**
  - Close: bordered 40 (p12, radius 8 in the dialog; radius 6 in the sort sheet).
  - ⋮ on cards: white, radius 6, p4, 16 icon.
  - Round 24 prev/next on the PDP thumbnail row (border default, radius infinite).
  - Pagination: 38 squares.

### Inputs
- **`Search/Default`:** border `border/color/default`, radius 6, px12 py8, gap8, 16 search icon, body-sm-regular #757575 placeholder ("Search brands and products", "Find brands"). It's 38 tall; 40 when active.
- **Active / filled search:** border `surface/primary/500`, h40, text #222, 16px clear `x` button (p4, radius 6) at the right.
- **Filter mini search:** border default, radius 6, p8, #b1b1b1 placeholder, no icon (`1174:35290`).

### Footer (Archetype A only)
- `Footer/Mobile/Default` (`1174:39136`), 375×686.
- Fill `surface/primary/800`, px16 py32, gap32.
- Four link groups, gap14 each: title in Heading ST #fffefd; links in body-md-regular #fdfdfd with gap4. Groups: URMEI (About Us), COLLABORATE (Top Brands), SUPPORT (FAQs, Contact Us), LEGAL (Terms of Service, Privacy Policy, Cookies).
- Below the groups:
  - A 343×50 `Logo Vectors` watermark.
  - Three 48px social circles (`surface/tertiary/100`, p16, 16 icon, gap12).
  - "© 2025 URMEI ®".
- **No Home Indicator** follows the footer on any of these frames.

### How overlays are drawn on mobile
| Overlay | How | Example |
|---|---|---|
| Full-screen modal page (catalogue/search/PDP) | Either a standalone frame (Status Bar + Modal header + … + HI), or an **overlay container stacked on top of a sibling "underlay" page** (`Home empty state — Mobile` or `My Shop / Empty State — Mobile`) at y=0. The underlay is not hidden, just covered. | standalone `1174:37981`; stacked `1174:38099` |
| Bottom sheet | A 375×812 wrapper filled rgba(0,0,0,0.5) with flex-col `justify-end`, over the page, holding the sheet (top radius 10, pb32) | Sort `1174:35918` / `1174:35919` |
| Centred dialog | A `Backdrop` rounded-rect covering the whole page, plus the dialog: 335 wide (20px side margins), radius 12, at y=220 | `1174:36734` + `1174:36735` |
| Dropdown menu | An absolutely placed `Options List` over the dialog (260×114) | `1174:36860` |
| Toast | A `Tost` instance 375×118 placed at the frame's y=0 (it paints over the modal header area). Inner toast 343×46 | `1174:37980` |
| Full-screen filter | Its own full page: Status Bar + `Header Desktop` (back chevron + "FILTER") + two-pane body + sticky bottom bar | `1174:35274` |

### How desktop collapses to mobile
- **Desktop modal (header + centred content):** becomes a full-screen page with the same modal header text; the desktop's `/\/\` logo glyph is dropped, except on the confirm-popup underlay.
- **Desktop filter sidebar** (accordion groups with chips, left of the results): becomes a **"FILTERS" pill** next to the sort dropdown. Tapping the pill opens a **full-screen two-pane filter page**: a 120px category rail on the left, options on the right, and a sticky results/Apply bar. Applied filters show as a **horizontal chip row** under the pill row, and the pill shows a count badge.
- **Desktop "Sort By" dropdown popover:** becomes a **bottom sheet** with radio rows.
- **Desktop horizontal product rows** (image, name, price, region, button in one line): become **stacked row cards**. Top row: thumbnail + brand/name. Middle: two columns, price + commission badge on the left, "Available region" on the right. Bottom: the button.
- **Desktop 2-column PDP** (gallery beside details): becomes a single column. Order: gallery, thumbnail strip with round prev/next, overview, purchase options, commission card, CTA, accordions.
- **Grids** (6-col categories, 4–5-col brands, 4-col ingredients): become a 3-col category wrap, a 2-col brand grid and a 2-col ingredient grid.
- **Desktop My Shop:**
  - The 4-col product grid becomes one card per row (full width) on All Picks.
  - Favorites becomes a **horizontal scroll** of 260-wide cards.
  - The 5-tile stats strip becomes the 343×407 stats card (2×2 tiles plus one full-width tile).
- **Desktop 4-col footer:** becomes a stacked single column with a watermark logo.

## 3. Flows — every screen and its twin

`D` = desktop 1440 frame, `M` = mobile 375 frame. Sizes are width×height. "Work File copy" comes from `existing-mobile-screens.md`, matched by name and size; "≈" means the same screen with a different height.

### 3.1 BROWSE & ADD PRODUCT to shop — section `1174:36310`, cover `1174:38484`

| Mobile name (as in file) | M node | M size | Desktop twin | D node | State / notes | Work File copy |
|---|---|---|---|---|---|---|
| 01 — Add product / My shop / Empty state — Mobile | `1174:39096` | 375×1565 | 01 — Add product / My shop / Empty state | `1174:37179` | Archetype A, empty shop, dashed empty card, footer | ≈ `2145-35899` (375×1073) |
| Browse Products / Catalogue Default — Mobile | `1174:37981` | 375×2092 | 02 — Add product / Catalogue / Default | `1174:37232` | Archetype B, standalone, has Status Bar + HI | `2190-74648` |
| Browse Products / Catalogue Default - Mobile *(misnamed: it's the autocomplete state)* | `1174:38037` | 375×2182 | 03 — Add product / Catalogue / Search autocomplete | `1174:37335` | Search Wrap grows to 160 with a suggestions list | `2190-74761` |
| Product detail content *(misnamed: it's Search results / Default)* | `1174:37579` | 375×1346 | 04 — Add product / Search results / Default | `1174:37466` | Standalone results page: 4 row cards + pagination | content fragment `2190-74928` |
| 05 — Add product / Product detail / Default — Mobile | `1174:38099` | 375×1666 | 05 — Add product / Product detail / Default | `1174:37044` | Stacked over My Shop underlay; no visible Status Bar | `2145-36673` |
| 06 — Add product / Product detail / Confirm popup — Mobile | `1174:36676` | 375×812 | 06 — … / Confirm popup | `1174:36873` | Dialog over a 24px-gutter PDP; fixed 812, clips 1490 of content | `2145-35002` |
| 07 — … / Confirm popup / Dropdown open — Mobile | `1174:36768` | 375×812 | 07 — … / Confirm popup / Dropdown open | `1174:36492` | Same + `Options List` open; includes a hand-cursor graphic | `2145-35093` |
| 08 — Add product / Search results / Success toast — Mobile | `1174:37721` | 375×1170 | 08 — … / Search results / Success toast | `1174:36378` | Results (3 cards) + toast "Product added to your shop"; stacked over Home underlay | `2145-36203` |
| 09 — Add product / Product detail / Added — Mobile | `1174:38211` | 375×1666 | 09 — … / Product detail / Added | `1174:38333` | PDP: CTA replaced by Remove From Featured / Remove From Shop + affiliate-link field; toast | `2145-36780` |
| 10 — Add product / My shop / Product added — Mobile | `1174:38535` | 375×1944 | 10 — Add product / My shop / Product added | `1174:36311` | Unpublished shop, "All Picks (9) / Favorites (4)", **one** card shown | ≈ `2145-40665` (375×1460) |
| 10 — Add product / My shop / Product added — Mobile *(2nd version)* | `1174:38644` | 375×3537 | *(same desktop)* | `1174:36311` | Same state, **four** stacked cards (the full list) | — |
| 05 — Add featured / My shop / Favorites tab full — Mobile | `1174:38840` | 375×2357 | 02 — remove-favorite / favorites-tab / success-toast *(nearest D; states differ)* | `1174:38490` | Published shop, stats card, Favorites (4/4) horizontal scroll. Desktop shows 3/4 + a toast, so this is not an exact twin | ≈ `2242-36731` |

**Recipe:**
- **My Shop (A):**
  - Status Bar (filled #f8f8f8) → Header 72 → Search wrap 54 → Content.
  - `Shop content wrapper` gap32:
    - `Page header` (gap16): "MY SHOP" body-xl-medium plus a subtitle, then the Shop Info Card.
    - `Shop info and tabs`: Tab Bar → toolbar → list.
  - → Footer.
  - **What changes by state:**
    - Empty: a dashed empty-state card (`1174:39128`) replaces the list, and the tabs have no counts.
    - Product added: the Shop Info Card gains a "Preview Storefront | Publish Shop" row. Tabs read "All Picks (9) / Favorites (4)". The toolbar reads "Your Picks / Everything you add appears here" + "+ Add Product". Cards are full-width product grid cards (§4).
    - Published/Favorites full: the card shows the URL, "View Shop" and "Last Published on …". A stats card (`1174:38868`) is inserted. Favorites is selected and the list scrolls horizontally.
- **Catalogue (B):**
  - Status Bar → Modal header → Search Wrap (p16) → Categories (3×2 wrap) → Offer card → Brands (2-col, "View All >") → Ingredients (2-col) → HI.
  - The autocomplete state only swaps the Search Wrap for the active input + suggestions (§4).
- **Search results (B):**
  - Status Bar → Modal header → Breadcrumb "Catalogue > Search".
  - → `Search and filters section` (px16, gap16): the active search field (40), then the pill row (Filters pill 121 + sort dropdown, flex-1, gap16).
  - → `Product cards list` (p16, gap16) → `Pagination Wrap` (p16) → HI.
  - The toast state adds `Tost` at y=0.
- **Product detail (B):**
  - Modal header → Breadcrumb (3 levels, last truncates) → `Image Wrap` (px16 pb24 gap12) → `Content` (px16 pb40 gap24): Overview, then Purchase Options, then Commission/Regions card with Request Sample, then the full-width CTA, then 4 accordions → HI.
  - **Added state:** the CTA row becomes two half-width outlined buttons ("Remove From Featured", red "Remove From Shop"). Below them sits a "Product affiliate link" field with a placeholder "Publish shop to get your product URL". The toast is on top.
- **Confirm popup:** backdrop over the PDP, then `Confirm Add Dialog` (§4). The dropdown-open state adds `Options List` anchored under the size pill at (52,490).

### 3.2 EDGE CASE (SEARCH): NO PRODUCT FOUND — in section `1174:34353`, cover `1174:34529`

| Mobile name | M node | M size | Desktop twin | D node | State / notes | Work File copy |
|---|---|---|---|---|---|---|
| 11 — Add product / Search results / No results — Mobile | `1174:34354` | 375×812 | 11 — Add product / Search results / No results | `1174:34535` | Results page with the list replaced by an empty state. Stacked over a Home underlay (1566 tall, clipped); no visible Status Bar | `2145-40151` |

**Recipe:**
- Modal header → Breadcrumb → Search and filters section (117) → `Product Cards List` → HI at the bottom.
- `Product Cards List` (`1174:34519`): px32, gap12, centred, 536 tall, holding the empty state (§4).
- The Filters pill and sort dropdown stay visible.

### 3.3 SEARCH FILTER — in section `1174:34353`, cover `1174:34640`

| Mobile name | M node | M size | Desktop twin | D node | State / notes |
|---|---|---|---|---|---|
| search-results-filter-expanded-mobile | `1174:35274` | 375×812 | 04 — Add product / Search results / Default *(filters collapsed)* | `1174:35920` | Filter page, **Brand** tab: mini search + 8 checkboxes (3 checked) |
| Filter | `1174:35414` | 375×812 | *(same)* | `1174:35920` | **Commission** tab: "0 - 30%" range slider card + 4 bucket checkboxes |
| Filter | `1174:35321` | 375×812 | *(same)* | `1174:35920` | **Customer Rating** tab: "4 ★ Stars & above" … "1 ★ stars & above" (4 checked) |
| Filter | `1174:35512` | 375×812 | *(same)* | `1174:35920` | **Category** tab: Serum / Suncare / Eye cream / Cleanser |
| Filter | `1174:35585` | 375×812 | *(same)* | `1174:35920` | **Ingredients** tab: Retinol / Glycolic Acid / Vitamin C / Niacinamide |
| 08 — Add product / Search results / Success toast — Mobile *(misnamed: it's "filters applied")* | `1174:36033` | 375×1170 | 04 — add-product / search-results / default *(filters applied, chips in sidebar)* | `1174:34652` | Results with the "FILTERS ⑥" badge pill and a `Filter Chips Row`. A `Tost` instance exists but renders nothing in the screenshot (why not verified) |

**Recipe (filter page):**
- Status Bar 47 → `Header Desktop` 72 → `Filter Body`.
  - `Header Desktop`: border-bottom default, p16, `chevron-left` 16 + "FILTER" in Heading ST, gap `spacing/ten`.
  - `Filter Body`: horizontal, fills to 693.
- **Left rail:** 120 wide, `surface/secondary/200`, border-right default. Items p12, body-sm-regular #757575. Selected item: `surface/secondary/100` fill, **2px left border** `surface/primary/500`, body-sm-medium #403e3c. Order: Brand, Commission, Customer Rating, Category, Ingredients.
- **Right panel:** p16, gap16. Checkbox rows gap12 (16px checkbox radius 4 + body-sm-medium). The Commission tab uses 40-tall rows plus the slider card (§4).
- **Bottom:** `Bottom nav` pinned at y=718, 375×94: `fixed-button-bar` 66 + Home Indicator 28.
- **Only the rail selection and the right panel change between the 5 frames.** `1174:35274` has semantic layer names. The other four were rebuilt with generic `Frame 20077357xx` names and a 124/251 split instead of 120/255, so clone `1174:35274`.
- **Filters-applied results:**
  - Same as Search results, but the Filters pill's chevron becomes a 16px count `Badge` (`1174:36196`).
  - A 62-tall `Filter Chips Row` (`1174:36198`) is inserted between the pill row and the cards.

### 3.4 SORT — in section `1174:34353`, cover `1174:34646`

| Mobile name | M node | M size | Desktop twin | D node | State / notes |
|---|---|---|---|---|---|
| Frame 2007737775 *(unnamed)* | `1174:35658` | 375×812 | 04 — add-product / search-results / default *(sort dropdown open)* | `1174:34765` | Search-results page (nested `1174:35659`, 1170 tall) + a `ss` scrim (`1174:35918`) + `sort-bottom-drawer` (`1174:35919`) at y=474 |

**Recipe:**
- Place the results page, then a full-frame 50% black scrim, then the sheet pinned to the bottom (§4).
- The sheet has no Home Indicator, and the page underneath has its Status Bar covered by its own overlay stacking.

### 3.5 BRAND LISTING — in section `1174:34353`, cover `1174:35093`

| Mobile name | M node | M size | Desktop twin | D node | State / notes |
|---|---|---|---|---|---|
| 02 — Add product / Catalogue / Default — Mobile | `1174:34991` | 375×2164 | 02 — add-product / catalogue / default | `1174:34879` | Catalogue again, stacked over a My Shop underlay (no Status Bar, no search-wrap padding change). Header reads **"BESTSELLING CATEGORIES"** (3.1 says "FEATURED CATEGORIES") |
| Brand — Mobile | `1174:35198` | 375×861 | Brand - Desktop | `1174:35099` | Brand listing ("View All" target). Stacked over the My Shop underlay; the 1560-tall grid is clipped at 861 |

**Recipe (Brand listing):**
- Modal header → Breadcrumb "Home > Brands" → wrapper (px16, gap24) → HI.
- The wrapper holds:
  - A header block: border-bottom default, pb24, gap16, containing "BRANDS" in Heading ST and a `Search` "Find brands" field (343).
  - `Brand grid` (`1174:35251`): CSS grid with 2 columns, gap 12/12, 20 `Brand card`s at 124 tall, radius `border/radius/lg`, logo image fill.

## 4. Reusable building blocks

Main-file node-ids are given for inspection. When a Work File equivalent is listed, clone that instead.

| Block | Node (main file) | Size | What's inside / exact spec |
|---|---|---|---|
| **Status Bar** | `1174:39097` (instance of `794:24895`) | 375×47 | iPhone 13 Mini, Light. Work File: `1802-19413` |
| **Home Indicator** | `1174:37720` (instance of `794:24916`) | 375×34 | Work File: `1802-19438`. The 28-tall variant is in the filter bar (`1174:35320`) |
| **App Header** | `1174:39098` | 375×72 | See §2. Instance named `Header` |
| **App Search wrap** | `1174:39099` | 375×54 | #f8f8f8, px16 pb16, bottom radius 10, `Search/Default` 343×38 |
| **Modal header** | `1174:37581` | 375×71 | Title body-lg-medium + 24px close; border-bottom |
| **Breadcrumb** | `1174:37587` | 375×54 | Instance; p16 gap4 |
| **Search field — default** | `1174:37990` | 343×38 | Border default, radius 6, px12 py8 |
| **Search field — active + clear** | `1174:37589` | 343×40 | Border `surface/primary/500`, clear `x` button |
| **Search suggestions** | `1174:38051` | 343×80 | Border default, radius 6, `Shadows/sm`. Row: `surface/secondary/300`, p16, gap8, search icon 16 + body-sm-medium text + 48×48 thumbnail (radius 4) |
| **Filters pill** | `1174:37597` | 121×44 | White, border #d5d5d5 (raw), radius 8, px14 py10, "FILTERS" Heading ST + 16 chevron. Applied variant: `1174:36194`, with a 16px `Badge` |
| **Sort dropdown (trigger)** | `1174:37600` | 206×44 (fills) | Instance `sort-dropdown`: border default, radius 6, px16 py10, "Sort By: Relevance" body-md-medium + chevron-down |
| **Filter chips row** | `1174:36198` | 375×62 | px12 py12, gap8, horizontal overflow. Chip: `surface/tertiary/500`, radius 4, px10 py8, body-sm-regular + 14px ×. The last two chips use Inter 11 (fix before reuse) |
| **Product row card** (search results) | `1174:37602` | 343×219 (233 if regions wrap) | White, border #e6e6e6, radius 10, p16, gap12. Top row: 72 thumbnail (radius 8) + brand body-xs-medium #b1b1b1 / name body-sm-medium (43 tall, ellipsis). Info row: two flex-1 columns — price body-md-medium + commission badge (`surface/secondary/300`, radius 24, px8 py4, "10% - 12% Commission" 12px), and "Available region" body-xs-regular #757575 + regions body-sm-medium. Bottom: primary button px16 py8 "+ Add To Shop" (hugs). **Work File: `2180-71804`** |
| **Pagination** | `1174:37706` | 375×70 | p16, centred, gap8: prev/next 38 icon buttons + 38×38 pages radius 8. Active: #403e3c fill, #fffefd text. Inactive: #fffefd fill, #e5e5e5 border. Figtree Medium 14, line-height 1.4 |
| **Empty state (no results)** | `1174:34522` | 311×~190 | p16, gap14, centred: 64 circle `surface/tertiary/500` with a 32 search icon; title body-xl-medium; body body-md-regular #757575, centred |
| **Empty state (shop)** | `1174:39128` | 343×~290 | Dashed border default, radius 10, p33, gap26: 64 icon, "Your shop is empty" body-xl-medium, body-md-regular description, full-width primary "Browse & Add Product" (py12) |
| **Filter page** | `1174:35274` | 375×812 | Header Desktop + 120px rail + options panel + sticky bar (see §3.3). Clone this one (semantic names) |
| **Filter sticky bar** | `1174:35317` | 375×94 | Bar `1174:35319`: `surface/secondary/100`, top radius 6, pt10 pb8 px16, gap8, shadow 0 2 8 rgba(99,99,99,.2). Left (flex-1, px12): "9" body-md-bold + "results" body-md-regular over "4 filters selected" body-sm-medium #757575. Right (flex-1): primary "Apply Filters" py12. Then a 28 HI |
| **Commission range slider** | `1174:35466` (in `1174:35428`) | 219×~88 | Card `surface/secondary/300`, radius 6, px16 py12: "0 - 30%" body-xs-bold + 38-tall multislider (4px track `surface/secondary/400`, two handles). Followed by 40-tall checkbox rows "Under 5%", "10% – 20%", "20% – 30%", "Above 30%" |
| **Sort bottom sheet** | `1174:35919` (scrim `1174:35918`) | 375×338 | Scrim rgba(0,0,0,.5). Sheet `surface/secondary/100`, top radius 10, pb32. Head: pt24 pb12 px16 gap16, "Sort By" body-lg-medium + bordered close (radius 6, p12). Rows: h46, px16 py12, body-sm-regular + 16 radio (ring `border/color/outlined`, selected = 8px `surface/primary/500` dot). Options: Relevance, Commission (low to high), Commission (high to low), Latest Arrivals, Top Performing |
| **Confirm Add dialog** | `1174:36735` (+ `Backdrop` `1174:36734`) | 335×478 | `#fffefd`, radius 12. Header: pl20 pr16 py16, border-bottom, title body-xl-bold (240 wide) + 40 bordered close. Body p16 gap16, three parts. **(1)** Availability banner: `surface/tertiary/100`, top radius 8, px10 py8, "Available only in **Singapore & Malaysia**" 12px. Summary card below it: #f8f8f8, bottom radius 10, p16 gap12 — 64 thumbnail (radius 16, border), brand 10px + name body-sm-medium, size pill (border, radius 12, pl10 pr6 py2, 12px + chevron), then price S$45 + struck-through S$87 + "12% Commission" badge (`surface/tertiary/500`). **(2)** `toggle-plate`: #f8f8f8, radius 12, p12, "Add this to your Favourite Picks" + "0/4 products added", 36.7×20 toggle. **(3)** "Confirm" primary, full width, h46 |
| **Dropdown options list** | `1174:36860` | 260×114 | Border default, radius 8, drop-shadow 0 4 2 rgba(0,0,0,.05). 38-tall rows (px16 py8, body-sm-medium, #09090b); selected row `surface/secondary/300`. Its `Cursor` child `1174:36864` stays if the target screen's desktop shows a cursor (see SKILL.md) |
| **Toast** | `1174:37980` (`Tost` instance) | 375×118 (toast 343×46) | Wrapper px16 py8, justify-end. Toast: `surface/primary/500`, radius 8, p12, `check-circle-2` 22 + body-sm-medium #fffefd ("Product added to your shop") |
| **Category tile** | `1174:37994` | 100×101 | 100×75 image, radius 6 + label body-sm-medium #6c6c6c, centred, uppercase, gap4. Grid: wrap, gap16, centred, 3 per row |
| **Offer card** | `1174:38001` | 343×444 | #f8f8f8, radius 12, p20, gap16: 327×220 image, 82×24 brand logo, "GET 15% EXTRA" body-xxl-medium #4f4e4d, 12px description, primary "View Products" (hugs) |
| **Section header** | `1174:37992` / `1174:38010` | 343×22 | Heading ST, centred (Categories, Ingredients) or left with a "View All >" button (Brands) |
| **Brand tile grid** (catalogue) | `1174:38011` | 343×397 | 3 rows × 2, gap16. Tiles aspect 148:113.6 (≈163×126), radius 10, logo image fill |
| **Brand grid** (brand listing) | `1174:35251` | 343×~1356 | CSS grid, 2 columns, gap12, tiles h124, radius 10 |
| **Ingredient card** | `1174:38024` | 156×253 | Image aspect 85:122, radius 5.087 + label body-sm-regular, centred. 2-col wrap, gap16 |
| **PDP image gallery** | `1174:38154` | 375×426 | px16 pb24 gap12: main image full width (aspect ≈1:1, radius 10). Thumbnail row: 24 round prev/next + 46×46 thumbnails (radius 6, gap8; the selected one has a `border/color/outlined` border) |
| **PDP content column** | `1174:38167` | 375×1058 | See §3.1. Accordion row `1174:38206`: border-bottom, px16 py24, 24 icon + body-md-medium + 24 chevron |
| **Shop Info Card** | `1174:39107` (empty) / `1174:38851` (published) | 343×164 / 343×267 | #f8f8f8, radius 10, p16, gap20. 64 avatar + name body-xl-bold + @handle. URL field: `surface/secondary/100`, border default, radius 8, px12 py6, 10px label + body-sm-medium value + copy icon. The published version adds a button row + "Last Published on …" |
| **Tab bar** | `1174:38564` | 343×42 | Border-bottom default, gap24. Tab py10. Selected: medium, #403e3c, 1px underline `surface/secondary/modal`. Unselected: regular #757575 |
| **Product grid card** (All Picks) | `1174:38578` | 343×~463 | Border default, radius 6. Square image with a p16 overlay row: "Favorite" pill (`surface/secondary/900`, px8 py4, 12px white) + ⋮ button. Info area `surface/secondary/200`, pt14 px10: brand 12 #b1b1b1, name body-md-medium (ellipsis), variant 12 #757575, price + "12% COMMISSION" badge, divider, "Singapore • Malaysia" 12px |
| **Favorite card with rank footer** | `1174:38913` | 260×450 | Same as the grid card, with ⋮ absolute at right 10 / top 12, plus a footer (`surface/tertiary/100`, px10 py6): "#1 Favorite" 12px + ‹ › 24 buttons (disabled ‹ = `surface/secondary/300`, no border). List `1174:38912`: horizontal, gap12, 359 wide (bleeds right). Work File has detached copies (`2242-36731`) |
| **Stats card** | `1174:38868` | 343×407 | Same block as `794:26005` (Work File copy **`2126-18146`**, documented in `existing-mobile-screens.md`) |
| **Mobile footer** | `1174:39136` | 375×686 | See §2 |

## 5. Gaps and inconsistencies

- **No Home Indicator** on any footer screen: `1174:39096`, `1174:38535`, `1174:38644`, `1174:38840`. Add one below the footer when building in the Work File.
- **Status Bar covered or missing.** These frames stack the modal page over an underlay starting at y=0, so the visible screen has no status bar:
  - `1174:38099`, `1174:38211`, `1174:37721`, `1174:36033`, `1174:34354`, `1174:34991`, `1174:35198`, and the sort frame `1174:35658`.
  - Build these as standalone frames (Status Bar → Modal header …), like `1174:37981` / `1174:37579`, not as stacked overlays.
- **Fixed 812 frames clip content**: `1174:34354` (1566 inside), `1174:36676` / `1174:36768` (1490), `1174:35198` (1560-tall grid shown to 861), `1174:35658`.
- **24px gutter + 86px logo header** on the confirm-popup underlay (`1174:36678`, `1174:36688`, `1174:36694`). Every other screen uses 16 and 71.
- **Header/search-wrap heights vary:** Header 72 vs 80, Search wrap 54 vs 70.
- **Misnamed frames:**
  - `1174:37579` "Product detail content" is Search results / Default.
  - `1174:38037` "Catalogue Default" is the Autocomplete state.
  - `1174:36033` "Success toast" is Filters applied.
  - `1174:35658` "Frame 2007737775" is Sort.
  - Four filter frames are just named "Filter".
  - Both section containers are named `-`.
- **Duplicate/variant screens:**
  - Two "10 — Product added — Mobile" frames (`1174:38535` shows 1 card, `1174:38644` shows 4).
  - Catalogue exists twice with different section headers ("FEATURED" in `1174:37981` vs "BESTSELLING" in `1174:34991`).
- **Twins that don't match:**
  - `1174:38840` (Favorites 4/4, no toast) sits beside desktop `1174:38490` (remove-favorite, 3/4 + toast). There's no mobile for the remove-favorite toast state.
  - The filter frames all pair with the collapsed-filter desktop `1174:35920`. The desktop has no "filter page" equivalent.
- **Desktop states without a mobile twin:** none beyond the mismatch above. All 17 desktop frames have at least one mobile beside them.
- **Filter vocabulary drift:** the desktop applied-filters frame (`1174:34652`) still has Price / Discount / Shipping Options groups. The mobile chips copy "Show only discounted" and "Free Shipping", which don't exist in the mobile rail (Brand, Commission, Customer Rating, Category, Ingredients). Those two chips are also Inter 11px, not Figtree.
- **Raw values instead of tokens:** card border #e6e6e6, pill border #d5d5d5, dropdown text #09090b, radii 12/16/24, the "Save 12%" pill fill rgba(152,237,156,0.3).
- **Leftover artifacts:**
  - A hand `Cursor` graphic inside `1174:36860`. This is intentional, not leftover: mobile screens mirror the desktop's cursor (user's rule, 2026-09-25).
  - A stray loose `Button` instance `1174:38534` (92×22) inside section `1174:36310`.
  - Hidden `Product badge container` nodes (`hidden="true"`) in the Home underlay cards.
  - Hidden extra `Tab` instances in `1174:38900`.
- **Two filter-page builds:** `1174:35274` (semantic names, 120/255 split) vs `1174:35414` / `35321` / `35512` / `35585` (generic names, 124/251 split).
- **Not verified:**
  - Whether the header hamburger is part of the `Logo` vector.
  - The main component of the 28px Home Indicator.
  - Exact tokens on the red "Remove From Shop" button.
  - Why the `Tost` in `1174:36033` renders nothing.
  - The gap between stacked cards in `1174:38644`.

---

<a id="organize-flow-skill-md"></a>

# SOURCE: `organize-flow/SKILL.md`

> Step 3 · Organize: the organize-flow skill

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

---

<a id="mobile-design-review-skill-md"></a>

# SOURCE: `mobile-design-review/SKILL.md`

> Step 4 · Review: the mobile-design-review skill

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

---

<a id="mobile-design-review-references-final-design-md"></a>

# SOURCE: `mobile-design-review/references/final-design.md`

> Step 4 · Review: the final design, source-of-truth order, chrome reference

# Final design: the source of truth for mobile

The user's **final design** is the reference every mobile flow is synced to. When it disagrees with `main-file-mobile-flows.md` or with older frames on the canvas, the final design wins.

- **The final design:** the two `-` sub-sections `2384:76022` and `2384:77979`, inside `[Influencer] Shop Experience` (`2446:56196`) on the flows page `2462:56445`. They were the section `2384:76021` "BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26 (Final design)" until it was dissolved (seen 2026-09-28).
  https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=2384-77979
- **It is locked** (see `../../_shared/workfile.md` → "Locked"). Read and clone from it, never edit it.
- If the user names a newer final section, add it here. Keep the old one listed as superseded.

## Source-of-truth order (user's rule, 2026-09-25)

**The desktop says *what* a screen must contain. The final design says *how* it looks and behaves.** The desktop is drawn for a mouse on a 1440 canvas, with hover, a sidebar, two-column forms and centred modals. Copying it to a 375 touch screen imports decisions that were never made for a phone. The final design is where those mobile decisions were actually made.

When sources disagree, the higher one wins:
1. **The final design** (this file): its frames, then its patterns (below).
2. **Approved Decisions** in `readiness-log.md`.
3. **House values** in `spacing-rules.md` and `production-checklist.md`.
4. **The main file's mobile board** (`mobile-screen/references/main-file-mobile-flows.md`).
5. **The desktop twin**, for **coverage only**: which screens, states, content and actions exist. Never for layout, spacing, components, control choice, dialog pattern or copy.

In practice:
- **Never edit a desktop frame.** Desktop frames are read-only references.
- **Never apply a change whose only justification is "the desktop does it".** Report it as a **parity note** for the user to decide. It is not a fix row. Example: 02.1's locked name and email fields (dropped, 2026-09-25).
- **When a flow has no final-design screen**, build from the final design's **patterns** (below), not from the desktop's layout.
- **When the desktop and the app (code) disagree on behaviour,** that's a product question. Ask it, and fix neither.
- **A defect is a defect whatever any twin says**, e.g. a calendar icon on a non-date field, grammar, or copy that contradicts the product (5 MB vs `PHOTO_MAX_MB` 2). Fix it on mobile. Say that the desktop and the code still carry it, but don't touch them unless asked.

## Final-design patterns and gap fills (auto-applied, 2026-09-25)

These apply wherever a mobile screen needs the pattern, including flows the final design doesn't cover.

- **The final design itself is read-only** (user's rule, 2026-09-25, restated 2026-09-28). Never edit, move or restyle anything inside `2384:76022` or `2384:77979`. Clone from it; don't change it.
- **Gap fills stay** (user's rule, 2026-09-25). Where the final design doesn't show something, the approved gap fill below is the rule. It is applied like a final-design value. It is labelled **Gap fill** so its origin stays visible. If a later final design covers the same job, the final design replaces the gap fill.

| Job | Pattern | Source |
|---|---|---|
| Confirm dialog: shape | **Centred dialog**, 335 wide (20 margins), header p16/16/16/20 with the title (`Body/body-xl-bold`) and a close ✕ | Final design `2384:78404` |
| Confirm dialog: body and actions | Radius 12. Body text `Body/body-sm-regular` secondary. A Cancel + primary pair (the final dialog has one full-width button); a destructive action uses `Button=Destructive button`. Scrim over the page underlay, HI on top | **Gap fill**: the app's `ConfirmDialog` and house values |
| Button bar above the HI | Fixed at the bottom, padding 10 top / 8 bottom, sitting directly above the HI | Final design, Filter `2384:76990` / `2384:77081` |
| Long form in a sheet | **812 frame**. The sheet is fixed height from y=60, the body scrolls (`clipsContent`, `overflowDirection: VERTICAL`), and the button bar is p10/24/42/24 with a top border `border/color/default` and fill `surface/secondary/100`, holding Cancel + primary **8 above the HI**. The frame never grows past 812 | **Gap fill**: the final Filter is a full page, not a sheet, and its bar has 16 sides |
| Short sheet | Hugs its content and is anchored to the bottom. The last row ends **8 above the HI** (bottom padding 8 + 34) | **Gap fill**: extended from the Filter bar |
| Close ✕ | `Button=Outlined icon, Size=md` **instance**, never a drawn frame | Final design `2384:78407` |
| Secondary text on a tinted row (`#f8f8f8`) | `typography/color/secondary/800` (#6c6c6c, 4.9:1). `/700` (#757575) fails there at 4.34:1 | **Gap fill**: a WCAG AA fix, using a final-design token |
| Full-screen panel (drawer made mobile) | Status Bar fill `surface/secondary/100`, the same surface as the panel. No leftover desktop edge border | **Gap fill**: the Profile Settings & Notification build notes |

## Known gaps in the reference frames

- The reference frames have **no Home Indicator**. Ours keep it (house frame contract), and the sync ignores the difference.
- `2384:80509` (favorites) and `2384:79768` (PDP) still carry the **old 80/70 chrome**, so the chrome spec below overrides them.
- `2384:79768` is a PDP **modal over My Shop**, while our PDPs are full pages, so the sync compares chrome only for `pdp`.
- There's no reference for the **stats pages** (section 10) or the storefront preview. Their differences go to the user.

## Reference frames by archetype

`sync-script.js` sorts each mobile screen into one of these archetypes and diffs it against the reference. **Keep the `REFS` map in the script in step with this table.**

| Archetype | How it's recognised | Reference frame |
|---|---|---|
| `myshop-populated` | "MY SHOP" + "Your Picks" | `2384:80204` 10 — My shop / Product added — Mobile (a long version is `2384:80313`) |
| `myshop-empty` | "Your shop is empty" | `2384:80765` 01 — My shop / Empty state — Mobile |
| `myshop-favorites` | "MY SHOP", no "Your Picks" | `2384:80509` 05 — Favorites tab full — Mobile |
| `pdp` | "Product details" accordion | `2384:79768` 05 — Product detail / Default — Mobile |
| `catalogue` | "…categories" + "Brands" | `2384:76660` 02 — Catalogue / Default — Mobile |
| `overlay` | ≤812 tall with a popup, sheet or menu | `2384:78345` 06 — Product detail / Confirm popup — Mobile. Chrome only, no footer |
| `page` | anything else with the standard chrome (stats, storefront…) | chrome slots only, against `2384:80204` |
| `unstructured` | no `Header` layer | compared by screenshot only |

## Chrome reference: Status Bar + Header + Search (user's rule, 2026-09-25)

Reference `2384:87491` (inside `2384:80765`), 375×173. **Match it on every mobile screen that has the app header.** This rule is auto-applied.

| Layer | Spec |
|---|---|
| `Status Bar / iPhone 13 Mini` | Instance `Mode=Light` (`2:2042`), fill `#f8f8f8`, 47 tall |
| `Header` | Instance `Header / Device=Mobile, Type=MVP Portal, Page=Default` (`2105:74735`). 72 tall, padding **16/16/8/16** (L/R bound to `spacing/md`), fill bound to `VariableID:…/278:58` (#f8f8f8), bottom radius 10 bound to `VariableID:…/167:3` |
| `Search wrap` | Frame, 54 tall, padding **0/16/16/16** (bound to `spacing/md`), fill #f8f8f8 (bound to the same variable as the header), bottom radius 10 (bound to `…/167:3`), holding `Search/Default` 343×38 |

The public storefront preview (`09.2`, `2368:62381`) uses the shopper storefront header, so it's exempt.

**How it was applied:** set the header's `paddingBottom` to 8. On the search wrap, set `paddingTop` to 0 and bind the fill, radius and side/bottom padding. Then shift the absolute cursors below the chrome by the height change (−24, or −8 where the wrap was already 54). Dialog frames need no shift, because their underlay page is clipped inside a fixed 812 frame.

## My Shop spacing (auto-applied, 2026-09-25)

- `Content`: padding **24/16/48/16**, gap 32.
- Page header ("MY SHOP") → Shop Info Card: **16**. In our frames this is `Shop content wrapper.itemSpacing`. The reference nests the two in their own gap-16 frame, which is why the slot diff can't see it, so check it directly.

## Other reference values (from `2384:80204`)

These are compared by the sync. They are **not** auto-applied until the user approves them.

| Slot | Reference |
|---|---|
| `Shop Info Card` | p16, gap 20 |
| `Tabs and content section` | gap 32. `Tab Bar` gap 24. `Content Toolbar` gap 16 |
| `Footer/Mobile/Default` | p32/16/32/16, gap 32 (clone `2384:80274`) |

## My Shop tab bar (auto-applied, 2026-09-25)

The `Tab Bar` on a My Shop page (All Picks / Favorites) matches `2384:80233`. Labels are **`Body/body-md-medium`** on the selected tab and **`Body/body-md-regular`** on the others. The bar has a 24 gap and no padding, a `#e5e5e5` bottom border, and is 42 tall. Tab bars on the catalogue, brand, product detail and sample-request frames stay `Body/body-sm`, as they are in the reference.

## Product card (auto-applied, 2026-09-25)

Every My Shop product card matches `2384:80247` on All Picks (343 wide) and the `2384:80509` cards in the Favorites carousel (260 wide):
- The image's overflow button is `Button=Outlined icon, Size=sm` (24px, radius 6).
- The Favorite badge has padding 4/8, radius 999 and fill `#464646`, with a `Body/body-xs-medium` label.
- The product name is `body-md-medium`, truncated at the end.
- Replace a card with a different structure by a clone of the reference card, and copy its text across.

## House patterns set by the user on 2026-09-28 (auto-applied)

These were applied page-wide on 2026-09-28, except the banner position: 03.5 still has the banner above the Search wrap (03.4 was rebuilt with it below). Apply them to any new or changed screen. The component and token ids are in `../../_shared/workfile.md`.

| Job | Pattern |
|---|---|
| Account-setup banner | An instance of the **Notification Banner** component. On mobile it sits **below the Search wrap** (the Status Bar, Header and Search wrap stay one chrome block) and scrolls with the content. `Show Action` is on for My Shop screens and off on Manage Account screens. |
| Manage Account tabs | An instance of the **Settings Tabs** component. 44 tall, 8px side padding (the first tab is flush with the gutter), a scrolling row, and the ⚠ **before** "Bank Details". The underline is on the tab items (1px `border/color/default`, 2px `border/color/dark` when active), never on the row. |
| Corner radius | Every radius is bound to a `border/radius/*` token. Off-scale values snap to the nearest one; pills use `infinite`. |
| Modals | Title styles bound. Panel `surface/secondary/100`. Form modals get the 40/12 shadow. Mobile centred dialogs get a 1px `border/color/default` border and a header divider, with padding like the library `popup`: header 16/24, body 16/24/24. |
| Toasts | Follow 04.7 (`2348:55780`). The inner toast FILLs the width (343) and hugs its height, bottom-anchored in the `Tost` wrapper. |
| Options List (card ⋮ menu) | The right edge is flush with the ⋮ button, 4px below it. |
| Shop Info Card | Buttons stacked vertically, both full width, 8px gap. The labels, URL field and status line follow the state table in `workfile.md`. |
| PDP (in-shop, desktop + mobile) | `Stack / What Creators Say` > [inner `Stack / What Creators Say` (Editorial frame + `Pdp-write-a-review-cta`), `Performance Section` (`Performance header` + `Performance Stats Content` > `Stats Card`)]. Mobile outer padding 8/16/48/16, gap 32. The modal PDP stays as it is. The public PDP (09.1) has no Performance. |
| PDP action buttons (`Action buttons row` › `Type wrapper`) | Stacked vertically, both full width (343), 12 gap (`spacing/md-sm`): Remove from Favorites / Add to Favorites (Outlined, lg), then Remove from shop (Destructive, lg). Set by the user on 05.3 (`2343:38969`) and applied to every in-shop mobile PDP on 2026-09-28. **Desktop** keeps the buttons side by side, with the gap bound to the same 12 (`spacing/md-sm`, 9 PDPs). |
| Creator reviews (mobile) | **Final design: 09.2 `Reviews section` `2368:62493`** (user, 2026-09-28). On every mobile PDP, `Stack / What Creators Say` holds a `Reviews carousel` (gap 24): the title "WHAT CREATORS SAY" (the storefront says "<Name>'S REVIEWS" plus its description), the ‹ n / N › controls (40px round, `border/color/default`), then a scrolling row of 300px review cards (gap 12, overflow visible so the next card peeks). A card is a product header (brand + name + ›, `#f8f8f8`) over a white review block (verified avatar, 3-line quote, Read more, up to 3 photos, only when the review has them). The product header shows the page's own product. Applied to 05.3, 05.4, 07.3, 07.4, 10.1–10.4, 11.3 and 09.1, replacing the old editorial quote block. |
| Review CTA (`Pdp-write-a-review-cta`) | 16 padding (`spacing/md`). A 24×24 icon well with 4 padding and a 16 icon. Icon → text 12, title → description 4, and on mobile text → button 16. Height hugs. |
| Performance Section | The app's 4 metrics (Total unit sold, Link clicks, Conversion rate, Commission settled) plus "View other stats". Desktop is one row; mobile is a 2×2 grid with a full-width button. |
| Shop stats card | The 5 metrics + "Showing" filter (clone `2348:55137`). |
| Favorites | Capped at **4** everywhere: headings `(n/4)`, the tab count, cards, ★ badges and storefront Favorite Picks. |

---

<a id="mobile-design-review-references-spacing-rules-md"></a>

# SOURCE: `mobile-design-review/references/spacing-rules.md`

> Step 4 · Review: spacing rules

# Mobile spacing standard — what a review measures against

House values come from the main file's mobile board (`cehltPtMoGWEtKbF7k3MQQ` `1174:34352`, catalogued in `mobile-screen/references/main-file-mobile-flows.md`) and from the rules in `mobile-screen/SKILL.md`. Where the canvas disagrees with them, the canvas is the finding.

## 1. Scale

All spacing tokens come from the remote library and have one mode, so the values are the same on mobile and desktop.

| Class | Values | Review rule |
|---|---|---|
| **Core (4pt)** | 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 64 | Expected everywhere |
| **Legacy tokens** | 2 (`spacing/two`), 10 (`spacing/ten`), 14 (`spacing/fourteen`) | Allowed inside components, such as chips, footer groups and filter headers. At page or section level, flag as P3 and suggest the nearest core value |
| **Off-scale** | anything else (6, 13, 15, 18, 22, 33, 108…) | P2, or P1 if it breaks rhythm or alignment. Exceptions: optical nudges of 1–2px inside an icon or badge, and fixed chrome (Status Bar 47, HI 34) |

Radius is not spacing, but check it in the same pass. The values are `/xs` 4, `/sm` 6, `/md` 8, `/lg` 10, `/infinite`. The same component should use the same radius on every screen.

## 2. House values by layer

| Layer | House value | Notes |
|---|---|---|
| Screen width | 375, height hugs with a minimum of 812 | |
| **Page gutter (L/R)** | **16**, bound to `spacing/md` | 24 is legacy and still found on auth/setup screens and confirm-popup underlays. Within one flow it must not mix |
| Status Bar | 47 tall, top edge, nothing overlapping | |
| Header | pt16 pb8 px16, bottom radius 10, `#f8f8f8` | Search wrap under it is px16 pb16 |
| Header/search → first content | 24 (`Content` pt24) | Page title → its card is 16 |
| **Section gap** (between major blocks) | **32** in app pages (My Shop wrapper), **24** in detail columns (PDP) | Choose one per screen type and keep it through the flow |
| Card padding | 16 | Product row card p16 gap12. Empty-state card p33 is a known oddity, so flag it as P3 |
| List of cards | gap 16 | Brand grid gap 12. Catalogue brand grid gap 16 is known drift |
| Row inside a card | gap 12 (thumb ↔ text), 4–8 (label ↔ value) | |
| Buttons | px16 py8 (sm) or py12 (full-width CTA). Primary CTA height 46–48 | Component internals are reliably bound, so review only overrides |
| Bottom sheet | top radius 10, head pt24 pb12 px16, rows h46 px16. The last row or button bar ends **8 above the HI** (bottom padding 42 including the HI) | Final design wins over the old pb32 (2026-09-25). Long forms: 812 frame, scrolling body, sticky `fixed-button-bar` (`final-design.md` patterns) |
| Centred dialog | 335 wide (20 side margins), radius 12, body p16 gap16 | |
| Last content → Footer | pb48 on `Content` | |
| Home Indicator | 34 tall, bottom edge, **nothing interactive in it** | |
| **Touch targets** | **≥44×44** (Apple HIG) | 38px pagination, close and page buttons are house style. Flag them P2 and suggest a 44 hit area in code, because they're a real miss on primary actions |

## 3. The checklist — how a senior designer reads a screen

Work through these in order for every screen. The first four are about structure, and most P1s come from them.

1. **Edges.** Is the gutter identical on every screen of the flow? Does nothing but deliberate full-bleed (images, header, footer, horizontal scrollers) touch the edge? Horizontal scrollers should start at the gutter and bleed off the right edge, which shows there's more.
2. **Proximity (Gestalt).** Space inside a group must be smaller than space between groups. The test: internal gap < external gap, ideally by at least one step (8 → 16, 16 → 24/32). A label closer to the next field than to its own field, or a price closer to the next card, is P1.
3. **Rhythm.** Walk the screen top to bottom and read the gaps in order, e.g. `24 · 16 · 32 · 32 · 12 · 32`. A healthy screen uses 2–3 values in a repeating pattern. Many different values, or one odd value in a run, means nobody set a system.
4. **Hierarchy through space.** More space above a section heading than below it, because the heading belongs to what follows. Equal space on both sides makes the heading float. The biggest gaps should separate the most important breaks.
5. **Cross-screen identity.** The same component (card, header, sheet, toast, tab row, stats tile) must have the same padding, gap and radius on every screen. Compare the fingerprint columns.
6. **Alignment.** Do text left edges line up down the screen, at the gutter or on one inner indent? Are icons optically centred in their buttons, and do icon rows align to text baselines, not boxes? Are numbers in stats tiles on one baseline?
7. **Density fit.** Mobile needs air and a thumb-sized layout, not a scaled-down desktop. Watch for desktop gaps (48+, 120 margin) carried into mobile, and for mobile cards packed tighter than 12 between rows.
8. **Touch and safe areas.** Targets ≥44. At least 8 between adjacent tap targets. Primary CTA reachable and not in the HI zone. Sticky bars account for the HI (the filter bar has a 28 HI under it).
9. **States.** Error, empty and toast versions of a screen keep the default's spacing. An error message shouldn't collapse the gap under its field, and an empty-state card should sit where the list starts.
10. **Tokens.** Page- and section-level values bound to `spacing/*` variables. Correct but unbound is P3. Unbound and off-scale is reported under that value's own severity.

## 4. Known drift on the canvas (don't rediscover as news, but do report where it appears)

- Gutter 16 vs 24: 29 of 87 surveyed screens use 16, 18 use 24, and only about a third are bound (`responsive-system.md`).
- The confirm-popup underlays (`1174:36676`, `1174:36768`) use 24.
- Brand grid gap 12 vs the catalogue's 16.
- Empty-state shop card p33 gap26, both off-scale.
- Filter chips row: the last two chips use Inter 11. That's type, not spacing, but mention it if seen.
- Adapted toasts: the inner Toast's `itemSpacing` 108 must be 12 (`mobile-screen/SKILL.md` gotchas).

---

<a id="mobile-design-review-references-production-checklist-md"></a>

# SOURCE: `mobile-design-review/references/production-checklist.md`

> Step 4 · Review: production-readiness checklist

# Production-ready checklist for a URMEI mobile screen

A screen is production ready when a developer can build it without asking a question, and it survives real content, real devices and real users. Review every area below. Spacing has its own detailed standard in `spacing-rules.md`, and it is area 1 here.

The house references are `mobile-screen/SKILL.md` (frame and chrome contract), `mobile-screen/references/responsive-system.md` (type ramp and tokens) and `mobile-screen/references/main-file-mobile-flows.md` (the main file's mobile designs, components and conventions).

Severity:
- **P1:** blocks shipping. It will look broken or be unusable, or a developer can't build it as drawn.
- **P2:** visible inconsistency or a missing piece a user will hit.
- **P3:** polish and handoff hygiene.

---

## 1. Layout and spacing
See `spacing-rules.md`: the gutter, rhythm, proximity, cross-screen consistency, the 4pt scale and token binding.

## 2. Frame and device chrome
- The frame is 375 wide, its height hugs, and it is at least 812 tall. **P1** if it's wrong.
- The **Status Bar** instance (library set `2:2041`) is at the top, and the **Home Indicator** instance (library set `2:1824`) at the bottom (`../../_shared/workfile.md`). Both must be live instances, not detached, resized or redrawn. **P1** if missing or broken.
- Nothing interactive sits in the top 47 or bottom 34 safe areas. Sticky bottom bars keep the HI under them. **P1**.
- The content wouldn't clip at 390 or 430 wide: containers FILL, nothing is hard-fixed at 343. **P2**, found through area 9.

## 3. Typography
- Every text node uses a library text style (`Body/*`, `Heading/*`). Raw font settings are **P2**.
- Titles use the same style as their desktop twin, e.g. page title `body-xxl-regular`. There's no invented mobile size. **P2**.
- The family is Figtree only. Inter, Arial or Roboto leftovers are **P2**. The status bar's SF Pro is exempt.
- Minimum size is 12 for anything a user must read, and 10 only for fine print (`body-xxs`). **P2**.
- Long text is handled: product names clamp or truncate with an ellipsis (`textTruncation` or max lines), and nothing overflows its box or overlaps. Test the longest real string on the screen. **P1** if it overlaps.
- Line length stays readable, and paragraph text isn't justified. Alignment is consistent: body copy left-aligned, centring only in empty states and dialogs. **P3**.
- Casing matches the house rules: section labels in uppercase Heading ST ("MY SHOP"), buttons as the design system cases them. **P3**.

## 4. Colour and contrast
- Fills and strokes come from colour variables or styles (`surface/*`, `border/color/*`, `text/*`). A raw hex that matches a token is **P3**. A raw hex that matches no token is **P2**.
- **WCAG AA contrast:**
  - text under 18px needs 4.5:1, and 18px+ or 14px+ bold needs 3:1
  - icons and control borders need 3:1 against their background
  - placeholder `#b1b1b1` on white is 2.1:1, so flag it wherever it carries meaning, not just a hint
  - **P1** on primary content or actions, **P2** elsewhere
- State isn't shown by colour alone. Errors carry an icon or text as well as red, and a selected tab has a weight or underline as well as a colour. **P2**.
- Brand colours are used consistently, e.g. the alert red `#EE4442` for errors and the primary for the CTA. **P2**.

## 5. Components and consistency
- Use library or Work File component instances. A detached copy of something that exists as a component (Button, Tost, Header, Search, Pagination, Footer) is **P2**. The tell is a FRAME named like a component.
- No instance should have a missing main component. **P1**, because the developer has nothing to map.
- A variant should match its state, e.g. a disabled CTA uses `State=Disabled`, not an opacity override. Leftover overrides after a variant swap count here, like an icon colour kept from the old variant (see the gotchas in `mobile-screen/SKILL.md`). **P2**.
- One pattern per job across the flow:
  - every dialog is a bottom sheet or a centred dialog, matching the main file for that flow
  - every success message is the same toast
  - every back affordance is the same
  **P2**.
- Icons are one set, one stroke weight, and 16/20/24 on the grid, centred in their hit box. **P3**.

## 6. States and edge cases
Each screen in the flow needs the states its desktop has. For a production flow, it needs these too:
- default, empty, loading (skeleton or spinner, if data loads), error, success, and disabled (a CTA before the form is valid)
- long content: a long name, many chips, a big number such as S$12,345.67, and a region list that wraps
- a filled form, a form with inline errors, and the keyboard open on input screens (does the CTA stay reachable?)
- first-time vs returning, where the flow has both

A missing state the desktop has is **P1**. A missing production state (loading, long content, keyboard) is **P2**. List the missing states per screen; don't draw them during the review.

## 7. Content and copy
- Use real, final-looking copy. Lorem ipsum, "Text", "Label", "Button" or placeholder names are **P1**.
- Terminology: **"Favorite(s)"**, never "Featured", in the UI. The one exception is the activity-log labels, which follow the design's British "favourite" (see `CLAUDE.md`). **P2**.
- The same number reads the same across the flow's screens: stats, counts such as "All Picks (1)", prices. Currency is formatted `S$45`, `S$1,234.50`. **P2**.
- The same action is worded the same on every screen, e.g. "Publish Shop" vs "Publish" vs "Publish Changes", which should only differ by state. **P2**.
- Errors say what went wrong and what to do ("Bank details missing · Add bank details"). **P2**.

## 8. Interaction and ergonomics
- Touch targets are at least 44×44 with at least 8 between them. **P1** on primary actions, **P2** otherwise (38px buttons are house style; suggest a 44 hit area in code).
- The primary action is in the thumb zone (lower half) or sticky at the bottom on long forms and lists. **P2**.
- Every screen has a way back or a way to close: a back chevron, a sheet close or a scrim tap. Destructive actions confirm. **P1** if missing.
- Horizontal scrollers show a peek of the next card, so it's clear they scroll. **P2**.
- The hand `Cursor` appears where the desktop twin has one, on the same element (the user's rule, 2026-09-25). **P3**.
- Where the flow is prototyped, the connections match the flow order. **P3**, and only if prototypes exist.

## 9. Responsive build readiness (developer handoff)
- Everything is auto layout down to the component level. A frame with several children positioned absolutely at depth ≤3 won't translate to flex. **P2**, or **P1** for the page's main content column. The exceptions are deliberate overlays: cursor, toast, badge dot and scrim.
- Sizing modes express intent. Full-width children are **FILL**, not a fixed 343. Text blocks are FILL or HUG, not fixed-height boxes that clip. Frames grow vertically (HUG). **P2**.
- Images use the right fill mode (FILL/crop) at a stated aspect ratio, and have no empty image fills. Avatars are circular via radius, not a mask hack. **P2**.
- There are no hidden junk layers, stray off-frame nodes or zero-size frames inside the screen. **P3**.
- Layers have meaningful names, with no `Frame 2007737768`. Run `/organize-flow` for this rather than renaming by hand. **P3**.
- Frame names follow `NN.S Flow — State — Mobile`. **P3**.

## 10. Desktop parity and flow completeness
- **House rules for My Shop (2026-09-25):**
  - every full-page shop or home mobile ends with `Footer/Mobile/Default` above the HI
  - the "Your Picks" toolbar shows only when the shop has products
  - the dashed "Add Product" card never shows once a product exists
  Breaking any of these is **P1**. Details are in `readiness-log.md`.
- **The desktop is a coverage reference, not a design reference** (user's rule, 2026-09-25; see "Source-of-truth order" in `final-design.md`). Check *that* the mobile has what the desktop has. Take *how* it looks from the final design. Never edit desktop frames. A difference justified only by the desktop, such as a control state, layout, pattern or wording, goes in the report as a **parity note** (no severity, the user decides). It is not a fix.
- Every desktop screen in the section has its mobile twin beside it. A missing twin is **P1**.
- The mobile keeps the desktop's content, actions and information. Something dropped without an alternative (e.g. a sidebar filter that has no mobile sheet) is **P1**. This is about coverage: the alternative's design comes from the final design's patterns.
- It restructures rather than shrinks: columns stack, the sidebar becomes tabs or a sheet, the header splits into Header + Search wrap (`responsive-system.md`). A scaled-down desktop is **P1**.
- Order of steps: a user can walk from the first to the last screen with every transition drawn. **P2** for a gap.

## 11. Accessibility (beyond contrast and targets)
- A logical reading order: the top-to-bottom layer order matches the visual order. **P3**.
- Icon-only buttons have a clear meaning (a label in the dev notes is fine). **P3**.
- Form fields have visible labels, not placeholder-only labels. **P2**.
- Focus and selected states are visible on tabs, chips and radios. **P2**.

---

<a id="mobile-design-review-references-readiness-log-md"></a>

# SOURCE: `mobile-design-review/references/readiness-log.md`

> Step 5 · Track: readiness log and open decisions

# Mobile readiness log

The status of every mobile flow section in the Work File (`FdmVPJo1j4t8s9gej1H7Yb`, flows page `2462:56445`). Update a row after each review or fix pass. Section ids and locked frames are in `../../_shared/workfile.md`.

Statuses:
- **Not reviewed**
- **Reviewed:** findings are open.
- **Fixing:** some fixes are applied.
- **Ready:** no open P1 or P2, full coverage, and agreed by the user.

| Section | Node | Status | Open P1 | Open P2 | Missing mobiles / states | Last pass |
|---|---|---|---|---|---|---|
| 03 - Publish Shop | `2230-78005` | Fixing | 1 (03.5/03.6 Shop Info Card state: code vs desktop, decision) | 1 (banner above the Search wrap on 03.5; 03.4 was rebuilt by the user with it below, `2499:58387`) | production: publishing/loading, network error | 2026-09-28 consistency passes |
| 04 - Add Favorite Product | `2061-41656` | Fixing | 0 (favorites cap resolved: 4) | 0 | none missing | 2026-09-28 |
| 05 - Remove Favorite Product | `2248-33651` | Fixing | 0 | 1 (PDP figures differ from 07.3, decision) | production: long PDP name, menu dismiss | 2026-09-28 PDP structure |
| 06 - Reorder Favorite | `2344-77290` | Fixing | 0 | 0 | production: reorder loading | 2026-09-28 |
| 07 - Copy Affiliate Link | `2344-78578` | Fixing | 0 | 1 (PDP figures differ from 05.3, decision) | none missing | 2026-09-28 PDP structure |
| 08 - Remove Product from Shop | `2364-57473` | Fixing | 0 | 1 (touch targets, code) | production: remove error | 2026-09-28 |
| 09 - Shop Preview | `2364-57887` | Fixing | 0 | 1 (detached pagination: no component) | none | 2026-09-28 |
| 10 - Stats Breakdown | `2364-58157` | Fixing | 0 | 2 (`MetricsCard` contrast is component-level; red trend "4%" 3.57:1) | production: loading, empty list | 2026-09-25 |
| Onboarding & Home Experience | `2446-47735` | Fixing | 0 | 0 | production: OTP error/expired, invalid email, apply-form errors, Recent Activities empty, Home loading | 2026-09-25 |
| Sample Request & Review | `2384-65541` | Fixing | 1 (01.2 "Add a review" before delivery, product question) | 4 (library destructive contrast, red banner text in an instance, no 14 SemiBold style, touch targets) | production: list loading, submit error, keyboard | 2026-09-28 PDP structure |
| Profile Settings & Notification | `2375-62087` | Fixing | 0 | 1 (touch targets, code) | still missing: save/add toasts, form errors, filled/enabled Save | 2026-09-28 components |

Sections 01 and 02 (Add Product) are gone. The locked final design covers that flow.

## Open decisions (start here)

Each item is carried over from the 2026-09-25 handoff (archived in `archive/handoff-2026-09-25.md`), unless marked new. Move an item to the log below once the user answers it.

1. **Grey stats labels:** keep the darker `secondary/800`, or revert to the final design's `#757575` where the final design shows the element?
2. **Red banner text** (Sample Request 06–07): keep it or undo it? It was applied under a gap fill that hadn't been approved.
3. **Product page figures:** 05.3 and 05.4 show 128 / 2,410 / 10% / S$0, while 07.x, 10.x and 11.3 show 2 / 700 / 10% / S$0. The app gives one product the same figures everywhere, so which set is canonical?
4. **Early "Add a review" link** on Sample Request 01.2 (Requested, Approved and Shipped). The app allows a review only after delivery. Product question.
5. **Locked profile fields (02.1):** a parity note only.
6. **Proposed gap fills** (approve or reject each):
   - `#b1b1b1` meaningful text → `secondary/700`
   - a close ✕ on non-confirm dialogs
   - `#fdecec` banner text → `primary/1000`
   - down-trend % text → `secondary/800`
   - rank-footer text → `secondary/800`
7. **New (2026-09-28): the final design was edited by mistake.** The radius passes and the modal pass reached `2384:76022` and `2384:77979` while the lock still pointed at the dissolved `2384:76021`. The radius snaps were 12/16/24 → 10, 7 → 8, 5.09 → 6 and 2.5 → 4. The two dialogs `2384:78404` and `2384:78496` got a border and 24 padding. **Restore from version history.**
8. **New: Shop Info Card state on 03.5 and 03.6.** The code reads 03.5 as "published, 0 products" (Publish changes + date line) and 03.6 as "publish blocked" (URL disabled, Preview muted, Publish shop disabled). Desktop shows "Publish shop" on both. Also: should never-published cards with products read "Preview Shop" (as in the code)?
9. **New: Button casing.** The library Button forces Title Case ("Publish Changes"), while the app uses sentence case ("Publish changes"). Change the component or the code?
10. **New: desktop leftovers** (the desktop is read-only unless approved):
    - 13 `Profile & KPA` stats cards (Total products, "Commission owned", no filter)
    - the 10.1 stats card has 20 top padding
    - the Home card variant has no Commission pending
11. **New: toast top.** A toast with a button or a second line grows to top 42, over the 47px status bar.
12. **New: toast copy.** "Favorites are full (4/4)" + "Manage", and "Couldn't save the new order" + "Try again". Not approved yet.

**Resolved 2026-09-28:**
- The banner position on 03.4: the user rebuilt the frame (`2230:76758` → `2499:58387`) with the banner below the Search wrap, the action linked to 02.3, and a stacked Shop Info Card. 03.5 still needs the same move.
- The favorites cap is 4 (old decision 3).
- Dialog body padding (old decision 7): aligned to the library `popup`, header 16/24 and body 16/24/24.

## Decisions log

Record the user's answers to design-decision findings here, with the date, so later sections apply them without asking again.

**2026-09-25: the reference is the final design, not the desktop (user's rule).** Don't derive mobile fixes from the desktop twin, and never edit desktop frames. Where the final design has no screen for a flow (e.g. Manage Account), use its patterns: centred 335 confirm dialog (`2384:78404`), a long form as an 812 sheet with a scrolling body and a sticky `fixed-button-bar` above the HI (Filter `2384:76990`), and the close ✕ as `Button=Outlined icon, Size=md` (`2384:78407`). A desktop-only difference is reported, not applied. So the 02.1 locked-fields finding was dropped.

**2026-09-25: My Shop mobile rules.** These match the final reference section `2384:76021` ("BROWSE & ADD PRODUCT TO SHOP - 24 -09 -26 (Final design)"), mobile `2384:80204`.

1. **Footer on every full-page shop or home mobile.** Use `Footer/Mobile/Default` (clone `2384:80274`), placed between `Content` and the Home Indicator. The 812px sheet/dialog screens don't get one, because it would sit hidden behind the popup.
2. **The "Your Picks / Everything you add appears here + Add Product" toolbar** (`Content Toolbar`) shows on the All Picks tab when the shop has products. It's **removed in the empty state**, where the tab bar is followed directly by the "Your shop is empty" card.
3. **The dashed "Add Product / Choose from the catalogue" card** (`Add Product Slot` / `Add Product Tile — Mobile`) is **removed once a product is added**. The toolbar's "+ Add Product" button is the only add entry point.

Applied to sections 03–10 on 2026-09-25:
- 14 cards removed
- 3 empty-state toolbars removed (03.6 `2230:77752`, 03.2 `2153:45302`, 03.5 `2230:77536`)
- 23 footers added

Rows inside the sections were reflowed to keep 200px gaps, and the column was restacked.

**2026-09-25: Chrome matches the final reference `2384:87491`** (Status Bar + Header + Search wrap). This is auto-applied, and the spec is in `final-design.md`. Applied to 40 mobile frames in sections 03–10:
- Header `paddingBottom` 16 → 8 (80 → 72 tall)
- Search wrap padding 16 → 0/16/16/16, fill white → #f8f8f8 (bound), bottom radius 10 (bound). 70 → 54 tall
- 14 absolute cursors shifted up with their content

Exempt: `2368:62381` (09.2 Storefront Preview, shopper header).

**2026-09-25: chrome spec applied to Profile Settings & Notification** (`2375:62087`):
- The detached 88px white `Header` on the 10 Manage Account mobiles (02.1–02.10, the 3 sheet underlays included) was replaced with clones of reference `2384:80767` Header and `2384:80768` Search wrap. Each frame is +38 tall.
- The 01.1/01.2 notification underlays' Header pb 16 → 8, and their Search wrap 70 → 54 (bound).
- 1 cursor shifted (02.8). Row 2 of `02 - Profile & Settings` moved down 38 to keep the 200 gap, and both sections were refit.

**2026-09-25: fix pass on Profile Settings & Notification** (mobile frames only):
- **Sheets:** 02.4 and 02.7 are now 812 frames. Each sheet is 752 tall with a scrolling `popup / body` and a sticky `fixed-button-bar` (p10/24/42/24, top border). Buttons end 8px above the HI. On 02.9, the Set As sheet's bottom padding is now 42.
- **Spacing:** `Content` bottom padding 40 → 48, with L/R bound to `spacing/md` (10 frames). `Stack Wrapper` gap 40 → 32 (8 frames). `Settings Tabs` is FILL, clipped and scrolls horizontally (10 frames).
- **Text and colour:** 72 texts got library styles. 73 paints bound to tokens; `#ffffff`, `#000000`, `#e6e6e6` and `#996108` have no exact token and stay raw. On the 01.2 unread rows, `#757575` → `typography/color/secondary/800` (4.9:1).
- **Components:** 4 detached close buttons were replaced with the Button instance. The 01.x status bar is now white. The drawer's left border was removed, and its list fills the drawer. Beauty Niche's calendar icon was swapped for `chevron-down`.
- **Copy (mobile only):** "up to 2 MB", "When you have notifications, they'll show up here.", "URMEI sends your payout", "Add Bank Details", "Add Address", "Charlotte Wong", "Account number:", "started following you on URMEI". The desktop and the code still carry the old copy.
- **New frames:** 02.11 Delete Bank Details Confirm `2422:63734` and 02.12 Delete Address Confirm `2422:63841`, both centred dialogs.

**Sections 01 and 02** (`2344:45391`, `2344:43434`) are no longer on the page as of 2026-09-25. The final section `2384:76021` covers that flow.

**2026-09-25: My Shop spacing matches the final design.** Auto-applied, per the user's instruction to update automatically from the findings:
- `Content` padding 16/16/16/16 → **24/16/48/16**, gap 32 (reference `2384:80209`): 23 frames
- `Shop content wrapper` gap 32 → **16** between the "MY SHOP" page header and the Shop Info Card: 23 frames, dialog underlays included
- 7 cursors shifted with their content

The reference uses raw values, not variables. Binding 24 to `spacing/lg` is an open P3.


**2026-09-25: My Shop tab labels are `Body/body-md`** (16px, medium when selected and regular otherwise), per reference Tab Bar `2384:80233`. This is auto-applied, and applies only to My Shop pages. The catalogue, brand, product detail and sample-request tab bars stay `Body/body-sm`, as they are in the final design (`2384:76685`, `2384:79793`). Applied to the visible tabs of 25 frames:
- 03.1–03.7
- 04.1–04.7
- 05.1–05.2
- 07.1–07.2
- 08.1–08.4
- 09.1
- Notification 01.1–01.2

Frames that already matched: section 06, 10.1, and the older `2320:*` My Shop frames. Tell a My Shop screen by its "MY SHOP" page title, not by the header's "My Shop" link: every frame has the link, so matching on it catches the catalogue and product detail frames as well.

**2026-09-25: My Shop product cards match reference `2384:80247`** (`Featured product listing`, in `2384:80204`). Applied on the user's approval:
- The overflow "⋯" on 31 All Picks cards: `Button=Outlined icon, Size=md` (40px) → a clone of the reference `Size=sm` (24px, radius 6).
- The Favorite badge label on 29 cards: `body-xxs-medium` → `body-xs-medium`.
- The badge padding on 2 cards (03.1 `2224:76296`, 03.7 `2334:37819`): 4/16 → 4/8.
- The old "Product Card — Mobile (favorite)" cards in 03.3 and 03.4 were replaced with clones of the reference card, keeping their text. They are now `2411:228344` and `2411:228377`.
- The dashed Add Product Slot was removed from Notification 01.1 and 01.2 (decision 3). Those frames are a fixed 812 tall, so no reflow was needed.
- 06.2's reorder button `2352:207814` had no background; it now has the Default fill again.

A rerun of the comparison finds no differences. The Favorites carousel cards (260w) already matched.


**2026-09-25: chrome spec applied to Sample Request & Review** (`2384:65541`). This was auto-applied to all 34 mobile frames:
- Header `paddingBottom` → 8, L/R bound to `spacing/md`
- Search wrap padding 0/16/16/16 (bound), bottom radius 10 bound to `border/radius/lg`, fill copied from `2224:76254`
- 3 page cursors shifted up with their content

**2026-09-25: whole-page pass** (five parallel forks, mobile only; no desktop or final-design frame touched). Sections 03–10 were restacked at 200 gaps (06–10 moved by 3–32px), with no page overlaps.
- **03–04:** the Publish confirms 03.2/03.4/03.5 are now centred dialogs, and 03.2's underlay is a copy of 03.1 (`2426:223385`). The 03.5 banner reads "Your storefront stays hidden until you add products and publish your shop." "Featured" → "Favorite" on 14 frames. 16 styles, 24 tokens.
- **05–07:** PDP rhythm fixed (Content pb 24, last block → footer 48, variants gap 16). Copy: "appear" and "TOTAL UNITS SOLD". 7 styles, 18 tokens, and 06 row 2 moved down 24.
- **08–10:** 08.3 is now a centred dialog. On the stats pages, `Page Content` is 24/…/48 with L/R bound. 09.2 top padding 40 → 24. Copy: "About me:" and "★ Favorite". Section 10 rows reflowed.
- **Onboarding & Home:**
  - The chrome spec applied to Home, Help Center (the detached header swapped) and Recent Activities (Search wrap added), and footers added to 4 pages.
  - Login/OTP gutter 24 → 16, and apply-flow bottom padding 40 → 48.
  - The logout sheet is now a centred dialog.
  - Lorem ipsum replaced with the app's FAQ answer, and copy typos fixed.
- **Sample Request & Review:**
  - 10 footers added, and 12 short sheets now end 8 above the HI.
  - 05.2 is now an 812 sticky-bar form, and 06.2 a centred dialog with a Destructive button.
  - 3 ✕ buttons replaced with instances, 41 styles, 34 tokens.
  - Copy fixes (17 Sep 2026, Orchard Road, Lucky Plaza, URMEI, "Tell others"). The section is now 14910×33310.
- **Needs the user's call, the contrast rule conflict:** the forks for 05–07, 08–10, Onboarding and Sample darkened `#757575` → `secondary/800` on `#f8f8f8` tiles, including elements the final design itself shows at `#757575`. The 03–04 fork left them alone. By the source-of-truth order, the final design wins where it covers the element.

**Proposed gap fills (awaiting the user; not rules yet):**
1. Meaningful text in `#b1b1b1` on a light surface → `typography/color/secondary/700`. Placeholders and disabled labels are exempt. (Already used on the "Publish shop to get your URL" helper and on a 07 note.)
2. Every non-confirm centred dialog gets the `2384:78407` close ✕ (e.g. Change Language).
3. Text on a `#fdecec` alert banner → `typography/color/primary/1000`, keeping the red icon and tint. (Partly applied on 06–07 in the Sample section before approval.)
4. Down-trend % text on a tinted tile → `secondary/800`, with the ▼ glyph kept red.
5. Text on the `#f2efed` rank footer → `secondary/800` (4.59:1). This would override the final design's `/700`.


**2026-09-28: Favorites cap is 4 (user: "Favorite products (0/4) everywhere"), resolving open decision 3.** The flows now live on page `2462:56445` "-> Responsive Design (Web & Mob)".
- Mobile 04.4 (0/6 → 0/4), 04.5 (6/6 → 4/4), 05.1 (6/6 → 4/4), 05.2 (5/6 → 3/4). The extra favourite cards were removed (2, 2, 2), and the Favorites tab counts updated to (4), (4), (3). "appears" → "appear" on 04.4 and 04.5.
- The desktop twins still read "Featured products (x/6)", and are left for the user under the desktop read-only rule.
- **The mobile shop stats card is the canonical five metrics:** Total clicks, Total sales, Commission pending, Commission earned, Commission settled, with the "Showing" filter (clone of `2348:55137`). On 04.2, 04.4, 04.5, 04.6 and Home "06 — Shop completed — mobile", the old "Total products" card was replaced, keeping each screen's figures. Commission pending was taken from the desktop twin. Each card is 19px shorter.
- Still open: the final-design mobile `2384:80537` (locked) uses the old Total products set, and 13 desktop `Profile & KPA` cards (03.x/04.x/05.x) still show Total products and "Commission owned", with no filter.

**2026-09-28: approved edit to the locked final design.** The user asked for the mobile empty state `2384:80765` ("01 — Add product / My shop / Empty state — Mobile") to show the Shop Info Card buttons the way its desktop twin `2384:78848` does. Added `Stack / Preview Storefront` `2533:86830` to its card `2384:80776`: Preview Storefront (Outlined) and Publish shop (Primary), both `State=Disabled`, stacked full width with an 8px gap. The disabled eye icon stroke `#d5d5d5` was copied from desktop, and the status line is hidden. This matches `StoreCard.tsx` for "never published, no products". Nothing else in the frame changed.

---

<a id="mobile-design-review-references-sync-script-js"></a>

# SOURCE: `mobile-design-review/references/sync-script.js`

> Step 4 · Review: sync script (diffs screens against the final design)

````js
// Read-only: diff mobile screens against their Final-design reference frames.
// Run through use_figma. Set TARGET_IDS to sections or screens. The reference map
// (REFS) mirrors final-design.md; keep the two in step.
// Returns, per target screen: its archetype, its reference, slot-by-slot differences,
// and any "claude:" annotations the user left in the Work File (the user's marks).
figma.skipInvisibleInstanceChildren = false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('2462:56445')); // flows page (replaced Responsiveness 1802:19394 on 2026-09-28)

const TARGET_IDS = ['REPLACE:ME'];

// archetype → Final-design reference frame (final design = sub-sections 2384:76022 + 2384:77979)
const REFS = {
  'myshop-populated': '2384:80204',
  'myshop-empty': '2384:80765',
  'myshop-favorites': '2384:80509',
  'pdp': '2384:79768',
  'catalogue': '2384:76660',
  'overlay': '2384:78345',
  'page': '2384:80204', // no reference of its own: compare chrome slots only
};
const CHROME_ONLY = new Set(['page', 'overlay', 'pdp']); // our PDPs are full pages; the ref PDP is a modal over My Shop
// Status bar, header and search wrap are governed by the chrome spec (final-design.md,
// reference 2384:87491), not by the archetype frame, since some reference frames still
// carry the old chrome. The Home Indicator is required by the house frame contract, even
// though the reference frames omit it.
const SPEC_SLOTS = new Set(['statusBar', 'header', 'searchWrap', 'homeIndicator']);
const CHROME_SPEC = {
  header: { pad: '16/16/8/16', h: 72 },
  searchWrap: { pad: '0/16/16/16', h: 54 },
};

// Slots are compared by layer name. `top` = direct child of the screen.
const SLOTS = [
  { key: 'statusBar', re: /^status bar/i, top: true, chrome: true },
  { key: 'header', re: /^header$/i, top: true, chrome: true },
  { key: 'searchWrap', re: /^search wrap/i, top: true, chrome: true },
  { key: 'content', re: /^(page )?content$/i, top: true, chrome: true },
  { key: 'footer', re: /^footer\/mobile/i, top: true, chrome: true },
  { key: 'homeIndicator', re: /^home indicator/i, top: true, chrome: true },
  { key: 'shopWrapper', re: /^shop content wrapper/i },
  { key: 'shopInfoCard', re: /^shop info card/i },
  { key: 'tabBar', re: /^tab bar/i },
  { key: 'yourPicksToolbar', re: /^content toolbar/i },
  { key: 'addProductCard', re: /^add product (slot|tile)/i },
  { key: 'tabsSection', re: /^tabs and content section/i },
];

function visible(n, root) { let p = n; while (p && p !== root) { if (p.visible === false) return false; p = p.parent; } return true; }
function hasText(s, re) { return !!s.findOne(n => n.type === 'TEXT' && visible(n, s) && re.test(n.characters.trim())); }

// Order matters: catalogue and PDP screens are drawn over a My Shop underlay,
// so they must be recognised before the My Shop archetypes.
function archetype(s) {
  const hasChrome = s.children.some(c => /^header$/i.test(c.name.trim())) ||
    !!s.findOne(c => /^header$/i.test(c.name.trim()) && c.parent && c.parent.parent === s);
  if (Math.round(s.height) <= 812 && s.findOne(n => visible(n, s) && /^(popup|backdrop|scrim|stack wrapper|container wrapper|options list)/i.test(n.name.trim()))) return 'overlay';
  if (!hasChrome) return 'unstructured'; // sheets/filters without the standard chrome layers
  if (hasText(s, /^product details$/i)) return 'pdp';
  if (hasText(s, /categories$/i) && hasText(s, /^brands$/i)) return 'catalogue';
  if (hasText(s, /your shop is empty/i)) return 'myshop-empty';
  const shop = hasText(s, /^my shop$/i);
  if (shop && hasText(s, /^your picks$/i)) return 'myshop-populated';
  if (shop) return 'myshop-favorites';
  return 'page';
}

function slotInfo(s, slot) {
  // Top slots may sit one level down, inside a dialog's page underlay.
  const n = slot.top ? (s.children.find(c => slot.re.test(c.name.trim())) ||
                        s.findOne(c => slot.re.test(c.name.trim()) && c.parent && c.parent.parent === s))
                     : s.findOne(c => slot.re.test(c.name.trim()) && visible(c, s));
  if (!n || n.visible === false) return null;
  const o = { id: n.id, h: Math.round(n.height) };
  if (slot.top) o.index = s.children.indexOf(n);
  if ('layoutMode' in n && n.layoutMode !== 'NONE') {
    o.pad = `${n.paddingTop}/${n.paddingRight}/${n.paddingBottom}/${n.paddingLeft}`;
    o.gap = n.primaryAxisAlignItems === 'SPACE_BETWEEN' ? 'auto' : n.itemSpacing;
  }
  return o;
}

async function fingerprint(s) {
  const fp = {};
  for (const slot of SLOTS) fp[slot.key] = slotInfo(s, slot);
  return fp;
}

function isMobile(n) { return (n.type === 'FRAME' || n.type === 'INSTANCE') && n.width >= 360 && n.width <= 400 && n.height >= 600; }
function collect(n, out) { if (isMobile(n)) { out.push(n); return; } if ('children' in n) for (const c of n.children) collect(c, out); }

async function marks(s) {
  const out = [];
  const nodes = [s, ...s.findAll(n => 'annotations' in n && n.annotations && n.annotations.length)];
  for (const n of nodes) {
    if (!('annotations' in n) || !n.annotations) continue;
    n.annotations.forEach((a, i) => {
      const text = (a.labelMarkdown || a.label || '').trim();
      if (/^claude\s*:/i.test(text)) out.push({ node: n.id, name: n.name.trim(), index: i, text: text.replace(/^claude\s*:\s*/i, '') });
    });
  }
  return out;
}

const refCache = {};
async function ref(arch) {
  if (!refCache[arch]) {
    const n = await figma.getNodeByIdAsync(REFS[arch]);
    refCache[arch] = n ? { id: n.id, name: n.name.trim(), fp: await fingerprint(n) } : { id: REFS[arch], missing: true };
  }
  return refCache[arch];
}

const screens = [], missing = [];
for (const id of TARGET_IDS) { const n = await figma.getNodeByIdAsync(id); if (!n) missing.push(id); else collect(n, screens); }

const results = [];
for (const s of screens) {
  const arch = archetype(s);
  if (arch === 'unstructured') {
    results.push({ id: s.id, name: s.name.trim(), h: Math.round(s.height), archetype: arch, ref: null,
      diffs: ['no standard Header/Search wrap/Content layers: compare by screenshot'], marks: await marks(s) });
    continue;
  }
  const r = await ref(arch);
  const fp = await fingerprint(s);
  const diffs = [];
  // Chrome spec check (applies to every archetype with chrome).
  for (const [key, spec] of Object.entries(CHROME_SPEC)) {
    const a = fp[key];
    if (!a) { if (key === 'header') diffs.push('header: MISSING (chrome spec)'); continue; }
    if (a.pad !== spec.pad || a.h !== spec.h) diffs.push(`${key} (${a.id}): pad ${a.pad} h${a.h} → chrome spec ${spec.pad} h${spec.h}`);
  }
  if (!fp.statusBar) diffs.push('statusBar: MISSING (frame contract)');
  if (!fp.homeIndicator && arch !== 'overlay') diffs.push('homeIndicator: MISSING (frame contract)');
  if (!r.missing) {
    for (const slot of SLOTS) {
      if (SPEC_SLOTS.has(slot.key) || arch === 'overlay') continue; // overlays: chrome spec only
      if (CHROME_ONLY.has(arch) && !slot.chrome) continue;
      if (arch === 'overlay' && slot.key === 'footer') continue; // hidden behind the popup by house rule
      const a = fp[slot.key], b = r.fp[slot.key];
      if (!a && !b) continue;
      if (!a) { diffs.push(`${slot.key}: MISSING (reference has it)`); continue; }
      if (!b) { diffs.push(`${slot.key}: EXTRA (${a.id}, reference has none)`); continue; }
      const parts = [];
      if (a.pad !== b.pad) parts.push(`pad ${a.pad} → ${b.pad}`);
      if (a.gap !== b.gap) parts.push(`gap ${a.gap} → ${b.gap}`);
      if (slot.chrome && a.h !== b.h && !['content', 'footer'].includes(slot.key)) parts.push(`h ${a.h} → ${b.h}`);
      if (parts.length) diffs.push(`${slot.key} (${a.id}): ${parts.join(', ')}`);
    }
    // chrome order: the top-level slot sequence must match the reference
    const order = f => SLOTS.filter(x => x.top && f[x.key] && x.key !== 'homeIndicator').sort((x, y) => f[x.key].index - f[y.key].index).map(x => x.key).join('>');
    const ro = order(r.fp), to = order(fp);
    if (!CHROME_ONLY.has(arch) && ro !== to) diffs.push(`order: ${to} → ${ro}`);
  }
  results.push({ id: s.id, name: s.name.trim(), h: Math.round(s.height), archetype: arch, ref: r.id, diffs, marks: await marks(s) });
}
return { screens: results.length, missing, refs: Object.fromEntries(Object.entries(refCache).map(([k, v]) => [k, v.name || 'MISSING'])), results };
````

---

<a id="mobile-design-review-references-audit-script-js"></a>

# SOURCE: `mobile-design-review/references/audit-script.js`

> Step 4 · Review: audit script

````js
// Read-only production-readiness audit for URMEI mobile screens. Run through use_figma.
// Set ROOT_IDS to sections, flows or single screens. Every mobile frame
// (360–400 wide) found under them is audited. Nothing is modified.
// Set CHECKS to limit which areas run, e.g. ['spacing', 'type'].
figma.skipInvisibleInstanceChildren = false;
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('2462:56445')); // flows page (replaced Responsiveness 1802:19394 on 2026-09-28)

const ROOT_IDS = ['REPLACE:ME'];
const CHECKS = ['frame', 'spacing', 'type', 'color', 'components', 'layout', 'targets', 'naming'];
const INCLUDE_INSTANCE_INTERNALS = false; // component internals are reliably bound
const GUTTER = 16;
const MIN_TARGET = 44;
const CAP = 25; // max samples per finding list, to keep the payload small

const CORE = new Set([0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 64]);
const LEGACY = new Set([2, 10, 14]);
const CHROME = /^(status bar|home indicator|cursor)/i;
const OVERLAY = /^(cursor|tost|toast|badge|dot|scrim|backdrop|overlay)/i;
const FULL_BLEED = /(header|footer|search ?wrap|image|backdrop|scrim|overlay|tost|toast|banner|popup|sheet|divider)/i;
const INTERACTIVE = /(button|btn|close|chip|pill|tab|checkbox|radio|toggle|dropdown|pagination|icon ?button|link|menu item|options)/i;
const COMPONENT_LIKE = /^(button|tost|toast|header|search|pagination|footer|status bar|home indicator|checkbox|radio|toggle|tab|chip|badge|breadcrumb)\b/i;
const DEFAULT_NAME = /^(frame|group|rectangle|ellipse|vector|union|subtract|intersect|mask group|line|polygon|star|image)\s*\d*$/i;
const PLACEHOLDER_COPY = /(lorem|ipsum|^text$|^label$|^button$|^title$|^placeholder|dummy|xxx|tbd)/i;
const on = k => CHECKS.includes(k);

const varNames = new Map();
async function boundName(node, field) {
  const alias = node.boundVariables && node.boundVariables[field];
  if (!alias) return null;
  const id = Array.isArray(alias) ? alias[0] && alias[0].id : alias.id;
  if (!id) return null;
  if (!varNames.has(id)) {
    const v = await figma.variables.getVariableByIdAsync(id);
    varNames.set(id, v ? v.name : '?');
  }
  return varNames.get(id);
}

function scaleClass(v) {
  const r = Math.round(v * 100) / 100;
  if (CORE.has(r)) return 'core';
  if (LEGACY.has(r)) return 'legacy';
  return 'off-scale';
}

function pathOf(node, screen) {
  const parts = [];
  let n = node;
  while (n && n !== screen) { parts.unshift(n.name.trim()); n = n.parent; }
  return parts.slice(-4).join(' › ');
}

function insideInstance(node, screen) {
  let p = node.parent;
  while (p && p !== screen) { if (p.type === 'INSTANCE') return true; p = p.parent; }
  return false;
}

function topSolid(paints) {
  if (!Array.isArray(paints)) return null;
  for (let i = paints.length - 1; i >= 0; i--) {
    const p = paints[i];
    if (p.visible === false) continue;
    if (p.type === 'SOLID' && (p.opacity == null || p.opacity > 0.95)) return p.color;
    if (p.type === 'IMAGE' || p.type.startsWith('GRADIENT')) return 'complex';
  }
  return null;
}

function lum(c) {
  const f = x => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
function contrast(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100;
}
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');

function backgroundOf(node, screen) {
  let p = node.parent;
  while (p) {
    const bg = 'fills' in p ? topSolid(p.fills) : null;
    if (bg) return bg;
    if (p === screen) break;
    p = p.parent;
  }
  return { r: 1, g: 1, b: 1 };
}

function isMobileScreen(n) {
  return (n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE') &&
    n.width >= 360 && n.width <= 400 && n.height >= 600;
}
function collectScreens(node, out) {
  if (isMobileScreen(node)) { out.push(node); return; }
  if ('children' in node) for (const c of node.children) collectScreens(c, out);
}

async function auditScreen(screen) {
  const sb = screen.absoluteBoundingBox;
  const lists = {};
  const add = (k, rec) => { (lists[k] = lists[k] || []).push(rec); };
  const r = {
    id: screen.id, name: screen.name.trim(),
    size: `${Math.round(screen.width)}×${Math.round(screen.height)}`,
    frame: {}, gutter: null, spacingHistogram: {}, fonts: {}, textStyles: {}, counts: {},
  };
  const bump = (obj, k) => { obj[k] = (obj[k] || 0) + 1; };

  // Frame + chrome.
  if (on('frame')) {
    r.frame.widthOk = Math.round(screen.width) === 375;
    r.frame.heightOk = screen.height >= 812;
    r.frame.heightHugs = 'layoutMode' in screen && screen.layoutMode !== 'NONE' ? screen.primaryAxisSizingMode === 'AUTO' : 'no auto layout';
    for (const c of screen.children) {
      const nm = c.name.trim();
      if (/^status bar/i.test(nm)) r.frame.statusBar = { id: c.id, type: c.type, y: Math.round(c.y), h: Math.round(c.height), atTop: Math.abs(c.y) < 1 };
      if (/^home indicator/i.test(nm)) r.frame.homeIndicator = { id: c.id, type: c.type, h: Math.round(c.height), atBottom: Math.abs(c.y + c.height - screen.height) < 1 };
    }
    r.frame.statusBar = r.frame.statusBar || 'MISSING';
    r.frame.homeIndicator = r.frame.homeIndicator || 'MISSING';
  }

  // Page gutter: the topmost full-width, padded auto-layout Content/Wrapper frame.
  if (on('spacing')) {
    const top = n => (n.absoluteBoundingBox ? n.absoluteBoundingBox.y : 0);
    let best = null;
    screen.findAll(n => n.type === 'FRAME' && n.layoutMode !== 'NONE' && n.paddingLeft > 0 &&
        /content|wrapper|body|main/i.test(n.name) && n.width >= screen.width - 1)
      .forEach(n => { if (!best || top(n) < top(best)) best = n; });
    if (best) {
      r.gutter = {
        node: best.id, name: best.name.trim(), left: best.paddingLeft, right: best.paddingRight,
        leftVar: await boundName(best, 'paddingLeft'), rightVar: await boundName(best, 'paddingRight'),
      };
    }
  }

  const stack = [{ node: screen, depth: 0 }];
  while (stack.length) {
    const { node, depth } = stack.pop();
    const nm = node.name.trim();
    if (node !== screen && CHROME.test(nm)) continue;
    const inInst = node !== screen && insideInstance(node, screen);
    const ownLevel = !inInst || INCLUDE_INSTANCE_INTERNALS;
    const bb = node.absoluteBoundingBox;

    if (node.visible === false) {
      if (!inInst) { bump(r.counts, 'hiddenLayers'); if (on('naming')) add('hiddenLayers', { node: node.id, path: pathOf(node, screen) }); }
      continue;
    }

    // Spacing.
    if (on('spacing') && ownLevel && 'layoutMode' in node && node.layoutMode !== 'NONE') {
      const fields = ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing'];
      if (node.layoutWrap === 'WRAP') fields.push('counterAxisSpacing');
      for (const f of fields) {
        const v = node[f];
        if (v == null || (f === 'itemSpacing' && node.primaryAxisAlignItems === 'SPACE_BETWEEN')) continue;
        bump(r.spacingHistogram, Math.round(v));
        const cls = scaleClass(v);
        const bound = await boundName(node, f);
        const rec = { node: node.id, path: pathOf(node, screen), field: f, value: v, bound };
        if (cls === 'off-scale') add('offScaleSpacing', rec);
        else if (cls === 'legacy' && depth <= 3) add('legacySpacing', rec);
        if (!bound && v > 0 && depth <= 3 && node.type !== 'INSTANCE') add('unboundSpacing', rec);
      }
    }
    if (on('spacing') && ownLevel && 'children' in node && node.type !== 'INSTANCE' && node.type !== 'GROUP' &&
        (!('layoutMode' in node) || node.layoutMode === 'NONE') && node.children.length > 1) {
      const kids = node.children.filter(k => k.visible !== false && !CHROME.test(k.name.trim())).sort((a, b) => a.y - b.y);
      for (let i = 1; i < kids.length; i++) {
        const gap = Math.round(kids[i].y - (kids[i - 1].y + kids[i - 1].height));
        if (gap > 0 && gap < 200 && scaleClass(gap) === 'off-scale') {
          add('offScaleSiblingGaps', { parent: node.id, path: pathOf(node, screen), between: [kids[i - 1].name.trim(), kids[i].name.trim()], gap });
        }
      }
    }

    // Typography + copy + contrast.
    if (node.type === 'TEXT') {
      bump(r.counts, 'text');
      const txt = node.characters;
      if (on('type')) {
        const style = node.textStyleId;
        if (style === figma.mixed) add('mixedTextStyle', { node: node.id, path: pathOf(node, screen), text: txt.slice(0, 40) });
        else if (!style) { if (ownLevel) add('noTextStyle', { node: node.id, path: pathOf(node, screen), text: txt.slice(0, 40) }); }
        else {
          const s = await figma.getStyleByIdAsync(style);
          bump(r.textStyles, s ? s.name : 'remote/unknown');
        }
        const fam = node.fontName === figma.mixed ? 'mixed' : node.fontName.family;
        bump(r.fonts, fam);
        if (fam !== 'Figtree') add('nonHouseFont', { node: node.id, path: pathOf(node, screen), font: fam, text: txt.slice(0, 40) });
        const size = node.fontSize === figma.mixed ? null : node.fontSize;
        if (size != null && size < 12) add('smallText', { node: node.id, path: pathOf(node, screen), size, text: txt.slice(0, 40) });
        if (node.textAutoResize === 'NONE' && node.textTruncation !== 'ENDING') {
          add('fixedTextBoxNoTruncation', { node: node.id, path: pathOf(node, screen), text: txt.slice(0, 40) });
        }
        if (/featured/i.test(txt)) add('featuredWording', { node: node.id, path: pathOf(node, screen), text: txt.slice(0, 60) });
        if (PLACEHOLDER_COPY.test(txt.trim())) add('placeholderCopy', { node: node.id, path: pathOf(node, screen), text: txt.slice(0, 40) });
      }
      if (on('color')) {
        const fg = topSolid(node.fills);
        const bg = backgroundOf(node, screen);
        if (fg && fg !== 'complex') {
          if (bg === 'complex') add('textOverImage', { node: node.id, path: pathOf(node, screen), text: txt.slice(0, 40) });
          else {
            const ratio = contrast(fg, bg);
            const size = node.fontSize === figma.mixed ? 14 : node.fontSize;
            const weight = node.fontWeight === figma.mixed ? 400 : node.fontWeight;
            const need = size >= 18 || (size >= 14 && weight >= 700) ? 3 : 4.5;
            if (ratio < need) add('lowContrastText', { node: node.id, path: pathOf(node, screen), fg: hex(fg), bg: hex(bg), ratio, need, text: txt.slice(0, 40) });
          }
        }
      }
    }

    // Colour tokens.
    if (on('color') && ownLevel && node !== screen && 'fills' in node) {
      for (const key of ['fills', 'strokes']) {
        const paints = node[key];
        if (!Array.isArray(paints) || !paints.some(p => p.type === 'SOLID' && p.visible !== false)) continue;
        const styleId = key === 'fills' ? node.fillStyleId : node.strokeStyleId;
        const bound = node.boundVariables && node.boundVariables[key] && node.boundVariables[key].length;
        if (!bound && !styleId) {
          bump(r.counts, 'unboundColors');
          const c = topSolid(paints);
          add('unboundColor', { node: node.id, path: pathOf(node, screen), key, color: c && c !== 'complex' ? hex(c) : '?' });
        }
      }
    }

    // Components.
    if (on('components') && node !== screen) {
      if (node.type === 'INSTANCE' && !inInst) {
        bump(r.counts, 'instances');
        const main = await node.getMainComponentAsync();
        if (!main) add('missingMainComponent', { node: node.id, path: pathOf(node, screen) });
        // The walk doesn't enter instances, so check their labels' copy here.
        if (on('type') && !INCLUDE_INSTANCE_INTERNALS) {
          for (const t of node.findAll(n => n.type === 'TEXT' && n.visible !== false)) {
            const txt = t.characters.trim();
            if (/featured/i.test(txt)) add('featuredWording', { node: t.id, path: pathOf(t, screen), text: txt.slice(0, 60) });
            if (PLACEHOLDER_COPY.test(txt)) add('placeholderCopy', { node: t.id, path: pathOf(t, screen), text: txt.slice(0, 40) });
          }
        }
      }
      if (node.type === 'FRAME' && !inInst && COMPONENT_LIKE.test(nm)) {
        add('likelyDetached', { node: node.id, path: pathOf(node, screen), name: nm });
      }
      if (!inInst && 'opacity' in node && node.opacity < 1 && node.opacity > 0 && INTERACTIVE.test(nm)) {
        add('opacityAsState', { node: node.id, path: pathOf(node, screen), opacity: node.opacity });
      }
    }

    // Layout / handoff readiness.
    if (on('layout') && ownLevel && node !== screen) {
      if ('children' in node && node.type === 'FRAME' && node.layoutMode === 'NONE' && node.children.length > 1 && depth <= 3) {
        add('noAutoLayout', { node: node.id, path: pathOf(node, screen), children: node.children.length });
      }
      if (node.layoutPositioning === 'ABSOLUTE' && !OVERLAY.test(nm)) {
        add('absoluteInAutoLayout', { node: node.id, path: pathOf(node, screen) });
      }
      const parent = node.parent;
      if (parent && 'layoutMode' in parent && parent.layoutMode === 'VERTICAL' && 'layoutSizingHorizontal' in node &&
          node.layoutSizingHorizontal === 'FIXED') {
        const inner = parent.width - parent.paddingLeft - parent.paddingRight;
        if (Math.abs(node.width - inner) < 1 && inner > 200) add('fixedShouldFill', { node: node.id, path: pathOf(node, screen), width: Math.round(node.width) });
      }
      if ('fills' in node && Array.isArray(node.fills) && node.fills.some(p => p.type === 'IMAGE' && p.visible !== false && !p.imageHash)) {
        add('emptyImageFill', { node: node.id, path: pathOf(node, screen) });
      }
      if (bb && sb && (bb.x + bb.width < sb.x || bb.x > sb.x + sb.width || bb.y > sb.y + sb.height)) {
        add('offFrameNode', { node: node.id, path: pathOf(node, screen) });
      }
      if (bb && (bb.width < 0.5 || bb.height < 0.5) && node.type !== 'LINE' && node.type !== 'VECTOR') {
        add('zeroSizeNode', { node: node.id, path: pathOf(node, screen) });
      }
    }

    // Edge huggers + touch targets.
    if (on('targets') && bb && node !== screen) {
      const interactive = node.type === 'INSTANCE' && INTERACTIVE.test(nm) && !inInst;
      if (node.type === 'TEXT' || interactive) {
        let p = node, bleed = false;
        while (p && p !== screen) { if (FULL_BLEED.test(p.name)) { bleed = true; break; } p = p.parent; }
        const left = Math.round(bb.x - sb.x), right = Math.round(sb.x + sb.width - (bb.x + bb.width));
        if (!bleed && (left < GUTTER || right < GUTTER) && left >= -1 && right >= -1 && bb.width < screen.width) {
          add('insideGutter', { node: node.id, path: pathOf(node, screen), left, right });
        }
      }
      if (interactive && (bb.height < MIN_TARGET || bb.width < MIN_TARGET)) {
        add('smallTarget', { node: node.id, path: pathOf(node, screen), w: Math.round(bb.width), h: Math.round(bb.height) });
      }
      if (interactive && r.frame.homeIndicator && r.frame.homeIndicator !== 'MISSING' && bb.y + bb.height > sb.y + sb.height - 34) {
        add('inHomeIndicatorZone', { node: node.id, path: pathOf(node, screen) });
      }
    }

    // Naming.
    if (on('naming') && !inInst && node !== screen && DEFAULT_NAME.test(nm)) bump(r.counts, 'defaultNames');

    if ('children' in node && (node.type !== 'INSTANCE' || INCLUDE_INSTANCE_INTERNALS || node === screen)) {
      for (const c of node.children) stack.push({ node: c, depth: depth + 1 });
    }
  }

  r.findings = {};
  for (const [k, v] of Object.entries(lists)) r.findings[k] = { count: v.length, samples: v.slice(0, CAP) };
  return r;
}

// Figma nodes throw on unknown properties, so missing roots are tracked separately.
const screens = [], missing = [];
for (const id of ROOT_IDS) {
  const n = await figma.getNodeByIdAsync(id);
  if (!n) { missing.push(id); continue; }
  collectScreens(n, screens);
}
const results = [];
for (const s of screens) results.push(await auditScreen(s));
return { screenCount: results.length, missing, checks: CHECKS, results };
````

---

<a id="mobile-screen-references-archive-plan-profile-settings-notification-md"></a>

# SOURCE: `mobile-screen/references/archive/plan-profile-settings-notification.md`

> Step 6 · Archive: Profile Settings & Notification build plan

# Mobile plan — [Influencer] Profile Settings & Notification (`2375-62087`)

> **Archived 2026-09-28: built.** Kept for history. Node ids predate the page move; see `../../../_shared/workfile.md` for current ones.

Status: **built** (2026-09-25). See the catalog entry in `existing-mobile-screens.md`. This follows the `/mobile-screen` new-flow workflow, steps 1–3.

## Decisions (user)

- **Placement:** build **inside this section**, 50px beside each desktop. Run `/organize-flow` on it afterwards.
- **Notifications:** a **full-screen panel** (375 wide, header "NOTIFICATIONS" + ✕) over a dimmed My Shop mobile.
- **Footer:** **add the mobile footer** `2321-52957` to the Manage Account screens. This means adding it to the reused `2004-22278` / `2024-22599` copies too.
- **Wording:** "Favorite", title case, as elsewhere. Cursors mirror the desktop's.

## Sources to reuse

- **Manage Account template:**
  - `2004-22278` (Profile — Mobile) and `2024-22599` (Social Accounts — Mobile). Each has Status Bar, Header, bank-details `notification-banner`, the breadcrumb, "Manage Your Account", and a **tab strip** (Profile · Addresses · Social Accounts · Bank Details) in place of the desktop's left-hand menu.
- **Sheets:** the bottom-sheet `popup` from `2230-77536` / `2366-61376`.
- **Fields:** text fields from `2004-22278`, and mobile address rows from the Apply form (`2126-17660` area).
- **Underlay for notifications:** My Shop `2368-62138` (700 · 700 · S$845 · S$845 · S$0, matching the desktop underlay).
- **Chrome and parts:** mobile footer `2321-52957`, cursor `2344:77335`, success toast `2332-38320`, error toast `2348-55780`.

## Screens

| # | Desktop | Bucket | Mobile |
|---|---|---|---|
| 01.1 | Notifications — Empty State `2375-62091` | Adapt + New | Panel restacked from the desktop drawer: bell + "No Notifications Yet!" |
| 01.2 | Notifications — With Items `2375-62170` | Adapt | Panel with date groups, icon wells, times, and unread tint |
| 02.1 | Profile — Edit Form `2375-62289` | Reuse | `2004-22278` checked against the desktop, plus the footer |
| 02.2 | Social Accounts — Connected `2375-62554` | Reuse | `2024-22599` checked, plus the footer |
| 02.3 | Bank Details — Empty State `2375-62447` | Adapt | Bank Details tab selected, with the desktop's empty state restacked |
| 02.4 | Bank Details — Add Details Modal `2375-62488` | Adapt | Full-height bottom sheet with the bank form in one column and Cancel / Save |
| 02.5 | Bank Details — Connected `2375-62382` | Adapt | Bank account card restacked, with edit and delete |
| 02.6 | Addresses — empty state `2375-62627` | Adapt | Addresses tab with the "No address added" empty state |
| 02.7 | Add address — first address `2375-62662` | Adapt | Sheet with the address fields and the shipping/billing checkboxes |
| 02.8 | Addresses — Set As `2375-62735` | Adapt | Address cards with the Set As menu open, and the **cursor** |
| 02.9 | Set As pop-up `2375-62881` | Adapt | Small bottom sheet with the default shipping/billing checkboxes |
| 02.10 | Addresses — set `2375-62813` | Adapt | Cards with the Default badges |

The rows follow `/organize-flow`:
- **Row 1:** Notification.
- **Row 2:** Profile & Settings happy path (02.1–02.5).
- **Row below that:** the Address sub-flow (02.6–02.10).

The stray loose text `2375-62626` ("Bank details") gets flagged, not deleted.

---

<a id="mobile-screen-references-archive-plan-sample-request-and-review-md"></a>

# SOURCE: `mobile-screen/references/archive/plan-sample-request-and-review.md`

> Step 6 · Archive: Sample Request & Review build plan

# Mobile plan — Sample Request & Review a Product

> **Archived 2026-09-28: built.** Kept for history. Node ids predate the page move; see `../../../_shared/workfile.md` for current ones.

Status: **built** (2026-09-25) inside the user's copy of the board on Responsiveness (`2384-65541`), not in the 01–10 column. See `existing-mobile-screens.md`. This follows the `/mobile-screen` new-flow workflow, steps 1–3.

- **Reference:** main file `cehltPtMoGWEtKbF7k3MQQ`, board `1030:27074`: 11 sub-flows, 35 desktop screens, 4 developer notes.
- **Work File copy of the board:** `2248-21224` on the page "Sample Request & Review Product" (`2248:20562`). No mobile frames exist yet.

## Decisions (user)

- **Placement:** **copy the board to Responsiveness** as new section(s) in the right-hand column, below `10 - Stats Breakdown`, and build the mobiles there (50px beside each desktop). Run `/organize-flow` afterwards. Numbering would continue at **11**.
- **Rating:** **bottom sheet** with the 1–10 scale.
- **Review form:** **full-height bottom sheet** for every state.
- **Developer notes:** keep **once, beside the desktop**; don't duplicate them for mobile.
- **Cursors:** mirror the desktop's. **Wording:** "Favorite", title case.

## Sources to reuse (Work File)

- **Account menu:** `2126-20651` (Onboarding 07).
- **Product pages:**
  - in-shop, with What Creators Say and the review CTA: `2360-57678`
  - catalogue, with Request Sample: `2320-46453`
- **Sheets:** `popup` from `2230-77536` / `2366-61376`. Product summary block: `2320-45094`.
- **Fields and addresses:** text fields from `2004-22278`, and address rows from the Apply form (`2126-17660` area).
- **Toasts:** success `2332-38320`, error `2348-55780`.
- **Chrome and templates:** footer `2321-52957`, cursor `2344:77335`, storefront preview `2368-62381` (the template for the long public PDP).
- **Desktop restack recipe:** see `mobile-screen/SKILL.md` gotchas.

## Screens by sub-flow

| Sub-flow (main-file section) | Desktop | Bucket | Mobile |
|---|---|---|---|
| 01 Sample Requests `1030:27076` | 01 Account Menu, 02 Request List, 03/04 Pending Request Details, 06 Shipped Request Details | Reuse + New | Account menu = `2126-20651`. **Request list** and **request details** (status pill, product row, timeline, tracking) are restacked from their desktops. These become the base for 06, 07 and 08 |
| 02 Request a Sample: Happy Path `1030:27669` | 3 screens | Adapt | `2320-46453` PDP, then the request **sheet** (summary, quantity, address, Confirm), then the requested state with a toast |
| 03 Request a Sample: No Address `1030:28125` | 2 | Adapt | The same sheet with the missing-address warning and Confirm disabled |
| 04 Change Shipping Address `1030:28438` | 2 | Adapt | Request sheet → full-height **address sheet** |
| 05 Add Shipping Address `1030:28763` | 2 | Adapt | Address sheet, empty and then filled |
| 06 Cancel a Request `1030:27424` | 3 | Adapt | Details → confirm sheet → cancelled state with a toast |
| 07 Rejected Request `1030:27601` | 1 | Adapt | Details with the rejected banner |
| 08 Write a Review `1030:30661` | 8 (01, 02, 03a, 03b, 04, 04a, 05, 06) | Adapt + New | Delivered details → rating sheet → review-form sheet for each state → submitted ("Your review · n/10") |
| PDP Creator Review Section `1030:29091` | 1 (1440×5347) | New | Restacked like `2368-62381`: gallery, details, creator reviews carousel, recommendations, footer |
| Creator Adding Product Review `1030:29148` | 4 | Reuse + Adapt | Account menu, review request default/active, and the PDP with the review sheet |
| Creator Reviews List View `1030:30185` | 3 | Reuse + New | Account menu, **Your Reviews list** restacked (photos under the text), and the PDP reviews display |

**Build order:** 01 first (it creates the request list and details base), then 02–08, then the three review sub-flows. Finish with `/organize-flow` on the new sections.

---

<a id="mobile-design-review-references-archive-handoff-2026-09-25-md"></a>

# SOURCE: `mobile-design-review/references/archive/handoff-2026-09-25.md`

> Step 6 · Archive: 2026-09-25 review handoff

# Mobile design review — handoff (2026-09-25)

> **Archived 2026-09-28.** The open items moved to `../readiness-log.md` → "Open decisions". Node ids here predate the page move (`1802:19394` → `2462:56445`).

Figma Work File `FdmVPJo1j4t8s9gej1H7Yb`, page **Responsiveness** `1802:19394`.
Skill: `/mobile-design-review`. The rules are in `.claude/skills/mobile-design-review/references/` (`final-design.md`, `readiness-log.md`).

## Status

Every flow section on the page has been synced, reviewed and fixed. **Mobile frames only:** no desktop frame, nothing in the final design section `2384:76021`, no code and no git were touched.

I spot-checked three frames after the fixes: 03.2 Publish confirm, Help Center FAQ and 08.3 Remove confirm. Sections 03–10 are restacked in the column at 200px gaps, with no section overlaps on the page.

Every section is marked **Fixing** in `readiness-log.md`. None is **Ready** yet, because the decisions below are still open.

## Rules in force

- **The desktop says *what* a screen contains; the final design says *how* it looks.** Desktop-only differences are parity notes, not fixes.
- **Never edit desktop frames or the final design** (`2384:76021`). Clone from them only.
- **Gap fills stay.** Where the final design doesn't show something, the labelled "Gap fill" rules in `final-design.md` apply. A later final design replaces them.
- **Source-of-truth order:** final design → approved Decisions → house values → main-file mobile board → desktop (coverage only).

## What was fixed

| Section | Node | Main fixes |
|---|---|---|
| Profile Settings & Notification | `2375:62087` | House header and search bar on 10 screens. Sheets use the sticky button bar above the home indicator. Spacing 48/32. Scrolling tabs. 72 text styles. Contrast. 73 tokens. Copy. New screens: 02.11 Delete Bank Details `2422:63734` and 02.12 Delete Address `2422:63841` |
| 03 Publish Shop | `2230:78005` | The 3 publish confirms are now centred dialogs. The 03.2 underlay is now a copy of 03.1 (`2426:223385`). "Featured" → "Favorite" on 14 screens. The banner copy is rewritten and passes contrast |
| 04 Add Favorite Product | `2061:41656` | "Featured" wording, text styles, one gap (18 → 16) |
| 05 Remove Favorite | `2248:33651` | Product-page spacing (Content pb 24, footer 48, variants 16), contrast, styles, "appear" |
| 06 Reorder Favorite | `2344:77290` | Same fixes as 05. Row 2 moved down 24 |
| 07 Copy Affiliate Link | `2344:78578` | Same fixes as 05, plus "TOTAL UNITS SOLD" and the review note's contrast |
| 08 Remove Product | `2364:57473` | The 08.3 confirm is now a centred dialog. Stats-tile contrast, styles |
| 09 Shop Preview | `2364:57887` | Storefront contrast, top padding 40 → 24, "About me:" |
| 10 Stats Breakdown | `2364:58157` | Page Content 24/…/48 with bound gutters (9 frames), contrast, "★ Favorite", rows reflowed |
| Onboarding & Home | `2126:17061` | Chrome spec on Home, Help Center and Recent Activities; 4 footers added. Login/OTP gutter 24 → 16. Logout is now a centred dialog. Lorem ipsum replaced with the app's FAQ text. Copy typos |
| Sample Request & Review | `2384:65541` | 10 footers. 12 sheets end 8 above the home indicator. The 05.2 long form uses the sticky bar. The 06.2 cancel confirm is a centred dialog. 3 close buttons replaced with instances. 41 styles, 34 tokens, copy fixes |

## Decisions needed (start here on Monday)

1. **Grey stats labels:** keep them darker or revert? Four of the five review passes darkened `#757575` → `secondary/800` on light-grey cards, which passes contrast. The 03–04 pass left them alone, because the final design uses `#757575` on those same cards. By the source-of-truth order, the final design wins, so the strict reading is to revert where the final design shows the element.
2. **Red banner text (Sample Request 06–07):** keep or undo? That pass darkened the text under a gap fill it had only *proposed*, before approval.
3. **Favorites cap:** section 04 shows 6 slots (`/6`), but the final design `2384:80509` and `limits.ts` allow 4. Matching means removing two cards.
4. **Product page figures:** the same product shows different stats and sections on 05.3 and 07.3. Which one is canonical?
5. **Early "Add a review" link:** Sample Request 01.2 shows it on Requested, Approved and Shipped items, but the app only allows a review after delivery. This is a product question.
6. **Locked profile fields (02.1):** the desktop draws first name, last name and email as locked, while mobile has them editable. This is a parity note only, so nothing was changed.
7. **Dialog body padding:** 02.11 and 02.12 use 0/16/16/20, while the final design and 03.x use 16 on all sides. Align them?
8. **Proposed gap fills** (not rules yet; approve or reject each):
   - Meaningful text in `#b1b1b1` on a light surface → `secondary/700`. Placeholders and disabled labels are exempt.
   - Every non-confirm centred dialog gets the `2384:78407` close ✕ (e.g. Change Language).
   - Text on a `#fdecec` alert banner → `primary/1000`, with the red icon and tint kept.
   - Down-trend % text on a tinted tile → `secondary/800`, with the ▼ kept red.
   - Text on the `#f2efed` rank footer → `secondary/800`. This would override the final design's `/700`.

## Left open on purpose

- **Touch targets under 44px** (38px buttons, 40px ✕, 42px tabs): house style, so add 44px hit areas in code.
- **`MetricsCard` contrast** (section 10) is inside a component the desktop also uses.
- **The red "4%" trend** is 3.57:1, and no darker alert token exists (see proposed gap fill 4).
- **The storefront pagination** is a detached frame, and no Pagination component exists to swap to.
- **The "Cancel Request" outlined destructive button** is 3.76:1 contrast, which is a library variant issue.
- **11.2 ratings** ("8/10" etc.) are 14px SemiBold, and the library has no matching style.
- **Four hidden "1" labels** on 02.2 got a stray 12px style override. They're invisible, so there's no visual effect.
- **Copy fixed on mobile only:** the desktop and the code still have the old wording: 5 MB vs 2 MB, "notification they will show up here", "URMEI send", "started following on URMEI", and the Help Center typos.
- **The 02.7 Add Address sheet:** the checkboxes now sit below the scroll fold. A scrolled-state frame could show them.

## Missing states (desktop lacks them too; listed, not drawn)

- **Profile & Settings:** save/add success toasts, form inline errors, the profile form filled with Save enabled, the keyboard open.
- **03 Publish:** publishing/loading, network error, keyboard over search.
- **05–07:** long PDP name, menu dismiss, reorder loading.
- **08–10:** remove error, stats loading, stats empty list.
- **Onboarding:** OTP wrong/expired code, invalid email, apply-form errors, Recent Activities empty, Home loading.
- **Sample Request:** list loading, submit error, keyboard on the review form.

## To resume

1. Answer the decisions above. Approved gap fills go into `final-design.md` under "Final-design patterns and gap fills".
2. Apply the answers with `/mobile-design-review` on the affected sections.
3. Draw any missing states you want, using the final-design patterns.
4. Mark sections **Ready** in `readiness-log.md` once they have no open P1 or P2, and you agree.

---

# Regenerating

This file is a verbatim bundle. After you edit any source in `responsive-workflow-urmei/` (`_shared/`, `responsive-flow/`, `mobile-screen/`, `organize-flow/`, `mobile-design-review/`), rebuild the bundle so it stays in sync. Ask Claude to "regenerate the responsive-workflow skill". It concatenates the sources in the order of the Contents list above.
