'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

type Notification = {
  id: number;
  type: 'match' | 'payment' | 'reminder' | 'review' | 'rebook';
  title: string;
  sub: string;
  time: string;
  read: boolean;
  href: string;
};

const INITIAL: Notification[] = [
  {
    id: 1, type: 'match', read: false,
    title: '3 new shifts match your skills',
    sub: 'Barista · within 1.2 miles · starting 11A today',
    time: '8 min ago', href: '/worker/map',
  },
  {
    id: 2, type: 'payment', read: false,
    title: 'Paid out $174.00',
    sub: "Padmore's Coffee · Barista · Mon 12 May",
    time: '2 hrs ago', href: '/worker/wallet',
  },
  {
    id: 3, type: 'rebook', read: false,
    title: "Padmore's wants to rebook you",
    sub: 'Same role · Wed 14 May · 11A–4P · $26/hr',
    time: '3 hrs ago', href: '/worker/job-detail',
  },
  {
    id: 4, type: 'review', read: true,
    title: 'New review from The Wren',
    sub: '★★★★★ — "Fast, professional, great with customers."',
    time: 'Sat 10 May', href: '/worker/profile',
  },
  {
    id: 5, type: 'reminder', read: true,
    title: 'Shift starts in 2 hours',
    sub: "Padmore's Coffee · 11A · 172 Tompkins Ave",
    time: 'Mon 12 May', href: '/worker/day-of',
  },
  {
    id: 6, type: 'match', read: true,
    title: '5 new shifts near you',
    sub: 'Bartender, Server · Bed-Stuy + Crown Heights',
    time: 'Sun 11 May', href: '/worker/map',
  },
  {
    id: 7, type: 'payment', read: true,
    title: 'Paid out $96.00',
    sub: 'The Wren · Server · Sat 10 May',
    time: 'Sat 10 May', href: '/worker/wallet',
  },
];

const TYPE_CONFIG = {
  match:   { bg: 'var(--steel)',      color: '#1e3d7a', icon: '⚡' },
  payment: { bg: 'var(--green)',      color: 'var(--ink)', icon: '$' },
  reminder:{ bg: 'var(--yellow)',     color: 'var(--ink)', icon: '!' },
  review:  { bg: 'var(--lilac)',      color: '#fff', icon: '★' },
  rebook:  { bg: 'var(--pink)',       color: 'var(--ink)', icon: '↩' },
};

export default function Notifications() {
  const [items, setItems] = useState(INITIAL);

  const unreadCount = items.filter(n => !n.read).length;

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  }

  function markRead(id: number) {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  const today = items.filter(n => ['8 min ago', '2 hrs ago', '3 hrs ago'].includes(n.time));
  const earlier = items.filter(n => !['8 min ago', '2 hrs ago', '3 hrs ago'].includes(n.time));

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <StatusBar time="10:12" />

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <div style={{ width: 60 }} />
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>
          Alerts {unreadCount > 0 && <span style={{ color: 'var(--ink)' }}>· {unreadCount}</span>}
        </span>
        {unreadCount > 0 ? (
          <button onClick={markAllRead} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--mute)', background: 'none', border: 'none', cursor: 'pointer', width: 60, textAlign: 'right' }}>
            Read all
          </button>
        ) : <div style={{ width: 60 }} />}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 16px' }}>
        {/* Today */}
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', padding: '10px 4px 8px' }}>Today</div>
        {today.map(n => <NotifRow key={n.id} n={n} onRead={markRead} />)}

        {/* Earlier */}
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', padding: '16px 4px 8px' }}>Earlier</div>
        {earlier.map(n => <NotifRow key={n.id} n={n} onRead={markRead} />)}
      </div>

      <BottomNav active="menu" />
    </div>
  );
}

function NotifRow({ n, onRead }: { n: Notification; onRead: (id: number) => void }) {
  const cfg = TYPE_CONFIG[n.type];
  return (
    <Link
      href={n.href}
      onClick={() => onRead(n.id)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 16px',
        background: 'var(--paper)',
        border: `2px solid ${n.read ? 'var(--line)' : 'var(--ink)'}`,
        borderRadius: 14,
        textDecoration: 'none',
        marginBottom: 10,
      }}
    >
      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: cfg.color,
      }}>
        {cfg.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 3 }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: n.read ? 500 : 700, fontSize: 14, color: 'var(--ink)', lineHeight: 1.3 }}>
            {n.title}
          </span>
          {!n.read && (
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ink)', flexShrink: 0, marginTop: 4 }} />
          )}
        </div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.4 }}>{n.sub}</div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 4, opacity: 0.7 }}>{n.time}</div>
      </div>
    </Link>
  );
}
