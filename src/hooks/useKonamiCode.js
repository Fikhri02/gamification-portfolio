import { useEffect, useRef } from 'react';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

/**
 * Listens for the Konami code sequence globally.
 * @param {() => void} onSuccess - called when the full sequence is entered
 */
export function useKonamiCode(onSuccess) {
  const progress = useRef(0);

  useEffect(() => {
    const handler = (e) => {
      const expected = KONAMI[progress.current];
      if (e.key === expected) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          onSuccess();
        }
      } else {
        // Partial reset — allow restarting mid-sequence
        progress.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSuccess]);
}
