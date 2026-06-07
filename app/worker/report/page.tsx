'use client';

import { useState } from 'react';
import Link from 'next/link';

const ISSUE_TYPES = [
  { id: 'safety', label: 'Safety Concern', icon: '⚠' },
  { id: 'uncomfortable', label: 'Uncomfortable Situation', icon: '🔒' },
  { id: 'venue', label: 'Venue or Conditions Issue', icon: '🏠' },
  { id: 'unfair', label: 'Unfair Treatment', icon: '⚖' },
  { id: 'other', label: 'Something Else', icon: '···' },
];

export default function WorkerReport() {
  const [step, setStep] = useState<'type' | 'details' | 'submitted'>('type');
  const [selected, setSelected] = useState('');
  const [details, setDetails] = useState('');

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--line)',
      }}>
        {step === 'submitted' ? (
          <div style={{ width: 36 }} />
        ) : (
          <button
            onClick={() => step === 'details' ? setStep('type') : history.back()}
            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--ink)' }}
          >
            ←
          </button>
        )}
        <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Report issue
        </span>
        <div style={{ width: 36 }} />
      </div>

      {/* Identity protection banner */}
      {step !== 'submitted' && (
        <div style={{
          background: 'var(--card)',
          borderBottom: '1px solid var(--line)',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L2 3v4c0 2.8 2.1 5.4 5 6 2.9-.6 5-3.2 5-6V3L7 1z" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5 7l1.5 1.5L9 5.5" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Your identity is protected
          </span>
        </div>
      )}

      <div style={{ flex: 1, padding: '24px 22px', display: 'flex', flexDirection: 'column' }}>

        {/* Step 1: Issue type */}
        {step === 'type' && (
          <>
            <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 26, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 6 }}>
              What Happened?
            </h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginBottom: 24, lineHeight: 1.5 }}>
              Reports are reviewed by SHIFT — the venue never sees your name.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ISSUE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelected(type.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    background: selected === type.id ? 'var(--ink)' : 'var(--card)',
                    border: `2px solid ${selected === type.id ? 'var(--ink)' : 'var(--line)'}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{type.icon}</span>
                  <span style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 600,
                    fontSize: 15,
                    color: selected === type.id ? '#fff' : 'var(--ink)',
                  }}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => selected && setStep('details')}
              disabled={!selected}
              style={{
                width: '100%',
                padding: '16px',
                background: selected ? 'var(--ink)' : 'var(--line)',
                color: selected ? '#fff' : 'var(--mute)',
                borderRadius: 99,
                fontFamily: 'var(--body)',
                fontWeight: 500,
                fontSize: 16,
                border: 'none',
                cursor: selected ? 'pointer' : 'default',
                letterSpacing: '-0.01em',
                marginTop: 28,
              }}
            >
              Next →
            </button>
          </>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <>
            <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 26, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 6 }}>
              Tell Us More.
            </h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginBottom: 20, lineHeight: 1.5 }}>
              Be as specific as you&apos;re comfortable with. No names are required.
            </p>

            <div style={{
              background: 'var(--card)',
              border: '2px solid var(--ink)',
              borderRadius: 12,
              overflow: 'hidden',
              marginBottom: 20,
            }}>
              <div style={{
                padding: '8px 14px',
                borderBottom: '1px solid var(--line)',
                fontFamily: 'var(--body)',
                fontSize: 11,
                color: 'var(--mute)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {ISSUE_TYPES.find(t => t.id === selected)?.label}
              </div>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what happened..."
                style={{
                  width: '100%',
                  minHeight: 160,
                  padding: '14px',
                  background: 'transparent',
                  border: 'none',
                  fontFamily: 'var(--body)',
                  fontSize: 14,
                  color: 'var(--ink)',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.6,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{
              padding: '10px 14px',
              background: 'var(--paper-2)',
              borderRadius: 10,
              fontFamily: 'var(--body)',
              fontSize: 11,
              color: 'var(--ink)',
              lineHeight: 1.5,
              marginBottom: 24,
            }}>
              This report goes only to SHIFT&apos;s Trust &amp; Safety team. The venue will not see your name or contact info.
            </div>

            <button
              onClick={() => setStep('submitted')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'var(--ink)',
                color: '#fff',
                borderRadius: 99,
                fontFamily: 'var(--body)',
                fontWeight: 500,
                fontSize: 16,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '-0.01em',
              }}
            >
              Submit Report
            </button>
          </>
        )}

        {/* Step 3: Submitted */}
        {step === 'submitted' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 16 }}>

            {/* Shield icon */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--paper-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 3L5 7.5V16c0 6.4 4.8 12.4 11 13.8C22.2 28.4 27 22.4 27 16V7.5L16 3z" fill="var(--ink)" opacity="0.2" />
                <path d="M16 3L5 7.5V16c0 6.4 4.8 12.4 11 13.8C22.2 28.4 27 22.4 27 16V7.5L16 3z" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M11 16l3.5 3.5L21 12" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 10 }}>
                Reported.
              </h2>
              <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', lineHeight: 1.6, maxWidth: 280, margin: '0 auto' }}>
                Our Trust &amp; Safety team will review your report within 24 hours.
              </p>
            </div>

            <div style={{
              padding: '12px 20px',
              background: 'var(--paper-2)',
              borderRadius: 10,
              fontFamily: 'var(--body)',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--ink)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginTop: 8,
            }}>
              Your identity is protected
            </div>

            <Link
              href="/worker/map"
              style={{
                marginTop: 24,
                display: 'block',
                width: '100%',
                padding: '16px',
                background: 'var(--ink)',
                color: '#fff',
                borderRadius: 99,
                fontFamily: 'var(--body)',
                fontWeight: 500,
                fontSize: 16,
                textAlign: 'center',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Back to Shifts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
