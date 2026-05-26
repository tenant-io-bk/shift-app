'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/app/components/BottomNav';

const TRANSACTIONS = [
  { name: "Padmore's Coffee", detail: 'Barista · Mon 12 May', amount: '+$174.00', positive: true },
  { name: 'The Wren', detail: 'Server · Sat 10 May', amount: '+$96.00', positive: true },
  { name: 'CHASE ··4471', detail: 'Transferred', amount: '-$200.00', positive: false },
  { name: 'Bar Blondeau', detail: 'Barback · Thu 8 May', amount: '+$128.00', positive: true },
  { name: 'SHIFT Fee', detail: 'Monthly', amount: '$0.00', positive: false, zero: true },
  { name: "Greene's Bar", detail: 'Server · Tue 6 May', amount: '+$88.00', positive: true },
];

const WEEKLY_GOAL = 600;
const WEEKLY_EARNED = 408;

export default function WorkerWallet() {
  const [withholding, setWithholding] = useState(true);
  const goalPct = Math.round((WEEKLY_EARNED / WEEKLY_GOAL) * 100);

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
        <Link href="/worker/map" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Wallet</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Wallet card */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'var(--ink)',
          borderRadius: 20,
          padding: '24px 22px 20px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Card texture lines */}
          <div style={{ position: 'absolute', top: 0, right: -20, width: 120, height: '100%', background: 'rgba(255,255,255,0.03)', transform: 'skewX(-12deg)' }} />
          <div style={{ position: 'absolute', top: 0, right: 40, width: 60, height: '100%', background: 'rgba(255,255,255,0.02)', transform: 'skewX(-12deg)' }} />

          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 6,
          }}>Available balance</p>

          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 56,
            color: '#fff',
            letterSpacing: '-0.075em',
            lineHeight: 1,
            marginBottom: 20,
          }}>$247<span style={{ color: '#72c15f' }}>.</span><span style={{ fontSize: 32 }}>50</span></div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>CHASE ·· 4471</span>
            {/* Pill buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {['Add bank', 'Cash out →'].map((label) => (
                <button
                  key={label}
                  style={{
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontFamily: 'var(--body)',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 99,
                    padding: '7px 14px',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tax withholding */}
      <div style={{ background: 'var(--card)', padding: '14px 22px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
              Tax withholding
            </div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 2 }}>
              {withholding ? '25% auto-held · ~$61.88 this week' : 'Off · you handle quarterly'}
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setWithholding(w => !w)}
            style={{
              width: 46,
              height: 26,
              borderRadius: 99,
              background: withholding ? 'var(--ink)' : 'var(--line)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 3,
                left: withholding ? 23 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'white',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          </button>
        </div>

        {withholding && (
          <div
            style={{
              marginTop: 10,
              padding: '8px 12px',
              background: 'var(--paper-2)',
              borderRadius: 8,
              fontFamily: 'var(--body)',
              fontSize: 11,
              color: 'var(--mute)',
            }}
          >
            Held funds transfer to your tax account on Jan 15, Apr 15, Jun 15, Sep 15.
          </div>
        )}
      </div>

      {/* Ledger */}
      <div style={{ background: 'var(--card)', padding: '0 22px' }}>
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--mute)',
          padding: '16px 0 10px',
          borderBottom: '1px solid var(--line)',
        }}>ACTIVITY</p>

        {TRANSACTIONS.map((tx, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{tx.name}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>{tx.detail}</div>
            </div>
            <div style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 15,
              color: tx.positive ? '#16A34A' : 'var(--mute)',
            }}>{tx.amount}</div>
          </div>
        ))}
      </div>

      {/* Cash out CTA */}
      <div style={{
        padding: '16px 22px 100px',
        background: 'var(--card)',
        borderTop: '1px solid var(--line)',
      }}>
        <button style={{
          width: '100%',
          padding: '16px',
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 99,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 16,
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
        }}>Cash out today.</button>
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 11,
          color: 'var(--mute)',
          textAlign: 'center',
          marginTop: 8,
        }}>$0 fee · direct to debit · 11 min avg</p>
      </div>

      <BottomNav active="wallet" />
    </div>
  );
}
