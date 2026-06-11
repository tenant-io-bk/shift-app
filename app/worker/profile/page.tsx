'use client';

import { useState, useRef } from 'react';
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
    avatar: 'var(--ink)',
  },
  {
    business: 'The Wren',
    date: 'Sat 10 May',
    rating: 5,
    text: "Fast, professional, great with customers. One of the best we've had through SHIFT.",
    avatar: 'var(--ink)',
  },
  {
    business: 'Bar Blondeau',
    date: 'Thu 8 May',
    rating: 4,
    text: 'Solid work, good energy. Took a bit to find the rhythm but got there.',
    avatar: 'var(--ink)',
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
    bg: 'var(--ink)',
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
    bg: 'var(--ink)',
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
    bg: 'var(--ink)',
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
    bg: 'var(--ink)',
    cardBg: '#F2E0A0',
  },
];

export default function WorkerProfile() {
  const [tab, setTab] = useState<'profile' | 'history'>('profile');
  const [historyExpanded, setHistoryExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  // Edit sheet drag-to-dismiss
  const [editDragY, setEditDragY] = useState(0);
  const [editDragMode, setEditDragMode] = useState(false);
  const editDragStart = useRef(0);
  const editIsDragging = useRef(false);
  const editVelocity = useRef(0);
  const editLastY = useRef(0);
  const editLastT = useRef(0);

  function onEditHandlePointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!editDragMode) setEditDragMode(true);
    editDragStart.current = e.clientY;
    editLastY.current = e.clientY;
    editLastT.current = e.timeStamp;
    editVelocity.current = 0;
    editIsDragging.current = true;
  }
  function onEditHandlePointerMove(e: React.PointerEvent) {
    if (!editIsDragging.current) return;
    const dy = Math.max(0, e.clientY - editDragStart.current);
    if (e.timeStamp > editLastT.current) editVelocity.current = (e.clientY - editLastY.current) / (e.timeStamp - editLastT.current);
    editLastY.current = e.clientY;
    editLastT.current = e.timeStamp;
    setEditDragY(dy);
  }
  function onEditHandlePointerUp() {
    if (!editIsDragging.current) return;
    editIsDragging.current = false;
    const projected = editDragY + editVelocity.current * 200;
    if (projected > 110 || editVelocity.current > 0.8) {
      setEditing(false);
      setEditDragY(0);
      setEditDragMode(false);
    } else {
      setEditDragY(0);
    }
  }

  // Saved values
  const [name, setName] = useState('Marcus Rivera');
  const [bio, setBio] = useState('Hospitality pro. 6 years bar + floor experience across Brooklyn and Manhattan. Fast learner, fast learner, fast when it counts.');
  const [age, setAge] = useState('29');
  const [pronouns, setPronouns] = useState('He/Him');

  // Draft values (in sheet)
  const [draftName, setDraftName] = useState(name);
  const [draftBio, setDraftBio] = useState(bio);
  const [draftAge, setDraftAge] = useState(age);
  const [draftPronouns, setDraftPronouns] = useState(pronouns);
  const [customPronouns, setCustomPronouns] = useState('');

  const PRONOUN_OPTIONS = ['He/Him', 'She/Her', 'They/Them', 'He/They', 'She/They', 'Custom'];

  function openEdit() {
    setDraftName(name);
    setDraftBio(bio);
    setDraftAge(age);
    setDraftPronouns(pronouns);
    setEditDragY(0);
    setEditDragMode(false);
    setEditing(true);
  }

  function closeEdit() {
    setEditing(false);
    setEditDragY(0);
    setEditDragMode(false);
  }

  function saveEdits() {
    setName(draftName);
    setBio(draftBio);
    setAge(draftAge);
    setPronouns(draftPronouns === 'Custom' ? customPronouns || pronouns : draftPronouns);
    closeEdit();
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <StatusBar time="10:12" />

        <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <Link href="/worker/home" style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: 20, width: 32 }}>←</Link>
          <span style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.02em' }}>@marcov</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', width: 32, display: 'flex', justifyContent: 'flex-end' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="2" fill="var(--ink)" />
              <path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M4.2 13.8l1.4-1.4M12.4 5.6l1.4-1.4" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
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
                color: tab === t ? 'var(--ink)' : 'var(--ink)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 4px 12px',
                borderBottom: tab === t ? '2px solid var(--ink)' : '2px solid transparent',
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
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              18 Shifts Worked
            </div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 12 }}>
              Since {new Date(new Date().getFullYear(), 0, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
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
                        borderRadius: '18px',
                        border: '2px solid var(--ink)',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Main row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 20px', gap: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                            {shift.shortName}
                          </div>
                          <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 5 }}>
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
                          <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase', marginTop: 4 }}>
                            {shift.rate}
                          </div>
                        </div>
                      </div>

                      {/* Expanded: rating + review link */}
                      {isExpanded && (
                        <div style={{ padding: '0 20px 20px' }}>
                          <div style={{ height: 1, background: 'rgba(13,14,18,0.1)', marginBottom: 14 }} />
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)' }}>Your rating</span>
                            <span style={{ color: 'var(--ink)', fontSize: 16 }}>{'★'.repeat(shift.rating)}{'☆'.repeat(5 - shift.rating)}</span>
                          </div>
                          <Link
                            href="/worker/job-detail"
                            onClick={e => e.stopPropagation()}
                            style={{ display: 'block', textAlign: 'center', padding: '13px', background: 'var(--ink)', color: '#fff', borderRadius: 99, fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, textDecoration: 'none', letterSpacing: '-0.02em' }}
                          >
                            View Details →
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
          <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="1.4" />
                <path d="M14 9v10M9 14h10" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.06em' }}>Change Photo</span>
            </div>
          </div>
        )}
      </div>

      {/* Name + rating + edit */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.04em' }}>{name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ color: 'var(--ink)', fontSize: 15, letterSpacing: 1 }}>{'★'.repeat(5)}</span>
            <button
              onClick={openEdit}
              style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 99, padding: '5px 12px', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              Edit
            </button>
          </div>
        </div>

        {/* Sub-info */}
        <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginBottom: 14 }}>
          {age} · {pronouns} · Bed-Stuy, Brooklyn
        </div>

        {/* Online now */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--online)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Online now</span>
        </div>
      </div>

      {/* Profile completion checklist */}
      <div style={{ margin: '0 20px 20px', padding: '16px', background: 'var(--card)', borderRadius: 14, border: '2px solid var(--ink)' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 12 }}>Finish setting up</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Add a Photo to Get Booked Faster', href: '/v3/profile-setup', done: false },
            { label: 'Add Credentials to Unlock Higher-Paying Shifts', href: '/v3/credentials', done: false },
            { label: 'Set Availability so We Only Show Shifts That Fit', href: '/v3/availability', done: false },
            { label: 'W-9 Required Once You Earn $600', href: '/v3/w9', done: false },
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
              <span style={{ marginLeft: 'auto', color: 'var(--ink)', fontSize: 14, flexShrink: 0 }}>→</span>
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
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', fontWeight: 400 }}>{s.count}×</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--line)' }}>
        <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>{bio}</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--line)' }}>
        {[
          { label: 'Shifts', value: '12' },
          { label: 'Earned', value: '$1.8k' },
          { label: 'Rebook', value: '78%' },
        ].map((stat, i) => (
          <div key={i} style={{ padding: '16px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{stat.value}</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>Reviews from employers</div>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>4.9 avg</span>
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
                  <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)' }}>{review.date}</div>
                </div>
                <div style={{ color: 'var(--ink)', fontSize: 13, fontWeight: 700 }}>{'★'.repeat(review.rating)}</div>
              </div>
              <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <Link href="/worker/settings" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', marginTop: 16, borderTop: '1px solid var(--line)', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Settings & Account</span>
          <span style={{ color: 'var(--ink)', fontSize: 18 }}>→</span>
        </Link>
        <Link href="/worker/report" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid var(--line)', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>File a Report</span>
          <span style={{ color: 'var(--ink)', fontSize: 18 }}>→</span>
        </Link>
      </div>

      </>}

      <BottomNav active="menu" />

      {/* Edit profile bottom sheet */}
      {editing && (
        <>
          <style>{`
            @keyframes sheet-up {
              from { transform: translateX(-50%) translateY(100%); }
              to   { transform: translateX(-50%) translateY(0); }
            }
          `}</style>

          {/* Backdrop */}
          <div
            onClick={() => { setEditing(false); setEditDragY(0); setEditDragMode(false); }}
            style={{ position: 'fixed', inset: 0, background: `rgba(0,0,0,${Math.max(0.4 - editDragY / 400, 0)})`, zIndex: 200 }}
          />

          {/* Sheet */}
          <div style={{
            position: 'fixed', bottom: 0, left: '50%',
            transform: `translateX(-50%) translateY(${editDragY}px)`,
            transition: editIsDragging.current ? 'none' : 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            width: '100%', maxWidth: 390,
            background: 'var(--paper)',
            borderRadius: '24px 24px 0 0',
            zIndex: 201,
            animation: editDragMode ? 'none' : 'sheet-up 0.28s cubic-bezier(0.32,0.72,0,1) both',
            maxHeight: '85vh', overflowY: 'auto',
            paddingBottom: 40,
          }}>
            {/* Handle — drag to dismiss */}
            <div
              onPointerDown={onEditHandlePointerDown}
              onPointerMove={onEditHandlePointerMove}
              onPointerUp={onEditHandlePointerUp}
              onPointerCancel={onEditHandlePointerUp}
              style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, cursor: 'grab', touchAction: 'none' }}
            >
              <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line)' }} />
            </div>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 22px 20px' }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em' }}>Edit Profile</span>
              <button onClick={closeEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: 'var(--ink)', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* Name */}
              <div>
                <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', display: 'block', marginBottom: 8 }}>Name</label>
                <input
                  value={draftName}
                  onChange={e => setDraftName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 12, fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Age */}
              <div>
                <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', display: 'block', marginBottom: 8 }}>Age</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <button
                    onClick={() => setDraftAge(a => String(Math.max(18, parseInt(a) - 1)))}
                    style={{ width: 44, height: 44, borderRadius: 12, border: '2px solid var(--ink)', background: 'var(--card)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  >−</button>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 44, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, minWidth: 60, textAlign: 'center' }}>{draftAge}</span>
                  <button
                    onClick={() => setDraftAge(a => String(Math.min(99, parseInt(a) + 1)))}
                    style={{ width: 44, height: 44, borderRadius: 12, border: '2px solid var(--ink)', background: 'var(--card)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  >+</button>
                </div>
              </div>

              {/* Pronouns */}
              <div>
                <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', display: 'block', marginBottom: 10 }}>Pronouns</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {PRONOUN_OPTIONS.map(p => (
                    <button
                      key={p}
                      onClick={() => setDraftPronouns(p)}
                      style={{
                        padding: '11px 14px', borderRadius: 99, cursor: 'pointer', textAlign: 'center',
                        fontFamily: 'var(--body)', fontWeight: 600, fontSize: 14,
                        border: '2px solid var(--ink)',
                        background: draftPronouns === p ? 'var(--ink)' : 'var(--card)',
                        color: draftPronouns === p ? '#fff' : 'var(--ink)',
                        transition: 'background 0.12s, color 0.12s',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                {draftPronouns === 'Custom' && (
                  <input
                    value={customPronouns}
                    onChange={e => setCustomPronouns(e.target.value)}
                    placeholder="e.g. Xe/Xem"
                    autoFocus
                    style={{ marginTop: 10, width: '100%', padding: '12px 14px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 12, fontFamily: 'var(--body)', fontSize: 15, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' }}
                  />
                )}
              </div>

              {/* Bio */}
              <div>
                <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', display: 'block', marginBottom: 8 }}>About You</label>
                <textarea
                  value={draftBio}
                  onChange={e => setDraftBio(e.target.value)}
                  rows={4}
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 12, fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                />
              </div>

              {/* Save */}
              <button
                onClick={saveEdits}
                style={{ width: '100%', padding: '15px', background: 'var(--ink)', border: 'none', borderRadius: 99, fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, color: '#fff', cursor: 'pointer', letterSpacing: '-0.01em' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
