import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';

const ACTIVE_SHIFTS = [
  { role: 'Barista', time: 'Today · 11A–4P', workers: 2, status: 'En route', eta: '6 min' },
];

const RECENT = [
  { date: 'Mon 12 May', role: 'Barista', workers: 2, total: '$280.', rating: 4.9 },
  { date: 'Sat 10 May', role: 'Server', workers: 3, total: '$288.', rating: 4.7 },
  { date: 'Thu 8 May', role: 'Barback', workers: 1, total: '$128.', rating: 5.0 },
  { date: 'Mon 5 May', role: 'Bartender', workers: 2, total: '$312.', rating: 4.8 },
];

const SAVED_WORKERS = [
  { initials: 'MR', name: 'Marco R.', role: 'Barista', rating: '4.9', bg: '#3DD87C' },
  { initials: 'SO', name: 'Sam O.', role: 'Server', rating: '4.8', bg: '#2D6A4F' },
  { initials: 'JL', name: 'Jules L.', role: 'Host', rating: '4.9', bg: '#0D0E12' },
];

export default function EmployerDashboard() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper-2)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <StatusBar time="10:12" />

      {/* Header */}
      <div style={{ background: 'var(--ink)', padding: '20px 22px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Good morning</div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 26, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>Padmore's Coffee</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>172 Tompkins Ave · Bed-Stuy</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--hydrant)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 16, color: '#fff' }}>PC</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            { label: 'Shifts', value: '14' },
            { label: 'Workers', value: '8' },
            { label: 'Avg ★', value: '4.8' },
            { label: 'Spent', value: '$2.1k' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '12px 0', textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Post a shift CTA */}
      <div style={{ padding: '16px 16px 0' }}>
        <Link href="/employer/post-shift" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', background: 'var(--hydrant)', borderRadius: 14,
          textDecoration: 'none',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.02em' }}>Post a shift</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>Workers confirmed in minutes</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 99, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Active shifts */}
      {ACTIVE_SHIFTS.length > 0 && (
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 10, padding: '0 4px' }}>Active now</div>
          {ACTIVE_SHIFTS.map((s, i) => (
            <Link key={i} href="/employer/roster" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--paper)', borderRadius: 14, border: '1px solid var(--line)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#16A34A', flexShrink: 0, boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{s.role} · {s.workers} workers</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>{s.time}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: '#16A34A' }}>{s.status}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginTop: 1 }}>{s.eta}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Saved workers */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>Your go-to workers</div>
          <Link href="/employer/live-map" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hydrant)', fontWeight: 600, textDecoration: 'none' }}>Find more →</Link>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {SAVED_WORKERS.map((w, i) => (
            <div key={i} style={{ flex: 1, background: 'var(--paper)', borderRadius: 12, border: '1px solid var(--line)', padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: w.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 15, color: '#fff' }}>{w.initials}</span>
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{w.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginTop: 2 }}>{w.role}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hydrant)', fontWeight: 600, marginTop: 4 }}>{w.rating}★</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent shifts */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 10, padding: '0 4px' }}>Recent shifts</div>
        <div style={{ background: 'var(--paper)', borderRadius: 14, border: '1px solid var(--line)', overflow: 'hidden' }}>
          {RECENT.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: i < RECENT.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{r.role} · {r.workers} worker{r.workers > 1 ? 's' : ''}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', marginTop: 2 }}>{r.date}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{r.total}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--hydrant)', marginTop: 1 }}>{r.rating}★</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EmployerNav active="dashboard" />
    </div>
  );
}
