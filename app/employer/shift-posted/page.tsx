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
        @keyframes logo-fill {
          from { width: 0%; }
          to { width: 62%; }
        }
        .logo-fill { animation: logo-fill 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>

      {/* Dark header */}
      <div style={{ background: 'var(--ink)', padding: '32px 22px 28px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div
            className="fill-pulse"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#16A34A',
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: '#16A34A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Live · matching now
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 52,
          color: 'white',
          letterSpacing: '-0.075em',
          lineHeight: 0.9,
          marginBottom: 16,
        }}>
          SHIFT<br />POSTED<span style={{ color: 'var(--hydrant)' }}>.</span>
        </h1>

        {/* Logo fill progress */}
        <div style={{ position: 'relative', marginBottom: 10, height: 36 }}>
          {/* Base: dim white logo */}
          <img
            src="/LOGO-white.svg"
            alt=""
            style={{ position: 'absolute', top: 0, left: 0, height: 36, opacity: 0.15, display: 'block' }}
          />
          {/* Fill: green logo clips in left-to-right */}
          <div className="logo-fill" style={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', height: 36 }}>
            <img src="/LOGO-green.svg" alt="shift" style={{ height: 36, display: 'block' }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            18 workers nearby
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            avg 2 min to fill
          </span>
        </div>
      </div>

      {/* Shift summary card */}
      <div style={{ margin: '16px 22px 0', padding: 20, background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 14 }}>
          Shift summary
        </div>

        {[
          { label: 'Role', value: 'Barista' },
          { label: 'Date', value: 'Today' },
          { label: 'Time', value: '11:00A – 4:00P · 5 hrs' },
          { label: 'Pay', value: '$26/hr · $130 total' },
          { label: 'Workers', value: '1 needed · 1 standby' },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '8px 0',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>{label}</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{value}</span>
          </div>
        ))}

        {/* Notes preview */}
        <div style={{ paddingTop: 12 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>Notes</span>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 4, lineHeight: 1.5 }}>
            All-black dress code. Ring the bell on Tompkins entrance. Coffee already going.
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div style={{ margin: '16px 22px 0' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12 }}>
          What happens next
        </div>
        {[
          { dot: '#16A34A', text: 'Workers nearby get an instant push notification' },
          { dot: 'var(--hydrant)', text: "First to accept locks in — you'll see them on your roster" },
          { dot: 'var(--ink)', text: 'Standby worker is on deck in case of no-show' },
        ].map(({ dot, text }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: dot, flexShrink: 0, marginTop: 5 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ padding: '20px 22px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link
          href="/employer/roster"
          style={{
            display: 'block',
            background: 'var(--ink)',
            color: 'white',
            borderRadius: 12,
            padding: '16px 22px',
            textAlign: 'center',
            textDecoration: 'none',
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '-0.01em',
          }}
        >
          Track this shift →
        </Link>
        <Link
          href="/employer/post-shift"
          style={{
            display: 'block',
            border: '2px solid var(--ink)',
            borderRadius: 12,
            padding: '14px 22px',
            textAlign: 'center',
            textDecoration: 'none',
            fontFamily: 'var(--mono)',
            fontWeight: 600,
            fontSize: 13,
            color: 'var(--ink)',
          }}
        >
          Post another shift
        </Link>
      </div>

      <EmployerNav active="post" />
    </div>
  );
}
