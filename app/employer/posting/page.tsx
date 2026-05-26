'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PostingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/employer/shift-posted'), 2800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style>{`
        @keyframes fill-up {
          0%   { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0% 0 0 0); }
        }
      `}</style>

      {/* Logo stack: ghost + green fill */}
      <div style={{ position: 'relative', width: 220 }}>
        {/* Ghost base */}
        <img
          src="/LOGO-white.svg"
          alt=""
          style={{ width: 220, height: 'auto', opacity: 0.1, display: 'block' }}
        />
        {/* Green fill, reveals bottom to top */}
        <img
          src="/LOGO-green.svg"
          alt="SHIFT"
          style={{
            position: 'absolute',
            inset: 0,
            width: 220,
            height: 'auto',
            display: 'block',
            animation: 'fill-up 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both',
          }}
        />
      </div>
    </div>
  );
}
