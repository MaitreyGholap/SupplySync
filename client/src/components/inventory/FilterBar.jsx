import { Plus, Filter } from 'lucide-react';
import SearchInput from '../shared/SearchInput';
import Button from '../shared/Button';

export default function FilterBar({ search, setSearch, category, setCategory, categories, onAddClick }) {
  return (
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '300px' }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name or SKU..." />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Filter size={16} style={{ position: 'absolute', left: '12px', color: 'var(--color-text-tertiary)', pointerEvents: 'none' }} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-glass"
            style={{ paddingLeft: '36px', appearance: 'none', cursor: 'pointer', minWidth: '160px' }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <Button onClick={onAddClick} icon={Plus}>
        Add Product
      </Button>
    </div>
  );
}
