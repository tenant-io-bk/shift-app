'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = 'input' | 'drafting' | 'review' | 'posted';

interface DraftData {
  tasks: string[];
  bring: { key: string; value: string }[];
  rate: { suggested: number; low: number; high: number; note: string };
}

// ─── AI draft generator (simulated) ──────────────────────────────────────────

const DRAFTS: Record<string, DraftData> = {
  Barista: {
    tasks: ['Espresso and pour-over service', 'Bar setup and breakdown', 'Stock and mise en place', "Team communication — it's busy"],
    bring: [{ key: 'Attire', value: 'All black, closed-toe shoes' }, { key: 'Experience', value: '2+ years espresso' }, { key: 'Cert', value: 'Food handler (optional)' }],
    rate: { suggested: 28, low: 24, high: 32, note: 'Based on 23 barista bookings in Bed-Stuy this month' },
  },
  Bartender: {
    tasks: ['Full bar service and cocktail prep', 'Speed rail and beer setup', 'POS, tabs, and cash handling', 'End-of-night breakdown and close'],
    bring: [{ key: 'Attire', value: 'All black' }, { key: 'Experience', value: '3+ years bartending' }, { key: 'Cert', value: 'NY liquor cert preferred' }],
    rate: { suggested: 29, low: 26, high: 34, note: 'Based on 18 bartender bookings in Bed-Stuy this month' },
  },
  Server: {
    tasks: ['Full table service, food and beverage', 'POS order entry and payment', 'Sidework and station reset', 'Communicate with kitchen'],
    bring: [{ key: 'Attire', value: 'All black' }, { key: 'Experience', value: '2+ years restaurant' }, { key: 'Cert', value: 'Food handler card' }],
    rate: { suggested: 24, low: 22, high: 28, note: 'Based on 31 server bookings in Bed-Stuy this month' },
  },
  Host: {
    tasks: ['Greet and seat guests', 'Manage waitlist and reservations', 'Coordinate with floor team', 'Keep front-of-house clean and organized'],
    bring: [{ key: 'Attire', value: 'Smart casual or all black' }, { key: 'Experience', value: '1+ years FOH' }, { key: 'Vibe', value: 'Warm, confident presence' }],
    rate: { suggested: 22, low: 20, high: 26, note: 'Based on 11 host bookings in Bed-Stuy this month' },
  },
  'Line Cook': {
    tasks: ['Station prep and mise en place', 'Line cooking during service', 'Keep station clean and organized', 'Follow food safety protocols'],
    bring: [{ key: 'Attire', value: 'Chef whites or black apron' }, { key: 'Experience', value: '2+ years line experience' }, { key: 'Cert', value: 'Food handler required' }],
    rate: { suggested: 24, low: 21, high: 28, note: 'Based on 9 line cook bookings in Bed-Stuy this month' },
  },
  Barback: {
    tasks: ['Keep bar fully stocked', 'Ice, garnish, and glassware', 'Support bartenders during service', 'Breakdown and clean at close'],
    bring: [{ key: 'Attire', value: 'All black' }, { key: 'Experience', value: '1+ year bar experience' }, { key: 'Note', value: 'Must be 21+' }],
    rate: { suggested: 23, low: 20, high: 26, note: 'Based on 14 barback bookings in Bed-Stuy this month' },
  },
};

const DEFAULT_DRAFT: DraftData = {
  tasks: ['Main service duties for the shift', 'Setup and breakdown of your station', 'Team coordination and communication', 'Keep your area clean and organized'],
  bring: [{ key: 'Attire', value: 'All black, closed-toe shoes' }, { key: 'Experience', value: '1+ year relevant experience' }, { key: 'Cert', value: 'Food handler preferred' }],
  rate: { suggested: 24, low: 20, high: 28, note: 'Based on recent bookings in your area' },
};

function getDraft(role: string): DraftData {
  return DRAFTS[role] ?? DEFAULT_DRAFT;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AutoTag({ label = 'Auto-drafted' }: { label?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" />
      </svg>
      <span style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hydrant)' }}>
        {label}
      </span>
    </span>
  );
}

function RateBar({ low, high, suggested }: { low: number; high: number; suggested: number }) {
  const pct = ((suggested - low) / (high - low)) * 100;
  return (
    <div style={{ position: 'relative', height: 6, background: 'var(--line)', borderRadius: 99, margin: '10px 0 6px' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--hydrant)', borderRadius: 99 }} />
      <div style={{
        position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)',
        width: 14, height: 14, borderRadius: '50%',
        background: 'var(--hydrant)', border: '2.5px solid var(--paper)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
      <div style={{ position: 'absolute', top: 12, left: 0, fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)' }}>${low}</div>
      <div style={{ position: 'absolute', top: 12, right: 0, fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)' }}>${high}</div>
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

const ROLES = ['Barista', 'Bartender', 'Server', 'Host', 'Line Cook', 'Barback', 'Prep Cook', 'Cashier', 'Security'];

function InputStep({ onDraft }: { onDraft: (role: string, brief: string, time: string, count: number) => void }) {
  const [role, setRole] = useState('Barista');
  const [brief, setBrief] = useState('');
  const [time, setTime] = useState('11A – 4P');
  const [count, setCount] = useState(1);

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '24px 22px 0' }}>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--hydrant)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>New posting</span>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, color: 'var(--ink)', letterSpacing: '-0.06em', lineHeight: 1, marginTop: 6, marginBottom: 24 }}>
          What do you need?
        </h1>

        {/* Role picker */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)', display: 'block', marginBottom: 10 }}>Role</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ROLES.map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                padding: '9px 16px', borderRadius: 99,
                fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14,
                border: role === r ? 'none' : '2px solid var(--ink)',
                background: role === r ? 'var(--ink)' : 'transparent',
                color: role === r ? '#fff' : 'var(--ink)',
                cursor: 'pointer', transition: 'all 0.12s ease',
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* One-liner */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)', display: 'block', marginBottom: 10 }}>Describe the shift in one line</label>
          <textarea
            value={brief}
            onChange={e => setBrief(e.target.value)}
            placeholder={`e.g. "${role.toLowerCase()}, lunch rush, all black, busy"`}
            rows={2}
            style={{
              width: '100%', padding: '12px 14px',
              fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)',
              background: 'var(--card)', border: '2px solid var(--ink)',
              borderRadius: 12, outline: 'none', resize: 'none',
              lineHeight: 1.5, boxSizing: 'border-box',
            }}
          />
          <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 6 }}>
            SHIFT will write the full posting from this.
          </p>
        </div>

        {/* When */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)', display: 'block', marginBottom: 10 }}>When</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, padding: '12px 14px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 12 }}>
              <div style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Date</div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>Today, May 25</div>
            </div>
            <div style={{ flex: 1, padding: '12px 14px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 12 }}>
              <div style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Hours</div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{time}</div>
            </div>
          </div>
        </div>

        {/* How many */}
        <div style={{ marginBottom: 36 }}>
          <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)', display: 'block', marginBottom: 10 }}>How many workers?</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setCount(Math.max(1, count - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--ink)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.04em', minWidth: 32, textAlign: 'center' }}>{count}</span>
            <button onClick={() => setCount(count + 1)} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--ink)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
        </div>

        <button
          onClick={() => onDraft(role, brief, time, count)}
          style={{
            width: '100%', padding: '16px',
            background: 'var(--ink)', color: '#fff', borderRadius: 99,
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18,
            border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
          }}
        >
          Draft It →
        </button>
      </div>
    </div>
  );
}

function DraftingStep() {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDots(d => d === 3 ? 1 : d + 1), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 20 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: i < dots ? 'var(--hydrant)' : 'var(--line)',
            transition: 'background 0.2s ease',
          }} />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1.2 }}>
          Writing Your Posting...
        </p>
        <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 8 }}>
          Pulling task lists, attire, and market rate
        </p>
      </div>
    </div>
  );
}

function ReviewStep({
  role, time, count, draft, onPost,
}: {
  role: string; time: string; count: number; draft: DraftData; onPost: () => void;
}) {
  const [tasks, setTasks] = useState(draft.tasks);
  const [bring, setBring] = useState(draft.bring);
  const [rate, setRate] = useState(draft.rate.suggested);
  const [editingTasks, setEditingTasks] = useState(false);
  const [editingBring, setEditingBring] = useState(false);

  return (
    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
      {/* AI banner */}
      <div style={{ margin: '16px 22px 0', padding: '10px 14px', background: 'var(--hydrant-soft)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
          <path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--hydrant)" />
        </svg>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>
          SHIFT drafted this from your one-liner. Edit anything.
        </span>
      </div>

      {/* Role + time header */}
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 6 }}>
          Padmore&apos;s Coffee · {time} · {count === 1 ? '1 worker' : `${count} workers`}
        </div>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.1 }}>
          {role} needed today
        </h2>
      </div>

      {/* The work */}
      <div style={{ margin: '20px 22px 0', padding: '16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>The work</span>
            <AutoTag />
          </div>
          <button onClick={() => setEditingTasks(!editingTasks)} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--hydrant)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {editingTasks ? 'Done' : 'Edit'}
          </button>
        </div>
        {editingTasks ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tasks.map((task, i) => (
              <input
                key={i}
                value={task}
                onChange={e => setTasks(tasks.map((t, j) => j === i ? e.target.value : t))}
                style={{ width: '100%', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', padding: '8px 10px', background: 'var(--paper)', border: '1.5px solid var(--line)', borderRadius: 8, outline: 'none', boxSizing: 'border-box' }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {tasks.map((task, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '9px 0', borderBottom: i < tasks.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', flexShrink: 0, width: 18 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 14, color: 'var(--ink)' }}>{task}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bring */}
      <div style={{ margin: '12px 22px 0', padding: '16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>Bring</span>
            <AutoTag />
          </div>
          <button onClick={() => setEditingBring(!editingBring)} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--hydrant)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {editingBring ? 'Done' : 'Edit'}
          </button>
        </div>
        {editingBring ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bring.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <input value={row.key} onChange={e => setBring(bring.map((b, j) => j === i ? { ...b, key: e.target.value } : b))} style={{ width: 90, fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', padding: '7px 8px', background: 'var(--paper)', border: '1.5px solid var(--line)', borderRadius: 6, outline: 'none', textTransform: 'uppercase' }} />
                <input value={row.value} onChange={e => setBring(bring.map((b, j) => j === i ? { ...b, value: e.target.value } : b))} style={{ flex: 1, fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', padding: '7px 10px', background: 'var(--paper)', border: '1.5px solid var(--line)', borderRadius: 6, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {bring.map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < bring.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{row.key}</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)' }}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rate */}
      <div style={{ margin: '12px 22px 0', padding: '16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mute)' }}>Rate</span>
          <AutoTag label="Suggested" />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 44, color: 'var(--ink)', letterSpacing: '-0.06em', lineHeight: 1 }}>${rate}</span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)' }}>/hr · pre-tips</span>
        </div>
        <RateBar low={draft.rate.low} high={draft.rate.high} suggested={rate} />
        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          {[draft.rate.low, draft.rate.suggested, draft.rate.high].map(r => (
            <button key={r} onClick={() => setRate(r)} style={{
              flex: 1, padding: '8px 0', borderRadius: 8,
              border: rate === r ? 'none' : '2px solid var(--line)',
              background: rate === r ? 'var(--ink)' : 'transparent',
              fontFamily: 'var(--body)', fontWeight: 700, fontSize: 13,
              color: rate === r ? '#fff' : 'var(--mute)',
              cursor: 'pointer',
            }}>
              ${r}
            </button>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--mute)', marginTop: 10 }}>{draft.rate.note}</p>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 22px 0' }}>
        <button onClick={onPost} style={{
          width: '100%', padding: '16px',
          background: 'var(--hydrant)', color: '#fff', borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18,
          border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
        }}>
          Post It →
        </button>
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 10 }}>
          Workers in your area will be notified immediately.
        </p>
      </div>
    </div>
  );
}

function PostedStep({ role, time }: { role: string; time: string }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 22px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--hydrant)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10 }}>✦ Live now</span>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 56, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 0.9, marginBottom: 16 }}>
          Posted.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mute)', lineHeight: 1.6, marginBottom: 28 }}>
          18 workers in Bed-Stuy have been notified.<br />
          You&apos;ll get a ping when someone locks in.
        </p>

        {/* Mini listing preview */}
        <div style={{ padding: '16px', background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14, marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Padmore&apos;s Coffee</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.03em' }}>{role} · {time}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 2 }}>Today · Bed-Stuy</div>
            </div>
            <div style={{ background: 'var(--hydrant-soft)', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--hydrant)' }} />
              <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--hydrant)', textTransform: 'uppercase' }}>0 / 1 filled</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/employer/roster" style={{
            flex: 1, padding: '14px', borderRadius: 99,
            background: 'var(--ink)', color: '#fff',
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15,
            textDecoration: 'none', textAlign: 'center', letterSpacing: '-0.01em',
          }}>View Roster</Link>
          <Link href="/business/post" style={{
            flex: 1, padding: '14px', borderRadius: 99,
            border: '2px solid var(--ink)', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15,
            textDecoration: 'none', textAlign: 'center', letterSpacing: '-0.01em',
          }}>Post Another</Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessPost() {
  const [step, setStep] = useState<Step>('input');
  const [role, setRole] = useState('Barista');
  const [time, setTime] = useState('11A – 4P');
  const [count, setCount] = useState(1);
  const [draft, setDraft] = useState<DraftData>(getDraft('Barista'));

  function handleDraft(r: string, brief: string, t: string, c: number) {
    setRole(r); setTime(t); setCount(c);
    setDraft(getDraft(r));
    setStep('drafting');
  }

  useEffect(() => {
    if (step === 'drafting') {
      const timer = setTimeout(() => setStep('review'), 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const navTitle = step === 'input' ? 'New Posting' : step === 'drafting' ? 'Drafting...' : step === 'review' ? 'Review Draft' : 'Posted';

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadein 0.35s ease both; }
      `}</style>

      {/* Nav */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <StatusBar time="10:12" />
        <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          {step !== 'posted' ? (
            <button onClick={() => setStep(step === 'review' ? 'input' : 'input')} style={{ fontSize: 20, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', width: 32, padding: 0 }}>←</button>
          ) : <div style={{ width: 32 }} />}
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{navTitle}</span>
          <div style={{ width: 32 }} />
        </div>
      </div>

      <div className="fade-in" key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {step === 'input' && <InputStep onDraft={handleDraft} />}
        {step === 'drafting' && <DraftingStep />}
        {step === 'review' && <ReviewStep role={role} time={time} count={count} draft={draft} onPost={() => setStep('posted')} />}
        {step === 'posted' && <PostedStep role={role} time={time} />}
      </div>

      {step !== 'posted' && <EmployerNav active="post" />}
    </div>
  );
}
