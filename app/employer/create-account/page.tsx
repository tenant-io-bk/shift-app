'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';
import StepProgress from '@/app/components/StepProgress';

const BIZ_TYPES = ['Restaurant', 'Bar / Lounge', 'Café', 'Retail', 'Venue / Event', 'Hotel', 'Catering', 'Other'];

export default function EmployerCreateAccount() {
  const router = useRouter();
  const [bizType, setBizType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const canContinue = bizType && name.length > 1 && email.includes('@') && phone.length >= 10 && agreed;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
        <Link href="/worker/role" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Create account</span>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={1} total={5} />
      </div>

      <div style={{ padding: '20px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>EMPLOYER</div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 24 }}>
          Let's get you set up.
        </h1>

        {/* Business type pills — collapse once selected */}
        <div style={{
          maxHeight: bizType ? 0 : 400,
          overflow: 'hidden',
          opacity: bizType ? 0 : 1,
          transition: 'max-height 0.4s ease, opacity 0.25s ease',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
            {BIZ_TYPES.map(t => (
              <button key={t} onClick={() => setBizType(t)} style={{
                padding: '14px 16px',
                borderRadius: 99,
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: '-0.02em',
                border: '2px solid var(--ink)',
                background: 'transparent',
                color: 'var(--ink)',
                transition: 'all 0.15s',
                textAlign: 'center',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Selected tag — appears after pick */}
        {bizType && (
          <button
            onClick={() => setBizType('')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 99,
              background: 'var(--ink)',
              color: '#fff',
              fontFamily: 'var(--sans)',
              fontWeight: 600,
              fontSize: 13,
              border: 'none',
              cursor: 'pointer',
              marginBottom: 20,
            }}
          >
            {bizType}
            <span style={{ opacity: 0.6, fontSize: 15, lineHeight: 1 }}>×</span>
          </button>
        )}

        {/* Form fields — slide up when biz type selected */}
        <div style={{
          opacity: bizType ? 1 : 0,
          transform: bizType ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.35s ease 0.15s, transform 0.35s ease 0.15s',
          pointerEvents: bizType ? 'all' : 'none',
        }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 8 }}>Business name</div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Padmore's Coffee"
              style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 8 }}>Work email</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourbusiness.com"
              style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 8 }}>Phone number</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ background: 'var(--paper-2)', border: '2px solid var(--ink)', borderRadius: 10, padding: '0 14px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>+1</span>
              </div>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="347 514 2898"
                style={{ flex: 1, height: 52, padding: '0 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none', letterSpacing: '0.04em' }} />
            </div>
          </div>

          <button onClick={() => setAgreed(!agreed)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
              border: '2px solid var(--ink)',
              background: agreed ? 'var(--ink)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {agreed && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', lineHeight: 1.5 }}>
              I agree to SHIFT's <span style={{ textDecoration: 'underline' }}>Terms of Service</span> and confirm I'm authorized to hire for this business.
            </span>
          </button>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        {canContinue ? (
          <Link href="/employer/onboarding" style={{
            display: 'block', width: '100%', padding: '15px 22px', borderRadius: 99,
            background: 'var(--ink)', color: '#fff', fontFamily: 'var(--sans)',
            fontWeight: 700, fontSize: 16, textAlign: 'center', textDecoration: 'none',
          }}>Continue →</Link>
        ) : (
          <div style={{ width: '100%', padding: '15px 22px', borderRadius: 99, background: 'var(--paper-3)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, textAlign: 'center' }}>
            {!bizType ? 'Pick your business type' : 'Fill in all fields'}
          </div>
        )}
      </div>
    </div>
  );
}
