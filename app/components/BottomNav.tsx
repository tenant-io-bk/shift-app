import Link from 'next/link';

type Tab = 'shifts' | 'map' | 'wallet' | 'profile';

type BottomNavProps = {
  active: Tab;
};

const tabs: { id: Tab; label: string; href: string; icon: React.ReactNode }[] = [
  {
    id: 'shifts',
    label: 'Shifts',
    href: '/worker/splash',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="12" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="2" y="12" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="12" y="12" width="6" height="6" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: 'Map',
    href: '/worker/map',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5Z"
          fill="currentColor"
        />
        <circle cx="10" cy="7" r="2" fill="white" />
      </svg>
    ),
  },
  {
    id: 'wallet',
    label: 'Wallet',
    href: '/worker/wallet',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="11" width="3" height="3" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/worker/splash',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          d="M3 17c0-3.31 3.13-6 7-6s7 2.69 7 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
];

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <div
      style={{
        height: 64,
        background: 'var(--card)',
        borderTop: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 4,
      }}
    >
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
              gap: 3,
              color: isActive ? 'var(--hydrant)' : 'var(--mute)',
              textDecoration: 'none',
              minWidth: 48,
            }}
          >
            {tab.icon}
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
