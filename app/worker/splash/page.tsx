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
        @keyframes logo-jump {
          0%   { opacity: 0; transform: translateY(110px) scale(0.88); }
          55%  { opacity: 1; transform: translateY(-18px) scale(1.06); }
          72%  { transform: translateY(9px)  scale(0.97); }
          85%  { transform: translateY(-5px) scale(1.02); }
          93%  { transform: translateY(2px)  scale(0.99); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes logo-glow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(114,193,95,0)); }
          50%       { filter: drop-shadow(0 0 20px rgba(114,193,95,0.5)); }
        }
        .splash-logo {
          animation:
            logo-jump 0.9s cubic-bezier(0.22,1,0.36,1) forwards,
            logo-glow 3.2s ease-in-out 0.9s infinite;
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
