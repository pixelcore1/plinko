/* plinko/fx: particle layer for wins, drawn on one canvas above the popup.
   Coin puff (small): 5 coins. Coin burst (big and mega): 18 coins (img-coin-a, img-coin-b) fly out from the reward, then fall and fade. Ends at about 1.64 s.
   Confetti (mega): 40 pieces in gold, magenta, pink, white and orange fall from the top. Ends at about 2.8 s.
   Plays once per win. Hidden with reduced motion (the caller checks it and does not call play).

   Coin motion: x(t) = x0 + vx t,  y(t) = y0 + vy t + g t^2 / 2  (g = 1400 px/s^2), spin 0..2 turns, fade over the last 30 %.
   Confetti: falls at 220..420 px/s with a sideways sway A sin(w t + phase), A = 12..30 px, and a 3D flip (scaleY = cos(spin t)). */

const COLOURS = ['--gold-300', '--magenta-500', '--magenta-300', '--white', '--orange-400'];

export function createFx(canvas, { base = '../design-system/assets/img/' } = {}) {
  const ctx = canvas.getContext('2d');
  const imgs = ['img-coin-a@2x.webp', 'img-coin-b@2x.webp'].map((f) => { const i = new Image(); i.src = base + f; return i; });
  let parts = [], raf = 0, last = 0, dpr = 1;
  const css = getComputedStyle(document.documentElement);
  const colours = COLOURS.map((v) => css.getPropertyValue(v).trim() || '#fdd04a');

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
  }

  function coins(x, y, n = 18) {
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1, sp = 380 + Math.random() * 420;
      parts.push({ type: 'coin', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 1400, life: 1.2 + Math.random() * 0.44, t: -i * 0.012, size: 20 + Math.random() * 12, spin: (Math.random() - 0.5) * 4 * Math.PI, img: imgs[i % 2] });
    }
  }
  function confetti(w, n = 40) {
    for (let i = 0; i < n; i++) {
      parts.push({ type: 'confetti', x: Math.random() * w, y: -20 - Math.random() * 120, vy: 220 + Math.random() * 200, amp: 12 + Math.random() * 18, w0: 3 + Math.random() * 3, ph: Math.random() * 6.3, life: 2.2 + Math.random() * 0.6, t: 0, spin: 6 + Math.random() * 8, c: colours[i % colours.length], wdt: 6 + Math.random() * 3, hgt: 10 + Math.random() * 4 });
    }
  }

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts = parts.filter((p) => (p.t += dt) < p.life);
    for (const p of parts) {
      if (p.t < 0) continue;
      const fade = Math.min(1, (p.life - p.t) / (p.life * 0.3));
      ctx.globalAlpha = fade;
      if (p.type === 'coin') {
        const x = p.x + p.vx * p.t, y = p.y + p.vy * p.t + 0.5 * p.g * p.t * p.t;
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.spin * p.t);
        if (p.img.complete && p.img.naturalWidth) ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      } else {
        const x = p.x + p.amp * Math.sin(p.w0 * p.t + p.ph), y = p.y + p.vy * p.t;
        ctx.save(); ctx.translate(x, y); ctx.rotate(p.ph + p.t * 2); ctx.scale(1, Math.cos(p.spin * p.t));
        ctx.fillStyle = p.c; ctx.fillRect(-p.wdt / 2, -p.hgt / 2, p.wdt, p.hgt); ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
    if (parts.length) raf = requestAnimationFrame(frame); else { raf = 0; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }

  return {
    /** type: 'small' (5-coin puff), 'big' (coin burst) or 'mega' (coins + confetti). x, y: burst origin in canvas CSS px */
    play(type, x, y) {
      resize();
      const r = canvas.getBoundingClientRect();
      coins(x, y, type === 'small' ? 5 : 18);
      if (type === 'mega') confetti(r.width, 40);
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    },
    clear() { parts = []; },
  };
}
