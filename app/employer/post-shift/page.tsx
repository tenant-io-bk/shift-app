'use client';

import Link from 'next/link';
import { useState } from 'react';
import EmployerNav from '@/app/components/EmployerNav';

export default function Page() {
  const [count, setCount] = useState(1);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper-2)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 0 60px',
      }}
    >
      <div
        style={{
          width: 390,
          minHeight: 844,
          background: 'var(--paper)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(13,14,18,0.08), 0 30px 60px -20px rgba(13,14,18,0.22)',
          borderRadius: 44,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Nav Bar */}
        <div
          style={{
            height: 44,
            background: 'var(--paper)',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <Link
            href="/employer/live-map"
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink)',
              textDecoration: 'none',
              fontSize: 18,
            }}
          >
            ←
          </Link>
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
            }}
          >
            Post a shift
          </span>
          <div style={{ width: 32 }} />
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            padding: '22px 22px 140px',
          }}
        >
          {/* ROLE section */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--hydrant)',
                marginBottom: 10,
              }}
            >
              Role
            </div>
            <div
              style={{
                display: 'flex',
                gap: 8,
                overflowX: 'auto',
                scrollbarWidth: 'none',
                paddingBottom: 4,
              }}
            >
              {['Barista', 'Server', 'Barback', 'Host', 'Bartender', 'Cook'].map((role) => (
                <div
                  key={role}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 99,
                    border: '1px solid var(--line-2)',
                    background: role === 'Barista' ? 'var(--ink)' : 'transparent',
                    color: role === 'Barista' ? 'white' : 'var(--ink)',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* WHEN section */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--hydrant)',
                marginBottom: 10,
              }}
            >
              When
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  background: 'var(--card)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--mute)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 4,
                  }}
                >
                  Start
                </div>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Today · 11:00A
                </div>
              </div>
              <div
                style={{
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  background: 'var(--card)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--mute)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 4,
                  }}
                >
                  End
                </div>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  4:00P
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'var(--mute)',
                marginTop: 8,
              }}
            >
              5 hrs
            </div>
          </div>

          {/* PAY section */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--hydrant)',
                marginBottom: 10,
              }}
            >
              Pay
            </div>
            <div
              style={{
                background: 'var(--ink)',
                borderRadius: 14,
                padding: 20,
              }}
            >
              {/* Pay amount */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 800,
                    fontSize: 52,
                    color: 'white',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  $26
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 16,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  /hr
                </span>
              </div>

              {/* Total */}
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: 12,
                }}
              >
                Total for 5h: $130.
              </div>
            </div>
          </div>

          {/* HOW MANY section */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--hydrant)',
                marginBottom: 10,
              }}
            >
              How Many
            </div>

            {/* Stepper */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <button
                onClick={() => setCount(Math.max(1, count - 1))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: '1px solid var(--line-2)',
                  background: 'var(--card)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                −
              </button>
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'var(--ink)',
                  minWidth: 24,
                  textAlign: 'center',
                }}
              >
                {count}
              </span>
              <button
                onClick={() => setCount(count + 1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: '1px solid var(--line-2)',
                  background: 'var(--card)',
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                +
              </button>
            </div>

            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: 'var(--mute)',
                marginTop: 8,
              }}
            >
              Back-up: 1 standby auto-invited
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 22px 32px',
            background: 'linear-gradient(to bottom, transparent, var(--paper) 30%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              All in: $130.
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: 'var(--mute)',
              }}
            >
              $0 to post
            </span>
          </div>

          <Link
            href="/employer/roster"
            style={{
              display: 'block',
              background: 'var(--ink)',
              color: 'white',
              borderRadius: 12,
              padding: '16px 22px',
              textAlign: 'center',
              textDecoration: 'none',
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '-0.01em',
              marginBottom: 8,
            }}
          >
            Post this shift.
          </Link>

          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center' }}>
            $0 posted · billed when filled
          </div>
        </div>
      </div>
      <EmployerNav active="post" />
    </div>
  );
}
