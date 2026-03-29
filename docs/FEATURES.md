# Features

## Boot Sequence

When the page loads, a simulated OS boot plays:

1. Scrolling terminal log lines appear sequentially with timing delays
2. A progress bar fills to 100%
3. A splash screen fades in with the OS name and a "Press Enter" prompt
4. Auto-advances after a few seconds — or click to skip immediately

## Desktop

The main canvas after booting:

- **Background grid** — subtle dot/line grid with a radial center glow
- **CRT scanline overlay** — repeating linear-gradient over the whole viewport, purely CSS
- **Desktop icons** — left column, animate in on boot, single or double-click to open
- **Hint text** — fades in and out when no windows are open
- **XP bar** — top-right, shows current level and progress to next
- **Taskbar** — bottom, shows open apps, clock, sound toggle, achievement count

## Windows

Each content area is a draggable, focusable OS window.

- **Drag** — grab the title bar to move anywhere on screen
- **Focus** — clicking a window or its taskbar button brings it to front (z-index management)
- **Minimize** — yellow traffic-light button; window collapses to taskbar entry
- **Close** — red traffic-light button removes the window
- **Open animation** — spring scale + fade in via Framer Motion
- **Close animation** — scale + fade out

Available windows:

| Window | File | Description |
|---|---|---|
| About | `about.exe` | Animated bio with glitch name reveal and typed text |
| Projects | `projects/` | Card list → expandable detail overlay |
| Skills | `skills.json` | Animated progress bars, collapsible by category, summary view |
| Experience | `experience.log` | Interactive timeline, click to expand each role |
| Contact | `contact.sh` | Links with copy-to-clipboard, playful terminal status, quick message form |
| Terminal | `terminal.app` | Full command-line interface (see Terminal section) |
| Achievements | `achievements.db` | Badge gallery, XP stats, level progress |

## Terminal

A working in-browser terminal emulator.

**Commands:**

| Command | Description |
|---|---|
| `help` | List all commands |
| `about` | Full bio |
| `whoami` | Quick identity |
| `skills` | Skill list with ASCII bars |
| `projects` | Project list |
| `experience` | Work history |
| `contact` | Contact info |
| `achievements` | Hint to open the window |
| `ls` | List "filesystem" |
| `cat <file>` | Read a file (`about.txt`, `secret.txt`, `skills.json`, `contact.txt`) |
| `open <app>` | Open a window by name |
| `date` | Current date/time |
| `pwd` | Print working directory |
| `uname -a` | System info |
| `echo <text>` | Echo text |
| `clear` / `cls` | Clear output |
| `matrix` | Toggle Matrix rain easter egg |
| `hack` | Fake hacking sequence |
| `coffee` | ASCII coffee art |
| `ping <host>` | Fake ping |
| `git blame` | Attribution |
| `vim` / `nano` | Editor war response |

**Easter egg commands:**

| Command | Effect |
|---|---|
| `sudo hire fikhri` | Grants "Best Decision Ever" legendary achievement + ASCII art |
| `cat secret.txt` | Hidden message |
| `matrix` | Matrix rain toggle + achievement |

**Keyboard shortcuts in terminal:**
- `↑` / `↓` — command history navigation
- `Tab` — autocomplete from known commands
- `Ctrl+L` — clear screen

## XP & Level System

Every action earns XP. Levels unlock at:

| Level | XP | Title |
|---|---|---|
| 1 | 0 | Visitor |
| 2 | 200 | Curious Mind |
| 3 | 500 | Code Enthusiast |
| 4 | 1000 | Tech Explorer |
| 5 | 1800 | Master Recruiter |

XP sources: opening windows (50 XP each), terminal commands, achievements, easter eggs.

## Achievements

16 achievements across four rarities:

| Rarity | Color | Count |
|---|---|---|
| Common | Green | 6 |
| Uncommon | Cyan | 5 |
| Rare | Purple | 2 |
| Legendary | Gold | 3 |

Legendary achievements:
- **⬆⬆⬇⬇⬅➡⬅➡🅱🅰** — Enter the Konami code (↑↑↓↓←→←→BA) on the desktop
- **There Is No Spoon** — Toggle the Matrix rain via terminal or Konami code
- **Best Decision Ever** — Run `sudo hire fikhri` in the terminal

Achievement toasts animate in from the bottom-right and auto-dismiss after 4.5 seconds.

## Easter Eggs

1. **Konami code** — ↑↑↓↓←→←→BA anywhere on the page → Matrix rain + legendary badge + sound
2. **`sudo hire fikhri`** — terminal command → special ASCII celebration + legendary badge
3. **`cat secret.txt`** — hint about the Konami code
4. **Night Owl** — visit between 10pm–4am → automatic uncommon achievement
5. **Speed Runner** — open 3 windows within 10 seconds → automatic achievement

## Sound Effects

All sounds are synthesized via the Web Audio API — no audio files are bundled.

| Sound | Trigger |
|---|---|
| Boot chord | Boot sequence completes |
| Window open | Ascending square wave beep |
| Window close | Descending square wave beep |
| Achievement | 4-note arpeggio fanfare |
| Error | Sawtooth buzz |

Sound can be toggled via the 🔊/🔇 button in the taskbar.
