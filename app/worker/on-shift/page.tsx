'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function OnShift() {
  const router = useRouter();

  return (
    <div style={{
      maxWidth: 390, minHeight: '100vh', margin: '0 auto',
      display: 'flex', flexDirection: 'column',
      background: '#fff',
    }}>
      <style>{`
        @keyframes on-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        .on-dot { animation: on-dot-pulse 2s ease-in-out infinite; }

        @keyframes hg-float {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-14px); }
        }
        .hg-float { animation: hg-float 3s ease-in-out infinite alternate; }

        @keyframes drip {
          0%   { transform: translateY(0px); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
        .drip-1 { animation: drip 1.6s ease-in infinite 0s; transform-box: fill-box; transform-origin: center; }
        .drip-2 { animation: drip 1.6s ease-in infinite 0.53s; transform-box: fill-box; transform-origin: center; }
        .drip-3 { animation: drip 1.6s ease-in infinite 1.06s; transform-box: fill-box; transform-origin: center; }
      `}</style>

      <StatusBar time="1:14 PM" />

      {/* Status row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 12, padding: '0 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div className="on-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            On the clock
          </span>
        </div>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)' }}>
          Padmore&apos;s · #4471
        </span>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>

        {/* Hourglass + time */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>

          {/* Animated hourglass */}
          <div className="hg-float">
            <svg width="150" height="210" viewBox="0 0 100 165" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="clip-top">
                  <path d="M 13 14 C 13 50 44 78 44 85 L 56 85 C 56 78 87 50 87 14 Z"/>
                </clipPath>
                <clipPath id="clip-bot">
                  <path d="M 44 85 C 44 92 13 120 13 154 L 87 154 C 87 120 56 92 56 85 Z"/>
                </clipPath>
              </defs>

              {/* Bottom cap */}
              <ellipse cx="50" cy="157" rx="37" ry="9" fill="#72c15f" stroke="#0D0E12" strokeWidth="2.5"/>

              {/* Glass body fill (white) */}
              <path d="M 13 14 C 13 50 44 78 44 85 C 44 92 13 120 13 154 L 87 154 C 87 120 56 92 56 85 C 56 78 87 50 87 14 Z" fill="#fff"/>

              {/* Bottom sand accumulated */}
              <path d="M 15 154 L 85 154 C 85 120 57 93 50 87 C 43 93 15 120 15 154 Z" fill="#72c15f" clipPath="url(#clip-bot)"/>

              {/* Top sand remaining */}
              <path d="M 15 14 L 85 14 C 85 48 58 75 50 83 C 42 75 15 48 15 14 Z" fill="#72c15f" clipPath="url(#clip-top)"/>

              {/* Glass outline – left */}
              <path d="M 13 14 C 13 50 44 78 44 85 C 44 92 13 120 13 154"
                fill="none" stroke="#0D0E12" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Glass outline – right */}
              <path d="M 87 14 C 87 50 56 78 56 85 C 56 92 87 120 87 154"
                fill="none" stroke="#0D0E12" strokeWidth="2.5" strokeLinecap="round"/>

              {/* Side highlights */}
              <path d="M 81 26 Q 87 42 84 57" stroke="rgba(0,0,0,0.22)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
              <path d="M 81 126 Q 87 140 84 152" stroke="rgba(0,0,0,0.22)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>

              {/* Drip droplets */}
              <circle className="drip-1" cx="50" cy="86" r="2"   fill="#5aa84a"/>
              <circle className="drip-2" cx="50" cy="86" r="1.5" fill="#5aa84a"/>
              <circle className="drip-3" cx="50" cy="86" r="1"   fill="#5aa84a"/>

              {/* Top cap (on top) */}
              <ellipse cx="50" cy="14" rx="37" ry="9" fill="#72c15f" stroke="#0D0E12" strokeWidth="2.5"/>
            </svg>
          </div>

          {/* Time elapsed */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
              Time elapsed
            </span>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 72, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>
              2:14
            </div>
            <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 8, display: 'block' }}>
              $28/hr · Barista
            </span>
          </div>
        </div>

        {/* Earned so far */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 6 }}>
            Earned so far
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 48, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>
              $62.00
            </span>
            <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)' }}>of $140</span>
          </div>
          <div style={{ width: 140, height: 3, background: 'rgba(13,14,18,0.09)', borderRadius: 99, overflow: 'hidden', margin: '10px auto 0' }}>
            <div style={{ height: '100%', width: '44%', background: 'var(--ink)', borderRadius: 99 }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '14px 24px 36px', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'white' }}>T</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Tomás</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)' }}>Owner · Padmore&apos;s</div>
          </div>
          <Link href="/worker/report" style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textDecoration: 'underline' }}>
            Report Issue
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/worker/messages" style={{ width: 56, height: 56, border: '1.5px solid var(--ink)', borderRadius: '50%', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2.5 2.5h13c.55 0 1 .45 1 1v7.5c0 .55-.45 1-1 1H5l-3.7 3.7V3.5c0-.55.45-1 1.2-1Z"
                stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button
            onClick={() => router.push('/worker/paid-out')}
            style={{ flex: 1, height: 56, background: 'var(--ink)', borderRadius: 99, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <rect x="5.5" y="5.5" width="11" height="11" rx="2.5" fill="white"/>
            </svg>
            <span style={{ fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, color: '#fff', letterSpacing: '-0.02em' }}>Clock Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
