# Generation prompts: images and sounds

These are the final prompts behind every image and sound file in `design-system/assets/`. Claude wrote the prompts from my style bible. I ran them in ChatGPT (images) and ElevenLabs (sounds), chose the results and sent back the fixes. Claude checked each file and ran the export.

Where the first try was wrong, the fix prompt that worked is listed too, with the reason. The rejected tries are part of the story: most fixes are about one rule, keeping the set consistent at small sizes.

## Images (ChatGPT)

### What stays in code

The frame with its bulbs, pegs, bins, rays, confetti and glows are not images. They are drawn in CSS, SVG and canvas, so they stay sharp at every screen density and can react to the game state.

### How I ran them

1. One ChatGPT chat for all images, so the style stays the same.
2. McLuck style references (banner and landing page) attached at the start.
3. Each prompt is the STYLE block plus one OBJECT block.
4. The ball and the slot reel first. When they were right, the rest in the same chat.

Every image: square 1:1, transparent background, the object fills about 80% of the canvas, no text, no ground shadow.

### Asset list

| # | File | Use | Real size | Notes |
|---|---|---|---|---|
| 1 | img-ball | plinko/ball | 18 to 20 px | Try 1 rejected: a second highlight made the ball look dented |
| 2 | img-reward-free-spins | Reward icon Free Spins | 32 to 160 px | Style anchor for all rewards. Coins removed in a second step: they are separate images now |
| 3 | img-reward-gold-coins | Reward icon Gold Coins | 32 to 160 px | Try 1 rejected: the clover was turned like an X |
| 4 | img-reward-ticket | Edge bin on Low, reward icon Ticket | 28 to 160 px | Try 1 rejected: a magenta body did not match the set and disappeared on the pink edge bin |
| 5 | img-reward-gift-box | Edge bin on Medium, reward icon Gift Box | 28 to 160 px | Try 1 rejected: magenta box |
| 6 | img-reward-chest | Edge bin on High, reward icon Chest | 28 to 160 px | Cream panels rejected (looked like a jewellery box); honey-caramel wood approved |
| 7 | img-reward-collectable | Reward icon Collectable, mega tiles | 32 to 160 px | |
| 8 | img-reward-collectable-rare | Reward icon Rare Collectable, mega tiles | 32 to 160 px | Try 1 changed: a gold clover blended with the gold rim |
| 9a | img-coin-a | Tilted coin: reward icons, coin burst | 14 to 40 px | |
| 9b | img-coin-b | Front coin: reward icons, coin burst | 14 to 40 px | Tries 1 and 2 rejected: clover stem missing, then in the wrong place |
| 10 | img-reward-chest-open | Mega win art on High | 120 to 200 px | |
| 11 | img-status-offline | Error card art (connection lost) | 168 px | Own cool palette, so it never looks like a reward |

Checks for every image: real alpha (transparent corners), clean edges on #1C1C1C, no halo or white fringe, readable at real size, style matches #2.

### Rules that came out of the rejected tries

- **One highlight.** Satin, not chrome: one large soft highlight and an unbroken gradient. A second highlight makes a small object look dented.
- **Material rule.** Warm gold base, cream satin faces (the same cream as the slot reel face), magenta only as a small accent (the "7", the ticket star, the rare clover) or a thin rim light. Large coloured areas break the set and disappear on the pink edge bins. Wood is allowed where it makes the object recognisable (the chest), in a warm honey-caramel tone, never dark.
- **Clover rule.** Every four-leaf clover is in a plus layout (one leaf up, one down, one left, one right) with a short curved stem from the bottom middle of the lowest leaf. Without the stem it reads as a flower of four hearts. Turned like an X, there is no lowest leaf and the stem ends up between two leaves.
- **Pair rule.** Collectable has a green clover, Rare Collectable a magenta one. Gold on gold blends at small sizes, so colour carries the difference.

### STYLE block (style bible v1.1)

```
Stylised 3D cartoon render in the style of a modern family animated film: soft rounded shapes, slightly chunky proportions, friendly and playful. Satin and soft-enamel materials, NOT chrome or mirror: warm buttery gold with ONE large soft highlight and a smooth, unbroken shading gradient, no secondary hotspots, no blotchy or mottled patches, no environment reflections, no tiny specular noise. Soft warm key light from the upper left, a thin soft coloured rim light (emerald green or violet) on one edge that stays inside the silhouette, no glow or colour spill outside the edge. Clean readable silhouette with a clean crisp edge, no halo, no fringe pixels around the object. Simple forms, few details. Palette: warm gold, hot magenta-pink, emerald green, deep violet. One object only, centred, no text, no ground shadow, no frame, transparent background. Square 1:1 image, the object fills about 80% of the canvas.
```

### OBJECT blocks

#1 img-ball
```
A small smooth satin-gold sphere, like a game ball. One large soft highlight upper left, soft emerald rim light lower right. No pattern, no emboss, no sparkles. It must read clearly as a gold ball at 20 pixels.
```

#1 fix that worked (same chat)
```
Same ball, same style and colours, but fix these points: only ONE large soft highlight in the upper left, and the rest of the sphere is a smooth, unbroken gradient from warm gold to deeper amber at the bottom, no second highlight, no bright patch in the lower half, no mottled texture. The emerald rim light is thin and soft and stays inside the edge of the sphere, no green glow outside it. Clean crisp edge, no halo, no stray pixels around the ball. Transparent background.
```

#2 img-reward-free-spins
```
A chunky single slot machine reel standing upright, showing one big magenta-pink "7" on a cream satin face, framed by a soft-enamel gold frame with rounded corners. Two small gold coins bounce off its side. No glow halo. It must read clearly at 48 pixels.
```

#2 coins removed (edit in the same chat)
```
Same slot reel, same style, colours, angle and lighting, but remove the two gold coins completely. Keep everything else identical. Clean crisp edge, no halo, no stray pixels. Transparent background.
```

#3 img-reward-gold-coins
```
A small stack of four chunky gold coins, slightly fanned, the top coin tilted toward the viewer. Each coin has a simple embossed four-leaf clover in a plus layout (one leaf straight up, one down, one left, one right) with a short curved stem that comes out of the bottom middle of the lowest leaf, in the centre and a thick rounded rim. Soft emerald rim light. It must read clearly at 40 pixels.
```

#4 img-reward-ticket
```
A chunky arcade prize ticket, slightly tilted, cream satin body (the same cream as the slot reel face) with a gold border, semicircle notches on both short sides and one hot magenta-pink soft-enamel star with a thin gold outline in the centre. Thick, puffy, rounded edges, like a toy. Violet rim light. It must read clearly as a ticket at 28 pixels.
```

#4 fix that worked (slot reel attached as a material reference)
```
Same ticket, same shape, angle, notches and gold border, same lighting. Change the body to cream satin, exactly the same cream as the face of the attached slot reel. Make the star hot magenta-pink soft enamel with a thin gold outline, like the "7" on the reel. Make the ticket a little thicker, with a puffy rounded edge visible on the side, so it feels as chunky as the reel. Keep the violet rim light thin and inside the edge. Clean crisp edge, no halo, no stray pixels. Transparent background.
```

#5 img-reward-gift-box
```
A chunky gift box seen from a three-quarter angle, cream satin box (the same cream as the slot reel face) with a wide warm gold satin ribbon and a big rounded gold bow on top. No magenta on the object, only a thin soft magenta-violet rim light on one edge that stays inside the silhouette. Puffy, toy-like proportions. It must read clearly as a gift at 28 pixels.
```

#5 fix that worked (slot reel attached as a material reference)
```
Same gift box, same shape, angle, ribbon and bow, same lighting. Change the box to cream satin, exactly the same cream as the face of the attached slot reel. Keep the ribbon and the bow warm soft-enamel gold. No magenta on the object, only a thin soft magenta-violet rim light on one edge that stays inside the silhouette. Clean crisp edge, no halo, no stray pixels. Transparent background.
```

#6 img-reward-chest
```
A chunky closed treasure chest seen from a three-quarter angle, warm honey-caramel stylised wood planks (satin finish, a few soft simple wood-grain lines, rounded toy-like planks, no dark or realistic texture) held by thick rounded warm gold bands and gold corners, a big round gold lock with a small embossed four-leaf clover in a plus layout (one leaf straight up, one down, one left, one right) with a short curved stem that comes out of the bottom middle of the lowest leaf on it. No violet or magenta areas on the object. Puffy, toy-like proportions. Thin emerald rim light inside the edge. It must read clearly as a treasure chest at 28 pixels.
```

#6 fix that worked (from the cream version)
```
Same treasure chest, same shape, angle, gold bands, gold corners and round gold lock with the clover, same lighting. Change only the cream panels to warm honey-caramel stylised wood: satin finish, a few soft simple wood-grain lines, rounded toy-like planks, no dark or realistic texture. No violet or magenta on the object. Thin emerald rim light inside the edge. Clean crisp edge, no halo, no stray pixels. Transparent background.
```

#7 img-reward-collectable
```
A round lucky charm medallion, slightly tilted, cream satin face (the same cream as the slot reel face) with a raised four-leaf clover in a plus layout (one leaf straight up, one down, one left, one right) with a short curved stem that comes out of the bottom middle of the lowest leaf in the centre; the clover leaves are emerald-green soft enamel with a thin gold outline. Thick rounded gold rim. Like a collectible game badge. Thin violet rim light inside the edge. It must read clearly at 32 pixels.
```

#8 img-reward-collectable-rare
```
The same round lucky charm medallion shape, slightly tilted, cream satin face (the same cream as the slot reel face) with a raised four-leaf clover in a plus layout (one leaf straight up, one down, one left, one right) with a short curved stem that comes out of the bottom middle of the lowest leaf; the leaves and stem are hot magenta-pink soft enamel with a thin gold outline, and a round warm gold bead sits in the centre of the clover. Thick rounded gold rim with four tiny gold studs. A rarer version of the collectible badge: magenta clover instead of green, plus the studs. Thin emerald rim light inside the edge. It must read clearly at 32 pixels.
```

#8 fix that worked (#7 attached as an enamel reference)
```
Same rare medallion, same shape, angle, gold rim, four gold studs and lighting. Change only the clover: the four leaves and the stem become hot magenta-pink soft enamel with a thin gold outline, exactly like the green enamel leaves on the attached medallion but in magenta. The small dot in the centre of the clover becomes a round warm gold bead with a soft highlight. Keep the cream face. Clean crisp edge, no halo, no stray pixels. Transparent background.
```

#9a img-coin-a (tilted)
```
A single chunky gold coin, the same gold material as the coins in the previous slot reel image, tilted about 60 degrees so both the face and the thick rounded edge are visible. Simple embossed four-leaf clover in a plus layout (one leaf straight up, one down, one left, one right) with a short curved stem that comes out of the bottom middle of the lowest leaf, very subtle. It must read clearly as a coin at 16 pixels.
```

#9b img-coin-b (front)
```
A single chunky gold coin, the same gold material as the coins in the previous slot reel image, facing the viewer at a slight three-quarter angle of about 20 degrees, thick rounded rim visible on one side. Simple embossed four-leaf clover in a plus layout (one leaf straight up, one down, one left, one right) with a short curved stem that comes out of the bottom middle of the lowest leaf, very subtle. It must read clearly as a coin at 16 pixels.
```

#9b fix that worked (coin A attached as a reference)
```
Same coin, same angle, material and lighting. Fix only the clover stem: remove the current stem. The new stem starts from the bottom middle of the lowest leaf, at the small notch between its two rounded lobes, goes straight down for a short distance and curves gently to one side, exactly like the clover on the attached tilted coin. It is embossed the same way as the leaves. Keep everything else identical. Clean crisp edge, no halo, no stray pixels. Transparent background.
```

#10 img-reward-chest-open
```
The same chunky treasure chest, now open, seen from a three-quarter angle. Warm honey-caramel stylised wood planks with thick rounded warm gold bands. Inside, a heap of chunky gold coins with a soft warm glow rising from them. Puffy, toy-like proportions. Emerald rim light. It must read clearly at 120 pixels.
```

#11 img-status-offline (error art)

This one has its own STYLE block: the same style bible, but cool materials instead of gold. The error card must never look like a win. The slot reel (cream match) and the ticket (proportions) were attached.

```
Stylised 3D cartoon render in the style of a modern family animated film: soft rounded shapes, slightly chunky proportions, friendly and playful. Satin and soft-enamel materials, NOT chrome or mirror, NOT gold: soft cool slate-blue satin and cream satin (the same cream as the face of the attached slot reel), with ONE large soft highlight and a smooth, unbroken shading gradient, no secondary hotspots, no blotchy or mottled patches, no environment reflections, no tiny specular noise. Soft key light from the upper left, a thin soft violet rim light on one edge that stays inside the silhouette, no glow or colour spill outside the edge. Clean readable silhouette with a clean crisp edge, no halo, no fringe pixels around the object. Simple forms, few details. Calm and reassuring mood, not alarming: no red, no warning signs, no gold, no sparkles. One object only, centred, no text, no ground shadow, no frame, transparent background. Square 1:1 image, the object fills about 80% of the canvas.
```

```
A chunky toy-like power plug and a matching round socket, just unplugged and floating a little apart from each other, facing each other at a slight three-quarter angle. The plug body is cream satin with two short rounded slate-blue prongs; the socket is a soft slate-blue satin puck with two rounded holes. A short thick rounded slate-blue cable curls away from the plug in one soft loop. Between them, a small gap with two tiny soft cream dashes, like a pause, not a spark. Puffy, rounded, friendly proportions, like a toy. It must read clearly as "disconnected" at 80 pixels.
```

### Export

ChatGPT images come with a thin coloured fringe and a few specks around the edge. The export removes the specks, cuts the fringe about 1.5 px inside the edge, keeps a soft anti-aliased edge, sets the inner alpha (about 252) to 255, trims and adds even padding. The ball uses a clean circle mask. The repo keeps the @2x WebP files; Figma has the masters (about 1100 px).

## Sounds

### Which sound comes from where

| Source | Sounds |
|---|---|
| ElevenLabs Sound Effects (paid plan) | popup open, riser, bin land and its chime, win small, win big, win mega, ambient loop, UI close, ball release, reward collect |
| Web Audio synthesis in code | UI open (drawers and cards), bins shuffle, ticket gain, timer ready, no tickets, error, UI tap, toggle, tab, risk change, peg hit, coin tick |

Why this split: tonal sounds (chimes, two-note signals, soft ticks) are easy to make in code, weigh nothing and can follow the game, for example the peg pitch rises row by row. Sounds with texture (air, a click, a rolling ball) sound cheap when made in code, so they come from ElevenLabs.

The popup open and the UI open are two different sounds. The game opening is the first impression, so it gets a bright ElevenLabs sound. Drawers and cards open often, so they get a short, quiet whoosh made in code.

An early draft made with CassetteAI (in Figma Weave) was too weak and too long, so I replaced it.

### ElevenLabs prompts

Settings: prompt influence about 0.6, loop only for the ambient sound.

| File | Length | Loop |
|---|---|---|
| sfx-popup-open | 1 s | No |
| sfx-riser | 1.2 s | No |
| sfx-bin-land, sfx-bin-chime | 0.5 s | No |
| sfx-win-small | 0.7 s | No |
| sfx-win-big | 2 s | No |
| sfx-win-mega | 4 s | No |
| sfx-ambient | 20 s | Yes |
| sfx-ui-close | 0.5 s | No |
| sfx-ball-release | 0.6 s | No |
| sfx-reward-collect | 0.8 s | No |

sfx-popup-open: I tried two directions. The magical one did not fit the arcade feel of the board, so I kept the arcade one.

Direction 1, magical (not used)
```
Magical shimmering swoosh rising upward, ending in a bright sparkling chime with a few gold coin twinkles, cheerful mobile casino game opening a bonus game, clean and punchy, not harsh.
```

Direction 2, arcade (used)
```
Playful arcade power-up sound, quick rising synth sweep with a bouncy pop at the end and a soft glittering tail, mobile casino bonus game appears, bright and cheerful, clean ending.
```

sfx-riser
```
Short rising tension swell for a playful mobile arcade game, soft shimmering synth with light tick pulses speeding up, rising in pitch, ends abruptly at the peak, no impact, no melody.
```

sfx-bin-land (the bell is also used on its own as sfx-bin-chime, so its level can follow the heat of the bin)
```
Soft rubbery thud of a small ball dropping into a slot, followed by one bright clean bell chime, playful mobile game.
```

sfx-win-small
```
Very short sparkle of a few gold coins clinking with a light magical shimmer, cheerful mobile casino reward.
```

sfx-win-big
```
Cheerful casino win jingle, rising bright bell arpeggio over a shower of gold coins, warm and playful, mobile game, ends on a clear major chord.
```

sfx-win-mega
```
Short triumphant jackpot fanfare for a playful mobile casino game, brass and bells rising, big shower of coins, sparkly magic shimmer, celebratory but not harsh, clean ending.
```

sfx-ambient
```
Soft calm casino lounge ambience, faint distant slot machine chimes, gentle warm synth pad, very subtle, no voices, no melody, seamless loop.
```

sfx-ui-close
```
Soft airy whoosh falling downward, short UI panel closing sound, playful mobile game, clean ending.
```

sfx-ball-release
```
Small mechanical click of a latch opening, then a short light roll of a small ball on a smooth surface, playful mobile arcade game.
```

sfx-reward-collect
```
Quick airy whoosh that ends in a soft bright chime, a reward flying into a wallet, cheerful mobile casino game.
```

### Web Audio sounds (no prompts)

These are made in `design-system/js/sound.js`. The docs have a play button for each one.

| Event | Sound |
|---|---|
| UI open | Short soft whoosh up: filtered noise with a rising band, 150 to 250 ms, low volume |
| Bins shuffle | Fast cascade of soft ticks, one per bin |
| Ticket gain | One bright bell tone with a quick decay |
| Timer ready | Two rising bell notes |
| No tickets | Two soft falling marimba-like notes, calm, not a fail sound |
| Error | Two soft muted tones, not an alarm |
| UI tap, toggle, tab | Very short clicks; the toggle is higher for On, lower for Off |
| Risk change | Short tone, the pitch follows the level |
| Peg hit | Short pluck, the pitch rises row by row, small random variation, voice limit |
| Coin tick | Tiny tick per count step, the pitch rises with the count; also one tick as each bin reel stops |

### Export

Trim silence, short fade in and out, loudness normalised to the same level, peaks below -1 dBFS, loop points checked for the ambient sound.
