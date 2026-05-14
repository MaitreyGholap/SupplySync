const categories = ['Electronics', 'Raw Materials', 'Packaging', 'Chemicals', 'Textiles', 'Food & Beverage'];
const warehouses = ['Warehouse A - Mumbai', 'Warehouse B - Delhi', 'Warehouse C - Bangalore', 'Warehouse D - Chennai'];

function getStatus(qty, min, max) {
  if (qty === 0) return 'out';
  if (qty <= min) return 'low';
  if (qty >= max * 0.9) return 'overstock';
  return 'in-stock';
}

const rawProducts = [
  { name: 'Industrial Servo Motor', sku: 'ELEC-001', category: 'Electronics', quantity: 12, minStock: 20, maxStock: 200, price: 4500, warehouse: 0, supplierId: 1, lastRestocked: '2026-04-28' },
  { name: 'PCB Control Board v3', sku: 'ELEC-002', category: 'Electronics', quantity: 85, minStock: 30, maxStock: 300, price: 1200, warehouse: 1, supplierId: 1, lastRestocked: '2026-05-02' },
  { name: 'LED Display Panel 7"', sku: 'ELEC-003', category: 'Electronics', quantity: 290, minStock: 50, maxStock: 300, price: 3200, warehouse: 0, supplierId: 2, lastRestocked: '2026-04-15' },
  { name: 'Copper Winding Coil', sku: 'ELEC-004', category: 'Electronics', quantity: 45, minStock: 40, maxStock: 400, price: 780, warehouse: 2, supplierId: 3, lastRestocked: '2026-05-05' },
  { name: 'Thermal Sensor Array', sku: 'ELEC-005', category: 'Electronics', quantity: 0, minStock: 15, maxStock: 150, price: 2100, warehouse: 1, supplierId: 2, lastRestocked: '2026-03-20' },
  { name: 'BLDC Motor Controller', sku: 'ELEC-006', category: 'Electronics', quantity: 68, minStock: 25, maxStock: 250, price: 3800, warehouse: 0, supplierId: 1, lastRestocked: '2026-04-30' },
  { name: 'Power Relay Module', sku: 'ELEC-007', category: 'Electronics', quantity: 150, minStock: 50, maxStock: 500, price: 450, warehouse: 3, supplierId: 4, lastRestocked: '2026-05-08' },
  { name: 'Signal Amplifier IC', sku: 'ELEC-008', category: 'Electronics', quantity: 500, minStock: 100, maxStock: 520, price: 120, warehouse: 2, supplierId: 5, lastRestocked: '2026-05-01' },

  { name: 'Cold Rolled Steel Sheet', sku: 'RAW-001', category: 'Raw Materials', quantity: 8, minStock: 50, maxStock: 500, price: 8500, warehouse: 0, supplierId: 6, lastRestocked: '2026-04-10' },
  { name: 'Aluminium Alloy Ingot', sku: 'RAW-002', category: 'Raw Materials', quantity: 120, minStock: 30, maxStock: 300, price: 6200, warehouse: 1, supplierId: 6, lastRestocked: '2026-05-03' },
  { name: 'Polypropylene Granules', sku: 'RAW-003', category: 'Raw Materials', quantity: 340, minStock: 100, maxStock: 400, price: 220, warehouse: 2, supplierId: 7, lastRestocked: '2026-04-25' },
  { name: 'Carbon Fiber Composite', sku: 'RAW-004', category: 'Raw Materials', quantity: 25, minStock: 20, maxStock: 200, price: 15000, warehouse: 0, supplierId: 8, lastRestocked: '2026-05-07' },
  { name: 'Stainless Steel Rod 12mm', sku: 'RAW-005', category: 'Raw Materials', quantity: 200, minStock: 60, maxStock: 600, price: 950, warehouse: 3, supplierId: 6, lastRestocked: '2026-04-18' },
  { name: 'Copper Sheet 2mm', sku: 'RAW-006', category: 'Raw Materials', quantity: 0, minStock: 40, maxStock: 400, price: 4800, warehouse: 1, supplierId: 8, lastRestocked: '2026-03-15' },
  { name: 'Rubber Gasket Material', sku: 'RAW-007', category: 'Raw Materials', quantity: 550, minStock: 80, maxStock: 600, price: 350, warehouse: 2, supplierId: 7, lastRestocked: '2026-05-09' },
  { name: 'Titanium Alloy Bar', sku: 'RAW-008', category: 'Raw Materials', quantity: 15, minStock: 10, maxStock: 100, price: 22000, warehouse: 0, supplierId: 8, lastRestocked: '2026-04-22' },

  { name: 'Corrugated Box 18x12x8', sku: 'PKG-001', category: 'Packaging', quantity: 2500, minStock: 500, maxStock: 5000, price: 28, warehouse: 3, supplierId: 9, lastRestocked: '2026-05-10' },
  { name: 'Bubble Wrap Roll 100m', sku: 'PKG-002', category: 'Packaging', quantity: 80, minStock: 30, maxStock: 200, price: 650, warehouse: 2, supplierId: 9, lastRestocked: '2026-04-29' },
  { name: 'Shrink Film 500mm', sku: 'PKG-003', category: 'Packaging', quantity: 4800, minStock: 200, maxStock: 5000, price: 180, warehouse: 1, supplierId: 9, lastRestocked: '2026-05-06' },
  { name: 'Pallet Stretch Wrap', sku: 'PKG-004', category: 'Packaging', quantity: 15, minStock: 20, maxStock: 150, price: 420, warehouse: 0, supplierId: 10, lastRestocked: '2026-04-12' },
  { name: 'Anti-Static ESD Bag', sku: 'PKG-005', category: 'Packaging', quantity: 1200, minStock: 300, maxStock: 3000, price: 12, warehouse: 3, supplierId: 10, lastRestocked: '2026-05-04' },
  { name: 'Foam Insert Custom', sku: 'PKG-006', category: 'Packaging', quantity: 350, minStock: 100, maxStock: 1000, price: 85, warehouse: 2, supplierId: 9, lastRestocked: '2026-04-20' },
  { name: 'Thermal Insulated Box', sku: 'PKG-007', category: 'Packaging', quantity: 60, minStock: 25, maxStock: 250, price: 320, warehouse: 1, supplierId: 10, lastRestocked: '2026-05-01' },
  { name: 'Wooden Crate Heavy Duty', sku: 'PKG-008', category: 'Packaging', quantity: 22, minStock: 15, maxStock: 100, price: 1800, warehouse: 0, supplierId: 10, lastRestocked: '2026-04-08' },

  { name: 'Isopropyl Alcohol 99%', sku: 'CHEM-001', category: 'Chemicals', quantity: 180, minStock: 50, maxStock: 500, price: 520, warehouse: 2, supplierId: 3, lastRestocked: '2026-05-08' },
  { name: 'Epoxy Resin Hardener', sku: 'CHEM-002', category: 'Chemicals', quantity: 30, minStock: 20, maxStock: 200, price: 1800, warehouse: 0, supplierId: 4, lastRestocked: '2026-04-26' },
  { name: 'Flux Soldering Paste', sku: 'CHEM-003', category: 'Chemicals', quantity: 5, minStock: 15, maxStock: 100, price: 950, warehouse: 1, supplierId: 3, lastRestocked: '2026-03-30' },
  { name: 'Silicone Sealant Industrial', sku: 'CHEM-004', category: 'Chemicals', quantity: 92, minStock: 30, maxStock: 300, price: 680, warehouse: 3, supplierId: 4, lastRestocked: '2026-05-05' },
  { name: 'Acetone Technical Grade', sku: 'CHEM-005', category: 'Chemicals', quantity: 0, minStock: 25, maxStock: 250, price: 380, warehouse: 2, supplierId: 3, lastRestocked: '2026-03-10' },
  { name: 'Polyurethane Coating', sku: 'CHEM-006', category: 'Chemicals', quantity: 45, minStock: 20, maxStock: 200, price: 2200, warehouse: 0, supplierId: 5, lastRestocked: '2026-04-19' },
  { name: 'Thermal Paste Compound', sku: 'CHEM-007', category: 'Chemicals', quantity: 220, minStock: 40, maxStock: 250, price: 150, warehouse: 1, supplierId: 5, lastRestocked: '2026-05-09' },
  { name: 'Cleaning Solvent Degreaser', sku: 'CHEM-008', category: 'Chemicals', quantity: 300, minStock: 60, maxStock: 310, price: 420, warehouse: 3, supplierId: 4, lastRestocked: '2026-05-02' },

  { name: 'Nylon Fabric Roll 1.5m', sku: 'TEX-001', category: 'Textiles', quantity: 75, minStock: 30, maxStock: 300, price: 1100, warehouse: 2, supplierId: 7, lastRestocked: '2026-04-28' },
  { name: 'Polyester Mesh Filter', sku: 'TEX-002', category: 'Textiles', quantity: 10, minStock: 20, maxStock: 150, price: 450, warehouse: 1, supplierId: 7, lastRestocked: '2026-04-05' },
  { name: 'Carbon Fiber Cloth', sku: 'TEX-003', category: 'Textiles', quantity: 40, minStock: 15, maxStock: 100, price: 8500, warehouse: 0, supplierId: 8, lastRestocked: '2026-05-06' },
  { name: 'Heat Resistant Sleeve', sku: 'TEX-004', category: 'Textiles', quantity: 600, minStock: 100, maxStock: 600, price: 280, warehouse: 3, supplierId: 7, lastRestocked: '2026-05-10' },
  { name: 'Kevlar Webbing 50mm', sku: 'TEX-005', category: 'Textiles', quantity: 25, minStock: 10, maxStock: 80, price: 3200, warehouse: 2, supplierId: 8, lastRestocked: '2026-04-15' },
  { name: 'Glass Fiber Tape', sku: 'TEX-006', category: 'Textiles', quantity: 160, minStock: 40, maxStock: 400, price: 520, warehouse: 1, supplierId: 7, lastRestocked: '2026-05-03' },
  { name: 'PTFE Thread Seal Tape', sku: 'TEX-007', category: 'Textiles', quantity: 800, minStock: 200, maxStock: 900, price: 65, warehouse: 0, supplierId: 10, lastRestocked: '2026-05-07' },
  { name: 'Velcro Strap Industrial', sku: 'TEX-008', category: 'Textiles', quantity: 1200, minStock: 300, maxStock: 1200, price: 35, warehouse: 3, supplierId: 10, lastRestocked: '2026-05-11' },

  { name: 'Food Grade Lubricant', sku: 'FNB-001', category: 'Food & Beverage', quantity: 55, minStock: 20, maxStock: 200, price: 1600, warehouse: 2, supplierId: 5, lastRestocked: '2026-05-01' },
  { name: 'Citric Acid Powder', sku: 'FNB-002', category: 'Food & Beverage', quantity: 18, minStock: 25, maxStock: 250, price: 340, warehouse: 1, supplierId: 4, lastRestocked: '2026-04-18' },
  { name: 'Sodium Benzoate', sku: 'FNB-003', category: 'Food & Beverage', quantity: 90, minStock: 30, maxStock: 300, price: 280, warehouse: 3, supplierId: 4, lastRestocked: '2026-05-04' },
  { name: 'Maltodextrin Bulk', sku: 'FNB-004', category: 'Food & Beverage', quantity: 400, minStock: 100, maxStock: 450, price: 180, warehouse: 0, supplierId: 5, lastRestocked: '2026-05-08' },
  { name: 'Ascorbic Acid USP', sku: 'FNB-005', category: 'Food & Beverage', quantity: 7, minStock: 15, maxStock: 120, price: 920, warehouse: 2, supplierId: 3, lastRestocked: '2026-03-25' },
  { name: 'Pectin Powder', sku: 'FNB-006', category: 'Food & Beverage', quantity: 65, minStock: 20, maxStock: 200, price: 1400, warehouse: 1, supplierId: 5, lastRestocked: '2026-04-30' },
  { name: 'Xanthan Gum Industrial', sku: 'FNB-007', category: 'Food & Beverage', quantity: 30, minStock: 10, maxStock: 100, price: 2800, warehouse: 0, supplierId: 3, lastRestocked: '2026-05-06' },
  { name: 'Starch Modified', sku: 'FNB-008', category: 'Food & Beverage', quantity: 250, minStock: 80, maxStock: 260, price: 150, warehouse: 3, supplierId: 4, lastRestocked: '2026-05-09' },
];

export const products = rawProducts.map((p, i) => ({
  id: i + 1,
  ...p,
  warehouse: warehouses[p.warehouse],
  status: getStatus(p.quantity, p.minStock, p.maxStock),
}));

export { categories, warehouses };
