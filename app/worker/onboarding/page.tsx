'use client';

import Link from 'next/link';
import { useState } from 'react';
import StepProgress from '@/app/components/StepProgress';

const ALL_SKILLS = [
  'barista', 'host', 'server', 'bartender', 'barback', 'cashier',
  'prep cook', 'dish', 'security', 'pop-ups', 'catering', 'baking',
];

const DEFAULT_SELECTED = ['host', 'server', 'prep cook', 'baking'];

export default function WorkerOnboarding() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  function toggle(skill: string) {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
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
        background: 'var(--paper)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <Link href="/v3/phone-verify" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Get started</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Step 1 */}
      <div style={{ padding: 22 }}>
        <div style={{ marginBottom: 24 }}>
          <StepProgress step={3} total={8} />
        </div>

        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--hydrant)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: 10,
        }}>YOUR SKILLS</span>

        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 36,
          color: 'var(--ink)',
          letterSpacing: '-0.075em',
          lineHeight: 1,
          marginBottom: 10,
        }}>What can you do?</h1>

        {/* Chip grid — 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          {ALL_SKILLS.map((skill) => {
            const isSelected = selected.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggle(skill)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 99,
                  fontFamily: 'var(--sans)',
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                  border: isSelected ? 'none' : '2px solid var(--ink)',
                  background: isSelected ? 'var(--hydrant)' : 'transparent',
                  color: 'var(--ink)',
                  transition: 'all 0.15s ease',
                  textAlign: 'center',
                }}
              >
                {skill}
              </button>
            );
          })}
        </div>

        {/* Continue */}
        <Link href="/v3/credentials" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          marginTop: 24,
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 12,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 22,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>→</Link>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          lineHeight: 1.5,
          marginTop: 14,
          textAlign: 'left',
        }}>Pick everything that fits. More skills = more shifts.</p>
      </div>
    </div>
  );
}
