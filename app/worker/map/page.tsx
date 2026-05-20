'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

const SHIFTS = [
  {
    name: "Padmore's Coffee",
    shortName: "Padmore's",
    neighborhood: 'BedStuy',
    distance: '0.6 MI',
    description: 'Coffee bar needs a skilled barista for the lunch rush. Latte art experience preferred. Wear all black.',
    role: 'Barista for the lunch rush',
    type: 'Barista',
    meta: 'G · 25 MIN · 0.6 MI',
    pay: '$140',
    rate: '$28/HR',
    hours: '11A–4P',
    date: 'Today',
    posting: '#4471',
    bg: 'linear-gradient(135deg, #c4a577 0%, #8b6545 60%, #5c3d22 100%)',
    cardBg: '#EAD5B8',
    rating: '4.9',
    urgent: false,
    priority: false,
    pinX: 185, pinY: 120,
    pinDark: true,
  },
  {
    name: 'The Wren',
    shortName: 'The Wren',
    neighborhood: 'BedStuy',
    distance: '0.4 MI',
    description: 'Upscale bistro needs a server for a full lunch service. 2+ years fine dining experience required.',
    role: 'Server for lunch service',
    type: 'Server',
    meta: 'G · 18 MIN · 0.4 MI',
    pay: '$96',
    rate: '$24/HR',
    hours: '11A–3P',
    date: 'Today',
    posting: '#4468',
    bg: 'linear-gradient(135deg, #a8c4a0 0%, #6b9e62 60%, #4a7040 100%)',
    cardBg: '#C2DCC0',
    rating: '4.7',
    urgent: false,
    priority: false,
    pinX: 270, pinY: 90,
    pinDark: false,
  },
  {
    name: 'Bar Blondeau',
    shortName: 'Bar Blondeau',
    neighborhood: 'Williamsburg',
    distance: '1.1 MI',
    description: 'Barista to cover for private event. Wear all black, no logos. 2–3 years experience preferred.',
    role: 'Barback for dinner service',
    type: 'Barback',
    meta: 'L · 22 MIN · 1.1 MI',
    pay: '$120',
    rate: '$24/HR',
    hours: '6P–12A',
    date: 'Today',
    posting: '#4469',
    bg: 'linear-gradient(135deg, #b8a0c8 0%, #8060a0 60%, #5a3c78 100%)',
    cardBg: '#D0C0E4',
    rating: '4.8',
    urgent: true,
    priority: true,
    pinX: 340, pinY: 140,
    pinDark: false,
    pinAccent: true,
  },
  {
    name: 'Peoples Wine',
    shortName: 'Peoples Wine',
    neighborhood: 'Crown Heights',
    distance: '0.3 MI',
    description: 'Wine shop needs floor staff for afternoon retail coverage. Knowledge of natural wine is a plus.',
    role: 'Retail floor this afternoon',
    type: 'Retail',
    meta: 'A/C · 14 MIN · 0.3 MI',
    pay: '$85',
    rate: '$22/HR',
    hours: '2P–6P',
    date: 'Today',
    posting: '#4462',
    bg: 'linear-gradient(135deg, #f0c080 0%, #c88040 60%, #906020 100%)',
    cardBg: '#F2E0A0',
    rating: '4.6',
    urgent: false,
    priority: false,
    pinX: 60, pinY: 205,
    pinDark: false,
  },
];

export default function WorkerMap() {
  const [sheetCollapsed, setSheetCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tappedPin, setTappedPin] = useState<string | null>(null);

  const mapHeight = sheetCollapsed ? 'calc(100vh - 148px)' : 280;

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

          {/* Location pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--paper-2)', border: '2px solid var(--ink)', borderRadius: 99, padding: '6px 12px 6px 14px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Bed-Stuy · 2 mi</span>
            <div style={{ background: '#72c15f', borderRadius: 99, padding: '3px 8px' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>18 ready</span>
            </div>
          </div>

          {/* Map / List toggle */}
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

        {/* Chip filter row */}
        <div className="chip-row" style={{ padding: '10px 16px', gap: 6 }}>
          {['All', '♥ Faves', 'Today', '$25+/hr', 'Barista'].map(label => (
            <div key={label} className={`chip${label === 'All' ? ' active' : ''}`} style={{ flexShrink: 0 }}>{label}</div>
          ))}
        </div>
      </div>

      {/* ─── MAP VIEW ─── */}
      {viewMode === 'map' && (
        <>
          {/* Map canvas */}
          <div onClick={() => setTappedPin(null)} style={{
            height: mapHeight,
            position: 'relative',
            flexShrink: 0,
            transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
            overflow: 'hidden',
          }}>
            <svg width="390" height="100%" viewBox="0 0 390 260" preserveAspectRatio="xMidYMid slice" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <rect width="390" height="260" fill="#E8EAF0" />
              <rect x="0" y="58" width="390" height="12" fill="white" opacity="0.8" />
              <rect x="0" y="120" width="390" height="10" fill="white" opacity="0.8" />
              <rect x="0" y="182" width="390" height="10" fill="white" opacity="0.8" />
              <rect x="60" y="0" width="10" height="260" fill="white" opacity="0.8" />
              <rect x="140" y="0" width="10" height="260" fill="white" opacity="0.8" />
              <rect x="220" y="0" width="10" height="260" fill="white" opacity="0.8" />
              <rect x="300" y="0" width="10" height="260" fill="white" opacity="0.8" />
              <rect x="365" y="0" width="10" height="260" fill="white" opacity="0.8" />
              <rect x="0" y="0" width="58" height="56" rx="2" fill="#D8DAE4" />
              <rect x="72" y="0" width="66" height="56" rx="2" fill="#D4D6E0" />
              <rect x="150" y="0" width="68" height="56" rx="2" fill="#DADBEB" />
              <rect x="230" y="0" width="68" height="56" rx="2" fill="#D8DAE4" />
              <rect x="310" y="0" width="53" height="56" rx="2" fill="#D4D6E0" />
              <rect x="0" y="70" width="58" height="48" rx="2" fill="#D4D6E4" />
              <rect x="72" y="70" width="66" height="48" rx="2" fill="#DDE4D8" />
              <rect x="150" y="70" width="68" height="48" rx="2" fill="#D8DAE4" />
              <rect x="230" y="70" width="68" height="48" rx="2" fill="#D4D6E0" />
              <rect x="310" y="70" width="53" height="48" rx="2" fill="#DDE4D8" />
              <rect x="0" y="130" width="58" height="50" rx="2" fill="#D8DAE4" />
              <rect x="72" y="130" width="66" height="50" rx="2" fill="#D4D6E0" />
              <rect x="150" y="130" width="68" height="50" rx="2" fill="#DADBEB" />
              <rect x="230" y="130" width="68" height="50" rx="2" fill="#DDE4D8" />
              <rect x="310" y="130" width="53" height="50" rx="2" fill="#D4D6E0" />
              <rect x="0" y="192" width="58" height="68" rx="2" fill="#D4D6E0" />
              <rect x="72" y="192" width="66" height="68" rx="2" fill="#D8DAE4" />
              <rect x="150" y="192" width="68" height="68" rx="2" fill="#D4D6E0" />
              <rect x="230" y="192" width="68" height="68" rx="2" fill="#DADBEB" />
              <rect x="310" y="192" width="53" height="68" rx="2" fill="#D8DAE4" />
              <path d="M 40 260 Q 80 220 120 180 Q 160 140 195 110 Q 220 88 240 70" stroke="#72c15f" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" opacity="0.85" />
              <circle cx="110" cy="155" r="8" fill="white" opacity="0.9" />
              <circle cx="110" cy="155" r="5" fill="#72c15f" />
              <circle cx="110" cy="155" r="2" fill="white" />
            </svg>

            <div style={{ position: 'absolute', left: 110, top: 155, transform: 'translate(-50%,-50%)', width: 10, height: 10 }}>
              <div className="me-pulse-ring" />
            </div>

            {SHIFTS.map(shift => (
              <div
                key={shift.posting}
                onClick={e => { e.stopPropagation(); setTappedPin(tappedPin === shift.posting ? null : shift.posting); }}
                style={{
                  position: 'absolute',
                  left: shift.pinX,
                  top: shift.pinY,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: tappedPin === shift.posting ? 20 : 10,
                }}
              >
                {/* Dot */}
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: shift.priority ? 'var(--hydrant)' : 'var(--ink)',
                  border: '2.5px solid #fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                }} />

                {/* Mini card on tap */}
                {tappedPin === shift.posting && (
                  <div style={{
                    position: 'absolute',
                    bottom: 22,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--paper)',
                    border: '2px solid var(--ink)',
                    borderRadius: 12,
                    padding: '10px 14px',
                    minWidth: 160,
                    zIndex: 30,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginBottom: 4 }}>{shift.name}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginBottom: 2 }}>{shift.type} · {shift.hours}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.04em' }}>{shift.pay}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)' }}>{shift.rate}</span>
                    </div>
                    {/* Tail */}
                    <div style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, background: 'var(--paper)', border: '2px solid var(--ink)', borderTop: 'none', borderLeft: 'none', rotate: '45deg' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom sheet */}
          <div style={{
            background: 'var(--card)',
            borderRadius: '18px 18px 0 0',
            boxShadow: '0 -4px 32px rgba(13,14,18,0.12)',
            flex: sheetCollapsed ? '0 0 auto' : 1,
            transition: 'flex 0.35s cubic-bezier(0.4,0,0.2,1)',
            minHeight: sheetCollapsed ? 0 : undefined,
            paddingBottom: 80,
          }}>
            {/* Tappable handle */}
            <button
              onClick={() => setSheetCollapsed(c => !c)}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '10px 0 6px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line-2)' }} />
            </button>

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '4px 22px 8px' }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                18 ready now.
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>avg $23/hr</span>
            </div>

            {!sheetCollapsed && (
              <>
                {/* Rank strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--ink)', padding: '10px 22px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: '#fff' }}>#4. You</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>2 more shifts to climb to #2</span>
                </div>

                {/* Shift list */}
                <ShiftList shifts={SHIFTS} />
              </>
            )}
          </div>
        </>
      )}

      {/* ─── LIST VIEW ─── */}
      {viewMode === 'list' && (
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80, background: 'var(--paper)' }}>

          {/* Header */}
          <div style={{ padding: '20px 20px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--mute)', letterSpacing: '0.04em' }}>BedStuy, Brooklyn</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--mute)', letterSpacing: '0.04em' }}>78F Sunny</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: 99, background: 'var(--hydrant)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 26, color: '#fff', letterSpacing: '-0.04em' }}>18</span>
              </div>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1, whiteSpace: 'nowrap' }}>Shifts Available</span>
            </div>
          </div>

          {/* Stacked wallet cards */}
          {(() => {
            const PEEK = 82;
            const EXPANDED_H = 300;
            const n = SHIFTS.length;
            const containerH = expandedId
              ? PEEK * (n - 1) + EXPANDED_H
              : PEEK * (n - 1) + PEEK + 40;
            return (
              <div style={{ position: 'relative', height: containerH, margin: '0 16px 80px', transition: 'height 0.3s ease' }}>
                {SHIFTS.map((shift, i) => {
                  const isExpanded = expandedId === shift.posting;
                  const isPriority = shift.priority;
                  return (
                    <div
                      key={shift.posting}
                      onClick={() => setExpandedId(isExpanded ? null : shift.posting)}
                      style={{
                        position: 'absolute',
                        top: i * PEEK,
                        left: 0, right: 0,
                        zIndex: isExpanded ? 99 : i + 1,
                        background: isPriority ? 'var(--ink)' : 'var(--paper)',
                        borderRadius: '18px 18px 0 0',
                        border: isPriority ? '2px solid var(--hydrant)' : '2px solid var(--ink)',
                        boxShadow: 'none',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Main row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 20px', gap: 12 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: isPriority ? '#fff' : 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                            {shift.shortName}
                          </div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600, color: isPriority ? 'rgba(255,255,255,0.4)' : 'var(--mute)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 5 }}>
                            {shift.neighborhood} · {shift.distance}
                          </div>
                          {isPriority && (
                            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, color: 'var(--hydrant)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>Priority Fill</div>
                          )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                          <div style={{ background: isPriority ? 'var(--hydrant)' : 'var(--ink)', borderRadius: 99, padding: '8px 14px' }}>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>
                              {shift.type} {shift.hours}
                            </span>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 28, color: isPriority ? '#fff' : 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>
                            {shift.pay}
                          </div>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 600, color: isPriority ? 'rgba(255,255,255,0.4)' : 'var(--mute)', textTransform: 'uppercase', marginTop: 4 }}>
                            {shift.rate}
                          </div>
                        </div>
                      </div>

                      {/* Expanded */}
                      {isExpanded && (
                        <div style={{ padding: '0 20px 20px' }}>
                          <div style={{ height: 1, background: isPriority ? 'rgba(255,255,255,0.1)' : 'var(--line)', marginBottom: 16 }} />
                          <p style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 18, color: isPriority ? 'rgba(255,255,255,0.85)' : 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.35, margin: '0 0 18px' }}>
                            {shift.description}
                          </p>
                          <Link
                            href="/worker/job-detail"
                            onClick={e => e.stopPropagation()}
                            style={{ display: 'block', textAlign: 'center', padding: '14px', background: isPriority ? 'var(--hydrant)' : 'var(--ink)', color: '#fff', borderRadius: 99, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, textDecoration: 'none', letterSpacing: '-0.02em' }}
                          >
                            View shift →
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

      <BottomNav active="shifts" />
    </div>
  );
}

function ShiftList({ shifts }: { shifts: typeof SHIFTS }) {
  return (
    <div style={{ padding: '10px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {shifts.map(shift => (
        <Link key={shift.posting} href="/worker/job-detail" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{
            background: shift.cardBg,
            borderRadius: 18,
            padding: '16px 16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            {/* Top: logo + name + pay */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: shift.bg, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{shift.name}</div>
                  {shift.urgent && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>urgent</span>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>{shift.pay}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(13,14,18,0.5)' }}>{shift.rate}</div>
              </div>
            </div>
            {/* Role */}
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {shift.role}
            </div>
            {/* Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(13,14,18,0.55)', fontWeight: 600 }}>{shift.date} · {shift.hours}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(13,14,18,0.55)', fontWeight: 600 }}>{shift.meta}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
