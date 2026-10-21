/* Plinko drop physics.
   The result is decided first (model.js, natural binomial odds). Physics only shows HOW the ball gets there.

   Model ("path physics"):
   1. Path. A ball that lands in bin k went right k times and left 8 - k times. We shuffle those 8 moves
      at random (Fisher-Yates), so every path to bin k is equally likely. This is exactly how a fair board
      reaches bin k, so the motion is honest: no steering, no magnet, no fake near-miss.
   2. Contact. At each row the ball touches the top of one peg, a little to the side it will bounce to:
      contact = (peg.x + dir x c, peg.y - sqrt(R^2 - c^2)), with R = peg radius + ball radius and c random in [3, 6] px.
   3. Flight between contacts is a projectile under gravity g:
      y(t) = y0 + vy0 t + g t^2 / 2,  x(t) = x0 + vx t.
      The bounce sends the ball up with vy0 = -e |vy_impact| (restitution e random in [0.28, 0.42]).
      Flight time to the next contact (drop dy):  T = (-vy0 + sqrt(vy0^2 + 2 g dy)) / g,  vx = dx / T.
   4. Landing. After row 8 the ball falls into the bin, then settles with 2 small hops (e x 0.5 each time).
   5. Presentation (not physics): the last 2 rows play in slow motion (time scale 0.5), the peg flashes on contact,
      a trail follows the ball. With reduced motion: no slow motion, no trail.
   All lengths scale with the peg spacing s, so the board works at 360, 390 and 430 px. */

import { ROWS } from './model.js';

export const PHYSICS = {
  gravity: 3000,            // px/s^2 at s = 33.6 px (scaled with the board)
  restitution: [0.28, 0.42],
  contactOffset: [3, 6],    // px, how far from the peg top the ball touches
  pegRadius: 4,             // px (plinko/peg is 8 px)
  ballRadius: 10,           // px (plinko/ball is 20 px)
  slowMoRows: 2,            // the last rows play in slow motion
  slowMoScale: 0.5,
  settleHops: 2,
  baseSpacing: 33.6,        // px between pegs in Figma at 390 px
  baseRowGap: 36,           // px between rows in Figma
};

/**
 * Board geometry for a playfield of width W and height H (CSS px).
 * opts.lastGapBase: distance from the last peg row (centre) to the bin top, in Figma px at 390 px.
 * Default 30 (peg radius + one ball + 6). The prototype passes a smaller value to sit the pyramid lower.
 */
export function geometry(W, H, opts = {}) {
  const pad = 6, binH = 40;
  const s = (W - 2 * pad) / 9;
  const cx = W / 2;
  const binTop = H - pad - binH;
  // Row 8 sits just above the bins: peg radius + one ball + 6 px (30 px at 390 px). Rows 36 px apart, less on short boards.
  const lastGapBase = Number.isFinite(opts.lastGapBase) ? opts.lastGapBase : PHYSICS.pegRadius + 2 * PHYSICS.ballRadius + 6;
  const lastGap = lastGapBase * s / PHYSICS.baseSpacing;
  const row7 = binTop - lastGap;
  const rowGap = Math.min(s * PHYSICS.baseRowGap / PHYSICS.baseSpacing, (row7 - 34) / 7);
  const row0 = row7 - 7 * rowGap;
  const rows = [];
  for (let r = 0; r < ROWS; r++) {
    const n = r + 3, y = row0 + r * rowGap;
    rows.push(Array.from({ length: n }, (_, j) => ({ x: cx + (j - (n - 1) / 2) * s, y, r, j })));
  }
  const scale = s / PHYSICS.baseSpacing;
  const binCenters = Array.from({ length: 9 }, (_, k) => cx + (k - 4) * s);
  return { W, H, s, cx, rowGap, rows, binTop, binH, binCenters, startY: Math.min(12 + PHYSICS.ballRadius * s / PHYSICS.baseSpacing - 6, row0 - 14), scale, pad };
}

/** 8 moves (+1 right, -1 left) with exactly k rights, in random order. */
export function planPath(k, random) {
  const dirs = Array.from({ length: ROWS }, (_, i) => (i < k ? 1 : -1));
  for (let i = dirs.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [dirs[i], dirs[j]] = [dirs[j], dirs[i]]; }
  return dirs;
}

const lerp = (a, b, t) => a + (b - a) * t;

/** Build the full drop for bin k: a list of flight segments and timed events. */
export function buildDrop(geo, k, random) {
  const g = PHYSICS.gravity * geo.scale;
  const R = PHYSICS.pegRadius + PHYSICS.ballRadius;
  const dirs = planPath(k, random);
  const segs = [], events = [];
  let x = geo.cx, y = geo.startY, vy = 0, t = 0, offset = 0;

  const fly = (x1, y1, vy0, kind) => {
    const dy = y1 - y;
    const T = (-vy0 + Math.sqrt(vy0 * vy0 + 2 * g * Math.max(dy, 0.01))) / g;
    segs.push({ t0: t, T, x0: x, y0: y, vx: (x1 - x) / T, vy0, g, kind });
    t += T; x = x1; y = y1; vy = vy0 + g * T;
  };

  for (let r = 0; r < ROWS; r++) {
    const n = r + 3, j = Math.round(offset / geo.s + (n - 1) / 2);
    const peg = geo.rows[r][j];
    const c = lerp(...PHYSICS.contactOffset, random()) * geo.scale * dirs[r];
    const cy = peg.y - Math.sqrt(R * R * geo.scale * geo.scale - c * c);
    const e = r === 0 ? 0 : lerp(...PHYSICS.restitution, random());
    fly(peg.x + c, cy, r === 0 ? 0 : -e * Math.abs(vy), 'row');
    events.push({ t, type: 'peg', row: r, j, dir: dirs[r] });
    if (r === ROWS - PHYSICS.slowMoRows - 1) events.push({ t, type: 'last-rows' });
    offset += dirs[r] * geo.s / 2;
  }
  // into the bin
  const restY = geo.binTop - PHYSICS.ballRadius * geo.scale + 6 * geo.scale;
  const bx = geo.binCenters[k];
  fly(bx, restY, -lerp(...PHYSICS.restitution, random()) * Math.abs(vy), 'bin');
  events.push({ t, type: 'land', bin: k });
  // settle hops
  let hop = Math.abs(vy) * 0.18;
  for (let h = 0; h < PHYSICS.settleHops; h++) {
    const T = 2 * hop / g;
    segs.push({ t0: t, T, x0: x, y0: y, vx: 0, vy0: -hop, g, kind: 'settle' });
    t += T; hop *= 0.5;
  }
  events.push({ t, type: 'settled', bin: k });
  return { dirs, segs, events, duration: t, bin: k };
}

/** Ball position at physics time t. */
export function sample(drop, t) {
  const segs = drop.segs;
  let s = segs[segs.length - 1];
  for (const seg of segs) { if (t < seg.t0 + seg.T) { s = seg; break; } }
  const u = Math.min(Math.max(t - s.t0, 0), s.T);
  return { x: s.x0 + s.vx * u, y: s.y0 + s.vy0 * u + 0.5 * s.g * u * u, vx: s.vx, vy: s.vy0 + s.g * u, kind: s.kind };
}

/** Presentation time scale: 1, then slow motion over the last rows. */
export function timeScaleAt(drop, t, reduced = false) {
  if (reduced) return 1;
  const start = drop.events.find((e) => e.type === 'last-rows')?.t ?? Infinity;
  const land = drop.events.find((e) => e.type === 'land')?.t ?? Infinity;
  if (t < start || t > land) return 1;
  const ramp = Math.min((t - start) / 0.08, 1);   // ease into slow motion over 80 ms
  return lerp(1, PHYSICS.slowMoScale, ramp);
}
