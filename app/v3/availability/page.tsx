'use client';

import Link from 'next/link';
import { useState } from 'react';
import StepProgress from '@/app/components/StepProgress';

const DAYS = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

const TIME_BLOCKS = [
  {
    label: 'Morning',
    range: '6A–12P',
    rotations: [-8, 10, -5, 7, -9, 6, -7],
  },
  {
    label: 'Afternoon',
    range: '12P–6P',
    rotations: [9, -6, 8, -10, 5, -8, 7],
  },
  {
    label: 'Evening',
    range: '6P–12A',
    rotations: [-7, 8, -9, 6, -8, 10, -6],
  },
];

const initialGrid: boolean[][] = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
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
      <style>{`
        @keyframes pill-land {
          0%   { opacity: 0; transform: translateY(40px) rotate(var(--r)) scale(0.82); }
          55%  { opacity: 1; transform: translateY(-5px) rotate(calc(var(--r) * -0.1)) scale(1.04); }
          75%  { transform: translateY(2px) rotate(calc(var(--r) * 0.03)) scale(0.98); }
          90%  { transform: translateY(-1px) rotate(0deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
        }
        .pill-anim {
          animation: pill-land 0.75s cubic-bezier(0.22,1,0.36,1) both;
          opacity: 0;
        }
      `}</style>

      {/* Nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--paper)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <Link href="/v3/credentials" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Get started</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={5} total={8} />
      </div>

      <div style={{ padding: '24px 22px 40px' }}>

        <span style={{
          fontFamily: 'var(--body)',
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
          marginBottom: 32,
        }}>When can you work?</h1>

        {TIME_BLOCKS.map((block, rowIdx) => (
          <div key={rowIdx} style={{ marginBottom: 36 }}>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
              <span style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 24,
                color: 'var(--ink)',
                letterSpacing: '-0.05em',
              }}>{block.label}</span>
              <span style={{
                fontFamily: 'var(--body)',
                fontSize: 12,
                color: 'var(--mute)',
                fontWeight: 500,
              }}>{block.range}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {DAYS.map((day, colIdx) => {
                const enabled = grid[rowIdx][colIdx];
                const leftOn = colIdx > 0 && grid[rowIdx][colIdx - 1];
                const rightOn = colIdx < 6 && grid[rowIdx][colIdx + 1];
                const borderRadius = !enabled ? 99
                  : leftOn && rightOn ? 5
                  : leftOn ? '5px 99px 99px 5px'
                  : rightOn ? '99px 5px 5px 99px'
                  : 99;
                return (
                  <button
                    key={colIdx}
                    className="pill-anim"
                    onClick={() => toggle(rowIdx, colIdx)}
                    style={{
                      '--r': `${block.rotations[colIdx]}deg`,
                      animationDelay: `${rowIdx * 120 + colIdx * 55}ms`,
                      padding: '14px 16px',
                      borderRadius,
                      border: '2px solid var(--ink)',
                      background: enabled ? 'var(--ink)' : 'transparent',
                      cursor: 'pointer',
                      fontFamily: 'var(--sans)',
                      fontWeight: 600,
                      fontSize: 22,
                      color: enabled ? '#fff' : 'var(--ink)',
                      letterSpacing: '-0.02em',
                      transition: 'background 0.15s ease, border-radius 0.15s ease, color 0.15s ease',
                      marginLeft: enabled && leftOn ? -8 : 0,
                      position: 'relative',
                      zIndex: enabled ? 1 : 0,
                    } as React.CSSProperties}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <Link href="/v3/neighborhood" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          marginTop: 4,
          background: 'var(--ink)',
          borderRadius: 99,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 22,
          color: '#fff',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>→</Link>

        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 13,
          color: 'var(--mute)',
          marginTop: 14,
        }}>Pick everything you can do. More shifts that way.</p>
      </div>
    </div>
  );
}
