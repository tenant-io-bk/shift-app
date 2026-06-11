'use client';
import { useRef, useState, ReactNode } from 'react';

type Committed = 'applied' | 'skipped' | null;

interface SwipeCardProps {
  children: ReactNode;
  venue?: string;
  onApply?: () => void;
  onSkip?: () => void;
}

const THRESHOLD = 72;

export function SwipeCard({ children, venue, onApply, onSkip }: SwipeCardProps) {
  const [x, setX] = useState(0);
  const [committed, setCommitted] = useState<Committed>(null);
  const xRef = useRef(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const hasSwiped = useRef(false);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    isDragging.current = true;
    hasSwiped.current = false;
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 8) hasSwiped.current = true;
    xRef.current = dx;
    setX(dx);
  }

  function onPointerUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const cur = xRef.current;
    if (cur > THRESHOLD) {
      setX(400);
      setTimeout(() => { setCommitted('applied'); onApply?.(); }, 260);
    } else if (cur < -THRESHOLD) {
      setX(-400);
      setTimeout(() => setCommitted('skipped'), 260);
    } else {
      xRef.current = 0;
      setX(0);
    }
  }

  function onClickCapture(e: React.MouseEvent) {
    if (hasSwiped.current) { e.preventDefault(); e.stopPropagation(); }
  }

  if (committed === 'skipped') return null;

  if (committed === 'applied') {
    return (
      <div style={{
        background: 'var(--green)', borderRadius: 18,
        padding: '22px 20px', display: 'flex', alignItems: 'center', gap: 14,
        border: '2px solid var(--ink)',
        animation: 'swipe-in 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <style>{`@keyframes swipe-in { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`}</style>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1 6L5.5 10.5L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Applied{venue ? ` — ${venue}` : ''}
          </div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 2 }}>
            Pending confirmation from employer
          </div>
        </div>
      </div>
    );
  }

  const applyProgress = Math.min(Math.max(x, 0) / THRESHOLD, 1);
  const skipProgress = Math.min(Math.max(-x, 0) / THRESHOLD, 1);

  return (
    <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', touchAction: 'pan-y' }}>
      {/* Apply bg */}
      <div style={{
        position: 'absolute', inset: 0, background: 'var(--green)',
        display: 'flex', alignItems: 'center', paddingLeft: 20,
        opacity: applyProgress,
        transform: `scale(${0.92 + applyProgress * 0.08})`,
        transition: 'transform 0.1s',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <svg width="22" height="17" viewBox="0 0 22 17" fill="none">
            <path d="M1 8.5L7.5 15L21 1" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 11, color: 'var(--ink)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Apply</span>
        </div>
      </div>
      {/* Skip bg */}
      <div style={{
        position: 'absolute', inset: 0, background: 'var(--card)',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20,
        opacity: skipProgress,
        transform: `scale(${0.92 + skipProgress * 0.08})`,
        transition: 'transform 0.1s',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 11, color: 'var(--ink)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Skip</span>
        </div>
      </div>
      {/* Card */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        style={{
          transform: `translateX(${x}px)`,
          transition: isDragging.current ? 'none' : 'transform 0.42s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative', zIndex: 1,
          cursor: 'grab', userSelect: 'none', touchAction: 'pan-y',
        }}
      >
        {children}
      </div>
    </div>
  );
}
