'use client';

import Link from 'next/link';

type Tab = 'dashboard' | 'post' | 'shifts' | 'messages' | 'account';

const ACTIVE = 'var(--ink)';
const INACTIVE = 'var(--ink)';

const TABS: { id: Tab; label: string; href: string; icon: React.ReactNode }[] = [
  {
    id: 'dashboard',
    label: 'Home',
    href: '/employer/dashboard',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="9" height="9" rx="2" />
        <rect x="13" y="2" width="9" height="9" rx="2" />
        <rect x="2" y="13" width="9" height="9" rx="2" />
        <rect x="13" y="13" width="9" height="9" rx="2" />
      </svg>
    ),
  },
  {
    id: 'post',
    label: 'Post',
    href: '/employer/post-shift',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
    ),
  },
  {
    id: 'shifts',
    label: 'Shifts',
    href: '/employer/roster',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-5h5v5zm5 0h-3v-5h3v5zm0-7H7V6h10v4z" />
      </svg>
    ),
  },
  {
    id: 'messages',
    label: 'Messages',
    href: '/employer/messages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    id: 'account',
    label: 'Account',
    href: '/employer/account',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

export default function EmployerNav({ active }: { active: Tab }) {
  return (
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
      </div>
    </div>
  );
}
