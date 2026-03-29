import { useCallback, useRef } from 'react';

/**
 * Generates retro sound effects using the Web Audio API.
 * All sounds are synthesized — no audio files needed.
 */
export function useSound(enabled = true) {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback((type) => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'open':    // Window open: quick ascending beep
          osc.type = 'square';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now); osc.stop(now + 0.15);
          break;

        case 'close':   // Window close: descending
          osc.type = 'square';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now); osc.stop(now + 0.15);
          break;

        case 'achievement': {  // Achievement: fanfare arpeggio
          const notes = [523, 659, 784, 1047];
          notes.forEach((freq, i) => {
            const o2 = ctx.createOscillator();
            const g2 = ctx.createGain();
            o2.connect(g2); g2.connect(ctx.destination);
            o2.type = 'square';
            o2.frequency.value = freq;
            g2.gain.setValueAtTime(0.07, now + i * 0.1);
            g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.18);
            o2.start(now + i * 0.1);
            o2.stop(now + i * 0.1 + 0.2);
          });
          return; // early return — no osc start/stop below
        }

        case 'keypress': // Terminal keypress
          osc.type = 'square';
          osc.frequency.value = 800 + Math.random() * 200;
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now); osc.stop(now + 0.04);
          break;

        case 'error':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(110, now + 0.1);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now); osc.stop(now + 0.25);
          break;

        case 'boot': {  // Boot sequence chord
          [130, 196, 261, 392].forEach((freq, i) => {
            const o2 = ctx.createOscillator();
            const g2 = ctx.createGain();
            o2.connect(g2); g2.connect(ctx.destination);
            o2.type = 'sine';
            o2.frequency.value = freq;
            g2.gain.setValueAtTime(0, now + i * 0.05);
            g2.gain.linearRampToValueAtTime(0.05, now + i * 0.05 + 0.1);
            g2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            o2.start(now + i * 0.05);
            o2.stop(now + 0.9);
          });
          return;
        }

        default:
          osc.start(now); osc.stop(now + 0.1);
      }
    } catch {
      // Silently ignore — audio isn't critical
    }
  }, [enabled, getCtx]);

  return { play };
}
