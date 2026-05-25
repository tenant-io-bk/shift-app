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

        {/* Header — dark */}
        <div
          style={{
            background: 'var(--ink)',
            padding: '28px 22px 22px',
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: 52,
              color: 'white',
              letterSpacing: '-0.075em',
              lineHeight: 0.9,
              marginBottom: 12,
            }}
          >
            SHIFT FILLED<span style={{ color: 'var(--hydrant)' }}>.</span>
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
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              in 1 min 38 sec
            </span>
          </div>

          {/* Meta row */}
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Barista · Today 11A–4P · Padmore&apos;s Coffee
          </div>
        </div>

        {/* Mini map */}
        <div
          style={{
            height: 160,
            background: '#E0E3EC',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <svg
            width="390"
            height="160"
            viewBox="0 0 390 160"
            fill="none"
            style={{ position: 'absolute', inset: 0 }}
          >
            <rect width="390" height="160" fill="#E0E3EC" />

            {/* Roads */}
            <rect x="0" y="45" width="390" height="8" fill="white" opacity="0.9" />
            <rect x="0" y="100" width="390" height="8" fill="white" opacity="0.9" />
            <rect x="70" y="0" width="8" height="160" fill="white" opacity="0.9" />
            <rect x="155" y="0" width="8" height="160" fill="white" opacity="0.9" />
            <rect x="240" y="0" width="8" height="160" fill="white" opacity="0.9" />
            <rect x="320" y="0" width="8" height="160" fill="white" opacity="0.9" />

            {/* Blocks */}
            <rect x="0" y="0" width="68" height="43" rx="2" fill="#D4D8E6" />
            <rect x="80" y="0" width="73" height="43" rx="2" fill="#D0D4E2" />
            <rect x="165" y="0" width="73" height="43" rx="2" fill="#D8DAE8" />
            <rect x="250" y="0" width="68" height="43" rx="2" fill="#D4D6E4" />
            <rect x="330" y="0" width="60" height="43" rx="2" fill="#D0D4E2" />

            <rect x="0" y="55" width="68" height="43" rx="2" fill="#D0D4E2" />
            <rect x="80" y="55" width="73" height="43" rx="2" fill="#DCE0DC" />
            <rect x="165" y="55" width="73" height="43" rx="2" fill="#D4D8E6" />
            <rect x="250" y="55" width="68" height="43" rx="2" fill="#DCE0DC" />
            <rect x="330" y="55" width="60" height="43" rx="2" fill="#D4D6E4" />

            <rect x="0" y="110" width="68" height="50" rx="2" fill="#D8DAE8" />
            <rect x="80" y="110" width="73" height="50" rx="2" fill="#D4D6E4" />
            <rect x="165" y="110" width="73" height="50" rx="2" fill="#D0D4E2" />
            <rect x="250" y="110" width="68" height="50" rx="2" fill="#D8DAE8" />
            <rect x="330" y="110" width="60" height="50" rx="2" fill="#DCE0DC" />

            {/* Dashed lines from workers to P */}
            <line
              x1="90"
              y1="130"
              x2="195"
              y2="80"
              stroke="#0D0E12"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity="0.4"
            />
            <line
              x1="310"
              y1="40"
              x2="195"
              y2="80"
              stroke="#0D0E12"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity="0.4"
            />

            {/* Center P marker */}
            <circle cx="195" cy="80" r="12" fill="#0D0E12" />
            <text
              x="195"
              y="85"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="700"
              fontFamily="system-ui"
            >
              P
            </text>

            {/* Worker A pin at bottom-left */}
            <circle cx="90" cy="130" r="8" fill="#72c15f" stroke="white" strokeWidth="2" />
            <text x="90" y="134" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="system-ui">M</text>

            {/* Worker B pin at top-right */}
            <circle cx="310" cy="40" r="8" fill="#72c15f" stroke="white" strokeWidth="2" />
            <text x="310" y="44" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="system-ui">S</text>
          </svg>

          {/* ETA chips */}
          <div
            style={{
              position: 'absolute',
              left: 58,
              bottom: 32,
              background: 'var(--ink)',
              color: 'white',
              borderRadius: 99,
              padding: '3px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Marco · 6 min
          </div>
          <div
            style={{
              position: 'absolute',
              right: 44,
              top: 8,
              background: 'var(--ink)',
              color: 'white',
              borderRadius: 99,
              padding: '3px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Sam · 9 min
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
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--hydrant)',
              }}
            >
              Confirmed
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
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
                gradient: 'linear-gradient(135deg, #c4a577, #8b6545)',
                name: 'Marco Reyes',
                meta: 'Barista · 4.9★ · en route',
                eta: '6 min',
                reliable: 97,
              },
              {
                initial: 'S',
                gradient: 'linear-gradient(135deg, #a8c4a0, #6b9e62)',
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
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
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
                      fontSize: 14,
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
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--mute)',
                      marginTop: 1,
                    }}
                  >
                    {worker.meta}
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hydrant)', marginTop: 3, fontWeight: 600 }}>
                    {worker.reliable}% reliable
                  </div>
                </div>
                {/* ETA pill */}
                <div
                  style={{
                    background: 'var(--hydrant-soft)',
                    color: 'var(--hydrant)',
                    borderRadius: 99,
                    padding: '3px 10px',
                    fontFamily: 'var(--mono)',
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                margin: '12px 0 8px',
              }}
            >
              <div style={{ flex: 1, borderTop: '1px dashed var(--line-2)' }} />
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--mute)',
                }}
              >
                Standby
              </span>
              <div style={{ flex: 1, borderTop: '1px dashed var(--line-2)' }} />
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
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f0c080, #c88040)',
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
                    fontFamily: 'var(--mono)',
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
                  fontFamily: 'var(--mono)',
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
            { label: 'Message both', href: null },
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
                  fontFamily: 'var(--mono)',
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
                  fontFamily: 'var(--mono)',
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
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--hydrant)',
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
