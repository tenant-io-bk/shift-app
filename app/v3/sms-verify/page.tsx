'use client';
import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function SMSVerify() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);

  function handleDigit(digit: string) {
    const idx = code.findIndex(c => c === '');
    if (idx === -1) return;
    const next = [...code];
    next[idx] = digit;
    setCode(next);
    setError(false);
  }

  function handleDelete() {
    const filled = code.filter(c => c !== '').length;
    if (filled === 0) return;
    const next = [...code];
    next[filled - 1] = '';
    setCode(next);
  }

  const filled = code.filter(c => c !== '').length;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      {/* Top nav */}
      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <Link href="/v3/phone-verify" style={{ fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Verify</span>
        <div style={{ width: 20 }} />
      </div>

      {/* Progress */}
      <div style={{ padding: '0 22px 4px', display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '25%', height: '100%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--hydrant)', fontWeight: 600 }}>2</span> / 8
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 0', flex: 1 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>
          VERIFY YOUR NUMBER
        </div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          Enter the code.
        </h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginBottom: 28, lineHeight: 1.5 }}>
          Sent to <strong style={{ color: 'var(--ink)' }}>347 514 2898</strong>. Takes about 10 seconds.
        </p>

        {/* Code boxes */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {code.map((digit, i) => (
            <div key={i} style={{
              flex: 1,
              height: 56,
              borderRadius: 10,
              border: `2px solid ${i === filled ? 'var(--ink)' : digit ? 'var(--hydrant)' : 'var(--paper-3)'}`,
              background: digit ? 'var(--hydrant-soft)' : 'var(--card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 24,
              color: 'var(--hydrant)',
              transition: 'border-color 0.15s, background 0.15s',
            }}>
              {digit}
            </div>
          ))}
        </div>

        {error && (
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)', marginBottom: 12 }}>
            That code isn&apos;t right. Try again or resend.
          </p>
        )}

        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', marginBottom: 24 }}>
          Didn&apos;t get it?{' '}
          <span style={{ color: 'var(--hydrant)', textDecoration: 'underline', cursor: 'pointer' }}>
            Resend code
          </span>
        </p>

        {/* Keypad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 320, margin: '0 auto' }}>
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, i) => {
            if (key === '') return <div key={i} />;
            return (
              <button
                key={i}
                onClick={() => key === '⌫' ? handleDelete() : handleDigit(key)}
                style={{
                  height: 56,
                  borderRadius: 12,
                  border: '2px solid var(--ink)',
                  background: key === '⌫' ? 'var(--paper-2)' : 'var(--card)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: key === '⌫' ? 18 : 24,
                  color: 'var(--ink)',
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
        </div>

        {/* CTA */}
        <div style={{ marginTop: 24, paddingBottom: 40 }}>
          {filled === 6 ? (
            <Link
              href="/worker/onboarding"
              style={{
                display: 'block',
                width: '100%',
                padding: '15px 22px',
                borderRadius: 12,
                background: 'var(--ink)',
                color: '#FFFFFF',
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 16,
                textAlign: 'center',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Continue →
            </Link>
          ) : (
            <div style={{
              width: '100%',
              padding: '15px 22px',
              borderRadius: 12,
              background: 'var(--paper-3)',
              color: 'var(--mute)',
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 16,
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}>
              Enter all 6 digits
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
