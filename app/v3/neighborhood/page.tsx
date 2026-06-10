'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import StepProgress from '@/app/components/StepProgress';

// Default: Bed-Stuy center
const DEFAULT_LAT = 40.6872;
const DEFAULT_LON = -73.9418;

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const d = await res.json();
    return (
      d.address?.neighbourhood ||
      d.address?.suburb ||
      d.address?.city_district ||
      d.address?.borough ||
      d.address?.county ||
      ''
    );
  } catch { return ''; }
}

async function forwardGeocode(query: string): Promise<{ lat: number; lon: number; name: string } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', NYC')}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const d = await res.json();
    if (!d[0]) return null;
    return { lat: parseFloat(d[0].lat), lon: parseFloat(d[0].lon), name: d[0].display_name.split(',')[0] };
  } catch { return null; }
}

export default function Neighborhood() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [neighborhood, setNeighborhood] = useState('');
  const [query, setQuery] = useState('');
  const [locating, setLocating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateNeighborhood = useCallback(async (lat: number, lon: number) => {
    const name = await reverseGeocode(lat, lon);
    if (name) setNeighborhood(name);
  }, []);

  // Initialize Leaflet
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    (async () => {
      const L = (await import('leaflet')).default;

      // Patch default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [DEFAULT_LAT, DEFAULT_LON],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      // Amber dot marker
      const dotIcon = L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#F59E0B;border:2.5px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([DEFAULT_LAT, DEFAULT_LON], { icon: dotIcon, draggable: false }).addTo(map);
      markerRef.current = marker;
      leafletMapRef.current = map;

      // Update neighborhood when map moves
      map.on('moveend', () => {
        const c = map.getCenter();
        marker.setLatLng(c);
        updateNeighborhood(c.lat, c.lng);
      });

      updateNeighborhood(DEFAULT_LAT, DEFAULT_LON);
    })();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [updateNeighborhood]);

  function geolocate() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        if (leafletMapRef.current) {
          leafletMapRef.current.setView([lat, lon], 14);
        }
        setLocating(false);
      },
      () => setLocating(false)
    );
  }

  function handleQueryChange(val: string) {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.length < 3) return;
    debounceRef.current = setTimeout(async () => {
      const result = await forwardGeocode(val);
      if (result && leafletMapRef.current) {
        leafletMapRef.current.setView([result.lat, result.lon], 14);
        setNeighborhood(result.name);
      }
    }, 500);
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        .leaflet-container { font-family: inherit; }
      `}</style>

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)' }}>
        <Link href="/v3/availability" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Your Area</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '12px 22px 4px' }}>
        <StepProgress step={5} total={10} />
      </div>

      <div style={{ padding: '16px 22px 0' }}>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10 }}>STEP 4 OF 4</span>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 1, marginBottom: 8 }}>
          Where Do You Work?
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.5 }}>
          We&apos;ll show shifts within your radius. You can change this any time.
        </p>
      </div>

      {/* Map */}
      <div style={{ position: 'relative', margin: '0 22px', borderRadius: 14, overflow: 'hidden', height: 320, flexShrink: 0 }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%', filter: 'grayscale(40%)' }} />

        {/* Geolocate button */}
        <button
          onClick={geolocate}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 1000,
            width: 36, height: 36, borderRadius: '50%',
            background: '#fff', border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {locating
            ? <div style={{ width: 14, height: 14, border: '2px solid #ccc', borderTopColor: '#0D0E12', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            : <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="6.5" stroke="#0D0E12" strokeWidth="1.5" />
                <circle cx="9" cy="9" r="2" fill="#0D0E12" />
                <line x1="9" y1="1" x2="9" y2="4" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="14" x2="9" y2="17" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="1" y1="9" x2="4" y2="9" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="9" x2="17" y2="9" stroke="#0D0E12" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
          }
        </button>

        {/* Neighborhood label — follows map center */}
        {neighborhood && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -36px)',
            zIndex: 1000, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{
              background: '#fff', borderRadius: 20, padding: '5px 12px',
              fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13,
              color: 'var(--ink)', boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}>
              {neighborhood}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Text search */}
      <div style={{ padding: '20px 22px 0' }}>
        <input
          type="text"
          value={query}
          onChange={e => handleQueryChange(e.target.value)}
          placeholder="Enter your neighborhood or ZIP"
          style={{
            width: '100%', background: 'transparent', border: 'none',
            borderBottom: '1px solid var(--ink)', padding: '8px 0',
            fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 22px 40px', marginTop: 'auto' }}>
        <Link href="/v3/credentials" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', padding: '16px', background: 'var(--ink)', borderRadius: 99,
          fontFamily: 'var(--body)', fontWeight: 500, fontSize: 18,
          color: '#fff', letterSpacing: '-0.01em', textDecoration: 'none',
        }}>
          One More Step →
        </Link>
        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', textAlign: 'center', marginTop: 12 }}>
          Just payout info, then you&apos;re in.
        </p>
      </div>
    </div>
  );
}
