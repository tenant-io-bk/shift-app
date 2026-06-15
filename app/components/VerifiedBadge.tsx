'use client';

// Small "Verified <Role>" pill, shown on employer-facing worker cards when the
// worker has earned a skill badge from the AI skills quiz. `dark` adapts it for
// dark backgrounds (e.g. the filled-shift card).

export default function VerifiedBadge({ role, dark = false }: { role: string; dark?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: 'var(--body)',
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: dark ? '#fff' : 'var(--ink)',
        background: dark ? 'rgba(114,193,95,0.22)' : 'var(--green-soft)',
        borderRadius: 99,
        padding: '3px 9px 3px 6px',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 13,
          height: 13,
          borderRadius: '50%',
          background: 'var(--green)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="7" height="5" viewBox="0 0 11 9" fill="none">
          <path d="M1 4.5L4 7.5L10 1" stroke="#0D0E12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      Verified {role}
    </span>
  );
}
