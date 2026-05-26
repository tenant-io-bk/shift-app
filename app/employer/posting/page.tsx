'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PostingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/employer/shift-posted'), 3400);
    return () => clearTimeout(t);
  }, [router]);

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
        @keyframes ring-burst {
          0%   { transform: scale(0.2); opacity: 0.9; }
          100% { transform: scale(5);   opacity: 0; }
        }
        @keyframes text-jump {
          0%   { opacity: 0; transform: translateY(60px) scale(0.9); }
          55%  { opacity: 1; transform: translateY(-12px) scale(1.05); }
          72%  { transform: translateY(6px) scale(0.97); }
          86%  { transform: translateY(-3px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes brand-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes sub-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dot-scatter {
          0%   { transform: translate(0, 0) scale(0); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(1); opacity: 0.6; }
        }
        .ring-1 { animation: ring-burst 2.4s cubic-bezier(0.1, 0.4, 0.4, 1) 0s infinite; }
        .ring-2 { animation: ring-burst 2.4s cubic-bezier(0.1, 0.4, 0.4, 1) 0.7s infinite; }
        .ring-3 { animation: ring-burst 2.4s cubic-bezier(0.1, 0.4, 0.4, 1) 1.4s infinite; }
      `}</style>

      {/* Expanding colour rings */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div className="ring-1" style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', border: '2.5px solid #72c15f' }} />
        <div className="ring-2" style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', border: '2.5px solid #9A7CE0' }} />
        <div className="ring-3" style={{ position: 'absolute', width: 80, height: 80, borderRadius: '50%', border: '2.5px solid #E5391F' }} />
      </div>

      {/* Scattered worker dots */}
      {[
        { dx: '-120px', dy: '-80px',  delay: 0.2,  color: '#72c15f' },
        { dx: '110px',  dy: '-90px',  delay: 0.35, color: '#9A7CE0' },
        { dx: '-100px', dy: '70px',   delay: 0.5,  color: '#72c15f' },
        { dx: '130px',  dy: '60px',   delay: 0.15, color: '#f7dd6d' },
        { dx: '-50px',  dy: '-130px', delay: 0.45, color: '#E5391F' },
        { dx: '60px',   dy: '120px',  delay: 0.3,  color: '#72c15f' },
        { dx: '-140px', dy: '20px',   delay: 0.6,  color: '#9A7CE0' },
        { dx: '80px',   dy: '-110px', delay: 0.25, color: '#72c15f' },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 9, height: 9,
          borderRadius: '50%',
          background: d.color,
          '--dx': d.dx,
          '--dy': d.dy,
          animation: `dot-scatter 2s cubic-bezier(0.22,1,0.36,1) ${d.delay}s both`,
        } as React.CSSProperties} />
      ))}

      {/* Core content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, position: 'relative', zIndex: 1 }}>
        {/* Brand spinner */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
          background: 'conic-gradient(#72c15f 0deg, #9A7CE0 90deg, #E5391F 180deg, #f7dd6d 270deg, #72c15f 360deg)',
          WebkitMask: 'radial-gradient(transparent 52%, black 53%)',
          mask: 'radial-gradient(transparent 52%, black 53%)',
          animation: 'brand-spin 1s linear infinite',
        }} />

        {/* POSTING. text — physics jump */}
        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 56,
          color: '#fff',
          letterSpacing: '-0.075em',
          lineHeight: 0.9,
          animation: 'text-jump 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s both',
        }}>
          POSTING<span style={{ color: '#72c15f' }}>.</span>
        </div>

        {/* Subtext */}
        <span style={{
          fontFamily: 'var(--body)',
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          animation: 'sub-in 0.5s ease 1.1s both',
        }}>
          Matching workers nearby
        </span>
      </div>
    </div>
  );
}
