'use client';

import Link from 'next/link';

export default function CancelFlow() {
  return (
    <div style={{
      maxWidth: 390,
      minHeight: '100vh',
      margin: '0 auto',
      background: 'var(--paper)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Back button */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 20,
      }}>
        <Link href="/worker/confirm" style={{ fontSize: 20, color: 'white', textDecoration: 'none', opacity: 0.8 }}>←</Link>
      </div>

      {/* Ghosted on-shift screen behind */}
      <div style={{
        height: 280,
        background: 'var(--ink)',
        opacity: 0.6,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 8,
          letterSpacing: '0.04em',
        }}>On shift · Padmore's · #4471</p>
        <div style={{
          fontFamily: 'var(--sans)',
          fontWeight: 600,
          fontSize: 72,
          color: '#fff',
          opacity: 0.5,
          letterSpacing: '-0.075em',
          lineHeight: 1,
        }}>02:14:38</div>
      </div>

      {/* Blur overlay */}
      <div style={{
        position: 'absolute',
        top: 200,
        left: 0,
        right: 0,
        height: 80,
        background: 'linear-gradient(to bottom, transparent, rgba(247,248,250,0.9))',
        zIndex: 5,
      }} />

      {/* Bottom sheet */}
      <div style={{
        background: 'var(--card)',
        borderRadius: '18px 18px 0 0',
        padding: '20px 22px 32px',
        boxShadow: '0 -8px 40px rgba(13,14,18,0.18)',
        position: 'relative',
        zIndex: 10,
        flex: 1,
      }}>
        {/* Handle */}
        <div style={{
          width: 36,
          height: 4,
          background: 'var(--paper-3)',
          borderRadius: 99,
          margin: '0 auto 16px',
        }} />

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
          },
        ].map((opt, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 0',
              borderBottom: '1px solid var(--line)',
              cursor: 'pointer',
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
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: opt.descColor,
                marginTop: 2,
                lineHeight: 1.4,
              }}>{opt.desc}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M6 3l5 5-5 5" stroke="var(--mute-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          color: 'var(--mute)',
          textAlign: 'center',
          marginTop: 14,
          lineHeight: 1.5,
        }}>
          Canceling 4+ hours ahead = no penalty to your Bed-Stuy standing
        </p>
      </div>
    </div>
  );
}
