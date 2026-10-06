import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { calcAmount, isPlate } from '../utils/pricing.js';

const Ctx = createContext(null);
export const useParking = () => useContext(Ctx);
const KEY = 'parking-state-v1';
const ago = h => new Date(Date.now() - h * 36e5).toISOString();

function seed() {
  const slots = [];
  ['A', 'B', 'C'].forEach(z => {
    for (let i = 1; i <= 8; i++) {
      const category = i === 1 ? 'VIP' : i === 8 ? 'Reserved' : 'Normal';
      slots.push({ id: `${z}-${i}`, zone: z, category, status: category === 'Reserved' ? 'Reserved' : 'Available' });
    }
  });
  const logs = [];
  [['MH12AB1234', 'A-2', 3], ['UP32CD5678', 'A-3', 1.5], ['DL8CAF9012', 'B-2', 5], ['KA01MN3456', 'B-5', 0.5]].forEach(([plate, slot, h], i) => {
    logs.push({ id: 'L' + (i + 1), plate, type: 'Car', slot, entry: ago(h), exit: null, status: 'Parked', amount: 0, paid: false });
    slots.find(s => s.id === slot).status = 'Occupied';
  });
  [['UP32XY1111', 'A-4', 30, 28], ['UP32ZZ2222', 'C-2', 52, 50]].forEach(([plate, slot, a, b], i) => {
    logs.push({ id: 'H' + i, plate, type: 'Car', slot, entry: ago(a), exit: ago(b), status: 'Checked Out', amount: 180, paid: true });
  });
  return { slots, logs, rates: { Car: 90, Bike: 30, SUV: 120 }, users: [
    { id: 1, name: 'Asha Verma', role: 'admin' }, { id: 2, name: 'Rahul Singh', role: 'attendant' }, { id: 3, name: 'Meera Iyer', role: 'manager' }] };
}

export function ParkingProvider({ children }) {
  const [state, setState] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { return seed(); } });
  const [role, setRole] = useState('admin');
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }, [state]);

  const actions = useMemo(() => ({
    checkIn({ plate, type, slotId }) {
      plate = plate.trim().toUpperCase();
      if (!isPlate(plate)) return { ok: false, error: 'Enter a valid plate (4–12 letters, numbers or dashes).' };
      const slot = state.slots.find(s => s.id === slotId);
      if (!slot) return { ok: false, error: 'Choose a slot.' };
      if (slot.status === 'Occupied') return { ok: false, error: `Slot ${slotId} is already occupied.` };
      if (state.logs.some(l => l.plate === plate && l.status === 'Parked')) return { ok: false, error: `${plate} is already parked.` };
      setState(s => ({ ...s,
        slots: s.slots.map(x => x.id === slotId ? { ...x, status: 'Occupied' } : x),
        logs: [{ id: 'L' + Date.now(), plate, type, slot: slotId, entry: new Date().toISOString(), exit: null, status: 'Parked', amount: 0, paid: false }, ...s.logs] }));
      return { ok: true };
    },
    checkOut(id) {
      setState(s => {
        const log = s.logs.find(l => l.id === id); if (!log) return s;
        const exit = new Date().toISOString();
        const slot = s.slots.find(x => x.id === log.slot);
        const back = slot.category === 'Reserved' ? 'Reserved' : 'Available';
        return { ...s,
          slots: s.slots.map(x => x.id === log.slot ? { ...x, status: back } : x),
          logs: s.logs.map(l => l.id === id ? { ...l, exit, status: 'Checked Out', amount: calcAmount(l.entry, exit, s.rates[l.type]) } : l) };
      });
    },
    pay: id => setState(s => ({ ...s, logs: s.logs.map(l => l.id === id ? { ...l, paid: true } : l) })),
    setRate: (type, v) => setState(s => ({ ...s, rates: { ...s.rates, [type]: Math.max(0, Number(v) || 0) } })),
    setUserRole: (id, r) => setState(s => ({ ...s, users: s.users.map(u => u.id === id ? { ...u, role: r } : u) })),
    reset: () => setState(seed()),
  }), [state.slots, state.logs]);

  const stats = useMemo(() => {
    const total = state.slots.length;
    const occupied = state.slots.filter(s => s.status === 'Occupied').length;
    const reserved = state.slots.filter(s => s.status === 'Reserved').length;
    const today = new Date().toDateString();
    const revenue = state.logs.filter(l => l.exit && new Date(l.exit).toDateString() === today).reduce((a, l) => a + l.amount, 0);
    return { total, occupied, reserved, available: total - occupied - reserved, pct: Math.round(occupied / total * 100), revenue };
  }, [state]);

  return <Ctx.Provider value={{ ...state, ...actions, stats, role, setRole }}>{children}</Ctx.Provider>;
}
