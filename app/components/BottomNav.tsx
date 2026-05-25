import Link from 'next/link';

type Tab = 'shifts' | 'wallet' | 'notifications' | 'profile';

type BottomNavProps = {
  active: Tab;
};

const tabs: { id: Tab; label: string; href: string; icon: React.ReactNode }[] = [
  {
    id: 'shifts',
    label: 'Home',
    href: '/worker/home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
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
    label: 'Messages',
    href: '/worker/messages',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
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
