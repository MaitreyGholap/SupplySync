import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import AlertCard from '../components/alerts/AlertCard';
import KPICard from '../components/dashboard/KPICard';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';

const filters = [
  { id: 'all', label: 'All Alerts' },
  { id: 'critical', label: 'Critical', color: 'var(--color-danger)' },
  { id: 'warning', label: 'Warnings', color: 'var(--color-warning)' },
  { id: 'info', label: 'Information', color: 'var(--color-accent)' },
];

export default function AlertsPage() {
  const { data: alerts, loading, refetch } = useFetch(api.getAlerts);
  const [filter, setFilter] = useState('all');

  const stats = useMemo(() => {
    if (!alerts) return { critical: 0, warning: 0, info: 0, unread: 0 };
    return {
      critical: alerts.filter((a) => a.severity === 'critical' && !a.isRead).length,
      warning: alerts.filter((a) => a.severity === 'warning' && !a.isRead).length,
      info: alerts.filter((a) => (a.severity === 'info' || a.severity === 'demand' || a.severity === 'efficiency') && !a.isRead).length,
      unread: alerts.filter((a) => !a.isRead).length,
    };
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    if (!alerts) return [];
    let filtered = [...alerts];
    if (filter === 'critical') filtered = filtered.filter((a) => a.severity === 'critical');
    if (filter === 'warning') filtered = filtered.filter((a) => a.severity === 'warning');
    if (filter === 'info') filtered = filtered.filter((a) => ['info', 'demand', 'efficiency'].includes(a.severity));
    
    // Sort unread first, then by timestamp
    return filtered.sort((a, b) => {
      if (a.isRead === b.isRead) return new Date(b.timestamp) - new Date(a.timestamp);
      return a.isRead ? 1 : -1;
    });
  }, [alerts, filter]);

  const handleMarkRead = async (id) => {
    await api.markAlertRead(id);
    refetch();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {loading ? (
          <>
            <LoadingSkeleton height="120px" rounded="16px" />
            <LoadingSkeleton height="120px" rounded="16px" />
            <LoadingSkeleton height="120px" rounded="16px" />
            <LoadingSkeleton height="120px" rounded="16px" />
          </>
        ) : (
          <>
            <KPICard icon={ShieldAlert} label="Total Unread" value={stats.unread} color="var(--color-text-primary)" />
            <KPICard icon={AlertTriangle} label="Action Required" value={stats.critical} color="var(--color-danger)" />
            <KPICard icon={AlertCircle} label="Warnings" value={stats.warning} color="var(--color-warning)" />
            <KPICard icon={Info} label="Information" value={stats.info} color="var(--color-accent)" />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                background: filter === f.id ? (f.color ? `${f.color}15` : 'rgba(255,255,255,0.08)') : 'transparent',
                border: `1px solid ${filter === f.id ? (f.color ? `${f.color}40` : 'rgba(255,255,255,0.1)') : 'transparent'}`,
                color: filter === f.id ? (f.color || 'white') : 'var(--color-text-secondary)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <>
              <LoadingSkeleton height="140px" rounded="16px" />
              <LoadingSkeleton height="140px" rounded="16px" />
              <LoadingSkeleton height="140px" rounded="16px" />
            </>
          ) : (
            <AnimatePresence>
              {filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onMarkRead={handleMarkRead} />
              ))}
              {filteredAlerts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-tertiary)' }}
                >
                  No alerts found for this filter.
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
