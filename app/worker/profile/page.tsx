'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

const SKILLS = [
  { label: 'Barista', count: 28 },
  { label: 'Bartender', count: 14 },
  { label: 'Server', count: 18 },
  { label: 'Line Cook', count: 6 },
  { label: 'Host', count: 9 },
];

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
    text: "Fast, professional, great with customers. One of the best we've had through SHIFT.",
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

const PAST_SHIFTS = [
  {
    posting: '#4401',
    shortName: "Padmore's",
    neighborhood: 'BedStuy',
    distance: '0.6 MI',
    type: 'Barista',
    hours: '11A–4P',
    pay: '$140',
    rate: '$28/HR',
    date: 'Mon 12 May',
    rating: 5,
    bg: 'linear-gradient(135deg, #c4a577 0%, #8b6545 60%, #5c3d22 100%)',
    cardBg: '#EAD5B8',
  },
  {
    posting: '#4389',
    shortName: 'The Wren',
    neighborhood: 'BedStuy',
    distance: '0.4 MI',
    type: 'Server',
    hours: '11A–3P',
    pay: '$96',
    rate: '$24/HR',
    date: 'Sat 10 May',
    rating: 5,
    bg: 'linear-gradient(135deg, #a8c4a0 0%, #6b9e62 60%, #4a7040 100%)',
    cardBg: '#C2DCC0',
  },
  {
    posting: '#4362',
    shortName: 'Bar Blondeau',
    neighborhood: 'Williamsburg',
    distance: '1.1 MI',
    type: 'Barback',
    hours: '6P–12A',
    pay: '$120',
    rate: '$24/HR',
    date: 'Thu 8 May',
    rating: 4,
    bg: 'linear-gradient(135deg, #b8a0c8 0%, #8060a0 60%, #5a3c78 100%)',
    cardBg: '#D0C0E4',
  },
  {
    posting: '#4310',
    shortName: 'Peoples Wine',
    neighborhood: 'Crown Heights',
    distance: '0.3 MI',
    type: 'Retail',
    hours: '2P–6P',
    pay: '$85',
    rate: '$22/HR',
    date: 'Tue 6 May',
    rating: 4,
    bg: 'linear-gradient(135deg, #f0c080 0%, #c88040 60%, #906020 100%)',
    cardBg: '#F2E0A0',
  },
];

export default function WorkerProfile() {
  const [tab, setTab] = useState<'profile' | 'history'>('profile');
  const [historyExpanded, setHistoryExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Marcus Rivera');
  const [bio, setBio] = useState('Hospitality pro. 6 years bar + floor experience across Brooklyn and Manhattan. Fast learner, fast learner, fast when it counts.');
  const [nameInput, setNameInput] = useState(name);
  const [bioInput, setBioInput] = useState(bio);

  function saveEdits() {
    setName(nameInput);
    setBio(bioInput);
    setEditing(false);
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>

      {/* Dark header */}
      <div style={{ background: 'var(--ink)', paddingTop: 0 }}>
        <StatusBar time="9:41" dark />

        <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 20, width: 32 }}>←</Link>
          <span style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em' }}>@marcov</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', width: 32, display: 'flex', justifyContent: 'flex-end' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="2" fill="rgba(255,255,255,0.5)" />
              <path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M4.2 13.8l1.4-1.4M12.4 5.6l1.4-1.4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', padding: '0 20px', gap: 4 }}>
          {(['profile', 'history'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15,
                color: tab === t ? '#fff' : 'rgba(255,255,255,0.35)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 4px 12px',
                borderBottom: tab === t ? '2px solid var(--hydrant)' : '2px solid transparent',
                letterSpacing: '-0.01em',
              }}
            >
              {t === 'profile' ? 'My Profile' : 'Work History'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'history' && (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, background: 'var(--paper)' }}>
          {/* Summary */}
          <div style={{ padding: '20px 20px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 99, background: 'var(--hydrant)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-0.04em' }}>12</span>
              </div>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>Shifts Worked</span>
            </div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 12 }}>$1.8k earned · 4.9★ avg rating</div>
          </div>

          {/* Stacked wallet cards */}
          {(() => {
            const PEEK = 82;
            const EXPANDED_H = 280;
            const n = PAST_SHIFTS.length;
            const containerH = historyExpanded
              ? PEEK * (n - 1) + EXPANDED_H
              : PEEK * (n - 1) + PEEK + 40;
            return (
              <div style={{ position: 'relative', height: containerH, margin: '0 16px 80px', transition: 'height 0.3s ease' }}>
                {PAST_SHIFTS.map((shift, i) => {
                  const isExpanded = historyExpanded === shift.posting;
                  return (
                    <div
                      key={shift.posting}
                      onClick={() => setHistoryExpanded(isExpanded ? null : shift.posting)}
                      style={{
                        position: 'absolute',
                        top: i * PEEK,
                        left: 0, right: 0,
                        zIndex: isExpanded ? 99 : i + 1,
                        background: shift.cardBg,
                        borderRadius: '18px 18px 0 0',
                        border: '2px solid var(--ink)',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Main row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 20px', gap: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                            {shift.shortName}
                          </div>
                          <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: 'rgba(13,14,18,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 5 }}>
                            {shift.date} · {shift.neighborhood}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                          <div style={{ background: 'var(--ink)', borderRadius: 99, padding: '8px 14px' }}>
                            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
                              {shift.type} {shift.hours}
                            </span>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>
                            {shift.pay}
                          </div>
                          <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: 'rgba(13,14,18,0.5)', textTransform: 'uppercase', marginTop: 4 }}>
                            {shift.rate}
                          </div>
                        </div>
                      </div>

                      {/* Expanded: rating + review link */}
                      {isExpanded && (
                        <div style={{ padding: '0 20px 20px' }}>
                          <div style={{ height: 1, background: 'rgba(13,14,18,0.1)', marginBottom: 14 }} />
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)' }}>Your rating</span>
                            <span style={{ color: 'var(--hydrant)', fontSize: 16 }}>{'★'.repeat(shift.rating)}{'☆'.repeat(5 - shift.rating)}</span>
                          </div>
                          <Link
                            href="/worker/job-detail"
                            onClick={e => e.stopPropagation()}
                            style={{ display: 'block', textAlign: 'center', padding: '13px', background: 'var(--ink)', color: '#fff', borderRadius: 99, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, textDecoration: 'none', letterSpacing: '-0.02em' }}
                          >
                            View details →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {tab === 'profile' && <>
      {/* Full-bleed photo */}
      <div style={{ position: 'relative', width: '100%', height: 300, background: 'linear-gradient(160deg, #1a1c22 0%, #2a3828 60%, #3a4a3c 100%)', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 72, color: 'rgba(255,255,255,0.1)', letterSpacing: '-0.04em' }}>MR</span>
        </div>
        {editing && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="1.5" />
                <path d="M14 9v10M9 14h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.06em' }}>Change photo</span>
            </div>
          </div>
        )}
      </div>

      {/* Name + rating + edit */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            {editing ? (
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', border: 'none', borderBottom: '2px solid var(--hydrant)', background: 'transparent', outline: 'none', letterSpacing: '-0.04em' }}
              />
            ) : (
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.04em' }}>{name}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ color: 'var(--hydrant)', fontSize: 15, letterSpacing: 1 }}>{'★'.repeat(5)}</span>
            <button
              onClick={() => editing ? saveEdits() : setEditing(true)}
              style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 99, padding: '5px 12px', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              {editing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>

        {/* Sub-info */}
        <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', marginBottom: 14 }}>
          29 · He/Him · Bed-Stuy, Brooklyn
        </div>

        {/* Online now */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--hydrant)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Online now</span>
        </div>
      </div>

      {/* Profile completion checklist */}
      <div style={{ margin: '0 20px 20px', padding: '16px', background: 'var(--card)', borderRadius: 14, border: '2px solid var(--ink)' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--hydrant)', marginBottom: 12 }}>Finish setting up</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Add a photo to get booked faster', href: '#', done: false },
            { label: 'Add credentials to unlock higher-paying shifts', href: '/v3/credentials', done: false },
            { label: 'Set availability so we only show shifts that fit', href: '/v3/availability', done: false },
            { label: 'W-9 required once you earn $600', href: '/v3/w9', done: false },
          ].map((item, i) => (
            <Link key={i} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '2px solid var(--line-2)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }} />
              <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', lineHeight: 1.4 }}>{item.label}</span>
              <span style={{ marginLeft: 'auto', color: 'var(--mute)', fontSize: 14, flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map(s => (
            <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', border: '2px solid var(--ink)', borderRadius: 99, padding: '6px 14px', background: 'var(--paper)' }}>
              {s.label}
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', fontWeight: 400 }}>{s.count}×</span>
            </span>
          ))}
          {editing && (
            <span style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--mute)', border: '2px dashed var(--line-2)', borderRadius: 99, padding: '6px 14px', cursor: 'pointer' }}>+ Add</span>
          )}
        </div>
      </div>

      {/* Bio */}
      <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
        {editing ? (
          <textarea
            value={bioInput}
            onChange={e => setBioInput(e.target.value)}
            rows={4}
            style={{ width: '100%', fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', border: '2px solid var(--hydrant)', borderRadius: 14, padding: '10px 12px', background: 'var(--card)', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
          />
        ) : (
          <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>{bio}</p>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--line)' }}>
        {[
          { label: 'Shifts', value: '12' },
          { label: 'Rating', value: '4.9★' },
          { label: 'Earned', value: '$1.8k' },
          { label: 'Rebook', value: '78%' },
        ].map((stat, i) => (
          <div key={i} style={{ padding: '16px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{stat.value}</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>Reviews from employers</div>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--hydrant)', fontWeight: 600 }}>4.9 avg</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {REVIEWS.map((review, i) => (
            <div key={i} style={{ padding: '14px 16px', background: 'var(--card)', borderRadius: 12, border: '2px solid var(--ink)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: review.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 11, color: '#fff' }}>{review.business.slice(0, 2).toUpperCase()}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{review.business}</div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>{review.date}</div>
                </div>
                <div style={{ color: 'var(--hydrant)', fontSize: 13, fontWeight: 700 }}>{'★'.repeat(review.rating)}</div>
              </div>
              <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', lineHeight: 1.6, margin: 0 }}>&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <Link href="/worker/settings" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', marginTop: 16, borderTop: '1px solid var(--line)', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Settings & account</span>
          <span style={{ color: 'var(--mute)', fontSize: 18 }}>→</span>
        </Link>
        <Link href="/worker/report" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid var(--line)', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>File a report</span>
          <span style={{ color: 'var(--mute)', fontSize: 18 }}>→</span>
        </Link>
      </div>

      </>}

      <BottomNav active="menu" />
    </div>
  );
}
