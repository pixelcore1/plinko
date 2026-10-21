(() => {
  // design-system/js/model.js
  var ROWS = 8;
  var BINS = ROWS + 1;
  var choose = (n, k) => {
    let r = 1;
    for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return r;
  };
  var BIN_CHANCE = Array.from({ length: BINS }, (_, k) => choose(ROWS, k) / 2 ** ROWS);
  var BASE_PRIZE = { amount: 10, unit: "FS", name: "Free Spins", icon: "free-spins", image: "img-reward-free-spins", gcValue: 2e3 };
  var RISK = {
    low: {
      label: "Low",
      caption: "Frequent small wins",
      edge: { kind: "ticket", m: 3, name: "+3 Tickets", short: "3 Tickets", image: "img-reward-ticket", icon: "ticket", contents: [{ amount: "3", label: "Tickets", image: "img-reward-ticket" }] },
      inner: [{ m: 1.5 }, { m: 1.1 }, { m: 1 }, { m: 0.8 }]
    },
    medium: {
      label: "Medium",
      caption: "Balanced. Bigger edges",
      edge: { kind: "gift", m: 12, name: "Gift box", short: "Gift box", image: "img-reward-gift-box", icon: "gift", contents: [{ amount: "60", label: "Free Spins", image: "img-reward-free-spins" }, { amount: "10K", label: "Gold Coins", image: "img-reward-gold-coins" }, { amount: "1", label: "Collectable", image: "img-reward-collectable" }] },
      inner: [{ m: 3 }, { m: 1.3 }, { m: 0.7 }, { m: 0.5 }]
    },
    high: {
      label: "High",
      caption: "Rare big wins. Smaller centre",
      edge: { kind: "chest", m: 30, name: "Treasure chest", short: "Treasure chest", image: "img-reward-chest-open", icon: "chest", contents: [{ amount: "150", label: "Free Spins", image: "img-reward-free-spins" }, { amount: "24K", label: "Gold Coins", image: "img-reward-gold-coins" }, { amount: "1", label: "Rare collectable", image: "img-reward-collectable-rare" }] },
      inner: [{ m: 4, gc: 8e3 }, { m: 1.3 }, { m: 0.4 }, { m: 0.2 }]
    }
  };
  var RISK_ORDER = ["low", "medium", "high"];
  var heatOf = (bin) => bin.edge ? "mega" : bin.m >= 3 ? "hot" : bin.m >= 1.3 ? "warm" : bin.m >= 1 ? "mild" : bin.m >= 0.7 ? "cool" : "cold";
  function binsFor(risk) {
    const r = RISK[risk];
    const half = [{ ...r.edge, edge: true }, ...r.inner];
    const all = [...half, ...half.slice(0, -1).reverse()];
    return all.map((b, k) => {
      const bin = { ...b, index: k, chance: BIN_CHANCE[k] };
      bin.heat = heatOf(bin);
      if (b.edge) {
        bin.label = b.name;
        bin.amount = b.short;
      } else if (b.gc) {
        bin.label = `${b.gc / 1e3}K Gold Coins`;
        bin.amount = `${b.gc / 1e3}K`;
        bin.unit = "Gold Coins";
        bin.image = "img-reward-gold-coins";
      } else {
        const fs = Math.round(b.m * BASE_PRIZE.amount);
        bin.label = `${fs} ${BASE_PRIZE.name}`;
        bin.amount = String(fs);
        bin.unit = BASE_PRIZE.name;
        bin.image = BASE_PRIZE.image;
      }
      bin.tier = tierOf(bin);
      return bin;
    });
  }
  var tierOf = (bin) => bin.edge ? "mega" : bin.m >= 2 ? "big" : "small";
  var expectedValue = (risk) => binsFor(risk).reduce((s, b) => s + b.chance * b.m, 0);
  function oddsTable(risk) {
    const bins = binsFor(risk), rows = [];
    for (let k = 0; k <= 4; k++) {
      const b = bins[k], n = k === 4 ? 1 : 2, p = b.chance * n;
      rows.push({ bin: b, bins: n === 1 ? "Centre bin" : k === 0 ? "2 edge bins" : "2 bins", chance: p, oneIn: Math.round(1 / p) });
    }
    return rows;
  }
  function rng(seed = Math.random() * 2 ** 32 >>> 0) {
    let a = seed >>> 0;
    return () => {
      a = a + 1831565813 >>> 0;
      let t = a;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function decideOutcome(risk, random2, force = null) {
    const bins = binsFor(risk);
    if (typeof force === "number") return bins[force];
    if (force) {
      const pool = bins.filter((b) => b.tier === force);
      if (pool.length) return pool[Math.floor(random2() * pool.length)];
    }
    let x = random2();
    for (const b of bins) {
      if ((x -= b.chance) < 0) return b;
    }
    return bins[4];
  }
  var fmtPct = (p) => String(parseFloat((p * 100).toFixed(2))) + "%";

  // design-system/js/icons.js
  var ICONS = {
    "close": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "sound-on": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9C15.4256 9.37537 15.7665 9.83701 16 10.3542C16.2335 10.8715 16.3542 11.4325 16.3542 12C16.3542 12.5675 16.2335 13.1285 16 13.6458C15.7665 14.163 15.4256 14.6246 15 15M17.5 6.5C18.2573 7.20208 18.8614 8.05297 19.2746 8.99939C19.6877 9.9458 19.901 10.9673 19.901 12C19.901 13.0327 19.6877 14.0542 19.2746 15.0006C18.8614 15.947 18.2573 16.7979 17.5 17.5M4 9.5H7L11.5 5.5V18.5L7 14.5H4C3.73478 14.5 3.48043 14.3946 3.29289 14.2071C3.10536 14.0196 3 13.7652 3 13.5V10.5C3 10.2348 3.10536 9.98043 3.29289 9.79289C3.48043 9.60536 3.73478 9.5 4 9.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "sound-off": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 10L20 14M20 10L16 14M4 9.5H7L11.5 5.5V18.5L7 14.5H4C3.73478 14.5 3.48043 14.3946 3.29289 14.2071C3.10536 14.0196 3 13.7652 3 13.5V10.5C3 10.2348 3.10536 9.98043 3.29289 9.79289C3.48043 9.60536 3.73478 9.5 4 9.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "info": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11V16M12 7.75H12.01M12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "arrow-right": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M13 18L19 12L13 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "ticket": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.75V11.25M12 13.75V14.25M12 16.75V17.25M5 8H15C15.5304 8 16.0391 8.21071 16.4142 8.58579C16.7893 8.96086 17 9.46957 17 10V11.3C16.2839 11.3 15.5972 11.5845 15.0908 12.0908C14.5845 12.5972 14.3 13.2839 14.3 14C14.3 14.7161 14.5845 15.4028 15.0908 15.9092C15.5972 16.4155 16.2839 16.7 17 16.7V18C17 18.5304 16.7893 19.0391 16.4142 19.4142C16.0391 19.7893 15.5304 20 15 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V16.7C3.71608 16.7 4.40284 16.4155 4.90919 15.9092C5.41554 15.4028 5.7 14.7161 5.7 14C5.7 13.2839 5.41554 12.5972 4.90919 12.0908C4.40284 11.5845 3.71608 11.3 3 11.3V10C3 9.46957 3.21071 8.96086 3.58579 8.58579C3.96086 8.21071 4.46957 8 5 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 2C19.9 3.6 20.9 4.6 22.5 5C20.9 5.4 19.9 6.4 19.5 8C19.1 6.4 18.1 5.4 16.5 5C18.1 4.6 19.1 3.6 19.5 2Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/><path d="M15 0.899994C15.2267 1.80666 15.7933 2.37333 16.7 2.59999C15.7933 2.82666 15.2267 3.39333 15 4.29999C14.7733 3.39333 14.2067 2.82666 13.3 2.59999C14.2067 2.37333 14.7733 1.80666 15 0.899994Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/></svg>',
    "coin": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 9.5C4 10.2293 4.68482 10.9288 5.90381 11.4445C7.12279 11.9603 8.77609 12.25 10.5 12.25C12.2239 12.25 13.8772 11.9603 15.0962 11.4445C16.3152 10.9288 17 10.2293 17 9.5M4 13.75V9.5C4 8.77065 4.68482 8.07118 5.90381 7.55546C7.12279 7.03973 8.77609 6.75 10.5 6.75C12.2239 6.75 13.8772 7.03973 15.0962 7.55546C16.3152 8.07118 17 8.77065 17 9.5M17 9.5V13.75M4 13.75C4 14.4793 4.68482 15.1788 5.90381 15.6945C7.12279 16.2103 8.77609 16.5 10.5 16.5C12.2239 16.5 13.8772 16.2103 15.0962 15.6945C16.3152 15.1788 17 14.4793 17 13.75M4 13.75V18C4 18.7293 4.68482 19.4288 5.90381 19.9445C7.12279 20.4603 8.77609 20.75 10.5 20.75C12.2239 20.75 13.8772 20.4603 15.0962 19.9445C16.3152 19.4288 17 18.7293 17 18V13.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 2C19.9 3.6 20.9 4.6 22.5 5C20.9 5.4 19.9 6.4 19.5 8C19.1 6.4 18.1 5.4 16.5 5C18.1 4.6 19.1 3.6 19.5 2Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/><path d="M15 0.899994C15.2267 1.80666 15.7933 2.37333 16.7 2.59999C15.7933 2.82666 15.2267 3.39333 15 4.29999C14.7733 3.39333 14.2067 2.82666 13.3 2.59999C14.2067 2.37333 14.7733 1.80666 15 0.899994Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/></svg>',
    "free-spins": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 13.5C18 14.9834 17.5601 16.4334 16.736 17.6668C15.9119 18.9001 14.7406 19.8614 13.3701 20.4291C11.9997 20.9968 10.4917 21.1453 9.03683 20.8559C7.58197 20.5665 6.2456 19.8522 5.1967 18.8033C4.14781 17.7544 3.4335 16.418 3.14411 14.9632C2.85472 13.5083 3.00325 12.0003 3.57091 10.6299C4.13856 9.25943 5.09986 8.08809 6.33323 7.26398C7.5666 6.43987 9.01664 6 10.5 6M8.25 8.25L10.5 6L8.25 3.75M9 10.8L13.5 13.5L9 16.2V10.8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 2C19.9 3.6 20.9 4.6 22.5 5C20.9 5.4 19.9 6.4 19.5 8C19.1 6.4 18.1 5.4 16.5 5C18.1 4.6 19.1 3.6 19.5 2Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/><path d="M15 0.899994C15.2267 1.80666 15.7933 2.37333 16.7 2.59999C15.7933 2.82666 15.2267 3.39333 15 4.29999C14.7733 3.39333 14.2067 2.82666 13.3 2.59999C14.2067 2.37333 14.7733 1.80666 15 0.899994Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/></svg>',
    "gift": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13V19C5.5 19.2652 5.60536 19.5196 5.79289 19.7071C5.98043 19.8946 6.23478 20 6.5 20H14.5C14.7652 20 15.0196 19.8946 15.2071 19.7071C15.3946 19.5196 15.5 19.2652 15.5 19V13M10.5 9.99999V20M10.5 9.99999C9 6.99999 5.5 6.49999 5.5 8.49999C5.5 9.69999 8 9.99999 10.5 9.99999ZM10.5 9.99999C13 9.99999 15.5 9.69999 15.5 8.49999C15.5 6.49999 12 6.99999 10.5 9.99999ZM5 9.99999H16C16.2652 9.99999 16.5196 10.1053 16.7071 10.2929C16.8946 10.4804 17 10.7348 17 11V12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12V11C4 10.7348 4.10536 10.4804 4.29289 10.2929C4.48043 10.1053 4.73478 9.99999 5 9.99999Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 2C19.9 3.6 20.9 4.6 22.5 5C20.9 5.4 19.9 6.4 19.5 8C19.1 6.4 18.1 5.4 16.5 5C18.1 4.6 19.1 3.6 19.5 2Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/><path d="M15 0.899994C15.2267 1.80666 15.7934 2.37333 16.7 2.59999C15.7934 2.82666 15.2267 3.39333 15 4.29999C14.7734 3.39333 14.2067 2.82666 13.3 2.59999C14.2067 2.37333 14.7734 1.80666 15 0.899994Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/></svg>',
    "chest": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 11V10C4 8.93913 4.42143 7.92172 5.17157 7.17157C5.92172 6.42143 6.93913 6 8 6H13C14.0609 6 15.0783 6.42143 15.8284 7.17157C16.5786 7.92172 17 8.93913 17 10V11M4 11H17M4 11V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H16C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V11M9 11V14.5H12V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 2C19.9 3.6 20.9 4.6 22.5 5C20.9 5.4 19.9 6.4 19.5 8C19.1 6.4 18.1 5.4 16.5 5C18.1 4.6 19.1 3.6 19.5 2Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/><path d="M15 0.899994C15.2267 1.80666 15.7934 2.37333 16.7 2.59999C15.7934 2.82666 15.2267 3.39333 15 4.29999C14.7734 3.39333 14.2067 2.82666 13.3 2.59999C14.2067 2.37333 14.7734 1.80666 15 0.899994Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/></svg>',
    "check": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5L9.5 17L19 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "vibration-on": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10V14M19 10V14M2.5 11V13M21.5 11V13M9 5H15C15.2652 5 15.5196 5.10536 15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6V18C16 18.2652 15.8946 18.5196 15.7071 18.7071C15.5196 18.8946 15.2652 19 15 19H9C8.73478 19 8.48043 18.8946 8.29289 18.7071C8.10536 18.5196 8 18.2652 8 18V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "vibration-off": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L21 21M9 5H15C15.2652 5 15.5196 5.10536 15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6V18C16 18.2652 15.8946 18.5196 15.7071 18.7071C15.5196 18.8946 15.2652 19 15 19H9C8.73478 19 8.48043 18.8946 8.29289 18.7071C8.10536 18.5196 8 18.2652 8 18V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "clock": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12L15 14M12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "wifi-off": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L21 21M8.5 16.4C9.43464 15.4839 10.6912 14.9707 12 14.9707C13.3088 14.9707 14.5654 15.4839 15.5 16.4M5 12.9C6.12549 11.7959 7.49611 10.9735 9 10.5M12 8C15.5327 8.02268 18.9262 9.38009 21.5 11.8M2.5 9C3.53793 8.02679 4.71816 7.2175 6 6.6M12 20H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "collectable": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H15C15.5304 6 16.0391 6.21071 16.4142 6.58579C16.7893 6.96086 17 7.46957 17 8V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V8C4 7.46957 4.21071 6.96086 4.58579 6.58579C4.96086 6.21071 5.46957 6 6 6ZM10.5 10.5L11.5 12.5L13.7 12.8L12.1 14.3L12.5 16.5L10.5 15.4L8.5 16.5L8.9 14.3L7.3 12.8L9.5 12.5L10.5 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 2C19.9 3.6 20.9 4.6 22.5 5C20.9 5.4 19.9 6.4 19.5 8C19.1 6.4 18.1 5.4 16.5 5C18.1 4.6 19.1 3.6 19.5 2Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/><path d="M15 0.899994C15.2267 1.80666 15.7934 2.37333 16.7 2.59999C15.7934 2.82666 15.2267 3.39333 15 4.29999C14.7734 3.39333 14.2067 2.82666 13.3 2.59999C14.2067 2.37333 14.7734 1.80666 15 0.899994Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/></svg>',
    "rare-collectable": '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8.5H8M13 8.5H14M6 6H15C15.5304 6 16.0391 6.21071 16.4142 6.58579C16.7893 6.96086 17 7.46957 17 8V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V8C4 7.46957 4.21071 6.96086 4.58579 6.58579C4.96086 6.21071 5.46957 6 6 6ZM10.5 10.5L13.5 13.75L10.5 17L7.5 13.75L10.5 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 2C19.9 3.6 20.9 4.6 22.5 5C20.9 5.4 19.9 6.4 19.5 8C19.1 6.4 18.1 5.4 16.5 5C18.1 4.6 19.1 3.6 19.5 2Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/><path d="M15 0.899994C15.2267 1.80666 15.7934 2.37333 16.7 2.59999C15.7934 2.82666 15.2267 3.39333 15 4.29999C14.7734 3.39333 14.2067 2.82666 13.3 2.59999C14.2067 2.37333 14.7734 1.80666 15 0.899994Z" style="fill:var(--sparkle, var(--icon-sparkle-magenta))"/></svg>'
  };
  function icon(name, size = "md", extra = "") {
    return `<span class="icon icon--${size} ${extra}">${ICONS[name] || ""}</span>`;
  }

  // design-system/js/sound.js
  var SOUND_MAP = [
    {
      id: "ui-tap",
      event: "UI tap",
      trigger: "Any button or link press",
      source: "synth",
      file: null,
      length: "40\u201380 ms",
      loop: false,
      volume: 0.25,
      pitch: "\xB13 % random",
      recipe: "Triangle wave at 880 Hz, 5 ms attack, 50 ms exponential decay. Soft, dry, no tail."
    },
    {
      id: "ui-toggle",
      event: "UI toggle",
      trigger: "Sound or vibration toggle, checkbox",
      source: "synth",
      file: null,
      length: "60 ms",
      loop: false,
      volume: 0.22,
      pitch: "On 760 Hz, off 480 Hz, \xB13 % random",
      recipe: "Sine, 4 ms attack, 60 ms decay. Two stacked notes (base and base x 1.5, quieter). Higher base pitch for on, lower for off."
    },
    {
      id: "ui-tab",
      event: "UI tab",
      trigger: "Drawer tab, risk pill",
      source: "synth",
      file: null,
      length: "50 ms",
      loop: false,
      volume: 0.12,
      pitch: "\xB13 % random",
      recipe: "Sine at 420 Hz, 3 ms attack, 50 ms decay. Very low and softer than the tap."
    },
    {
      id: "popup-open",
      event: "Popup open",
      trigger: "Game popup opens",
      source: "file",
      file: "sfx-popup-open.mp3",
      length: "1.96 s",
      loop: false,
      volume: 0.5,
      pitch: "none",
      recipe: "ElevenLabs sound. Medium-high shimmer with a soft swell as the popup opens."
    },
    {
      id: "ui-open",
      event: "UI open",
      trigger: "Welcome card, drawer",
      source: "synth",
      file: null,
      length: "150\u2013250 ms",
      loop: false,
      volume: 0.2,
      pitch: "none",
      recipe: "White noise through a band-pass filter (Q 0.9). Centre frequency sweeps 400 Hz to 2400 Hz in 200 ms. 80 ms fade in, 120 ms fade out. A soft whoosh going up."
    },
    {
      id: "ui-close",
      event: "UI close",
      trigger: "Close X, drawer close, back to lobby",
      source: "file",
      file: "sfx-ui-close.mp3",
      length: "0.76 s",
      loop: false,
      volume: 0.45,
      pitch: "none",
      recipe: "ElevenLabs sound. Soft falling close, medium level."
    },
    {
      id: "risk-change",
      event: "Risk change",
      trigger: "Risk segment selected",
      source: "synth",
      file: null,
      length: "120 ms",
      loop: false,
      volume: 0.22,
      pitch: "Low 330 Hz, medium 440 Hz, high 587 Hz",
      recipe: "Triangle wave, 4 ms attack, 120 ms decay, plus a quiet octave sine. The pitch follows the level: low is the lowest, high is the highest."
    },
    {
      id: "bins-shuffle",
      event: "Bins shuffle",
      trigger: "Bin values change after a risk change",
      source: "synth",
      file: null,
      length: "300\u2013400 ms",
      loop: false,
      volume: 0.12,
      pitch: "Ticks rise from 700 Hz in 45 Hz steps",
      recipe: "Cascade of 9 soft ticks, 35 ms apart (about 340 ms in total). Each tick is a sine with a 2 ms attack and a 30 ms decay. A little random pitch (\xB12 %) keeps it from sounding mechanical."
    },
    {
      id: "ticket-gain",
      event: "Ticket gain",
      trigger: "Ticket +1",
      source: "synth",
      file: null,
      length: "300 ms",
      loop: false,
      volume: 0.25,
      pitch: "1318 Hz bell",
      recipe: "Bright bell. Sine at 1318 Hz plus an inharmonic partial at 3637 Hz (x 2.76, 35 % level). 2 ms attack, 300 ms exponential decay."
    },
    {
      id: "timer-ready",
      event: "Timer ready",
      trigger: "Free ticket available",
      source: "synth",
      file: null,
      length: "500 ms",
      loop: false,
      volume: 0.22,
      pitch: "G5 (784 Hz) then C6 (1047 Hz)",
      recipe: "Two rising bell notes, 180 ms apart. Same bell recipe as ticket-gain with a slightly longer decay (320 ms)."
    },
    {
      id: "no-tickets",
      event: "No tickets",
      trigger: "No tickets screen",
      source: "synth",
      file: null,
      length: "400 ms",
      loop: false,
      volume: 0.22,
      pitch: "C5 (523 Hz) then G4 (392 Hz)",
      recipe: "Two soft falling marimba notes, 170 ms apart. Sine with a quiet partial at x 4 that dies in 40 ms, 3 ms attack, 260 ms decay. Calm, not a fail sound."
    },
    {
      id: "error",
      event: "Error",
      trigger: "Error card (not shown in the prototype, kept for the system)",
      source: "synth",
      file: null,
      length: "300 ms",
      loop: false,
      volume: 0.2,
      pitch: "E4 (330 Hz) then C4 (262 Hz)",
      recipe: "Two soft, muted tones, 130 ms apart. Triangle wave through a low-pass filter at 900 Hz, 6 ms attack, 150 ms decay. Not an alarm."
    },
    {
      id: "ball-release",
      event: "Ball release",
      trigger: "Ball leaves the chute",
      source: "file",
      file: "sfx-ball-release.mp3",
      length: "0.68 s",
      loop: false,
      volume: 0.55,
      pitch: "none",
      recipe: "ElevenLabs sound. A short drop and rattle as the ball leaves the chute."
    },
    {
      id: "peg-hit",
      event: "Peg hit",
      trigger: "Every peg collision",
      source: "synth",
      file: null,
      length: "30\u201360 ms",
      loop: false,
      volume: 0.2,
      pitch: "Pentatonic steps from 520 Hz, row 0 to 7, \xB12 % random",
      recipe: "Short pluck: triangle wave, 2 ms attack, 55 ms exponential decay, plus a 4 ms high-passed noise click (8 % level). Row semitone offsets 0, 2, 4, 7, 9, 12, 14, 16 above 520 Hz. Voice limit: 4 at the same time, extra hits are dropped."
    },
    {
      id: "riser",
      event: "Riser",
      trigger: "Ball enters the last 2 rows",
      source: "file",
      file: "sfx-riser.mp3",
      length: "0.89 s",
      loop: false,
      volume: 0.5,
      pitch: "none",
      recipe: 'ElevenLabs sound. Rising tension. Cut with a 60 ms fade by stop("riser") when the ball lands.'
    },
    {
      id: "bin-land",
      event: "Bin land",
      trigger: "Ball lands in a bin",
      source: "file",
      file: "sfx-bin-land.mp3",
      length: "0.34 s",
      loop: false,
      volume: 0.7,
      pitch: "Chime rate 1.00 to 1.20 by heat",
      recipe: "ElevenLabs thud (sfx-bin-land.mp3) plus a chime layer (sfx-bin-chime.mp3, 1.31 s). The chime level scales with bin heat: cold 0, cool 0.2, mild 0.4, warm 0.6, hot 0.8, mega 1 (times 0.6 max level). Chime playbackRate is 1 + 0.04 x heat index, so hotter bins sound brighter."
    },
    {
      id: "win-small",
      event: "Win small",
      trigger: "Toast",
      source: "file",
      file: "sfx-win-small.mp3",
      length: "1.04 s",
      loop: false,
      volume: 0.6,
      pitch: "none",
      recipe: "ElevenLabs sound. Short, friendly win jingle."
    },
    {
      id: "win-big",
      event: "Win big",
      trigger: "Win sheet",
      source: "file",
      file: "sfx-win-big.mp3",
      length: "1.75 s",
      loop: false,
      volume: 0.7,
      pitch: "none",
      recipe: "ElevenLabs sound. Fuller win fanfare. Ambient ducks to 25 % for 2 s."
    },
    {
      id: "win-mega",
      event: "Win mega",
      trigger: "Takeover",
      source: "file",
      file: "sfx-win-mega.mp3",
      length: "5.75 s",
      loop: false,
      volume: 0.8,
      pitch: "none",
      recipe: "ElevenLabs sound. Big celebration with a long tail. Ambient ducks to 25 % for 4 s."
    },
    {
      id: "coin-tick",
      event: "Coin tick",
      trigger: "Amount counts up",
      source: "synth",
      file: null,
      length: "40 ms",
      loop: false,
      volume: 0.1,
      pitch: "Rises with count, about +2 % every 8 ticks (capped at +26 %)",
      recipe: "Tiny tick: sine at 1500 Hz x (1 + count x 0.0035), 1 ms attack, 40 ms decay. The count option sets the pitch step."
    },
    {
      id: "reward-collect",
      event: "Reward collect",
      trigger: "Prize flies to rewards",
      source: "file",
      file: "sfx-reward-collect.mp3",
      length: "0.60 s",
      loop: false,
      volume: 0.55,
      pitch: "none",
      recipe: "ElevenLabs sound. A quick sparkly sweep as the prize flies to the balance."
    },
    {
      id: "ambient",
      event: "Ambient",
      trigger: "Popup open, ready state",
      source: "file",
      file: "sfx-ambient.mp3",
      length: "6.03 s (loops)",
      loop: true,
      volume: 0.12,
      pitch: "none",
      recipe: "ElevenLabs loop, very low level. Starts with startAmbient(), ducks to 25 % under big wins, stops when the popup closes."
    }
  ];
  var MASTER_GAIN = 0.9;
  var MUTE_RAMP_S = 0.03;
  var STOP_FADE_S = 0.06;
  var DUCK_LEVEL = 0.25;
  var PEG_MAX_VOICES = 4;
  var PEG_BASE_HZ = 520;
  var PEG_SEMITONES = [0, 2, 4, 7, 9, 12, 14, 16];
  var HEAT_ORDER = ["cold", "cool", "mild", "warm", "hot", "mega"];
  var HEAT_CHIME = [0, 0.2, 0.4, 0.6, 0.8, 1];
  var CHIME_MAX_VOLUME = 0.6;
  var LEVEL_HZ = { low: 330, medium: 440, high: 587 };
  var BY_ID = new Map(SOUND_MAP.map((s) => [s.id, s]));
  function createSound({ base = "../design-system/assets/sfx/" } = {}) {
    let ctx = null;
    let master = null;
    let compressor = null;
    let sfxBus = null;
    let ambientBus = null;
    let noiseBuffer = null;
    let muted = false;
    let warned = false;
    let onTrigger = null;
    const buffers = /* @__PURE__ */ new Map();
    const active = /* @__PURE__ */ new Map();
    let pegVoices = 0;
    let ambient = null;
    let wantAmbient = false;
    let duckTimer = null;
    let duckUntil = 0;
    function warnOnce(msg) {
      if (warned) return;
      warned = true;
      try {
        console.warn("[sound] " + msg);
      } catch (e) {
      }
    }
    const rand = (spread) => 1 + (Math.random() * 2 - 1) * spread;
    const ready = () => !!ctx && ctx.state !== "closed";
    function envelope(param, t, peak, attack, decay) {
      param.cancelScheduledValues(t);
      param.setValueAtTime(1e-4, t);
      param.linearRampToValueAtTime(Math.max(peak, 2e-4), t + attack);
      param.exponentialRampToValueAtTime(1e-4, t + attack + decay);
    }
    function tone(o) {
      const t = ctx.currentTime + (o.at || 0);
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = o.type || "sine";
      osc.frequency.setValueAtTime(o.freq, t);
      if (o.freqEnd) osc.frequency.exponentialRampToValueAtTime(o.freqEnd, t + o.attack + o.decay);
      envelope(g.gain, t, o.peak, o.attack, o.decay);
      let tail = osc;
      if (o.lp) {
        const f = ctx.createBiquadFilter();
        f.type = "lowpass";
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
    function noise(o) {
      const t = ctx.currentTime + (o.at || 0);
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer;
      const f = ctx.createBiquadFilter();
      f.type = o.type || "bandpass";
      f.Q.value = o.q || 0.9;
      f.frequency.setValueAtTime(o.f0, t);
      if (o.f1) f.frequency.exponentialRampToValueAtTime(o.f1, t + o.dur);
      const g = ctx.createGain();
      envelope(g.gain, t, o.peak, o.attack, Math.max(o.dur - o.attack, 5e-3));
      src.connect(f);
      f.connect(g);
      g.connect(sfxBus);
      src.start(t);
      src.stop(t + o.dur + 0.05);
    }
    const synth = {
      // ui-tap: triangle 880 Hz, 5 ms attack, 50 ms decay.
      "ui-tap"(v, p) {
        tone({ type: "triangle", freq: 880 * p, attack: 5e-3, decay: 0.05, peak: v });
      },
      // ui-toggle: sine, 4 ms attack, 60 ms decay. Base 760 Hz (on) or 480 Hz (off), plus a fifth above.
      "ui-toggle"(v, p, o) {
        const on = o.on !== false;
        const f = (on ? 760 : 480) * p;
        tone({ type: "sine", freq: f, attack: 4e-3, decay: 0.06, peak: v });
        tone({ type: "sine", freq: f * 1.5, attack: 4e-3, decay: 0.05, peak: v * 0.45 });
      },
      // ui-tab: sine 420 Hz, 3 ms attack, 50 ms decay. Quiet.
      "ui-tab"(v, p) {
        tone({ type: "sine", freq: 420 * p, attack: 3e-3, decay: 0.05, peak: v });
      },
      // ui-open: band-passed noise, centre 400 -> 2400 Hz in 200 ms, Q 0.9, 80 ms fade in.
      "ui-open"(v) {
        noise({ dur: 0.2, attack: 0.08, peak: v, type: "bandpass", f0: 400, f1: 2400, q: 0.9 });
      },
      // risk-change: triangle at 330 / 440 / 587 Hz (low / medium / high), 120 ms, plus quiet octave sine.
      "risk-change"(v, p, o) {
        const f = (LEVEL_HZ[o.level] || LEVEL_HZ.medium) * p;
        tone({ type: "triangle", freq: f, attack: 4e-3, decay: 0.12, peak: v });
        tone({ type: "sine", freq: f * 2, attack: 4e-3, decay: 0.09, peak: v * 0.3 });
      },
      // bins-shuffle: 9 sine ticks, 35 ms apart, 700 Hz rising 45 Hz per tick, 30 ms decay.
      "bins-shuffle"(v, p) {
        for (let i = 0; i < 9; i++) {
          tone({ type: "sine", freq: (700 + i * 45) * p * rand(0.02), at: i * 0.035, attack: 2e-3, decay: 0.03, peak: v });
        }
      },
      // ticket-gain: bell, sine 1318 Hz + inharmonic partial x 2.76 at 35 %, 300 ms decay.
      "ticket-gain"(v, p) {
        bell(1318 * p, v, 0.3, 0);
      },
      // timer-ready: two rising bell notes, G5 784 Hz then C6 1047 Hz, 180 ms apart.
      "timer-ready"(v, p) {
        bell(784 * p, v, 0.32, 0);
        bell(1047 * p, v, 0.32, 0.18);
      },
      // no-tickets: two falling marimba notes, C5 523 Hz then G4 392 Hz, 170 ms apart.
      "no-tickets"(v, p) {
        marimba(523 * p, v, 0);
        marimba(392 * p, v, 0.17);
      },
      // error: two muted triangle tones through low-pass 900 Hz, E4 330 Hz then C4 262 Hz, 130 ms apart.
      "error"(v, p) {
        tone({ type: "triangle", freq: 330 * p, attack: 6e-3, decay: 0.15, peak: v, lp: 900 });
        tone({ type: "triangle", freq: 262 * p, at: 0.13, attack: 6e-3, decay: 0.15, peak: v, lp: 900 });
      },
      // peg-hit: triangle pluck, 2 ms attack, 55 ms decay, plus 4 ms high-passed noise click.
      // Pitch: 520 Hz * 2^(semitones / 12), semitones from the pentatonic table by row (0..7).
      "peg-hit"(v, p, o) {
        if (pegVoices >= PEG_MAX_VOICES) return;
        const row = Math.max(0, Math.min(7, Math.round(Number.isFinite(o.row) ? o.row : 0)));
        const f = PEG_BASE_HZ * Math.pow(2, PEG_SEMITONES[row] / 12) * p;
        pegVoices++;
        const osc = tone({ type: "triangle", freq: f, attack: 2e-3, decay: 0.055, peak: v });
        let released = false;
        const release = () => {
          if (!released) {
            released = true;
            pegVoices = Math.max(0, pegVoices - 1);
          }
        };
        osc.onended = release;
        setTimeout(release, 150);
        noise({ dur: 4e-3, attack: 1e-3, peak: v * 0.08, type: "highpass", f0: 3500, q: 0.7 });
      },
      // coin-tick: sine 1500 Hz * (1 + count * 0.0035), capped at +26 %, 40 ms decay.
      "coin-tick"(v, p, o) {
        const c = Math.max(0, Number.isFinite(o.count) ? o.count : 0);
        const lift = Math.min(1 + c * 35e-4, 1.26);
        tone({ type: "sine", freq: 1500 * lift * p, attack: 1e-3, decay: 0.04, peak: v });
      }
    };
    function bell(freq, vol, decay, at) {
      tone({ type: "sine", freq, at, attack: 2e-3, decay, peak: vol });
      tone({ type: "sine", freq: freq * 2.76, at, attack: 2e-3, decay: decay * 0.6, peak: vol * 0.35 });
    }
    function marimba(freq, vol, at) {
      tone({ type: "sine", freq, at, attack: 3e-3, decay: 0.26, peak: vol });
      tone({ type: "sine", freq: freq * 4, at, attack: 3e-3, decay: 0.04, peak: vol * 0.25 });
    }
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
      if (!set) {
        set = /* @__PURE__ */ new Set();
        active.set(id, set);
      }
      set.add(handle);
      src.onended = () => {
        set.delete(handle);
        try {
          src.disconnect();
          gain.disconnect();
        } catch (e) {
        }
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
      } catch (e) {
      }
    }
    async function loadFile(file) {
      if (buffers.has(file)) return;
      try {
        const inline = typeof window !== "undefined" && window.PLINKO_SFX && window.PLINKO_SFX[file];
        let res;
        if (inline) res = await fetch(inline);
        else {
          res = await fetch(base + file);
          if (!res.ok) throw new Error("HTTP " + res.status);
        }
        const data = await res.arrayBuffer();
        const buf = await new Promise((resolve, reject) => ctx.decodeAudioData(data, resolve, reject));
        buffers.set(file, buf);
      } catch (e) {
        warnOnce("Could not load audio files (" + (e && e.message ? e.message : e) + "). File sounds are skipped. Synth sounds still work.");
      }
    }
    function makeNoise() {
      const len = ctx.sampleRate;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      return buf;
    }
    function build() {
      const AC = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : MASTER_GAIN;
      compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -14;
      compressor.knee.value = 12;
      compressor.ratio.value = 6;
      compressor.attack.value = 3e-3;
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
    const AUDIO_FILES = [.../* @__PURE__ */ new Set([...SOUND_MAP.filter((s) => s.file).map((s) => s.file), "sfx-bin-chime.mp3"])];
    let loadPromise = null;
    function kick() {
      try {
        if (typeof navigator !== "undefined" && navigator.audioSession && navigator.audioSession.type !== "playback") {
          navigator.audioSession.type = "playback";
        }
      } catch (e) {
      }
      if (!ctx || ctx.state === "running" || ctx.state === "closed") return;
      try {
        ctx.resume();
      } catch (e) {
      }
      try {
        const s = ctx.createBufferSource();
        s.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
        s.connect(ctx.destination);
        s.start();
      } catch (e) {
      }
    }
    function unlock() {
      try {
        if (!ctx && !build()) {
          warnOnce("Web Audio is not available.");
          return Promise.resolve();
        }
        kick();
        if (!loadPromise) {
          loadPromise = Promise.all(AUDIO_FILES.map(loadFile)).then(() => {
            if (wantAmbient) startAmbient();
          }).catch((e) => warnOnce("Unlock failed (" + (e && e.message ? e.message : e) + ")."));
        }
        const resumed = ctx.state === "running" ? Promise.resolve() : Promise.race([ctx.resume().catch(() => {
        }), new Promise((r) => setTimeout(r, 500))]);
        return Promise.all([loadPromise, resumed]).then(() => {
          if (wantAmbient) startAmbient();
        });
      } catch (e) {
        warnOnce("Unlock failed (" + (e && e.message ? e.message : e) + ").");
        return Promise.resolve();
      }
    }
    if (typeof document !== "undefined") {
      const onGesture = () => {
        if (!ctx || ctx.state !== "running") unlock();
      };
      ["pointerdown", "touchend", "click", "keydown"].forEach((t) => document.addEventListener(t, onGesture, { capture: true, passive: true }));
    }
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (!ready()) return;
        try {
          if (document.hidden) ctx.suspend();
          else ctx.resume().catch(() => {
          });
        } catch (e) {
        }
      });
    }
    function startAmbient() {
      wantAmbient = true;
      if (!ready() || ambient) return;
      const entry = BY_ID.get("ambient");
      const buf = buffers.get(entry.file);
      if (!buf) return;
      const h = playBuffer("ambient", entry.file, { volume: 1e-4, bus: ambientBus, loop: true });
      if (!h) return;
      ambient = h;
      const t = ctx.currentTime;
      h.gain.gain.setValueAtTime(1e-4, t);
      h.gain.gain.linearRampToValueAtTime(entry.volume, t + 0.4);
      h.src.onended = () => {
        if (ambient === h) ambient = null;
      };
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
      duckUntil = Math.max(duckUntil, Date.now() + ms);
      if (duckTimer) clearTimeout(duckTimer);
      duckTimer = setTimeout(() => {
        duckTimer = null;
        if (!ready()) return;
        const t2 = ctx.currentTime;
        g.cancelScheduledValues(t2);
        g.setValueAtTime(g.value, t2);
        g.linearRampToValueAtTime(1, t2 + 0.5);
      }, Math.max(0, duckUntil - Date.now()));
    }
    function play2(id, opts = {}) {
      if (onTrigger) {
        try {
          onTrigger(id, opts);
        } catch (e) {
        }
      }
      try {
        const entry = BY_ID.get(id);
        if (!entry || !ready() || muted) return;
        if (ctx.state !== "running" && id !== "ambient") return;
        if (id === "ambient") {
          startAmbient();
          return;
        }
        const pitch = Number.isFinite(opts.rate) ? opts.rate : 1;
        if (entry.source === "synth") {
          const fn = synth[id];
          if (!fn) return;
          const spread = id === "peg-hit" ? 0.02 : id === "ui-tap" || id === "ui-toggle" || id === "ui-tab" ? 0.03 : 0.01;
          fn(entry.volume, pitch * rand(spread), opts);
          return;
        }
        if (id === "bin-land") {
          playBuffer(id, entry.file, { volume: entry.volume, rate: pitch });
          const idx = Math.max(0, HEAT_ORDER.indexOf(opts.heat));
          const heatIdx = HEAT_ORDER.includes(opts.heat) ? idx : 2;
          const chimeVol = HEAT_CHIME[heatIdx] * CHIME_MAX_VOLUME;
          if (chimeVol > 0) playBuffer(id, "sfx-bin-chime.mp3", { volume: chimeVol, rate: pitch * (1 + 0.04 * heatIdx) });
          return;
        }
        playBuffer(id, entry.file, { volume: entry.volume, rate: pitch });
        if (id === "win-big") duck(2e3);
        else if (id === "win-mega") duck(4e3);
      } catch (e) {
        warnOnce("Playback error (" + (e && e.message ? e.message : e) + ").");
      }
    }
    function stop(id) {
      if (id === "ambient") {
        stopAmbient();
        return;
      }
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
      } catch (e) {
      }
    }
    return {
      unlock,
      isRunning: () => !!ctx && ctx.state === "running",
      // false until the first user gesture (browser autoplay rule)
      play: play2,
      stop,
      startAmbient,
      stopAmbient,
      duck,
      setMuted,
      get muted() {
        return muted;
      },
      set onTrigger(fn) {
        onTrigger = typeof fn === "function" ? fn : null;
      },
      get onTrigger() {
        return onTrigger;
      }
    };
  }

  // design-system/js/haptics.js
  var HAPTICS = [
    {
      id: "tap",
      event: "Tap",
      trigger: "Button, link or icon button press (not on disabled controls)",
      pattern: [10],
      ios: "Impact light",
      android: "PRIMITIVE_CLICK",
      notes: "Fire on press. Skip disabled controls."
    },
    {
      id: "selection",
      event: "Selection",
      trigger: "Risk segment, tab, pill, toggle, checkbox",
      pattern: [8],
      ios: "Selection",
      android: "PRIMITIVE_TICK",
      notes: "Once per change, not on every press of the already selected item."
    },
    {
      id: "ball-release",
      event: "Ball release",
      trigger: "Ball leaves the chute",
      pattern: [15],
      ios: "Impact medium",
      android: "PRIMITIVE_CLICK",
      notes: "One short pulse."
    },
    {
      id: "peg-last-rows",
      event: "Peg hit, last rows",
      trigger: "Peg collision in the last 2 rows only",
      pattern: [5],
      ios: "Impact soft",
      android: "PRIMITIVE_LOW_TICK",
      notes: "Very light. Dropped if a stronger pattern is running. Not used for earlier rows."
    },
    {
      id: "bin-land",
      event: "Bin land",
      trigger: "Ball lands in a bin",
      pattern: [30],
      ios: "Impact heavy",
      android: "PRIMITIVE_THUD",
      notes: "The main physical beat of a drop."
    },
    {
      id: "win-small",
      event: "Win small",
      trigger: "Toast",
      pattern: [20],
      ios: "Notification success",
      android: "PRIMITIVE_CLICK",
      notes: "Replaces the bin-land pulse."
    },
    {
      id: "win-big",
      event: "Win big",
      trigger: "Win sheet",
      pattern: [30, 60, 30],
      ios: "Notification success",
      android: "2x PRIMITIVE_CLICK",
      notes: "Two pulses, 60 ms apart."
    },
    {
      id: "win-mega",
      event: "Win mega",
      trigger: "Takeover",
      pattern: [40, 60, 40, 60, 120],
      ios: "Notification success, then heavy impacts",
      android: "PRIMITIVE_QUICK_RISE, then PRIMITIVE_THUD",
      notes: "Rising feel: two short pulses, then one long pulse."
    },
    {
      id: "ticket-gain",
      event: "Ticket gain",
      trigger: "Ticket +1",
      pattern: [15],
      ios: "Impact light",
      android: "PRIMITIVE_TICK",
      notes: "One short pulse."
    },
    {
      id: "timer-ready",
      event: "Timer ready",
      trigger: "Free ticket available (only if the popup is open)",
      pattern: [20],
      ios: "Notification success",
      android: "PRIMITIVE_CLICK",
      notes: "Do not fire when the popup is closed."
    },
    {
      id: "error",
      event: "Error",
      trigger: "Error card",
      pattern: [40, 60, 40],
      ios: "Notification warning",
      android: "2x PRIMITIVE_TICK",
      notes: "A warning, not an error: the player lost nothing."
    }
  ];
  var PRIORITY = {
    "peg-last-rows": 1,
    tap: 1,
    selection: 1,
    "ticket-gain": 1,
    "ball-release": 2,
    "timer-ready": 2,
    error: 2,
    "bin-land": 3,
    "win-small": 4,
    "win-big": 5,
    "win-mega": 6
  };
  var BY_ID2 = new Map(HAPTICS.map((h) => [h.id, h]));
  function createHaptics() {
    const supported = typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
    let enabled = true;
    let runningUntil = 0;
    let runningPriority = 0;
    const now = () => typeof performance !== "undefined" ? performance.now() : Date.now();
    function play2(id) {
      if (!supported || !enabled) return;
      const entry = BY_ID2.get(id);
      if (!entry) return;
      try {
        const t = now();
        const prio = PRIORITY[id] || 1;
        const busy = t < runningUntil;
        if (busy && prio < runningPriority) return;
        if (busy && entry.pattern.length > 1) navigator.vibrate(0);
        const total = entry.pattern.reduce((a, b) => a + b, 0);
        navigator.vibrate(entry.pattern.length === 1 ? entry.pattern[0] : entry.pattern);
        runningUntil = t + total;
        runningPriority = prio;
      } catch (e) {
      }
    }
    return {
      get supported() {
        return supported;
      },
      get enabled() {
        return enabled;
      },
      set enabled(value) {
        enabled = !!value;
        if (!enabled && supported) {
          try {
            navigator.vibrate(0);
          } catch (e) {
          }
          runningUntil = 0;
          runningPriority = 0;
        }
      },
      play: play2
    };
  }

  // design-system/js/fx.js
  var COLOURS = ["--gold-300", "--magenta-500", "--magenta-300", "--white", "--orange-400"];
  function createFx(canvas, { base = "../design-system/assets/img/" } = {}) {
    const ctx = canvas.getContext("2d");
    const imgs = ["img-coin-a@2x.webp", "img-coin-b@2x.webp"].map((f) => {
      const i = new Image();
      i.src = base + f;
      return i;
    });
    let parts = [], raf = 0, last = 0, dpr = 1;
    const css2 = getComputedStyle(document.documentElement);
    const colours = COLOURS.map((v) => css2.getPropertyValue(v).trim() || "#fdd04a");
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    }
    function coins(x, y, n = 18) {
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1, sp = 380 + Math.random() * 420;
        parts.push({ type: "coin", x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 1400, life: 1.2 + Math.random() * 0.44, t: -i * 0.012, size: 20 + Math.random() * 12, spin: (Math.random() - 0.5) * 4 * Math.PI, img: imgs[i % 2] });
      }
    }
    function confetti(w, n = 40) {
      for (let i = 0; i < n; i++) {
        parts.push({ type: "confetti", x: Math.random() * w, y: -20 - Math.random() * 120, vy: 220 + Math.random() * 200, amp: 12 + Math.random() * 18, w0: 3 + Math.random() * 3, ph: Math.random() * 6.3, life: 2.2 + Math.random() * 0.6, t: 0, spin: 6 + Math.random() * 8, c: colours[i % colours.length], wdt: 6 + Math.random() * 3, hgt: 10 + Math.random() * 4 });
      }
    }
    function frame(now) {
      const dt = Math.min((now - last) / 1e3, 0.05);
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts = parts.filter((p) => (p.t += dt) < p.life);
      for (const p of parts) {
        if (p.t < 0) continue;
        const fade = Math.min(1, (p.life - p.t) / (p.life * 0.3));
        ctx.globalAlpha = fade;
        if (p.type === "coin") {
          const x = p.x + p.vx * p.t, y = p.y + p.vy * p.t + 0.5 * p.g * p.t * p.t;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(p.spin * p.t);
          if (p.img.complete && p.img.naturalWidth) ctx.drawImage(p.img, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        } else {
          const x = p.x + p.amp * Math.sin(p.w0 * p.t + p.ph), y = p.y + p.vy * p.t;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(p.ph + p.t * 2);
          ctx.scale(1, Math.cos(p.spin * p.t));
          ctx.fillStyle = p.c;
          ctx.fillRect(-p.wdt / 2, -p.hgt / 2, p.wdt, p.hgt);
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
      if (parts.length) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    return {
      /** type: 'small' (5-coin puff), 'big' (coin burst) or 'mega' (coins + confetti). x, y: burst origin in canvas CSS px */
      play(type, x, y) {
        resize();
        const r = canvas.getBoundingClientRect();
        coins(x, y, type === "small" ? 5 : 18);
        if (type === "mega") confetti(r.width, 40);
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      },
      clear() {
        parts = [];
      }
    };
  }

  // design-system/js/physics.js
  var PHYSICS = {
    gravity: 3e3,
    // px/s^2 at s = 33.6 px (scaled with the board)
    restitution: [0.28, 0.42],
    contactOffset: [3, 6],
    // px, how far from the peg top the ball touches
    pegRadius: 4,
    // px (plinko/peg is 8 px)
    ballRadius: 10,
    // px (plinko/ball is 20 px)
    slowMoRows: 2,
    // the last rows play in slow motion
    slowMoScale: 0.5,
    settleHops: 2,
    baseSpacing: 33.6,
    // px between pegs in Figma at 390 px
    baseRowGap: 36
    // px between rows in Figma
  };
  function geometry(W, H) {
    const pad = 6, binH = 40;
    const s = (W - 2 * pad) / 9;
    const cx = W / 2;
    const binTop = H - pad - binH;
    const lastGap = (PHYSICS.pegRadius + 2 * PHYSICS.ballRadius + 6) * s / PHYSICS.baseSpacing;
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
  function planPath(k, random2) {
    const dirs = Array.from({ length: ROWS }, (_, i) => i < k ? 1 : -1);
    for (let i = dirs.length - 1; i > 0; i--) {
      const j = Math.floor(random2() * (i + 1));
      [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
    }
    return dirs;
  }
  var lerp = (a, b, t) => a + (b - a) * t;
  function buildDrop(geo, k, random2) {
    const g = PHYSICS.gravity * geo.scale;
    const R = PHYSICS.pegRadius + PHYSICS.ballRadius;
    const dirs = planPath(k, random2);
    const segs = [], events = [];
    let x = geo.cx, y = geo.startY, vy = 0, t = 0, offset = 0;
    const fly = (x1, y1, vy0, kind) => {
      const dy = y1 - y;
      const T = (-vy0 + Math.sqrt(vy0 * vy0 + 2 * g * Math.max(dy, 0.01))) / g;
      segs.push({ t0: t, T, x0: x, y0: y, vx: (x1 - x) / T, vy0, g, kind });
      t += T;
      x = x1;
      y = y1;
      vy = vy0 + g * T;
    };
    for (let r = 0; r < ROWS; r++) {
      const n = r + 3, j = Math.round(offset / geo.s + (n - 1) / 2);
      const peg = geo.rows[r][j];
      const c = lerp(...PHYSICS.contactOffset, random2()) * geo.scale * dirs[r];
      const cy = peg.y - Math.sqrt(R * R * geo.scale * geo.scale - c * c);
      const e = r === 0 ? 0 : lerp(...PHYSICS.restitution, random2());
      fly(peg.x + c, cy, r === 0 ? 0 : -e * Math.abs(vy), "row");
      events.push({ t, type: "peg", row: r, j, dir: dirs[r] });
      if (r === ROWS - PHYSICS.slowMoRows - 1) events.push({ t, type: "last-rows" });
      offset += dirs[r] * geo.s / 2;
    }
    const restY = geo.binTop - PHYSICS.ballRadius * geo.scale + 6 * geo.scale;
    const bx = geo.binCenters[k];
    fly(bx, restY, -lerp(...PHYSICS.restitution, random2()) * Math.abs(vy), "bin");
    events.push({ t, type: "land", bin: k });
    let hop = Math.abs(vy) * 0.18;
    for (let h = 0; h < PHYSICS.settleHops; h++) {
      const T = 2 * hop / g;
      segs.push({ t0: t, T, x0: x, y0: y, vx: 0, vy0: -hop, g, kind: "settle" });
      t += T;
      hop *= 0.5;
    }
    events.push({ t, type: "settled", bin: k });
    return { dirs, segs, events, duration: t, bin: k };
  }
  function sample(drop, t) {
    const segs = drop.segs;
    let s = segs[segs.length - 1];
    for (const seg of segs) {
      if (t < seg.t0 + seg.T) {
        s = seg;
        break;
      }
    }
    const u = Math.min(Math.max(t - s.t0, 0), s.T);
    return { x: s.x0 + s.vx * u, y: s.y0 + s.vy0 * u + 0.5 * s.g * u * u, vx: s.vx, vy: s.vy0 + s.g * u, kind: s.kind };
  }
  function timeScaleAt(drop, t, reduced = false) {
    if (reduced) return 1;
    const start = drop.events.find((e) => e.type === "last-rows")?.t ?? Infinity;
    const land = drop.events.find((e) => e.type === "land")?.t ?? Infinity;
    if (t < start || t > land) return 1;
    const ramp = Math.min((t - start) / 0.08, 1);
    return lerp(1, PHYSICS.slowMoScale, ramp);
  }

  // prototype/js/board.js
  var css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  var Board = class {
    constructor(root) {
      this.root = root;
      this.playfield = root.querySelector(".playfield");
      this.canvas = this.playfield.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.strip = this.playfield.querySelector(".chance-strip");
      this.row = this.playfield.querySelector(".bin-row");
      this.frame = root.querySelector(".frame");
      this.bulbs = root.querySelector(".frame__bulbs");
      this.chute = root.querySelector(".chute");
      this.ball = new Image();
      this.ball.src = "../design-system/assets/img/img-ball@2x.webp";
      this.ball.onload = () => this.draw();
      this.hits = /* @__PURE__ */ new Map();
      this.trail = [];
      this.pos = null;
      this.landedAt = 0;
      this.hidden = false;
      this.reduced = false;
      this.strip.innerHTML = BIN_CHANCE.map((p) => `<i class="chance-bar" style="--h:${(8 + 92 * p / BIN_CHANCE[4]).toFixed(1)}%"></i>`).join("");
      this.row.innerHTML = '<div class="bin" role="listitem"><span class="bin-content"></span></div>'.repeat(9);
      new ResizeObserver(() => this.layout()).observe(this.playfield);
      this.layout();
    }
    layout() {
      const r = { width: this.playfield.clientWidth, height: this.playfield.clientHeight };
      if (!r.width || !r.height) return;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.round(r.width * this.dpr);
      this.canvas.height = Math.round(r.height * this.dpr);
      this.geo = geometry(r.width, r.height);
      this.pegLayer = null;
      const g = this.geo, left = g.pad + 2, width = 9 * g.s - 4;
      Object.assign(this.row.style, { left: left + "px", width: width + "px", bottom: g.pad + "px" });
      Object.assign(this.strip.style, { left: left + "px", width: width + "px", bottom: g.pad + g.binH + 4 + "px", height: Math.round(94 * g.scale) + "px" });
      this.layoutBulbs();
      this.draw();
    }
    /** 54 bulbs around the frame, none in the corners; pink and gold alternate */
    layoutBulbs() {
      const f = { width: this.frame.offsetWidth, height: this.frame.offsetHeight }, o = 11, W = f.width, H = f.height;
      const nx = Math.max(4, Math.round((W - 2 * o) / 25.8)), ny = Math.max(4, Math.round((H - 2 * o) / 25.8));
      const pts = [];
      for (let i = 1; i < nx; i++) pts.push([o + i * (W - 2 * o) / nx, o]);
      for (let j = 1; j < ny; j++) pts.push([W - o, o + j * (H - 2 * o) / ny]);
      for (let i = nx - 1; i > 0; i--) pts.push([o + i * (W - 2 * o) / nx, H - o]);
      for (let j = ny - 1; j > 0; j--) pts.push([o, o + j * (H - 2 * o) / ny]);
      this.bulbs.innerHTML = pts.map((p, i) => `<i class="bulb ${i % 2 ? "bulb--gold" : "bulb--pink"}" style="left:${p[0].toFixed(1)}px;top:${p[1].toFixed(1)}px;--odd:${i % 2};--n:${i % 4}"></i>`).join("");
    }
    /** Fill the bins for a risk level. animate = slot reel (Interaction/bins-reel): every bin spins through
        prizes from all risk levels and stops on the new prize, from the centre out. onStop(i) fires as each bin stops. */
    setBins(risk, animate = false, onStop = () => {
    }) {
      const bins = binsFor(risk);
      const pool = ["low", "medium", "high"].flatMap((r) => binsFor(r));
      const content = (b) => b.edge ? icon(b.icon, "sm") : b.gc ? icon("coin", "xs") + b.amount : b.amount;
      const cls = (b) => "bin-content" + (b.edge ? " bin-content--edge" : b.gc ? " bin-content--gc" : "");
      const ms = (name, fb) => {
        const v = css(name);
        return v ? parseFloat(v) * (v.endsWith("ms") ? 1 : 1e3) : fb;
      };
      const dur = ms("--motion-bins-reel-duration", 800), step = ms("--motion-bins-reel-stagger-duration", 90);
      const easing = css("--motion-bins-reel-easing") || "ease-out";
      const gen = this.reelGen = (this.reelGen || 0) + 1;
      this.reels?.forEach((a) => a.cancel());
      this.reels = [];
      [...this.row.children].forEach((el, i) => {
        const b = bins[i];
        const apply = () => {
          el.dataset.heat = b.heat;
          el.setAttribute("aria-label", b.label);
          el.innerHTML = `<span class="${cls(b)}">${content(b)}</span>`;
        };
        if (!animate || this.reduced || !el.animate) {
          apply();
          return;
        }
        const d = Math.abs(i - 4), n = 7 + 2 * d;
        const h = el.clientHeight || 40;
        const cur = el.querySelector(".bin-content");
        const items = [cur ? cur.outerHTML : ""];
        for (let k = 0; k < n; k++) {
          const r = pool[(i * 7 + k * 5 + d) % pool.length];
          items.push(`<span class="${cls(r)}">${content(r)}</span>`);
        }
        items.push(`<span class="${cls(b)}">${content(b)}</span>`);
        const after = pool[(i + 3) % pool.length];
        items.push(`<span class="${cls(after)}">${content(after)}</span>`);
        el.innerHTML = `<span class="bin-reel" style="--reel-h:${h}px"><span class="bin-reel__strip">${items.join("")}</span></span>`;
        const strip = el.querySelector(".bin-reel__strip");
        const to = -(n + 1) * h;
        const a = strip.animate([
          { transform: "translateY(0)", filter: "blur(0)" },
          { transform: `translateY(${to * 0.25}px)`, filter: "blur(1.2px)", offset: 0.2 },
          { transform: `translateY(${to * 0.85}px)`, filter: "blur(0.6px)", offset: 0.7 },
          { transform: `translateY(${to}px)`, filter: "blur(0)" }
        ], { duration: dur + d * step, easing, fill: "forwards" });
        const heat = setTimeout(() => {
          el.dataset.heat = b.heat;
        }, (dur + d * step) * 0.6);
        a.onfinish = () => {
          clearTimeout(heat);
          if (gen !== this.reelGen) return;
          apply();
          el.classList.remove("is-reel-stop");
          void el.offsetWidth;
          el.classList.add("is-reel-stop");
          onStop(i);
        };
        a.oncancel = () => {
          clearTimeout(heat);
        };
        this.reels.push(a);
      });
      this.bins = bins;
    }
    /** Win build-up on the frame before the result card: 'big' = bulbs flare (State=Flare),
        'mega' = the frame turns gold and every bulb flares gold (State=Celebrate). Resolves when the build-up ends. */
    buildUp(tier) {
      const cls = tier === "mega" ? "is-celebrate" : "is-flare";
      const v = css(tier === "mega" ? "--motion-win-buildup-duration" : "--motion-win-buildup-big-duration");
      const ms = v ? parseFloat(v) * (v.endsWith("ms") ? 1 : 1e3) : tier === "mega" ? 600 : 350;
      this.frame.classList.remove("is-flare", "is-celebrate");
      void this.frame.offsetWidth;
      this.frame.classList.add(cls);
      return new Promise((r) => setTimeout(r, ms));
    }
    endBuildUp() {
      this.frame.classList.remove("is-flare", "is-celebrate");
    }
    clearBinStates() {
      this.endBuildUp();
      [...this.row.children].forEach((el) => el.classList.remove("is-hit", "is-anticipation"));
      [...this.strip.children].forEach((el) => el.classList.remove("is-hit"));
    }
    setDimmed(on) {
      const changed = this.hidden !== on;
      this.root.classList.toggle("is-dimmed", on);
      this.frame.classList.toggle("is-dimmed", on);
      this.hidden = on;
      if (changed) {
        this.pos = null;
        this.trail = [];
      }
      this.draw();
    }
    resetBall() {
      this.pos = null;
      this.trail = [];
      this.landedAt = 0;
      this.clearBinStates();
      this.draw();
    }
    /** Run the drop to bin k. on(event) gets 'release', 'peg', 'last-rows', 'land', 'settled'. Resolves when the ball settles. */
    drop(k, random2, on = () => {
    }) {
      this.clearBinStates();
      const drop = buildDrop(this.geo, k, random2);
      const events = drop.events.slice();
      this.frame.classList.add("is-active");
      this.chute.classList.add("is-releasing");
      on({ type: "release", drop });
      let t = 0, last = performance.now();
      this.landedAt = 0;
      return new Promise((resolve) => {
        const step = (now) => {
          const dt = Math.min((now - last) / 1e3, 0.05);
          last = now;
          t += dt * timeScaleAt(drop, t, this.reduced);
          while (events.length && events[0].t <= t) {
            const e = events.shift();
            if (e.type === "peg") {
              this.hits.set(e.row + ":" + e.j, now);
              if (e.row === 0) this.chute.classList.remove("is-releasing");
            }
            if (e.type === "last-rows") {
              const rights = drop.dirs.slice(0, e.t ? 6 : 6).filter((d) => d > 0).length;
              for (let b = rights; b <= rights + 2; b++) this.row.children[b]?.classList.add("is-anticipation");
            }
            if (e.type === "land") {
              this.frame.classList.remove("is-active");
              this.clearBinStates();
              this.row.children[k].classList.add("is-hit");
              this.strip.children[k].classList.add("is-hit");
            }
            on(e);
            if (e.type === "settled") {
              this.landedAt = now;
            }
          }
          this.pos = sample(drop, Math.min(t, drop.duration));
          if (!this.reduced) {
            this.trail.push({ x: this.pos.x, y: this.pos.y });
            if (this.trail.length > 8) this.trail.shift();
          }
          this.draw(now);
          if (t < drop.duration) requestAnimationFrame(step);
          else {
            this.trail = [];
            this.loopLanded();
            resolve(drop);
          }
        };
        requestAnimationFrame(step);
      });
    }
    /** Landed ball: the glow breathes (Interaction/pulse, 1.6 s) until the next drop */
    loopLanded() {
      const tick = (now) => {
        if (!this.landedAt || this.reduced) {
          this.draw(now);
          return;
        }
        this.draw(now);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    draw(now = performance.now()) {
      const c = this.ctx, g = this.geo;
      if (!g) return;
      c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      c.clearRect(0, 0, g.W, g.H);
      const idle = css("--plinko-peg-idle") || "#ccc", hit = css("--plinko-peg-hit") || "#fdd04a";
      const pr = PHYSICS.pegRadius * Math.min(g.scale, 1.1);
      if (!this.pegLayer || this.pegLayer.width !== this.canvas.width || this.pegLayer.height !== this.canvas.height) {
        const L = document.createElement("canvas");
        L.width = this.canvas.width;
        L.height = this.canvas.height;
        const lc = L.getContext("2d");
        lc.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        lc.shadowColor = "rgba(255,255,255,0.45)";
        lc.shadowBlur = 6;
        lc.fillStyle = idle;
        for (const row of g.rows) for (const p of row) {
          lc.beginPath();
          lc.arc(p.x, p.y, pr, 0, Math.PI * 2);
          lc.fill();
        }
        this.pegLayer = L;
      }
      c.save();
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.drawImage(this.pegLayer, 0, 0);
      c.restore();
      for (const [key, h] of this.hits) {
        const k = Math.max(0, 1 - (now - h) / 300);
        if (k <= 0) {
          this.hits.delete(key);
          continue;
        }
        const [r, j] = key.split(":").map(Number), p = g.rows[r][j];
        c.save();
        c.shadowColor = hit;
        c.shadowBlur = 6 + 6 * k;
        c.fillStyle = mix(idle, hit, k);
        c.beginPath();
        c.arc(p.x, p.y, pr * (1 + 0.25 * k), 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
      if (this.hidden) return;
      const br = PHYSICS.ballRadius * g.scale;
      const pos = this.pos || { x: g.cx, y: g.startY };
      const glow = css("--plinko-ball-fill") || "#fdd04a";
      this.trail.forEach((p, i) => {
        const a = (i + 1) / (this.trail.length + 1);
        c.globalAlpha = a * 0.35;
        c.fillStyle = glow;
        c.beginPath();
        c.arc(p.x, p.y, br * (0.45 + 0.5 * a), 0, Math.PI * 2);
        c.fill();
      });
      c.globalAlpha = 1;
      let gl = 16;
      if (this.landedAt && !this.reduced) gl = 18 + 8 * (0.5 - 0.5 * Math.cos((now - this.landedAt) / 1600 * Math.PI * 2));
      c.save();
      c.shadowColor = "rgba(253,208,74,0.75)";
      c.shadowBlur = gl;
      if (this.ball.complete && this.ball.naturalWidth) c.drawImage(this.ball, pos.x - br, pos.y - br, br * 2, br * 2);
      else {
        c.fillStyle = glow;
        c.beginPath();
        c.arc(pos.x, pos.y, br, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
    }
    /** Centre of bin k in viewport coordinates (for the toast and the coin burst) */
    binPoint(k) {
      const el = this.row.children[k].getBoundingClientRect();
      return { x: el.left + el.width / 2, y: el.top };
    }
  };
  function mix(a, b, t) {
    const p = (h) => {
      h = h.replace("#", "");
      if (h.length === 3) h = h.split("").map((x) => x + x).join("");
      return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    };
    try {
      const A = p(a), B = p(b);
      return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
    } catch {
      return b;
    }
  }

  // prototype/js/main.js
  var $ = (s, r = document) => r.querySelector(s);
  var msVar = (name, fb) => {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v ? parseFloat(v) * (v.endsWith("ms") ? 1 : 1e3) : fb;
  };
  var keyboardUser = false;
  addEventListener("keydown", (e) => {
    if (e.key === "Tab" || e.key.startsWith("Arrow")) keyboardUser = true;
  }, true);
  addEventListener("pointerdown", () => {
    keyboardUser = false;
  }, true);
  HTMLElement.prototype.focusKb = function() {
    if (keyboardUser) this.focus({ preventScroll: true });
  };
  var IMG = "../design-system/assets/img/";
  var params = new URLSearchParams(location.search);
  var store = {
    get(k, d) {
      try {
        const v = localStorage.getItem("plinko:" + k);
        return v === null ? d : JSON.parse(v);
      } catch {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem("plinko:" + k, JSON.stringify(v));
      } catch {
      }
    }
  };
  var state = {
    screen: "closed",
    // closed | onboarding | ready | dropping | result | empty
    risk: "low",
    // first open starts on Low
    tickets: 5,
    force: "",
    // demo only
    sound: store.get("sound", true),
    haptics: store.get("haptics", true),
    seenWelcome: store.get("seenWelcome", false),
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    timerEnd: Date.now() + (5 * 3600 + 12 * 60 + 33) * 1e3
  };
  var random = rng(params.has("seed") ? Number(params.get("seed")) : void 0);
  var sound = createSound();
  var haptics = createHaptics();
  var fx = createFx($("#fx"));
  var board = new Board($("#board"));
  sound.setMuted(!state.sound);
  haptics.enabled = state.haptics;
  var debugEl = $("#debug");
  var log = [];
  function debug(msg) {
    log.unshift(msg);
    log.length = 14;
    debugEl.textContent = log.filter(Boolean).join("\n");
  }
  sound.onTrigger = (id, o = {}) => debug("sound " + id + (o.row !== void 0 ? " row " + o.row : "") + (o.level ? " " + o.level : ""));
  var play = (id, o) => sound.play(id, o);
  var buzz = (id) => {
    if (!navigator.userActivation || navigator.userActivation.hasBeenActive) haptics.play(id);
  };
  if (params.has("debug")) {
    debugEl.hidden = false;
    $("#demo-debug").setAttribute("aria-pressed", "true");
  }
  $("#btn-sound").innerHTML = icon("sound-on");
  $("#btn-close").innerHTML = icon("close");
  $("#prize-strip").innerHTML = `${icon(BASE_PRIZE.icon, "md")}<span>Today's prize:</span><span class="prize-strip__prize">${BASE_PRIZE.amount} ${BASE_PRIZE.name}</span>`;
  $(".ticket-tab__icon").outerHTML = icon("ticket", "sm");
  $(".winnings-tab__icon").outerHTML = icon("gift", "sm");
  $("#btn-rules").innerHTML = `${icon("info", "md", "icon--accent")}<span class="footer-link__text"><span class="footer-link__title">Rules and odds</span><span class="footer-link__desc">Same average at every level: ~${BASE_PRIZE.amount} FS</span></span>${icon("arrow-right", "sm", "icon--muted")}`;
  $("#earn-line").innerHTML = `${icon("ticket", "sm")}<span>Tickets also come as you play<small>1 ticket for every 50K GC played</small></span>`;
  $(".timer__ring").insertAdjacentHTML("beforeend", icon("clock", "sm"));
  var track = $(".risk-selector__track");
  function chartSVG(risk) {
    const bins = binsFor(risk);
    const h = (b) => 12 + 88 * Math.log(b.m / 0.2) / Math.log(30 / 0.2);
    return `<svg class="risk-chart" viewBox="0 0 54 14" aria-hidden="true">${bins.map((b, i) => {
      const v = h(b) * 0.14;
      return `<rect x="${(i * 6.1).toFixed(1)}" y="${(14 - v).toFixed(1)}" width="4.6" height="${v.toFixed(1)}" rx="1" data-heat="${b.heat}" style="--d:${Math.abs(i - 4)}"/>`;
    }).join("")}</svg>`;
  }
  RISK_ORDER.forEach((r, i) => track.insertAdjacentHTML(
    "beforeend",
    `<button class="risk-segment risk-segment--${r}" type="button" role="radio" aria-checked="false" data-risk="${r}" tabindex="-1"><span class="risk-segment__label">${RISK[r].label}</span>${chartSVG(r)}</button>`
  ));
  var segments = [...track.querySelectorAll(".risk-segment")];
  function setRisk(r, user = false) {
    if (user && r === state.risk) return;
    state.risk = r;
    const i = RISK_ORDER.indexOf(r);
    track.style.setProperty("--i", i);
    segments.forEach((s) => {
      const on = s.dataset.risk === r;
      s.setAttribute("aria-checked", on);
      s.tabIndex = on ? 0 : -1;
      s.querySelector(".risk-chart").classList.toggle("is-selected", on);
    });
    const cap = $(".risk-selector__caption");
    if (user && !state.reduced) {
      cap.style.opacity = 0;
      setTimeout(() => {
        cap.textContent = RISK[r].caption;
        cap.style.opacity = 1;
      }, 150);
    } else cap.textContent = RISK[r].caption;
    board.setBins(r, user, (i2) => {
      if (user) play("coin-tick", { count: 2 + Math.abs(i2 - 4) * 2 });
    });
    if (user) {
      play("risk-change", { level: r });
      setTimeout(() => play("bins-shuffle"), 120);
      buzz("selection");
    }
  }
  track.addEventListener("click", (e) => {
    const b = e.target.closest(".risk-segment");
    if (b && !b.disabled) setRisk(b.dataset.risk, true);
  });
  track.addEventListener("keydown", (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!d || state.screen !== "ready") return;
    e.preventDefault();
    const i = (RISK_ORDER.indexOf(state.risk) + d + 3) % 3;
    setRisk(RISK_ORDER[i], true);
    segments[i].focus();
  });
  function setControlsEnabled(on) {
    segments.forEach((s) => {
      s.disabled = !on;
    });
    $("#risk").classList.toggle("is-disabled", !on);
  }
  function renderTickets(gained = false) {
    const n = state.tickets, label = `${n} ticket${n === 1 ? "" : "s"}`;
    $(".ticket-tab__count").textContent = label;
    $("#ticket-tab").classList.toggle("is-empty", n === 0);
    $("#ticket-tab").classList.toggle("is-low", n === 1);
    if (gained) {
      const t = $("#ticket-tab");
      t.classList.remove("is-gained");
      void t.offsetWidth;
      t.classList.add("is-gained");
    }
    $("#btn-drop .button__sublabel").textContent = `${n} ticket${n === 1 ? "" : "s"} left`;
  }
  state.won = [];
  var fmtK = (n) => n >= 1e3 ? String(+(n / 1e3).toFixed(1)) + "K" : String(n);
  var parseAmount = (a) => /K$/.test(a) ? parseFloat(a) * 1e3 : Number(a);
  function prizesOf(bin) {
    if (bin.edge) return bin.contents.map((c) => ({ kind: c.label, amount: parseAmount(c.amount), image: c.image }));
    if (bin.gc) return [{ kind: "Gold Coins", amount: bin.gc, image: "img-reward-gold-coins" }];
    return [{ kind: "Free Spins", amount: Number(bin.amount), image: "img-reward-free-spins" }];
  }
  function totals() {
    var _a;
    const t = {};
    for (const w of state.won) {
      t[_a = w.kind] ?? (t[_a] = { amount: 0, image: w.image, wins: 0 });
      t[w.kind].amount += w.amount;
      t[w.kind].wins += 1;
    }
    return t;
  }
  function totalLabel() {
    const t = totals(), parts = [];
    if (t["Free Spins"]) parts.push(`${t["Free Spins"].amount} FS`);
    if (t["Gold Coins"]) parts.push(`${fmtK(t["Gold Coins"].amount)} GC`);
    const items = (t.Collectable?.amount || 0) + (t["Rare collectable"]?.amount || 0);
    if (items) parts.push(`${items} item${items > 1 ? "s" : ""}`);
    return parts.join(" \xB7 ");
  }
  function addWin(bin, delay = 0) {
    const items = prizesOf(bin);
    state.won.push(...items);
    const label = totalLabel(), main = items.find((i) => i.kind !== "Tickets");
    debug("pool " + label);
    if (!label || !main) return;
    const show = () => {
      const tab = $("#winnings-tab"), first = tab.hidden;
      tab.hidden = false;
      $(".winnings-tab__total").textContent = "Won " + totalLabel();
      tab.querySelector(".ticket-tab__gain").textContent = main.kind === "Gold Coins" ? `+${fmtK(main.amount)}` : main.kind === "Free Spins" ? `+${main.amount}` : "+1";
      if (!first) {
        tab.classList.remove("is-gained");
        void tab.offsetWidth;
        tab.classList.add("is-gained");
      }
    };
    if (delay) setTimeout(() => {
      if (state.won.length) show();
    }, delay);
    else show();
  }
  var timeLeft = () => {
    const left = Math.max(0, state.timerEnd - Date.now());
    return [Math.floor(left / 36e5), Math.floor(left / 6e4) % 60, Math.floor(left / 1e3) % 60].map((x) => String(x).padStart(2, "0")).join(":");
  };
  function showSummary(reason) {
    state.summaryOpen = true;
    const t = totals(), n = state.tickets;
    const rows = Object.entries(t).map(([k, v]) => `<li class="summary-row"><img class="reward-icon" src="${IMG}${v.image}@2x.webp" alt=""><span class="summary-row__name">${k}<small>${v.wins} win${v.wins > 1 ? "s" : ""}${k === "Tickets" ? ", added to your balance" : ""}</small></span><span class="summary-row__amount">${k === "Gold Coins" ? fmtK(v.amount) : v.amount}</span></li>`).join("");
    const keep = `<button class="button button--primary button--lg" type="button" data-act="keep" data-autofocus><span class="button__label">Keep playing</span><span class="button__sublabel">${n} ticket${n === 1 ? "" : "s"} left</span></button>`;
    const lobbyPrimary = `<button class="button button--primary button--lg" type="button" data-act="lobby" data-autofocus><span class="button__label">Back to lobby</span></button>`;
    const actions = n > 0 ? keep + `<button class="link" type="button" data-act="lobby">Back to lobby</button>` : lobbyPrimary + (reason === "view" ? `<button class="link" type="button" data-act="keep">Close</button>` : "");
    openLayer(`<div class="summary anim-sheet-enter" role="dialog" aria-modal="true" aria-labelledby="s-title">
    <div class="summary__head"><h2 class="summary__title gold-text" id="s-title">Your winnings</h2><p class="summary__sub">This session. Everything is already in My Rewards.</p></div>
    <ul class="summary__list">${rows}</ul>
    <p class="summary__next">${icon("clock", "sm")}<span>Next free ticket in <b data-next>${timeLeft()}</b></span></p>
    <div class="summary__actions">${actions}</div>
  </div>`, "bottom", "low");
    play("ui-open");
    buzz("tap");
    const tick = setInterval(() => {
      const b = layer.querySelector("[data-next]");
      if (b) b.textContent = timeLeft();
      else clearInterval(tick);
    }, 1e3);
    layer.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", async () => {
      state.summaryOpen = false;
      if (b.dataset.act === "keep") {
        play("ui-tap");
        buzz("tap");
        await closeLayer();
        (state.screen === "empty" ? $("#btn-lobby") : $("#btn-drop")).focusKb();
      } else {
        await closeLayer();
        closeGame(true);
      }
    }));
  }
  var layer = $("#layer");
  function openLayer(html, align = "center", blur = "medium", scrim = "--scrim-medium") {
    layer.innerHTML = `<div class="layer__scrim ${blur ? "scrim--blur-" + blur : ""} anim-fade-in" style="background:var(${scrim})"></div>${html}`;
    layer.className = "layer layer--" + align;
    layer.hidden = false;
    setBackgroundInert(true);
    const first = layer.querySelector("[data-autofocus]") || layer.querySelector("button");
    first?.focusKb();
  }
  function setBackgroundInert(on) {
    document.querySelectorAll(".popup__header, .popup__body, .popup__footer").forEach((el) => {
      el.inert = on;
    });
    $("#demo-toggle").tabIndex = on ? -1 : 0;
  }
  function closeLayer() {
    return new Promise((res) => {
      if (layer.hidden) return res();
      const panel = layer.lastElementChild;
      const cls = panel.classList.contains("anim-sheet-enter") ? "anim-sheet-exit" : "anim-modal-exit";
      panel.classList.remove("anim-sheet-enter", "anim-modal-enter");
      panel.classList.add(cls);
      layer.firstElementChild.classList.replace("anim-fade-in", "anim-fade-out");
      setTimeout(() => {
        layer.hidden = true;
        layer.innerHTML = "";
        setBackgroundInert(false);
        res();
      }, state.reduced ? 160 : 220);
    });
  }
  function setScreen(s) {
    state.screen = s;
    const empty = s === "empty";
    $("#controls").dataset.state = empty ? "empty" : "ready";
    board.setDimmed(empty);
    const drop = $("#btn-drop");
    drop.classList.toggle("is-loading", s === "dropping");
    drop.setAttribute("aria-busy", s === "dropping");
    drop.querySelector(".spinner").hidden = s !== "dropping";
    drop.classList.toggle("is-pulse", s === "ready");
    drop.querySelector(".button__label").textContent = state.dropped ? "Drop again" : "Drop";
    setControlsEnabled(s === "ready");
    if (empty) {
      startTimer();
      play("no-tickets");
    }
    debug("state " + s);
  }
  function openGame(auto = false) {
    sound.unlock();
    $("#game").hidden = false;
    $("#game").classList.remove("is-closing");
    const p = $("#popup");
    p.classList.remove("anim-modal-exit");
    p.classList.add("anim-modal-enter");
    if (auto) state.openSoundPending = true;
    else sound.unlock().then(() => play("popup-open"));
    buzz("tap");
    board.layout();
    board.setBins(state.risk);
    board.resetBall();
    renderTickets();
    if (state.tickets === 0) setScreen("empty");
    else setScreen("ready");
    setTimeout(() => sound.startAmbient(), 600);
    if (!state.seenWelcome) setTimeout(showWelcome, state.reduced ? 100 : 450);
    else $("#btn-drop").focusKb();
  }
  function closeGame(skipSummary = false) {
    if (state.buildingUp) return;
    if (!skipSummary && totalLabel() && state.screen !== "dropping") {
      showSummary("exit");
      return;
    }
    play("ui-close");
    buzz("tap");
    sound.stopAmbient();
    state.won = [];
    $("#winnings-tab").hidden = true;
    const g = $("#game"), p = $("#popup");
    g.classList.add("is-closing");
    p.classList.remove("anim-modal-enter");
    p.classList.add("anim-modal-exit");
    $("#takeover-root").innerHTML = "";
    setTimeout(() => {
      g.hidden = true;
      layer.hidden = true;
      layer.innerHTML = "";
      state.screen = "closed";
      stopTimer();
      $("#demo-toggle").focusKb();
    }, 220);
  }
  function showWelcome() {
    state.screen = "onboarding";
    const steps = [
      ["ticket", "Get tickets", "They come as you play any game: 1 ticket for every 50K GC played. You also get 1 free ticket every day."],
      ["chest", "Pick your risk", "Risk changes the size of the prizes, not the chances."],
      ["free-spins", "Tap Drop", "One ticket, one ball. Every drop wins a prize."]
    ];
    openLayer(`<div class="card anim-modal-enter" role="dialog" aria-modal="true" aria-labelledby="w-title">
    <span class="reward-art card__art"><img class="reward-icon" src="${IMG}img-reward-ticket@2x.webp" alt=""></span>
    <button class="icon-button card__close" type="button" data-act="start" aria-label="Close">${icon("close")}</button>
    <div class="card__head"><h2 class="card__title" id="w-title">Welcome to Plinko</h2>
    <p class="card__sub">Turn your tickets into prizes</p></div>
    <div class="card__steps">${steps.map(([ic, t, d]) => `<div class="list-row"><span class="list-row__disc">${icon(ic, "sm")}</span><span><span class="list-row__title">${t}</span><span class="list-row__desc">${d}</span></span></div>`).join("")}</div>
    <div class="prize-strip prize-strip--gift">1 free ticket every day</div>
    <div class="card__actions"><button class="button button--primary button--lg" type="button" data-act="start" data-autofocus><span class="button__label">Let's play</span></button>
    <label class="checkbox-row"><input class="checkbox" type="checkbox" id="w-dont"><span>Don't show this again</span></label>
    <p class="card__hint">${icon("info", "xs", "icon--muted")}You can always find this in Rules and odds</p></div>
  </div>`, "center", "medium");
    play("ui-open");
    layer.querySelector("#w-dont").addEventListener("change", (e) => {
      play("ui-toggle", { on: e.target.checked });
      buzz("selection");
    });
    layer.querySelectorAll('[data-act="start"]').forEach((b) => b.addEventListener("click", async () => {
      play("ui-tap");
      buzz("tap");
      if (layer.querySelector("#w-dont").checked) {
        state.seenWelcome = true;
        store.set("seenWelcome", true);
      }
      state.seenWelcome = true;
      await closeLayer();
      setScreen("ready");
      $("#btn-drop").focusKb();
    }));
  }
  async function startDrop() {
    if (state.screen !== "ready" || state.tickets < 1 || state.busy) return;
    state.busy = true;
    try {
      await closeLayer();
    } finally {
      state.busy = false;
    }
    if (state.screen !== "ready") return;
    $("#takeover-root").innerHTML = "";
    const bin = decideOutcome(state.risk, random, state.force || null);
    debug(`outcome bin ${bin.index} ${bin.label} (${bin.tier})`);
    state.tickets -= 1;
    state.dropped = true;
    state.drops = (state.drops || 0) + 1;
    renderTickets();
    setScreen("dropping");
    play("ui-tap");
    buzz("ball-release");
    await board.drop(bin.index, random, (e) => {
      if (e.type === "release") play("ball-release");
      if (e.type === "peg") {
        play("peg-hit", { row: e.row });
        if (e.row >= 6) buzz("peg-last-rows");
      }
      if (e.type === "last-rows" && !state.reduced) play("riser");
      if (e.type === "land") {
        sound.stop("riser");
        play("bin-land", { heat: bin.heat });
        buzz("bin-land");
      }
    });
    showResult(bin);
  }
  function countUp(el, to, ms = 700) {
    const num = parseFloat(to), suffix = String(to).replace(/[\d.]/g, "");
    if (state.reduced || !isFinite(num)) {
      el.textContent = to;
      return;
    }
    const t0 = performance.now();
    let lastTick = -1;
    const step = (now) => {
      const k = Math.min((now - t0) / ms, 1), v = Math.round(num * (1 - Math.pow(1 - k, 3)));
      el.textContent = v + suffix;
      const tick = Math.floor(k * 12);
      if (tick !== lastTick) {
        lastTick = tick;
        play("coin-tick", { count: tick });
      }
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function afterResult() {
    if (state.tickets > 0) setScreen("ready");
    else setScreen("empty");
  }
  function primaryAfterWin() {
    return state.tickets > 0 ? `<button class="button button--primary button--lg" type="button" data-act="again" data-autofocus><span class="button__label">Drop again</span><span class="button__sublabel">${state.tickets} ticket${state.tickets === 1 ? "" : "s"} left</span></button>` : `<button class="button button--primary button--lg" type="button" data-act="close" data-autofocus><span class="button__label">Continue</span></button>`;
  }
  async function showResult(bin) {
    state.screen = "result";
    const p = board.binPoint(bin.index);
    if (bin.tier === "small") {
      const pop = $("#popup").getBoundingClientRect();
      const t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      t.style.left = p.x - pop.left + "px";
      t.style.top = p.y - pop.top - 8 + "px";
      t.innerHTML = `<span class="toast__amount">+${bin.amount}</span>${bin.unit}`;
      $("#popup").appendChild(t);
      setTimeout(() => t.remove(), msVar("--motion-toast-float-duration", 2200) + 100);
      play("win-small");
      buzz("win-small");
      if (!state.reduced) fx.play("small", p.x, p.y);
      addWin(bin, state.reduced ? 0 : 700);
      const drop = state.drops;
      setTimeout(() => {
        if (state.drops === drop && state.screen !== "dropping") board.resetBall();
      }, 1500);
      afterResult();
      return;
    }
    if (bin.tier === "big") {
      state.buildingUp = true;
      await board.buildUp("big");
      state.buildingUp = false;
      openLayer(`<div class="win-sheet anim-sheet-enter" role="dialog" aria-modal="true" aria-labelledby="ws-title">
      <div class="win-sheet__row">
        <span class="reward-art reward-art--md has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}${bin.image}@2x.webp" alt=""></span>
        <span class="win-sheet__text"><span class="win-sheet__title gold-text" id="ws-title">Big win!</span><span class="win-sheet__amount"><b data-count>${bin.amount}</b>${bin.unit}</span></span>
        <span class="win-sheet__added">Added to<br>My Rewards</span>
      </div>
      <div class="win-sheet__actions">${primaryAfterWin()}
      <button class="link" type="button" data-act="close">Close</button></div>
    </div>`, "bottom", "low");
      countUp(layer.querySelector("[data-count]"), bin.amount);
      play("win-big");
      buzz("win-big");
      setTimeout(() => play("reward-collect"), 900);
      if (!state.reduced) fx.play("big", p.x, p.y);
      wireWin(layer, bin);
      return;
    }
    const ticketsWon = bin.kind === "ticket" ? bin.m : 0;
    if (ticketsWon) {
      state.tickets += ticketsWon;
      renderTickets(true);
      setTimeout(() => play("ticket-gain"), 1200);
    }
    buzz("bin-land");
    state.buildingUp = true;
    await board.buildUp("mega");
    state.buildingUp = false;
    const root = $("#takeover-root");
    root.innerHTML = `<div class="takeover anim-modal-enter" role="dialog" aria-modal="true" aria-labelledby="wt-title">
    <button class="icon-button takeover__close" type="button" data-act="close" aria-label="Close">${icon("close")}</button>
    <h2 class="takeover__title pink-text" id="wt-title">Mega win!</h2>
    <span class="reward-art reward-art--lg has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}${bin.image}@2x.webp" alt=""></span>
    <div class="takeover__content"><p class="takeover__name">${bin.name}</p>
    <div class="takeover__tiles" style="--n:${bin.contents.length}">${bin.contents.map((c) => `<div class="reward-tile"><img class="reward-icon" src="${IMG}${c.image}@2x.webp" alt=""><span class="reward-tile__amount">${c.amount}</span><span class="reward-tile__label">${c.label}</span></div>`).join("")}</div>
    <div class="takeover__actions">${primaryAfterWin()}
    <button class="link" type="button" data-act="close">Close</button></div></div>
    <p class="takeover__added">${ticketsWon ? `+${ticketsWon} tickets added to your balance` : "Added to My Rewards"}</p>
  </div>`;
    setBackgroundInert(true);
    root.querySelector("[data-autofocus]")?.focusKb();
    sound.duck(4e3);
    play("win-mega");
    buzz("win-mega");
    if (!state.reduced) {
      const r = root.querySelector(".reward-art").getBoundingClientRect();
      fx.play("mega", r.left + r.width / 2, r.top + r.height / 2);
    }
    wireWin(root, bin);
  }
  function wireWin(root, bin) {
    root.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", async () => {
      if (root.dataset.done) return;
      root.dataset.done = 1;
      const again = b.dataset.act === "again";
      play(again ? "ui-tap" : "ui-close");
      buzz("tap");
      fx.clear();
      if (root.id === "takeover-root") {
        root.firstElementChild.classList.replace("anim-modal-enter", "anim-modal-exit");
        await wait(200);
        root.innerHTML = "";
        setBackgroundInert(false);
      } else await closeLayer();
      board.resetBall();
      addWin(bin);
      delete root.dataset.done;
      afterResult();
      if (again) startDrop();
      else $("#btn-drop").focusKb();
    }));
  }
  var wait = (ms) => new Promise((r) => setTimeout(r, ms));
  var timerId = 0;
  function startTimer() {
    stopTimer();
    const ring = $("#timer .fill"), C = 2 * Math.PI * 19, total = 24 * 3600 * 1e3;
    ring.style.strokeDasharray = C;
    const tick = () => {
      const left = Math.max(0, state.timerEnd - Date.now());
      const h = Math.floor(left / 36e5), m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60;
      $("#timer .timer__digits").textContent = [h, m, s].map((x) => String(x).padStart(2, "0")).join(":");
      ring.style.strokeDashoffset = C * (left / total);
      if (left === 0) freeTicketReady();
    };
    tick();
    timerId = setInterval(tick, 1e3);
  }
  function stopTimer() {
    clearInterval(timerId);
    timerId = 0;
  }
  function freeTicketReady() {
    stopTimer();
    const t = $("#timer");
    t.classList.add("is-ready");
    $("#timer .timer__digits").textContent = "Ready!";
    $("#timer .fill").style.strokeDashoffset = 0;
    play("timer-ready");
    buzz("timer-ready");
    setTimeout(() => {
      t.classList.remove("is-ready");
      state.tickets += 1;
      state.timerEnd = Date.now() + 24 * 3600 * 1e3;
      renderTickets(true);
      play("ticket-gain");
      buzz("ticket-gain");
      if (state.screen === "empty") {
        setScreen("ready");
        board.resetBall();
      }
    }, 900);
  }
  function showRules(tab = "chances") {
    const tabs = [["how", "How to play"], ["chances", "Chances"], ["rules", "Rules"]];
    const steps = [["ticket", "Get tickets", "They come as you play any game: 1 ticket for every 50K GC played. You also get 1 free ticket every day."], ["chest", "Pick your risk", "Risk changes the size of the prizes, not the chances."], ["free-spins", "Tap Drop", "One ticket, one ball. Every drop wins a prize."]];
    const vib = haptics.supported ? `<button class="setting-row" type="button" data-set="haptics">${icon(state.haptics ? "vibration-on" : "vibration-off")}<span>Vibration</span><span class="toggle" role="switch" aria-checked="${state.haptics}" aria-label="Vibration"><span class="toggle__track"><span class="toggle__knob"></span></span></span></button>` : "";
    openLayer(`<div class="drawer anim-sheet-enter" role="dialog" aria-modal="true" aria-labelledby="d-title">
    <span class="drawer__grab" aria-hidden="true"></span>
    <div class="drawer__head"><h2 class="drawer__title" id="d-title">Rules and odds</h2><button class="icon-button" type="button" data-act="close" aria-label="Close">${icon("close")}</button></div>
    <div class="tab-bar" role="tablist" aria-label="Rules and odds"><span class="tab-bar__thumb" aria-hidden="true"></span>${tabs.map(([id, l]) => `<button class="tab" role="tab" type="button" id="tab-${id}" aria-controls="panel-${id}" data-tab="${id}">${l}</button>`).join("")}</div>
    <div class="drawer__body">
      <div class="drawer__panel" role="tabpanel" id="panel-how" aria-labelledby="tab-how">
        <div class="steps">${steps.map(([ic, t, d2]) => `<div class="list-row"><span class="list-row__disc">${icon(ic, "sm")}</span><span><span class="list-row__title">${t}</span><span class="list-row__desc">${d2}</span></span></div>`).join("")}</div>
        <button class="button button--neutral button--md button--block" type="button" data-act="welcome"><span class="button__label" style="text-transform:none">Show the welcome screen again</span></button>
      </div>
      <div class="drawer__panel" role="tabpanel" id="panel-chances" aria-labelledby="tab-chances">
        <div class="pill-group" role="radiogroup" aria-label="Risk level">${RISK_ORDER.map((r) => `<button class="pill" type="button" role="radio" data-pill="${r}">${RISK[r].label}</button>`).join("")}</div>
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
        <button class="setting-row" type="button" data-set="sound">${icon(state.sound ? "sound-on" : "sound-off")}<span>Sound</span><span class="toggle" role="switch" aria-checked="${state.sound}" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></span></button>
        ${vib}
      </div>
    </div>
  </div>`, "bottom", "low");
    play("ui-open");
    const d = layer.querySelector(".drawer");
    const selectTab = (id, user) => {
      tabs.forEach(([t], i) => {
        const on = t === id;
        const b = d.querySelector("#tab-" + t);
        b.setAttribute("aria-selected", on);
        b.tabIndex = on ? 0 : -1;
        d.querySelector("#panel-" + t).hidden = !on;
        if (on) d.querySelector(".tab-bar").style.setProperty("--i", i);
      });
      if (user) {
        play("ui-tab");
        buzz("selection");
      }
    };
    const odds = (risk, user) => {
      d.querySelectorAll(".pill").forEach((p) => p.setAttribute("aria-checked", p.dataset.pill === risk));
      d.querySelector(".odds tbody").innerHTML = oddsTable(risk).map((o) => {
        const b = o.bin, chip = b.edge ? icon(b.icon, "sm") : b.gc ? `<span class="bin-content bin-content--gc">${icon("coin", "xs")}${b.amount}</span>` : b.amount;
        const short = (l) => ({ "Free Spins": "FS", "Gold Coins": "GC" })[l] || l.toLowerCase();
        const contents = b.edge && b.contents.length > 1 ? `<small>${b.contents.map((c) => c.amount + " " + short(c.label)).join(" + ")}</small>` : "";
        return `<tr><td><span class="odds__chip" data-heat="${b.heat}">${chip}</span></td><td><b>${b.label}</b>${contents}<small>${o.bins}</small></td><td class="num"><b>${fmtPct(o.chance)}</b><small>1 in ${o.oneIn}</small></td></tr>`;
      }).join("");
      d.querySelector(".info-note").innerHTML = `Chances are the same at every level. Only the prizes change. Average per drop: <b>about ${Math.round(expectedValue(risk) * BASE_PRIZE.amount)} FS</b> (2K GC value).`;
      if (user) {
        play("ui-tab");
        buzz("selection");
      }
    };
    selectTab(tab);
    odds(state.risk);
    d.querySelector(".tab-bar").addEventListener("click", (e) => {
      const b = e.target.closest(".tab");
      if (b) selectTab(b.dataset.tab, true);
    });
    d.querySelector(".tab-bar").addEventListener("keydown", (e) => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!k) return;
      const cur = tabs.findIndex(([t]) => d.querySelector("#tab-" + t).getAttribute("aria-selected") === "true");
      const n = tabs[(cur + k + 3) % 3][0];
      selectTab(n, true);
      d.querySelector("#tab-" + n).focus();
    });
    d.querySelector(".pill-group").addEventListener("click", (e) => {
      const b = e.target.closest(".pill");
      if (b) odds(b.dataset.pill, true);
    });
    d.querySelector('[data-act="close"]').addEventListener("click", async () => {
      play("ui-close");
      buzz("tap");
      await closeLayer();
      state.screen === "empty" || $("#btn-rules").focusKb();
    });
    d.querySelector('[data-act="welcome"]').addEventListener("click", async () => {
      play("ui-tap");
      await closeLayer();
      showWelcome();
    });
    d.querySelectorAll("[data-set]").forEach((row) => row.addEventListener("click", () => {
      const key = row.dataset.set;
      state[key] = !state[key];
      store.set(key, state[key]);
      row.querySelector(".toggle").setAttribute("aria-checked", state[key]);
      if (key === "sound") {
        sound.setMuted(!state.sound);
        syncSoundButton();
        row.querySelector(".icon").outerHTML = icon(state.sound ? "sound-on" : "sound-off");
      } else {
        haptics.enabled = state.haptics;
        row.querySelector(".icon").outerHTML = icon(state.haptics ? "vibration-on" : "vibration-off");
      }
      play("ui-toggle", { on: state[key] });
      buzz("selection");
    }));
  }
  function syncSoundButton() {
    const b = $("#btn-sound");
    b.setAttribute("aria-pressed", state.sound);
    b.innerHTML = icon(state.sound ? "sound-on" : "sound-off");
    b.setAttribute("aria-label", state.sound ? "Sound on" : "Sound off");
  }
  $("#demo-open").addEventListener("click", () => {
    if ($("#game").hidden) openGame();
  });
  $("#btn-close").addEventListener("click", () => closeGame());
  $("#btn-lobby").addEventListener("click", () => closeGame());
  $("#btn-play-games").addEventListener("click", () => {
    play("ui-tap");
    closeGame();
  });
  $("#btn-drop").addEventListener("click", startDrop);
  $("#winnings-tab").addEventListener("click", () => {
    if (state.screen === "ready" || state.screen === "empty") showSummary("view");
  });
  $("#btn-rules").addEventListener("click", () => {
    play("ui-tap");
    buzz("tap");
    showRules("chances");
  });
  $("#btn-sound").addEventListener("click", () => {
    state.sound = !state.sound;
    store.set("sound", state.sound);
    sound.setMuted(!state.sound);
    syncSoundButton();
    if (state.sound) play("ui-toggle", { on: true });
    buzz("selection");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || $("#game").hidden) return;
    const act = $('#takeover-root [data-act="close"]') || layer.querySelector('[data-act="close"]') || layer.querySelector('[data-act="start"]') || layer.querySelector('[data-act="keep"]');
    if (act) act.click();
    else if (state.screen !== "dropping") closeGame();
  });
  syncSoundButton();
  setRisk("low");
  renderTickets();
  $("#demo-toggle").addEventListener("click", () => {
    const p = $("#demo-panel");
    p.hidden = !p.hidden;
    $("#demo-toggle").setAttribute("aria-expanded", !p.hidden);
  });
  $("#demo-panel").addEventListener("click", (e) => {
    if (!e.target.closest("button")) return;
    $("#demo-panel").hidden = true;
    $("#demo-toggle").setAttribute("aria-expanded", "false");
    if (document.activeElement && $("#demo-panel").contains(document.activeElement) && $("#game").hidden) $("#demo-toggle").focus();
  });
  $("#demo-force").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state.force = b.dataset.force;
    $("#demo-force").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    debug("force " + (state.force || "random"));
  });
  $("#demo-tickets").addEventListener("click", () => {
    state.tickets += 5;
    renderTickets(true);
    if (state.screen === "empty") {
      setScreen("ready");
      board.resetBall();
    }
  });
  $("#demo-zero").addEventListener("click", () => {
    if (state.screen === "dropping") return;
    state.tickets = 0;
    renderTickets();
    if (state.screen !== "closed") setScreen("empty");
  });
  $("#demo-free").addEventListener("click", () => {
    if (state.screen === "empty") freeTicketReady();
    else {
      state.tickets += 1;
      renderTickets(true);
      play("ticket-gain");
    }
  });
  $("#demo-motion").addEventListener("click", (e) => {
    state.reduced = !state.reduced;
    board.reduced = state.reduced;
    document.documentElement.dataset.motion = state.reduced ? "reduced" : "";
    e.currentTarget.setAttribute("aria-pressed", state.reduced);
  });
  $("#demo-debug").addEventListener("click", (e) => {
    debugEl.hidden = !debugEl.hidden;
    e.currentTarget.setAttribute("aria-pressed", !debugEl.hidden);
  });
  $("#demo-reset").addEventListener("click", () => {
    store.set("seenWelcome", false);
    state.seenWelcome = false;
    state.tickets = 5;
    state.dropped = false;
    state.risk = "low";
    setRisk("low");
    renderTickets();
    state.won = [];
    $("#winnings-tab").hidden = true;
    if (!$("#game").hidden) closeGame(true);
    setTimeout(openGame, 400);
  });
  board.reduced = state.reduced;
  if (state.reduced) document.documentElement.dataset.motion = "reduced";
  window.__plinko = { state, open: openGame, drop: startDrop };
  var firstGesture = () => {
    if (!state.openSoundPending) return;
    sound.unlock().then(() => {
      if (!state.openSoundPending || !sound.isRunning()) return;
      state.openSoundPending = false;
      if (!$("#game").hidden) play("popup-open");
    });
  };
  ["pointerdown", "touchend", "click", "keydown"].forEach((t) => document.addEventListener(t, firstGesture, { capture: true, passive: true }));
  if (!params.has("closed")) openGame(true);
})();
