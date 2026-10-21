/**
 * sound.js
 * Sound manager and sound map for the Plinko minigame.
 *
 * - SOUND_MAP is the single source of truth. The game and the docs both read it.
 * - Files (ElevenLabs, normalised) are fetched once and decoded into AudioBuffers.
 * - Short, frequent sounds are synthesised with Web Audio (named recipe functions below).
 * - Everything is safe to call before unlock(): play() is then a silent no-op.
 * - No external libraries. No build step.
 *
 * Audio graph:
 *   sfxBus ----\
 *               >-- master (gain 0.9, or 0 when muted) -- compressor -- destination
 *   ambientBus -/
 */

/* ------------------------------------------------------------------ */
/* Sound map                                                           */
/* ------------------------------------------------------------------ */

// Durations of file sounds were measured with ffprobe.
export const SOUND_MAP = [
  { id: 'ui-tap', event: 'UI tap', trigger: 'Any button or link press', source: 'synth', file: null, length: '40–80 ms', loop: false, volume: 0.25, pitch: '±3 % random',
    recipe: 'Triangle wave at 880 Hz, 5 ms attack, 50 ms exponential decay. Soft, dry, no tail.' },
  { id: 'ui-toggle', event: 'UI toggle', trigger: 'Sound or vibration toggle, checkbox', source: 'synth', file: null, length: '60 ms', loop: false, volume: 0.22, pitch: 'On 760 Hz, off 480 Hz, ±3 % random',
    recipe: 'Sine, 4 ms attack, 60 ms decay. Two stacked notes (base and base x 1.5, quieter). Higher base pitch for on, lower for off.' },
  { id: 'ui-tab', event: 'UI tab', trigger: 'Drawer tab, risk pill', source: 'synth', file: null, length: '50 ms', loop: false, volume: 0.12, pitch: '±3 % random',
    recipe: 'Sine at 420 Hz, 3 ms attack, 50 ms decay. Very low and softer than the tap.' },
  { id: 'popup-open', event: 'Popup open', trigger: 'Game popup opens', source: 'file', file: 'sfx-popup-open.mp3', length: '1.96 s', loop: false, volume: 0.5, pitch: 'none',
    recipe: 'ElevenLabs sound. Medium-high shimmer with a soft swell as the popup opens.' },
  { id: 'ui-open', event: 'UI open', trigger: 'Welcome card, drawer', source: 'synth', file: null, length: '150–250 ms', loop: false, volume: 0.2, pitch: 'none',
    recipe: 'White noise through a band-pass filter (Q 0.9). Centre frequency sweeps 400 Hz to 2400 Hz in 200 ms. 80 ms fade in, 120 ms fade out. A soft whoosh going up.' },
  { id: 'ui-close', event: 'UI close', trigger: 'Close X, drawer close, back to lobby', source: 'file', file: 'sfx-ui-close.mp3', length: '0.76 s', loop: false, volume: 0.45, pitch: 'none',
    recipe: 'ElevenLabs sound. Soft falling close, medium level.' },
  { id: 'risk-change', event: 'Risk change', trigger: 'Risk segment selected', source: 'synth', file: null, length: '120 ms', loop: false, volume: 0.22, pitch: 'Low 330 Hz, medium 440 Hz, high 587 Hz',
    recipe: 'Triangle wave, 4 ms attack, 120 ms decay, plus a quiet octave sine. The pitch follows the level: low is the lowest, high is the highest.' },
  { id: 'bins-shuffle', event: 'Bins shuffle', trigger: 'Bin values change after a risk change', source: 'synth', file: null, length: '300–400 ms', loop: false, volume: 0.12, pitch: 'Ticks rise from 700 Hz in 45 Hz steps',
    recipe: 'Cascade of 9 soft ticks, 35 ms apart (about 340 ms in total). Each tick is a sine with a 2 ms attack and a 30 ms decay. A little random pitch (±2 %) keeps it from sounding mechanical.' },
  { id: 'ticket-gain', event: 'Ticket gain', trigger: 'Ticket +1', source: 'synth', file: null, length: '300 ms', loop: false, volume: 0.25, pitch: '1318 Hz bell',
    recipe: 'Bright bell. Sine at 1318 Hz plus an inharmonic partial at 3637 Hz (x 2.76, 35 % level). 2 ms attack, 300 ms exponential decay.' },
  { id: 'timer-ready', event: 'Timer ready', trigger: 'Free ticket available', source: 'synth', file: null, length: '500 ms', loop: false, volume: 0.22, pitch: 'G5 (784 Hz) then C6 (1047 Hz)',
    recipe: 'Two rising bell notes, 180 ms apart. Same bell recipe as ticket-gain with a slightly longer decay (320 ms).' },
  { id: 'no-tickets', event: 'No tickets', trigger: 'No tickets screen', source: 'synth', file: null, length: '400 ms', loop: false, volume: 0.22, pitch: 'C5 (523 Hz) then G4 (392 Hz)',
    recipe: 'Two soft falling marimba notes, 170 ms apart. Sine with a quiet partial at x 4 that dies in 40 ms, 3 ms attack, 260 ms decay. Calm, not a fail sound.' },
  { id: 'error', event: 'Error', trigger: 'Error card (not shown in the prototype, kept for the system)', source: 'synth', file: null, length: '300 ms', loop: false, volume: 0.2, pitch: 'E4 (330 Hz) then C4 (262 Hz)',
    recipe: 'Two soft, muted tones, 130 ms apart. Triangle wave through a low-pass filter at 900 Hz, 6 ms attack, 150 ms decay. Not an alarm.' },
  { id: 'ball-release', event: 'Ball release', trigger: 'Ball leaves the chute', source: 'file', file: 'sfx-ball-release.mp3', length: '0.68 s', loop: false, volume: 0.55, pitch: 'none',
    recipe: 'ElevenLabs sound. A short drop and rattle as the ball leaves the chute.' },
  { id: 'peg-hit', event: 'Peg hit', trigger: 'Every peg collision', source: 'synth', file: null, length: '30–60 ms', loop: false, volume: 0.2, pitch: 'Pentatonic steps from 520 Hz, row 0 to 7, ±2 % random',
    recipe: 'Short pluck: triangle wave, 2 ms attack, 55 ms exponential decay, plus a 4 ms high-passed noise click (8 % level). Row semitone offsets 0, 2, 4, 7, 9, 12, 14, 16 above 520 Hz. Voice limit: 4 at the same time, extra hits are dropped.' },
  { id: 'riser', event: 'Riser', trigger: 'Ball enters the last 2 rows', source: 'file', file: 'sfx-riser.mp3', length: '0.89 s', loop: false, volume: 0.5, pitch: 'none',
    recipe: 'ElevenLabs sound. Rising tension. Cut with a 60 ms fade by stop("riser") when the ball lands.' },
  { id: 'bin-land', event: 'Bin land', trigger: 'Ball lands in a bin', source: 'file', file: 'sfx-bin-land.mp3', length: '0.34 s', loop: false, volume: 0.7, pitch: 'Chime rate 1.00 to 1.20 by heat',
    recipe: 'ElevenLabs thud (sfx-bin-land.mp3) plus a chime layer (sfx-bin-chime.mp3, 1.31 s). The chime level scales with bin heat: cold 0, cool 0.2, mild 0.4, warm 0.6, hot 0.8, mega 1 (times 0.6 max level). Chime playbackRate is 1 + 0.04 x heat index, so hotter bins sound brighter.' },
  { id: 'win-small', event: 'Win small', trigger: 'Toast', source: 'file', file: 'sfx-win-small.mp3', length: '1.04 s', loop: false, volume: 0.6, pitch: 'none',
    recipe: 'ElevenLabs sound. Short, friendly win jingle.' },
  { id: 'win-big', event: 'Win big', trigger: 'Win sheet', source: 'file', file: 'sfx-win-big.mp3', length: '1.75 s', loop: false, volume: 0.7, pitch: 'none',
    recipe: 'ElevenLabs sound. Fuller win fanfare. Ambient ducks to 25 % for 2 s.' },
  { id: 'win-mega', event: 'Win mega', trigger: 'Takeover', source: 'file', file: 'sfx-win-mega.mp3', length: '5.75 s', loop: false, volume: 0.8, pitch: 'none',
    recipe: 'ElevenLabs sound. Big celebration with a long tail. Ambient ducks to 25 % for 4 s.' },
  { id: 'coin-tick', event: 'Coin tick', trigger: 'Amount counts up', source: 'synth', file: null, length: '40 ms', loop: false, volume: 0.1, pitch: 'Rises with count, about +2 % every 8 ticks (capped at +26 %)',
    recipe: 'Tiny tick: sine at 1500 Hz x (1 + count x 0.0035), 1 ms attack, 40 ms decay. The count option sets the pitch step.' },
  { id: 'reward-collect', event: 'Reward collect', trigger: 'Prize flies to rewards', source: 'file', file: 'sfx-reward-collect.mp3', length: '0.60 s', loop: false, volume: 0.55, pitch: 'none',
    recipe: 'ElevenLabs sound. A quick sparkly sweep as the prize flies to the balance.' },
  { id: 'ambient', event: 'Ambient', trigger: 'Popup open, ready state', source: 'file', file: 'sfx-ambient.mp3', length: '6.03 s (loops)', loop: true, volume: 0.12, pitch: 'none',
    recipe: 'ElevenLabs loop, very low level. Starts with startAmbient(), ducks to 25 % under big wins, stops when the popup closes.' }
];

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const MASTER_GAIN = 0.9;          // headroom below 1.0, the compressor catches the rest
const MUTE_RAMP_S = 0.03;         // 30 ms ramp when muting or unmuting
const STOP_FADE_S = 0.06;         // 60 ms fade used by stop()
const DUCK_LEVEL = 0.25;          // ambient bus level while ducked
const PEG_MAX_VOICES = 4;         // peg-hit voice limit
const PEG_BASE_HZ = 520;
const PEG_SEMITONES = [0, 2, 4, 7, 9, 12, 14, 16]; // pentatonic climb, row 0..7
const HEAT_ORDER = ['cold', 'cool', 'mild', 'warm', 'hot', 'mega'];
const HEAT_CHIME = [0, 0.2, 0.4, 0.6, 0.8, 1];
const CHIME_MAX_VOLUME = 0.6;
const LEVEL_HZ = { low: 330, medium: 440, high: 587 };

const BY_ID = new Map(SOUND_MAP.map((s) => [s.id, s]));

/* ------------------------------------------------------------------ */
/* Factory                                                             */
/* ------------------------------------------------------------------ */

export function createSound({ base = '../design-system/assets/sfx/' } = {}) {
  let ctx = null;
  let master = null;
  let compressor = null;
  let sfxBus = null;
  let ambientBus = null;
  let noiseBuffer = null;

  let muted = false;
  let unlockPromise = null;
  let warned = false;
  let onTrigger = null;

  const buffers = new Map();          // file name -> AudioBuffer
  const active = new Map();           // id -> Set of { src, gain }
  let pegVoices = 0;

  let ambient = null;                 // { src, gain } while playing
  let wantAmbient = false;            // startAmbient() was called, maybe before unlock
  let duckTimer = null;
  let duckUntil = 0;

  /* ---------------- small helpers ---------------- */

  function warnOnce(msg) {
    if (warned) return;
    warned = true;
    try { console.warn('[sound] ' + msg); } catch (e) { /* ignore */ }
  }

  const rand = (spread) => 1 + (Math.random() * 2 - 1) * spread; // 1 ± spread
  const ready = () => !!ctx && ctx.state !== 'closed';

  /** Exponential envelope: 0 -> peak (attack) -> ~0 (decay). Times are absolute. */
  function envelope(param, t, peak, attack, decay) {
    param.cancelScheduledValues(t);
    param.setValueAtTime(0.0001, t);
    param.linearRampToValueAtTime(Math.max(peak, 0.0002), t + attack);
    param.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  /**
   * Basic oscillator voice with an envelope.
   * o: { type, freq, freqEnd, at (s offset), attack, decay, peak, lp (low-pass Hz), dest }
   * Returns the oscillator so callers can attach onended.
   */
  function tone(o) {
    const t = ctx.currentTime + (o.at || 0);
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.freq, t);
    if (o.freqEnd) osc.frequency.exponentialRampToValueAtTime(o.freqEnd, t + o.attack + o.decay);
    envelope(g.gain, t, o.peak, o.attack, o.decay);
    let tail = osc;
    if (o.lp) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = o.lp;
      osc.connect(f);
      tail = f;
    }
    tail.connect(g);
    g.connect(o.dest || sfxBus);
    osc.start(t);
    osc.stop(t + o.attack + o.decay + 0.05);
    return osc;
  }

  /** Filtered noise burst. o: { at, dur, attack, peak, type, f0, f1, q } */
  function noise(o) {
    const t = ctx.currentTime + (o.at || 0);
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    const f = ctx.createBiquadFilter();
    f.type = o.type || 'bandpass';
    f.Q.value = o.q || 0.9;
    f.frequency.setValueAtTime(o.f0, t);
    if (o.f1) f.frequency.exponentialRampToValueAtTime(o.f1, t + o.dur);
    const g = ctx.createGain();
    envelope(g.gain, t, o.peak, o.attack, Math.max(o.dur - o.attack, 0.005));
    src.connect(f);
    f.connect(g);
    g.connect(sfxBus);
    src.start(t);
    src.stop(t + o.dur + 0.05);
  }

  /* ---------------- synth recipes ---------------- */

  const synth = {
    // ui-tap: triangle 880 Hz, 5 ms attack, 50 ms decay.
    'ui-tap'(v, p) {
      tone({ type: 'triangle', freq: 880 * p, attack: 0.005, decay: 0.05, peak: v });
    },

    // ui-toggle: sine, 4 ms attack, 60 ms decay. Base 760 Hz (on) or 480 Hz (off), plus a fifth above.
    'ui-toggle'(v, p, o) {
      const on = o.on !== false;
      const f = (on ? 760 : 480) * p;
      tone({ type: 'sine', freq: f, attack: 0.004, decay: 0.06, peak: v });
      tone({ type: 'sine', freq: f * 1.5, attack: 0.004, decay: 0.05, peak: v * 0.45 });
    },

    // ui-tab: sine 420 Hz, 3 ms attack, 50 ms decay. Quiet.
    'ui-tab'(v, p) {
      tone({ type: 'sine', freq: 420 * p, attack: 0.003, decay: 0.05, peak: v });
    },

    // ui-open: band-passed noise, centre 400 -> 2400 Hz in 200 ms, Q 0.9, 80 ms fade in.
    'ui-open'(v) {
      noise({ dur: 0.2, attack: 0.08, peak: v, type: 'bandpass', f0: 400, f1: 2400, q: 0.9 });
    },

    // risk-change: triangle at 330 / 440 / 587 Hz (low / medium / high), 120 ms, plus quiet octave sine.
    'risk-change'(v, p, o) {
      const f = (LEVEL_HZ[o.level] || LEVEL_HZ.medium) * p;
      tone({ type: 'triangle', freq: f, attack: 0.004, decay: 0.12, peak: v });
      tone({ type: 'sine', freq: f * 2, attack: 0.004, decay: 0.09, peak: v * 0.3 });
    },

    // bins-shuffle: 9 sine ticks, 35 ms apart, 700 Hz rising 45 Hz per tick, 30 ms decay.
    'bins-shuffle'(v, p) {
      for (let i = 0; i < 9; i++) {
        tone({ type: 'sine', freq: (700 + i * 45) * p * rand(0.02), at: i * 0.035, attack: 0.002, decay: 0.03, peak: v });
      }
    },

    // ticket-gain: bell, sine 1318 Hz + inharmonic partial x 2.76 at 35 %, 300 ms decay.
    'ticket-gain'(v, p) {
      bell(1318 * p, v, 0.3, 0);
    },

    // timer-ready: two rising bell notes, G5 784 Hz then C6 1047 Hz, 180 ms apart.
    'timer-ready'(v, p) {
      bell(784 * p, v, 0.32, 0);
      bell(1047 * p, v, 0.32, 0.18);
    },

    // no-tickets: two falling marimba notes, C5 523 Hz then G4 392 Hz, 170 ms apart.
    'no-tickets'(v, p) {
      marimba(523 * p, v, 0);
      marimba(392 * p, v, 0.17);
    },

    // error: two muted triangle tones through low-pass 900 Hz, E4 330 Hz then C4 262 Hz, 130 ms apart.
    'error'(v, p) {
      tone({ type: 'triangle', freq: 330 * p, attack: 0.006, decay: 0.15, peak: v, lp: 900 });
      tone({ type: 'triangle', freq: 262 * p, at: 0.13, attack: 0.006, decay: 0.15, peak: v, lp: 900 });
    },

    // peg-hit: triangle pluck, 2 ms attack, 55 ms decay, plus 4 ms high-passed noise click.
    // Pitch: 520 Hz * 2^(semitones / 12), semitones from the pentatonic table by row (0..7).
    'peg-hit'(v, p, o) {
      if (pegVoices >= PEG_MAX_VOICES) return;
      const row = Math.max(0, Math.min(7, Math.round(Number.isFinite(o.row) ? o.row : 0)));
      const f = PEG_BASE_HZ * Math.pow(2, PEG_SEMITONES[row] / 12) * p;
      pegVoices++;
      const osc = tone({ type: 'triangle', freq: f, attack: 0.002, decay: 0.055, peak: v });
      let released = false;
      const release = () => { if (!released) { released = true; pegVoices = Math.max(0, pegVoices - 1); } };
      osc.onended = release;
      setTimeout(release, 150); // safety net if onended never fires
      noise({ dur: 0.004, attack: 0.001, peak: v * 0.08, type: 'highpass', f0: 3500, q: 0.7 });
    },

    // coin-tick: sine 1500 Hz * (1 + count * 0.0035), capped at +26 %, 40 ms decay.
    'coin-tick'(v, p, o) {
      const c = Math.max(0, Number.isFinite(o.count) ? o.count : 0);
      const lift = Math.min(1 + c * 0.0035, 1.26);
      tone({ type: 'sine', freq: 1500 * lift * p, attack: 0.001, decay: 0.04, peak: v });
    }
  };

  // Bell voice: sine fundamental + inharmonic partial (x 2.76 at 35 %).
  function bell(freq, vol, decay, at) {
    tone({ type: 'sine', freq, at, attack: 0.002, decay, peak: vol });
    tone({ type: 'sine', freq: freq * 2.76, at, attack: 0.002, decay: decay * 0.6, peak: vol * 0.35 });
  }

  // Marimba voice: sine with a short partial at x 4 (dies in 40 ms), 260 ms decay.
  function marimba(freq, vol, at) {
    tone({ type: 'sine', freq, at, attack: 0.003, decay: 0.26, peak: vol });
    tone({ type: 'sine', freq: freq * 4, at, attack: 0.003, decay: 0.04, peak: vol * 0.25 });
  }

  /* ---------------- file playback ---------------- */

  /** Play a decoded buffer. Returns the handle or null. */
  function playBuffer(id, file, { volume, rate = 1, bus, loop = false }) {
    const buf = buffers.get(file);
    if (!buf) return null;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = loop;
    src.playbackRate.value = rate;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    src.connect(gain);
    gain.connect(bus || sfxBus);
    const handle = { src, gain };
    let set = active.get(id);
    if (!set) { set = new Set(); active.set(id, set); }
    set.add(handle);
    src.onended = () => {
      set.delete(handle);
      try { src.disconnect(); gain.disconnect(); } catch (e) { /* ignore */ }
    };
    src.start();
    return handle;
  }

  function fadeAndStop(handle, seconds) {
    try {
      const t = ctx.currentTime;
      const g = handle.gain.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(0, t + seconds);
      handle.src.stop(t + seconds + 0.01);
    } catch (e) { /* already stopped */ }
  }

  /* ---------------- loading ---------------- */

  async function loadFile(file) {
    if (buffers.has(file)) return;
    try {
      // On file:// the browser blocks fetch, so the page can load js/sfx-data.js (the same files as data: URLs).
      const inline = typeof window !== 'undefined' && window.PLINKO_SFX && window.PLINKO_SFX[file];
      let res;
      if (inline) res = await fetch(inline);
      else { res = await fetch(base + file); if (!res.ok) throw new Error('HTTP ' + res.status); }
      const data = await res.arrayBuffer();
      const buf = await new Promise((resolve, reject) => ctx.decodeAudioData(data, resolve, reject));
      buffers.set(file, buf);
    } catch (e) {
      warnOnce('Could not load audio files (' + (e && e.message ? e.message : e) + '). File sounds are skipped. Synth sounds still work.');
    }
  }

  function makeNoise() {
    const len = ctx.sampleRate; // 1 second of white noise, reused by every noise voice
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function build() {
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : MASTER_GAIN;
    compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -14;
    compressor.knee.value = 12;
    compressor.ratio.value = 6;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.2;
    sfxBus = ctx.createGain();
    ambientBus = ctx.createGain();
    sfxBus.connect(master);
    ambientBus.connect(master);
    master.connect(compressor);
    compressor.connect(ctx.destination);
    noiseBuffer = makeNoise();
    return true;
  }

  function unlock() {
    if (unlockPromise) {
      // Already started. Make sure a suspended context is resumed on a later gesture too.
      try { if (ctx && ctx.state === 'suspended') ctx.resume(); } catch (e) { /* ignore */ }
      return unlockPromise;
    }
    unlockPromise = (async () => {
      try {
        if (!build()) { warnOnce('Web Audio is not available.'); return; }
        try { await ctx.resume(); } catch (e) { /* ignore */ }
        // Play one silent sample inside the gesture so iOS Safari starts the output.
        try {
          const s = ctx.createBufferSource();
          s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
          s.connect(ctx.destination);
          s.start();
        } catch (e) { /* ignore */ }
        const files = [...new Set(SOUND_MAP.filter((s) => s.file).map((s) => s.file))];
        files.push('sfx-bin-chime.mp3');
        await Promise.all([...new Set(files)].map(loadFile));
        if (wantAmbient) startAmbient();
      } catch (e) {
        warnOnce('Unlock failed (' + (e && e.message ? e.message : e) + ').');
      }
    })();
    return unlockPromise;
  }

  // Pause the audio clock when the tab is hidden, resume when it is visible again.
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!ready()) return;
      try {
        if (document.hidden) ctx.suspend();
        else ctx.resume();
      } catch (e) { /* ignore */ }
    });
  }

  /* ---------------- ambient and ducking ---------------- */

  function startAmbient() {
    wantAmbient = true;
    if (!ready() || ambient) return;
    const entry = BY_ID.get('ambient');
    const buf = buffers.get(entry.file);
    if (!buf) return; // not decoded yet, unlock() will call us again
    const h = playBuffer('ambient', entry.file, { volume: 0.0001, bus: ambientBus, loop: true });
    if (!h) return;
    ambient = h;
    const t = ctx.currentTime;
    h.gain.gain.setValueAtTime(0.0001, t);
    h.gain.gain.linearRampToValueAtTime(entry.volume, t + 0.4); // gentle fade in
    h.src.onended = () => { if (ambient === h) ambient = null; };
  }

  function stopAmbient() {
    wantAmbient = false;
    if (!ready() || !ambient) return;
    const h = ambient;
    ambient = null;
    fadeAndStop(h, 0.35);
  }

  function duck(ms) {
    if (!ready()) return;
    const t = ctx.currentTime;
    const g = ambientBus.gain;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(DUCK_LEVEL, t + 0.08);
    // If a longer duck is already running, keep it.
    duckUntil = Math.max(duckUntil, Date.now() + ms);
    if (duckTimer) clearTimeout(duckTimer);
    duckTimer = setTimeout(() => {
      duckTimer = null;
      if (!ready()) return;
      const t2 = ctx.currentTime;
      g.cancelScheduledValues(t2);
      g.setValueAtTime(g.value, t2);
      g.linearRampToValueAtTime(1, t2 + 0.5); // slow return
    }, Math.max(0, duckUntil - Date.now()));
  }

  /* ---------------- public API ---------------- */

  function play(id, opts = {}) {
    // Debug hook first: fires even when muted or before unlock.
    if (onTrigger) {
      try { onTrigger(id, opts); } catch (e) { /* never let a debug hook break audio */ }
    }
    try {
      const entry = BY_ID.get(id);
      if (!entry || !ready() || muted) return;
      if (id === 'ambient') { startAmbient(); return; }
      const pitch = (Number.isFinite(opts.rate) ? opts.rate : 1);

      if (entry.source === 'synth') {
        const fn = synth[id];
        if (!fn) return;
        // Random pitch spread: taps and tabs ±3 %, peg-hit ±2 %, others small.
        const spread = id === 'peg-hit' ? 0.02 : (id === 'ui-tap' || id === 'ui-toggle' || id === 'ui-tab') ? 0.03 : 0.01;
        fn(entry.volume, pitch * rand(spread), opts);
        return;
      }

      // File sounds
      if (id === 'bin-land') {
        playBuffer(id, entry.file, { volume: entry.volume, rate: pitch });
        const idx = Math.max(0, HEAT_ORDER.indexOf(opts.heat));
        const heatIdx = HEAT_ORDER.includes(opts.heat) ? idx : 2; // default: mild
        const chimeVol = HEAT_CHIME[heatIdx] * CHIME_MAX_VOLUME;
        if (chimeVol > 0) playBuffer(id, 'sfx-bin-chime.mp3', { volume: chimeVol, rate: pitch * (1 + 0.04 * heatIdx) });
        return;
      }
      playBuffer(id, entry.file, { volume: entry.volume, rate: pitch });
      if (id === 'win-big') duck(2000);
      else if (id === 'win-mega') duck(4000);
    } catch (e) {
      warnOnce('Playback error (' + (e && e.message ? e.message : e) + ').');
    }
  }

  function stop(id) {
    if (id === 'ambient') { stopAmbient(); return; }
    if (!ready()) return;
    const set = active.get(id);
    if (!set) return;
    for (const h of [...set]) fadeAndStop(h, STOP_FADE_S);
  }

  function setMuted(value) {
    muted = !!value;
    if (!ready()) return;
    try {
      const t = ctx.currentTime;
      const g = master.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(muted ? 0 : MASTER_GAIN, t + MUTE_RAMP_S);
    } catch (e) { /* ignore */ }
  }

  return {
    unlock,
    isRunning: () => !!ctx && ctx.state === 'running',   // false until the first user gesture (browser autoplay rule)
    play,
    stop,
    startAmbient,
    stopAmbient,
    duck,
    setMuted,
    get muted() { return muted; },
    set onTrigger(fn) { onTrigger = typeof fn === 'function' ? fn : null; },
    get onTrigger() { return onTrigger; }
  };
}
