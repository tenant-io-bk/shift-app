'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function WorkerConfirm() {
  const [phase, setPhase] = useState<'fill' | 'text' | 'bounce' | 'done'>('fill');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 500);
    const t2 = setTimeout(() => setPhase('bounce'), 1600);
    const t3 = setTimeout(() => setPhase('done'), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A' }} />
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Just now · Barista · Today 11A–4P
            </span>
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
            marginBottom: 12,
          }}>
            Padmore&apos;s Coffee.
          </div>

          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 400,
            fontSize: 36,
            color: 'var(--ink)',
            letterSpacing: '-0.05em',
          }}>
            $140.00
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, padding: '0 22px 22px', paddingBottom: 120, overflowY: 'auto' }}>

          {/* Receipt card */}
          <div className="receipt-card" style={{ padding: 20, marginBottom: 12 }}>
            {/* Single continuous cross lines via absolute positioning — avoids independent dash patterns per cell */}
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              <div style={{ position: 'absolute', left: 'calc(50% - 0.75px)', top: 0, bottom: 0, width: 0, borderLeft: '1.5px dashed var(--ink)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 0, borderTop: '1.5px dashed var(--ink)', pointerEvents: 'none' }} />
              <div style={{ padding: '0 16px 16px 0' }}>
                <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>When</p>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Today · 11A – 4P</p>
              </div>
              <div style={{ padding: '0 0 16px 16px' }}>
                <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Hours</p>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>5 hrs</p>
              </div>
              <div style={{ padding: '16px 16px 0 0' }}>
                <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Get there</p>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>25 min away</p>
              </div>
              <div style={{ padding: '16px 0 0 16px' }}>
                <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Address</p>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>172 Tompkins Ave</p>
              </div>
            </div>

            <div style={{ borderTop: '1.5px dashed var(--ink)', marginTop: 16, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)' }}>Take home</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                $140<span style={{ color: 'var(--green)' }}>.</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
              You can back out within 15 min. No penalty.
            </p>
            <Link href="/v3/cancel-flow" style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', textDecoration: 'underline', flexShrink: 0, marginLeft: 12 }}>
              Cancel
            </Link>
          </div>

          <div style={{ marginTop: 20 }}>
            <p style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 12 }}>What&apos;s next</p>
            {[
              "01. Head out by 10:35A to arrive on time.",
              "02. Tomás will have your name at the door.",
            ].map((item) => (
              <p key={item} style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.55, marginBottom: 8 }}>{item}</p>
            ))}
          </div>
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
          <button style={{ width: '100%', padding: '14px 22px', border: '2px solid var(--ink)', borderRadius: 99, background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', cursor: 'pointer', letterSpacing: '-0.01em' }}>
            Message Tomás
          </button>
          <Link href="/worker/day-of" style={{ width: '100%', padding: '14px 22px', background: 'var(--ink)', borderRadius: 99, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: '#FFFFFF', textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em', display: 'block' }}>
            Done.
          </Link>
        </div>
      </div>
    </div>
  );
}
