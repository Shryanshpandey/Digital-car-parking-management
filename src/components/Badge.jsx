const map = { Available: 'green', Occupied: 'blue', Reserved: 'amber', Full: 'red', Parked: 'blue', 'Checked Out': 'green', Paid: 'green', Unpaid: 'amber' };
export default function Badge({ children }) { return <span className={`badge ${map[children] || 'blue'}`}>{children}</span>; }
