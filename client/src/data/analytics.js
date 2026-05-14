export const monthlyTrends = {
  labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  inbound:  [4200, 3800, 5100, 4600, 5300, 4900, 3200, 4800, 5500, 6100, 5800, 6400],
  outbound: [3900, 4100, 4700, 4400, 5000, 5200, 4500, 4600, 5100, 5600, 5400, 5900],
  stockLevel: [12500, 12200, 12600, 12800, 13100, 12800, 11500, 11700, 12100, 12600, 13000, 13500],
};

export const categoryBreakdown = [
  { category: 'Electronics', value: 28, color: '#6366f1' },
  { category: 'Raw Materials', value: 22, color: '#8b5cf6' },
  { category: 'Packaging', value: 18, color: '#06b6d4' },
  { category: 'Chemicals', value: 15, color: '#10b981' },
  { category: 'Textiles', value: 10, color: '#f59e0b' },
  { category: 'Food & Beverage', value: 7, color: '#ef4444' },
];

export const demandForecast = {
  labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  actual:    [4500, 4600, 5100, 5600, 5400, 5900, null, null, null, null, null, null],
  predicted: [4400, 4700, 5000, 5500, 5500, 5800, 6200, 6500, 6100, 5800, 6300, 6700],
};

export const topMovingProducts = [
  { name: 'PCB Control Board v3', velocity: 95, category: 'Electronics' },
  { name: 'Corrugated Box 18x12x8', velocity: 92, category: 'Packaging' },
  { name: 'Anti-Static ESD Bag', velocity: 88, category: 'Packaging' },
  { name: 'Polypropylene Granules', velocity: 85, category: 'Raw Materials' },
  { name: 'Isopropyl Alcohol 99%', velocity: 82, category: 'Chemicals' },
  { name: 'Stainless Steel Rod 12mm', velocity: 78, category: 'Raw Materials' },
  { name: 'Power Relay Module', velocity: 75, category: 'Electronics' },
  { name: 'BLDC Motor Controller', velocity: 72, category: 'Electronics' },
  { name: 'Nylon Fabric Roll 1.5m', velocity: 68, category: 'Textiles' },
  { name: 'Sodium Benzoate', velocity: 64, category: 'Food & Beverage' },
];

export const turnoverByCategory = {
  labels: ['Electronics', 'Raw Materials', 'Packaging', 'Chemicals', 'Textiles', 'Food & Beverage'],
  rates: [5.2, 4.1, 7.8, 4.5, 3.2, 6.1],
};

export const operationalKPIs = {
  fillRate: 94.2,
  stockoutFrequency: 3,
  avgLeadTime: 4.8,
  inventoryAccuracy: 97.5,
  orderFulfillment: 91.8,
  warehouseUtilization: 78.3,
};
