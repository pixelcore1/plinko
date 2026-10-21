/* Plinko reward model: the single source of truth for prizes, odds, heat, win tiers and the outcome.
   Used by the game (prototype/) and by the documentation page (design-system/index.html).

   Formulas (also in the docs, section "Prizes and odds"):
   - Board: 8 rows, 9 bins. A fair board sends the ball left or right at each row with p = 0.5,
     so the chance of bin k (k = 0..8, from the left edge) is binomial: P(k) = C(8, k) / 2^8.
     Edge to centre: 1/256 (0.39 %), 8/256 (3.13 %), 28/256 (10.94 %), 56/256 (21.88 %), 70/256 (27.34 %).
   - Value unit: 1x = today's base prize = 10 Free Spins = 2K GC value.
   - Bin value in units: m(k). The prize shown in a bin = m(k) x base prize (rounded), or a named prize.
   - Average per drop (expected value): EV = sum over k of P(k) x m(k). It is about 1.0x at every risk level,
     so risk changes how the value is spread, not how much the player gets on average.
   - Win tier by value: mega = edge bin; big = m >= 2 in an inner bin; small = everything else. */

export const ROWS = 8;
export const BINS = ROWS + 1;

/** n choose k */
export const choose = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };
/** Chance of each bin, left to right: C(8, k) / 256 */
export const BIN_CHANCE = Array.from({ length: BINS }, (_, k) => choose(ROWS, k) / 2 ** ROWS);

/** Today's prize (the base of every multiplier). Config: B2Spin sets it per day and per region. */
export const BASE_PRIZE = { amount: 10, unit: 'FS', name: 'Free Spins', icon: 'free-spins', image: 'img-reward-free-spins', gcValue: 2000 };

/** Prize per bin, from the edge to the centre (bins 0..4); bins 5..8 mirror them. m = value in units (1x = base prize). */
export const RISK = {
  low: {
    label: 'Low', caption: 'Frequent small wins',
    edge: { kind: 'ticket', m: 3, name: '+3 Tickets', short: '3 Tickets', image: 'img-reward-ticket', icon: 'ticket', contents: [{ amount: '3', label: 'Tickets', image: 'img-reward-ticket' }] },
    inner: [{ m: 1.5 }, { m: 1.1 }, { m: 1.0 }, { m: 0.8 }],
  },
  medium: {
    label: 'Medium', caption: 'Balanced. Bigger edges',
    edge: { kind: 'gift', m: 12, name: 'Gift box', short: 'Gift box', image: 'img-reward-gift-box', icon: 'gift', contents: [{ amount: '60', label: 'Free Spins', image: 'img-reward-free-spins' }, { amount: '10K', label: 'Gold Coins', image: 'img-reward-gold-coins' }, { amount: '1', label: 'Collectable', image: 'img-reward-collectable' }] },
    inner: [{ m: 3 }, { m: 1.3 }, { m: 0.7 }, { m: 0.5 }],
  },
  high: {
    label: 'High', caption: 'Rare big wins. Smaller centre',
    edge: { kind: 'chest', m: 30, name: 'Treasure chest', short: 'Treasure chest', image: 'img-reward-chest-open', icon: 'chest', contents: [{ amount: '150', label: 'Free Spins', image: 'img-reward-free-spins' }, { amount: '24K', label: 'Gold Coins', image: 'img-reward-gold-coins' }, { amount: '1', label: 'Rare collectable', image: 'img-reward-collectable-rare' }] },
    inner: [{ m: 4, gc: 8000 }, { m: 1.3 }, { m: 0.4 }, { m: 0.2 }],
  },
};
export const RISK_ORDER = ['low', 'medium', 'high'];

/** Heat (bin colour) by value: dull slate below the base, then yellow, amber, red; pink for the edges. */
export const heatOf = (bin) => bin.edge ? 'mega' : bin.m >= 3 ? 'hot' : bin.m >= 1.3 ? 'warm' : bin.m >= 1 ? 'mild' : bin.m >= 0.7 ? 'cool' : 'cold';

/** The 9 bins of a risk level, left to right, with display data. */
export function binsFor(risk) {
  const r = RISK[risk];
  const half = [{ ...r.edge, edge: true }, ...r.inner];
  const all = [...half, ...half.slice(0, -1).reverse()];
  return all.map((b, k) => {
    const bin = { ...b, index: k, chance: BIN_CHANCE[k] };
    bin.heat = heatOf(bin);
    if (b.edge) { bin.label = b.name; bin.amount = b.short; }
    else if (b.gc) { bin.label = `${b.gc / 1000}K Gold Coins`; bin.amount = `${b.gc / 1000}K`; bin.unit = 'Gold Coins'; bin.image = 'img-reward-gold-coins'; }
    else { const fs = Math.round(b.m * BASE_PRIZE.amount); bin.label = `${fs} ${BASE_PRIZE.name}`; bin.amount = String(fs); bin.unit = BASE_PRIZE.name; bin.image = BASE_PRIZE.image; }
    bin.tier = tierOf(bin);
    return bin;
  });
}

/** Win tier by value, not by position */
export const tierOf = (bin) => bin.edge ? 'mega' : bin.m >= 2 ? 'big' : 'small';

/** Expected value per drop in units: EV = sum P(k) x m(k) */
export const expectedValue = (risk) => binsFor(risk).reduce((s, b) => s + b.chance * b.m, 0);

/** Odds table rows for the Rules and odds drawer: one row per distinct prize, edge first */
export function oddsTable(risk) {
  const bins = binsFor(risk), rows = [];
  for (let k = 0; k <= 4; k++) {
    const b = bins[k], n = k === 4 ? 1 : 2, p = b.chance * n;
    rows.push({ bin: b, bins: n === 1 ? 'Centre bin' : (k === 0 ? '2 edge bins' : '2 bins'), chance: p, oneIn: Math.round(1 / p) });
  }
  return rows;
}

/* Outcome: decided BEFORE the animation, never by physics. In production the server does this.
   mulberry32 is a small seeded RNG, so a seed in the URL replays the same results (debug and tests). */
export function rng(seed = (Math.random() * 2 ** 32) >>> 0) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Pick a bin with the natural odds of the board. `force` ('small' | 'big' | 'mega' | number) is for the demo panel only. */
export function decideOutcome(risk, random, force = null) {
  const bins = binsFor(risk);
  if (typeof force === 'number') return bins[force];
  if (force) {
    const pool = bins.filter((b) => b.tier === force);
    if (pool.length) return pool[Math.floor(random() * pool.length)];
  }
  let x = random();
  for (const b of bins) { if ((x -= b.chance) < 0) return b; }
  return bins[4];
}

export const fmtPct = (p) => String(parseFloat((p * 100).toFixed(2))) + '%';
