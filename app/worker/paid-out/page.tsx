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
      {/* Light header */}
      <div style={{ background: 'var(--paper)', padding: '0 22px 24px', flexShrink: 0 }}>
        <StatusBar time="4:11 PM" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A' }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Barista · Padmore&apos;s · Today
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 32,
          color: 'var(--ink)',
          letterSpacing: '-0.05em',
          lineHeight: 1.05,
        }}>
          Your Pay Out
        </div>
        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 32,
          color: 'var(--ink)',
          letterSpacing: '-0.05em',
          lineHeight: 1.05,
          marginBottom: 16,
        }}>
          Padmore&apos;s Coffee.
        </div>

        <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>
          $174.00
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Paystub card */}
        <div
          style={{
            margin: '16px 22px',
            padding: 20,
            background: 'var(--paper)',
            border: '1.5px dashed var(--ink)',
            borderRadius: 16,
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
              color: 'var(--ink)',
              marginBottom: 16,
            }}
          >
            Barista · Today 11A–4P
          </p>

          {/* Separator */}
          <div
            style={{
              borderTop: '1.5px dashed var(--ink)',
              marginBottom: 0,
            }}
          />

          {/* KV rows */}
          {[
            { label: 'Base', value: '5h × $28', amount: '$140.00', green: false, muted: false, bold: true },
            { label: 'Tips', value: null, amount: '+$34.00', green: true, muted: false, bold: true },
            { label: 'Shift fee', value: null, amount: '$0.00', green: false, muted: true, bold: false },
          ].map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < 2 ? '1.5px dashed var(--ink)' : 'none',
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
                    color: 'var(--ink)',
                  }}
                >
                  {row.label}
                </span>
                {row.value && (
                  <span
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 11,
                      color: 'var(--ink)',
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
                  fontWeight: row.bold ? 700 : 400,
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
              borderTop: '1.5px dashed var(--ink)',
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
                color: 'var(--ink)',
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 400,
                fontSize: 40,
                color: 'var(--ink)',
                letterSpacing: '-0.05em',
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
                color: 'var(--ink)',
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
            color: 'var(--ink)',
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
                  color: 'var(--ink)',
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
            color: 'var(--ink)',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          7 open within a mile
        </p>
        <Link href="/v3/dispute" style={{
          display: 'block', textAlign: 'center',
          fontFamily: 'var(--body)', fontSize: 11,
          color: 'var(--ink)', textDecoration: 'underline',
          textDecorationColor: 'rgba(13,14,18,0.25)',
          marginTop: 8
        }}>
          Flag a payment issue
        </Link>
      </div>
    </div>
  );
}
