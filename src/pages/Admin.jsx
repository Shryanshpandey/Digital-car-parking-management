import { useParking } from '../context/ParkingContext.jsx';
export default function Admin() {
  const { role, rates, setRate, users, setUserRole, reset } = useParking();
  if (role !== 'admin') return <><h1>Admin</h1><div className="card"><p>Only admins can change pricing and roles. Switch to Admin in the top bar to continue.</p></div></>;
  return (<>
    <h1>Admin</h1>
    <div className="card form"><h2>Hourly pricing (₹)</h2>
      {Object.entries(rates).map(([t, v]) => <label key={t}>{t}<input type="number" min="0" value={v} onChange={e => setRate(t, e.target.value)} /></label>)}
      <p className="muted">New rates apply to future check-outs.</p></div>
    <div className="card scroll"><h2 className="pad">User roles</h2><table><thead><tr><th>Name</th><th>Role</th></tr></thead>
      <tbody>{users.map(u => <tr key={u.id}><td>{u.name}</td><td><select value={u.role} onChange={e => setUserRole(u.id, e.target.value)}><option value="admin">Admin</option><option value="manager">Manager</option><option value="attendant">Attendant</option></select></td></tr>)}</tbody></table></div>
    <button className="btn danger" onClick={() => confirm('Reset all data to the sample set?') && reset()}>Reset sample data</button>
  </>);
}
