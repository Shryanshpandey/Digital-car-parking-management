import { useState } from 'react';
import { useParking } from '../context/ParkingContext.jsx';
import Badge from '../components/Badge.jsx';
import { fmtTime, duration, fmtMoney } from '../utils/pricing.js';
export default function Logs() {
  const { slots, logs, rates, checkIn, checkOut } = useParking();
  const [form, setForm] = useState({ plate: '', type: 'Car', slotId: '' });
  const [err, setErr] = useState(''); const [q, setQ] = useState('');
  const free = slots.filter(s => s.status === 'Available');
  const submit = e => { e.preventDefault(); const r = checkIn(form); setErr(r.ok ? '' : r.error); if (r.ok) setForm({ ...form, plate: '', slotId: '' }); };
  const rows = logs.filter(l => l.plate.includes(q.toUpperCase()) || l.id.toLowerCase() === q.toLowerCase());
  return (<>
    <h1>Vehicle logs</h1>
    <form className="card form" onSubmit={submit}>
      <h2>Check in a vehicle</h2>
      <label>Plate number<input value={form.plate} onChange={e => setForm({ ...form, plate: e.target.value })} placeholder="UP32AB1234" /></label>
      <label>Vehicle type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>{Object.keys(rates).map(t => <option key={t}>{t}</option>)}</select></label>
      <label>Slot<select value={form.slotId} onChange={e => setForm({ ...form, slotId: e.target.value })}><option value="">Choose a slot</option>{free.map(s => <option key={s.id} value={s.id}>{s.id} ({s.category})</option>)}</select></label>
      <button className="btn">Check in</button>
      {err && <p className="error" role="alert">{err}</p>}
    </form>
    <input className="search" placeholder="Search by plate or log ID" value={q} onChange={e => setQ(e.target.value)} aria-label="Search vehicles" />
    <div className="card scroll"><table>
      <thead><tr><th>Plate</th><th>Type</th><th>Slot</th><th>Entry</th><th>Duration</th><th>Status</th><th>Amount</th><th></th></tr></thead>
      <tbody>{rows.map(l => <tr key={l.id}><td>{l.plate}</td><td>{l.type}</td><td>{l.slot}</td><td>{fmtTime(l.entry)}</td><td>{duration(l.entry, l.exit || undefined)}</td>
        <td><Badge>{l.status}</Badge></td><td>{l.exit ? fmtMoney(l.amount) : '—'}</td>
        <td>{l.status === 'Parked' && <button className="btn small danger" onClick={() => checkOut(l.id)}>Check out</button>}</td></tr>)}</tbody>
    </table>{!rows.length && <p className="muted pad">No vehicles found.</p>}</div>
  </>);
}
