import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import ProfilePage from "@/pages/Profile";
import FinancingPage from "@/pages/Financing";
import InvestmentsPage from "@/pages/Investments";
import ZakatPage from "@/pages/Zakat";
import AuditPage from "@/pages/Audit";
import DashboardPage from "@/pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="financing" element={<FinancingPage />} />
          <Route path="invest" element={<InvestmentsPage />} />
          <Route path="zakat" element={<ZakatPage />} />
          <Route path="audit" element={<AuditPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
