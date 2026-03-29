import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../data/portfolio';
import { useGame } from '../../context/GameContext';

function StatusBadge({ status }) {
  const colors = {
    'Production':  { bg: '#00ff8815', border: '#00ff8840', text: '#00ff88' },
    'Open Source': { bg: '#00d4ff15', border: '#00d4ff40', text: '#00d4ff' },
    'Published':   { bg: '#a855f715', border: '#a855f740', text: '#a855f7' },
    'You Are Here':{ bg: '#ffd60a15', border: '#ffd60a40', text: '#ffd60a' },
  };
  const c = colors[status] || colors['Production'];
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
    >
      {status}
    </span>
  );
}

function ProjectDetail({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="absolute inset-0 p-5 overflow-y-auto"
      style={{ background: 'rgba(8,8,16,0.98)', zIndex: 10 }}
    >
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-xs font-mono mb-5 transition-colors"
        style={{ color: '#4a7c59' }}
        onMouseEnter={e => e.currentTarget.style.color = '#00ff88'}
        onMouseLeave={e => e.currentTarget.style.color = '#4a7c59'}
      >
        ← back to projects
      </button>

      <div className="flex items-start gap-3 mb-4">
        <span className="text-4xl">{project.emoji}</span>
        <div>
          <h2 className="font-bold text-xl font-mono" style={{ color: project.color }}>
            {project.name}
          </h2>
          <div className="text-sm mt-1" style={{ color: '#a3e6c7' }}>{project.tagline}</div>
          <div className="mt-2"><StatusBadge status={project.status} /></div>
        </div>
      </div>

      <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${project.color}30, transparent)` }} />

      <div className="mb-4">
        <div className="text-xs font-mono mb-2" style={{ color: '#ffd60a' }}>// DESCRIPTION</div>
        <p className="text-sm leading-7 font-mono" style={{ color: '#a3e6c7' }}>
          {project.description}
        </p>
      </div>

      <div className="mb-4">
        <div className="text-xs font-mono mb-2" style={{ color: '#ffd60a' }}>// HIGHLIGHTS</div>
        <ul className="space-y-1">
          {project.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-sm font-mono"
              style={{ color: '#a3e6c7' }}
            >
              <span style={{ color: project.color }}>▶</span>
              {h}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mb-5">
        <div className="text-xs font-mono mb-2" style={{ color: '#ffd60a' }}>// TECH STACK</div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-1 rounded"
              style={{
                background: `${project.color}10`,
                border: `1px solid ${project.color}30`,
                color: project.color,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <a
          href={project.links.github}
          className="text-xs font-mono px-4 py-2 rounded transition-all"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid #ffffff20',
            color: '#a3e6c7',
          }}
          onClick={e => e.preventDefault()}
        >
          ⬡ GitHub →
        </a>
        <a
          href={project.links.demo}
          className="text-xs font-mono px-4 py-2 rounded transition-all"
          style={{
            background: `${project.color}10`,
            border: `1px solid ${project.color}30`,
            color: project.color,
          }}
          onClick={e => e.preventDefault()}
        >
          ▶ Live Demo →
        </a>
      </div>
    </motion.div>
  );
}

export default function ProjectsWindow() {
  const [selected, setSelected] = useState(null);
  const { viewProject } = useGame();

  const handleSelect = (project) => {
    setSelected(project);
    viewProject(project.id);
  };

  return (
    <div className="relative h-full">
      {/* Project grid */}
      <div className="scroll-area grid grid-cols-1 gap-3" style={{ paddingBottom: 20 }}>
        <div className="font-mono text-xs mb-1" style={{ color: '#ffd60a' }}>
          $ ls ./projects/ — {PROJECTS.length} items found
        </div>

        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => handleSelect(project)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{project.emoji}</span>
                <div>
                  <div className="font-bold text-sm font-mono" style={{ color: project.color }}>
                    {project.name}
                  </div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: '#4a7c59' }}>
                    {project.tagline}
                  </div>
                </div>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {project.stack.slice(0, 4).map(tech => (
                <span
                  key={tech}
                  className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{ background: '#ffffff08', color: '#4a7c59', border: '1px solid #ffffff10' }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-xs font-mono" style={{ color: '#4a7c59' }}>
                  +{project.stack.length - 4} more
                </span>
              )}
            </div>

            <div className="mt-2 text-xs font-mono" style={{ color: '#4a7c59' }}>
              Click to expand →
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail overlay */}
      <AnimatePresence>
        {selected && (
          <ProjectDetail project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
