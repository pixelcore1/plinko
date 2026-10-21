// Figma -> CSS export, step 1 of 2. Read-only: it changes nothing in the Figma file.
// Run inside Figma through the Figma connector (use_figma) or as a plugin script. Save the returned text to
// scripts/figma-export/variables-*.txt and styles.txt, then run: python3 scripts/build-tokens.py
//
// Every variable is written with its code syntax name (Figma > variable > Code syntax > Web), one block per collection and mode.
// Aliases are kept as var(--target). Numbers are written raw ("N:value:scopes") and get units in build-tokens.py.
// MODE: 'variables-primitives' | 'variables-rest' | 'styles'

const MODE = 'variables-rest';

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const all = await figma.variables.getLocalVariablesAsync();
const byId = new Map(all.map((v) => [v.id, v]));
const r = (x) => Math.round(x * 1000) / 1000;
const h2 = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
const cssName = (v) => { const w = v.codeSyntax && v.codeSyntax.WEB; return w ? w.replace(/^var\((.*)\)$/, '$1').trim() : '--MISSING-' + v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); };
const col = (c, a) => (a !== undefined && a < 0.999 ? `rgb(${Math.round(c.r * 255)} ${Math.round(c.g * 255)} ${Math.round(c.b * 255)} / ${r(a)})` : '#' + h2(c.r) + h2(c.g) + h2(c.b));

function val(v, raw) {
  if (raw && raw.type === 'VARIABLE_ALIAS') { const t = byId.get(raw.id); return t ? `var(${cssName(t)})` : 'BROKEN'; }
  if (v.resolvedType === 'COLOR') return col(raw, raw.a);   // alpha primitives (alias + opacity) are rebuilt as color-mix() in build-tokens.py
  if (v.resolvedType === 'STRING') return `"${raw}"`;
  if (v.resolvedType === 'BOOLEAN') return raw ? 1 : 0;
  if (raw && typeof raw === 'object') { if (raw.type === 'LINEAR') return 'linear'; const b = raw.easingFunctionCubicBezier; if (b) return `cubic-bezier(${r(b.x1)}, ${r(b.y1)}, ${r(b.x2)}, ${r(b.y2)})`; return 'OBJ' + JSON.stringify(raw); }
  return 'N:' + r(raw) + ':' + (v.scopes || []).join(',');
}

if (MODE.startsWith('variables')) {
  const want = (c) => (MODE === 'variables-primitives' ? c.name === 'Primitives' : c.name !== 'Primitives');
  let out = '';
  for (const c of cols.filter(want)) {
    for (const m of c.modes) {
      out += `\n/* ${c.name} / ${m.name} */\n`;
      for (const id of c.variableIds) {
        const v = byId.get(id), raw = v.valuesByMode[m.modeId];
        if (m.modeId !== c.defaultModeId && JSON.stringify(raw) === JSON.stringify(v.valuesByMode[c.defaultModeId])) continue;
        out += `${cssName(v)}: ${val(v, raw)}; /*${v.name}*/\n`;
      }
    }
  }
  return out;
}

// styles: text (T), paint (P) and effect (E) styles with their variable bindings
const cn = (id) => { const v = byId.get(id); return v ? cssName(v) : null; };
const out = [];
for (const s of await figma.getLocalTextStylesAsync()) {
  const b = s.boundVariables || {}, bv = (k) => (b[k] ? 'var(' + cn(b[k].id) + ')' : null);
  out.push(`T|${s.name}|${s.fontName.family} ${s.fontName.style}|size ${bv('fontSize') || s.fontSize}|w ${bv('fontWeight') || ''}|lh ${s.lineHeight.unit === 'AUTO' ? 'auto' : r(s.lineHeight.value) + s.lineHeight.unit}|ls ${r(s.letterSpacing.value)}${s.letterSpacing.unit}|case ${s.textCase}|fam ${bv('fontFamily') || ''}`);
}
for (const s of await figma.getLocalPaintStylesAsync()) {
  const ps = s.paints.map((p) => {
    if (p.type === 'SOLID') return 'solid ' + (p.boundVariables && p.boundVariables.color ? 'var(' + cn(p.boundVariables.color.id) + ')' : col(p.color, p.opacity));
    if (p.type.startsWith('GRADIENT')) return p.type + ' T[' + p.gradientTransform.map((row) => row.map(r).join(',')).join(';') + '] ' + p.gradientStops.map((st) => (st.boundVariables && st.boundVariables.color ? 'var(' + cn(st.boundVariables.color.id) + ')' : col(st.color, st.color.a)) + ' ' + Math.round(st.position * 100) + '%').join(', ');
    return p.type;
  });
  out.push(`P|${s.name}|${ps.join(' || ')}`);
}
for (const s of await figma.getLocalEffectStylesAsync()) {
  const es = s.effects.map((e) => {
    const b = e.boundVariables || {}, bv = (k) => (b[k] ? 'var(' + cn(b[k].id) + ')' : null);
    if (e.type.includes('BLUR')) return e.type + ' ' + (bv('radius') || e.radius);
    return `${e.type} x${bv('offsetX') || e.offset.x} y${bv('offsetY') || e.offset.y} b${bv('radius') || e.radius} s${bv('spread') || e.spread || 0} ${bv('color') || col(e.color, e.color.a)}`;
  });
  out.push(`E|${s.name}|${es.join(' || ')}`);
}
return out.join('\n');
