'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/app/components/StepProgress';

const ROLES = ['Barista', 'Server', 'Barback', 'Host', 'Bartender', 'Cook', 'Dishwasher', 'Cashier'];
const STEPS = ['role', 'when', 'pay', 'count', 'brief', 'review', 'confirm'] as const;
type Step = typeof STEPS[number];

interface DraftData { tasks: string[]; bring: { key: string; value: string }[] }
const DRAFTS: Record<string, DraftData> = {
  Barista:   { tasks: ['Espresso and pour-over service','Bar setup and breakdown','Stock and mise en place',"Team communication — it's busy"], bring: [{ key:'Attire', value:'All black, closed-toe shoes' }, { key:'Experience', value:'2+ years espresso' }, { key:'Cert', value:'Food handler (optional)' }] },
  Bartender: { tasks: ['Full bar service and cocktail prep','Speed rail and beer setup','POS, tabs, and cash handling','End-of-night breakdown and close'], bring: [{ key:'Attire', value:'All black' }, { key:'Experience', value:'3+ years bartending' }, { key:'Cert', value:'NY liquor cert preferred' }] },
  Server:    { tasks: ['Full table service, food and beverage','POS order entry and payment','Sidework and station reset','Communicate with kitchen'], bring: [{ key:'Attire', value:'All black' }, { key:'Experience', value:'2+ years restaurant' }, { key:'Cert', value:'Food handler card' }] },
  Host:      { tasks: ['Greet and seat guests','Manage waitlist and reservations','Coordinate with floor team','Keep front-of-house organized'], bring: [{ key:'Attire', value:'Smart casual or all black' }, { key:'Experience', value:'1+ years FOH' }, { key:'Vibe', value:'Warm, confident presence' }] },
  Cook:      { tasks: ['Station prep and mise en place','Line cooking during service','Keep station clean and organized','Follow food safety protocols'], bring: [{ key:'Attire', value:'Chef whites or black apron' }, { key:'Experience', value:'2+ years line experience' }, { key:'Cert', value:'Food handler required' }] },
  Barback:   { tasks: ['Keep bar fully stocked','Ice, garnish, and glassware','Support bartenders during service','Breakdown and clean at close'], bring: [{ key:'Attire', value:'All black' }, { key:'Experience', value:'1+ year bar experience' }, { key:'Note', value:'Must be 21+' }] },
};
const DEFAULT_DRAFT: DraftData = { tasks: ['Main service duties for the shift','Setup and breakdown','Team coordination','Keep your area clean'], bring: [{ key:'Attire', value:'All black, closed-toe shoes' }, { key:'Experience', value:'1+ year relevant' }, { key:'Cert', value:'Food handler preferred' }] };
function getDraft(r: string): DraftData { return DRAFTS[r] ?? DEFAULT_DRAFT; }

function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const day = date.getDate();
  const suffix = [11,12,13].includes(day) ? 'th' : day % 10 === 1 ? 'st' : day % 10 === 2 ? 'nd' : day % 10 === 3 ? 'rd' : 'th';
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${day}${suffix}`;
}

function fmtDisplay(t: string) {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'P' : 'A';
  const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${dh}:${String(m).padStart(2, '0')}${period}`;
}

function timeDiffHrs(start: string, end: string) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return Math.max(0, (eh * 60 + em - sh * 60 - sm) / 60);
}

function fmtHrs(h: number) {
  if (h <= 0) return '';
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  if (mins === 0) return `${whole}h`;
  return whole > 0 ? `${whole}h ${mins}m` : `${mins}m`;
}

export default function PostShift() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);

  const [role, setRole] = useState('');
  const [date, setDate] = useState('2026-05-19');
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('16:00');
  const [rate, setRate] = useState(26);
  const [count, setCount] = useState(1);
  const [brief, setBrief] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftDots, setDraftDots] = useState(1);
  const [draftTasks, setDraftTasks] = useState<string[]>([]);
  const [draftBring, setDraftBring] = useState<{ key: string; value: string }[]>([]);
  const [editingTasks, setEditingTasks] = useState(false);
  const [editingBring, setEditingBring] = useState(false);

  const step = STEPS[stepIdx];
  const total = STEPS.length - 1;
  const hrs = timeDiffHrs(startTime, endTime);
  const total$ = rate * hrs * count;
  const whenStr = `${fmtDate(date)} · ${fmtDisplay(startTime)} – ${fmtDisplay(endTime)}${hrs > 0 ? ` (${fmtHrs(hrs)})` : ''}`;

  function go(delta: 1 | -1) {
    if (animating) return;
    setDir(delta);
    setAnimating(true);
    setTimeout(() => { setStepIdx(i => i + delta); setAnimating(false); }, 180);
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
  function back() {
    if (stepIdx > 0) go(-1);
    else router.push('/employer/dashboard');
  }

  const canNext =
    (step === 'role' && role !== '') ||
    step === 'when' || step === 'pay' || step === 'count' ||
    step === 'brief' || step === 'review';

  const slideStyle = {
    opacity: animating ? 0 : 1,
    transform: animating ? `translateX(${dir * 24}px)` : 'translateX(0)',
    transition: 'opacity 0.18s ease, transform 0.18s ease',
  };

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes pill-land {
          0%   { opacity: 0; transform: translateY(40px) rotate(var(--r)) scale(0.82); }
          55%  { opacity: 1; transform: translateY(-5px) rotate(calc(var(--r) * -0.1)) scale(1.04); }
          75%  { transform: translateY(2px) rotate(calc(var(--r) * 0.03)) scale(0.98); }
          90%  { transform: translateY(-1px) rotate(0deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
        }
        .pill-anim { animation: pill-land 0.75s cubic-bezier(0.22,1,0.36,1) both; opacity: 0; }
        @keyframes brand-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)' }}>
        <button onClick={back} style={{ fontSize: 20, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 32 }}>←</button>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Post a Shift</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Progress */}
      {step !== 'confirm' && (
        <div style={{ padding: '12px 22px 0' }}>
          <StepProgress step={stepIdx + 1} total={total} />
        </div>
      )}

      {/* Step content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 22px 16px', minHeight: 0, ...slideStyle }}>

        {/* ROLE */}
        {step === 'role' && (
          <>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12 }}>Role</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 28 }}>What Role Do You Need?</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {ROLES.map((r, i) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="pill-anim"
                  style={{
                    padding: '11px 18px', borderRadius: 99, cursor: 'pointer', textAlign: 'center',
                    fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, letterSpacing: '-0.02em',
                    border: '2px solid var(--ink)',
                    background: role === r ? 'var(--ink)' : 'transparent',
                    color: role === r ? '#fff' : 'var(--ink)',
                    transition: 'background 0.15s, color 0.15s',
                    animationDelay: `${i * 0.07}s`,
                    ['--r' as string]: `${(i % 2 === 0 ? -1 : 1) * (3 + i * 1.5)}deg`,
                  }}
                >{r}</button>
              ))}
            </div>
          </>
        )}

        {/* WHEN */}
        {step === 'when' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12 }}>When</div>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.2 }}>When do you need a shift filled?</p>

            {/* Date pill */}
            <div style={{ marginBottom: 32, position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <div style={{ background: 'var(--ink)', borderRadius: 99, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="11" rx="2" stroke="white" strokeWidth="1.5"/>
                  <line x1="1" y1="5.5" x2="13" y2="5.5" stroke="white" strokeWidth="1.5"/>
                  <line x1="4.5" y1="1" x2="4.5" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="9.5" y1="1" x2="9.5" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 17, color: '#fff', letterSpacing: '-0.02em' }}>{fmtDate(date)}</span>
              </div>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
              />
            </div>

            {/* Start */}
            <div style={{ position: 'relative', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 56, color: 'var(--ink)', letterSpacing: '-0.055em', lineHeight: 1, textAlign: 'center' }}>Start</div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 72, color: 'var(--ink)', letterSpacing: '-0.06em', lineHeight: 1, textAlign: 'center' }}>{fmtDisplay(startTime)}</div>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
              />
            </div>

            <div style={{ height: 1, background: 'var(--line)', marginBottom: 24 }} />

            {/* End */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 56, color: 'var(--ink)', letterSpacing: '-0.055em', lineHeight: 1, textAlign: 'center' }}>
                End
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 72, color: 'var(--ink)', letterSpacing: '-0.06em', lineHeight: 1, textAlign: 'center' }}>{fmtDisplay(endTime)}</div>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

        {/* PAY */}
        {step === 'pay' && (
          <>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12 }}>Pay</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 32 }}>How Much Per Hour?</h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 16 }}>
              <button onClick={() => setRate(r => Math.max(15, r - 1))} style={{ width: 52, height: 52, borderRadius: 99, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 72, color: 'var(--ink)', letterSpacing: '-0.06em', lineHeight: 1 }}>${rate}</div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginTop: 6 }}>
                  {hrs > 0 ? `Total for ${fmtHrs(hrs)}: $${(rate * hrs).toFixed(0)}.` : 'Set times to see total.'}
                </div>
              </div>
              <button onClick={() => setRate(r => Math.min(75, r + 1))} style={{ width: 52, height: 52, borderRadius: 99, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
            </div>

            <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 4 }}>NYC minimum is $16/hr. Market rate for {role || 'this role'} is ~$22–28/hr.</p>
          </>
        )}

        {/* COUNT */}
        {step === 'count' && (
          <>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12 }}>How many</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 40 }}>How Many Workers?</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
              <button onClick={() => setCount(Math.max(1, count - 1))} style={{ width: 56, height: 56, borderRadius: 99, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', minWidth: 60, textAlign: 'center' }}>{count}</span>
              <button onClick={() => setCount(count + 1)} style={{ width: 56, height: 56, borderRadius: 99, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginTop: 20 }}>+1 standby auto-invited as backup.</p>
          </>
        )}

        {/* BRIEF */}
        {step === 'brief' && !isDrafting && (
          <>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12 }}>Brief</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 8 }}>Describe the Shift in One Line</h1>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginBottom: 20 }}>SHIFT will write the full posting from this.</p>
            <textarea
              value={brief}
              onChange={e => setBrief(e.target.value)}
              rows={3}
              autoFocus
              placeholder={`e.g. "${role.toLowerCase()}, lunch rush, all black, busy"`}
              style={{ width: '100%', padding: '14px 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14, fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
            />
          </>
        )}

        {/* DRAFTING */}
        {step === 'brief' && isDrafting && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
              background: 'conic-gradient(#72c15f 0deg, #9A7CE0 90deg, #E5391F 180deg, #f7dd6d 270deg, #72c15f 360deg)',
              WebkitMask: 'radial-gradient(transparent 52%, black 53%)',
              mask: 'radial-gradient(transparent 52%, black 53%)',
              animation: 'brand-spin 1s linear infinite',
            }} />
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em' }}>Writing Your Posting…</p>
            <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)' }}>Task list, attire, and rate — 2 sec</p>
          </div>
        )}

        {/* REVIEW */}
        {step === 'review' && (
          <>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 12 }}>Review</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 16 }}>SHIFT Drafted This.</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: '8px 12px', background: 'var(--hydrant-soft)', borderRadius: 8 }}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" /></svg>
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)' }}>Auto-drafted from your one-liner · edit anything</span>
            </div>

            {/* The work */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>The work</span>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" /></svg>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hydrant)' }}>Auto-drafted</span>
                </div>
                <button onClick={() => setEditingTasks(t => !t)} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--hydrant)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{editingTasks ? 'Done' : 'Edit'}</button>
              </div>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {editingTasks ? draftTasks.map((t, i) => (
                  <input key={i} value={t} onChange={e => setDraftTasks(ts => ts.map((x, j) => j === i ? e.target.value : x))} style={{ display: 'block', width: '100%', fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', padding: '11px 0', background: 'none', border: 'none', borderBottom: '1px solid var(--line)', outline: 'none', boxSizing: 'border-box' }} />
                )) : draftTasks.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
                    <span style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', flexShrink: 0, paddingTop: 3 }}>{String(i+1).padStart(2,'0')}</span>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bring */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Bring</span>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" /></svg>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hydrant)' }}>Auto-drafted</span>
                </div>
                <button onClick={() => setEditingBring(b => !b)} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--hydrant)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{editingBring ? 'Done' : 'Edit'}</button>
              </div>
              <div style={{ borderTop: '1px solid var(--line)' }}>
                {editingBring ? draftBring.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                    <input value={b.key} onChange={e => setDraftBring(br => br.map((x,j) => j===i ? {...x, key: e.target.value} : x))} style={{ width: 80, fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', textTransform: 'uppercase', background: 'none', border: 'none', outline: 'none' }} />
                    <input value={b.value} onChange={e => setDraftBring(br => br.map((x,j) => j===i ? {...x, value: e.target.value} : x))} style={{ flex: 1, fontFamily: 'var(--body)', fontSize: 15, color: 'var(--ink)', background: 'none', border: 'none', outline: 'none', textAlign: 'right' }} />
                  </div>
                )) : draftBring.map((b, i) => (
                  <div key={i} style={{ padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mute)', marginBottom: 3 }}>{b.key}</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--ink)' }}>{b.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* CONFIRM */}
        {step === 'confirm' && (
          <>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 8 }}>Confirm your shift</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 28 }}>Looks Good?</h1>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 28 }}>
              {[
                { label: 'Role', value: role },
                { label: 'When', value: whenStr },
                { label: 'Pay', value: `$${rate}/hr` },
                { label: 'Workers', value: `${count} worker${count > 1 ? 's' : ''} + 1 backup` },
                ...(draftTasks.length ? [{ label: 'Tasks', value: `${draftTasks.length} items auto-drafted` }] : []),
              ].map((row, i, arr) => (
                <div key={row.label} style={{ display: 'flex', flexDirection: 'column', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 4 }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.04em' }}>All in: ${total$.toFixed(0)}.</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)' }}>$0 to post</span>
              </div>
              <button
                onClick={() => router.push('/employer/roster')}
                style={{ width: '100%', padding: '18px', background: 'var(--ink)', border: 'none', borderRadius: 99, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: '#fff', cursor: 'pointer', letterSpacing: '-0.02em' }}
              >
                Post This Shift.
              </button>
              <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textAlign: 'center', marginTop: 10 }}>$0 posted · billed when filled</p>
            </div>
          </>
        )}
      </div>

      {/* Next / Back buttons */}
      {step !== 'confirm' && !isDrafting && (
        <div style={{ padding: '0 22px 40px', display: 'flex', gap: 10 }}>
          <button
            onClick={next}
            disabled={!canNext}
            style={{ flex: 2, padding: '16px', borderRadius: 99, border: 'none', background: canNext ? 'var(--ink)' : 'var(--paper-3)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: canNext ? '#fff' : 'var(--ink)', cursor: canNext ? 'pointer' : 'default', transition: 'all 0.2s', letterSpacing: '-0.02em' }}
          >
            {step === 'brief' ? 'Draft It →' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
