'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

const TEAM_SIZES = ['1–5', '6–20', '21–50', '50+'];

export default function BusinessProfile() {
  const [hasLogo, setHasLogo] = useState(false);
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState('');

  const canContinue = description.length > 10 && teamSize;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
        <Link href="/employer/onboarding" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Business profile</span>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: '8px 22px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '60%', height: '100%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
        <span style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--hydrant)', fontWeight: 600 }}>3</span> / 5
        </span>
      </div>

      <div style={{ padding: '20px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>YOUR BUSINESS</div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          Make a Great First Impression.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginBottom: 28, lineHeight: 1.5 }}>
          Workers see this before accepting a shift. Strong profiles attract better talent.
        </p>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, padding: '16px', background: 'var(--card)', borderRadius: 12, border: '2px solid var(--ink)' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 12, flexShrink: 0,
            background: hasLogo ? 'var(--hydrant)' : 'var(--paper-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px dashed var(--line-2)',
          }}>
            {hasLogo
              ? <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 20, color: '#fff' }}>PC</span>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="var(--mute)" strokeWidth="1.5"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>Business Logo</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginBottom: 8 }}>Square image works best</div>
            <button onClick={() => setHasLogo(true)} style={{
              fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--hydrant)',
              background: 'var(--hydrant-soft)', border: '1px solid var(--hydrant)',
              borderRadius: 99, padding: '6px 12px', cursor: 'pointer',
            }}>
              {hasLogo ? '✓ Logo Added' : 'Upload Logo'}
            </button>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
            About your business <span style={{ color: '#EA4B2A' }}>*</span>
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
            placeholder="What's the vibe? What do workers need to know before showing up?"
            style={{
              width: '100%', padding: '14px 16px', background: 'var(--card)',
              border: '2px solid var(--ink)',
              borderRadius: 14, fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)',
              outline: 'none', resize: 'none', lineHeight: 1.6, transition: 'border-color 0.15s',
            }} />
        </div>

        <div style={{ marginBottom: 8 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 10 }}>
            Current team size
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {TEAM_SIZES.map(s => (
              <button key={s} onClick={() => setTeamSize(s)} style={{
                flex: 1, padding: '11px 0', borderRadius: 99, cursor: 'pointer',
                border: '2px solid var(--ink)',
                background: teamSize === s ? 'var(--ink)' : 'var(--card)',
                fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600,
                color: teamSize === s ? '#fff' : 'var(--mute)',
                transition: 'all 0.15s',
              }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        {canContinue ? (
          <Link href="/employer/billing" style={{
            display: 'block', width: '100%', padding: '15px 22px', borderRadius: 99,
            background: 'var(--ink)', color: '#fff', fontFamily: 'var(--body)',
            fontWeight: 500, fontSize: 16, textAlign: 'center', textDecoration: 'none',
          }}>Continue →</Link>
        ) : (
          <div style={{ width: '100%', padding: '15px 22px', borderRadius: 99, background: 'var(--paper-3)', color: 'var(--mute)', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, textAlign: 'center' }}>
            Fill in All Fields
          </div>
        )}
      </div>
    </div>
  );
}
