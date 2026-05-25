import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

type Tab = 'dashboard' | 'post' | 'shifts' | 'messages' | 'account';

export default function EmployerNav({ active }: { active: Tab }) {
  const tabs: { id: Tab; label: string; href: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Home',
      href: '/employer/dashboard',
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
      id: 'post',
      label: 'Post',
      href: '/employer/post-shift',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M11 7v8M7 11h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'shifts',
      label: 'Shifts',
      href: '/employer/roster',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="4" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M7 2v4M15 2v4M3 9h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="6" y="13" width="3" height="3" rx="1" fill="currentColor" />
          <rect x="13" y="13" width="3" height="3" rx="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'messages',
      label: 'Messages',
      href: '/employer/messages',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7l-4 3V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'account',
      label: 'Account',
      href: '/employer/account',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M7 9h8M7 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 390, height: 72,
      background: '#0D0E12', borderTop: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      paddingBottom: 8, zIndex: 100,
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <Link key={tab.id} href={tab.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: isActive ? '#72c15f' : 'rgba(255,255,255,0.35)',
            textDecoration: 'none', minWidth: 52, paddingTop: 8,
          }}>
            {tab.icon}
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
