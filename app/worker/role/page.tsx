import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function RolePicker() {
  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <StatusBar time="10:12" />

      {/* Wordmark */}
      <div style={{ textAlign: 'center', padding: '20px 0 0' }}>
        <img src="/LOGO-blsck.svg" alt="shift" style={{ width: 80, display: 'inline-block' }} />
      </div>

      {/* Main content */}
      <div style={{ padding: '32px 24px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 80,
          letterSpacing: '-0.075em',
          lineHeight: 1.13,
          color: 'var(--ink)',
          textAlign: 'left',
          marginBottom: 0,
          flex: 1,
        }}>
          Are you<br />
          <Link
            href="/v3/phone-verify"
            style={{
              background: 'var(--green)',
              borderRadius: 99,
              padding: '0 22px 6px',
              display: 'inline-block',
              color: 'var(--ink)',
              textDecoration: 'none',
              lineHeight: 1.2,
            }}
          >
            looking
          </Link>
          <br />
          for a SHIFT,<br />
          or{' '}
          <Link
            href="/employer/create-account"
            style={{
              background: 'var(--ink)',
              borderRadius: 99,
              padding: '0 22px 6px',
              display: 'inline-block',
              color: '#fff',
              textDecoration: 'none',
              lineHeight: 1.2,
            }}
          >
            filling
          </Link>
          <br />
          a SHIFT?
        </h1>

        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 13,
          color: 'var(--mute)',
          lineHeight: 1.5,
          textAlign: 'left',
          paddingBottom: 48,
        }}>
          Pick your path. You can always switch later.
        </p>
      </div>
    </div>
  );
}
