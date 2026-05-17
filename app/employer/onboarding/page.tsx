'use client';

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
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(13,14,18,0.08), 0 30px 60px -20px rgba(13,14,18,0.22)',
          borderRadius: 44,
        }}
      >
        {/* Top Nav Bar */}
        <div
          style={{
            height: 44,
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
            href="/"
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
              textDecoration: 'none',
              fontSize: 18,
            }}
          >
            ←
          </Link>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--mute)',
              letterSpacing: '0.04em',
            }}
          >
            Step 1 of 4
          </span>
          <div style={{ width: 32 }} />
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Progress bar */}
          <div
            style={{
              margin: '16px 22px 20px',
              height: 3,
              background: 'var(--paper-3)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '25%',
                height: '100%',
                background: 'var(--ink)',
                borderRadius: 99,
              }}
            />
          </div>

          {/* Step indicators */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '0 22px',
              marginBottom: 28,
            }}
          >
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: step === 1 ? 22 : 8,
                  height: step === 1 ? 22 : 8,
                  borderRadius: 99,
                  background: step === 1 ? 'var(--ink)' : 'var(--paper-3)',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                {step === 1 && (
                  <span style={{ color: 'white', fontSize: 11, fontFamily: 'var(--mono)', fontWeight: 700 }}>✓</span>
                )}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div style={{ padding: '0 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--hydrant)',
                marginBottom: 12,
              }}
            >
              Find Your Business
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 38,
                color: 'var(--ink)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                marginBottom: 24,
                whiteSpace: 'pre-line',
              }}
            >
              {'Where are you\nhiring?'}
            </h1>

            {/* Search input */}
            <div
              style={{
                height: 52,
                background: 'var(--card)',
                border: '1px solid var(--line)',
                borderRadius: 10,
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12,
              }}
            >
              {/* Magnifying glass */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="var(--mute)" strokeWidth="1.5" />
                <path d="M11.5 11.5L14 14" stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 14,
                  color: 'var(--mute-2)',
                  flex: 1,
                }}
              >
                Search by business name...
              </span>
            </div>

            {/* Results list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Selected result */}
              <div
                style={{
                  background: 'var(--hydrant-soft)',
                  border: '1px solid var(--hydrant)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 600,
                      fontSize: 15,
                      color: 'var(--ink)',
                    }}
                  >
                    Padmore&apos;s Coffee
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--mute)',
                      marginTop: 2,
                    }}
                  >
                    172 Tompkins Ave, Bed-Stuy
                  </div>
                </div>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 99,
                    background: 'var(--hydrant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: 'white', fontSize: 11, lineHeight: 1 }}>✓</span>
                </div>
              </div>

              {/* Unselected results */}
              {[
                { name: "Greene's Bar + Kitchen", address: '89 Greene Ave' },
                { name: 'Myrtle Coffee', address: '445 Myrtle Ave' },
              ].map((biz) => (
                <div
                  key={biz.name}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    borderRadius: 10,
                    padding: '12px 14px',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 600,
                      fontSize: 15,
                      color: 'var(--ink)',
                    }}
                  >
                    {biz.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--mute)',
                      marginTop: 2,
                    }}
                  >
                    {biz.address}
                  </div>
                </div>
              ))}
            </div>

            {/* Don't see yours */}
            <Link
              href="#"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'var(--hydrant)',
                textDecoration: 'none',
                marginTop: 16,
                display: 'inline-block',
              }}
            >
              Don&apos;t see yours? Add it →
            </Link>

            {/* Spacer */}
            <div style={{ flex: 1, minHeight: 32 }} />

            {/* CTA Button */}
            <div style={{ paddingBottom: 36, paddingTop: 16 }}>
              <Link
                href="/employer/business-profile"
                style={{
                  display: 'block',
                  background: 'var(--ink)',
                  color: 'white',
                  borderRadius: 12,
                  padding: '16px 22px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: '-0.01em',
                }}
              >
                Continue.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
