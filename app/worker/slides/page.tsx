'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';

const SLIDES = [
  {
    visual: {
      bg: '#0D0E12',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 800,
            fontSize: 88,
            color: '#5A3CC2',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>237</div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: 10,
          }}>shifts open near you</div>
          <div style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            marginTop: 28,
            flexWrap: 'wrap',
            padding: '0 24px',
          }}>
            {['Barista', 'Bartender', 'Server', 'Line Cook', 'Host', 'Catering'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 99,
                padding: '5px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>{s}</span>
            ))}
          </div>
        </div>
      ),
    },
    headline: 'Pick up a shift. Today.',
    sub: 'Browse hundreds of same-day openings across Brooklyn, Manhattan, and Queens. No resume, no waiting.',
  },
  {
    visual: {
      bg: '#5A3CC2',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}>shift filled in</div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 800,
            fontSize: 88,
            color: '#FFFFFF',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>4<span style={{ fontSize: 48, opacity: 0.5 }}>min</span></div>
          <div style={{
            marginTop: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '0 32px',
          }}>
            {[
              { name: 'Marco R.', role: 'Barista · 4.9★', eta: '6 min' },
              { name: 'Sam O.', role: 'Server · 4.8★', eta: '9 min' },
            ].map(w => (
              <div key={w.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 10,
                padding: '10px 14px',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{w.name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{w.role}</div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px' }}>{w.eta}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    headline: 'Fill your floor in minutes.',
    sub: 'Post a shift and get confirmed, vetted workers before the rush starts. No agencies, no markups.',
  },
  {
    visual: {
      bg: '#0D0E12',
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            color: '#16A34A',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}>paid out</div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 800,
            fontSize: 88,
            color: '#FFFFFF',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}>$174<span style={{ color: '#5A3CC2' }}>.</span></div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 10,
          }}>11 minutes after clocking out</div>
          <div style={{
            marginTop: 28,
            padding: '12px 20px',
            background: 'rgba(22,163,74,0.12)',
            border: '1px solid rgba(22,163,74,0.25)',
            borderRadius: 10,
            display: 'inline-block',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#16A34A', letterSpacing: '0.08em' }}>
              CHASE ·· 4471 · Confirmed
            </div>
          </div>
        </div>
      ),
    },
    headline: 'Same-day pay. Every time.',
    sub: 'Clock out and the money moves. No invoices, no chasing. Straight to your debit card in minutes.',
  },
];

export default function WorkerSlides() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const router = useRouter();

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0 && current < SLIDES.length - 1) setCurrent(c => c + 1);
    if (diff < 0 && current > 0) setCurrent(c => c - 1);
  }

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  return (
    <div
      style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StatusBar dark={slide.visual.bg === '#0D0E12' || slide.visual.bg === '#5A3CC2'} time="9:41" />

      {/* Visual panel */}
      <div style={{
        background: slide.visual.bg,
        height: '52vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.4s ease',
        flexShrink: 0,
        padding: '0 24px',
      }}>
        {slide.visual.content}
      </div>

      {/* Text panel */}
      <div style={{
        flex: 1,
        background: 'var(--paper)',
        borderRadius: '20px 20px 0 0',
        marginTop: -20,
        padding: '28px 24px 36px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                borderRadius: 99,
                background: i === current ? 'var(--ink)' : 'var(--paper-3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--sans)',
          fontWeight: 800,
          fontSize: 32,
          letterSpacing: '-0.03em',
          color: 'var(--ink)',
          lineHeight: 1.05,
          marginBottom: 12,
          flex: 1,
        }}>
          {slide.headline}
        </h2>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          lineHeight: 1.6,
          marginBottom: 28,
        }}>
          {slide.sub}
        </p>

        {isLast ? (
          <button
            onClick={() => router.push('/worker/role')}
            style={{
              width: '100%',
              padding: '16px',
              background: 'var(--ink)',
              border: 'none',
              borderRadius: 14,
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 18,
              color: '#fff',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            Get started →
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => router.push('/worker/role')}
              style={{
                flex: 1,
                padding: '16px',
                background: 'var(--paper-2)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 15,
                color: 'var(--mute)',
                cursor: 'pointer',
              }}
            >
              Skip
            </button>
            <button
              onClick={() => setCurrent(c => c + 1)}
              style={{
                flex: 2,
                padding: '16px',
                background: 'var(--ink)',
                border: 'none',
                borderRadius: 14,
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 18,
                color: '#fff',
                cursor: 'pointer',
                letterSpacing: '-0.01em',
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
