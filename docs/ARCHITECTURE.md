# Architecture

## Overview

The app is a single-page React application with no routing. State is managed globally via a `useReducer`-based context. There is no external state library.

```
App
└── GameProvider (context)
    └── AppInner
        ├── BootSequence     (pre-boot)
        └── Desktop          (post-boot)
            ├── DesktopIcon × 7
            ├── Window × N   (dynamic, from state.windows)
            │   └── <ContentWindow> (About | Projects | Skills | ...)
            ├── XPBar
            ├── Taskbar
            ├── MatrixRain
            └── AchievementToast
```

---

## State Management — `GameContext`

All mutable UI and game state lives in a single `useReducer` in `src/context/GameContext.jsx`.

### State shape

```ts
{
  xp: number,
  achievements: string[],       // IDs of earned achievements
  windows: Window[],            // open windows
  topZ: number,                 // highest current z-index
  toasts: Toast[],              // pending achievement notifications
  matrixActive: boolean,
  viewedProjects: Set<number>,  // project IDs expanded
  windowOpenTimes: number[],    // timestamps (for speed-runner detection)
  commandCount: number,         // terminal commands run
  draggedWindow: boolean,
}

type Window = {
  id: string,
  type: WindowType,
  zIndex: number,
  minimized: boolean,
  pos: { x: number, y: number },
}
```

### Actions

| Action | Effect |
|---|---|
| `OPEN_WINDOW` | Adds window or brings existing one to front |
| `CLOSE_WINDOW` | Removes window by id |
| `FOCUS_WINDOW` | Increments topZ, sets window zIndex |
| `MOVE_WINDOW` | Updates position (called on drag end) |
| `MINIMIZE_WINDOW` | Toggles minimized flag |
| `ADD_XP` | Increments XP directly |
| `UNLOCK_ACHIEVEMENT` | Adds id, increments XP by achievement value, queues toast |
| `DISMISS_TOAST` | Removes toast by toastId |
| `TOGGLE_MATRIX` | Flips matrixActive |
| `VIEW_PROJECT` | Adds id to viewedProjects set |
| `INCREMENT_COMMANDS` | Increments commandCount |
| `SET_DRAGGED` | Sets draggedWindow to true |

### Achievement triggers

Achievements are triggered by `useEffect` hooks inside `GameProvider` that watch state slices:

- `draggedWindow` → `DRAGGED_WINDOW`
- `commandCount >= 5` → `TERMINAL_HACKER`
- All window achievement IDs earned → `ALL_WINDOWS`
- `viewedProjects.size >= 5` → `VIEW_ALL_PROJECTS`
- 3 window opens within 10 seconds → `SPEED_RUNNER`
- Hour between 22–4 on mount → `NIGHT_OWL`

---

## Window System

### `Window.jsx`

Each window is an `absolute`-positioned `div` managed by Framer Motion for open/close animations.

**Dragging** uses the Pointer Events API (`setPointerCapture`) rather than global `mousemove` listeners. This is more reliable because:
- Works across iframe boundaries
- Handles fast mouse movement outside the element
- Single event target — no window-level listener needed

```jsx
const handlePointerDown = (e) => {
  e.currentTarget.setPointerCapture(e.pointerId);
  dragRef.current = { startX: e.clientX - position.x, startY: e.clientY - position.y };
};

const handlePointerMove = (e) => {
  if (!dragRef.current) return;
  setPosition({ x: e.clientX - dragRef.current.startX, y: e.clientY - dragRef.current.startY });
};
```

**Z-index management** — `topZ` in global state increments monotonically. Clicking/focusing a window sets its `zIndex` to `topZ + 1`. No need to re-sort or recalculate other windows.

### `WINDOW_META`

Defined in `Window.jsx`, this maps each window type to its display metadata:

```js
const WINDOW_META = {
  about:    { title: 'about.exe', icon: '👤', color: '#00ff88', w: 620, h: 520 },
  terminal: { title: 'terminal.app', icon: '⌨️', color: '#00ff88', w: 700, h: 480 },
  // ...
}
```

Default window position is calculated at open time: `(viewport - windowSize) / 2` with a small random offset so multiple opens don't stack exactly.

---

## Terminal

`src/utils/terminalCommands.js` exports a single `processCommand(rawInput, callbacks)` function.

- Returns an array of `{ content: string, type: 'output' }` line objects, or the string `'CLEAR'`
- `content` may contain inline HTML for color styling (`<span style="...">`)
- `callbacks` provides `{ unlockAchievement, toggleMatrix, openWindow }` so commands can trigger side effects

`TerminalWindow.jsx` manages:
- Line history array
- Command history (↑/↓ navigation)
- Tab autocomplete from a static command list
- Auto-scroll to bottom on new output
- `Ctrl+L` to clear

---

## Sound

`src/hooks/useSound.js` creates an `AudioContext` lazily on first use (required by browser autoplay policy — audio context must be created after a user gesture).

All sounds are synthesized with `OscillatorNode` + `GainNode`. No audio files are shipped. The `play(type)` function accepts a named sound type and programs the oscillator frequency, wave shape, and gain envelope.

---

## Matrix Rain

`src/components/MatrixRain.jsx` renders to a `<canvas>` positioned `fixed` over the desktop at `z-index: 8888` (below achievement toasts at 9000, below the CRT overlay at 9999).

The animation loop:
1. Fills the canvas with a semi-transparent black overlay (`rgba(0,0,0,0.05)`) each frame — this creates the trailing fade without a full clear
2. Draws a random character at each column's current Y position
3. Advances each column downward by 16px
4. Randomly resets columns that have gone past the bottom

Uses `requestAnimationFrame` and cleans up properly on deactivation.

---

## Animations

Framer Motion is used for:

- Boot sequence fade in/out (`AnimatePresence`)
- Window open/close (`scale` + `opacity` spring)
- Achievement toast slide-in from right
- Desktop icon hover/tap feedback
- Skill bar width transitions on first render
- XP bar width transition on XP change
- Per-item stagger delays on lists (projects, skills, experience)

CSS animations handle:
- Blinking cursor (`blink` keyframe)
- Glitch text effect on the OS name (`glitch` keyframe)
- XP bar shimmer (`shimmer` keyframe)
- CRT scan line (static CSS, no JS)

---

## Responsive Behavior

The desktop is designed for 1280px+ screens. On smaller screens (`max-width: 768px`):
- Windows are forced to `95vw` width and `2.5vw` left offset via CSS
- Desktop icons shrink slightly
- The experience is usable but not optimized — this is intentional for a portfolio aimed at desktop viewers (recruiters, hiring managers at computers)

---

## Content Separation

All portfolio data is isolated in `src/data/portfolio.js`. No content strings exist in component files. This makes the project forkable as a template — edit one file, get a new portfolio.
