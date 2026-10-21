/* Plinko prototype: state machine and screens.
   States: closed -> onboarding -> ready <-> dropping -> result (toast | sheet | takeover) -> ready | empty -> closed
   One source of truth (state), screens react to it. The outcome is decided before the drop (model.decideOutcome),
   physics only animates it. Everything works with sound off. ?debug=1 shows sound triggers and the decided outcome. */

import { RISK, RISK_ORDER, BASE_PRIZE, binsFor, decideOutcome, rng, oddsTable, fmtPct, expectedValue } from '../../design-system/js/model.js';
import { ICONS, icon } from '../../design-system/js/icons.js';
import { createSound } from '../../design-system/js/sound.js';
import { createHaptics } from '../../design-system/js/haptics.js';
import { createFx } from '../../design-system/js/fx.js';
import { Board } from './board.js';

const $ = (s, r = document) => r.querySelector(s);
const msVar = (name, fb) => { const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); return v ? parseFloat(v) * (v.endsWith('ms') ? 1 : 1000) : fb; };
/* Move focus for keyboard users only; after a tap the ring would look like a bug */
let keyboardUser = false;
addEventListener('keydown', (e) => { if (e.key === 'Tab' || e.key.startsWith('Arrow')) keyboardUser = true; }, true);
addEventListener('pointerdown', () => { keyboardUser = false; }, true);
const FOCUS = { preventScroll: true, focusVisible: false };
HTMLElement.prototype.focusKb = function () { if (keyboardUser) this.focus({ preventScroll: true }); };
const IMG = '../design-system/assets/img/';
const params = new URLSearchParams(location.search);
const store = { get(k, d) { try { const v = localStorage.getItem('plinko:' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('plinko:' + k, JSON.stringify(v)); } catch { /* storage off: keep in memory */ } } };

const state = {
  screen: 'closed',              // closed | onboarding | ready | dropping | result | empty
  risk: 'low',                   // first open starts on Low
  tickets: 5,
  force: '',                     // demo only
  sound: store.get('sound', true),
  haptics: store.get('haptics', true),
  seenWelcome: store.get('seenWelcome', false),
  reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
  timerEnd: Date.now() + (5 * 3600 + 12 * 60 + 33) * 1000,
};
const random = rng(params.has('seed') ? Number(params.get('seed')) : undefined);

const sound = createSound();
const haptics = createHaptics();
const fx = createFx($('#fx'));
const board = new Board($('#board'));
sound.setMuted(!state.sound);
haptics.enabled = state.haptics;

/* ---------- Debug overlay (?debug=1 or Demo > Debug) ---------- */
const debugEl = $('#debug');
const log = [];
function debug(msg) { log.unshift(msg); log.length = 14; debugEl.textContent = log.filter(Boolean).join('\n'); }
sound.onTrigger = (id, o = {}) => debug('sound ' + id + (o.row !== undefined ? ' row ' + o.row : '') + (o.level ? ' ' + o.level : ''));
const play = (id, o) => sound.play(id, o);
const buzz = (id) => { if (!navigator.userActivation || navigator.userActivation.hasBeenActive) haptics.play(id); };  // browsers block vibration before the first tap
if (params.has('debug')) { debugEl.hidden = false; $('#demo-debug').setAttribute('aria-pressed', 'true'); }

/* ---------- Static content ---------- */
$('#btn-sound').innerHTML = icon('sound-on');
$('#btn-close').innerHTML = icon('close');
$('#prize-strip').innerHTML = `${icon(BASE_PRIZE.icon, 'md')}<span>Today's prize:</span><span class="prize-strip__prize">${BASE_PRIZE.amount} ${BASE_PRIZE.name}</span>`;
$('.ticket-tab__icon').outerHTML = icon('ticket', 'sm');
$('.winnings-tab__icon').outerHTML = icon('gift', 'sm');
$('#btn-rules').innerHTML = `${icon('info', 'md', 'icon--accent')}<span class="footer-link__text"><span class="footer-link__title">Rules and odds</span><span class="footer-link__desc">Same average at every level: ~${BASE_PRIZE.amount} FS</span></span>${icon('arrow-right', 'sm', 'icon--muted')}`;
$('#earn-line').innerHTML = `${icon('ticket', 'sm')}<span>Tickets also come as you play<small>1 ticket for every 50K GC played</small></span>`;
$('.timer__ring').insertAdjacentHTML('beforeend', icon('clock', 'sm'));

/* ---------- Risk selector (plinko/risk-selector) ---------- */
const track = $('.risk-selector__track');
function chartSVG(risk) {
  const bins = binsFor(risk);
  const h = (b) => 12 + 88 * Math.log(b.m / 0.2) / Math.log(30 / 0.2);   // log scale 0.2x to 30x
  return `<svg class="risk-chart" viewBox="0 0 54 14" aria-hidden="true">${bins.map((b, i) => { const v = h(b) * 0.14; return `<rect x="${(i * 6.1).toFixed(1)}" y="${(14 - v).toFixed(1)}" width="4.6" height="${v.toFixed(1)}" rx="1" data-heat="${b.heat}" style="--d:${Math.abs(i - 4)}"/>`; }).join('')}</svg>`;
}
RISK_ORDER.forEach((r, i) => track.insertAdjacentHTML('beforeend',
  `<button class="risk-segment risk-segment--${r}" type="button" role="radio" aria-checked="false" data-risk="${r}" tabindex="-1"><span class="risk-segment__label">${RISK[r].label}</span>${chartSVG(r)}</button>`));
const segments = [...track.querySelectorAll('.risk-segment')];

function setRisk(r, user = false) {
  if (user && r === state.risk) return;
  state.risk = r;
  const i = RISK_ORDER.indexOf(r);
  track.style.setProperty('--i', i);
  segments.forEach((s) => { const on = s.dataset.risk === r; s.setAttribute('aria-checked', on); s.tabIndex = on ? 0 : -1; s.querySelector('.risk-chart').classList.toggle('is-selected', on); });
  const cap = $('.risk-selector__caption');
  if (user && !state.reduced) { cap.style.opacity = 0; setTimeout(() => { cap.textContent = RISK[r].caption; cap.style.opacity = 1; }, 150); } else cap.textContent = RISK[r].caption;
  board.setBins(r, user, (i) => { if (user) play('coin-tick', { count: 2 + Math.abs(i - 4) * 2 }); });   // a click as each reel stops
  if (user) { play('risk-change', { level: r }); setTimeout(() => play('bins-shuffle'), 120); buzz('selection'); }
}
track.addEventListener('click', (e) => { const b = e.target.closest('.risk-segment'); if (b && !b.disabled) setRisk(b.dataset.risk, true); });
track.addEventListener('keydown', (e) => {
  const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d || state.screen !== 'ready') return;
  e.preventDefault(); const i = (RISK_ORDER.indexOf(state.risk) + d + 3) % 3; setRisk(RISK_ORDER[i], true); segments[i].focus();
});
function setControlsEnabled(on) {
  segments.forEach((s) => { s.disabled = !on; });
  $('#risk').classList.toggle('is-disabled', !on);
}

/* ---------- Tickets ---------- */
function renderTickets(gained = false) {
  const n = state.tickets, label = `${n} ticket${n === 1 ? '' : 's'}`;
  $('.ticket-tab__count').textContent = label;
  $('#ticket-tab').classList.toggle('is-empty', n === 0);
  $('#ticket-tab').classList.toggle('is-low', n === 1);   // plinko/ticket-tab, State=Low: the last ticket
  if (gained) { const t = $('#ticket-tab'); t.classList.remove('is-gained'); void t.offsetWidth; t.classList.add('is-gained'); }
  $('#btn-drop .button__sublabel').textContent = `${n} ticket${n === 1 ? '' : 's'} left`;
}

/* ---------- Winnings pool: everything won in this session (plinko/winnings-tab, plinko/session-summary) ---------- */
state.won = [];
const fmtK = (n) => (n >= 1000 ? String(+(n / 1000).toFixed(1)) + 'K' : String(n));
const parseAmount = (a) => (/K$/.test(a) ? parseFloat(a) * 1000 : Number(a));
function prizesOf(bin) {
  if (bin.edge) return bin.contents.map((c) => ({ kind: c.label, amount: parseAmount(c.amount), image: c.image }));
  if (bin.gc) return [{ kind: 'Gold Coins', amount: bin.gc, image: 'img-reward-gold-coins' }];
  return [{ kind: 'Free Spins', amount: Number(bin.amount), image: 'img-reward-free-spins' }];
}
function totals() {
  const t = {};
  for (const w of state.won) { t[w.kind] ??= { amount: 0, image: w.image, wins: 0 }; t[w.kind].amount += w.amount; t[w.kind].wins += 1; }
  return t;
}
/** "45 FS · 8K GC · 1 item": what the winnings tab and the session summary show. Tickets won go to the balance, not to the pool. */
function totalLabel() {
  const t = totals(), parts = [];
  if (t['Free Spins']) parts.push(`${t['Free Spins'].amount} FS`);
  if (t['Gold Coins']) parts.push(`${fmtK(t['Gold Coins'].amount)} GC`);
  const items = (t.Collectable?.amount || 0) + (t['Rare collectable']?.amount || 0);
  if (items) parts.push(`${items} item${items > 1 ? 's' : ''}`);
  return parts.join(' · ');
}
function addWin(bin, delay = 0) {
  const items = prizesOf(bin);
  state.won.push(...items);                 // counted at once, so a fast Close or Drop again never loses it
  const label = totalLabel(), main = items.find((i) => i.kind !== 'Tickets');
  debug('pool ' + label);
  if (!label || !main) return;              // tickets go to the ticket balance; the pool tab is unchanged
  const show = () => {
    const tab = $('#winnings-tab'), first = tab.hidden;
    tab.hidden = false;
    $('.winnings-tab__total').textContent = 'Won ' + totalLabel();
    tab.querySelector('.ticket-tab__gain').textContent = main.kind === 'Gold Coins' ? `+${fmtK(main.amount)}` : main.kind === 'Free Spins' ? `+${main.amount}` : '+1';
    if (!first) { tab.classList.remove('is-gained'); void tab.offsetWidth; tab.classList.add('is-gained'); }
  };
  if (delay) setTimeout(() => { if (state.won.length) show(); }, delay); else show();   // the prize "flies" into the tab
}
const timeLeft = () => { const left = Math.max(0, state.timerEnd - Date.now()); return [Math.floor(left / 3.6e6), Math.floor(left / 6e4) % 60, Math.floor(left / 1000) % 60].map((x) => String(x).padStart(2, '0')).join(':'); };

/* Session summary: shown when the player leaves with prizes, or taps the winnings tab */
function showSummary(reason) {
  state.summaryOpen = true;
  const t = totals(), n = state.tickets;
  const rows = Object.entries(t).map(([k, v]) => `<li class="summary-row"><img class="reward-icon" src="${IMG}${v.image}@2x.webp" alt=""><span class="summary-row__name">${k}<small>${v.wins} win${v.wins > 1 ? 's' : ''}${k === 'Tickets' ? ', added to your balance' : ''}</small></span><span class="summary-row__amount">${k === 'Gold Coins' ? fmtK(v.amount) : v.amount}</span></li>`).join('');
  const keep = `<button class="button button--primary button--lg" type="button" data-act="keep" data-autofocus><span class="button__label">Keep playing</span><span class="button__sublabel">${n} ticket${n === 1 ? '' : 's'} left</span></button>`;
  const lobbyPrimary = `<button class="button button--primary button--lg" type="button" data-act="lobby" data-autofocus><span class="button__label">Back to lobby</span></button>`;
  const actions = n > 0 ? keep + `<button class="link" type="button" data-act="lobby">Back to lobby</button>`
    : lobbyPrimary + (reason === 'view' ? `<button class="link" type="button" data-act="keep">Close</button>` : '');
  openLayer(`<div class="summary anim-sheet-enter" role="dialog" aria-modal="true" aria-labelledby="s-title">
    <div class="summary__head"><h2 class="summary__title gold-text" id="s-title">Your winnings</h2><p class="summary__sub">This session. Everything is already in My Rewards.</p></div>
    <ul class="summary__list">${rows}</ul>
    <p class="summary__next">${icon('clock', 'sm')}<span>Next free ticket in <b data-next>${timeLeft()}</b></span></p>
    <div class="summary__actions">${actions}</div>
  </div>`, 'bottom', 'low');
  play('ui-open'); buzz('tap');
  const tick = setInterval(() => { const b = layer.querySelector('[data-next]'); if (b) b.textContent = timeLeft(); else clearInterval(tick); }, 1000);
  layer.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', async () => {
    state.summaryOpen = false;
    if (b.dataset.act === 'keep') { play('ui-tap'); buzz('tap'); await closeLayer(); (state.screen === 'empty' ? $('#btn-lobby') : $('#btn-drop')).focusKb(); }
    else { await closeLayer(); closeGame(true); }
  }));
}

/* ---------- Screens ---------- */
const layer = $('#layer');
function openLayer(html, align = 'center', blur = 'medium', scrim = '--scrim-medium') {
  layer.innerHTML = `<div class="layer__scrim ${blur ? 'scrim--blur-' + blur : ''} anim-fade-in" style="background:var(${scrim})"></div>${html}`;
  layer.className = 'layer layer--' + align; layer.hidden = false;
  setBackgroundInert(true);
  const first = layer.querySelector('[data-autofocus]') || layer.querySelector('button'); first?.focusKb();
}
/* Focus stays inside an open dialog: everything behind it is inert */
function setBackgroundInert(on) {
  document.querySelectorAll('.popup__header, .popup__body, .popup__footer').forEach((el) => { el.inert = on; });
  $('#demo-toggle').tabIndex = on ? -1 : 0;   // reviewer tool: still clickable, out of the Tab order while a dialog is open
}
function closeLayer() {
  return new Promise((res) => {
    if (layer.hidden) return res();
    const panel = layer.lastElementChild;
    const cls = panel.classList.contains('anim-sheet-enter') ? 'anim-sheet-exit' : 'anim-modal-exit';
    panel.classList.remove('anim-sheet-enter', 'anim-modal-enter'); panel.classList.add(cls);
    layer.firstElementChild.classList.replace('anim-fade-in', 'anim-fade-out');
    setTimeout(() => { layer.hidden = true; layer.innerHTML = ''; setBackgroundInert(false); res(); }, state.reduced ? 160 : 220);
  });
}

function setScreen(s) {
  state.screen = s;
  const empty = s === 'empty';
  $('#controls').dataset.state = empty ? 'empty' : 'ready';
  board.setDimmed(empty);
  const drop = $('#btn-drop');
  drop.classList.toggle('is-loading', s === 'dropping');
  drop.setAttribute('aria-busy', s === 'dropping');
  drop.querySelector('.spinner').hidden = s !== 'dropping';
  drop.classList.toggle('is-pulse', s === 'ready');
  drop.querySelector('.button__label').textContent = state.dropped ? 'Drop again' : 'Drop';
  setControlsEnabled(s === 'ready');
  if (empty) { startTimer(); play('no-tickets'); }
  debug('state ' + s);
}

/* Open and close the game */
function openGame(auto = false) {
  sound.unlock();   // resumes audio on a user tap; on auto-open it waits for the first tap (browser rule)
  $('#game').hidden = false; $('#game').classList.remove('is-closing');
  const p = $('#popup'); p.classList.remove('anim-modal-exit'); p.classList.add('anim-modal-enter');
  // Auto-open has no user gesture, and browsers block sound until the first tap: the opening sound waits for that tap.
  // Opened by a tap: it plays as soon as the sound files are ready (a moment on the very first open).
  if (auto) state.openSoundPending = true; else sound.unlock().then(() => play('popup-open'));
  buzz('tap');
  board.layout(); board.setBins(state.risk); board.resetBall();
  renderTickets();
  if (state.tickets === 0) setScreen('empty'); else setScreen('ready');
  setTimeout(() => sound.startAmbient(), 600);
  if (!state.seenWelcome) setTimeout(showWelcome, state.reduced ? 100 : 450);
  else $('#btn-drop').focusKb();
}
function closeGame(skipSummary = false) {
  if (state.buildingUp) return;            // the 0.35 to 0.6 s build-up before a big or mega win card cannot be skipped
  if (!skipSummary && totalLabel() && state.screen !== 'dropping') { showSummary('exit'); return; }   // the exit of the loop: show what was won
  play('ui-close'); buzz('tap'); sound.stopAmbient();
  state.won = [];                         // the session ends; the prizes are already in My Rewards
  $('#winnings-tab').hidden = true;
  const g = $('#game'), p = $('#popup');
  g.classList.add('is-closing'); p.classList.remove('anim-modal-enter'); p.classList.add('anim-modal-exit');
  $('#takeover-root').innerHTML = '';
  setTimeout(() => { g.hidden = true; layer.hidden = true; layer.innerHTML = ''; state.screen = 'closed'; stopTimer(); $('#demo-toggle').focusKb(); }, 220);   // Back to lobby: the player is on the homepage again, no extra toast
}


/* Onboarding: welcome card (plinko/welcome-card) */
function showWelcome() {
  state.screen = 'onboarding';
  const steps = [
    ['ticket', 'Get tickets', 'They come as you play any game: 1 ticket for every 50K GC played. You also get 1 free ticket every day.'],
    ['chest', 'Pick your risk', 'Risk changes the size of the prizes, not the chances.'],
    ['free-spins', 'Tap Drop', 'One ticket, one ball. Every drop wins a prize.'],
  ];
  openLayer(`<div class="card anim-modal-enter" role="dialog" aria-modal="true" aria-labelledby="w-title">
    <span class="reward-art card__art"><img class="reward-icon" src="${IMG}img-reward-ticket@2x.webp" alt=""></span>
    <button class="icon-button card__close" type="button" data-act="start" aria-label="Close">${icon('close')}</button>
    <div class="card__head"><h2 class="card__title" id="w-title">Welcome to Plinko</h2>
    <p class="card__sub">Turn your tickets into prizes</p></div>
    <div class="card__steps">${steps.map(([ic, t, d]) => `<div class="list-row"><span class="list-row__disc">${icon(ic, 'sm')}</span><span><span class="list-row__title">${t}</span><span class="list-row__desc">${d}</span></span></div>`).join('')}</div>
    <div class="prize-strip prize-strip--gift">1 free ticket every day</div>
    <div class="card__actions"><button class="button button--primary button--lg" type="button" data-act="start" data-autofocus><span class="button__label">Let's play</span></button>
    <label class="checkbox-row"><input class="checkbox" type="checkbox" id="w-dont"><span>Don't show this again</span></label>
    <p class="card__hint">${icon('info', 'xs', 'icon--muted')}You can always find this in Rules and odds</p></div>
  </div>`, 'center', 'medium');
  play('ui-open');
  layer.querySelector('#w-dont').addEventListener('change', (e) => { play('ui-toggle', { on: e.target.checked }); buzz('selection'); });
  layer.querySelectorAll('[data-act="start"]').forEach((b) => b.addEventListener('click', async () => {
    play('ui-tap'); buzz('tap');
    if (layer.querySelector('#w-dont').checked) { state.seenWelcome = true; store.set('seenWelcome', true); }
    state.seenWelcome = true;   // shown once per session in any case
    await closeLayer(); setScreen('ready'); $('#btn-drop').focusKb();
  }));
}

/* The drop */
async function startDrop() {
  if (state.screen !== 'ready' || state.tickets < 1 || state.busy) return;
  state.busy = true;                       // one drop at a time, even while a layer is closing
  try { await closeLayer(); } finally { state.busy = false; }
  if (state.screen !== 'ready') return;
  $('#takeover-root').innerHTML = '';
  // 1. decide the result first (server in production), 2. spend the ticket, 3. animate
  const bin = decideOutcome(state.risk, random, state.force || null);
  debug(`outcome bin ${bin.index} ${bin.label} (${bin.tier})`);
  state.tickets -= 1; state.dropped = true; state.drops = (state.drops || 0) + 1; renderTickets();
  setScreen('dropping');
  play('ui-tap'); buzz('ball-release');
  await board.drop(bin.index, random, (e) => {
    if (e.type === 'release') play('ball-release');
    if (e.type === 'peg') { play('peg-hit', { row: e.row }); if (e.row >= 6) buzz('peg-last-rows'); }
    if (e.type === 'last-rows' && !state.reduced) play('riser');
    if (e.type === 'land') { sound.stop('riser'); play('bin-land', { heat: bin.heat }); buzz('bin-land'); }
  });
  showResult(bin);
}

function countUp(el, to, ms = 700) {
  const num = parseFloat(to), suffix = String(to).replace(/[\d.]/g, '');
  if (state.reduced || !isFinite(num)) { el.textContent = to; return; }
  const t0 = performance.now(); let lastTick = -1;
  const step = (now) => {
    const k = Math.min((now - t0) / ms, 1), v = Math.round(num * (1 - Math.pow(1 - k, 3)));
    el.textContent = v + suffix;
    const tick = Math.floor(k * 12); if (tick !== lastTick) { lastTick = tick; play('coin-tick', { count: tick }); }
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function afterResult() {
  if (state.tickets > 0) setScreen('ready'); else setScreen('empty');
}

function primaryAfterWin() {
  return state.tickets > 0
    ? `<button class="button button--primary button--lg" type="button" data-act="again" data-autofocus><span class="button__label">Drop again</span><span class="button__sublabel">${state.tickets} ticket${state.tickets === 1 ? '' : 's'} left</span></button>`
    : `<button class="button button--primary button--lg" type="button" data-act="close" data-autofocus><span class="button__label">Continue</span></button>`;
}

async function showResult(bin) {
  state.screen = 'result';
  const p = board.binPoint(bin.index);
  if (bin.tier === 'small') {
    // Small: toast over the bin, the game does not stop (plinko/toast)
    const pop = $('#popup').getBoundingClientRect();
    const t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status');
    t.style.left = (p.x - pop.left) + 'px'; t.style.top = (p.y - pop.top - 8) + 'px';
    t.innerHTML = `<span class="toast__amount">+${bin.amount}</span>${bin.unit}`;
    $('#popup').appendChild(t); setTimeout(() => t.remove(), msVar('--motion-toast-float-duration', 2200) + 100);
    play('win-small'); buzz('win-small');
    if (!state.reduced) fx.play('small', p.x, p.y);
    addWin(bin, state.reduced ? 0 : 700);   // counted now, the tab updates after the toast
    const drop = state.drops;
    setTimeout(() => { if (state.drops === drop && state.screen !== 'dropping') board.resetBall(); }, 1500);   // the ball goes back to the chute
    afterResult();
    return;
  }
  if (bin.tier === 'big') {
    // Big: the bulbs flare first (plinko/frame State=Flare), then a short sheet over the controls (plinko/win-sheet)
    state.buildingUp = true; await board.buildUp('big'); state.buildingUp = false;
    openLayer(`<div class="win-sheet anim-sheet-enter" role="dialog" aria-modal="true" aria-labelledby="ws-title">
      <div class="win-sheet__row">
        <span class="reward-art reward-art--md has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}${bin.image}@2x.webp" alt=""></span>
        <span class="win-sheet__text"><span class="win-sheet__title gold-text" id="ws-title">Big win!</span><span class="win-sheet__amount"><b data-count>${bin.amount}</b>${bin.unit}</span></span>
        <span class="win-sheet__added">Added to<br>My Rewards</span>
      </div>
      <div class="win-sheet__actions">${primaryAfterWin()}
      <button class="link" type="button" data-act="close">Close</button></div>
    </div>`, 'bottom', 'low');
    countUp(layer.querySelector('[data-count]'), bin.amount);
    play('win-big'); buzz('win-big'); setTimeout(() => play('reward-collect'), 900);
    if (!state.reduced) fx.play('big', p.x, p.y);
    wireWin(layer, bin);
    return;
  }
  // Mega: full takeover (plinko/win-takeover)
  const ticketsWon = bin.kind === 'ticket' ? bin.m : 0;   // Low edge prize: +3 tickets go straight to the balance
  if (ticketsWon) { state.tickets += ticketsWon; renderTickets(true); setTimeout(() => play('ticket-gain'), 1200); }
  // the frame turns gold and the bulbs flare (plinko/frame State=Celebrate), then the takeover opens
  buzz('bin-land');
  state.buildingUp = true; await board.buildUp('mega'); state.buildingUp = false;
  const root = $('#takeover-root');
  root.innerHTML = `<div class="takeover anim-modal-enter" role="dialog" aria-modal="true" aria-labelledby="wt-title">
    <button class="icon-button takeover__close" type="button" data-act="close" aria-label="Close">${icon('close')}</button>
    <h2 class="takeover__title pink-text" id="wt-title">Mega win!</h2>
    <span class="reward-art reward-art--lg has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}${bin.image}@2x.webp" alt=""></span>
    <div class="takeover__content"><p class="takeover__name">${bin.name}</p>
    <div class="takeover__tiles" style="--n:${bin.contents.length}">${bin.contents.map((c) => `<div class="reward-tile"><img class="reward-icon" src="${IMG}${c.image}@2x.webp" alt=""><span class="reward-tile__amount">${c.amount}</span><span class="reward-tile__label">${c.label}</span></div>`).join('')}</div>
    <div class="takeover__actions">${primaryAfterWin()}
    <button class="link" type="button" data-act="close">Close</button></div></div>
    <p class="takeover__added">${ticketsWon ? `+${ticketsWon} tickets added to your balance` : 'Added to My Rewards'}</p>
  </div>`;
  setBackgroundInert(true);
  root.querySelector('[data-autofocus]')?.focusKb();
  sound.duck(4000); play('win-mega'); buzz('win-mega');
  if (!state.reduced) { const r = root.querySelector('.reward-art').getBoundingClientRect(); fx.play('mega', r.left + r.width / 2, r.top + r.height / 2); }
  wireWin(root, bin);
}

function wireWin(root, bin) {
  root.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', async () => {
    if (root.dataset.done) return; root.dataset.done = 1;
    const again = b.dataset.act === 'again';
    play(again ? 'ui-tap' : 'ui-close'); buzz('tap');
    fx.clear();
    if (root.id === 'takeover-root') { root.firstElementChild.classList.replace('anim-modal-enter', 'anim-modal-exit'); await wait(200); root.innerHTML = ''; setBackgroundInert(false); }
    else await closeLayer();
    board.resetBall();                      // the ball goes back to the chute
    addWin(bin);
    delete root.dataset.done;
    afterResult();
    if (again) startDrop(); else $('#btn-drop').focusKb();
  }));
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* No tickets: timer to the next free ticket (plinko/timer) */
let timerId = 0;
function startTimer() {
  stopTimer();
  const ring = $('#timer .fill'), C = 2 * Math.PI * 19, total = 24 * 3600 * 1000;
  ring.style.strokeDasharray = C;
  const tick = () => {
    const left = Math.max(0, state.timerEnd - Date.now());
    const h = Math.floor(left / 3.6e6), m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1000) % 60;
    $('#timer .timer__digits').textContent = [h, m, s].map((x) => String(x).padStart(2, '0')).join(':');
    ring.style.strokeDashoffset = C * (left / total);
    if (left === 0) freeTicketReady();
  };
  tick(); timerId = setInterval(tick, 1000);
}
function stopTimer() { clearInterval(timerId); timerId = 0; }
function freeTicketReady() {
  stopTimer();
  const t = $('#timer'); t.classList.add('is-ready'); $('#timer .timer__digits').textContent = 'Ready!';
  $('#timer .fill').style.strokeDashoffset = 0;
  play('timer-ready'); buzz('timer-ready');
  setTimeout(() => {
    t.classList.remove('is-ready');
    state.tickets += 1; state.timerEnd = Date.now() + 24 * 3600 * 1000;
    renderTickets(true); play('ticket-gain'); buzz('ticket-gain');
    if (state.screen === 'empty') { setScreen('ready'); board.resetBall(); }
  }, 900);
}

/* Rules and odds drawer (plinko/drawer) */
function showRules(tab = 'chances') {
  const tabs = [['how', 'How to play'], ['chances', 'Chances'], ['rules', 'Rules']];
  const steps = [['ticket', 'Get tickets', 'They come as you play any game: 1 ticket for every 50K GC played. You also get 1 free ticket every day.'], ['chest', 'Pick your risk', 'Risk changes the size of the prizes, not the chances.'], ['free-spins', 'Tap Drop', 'One ticket, one ball. Every drop wins a prize.']];
  const vib = haptics.supported ? `<button class="setting-row" type="button" data-set="haptics">${icon(state.haptics ? 'vibration-on' : 'vibration-off')}<span>Vibration</span><span class="toggle" role="switch" aria-checked="${state.haptics}" aria-label="Vibration"><span class="toggle__track"><span class="toggle__knob"></span></span></span></button>` : '';
  openLayer(`<div class="drawer anim-sheet-enter" role="dialog" aria-modal="true" aria-labelledby="d-title">
    <span class="drawer__grab" aria-hidden="true"></span>
    <div class="drawer__head"><h2 class="drawer__title" id="d-title">Rules and odds</h2><button class="icon-button" type="button" data-act="close" aria-label="Close">${icon('close')}</button></div>
    <div class="tab-bar" role="tablist" aria-label="Rules and odds"><span class="tab-bar__thumb" aria-hidden="true"></span>${tabs.map(([id, l]) => `<button class="tab" role="tab" type="button" id="tab-${id}" aria-controls="panel-${id}" data-tab="${id}">${l}</button>`).join('')}</div>
    <div class="drawer__body">
      <div class="drawer__panel" role="tabpanel" id="panel-how" aria-labelledby="tab-how">
        <div class="steps">${steps.map(([ic, t, d]) => `<div class="list-row"><span class="list-row__disc">${icon(ic, 'sm')}</span><span><span class="list-row__title">${t}</span><span class="list-row__desc">${d}</span></span></div>`).join('')}</div>
        <button class="button button--neutral button--md button--block" type="button" data-act="welcome"><span class="button__label" style="text-transform:none">Show the welcome screen again</span></button>
      </div>
      <div class="drawer__panel" role="tabpanel" id="panel-chances" aria-labelledby="tab-chances">
        <div class="pill-group" role="radiogroup" aria-label="Risk level">${RISK_ORDER.map((r) => `<button class="pill" type="button" role="radio" data-pill="${r}">${RISK[r].label}</button>`).join('')}</div>
        <table class="odds"><thead><tr><th aria-hidden="true"></th><th>Prize</th><th class="num">Chance</th></tr></thead><tbody></tbody></table>
        <p class="info-note"></p>
      </div>
      <div class="drawer__panel drawer__panel--rules" role="tabpanel" id="panel-rules" aria-labelledby="tab-rules">
        <ul class="rules">
          <li>The result is set by a random number generator the moment you tap Drop. The ball shows that result.</li>
          <li>Today's prize changes every day at 00:00 ET.</li>
          <li>Prizes go to My Rewards right away. Free Spins are valid for 7 days in the featured game.</li>
          <li>Tickets can't be bought or swapped for coins. Unused tickets stay in your balance.</li>
          <li>Plinko prizes have no cash value and never include Sweeps Coins.</li>
          <li>Need a break? Set limits in <b>Player Trust &amp; Safety Controls</b>.</li>
        </ul>
        <p class="drawer__label">Settings</p>
        <button class="setting-row" type="button" data-set="sound">${icon(state.sound ? 'sound-on' : 'sound-off')}<span>Sound</span><span class="toggle" role="switch" aria-checked="${state.sound}" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></span></button>
        ${vib}
      </div>
    </div>
  </div>`, 'bottom', 'low');
  play('ui-open');
  const d = layer.querySelector('.drawer');
  const selectTab = (id, user) => {
    tabs.forEach(([t], i) => { const on = t === id; const b = d.querySelector('#tab-' + t); b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; d.querySelector('#panel-' + t).hidden = !on; if (on) d.querySelector('.tab-bar').style.setProperty('--i', i); });
    if (user) { play('ui-tab'); buzz('selection'); }
  };
  const odds = (risk, user) => {
    d.querySelectorAll('.pill').forEach((p) => p.setAttribute('aria-checked', p.dataset.pill === risk));
    d.querySelector('.odds tbody').innerHTML = oddsTable(risk).map((o) => {
      const b = o.bin, chip = b.edge ? icon(b.icon, 'sm') : b.gc ? `<span class="bin-content bin-content--gc">${icon('coin', 'xs')}${b.amount}</span>` : b.amount;
      const short = (l) => ({ 'Free Spins': 'FS', 'Gold Coins': 'GC' }[l] || l.toLowerCase());
      const contents = b.edge && b.contents.length > 1 ? `<small>${b.contents.map((c) => c.amount + ' ' + short(c.label)).join(' + ')}</small>` : '';
      return `<tr><td><span class="odds__chip" data-heat="${b.heat}">${chip}</span></td><td><b>${b.label}</b>${contents}<small>${o.bins}</small></td><td class="num"><b>${fmtPct(o.chance)}</b><small>1 in ${o.oneIn}</small></td></tr>`;
    }).join('');
    d.querySelector('.info-note').innerHTML = `Chances are the same at every level. Only the prizes change. Average per drop: <b>about ${Math.round(expectedValue(risk) * BASE_PRIZE.amount)} FS</b> (2K GC value).`;
    if (user) { play('ui-tab'); buzz('selection'); }
  };
  selectTab(tab); odds(state.risk);
  d.querySelector('.tab-bar').addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (b) selectTab(b.dataset.tab, true); });
  d.querySelector('.tab-bar').addEventListener('keydown', (e) => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return;
    const cur = tabs.findIndex(([t]) => d.querySelector('#tab-' + t).getAttribute('aria-selected') === 'true');
    const n = tabs[(cur + k + 3) % 3][0]; selectTab(n, true); d.querySelector('#tab-' + n).focus();
  });
  d.querySelector('.pill-group').addEventListener('click', (e) => { const b = e.target.closest('.pill'); if (b) odds(b.dataset.pill, true); });
  d.querySelector('[data-act="close"]').addEventListener('click', async () => { play('ui-close'); buzz('tap'); await closeLayer(); state.screen === 'empty' || $('#btn-rules').focusKb(); });
  d.querySelector('[data-act="welcome"]').addEventListener('click', async () => { play('ui-tap'); await closeLayer(); showWelcome(); });
  d.querySelectorAll('[data-set]').forEach((row) => row.addEventListener('click', () => {
    const key = row.dataset.set; state[key] = !state[key]; store.set(key, state[key]);
    row.querySelector('.toggle').setAttribute('aria-checked', state[key]);
    if (key === 'sound') { sound.setMuted(!state.sound); syncSoundButton(); row.querySelector('.icon').outerHTML = icon(state.sound ? 'sound-on' : 'sound-off'); }
    else { haptics.enabled = state.haptics; row.querySelector('.icon').outerHTML = icon(state.haptics ? 'vibration-on' : 'vibration-off'); }
    play('ui-toggle', { on: state[key] }); buzz('selection');
  }));
}

function syncSoundButton() {
  const b = $('#btn-sound'); b.setAttribute('aria-pressed', state.sound); b.innerHTML = icon(state.sound ? 'sound-on' : 'sound-off');
  b.setAttribute('aria-label', state.sound ? 'Sound on' : 'Sound off');
}

/* ---------- Wiring ---------- */
$('#demo-open').addEventListener('click', () => { if ($('#game').hidden) openGame(); });   // no homepage widget: reviewers reopen the game from Demo
$('#btn-close').addEventListener('click', () => closeGame());
$('#btn-lobby').addEventListener('click', () => closeGame());
$('#btn-play-games').addEventListener('click', () => { play('ui-tap'); closeGame(); });
$('#btn-drop').addEventListener('click', startDrop);
$('#winnings-tab').addEventListener('click', () => { if (state.screen === 'ready' || state.screen === 'empty') showSummary('view'); });
$('#btn-rules').addEventListener('click', () => { play('ui-tap'); buzz('tap'); showRules('chances'); });
$('#btn-sound').addEventListener('click', () => {
  state.sound = !state.sound; store.set('sound', state.sound); sound.setMuted(!state.sound); syncSoundButton();
  if (state.sound) play('ui-toggle', { on: true }); buzz('selection');
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || $('#game').hidden) return;
  const act = $('#takeover-root [data-act="close"]') || layer.querySelector('[data-act="close"]') || layer.querySelector('[data-act="start"]') || layer.querySelector('[data-act="keep"]');
  if (act) act.click(); else if (state.screen !== 'dropping') closeGame();
});
syncSoundButton();
setRisk('low');
renderTickets();

/* ---------- Demo tools ---------- */
$('#demo-toggle').addEventListener('click', () => { const p = $('#demo-panel'); p.hidden = !p.hidden; $('#demo-toggle').setAttribute('aria-expanded', !p.hidden); });
// Any choice in the Demo panel closes it, so the reviewer sees the game at once (the buttons' own handlers run first)
$('#demo-panel').addEventListener('click', (e) => {
  if (!e.target.closest('button')) return;
  $('#demo-panel').hidden = true; $('#demo-toggle').setAttribute('aria-expanded', 'false');
  if (document.activeElement && $('#demo-panel').contains(document.activeElement) && $('#game').hidden) $('#demo-toggle').focus();
});
$('#demo-force').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; state.force = b.dataset.force; $('#demo-force').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b)); debug('force ' + (state.force || 'random')); });
$('#demo-tickets').addEventListener('click', () => { state.tickets += 5; renderTickets(true); if (state.screen === 'empty') { setScreen('ready'); board.resetBall(); } });
$('#demo-zero').addEventListener('click', () => { if (state.screen === 'dropping') return; state.tickets = 0; renderTickets(); if (state.screen !== 'closed') setScreen('empty'); });
$('#demo-free').addEventListener('click', () => { if (state.screen === 'empty') freeTicketReady(); else { state.tickets += 1; renderTickets(true); play('ticket-gain'); } });
$('#demo-motion').addEventListener('click', (e) => {
  state.reduced = !state.reduced; board.reduced = state.reduced;
  document.documentElement.dataset.motion = state.reduced ? 'reduced' : '';
  e.currentTarget.setAttribute('aria-pressed', state.reduced);
});
$('#demo-debug').addEventListener('click', (e) => { debugEl.hidden = !debugEl.hidden; e.currentTarget.setAttribute('aria-pressed', !debugEl.hidden); });
$('#demo-reset').addEventListener('click', () => { store.set('seenWelcome', false); state.seenWelcome = false; state.tickets = 5; state.dropped = false; state.risk = 'low'; setRisk('low'); renderTickets(); state.won = []; $('#winnings-tab').hidden = true; if (!$('#game').hidden) closeGame(true); setTimeout(openGame, 400); });
board.reduced = state.reduced;
if (state.reduced) document.documentElement.dataset.motion = 'reduced';

// Test hook for automated checks (Playwright): read-only view of the state
window.__plinko = { state, open: openGame, drop: startDrop };
// The game opens by itself over the lobby. Audio starts on the first tap. To open it again after closing: Demo > Open Plinko.
// iOS starts audio only on touchend or click, so all gesture types are listened to.
const firstGesture = () => {
  if (!state.openSoundPending) return;
  sound.unlock().then(() => {
    if (!state.openSoundPending || !sound.isRunning()) return;   // wait for a gesture the browser accepts
    state.openSoundPending = false;
    if (!$('#game').hidden) play('popup-open');   // the opening sound the browser did not allow on auto-open
  });
};
['pointerdown', 'touchend', 'click', 'keydown'].forEach((t) => document.addEventListener(t, firstGesture, { capture: true, passive: true }));
if (!params.has('closed')) openGame(true);
