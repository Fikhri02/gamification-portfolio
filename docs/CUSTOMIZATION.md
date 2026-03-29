# Customization Guide

Everything you need to personalize FIKHRI.OS for yourself.

---

## 1. Personal Content — `src/data/portfolio.js`

This is the only file you need to edit for a content update.

### PROFILE

```js
export const PROFILE = {
  name: 'Your Name',
  title: 'Your Title',
  tagline: 'Your one-liner.',
  location: 'City, Country',
  avatar: '👨‍💻',           // any emoji
  bio: `Multi-line bio here.

  Supports multiple paragraphs.`,
  funFacts: [
    '☕  Fact one',
    '🎮  Fact two',
    // ...
  ],
};
```

### SKILLS

Each category renders as a collapsible section with animated progress bars.

```js
export const SKILLS = [
  {
    category: 'Frontend',
    color: '#00ff88',     // accent color for this category
    items: [
      { name: 'React', level: 95 },  // level: 0–100
      // ...
    ],
  },
  // add or remove categories freely
];
```

### EXPERIENCE

```js
export const EXPERIENCE = [
  {
    id: 1,              // must be unique
    role: 'Job Title',
    company: 'Company Name',
    period: '2022 — Present',
    type: 'Full-time',
    color: '#00ff88',   // timeline accent color
    highlights: [
      'Achievement one',
      'Achievement two',
    ],
    stack: ['React', 'Node.js'],
  },
  // oldest job last
];
```

### PROJECTS

```js
export const PROJECTS = [
  {
    id: 1,
    name: 'Project Name',
    emoji: '🚀',
    tagline: 'One-line description',
    description: `Longer description shown in detail view.`,
    stack: ['React', 'Node.js'],
    highlights: ['Metric 1', 'Metric 2', 'Metric 3'],
    color: '#00ff88',
    links: {
      github: 'https://github.com/...',
      demo: 'https://...',
    },
    status: 'Production',  // 'Production' | 'Open Source' | 'Published' | anything
  },
];
```

### CONTACT

```js
export const CONTACT = {
  email: 'you@example.com',
  github: 'github.com/yourhandle',
  linkedin: 'linkedin.com/in/yourhandle',
  twitter: '@yourhandle',
  availability: 'A sentence about your current status.',
};
```

---

## 2. OS Branding

To rename the OS, search for `FIKHRI.OS` across the codebase:

```bash
grep -r "FIKHRI.OS" src/
```

Key locations:
- `src/components/BootSequence.jsx` — splash title and log lines
- `src/components/Taskbar.jsx` — start button label
- `src/utils/terminalCommands.js` — terminal banner, `uname` output
- `index.html` — page `<title>`

---

## 3. Color Theme

The color palette is defined in `tailwind.config.js` under `theme.extend.colors.os`:

```js
os: {
  bg:      '#080810',   // desktop background
  surface: '#0d1117',   // window background
  glow:    '#00ff88',   // primary accent (green)
  cyan:    '#00d4ff',   // secondary accent
  purple:  '#a855f7',
  pink:    '#f72585',
  text:    '#c8ffd4',   // primary text
  muted:   '#4a7c59',   // secondary text
  warning: '#ffd60a',   // XP / achievement gold
},
```

Change `glow` to shift the primary green to any color. Update the matching hex values in `index.css` for the CSS custom properties (glow effects, window borders).

---

## 4. Adding a New Window

**Step 1** — Create the content component:

```jsx
// src/components/windows/MyWindow.jsx
export default function MyWindow() {
  return (
    <div className="scroll-area">
      <p>My content</p>
    </div>
  );
}
```

**Step 2** — Register in `WINDOW_META` (`src/components/Window.jsx`):

```js
mywindow: { title: 'mywindow.app', icon: '🌟', color: '#00d4ff', w: 600, h: 500 },
```

**Step 3** — Add to `WINDOW_COMPONENTS` in `src/components/Desktop.jsx`:

```js
import MyWindow from './windows/MyWindow';
const WINDOW_COMPONENTS = {
  // ...existing...
  mywindow: MyWindow,
};
```

**Step 4** — Add a desktop icon to `DESKTOP_ICONS` in `Desktop.jsx`:

```js
{ id: 'mywindow', type: 'mywindow', emoji: '🌟', label: 'my-app', color: '#00d4ff' },
```

**Step 5** _(optional)_ — Add an achievement for opening it in `achievements.js` and trigger it in `GameContext.jsx`.

---

## 5. Adding Terminal Commands

All commands are in `src/utils/terminalCommands.js` inside the `switch (cmd)` block.

```js
case 'mycommand': {
  return [
    blank(),
    line(color.cyan('Your output here')),
    line('Regular text'),
    blank(),
  ];
}
```

Helper functions available:
- `color.green(str)`, `color.cyan(str)`, `color.purple(str)`, `color.pink(str)`, `color.yellow(str)`
- `color.bold(str)`, `color.muted(str)`, `color.dim(str)`
- `line(content)` — creates an output line
- `blank()` — creates an empty line

---

## 6. Adding Achievements

In `src/data/achievements.js`:

```js
export const ACHIEVEMENTS = {
  // ...existing...
  MY_ACHIEVEMENT: {
    id: 'MY_ACHIEVEMENT',
    emoji: '⭐',
    title: 'Achievement Name',
    description: 'How to earn it',
    xp: 100,
    rarity: 'uncommon',  // 'common' | 'uncommon' | 'rare' | 'legendary'
  },
};
```

Then trigger it anywhere that has access to `useGame()`:

```js
const { unlockAchievement } = useGame();
unlockAchievement('MY_ACHIEVEMENT');
```

---

## 7. Disabling the Boot Sequence

In `src/App.jsx`, change the initial state:

```js
const [booted, setBooted] = useState(true);  // skip boot
```

---

## 8. Deployment

**Vercel / Netlify:**

```bash
npm run build
# deploy the dist/ folder
```

No server-side code — it's a fully static SPA.

**GitHub Pages** (with Vite):

```bash
# vite.config.js — add base
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

Then push `dist/` to the `gh-pages` branch.
