'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import StepProgress from '@/app/components/StepProgress';

export default function EmployerVerify() {
  const [ein, setEin] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [method, setMethod] = useState<'ein' | 'doc' | ''>('');

  function formatEIN(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '-' + digits.slice(2);
  }

  const einComplete = ein.replace(/\D/g, '').length === 9;
  const canContinue = (method === 'ein' && einComplete) || (method === 'doc' && uploaded);
  const [verified, setVerified] = useState(false);

  if (verified) {
    return (
      <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar dark />
        <div style={{ padding: '16px 22px 32px' }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
            Padmore&apos;s Coffee · EIN submitted
          </div>
          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 52, color: 'white', letterSpacing: '-0.075em', lineHeight: 0.9, marginBottom: 32 }}>
            VERIFIED<span style={{ color: 'var(--hydrant)' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 40 }}>
            We&apos;ll review within one business day. You&apos;ll get a text when you&apos;re approved to post.
          </p>
          <Link href="/employer/business-profile" style={{
            display: 'block', padding: '16px 22px', borderRadius: 99,
            background: 'var(--hydrant)', color: '#000', fontFamily: 'var(--body)',
            fontWeight: 500, fontSize: 16, textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
          }}>
            Continue →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
        <Link href="/employer/onboarding" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Verify business</span>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={3} total={5} />
      </div>

      <div style={{ padding: '20px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 10 }}>VERIFICATION</div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          Prove It's Your Business.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 28 }}>
          SHIFT only works with legitimate businesses. Pick one way to verify — takes 60 seconds.
        </p>

        {/* Method picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>

          {/* EIN option */}
          <button
            onClick={() => setMethod(method === 'ein' ? '' : 'ein')}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              padding: '16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
              border: `2px solid ${method === 'ein' ? 'var(--ink)' : 'var(--ink)'}`,
              background: method === 'ein' ? 'var(--ink)' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: method === 'ein' ? 'rgba(255,255,255,0.12)' : 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="12" rx="2" stroke={method === 'ein' ? '#fff' : 'var(--ink)'} strokeWidth="1.5" />
                <path d="M5 7h8M5 10h5" stroke={method === 'ein' ? '#fff' : 'var(--ink)'} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: method === 'ein' ? '#fff' : 'var(--ink)', marginBottom: 2 }}>EIN — Employer ID Number</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: method === 'ein' ? 'rgba(255,255,255,0.6)' : 'var(--ink)', lineHeight: 1.5 }}>Your federal tax ID. Found on your IRS letter or SS-4.</div>
            </div>
          </button>

          {/* EIN input — expands inline */}
          <div style={{
            maxHeight: method === 'ein' ? 100 : 0,
            overflow: 'hidden',
            opacity: method === 'ein' ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.25s ease',
          }}>
            <input
              type="text"
              inputMode="numeric"
              value={ein}
              onChange={e => setEin(formatEIN(e.target.value))}
              placeholder="XX-XXXXXXX"
              style={{
                width: '100%', height: 52, padding: '0 16px',
                background: 'var(--card)', border: '2px solid var(--ink)',
                borderRadius: 14, fontFamily: 'var(--body)', fontSize: 20,
                letterSpacing: '0.12em', color: 'var(--ink)', outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
            {einComplete && (
              <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', fontWeight: 600, marginTop: 6 }}>✓ Looks good</p>
            )}
          </div>

          {/* Document upload option */}
          <button
            onClick={() => setMethod(method === 'doc' ? '' : 'doc')}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              padding: '16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
              border: '2px solid var(--ink)',
              background: method === 'doc' ? 'var(--ink)' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: method === 'doc' ? 'rgba(255,255,255,0.12)' : 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v8m0-8L6 5m3-3l3 3" stroke={method === 'doc' ? '#fff' : 'var(--ink)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 12v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke={method === 'doc' ? '#fff' : 'var(--ink)'} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: method === 'doc' ? '#fff' : 'var(--ink)', marginBottom: 2 }}>Business license or DBA</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: method === 'doc' ? 'rgba(255,255,255,0.6)' : 'var(--ink)', lineHeight: 1.5 }}>Upload a photo of your NYC business certificate or DBA filing.</div>
            </div>
          </button>

          {/* Upload area — expands inline */}
          <div style={{
            maxHeight: method === 'doc' ? 120 : 0,
            overflow: 'hidden',
            opacity: method === 'doc' ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.25s ease',
          }}>
            <button
              onClick={() => setUploaded(!uploaded)}
              style={{
                width: '100%', height: 72, borderRadius: 14, cursor: 'pointer',
                border: uploaded ? 'none' : '2px dashed var(--ink)',
                background: uploaded ? 'var(--hydrant)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: uploaded ? '#000' : 'var(--ink)' }}>
                {uploaded ? '✓ license.jpg uploaded' : 'Tap to Upload Photo'}
              </span>
            </button>
          </div>
        </div>

        {/* Trust note */}
        <div style={{ display: 'flex', gap: 10, padding: '14px 16px', background: 'var(--paper-2)', borderRadius: 12, border: '2px solid var(--ink)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M8 1.5L14 4v4c0 3.5-2.5 6-6 7C2.5 14 0 11.5 0 8V4L8 1.5z" stroke="var(--ink)" strokeWidth="1.3" fill="none" />
            <path d="M5 8l2 2 4-4" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
            Your info is encrypted and only used to verify your account. We never share it with workers.
          </p>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        {canContinue ? (
          <button onClick={() => setVerified(true)} style={{
            display: 'block', width: '100%', padding: '15px 22px', borderRadius: 99,
            background: 'var(--ink)', color: '#fff', fontFamily: 'var(--body)',
            fontWeight: 500, fontSize: 16, textAlign: 'center', border: 'none', cursor: 'pointer',
          }}>Submit for Review →</button>
        ) : (
          <div style={{ width: '100%', padding: '15px 22px', borderRadius: 99, background: 'var(--paper-3)', color: 'var(--ink)', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, textAlign: 'center' }}>
            Choose a Verification Method
          </div>
        )}
      </div>
    </div>
  );
}
