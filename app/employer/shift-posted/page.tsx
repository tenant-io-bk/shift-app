'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';
import VerifiedBadge from '@/app/components/VerifiedBadge';
import { getBadges, type Badge } from '@/lib/setupProgress';

export default function ShiftPosted() {
  const [phase, setPhase] = useState<'matching' | 'filling' | 'filled'>('matching');
  const [tier, setTier] = useState<'favorites' | 'past' | 'network'>('favorites');
  const [elapsed, setElapsed] = useState(0);
  const [fillTime, setFillTime] = useState('');

  // If the matched worker's role was verified via the skills quiz, surface it.
  const [baristaBadge, setBaristaBadge] = useState<Badge | null>(null);
  useEffect(() => { setBaristaBadge(getBadges()['Barista'] ?? null); }, []);

  useEffect(() => {
    // A verified favorite accepts almost immediately, so the matcher fills
    // fast and never has to expand to past workers / the open network.
    const verified = !!getBadges()['Barista'];
    const start = Date.now();
    const tick = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    const timers: ReturnType<typeof setTimeout>[] = [];
    const fillAt = (delay: number) => timers.push(setTimeout(() => {
      const secs = Math.floor((Date.now() - start) / 1000);
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      setFillTime(m > 0 ? `${m}m ${s}s` : `${s}s`);
      setPhase('filled');
    }, delay));

    if (verified) {
      timers.push(setTimeout(() => setPhase('filling'), 3000));
      fillAt(4200);
    } else {
      // Tier progression: favorites → past workers → network
      timers.push(setTimeout(() => setTier('past'), 4000));
      timers.push(setTimeout(() => setTier('network'), 7000));
      timers.push(setTimeout(() => setPhase('filling'), 9000));
      fillAt(10200);
    }

    return () => { clearInterval(tick); timers.forEach(clearTimeout); };
  }, []);

  const isFilled = phase === 'filled';
  const isFilling = phase === 'filling';

  const elapsedStr = (() => {
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  })();

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes live-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        .live-dot { animation: live-pulse 1.8s ease-in-out infinite; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes check-pop {
          0%   { opacity: 0; transform: scale(0.4) rotate(-12deg); }
          60%  { transform: scale(1.15) rotate(3deg); }
          80%  { transform: scale(0.95) rotate(-1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .check-pop { animation: check-pop 0.55s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes worker-slide {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .worker-slide { animation: worker-slide 0.5s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.1s; }

        @keyframes confetti-pop {
          0%   { opacity: 0; transform: scale(0); }
          50%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <StatusBar time="10:14" />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 140 }}>

        {/* Header */}
        <div style={{ padding: '16px 22px 20px' }}>

          {/* Status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {isFilled ? (
              <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Filled · {fillTime}
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div className="live-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {isFilling ? 'Worker Found…' : tier === 'favorites' ? `${baristaBadge ? 'Matching Verified Favorites' : 'Notifying Favorites'} · ${elapsedStr}` : tier === 'past' ? `Expanding to Past Workers · ${elapsedStr}` : `Open to Network · ${elapsedStr}`}
                </span>
              </div>
            )}
          </div>

          {/* Heading */}
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.05 }}>
            {isFilled ? 'Shift Filled At' : 'Your Shift Is Live At'}
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 20 }}>
            Padmore&apos;s Coffee.
          </div>

          {/* Amount or check */}
          {isFilled ? (
            <div className="check-pop" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--green-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M7 19L14 26L29 11" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, textAlign: 'center', marginBottom: 20 }}>
              $130
            </div>
          )}
        </div>

        {/* Worker card — only when filled */}
        {isFilled && (
          <div className="worker-slide" style={{ margin: '0 22px 16px' }}>
            <div className="receipt-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Avatar */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: 'var(--ink)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: '#fff' }}>MT</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Marcus T.</div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 2 }}>Barista · 3 yrs exp · 127 shifts</div>
                {baristaBadge && (
                  <div style={{ marginTop: 6 }}>
                    <VerifiedBadge role="Barista" />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L7.2 4.2L10.5 4.5L8.1 6.6L8.9 10L6 8.2L3.1 10L3.9 6.6L1.5 4.5L4.8 4.2L6 1Z" fill="var(--ink)" />
                  </svg>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>4.9</span>
                </div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', background: 'var(--green-soft)', borderRadius: 99, padding: '3px 8px' }}>Confirmed</div>
              </div>
            </div>

            {/* Why this match — consumes the verified skill badge */}
            {baristaBadge && (
              <div style={{ marginTop: 10, display: 'flex', gap: 9, alignItems: 'flex-start', background: 'var(--green-soft)', borderRadius: 12, padding: '11px 13px' }}>
                <svg width="13" height="13" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--green)" /></svg>
                <div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 2 }}>Why Marcus</div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.45 }}>
                    Passed SHIFT&apos;s Barista skills check at <strong>{baristaBadge.score}%</strong> — surfaced ahead of unverified workers for this role.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Receipt card */}
        <div className="receipt-card" style={{ margin: '0 22px 16px' }}>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            <div style={{ position: 'absolute', left: 'calc(50% - 0.75px)', top: 0, bottom: 0, width: 0, borderLeft: '1.5px dashed var(--ink)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 0, borderTop: '1.5px dashed var(--ink)', pointerEvents: 'none' }} />

            <div style={{ padding: '20px 16px 16px 20px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>When</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em' }}>Today · 11A – 4P</p>
            </div>
            <div style={{ padding: '20px 20px 16px 16px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Role</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em' }}>Barista</p>
            </div>
            <div style={{ padding: '16px 16px 20px 20px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Rate</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em' }}>$26/hr</p>
            </div>
            <div style={{ padding: '16px 20px 20px 16px' }}>
              <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 4 }}>Total</p>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em' }}>$130</p>
            </div>
          </div>

          {/* Footer row */}
          <div style={{ borderTop: '1.5px dashed var(--ink)', padding: '14px 20px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {isFilled ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)' }}>Marcus Confirmed</span>
                </div>
                <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>+1 Standby On Deck</span>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                {/* Tier indicators */}
                {[
                  { key: 'favorites', label: baristaBadge ? 'Verified Favorite Accepting' : 'Notifying 3 Favorites', sub: baristaBadge ? 'Marco R. · Verified Barista — ready now' : 'Marco R., Sam O., Jules L.' },
                  { key: 'past',      label: 'Expanding to Past Workers', sub: '24 workers who’ve been here' },
                  { key: 'network',   label: 'Opening to Network', sub: '94 verified workers nearby' },
                ].map((t, i) => {
                  const tierOrder = { favorites: 0, past: 1, network: 2 };
                  const currentOrder = tierOrder[tier];
                  const isActive = t.key === tier;
                  const isDone = tierOrder[t.key as keyof typeof tierOrder] < currentOrder;
                  return (
                    <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: isDone ? 0.4 : 1, transition: 'opacity 0.5s' }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: isDone ? 'var(--green)' : isActive ? 'var(--green)' : 'var(--line)', flexShrink: 0, transition: 'background 0.3s' }}
                        className={isActive ? 'live-dot' : ''} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>{t.label}</div>
                        {isActive && <div style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--ink)', marginTop: 1 }}>{t.sub}</div>}
                      </div>
                      {isDone && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="var(--green)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* What's next — only shown while matching */}
        {!isFilled && (
          <div style={{ padding: '4px 22px 0' }}>
            <p style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 12 }}>What&apos;s Next</p>
            {[
              'Workers nearby get an instant push notification.',
              "First to accept locks in — you'll see them on your roster.",
              'Standby worker is on deck in case of no-show.',
            ].map((text, i) => (
              <p key={i} style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.55, marginBottom: 8 }}>
                {String(i + 1).padStart(2, '0')}. {text}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Fixed CTAs */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390,
        padding: '12px 22px 36px',
        background: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {isFilled ? (
          <>
            <Link href="/employer/day-of" style={{ display: 'block', background: 'var(--ink)', color: 'white', borderRadius: 99, padding: '15px 22px', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, letterSpacing: '-0.01em' }}>
              Track Shift →
            </Link>
            <Link href="/employer/roster" style={{ display: 'block', border: '2px solid var(--ink)', borderRadius: 99, padding: '14px 22px', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, color: 'var(--ink)' }}>
              View Roster
            </Link>
          </>
        ) : (
          <Link href="/employer/day-of" style={{ display: 'block', background: 'var(--ink)', color: 'white', borderRadius: 99, padding: '15px 22px', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, letterSpacing: '-0.01em' }}>
            Track This Shift →
          </Link>
        )}
      </div>

      <EmployerNav active="post" />
    </div>
  );
}
