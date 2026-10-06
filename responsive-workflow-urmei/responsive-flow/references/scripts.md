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
