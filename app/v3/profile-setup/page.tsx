'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import StepProgress from '@/app/components/StepProgress';

export default function ProfileSetup() {
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [tagline, setTagline] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  const canContinue = bio.length > 10;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
        <Link href="/v3/w9" style={{ fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Your profile</span>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={7} total={8} />
      </div>

      <div style={{ padding: '16px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>
          PROFILE
        </div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          Put your best foot forward.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginBottom: 28, lineHeight: 1.5 }}>
          Employers see this before booking you. A strong profile means more shifts.
        </p>

        {/* Photo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: hasPhoto ? 'var(--hydrant)' : 'var(--paper-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed var(--line-2)',
            }}>
              {hasPhoto
                ? <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 28, color: '#fff' }}>MR</span>
                : <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="5" stroke="var(--mute)" strokeWidth="1.5" /><path d="M4 24c0-5.52 4.48-10 10-10s10 4.48 10 10" stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round"/></svg>
              }
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>Profile photo</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.4, marginBottom: 8 }}>
              A clear headshot increases booking rate by 3×
            </div>
            <button
              onClick={() => setHasPhoto(true)}
              style={{
                fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600,
                color: 'var(--hydrant)', background: 'var(--hydrant-soft)',
                border: '1px solid var(--hydrant)', borderRadius: 99,
                padding: '6px 12px', cursor: 'pointer',
              }}
            >
              {hasPhoto ? '✓ Photo added' : 'Add photo'}
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
            One-liner
          </div>
          <input
            type="text"
            value={tagline}
            onChange={e => setTagline(e.target.value)}
            maxLength={60}
            placeholder="e.g. Fast barista, 6 yrs experience, bilingual"
            style={{
              width: '100%', height: 52, padding: '0 16px',
              background: 'var(--card)', border: '2px solid var(--ink)',
              borderRadius: 14, fontFamily: 'var(--sans)', fontSize: 15,
              color: 'var(--ink)', outline: 'none',
            }}
          />
          <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 5 }}>
            {60 - tagline.length} characters left
          </p>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
            About you <span style={{ color: '#EA4B2A' }}>*</span>
          </div>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
            placeholder="Describe your experience, work style, and what makes you reliable..."
            style={{
              width: '100%', padding: '14px 16px',
              background: 'var(--card)', border: '2px solid var(--ink)',
              borderRadius: 14, fontFamily: 'var(--body)', fontSize: 13,
              color: 'var(--ink)', outline: 'none', resize: 'none', lineHeight: 1.6,
              transition: 'border-color 0.15s',
            }}
          />
        </div>

        {/* Preview card */}
        {canContinue && (
          <div style={{ padding: '14px 16px', background: 'var(--paper-2)', borderRadius: 12, border: '2px solid var(--ink)', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--hydrant)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, color: '#fff' }}>MR</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>Marcus Rivera</div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>{tagline || 'Barista · Bartender · Server'}</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.5 }}>
              {bio.slice(0, 100)}{bio.length > 100 ? '…' : ''}
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        {canContinue ? (
          <Link
            href="/v3/neighborhood"
            style={{
              display: 'block', width: '100%', padding: '15px 22px',
              borderRadius: 99, background: 'var(--ink)', color: '#FFFFFF',
              fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16,
              textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
            }}
          >
            Looking good. Next →
          </Link>
        ) : (
          <div style={{ width: '100%', padding: '15px 22px', borderRadius: 99, background: 'var(--paper-3)', color: 'var(--mute)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, textAlign: 'center' }}>
            Write something about yourself
          </div>
        )}
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 8 }}>
          You can edit this any time from your profile
        </p>
      </div>
    </div>
  );
}
