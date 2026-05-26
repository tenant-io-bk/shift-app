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
      gap: 22,
    }}>
      <style>{`
        @keyframes fill-up {
          0%   { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes sub-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* SHIFT fill logo */}
      <div style={{ position: 'relative', lineHeight: 0.9 }}>
        {/* Ghost base */}
        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 88,
          color: 'rgba(255,255,255,0.08)',
          letterSpacing: '-0.075em',
          lineHeight: 0.9,
          userSelect: 'none',
        }}>SHIFT.</div>

        {/* Colour fill — reveals bottom to top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 88,
          letterSpacing: '-0.075em',
          lineHeight: 0.9,
          whiteSpace: 'nowrap',
          background: 'linear-gradient(to top, #72c15f 0%, #9A7CE0 45%, #E5391F 75%, #f7dd6d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'fill-up 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both',
        }}>SHIFT.</div>
      </div>

      <span style={{
        fontFamily: 'var(--body)',
        fontSize: 11,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        animation: 'sub-in 0.5s ease 1.6s both',
      }}>
        Matching workers nearby
      </span>
    </div>
  );
}
