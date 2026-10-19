// Regenerates SKILL.md in this folder: every responsive workflow source, verbatim,
// in workflow order. Run from anywhere: `node workflows/responsive-workflow/build.mjs`.
// To add a source, add it to SECTIONS; never edit SKILL.md by hand.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..') // workflows/

// [source path relative to workflows/, step label, contents-list caption]
const SECTIONS = [
  ['responsive-flow/SKILL.md', 'Step 0 · Automate', 'the responsive-flow skill (link in, mobile screens out, one approval stop)'],
  ['responsive-flow/references/scripts.md', 'Step 0 · Automate', 'the reusable scripts for each stage'],
  ['_shared/workfile.md', 'Step 1 · Setup', 'the Work File, pages, locked frames, components, tokens, product rules'],
  ['_shared/figma-gotchas.md', 'Step 1 · Setup', 'use_figma script traps and recipes'],
  ['mobile-screen/SKILL.md', 'Step 2 · Build', 'the mobile-screen skill (frame contract, new-flow reuse)'],
  ['mobile-screen/references/responsive-system.md', 'Step 2 · Build', 'breakpoints, type ramp, desktop-to-mobile rules'],
  ['mobile-screen/references/mobile-inventory.md', 'Step 2 · Build', 'current mobile frame ids by section'],
  ['mobile-screen/references/existing-mobile-screens.md', 'Step 2 · Build', 'Work File mobile frames by flow, with build notes'],
  ['mobile-screen/references/main-file-mobile-flows.md', 'Step 2 · Build', "the main design file's mobile board and building blocks"],
  ['organize-flow/SKILL.md', 'Step 3 · Organize', 'the organize-flow skill'],
  ['figma-refine/SKILL.md', 'Step 3 · Organize', 'the figma-refine skill (Sentence case layers, lossless structure cleanup)'],
  ['mobile-design-review/SKILL.md', 'Step 4 · Review', 'the mobile-design-review skill'],
  ['mobile-design-review/references/final-design.md', 'Step 4 · Review', 'the final design, source-of-truth order, chrome reference'],
  ['mobile-design-review/references/spacing-rules.md', 'Step 4 · Review', 'spacing rules'],
  ['mobile-design-review/references/production-checklist.md', 'Step 4 · Review', 'production-readiness checklist'],
  ['mobile-design-review/references/readiness-log.md', 'Step 5 · Track', 'readiness log and open decisions'],
  ['mobile-design-review/references/design-problems.md', 'Step 5 · Track', 'open-problems summary compiled from the readiness log'],
  ['mobile-design-review/references/sync-script.js', 'Step 4 · Review', 'sync script (diffs screens against the final design)'],
  ['mobile-design-review/references/audit-script.js', 'Step 4 · Review', 'audit script'],
  ['mobile-screen/references/archive/plan-profile-settings-notification.md', 'Step 6 · Archive', 'Profile Settings & Notification build plan'],
  ['mobile-screen/references/archive/plan-sample-request-and-review.md', 'Step 6 · Archive', 'Sample Request & Review build plan'],
  ['mobile-design-review/references/archive/handoff-2026-09-25.md', 'Step 6 · Archive', '2026-09-25 review handoff'],
]

const anchor = (path) => path.replace(/[/.]/g, '-').toLowerCase()
const today = new Date().toISOString().slice(0, 10)

const header = `---
name: responsive-workflow
description: The complete URMEI responsive (mobile 375px) design workflow in one file. It merges every responsive skill and reference (mobile-screen, organize-flow, mobile-design-review, the shared Work File reference and Figma gotchas, the inventories, logs and scripts) verbatim, in workflow order. Use when the user runs /responsive-workflow, or asks for the whole responsive process end to end: set up, build mobile screens, organize flow sections, review and fix to production readiness, and hand off, in the Figma Work File (FdmVPJo1j4t8s9gej1H7Yb).
---

# URMEI responsive workflow (all-in-one)

This file puts every responsive skill and reference into one file, **verbatim**, in the order you use them. Generated on ${today} from \`workflows/\` by \`workflows/responsive-workflow/build.mjs\`. **The source files are still the ones to edit.** If a source changes, rerun the script rather than editing the copies below.

Load \`figma:figma-use\` before any \`use_figma\` call. Relative links inside the copied files (\`references/…\`, \`../_shared/…\`) point at the original files, and every one of them is also copied below.

## The workflow

| Step | What you do | Parts below |
|---|---|---|
| **0. Automate** | Paste a flow link: read, plan (one approval stop), build, cursors, layout, verify, review, record. It runs steps 1–5 for you. | responsive-flow skill · scripts |
| **1. Setup** | Read the Work File reference. Check the locked ids exist. Learn the script traps. | workfile.md · figma-gotchas.md |
| **2. Build** | Build or adapt mobile screens. Reuse main-file designs and clone existing frames. | mobile-screen skill · references |
| **3. Organize** | Rename layers, number and lay out the screens, tidy the sections. | organize-flow skill |
| **4. Review and fix** | Sync to the final design, run the production-readiness review, apply the approved fixes. | mobile-design-review skill · references and scripts |
| **5. Track** | Log each section's status and open decisions. | readiness-log.md · design-problems.md |
| **6. History** | Finished plans and old handoffs, for context only. | archive |

Standing rules (from the user; details in the parts below):
- Build and edit only in the Work File. Write to the main design file (\`cehltPtMoGWEtKbF7k3MQQ\`) only after an explicit go-ahead, and then only on its Responsive Design page \`794:24650\`, mobile only.
- Never edit the locked final design (\`2384:76022\`, \`2384:77979\`) or \`2320:42706\`, and never edit desktop frames unless asked.
- Never delete layers in Figma: hide, rename or move them instead.
- The final design says how a screen looks. The desktop says what it contains.

## Contents

${SECTIONS.map(([path, step, caption]) => `- [${step.split(' · ')[1]}: ${caption}](#${anchor(path)}) — \`${path}\``).join('\n')}
`

const body = SECTIONS.map(([path, step, caption]) => {
  const src = readFileSync(join(root, path), 'utf8').replace(/\r\n/g, '\n').trimEnd()
  const content = path.endsWith('.js') ? '````js\n' + src + '\n````' : src
  return `<a id="${anchor(path)}"></a>\n\n# SOURCE: \`${path}\`\n\n> ${step}: ${caption}\n\n${content}\n`
})

const footer = `# Regenerating

This file is a verbatim bundle. After you edit any source in \`workflows/\` (\`_shared/\`, \`responsive-flow/\`, \`mobile-screen/\`, \`organize-flow/\`, \`mobile-design-review/\`), run \`node workflows/responsive-workflow/build.mjs\`. It concatenates the sources in the order of its \`SECTIONS\` list, which is also the Contents list above.
`

writeFileSync(join(here, 'SKILL.md'), [header, ...body, footer].join('\n---\n\n'))
console.log(`responsive-workflow/SKILL.md: ${SECTIONS.length} sources bundled`)
