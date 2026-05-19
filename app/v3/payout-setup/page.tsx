'use client';

import Link from 'next/link';
import { useState } from 'react';
import StepProgress from '@/app/components/StepProgress';

const METHODS = [
  {
    id: 'debit',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L10.5 5.5H14L11 8.5L12 13L8 10.5L4 13L5 8.5L2 5.5H5.5L8 1Z" fill="#72c15f" />
      </svg>
    ),
    title: 'Debit Card',
    sub: 'Instant · usually under 11 min',
  },
  {
    id: 'bank',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="7" width="12" height="7" rx="1" stroke="#6B6E78" strokeWidth="1.5" />
        <path d="M8 1L14 5H2L8 1Z" fill="#6B6E78" />
        <rect x="5" y="9" width="2" height="3" fill="#6B6E78" />
        <rect x="9" y="9" width="2" height="3" fill="#6B6E78" />
      </svg>
    ),
    title: 'Bank Transfer',
    sub: '1–2 business days',
  },
];

export default function PayoutSetup() {
  const [selected, setSelected] = useState('debit');

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
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
        <Link href="/v3/availability" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Get paid</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={6} total={8} />
      </div>

      <div style={{ padding: '18px 22px 32px' }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--hydrant)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: 10,
        }}>GET PAID</span>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 38,
          color: 'var(--ink)',
          letterSpacing: '-0.075em',
          lineHeight: 0.95,
          marginBottom: 10,
        }}>Where should we send it?</h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          marginBottom: 20,
        }}>Your pay goes here after each shift.</p>

        {/* Method options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {METHODS.map((method) => {
            const isSelected = selected === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setSelected(method.id)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: isSelected ? 'var(--hydrant-soft)' : 'var(--card)',
                  border: isSelected ? '2px solid var(--hydrant)' : '2px solid var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flexShrink: 0 }}>{method.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'var(--ink)',
                    }}>{method.title}</div>
                    <div style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                      color: 'var(--mute)',
                      marginTop: 2,
                    }}>{method.sub}</div>
                  </div>
                </div>
                {isSelected && (
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 99,
                    background: 'var(--hydrant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Stripe trust block */}
        <div style={{
          marginTop: 20,
          padding: 14,
          background: 'var(--paper-2)',
          borderRadius: 10,
          border: '2px solid var(--ink)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#6B6E78" strokeWidth="1.3" />
              <path d="M5 7V5a3 3 0 016 0v2" stroke="#6B6E78" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="8" cy="10.5" r="1" fill="#6B6E78" />
            </svg>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)' }}>
                Stripe collects your card details next.
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginTop: 4 }}>
                SHIFT never sees it · same Stripe your bank uses · 256-bit · 30 sec
              </p>
            </div>
          </div>
        </div>

        {/* Preview block */}
        <div style={{
          marginTop: 16,
          padding: '14px 16px',
          background: 'var(--ink)',
          borderRadius: 10,
        }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
            if you'd worked today
          </p>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: '#fff' }}>
            $174<span style={{ color: 'var(--hydrant)' }}>.</span>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
            already in your account
          </p>
        </div>

        {/* CTA */}
        <Link href="/v3/w9" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          marginTop: 24,
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 99,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 18,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>Continue.</Link>
      </div>
    </div>
  );
}
