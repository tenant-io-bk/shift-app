'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';

type NotifType = 'confirmed' | 'enroute' | 'filled' | 'payment' | 'reminder' | 'review' | 'cancelled';

type Notif = {
  id: number;
  type: NotifType;
  title: string;
  sub: string;
  time: string;
  read: boolean;
  href: string;
};

const INITIAL: Notif[] = [
  {
    id: 1, type: 'enroute', read: false,
    title: 'Sam Ortiz is en route',
    sub: 'ETA 9 min · Barista · Today 11A–4P',
    time: '9:32A', href: '/employer/roster',
  },
  {
    id: 2, type: 'confirmed', read: false,
    title: 'Marco Reyes confirmed',
    sub: 'Barista · Today 11A–4P · Padmore\'s',
    time: '9:18A', href: '/employer/roster',
  },
  {
    id: 3, type: 'filled', read: true,
    title: 'Shift fully filled — 2 of 2',
    sub: 'Barista · Today 11A–4P · both workers confirmed',
    time: '9:18A', href: '/employer/roster',
  },
  {
    id: 4, type: 'reminder', read: true,
    title: 'Shift starts in 2 hours',
    sub: 'Barista · 11A–4P · 2 workers confirmed and en route',
    time: '9:00A', href: '/employer/roster',
  },
  {
    id: 5, type: 'payment', read: true,
    title: 'Payment processed',
    sub: 'Mon 12 May · Barista ×2 · $280.00 total',
    time: 'Mon 12', href: '/employer/billing',
  },
  {
    id: 6, type: 'confirmed', read: true,
    title: 'Elena P. added to standby',
    sub: 'Barista · Today 11A–4P · ready if needed',
    time: 'Mon 12', href: '/employer/roster',
  },
  {
    id: 7, type: 'review', read: true,
    title: 'Marco left a review',
    sub: '★★★★★ — "Great venue, well-organized shift."',
    time: 'Mon 12', href: '/employer/account',
  },
  {
    id: 8, type: 'cancelled', read: true,
    title: 'Worker cancelled — standby activated',
    sub: 'Sat 10 May · Server · Elena P. stepped in automatically',
    time: 'Sat 10', href: '/employer/roster',
  },
];

const TYPE_CONFIG: Record<NotifType, { bg: string; color: string; icon: string }> = {
  confirmed:  { bg: 'rgba(22,163,74,0.1)',     color: 'var(--online)',       icon: '✓' },
  enroute:    { bg: 'var(--paper-2)',            color: 'var(--ink)', icon: '→' },
  filled:     { bg: 'rgba(22,163,74,0.1)',     color: 'var(--online)',       icon: '●' },
  payment:    { bg: 'rgba(22,163,74,0.08)',    color: 'var(--online)',       icon: '$' },
  reminder:   { bg: 'rgba(234,75,42,0.1)',     color: 'var(--red)',       icon: '!' },
  review:     { bg: 'var(--yellow-soft)',        color: 'var(--ink)',    icon: '★' },
  cancelled:  { bg: 'rgba(234,75,42,0.08)',    color: 'var(--red)',       icon: '×' },
};

export default function EmployerNotifications() {
  const [items, setItems] = useState(INITIAL);

  const unread = items.filter(n => !n.read).length;

  function markAll() { setItems(p => p.map(n => ({ ...n, read: true }))); }
  function markRead(id: number) { setItems(p => p.map(n => n.id === id ? { ...n, read: true } : n)); }

  const today = items.filter(n => ['9:32A','9:18A','9:00A'].includes(n.time));
  const earlier = items.filter(n => !['9:32A','9:18A','9:00A'].includes(n.time));

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <StatusBar time="10:12" />

      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <Link href="/employer/dashboard" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 36 }}>←</Link>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>
          Alerts{unread > 0 && <span style={{ color: 'var(--ink)' }}> · {unread}</span>}
        </span>
        {unread > 0 ? (
          <button onClick={markAll} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', width: 60, textAlign: 'right' }}>
            Read all
          </button>
        ) : <div style={{ width: 60 }} />}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ padding: '14px 22px 6px' }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>Today</div>
        </div>
        {today.map(n => <Row key={n.id} n={n} onRead={markRead} />)}

        <div style={{ padding: '14px 22px 6px', marginTop: 4 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>Earlier</div>
        </div>
        {earlier.map(n => <Row key={n.id} n={n} onRead={markRead} />)}
      </div>

      <EmployerNav active="dashboard" />
    </div>
  );
}

function Row({ n, onRead }: { n: Notif; onRead: (id: number) => void }) {
  const cfg = TYPE_CONFIG[n.type];
  return (
    <Link
      href={n.href}
      onClick={() => onRead(n.id)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '12px 22px',
        background: n.read ? 'transparent' : 'var(--paper-2)',
        borderBottom: '1px solid var(--line)',
        textDecoration: 'none',
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: cfg.color,
        marginTop: 2,
      }}>
        {cfg.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: n.read ? 500 : 700, fontSize: 14, color: 'var(--ink)', lineHeight: 1.3 }}>
            {n.title}
          </span>
          {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ink)', flexShrink: 0, marginTop: 4 }} />}
        </div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 3, lineHeight: 1.4 }}>{n.sub}</div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 4}}>{n.time}</div>
      </div>
    </Link>
  );
}
