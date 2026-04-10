// ─── Portfolio Content ────────────────────────────────────────────────────────
// Edit this file to customize all portfolio content.

export const PROFILE = {
  name: 'Irfan Fikhri Bin Iszahar',
  title: 'Senior Analyst Developer',
  tagline: 'Building systems that scale, experiences that last.',
  location: 'Selangor · Malaysia',
  avatar: '👨‍💻',
  bio: `I architect and ship production systems at scale. With 7+ years of
experience across the full stack, I've led teams, launched products used
by millions, and written code that runs in the wild — not just on localhost.

I believe great software is invisible: it just works, scales quietly, and
delights the people who use it. I obsess over developer experience, system
design, and shipping things that matter.

Currently exploring: distributed systems, AI-powered tooling, and whatever
problem is genuinely interesting this week.`,
  funFacts: [
    '☕  Fueled by coffee and curiosity',
    '🎮  Built 3 game projects just to learn engine internals',
    '📡  Once debugged a prod issue at 3am from a train with spotty WiFi',
    '🧩  Addicted to system design puzzles',
    '🌐  Contributed to 12+ open source projects',
  ],
};

export const SKILLS = [
  { category: 'Frontend', color: '#00ff88', items: [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 92 },
    { name: 'CSS / Tailwind', level: 88 },
    { name: 'WebGL / Three.js', level: 72 },
    { name: 'Testing (Vitest/RTL)', level: 85 },
  ]},
  { category: 'Backend', color: '#00d4ff', items: [
    { name: 'Node.js / Bun', level: 93 },
    { name: 'Python (FastAPI)', level: 88 },
    { name: 'Go', level: 75 },
    { name: 'GraphQL / REST', level: 91 },
    { name: 'PostgreSQL / Redis', level: 87 },
  ]},
  { category: 'Infrastructure', color: '#a855f7', items: [
    { name: 'AWS (Solutions Arch)', level: 85 },
    { name: 'Docker / Kubernetes', level: 82 },
    { name: 'CI/CD Pipelines', level: 88 },
    { name: 'Terraform / IaC', level: 76 },
    { name: 'Observability (OTel)', level: 80 },
  ]},
  { category: 'AI / ML', color: '#f72585', items: [
    { name: 'LLM Integration', level: 88 },
    { name: 'Vector DBs / RAG', level: 82 },
    { name: 'ML Ops Basics', level: 68 },
    { name: 'Python Data Stack', level: 74 },
  ]},
];

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Senior Software Engineer',
    company: 'Acme Corp',
    period: '2022 — Present',
    type: 'Full-time',
    color: '#00ff88',
    highlights: [
      'Led rewrite of core data pipeline processing 50M+ events/day — cut p99 latency 70%',
      'Architected multi-tenant SaaS platform serving 200+ enterprise clients',
      'Mentored 4 junior engineers; established team code-review culture',
      'Shipped AI-powered search feature that increased engagement by 38%',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Kafka', 'AWS'],
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'Velocity Labs',
    period: '2020 — 2022',
    type: 'Full-time',
    color: '#00d4ff',
    highlights: [
      'Built real-time collaboration engine (like Figma multiplayer) from scratch',
      'Reduced frontend bundle size by 45% through code-splitting & lazy loading',
      'Designed and shipped public REST + GraphQL API used by 1,000+ developers',
      'Led migration from REST to event-driven architecture using AWS EventBridge',
    ],
    stack: ['React', 'Go', 'Redis', 'GraphQL', 'Docker', 'GCP'],
  },
  {
    id: 3,
    role: 'Full Stack Developer',
    company: 'Startup Studio XYZ',
    period: '2018 — 2020',
    type: 'Full-time',
    color: '#a855f7',
    highlights: [
      'Built 6 MVPs across fintech, edtech, and healthtech verticals',
      'Sole engineer on 2 of those — owned everything from DB schema to deployment',
      'Established CI/CD with zero-downtime deploys using blue/green strategy',
      'Introduced automated testing culture; coverage went 0% → 78%',
    ],
    stack: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Heroku'],
  },
  {
    id: 4,
    role: 'Junior Web Developer',
    company: 'Digital Agency Co.',
    period: '2017 — 2018',
    type: 'Full-time',
    color: '#ffd60a',
    highlights: [
      'Built and maintained 20+ client websites',
      'First professional exposure to React — never looked back',
      'Learned the value of clean code the hard way (maintaining others\' spaghetti)',
    ],
    stack: ['JavaScript', 'PHP', 'WordPress', 'MySQL', 'jQuery'],
  },
];

export const PROJECTS = [
  {
    id: 1,
    name: 'NeuralDash',
    emoji: '🧠',
    tagline: 'AI-powered analytics for engineering teams',
    description: `Real-time dashboard that ingests GitHub, Jira, and deploy events
to surface engineering health metrics. Uses LLMs to generate weekly summaries
and flag anomalies before they become incidents.`,
    stack: ['Next.js', 'Python', 'ClickHouse', 'OpenAI API', 'Kafka'],
    highlights: ['500K+ events/day processed', 'Used by 40+ engineering teams', 'Sub-200ms dashboard loads'],
    color: '#00ff88',
    links: { github: '#', demo: '#' },
    status: 'Production',
  },
  {
    id: 2,
    name: 'QuantumChat',
    emoji: '🔐',
    tagline: 'E2E encrypted real-time messaging at scale',
    description: `WebSocket-based messaging platform with Signal Protocol E2E encryption.
Built a custom CRDT for offline-first message sync. Handles 10K concurrent connections
per node with horizontal scaling via Redis pub/sub.`,
    stack: ['React', 'Node.js', 'WebSockets', 'Redis', 'Signal Protocol'],
    highlights: ['10K concurrent users/node', 'Zero-knowledge architecture', '< 50ms message delivery'],
    color: '#00d4ff',
    links: { github: '#', demo: '#' },
    status: 'Open Source',
  },
  {
    id: 3,
    name: 'DevFlow',
    emoji: '⚡',
    tagline: 'Local-first developer productivity suite',
    description: `VSCode extension + CLI tool that unifies PR review, ticket lookup, and
deployment status in one command palette. Integrates with GitHub, Linear, and
your deploy platform. 2,000+ installs on the marketplace.`,
    stack: ['TypeScript', 'VSCode API', 'React', 'Node.js', 'Linear API'],
    highlights: ['2,000+ active installs', 'Saves ~30min/dev/day', '4.8★ on marketplace'],
    color: '#a855f7',
    links: { github: '#', demo: '#' },
    status: 'Published',
  },
  {
    id: 4,
    name: 'CloudOrch',
    emoji: '☁️',
    tagline: 'Kubernetes orchestration with a human interface',
    description: `Visual UI for K8s cluster management that non-DevOps engineers can
actually use. Drag-and-drop deployment scaling, resource visualization, and
one-click rollbacks. Built because I was tired of explaining kubectl to teammates.`,
    stack: ['React', 'Go', 'Kubernetes API', 'D3.js', 'Helm'],
    highlights: ['Supports 50+ node clusters', 'Visual dependency graphs', 'Featured on CNCF blog'],
    color: '#f72585',
    links: { github: '#', demo: '#' },
    status: 'Open Source',
  },
  {
    id: 5,
    name: 'FIKHRI.OS',
    emoji: '💻',
    tagline: 'This portfolio — a fake OS built in React',
    description: `You're looking at it. A fully interactive simulated operating system
with draggable windows, a working terminal, XP/achievement gamification,
easter eggs, and CRT effects. Because a boring PDF portfolio is a crime.`,
    stack: ['React', 'Framer Motion', 'Tailwind CSS', 'Web Audio API'],
    highlights: ['7 interactive windows', 'Achievement system', 'Matrix easter egg'],
    color: '#ffd60a',
    links: { github: '#', demo: '#' },
    status: 'You Are Here',
  },
];

export const CONTACT = {
  email: 'fikhri@example.com',
  github: 'github.com/fikhri',
  linkedin: 'linkedin.com/in/fikhri',
  twitter: '@fikhridev',
  availability: 'Open to senior / staff IC roles and technical co-founder conversations.',
};
