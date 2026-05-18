'use client';

import Link from 'next/link';
import { useState } from 'react';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const TIME_BLOCKS = [
  { label: 'Morning', range: '6A–12P' },
  { label: 'Afternoon', range: '12P–6P' },
  { label: 'Evening', range: '6P–12A' },
];

const initialGrid: boolean[][] = [
  [true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true],
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
      }}>
        <Link href="/v3/credentials" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Availability</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Progress */}
      <div style={{ padding: '8px 22px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${(5 / 8) * 100}%`, height: '100%', background: 'var(--hydrant)', borderRadius: 99 }} />
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
          letterSpacing: '-0.075em',
          lineHeight: 1,
          marginBottom: 8,
        }}>Set your availability.</h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          marginBottom: 24,
        }}>Defaults on. Turn off what you can't do.</p>

        {/* Time block cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TIME_BLOCKS.map((block, rowIdx) => (
            <div key={rowIdx} style={{
              border: '2px solid var(--ink)',
              borderRadius: 14,
              overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px 10px',
              }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>{block.label}</span>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 15, color: 'var(--mute)' }}>{block.range}</span>
              </div>

              {/* Day labels + checkboxes */}
              <div style={{ padding: '0 12px 14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                  {DAYS.map((d) => (
                    <div key={d} style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--mute)',
                      textAlign: 'center',
                      letterSpacing: '0.03em',
                    }}>{d}</div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {DAYS.map((_, colIdx) => {
                    const enabled = grid[rowIdx][colIdx];
                    return (
                      <button
                        key={colIdx}
                        onClick={() => toggle(rowIdx, colIdx)}
                        style={{
                          height: 40,
                          borderRadius: 8,
                          border: `1px solid ${enabled ? 'var(--hydrant)' : 'var(--line-2)'}`,
                          background: enabled ? 'var(--hydrant-soft)' : 'var(--paper-2)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {enabled && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#72c15f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/v3/neighborhood" style={{
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
