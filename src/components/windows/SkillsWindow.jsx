import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../data/portfolio';

function SkillBar({ name, level, color, delay }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-mono" style={{ color: '#a3e6c7' }}>{name}</span>
        <motion.span
          className="text-xs font-mono font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay / 1000 + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>

      <div
        className="skill-bar-fill"
        style={{ background: `${color}15`, border: `1px solid ${color}20` }}
      >
        <motion.div
          style={{
            height: '100%',
            borderRadius: 3,
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Shimmer effect */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              width: '30%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={{ left: ['-30%', '130%'] }}
            transition={{ duration: 1.5, delay: delay / 1000 + 0.5, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function CategoryPanel({ category, delay }) {
  const [open, setOpen] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className="mb-5 p-4 rounded-lg"
      style={{
        background: `${category.color}06`,
        border: `1px solid ${category.color}20`,
      }}
    >
      <button
        className="flex items-center justify-between w-full mb-3"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: category.color, boxShadow: `0 0 6px ${category.color}` }}
          />
          <span className="font-mono font-bold text-sm" style={{ color: category.color }}>
            {category.category}
          </span>
          <span className="font-mono text-xs" style={{ color: '#4a7c59' }}>
            ({category.items.length} skills)
          </span>
        </div>
        <span className="font-mono text-xs" style={{ color: '#4a7c59' }}>
          {open ? '▼' : '▶'}
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {category.items.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={category.color}
              delay={delay + i * 80}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// Radar-like summary showing average per category
function SkillSummary() {
  const averages = SKILLS.map(cat => ({
    label: cat.category,
    color: cat.color,
    avg: Math.round(cat.items.reduce((s, i) => s + i.level, 0) / cat.items.length),
  }));

  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      {averages.map((a, i) => (
        <motion.div
          key={a.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-3 rounded text-center"
          style={{ background: `${a.color}08`, border: `1px solid ${a.color}25` }}
        >
          <div className="text-2xl font-bold font-mono" style={{ color: a.color }}>
            {a.avg}%
          </div>
          <div className="text-xs font-mono mt-0.5" style={{ color: '#4a7c59' }}>
            {a.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function SkillsWindow() {
  const [view, setView] = useState('bars'); // 'bars' | 'summary'

  return (
    <div className="scroll-area">
      {/* Header + view toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-xs" style={{ color: '#ffd60a' }}>
          // SKILLS.JSON — {SKILLS.reduce((s, c) => s + c.items.length, 0)} total skills
        </div>
        <div className="flex gap-1">
          {['bars', 'summary'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="text-xs font-mono px-2 py-1 rounded transition-all"
              style={{
                background: view === v ? 'rgba(0,255,136,0.15)' : 'transparent',
                color: view === v ? '#00ff88' : '#4a7c59',
                border: view === v ? '1px solid #00ff8840' : '1px solid transparent',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'summary' && <SkillSummary />}

      {view === 'bars' && SKILLS.map((cat, i) => (
        <CategoryPanel key={cat.category} category={cat} delay={i * 200} />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-xs font-mono p-3 rounded mt-2"
        style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid #00ff8815', color: '#4a7c59' }}
      >
        💡 Skills are self-assessed. Real proof: open Projects and read the highlights.
      </motion.div>
    </div>
  );
}
