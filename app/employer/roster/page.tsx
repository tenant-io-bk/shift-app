import Link from 'next/link';
import EmployerNav from '@/app/components/EmployerNav';

export default function Page() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <style>{`
          @keyframes roster-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.8); }
          }
          .roster-pulse { animation: roster-pulse 1.8s ease-in-out infinite; }
        `}</style>

        {/* Header */}
        <div
          style={{
            background: 'var(--paper)',
            padding: '28px 22px 22px',
            flexShrink: 0,
            borderBottom: '1px solid var(--line)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: 52,
              color: 'var(--ink)',
              letterSpacing: '-0.075em',
              lineHeight: 0.9,
              marginBottom: 12,
            }}
          >
            SHIFT FILLED<span style={{ color: 'var(--green)' }}>.</span>
          </h1>

          {/* Filled time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              className="roster-pulse"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#16A34A',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--body)',
                fontSize: 13,
                color: 'var(--ink)',
              }}
            >
              in 1 min 38 sec
            </span>
          </div>

          {/* Meta row */}
          <div
            style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--mute)',
            }}
          >
            Barista · Today 11A–4P · Padmore&apos;s Coffee
          </div>
        </div>

        {/* Roster section */}
        <div
          style={{
            background: 'var(--paper)',
            padding: '16px 22px',
            flex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--body)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--ink)',
              }}
            >
              Confirmed
            </span>
            <span
              style={{
                fontFamily: 'var(--body)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--mute)',
              }}
            >
              2 of 2
            </span>
          </div>

          {/* Worker rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                initial: 'M',
                gradient: 'var(--ink)',
                name: 'Marco Reyes',
                meta: 'Barista · 4.9★ · en route',
                eta: '6 min',
                reliable: 97,
              },
              {
                initial: 'S',
                gradient: 'var(--ink)',
                name: 'Sam Ortiz',
                meta: 'Barista · 4.8★ · en route',
                eta: '8 min',
                reliable: 94,
              },
            ].map((worker) => (
              <div
                key={worker.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: worker.gradient,
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
                      fontSize: 16,
                      color: 'white',
                    }}
                  >
                    {worker.initial}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 600,
                      fontSize: 15,
                      color: 'var(--ink)',
                    }}
                  >
                    {worker.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 12,
                      color: 'var(--mute)',
                      marginTop: 1,
                    }}
                  >
                    {worker.meta}
                  </div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 3, fontWeight: 600 }}>
                    {worker.reliable}% reliable
                  </div>
                </div>
                {/* ETA pill */}
                <div
                  style={{
                    background: 'var(--ink)',
                    color: '#fff',
                    borderRadius: 99,
                    padding: '4px 12px',
                    fontFamily: 'var(--body)',
                    fontSize: 11,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {worker.eta}
                </div>
              </div>
            ))}

            {/* Standby divider */}
            <div style={{ margin: '12px 0 8px', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'var(--body)',
                fontSize: 9.5,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--mute)',
              }}>
                Standby
              </span>
            </div>

            {/* Standby worker */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 0',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  opacity: 0.7,
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
                  E
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 600,
                    fontSize: 15,
                    color: 'var(--ink)',
                  }}
                >
                  Elena P.
                </div>
                <div
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 12,
                    color: 'var(--mute)',
                    marginTop: 1,
                  }}
                >
                  On standby · ready
                </div>
              </div>
              {/* Clock pill */}
              <div
                style={{
                  background: 'var(--paper-2)',
                  color: 'var(--mute)',
                  borderRadius: 99,
                  padding: '3px 8px',
                  fontFamily: 'var(--body)',
                  fontSize: 11,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                ⏱ ready
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            padding: '14px 22px',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {[
            { label: 'Message both', href: '/employer/messages' },
            { label: 'Replace no-show', href: '/v3/no-show' },
          ].map(({ label, href }) =>
            href ? (
              <Link
                key={label}
                href={href}
                style={{
                  border: '2px solid var(--ink)',
                  borderRadius: 14,
                  padding: 12,
                  background: 'transparent',
                  fontFamily: 'var(--body)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                {label}
              </Link>
            ) : (
              <button
                key={label}
                style={{
                  border: '2px solid var(--ink)',
                  borderRadius: 14,
                  padding: 12,
                  background: 'transparent',
                  fontFamily: 'var(--body)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                {label}
              </button>
            )
          )}

          {/* Rate link */}
          <Link
            href="/employer/rating"
            style={{
              textAlign: 'center',
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--ink)',
              textDecoration: 'none',
              padding: '8px 0 4px',
            }}
          >
            Rate workers when done →
          </Link>
        </div>
      </div>
      <EmployerNav active="shifts" />
    </div>
  );
}
