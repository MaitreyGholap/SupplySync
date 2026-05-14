import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ icon: Icon, label, value, prefix = '', suffix = '', trend, trendLabel, color = 'var(--color-accent)' }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseFloat(value) || 0;
    if (target === 0) { setDisplayed(0); return; }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayed(target);
    }

    requestAnimationFrame(animate);
  }, [value]);

  const isPositive = trend > 0;

  const formatValue = (val) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  return (
    <div className="glass-card glass-card-interactive" style={{ padding: '22px 24px' }} ref={ref}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        {trend !== undefined && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 500,
              color: isPositive ? 'var(--color-success)' : 'var(--color-danger)',
            }}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: '30px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontFeatureSettings: '"tnum"',
          marginBottom: '4px',
        }}
      >
        {prefix}{formatValue(displayed)}{suffix}
      </div>

      <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
        {label}
        {trendLabel && (
          <span style={{ color: 'var(--color-text-tertiary)', marginLeft: '6px' }}>{trendLabel}</span>
        )}
      </div>
    </div>
  );
}
