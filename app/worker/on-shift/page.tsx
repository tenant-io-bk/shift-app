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

          {/* Hourglass image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hourglass.png" alt="" width={100} height={140} style={{ objectFit: 'contain' }} />

          {/* Time elapsed */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
              Time elapsed
            </span>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 96, color: 'var(--ink)', letterSpacing: '0.04em', lineHeight: 1 }}>
              2H 14M
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
