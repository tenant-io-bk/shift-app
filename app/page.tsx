import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function Home() {
  return (
    <div style={{
      maxWidth: 390, minHeight: '100vh', margin: '0 auto',
      background: 'var(--paper)', display: 'flex', flexDirection: 'column',
      padding: '0 22px 52px',
    }}>
      <StatusBar time="10:12" />

      {/* Logo — centered, small */}
      <div style={{ textAlign: 'center', paddingTop: 8, marginBottom: 28 }}>
        <img src="/LOGO-blsck.svg" alt="SHIFT" style={{ width: 72, display: 'inline-block' }} />
      </div>

      {/* Main typographic display */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 400,
          fontSize: 80,
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
        }}>
          <div>Are you</div>

          {/* "looking" — green pill */}
          <div style={{ marginTop: 4, marginBottom: 4 }}>
            <Link href="/worker/slides" style={{
              display: 'inline-block',
              background: 'var(--green)',
              borderRadius: 99,
              padding: '6px 22px 10px',
              textDecoration: 'none',
              color: 'var(--ink)',
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              fontSize: 80,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}>
              looking
            </Link>
          </div>

          <div>for a SHIFT,</div>

          {/* "or filling" row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, marginBottom: 4 }}>
            <span>or</span>
            <Link href="/employer/slides" style={{
              display: 'inline-block',
              background: 'var(--ink)',
              borderRadius: 99,
              padding: '6px 22px 10px',
              textDecoration: 'none',
              color: '#fff',
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              fontSize: 80,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}>
              filling
            </Link>
          </div>

          <div>a SHIFT?</div>
        </div>
      </div>

      {/* Bottom caption */}
      <p style={{
        fontFamily: 'var(--body)',
        fontSize: 14,
        color: 'var(--mute)',
      }}>
        Pick your path. You can always switch later.
      </p>
    </div>
  );
}
