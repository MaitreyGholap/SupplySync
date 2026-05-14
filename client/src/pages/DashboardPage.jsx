import { motion } from 'framer-motion';
import { Package, AlertTriangle, ArrowDownToLine, IndianRupee } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import KPICard from '../components/dashboard/KPICard';
import InventoryTrendChart from '../components/dashboard/InventoryTrendChart';
import CategoryDonut from '../components/dashboard/CategoryDonut';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import TopMovingProducts from '../components/dashboard/TopMovingProducts';
import SupplierMini from '../components/dashboard/SupplierMini';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function DashboardPage() {
  const { data, loading, error } = useFetch(api.getDashboard);
  const { data: suppliers } = useFetch(api.getSuppliers);

  if (error) {
    return (
      <div style={{ color: 'var(--color-danger)', padding: '20px' }}>
        Failed to load dashboard: {error}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      {/* KPI Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={i} height="130px" rounded="16px" />
            ))}
          </>
        ) : (
          <>
            <motion.div variants={itemVariants}>
              <KPICard
                icon={Package}
                label="Total Products"
                value={data?.totalProducts}
                color="var(--color-accent)"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <KPICard
                icon={AlertTriangle}
                label="Low Stock Items"
                value={data?.lowStock}
                trend={12}
                trendLabel="vs last month"
                color="var(--color-warning)"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <KPICard
                icon={ArrowDownToLine}
                label="Overstock Items"
                value={data?.overstock}
                trend={-5}
                trendLabel="vs last month"
                color="var(--color-danger)"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <KPICard
                icon={IndianRupee}
                label="Total Inventory Value"
                value={data?.totalValue}
                prefix="₹"
                trend={8}
                trendLabel="vs last month"
                color="var(--color-success)"
              />
            </motion.div>
          </>
        )}
      </div>

      {/* Row 2: Trend Chart + Alerts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 2' }}>
          {loading ? (
            <LoadingSkeleton height="360px" rounded="16px" />
          ) : (
            <InventoryTrendChart data={data?.monthlyTrends} />
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          {loading ? (
            <LoadingSkeleton height="360px" rounded="16px" />
          ) : (
            <RecentAlerts alerts={data?.recentAlerts} />
          )}
        </motion.div>
      </div>

      {/* Row 3: Category Donut + Top Moving + Suppliers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        <motion.div variants={itemVariants}>
          {loading ? (
            <LoadingSkeleton height="320px" rounded="16px" />
          ) : (
            <CategoryDonut data={data?.categoryBreakdown} />
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          {loading ? (
            <LoadingSkeleton height="320px" rounded="16px" />
          ) : (
            <TopMovingProducts data={data?.topMoving} />
          )}
        </motion.div>
        <motion.div variants={itemVariants}>
          {loading ? (
            <LoadingSkeleton height="320px" rounded="16px" />
          ) : (
            <SupplierMini suppliers={suppliers} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
