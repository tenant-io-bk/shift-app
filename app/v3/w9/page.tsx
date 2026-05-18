'use client';
import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function W9() {
  const [ssn, setSsn] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [agreed, setAgreed] = useState(false);

  const complete = ssn.length >= 9 && name.length > 2 && agreed;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <Link href="/v3/payout-setup" style={{ fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Tax info</span>
        <div style={{ width: 20 }} />
      </div>

      {/* Progress */}
      <div style={{ padding: '8px 22px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${(7/8)*100}%`, height: '100%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--hydrant)', fontWeight: 600 }}>7</span> / 8
        </span>
      </div>

      <div style={{ padding: '16px 22px 120px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>
          W-9 · TAX INFO
        </div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          One legal thing.
        </h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginBottom: 24, lineHeight: 1.5 }}>
          SHIFT pays 1099 contractors. IRS requires this once you earn $600+. Takes 45 seconds.
        </p>

        {/* Legal name */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
            Legal name
          </div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="As it appears on your ID"
            style={{
              width: '100%', height: 52, padding: '0 16px',
              background: 'var(--card)', border: '2px solid var(--ink)',
              borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16,
              color: 'var(--ink)', outline: 'none',
            }}
          />
        </div>

        {/* SSN */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
            Social Security Number
          </div>
          <input
            type="password"
            value={ssn}
            onChange={e => setSsn(e.target.value.replace(/\D/g, '').slice(0, 9))}
            placeholder="•••  ••  ••••"
            style={{
              width: '100%', height: 52, padding: '0 16px',
              background: 'var(--card)', border: '2px solid var(--ink)',
              borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 20,
              letterSpacing: '0.2em', color: 'var(--ink)', outline: 'none',
            }}
          />
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginTop: 6 }}>
            Encrypted · never stored in plain text · same security as Stripe
          </p>
        </div>

        {/* Address */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
            Address
          </div>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Street, City, State, ZIP"
            style={{
              width: '100%', height: 52, padding: '0 16px',
              background: 'var(--card)', border: '2px solid var(--ink)',
              borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 15,
              color: 'var(--ink)', outline: 'none',
            }}
          />
        </div>

        {/* Trust block */}
        <div style={{ padding: '14px 16px', background: 'var(--paper-2)', borderRadius: 10, border: '2px solid var(--ink)', marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.6 }}>
            <strong>Why SHIFT needs this:</strong> You&apos;re an independent contractor. If you earn $600+ in a year, the IRS requires us to file a 1099-NEC with your name and SSN. We don&apos;t share this with employers — ever.
          </p>
        </div>

        {/* Agreement */}
        <button
          onClick={() => setAgreed(!agreed)}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', marginBottom: 28, textAlign: 'left' }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 6, border: '2px solid var(--ink)',
            background: agreed ? 'var(--ink)' : 'transparent',
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 1,
          }}>
            {agreed && <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.5 }}>
            I certify this information is correct and authorize SHIFT to file my W-9 with the IRS.
          </span>
        </button>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        {complete ? (
          <Link
            href="/v3/profile-setup"
            style={{
              display: 'block', width: '100%', padding: '15px 22px',
              borderRadius: 12, background: 'var(--ink)', color: '#FFFFFF',
              fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16,
              textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
            }}
          >
            I&apos;m in. Show me shifts.
          </Link>
        ) : (
          <div style={{ width: '100%', padding: '15px 22px', borderRadius: 12, background: 'var(--paper-3)', color: 'var(--mute)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, textAlign: 'center' }}>
            Fill in the fields above
          </div>
        )}
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 8 }}>
          Skippable until your first $600 · comes back once
        </p>
      </div>
    </div>
  );
}
