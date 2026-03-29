import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { ACHIEVEMENTS, getLevelInfo, getNextLevel, LEVELS } from '../../data/achievements';

const RARITY_ORDER = { legendary: 0, rare: 1, uncommon: 2, common: 3 };
const RARITY_COLORS = {
  common:    { color: '#4a7c59', label: 'COMMON',    bg: '#4a7c5915' },
  uncommon:  { color: '#00d4ff', label: 'UNCOMMON',  bg: '#00d4ff10' },
  rare:      { color: '#a855f7', label: 'RARE',      bg: '#a855f710' },
  legendary: { color: '#ffd60a', label: 'LEGENDARY', bg: '#ffd60a10' },
};

function AchievementBadge({ achievement, earned, index }) {
  const rarity = RARITY_COLORS[achievement.rarity] || RARITY_COLORS.common;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 400 }}
      className="p-3 rounded-lg"
      style={{
        background: earned ? rarity.bg : 'rgba(0,0,0,0.3)',
        border: earned ? `1px solid ${rarity.color}30` : '1px dashed #ffffff10',
        opacity: earned ? 1 : 0.45,
        filter: earned ? 'none' : 'grayscale(0.8)',
        position: 'relative',
      }}
    >
      <div className="flex items-start gap-2">
        <div className="text-2xl flex-shrink-0" style={{ filter: earned ? 'none' : 'grayscale(1)' }}>
          {earned ? achievement.emoji : '🔒'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-xs font-mono font-bold leading-tight"
              style={{ color: earned ? '#c8ffd4' : '#4a7c59' }}
            >
              {achievement.title}
            </span>
            <span
              className="text-xs font-mono px-1 rounded"
              style={{
                background: earned ? `${rarity.color}20` : '#ffffff08',
                color: earned ? rarity.color : '#4a7c59',
                fontSize: 9,
              }}
            >
              {rarity.label}
            </span>
          </div>
          <div
            className="text-xs font-mono mt-0.5 leading-tight"
            style={{ color: '#4a7c59', fontSize: 11 }}
          >
            {earned ? achievement.description : '???'}
          </div>
        </div>
        <div
          className="text-xs font-mono flex-shrink-0"
          style={{ color: earned ? '#ffd60a' : '#4a7c5950' }}
        >
          +{achievement.xp}
        </div>
      </div>

      {earned && (
        <motion.div
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ background: rarity.color, boxShadow: `0 0 4px ${rarity.color}` }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export default function AchievementsWindow() {
  const { state, levelInfo } = useGame();
  const { achievements: earned, xp } = state;

  const next = getNextLevel(xp);
  const progressPct = next
    ? Math.min(100, ((xp - levelInfo.min) / (next.min - levelInfo.min)) * 100)
    : 100;

  const allAchievements = Object.values(ACHIEVEMENTS).sort(
    (a, b) => {
      const aEarned = earned.includes(a.id) ? 0 : 1;
      const bEarned = earned.includes(b.id) ? 0 : 1;
      if (aEarned !== bEarned) return aEarned - bEarned;
      return RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity];
    }
  );

  const totalXP = Object.values(ACHIEVEMENTS).reduce((s, a) => s + a.xp, 0);
  const earnedCount = earned.length;
  const totalCount = allAchievements.length;

  return (
    <div className="scroll-area">
      {/* Player card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-lg mb-4"
        style={{
          background: `linear-gradient(135deg, ${levelInfo.color}10, transparent)`,
          border: `1px solid ${levelInfo.color}30`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-mono text-xs" style={{ color: '#4a7c59' }}>PLAYER RANK</div>
            <div className="font-mono font-bold text-xl" style={{ color: levelInfo.color }}>
              LVL {levelInfo.level} — {levelInfo.title}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-2xl font-bold" style={{ color: '#ffd60a' }}>{xp}</div>
            <div className="font-mono text-xs" style={{ color: '#4a7c59' }}>TOTAL XP</div>
          </div>
        </div>

        {/* Level progress */}
        <div className="mb-1 flex justify-between text-xs font-mono" style={{ color: '#4a7c59' }}>
          <span>Level {levelInfo.level}</span>
          {next && <span>{next.min - xp} XP to {next.title}</span>}
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: '#0d1117', border: '1px solid #ffffff10' }}>
          <motion.div
            className="xp-bar-fill"
            style={{ height: '100%', borderRadius: 6 }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>

        {/* All levels */}
        <div className="flex gap-2 mt-3">
          {LEVELS.map(l => (
            <div
              key={l.level}
              className="flex-1 py-1 rounded text-center font-mono text-xs"
              style={{
                background: xp >= l.min ? `${l.color}20` : '#0d1117',
                border: `1px solid ${l.color}${xp >= l.min ? '40' : '15'}`,
                color: xp >= l.min ? l.color : '#4a7c59',
              }}
            >
              {l.level}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats bar */}
      <div className="flex gap-3 mb-4">
        {[
          { label: 'Unlocked', value: `${earnedCount}/${totalCount}`, color: '#00ff88' },
          { label: 'XP Earned', value: xp, color: '#ffd60a' },
          { label: 'Max XP', value: totalXP, color: '#a855f7' },
        ].map(stat => (
          <div
            key={stat.label}
            className="flex-1 p-2 rounded text-center"
            style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
          >
            <div className="font-mono font-bold text-sm" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-mono text-xs" style={{ color: '#4a7c59', fontSize: 10 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="font-mono text-xs mb-3" style={{ color: '#ffd60a' }}>
        // ACHIEVEMENTS.DB — {earnedCount} of {totalCount} unlocked
      </div>
      <div className="grid grid-cols-1 gap-2">
        {allAchievements.map((a, i) => (
          <AchievementBadge
            key={a.id}
            achievement={a}
            earned={earned.includes(a.id)}
            index={i}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 rounded font-mono text-xs"
        style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid #00ff8815', color: '#4a7c59' }}
      >
        💡 Tip: Try the Konami code (↑↑↓↓←→←→BA) for a legendary achievement.
      </motion.div>
    </div>
  );
}
