'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StepProgress from '@/app/components/StepProgress';
import { createClient } from '@/lib/supabase/client';

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
];

export default function PhoneVerify() {
  const router = useRouter();
  const [digits, setDigits] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleKey(key: string) {
    if (key === '⌫') {
      setDigits(d => d.slice(0, -1));
    } else if (digits.length < 10) {
      setDigits(d => d + key);
    }
  }

  function formatPhone(d: string) {
    if (d.length <= 3) return d;
    if (d.length <= 6) return d.slice(0, 3) + ' ' + d.slice(3);
    return d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6);
  }

  async function handleContinue() {
    if (digits.length !== 10) return;
    setLoading(true);
    setError('');

    const supabase = createClient();
    const phone = `+1${digits}`;

    const { error: err } = await supabase.auth.signInWithOtp({ phone });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // Pass phone to next step via URL param
    router.push(`/v3/sms-verify?phone=${encodeURIComponent(phone)}`);
  }

  const ready = digits.length === 10;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)',
      }}>
        <Link href="/worker/splash" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Phone</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={1} total={10} />
      </div>

      <div style={{ padding: '18px 22px 0', flex: 1 }}>
        <span style={{
          fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)',
          textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10,
        }}>STEP 1 OF 4</span>

        <h1 style={{
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 38, color: 'var(--ink)',
          letterSpacing: '-0.075em', lineHeight: 0.95, marginBottom: 12,
        }}>What&apos;s Your Number?</h1>

        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginBottom: 24 }}>
          Just your number to start. Nothing else for now.
        </p>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 28 }}>
          <div style={{ background: 'var(--card)', borderRadius: 14, padding: '14px 16px', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>+1</span>
          </div>
          <div style={{ flex: 1, borderBottom: '2px solid var(--ink)', paddingBottom: 12 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 28, color: 'var(--ink)', letterSpacing: '0.02em' }}>
              {formatPhone(digits) || ' '}
            </span>
            <span style={{
              display: 'inline-block', width: 2, height: 28, background: 'var(--ink)',
              marginLeft: 2, verticalAlign: 'middle', animation: 'blink 1s step-end infinite',
            }} />
          </div>
        </div>

        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

        {error && (
          <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--red)', marginBottom: 16 }}>{error}</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {KEYPAD.flat().map((key, i) => {
            if (key === '') return <div key={i} />;
            return (
              <button key={i} onClick={() => handleKey(key)} style={{
                height: 56, background: 'var(--card)', border: '2px solid var(--ink)',
                borderRadius: 99, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24,
                color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {key}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          disabled={!ready || loading}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', padding: '16px', marginTop: 10,
            background: ready && !loading ? 'var(--ink)' : 'var(--card)',
            color: ready && !loading ? '#fff' : 'var(--ink)',
            border: '2px solid var(--ink)',
            borderRadius: 99, fontFamily: 'var(--body)', fontWeight: 500, fontSize: 18,
            textDecoration: 'none', letterSpacing: '-0.01em', cursor: ready ? 'pointer' : 'default',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {loading ? 'Sending…' : 'Continue →'}
        </button>

        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textAlign: 'center', marginTop: 12 }}>
          Used only for account security. No spam, ever.
        </p>
      </div>
    </div>
  );
}
