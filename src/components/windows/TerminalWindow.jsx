import { useState, useRef, useEffect, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { processCommand } from '../../utils/terminalCommands';

const WELCOME_LINES = [
  { content: '╔══════════════════════════════════════════════╗', type: 'output' },
  { content: '║           FIKHRI.OS Terminal v2.0            ║', type: 'output' },
  { content: '║   Type `help` to see available commands.    ║', type: 'output' },
  { content: '╚══════════════════════════════════════════════╝', type: 'output' },
  { content: '', type: 'output' },
  { content: '<span style="color:#4a7c59">Hint: Try `sudo hire fikhri`, `matrix`, or `cat secret.txt`</span>', type: 'output' },
  { content: '', type: 'output' },
];

const PROMPT = 'visitor@fikhri-os:~$';

export default function TerminalWindow() {
  const { unlockAchievement, toggleMatrix, openWindow, incrementCommands } = useGame();
  const [lines, setLines] = useState(WELCOME_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Focus input when window is clicked
  const focusInput = () => inputRef.current?.focus();

  const runCommand = useCallback((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setLines(l => [...l, { content: `<span style="color:#4a7c59">${PROMPT}</span>`, type: 'output' }]);
      return;
    }

    // Add to history
    setHistory(h => [trimmed, ...h].slice(0, 50));
    setHistIdx(-1);

    // Echo the command
    const echoLine = {
      content: `<span style="color:#4a7c59">${PROMPT}</span> <span style="color:#c8ffd4">${trimmed}</span>`,
      type: 'output',
    };

    const result = processCommand(trimmed, { unlockAchievement, toggleMatrix, openWindow });

    if (result === 'CLEAR') {
      setLines([]);
      return;
    }

    setLines(l => [...l, echoLine, ...(result || [])]);
    incrementCommands();
  }, [unlockAchievement, toggleMatrix, openWindow, incrementCommands]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete for known commands
      const cmds = ['help','about','whoami','skills','projects','experience','contact','achievements','ls','clear','matrix','sudo','open','cat','echo','date','uname','pwd'];
      const match = cmds.find(c => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="h-full flex flex-col cursor-text"
      style={{ background: '#080810' }}
      onClick={focusInput}
    >
      {/* Output area */}
      <div
        className="terminal-output flex-1 overflow-y-auto"
        style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#a3e6c7' }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="terminal-line"
            dangerouslySetInnerHTML={{ __html: line.content }}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div
        className="flex items-center gap-2 px-3 pb-3 pt-1 flex-shrink-0"
        style={{ borderTop: '1px solid #00ff8812' }}
      >
        <span
          className="font-mono text-sm flex-shrink-0"
          style={{ color: '#4a7c59' }}
        >
          {PROMPT}
        </span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="w-full bg-transparent outline-none font-mono text-sm"
            style={{ color: '#c8ffd4', caretColor: '#00ff88' }}
            aria-label="Terminal input"
          />
          {/* Cursor rendered by browser caret — custom below for when unfocused */}
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div
        className="px-3 pb-2 font-mono flex gap-4 flex-wrap"
        style={{ fontSize: 10, color: '#4a7c59', borderTop: '1px solid #00ff8808' }}
      >
        <span>↑↓ history</span>
        <span>Tab autocomplete</span>
        <span>Ctrl+L clear</span>
        <span>Ctrl+C cancel</span>
      </div>
    </div>
  );
}
