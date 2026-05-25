'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

function SlideToClockOut({ onComplete }: { onComplete: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);
  const startX = useRef(0);
  const startP = useRef(0);

  const THUMB = 52;
  const GUTTER = 4;
  const range = Math.max(1, trackW - THUMB - GUTTER * 2);

  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver(([e]) => setTrackW(e.contentRect.width));
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const commit = useCallback(() => {
    setProgress(1);
    setDone(true);
    setTimeout(onComplete, 320);
  }, [onComplete]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (done) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startP.current = progress;
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || done) return;
    const dx = e.clientX - startX.current;
    setProgress(Math.max(0, Math.min(1, startP.current + dx / range)));
  };
  const onPointerUp = () => {
    if (done) return;
    setDragging(false);
    if (progress >= 0.88) commit();
    else setProgress(0);
  };

  return (
    <div
      ref={trackRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 60,
        background: '#fff',
        border: '2px solid var(--ink)',
        borderRadius: 99,
        overflow: 'hidden',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {/* Fill */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: `${GUTTER + THUMB + progress * range}px`,
        background: 'var(--ink)',
        transition: dragging ? 'none' : 'width 0.28s cubic-bezier(0.22,1,0.36,1)',
      }} />
      {/* Label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: `rgba(13,14,18,${Math.max(0, 0.45 - progress * 1.5)})`,
        paddingLeft: THUMB,
        pointerEvents: 'none',
        transition: dragging ? 'none' : 'color 0.25s',
      }}>
        {done ? '' : 'Slide to clock out'}
      </div>
      {/* Done label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16,
        color: '#fff',
        opacity: done ? 1 : 0,
        transition: 'opacity 0.2s ease 0.1s',
        pointerEvents: 'none',
      }}>Clocked out.</div>
      {/* Thumb */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: 'absolute', top: GUTTER - 2, left: GUTTER - 2,
          width: THUMB, height: THUMB,
          background: 'var(--ink)', borderRadius: 99,
          transform: `translateX(${progress * range}px)`,
          transition: dragging ? 'none' : 'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}

export default function OnShift() {
  const router = useRouter();
  const [clockedOut, setClockedOut] = useState(false);

  function handleClockOut() {
    setClockedOut(true);
    setTimeout(() => router.push('/worker/paid-out'), 600);
  }

  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        padding: 22,
      }}
    >
      <style>{`
        @keyframes on-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .on-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #EA4B2A;
          animation: on-pulse-ring 2s ease-out infinite;
        }
      `}</style>

      <StatusBar time="1:14 PM" />

      {/* Top badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          padding: '5px 12px',
          background: '#fff',
          border: '2px solid var(--ink)',
          borderRadius: 99,
          marginTop: 8,
        }}
      >
        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mute)' }}>
          SHIFT · ON THE CLOCK
        </span>
      </div>

      {/* Pulsing indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
        <div style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
          <div className="on-pulse-ring" />
          <div style={{ position: 'relative', width: 7, height: 7, borderRadius: '50%', background: '#EA4B2A', zIndex: 1 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>
          On shift · Padmore&apos;s · #4471
        </span>
      </div>

      {/* Big timer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 80, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, textAlign: 'center' }}>
          02:14:38
        </div>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginTop: 6 }}>
          $28.00/hr
        </p>
      </div>

      {/* Earned box */}
      <div style={{ padding: '16px 18px', background: '#fff', border: '2px solid var(--ink)', borderRadius: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            $62<span style={{ color: '#72c15f' }}>.</span>
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>
            earned so far · 45%
          </span>
        </div>
        <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '62%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
      </div>

      {/* Contact row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid var(--line)', marginTop: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #c4a577, #8b6545 60%, #5c3d22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'white' }}>T</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Tomás</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>Owner · Padmore&apos;s</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/worker/messages" style={{ width: 32, height: 32, border: '2px solid var(--ink)', borderRadius: 99, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h10c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H4l-3 3V3c0-.55.45-1 1-1Z" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Report link */}
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 10 }}>
        <Link href="/worker/report" style={{ color: 'var(--mute)', textDecoration: 'underline' }}>
          Report an issue
        </Link>
        {' · '}
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Call SHIFT</span>
      </p>

      {/* Slide to clock out */}
      <div style={{ marginTop: 'auto', paddingTop: 16, marginBottom: 16 }}>
        <SlideToClockOut onComplete={handleClockOut} />
      </div>
    </div>
  );
}
