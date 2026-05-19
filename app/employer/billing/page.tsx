'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function EmployerBilling() {
  const [method, setMethod] = useState<'card' | 'bank'>('card');
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  function formatCard(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2);
    return digits;
  }

  const cardComplete = cardNum.replace(/\s/g, '').length === 16 && expiry.length >= 4 && cvv.length >= 3 && name.length > 1;
  const canContinue = method === 'bank' || cardComplete;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
        <Link href="/employer/business-profile" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Billing</span>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: '8px 22px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '80%', height: '100%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--hydrant)', fontWeight: 600 }}>4</span> / 5
        </span>
      </div>

      <div style={{ padding: '20px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>PAYMENT</div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          How do you want to pay workers?
        </h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginBottom: 24, lineHeight: 1.5 }}>
          Workers are paid automatically after each shift. You're billed then, not when you post.
        </p>

        {/* Method toggle */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {(['card', 'bank'] as const).map(m => (
            <button key={m} onClick={() => setMethod(m)} style={{
              flex: 1, padding: '14px', borderRadius: 99, cursor: 'pointer',
              border: '2px solid var(--ink)',
              background: method === m ? 'var(--ink)' : 'var(--card)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              {m === 'card'
                ? <svg width="24" height="18" viewBox="0 0 24 18" fill="none"><rect x="1" y="1" width="22" height="16" rx="2.5" stroke={method === m ? '#fff' : 'var(--mute)'} strokeWidth="1.5"/><path d="M1 6h22" stroke={method === m ? '#fff' : 'var(--mute)'} strokeWidth="1.5"/><rect x="4" y="10" width="4" height="3" rx="1" fill={method === m ? '#fff' : 'var(--mute)'}/></svg>
                : <svg width="24" height="20" viewBox="0 0 24 20" fill="none"><rect x="1" y="7" width="22" height="12" rx="2" stroke={method === m ? '#fff' : 'var(--mute)'} strokeWidth="1.5"/><path d="M12 1L22 6H2L12 1Z" fill={method === m ? '#fff' : 'var(--mute)'}/><rect x="7" y="11" width="3" height="4" fill={method === m ? 'var(--ink)' : 'var(--paper)'}/><rect x="14" y="11" width="3" height="4" fill={method === m ? 'var(--ink)' : 'var(--paper)'}/></svg>
              }
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: method === m ? '#fff' : 'var(--ink)' }}>
                {m === 'card' ? 'Credit / Debit' : 'Bank Account'}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: method === m ? 'rgba(255,255,255,0.5)' : 'var(--mute)' }}>
                {m === 'card' ? 'Visa, MC, Amex' : 'ACH · free'}
              </span>
            </button>
          ))}
        </div>

        {method === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Card number */}
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>Card number</div>
              <input type="text" inputMode="numeric" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))}
                placeholder="1234 5678 9012 3456"
                style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 16, letterSpacing: '0.1em', color: 'var(--ink)', outline: 'none' }} />
            </div>

            {/* Expiry + CVV */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>Expiry</div>
                <input type="text" inputMode="numeric" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM / YY"
                  style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 16, letterSpacing: '0.08em', color: 'var(--ink)', outline: 'none' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>CVV</div>
                <input type="password" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="•••"
                  style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, fontFamily: 'var(--mono)', fontSize: 20, color: 'var(--ink)', outline: 'none' }} />
              </div>
            </div>

            {/* Name on card */}
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>Name on card</div>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="As it appears on the card"
                style={{ width: '100%', height: 52, padding: '0 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none' }} />
            </div>
          </div>
        )}

        {method === 'bank' && (
          <div style={{ padding: '20px', background: 'var(--card)', borderRadius: 12, border: '2px solid var(--ink)', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🏦</div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8 }}>Connect via Plaid</div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.5 }}>
              We'll open Plaid to securely link your business bank account. Takes about 2 minutes.
            </p>
          </div>
        )}

        {/* Trust */}
        <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--paper-2)', borderRadius: 10, border: '2px solid var(--ink)' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.6 }}>
            <strong>$0 to post a shift.</strong> You're only charged when a worker is confirmed and completes their shift.
          </p>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        {canContinue ? (
          <Link href="/employer/dashboard" style={{
            display: 'block', width: '100%', padding: '15px 22px', borderRadius: 99,
            background: 'var(--ink)', color: '#fff', fontFamily: 'var(--sans)',
            fontWeight: 700, fontSize: 16, textAlign: 'center', textDecoration: 'none',
          }}>Let's go. Post a shift →</Link>
        ) : (
          <div style={{ width: '100%', padding: '15px 22px', borderRadius: 99, background: 'var(--paper-3)', color: 'var(--mute)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, textAlign: 'center' }}>
            {method === 'card' ? 'Enter card details' : 'Connect bank account'}
          </div>
        )}
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 8 }}>
          Secured by Stripe · 256-bit encryption
        </p>
      </div>
    </div>
  );
}
