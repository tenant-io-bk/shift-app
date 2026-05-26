'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PostingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/employer/shift-posted'), 3000);
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
      gap: 28,
    }}>
      <style>{`
        @keyframes brand-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
        background: 'conic-gradient(#72c15f 0deg, #9A7CE0 90deg, #E5391F 180deg, #f7dd6d 270deg, #72c15f 360deg)',
        WebkitMask: 'radial-gradient(transparent 52%, black 53%)',
        mask: 'radial-gradient(transparent 52%, black 53%)',
        animation: 'brand-spin 1s linear infinite',
      }} />

      <div style={{ textAlign: 'center', animation: 'fade-up 0.6s ease 0.15s both' }}>
        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 56,
          color: '#fff',
          letterSpacing: '-0.075em',
          lineHeight: 0.9,
          marginBottom: 14,
        }}>
          POSTING<span style={{ color: '#72c15f' }}>.</span>
        </div>
        <span style={{
          fontFamily: 'var(--body)',
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Matching workers nearby
        </span>
      </div>
    </div>
  );
}
