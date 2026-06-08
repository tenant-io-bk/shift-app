'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';

export default function EmployerDayOf() {
  const router = useRouter();

  return (
    <div style={{
      maxWidth: 390, minHeight: '100vh', margin: '0 auto',
      background: 'var(--paper)', display: 'flex', flexDirection: 'column',
    }}>
      <style>{`
        @keyframes on-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        .on-dot { animation: on-dot-pulse 2s ease-in-out infinite; }
      `}</style>

      <StatusBar time="1:14 PM" />

      {/* Status row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 24px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div className="on-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--online)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)' }}>
            Marcus is on shift
          </span>
        </div>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)' }}>
          Padmore&apos;s · #4471
        </span>
      </div>

      {/* Header */}
      <div style={{ padding: '10px 24px 20px' }}>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 30, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.05 }}>
          Shift Running At
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 30, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1.05 }}>
          Padmore&apos;s Coffee.
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Time + cost hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 24px 28px', borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', marginBottom: 6 }}>
            Time elapsed
          </span>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 72, color: 'var(--ink)', letterSpacing: '0.04em', lineHeight: 1 }}>
            2h 14m
          </div>
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 6 }}>
            $28/hr · Barista · ends 4P
          </span>

          {/* Labor cost tracker */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 6 }}>
              Labor spend
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 44, color: 'var(--ink)', letterSpacing: '-0.05em', lineHeight: 1 }}>
                $62.72
              </span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)' }}>of $140</span>
            </div>
            <div style={{ width: 140, height: 3, background: 'rgba(13,14,18,0.09)', borderRadius: 99, overflow: 'hidden', margin: '10px auto 0' }}>
              <div style={{ height: '100%', width: '44%', background: 'var(--ink)', borderRadius: 99 }} />
            </div>
          </div>
        </div>

        {/* Worker card */}
        <div style={{ margin: '20px 22px 0' }}>
          <p style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', marginBottom: 10 }}>
            Worker
          </p>
          <div className="receipt-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', background: 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: '#fff' }}>MT</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Marcus T.</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 2 }}>Barista · 127 shifts · 97% reliable</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L7.2 4.2L10.5 4.5L8.1 6.6L8.9 10L6 8.2L3.1 10L3.9 6.6L1.5 4.5L4.8 4.2L6 1Z" fill="var(--ink)" />
                </svg>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>4.9</span>
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', background: 'var(--green-soft)', borderRadius: 99, padding: '3px 8px' }}>On floor</div>
            </div>
          </div>
        </div>

        {/* Shift details */}
        <div style={{ margin: '16px 22px 0' }}>
          <div className="receipt-card">
            {[
              { label: 'When',    value: 'Today · 11A – 4P' },
              { label: 'Hours',   value: '5 hrs' },
              { label: 'Address', value: '172 Tompkins Ave' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 20px', borderBottom: '1.5px dashed var(--ink)' }}>
                <p style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)' }}>{row.label}</p>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em' }}>{row.value}</p>
              </div>
            ))}
            <div style={{ padding: '14px 20px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink)' }}>Total cost</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 28, color: 'var(--ink)', letterSpacing: '-0.04em' }}>
                $140<span style={{ color: 'var(--green)' }}>.</span>
              </span>
            </div>
          </div>
        </div>

        {/* Issue link */}
        <div style={{ padding: '16px 22px 0', textAlign: 'center' }}>
          <Link href="/employer/no-show" style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textDecoration: 'underline', textDecorationColor: 'rgba(13,14,18,0.25)' }}>
            Flag an Issue with This Shift
          </Link>
        </div>
      </div>

      {/* Fixed bottom actions */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390,
        padding: '12px 22px 36px',
        background: 'var(--paper)',
        borderTop: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/employer/messages" style={{
            flex: 1, padding: '14px', border: '2px solid var(--ink)', borderRadius: 99,
            background: 'transparent', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 14,
            color: 'var(--ink)', textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
          }}>
            Message Marcus
          </Link>
          <Link href="/employer/live-map" style={{
            padding: '14px 18px', border: '2px solid var(--ink)', borderRadius: 99,
            background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="8" r="3.5" stroke="var(--ink)" strokeWidth="1.5"/>
              <path d="M9 1.5C5.96 1.5 3.5 3.96 3.5 7c0 4.5 5.5 9.5 5.5 9.5S14.5 11.5 14.5 7c0-3.04-2.46-5.5-5.5-5.5Z" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <button
          onClick={() => router.push('/employer/mutual-review')}
          style={{
            width: '100%', padding: '15px 22px', background: 'var(--ink)', borderRadius: 99,
            border: 'none', fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16,
            color: '#fff', cursor: 'pointer', letterSpacing: '-0.01em',
          }}
        >
          End Shift
        </button>
      </div>

      <EmployerNav active="shifts" />
    </div>
  );
}
