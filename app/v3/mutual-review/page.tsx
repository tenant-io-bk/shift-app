'use client';

import Link from 'next/link';
import { useState } from 'react';

const TAGS = [
  { label: 'Organized rush', selected: true, red: false },
  { label: 'Good briefing', selected: true, red: false },
  { label: 'Late start', selected: false, red: true },
  { label: 'Skipped break', selected: false, red: false },
  { label: 'Unclear instructions', selected: false, red: false },
  { label: 'Good energy', selected: false, red: false },
  { label: 'Well-stocked', selected: false, red: false },
];

export default function MutualReview() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [tags, setTags] = useState(TAGS.map((t) => ({ ...t })));

  function toggleTag(i: number) {
    setTags((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], selected: !next[i].selected };
      return next;
    });
  }

  const displayRating = hovered || rating;

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)' }}>
      {/* Nav */}
      <div style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--paper)',
      }}>
        <Link href="/worker/home" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Rate Padmore's</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Business photo header */}
      <div style={{
        height: 280,
        background: 'linear-gradient(to bottom, #8a9ba880, #5a6a7a)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px 18px',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--sans)',
            fontWeight: 600,
            fontSize: 32,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>Padmore's Coffee.</div>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 4,
          }}>172 Tompkins Ave · Bed-Stuy</p>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        padding: '14px 22px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--card)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {[
          { label: 'SHIFTS HERE', value: '1' },
          { label: 'AVG RATING', value: '4.9★' },
          { label: 'REBOOK RATE', value: '68%' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: i === 1 ? 'center' : i === 2 ? 'right' : 'left' }}>
            <p style={{
              fontFamily: 'var(--body)',
              fontSize: 9,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--mute)',
              marginBottom: 3,
            }}>{stat.label}</p>
            <p style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--ink)',
            }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px 22px 32px' }}>
        {/* Star rating */}
        <p style={{
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--ink)',
          letterSpacing: '-0.01em',
          marginBottom: 14,
        }}>How was working here?</p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              style={{
                width: 44,
                height: 44,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 3l3.8 7.7 8.5 1.2-6.1 6 1.4 8.5L16 22.4l-7.6 4-0.3.2 1.4-8.5-6.1-6 8.5-1.2z"
                  fill={star <= displayRating ? 'var(--yellow)' : 'var(--paper-3)'}
                  stroke={star <= displayRating ? 'var(--yellow)' : 'var(--paper-3)'}
                  strokeWidth="1"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Tags */}
        <p style={{
          fontFamily: 'var(--body)',
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--mute)',
          marginBottom: 10,
        }}>What went well?</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {tags.map((tag, i) => (
            <button
              key={i}
              onClick={() => toggleTag(i)}
              style={{
                padding: '10px 16px',
                borderRadius: 99,
                fontFamily: 'var(--sans)',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                border: tag.selected
                  ? (tag.red ? '2px solid var(--red)' : '2px solid var(--ink)')
                  : (tag.red ? '2px solid var(--red)' : '2px solid var(--ink)'),
                background: tag.selected
                  ? (tag.red ? 'var(--red)' : 'var(--ink)')
                  : 'transparent',
                color: tag.selected
                  ? '#fff'
                  : (tag.red ? 'var(--red)' : 'var(--ink)'),
                transition: 'all 0.15s ease',
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Anonymity notice */}
        <div style={{
          marginTop: 16,
          padding: 12,
          background: 'var(--paper-2)',
          borderRadius: 14,
          marginBottom: 24,
        }}>
          <p style={{
            fontFamily: 'var(--body)',
            fontSize: 12,
            color: 'var(--mute)',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}>Padmore's can't see who left a rating — only the aggregate.</p>
        </div>

        {/* CTA */}
        <Link href="/worker/map" style={{
          display: 'block',
          width: '100%',
          padding: '16px',
          background: 'var(--ink)',
          border: 'none',
          borderRadius: 99,
          fontFamily: 'var(--sans)',
          fontWeight: 700,
          fontSize: 18,
          color: '#fff',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          textAlign: 'center',
          textDecoration: 'none',
        }}>Submit review.</Link>
      </div>
    </div>
  );
}
