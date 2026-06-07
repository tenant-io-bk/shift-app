'use client';
import { useState } from 'react';
import Link from 'next/link';

const ALL_STATEMENTS = [
  { month: 'MAY 2026', shifts: 18, total: '$2,847', totalFull: '$2,847.00', monthsAgo: 0 },
  { month: 'APR 2026', shifts: 22, total: '$3,412', totalFull: '$3,412.00', monthsAgo: 1 },
  { month: 'MAR 2026', shifts: 19, total: '$2,956', totalFull: '$2,956.00', monthsAgo: 2 },
  { month: 'FEB 2026', shifts: 16, total: '$2,488', totalFull: '$2,488.00', monthsAgo: 3 },
  { month: 'JAN 2026', shifts: 14, total: '$2,170', totalFull: '$2,170.00', monthsAgo: 4 },
  { month: 'DEC 2025', shifts: 21, total: '$3,255', totalFull: '$3,255.00', monthsAgo: 5 },
  { month: 'NOV 2025', shifts: 17, total: '$2,635', totalFull: '$2,635.00', monthsAgo: 6 },
];

const LINE_ITEMS: Record<string, { desc: string; amount: string }[]> = {
  'MAY 2026': [
    { desc: "Padmore's Coffee · May 12 · Barista · 5h", amount: '+$130.00' },
    { desc: 'The Wren · May 8 · Server · 6h', amount: '+$144.00' },
    { desc: 'Bar Blondeau · May 3 · Barback · 4h', amount: '+$96.00' },
  ],
  'APR 2026': [
    { desc: "Padmore's Coffee · Apr 28 · Barista · 5h", amount: '+$130.00' },
    { desc: "Padmore's Coffee · Apr 25 · Barista · 5h", amount: '+$130.00' },
    { desc: 'The Wren · Apr 22 · Server · 6h', amount: '+$144.00' },
  ],
  'MAR 2026': [
    { desc: "Padmore's Coffee · Mar 30 · Barista · 5h", amount: '+$130.00' },
    { desc: 'Bar Blondeau · Mar 22 · Barback · 4h', amount: '+$96.00' },
    { desc: 'The Wren · Mar 15 · Server · 6h', amount: '+$144.00' },
  ],
};

const FILTERS = ['Month', '3 Mo', '6 Mo', '1 Year', 'YTD'] as const;
type Filter = typeof FILTERS[number];

function filterStatements(filter: Filter) {
  switch (filter) {
    case 'Month':  return ALL_STATEMENTS.filter(s => s.monthsAgo === 0);
    case '3 Mo':   return ALL_STATEMENTS.filter(s => s.monthsAgo < 3);
    case '6 Mo':   return ALL_STATEMENTS.filter(s => s.monthsAgo < 6);
    case '1 Year': return ALL_STATEMENTS.filter(s => s.monthsAgo < 12);
    case 'YTD':    return ALL_STATEMENTS.filter(s => s.month.includes('2026'));
  }
}

// Data for the chart indexed by filter — monthly buckets
const CHART_DATA: Record<string, { label: string; value: number }[]> = {
  'Month': [
    { label: 'W1', value: 680 }, { label: 'W2', value: 920 }, { label: 'W3', value: 740 }, { label: 'W4', value: 507 },
  ],
  '3 Mo': [
    { label: 'Mar', value: 2956 }, { label: 'Apr', value: 3412 }, { label: 'May', value: 2847 },
  ],
  '6 Mo': [
    { label: 'Dec', value: 3255 }, { label: 'Jan', value: 2170 }, { label: 'Feb', value: 2488 },
    { label: 'Mar', value: 2956 }, { label: 'Apr', value: 3412 }, { label: 'May', value: 2847 },
  ],
  '1 Year': [
    { label: 'Jun', value: 2100 }, { label: 'Jul', value: 1800 }, { label: 'Aug', value: 2400 },
    { label: 'Sep', value: 2750 }, { label: 'Oct', value: 2300 }, { label: 'Nov', value: 2635 },
    { label: 'Dec', value: 3255 }, { label: 'Jan', value: 2170 }, { label: 'Feb', value: 2488 },
    { label: 'Mar', value: 2956 }, { label: 'Apr', value: 3412 }, { label: 'May', value: 2847 },
  ],
  'YTD': [
    { label: 'Jan', value: 2170 }, { label: 'Feb', value: 2488 }, { label: 'Mar', value: 2956 },
    { label: 'Apr', value: 3412 }, { label: 'May', value: 2847 },
  ],
};

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1], cur = pts[i];
    const cpx = (prev.x + cur.x) / 2;
    d += ` C ${cpx} ${prev.y} ${cpx} ${cur.y} ${cur.x} ${cur.y}`;
  }
  return d;
}

function EarningsChart({ filter }: { filter: Filter }) {
  const data = CHART_DATA[filter] ?? CHART_DATA['3 Mo'];
  const W = 346, H = 72, padX = 0, padY = 10;
  const vals = data.map(d => d.value);
  const minV = Math.min(...vals) * 0.88;
  const maxV = Math.max(...vals) * 1.06;
  const toX = (i: number) => padX + (i / (data.length - 1)) * (W - padX * 2);
  const toY = (v: number) => padY + (1 - (v - minV) / (maxV - minV)) * (H - padY * 2);
  const pts = data.map((d, i) => ({ x: toX(i), y: toY(d.value) }));
  const linePath = smoothPath(pts);

  const peakIdx = vals.indexOf(Math.max(...vals));
  const peakPt = pts[peakIdx];

  return (
    <div style={{ padding: '0 22px 44px' }}>
      <svg width={W} height={H + 28} viewBox={`0 0 ${W} ${H + 28}`} style={{ display: 'block', overflow: 'visible' }}>

        {/* Clean flat line — no fill, no shadow */}
        <path d={linePath} fill="none" stroke="rgba(13,14,18,0.55)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Tick marks at bottom */}
        {pts.map((pt, i) => (
          <rect key={i} x={pt.x - 1} y={H - 6} width={2} height={6} rx={1}
            fill="rgba(13,14,18,0.25)" />
        ))}

        {/* Month labels */}
        {data.map((d, i) => (
          <text key={i} x={toX(i)} y={H + 20} textAnchor="middle"
            fill="#0D0E12"
            fontFamily="var(--body)" fontSize="9" fontWeight="600">
            {d.label.toUpperCase()}
          </text>
        ))}

        {/* Peak dot */}
        <circle cx={peakPt.x} cy={peakPt.y} r={3} fill="rgba(13,14,18,0.7)" />

        {/* Peak label */}
        <g transform={`translate(${Math.min(peakPt.x + 6, W - 68)}, ${peakPt.y - 24})`}>
          <rect x={0} y={0} width={62} height={18} rx={9} fill="rgba(13,14,18,0.08)" />
          <text x={31} y={12.5} textAnchor="middle"
            fill="#0D0E12" fontFamily="var(--body)" fontSize="9" fontWeight="700">
            ↑ {filter === 'Month' ? '+12.1%' : filter === '3 Mo' ? '+15.4%' : '+29.2%'} peak
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function WorkerBooks() {
  const [activeFilter, setActiveFilter] = useState<Filter>('3 Mo');
  const [expanded, setExpanded] = useState<string | null>(null);
  const statements = filterStatements(activeFilter);

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div className="books-gradient">

        {/* Nav row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 14px' }}>
          <Link href="/worker/home" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', lineHeight: 1 }}>←</Link>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>My Earnings</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 11a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="var(--ink)" opacity="0.6"/>
          </svg>
        </div>

        {/* Search bar */}
        <div style={{ margin: '0 20px 12px', background: 'var(--paper)', borderRadius: 99, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--ink)" strokeWidth="1.4" opacity="0.4"/>
            <path d="M10.5 10.5l2.5 2.5" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/>
          </svg>
          <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(13,14,18,0.35)' }}>Search earnings…</span>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px', overflowX: 'auto' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: 99,
                border: '1.5px solid var(--ink)',
                background: activeFilter === f ? 'var(--ink)' : 'transparent',
                color: activeFilter === f ? 'white' : 'var(--ink)',
                fontFamily: 'var(--body)',
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Balance hero */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 22px 0' }}>
          {/* Date pill */}
          <div style={{ background: 'rgba(13,14,18,0.1)', borderRadius: 99, padding: '4px 12px', marginBottom: 14, display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>May 2026</span>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
            You&apos;ve Filled{' '}
            <span style={{ textDecoration: 'underline' }}>18</span>
            {' '}Shifts
          </p>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 18 }}>$2,847.00</div>
          <div style={{ background: 'rgba(13,14,18,0.12)', borderRadius: 99, padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1 }}>↗</span>
            <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 12, color: 'var(--ink)', letterSpacing: '0.01em' }}>+8.4% vs last month</span>
          </div>
        </div>

        {/* Earnings sparkline */}
        <EarningsChart filter={activeFilter} />

      </div>

      {/* Statements list — white card slides up */}
      <div style={{ flex: 1, padding: '0 22px 80px', background: 'var(--card)', borderRadius: '24px 24px 0 0', marginTop: -28 }}>
        <p style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', padding: '28px 0 10px' }}>
          Statements
        </p>

        {statements.map((stmt, idx) => {
          const isOpen = expanded === stmt.month;
          const items = LINE_ITEMS[stmt.month] ?? [];
          return (
            <div key={stmt.month}>
              {/* Month row — tap to expand */}
              <button
                onClick={() => setExpanded(isOpen ? null : stmt.month)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: isOpen ? 'none' : idx < statements.length - 1 ? '1px solid var(--line)' : 'none',
                  background: 'transparent',
                  border: 'none',
                  borderBottomColor: undefined,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginBottom: 4 }}>{stmt.month}</p>
                  <span style={{ fontFamily: 'var(--body)', fontWeight: 600, fontSize: 19, color: 'var(--ink)' }}>{stmt.shifts} Shifts ·</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 19, color: 'var(--ink)', letterSpacing: '-0.03em' }}>{stmt.total}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}
                  >
                    <path d="M6 3l5 5-5 5" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {/* Expanded statement detail */}
              {isOpen && (
                <div style={{ margin: '0 0 16px', padding: 18, border: '1.5px dashed var(--ink)', borderRadius: 16, background: 'var(--card)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                    <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Earned</span>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.05em' }}>{stmt.totalFull}</span>
                  </div>
                  <div style={{ borderTop: '1.5px dashed var(--ink)', marginBottom: 12 }} />
                  {items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', flex: 1, marginRight: 8 }}>{item.desc}</span>
                      <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', flexShrink: 0 }}>{item.amount}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1.5px dashed var(--ink)', marginTop: 12, marginBottom: 12 }} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['PDF', 'CSV'].map((label) => (
                      <button key={label} style={{ padding: '5px 14px', background: 'transparent', border: '2px solid var(--ink)', borderRadius: 99, fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', cursor: 'pointer' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* separator when not expanded */}
              {!isOpen && idx < statements.length - 1 && (
                <div style={{ borderBottom: '1px solid var(--line)' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
