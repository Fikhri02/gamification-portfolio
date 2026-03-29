import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, CONTACT } from '../data/portfolio';

// ─── Terminal Color Helpers ───────────────────────────────────────────────────
export const color = {
  green:  (s) => `<span style="color:#00ff88">${s}</span>`,
  cyan:   (s) => `<span style="color:#00d4ff">${s}</span>`,
  purple: (s) => `<span style="color:#a855f7">${s}</span>`,
  pink:   (s) => `<span style="color:#f72585">${s}</span>`,
  yellow: (s) => `<span style="color:#ffd60a">${s}</span>`,
  muted:  (s) => `<span style="color:#4a7c59">${s}</span>`,
  bold:   (s) => `<span style="font-weight:700">${s}</span>`,
  dim:    (s) => `<span style="opacity:0.5">${s}</span>`,
};

const line = (content = '', cls = '') =>
  ({ content, type: 'output', cls });

const blank = () => line('');

// ─── Command Definitions ─────────────────────────────────────────────────────
export function processCommand(raw, { dispatch, unlockAchievement, toggleMatrix, openWindow } = {}) {
  const trimmed = raw.trim();
  const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
  const fullArgs = args.join(' ');

  switch (cmd) {
    // ── Navigation ──────────────────────────────────────────────────────────
    case 'help': {
      return [
        line(color.green('╔══════════════════════════════════════╗')),
        line(color.green('║') + color.cyan('      FIKHRI.OS Terminal Help         ') + color.green('║')),
        line(color.green('╚══════════════════════════════════════╝')),
        blank(),
        line(color.yellow('── Navigation ──────────────────')),
        line(`  ${color.cyan('about')}        ${color.muted('→')} Who is Fikhri?`),
        line(`  ${color.cyan('whoami')}       ${color.muted('→')} Quick identity check`),
        line(`  ${color.cyan('skills')}       ${color.muted('→')} Technical skill breakdown`),
        line(`  ${color.cyan('projects')}     ${color.muted('→')} Portfolio showcase`),
        line(`  ${color.cyan('experience')}   ${color.muted('→')} Work history`),
        line(`  ${color.cyan('contact')}      ${color.muted('→')} Get in touch`),
        line(`  ${color.cyan('achievements')} ${color.muted('→')} Your earned badges`),
        blank(),
        line(color.yellow('── System ──────────────────────')),
        line(`  ${color.cyan('ls')}           ${color.muted('→')} List filesystem`),
        line(`  ${color.cyan('cat <file>')}   ${color.muted('→')} Read a file`),
        line(`  ${color.cyan('open <app>')}   ${color.muted('→')} Open a window`),
        line(`  ${color.cyan('date')}         ${color.muted('→')} Current date/time`),
        line(`  ${color.cyan('uname -a')}     ${color.muted('→')} System info`),
        line(`  ${color.cyan('clear / cls')}  ${color.muted('→')} Clear terminal`),
        blank(),
        line(color.muted('  Hint: some commands have hidden surprises...')),
        blank(),
      ];
    }

    case 'whoami':
      return [
        blank(),
        line(color.green(`  ${PROFILE.name}`) + color.muted(` — ${PROFILE.title}`)),
        line(`  ${color.dim(PROFILE.tagline)}`),
        line(`  ${color.muted('📍')} ${PROFILE.location}`),
        blank(),
      ];

    case 'about': {
      const lines = [
        blank(),
        line(color.cyan('╭─ About ────────────────────────────╮')),
        blank(),
      ];
      PROFILE.bio.split('\n').forEach(l => lines.push(line(`  ${l.trim()}`)));
      lines.push(blank());
      lines.push(line(color.yellow('Fun Facts:')));
      PROFILE.funFacts.forEach(f => lines.push(line(`  ${f}`)));
      lines.push(blank());
      lines.push(line(color.cyan('╰────────────────────────────────────╯')));
      lines.push(blank());
      return lines;
    }

    case 'skills': {
      const lines = [blank(), line(color.cyan('Technical Skills:'))];
      SKILLS.forEach(cat => {
        lines.push(blank());
        lines.push(line(`  ${color.yellow(cat.category)}`));
        cat.items.forEach(s => {
          const bar = '█'.repeat(Math.round(s.level / 10)) + '░'.repeat(10 - Math.round(s.level / 10));
          lines.push(line(`  ${s.name.padEnd(22)} ${color.green(bar)} ${s.level}%`));
        });
      });
      lines.push(blank());
      return lines;
    }

    case 'projects': {
      const lines = [blank(), line(color.cyan('Projects:')), blank()];
      PROJECTS.forEach((p, i) => {
        lines.push(line(`  ${color.yellow(`[${i+1}]`)} ${p.emoji} ${color.bold(p.name)} ${color.muted('—')} ${p.tagline}`));
        lines.push(line(`      ${color.muted('Stack: ' + p.stack.join(', '))}`));
        lines.push(blank());
      });
      lines.push(line(color.muted('  Tip: type `open projects` to see the full interactive view')));
      lines.push(blank());
      return lines;
    }

    case 'experience': {
      const lines = [blank(), line(color.cyan('Work Experience:')), blank()];
      EXPERIENCE.forEach(e => {
        lines.push(line(`  ${color.green('▶')} ${color.bold(e.role)} ${color.muted('at')} ${color.yellow(e.company)}`));
        lines.push(line(`    ${color.muted(e.period)} ${color.dim('·')} ${color.dim(e.type)}`));
        e.highlights.slice(0, 2).forEach(h => lines.push(line(`    ${color.muted('•')} ${h}`)));
        lines.push(blank());
      });
      return lines;
    }

    case 'contact': {
      return [
        blank(),
        line(color.cyan('╭─ Contact ─────────────────────────╮')),
        line(`  ${color.green('Email')}    ${CONTACT.email}`),
        line(`  ${color.green('GitHub')}   ${CONTACT.github}`),
        line(`  ${color.green('LinkedIn')} ${CONTACT.linkedin}`),
        line(`  ${color.green('Twitter')}  ${CONTACT.twitter}`),
        blank(),
        line(`  ${color.yellow('Availability:')} ${CONTACT.availability}`),
        line(color.cyan('╰────────────────────────────────────╯')),
        blank(),
      ];
    }

    case 'achievements':
      return [
        blank(),
        line(color.yellow('  🏆 Open the Achievements window to see your badges!')),
        line(color.muted('     Try: open achievements')),
        blank(),
      ];

    // ── System Commands ──────────────────────────────────────────────────────
    case 'ls': {
      const files = [
        { name: 'about.txt',      size: '4.2K', color: 'cyan' },
        { name: 'skills.json',    size: '2.8K', color: 'cyan' },
        { name: 'projects/',      size: '—',    color: 'yellow' },
        { name: 'experience.log', size: '6.1K', color: 'cyan' },
        { name: 'contact.txt',    size: '1.1K', color: 'cyan' },
        { name: 'secret.txt',     size: '???',  color: 'pink' },
        { name: 'achievements/',  size: '—',    color: 'yellow' },
      ];
      const lines = [blank(), line(color.muted('total 7'))];
      files.forEach(f => {
        const nameStr = f.color === 'yellow'
          ? color.yellow(f.name)
          : f.color === 'pink'
            ? color.pink(f.name)
            : color.cyan(f.name);
        lines.push(line(`  ${color.muted(f.size.padStart(5))}  ${nameStr}`));
      });
      lines.push(blank());
      return lines;
    }

    case 'cat': {
      switch (fullArgs) {
        case 'about.txt':
          return processCommand('about', { dispatch, unlockAchievement, toggleMatrix, openWindow });
        case 'contact.txt':
          return processCommand('contact', { dispatch, unlockAchievement, toggleMatrix, openWindow });
        case 'secret.txt':
          return [
            blank(),
            line(color.pink('  ████████████████████████████████')),
            line(color.pink('  ██') + color.green(' SECRET FILE ACCESSED ') + color.pink('██')),
            line(color.pink('  ████████████████████████████████')),
            blank(),
            line(`  ${color.yellow('If you can read this, you\'re thorough.')}`),
            line('  The real secret: good engineers read docs.'),
            line('  (Also: try the Konami code ↑↑↓↓←→←→BA)'),
            blank(),
          ];
        case 'skills.json':
          return processCommand('skills', { dispatch, unlockAchievement, toggleMatrix, openWindow });
        default:
          return [
            blank(),
            line(color.pink(`  cat: ${fullArgs}: No such file or directory`)),
            line(color.muted('  Run `ls` to see available files')),
            blank(),
          ];
      }
    }

    case 'open': {
      const validApps = ['about', 'projects', 'skills', 'experience', 'contact', 'terminal', 'achievements'];
      if (validApps.includes(fullArgs)) {
        if (openWindow) openWindow(fullArgs, fullArgs);
        return [
          blank(),
          line(color.green(`  ✓ Opening ${fullArgs}...`)),
          blank(),
        ];
      }
      return [
        blank(),
        line(color.pink(`  Unknown app: ${fullArgs}`)),
        line(color.muted(`  Available: ${validApps.join(', ')}`)),
        blank(),
      ];
    }

    case 'date':
      return [blank(), line(`  ${color.cyan(new Date().toString())}`), blank()];

    case 'pwd':
      return [blank(), line(`  ${color.green('/home/visitor/fikhri-os')}`), blank()];

    case 'uname': {
      return [
        blank(),
        line(`  FIKHRI.OS v2.0 #1 SMP React-18 x86_64 GNU/WebAssembly`),
        blank(),
      ];
    }

    case 'history':
      return [blank(), line(color.muted('  (History is stored in memory — scroll up)')), blank()];

    case 'echo':
      return [blank(), line(`  ${fullArgs || ''}`), blank()];

    case 'clear':
    case 'cls':
      return 'CLEAR';

    // ── Easter Eggs ──────────────────────────────────────────────────────────
    case 'sudo': {
      if (fullArgs === 'hire fikhri' || fullArgs === 'hire-fikhri') {
        if (unlockAchievement) unlockAchievement('SUDO_HIRE');
        return [
          blank(),
          line(color.green('  ██████████████████████████████████████')),
          line(color.green('  ██') + color.yellow('       ACCESS GRANTED ✓          ') + color.green('██')),
          line(color.green('  ██████████████████████████████████████')),
          blank(),
          line(`  ${color.cyan('Initiating: Best Career Decision Protocol...')}`),
          blank(),
          line(`  ${color.green('▶')} Candidate evaluation: ${color.yellow('EXCEPTIONAL')}`),
          line(`  ${color.green('▶')} Stack alignment: ${color.green('100%')}`),
          line(`  ${color.green('▶')} Culture fit: ${color.green('MAXIMUM')}`),
          line(`  ${color.green('▶')} References: ${color.green('All say "brilliant"')}`),
          blank(),
          line(`  ${color.pink('🎉')} ${color.bold('Congratulations on your great hire!')} ${color.pink('🎉')}`),
          line(`  ${color.muted('      fikhri@example.com is standing by.')}`),
          blank(),
          line(color.green('  ██████████████████████████████████████')),
          blank(),
        ];
      }
      return [
        blank(),
        line(color.pink('  sudo: permission denied (nice try)')),
        line(color.muted('  Hint: `sudo hire fikhri` might work...')),
        blank(),
      ];
    }

    case 'matrix': {
      if (toggleMatrix) toggleMatrix();
      if (unlockAchievement) unlockAchievement('MATRIX_UNLOCKED');
      return [
        blank(),
        line(color.green('  Wake up, Neo...')),
        line(color.green('  The Matrix has you.')),
        blank(),
        line(color.muted('  (Run `matrix` again to exit)')),
        blank(),
      ];
    }

    case 'hack': {
      return [
        blank(),
        line(color.green('  Initiating hack sequence...')),
        line(color.green('  Bypassing firewall...')),
        line(color.cyan('  Accessing mainframe...')),
        line(color.yellow('  Decrypting files...')),
        line(color.pink('  ████████████████░░░░ 78%')),
        blank(),
        line(color.muted('  Just kidding. This is a portfolio, not Mr. Robot.')),
        blank(),
      ];
    }

    case 'coffee':
      return [
        blank(),
        line('       ( ('),
        line('        ) )'),
        line('     ._______.'),
        line('     |       |]'),
        line('     \\       /'),
        line('      `-----\''),
        blank(),
        line(color.yellow('  ☕ Coffee successfully brewed.')),
        line(color.muted('  (The secret ingredient to all great code)')),
        blank(),
      ];

    case 'konami':
      return [
        blank(),
        line(color.muted('  Hint: ↑↑↓↓←→←→BA')),
        line(color.muted('  (Use your keyboard on the desktop...)')),
        blank(),
      ];

    case 'exit':
    case 'quit':
      return [
        blank(),
        line(color.pink('  You can\'t leave. You\'re already inside the portfolio.')),
        line(color.muted('  (Close the window if you must)')),
        blank(),
      ];

    case 'vim':
    case 'nano':
    case 'emacs':
      return [
        blank(),
        line(color.pink(`  ${cmd}: text editor wars not supported on this system`)),
        line(color.muted('  (The correct answer is obviously VSCode)')),
        blank(),
      ];

    case 'git': {
      if (fullArgs === 'blame') {
        return [blank(), line(color.yellow('  All code written by Fikhri. Every line.')), blank()];
      }
      if (fullArgs.startsWith('commit')) {
        return [blank(), line(color.green('  ✓ Committed: "fix: final version I promise"')), blank()];
      }
      return [blank(), line(color.muted('  git: use GitHub instead → ' + CONTACT.github)), blank()];
    }

    case 'ping':
      return [
        blank(),
        line(color.green(`  PING ${fullArgs || 'fikhri.dev'}: 28 bytes of data`)),
        line(`  28 bytes from ${fullArgs || 'fikhri.dev'}: icmp_seq=1 ttl=64 time=${(Math.random()*10+1).toFixed(2)} ms`),
        line(`  28 bytes from ${fullArgs || 'fikhri.dev'}: icmp_seq=2 ttl=64 time=${(Math.random()*10+1).toFixed(2)} ms`),
        line(`  ${color.yellow('--- statistics ---')}`),
        line(`  2 packets transmitted, 2 received, 0% packet loss`),
        blank(),
      ];

    case '':
      return [];

    default:
      return [
        blank(),
        line(color.pink(`  command not found: ${cmd}`)),
        line(color.muted('  Type `help` for available commands')),
        blank(),
      ];
  }
}
