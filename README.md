# Type Great Hermes — Kid's Keyboard Adventure

A free and open-source (GNU GPLv3) browser typing adventure for young learners starring **Hermes**, a friendly 1930s rubber-hose cartoon typewriter in a candlelit scholar's study.

Type Great Hermes works with both a real hardware keyboard and its on-screen mechanical keybed so toddlers and early learners can explore letters, numbers, and first words at their own pace with gentle hints, celebratory cartoon illustrations, custom procedural sound effects, and a consistent character voice across devices.

---

## Origin Story: Why This Exists

### The Booster-Seat Keyboard
Type Great Hermes was inspired by my son finding an old wireless keyboard in the back of my car, pulling it into his booster seat, and immediately starting to press keys while saying the letters and numbers out loud. Watching how naturally kids gravitate toward real tactile keys when there is zero pressure made me want a playful, uncluttered keyboard playground made just for him.

### Why Early Typing Matters
One of the greatest wins of my own formal education was being given daily typing training in high school. I may handwrite like a drunk toddler, but to this day I maintain a **100 WPM** typing speed and high accuracy without thinking about it or practicing — purely because I learned that discipline early enough for it to become muscle memory. Giving kids a joyful, low-friction way to make friends with a QWERTY layout early on feels like a small head start that compounds for life.

### Built for Parents & Educators (FOSS)
This project is released as **Free and Open-Source Software (GNU GPLv3)** in the hope that other parents, teachers, and early-childhood educators find it useful at home or in the classroom. If you try it with your kids or students, feedback, bug reports, device quirks, and ideas for improvement are warmly welcome.

---

## 100% Vibecoded Methodology

I am **not a software engineer**. Type Great Hermes is a **100% vibecoded** project built iteratively using **Google Antigravity** as the development harness paired with a **mixture of Google and non-Google LLMs**.

Instead of a hand-architected codebase or heavyweight build toolchain, every feature — from the SVG typewriter chassis and rubber-hose animated hands down to the procedural synthesizer and local neural TTS integration — came together through conversational iteration, live audio/visual critiquing, and targeted verification scripts inside Antigravity.

---

## Design Philosophy & Learning Mechanics

### Calm Focus to Joyful Celebration
Young kids are easily overwhelmed by noisy UIs. Each challenge begins inside a calm, high-contrast candlelit study so the child's attention stays on the prompt card and the typewriter keys. Pressing the right key triggers a radial colour burst, confetti, a bespoke 1930s cartoon illustration, custom per-item Web Audio sound effects, and spoken praise by name. Building a streak progressively warms and animates the study backdrop across four excitement stages (`calm` → `warm` → `grooving` → `party`).

### Tactile Rubber-Hose Character Design
Hermes blends a vintage mint-green Hermes 3000 typewriter silhouette with classic 1930s rubber-hose animation:
- Wide-set 1930s pie-cut eyes behind round wire-rimmed scholar spectacles, bushy silver-white eyebrows, and a moustache — with gaze-tracking pupils that look toward the next target key.
- A stepped mechanical keybed (`0–9` number row + `A–Z` QWERTY rows) sized for young fingers.
- Animated foreground gloved rubber-hose hands that reach for keys as they are pressed, wave at high streaks, and gently guide attention during hints.

### Frustration-Free Progressive Hints
Kids shouldn't hit dead ends:
- **Immediate Highlight (optional)**: Lights up the target key right away, or lets kids hunt independently first.
- **5-Second Nudge**: Gently pulses the target key after a pause.
- **10-Second Guide**: Adds a bouncing arrow and pointing rubber-hose hand directly to the key.

### Practice Modes & Parent Options
Open the **Parent Options** gear menu (`#parent-options`) to tune the session:
- **6 Practice Modes**:
  - `Letters (A – Z)`
  - `Numbers (0 – 9 Woodland)` with matching countable critter/treasure badges
  - `Letters & Numbers`
  - `3-Letter Words (50 Words)`
  - `4-Letter Words (30 Words)`
  - `All Words (3 & 4 Letters)` — 80 curated words organized across Animals, Everyday Objects & Food, Nature & World, and Action Verbs
- **Parent & Child Controls**: Fun Shuffle vs. In Order prompting, **Fast Mode** (shorter celebration hold between rounds), Happy Thinking Music toggle, Read Words Aloud toggle, Highlight Key Immediately toggle, Skip (`Next Prompt →`), a startup/mid-game **Player Name** dialog with spoken `Y` / `N` confirmation, and a persistent live / best streak tracker.

---

## Tech Stack & Architecture

- **Zero-Build Static Web App**: Plain semantic HTML5 ([`index.html`](index.html)), modular CSS ([`css/styles.css`](css/styles.css)), and vanilla browser JavaScript ([`js/words.js`](js/words.js), [`js/illustrations.js`](js/illustrations.js), [`js/voipi-tts.js`](js/voipi-tts.js), [`js/audio.js`](js/audio.js), [`js/app.js`](js/app.js)) — no bundler, transpiler, or server runtime required.
- **Modern Web Platform CSS**: Organized with CSS `@layer`, custom properties, logical properties, Native Popover API (`popover="auto"`), `<dialog>`, and accessibility media support (`prefers-reduced-motion` and `forced-colors`), plus a subtle polite screen-reader live region (`#sr-announcer`).
- **100% Inline Cartoon SVG Artwork ([`js/illustrations.js`](js/illustrations.js), [`index.html`](index.html))**: Every character scene — 26 letters, 10 countable woodland number scenes (`0–9`), 50 three-letter words, and 30 four-letter words (116 illustrated items total), plus Hermes himself and the scholar's library study — is crisp vector SVG artwork with bold `#181818` ink lines.
- **Procedural Web Audio Synthesizer ([`js/audio.js`](js/audio.js))**: Synthesizes mechanical key clacks, paper-feed carriage returns, typewriter bell dings, gentle "oops" buzzes, bespoke per-word/letter celebration SFX, and looping "happy thinking music" that automatically ducks whenever Hermes speaks.
- **Packaged Local Neural Voice Engine ([`js/voipi-tts.js`](js/voipi-tts.js) + [`vendor/voipi-kitten-tts/`](vendor/voipi-kitten-tts/))**:
  - Device OS speech engines vary wildly (e.g., Android browsers defaulting to unnatural vocaloid voices). To keep Hermes's personality identical everywhere, the app packages a client-side neural TTS pipeline adapted from **VoiPi**'s KittenTTS provider (`KittenML/kitten-tts-nano-0.8-int8` using the `Leo` / `expr-voice-5-m` voice embedding in `voice-leo.bin`), powered locally by single-threaded **ONNX Runtime Web** WASM (`numThreads = 1`, `proxy = false` for static hosts without COOP/COEP headers) and **Phonemizer.js / eSpeak NG**.
  - Includes **29 pre-rendered 24 kHz mono MP3 clips** (`intro.mp3`, `ask-name.mp3`, `type-name.mp3`, and `echo-a.mp3`–`echo-z.mp3`) in [`vendor/voipi-kitten-tts/clips/`](vendor/voipi-kitten-tts/clips/) for instant startup lines and letter echoes, plus live in-browser synthesis and debounced preloading for dynamic lines containing the child's name.
  - Falls back to the browser's `window.speechSynthesis` only when Web Audio / WebAssembly is unavailable.

### Repository Layout

```text
.
├── index.html                  # App shell, SVG library study, Hermes rig, Parent Options & Name dialog
├── css/
│   └── styles.css              # Layered styling, animations, responsive keybed & study stages
├── js/
│   ├── words.js                # WORD_BANK (letters, 0–9 woodland numbers, 50×3-letter & 30×4-letter words)
│   ├── illustrations.js        # 116 inline 1930s cartoon SVG illustrations
│   ├── voipi-tts.js            # Packaged KittenTTS / ONNX Runtime Web / Phonemizer browser engine
│   ├── audio.js                # Procedural Web Audio SFX, thinking music, speech queue & fallback TTS
│   └── app.js                  # Game loop, progressive hints, rubber-hose hands & streak tracking
├── vendor/voipi-kitten-tts/    # Packaged ONNX model, Leo embeddings, ORT WASM, Phonemizer & 29 MP3 clips
├── THIRD_PARTY_NOTICES.md      # Full upstream credits, modification notes & third-party license texts
├── LICENSE                     # GNU General Public License v3.0
└── .github/workflows/
    └── deploy.yml              # Static GitHub Pages deployment workflow
```

---

## Brief History of Features & Changes

Looking through the git history shows how quickly the app evolved from a single evening experiment into a full learning playground:

1. **Initial Prototype (`2026-11-08`)**
   - **`d7bafbb`**: Initial commit with the core kids typing loop and onscreen keyboard.
   - **`f99926d` – `27e1f09`**: Added the permanent `0–9` number row, initial 3-letter words, 5s/10s progressive hints, kid-friendly key scaling, looping procedural thinking music, a sculpted vintage typewriter chassis with stepped keys, and **Fast Mode** to trim post-answer wait times.
   - **`74be1b2`**: Redesigned Hermes with a whiskered muzzle, mechanical pill keys, and wide-set eye tracking following the target key.
2. **Voice Personality & 80-Word Illustrated Dictionary (`2026-11-11` – `2026-11-12`)**
   - **`e4f8436` – `8c81f25`**: Tuned Hermes's cheerful voice and letter echoing, then added 16 varied post-answer voice affirmations (10 personalized with the player's name).
   - **`cb09deb` – `9adfe32`**: Expanded the vocabulary into a structured `WORD_BANK` of **50 three-letter words** and **30 four-letter words**, accompanied by bespoke 1930s cartoon SVG illustrations for all 47 newly added words (with Parent Options visual cleanup in `644c4fd`).
3. **Open-Source Release, Rubber-Hose Hands & Personalization (`2026-11-13`)**
   - **`230b8c4` – `16a589e`**: Published under **GNU GPLv3** (`LICENSE`) with automatic static deployment to **GitHub Pages** (`.github/workflows/deploy.yml`).
   - **`ce51541` – `e44fe1c`**: Brought Hermes to life with animated foreground rubber-hose hands pressing keys and pointing to hints, a startup player-name prompt with spoken `Y` / `N` confirmation, mid-game name changes, progressive background colour stages, and max-combo hand waving.
4. **Scholar Hermes, Woodland Numbers & Packaged Neural TTS (`2026-11-13` – `2026-11-14`)**
   - **`804fa00` – `96cea1e`**: Upgraded the scene to **Scholar Hermes** in a candlelit book-lined study with **Woodland Numbers (`0–9`)** featuring countable creatures/objects and an "In a row" / "Best" streak counter HUD.
   - **Packaged Local Neural Voice (latest workspace update)**: Replaced inconsistent device Web Speech voices by bundling VoiPi's KittenTTS neural pipeline (`kitten-tts-nano-0.8-int8` + `onnxruntime-web` + `phonemizer.js` / eSpeak NG + 29 pre-rendered MP3 clips) directly inside the static bundle with full attribution notices.

---

## Running Locally & Deployment

Because browsers require HTTP(S) to load ES modules, `fetch()` assets, and WebAssembly binaries inside `vendor/voipi-kitten-tts/`, serve the project root with any static HTTP server rather than opening `index.html` directly over `file://`:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser (note that browser autoplay rules require one key press or click/tap before voice and music begin).

To host your own fork, push to `main` — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) deploys the repository directly to GitHub Pages with no build step.

---

## Feedback, License & Third-Party Credits

- **License**: Distributed under the **GNU General Public License v3.0** — see [`LICENSE`](LICENSE).
- **Feedback**: If you are a parent, teacher, or educator using Type Great Hermes with children, please open an issue or share feedback on what works (or trips kids up) on real devices and keyboards!
- **Packaged Voice Credits**: Hermes's client-side voice is powered by:
  - **[VoiPi](https://github.com/pithings/voipi)** (`pithings/voipi`, MIT License — Copyright © Pooya Parsa)
  - **[KittenTTS / `kitten-tts-nano-0.8-int8`](https://huggingface.co/KittenML/kitten-tts-nano-0.8-int8)** ([GitHub](https://github.com/KittenML/KittenTTS), Apache License 2.0)
  - **[ONNX Runtime Web](https://github.com/microsoft/onnxruntime)** (MIT License — Copyright © Microsoft Corporation)
  - **[Phonemizer.js](https://github.com/xenova/phonemizer.js)** (Apache License 2.0 — Xenova) & **[eSpeak NG](https://github.com/espeak-ng/espeak-ng)** (GNU GPLv3)

Full component inventories, modification notes, and verbatim third-party license texts are documented in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) and [`vendor/voipi-kitten-tts/LICENSE.md`](vendor/voipi-kitten-tts/LICENSE.md).
