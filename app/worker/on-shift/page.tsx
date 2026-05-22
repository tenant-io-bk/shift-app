import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function OnShift() {
  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        padding: 22,
      }}
    >
      <style>{`
        @keyframes on-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .on-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #EA4B2A;
          animation: on-pulse-ring 2s ease-out infinite;
        }
        @keyframes slide-hint {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }
        .slide-knob-hint { animation: slide-hint 2s ease-in-out infinite; }
      `}</style>

      <StatusBar time="1:14 PM" />

      {/* Top badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          padding: '5px 12px',
          background: 'var(--paper-2)',
          border: '1px solid var(--line)',
          borderRadius: 99,
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--mute)',
          }}
        >
          SHIFT · ON THE CLOCK
        </span>
      </div>

      {/* Pulsing indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
        <div style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
          <div className="on-pulse-ring" />
          <div style={{ position: 'relative', width: 7, height: 7, borderRadius: '50%', background: '#EA4B2A', zIndex: 1 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>
          On shift · Padmore's · #4471
        </span>
      </div>

      {/* Big timer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 80,
            color: 'var(--ink)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          02:14:38
        </div>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginTop: 6 }}>
          $28.00/hr
        </p>
      </div>

      {/* Earned box */}
      <div
        style={{
          padding: '16px 18px',
          background: 'var(--paper-2)',
          border: '2px solid var(--ink)',
          borderRadius: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            $62<span style={{ color: '#72c15f' }}>.</span>
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>
            earned so far · 45%
          </span>
        </div>
        <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '62%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
      </div>

      {/* Contact row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingTop: 14,
          borderTop: '1px solid var(--line)',
          marginTop: 16,
        }}
      >
        <div
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #c4a577, #8b6545 60%, #5c3d22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'white' }}>T</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Tomás</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>Owner · Padmore's</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 32, height: 32, border: '2px solid var(--ink)', borderRadius: 99, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h10c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H4l-3 3V3c0-.55.45-1 1-1Z" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </button>
          <button style={{ width: 32, height: 32, border: '2px solid var(--ink)', borderRadius: 99, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 2C2.5 2 1 2 1 4c0 5 3.5 9 9 9 2 0 2-1.5 2-1.5v-2s0-1-1.5-1c-.5 0-1 .5-1 .5C8.5 9.5 6 7 5.5 6l.5-1c0 0 .5-.5.5-1 0-1.5-1-1.5-1-1.5H3Z" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Help link */}
      <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', textAlign: 'center', marginTop: 8, textDecoration: 'underline', cursor: 'pointer' }}>
        Need a hand? Call SHIFT
      </p>

      {/* Slide to clock out */}
      <Link
        href="/worker/paid-out"
        style={{
          marginTop: 'auto',
          marginBottom: 16,
          paddingTop: 16,
          display: 'flex',
          alignItems: 'center',
          height: 56,
          background: 'var(--ink)',
          borderRadius: 99,
          padding: '4px',
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="slide-knob-hint"
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, zIndex: 1,
          }}
        >
          <span style={{ color: 'var(--ink)', fontSize: 18, lineHeight: 1 }}>→</span>
        </div>
        <span
          style={{
            flex: 1, textAlign: 'center',
            fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            paddingRight: 48,
          }}
        >
          Slide to clock out
        </span>
      </Link>
    </div>
  );
}
