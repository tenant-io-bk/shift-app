'use client';

import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

const UPCOMING = [
  {
    venue: "Padmore's Coffee",
    role: 'Barista',
    neighborhood: 'Bed-Stuy',
    date: 'Tomorrow · Mon 26',
    time: '11A–4P',
    pay: '$140',
    href: '/worker/day-of',
  },
  {
    venue: 'The Wren',
    role: 'Server',
    neighborhood: 'Williamsburg',
    date: 'Wed 28 May',
    time: '6P–11P',
    pay: '$120',
    href: '/worker/job-detail',
  },
  {
    venue: 'Bar Blondeau',
    role: 'Barback',
    neighborhood: 'Williamsburg',
    date: 'Fri 30 May',
    time: '10P–2A',
    pay: '$96',
    href: '/worker/job-detail',
  },
];

const PROFILE_COMPLETE = false;

function roleStyle(role: string): { bg: string; color: string } {
  const r = role.toLowerCase();
  if (/bartend|barback|barista/.test(r)) return { bg: 'var(--green-soft)', color: 'var(--ink)' };
  if (/cook|prep|dish|line/.test(r)) return { bg: 'var(--red-soft)', color: 'var(--ink)' };
  if (/server|host/.test(r)) return { bg: 'var(--pink)', color: 'var(--ink)' };
  if (/cater|event|pop/.test(r)) return { bg: 'var(--lilac-soft)', color: 'var(--lilac)' };
  return { bg: 'var(--steel)', color: 'var(--ink)' };
}

export default function WorkerHome() {
  const next = UPCOMING[0];
  const rest = UPCOMING.slice(1);

  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 88,
      }}
    >
      <StatusBar time="10:12" />

      {/* Header */}
      <div
        style={{
          padding: '20px 22px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--body)',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--ink)',
              marginBottom: 6,
            }}
          >
            Sunday · May 25
          </div>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 200,
              fontSize: 38,
              color: 'var(--ink)',
              letterSpacing: '-0.06em',
              lineHeight: 0.9,
            }}
          >
            Good morning
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 38,
                color: 'var(--ink)',
                letterSpacing: '-0.06em',
                lineHeight: 1,
              }}
            >
              Jordan.
            </div>
            <Link href="/worker/profile" style={{
              flexShrink: 0,
              fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700,
              color: 'var(--ink)', border: '1.5px solid var(--ink)',
              borderRadius: 99, padding: '4px 10px',
              textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
              alignSelf: 'center', marginTop: 2,
            }}>
              Edit
            </Link>
          </div>
        </div>

        {/* Notification bell */}
        <Link
          href="/worker/notifications"
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'var(--card)',
            border: '1.5px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            marginTop: 6,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 3a6 6 0 0 0-6 6v3l-2 3h16l-2-3V9a6 6 0 0 0-6-6Z"
              stroke="var(--ink)"
              strokeWidth="1.4"
              fill="none"
              strokeLinejoin="round"
            />
            <path
              d="M9 16a2 2 0 0 0 4 0"
              stroke="var(--ink)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: 7,
              right: 7,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--red)',
              border: '1.5px solid var(--paper)',
            }}
          />
        </Link>
      </div>

      {/* Profile completion nudge */}
      {!PROFILE_COMPLETE && (
        <Link
          href="/worker/profile"
          style={{
            margin: '0 16px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            background: 'var(--green-soft)',
            border: 'none',
            borderRadius: 12,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              border: '2px solid rgba(13,14,18,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--ink)',
                clipPath: 'inset(0 50% 0 0)',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--ink)',
              fontWeight: 600,
              flex: 1,
            }}
          >
            Profile 75% — Add Photo to Unlock All Shifts
          </span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)' }}>→</span>
        </Link>
      )}

      {/* Next shift — hero */}
      <div
        style={{
          margin: '0 16px 14px',
          background: 'var(--steel-soft)',
          borderRadius: 18,
          padding: '20px 20px 18px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--online)',
              boxShadow: '0 0 0 3px rgba(114,193,95,0.25)',
            }}
          />
          Next shift confirmed
        </div>

        <div
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: '-0.045em',
            lineHeight: 1.05,
            color: 'var(--ink)',
            marginBottom: 4,
          }}
        >
          {next.venue}
        </div>
        <div
          style={{
            fontFamily: 'var(--body)',
            fontSize: 13,
            color: 'var(--ink)',
            marginBottom: 18,
          }}
        >
          {next.role} · {next.neighborhood}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 36,
                letterSpacing: '-0.055em',
                color: 'var(--ink)',
                lineHeight: 1,
              }}
            >
              {next.pay}
            </div>
            <div
              style={{
                fontFamily: 'var(--body)',
                fontSize: 12,
                color: 'var(--ink)',
                marginTop: 4,
              }}
            >
              {next.date} · {next.time}
            </div>
          </div>

          <Link
            href={next.href}
            style={{
              background: 'var(--ink)',
              border: 'none',
              borderRadius: 99,
              padding: '10px 18px',
              fontFamily: 'var(--body)',
              fontSize: 12,
              fontWeight: 500,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            Day-of Details →
          </Link>
        </div>
      </div>

      {/* More upcoming */}
      <div style={{ margin: '0 16px 14px' }}>
        <div
          style={{
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            marginBottom: 10,
            padding: '0 2px',
          }}
        >
          Also confirmed
        </div>

        <div
          style={{
            background: 'var(--card)',
            border: '2px solid var(--ink)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {rest.map((shift, i) => (
            <Link
              key={i}
              href={shift.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '13px 16px',
                borderBottom: i < rest.length - 1 ? '1px solid var(--line)' : 'none',
                textDecoration: 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 600,
                      fontSize: 14,
                      color: 'var(--ink)',
                    }}
                  >
                    {shift.venue}
                  </span>
                  <span style={{
                    fontFamily: 'var(--body)',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 99,
                    background: roleStyle(shift.role).bg,
                    color: roleStyle(shift.role).color,
                    letterSpacing: '0.03em',
                    flexShrink: 0,
                  }}>
                    {shift.role}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 12,
                    color: 'var(--ink)',
                  }}
                >
                  {shift.date}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 700,
                    fontSize: 16,
                    color: 'var(--ink)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {shift.pay}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 11,
                    color: 'var(--ink)',
                    marginTop: 1,
                  }}
                >
                  {shift.time}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Discover shifts CTA */}
      <Link
        href="/worker/map"
        style={{
          margin: '0 16px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 18px',
          background: 'var(--ink)',
          border: 'none',
          borderRadius: 14,
          textDecoration: 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--body)',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 4,
            }}
          >
            Browse Shifts
          </div>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 17,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            18 Near You on the Map
          </div>
          <div
            style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.75)',
              marginTop: 2,
            }}
          >
            Bed-Stuy · Crown Heights · Williamsburg
          </div>
        </div>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
          <path
            d="M11 14h6M14 11l3 3-3 3"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* Quick stats */}
      <div style={{ margin: '0 16px', display: 'flex', gap: 8 }}>
        {[
          { label: 'This week', value: '$408.', bg: 'var(--green-soft)' },
          { label: 'Shifts', value: '3 Booked', bg: 'var(--steel-soft)' },
          { label: 'Rating', value: '4.9★', bg: 'var(--lilac-soft)' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              background: stat.bg,
              border: 'none',
              borderRadius: 12,
              padding: '12px 8px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--ink)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--body)',
                fontSize: 10,
                color: 'var(--ink)',
                marginTop: 5,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="home" />
    </div>
  );
}
