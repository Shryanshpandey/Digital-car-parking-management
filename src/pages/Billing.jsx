import { useState } from 'react';
import { useParking } from '../context/ParkingContext.jsx';
import Badge from '../components/Badge.jsx';
import { fmtMoney, fmtTime, duration } from '../utils/pricing.js';
export default function Billing() {
  const { logs, pay, rates } = useParking();
  const [sel, setSel] = useState(null);
  const done = logs.filter(l => l.exit);
  return (<>
    <h1>Billing</h1>
    <p className="muted">Rates per hour (minimum 1 hour): {Object.entries(rates).map(([k, v]) => `${k} ${fmtMoney(v)}`).join(', ')}</p>
    <div className="split">
      <div className="card scroll"><table>
        <thead><tr><th>Plate</th><th>Exit</th><th>Amount</th><th>Payment</th><th></th></tr></thead>
        <tbody>{done.map(l => <tr key={l.id}><td>{l.plate}</td><td>{fmtTime(l.exit)}</td><td>{fmtMoney(l.amount)}</td><td><Badge>{l.paid ? 'Paid' : 'Unpaid'}</Badge></td>
          <td><button className="btn small secondary" onClick={() => setSel(l)}>Receipt</button> {!l.paid && <button className="btn small" onClick={() => pay(l.id)}>Mark paid</button>}</td></tr>)}</tbody>
      </table>{!done.length && <p className="muted pad">No completed stays yet. Check a vehicle out to see its bill.</p>}</div>
      {sel && <div className="card receipt"><h2>Receipt</h2>
        {[['Vehicle', sel.plate], ['Slot', sel.slot], ['Entry', fmtTime(sel.entry)], ['Exit', fmtTime(sel.exit)], ['Duration', duration(sel.entry, sel.exit)], ['Total', fmtMoney(sel.amount)]].map(([k, v]) => <div key={k}><span className="muted">{k}</span><b>{v}</b></div>)}
        <button className="btn secondary" onClick={() => window.print()}>Print</button></div>}
    </div>
  </>);
}
