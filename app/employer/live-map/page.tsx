'use client';

import Link from 'next/link';
import EmployerNav from '@/app/components/EmployerNav';

const WORKERS = [
  { initial: 'M', name: 'Marco Reyes', role: 'Barista', rating: '4.9', times: '4×', fav: true,  action: 'Book', pinX: '33%', pinY: '62%' },
  { initial: 'S', name: 'Sam O.',      role: 'Barista', rating: '4.8', times: null,  fav: true,  action: 'Book', pinX: '68%', pinY: '38%' },
  { initial: 'J', name: 'Jules M.',    role: 'Barista', rating: '4.7', times: null,  fav: false, action: 'Invite', pinX: '55%', pinY: '48%' },
  { initial: 'E', name: 'Elena P.',    role: 'Server',  rating: '4.6', times: null,  fav: false, action: 'Invite', pinX: '44%', pinY: '72%' },
];

export default function Page() {
  return (
    <div style={{ maxWidth: 390, height: '100dvh', margin: '0 auto', position: 'relative', overflow: 'hidden', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes worker-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .worker-pulse { position: absolute; inset: -4px; border-radius: 50%; background: #16A34A; animation: worker-pulse 2s ease-out infinite; }
      `}</style>

      {/* Full-screen map */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9618%2C40.6772%2C-73.9218%2C40.6972&layer=mapnik"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', filter: 'grayscale(60%) contrast(0.9)' }}
        title="Live map"
      />

      {/* Center P marker */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0D0E12', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 11, color: '#fff' }}>P</span>
        </div>
      </div>

      {/* Worker dots on map */}
      {WORKERS.map(w => (
        <div key={w.name} style={{ position: 'absolute', left: w.pinX, top: w.pinY, transform: 'translate(-50%,-50%)', zIndex: 10, width: 12, height: 12 }}>
          <div className="worker-pulse" />
          <div style={{ position: 'relative', width: 12, height: 12, borderRadius: '50%', background: w.fav ? '#9A7CE0' : '#16A34A', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', zIndex: 1 }} />
        </div>
      ))}

      {/* Floating header */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 99, padding: '6px 14px', border: '1.5px solid rgba(0,0,0,0.08)' }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live · {WORKERS.length} en route</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 99, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#9A7CE0' }} />
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)' }}>Saved</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderRadius: 99, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)' }}>Available</span>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{
        position: 'absolute', bottom: 72, left: 0, right: 0, zIndex: 20,
        background: 'var(--paper)',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -4px 32px rgba(13,14,18,0.18)',
        paddingBottom: 8,
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--line-2)', margin: '12px auto 0' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '14px 22px 8px' }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            18 Ready · Within 1 Mi
          </span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)' }}>
            Sort: Favorites first
          </span>
        </div>

        {/* Chip filters */}
        <div style={{ display: 'flex', gap: 8, padding: '0 22px 10px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: '♥ Favorites', active: true },
            { label: '★ 4.8+',      active: false },
            { label: 'Barista',     active: false },
          ].map(chip => (
            <div key={chip.label} style={{
              padding: '8px 16px', borderRadius: 99, flexShrink: 0, cursor: 'pointer',
              border: '2px solid var(--ink)',
              background: chip.active ? 'var(--ink)' : 'transparent',
              color: chip.active ? '#fff' : 'var(--ink)',
              fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600,
            }}>
              {chip.label}
            </div>
          ))}
        </div>

        {/* Worker rows */}
        {WORKERS.map(worker => (
          <div key={worker.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 22px' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: 'white' }}>{worker.initial}</span>
              </div>
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: worker.fav ? '#9A7CE0' : '#16A34A', border: '2px solid white' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{worker.name}</span>
                {worker.times && (
                  <span style={{ background: 'var(--ink)', color: '#fff', borderRadius: 99, padding: '2px 8px', fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600 }}>
                    {worker.times} here
                  </span>
                )}
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 1 }}>
                {worker.role} · ★{worker.rating}
              </div>
            </div>
            <Link href="/employer/post-shift" style={{
              padding: '8px 16px', borderRadius: 99,
              border: '2px solid var(--ink)', background: 'transparent',
              fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, color: 'var(--ink)',
              flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none',
            }}>
              {worker.action}
            </Link>
          </div>
        ))}
      </div>

      <EmployerNav active="dashboard" />
    </div>
  );
}
