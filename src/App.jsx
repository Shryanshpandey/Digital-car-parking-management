import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Slots from './pages/Slots.jsx';
import Logs from './pages/Logs.jsx';
import Billing from './pages/Billing.jsx';
import Reports from './pages/Reports.jsx';
import Admin from './pages/Admin.jsx';
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="slots" element={<Slots />} />
        <Route path="logs" element={<Logs />} />
        <Route path="billing" element={<Billing />} />
        <Route path="reports" element={<Reports />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
