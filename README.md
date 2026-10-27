# Plinko reward engine

Senior Product Designer test task for B2Spin, by Mykhailo Nahlii.

- **Play the prototype:** https://pixelcore1.github.io/plinko/prototype/ (made for phones: open it on a phone, or in Chrome DevTools device mode as iPhone 16 Pro Max; sound on) I tested it on one real phone only, an iPhone 12 Pro Max, and in a desktop browser. On other devices there may be visual bugs.
- **Design system docs:** https://pixelcore1.github.io/plinko/design-system/
- **Figma file:** https://www.figma.com/design/EXcHZLG3O0BS12H0wqYm7i/B2Spin-Senior-Product-Designer-Test-Task

This file is my written walkthrough. Reading time: about 8 minutes.

## TL;DR

- **The game is honest by design.** The result is picked before the ball moves, with the real odds of an 8-row board. The ball then shows a real path to that bin. Risk changes the size of the prizes, never the chances. A chance strip above the bins stays the same at every level, so players can see this for themselves.
- **Every ticket is worth the same on average,** about 10 Free Spins (2K GC value), at Low, Medium and High. Every drop wins something. There is no buy button, no autoplay and no fake near miss.
- **The celebration grows with the win.** A small win is a toast and the game keeps going. A big win (1 in 16 on Medium and High) is a short sheet with a coin burst. A mega win (1 in 128) is a full-screen takeover with confetti. Every prize flies into a winnings pool on the board, and leaving with prizes shows a session summary.
- **The loop gives reasons to come back, not pressure.** Today's prize changes every day and a free ticket arrives every day. There is no buy button and no autoplay.
- **Anticipation comes from real events.** Peg sounds rise in pitch row by row. The last 2 rows play in slow motion, and only the bins the ball can still reach start to glow.
- **One system from Figma to code.** 545 variables and 65 styles with the same names in Figma and CSS, 71 components with states, and a docs site. The docs describe every animation, sound, vibration pattern, the physics and the prize maths, with live demos.

## How to try it

The prototype is made for phones. The best way to see it is on a phone. On a computer, open Chrome DevTools (F12), turn on the device toolbar (Ctrl+Shift+M) and pick **iPhone 16 Pro Max**, then reload the page. In a normal desktop window the game still works, but it shows the phone layout in the middle of a large screen.

**Tested devices.** I tested the prototype on one real phone only, an iPhone 12 Pro Max, and in a desktop browser. On other devices there may be visual bugs.

The game opens by itself over the homepage. Tap **Let's play**, pick a risk level and tap **Drop**. `prototype/index.html` also opens straight from the folder. Browsers block sound until the first tap, so on that first tap you hear the opening sound.

**Demo menu.** The **Demo** button at the bottom left is a tool for reviewers, not part of the game design. It opens a small panel. Any button in it does its job and closes the panel, so you see the result at once.

- **Random, Small, Big, Mega** pick the result of the next drops. The choice stays until you change it; Random uses the real odds. Mega wins are 1 in 128, so this is the quick way to see them. Big exists only on Medium and High.
- **+5 tickets, 0 tickets, Free ticket now** change the balance, so you can see the empty state with its countdown and the ticket arriving.
- **Reduced motion** switches the calmer motion on and off without changing your system settings.
- **Debug** shows every sound and vibration trigger and the decided result on screen.
- **First run again** shows the welcome card again, as for a new player.
- **Open Plinko** opens the game again after you close it. The homepage has no Plinko widget in this prototype.

## The problem as I saw it

A "secondary dopamine loop" in a social casino sits close to real gambling, so I set one rule early: **the game must be exciting without lying to the player.** Most Plinko games show multipliers below 1 ("x0.2") and use risk to change the odds. That felt wrong for a reward engine: the player didn't stake anything, they earned the ticket by playing. So the question was not "how much can you lose" but "how is the same value spread".

## Reward model and the prize formula

The board has 8 rows and 9 bins. At each row a fair ball goes left or right with p = 0.5, so the chance of each bin is binomial:

```
P(k) = C(8, k) / 2^8        k = 0 … 8 (left to right)
edge → centre: 0.39 %, 3.13 %, 10.94 %, 21.88 %, 27.34 %
```

Prizes are built on **today's prize**, which is the value unit: 1x = 10 Free Spins = 2K GC value. Every bin has a multiplier m, and the bin shows the amount, never the multiplier:

```
prize(k) = m(k) × today's prize           e.g. 1.5 × 10 FS = 15 FS
average per drop  EV = Σ P(k) × m(k)
```

| Risk | Edge bins | Inner bins, edge to centre | EV |
|---|---|---|---|
| Low | +3 tickets (3x) | 15, 11, 10, 8 FS | 1.01x |
| Medium | Gift box: 60 FS + 10K GC + collectable (12x) | 30, 13, 7, 5 FS | 1.01x |
| High | Treasure chest: 150 FS + 24K GC + rare collectable (30x) | 8K GC, 13, 4, 2 FS | 1.00x |

I balanced the edge prizes against real McLuck packs. My first value unit (1x = 10K GC) made the chest worth more than a $49.99 pack, which would compete with purchases, so I cut it by 5. On High, the bins next to the chests pay 8K GC: close to the day-7 login bonus and below the $4.99 pack.

**Win tiers** come from value, not position: mega = edge bin, big = 2x or more in an inner bin, small = the rest. The tier decides the size of the celebration.

## Risk selector: the risk/reward UI

Each risk segment has a tiny 9-bar chart of its prizes, so the player can compare the shapes before tapping. When the level changes, every bin spins like a slot reel and stops on its new prize, from the centre out. The colours move with them: dull slate for prizes below the base, then yellow, amber and red, and pink for the edges. I made small prizes look dull on purpose. A bright "2" would promise more than it gives.

The chance strip behind the bins never moves. That is the "bonus points" part of the brief for me: when you switch from Low to High, you see the prizes get more extreme while the bell of chances stays where it is.

The first open starts on Low. On Medium the most likely first result is 5 FS, which is a weak first moment.

## The drop

The result comes first (in production, from the server). Then the physics shows how the ball gets there. A ball that lands in bin k went right k times and left 8 − k times, so the engine shuffles those 8 moves at random. Every path to bin k is equally likely, exactly as on a real board, so I never need to steer the ball. Between pegs the ball flies under gravity and bounces a little (the model is in the docs, section Physics).

Anticipation is built in layers:

- Each peg contact flashes gold and plays a short pluck. The pitch rises row by row, so the sound itself tells you the ball is getting closer.
- At row 6 time slows to half speed. A riser sound starts and the bins the ball can still reach begin to glow.
- On landing the bin drops 3 px and pulses, its chance bar lights up, and the landing chime is brighter for hotter bins.

On Android each of these moments also has a vibration pattern. iOS Safari has no vibration API, so there the game simply doesn't vibrate.

## Result and loop

I used the peak-end rule here. A celebration that is the same for every result gets boring fast, and a small win doesn't deserve a modal.

- **Small:** a toast pops up over the bin and floats away with a soft sway. The Drop button is ready again at once.
- **Big:** the frame bulbs flare for 0.5 s, then a short sheet slides up with the reward art, rays, a count-up and a coin burst.
- **Mega:** the whole frame turns gold and every bulb flares for 0.8 s, then a full-screen takeover opens with the prize, its contents as tiles, confetti and the longest sound and vibration. The short pause before the reveal is the peak of the session.

"Drop again" is always the primary action while tickets remain. "Close" is a quiet text link. I used "Close", not "Collect and close", because the prize is already in My Rewards and the old label suggested you could lose it.

Every prize then flies into a **winnings pool**, a second tab next to the tickets on the board ("Won 45 FS · 8K GC"). Players always see what the session gave them. When they leave with prizes, a short **session summary** lists everything, says it is already in My Rewards and when the next free ticket comes, with "Keep playing" or "Back to lobby". "Back to lobby" closes the game and the player is on the homepage again. That closes the loop: nudge to drop again, or a clear exit back to the site.

With 0 tickets the risk selector and Drop are replaced by a countdown to the next free daily ticket, one quiet line about earning tickets in play, "Play games" and "Back to lobby". I didn't add a buy button or a "wager X more" bar. The daily free ticket is the reason to come back, and it is enough.

## How I approached gamification

The brief asks for retention and a reason to log in every day. I built the loop on reasons to come back, not on pressure.

The core loop is short: play games, earn tickets, drop, win, come back tomorrow.

- **Reasons to return.** Today's prize changes every day, and a free ticket arrives every day. With 0 tickets, a countdown shows when the next one comes.
- **Surprise with honest odds.** Players don't know which bin the ball will hit, and that is the fun. But the odds are real, open in Rules and odds, and the same at every risk level.
- **Control.** The risk selector lets players choose how a drop feels without changing what it is worth. Some players like steady small wins. Others like to chase the chest.
- **A clear peak.** Peg sounds rise in pitch, the last rows play in slow motion, and the celebration grows with the win.
- **Visible progress.** The winnings pool and the session summary show what the session gave, so small wins add up to something.

What I left out is part of the design too: no buy button, no autoplay, no "wager X more" bar, no fake near miss and no losing bins.

## Onboarding

One skippable card with three steps: where tickets come from, what risk does, and that every drop wins. The same content lives in Rules and odds, which opens on the Chances tab with every prize, its chance and "1 in N".

## Design system

The Figma file has 7 variable collections (with modes for Mobile and Desktop, Default and Reduced motion, and 6 bin heat levels), 30 text styles and 71 components with variants and states. The tickets and the winnings pool share one component, plinko/board-tabs, with a Won switch. Every variable has a CSS name, and a read-only script exports them, so `tokens.css` is generated, not hand-written. Reduced motion is a token mode, so `prefers-reduced-motion` is one media query.

Figma sections marked "no-code" (board, popup, sheets, cards, drawer) are compositions that live in the game code; the rest is the library. In the repo this is `design-system/` and `prototype/`, the game built from it.

The docs follow the structure of Adobe Spectrum, with more depth where a game needs it: 25 animations with live demos (replay, 0.25x, reduced motion), spec tables and code, one timeline of the drop with visual, sound and haptic tracks, a sound map you can play, haptic patterns, the physics and the prize maths.

## Process and tools

I worked in four phases: research, quick HTML mockups to compare ideas, the Figma library, then the code. All decisions in this file are mine. I used AI tools a lot and want to be clear about what each one did:

- **Claude (Anthropic):** research, HTML mockup variants, building the Figma variables and components through the Figma connector (each batch after my approval), the token export, this code and the docs. Separate Claude agents tested the prototype on phone and desktop sizes and reviewed it against the brief; the issues they found are fixed.
- **ChatGPT:** all images (ball, prize art, coins, error art) from prompts written to my style bible. I rejected the first round as too glossy and changed the bible.
- **ElevenLabs:** the key sound effects. Taps, peg hits and chimes are synthesised in code with Web Audio.

Every final prompt for the images and sounds, with the fixes that worked and why, is in `generation-prompts.md`.

## What I would do next

- Test with players: does the chance strip really explain risk, and does the slow motion feel exciting or slow after 20 drops?
- Set the real numbers with B2Spin: the value of a Free Spin, the ticket rate and the prize calendar by region.
- Production details: mount the game in a Shadow DOM inside the real page, add the server outcome API, and do a sound mix on real phones.
- Finish the small Figma clean-ups listed at the end of the docs.

## Credits and licences

Code: MIT (see `LICENSE`). Assets have their own terms (see `NOTICE.md`). Sound effects generated with ElevenLabs. Images generated with ChatGPT. Font: Ubuntu (Ubuntu Font Licence). The homepage screenshot behind the popup belongs to its owner and is used only to present this task.
