import React from 'react';

export type ShiftFamily = 'bar' | 'kitchen' | 'floor' | 'event' | 'counter';
export type ShiftState = 'browse' | 'pending' | 'confirmed' | 'urgent' | 'past';

interface ShiftCardProps {
  role: string;
  time: string;
  location: string;
  venue: string;
  brief: string;
  totalPay: number;
  rateLabel: string;
  family: ShiftFamily;
  state?: ShiftState;
  compact?: false;
  onClick?: () => void;
  style?: React.CSSProperties;
}

interface CompactInviteProps {
  compact: 'invite';
  icon: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCta?: () => void;
  style?: React.CSSProperties;
}

interface CompactBookedProps {
  compact: 'booked';
  day: string;
  month: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  onCta?: () => void;
  style?: React.CSSProperties;
}

type Props = ShiftCardProps | CompactInviteProps | CompactBookedProps;

const FAMILY_BG: Record<ShiftFamily, string> = {
  bar:     'var(--green-soft)',
  kitchen: 'var(--red-soft)',
  floor:   'var(--pink-soft)',
  event:   'var(--lilac-soft)',
  counter: 'var(--steel)',
};

const FAMILY_ROLE_BG: Record<ShiftFamily, string> = {
  bar:     'var(--green)',
  kitchen: 'var(--red)',
  floor:   'var(--pink)',
  event:   'var(--lilac)',
  counter: '#3d5478',
};

const FAMILY_ROLE_COLOR: Record<ShiftFamily, string> = {
  bar:     'var(--ink)',
  kitchen: 'var(--bg)',
  floor:   'var(--ink)',
  event:   'var(--bg)',
  counter: 'var(--bg)',
};

export default function ShiftCard(props: Props) {
  if ('compact' in props && props.compact === 'invite') {
    return (
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--line)',
        borderRadius: 20,
        padding: '14px 16px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 14,
        alignItems: 'center',
        ...props.style,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--green)', color: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14,
          flexShrink: 0,
        }}>{props.icon}</div>
        <div style={{ lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14.5, letterSpacing: '-0.015em' }}>{props.title}</div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 12.5, opacity: 0.65, marginTop: 2 }}>{props.subtitle}</div>
        </div>
        <button onClick={props.onCta} style={{
          background: 'var(--green)', color: 'var(--ink)',
          border: 'none', padding: '7px 14px', borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12.5, letterSpacing: '-0.01em',
          cursor: 'pointer', flexShrink: 0,
        }}>{props.ctaLabel}</button>
      </div>
    );
  }

  if ('compact' in props && props.compact === 'booked') {
    return (
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--line)',
        borderRadius: 20,
        padding: '14px 16px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 14,
        alignItems: 'center',
        ...props.style,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'var(--bg)', border: '1px solid var(--line)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.04em', lineHeight: 1 }}>{props.day}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 8.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7, marginTop: 1 }}>{props.month}</span>
        </div>
        <div style={{ lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14.5, letterSpacing: '-0.015em' }}>{props.title}</div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 12.5, opacity: 0.65, marginTop: 2 }}>{props.subtitle}</div>
        </div>
        <button onClick={props.onCta} style={{
          background: 'transparent', color: 'var(--ink)',
          border: '1.5px solid var(--ink)', padding: '7px 14px', borderRadius: 99,
          fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12.5, letterSpacing: '-0.01em',
          cursor: 'pointer', flexShrink: 0,
        }}>{props.ctaLabel}</button>
      </div>
    );
  }

  // Full shift card
  const p = props as ShiftCardProps;
  const state = p.state ?? 'browse';

  let cardBg = FAMILY_BG[p.family];
  let cardColor = 'var(--ink)';
  let rolePillBg = FAMILY_ROLE_BG[p.family];
  let rolePillColor = FAMILY_ROLE_COLOR[p.family];
  let timePillStyle: React.CSSProperties = { border: '1.5px solid var(--ink)', color: 'var(--ink)', background: 'transparent' };
  let locPillStyle: React.CSSProperties = { border: '1.5px solid var(--ink)', color: 'var(--ink)', background: 'var(--card)' };
  let boxShadow: string | undefined;
  let statusPill: string | null = null;

  if (state === 'confirmed') {
    cardBg = 'var(--green)';
    rolePillBg = 'var(--ink)'; rolePillColor = 'var(--bg)';
  } else if (state === 'pending') {
    cardBg = 'var(--yellow)';
    boxShadow = 'inset 0 0 0 1px var(--ink)';
    rolePillBg = 'var(--ink)'; rolePillColor = 'var(--bg)';
    statusPill = 'Pending';
  } else if (state === 'urgent') {
    cardBg = 'var(--ink)'; cardColor = 'var(--bg)';
    rolePillBg = 'var(--red)'; rolePillColor = 'var(--bg)';
    timePillStyle = { border: '1.5px solid var(--bg)', color: 'var(--bg)', background: 'transparent' };
    locPillStyle = { border: '1.5px solid var(--bg)', color: 'var(--bg)', background: 'transparent' };
  } else if (state === 'past') {
    cardBg = 'var(--grey-soft)'; cardColor = 'rgba(13,14,18,0.55)';
    rolePillBg = 'rgba(13,14,18,0.4)'; rolePillColor = 'var(--bg)';
    timePillStyle = { border: '1.5px solid rgba(13,14,18,0.3)', color: 'rgba(13,14,18,0.55)', background: 'transparent' };
    locPillStyle = { border: '1.5px solid rgba(13,14,18,0.3)', color: 'rgba(13,14,18,0.55)', background: 'transparent' };
  }

  const pill: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center',
    padding: '6px 13px', borderRadius: 99,
    fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12.5,
    letterSpacing: '0.02em', textTransform: 'uppercase', lineHeight: 1,
    whiteSpace: 'nowrap',
  };

  return (
    <div
      onClick={p.onClick}
      style={{
        borderRadius: 22,
        padding: '22px 26px 24px',
        background: cardBg,
        color: cardColor,
        boxShadow,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '14px 24px',
        alignItems: 'start',
        cursor: p.onClick ? 'pointer' : undefined,
        ...p.style,
      }}
    >
      {/* Pills row */}
      <div style={{ gridColumn: '1/2', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ ...pill, background: rolePillBg, color: rolePillColor }}>{p.role}</span>
        <span style={{ ...pill, ...timePillStyle }}>{p.time}</span>
        {statusPill && (
          <span style={{ ...pill, background: 'var(--ink)', color: 'var(--bg)', letterSpacing: '0.08em' }}>{statusPill}</span>
        )}
      </div>

      {/* Location pill — right */}
      <span style={{ ...pill, ...locPillStyle, gridColumn: '2/3', justifySelf: 'end' }}>{p.location}</span>

      {/* Venue name + brief */}
      <div style={{ gridColumn: '1/2', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          fontFamily: 'var(--sans)', fontWeight: 700,
          fontSize: 38, letterSpacing: '-0.035em', lineHeight: 0.96,
          color: cardColor,
        }}>{p.venue}</div>
        <div style={{
          fontFamily: 'var(--body)', fontSize: 15, lineHeight: 1.4,
          color: cardColor, opacity: state === 'urgent' ? 0.82 : undefined,
        }}>{p.brief}</div>
      </div>

      {/* Price column */}
      <div style={{
        gridColumn: '2/3', gridRow: '2/3',
        justifySelf: 'end', textAlign: 'right',
        display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end',
        paddingTop: 4,
      }}>
        <div style={{
          fontFamily: 'var(--sans)', fontWeight: 700,
          fontSize: 64, letterSpacing: '-0.055em', lineHeight: 0.9,
          color: cardColor, display: 'inline-flex', alignItems: 'baseline',
        }}>
          <span style={{ fontSize: '0.55em', fontWeight: 700, letterSpacing: '-0.04em', marginRight: 1, transform: 'translateY(-3px)', display: 'inline-block' }}>$</span>
          {p.totalPay}
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          lineHeight: 1.4, color: cardColor, opacity: 0.78,
          textAlign: 'right',
        }}>{p.rateLabel}</div>
      </div>
    </div>
  );
}
