import { useState } from 'react';
import { useParking } from '../context/ParkingContext.jsx';
import Badge from '../components/Badge.jsx';
export default function Slots() {
  const { slots, logs } = useParking();
  const [f, setF] = useState('All');
  const shown = slots.filter(s => f === 'All' || s.status === f);
  return (<>
    <h1>Parking slots</h1>
    <div className="row">{['All', 'Available', 'Occupied', 'Reserved'].map(x => <button key={x} className={'btn ' + (f === x ? '' : 'secondary')} onClick={() => setF(x)}>{x}</button>)}</div>
    <div className="grid slots">{shown.map(s => { const l = logs.find(l => l.slot === s.id && l.status === 'Parked');
      return <div key={s.id} className={'card slot ' + s.status}><b>{s.id}</b><span className="muted">{s.category}</span><Badge>{s.status}</Badge>{l && <small>{l.plate}</small>}</div>; })}
    </div>
    {!shown.length && <p className="muted">No slots match this filter.</p>}
  </>);
}
