import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function RolePicker() {
  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: 'var(--hydrant)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <StatusBar time="9:41" />

      {/* Top wordmark */}
      <div style={{ padding: '28px 28px 0' }}>
        <span style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 28,
          color: 'var(--ink)',
          letterSpacing: '-0.075em',
        }}>
          shift<span style={{ color: '#fff' }}>.</span>
        </span>
      </div>

      {/* Main question */}
      <div style={{ padding: '36px 28px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 42,
          letterSpacing: '-0.075em',
          lineHeight: 1.0,
          color: 'var(--ink)',
          marginBottom: 8,
        }}>
          Are you here to work a shift or fill one?
        </h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'rgba(13,14,18,0.5)',
          marginTop: 16,
          marginBottom: 48,
          lineHeight: 1.5,
        }}>
          Pick your path. You can always switch later.
        </p>

        {/* Worker option — black */}
        <Link
          href="/v3/phone-verify"
          style={{
            display: 'block',
            padding: '28px 24px',
            background: 'var(--ink)',
            borderRadius: 18,
            textDecoration: 'none',
            marginBottom: 12,
          }}
        >
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 8,
          }}>
            I need work
          </div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 28,
            color: '#FFFFFF',
            letterSpacing: '-0.075em',
            lineHeight: 1.1,
            marginBottom: 10,
          }}>
            Work a shift →
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.5,
          }}>
            Browse openings near you. Same-day pay.
          </div>
        </Link>

        {/* Employer option — white */}
        <Link
          href="/employer/create-account"
          style={{
            display: 'block',
            padding: '28px 24px',
            background: '#FFFFFF',
            borderRadius: 18,
            textDecoration: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(13,14,18,0.4)',
            marginBottom: 8,
          }}>
            I need workers
          </div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 28,
            color: '#0D0E12',
            letterSpacing: '-0.075em',
            lineHeight: 1.1,
            marginBottom: 10,
          }}>
            Fill a shift →
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'rgba(13,14,18,0.5)',
            lineHeight: 1.5,
          }}>
            Post in 60 seconds. Confirmed workers fast.
          </div>
        </Link>

        {/* Sign in */}
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          color: 'rgba(13,14,18,0.4)',
          textAlign: 'center',
          marginTop: 28,
          paddingBottom: 48,
        }}>
          Already on SHIFT?{' '}
          <span style={{ color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer' }}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
