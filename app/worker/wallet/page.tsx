'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import BottomNav from '@/app/components/BottomNav';

const TRANSACTIONS = [
  { name: "Padmore's Coffee", detail: 'Barista · Mon 12 May', amount: '+$174.00', positive: true },
  { name: 'The Wren', detail: 'Server · Sat 10 May', amount: '+$96.00', positive: true },
  { name: 'CHASE ··4471', detail: 'Transferred', amount: '-$200.00', positive: false },
  { name: 'Bar Blondeau', detail: 'Barback · Thu 8 May', amount: '+$128.00', positive: true },
  { name: 'SHIFT Fee', detail: 'Monthly', amount: '$0.00', positive: false },
  { name: "Greene's Bar", detail: 'Server · Tue 6 May', amount: '+$88.00', positive: true },
];

const now = new Date();
const dateLine = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
const timeLine = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

export default function WorkerWallet() {
  const [withholding, setWithholding] = useState(true);
  const [cashOutDone, setCashOutDone] = useState(false);
  const [slideX, setSlideX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragState = useRef({ startClientX: 0, maxSlide: 0 });

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    dragState.current.startClientX = e.clientX;
    if (trackRef.current) {
      dragState.current.maxSlide = trackRef.current.offsetWidth - 56;
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragState.current.startClientX;
    dragState.current.startClientX = e.clientX;
    setSlideX(prev => Math.max(0, Math.min(prev + delta, dragState.current.maxSlide)));
  }

  function handlePointerUp() {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setSlideX(prev => {
      if (dragState.current.maxSlide > 0 && prev >= dragState.current.maxSlide * 0.7) {
        setTimeout(() => setCashOutDone(true), 200);
        return dragState.current.maxSlide;
      }
      return 0;
    });
  }

  if (cashOutDone) {
    return (
      <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--green)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <style>{`
          @keyframes pop-in { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
          .pop-in { animation: pop-in 0.5s cubic-bezier(0.34,1.4,0.64,1) forwards; }
        `}</style>
        <div className="pop-in" style={{ fontSize: 64, marginBottom: 24 }}>✓</div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 26, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.2, marginBottom: 16 }}>
          You transferred $247.50 on {dateLine} at {timeLine} to CHASE ··4471.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 40, opacity: 0.7 }}>
          Email confirmation to follow.
        </p>
        <Link href="/worker/map" style={{
          display: 'block', padding: '16px 22px', borderRadius: 99,
          background: 'var(--ink)', color: '#fff', fontFamily: 'var(--sans)',
          fontWeight: 700, fontSize: 16, textAlign: 'center', textDecoration: 'none',
          letterSpacing: '-0.01em', width: '100%', boxSizing: 'border-box',
        }}>
          Done.
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
      {/* Nav */}
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)',
      }}>
        <Link href="/worker/map" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Wallet</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Wallet card — taller */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'var(--steel)', borderRadius: 20, padding: '30px 22px 26px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, right: -20, width: 120, height: '100%', background: 'rgba(13,14,18,0.04)', transform: 'skewX(-12deg)' }} />
          <div style={{ position: 'absolute', top: 0, right: 40, width: 60, height: '100%', background: 'rgba(13,14,18,0.03)', transform: 'skewX(-12deg)' }} />

          {/* Card top row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)' }}>
              Available balance
            </p>
            <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: 'rgba(13,14,18,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 1 }}>SHIFT Wallet</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 28 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 56, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 1 }}>
              $247
            </span>
            <span style={{ color: 'var(--green)', fontSize: 56, fontFamily: 'var(--sans)', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.075em' }}>.</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.05em', marginLeft: 3 }}>50</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, color: 'rgba(13,14,18,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>Linked account</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', letterSpacing: '0.06em' }}>CHASE ·· 4471</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <button style={{
                background: 'rgba(13,14,18,0.1)', border: '1px solid rgba(13,14,18,0.2)',
                color: 'var(--ink)', fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600,
                borderRadius: 99, padding: '6px 12px', cursor: 'pointer',
              }}>
                Change →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tax withholding */}
      <div style={{ background: 'var(--card)', padding: '14px 22px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>Tax withholding</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 2 }}>
              {withholding ? '25% auto-held · ~$61.88 this week' : 'Off · you handle quarterly'}
            </div>
          </div>
          <button onClick={() => setWithholding(w => !w)} style={{
            width: 46, height: 26, borderRadius: 99, background: withholding ? 'var(--ink)' : 'var(--line)',
            border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
          }}>
            <div style={{ position: 'absolute', top: 3, left: withholding ? 23 : 3, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </button>
        </div>
        {withholding && (
          <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--paper-2)', borderRadius: 8, fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)' }}>
            Held funds transfer to your tax account on Jan 15, Apr 15, Jun 15, Sep 15.
          </div>
        )}
      </div>

      {/* Ledger */}
      <div style={{ background: 'var(--card)', padding: '0 22px' }}>
        <p style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', padding: '16px 0 10px', borderBottom: '1px solid var(--line)' }}>
          ACTIVITY
        </p>
        {TRANSACTIONS.map((tx, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{tx.name}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 2 }}>{tx.detail}</div>
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: tx.positive ? 'var(--online)' : 'var(--ink)' }}>{tx.amount}</div>
          </div>
        ))}
      </div>

      {/* Slide to cash out */}
      <div style={{ padding: '16px 22px 100px', background: 'var(--card)', borderTop: '1px solid var(--line)' }}>
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'relative', width: '100%', height: 56,
            background: 'var(--ink)', borderRadius: 99,
            cursor: 'grab', userSelect: 'none', touchAction: 'none',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15,
            color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.01em', pointerEvents: 'none',
          }}>
            Slide to Cash Out →
          </div>
          <div style={{
            position: 'absolute', top: 4, left: 4 + slideX,
            width: 48, height: 48, borderRadius: '50%', background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            transition: isDraggingRef.current ? 'none' : 'left 0.3s cubic-bezier(0.22,1,0.36,1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textAlign: 'center', marginTop: 8 }}>
          $0 fee · to CHASE ·· 4471 · ~11 min via Stripe
        </p>
      </div>

      <BottomNav active="wallet" />
    </div>
  );
}
