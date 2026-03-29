import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import BootSequence from './components/BootSequence';
import Desktop from './components/Desktop';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useSound } from './hooks/useSound';

// Inner app that has access to GameContext
function AppInner() {
  const [booted, setBooted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { unlockAchievement, toggleMatrix } = useGame();
  const { play } = useSound(soundEnabled);

  // Play boot sound and unlock achievement on boot complete
  const handleBootComplete = useCallback(() => {
    setBooted(true);
    play('boot');
    setTimeout(() => unlockAchievement('FIRST_BOOT'), 500);
  }, [play, unlockAchievement]);

  // Konami code easter egg
  useKonamiCode(useCallback(() => {
    unlockAchievement('KONAMI_CODE');
    toggleMatrix();
    play('achievement');
  }, [unlockAchievement, toggleMatrix, play]));

  const toggleSound = useCallback(() => {
    setSoundEnabled(s => !s);
  }, []);

  return (
    <>
      {/* CRT scanline overlay — purely cosmetic */}
      <div className="crt-overlay" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        ) : (
          <Desktop
            key="desktop"
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            onPlaySound={play}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppInner />
    </GameProvider>
  );
}
