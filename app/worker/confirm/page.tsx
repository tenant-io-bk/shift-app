'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function WorkerConfirm() {
  const [phase, setPhase] = useState<'fill' | 'text' | 'bounce' | 'done'>('fill');
  const [penaltyActive, setPenaltyActive] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 500);
    const t2 = setTimeout(() => setPhase('bounce'), 1600);
    const t3 = setTimeout(() => setPhase('done'), 2200);
    const t4 = setTimeout(() => setPenaltyActive(true), 15 * 60 * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes fill-down {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(0); }
        }
        @keyframes text-pop {
          0%   { opacity: 0; transform: scale(0.7); }
          60%  { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        .on-dot { animation: dot-pulse 2s ease-in-out infinite; }
        @keyframes bounce-off {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-12px); }
          40%  { transform: translateX(8px); }
          60%  { transform: translateX(-4px); }
          80%  { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        @keyframes slide-up-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .confirm-bounce { animation: bounce-off 0.5s ease; }
        .confirm-slide-in { animation: slide-up-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
      `}</style>

      {/* Intro overlay */}
      {phase !== 'done' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, maxWidth: 390, margin: '0 auto',
          background: 'var(--green)',
          animation: 'fill-down 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        className={phase === 'bounce' ? 'confirm-bounce' : ''}
        >
          {(phase === 'text' || phase === 'bounce') && (
            <div style={{
              textAlign: 'center',
              animation: 'text-pop 0.4s cubic-bezier(0.34,1.4,0.64,1) forwards',
            }}>
              <div style={{ fontSize: 72, marginBottom: 16, lineHeight: 1 }}>👍</div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.1 }}>
                You Booked<br />A SHIFT.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirm content */}
      <div style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        opacity: phase === 'done' ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <StatusBar time="10:14" />

        {/* Light header */}
        <div style={{ padding: '16px 22px 20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div className="on-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--online)' }} />
          </div>

          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            fontSize: 32,
            color: 'var(--ink)',
            letterSpacing: '-0.05em',
            lineHeight: 1.05,
          }}>
            Your Shift Is Booked At
          </div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 32,
            color: 'var(--ink)',
            letterSpacing: '-0.05em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            Padmore&apos;s Coffee.
          </div>

          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 400,
            fontSize: 64,
            color: 'var(--ink)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            textAlign: 'center',
            marginBottom: 20,
          }}>
            $140.00
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, padding: '0 22px 22px', paddingBottom: 120, overflowY: 'auto' }}>

          {/* Receipt card */}
          <div className="receipt-card" style={{ marginBottom: 12 }}>
            {[
              { label: 'When',     value: 'Today · 11A – 4P' },
              { label: 'Hours',    value: '5 hrs' },
              { label: 'Get there',value: '25 min away' },
              { label: 'Address',  value: '172 Tompkins Ave' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 20px', borderBottom: '1.5px dashed var(--ink)' }}>
                <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)' }}>{row.label}</p>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em' }}>{row.value}</p>
              </div>
            ))}

            <div style={{ padding: '14px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)' }}>Take home</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                $140<span style={{ color: 'var(--green)' }}>.</span>
              </span>
            </div>
          </div>

          <Link href="/v3/cancel-flow" style={{
            display: 'block', marginTop: 12,
            background: penaltyActive ? 'var(--red-soft)' : 'var(--yellow-soft)',
            borderRadius: 99,
            padding: '14px 20px',
            textDecoration: 'none',
            transition: 'background 0.4s ease',
          }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4, display: 'block', textAlign: 'center' }}>
              {penaltyActive
                ? 'Cancellation now incurs a penalty.'
                : 'Back out within 15 min — no penalty.'}
            </span>
          </Link>

        </div>

        {/* Fixed bottom actions */}
        <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 390,
          padding: '12px 22px 36px',
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <button style={{ width: '100%', padding: '14px 22px', border: '2px solid var(--ink)', borderRadius: 99, background: 'transparent', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, color: 'var(--ink)', cursor: 'pointer', letterSpacing: '-0.01em' }}>
            Message Tomás
          </button>
          <Link href="/worker/day-of" style={{ width: '100%', padding: '14px 22px', background: 'var(--ink)', borderRadius: 99, fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, color: '#FFFFFF', textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em', display: 'block' }}>
            Done.
          </Link>
        </div>
      </div>
    </div>
  );
}
