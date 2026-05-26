import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function WorkerConfirm() {
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
      <StatusBar time="10:14" />

      {/* Top bar */}
      <div
        style={{
          height: 52,
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
        }}
      >
        <Link
          href="/worker/job-detail"
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
            fontFamily: 'var(--body)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--ink)',
            letterSpacing: '0.04em',
          }}
        >
          Shift locked
        </span>
        <div style={{ width: 36 }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, padding: '22px 22px', paddingBottom: 120, overflowY: 'auto' }}>

        {/* Receipt header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--mute-2)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--body)',
              fontSize: 11,
              color: 'var(--mute)',
            }}
          >
            Shift locked · just now
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 52,
            color: 'var(--ink)',
            letterSpacing: '-0.075em',
            lineHeight: 1.05,
            marginBottom: 22,
          }}
        >
          $140 —{' '}
          <span>yours</span>
          <span style={{ color: 'var(--hydrant)' }}>.</span>
        </h1>

        {/* Receipt card */}
        <div
          className="receipt-card"
          style={{ padding: 20, marginBottom: 12 }}
        >
          {/* 2x2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
            }}
          >
            {/* Row 1 */}
            <div style={{ paddingBottom: 16, paddingRight: 16 }}>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                  marginBottom: 4,
                }}
              >
                When
              </p>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                Today · 11A – 4P
              </p>
            </div>
            <div style={{ paddingBottom: 16, paddingLeft: 16, borderLeft: '1px dashed var(--paper-3)' }}>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                  marginBottom: 4,
                }}
              >
                Hours
              </p>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                5 hrs
              </p>
            </div>
          </div>

          {/* Dashed divider */}
          <div style={{ borderBottom: '2px dashed var(--paper-3)', margin: '0 0 16px' }} />

          {/* Row 2 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
            }}
          >
            <div style={{ paddingRight: 16 }}>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                  marginBottom: 4,
                }}
              >
                Get there
              </p>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                G from DeKalb · 25 min
              </p>
            </div>
            <div style={{ paddingLeft: 16, borderLeft: '1px dashed var(--paper-3)' }}>
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                  marginBottom: 4,
                }}
              >
                Address
              </p>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                172 Tompkins Ave
              </p>
            </div>
          </div>

          {/* Total row */}
          <div
            style={{
              borderTop: '2px dashed var(--paper-3)',
              marginTop: 16,
              paddingTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
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
              Take home
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              $140<span style={{ color: 'var(--hydrant)' }}>.</span>
            </span>
          </div>
        </div>

        {/* Back-out notice */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', lineHeight: 1.5 }}>
            You can back out within 15 min. No penalty.
          </p>
          <Link
            href="/v3/cancel-flow"
            style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--mute)',
              textDecoration: 'underline',
              flexShrink: 0,
              marginLeft: 12,
            }}
          >
            Cancel
          </Link>
        </div>

        {/* What's next */}
        <div style={{ marginTop: 20 }}>
          <p
            style={{
              fontFamily: 'var(--body)',
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              marginBottom: 12,
            }}
          >
            What's next
          </p>
          {[
            "01. Head out by 10:35A to arrive on time.",
            "02. Tomás will have your name at the door.",
          ].map((item) => (
            <p
              key={item}
              style={{
                fontFamily: 'var(--body)',
                fontSize: 14,
                color: 'var(--ink)',
                lineHeight: 1.55,
                marginBottom: 8,
              }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Fixed bottom actions */}
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
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <button
          style={{
            width: '100%',
            padding: '14px 22px',
            border: '2px solid var(--ink)',
            borderRadius: 99,
            background: 'transparent',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 15,
            color: 'var(--ink)',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}
        >
          Message Tomás
        </button>
        <Link
          href="/worker/day-of"
          style={{
            width: '100%',
            padding: '14px 22px',
            background: 'var(--ink)',
            borderRadius: 99,
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 16,
            color: '#FFFFFF',
            textAlign: 'center',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            display: 'block',
          }}
        >
          Done.
        </Link>
      </div>
    </div>
  );
}
