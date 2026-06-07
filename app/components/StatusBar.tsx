type StatusBarProps = {
  dark?: boolean;
  time?: string;
};

export default function StatusBar({ dark = false, time = '10:12' }: StatusBarProps) {
  const color = dark ? '#FFFFFF' : 'var(--ink)';

  return (
    <div
      className="status-bar"
      style={{ color }}
    >
      <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15 }}>
        {time}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill={color} />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill={color} />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill={color} />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={color} />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11S8.83 12.5 8 12.5 6.5 11.83 6.5 11 7.17 9.5 8 9.5Z" fill={color} />
          <path d="M3.76 7.24C4.99 5.98 6.7 5.18 8 5.18c1.3 0 3.01.8 4.24 2.06" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M1.27 4.73C3.14 2.83 5.44 1.75 8 1.75c2.56 0 4.86 1.08 6.73 3" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke={color} strokeWidth="1" />
          <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill={color} />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill={color} />
        </svg>
      </div>
    </div>
  );
}
