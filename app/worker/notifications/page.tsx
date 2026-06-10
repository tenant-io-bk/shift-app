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
    title: '3 New Shifts Match Your Skills',
    sub: 'Barista · within 1.2 miles · starting 11A today',
    time: '8 min ago', href: '/worker/map',
  },
  {
    id: 2, type: 'payment', read: false,
    title: 'Paid Out $174.00',
    sub: "Padmore's Coffee · Barista · Mon 12 May",
    time: '2 hrs ago', href: '/worker/wallet',
  },
  {
    id: 3, type: 'rebook', read: false,
    title: "Padmore's Wants to Rebook You",
    sub: 'Same role · Wed 14 May · 11A–4P · $26/hr',
    time: '3 hrs ago', href: '/worker/job-detail',
  },
  {
    id: 4, type: 'review', read: true,
    title: 'New Review from The Wren',
    sub: '★★★★★ — "Fast, professional, great with customers."',
    time: 'Sat 10 May', href: '/worker/profile',
  },
  {
    id: 5, type: 'reminder', read: true,
    title: 'Shift Starts in 2 Hours',
    sub: "Padmore's Coffee · 11A · 172 Tompkins Ave",
    time: 'Mon 12 May', href: '/worker/day-of',
  },
  {
    id: 6, type: 'match', read: true,
    title: '5 New Shifts Near You',
    sub: 'Bartender, Server · Bed-Stuy + Crown Heights',
    time: 'Sun 11 May', href: '/worker/map',
  },
  {
    id: 7, type: 'payment', read: true,
    title: 'Paid Out $96.00',
    sub: 'The Wren · Server · Sat 10 May',
    time: 'Sat 10 May', href: '/worker/wallet',
  },
];

const TYPE_BG: Record<Notification['type'], string> = {
  match:   'var(--steel-soft)',
  payment: 'var(--green)',
  reminder:'var(--yellow-soft)',
  review:  'var(--lilac-soft)',
  rebook:  'var(--pink)',
};

const TYPE_BORDER: Record<Notification['type'], string> = {
  match:   'var(--steel)',
  payment: 'var(--green)',
  reminder:'var(--yellow)',
  review:  'var(--lilac)',
  rebook:  'var(--pink)',
};

// How many px of each stacked card peek below the one above
const PEEK = 14;

export default function Notifications() {
  const [items, setItems] = useState(INITIAL);

  const unreadCount = items.filter(n => !n.read).length;

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  }
  function markRead(id: number) {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  const today   = items.filter(n => ['8 min ago', '2 hrs ago', '3 hrs ago'].includes(n.time));
  const earlier = items.filter(n => !['8 min ago', '2 hrs ago', '3 hrs ago'].includes(n.time));

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar time="10:12" />

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)', flexShrink: 0 }}>
        <div style={{ width: 60 }} />
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>
          Alerts {unreadCount > 0 && <span>· {unreadCount}</span>}
        </span>
        {unreadCount > 0 ? (
          <button onClick={markAllRead} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', width: 60, textAlign: 'right' }}>
            Read All
          </button>
        ) : <div style={{ width: 60 }} />}
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>

        {/* TODAY */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--paper)', padding: '12px 20px 8px' }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>Today</span>
        </div>

        <div style={{ padding: '0 16px', position: 'relative' }}>
          {today.map((n, i) => (
            <div
              key={n.id}
              style={{
                position: 'sticky',
                top: 34 + i * PEEK,
                zIndex: 20 - i,
                marginBottom: i < today.length - 1 ? 0 : 20,
              }}
            >
              <NotifCard n={n} onRead={markRead} stackDepth={i} isEarlier={false} />
            </div>
          ))}
        </div>

        {/* EARLIER */}
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--paper)', padding: '4px 20px 8px' }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>Earlier</span>
        </div>

        <div style={{ padding: '0 16px' }}>
          {earlier.map((n, i) => (
            <div
              key={n.id}
              style={{
                position: 'sticky',
                top: 34 + i * PEEK,
                zIndex: 20 - i,
                marginBottom: i < earlier.length - 1 ? 0 : 20,
              }}
            >
              <NotifCard n={n} onRead={markRead} stackDepth={i} isEarlier={true} />
            </div>
          ))}
        </div>

      </div>

      <BottomNav active="menu" />
    </div>
  );
}

function NotifCard({ n, onRead, stackDepth, isEarlier }: { n: Notification; onRead: (id: number) => void; stackDepth: number; isEarlier: boolean }) {
  const scale = 1 - stackDepth * 0.015;
  return (
    <Link
      href={n.href}
      onClick={() => onRead(n.id)}
      style={{
        display: 'block',
        padding: '16px 18px 18px',
        background: isEarlier ? 'var(--card)' : TYPE_BG[n.type],
        border: isEarlier ? `2px solid ${TYPE_BORDER[n.type]}` : 'none',
        borderRadius: 18,
        textDecoration: 'none',
        marginBottom: 10,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        boxShadow: stackDepth > 0 ? '0 -2px 12px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 5 }}>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: n.read ? 400 : 700, fontSize: 16, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          {n.title}
        </span>
        {!n.read && (
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ink)', flexShrink: 0, marginTop: 5 }} />
        )}
      </div>
      <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.45 }}>{n.sub}</div>
      <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 8}}>{n.time}</div>
    </Link>
  );
}
