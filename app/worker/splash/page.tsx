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
      <img
        src="/LOGO-green.svg"
        alt="shift"
        style={{ width: 160, display: 'block', position: 'relative', zIndex: 1 }}
      />

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
