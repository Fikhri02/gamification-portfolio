import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

// Icons for each window type
export const WINDOW_META = {
  about:        { title: 'about.exe',        icon: '👤', color: '#00ff88', w: 620, h: 520 },
  projects:     { title: 'projects/',         icon: '📁', color: '#00d4ff', w: 720, h: 560 },
  skills:       { title: 'skills.json',       icon: '📊', color: '#a855f7', w: 660, h: 540 },
  experience:   { title: 'experience.log',    icon: '📅', color: '#ffd60a', w: 680, h: 540 },
  contact:      { title: 'contact.sh',        icon: '📬', color: '#f72585', w: 580, h: 500 },
  terminal:     { title: 'terminal.app',      icon: '⌨️', color: '#00ff88', w: 700, h: 480 },
  achievements: { title: 'achievements.db',   icon: '🏆', color: '#ffd60a', w: 640, h: 520 },
};

export default function Window({ id, type, zIndex, pos, minimized, children }) {
  const { closeWindow, focusWindow, moveWindow, minimizeWindow, setDragged } = useGame();
  const meta = WINDOW_META[type] || WINDOW_META.about;

  const dragRef = useRef(null);
  const windowRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const hasDraggedRef = useRef(false);

  // Default center-ish position
  const defaultPos = pos || {
    x: Math.max(20, (window.innerWidth - meta.w) / 2 - Math.random() * 80 + 40),
    y: Math.max(60, (window.innerHeight - meta.h) / 2 - Math.random() * 40 + 20),
  };
  const [position, setPosition] = useState(defaultPos);

  // ── Pointer-based dragging (reliable cross-browser) ────────────────────────
  const handlePointerDown = useCallback((e) => {
    if (e.target.closest('.no-drag')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX - position.x, startY: e.clientY - position.y };
    setIsDragging(true);
    focusWindow(id);
  }, [position, id, focusWindow]);

  const handlePointerMove = useCallback((e) => {
    if (!dragRef.current) return;
    const newX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragRef.current.startX));
    const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragRef.current.startY));
    setPosition({ x: newX, y: newY });

    if (!hasDraggedRef.current) {
      hasDraggedRef.current = true;
      setDragged();
    }
  }, [setDragged]);

  const handlePointerUp = useCallback((e) => {
    dragRef.current = null;
    setIsDragging(false);
    moveWindow(id, position);
  }, [id, position, moveWindow]);

  const handleWindowClick = useCallback(() => {
    focusWindow(id);
  }, [id, focusWindow]);

  if (minimized) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        className={`os-window ${zIndex >= 10 ? 'focused' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          width: meta.w,
          height: meta.h,
          zIndex,
        }}
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20, transition: { duration: 0.15 } }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onPointerDown={handleWindowClick}
      >
        {/* ── Title Bar ────────────────────────────────────────────────────── */}
        <div
          className="window-titlebar no-select"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Traffic light buttons */}
          <div className="window-controls no-drag">
            <button
              className="win-btn close"
              onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
              title="Close"
            />
            <button
              className="win-btn minimize"
              onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
              title="Minimize"
            />
            <button
              className="win-btn maximize"
              title="Maximize"
            />
          </div>

          {/* Title */}
          <span className="text-xs font-mono flex items-center gap-2 flex-1 ml-1" style={{ color: '#4a7c59' }}>
            <span>{meta.icon}</span>
            <span style={{ color: meta.color }}>{meta.title}</span>
          </span>

          {/* Accent dot */}
          <div
            className="w-2 h-2 rounded-full opacity-60"
            style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }}
          />
        </div>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        <div className="window-content" onPointerDown={(e) => e.stopPropagation()}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
