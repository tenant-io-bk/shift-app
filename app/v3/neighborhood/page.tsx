'use client';

import { useState } from 'react';
import Link from 'next/link';
import StepProgress from '@/app/components/StepProgress';

export default function Neighborhood() {
  const [query, setQuery] = useState('');

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--line)',
      }}>
        <Link href="/worker/onboarding" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Your area</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={4} total={4} />
      </div>

      {/* Headline */}
      <div style={{ padding: '16px 22px 0' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--hydrant)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10 }}>STEP 4 OF 4</span>
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 36,
          color: 'var(--ink)',
          letterSpacing: '-0.075em',
          lineHeight: 1,
          marginBottom: 8,
        }}>Where do you work?</h1>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          marginBottom: 16,
          lineHeight: 1.5,
        }}>We&apos;ll show shifts within your radius. You can change this any time.</p>
      </div>

      {/* Map */}
      <div style={{ position: 'relative', margin: '0 22px', borderRadius: 14, overflow: 'hidden', height: 360, flexShrink: 0 }}>
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9618%2C40.6772%2C-73.9218%2C40.6972&layer=mapnik"
          style={{ width: '100%', height: '100%', border: 'none', filter: 'grayscale(50%)' }}
          title="Map"
        />
        {/* Target button */}
        <button style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#fff',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="6.5" stroke="#0D0E12" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="2" fill="#0D0E12" />
            <line x1="9" y1="1" x2="9" y2="4" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="14" x2="9" y2="17" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="9" x2="4" y2="9" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="9" x2="17" y2="9" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Neighborhood callout */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 20,
            padding: '6px 14px',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 13,
            color: 'var(--ink)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
          }}>Bedford-Stuyvesant</div>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#F59E0B',
            border: '2px solid #fff',
            marginTop: 5,
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          }} />
        </div>
      </div>

      {/* Neighborhood / ZIP input */}
      <div style={{ padding: '20px 22px 0' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter your neighborhood or ZIP"
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--ink)',
            padding: '8px 0',
            fontFamily: 'var(--mono)',
            fontSize: 13,
            color: 'var(--ink)',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 22px 40px', marginTop: 'auto' }}>
        <Link href="/v3/payout-setup" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          background: 'var(--ink)',
          borderRadius: 99,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 18,
          color: '#fff',
          letterSpacing: '-0.01em',
          textDecoration: 'none',
        }}>One more step →</Link>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 12 }}>
          Just payout info, then you&apos;re in.
        </p>
      </div>
    </div>
  );
}
