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
        background: 'var(--green)',
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
        @keyframes logo-rise {
          0%   { opacity: 0; transform: translateY(24px) scale(0.95); }
          60%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
          80%  { transform: translateY(2px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ring-out {
          0%   { transform: scale(0.6); opacity: 0.5; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes hint-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 0.5; transform: translateY(0); }
        }
        .splash-logo {
          animation: logo-rise 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
          opacity: 0;
        }
        .splash-ring {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 2px solid rgba(0,0,0,0.15);
          animation: ring-out 2s ease-out 0.7s infinite;
        }
        .splash-ring-2 {
          animation-delay: 1.1s;
        }
        .splash-hint {
          animation: hint-in 0.5s ease forwards 1.4s;
          opacity: 0;
        }
      `}</style>

      <StatusBar time="10:12" />

      <div className="splash-ring" />
      <div className="splash-ring splash-ring-2" />

      <img
        src="/LOGO-blsck.svg"
        alt="shift"
        className="splash-logo"
        style={{ width: 160, display: 'block', position: 'relative', zIndex: 1 }}
      />

      <p className="splash-hint" style={{
        position: 'absolute',
        bottom: 52,
        fontFamily: 'var(--body)',
        fontSize: 11,
        color: 'rgba(0,0,0,0.5)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        tap to continue
      </p>
    </Link>
  );
}
