import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '../../data/portfolio';

const CONTACT_ITEMS = [
  {
    icon: '📧',
    label: 'Email',
    value: CONTACT.email,
    hint: 'Best for detailed conversations',
    color: '#00ff88',
    action: () => {},
  },
  {
    icon: '⬡',
    label: 'GitHub',
    value: CONTACT.github,
    hint: 'See the actual code',
    color: '#a3e6c7',
    action: () => {},
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: CONTACT.linkedin,
    hint: 'Professional background',
    color: '#00d4ff',
    action: () => {},
  },
  {
    icon: '🐦',
    label: 'Twitter / X',
    value: CONTACT.twitter,
    hint: 'Thoughts on tech & code',
    color: '#a855f7',
    action: () => {},
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="text-xs font-mono px-2 py-1 rounded transition-all opacity-0 group-hover:opacity-100"
      style={{
        background: copied ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.05)',
        border: copied ? '1px solid #00ff8840' : '1px solid #ffffff15',
        color: copied ? '#00ff88' : '#4a7c59',
      }}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function TerminalMessage() {
  const [phase, setPhase] = useState(0);
  const messages = [
    { text: '> Initiating contact protocol...', color: '#4a7c59' },
    { text: '> Loading availability data...', color: '#4a7c59' },
    { text: '> Status: OPEN TO OPPORTUNITIES ✓', color: '#00ff88' },
    { text: `> ${CONTACT.availability}`, color: '#a3e6c7' },
  ];

  return (
    <div className="p-4 rounded font-mono text-xs space-y-1" style={{ background: '#0d1117', border: '1px solid #00ff8820' }}>
      {messages.slice(0, phase + 1).map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span style={{ color: msg.color }}>{msg.text}</span>
          {i === phase && phase < messages.length - 1 && (
            <span className="terminal-cursor ml-1" />
          )}
        </motion.div>
      ))}
      {phase < messages.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs"
          style={{ color: '#4a7c59' }}
          onClick={() => setPhase(p => Math.min(p + 1, messages.length - 1))}
        >
          [ENTER to continue...]
        </motion.button>
      )}
    </div>
  );
}

export default function ContactWindow() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  return (
    <div className="scroll-area">
      <div className="font-mono text-xs mb-4" style={{ color: '#ffd60a' }}>
        // CONTACT.SH — Let's build something together
      </div>

      {/* Status terminal */}
      <div className="mb-5">
        <TerminalMessage />
      </div>

      {/* Contact links */}
      <div className="space-y-2 mb-6">
        {CONTACT_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center gap-3 p-3 rounded cursor-pointer transition-all"
            style={{
              background: hoveredIndex === i ? `${item.color}08` : 'rgba(0,0,0,0.2)',
              border: hoveredIndex === i ? `1px solid ${item.color}30` : '1px solid #ffffff08',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <div className="text-xs font-mono font-bold" style={{ color: item.color }}>
                {item.label}
              </div>
              <div className="text-sm font-mono" style={{ color: '#a3e6c7' }}>
                {item.value}
              </div>
              <div className="text-xs font-mono" style={{ color: '#4a7c59' }}>
                {item.hint}
              </div>
            </div>
            <CopyButton text={item.value} />
          </motion.div>
        ))}
      </div>

      {/* Quick message form */}
      <div className="mb-2">
        <div className="font-mono text-xs mb-3" style={{ color: '#ffd60a' }}>
          // QUICK_MESSAGE.SH
        </div>

        <AnimatePresence mode="wait">
          {!messageSent ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[
                { key: 'name', placeholder: 'Your name', type: 'text' },
                { key: 'email', placeholder: 'your@email.com', type: 'email' },
              ].map(field => (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={`> ${field.placeholder}`}
                  value={formData[field.key]}
                  onChange={e => setFormData(d => ({ ...d, [field.key]: e.target.value }))}
                  className="w-full font-mono text-sm px-3 py-2 rounded outline-none transition-all"
                  style={{
                    background: '#0d1117',
                    border: '1px solid #00ff8820',
                    color: '#a3e6c7',
                    caretColor: '#00ff88',
                  }}
                  onFocus={e => e.target.style.border = '1px solid #00ff8860'}
                  onBlur={e => e.target.style.border = '1px solid #00ff8820'}
                />
              ))}
              <textarea
                placeholder="> What's on your mind?"
                value={formData.message}
                onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                rows={3}
                className="w-full font-mono text-sm px-3 py-2 rounded outline-none transition-all resize-none"
                style={{
                  background: '#0d1117',
                  border: '1px solid #00ff8820',
                  color: '#a3e6c7',
                  caretColor: '#00ff88',
                }}
                onFocus={e => e.target.style.border = '1px solid #00ff8860'}
                onBlur={e => e.target.style.border = '1px solid #00ff8820'}
              />
              <motion.button
                type="submit"
                className="w-full font-mono text-sm py-2 rounded transition-all"
                style={{
                  background: 'rgba(0,255,136,0.1)',
                  border: '1px solid #00ff8840',
                  color: '#00ff88',
                }}
                whileHover={{ background: 'rgba(0,255,136,0.18)' }}
                whileTap={{ scale: 0.98 }}
              >
                [ SEND MESSAGE → ]
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded text-center font-mono"
              style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid #00ff8830' }}
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm" style={{ color: '#00ff88' }}>Message queued successfully!</div>
              <div className="text-xs mt-1" style={{ color: '#4a7c59' }}>
                (This is a demo — use the email address above to actually reach out!)
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
