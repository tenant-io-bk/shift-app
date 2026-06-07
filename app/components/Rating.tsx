interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function Rating({ value, count, size = 'md' }: RatingProps) {
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  const starSize = size === 'sm' ? 9 : size === 'lg' ? 13 : 11;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <svg width={starSize} height={starSize} viewBox="0 0 12 12" fill="none">
        <path d="M6 1L7.2 4.2L10.5 4.5L8.1 6.6L8.9 10L6 8.2L3.1 10L3.9 6.6L1.5 4.5L4.8 4.2L6 1Z" fill="var(--ink)" />
      </svg>
      <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span style={{ fontFamily: 'var(--body)', fontSize: fontSize - 2, color: 'var(--ink)' }}>
          ({count})
        </span>
      )}
    </span>
  );
}
