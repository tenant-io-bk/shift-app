import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function PaidOut() {
  const tags = ['Calm rush', 'Clear brief', 'Fair tips', 'Clean bar', 'Showed up for us'];

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
      <StatusBar time="4:11 PM" />

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
          href="/worker/on-shift"
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
          Paid out
        </span>
        <div style={{ width: 36 }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Success banner */}
        <div
          style={{
            padding: '18px 22px',
            background: 'var(--card)',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Checkmark circle */}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'var(--online)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l2.5 2.5L10 3.5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 20,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              Paid in 11 min.
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--mute)',
              flexShrink: 0,
            }}
          >
            Today 4:11P
          </span>
        </div>

        {/* Paystub card */}
        <div
          style={{
            margin: '16px 22px',
            padding: 20,
            background: 'var(--ink)',
            borderRadius: 14,
          }}
        >
          {/* Business name */}
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.80)',
              marginBottom: 4,
            }}
          >
            Padmore's Coffee
          </p>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: 'rgba(255,255,255,0.60)',
              marginBottom: 16,
            }}
          >
            Barista · Today 11A–4P
          </p>

          {/* Dashed separator */}
          <div
            style={{
              borderTop: '1.5px dashed rgba(255,255,255,0.15)',
              marginBottom: 0,
            }}
          />

          {/* KV rows */}
          {[
            { label: 'Base', value: '5h × $28', amount: '$140.00', color: '#FFFFFF', bold: true },
            { label: 'Tips', value: null, amount: '+$34.00', color: '#16A34A', bold: false },
            { label: 'Shift fee', value: null, amount: '$0.00', color: 'rgba(255,255,255,0.50)', bold: false },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.50)',
                  }}
                >
                  {row.label}
                </span>
                {row.value && (
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.40)',
                      marginLeft: 8,
                    }}
                  >
                    {row.value}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: row.bold ? 600 : 400,
                  fontSize: 15,
                  color: row.color,
                  letterSpacing: '-0.01em',
                }}
              >
                {row.amount}
              </span>
            </div>
          ))}

          {/* Total row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: 14,
              borderTop: '1.5px dashed rgba(255,255,255,0.15)',
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.50)',
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                fontSize: 40,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              $174<span style={{ color: '#5A3CC2' }}>.</span>
            </span>
          </div>

          {/* Card row */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.10)',
              marginTop: 14,
              paddingTop: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.50)',
                letterSpacing: '0.04em',
              }}
            >
              CHASE ·· 4471
            </span>
          </div>
        </div>

        {/* Endorsement row */}
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            color: 'var(--mute)',
            textAlign: 'center',
            margin: '14px 0',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Posting #4471 · Brooklyn · NY
        </p>

        {/* Rate Tomás */}
        <div style={{ padding: '0 22px' }}>
          <h3
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              marginBottom: 14,
            }}
          >
            Rate Tomás
          </h3>

          {/* Stars */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                style={{
                  width: 28,
                  height: 28,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 24,
                  color: 'var(--hydrant)',
                  lineHeight: 1,
                }}
              >
                ★
              </button>
            ))}
          </div>

          {/* Tag pills */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: 4,
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--hydrant)',
                  background: 'var(--hydrant-soft)',
                  borderRadius: 99,
                  padding: '5px 10px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          padding: '12px 22px 36px',
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <Link
          href="/worker/map"
          style={{
            display: 'block',
            width: '100%',
            padding: '15px 22px',
            background: 'var(--ink)',
            borderRadius: 12,
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 16,
            color: '#FFFFFF',
            textAlign: 'center',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Find another shift nearby.
        </Link>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'var(--mute)',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          7 open within a mile
        </p>
      </div>
    </div>
  );
}
