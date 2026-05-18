import Link from 'next/link';

const workerScreens = [
  { label: 'Splash', href: '/worker/splash' },
  { label: 'Slides', href: '/worker/slides' },
  { label: 'Role Picker', href: '/worker/role' },
  { label: 'Map', href: '/worker/map' },
  { label: 'Job Detail', href: '/worker/job-detail' },
  { label: 'Locked In', href: '/worker/confirm' },
  { label: 'Day Of', href: '/worker/day-of' },
  { label: 'On Shift', href: '/worker/on-shift' },
  { label: 'Paid Out', href: '/worker/paid-out' },
  { label: 'Wallet', href: '/worker/wallet' },
  { label: 'Profile', href: '/worker/profile' },
  { label: 'Notifications', href: '/worker/notifications' },
  { label: 'Settings', href: '/worker/settings' },
];

const employerScreens = [
  { label: 'Create Account', href: '/employer/create-account' },
  { label: 'Find Business', href: '/employer/onboarding' },
  { label: 'Biz Profile', href: '/employer/business-profile' },
  { label: 'Billing', href: '/employer/billing' },
  { label: 'Dashboard', href: '/employer/dashboard' },
  { label: 'Live Map', href: '/employer/live-map' },
  { label: 'Post Shift', href: '/employer/post-shift' },
  { label: 'Shift Posted', href: '/employer/shift-posted' },
  { label: 'Roster', href: '/employer/roster' },
  { label: 'Rating', href: '/employer/rating' },
  { label: 'Account', href: '/employer/account' },
];

const phase01 = [
  { label: 'Phone Verify', href: '/v3/phone-verify' },
  { label: 'SMS Verify', href: '/v3/sms-verify' },
  { label: 'Credentials', href: '/v3/credentials' },
  { label: 'Availability', href: '/v3/availability' },
  { label: 'Payout Setup', href: '/v3/payout-setup' },
  { label: 'W-9', href: '/v3/w9' },
  { label: 'Profile Setup', href: '/v3/profile-setup' },
  { label: 'Neighborhood', href: '/v3/neighborhood' },
  { label: 'Cancel Flow', href: '/v3/cancel-flow' },
  { label: 'No-show', href: '/v3/no-show' },
];

const phase02 = [
  { label: 'Availability', href: '/v3/availability' },
  { label: 'Mutual Review', href: '/v3/mutual-review' },
];

const phase03 = [
  { label: 'Books', href: '/v3/books' },
  { label: 'Dispute', href: '/v3/dispute' },
];

function ScreenLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        padding: '8px 12px',
        borderRadius: 8,
        background: 'var(--card)',
        border: '1px solid var(--line)',
        fontFamily: 'var(--mono)',
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: 'var(--ink)',
        textDecoration: 'none',
        transition: 'background 0.15s',
      }}
    >
      {label}
    </Link>
  );
}

function ScreenGroup({ title, screens }: { title: string; screens: { label: string; href: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--mute)',
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
        }}
      >
        {screens.map((s) => (
          <ScreenLink key={s.href} label={s.label} href={s.href} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper-2)',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 0 60px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 390 }}>
        {/* Header */}
        <div
          style={{
            background: 'var(--ink)',
            padding: '48px 28px 36px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <h1
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 72,
                letterSpacing: '-0.075em',
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              shift.
            </h1>
            <span style={{ color: 'var(--hydrant)', fontSize: 32, lineHeight: 1 }}>•</span>
          </div>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 14,
              color: 'var(--mute)',
              marginTop: 10,
              letterSpacing: '0.02em',
            }}
          >
            NYC Hyperlocal Labor · v3
          </p>
        </div>

        {/* Role cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            padding: '20px 16px',
          }}
        >
          {/* Worker card */}
          <Link
            href="/worker/splash"
            style={{
              background: 'var(--ink)',
              borderRadius: 14,
              padding: '20px 18px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 130,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 22,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              Worker
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'var(--mute)',
                lineHeight: 1.4,
                flex: 1,
              }}
            >
              Find shifts. Get paid same-day.
            </span>
            <span
              style={{
                color: 'var(--hydrant)',
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              →
            </span>
          </Link>

          {/* Employer card */}
          <Link
            href="/employer/onboarding"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--ink)',
              borderRadius: 14,
              padding: '20px 18px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 130,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              Employer
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'var(--mute)',
                lineHeight: 1.4,
                flex: 1,
              }}
            >
              Post shifts. Fill fast.
            </span>
            <span
              style={{
                color: 'var(--hydrant)',
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              →
            </span>
          </Link>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'var(--line)',
            margin: '4px 16px 20px',
          }}
        />

        {/* Screens index */}
        <div style={{ padding: '0 16px' }}>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: 18,
            }}
          >
            Screens
          </div>

          <ScreenGroup title="Worker Flow" screens={workerScreens} />
          <ScreenGroup title="Employer Flow" screens={employerScreens} />
          <ScreenGroup title="Phase 01 — Onboarding" screens={phase01} />
          <ScreenGroup title="Phase 02 — Ops" screens={phase02} />
          <ScreenGroup title="Phase 03 — Advanced" screens={phase03} />
        </div>
      </div>
    </div>
  );
}
