import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { ACHIEVEMENTS, getLevelInfo } from '../data/achievements';

// ─── State Shape ─────────────────────────────────────────────────────────────
const initialState = {
  xp: 0,
  achievements: [],          // array of achievement IDs earned
  windows: [],               // open windows: { id, type, zIndex, minimized, pos }
  topZ: 10,                  // current highest z-index
  toasts: [],                // pending achievement toasts
  matrixActive: false,
  viewedProjects: new Set(), // project IDs the user has expanded
  windowOpenTimes: [],       // timestamps for speed-runner detection
  commandCount: 0,           // terminal commands run
  draggedWindow: false,
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'OPEN_WINDOW': {
      const existing = state.windows.find(w => w.id === action.window.id);
      if (existing) {
        // Bring to front if already open
        return {
          ...state,
          topZ: state.topZ + 1,
          windows: state.windows.map(w =>
            w.id === action.window.id
              ? { ...w, minimized: false, zIndex: state.topZ + 1 }
              : w
          ),
        };
      }
      const newTopZ = state.topZ + 1;
      return {
        ...state,
        topZ: newTopZ,
        windows: [...state.windows, { ...action.window, zIndex: newTopZ, minimized: false }],
        windowOpenTimes: [...state.windowOpenTimes, Date.now()],
      };
    }

    case 'CLOSE_WINDOW':
      return { ...state, windows: state.windows.filter(w => w.id !== action.id) };

    case 'FOCUS_WINDOW':
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, zIndex: state.topZ + 1 } : w
        ),
      };

    case 'MOVE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, pos: action.pos } : w
        ),
      };

    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, minimized: !w.minimized } : w
        ),
      };

    case 'ADD_XP':
      return { ...state, xp: state.xp + action.amount };

    case 'UNLOCK_ACHIEVEMENT': {
      if (state.achievements.includes(action.id)) return state;
      const achievement = ACHIEVEMENTS[action.id];
      return {
        ...state,
        achievements: [...state.achievements, action.id],
        xp: state.xp + (achievement?.xp || 0),
        toasts: [...state.toasts, { ...achievement, toastId: Date.now() }],
      };
    }

    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.toastId !== action.toastId) };

    case 'TOGGLE_MATRIX':
      return { ...state, matrixActive: !state.matrixActive };

    case 'VIEW_PROJECT':
      return { ...state, viewedProjects: new Set([...state.viewedProjects, action.id]) };

    case 'INCREMENT_COMMANDS':
      return { ...state, commandCount: state.commandCount + 1 };

    case 'SET_DRAGGED':
      return { ...state, draggedWindow: true };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const prevAchievementsRef = useRef([]);

  // ── Derived helpers ────────────────────────────────────────────────────────
  const openWindow = useCallback((id, type, initialPos) => {
    dispatch({ type: 'OPEN_WINDOW', window: { id, type, pos: initialPos } });
  }, []);

  const closeWindow = useCallback((id) => {
    dispatch({ type: 'CLOSE_WINDOW', id });
  }, []);

  const focusWindow = useCallback((id) => {
    dispatch({ type: 'FOCUS_WINDOW', id });
  }, []);

  const moveWindow = useCallback((id, pos) => {
    dispatch({ type: 'MOVE_WINDOW', id, pos });
  }, []);

  const minimizeWindow = useCallback((id) => {
    dispatch({ type: 'MINIMIZE_WINDOW', id });
  }, []);

  const unlockAchievement = useCallback((id) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', id });
  }, []);

  const dismissToast = useCallback((toastId) => {
    dispatch({ type: 'DISMISS_TOAST', toastId });
  }, []);

  const toggleMatrix = useCallback(() => {
    dispatch({ type: 'TOGGLE_MATRIX' });
  }, []);

  const viewProject = useCallback((id) => {
    dispatch({ type: 'VIEW_PROJECT', id });
  }, []);

  const incrementCommands = useCallback(() => {
    dispatch({ type: 'INCREMENT_COMMANDS' });
  }, []);

  const setDragged = useCallback(() => {
    dispatch({ type: 'SET_DRAGGED' });
  }, []);

  // ── Achievement triggers ───────────────────────────────────────────────────
  useEffect(() => {
    // Check drag achievement
    if (state.draggedWindow && !state.achievements.includes('DRAGGED_WINDOW')) {
      unlockAchievement('DRAGGED_WINDOW');
    }
  }, [state.draggedWindow]);

  useEffect(() => {
    // Terminal hacker: 5 commands
    if (state.commandCount >= 5 && !state.achievements.includes('TERMINAL_HACKER')) {
      unlockAchievement('TERMINAL_HACKER');
    }
  }, [state.commandCount]);

  useEffect(() => {
    // All windows opened
    const TRACKABLE = ['about', 'projects', 'skills', 'experience', 'contact', 'terminal', 'achievements'];
    const openTypes = new Set(state.windows.map(w => w.type));
    const allOpen = TRACKABLE.every(t => openTypes.has(t));
    // Also check via achievements
    const windowAchievements = ['OPENED_ABOUT','OPENED_PROJECTS','OPENED_SKILLS','OPENED_EXPERIENCE','OPENED_CONTACT','OPENED_TERMINAL'];
    const allAchieved = windowAchievements.every(a => state.achievements.includes(a));
    if ((allOpen || allAchieved) && !state.achievements.includes('ALL_WINDOWS')) {
      unlockAchievement('ALL_WINDOWS');
    }
  }, [state.achievements]);

  useEffect(() => {
    // View all projects (5 total)
    if (state.viewedProjects.size >= 5 && !state.achievements.includes('VIEW_ALL_PROJECTS')) {
      unlockAchievement('VIEW_ALL_PROJECTS');
    }
  }, [state.viewedProjects]);

  useEffect(() => {
    // Speed runner: 3 windows in 10 seconds
    if (state.windowOpenTimes.length >= 3) {
      const recent = state.windowOpenTimes.slice(-3);
      if (recent[2] - recent[0] <= 10000 && !state.achievements.includes('SPEED_RUNNER')) {
        unlockAchievement('SPEED_RUNNER');
      }
    }
  }, [state.windowOpenTimes]);

  // Check night owl on first render
  useEffect(() => {
    const hour = new Date().getHours();
    if ((hour >= 22 || hour < 4)) {
      unlockAchievement('NIGHT_OWL');
    }
  }, []);

  const levelInfo = getLevelInfo(state.xp);

  return (
    <GameContext.Provider value={{
      state,
      levelInfo,
      openWindow,
      closeWindow,
      focusWindow,
      moveWindow,
      minimizeWindow,
      unlockAchievement,
      dismissToast,
      toggleMatrix,
      viewProject,
      incrementCommands,
      setDragged,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
};
