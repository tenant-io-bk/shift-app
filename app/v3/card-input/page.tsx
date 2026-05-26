'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SystemRow } from '@/app/components/Cards';
import StepProgress from '@/app/components/StepProgress';

function fmtCard(val: string) {
  const d = val.replace(/\D/g, '').slice(0, 16);
  return d.replace(/(.{4})(?=.)/g, '$1 ');
}

function fmtExpiry(val: string) {
  const d = val.replace(/\D/g, '').slice(0, 4);
  if (d.length <= 2) return d;
  return d.slice(0, 2) + '/' + d.slice(2);
}

function cardNetwork(num: string) {
  const d = num.replace(/\D/g, '');
  if (d.startsWith('4')) return 'VISA';
  if (d.startsWith('5') || d.startsWith('2')) return 'MC';
  if (d.startsWith('3')) return 'AMEX';
  return null;
}

const INPUT = {
  width: '100%',
  height: 52,
  padding: '0 16px',
  background: 'var(--paper)',
  border: '2px solid var(--ink)',
  borderRadius: 99,
  fontFamily: 'var(--body)',
  fontSize: 16,
  color: 'var(--ink)',
  outline: 'none',
  boxSizing: 'border-box' as const,
  letterSpacing: '0.04em',
};

export default function CardInput() {
  const router = useRouter();
  const [card,   setCard]   = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv,    setCvv]    = useState('');
  const [name,   setName]   = useState('');
  const [done,   setDone]   = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const digits  = card.replace(/\D/g, '');
  const network = cardNetwork(card);
  const last4   = digits.slice(-4) || '••••';
  const isValid = digits.length === 16 && expiry.length === 5 && cvv.length >= 3 && name.trim().length > 1;

  // Live card preview number
  const previewNum = digits.padEnd(16, '•').replace(/(.{4})(?=.)/g, '$1 ');
  const previewExp = expiry || 'MM/YY';

  function submit() {
    if (!isValid) return;
    setDone(true);
    setTimeout(() => router.push('/v3/w9'), 2000);
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <style>{`
          @keyframes pop { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
          .pop { animation: pop 0.45s cubic-bezier(0.34,1.4,0.64,1) forwards; }
        `}</style>
        <div className="pop" style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--hydrant)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M2 12L11 21L30 2" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, color: 'var(--ink)', letterSpacing: '-0.06em', marginBottom: 8 }}>Card added.</div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)' }}>
          {network || 'Debit'} ••••{last4}
        </div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 20, opacity: 0.4 }}>Continuing…</div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)' }}>
        <Link href="/v3/payout-setup" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Add debit card</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={6} total={8} />
      </div>

      <div style={{ padding: '24px 22px 40px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 10 }}>Debit Card</div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, color: 'var(--ink)', letterSpacing: '-0.07em', lineHeight: 1, marginBottom: 28 }}>Where do we send your pay?</h1>

        {/* Live card preview */}
        <div style={{ background: 'var(--ink)', borderRadius: 18, padding: '24px 22px 20px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
          {/* Background pattern */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
          <div style={{ position: 'absolute', top: 10, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

          {/* Network logo */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div style={{ width: 36, height: 24, borderRadius: 4, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', marginLeft: -3 }} />
            </div>
            {network && (
              <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>{network}</span>
            )}
          </div>

          {/* Card number */}
          <div style={{ fontFamily: 'var(--body)', fontSize: 20, color: '#fff', letterSpacing: '0.14em', marginBottom: 20, fontWeight: 600 }}>
            {previewNum}
          </div>

          {/* Name + Expiry */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Cardholder</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: name ? '#fff' : 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
                {name || 'YOUR NAME'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--body)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Expires</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: expiry ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{previewExp}</div>
            </div>
          </div>
        </div>

        {/* Inputs — SystemRow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SystemRow label="Card number" placeholder="1234 5678 9012 3456" value={card} onChange={v => setCard(fmtCard(v))} inputMode="numeric" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <SystemRow label="Expiry" placeholder="MM/YY" value={expiry} onChange={v => setExpiry(fmtExpiry(v))} inputMode="numeric" />
            <SystemRow label="CVV" placeholder="•••" value={cvv} onChange={v => setCvv(v.replace(/\D/g, '').slice(0, 4))} inputMode="numeric" />
          </div>
          <SystemRow label="Name on card" placeholder="Jordan Lee" value={name} onChange={setName} />
        </div>

        {/* Stripe note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 0', padding: '12px 16px', background: 'var(--paper-2)', border: '2px solid var(--ink)', borderRadius: 14 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
            <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="var(--ink)" strokeWidth="1.3" />
            <path d="M4 6V4.5a3 3 0 016 0V6" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="1" fill="var(--ink)" />
          </svg>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', lineHeight: 1.5 }}>
            Secured by Stripe · SHIFT never stores your card · 256-bit encryption
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={submit}
          disabled={!isValid}
          style={{
            width: '100%', padding: '16px', border: 'none', borderRadius: 99, cursor: isValid ? 'pointer' : 'default',
            background: isValid ? 'var(--ink)' : 'var(--paper-3)',
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18,
            color: isValid ? '#fff' : 'var(--ink)',
            transition: 'all 0.2s', letterSpacing: '-0.02em',
          }}
        >
          Save card →
        </button>
      </div>
    </div>
  );
}
