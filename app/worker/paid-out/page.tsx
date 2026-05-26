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
      {/* Stamp header */}
      <div style={{ background: 'var(--ink)', padding: '0 22px 28px', flexShrink: 0 }}>
        <StatusBar dark time="4:11 PM" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, marginTop: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--hydrant)' }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            In 11 min · Barista · Padmore&apos;s
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 52,
          color: 'white',
          letterSpacing: '-0.075em',
          lineHeight: 0.9,
          marginBottom: 16,
        }}>
          PAID OUT<span style={{ color: 'var(--hydrant)' }}>.</span>
        </h1>

        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 36,
          color: 'white',
          letterSpacing: '-0.055em',
          lineHeight: 1,
        }}>
          $174<span style={{ color: 'var(--hydrant)' }}>.</span><span style={{ fontSize: 24, fontWeight: 600, opacity: 0.6 }}>00</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Stub for old banner removal */}
        <div style={{ display: 'none' }}>
          <span
            style={{
              fontFamily: 'var(--body)',
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
            background: 'var(--paper)',
            border: '2px solid var(--ink)',
            borderRadius: 14,
          }}
        >
          {/* Business name */}
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              marginBottom: 4,
            }}
          >
            Padmore's Coffee
          </p>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--mute)',
              marginBottom: 16,
            }}
          >
            Barista · Today 11A–4P
          </p>

          {/* Dashed separator */}
          <div
            style={{
              borderTop: '1.5px dashed var(--line)',
              marginBottom: 0,
            }}
          />

          {/* KV rows */}
          {[
            { label: 'Base', value: '5h × $28', amount: '$140.00', green: false, muted: false, bold: true },
            { label: 'Tips', value: null, amount: '+$34.00', green: true, muted: false, bold: false },
            { label: 'Shift fee', value: null, amount: '$0.00', green: false, muted: true, bold: false },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--mute)',
                  }}
                >
                  {row.label}
                </span>
                {row.value && (
                  <span
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 11,
                      color: 'var(--mute)',
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
                  color: row.green ? 'var(--green)' : row.muted ? 'var(--mute)' : 'var(--ink)',
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
              borderTop: '1.5px dashed var(--line)',
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--body)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--mute)',
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 40,
                color: 'var(--ink)',
                letterSpacing: '-0.075em',
                lineHeight: 1,
              }}
            >
              $174<span style={{ color: '#72c15f' }}>.</span>
            </span>
          </div>

          {/* Card row */}
          <div
            style={{
              borderTop: '1px solid var(--line)',
              marginTop: 14,
              paddingTop: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--body)',
                fontSize: 11,
                color: 'var(--mute)',
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
            fontFamily: 'var(--body)',
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
                  color: 'var(--yellow)',
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
                  fontFamily: 'var(--body)',
                  fontSize: 11,
                  color: 'var(--ink)',
                  background: 'var(--paper-2)',
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
          href="/v3/mutual-review"
          style={{
            display: 'block',
            width: '100%',
            padding: '15px 22px',
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
          Rate Padmore's →
        </Link>
        <p
          style={{
            fontFamily: 'var(--body)',
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
