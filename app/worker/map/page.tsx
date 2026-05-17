import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

export default function WorkerMap() {
  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper-2)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes me-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .me-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #5A3CC2;
          animation: me-pulse 2s ease-out infinite;
        }
      `}</style>

      <div style={{ background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 20 }}>
        <StatusBar time="10:12" />

        {/* Top bar */}
        <div
          style={{
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px 0 8px',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <Link
            href="/"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
              textDecoration: 'none',
              fontSize: 20,
            }}
          >
            ←
          </Link>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--paper-2)',
              border: '1px solid var(--line-2)',
              borderRadius: 99,
              padding: '6px 12px 6px 14px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Bed-Stuy · 2 mi
            </span>
            <div
              style={{
                background: '#5A3CC2',
                borderRadius: 99,
                padding: '3px 8px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                18 ready
              </span>
            </div>
          </div>
          <div style={{ width: 36 }} />
        </div>

        {/* Chip filter row */}
        <div
          className="chip-row"
          style={{ padding: '10px 16px', gap: 6 }}
        >
          {['All', '♥ Faves', 'Today', '$25+/hr', 'Barista'].map((label) => (
            <div
              key={label}
              className={`chip${label === 'All' ? ' active' : ''}`}
              style={{ flexShrink: 0 }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Map area */}
      <div
        className="map-canvas"
        style={{ height: 260, position: 'relative', flexShrink: 0 }}
      >
        <svg
          width="390"
          height="260"
          viewBox="0 0 390 260"
          fill="none"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Background */}
          <rect width="390" height="260" fill="#E8EAF0" />

          {/* Roads (white strips) */}
          <rect x="0" y="58" width="390" height="12" fill="white" opacity="0.8" />
          <rect x="0" y="120" width="390" height="10" fill="white" opacity="0.8" />
          <rect x="0" y="182" width="390" height="10" fill="white" opacity="0.8" />
          <rect x="60" y="0" width="10" height="260" fill="white" opacity="0.8" />
          <rect x="140" y="0" width="10" height="260" fill="white" opacity="0.8" />
          <rect x="220" y="0" width="10" height="260" fill="white" opacity="0.8" />
          <rect x="300" y="0" width="10" height="260" fill="white" opacity="0.8" />
          <rect x="365" y="0" width="10" height="260" fill="white" opacity="0.8" />

          {/* City blocks */}
          <rect x="0" y="0" width="58" height="56" rx="2" fill="#D8DAE4" />
          <rect x="72" y="0" width="66" height="56" rx="2" fill="#D4D6E0" />
          <rect x="150" y="0" width="68" height="56" rx="2" fill="#DADBEB" />
          <rect x="230" y="0" width="68" height="56" rx="2" fill="#D8DAE4" />
          <rect x="310" y="0" width="53" height="56" rx="2" fill="#D4D6E0" />

          <rect x="0" y="70" width="58" height="48" rx="2" fill="#D4D6E4" />
          <rect x="72" y="70" width="66" height="48" rx="2" fill="#DDE4D8" />
          <rect x="150" y="70" width="68" height="48" rx="2" fill="#D8DAE4" />
          <rect x="230" y="70" width="68" height="48" rx="2" fill="#D4D6E0" />
          <rect x="310" y="70" width="53" height="48" rx="2" fill="#DDE4D8" />

          <rect x="0" y="130" width="58" height="50" rx="2" fill="#D8DAE4" />
          <rect x="72" y="130" width="66" height="50" rx="2" fill="#D4D6E0" />
          <rect x="150" y="130" width="68" height="50" rx="2" fill="#DADBEB" />
          <rect x="230" y="130" width="68" height="50" rx="2" fill="#DDE4D8" />
          <rect x="310" y="130" width="53" height="50" rx="2" fill="#D4D6E0" />

          <rect x="0" y="192" width="58" height="68" rx="2" fill="#D4D6E0" />
          <rect x="72" y="192" width="66" height="68" rx="2" fill="#D8DAE4" />
          <rect x="150" y="192" width="68" height="68" rx="2" fill="#D4D6E0" />
          <rect x="230" y="192" width="68" height="68" rx="2" fill="#DADBEB" />
          <rect x="310" y="192" width="53" height="68" rx="2" fill="#D8DAE4" />

          {/* G train route dashed line */}
          <path
            d="M 40 260 Q 80 220 120 180 Q 160 140 195 110 Q 220 88 240 70"
            stroke="#5A3CC2"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Me dot */}
          <circle cx="110" cy="155" r="8" fill="white" opacity="0.9" />
          <circle cx="110" cy="155" r="5" fill="#5A3CC2" />
          <circle cx="110" cy="155" r="2" fill="white" />
        </svg>

        {/* Me pulsing ring (CSS animated) */}
        <div
          style={{
            position: 'absolute',
            left: 110,
            top: 155,
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
          }}
        >
          <div className="me-pulse-ring" />
        </div>

        {/* Pin 1 — Padmore's (favorite) */}
        <div
          className="shift-pin"
          style={{ left: 185, top: 120 }}
        >
          <div
            className="pin-card"
            style={{ background: '#0D0E12', borderColor: '#0D0E12', minWidth: 64 }}
          >
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: '#fff' }}>
              $140
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
              4.9★
            </span>
          </div>
          <div className="pin-tail" style={{ background: '#0D0E12', borderColor: '#0D0E12' }} />
        </div>

        {/* Pin 2 — The Wren */}
        <div
          className="shift-pin"
          style={{ left: 270, top: 90 }}
        >
          <div className="pin-card" style={{ minWidth: 58 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12, color: 'var(--ink)' }}>
              $96
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>
              4.7★
            </span>
          </div>
          <div className="pin-tail" />
        </div>

        {/* Pin 3 — Bar Blondeau (urgent) */}
        <div
          className="shift-pin"
          style={{ left: 340, top: 140 }}
        >
          <div className="pin-card" style={{ minWidth: 60, border: '1.5px solid #5A3CC2' }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12, color: 'var(--ink)' }}>
              $120
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>
              4.8★
            </span>
          </div>
          <div className="pin-tail" style={{ borderColor: '#5A3CC2' }} />
        </div>

        {/* Pin 4 — Peoples Wine */}
        <div
          className="shift-pin"
          style={{ left: 60, top: 205 }}
        >
          <div className="pin-card" style={{ minWidth: 52, opacity: 0.75 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12, color: 'var(--ink)' }}>
              $85
            </span>
          </div>
          <div className="pin-tail" />
        </div>
      </div>

      {/* Bottom sheet — relative, scrolls with page */}
      <div
        style={{
          position: 'relative',
          background: 'var(--card)',
          borderRadius: '18px 18px 0 0',
          boxShadow: '0 -4px 32px rgba(13,14,18,0.12)',
          flex: 1,
        }}
      >
        {/* Sheet handle */}
        <div className="sheet-handle" />

        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            padding: '16px 22px 8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            18 ready now.
          </span>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--mute)',
            }}
          >
            avg $23/hr
          </span>
        </div>

        {/* Rank strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--ink)',
            padding: '10px 22px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            #4. You
          </span>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--mute)',
            }}
          >
            2 more shifts to climb to #2
          </span>
        </div>

        {/* Shift list */}
        <div style={{ padding: '4px 0' }}>
          {[
            {
              name: "Padmore's Coffee",
              role: 'Needs a barista for the lunch rush',
              meta: 'G · 25 MIN · 0.6 MI',
              pay: '$140.',
              posting: '#4471',
              bg: 'linear-gradient(135deg, #c4a577 0%, #8b6545 60%, #5c3d22 100%)',
              rating: '4.9',
              urgent: false,
            },
            {
              name: 'The Wren',
              role: 'Covering the floor for lunch service',
              meta: 'G · 18 MIN · 0.4 MI',
              pay: '$96.',
              posting: '#4468',
              bg: 'linear-gradient(135deg, #a8c4a0 0%, #6b9e62 60%, #4a7040 100%)',
              rating: '4.7',
              urgent: false,
            },
            {
              name: 'Bar Blondeau',
              role: 'Barback for dinner service tonight',
              meta: 'L · 22 MIN · 1.1 MI',
              pay: '$120.',
              posting: '#4469',
              bg: 'linear-gradient(135deg, #b8a0c8 0%, #8060a0 60%, #5a3c78 100%)',
              rating: '4.8',
              urgent: true,
            },
            {
              name: 'Peoples Wine',
              role: 'Retail floor help this afternoon',
              meta: 'A/C · 14 MIN · 0.3 MI',
              pay: '$85.',
              posting: '#4462',
              bg: 'linear-gradient(135deg, #f0c080 0%, #c88040 60%, #906020 100%)',
              rating: '4.6',
              urgent: false,
            },
          ].map((shift) => (
            <Link
              key={shift.posting}
              href="/worker/job-detail"
              style={{
                display: 'flex',
                gap: 12,
                padding: '12px 22px',
                borderBottom: '1px solid var(--line)',
                alignItems: 'flex-start',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {/* Photo placeholder */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: shift.bg,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    background: 'var(--card)',
                    borderRadius: 99,
                    padding: '1px 5px',
                    border: '1px solid var(--line)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600, color: 'var(--mute)' }}>
                    {shift.rating}★
                  </span>
                </div>
              </div>

              {/* Middle content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 600,
                      fontSize: 15,
                      color: 'var(--ink)',
                    }}
                  >
                    {shift.name}
                  </span>
                  {shift.urgent && (
                    <span className="tag red" style={{ fontSize: 9, padding: '2px 6px' }}>
                      urgent
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--mono)',
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: 'var(--mute)',
                    marginTop: 2,
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {shift.role}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--mute-2)',
                    marginTop: 4,
                    letterSpacing: '0.06em',
                  }}
                >
                  {shift.meta}
                </p>
              </div>

              {/* Right: pay */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 700,
                    fontSize: 20,
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {shift.pay}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    color: 'var(--mute)',
                    marginTop: 2,
                  }}
                >
                  Posting {shift.posting}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <BottomNav active="shifts" />
      </div>
    </div>
  );
}
