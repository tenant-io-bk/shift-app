'use client';
import { useState } from 'react';
import Link from 'next/link';
import EmployerNav from '@/app/components/EmployerNav';

const ALL_STATEMENTS = [
  { month: 'MAY 2026', shifts: 18, total: '$2,847', monthsAgo: 0 },
  { month: 'APR 2026', shifts: 22, total: '$3,412', monthsAgo: 1 },
  { month: 'MAR 2026', shifts: 19, total: '$2,956', monthsAgo: 2 },
  { month: 'FEB 2026', shifts: 16, total: '$2,488', monthsAgo: 3 },
  { month: 'JAN 2026', shifts: 14, total: '$2,170', monthsAgo: 4 },
  { month: 'DEC 2025', shifts: 21, total: '$3,255', monthsAgo: 5 },
  { month: 'NOV 2025', shifts: 17, total: '$2,635', monthsAgo: 6 },
];

const LINE_ITEMS = [
  { desc: "Padmore's Coffee · Apr 28 · Barista · 5h", amount: '+$130.00' },
  { desc: "Padmore's Coffee · Apr 25 · Barista · 5h", amount: '+$130.00' },
  { desc: 'The Wren · Apr 22 · Server · 6h', amount: '+$144.00' },
];

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

export default function EmployerBooks() {
  const [activeFilter, setActiveFilter] = useState<Filter>('3 Mo');
  const statements = filterStatements(activeFilter);

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--green)' }}>

        {/* Nav row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 14px' }}>
          <Link href="/employer/dashboard" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', lineHeight: 1 }}>←</Link>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Books</span>
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
          <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(13,14,18,0.35)' }}>Search statements…</span>
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
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 22px 56px' }}>
          <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12, whiteSpace: 'nowrap' }}>
            You&apos;ve Posted{' '}
            <span style={{ textDecoration: 'underline' }}>18</span>
            {' '}Shifts May 2026
          </p>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 14 }}>$2,847.00</div>
          <div style={{ background: '#2a9e18', borderRadius: 99, padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 12, color: 'white', lineHeight: 1 }}>↗</span>
            <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 12, color: 'white', letterSpacing: '0.01em' }}>+8.4% vs last month</span>
          </div>
        </div>
      </div>

      {/* Statement list — white card slides up */}
      <div style={{ flex: 1, padding: '0 22px', background: 'var(--card)', borderRadius: '24px 24px 0 0', marginTop: -28 }}>
        <p style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', padding: '28px 0 10px' }}>
          STATEMENTS
        </p>

        {statements.map((stmt) => (
          <div key={stmt.month} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            <div>
              <p style={{ fontFamily: 'var(--body)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--mute)', marginBottom: 4 }}>{stmt.month}</p>
              <span style={{ fontFamily: 'var(--body)', fontWeight: 600, fontSize: 19, color: 'var(--ink)' }}>{stmt.shifts} Shifts ·</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 19, color: 'var(--ink)', letterSpacing: '-0.03em' }}>{stmt.total}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Statement detail preview */}
      <div style={{ padding: '0 22px 120px' }}>
        <div style={{ marginTop: 20, padding: 18, border: '1.5px dashed var(--ink)', borderRadius: 16, background: 'var(--card)' }}>
          <p style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', marginBottom: 10 }}>STATEMENT #2026-04</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase' }}>TOTAL</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.05em' }}>$3,412.00</span>
          </div>
          <div style={{ borderTop: '1.5px dashed var(--ink)', marginBottom: 12 }} />
          {LINE_ITEMS.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', flex: 1, marginRight: 8 }}>{item.desc}</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', flexShrink: 0 }}>{item.amount}</span>
            </div>
          ))}
          <div style={{ borderTop: '1.5px dashed var(--ink)', marginTop: 12, marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {['PDF', 'CSV', 'QuickBooks'].map((label) => (
              <button key={label} style={{ padding: '5px 10px', background: 'transparent', border: '2px solid var(--ink)', borderRadius: 99, fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <EmployerNav active="account" />
    </div>
  );
}
