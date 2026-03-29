import { motion } from 'framer-motion';
import { getLevelInfo, getNextLevel } from '../data/achievements';
import { useGame } from '../context/GameContext';

export default function XPBar() {
  const { state, levelInfo } = useGame();
  const { xp } = state;
  const next = getNextLevel(xp);

  const progressPct = next
    ? Math.min(100, ((xp - levelInfo.min) / (next.min - levelInfo.min)) * 100)
    : 100;

  return (
    <div
      className="fixed top-3 right-4 z-[999] font-mono"
      style={{ minWidth: 220 }}
    >
      <div className="flex items-center justify-between mb-1">
        <motion.span
          key={levelInfo.level}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-xs font-bold"
          style={{ color: levelInfo.color }}
        >
          LVL {levelInfo.level} · {levelInfo.title}
        </motion.span>
        <motion.span
          key={xp}
          initial={{ y: -4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xs"
          style={{ color: '#ffd60a' }}
        >
          {xp} XP
        </motion.span>
      </div>

      {/* XP progress bar */}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: '#0d1117', border: '1px solid #00ff8815' }}
      >
        <motion.div
          className="xp-bar-fill"
          style={{ height: '100%', borderRadius: '4px' }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>

      {next && (
        <div className="text-right mt-0.5 text-xs" style={{ color: '#4a7c59', fontSize: '10px' }}>
          {next.min - xp} XP to {next.title}
        </div>
      )}
    </div>
  );
}
