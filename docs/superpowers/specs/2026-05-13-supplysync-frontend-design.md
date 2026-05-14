# SupplySync – Frontend Design Spec

## Overview

Build the deployable frontend for SupplySync, a Smart Supply Chain & Inventory Intelligence System. This phase focuses exclusively on the React frontend with a simulated API layer so it can be deployed standalone while the backend is developed later.

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Layout | Modern Bento Grid | Visual, modern, dashboard-native |
| Theme | Dark Tech / Glassmorphism | Premium feel, Linear/Vercel tier |
| Data Strategy | Simulated API Layer | Production-ready async patterns, loading states, easy backend swap |
| CSS | Tailwind CSS | User-specified requirement |
| Charts | Chart.js via react-chartjs-2 | User-specified requirement |
| Build Tool | Vite | Fast dev server, modern standard for React |
| Routing | React Router v6 | Industry standard, clean nested routes |
| Font | Inter (Google Fonts) | Clean, professional, excellent for data-heavy UIs |

---

## Visual Design System

### Color Palette

```
Background:        #0a0a0f (near-black with blue undertone)
Surface:           #111118 (card backgrounds)
Surface Elevated:  #1a1a24 (hover states, elevated cards)
Border:            #ffffff0a (very subtle white borders)
Border Hover:      #ffffff14 (slightly more visible on interaction)
Accent Primary:    #6366f1 (indigo — main actions, active states)
Accent Glow:       #6366f133 (indigo at 20% for glow effects)
Success:           #10b981 (green — positive KPIs, stock OK)
Warning:           #f59e0b (amber — low stock alerts)
Danger:            #ef4444 (red — critical alerts, overstock risk)
Text Primary:      #f4f4f5 (near-white)
Text Secondary:    #a1a1aa (muted gray for labels)
Text Tertiary:     #52525b (very muted, timestamps)
```

### Glassmorphism Effect

Cards use a subtle glass effect:
- `background: rgba(17, 17, 24, 0.6)`
- `backdrop-filter: blur(12px)`
- `border: 1px solid rgba(255, 255, 255, 0.04)`
- Subtle `box-shadow` with the accent color for active/hovered cards

### Typography

- **Font:** Inter (400, 500, 600, 700 weights)
- **Page Titles:** 28px, weight 700, tracking -0.02em
- **Section Headers:** 18px, weight 600
- **Body:** 14px, weight 400
- **Labels/Captions:** 12px, weight 500, uppercase, letter-spacing 0.05em
- **KPI Numbers:** 32px, weight 700, tabular-nums

### Micro-Animations

- Card hover: `translateY(-2px)` with `0.2s ease` + subtle border glow
- Page transitions: fade-in with `opacity 0→1` over `0.3s`
- Chart loading: skeleton shimmer effect before data loads
- KPI counters: number count-up animation on mount
- Sidebar nav items: subtle left-border slide-in on active state
- Alerts: slide-in from right with staggered delay

---

## Application Structure

### Layout Shell

```
┌─────────────────────────────────────────────────────┐
│  Sidebar (collapsible, 240px / 64px collapsed)      │
│  ┌───────────────────────────────────────────────┐  │
│  │  Logo + App Name                              │  │
│  │  ─────────────────                            │  │
│  │  📊 Dashboard                                 │  │
│  │  📦 Inventory                                 │  │
│  │  🏭 Suppliers                                 │  │
│  │  📈 Analytics                                 │  │
│  │  🔔 Alerts                                    │  │
│  │  ─────────────────                            │  │
│  │  👤 User Profile                              │  │
│  │  ⚙️ Settings                                  │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Main Content Area                                  │
│  ┌───────────────────────────────────────────────┐  │
│  │  Top Bar: Page title + Search + Notifications │  │
│  │  ─────────────────────────────────────────────│  │
│  │                                               │  │
│  │  [Page Content — Bento Grid / Tables / Forms] │  │
│  │                                               │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Pages

#### 1. Login / Register
- Clean centered card on a dark gradient background
- Email + password fields with glass-effect input styling
- Subtle animated background (CSS gradient animation)
- JWT token stored in localStorage (simulated for now)
- Redirects to Dashboard on success

#### 2. Dashboard Overview
Bento grid with these cards:
- **KPI Row (4 cards):** Total Products, Low Stock Items, Overstock Items, Inventory Value
  - Each card has: icon, value (animated count-up), trend indicator (↑↓), sparkline
- **Inventory Trends (large card, 2-col span):** Line chart showing monthly stock movement (Chart.js)
- **Category Performance (medium card):** Doughnut chart showing inventory distribution by category
- **Recent Alerts (medium card):** Scrollable list of latest alerts with severity badges
- **Top Moving Products (medium card):** Horizontal bar chart of fastest-moving items
- **Supplier Performance (medium card):** Mini table with delivery reliability scores

#### 3. Inventory Management
- **Top bar:** Search input, category filter dropdown, "Add Product" button
- **Data grid:** Sortable table with columns: Name, SKU, Category, Qty, Warehouse, Supplier, Status badge, Actions
- **Status badges:** "In Stock" (green), "Low Stock" (amber), "Out of Stock" (red), "Overstock" (purple)
- **Add/Edit modal:** Glass-effect modal with form fields for product details
- **Bulk actions:** Select multiple rows, bulk update status

#### 4. Supplier Management
- **Supplier cards grid:** Each supplier as a card showing name, contact, products supplied, reliability score
- **Detail view:** Click into a supplier to see delivery history, associated products, performance metrics
- **Add/Edit supplier modal**

#### 5. Analytics Dashboard
- **Demand Trends:** Multi-line chart showing predicted vs actual demand
- **Stock Risk Matrix:** Scatter plot categorizing products by risk level
- **Inventory Turnover:** Bar chart showing turnover rate by category
- **Monthly Movement:** Area chart showing inbound vs outbound stock
- **KPI Summary:** Operational metrics (fill rate, stockout frequency, avg lead time)

#### 6. Alerts & Recommendations
- **Filter tabs:** All, Critical, Warning, Info
- **Alert cards:** Each alert shows:
  - Severity icon + color coding
  - Title (e.g., "Restock Product X within 3 days")
  - Description with context
  - Recommended action button
  - Timestamp
- **Alert summary stats** at the top

---

## Data Layer

### Simulated API Service (`services/api.js`)

Every function returns a Promise with a randomized delay (200-800ms) to simulate real network conditions:

```javascript
const simulateDelay = () => new Promise(resolve => 
  setTimeout(resolve, 200 + Math.random() * 600)
);

export const fetchDashboardData = async () => {
  await simulateDelay();
  return dashboardMockData;
};
```

### Mock Data Files (`data/`)

Separate JSON files for each domain:
- `products.js` — ~50 realistic products across 6 categories
- `suppliers.js` — ~10 suppliers with performance history
- `alerts.js` — ~20 alerts across severity levels
- `analytics.js` — 12 months of trend data, forecasts
- `users.js` — Admin and Manager user profiles

### Auth Simulation

- Login validates against mock users
- Stores JWT-like token in localStorage
- Protected routes redirect to login if no token
- Role-based UI (Admin sees all, Manager sees limited)

---

## Component Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   └── AppLayout.jsx
│   ├── dashboard/
│   │   ├── KPICard.jsx
│   │   ├── InventoryTrendChart.jsx
│   │   ├── CategoryDonut.jsx
│   │   ├── RecentAlerts.jsx
│   │   ├── TopMovingProducts.jsx
│   │   └── SupplierPerformance.jsx
│   ├── inventory/
│   │   ├── ProductTable.jsx
│   │   ├── ProductModal.jsx
│   │   ├── StatusBadge.jsx
│   │   └── FilterBar.jsx
│   ├── suppliers/
│   │   ├── SupplierCard.jsx
│   │   ├── SupplierDetail.jsx
│   │   └── SupplierModal.jsx
│   ├── analytics/
│   │   ├── DemandTrendChart.jsx
│   │   ├── StockRiskMatrix.jsx
│   │   ├── TurnoverChart.jsx
│   │   └── MonthlyMovement.jsx
│   ├── alerts/
│   │   ├── AlertCard.jsx
│   │   ├── AlertFilters.jsx
│   │   └── AlertStats.jsx
│   └── shared/
│       ├── LoadingSkeleton.jsx
│       ├── EmptyState.jsx
│       ├── Modal.jsx
│       ├── Badge.jsx
│       ├── Button.jsx
│       └── SearchInput.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── InventoryPage.jsx
│   ├── SupplierPage.jsx
│   ├── AnalyticsPage.jsx
│   └── AlertsPage.jsx
├── services/
│   ├── api.js
│   └── auth.js
├── data/
│   ├── products.js
│   ├── suppliers.js
│   ├── alerts.js
│   ├── analytics.js
│   └── users.js
├── hooks/
│   ├── useAuth.js
│   └── useFetch.js
├── context/
│   └── AuthContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## Error Handling & Edge Cases

- **Loading states:** Every data-driven component shows a skeleton shimmer while loading
- **Empty states:** Illustrated empty state when no data matches filters
- **Auth expiry:** Token check on route change, redirect to login if invalid
- **Responsive:** Sidebar collapses to icon-only on tablet, bottom nav on mobile
- **404 page:** Clean "not found" page for invalid routes

---

## Dependencies

```json
{
  "react": "^18",
  "react-dom": "^18",
  "react-router-dom": "^6",
  "chart.js": "^4",
  "react-chartjs-2": "^5",
  "framer-motion": "latest",
  "lucide-react": "latest",
  "tailwindcss": "^3"
}
```

- **framer-motion** for page transitions, staggered list animations, layout animations, and mount/unmount effects
- **lucide-react** for consistent, clean iconography (MIT licensed, no attribution needed)

---

## What This Phase Does NOT Include

- Real backend API calls (simulated only)
- Real MongoDB integration
- Python analytics scripts
- Real JWT authentication (simulated)
- Docker/deployment configuration

These will be added in subsequent phases when we build the backend.
