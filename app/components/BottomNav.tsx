'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'home' | 'map' | 'messages' | 'wallet' | 'menu';

const ACTIVE = '#72c15f';
const INACTIVE = 'rgba(255,255,255,0.38)';

const TABS = [
  {
    id: 'home' as Tab,
    label: 'Home',
    href: '/worker/home',
    icon: (active: boolean) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H15v-6h-6v6H4a1 1 0 0 1-1-1V10.5Z"
          stroke="currentColor" strokeWidth="1.7" fill={active ? 'currentColor' : 'none'}
          strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'map' as Tab,
    label: 'Map',
    href: '/worker/map',
    icon: (active: boolean) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
          stroke="currentColor" strokeWidth="1.7" fill={active ? 'currentColor' : 'none'}
          strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" fill={active ? '#fff' : 'none'} stroke={active ? 'none' : 'currentColor'} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'messages' as Tab,
    label: 'Messages',
    href: '/worker/messages',
    icon: (active: boolean) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M3 5h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H7.5L3 21V6a1 1 0 0 1 1-1Z"
          stroke="currentColor" strokeWidth="1.7" fill={active ? 'currentColor' : 'none'}
          strokeLinejoin="round" />
        {active && <>
          <line x1="8" y1="10" x2="16" y2="10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="13.5" x2="13" y2="13.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        </>}
      </svg>
    ),
  },
  {
    id: 'wallet' as Tab,
    label: 'Wallet',
    href: '/worker/wallet',
    icon: (active: boolean) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="2.5"
          stroke="currentColor" strokeWidth="1.7" fill={active ? 'currentColor' : 'none'} />
        <path d="M2 10h20" stroke={active ? '#fff' : 'currentColor'} strokeWidth="1.7" opacity={active ? 0.5 : 1} />
        <rect x="15" y="13.5" width="4" height="3" rx="1.5" fill={active ? '#fff' : 'currentColor'} />
      </svg>
    ),
  },
];

const MENU_ITEMS = [
  { label: 'My Profile',    href: '/worker/profile' },
  { label: 'Documents',     href: '/v3/credentials' },
  { label: 'Availability',  href: '/v3/availability' },
  { label: 'File a Report', href: '/worker/report' },
  { label: 'Notifications', href: '/worker/notifications' },
  { label: 'Settings',      href: '/worker/settings' },
];

export default function BottomNav({ active }: { active: Tab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 150 }}
          />
          <div style={{
            position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: 390,
            background: 'var(--paper)',
            borderRadius: '20px 20px 0 0',
            zIndex: 160,
            borderTop: '2px solid var(--ink)',
            borderLeft: '2px solid var(--ink)',
            borderRight: '2px solid var(--ink)',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line)' }} />
            </div>

            <div style={{ padding: '6px 22px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: '#fff' }}>J</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Jordan M.</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>4.9★ · Barista · Server</div>
              </div>
            </div>

            {MENU_ITEMS.map((item, i) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '15px 22px',
                borderBottom: i < MENU_ITEMS.length - 1 ? '1px solid var(--line)' : 'none',
                textDecoration: 'none',
              }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--mute)' }}>→</span>
              </Link>
            ))}

            <button style={{ width: '100%', padding: '14px 22px', background: 'none', border: 'none', borderTop: '1px solid var(--line)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)' }}>
              Sign out
            </button>
          </div>
        </>
      )}

      {/* Gradient nav — transparent at top, solid at bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          height: 112,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(13,14,18,0.82) 38%, #0D0E12 62%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: 22,
            paddingTop: 8,
            pointerEvents: 'auto',
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                  color: isActive ? ACTIVE : INACTIVE,
                  textDecoration: 'none',
                  minWidth: 52,
                }}
              >
                {tab.icon(isActive)}
                <span style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '-0.01em',
                }}>
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* Avatar / More button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              color: menuOpen || active === 'menu' ? ACTIVE : INACTIVE,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              minWidth: 52,
              padding: 0,
            }}
          >
            <div style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: `2px solid ${menuOpen || active === 'menu' ? ACTIVE : 'rgba(255,255,255,0.22)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.15s ease',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: menuOpen || active === 'menu' ? ACTIVE : 'rgba(255,255,255,0.6)' }}>J</span>
            </div>
            <span style={{
              fontFamily: 'var(--sans)',
              fontSize: 11,
              fontWeight: (menuOpen || active === 'menu') ? 600 : 400,
              letterSpacing: '-0.01em',
            }}>
              More
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
