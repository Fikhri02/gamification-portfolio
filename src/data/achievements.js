// ─── Achievement Definitions ──────────────────────────────────────────────────

export const ACHIEVEMENTS = {
  FIRST_BOOT: {
    id: 'FIRST_BOOT',
    emoji: '🚀',
    title: 'System Booted',
    description: 'Survived the boot sequence',
    xp: 50,
    rarity: 'common',
  },
  OPENED_ABOUT: {
    id: 'OPENED_ABOUT',
    emoji: '👤',
    title: 'Getting Acquainted',
    description: 'Opened the About window',
    xp: 50,
    rarity: 'common',
  },
  OPENED_TERMINAL: {
    id: 'OPENED_TERMINAL',
    emoji: '⌨️',
    title: 'Terminal Curious',
    description: 'Launched the terminal',
    xp: 75,
    rarity: 'common',
  },
  OPENED_PROJECTS: {
    id: 'OPENED_PROJECTS',
    emoji: '📁',
    title: 'Project Browser',
    description: 'Explored the projects',
    xp: 50,
    rarity: 'common',
  },
  OPENED_SKILLS: {
    id: 'OPENED_SKILLS',
    emoji: '📊',
    title: 'Skill Auditor',
    description: 'Reviewed the skill set',
    xp: 50,
    rarity: 'common',
  },
  OPENED_EXPERIENCE: {
    id: 'OPENED_EXPERIENCE',
    emoji: '📅',
    title: 'History Buff',
    description: 'Explored the experience timeline',
    xp: 75,
    rarity: 'common',
  },
  OPENED_CONTACT: {
    id: 'OPENED_CONTACT',
    emoji: '📬',
    title: 'Making Moves',
    description: 'Opened the contact window',
    xp: 100,
    rarity: 'uncommon',
  },
  ALL_WINDOWS: {
    id: 'ALL_WINDOWS',
    emoji: '🗺️',
    title: 'Full Explorer',
    description: 'Opened every single window',
    xp: 200,
    rarity: 'rare',
  },
  TERMINAL_HACKER: {
    id: 'TERMINAL_HACKER',
    emoji: '💻',
    title: 'Terminal Hacker',
    description: 'Ran 5+ terminal commands',
    xp: 150,
    rarity: 'uncommon',
  },
  DRAGGED_WINDOW: {
    id: 'DRAGGED_WINDOW',
    emoji: '🖱️',
    title: 'Power User',
    description: 'Dragged a window to organize your workspace',
    xp: 50,
    rarity: 'common',
  },
  KONAMI_CODE: {
    id: 'KONAMI_CODE',
    emoji: '🎮',
    title: '⬆⬆⬇⬇⬅➡⬅➡🅱🅰',
    description: 'You know the ancient code',
    xp: 300,
    rarity: 'legendary',
  },
  MATRIX_UNLOCKED: {
    id: 'MATRIX_UNLOCKED',
    emoji: '🟩',
    title: 'There Is No Spoon',
    description: 'Entered the Matrix',
    xp: 200,
    rarity: 'rare',
  },
  SUDO_HIRE: {
    id: 'SUDO_HIRE',
    emoji: '🤝',
    title: 'Best Decision Ever',
    description: 'Ran `sudo hire fikhri`',
    xp: 500,
    rarity: 'legendary',
  },
  NIGHT_OWL: {
    id: 'NIGHT_OWL',
    emoji: '🦉',
    title: 'Night Owl',
    description: 'Visited between 10pm – 4am',
    xp: 100,
    rarity: 'uncommon',
  },
  VIEW_ALL_PROJECTS: {
    id: 'VIEW_ALL_PROJECTS',
    emoji: '🔍',
    title: 'Due Diligence',
    description: 'Viewed details for every project',
    xp: 150,
    rarity: 'uncommon',
  },
  SPEED_RUNNER: {
    id: 'SPEED_RUNNER',
    emoji: '⚡',
    title: 'Speed Runner',
    description: 'Opened 3 windows within 10 seconds',
    xp: 100,
    rarity: 'uncommon',
  },
};

// XP thresholds for each level
export const LEVELS = [
  { level: 1, min: 0,    max: 200,  title: 'Visitor',          color: '#4a7c59' },
  { level: 2, min: 200,  max: 500,  title: 'Curious Mind',     color: '#00ff88' },
  { level: 3, min: 500,  max: 1000, title: 'Code Enthusiast',  color: '#00d4ff' },
  { level: 4, min: 1000, max: 1800, title: 'Tech Explorer',    color: '#a855f7' },
  { level: 5, min: 1800, max: 9999, title: 'Master Recruiter', color: '#ffd60a' },
];

export function getLevelInfo(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getNextLevel(xp) {
  const current = getLevelInfo(xp);
  return LEVELS.find(l => l.level === current.level + 1) || null;
}
