'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';

const NEIGHBORHOODS = [
  { name: 'Bed-Stuy', borough: 'Brooklyn', shifts: 42 },
  { name: 'Williamsburg', borough: 'Brooklyn', shifts: 67 },
  { name: 'Crown Heights', borough: 'Brooklyn', shifts: 29 },
  { name: 'Bushwick', borough: 'Brooklyn', shifts: 38 },
  { name: 'Park Slope', borough: 'Brooklyn', shifts: 31 },
  { name: 'Lower East Side', borough: 'Manhattan', shifts: 84 },
  { name: 'East Village', borough: 'Manhattan', shifts: 76 },
  { name: 'Astoria', borough: 'Queens', shifts: 24 },
  { name: 'Long Island City', borough: 'Queens', shifts: 19 },
];

const BOROUGHS = ['All', 'Brooklyn', 'Manhattan', 'Queens'];

export default function Neighborhood() {
  const router = useRouter();
  const [zip, setZip] = useState('');
  const [selected, setSelected] = useState('Bed-Stuy');
  const [borough, setBorough] = useState('Brooklyn');
  const [radius, setRadius] = useState(2);

  const filtered = NEIGHBORHOODS.filter(n => borough === 'All' || n.borough === borough);
  const selectedData = NEIGHBORHOODS.find(n => n.name === selected);

  function handleZip(val: string) {
    const cleaned = val.replace(/\D/g, '').slice(0, 5);
    setZip(cleaned);
    // Auto-match zip to neighborhood
    if (cleaned === '11221' || cleaned === '11233') { setSelected('Bed-Stuy'); setBorough('Brooklyn'); }
    else if (cleaned === '11211') { setSelected('Williamsburg'); setBorough('Brooklyn'); }
    else if (cleaned === '11213') { setSelected('Crown Heights'); setBorough('Brooklyn'); }
    else if (cleaned === '11237') { setSelected('Bushwick'); setBorough('Brooklyn'); }
    else if (cleaned === '10002') { setSelected('Lower East Side'); setBorough('Manhattan'); }
    else if (cleaned === '10009') { setSelected('East Village'); setBorough('Manhattan'); }
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
        <Link href="/v3/profile-setup" style={{ fontFamily: 'var(--sans)', fontSize: 20, color: 'var(--ink)', textDecoration: 'none' }}>←</Link>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Your area</span>
        <div style={{ width: 20 }} />
      </div>

      {/* Progress */}
      <div style={{ padding: '8px 22px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--paper-3)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'var(--ink)', borderRadius: 99 }} />
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color: 'var(--hydrant)', fontWeight: 600 }}>8</span> / 8
        </span>
      </div>

      <div style={{ padding: '16px 22px 140px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hydrant)', marginBottom: 10 }}>
          YOUR NEIGHBORHOOD
        </div>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.03em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 10 }}>
          Where do you want to work?
        </h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)', marginBottom: 24, lineHeight: 1.5 }}>
          We'll show you shifts within walking or transit distance.
        </p>

        {/* ZIP input */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 8 }}>
            Enter ZIP code
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              inputMode="numeric"
              value={zip}
              onChange={e => handleZip(e.target.value)}
              placeholder="e.g. 11221"
              style={{
                width: '100%', height: 52, padding: '0 16px',
                background: 'var(--card)', border: '1px solid var(--line)',
                borderRadius: 10, fontFamily: 'var(--sans)', fontSize: 20,
                letterSpacing: '0.1em', color: 'var(--ink)', outline: 'none',
              }}
            />
            {zip.length === 5 && (
              <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: '#16A34A', fontWeight: 600 }}>✓ {selected}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', letterSpacing: '0.08em' }}>or browse</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        {/* Borough filter */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
          {BOROUGHS.map(b => (
            <button
              key={b}
              onClick={() => setBorough(b)}
              style={{
                padding: '6px 14px', borderRadius: 99, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
                background: borough === b ? 'var(--ink)' : 'var(--paper-3)',
                color: borough === b ? '#fff' : 'var(--mute)',
              }}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Neighborhood grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {filtered.map(n => {
            const active = selected === n.name;
            return (
              <button
                key={n.name}
                onClick={() => { setSelected(n.name); setZip(''); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                  border: `1px solid ${active ? 'var(--ink)' : 'var(--line)'}`,
                  background: active ? 'var(--ink)' : 'var(--card)',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: active ? '#fff' : 'var(--ink)' }}>{n.name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: active ? 'rgba(255,255,255,0.55)' : 'var(--mute)', marginTop: 2 }}>{n.borough}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: active ? 'var(--hydrant)' : 'var(--hydrant)', letterSpacing: '-0.02em' }}>{n.shifts}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: active ? 'rgba(255,255,255,0.5)' : 'var(--mute)' }}>shifts open</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Radius */}
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 10 }}>
            Max travel distance
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[0.5, 1, 2, 5].map(r => (
              <button
                key={r}
                onClick={() => setRadius(r)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer',
                  border: `1px solid ${radius === r ? 'var(--ink)' : 'var(--line)'}`,
                  background: radius === r ? 'var(--ink)' : 'var(--card)',
                  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
                  color: radius === r ? '#fff' : 'var(--mute)',
                  transition: 'all 0.15s',
                }}
              >
                {r < 1 ? '½' : r} mi
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, padding: '16px 22px 36px', background: 'linear-gradient(to bottom, transparent, var(--paper) 40%)' }}>
        <Link
          href="/worker/map"
          style={{
            display: 'block', width: '100%', padding: '15px 22px',
            borderRadius: 12, background: 'var(--hydrant)', color: '#FFFFFF',
            fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16,
            textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em',
          }}
        >
          Show me {selectedData?.shifts ?? '—'} shifts in {selected} →
        </Link>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 8 }}>
          Within {radius < 1 ? '½' : radius} mile{radius !== 1 ? 's' : ''} · updates in real time
        </p>
      </div>
    </div>
  );
}
