'use client';

import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

const LETTERS = [
  { char: 'S', sx: '-160px', sy: '-40px', rot: '-18deg' },
  { char: 'H', sx: '140px',  sy: '-120px', rot: '14deg' },
  { char: 'I', sx: '-80px',  sy: '130px',  rot: '-12deg' },
  { char: 'F', sx: '160px',  sy: '80px',   rot: '16deg' },
  { char: 'T', sx: '-40px',  sy: '-150px', rot: '-8deg' },
];

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
        @keyframes letter-fly {
          0%   { opacity: 0; transform: translate(var(--sx), var(--sy)) rotate(var(--r)) scale(0.2); }
          55%  { opacity: 1; transform: translate(calc(var(--sx) * -0.12), calc(var(--sy) * -0.12)) rotate(calc(var(--r) * -0.2)) scale(1.08); }
          75%  { transform: translate(calc(var(--sx) * 0.04), calc(var(--sy) * 0.04)) rotate(1deg) scale(0.97); }
          90%  { transform: translate(0, 0) rotate(-0.5deg) scale(1.01); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        .letter-fly { animation: letter-fly 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes tap-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .tap-fade { animation: tap-fade 0.5s ease forwards; opacity: 0; }
      `}</style>

      <StatusBar time="10:12" />

      <div style={{ display: 'flex', gap: 2, marginBottom: 0 }}>
        {LETTERS.map((l, i) => (
          <span
            key={l.char}
            className="letter-fly"
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 84,
              lineHeight: 1,
              color: '#0D0E12',
              display: 'inline-block',
              animationDelay: `${i * 90}ms`,
              '--sx': l.sx,
              '--sy': l.sy,
              '--r': l.rot,
            } as React.CSSProperties}
          >
            {l.char}
          </span>
        ))}
      </div>

      <p
        className="tap-fade"
        style={{
          position: 'absolute',
          bottom: 52,
          fontFamily: 'var(--body)',
          fontSize: 11,
          color: 'rgba(0,0,0,0.4)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
          animationDelay: '1.3s',
        }}
      >
        tap to continue
      </p>
    </Link>
  );
}
