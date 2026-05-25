'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'home' | 'map' | 'messages' | 'wallet' | 'menu';

const TABS = [
  {
    id: 'home' as Tab,
    label: 'Home',
    href: '/worker/home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'map' as Tab,
    label: 'Map',
    href: '/worker/map',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="9" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M11 2C7.13 2 4 5.13 4 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'messages' as Tab,
    label: 'Messages',
    href: '/worker/messages',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'wallet' as Tab,
    label: 'Wallet',
    href: '/worker/wallet',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M2 10h18" stroke="currentColor" strokeWidth="1.6" />
        <rect x="14" y="13" width="4" height="3" rx="1.5" fill="currentColor" />
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
      {/* Menu overlay */}
      {menuOpen && (
        <>
          {/* Scrim */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              zIndex: 150,
            }}
          />

          {/* Sheet */}
          <div
            style={{
              position: 'fixed',
              bottom: 72,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 390,
              background: 'var(--paper)',
              borderRadius: '20px 20px 0 0',
              zIndex: 160,
              borderTop: '2px solid var(--ink)',
              borderLeft: '2px solid var(--ink)',
              borderRight: '2px solid var(--ink)',
              overflow: 'hidden',
            }}
          >
            {/* Drag handle */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '12px 0 8px',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 99,
                  background: 'var(--line)',
                }}
              />
            </div>

            {/* Worker mini card */}
            <div
              style={{
                padding: '6px 22px 16px',
                borderBottom: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#fff',
                  }}
                >
                  J
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 700,
                    fontSize: 16,
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Jordan M.
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    color: 'var(--mute)',
                    marginTop: 2,
                  }}
                >
                  4.9★ · Barista · Server
                </div>
              </div>
            </div>

            {/* Menu items */}
            {MENU_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px 22px',
                  borderBottom:
                    i < MENU_ITEMS.length - 1 ? '1px solid var(--line)' : 'none',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'var(--ink)',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 16,
                    color: 'var(--mute)',
                  }}
                >
                  →
                </span>
              </Link>
            ))}

            {/* Sign out */}
            <button
              style={{
                width: '100%',
                padding: '14px 22px',
                background: 'none',
                border: 'none',
                borderTop: '1px solid var(--line)',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'var(--mute)',
              }}
            >
              Sign out
            </button>
          </div>
        </>
      )}

      {/* Nav bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          height: 72,
          background: '#0D0E12',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 8,
          zIndex: 100,
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
                gap: 4,
                color: isActive ? '#72c15f' : 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                minWidth: 52,
                paddingTop: 8,
              }}
            >
              {tab.icon}
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}

        {/* Menu button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color:
              menuOpen || active === 'menu'
                ? '#72c15f'
                : 'rgba(255,255,255,0.35)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            minWidth: 52,
            paddingTop: 8,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M3 6h16M3 11h16M3 16h16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            More
          </span>
        </button>
      </div>
    </>
  );
}
