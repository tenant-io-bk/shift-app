import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function JobDetail() {
  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes pulse-live {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .live-dot { animation: pulse-live 1.8s ease-in-out infinite; }
      `}</style>

      <StatusBar time="10:12" />

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
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Share button */}
          <button
            style={{
              width: 36,
              height: 36,
              border: '2px solid var(--ink)',
              borderRadius: 99,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="12" cy="3" r="1.5" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="12" cy="13" r="1.5" stroke="var(--ink)" strokeWidth="1.4" />
              <circle cx="4" cy="8" r="1.5" stroke="var(--ink)" strokeWidth="1.4" />
              <line x1="10.7" y1="3.7" x2="5.3" y2="7.3" stroke="var(--ink)" strokeWidth="1.4" />
              <line x1="5.3" y1="8.7" x2="10.7" y2="12.3" stroke="var(--ink)" strokeWidth="1.4" />
            </svg>
          </button>
          {/* Heart button */}
          <button
            style={{
              width: 36,
              height: 36,
              border: '2px solid var(--ink)',
              borderRadius: 99,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 13.5C8 13.5 2 9.5 2 5.5C2 3.57 3.57 2 5.5 2C6.61 2 7.6 2.53 8 3.25C8.4 2.53 9.39 2 10.5 2C12.43 2 14 3.57 14 5.5C14 9.5 8 13.5 8 13.5Z"
                stroke="var(--ink)"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Live indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 22px 0',
          }}
        >
          <div
            className="live-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#EA4B2A',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--mute)',
            }}
          >
            Posted 14 min ago · 11 looking
          </span>
        </div>

        {/* Business name block */}
        <div style={{ padding: '8px 22px' }}>
          <h1
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 32,
              color: 'var(--ink)',
              letterSpacing: '-0.075em',
              lineHeight: 1.1,
            }}
          >
            Padmore's Coffee
          </h1>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              fontSize: 18,
              color: 'var(--ink)',
              marginTop: 4,
              lineHeight: 1.3,
            }}
          >
            Needs a barista for the lunch rush.
          </p>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--mute)',
              letterSpacing: '0.08em',
              marginTop: 8,
              textTransform: 'uppercase',
            }}
          >
            Bed-Stuy / 172 Tompkins Ave / 0.6 mi
          </p>
        </div>

        {/* Deck strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            padding: '16px 22px',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            margin: '12px 0',
            gap: 4,
          }}
        >
          {[
            { label: 'When', value: 'Today 11–4P' },
            { label: 'Hours', value: '5 hrs' },
            { label: 'Get there', value: 'G · 25 min' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--mute)',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Pay block */}
        <div style={{ margin: '0 22px', padding: '20px 22px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 4 }}>
            You take home
          </p>
          <div style={{ lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 1 }}>$140</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64, color: '#72c15f', letterSpacing: '-0.075em', lineHeight: 1 }}>.</span>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginTop: 8 }}>$28/hr · pre-tips</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', marginTop: 4 }}>Tips avg $32 cash / shift</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, borderTop: '1px solid var(--line)', marginTop: 14 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L2 4v4c0 3.31 2.69 6 6 6s6-2.69 6-6V4L8 1.5Z" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M5.5 8l1.5 1.5L10.5 6" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)' }}>Paid same-day — straight to your debit</span>
          </div>
        </div>

        {/* From block */}
        <div
          style={{
            margin: '16px 22px 0',
            padding: 16,
            background: 'var(--card)',
            border: '2px solid var(--ink)',
            borderRadius: 12,
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 48,
              height: 48,
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
                fontSize: 20,
                color: 'white',
              }}
            >
              T
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 16,
                  color: 'var(--ink)',
                }}
              >
                Tomás
              </span>
              {/* Checkmark badge */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'var(--online)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l1.5 1.5L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: 'var(--mute)',
                marginTop: 2,
              }}
            >
              Owner · 47 shifts · 4.9★ from 32
            </p>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 14,
                color: 'var(--ink)',
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              "Need someone steady on bar for the rush. We pull on a Linea, no auto-tamp — comfortable with that?"
            </p>
          </div>
        </div>

        {/* Work section */}
        <div style={{ padding: '16px 22px 0' }}>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              paddingBottom: 12,
              borderBottom: '1px solid var(--line)',
            }}
          >
            The work
          </p>
          {[
            { num: '01', task: 'Espresso and pour-over service' },
            { num: '02', task: 'Bar setup and breakdown' },
            { num: '03', task: 'Stock and mise en place' },
            { num: '04', task: 'Team communication (it\'s busy)' },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--mute)',
                  flexShrink: 0,
                  width: 20,
                }}
              >
                {item.num}
              </span>
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 500,
                  fontSize: 14,
                  color: 'var(--ink)',
                }}
              >
                {item.task}
              </span>
            </div>
          ))}
        </div>

        {/* Bring / requirements */}
        <div style={{ padding: '16px 22px 0' }}>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'var(--mute)',
              paddingBottom: 12,
              borderBottom: '1px solid var(--line)',
            }}
          >
            Bring
          </p>
          {[
            { key: 'Attire', value: 'All black, closed-toe shoes' },
            { key: 'Experience', value: '2+ years espresso' },
            { key: 'Cert', value: 'Food handler (optional)' },
          ].map((row) => (
            <div key={row.key} className="kv-row" style={{ padding: '9px 0' }}>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'var(--mute)',
                  textTransform: 'uppercase',
                }}
              >
                {row.key}
              </span>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 13,
                  color: 'var(--ink)',
                  textAlign: 'right',
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Stamp row */}
        <div
          style={{
            padding: '14px 22px',
            borderTop: '1px solid var(--line)',
            marginTop: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--mute)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Posting #4471 · Brooklyn · NY
          </span>
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
          padding: '16px 22px 32px',
          background: 'linear-gradient(to bottom, transparent, var(--paper) 38%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              $140
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--mute)',
              }}
            >
              take home
            </div>
          </div>
          <Link
            href="/worker/confirm"
            style={{
              flex: 1,
              background: 'var(--ink)',
              color: '#FFFFFF',
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 16,
              padding: '14px 22px',
              borderRadius: 99,
              textAlign: 'center',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Take this shift.
          </Link>
        </div>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'var(--mute)',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          15 min to confirm · no application, no interview
        </p>
      </div>
    </div>
  );
}
