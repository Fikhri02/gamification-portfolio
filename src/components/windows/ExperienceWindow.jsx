import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE } from '../../data/portfolio';

function ExperienceCard({ job, index, isActive, onClick }) {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <div
        className="timeline-dot"
        style={{ borderColor: job.color, boxShadow: `0 0 8px ${job.color}60` }}
      />

      <div
        className="p-4 rounded-lg cursor-pointer transition-all"
        style={{
          background: isActive ? `${job.color}08` : 'rgba(0,0,0,0.2)',
          border: isActive ? `1px solid ${job.color}35` : '1px solid #ffffff08',
        }}
        onClick={onClick}
      >
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-sm font-mono" style={{ color: isActive ? job.color : '#a3e6c7' }}>
              {job.role}
            </h3>
            <div className="text-xs font-mono mt-0.5" style={{ color: job.color }}>
              @ {job.company}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono" style={{ color: '#4a7c59' }}>{job.period}</div>
            <div className="text-xs font-mono" style={{ color: '#4a7c59' }}>{job.type}</div>
          </div>
        </div>

        {/* Expandable highlights */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <ul className="space-y-1.5 mb-3">
                {job.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2 text-xs font-mono"
                    style={{ color: '#a3e6c7' }}
                  >
                    <span style={{ color: job.color, flexShrink: 0 }}>▶</span>
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {job.stack.map(tech => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{
                      background: `${job.color}10`,
                      border: `1px solid ${job.color}25`,
                      color: job.color,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isActive && (
          <div className="mt-2 text-xs font-mono" style={{ color: '#4a7c59' }}>
            Click to expand ↓
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ExperienceWindow() {
  const [activeId, setActiveId] = useState(1); // First job expanded by default

  const totalYears = new Date().getFullYear() - 2017;

  return (
    <div className="scroll-area">
      {/* Header stats */}
      <div className="flex gap-3 mb-5">
        {[
          { label: 'Years Exp.', value: `${totalYears}+`, color: '#00ff88' },
          { label: 'Companies',  value: EXPERIENCE.length, color: '#00d4ff' },
          { label: 'Roles',      value: EXPERIENCE.length, color: '#a855f7' },
        ].map(stat => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 p-3 rounded text-center"
            style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
          >
            <div className="text-xl font-bold font-mono" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs font-mono" style={{ color: '#4a7c59' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="font-mono text-xs mb-4" style={{ color: '#ffd60a' }}>
        // EXPERIENCE.LOG — Click any entry to expand
      </div>

      {/* Timeline */}
      {EXPERIENCE.map((job, i) => (
        <ExperienceCard
          key={job.id}
          job={job}
          index={i}
          isActive={activeId === job.id}
          onClick={() => setActiveId(activeId === job.id ? null : job.id)}
        />
      ))}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="font-mono text-xs p-3 rounded mt-2"
        style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid #00ff8815', color: '#4a7c59' }}
      >
        🎓 CS degree + self-taught. Started with jQuery, survived the framework wars, still here.
      </motion.div>
    </div>
  );
}
