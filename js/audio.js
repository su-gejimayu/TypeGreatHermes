/**
 * Web Audio API Vintage Typewriter & Cartoon Sound Synthesizer + Friendly Speech
 */
(function () {
  const NOTE_HZ = {
    C3: 130.81,
    D3: 146.83,
    E3: 164.81,
    F3: 174.61,
    G3: 196.0,
    A3: 220.0,
    B3: 246.94,
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
    A5: 880.0,
    B5: 987.77,
    C6: 1046.5
  };

  // Cheerful 8-bar (64 eighth-note) C-major playground marimba + pizzicato bass loop (~106 BPM)
  const MUSIC_STEP_SEC = 60 / 106 / 2;
  const THINKING_BARS = [
    {
      bass: ['C3', 'G3'],
      chord: ['E4', 'G4'],
      melody: ['E5', 'G5', 'A5', 'G5', 'E5', 'C5', 'D5', 'E5']
    },
    {
      bass: ['A3', 'E3'],
      chord: ['C4', 'E4'],
      melody: ['C5', null, 'E5', 'G5', 'A5', 'G5', 'E5', null]
    },
    {
      bass: ['F3', 'C3'],
      chord: ['F4', 'A4'],
      melody: ['F5', 'A5', 'C6', 'A5', 'G5', 'F5', 'E5', 'D5']
    },
    {
      bass: ['G3', 'D3'],
      chord: ['D4', 'G4'],
      melody: ['G5', null, 'B5', 'A5', 'G5', null, 'D5', 'F5']
    },
    {
      bass: ['C3', 'G3'],
      chord: ['E4', 'G4'],
      melody: ['E5', 'G5', 'C6', 'B5', 'A5', 'G5', 'E5', 'C5']
    },
    {
      bass: ['E3', 'A3'],
      chord: ['E4', 'G4'],
      melody: ['G5', 'E5', 'D5', 'E5', 'C5', null, 'E5', 'G5']
    },
    {
      bass: ['D3', 'A3'],
      chord: ['F4', 'A4'],
      melody: ['F5', 'D5', 'F5', 'A5', 'G5', 'E5', 'F5', 'A5']
    },
    {
      bass: ['G3', 'D3'],
      chord: ['D4', 'F4'],
      melody: ['B5', 'G5', 'A5', 'B5', 'C6', null, 'G5', null]
    }
  ];
  const TOTAL_MUSIC_STEPS = THINKING_BARS.length * 8;

  class HermesAudio {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
      this.musicEnabled = true;
      this.voiceEnabled = true;
      this.isCelebrating = false;
      this.isSpeechDucking = false;
      this.preferredVoice = null;
      this.voiceProfile = { pitch: 1.38, rate: 1.02 };
      this.lastBuzzSpeechAt = 0;

      this.musicBus = null;
      this.musicFilter = null;
      this._musicTimer = null;
      this._speechDuckTimer = null;
      this._nextMusicNoteTime = 0;
      this._musicStep = 0;

      this._initVoices();
      this._initVisibilityHandling();
    }

    _initVoices() {
      if (!('speechSynthesis' in window)) return;
      this._pickVoice = () => {
        const voices = window.speechSynthesis.getVoices() || [];
        if (!voices.length) return;

        const enVoices = voices.filter((v) => /^en(-|_|$)/i.test(v.lang));

        // Exclude known female voices and creepy/robotic novelty voices so Hermes is always a playful male/boy voice
        const femaleOrNoveltyExclude =
          /\b(samantha|karen|victoria|fiona|moira|tessa|veena|allison|ava|susan|zoe|nicky|monica|paulina|satu|kyoko|mei-jia|sin-ji|ting-ting|lekha|mariska|milena|laura|ellen|luciana|joana|ioana|alva|kanya|damayanti|alice|amelie|anna|carmit|sara|nora|melina|yelda|zosia|uzma|zira|hazel|heera|aria|jenny|michelle|sonia|libby|maisie|natasha|clara|molly|leah|yan|neerja|female|woman|girl|albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|pipe organ|superstar|trinoids|whisper|wobble|zarvox|grandma|kathy|princess|sandy|shelley|flo)\b/i;

        const nonFemalePool = enVoices.filter((v) => !femaleOrNoveltyExclude.test(v.name));

        // Playful young-boy / pitched-up male voice profiles in priority order.
        // Adult male voices get a ~1.38x pitch lift so they sound like a cheerful, energetic young boy.
        const boyAndMaleProfiles = [
          { match: 'Lee', pitch: 1.38, rate: 1.02 }, // Aussie male -> pitched up into playful boy voice
          { match: 'Gordon', pitch: 1.38, rate: 1.02 },
          { match: 'Junior', pitch: 1.16, rate: 1.02 }, // macOS young boy voice
          { match: 'Oliver', pitch: 1.38, rate: 1.02 },
          { match: 'Daniel', pitch: 1.4, rate: 1.02 },
          { match: 'Aaron', pitch: 1.38, rate: 1.02 },
          { match: 'Alex', pitch: 1.38, rate: 1.02 },
          { match: 'Rishi', pitch: 1.36, rate: 1.02 },
          { match: 'Microsoft William', pitch: 1.38, rate: 1.02 },
          { match: 'Microsoft Liam', pitch: 1.36, rate: 1.02 },
          { match: 'Microsoft Ryan', pitch: 1.38, rate: 1.02 },
          { match: 'Microsoft Thomas', pitch: 1.38, rate: 1.02 },
          { match: 'Microsoft Guy', pitch: 1.38, rate: 1.02 },
          { match: 'Microsoft Mark', pitch: 1.4, rate: 1.02 },
          { match: 'Microsoft David', pitch: 1.42, rate: 1.02 },
          { match: 'Google UK English Male', pitch: 1.38, rate: 1.02 },
          { match: 'Eddy', pitch: 1.36, rate: 1.02 },
          { match: 'Reed', pitch: 1.36, rate: 1.02 },
          { match: 'Rocko', pitch: 1.36, rate: 1.02 },
          { match: 'Fred', pitch: 1.36, rate: 1.02 },
          { match: 'Ralph', pitch: 1.38, rate: 1.02 }
        ];

        for (const profile of boyAndMaleProfiles) {
          const found = nonFemalePool.find((v) => v.name.includes(profile.match));
          if (found) {
            this.preferredVoice = found;
            this.voiceProfile = { pitch: profile.pitch, rate: profile.rate };
            return;
          }
        }

        // Next fallback: any voice explicitly labeled Male
        const labeledMale = nonFemalePool.find((v) => /\bmale\b/i.test(v.name));
        this.preferredVoice =
          labeledMale || nonFemalePool[0] || enVoices[0] || voices[0];
        this.voiceProfile = { pitch: 1.38, rate: 1.02 };
      };

      this._pickVoice();
      window.speechSynthesis.addEventListener?.('voiceschanged', this._pickVoice);
    }

    _initVisibilityHandling() {
      if (typeof document === 'undefined' || !document.addEventListener) return;
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this._stopMusicScheduler();
        } else if (this.ctx && this.soundEnabled && this.musicEnabled) {
          this._startMusicScheduler();
        }
      });
    }

    unlock() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      if (this.ctx) {
        this._ensureMusicBus();
        if (this.soundEnabled && this.musicEnabled) {
          this._startMusicScheduler();
        }
      }
    }

    setSoundEnabled(enabled) {
      this.soundEnabled = Boolean(enabled);
      if (!this.soundEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this._syncMusicPlayback();
    }

    setMusicEnabled(enabled) {
      this.musicEnabled = Boolean(enabled);
      this._syncMusicPlayback();
    }

    setCelebrating(active) {
      this.isCelebrating = Boolean(active);
      this._updateMusicBusGain();
    }

    setVoiceEnabled(enabled) {
      this.voiceEnabled = Boolean(enabled);
      if (!this.voiceEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    /**
     * Speak in Hermes's high, bouncy kid-friendly voice.
     * @param {string} text
     * @param {object} [opts]
     * @param {'prompt'|'cheer'|'echo'|'oops'} [opts.mood] Expressive tone preset
     * @param {boolean} [opts.fast] Speak a little quicker (Fast Mode)
     * @param {boolean} [opts.queue] Wait for current speech to finish instead of cutting it off
     * @param {number} [opts.delayMs]
     * @param {boolean} [opts.isBuzz] Throttle repeated "oops" lines
     */
    speak(
      text,
      { mood = 'prompt', fast = false, queue = false, delayMs = 0, isBuzz = false } = {}
    ) {
      if (!this.soundEnabled || !this.voiceEnabled) return;
      if (!('speechSynthesis' in window)) return;

      const now = performance.now();
      if (isBuzz && now - this.lastBuzzSpeechAt < 1800) {
        return;
      }
      if (isBuzz) {
        this.lastBuzzSpeechAt = now;
      }

      // Mood presets lift or soften the voice's base pitch & pace for expression
      const MOODS = {
        prompt: { pitch: 0, rate: 1.0 },
        cheer: { pitch: 0.14, rate: 1.05 },
        echo: { pitch: 0.08, rate: 1.0 },
        oops: { pitch: -0.06, rate: 0.97 }
      };
      const moodAdj = MOODS[mood] || MOODS.prompt;
      const base = this.voiceProfile || { pitch: 1.38, rate: 1.02 };
      const pitch = Math.min(2, Math.max(0.5, base.pitch + moodAdj.pitch));
      const rate = base.rate * moodAdj.rate * (fast ? 1.12 : 1);

      // Prevent OS speech synthesizers from saying "Capital F, Capital O, Capital X"
      // whenever an isolated uppercase letter appears in the utterance string.
      const spokenText = String(text).replace(/\b([A-Z])\b/g, (match) => {
        if (match === 'I') return 'I';
        if (match === 'A') return 'ay';
        return match.toLowerCase();
      });

      const duckMusic = () => {
        // Briefly duck happy thinking music while Hermes speaks aloud
        this.isSpeechDucking = true;
        this._updateMusicBusGain();
        clearTimeout(this._speechDuckTimer);
        this._speechDuckTimer = setTimeout(() => {
          this.isSpeechDucking = false;
          this._updateMusicBusGain();
        }, 2400);
      };

      const run = () => {
        if (!this.soundEnabled || !this.voiceEnabled) return;
        try {
          if (!this.preferredVoice && this._pickVoice) {
            this._pickVoice();
          }
          duckMusic();

          if (!queue) {
            window.speechSynthesis.cancel();
          }
          const utter = new SpeechSynthesisUtterance(spokenText);
          if (this.preferredVoice) {
            utter.voice = this.preferredVoice;
            utter.lang = this.preferredVoice.lang;
          }
          utter.rate = rate;
          utter.pitch = pitch;
          utter.volume = 1;
          utter.onstart = duckMusic;
          utter.onend = () => {
            if (window.speechSynthesis.pending) return;
            clearTimeout(this._speechDuckTimer);
            this.isSpeechDucking = false;
            this._updateMusicBusGain();
          };
          window.speechSynthesis.speak(utter);
        } catch (_) {
          // Ignore speech synthesis quirks gracefully
        }
      };

      clearTimeout(this._speechTimer);
      if (delayMs > 0) {
        this._speechTimer = setTimeout(run, delayMs);
      } else {
        run();
      }
    }

    /** Crisp mechanical typewriter key strike */
    playClack() {
      if (!this.soundEnabled) return;
      this.unlock();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;

      // Short filtered mechanical click
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.022);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1900, t);
      filter.Q.setValueAtTime(1.8, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.32, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);

      // Platen rubber thud
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thud.type = 'triangle';
      thud.frequency.setValueAtTime(165, t);
      thud.frequency.exponentialRampToValueAtTime(52, t + 0.035);
      thudGain.gain.setValueAtTime(0.22, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.038);
      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thud.start(t);
      thud.stop(t + 0.04);
    }

    /** Playful comic game-show buzz for wrong key ("Bzz-bzzt!") */
    playBuzz() {
      if (!this.soundEnabled) return;
      this.unlock();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const pulses = [
        { start: 0, dur: 0.11, f1: 148, f2: 132 },
        { start: 0.13, dur: 0.22, f1: 122, f2: 96 }
      ];

      pulses.forEach(({ start, dur, f1, f2 }) => {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(f1, t + start);
        osc1.frequency.linearRampToValueAtTime(f2, t + start + dur);
        osc2.frequency.setValueAtTime(f1 * 1.01, t + start);
        osc2.frequency.linearRampToValueAtTime(f2 * 0.99, t + start + dur);

        // Warm low-pass so the buzz is comical and friendly for a 4-year-old
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(680, t + start);
        filter.Q.setValueAtTime(2.5, t + start);

        gain.gain.setValueAtTime(0.001, t + start);
        gain.gain.linearRampToValueAtTime(0.2, t + start + 0.015);
        gain.gain.setValueAtTime(0.18, t + start + dur - 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(t + start);
        osc2.start(t + start);
        osc1.stop(t + start + dur + 0.01);
        osc2.stop(t + start + dur + 0.01);
      });
    }

    /** Typewriter carriage return bell DING + joyful fanfare + character motif */
    playSuccess(sfxType = 'sparkle', { fast = false } = {}) {
      if (!this.soundEnabled) return;
      this.unlock();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const decayScale = fast ? 0.6 : 1;

      // 1. Shimmering Vintage Typewriter Bell "DING!"
      const bellPartials = [
        { freq: 1760, amp: 0.24, decay: 1.05 * decayScale },
        { freq: 3520, amp: 0.12, decay: 0.65 * decayScale },
        { freq: 5180, amp: 0.07, decay: 0.38 * decayScale }
      ];
      bellPartials.forEach(({ freq, amp, decay }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(amp, t);
        gain.gain.exponentialRampToValueAtTime(0.0008, t + decay);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + decay + 0.02);
      });

      // 2. Cheerful Cartoon Colour-Burst Marimba/Brass Arpeggio
      const stepSec = fast ? 0.045 : 0.075;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
      notes.forEach((freq, idx) => {
        const st = t + (fast ? 0.035 : 0.06) + idx * stepSec;
        const dur = (idx === notes.length - 1 ? 0.55 : 0.22) * (fast ? 0.68 : 1);
        const osc = this.ctx.createOscillator();
        const sub = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        sub.type = 'sine';
        osc.frequency.setValueAtTime(freq, st);
        sub.frequency.setValueAtTime(freq * 2, st);

        gain.gain.setValueAtTime(0.001, st);
        gain.gain.linearRampToValueAtTime(0.2, st + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.001, st + dur);

        osc.connect(gain);
        sub.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(st);
        sub.start(st);
        osc.stop(st + dur + 0.02);
        sub.stop(st + dur + 0.02);
      });

      // 3. Playful Character Sound Effect
      this._playCritterMotif(sfxType, t + (fast ? 0.21 : 0.38));
    }

    _playCritterMotif(type, start) {
      if (!this.ctx) return;

      const tone = (freqStart, freqEnd, st, dur, wave = 'sine', vol = 0.16) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = wave;
        osc.frequency.setValueAtTime(freqStart, st);
        if (freqEnd !== freqStart) {
          osc.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), st + dur);
        }
        gain.gain.setValueAtTime(0.001, st);
        gain.gain.linearRampToValueAtTime(vol, st + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, st + dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(st);
        osc.stop(st + dur + 0.02);
      };

      switch (type) {
        case 'kookaburra': // Iconic laughing Aussie kookaburra "Koo-koo-ka-ka!"
          [0, 0.09, 0.18, 0.27, 0.36].forEach((dt, i) => {
            const base = 760 + (i % 2) * 260;
            tone(base, base * 1.32, start + dt, 0.075, 'triangle', 0.16);
          });
          break;
        case 'bark': // Playful "Arf! Arf!"
          tone(340, 520, start, 0.09, 'triangle', 0.2);
          tone(520, 260, start + 0.06, 0.08, 'triangle', 0.18);
          tone(380, 580, start + 0.19, 0.1, 'triangle', 0.2);
          tone(580, 280, start + 0.25, 0.09, 'triangle', 0.18);
          break;
        case 'oink': // Cute piglet snort-oink
          tone(190, 145, start, 0.11, 'sawtooth', 0.12);
          tone(210, 155, start + 0.14, 0.13, 'sawtooth', 0.12);
          break;
        case 'moo': // Warm friendly cow "Moooo"
          tone(185, 165, start, 0.36, 'sawtooth', 0.11);
          break;
        case 'bee': // Happy honeybee buzz
          tone(260, 295, start, 0.14, 'sawtooth', 0.1);
          tone(295, 250, start + 0.14, 0.16, 'sawtooth', 0.1);
          break;
        case 'hoot': // Wise owl "Hoo-hoo!"
          tone(460, 410, start, 0.15, 'sine', 0.18);
          tone(440, 380, start + 0.2, 0.22, 'sine', 0.18);
          break;
        case 'zap': // Comic electric zap!
          tone(1450, 220, start, 0.14, 'sawtooth', 0.14);
          tone(1680, 310, start + 0.12, 0.16, 'sawtooth', 0.14);
          break;
        case 'rocket': // Rising space zoom
          tone(220, 980, start, 0.32, 'triangle', 0.16);
          break;
        case 'splash':
        case 'bubble': // Bubbly water bloops
          [320, 480, 680, 920].forEach((f, i) => {
            tone(f * 0.75, f * 1.35, start + i * 0.055, 0.08, 'sine', 0.16);
          });
          break;
        case 'boing': // Cartoon spring boing!
          tone(190, 640, start, 0.28, 'sine', 0.2);
          break;
        case 'chirp': // Tweet-tweet!
          tone(1400, 2200, start, 0.07, 'sine', 0.14);
          tone(1500, 2500, start + 0.1, 0.09, 'sine', 0.14);
          break;
        case 'meow':
          tone(680, 920, start, 0.12, 'triangle', 0.15);
          tone(920, 520, start + 0.12, 0.2, 'triangle', 0.15);
          break;
        case 'train': // Choo-choo whistle fifth!
          tone(440, 440, start, 0.18, 'triangle', 0.14);
          tone(587.3, 587.3, start, 0.18, 'sine', 0.14);
          tone(440, 440, start + 0.22, 0.26, 'triangle', 0.14);
          tone(587.3, 587.3, start + 0.22, 0.26, 'sine', 0.14);
          break;
        case 'xylophone':
        case 'sparkle':
        default:
          [1046.5, 1174.7, 1318.5, 1568.0].forEach((f, i) => {
            tone(f, f, start + i * 0.045, 0.16, 'sine', 0.12);
          });
          break;
      }
    }

    /** Crisp rising marimba ding when stamping intermediate letters of a 3/4-letter word */
    playLetterStep(stepIndex = 0) {
      if (!this.soundEnabled) return;
      this.unlock();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 987.77]; // C5 E5 G5 B5
      const freq = notes[Math.min(stepIndex, notes.length - 1)];
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    }

    /** Extra joyful xylophone sparkle if child taps keys during celebration */
    playSparkleTap() {
      if (!this.soundEnabled) return;
      this.unlock();
      if (!this.ctx) return;

      const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5];
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.24);
    }

    /** Gentle carriage zip when advancing to a fresh black & white sheet */
    playPaperFeed() {
      if (!this.soundEnabled) return;
      this.unlock();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const st = t + i * 0.032;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320 + i * 85, st);
        gain.gain.setValueAtTime(0.08, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.026);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(st);
        osc.stop(st + 0.03);
      }
    }

    /** Create dedicated warm low-passed master bus for background thinking music */
    _ensureMusicBus() {
      if (!this.ctx || this.musicBus) return;
      this.musicBus = this.ctx.createGain();
      const initialGain =
        this.soundEnabled && this.musicEnabled ? this._targetMusicGain() : 0.0001;
      this.musicBus.gain.setValueAtTime(initialGain, this.ctx.currentTime);

      if (typeof this.ctx.createBiquadFilter === 'function') {
        this.musicFilter = this.ctx.createBiquadFilter();
        this.musicFilter.type = 'lowpass';
        this.musicFilter.frequency.setValueAtTime(2350, this.ctx.currentTime);
        this.musicFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);
        this.musicFilter.connect(this.musicBus);
      }

      this.musicBus.connect(this.ctx.destination);
    }

    _targetMusicGain() {
      if (!this.soundEnabled || !this.musicEnabled) return 0.0001;
      if (this.isCelebrating) return 0.055;
      if (this.isSpeechDucking) return 0.11;
      return 0.27;
    }

    _updateMusicBusGain() {
      if (!this.ctx || !this.musicBus) return;
      const target = this._targetMusicGain();
      const now = this.ctx.currentTime;
      if (typeof this.musicBus.gain.setTargetAtTime === 'function') {
        this.musicBus.gain.setTargetAtTime(target, now, 0.08);
      } else {
        this.musicBus.gain.setValueAtTime(target, now);
      }
    }

    _syncMusicPlayback() {
      this._updateMusicBusGain();
      if (!this.soundEnabled || !this.musicEnabled) {
        this._stopMusicScheduler();
      } else if (this.ctx && (typeof document === 'undefined' || !document.hidden)) {
        this._startMusicScheduler();
      }
    }

    _startMusicScheduler() {
      if (!this.ctx || this._musicTimer) return;
      this._ensureMusicBus();
      this._updateMusicBusGain();

      if (this._nextMusicNoteTime < this.ctx.currentTime) {
        this._nextMusicNoteTime = this.ctx.currentTime + 0.06;
      }

      const tick = () => {
        this._musicTimer = null;
        if (!this.soundEnabled || !this.musicEnabled || !this.ctx) return;
        if (typeof document !== 'undefined' && document.hidden) return;

        // Clamp if audio clock jumped forward while suspended
        if (this._nextMusicNoteTime < this.ctx.currentTime - 0.1) {
          this._nextMusicNoteTime = this.ctx.currentTime + 0.05;
        }

        // Schedule happy thinking music notes 0.30s ahead on Web Audio clock
        while (this._nextMusicNoteTime < this.ctx.currentTime + 0.3) {
          this._scheduleMusicStep(this._musicStep, this._nextMusicNoteTime);
          this._nextMusicNoteTime += MUSIC_STEP_SEC;
          this._musicStep = (this._musicStep + 1) % TOTAL_MUSIC_STEPS;
        }

        this._musicTimer = setTimeout(tick, 125);
      };

      tick();
    }

    _stopMusicScheduler() {
      if (this._musicTimer) {
        clearTimeout(this._musicTimer);
        this._musicTimer = null;
      }
    }

    /** Synthesize one eighth-note step of the cheerful marimba + pizzicato bass loop */
    _scheduleMusicStep(step, st) {
      if (!this.ctx || !this.musicBus) return;
      const dest = this.musicFilter || this.musicBus;

      const barIndex = Math.floor(step / 8) % THINKING_BARS.length;
      const beatStep = step % 8;
      const bar = THINKING_BARS[barIndex];

      // 1. Bouncy Pizzicato Bass on beats 1 and 3 (beatStep 0 and 4)
      if (beatStep === 0 || beatStep === 4) {
        const bassNote = bar.bass[beatStep === 0 ? 0 : 1];
        const bassHz = NOTE_HZ[bassNote];
        if (bassHz) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(bassHz, st);
          gain.gain.setValueAtTime(0.0008, st);
          gain.gain.linearRampToValueAtTime(0.19, st + 0.016);
          gain.gain.exponentialRampToValueAtTime(0.0008, st + 0.34);
          osc.connect(gain);
          gain.connect(dest);
          osc.start(st);
          osc.stop(st + 0.36);
        }
      }

      // 2. Light Sunny Off-Beat Chord Pluck on beats 2 and 4 (beatStep 2 and 6)
      if (beatStep === 2 || beatStep === 6) {
        bar.chord.forEach((chordNote) => {
          const hz = NOTE_HZ[chordNote];
          if (!hz) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(hz, st);
          gain.gain.setValueAtTime(0.0008, st);
          gain.gain.linearRampToValueAtTime(0.055, st + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0008, st + 0.14);
          osc.connect(gain);
          gain.connect(dest);
          osc.start(st);
          osc.stop(st + 0.16);
        });
      }

      // 3. Cheerful Toy Marimba / Celesta Lead Melody
      const melNote = bar.melody[beatStep];
      const melHz = melNote ? NOTE_HZ[melNote] : 0;
      if (melHz) {
        const osc = this.ctx.createOscillator();
        const overtone = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const overGain = this.ctx.createGain();

        osc.type = 'triangle';
        overtone.type = 'sine';
        osc.frequency.setValueAtTime(melHz, st);
        overtone.frequency.setValueAtTime(melHz * 2, st);

        gain.gain.setValueAtTime(0.0008, st);
        gain.gain.linearRampToValueAtTime(0.16, st + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0008, st + 0.25);

        overGain.gain.setValueAtTime(0.0008, st);
        overGain.gain.linearRampToValueAtTime(0.036, st + 0.008);
        overGain.gain.exponentialRampToValueAtTime(0.0008, st + 0.13);

        osc.connect(gain);
        overtone.connect(overGain);
        gain.connect(dest);
        overGain.connect(dest);

        osc.start(st);
        overtone.start(st);
        osc.stop(st + 0.27);
        overtone.stop(st + 0.15);
      }
    }
  }

  window.hermesAudio = new HermesAudio();
})();
