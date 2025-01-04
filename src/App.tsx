import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewDashboard } from "@/components/dashboard/OverviewDashboard";
import PracticesPage from "@/pages/dashboard/PracticesPage";
import CallAnalyticsPage from "@/pages/dashboard/CallAnalyticsPage";
import ReportsPage from "@/pages/dashboard/ReportsPage";
import BillingPage from "@/pages/dashboard/BillingPage";
import ContractsPage from "@/pages/dashboard/ContractsPage";
import ActivityPage from "@/pages/dashboard/ActivityPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import Index from "@/pages/Index";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Login from "@/pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Marketing/Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index element={<OverviewDashboard />} />
          <Route path="practices" element={<PracticesPage />} />
          <Route path="calls" element={<CallAnalyticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="contracts" element={<ContractsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;