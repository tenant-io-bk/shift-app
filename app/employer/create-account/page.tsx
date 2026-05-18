'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';

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
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Create account</span>
        <div style={{ width: 20 }} />
      </div>

      {/* Progress */}
      <div style={{ padding: '8px 22px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '20%', height: '100%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--hydrant)', fontWeight: 600 }}>1</span> / 5
        </span>
      </div>

      <div style={{ padding: '20px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>EMPLOYER</div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 24 }}>
          Let's get you set up.
        </h1>

        {/* Business type */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 10 }}>Business type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {BIZ_TYPES.map(t => (
              <button key={t} onClick={() => setBizType(t)} style={{
                padding: '8px 14px', borderRadius: 99, cursor: 'pointer',
                fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 14,
                border: bizType === t ? 'none' : '1px solid var(--line)',
                background: bizType === t ? 'var(--ink)' : 'var(--card)',
                color: bizType === t ? '#fff' : 'var(--ink)',
                transition: 'all 0.15s',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Business name */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>Business name</div>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Padmore's Coffee"
            style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none' }} />
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>Work email</div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourbusiness.com"
            style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none' }} />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>Phone number</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 10, padding: '0 14px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>+1</span>
            </div>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="347 514 2898"
              style={{ flex: 1, height: 52, padding: '0 16px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none', letterSpacing: '0.04em' }} />
          </div>
        </div>

        {/* Agreement */}
        <button onClick={() => setAgreed(!agreed)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 0, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
            border: `2px solid ${agreed ? 'var(--ink)' : 'var(--line-2)'}`,
            background: agreed ? 'var(--ink)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {agreed && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.5 }}>
            I agree to SHIFT's <span style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Terms of Service</span> and confirm I'm authorized to hire for this business.
          </span>
        </button>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        {canContinue ? (
          <Link href="/employer/onboarding" style={{
            display: 'block', width: '100%', padding: '15px 22px', borderRadius: 12,
            background: 'var(--ink)', color: '#fff', fontFamily: 'var(--sans)',
            fontWeight: 700, fontSize: 16, textAlign: 'center', textDecoration: 'none',
          }}>Continue →</Link>
        ) : (
          <div style={{ width: '100%', padding: '15px 22px', borderRadius: 12, background: 'var(--paper-3)', color: 'var(--mute)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, textAlign: 'center' }}>
            Fill in all fields
          </div>
        )}
      </div>
    </div>
  );
}
