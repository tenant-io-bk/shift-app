'use client';

import Link from 'next/link';
import { useState } from 'react';
import EmployerNav from '@/app/components/EmployerNav';

export default function Page() {
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [role, setRole] = useState('Barista');

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
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
          href="/employer/dashboard"
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '22px 22px 160px' }}>
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
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
            {['Barista', 'Server', 'Barback', 'Host', 'Bartender', 'Cook'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 99,
                  border: '1px solid var(--line-2)',
                  background: role === r ? 'var(--ink)' : 'transparent',
                  color: role === r ? 'white' : 'var(--ink)',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {r}
              </button>
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
            <div style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px', background: 'var(--card)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Start</div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Today · 11:00A</div>
            </div>
            <div style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px', background: 'var(--card)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>End</div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)', letterSpacing: '-0.01em' }}>4:00P</div>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginTop: 8 }}>5 hrs</div>
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
          <div style={{ background: 'var(--ink)', borderRadius: 14, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 52, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>$26</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>/hr</span>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              style={{
                width: 36, height: 36, borderRadius: 8, border: '1px solid var(--line-2)',
                background: 'var(--card)', fontFamily: 'var(--sans)', fontWeight: 700,
                fontSize: 20, color: 'var(--ink)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
              }}
            >
              −
            </button>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', minWidth: 24, textAlign: 'center' }}>
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                width: 36, height: 36, borderRadius: 8, border: '1px solid var(--line-2)',
                background: 'var(--card)', fontFamily: 'var(--sans)', fontWeight: 700,
                fontSize: 20, color: 'var(--ink)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
              }}
            >
              +
            </button>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)', marginTop: 8 }}>
            Back-up: 1 standby auto-invited
          </div>
        </div>

        {/* NOTES section */}
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
            Notes for the worker
          </div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            placeholder="Dress code, entrance location, what to bring, anything they need to know before showing up..."
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'var(--card)',
              border: `1px solid ${notes.length > 0 ? 'var(--ink)' : 'var(--line)'}`,
              borderRadius: 10,
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: 'var(--ink)',
              outline: 'none',
              resize: 'none',
              lineHeight: 1.6,
              transition: 'border-color 0.15s',
            }}
          />
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginTop: 6 }}>
            Workers see this before accepting. Keep it short and useful.
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 72,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          padding: '16px 22px',
          background: 'linear-gradient(to bottom, transparent, var(--paper) 30%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            All in: $130.
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)' }}>$0 to post</span>
        </div>
        <Link
          href="/employer/shift-posted"
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
            marginBottom: 6,
          }}
        >
          Post this shift.
        </Link>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center' }}>
          $0 posted · billed when filled
        </div>
      </div>

      <EmployerNav active="post" />
    </div>
  );
}
