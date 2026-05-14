import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail, Clock, Package } from 'lucide-react';
import Badge from '../shared/Badge';

export default function SupplierCard({ supplier }) {
  const statusColors = {
    active: 'success',
    warning: 'warning',
    inactive: 'danger',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{supplier.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
            <MapPin size={14} />
            {supplier.location}
          </div>
        </div>
        <Badge variant={statusColors[supplier.status]}>{supplier.status}</Badge>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            {supplier.rating} <Star size={16} fill="currentColor" />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Rating</div>
        </div>
        <div style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: supplier.deliveryReliability > 90 ? 'var(--color-success)' : 'var(--color-warning)' }}>
            {supplier.deliveryReliability}%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>Reliability</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={14} />
          </div>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{supplier.email}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={14} />
          </div>
          <span>{supplier.phone}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={14} />
          </div>
          <span>{supplier.avgLeadDays} Days Avg Lead</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={14} />
          </div>
          <span>{supplier.productsSupplied} Products Supplied</span>
        </div>
      </div>

      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          {supplier.onTimeDelivery} / {supplier.totalOrders} On-Time
        </div>
        <button style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          View Details
        </button>
      </div>
    </motion.div>
  );
}
