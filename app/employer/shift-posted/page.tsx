'use client';

import Link from 'next/link';
import EmployerNav from '@/app/components/EmployerNav';

export default function Page() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <style>{`
        @keyframes fill-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
        .fill-pulse { animation: fill-pulse 1.6s ease-in-out infinite; }
      `}</style>

      {/* Live status bar */}
      <div style={{ background: 'var(--ink)', padding: '32px 22px 28px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div className="fill-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: '#16A34A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Live · matching now
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>18 workers nearby</span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>avg 2 min to fill</span>
        </div>
      </div>

      {/* Soft summary card */}
      <div style={{ margin: '16px 16px 0', background: 'var(--paper-2)', borderRadius: 24, padding: '20px 20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            Barista · Today
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em' }}>
            $130
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['11A – 4P', '$26/hr', '1 worker', '1 standby'].map(tag => (
            <span key={tag} style={{ background: 'var(--paper-3)', borderRadius: 99, padding: '5px 12px', fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* What happens next */}
      <div style={{ margin: '20px 16px 0' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12, paddingLeft: 4 }}>
          What happens next
        </div>
        {[
          { dot: '#16A34A', text: 'Workers nearby get an instant push notification' },
          { dot: 'var(--green)', text: "First to accept locks in — you'll see them on your roster" },
          { dot: 'var(--ink)', text: 'Standby worker is on deck in case of no-show' },
        ].map(({ dot, text }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, paddingLeft: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: dot, flexShrink: 0, marginTop: 5 }} />
            <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ padding: '24px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link href="/employer/roster" style={{ display: 'block', background: 'var(--ink)', color: 'white', borderRadius: 24, padding: '16px 22px', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--body)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>
          Track This Shift →
        </Link>
        <Link href="/employer/post-shift" style={{ display: 'block', background: 'var(--paper-2)', borderRadius: 24, padding: '15px 22px', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--body)', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>
          Post Another Shift
        </Link>
      </div>

      <EmployerNav active="post" />
    </div>
  );
}
