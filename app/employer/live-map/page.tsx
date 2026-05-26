import Link from 'next/link';
import EmployerNav from '@/app/components/EmployerNav';

export default function Page() {
  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      <style>{`
        @keyframes green-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        .green-pulse { animation: green-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Map area — full bleed */}
      <div
        style={{
          height: 420,
          background: '#E8EAF0',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <svg
          width="390"
          height="420"
          viewBox="0 0 390 420"
          fill="none"
          style={{ position: 'absolute', inset: 0 }}
        >
          <rect width="390" height="420" fill="#E8EAF0" />

          {/* Roads */}
          <rect x="0" y="80" width="390" height="12" fill="white" opacity="0.85" />
          <rect x="0" y="158" width="390" height="11" fill="white" opacity="0.85" />
          <rect x="0" y="238" width="390" height="11" fill="white" opacity="0.85" />
          <rect x="0" y="320" width="390" height="11" fill="white" opacity="0.85" />
          <rect x="65" y="0" width="11" height="420" fill="white" opacity="0.85" />
          <rect x="148" y="0" width="11" height="420" fill="white" opacity="0.85" />
          <rect x="232" y="0" width="11" height="420" fill="white" opacity="0.85" />
          <rect x="315" y="0" width="11" height="420" fill="white" opacity="0.85" />

          {/* City blocks */}
          <rect x="0" y="0" width="63" height="78" rx="2" fill="#D8DAE4" />
          <rect x="78" y="0" width="68" height="78" rx="2" fill="#D4D6E0" />
          <rect x="161" y="0" width="69" height="78" rx="2" fill="#DADBEB" />
          <rect x="245" y="0" width="68" height="78" rx="2" fill="#D8DAE4" />
          <rect x="328" y="0" width="62" height="78" rx="2" fill="#D4D6E0" />
          <rect x="0" y="94" width="63" height="62" rx="2" fill="#D4D6E4" />
          <rect x="78" y="94" width="68" height="62" rx="2" fill="#DDE4D8" />
          <rect x="161" y="94" width="69" height="62" rx="2" fill="#D8DAE4" />
          <rect x="245" y="94" width="68" height="62" rx="2" fill="#D4D6E0" />
          <rect x="328" y="94" width="62" height="62" rx="2" fill="#DDE4D8" />
          <rect x="0" y="171" width="63" height="65" rx="2" fill="#D8DAE4" />
          <rect x="78" y="171" width="68" height="65" rx="2" fill="#D4D6E0" />
          <rect x="161" y="171" width="69" height="65" rx="2" fill="#DADBEB" />
          <rect x="245" y="171" width="68" height="65" rx="2" fill="#DDE4D8" />
          <rect x="328" y="171" width="62" height="65" rx="2" fill="#D4D6E0" />
          <rect x="0" y="251" width="63" height="67" rx="2" fill="#DDE4D8" />
          <rect x="78" y="251" width="68" height="67" rx="2" fill="#D8DAE4" />
          <rect x="161" y="251" width="69" height="67" rx="2" fill="#D4D6E0" />
          <rect x="245" y="251" width="68" height="67" rx="2" fill="#DADBEB" />
          <rect x="328" y="251" width="62" height="67" rx="2" fill="#D8DAE4" />
          <rect x="0" y="333" width="63" height="87" rx="2" fill="#D4D6E0" />
          <rect x="78" y="333" width="68" height="87" rx="2" fill="#DADBEB" />
          <rect x="161" y="333" width="69" height="87" rx="2" fill="#D8DAE4" />
          <rect x="245" y="333" width="68" height="87" rx="2" fill="#D4D6E0" />
          <rect x="328" y="333" width="62" height="87" rx="2" fill="#DDE4D8" />

          {/* Dashed rings */}
          <circle cx="195" cy="210" r="80" stroke="#B0B4BD" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />
          <circle cx="195" cy="210" r="150" stroke="#B0B4BD" strokeWidth="1.5" strokeDasharray="6 5" fill="none" />

          {/* Center P marker */}
          <circle cx="195" cy="210" r="14" fill="#0D0E12" />
          <text x="195" y="215" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="system-ui">P</text>

          {/* Green worker dots */}
          <circle cx="130" cy="155" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
          <circle cx="160" cy="270" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
          <circle cx="248" cy="140" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
          <circle cx="290" cy="180" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
          <circle cx="100" cy="290" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
          <circle cx="315" cy="270" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />
          <circle cx="210" cy="310" r="6" fill="#16A34A" stroke="white" strokeWidth="2" />

          {/* Purple favorited worker dots */}
          <circle cx="170" cy="168" r="6" fill="#72c15f" stroke="white" strokeWidth="2" />
          <circle cx="230" cy="255" r="6" fill="#72c15f" stroke="white" strokeWidth="2" />
          <circle cx="148" cy="225" r="6" fill="#72c15f" stroke="white" strokeWidth="2" />
          <text x="170" y="158" textAnchor="middle" fontSize="8" fill="#72c15f">♥</text>
          <text x="230" y="245" textAnchor="middle" fontSize="8" fill="#72c15f">♥</text>
        </svg>

        {/* Density chip */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'var(--ink)',
            color: 'white',
            borderRadius: 99,
            padding: '4px 8px',
            fontFamily: 'var(--body)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Density
        </div>

        {/* Neighborhood labels */}
        <div style={{ position: 'absolute', top: 50, left: 10, background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 99, padding: '4px 10px', fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, color: 'var(--mute)' }}>
          Bushwick · 11
        </div>
        <div style={{ position: 'absolute', top: 50, right: 10, background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 99, padding: '4px 10px', fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, color: 'var(--hydrant)' }}>
          Crown Hts · 19
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 10, background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 99, padding: '4px 10px', fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, color: 'var(--mute)' }}>
          Bed-Stuy · 42
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 10, background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 99, padding: '4px 10px', fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, color: 'var(--mute)' }}>
          Clinton Hill · 7
        </div>

      </div>

      {/* Bottom sheet */}
      <div
        style={{
          flex: 1,
          background: 'var(--card)',
          borderRadius: '18px 18px 0 0',
          boxShadow: '0 -4px 32px rgba(13,14,18,0.12)',
          paddingTop: 14,
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '14px 22px 8px' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            18 ready · within 1 mi
          </span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>
            Sort: Favorites first
          </span>
        </div>

        {/* Chip filter row */}
        <div style={{ display: 'flex', gap: 8, padding: '8px 22px', marginBottom: 4, overflowX: 'auto' }}>
          {[
            { label: '♥ Favorites', active: true },
            { label: '★ 4.8+', active: false },
            { label: 'Barista', active: false },
            { label: 'Open now', active: false },
          ].map((chip) => (
            <div
              key={chip.label}
              style={{
                padding: '6px 12px',
                borderRadius: 99,
                border: chip.active ? '2px solid var(--hydrant)' : '2px solid var(--ink)',
                background: chip.active ? 'var(--hydrant-soft)' : 'var(--paper-2)',
                color: chip.active ? 'var(--hydrant)' : 'var(--ink)',
                fontFamily: 'var(--body)',
                fontSize: 12,
                fontWeight: 600,
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              {chip.label}
            </div>
          ))}
        </div>

        {/* Worker rows */}
        <div>
          {[
            { initial: 'M', gradient: 'linear-gradient(135deg, #c4a577, #8b6545)', name: 'Marco Reyes', role: 'Barista', rating: '4.9', times: '4×', fav: true, action: 'Book' },
            { initial: 'S', gradient: 'linear-gradient(135deg, #a8c4a0, #6b9e62)', name: 'Sam O.', role: 'Barista', rating: '4.8', times: null, fav: true, action: 'Book' },
            { initial: 'J', gradient: 'linear-gradient(135deg, #b8a0c8, #8060a0)', name: 'Jules M.', role: 'Barista', rating: '4.7', times: null, fav: false, action: 'Invite' },
            { initial: 'E', gradient: 'linear-gradient(135deg, #f0c080, #c88040)', name: 'Elena P.', role: 'Server', rating: '4.6', times: null, fav: false, action: 'Invite' },
          ].map((worker) => (
            <div
              key={worker.name}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px' }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: worker.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'white' }}>{worker.initial}</span>
                </div>
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: worker.fav ? 'var(--hydrant)' : '#16A34A', border: '2px solid white' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{worker.name}</span>
                  {worker.times && (
                    <span style={{ background: 'var(--hydrant-soft)', color: 'var(--hydrant)', border: '1px solid var(--hydrant)', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600 }}>
                      {worker.times} here
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 1 }}>
                  {worker.role} · ★{worker.rating}
                </div>
              </div>
              <Link
                href="/employer/post-shift"
                style={{
                  padding: '0 14px',
                  height: 32,
                  borderRadius: 99,
                  border: '2px solid var(--ink)',
                  background: 'transparent',
                  fontFamily: 'var(--body)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--hydrant)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                {worker.action}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <EmployerNav active="dashboard" />
    </div>
  );
}
