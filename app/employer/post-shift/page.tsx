'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepProgress from '@/app/components/StepProgress';

const ROLES = ['Barista', 'Server', 'Barback', 'Host', 'Bartender', 'Cook', 'Dishwasher', 'Cashier'];
const STEPS = ['role', 'when', 'pay', 'count', 'notes', 'confirm'] as const;
type Step = typeof STEPS[number];

const ITEM_H = 64;
const HOURS = ['1','2','3','4','5','6','7','8','9','10','11','12'];
const MINS = ['00','15','30','45'];
const PERIODS = ['A','P'];

function DrumColumn({ items, selectedIdx, onSelect, wide }: {
  items: string[];
  selectedIdx: number;
  onSelect: (i: number) => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timer = useRef<any>(null);
  const isUserScroll = useRef(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selectedIdx * ITEM_H;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleScroll() {
    if (!isUserScroll.current) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!ref.current) return;
      const idx = Math.round(ref.current.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(items.length - 1, idx));
      isUserScroll.current = false;
      ref.current.scrollTo({ top: clamped * ITEM_H, behavior: 'smooth' });
      onSelect(clamped);
    }, 80);
  }

  return (
    <div style={{ position: 'relative', flex: wide ? 1.2 : 1 }}>
      {/* center selection band */}
      <div style={{
        position: 'absolute', top: ITEM_H, left: 4, right: 4, height: ITEM_H,
        borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)',
        pointerEvents: 'none', zIndex: 1, borderRadius: 2,
      }} />
      {/* top/bottom fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: ITEM_H, background: 'linear-gradient(to bottom, var(--paper), transparent)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: ITEM_H, background: 'linear-gradient(to top, var(--paper), transparent)', pointerEvents: 'none', zIndex: 2 }} />
      <div
        ref={ref}
        onPointerDown={() => { isUserScroll.current = true; }}
        onScroll={handleScroll}
        style={{
          height: ITEM_H * 3,
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch' as never,
        }}
      >
        <div style={{ height: ITEM_H, flexShrink: 0 }} />
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              height: ITEM_H,
              scrollSnapAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--sans)',
              fontWeight: i === selectedIdx ? 700 : 300,
              fontSize: wide ? 44 : 40,
              color: i === selectedIdx ? 'var(--ink)' : 'rgba(13,14,18,0.18)',
              letterSpacing: '-0.04em',
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'color 0.12s, font-weight 0.12s',
            }}
            onClick={() => {
              isUserScroll.current = false;
              ref.current?.scrollTo({ top: i * ITEM_H, behavior: 'smooth' });
              onSelect(i);
            }}
          >
            {item}
          </div>
        ))}
        <div style={{ height: ITEM_H, flexShrink: 0 }} />
      </div>
    </div>
  );
}

function toTotalMinutes(hourIdx: number, minIdx: number, periodIdx: number) {
  let h = hourIdx + 1;
  if (periodIdx === 0 && h === 12) h = 0;
  if (periodIdx === 1 && h !== 12) h += 12;
  return h * 60 + minIdx * 15;
}

function fmtTime(hourIdx: number, minIdx: number, periodIdx: number) {
  return `${HOURS[hourIdx]}:${MINS[minIdx]}${PERIODS[periodIdx]}`;
}

function fmtHrs(h: number) {
  if (h <= 0) return '—';
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
  const [rate, setRate] = useState(26);
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState('');

  const [startHourIdx, setStartHourIdx] = useState(10); // 11
  const [startMinIdx, setStartMinIdx] = useState(0);    // 00
  const [startPeriodIdx, setStartPeriodIdx] = useState(0); // A
  const [endHourIdx, setEndHourIdx] = useState(3);      // 4
  const [endMinIdx, setEndMinIdx] = useState(0);        // 00
  const [endPeriodIdx, setEndPeriodIdx] = useState(1);  // P

  const step = STEPS[stepIdx];
  const total = STEPS.length - 1;

  const startMins = toTotalMinutes(startHourIdx, startMinIdx, startPeriodIdx);
  const endMins = toTotalMinutes(endHourIdx, endMinIdx, endPeriodIdx);
  const hrs = Math.max(0, (endMins - startMins) / 60);
  const total$ = rate * hrs * count;
  const startStr = fmtTime(startHourIdx, startMinIdx, startPeriodIdx);
  const endStr = fmtTime(endHourIdx, endMinIdx, endPeriodIdx);
  const whenStr = `Today · ${startStr} – ${endStr}${hrs > 0 ? ` (${fmtHrs(hrs)})` : ''}`;

  function go(delta: 1 | -1) {
    if (animating) return;
    setDir(delta);
    setAnimating(true);
    setTimeout(() => {
      setStepIdx(i => i + delta);
      setAnimating(false);
    }, 180);
  }

  function next() { if (stepIdx < STEPS.length - 1) go(1); }
  function back() {
    if (stepIdx > 0) go(-1);
    else router.push('/employer/dashboard');
  }

  const canNext =
    (step === 'role' && role !== '') ||
    step === 'when' ||
    step === 'pay' ||
    step === 'count' ||
    step === 'notes';

  const slideStyle = {
    opacity: animating ? 0 : 1,
    transform: animating ? `translateX(${dir * 24}px)` : 'translateX(0)',
    transition: 'opacity 0.18s ease, transform 0.18s ease',
  };

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)' }}>
        <button onClick={back} style={{ fontSize: 20, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: 32 }}>←</button>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Post a shift</span>
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
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 12 }}>Role</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 28 }}>What role do you need?</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {ROLES.map(r => (
                <button key={r} onClick={() => setRole(r)} style={{
                  padding: '14px 16px', borderRadius: 99, cursor: 'pointer', textAlign: 'center',
                  fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.02em',
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
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 12 }}>When</div>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.2 }}>When do you need a shift filled?</p>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'inline-block', background: 'var(--ink)', borderRadius: 99, padding: '10px 20px' }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 17, color: '#fff', letterSpacing: '-0.02em' }}>Monday, May 19th</span>
              </div>
            </div>

            {/* Start */}
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 4 }}>Start</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DrumColumn wide items={HOURS} selectedIdx={startHourIdx} onSelect={setStartHourIdx} />
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 40, color: 'var(--ink)', padding: '0 2px', flexShrink: 0, marginBottom: 4 }}>:</span>
              <DrumColumn items={MINS} selectedIdx={startMinIdx} onSelect={setStartMinIdx} />
              <DrumColumn items={PERIODS} selectedIdx={startPeriodIdx} onSelect={setStartPeriodIdx} />
            </div>

            <div style={{ height: 1, background: 'var(--line)', margin: '12px 0' }} />

            {/* End */}
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 4 }}>
              End{hrs > 0 ? <span style={{ color: 'var(--hydrant)', marginLeft: 8 }}>{fmtHrs(hrs)}</span> : null}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DrumColumn wide items={HOURS} selectedIdx={endHourIdx} onSelect={setEndHourIdx} />
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 40, color: 'var(--ink)', padding: '0 2px', flexShrink: 0, marginBottom: 4 }}>:</span>
              <DrumColumn items={MINS} selectedIdx={endMinIdx} onSelect={setEndMinIdx} />
              <DrumColumn items={PERIODS} selectedIdx={endPeriodIdx} onSelect={setEndPeriodIdx} />
            </div>
          </div>
        )}

        {/* PAY */}
        {step === 'pay' && (
          <>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 12 }}>Pay</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 28 }}>How much per hour?</h1>
            <div style={{ background: 'var(--ink)', borderRadius: 18, padding: '28px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={() => setRate(r => Math.max(15, r - 1))} style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64, color: 'white', letterSpacing: '-0.075em', lineHeight: 1 }}>${rate}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>/hr</span>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
                    {hrs > 0 ? `Total for ${fmtHrs(hrs)}: $${(rate * hrs).toFixed(0)}.` : 'Set times to see total.'}
                  </div>
                </div>
                <button onClick={() => setRate(r => Math.min(75, r + 1))} style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.08)', color: 'white', fontSize: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 12 }}>NYC minimum is $16/hr. Market rate for {role || 'this role'} is ~$22–28/hr.</p>
          </>
        )}

        {/* COUNT */}
        {step === 'count' && (
          <>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 12 }}>How many</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 40 }}>How many workers?</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <button onClick={() => setCount(Math.max(1, count - 1))} style={{ width: 56, height: 56, borderRadius: 14, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', minWidth: 60, textAlign: 'center' }}>{count}</span>
              <button onClick={() => setCount(count + 1)} style={{ width: 56, height: 56, borderRadius: 14, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', marginTop: 20 }}>+1 standby auto-invited as backup.</p>
          </>
        )}

        {/* NOTES */}
        {step === 'notes' && (
          <>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 12 }}>Notes</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 8 }}>Anything they need to know?</h1>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', marginBottom: 20 }}>Dress code, entrance, what to bring. Optional but helpful.</p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={5}
              placeholder="e.g. Black apron required, use side entrance on Bergen St, bring your own tools..."
              style={{ width: '100%', padding: '14px 16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14, fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
              autoFocus
            />
          </>
        )}

        {/* CONFIRM */}
        {step === 'confirm' && (
          <>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hydrant)', marginBottom: 12 }}>Review</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 40, letterSpacing: '-0.075em', lineHeight: 1, color: 'var(--ink)', marginBottom: 28 }}>Looks good?</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {[
                { label: 'Role', value: role },
                { label: 'When', value: whenStr },
                { label: 'Pay', value: `$${rate}/hr` },
                { label: 'Workers', value: `${count} worker${count > 1 ? 's' : ''} + 1 backup` },
                ...(notes ? [{ label: 'Notes', value: notes }] : []),
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', gap: 12, padding: '14px 16px', border: '2px solid var(--ink)', borderRadius: 12 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', width: 60, flexShrink: 0, paddingTop: 1 }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.04em' }}>All in: ${total$.toFixed(0)}.</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)' }}>$0 to post</span>
              </div>
              <button
                onClick={() => router.push('/employer/posting')}
                style={{ width: '100%', padding: '18px', background: 'var(--ink)', border: 'none', borderRadius: 14, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: '#fff', cursor: 'pointer', letterSpacing: '-0.02em' }}
              >
                Post this shift.
              </button>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink)', textAlign: 'center', marginTop: 10 }}>$0 posted · billed when filled</p>
            </div>
          </>
        )}
      </div>

      {/* Next / Skip buttons */}
      {step !== 'confirm' && (
        <div style={{ padding: '0 22px 40px', display: 'flex', gap: 10 }}>
          {step === 'notes' && (
            <button onClick={next} style={{ flex: 1, padding: '16px', borderRadius: 14, border: '2px solid var(--ink)', background: 'transparent', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)', cursor: 'pointer' }}>
              Skip
            </button>
          )}
          <button
            onClick={next}
            disabled={!canNext}
            style={{ flex: 2, padding: '16px', borderRadius: 14, border: 'none', background: canNext ? 'var(--ink)' : 'var(--paper-3)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: canNext ? '#fff' : 'var(--ink)', cursor: canNext ? 'pointer' : 'default', transition: 'all 0.2s', letterSpacing: '-0.02em' }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
