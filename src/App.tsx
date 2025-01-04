import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import ClientsPage from "./pages/dashboard/Clients";
import PracticesPage from "./pages/dashboard/Practices";
import CallAnalyticsPage from "./pages/dashboard/CallAnalytics";
import ReportsPage from "./pages/dashboard/Reports";
import ContractsPage from "./pages/dashboard/Contracts";
import ActivityPage from "./pages/dashboard/Activity";
import SettingsPage from "./pages/dashboard/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Marketing site routes */}
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/clients" element={<ClientsPage />} />
        <Route path="/dashboard/practices" element={<PracticesPage />} />
        <Route path="/dashboard/calls" element={<CallAnalyticsPage />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/billing" element={<Billing />} />
        <Route path="/dashboard/contracts" element={<ContractsPage />} />
        <Route path="/dashboard/activity" element={<ActivityPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
