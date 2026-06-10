'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';
import ShiftCard, { CompactCard, ShiftFamily } from '@/app/components/ShiftCard';

const SHIFTS = [
  { name: "Padmore's Coffee",  shortName: "Padmore's",      loc: 'Bedstuy, BK',        type: 'Barista',   hours: '11A–4P',  pay: '$140', rate: '$28/HR', brief: ['Coffee bar needs a barista for the lunch rush.', 'Latte art experience preferred.', 'Wear all black.'],         priority: false, pinX: 195, pinY: 380 },
  { name: 'The Wren',          shortName: 'The Wren',        loc: 'Bedstuy, BK',        type: 'Server',    hours: '11A–3P',  pay: '$96',  rate: '$24/HR', brief: ['Upscale bistro · full lunch service.', '2+ years fine dining required.'],                                       priority: false, pinX: 255, pinY: 320 },
  { name: 'Bar Blondeau',      shortName: 'Bar Blondeau',    loc: 'Williamsburg, BK',   type: 'Barback',   hours: '6P–12A',  pay: '$120', rate: '$24/HR', brief: ['Last-minute call-out, starts in 1h 24m.', 'Tip pool included.'],                                                priority: true,  pinX: 315, pinY: 255 },
  { name: 'Peoples Wine',      shortName: 'Peoples Wine',    loc: 'Crown Heights, BK',  type: 'Retail',    hours: '2P–6P',   pay: '$85',  rate: '$22/HR', brief: ['Wine shop · afternoon coverage.', 'Natural wine knowledge a plus.'],                                             priority: false, pinX: 135, pinY: 455 },
  { name: 'Sunday in Brooklyn',shortName: 'Sunday',          loc: 'Williamsburg, BK',   type: 'Prep Cook', hours: '8A–2P',   pay: '$105', rate: '$21/HR', brief: ['Brunch prep, station setup.', 'Starts early — be ready.'],                                                       priority: false, pinX: 288, pinY: 195 },
  { name: 'Olmsted',           shortName: 'Olmsted',         loc: 'Prospect Heights, BK',type: 'Server',   hours: '6P–11P',  pay: '$130', rate: '$26/HR', brief: ['Seasonal tasting menu service.', 'Fine dining experience required.'],                                            priority: false, pinX: 118, pinY: 515 },
  { name: 'Café Mogador',      shortName: 'Café Mogador',    loc: 'Williamsburg, BK',   type: 'Barista',   hours: '9A–3P',   pay: '$110', rate: '$22/HR', brief: ['Brunch rush, espresso + floor.', 'Busy — needs someone experienced.'],                                           priority: false, pinX: 268, pinY: 168 },
  { name: 'Llama Inn',         shortName: 'Llama Inn',       loc: 'Williamsburg, BK',   type: 'Bartender', hours: '5P–12A',  pay: '$175', rate: '$28/HR', brief: ['Full bar · cocktail service.', 'High volume Fri/Sat energy.'],                                                   priority: false, pinX: 335, pinY: 355 },
  { name: 'June Wine Bar',     shortName: 'June',            loc: 'Crown Heights, BK',  type: 'Server',    hours: '6P–12A',  pay: '$140', rate: '$26/HR', brief: ['Natural wine bar.', 'Laid back but knowledgeable crowd.'],                                                       priority: false, pinX: 172, pinY: 565 },
  { name: 'Chez Ma Tante',     shortName: 'Chez Ma Tante',   loc: 'Greenpoint, BK',     type: 'Host',      hours: '5P–10P',  pay: '$90',  rate: '$22/HR', brief: ['Front of house — greet and seat.', 'Relaxed, neighborhood vibe.'],                                              priority: false, pinX: 348, pinY: 158 },
  { name: 'Lilia',             shortName: 'Lilia',           loc: 'Williamsburg, BK',   type: 'Barback',   hours: '5P–1A',   pay: '$115', rate: '$23/HR', brief: ['Busy Italian spot.', 'Keep the bar stocked and clean.'],                                                         priority: false, pinX: 352, pinY: 425 },
  { name: 'Laser Wolf',        shortName: 'Laser Wolf',      loc: 'Williamsburg, BK',   type: 'Server',    hours: '5P–11P',  pay: '$155', rate: '$28/HR', brief: ['Israeli grill, rooftop.', 'High check average — good tip night.'],                                              priority: true,  pinX: 298, pinY: 495 },
  { name: "Rolo's",            shortName: "Rolo's",          loc: 'Bushwick, BK',       type: 'Line Cook', hours: '10A–4P',  pay: '$120', rate: '$24/HR', brief: ['Counter-service lunch.', 'Fast pace, clean station expected.'],                                                  priority: false, pinX: 78,  pinY: 398 },
  { name: 'Rule of Thirds',    shortName: 'Rule of Thirds',  loc: 'Greenpoint, BK',     type: 'Bartender', hours: '6P–1A',   pay: '$168', rate: '$28/HR', brief: ['Japanese whisky bar.', 'Sake knowledge a bonus.'],                                                               priority: false, pinX: 358, pinY: 298 },
  { name: 'Everyday Atelier',  shortName: 'Everyday',        loc: 'Crown Heights, BK',  type: 'Cashier',   hours: '10A–6P',  pay: '$80',  rate: '$20/HR', brief: ['Boutique retail, steady weekend traffic.', 'No experience necessary.'],                                          priority: false, pinX: 112, pinY: 278 },
  { name: 'Colonia Verde',     shortName: 'Colonia Verde',   loc: 'Fort Greene, BK',    type: 'Server',    hours: '11A–4P',  pay: '$95',  rate: '$24/HR', brief: ['Latin brunch service.', 'Friendly crowd, good energy.'],                                                         priority: false, pinX: 72,  pinY: 535 },
  { name: "Cervo's",           shortName: "Cervo's",         loc: 'Park Slope, BK',     type: 'Barista',   hours: '9A–2P',   pay: '$88',  rate: '$22/HR', brief: ['Morning shift, espresso focus.', 'Small team — self-starter preferred.'],                                        priority: false, pinX: 218, pinY: 608 },
  { name: 'Otway',             shortName: 'Otway',           loc: 'Clinton Hill, BK',   type: 'Host',      hours: '6P–11P',  pay: '$85',  rate: '$21/HR', brief: ['Neighborhood bistro.', 'Warm, confident presence needed.'],                                                      priority: false, pinX: 152, pinY: 200 },
];

function familyFor(role: string): ShiftFamily {
  const r = role.toLowerCase();
  if (/bartend|barback|barista/.test(r)) return 'bar';
  if (/cook|prep|dish/.test(r)) return 'kitchen';
  if (/server|host/.test(r)) return 'floor';
  if (/cater|pop-?up|event/.test(r)) return 'event';
  return 'counter';
}

type Shift = typeof SHIFTS[0];

function PinSheet({ shift, onClose }: { shift: Shift; onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 105, background: 'rgba(0,0,0,0.35)' }} />
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390,
        background: 'var(--paper)',
        borderRadius: '20px 20px 0 0',
        padding: '16px 14px 100px',
        zIndex: 110,
        animation: 'slideUp 0.3s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line-2)', margin: '0 auto 16px' }} />
        <ShiftCard
          family={familyFor(shift.type)}
          state={shift.priority ? 'urgent' : undefined}
          role={shift.type}
          time={shift.hours}
          loc={shift.loc}
          venue={shift.shortName}
          brief={shift.brief}
          pay={shift.pay}
          rate={shift.rate}
        />
        <Link href="/worker/job-detail" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', padding: '15px',
          marginTop: 10,
          background: 'var(--ink)', color: '#fff',
          borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16,
          textDecoration: 'none', letterSpacing: '-0.01em',
        }}>View Full Listing →</Link>
      </div>
    </>
  );
}

const ROLES = ['All', 'Barista', 'Bartender', 'Server', 'Barback', 'Host', 'Cook'];
const NEIGHBORHOODS = ['All', 'Bed-Stuy', 'Williamsburg', 'Crown Heights', 'Greenpoint', 'Bushwick', 'Fort Greene', 'Clinton Hill', 'Park Slope', 'Prospect Heights'];
const NEIGHBORHOOD_MATCH: Record<string, string> = {
  'Bed-Stuy': 'Bedstuy',
  'Williamsburg': 'Williamsburg',
  'Crown Heights': 'Crown Heights',
  'Greenpoint': 'Greenpoint',
  'Bushwick': 'Bushwick',
  'Fort Greene': 'Fort Greene',
  'Clinton Hill': 'Clinton Hill',
  'Park Slope': 'Park Slope',
  'Prospect Heights': 'Prospect Heights',
};

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  'All':       { bg: 'var(--ink)',        color: '#fff' },
  'Barista':   { bg: 'var(--green-soft)', color: 'var(--ink)' },
  'Bartender': { bg: 'var(--green-soft)', color: 'var(--ink)' },
  'Server':    { bg: 'var(--pink)',        color: 'var(--ink)' },
  'Barback':   { bg: 'var(--green-soft)', color: 'var(--ink)' },
  'Host':      { bg: 'var(--pink)',        color: 'var(--ink)' },
  'Cook':      { bg: 'var(--red-soft)',    color: 'var(--ink)' },
};

export default function WorkerMap() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // draft state (inside sheet before Save)
  const [draftRole, setDraftRole] = useState('All');
  const [draftHighPay, setDraftHighPay] = useState(false);
  const [draftSort, setDraftSort] = useState<'pay' | 'none'>('none');
  const [draftNeighborhood, setDraftNeighborhood] = useState('All');

  // applied state (what the map actually uses)
  const [filterRole, setFilterRole] = useState('All');
  const [filterHighPay, setFilterHighPay] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [filterNeighborhood, setFilterNeighborhood] = useState('All');

  const activeFilterCount = [filterRole !== 'All', filterHighPay, sortByPrice, filterNeighborhood !== 'All'].filter(Boolean).length;

  function openFilter() {
    setDraftRole(filterRole);
    setDraftHighPay(filterHighPay);
    setDraftSort(sortByPrice ? 'pay' : 'none');
    setDraftNeighborhood(filterNeighborhood);
    setFilterOpen(true);
  }

  function applyFilter() {
    setFilterRole(draftRole);
    setFilterHighPay(draftHighPay);
    setSortByPrice(draftSort === 'pay');
    setFilterNeighborhood(draftNeighborhood);
    setFilterOpen(false);
  }

  function clearFilter() {
    setDraftRole('All');
    setDraftHighPay(false);
    setDraftSort('none');
    setDraftNeighborhood('All');
  }

  const filteredShifts = SHIFTS.filter(s => {
    if (filterRole !== 'All') {
      const match = filterRole === 'Cook'
        ? (s.type === 'Cook' || s.type === 'Prep Cook')
        : s.type === filterRole;
      if (!match) return false;
    }
    if (filterHighPay) {
      const rate = parseInt(s.rate.replace(/[^0-9]/g, ''));
      if (rate < 25) return false;
    }
    if (filterNeighborhood !== 'All') {
      const matchStr = NEIGHBORHOOD_MATCH[filterNeighborhood] || filterNeighborhood;
      if (!s.loc.includes(matchStr)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (!sortByPrice) return 0;
    return parseInt(b.pay.replace(/[^0-9]/g, '')) - parseInt(a.pay.replace(/[^0-9]/g, ''));
  });

  const topBar = (floating: boolean) => (
    <div style={{
      background: floating ? 'rgba(255,255,255,0.92)' : 'var(--paper)',
      backdropFilter: floating ? 'blur(10px)' : undefined,
      WebkitBackdropFilter: floating ? 'blur(10px)' : undefined,
      borderBottom: floating ? 'none' : '1px solid var(--line)',
    }}>
      <StatusBar time="10:12" />
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}>
        <Link href="/worker/home" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', textDecoration: 'none', fontSize: 20 }}>←</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: floating ? '#fff' : 'var(--paper-2)', border: '2px solid var(--ink)', borderRadius: 99, padding: '6px 12px 6px 14px' }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>Bed-Stuy · 2 mi</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* Filter button */}
          <button onClick={openFilter} style={{
            position: 'relative', height: 36, padding: '0 14px', borderRadius: 99,
            border: activeFilterCount > 0 ? 'none' : '1.5px solid var(--line)',
            background: activeFilterCount > 0 ? 'var(--ink)' : floating ? 'rgba(0,0,0,0.06)' : 'var(--paper-2)',
            color: activeFilterCount > 0 ? '#fff' : 'var(--ink)',
            fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
              <rect x="0" y="0" width="13" height="1.8" rx="0.9" fill="currentColor"/>
              <rect x="2" y="4.5" width="9" height="1.8" rx="0.9" fill="currentColor"/>
              <rect x="4" y="9" width="5" height="1.8" rx="0.9" fill="currentColor"/>
            </svg>
            Filter{activeFilterCount > 0 ? ` · ${activeFilterCount}` : ''}
          </button>
          {/* View toggle */}
          <div style={{ display: 'flex', background: floating ? 'rgba(0,0,0,0.08)' : 'var(--paper-3)', borderRadius: 8, padding: 2, gap: 2 }}>
            {(['map', 'list'] as const).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                width: 32, height: 28, borderRadius: 6, border: 'none', cursor: 'pointer',
                background: viewMode === mode ? '#fff' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: viewMode === mode ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}>
                {mode === 'map' ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--ink)' : 'var(--ink)'} />
                    <rect x="8" y="1" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--ink)' : 'var(--ink)'} />
                    <rect x="1" y="8" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--ink)' : 'var(--ink)'} />
                    <rect x="8" y="8" width="5" height="5" rx="1" fill={viewMode === 'map' ? 'var(--ink)' : 'var(--ink)'} />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="2" width="12" height="2" rx="1" fill={viewMode === 'list' ? 'var(--ink)' : 'var(--ink)'} />
                    <rect x="1" y="6" width="12" height="2" rx="1" fill={viewMode === 'list' ? 'var(--ink)' : 'var(--ink)'} />
                    <rect x="1" y="10" width="12" height="2" rx="1" fill={viewMode === 'list' ? 'var(--ink)' : 'var(--ink)'} />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const filterSheet = filterOpen && (
    <>
      <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 105, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390,
        background: 'var(--paper)', borderRadius: '20px 20px 0 0',
        padding: '0 20px 36px', zIndex: 110,
        animation: 'slideUp 0.28s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line-2)', margin: '12px auto 20px' }} />

        {/* Role */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 10 }}>Role</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['All', 'Barista', 'Bartender', 'Server', 'Barback', 'Host', 'Cook'].map(r => (
              <button key={r} onClick={() => setDraftRole(r)} style={{
                padding: '11px 18px', borderRadius: 99, border: '2px solid var(--ink)',
                background: draftRole === r ? 'var(--ink)' : 'transparent',
                color: draftRole === r ? '#fff' : 'var(--ink)',
                fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* Pay */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 10 }}>Minimum pay rate</div>
          <button onClick={() => setDraftHighPay(p => !p)} style={{
            padding: '11px 18px', borderRadius: 99, border: '2px solid var(--ink)',
            background: draftHighPay ? 'var(--ink)' : 'transparent',
            color: draftHighPay ? '#fff' : 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}>$25+/hr</button>
        </div>

        {/* Neighborhood */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 10 }}>Neighborhood</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {NEIGHBORHOODS.map(n => (
              <button key={n} onClick={() => setDraftNeighborhood(n)} style={{
                padding: '11px 18px', borderRadius: 99, border: '2px solid var(--ink)',
                background: draftNeighborhood === n ? 'var(--ink)' : 'transparent',
                color: draftNeighborhood === n ? '#fff' : 'var(--ink)',
                fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>{n}</button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 10 }}>Sort by</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ val: 'none', label: 'Default' }, { val: 'pay', label: 'Highest Pay' }].map(opt => (
              <button key={opt.val} onClick={() => setDraftSort(opt.val as 'pay' | 'none')} style={{
                padding: '11px 18px', borderRadius: 99, border: '2px solid var(--ink)',
                background: draftSort === opt.val ? 'var(--ink)' : 'transparent',
                color: draftSort === opt.val ? '#fff' : 'var(--ink)',
                fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={clearFilter} style={{ flex: 1, padding: '14px', borderRadius: 24, border: '1.5px solid var(--line)', background: 'transparent', fontFamily: 'var(--body)', fontSize: 14, fontWeight: 500, color: 'var(--ink)', cursor: 'pointer' }}>Clear</button>
          <button onClick={applyFilter} style={{ flex: 2, padding: '14px', borderRadius: 24, border: 'none', background: 'var(--ink)', fontFamily: 'var(--body)', fontSize: 15, fontWeight: 500, color: '#fff', cursor: 'pointer', letterSpacing: '-0.01em' }}>Show Shifts</button>
        </div>
      </div>
    </>
  );

  /* ── MAP VIEW ── */
  if (viewMode === 'map') {
    return (
      <div style={{ maxWidth: 390, height: '100dvh', margin: '0 auto', position: 'relative', overflow: 'hidden', background: 'var(--map-bg)' }}>
        <style>{`
          @keyframes me-pulse {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(2.8); opacity: 0; }
          }
          .me-pulse-ring { position: absolute; inset: -4px; border-radius: 50%; background: var(--online); animation: me-pulse 2s ease-out infinite; }
          @keyframes slideUp { from { transform: translateX(-50%) translateY(100%); } to { transform: translateX(-50%) translateY(0); } }
        `}</style>

        {/* Full-screen map */}
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9618%2C40.6772%2C-73.9218%2C40.6972&layer=mapnik"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', filter: 'grayscale(60%) contrast(0.9)' }}
          title="Map"
        />

        {/* Me dot */}
        <div style={{ position: 'absolute', left: '28%', top: '55%', transform: 'translate(-50%,-50%)', width: 10, height: 10, zIndex: 5 }}>
          <div className="me-pulse-ring" />
          <div style={{ position: 'relative', width: 10, height: 10, borderRadius: '50%', background: 'var(--online)', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', zIndex: 1 }} />
        </div>

        {/* Shift pins */}
        {filteredShifts.map((shift, i) => {
          const isSelected = selectedShift?.name === shift.name;
          return (
            <div
              key={i}
              onClick={e => { e.stopPropagation(); setSelectedShift(isSelected ? null : shift); }}
              style={{
                position: 'absolute', left: shift.pinX, top: shift.pinY,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer', zIndex: isSelected ? 15 : 10,
              }}
            >
              {/* Pin bubble */}
              <div style={{
                background: shift.priority ? 'var(--red)' : 'var(--ink)',
                color: '#fff',
                borderRadius: 99,
                padding: '5px 9px',
                fontFamily: 'var(--body)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                border: isSelected ? '2.5px solid #fff' : '2px solid #fff',
                boxShadow: isSelected ? '0 3px 12px rgba(0,0,0,0.4)' : '0 1px 5px rgba(0,0,0,0.25)',
                transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}>
                {shift.pay}
              </div>
            </div>
          );
        })}

        {/* Floating header */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
          {topBar(true)}
        </div>

        {/* Pin sheet */}
        {selectedShift && <PinSheet shift={selectedShift} onClose={() => setSelectedShift(null)} />}

        {/* Filter sheet */}
        {filterSheet}

        <BottomNav active="map" />
      </div>
    );
  }

  /* ── LIST VIEW ── */
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 20 }}>
        {topBar(false)}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        <div style={{ padding: '20px 20px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Bedstuy, Brooklyn</span>
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>78F Sunny</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 48, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>{filteredShifts.length}</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}>Shifts Ready.</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px 20px' }}>
          <CompactCard
            icon="W"
            title="Wade @ Padmore's"
            sub="Asked you to cover tonight"
            cta={{ label: 'Accept', href: '/worker/confirm' }}
          />
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
          {filteredShifts.map((shift, i) => (
            <ShiftCard
              key={i}
              family={familyFor(shift.type)}
              state={shift.priority ? 'urgent' : undefined}
              role={shift.type}
              time={shift.hours}
              loc={shift.loc}
              venue={shift.shortName}
              brief={shift.brief}
              pay={shift.pay}
              rate={shift.rate}
              href="/worker/job-detail"
            />
          ))}
        </div>
      </div>

      {filterSheet}
      <BottomNav active="map" />
    </div>
  );
}
