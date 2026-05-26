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

/* ── Color Guide data ──────────────────────────────────────────────────────── */

const PALETTE = [
  { name: 'green',  hex: '#72c15f', soft: '#E2F1DD', note: 'active · confirmed · paid · bar family' },
  { name: 'yellow', hex: '#f7dd6d', soft: '#FCEFB7', note: 'pending · applied · waiting' },
  { name: 'pink',   hex: '#F2B6E0', soft: '#FBE4F3', note: 'human · hospitality · floor family' },
  { name: 'lilac',  hex: '#9A7CE0', soft: '#E8E0FA', note: 'discovery · browse · event family' },
  { name: 'red',    hex: '#E5391F', soft: '#FAD6CE', note: 'urgent · priority · kitchen family' },
  { name: 'steel',  hex: '#c7d8f2', soft: '#EAF1FA', note: 'counter family · uniformed' },
  { name: 'grey',   hex: '#E0E0E0', soft: '#F0F0F0', note: 'dormant · past · disabled' },
  { name: 'ink',    hex: '#0D0E12', soft: '#F4F5F7', note: 'primary text · dark surfaces' },
];

const FAMILIES: Array<{
  family: 'bar'|'kitchen'|'floor'|'event'|'counter';
  role: string; venue: string; time: string; loc: string;
  pay: string; rate: string; brief: string;
  bg: string; note: string;
}> = [
  { family: 'bar',     role: 'Barista',    venue: "Padmore's Coffee",  time: '11A–4P', loc: 'Bed-Stuy, BK',      pay: '$140', rate: '$28/HR', brief: 'Barista to cover private event. Wear all black, no logos. 2–3 years experience preferred.',   bg: '#E2F1DD', note: 'Bartender · Barback · Barista. Tip-heavy work — the family tint echoes money.' },
  { family: 'kitchen', role: 'Prep Cook',  venue: 'Lilia',             time: '3P–10P', loc: 'Williamsburg, BK',  pay: '$168', rate: '$24/HR', brief: 'Prep cook for Saturday dinner rush. Fresh pasta station, knife skills required. Whites provided.', bg: '#FAD6CE', note: 'Cook · Prep · Dish. High-heat back of house — echoes urgency, but soft because it\'s the family.' },
  { family: 'floor',   role: 'Server',     venue: 'The Wren',          time: '4P–11P', loc: 'Bed-Stuy, BK',      pay: '$102', rate: '$17/H BASE PAY', brief: 'Help with dinner service. High traffic fine-dining in the village. 2 years exp preferred.', bg: '#F2B6E0', note: 'Server · Host. Guest-facing hospitality — echoes the human-moment color.' },
  { family: 'event',   role: 'Catering',   venue: 'MetroCater',        time: '6P–1A',  loc: 'Industry City, BK', pay: '$210', rate: '$30/HR', brief: 'Wedding reception, 180 guests. Buffet + plated dessert service. Black tie. Meal provided.',     bg: '#E8E0FA', note: 'Catering · Pop-up. Ad-hoc, scouted work — echoes the discovery color.' },
  { family: 'counter', role: 'Cashier',    venue: 'Whole Foods Bowery', time: '9A–5P', loc: 'Noho, MN',          pay: '$176', rate: '$22/HR', brief: 'Register coverage for weekend rush. Uniform provided. Standing role. Prior POS experience helpful.', bg: '#c7d8f2', note: 'Cashier · Security. The uniformed family — no state echo, its own pastel.' },
];

const STATES: Array<{
  state: 'pending'|'confirmed'|'urgent'|'past';
  role: string; venue: string; time: string; loc: string;
  pay: string; rate: string; brief: string|string[];
  statusLabel?: string; note: string;
}> = [
  { state: 'pending',   role: 'Server',  venue: 'Le Crocodile', time: '7P–1A',  loc: 'Greenpoint, BK',   pay: '$168', rate: '$24/HR + tips', brief: ['Applied 14 min ago.', 'Awaiting confirmation.'], statusLabel: 'Pending', note: 'yellow bg · awaiting employer response' },
  { state: 'confirmed', role: 'Barista', venue: "Padmore's",    time: '11A–4P', loc: 'Bed-Stuy, BK',     pay: '$140', rate: '$28/HR',         brief: 'Confirmed and on your schedule.',                                   note: 'green bg · on the books' },
  { state: 'urgent',    role: 'Barback', venue: 'Bar Blondeau', time: '6P–12A', loc: 'Williamsburg, BK', pay: '$120', rate: '$24/HR',         brief: ['Last-minute call-out.', 'Starts in 1h 24m.'],                     note: 'ink bg · red pill · priority shift' },
  { state: 'past',      role: 'Server',  venue: 'The Wren',     time: '11A–3P', loc: 'Bed-Stuy, BK',     pay: '$96',  rate: '$24/HR',         brief: 'Completed Sat 10 May.',                                            note: 'grey bg · muted text · archived' },
];

const ROLE_CHIPS: Array<{ label: string; bg: string; color: string; border: string }> = [
  { label: 'All',       bg: '#0D0E12', color: '#fff',    border: '#0D0E12' },
  { label: 'Barista',   bg: '#E2F1DD', color: '#0D0E12', border: '#E2F1DD' },
  { label: 'Bartender', bg: '#E2F1DD', color: '#0D0E12', border: '#E2F1DD' },
  { label: 'Server',    bg: '#F2B6E0', color: '#0D0E12', border: '#F2B6E0' },
  { label: 'Barback',   bg: '#E2F1DD', color: '#0D0E12', border: '#E2F1DD' },
  { label: 'Host',      bg: '#F2B6E0', color: '#0D0E12', border: '#F2B6E0' },
  { label: 'Cook',      bg: '#FAD6CE', color: '#0D0E12', border: '#FAD6CE' },
];

const NOTIF_BADGES: Array<{ type: string; bg: string; color: string; icon: string; note: string }> = [
  { type: 'match',    bg: '#c7d8f2', color: '#1e3d7a', icon: '⚡', note: 'New shifts matching your skills' },
  { type: 'payment',  bg: '#72c15f', color: '#0D0E12', icon: '$',  note: 'Payout processed to wallet' },
  { type: 'reminder', bg: '#f7dd6d', color: '#0D0E12', icon: '!',  note: 'Shift starting soon' },
  { type: 'review',   bg: '#9A7CE0', color: '#fff',    icon: '★',  note: 'New review received' },
  { type: 'rebook',   bg: '#F2B6E0', color: '#0D0E12', icon: '↩',  note: 'Employer wants to rebook you' },
];

const STAT_TILES: Array<{ label: string; value: string; bg: string; border: string }> = [
  { label: 'earnings', value: '$408.',    bg: '#E2F1DD', border: '#72c15f' },
  { label: 'shifts',   value: '3 booked', bg: '#EAF1FA', border: '#c7d8f2' },
  { label: 'rating',   value: '4.9★',    bg: '#E8E0FA', border: '#9A7CE0' },
];

/* ── Shared components ─────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 60 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(13,14,18,0.35)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        {title}
        <div style={{ flex: 1, height: 1, background: 'rgba(13,14,18,0.10)' }} />
      </div>
      {children}
    </div>
  );
}

function GuideLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.5)', marginTop: 10, letterSpacing: '0.02em', lineHeight: 1.5 }}>
      {children}
    </div>
  );
}

/* ── Colors tab ────────────────────────────────────────────────────────────── */

function ColorGuide() {
  return (
    <div style={{ padding: '32px 32px 80px' }}>

      {/* PALETTE */}
      <Section title="Colour palette">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {PALETTE.map(c => (
            <div key={c.name} style={{ width: 168 }}>
              <div style={{ display: 'flex', height: 52, borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
                <div style={{ flex: 1, background: c.hex }} />
                <div style={{ flex: 1, background: c.soft }} />
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(13,14,18,0.10)', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '10px 12px' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#0D0E12', letterSpacing: '0.04em' }}>--{c.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(13,14,18,0.45)', marginTop: 2 }}>{c.hex}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(13,14,18,0.4)', marginTop: 4, lineHeight: 1.4 }}>{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SHIFT CARDS — FAMILY */}
      <Section title="Shift cards — family">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {FAMILIES.map(f => (
            <div key={f.family}>
              <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 14, color: '#0D0E12', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ textTransform: 'capitalize' }}>{f.family}</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 400, fontSize: 11, color: 'rgba(13,14,18,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{f.bg}</span>
              </div>
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
              <GuideLabel>{f.note}</GuideLabel>
            </div>
          ))}
        </div>
      </Section>

      {/* SHIFT CARDS — STATE */}
      <Section title="Shift cards — state">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {STATES.map(s => (
            <div key={s.state}>
              <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 14, color: '#0D0E12', marginBottom: 4, textTransform: 'capitalize' }}>{s.state}</div>
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
              <GuideLabel>{s.note}</GuideLabel>
            </div>
          ))}
        </div>
      </Section>

      {/* COMPACT CARDS */}
      <Section title="Compact cards">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          <div>
            <CompactCard icon="W" title="Wade @ Padmore's" sub="Asked you to cover tonight" cta={{ label: 'Accept', href: '/worker/confirm' }} />
            <GuideLabel>.scard.compact — accept CTA (green)</GuideLabel>
          </div>
          <div>
            <CompactCard icon="T" title="Tomás @ The Wren" sub="Wants to rebook — Wed 28 May" cta={{ label: 'View', href: '/worker/job-detail' }} ghost />
            <GuideLabel>.scard.compact — ghost CTA (ink outline)</GuideLabel>
          </div>
        </div>
      </Section>

      {/* FILTER CHIPS */}
      <Section title="Filter / category chips">
        <div style={{ background: '#fff', border: '1px solid rgba(13,14,18,0.08)', borderRadius: 14, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Active — role family colour</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ROLE_CHIPS.map(chip => (
                <button key={chip.label} style={{
                  padding: '7px 16px', borderRadius: 99,
                  border: `1.5px solid ${chip.border}`,
                  background: chip.bg, color: chip.color,
                  fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.04em', cursor: 'default',
                }}>
                  {chip.label}
                </button>
              ))}
              <button style={{
                padding: '7px 16px', borderRadius: 99,
                border: '1.5px solid #72c15f', background: '#E2F1DD', color: '#0D0E12',
                fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.04em', cursor: 'default',
              }}>
                $25+/hr
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Inactive — default state</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[...ROLE_CHIPS.map(c => c.label), '$25+/hr'].map(label => (
                <button key={label} style={{
                  padding: '7px 16px', borderRadius: 99,
                  border: '1.5px solid rgba(13,14,18,0.15)',
                  background: 'transparent', color: '#0D0E12',
                  fontFamily: 'monospace', fontSize: 12, fontWeight: 600,
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
        <div style={{ background: '#fff', border: '1px solid rgba(13,14,18,0.08)', borderRadius: 14, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 28 }}>

          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Full-width primary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 390 }}>
              {[
                { label: 'Claim this shift →',  bg: '#0D0E12',  color: '#fff',    border: '#0D0E12' },
                { label: 'Confirm & apply →',   bg: '#72c15f',  color: '#0D0E12', border: '#72c15f' },
                { label: 'Cash out today.',      bg: '#0D0E12',  color: '#fff',    border: '#0D0E12' },
                { label: 'Browse shifts →',      bg: '#E8E0FA',  color: '#9A7CE0', border: '#9A7CE0' },
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

          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Pill / inline</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'Day-of details →', bg: 'rgba(0,0,0,0.07)',   color: '#0D0E12', border: 'rgba(0,0,0,0.10)' },
                { label: 'Accept',           bg: '#72c15f',             color: '#0D0E12', border: '#72c15f' },
                { label: 'View listing →',   bg: '#0D0E12',             color: '#fff',    border: '#0D0E12' },
                { label: 'Read all',         bg: 'transparent',         color: 'rgba(13,14,18,0.55)', border: 'transparent' },
              ].map(b => (
                <button key={b.label} style={{
                  padding: '9px 20px', borderRadius: 99,
                  background: b.bg, color: b.color,
                  border: `1.5px solid ${b.border}`,
                  fontFamily: 'monospace', fontWeight: 600, fontSize: 12,
                  cursor: 'default',
                }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Destructive / alert</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'Cancel shift',    bg: '#FAD6CE',    color: '#E5391F', border: '#E5391F' },
                { label: 'Report issue',    bg: 'transparent',color: '#E5391F', border: '#E5391F' },
                { label: 'No show ✕',      bg: '#E5391F',    color: '#fff',    border: '#E5391F' },
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

          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>On dark surface</div>
            <div style={{ background: '#0D0E12', borderRadius: 12, padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'Add bank',    bg: 'rgba(255,255,255,0.10)', color: '#fff',    border: 'rgba(255,255,255,0.2)' },
                { label: 'Cash out →', bg: 'rgba(255,255,255,0.10)', color: '#fff',    border: 'rgba(255,255,255,0.2)' },
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
        <div style={{ background: '#fff', border: '1px solid rgba(13,14,18,0.08)', borderRadius: 14, padding: '24px 20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {NOTIF_BADGES.map(b => (
              <div key={b.type} style={{ display: 'flex', alignItems: 'center', gap: 14, width: 300 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'sans-serif', fontWeight: 700, fontSize: 20, color: b.color,
                }}>
                  {b.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 14, color: '#0D0E12', textTransform: 'capitalize' }}>{b.type}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(13,14,18,0.5)', marginTop: 2, lineHeight: 1.4 }}>{b.note}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(13,14,18,0.3)', marginTop: 3 }}>bg: {b.bg} · icon: {b.color}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STAT TILES */}
      <Section title="Stat tiles">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {STAT_TILES.map(t => (
            <div key={t.label}>
              <div style={{
                width: 130, padding: '14px 12px',
                background: t.bg, border: `2px solid ${t.border}`,
                borderRadius: 12, textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, color: '#0D0E12', letterSpacing: '-0.04em', lineHeight: 1 }}>{t.value}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(13,14,18,0.5)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.label}</div>
              </div>
              <GuideLabel>bg: {t.bg}<br />border: {t.border}</GuideLabel>
            </div>
          ))}
        </div>
      </Section>

      {/* STATUS INDICATORS */}
      <Section title="Status indicators">
        <div style={{ background: '#fff', border: '1px solid rgba(13,14,18,0.08)', borderRadius: 14, padding: '24px 20px', display: 'flex', flexWrap: 'wrap', gap: 40 }}>
          {[
            { label: 'Unread',    dot: '#72c15f', size: 8 },
            { label: 'Urgent',    dot: '#E5391F', size: 7 },
            { label: 'Online',    dot: '#16A34A', size: 10 },
            { label: 'Pending',   dot: '#f7dd6d', size: 8, border: '#0D0E12' },
          ].map(d => (
            <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: d.size, height: d.size, borderRadius: '50%',
                  background: d.dot,
                  border: d.border ? `1.5px solid ${d.border}` : undefined,
                  boxShadow: `0 0 0 4px ${d.dot}33`,
                }} />
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#0D0E12', textAlign: 'center' }}>{d.label}</div>
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
    <div style={{ minHeight: '100vh', background: '#F4F5F7', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#fff', borderBottom: '1px solid rgba(13,14,18,0.10)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, color: '#0D0E12', letterSpacing: '-0.04em', flexShrink: 0 }}>
          SHIFT <span style={{ color: '#72c15f' }}>gallery</span>
        </span>

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: 'rgba(13,14,18,0.07)', borderRadius: 99, padding: 3, gap: 2 }}>
          {(['screens', 'colors'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '5px 16px', borderRadius: 99,
                background: tab === t ? '#0D0E12' : 'transparent',
                color: tab === t ? '#fff' : 'rgba(13,14,18,0.45)',
                fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
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
              style={{ flex: 1, maxWidth: 280, height: 34, padding: '0 14px', background: 'rgba(13,14,18,0.05)', border: '1px solid rgba(13,14,18,0.12)', borderRadius: 99, color: '#0D0E12', fontSize: 13, outline: 'none', fontFamily: 'monospace' }}
            />
            <span style={{ fontSize: 12, color: 'rgba(13,14,18,0.4)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
              {SCREENS.flatMap(g => g.screens).length} screens
              {openCount > 0 && <span style={{ color: '#72c15f', fontWeight: 700 }}>· {openCount} open</span>}
              {doneCount > 0 && <span style={{ color: 'rgba(13,14,18,0.3)' }}>· {doneCount} done</span>}
              {allWithNotes > 0 && (
                <button
                  onClick={exportComments}
                  style={{ fontSize: 12, color: '#0D0E12', background: 'rgba(13,14,18,0.06)', border: '1px solid rgba(13,14,18,0.12)', borderRadius: 99, padding: '4px 12px', cursor: 'pointer', fontFamily: 'monospace' }}
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
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(13,14,18,0.4)', marginBottom: 16 }}>
                {group.group}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {group.screens.map(screen => {
                  const hasComment = !!comments[screen.path];
                  const done = isAddressed(screen.path);
                  const borderColor = done
                    ? 'rgba(13,14,18,0.15)'
                    : hasComment ? '#72c15f' : 'rgba(13,14,18,0.12)';

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
                          background: '#fcfcfc',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
                          if (!hasComment) (e.currentTarget as HTMLDivElement).style.borderColor = '#72c15f';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                          if (!hasComment) (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(13,14,18,0.12)';
                        }}
                      >
                        <iframe
                          src={screen.path}
                          style={{ width: PHONE_W, height: PHONE_H, border: 'none', transformOrigin: 'top left', transform: `scale(${SCALE})`, pointerEvents: 'none', background: '#fcfcfc' }}
                          scrolling="no"
                        />
                        {done && (
                          <div style={{ position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: '50%', background: 'rgba(13,14,18,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                        <div style={{ fontSize: 12, fontWeight: 600, color: done ? 'rgba(13,14,18,0.3)' : '#0D0E12' }}>{screen.label}</div>
                        <div style={{ fontSize: 10, color: 'rgba(13,14,18,0.35)', marginTop: 1 }}>{screen.path}</div>
                        {hasComment && (
                          <div style={{ fontSize: 11, color: done ? 'rgba(13,14,18,0.25)' : '#72c15f', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: done ? 'line-through' : 'none' }}>
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
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>{focused}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={focused} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#72c15f', textDecoration: 'none', fontFamily: 'monospace', padding: '6px 14px', border: '1px solid #72c15f', borderRadius: 99 }}>
                    Open →
                  </a>
                  <button
                    onClick={() => { saveDraft(); setFocused(null); }}
                    style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '6px 14px', cursor: 'pointer', fontFamily: 'monospace' }}
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
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>Notes</div>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Add feedback or edits needed..."
                autoFocus
                style={{
                  width: '100%', height: 160, padding: '12px 14px',
                  background: 'rgba(255,255,255,0.08)',
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
                  color: draft.trim() ? '#0D0E12' : 'rgba(255,255,255,0.3)',
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
                    color: isAddressed(focused) ? 'rgba(255,255,255,0.4)' : '#72c15f',
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
                  onClick={() => setDraft('')}
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
