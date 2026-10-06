import { useState } from 'react';
import { useParking } from '../context/ParkingContext.jsx';
import { fmtMoney } from '../utils/pricing.js';
export default function Reports() {
  const { logs, slots } = useParking();
  const [type, setType] = useState('All'); const [days, setDays] = useState(7);
  const since = Date.now() - days * 864e5;
  const f = logs.filter(l => (type === 'All' || l.type === type) && new Date(l.entry) >= since);
  const revenue = f.reduce((a, l) => a + l.amount, 0);
  const byHour = Array.from({ length: 24 }, (_, h) => f.filter(l => new Date(l.entry).getHours() === h).length);
  const max = Math.max(1, ...byHour);
  const usage = [...new Set(slots.map(s => s.zone))].map(z => [z, f.filter(l => l.slot.startsWith(z)).length]);
  return (<>
    <h1>Reports</h1>
    <div className="row">
      <label>Period<select value={days} onChange={e => setDays(+e.target.value)}><option value={1}>Last 24 hours</option><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option></select></label>
      <label>Vehicle type<select value={type} onChange={e => setType(e.target.value)}><option>All</option><option>Car</option><option>Bike</option><option>SUV</option></select></label>
    </div>
    <div className="grid kpis"><div className="card"><div className="muted">Vehicles</div><div className="kpi">{f.length}</div></div><div className="card"><div className="muted">Revenue</div><div className="kpi">{fmtMoney(revenue)}</div></div></div>
    <div className="card"><h2>Entries by hour of day</h2><div className="chart">{byHour.map((n, h) => <div key={h} title={`${h}:00 — ${n}`}><i style={{ height: `${n / max * 100}%` }} /><small>{h}</small></div>)}</div></div>
    <div className="card"><h2>Slot utilization by zone</h2>{usage.map(([z, n]) => <div className="zone" key={z}><span>Zone {z}</span><div className="bar"><i style={{ width: `${n / Math.max(1, f.length) * 100}%` }} /></div><span className="muted">{n} stays</span></div>)}</div>
  </>);
}
