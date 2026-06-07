'use client';

import Link from 'next/link';
import { useState } from 'react';
import EmployerNav from '@/app/components/EmployerNav';

const POSITIVE_TAGS = [
  'On time',
  'Well-presented',
  'Knew the menu',
  'Worked independently',
  'Great with guests',
  'Would rebook',
];

const NEGATIVE_TAGS = ['Late arrival', 'Needed direction'];

export default function Page() {
  const [starRating, setStarRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [rebook, setRebook] = useState<'yes' | 'no'>('yes');

  function toggleTag(label: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  const displayStars = hoveredStar ?? starRating;

  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        fontFamily: 'var(--body)',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 140,
      }}
    >
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
          Rate Worker
        </span>
        <div style={{ width: 32 }} />
      </div>

      {/* Worker info header */}
      <div
        style={{
          padding: '20px 22px 16px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 20,
              color: 'white',
            }}
          >
            J
          </span>
        </div>

        {/* Worker details */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 18,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Jordan M.
          </div>
          <div
            style={{
              fontFamily: 'var(--body)',
              fontSize: 13,
              color: 'var(--ink)',
              marginTop: 2,
            }}
          >
            Barista
          </div>
          <div
            style={{
              fontFamily: 'var(--body)',
              fontSize: 12,
              color: 'var(--ink)',
              marginTop: 2,
            }}
          >
            Today 11A–4P · Padmore&apos;s
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          padding: '14px 22px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          gap: 28,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 20,
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
            }}
          >
            4.9★
          </span>
          <span
            style={{
              fontFamily: 'var(--body)',
              fontSize: 11,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            Rating
          </span>
        </div>
        <div
          style={{
            width: 1,
            background: 'var(--line)',
            alignSelf: 'stretch',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 800,
              fontSize: 20,
              color: 'var(--ink)',
              letterSpacing: '-0.03em',
            }}
          >
            12
          </span>
          <span
            style={{
              fontFamily: 'var(--body)',
              fontSize: 11,
              color: 'var(--ink)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            Shifts completed
          </span>
        </div>
      </div>

      {/* Star rating */}
      <div style={{ padding: '24px 22px 0' }}>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 18,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 14,
          }}
        >
          How Was Jordan?
        </div>
        <div style={{ display: 'flex', gap: 0 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setStarRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                fontSize: 40,
                lineHeight: 1,
                color: star <= displayStars ? 'var(--ink)' : 'var(--paper-3)',
                transition: 'color 0.12s',
                textAlign: 'center',
              }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Quick-tag pills */}
      <div style={{ padding: '24px 22px 0' }}>
        <div
          style={{
            fontFamily: 'var(--body)',
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--ink)',
            marginBottom: 12,
          }}
        >
          What stood out?
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {POSITIVE_TAGS.map((tag) => {
            const on = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 99,
                  border: 'none',
                  background: on ? 'var(--green-soft)' : 'var(--paper-2)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--body)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                }}
              >
                {tag}
              </button>
            );
          })}

          {NEGATIVE_TAGS.map((tag) => {
            const on = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 99,
                  border: 'none',
                  background: on ? 'var(--red-soft)' : 'var(--paper-2)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--body)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Would you rebook? */}
      <div style={{ padding: '28px 22px 0' }}>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}
        >
          Would You Rebook Jordan?
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setRebook('yes')}
            style={{
              flex: 1,
              padding: '14px 0',
              borderRadius: 99,
              border: 'none',
              background: rebook === 'yes' ? 'var(--ink)' : 'var(--paper-2)',
              color: rebook === 'yes' ? 'white' : 'var(--ink)',
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.12s, color 0.12s',
              letterSpacing: '-0.01em',
            }}
          >
            Yes, Rebook
          </button>
          <button
            onClick={() => setRebook('no')}
            style={{
              flex: 1,
              padding: '14px 0',
              borderRadius: 99,
              border: 'none',
              background: rebook === 'no' ? 'var(--red-soft)' : 'var(--paper-2)',
              color: rebook === 'no' ? 'var(--red)' : 'var(--ink)',
              fontFamily: 'var(--sans)',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.12s, color 0.12s',
              letterSpacing: '-0.01em',
            }}
          >
            Not This Time
          </button>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 64,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 390,
          padding: '12px 22px',
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
          zIndex: 20,
        }}
      >
        <Link
          href="/employer/roster"
          style={{
            display: 'block',
            background: 'var(--ink)',
            color: 'white',
            borderRadius: 99,
            padding: '16px 22px',
            textAlign: 'center',
            textDecoration: 'none',
            fontFamily: 'var(--body)',
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: '-0.01em',
          }}
        >
          Submit Review →
        </Link>
      </div>

      <EmployerNav active="shifts" />
    </div>
  );
}
