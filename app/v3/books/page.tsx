import Link from 'next/link';

const STATEMENTS = [
  { month: 'MAY 2026', shifts: 18, total: '$2,847', live: true },
  { month: 'APR 2026', shifts: 22, total: '$3,412', live: false },
  { month: 'MAR 2026', shifts: 19, total: '$2,956', live: false },
];

const LINE_ITEMS = [
  { desc: "Padmore's Coffee · Apr 28 · Barista · 5h", amount: '+$130.00' },
  { desc: "Padmore's Coffee · Apr 25 · Barista · 5h", amount: '+$130.00' },
  { desc: 'The Wren · Apr 22 · Server · 6h', amount: '+$144.00' },
];

export default function Books() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      {/* Green header: profile row + search + hero */}
      <div style={{ background: 'var(--green)' }}>

        {/* Profile row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/employer/billing" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <span style={{ fontSize: 18, color: 'var(--ink)', lineHeight: 1 }}>←</span>
            </Link>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'white' }}>PC</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Padmore&apos;s Coffee</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'rgba(13,14,18,0.5)', marginTop: 1 }}>Brooklyn, NY · Active</div>
            </div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 11a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill="var(--ink)" opacity="0.6"/>
            </svg>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ margin: '0 20px 20px', background: 'rgba(255,255,255,0.45)', borderRadius: 14, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--ink)" strokeWidth="1.4" opacity="0.45"/>
            <path d="M10.5 10.5l2.5 2.5" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/>
          </svg>
          <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(13,14,18,0.38)' }}>Search statements…</span>
        </div>

        {/* Balance hero */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 22px 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              You&apos;ve Filled{' '}
              <span style={{ textDecoration: 'underline' }}>18</span>
              {' '}Shifts May 2026
            </p>
          </div>
          <div style={{ background: '#2a9e18', borderRadius: 99, padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: 'white', lineHeight: 1 }}>↗</span>
            <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 12, color: 'white', letterSpacing: '0.01em' }}>+8.4% vs last month</span>
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 64, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>$2,847.00</div>
        </div>
      </div>

      {/* Statement list — white card slides up */}
      <div style={{ flex: 1, padding: '0 22px', background: 'var(--card)', borderRadius: '24px 24px 0 0', marginTop: -28 }}>
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--ink)',
          padding: '28px 0 10px',
        }}>STATEMENTS</p>

        {STATEMENTS.map((stmt) => (
          <div
            key={stmt.month}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 0',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--body)',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--mute)',
                marginBottom: 4,
              }}>{stmt.month}</p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'var(--body)', fontWeight: 600, fontSize: 19, color: 'var(--ink)' }}>
                  {stmt.shifts} Shifts
                </span>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 19, color: 'var(--ink)', letterSpacing: '-0.03em' }}>
                  · {stmt.total}
                </span>
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="var(--mute)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Statement detail preview */}
      <div style={{ padding: '0 22px 32px' }}>
        <div style={{
          marginTop: 20,
          padding: 18,
          border: '1.5px dashed var(--ink)',
          borderRadius: 16,
          background: 'var(--card)',
        }}>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            marginBottom: 10,
          }}>STATEMENT #2026-04</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase' }}>TOTAL</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.05em' }}>$3,412.00</span>
          </div>

          <div style={{ borderTop: '1.5px dashed var(--ink)', marginBottom: 12 }} />

          {LINE_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', flex: 1, marginRight: 8 }}>{item.desc}</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', flexShrink: 0 }}>{item.amount}</span>
            </div>
          ))}

          <div style={{ borderTop: '1.5px dashed var(--ink)', marginTop: 12, marginBottom: 12 }} />

          <div style={{ display: 'flex', gap: 8 }}>
            {['PDF', 'CSV', 'QuickBooks'].map((label) => (
              <button
                key={label}
                style={{
                  padding: '5px 10px',
                  background: 'transparent',
                  border: '2px solid var(--ink)',
                  borderRadius: 99,
                  fontFamily: 'var(--body)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
