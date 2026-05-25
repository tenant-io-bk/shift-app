'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'home' | 'map' | 'messages' | 'wallet' | 'menu';

const ACTIVE = '#72c15f';
const INACTIVE = 'rgba(13,14,18,0.45)';

const TABS = [
  {
    id: 'home' as Tab,
    label: 'Home',
    href: '/worker/home',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: 'map' as Tab,
    label: 'Map',
    href: '/worker/map',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      </svg>
    ),
  },
  {
    id: 'messages' as Tab,
    label: 'Messages',
    href: '/worker/messages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    id: 'wallet' as Tab,
    label: 'Wallet',
    href: '/worker/wallet',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M22 9V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2v-2a2 2 0 000-4zM15 13a1 1 0 110-2 1 1 0 010 2z" />
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
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 150 }}
          />
          <div style={{
            position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
            width: '100%', maxWidth: 390,
            background: 'var(--paper)',
            borderRadius: '20px 20px 0 0',
            zIndex: 160,
            border: '2px solid var(--ink)',
            borderBottom: 'none',
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

      {/* White gradient nav */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          height: 112,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(247,248,250,0.88) 40%, #F7F8FA 64%)',
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
                {tab.icon}
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

          {/* Avatar / More */}
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
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--ink)',
              border: `2px solid ${menuOpen || active === 'menu' ? ACTIVE : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.15s ease',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12, color: '#fff' }}>J</span>
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
