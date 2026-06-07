'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const LETTERS = [
  { char: 'S', color: '#72c15f', rot: -12 },
  { char: 'H', color: '#f7dd6d', rot: 8 },
  { char: 'I', color: '#F2B6E0', rot: -10 },
  { char: 'F', color: '#9A7CE0', rot: 9 },
  { char: 'T', color: '#E5391F', rot: -7 },
];

export default function Home() {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 850);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      maxWidth: 390, minHeight: '100vh', margin: '0 auto',
      background: 'var(--paper)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes letter-drop {
          0%   { opacity: 0; transform: translateY(-80px) rotate(var(--r)) scale(0.5); }
          55%  { opacity: 1; transform: translateY(8px) rotate(calc(var(--r)*-0.15)) scale(1.12); }
          72%  { transform: translateY(-4px) rotate(0deg) scale(0.96); }
          86%  { transform: translateY(2px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cta-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .letter-drop { animation: letter-drop 0.72s cubic-bezier(0.34,1.4,0.64,1) both; }
        .cta-in { animation: cta-in 0.4s ease forwards; opacity: 0; }
      `}</style>

      <div style={{ display: 'flex', marginBottom: 36 }}>
        {LETTERS.map((l, i) => (
          <span
            key={l.char}
            className="letter-drop"
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 84,
              letterSpacing: '-0.06em',
              lineHeight: 1,
              color: settled ? 'var(--ink)' : l.color,
              transition: settled ? `color 0.25s ease ${i * 30}ms` : 'none',
              animationDelay: `${i * 65}ms`,
              display: 'inline-block',
              '--r': `${l.rot}deg`,
            } as React.CSSProperties}
          >
            {l.char}
          </span>
        ))}
      </div>

      <p className="cta-in" style={{
        fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mute)',
        marginBottom: 32, textAlign: 'center',
        animationDelay: '1.1s',
      }}>
        NYC hyperlocal labor marketplace
      </p>

      <div className="cta-in" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '82%', animationDelay: '1.25s' }}>
        <Link href="/worker/splash" style={{
          display: 'block', padding: '15px', background: 'var(--ink)', borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: '#fff',
          textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
        }}>
          I need work →
        </Link>
        <Link href="/employer/dashboard" style={{
          display: 'block', padding: '14px', background: 'transparent', border: '2px solid var(--ink)', borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)',
          textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
        }}>
          I need workers
        </Link>
      </div>
    </div>
  );
}
