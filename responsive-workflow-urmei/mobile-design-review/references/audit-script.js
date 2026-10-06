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
