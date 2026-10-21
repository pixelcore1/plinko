/* Documentation page: renders foundations, motion catalogue, sound, haptics, physics and components
   from the same data and code the game uses. Bundled to docs.bundle.js by scripts/build.sh. */

import { ICONS, icon } from '../js/icons.js';
import { RISK, RISK_ORDER, BASE_PRIZE, BIN_CHANCE, binsFor, expectedValue, oddsTable, decideOutcome, rng, fmtPct } from '../js/model.js';
import { geometry, buildDrop, sample, timeScaleAt, PHYSICS } from '../js/physics.js';
import { SOUND_MAP, createSound } from '../js/sound.js';
import { HAPTICS, HAPTICS_NOTE, createHaptics } from '../js/haptics.js';
import { createFx } from '../js/fx.js';
import { MOTION, MOTION_PRINCIPLES, DURATIONS, EASINGS, INTERACTIONS, CHOREOGRAPHY } from '../js/motion.js';
// CSS sources as text (esbuild --loader:.css=text), so the docs read the real files, also from file://
import TOKENS_CSS from '../css/tokens.css';
import TYPE_CSS from '../css/type.css';
import COMPONENTS_CSS from '../css/components.css';

const $ = (s, r = document) => r.querySelector(s);
const IMG = 'assets/img/';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const root = getComputedStyle(document.documentElement);
const cssVar = (n) => root.getPropertyValue(n).trim();
const sound = createSound({ base: 'assets/sfx/' });
const haptics = createHaptics();
document.addEventListener('pointerdown', () => sound.unlock(), { capture: true });

/* ---------- Tokens from tokens.css (parsed, so the docs never drift from the code) ---------- */
let TOKENS = [];
async function loadTokens() {
  const seen = new Set();
  for (const m of TOKENS_CSS.matchAll(/(--[\w-]+):\s*([^;]+);/g)) { if (!seen.has(m[1])) { seen.add(m[1]); TOKENS.push([m[1], m[2].trim()]); } }
}
const tokensBy = (re) => TOKENS.filter(([n]) => re.test(n));
const swatch = (n, v) => `<div class="swatch"><i style="--c:var(${n})"></i><span><b>${n}</b>${esc(v)}</span></div>`;

/* ---------- Stats ---------- */
function stats() {
  const comps = COMPONENTS.length;
  $('#stats').innerHTML = [[TOKENS.length || '580+', 'tokens in CSS, all named in Figma'], ['7', 'variable collections, 12 modes'], ['30', 'text styles'], [comps, 'library components documented'], [MOTION.length, 'animations in the catalogue'], [SOUND_MAP.length, 'sound events'], [HAPTICS.length, 'haptic patterns']]
    .map(([a, b]) => `<div class="swatch" style="flex-direction:column;align-items:flex-start;padding:14px"><b style="font-size:28px;font-family:inherit;font-weight:700">${a}</b><span>${b}</span></div>`).join('');
}

/* ---------- Colour ---------- */
function colour() {
  const ramps = ['neutral', 'slate', 'magenta', 'red', 'orange', 'gold', 'green', 'blue', 'purple'];
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  $('#ramps').innerHTML = ramps.map((r) => `<p class="ramp-name">${r[0].toUpperCase() + r.slice(1)}</p><div class="ramp">${steps.map((s, i) => `<div style="background:var(--${r}-${s});color:${i < 5 ? 'var(--black)' : 'var(--white)'}"><b>${s}</b><span>${cssVar(`--${r}-${s}`)}</span></div>`).join('')}</div>`).join('');
  const alphas = ['white', 'black', 'magenta', 'gold'];
  const a = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96];
  $('#alpha').innerHTML = alphas.map((r) => `<p class="ramp-name">${r[0].toUpperCase() + r.slice(1)} Alpha</p><div class="ramp" style="grid-template-columns:repeat(12,1fr);background:repeating-conic-gradient(#333 0 25%, #1a1a1a 0 50%) 0 0/12px 12px">${a.map((s) => `<div style="background:var(--${r}-alpha-${s});color:${r === 'black' ? 'var(--white)' : s > 40 && r !== 'magenta' ? 'var(--black)' : 'var(--white)'}"><b>${s}</b></div>`).join('')}</div>`).join('');
  const sem = tokensBy(/^--(surface|on-surface|outline|elevation|scrim|action|feedback|interaction|background|state)-/);
  $('#semantic').innerHTML = sem.map(([n, v]) => swatch(n, v)).join('');
  const comp = tokensBy(/^--(buttons|links|segments|pills|selection-controls|icon-(default|subtle|muted|disabled|accent|emphasis|inverse|sparkle)|spinner|plinko)-/);
  $('#component-colours').innerHTML = comp.map(([n, v]) => swatch(n, v)).join('');
  $('#heat').innerHTML = ['cold', 'cool', 'mild', 'warm', 'hot', 'mega'].map((h, i) => `<div class="state"><div class="bin" data-heat="${h}" style="width:64px;height:48px"><span class="bin-content">${h === 'mega' ? icon('chest', 'sm') : ['5', '8', '10', '13', '30'][i]}</span></div><small>${h}</small></div>`).join('');
}

/* ---------- Typography ---------- */
function typography() {
  const rows = [...TYPE_CSS.matchAll(/^\.(text-[\w-]+)/gm)].map((m) => m[1]);
  const list = rows.length ? rows : ['text-title-h1', 'text-title-h2', 'text-headline-h3-bold', 'text-body-large-medium', 'text-label-small'];
  $('#type').innerHTML = `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Class</th><th>Specimen</th></tr></thead><tbody>${list.map((c) => `<tr><td><code>.${c}</code></td><td><span class="${c}" style="color:var(--on-surface-default)">${c.includes('button') ? 'Drop again' : c.includes('number') ? '10,000' : 'Today\'s prize: 10 Free Spins'}</span></td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------- Space ---------- */
function space() {
  const sp = tokensBy(/^--spacing-/);
  $('#spacing').innerHTML = sp.map(([n]) => `<div class="bar-spec"><code>${n}</code><i style="width:var(${n})"></i><span>${cssVar(n)}</span></div>`).join('');
  $('#radius').innerHTML = tokensBy(/^--radius-/).map(([n]) => `<div class="state"><div style="width:72px;height:56px;background:var(--surface-container-default);border:1px solid var(--outline-default);border-radius:var(${n})"></div><small>${n.replace('--', '')} ${cssVar(n)}</small></div>`).join('');
  $('#sizes').innerHTML = tokensBy(/^--(icon-size|icon-button-size|blur)-/).map(([n]) => `<div class="bar-spec"><code>${n}</code><i style="width:var(${n});background:var(--gold-300)"></i><span>${cssVar(n)}</span></div>`).join('');
}

/* ---------- Effects ---------- */
function effects() {
  $('#gradients').innerHTML = tokensBy(/^--gradient-/).map(([n]) => `<div class="swatch" style="flex-direction:column;align-items:stretch"><div style="height:72px;border-radius:var(--radius-sm);background:var(${n})"></div><span><b>${n}</b></span></div>`).join('');
  $('#glows').innerHTML = tokensBy(/^--(glow|shadow|text-engraved)/).map(([n]) => `<div class="swatch" style="flex-direction:column;align-items:center;padding:20px 8px 8px"><div style="width:56px;height:40px;border-radius:var(--radius-sm);background:var(--surface-container-default);box-shadow:var(${n})"></div><span style="margin-top:12px"><b>${n}</b></span></div>`).join('');
}

/* ---------- Icons and images ---------- */
function icons() {
  $('#icon-grid').innerHTML = Object.keys(ICONS).map((n) => `<div class="swatch" style="flex-direction:column;gap:8px;padding:14px 6px">${icon(n, 'lg')}<span style="text-align:center"><b>${n}</b></span></div>`).join('');
  const imgs = ['img-ball', 'img-reward-free-spins', 'img-reward-gold-coins', 'img-reward-ticket', 'img-reward-gift-box', 'img-reward-chest', 'img-reward-chest-open', 'img-reward-collectable', 'img-reward-collectable-rare', 'img-coin-a', 'img-coin-b', 'img-status-offline'];
  $('#images').innerHTML = imgs.map((n) => `<div class="swatch" style="flex-direction:column;padding:12px 6px"><img src="${IMG}${n}@2x.webp" alt="" style="width:80px;height:80px;object-fit:contain"><span style="text-align:center"><b>${n}</b></span></div>`).join('');
}

/* ---------- Motion ---------- */
function motion() {
  $('#motion-principles').innerHTML = MOTION_PRINCIPLES.map(([t, d]) => `<h4>${t}</h4><p>${d}</p>`).join('');
  $('#durations').innerHTML = DURATIONS.map(([n, ms]) => `<div class="bar-spec"><code>${n}</code><i style="width:${ms / 2}px"></i><span>${ms} ms</span></div>`).join('');
  $('#easings').innerHTML = EASINGS.map(([n, b, use]) => {
    const [x1, y1, x2, y2] = b, P = (x, y) => `${(x * 100).toFixed(1)},${(100 - y * 100).toFixed(1)}`;
    return `<button class="curve" type="button" data-ease="${n}" style="text-align:left"><svg viewBox="-6 -40 112 152"><rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--outline-variant)"/><line x1="0" y1="100" x2="${x1 * 100}" y2="${100 - y1 * 100}" stroke="var(--outline-default)" stroke-dasharray="2 2"/><line x1="100" y1="0" x2="${x2 * 100}" y2="${100 - y2 * 100}" stroke="var(--outline-default)" stroke-dasharray="2 2"/><path d="M0,100 C${P(x1, y1)} ${P(x2, y2)} 100,0" fill="none" stroke="var(--magenta-400)" stroke-width="2.5"/></svg><span class="curve__track"><span class="curve__dot"></span></span><b>${n}</b><span>cubic-bezier(${b.join(', ')})</span><span>${use}</span></button>`;
  }).join('');
  $('#easings').addEventListener('click', (e) => {
    const c = e.target.closest('.curve'); if (!c) return;
    const dot = c.querySelector('.curve__dot');
    dot.animate([{ left: '2px' }, { left: 'calc(100% - 14px)' }], { duration: 1000, easing: `var(${c.dataset.ease})` === '' ? 'linear' : cssEase(c.dataset.ease), fill: 'forwards' });
  });
  setTimeout(() => $('#easings').querySelectorAll('.curve').forEach((c) => c.click()), 600);
  $('#interactions').innerHTML = `<table class="tbl"><thead><tr><th>Interaction</th><th>Duration token</th><th>Easing token</th><th>Default</th><th>Reduced</th></tr></thead><tbody>${INTERACTIONS.map((r) => `<tr><td>${r[0]}</td><td><code>${r[1]}</code></td><td><code>${r[2]}</code></td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('')}</tbody></table>`;

  let group = '';
  $('#catalogue').innerHTML = MOTION.map((m) => {
    const head = m.group !== group ? `<h3>${(group = m.group)}</h3>` : '';
    return `${head}<article class="mcard" id="m-${m.id}">
      <div class="mcard__head"><h4>${m.name}</h4><span>${esc(m.component)}</span></div>
      <div class="mcard__body">
        <div><div class="stage stage--dark" data-token-mode="mobile" data-demo="${m.demo}"></div>
          <div class="mcard__tools"><button type="button" data-act="replay">Replay</button><button type="button" data-act="slow" aria-pressed="false">0.25x</button><button type="button" data-act="reduced" aria-pressed="false">Reduced</button></div></div>
        <div>
          <dl><dt>Trigger</dt><dd>${esc(m.trigger)}</dd><dt>Reduced</dt><dd>${esc(m.reduced)}</dd><dt>Sound, haptics</dt><dd>${esc(m.sync)}</dd></dl>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Property</th><th>From</th><th>To</th><th>Duration</th><th>Easing</th><th>Delay / loop</th></tr></thead><tbody>${m.spec.map((r) => `<tr>${r.map((c) => `<td>${/^--/.test(c) ? `<code>${esc(c)}</code>` : esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
          <pre>${esc(m.code)}</pre>
        </div>
      </div></article>`;
  }).join('');
  document.querySelectorAll('.mcard').forEach((card) => {
    const stage = card.querySelector('[data-demo]');
    const run = () => runDemo(stage);
    card.querySelector('[data-act="replay"]').addEventListener('click', run);
    card.querySelector('[data-act="slow"]').addEventListener('click', (e) => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on); stage.dataset.rate = on ? 0.25 : 1; run(); });
    card.querySelector('[data-act="reduced"]').addEventListener('click', (e) => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', on); if (on) stage.dataset.motion = 'reduced'; else delete stage.dataset.motion; run(); });
  });
  // run demos when they scroll into view
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !e.target.dataset.ran) { e.target.dataset.ran = 1; runDemo(e.target); } }), { rootMargin: '0px 0px -20% 0px' });
  document.querySelectorAll('[data-demo]').forEach((s) => io.observe(s));
}
function cssEase(n) { const e = EASINGS.find((x) => x[0] === n); return e ? (e[1].join() === '0,0,1,1' ? 'linear' : `cubic-bezier(${e[1].join(',')})`) : 'ease'; }

/* Slow motion for CSS demos: set the playback rate of every animation and transition in the stage for 4 s */
function applyRate(stage) {
  const rate = Number(stage.dataset.rate || 1);
  if (rate === 1) return;
  const t0 = performance.now();
  const tick = () => { stage.getAnimations({ subtree: true }).forEach((a) => { if (a.playbackRate !== rate) a.playbackRate = rate; }); if (performance.now() - t0 < 6000) requestAnimationFrame(tick); };
  tick();
}
const reducedOn = (stage) => stage.dataset.motion === 'reduced';
const later = (stage, ms, fn) => setTimeout(fn, ms / Number(stage.dataset.rate || 1));

const DEMOS = {
  button(stage) {
    stage.innerHTML = `<button class="button button--primary button--md" type="button"><span class="button__label">Drop</span></button><button class="icon-button" type="button" aria-label="Close">${icon('close')}</button><small style="width:100%;text-align:center;color:var(--on-surface-muted)">Press and hold the buttons</small>`;
    const b = stage.querySelectorAll('button');
    later(stage, 300, () => b.forEach((x) => x.classList.add('is-pressed'))); later(stage, 700, () => b.forEach((x) => x.classList.remove('is-pressed')));
  },
  pulse(stage) { stage.innerHTML = `<button class="button button--primary button--lg is-pulse" type="button" style="max-width:260px"><span class="button__label">Drop</span><span class="button__sublabel">5 tickets left</span></button>`; },
  spinner(stage) { stage.innerHTML = ['xs', 'sm', 'md', 'lg', 'xl'].map((s) => `<span class="spinner spinner--${s}"></span>`).join('') + `<button class="button button--primary button--lg is-loading" style="max-width:220px" aria-busy="true"><span class="button__label">Drop</span><span class="spinner spinner--md"></span></button>`; },
  risk(stage) {
    stage.innerHTML = riskSelectorHTML('low');
    const sel = stage.querySelector('.risk-selector'); const seq = ['medium', 'high', 'low'];
    seq.forEach((r, i) => later(stage, 500 + i * 900, () => setRiskDemo(sel, r)));
  },
  bins(stage) {
    stage.innerHTML = `<div class="bin-row" style="width:300px">${binsFor('low').map((b) => binHTML(b)).join('')}</div>`;
    const row = stage.querySelector('.bin-row');
    ['medium', 'high', 'low'].forEach((r, i) => later(stage, 400 + i * 1100, () => reshuffle(stage, row, r)));
  },
  toggle(stage) {
    stage.innerHTML = `<button class="toggle" role="switch" aria-checked="false" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button><label class="checkbox-row"><input class="checkbox" type="checkbox"><span>Don't show this again</span></label>`;
    later(stage, 400, () => { stage.querySelector('.toggle').setAttribute('aria-checked', 'true'); stage.querySelector('.checkbox').checked = true; });
    later(stage, 1400, () => { stage.querySelector('.toggle').setAttribute('aria-checked', 'false'); stage.querySelector('.checkbox').checked = false; });
    stage.querySelector('.toggle').onclick = (e) => { const t = e.currentTarget; t.setAttribute('aria-checked', t.getAttribute('aria-checked') !== 'true'); };
  },
  tabs(stage) {
    stage.innerHTML = `<div class="tab-bar" role="tablist" style="width:320px"><span class="tab-bar__thumb"></span>${['How to play', 'Chances', 'Rules'].map((t, i) => `<button class="tab" role="tab" aria-selected="${i === 0}">${t}</button>`).join('')}</div>`;
    const bar = stage.querySelector('.tab-bar');
    [1, 2, 0].forEach((i, k) => later(stage, 400 + k * 800, () => { bar.style.setProperty('--i', i); bar.querySelectorAll('.tab').forEach((t, j) => t.setAttribute('aria-selected', j === i)); }));
  },
  'frame-idle'(stage) { stage.innerHTML = miniFrame(); placeBulbs(stage); },
  'frame-active'(stage) { stage.innerHTML = miniFrame('is-active'); placeBulbs(stage); },
  flare(stage) { stage.innerHTML = miniFrame(); placeBulbs(stage); later(stage, 500, () => stage.querySelector('.frame').classList.add('is-flare')); },
  celebrate(stage) { stage.innerHTML = miniFrame(); placeBulbs(stage); later(stage, 500, () => stage.querySelector('.frame').classList.add('is-celebrate')); },
  drop(stage) { dropDemo(stage); },
  'bin-hit'(stage) {
    stage.innerHTML = `<div class="bin-row" style="width:300px">${binsFor('medium').map((b) => binHTML(b)).join('')}</div>`;
    later(stage, 300, () => stage.querySelectorAll('.bin')[2].classList.add('is-hit'));
  },
  ticket(stage) {
    stage.innerHTML = `<span class="ticket-tab">${icon('ticket', 'sm')}<span>1 ticket</span><span class="ticket-tab__gain">+1</span></span>`;
    later(stage, 300, () => { const t = stage.querySelector('.ticket-tab'); t.classList.add('is-gained'); t.children[1].textContent = '2 tickets'; });
  },
  toast(stage) {
    stage.innerHTML = `<div style="position:relative;width:300px;height:120px"><div class="bin-row" style="position:absolute;bottom:0;width:100%">${binsFor('low').map((b) => binHTML(b)).join('')}</div></div>`;
    const box = stage.firstElementChild;
    later(stage, 200, () => { box.querySelectorAll('.bin')[3].classList.add('is-hit'); box.insertAdjacentHTML('beforeend', `<div class="toast" style="left:${(3.5 / 9) * 100}%;top:70px"><span class="toast__amount">+10</span>Free Spins</div>`); });
  },
  sheet(stage) {
    stage.innerHTML = `<div style="position:relative;width:320px;height:200px;overflow:hidden;border-radius:16px;background:var(--surface-container-default)"><div class="win-sheet-demo anim-sheet-enter" style="position:absolute;left:0;right:0;bottom:0;padding:16px;border-radius:24px 24px 0 0;background:var(--plinko-popup-surface);box-shadow:var(--shadow-sheet);display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;align-items:center;gap:12px"><span class="reward-art reward-art--sm has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}img-reward-free-spins@2x.webp" alt=""></span><b class="gold-text" style="font-size:20px;text-transform:uppercase">Big win!</b></div>
      <button class="button button--primary button--md button--block"><span class="button__label">Drop again</span></button></div></div>`;
    later(stage, 1600, () => { const s = stage.querySelector('.win-sheet-demo'); s.classList.replace('anim-sheet-enter', 'anim-sheet-exit'); });
  },
  count(stage) {
    stage.innerHTML = `<div style="text-align:center"><b class="tabular" style="font-size:44px;color:var(--plinko-reward-amount)">0</b><div style="color:var(--plinko-reward-amount);font-weight:700;text-transform:uppercase">Free Spins</div></div>`;
    const el = stage.querySelector('b'), to = 30, ms = 700 / Number(stage.dataset.rate || 1);
    if (reducedOn(stage)) { el.textContent = to; return; }
    const t0 = performance.now(); let last = -1;
    const step = (now) => { const k = Math.min((now - t0) / ms, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); const tk = Math.floor(k * 12); if (tk !== last) { last = tk; sound.play('coin-tick', { count: tk }); } if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  },
  modal(stage) {
    stage.innerHTML = `<div class="anim-modal-enter" style="width:260px;padding:16px;border-radius:16px;background:var(--plinko-popup-surface);box-shadow:var(--shadow-popover);text-align:center"><b class="pink-text" style="font-size:28px;text-transform:uppercase">Mega win!</b>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px">${['img-reward-free-spins', 'img-reward-gold-coins', 'img-reward-collectable-rare'].map((n, i) => `<div class="reward-tile anim-modal-enter" style="animation-delay:${150 * (i + 1)}ms"><img class="reward-icon" src="${IMG}${n}@2x.webp" alt=""><span class="reward-tile__amount">${['150', '24K', '1'][i]}</span></div>`).join('')}</div></div>`;
  },
  rays(stage) { stage.innerHTML = `<span class="reward-art reward-art--lg has-rays" style="--s:120px"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}img-reward-chest-open@2x.webp" alt=""></span>`; },
  fx(stage) {
    stage.innerHTML = `<canvas class="fx-layer" style="position:absolute;inset:0;width:100%;height:100%"></canvas><b style="color:var(--on-surface-muted)">${reducedOn(stage) ? 'Hidden with reduced motion' : 'Coins and confetti'}</b>`;
    if (reducedOn(stage)) return;
    const c = stage.querySelector('canvas'); const fx = createFx(c, { base: IMG });
    later(stage, 100, () => { const r = c.getBoundingClientRect(); fx.play('mega', r.width / 2, r.height * 0.7); });
  },
  winnings(stage) {
    stage.innerHTML = `<div style="display:flex;gap:8px;align-items:flex-end;padding-top:24px"><span class="ticket-tab">${icon('ticket', 'sm')}<span>3 tickets</span></span><span class="ticket-tab winnings-tab" style="position:relative">${icon('gift', 'sm')}<span class="wt">Won 15 FS</span><span class="ticket-tab__gain">+30</span></span></div>`;
    later(stage, 400, () => { const t = stage.querySelector('.winnings-tab'); t.classList.add('is-gained'); later(stage, 300, () => { t.querySelector('.wt').textContent = 'Won 45 FS'; }); });
  },
  summary(stage) {
    stage.innerHTML = `<div style="position:relative;width:320px;height:220px;overflow:hidden;border-radius:16px;background:var(--surface-container-default)"><div class="anim-sheet-enter" style="position:absolute;left:0;right:0;bottom:0;padding:16px;border-radius:24px 24px 0 0;background:var(--plinko-popup-surface);box-shadow:var(--shadow-sheet);display:flex;flex-direction:column;gap:8px">
      <b class="gold-text" style="font-size:20px;text-transform:uppercase">Your winnings</b>
      <div style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:12px;background:var(--plinko-list-row-surface)"><img src="${IMG}img-reward-free-spins@2x.webp" style="width:40px" alt=""><b style="flex:1">Free Spins</b><b style="color:var(--on-surface-accent)">45</b></div>
      <button class="button button--primary button--md button--block"><span class="button__label">Keep playing</span></button></div></div>`;
  },
  timer(stage) {
    stage.innerHTML = `<div class="timer" style="width:300px"><span class="timer__ring"><svg viewBox="0 0 44 44"><circle class="track" cx="22" cy="22" r="19"/><circle class="fill" cx="22" cy="22" r="19" style="stroke-dasharray:119.4;stroke-dashoffset:30"/></svg>${icon('clock', 'sm')}</span><span><span class="timer__label">Next free ticket</span><span class="timer__digits">00:00:03</span></span></div>`;
    const d = stage.querySelector('.timer__digits'), f = stage.querySelector('.fill');
    [2, 1, 0].forEach((s, i) => later(stage, 600 + i * 700, () => { d.textContent = '00:00:0' + s; f.style.strokeDashoffset = 30 - (i + 1) * 10; }));
    later(stage, 2900, () => { stage.querySelector('.timer').classList.add('is-ready'); d.textContent = 'Ready!'; f.style.strokeDashoffset = 0; });
  },
};
function runDemo(stage) {
  const fn = DEMOS[stage.dataset.demo]; if (!fn) return;
  stage.innerHTML = '';
  requestAnimationFrame(() => { fn(stage); applyRate(stage); });
}

function binHTML(b) {
  const c = b.edge ? icon(b.icon, 'sm') : b.gc ? icon('coin', 'xs') + b.amount : b.amount;
  return `<div class="bin" data-heat="${b.heat}"><span class="bin-content${b.edge ? ' bin-content--edge' : b.gc ? ' bin-content--gc' : ''}">${c}</span></div>`;
}
function reshuffle(stage, row, risk) {
  // Same slot reel as the game (prototype/js/board.js setBins): every bin spins and stops from the centre out
  const bins = binsFor(risk), red = reducedOn(stage), pool = RISK_ORDER.flatMap((r) => binsFor(r));
  const cs = getComputedStyle(stage), ms = (n, fb) => { const v = cs.getPropertyValue(n).trim(); return v ? parseFloat(v) * (v.endsWith('ms') ? 1 : 1000) : fb; };
  const dur = ms('--motion-bins-reel-duration', 800), step = ms('--motion-bins-reel-stagger-duration', 90), easing = cs.getPropertyValue('--motion-bins-reel-easing').trim() || 'ease-out';
  const inner = (b) => { const t = document.createElement('div'); t.innerHTML = binHTML(b); return t.firstElementChild.innerHTML; };
  [...row.children].forEach((el, i) => {
    const b = bins[i], apply = () => { el.dataset.heat = b.heat; el.innerHTML = inner(b); };
    if (red || !el.animate) { apply(); return; }
    const d = Math.abs(i - 4), n = 7 + 2 * d, h = el.clientHeight || 40;
    const items = [el.innerHTML]; for (let k = 0; k < n; k++) items.push(inner(pool[(i * 7 + k * 5 + d) % pool.length]));
    items.push(inner(b), inner(pool[(i + 3) % pool.length]));
    el.innerHTML = `<span class="bin-reel" style="--reel-h:${h}px"><span class="bin-reel__strip">${items.join('')}</span></span>`;
    const to = -(n + 1) * h, t = dur + d * step;
    const a = el.querySelector('.bin-reel__strip').animate([{ transform: 'translateY(0)', filter: 'blur(0)' }, { transform: `translateY(${to * 0.25}px)`, filter: 'blur(1.2px)', offset: 0.2 }, { transform: `translateY(${to * 0.85}px)`, filter: 'blur(0.6px)', offset: 0.7 }, { transform: `translateY(${to}px)`, filter: 'blur(0)' }], { duration: t, easing, fill: 'forwards' });
    later(stage, t * 0.6, () => { el.dataset.heat = b.heat; });
    a.onfinish = () => { apply(); el.classList.remove('is-reel-stop'); void el.offsetWidth; el.classList.add('is-reel-stop'); };
  });
}
function riskSelectorHTML(sel) {
  const chart = (r) => { const h = (b) => 12 + 88 * Math.log(b.m / 0.2) / Math.log(30 / 0.2); return `<svg class="risk-chart" viewBox="0 0 54 14">${binsFor(r).map((b, i) => { const v = h(b) * 0.14; return `<rect x="${(i * 6.1).toFixed(1)}" y="${(14 - v).toFixed(1)}" width="4.6" height="${v.toFixed(1)}" rx="1" data-heat="${b.heat}" style="--d:${Math.abs(i - 4)}"/>`; }).join('')}</svg>`; };
  return `<div class="risk-selector" style="width:330px"><div class="risk-selector__track" role="radiogroup" aria-label="Risk"><span class="risk-selector__thumb"></span>${RISK_ORDER.map((r) => `<button class="risk-segment" role="radio" aria-checked="${r === sel}" data-r="${r}"><span class="risk-segment__label">${RISK[r].label}</span>${chart(r).replace('class="risk-chart"', `class="risk-chart${r === sel ? ' is-selected' : ''}"`)}</button>`).join('')}</div><p class="risk-selector__caption">${RISK[sel].caption}</p></div>`;
}
function setRiskDemo(sel, r) {
  const i = RISK_ORDER.indexOf(r); sel.querySelector('.risk-selector__track').style.setProperty('--i', i);
  sel.querySelectorAll('.risk-segment').forEach((s) => { const on = s.dataset.r === r; s.setAttribute('aria-checked', on); s.querySelector('.risk-chart').classList.toggle('is-selected', on); });
  const cap = sel.querySelector('.risk-selector__caption'); cap.style.opacity = 0; setTimeout(() => { cap.textContent = RISK[r].caption; cap.style.opacity = 1; }, 150);
}
function miniFrame(cls = '') { return `<div class="frame ${cls}" style="width:240px;height:150px;display:flex"><div class="frame__board" style="flex:1"></div><div class="frame__bulbs"></div></div>`; }
function placeBulbs(stage) {
  const f = stage.querySelector('.frame'), W = 240, H = 150, o = 11, pts = [], nx = 9, ny = 6;
  for (let i = 1; i < nx; i++) pts.push([o + i * (W - 2 * o) / nx, o]);
  for (let j = 1; j < ny; j++) pts.push([W - o, o + j * (H - 2 * o) / ny]);
  for (let i = nx - 1; i > 0; i--) pts.push([o + i * (W - 2 * o) / nx, H - o]);
  for (let j = ny - 1; j > 0; j--) pts.push([o, o + j * (H - 2 * o) / ny]);
  f.querySelector('.frame__bulbs').innerHTML = pts.map((p, i) => `<i class="bulb ${i % 2 ? 'bulb--gold' : 'bulb--pink'}" style="left:${p[0]}px;top:${p[1]}px;--odd:${i % 2};--n:${i % 4}"></i>`).join('');
}

/* Canvas drop demo, shared by the motion catalogue and the physics section */
function drawBoard(canvas, geo, state) {
  const c = canvas.getContext('2d'), dpr = canvas.width / geo.W;
  c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, geo.W, geo.H);
  const now = performance.now();
  // bins
  binsFor(state.risk || 'medium').forEach((b, k) => {
    const x = geo.binCenters[k] - geo.s / 2 + 2, w = geo.s - 4;
    c.fillStyle = cssVar(`--plinko-bin-${b.heat}-bg`) || '#555'; c.globalAlpha = state.bin === k && state.landed ? 1 : 0.75;
    c.beginPath(); c.roundRect(x, geo.binTop, w, geo.binH, 4); c.fill(); c.globalAlpha = 1;
  });
  // path preview
  if (state.path) { c.strokeStyle = 'rgba(250,17,79,0.45)'; c.setLineDash([3, 4]); c.beginPath(); state.path.forEach((p, i) => (i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y))); c.stroke(); c.setLineDash([]); }
  for (const row of geo.rows) for (const p of row) {
    const h = state.hits?.get(p.r + ':' + p.j), k = h ? Math.max(0, 1 - (now - h) / 300) : 0;
    c.fillStyle = k > 0 ? cssVar('--plinko-peg-hit') : cssVar('--plinko-peg-idle'); c.shadowColor = c.fillStyle; c.shadowBlur = 4 + 8 * k;
    c.beginPath(); c.arc(p.x, p.y, PHYSICS.pegRadius * geo.scale * (1 + 0.25 * k), 0, 7); c.fill();
  }
  c.shadowBlur = 0;
  (state.trail || []).forEach((p, i, a) => { c.globalAlpha = ((i + 1) / (a.length + 1)) * 0.35; c.fillStyle = cssVar('--plinko-ball-fill'); c.beginPath(); c.arc(p.x, p.y, PHYSICS.ballRadius * geo.scale * 0.8, 0, 7); c.fill(); });
  c.globalAlpha = 1;
  const b = state.pos || { x: geo.cx, y: geo.startY };
  c.shadowColor = 'rgba(253,208,74,.8)'; c.shadowBlur = 14; c.fillStyle = cssVar('--plinko-ball-fill');
  c.beginPath(); c.arc(b.x, b.y, PHYSICS.ballRadius * geo.scale, 0, 7); c.fill(); c.shadowBlur = 0;
}
function playDrop(canvas, W, H, k, opts = {}) {
  const geo = geometry(W, H), random = rng(opts.seed || ((Math.random() * 1e9) | 0));
  const drop = buildDrop(geo, k, random), events = drop.events.slice();
  const state = { risk: opts.risk || 'medium', hits: new Map(), trail: [], bin: k, path: opts.showPath ? [] : null };
  if (opts.showPath) for (let t = 0; t <= drop.duration; t += 0.01) state.path.push(sample(drop, t));
  const rate = opts.rate || 1, reduced = !!opts.reduced;
  let t = 0, last = performance.now();
  const step = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05) * rate; last = now;
    t += dt * timeScaleAt(drop, t, reduced);
    while (events.length && events[0].t <= t) { const e = events.shift(); if (e.type === 'peg') { state.hits.set(e.row + ':' + e.j, now); if (opts.sound) sound.play('peg-hit', { row: e.row }); } if (e.type === 'land') { state.landed = true; if (opts.sound) sound.play('bin-land', { heat: binsFor(state.risk)[k].heat }); } }
    state.pos = sample(drop, Math.min(t, drop.duration));
    if (!reduced) { state.trail.push({ x: state.pos.x, y: state.pos.y }); if (state.trail.length > 8) state.trail.shift(); }
    drawBoard(canvas, geo, state);
    if (t < drop.duration + 0.4) requestAnimationFrame(step); else { state.trail = []; drawBoard(canvas, geo, state); }
  };
  requestAnimationFrame(step);
}
function dropDemo(stage) {
  stage.innerHTML = '<canvas width="560" height="560" style="width:280px;height:280px;border-radius:12px;background:var(--gradient-frame-board)"></canvas>';
  const k = decideOutcome('medium', Math.random);
  playDrop(stage.querySelector('canvas'), 280, 280, k.index, { rate: Number(stage.dataset.rate || 1), reduced: reducedOn(stage) });
}

/* ---------- Choreography ---------- */
function choreography() {
  const max = 3.6, pct = (t) => (t / max) * 100;
  const lanes = [['Visual', 22, 'var(--gold-300)'], ['Sound', 48, 'var(--magenta-400)'], ['Haptic', 74, 'var(--blue-400)']];
  let html = lanes.map(([l, y]) => `<span class="lbl" style="top:${y}px">${l}</span><span class="lane" style="top:${y}px"></span>`).join('');
  html += `<span class="slow" style="left:calc(70px + (100% - 82px) * ${pct(1.22) / 100});width:calc((100% - 82px) * ${(pct(2.52) - pct(1.22)) / 100})"></span>`;
  CHOREOGRAPHY.forEach((r) => lanes.forEach(([l, y, c], i) => { const v = [r.visual, r.sound, r.haptic][i]; if (v) html += `<span class="mark" title="${esc(r.t + ' s: ' + v)}" style="top:${y}px;left:calc(70px + (100% - 82px) * ${pct(r.t) / 100});background:${c}"></span>`; }));
  [0, 1, 2, 3].forEach((s) => { html += `<span class="axis" style="left:calc(70px + (100% - 82px) * ${pct(s) / 100})">${s} s</span>`; });
  $('#tl-track').innerHTML = html;
  $('#timeline').innerHTML = `<div class="tl-row is-head"><span>Time</span><span>Visual</span><span>Sound</span><span>Haptic</span></div>` + CHOREOGRAPHY.map((r) => `<div class="tl-row"><b>${r.t.toFixed(2)} s</b><span>${esc(r.visual)}</span><span>${esc(r.sound) || '–'}</span><span>${esc(r.haptic) || '–'}</span></div>`).join('');
}

/* ---------- Sound and haptics ---------- */
function soundTable() {
  $('#sound-table').innerHTML = `<table class="tbl"><thead><tr><th></th><th>Event</th><th>Trigger</th><th>Source</th><th>Length</th><th>Volume, pitch</th><th>Recipe</th></tr></thead><tbody>${SOUND_MAP.map((s) => `<tr><td><button class="icon-button" type="button" data-sfx="${s.id}" aria-label="Play ${esc(s.event)}" style="width:36px;height:36px">${icon('arrow-right', 'sm', 'icon--accent')}</button></td><td><b style="color:var(--on-surface-default)">${esc(s.event)}</b><br><code>${s.id}</code></td><td>${esc(s.trigger)}</td><td>${s.source === 'file' ? `File<br><code>${s.file}</code>` : 'Web Audio'}</td><td>${esc(s.length)}${s.loop ? ', loop' : ''}</td><td>${s.volume}<br>${esc(s.pitch)}</td><td>${esc(s.recipe)}</td></tr>`).join('')}</tbody></table>`;
  $('#sound-table').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-sfx]'); if (!b) return;
    await sound.unlock(); const id = b.dataset.sfx;
    if (id === 'ambient') { sound.startAmbient(); setTimeout(() => sound.stopAmbient(), 5000); return; }
    if (id === 'peg-hit') { for (let r = 0; r < 8; r++) setTimeout(() => sound.play('peg-hit', { row: r }), r * 180); return; }
    if (id === 'coin-tick') { for (let i = 0; i < 12; i++) setTimeout(() => sound.play('coin-tick', { count: i }), i * 58); return; }
    if (id === 'risk-change') { RISK_ORDER.forEach((l, i) => setTimeout(() => sound.play('risk-change', { level: l }), i * 300)); return; }
    if (id === 'bin-land') { ['cold', 'warm', 'mega'].forEach((h, i) => setTimeout(() => sound.play('bin-land', { heat: h }), i * 700)); return; }
    if (id === 'ui-toggle') { sound.play('ui-toggle', { on: true }); setTimeout(() => sound.play('ui-toggle', { on: false }), 300); return; }
    sound.play(id);
  });
}
function hapticsTable() {
  $('#haptics-note').textContent = HAPTICS_NOTE;
  $('#haptics-support').innerHTML = haptics.supported ? '<span class="chip">This device can vibrate: press Try.</span>' : '<span class="chip">This browser can\'t vibrate (for example iOS Safari or desktop). The bars show each pattern: pink = vibrate, gap = pause.</span>';
  $('#haptics-table').innerHTML = `<table class="tbl"><thead><tr><th></th><th>Event</th><th>Trigger</th><th>Pattern (ms)</th><th>iOS</th><th>Android</th><th>Notes</th></tr></thead><tbody>${HAPTICS.map((h) => {
    const p = Array.isArray(h.pattern) ? h.pattern : [h.pattern];
    const bars = p.map((ms, i) => `<i style="display:inline-block;height:10px;width:${Math.max(2, ms / 2)}px;margin-right:1px;border-radius:2px;background:${i % 2 ? 'transparent' : 'var(--magenta-500)'}"></i>`).join('');
    return `<tr><td><button class="pill" type="button" data-hap="${h.id}" style="min-height:32px;padding:0 12px">Try</button></td><td><b style="color:var(--on-surface-default)">${esc(h.event)}</b><br><code>${h.id}</code></td><td>${esc(h.trigger)}</td><td><code>${p.join(', ')}</code><br>${bars}</td><td>${esc(h.ios)}</td><td>${esc(h.android)}</td><td>${esc(h.notes || '')}</td></tr>`;
  }).join('')}</tbody></table>`;
  $('#haptics-table').addEventListener('click', (e) => { const b = e.target.closest('[data-hap]'); if (b) haptics.play(b.dataset.hap); });
}

/* ---------- Physics ---------- */
function physics() {
  const rows = [['gravity', PHYSICS.gravity + ' px/s²', 'At s = 33.6 px. Scaled with the board.'], ['restitution', PHYSICS.restitution.join(' to '), 'Random per bounce, vertical only'], ['contactOffset', PHYSICS.contactOffset.join(' to ') + ' px', 'How far from the peg top the ball touches'], ['pegRadius', PHYSICS.pegRadius + ' px', 'plinko/peg is 8 px'], ['ballRadius', PHYSICS.ballRadius + ' px', 'plinko/ball is 20 px'], ['slowMoRows', PHYSICS.slowMoRows, 'Last rows in slow motion'], ['slowMoScale', PHYSICS.slowMoScale, 'Time scale in slow motion'], ['settleHops', PHYSICS.settleHops, 'Small hops in the bin'], ['spacing s', PHYSICS.baseSpacing + ' px', 'Between pegs at 390 px (Figma)'], ['row gap', PHYSICS.baseRowGap + ' px', 'Between rows (Figma)']];
  $('#physics-constants').innerHTML = `<table class="tbl"><thead><tr><th>Constant</th><th>Value</th><th>Note</th></tr></thead><tbody>${rows.map((r) => `<tr><td><code>${r[0]}</code></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table>`;
  const canvas = $('#mini');
  $('#mini-tools').innerHTML = `<button type="button" data-k="random">Drop (real odds)</button>${[0, 2, 4].map((k) => `<button type="button" data-k="${k}">To bin ${k + 1}</button>`).join('')}<button type="button" data-k="path" aria-pressed="false">Show path</button>`;
  let showPath = false;
  drawBoard(canvas, geometry(300, 330), { risk: 'medium' });
  $('#mini-tools').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    sound.unlock();
    if (b.dataset.k === 'path') { showPath = !showPath; b.setAttribute('aria-pressed', showPath); return; }
    const k = b.dataset.k === 'random' ? decideOutcome('medium', Math.random).index : Number(b.dataset.k);
    playDrop(canvas, 300, 330, k, { showPath, sound: true });
  });
  // fairness check
  const r = rng(2026), N = 10000, c = Array(9).fill(0);
  for (let i = 0; i < N; i++) c[decideOutcome('high', r).index]++;
  const max = Math.max(...c);
  $('#histo').innerHTML = c.map((n, k) => `<div data-l="${(n / N * 100).toFixed(1)}%" style="height:${(n / max) * 100}%"><i style="bottom:${(BIN_CHANCE[k] * N / max) * 100}%"></i></div>`).join('');
  const chi = c.reduce((s, n, k) => s + (n - BIN_CHANCE[k] * N) ** 2 / (BIN_CHANCE[k] * N), 0);
  $('#histo-note').innerHTML = `Chi-square = ${chi.toFixed(1)} with 8 degrees of freedom (below 15.5 means no evidence of bias at the 5 % level).`;
}

/* ---------- Prizes ---------- */
function prizes() {
  $('#ev').innerHTML = `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Risk</th><th>Bins, edge to centre (m)</th><th class="num">EV (units)</th><th class="num">EV</th></tr></thead><tbody>${RISK_ORDER.map((r) => { const b = binsFor(r).slice(0, 5); return `<tr><td>${RISK[r].label}</td><td>${b.map((x) => `${x.m}x`).join(', ')}</td><td class="num">${expectedValue(r).toFixed(3)}x</td><td class="num">≈ ${(expectedValue(r) * BASE_PRIZE.amount).toFixed(1)} FS</td></tr>`; }).join('')}</tbody></table></div>`;
  $('#prize-tables').innerHTML = RISK_ORDER.map((r) => `<h4>${RISK[r].label}: ${RISK[r].caption}</h4><div class="tbl-wrap"><table class="tbl odds"><thead><tr><th aria-hidden="true"></th><th>Prize</th><th>m</th><th>Tier</th><th class="num">Chance</th><th class="num">P × m</th></tr></thead><tbody>${oddsTable(r).map((o) => `<tr><td style="width:46px"><span class="odds__chip" data-heat="${o.bin.heat}">${o.bin.edge ? icon(o.bin.icon, 'sm') : o.bin.gc ? icon('coin', 'xs') + o.bin.amount : o.bin.amount}</span></td><td><b>${o.bin.label}</b><small>${o.bins}${o.bin.edge ? ': ' + o.bin.contents.map((c) => c.amount + ' ' + c.label).join(' + ') : ''}</small></td><td>${o.bin.m}x</td><td>${o.bin.tier}</td><td class="num">${fmtPct(o.chance)}<small>1 in ${o.oneIn}</small></td><td class="num">${(o.chance * o.bin.m).toFixed(3)}</td></tr>`).join('')}</tbody></table></div>`).join('');
}

/* ---------- Components ---------- */
const st = (label, html) => `<div class="state">${html}<small>${label}</small></div>`;
const btn = (cls, label, extra = '', sub = '') => `<button class="button ${cls}" type="button" ${extra}><span class="button__label">${label}</span>${sub ? `<span class="button__sublabel">${sub}</span>` : ''}${cls.includes('is-loading') ? '<span class="spinner spinner--md"></span>' : ''}</button>`;
const COMPONENTS = [
  { id: 'icon', name: 'plinko/icon/*', code: '.icon.icon--{name}.icon--{size}', desc: '17 icons in 5 sizes. Reward icons have two sparkles in --sparkle.', demo: () => ['xs', 'sm', 'md', 'lg', 'xl'].map((s) => st(s, icon('gift', s))).join(''), a11y: 'Decorative icons get aria-hidden. Icon-only buttons need an aria-label.' },
  { id: 'spinner', name: 'plinko/spinner', code: '.spinner.spinner--md', desc: 'Loading indicator. Sizes match the icon sizes, so it can replace an icon.', demo: () => ['xs', 'sm', 'md', 'lg', 'xl'].map((s) => st(s, `<span class="spinner spinner--${s}"></span>`)).join(''), a11y: 'The busy element gets aria-busy="true".' },
  { id: 'button', name: 'plinko/button', code: '.button.button--primary.button--lg', desc: 'Primary is the one main action (Drop, Drop again, Play games). Neutral is a second action. L has two lines (label + sublabel). Pulse invites a tap; it is the only glow in the system.', demo: () => [st('Primary L, Pulse', btn('button--primary button--lg is-pulse', 'Drop', 'style="width:220px"', '5 tickets left')), st('Pressed', btn('button--primary button--md is-pressed', 'Drop again')), st('Disabled', btn('button--primary button--md', 'Drop', 'disabled')), st('Loading', btn('button--primary button--md is-loading', 'Drop', 'aria-busy="true"')), st('Neutral', btn('button--neutral button--md', 'Show welcome')), st('Neutral S', btn('button--neutral button--sm', 'Small'))].join(''), a11y: 'Native button. Loading keeps the width. Min height 44 px.' },
  { id: 'icon-button', name: 'plinko/icon-button', code: '.icon-button.icon-button--md', desc: 'Icon-only button with no plate: sound and close. M is 44 × 44, L is 56 × 56.', demo: () => [st('Default', `<button class="icon-button" aria-label="Close">${icon('close')}</button>`), st('Pressed', `<button class="icon-button is-pressed" aria-label="Close">${icon('close')}</button>`), st('Disabled', `<button class="icon-button" disabled aria-label="Close">${icon('close')}</button>`), st('L', `<button class="icon-button icon-button--lg" aria-label="Close">${icon('close', 'lg')}</button>`), st('Sound off', `<button class="icon-button" aria-pressed="false" aria-label="Sound">${icon('sound-off')}</button>`)].join(''), a11y: 'Always an aria-label. The sound button uses aria-pressed.' },
  { id: 'link', name: 'plinko/link', code: '.link', desc: 'Quiet text action: Close, Back to lobby.', demo: () => [st('Default', '<button class="link">Back to lobby</button>'), st('Disabled', '<button class="link" disabled>Close</button>')].join(''), a11y: 'A button styled as a link, 44 px tall tap area.' },
  { id: 'risk-selector', name: 'plinko/risk-selector, plinko/risk-segment, plinko/risk-chart', code: '.risk-selector, .risk-segment, .risk-chart', desc: 'The volatility control. Three segments with a small value chart each (bar height = bin value on a log scale, 0.2x to 30x). The thumb slides; the caption says what the level does.', demo: () => st('Interactive: click or use arrow keys', riskSelectorHTML('low')) + st('Disabled during a drop', riskSelectorHTML('medium').replace('class="risk-selector"', 'class="risk-selector is-disabled"').replace(/<button class="risk-segment"/g, '<button disabled class="risk-segment"')), a11y: 'role="radiogroup" with role="radio" segments and aria-checked; roving tabindex, arrow keys move the choice.', wire: (el) => el.querySelectorAll('.risk-selector:not(.is-disabled)').forEach((sel) => sel.addEventListener('click', (e) => { const b = e.target.closest('.risk-segment'); if (b) { setRiskDemo(sel, b.dataset.r); sound.play('risk-change', { level: b.dataset.r }); } })) },
  { id: 'bin', name: 'plinko/bin, plinko/bin-content, plinko/bin-row', code: '.bin[data-heat].is-hit, .bin-row', desc: 'A prize bin. Heat sets the colours. Content is a value, a GC value or an edge icon. States: Idle, Anticipation, Hit, Dimmed.', demo: () => [st('Idle (Medium row)', `<div class="bin-row" style="width:300px">${binsFor('medium').map(binHTML).join('')}</div>`), st('Anticipation, Hit, Dimmed', `<div style="display:flex;gap:8px">${['is-anticipation', 'is-hit', 'is-dimmed'].map((c) => `<div class="bin ${c}" data-heat="hot" style="width:40px"><span class="bin-content">30</span></div>`).join('')}</div>`)].join(''), a11y: 'The bin row is a list; each bin has an aria-label with the full prize name.' },
  { id: 'chance-strip', name: 'plinko/chance-strip, plinko/chance-bar', code: '.chance-strip .chance-bar.is-hit', desc: 'The real chance of each bin. Bar height = 8 % + 92 % × (chance / centre chance). The same at every risk level.', demo: () => st('Landed bin 4 is Hit', `<div class="chance-strip" style="width:300px;height:94px">${BIN_CHANCE.map((p, i) => `<i class="chance-bar${i === 3 ? ' is-hit' : ''}" style="--h:${8 + 92 * p / BIN_CHANCE[4]}%"></i>`).join('')}</div>`), a11y: 'Decorative (aria-hidden). The odds are in the Rules and odds table.' },
  { id: 'frame', name: 'plinko/frame, plinko/bulb, plinko/chute', code: '.frame.is-active / .is-dimmed / .is-flare / .is-celebrate, .bulb, .chute.is-releasing', desc: 'Pink neon frame with 54 bulbs. Idle: calm twinkle. Active: running lights during a drop. Dimmed: bulbs off. Flare: bulbs flare before a big win sheet. Celebrate: the frame turns gold and every bulb flares gold before a mega takeover.', demo: () => [['', 'Idle'], ['is-active', 'Active'], ['is-dimmed', 'Dimmed'], ['is-flare', 'Flare'], ['is-celebrate', 'Celebrate']].map(([c, l]) => st(l, miniFrame(c))).join(''), after: (el) => el.querySelectorAll('.state').forEach((s) => placeBulbs(s)), a11y: 'Decorative.' },
  { id: 'ticket-tab', name: 'plinko/ticket-tab', code: '.ticket-tab.is-low / .is-empty / .is-gained', desc: 'Ticket balance on the top edge of the frame. Low: the last ticket (orange outline and count). Not interactive: it only shows the balance, so the 44 px tap target rule does not apply.', demo: () => [st('Normal', `<span class="ticket-tab">${icon('ticket', 'sm')}<span>5 tickets</span></span>`), st('Low', `<span class="ticket-tab is-low">${icon('ticket', 'sm')}<span>1 ticket</span></span>`), st('Empty', `<span class="ticket-tab is-empty">${icon('ticket', 'sm')}<span>0 tickets</span></span>`)].join(''), a11y: 'The count is aria-live="polite".' },
  { id: 'board-tabs', name: 'plinko/board-tabs', code: '.board-tabs (Won=false: .winnings-tab[hidden])', desc: 'Tickets and winnings on the top edge of the board frame, centred, 4 px apart (--spacing-2xs). The Won property switches the winnings tab on after the first win of the session.', demo: () => [st('Won off', `<span class="board-tabs"><span class="ticket-tab">${icon('ticket', 'sm')}<span>5 tickets</span></span></span>`), st('Won on', `<span class="board-tabs"><span class="ticket-tab">${icon('ticket', 'sm')}<span>3 tickets</span></span><span class="ticket-tab winnings-tab" style="animation:none">${icon('gift', 'sm')}<span>Won 45 FS · 8K GC</span></span></span>`)].join(''), a11y: 'The ticket count and the winnings total are aria-live="polite".' },
  { id: 'popup-header', name: 'plinko/popup-header', code: '.popup-header', desc: 'Sound button, gold PLINKO title, close.', demo: () => st('Sound on', `<header class="popup-header" style="width:340px"><button class="icon-button" aria-pressed="true" aria-label="Sound">${icon('sound-on')}</button><span class="popup-header__title">Plinko</span><button class="icon-button" aria-label="Close">${icon('close')}</button></header>`), a11y: 'The title is the dialog label (aria-labelledby).' },
  { id: 'prize-strip', name: 'plinko/prize-strip', code: '.prize-strip.prize-strip--gift', desc: 'Zigzag strip: today\'s prize, or the green "1 free ticket every day".', demo: () => [st('Prize', `<div class="prize-strip" style="width:340px;--zig:var(--surface-default)">${icon('free-spins')}<span>Today's prize:</span><span class="prize-strip__prize">10 Free Spins</span></div>`), st('Gift', '<div class="prize-strip prize-strip--gift" style="width:340px;--zig:var(--surface-default)">1 free ticket every day</div>')].join(''), a11y: 'Plain text.' },
  { id: 'footer-link', name: 'plinko/footer-link', code: '.footer-link', desc: 'Rules and odds row under Drop. Quiet, no card.', demo: () => st('Default', `<button class="footer-link" style="width:340px">${icon('info', 'md', 'icon--accent')}<span class="footer-link__text"><span class="footer-link__title">Rules and odds</span><span class="footer-link__desc">Same average at every level: ~10 FS</span></span>${icon('arrow-right', 'sm', 'icon--muted')}</button>`), a11y: 'A button with aria-haspopup="dialog".' },
  { id: 'toast', name: 'plinko/toast', code: '.toast', desc: 'Small win over the landed bin. The game does not stop.', demo: () => st('Small win', `<div style="position:relative;width:160px;height:48px"><div class="toast" style="left:50%;top:44px;animation:none"><span class="toast__amount">+10</span>Free Spins</div></div>`), a11y: 'role="status", so screen readers announce the prize.' },
  { id: 'reward-art', name: 'plinko/reward-art, plinko/reward-icon, plinko/reward-tile', code: '.reward-art.reward-art--lg.has-rays, .reward-tile', desc: 'Prize picture for win screens, with optional rays for big and mega wins. Tiles list the contents of a mega prize.', demo: () => [st('S', `<span class="reward-art reward-art--sm"><img class="reward-icon" src="${IMG}img-reward-ticket@2x.webp" alt=""></span>`), st('M + rays', `<span class="reward-art has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}img-reward-free-spins@2x.webp" alt=""></span>`), st('Tile', `<div class="reward-tile" style="width:104px"><img class="reward-icon" src="${IMG}img-reward-gold-coins@2x.webp" alt=""><span class="reward-tile__amount">24K</span><span class="reward-tile__label">Gold Coins</span></div>`)].join(''), a11y: 'Images are decorative (alt=""); the prize is in text.' },
  { id: 'toggle', name: 'plinko/toggle, plinko/checkbox, plinko/checkbox-row, plinko/setting-row', code: '.toggle[aria-checked], .checkbox, .checkbox-row, .setting-row', desc: 'Switches for sound and vibration; a checkbox for "Don\'t show this again".', demo: () => [st('Off / On', '<span style="display:flex"><button class="toggle" role="switch" aria-checked="false" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button><button class="toggle" role="switch" aria-checked="true" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button></span>'), st('Disabled', '<button class="toggle" role="switch" aria-checked="true" disabled aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button>'), st('Checkbox row', '<label class="checkbox-row"><input class="checkbox" type="checkbox"><span>Don\'t show this again</span></label>'), st('Setting row', `<button class="setting-row" style="width:300px">${icon('sound-on')}<span>Sound</span><span class="toggle" role="switch" aria-checked="true" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></span></button>`)].join(''), a11y: 'Toggle: button role="switch" with aria-checked. Checkbox: native input. The whole row is the tap area.', wire: (el) => el.querySelectorAll('button.toggle:not(:disabled)').forEach((t) => t.addEventListener('click', () => { t.setAttribute('aria-checked', t.getAttribute('aria-checked') !== 'true'); sound.play('ui-toggle', { on: t.getAttribute('aria-checked') === 'true' }); })) },
  { id: 'tab-bar', name: 'plinko/tab-bar, plinko/tab, plinko/pill-group, plinko/pill', code: '.tab-bar, .tab[aria-selected], .pill-group, .pill[aria-checked]', desc: 'Drawer tabs with a sliding thumb; risk pills in Rules and odds.', demo: () => [st('Tab bar', `<div class="tab-bar" role="tablist" style="width:320px;--i:1"><span class="tab-bar__thumb"></span>${['How to play', 'Chances', 'Rules'].map((t, i) => `<button class="tab" role="tab" aria-selected="${i === 1}">${t}</button>`).join('')}</div>`), st('Pill group', `<div class="pill-group" role="radiogroup" style="width:320px">${['Low', 'Medium', 'High'].map((t, i) => `<button class="pill" role="radio" aria-checked="${i === 2}">${t}</button>`).join('')}</div>`)].join(''), a11y: 'role="tablist" / "tab" / "tabpanel"; arrow keys move between tabs. Pills are a radiogroup.' },
  { id: 'list-row', name: 'plinko/list-row, plinko/rules-item, plinko/info-note', code: '.list-row, .rules li, .info-note', desc: 'Content rows for the welcome card and Rules and odds.', demo: () => [st('List row', `<div class="list-row" style="width:320px"><span class="list-row__disc">${icon('ticket', 'sm')}</span><span><span class="list-row__title">Get tickets</span><span class="list-row__desc">1 ticket for every 50K GC played.</span></span></div>`), st('Rules', '<ul class="rules" style="width:320px"><li>Prizes go to My Rewards right away.</li><li>Need a break? Set limits in <b>Player Trust &amp; Safety Controls</b>.</li></ul>'), st('Info note', '<p class="info-note" style="width:320px">Chances are the same at every level. Average per drop: <b>about 10 FS</b>.</p>')].join(''), a11y: 'Plain text in a list.' },
  { id: 'odds-row', name: 'plinko/odds-row', code: '.odds tr, .odds__chip[data-heat]', desc: 'A real table of prizes and chances.', demo: () => st('High', `<table class="odds" style="width:340px"><thead><tr><th aria-hidden="true"></th><th>Prize</th><th class="num">Chance</th></tr></thead><tbody>${oddsTable('high').slice(0, 3).map((o) => `<tr><td><span class="odds__chip" data-heat="${o.bin.heat}">${o.bin.edge ? icon(o.bin.icon, 'sm') : o.bin.amount}</span></td><td><b>${o.bin.label}</b><small>${o.bins}</small></td><td class="num"><b>${fmtPct(o.chance)}</b><small>1 in ${o.oneIn}</small></td></tr>`).join('')}</tbody></table>`), a11y: 'A native table with headers, so screen readers read prize and chance together.' },
  { id: 'timer', name: 'plinko/timer, plinko/earn-line', code: '.timer.is-ready, .earn-line', desc: 'Countdown to the next free ticket, shown instead of Drop with 0 tickets. No buy button.', demo: () => [st('Counting', `<div class="timer" style="width:300px"><span class="timer__ring"><svg viewBox="0 0 44 44"><circle class="track" cx="22" cy="22" r="19"/><circle class="fill" cx="22" cy="22" r="19" style="stroke-dasharray:119.4;stroke-dashoffset:94"/></svg>${icon('clock', 'sm')}</span><span><span class="timer__label">Next free ticket</span><span class="timer__digits">05:12:33</span></span></div>`), st('Earn line', `<p class="earn-line">${icon('ticket', 'sm')}<span>Tickets also come as you play<small>1 ticket for every 50K GC played</small></span></p>`)].join(''), a11y: 'role="timer"; announced only when Ready. Tabular figures so digits do not jump.' },
  { id: 'winnings-tab', name: 'plinko/winnings-tab', code: '.ticket-tab.winnings-tab.is-gained', desc: 'The winnings pool: everything won in this session. Lives inside plinko/board-tabs (Won property). Text properties: Total and Gain. Hidden until the first win; every prize flies into it with a gold +N. Tap opens the session summary.', demo: () => [st('Default', `<span class="ticket-tab winnings-tab" style="animation:none">${icon('gift', 'sm')}<span>Won 45 FS · 8K GC</span></span>`), st('Next to the tickets', `<span style="display:flex;gap:8px"><span class="ticket-tab">${icon('ticket', 'sm')}<span>3 tickets</span></span><span class="ticket-tab winnings-tab" style="animation:none">${icon('gift', 'sm')}<span>Won 45 FS</span></span></span>`)].join(''), a11y: 'A button with aria-haspopup="dialog"; the total is aria-live="polite".' },
  { id: 'summary-row', name: 'plinko/summary-row', code: '.summary-row', desc: 'One prize type in the session summary: icon, name, number of wins, total.', demo: () => [st('Summary row', `<div class="summary-row" style="width:320px"><img class="reward-icon" style="width:48px;height:48px" src="${IMG}img-reward-gold-coins@2x.webp" alt=""><span class="summary-row__name">Gold Coins<small>1 win</small></span><span class="summary-row__amount">8K</span></div>`)].join(''), a11y: 'The toast is role="status".' },
  { id: 'status-art', name: 'plinko/status-art', code: '.status-art > img', desc: 'Art for system states. Cool colours, no gold: nothing here should look like a reward.', demo: () => st('Offline', `<img class="status-art" src="${IMG}img-status-offline@2x.webp" alt="">`), a11y: 'Decorative; the message is in text.' },
  { id: 'scrim', name: 'plinko/scrim', code: '.scrim.scrim--blur-high.scrim--center', desc: 'Dimmed, blurred layer under every overlay. Blur Low, Medium, High; align Center or Bottom.', demo: () => ['low', 'medium', 'high'].map((b) => st('Blur ' + b, `<div style="position:relative;width:120px;height:90px;border-radius:12px;overflow:hidden;background:conic-gradient(var(--magenta-500),var(--gold-300),var(--blue-500),var(--magenta-500))"><div class="scrim scrim--blur-${b}"></div></div>`)).join(''), a11y: 'Not focusable. Focus stays in the overlay above it.' },
];
function components() {
  const css = COMPONENTS_CSS.replace(/\}/g, '}\n');
  const tokensFor = (classes) => {
    const set = new Set();
    for (const rule of css.split('\n')) { if (classes.some((c) => rule.includes('.' + c))) for (const m of rule.matchAll(/var\((--[\w-]+)/g)) set.add(m[1]); }
    return [...set];
  };
  $('#nav-components').innerHTML = COMPONENTS.map((c) => `<a href="#c-${c.id}">${c.name.split(',')[0].replace('plinko/', '').replace('/*', '')}</a>`).join('');
  $('#component-list').innerHTML = COMPONENTS.map((c) => {
    const classes = [...c.code.matchAll(/\.([a-z][\w-]*)/g)].map((m) => m[1]).filter((x) => !x.startsWith('is-') && !x.includes('--'));
    const toks = tokensFor([...new Set(classes)]);
    return `<article class="comp" id="c-${c.id}"><h3>${esc(c.name)}</h3><div class="meta"><span class="chip">Code <code>${esc(c.code)}</code></span></div><p>${esc(c.desc)}</p>
      <div class="stage" data-token-mode="mobile">${c.demo()}</div>
      <h4>Accessibility</h4><p>${esc(c.a11y)}</p>
      ${toks.length ? `<details><summary style="cursor:pointer;color:var(--on-surface-muted);margin-top:8px">Tokens used (${toks.length})</summary><p style="margin-top:6px">${toks.map((t) => `<code>${t}</code>`).join(' ')}</p></details>` : ''}</article>`;
  }).join('');
  COMPONENTS.forEach((c) => { const el = $('#c-' + c.id); c.after?.(el); c.wire?.(el); });
}

/* ---------- Nav ---------- */
function nav() {
  const links = [...document.querySelectorAll('.docs-nav a[href^="#"]:not(.docs-nav__brand)')];
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-10% 0px -80% 0px' });
  document.querySelectorAll('main section, .comp').forEach((s) => io.observe(s));
  const btn = $('#menu-btn'), navEl = $('#docs-nav');
  btn.addEventListener('click', () => { const open = !navEl.classList.contains('is-open'); navEl.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open); });
  navEl.addEventListener('click', (e) => { if (e.target.closest('a')) { navEl.classList.remove('is-open'); btn.setAttribute('aria-expanded', false); } });
}

(async function init() {
  await loadTokens();
  stats(); colour(); typography(); space(); effects(); icons();
  motion(); choreography(); soundTable(); hapticsTable(); physics(); prizes(); components(); nav();
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
})();
