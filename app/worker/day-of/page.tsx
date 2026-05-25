import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import ShiftCard from '@/app/components/ShiftCard';

export default function DayOf() {
  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StatusBar time="10:12" />

      {/* Top nav */}
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
          flexShrink: 0,
        }}
      >
        <Link
          href="/worker/map"
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
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--mute)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Day of
        </span>
        <div style={{ width: 36 }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Countdown banner */}
        <div style={{ background: 'var(--green-soft)', padding: '14px 22px 18px' }}>
          <div style={{
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 56,
            color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.05em',
          }}>
            23 min.
          </div>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)',
            opacity: 0.65, marginTop: 6, letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            Head out by 10:35A · starts at 11A
          </p>
        </div>

        {/* Confirmed shift card */}
        <div style={{ padding: '14px 14px 0' }}>
          <ShiftCard
            state="confirmed"
            role="Barista"
            time="11A — 4P"
            loc="Bedstuy, BK"
            venue="Padmore's Coffee"
            brief={['Confirmed · on shift in 23 min.', 'Tap to check in when you arrive.']}
            pay="$140"
            rate="Locked · clock in to start"
          />
        </div>

        {/* Commute card */}
        <div
          style={{
            margin: '14px 22px',
            padding: 16,
            background: 'var(--card)',
            border: '2px solid var(--ink)',
            borderRadius: 12,
          }}
        >
          {/* Route row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'var(--ink)',
              }}
            >
              G train · DeKalb Av → Bedford-Nostrand
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--ink)',
                flexShrink: 0,
                marginLeft: 8,
              }}
            >
              25 min
            </span>
          </div>

          {/* Mini-map SVG */}
          <svg
            width="100%"
            height="130"
            viewBox="0 0 346 130"
            fill="none"
            style={{ display: 'block' }}
          >
            {/* Background */}
            <rect width="346" height="130" rx="8" fill="#F0F2F5" />

            {/* Horizontal road lines */}
            <rect x="0" y="35" width="346" height="6" fill="white" opacity="0.7" />
            <rect x="0" y="75" width="346" height="6" fill="white" opacity="0.7" />
            <rect x="0" y="110" width="346" height="6" fill="white" opacity="0.7" />

            {/* Vertical road lines */}
            <rect x="60" y="0" width="6" height="130" fill="white" opacity="0.7" />
            <rect x="150" y="0" width="6" height="130" fill="white" opacity="0.7" />
            <rect x="240" y="0" width="6" height="130" fill="white" opacity="0.7" />

            {/* G train route — dashed purple line */}
            <path
              d="M 80 125 L 80 90 L 100 75 L 160 75 L 160 40 L 180 22 L 240 22"
              stroke="#72c15f"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* DeKalb stop (start) */}
            <circle cx="80" cy="100" r="5" fill="white" stroke="#72c15f" strokeWidth="2" />
            <circle cx="80" cy="100" r="2.5" fill="#72c15f" />

            {/* Bedford-Nostrand stop (end/destination) */}
            <circle cx="240" cy="22" r="6" fill="white" stroke="#72c15f" strokeWidth="2" />
            <circle cx="240" cy="22" r="3" fill="#72c15f" />

            {/* Station labels */}
            <text x="90" y="104" fontFamily="monospace" fontSize="9" fill="#6B6E78">DeKalb Av</text>
            <text x="250" y="26" fontFamily="monospace" fontSize="9" fill="#72c15f">Bedford-Nostrand</text>

            {/* You are here dot */}
            <circle cx="80" cy="125" r="5" fill="#72c15f" opacity="0.9" />
            <circle cx="80" cy="125" r="2" fill="white" />
          </svg>
        </div>

        {/* Checklist */}
        <div style={{ padding: '0 22px', marginTop: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}
            >
              Before you go
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--mute)',
              }}
            >
              2 of 4
            </span>
          </div>

          {[
            { label: 'Phone charged', checked: true, optional: false },
            { label: 'All black outfit', checked: true, optional: false },
            { label: 'Food handler card', checked: false, optional: true },
            { label: 'Cash for tips out', checked: false, optional: true },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: item.checked ? 'var(--ink)' : 'transparent',
                  border: item.checked ? 'none' : '2px solid var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l2.5 2.5L10 4"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 14,
                  color: item.checked ? 'var(--mute)' : 'var(--ink)',
                  textDecoration: item.checked ? 'line-through' : 'none',
                  flex: 1,
                }}
              >
                {item.label}
              </span>

              {item.optional && (
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--mute-2)',
                    background: 'var(--paper-2)',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  optional
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Message from Tomás */}
        <div
          style={{
            margin: '14px 22px',
            padding: 16,
            background: 'var(--card)',
            border: '2px solid var(--ink)',
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
            }}
          >
            {/* Small avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #c4a577, #8b6545 60%, #5c3d22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 14,
                  color: 'white',
                }}
              >
                T
              </span>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--ink)',
                }}
              >
                Tomás
              </span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--mute)',
                  marginLeft: 8,
                }}
              >
                sent this morning
              </span>
            </div>
          </div>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 14,
              color: 'var(--ink)',
              lineHeight: 1.5,
            }}
          >
            Door's on Tompkins, ring the bell — I'll be downstairs. Coffee's already going.
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          padding: '12px 22px 36px',
          background: 'linear-gradient(to bottom, transparent, var(--paper) 35%)',
        }}
      >
        <Link
          href="/worker/on-shift"
          style={{
            display: 'block',
            width: '100%',
            padding: '16px 22px',
            background: 'var(--ink)',
            borderRadius: 99,
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 16,
            color: '#FFFFFF',
            textAlign: 'center',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          I'm heading there.
        </Link>
      </div>
    </div>
  );
}
