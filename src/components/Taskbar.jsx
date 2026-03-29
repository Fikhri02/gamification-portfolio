import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { WINDOW_META } from './Window';

export default function Taskbar({ soundEnabled, onToggleSound }) {
  const { state, openWindow, focusWindow, minimizeWindow } = useGame();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const fmt = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const fmtDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="taskbar">
      {/* Start / OS name */}
      <div
        className="font-mono text-xs font-bold px-3 py-1.5 rounded cursor-pointer transition-all"
        style={{
          color: '#00ff88',
          background: 'rgba(0,255,136,0.08)',
          border: '1px solid #00ff8820',
          letterSpacing: '0.1em',
        }}
        onClick={() => openWindow('about', 'about')}
        title="Open About"
      >
        ⬡ FIKHRI.OS
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: '#00ff8820' }} />

      {/* Open windows */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        <AnimatePresence>
          {state.windows.map((w) => {
            const meta = WINDOW_META[w.type] || WINDOW_META.about;
            return (
              <motion.button
                key={w.id}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs transition-all whitespace-nowrap"
                style={{
                  background: w.minimized ? 'transparent' : 'rgba(0,255,136,0.06)',
                  border: w.minimized ? '1px solid transparent' : `1px solid ${meta.color}30`,
                  color: w.minimized ? '#4a7c59' : meta.color,
                  opacity: w.minimized ? 0.6 : 1,
                }}
                onClick={() => {
                  if (w.minimized) {
                    minimizeWindow(w.id); // un-minimize
                    focusWindow(w.id);
                  } else {
                    focusWindow(w.id);
                  }
                }}
              >
                <span>{meta.icon}</span>
                <span>{meta.title}</span>
                {!w.minimized && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: meta.color, boxShadow: `0 0 4px ${meta.color}` }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Right side: sound + clock */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Achievement count */}
        <div
          className="font-mono text-xs cursor-pointer"
          style={{ color: '#ffd60a' }}
          onClick={() => openWindow('achievements', 'achievements')}
          title="View Achievements"
        >
          🏆 {state.achievements.length}
        </div>

        {/* Sound toggle */}
        <button
          onClick={onToggleSound}
          className="font-mono text-xs transition-opacity"
          style={{ color: soundEnabled ? '#00d4ff' : '#4a7c59' }}
          title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        {/* Clock */}
        <div className="font-mono text-right" style={{ color: '#4a7c59' }}>
          <div className="text-xs" style={{ color: '#a3e6c7' }}>{fmt(time)}</div>
          <div style={{ fontSize: '10px' }}>{fmtDate(time)}</div>
        </div>
      </div>
    </div>
  );
}
