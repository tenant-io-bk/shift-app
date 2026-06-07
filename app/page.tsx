import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function Splash() {
  return (
    <Link
      href="/worker/slides"
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--green)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <StatusBar time="10:12" />

      <img
        src="/LOGO-blsck.svg"
        alt="SHIFT"
        style={{ width: 160, display: 'block' }}
      />

      <p style={{
        position: 'absolute',
        bottom: 52,
        fontFamily: 'var(--body)',
        fontSize: 11,
        color: 'rgba(0,0,0,0.45)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        tap to continue
      </p>
    </Link>
  );
}
