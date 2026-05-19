'use client';

import { useState } from 'react';

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

export default function Gallery() {
  const [focused, setFocused] = useState<string | null>(null);
  const [search, setSearch] = useState('');

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
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
          {SCREENS.flatMap(g => g.screens).length} screens
        </span>
      </div>

      <div style={{ padding: '32px 24px 80px' }}>
        {filtered.map(group => (
          <div key={group.group} style={{ marginBottom: 48 }}>

            {/* Group label */}
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
              {group.group}
            </div>

            {/* Screens grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {group.screens.map(screen => (
                <div key={screen.path} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                  {/* Phone frame */}
                  <div
                    onClick={() => setFocused(screen.path)}
                    style={{
                      position: 'relative',
                      width: PHONE_W * SCALE,
                      height: PHONE_H * SCALE,
                      borderRadius: 14,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '1.5px solid rgba(255,255,255,0.1)',
                      transition: 'border-color 0.15s, transform 0.15s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#72c15f';
                      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                    }}
                  >
                    <iframe
                      src={screen.path}
                      style={{
                        width: PHONE_W,
                        height: PHONE_H,
                        border: 'none',
                        transformOrigin: 'top left',
                        transform: `scale(${SCALE})`,
                        pointerEvents: 'none',
                        background: '#fcfcfc',
                      }}
                      scrolling="no"
                    />
                  </div>

                  {/* Label */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{screen.label}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>{screen.path}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Focused lightbox */}
      {focused && (
        <div
          onClick={() => setFocused(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{focused}</span>
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={focused}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: '#72c15f', textDecoration: 'none', fontFamily: 'monospace', padding: '6px 14px', border: '1px solid #72c15f', borderRadius: 99 }}
                >
                  Open →
                </a>
                <button
                  onClick={() => setFocused(null)}
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
        </div>
      )}
    </div>
  );
}
