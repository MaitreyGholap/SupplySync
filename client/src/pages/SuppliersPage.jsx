import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import SupplierCard from '../components/suppliers/SupplierCard';
import SearchInput from '../components/shared/SearchInput';
import Button from '../components/shared/Button';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function SuppliersPage() {
  const { data: suppliers, loading } = useFetch(api.getSuppliers);
  const [search, setSearch] = useState('');

  const filteredSuppliers = useMemo(() => {
    if (!suppliers) return [];
    return suppliers.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [suppliers, search]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search suppliers or locations..." />
        </div>
        <Button icon={Plus}>Add Supplier</Button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <LoadingSkeleton key={i} height="340px" rounded="16px" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}
        >
          {filteredSuppliers.map((supplier) => (
            <motion.div key={supplier.id} variants={itemVariants} style={{ height: '100%' }}>
              <SupplierCard supplier={supplier} />
            </motion.div>
          ))}
          {filteredSuppliers.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
              No suppliers found.
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
