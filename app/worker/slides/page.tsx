'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';

const SLIDES = [
  {
    img: '/fpo-1.jpg',
    imgPosition: 'center 15%',
    headline: 'Pick up a shift. Today.',
    sub: 'Browse hundreds of same-day openings across Brooklyn, Manhattan, and Queens. No resume, no waiting.',
  },
  {
    img: '/fpo-2.jpg',
    imgPosition: 'center top',
    headline: 'Fill your floor in minutes.',
    sub: 'Post a shift and get confirmed, vetted workers before the rush starts. No agencies, no markups.',
  },
  {
    img: '/fpo-3.jpg',
    imgPosition: 'center center',
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
      <StatusBar dark time="9:41" />

      {/* Photo panel */}
      <div style={{
        height: '55vh',
        margin: '8px 16px 0',
        borderRadius: 6,
        overflow: 'hidden',
        background: '#111',
        flexShrink: 0,
      }}>
        <img
          src={slide.img}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: slide.imgPosition,
            display: 'block',
          }}
        />
      </div>

      {/* Text panel */}
      <div style={{
        flex: 1,
        background: 'var(--paper)',
        padding: '20px 24px 36px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
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
          marginBottom: 24,
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
