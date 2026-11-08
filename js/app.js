/**
 * Type Great Hermes — Main Game Controller
 * Black & White prompt -> Instant single-key check -> Buzz or Colour Burst!
 */
(function () {
  const QWERTY_LETTER_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  const NUMBER_ROW = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

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
  const promptHeading = document.getElementById('prompt-heading');
  const promptPrefix = document.getElementById('prompt-prefix');
  const promptTarget = document.getElementById('prompt-target');
  const buzzFeedback = document.getElementById('buzz-feedback');
  const paperSheet = document.getElementById('paper-sheet');
  const paperLetterText = document.getElementById('paper-letter-text');
  const paperLetterShadow = document.getElementById('paper-letter-shadow');
  const paperPhrase = document.getElementById('paper-phrase');
  const critterStage = document.getElementById('critter-stage');
  const calloutLeft = document.getElementById('callout-left');
  const calloutRight = document.getElementById('callout-right');
  const confettiLayer = document.getElementById('confetti-layer');
  const keysContainer = document.getElementById('typewriter-keys');

  const soundBtn = document.getElementById('sound-toggle-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const optionsPopover = document.getElementById('parent-options');
  const modeSelect = document.getElementById('mode-select');
  const orderSelect = document.getElementById('order-select');
  const voiceCheckbox = document.getElementById('voice-checkbox');
  const hintCheckbox = document.getElementById('hint-checkbox');
  const skipBtn = document.getElementById('skip-letter-btn');

  // State
  const state = {
    phase: 'prompting', // 'prompting' | 'buzzing' | 'celebrating'
    mode: 'letters', // 'letters' | 'numbers' | 'both'
    order: 'shuffle', // 'shuffle' | 'sequential'
    soundOn: true,
    voiceOn: true,
    showHint: true,
    hasInteracted: false,
    deck: [],
    seqIndex: 0,
    currentItem: null,
    wrongCountThisTurn: 0,
    buzzTimer: null,
    celebrateTimer: null,
    isInitialLoad: true
  };

  const keyButtonsByChar = new Map();
  let spacebarEl = null;

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem('hermes_settings_v1') || '{}');
      if (saved.mode && ['letters', 'numbers', 'both'].includes(saved.mode)) {
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
    window.hermesAudio.setVoiceEnabled(state.voiceOn);
    soundBtn.setAttribute('aria-pressed', String(state.soundOn));
    soundBtn.setAttribute('aria-label', state.soundOn ? 'Mute sound' : 'Turn sound on');
  }

  function getPool() {
    const { letters, numbers } = window.HERMES_WORDS;
    if (state.mode === 'numbers') return [...numbers];
    if (state.mode === 'both') return [...letters, ...numbers];
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
      // Mix featured items naturally into the first 5 prompts after D
      const earlyMix = shuffleArray([...featured, ...rest.slice(0, 2)]);
      state.deck = [dItem, ...earlyMix, ...rest.slice(2)];
      return;
    }

    state.isInitialLoad = false;
    let shuffled = shuffleArray(pool);
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

  /** Build interactive round vintage typewriter keycaps on Hermes' deck */
  function renderTypewriterKeys() {
    keysContainer.innerHTML = '';
    keyButtonsByChar.clear();

    const includeNumbers = state.mode === 'numbers' || state.mode === 'both';
    keysContainer.classList.toggle('has-number-row', includeNumbers);

    const rows = includeNumbers
      ? [NUMBER_ROW, ...QWERTY_LETTER_ROWS]
      : QWERTY_LETTER_ROWS;

    rows.forEach((rowKeys) => {
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
      keysContainer.appendChild(rowEl);
    });

    const spaceRow = document.createElement('div');
    spaceRow.className = 'key-row';
    spacebarEl = document.createElement('div');
    spacebarEl.className = 'tw-spacebar';
    spacebarEl.setAttribute('aria-hidden', 'true');
    spaceRow.appendChild(spacebarEl);
    keysContainer.appendChild(spaceRow);

    updateKeyHighlights();
  }

  function updateKeyHighlights() {
    keyButtonsByChar.forEach((btn, char) => {
      const isTarget = Boolean(state.currentItem && char === state.currentItem.key);
      const shouldHint =
        isTarget &&
        state.phase !== 'celebrating' &&
        (state.showHint || state.wrongCountThisTurn >= 1);
      btn.classList.toggle('is-hint', shouldHint);
      btn.classList.toggle(
        'is-target-celebrate',
        isTarget && state.phase === 'celebrating'
      );
    });
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

  /** Set up a crisp Black & White question prompt */
  function startNewPrompt({ speakPrompt = false, animateFeed = false } = {}) {
    clearTimeout(state.buzzTimer);
    clearTimeout(state.celebrateTimer);

    state.phase = 'prompting';
    state.wrongCountThisTurn = 0;
    state.currentItem = nextItem();

    const item = state.currentItem;
    body.dataset.state = 'prompting';
    body.style.setProperty('--accent-hue', String(item.accentHue || 36));

    // Clear old confetti
    confettiLayer.innerHTML = '';

    // Update top prompt banner
    promptPrefix.textContent = 'Type:';
    promptTarget.textContent = item.key;
    buzzFeedback.hidden = true;

    // Update paper contents
    paperLetterText.textContent = item.key;
    paperLetterShadow.textContent = item.key;
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

    updateKeyHighlights();
    announce(`Type ${item.key}`);

    if (speakPrompt && state.hasInteracted) {
      window.hermesAudio.speak(`Type ${item.key}!`, {
        rate: 0.96,
        pitch: 1.12,
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
      const dist = 120 + Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.45;
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

  /** Handle Correct Answer -> Burst of Colour & Sound! */
  function triggerCelebration() {
    clearTimeout(state.buzzTimer);
    clearTimeout(state.celebrateTimer);

    const item = state.currentItem;
    state.phase = 'celebrating';
    buzzFeedback.hidden = true;

    promptPrefix.textContent = 'Yay!';
    promptTarget.textContent = item.key;

    body.dataset.state = 'celebrating';
    updateKeyHighlights();
    spawnConfettiBurst(38);

    window.hermesAudio.playSuccess(item.sfx);
    window.hermesAudio.speak(item.phrase, {
      rate: 0.95,
      pitch: 1.15,
      delayMs: 360
    });
    announce(`Correct! ${item.phrase}`);

    state.celebrateTimer = setTimeout(() => {
      startNewPrompt({ speakPrompt: true, animateFeed: true });
    }, 3750);
  }

  /** Handle Incorrect Answer -> Playful Buzz + Shake + Try Again Prompt! */
  function triggerBuzz(pressedRaw) {
    clearTimeout(state.buzzTimer);

    state.phase = 'buzzing';
    state.wrongCountThisTurn += 1;

    const targetKey = state.currentItem.key;
    const displayPressed =
      pressedRaw === ' '
        ? 'Space'
        : /^[a-zA-Z0-9]$/.test(pressedRaw)
          ? pressedRaw.toUpperCase()
          : '';

    promptPrefix.textContent = 'Try again! Type:';
    promptTarget.textContent = targetKey;

    buzzFeedback.textContent = displayPressed
      ? `Oops, that was ${displayPressed}! Find ${targetKey}!`
      : `Oops! Try again — find ${targetKey}!`;
    buzzFeedback.hidden = false;

    // Retrigger CSS shake animation even on consecutive wrong tries
    body.dataset.state = 'prompting';
    void sceneRig.offsetWidth;
    body.dataset.state = 'buzzing';

    updateKeyHighlights();
    window.hermesAudio.playBuzz();
    window.hermesAudio.speak(`Oops! Try again. Press ${targetKey}!`, {
      rate: 0.98,
      pitch: 1.08,
      delayMs: 120,
      isBuzz: true
    });
    announce(`Try again. Type ${targetKey}`);

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
    if (normalized === state.currentItem.key) {
      triggerCelebration();
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
    if (e.key === ' ' || e.key === '/' || e.key === "'" || e.key === 'Backspace' || e.key === 'Enter') {
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

  // Sound Toggle
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

  // Parent Settings Listeners
  modeSelect.addEventListener('change', () => {
    state.mode = modeSelect.value;
    state.deck = [];
    state.seqIndex = 0;
    state.isInitialLoad = false;
    saveSettings();
    renderTypewriterKeys();
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

  // Clicking the paper reads the target letter aloud for pre-readers!
  paperSheet.addEventListener('click', () => {
    state.hasInteracted = true;
    window.hermesAudio.unlock();
    if (state.currentItem && state.phase !== 'celebrating') {
      window.hermesAudio.playClack();
      window.hermesAudio.speak(`Type ${state.currentItem.key}!`);
    }
  });

  // Boot!
  loadSettings();
  renderTypewriterKeys();
  startNewPrompt({ speakPrompt: false, animateFeed: false });
})();
