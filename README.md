# FIKHRI.OS v2.0

> An interactive portfolio disguised as a retro-futuristic operating system.

Built with React, Framer Motion, and Tailwind CSS. Visitors "boot" into a fake OS and discover the portfolio by exploring — not scrolling.

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

---

## Concept

Instead of a typical hero → projects → contact layout, FIKHRI.OS presents portfolio content as a simulated desktop OS:

- **Boot sequence** on load with a scrolling log and progress bar
- **Desktop** with clickable icons, each opening a draggable window
- **XP + level system** — every action (opening windows, using the terminal, finding easter eggs) earns XP
- **Achievement system** — 16 badges across common / uncommon / rare / legendary rarities
- **Working terminal** — full command processor with 20+ commands and easter eggs
- **CRT scanline overlay** — subtle retro aesthetic

---

## Customization

All portfolio content lives in one file:

```
src/data/portfolio.js
```

Edit `PROFILE`, `SKILLS`, `EXPERIENCE`, `PROJECTS`, and `CONTACT` to make it yours. Nothing else needs to change for a content update.

To add or modify achievements, edit:

```
src/data/achievements.js
```

---

## Project Structure

```
gamification-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── GameContext.jsx
    ├── data/
    │   ├── portfolio.js        ← edit this
    │   └── achievements.js
    ├── hooks/
    │   ├── useKonamiCode.js
    │   └── useSound.js
    ├── utils/
    │   └── terminalCommands.js
    └── components/
        ├── BootSequence.jsx
        ├── Desktop.jsx
        ├── Window.jsx
        ├── Taskbar.jsx
        ├── XPBar.jsx
        ├── MatrixRain.jsx
        ├── AchievementToast.jsx
        ├── DesktopIcon.jsx
        └── windows/
            ├── AboutWindow.jsx
            ├── ProjectsWindow.jsx
            ├── SkillsWindow.jsx
            ├── ExperienceWindow.jsx
            ├── ContactWindow.jsx
            ├── TerminalWindow.jsx
            └── AchievementsWindow.jsx
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility styling |
| Framer Motion 11 | Animations & transitions |
| Web Audio API | Synthesized sound effects (no audio files) |

---

## Features

See [FEATURES.md](./docs/FEATURES.md) for the full feature list.
See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for the technical design.
