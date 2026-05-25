'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';
import ShiftCard, { CompactCard, ShiftFamily } from '@/app/components/ShiftCard';

const SHIFTS = [
  {
    name: "Padmore's Coffee",
    shortName: "Padmore's",
    loc: 'Bedstuy, BK',
    distance: '0.6 MI',
    brief: ['Coffee bar needs a barista for the lunch rush.', 'Latte art experience preferred.', 'Wear all black.'],
    type: 'Barista',
    pay: '$140',
    rate: '$28/HR',
    hours: '11A–4P',
    posting: '#4471',
    priority: false,
    pinX: 185, pinY: 120,
  },
  {
    name: 'The Wren',
    shortName: 'The Wren',
    loc: 'Bedstuy, BK',
    distance: '0.4 MI',
    brief: ['Upscale bistro · full lunch service.', '2+ years fine dining required.'],
    type: 'Server',
    pay: '$96',
    rate: '$24/HR',
    hours: '11A–3P',
    posting: '#4468',
    priority: false,
    pinX: 270, pinY: 90,
  },
  {
    name: 'Bar Blondeau',
    shortName: 'Bar Blondeau',
    loc: 'Williamsburg, BK',
    distance: '1.1 MI',
    brief: ['Last-minute call-out, starts in 1h 24m.', 'Walking distance from L train.', 'Tip pool included.'],
    type: 'Barback',
    pay: '$120',
    rate: '$24/HR',
    hours: '6P–12A',
    posting: '#4469',
    priority: true,
    pinX: 340, pinY: 140,
  },
  {
    name: 'Peoples Wine',
    shortName: 'Peoples Wine',
    loc: 'Crown Heights, BK',
    distance: '0.3 MI',
    brief: ['Wine shop · afternoon coverage.', 'Natural wine knowledge a plus.'],
    type: 'Retail',
    pay: '$85',
    rate: '$22/HR',
    hours: '2P–6P',
    posting: '#4462',
    priority: false,
    pinX: 60, pinY: 205,
  },
];

function familyFor(role: string): ShiftFamily {
  const r = role.toLowerCase();
  if (/bartend|barback|barista/.test(r)) return 'bar';
  if (/cook|prep|dish/.test(r)) return 'kitchen';
  if (/server|host/.test(r)) return 'floor';
  if (/cater|pop-?up|event/.test(r)) return 'event';
  if (/cashier|security|retail|counter/.test(r)) return 'counter';
  return 'bar';
}

export default function WorkerMap() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [tappedPin, setTappedPin] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper-2)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes me-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .me-pulse-ring {
          position: absolute; inset: -4px; border-radius: 50%;
          background: #72c15f; animation: me-pulse 2s ease-out infinite;
        }
      `}</style>

      {/* Sticky header */}
      <div style={{ background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 20 }}>
        <StatusBar time="10:12" />

        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: '1px solid var(--line)' }}>
          <Link href="/" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', textDecoration: 'none', fontSize: 20 }}>←</Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--paper-2)', border: '2px solid var(--ink)', borderRadius: 99, padding: '6px 12px 6px 14px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Bed-Stuy · 2 mi</span>
            <div style={{ background: '#72c15f', borderRadius: 99, padding: '3px 8px' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>18 ready</span>
            </div>
          </div>

          <div style={{ display: 'flex', background: 'var(--paper-3)', borderRadius: 8, padding: 2, gap: 2 }}>
            <button
              onClick={() => setViewMode('map')}
              style={{
                width: 32, height: 28, borderRadius: 6, border: 'none', cursor: 'pointer',
                background: viewMode === 'map' ? 'var(--paper)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: viewMode === 'map' ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--hydrant)' : 'var(--mute)'} />
                <rect x="8" y="1" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--hydrant)' : 'var(--mute)'} />
                <rect x="1" y="8" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--hydrant)' : 'var(--mute)'} />
                <rect x="8" y="8" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--hydrant)' : 'var(--mute)'} />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                width: 32, height: 28, borderRadius: 6, border: 'none', cursor: 'pointer',
                background: viewMode === 'list' ? 'var(--paper)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="2" rx="1" fill={viewMode === 'list' ? 'var(--hydrant)' : 'var(--mute)'} />
                <rect x="1" y="6" width="12" height="2" rx="1" fill={viewMode === 'list' ? 'var(--hydrant)' : 'var(--mute)'} />
                <rect x="1" y="10" width="12" height="2" rx="1" fill={viewMode === 'list' ? 'var(--hydrant)' : 'var(--mute)'} />
              </svg>
            </button>
          </div>
        </div>

        <div className="chip-row" style={{ padding: '10px 16px', gap: 6 }}>
          {['All', '♥ Faves', 'Today', '$25+/hr', 'Barista'].map(label => (
            <div key={label} className={`chip${label === 'All' ? ' active' : ''}`} style={{ flexShrink: 0 }}>{label}</div>
          ))}
        </div>
      </div>

      {/* ─── MAP VIEW ─── */}
      {viewMode === 'map' && (
        <div onClick={() => setTappedPin(null)} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9618%2C40.6772%2C-73.9218%2C40.6972&layer=mapnik"
            style={{ width: '100%', height: '100%', border: 'none', filter: 'grayscale(50%)' }}
            title="Map"
          />

          <div style={{ position: 'absolute', left: '28%', top: '60%', transform: 'translate(-50%,-50%)', width: 10, height: 10 }}>
            <div className="me-pulse-ring" />
            <div style={{ position: 'relative', width: 10, height: 10, borderRadius: '50%', background: 'var(--hydrant)', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', zIndex: 1 }} />
          </div>

          {SHIFTS.map(shift => (
            <div
              key={shift.posting}
              onClick={e => { e.stopPropagation(); setTappedPin(tappedPin === shift.posting ? null : shift.posting); }}
              style={{
                position: 'absolute', left: shift.pinX, top: shift.pinY,
                transform: 'translate(-50%, -50%)', cursor: 'pointer',
                zIndex: tappedPin === shift.posting ? 20 : 10,
              }}
            >
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: shift.priority ? 'var(--hydrant)' : 'var(--ink)',
                border: '2.5px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
              }} />

              {tappedPin === shift.posting && (
                <div style={{
                  position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 12,
                  padding: '10px 14px', minWidth: 160, zIndex: 30,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)', whiteSpace: 'nowrap',
                }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginBottom: 4 }}>{shift.name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginBottom: 2 }}>{shift.type} · {shift.hours}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.04em' }}>{shift.pay}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>{shift.rate}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, background: 'var(--paper)', border: '2px solid var(--ink)', borderTop: 'none', borderLeft: 'none', rotate: '45deg' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ─── LIST VIEW ─── */}
      {viewMode === 'list' && (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, background: 'var(--paper)' }}>

          {/* Header */}
          <div style={{ padding: '20px 20px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>BedStuy, Brooklyn</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>78F Sunny</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 44, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>18</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}>shifts<br />ready.</span>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px 20px' }}>

            {/* Compact invite row at top */}
            <CompactCard
              icon="W"
              title="Wade @ Padmore's"
              sub="Asked you to cover tonight"
              cta={{ label: 'Accept', href: '/worker/confirm' }}
            />

            {/* Pending application */}
            <ShiftCard
              state="pending"
              role="Server"
              time="7P — 1A"
              loc="Greenpoint, BK"
              venue="Le Crocodile"
              brief={['Applied 14 min ago.', 'Awaiting confirmation.']}
              pay="$168"
              rate="$24/h + tips"
              statusLabel="Pending"
            />

            {/* Available shifts */}
            {SHIFTS.map(shift => (
              <ShiftCard
                key={shift.posting}
                family={familyFor(shift.type)}
                state={shift.priority ? 'urgent' : undefined}
                role={shift.type}
                time={shift.hours}
                loc={shift.loc}
                venue={shift.shortName}
                brief={shift.brief}
                pay={shift.pay}
                rate={shift.rate}
                rateNote={shift.priority ? 'tap to fill' : undefined}
                href="/worker/job-detail"
              />
            ))}
          </div>
        </div>
      )}

      <BottomNav active="shifts" />
    </div>
  );
}
