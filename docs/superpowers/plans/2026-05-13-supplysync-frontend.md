# SupplySync Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a deployable, premium dark-themed React frontend for SupplySync with simulated API data, 6 pages, Chart.js visualizations, and Framer Motion animations.

**Architecture:** Vite + React SPA with React Router v6, Tailwind CSS, a simulated API service layer with artificial delays, and Framer Motion for animations.

**Tech Stack:** React 18, Vite, Tailwind CSS 3, Chart.js 4, react-chartjs-2, Framer Motion, Lucide React, React Router v6

---

## Task 1: Project Scaffold & Design System

**Files:** Create `client/` with Vite React, `tailwind.config.js`, `src/index.css`

- [ ] Scaffold Vite React: `npx -y create-vite@latest client -- --template react`
- [ ] Install deps: `npm install react-router-dom chart.js react-chartjs-2 framer-motion lucide-react`
- [ ] Install dev deps: `npm install -D tailwindcss @tailwindcss/vite`
- [ ] Configure tailwind.config.js with dark theme colors (surface, accent, success, warning, danger)
- [ ] Write index.css with Tailwind directives, Inter font import, glass-card utility, skeleton animation
- [ ] Update vite.config.js with tailwindcss plugin
- [ ] Verify dev server starts: `npm run dev`
- [ ] Commit: `feat: scaffold Vite React project with Tailwind dark theme`

## Task 2: Mock Data Layer

**Files:** Create `src/data/*.js`, `src/services/api.js`, `src/services/auth.js`

- [ ] Create users.js (admin + manager accounts)
- [ ] Create products.js (50 products, 6 categories, status derived from qty vs min/max)
- [ ] Create suppliers.js (10 suppliers with ratings and reliability)
- [ ] Create alerts.js (20 alerts across critical/warning/info)
- [ ] Create analytics.js (12 months trends, category breakdown, demand forecast, top movers)
- [ ] Create services/api.js (all fetch functions with 200-600ms simulated delay)
- [ ] Create services/auth.js (login/logout/getUser/isAuthenticated with localStorage)
- [ ] Commit: `feat: add mock data layer and simulated API service`

## Task 3: Auth Context & Hooks

**Files:** Create `src/context/AuthContext.jsx`, `src/hooks/useAuth.js`, `src/hooks/useFetch.js`

- [ ] AuthContext: provides user, login, logout, isAuthenticated, loading
- [ ] useAuth hook: wraps useContext(AuthContext)
- [ ] useFetch hook: generic async data fetcher with loading/error/refetch
- [ ] Commit: `feat: add auth context and data fetching hooks`

## Task 4: Shared Components

**Files:** Create `src/components/shared/` (LoadingSkeleton, Badge, Button, Modal, SearchInput)

- [ ] LoadingSkeleton with shimmer animation
- [ ] Badge with variants: success, warning, danger, info
- [ ] Button with variants: primary, secondary, danger, ghost + loading state
- [ ] Modal with Framer Motion AnimatePresence + glass backdrop
- [ ] SearchInput with Lucide Search icon
- [ ] Commit: `feat: add shared UI components`

## Task 5: Layout Shell

**Files:** Create `src/components/layout/` (Sidebar, TopBar, AppLayout)

- [ ] Sidebar: collapsible (240px/64px), Lucide icons, active state with indigo border, user avatar at bottom
- [ ] TopBar: page title, search, notification bell with count, user dropdown
- [ ] AppLayout: Sidebar + TopBar + Outlet, auth guard redirect to /login
- [ ] Commit: `feat: add app layout shell with collapsible sidebar`

## Task 6: Login Page

**Files:** Create `src/pages/LoginPage.jsx`

- [ ] Centered glass-card, animated gradient background (dark blues/purples)
- [ ] Email + password inputs, sign-in button with loading, error display
- [ ] Demo credentials hint, redirect to /dashboard on success
- [ ] Commit: `feat: add login page with animated background`

## Task 7: Dashboard Page + Components

**Files:** Create `src/pages/DashboardPage.jsx`, `src/components/dashboard/*`

- [ ] KPICard: icon, animated count-up, trend arrow, percentage
- [ ] InventoryTrendChart: Chart.js line chart, dark theme, gradient fill
- [ ] CategoryDonut: doughnut chart with center text
- [ ] RecentAlerts: scrollable list with severity dots
- [ ] TopMovingProducts: horizontal bar chart
- [ ] SupplierMini: mini list with reliability bars
- [ ] DashboardPage: bento grid layout, useFetch, staggered Framer Motion fade-in, skeleton loading
- [ ] Commit: `feat: add dashboard with KPIs, charts, and alerts`

## Task 8: Inventory Page

**Files:** Create `src/pages/InventoryPage.jsx`, `src/components/inventory/*`

- [ ] FilterBar: search, category dropdown, status dropdown, add button
- [ ] ProductTable: sortable glass-card table, status badges, edit/delete actions
- [ ] ProductModal: add/edit form with all product fields
- [ ] InventoryPage: filter/sort state, CRUD handlers, page transition
- [ ] Commit: `feat: add inventory management with CRUD`

## Task 9: Supplier Page

**Files:** Create `src/pages/SupplierPage.jsx`, `src/components/suppliers/*`

- [ ] SupplierCard: glass-card with name, location, rating, reliability bar
- [ ] SupplierModal: add/edit form
- [ ] SupplierPage: grid of cards, search, add button
- [ ] Commit: `feat: add supplier management page`

## Task 10: Analytics Page

**Files:** Create `src/pages/AnalyticsPage.jsx`, `src/components/analytics/*`

- [ ] DemandTrendChart: actual vs predicted (solid vs dashed lines)
- [ ] TurnoverChart: bar chart per category
- [ ] MonthlyMovement: area chart inbound vs outbound
- [ ] AnalyticsPage: bento grid, KPI cards for fill rate/stockout/lead time
- [ ] Commit: `feat: add analytics dashboard with forecasting charts`

## Task 11: Alerts Page

**Files:** Create `src/pages/AlertsPage.jsx`, `src/components/alerts/*`

- [ ] AlertFilters: tab buttons (All/Critical/Warning/Info) with count badges
- [ ] AlertCard: severity icon, title, description, recommendation, timestamp, mark-read
- [ ] AlertsPage: stats row, filters, staggered alert list
- [ ] Commit: `feat: add alerts and recommendations page`

## Task 12: Router & App Assembly

**Files:** Modify `src/App.jsx`, `src/main.jsx`

- [ ] App.jsx: AuthProvider > BrowserRouter > Routes (login + protected layout routes)
- [ ] main.jsx: clean entry with StrictMode
- [ ] Verify full flow: login → dashboard → navigate all pages
- [ ] Commit: `feat: wire up routing and app assembly`

## Task 13: Polish & Deploy Prep

- [ ] Page transition animations with Framer Motion
- [ ] Responsive: sidebar collapses <1024px, grid stacks <768px
- [ ] Update index.html title/meta/favicon
- [ ] Build and verify: `npm run build` → clean dist/
- [ ] Commit: `feat: add polish, responsive design, and deploy prep`
