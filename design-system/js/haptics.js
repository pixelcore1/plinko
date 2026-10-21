/**
 * haptics.js
 * Vibration patterns for the Plinko minigame.
 *
 * - HAPTICS is the single source of truth. The game and the docs both read it.
 * - Uses navigator.vibrate with feature detection. Where it is missing (iOS Safari),
 *   supported is false and play() does nothing.
 * - Only one pattern runs at a time. A short, low-priority tick never cuts a
 *   running higher-priority pattern, so a peg tick cannot break a win pattern.
 */

export const HAPTICS_NOTE =
  'Vibration works on Android browsers (Chrome, Firefox, Samsung Internet). iOS Safari does not support the Vibration API, so iPhone players get sound and animation only.';

// Pattern values are milliseconds: vibrate, pause, vibrate, pause, ...
export const HAPTICS = [
  { id: 'tap', event: 'Tap', trigger: 'Button, link or icon button press (not on disabled controls)', pattern: [10],
    ios: 'Impact light', android: 'PRIMITIVE_CLICK', notes: 'Fire on press. Skip disabled controls.' },
  { id: 'selection', event: 'Selection', trigger: 'Risk segment, tab, pill, toggle, checkbox', pattern: [8],
    ios: 'Selection', android: 'PRIMITIVE_TICK', notes: 'Once per change, not on every press of the already selected item.' },
  { id: 'ball-release', event: 'Ball release', trigger: 'Ball leaves the chute', pattern: [15],
    ios: 'Impact medium', android: 'PRIMITIVE_CLICK', notes: 'One short pulse.' },
  { id: 'peg-last-rows', event: 'Peg hit, last rows', trigger: 'Peg collision in the last 2 rows only', pattern: [5],
    ios: 'Impact soft', android: 'PRIMITIVE_LOW_TICK', notes: 'Very light. Dropped if a stronger pattern is running. Not used for earlier rows.' },
  { id: 'bin-land', event: 'Bin land', trigger: 'Ball lands in a bin', pattern: [30],
    ios: 'Impact heavy', android: 'PRIMITIVE_THUD', notes: 'The main physical beat of a drop.' },
  { id: 'win-small', event: 'Win small', trigger: 'Toast', pattern: [20],
    ios: 'Notification success', android: 'PRIMITIVE_CLICK', notes: 'Replaces the bin-land pulse.' },
  { id: 'win-big', event: 'Win big', trigger: 'Win sheet', pattern: [30, 60, 30],
    ios: 'Notification success', android: '2x PRIMITIVE_CLICK', notes: 'Two pulses, 60 ms apart.' },
  { id: 'win-mega', event: 'Win mega', trigger: 'Takeover', pattern: [40, 60, 40, 60, 120],
    ios: 'Notification success, then heavy impacts', android: 'PRIMITIVE_QUICK_RISE, then PRIMITIVE_THUD', notes: 'Rising feel: two short pulses, then one long pulse.' },
  { id: 'ticket-gain', event: 'Ticket gain', trigger: 'Ticket +1', pattern: [15],
    ios: 'Impact light', android: 'PRIMITIVE_TICK', notes: 'One short pulse.' },
  { id: 'timer-ready', event: 'Timer ready', trigger: 'Free ticket available (only if the popup is open)', pattern: [20],
    ios: 'Notification success', android: 'PRIMITIVE_CLICK', notes: 'Do not fire when the popup is closed.' },
  { id: 'error', event: 'Error', trigger: 'Error card', pattern: [40, 60, 40],
    ios: 'Notification warning', android: '2x PRIMITIVE_TICK', notes: 'A warning, not an error: the player lost nothing.' }
];

// Higher number wins. A new pattern plays if its priority is equal or higher than the running one.
const PRIORITY = {
  'peg-last-rows': 1,
  tap: 1,
  selection: 1,
  'ticket-gain': 1,
  'ball-release': 2,
  'timer-ready': 2,
  error: 2,
  'bin-land': 3,
  'win-small': 4,
  'win-big': 5,
  'win-mega': 6
};

const BY_ID = new Map(HAPTICS.map((h) => [h.id, h]));

export function createHaptics() {
  const supported =
    typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

  let enabled = true;
  let runningUntil = 0;   // performance.now() time when the current pattern ends
  let runningPriority = 0;

  const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

  function play(id) {
    if (!supported || !enabled) return;
    const entry = BY_ID.get(id);
    if (!entry) return;
    try {
      const t = now();
      const prio = PRIORITY[id] || 1;
      const busy = t < runningUntil;

      // A weaker pattern never interrupts a stronger one that is still running.
      if (busy && prio < runningPriority) return;

      // Long patterns: stop whatever is running first so they start cleanly.
      if (busy && entry.pattern.length > 1) navigator.vibrate(0);

      const total = entry.pattern.reduce((a, b) => a + b, 0);
      navigator.vibrate(entry.pattern.length === 1 ? entry.pattern[0] : entry.pattern);
      runningUntil = t + total;
      runningPriority = prio;
    } catch (e) {
      // Some browsers throw when vibration is blocked by policy. Stay silent.
    }
  }

  return {
    get supported() { return supported; },
    get enabled() { return enabled; },
    set enabled(value) {
      enabled = !!value;
      if (!enabled && supported) {
        try { navigator.vibrate(0); } catch (e) { /* ignore */ }
        runningUntil = 0;
        runningPriority = 0;
      }
    },
    play
  };
}
