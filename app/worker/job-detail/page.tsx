'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';

function SlideToConfirm({ label = 'Slide to Confirm', href, locked, onLockedAttempt }: { label?: string; href: string; locked?: boolean; onLockedAttempt?: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);
  const startX = useRef(0);
  const startP = useRef(0);
  const router = useRouter();

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
    setTimeout(() => router.push(href), 280);
  }, [href, router]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (locked) { onLockedAttempt?.(); return; }
    if (done) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startP.current = progress;
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || done) return;
    const dx = e.clientX - startX.current;
    const next = Math.max(0, Math.min(1, startP.current + dx / range));
    setProgress(next);
  };
  const onPointerUp = () => {
    if (done) return;
    setDragging(false);
    if (progress >= 0.88) commit();
    else setProgress(0);
  };

  return (
    <div ref={trackRef} style={{
      position: 'relative', width: '100%', height: 60,
      background: 'var(--ink)',
      borderRadius: 99, overflow: 'hidden',
      touchAction: 'none', userSelect: 'none',
    }}>
      {/* Fill track */}
      {!locked && (
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: `${GUTTER + THUMB + progress * range}px`,
          background: 'rgba(255,255,255,0.12)',
          transition: dragging ? 'none' : 'width 0.28s cubic-bezier(0.22,1,0.36,1)',
        }} />
      )}
      {/* Label */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, color: '#fff',
        letterSpacing: '-0.01em', paddingLeft: THUMB,
        opacity: done ? 0 : Math.max(0, 1 - progress * 1.6),
        transition: dragging ? 'none' : 'opacity 0.25s ease',
        pointerEvents: 'none',
      }}>
        {locked ? 'Complete Profile to Confirm' : label}
        {!locked && <span style={{ marginLeft: 10, opacity: 0.5 }}>→</span>}
      </div>
      {/* Done label */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, color: '#fff',
        opacity: done ? 1 : 0, transition: 'opacity 0.2s ease 0.1s',
        letterSpacing: '-0.01em', pointerEvents: 'none',
      }}>Confirmed ✓</div>
      {/* Thumb */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: 'absolute', top: GUTTER, left: GUTTER, width: THUMB, height: THUMB,
          background: '#fff', borderRadius: 99,
          transform: `translateX(${progress * range}px)`,
          transition: dragging ? 'none' : 'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: locked ? 'pointer' : dragging ? 'grabbing' : 'grab',
          boxShadow: '0 2px 8px rgba(0,0,0,0.22)', touchAction: 'none',
        }}
      >
        {locked ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="4" y="8" width="10" height="8" rx="1.5" stroke="var(--ink)" strokeWidth="1.4" />
            <path d="M6 8V6a3 3 0 016 0v2" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </div>
    </div>
  );
}

const GATE_ITEMS = [
  { label: 'Add a profile photo', sub: "So employers know who's showing up", href: '/worker/profile' },
  { label: 'Add credentials', sub: 'Food handler cert, liquor license, etc.', href: '/v3/credentials' },
];

function ProfileGate({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'var(--overlay)', zIndex: 50, animation: 'fadeIn 0.2s ease' }} />
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390,
        background: 'var(--paper)', borderRadius: '20px 20px 0 0',
        padding: '20px 22px 48px', zIndex: 51,
        animation: 'slideUp 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line)', margin: '0 auto 20px' }} />
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 8 }}>Before you confirm</div>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 26, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 6 }}>2 Quick Things</h2>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginBottom: 22, lineHeight: 1.5 }}>
          Employers need to see who they&apos;re booking. Takes 2 minutes.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {GATE_ITEMS.map((item, i) => (
            <Link key={i} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              background: 'var(--card)', border: '2px solid var(--ink)',
              borderRadius: 14, textDecoration: 'none',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px dashed var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3v8M3 7h8" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 2 }}>{item.sub}</div>
              </div>
              <span style={{ color: 'var(--ink)', fontSize: 16 }}>→</span>
            </Link>
          ))}
        </div>
        <button onClick={onClose} style={{
          width: '100%', padding: '14px', background: 'none',
          border: '2px solid var(--ink)', borderRadius: 99,
          fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)',
          cursor: 'pointer',
        }}>
          Not Now
        </button>
      </div>
    </>
  );
}

const PROFILE_COMPLETE = false;

export default function JobDetail() {
  const [gateOpen, setGateOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [bringOpen, setBringOpen] = useState(false);

  const tasks = ['Espresso and pour-over service', 'Bar setup and breakdown', 'Stock and mise en place', "Team communication (it's busy)"];
  const bring = [
    { key: 'Attire', value: 'All black, closed-toe shoes' },
    { key: 'Experience', value: '2+ years espresso' },
    { key: 'Cert', value: 'Food handler (optional)' },
  ];

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <style>{`
        @keyframes pulse-live {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .live-dot { animation: pulse-live 1.8s ease-in-out infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateX(-50%) translateY(100%); } to { transform: translateX(-50%) translateY(0); } }
        @keyframes expand-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .expand-in { animation: expand-in 0.22s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <StatusBar time="10:12" />

      {/* Top bar */}
      <div style={{ height: 52, background: 'var(--paper)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
        <Link href="/worker/map" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', textDecoration: 'none', fontSize: 20 }}>←</Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 36, height: 36, border: '2px solid var(--ink)', borderRadius: 99, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="12" cy="3" r="1.5" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="12" cy="13" r="1.5" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="4" cy="8" r="1.5" stroke="var(--ink)" strokeWidth="1.4" />
              <line x1="10.7" y1="3.7" x2="5.3" y2="7.3" stroke="var(--ink)" strokeWidth="1.4" />
              <line x1="5.3" y1="8.7" x2="10.7" y2="12.3" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
          </button>
          <button onClick={() => setSaved(s => !s)} style={{ width: 36, height: 36, border: `2px solid ${saved ? '#B91C1C' : 'var(--ink)'}`, borderRadius: 99, background: saved ? 'var(--red-soft)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s ease' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13.5C8 13.5 2 9.5 2 5.5C2 3.57 3.57 2 5.5 2C6.61 2 7.6 2.53 8 3.25C8.4 2.53 9.39 2 10.5 2C12.43 2 14 3.57 14 5.5C14 9.5 8 13.5 8 13.5Z"
                fill={saved ? '#B91C1C' : 'none'} stroke={saved ? '#B91C1C' : 'var(--ink)'} strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 140 }}>

        {/* Live badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 22px 0' }}>
          <div className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#EA4B2A', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)' }}>Posted 14 min ago · 11 looking</span>
        </div>

        {/* Heading */}
        <div style={{ padding: '8px 22px 16px' }}>
          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 1.1 }}>
            Padmore&apos;s Coffee
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 18, color: 'var(--ink)', marginTop: 4, lineHeight: 1.3 }}>
            Needs a barista for the lunch rush.
          </p>
          <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', letterSpacing: '0.08em', marginTop: 8, textTransform: 'uppercase' }}>
            Bed-Stuy / 172 Tompkins Ave / 0.6 mi
          </p>
        </div>

        {/* Stats — 2 rounded colored boxes */}
        <div style={{ display: 'flex', gap: 10, padding: '0 22px 20px' }}>
          <div style={{ flex: 1, background: 'var(--green-soft)', borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 5 }}>When</div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Today</div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>11A – 4P</div>
          </div>
          <div style={{ flex: 1, background: 'var(--steel-soft)', borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 5 }}>Hours</div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>5</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 1 }}>hrs total</div>
          </div>
        </div>

        {/* Pay */}
        <div style={{ margin: '0 22px', padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>$140</div>
          <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>$28/hr · pre-tips</p>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L2 4v4c0 3.31 2.69 6 6 6s6-2.69 6-6V4L8 1.5Z" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M5.5 8l1.5 1.5L10.5 6" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)' }}>Paid same-day — straight to your debit</span>
          </div>
        </div>

        {/* The Work — collapsible card */}
        <div style={{ margin: '16px 22px 0' }}>
          <button
            onClick={() => setWorkOpen(o => !o)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', borderRadius: workOpen ? '14px 14px 0 0' : 14,
              border: '2px solid var(--ink)', background: 'var(--ink)',
              cursor: 'pointer', transition: 'border-radius 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#fff' }}>The Work</span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{tasks.length} tasks</span>
            </div>
            <span style={{ color: '#fff', fontSize: 18, lineHeight: 1, display: 'inline-block', transform: workOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>↓</span>
          </button>
          {workOpen && (
            <div className="expand-in" style={{ border: '2px solid var(--ink)', borderTop: 'none', borderRadius: '0 0 14px 14px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tasks.map((task, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--green-soft)', borderRadius: 99, padding: '10px 16px' }}>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--ink)', flexShrink: 0, opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{task}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* What to Bring — collapsible card */}
        <div style={{ margin: '10px 22px 0' }}>
          <button
            onClick={() => setBringOpen(o => !o)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', borderRadius: bringOpen ? '14px 14px 0 0' : 14,
              border: '2px solid var(--ink)', background: 'var(--ink)',
              cursor: 'pointer', transition: 'border-radius 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#fff' }}>What to Bring</span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{bring.length} items</span>
            </div>
            <span style={{ color: '#fff', fontSize: 18, lineHeight: 1, display: 'inline-block', transform: bringOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>↓</span>
          </button>
          {bringOpen && (
            <div className="expand-in" style={{ border: '2px solid var(--ink)', borderTop: 'none', borderRadius: '0 0 14px 14px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bring.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--steel-soft)', borderRadius: 99, padding: '10px 16px' }}>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)' }}>{row.key}</span>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer meta */}
        <div style={{ padding: '16px 22px', marginTop: 16 }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--ink)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Posting #4471 · Brooklyn · NY
          </span>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390,
        padding: '16px 22px 36px',
        background: 'linear-gradient(to bottom, transparent, var(--paper) 38%)',
      }}>
        <SlideToConfirm
          label="Slide to Claim Shift"
          href="/worker/pending"
          locked={!PROFILE_COMPLETE}
          onLockedAttempt={() => setGateOpen(true)}
        />
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textAlign: 'center', marginTop: 12 }}>
          Employer confirms within 15 min · no interview
        </p>
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textAlign: 'center', marginTop: 6 }}>
          <Link href="/worker/report" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Report an Issue with This Posting</Link>
        </p>
      </div>

      {gateOpen && <ProfileGate onClose={() => setGateOpen(false)} />}
    </div>
  );
}
