# SupplySync — Smart Supply Chain & Inventory Intelligence System

SupplySync is a premium, data-driven supply chain management and inventory intelligence platform. Designed with a focus on visual excellence and actionable insights, it helps businesses monitor stock movement, identify risks, and support strategic inventory decisions.

## 🚀 Project Overview
This repository contains the **Frontend Architecture** for SupplySync. It features a modern "Bento Grid" dashboard, glassmorphism UI components, and a simulated API layer to demonstrate a full-featured supply chain environment.

### Core Features
- **Intelligent Dashboard**: Real-time KPI tracking for inventory value, stockout risks, and overstock alerts.
- **Inventory Management**: Comprehensive CRUD operations with advanced filtering and status monitoring.
- **Supplier Intelligence**: Performance tracking with delivery reliability and lead-time analytics.
- **Demand Forecasting**: Interactive charts showing actual vs. predicted demand trends.
- **Premium UX**: Smooth Framer Motion animations, skeleton loading states, and a refined dark-mode aesthetic.

## 🛠️ Tech Stack
- **Library**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4, Vanilla CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Chart.js / React-Chartjs-2

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure
```text
client/
├── src/
│   ├── components/       # Modular UI components (Layout, Shared, Feature-specific)
│   ├── context/          # Auth and Global State
│   ├── data/             # Mock data for simulation
│   ├── hooks/            # Custom React hooks (useAuth, useFetch)
│   ├── pages/            # Page-level components
│   ├── services/         # Simulated API and Auth services
│   └── index.css         # Core Design System
└── index.html            # Entry point
```

## 🔮 Future Roadmap
- [ ] **Backend Integration**: Node.js/Express REST API.
- [ ] **Database**: MongoDB for persistent storage.
- [ ] **AI/ML Service**: Python service for real-time forecasting using Scikit-learn.
- [ ] **User Roles**: Advanced RBAC (Role-Based Access Control).
