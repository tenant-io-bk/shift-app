import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      maxWidth: 390, minHeight: '100vh', margin: '0 auto',
      background: 'var(--paper)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <img
        src="/LOGO-blsck.svg"
        alt="SHIFT"
        style={{ width: 180, display: 'block', marginBottom: 36 }}
      />

      <p style={{
        fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mute)',
        marginBottom: 32, textAlign: 'center',
      }}>
        NYC hyperlocal labor marketplace
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '82%' }}>
        <Link href="/worker/splash" style={{
          display: 'block', padding: '15px', background: 'var(--ink)', borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: '#fff',
          textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
        }}>
          I need work →
        </Link>
        <Link href="/employer/dashboard" style={{
          display: 'block', padding: '14px', background: 'transparent', border: '2px solid var(--ink)', borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)',
          textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
        }}>
          I need workers
        </Link>
      </div>
    </div>
  );
}
