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

      {/* Background texture rings */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.08)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: 420,
        height: 420,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: 240,
        height: 240,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.12)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Wordmark */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 800,
          fontSize: 96,
          letterSpacing: '-0.04em',
          color: '#FFFFFF',
          lineHeight: 1,
          margin: 0,
        }}>
          shift<span style={{ color: 'var(--hydrant)' }}>.</span>
        </h1>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginTop: 16,
        }}>
          NYC · Hyperlocal Labor
        </p>
      </div>

      {/* Tap hint */}
      <p style={{
        position: 'absolute',
        bottom: 52,
        fontFamily: 'var(--mono)',
        fontSize: 11,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        tap to continue
      </p>
    </Link>
  );
}
