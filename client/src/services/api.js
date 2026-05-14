import { products } from '../data/products';
import { suppliers } from '../data/suppliers';
import { alerts } from '../data/alerts';
import {
  monthlyTrends,
  categoryBreakdown,
  demandForecast,
  topMovingProducts,
  turnoverByCategory,
  operationalKPIs,
} from '../data/analytics';

const delay = () => new Promise((r) => setTimeout(r, 200 + Math.random() * 400));

let localProducts = [...products];
let localSuppliers = [...suppliers];
let localAlerts = [...alerts];

export const api = {
  // Dashboard
  getDashboard: async () => {
    await delay();
    return {
      totalProducts: localProducts.length,
      lowStock: localProducts.filter((p) => p.status === 'low').length,
      outOfStock: localProducts.filter((p) => p.status === 'out').length,
      overstock: localProducts.filter((p) => p.status === 'overstock').length,
      totalValue: localProducts.reduce((s, p) => s + p.price * p.quantity, 0),
      recentAlerts: localAlerts.slice(0, 5),
      topMoving: topMovingProducts,
      categoryBreakdown,
      monthlyTrends,
    };
  },

  // Products
  getProducts: async () => {
    await delay();
    return [...localProducts];
  },
  addProduct: async (product) => {
    await delay();
    const newProduct = { ...product, id: localProducts.length + 1 };
    localProducts.push(newProduct);
    return newProduct;
  },
  updateProduct: async (id, updates) => {
    await delay();
    localProducts = localProducts.map((p) => (p.id === id ? { ...p, ...updates } : p));
    return localProducts.find((p) => p.id === id);
  },
  deleteProduct: async (id) => {
    await delay();
    localProducts = localProducts.filter((p) => p.id !== id);
    return { success: true };
  },

  // Suppliers
  getSuppliers: async () => {
    await delay();
    return [...localSuppliers];
  },
  addSupplier: async (supplier) => {
    await delay();
    const newSupplier = { ...supplier, id: localSuppliers.length + 1 };
    localSuppliers.push(newSupplier);
    return newSupplier;
  },
  updateSupplier: async (id, updates) => {
    await delay();
    localSuppliers = localSuppliers.map((s) => (s.id === id ? { ...s, ...updates } : s));
    return localSuppliers.find((s) => s.id === id);
  },

  // Alerts
  getAlerts: async () => {
    await delay();
    return [...localAlerts];
  },
  markAlertRead: async (id) => {
    await delay();
    localAlerts = localAlerts.map((a) => (a.id === id ? { ...a, isRead: true } : a));
    return { success: true };
  },

  // Analytics
  getAnalytics: async () => {
    await delay();
    return {
      monthlyTrends,
      categoryBreakdown,
      demandForecast,
      topMovingProducts,
      turnoverByCategory,
      operationalKPIs,
    };
  },
};
