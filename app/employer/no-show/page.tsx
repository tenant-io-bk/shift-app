'use client';

import Link from 'next/link';

export default function NoShow() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
      <style>{`
        @keyframes pulse-card {
          0%, 100% { box-shadow: 0 0 0 0 rgba(229,57,31,0.18); }
          50% { box-shadow: 0 0 0 10px rgba(229,57,31,0); }
        }
        .pulse-card { animation: pulse-card 2.2s ease-in-out infinite; }
        @keyframes bar-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        .bar-pulse { animation: bar-pulse 1.4s ease-in-out infinite; }
      `}</style>

      {/* Nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--paper)',
      }}>
        <Link href="/employer/roster" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Roster Alert</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: 22 }}>
        {/* Alert header */}
        <div style={{
          padding: '14px 16px',
          background: 'var(--red-soft)',
          border: '1px solid var(--red)',
          borderRadius: 10,
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--body)',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}>MARCO HASN&apos;T ARRIVED</span>
          </div>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 12,
            color: 'var(--ink)',
            marginTop: 2,
          }}>T+10 · Standby ready in 04:52</p>
        </div>

        {/* Worker row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 0',
          borderBottom: '1px solid var(--line)',
          opacity: 0.7,
        }}>
          {/* Avatar */}
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8060a0, #4a3070)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            opacity: 0.5,
          }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: '#fff' }}>M</span>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: 15,
              color: 'var(--ink)',
              textDecoration: 'line-through',
            }}>Marco Reyes</div>
            <div style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--ink)',
              marginTop: 2,
            }}>Expected at 11:00A · last seen 10:48A (0.8 mi away)</div>
          </div>

          <div style={{
            background: 'var(--red-soft)',
            borderRadius: 6,
            padding: '3px 7px',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'var(--body)',
              fontSize: 9.5,
              fontWeight: 600,
              color: 'var(--red)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>NOT ARRIVED</span>
          </div>
        </div>

        {/* Countdown timer */}
        <div className="pulse-card" style={{
          marginTop: 20,
          padding: 20,
          background: 'var(--paper)',
          border: '2px solid var(--red)',
          borderRadius: 14,
        }}>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>SAM ORTIZ FILLS IN</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              fontSize: 52,
              color: 'var(--ink)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}>04:52</span>
            <span style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--ink)',
              textAlign: 'right',
              lineHeight: 1.5,
            }}>auto-replaces{'\n'}at 11:10A</span>
          </div>

          {/* Progress bar */}
          <div style={{
            height: 4,
            background: 'rgba(13,14,18,0.1)',
            borderRadius: 99,
            overflow: 'hidden',
            marginBottom: 12,
          }}>
            <div className="bar-pulse" style={{
              width: '48%',
              height: '100%',
              background: 'var(--red)',
              borderRadius: 99,
            }} />
          </div>

          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 12,
            color: 'var(--ink)',
          }}>⚡ Sam confirmed · 0.4 mi away · ETA 4 min</p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          <button style={{
            width: '100%',
            height: 54,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent',
            border: '2px solid var(--ink)',
            borderRadius: 99,
            fontFamily: 'var(--body)',
            fontWeight: 600,
            fontSize: 16,
            color: 'var(--ink)',
            cursor: 'pointer',
          }}>Contact Marco</button>

          <button style={{
            width: '100%',
            height: 54,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--ink)',
            border: '2px solid var(--ink)',
            borderRadius: 99,
            fontFamily: 'var(--body)',
            fontWeight: 700,
            fontSize: 16,
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}>Replace Now — Sam O.</button>
        </div>
      </div>
    </div>
  );
}
