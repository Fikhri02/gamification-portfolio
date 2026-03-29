import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DesktopIcon({ emoji, label, color, onClick }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    onClick?.();
  };

  const handleDoubleClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      className={`desktop-icon ${clicked ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="icon-emoji"
        animate={clicked ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {emoji}
      </motion.div>
      <span
        className="font-mono text-center leading-tight"
        style={{
          fontSize: '11px',
          color: color || '#c8ffd4',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          wordBreak: 'break-word',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
