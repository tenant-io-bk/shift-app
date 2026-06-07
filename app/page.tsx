import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      maxWidth: 390, minHeight: '100vh', margin: '0 auto',
      background: 'var(--green)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      padding: '0 32px',
    }}>
      <img
        src="/LOGO-blsck.svg"
        alt="SHIFT"
        style={{ width: 180, display: 'block', marginBottom: 48 }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
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
