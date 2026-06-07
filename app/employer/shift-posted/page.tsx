'use client';

import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';

export default function ShiftPosted() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        .live-dot { animation: live-pulse 1.8s ease-in-out infinite; }
      `}</style>

      <StatusBar time="10:14" />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 140 }}>

        {/* Header */}
        <div style={{ padding: '16px 22px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div className="live-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Live · Matching Now
            </span>
          </div>

          <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.05 }}>
            Your Shift Is Live At
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 20 }}>
            Padmore&apos;s Coffee.
          </div>

          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, textAlign: 'center', marginBottom: 20 }}>
            $130
          </div>
        </div>

        {/* Receipt card */}
        <div className="receipt-card" style={{ margin: '0 22px 16px' }}>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            <div style={{ position: 'absolute', left: 'calc(50% - 0.75px)', top: 0, bottom: 0, width: 0, borderLeft: '1.5px dashed var(--ink)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 0, borderTop: '1.5px dashed var(--ink)', pointerEvents: 'none' }} />

            <div style={{ padding: '20px 16px 16px 20px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>When</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Today · 11A – 4P</p>
            </div>
            <div style={{ padding: '20px 20px 16px 16px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Role</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Barista</p>
            </div>
            <div style={{ padding: '16px 16px 20px 20px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Rate</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>$26/hr</p>
            </div>
            <div style={{ padding: '16px 20px 20px 16px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Workers</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>1 + 1 standby</p>
            </div>
          </div>

          <div style={{ borderTop: '1.5px dashed var(--ink)', padding: '14px 20px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div className="live-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)' }}>18 Workers Nearby</span>
            </div>
            <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Avg 2 Min to Fill</span>
          </div>
        </div>

        {/* What's next */}
        <div style={{ padding: '4px 22px 0' }}>
          <p style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 12 }}>What&apos;s Next</p>
          {[
            'Workers nearby get an instant push notification.',
            "First to accept locks in — you'll see them on your roster.",
            'Standby worker is on deck in case of no-show.',
          ].map((text, i) => (
            <p key={i} style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.55, marginBottom: 8 }}>
              {String(i + 1).padStart(2, '0')}. {text}
            </p>
          ))}
        </div>
      </div>

      {/* Fixed CTAs */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390,
        padding: '12px 22px 36px',
        background: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <Link href="/employer/roster" style={{ display: 'block', background: 'var(--ink)', color: 'white', borderRadius: 99, padding: '15px 22px', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, letterSpacing: '-0.01em' }}>
          Track This Shift →
        </Link>
        <Link href="/employer/post-shift" style={{ display: 'block', border: '2px solid var(--ink)', borderRadius: 99, padding: '14px 22px', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, color: 'var(--ink)' }}>
          Post Another Shift
        </Link>
      </div>

      <EmployerNav active="post" />
    </div>
  );
}
