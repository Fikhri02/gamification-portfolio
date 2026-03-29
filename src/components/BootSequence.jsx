import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Boot log messages to display sequentially
const BOOT_LINES = [
  { text: 'FIKHRI.OS v2.0 BIOS', delay: 0, color: '#00ff88' },
  { text: 'Copyright (C) Fikhri Industries, All Rights Reserved', delay: 80, color: '#4a7c59' },
  { text: '', delay: 100 },
  { text: 'CPU: React 18.0 @ 60fps × 4 cores', delay: 200, color: '#00d4ff' },
  { text: 'RAM: Unlimited Imagination (Installed)', delay: 280, color: '#00d4ff' },
  { text: 'GPU: Framer Motion Accelerated', delay: 360, color: '#00d4ff' },
  { text: '', delay: 400 },
  { text: 'Detecting hardware...', delay: 500, color: '#a855f7' },
  { text: '  [OK] Keyboard Interface          Responsive', delay: 600 },
  { text: '  [OK] Mouse / Pointer             Calibrated', delay: 680 },
  { text: '  [OK] Display                     1920×1080 (Retina)', delay: 760 },
  { text: '  [OK] Sound System                Web Audio API Ready', delay: 840 },
  { text: '', delay: 880 },
  { text: 'Loading kernel modules...', delay: 980, color: '#a855f7' },
  { text: '  [OK] react.ko                    loaded', delay: 1060 },
  { text: '  [OK] framer-motion.ko            loaded', delay: 1140 },
  { text: '  [OK] tailwindcss.ko              loaded', delay: 1220 },
  { text: '  [OK] creativity.ko               loaded', delay: 1300 },
  { text: '  [OK] 7years-experience.ko        loaded', delay: 1400 },
  { text: '', delay: 1440 },
  { text: 'Mounting filesystems...', delay: 1540, color: '#a855f7' },
  { text: '  [OK] /home/visitor               tmpfs', delay: 1620 },
  { text: '  [OK] /projects                   ext4 (4 projects mounted)', delay: 1700 },
  { text: '  [OK] /skills                     procfs', delay: 1780 },
  { text: '  [OK] /experience                 logs (7 years)', delay: 1860 },
  { text: '  [OK] /easter-eggs                ???', delay: 1940, color: '#ffd60a' },
  { text: '', delay: 1980 },
  { text: 'Starting services...', delay: 2080, color: '#a855f7' },
  { text: '  [OK] achievement-engine          Running', delay: 2140 },
  { text: '  [OK] terminal-service            Listening', delay: 2200 },
  { text: '  [OK] window-manager              Active', delay: 2280 },
  { text: '  [OK] xp-tracker                  Calibrated', delay: 2360 },
  { text: '', delay: 2400 },
  { text: 'System initialization complete.', delay: 2520, color: '#00ff88' },
  { text: '', delay: 2560 },
  { text: 'Welcome to FIKHRI.OS. Type `help` in the terminal to begin.', delay: 2640, color: '#00ff88' },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('boot'); // 'boot' | 'splash' | 'done'
  const containerRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Schedule each boot line
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        // Scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        // Update progress bar
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, line.delay)
    );

    // After all lines, show splash
    const splashTimer = setTimeout(() => {
      setPhase('splash');
    }, 3000);

    // Auto-advance after splash
    const doneTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 5000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(splashTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  };

  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <AnimatePresence>
        {phase === 'boot' && (
          <motion.div
            key="boot"
            className="w-full max-w-2xl px-6 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Terminal output */}
            <div
              ref={containerRef}
              className="h-72 overflow-hidden font-mono text-xs leading-5 mb-6"
              style={{ color: '#a3e6c7' }}
            >
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  style={{ color: line.color || '#a3e6c7' }}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}
              <span className="terminal-cursor" />
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="flex justify-between text-xs mb-2" style={{ color: '#4a7c59' }}>
                <span>Loading FIKHRI.OS v2.0</span>
                <span style={{ color: '#00ff88' }}>{progress}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#0d1117', border: '1px solid #00ff8820' }}>
                <motion.div
                  className="xp-bar-fill"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'splash' && (
          <motion.div
            key="splash"
            className="text-center z-10 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
          >
            {/* Big OS name */}
            <motion.div
              className="font-mono mb-2"
              style={{ fontSize: 'clamp(12px, 3vw, 18px)', color: '#4a7c59', letterSpacing: '0.3em' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME TO
            </motion.div>

            <motion.h1
              className="font-mono font-bold glitch-text mb-4"
              style={{
                fontSize: 'clamp(40px, 8vw, 80px)',
                color: '#00ff88',
                textShadow: '0 0 20px #00ff8880, 0 0 60px #00ff8830',
                letterSpacing: '0.05em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              FIKHRI.OS
            </motion.h1>

            <motion.div
              className="font-mono mb-8"
              style={{ fontSize: 'clamp(12px, 2vw, 16px)', color: '#00d4ff', letterSpacing: '0.2em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              v2.0 — Senior Software Engineer Edition
            </motion.div>

            <motion.p
              className="font-mono text-sm mb-10 max-w-md mx-auto"
              style={{ color: '#4a7c59', lineHeight: 1.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              An interactive portfolio disguised as an OS.<br />
              Explore. Discover. Earn XP.
            </motion.p>

            <motion.button
              onClick={handleSkip}
              className="font-mono px-8 py-3 rounded text-sm transition-all"
              style={{
                background: 'rgba(0,255,136,0.1)',
                border: '1px solid #00ff8840',
                color: '#00ff88',
                letterSpacing: '0.1em',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{
                background: 'rgba(0,255,136,0.2)',
                boxShadow: '0 0 20px #00ff8840',
              }}
              whileTap={{ scale: 0.97 }}
            >
              [ PRESS ENTER TO BOOT ]
            </motion.button>

            <motion.div
              className="font-mono text-xs mt-4"
              style={{ color: '#4a7c59' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Auto-booting in a moment...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip link during boot */}
      {phase === 'boot' && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 font-mono text-xs opacity-30 hover:opacity-70 transition-opacity"
          style={{ color: '#4a7c59' }}
        >
          Skip →
        </button>
      )}
    </motion.div>
  );
}
