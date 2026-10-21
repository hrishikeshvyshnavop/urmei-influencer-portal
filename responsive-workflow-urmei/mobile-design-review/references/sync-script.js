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
