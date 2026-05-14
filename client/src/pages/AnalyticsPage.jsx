import { motion } from 'framer-motion';
import { Target, AlertOctagon, Clock, Percent, Warehouse, Truck } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import KPICard from '../components/dashboard/KPICard';
import DemandTrendChart from '../components/analytics/DemandTrendChart';
import TurnoverChart from '../components/analytics/TurnoverChart';
import MonthlyMovement from '../components/analytics/MonthlyMovement';
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

export default function AnalyticsPage() {
  const { data, loading } = useFetch(api.getAnalytics);

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => <LoadingSkeleton key={i} height="120px" rounded="16px" />)}
        <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
           <LoadingSkeleton height="350px" rounded="16px" />
           <LoadingSkeleton height="350px" rounded="16px" />
           <LoadingSkeleton height="350px" rounded="16px" style={{ gridColumn: '1 / -1' }} />
        </div>
      </div>
    );
  }

  const { operationalKPIs } = data;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Operational KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <motion.div variants={itemVariants}>
          <KPICard icon={Target} label="Fill Rate" value={operationalKPIs.fillRate} suffix="%" color="#10b981" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard icon={AlertOctagon} label="Stockout Frequency" value={operationalKPIs.stockoutFrequency} suffix="/mo" color="#f59e0b" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard icon={Clock} label="Avg Lead Time" value={operationalKPIs.avgLeadTime} suffix=" Days" color="#6366f1" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard icon={Percent} label="Inventory Accuracy" value={operationalKPIs.inventoryAccuracy} suffix="%" color="#8b5cf6" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard icon={Warehouse} label="Warehouse Utilization" value={operationalKPIs.warehouseUtilization} suffix="%" color="#06b6d4" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <KPICard icon={Truck} label="Order Fulfillment" value={operationalKPIs.orderFulfillment} suffix="%" color="#ec4899" />
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <motion.div variants={itemVariants}>
          <DemandTrendChart data={data.demandForecast} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TurnoverChart data={data.turnoverByCategory} />
        </motion.div>
        <motion.div variants={itemVariants} style={{ gridColumn: '1 / -1' }}>
          <MonthlyMovement data={data.monthlyTrends} />
        </motion.div>
      </div>
    </motion.div>
  );
}
