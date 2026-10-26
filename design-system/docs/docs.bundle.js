(() => {
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
  function decideOutcome(risk, random, force = null) {
    const bins = binsFor(risk);
    if (typeof force === "number") return bins[force];
    if (force) {
      const pool = bins.filter((b) => b.tier === force);
      if (pool.length) return pool[Math.floor(random() * pool.length)];
    }
    let x = random();
    for (const b of bins) {
      if ((x -= b.chance) < 0) return b;
    }
    return bins[4];
  }
  var fmtPct = (p) => String(parseFloat((p * 100).toFixed(2))) + "%";

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
  function geometry(W, H, opts = {}) {
    const pad = 6, binH = 40;
    const s = (W - 2 * pad) / 9;
    const cx = W / 2;
    const binTop = H - pad - binH;
    const lastGapBase = Number.isFinite(opts.lastGapBase) ? opts.lastGapBase : PHYSICS.pegRadius + 2 * PHYSICS.ballRadius + 6;
    const lastGap = lastGapBase * s / PHYSICS.baseSpacing;
    const row7 = binTop - lastGap;
    const ballRest = 12 + PHYSICS.ballRadius * s / PHYSICS.baseSpacing - 6;
    const topReserve = Number.isFinite(opts.topClearBase) ? ballRest + (PHYSICS.ballRadius + PHYSICS.pegRadius + opts.topClearBase) * s / PHYSICS.baseSpacing : 34;
    const rowGap = Math.min(s * PHYSICS.baseRowGap / PHYSICS.baseSpacing, (row7 - topReserve) / 7);
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
  function planPath(k, random) {
    const dirs = Array.from({ length: ROWS }, (_, i) => i < k ? 1 : -1);
    for (let i = dirs.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
    }
    return dirs;
  }
  var lerp = (a, b, t) => a + (b - a) * t;
  function buildDrop(geo, k, random) {
    const g = PHYSICS.gravity * geo.scale;
    const R = PHYSICS.pegRadius + PHYSICS.ballRadius;
    const dirs = planPath(k, random);
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
      const c = lerp(...PHYSICS.contactOffset, random()) * geo.scale * dirs[r];
      const cy = peg.y - Math.sqrt(R * R * geo.scale * geo.scale - c * c);
      const e = r === 0 ? 0 : lerp(...PHYSICS.restitution, random());
      fly(peg.x + c, cy, r === 0 ? 0 : -e * Math.abs(vy), "row");
      events.push({ t, type: "peg", row: r, j, dir: dirs[r] });
      if (r === ROWS - PHYSICS.slowMoRows - 1) events.push({ t, type: "last-rows" });
      offset += dirs[r] * geo.s / 2;
    }
    const restY = geo.binTop - PHYSICS.ballRadius * geo.scale + 6 * geo.scale;
    const bx = geo.binCenters[k];
    fly(bx, restY, -lerp(...PHYSICS.restitution, random()) * Math.abs(vy), "bin");
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
    function play(id, opts = {}) {
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
      play,
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
  var HAPTICS_NOTE = "Vibration works on Android browsers (Chrome, Firefox, Samsung Internet). iOS Safari does not support the Vibration API, so iPhone players get sound and animation only.";
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
    function play(id) {
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
      play
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
    const css = getComputedStyle(document.documentElement);
    const colours = COLOURS.map((v) => css.getPropertyValue(v).trim() || "#fdd04a");
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

  // design-system/js/motion.js
  var MOTION_PRINCIPLES = [
    ["Feedback first", "Every tap answers within 100 ms: press scale, a click sound and a light vibration."],
    ["Celebration scales with the win", "Small wins get a toast and the game keeps going. Big wins get a sheet and a coin burst. Only a mega win stops the game with a takeover and confetti."],
    ["Anticipation is real, not fake", "Slow motion and glowing bins start on the last 2 rows for every drop. Only bins the ball can still reach glow. We never fake a near miss."],
    ["Idle is calm", "Loops (bulb twinkle, button pulse, float) are slow and soft. Fast motion is saved for the drop."],
    ["Reduced motion is a full mode", "With prefers-reduced-motion, durations get short, overshoot goes away, loops stop and particles hide. The game still makes sense and the result is the same."]
  ];
  var DURATIONS = [
    ["--duration-short-1", 50],
    ["--duration-short-2", 100],
    ["--duration-short-3", 150],
    ["--duration-short-4", 200],
    ["--duration-medium-1", 250],
    ["--duration-medium-2", 300],
    ["--duration-medium-3", 350],
    ["--duration-medium-4", 400],
    ["--duration-long-1", 450],
    ["--duration-long-2", 500],
    ["--duration-long-3", 550],
    ["--duration-long-4", 600],
    ["--duration-extra-long-2", 800]
  ];
  var EASINGS = [
    ["--easing-linear", [0, 0, 1, 1], "Spinner, rays: constant speed"],
    ["--easing-standard", [0.2, 0, 0, 1], "Most state changes: colour, fade, toggle"],
    ["--easing-standard-decelerate", [0, 0, 0, 1], "Things that come to rest: peg flash"],
    ["--easing-standard-accelerate", [0.3, 0, 1, 1], "Things that leave: modal exit"],
    ["--easing-emphasized-decelerate", [0.05, 0.7, 0.1, 1], "Big entrances: sheet, toast"],
    ["--easing-emphasized-accelerate", [0.3, 0, 0.8, 0.15], "Big exits: sheet exit"],
    ["--easing-overshoot", [0.34, 1.56, 0.64, 1], "Playful arrivals: selector thumb, bins, modal. Reduced: becomes standard"]
  ];
  var INTERACTIONS = [
    ["press", "--motion-press-duration", "--motion-press-easing", "100 ms, standard", "50 ms"],
    ["hover", "--motion-hover-duration", "--motion-hover-easing", "150 ms, standard", "same"],
    ["fade", "--motion-fade-duration", "--motion-fade-easing", "150 ms, standard", "same"],
    ["selector", "--motion-selector-duration", "--motion-selector-easing", "300 ms, overshoot", "150 ms, standard"],
    ["bins-reshuffle", "--motion-bins-reshuffle-duration", "--motion-bins-reshuffle-easing", "400 ms, overshoot", "150 ms, standard"],
    ["toast", "--motion-toast-duration", "--motion-toast-easing", "250 ms, emphasized decelerate", "150 ms, standard"],
    ["sheet-enter", "--motion-sheet-enter-duration", "--motion-sheet-enter-easing", "400 ms, emphasized decelerate", "150 ms fade"],
    ["sheet-exit", "--motion-sheet-exit-duration", "--motion-sheet-exit-easing", "200 ms, emphasized accelerate", "150 ms fade"],
    ["modal-enter", "--motion-modal-enter-duration", "--motion-modal-enter-easing", "500 ms, overshoot", "150 ms fade"],
    ["modal-exit", "--motion-modal-exit-duration", "--motion-modal-exit-easing", "200 ms, standard accelerate", "150 ms fade"],
    ["peg-hit", "--motion-peg-hit-duration", "--motion-peg-hit-easing", "300 ms, decelerate", "150 ms"],
    ["spinner", "--motion-spinner-duration", "--motion-spinner-easing", "800 ms per turn, linear, loop", "no turn, opacity pulse"],
    ["pulse", "--motion-pulse-duration", "--motion-pulse-easing", "1.6 s loop, ease in-out", "off"],
    ["float", "--motion-float-duration", "--motion-float-easing", "2.8 s loop, ease in-out", "off (0 ms)"],
    ["bulb-twinkle", "--motion-bulb-twinkle-duration", "--motion-bulb-twinkle-easing", "3.2 s loop", "off"],
    ["bulb-chase", "--motion-bulb-chase-duration", "steps(1)", "200 ms per step, 4 steps", "off"],
    ["bins-reel", "--motion-bins-reel-duration (+ --motion-bins-reel-stagger-duration per bin from centre)", "--motion-bins-reel-easing", "800 ms + 90 ms per step, fast start, slow stop, small overshoot", "no spin, 150 ms"],
    ["win-buildup", "--motion-win-buildup-duration", "--easing-standard", "800 ms (mega: gold frame, bulbs flare)", "150 ms, no flare"],
    ["win-buildup-big", "--motion-win-buildup-big-duration", "--easing-standard", "500 ms (big: bulbs flare)", "150 ms, no flare"],
    ["toast-float", "--motion-toast-float-duration", "--motion-pulse-easing per keyframe", "1.8 s: pop in, rise 96 px with one slow sway, fade", "1.6 s fade, no movement"]
  ];
  var MOTION = [
    // Controls
    {
      id: "button-press",
      group: "Controls",
      name: "Button press",
      component: "plinko/button, plinko/icon-button",
      trigger: "Pointer down on an enabled button",
      spec: [["transform", "scale(1)", "scale(0.97); icon button 0.92", "--motion-press-duration", "--motion-press-easing", "none"], ["background", "CTA/Default", "CTA/Pressed", "--motion-hover-duration", "--motion-hover-easing", "none"]],
      reduced: "Same, 50 ms.",
      sync: "Sound ui-tap, haptic tap (10 ms).",
      code: `.button { transition: transform var(--motion-press-duration) var(--motion-press-easing); }
.button:active { transform: scale(0.97); }`,
      demo: "button"
    },
    {
      id: "button-pulse",
      group: "Controls",
      name: "Drop button pulse",
      component: "plinko/button, Pulse=true",
      trigger: "Ready state: Drop invites a tap. Stops on press and during the drop.",
      spec: [["box-shadow", "none", "Glow/Primary pulse 0 4 16 + 4 px ring", "--motion-pulse-duration (1.6 s)", "--motion-pulse-easing", "infinite, 50 % peak"]],
      reduced: "Off. The button keeps its colour, no glow.",
      sync: "None.",
      code: `.button.is-pulse { animation: plk-pulse-glow var(--motion-pulse-duration) var(--motion-pulse-easing) infinite; }`,
      demo: "pulse"
    },
    {
      id: "spinner",
      group: "Controls",
      name: "Spinner",
      component: "plinko/spinner",
      trigger: "Button Loading (Drop during the drop)",
      spec: [["transform", "rotate(0)", "rotate(360deg)", "--motion-spinner-duration (0.8 s)", "linear", "infinite"]],
      reduced: "No rotation; the arc pulses opacity.",
      sync: "None.",
      code: `.spinner { animation: plk-spin var(--motion-spinner-duration) linear infinite; }`,
      demo: "spinner"
    },
    {
      id: "risk-thumb",
      group: "Controls",
      name: "Risk selector thumb",
      component: "plinko/risk-selector",
      trigger: "A risk segment is selected (tap or arrow keys)",
      spec: [["transform (thumb)", "translateX(old)", "translateX(i x (100% + 4px))", "--motion-selector-duration (0.3 s)", "--motion-selector-easing (overshoot)", "none"], ["label colour", "muted", "white", "--motion-fade-duration", "--motion-fade-easing", "none"], ["chart bar fill", "grey", "heat colour", "--motion-selector-duration", "--easing-standard", "20 ms per bar from the centre out"], ["caption opacity", "1", "0, swap text, 1", "--motion-fade-duration", "--motion-fade-easing", "150 ms swap"]],
      reduced: "150 ms, no overshoot.",
      sync: "Sound risk-change (pitch follows the level), haptic selection (8 ms).",
      code: `.risk-selector__thumb { transform: translateX(calc(var(--i) * (100% + var(--spacing-2xs))));
  transition: transform var(--motion-selector-duration) var(--motion-selector-easing); }`,
      demo: "risk"
    },
    {
      id: "bins-reshuffle",
      group: "Controls",
      name: "Bins reel (slot spin)",
      component: "plinko/bin-row",
      trigger: "Risk level changes. Every bin spins like a slot reel and stops on the new prize. The chance strip does not move.",
      spec: [["strip transform", "translateY(0)", "translateY(-(n + 1) x bin height)", "--motion-bins-reel-duration (0.8 s) + distance from centre x --motion-bins-reel-stagger-duration (90 ms)", "--motion-bins-reel-easing (fast start, long slow-down, small overshoot)", "n = 7 + 2 x distance from centre prizes pass by"], ["strip blur", "0", "1.2 px at 20 %, 0.6 px at 70 %, then 0", "same", "same", "motion blur while it spins fast"], ["bin colour (heat)", "old heat", "new heat", "at 60 % of the spin", "-", "the colour lands with the prize"], ["bin transform on stop", "scale(1)", "scale(1.14) then 1", "--motion-bins-reshuffle-duration (0.4 s)", "--motion-bins-reshuffle-easing (overshoot)", "once per bin"]],
      reduced: "No spin: values and colours change at once.",
      sync: "Sound bins-shuffle at the start, a coin-tick as each reel stops (pitch rises to the edges), haptic selection.",
      code: `const a = strip.animate([{ transform: 'translateY(0)' }, { transform: \`translateY(\${-(n + 1) * h}px)\` }],
  { duration: reel + d * stagger, easing: reelEasing, fill: 'forwards' });  // board.js setBins()`,
      demo: "bins"
    },
    {
      id: "toggle",
      group: "Controls",
      name: "Toggle and checkbox",
      component: "plinko/toggle, plinko/checkbox",
      trigger: "Tap or Space",
      spec: [["knob transform", "translateX(0)", "translateX(20px)", "--duration-short-4 (200 ms)", "--easing-standard", "none"], ["knob width (pressed)", "20 px", "24 px", "--motion-press-duration", "--motion-press-easing", "while pressed"], ["check mark scale", "0", "1", "--duration-short-4", "--easing-overshoot", "none"]],
      reduced: "Same timing, no overshoot.",
      sync: "Sound ui-toggle (higher pitch for On), haptic selection.",
      code: `.toggle__knob { transition: transform var(--duration-short-4) var(--easing-standard); }`,
      demo: "toggle"
    },
    {
      id: "tab-thumb",
      group: "Controls",
      name: "Tab bar thumb",
      component: "plinko/tab-bar",
      trigger: "Tab selected in Rules and odds",
      spec: [["thumb transform", "translateX(old)", "translateX(new)", "--motion-selector-duration", "--motion-selector-easing", "none"]],
      reduced: "150 ms, no overshoot.",
      sync: "Sound ui-tab, haptic selection.",
      code: `.tab-bar__thumb { transition: transform var(--motion-selector-duration) var(--motion-selector-easing); }`,
      demo: "tabs"
    },
    // Board
    {
      id: "bulbs-idle",
      group: "Board",
      name: "Bulbs: idle twinkle",
      component: "plinko/frame, State=Idle",
      trigger: "Ready state",
      spec: [["opacity (each bulb)", "1", "0.45 and back", "--motion-bulb-twinkle-duration (3.2 s)", "--motion-bulb-twinkle-easing", "infinite; odd bulbs start half a cycle later, so neighbours swap"]],
      reduced: "Off: bulbs stay on.",
      sync: "Sound ambient loop (very low).",
      code: `.frame .bulb { animation: plk-twinkle var(--motion-bulb-twinkle-duration) var(--motion-bulb-twinkle-easing) infinite;
  animation-delay: calc(var(--odd) * var(--motion-bulb-twinkle-duration) / -2); }`,
      demo: "frame-idle"
    },
    {
      id: "bulbs-chase",
      group: "Board",
      name: "Bulbs: running lights",
      component: "plinko/frame, State=Active",
      trigger: "From Drop until the ball lands",
      spec: [["opacity + brightness", "dim 0.35", "lit 1, brightness 1.4", "--motion-bulb-chase-duration (0.2 s) per step", "steps(1)", "4-step cycle; bulb n lights at step n mod 4"]],
      reduced: "Off.",
      sync: "Starts with ball-release.",
      code: `.frame.is-active .bulb { animation: plk-chase calc(var(--motion-bulb-chase-duration) * 4) steps(1, end) infinite;
  animation-delay: calc(var(--n) * var(--motion-bulb-chase-duration) * -1); }`,
      demo: "frame-active"
    },
    {
      id: "ball-drop",
      group: "Board",
      name: "Ball drop (physics)",
      component: "plinko/ball, plinko/peg",
      trigger: "Drop. The result is decided before this starts.",
      spec: [["position", "under the chute", "decided bin", "about 2.6 s: 1.2 s for rows 1 to 6, 1.3 s in slow motion (from physics, not a token)", "gravity 3000 px/s2, restitution 0.28 to 0.42", "see Physics"], ["peg colour + glow", "Plinko/peg/idle", "Plinko/peg/hit then back", "--motion-peg-hit-duration (0.3 s)", "--motion-peg-hit-easing", "on every contact"], ["trail", "-", "last 8 positions, alpha 0 to 0.35", "per frame", "-", "off with reduced motion"]],
      reduced: "Same path and result. No trail, no slow motion.",
      sync: "ball-release sound + haptic 15 ms; peg-hit pluck per contact, pitch rises row by row; haptic 5 ms on the last 2 rows only.",
      code: `const drop = buildDrop(geometry(w, h), bin.index, random);  // physics.js
requestAnimationFrame(function step(now) { t += dt * timeScaleAt(drop, t); draw(sample(drop, t)); \u2026 });`,
      demo: "drop"
    },
    {
      id: "slow-motion",
      group: "Board",
      name: "Last rows: slow motion and anticipation",
      component: "plinko/board, plinko/bin State=Anticipation",
      trigger: "Ball touches row 6 (2 rows left)",
      spec: [["time scale", "1", "0.5", "80 ms ramp", "linear", "until landing"], ["bin glow (reachable bins only)", "none", "Glow/Bin anticipation", "--motion-fade-duration", "--motion-fade-easing", "only the 3 bins the ball can still reach"], ["bin lift + brightness", "translateY(0), 1", "translateY(-3px), 1.25", "--duration-long-2 (500 ms)", "--motion-pulse-easing", "infinite, alternate, until landing"]],
      reduced: "No slow motion, no lift. Glow only.",
      sync: "Sound riser starts, cut on landing.",
      code: `if (event.type === 'last-rows') reachable.forEach((b) => b.classList.add('is-anticipation'));`,
      demo: "drop"
    },
    {
      id: "bin-hit",
      group: "Board",
      name: "Bin hit and landed ball",
      component: "plinko/bin State=Hit, plinko/ball State=Landed, plinko/chance-bar State=Hit",
      trigger: "Ball lands",
      spec: [["bin transform", "translateY(0)", "translateY(3px)", "--motion-bins-reshuffle-duration", "overshoot", "none"], ["bin glow", "Glow/Bin hit", "stronger and back", "--motion-pulse-duration", "--motion-pulse-easing", "infinite until next drop"], ["ball glow", "18 px", "26 px and back", "1.6 s", "cosine", "infinite"], ["chance bar", "white 8 %", "white 24 %", "--motion-fade-duration", "standard", "none"]],
      reduced: "Hit look without the pulse.",
      sync: "Sound bin-land (brighter chime for hotter bins), haptic bin-land 30 ms.",
      code: `.bin.is-hit { transform: translateY(3px); animation: plk-bin-hit var(--motion-pulse-duration) var(--motion-pulse-easing) infinite; }`,
      demo: "bin-hit"
    },
    {
      id: "ticket-gain",
      group: "Board",
      name: "Ticket gained",
      component: "plinko/ticket-tab State=Gained",
      trigger: "A ticket arrives (free daily ticket)",
      spec: [['"+1" opacity, transform', "0, translateY(6px) scale(0.6)", "1, scale(1.15) then rise and fade", "600 ms", "--easing-emphasized-decelerate", "none"]],
      reduced: "+1 fades only.",
      sync: "Sound ticket-gain, haptic 15 ms.",
      code: `.ticket-tab.is-gained .ticket-tab__gain { animation: plk-gain 600ms var(--easing-emphasized-decelerate) both; }`,
      demo: "ticket"
    },
    // Results
    {
      id: "toast",
      group: "Results",
      name: "Small win toast",
      component: "plinko/toast",
      trigger: "Small win (below 2x). The game does not stop.",
      spec: [["pop in: opacity, scale", "0, scale(0.8)", "1, scale(1.06) then 1", "first 20 % of --motion-toast-float-duration", "--easing-standard-decelerate", "none"], ["rise: translateY", "-100 %", "-100 % - 96 px", "--motion-toast-float-duration (1.8 s)", "--easing-standard-decelerate", "none"], ["sway: translate, rotate", "-5 px, -2deg", "+5 px, +2deg", "half of --motion-toast-float-duration per side", "--motion-pulse-easing (a smooth sine)", "alternate, a second animation"], ["fade", "1", "0", "from 55 % to 100 %", "same", "none"], ["coin puff (5 coins)", "bin", "arc up and fall", "about 1.3 s", "same as the coin burst", "once"]],
      reduced: "Fades in, stays, fades out (1.6 s). No movement, no coins.",
      sync: "Sound win-small, haptic 20 ms. The prize flies into the winnings tab after 700 ms. The ball goes back to the chute after 1.5 s.",
      code: `.toast { animation: plk-toast-float var(--motion-toast-float-duration) var(--easing-standard-decelerate) both,
  plk-toast-sway calc(var(--motion-toast-float-duration) / 2) var(--motion-pulse-easing) infinite alternate; }`,
      demo: "toast"
    },
    {
      id: "buildup-big",
      group: "Results",
      name: "Build-up before a big win",
      component: "plinko/frame State=Flare",
      trigger: "Big win: after the ball lands, before the win sheet",
      spec: [["bulbs transform, brightness", "scale(1), 1", "scale(1.45), 1.9 then scale(1.2), 1.5", "--motion-win-buildup-big-duration (0.5 s)", "--easing-standard", "once, holds until the sheet closes"], ["bulb glow", "Glow/Bulb pink, Glow/Bulb gold", "Glow/Bulb pink flare, Glow/Bulb gold flare", "same", "same", "none"], ["running dark gap (opacity)", "all lit", "every 4th bulb at 0.2 in turn", "--motion-bulb-chase-duration / 2 (0.1 s) per step", "steps(1)", "infinite until the card closes: the drop chase inverted, twice as fast"]],
      reduced: "Bulbs brighten without scaling; 150 ms.",
      sync: "Then the win sheet: sound win-big, haptic 30-60-30.",
      code: `await board.buildUp('big');   // adds .frame.is-flare, resolves after --motion-win-buildup-big-duration`,
      demo: "flare"
    },
    {
      id: "buildup-mega",
      group: "Results",
      name: "Build-up before a mega win",
      component: "plinko/frame State=Celebrate",
      trigger: "Mega win: after the ball lands, before the takeover",
      spec: [["frame and board outline", "Plinko/frame/neon", "Plinko/bulb/gold-core", "--motion-win-buildup-duration (0.8 s)", "--easing-standard", "none"], ["frame glow", "Glow/Frame", "Glow/Frame gold", "same", "same", "none"], ["every bulb", "pink and gold", "gold, scale(1.45), brightness 1.9, then scale(1.2)", "same", "same", "Glow/Bulb gold flare"], ["running dark gap (opacity)", "all lit", "every 4th bulb at 0.2 in turn", "--motion-bulb-chase-duration / 2 (0.1 s) per step", "steps(1)", "infinite until the takeover closes"]],
      reduced: "The frame turns gold without the bulb flare; 150 ms.",
      sync: "Haptic bin-land at the start; then the takeover: sound win-mega, haptic 40-60-40-60-120.",
      code: `await board.buildUp('mega');  // adds .frame.is-celebrate, resolves after --motion-win-buildup-duration`,
      demo: "celebrate"
    },
    {
      id: "sheet",
      group: "Results",
      name: "Big win sheet",
      component: "plinko/win-sheet",
      trigger: "Big win (2x or more, inner bin)",
      spec: [["transform", "translateY(100%)", "translateY(0)", "--motion-sheet-enter-duration (400 ms)", "--motion-sheet-enter-easing", "none"], ["scrim opacity", "0", "1", "--motion-fade-duration", "--motion-fade-easing", "none"], ["exit transform", "0", "translateY(100%)", "--motion-sheet-exit-duration (200 ms)", "--motion-sheet-exit-easing", "none"]],
      reduced: "Fades, 150 ms.",
      sync: "Sound win-big (ambient ducks 2 s), haptic 30-60-30; reward-collect at 0.9 s.",
      code: `.anim-sheet-enter { animation: plk-sheet-enter var(--motion-sheet-enter-duration) var(--motion-sheet-enter-easing) both; }`,
      demo: "sheet"
    },
    {
      id: "count-up",
      group: "Results",
      name: "Amount count-up",
      component: "win sheet amount",
      trigger: "Win sheet opens",
      spec: [["number", "0", "prize amount", "700 ms", "ease-out cubic: 1 - (1 - k)^3", "12 ticks"]],
      reduced: "Final number at once.",
      sync: "Sound coin-tick per step (pitch rises).",
      code: `const v = Math.round(to * (1 - Math.pow(1 - k, 3)));`,
      demo: "count"
    },
    {
      id: "modal",
      group: "Results",
      name: "Modal enter and exit",
      component: "plinko/popup, welcome card, win takeover",
      trigger: "Popup open, welcome card, mega win",
      spec: [["opacity, transform", "0, scale(0.7)", "1, scale(1)", "--motion-modal-enter-duration (500 ms)", "--motion-modal-enter-easing (overshoot)", "none"], ["exit", "1, scale(1)", "0, scale(0.92)", "--motion-modal-exit-duration (200 ms)", "--motion-modal-exit-easing", "none"], ["reward tiles", "0, scale(0.7)", "1, scale(1)", "modal-enter", "overshoot", "150 ms apart"]],
      reduced: "Fades, 150 ms.",
      sync: "Popup: sound popup-open. Card: ui-open. Mega: win-mega (ambient ducks 4 s), haptic 40-60-40-60-120.",
      code: `.anim-modal-enter { animation: plk-modal-enter var(--motion-modal-enter-duration) var(--motion-modal-enter-easing) both; }`,
      demo: "modal"
    },
    {
      id: "rays",
      group: "Results",
      name: "Reward rays and float",
      component: "plinko/reward-art Rays=On",
      trigger: "Big and mega wins",
      spec: [["rays transform", "rotate(0)", "rotate(30deg)", "2.8 s", "linear", "infinite; 12 rays, so 30 deg is a seamless loop"], ["icon transform", "translateY(0)", "translateY(-6%)", "--motion-float-duration (2.8 s)", "--motion-float-easing", "infinite, in step with the rays"]],
      reduced: "Rays stand still, icon does not float.",
      sync: "None.",
      code: `.reward-art__rays { animation: plk-rays 2.8s linear infinite; }
.reward-art .reward-icon { animation: plk-float var(--motion-float-duration) var(--motion-float-easing) infinite; }`,
      demo: "rays"
    },
    {
      id: "fx",
      group: "Results",
      name: "Coin burst and confetti",
      component: "plinko/fx",
      trigger: "Big win: coins. Mega win: coins and confetti. Plays once.",
      spec: [["coins (18; 5 for a small win)", "reward centre", "arc out and fall", "1.2 to 1.64 s", "x = x0 + vx t; y = y0 + vy t + 1400 t^2 / 2", "12 ms apart; fade over the last 30 %"], ["confetti (40)", "above the screen", "fall and sway", "2.2 to 2.8 s", "vy 220 to 420 px/s; sway 12 to 30 px; 3D flip cos(spin t)", "-"]],
      reduced: "Hidden.",
      sync: "Starts with win-big or win-mega.",
      code: `const fx = createFx(canvas); fx.play('mega', x, y);  // fx.js`,
      demo: "fx"
    },
    {
      id: "winnings",
      group: "Results",
      name: "Prize flies into the winnings pool",
      component: "plinko/winnings-tab",
      trigger: "After every win: small wins after the toast (700 ms), big and mega wins when the card closes",
      spec: [["tab (first win)", "hidden", "opacity 1, scale 1", "--motion-modal-enter-duration", "--motion-modal-enter-easing (overshoot)", "once"], ['"+N" opacity, transform', "0, translateY(6px) scale(0.6)", "1, scale(1.15), then rise and fade", "900 ms", "--easing-emphasized-decelerate", "none"], ["total text", "old total", "new total", "instant", "-", "aria-live polite"]],
      reduced: "+N fades only.",
      sync: "Sound reward-collect (big and mega).",
      code: `.winnings-tab.is-gained .ticket-tab__gain { animation: plk-gain 900ms var(--easing-emphasized-decelerate) both; }`,
      demo: "winnings"
    },
    {
      id: "summary",
      group: "Results",
      name: "Session summary",
      component: "plinko/session-summary",
      trigger: "Close or Back to lobby with prizes in the pool; tap on the winnings tab",
      spec: [["summary transform", "translateY(100%)", "0", "--motion-sheet-enter-duration", "--motion-sheet-enter-easing", "none"]],
      reduced: "Fades.",
      sync: "Sound ui-open. Back to lobby closes the game with ui-close.",
      code: `.anim-sheet-enter { animation: plk-sheet-enter var(--motion-sheet-enter-duration) var(--motion-sheet-enter-easing) both; }`,
      demo: "summary"
    },
    {
      id: "drawer",
      group: "Results",
      name: "Drawer",
      component: "plinko/drawer",
      trigger: "Rules and odds",
      spec: [["transform", "translateY(100%)", "0", "--motion-sheet-enter-duration", "--motion-sheet-enter-easing", "none"], ["exit", "0", "translateY(100%)", "--motion-sheet-exit-duration", "--motion-sheet-exit-easing", "none"]],
      reduced: "Fades.",
      sync: "Sound ui-open and ui-close.",
      code: `.anim-sheet-enter \u2026  .anim-sheet-exit \u2026`,
      demo: "sheet"
    },
    {
      id: "timer",
      group: "Results",
      name: "Free ticket timer",
      component: "plinko/timer",
      trigger: "No tickets state",
      spec: [["ring stroke-dashoffset", "time left / 24 h", "next second", "1 s", "linear", "every second"], ["Ready", "Counting", "full ring, gold outline, then +1 on the ticket tab", "900 ms", "-", "-"]],
      reduced: "Same (no movement beyond the ring).",
      sync: "Sound timer-ready then ticket-gain.",
      code: `ring.style.strokeDashoffset = C * (left / total);`,
      demo: "timer"
    }
  ];
  var CHOREOGRAPHY = [
    { t: 0, visual: "Drop pressed: button scales 0.97, then Loading. Selector disabled. Bulbs start running.", sound: "ui-tap", haptic: "ball-release 15 ms" },
    { t: 0.02, visual: "Chute lights up, ball leaves it.", sound: "ball-release", haptic: "" },
    { t: 0.13, visual: "Row 1 contact: peg flashes gold.", sound: "peg-hit (row 1, lowest pitch)", haptic: "" },
    { t: 0.33, visual: "Rows 2 to 6 (one every 0.22 s): arc, bounce, trail bends after each bounce.", sound: "peg-hit, pitch rises each row", haptic: "" },
    { t: 1.22, visual: "Row 6 contact: slow motion (0.5x). Reachable bins glow.", sound: "riser starts", haptic: "" },
    { t: 1.62, visual: "Rows 7 (1.62 s) and 8 (2.05 s) in slow motion.", sound: "peg-hit (rows 7, 8)", haptic: "5 ms per contact" },
    { t: 2.52, visual: "Ball lands, 2 small settle hops. Bin drops 3 px, glows, chance bar lights. Bulbs back to twinkle.", sound: "riser cut, bin-land (+ chime by heat)", haptic: "bin-land 30 ms" },
    { t: 2.62, visual: "Small: toast pops in, floats up with a soft sway and fades. Big: bulbs flare for 0.5 s, then the sheet slides up, coins burst, amount counts up. Mega: the frame turns gold and every bulb flares for 0.8 s, then the takeover, rays, confetti, tiles one by one.", sound: "win-small | win-big | win-mega (ambient ducks)", haptic: "20 | 30-60-30 | 40-60-40-60-120" },
    { t: 3.5, visual: "Prize added to My Rewards. Drop again is ready.", sound: "reward-collect (big)", haptic: "" }
  ];

  // design-system/css/tokens.css
  var tokens_default = '/* Plinko design tokens. Generated by scripts/build-tokens.py from the Figma variables.\n   Do not edit by hand: change the variable in Figma, export, build.\n   File: https://www.figma.com/design/EXcHZLG3O0BS12H0wqYm7i */\n\n/* Primitives */\n:root, :host {\n  --neutral-50: #f5f5f5;\n  --neutral-100: #e3e3e3;\n  --neutral-200: #cccccc;\n  --neutral-300: #acacac;\n  --neutral-400: #808080;\n  --neutral-500: #5e5e5e;\n  --neutral-600: #464646;\n  --neutral-700: #2b2b2b;\n  --neutral-800: #161616;\n  --neutral-900: #080808;\n  --neutral-950: #030303;\n  --slate-50: #f3f5f8;\n  --slate-100: #e4e8ef;\n  --slate-200: #cbd2dd;\n  --slate-300: #a8b2c2;\n  --slate-400: #7b889b;\n  --slate-500: #5a6678;\n  --slate-600: #38404c;\n  --slate-700: #272e39;\n  --slate-800: #242931;\n  --slate-900: #12161d;\n  --slate-950: #01030c;\n  --magenta-50: #fff1f1;\n  --red-50: #fef2ef;\n  --red-100: #fee3de;\n  --red-200: #ffcfc6;\n  --red-300: #ffb1a3;\n  --red-400: #ff826e;\n  --red-500: #fb543e;\n  --red-600: #e11a00;\n  --red-700: #be1400;\n  --red-800: #980e00;\n  --red-900: #7c0f04;\n  --red-950: #460b05;\n  --orange-50: #fcf3ed;\n  --gold-50: #fbf5e6;\n  --gold-100: #fcedc7;\n  --gold-200: #fae19b;\n  --gold-300: #fdd04a;\n  --gold-400: #d6a900;\n  --gold-500: #b18c00;\n  --gold-600: #917200;\n  --gold-700: #7a6000;\n  --gold-800: #614c00;\n  --gold-900: #503e04;\n  --gold-950: #2e2200;\n  --orange-100: #fae7db;\n  --orange-200: #fad6be;\n  --orange-300: #fabc92;\n  --orange-400: #ffa766;\n  --orange-500: #e47e27;\n  --orange-600: #c06300;\n  --orange-700: #a25100;\n  --orange-800: #7f3f03;\n  --orange-900: #602d01;\n  --orange-950: #3c1800;\n  --green-50: #eef9ef;\n  --green-100: #dcf4df;\n  --green-200: #c0efc6;\n  --green-300: #93e8a1;\n  --green-400: #3ddc6a;\n  --green-500: #1fb04d;\n  --green-600: #00963d;\n  --green-700: #007e32;\n  --green-800: #006326;\n  --green-900: #0d4a1e;\n  --green-950: #002d0d;\n  --magenta-100: #ffe0e0;\n  --magenta-200: #ffc9ca;\n  --magenta-300: #ffa5a8;\n  --magenta-400: #ff6977;\n  --magenta-500: #fa114f;\n  --magenta-600: #d1003f;\n  --magenta-700: #a80031;\n  --magenta-800: #7d0221;\n  --magenta-900: #520e15;\n  --magenta-950: #1a090d;\n  --blue-50: #f0f5fe;\n  --blue-100: #dee9fb;\n  --blue-200: #c4dafc;\n  --blue-300: #9dc2fd;\n  --blue-400: #69a0fa;\n  --blue-500: #3b82f6;\n  --blue-600: #0b65e6;\n  --blue-700: #0054c8;\n  --blue-800: #0043a2;\n  --blue-900: #0b3981;\n  --blue-950: #09224b;\n  --purple-50: #f9f2fc;\n  --purple-100: #ecd8ec;\n  --purple-200: #d8b7e1;\n  --purple-300: #cf8ee5;\n  --purple-400: #c45dde;\n  --purple-500: #b03bcf;\n  --purple-600: #9a00bb;\n  --purple-700: #8400a1;\n  --purple-800: #6c0084;\n  --purple-900: #49045a;\n  --purple-950: #2c0235;\n  --white: #ffffff;\n  --black: #000000;\n  --white-alpha-8: color-mix(in srgb, var(--neutral-50) 8%, transparent);\n  --black-alpha-8: color-mix(in srgb, var(--neutral-950) 8%, transparent);\n  --white-alpha-16: color-mix(in srgb, var(--neutral-50) 16%, transparent);\n  --black-alpha-16: color-mix(in srgb, var(--neutral-950) 16%, transparent);\n  --white-alpha-24: color-mix(in srgb, var(--neutral-50) 24%, transparent);\n  --black-alpha-24: color-mix(in srgb, var(--neutral-950) 24%, transparent);\n  --white-alpha-32: color-mix(in srgb, var(--neutral-50) 32%, transparent);\n  --black-alpha-32: color-mix(in srgb, var(--neutral-950) 32%, transparent);\n  --white-alpha-40: color-mix(in srgb, var(--neutral-50) 40%, transparent);\n  --black-alpha-40: color-mix(in srgb, var(--neutral-950) 40%, transparent);\n  --white-alpha-48: color-mix(in srgb, var(--neutral-50) 48%, transparent);\n  --black-alpha-48: color-mix(in srgb, var(--neutral-950) 48%, transparent);\n  --white-alpha-56: color-mix(in srgb, var(--neutral-50) 56%, transparent);\n  --black-alpha-56: color-mix(in srgb, var(--neutral-950) 56%, transparent);\n  --white-alpha-64: color-mix(in srgb, var(--neutral-50) 64%, transparent);\n  --black-alpha-64: color-mix(in srgb, var(--neutral-950) 64%, transparent);\n  --white-alpha-72: color-mix(in srgb, var(--neutral-50) 72%, transparent);\n  --black-alpha-72: color-mix(in srgb, var(--neutral-950) 72%, transparent);\n  --white-alpha-80: color-mix(in srgb, var(--neutral-50) 80%, transparent);\n  --black-alpha-80: color-mix(in srgb, var(--neutral-950) 80%, transparent);\n  --white-alpha-88: color-mix(in srgb, var(--neutral-50) 88%, transparent);\n  --black-alpha-88: color-mix(in srgb, var(--neutral-950) 88%, transparent);\n  --white-alpha-96: color-mix(in srgb, var(--neutral-50) 96%, transparent);\n  --black-alpha-96: color-mix(in srgb, var(--neutral-950) 96%, transparent);\n  --utilities-spacing-1: 4px;\n  --utilities-spacing-2: 8px;\n  --utilities-spacing-3: 12px;\n  --utilities-spacing-4: 16px;\n  --utilities-spacing-5: 20px;\n  --utilities-spacing-6: 24px;\n  --utilities-spacing-7: 28px;\n  --utilities-spacing-8: 32px;\n  --utilities-spacing-9: 36px;\n  --utilities-spacing-10: 40px;\n  --utilities-spacing-11: 44px;\n  --utilities-spacing-12: 48px;\n  --utilities-spacing-13: 52px;\n  --utilities-spacing-14: 56px;\n  --utilities-spacing-15: 60px;\n  --utilities-spacing-16: 64px;\n  --utilities-spacing-17: 68px;\n  --utilities-spacing-18: 72px;\n  --utilities-spacing-19: 76px;\n  --utilities-spacing-20: 80px;\n  --utilities-spacing-21: 84px;\n  --utilities-spacing-22: 88px;\n  --utilities-spacing-23: 92px;\n  --utilities-spacing-24: 96px;\n  --utilities-spacing-25: 100px;\n  --utilities-spacing-26: 104px;\n  --utilities-spacing-27: 108px;\n  --utilities-spacing-28: 112px;\n  --utilities-spacing-29: 116px;\n  --utilities-spacing-30: 120px;\n  --utilities-spacing-31: 124px;\n  --utilities-spacing-32: 128px;\n  --utilities-spacing-33: 132px;\n  --utilities-spacing-34: 136px;\n  --utilities-spacing-35: 140px;\n  --utilities-spacing-36: 144px;\n  --utilities-spacing-37: 148px;\n  --utilities-spacing-38: 152px;\n  --utilities-spacing-39: 156px;\n  --utilities-spacing-40: 160px;\n  --utilities-spacing-41: 164px;\n  --utilities-spacing-42: 168px;\n  --utilities-spacing-43: 172px;\n  --utilities-spacing-44: 176px;\n  --utilities-spacing-45: 180px;\n  --utilities-spacing-46: 184px;\n  --utilities-spacing-47: 188px;\n  --utilities-spacing-48: 192px;\n  --utilities-spacing-49: 196px;\n  --utilities-spacing-50: 200px;\n  --utilities-radius-1: 4px;\n  --utilities-radius-2: 8px;\n  --utilities-radius-3: 12px;\n  --utilities-radius-4: 16px;\n  --utilities-radius-5: 20px;\n  --utilities-radius-6: 24px;\n  --utilities-radius-7: 28px;\n  --utilities-radius-8: 32px;\n  --utilities-radius-9: 36px;\n  --utilities-radius-10: 40px;\n  --utilities-breakpoint-mobile: 360px;\n  --utilities-breakpoint-desktop: 1024px;\n  --typography-font-body: "Ubuntu";\n  --typography-font-headline: "Ubuntu";\n  --typography-weight-light: 300;\n  --typography-weight-regular: 400;\n  --typography-weight-medium: 500;\n  --typography-weight-bold: 700;\n  --typography-size-1: 9px;\n  --typography-size-2: 10px;\n  --typography-size-3: 12px;\n  --typography-size-4: 13px;\n  --typography-size-5: 14px;\n  --typography-size-6: 16px;\n  --typography-size-7: 18px;\n  --typography-size-8: 20px;\n  --typography-size-9: 24px;\n  --typography-size-10: 32px;\n  --typography-size-11: 40px;\n  --typography-size-12: 48px;\n  --typography-size-13: 56px;\n  --typography-size-display-1: 20px;\n  --typography-size-display-2: 26px;\n  --typography-size-display-3: 36px;\n  --typography-size-display-4: 40px;\n  --typography-size-display-5: 48px;\n  --typography-size-display-6: 64px;\n  --typography-size-display-7: 90px;\n  --magenta-alpha-8: color-mix(in srgb, var(--magenta-500) 8%, transparent);\n  --magenta-alpha-16: color-mix(in srgb, var(--magenta-500) 16%, transparent);\n  --magenta-alpha-24: color-mix(in srgb, var(--magenta-500) 24%, transparent);\n  --magenta-alpha-32: color-mix(in srgb, var(--magenta-500) 32%, transparent);\n  --magenta-alpha-40: color-mix(in srgb, var(--magenta-500) 40%, transparent);\n  --magenta-alpha-48: color-mix(in srgb, var(--magenta-500) 48%, transparent);\n  --magenta-alpha-56: color-mix(in srgb, var(--magenta-500) 56%, transparent);\n  --magenta-alpha-64: color-mix(in srgb, var(--magenta-500) 64%, transparent);\n  --magenta-alpha-72: color-mix(in srgb, var(--magenta-500) 72%, transparent);\n  --magenta-alpha-80: color-mix(in srgb, var(--magenta-500) 80%, transparent);\n  --magenta-alpha-88: color-mix(in srgb, var(--magenta-500) 88%, transparent);\n  --magenta-alpha-96: color-mix(in srgb, var(--magenta-500) 96%, transparent);\n  --gold-alpha-8: color-mix(in srgb, var(--gold-300) 8%, transparent);\n  --gold-alpha-16: color-mix(in srgb, var(--gold-300) 16%, transparent);\n  --gold-alpha-24: color-mix(in srgb, var(--gold-300) 24%, transparent);\n  --gold-alpha-32: color-mix(in srgb, var(--gold-300) 32%, transparent);\n  --gold-alpha-40: color-mix(in srgb, var(--gold-300) 40%, transparent);\n  --gold-alpha-48: color-mix(in srgb, var(--gold-300) 48%, transparent);\n  --gold-alpha-56: color-mix(in srgb, var(--gold-300) 56%, transparent);\n  --gold-alpha-64: color-mix(in srgb, var(--gold-300) 64%, transparent);\n  --gold-alpha-72: color-mix(in srgb, var(--gold-300) 72%, transparent);\n  --gold-alpha-80: color-mix(in srgb, var(--gold-300) 80%, transparent);\n  --gold-alpha-88: color-mix(in srgb, var(--gold-300) 88%, transparent);\n  --gold-alpha-96: color-mix(in srgb, var(--gold-300) 96%, transparent);\n  --transparent: rgb(255 255 255 / 0);\n}\n\n/* Typography */\n:root, :host {\n  --font-headline: var(--typography-font-headline);\n  --font-body: var(--typography-font-body);\n  --font-button: var(--typography-font-body);\n  --weight-light-300: var(--typography-weight-light);\n  --weight-regular-400: var(--typography-weight-regular);\n  --weight-medium-500: var(--typography-weight-medium);\n  --weight-bold-700: var(--typography-weight-bold);\n}\n\n/* Tokens (Mobile, default) */\n:root, :host {\n  --layout-breakpoint: var(--utilities-breakpoint-mobile);\n  --spacing-2xs: var(--utilities-spacing-1);\n  --spacing-xs: var(--utilities-spacing-2);\n  --spacing-sm: var(--utilities-spacing-3);\n  --spacing-md: var(--utilities-spacing-4);\n  --spacing-lg: var(--utilities-spacing-6);\n  --spacing-xl: var(--utilities-spacing-7);\n  --spacing-2xl: var(--utilities-spacing-8);\n  --radius-xs: var(--utilities-radius-1);\n  --radius-sm: var(--utilities-radius-2);\n  --radius-md: var(--utilities-radius-3);\n  --radius-lg: var(--utilities-radius-4);\n  --radius-round: var(--utilities-radius-10);\n  --font-size-h1: var(--typography-size-10);\n  --font-size-h2: var(--typography-size-9);\n  --font-size-h3: var(--typography-size-8);\n  --font-size-h4: var(--typography-size-7);\n  --font-size-h5: var(--typography-size-6);\n  --font-size-large: var(--typography-size-5);\n  --font-size-paragraph: var(--typography-size-4);\n  --font-size-medium: var(--typography-size-3);\n  --font-size-small: var(--typography-size-2);\n  --font-size-minimum: var(--typography-size-1);\n  --font-size-d1: var(--typography-size-display-4);\n  --font-size-d2: var(--typography-size-display-2);\n  --font-size-d3: var(--typography-size-display-1);\n  --button-font-size-lg: 16px;\n  --button-font-size-md: 13px;\n  --button-font-size-sm: 12px;\n  --button-default-horizontal-padding-lg: 20px;\n  --button-default-horizontal-padding-md: 16px;\n  --button-default-horizontal-padding-sm: 12px;\n  --button-default-vertical-padding-lg: 16px;\n  --button-default-vertical-padding-md: 14px;\n  --button-default-vertical-padding-sm: 12px;\n  --button-default-gap-lg: 6px;\n  --button-default-gap-md: 6px;\n  --button-default-gap-sm: 4px;\n  --button-text-horizontal-padding-lg: 24px;\n  --button-text-horizontal-padding-md: 20px;\n  --button-text-horizontal-padding-sm: 16px;\n  --button-text-vertical-padding-lg: 16px;\n  --button-text-vertical-padding-md: 14px;\n  --button-text-vertical-padding-sm: 12px;\n  --button-icon-horizontal-padding-lg: 16px;\n  --button-icon-horizontal-padding-md: 14px;\n  --button-icon-horizontal-padding-sm: 12px;\n  --button-icon-vertical-padding-lg: 16px;\n  --button-icon-vertical-padding-md: 14px;\n  --button-icon-vertical-padding-sm: 12px;\n  --icon-size-xs: var(--utilities-spacing-4);\n  --icon-size-sm: var(--utilities-spacing-5);\n  --icon-size-md: var(--utilities-spacing-6);\n  --icon-size-lg: var(--utilities-spacing-8);\n  --icon-size-xl: var(--utilities-spacing-12);\n  --blur-low: 8px;\n  --blur-medium: 16px;\n  --blur-high: 32px;\n  --icon-button-size-md: var(--utilities-spacing-11);\n  --icon-button-size-lg: var(--utilities-spacing-14);\n  --layout-tap-target: var(--utilities-spacing-11);\n}\n\n/* Semantic */\n:root, :host {\n  --surface-default: var(--neutral-800);\n  --surface-container-lowest: var(--neutral-900);\n  --surface-container-default: var(--neutral-700);\n  --surface-inverse: var(--white);\n  --on-surface-default: var(--white);\n  --on-surface-subtle: var(--neutral-200);\n  --on-surface-muted: var(--neutral-300);\n  --on-surface-disabled: var(--neutral-500);\n  --on-surface-accent: var(--gold-300);\n  --on-surface-emphasis: var(--magenta-400);\n  --on-surface-inverse: var(--black);\n  --outline-default: var(--neutral-600);\n  --outline-variant: var(--neutral-700);\n  --outline-accent: var(--gold-300);\n  --outline-emphasis: var(--magenta-500);\n  --elevation-shadow: var(--black);\n  --scrim-low: var(--black-alpha-32);\n  --scrim-medium: var(--black-alpha-64);\n  --scrim-high: var(--black-alpha-72);\n  --action-primary-default: var(--magenta-500);\n  --action-primary-hover: var(--magenta-700);\n  --action-primary-pressed: var(--magenta-800);\n  --action-primary-disabled: var(--magenta-900);\n  --action-neutral-default: var(--neutral-700);\n  --action-neutral-hover: var(--neutral-600);\n  --action-neutral-pressed: var(--neutral-500);\n  --action-neutral-disabled: var(--neutral-800);\n  --feedback-success-default: var(--green-400);\n  --interaction-focus-default: var(--white);\n  --background-default: var(--black);\n  --state-on-surface-default-08: var(--white-alpha-8);\n  --state-on-surface-default-16: var(--white-alpha-16);\n  --state-on-surface-default-32: var(--white-alpha-32);\n  --state-on-surface-accent-48: var(--gold-alpha-48);\n  --state-outline-default-16: var(--white-alpha-16);\n  --state-action-primary-24: var(--magenta-alpha-24);\n  --state-action-primary-32: var(--magenta-alpha-32);\n  --state-action-primary-48: var(--magenta-alpha-48);\n  --state-on-surface-default-24: var(--white-alpha-24);\n}\n\n/* Components */\n:root, :host {\n  --buttons-primary-default: var(--action-primary-default);\n  --buttons-primary-hover: var(--action-primary-hover);\n  --buttons-primary-pressed: var(--action-primary-pressed);\n  --buttons-primary-disabled: var(--action-primary-disabled);\n  --buttons-on-primary: var(--on-surface-default);\n  --buttons-on-primary-disabled: var(--on-surface-disabled);\n  --buttons-primary-glow: var(--state-action-primary-48);\n  --buttons-neutral-default: var(--action-neutral-default);\n  --buttons-neutral-hover: var(--action-neutral-hover);\n  --buttons-neutral-pressed: var(--action-neutral-pressed);\n  --buttons-neutral-disabled: var(--action-neutral-disabled);\n  --buttons-on-neutral: var(--on-surface-default);\n  --buttons-on-neutral-disabled: var(--on-surface-disabled);\n  --buttons-ghost-default: var(--transparent);\n  --buttons-ghost-hover: var(--state-on-surface-default-08);\n  --buttons-ghost-pressed: var(--state-on-surface-default-16);\n  --buttons-ghost-disabled: var(--transparent);\n  --buttons-ghost-on-default: var(--on-surface-default);\n  --buttons-ghost-on-disabled: var(--on-surface-disabled);\n  --buttons-focus-ring: var(--interaction-focus-default);\n  --links-default: var(--on-surface-default);\n  --links-hover: var(--on-surface-subtle);\n  --links-pressed: var(--on-surface-muted);\n  --links-disabled: var(--on-surface-disabled);\n  --segments-track: var(--surface-container-lowest);\n  --segments-selected-default: var(--surface-container-default);\n  --segments-selected-hover: var(--action-neutral-hover);\n  --segments-selected-disabled: var(--action-neutral-disabled);\n  --segments-selected-outline: var(--outline-emphasis);\n  --segments-on-selected-default: var(--on-surface-default);\n  --segments-on-selected-disabled: var(--on-surface-disabled);\n  --segments-unselected-default: var(--transparent);\n  --segments-unselected-hover: var(--state-on-surface-default-08);\n  --segments-on-unselected-default: var(--on-surface-muted);\n  --segments-on-unselected-hover: var(--on-surface-subtle);\n  --segments-on-unselected-disabled: var(--on-surface-disabled);\n  --segments-chart-unselected: var(--on-surface-disabled);\n  --pills-selected: var(--surface-inverse);\n  --pills-on-selected: var(--on-surface-inverse);\n  --pills-default: var(--surface-container-default);\n  --pills-hover: var(--action-neutral-hover);\n  --pills-on-default: var(--on-surface-default);\n  --selection-controls-primary-default: var(--action-primary-default);\n  --selection-controls-primary-hover: var(--action-primary-hover);\n  --selection-controls-primary-disabled: var(--action-primary-disabled);\n  --selection-controls-primary-off: var(--surface-container-default);\n  --selection-controls-primary-off-hover: var(--action-neutral-hover);\n  --selection-controls-on-primary: var(--on-surface-default);\n  --selection-controls-on-primary-disabled: var(--on-surface-disabled);\n  --selection-controls-outline-off: var(--outline-default);\n  --icon-default: var(--on-surface-default);\n  --icon-subtle: var(--on-surface-subtle);\n  --icon-muted: var(--on-surface-muted);\n  --icon-disabled: var(--on-surface-disabled);\n  --icon-accent: var(--on-surface-accent);\n  --icon-emphasis: var(--on-surface-emphasis);\n  --icon-inverse: var(--on-surface-inverse);\n  --plinko-popup-surface: var(--surface-default);\n  --plinko-popup-scrim: var(--scrim-high);\n  --plinko-prize-strip-surface: var(--surface-container-default);\n  --plinko-prize-strip-on-surface: var(--on-surface-default);\n  --plinko-prize-strip-prize: var(--on-surface-accent);\n  --plinko-ticket-tab-surface: var(--magenta-900);\n  --plinko-ticket-tab-outline: var(--magenta-400);\n  --plinko-ticket-tab-on-surface: var(--on-surface-default);\n  --plinko-ticket-tab-icon: var(--on-surface-accent);\n  --plinko-ticket-tab-empty-surface: var(--surface-container-default);\n  --plinko-ticket-tab-on-empty: var(--on-surface-muted);\n  --plinko-ticket-tab-icon-empty: var(--on-surface-disabled);\n  --plinko-frame-body-top: var(--magenta-900);\n  --plinko-frame-body-bottom: var(--magenta-950);\n  --plinko-frame-neon: var(--magenta-400);\n  --plinko-frame-glow: var(--state-action-primary-32);\n  --plinko-frame-board-top: var(--purple-950);\n  --plinko-frame-board-bottom: var(--background-default);\n  --plinko-frame-chute: var(--background-default);\n  --plinko-bulb-pink-core: var(--magenta-100);\n  --plinko-bulb-pink-glow: var(--magenta-400);\n  --plinko-bulb-gold-core: var(--gold-100);\n  --plinko-bulb-gold-glow: var(--gold-300);\n  --plinko-peg-idle: var(--on-surface-subtle);\n  --plinko-peg-hit: var(--on-surface-accent);\n  --plinko-peg-hit-glow: var(--state-on-surface-accent-48);\n  --plinko-ball-fill: var(--gold-300);\n  --plinko-ball-glow: var(--state-on-surface-accent-48);\n  --plinko-chance-bar: var(--state-on-surface-default-08);\n  --plinko-chance-bar-hit: var(--state-on-surface-default-24);\n  --plinko-bin-cold-bg: var(--slate-600);\n  --plinko-bin-cold-on: var(--slate-100);\n  --plinko-bin-cold-outline: var(--state-on-surface-default-16);\n  --plinko-bin-cool-bg: var(--slate-500);\n  --plinko-bin-cool-on: var(--white);\n  --plinko-bin-mild-bg: var(--gold-300);\n  --plinko-bin-mild-on: var(--gold-950);\n  --plinko-bin-warm-bg: var(--orange-400);\n  --plinko-bin-warm-on: var(--orange-950);\n  --plinko-bin-hot-bg: var(--red-500);\n  --plinko-bin-hot-on: var(--red-950);\n  --plinko-bin-mega-bg: var(--magenta-500);\n  --plinko-bin-mega-on: var(--white);\n  --plinko-bin-mega-glow: var(--state-action-primary-48);\n  --plinko-bin-hit-outline: var(--on-surface-default);\n  --plinko-bin-hit-glow: var(--state-on-surface-default-32);\n  --plinko-reward-disc: var(--gold-300);\n  --plinko-reward-on-disc: var(--gold-800);\n  --plinko-reward-ring: var(--state-on-surface-accent-48);\n  --plinko-reward-amount: var(--on-surface-accent);\n  --plinko-toast-surface: var(--surface-inverse);\n  --plinko-toast-on-surface: var(--on-surface-inverse);\n  --plinko-toast-prize: var(--magenta-700);\n  --plinko-takeover-top: var(--magenta-900);\n  --plinko-takeover-bottom: var(--background-default);\n  --plinko-timer-surface: var(--surface-container-default);\n  --plinko-timer-outline: var(--outline-default);\n  --plinko-timer-digits: var(--on-surface-default);\n  --plinko-timer-label: var(--on-surface-subtle);\n  --plinko-timer-icon: var(--on-surface-accent);\n  --plinko-list-row-surface: var(--surface-container-lowest);\n  --plinko-list-row-outline: var(--outline-variant);\n  --plinko-list-row-icon-disc: var(--surface-container-default);\n  --plinko-drawer-grabber: var(--outline-default);\n  --plinko-drawer-divider: var(--state-outline-default-16);\n  --plinko-error-disc: var(--surface-container-default);\n  --plinko-error-icon: var(--on-surface-muted);\n  --icon-sparkle-magenta: var(--magenta-500);\n  --icon-sparkle-gold: var(--gold-300);\n  --icon-sparkle-green: var(--green-600);\n  --spinner-track: var(--state-on-surface-default-24);\n  --spinner-indicator: var(--icon-default);\n  --buttons-sublabel: var(--on-surface-default);\n  --plinko-risk-chart-cold: var(--slate-400);\n  --plinko-risk-chart-cool: var(--slate-300);\n  --plinko-peg-idle-glow: var(--white-alpha-48);\n  --plinko-bulb-off: var(--neutral-600);\n  --plinko-bin-text-highlight: var(--white-alpha-64);\n  --plinko-bin-text-shade: var(--elevation-shadow);\n  --plinko-prize-strip-gift: var(--feedback-success-default);\n  --plinko-ticket-tab-low-outline: var(--orange-400);\n  --plinko-ticket-tab-on-low: var(--orange-300);\n}\n\n/* Motion (Default) */\n:root, :host {\n  --duration-short-1: 50ms;\n  --duration-short-2: 100ms;\n  --duration-short-3: 150ms;\n  --duration-short-4: 200ms;\n  --duration-medium-1: 250ms;\n  --duration-medium-2: 300ms;\n  --duration-medium-3: 350ms;\n  --duration-medium-4: 400ms;\n  --duration-long-1: 450ms;\n  --duration-long-2: 500ms;\n  --duration-long-3: 550ms;\n  --duration-long-4: 600ms;\n  --easing-linear: linear;\n  --easing-standard: cubic-bezier(0.2, 0, 0, 1);\n  --easing-standard-decelerate: cubic-bezier(0, 0, 0, 1);\n  --easing-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);\n  --easing-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);\n  --easing-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);\n  --easing-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);\n  --motion-press-duration: var(--duration-short-2);\n  --motion-press-easing: var(--easing-standard);\n  --motion-hover-duration: var(--duration-short-3);\n  --motion-hover-easing: var(--easing-standard);\n  --motion-fade-duration: var(--duration-short-3);\n  --motion-fade-easing: var(--easing-standard);\n  --motion-selector-duration: var(--duration-medium-2);\n  --motion-selector-easing: var(--easing-overshoot);\n  --motion-bins-reshuffle-duration: var(--duration-medium-4);\n  --motion-bins-reshuffle-easing: var(--easing-overshoot);\n  --motion-toast-duration: var(--duration-medium-1);\n  --motion-toast-easing: var(--easing-emphasized-decelerate);\n  --motion-sheet-enter-duration: var(--duration-medium-4);\n  --motion-sheet-enter-easing: var(--easing-emphasized-decelerate);\n  --motion-sheet-exit-duration: var(--duration-short-4);\n  --motion-sheet-exit-easing: var(--easing-emphasized-accelerate);\n  --motion-modal-enter-duration: var(--duration-long-2);\n  --motion-modal-enter-easing: var(--easing-overshoot);\n  --motion-modal-exit-duration: var(--duration-short-4);\n  --motion-modal-exit-easing: var(--easing-standard-accelerate);\n  --duration-extra-long-2: 800ms;\n  --motion-spinner-duration: var(--duration-extra-long-2);\n  --motion-spinner-easing: var(--easing-linear);\n  --motion-pulse-duration: 1600ms;\n  --motion-pulse-easing: cubic-bezier(0.4, 0, 0.6, 1);\n  --motion-peg-hit-duration: var(--duration-medium-2);\n  --motion-peg-hit-easing: var(--easing-standard-decelerate);\n  --motion-float-duration: 2800ms;\n  --motion-float-easing: cubic-bezier(0.4, 0, 0.6, 1);\n  --motion-bulb-twinkle-duration: 3200ms;\n  --motion-bulb-twinkle-easing: var(--motion-pulse-easing);\n  --motion-bulb-chase-duration: var(--duration-short-4);\n  --motion-bins-reel-duration: var(--duration-extra-long-2);\n  --motion-bins-reel-stagger-duration: 90ms;\n  --motion-bins-reel-easing: cubic-bezier(0.3, 0.1, 0.2, 1.06);\n  --motion-win-buildup-duration: var(--duration-extra-long-2);\n  --motion-win-buildup-big-duration: var(--duration-long-2);\n  --motion-toast-float-duration: 1800ms;\n}\n\n/* Tokens (Desktop): starts at --utilities-breakpoint-desktop (1024px) */\n@media (min-width: 1024px) {\n  :root, :host {\n    --layout-breakpoint: var(--utilities-breakpoint-desktop);\n    --spacing-2xs: var(--utilities-spacing-2);\n    --spacing-xs: var(--utilities-spacing-4);\n    --spacing-sm: var(--utilities-spacing-5);\n    --spacing-md: var(--utilities-spacing-6);\n    --spacing-lg: var(--utilities-spacing-8);\n    --spacing-xl: var(--utilities-spacing-10);\n    --spacing-2xl: var(--utilities-spacing-12);\n    --radius-md: var(--utilities-radius-4);\n    --radius-lg: var(--utilities-radius-6);\n    --font-size-h1: var(--typography-size-13);\n    --font-size-h2: var(--typography-size-12);\n    --font-size-h3: var(--typography-size-10);\n    --font-size-h4: var(--typography-size-9);\n    --font-size-h5: var(--typography-size-8);\n    --font-size-large: var(--typography-size-7);\n    --font-size-paragraph: var(--typography-size-6);\n    --font-size-medium: var(--typography-size-5);\n    --font-size-small: var(--typography-size-3);\n    --font-size-d1: var(--typography-size-display-7);\n    --font-size-d2: var(--typography-size-display-6);\n    --font-size-d3: var(--typography-size-display-4);\n    --button-font-size-lg: 20px;\n    --button-font-size-md: 16px;\n    --button-default-horizontal-padding-lg: 24px;\n    --button-default-horizontal-padding-md: 22px;\n    --button-default-vertical-padding-lg: 20px;\n    --button-default-vertical-padding-md: 18px;\n    --button-text-horizontal-padding-lg: 32px;\n    --button-text-horizontal-padding-md: 28px;\n    --button-text-horizontal-padding-sm: 20px;\n    --button-text-vertical-padding-lg: 20px;\n    --button-text-vertical-padding-md: 18px;\n    --button-text-vertical-padding-sm: 10px;\n    --button-icon-horizontal-padding-lg: 20px;\n    --button-icon-horizontal-padding-md: 18px;\n    --button-icon-vertical-padding-lg: 20px;\n    --button-icon-vertical-padding-md: 18px;\n}\n}\n\n/* Tokens (Mobile) on demand: the game popup is a mobile layout at every width, so it pins this mode */\n[data-token-mode="mobile"] {\n  --layout-breakpoint: var(--utilities-breakpoint-mobile);\n  --spacing-2xs: var(--utilities-spacing-1);\n  --spacing-xs: var(--utilities-spacing-2);\n  --spacing-sm: var(--utilities-spacing-3);\n  --spacing-md: var(--utilities-spacing-4);\n  --spacing-lg: var(--utilities-spacing-6);\n  --spacing-xl: var(--utilities-spacing-7);\n  --spacing-2xl: var(--utilities-spacing-8);\n  --radius-md: var(--utilities-radius-3);\n  --radius-lg: var(--utilities-radius-4);\n  --font-size-h1: var(--typography-size-10);\n  --font-size-h2: var(--typography-size-9);\n  --font-size-h3: var(--typography-size-8);\n  --font-size-h4: var(--typography-size-7);\n  --font-size-h5: var(--typography-size-6);\n  --font-size-large: var(--typography-size-5);\n  --font-size-paragraph: var(--typography-size-4);\n  --font-size-medium: var(--typography-size-3);\n  --font-size-small: var(--typography-size-2);\n  --font-size-d1: var(--typography-size-display-4);\n  --font-size-d2: var(--typography-size-display-2);\n  --font-size-d3: var(--typography-size-display-1);\n  --button-font-size-lg: 16px;\n  --button-font-size-md: 13px;\n  --button-default-horizontal-padding-lg: 20px;\n  --button-default-horizontal-padding-md: 16px;\n  --button-default-vertical-padding-lg: 16px;\n  --button-default-vertical-padding-md: 14px;\n  --button-text-horizontal-padding-lg: 24px;\n  --button-text-horizontal-padding-md: 20px;\n  --button-text-horizontal-padding-sm: 16px;\n  --button-text-vertical-padding-lg: 16px;\n  --button-text-vertical-padding-md: 14px;\n  --button-text-vertical-padding-sm: 12px;\n  --button-icon-horizontal-padding-lg: 16px;\n  --button-icon-horizontal-padding-md: 14px;\n  --button-icon-vertical-padding-lg: 16px;\n  --button-icon-vertical-padding-md: 14px;\n}\n\n/* Motion (Reduced): short fades, loops off */\n@media (prefers-reduced-motion: reduce) {\n  :root, :host {\n    --easing-overshoot: var(--easing-standard);\n    --motion-press-duration: var(--duration-short-1);\n    --motion-selector-duration: var(--duration-short-3);\n    --motion-selector-easing: var(--easing-standard);\n    --motion-bins-reshuffle-duration: var(--duration-short-3);\n    --motion-bins-reshuffle-easing: var(--easing-standard);\n    --motion-toast-duration: var(--duration-short-3);\n    --motion-toast-easing: var(--easing-standard);\n    --motion-sheet-enter-duration: var(--duration-short-3);\n    --motion-sheet-enter-easing: var(--easing-standard);\n    --motion-sheet-exit-duration: var(--duration-short-3);\n    --motion-sheet-exit-easing: var(--easing-standard);\n    --motion-modal-enter-duration: var(--duration-short-3);\n    --motion-modal-enter-easing: var(--easing-standard);\n    --motion-modal-exit-duration: var(--duration-short-3);\n    --motion-modal-exit-easing: var(--easing-standard);\n    --motion-peg-hit-duration: var(--duration-short-3);\n    --motion-float-duration: 0ms;\n    --motion-bins-reel-duration: var(--duration-short-3);\n    --motion-bins-reel-stagger-duration: 0ms;\n    --motion-bins-reel-easing: var(--easing-standard);\n    --motion-win-buildup-duration: var(--duration-short-3);\n    --motion-win-buildup-big-duration: var(--duration-short-3);\n    --motion-toast-float-duration: 1600ms;\n}\n}\n\n/* Manual override for docs and tests: <html data-motion="reduced"> */\n[data-motion="reduced"] {\n  --easing-overshoot: var(--easing-standard);\n  --motion-press-duration: var(--duration-short-1);\n  --motion-selector-duration: var(--duration-short-3);\n  --motion-selector-easing: var(--easing-standard);\n  --motion-bins-reshuffle-duration: var(--duration-short-3);\n  --motion-bins-reshuffle-easing: var(--easing-standard);\n  --motion-toast-duration: var(--duration-short-3);\n  --motion-toast-easing: var(--easing-standard);\n  --motion-sheet-enter-duration: var(--duration-short-3);\n  --motion-sheet-enter-easing: var(--easing-standard);\n  --motion-sheet-exit-duration: var(--duration-short-3);\n  --motion-sheet-exit-easing: var(--easing-standard);\n  --motion-modal-enter-duration: var(--duration-short-3);\n  --motion-modal-enter-easing: var(--easing-standard);\n  --motion-modal-exit-duration: var(--duration-short-3);\n  --motion-modal-exit-easing: var(--easing-standard);\n  --motion-peg-hit-duration: var(--duration-short-3);\n  --motion-float-duration: 0ms;\n  --motion-bins-reel-duration: var(--duration-short-3);\n  --motion-bins-reel-stagger-duration: 0ms;\n  --motion-bins-reel-easing: var(--easing-standard);\n  --motion-win-buildup-duration: var(--duration-short-3);\n  --motion-win-buildup-big-duration: var(--duration-short-3);\n  --motion-toast-float-duration: 1600ms;\n}\n\n/* Bin heat: set data-heat on a bin (or a chip), its colours follow */\n:root, :host {\n  --bin-bg: var(--plinko-bin-cold-bg);\n  --bin-on: var(--plinko-bin-cold-on);\n  --bin-outline: var(--plinko-bin-cold-outline);\n  --bin-sparkle: var(--icon-sparkle-magenta);\n}\n[data-heat="cold"] {\n  --bin-bg: var(--plinko-bin-cold-bg);\n  --bin-on: var(--plinko-bin-cold-on);\n  --bin-outline: var(--plinko-bin-cold-outline);\n  --bin-sparkle: var(--icon-sparkle-magenta);\n}\n[data-heat="cool"] {\n  --bin-bg: var(--plinko-bin-cool-bg);\n  --bin-on: var(--plinko-bin-cool-on);\n  --bin-outline: var(--buttons-ghost-default);\n  --bin-sparkle: var(--icon-sparkle-magenta);\n}\n[data-heat="mild"] {\n  --bin-bg: var(--plinko-bin-mild-bg);\n  --bin-on: var(--plinko-bin-mild-on);\n  --bin-outline: var(--buttons-ghost-default);\n  --bin-sparkle: var(--icon-sparkle-magenta);\n}\n[data-heat="warm"] {\n  --bin-bg: var(--plinko-bin-warm-bg);\n  --bin-on: var(--plinko-bin-warm-on);\n  --bin-outline: var(--buttons-ghost-default);\n  --bin-sparkle: var(--icon-sparkle-magenta);\n}\n[data-heat="hot"] {\n  --bin-bg: var(--plinko-bin-hot-bg);\n  --bin-on: var(--plinko-bin-hot-on);\n  --bin-outline: var(--buttons-ghost-default);\n  --bin-sparkle: var(--icon-sparkle-gold);\n}\n[data-heat="mega"] {\n  --bin-bg: var(--plinko-bin-mega-bg);\n  --bin-on: var(--plinko-bin-mega-on);\n  --bin-outline: var(--buttons-ghost-default);\n  --bin-sparkle: var(--icon-sparkle-gold);\n}\n\n/* Paint styles (gradients). Layer order: top layer first, as CSS expects */\n:root, :host {\n  --gradient-cta-default: linear-gradient(180deg, var(--magenta-500) 0%, var(--magenta-600) 60%);\n  --gradient-cta-hover: linear-gradient(180deg, var(--magenta-600) 0%, var(--magenta-700) 60%);\n  --gradient-cta-pressed: linear-gradient(180deg, var(--magenta-700) 0%, var(--magenta-800) 60%);\n  --gradient-ball-trail: linear-gradient(180deg, var(--transparent) 0%, var(--plinko-ball-glow) 100%);\n  --gradient-bin-mega: linear-gradient(180deg, var(--white-alpha-40) 0%, var(--transparent) 100%), linear-gradient(180deg, var(--magenta-400) 0%, var(--magenta-500) 100%);\n  --gradient-bin-surface: linear-gradient(180deg, var(--white-alpha-40) 0%, var(--transparent) 100%), linear-gradient(var(--bin-bg), var(--bin-bg));\n  --gradient-bin-rim: linear-gradient(180deg, var(--white-alpha-48) 0%, var(--transparent) 50%);\n  --gradient-title-gold: linear-gradient(180deg, var(--gold-100) 0%, var(--gold-300) 55%, var(--gold-400) 100%);\n  --gradient-frame-body: linear-gradient(180deg, var(--plinko-frame-body-top) 0%, var(--plinko-frame-body-bottom) 100%);\n  --gradient-frame-board: linear-gradient(180deg, var(--plinko-frame-board-top) 0%, var(--plinko-frame-board-bottom) 70%);\n  --gradient-frame-board-pattern: linear-gradient(180deg, var(--plinko-frame-board-top) 0%, var(--plinko-frame-board-bottom) 70%);\n  --gradient-title-pink: linear-gradient(180deg, var(--white) 0%, var(--magenta-400) 40%, var(--magenta-500) 100%);\n  --gradient-reward-rays: radial-gradient(circle at 50% 50%, var(--plinko-reward-ring) 20%, var(--transparent) 100%);\n  --gradient-takeover-background: radial-gradient(circle at 50% 50%, var(--plinko-takeover-top) 0%, var(--plinko-takeover-bottom) 75%);\n}\n\n/* Effect styles (glows and shadows) */\n:root, :host {\n  --glow-primary-pulse: 0px 4px 16px 0px var(--buttons-primary-glow);\n  --glow-peg-idle: 0px 0px 6px 0px var(--plinko-peg-idle-glow);\n  --glow-peg-hit: 0px 0px 10px 2px var(--plinko-peg-hit-glow);\n  --glow-ball: 0px 0px 16px 0px var(--plinko-ball-glow);\n  --glow-ball-landed: 0px 0px 22px 4px var(--plinko-ball-glow);\n  --glow-bulb-pink: 0px 0px 7px 2px var(--plinko-bulb-pink-glow);\n  --glow-bulb-gold: 0px 0px 7px 2px var(--plinko-bulb-gold-glow);\n  --glow-bin-mega: 0px 0px 12px 0px var(--plinko-bin-mega-glow);\n  --glow-bin-anticipation: 0px 0px 10px 0px var(--plinko-bin-hit-glow);\n  --glow-bin-hit: 0px 0px 22px 4px var(--plinko-bin-hit-glow);\n  --text-engraved: 0px 0.5px 0.5px 0px var(--plinko-bin-text-highlight), 0px -0.5px 0.5px 0px var(--plinko-bin-text-shade);\n  --glow-frame: 0px 0px 24px 0px var(--plinko-frame-glow);\n  --glow-board-inner: 0px 0px 16px 0px var(--plinko-frame-glow);\n  --shadow-popover: 0px 6px 20px 0px var(--scrim-medium);\n  --shadow-sheet: 0px -10px 40px 0px var(--scrim-medium);\n  --glow-bulb-pink-flare: 0px 0px 14px 4px var(--plinko-bulb-pink-glow);\n  --glow-bulb-gold-flare: 0px 0px 14px 4px var(--plinko-bulb-gold-glow);\n  --glow-frame-gold: 0px 0px 24px 4px var(--gold-alpha-64), 0px 0px 56px 8px var(--gold-alpha-32);\n}\n';

  // design-system/css/type.css
  var type_default = "/* Text styles from Figma. Generated by scripts/build-tokens.py. Class = Figma style name. */\n.text-headline-h1/medium-500-medium { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h1); font-weight: var(--weight-medium-500); line-height: 1.15; } /* Headline/H1/medium-500 */\n.text-headline-h1/bold-700-bold { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h1); font-weight: var(--weight-bold-700); line-height: 1.15; } /* Headline/H1/bold-700 */\n.text-headline-h2/medium-500-medium { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h2); font-weight: var(--weight-medium-500); line-height: 1.2; } /* Headline/H2/medium-500 */\n.text-headline-h2/bold-700-bold { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h2); font-weight: var(--weight-bold-700); line-height: 1.2; } /* Headline/H2/bold-700 */\n.text-headline-h3/medium-500-medium { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h3); font-weight: var(--weight-medium-500); line-height: 1.25; } /* Headline/H3/medium-500 */\n.text-headline-h3/bold-700-bold { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h3); font-weight: var(--weight-bold-700); line-height: 1.25; } /* Headline/H3/bold-700 */\n.text-headline-h4/medium-500-medium { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h4); font-weight: var(--weight-medium-500); line-height: 1.25; } /* Headline/H4/medium-500 */\n.text-headline-h4/bold-700-bold { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h4); font-weight: var(--weight-bold-700); line-height: 1.25; } /* Headline/H4/bold-700 */\n.text-headline-h5/medium-500-medium { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h5); font-weight: var(--weight-medium-500); line-height: 1.3; } /* Headline/H5/medium-500 */\n.text-headline-h5/bold-700-bold { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h5); font-weight: var(--weight-bold-700); line-height: 1.3; } /* Headline/H5/bold-700 */\n.text-body-large/medium-500-medium { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-large); font-weight: var(--weight-medium-500); line-height: 1.35; } /* Body/Large/medium-500 */\n.text-body-large/bold-700-bold { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-large); font-weight: var(--weight-bold-700); line-height: 1.35; } /* Body/Large/bold-700 */\n.text-body-paragraph/medium-500-medium { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-paragraph); font-weight: var(--weight-medium-500); line-height: 1.4; } /* Body/Paragraph/medium-500 */\n.text-body-paragraph/bold-700-bold { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-paragraph); font-weight: var(--weight-bold-700); line-height: 1.4; } /* Body/Paragraph/bold-700 */\n.text-body-medium/medium-500-medium { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-medium); font-weight: var(--weight-medium-500); line-height: 1.45; } /* Body/Medium/medium-500 */\n.text-body-medium/bold-700-bold { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-medium); font-weight: var(--weight-bold-700); line-height: 1.45; } /* Body/Medium/bold-700 */\n.text-body-small/medium-500-medium { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-small); font-weight: var(--weight-medium-500); line-height: 1.5; } /* Body/Small/medium-500 */\n.text-body-small/bold-700-bold { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-small); font-weight: var(--weight-bold-700); line-height: 1.5; } /* Body/Small/bold-700 */\n.text-body-minimum/medium-500-medium { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-minimum); font-weight: var(--weight-medium-500); line-height: 1.55; } /* Body/Minimum/medium-500 */\n.text-body-minimum/bold-700-bold { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-minimum); font-weight: var(--weight-bold-700); line-height: 1.55; } /* Body/Minimum/bold-700 */\n.text-button-lg { font-family: var(--font-button), system-ui, sans-serif; font-size: var(--button-font-size-lg); font-weight: var(--weight-bold-700); line-height: 1.2; } /* Components/Button/lg */\n.text-button-md { font-family: var(--font-button), system-ui, sans-serif; font-size: var(--button-font-size-md); font-weight: var(--weight-bold-700); line-height: 1.2; } /* Components/Button/md */\n.text-button-sm { font-family: var(--font-button), system-ui, sans-serif; font-size: var(--button-font-size-sm); font-weight: var(--weight-bold-700); line-height: 1.2; } /* Components/Button/sm */\n.text-title-h1/bold-700 { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h1); font-weight: var(--weight-bold-700); line-height: 1.15; text-transform: uppercase; } /* Title/H1/bold-700 */\n.text-title-h2/bold-700 { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h2); font-weight: var(--weight-bold-700); line-height: 1.2; letter-spacing: 0.02em; text-transform: uppercase; } /* Title/H2/bold-700 */\n.text-title-h3/bold-700 { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h3); font-weight: var(--weight-bold-700); line-height: 1.25; letter-spacing: 0.02em; text-transform: uppercase; } /* Title/H3/bold-700 */\n.text-title-large/bold-700 { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-large); font-weight: var(--weight-bold-700); line-height: 1.35; letter-spacing: 0.02em; text-transform: uppercase; } /* Title/Large/bold-700 */\n.text-label-paragraph/bold-700 { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-paragraph); font-weight: var(--weight-bold-700); line-height: 1.4; letter-spacing: 0.12em; text-transform: uppercase; } /* Label/Paragraph/bold-700 */\n.text-label-small/bold-700 { font-family: var(--font-body), system-ui, sans-serif; font-size: var(--font-size-small); font-weight: var(--weight-bold-700); line-height: 1.5; letter-spacing: 0.12em; text-transform: uppercase; } /* Label/Small/bold-700 */\n.text-number-h2/bold-700 { font-family: var(--font-headline), system-ui, sans-serif; font-size: var(--font-size-h2); font-weight: var(--weight-bold-700); line-height: 1.2; } /* Number/H2/bold-700 */\n";

  // design-system/css/components.css
  var components_default = '/* Plinko UI components. One block per Figma component.\n   Naming: Figma "plinko/button, Variant=Primary, Size=lg, State=Disabled" = .button.button--primary.button--lg.is-disabled\n   States: Hover = :hover inside @media (hover: hover), Pressed = :active or .is-pressed, Disabled = :disabled or .is-disabled,\n   Focus = :focus-visible, Selected/Checked = ARIA attribute (aria-checked, aria-selected, aria-pressed).\n   Only tokens are used here: no raw colours. */\n\n/* ---------- Icon (plinko/icon/*) ---------- */\n.icon { display: inline-block; flex: none; width: var(--icon-size-md); height: var(--icon-size-md); color: var(--icon-default); }\n.icon svg { width: 100%; height: 100%; }\n.icon--xs { width: var(--icon-size-xs); height: var(--icon-size-xs); }\n.icon--sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }\n.icon--md { width: var(--icon-size-md); height: var(--icon-size-md); }\n.icon--lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }\n.icon--xl { width: var(--icon-size-xl); height: var(--icon-size-xl); }\n.icon--accent { color: var(--icon-accent); }\n.icon--muted { color: var(--icon-muted); }\n.icon--emphasis { color: var(--icon-emphasis); }\n\n/* ---------- Spinner (plinko/spinner) ---------- */\n.spinner { --size: var(--icon-size-md); width: var(--size); height: var(--size); border-radius: 50%; border: calc(var(--size) / 8) solid var(--spinner-track); border-top-color: var(--spinner-indicator); animation: plk-spin var(--motion-spinner-duration) var(--motion-spinner-easing) infinite; }\n.spinner--xs { --size: var(--icon-size-xs); } .spinner--sm { --size: var(--icon-size-sm); } .spinner--lg { --size: var(--icon-size-lg); } .spinner--xl { --size: var(--icon-size-xl); }\n\n/* ---------- Scrim (plinko/scrim) ---------- */\n.scrim { position: absolute; inset: 0; display: flex; justify-content: center; background: var(--scrim-medium); z-index: 20; }\n.scrim--center { align-items: center; padding: var(--spacing-md); }\n.scrim--bottom { align-items: flex-end; }\n.scrim--blur-low { backdrop-filter: blur(var(--blur-low)); -webkit-backdrop-filter: blur(var(--blur-low)); }\n.scrim--blur-medium { backdrop-filter: blur(var(--blur-medium)); -webkit-backdrop-filter: blur(var(--blur-medium)); }\n.scrim--blur-high { backdrop-filter: blur(var(--blur-high)); -webkit-backdrop-filter: blur(var(--blur-high)); }\n.scrim--low { background: var(--scrim-low); } .scrim--high { background: var(--scrim-high); }\n\n/* ---------- Button (plinko/button) ---------- */\n.button { position: relative; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-height: 44px; border-radius: var(--radius-md); font-family: var(--font-button), system-ui, sans-serif; font-weight: var(--weight-bold-700); line-height: 1.2; text-transform: uppercase; text-align: center; transition: transform var(--motion-press-duration) var(--motion-press-easing), background var(--motion-hover-duration) var(--motion-hover-easing), color var(--motion-hover-duration); user-select: none; -webkit-user-select: none; }\n.button__row { display: inline-flex; align-items: center; gap: var(--button-default-gap-md); }\n.button__sublabel { font-size: var(--font-size-small); font-weight: var(--weight-medium-500); text-transform: none; color: var(--buttons-sublabel); line-height: 1.2; }\n.button--lg { width: 100%; padding: var(--button-default-vertical-padding-lg) var(--button-default-horizontal-padding-lg); font-size: var(--button-font-size-lg); gap: 0; }\n.button--lg .button__sublabel { font-size: var(--font-size-medium); }\n.button--md { min-height: var(--layout-tap-target); padding: var(--button-default-vertical-padding-md) var(--button-default-horizontal-padding-md); font-size: var(--button-font-size-md); }\n.button--sm { min-height: var(--layout-tap-target); padding: var(--button-default-vertical-padding-sm) var(--button-default-horizontal-padding-sm); font-size: var(--button-font-size-sm); }\n.button--block { width: 100%; }\n.button--primary { background: var(--gradient-cta-default); color: var(--buttons-on-primary); }\n.button--neutral { background: var(--buttons-neutral-default); color: var(--buttons-on-neutral); }\n@media (hover: hover) {\n  .button--primary:hover:not(:disabled):not(.is-disabled):not(.is-loading) { background: var(--gradient-cta-hover); }\n  .button--neutral:hover:not(:disabled):not(.is-disabled) { background: var(--buttons-neutral-hover); }\n}\n.button:active:not(:disabled):not(.is-disabled):not(.is-loading), .button.is-pressed { transform: scale(0.97); }\n.button--primary:active:not(:disabled):not(.is-disabled):not(.is-loading), .button--primary.is-pressed { background: var(--gradient-cta-pressed); }\n.button--neutral:active:not(:disabled), .button--neutral.is-pressed { background: var(--buttons-neutral-pressed); }\n.button--primary:disabled, .button--primary.is-disabled { background: var(--buttons-primary-disabled); color: var(--buttons-on-primary-disabled); }\n.button--primary:disabled .button__sublabel, .button--primary.is-disabled .button__sublabel { color: var(--buttons-on-primary-disabled); }\n.button--neutral:disabled, .button--neutral.is-disabled { background: var(--buttons-neutral-disabled); color: var(--buttons-on-neutral-disabled); }\n.button.is-loading > :not(.spinner) { opacity: 0; }\n.button.is-loading .spinner { position: absolute; inset: 0; margin: auto; }\n.button.is-pulse { animation: plk-pulse-glow var(--motion-pulse-duration) var(--motion-pulse-easing) infinite; }\n\n/* ---------- Icon button (plinko/icon-button) ---------- */\n.icon-button { display: inline-grid; place-items: center; flex: none; width: var(--icon-button-size-md); height: var(--icon-button-size-md); border-radius: var(--radius-round); color: var(--icon-default); background: var(--buttons-ghost-default); transition: transform var(--motion-press-duration) var(--motion-press-easing), background var(--motion-hover-duration); }\n.icon-button--lg { width: var(--icon-button-size-lg); height: var(--icon-button-size-lg); }\n.icon-button--lg .icon { width: var(--icon-size-lg); height: var(--icon-size-lg); }\n@media (hover: hover) { .icon-button:hover:not(:disabled) { background: var(--buttons-ghost-hover); } }\n.icon-button:active:not(:disabled), .icon-button.is-pressed { background: var(--buttons-ghost-pressed); transform: scale(0.92); }\n.icon-button:disabled, .icon-button.is-disabled { color: var(--buttons-ghost-on-disabled); }\n\n/* ---------- Text link (plinko/link) ---------- */\n.link { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 var(--spacing-sm); font-size: var(--font-size-large); font-weight: var(--weight-bold-700); color: var(--links-default); text-decoration: none; transition: color var(--motion-hover-duration); }\n@media (hover: hover) { .link:hover:not(:disabled) { color: var(--links-hover); } }\n.link:active { color: var(--links-pressed); }\n.link:disabled, .link.is-disabled { color: var(--links-disabled); }\n\n/* ---------- Risk chart (plinko/risk-chart) ---------- */\n.risk-chart { width: 54px; height: 14px; display: block; }\n.risk-chart rect { fill: var(--segments-chart-unselected); transition: fill var(--motion-selector-duration) var(--easing-standard); transition-delay: calc(var(--d, 0) * 20ms); }\n.risk-chart.is-selected rect[data-heat="cold"] { fill: var(--plinko-risk-chart-cold); }\n.risk-chart.is-selected rect[data-heat="cool"] { fill: var(--plinko-risk-chart-cool); }\n.risk-chart.is-selected rect[data-heat="mild"] { fill: var(--plinko-bin-mild-bg); }\n.risk-chart.is-selected rect[data-heat="warm"] { fill: var(--plinko-bin-warm-bg); }\n.risk-chart.is-selected rect[data-heat="hot"] { fill: var(--plinko-bin-hot-bg); }\n.risk-chart.is-selected rect[data-heat="mega"] { fill: var(--plinko-bin-mega-bg); }\n\n/* ---------- Risk segment + risk selector (plinko/risk-segment, plinko/risk-selector) ---------- */\n.risk-selector { display: flex; flex-direction: column; gap: var(--spacing-2xs); }\n.risk-selector__track { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-2xs); padding: var(--spacing-2xs); border-radius: var(--radius-lg); background: var(--segments-track); }\n.risk-selector__thumb { position: absolute; top: var(--spacing-2xs); bottom: var(--spacing-2xs); left: var(--spacing-2xs); width: calc((100% - 4 * var(--spacing-2xs)) / 3); border-radius: var(--radius-md); background: var(--segments-selected-default); transform: translateX(calc(var(--i, 0) * (100% + var(--spacing-2xs)))); transition: transform var(--motion-selector-duration) var(--motion-selector-easing), background var(--motion-fade-duration), box-shadow var(--motion-fade-duration); }\n.risk-selector.is-disabled .risk-selector__thumb { background: var(--segments-selected-disabled); }\n.risk-selector__caption { text-align: center; font-size: var(--font-size-large); font-weight: var(--weight-medium-500); min-height: 1.35em; transition: opacity var(--motion-fade-duration) var(--motion-fade-easing); }\n.risk-segment { position: relative; z-index: 1; min-height: 52px; padding: var(--spacing-xs); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--spacing-2xs); border-radius: var(--radius-md); background: var(--segments-unselected-default); transition: background var(--motion-hover-duration); }\n.risk-segment__label { font-size: var(--font-size-paragraph); font-weight: var(--weight-bold-700); letter-spacing: 0.12em; text-transform: uppercase; color: var(--segments-on-unselected-default); transition: color var(--motion-fade-duration) var(--motion-fade-easing); }\n.risk-segment[aria-checked="true"] .risk-segment__label { color: var(--segments-on-selected-default); }\n@media (hover: hover) { .risk-segment:hover:not(:disabled):not([aria-checked="true"]) { background: var(--segments-unselected-hover); } .risk-segment:hover:not(:disabled):not([aria-checked="true"]) .risk-segment__label { color: var(--segments-on-unselected-hover); } }\n.risk-segment:disabled .risk-segment__label { color: var(--segments-on-unselected-disabled); }\n.risk-segment:disabled[aria-checked="true"] .risk-segment__label { color: var(--segments-on-selected-disabled); }\n.risk-segment:disabled .risk-chart { opacity: 0.5; }\n\n/* ---------- Popup header (plinko/popup-header) ---------- */\n.popup-header { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 48px; }\n.popup-header > :last-child { justify-self: end; }\n.popup-header__title { font-size: var(--font-size-h2); font-weight: var(--weight-bold-700); letter-spacing: 0.02em; text-transform: uppercase; line-height: 1.2; background: var(--gradient-title-gold); -webkit-background-clip: text; background-clip: text; color: transparent; }\n\n/* ---------- Prize strip (plinko/prize-strip) ---------- */\n.prize-strip { --zig: var(--plinko-popup-surface); position: relative; display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs); min-height: 44px; padding: 0 var(--spacing-sm); background: var(--plinko-prize-strip-surface); color: var(--plinko-prize-strip-on-surface); font-size: var(--font-size-large); font-weight: var(--weight-medium-500); }\n.prize-strip::before, .prize-strip::after { content: ""; position: absolute; left: 0; right: 0; height: 4px; background: linear-gradient(135deg, var(--zig) 3px, var(--transparent) 0) 0 0 / 8px 4px repeat-x, linear-gradient(225deg, var(--zig) 3px, var(--transparent) 0) 0 0 / 8px 4px repeat-x; }\n.prize-strip::before { top: 0; } .prize-strip::after { bottom: 0; transform: scaleY(-1); }\n.prize-strip__prize { color: var(--plinko-prize-strip-prize); font-weight: var(--weight-bold-700); }\n.prize-strip--gift { color: var(--plinko-prize-strip-gift); font-weight: var(--weight-bold-700); text-transform: uppercase; letter-spacing: 0.02em; }\n\n/* ---------- Ticket tab (plinko/ticket-tab) ---------- */\n.ticket-tab { position: relative; display: inline-flex; align-items: center; gap: var(--spacing-xs); height: 32px; padding: 0 var(--spacing-sm); border-radius: var(--radius-md) var(--radius-md) 0 0; background: var(--plinko-ticket-tab-surface); box-shadow: inset 0 2px 0 var(--plinko-ticket-tab-outline), inset 2px 0 0 var(--plinko-ticket-tab-outline), inset -2px 0 0 var(--plinko-ticket-tab-outline); color: var(--plinko-ticket-tab-on-surface); font-size: var(--font-size-large); font-weight: var(--weight-bold-700); transition: background var(--motion-fade-duration), color var(--motion-fade-duration); }\n.ticket-tab .icon { color: var(--plinko-ticket-tab-icon); width: var(--icon-size-sm); height: var(--icon-size-sm); }\n.ticket-tab.is-empty { background: var(--plinko-ticket-tab-empty-surface); box-shadow: none; color: var(--plinko-ticket-tab-on-empty); }\n.ticket-tab.is-empty .icon { color: var(--plinko-ticket-tab-icon-empty); }\n.ticket-tab__gain { position: absolute; left: 100%; margin-left: 6px; color: var(--on-surface-accent); font-weight: var(--weight-bold-700); text-shadow: var(--glow-ball); opacity: 0; pointer-events: none; }\n.ticket-tab.is-low { box-shadow: inset 0 2px 0 var(--plinko-ticket-tab-low-outline), inset 2px 0 0 var(--plinko-ticket-tab-low-outline), inset -2px 0 0 var(--plinko-ticket-tab-low-outline); color: var(--plinko-ticket-tab-on-low); } /* State=Low: 1 ticket left */\n.ticket-tab.is-gained .ticket-tab__gain { animation: plk-gain 600ms var(--easing-emphasized-decelerate) both; }\n\n/* ---------- Footer link (plinko/footer-link) ---------- */\n.footer-link { display: flex; align-items: center; gap: var(--spacing-sm); width: 100%; min-height: 48px; padding: var(--spacing-xs); border-radius: var(--radius-md); text-align: left; background: var(--buttons-ghost-default); transition: background var(--motion-hover-duration); }\n@media (hover: hover) { .footer-link:hover { background: var(--buttons-ghost-hover); } }\n.footer-link:active { background: var(--buttons-ghost-pressed); }\n.footer-link__text { flex: 1; display: flex; flex-direction: column; gap: var(--spacing-2xs); line-height: 1.35; }\n.footer-link__title { font-size: var(--font-size-large); font-weight: var(--weight-bold-700); }\n.footer-link__desc { font-size: var(--font-size-medium); color: var(--on-surface-muted); }\n\n/* ---------- Board tabs (plinko/board-tabs): tickets + winnings, Won=false = winnings tab [hidden] ---------- */\n.board-tabs { display: flex; justify-content: center; align-items: flex-end; gap: var(--spacing-2xs); }\n/* Winnings tab (plinko/winnings-tab): the pool of everything won this session, next to the ticket balance */\n.winnings-tab { background: var(--surface-container-default); box-shadow: inset 0 2px 0 var(--outline-accent), inset 2px 0 0 var(--outline-accent), inset -2px 0 0 var(--outline-accent); color: var(--plinko-prize-strip-prize); animation: plk-modal-enter var(--motion-modal-enter-duration) var(--motion-modal-enter-easing) both; }\n.winnings-tab[hidden] { display: none; }\n.winnings-tab .icon { color: var(--on-surface-accent); }\n@media (hover: hover) { .winnings-tab:hover { background: var(--action-neutral-hover); } }\n.winnings-tab:active { transform: scale(0.97); }\n.winnings-tab .ticket-tab__gain { left: auto; right: 0; top: -22px; margin: 0; }\n.winnings-tab.is-gained .ticket-tab__gain { animation: plk-gain 900ms var(--easing-emphasized-decelerate) both; }\n\n/* ---------- Frame + bulbs + chute (plinko/frame, plinko/bulb, plinko/chute) ---------- */\n.frame { position: relative; padding: 22px; border-radius: 24px; background: var(--gradient-frame-body); box-shadow: inset 0 0 0 2px var(--plinko-frame-neon), var(--glow-frame); transition: box-shadow var(--motion-fade-duration); }\n.frame__board { position: relative; border-radius: var(--radius-md); overflow: hidden; background:\n  linear-gradient(180deg, var(--transparent) 40%, var(--plinko-frame-board-bottom) 85%),\n  conic-gradient(from 45deg at 50% 50%, color-mix(in srgb, var(--white-alpha-8) 55%, transparent) 0 25%, var(--transparent) 0 50%, color-mix(in srgb, var(--white-alpha-8) 55%, transparent) 0 75%, var(--transparent) 0) 0 0 / 34px 46px,\n  var(--gradient-frame-board);\n  box-shadow: 0 0 0 2px var(--plinko-frame-neon), var(--glow-board-inner); }\n.frame__bulbs { position: absolute; inset: 0; pointer-events: none; }\n.bulb { position: absolute; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; }\n.bulb--pink { background: var(--plinko-bulb-pink-core); box-shadow: var(--glow-bulb-pink); }\n.bulb--gold { background: var(--plinko-bulb-gold-core); box-shadow: var(--glow-bulb-gold); }\n.bulb.is-dim { opacity: 0.45; }\n.bulb.is-off { background: var(--plinko-bulb-off); box-shadow: none; }\n.frame .bulb { animation: plk-twinkle var(--motion-bulb-twinkle-duration) var(--motion-bulb-twinkle-easing) infinite; animation-delay: calc(var(--odd, 0) * var(--motion-bulb-twinkle-duration) / -2); }\n.frame.is-active .bulb { animation: plk-chase calc(var(--motion-bulb-chase-duration) * 4) steps(1, end) infinite; animation-delay: calc(var(--n, 0) * var(--motion-bulb-chase-duration) * -1); }\n.frame.is-dimmed { box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--plinko-frame-neon) 35%, transparent); }\n.frame.is-dimmed .frame__board { box-shadow: 0 0 0 2px color-mix(in srgb, var(--plinko-frame-neon) 35%, transparent); }\n.frame.is-dimmed .bulb { animation: none; background: var(--plinko-bulb-off); box-shadow: none; opacity: 1; }\n/* Win build-up states (plinko/frame State=Flare, State=Celebrate). Flare: bulbs flare before the big win sheet.\n   Celebrate: the frame and the board outline turn gold, every bulb flares gold, then the mega takeover opens. */\n/* Lit bulbs, and a dark gap runs round the frame: the drop chase inverted, twice as fast */\n.frame.is-flare .bulb, .frame.is-celebrate .bulb { animation: plk-bulb-flare var(--motion-win-buildup-big-duration) var(--easing-standard) both, plk-chase-inverse calc(var(--motion-bulb-chase-duration) * 2) steps(1, end) infinite; animation-delay: 0s, calc(var(--n, 0) * var(--motion-bulb-chase-duration) * -0.5); opacity: 1; }\n.frame.is-flare .bulb--pink { box-shadow: var(--glow-bulb-pink-flare); }\n.frame.is-flare .bulb--gold, .frame.is-celebrate .bulb { background: var(--plinko-bulb-gold-core); box-shadow: var(--glow-bulb-gold-flare); }\n.frame.is-celebrate { box-shadow: inset 0 0 0 2px var(--plinko-bulb-gold-core), var(--glow-frame-gold); transition: box-shadow var(--motion-win-buildup-duration) var(--easing-standard); }\n.frame.is-celebrate .frame__board { box-shadow: 0 0 0 2px var(--plinko-bulb-gold-core), var(--glow-frame-gold); transition: box-shadow var(--motion-win-buildup-duration) var(--easing-standard); }\n.frame.is-celebrate .bulb { animation-duration: var(--motion-win-buildup-duration), calc(var(--motion-bulb-chase-duration) * 2); }\n.chute { position: absolute; top: 0; left: 50%; width: 44px; height: 26px; transform: translateX(-50%); clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%); background: linear-gradient(90deg, var(--white-alpha-24), var(--transparent) 22%, var(--transparent) 78%, var(--white-alpha-24)), linear-gradient(180deg, var(--plinko-frame-chute), var(--plinko-frame-board-top)); z-index: 2; transition: filter var(--motion-fade-duration); }\n.chute.is-releasing { background: linear-gradient(180deg, var(--plinko-frame-chute) 55%, var(--plinko-frame-neon)); filter: drop-shadow(0 4px 6px var(--gold-alpha-48)); }\n\n/* ---------- Chance strip (plinko/chance-strip, plinko/chance-bar) ---------- */\n.chance-strip { display: grid; grid-template-columns: repeat(9, 1fr); gap: var(--spacing-2xs); align-items: end; }\n.chance-bar { display: block; height: var(--h, 50%); border-radius: var(--radius-xs) var(--radius-xs) 0 0; background: var(--plinko-chance-bar); transition: background var(--motion-fade-duration); }\n.chance-bar.is-hit { background: var(--plinko-chance-bar-hit); }\n\n/* ---------- Bin content + bin + bin row (plinko/bin-content, plinko/bin, plinko/bin-row) ---------- */\n.bin-row { display: grid; grid-template-columns: repeat(9, 1fr); gap: var(--spacing-2xs); }\n.bin { position: relative; height: 40px; border-radius: var(--radius-xs); display: grid; place-items: center; overflow: hidden; color: var(--bin-on); background: linear-gradient(180deg, var(--white-alpha-40) 0%, var(--transparent) 100%), var(--bin-bg); /* Bin/Surface, re-declared here so --bin-bg resolves per heat */ box-shadow: inset 0 0 0 1px var(--bin-outline); transition: transform var(--motion-bins-reshuffle-duration) var(--motion-bins-reshuffle-easing), box-shadow var(--motion-fade-duration), opacity var(--motion-fade-duration), filter var(--motion-fade-duration); }\n.bin::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: var(--gradient-bin-rim); mix-blend-mode: soft-light; }\n.bin[data-heat="mega"] { background: var(--gradient-bin-mega); box-shadow: var(--glow-bin-mega); }\n.bin.is-anticipation { box-shadow: inset 0 0 0 2px var(--white-alpha-48), var(--glow-bin-anticipation); animation: plk-anticipate var(--duration-long-2) var(--motion-pulse-easing) infinite alternate; z-index: 1; }\n.bin.is-hit { transform: translateY(3px); box-shadow: inset 0 0 0 2px var(--plinko-bin-hit-outline), var(--glow-bin-hit); animation: plk-bin-hit var(--motion-pulse-duration) var(--motion-pulse-easing) infinite; z-index: 1; overflow: visible; }\n.bin.is-dimmed { opacity: 0.4; }\n.bin.is-pop { transform: scale(1.12); }\n.bin-content { display: flex; flex-direction: column; align-items: center; gap: 0; font-size: var(--font-size-h5); font-weight: var(--weight-bold-700); line-height: 1.3; text-shadow: var(--text-engraved); transition: transform var(--duration-short-3) var(--easing-standard), opacity var(--duration-short-3); }\n.bin-content .icon { width: var(--icon-size-sm); height: var(--icon-size-sm); color: var(--bin-on); --sparkle: var(--bin-sparkle); }\n.bin-content--gc { font-size: var(--font-size-medium); line-height: 1.2; }\n.bin-content--gc .icon { width: var(--icon-size-xs); height: var(--icon-size-xs); }\n.bin-content--edge { padding-left: 2px; }\n.bin-reel { position: absolute; inset: 0; overflow: hidden; border-radius: inherit; }\n.bin-reel__strip { display: flex; flex-direction: column; will-change: transform; }\n.bin-reel__strip > .bin-content { height: var(--reel-h, 40px); justify-content: center; flex: none; }\n.bin.is-reel-stop { animation: plk-reel-stop var(--motion-bins-reshuffle-duration) var(--motion-bins-reshuffle-easing); }\n.bin-content.is-out { transform: translateY(-70%); opacity: 0; }\n.bin-content.is-in { transform: translateY(70%); opacity: 0; transition: none; }\n\n/* ---------- Toast (plinko/toast) ---------- */\n.toast { position: absolute; z-index: 6; display: inline-flex; align-items: center; gap: var(--spacing-2xs); padding: var(--spacing-2xs) var(--spacing-sm) var(--spacing-2xs) var(--spacing-2xs); border-radius: var(--radius-round); background: var(--plinko-toast-surface); color: var(--plinko-toast-on-surface); font-size: var(--font-size-paragraph); font-weight: var(--weight-bold-700); white-space: nowrap; box-shadow: var(--shadow-popover); transform: translate(-50%, -100%); animation: plk-toast-float var(--motion-toast-float-duration) var(--easing-standard-decelerate) both, plk-toast-sway calc(var(--motion-toast-float-duration) / 2) var(--motion-pulse-easing) infinite alternate; pointer-events: none; }\n.toast__amount { display: grid; place-items: center; min-width: 26px; height: 26px; padding: var(--spacing-2xs); border-radius: var(--radius-round); background: var(--gradient-title-gold); color: var(--plinko-toast-on-surface); font-size: var(--font-size-paragraph); }\n\n/* ---------- Reward icon, reward art, reward tile ---------- */\n.reward-icon { display: block; width: 80px; height: 80px; object-fit: contain; }\n.reward-icon--s { width: 48px; height: 48px; } .reward-icon--m { width: 80px; height: 80px; } .reward-icon--l { width: 160px; height: 160px; }\n.reward-art { position: relative; display: grid; place-items: center; flex: none; --s: 80px; width: var(--s); height: var(--s); }\n.reward-art--sm { --s: 48px; } .reward-art--lg { --s: 160px; }\n.reward-art .reward-icon { position: relative; z-index: 1; width: var(--s); height: var(--s); animation: plk-float var(--motion-float-duration) var(--motion-float-easing) infinite; }\n.reward-art__rays { display: none; }\n.reward-art.has-rays .reward-art__rays { display: block; position: absolute; width: calc(var(--s) * 2.2); height: calc(var(--s) * 2.2); left: 50%; top: 50%; margin: calc(var(--s) * -1.1) 0 0 calc(var(--s) * -1.1); border-radius: 50%;\n  background: repeating-conic-gradient(var(--plinko-reward-ring) 0 9deg, var(--transparent) 9deg 30deg);\n  -webkit-mask: radial-gradient(circle, #000 18%, transparent 70%); mask: radial-gradient(circle, #000 18%, transparent 70%);\n  animation: plk-rays 2.8s linear infinite; }\n.reward-tile { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-2xs); padding: var(--spacing-xs); border-radius: var(--radius-md); background: var(--surface-container-default); }\n.reward-tile .reward-icon { width: 48px; height: 48px; }\n.reward-tile__amount { font-size: var(--font-size-h5); font-weight: var(--weight-bold-700); line-height: 1.3; color: var(--plinko-reward-amount); }\n.reward-tile__amount + .reward-tile__label { margin-top: -6px; }\n.reward-tile__label { font-size: var(--font-size-medium); color: var(--on-surface-subtle); }\n\n/* ---------- Checkbox + checkbox row ---------- */\n.checkbox-row { display: inline-flex; align-items: center; gap: 0; padding-right: var(--spacing-sm); min-height: 44px; cursor: pointer; font-size: var(--font-size-large); font-weight: var(--weight-medium-500); }\n.checkbox { appearance: none; -webkit-appearance: none; margin: 12px; width: 20px; height: 20px; flex: none; border-radius: var(--radius-xs); border: 2px solid var(--selection-controls-outline-off); background: var(--transparent); display: grid; place-items: center; cursor: pointer; transition: background var(--motion-hover-duration), border-color var(--motion-hover-duration); }\n.checkbox::after { content: ""; width: 10px; height: 6px; border: solid var(--selection-controls-on-primary); border-width: 0 0 2px 2px; transform: translateY(-1px) rotate(-45deg) scale(0); transition: transform var(--duration-short-4) var(--easing-overshoot); }\n.checkbox:checked { background: var(--selection-controls-primary-default); border-color: var(--selection-controls-primary-default); }\n.checkbox:checked::after { transform: translateY(-1px) rotate(-45deg) scale(1); }\n@media (hover: hover) { .checkbox:hover:not(:checked) { border-color: var(--on-surface-subtle); } .checkbox:checked:hover { background: var(--selection-controls-primary-hover); border-color: var(--selection-controls-primary-hover); } }\n\n/* ---------- Toggle (plinko/toggle) ---------- */\n.toggle { position: relative; flex: none; width: 52px; height: 44px; display: grid; place-items: center; }\n.toggle__track { position: relative; width: 48px; height: 28px; border-radius: var(--radius-round); background: var(--selection-controls-primary-off); box-shadow: inset 0 0 0 2px var(--selection-controls-outline-off); transition: background var(--duration-short-4) var(--easing-standard), box-shadow var(--duration-short-4); }\n.toggle__knob { position: absolute; top: 3px; left: 3px; width: 22px; height: 22px; border-radius: var(--radius-round); background: var(--selection-controls-on-primary); transition: transform var(--duration-short-4) var(--easing-standard), width var(--motion-press-duration); }\n.toggle[aria-checked="true"] .toggle__track { background: var(--selection-controls-primary-default); box-shadow: none; }\n.toggle[aria-checked="true"] .toggle__knob { transform: translateX(20px); }\n.toggle:active .toggle__knob { width: 26px; }\n.toggle[aria-checked="true"]:active .toggle__knob { transform: translateX(16px); }\n.toggle:disabled .toggle__track { background: var(--selection-controls-primary-disabled); }\n.toggle:disabled .toggle__knob { background: var(--selection-controls-on-primary-disabled); }\n\n/* ---------- Tab + tab bar, pill + pill group ---------- */\n.tab-bar { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-2xs); padding: var(--spacing-2xs); border-radius: var(--radius-md); background: var(--segments-track); }\n.tab-bar__thumb { position: absolute; top: var(--spacing-2xs); bottom: var(--spacing-2xs); left: var(--spacing-2xs); width: calc((100% - 4 * var(--spacing-2xs)) / 3); border-radius: var(--radius-sm); background: var(--segments-selected-default); transform: translateX(calc(var(--i, 0) * (100% + var(--spacing-2xs)))); transition: transform var(--motion-selector-duration) var(--motion-selector-easing); }\n.tab { position: relative; z-index: 1; min-height: var(--layout-tap-target); padding: 0 var(--spacing-sm); border-radius: var(--radius-sm); font-size: var(--font-size-paragraph); font-weight: var(--weight-medium-500); color: var(--segments-on-unselected-default); transition: color var(--motion-fade-duration); }\n.tab[aria-selected="true"] { color: var(--segments-on-selected-default); font-weight: var(--weight-bold-700); }\n@media (hover: hover) { .tab:hover:not([aria-selected="true"]) { color: var(--segments-on-unselected-hover); } }\n.pill-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-xs); }\n.pill { min-height: var(--layout-tap-target); padding: 0 var(--spacing-md); border-radius: var(--radius-round); background: var(--pills-default); color: var(--pills-on-default); font-size: var(--font-size-paragraph); font-weight: var(--weight-bold-700); transition: background var(--motion-hover-duration), color var(--motion-hover-duration); }\n@media (hover: hover) { .pill:hover:not([aria-checked="true"]) { background: var(--pills-hover); } }\n.pill[aria-checked="true"], .pill[aria-pressed="true"] { background: var(--pills-selected); color: var(--pills-on-selected); }\n\n/* ---------- List row, rules item, info note, setting row ---------- */\n.list-row { display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm); border-radius: var(--radius-md); background: var(--plinko-list-row-surface); text-align: left; }\n.list-row__disc { display: grid; place-items: center; flex: none; width: 36px; height: 36px; border-radius: var(--radius-round); background: var(--plinko-list-row-icon-disc); color: var(--icon-accent); }\n.list-row__disc .icon { width: var(--icon-size-sm); height: var(--icon-size-sm); }\n.list-row__title { display: block; font-size: var(--font-size-large); font-weight: var(--weight-bold-700); line-height: 1.35; }\n.list-row__desc { display: block; margin-top: var(--spacing-2xs); font-size: var(--font-size-medium); font-weight: var(--weight-medium-500); line-height: 1.45; color: var(--on-surface-subtle); }\n.rules { display: flex; flex-direction: column; gap: var(--spacing-md); }\n.rules li { position: relative; padding-left: 14px; font-size: var(--font-size-paragraph); font-weight: var(--weight-medium-500); line-height: 1.4; color: var(--on-surface-default); }\n.rules li::before { content: ""; position: absolute; left: 0; top: 5px; width: 6px; height: 6px; border-radius: 50%; background: var(--on-surface-accent); }\n.rules li b { color: var(--on-surface-default); }\n.info-note { padding: var(--spacing-sm); border-radius: var(--radius-md); background: var(--plinko-list-row-surface); font-size: var(--font-size-paragraph); font-weight: var(--weight-medium-500); line-height: 1.4; color: var(--on-surface-subtle); }\n.info-note b { color: var(--on-surface-default); }\n.setting-row { display: flex; align-items: center; gap: var(--spacing-sm); width: 100%; min-height: 52px; padding: var(--spacing-2xs) var(--spacing-2xs) var(--spacing-2xs) var(--spacing-sm); border-radius: var(--radius-md); background: var(--plinko-list-row-surface); font-size: var(--font-size-large); font-weight: var(--weight-medium-500); text-align: left; }\n.setting-row > span:not(.icon):not(.toggle) { flex: 1; }\n\n/* ---------- Odds table (plinko/odds-row) ---------- */\n.odds { width: 100%; font-size: var(--font-size-paragraph); }\n.odds th { padding: var(--spacing-xs) var(--spacing-2xs) var(--spacing-2xs); font-size: var(--font-size-small); font-weight: var(--weight-bold-700); letter-spacing: 0.12em; text-transform: uppercase; color: var(--on-surface-muted); text-align: left; }\n.odds td { padding: var(--spacing-xs) var(--spacing-2xs); border-top: 1px solid var(--plinko-drawer-divider); vertical-align: middle; }\n/* plinko/odds-row: padding 8 / 4, chip 40 px, 12 px between chip, prize and chance (as in Figma) */\n.odds th:first-child, .odds td:first-child { width: 40px; padding-right: 0; box-sizing: content-box; }\n.odds th + th, .odds td + td { padding-left: var(--spacing-sm); }\n.odds td b { display: block; font-weight: var(--weight-bold-700); line-height: 1.4; }\n.odds td small { display: block; margin-top: 2px; font-size: var(--font-size-medium); font-weight: var(--weight-medium-500); color: var(--on-surface-muted); line-height: 1.4; }\n.odds .num { text-align: right; white-space: nowrap; }\n.odds__chip { width: 40px; height: 32px; border-radius: var(--radius-sm); display: grid; place-items: center; color: var(--bin-on); background: var(--bin-bg); font-size: var(--font-size-h5); font-weight: var(--weight-bold-700); text-shadow: var(--text-engraved); }\n.odds__chip .bin-content--gc { font-size: var(--font-size-small); line-height: 1.1; }\n\n/* ---------- Status art, timer, earn line ---------- */\n.status-art { width: 168px; height: 168px; }\n.timer { display: flex; align-items: center; justify-content: center; gap: var(--spacing-sm); min-height: 73px; padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-md); background: var(--plinko-timer-surface); box-shadow: inset 0 0 0 1px var(--plinko-timer-outline); }\n.timer__ring { position: relative; width: 44px; height: 44px; flex: none; }\n.timer__ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }\n.timer__ring circle { fill: none; stroke-width: 4; }\n.timer__ring .track { stroke: var(--spinner-track); }\n.timer__ring .fill { stroke: var(--plinko-timer-icon); stroke-linecap: round; transition: stroke-dashoffset 1s linear; }\n.timer__ring .icon { position: absolute; inset: 0; margin: auto; width: var(--icon-size-sm); height: var(--icon-size-sm); color: var(--plinko-timer-digits); }\n.timer__label { display: block; font-size: var(--font-size-paragraph); font-weight: var(--weight-bold-700); line-height: 1.4; color: var(--plinko-timer-label); }\n.timer__digits { display: block; font-size: var(--font-size-h2); font-weight: var(--weight-bold-700); line-height: 1.2; color: var(--plinko-timer-digits); font-variant-numeric: tabular-nums; }\n.timer.is-ready { box-shadow: inset 0 0 0 1px var(--plinko-timer-icon); }\n.earn-line { display: flex; align-items: center; justify-content: center; gap: var(--spacing-xs); font-size: var(--font-size-large); font-weight: var(--weight-medium-500); }\n.earn-line .icon { width: var(--icon-size-md); height: var(--icon-size-md); }\n.earn-line > span:last-child { text-align: left; line-height: 1.35; }\n.earn-line small { display: block; font-size: var(--font-size-paragraph); font-weight: var(--weight-medium-500); color: var(--on-surface-muted); }\n';

  // design-system/docs/docs.js
  var $ = (s, r = document) => r.querySelector(s);
  var IMG = "assets/img/";
  var esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var root = getComputedStyle(document.documentElement);
  var cssVar = (n) => root.getPropertyValue(n).trim();
  var sound = createSound({ base: "assets/sfx/" });
  var haptics = createHaptics();
  document.addEventListener("pointerdown", () => sound.unlock(), { capture: true });
  var TOKENS = [];
  async function loadTokens() {
    const seen = /* @__PURE__ */ new Set();
    for (const m of tokens_default.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
      if (!seen.has(m[1])) {
        seen.add(m[1]);
        TOKENS.push([m[1], m[2].trim()]);
      }
    }
  }
  var tokensBy = (re) => TOKENS.filter(([n]) => re.test(n));
  var swatch = (n, v) => `<div class="swatch"><i style="--c:var(${n})"></i><span><b>${n}</b>${esc(v)}</span></div>`;
  function stats() {
    const comps = COMPONENTS.length;
    $("#stats").innerHTML = [[TOKENS.length || "580+", "tokens in CSS, all named in Figma"], ["7", "variable collections, 12 modes"], ["30", "text styles"], [comps, "library components documented"], [MOTION.length, "animations in the catalogue"], [SOUND_MAP.length, "sound events"], [HAPTICS.length, "haptic patterns"]].map(([a, b]) => `<div class="swatch" style="flex-direction:column;align-items:flex-start;padding:14px"><b style="font-size:28px;font-family:inherit;font-weight:700">${a}</b><span>${b}</span></div>`).join("");
  }
  function colour() {
    const ramps = ["neutral", "slate", "magenta", "red", "orange", "gold", "green", "blue", "purple"];
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    $("#ramps").innerHTML = ramps.map((r) => `<p class="ramp-name">${r[0].toUpperCase() + r.slice(1)}</p><div class="ramp">${steps.map((s, i) => `<div style="background:var(--${r}-${s});color:${i < 5 ? "var(--black)" : "var(--white)"}"><b>${s}</b><span>${cssVar(`--${r}-${s}`)}</span></div>`).join("")}</div>`).join("");
    const alphas = ["white", "black", "magenta", "gold"];
    const a = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96];
    $("#alpha").innerHTML = alphas.map((r) => `<p class="ramp-name">${r[0].toUpperCase() + r.slice(1)} Alpha</p><div class="ramp" style="grid-template-columns:repeat(12,1fr);background:repeating-conic-gradient(#333 0 25%, #1a1a1a 0 50%) 0 0/12px 12px">${a.map((s) => `<div style="background:var(--${r}-alpha-${s});color:${r === "black" ? "var(--white)" : s > 40 && r !== "magenta" ? "var(--black)" : "var(--white)"}"><b>${s}</b></div>`).join("")}</div>`).join("");
    const sem = tokensBy(/^--(surface|on-surface|outline|elevation|scrim|action|feedback|interaction|background|state)-/);
    $("#semantic").innerHTML = sem.map(([n, v]) => swatch(n, v)).join("");
    const comp = tokensBy(/^--(buttons|links|segments|pills|selection-controls|icon-(default|subtle|muted|disabled|accent|emphasis|inverse|sparkle)|spinner|plinko)-/);
    $("#component-colours").innerHTML = comp.map(([n, v]) => swatch(n, v)).join("");
    $("#heat").innerHTML = ["cold", "cool", "mild", "warm", "hot", "mega"].map((h, i) => `<div class="state"><div class="bin" data-heat="${h}" style="width:64px;height:48px"><span class="bin-content">${h === "mega" ? icon("chest", "sm") : ["5", "8", "10", "13", "30"][i]}</span></div><small>${h}</small></div>`).join("");
  }
  function typography() {
    const rows = [...type_default.matchAll(/^\.(text-[\w-]+)/gm)].map((m) => m[1]);
    const list = rows.length ? rows : ["text-title-h1", "text-title-h2", "text-headline-h3-bold", "text-body-large-medium", "text-label-small"];
    $("#type").innerHTML = `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Class</th><th>Specimen</th></tr></thead><tbody>${list.map((c) => `<tr><td><code>.${c}</code></td><td><span class="${c}" style="color:var(--on-surface-default)">${c.includes("button") ? "Drop again" : c.includes("number") ? "10,000" : "Today's prize: 10 Free Spins"}</span></td></tr>`).join("")}</tbody></table></div>`;
  }
  function space() {
    const sp = tokensBy(/^--spacing-/);
    $("#spacing").innerHTML = sp.map(([n]) => `<div class="bar-spec"><code>${n}</code><i style="width:var(${n})"></i><span>${cssVar(n)}</span></div>`).join("");
    $("#radius").innerHTML = tokensBy(/^--radius-/).map(([n]) => `<div class="state"><div style="width:72px;height:56px;background:var(--surface-container-default);border:1px solid var(--outline-default);border-radius:var(${n})"></div><small>${n.replace("--", "")} ${cssVar(n)}</small></div>`).join("");
    $("#sizes").innerHTML = tokensBy(/^--(icon-size|icon-button-size|blur)-/).map(([n]) => `<div class="bar-spec"><code>${n}</code><i style="width:var(${n});background:var(--gold-300)"></i><span>${cssVar(n)}</span></div>`).join("");
  }
  function effects() {
    $("#gradients").innerHTML = tokensBy(/^--gradient-/).map(([n]) => `<div class="swatch" style="flex-direction:column;align-items:stretch"><div style="height:72px;border-radius:var(--radius-sm);background:var(${n})"></div><span><b>${n}</b></span></div>`).join("");
    $("#glows").innerHTML = tokensBy(/^--(glow|shadow|text-engraved)/).map(([n]) => `<div class="swatch" style="flex-direction:column;align-items:center;padding:20px 8px 8px"><div style="width:56px;height:40px;border-radius:var(--radius-sm);background:var(--surface-container-default);box-shadow:var(${n})"></div><span style="margin-top:12px"><b>${n}</b></span></div>`).join("");
  }
  function icons() {
    $("#icon-grid").innerHTML = Object.keys(ICONS).map((n) => `<div class="swatch" style="flex-direction:column;gap:8px;padding:14px 6px">${icon(n, "lg")}<span style="text-align:center"><b>${n}</b></span></div>`).join("");
    const imgs = ["img-ball", "img-reward-free-spins", "img-reward-gold-coins", "img-reward-ticket", "img-reward-gift-box", "img-reward-chest", "img-reward-chest-open", "img-reward-collectable", "img-reward-collectable-rare", "img-coin-a", "img-coin-b", "img-status-offline"];
    $("#images").innerHTML = imgs.map((n) => `<div class="swatch" style="flex-direction:column;padding:12px 6px"><img src="${IMG}${n}@2x.webp" alt="" style="width:80px;height:80px;object-fit:contain"><span style="text-align:center"><b>${n}</b></span></div>`).join("");
  }
  function motion() {
    $("#motion-principles").innerHTML = MOTION_PRINCIPLES.map(([t, d]) => `<h4>${t}</h4><p>${d}</p>`).join("");
    $("#durations").innerHTML = DURATIONS.map(([n, ms]) => `<div class="bar-spec"><code>${n}</code><i style="width:${ms / 2}px"></i><span>${ms} ms</span></div>`).join("");
    $("#easings").innerHTML = EASINGS.map(([n, b, use]) => {
      const [x1, y1, x2, y2] = b, P = (x, y) => `${(x * 100).toFixed(1)},${(100 - y * 100).toFixed(1)}`;
      return `<button class="curve" type="button" data-ease="${n}" style="text-align:left"><svg viewBox="-6 -40 112 152"><rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--outline-variant)"/><line x1="0" y1="100" x2="${x1 * 100}" y2="${100 - y1 * 100}" stroke="var(--outline-default)" stroke-dasharray="2 2"/><line x1="100" y1="0" x2="${x2 * 100}" y2="${100 - y2 * 100}" stroke="var(--outline-default)" stroke-dasharray="2 2"/><path d="M0,100 C${P(x1, y1)} ${P(x2, y2)} 100,0" fill="none" stroke="var(--magenta-400)" stroke-width="2.5"/></svg><span class="curve__track"><span class="curve__dot"></span></span><b>${n}</b><span>cubic-bezier(${b.join(", ")})</span><span>${use}</span></button>`;
    }).join("");
    $("#easings").addEventListener("click", (e) => {
      const c = e.target.closest(".curve");
      if (!c) return;
      const dot = c.querySelector(".curve__dot");
      dot.animate([{ left: "2px" }, { left: "calc(100% - 14px)" }], { duration: 1e3, easing: `var(${c.dataset.ease})` === "" ? "linear" : cssEase(c.dataset.ease), fill: "forwards" });
    });
    setTimeout(() => $("#easings").querySelectorAll(".curve").forEach((c) => c.click()), 600);
    $("#interactions").innerHTML = `<table class="tbl"><thead><tr><th>Interaction</th><th>Duration token</th><th>Easing token</th><th>Default</th><th>Reduced</th></tr></thead><tbody>${INTERACTIONS.map((r) => `<tr><td>${r[0]}</td><td><code>${r[1]}</code></td><td><code>${r[2]}</code></td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join("")}</tbody></table>`;
    let group = "";
    $("#catalogue").innerHTML = MOTION.map((m) => {
      const head = m.group !== group ? `<h3>${group = m.group}</h3>` : "";
      return `${head}<article class="mcard" id="m-${m.id}">
      <div class="mcard__head"><h4>${m.name}</h4><span>${esc(m.component)}</span></div>
      <div class="mcard__body">
        <div><div class="stage stage--dark" data-token-mode="mobile" data-demo="${m.demo}"></div>
          <div class="mcard__tools"><button type="button" data-act="replay">Replay</button><button type="button" data-act="slow" aria-pressed="false">0.25x</button><button type="button" data-act="reduced" aria-pressed="false">Reduced</button></div></div>
        <div>
          <dl><dt>Trigger</dt><dd>${esc(m.trigger)}</dd><dt>Reduced</dt><dd>${esc(m.reduced)}</dd><dt>Sound, haptics</dt><dd>${esc(m.sync)}</dd></dl>
          <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Property</th><th>From</th><th>To</th><th>Duration</th><th>Easing</th><th>Delay / loop</th></tr></thead><tbody>${m.spec.map((r) => `<tr>${r.map((c) => `<td>${/^--/.test(c) ? `<code>${esc(c)}</code>` : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
          <pre>${esc(m.code)}</pre>
        </div>
      </div></article>`;
    }).join("");
    document.querySelectorAll(".mcard").forEach((card) => {
      const stage = card.querySelector("[data-demo]");
      const run = () => runDemo(stage);
      card.querySelector('[data-act="replay"]').addEventListener("click", run);
      card.querySelector('[data-act="slow"]').addEventListener("click", (e) => {
        const on = e.currentTarget.getAttribute("aria-pressed") !== "true";
        e.currentTarget.setAttribute("aria-pressed", on);
        stage.dataset.rate = on ? 0.25 : 1;
        run();
      });
      card.querySelector('[data-act="reduced"]').addEventListener("click", (e) => {
        const on = e.currentTarget.getAttribute("aria-pressed") !== "true";
        e.currentTarget.setAttribute("aria-pressed", on);
        if (on) stage.dataset.motion = "reduced";
        else delete stage.dataset.motion;
        run();
      });
    });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !e.target.dataset.ran) {
        e.target.dataset.ran = 1;
        runDemo(e.target);
      }
    }), { rootMargin: "0px 0px -20% 0px" });
    document.querySelectorAll("[data-demo]").forEach((s) => io.observe(s));
  }
  function cssEase(n) {
    const e = EASINGS.find((x) => x[0] === n);
    return e ? e[1].join() === "0,0,1,1" ? "linear" : `cubic-bezier(${e[1].join(",")})` : "ease";
  }
  function applyRate(stage) {
    const rate = Number(stage.dataset.rate || 1);
    if (rate === 1) return;
    const t0 = performance.now();
    const tick = () => {
      stage.getAnimations({ subtree: true }).forEach((a) => {
        if (a.playbackRate !== rate) a.playbackRate = rate;
      });
      if (performance.now() - t0 < 6e3) requestAnimationFrame(tick);
    };
    tick();
  }
  var reducedOn = (stage) => stage.dataset.motion === "reduced";
  var later = (stage, ms, fn) => setTimeout(fn, ms / Number(stage.dataset.rate || 1));
  var DEMOS = {
    button(stage) {
      stage.innerHTML = `<button class="button button--primary button--md" type="button"><span class="button__label">Drop</span></button><button class="icon-button" type="button" aria-label="Close">${icon("close")}</button><small style="width:100%;text-align:center;color:var(--on-surface-muted)">Press and hold the buttons</small>`;
      const b = stage.querySelectorAll("button");
      later(stage, 300, () => b.forEach((x) => x.classList.add("is-pressed")));
      later(stage, 700, () => b.forEach((x) => x.classList.remove("is-pressed")));
    },
    pulse(stage) {
      stage.innerHTML = `<button class="button button--primary button--lg is-pulse" type="button" style="max-width:260px"><span class="button__label">Drop</span><span class="button__sublabel">5 tickets left</span></button>`;
    },
    spinner(stage) {
      stage.innerHTML = ["xs", "sm", "md", "lg", "xl"].map((s) => `<span class="spinner spinner--${s}"></span>`).join("") + `<button class="button button--primary button--lg is-loading" style="max-width:220px" aria-busy="true"><span class="button__label">Drop</span><span class="spinner spinner--md"></span></button>`;
    },
    risk(stage) {
      stage.innerHTML = riskSelectorHTML("low");
      const sel = stage.querySelector(".risk-selector");
      const seq = ["medium", "high", "low"];
      seq.forEach((r, i) => later(stage, 500 + i * 900, () => setRiskDemo(sel, r)));
    },
    bins(stage) {
      stage.innerHTML = `<div class="bin-row" style="width:300px">${binsFor("low").map((b) => binHTML(b)).join("")}</div>`;
      const row = stage.querySelector(".bin-row");
      ["medium", "high", "low"].forEach((r, i) => later(stage, 400 + i * 1100, () => reshuffle(stage, row, r)));
    },
    toggle(stage) {
      stage.innerHTML = `<button class="toggle" role="switch" aria-checked="false" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button><label class="checkbox-row"><input class="checkbox" type="checkbox"><span>Don't show this again</span></label>`;
      later(stage, 400, () => {
        stage.querySelector(".toggle").setAttribute("aria-checked", "true");
        stage.querySelector(".checkbox").checked = true;
      });
      later(stage, 1400, () => {
        stage.querySelector(".toggle").setAttribute("aria-checked", "false");
        stage.querySelector(".checkbox").checked = false;
      });
      stage.querySelector(".toggle").onclick = (e) => {
        const t = e.currentTarget;
        t.setAttribute("aria-checked", t.getAttribute("aria-checked") !== "true");
      };
    },
    tabs(stage) {
      stage.innerHTML = `<div class="tab-bar" role="tablist" style="width:320px"><span class="tab-bar__thumb"></span>${["How to play", "Chances", "Rules"].map((t, i) => `<button class="tab" role="tab" aria-selected="${i === 0}">${t}</button>`).join("")}</div>`;
      const bar = stage.querySelector(".tab-bar");
      [1, 2, 0].forEach((i, k) => later(stage, 400 + k * 800, () => {
        bar.style.setProperty("--i", i);
        bar.querySelectorAll(".tab").forEach((t, j) => t.setAttribute("aria-selected", j === i));
      }));
    },
    "frame-idle"(stage) {
      stage.innerHTML = miniFrame();
      placeBulbs(stage);
    },
    "frame-active"(stage) {
      stage.innerHTML = miniFrame("is-active");
      placeBulbs(stage);
    },
    flare(stage) {
      stage.innerHTML = miniFrame();
      placeBulbs(stage);
      later(stage, 500, () => stage.querySelector(".frame").classList.add("is-flare"));
    },
    celebrate(stage) {
      stage.innerHTML = miniFrame();
      placeBulbs(stage);
      later(stage, 500, () => stage.querySelector(".frame").classList.add("is-celebrate"));
    },
    drop(stage) {
      dropDemo(stage);
    },
    "bin-hit"(stage) {
      stage.innerHTML = `<div class="bin-row" style="width:300px">${binsFor("medium").map((b) => binHTML(b)).join("")}</div>`;
      later(stage, 300, () => stage.querySelectorAll(".bin")[2].classList.add("is-hit"));
    },
    ticket(stage) {
      stage.innerHTML = `<span class="ticket-tab">${icon("ticket", "sm")}<span>1 ticket</span><span class="ticket-tab__gain">+1</span></span>`;
      later(stage, 300, () => {
        const t = stage.querySelector(".ticket-tab");
        t.classList.add("is-gained");
        t.children[1].textContent = "2 tickets";
      });
    },
    toast(stage) {
      stage.innerHTML = `<div style="position:relative;width:300px;height:120px"><div class="bin-row" style="position:absolute;bottom:0;width:100%">${binsFor("low").map((b) => binHTML(b)).join("")}</div></div>`;
      const box = stage.firstElementChild;
      later(stage, 200, () => {
        box.querySelectorAll(".bin")[3].classList.add("is-hit");
        box.insertAdjacentHTML("beforeend", `<div class="toast" style="left:${3.5 / 9 * 100}%;top:70px"><span class="toast__amount">+10</span>Free Spins</div>`);
      });
    },
    sheet(stage) {
      stage.innerHTML = `<div style="position:relative;width:320px;height:200px;overflow:hidden;border-radius:16px;background:var(--surface-container-default)"><div class="win-sheet-demo anim-sheet-enter" style="position:absolute;left:0;right:0;bottom:0;padding:16px;border-radius:24px 24px 0 0;background:var(--plinko-popup-surface);box-shadow:var(--shadow-sheet);display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;align-items:center;gap:12px"><span class="reward-art reward-art--sm has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}img-reward-free-spins@2x.webp" alt=""></span><b class="gold-text" style="font-size:20px;text-transform:uppercase">Big win!</b></div>
      <button class="button button--primary button--md button--block"><span class="button__label">Drop again</span></button></div></div>`;
      later(stage, 1600, () => {
        const s = stage.querySelector(".win-sheet-demo");
        s.classList.replace("anim-sheet-enter", "anim-sheet-exit");
      });
    },
    count(stage) {
      stage.innerHTML = `<div style="text-align:center"><b class="tabular" style="font-size:44px;color:var(--plinko-reward-amount)">0</b><div style="color:var(--plinko-reward-amount);font-weight:700;text-transform:uppercase">Free Spins</div></div>`;
      const el = stage.querySelector("b"), to = 30, ms = 700 / Number(stage.dataset.rate || 1);
      if (reducedOn(stage)) {
        el.textContent = to;
        return;
      }
      const t0 = performance.now();
      let last = -1;
      const step = (now) => {
        const k = Math.min((now - t0) / ms, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        const tk = Math.floor(k * 12);
        if (tk !== last) {
          last = tk;
          sound.play("coin-tick", { count: tk });
        }
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    modal(stage) {
      stage.innerHTML = `<div class="anim-modal-enter" style="width:260px;padding:16px;border-radius:16px;background:var(--plinko-popup-surface);box-shadow:var(--shadow-popover);text-align:center"><b class="pink-text" style="font-size:28px;text-transform:uppercase">Mega win!</b>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px">${["img-reward-free-spins", "img-reward-gold-coins", "img-reward-collectable-rare"].map((n, i) => `<div class="reward-tile anim-modal-enter" style="animation-delay:${150 * (i + 1)}ms"><img class="reward-icon" src="${IMG}${n}@2x.webp" alt=""><span class="reward-tile__amount">${["150", "24K", "1"][i]}</span></div>`).join("")}</div></div>`;
    },
    rays(stage) {
      stage.innerHTML = `<span class="reward-art reward-art--lg has-rays" style="--s:120px"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}img-reward-chest-open@2x.webp" alt=""></span>`;
    },
    fx(stage) {
      stage.innerHTML = `<canvas class="fx-layer" style="position:absolute;inset:0;width:100%;height:100%"></canvas><b style="color:var(--on-surface-muted)">${reducedOn(stage) ? "Hidden with reduced motion" : "Coins and confetti"}</b>`;
      if (reducedOn(stage)) return;
      const c = stage.querySelector("canvas");
      const fx = createFx(c, { base: IMG });
      later(stage, 100, () => {
        const r = c.getBoundingClientRect();
        fx.play("mega", r.width / 2, r.height * 0.7);
      });
    },
    winnings(stage) {
      stage.innerHTML = `<div style="display:flex;gap:8px;align-items:flex-end;padding-top:24px"><span class="ticket-tab">${icon("ticket", "sm")}<span>3 tickets</span></span><span class="ticket-tab winnings-tab" style="position:relative">${icon("gift", "sm")}<span class="wt">Won 15 FS</span><span class="ticket-tab__gain">+30</span></span></div>`;
      later(stage, 400, () => {
        const t = stage.querySelector(".winnings-tab");
        t.classList.add("is-gained");
        later(stage, 300, () => {
          t.querySelector(".wt").textContent = "Won 45 FS";
        });
      });
    },
    summary(stage) {
      stage.innerHTML = `<div style="position:relative;width:320px;height:220px;overflow:hidden;border-radius:16px;background:var(--surface-container-default)"><div class="anim-sheet-enter" style="position:absolute;left:0;right:0;bottom:0;padding:16px;border-radius:24px 24px 0 0;background:var(--plinko-popup-surface);box-shadow:var(--shadow-sheet);display:flex;flex-direction:column;gap:8px">
      <b class="gold-text" style="font-size:20px;text-transform:uppercase">Your winnings</b>
      <div style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:12px;background:var(--plinko-list-row-surface)"><img src="${IMG}img-reward-free-spins@2x.webp" style="width:40px" alt=""><b style="flex:1">Free Spins</b><b style="color:var(--on-surface-accent)">45</b></div>
      <button class="button button--primary button--md button--block"><span class="button__label">Keep playing</span></button></div></div>`;
    },
    timer(stage) {
      stage.innerHTML = `<div class="timer" style="width:300px"><span class="timer__ring"><svg viewBox="0 0 44 44"><circle class="track" cx="22" cy="22" r="19"/><circle class="fill" cx="22" cy="22" r="19" style="stroke-dasharray:119.4;stroke-dashoffset:30"/></svg>${icon("clock", "sm")}</span><span><span class="timer__label">Next free ticket</span><span class="timer__digits">00:00:03</span></span></div>`;
      const d = stage.querySelector(".timer__digits"), f = stage.querySelector(".fill");
      [2, 1, 0].forEach((s, i) => later(stage, 600 + i * 700, () => {
        d.textContent = "00:00:0" + s;
        f.style.strokeDashoffset = 30 - (i + 1) * 10;
      }));
      later(stage, 2900, () => {
        stage.querySelector(".timer").classList.add("is-ready");
        d.textContent = "Ready!";
        f.style.strokeDashoffset = 0;
      });
    }
  };
  function runDemo(stage) {
    const fn = DEMOS[stage.dataset.demo];
    if (!fn) return;
    stage.innerHTML = "";
    requestAnimationFrame(() => {
      fn(stage);
      applyRate(stage);
    });
  }
  function binHTML(b) {
    const c = b.edge ? icon(b.icon, "sm") : b.gc ? icon("coin", "xs") + b.amount : b.amount;
    return `<div class="bin" data-heat="${b.heat}"><span class="bin-content${b.edge ? " bin-content--edge" : b.gc ? " bin-content--gc" : ""}">${c}</span></div>`;
  }
  function reshuffle(stage, row, risk) {
    const bins = binsFor(risk), red = reducedOn(stage), pool = RISK_ORDER.flatMap((r) => binsFor(r));
    const cs = getComputedStyle(stage), ms = (n, fb) => {
      const v = cs.getPropertyValue(n).trim();
      return v ? parseFloat(v) * (v.endsWith("ms") ? 1 : 1e3) : fb;
    };
    const dur = ms("--motion-bins-reel-duration", 800), step = ms("--motion-bins-reel-stagger-duration", 90), easing = cs.getPropertyValue("--motion-bins-reel-easing").trim() || "ease-out";
    const inner = (b) => {
      const t = document.createElement("div");
      t.innerHTML = binHTML(b);
      return t.firstElementChild.innerHTML;
    };
    [...row.children].forEach((el, i) => {
      const b = bins[i], apply = () => {
        el.dataset.heat = b.heat;
        el.innerHTML = inner(b);
      };
      if (red || !el.animate) {
        apply();
        return;
      }
      const d = Math.abs(i - 4), n = 7 + 2 * d, h = el.clientHeight || 40;
      const items = [el.innerHTML];
      for (let k = 0; k < n; k++) items.push(inner(pool[(i * 7 + k * 5 + d) % pool.length]));
      items.push(inner(b), inner(pool[(i + 3) % pool.length]));
      el.innerHTML = `<span class="bin-reel" style="--reel-h:${h}px"><span class="bin-reel__strip">${items.join("")}</span></span>`;
      const to = -(n + 1) * h, t = dur + d * step;
      const a = el.querySelector(".bin-reel__strip").animate([{ transform: "translateY(0)", filter: "blur(0)" }, { transform: `translateY(${to * 0.25}px)`, filter: "blur(1.2px)", offset: 0.2 }, { transform: `translateY(${to * 0.85}px)`, filter: "blur(0.6px)", offset: 0.7 }, { transform: `translateY(${to}px)`, filter: "blur(0)" }], { duration: t, easing, fill: "forwards" });
      later(stage, t * 0.6, () => {
        el.dataset.heat = b.heat;
      });
      a.onfinish = () => {
        apply();
        el.classList.remove("is-reel-stop");
        void el.offsetWidth;
        el.classList.add("is-reel-stop");
      };
    });
  }
  function riskSelectorHTML(sel) {
    const chart = (r) => {
      const h = (b) => 12 + 88 * Math.log(b.m / 0.2) / Math.log(30 / 0.2);
      return `<svg class="risk-chart" viewBox="0 0 54 14">${binsFor(r).map((b, i) => {
        const v = h(b) * 0.14;
        return `<rect x="${(i * 6.1).toFixed(1)}" y="${(14 - v).toFixed(1)}" width="4.6" height="${v.toFixed(1)}" rx="1" data-heat="${b.heat}" style="--d:${Math.abs(i - 4)}"/>`;
      }).join("")}</svg>`;
    };
    return `<div class="risk-selector" style="width:330px"><div class="risk-selector__track" role="radiogroup" aria-label="Risk"><span class="risk-selector__thumb"></span>${RISK_ORDER.map((r) => `<button class="risk-segment" role="radio" aria-checked="${r === sel}" data-r="${r}"><span class="risk-segment__label">${RISK[r].label}</span>${chart(r).replace('class="risk-chart"', `class="risk-chart${r === sel ? " is-selected" : ""}"`)}</button>`).join("")}</div><p class="risk-selector__caption">${RISK[sel].caption}</p></div>`;
  }
  function setRiskDemo(sel, r) {
    const i = RISK_ORDER.indexOf(r);
    sel.querySelector(".risk-selector__track").style.setProperty("--i", i);
    sel.querySelectorAll(".risk-segment").forEach((s) => {
      const on = s.dataset.r === r;
      s.setAttribute("aria-checked", on);
      s.querySelector(".risk-chart").classList.toggle("is-selected", on);
    });
    const cap = sel.querySelector(".risk-selector__caption");
    cap.style.opacity = 0;
    setTimeout(() => {
      cap.textContent = RISK[r].caption;
      cap.style.opacity = 1;
    }, 150);
  }
  function miniFrame(cls = "") {
    return `<div class="frame ${cls}" style="width:240px;height:150px;display:flex"><div class="frame__board" style="flex:1"></div><div class="frame__bulbs"></div></div>`;
  }
  function placeBulbs(stage) {
    const f = stage.querySelector(".frame"), W = 240, H = 150, o = 11, pts = [], nx = 9, ny = 6;
    for (let i = 1; i < nx; i++) pts.push([o + i * (W - 2 * o) / nx, o]);
    for (let j = 1; j < ny; j++) pts.push([W - o, o + j * (H - 2 * o) / ny]);
    for (let i = nx - 1; i > 0; i--) pts.push([o + i * (W - 2 * o) / nx, H - o]);
    for (let j = ny - 1; j > 0; j--) pts.push([o, o + j * (H - 2 * o) / ny]);
    f.querySelector(".frame__bulbs").innerHTML = pts.map((p, i) => `<i class="bulb ${i % 2 ? "bulb--gold" : "bulb--pink"}" style="left:${p[0]}px;top:${p[1]}px;--odd:${i % 2};--n:${i % 4}"></i>`).join("");
  }
  function drawBoard(canvas, geo, state) {
    const c = canvas.getContext("2d"), dpr = canvas.width / geo.W;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, geo.W, geo.H);
    const now = performance.now();
    binsFor(state.risk || "medium").forEach((b2, k) => {
      const x = geo.binCenters[k] - geo.s / 2 + 2, w = geo.s - 4;
      c.fillStyle = cssVar(`--plinko-bin-${b2.heat}-bg`) || "#555";
      c.globalAlpha = state.bin === k && state.landed ? 1 : 0.75;
      c.beginPath();
      c.roundRect(x, geo.binTop, w, geo.binH, 4);
      c.fill();
      c.globalAlpha = 1;
    });
    if (state.path) {
      c.strokeStyle = "rgba(250,17,79,0.45)";
      c.setLineDash([3, 4]);
      c.beginPath();
      state.path.forEach((p, i) => i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y));
      c.stroke();
      c.setLineDash([]);
    }
    for (const row of geo.rows) for (const p of row) {
      const h = state.hits?.get(p.r + ":" + p.j), k = h ? Math.max(0, 1 - (now - h) / 300) : 0;
      c.fillStyle = k > 0 ? cssVar("--plinko-peg-hit") : cssVar("--plinko-peg-idle");
      c.shadowColor = c.fillStyle;
      c.shadowBlur = 4 + 8 * k;
      c.beginPath();
      c.arc(p.x, p.y, PHYSICS.pegRadius * geo.scale * (1 + 0.25 * k), 0, 7);
      c.fill();
    }
    c.shadowBlur = 0;
    (state.trail || []).forEach((p, i, a) => {
      c.globalAlpha = (i + 1) / (a.length + 1) * 0.35;
      c.fillStyle = cssVar("--plinko-ball-fill");
      c.beginPath();
      c.arc(p.x, p.y, PHYSICS.ballRadius * geo.scale * 0.8, 0, 7);
      c.fill();
    });
    c.globalAlpha = 1;
    const b = state.pos || { x: geo.cx, y: geo.startY };
    c.shadowColor = "rgba(253,208,74,.8)";
    c.shadowBlur = 14;
    c.fillStyle = cssVar("--plinko-ball-fill");
    c.beginPath();
    c.arc(b.x, b.y, PHYSICS.ballRadius * geo.scale, 0, 7);
    c.fill();
    c.shadowBlur = 0;
  }
  function playDrop(canvas, W, H, k, opts = {}) {
    const geo = geometry(W, H), random = rng(opts.seed || Math.random() * 1e9 | 0);
    const drop = buildDrop(geo, k, random), events = drop.events.slice();
    const state = { risk: opts.risk || "medium", hits: /* @__PURE__ */ new Map(), trail: [], bin: k, path: opts.showPath ? [] : null };
    if (opts.showPath) for (let t2 = 0; t2 <= drop.duration; t2 += 0.01) state.path.push(sample(drop, t2));
    const rate = opts.rate || 1, reduced = !!opts.reduced;
    let t = 0, last = performance.now();
    const step = (now) => {
      const dt = Math.min((now - last) / 1e3, 0.05) * rate;
      last = now;
      t += dt * timeScaleAt(drop, t, reduced);
      while (events.length && events[0].t <= t) {
        const e = events.shift();
        if (e.type === "peg") {
          state.hits.set(e.row + ":" + e.j, now);
          if (opts.sound) sound.play("peg-hit", { row: e.row });
        }
        if (e.type === "land") {
          state.landed = true;
          if (opts.sound) sound.play("bin-land", { heat: binsFor(state.risk)[k].heat });
        }
      }
      state.pos = sample(drop, Math.min(t, drop.duration));
      if (!reduced) {
        state.trail.push({ x: state.pos.x, y: state.pos.y });
        if (state.trail.length > 8) state.trail.shift();
      }
      drawBoard(canvas, geo, state);
      if (t < drop.duration + 0.4) requestAnimationFrame(step);
      else {
        state.trail = [];
        drawBoard(canvas, geo, state);
      }
    };
    requestAnimationFrame(step);
  }
  function dropDemo(stage) {
    stage.innerHTML = '<canvas width="560" height="560" style="width:280px;height:280px;border-radius:12px;background:var(--gradient-frame-board)"></canvas>';
    const k = decideOutcome("medium", Math.random);
    playDrop(stage.querySelector("canvas"), 280, 280, k.index, { rate: Number(stage.dataset.rate || 1), reduced: reducedOn(stage) });
  }
  function choreography() {
    const max = 3.6, pct = (t) => t / max * 100;
    const lanes = [["Visual", 22, "var(--gold-300)"], ["Sound", 48, "var(--magenta-400)"], ["Haptic", 74, "var(--blue-400)"]];
    let html = lanes.map(([l, y]) => `<span class="lbl" style="top:${y}px">${l}</span><span class="lane" style="top:${y}px"></span>`).join("");
    html += `<span class="slow" style="left:calc(70px + (100% - 82px) * ${pct(1.22) / 100});width:calc((100% - 82px) * ${(pct(2.52) - pct(1.22)) / 100})"></span>`;
    CHOREOGRAPHY.forEach((r) => lanes.forEach(([l, y, c], i) => {
      const v = [r.visual, r.sound, r.haptic][i];
      if (v) html += `<span class="mark" title="${esc(r.t + " s: " + v)}" style="top:${y}px;left:calc(70px + (100% - 82px) * ${pct(r.t) / 100});background:${c}"></span>`;
    }));
    [0, 1, 2, 3].forEach((s) => {
      html += `<span class="axis" style="left:calc(70px + (100% - 82px) * ${pct(s) / 100})">${s} s</span>`;
    });
    $("#tl-track").innerHTML = html;
    $("#timeline").innerHTML = `<div class="tl-row is-head"><span>Time</span><span>Visual</span><span>Sound</span><span>Haptic</span></div>` + CHOREOGRAPHY.map((r) => `<div class="tl-row"><b>${r.t.toFixed(2)} s</b><span>${esc(r.visual)}</span><span>${esc(r.sound) || "\u2013"}</span><span>${esc(r.haptic) || "\u2013"}</span></div>`).join("");
  }
  function soundTable() {
    $("#sound-table").innerHTML = `<table class="tbl"><thead><tr><th></th><th>Event</th><th>Trigger</th><th>Source</th><th>Length</th><th>Volume, pitch</th><th>Recipe</th></tr></thead><tbody>${SOUND_MAP.map((s) => `<tr><td><button class="icon-button" type="button" data-sfx="${s.id}" aria-label="Play ${esc(s.event)}" style="width:36px;height:36px">${icon("arrow-right", "sm", "icon--accent")}</button></td><td><b style="color:var(--on-surface-default)">${esc(s.event)}</b><br><code>${s.id}</code></td><td>${esc(s.trigger)}</td><td>${s.source === "file" ? `File<br><code>${s.file}</code>` : "Web Audio"}</td><td>${esc(s.length)}${s.loop ? ", loop" : ""}</td><td>${s.volume}<br>${esc(s.pitch)}</td><td>${esc(s.recipe)}</td></tr>`).join("")}</tbody></table>`;
    $("#sound-table").addEventListener("click", async (e) => {
      const b = e.target.closest("[data-sfx]");
      if (!b) return;
      await sound.unlock();
      const id = b.dataset.sfx;
      if (id === "ambient") {
        sound.startAmbient();
        setTimeout(() => sound.stopAmbient(), 5e3);
        return;
      }
      if (id === "peg-hit") {
        for (let r = 0; r < 8; r++) setTimeout(() => sound.play("peg-hit", { row: r }), r * 180);
        return;
      }
      if (id === "coin-tick") {
        for (let i = 0; i < 12; i++) setTimeout(() => sound.play("coin-tick", { count: i }), i * 58);
        return;
      }
      if (id === "risk-change") {
        RISK_ORDER.forEach((l, i) => setTimeout(() => sound.play("risk-change", { level: l }), i * 300));
        return;
      }
      if (id === "bin-land") {
        ["cold", "warm", "mega"].forEach((h, i) => setTimeout(() => sound.play("bin-land", { heat: h }), i * 700));
        return;
      }
      if (id === "ui-toggle") {
        sound.play("ui-toggle", { on: true });
        setTimeout(() => sound.play("ui-toggle", { on: false }), 300);
        return;
      }
      sound.play(id);
    });
  }
  function hapticsTable() {
    $("#haptics-note").textContent = HAPTICS_NOTE;
    $("#haptics-support").innerHTML = haptics.supported ? '<span class="chip">This device can vibrate: press Try.</span>' : `<span class="chip">This browser can't vibrate (for example iOS Safari or desktop). The bars show each pattern: pink = vibrate, gap = pause.</span>`;
    $("#haptics-table").innerHTML = `<table class="tbl"><thead><tr><th></th><th>Event</th><th>Trigger</th><th>Pattern (ms)</th><th>iOS</th><th>Android</th><th>Notes</th></tr></thead><tbody>${HAPTICS.map((h) => {
      const p = Array.isArray(h.pattern) ? h.pattern : [h.pattern];
      const bars = p.map((ms, i) => `<i style="display:inline-block;height:10px;width:${Math.max(2, ms / 2)}px;margin-right:1px;border-radius:2px;background:${i % 2 ? "transparent" : "var(--magenta-500)"}"></i>`).join("");
      return `<tr><td><button class="pill" type="button" data-hap="${h.id}" style="min-height:32px;padding:0 12px">Try</button></td><td><b style="color:var(--on-surface-default)">${esc(h.event)}</b><br><code>${h.id}</code></td><td>${esc(h.trigger)}</td><td><code>${p.join(", ")}</code><br>${bars}</td><td>${esc(h.ios)}</td><td>${esc(h.android)}</td><td>${esc(h.notes || "")}</td></tr>`;
    }).join("")}</tbody></table>`;
    $("#haptics-table").addEventListener("click", (e) => {
      const b = e.target.closest("[data-hap]");
      if (b) haptics.play(b.dataset.hap);
    });
  }
  function physics() {
    const rows = [["gravity", PHYSICS.gravity + " px/s\xB2", "At s = 33.6 px. Scaled with the board."], ["restitution", PHYSICS.restitution.join(" to "), "Random per bounce, vertical only"], ["contactOffset", PHYSICS.contactOffset.join(" to ") + " px", "How far from the peg top the ball touches"], ["pegRadius", PHYSICS.pegRadius + " px", "plinko/peg is 8 px"], ["ballRadius", PHYSICS.ballRadius + " px", "plinko/ball is 20 px"], ["slowMoRows", PHYSICS.slowMoRows, "Last rows in slow motion"], ["slowMoScale", PHYSICS.slowMoScale, "Time scale in slow motion"], ["settleHops", PHYSICS.settleHops, "Small hops in the bin"], ["spacing s", PHYSICS.baseSpacing + " px", "Between pegs at 390 px (Figma)"], ["row gap", PHYSICS.baseRowGap + " px", "Between rows (Figma)"]];
    $("#physics-constants").innerHTML = `<table class="tbl"><thead><tr><th>Constant</th><th>Value</th><th>Note</th></tr></thead><tbody>${rows.map((r2) => `<tr><td><code>${r2[0]}</code></td><td>${r2[1]}</td><td>${r2[2]}</td></tr>`).join("")}</tbody></table>`;
    const canvas = $("#mini");
    $("#mini-tools").innerHTML = `<button type="button" data-k="random">Drop (real odds)</button>${[0, 2, 4].map((k) => `<button type="button" data-k="${k}">To bin ${k + 1}</button>`).join("")}<button type="button" data-k="path" aria-pressed="false">Show path</button>`;
    let showPath = false;
    drawBoard(canvas, geometry(300, 330), { risk: "medium" });
    $("#mini-tools").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      sound.unlock();
      if (b.dataset.k === "path") {
        showPath = !showPath;
        b.setAttribute("aria-pressed", showPath);
        return;
      }
      const k = b.dataset.k === "random" ? decideOutcome("medium", Math.random).index : Number(b.dataset.k);
      playDrop(canvas, 300, 330, k, { showPath, sound: true });
    });
    const r = rng(2026), N = 1e4, c = Array(9).fill(0);
    for (let i = 0; i < N; i++) c[decideOutcome("high", r).index]++;
    const max = Math.max(...c);
    $("#histo").innerHTML = c.map((n, k) => `<div data-l="${(n / N * 100).toFixed(1)}%" style="height:${n / max * 100}%"><i style="bottom:${BIN_CHANCE[k] * N / max * 100}%"></i></div>`).join("");
    const chi = c.reduce((s, n, k) => s + (n - BIN_CHANCE[k] * N) ** 2 / (BIN_CHANCE[k] * N), 0);
    $("#histo-note").innerHTML = `Chi-square = ${chi.toFixed(1)} with 8 degrees of freedom (below 15.5 means no evidence of bias at the 5 % level).`;
  }
  function prizes() {
    $("#ev").innerHTML = `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Risk</th><th>Bins, edge to centre (m)</th><th class="num">EV (units)</th><th class="num">EV</th></tr></thead><tbody>${RISK_ORDER.map((r) => {
      const b = binsFor(r).slice(0, 5);
      return `<tr><td>${RISK[r].label}</td><td>${b.map((x) => `${x.m}x`).join(", ")}</td><td class="num">${expectedValue(r).toFixed(3)}x</td><td class="num">\u2248 ${(expectedValue(r) * BASE_PRIZE.amount).toFixed(1)} FS</td></tr>`;
    }).join("")}</tbody></table></div>`;
    $("#prize-tables").innerHTML = RISK_ORDER.map((r) => `<h4>${RISK[r].label}: ${RISK[r].caption}</h4><div class="tbl-wrap"><table class="tbl odds"><thead><tr><th aria-hidden="true"></th><th>Prize</th><th>m</th><th>Tier</th><th class="num">Chance</th><th class="num">P \xD7 m</th></tr></thead><tbody>${oddsTable(r).map((o) => `<tr><td style="width:46px"><span class="odds__chip" data-heat="${o.bin.heat}">${o.bin.edge ? icon(o.bin.icon, "sm") : o.bin.gc ? icon("coin", "xs") + o.bin.amount : o.bin.amount}</span></td><td><b>${o.bin.label}</b><small>${o.bins}${o.bin.edge ? ": " + o.bin.contents.map((c) => c.amount + " " + c.label).join(" + ") : ""}</small></td><td>${o.bin.m}x</td><td>${o.bin.tier}</td><td class="num">${fmtPct(o.chance)}<small>1 in ${o.oneIn}</small></td><td class="num">${(o.chance * o.bin.m).toFixed(3)}</td></tr>`).join("")}</tbody></table></div>`).join("");
  }
  var st = (label, html) => `<div class="state">${html}<small>${label}</small></div>`;
  var btn = (cls, label, extra = "", sub = "") => `<button class="button ${cls}" type="button" ${extra}><span class="button__label">${label}</span>${sub ? `<span class="button__sublabel">${sub}</span>` : ""}${cls.includes("is-loading") ? '<span class="spinner spinner--md"></span>' : ""}</button>`;
  var COMPONENTS = [
    { id: "icon", name: "plinko/icon/*", code: ".icon.icon--{name}.icon--{size}", desc: "17 icons in 5 sizes. Reward icons have two sparkles in --sparkle.", demo: () => ["xs", "sm", "md", "lg", "xl"].map((s) => st(s, icon("gift", s))).join(""), a11y: "Decorative icons get aria-hidden. Icon-only buttons need an aria-label." },
    { id: "spinner", name: "plinko/spinner", code: ".spinner.spinner--md", desc: "Loading indicator. Sizes match the icon sizes, so it can replace an icon.", demo: () => ["xs", "sm", "md", "lg", "xl"].map((s) => st(s, `<span class="spinner spinner--${s}"></span>`)).join(""), a11y: 'The busy element gets aria-busy="true".' },
    { id: "button", name: "plinko/button", code: ".button.button--primary.button--lg", desc: "Primary is the one main action (Drop, Drop again, Play games). Neutral is a second action. L has two lines (label + sublabel). Pulse invites a tap; it is the only glow in the system.", demo: () => [st("Primary L, Pulse", btn("button--primary button--lg is-pulse", "Drop", 'style="width:220px"', "5 tickets left")), st("Pressed", btn("button--primary button--md is-pressed", "Drop again")), st("Disabled", btn("button--primary button--md", "Drop", "disabled")), st("Loading", btn("button--primary button--md is-loading", "Drop", 'aria-busy="true"')), st("Neutral", btn("button--neutral button--md", "Show welcome")), st("Neutral S", btn("button--neutral button--sm", "Small"))].join(""), a11y: "Native button. Loading keeps the width. Min height 44 px." },
    { id: "icon-button", name: "plinko/icon-button", code: ".icon-button.icon-button--md", desc: "Icon-only button with no plate: sound and close. M is 44 \xD7 44, L is 56 \xD7 56.", demo: () => [st("Default", `<button class="icon-button" aria-label="Close">${icon("close")}</button>`), st("Pressed", `<button class="icon-button is-pressed" aria-label="Close">${icon("close")}</button>`), st("Disabled", `<button class="icon-button" disabled aria-label="Close">${icon("close")}</button>`), st("L", `<button class="icon-button icon-button--lg" aria-label="Close">${icon("close", "lg")}</button>`), st("Sound off", `<button class="icon-button" aria-pressed="false" aria-label="Sound">${icon("sound-off")}</button>`)].join(""), a11y: "Always an aria-label. The sound button uses aria-pressed." },
    { id: "link", name: "plinko/link", code: ".link", desc: "Quiet text action: Close, Back to lobby.", demo: () => [st("Default", '<button class="link">Back to lobby</button>'), st("Disabled", '<button class="link" disabled>Close</button>')].join(""), a11y: "A button styled as a link, 44 px tall tap area." },
    { id: "risk-selector", name: "plinko/risk-selector, plinko/risk-segment, plinko/risk-chart", code: ".risk-selector, .risk-segment, .risk-chart", desc: "The volatility control. Three segments with a small value chart each (bar height = bin value on a log scale, 0.2x to 30x). The thumb slides; the caption says what the level does.", demo: () => st("Interactive: click or use arrow keys", riskSelectorHTML("low")) + st("Disabled during a drop", riskSelectorHTML("medium").replace('class="risk-selector"', 'class="risk-selector is-disabled"').replace(/<button class="risk-segment"/g, '<button disabled class="risk-segment"')), a11y: 'role="radiogroup" with role="radio" segments and aria-checked; roving tabindex, arrow keys move the choice.', wire: (el) => el.querySelectorAll(".risk-selector:not(.is-disabled)").forEach((sel) => sel.addEventListener("click", (e) => {
      const b = e.target.closest(".risk-segment");
      if (b) {
        setRiskDemo(sel, b.dataset.r);
        sound.play("risk-change", { level: b.dataset.r });
      }
    })) },
    { id: "bin", name: "plinko/bin, plinko/bin-content, plinko/bin-row", code: ".bin[data-heat].is-hit, .bin-row", desc: "A prize bin. Heat sets the colours. Content is a value, a GC value or an edge icon. States: Idle, Anticipation, Hit, Dimmed.", demo: () => [st("Idle (Medium row)", `<div class="bin-row" style="width:300px">${binsFor("medium").map(binHTML).join("")}</div>`), st("Anticipation, Hit, Dimmed", `<div style="display:flex;gap:8px">${["is-anticipation", "is-hit", "is-dimmed"].map((c) => `<div class="bin ${c}" data-heat="hot" style="width:40px"><span class="bin-content">30</span></div>`).join("")}</div>`)].join(""), a11y: "The bin row is a list; each bin has an aria-label with the full prize name." },
    { id: "chance-strip", name: "plinko/chance-strip, plinko/chance-bar", code: ".chance-strip .chance-bar.is-hit", desc: "The real chance of each bin. Bar height = 8 % + 92 % \xD7 (chance / centre chance). The same at every risk level.", demo: () => st("Landed bin 4 is Hit", `<div class="chance-strip" style="width:300px;height:94px">${BIN_CHANCE.map((p, i) => `<i class="chance-bar${i === 3 ? " is-hit" : ""}" style="--h:${8 + 92 * p / BIN_CHANCE[4]}%"></i>`).join("")}</div>`), a11y: "Decorative (aria-hidden). The odds are in the Rules and odds table." },
    { id: "frame", name: "plinko/frame, plinko/bulb, plinko/chute", code: ".frame.is-active / .is-dimmed / .is-flare / .is-celebrate, .bulb, .chute.is-releasing", desc: "Pink neon frame with 54 bulbs. Idle: calm twinkle. Active: running lights during a drop. Dimmed: bulbs off. Flare: bulbs flare before a big win sheet. Celebrate: the frame turns gold and every bulb flares gold before a mega takeover.", demo: () => [["", "Idle"], ["is-active", "Active"], ["is-dimmed", "Dimmed"], ["is-flare", "Flare"], ["is-celebrate", "Celebrate"]].map(([c, l]) => st(l, miniFrame(c))).join(""), after: (el) => el.querySelectorAll(".state").forEach((s) => placeBulbs(s)), a11y: "Decorative." },
    { id: "ticket-tab", name: "plinko/ticket-tab", code: ".ticket-tab.is-low / .is-empty / .is-gained", desc: "Ticket balance on the top edge of the frame. Low: the last ticket (orange outline and count). Not interactive: it only shows the balance, so the 44 px tap target rule does not apply.", demo: () => [st("Normal", `<span class="ticket-tab">${icon("ticket", "sm")}<span>5 tickets</span></span>`), st("Low", `<span class="ticket-tab is-low">${icon("ticket", "sm")}<span>1 ticket</span></span>`), st("Empty", `<span class="ticket-tab is-empty">${icon("ticket", "sm")}<span>0 tickets</span></span>`)].join(""), a11y: 'The count is aria-live="polite".' },
    { id: "board-tabs", name: "plinko/board-tabs", code: ".board-tabs (Won=false: .winnings-tab[hidden])", desc: "Tickets and winnings on the top edge of the board frame, centred, 4 px apart (--spacing-2xs). The Won property switches the winnings tab on after the first win of the session.", demo: () => [st("Won off", `<span class="board-tabs"><span class="ticket-tab">${icon("ticket", "sm")}<span>5 tickets</span></span></span>`), st("Won on", `<span class="board-tabs"><span class="ticket-tab">${icon("ticket", "sm")}<span>3 tickets</span></span><span class="ticket-tab winnings-tab" style="animation:none">${icon("gift", "sm")}<span>Won 45 FS \xB7 8K GC</span></span></span>`)].join(""), a11y: 'The ticket count and the winnings total are aria-live="polite".' },
    { id: "popup-header", name: "plinko/popup-header", code: ".popup-header", desc: "Sound button, gold PLINKO title, close.", demo: () => st("Sound on", `<header class="popup-header" style="width:340px"><button class="icon-button" aria-pressed="true" aria-label="Sound">${icon("sound-on")}</button><span class="popup-header__title">Plinko</span><button class="icon-button" aria-label="Close">${icon("close")}</button></header>`), a11y: "The title is the dialog label (aria-labelledby)." },
    { id: "prize-strip", name: "plinko/prize-strip", code: ".prize-strip.prize-strip--gift", desc: `Zigzag strip: today's prize, or the green "1 free ticket every day".`, demo: () => [st("Prize", `<div class="prize-strip" style="width:340px;--zig:var(--surface-default)">${icon("free-spins")}<span>Today:</span><span class="prize-strip__prize">Free Spins</span><span>(average 10 per drop)</span></div>`), st("Gift", '<div class="prize-strip prize-strip--gift" style="width:340px;--zig:var(--surface-default)">1 free ticket every day</div>')].join(""), a11y: "Plain text." },
    { id: "footer-link", name: "plinko/footer-link", code: ".footer-link", desc: "Rules and odds row under Drop. Quiet, no card.", demo: () => st("Default", `<button class="footer-link" style="width:340px">${icon("info", "md", "icon--accent")}<span class="footer-link__text"><span class="footer-link__title">Rules and odds</span><span class="footer-link__desc">Same average at every level: ~10 FS</span></span>${icon("arrow-right", "sm", "icon--muted")}</button>`), a11y: 'A button with aria-haspopup="dialog".' },
    { id: "toast", name: "plinko/toast", code: ".toast", desc: "Small win over the landed bin. The game does not stop.", demo: () => st("Small win", `<div style="position:relative;width:160px;height:48px"><div class="toast" style="left:50%;top:44px;animation:none"><span class="toast__amount">+10</span>Free Spins</div></div>`), a11y: 'role="status", so screen readers announce the prize.' },
    { id: "reward-art", name: "plinko/reward-art, plinko/reward-icon, plinko/reward-tile", code: ".reward-art.reward-art--lg.has-rays, .reward-tile", desc: "Prize picture for win screens, with optional rays for big and mega wins. Tiles list the contents of a mega prize.", demo: () => [st("S", `<span class="reward-art reward-art--sm"><img class="reward-icon" src="${IMG}img-reward-ticket@2x.webp" alt=""></span>`), st("M + rays", `<span class="reward-art has-rays"><span class="reward-art__rays"></span><img class="reward-icon" src="${IMG}img-reward-free-spins@2x.webp" alt=""></span>`), st("Tile", `<div class="reward-tile" style="width:104px"><img class="reward-icon" src="${IMG}img-reward-gold-coins@2x.webp" alt=""><span class="reward-tile__amount">24K</span><span class="reward-tile__label">Gold Coins</span></div>`)].join(""), a11y: 'Images are decorative (alt=""); the prize is in text.' },
    { id: "toggle", name: "plinko/toggle, plinko/checkbox, plinko/checkbox-row, plinko/setting-row", code: ".toggle[aria-checked], .checkbox, .checkbox-row, .setting-row", desc: `Switches for sound and vibration; a checkbox for "Don't show this again".`, demo: () => [st("Off / On", '<span style="display:flex"><button class="toggle" role="switch" aria-checked="false" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button><button class="toggle" role="switch" aria-checked="true" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button></span>'), st("Disabled", '<button class="toggle" role="switch" aria-checked="true" disabled aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></button>'), st("Checkbox row", `<label class="checkbox-row"><input class="checkbox" type="checkbox"><span>Don't show this again</span></label>`), st("Setting row", `<button class="setting-row" style="width:300px">${icon("sound-on")}<span>Sound</span><span class="toggle" role="switch" aria-checked="true" aria-label="Sound"><span class="toggle__track"><span class="toggle__knob"></span></span></span></button>`)].join(""), a11y: 'Toggle: button role="switch" with aria-checked. Checkbox: native input. The whole row is the tap area.', wire: (el) => el.querySelectorAll("button.toggle:not(:disabled)").forEach((t) => t.addEventListener("click", () => {
      t.setAttribute("aria-checked", t.getAttribute("aria-checked") !== "true");
      sound.play("ui-toggle", { on: t.getAttribute("aria-checked") === "true" });
    })) },
    { id: "tab-bar", name: "plinko/tab-bar, plinko/tab, plinko/pill-group, plinko/pill", code: ".tab-bar, .tab[aria-selected], .pill-group, .pill[aria-checked]", desc: "Drawer tabs with a sliding thumb; risk pills in Rules and odds.", demo: () => [st("Tab bar", `<div class="tab-bar" role="tablist" style="width:320px;--i:1"><span class="tab-bar__thumb"></span>${["How to play", "Chances", "Rules"].map((t, i) => `<button class="tab" role="tab" aria-selected="${i === 1}">${t}</button>`).join("")}</div>`), st("Pill group", `<div class="pill-group" role="radiogroup" style="width:320px">${["Low", "Medium", "High"].map((t, i) => `<button class="pill" role="radio" aria-checked="${i === 2}">${t}</button>`).join("")}</div>`)].join(""), a11y: 'role="tablist" / "tab" / "tabpanel"; arrow keys move between tabs. Pills are a radiogroup.' },
    { id: "list-row", name: "plinko/list-row, plinko/rules-item, plinko/info-note", code: ".list-row, .rules li, .info-note", desc: "Content rows for the welcome card and Rules and odds.", demo: () => [st("List row", `<div class="list-row" style="width:320px"><span class="list-row__disc">${icon("ticket", "sm")}</span><span><span class="list-row__title">Get tickets</span><span class="list-row__desc">1 ticket for every 50K GC played.</span></span></div>`), st("Rules", '<ul class="rules" style="width:320px"><li>Prizes go to My Rewards right away.</li><li>Need a break? Set limits in <b>Player Trust &amp; Safety Controls</b>.</li></ul>'), st("Info note", '<p class="info-note" style="width:320px">Chances are the same at every level. Average per drop: <b>about 10 FS</b>.</p>')].join(""), a11y: "Plain text in a list." },
    { id: "odds-row", name: "plinko/odds-row", code: ".odds tr, .odds__chip[data-heat]", desc: "A real table of prizes and chances.", demo: () => st("High", `<table class="odds" style="width:340px"><thead><tr><th aria-hidden="true"></th><th>Prize</th><th class="num">Chance</th></tr></thead><tbody>${oddsTable("high").slice(0, 3).map((o) => `<tr><td><span class="odds__chip" data-heat="${o.bin.heat}">${o.bin.edge ? icon(o.bin.icon, "sm") : o.bin.amount}</span></td><td><b>${o.bin.label}</b><small>${o.bins}</small></td><td class="num"><b>${fmtPct(o.chance)}</b><small>1 in ${o.oneIn}</small></td></tr>`).join("")}</tbody></table>`), a11y: "A native table with headers, so screen readers read prize and chance together." },
    { id: "timer", name: "plinko/timer, plinko/earn-line", code: ".timer.is-ready, .earn-line", desc: "Countdown to the next free ticket, shown instead of Drop with 0 tickets. No buy button.", demo: () => [st("Counting", `<div class="timer" style="width:300px"><span class="timer__ring"><svg viewBox="0 0 44 44"><circle class="track" cx="22" cy="22" r="19"/><circle class="fill" cx="22" cy="22" r="19" style="stroke-dasharray:119.4;stroke-dashoffset:94"/></svg>${icon("clock", "sm")}</span><span><span class="timer__label">Next free ticket</span><span class="timer__digits">05:12:33</span></span></div>`), st("Earn line", `<p class="earn-line">${icon("ticket", "sm")}<span>Tickets also come as you play<small>1 ticket for every 50K GC played</small></span></p>`)].join(""), a11y: 'role="timer"; announced only when Ready. Tabular figures so digits do not jump.' },
    { id: "winnings-tab", name: "plinko/winnings-tab", code: ".ticket-tab.winnings-tab.is-gained", desc: "The winnings pool: everything won in this session. Lives inside plinko/board-tabs (Won property). Text properties: Total and Gain. Hidden until the first win; every prize flies into it with a gold +N. Tap opens the session summary.", demo: () => [st("Default", `<span class="ticket-tab winnings-tab" style="animation:none">${icon("gift", "sm")}<span>Won 45 FS \xB7 8K GC</span></span>`), st("Next to the tickets", `<span style="display:flex;gap:8px"><span class="ticket-tab">${icon("ticket", "sm")}<span>3 tickets</span></span><span class="ticket-tab winnings-tab" style="animation:none">${icon("gift", "sm")}<span>Won 45 FS</span></span></span>`)].join(""), a11y: 'A button with aria-haspopup="dialog"; the total is aria-live="polite".' },
    { id: "summary-row", name: "plinko/summary-row", code: ".summary-row", desc: "One prize type in the session summary: icon, name, number of wins, total.", demo: () => [st("Summary row", `<div class="summary-row" style="width:320px"><img class="reward-icon" style="width:48px;height:48px" src="${IMG}img-reward-gold-coins@2x.webp" alt=""><span class="summary-row__name">Gold Coins<small>1 win</small></span><span class="summary-row__amount">8K</span></div>`)].join(""), a11y: 'The toast is role="status".' },
    { id: "status-art", name: "plinko/status-art", code: ".status-art > img", desc: "Art for system states. Cool colours, no gold: nothing here should look like a reward.", demo: () => st("Offline", `<img class="status-art" src="${IMG}img-status-offline@2x.webp" alt="">`), a11y: "Decorative; the message is in text." },
    { id: "scrim", name: "plinko/scrim", code: ".scrim.scrim--blur-high.scrim--center", desc: "Dimmed, blurred layer under every overlay. Blur Low, Medium, High; align Center or Bottom.", demo: () => ["low", "medium", "high"].map((b) => st("Blur " + b, `<div style="position:relative;width:120px;height:90px;border-radius:12px;overflow:hidden;background:conic-gradient(var(--magenta-500),var(--gold-300),var(--blue-500),var(--magenta-500))"><div class="scrim scrim--blur-${b}"></div></div>`)).join(""), a11y: "Not focusable. Focus stays in the overlay above it." }
  ];
  function components() {
    const css = components_default.replace(/\}/g, "}\n");
    const tokensFor = (classes) => {
      const set = /* @__PURE__ */ new Set();
      for (const rule of css.split("\n")) {
        if (classes.some((c) => rule.includes("." + c))) for (const m of rule.matchAll(/var\((--[\w-]+)/g)) set.add(m[1]);
      }
      return [...set];
    };
    $("#nav-components").innerHTML = COMPONENTS.map((c) => `<a href="#c-${c.id}">${c.name.split(",")[0].replace("plinko/", "").replace("/*", "")}</a>`).join("");
    $("#component-list").innerHTML = COMPONENTS.map((c) => {
      const classes = [...c.code.matchAll(/\.([a-z][\w-]*)/g)].map((m) => m[1]).filter((x) => !x.startsWith("is-") && !x.includes("--"));
      const toks = tokensFor([...new Set(classes)]);
      return `<article class="comp" id="c-${c.id}"><h3>${esc(c.name)}</h3><div class="meta"><span class="chip">Code <code>${esc(c.code)}</code></span></div><p>${esc(c.desc)}</p>
      <div class="stage" data-token-mode="mobile">${c.demo()}</div>
      <h4>Accessibility</h4><p>${esc(c.a11y)}</p>
      ${toks.length ? `<details><summary style="cursor:pointer;color:var(--on-surface-muted);margin-top:8px">Tokens used (${toks.length})</summary><p style="margin-top:6px">${toks.map((t) => `<code>${t}</code>`).join(" ")}</p></details>` : ""}</article>`;
    }).join("");
    COMPONENTS.forEach((c) => {
      const el = $("#c-" + c.id);
      c.after?.(el);
      c.wire?.(el);
    });
  }
  function nav() {
    const links = [...document.querySelectorAll('.docs-nav a[href^="#"]:not(.docs-nav__brand)')];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-10% 0px -80% 0px" });
    document.querySelectorAll("main section, .comp").forEach((s) => io.observe(s));
    const btn2 = $("#menu-btn"), navEl = $("#docs-nav");
    btn2.addEventListener("click", () => {
      const open = !navEl.classList.contains("is-open");
      navEl.classList.toggle("is-open", open);
      btn2.setAttribute("aria-expanded", open);
    });
    navEl.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        navEl.classList.remove("is-open");
        btn2.setAttribute("aria-expanded", false);
      }
    });
  }
  (async function init() {
    await loadTokens();
    stats();
    colour();
    typography();
    space();
    effects();
    icons();
    motion();
    choreography();
    soundTable();
    hapticsTable();
    physics();
    prizes();
    components();
    nav();
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
  })();
})();
