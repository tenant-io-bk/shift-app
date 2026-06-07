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

export default function WorkerBooks() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
      {/* Nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--paper)',
      }}>
        <Link href="/worker/home" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>My Earnings</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Monthly total header — green bg */}
      <div style={{ padding: '44px 22px 52px', background: 'var(--green)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 10, whiteSpace: 'nowrap' }}>
          You&apos;ve Worked{' '}
          <span style={{ textDecoration: 'underline', fontWeight: 400 }}>18</span>
          {' '}Shifts May 2026
        </p>

        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 400,
          fontSize: 56,
          color: 'var(--ink)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
        }}>$2,847.00</div>
      </div>

      {/* Statement list */}
      <div style={{ padding: '0 22px', background: 'var(--card)', borderRadius: '24px 24px 0 0', marginTop: -24 }}>
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--ink)',
          padding: '28px 0 10px',
        }}>EARNINGS BY MONTH</p>

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

      {/* Earnings detail preview */}
      <div style={{ padding: '0 22px 120px' }}>
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
          }}>APRIL 2026</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase' }}>TOTAL EARNED</span>
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
            {['PDF', 'CSV'].map((label) => (
              <button
                key={label}
                style={{
                  padding: '5px 14px',
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
