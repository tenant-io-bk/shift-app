'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';
import StepProgress from '@/app/components/StepProgress';

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
const STEPS = ['role','when','pay','count','notes','confirm'] as const;
type Step = typeof STEPS[number];

const ACTIVE_SHIFTS = [
  { role: 'Barista', time: 'Today · 11A–4P', workers: 2, status: 'En route', eta: '6 min' },
];
const RECENT = [
  { date: 'Mon 12 May', role: 'Barista',   workers: 2, total: '$280.', rating: 4.9 },
  { date: 'Sat 10 May', role: 'Server',    workers: 3, total: '$288.', rating: 4.7 },
  { date: 'Thu 8 May',  role: 'Barback',   workers: 1, total: '$128.', rating: 5.0 },
  { date: 'Mon 5 May',  role: 'Bartender', workers: 2, total: '$312.', rating: 4.8 },
];
const SAVED_WORKERS = [
  { initials: 'MR', name: 'Marco R.', role: 'Barista', rating: '4.9', bg: '#72c15f' },
  { initials: 'SO', name: 'Sam O.',   role: 'Server',  rating: '4.8', bg: '#2D6A4F' },
  { initials: 'JL', name: 'Jules L.', role: 'Host',    rating: '4.9', bg: '#0D0E12' },
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
  const [notes,     setNotes]       = useState('');

  // collapsible sections
  const [open, setOpen] = useState({ active: true, workers: true, recent: true });

  const step  = STEPS[stepIdx] as Step;
  const total = STEPS.length - 1;
  const hrs   = diffHrs(startTime, endTime);
  const tot$  = rate * hrs * count;

  function startPosting() {
    setIsPosting(true);
    setOpen({ active: false, workers: false, recent: false });
    setStepIdx(0); setRole('');
  }
  function cancelPosting() {
    setIsPosting(false);
    setOpen({ active: true, workers: true, recent: true });
  }
  function go(delta: 1|-1) {
    if (animating) return;
    setDir(delta); setAnimating(true);
    setTimeout(() => { setStepIdx(i => i + delta); setAnimating(false); }, 160);
  }
  function next() { if (stepIdx < STEPS.length - 1) go(1); }
  function back() { if (stepIdx > 0) go(-1); else cancelPosting(); }

  const canNext =
    (step === 'role' && role !== '') ||
    step === 'when' || step === 'pay' || step === 'count' || step === 'notes';

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
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>{label}</span>
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
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 8 }}>172 Tompkins Ave | Bed-Stuy</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, paddingTop: 4 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.02em' }}>78°F</div>
          <div style={{ fontSize: 22, lineHeight: 1.2 }}>☀️</div>
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
          {!isPosting && <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)', flex: 1, paddingLeft: 12, textAlign: 'left' }}>Workers confirmed in minutes</span>}
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 32, color: '#fff', lineHeight: 1 }}>{isPosting ? '×' : '+'}</span>
        </button>

        {/* Inline form */}
        {isPosting && (
          <div style={{ background: 'var(--paper)', padding: '18px 20px 20px' }}>

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
                    {ROLES.map(r => (
                      <button key={r} onClick={() => setRole(r)} style={{
                        padding: '11px 14px', borderRadius: 99, cursor: 'pointer', textAlign: 'center',
                        fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, letterSpacing: '-0.02em',
                        border: '2px solid var(--ink)',
                        background: role === r ? 'var(--ink)' : 'transparent',
                        color: role === r ? '#fff' : 'var(--ink)',
                        transition: 'all 0.15s',
                      }}>{r}</button>
                    ))}
                  </div>
                </>
              )}

              {/* WHEN */}
              {step === 'when' && (
                <>
                  {/* Date + duration pills */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <div style={{ background: 'var(--ink)', borderRadius: 99, padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '-0.02em' }}>{fmtDatePill(date)}</span>
                      </div>
                      <input type="date" value={date} onChange={e => setDate(e.target.value)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                    </div>
                    {hrs > 0 && (
                      <div style={{ background: 'var(--hydrant)', borderRadius: 99, padding: '9px 16px' }}>
                        <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 12, color: '#fff', letterSpacing: '0.06em' }}>{hrsLabel(hrs)}</span>
                      </div>
                    )}
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
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--ink)' }}>/hr</span>
                      </div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 4 }}>
                        {hrs > 0 ? `Total: $${(rate*hrs).toFixed(0)}` : 'Set times to see total'}
                      </div>
                    </div>
                    <button onClick={() => setRate(r => Math.min(75, r+1))} style={{ width: 48, height: 48, borderRadius: 12, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                  </div>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)', marginTop: 10 }}>NYC min $16/hr · Market for {role||'this role'} ~$22–28/hr</p>
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
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 12 }}>+1 standby auto-invited as backup.</p>
                </>
              )}

              {/* NOTES */}
              {step === 'notes' && (
                <>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 6 }}>Anything they need to know?</div>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginBottom: 12 }}>Dress code, entrance, what to bring. Optional.</p>
                  <textarea
                    value={notes} onChange={e => setNotes(e.target.value)} rows={4} autoFocus
                    placeholder="e.g. Black apron required, side entrance on Bergen St..."
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 12, fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                  />
                </>
              )}

              {/* CONFIRM */}
              {step === 'confirm' && (
                <>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: 14 }}>Looks good?</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                    {[
                      { label: 'Role',    value: role },
                      { label: 'When',    value: `${fmtDatePill(date)} · ${fmtTime(startTime)}–${fmtTime(endTime)}${hrs>0 ? ` (${hrsLabel(hrs)})` : ''}` },
                      { label: 'Pay',     value: `$${rate}/hr` },
                      { label: 'Workers', value: `${count} worker${count>1?'s':''} + 1 backup` },
                      ...(notes ? [{ label: 'Notes', value: notes }] : []),
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', gap: 10, padding: '10px 14px', border: '2px solid var(--ink)', borderRadius: 10 }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', width: 52, flexShrink: 0 }}>{row.label}</span>
                        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.04em' }}>All in: ${tot$.toFixed(0)}.</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)' }}>$0 to post</span>
                  </div>
                  <button
                    onClick={() => router.push('/employer/posting')}
                    style={{ width: '100%', padding: '15px', background: 'var(--ink)', border: 'none', borderRadius: 12, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: '#fff', cursor: 'pointer', letterSpacing: '-0.02em' }}
                  >
                    Post this shift.
                  </button>
                </>
              )}
            </div>

            {/* Nav buttons */}
            {step !== 'confirm' && (
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                {stepIdx > 0 && (
                  <button onClick={back} style={{ flex: 1, padding: '13px', borderRadius: 12, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', cursor: 'pointer' }}>← Back</button>
                )}
                {step === 'notes' && (
                  <button onClick={next} style={{ flex: 1, padding: '13px', borderRadius: 12, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', cursor: 'pointer' }}>Skip</button>
                )}
                <button
                  onClick={next} disabled={!canNext}
                  style={{ flex: 2, padding: '13px', borderRadius: 12, border: 'none', background: canNext ? 'var(--ink)' : 'var(--paper-3)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: canNext ? '#fff' : 'var(--ink)', cursor: canNext ? 'pointer' : 'default', transition: 'all 0.2s', letterSpacing: '-0.02em' }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Collapsible sections ──────────────────────────────────────────── */}

      <Section id="active" label="Active now">
        {ACTIVE_SHIFTS.map((s, i) => (
          <Link key={i} href="/employer/roster" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--paper)', borderRadius: 14, border: '2px solid var(--ink)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#16A34A', flexShrink: 0, boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{s.role} · {s.workers} workers</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 2 }}>{s.time}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: '#16A34A' }}>{s.status}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)', marginTop: 1 }}>{s.eta}</div>
              </div>
            </div>
          </Link>
        ))}
      </Section>

      <Section id="workers" label="Your go-to workers">
        <div style={{ display: 'flex', gap: 10 }}>
          {SAVED_WORKERS.map((w, i) => (
            <div key={i} style={{ flex: 1, background: 'var(--paper)', borderRadius: 12, border: '2px solid var(--ink)', padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: w.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: '#fff' }}>{w.initials}</span>
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{w.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)', marginTop: 2 }}>{w.role}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hydrant)', fontWeight: 600, marginTop: 4 }}>{w.rating}★</div>
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
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 2 }}>{r.date}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{r.total}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hydrant)', marginTop: 1 }}>{r.rating}★</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <EmployerNav active="dashboard" />
    </div>
  );
}
