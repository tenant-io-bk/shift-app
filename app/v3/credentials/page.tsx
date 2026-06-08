'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import StepProgress from '@/app/components/StepProgress';

const CREDS = [
  {
    id: 'food-handler',
    name: 'Food Handler Certificate',
    issuer: 'NYC Dept of Health',
    detail: 'Required for most food service shifts in NYC',
    required: true,
  },
  {
    id: 'servsafe',
    name: 'ServSafe Certification',
    issuer: 'National Restaurant Association',
    detail: 'Food protection manager certification',
    required: false,
  },
  {
    id: 'nys-security',
    name: 'NYS Security License',
    issuer: 'NY Dept of State',
    detail: 'Required for door, security, and venue work',
    required: false,
  },
  {
    id: 'tips',
    name: 'TIPS / RBS Certified',
    issuer: 'Responsible Beverage Service',
    detail: 'Alcohol service training — valued at most bars',
    required: false,
  },
  {
    id: 'food-protection',
    name: 'NYC Food Protection Certificate',
    issuer: 'NYC Dept of Health',
    detail: 'Supervisor-level food safety credential',
    required: false,
  },
];

export default function Credentials() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expiries, setExpiries] = useState<Record<string, string>>({});

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function setExpiry(id: string, val: string) {
    setExpiries(prev => ({ ...prev, [id]: val }));
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
        <Link href="/worker/onboarding" style={{ fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Credentials</span>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={6} total={10} />
      </div>

      <div style={{ padding: '16px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>
          CREDENTIALS
        </div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          What Are You Certified In?
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginBottom: 24, lineHeight: 1.5 }}>
          Credentials unlock more shifts and higher pay. Add now or later — you can always update.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CREDS.map(cred => {
            const on = selected.has(cred.id);
            return (
              <div key={cred.id} style={{
                borderRadius: 12,
                border: '2px solid var(--ink)',
                background: on ? 'var(--paper-2)' : 'var(--card)',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}>
                <button
                  onClick={() => toggle(cred.id)}
                  style={{
                    width: '100%', padding: '14px 16px', background: 'none',
                    border: 'none', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: 12, textAlign: 'left',
                  }}
                >
                  {/* Checkbox */}
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    border: '2px solid var(--ink)',
                    background: on ? 'var(--ink)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {on && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{cred.name}</span>
                      {cred.required && (
                        <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: '#EA4B2A', background: 'rgba(234,75,42,0.1)', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.06em' }}>REQUIRED</span>
                      )}
                    </div>
                    <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 2 }}>{cred.issuer}</div>
                    <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 3, lineHeight: 1.4 }}>{cred.detail}</div>
                  </div>
                </button>

                {/* Expanded: expiry date */}
                {on && (
                  <div style={{ padding: '0 16px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>Expiry date</div>
                      <input
                        type="month"
                        value={expiries[cred.id] || ''}
                        onChange={e => setExpiry(cred.id, e.target.value)}
                        style={{
                          height: 40, padding: '0 12px', background: 'var(--paper)',
                          border: '2px solid var(--ink)', borderRadius: 12,
                          fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)',
                          outline: 'none', width: '100%',
                        }}
                      />
                    </div>
                    <div style={{ flexShrink: 0, paddingTop: 22 }}>
                      <button style={{
                        height: 40, padding: '0 14px', background: 'var(--paper-2)',
                        border: '2px solid var(--ink)', borderRadius: 99,
                        fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600,
                        color: 'var(--mute)', cursor: 'pointer', whiteSpace: 'nowrap',
                      }}>
                        Upload doc
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        <Link
          href="/v3/availability"
          style={{
            display: 'block', width: '100%', padding: '15px 22px',
            borderRadius: 99, background: 'var(--ink)', color: '#FFFFFF',
            fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16,
            textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
          }}
        >
          {selected.size > 0 ? `Continue with ${selected.size} Credential${selected.size > 1 ? 's' : ''}` : 'Continue'}
        </Link>
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 8 }}>
          You can add more later in your profile
        </p>
      </div>
    </div>
  );
}
