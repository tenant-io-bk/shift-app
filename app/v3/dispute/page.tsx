'use client';

import Link from 'next/link';
import { useState } from 'react';

const REASONS = [
  { id: 'hours', label: 'Hours were wrong', desc: 'Clock-in or clock-out time is inaccurate' },
  { id: 'pay', label: "Pay didn't match", desc: 'Amount received differs from agreed rate' },
  { id: 'conditions', label: 'Shift conditions', desc: 'Working environment or role differed from posting' },
  { id: 'other', label: 'Other', desc: 'Something else went wrong' },
];

export default function Dispute() {
  const [selected, setSelected] = useState('conditions');
  const [text, setText] = useState('');

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
        <Link href="/worker/paid-out" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Dispute</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: 22 }}>
        {/* Alert header */}
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--ink)',
          marginBottom: 10,
        }}>DISPUTE #4471</p>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 30,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          marginBottom: 8,
        }}>Flag an Issue with This Shift.</h1>

        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 13,
          color: 'var(--ink)',
          lineHeight: 1.5,
          marginBottom: 20,
        }}>SHIFT Trust reviews all disputes. Funds held for 72 hours.</p>

        {/* Reason selection */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REASONS.map((reason) => {
            const isSelected = selected === reason.id;
            return (
              <button
                key={reason.id}
                onClick={() => setSelected(reason.id)}
                style={{
                  padding: 14,
                  background: 'var(--card)',
                  border: '2px solid var(--ink)',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* Radio */}
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--ink)' : 'var(--mute-2)'}`,
                  background: isSelected ? 'var(--ink)' : 'transparent',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {isSelected && (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
                    {reason.label}
                  </div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 2 }}>
                    {reason.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Text area */}
        <div style={{ marginTop: 14 }}>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--ink)',
            marginBottom: 6,
          }}>ADD CONTEXT (optional)</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 800))}
            placeholder="Describe what happened..."
            style={{
              width: '100%',
              height: 100,
              background: 'var(--card)',
              border: '2px solid var(--ink)',
              borderRadius: 14,
              padding: '14px 16px',
              fontFamily: 'var(--body)',
              fontSize: 14,
              color: 'var(--ink)',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 11,
            color: 'var(--ink)',
            textAlign: 'right',
            marginTop: 4,
          }}>{text.length} / 800</p>
        </div>

        {/* 72hr notice */}
        <div style={{
          marginTop: 16,
          padding: '12px 14px',
          background: 'var(--hydrant-soft)',
          borderRadius: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 12,
            color: 'var(--ink)',
            fontWeight: 500,
          }}>Funds held · auto-releases in</p>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 20,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
          }}>72:00:00</div>
        </div>

        {/* CTA */}
        <button style={{
          width: '100%',
          padding: '16px',
          marginTop: 24,
          background: 'var(--ink)',
          border: 'none',
          borderRadius: 99,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 18,
          color: '#fff',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
        }}>File Dispute.</button>
      </div>
    </div>
  );
}
