'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import ShiftCard from '@/app/components/ShiftCard';

export default function DayOf() {
  const router = useRouter();
  const [subwayDismissed, setSubwayDismissed] = useState(false);
  const [proximity, setProximity] = useState<'far' | 'near'>('far');
  const isNear = proximity === 'near';

  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StatusBar time="10:12" />

      {/* Subway disruption alert */}
      {!subwayDismissed && (
        <div
          style={{
            background: '#FEF3C7',
            borderBottom: '2px solid #F59E0B',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 15, flexShrink: 0 }}>⚠</span>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 700,
                color: '#92400E',
              }}
            >
              G train delays —{' '}
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: '#92400E',
              }}
            >
              allow 10 extra min
            </span>
          </div>
          <button
            onClick={() => setSubwayDismissed(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#92400E',
              fontSize: 18,
              padding: '2px 4px',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Top nav */}
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
          flexShrink: 0,
        }}
      >
        <Link
          href="/worker/map"
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink)',
            textDecoration: 'none',
            fontSize: 20,
          }}
        >
          ←
        </Link>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--mute)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Day of
        </span>
        <div style={{ width: 36 }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>

        {/* Countdown banner */}
        <div style={{ background: 'var(--paper)', padding: '20px 22px 18px', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 64,
            color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.05em',
          }}>
            23 min.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{
              background: 'var(--ink)', borderRadius: 99, padding: '7px 16px',
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
              color: '#fff', letterSpacing: '0.04em',
            }}>
              Head out by 10:35A
            </span>
            <span style={{
              background: 'transparent', border: '1.5px solid var(--ink)', borderRadius: 99, padding: '7px 16px',
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
              color: 'var(--ink)', letterSpacing: '0.04em',
            }}>
              Starts at 11A
            </span>
          </div>
        </div>

        {/* Confirmed shift card */}
        <div style={{ padding: '14px 14px 0' }}>
          <ShiftCard
            state="confirmed"
            role="Barista"
            time="11A — 4P"
            loc="Bedstuy, BK"
            venue="Padmore's Coffee"
            brief={['Confirmed · on shift in 23 min.', 'Tap to check in when you arrive.']}
            pay="$140"
            rate="Locked · clock in to start"
          />
        </div>

        {/* Commute card */}
        <div
          style={{
            margin: '14px 22px',
            padding: 16,
            background: 'var(--card)',
            border: '2px solid var(--ink)',
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)' }}>
              G train · DeKalb Av → Bedford-Nostrand
            </span>
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--ink)',
                flexShrink: 0,
                marginLeft: 8,
              }}
            >
              25 min
            </span>
          </div>

          <svg width="100%" height="130" viewBox="0 0 346 130" fill="none" style={{ display: 'block' }}>
            <rect width="346" height="130" rx="8" fill="#F0F2F5" />
            <rect x="0" y="35" width="346" height="6" fill="white" opacity="0.7" />
            <rect x="0" y="75" width="346" height="6" fill="white" opacity="0.7" />
            <rect x="0" y="110" width="346" height="6" fill="white" opacity="0.7" />
            <rect x="60" y="0" width="6" height="130" fill="white" opacity="0.7" />
            <rect x="150" y="0" width="6" height="130" fill="white" opacity="0.7" />
            <rect x="240" y="0" width="6" height="130" fill="white" opacity="0.7" />
            <path
              d="M 80 125 L 80 90 L 100 75 L 160 75 L 160 40 L 180 22 L 240 22"
              stroke="#72c15f"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <circle cx="80" cy="100" r="5" fill="white" stroke="#72c15f" strokeWidth="2" />
            <circle cx="80" cy="100" r="2.5" fill="#72c15f" />
            <circle cx="240" cy="22" r="6" fill="white" stroke="#72c15f" strokeWidth="2" />
            <circle cx="240" cy="22" r="3" fill="#72c15f" />
            <text x="90" y="104" fontFamily="monospace" fontSize="9" fill="#6B6E78">DeKalb Av</text>
            <text x="250" y="26" fontFamily="monospace" fontSize="9" fill="#72c15f">Bedford-Nostrand</text>
            <circle cx="80" cy="125" r="5" fill="#72c15f" opacity="0.9" />
            <circle cx="80" cy="125" r="2" fill="white" />
          </svg>
        </div>

        {/* Clock-in radius */}
        <div
          style={{
            margin: '0 22px 14px',
            padding: '14px 16px',
            background: isNear ? 'var(--hydrant-soft)' : 'var(--card)',
            border: `2px solid ${isNear ? 'var(--hydrant)' : 'var(--line)'}`,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            transition: 'all 0.3s ease',
          }}
        >
          {/* Radius ring visual */}
          <div style={{ position: 'relative', width: 38, height: 38, flexShrink: 0 }}>
            <svg width="38" height="38" viewBox="0 0 38 38">
              <circle cx="19" cy="19" r="17" fill="none" stroke={isNear ? 'var(--hydrant)' : 'var(--mute)'} strokeWidth="1.5" opacity="0.3" />
              <circle cx="19" cy="19" r="10" fill="none" stroke={isNear ? 'var(--hydrant)' : 'var(--mute)'} strokeWidth="1.5" opacity="0.5" />
              <circle cx="19" cy="19" r={isNear ? 6 : 4} fill={isNear ? 'var(--hydrant)' : 'var(--mute)'} />
              {isNear && (
                <text x="19" y="23" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="system-ui">✓</text>
              )}
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 14,
                color: isNear ? 'var(--hydrant)' : 'var(--ink)',
              }}
            >
              {isNear ? "You're here." : '0.4 mi from venue'}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginTop: 2 }}>
              {isNear ? 'Clock-in is unlocked' : 'Unlocks within 500 ft of venue'}
            </div>
          </div>

          {/* Demo proximity toggle */}
          <button
            onClick={() => setProximity(p => p === 'far' ? 'near' : 'far')}
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: '4px 8px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              color: 'var(--mute)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {isNear ? '← away' : 'arrive →'}
          </button>
        </div>

        {/* Checklist */}
        <div style={{ padding: '0 22px', marginTop: 4 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}
            >
              Before you go
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)' }}>
              2 of 4
            </span>
          </div>

          {[
            { label: 'Phone charged', checked: true, optional: false },
            { label: 'All black outfit', checked: true, optional: false },
            { label: 'Food handler card', checked: false, optional: true },
            { label: 'Cash for tips out', checked: false, optional: true },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: item.checked ? 'var(--ink)' : 'transparent',
                  border: item.checked ? 'none' : '2px solid var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l2.5 2.5L10 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 14,
                  color: item.checked ? 'var(--mute)' : 'var(--ink)',
                  textDecoration: item.checked ? 'line-through' : 'none',
                  flex: 1,
                }}
              >
                {item.label}
              </span>

              {item.optional && (
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--mute-2)',
                    background: 'var(--paper-2)',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  optional
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Message from Tomás */}
        <div
          style={{
            margin: '14px 22px',
            padding: 16,
            background: 'var(--card)',
            border: '2px solid var(--ink)',
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #c4a577, #8b6545 60%, #5c3d22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'white' }}>T</span>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
                Tomás
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginLeft: 8 }}>
                sent this morning
              </span>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>
            Door&apos;s on Tompkins, ring the bell — I&apos;ll be downstairs. Coffee&apos;s already going.
          </p>
        </div>

        {/* Bottom links */}
        <div style={{ padding: '0 22px 8px', display: 'flex', justifyContent: 'center', gap: 24 }}>
          <Link
            href="/v3/cancel-flow"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--mute)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--line)',
              paddingBottom: 2,
            }}
          >
            Running late or need to cancel?
          </Link>
          <Link
            href="/worker/report"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              color: 'var(--mute)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--line)',
              paddingBottom: 2,
            }}
          >
            Report an issue
          </Link>
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          padding: '12px 22px 36px',
          background: 'linear-gradient(to bottom, transparent, var(--paper) 35%)',
        }}
      >
        {isNear ? (
          <button
            onClick={() => router.push('/worker/on-shift')}
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 22px',
              background: 'var(--hydrant)',
              borderRadius: 99,
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 16,
              color: '#FFFFFF',
              textAlign: 'center',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            Clock in now. →
          </button>
        ) : (
          <Link
            href="/worker/on-shift"
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 22px',
              background: 'var(--ink)',
              borderRadius: 99,
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 16,
              color: '#FFFFFF',
              textAlign: 'center',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            I&apos;m heading there.
          </Link>
        )}
      </div>
    </div>
  );
}
