// ── Icon set — simple Lucide-style line glyphs. Stroke uses currentColor so
// they inherit theme color. These are icons (allowed), not illustrations.
const I = ({ d, size = 18, sw = 1.75, fill, children, vb = 24 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill={fill || 'none'}
    stroke={fill ? 'none' : 'currentColor'} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block' }}>
    {d ? <path d={d} /> : children}
  </svg>
);

const Icons = {
  Check: (p) => <I {...p} d="M20 6L9 17l-5-5" sw={2.4} />,
  Package: (p) => <I {...p}><path d="M16.5 9.4L7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></I>,
  Truck: (p) => <I {...p}><path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2"/><path d="M14 9h4l3 3v5a1 1 0 0 1-1 1h-1"/><circle cx="7.5" cy="18.5" r="2.2"/><circle cx="17.5" cy="18.5" r="2.2"/><path d="M9.7 18.5h5.6"/></I>,
  Route: (p) => <I {...p}><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8.4 19H14a3.5 3.5 0 0 0 0-7H9.5a3.5 3.5 0 0 1 0-7H16"/></I>,
  Home: (p) => <I {...p}><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/></I>,
  MapPin: (p) => <I {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></I>,
  Phone: (p) => <I {...p} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  Hash: (p) => <I {...p}><path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/></I>,
  Receipt: (p) => <I {...p}><path d="M4 2.5h16v19l-2.5-1.5L15 21l-3-1.5L9 21l-2.5-1.5L4 21z"/><path d="M8 7h8M8 11h8M8 15h5"/></I>,
  Calendar: (p) => <I {...p}><rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></I>,
  Wallet: (p) => <I {...p}><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="13" r="1.2" fill="currentColor" stroke="none"/></I>,
  Chevron: (p) => <I {...p} d="M6 9l6 6 6-6" sw={2} />,
  ArrowRight: (p) => <I {...p} d="M5 12h14M13 6l6 6-6 6" sw={2} />,
  ArrowUpRight: (p) => <I {...p} d="M7 17L17 7M8 7h9v9" sw={2} />,
  Sparkles: (p) => <I {...p}><path d="M12 3l1.9 4.8L18.7 9.7l-4.8 1.9L12 16.4l-1.9-4.8L5.3 9.7l4.8-1.9z"/><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></I>,
  Tag: (p) => <I {...p}><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none"/></I>,
  Star: (p) => <I {...p} fill="currentColor"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.6 6.1 21l1.2-6.5L2.5 9.9l6.6-.9z"/></I>,
  Copy: (p) => <I {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></I>,
  Bell: (p) => <I {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></I>,
  Help: (p) => <I {...p}><circle cx="12" cy="12" r="9.2"/><path d="M9.2 9.2a2.8 2.8 0 0 1 5.4.9c0 1.9-2.8 2.5-2.8 2.5"/><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/></I>,
  Info: (p) => <I {...p}><circle cx="12" cy="12" r="9.2"/><path d="M12 16v-5M12 8.2v.01"/></I>,
  ChevronDown: (p) => <I {...p} d="M6 9l6 6 6-6" sw={2} />,
  Plus: (p) => <I {...p} d="M12 5v14M5 12h14" sw={2} />,
};

Object.assign(window, { Icons });
