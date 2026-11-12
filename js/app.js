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

  const VALID_MODES = ['letters', 'numbers', 'both', 'words', 'words3', 'words4'];
  const COLOR_HINT_DELAY_MS = 5000;
  const RED_ARROW_DELAY_MS = 10000;

  // TODO(player-name): Placeholder until the "enter your name" feature lands.
  // Replace with the saved player name; every voice line reads it via playerName().
  const PLACEHOLDER_PLAYER_NAME = 'John';

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
  const hermesSvg = document.getElementById('hermes-svg');
  const eyeLeft = document.getElementById('eye-left');
  const eyeRight = document.getElementById('eye-right');
  const pupilLeft = document.getElementById('pupil-left');
  const pupilRight = document.getElementById('pupil-right');
  const keysContainer = document.getElementById('typewriter-keys');
  const keyRowsMount = document.getElementById('key-rows-mount') || keysContainer;
  const keyRedArrow = document.getElementById('key-red-arrow');

  const soundBtn = document.getElementById('sound-toggle-btn');
  const musicBtn = document.getElementById('music-toggle-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const optionsBtn = document.getElementById('options-btn');
  const optionsPopover = document.getElementById('parent-options');
  const modeSelect = document.getElementById('mode-select');
  const orderSelect = document.getElementById('order-select');
  const fastModeCheckbox = document.getElementById('fast-mode-checkbox');
  const musicCheckbox = document.getElementById('music-checkbox');
  const voiceCheckbox = document.getElementById('voice-checkbox');
  const hintCheckbox = document.getElementById('hint-checkbox');
  const skipBtn = document.getElementById('skip-letter-btn');

  // State
  const state = {
    phase: 'prompting', // 'prompting' | 'buzzing' | 'celebrating'
    mode: 'letters', // 'letters' | 'numbers' | 'both' | 'words'
    order: 'shuffle', // 'shuffle' | 'sequential'
    fastMode: false,
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
    isInitialLoad: true,
    playerName: PLACEHOLDER_PLAYER_NAME,
    hasGreeted: false,
    affirmationDeck: [],
    lastAffirmationIndex: -1
  };

  const keyButtonsByChar = new Map();
  const keySvgCoordsByChar = new Map();
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

  function syncFastModeUI() {
    body.classList.toggle('is-fast-mode', state.fastMode);
    if (fastModeCheckbox) {
      fastModeCheckbox.checked = state.fastMode;
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
      if (typeof saved.fastMode === 'boolean') {
        state.fastMode = saved.fastMode;
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
      if (typeof saved.playerName === 'string' && saved.playerName.trim()) {
        state.playerName = saved.playerName.trim();
      }
    } catch (_) {
      // Ignore storage errors in private/file contexts
    }
    syncFastModeUI();
    syncSoundUI();
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        'hermes_settings_v1',
        JSON.stringify({
          mode: state.mode,
          order: state.order,
          fastMode: state.fastMode,
          soundOn: state.soundOn,
          musicOn: state.musicOn,
          voiceOn: state.voiceOn,
          showHint: state.showHint,
          playerName: state.playerName
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
    const { letters, numbers, words, threeLetterWords, fourLetterWords } = window.HERMES_WORDS;
    if (state.mode === 'numbers') return [...numbers];
    if (state.mode === 'both') return [...letters, ...numbers];
    if (state.mode === 'words3') return [...(threeLetterWords || words)];
    if (state.mode === 'words4') return [...(fourLetterWords || words)];
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

  /* =========================================================
     HERMES VOICE SCRIPT — every spoken line lives here
     ========================================================= */
  function playerName() {
    return state.playerName || PLACEHOLDER_PLAYER_NAME;
  }

  /**
   * Convert a single letter into a lowercase token so OS speech synthesis
   * says the letter name ("f", "o", "x") instead of "Capital F, Capital O, Capital X".
   * Maps 'A' -> 'ay' so TTS never reads standalone 'a' as the article "uh".
   */
  function spokenLetter(ch) {
    const upper = String(ch).toUpperCase();
    if (upper === 'A') return 'ay';
    return upper.toLowerCase();
  }

  /** "the letter v" / "the number 7" */
  function charLabel(ch) {
    return /^\d$/.test(ch) ? `the number ${ch}` : `the letter ${spokenLetter(ch)}`;
  }

  /** Build the prompt context object passed to each post-answer affirmation template */
  function buildAffirmationContext(item) {
    const multiChar = isMultiCharItem(item);
    const isDigit = !multiChar && /^\d$/.test(item.key);
    const kind = multiChar ? (item.isBonus ? 'bonus word' : 'word') : isDigit ? 'number' : 'letter';
    const nextPrompt = multiChar
      ? item.isBonus
        ? `the bonus word ${item.word}`
        : `the word ${item.word}`
      : charLabel(item.key);
    const shortPrompt = multiChar ? item.word : spokenLetter(item.key);
    const actionVerb = multiChar ? 'spell' : 'find';
    return {
      name: playerName(),
      kind,
      nextPrompt,
      shortPrompt,
      actionVerb
    };
  }

  /**
   * 16 post-answer voice affirmations (10 using the player's name placeholder "John", 6 without).
   */
  const POST_ANSWER_AFFIRMATIONS = [
    // --- 10 affirmations that use the player's name (placeholder: "John") ---
    {
      usesName: true,
      format: ({ name, nextPrompt }) => `Awesome, ${name}. Now find ${nextPrompt}.`
    },
    {
      usesName: true,
      format: ({ name, nextPrompt }) => `Amazing. ${name}, can you find ${nextPrompt}?`
    },
    {
      usesName: true,
      format: ({ name, actionVerb, nextPrompt }) =>
        `Great job, ${name}. Can you ${actionVerb} ${nextPrompt}?`
    },
    {
      usesName: true,
      format: ({ name, kind, shortPrompt }) =>
        `Well done, ${name}! The next ${kind} is ${shortPrompt}.`
    },
    {
      usesName: true,
      format: ({ name, nextPrompt }) => `Way to go, ${name}! Let's try ${nextPrompt}.`
    },
    {
      usesName: true,
      format: ({ name, actionVerb, nextPrompt }) =>
        `Super typing, ${name}! Now ${actionVerb} ${nextPrompt}.`
    },
    {
      usesName: true,
      format: ({ name, nextPrompt }) => `Fantastic, ${name}! What about ${nextPrompt}?`
    },
    {
      usesName: true,
      format: ({ name, actionVerb, nextPrompt }) =>
        `You're a star, ${name}! Can you ${actionVerb} ${nextPrompt}?`
    },
    {
      usesName: true,
      format: ({ name, nextPrompt }) => `Brilliant work, ${name}. Next up is ${nextPrompt}.`
    },
    {
      usesName: true,
      format: ({ name, actionVerb, nextPrompt }) =>
        `Hooray, ${name}! Now can you ${actionVerb} ${nextPrompt}?`
    },

    // --- 6 affirmations without the player's name ---
    {
      usesName: false,
      format: ({ kind, shortPrompt }) => `You did it! The next ${kind} is ${shortPrompt}.`
    },
    {
      usesName: false,
      format: ({ nextPrompt }) => `Correct! What about ${nextPrompt}?`
    },
    {
      usesName: false,
      format: ({ actionVerb, nextPrompt }) => `Great! Now ${actionVerb} ${nextPrompt}?`
    },
    {
      usesName: false,
      format: ({ kind, shortPrompt }) => `Woohoo! The next ${kind} is ${shortPrompt}.`
    },
    {
      usesName: false,
      format: ({ actionVerb, nextPrompt }) => `Spot on! Can you ${actionVerb} ${nextPrompt}?`
    },
    {
      usesName: false,
      format: ({ nextPrompt }) => `Yay! Let's do ${nextPrompt} next.`
    }
  ];

  function pickNextAffirmationTemplate() {
    if (state.affirmationDeck.length === 0) {
      const indices = POST_ANSWER_AFFIRMATIONS.map((_, i) => i);
      state.affirmationDeck = shuffleArray(indices);
      if (
        state.affirmationDeck.length > 1 &&
        state.affirmationDeck[state.affirmationDeck.length - 1] === state.lastAffirmationIndex
      ) {
        const topIdx = state.affirmationDeck.length - 1;
        const tmp = state.affirmationDeck[topIdx];
        state.affirmationDeck[topIdx] = state.affirmationDeck[0];
        state.affirmationDeck[0] = tmp;
      }
    }
    const chosenIdx = state.affirmationDeck.pop();
    state.lastAffirmationIndex = chosenIdx;
    return POST_ANSWER_AFFIRMATIONS[chosenIdx];
  }

  const VoiceScript = {
    affirmations: POST_ANSWER_AFFIRMATIONS,

    resetAffirmationDeck() {
      state.affirmationDeck = [];
      state.lastAffirmationIndex = -1;
    },

    /** Format a specific affirmation template (0..15) for a given prompt item */
    formatAffirmation(index, item) {
      const entry = POST_ANSWER_AFFIRMATIONS[index];
      return entry ? entry.format(buildAffirmationContext(item)) : '';
    },

    /** Fresh challenge (first of the session, mode change, or skip) */
    opening(item) {
      const line = isMultiCharItem(item)
        ? `${item.isBonus ? 'Bonus word! ' : ''}Can you spell the word ${item.word}?`
        : `Can you find ${charLabel(item.key)}?`;
      return state.hasGreeted ? line : `Hi ${playerName()}! ${line}`;
    },

    /** Follow-on challenge straight after a correct answer (cycles through all 16 affirmations) */
    afterSuccess(item) {
      const entry = pickNextAffirmationTemplate();
      return entry.format(buildAffirmationContext(item));
    },

    /** Echo each correctly typed letter inside a word ("f", "o", ...) without saying "Capital" or "Next" */
    letterEcho(ch) {
      return spokenLetter(ch);
    },

    /** Single letter / number solved: "d is for Dog!" / "1! A Kookaburra in a Gum Tree!" */
    singleSolved(item) {
      if (item.key.length === 1 && !/^\d$/.test(item.key)) {
        return `${spokenLetter(item.key)} is for ${item.word}!`;
      }
      return item.spoken || item.phrase;
    },

    /** Final letter of a word solved: "x. Fox!" */
    wordSolved(item) {
      const lastChar = item.key[item.key.length - 1];
      return `${spokenLetter(lastChar)}. ${item.word}!`;
    },

    /** Wrong key */
    oops(item, targetChar) {
      return isMultiCharItem(item)
        ? `Oops! Try again, ${playerName()}. Find ${charLabel(targetChar)}.`
        : `Oops! Try again, ${playerName()}. Can you find ${charLabel(targetChar)}?`;
    },

    /** Child taps the paper to hear the current instruction again */
    repeat(item, targetChar) {
      if (isMultiCharItem(item)) {
        return state.charIndex === 0
          ? `Can you spell the word ${item.word}?`
          : `Can you find ${charLabel(targetChar)}?`;
      }
      return `Can you find ${charLabel(targetChar)}?`;
    }
  };

  // Expose VoiceScript and playerName setter for testing and future username UI
  window.HERMES_VOICE_SCRIPT = VoiceScript;
  window.setHermesPlayerName = function setHermesPlayerName(name) {
    state.playerName = typeof name === 'string' && name.trim() ? name.trim() : PLACEHOLDER_PLAYER_NAME;
    saveSettings();
    return state.playerName;
  };

  /** Build permanent 4-row pill-rounded vintage typewriter keycaps (1-0 + QWERTY + Spacebar) */
  function renderTypewriterKeys() {
    keyRowsMount.innerHTML = '';
    keyButtonsByChar.clear();
    keySvgCoordsByChar.clear();

    // Precompute exact 1280x612 viewBox centers per row/col as zero-layout fallback
    const rowStaggers = [
      { padStart: 0, padEnd: 0.012, y: 264.5 },
      { padStart: 0.012, padEnd: 0, y: 340.5 },
      { padStart: 0, padEnd: 0.01, y: 416.6 },
      { padStart: 0, padEnd: 0.024, y: 492.6 }
    ];
    const boxX0 = 128;
    const boxW = 1024;
    const keyW = 88.06;
    const gapX = 10.5;

    ALL_KEY_ROWS.forEach((rowKeys, rowIdx) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'key-row';
      const stagger = rowStaggers[rowIdx] || { padStart: 0, padEnd: 0, y: 340.5 };
      const usableX0 = boxX0 + stagger.padStart * boxW;
      const usableX1 = boxX0 + boxW - stagger.padEnd * boxW;
      const rowSpan = rowKeys.length * keyW + (rowKeys.length - 1) * gapX;
      const firstCenterX = (usableX0 + usableX1 - rowSpan) / 2 + keyW / 2;

      rowKeys.forEach((char, colIdx) => {
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
        keySvgCoordsByChar.set(char, {
          x: firstCenterX + colIdx * (keyW + gapX),
          y: stagger.y
        });
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

  /** Map a target key's live rendered center into Hermes's 1280x612 SVG viewBox */
  function getKeySvgPoint(char) {
    const targetBtn = keyButtonsByChar.get(char);
    if (
      hermesSvg &&
      targetBtn &&
      typeof hermesSvg.getBoundingClientRect === 'function' &&
      typeof targetBtn.getBoundingClientRect === 'function'
    ) {
      const svgRect = hermesSvg.getBoundingClientRect();
      const btnRect = targetBtn.getBoundingClientRect();
      if (
        svgRect.width > 0 &&
        svgRect.height > 0 &&
        btnRect.width > 0 &&
        Number.isFinite(svgRect.left) &&
        Number.isFinite(svgRect.top) &&
        Number.isFinite(btnRect.left) &&
        Number.isFinite(btnRect.top)
      ) {
        return {
          x: ((btnRect.left + btnRect.width / 2 - svgRect.left) / svgRect.width) * 1280,
          y: ((btnRect.top + btnRect.height / 2 - svgRect.top) / svgRect.height) * 612
        };
      }
    }
    return keySvgCoordsByChar.get(char) || null;
  }

  /** Compute elliptical pupil offset (in SVG viewBox units) from an eye center to a target */
  function computePupilOffset(eyeX, eyeY, targetX, targetY) {
    const MAX_X = 12.6;
    const MAX_Y = 19.6;
    const dx = targetX - eyeX;
    const dy = targetY - eyeY;

    let nx = Math.tanh(dx / 290);
    let ny;
    if (dy < 0) {
      ny = Math.max(-0.55, dy / 220);
    } else {
      const rowDepth = Math.max(0, Math.min(1, (dy - 190) / 265));
      ny = 0.36 + 0.58 * rowDepth;
    }

    const mag = Math.hypot(nx, ny);
    if (mag > 1) {
      nx /= mag;
      ny /= mag;
    }
    return {
      x: nx * MAX_X,
      y: ny * MAX_Y
    };
  }

  function applyEyeOffset(eyeEl, pupilEl, offset) {
    const px = `${offset.x.toFixed(2)}px`;
    const py = `${offset.y.toFixed(2)}px`;
    if (pupilEl) {
      pupilEl.style.setProperty('--pupil-x', px);
      pupilEl.style.setProperty('--pupil-y', py);
    }
    if (eyeEl) {
      eyeEl.style.setProperty('--pupil-x', px);
      eyeEl.style.setProperty('--pupil-y', py);
    }
  }

  /** Animate Hermes's wide-set eyes (462,56 & 818,56) to look at the next key to press */
  function updateEyeGaze() {
    if (!pupilLeft || !pupilRight) return;

    const LEFT_EYE = { x: 462, y: 56 };
    const RIGHT_EYE = { x: 818, y: 56 };

    if (state.phase === 'celebrating') {
      // Look cheerfully up toward the rainbow word & bounding critter on the paper!
      const paperTarget = { x: 640, y: -65 };
      applyEyeOffset(
        eyeLeft,
        pupilLeft,
        computePupilOffset(LEFT_EYE.x, LEFT_EYE.y, paperTarget.x, paperTarget.y)
      );
      applyEyeOffset(
        eyeRight,
        pupilRight,
        computePupilOffset(RIGHT_EYE.x, RIGHT_EYE.y, paperTarget.x, paperTarget.y)
      );
      return;
    }

    const activeChar = getActiveTargetChar();
    const targetPt = activeChar ? getKeySvgPoint(activeChar) : null;
    if (!targetPt) {
      applyEyeOffset(eyeLeft, pupilLeft, { x: 0, y: 0 });
      applyEyeOffset(eyeRight, pupilRight, { x: 0, y: 0 });
      return;
    }

    applyEyeOffset(
      eyeLeft,
      pupilLeft,
      computePupilOffset(LEFT_EYE.x, LEFT_EYE.y, targetPt.x, targetPt.y)
    );
    applyEyeOffset(
      eyeRight,
      pupilRight,
      computePupilOffset(RIGHT_EYE.x, RIGHT_EYE.y, targetPt.x, targetPt.y)
    );
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
    updateEyeGaze();
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
  function startNewPrompt({
    speakPrompt = false,
    animateFeed = false,
    afterSuccess = false
  } = {}) {
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
      const promptSpeech = afterSuccess
        ? VoiceScript.afterSuccess(item)
        : VoiceScript.opening(item);
      state.hasGreeted = true;
      // After a win, queue behind the celebration line so it is never clipped
      window.hermesAudio.speak(promptSpeech, {
        mood: 'prompt',
        fast: state.fastMode,
        queue: afterSuccess,
        delayMs: state.fastMode ? 70 : 220
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
      const dur = (
        state.fastMode ? 0.65 + Math.random() * 0.42 : 1.25 + Math.random() * 0.9
      ).toFixed(2);

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
    promptPrefix.textContent = 'Spell:';
    syncWordProgressUI(stampedIdx);

    // Reset progressive 5s colour & 10s red arrow timers for the new target letter!
    startHintTimersForActiveChar();
    updateKeyHighlights();

    // Say the letter just typed back to the child ("F" ... "O" ...)
    window.hermesAudio.playLetterStep(stampedIdx);
    window.hermesAudio.speak(VoiceScript.letterEcho(item.key[stampedIdx]), {
      mood: 'echo',
      fast: state.fastMode
    });
    announce(`${item.key[stampedIdx]}. Now ${nextChar}`);
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
    spawnConfettiBurst(state.fastMode ? 22 : 40);

    window.hermesAudio.setCelebrating(true);
    window.hermesAudio.playSuccess(item.sfx, { fast: state.fastMode });
    const multiChar = isMultiCharItem(item);
    const celebrateSpeech = multiChar
      ? VoiceScript.wordSolved(item)
      : VoiceScript.singleSolved(item);
    window.hermesAudio.speak(celebrateSpeech, {
      mood: 'cheer',
      fast: state.fastMode,
      // Words echo the final letter immediately; single letters let the DING ring first
      delayMs: multiChar ? 60 : state.fastMode ? 40 : 360
    });
    announce(`Correct! ${item.phrase}`);

    const holdMs = state.fastMode
      ? isMultiCharItem(item) || typeof item.count === 'number'
        ? 1100
        : 950
      : isMultiCharItem(item) || typeof item.count === 'number'
        ? 4150
        : 3750;
    state.celebrateTimer = setTimeout(() => {
      startNewPrompt({ speakPrompt: true, animateFeed: true, afterSuccess: true });
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
    window.hermesAudio.speak(VoiceScript.oops(item, targetChar), {
      mood: 'oops',
      fast: state.fastMode,
      delayMs: 120,
      isBuzz: true
    });
    announce(`Try again. Find ${charLabel(targetChar)}`);

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

  // Keep eye gaze & Red Arrow fallback coordinates aligned on viewport/fullscreen resize
  if ('ResizeObserver' in window && keysContainer) {
    const ro = new ResizeObserver(() => {
      updateEyeGaze();
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

  if (fastModeCheckbox) {
    fastModeCheckbox.addEventListener('change', () => {
      state.hasInteracted = true;
      state.fastMode = fastModeCheckbox.checked;
      syncFastModeUI();
      saveSettings();
      if (state.fastMode && state.phase === 'celebrating') {
        clearTimeout(state.celebrateTimer);
        startNewPrompt({ speakPrompt: true, animateFeed: true });
      }
    });
  }

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
    optionsBtn?.blur();
    startNewPrompt({ speakPrompt: true, animateFeed: true });
  });

  if (optionsBtn) {
    optionsBtn.addEventListener('click', (e) => {
      if (e.detail > 0) optionsBtn.blur();
    });
  }

  if (optionsPopover) {
    optionsPopover.addEventListener('toggle', (e) => {
      if (e.newState === 'closed') {
        optionsBtn?.blur();
      }
    });
  }

  // Clicking the paper reads the target prompt aloud for pre-readers!
  paperSheet.addEventListener('click', () => {
    state.hasInteracted = true;
    window.hermesAudio.unlock();
    if (state.currentItem && state.phase !== 'celebrating') {
      window.hermesAudio.playClack();
      const item = state.currentItem;
      const activeChar = getActiveTargetChar();
      window.hermesAudio.speak(VoiceScript.repeat(item, activeChar), {
        mood: 'prompt',
        fast: state.fastMode
      });
    }
  });

  // Boot!
  loadSettings();
  renderTypewriterKeys();
  startNewPrompt({ speakPrompt: false, animateFeed: false });
})();
