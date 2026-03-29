import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>[]{}|\\';

/**
 * Matrix digital rain effect — rendered on a canvas overlay.
 * Uses requestAnimationFrame for smooth 60fps animation.
 */
export default function MatrixRain({ active }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const columnsRef = useRef([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 16);
      columnsRef.current = Array.from({ length: cols }, () =>
        Math.random() * canvas.height
      );
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Semi-transparent black overlay for trailing fade effect
      ctx.fillStyle = 'rgba(8, 8, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px JetBrains Mono, monospace';

      columnsRef.current.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * 16;

        // Lead char is bright, rest is dimmer
        ctx.fillStyle = y < 40 ? '#ffffff' : `rgba(0, 255, 136, ${0.3 + Math.random() * 0.7})`;
        ctx.fillText(char, x, y);

        // Reset column when it reaches bottom (randomly)
        if (y > canvas.height && Math.random() > 0.975) {
          columnsRef.current[i] = 0;
        } else {
          columnsRef.current[i] = y + 16;
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      // Clear canvas on deactivate
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
