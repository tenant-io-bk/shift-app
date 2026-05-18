'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

const SKILLS = ['Barista', 'Bartender', 'Server', 'Line Cook', 'Host'];

const REVIEWS = [
  {
    business: "Padmore's Coffee",
    date: 'Mon 12 May',
    rating: 5,
    text: 'Jumped right in during a busy brunch. No hand-holding needed. Would rebook immediately.',
    avatar: '#72c15f',
  },
  {
    business: 'The Wren',
    date: 'Sat 10 May',
    rating: 5,
    text: 'Fast, professional, great with customers. One of the best we\'ve had through SHIFT.',
    avatar: '#0D0E12',
  },
  {
    business: 'Bar Blondeau',
    date: 'Thu 8 May',
    rating: 4,
    text: 'Solid work, good energy. Took a bit to find the rhythm but got there.',
    avatar: '#2D6A4F',
  },
];

export default function WorkerProfile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Marcus Rivera');
  const [bio, setBio] = useState('Hospitality pro. 6 years bar + floor experience across Brooklyn and Manhattan. Fast learner, team player.');
  const [nameInput, setNameInput] = useState(name);
  const [bioInput, setBioInput] = useState(bio);

  function saveEdits() {
    setName(nameInput);
    setBio(bioInput);
    setEditing(false);
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <StatusBar time="9:41" />

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <div style={{ width: 32 }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>My Profile</span>
        <button
          onClick={() => editing ? saveEdits() : setEditing(true)}
          style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: editing ? 'var(--hydrant)' : 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' }}
        >
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Avatar + name */}
      <div style={{ padding: '28px 22px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'var(--hydrant)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 26, color: '#fff' }}>MR</span>
            </div>
            {editing && (
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 22, height: 22, borderRadius: '50%',
                background: 'var(--ink)', border: '2px solid var(--paper)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 7.5L7.5 1 9 2.5 2.5 9H1V7.5Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {editing ? (
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                style={{
                  width: '100%', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22,
                  color: 'var(--ink)', border: 'none', borderBottom: '2px solid var(--hydrant)',
                  background: 'transparent', outline: 'none', letterSpacing: '-0.02em', marginBottom: 4,
                }}
              />
            ) : (
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{name}</div>
            )}
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', marginTop: 3 }}>Bed-Stuy, Brooklyn · Since May 2025</div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {['ID Verified', 'Tax Info'].map(badge => (
                <span key={badge} style={{
                  fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
                  color: '#16A34A', background: 'rgba(22,163,74,0.1)',
                  borderRadius: 99, padding: '3px 8px', letterSpacing: '0.06em',
                }}>✓ {badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginTop: 16 }}>
          {editing ? (
            <textarea
              value={bioInput}
              onChange={e => setBioInput(e.target.value)}
              rows={3}
              style={{
                width: '100%', fontFamily: 'var(--mono)', fontSize: 13,
                color: 'var(--ink)', border: '1px solid var(--hydrant)',
                borderRadius: 8, padding: '10px 12px', background: 'var(--card)',
                outline: 'none', resize: 'none', lineHeight: 1.5,
              }}
            />
          ) : (
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', lineHeight: 1.6 }}>{bio}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--line)' }}>
        {[
          { label: 'Shifts', value: '12' },
          { label: 'Rating', value: '4.9★' },
          { label: 'Earned', value: '$1.8k' },
          { label: 'Rebook', value: '78%' },
        ].map((stat, i) => (
          <div key={i} style={{ padding: '14px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{stat.value}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 10 }}>Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map(skill => (
            <span key={skill} style={{
              fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 14,
              background: 'var(--ink)', color: '#fff',
              borderRadius: 99, padding: '6px 14px',
            }}>{skill}</span>
          ))}
          {editing && (
            <Link href="/worker/onboarding" style={{
              fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 14,
              background: 'var(--paper-2)', color: 'var(--mute)',
              borderRadius: 99, padding: '6px 14px', border: '1px dashed var(--line-2)',
              textDecoration: 'none',
            }}>+ Edit skills</Link>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>Reviews from employers</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hydrant)', fontWeight: 600 }}>4.9 avg</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {REVIEWS.map((review, i) => (
            <div key={i} style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 12, border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: review.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 11, color: '#fff' }}>
                    {review.business.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{review.business}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)' }}>{review.date}</div>
                </div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--hydrant)', fontWeight: 700 }}>
                  {'★'.repeat(review.rating)}
                </div>
              </div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.6 }}>&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* Settings link */}
        <Link href="/worker/settings" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', marginTop: 16, borderTop: '1px solid var(--line)',
          textDecoration: 'none',
        }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Settings & account</span>
          <span style={{ color: 'var(--mute)', fontSize: 18 }}>→</span>
        </Link>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}
