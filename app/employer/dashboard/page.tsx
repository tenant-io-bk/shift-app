'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';
import StepProgress from '@/app/components/StepProgress';
import ShiftCard from '@/app/components/ShiftCard';

// ── helpers ──────────────────────────────────────────────────────────────────

function fmtDatePill(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = date.getDate();
  const sfx = [11,12,13].includes(day) ? 'th' : day%10===1 ? 'st' : day%10===2 ? 'nd' : day%10===3 ? 'rd' : 'th';
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${day}${sfx}`;
}

function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${dh}:${String(m).padStart(2,'0')}${h >= 12 ? 'P' : 'A'}`;
}

function diffHrs(s: string, e: string) {
  const [sh,sm] = s.split(':').map(Number);
  const [eh,em] = e.split(':').map(Number);
  return Math.max(0, (eh*60+em - sh*60-sm) / 60);
}

function hrsLabel(h: number) {
  if (h <= 0) return '';
  const w = Math.floor(h), m = Math.round((h-w)*60);
  return m === 0 ? `${w} HRS` : w > 0 ? `${w}H ${m}M` : `${m}M`;
}

// ── data ─────────────────────────────────────────────────────────────────────

const ROLES = ['Barista','Server','Barback','Host','Bartender','Cook','Dishwasher','Cashier'];
const STEPS = ['role','when','pay','count','brief','review','confirm'] as const;
type Step = typeof STEPS[number];

// ── AI draft data ─────────────────────────────────────────────────────────────

interface DraftData { tasks: string[]; bring: { key: string; value: string }[] }

const DRAFTS: Record<string, DraftData> = {
  Barista:   { tasks: ['Espresso and pour-over service','Bar setup and breakdown','Stock and mise en place',"Team communication — it's busy"], bring: [{ key:'Attire', value:'All black, closed-toe shoes' }, { key:'Experience', value:'2+ years espresso' }, { key:'Cert', value:'Food handler (optional)' }] },
  Bartender: { tasks: ['Full bar service and cocktail prep','Speed rail and beer setup','POS, tabs, and cash handling','End-of-night breakdown and close'], bring: [{ key:'Attire', value:'All black' }, { key:'Experience', value:'3+ years bartending' }, { key:'Cert', value:'NY liquor cert preferred' }] },
  Server:    { tasks: ['Full table service, food and beverage','POS order entry and payment','Sidework and station reset','Communicate with kitchen'], bring: [{ key:'Attire', value:'All black' }, { key:'Experience', value:'2+ years restaurant' }, { key:'Cert', value:'Food handler card' }] },
  Host:      { tasks: ['Greet and seat guests','Manage waitlist and reservations','Coordinate with floor team','Keep front-of-house organized'], bring: [{ key:'Attire', value:'Smart casual or all black' }, { key:'Experience', value:'1+ years FOH' }, { key:'Vibe', value:'Warm, confident presence' }] },
  Cook:      { tasks: ['Station prep and mise en place','Line cooking during service','Keep station clean and organized','Follow food safety protocols'], bring: [{ key:'Attire', value:'Chef whites or black apron' }, { key:'Experience', value:'2+ years line experience' }, { key:'Cert', value:'Food handler required' }] },
  Barback:   { tasks: ['Keep bar fully stocked','Ice, garnish, and glassware','Support bartenders during service','Breakdown and clean at close'], bring: [{ key:'Attire', value:'All black' }, { key:'Experience', value:'1+ year bar experience' }, { key:'Note', value:'Must be 21+' }] },
};
const DEFAULT_DRAFT: DraftData = { tasks: ['Main service duties for the shift','Setup and breakdown of your station','Team coordination and communication','Keep your area clean and organized'], bring: [{ key:'Attire', value:'All black, closed-toe shoes' }, { key:'Experience', value:'1+ year relevant experience' }, { key:'Cert', value:'Food handler preferred' }] };
function getDraft(role: string): DraftData { return DRAFTS[role] ?? DEFAULT_DRAFT; }

const ACTIVE_SHIFTS = [
  { role: 'Barista', time: '11A–4P', workers: 2, status: 'En route', eta: '6 min' },
];
const RECENT = [
  { date: 'Mon 12 May', role: 'Barista',   workers: 2, total: '$280.', rating: 4.9 },
  { date: 'Sat 10 May', role: 'Server',    workers: 3, total: '$288.', rating: 4.7 },
  { date: 'Thu 8 May',  role: 'Barback',   workers: 1, total: '$128.', rating: 5.0 },
  { date: 'Mon 5 May',  role: 'Bartender', workers: 2, total: '$312.', rating: 4.8 },
];
const SAVED_WORKERS = [
  { initials: 'MR', name: 'Marco R.', role: 'Barista', rating: '4.9', bg: 'var(--ink)' },
  { initials: 'SO', name: 'Sam O.',   role: 'Server',  rating: '4.8', bg: 'var(--ink)' },
  { initials: 'JL', name: 'Jules L.', role: 'Host',    rating: '4.9', bg: 'var(--ink)' },
];

// ── component ─────────────────────────────────────────────────────────────────

export default function EmployerDashboard() {
  const router = useRouter();

  // post-shift form
  const [isPosting, setIsPosting]   = useState(false);
  const [stepIdx,   setStepIdx]     = useState(0);
  const [animating, setAnimating]   = useState(false);
  const [dir,       setDir]         = useState<1|-1>(1);
  const [role,      setRole]        = useState('');
  const [date,      setDate]        = useState('2026-05-19');
  const [startTime, setStartTime]   = useState('11:00');
  const [endTime,   setEndTime]     = useState('16:00');
  const [rate,      setRate]        = useState(26);
  const [count,     setCount]       = useState(1);
  const [brief,     setBrief]       = useState('');
  const [isDrafting,setIsDrafting]  = useState(false);
  const [draftDots, setDraftDots]   = useState(1);
  const [draftTasks,setDraftTasks]  = useState<string[]>([]);
  const [draftBring,setDraftBring]  = useState<{key:string;value:string}[]>([]);
  const [editingTasks, setEditingTasks] = useState(false);
  const [editingBring, setEditingBring] = useState(false);

  // collapsible sections
  const [open, setOpen] = useState({ active: true, workers: true, recent: true, spend: false });

  const step  = STEPS[stepIdx] as Step;
  const total = STEPS.length - 1;
  const hrs   = diffHrs(startTime, endTime);
  const tot$  = rate * hrs * count;

  function startPosting() {
    setIsPosting(true);
    setOpen({ active: false, workers: false, recent: false, spend: false });
    setStepIdx(0); setRole(''); setBrief('');
    setEditingTasks(false); setEditingBring(false);
  }
  function cancelPosting() {
    setIsPosting(false);
    setOpen({ active: true, workers: true, recent: true, spend: false });
  }
  function go(delta: 1|-1) {
    if (animating) return;
    setDir(delta); setAnimating(true);
    setTimeout(() => { setStepIdx(i => i + delta); setAnimating(false); }, 160);
  }
  function next() {
    if (step === 'brief') {
      const d = getDraft(role);
      setDraftTasks([...d.tasks]); setDraftBring([...d.bring]);
      setIsDrafting(true); setDraftDots(1);
      const iv = setInterval(() => setDraftDots(x => x === 3 ? 1 : x + 1), 380);
      setTimeout(() => { clearInterval(iv); setIsDrafting(false); go(1); }, 2000);
      return;
    }
    if (stepIdx < STEPS.length - 1) go(1);
  }
  function back() { if (stepIdx > 0) go(-1); else cancelPosting(); }

  const canNext =
    (step === 'role' && role !== '') ||
    step === 'when' || step === 'pay' || step === 'count' ||
    step === 'brief' || step === 'review';

  const slide = {
    opacity: animating ? 0 : 1,
    transform: animating ? `translateX(${dir * 18}px)` : 'translateX(0)',
    transition: 'opacity 0.16s ease, transform 0.16s ease',
  };

  function Section({ id, label, children }: { id: keyof typeof open; label: string; children: React.ReactNode }) {
    return (
      <div style={{ padding: '10px 16px 0' }}>
        <button
          onClick={() => setOpen(o => ({ ...o, [id]: !o[id] }))}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px', marginBottom: open[id] ? 8 : 0 }}
        >
          <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>{label}</span>
          <span style={{ fontSize: 14, color: 'var(--ink)', display: 'inline-block', transform: open[id] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>↓</span>
        </button>
        {open[id] && children}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <StatusBar time="10:12" />

      {/* Header */}
      <div style={{ padding: '16px 22px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 200, fontSize: 38, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 0.88 }}>Good Morning</div>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 38, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 0.95 }}>Padmore&apos;s Coffee</div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 8 }}>172 Tompkins Ave | Bed-Stuy</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0, paddingTop: 4 }}>
          <Link href="/employer/notifications" style={{
            position: 'relative', width: 36, height: 36, borderRadius: '50%',
            background: 'var(--card)', border: '1.5px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
          }}>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M11 3a6 6 0 0 0-6 6v3l-2 3h16l-2-3V9a6 6 0 0 0-6-6Z" stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
              <path d="M9 16a2 2 0 0 0 4 0" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', top: 7, right: 7, width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', border: '1.5px solid var(--paper)' }} />
          </Link>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, color: 'var(--ink)', letterSpacing: '-0.02em' }}>78°F ☀️</div>
        </div>
      </div>

      {/* ── Post A Shift card ─────────────────────────────────────────────── */}
      <div style={{ borderRadius: '14px 14px 0 0', overflow: 'hidden', margin: '0 0 4px' }}>

        {/* Black bar / toggle */}
        <button
          onClick={isPosting ? cancelPosting : startPosting}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'var(--ink)', border: 'none', cursor: 'pointer' }}
        >
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: '#fff', letterSpacing: '-0.04em' }}>Post A Shift.</span>
          {!isPosting && <span style={{ flex: 1, paddingLeft: 12, textAlign: 'left' }}><span style={{ border: '1px solid rgba(255,255,255,0.3)', borderRadius: 99, padding: '3px 10px', fontFamily: 'var(--body)', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Workers confirmed in minutes</span></span>}
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 32, color: '#fff', lineHeight: 1 }}>{isPosting ? '×' : '+'}</span>
        </button>

        {/* Inline form */}
        {isPosting && (
          <div style={{ background: 'var(--paper)', padding: '18px 20px 20px' }}>
            <style>{`
              @keyframes pill-land-post {
                0%   { opacity: 0; transform: translateY(32px) rotate(var(--r)) scale(0.84); }
                55%  { opacity: 1; transform: translateY(-4px) rotate(calc(var(--r) * -0.1)) scale(1.04); }
                75%  { transform: translateY(2px) rotate(0deg) scale(0.98); }
                100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
              }
              .post-pill-anim {
                animation: pill-land-post 0.6s cubic-bezier(0.22,1,0.36,1) both;
                opacity: 0;
              }
              @keyframes brand-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>

            {step !== 'confirm' && (
              <div style={{ marginBottom: 18 }}>
                <StepProgress step={stepIdx + 1} total={total} />
              </div>
            )}

            {/* Step content */}
            <div style={slide}>

              {/* ROLE */}
              {step === 'role' && (
                <>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 14 }}>What role do you need?</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {ROLES.map((r, idx) => {
                      const rots = [-8, 10, -12, 7, -6, 9, -10, 6];
                      const delays = [0, 50, 100, 60, 150, 110, 200, 160];
                      return (
                        <button key={r} onClick={() => setRole(r)}
                          className="post-pill-anim"
                          style={{
                            '--r': `${rots[idx % rots.length]}deg`,
                            animationDelay: `${delays[idx % delays.length]}ms`,
                            padding: '12px 14px', borderRadius: 99, cursor: 'pointer', textAlign: 'center',
                            fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, letterSpacing: '-0.02em',
                            border: '2px solid var(--ink)',
                            background: role === r ? 'var(--ink)' : 'transparent',
                            color: role === r ? '#fff' : 'var(--ink)',
                            transition: 'background 0.15s, color 0.15s',
                          } as React.CSSProperties}
                        >{r}</button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* WHEN */}
              {step === 'when' && (
                <>
                  {/* Date pill */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <div style={{ background: 'var(--ink)', borderRadius: 99, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 7 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#fff" strokeWidth="1.2"/>
                          <path d="M4 1v2M8 1v2M1 5h10" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '-0.02em' }}>{fmtDatePill(date)}</span>
                      </div>
                      <input type="date" value={date} onChange={e => setDate(e.target.value)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                    </div>
                  </div>

                  {/* Start / End 2-col */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 38, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>Start</div>
                      <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 48, color: 'var(--ink)', letterSpacing: '-0.055em', lineHeight: 1 }}>{fmtTime(startTime)}</div>
                      <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 38, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>End</div>
                      <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 48, color: 'var(--ink)', letterSpacing: '-0.055em', lineHeight: 1 }}>{fmtTime(endTime)}</div>
                      <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                    </div>
                  </div>
                </>
              )}

              {/* PAY */}
              {step === 'pay' && (
                <>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 18 }}>How much per hour?</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <button onClick={() => setRate(r => Math.max(15, r-1))} style={{ width: 48, height: 48, borderRadius: 12, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.06em', lineHeight: 1 }}>${rate}</span>
                        <span style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--ink)' }}>/hr</span>
                      </div>
                      <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 4 }}>
                        {hrs > 0 ? `Total: $${(rate*hrs).toFixed(0)}` : 'Set times to see total'}
                      </div>
                    </div>
                    <button onClick={() => setRate(r => Math.min(75, r+1))} style={{ width: 48, height: 48, borderRadius: 12, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                  </div>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 10 }}>NYC min $16/hr · Market for {role||'this role'} ~$22–28/hr</p>
                </>
              )}

              {/* COUNT */}
              {step === 'count' && (
                <>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 20 }}>How many workers?</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                    <button onClick={() => setCount(Math.max(1, count-1))} style={{ width: 52, height: 52, borderRadius: 12, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', minWidth: 52, textAlign: 'center' }}>{count}</span>
                    <button onClick={() => setCount(count+1)} style={{ width: 52, height: 52, borderRadius: 12, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 12 }}>+1 standby auto-invited as backup.</p>
                </>
              )}

              {/* BRIEF */}
              {step === 'brief' && !isDrafting && (
                <>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 6 }}>Describe the shift in one line</div>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginBottom: 12 }}>SHIFT will write the full posting from this.</p>
                  <textarea
                    value={brief} onChange={e => setBrief(e.target.value)} rows={3} autoFocus
                    placeholder={`e.g. "${role.toLowerCase()}, lunch rush, all black, busy"`}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 12, fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                  />
                </>
              )}

              {/* DRAFTING overlay */}
              {step === 'brief' && isDrafting && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 140, gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                    background: 'conic-gradient(#72c15f 0deg, #9A7CE0 90deg, #E5391F 180deg, #f7dd6d 270deg, #72c15f 360deg)',
                    WebkitMask: 'radial-gradient(transparent 54%, black 55%)',
                    mask: 'radial-gradient(transparent 54%, black 55%)',
                    animation: 'brand-spin 1s linear infinite',
                  }} />
                  <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 17, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Writing your posting…</p>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>Task list, attire, and rate — 2 sec</p>
                </div>
              )}

              {/* REVIEW */}
              {step === 'review' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, padding: '8px 10px', background: 'var(--hydrant-soft)', borderRadius: 8 }}>
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" /></svg>
                    <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, color: 'var(--ink)' }}>SHIFT drafted this · edit anything</span>
                  </div>

                  {/* The work */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>The work</span>
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" /></svg>
                        <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hydrant)' }}>Auto-drafted</span>
                      </div>
                      <button onClick={() => setEditingTasks(t => !t)} style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--hydrant)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{editingTasks ? 'Done' : 'Edit'}</button>
                    </div>
                    <div style={{ background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, padding: '4px 10px' }}>
                      {editingTasks ? draftTasks.map((t, i) => (
                        <input key={i} value={t} onChange={e => setDraftTasks(tasks => tasks.map((x, j) => j === i ? e.target.value : x))} style={{ display: 'block', width: '100%', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)', padding: '7px 0', background: 'none', border: 'none', borderBottom: i < draftTasks.length-1 ? '1px solid var(--line)' : 'none', outline: 'none', boxSizing: 'border-box' }} />
                      )) : draftTasks.map((t, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: i < draftTasks.length-1 ? '1px solid var(--line)' : 'none' }}>
                          <span style={{ fontFamily: 'var(--body)', fontSize: 9, color: 'var(--mute)', flexShrink: 0, paddingTop: 2 }}>{String(i+1).padStart(2,'0')}</span>
                          <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)' }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bring */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Bring</span>
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" /></svg>
                        <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hydrant)' }}>Auto-drafted</span>
                      </div>
                      <button onClick={() => setEditingBring(b => !b)} style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--hydrant)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{editingBring ? 'Done' : 'Edit'}</button>
                    </div>
                    <div style={{ background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 10, padding: '4px 10px' }}>
                      {editingBring ? draftBring.map((b, i) => (
                        <div key={i} style={{ display: 'flex', gap: 6, padding: '6px 0', borderBottom: i < draftBring.length-1 ? '1px solid var(--line)' : 'none' }}>
                          <input value={b.key} onChange={e => setDraftBring(br => br.map((x,j) => j===i ? {...x, key: e.target.value} : x))} style={{ width: 70, fontFamily: 'var(--body)', fontSize: 9, color: 'var(--mute)', textTransform: 'uppercase', background: 'none', border: 'none', outline: 'none' }} />
                          <input value={b.value} onChange={e => setDraftBring(br => br.map((x,j) => j===i ? {...x, value: e.target.value} : x))} style={{ flex: 1, fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', background: 'none', border: 'none', outline: 'none', textAlign: 'right' }} />
                        </div>
                      )) : draftBring.map((b, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < draftBring.length-1 ? '1px solid var(--line)' : 'none' }}>
                          <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mute)' }}>{b.key}</span>
                          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)' }}>{b.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* CONFIRM */}
              {step === 'confirm' && (
                <>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 6 }}>Confirm your shift</div>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 18, lineHeight: 1 }}>Looks good?</div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
                    {[
                      { label: 'Role',    value: role },
                      { label: 'When',    value: `${fmtDatePill(date)} · ${fmtTime(startTime)}–${fmtTime(endTime)}${hrs>0 ? ` (${hrsLabel(hrs)})` : ''}` },
                      { label: 'Pay',     value: `$${rate}/hr` },
                      { label: 'Workers', value: `${count} worker${count>1?'s':''} + 1 backup` },
                      { label: 'Tasks',   value: `${draftTasks.length} items drafted` },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', gap: 14, padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
                        <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--mute)', width: 54, flexShrink: 0, paddingTop: 2 }}>{row.label}</span>
                        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', lineHeight: 1.3 }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em' }}>All in: ${tot$.toFixed(0)}.</span>
                    <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>$0 to post</span>
                  </div>
                  <button
                    onClick={() => router.push('/employer/posting')}
                    style={{ width: '100%', padding: '15px', background: 'var(--ink)', border: 'none', borderRadius: 99, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: '#fff', cursor: 'pointer', letterSpacing: '-0.02em' }}
                  >
                    Post this shift.
                  </button>
                </>
              )}
            </div>

            {/* Nav buttons */}
            {step !== 'confirm' && !isDrafting && (
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                {stepIdx > 0 && (
                  <button onClick={back} style={{ flex: 1, padding: '13px', borderRadius: 99, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', cursor: 'pointer' }}>← Back</button>
                )}
                <button
                  onClick={next} disabled={!canNext}
                  style={{ flex: 2, padding: '13px', borderRadius: 99, border: 'none', background: canNext ? 'var(--ink)' : 'var(--paper-3)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: canNext ? '#fff' : 'var(--ink)', cursor: canNext ? 'pointer' : 'default', transition: 'all 0.2s', letterSpacing: '-0.02em' }}
                >
                  {step === 'brief' ? 'Draft it →' : 'Next →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Collapsible sections ──────────────────────────────────────────── */}

      <Section id="active" label="Active now">
        {ACTIVE_SHIFTS.map((s, i) => (
          <div key={i} style={{ border: '2px solid var(--ink)', borderRadius: 14, overflow: 'hidden' }}>
            <ShiftCard
              role={s.role}
              time={s.time}
              loc="Bed-Stuy"
              venue="Padmore's"
              brief={`${s.workers} workers confirmed · ${s.status} · ${s.eta}`}
              pay="$130"
              rate="$26/hr"
              family="bar"
              state="confirmed"
              href="/employer/roster"
            />
          </div>
        ))}
      </Section>

      <Section id="workers" label="Your go-to workers">
        <div style={{ display: 'flex', gap: 16, paddingBottom: 4 }}>
          {SAVED_WORKERS.map((w, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: w.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 17, color: '#fff' }}>{w.initials}</span>
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{w.name}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 1 }}>{w.role}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', fontWeight: 600, marginTop: 3 }}>{w.rating}★</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="recent" label="Recent shifts">
        <div style={{ background: 'var(--paper)', borderRadius: 14, border: '2px solid var(--ink)', overflow: 'hidden' }}>
          {RECENT.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: i < RECENT.length-1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{r.role} · {r.workers} worker{r.workers>1?'s':''}</div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 2 }}>{r.date}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{r.total}</div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 1 }}>{r.rating}★</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="spend" label="Labor spend">
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[
            { label: 'This week', value: '$696.' },
            { label: 'This month', value: '$2,408.' },
            { label: 'YTD', value: '$12,940.' },
          ].map((stat) => (
            <div key={stat.label} style={{ flex: 1, background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Role breakdown */}
        <div style={{ background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 12 }}>By role · this month</div>
          {[
            { role: 'Barista', pct: 40, amount: '$963.' },
            { role: 'Server', pct: 28, amount: '$674.' },
            { role: 'Bartender', pct: 20, amount: '$482.' },
            { role: 'Other', pct: 12, amount: '$289.' },
          ].map((row) => (
            <div key={row.role} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{row.role}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>{row.pct}%</span>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{row.amount}</span>
                </div>
              </div>
              <div style={{ height: 5, background: 'var(--line)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${row.pct}%`, background: 'var(--ink)', borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <EmployerNav active="dashboard" />
    </div>
  );
}
