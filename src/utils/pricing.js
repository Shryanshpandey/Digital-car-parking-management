export const fmtMoney = n => '₹' + Number(n || 0).toLocaleString('en-IN');
export const fmtTime = iso => iso ? new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—';
export const isPlate = p => /^[A-Z0-9-]{4,12}$/.test(p);
export function calcAmount(entry, exit, rate) {
  const hrs = Math.max(1, Math.ceil((new Date(exit) - new Date(entry)) / 36e5));
  return hrs * rate;
}
export function duration(entry, exit = new Date().toISOString()) {
  const m = Math.max(0, Math.round((new Date(exit) - new Date(entry)) / 6e4));
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}
