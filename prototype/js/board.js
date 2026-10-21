/* Board renderer: pegs, ball and trail on a canvas; chance strip and bins in the DOM.
   The drop result is decided before this runs (main.js -> model.decideOutcome). This file only shows it. */

import { geometry, buildDrop, sample, timeScaleAt, PHYSICS } from '../../design-system/js/physics.js';
import { binsFor, BIN_CHANCE } from '../../design-system/js/model.js';
import { icon } from '../../design-system/js/icons.js';

const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export class Board {
  constructor(root) {
    this.root = root;
    this.playfield = root.querySelector('.playfield');
    this.canvas = this.playfield.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.strip = this.playfield.querySelector('.chance-strip');
    this.row = this.playfield.querySelector('.bin-row');
    this.frame = root.querySelector('.frame');
    this.bulbs = root.querySelector('.frame__bulbs');
    this.chute = root.querySelector('.chute');
    this.ball = new Image(); this.ball.src = '../design-system/assets/img/img-ball@2x.webp';
    this.ball.onload = () => this.draw();
    this.hits = new Map();      // "r:j" -> time of hit
    this.trail = [];
    this.pos = null;            // ball position, null = idle under the chute
    this.landedAt = 0;
    this.hidden = false;
    this.reduced = false;
    this.strip.innerHTML = BIN_CHANCE.map((p) => `<i class="chance-bar" style="--h:${(8 + 92 * p / BIN_CHANCE[4]).toFixed(1)}%"></i>`).join('');
    this.row.innerHTML = '<div class="bin" role="listitem"><span class="bin-content"></span></div>'.repeat(9);
    new ResizeObserver(() => this.layout()).observe(this.playfield);
    this.layout();
  }

  layout() {
    const r = { width: this.playfield.clientWidth, height: this.playfield.clientHeight };
    if (!r.width || !r.height) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(r.width * this.dpr); this.canvas.height = Math.round(r.height * this.dpr);
    // Prototype only: 2/3 of a ball between the last row and the bins, and between the ball in the chute and the first row.
    const third = (2 / 3) * 2 * PHYSICS.ballRadius;
    this.geo = geometry(r.width, r.height, { lastGapBase: PHYSICS.pegRadius + third, topClearBase: third });
    this.pegLayer = null;
    const g = this.geo, left = g.pad + 2, width = 9 * g.s - 4;
    Object.assign(this.row.style, { left: left + 'px', width: width + 'px', bottom: g.pad + 'px' });
    Object.assign(this.strip.style, { left: left + 'px', width: width + 'px', bottom: g.pad + g.binH + 4 + 'px', height: Math.round(94 * g.scale) + 'px' });
    this.layoutBulbs();
    this.draw();
  }

  /** 54 bulbs around the frame, none in the corners; pink and gold alternate */
  layoutBulbs() {
    const f = { width: this.frame.offsetWidth, height: this.frame.offsetHeight }, o = 11, W = f.width, H = f.height;
    const nx = Math.max(4, Math.round((W - 2 * o) / 25.8)), ny = Math.max(4, Math.round((H - 2 * o) / 25.8));   // 54 bulbs at 358 x 430, as in Figma
    const pts = [];
    for (let i = 1; i < nx; i++) pts.push([o + i * (W - 2 * o) / nx, o]);
    for (let j = 1; j < ny; j++) pts.push([W - o, o + j * (H - 2 * o) / ny]);
    for (let i = nx - 1; i > 0; i--) pts.push([o + i * (W - 2 * o) / nx, H - o]);
    for (let j = ny - 1; j > 0; j--) pts.push([o, o + j * (H - 2 * o) / ny]);
    this.bulbs.innerHTML = pts.map((p, i) => `<i class="bulb ${i % 2 ? 'bulb--gold' : 'bulb--pink'}" style="left:${p[0].toFixed(1)}px;top:${p[1].toFixed(1)}px;--odd:${i % 2};--n:${i % 4}"></i>`).join('');
  }

  /** Fill the bins for a risk level. animate = slot reel (Interaction/bins-reel): every bin spins through
      prizes from all risk levels and stops on the new prize, from the centre out. onStop(i) fires as each bin stops. */
  setBins(risk, animate = false, onStop = () => {}) {
    const bins = binsFor(risk);
    const pool = ['low', 'medium', 'high'].flatMap((r) => binsFor(r));
    const content = (b) => (b.edge ? icon(b.icon, 'sm') : b.gc ? icon('coin', 'xs') + b.amount : b.amount);
    const cls = (b) => 'bin-content' + (b.edge ? ' bin-content--edge' : b.gc ? ' bin-content--gc' : '');
    const ms = (name, fb) => { const v = css(name); return v ? parseFloat(v) * (v.endsWith('ms') ? 1 : 1000) : fb; };
    const dur = ms('--motion-bins-reel-duration', 800), step = ms('--motion-bins-reel-stagger-duration', 90);
    const easing = css('--motion-bins-reel-easing') || 'ease-out';
    const gen = (this.reelGen = (this.reelGen || 0) + 1);   // a newer risk change wins; old reels must not write old prizes
    this.reels?.forEach((a) => a.cancel());
    this.reels = [];
    [...this.row.children].forEach((el, i) => {
      const b = bins[i];
      const apply = () => {
        el.dataset.heat = b.heat;
        el.setAttribute('aria-label', b.label);
        el.innerHTML = `<span class="${cls(b)}">${content(b)}</span>`;
      };
      if (!animate || this.reduced || !el.animate) { apply(); return; }
      const d = Math.abs(i - 4), n = 7 + 2 * d;                 // edges spin longer and pass more prizes
      const h = el.clientHeight || 40;
      const cur = el.querySelector('.bin-content');
      const items = [cur ? cur.outerHTML : ''];
      for (let k = 0; k < n; k++) { const r = pool[(i * 7 + k * 5 + d) % pool.length]; items.push(`<span class="${cls(r)}">${content(r)}</span>`); }
      items.push(`<span class="${cls(b)}">${content(b)}</span>`);
      const after = pool[(i + 3) % pool.length]; items.push(`<span class="${cls(after)}">${content(after)}</span>`);   // seen during the overshoot
      el.innerHTML = `<span class="bin-reel" style="--reel-h:${h}px"><span class="bin-reel__strip">${items.join('')}</span></span>`;
      const strip = el.querySelector('.bin-reel__strip');
      const to = -(n + 1) * h;
      const a = strip.animate([
        { transform: 'translateY(0)', filter: 'blur(0)' },
        { transform: `translateY(${to * 0.25}px)`, filter: 'blur(1.2px)', offset: 0.2 },
        { transform: `translateY(${to * 0.85}px)`, filter: 'blur(0.6px)', offset: 0.7 },
        { transform: `translateY(${to}px)`, filter: 'blur(0)' },
      ], { duration: dur + d * step, easing, fill: 'forwards' });
      // the heat colour changes as the reel slows down, so the colour "lands" with the prize
      const heat = setTimeout(() => { el.dataset.heat = b.heat; }, (dur + d * step) * 0.6);
      a.onfinish = () => { clearTimeout(heat); if (gen !== this.reelGen) return; apply(); el.classList.remove('is-reel-stop'); void el.offsetWidth; el.classList.add('is-reel-stop'); onStop(i); };
      a.oncancel = () => { clearTimeout(heat); };
      this.reels.push(a);
    });
    this.bins = bins;
  }

  /** Win build-up on the frame before the result card: 'big' = bulbs flare (State=Flare),
      'mega' = the frame turns gold and every bulb flares gold (State=Celebrate). Resolves when the build-up ends. */
  buildUp(tier) {
    const cls = tier === 'mega' ? 'is-celebrate' : 'is-flare';
    const v = css(tier === 'mega' ? '--motion-win-buildup-duration' : '--motion-win-buildup-big-duration');
    const ms = v ? parseFloat(v) * (v.endsWith('ms') ? 1 : 1000) : (tier === 'mega' ? 600 : 350);
    this.frame.classList.remove('is-flare', 'is-celebrate');
    void this.frame.offsetWidth;
    this.frame.classList.add(cls);
    return new Promise((r) => setTimeout(r, ms));
  }
  endBuildUp() { this.frame.classList.remove('is-flare', 'is-celebrate'); }

  clearBinStates() {
    this.endBuildUp();
    [...this.row.children].forEach((el) => el.classList.remove('is-hit', 'is-anticipation'));
    [...this.strip.children].forEach((el) => el.classList.remove('is-hit'));
  }

  setDimmed(on) {
    const changed = this.hidden !== on;
    this.root.classList.toggle('is-dimmed', on);
    this.frame.classList.toggle('is-dimmed', on);
    this.hidden = on;
    if (changed) { this.pos = null; this.trail = []; }   // a landed ball stays in its bin until the next drop
    this.draw();
  }

  resetBall() { this.pos = null; this.trail = []; this.landedAt = 0; this.clearBinStates(); this.draw(); }

  /** Run the drop to bin k. on(event) gets 'release', 'peg', 'last-rows', 'land', 'settled'. Resolves when the ball settles. */
  drop(k, random, on = () => {}) {
    this.clearBinStates();
    const drop = buildDrop(this.geo, k, random);
    const events = drop.events.slice();
    this.frame.classList.add('is-active');
    this.chute.classList.add('is-releasing');
    on({ type: 'release', drop });
    let t = 0, last = performance.now();
    this.landedAt = 0;
    return new Promise((resolve) => {
      const step = (now) => {
        const dt = Math.min((now - last) / 1000, 0.05); last = now;
        t += dt * timeScaleAt(drop, t, this.reduced);
        while (events.length && events[0].t <= t) {
          const e = events.shift();
          if (e.type === 'peg') { this.hits.set(e.row + ':' + e.j, now); if (e.row === 0) this.chute.classList.remove('is-releasing'); }
          if (e.type === 'last-rows') {
            const rights = drop.dirs.slice(0, e.t ? 6 : 6).filter((d) => d > 0).length;
            for (let b = rights; b <= rights + 2; b++) this.row.children[b]?.classList.add('is-anticipation');
          }
          if (e.type === 'land') {
            this.frame.classList.remove('is-active');
            this.clearBinStates();
            this.row.children[k].classList.add('is-hit');
            this.strip.children[k].classList.add('is-hit');
          }
          on(e);
          if (e.type === 'settled') { this.landedAt = now; }
        }
        this.pos = sample(drop, Math.min(t, drop.duration));
        if (!this.reduced) { this.trail.push({ x: this.pos.x, y: this.pos.y }); if (this.trail.length > 8) this.trail.shift(); }
        this.draw(now);
        if (t < drop.duration) requestAnimationFrame(step);
        else { this.trail = []; this.loopLanded(); resolve(drop); }
      };
      requestAnimationFrame(step);
    });
  }

  /** Landed ball: the glow breathes (Interaction/pulse, 1.6 s) until the next drop */
  loopLanded() {
    const tick = (now) => { if (!this.landedAt || this.reduced) { this.draw(now); return; } this.draw(now); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  draw(now = performance.now()) {
    const c = this.ctx, g = this.geo; if (!g) return;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.clearRect(0, 0, g.W, g.H);
    const idle = css('--plinko-peg-idle') || '#ccc', hit = css('--plinko-peg-hit') || '#fdd04a';
    const pr = PHYSICS.pegRadius * Math.min(g.scale, 1.1);
    // Idle pegs with their glow are drawn once into a cached layer (shadowBlur is expensive); only hit pegs are drawn per frame
    if (!this.pegLayer || this.pegLayer.width !== this.canvas.width || this.pegLayer.height !== this.canvas.height) {
      const L = document.createElement('canvas'); L.width = this.canvas.width; L.height = this.canvas.height;
      const lc = L.getContext('2d'); lc.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      lc.shadowColor = 'rgba(255,255,255,0.45)'; lc.shadowBlur = 6; lc.fillStyle = idle;
      for (const row of g.rows) for (const p of row) { lc.beginPath(); lc.arc(p.x, p.y, pr, 0, Math.PI * 2); lc.fill(); }
      this.pegLayer = L;
    }
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(this.pegLayer, 0, 0); c.restore();
    for (const [key, h] of this.hits) {
      const k = Math.max(0, 1 - (now - h) / 300);
      if (k <= 0) { this.hits.delete(key); continue; }
      const [r, j] = key.split(':').map(Number), p = g.rows[r][j];
      c.save(); c.shadowColor = hit; c.shadowBlur = 6 + 6 * k; c.fillStyle = mix(idle, hit, k);
      c.beginPath(); c.arc(p.x, p.y, pr * (1 + 0.25 * k), 0, Math.PI * 2); c.fill(); c.restore();
    }
    if (this.hidden) return;
    const br = PHYSICS.ballRadius * g.scale;
    const pos = this.pos || { x: g.cx, y: g.startY };
    // trail (plinko/ball Falling): fades and narrows behind the ball
    const glow = css('--plinko-ball-fill') || '#fdd04a';
    this.trail.forEach((p, i) => {
      const a = (i + 1) / (this.trail.length + 1);
      c.globalAlpha = a * 0.35; c.fillStyle = glow;
      c.beginPath(); c.arc(p.x, p.y, br * (0.45 + 0.5 * a), 0, Math.PI * 2); c.fill();
    });
    c.globalAlpha = 1;
    // glow (Glow/Ball, Glow/Ball landed pulse)
    let gl = 16;
    if (this.landedAt && !this.reduced) gl = 18 + 8 * (0.5 - 0.5 * Math.cos(((now - this.landedAt) / 1600) * Math.PI * 2));
    c.save(); c.shadowColor = 'rgba(253,208,74,0.75)'; c.shadowBlur = gl;
    if (this.ball.complete && this.ball.naturalWidth) c.drawImage(this.ball, pos.x - br, pos.y - br, br * 2, br * 2);
    else { c.fillStyle = glow; c.beginPath(); c.arc(pos.x, pos.y, br, 0, Math.PI * 2); c.fill(); }
    c.restore();
  }

  /** Centre of bin k in viewport coordinates (for the toast and the coin burst) */
  binPoint(k) {
    const el = this.row.children[k].getBoundingClientRect();
    return { x: el.left + el.width / 2, y: el.top };
  }
}

function mix(a, b, t) {
  const p = (h) => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map((x) => x + x).join(''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
  try { const A = p(a), B = p(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; } catch { return b; }
}
