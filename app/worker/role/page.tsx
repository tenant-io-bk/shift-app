import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function RolePicker() {
  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <StatusBar dark time="9:41" />

      {/* Top wordmark */}
      <div style={{ padding: '28px 28px 0' }}>
        <span style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 28,
          color: '#FFFFFF',
          letterSpacing: '-0.075em',
        }}>
          shift<span style={{ color: '#72c15f' }}>.</span>
        </span>
      </div>

      {/* Main question */}
      <div style={{ padding: '36px 28px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 42,
          letterSpacing: '-0.035em',
          lineHeight: 1.0,
          color: '#FFFFFF',
          marginBottom: 8,
        }}>
          Are you here to work a shift
          <span style={{ color: 'rgba(255,255,255,0.3)' }}> or fill one?</span>
        </h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'rgba(255,255,255,0.4)',
          marginTop: 16,
          marginBottom: 48,
          lineHeight: 1.5,
        }}>
          Pick your path. You can always switch later.
        </p>

        {/* Worker option */}
        <Link
          href="/v3/phone-verify"
          style={{
            display: 'block',
            padding: '28px 24px',
            background: '#72c15f',
            borderRadius: 18,
            textDecoration: 'none',
            marginBottom: 12,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            right: -20,
            top: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }} />
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 8,
          }}>
            I need work
          </div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 28,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 10,
          }}>
            Work a shift →
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.5,
          }}>
            Browse openings near you. Same-day pay.
          </div>
        </Link>

        {/* Employer option */}
        <Link
          href="/employer/create-account"
          style={{
            display: 'block',
            padding: '28px 24px',
            background: '#FFFFFF',
            borderRadius: 18,
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            right: -20,
            top: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(13,14,18,0.04)',
          }} />
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
            letterSpacing: '-0.02em',
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
          color: 'rgba(255,255,255,0.3)',
          textAlign: 'center',
          marginTop: 28,
          paddingBottom: 48,
        }}>
          Already on SHIFT?{' '}
          <span style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'underline', cursor: 'pointer' }}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
