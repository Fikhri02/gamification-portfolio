import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../../data/portfolio';

// Types out a string character by character
function TypedText({ text, delay = 0, speed = 30, color, className, style }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay, speed]);

  return (
    <span className={className} style={{ color, ...style }}>
      {displayed}
      {displayed.length < text.length && (
        <span className="blink" style={{ background: color || '#00ff88', display: 'inline-block', width: 8, height: '1em', verticalAlign: 'text-bottom', marginLeft: 1 }} />
      )}
    </span>
  );
}

// Glitch reveal for the name
function GlitchName({ name }) {
  const [phase, setPhase] = useState(0);
  const GLITCH_CHARS = '█▓▒░?#@!$%&';
  const [displayed, setDisplayed] = useState(() => name.split('').map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]));

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setDisplayed(prev =>
        prev.map((ch, i) => {
          if (i < Math.floor((frame / 20) * name.length)) return name[i];
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
      );
      if (frame >= 40) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [name]);

  return (
    <span className="glow-green" style={{ letterSpacing: '0.05em' }}>
      {displayed.join('')}
    </span>
  );
}

export default function AboutWindow() {
  const [factIndex, setFactIndex] = useState(0);
  const [showFacts, setShowFacts] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowFacts(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="scroll-area font-mono" style={{ background: 'transparent' }}>

      {/* Header */}
      <div className="mb-6">
        <motion.div
          className="text-4xl mb-3"
          animate={{ rotate: [0, 10, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {PROFILE.avatar}
        </motion.div>

        <h1 className="text-3xl font-bold mb-1" style={{ color: '#00ff88' }}>
          <GlitchName name={PROFILE.name} />
        </h1>

        <div className="text-sm mb-2" style={{ color: '#00d4ff' }}>
          <TypedText text={`> ${PROFILE.title}`} delay={600} />
        </div>

        <div className="text-xs mb-4" style={{ color: '#4a7c59' }}>
          <TypedText text={`$ location: ${PROFILE.location}`} delay={1200} />
        </div>

        {/* Separator */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #00ff8830, transparent)' }} />
      </div>

      {/* Bio */}
      <div className="mb-6">
        <div className="text-xs mb-3" style={{ color: '#ffd60a', letterSpacing: '0.1em' }}>
          // BIO.TXT
        </div>
        <div className="text-sm leading-7" style={{ color: '#a3e6c7' }}>
          {PROFILE.bio.split('\n').map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="mb-2"
            >
              {line.trim()}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Fun facts */}
      {showFacts && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="text-xs mb-3" style={{ color: '#ffd60a', letterSpacing: '0.1em' }}>
            // FUN_FACTS.LOG
          </div>
          <div className="space-y-2">
            {PROFILE.funFacts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-2 text-sm p-2 rounded"
                style={{
                  background: i === factIndex ? 'rgba(0,255,136,0.06)' : 'transparent',
                  border: i === factIndex ? '1px solid #00ff8820' : '1px solid transparent',
                  color: '#a3e6c7',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={() => setFactIndex(i)}
              >
                <span>{fact}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex items-center gap-2 text-xs p-3 rounded"
        style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid #00ff8815' }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: '#00ff88' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span style={{ color: '#00ff88' }}>Available for opportunities</span>
        <span style={{ color: '#4a7c59' }}>·</span>
        <span style={{ color: '#4a7c59' }}>Open the Contact window to reach out</span>
      </motion.div>
    </div>
  );
}
