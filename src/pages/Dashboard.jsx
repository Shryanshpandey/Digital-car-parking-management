import { useParking } from '../context/ParkingContext.jsx';
import { fmtMoney } from '../utils/pricing.js';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const { stats, slots } = useParking();
  const kpis = [['Available', stats.available], ['Occupied', stats.occupied], ['Occupancy', stats.pct + '%'], ['Revenue today', fmtMoney(stats.revenue)]];
  const zones = [...new Set(slots.map(s => s.zone))];
  return (<>
    <h1>Dashboard</h1>
    <div className="grid kpis">{kpis.map(([l, v]) => <div className="card" key={l}><div className="muted">{l}</div><div className="kpi">{v}</div></div>)}</div>
    <div className="card"><h2>Zone availability</h2>
      {zones.map(z => { const zs = slots.filter(s => s.zone === z); const o = zs.filter(s => s.status === 'Occupied').length;
        return <div className="zone" key={z}><span>Zone {z}</span><div className="bar"><i style={{ width: `${o / zs.length * 100}%` }} /></div><span className="muted">{o}/{zs.length} occupied</span></div>; })}
    </div>
    <div className="row"><Link className="btn" to="/logs">Check in a vehicle</Link><Link className="btn secondary" to="/slots">View slots</Link></div>
  </>);
}
