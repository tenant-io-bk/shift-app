/**
 * SHIFT — 3 core UI primitives.
 *
 * HeroCard   — high-emotion editorial card (jobs, payouts, active shifts)
 * StackCard  — compact operational row (notifications, roster, alerts)
 * SystemRow  — clean utility row (forms, settings, billing, W9)
 *
 * Every screen uses ONE dominant primitive. Do not mix equally.
 */

import Link from 'next/link';
import React from 'react';

// ─── HeroCard ────────────────────────────────────────────────────────────────
// High-emotion editorial card. Family tint bg, oversized role name, big pay.
// = ShiftCard. Use for: browse map, wallet, active shifts, payouts.

export type HeroFamily = 'bar' | 'kitchen' | 'floor' | 'event' | 'counter';
export type HeroState  = 'pending' | 'confirmed' | 'urgent' | 'past';

export interface HeroCardProps {
  venue: string;
  time: string;
  loc: string;
  role: string;
  brief: string | string[];
  pay: string;
  rate: string;
  family?: HeroFamily;
  state?: HeroState;
  statusLabel?: string;
  rateNote?: string;
  href?: string;
  onClick?: () => void;
}

export function HeroCard({ venue, time, loc, role, brief, pay, rate, family, state, statusLabel, rateNote, href, onClick }: HeroCardProps) {
  const cls = ['scard', family, state].filter(Boolean).join(' ');
  const briefs = Array.isArray(brief) ? brief : [brief];
  const payNum = pay.replace(/^\$/, '');
  const inner = (
    <>
      <div className="scard-pills">
        <span className="pill pill-role">{venue}</span>
        <span className="pill pill-time">{time}</span>
        {statusLabel && <span className="pill pill-status">{statusLabel}</span>}
      </div>
      <div className="scard-loc"><span className="pill pill-loc">{loc}</span></div>
      <div className="scard-body">
        <p className="scard-name">{role}</p>
        {briefs.map((b, i) => <p key={i} className="scard-brief">{b}</p>)}
      </div>
      <div className="scard-price">
        <div className="big"><span className="d">$</span>{payNum}</div>
        <div className="rate">{rate} BASE PAY</div>
        {rateNote && <div className="rate">{rateNote}</div>}
      </div>
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <div className={cls} onClick={onClick}>{inner}</div>;
}

// ─── StackCard ───────────────────────────────────────────────────────────────
// Compact operational row. Avatar left, title + sub center, CTA right.
// Use for: notifications, roster rows, reviews, alerts, invite cards.

export interface StackCardProps {
  icon: string;
  iconBg?: string;
  title: string;
  sub: string;
  cta: { label: string; href?: string; onClick?: () => void; ghost?: boolean };
}

export function StackCard({ icon, iconBg = 'var(--green)', title, sub, cta }: StackCardProps) {
  const ctaStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: 99,
    fontFamily: 'var(--sans)',
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    flexShrink: 0,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    border: cta.ghost ? '2px solid var(--ink)' : 'none',
    background: cta.ghost ? 'transparent' : 'var(--green)',
    color: cta.ghost ? 'var(--ink)' : 'var(--ink)',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--card)', borderRadius: 18, border: '1px solid var(--line)' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{icon}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)', marginTop: 1 }}>{sub}</div>
      </div>
      {cta.href
        ? <Link href={cta.href} style={ctaStyle}>{cta.label}</Link>
        : <button onClick={cta.onClick} style={ctaStyle}>{cta.label}</button>
      }
    </div>
  );
}

// ─── SystemRow ───────────────────────────────────────────────────────────────
// Clean utility row. Label + bordered input. No fills, just borders.
// Use for: forms, card input, settings, billing, W9, verification.

export interface SystemRowProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  half?: boolean;       // for side-by-side pairs (expiry + CVV)
  readOnly?: boolean;
  children?: React.ReactNode; // override input with custom element
}

export function SystemRow({ label, placeholder, value, onChange, type = 'text', inputMode, readOnly, children }: SystemRowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)' }}>
        {label}
      </label>
      {children ?? (
        <input
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={e => onChange?.(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: 14,
            border: '2px solid var(--ink)',
            background: 'transparent',
            fontFamily: 'var(--body)',
            fontSize: 15,
            color: 'var(--ink)',
            outline: 'none',
          }}
        />
      )}
    </div>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
// Small caps section label + optional right action. Not a primitive — a utility.

export function SectionHeader({ label, action, onAction, actionHref, count }: {
  label: string; action?: string; onAction?: () => void; actionHref?: string; count?: string | number;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>{label}</span>
        {count !== undefined && <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--ink)' }}>{count}</span>}
      </div>
      {action && (actionHref
        ? <Link href={actionHref} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}>{action}</Link>
        : <button onClick={onAction} style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{action}</button>
      )}
    </div>
  );
}

// ─── BottomActionBar ─────────────────────────────────────────────────────────
// Sticky bottom bar. Primary ink CTA + optional ghost/soft secondary.

type BarAction = { label: string; href?: string; onClick?: () => void; ghost?: boolean; disabled?: boolean };

export function BottomActionBar({ primary, secondary }: { primary: BarAction; secondary?: BarAction }) {
  function Btn({ a, isPrimary }: { a: BarAction; isPrimary: boolean }) {
    const s: React.CSSProperties = {
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '100%', padding: '16px', borderRadius: 24,
      fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em',
      cursor: a.disabled ? 'not-allowed' : 'pointer',
      textDecoration: 'none', opacity: a.disabled ? 0.4 : 1,
      border: 'none',
      background: a.ghost ? 'transparent' : isPrimary ? 'var(--ink)' : 'var(--paper-2)',
      color: isPrimary && !a.ghost ? '#fff' : 'var(--ink)',
      ...(a.ghost ? { borderWidth: 2, borderStyle: 'solid', borderColor: 'var(--ink)' } : {}),
    };
    if (a.href && !a.disabled) return <Link href={a.href} style={s}>{a.label}</Link>;
    return <button onClick={a.onClick} disabled={a.disabled} style={s}>{a.label}</button>;
  }
  return (
    <div style={{ padding: '12px 16px 28px', display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--line)', background: 'var(--paper)' }}>
      <Btn a={primary} isPrimary={true} />
      {secondary && <Btn a={secondary} isPrimary={false} />}
    </div>
  );
}
