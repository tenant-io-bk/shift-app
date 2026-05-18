'use client';

import Link from 'next/link';
import { useState } from 'react';

const ALL_SKILLS = [
  'Barista', 'Bartender', 'Line Cook', 'Server', 'Host', 'Barback',
  'Cashier', 'Prep Cook', 'Dishwasher', 'Retail', 'Security', 'Catering', 'Delivery',
];

const DEFAULT_SELECTED = ['Barista', 'Bartender', 'Line Cook'];

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
        {/* Progress bar */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Step 3 of 8</span>
          </div>
          <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 99 }}>
            <div style={{ width: `${(3/8)*100}%`, height: '100%', background: 'var(--hydrant)', borderRadius: 99 }} />
          </div>
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
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: 10,
        }}>What can you do?</h1>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          lineHeight: 1.5,
          marginBottom: 20,
        }}>Pick everything that fits. More skills = more shifts.</p>

        {/* Chip grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {ALL_SKILLS.map((skill) => {
            const isSelected = selected.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggle(skill)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 99,
                  fontFamily: 'var(--sans)',
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  border: isSelected ? 'none' : '1px solid var(--line)',
                  background: isSelected ? 'var(--ink)' : 'var(--card)',
                  color: isSelected ? '#fff' : 'var(--ink)',
                  transition: 'all 0.15s ease',
                }}
              >
                {skill}
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          color: 'var(--hydrant)',
          fontWeight: 500,
          marginTop: 14,
        }}>
          28× more shifts with 3+ skills
        </p>

        {/* Continue */}
        <Link href="/v3/credentials" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px',
          marginTop: 28,
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 12,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 22,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>→</Link>
      </div>
    </div>
  );
}
