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
      <style>{`
        @keyframes logo-in {
          0%   { opacity: 0; transform: scale(0.82); }
          65%  { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes logo-glow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(114,193,95,0)); }
          50%       { filter: drop-shadow(0 0 18px rgba(114,193,95,0.45)); }
        }
        .splash-logo {
          animation:
            logo-in   0.75s cubic-bezier(0.34,1.56,0.64,1) forwards,
            logo-glow 3.2s ease-in-out 0.75s infinite;
          opacity: 0;
        }
        @keyframes hint-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .splash-hint {
          animation: hint-in 0.5s ease forwards 1.4s;
          opacity: 0;
        }
      `}</style>

      <StatusBar dark time="9:41" />

      <img
        src="/LOGO-green.svg"
        alt="shift"
        className="splash-logo"
        style={{ width: 160, display: 'block', position: 'relative', zIndex: 1 }}
      />

      <p className="splash-hint" style={{
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
