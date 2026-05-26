import Link from 'next/link';

export default function NoShow() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
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
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Roster alert</span>
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
              color: 'var(--red)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}>MARCO HASN'T ARRIVED</span>
          </div>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 12,
            color: 'var(--red)',
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
              color: 'var(--mute)',
              textDecoration: 'line-through',
            }}>Marco Reyes</div>
            <div style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--mute)',
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
        <div style={{
          marginTop: 20,
          padding: 20,
          background: 'var(--ink)',
          borderRadius: 14,
        }}>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>SAM ORTIZ FILLS IN</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: 52,
              color: '#fff',
              letterSpacing: '-0.075em',
              lineHeight: 1,
            }}>04:52</span>
            <span style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'right',
              lineHeight: 1.5,
            }}>auto-replaces{'\n'}at 11:10A</span>
          </div>

          {/* Progress bar */}
          <div style={{
            height: 3,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 99,
            overflow: 'hidden',
            marginBottom: 12,
          }}>
            <div style={{
              width: '48%',
              height: '100%',
              background: 'var(--red)',
              borderRadius: 99,
            }} />
          </div>

          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
          }}>⚡ Sam confirmed · 0.4 mi away · ETA 4 min</p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          <button style={{
            width: '100%',
            padding: '15px',
            background: 'transparent',
            border: '2px solid var(--ink)',
            borderRadius: 99,
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 16,
            color: 'var(--ink)',
            cursor: 'pointer',
          }}>Contact Marco</button>

          <button style={{
            width: '100%',
            padding: '15px',
            background: 'var(--ink)',
            border: 'none',
            borderRadius: 99,
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 16,
            color: '#fff',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}>Replace now — Sam O.</button>
        </div>
      </div>
    </div>
  );
}
