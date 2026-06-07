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
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
      {/* Nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--ink)',
        background: 'var(--paper)',
      }}>
        <Link href="/employer/roster" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Books</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Monthly total header */}
      <div style={{ padding: '52px 22px 40px', background: 'var(--ink)' }}>
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#fff',
          marginBottom: 4,
        }}>MAY 2026</p>

        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 48,
          color: '#fff',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: 6,
        }}>$2,847.00</div>

        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 13,
          color: '#fff',
          marginBottom: 0,
        }}>Across 18 Shifts</p>
      </div>

      {/* Statement list */}
      <div style={{ padding: '0 22px', background: 'var(--card)' }}>
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--ink)',
          padding: '14px 0 10px',
        }}>STATEMENTS</p>

        {STATEMENTS.map((stmt) => (
          <div
            key={stmt.month}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: '1px solid var(--ink)',
            }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--body)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
                marginBottom: 3,
              }}>{stmt.month}</p>
              <p style={{
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--ink)',
              }}>{stmt.shifts} Shifts · {stmt.total}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          position: 'relative',
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

          {/* Total row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase' }}>TOTAL</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.02em' }}>$3,412.00</span>
          </div>

          {/* Dashed separator */}
          <div style={{ borderTop: '1.5px dashed var(--ink)', marginBottom: 12 }} />

          {/* Line items */}
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

          {/* Dashed separator */}
          <div style={{ borderTop: '1.5px dashed var(--ink)', marginTop: 12, marginBottom: 12 }} />

          {/* Export buttons */}
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
