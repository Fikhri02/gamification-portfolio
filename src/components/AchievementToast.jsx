import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const RARITY_COLORS = {
  common:    { border: '#4a7c59', glow: '#4a7c5940', label: 'COMMON' },
  uncommon:  { border: '#00d4ff', glow: '#00d4ff40', label: 'UNCOMMON' },
  rare:      { border: '#a855f7', glow: '#a855f740', label: 'RARE' },
  legendary: { border: '#ffd60a', glow: '#ffd60a40', label: 'LEGENDARY' },
};

function Toast({ toast, onDismiss }) {
  const rarity = RARITY_COLORS[toast.rarity] || RARITY_COLORS.common;

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.toastId), 4500);
    return () => clearTimeout(timer);
  }, [toast.toastId, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ x: 340, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 340, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="achievement-toast cursor-pointer"
      style={{
        borderLeftColor: rarity.border,
        boxShadow: `0 0 20px ${rarity.glow}, 0 10px 40px rgba(0,0,0,0.5)`,
      }}
      onClick={() => onDismiss(toast.toastId)}
    >
      {/* Icon */}
      <div className="text-3xl flex-shrink-0">{toast.emoji}</div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs font-bold" style={{ color: rarity.border }}>
            ACHIEVEMENT UNLOCKED
          </span>
          <span
            className="font-mono text-xs px-1.5 py-0.5 rounded"
            style={{ background: `${rarity.border}20`, color: rarity.border, fontSize: '9px' }}
          >
            {rarity.label}
          </span>
        </div>
        <div className="font-mono text-sm font-bold text-white leading-tight">{toast.title}</div>
        <div className="font-mono text-xs mt-0.5" style={{ color: '#4a7c59' }}>{toast.description}</div>
      </div>

      {/* XP badge */}
      <div
        className="flex-shrink-0 font-mono text-xs font-bold px-2 py-1 rounded"
        style={{ background: '#ffd60a20', color: '#ffd60a', border: '1px solid #ffd60a30' }}
      >
        +{toast.xp} XP
      </div>
    </motion.div>
  );
}

export default function AchievementToastContainer() {
  const { state, dismissToast } = useGame();

  return (
    <div
      className="fixed right-4 z-[9000]"
      style={{ bottom: '64px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}
    >
      <AnimatePresence mode="popLayout">
        {state.toasts.map(toast => (
          <Toast key={toast.toastId} toast={toast} onDismiss={dismissToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
