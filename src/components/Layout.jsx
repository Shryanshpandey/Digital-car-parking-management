import { NavLink, Outlet } from 'react-router-dom';
import { useParking } from '../context/ParkingContext.jsx';
const links = [['/', 'Dashboard'], ['/slots', 'Parking slots'], ['/logs', 'Vehicle logs'], ['/billing', 'Billing'], ['/reports', 'Reports'], ['/admin', 'Admin']];
export default function Layout() {
  const { role, setRole, stats } = useParking();
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">ParkDesk</div>
        <nav>{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}</nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <span className={stats.available === 0 ? 'alert' : 'muted'}>{stats.available === 0 ? 'Lot is full' : `${stats.available} slots free`}</span>
          <label className="role">Signed in as
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="admin">Admin</option><option value="manager">Manager</option><option value="attendant">Attendant</option>
            </select>
          </label>
        </header>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
