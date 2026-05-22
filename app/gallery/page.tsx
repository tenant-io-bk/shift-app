'use client';

import { useState, useEffect } from 'react';

const SCREENS = [
  {
    group: 'Entry',
    screens: [
      { label: 'Home', path: '/' },
    ],
  },
  {
    group: 'Worker — Onboarding',
    screens: [
      { label: 'Splash',        path: '/worker/splash' },
      { label: 'Slides',        path: '/worker/slides' },
      { label: 'Role',          path: '/worker/role' },
      { label: 'Phone Verify',  path: '/v3/phone-verify' },
      { label: 'SMS Verify',    path: '/v3/sms-verify' },
      { label: 'Onboarding',    path: '/worker/onboarding' },
      { label: 'Availability',  path: '/v3/availability' },
      { label: 'Neighborhood',  path: '/v3/neighborhood' },
      { label: 'Credentials',   path: '/v3/credentials' },
      { label: 'Profile Setup', path: '/v3/profile-setup' },
      { label: 'Payout Setup',  path: '/v3/payout-setup' },
      { label: 'Card Input',    path: '/v3/card-input' },
      { label: 'W9',            path: '/v3/w9' },
    ],
  },
  {
    group: 'Worker — Core',
    screens: [
      { label: 'Map',           path: '/worker/map' },
      { label: 'Job Detail',    path: '/worker/job-detail' },
      { label: 'Confirm',       path: '/worker/confirm' },
      { label: 'Day Of',        path: '/worker/day-of' },
      { label: 'On Shift',      path: '/worker/on-shift' },
      { label: 'Paid Out',      path: '/worker/paid-out' },
    ],
  },
  {
    group: 'Worker — Profile',
    screens: [
      { label: 'Profile',        path: '/worker/profile' },
      { label: 'Wallet',         path: '/worker/wallet' },
      { label: 'Settings',       path: '/worker/settings' },
      { label: 'Notifications',  path: '/worker/notifications' },
      { label: 'Books',          path: '/v3/books' },
    ],
  },
  {
    group: 'Worker — Flows',
    screens: [
      { label: 'Mutual Review',  path: '/v3/mutual-review' },
      { label: 'Dispute',        path: '/v3/dispute' },
      { label: 'No Show',        path: '/v3/no-show' },
      { label: 'Cancel Flow',    path: '/v3/cancel-flow' },
    ],
  },
  {
    group: 'Employer — Onboarding',
    screens: [
      { label: 'Create Account', path: '/employer/create-account' },
      { label: 'Find Business',  path: '/employer/onboarding' },
      { label: 'Verify',         path: '/employer/verify' },
      { label: 'Biz Profile',    path: '/employer/business-profile' },
    ],
  },
  {
    group: 'Employer — Core',
    screens: [
      { label: 'Dashboard',      path: '/employer/dashboard' },
      { label: 'Post Shift',     path: '/employer/post-shift' },
      { label: 'Posting',        path: '/employer/posting' },
      { label: 'Shift Posted',   path: '/employer/shift-posted' },
      { label: 'Roster',         path: '/employer/roster' },
      { label: 'Live Map',       path: '/employer/live-map' },
    ],
  },
  {
    group: 'Employer — Profile',
    screens: [
      { label: 'Account',        path: '/employer/account' },
      { label: 'Billing',        path: '/employer/billing' },
      { label: 'Rating',         path: '/employer/rating' },
    ],
  },
];

const SCALE = 0.28;
const PHONE_W = 390;
const PHONE_H = 844;
const STORAGE_KEY = 'shift-gallery-comments';

function loadComments(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

function saveComments(c: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

export default function Gallery() {
  const [focused, setFocused] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [comments, setComments] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState('');

  useEffect(() => { setComments(loadComments()); }, []);

  function openScreen(path: string) {
    setFocused(path);
    setDraft(loadComments()[path] || '');
  }

  function saveDraft() {
    const next = { ...comments };
    if (draft.trim()) next[focused!] = draft.trim();
    else delete next[focused!];
    setComments(next);
    saveComments(next);
  }

  const totalComments = Object.keys(comments).length;

  function exportComments() {
    const lines = SCREENS.flatMap(g =>
      g.screens
        .filter(s => comments[s.path])
        .map(s => `[${s.label}] ${s.path}\n${comments[s.path]}`)
    );
    if (!lines.length) return;
    navigator.clipboard.writeText(lines.join('\n\n'));
  }

  const query = search.toLowerCase();
  const filtered = SCREENS.map(g => ({
    ...g,
    screens: g.screens.filter(s =>
      s.label.toLowerCase().includes(query) || s.path.toLowerCase().includes(query)
    ),
  })).filter(g => g.screens.length > 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0E12', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0D0E12', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.04em', flexShrink: 0 }}>SHIFT <span style={{ color: '#72c15f' }}>gallery</span></span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search screens..."
          style={{ flex: 1, maxWidth: 320, height: 36, padding: '0 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'monospace' }}
        />
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          {SCREENS.flatMap(g => g.screens).length} screens
          {totalComments > 0 && (
            <span style={{ color: '#72c15f' }}>· {totalComments} comment{totalComments !== 1 ? 's' : ''}</span>
          )}
          {totalComments > 0 && (
            <button
              onClick={exportComments}
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '4px 12px', cursor: 'pointer', fontFamily: 'monospace' }}
            >
              Copy all notes
            </button>
          )}
        </span>
      </div>

      <div style={{ padding: '32px 24px 80px' }}>
        {filtered.map(group => (
          <div key={group.group} style={{ marginBottom: 48 }}>

            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
              {group.group}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {group.screens.map(screen => {
                const hasComment = !!comments[screen.path];
                return (
                  <div key={screen.path} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                    {/* Phone frame */}
                    <div
                      onClick={() => openScreen(screen.path)}
                      style={{
                        position: 'relative',
                        width: PHONE_W * SCALE,
                        height: PHONE_H * SCALE,
                        borderRadius: 14,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: hasComment ? '1.5px solid #72c15f' : '1.5px solid rgba(255,255,255,0.1)',
                        transition: 'border-color 0.15s, transform 0.15s',
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
                        if (!hasComment) (e.currentTarget as HTMLDivElement).style.borderColor = '#72c15f';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                        if (!hasComment) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      <iframe
                        src={screen.path}
                        style={{ width: PHONE_W, height: PHONE_H, border: 'none', transformOrigin: 'top left', transform: `scale(${SCALE})`, pointerEvents: 'none', background: '#fcfcfc' }}
                        scrolling="no"
                      />
                      {/* Comment indicator */}
                      {hasComment && (
                        <div style={{ position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: '50%', background: '#72c15f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1 1h7v5H5L3 8V6H1V1Z" fill="white" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <div style={{ textAlign: 'center', maxWidth: PHONE_W * SCALE }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{screen.label}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>{screen.path}</div>
                      {hasComment && (
                        <div style={{ fontSize: 10, color: 'rgba(114,193,95,0.7)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {comments[screen.path]}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {focused && (
        <div
          onClick={() => { saveDraft(); setFocused(null); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Phone + top bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{focused}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={focused} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#72c15f', textDecoration: 'none', fontFamily: 'monospace', padding: '6px 14px', border: '1px solid #72c15f', borderRadius: 99 }}>
                    Open →
                  </a>
                  <button
                    onClick={() => { saveDraft(); setFocused(null); }}
                    style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '6px 14px', cursor: 'pointer', fontFamily: 'monospace' }}
                  >
                    ✕ close
                  </button>
                </div>
              </div>
              <div style={{ width: PHONE_W, height: PHONE_H, borderRadius: 28, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
                <iframe src={focused} style={{ width: '100%', height: '100%', border: 'none' }} />
              </div>
            </div>

            {/* Comment panel */}
            <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Notes</div>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Add feedback or edits needed..."
                autoFocus
                style={{
                  width: '100%', height: 180, padding: '12px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, color: '#fff', fontSize: 13,
                  fontFamily: 'monospace', resize: 'none', outline: 'none',
                  lineHeight: 1.6, boxSizing: 'border-box',
                }}
              />
              <button
                onClick={saveDraft}
                style={{
                  width: '100%', padding: '10px', borderRadius: 99,
                  background: draft.trim() ? '#72c15f' : 'rgba(255,255,255,0.08)',
                  color: draft.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
                  border: 'none', fontFamily: 'monospace', fontWeight: 700,
                  fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {draft.trim() ? 'Save note' : 'Clear note'}
              </button>
              {comments[focused] && (
                <button
                  onClick={() => { setDraft(''); }}
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', textAlign: 'left' }}
                >
                  × clear note
                </button>
              )}
              <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.2)', lineHeight: 1.5 }}>
                Notes are saved in your browser. Screens with notes show a green border and comment icon.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
