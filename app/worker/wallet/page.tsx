import Link from 'next/link';
import BottomNav from '@/app/components/BottomNav';

const TRANSACTIONS = [
  { name: "Padmore's Coffee", detail: 'Barista · Mon 12 May', amount: '+$174.00', positive: true },
  { name: 'The Wren', detail: 'Server · Sat 10 May', amount: '+$96.00', positive: true },
  { name: 'CHASE ··4471', detail: 'Transferred', amount: '-$200.00', positive: false },
  { name: 'Bar Blondeau', detail: 'Barback · Thu 8 May', amount: '+$128.00', positive: true },
  { name: 'SHIFT Fee', detail: 'Monthly', amount: '$0.00', positive: false, zero: true },
  { name: "Greene's Bar", detail: 'Server · Tue 6 May', amount: '+$88.00', positive: true },
];

export default function WorkerWallet() {
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
        <Link href="/worker/map" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Wallet</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Balance header */}
      <div style={{
        padding: '24px 22px 20px',
        background: 'var(--ink)',
        color: '#fff',
      }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 4,
        }}>AVAILABLE</p>

        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 56,
          color: '#fff',
          letterSpacing: '-0.075em',
          lineHeight: 1,
        }}>$247.50</div>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.5)',
          marginTop: 6,
          marginBottom: 16,
        }}>Settled · updated just now</p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['Add bank', 'Cash out →'].map((label) => (
            <button
              key={label}
              style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 10,
                padding: '8px 14px',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger */}
      <div style={{ background: 'var(--card)', padding: '0 22px' }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--mute)',
          padding: '16px 0 10px',
          borderBottom: '1px solid var(--line)',
        }}>ACTIVITY</p>

        {TRANSACTIONS.map((tx, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--ink)',
              }}>{tx.name}</div>
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: 'var(--mute)',
                marginTop: 2,
              }}>{tx.detail}</div>
            </div>
            <div style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 15,
              color: tx.positive ? '#16A34A' : 'var(--mute)',
              textDecoration: tx.zero ? 'none' : undefined,
            }}>{tx.amount}</div>
          </div>
        ))}
      </div>

      {/* Cash out CTA */}
      <div style={{
        padding: '16px 22px 100px',
        background: 'var(--card)',
        borderTop: '1px solid var(--line)',
      }}>
        <button style={{
          width: '100%',
          padding: '16px',
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 12,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 16,
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
        }}>Cash out today.</button>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          color: 'var(--mute)',
          textAlign: 'center',
          marginTop: 8,
        }}>$0 fee · direct to debit · 11 min avg</p>
      </div>

      <BottomNav active="wallet" />
    </div>
  );
}
