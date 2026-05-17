import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

export default function WorkerSplash() {
  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: '#0D0E12',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes pulse-ring-splash {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .splash-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #5A3CC2;
          animation: pulse-ring-splash 2s ease-out infinite;
        }
      `}</style>

      <StatusBar dark time="9:41" />

      {/* Wordmark area */}
      <div
        style={{
          padding: '40px 28px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 800,
            fontSize: 88,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            lineHeight: 0.95,
            textAlign: 'center',
          }}
        >
          shift.
        </h1>

        {/* Live indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 16,
          }}
        >
          <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <div className="splash-pulse-ring" />
            <div
              style={{
                position: 'relative',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#5A3CC2',
                zIndex: 1,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.02em',
            }}
          >
            237 shifts open right now
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 20,
            color: '#B0B4BD',
            marginTop: 28,
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          Need cash? Pick up a shift.
        </p>
      </div>

      {/* Role picker cards */}
      <div
        style={{
          padding: '32px 22px 0',
          display: 'flex',
          gap: 12,
          flex: 1,
        }}
      >
        {/* Worker card */}
        <Link
          href="/worker/map"
          style={{
            flex: 1,
            background: '#5A3CC2',
            borderRadius: 16,
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 100,
            textDecoration: 'none',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 20,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              Worker
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.70)',
                marginTop: 4,
              }}
            >
              Earn today.
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 22,
              color: '#FFFFFF',
              lineHeight: 1,
              marginTop: 16,
            }}
          >
            →
          </div>
        </Link>

        {/* Employer card */}
        <Link
          href="/employer/onboarding"
          style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '20px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 100,
            textDecoration: 'none',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 20,
                color: '#0D0E12',
                letterSpacing: '-0.02em',
              }}
            >
              Employer
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 13,
                color: '#6B6E78',
                marginTop: 4,
              }}
            >
              Fill your floor.
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 22,
              color: '#5A3CC2',
              lineHeight: 1,
              marginTop: 16,
            }}
          >
            →
          </div>
        </Link>
      </div>

      {/* Sign in link */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px 22px 48px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 13,
            color: '#6B6E78',
          }}
        >
          Already on SHIFT?{' '}
          <span style={{ color: '#B0B4BD', textDecoration: 'underline', cursor: 'pointer' }}>
            Sign in
          </span>
        </span>
      </div>
    </div>
  );
}
