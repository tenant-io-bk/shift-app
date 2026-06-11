'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import ShiftCard from '@/app/components/ShiftCard';

export default function DayOf() {
  const router = useRouter();
  const [alertIdx, setAlertIdx] = useState(0);
  const [proximity, setProximity] = useState<'far' | 'near'>('far');
  const [noteOpen, setNoteOpen] = useState(false);
  const isNear = proximity === 'near';

  const T1 = "Your Shift At ";
  const T2 = "Padmore's";
  const T3 = " Starts in ";
  const TYPEOUT = T1 + T2 + T3;
  const [typedLen, setTypedLen] = useState(0);
  const [countdownSec, setCountdownSec] = useState(23 * 60);
  const isTyped = typedLen >= TYPEOUT.length;
  const mins = Math.floor(countdownSec / 60);

  useEffect(() => {
    const id = setInterval(() => setAlertIdx(i => (i + 1) % 2), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typedLen < TYPEOUT.length) {
      const t = setTimeout(() => setTypedLen(l => l + 1), 26);
      return () => clearTimeout(t);
    }
  }, [typedLen]);

  useEffect(() => {
    if (!isTyped) return;
    const id = setInterval(() => setCountdownSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [isTyped]);

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes jiggle {
          0%   { transform: translateX(0) rotate(0deg); }
          15%  { transform: translateX(-6px) rotate(-2deg); }
          30%  { transform: translateX(5px) rotate(1.5deg); }
          45%  { transform: translateX(-4px) rotate(-1deg); }
          60%  { transform: translateX(3px) rotate(0.5deg); }
          75%  { transform: translateX(-2px) rotate(-0.3deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        .check-in-jiggle { animation: jiggle 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both; }
        @keyframes note-up {
          from { transform: translateX(-50%) translateY(100%); }
          to   { transform: translateX(-50%) translateY(0); }
        }
        @keyframes roll-in {
          from { transform: translateY(10px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .type-cursor {
          display: inline-block; width: 2px; height: 0.85em;
          background: var(--ink); vertical-align: text-bottom;
          margin-left: 2px;
          animation: cursor-blink 0.65s ease-in-out infinite;
        }
        .shift-card-override .scard.confirmed {
          background: var(--steel) !important;
          border: none !important;
        }
        .shift-card-override .scard-name {
          font-size: 46px !important;
          letter-spacing: -0.05em !important;
        }
        .shift-card-override .scard-brief {
          font-size: 22px !important;
          letter-spacing: -0.03em !important;
          opacity: 1 !important;
          color: var(--ink) !important;
        }
        .shift-card-override .scard-price .big {
          font-size: 68px !important;
        }
        .shift-card-override .scard-price .rate {
          font-size: 11px !important;
          opacity: 1 !important;
          color: var(--ink) !important;
        }
        .shift-card-override .scard-loc {
          display: none !important;
        }
        .shift-card-override .pill-role {
          font-size: 10px !important;
          padding: 3px 10px !important;
        }
      `}</style>

      <StatusBar time="10:12" />

      {/* Rolling alerts */}
      <div style={{ padding: '12px 16px 0', overflow: 'hidden' }}>
        {alertIdx === 0 ? (
          <div key="delay" style={{ background: 'var(--red-soft)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, animation: 'roll-in 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>!</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Transit delay — </span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)' }}>allow 10 extra min</span>
            </div>
          </div>
        ) : (
          <button key="tomas" onClick={() => setNoteOpen(true)} style={{ width: '100%', background: 'var(--yellow-soft)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer', animation: 'roll-in 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'white' }}>T</span>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 12, color: 'var(--ink)' }}>Tomás</span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginLeft: 6 }}>sent this morning</span>
            </div>
            <span style={{ color: 'var(--ink)', fontSize: 16, flexShrink: 0 }}>›</span>
          </button>
        )}
      </div>

      {/* Top nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: 'var(--paper)', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <Link href="/worker/map" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', textDecoration: 'none', fontSize: 20 }}>←</Link>
        <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Your Shift</span>
        <div style={{ width: 36 }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Typeout headline */}
        <div style={{ padding: '20px 22px 14px' }}>
          <h1 style={{
            fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 32,
            color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.15, margin: 0,
          }}>
            {TYPEOUT.slice(0, Math.min(typedLen, T1.length))}
            {typedLen > T1.length && (
              <span style={{ fontWeight: 700 }}>
                {T2.slice(0, Math.min(typedLen - T1.length, T2.length))}
              </span>
            )}
            {typedLen > T1.length + T2.length && (
              TYPEOUT.slice(T1.length + T2.length, typedLen)
            )}
            {!isTyped && <span className="type-cursor" />}
            {isTyped && <>{mins} Min.</>}
          </h1>
        </div>

        {/* Shift card */}
        <div className="shift-card-override" style={{ padding: '0 22px' }}>
          <ShiftCard
            state="confirmed"
            role="Barista"
            brief="11A — 4P"
            venue="Your Role"
            pay="$140"
            rate="$28/hr"
          />
        </div>

        {/* Clock-in proximity indicator */}
        <div style={{ margin: '14px 22px 4px' }}>
          <div style={{
            padding: '16px 20px',
            background: isNear ? 'var(--ink)' : 'var(--green)',
            border: 'none',
            borderRadius: 99,
            display: 'flex', alignItems: 'center', gap: 12,
            transition: 'all 0.3s ease',
          }}>
            <div style={{ position: 'relative', width: 38, height: 38, flexShrink: 0 }}>
              <svg width="38" height="38" viewBox="0 0 38 38">
                <circle cx="19" cy="19" r="17" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" opacity="0.5" />
                <circle cx="19" cy="19" r="10" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" opacity="0.7" />
                <circle cx="19" cy="19" r={isNear ? 6 : 4} fill={isNear ? 'white' : 'var(--ink)'} />
                {isNear && <text x="19" y="23" textAnchor="middle" fill="var(--ink)" fontSize="7" fontWeight="700" fontFamily="system-ui">✓</text>}
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: isNear ? 'white' : 'var(--ink)' }}>
              {isNear ? "You're here — clock in." : 'Unlocks When You Arrive'}
            </div>
          </div>
          <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', textAlign: 'center', marginTop: 8 }}>
            {isNear ? 'Geofence confirmed · 0 ft from venue' : 'Within 500 ft of venue'}
          </p>
        </div>

        {/* Backup clock-in PIN — directly below clock-in button */}
        <div style={{ margin: '16px 22px 0', padding: '14px 18px', background: 'var(--green-soft)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>Clock-in PIN</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['4','8','2','6'].map((d, i) => (
              <div key={i} style={{ width: 48, height: 54, background: 'var(--ink)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 38, color: '#fff', letterSpacing: 0 }}>
                {d}
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', margin: '8px 22px 16px', lineHeight: 1.5 }}>
          * Phone dead? Give this to Tomás to clock you in
        </p>

        {/* Checklist */}
        <div style={{ padding: '0 22px', marginTop: 4 }}>
          <div style={{ background: 'var(--lilac-soft)', borderRadius: 18, border: '2px solid var(--ink)', padding: '18px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Before You Go</span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)' }}>2 of 4</span>
            </div>

            {[
              { label: 'Phone charged', checked: true, optional: false },
              { label: 'All black outfit', checked: true, optional: false },
              { label: 'Food handler card', checked: false, optional: true },
              { label: 'Cash for tips out', checked: false, optional: true },
            ].map((item, i, arr) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(13,14,18,0.1)' : 'none' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: item.checked ? 'var(--ink)' : 'transparent', border: item.checked ? 'none' : '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.checked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', textDecoration: item.checked ? 'line-through' : 'none', flex: 1 }}>{item.label}</span>
                {item.optional && <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', background: 'rgba(13,14,18,0.08)', padding: '2px 6px', borderRadius: 4 }}>optional</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Tomás note bottom sheet */}
        {noteOpen && (
          <>
            <div
              onClick={() => setNoteOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(13,14,18,0.45)', zIndex: 50, backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
            />
            <div style={{
              position: 'fixed', bottom: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '100%', maxWidth: 390, zIndex: 51,
              background: 'var(--paper)',
              borderRadius: '24px 24px 0 0',
              padding: '14px 22px 52px',
              boxShadow: '0 -8px 40px rgba(13,14,18,0.18)',
              animation: 'note-up 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
              {/* Handle */}
              <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line-2)', margin: '0 auto 22px' }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, color: 'white' }}>T</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Tomás</div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 1 }}>Owner · Padmore&apos;s Coffee · sent this morning</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--line)', marginBottom: 18 }} />

              {/* Message */}
              <p style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
                Door&apos;s on Tompkins, ring the bell — I&apos;ll be downstairs. Coffee&apos;s already going.
              </p>
            </div>
          </>
        )}

        {/* Bottom links */}
        <div style={{ padding: '0 22px 8px', display: 'flex', justifyContent: 'center', gap: 24 }}>
          <Link href="/worker/cancel-flow" style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--line)', paddingBottom: 2 }}>Running Late or Need to Cancel?</Link>
          <Link href="/worker/report" style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--line)', paddingBottom: 2 }}>Report an issue</Link>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '12px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 35%)' }}>
        {isNear ? (
          <button onClick={() => router.push('/worker/on-shift')} style={{ display: 'block', width: '100%', padding: '16px 22px', background: 'var(--ink)', borderRadius: 99, fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, color: '#FFFFFF', textAlign: 'center', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
            Clock In Now. →
          </button>
        ) : (
          <Link href="/worker/on-shift" style={{ display: 'block', width: '100%', padding: '16px 22px', background: 'var(--ink)', borderRadius: 99, fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, color: '#FFFFFF', textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em' }}>
            I&apos;m Heading There.
          </Link>
        )}
      </div>
    </div>
  );
}
