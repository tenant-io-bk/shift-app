'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Phase = 'loading' | 'accepted' | 'onway';

export default function PostingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    if (phase === 'loading') {
      const t = setTimeout(() => setPhase('accepted'), 2800);
      return () => clearTimeout(t);
    }
    if (phase === 'onway') {
      const t = setTimeout(() => router.push('/employer/live-map'), 1600);
      return () => clearTimeout(t);
    }
  }, [phase, router]);

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
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fill-up {
          0%   { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0% 0 0 0); }
        }
        @keyframes slide-up-notif {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes fade-in-msg {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Logo — hidden when showing onway message */}
      {phase !== 'onway' && (
        <div style={{ position: 'relative', width: 220 }}>
          <img
            src="/LOGO-white.svg"
            alt=""
            style={{ width: 220, height: 'auto', opacity: 0.1, display: 'block' }}
          />
          <img
            src="/LOGO-green.svg"
            alt="SHIFT"
            style={{
              position: 'absolute',
              inset: 0,
              width: 220,
              height: 'auto',
              display: 'block',
              ...(phase === 'loading'
                ? { animation: 'fill-up 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both' }
                : { clipPath: 'inset(0% 0 0 0)' }),
            }}
          />
        </div>
      )}

      {/* Marco is on the way */}
      {phase === 'onway' && (
        <div style={{ textAlign: 'center', animation: 'fade-in-msg 0.4s cubic-bezier(0.22,1,0.36,1) forwards' }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 44, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 14 }}>
            Marco is<br />on the way.
          </div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Live map activating...
          </div>
        </div>
      )}

      {/* Accepted notification — slides up from bottom */}
      {phase === 'accepted' && (
        <div
          onClick={() => setPhase('onway')}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
            borderRadius: '24px 24px 0 0',
            padding: '28px 24px 52px',
            animation: 'slide-up-notif 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
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
                Filled in 1 min 24 sec
              </div>
            </div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', fontWeight: 600, flexShrink: 0 }}>
              Track →
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
