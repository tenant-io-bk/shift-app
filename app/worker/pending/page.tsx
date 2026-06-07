'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';

const TOTAL_SECONDS = 15 * 60; // 15 min window

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

export default function WorkerPending() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { clearInterval(id); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Demo: employer confirms after 8 seconds
  useEffect(() => {
    const id = setTimeout(() => setConfirmed(true), 8000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (confirmed) {
      const id = setTimeout(() => router.push('/worker/confirm'), 1800);
      return () => clearTimeout(id);
    }
  }, [confirmed, router]);

  const pct = seconds / TOTAL_SECONDS;
  const circumference = 2 * Math.PI * 28;
  const dash = circumference * (1 - pct);

  if (confirmed) {
    return (
      <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <style>{`
          @keyframes pop { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
          .pop { animation: pop 0.45s cubic-bezier(0.34,1.4,0.64,1) forwards; }
        `}</style>
        <div className="pop" style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M2 12L11 21L30 2" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.06em', marginBottom: 8 }}>Confirmed.</div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mute)', textAlign: 'center' }}>
          Padmore&apos;s Coffee · Barista · Today 11A–4P
        </div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 20, opacity: 0.5 }}>Loading your shift…</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes pulse-amber {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }
        .pulse-amber { animation: pulse-amber 1.6s ease-in-out infinite; }
        @keyframes ring-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        .ring-in { animation: ring-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>

      {/* Top bar */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <StatusBar time="10:14" />
      </div>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <Link href="/worker/job-detail" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Pending</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 120px' }}>

        {/* Countdown ring */}
        <div className="ring-in" style={{ position: 'relative', width: 88, height: 88, marginBottom: 28 }}>
          <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="44" cy="44" r="28" fill="none" stroke="var(--line)" strokeWidth="5" />
            <circle
              cx="44" cy="44" r="28"
              fill="none"
              stroke="var(--yellow)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dash}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          {/* Pulsing dot in center */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pulse-amber" style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--yellow)' }} />
          </div>
        </div>

        {/* Status label */}
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 6 }}>
          Awaiting confirmation
        </div>

        <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 42, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 6 }}>
          {fmt(seconds)}
        </div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginBottom: 36, textAlign: 'center', lineHeight: 1.5 }}>
          Employer has this window to confirm you.<br />
          You&apos;ll get a notification either way.
        </div>

        {/* Shift card */}
        <div style={{ width: '100%', background: 'var(--paper-2)', borderRadius: 20, padding: '20px 20px 22px', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 10 }}>Your claim</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>Padmore&apos;s Coffee</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginTop: 4 }}>Barista · Bed-Stuy · 0.6 mi</div>
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.04em' }}>$140</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Today 11A–4P', '5 hrs', '$28/hr'].map(tag => (
              <span key={tag} style={{ background: 'var(--paper-3)', borderRadius: 99, padding: '5px 12px', fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Queue context */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'var(--paper-2)', borderRadius: 14 }}>
          <div style={{ display: 'flex', gap: -4 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ink)', border: '2px solid var(--paper-2)', marginLeft: i > 0 ? -6 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 7, color: '#fff' }}>W{i + 1}</span>
              </div>
            ))}
          </div>
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.4 }}>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>11 workers</span> claimed this shift. Employer picks one.
          </span>
        </div>

        {/* What happens if not selected */}
        <div style={{ width: '100%', marginTop: 24 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 12 }}>What to expect</div>
          {[
            { n: '01', t: 'Confirmed → you\'re booked, shift locks in.' },
            { n: '02', t: 'Passed → you\'re released, no penalty.' },
            { n: '03', t: 'No response in 15 min → you can withdraw or stay queued.' },
          ].map(row => (
            <div key={row.n} style={{ display: 'flex', gap: 14, paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', flexShrink: 0, width: 20 }}>{row.n}</span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{row.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bottom — withdraw */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '12px 22px 36px', background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <Link
          href="/worker/map"
          style={{
            display: 'block', width: '100%', padding: '14px', textAlign: 'center',
            border: '2px solid var(--ink)', borderRadius: 99, background: 'transparent',
            fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15,
            color: 'var(--ink)', textDecoration: 'none', letterSpacing: '-0.01em',
          }}
        >
          Withdraw claim
        </Link>
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 10 }}>
          No penalty for withdrawing before confirmation.
        </p>
      </div>
    </div>
  );
}
