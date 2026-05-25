'use client';

import { useState, useEffect } from 'react';
import ShiftCard, { CompactCard } from '@/app/components/ShiftCard';

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
const COMMENTS_KEY  = 'shift-gallery-comments';
const ADDRESSED_KEY = 'shift-gallery-addressed';

function loadComments(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}'); } catch { return {}; }
}
function saveComments(c: Record<string, string>) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(c));
}

function loadAddressed(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(ADDRESSED_KEY) || '[]')); } catch { return new Set(); }
}
function saveAddressed(a: Set<string>) {
  localStorage.setItem(ADDRESSED_KEY, JSON.stringify([...a]));
}

/* ── Color Guide ───────────────────────────────────────────────────────────── */

const PALETTE = [
  { name: 'green',  label: 'green',  hex: '#72c15f', soft: '#E2F1DD', note: 'active · confirmed · paid' },
  { name: 'yellow', label: 'yellow', hex: '#f7dd6d', soft: '#FCEFB7', note: 'pending · applied · waiting' },
  { name: 'pink',   label: 'pink',   hex: '#F2B6E0', soft: '#FBE4F3', note: 'human · hospitality · social' },
  { name: 'lilac',  label: 'lilac',  hex: '#9A7CE0', soft: '#E8E0FA', note: 'discovery · browse · onboarding' },
  { name: 'red',    label: 'red',    hex: '#E5391F', soft: '#FAD6CE', note: 'urgent · priority · countdown' },
  { name: 'steel',  label: 'steel',  hex: '#c7d8f2', soft: '#EAF1FA', note: 'bar · counter · uniformed' },
  { name: 'grey',   label: 'grey',   hex: '#E0E0E0', soft: '#F0F0F0', note: 'dormant · past · disabled' },
  { name: 'ink',    label: 'ink',    hex: '#0D0E12', soft: '#F4F5F7', note: 'primary text · dark surfaces' },
];

const FAMILIES: Array<{ family: 'bar'|'kitchen'|'floor'|'event'|'counter'; role: string; venue: string; time: string; loc: string; pay: string; rate: string; brief: string; label: string; color: string }> = [
  { family: 'bar',     role: 'Barista',   venue: "Padmore's Coffee",    time: '11A–4P',  loc: 'Bed-Stuy, BK',      pay: '$140', rate: '$28/HR', brief: 'Coffee bar, lunch rush. Latte art a plus.',        label: 'bar',     color: '#c7d8f2' },
  { family: 'kitchen', role: 'Prep Cook', venue: 'Sunday in Brooklyn',  time: '8A–2P',   loc: 'Williamsburg, BK',  pay: '$105', rate: '$21/HR', brief: 'Brunch prep, station setup. Starts early.',        label: 'kitchen', color: '#f7dd6d' },
  { family: 'floor',   role: 'Server',    venue: 'The Wren',            time: '6P–11P',  loc: 'Williamsburg, BK',  pay: '$130', rate: '$26/HR', brief: 'Upscale bistro, full dinner service.',             label: 'floor',   color: '#F2B6E0' },
  { family: 'event',   role: 'Event Staff',venue: 'Brooklyn Mirage',    time: '8P–2A',   loc: 'Bushwick, BK',      pay: '$160', rate: '$25/HR', brief: 'Outdoor concert venue. High energy.',              label: 'event',   color: '#E8E0FA' },
  { family: 'counter', role: 'Cashier',   venue: 'Everyday Atelier',    time: '10A–6P',  loc: 'Crown Heights, BK', pay: '$80',  rate: '$20/HR', brief: 'Boutique retail. Steady weekend traffic.',         label: 'counter', color: '#E0E0E0' },
];

const STATES: Array<{ state: 'pending'|'confirmed'|'urgent'|'past'; role: string; venue: string; time: string; loc: string; pay: string; rate: string; brief: string|string[]; statusLabel?: string; label: string; note: string }> = [
  { state: 'pending',   role: 'Server',   venue: 'Le Crocodile',  time: '7P–1A',  loc: 'Greenpoint, BK',    pay: '$168', rate: '$24/HR + tips', brief: ['Applied 14 min ago.', 'Awaiting confirmation.'], statusLabel: 'Pending',   label: 'pending',   note: 'yellow bg · ink pill' },
  { state: 'confirmed', role: 'Barista',  venue: "Padmore's",     time: '11A–4P', loc: 'Bed-Stuy, BK',      pay: '$140', rate: '$28/HR',         brief: 'Confirmed and on your schedule.',                                   label: 'confirmed', note: 'green bg' },
  { state: 'urgent',    role: 'Barback',  venue: 'Bar Blondeau',  time: '6P–12A', loc: 'Williamsburg, BK',  pay: '$120', rate: '$24/HR',         brief: ['Last-minute call-out.', 'Starts in 1h 24m.'],                     label: 'urgent',    note: 'ink bg · red pill' },
  { state: 'past',      role: 'Server',   venue: 'The Wren',      time: '11A–3P', loc: 'Bed-Stuy, BK',      pay: '$96',  rate: '$24/HR',         brief: 'Completed Sat 10 May.',                                            label: 'past',      note: 'grey bg · muted' },
];

const ROLE_CHIPS: Array<{ label: string; bg: string; color: string; border: string }> = [
  { label: 'All',       bg: '#0D0E12',   color: '#fff',     border: '#0D0E12' },
  { label: 'Barista',   bg: '#c7d8f2',   color: '#0D0E12',  border: '#c7d8f2' },
  { label: 'Bartender', bg: '#c7d8f2',   color: '#0D0E12',  border: '#c7d8f2' },
  { label: 'Server',    bg: '#F2B6E0',   color: '#0D0E12',  border: '#F2B6E0' },
  { label: 'Barback',   bg: '#c7d8f2',   color: '#0D0E12',  border: '#c7d8f2' },
  { label: 'Host',      bg: '#F2B6E0',   color: '#0D0E12',  border: '#F2B6E0' },
  { label: 'Cook',      bg: '#f7dd6d',   color: '#0D0E12',  border: '#f7dd6d' },
];

const NOTIF_BADGES: Array<{ type: string; bg: string; color: string; icon: string; note: string }> = [
  { type: 'match',    bg: '#c7d8f2', color: '#1e3d7a', icon: '⚡', note: 'New shifts matching skills' },
  { type: 'payment',  bg: '#72c15f', color: '#0D0E12', icon: '$',  note: 'Payout processed' },
  { type: 'reminder', bg: '#f7dd6d', color: '#0D0E12', icon: '!',  note: 'Shift starting soon' },
  { type: 'review',   bg: '#9A7CE0', color: '#fff',    icon: '★',  note: 'New review received' },
  { type: 'rebook',   bg: '#F2B6E0', color: '#0D0E12', icon: '↩',  note: 'Employer wants to rebook' },
];

const STAT_TILES: Array<{ label: string; value: string; bg: string; border: string }> = [
  { label: 'earnings', value: '$408.',    bg: '#E2F1DD', border: '#72c15f' },
  { label: 'shifts',   value: '3 booked', bg: '#EAF1FA', border: '#c7d8f2' },
  { label: 'rating',   value: '4.9★',    bg: '#E8E0FA', border: '#9A7CE0' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        {title}
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>
      {children}
    </div>
  );
}

function GuideLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 8, letterSpacing: '0.04em' }}>
      {children}
    </div>
  );
}

function ColorGuide() {
  return (
    <div style={{ padding: '32px 24px 80px' }}>

      {/* PALETTE */}
      <Section title="Colour palette">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {PALETTE.map(c => (
            <div key={c.name} style={{ width: 160 }}>
              <div style={{ display: 'flex', height: 48, borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
                <div style={{ flex: 1, background: c.hex }} />
                <div style={{ flex: 1, background: c.soft }} />
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '8px 10px' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.04em' }}>--{c.label}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{c.hex}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 3, lineHeight: 1.4 }}>{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SHIFT CARDS — FAMILY */}
      <Section title="Shift cards — family">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {FAMILIES.map(f => (
            <div key={f.family}>
              <ShiftCard
                family={f.family}
                role={f.role}
                venue={f.venue}
                time={f.time}
                loc={f.loc}
                pay={f.pay}
                rate={f.rate}
                brief={f.brief}
              />
              <GuideLabel>.scard.{f.family} · bg: {f.color}</GuideLabel>
            </div>
          ))}
        </div>
      </Section>

      {/* SHIFT CARDS — STATE */}
      <Section title="Shift cards — state">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {STATES.map(s => (
            <div key={s.state}>
              <ShiftCard
                state={s.state}
                role={s.role}
                venue={s.venue}
                time={s.time}
                loc={s.loc}
                pay={s.pay}
                rate={s.rate}
                brief={s.brief}
                statusLabel={s.statusLabel}
              />
              <GuideLabel>.scard.{s.label} · {s.note}</GuideLabel>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPACT CARD */}
      <Section title="Compact cards">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
          <div>
            <CompactCard icon="W" title="Wade @ Padmore's" sub="Asked you to cover tonight" cta={{ label: 'Accept', href: '/worker/confirm' }} />
            <GuideLabel>.scard.compact · accept CTA</GuideLabel>
          </div>
          <div>
            <CompactCard icon="T" title="Tomás @ The Wren" sub="Wants to rebook — Wed 28 May" cta={{ label: 'View', href: '/worker/job-detail' }} ghost />
            <GuideLabel>.scard.compact · ghost CTA</GuideLabel>
          </div>
        </div>
      </Section>

      {/* FILTER CHIPS */}
      <Section title="Filter / category chips">
        <div style={{ background: '#fcfcfc', borderRadius: 14, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Active states */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Active — each role colour</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ROLE_CHIPS.map(chip => (
                <button key={chip.label} style={{
                  padding: '6px 14px', borderRadius: 99,
                  border: `1.5px solid ${chip.border}`,
                  background: chip.bg,
                  color: chip.color,
                  fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.04em', cursor: 'default',
                }}>
                  {chip.label}
                </button>
              ))}
              <button style={{
                padding: '6px 14px', borderRadius: 99,
                border: '1.5px solid #72c15f',
                background: '#E2F1DD',
                color: '#72c15f',
                fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.04em', cursor: 'default',
              }}>
                $25+/hr
              </button>
            </div>
          </div>

          {/* Inactive state */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Inactive — default</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[...ROLE_CHIPS.map(c => c.label), '$25+/hr'].map(label => (
                <button key={label} style={{
                  padding: '6px 14px', borderRadius: 99,
                  border: '1.5px solid rgba(13,14,18,0.15)',
                  background: 'transparent',
                  color: '#0D0E12',
                  fontFamily: 'monospace', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.04em', cursor: 'default',
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA BUTTONS */}
      <Section title="CTA buttons">
        <div style={{ background: '#fcfcfc', borderRadius: 14, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Full-width primaries */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Full-width primary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 390 }}>
              {[
                { label: 'Claim this shift →',  bg: '#0D0E12', color: '#fff',     border: '#0D0E12' },
                { label: 'Confirm & apply →',   bg: '#72c15f', color: '#0D0E12',  border: '#72c15f' },
                { label: 'Cash out today.',      bg: '#0D0E12', color: '#fff',     border: '#0D0E12' },
                { label: 'Browse shifts →',      bg: '#E8E0FA', color: '#9A7CE0',  border: '#9A7CE0' },
              ].map(b => (
                <button key={b.label} style={{
                  width: '100%', padding: '16px',
                  background: b.bg, color: b.color,
                  border: `2px solid ${b.border}`, borderRadius: 99,
                  fontFamily: 'sans-serif', fontWeight: 700, fontSize: 16,
                  letterSpacing: '-0.01em', cursor: 'default',
                }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pill / inline */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Pill / inline</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'Day-of details →',  bg: 'rgba(0,0,0,0.08)',         color: '#0D0E12', border: 'rgba(0,0,0,0.12)' },
                { label: 'Accept',            bg: '#72c15f',                   color: '#0D0E12', border: '#72c15f' },
                { label: 'View listing →',    bg: '#0D0E12',                   color: '#fff',    border: '#0D0E12' },
                { label: 'Add bank',          bg: 'rgba(255,255,255,0.10)',     color: '#fff',    border: 'rgba(255,255,255,0.2)' },
                { label: 'Cash out →',        bg: 'rgba(255,255,255,0.10)',     color: '#fff',    border: 'rgba(255,255,255,0.2)' },
                { label: 'Report an issue',   bg: 'transparent',               color: 'rgba(13,14,18,0.55)', border: 'transparent', underline: true },
              ].map(b => (
                <button key={b.label} style={{
                  padding: '9px 20px', borderRadius: 99,
                  background: b.bg, color: b.color,
                  border: `1.5px solid ${b.border}`,
                  fontFamily: 'monospace', fontWeight: 600, fontSize: 12,
                  cursor: 'default',
                  textDecoration: (b as { underline?: boolean }).underline ? 'underline' : 'none',
                }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destructive / alert */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Destructive / alert</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'Cancel shift',       bg: '#FAD6CE', color: '#E5391F', border: '#E5391F' },
                { label: 'Report an issue',    bg: 'transparent', color: '#E5391F', border: '#E5391F' },
                { label: 'No show ✕',          bg: '#E5391F', color: '#fff', border: '#E5391F' },
              ].map(b => (
                <button key={b.label} style={{
                  padding: '9px 20px', borderRadius: 99,
                  background: b.bg, color: b.color,
                  border: `1.5px solid ${b.border}`,
                  fontFamily: 'monospace', fontWeight: 700, fontSize: 12,
                  cursor: 'default',
                }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* On dark background */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>On dark surface</div>
            <div style={{ background: '#0D0E12', borderRadius: 12, padding: '16px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'Add bank',    bg: 'rgba(255,255,255,0.10)', color: '#fff', border: 'rgba(255,255,255,0.2)' },
                { label: 'Cash out →', bg: 'rgba(255,255,255,0.10)', color: '#fff', border: 'rgba(255,255,255,0.2)' },
                { label: 'Open →',     bg: 'transparent',            color: '#72c15f', border: '#72c15f' },
              ].map(b => (
                <button key={b.label} style={{
                  padding: '9px 20px', borderRadius: 99,
                  background: b.bg, color: b.color,
                  border: `1px solid ${b.border}`,
                  fontFamily: 'monospace', fontWeight: 600, fontSize: 12,
                  cursor: 'default',
                }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* NOTIFICATION BADGES */}
      <Section title="Notification badges">
        <div style={{ background: '#fcfcfc', borderRadius: 14, padding: '20px 18px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {NOTIF_BADGES.map(b => (
              <div key={b.type} style={{ display: 'flex', alignItems: 'center', gap: 12, width: 280 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 11, flexShrink: 0,
                  background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, color: b.color,
                }}>
                  {b.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontWeight: 600, fontSize: 13, color: '#0D0E12' }}>{b.type}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(13,14,18,0.45)', marginTop: 1 }}>{b.note}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.3)', marginTop: 2 }}>bg: {b.bg} · color: {b.color}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STAT TILES */}
      <Section title="Stat tiles">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {STAT_TILES.map(t => (
            <div key={t.label} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
              <div style={{
                width: 120, padding: '14px 10px',
                background: t.bg, border: `2px solid ${t.border}`,
                borderRadius: 12, textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, color: '#0D0E12', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.value}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.55)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.label}</div>
              </div>
              <GuideLabel>bg: {t.bg}<br />border: {t.border}</GuideLabel>
            </div>
          ))}
        </div>
      </Section>

      {/* UNREAD DOT */}
      <Section title="Status indicators">
        <div style={{ background: '#fcfcfc', borderRadius: 14, padding: '20px 18px', display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {[
            { label: 'Unread dot',      dot: '#72c15f',  size: 8 },
            { label: 'Urgent pulse',    dot: '#E5391F',  size: 7 },
            { label: 'Online/active',   dot: '#16A34A',  size: 10 },
            { label: 'Pending/waiting', dot: '#f7dd6d',  size: 8, border: '#0D0E12' },
          ].map(d => (
            <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: d.size, height: d.size, borderRadius: '50%',
                  background: d.dot,
                  border: d.border ? `1.5px solid ${d.border}` : undefined,
                  boxShadow: `0 0 0 3px ${d.dot}33`,
                }} />
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.45)', textAlign: 'center' }}>{d.label}</div>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}

/* ── Main Gallery ──────────────────────────────────────────────────────────── */

export default function Gallery() {
  const [tab, setTab]              = useState<'screens' | 'colors'>('screens');
  const [focused, setFocused]      = useState<string | null>(null);
  const [search, setSearch]        = useState('');
  const [comments, setComments]    = useState<Record<string, string>>({});
  const [addressed, setAddressed]  = useState<Set<string>>(new Set());
  const [draft, setDraft]          = useState('');

  useEffect(() => {
    setComments(loadComments());
    setAddressed(loadAddressed());
  }, []);

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
    if (addressed.has(focused!)) {
      const nextA = new Set(addressed);
      nextA.delete(focused!);
      setAddressed(nextA);
      saveAddressed(nextA);
    }
  }

  function toggleAddressed(path: string) {
    const next = new Set(addressed);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    setAddressed(next);
    saveAddressed(next);
  }

  function exportComments() {
    const lines = SCREENS.flatMap(g =>
      g.screens
        .filter(s => comments[s.path])
        .map(s => {
          const done = addressed.has(s.path) ? ' [ADDRESSED]' : '';
          return `[${s.label}]${done} ${s.path}\n${comments[s.path]}`;
        })
    );
    if (!lines.length) return;
    navigator.clipboard.writeText(lines.join('\n\n'));
  }

  const allWithNotes = Object.keys(comments).length;
  const openCount    = allWithNotes - [...addressed].filter(p => comments[p]).length;
  const doneCount    = [...addressed].filter(p => comments[p]).length;

  const query = search.toLowerCase();
  const filtered = SCREENS.map(g => ({
    ...g,
    screens: g.screens.filter(s =>
      s.label.toLowerCase().includes(query) || s.path.toLowerCase().includes(query)
    ),
  })).filter(g => g.screens.length > 0);

  const isAddressed = (path: string) => addressed.has(path) && !!comments[path];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0E12', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0D0E12', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.04em', flexShrink: 0 }}>
          SHIFT <span style={{ color: '#72c15f' }}>gallery</span>
        </span>

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: 99, padding: 3, gap: 2 }}>
          {(['screens', 'colors'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '5px 14px', borderRadius: 99,
                background: tab === t ? '#fff' : 'transparent',
                color: tab === t ? '#0D0E12' : 'rgba(255,255,255,0.4)',
                fontFamily: 'monospace', fontSize: 12, fontWeight: 600,
                border: 'none', cursor: 'pointer', letterSpacing: '0.04em',
                transition: 'all 0.15s',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'screens' && (
          <>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search screens..."
              style={{ flex: 1, maxWidth: 280, height: 34, padding: '0 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, color: '#fff', fontSize: 13, outline: 'none', fontFamily: 'monospace' }}
            />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
              {SCREENS.flatMap(g => g.screens).length} screens
              {openCount > 0 && <span style={{ color: '#72c15f' }}>· {openCount} open</span>}
              {doneCount > 0 && <span style={{ color: 'rgba(255,255,255,0.3)' }}>· {doneCount} done</span>}
              {allWithNotes > 0 && (
                <button
                  onClick={exportComments}
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, padding: '4px 12px', cursor: 'pointer', fontFamily: 'monospace' }}
                >
                  Copy all notes
                </button>
              )}
            </span>
          </>
        )}
      </div>

      {/* Colors tab */}
      {tab === 'colors' && <ColorGuide />}

      {/* Screens tab */}
      {tab === 'screens' && (
        <div style={{ padding: '32px 24px 80px' }}>
          {filtered.map(group => (
            <div key={group.group} style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                {group.group}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {group.screens.map(screen => {
                  const hasComment = !!comments[screen.path];
                  const done = isAddressed(screen.path);
                  const borderColor = done
                    ? 'rgba(255,255,255,0.2)'
                    : hasComment ? '#72c15f' : 'rgba(255,255,255,0.1)';

                  return (
                    <div key={screen.path} style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: done ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                      <div
                        onClick={() => openScreen(screen.path)}
                        style={{
                          position: 'relative',
                          width: PHONE_W * SCALE,
                          height: PHONE_H * SCALE,
                          borderRadius: 14,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: `1.5px solid ${borderColor}`,
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
                        {done && (
                          <div style={{ position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        {!done && hasComment && (
                          <div style={{ position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: '50%', background: '#72c15f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path d="M1 1h7v5H5L3 8V6H1V1Z" fill="white" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'center', maxWidth: PHONE_W * SCALE }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: done ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)' }}>{screen.label}</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 1 }}>{screen.path}</div>
                        {hasComment && (
                          <div style={{ fontSize: 10, color: done ? 'rgba(255,255,255,0.2)' : 'rgba(114,193,95,0.7)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: done ? 'line-through' : 'none' }}>
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
      )}

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
            <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 36 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Notes</div>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Add feedback or edits needed..."
                autoFocus
                style={{
                  width: '100%', height: 160, padding: '12px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, color: '#fff', fontSize: 13,
                  fontFamily: 'monospace', resize: 'none', outline: 'none',
                  lineHeight: 1.6, boxSizing: 'border-box',
                  textDecoration: isAddressed(focused) ? 'line-through' : 'none',
                  opacity: isAddressed(focused) ? 0.5 : 1,
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
                  onClick={() => toggleAddressed(focused)}
                  style={{
                    width: '100%', padding: '10px', borderRadius: 99,
                    background: isAddressed(focused) ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: isAddressed(focused) ? 'rgba(255,255,255,0.5)' : '#72c15f',
                    border: isAddressed(focused) ? '1px solid rgba(255,255,255,0.15)' : '1px solid #72c15f',
                    fontFamily: 'monospace', fontWeight: 700,
                    fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {isAddressed(focused) ? <>↩ Reopen</> : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#72c15f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Mark as addressed
                    </>
                  )}
                </button>
              )}
              {comments[focused] && !isAddressed(focused) && (
                <button
                  onClick={() => { setDraft(''); }}
                  style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', textAlign: 'left' }}
                >
                  × clear note
                </button>
              )}
              <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.2)', lineHeight: 1.5 }}>
                Notes are saved in your browser. Mark as addressed to track progress.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
