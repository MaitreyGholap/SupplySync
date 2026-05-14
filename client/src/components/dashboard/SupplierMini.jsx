import { Star } from 'lucide-react';
import Badge from '../shared/Badge';

export default function SupplierMini({ suppliers }) {
  if (!suppliers || suppliers.length === 0) return null;

  // Take top 5 suppliers
  const topSuppliers = [...suppliers].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="glass-card" style={{ padding: '20px 24px', height: '100%' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Top Suppliers</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {topSuppliers.map((supplier) => (
          <div key={supplier.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>{supplier.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#fbbf24' }}>
                <Star size={12} fill="currentColor" />
                {supplier.rating}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: supplier.deliveryReliability > 90 ? 'var(--color-success)' : supplier.deliveryReliability > 75 ? 'var(--color-warning)' : 'var(--color-danger)',
                    width: `${supplier.deliveryReliability}%`,
                    borderRadius: '3px',
                  }}
                />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', width: '28px', textAlign: 'right' }}>
                {supplier.deliveryReliability}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
