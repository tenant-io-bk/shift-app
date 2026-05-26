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
      <div style={{
        fontFamily: 'var(--sans)',
        fontWeight: 700,
        fontSize: 88,
        letterSpacing: '-0.075em',
        lineHeight: 0.9,
        background: 'linear-gradient(to top, #72c15f 0%, #9A7CE0 45%, #E5391F 75%, #f7dd6d 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>SHIFT.</div>

      <span style={{
        fontFamily: 'var(--body)',
        fontSize: 11,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Matching workers nearby
      </span>
    </div>
  );
}
