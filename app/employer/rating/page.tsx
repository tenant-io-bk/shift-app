'use client';

import Link from 'next/link';
import { useState } from 'react';
import EmployerNav from '@/app/components/EmployerNav';

const ALL_TAGS = [
  { label: 'Calm under pressure', selected: true },
  { label: 'Clear communication', selected: true },
  { label: 'Showed up on time', selected: true },
  { label: 'Fast worker', selected: false },
  { label: 'Clean station', selected: false },
  { label: 'Team player', selected: false },
  { label: 'Great tips', selected: false },
  { label: 'Ran the bar solo', selected: false },
];

export default function Page() {
  const [starRating, setStarRating] = useState(5);
  const [tags, setTags] = useState(ALL_TAGS);

  function toggleTag(label: string) {
    setTags(tags.map((t) => t.label === label ? { ...t, selected: !t.selected } : t));
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
      {/* Top Nav Bar */}
      <div
        style={{
          height: 44,
          background: 'var(--paper)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <Link
          href="/employer/roster"
          style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink)',
            textDecoration: 'none',
            fontSize: 18,
          }}
        >
          ←
        </Link>
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
          }}
        >
          Rate your crew
        </span>
        <div style={{ width: 32 }} />
      </div>

      {/* Worker photo header */}
      <div
        style={{
          height: 180,
          position: 'relative',
          background: 'linear-gradient(160deg, rgba(184,160,144,0.6) 0%, #7a6040 100%)',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: 16,
            right: 90,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 36,
              color: 'white',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            Marco Reyes.
          </h2>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Barista · Padmore&apos;s · Today
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            background: 'rgba(0,0,0,0.4)',
            color: 'white',
            borderRadius: 99,
            padding: '4px 10px',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          5 hrs · $174 incl. tips
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          padding: '14px 22px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--card)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8,
        }}
      >
        {[
          { label: 'ON TIME', value: '✓' },
          { label: 'CAME BACK', value: '3×' },
          { label: 'RATING', value: 'New' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 22,
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 9.5,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--mute)',
                marginTop: 3,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Star rating section */}
      <div style={{ padding: '20px 22px 0' }}>
        <h3
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 22,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 14,
          }}
        >
          How was Marco?
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setStarRating(star)}
              style={{
                width: 36,
                height: 36,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: 28,
                lineHeight: 1,
                color: star <= starRating ? 'var(--hydrant)' : 'var(--paper-3)',
                transition: 'color 0.15s',
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Tag selection */}
      <div style={{ padding: '16px 22px 0' }}>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--mute)',
            marginBottom: 10,
          }}
        >
          What went well?
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => toggleTag(tag.label)}
              style={{
                padding: '7px 12px',
                borderRadius: 99,
                border: tag.selected ? '1px solid var(--hydrant)' : '1px solid var(--line)',
                background: tag.selected ? 'var(--hydrant-soft)' : 'var(--paper-2)',
                color: tag.selected ? 'var(--hydrant)' : 'var(--ink)',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div style={{ padding: '24px 22px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link
          href="/employer/dashboard"
          style={{
            display: 'block',
            background: 'var(--ink)',
            color: 'white',
            borderRadius: 12,
            padding: '16px 22px',
            textAlign: 'center',
            textDecoration: 'none',
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '-0.01em',
          }}
        >
          Rebook Marco.
        </Link>
        <button
          style={{
            display: 'block',
            background: 'transparent',
            border: '1px solid var(--line-2)',
            color: 'var(--ink)',
            borderRadius: 12,
            padding: '14px 22px',
            textAlign: 'center',
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Add to favorites
        </button>
      </div>

      <EmployerNav active="shifts" />
    </div>
  );
}
