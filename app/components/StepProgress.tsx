'use client';

const DOT = 8;
const GAP = 6;

export default function StepProgress({ step, total }: { step: number; total: number }) {
  const pillWidth = step * DOT + (step - 1) * GAP + 18;
  const remaining = total - step;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: GAP }}>
      <div style={{
        height: DOT,
        width: pillWidth,
        borderRadius: 99,
        background: 'var(--hydrant)',
        transition: 'width 0.45s cubic-bezier(0.34, 1.2, 0.64, 1)',
        flexShrink: 0,
      }} />
      {Array.from({ length: remaining }).map((_, i) => (
        <div key={i} style={{
          width: DOT,
          height: DOT,
          borderRadius: '50%',
          background: 'var(--paper-3)',
          flexShrink: 0,
        }} />
      ))}
    </div>
  );
}
