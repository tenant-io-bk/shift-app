'use client';

import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
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
          href="/employer/create-account"
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
            fontFamily: 'var(--body)',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--mute)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          2 of 5
        </span>
        <div style={{ width: 32 }} />
      </div>

      {/* Progress bar */}
      <div style={{ padding: '8px 22px 0' }}>
        <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '40%', height: '100%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
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
          padding: '20px 22px 100px',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--body)',
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
            letterSpacing: '-0.075em',
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
            border: '2px solid var(--ink)',
            borderRadius: 14,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 12,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="var(--mute)" strokeWidth="1.5" />
            <path d="M11.5 11.5L14 14" stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mute-2)', flex: 1 }}>
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
              borderRadius: 14,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>
                Padmore&apos;s Coffee
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>
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
                border: '2px solid var(--ink)',
                borderRadius: 14,
                padding: '12px 14px',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>
                {biz.name}
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>
                {biz.address}
              </div>
            </div>
          ))}
        </div>

        {/* Don't see yours */}
        <p
          style={{
            fontFamily: 'var(--body)',
            fontSize: 13,
            color: 'var(--hydrant)',
            marginTop: 16,
            cursor: 'pointer',
          }}
        >
          Don&apos;t see yours? Add it →
        </p>
      </div>

      {/* CTA Button */}
      <div style={{ padding: '16px 22px 36px', borderTop: '1px solid var(--line)', background: 'var(--paper)' }}>
        <Link
          href="/employer/verify"
          style={{
            display: 'block',
            background: 'var(--ink)',
            color: 'white',
            borderRadius: 99,
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
  );
}
