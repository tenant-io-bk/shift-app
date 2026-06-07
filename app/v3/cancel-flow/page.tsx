'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CancelFlow() {
  const router = useRouter();
  const [cancelled, setCancelled] = useState(false);

  if (cancelled) {
    return (
      <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(234,75,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M7 7l14 14M21 7L7 21" stroke="#EA4B2A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.05em' }}>Shift cancelled.</div>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mute)', lineHeight: 1.6 }}>
          Padmore&apos;s has been notified. A standby worker is being contacted.
        </p>
        <div style={{ padding: '10px 16px', background: 'rgba(234,75,42,0.08)', borderRadius: 10, fontFamily: 'var(--body)', fontSize: 11, color: '#EA4B2A', lineHeight: 1.5 }}>
          7-day block from Padmore&apos;s · −6 spots in Bed-Stuy standing
        </div>
        <Link href="/worker/home" style={{ marginTop: 16, display: 'block', width: '100%', padding: '15px', background: 'var(--ink)', color: '#fff', borderRadius: 99, fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em' }}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '1px solid var(--line)',
      }}>
        <Link href="/worker/day-of" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
      </div>

      {/* Sheet */}
      <div style={{
        padding: '24px 22px 32px',
        flex: 1,
      }}>
        <h1 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 28,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}>Running behind?</h1>

        {/* Option rows */}
        {[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="#0D0E12" strokeWidth="1.4" />
                <path d="M9 5v4l2.5 2.5" stroke="#0D0E12" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            ),
            title: "I'll be late",
            desc: "Tell Padmore's when to expect you. No penalty.",
            titleColor: 'var(--ink)',
            descColor: 'var(--mute)',
            action: () => router.push('/worker/messages'),
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 4h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V5a1 1 0 011-1z" stroke="#0D0E12" strokeWidth="1.4" />
              </svg>
            ),
            title: "Message Padmore's first",
            desc: 'Ask before you decide',
            titleColor: 'var(--ink)',
            descColor: 'var(--mute)',
            action: () => router.push('/worker/messages'),
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="#B83227" strokeWidth="1.4" />
                <path d="M6 6l6 6M12 6l-6 6" stroke="#B83227" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ),
            title: "I can't make it.",
            desc: "7-day block from Padmore's · −6 spots in Bed-Stuy",
            titleColor: 'var(--red)',
            descColor: 'var(--red)',
            action: () => setCancelled(true),
          },
        ].map((opt, i) => (
          <button
            key={i}
            onClick={opt.action}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 0',
              cursor: 'pointer',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: '1px solid var(--line)',
              textAlign: 'left',
            }}
          >
            <div style={{ flexShrink: 0, marginTop: 1 }}>{opt.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 16,
                color: opt.titleColor,
              }}>{opt.title}</div>
              <div style={{
                fontFamily: 'var(--body)',
                fontSize: 13,
                color: opt.descColor,
                marginTop: 2,
                lineHeight: 1.4,
              }}>{opt.desc}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M6 3l5 5-5 5" stroke="var(--mute-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}

        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 11,
          color: 'var(--mute)',
          textAlign: 'center',
          marginTop: 14,
          lineHeight: 1.5,
        }}>
          Canceling 4+ hours ahead = no penalty to your Bed-Stuy standing
        </p>

        {/* Shift summary card */}
        <div style={{
          marginTop: 28,
          padding: '18px 20px',
          background: 'var(--paper-2)',
          borderRadius: 18,
          border: '1.5px solid var(--line)',
        }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)', marginBottom: 10 }}>Your shift</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>Padmore&apos;s Coffee</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 3 }}>Barista · 172 Tompkins Ave</div>
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em' }}>$140</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Today 11A–4P', '5 hrs', '$28/hr'].map(tag => (
              <span key={tag} style={{ background: 'var(--paper-3)', borderRadius: 99, padding: '5px 11px', fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
