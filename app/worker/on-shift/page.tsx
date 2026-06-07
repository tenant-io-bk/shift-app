'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function OnShift() {
  const router = useRouter();

  // Shift: 11A–4P = 5h = 300 min total; 2h 14m elapsed
  const TOTAL_MIN = 300;
  const ELAPSED_MIN = 134;
  const progress = ELAPSED_MIN / TOTAL_MIN; // ~0.447

  const R = 116;
  const SIZE = 280;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const CIRC = 2 * Math.PI * R;

  return (
    <div style={{
      maxWidth: 390, minHeight: '100vh', margin: '0 auto',
      background: 'var(--paper)', display: 'flex', flexDirection: 'column',
      padding: '0 24px 40px',
    }}>
      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        .on-dot { animation: dot-pulse 2s ease-in-out infinite; }
      `}</style>

      <StatusBar time="1:14 PM" />

      {/* Status row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div className="on-dot" style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--green)', flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)',
          }}>
            On the clock
          </span>
        </div>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>
          Padmore&apos;s · #4471
        </span>
      </div>

      {/* Circle timer + earned */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 32,
      }}>
        {/* Ring */}
        <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
          <svg
            width={SIZE} height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ transform: 'rotate(-90deg)', display: 'block' }}
          >
            {/* Track */}
            <circle cx={CX} cy={CY} r={R}
              fill="none" stroke="rgba(13,14,18,0.07)" strokeWidth={9} />
            {/* Progress arc */}
            <circle cx={CX} cy={CY} r={R}
              fill="none" stroke="var(--green)" strokeWidth={9}
              strokeLinecap="round"
              strokeDasharray={`${CIRC}`}
              strokeDashoffset={`${CIRC * (1 - progress)}`}
            />
          </svg>

          {/* Center label + time */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--mute)', marginBottom: 8,
            }}>
              Time elapsed
            </span>
            <div style={{
              fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 70,
              color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1,
            }}>
              2:14
            </div>
            <span style={{
              fontFamily: 'var(--body)', fontSize: 12,
              color: 'var(--mute)', marginTop: 10,
            }}>
              $28/hr · Barista
            </span>
          </div>
        </div>

        {/* Earned */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--mute)', marginBottom: 6,
          }}>
            Earned so far
          </div>
          <div style={{
            display: 'flex', alignItems: 'baseline',
            justifyContent: 'center', gap: 8,
          }}>
            <span style={{
              fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 48,
              color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1,
            }}>
              $62.00
            </span>
            <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mute)' }}>
              of $140
            </span>
          </div>
          <div style={{
            width: 140, height: 3, background: 'rgba(13,14,18,0.09)',
            borderRadius: 99, overflow: 'hidden', margin: '10px auto 0',
          }}>
            <div style={{ height: '100%', width: '44%', background: 'var(--green)', borderRadius: 99 }} />
          </div>
        </div>
      </div>

      {/* Contact row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        paddingBottom: 20,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, color: 'white' }}>T</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Tomás</div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>Owner · Padmore&apos;s</div>
        </div>
        <Link href="/worker/report" style={{
          fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)',
          textDecoration: 'underline', textDecorationColor: 'var(--line-2)',
        }}>
          Report issue
        </Link>
      </div>

      {/* Bottom controls: message (small outline) + clock out (large filled) */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 16px',
      }}>
        {/* Message — small outline */}
        <Link href="/worker/messages" style={{
          width: 56, height: 56, border: '1.5px solid var(--ink)',
          borderRadius: '50%', background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2.5 2.5h13c.55 0 1 .45 1 1v7.5c0 .55-.45 1-1 1H5l-3.7 3.7V3.5c0-.55.45-1 1.2-1Z"
              stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Clock out — large filled */}
        <button
          onClick={() => router.push('/worker/paid-out')}
          style={{
            width: 72, height: 72, background: 'var(--ink)',
            borderRadius: '50%', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="5.5" y="5.5" width="11" height="11" rx="2.5" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  );
}
