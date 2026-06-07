'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LETTERS = [
  { char: 'S', color: '#72c15f', tx: '-120px', ty: '-50px', rot: '-16deg' },
  { char: 'H', color: '#f7dd6d', tx: '130px',  ty: '-90px', rot: '13deg'  },
  { char: 'I', color: '#F2B6E0', tx: '-90px',  ty: '100px', rot: '-11deg' },
  { char: 'F', color: '#9A7CE0', tx: '120px',  ty: '70px',  rot: '15deg'  },
  { char: 'T', color: '#E5391F', tx: '-40px',  ty: '-130px',rot: '-7deg'  },
];

export default function PostingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'posting' | 'accepted'>('posting');

  useEffect(() => {
    const t = setTimeout(() => setPhase('accepted'), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes post-letter {
          0%   { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(0.15); }
          55%  { opacity: 1; transform: translate(calc(var(--tx) * -0.08), calc(var(--ty) * -0.08)) rotate(calc(var(--r) * -0.15)) scale(1.08); }
          75%  { transform: translate(0, 0) rotate(0.8deg) scale(0.97); }
          90%  { transform: translate(0, 0) rotate(-0.3deg) scale(1.01); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        .post-letter { animation: post-letter 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes sub-label {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sub-label { animation: sub-label 0.4s ease forwards; opacity: 0; }
        @keyframes slide-up-notif {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .blink-dot { animation: dot-blink 1s ease-in-out infinite; }
        .blink-dot:nth-child(2) { animation-delay: 0.2s; }
        .blink-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div style={{ display: 'flex', gap: 2, marginBottom: 28 }}>
        {LETTERS.map((l, i) => (
          <span
            key={l.char}
            className="post-letter"
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 80,
              lineHeight: 1,
              color: l.color,
              display: 'inline-block',
              animationDelay: `${i * 80}ms`,
              '--tx': l.tx,
              '--ty': l.ty,
              '--r': l.rot,
            } as React.CSSProperties}
          >
            {l.char}
          </span>
        ))}
      </div>

      {phase === 'posting' && (
        <p className="sub-label" style={{
          fontFamily: 'var(--body)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.06em',
          animationDelay: '1.1s',
          display: 'flex',
          gap: 3,
          alignItems: 'center',
        }}>
          Posting
          <span className="blink-dot">.</span>
          <span className="blink-dot">.</span>
          <span className="blink-dot">.</span>
        </p>
      )}

      {phase === 'accepted' && (
        <div
          onClick={() => router.replace('/employer/roster')}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
            borderRadius: '24px 24px 0 0',
            padding: '28px 24px 56px',
            animation: 'slide-up-notif 0.45s cubic-bezier(0.22,1,0.36,1) forwards',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Marco C. accepted.
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'rgba(13,14,18,0.55)', marginTop: 4 }}>
                Filled in 1 min 24 sec · tap to track
              </div>
            </div>
            <span style={{ fontFamily: 'var(--body)', fontSize: 18, color: 'var(--mute)' }}>→</span>
          </div>
        </div>
      )}
    </div>
  );
}
