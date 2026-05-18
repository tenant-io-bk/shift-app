import Link from 'next/link';

type Tab = 'shifts' | 'wallet' | 'notifications' | 'profile';

type BottomNavProps = {
  active: Tab;
};

const tabs: { id: Tab; label: string; href: string; icon: React.ReactNode }[] = [
  {
    id: 'shifts',
    label: 'Shifts',
    href: '/worker/map',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="2" fill="currentColor" />
        <rect x="13" y="2" width="7" height="7" rx="2" fill="currentColor" />
        <rect x="2" y="13" width="7" height="7" rx="2" fill="currentColor" />
        <rect x="13" y="13" width="7" height="7" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'wallet',
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
  {
    id: 'notifications',
    label: 'Alerts',
    href: '/worker/notifications',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3a6 6 0 0 0-6 6v3l-2 3h16l-2-3V9a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        <path d="M9 16a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/worker/profile',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M3 19c0-3.87 3.58-7 8-7s8 3.13 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <div style={{
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
    }}>
      {tabs.map((tab) => {
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
            <span style={{
              fontFamily: 'var(--mono)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
