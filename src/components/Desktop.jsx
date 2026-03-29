import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import XPBar from './XPBar';
import MatrixRain from './MatrixRain';
import AchievementToast from './AchievementToast';

import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import ContactWindow from './windows/ContactWindow';
import TerminalWindow from './windows/TerminalWindow';
import AchievementsWindow from './windows/AchievementsWindow';

// Map window type → content component
const WINDOW_COMPONENTS = {
  about:        AboutWindow,
  projects:     ProjectsWindow,
  skills:       SkillsWindow,
  experience:   ExperienceWindow,
  contact:      ContactWindow,
  terminal:     TerminalWindow,
  achievements: AchievementsWindow,
};

// Desktop icons configuration
const DESKTOP_ICONS = [
  { id: 'about',        type: 'about',        emoji: '👤', label: 'about.exe',    color: '#00ff88' },
  { id: 'projects',     type: 'projects',     emoji: '📁', label: 'projects/',    color: '#00d4ff' },
  { id: 'skills',       type: 'skills',       emoji: '📊', label: 'skills.json',  color: '#a855f7' },
  { id: 'experience',   type: 'experience',   emoji: '📅', label: 'exp.log',      color: '#ffd60a' },
  { id: 'contact',      type: 'contact',      emoji: '📬', label: 'contact.sh',   color: '#f72585' },
  { id: 'terminal',     type: 'terminal',     emoji: '⌨️', label: 'terminal',     color: '#00ff88' },
  { id: 'achievements', type: 'achievements', emoji: '🏆', label: 'badges.db',    color: '#ffd60a' },
];

// Achievement mapping for opening windows
const WINDOW_ACHIEVEMENT = {
  about:        'OPENED_ABOUT',
  projects:     'OPENED_PROJECTS',
  skills:       'OPENED_SKILLS',
  experience:   'OPENED_EXPERIENCE',
  contact:      'OPENED_CONTACT',
  terminal:     'OPENED_TERMINAL',
};

export default function Desktop({ soundEnabled, onToggleSound, onPlaySound }) {
  const { state, openWindow, unlockAchievement } = useGame();

  const handleOpenWindow = useCallback((id, type) => {
    openWindow(id, type);
    onPlaySound?.('open');
    if (WINDOW_ACHIEVEMENT[type]) {
      unlockAchievement(WINDOW_ACHIEVEMENT[type]);
    }
  }, [openWindow, unlockAchievement, onPlaySound]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 'calc(100vh - 48px)', // leave room for taskbar
        background: '#080810',
      }}
    >
      {/* ── Animated background grid ────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,136,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Matrix rain (easter egg) ─────────────────────────────────────── */}
      <MatrixRain active={state.matrixActive} />

      {/* ── XP bar (top right) ──────────────────────────────────────────── */}
      <XPBar />

      {/* ── Desktop icons (left column) ─────────────────────────────────── */}
      <div
        className="absolute left-4 flex flex-col gap-1 pt-4"
        style={{ top: 0 }}
      >
        {DESKTOP_ICONS.map((icon, i) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 300 }}
          >
            <DesktopIcon
              emoji={icon.emoji}
              label={icon.label}
              color={icon.color}
              onClick={() => handleOpenWindow(icon.id, icon.type)}
            />
          </motion.div>
        ))}
      </div>

      {/* ── OS title watermark ──────────────────────────────────────────── */}
      <motion.div
        className="absolute font-mono select-none pointer-events-none"
        style={{
          right: '260px',
          bottom: '20px',
          fontSize: 13,
          color: '#00ff8812',
          letterSpacing: '0.3em',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        FIKHRI.OS v2.0
      </motion.div>

      {/* ── Hint text (fades out after 8s) ──────────────────────────────── */}
      {state.windows.length === 0 && (
        <motion.div
          className="absolute font-mono text-center pointer-events-none"
          style={{
            left: '50%',
            top: '45%',
            transform: 'translateX(-50%) translateY(-50%)',
            color: '#4a7c59',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 8, times: [0, 0.1, 0.8, 1], delay: 0.5 }}
        >
          <div className="text-sm mb-1">Double-click any icon to open</div>
          <div className="text-xs">or type in the terminal</div>
        </motion.div>
      )}

      {/* ── Open windows ────────────────────────────────────────────────── */}
      {state.windows.map((w) => {
        const ContentComponent = WINDOW_COMPONENTS[w.type];
        if (!ContentComponent) return null;
        return (
          <Window
            key={w.id}
            id={w.id}
            type={w.type}
            zIndex={w.zIndex}
            pos={w.pos}
            minimized={w.minimized}
          >
            <ContentComponent />
          </Window>
        );
      })}

      {/* ── Achievement toasts ──────────────────────────────────────────── */}
      <AchievementToast />

      {/* ── Taskbar ─────────────────────────────────────────────────────── */}
      <Taskbar soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
    </div>
  );
}
