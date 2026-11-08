/**
 * Web Audio API Vintage Typewriter & Cartoon Sound Synthesizer + Friendly Speech
 */
(function () {
  class HermesAudio {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
      this.voiceEnabled = true;
      this.preferredVoice = null;
      this.lastBuzzSpeechAt = 0;
      this._initVoices();
    }

    _initVoices() {
      if (!('speechSynthesis' in window)) return;
      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices() || [];
        if (!voices.length) return;
        const preferredNames = [
          'Samantha',
          'Karen',
          'Moira',
          'Tessa',
          'Ava',
          'Allison',
          'Google US English',
          'Daniel'
        ];
        for (const name of preferredNames) {
          const found = voices.find(
            (v) => v.name.includes(name) && v.lang.startsWith('en')
          );
          if (found) {
            this.preferredVoice = found;
            return;
          }
        }
        this.preferredVoice =
          voices.find((v) => v.lang.startsWith('en') && v.localService) ||
          voices.find((v) => v.lang.startsWith('en')) ||
          voices[0];
      };
      pickVoice();
      window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
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
    }

    setSoundEnabled(enabled) {
      this.soundEnabled = Boolean(enabled);
      if (!this.soundEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    setVoiceEnabled(enabled) {
      this.voiceEnabled = Boolean(enabled);
      if (!this.voiceEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    speak(text, { rate = 0.96, pitch = 1.12, delayMs = 0, isBuzz = false } = {}) {
      if (!this.soundEnabled || !this.voiceEnabled) return;
      if (!('speechSynthesis' in window)) return;

      const now = performance.now();
      if (isBuzz && now - this.lastBuzzSpeechAt < 1800) {
        return;
      }
      if (isBuzz) {
        this.lastBuzzSpeechAt = now;
      }

      const run = () => {
        if (!this.soundEnabled || !this.voiceEnabled) return;
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          if (this.preferredVoice) {
            utter.voice = this.preferredVoice;
          }
          utter.rate = rate;
          utter.pitch = pitch;
          utter.volume = 0.95;
          window.speechSynthesis.speak(utter);
        } catch (_) {
          // Ignore speech synthesis quirks gracefully
        }
      };

      if (delayMs > 0) {
        clearTimeout(this._speechTimer);
        this._speechTimer = setTimeout(run, delayMs);
      } else {
        clearTimeout(this._speechTimer);
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
    playSuccess(sfxType = 'sparkle') {
      if (!this.soundEnabled) return;
      this.unlock();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;

      // 1. Shimmering Vintage Typewriter Bell "DING!"
      const bellPartials = [
        { freq: 1760, amp: 0.24, decay: 1.05 },
        { freq: 3520, amp: 0.12, decay: 0.65 },
        { freq: 5180, amp: 0.07, decay: 0.38 }
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
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
      notes.forEach((freq, idx) => {
        const st = t + 0.06 + idx * 0.075;
        const dur = idx === notes.length - 1 ? 0.55 : 0.22;
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

      // 3. Playful Character Sound Effect at +0.36s
      this._playCritterMotif(sfxType, t + 0.38);
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
        case 'bark': // Playful "Arf! Arf!"
          tone(340, 520, start, 0.09, 'triangle', 0.2);
          tone(520, 260, start + 0.06, 0.08, 'triangle', 0.18);
          tone(380, 580, start + 0.19, 0.1, 'triangle', 0.2);
          tone(580, 280, start + 0.25, 0.09, 'triangle', 0.18);
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
  }

  window.hermesAudio = new HermesAudio();
})();
