import Link from 'next/link';

export default function Page() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper-2)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 0 60px',
      }}
    >
      <div
        style={{
          width: 390,
          minHeight: 844,
          background: 'var(--paper)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(13,14,18,0.08), 0 30px 60px -20px rgba(13,14,18,0.22)',
          borderRadius: 44,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <style>{`
          @keyframes green-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.75); }
          }
          .green-pulse { animation: green-pulse 2s ease-in-out infinite; }
        `}</style>

        {/* Map area — full bleed */}
        <div
          style={{
            height: 420,
            background: '#E8EAF0',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {/* SVG city blocks */}
          <svg
            width="390"
            height="420"
            viewBox="0 0 390 420"
            fill="none"
            style={{ position: 'absolute', inset: 0 }}
          >
            <rect width="390" height="420" fill="#E8EAF0" />

            {/* Roads (white strips) */}
            <rect x="0" y="80" width="390" height="12" fill="white" opacity="0.85" />
            <rect x="0" y="158" width="390" height="11" fill="white" opacity="0.85" />
            <rect x="0" y="238" width="390" height="11" fill="white" opacity="0.85" />
            <rect x="0" y="320" width="390" height="11" fill="white" opacity="0.85" />
            <rect x="65" y="0" width="11" height="420" fill="white" opacity="0.85" />
            <rect x="148" y="0" width="11" height="420" fill="white" opacity="0.85" />
            <rect x="232" y="0" width="11" height="420" fill="white" opacity="0.85" />
            <rect x="315" y="0" width="11" height="420" fill="white" opacity="0.85" />

            {/* City blocks */}
            <rect x="0" y="0" width="63" height="78" rx="2" fill="#D8DAE4" />
            <rect x="78" y="0" width="68" height="78" rx="2" fill="#D4D6E0" />
            <rect x="161" y="0" width="69" height="78" rx="2" fill="#DADBEB" />
            <rect x="245" y="0" width="68" height="78" rx="2" fill="#D8DAE4" />
            <rect x="328" y="0" width="62" height="78" rx="2" fill="#D4D6E0" />

            <rect x="0" y="94" width="63" height="62" rx="2" fill="#D4D6E4" />
            <rect x="78" y="94" width="68" height="62" rx="2" fill="#DDE4D8" />
            <rect x="161" y="94" width="69" height="62" rx="2" fill="#D8DAE4" />
            <rect x="245" y="94" width="68" height="62" rx="2" fill="#D4D6E0" />
            <rect x="328" y="94" width="62" height="62" rx="2" fill="#DDE4D8" />

            <rect x="0" y="171" width="63" height="65" rx="2" fill="#D8DAE4" />
            <rect x="78" y="171" width="68" height="65" rx="2" fill="#D4D6E0" />
            <rect x="161" y="171" width="69" height="65" rx="2" fill="#DADBEB" />
            <rect x="245" y="171" width="68" height="65" rx="2" fill="#DDE4D8" />
            <rect x="328" y="171" width="62" height="65" rx="2" fill="#D4D6E0" />

            <rect x="0" y="251" width="63" height="67" rx="2" fill="#DDE4D8" />
            <rect x="78" y="251" width="68" height="67" rx="2" fill="#D8DAE4" />
            <rect x="161" y="251" width="69" height="67" rx="2" fill="#D4D6E0" />
            <rect x="245" y="251" width="68" height="67" rx="2" fill="#DADBEB" />
            <rect x="328" y="251" width="62" height="67" rx="2" fill="#D8DAE4" />

            <rect x="0" y="333" width="63" height="87" rx="2" fill="#D4D6E0" />
            <rect x="78" y="333" width="68" height="87" rx="2" fill="#DADBEB" />
            <rect x="161" y="333" width="69" height="87" rx="2" fill="#D8DAE4" />
            <rect x="245" y="333" width="68" height="87" rx="2" fill="#D4D6E0" />
            <rect x="328" y="333" width="62" height="87" rx="2" fill="#DDE4D8" />

            {/* Dashed rings around center */}
            <circle
              cx="195"
              cy="210"
              r="80"
              stroke="#B0B4BD"
              strokeWidth="1.5"
              strokeDasharray="6 5"
              fill="none"
            />
            <circle
              cx="195"
              cy="210"
              r="150"
              stroke="#B0B4BD"
              strokeWidth="1.5"
              strokeDasharray="6 5"
              fill="none"
            />

            {/* Center "P" marker */}
            <circle cx="195" cy="210" r="14" fill="#0D0E12" />
            <text
              x="195"
              y="215"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="700"
              fontFamily="system-ui"
            >
              P
            </text>

            {/* Green worker dots — available */}
            <circle cx="130" cy="155" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
            <circle cx="160" cy="270" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
            <circle cx="248" cy="140" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
            <circle cx="290" cy="180" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
            <circle cx="100" cy="290" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
            <circle cx="315" cy="270" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
            <circle cx="210" cy="310" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />

            {/* Purple favorited worker dots */}
            <circle cx="170" cy="168" r="6" fill="#5A3CC2" stroke="white" strokeWidth="2" />
            <circle cx="230" cy="255" r="6" fill="#5A3CC2" stroke="white" strokeWidth="2" />
            <circle cx="148" cy="225" r="6" fill="#5A3CC2" stroke="white" strokeWidth="2" />

            {/* Heart icons above two favorited workers */}
            <text x="170" y="158" textAnchor="middle" fontSize="8" fill="#5A3CC2">♥</text>
            <text x="230" y="245" textAnchor="middle" fontSize="8" fill="#5A3CC2">♥</text>
          </svg>

          {/* Density chip top-left */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'var(--ink)',
              color: 'white',
              borderRadius: 6,
              padding: '4px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Density
          </div>

          {/* Neighborhood labels */}
          <div
            style={{
              position: 'absolute',
              top: 50,
              left: 10,
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 6,
              padding: '4px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--mute)',
            }}
          >
            Bushwick · 11
          </div>

          <div
            style={{
              position: 'absolute',
              top: 50,
              right: 10,
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 6,
              padding: '4px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--hydrant)',
            }}
          >
            Crown Hts · 19
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: 10,
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 6,
              padding: '4px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--mute)',
            }}
          >
            Bed-Stuy · 42
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 80,
              right: 10,
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 6,
              padding: '4px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--mute)',
            }}
          >
            Clinton Hill · 7
          </div>

          {/* Floating top card */}
          <div
            style={{
              position: 'absolute',
              top: 50,
              left: 22,
              right: 22,
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: 14,
              boxShadow: '0 4px 12px rgba(13,14,18,0.10)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Business photo placeholder */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #b8c4d0, #8a9ba8)',
                flexShrink: 0,
              }}
            />

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 16,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                Padmore&apos;s Coffee
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 3,
                }}
              >
                <div
                  className="green-pulse"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#16A34A',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  18 ready now
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--mute)',
                  marginTop: 2,
                }}
              >
                Live · avg 2 min to fill
              </div>
            </div>
          </div>
        </div>

        {/* Bottom sheet */}
        <div
          style={{
            flex: 1,
            background: 'var(--card)',
            borderRadius: '18px 18px 0 0',
            boxShadow: '0 -4px 32px rgba(13,14,18,0.12)',
            paddingTop: 14,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
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
              padding: '14px 22px 8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}
            >
              18 ready · within 1 mi
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--mute)',
              }}
            >
              Sort: Favorites first
            </span>
          </div>

          {/* Chip filter row */}
          <div
            className="chip-row"
            style={{ padding: '8px 22px', marginBottom: 4 }}
          >
            {[
              { label: '♥ Favorites', active: true },
              { label: '★ 4.8+', active: false },
              { label: 'Barista', active: false },
              { label: 'Open now', active: false },
            ].map((chip) => (
              <div
                key={chip.label}
                className={`chip${chip.active ? ' active' : ''}`}
                style={{ flexShrink: 0 }}
              >
                {chip.label}
              </div>
            ))}
          </div>

          {/* Worker rows */}
          <div style={{ padding: '4px 0', flex: 1 }}>
            {[
              {
                initial: 'M',
                gradient: 'linear-gradient(135deg, #c4a577, #8b6545)',
                name: 'Marco Reyes',
                role: 'Barista',
                rating: '4.9',
                times: '4×',
                fav: true,
                action: 'Book',
              },
              {
                initial: 'S',
                gradient: 'linear-gradient(135deg, #a8c4a0, #6b9e62)',
                name: 'Sam O.',
                role: 'Barista',
                rating: '4.8',
                times: null,
                fav: true,
                action: 'Book',
              },
              {
                initial: 'J',
                gradient: 'linear-gradient(135deg, #b8a0c8, #8060a0)',
                name: 'Jules M.',
                role: 'Barista',
                rating: '4.7',
                times: null,
                fav: false,
                action: 'Invite',
              },
              {
                initial: 'E',
                gradient: 'linear-gradient(135deg, #f0c080, #c88040)',
                name: 'Elena P.',
                role: 'Server',
                rating: '4.6',
                times: null,
                fav: false,
                action: 'Invite',
              },
            ].map((worker) => (
              <div
                key={worker.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 22px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: worker.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                  {/* Status dot */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      right: -1,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: worker.fav ? 'var(--hydrant)' : '#16A34A',
                      border: '2px solid white',
                    }}
                  />
                </div>

                {/* Info */}
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
                      {worker.name}
                    </span>
                    {worker.times && (
                      <span
                        style={{
                          background: 'var(--hydrant-soft)',
                          color: 'var(--hydrant)',
                          border: '1px solid var(--hydrant)',
                          borderRadius: 4,
                          padding: '1px 5px',
                          fontFamily: 'var(--mono)',
                          fontSize: 10,
                          fontWeight: 600,
                        }}
                      >
                        {worker.times} here
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--mute)',
                      marginTop: 1,
                    }}
                  >
                    {worker.role} · ★{worker.rating}
                  </div>
                </div>

                {/* Action button */}
                <button
                  style={{
                    padding: '0 12px',
                    height: 30,
                    borderRadius: 8,
                    border: '1px solid var(--line-2)',
                    background: 'transparent',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--hydrant)',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {worker.action}
                </button>
              </div>
            ))}
          </div>

          {/* Post a shift FAB */}
          <Link
            href="/employer/post-shift"
            style={{
              position: 'absolute',
              right: 22,
              bottom: 24,
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(13,14,18,0.28)',
              color: 'white',
              fontSize: 22,
              fontFamily: 'var(--sans)',
              zIndex: 10,
            }}
          >
            →
          </Link>
        </div>
      </div>
    </div>
  );
}
