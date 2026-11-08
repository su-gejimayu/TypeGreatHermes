/**
 * Type Great Hermes — Main Game Controller
 * - Permanent 4-row Hermes keyboard (1-0 + QWERTY + Spacebar)
 * - Modes: Letters (A-Z), Numbers (0-9 Aussie 12 Days + Zero to Hero), Both, and 3-Letter Words (+ Bonus JUMP)
 * - Progressive Timed Key Hints: 0s B&W pulse -> 5s Vibrant Colour Key -> 10s Bouncing Red Arrow!
 * - Instant single-key response (no Enter/Return confirmation needed)
 */
(function () {
  const NUMBER_ROW = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const QWERTY_LETTER_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  // Hermes permanently features the number row as part of his character design!
  const ALL_KEY_ROWS = [NUMBER_ROW, ...QWERTY_LETTER_ROWS];

  const VALID_MODES = ['letters', 'numbers', 'both', 'words'];
  const COLOR_HINT_DELAY_MS = 5000;
  const RED_ARROW_DELAY_MS = 10000;

  const IGNORED_KEYS = new Set([
    'Shift',
    'CapsLock',
    'Control',
    'Alt',
    'Meta',
    'Fn',
    'FnLock',
    'Hyper',
    'Super',
    'OS',
    'Tab',
    'Escape',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'Insert',
    'ContextMenu',
    'Dead',
    'Unidentified',
    'AudioVolumeUp',
    'AudioVolumeDown',
    'AudioVolumeMute',
    'MediaPlayPause',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12'
  ]);

  const CONFETTI_GLYPHS = ['★', '✦', '♪', '♫', '●', '■', '▲'];
  const CONFETTI_COLORS = [
    '#ff3b5c',
    '#ff9f1c',
    '#ffe03b',
    '#3dd668',
    '#34c6ff',
    '#a65cff',
    '#ff6ec7'
  ];

  // DOM References
  const body = document.body;
  const announcer = document.getElementById('sr-announcer');
  const sceneRig = document.getElementById('scene-rig');
  const promptPrefix = document.getElementById('prompt-prefix');
  const promptTarget = document.getElementById('prompt-target');
  const buzzFeedback = document.getElementById('buzz-feedback');
  const paperSheet = document.getElementById('paper-sheet');
  const paperSingleSvg = document.getElementById('paper-single-svg');
  const paperLetterText = document.getElementById('paper-letter-text');
  const paperLetterShadow = document.getElementById('paper-letter-shadow');
  const paperWordSlots = document.getElementById('paper-word-slots');
  const paperCountBadges = document.getElementById('paper-count-badges');
  const paperPhrase = document.getElementById('paper-phrase');
  const critterStage = document.getElementById('critter-stage');
  const calloutLeft = document.getElementById('callout-left');
  const calloutRight = document.getElementById('callout-right');
  const confettiLayer = document.getElementById('confetti-layer');
  const keysContainer = document.getElementById('typewriter-keys');
  const keyRowsMount = document.getElementById('key-rows-mount') || keysContainer;
  const keyRedArrow = document.getElementById('key-red-arrow');

  const soundBtn = document.getElementById('sound-toggle-btn');
  const musicBtn = document.getElementById('music-toggle-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const optionsPopover = document.getElementById('parent-options');
  const modeSelect = document.getElementById('mode-select');
  const orderSelect = document.getElementById('order-select');
  const musicCheckbox = document.getElementById('music-checkbox');
  const voiceCheckbox = document.getElementById('voice-checkbox');
  const hintCheckbox = document.getElementById('hint-checkbox');
  const skipBtn = document.getElementById('skip-letter-btn');

  // State
  const state = {
    phase: 'prompting', // 'prompting' | 'buzzing' | 'celebrating'
    mode: 'letters', // 'letters' | 'numbers' | 'both' | 'words'
    order: 'shuffle', // 'shuffle' | 'sequential'
    soundOn: true,
    musicOn: true,
    voiceOn: true,
    showHint: true,
    hasInteracted: false,
    deck: [],
    seqIndex: 0,
    currentItem: null,
    charIndex: 0, // Active character index within currentItem.key (0..len-1)
    hintStage: 'bw', // 'bw' (0-5s) | 'color' (5-10s) | 'arrow' (10s+)
    wrongCountThisTurn: 0,
    buzzTimer: null,
    celebrateTimer: null,
    colorHintTimer: null,
    arrowHintTimer: null,
    isInitialLoad: true
  };

  const keyButtonsByChar = new Map();
  let spacebarEl = null;
  let supportsDisplayTransition;

  /** Probe discrete display transition support (per modern-web-guidance) */
  function canTransitionDisplay() {
    if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
    if (
      !window.CSS?.supports?.('transition-behavior', 'allow-discrete') ||
      !document.body
    ) {
      supportsDisplayTransition = false;
      return false;
    }
    const probe = document.createElement('div');
    probe.style.cssText =
      'transition: display 1s allow-discrete !important; display: block;';
    document.body.appendChild(probe);
    getComputedStyle(probe).display;
    probe.style.display = 'none';
    supportsDisplayTransition = getComputedStyle(probe).display === 'block';
    probe.remove();
    return supportsDisplayTransition;
  }

  function showArrow() {
    if (!keyRedArrow) return;
    keyRedArrow.removeAttribute('data-closing');
    keyRedArrow.hidden = false;
  }

  async function hideArrow(immediate = false) {
    if (!keyRedArrow || keyRedArrow.hidden) return;
    if (immediate) {
      keyRedArrow.removeAttribute('data-closing');
      keyRedArrow.hidden = true;
      return;
    }
    if (canTransitionDisplay()) {
      keyRedArrow.hidden = true;
      return;
    }
    keyRedArrow.setAttribute('data-closing', '');
    const animations = keyRedArrow.getAnimations?.() || [];
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 400))
      ]);
    }
    if (keyRedArrow.hasAttribute('data-closing')) {
      keyRedArrow.removeAttribute('data-closing');
      keyRedArrow.hidden = true;
    }
  }

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem('hermes_settings_v1') || '{}');
      if (saved.mode && VALID_MODES.includes(saved.mode)) {
        state.mode = saved.mode;
        modeSelect.value = saved.mode;
      }
      if (saved.order && ['shuffle', 'sequential'].includes(saved.order)) {
        state.order = saved.order;
        orderSelect.value = saved.order;
      }
      if (typeof saved.soundOn === 'boolean') {
        state.soundOn = saved.soundOn;
      }
      if (typeof saved.musicOn === 'boolean') {
        state.musicOn = saved.musicOn;
      }
      if (typeof saved.voiceOn === 'boolean') {
        state.voiceOn = saved.voiceOn;
        voiceCheckbox.checked = saved.voiceOn;
      }
      if (typeof saved.showHint === 'boolean') {
        state.showHint = saved.showHint;
        hintCheckbox.checked = saved.showHint;
      }
    } catch (_) {
      // Ignore storage errors in private/file contexts
    }
    syncSoundUI();
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        'hermes_settings_v1',
        JSON.stringify({
          mode: state.mode,
          order: state.order,
          soundOn: state.soundOn,
          musicOn: state.musicOn,
          voiceOn: state.voiceOn,
          showHint: state.showHint
        })
      );
    } catch (_) {
      // Ignore storage errors
    }
  }

  function syncSoundUI() {
    window.hermesAudio.setSoundEnabled(state.soundOn);
    window.hermesAudio.setMusicEnabled(state.musicOn);
    window.hermesAudio.setVoiceEnabled(state.voiceOn);
    soundBtn.setAttribute('aria-pressed', String(state.soundOn));
    if (musicBtn) {
      musicBtn.setAttribute('aria-pressed', String(state.musicOn));
    }
    if (musicCheckbox) {
      musicCheckbox.checked = state.musicOn;
    }
  }

  function getPool() {
    const { letters, numbers, words } = window.HERMES_WORDS;
    if (state.mode === 'numbers') return [...numbers];
    if (state.mode === 'both') return [...letters, ...numbers];
    if (state.mode === 'words') return [...words];
    return [...letters];
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function refillDeck() {
    const pool = getPool();
    if (state.order === 'sequential') {
      state.deck = pool;
      return;
    }

    // On initial launch in letters shuffle mode, start with 'D' (like the concept art!)
    // followed soon by showcase favourites H, B, F mixed with the alphabet.
    if (state.isInitialLoad && state.mode === 'letters') {
      state.isInitialLoad = false;
      const dItem = pool.find((x) => x.key === 'D');
      const featured = shuffleArray(
        pool.filter((x) => ['H', 'B', 'F'].includes(x.key))
      );
      const rest = shuffleArray(
        pool.filter((x) => !['D', 'H', 'B', 'F'].includes(x.key))
      );
      const earlyMix = shuffleArray([...featured, ...rest.slice(0, 2)]);
      state.deck = [dItem, ...earlyMix, ...rest.slice(2)];
      return;
    }

    state.isInitialLoad = false;
    const shuffled = shuffleArray(pool);
    if (
      state.currentItem &&
      shuffled.length > 1 &&
      shuffled[0].key === state.currentItem.key
    ) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }
    state.deck = shuffled;
  }

  function nextItem() {
    const pool = getPool();
    if (state.order === 'sequential') {
      const item = pool[state.seqIndex % pool.length];
      state.seqIndex = (state.seqIndex + 1) % pool.length;
      return item;
    }
    if (!state.deck.length) {
      refillDeck();
    }
    return state.deck.shift();
  }

  function isMultiCharItem(item = state.currentItem) {
    return Boolean(item && item.key.length > 1);
  }

  function getActiveTargetChar() {
    if (!state.currentItem) return '';
    return state.currentItem.key[state.charIndex] || state.currentItem.key[0];
  }

  /** Build permanent 4-row round vintage typewriter keycaps (1-0 + QWERTY + Spacebar) */
  function renderTypewriterKeys() {
    keyRowsMount.innerHTML = '';
    keyButtonsByChar.clear();

    ALL_KEY_ROWS.forEach((rowKeys) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'key-row';
      rowKeys.forEach((char) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tw-key';
        btn.textContent = char;
        btn.dataset.key = char;
        btn.setAttribute('aria-label', `Key ${char}`);
        btn.addEventListener('click', (e) => {
          state.hasInteracted = true;
          window.hermesAudio.unlock();
          if (e.detail > 0) btn.blur();
          flashKeyPress(char);
          handleAttempt(char);
        });
        rowEl.appendChild(btn);
        keyButtonsByChar.set(char, btn);
      });
      keyRowsMount.appendChild(rowEl);
    });

    const spaceRow = document.createElement('div');
    spaceRow.className = 'key-row';
    spacebarEl = document.createElement('div');
    spacebarEl.className = 'tw-spacebar';
    spacebarEl.setAttribute('aria-hidden', 'true');
    spaceRow.appendChild(spacebarEl);
    keyRowsMount.appendChild(spaceRow);

    updateKeyHighlights();
  }

  /** Compute fallback coordinates so #key-red-arrow points directly at the active key */
  function syncArrowCoordinates() {
    if (!keyRedArrow) return;
    const activeChar = getActiveTargetChar();
    const targetBtn = keyButtonsByChar.get(activeChar);
    if (!targetBtn) return;

    const x = targetBtn.offsetLeft + targetBtn.offsetWidth / 2;
    const y = targetBtn.offsetTop;
    keyRedArrow.style.setProperty('--arrow-x', `${x}px`);
    keyRedArrow.style.setProperty('--arrow-y', `${y}px`);
  }

  function clearHintTimers() {
    clearTimeout(state.colorHintTimer);
    clearTimeout(state.arrowHintTimer);
  }

  /**
   * Start progressive 5s / 10s timers for the currently active target character:
   * - 0s..5s: Black & White key pulse
   * - 5s: Key turns to vibrant Colour!
   * - 10s: Bold Red Arrow points directly at the key!
   * Note: Wrong keypresses do NOT reset these timers so a child hunting for a key still gets help.
   */
  function startHintTimersForActiveChar() {
    clearHintTimers();
    state.hintStage = 'bw';
    hideArrow(true);

    state.colorHintTimer = setTimeout(() => {
      if (state.phase === 'celebrating') return;
      state.hintStage = 'color';
      updateKeyHighlights();
    }, COLOR_HINT_DELAY_MS);

    state.arrowHintTimer = setTimeout(() => {
      if (state.phase === 'celebrating') return;
      state.hintStage = 'arrow';
      syncArrowCoordinates();
      updateKeyHighlights();
      showArrow();
    }, RED_ARROW_DELAY_MS);
  }

  function updateKeyHighlights() {
    const activeChar = getActiveTargetChar();
    const isCelebrating = state.phase === 'celebrating';
    const celebratedChars = new Set(
      state.currentItem ? state.currentItem.key.split('') : []
    );

    keyButtonsByChar.forEach((btn, char) => {
      const isActiveTarget = Boolean(
        !isCelebrating && state.currentItem && char === activeChar
      );
      const isColorStage =
        isActiveTarget &&
        (state.hintStage === 'color' || state.hintStage === 'arrow');
      const isArrowStage = isActiveTarget && state.hintStage === 'arrow';
      const isBwHint =
        isActiveTarget &&
        !isColorStage &&
        (state.showHint || state.wrongCountThisTurn >= 1);

      btn.classList.toggle('is-hint', isBwHint);
      btn.classList.toggle('is-color-hint', isColorStage);
      btn.classList.toggle('is-arrow-target', isArrowStage);
      btn.classList.toggle(
        'is-target-celebrate',
        isCelebrating && celebratedChars.has(char)
      );
    });

    if (!isCelebrating && state.hintStage === 'arrow') {
      syncArrowCoordinates();
    }
  }

  function flashKeyPress(char) {
    if (char === ' ') {
      if (!spacebarEl) return;
      spacebarEl.classList.add('is-pressed');
      setTimeout(() => spacebarEl.classList.remove('is-pressed'), 140);
      return;
    }
    const btn = keyButtonsByChar.get(char.toUpperCase());
    if (!btn) return;
    btn.classList.add('is-pressed');
    setTimeout(() => btn.classList.remove('is-pressed'), 140);
  }

  function announce(msg) {
    if (!announcer) return;
    announcer.textContent = '';
    requestAnimationFrame(() => {
      announcer.textContent = msg;
    });
  }

  /** Render multi-letter SVG slots on the paper sheet for 3-letter (+ 4-letter JUMP) words */
  function buildWordPaperSlots(word) {
    paperWordSlots.innerHTML = '';
    paperWordSlots.classList.toggle('is-four-letter', word.length >= 4);

    word.split('').forEach((ch, idx) => {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'word-slot-svg');
      svg.setAttribute('viewBox', '0 0 110 138');
      svg.dataset.index = String(idx);

      const shadow = document.createElementNS(svgNS, 'text');
      shadow.setAttribute('class', 'word-slot-shadow');
      shadow.setAttribute('x', '59');
      shadow.setAttribute('y', '105');
      shadow.setAttribute('font-size', '106');
      shadow.setAttribute('text-anchor', 'middle');
      shadow.textContent = ch;

      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('class', 'word-slot-text');
      text.setAttribute('x', '55');
      text.setAttribute('y', '100');
      text.setAttribute('font-size', '106');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = ch;

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('class', 'word-slot-underline');
      line.setAttribute('x1', '20');
      line.setAttribute('y1', '124');
      line.setAttribute('x2', '90');
      line.setAttribute('y2', '124');

      svg.appendChild(shadow);
      svg.appendChild(text);
      svg.appendChild(line);
      paperWordSlots.appendChild(svg);
    });
  }

  /** Sync top prompt banner & paper word slot states for multi-letter words */
  function syncWordProgressUI(justStampedIndex = -1) {
    const item = state.currentItem;
    if (!item || !isMultiCharItem(item)) return;

    // Top HUD Banner
    promptTarget.innerHTML = '';
    if (item.isBonus) {
      const bonus = document.createElement('span');
      bonus.className = 'prompt-bonus-tag';
      bonus.textContent = '★ BONUS';
      promptTarget.appendChild(bonus);
    }

    item.key.split('').forEach((ch, idx) => {
      const span = document.createElement('span');
      span.className = 'prompt-word-char';
      if (state.phase === 'celebrating' || idx < state.charIndex) {
        span.classList.add('is-typed');
      } else if (idx === state.charIndex) {
        span.classList.add('is-current');
      } else {
        span.classList.add('is-pending');
      }
      span.textContent = ch;
      promptTarget.appendChild(span);
    });

    // Paper SVG Slots
    const slotEls = paperWordSlots.querySelectorAll('.word-slot-svg');
    slotEls.forEach((svg, idx) => {
      const isTyped = state.phase === 'celebrating' || idx < state.charIndex;
      const isActive = state.phase !== 'celebrating' && idx === state.charIndex;
      svg.classList.toggle('is-typed', isTyped);
      svg.classList.toggle('is-active', isActive);
      svg.classList.toggle('is-pending', !isTyped && !isActive);
      if (idx === justStampedIndex) {
        svg.classList.remove('is-just-stamped');
        void svg.getBoundingClientRect();
        svg.classList.add('is-just-stamped');
      }
    });
  }

  /** Populate countable tokens on the paper answer sheet when prompting a number 0-9 */
  function renderNumberCountBadges(item) {
    if (!paperCountBadges) return;
    if (typeof item.count !== 'number') {
      paperCountBadges.setAttribute('hidden', '');
      paperCountBadges.hidden = true;
      paperCountBadges.innerHTML = '';
      return;
    }

    paperCountBadges.removeAttribute('hidden');
    paperCountBadges.hidden = false;
    paperCountBadges.innerHTML = '';

    if (item.count === 0) {
      const pill = document.createElement('span');
      pill.className = 'zero-hero-pill';
      pill.textContent = '0 ★ ZERO TO HERO!';
      paperCountBadges.appendChild(pill);
      return;
    }

    for (let i = 0; i < item.count; i++) {
      const star = document.createElement('span');
      star.className = 'count-star';
      star.textContent = '★';
      paperCountBadges.appendChild(star);
    }
  }

  /** Set up a crisp Black & White question prompt */
  function startNewPrompt({ speakPrompt = false, animateFeed = false } = {}) {
    clearTimeout(state.buzzTimer);
    clearTimeout(state.celebrateTimer);

    state.phase = 'prompting';
    state.wrongCountThisTurn = 0;
    state.charIndex = 0;
    state.currentItem = nextItem();

    const item = state.currentItem;
    const multiChar = isMultiCharItem(item);

    window.hermesAudio.setCelebrating(false);
    body.dataset.state = 'prompting';
    body.style.setProperty('--accent-hue', String(item.accentHue || 36));

    // Clear old confetti
    confettiLayer.innerHTML = '';

    // Update top prompt banner
    promptPrefix.textContent = multiChar ? 'Spell:' : 'Type:';
    buzzFeedback.hidden = true;

    if (multiChar) {
      // SVGSVGElement does not reflect .hidden to the [hidden] HTML attribute; set explicitly & clear glyph text
      paperSingleSvg.setAttribute('hidden', '');
      paperSingleSvg.hidden = true;
      paperLetterText.textContent = '';
      paperLetterShadow.textContent = '';
      paperWordSlots.removeAttribute('hidden');
      paperWordSlots.hidden = false;
      buildWordPaperSlots(item.key);
      syncWordProgressUI();
    } else {
      paperWordSlots.setAttribute('hidden', '');
      paperWordSlots.hidden = true;
      paperWordSlots.innerHTML = '';
      paperSingleSvg.removeAttribute('hidden');
      paperSingleSvg.hidden = false;
      promptTarget.textContent = item.key;
      paperLetterText.textContent = item.key;
      paperLetterShadow.textContent = item.key;
    }

    renderNumberCountBadges(item);
    paperPhrase.textContent = item.phrase;

    // Pre-stage critter & callouts (hidden until celebrating)
    critterStage.innerHTML = window.getHermesIllustration(item.key);
    calloutLeft.querySelector('span').textContent = item.callouts[0] || 'WOW!';
    calloutRight.querySelector('span').textContent = item.callouts[1] || 'COOL!';

    if (animateFeed) {
      paperSheet.classList.remove('is-feeding');
      void paperSheet.offsetWidth;
      paperSheet.classList.add('is-feeding');
      window.hermesAudio.playPaperFeed();
    }

    startHintTimersForActiveChar();
    updateKeyHighlights();
    announce(multiChar ? `Spell ${item.word}: ${item.key}` : `Type ${item.key}`);

    if (speakPrompt && state.hasInteracted) {
      const promptSpeech = multiChar
        ? `${item.isBonus ? 'Bonus word! ' : ''}Spell ${item.word}! Type ${item.key[0]}!`
        : `Type ${item.key}!`;
      window.hermesAudio.speak(promptSpeech, {
        rate: 0.95,
        pitch: 0.92,
        delayMs: 220
      });
    }
  }

  /** Spawn festive confetti, stars, and musical notes */
  function spawnConfettiBurst(count = 34) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'confetti-piece';
      el.textContent = CONFETTI_GLYPHS[i % CONFETTI_GLYPHS.length];
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
      const dist =
        120 + Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.45;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 40;
      const rot = Math.round((Math.random() - 0.5) * 520);
      const dur = (1.25 + Math.random() * 0.9).toFixed(2);

      el.style.setProperty('--p-color', color);
      el.style.setProperty('--tx', `${tx.toFixed(0)}px`);
      el.style.setProperty('--ty', `${ty.toFixed(0)}px`);
      el.style.setProperty('--rot', `${rot}deg`);
      el.style.setProperty('--p-dur', `${dur}s`);

      confettiLayer.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }
  }

  /** Advance to the next letter inside a 3/4-letter word while keeping B&W prompt state */
  function advanceWordLetter() {
    clearTimeout(state.buzzTimer);
    state.phase = 'prompting';
    body.dataset.state = 'prompting';

    const stampedIdx = state.charIndex;
    state.charIndex += 1;
    state.wrongCountThisTurn = 0;
    buzzFeedback.hidden = true;

    const item = state.currentItem;
    const nextChar = getActiveTargetChar();
    promptPrefix.textContent = 'Great! Next:';
    syncWordProgressUI(stampedIdx);

    // Reset progressive 5s colour & 10s red arrow timers for the new target letter!
    startHintTimersForActiveChar();
    updateKeyHighlights();

    window.hermesAudio.playLetterStep(stampedIdx);
    window.hermesAudio.speak(`Next, ${nextChar}!`, {
      rate: 0.98,
      pitch: 0.93,
      delayMs: 280
    });
    announce(`Good! Next letter ${nextChar}`);
  }

  /** Handle Completed Answer -> Burst of Colour & Sound! */
  function triggerCelebration() {
    clearTimeout(state.buzzTimer);
    clearTimeout(state.celebrateTimer);
    clearHintTimers();
    hideArrow();

    const item = state.currentItem;
    state.phase = 'celebrating';
    state.hintStage = 'bw';
    buzzFeedback.hidden = true;

    promptPrefix.textContent = 'Yay!';
    if (isMultiCharItem(item)) {
      syncWordProgressUI(item.key.length - 1);
    } else {
      promptTarget.textContent = item.key;
    }

    body.dataset.state = 'celebrating';
    updateKeyHighlights();
    spawnConfettiBurst(40);

    window.hermesAudio.setCelebrating(true);
    window.hermesAudio.playSuccess(item.sfx);
    window.hermesAudio.speak(item.spoken || item.phrase, {
      rate: 0.94,
      pitch: 0.95,
      delayMs: 360
    });
    announce(`Correct! ${item.phrase}`);

    const holdMs =
      isMultiCharItem(item) || typeof item.count === 'number' ? 4150 : 3750;
    state.celebrateTimer = setTimeout(() => {
      startNewPrompt({ speakPrompt: true, animateFeed: true });
    }, holdMs);
  }

  /** Handle Incorrect Answer -> Playful Buzz + Shake + Try Again Prompt! */
  function triggerBuzz(pressedRaw) {
    clearTimeout(state.buzzTimer);

    state.phase = 'buzzing';
    state.wrongCountThisTurn += 1;

    const item = state.currentItem;
    const targetChar = getActiveTargetChar();
    const displayPressed =
      pressedRaw === ' '
        ? 'Space'
        : /^[a-zA-Z0-9]$/.test(pressedRaw)
          ? pressedRaw.toUpperCase()
          : '';

    promptPrefix.textContent = isMultiCharItem(item)
      ? 'Try again! Spell:'
      : 'Try again! Type:';
    if (!isMultiCharItem(item)) {
      promptTarget.textContent = targetChar;
    }

    buzzFeedback.textContent = displayPressed
      ? `Oops, that was ${displayPressed}! Find ${targetChar}!`
      : `Oops! Try again — find ${targetChar}!`;
    buzzFeedback.hidden = false;

    // Retrigger CSS shake animation even on consecutive wrong tries
    body.dataset.state = 'prompting';
    void sceneRig.offsetWidth;
    body.dataset.state = 'buzzing';

    updateKeyHighlights();
    window.hermesAudio.playBuzz();
    window.hermesAudio.speak(`Oops! Try again. Press ${targetChar}!`, {
      rate: 0.96,
      pitch: 0.9,
      delayMs: 120,
      isBuzz: true
    });
    announce(`Try again. Press ${targetChar}`);

    // Relax Hermes' squinting eyes back to curious prompting face after shake
    state.buzzTimer = setTimeout(() => {
      if (state.phase === 'buzzing') {
        state.phase = 'prompting';
        body.dataset.state = 'prompting';
      }
    }, 780);
  }

  function handleAttempt(rawKey) {
    if (!state.currentItem) return;

    // During celebration, reward joyful key taps with sparkles instead of buzzing!
    if (state.phase === 'celebrating') {
      window.hermesAudio.playSparkleTap();
      spawnConfettiBurst(6);
      return;
    }

    window.hermesAudio.playClack();

    const normalized = rawKey.toUpperCase();
    const targetChar = getActiveTargetChar();

    if (normalized === targetChar) {
      if (
        isMultiCharItem(state.currentItem) &&
        state.charIndex < state.currentItem.key.length - 1
      ) {
        advanceWordLetter();
      } else {
        triggerCelebration();
      }
    } else {
      triggerBuzz(rawKey);
    }
  }

  // Global Single-Key Listener (No Enter/Return confirmation required!)
  window.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (IGNORED_KEYS.has(e.key)) return;

    // Do not intercept keys while parent options popover is open
    if (optionsPopover.matches(':popover-open')) return;

    // Allow keyboard Tab users to activate focused HUD buttons via Enter
    const active = document.activeElement;
    if (
      (e.key === 'Enter' || e.key === ' ') &&
      active &&
      active.closest('.top-hud') &&
      active.matches(':focus-visible')
    ) {
      return;
    }

    // Prevent browser scrolling on Space, quick-find on '/', or Backspace nav
    if (
      e.key === ' ' ||
      e.key === '/' ||
      e.key === "'" ||
      e.key === 'Backspace' ||
      e.key === 'Enter'
    ) {
      e.preventDefault();
    }

    // Ignore held-down key auto-repeat so 4yo holding a key doesn't spam buzzes
    if (e.repeat) return;

    state.hasInteracted = true;
    window.hermesAudio.unlock();

    // Ignore Enter/Backspace as silent non-buzz keys in case child taps Return out of habit
    if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete') {
      window.hermesAudio.playClack();
      return;
    }

    if (e.key.length === 1) {
      flashKeyPress(e.key);
      handleAttempt(e.key);
    }
  });

  // Keep Red Arrow fallback coordinates aligned on viewport/fullscreen resize
  if ('ResizeObserver' in window && keysContainer) {
    const ro = new ResizeObserver(() => {
      if (state.hintStage === 'arrow' && state.phase !== 'celebrating') {
        syncArrowCoordinates();
      }
    });
    ro.observe(keysContainer);
  }

  // Fullscreen Toggle
  function isFullscreenActive() {
    return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function syncFullscreenUI() {
    const active = isFullscreenActive();
    body.classList.toggle('is-fullscreen', active);
    fullscreenBtn.setAttribute(
      'aria-label',
      active ? 'Exit full screen' : 'Enter full screen'
    );
  }

  async function toggleFullscreen() {
    state.hasInteracted = true;
    window.hermesAudio.unlock();
    try {
      if (!isFullscreenActive()) {
        const root = document.documentElement;
        if (root.requestFullscreen) {
          await root.requestFullscreen();
        } else if (root.webkitRequestFullscreen) {
          root.webkitRequestFullscreen();
        }
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } catch (_) {
      // Ignore fullscreen rejection if restricted by iframe/embed
    }
    syncFullscreenUI();
  }

  fullscreenBtn.addEventListener('click', (e) => {
    if (e.detail > 0) fullscreenBtn.blur();
    toggleFullscreen();
  });

  document.addEventListener('fullscreenchange', syncFullscreenUI);
  document.addEventListener('webkitfullscreenchange', syncFullscreenUI);

  // Sound & Happy Thinking Music Toggles
  soundBtn.addEventListener('click', (e) => {
    if (e.detail > 0) soundBtn.blur();
    state.hasInteracted = true;
    state.soundOn = !state.soundOn;
    if (state.soundOn) {
      window.hermesAudio.unlock();
    }
    syncSoundUI();
    saveSettings();
  });

  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      if (e.detail > 0) musicBtn.blur();
      state.hasInteracted = true;
      state.musicOn = !state.musicOn;
      syncSoundUI();
      if (state.soundOn && state.musicOn) {
        window.hermesAudio.unlock();
      }
      saveSettings();
    });
  }

  // Unlock Web Audio & start gentle thinking music on first pointer interaction anywhere
  window.addEventListener(
    'pointerdown',
    (e) => {
      if (
        e.target &&
        e.target.closest &&
        e.target.closest('#sound-toggle-btn, #music-toggle-btn')
      ) {
        return;
      }
      state.hasInteracted = true;
      if (state.soundOn) {
        window.hermesAudio.unlock();
      }
    },
    { passive: true }
  );

  // Parent Settings Listeners
  modeSelect.addEventListener('change', () => {
    state.mode = modeSelect.value;
    state.deck = [];
    state.seqIndex = 0;
    state.isInitialLoad = false;
    saveSettings();
    startNewPrompt({ speakPrompt: true, animateFeed: true });
  });

  orderSelect.addEventListener('change', () => {
    state.order = orderSelect.value;
    state.deck = [];
    state.seqIndex = 0;
    state.isInitialLoad = false;
    saveSettings();
    startNewPrompt({ speakPrompt: true, animateFeed: true });
  });

  if (musicCheckbox) {
    musicCheckbox.addEventListener('change', () => {
      state.hasInteracted = true;
      state.musicOn = musicCheckbox.checked;
      syncSoundUI();
      if (state.soundOn && state.musicOn) {
        window.hermesAudio.unlock();
      }
      saveSettings();
    });
  }

  voiceCheckbox.addEventListener('change', () => {
    state.voiceOn = voiceCheckbox.checked;
    syncSoundUI();
    saveSettings();
  });

  hintCheckbox.addEventListener('change', () => {
    state.showHint = hintCheckbox.checked;
    saveSettings();
    updateKeyHighlights();
  });

  skipBtn.addEventListener('click', () => {
    state.hasInteracted = true;
    window.hermesAudio.unlock();
    optionsPopover.hidePopover?.();
    startNewPrompt({ speakPrompt: true, animateFeed: true });
  });

  // Clicking the paper reads the target prompt aloud for pre-readers!
  paperSheet.addEventListener('click', () => {
    state.hasInteracted = true;
    window.hermesAudio.unlock();
    if (state.currentItem && state.phase !== 'celebrating') {
      window.hermesAudio.playClack();
      const item = state.currentItem;
      const activeChar = getActiveTargetChar();
      const speech = isMultiCharItem(item)
        ? `Spell ${item.word}! Press ${activeChar}!`
        : `Type ${activeChar}!`;
      window.hermesAudio.speak(speech, { rate: 0.95, pitch: 0.92 });
    }
  });

  // Boot!
  loadSettings();
  renderTypewriterKeys();
  startNewPrompt({ speakPrompt: false, animateFeed: false });
})();
