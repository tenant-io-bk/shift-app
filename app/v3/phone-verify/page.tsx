'use client';

import Link from 'next/link';
import { useState } from 'react';
import StepProgress from '@/app/components/StepProgress';

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
];

export default function PhoneVerify() {
  const [digits, setDigits] = useState('3475142898');

  function handleKey(key: string) {
    if (key === '⌫') {
      setDigits((d) => d.slice(0, -1));
    } else if (key === '' ) {
      // no-op
    } else if (digits.length < 10) {
      setDigits((d) => d + key);
    }
  }

  function formatPhone(d: string) {
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + ' ' + d.slice(3);
    return d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
  }

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
        background: 'var(--paper)',
      }}>
        <Link href="/worker/splash" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Phone</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={1} total={8} />
      </div>

      {/* Content */}
      <div style={{ padding: '18px 22px 0', flex: 1 }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--hydrant)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: 10,
        }}>VERIFY YOUR NUMBER</span>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 38,
          color: 'var(--ink)',
          letterSpacing: '-0.075em',
          lineHeight: 0.95,
          marginBottom: 12,
        }}>What's your number?</h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          marginBottom: 24,
        }}>We'll send a code. No spam.</p>

        {/* Phone input */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 28 }}>
          <div style={{
            background: 'var(--paper-2)',
            borderRadius: 8,
            padding: '14px 16px',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>+1</span>
          </div>
          <div style={{
            flex: 1,
            borderBottom: '2px solid var(--ink)',
            paddingBottom: 12,
          }}>
            <span style={{
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: 28,
              color: 'var(--ink)',
              letterSpacing: '0.02em',
            }}>
              {formatPhone(digits) || ' '}
            </span>
            <span style={{
              display: 'inline-block',
              width: 2,
              height: 28,
              background: 'var(--hydrant)',
              marginLeft: 2,
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }} />
          </div>
        </div>

        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

        {/* Keypad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {KEYPAD.flat().map((key, i) => {
            if (key === '') return <div key={i} />;
            const isContinue = key === '→';
            return (
              <button
                key={i}
                onClick={() => key === '→' ? undefined : handleKey(key)}
                style={{
                  height: 56,
                  background: isContinue ? 'var(--ink)' : 'var(--card)',
                  border: isContinue ? 'none' : '2px solid var(--ink)',
                  borderRadius: 99,
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 24,
                  color: isContinue ? '#fff' : 'var(--ink)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {key}
              </button>
            );
          })}
          {/* Continue button spans last col */}
        </div>

        {/* Continue action below keypad */}
        <Link href="/v3/sms-verify" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          marginTop: 10,
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 99,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 18,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>Continue →</Link>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          color: 'var(--mute)',
          textAlign: 'center',
          marginTop: 12,
        }}>Used only for account security.</p>
      </div>
    </div>
  );
}
