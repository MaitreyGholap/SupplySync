import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Clock } from 'lucide-react';

const config = {
  critical: { icon: AlertTriangle, color: 'var(--color-danger)', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)' },
  warning: { icon: AlertCircle, color: 'var(--color-warning)', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)' },
  info: { icon: Info, color: 'var(--color-accent)', bg: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.2)' },
};

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AlertCard({ alert, onMarkRead }) {
  const { icon: Icon, color, bg, border } = config[alert.severity] || config.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card"
      style={{
        padding: '20px',
        display: 'flex',
        gap: '16px',
        opacity: alert.isRead ? 0.6 : 1,
        borderLeft: alert.isRead ? undefined : `4px solid ${color}`,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: bg,
          border: `1px solid ${border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={20} style={{ color }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {alert.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            <Clock size={12} />
            {timeAgo(alert.timestamp)}
          </div>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
          {alert.description}
        </p>

        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            borderLeft: `2px solid var(--color-accent)`,
            fontSize: '13px',
            color: 'var(--color-text-primary)',
          }}
        >
          <span style={{ fontWeight: 600, color: 'var(--color-accent)', marginRight: '8px' }}>Recommendation:</span>
          {alert.recommendation}
        </div>
      </div>

      {!alert.isRead && (
        <button
          onClick={() => onMarkRead(alert.id)}
          title="Mark as Read"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-text-tertiary)',
            cursor: 'pointer',
            padding: '8px',
            alignSelf: 'flex-start',
            display: 'flex',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-success)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-tertiary)')}
        >
          <CheckCircle2 size={20} />
        </button>
      )}
    </motion.div>
  );
}
