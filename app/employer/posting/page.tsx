'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PostingPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push('/employer/shift-posted'), 3200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: '#fcfcfc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style>{`
        @keyframes logo-outline-fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .logo-outline-fill {
          animation: logo-outline-fill 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fade-in 0.6s ease forwards;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {/* Logo fill animation */}
        <div style={{ position: 'relative', height: 56 }}>
          {/* Outline base */}
          <img
            src="/LOGO-white.svg"
            alt=""
            style={{ position: 'absolute', top: 0, left: 0, height: 56, opacity: 0.12, display: 'block' }}
          />
          {/* Green fill clips in left-to-right */}
          <div
            className="logo-outline-fill"
            style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', height: 56 }}
          >
            <img src="/LOGO-green.svg" alt="shift" style={{ height: 56, display: 'block' }} />
          </div>
        </div>

        {/* Posting status */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--hydrant)',
                  animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--ink)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            opacity: 0.5,
          }}>
            Posting your shift
          </span>
        </div>
      </div>
    </div>
  );
}
