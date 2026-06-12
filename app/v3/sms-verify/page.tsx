'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import StepProgress from '@/app/components/StepProgress';
import { createClient } from '@/lib/supabase/client';

function SMSVerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get('phone') ?? '';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  function handleDigit(digit: string) {
    const idx = code.findIndex(c => c === '');
    if (idx === -1) return;
    const next = [...code];
    next[idx] = digit;
    setCode(next);
    setError('');

    // Auto-submit when last digit entered
    if (idx === 5) {
      verify([...next]);
    }
  }

  function handleDelete() {
    const filled = code.filter(c => c !== '').length;
    if (filled === 0) return;
    const next = [...code];
    next[filled - 1] = '';
    setCode(next);
  }

  async function verify(digits: string[]) {
    const token = digits.join('');
    if (token.length !== 6) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const configured = supabaseUrl && supabaseUrl !== 'your-project-url-here';

    // Skip Supabase if not configured yet — navigate directly
    if (!configured) {
      router.push('/worker/onboarding');
      return;
    }

    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: err } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });

    if (err) {
      setError("That code isn't right. Try again or resend.");
      setLoading(false);
      setCode(['', '', '', '', '', '']);
      return;
    }

    router.push('/worker/onboarding');
  }

  async function resend() {
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ phone });
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  }

  const filled = code.filter(c => c !== '').length;
  const displayPhone = phone.replace('+1', '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <Link href="/v3/phone-verify" style={{ fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Verify</span>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={2} total={4} />
      </div>

      <div style={{ padding: '20px 22px 0', flex: 1 }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 10 }}>
          STEP 2 OF 4
        </div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          Enter the Code.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginBottom: 28, lineHeight: 1.5 }}>
          Sent to <strong>{displayPhone}</strong>. Takes about 10 seconds.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {code.map((digit, i) => (
            <div key={i} style={{
              flex: 1, height: 56, borderRadius: 12,
              border: `2px solid ${i === filled ? 'var(--ink)' : digit ? 'transparent' : 'var(--line)'}`,
              background: digit ? 'var(--steel-soft)' : 'var(--card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)',
              transition: 'border-color 0.15s, background 0.15s',
            }}>
              {digit}
            </div>
          ))}
        </div>

        {error && (
          <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--red)', marginBottom: 12 }}>{error}</p>
        )}

        <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginBottom: 24 }}>
          Didn&apos;t get it?{' '}
          <span
            onClick={resend}
            style={{ color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
          >
            {resent ? 'Sent!' : 'Resend code'}
          </span>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 320, margin: '0 auto' }}>
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, i) => {
            if (key === '') return <div key={i} />;
            return (
              <button key={i}
                onClick={() => key === '⌫' ? handleDelete() : handleDigit(key)}
                disabled={loading}
                style={{
                  height: 56, borderRadius: 99, border: '2px solid var(--ink)',
                  background: key === '⌫' ? 'var(--card)' : 'var(--card)',
                  fontFamily: 'var(--sans)', fontWeight: 700,
                  fontSize: key === '⌫' ? 18 : 24, color: 'var(--ink)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {key}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 24, paddingBottom: 40 }}>
          {loading && (
            <div style={{
              width: '100%', padding: '15px 22px', borderRadius: 99,
              background: 'var(--card)', color: 'var(--ink)',
              fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16,
              textAlign: 'center', letterSpacing: '-0.01em',
            }}>
              Verifying…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SMSVerify() {
  return (
    <Suspense>
      <SMSVerifyInner />
    </Suspense>
  );
}
