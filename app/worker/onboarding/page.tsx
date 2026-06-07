'use client';

import Link from 'next/link';
import { useState } from 'react';
import StepProgress from '@/app/components/StepProgress';

const ALL_SKILLS = [
  { label: 'Barista',    r:  -8, delay: 0   },
  { label: 'Host',       r:  10, delay: 50  },
  { label: 'Server',     r: -12, delay: 100 },
  { label: 'Bartender',  r:   7, delay: 60  },
  { label: 'Barback',    r:  -6, delay: 150 },
  { label: 'Cashier',    r:   9, delay: 110 },
  { label: 'Prep Cook',  r: -10, delay: 200 },
  { label: 'Dish',       r:   6, delay: 160 },
  { label: 'Security',   r:  -7, delay: 250 },
  { label: 'Pop-Ups',    r:  11, delay: 210 },
  { label: 'Catering',   r:  -9, delay: 300 },
  { label: 'Baking',     r:   8, delay: 260 },
];

export default function WorkerOnboarding() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(skill: string) {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
      <style>{`
        @keyframes pill-land {
          0%   { opacity: 0; transform: translateY(40px) rotate(var(--r)) scale(0.82); }
          55%  { opacity: 1; transform: translateY(-5px) rotate(calc(var(--r) * -0.1)) scale(1.04); }
          75%  { transform: translateY(2px)  rotate(calc(var(--r) * 0.03)) scale(0.98); }
          90%  { transform: translateY(-1px) rotate(0deg); }
          100% { opacity: 1; transform: translateY(0)    rotate(0deg) scale(1); }
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
        <Link href="/v3/phone-verify" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Get Started</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Step 1 */}
      <div style={{ padding: 22 }}>
        <div style={{ marginBottom: 24 }}>
          <StepProgress step={3} total={10} />
        </div>

        <span style={{
          fontFamily: 'var(--body)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: 10,
        }}>STEP 3 OF 4</span>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 36,
          color: 'var(--ink)',
          letterSpacing: '-0.075em',
          lineHeight: 1,
          marginBottom: 10,
        }}>What Can You Do?</h1>

        {/* Chip grid — 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          {ALL_SKILLS.map((s) => {
            const isSelected = selected.includes(s.label);
            return (
              <button
                key={s.label}
                className="pill-anim"
                onClick={() => toggle(s.label)}
                style={{
                  '--r': `${s.r}deg`,
                  animationDelay: `${s.delay}ms`,
                  padding: '11px 18px',
                  borderRadius: 99,
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                  border: isSelected ? 'none' : '2px solid var(--ink)',
                  background: isSelected ? 'var(--ink)' : 'transparent',
                  color: isSelected ? '#fff' : 'var(--ink)',
                  transition: 'background 0.15s ease, border 0.15s ease',
                  textAlign: 'center',
                } as React.CSSProperties}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Continue */}
        <Link href="/v3/neighborhood" style={{
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
          fontSize: 22,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>→</Link>

        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 13,
          color: 'var(--mute)',
          lineHeight: 1.5,
          marginTop: 14,
          textAlign: 'left',
        }}>Pick everything. More profile = more shifts.</p>
      </div>
    </div>
  );
}
