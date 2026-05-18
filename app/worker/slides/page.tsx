'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';

const SLIDES = [
  {
    img: '/CIRCLE_1.png',
    imgPosition: 'center 15%',
    headline: 'Need cash fast?',
    sub: 'Browse hundreds of same-day openings across Brooklyn, Manhattan, and Queens. No resume, no waiting.',
  },
  {
    img: '/CIRCLE_2.png',
    imgPosition: 'center top',
    headline: 'Need staff tonight?',
    sub: 'Post a shift and get confirmed, vetted workers before the rush starts. No agencies, no markups.',
  },
  {
    img: '/CIRCLE_3.png',
    imgPosition: 'center center',
    headline: 'Paid in minutes.',
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
      style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--hydrant)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
{/* Status bar — dark text on green */}
      <StatusBar time="9:41" />

      {/* Squircle image — pre-cropped PNG, transparency shows green bg */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={slide.img}
          alt=""
          style={{
            width: 390,
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* White bottom sheet — overlaps squircle slightly */}
      <div style={{
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        marginTop: -40,
        padding: '20px 24px 36px',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
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
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: '-0.075em',
          color: 'var(--ink)',
          lineHeight: 1.0,
          marginBottom: 10,
        }}>
          {slide.headline}
        </h2>

        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          color: 'var(--mute)',
          lineHeight: 1.6,
          marginBottom: 20,
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
