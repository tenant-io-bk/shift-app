import Link from 'next/link';
import React from 'react';

// ─── HeroCard ────────────────────────────────────────────────────────────────
// Large editorial card. One focal action. Oversized heading.
type HeroCardProps = {
  eyebrow?: string;
  heading: string;
  sub?: string;
  value?: string;           // big money/number display
  valueSub?: string;        // small label under value
  bg?: string;              // defaults to var(--ink)
  dark?: boolean;           // true = white text on dark bg
  cta?: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export function HeroCard({ eyebrow, heading, sub, value, valueSub, bg = 'var(--ink)', dark = true, cta, href, onClick, children }: HeroCardProps) {
  const textColor = dark ? '#fff' : 'var(--ink)';
  const mutedColor = dark ? 'rgba(255,255,255,0.5)' : 'var(--mute)';
  const inner = (
    <div style={{ borderRadius: 24, background: bg, padding: '22px 22px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {eyebrow && (
        <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: mutedColor, marginBottom: 12 }}>
          {eyebrow}
        </div>
      )}
      <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.055em', lineHeight: 1, color: textColor, marginBottom: sub ? 4 : 0 }}>
        {heading}
      </div>
      {sub && (
        <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: mutedColor, marginTop: 4, marginBottom: value ? 18 : 0 }}>
          {sub}
        </div>
      )}
      {value && (
        <div style={{ marginTop: sub ? 0 : 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 52, letterSpacing: '-0.065em', lineHeight: 0.9, color: textColor }}>
              {value}
            </div>
            {valueSub && (
              <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: mutedColor, marginTop: 6 }}>{valueSub}</div>
            )}
          </div>
          {cta && (
            <div style={{ background: dark ? 'rgba(255,255,255,0.12)' : 'var(--ink)', color: dark ? '#fff' : '#fff', borderRadius: 99, padding: '10px 18px', fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: dark ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              {cta}
            </div>
          )}
        </div>
      )}
      {!value && cta && (
        <div style={{ marginTop: 16 }}>
          <div style={{ background: dark ? 'rgba(255,255,255,0.12)' : 'var(--ink)', color: dark ? '#fff' : '#fff', borderRadius: 99, padding: '10px 18px', fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-block', border: dark ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
            {cta}
          </div>
        </div>
      )}
      {children}
    </div>
  );
  if (href) return <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</Link>;
  if (onClick) return <div onClick={onClick} style={{ cursor: 'pointer' }}>{inner}</div>;
  return inner;
}

// ─── StackCard ───────────────────────────────────────────────────────────────
// Compact row card for lists. Title + meta on left, value on right.
type StackCardProps = {
  title: string;
  sub?: string;
  meta?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;   // avatar/icon slot
  bg?: string;
  href?: string;
  onClick?: () => void;
  borderBottom?: boolean;
};

export function StackCard({ title, sub, meta, right, left, bg = 'transparent', href, onClick, borderBottom }: StackCardProps) {
  const inner = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', background: bg, borderBottom: borderBottom ? '1px solid var(--line)' : undefined, cursor: href || onClick ? 'pointer' : undefined }}>
      {left && <div style={{ flexShrink: 0 }}>{left}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{title}</div>
        {sub && <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginTop: 2, lineHeight: 1.35 }}>{sub}</div>}
        {meta && <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 2, fontWeight: 600, opacity: 0.7 }}>{meta}</div>}
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
  if (href) return <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</Link>;
  if (onClick) return <div onClick={onClick}>{inner}</div>;
  return inner;
}

// ─── MoneyCard ───────────────────────────────────────────────────────────────
// Earnings/pay display card. Green tint. Oversized amount.
type MoneyCardProps = {
  amount: string;           // e.g. "$174.00"
  label: string;            // e.g. "Paid out"
  period?: string;          // e.g. "Today · Barista · Padmore's"
  items?: { label: string; value: string }[];
  bg?: string;
};

export function MoneyCard({ amount, label, period, items, bg = 'var(--green-soft)' }: MoneyCardProps) {
  return (
    <div style={{ borderRadius: 24, background: bg, padding: '22px 22px 20px' }}>
      <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 56, letterSpacing: '-0.065em', lineHeight: 0.88, color: 'var(--ink)', marginBottom: period ? 6 : 0 }}>
        {amount}
      </div>
      {period && (
        <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)', marginBottom: items ? 16 : 0 }}>{period}</div>
      )}
      {items && (
        <div style={{ borderTop: '1px solid rgba(13,14,18,0.1)', marginTop: 14, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mute)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── StatusPill ──────────────────────────────────────────────────────────────
// Inline pill. State drives color.
type StatusState = 'confirmed' | 'pending' | 'urgent' | 'standby' | 'enroute' | 'past' | 'live' | 'paid';

const STATUS_STYLES: Record<StatusState, { bg: string; color: string }> = {
  confirmed: { bg: 'var(--green-soft)',  color: 'var(--ink)' },
  pending:   { bg: 'var(--yellow-soft)', color: 'var(--ink)' },
  urgent:    { bg: 'var(--red-soft)',    color: 'var(--red)' },
  standby:   { bg: 'var(--paper-2)',     color: 'var(--mute)' },
  enroute:   { bg: 'var(--paper-2)',     color: 'var(--ink)' },
  past:      { bg: 'var(--grey-soft)',   color: 'var(--mute)' },
  live:      { bg: '#DCFCE7',            color: '#16A34A' },
  paid:      { bg: 'var(--green-soft)',  color: 'var(--ink)' },
};

type StatusPillProps = {
  label: string;
  state?: StatusState;
  dot?: boolean;
};

export function StatusPill({ label, state, dot }: StatusPillProps) {
  const s = state ? STATUS_STYLES[state] : { bg: 'var(--paper-2)', color: 'var(--ink)' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: s.bg, color: s.color, borderRadius: 99, padding: '4px 10px', fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} />}
      {label}
    </span>
  );
}

// ─── RolePill ────────────────────────────────────────────────────────────────
// Role/family colored pill.
const ROLE_BG: Record<string, { bg: string; color: string }> = {
  barista:   { bg: 'var(--green-soft)',  color: 'var(--ink)' },
  bartender: { bg: 'var(--green-soft)',  color: 'var(--ink)' },
  barback:   { bg: 'var(--green-soft)',  color: 'var(--ink)' },
  server:    { bg: 'var(--pink)',        color: 'var(--ink)' },
  host:      { bg: 'var(--pink)',        color: 'var(--ink)' },
  cook:      { bg: 'var(--red-soft)',    color: 'var(--ink)' },
  'prep cook':{ bg: 'var(--red-soft)',   color: 'var(--ink)' },
  'line cook':{ bg: 'var(--red-soft)',   color: 'var(--ink)' },
  catering:  { bg: 'var(--lilac-soft)', color: 'var(--ink)' },
  cashier:   { bg: 'var(--steel-soft)', color: 'var(--ink)' },
  retail:    { bg: 'var(--steel-soft)', color: 'var(--ink)' },
};

type RolePillProps = {
  role: string;
  size?: 'sm' | 'md';
};

export function RolePill({ role, size = 'md' }: RolePillProps) {
  const s = ROLE_BG[role.toLowerCase()] ?? { bg: 'var(--paper-2)', color: 'var(--ink)' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: s.bg, color: s.color, borderRadius: 99, padding: size === 'sm' ? '3px 8px' : '5px 12px', fontFamily: 'var(--body)', fontSize: size === 'sm' ? 10 : 12, fontWeight: 700, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
      {role}
    </span>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
// Section label with optional right action link.
type SectionHeaderProps = {
  label: string;
  action?: string;
  onAction?: () => void;
  actionHref?: string;
  count?: string | number;
};

export function SectionHeader({ label, action, onAction, actionHref, count }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)' }}>
          {label}
        </span>
        {count !== undefined && (
          <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--mute)', opacity: 0.6 }}>{count}</span>
        )}
      </div>
      {action && (
        actionHref
          ? <Link href={actionHref} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}>{action}</Link>
          : <button onClick={onAction} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{action}</button>
      )}
    </div>
  );
}

// ─── BottomActionBar ─────────────────────────────────────────────────────────
// Fixed bottom bar. One primary CTA, optional ghost secondary.
type ActionBarAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  ghost?: boolean;
  disabled?: boolean;
};

type BottomActionBarProps = {
  primary: ActionBarAction;
  secondary?: ActionBarAction;
};

function ActionButton({ action, primary }: { action: ActionBarAction; primary: boolean }) {
  const style: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '100%', padding: '16px',
    borderRadius: 24,
    fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em',
    cursor: action.disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    border: 'none',
    opacity: action.disabled ? 0.4 : 1,
    ...(action.ghost
      ? { background: 'transparent', color: 'var(--ink)', borderWidth: 2, borderStyle: 'solid', borderColor: 'var(--ink)' }
      : primary
        ? { background: 'var(--ink)', color: '#fff' }
        : { background: 'var(--paper-2)', color: 'var(--ink)' }
    ),
  };
  if (action.href && !action.disabled) {
    return <Link href={action.href} style={style}>{action.label}</Link>;
  }
  return <button onClick={action.onClick} disabled={action.disabled} style={style}>{action.label}</button>;
}

export function BottomActionBar({ primary, secondary }: BottomActionBarProps) {
  return (
    <div style={{ padding: '12px 20px 28px', display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--line)', background: 'var(--paper)' }}>
      <ActionButton action={primary} primary={true} />
      {secondary && <ActionButton action={secondary} primary={false} />}
    </div>
  );
}
