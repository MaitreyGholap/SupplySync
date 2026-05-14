import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import Badge from '../shared/Badge';

const statusMap = {
  'in-stock': { variant: 'success', label: 'In Stock' },
  'low': { variant: 'warning', label: 'Low Stock' },
  'out': { variant: 'danger', label: 'Out of Stock' },
  'overstock': { variant: 'info', label: 'Overstock' },
};

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quantity</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '80px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {products.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>{product.sku}</div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                    {product.category}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                    <span style={{ fontWeight: 500 }}>{product.quantity}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginLeft: '6px' }}>
                      (Min: {product.minStock})
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <Badge variant={statusMap[product.status]?.variant || 'default'} dot>
                      {statusMap[product.status]?.label || product.status}
                    </Badge>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => onEdit(product)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: '4px' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: '4px' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {products.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
