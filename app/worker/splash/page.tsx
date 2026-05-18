import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function WorkerSplash() {
  return (
    <Link
      href="/worker/slides"
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <StatusBar dark time="9:41" />

      {/* Wordmark */}
      <h1 style={{
        fontFamily: 'var(--sans)',
        fontWeight: 900,
        fontSize: 96,
        letterSpacing: '-0.075em',
        color: 'var(--hydrant)',
        lineHeight: 1,
        margin: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        shift
      </h1>

      {/* Tap hint */}
      <p style={{
        position: 'absolute',
        bottom: 52,
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        tap to continue
      </p>
    </Link>
  );
}
