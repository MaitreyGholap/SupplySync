import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import SearchInput from '../shared/SearchInput';
import { useState } from 'react';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/inventory': 'Inventory Management',
  '/suppliers': 'Supplier Management',
  '/analytics': 'Analytics',
  '/alerts': 'Alerts & Recommendations',
};

export default function TopBar() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const title = pageTitles[location.pathname] || 'SupplySync';

  return (
    <header
      style={{
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <h1 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search anything..." />

        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
        >
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--color-danger)',
            }}
          />
        </button>
      </div>
    </header>
  );
}
