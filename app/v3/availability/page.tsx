'use client';

import Link from 'next/link';
import { useState } from 'react';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const TIMES = ['Morning\n6A–12P', 'Afternoon\n12P–6P', 'Evening\n6P–12A'];

// Default availability: most on, turn off Tue morning, Wed morning
const initialGrid: boolean[][] = [
  // MON   TUE    WED    THU   FRI   SAT   SUN  (morning row)
  [true,  false, false, true, true, true, true],
  // afternoon row
  [true,  true,  true,  true, true, true, true],
  // evening row
  [true,  true,  true,  true, true, true, true],
];

export default function Availability() {
  const [grid, setGrid] = useState<boolean[][]>(initialGrid.map(row => [...row]));

  function toggle(row: number, col: number) {
    setGrid((prev) => {
      const next = prev.map(r => [...r]);
      next[row][col] = !next[row][col];
      return next;
    });
  }

  const timeLabels = [
    { label: 'Morning', sub: '6A–12P' },
    { label: 'Afternoon', sub: '12P–6P' },
    { label: 'Evening', sub: '6P–12A' },
  ];

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
        <Link href="/v3/credentials" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Availability</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Progress */}
      <div style={{ padding: '8px 22px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${(5/8)*100}%`, height: '100%', background: 'var(--hydrant)', borderRadius: 99 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--hydrant)', fontWeight: 600 }}>5</span> / 8
        </span>
      </div>

      <div style={{ padding: 22 }}>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--hydrant)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: 10,
        }}>WHEN YOU WORK</span>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 36,
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: 8,
        }}>Set your availability.</h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          marginBottom: 20,
        }}>Defaults on. Turn off what you can't do.</p>

        {/* Grid */}
        <div style={{ marginTop: 20 }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
            <div />
            {DAYS.map((d) => (
              <div key={d} style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--mute)',
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}>{d}</div>
            ))}
          </div>

          {/* Time rows */}
          {timeLabels.map((time, rowIdx) => (
            <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: '64px repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 6 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{time.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--mute)', marginTop: 1 }}>{time.sub}</span>
              </div>
              {DAYS.map((_, colIdx) => {
                const enabled = grid[rowIdx][colIdx];
                const isWeekend = colIdx >= 5;
                return (
                  <button
                    key={colIdx}
                    onClick={() => toggle(rowIdx, colIdx)}
                    style={{
                      height: 44,
                      borderRadius: 8,
                      border: enabled
                        ? `1px solid ${isWeekend ? 'var(--hydrant)' : 'var(--hydrant)'}`
                        : '1px solid var(--line-2)',
                      background: enabled
                        ? 'var(--hydrant-soft)'
                        : 'var(--paper-2)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {enabled && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#3DD87C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Smart location */}
        <div style={{ marginTop: 28 }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            fontWeight: 600,
            color: 'var(--mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: 10,
          }}>YOUR AREA</span>

          {/* Location row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 14px',
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 10,
            marginBottom: 14,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5z" stroke="#3DD87C" strokeWidth="1.3" />
              <circle cx="8" cy="6" r="1.5" fill="#3DD87C" />
            </svg>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', flex: 1 }}>Bed-Stuy detected</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>auto-set from your address</span>
          </div>

          {/* Radius slider */}
          <div style={{ position: 'relative', padding: '8px 0 4px' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '35%',
              background: 'var(--ink)',
              borderRadius: 6,
              padding: '3px 8px',
              transform: 'translateX(-50%)',
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: '#fff' }}>2 mi radius</span>
            </div>
            <div style={{
              height: 4,
              background: 'var(--paper-3)',
              borderRadius: 99,
              marginTop: 20,
              position: 'relative',
            }}>
              <div style={{ width: '35%', height: '100%', background: 'var(--hydrant)', borderRadius: 99 }} />
              <div style={{
                position: 'absolute',
                left: '35%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid var(--hydrant)',
                boxShadow: '0 2px 6px rgba(13,14,18,0.15)',
              }} />
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'var(--hydrant)',
            marginTop: 10,
            fontWeight: 500,
          }}>40 open shifts in range</p>
        </div>

        {/* CTA */}
        <Link href="/v3/payout-setup" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          marginTop: 28,
          background: 'var(--ink)',
          border: 'none',
          borderRadius: 12,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 18,
          color: '#fff',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          textDecoration: 'none',
        }}>Save availability.</Link>
      </div>
    </div>
  );
}
