import Link from 'next/link';

export type ShiftFamily = 'bar' | 'kitchen' | 'floor' | 'event' | 'counter';
export type ShiftState = 'pending' | 'confirmed' | 'urgent' | 'past';

export interface ShiftCardProps {
  role: string;
  time: string;
  loc?: string;
  venue: string;
  brief?: string | string[];
  pay: string;
  rate: string;
  family?: ShiftFamily;
  state?: ShiftState;
  statusLabel?: string;
  rateNote?: string;
  timeRight?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface CompactCardProps {
  icon: string;
  title: string;
  sub: string;
  cta: { label: string; href?: string; onClick?: () => void };
  ghost?: boolean;
}

export function CompactCard({ icon, title, sub, cta, ghost }: CompactCardProps) {
  return (
    <div className="scard compact">
      <div className="compact-ico">{icon}</div>
      <div className="compact-text">
        <b>{title}</b>
        <span>{sub}</span>
      </div>
      {cta.href ? (
        <Link href={cta.href} className={`compact-cta${ghost ? ' ghost' : ''}`}>{cta.label}</Link>
      ) : (
        <button onClick={cta.onClick} className={`compact-cta${ghost ? ' ghost' : ''}`}>{cta.label}</button>
      )}
    </div>
  );
}

export default function ShiftCard({
  role, time, loc, venue, brief, pay, rate,
  family, state, statusLabel, rateNote, timeRight, href, onClick,
}: ShiftCardProps) {
  const classes = ['scard', family, state].filter(Boolean).join(' ');
  const briefs = brief ? (Array.isArray(brief) ? brief : [brief]) : [];
  const payNum = pay.replace(/^\$/, '');

  const inner = (
    <>
      <div className="scard-pills">
        <span className="pill pill-role">{venue}</span>
        {!timeRight && <span className="pill pill-time">{time}</span>}
        {statusLabel && <span className="pill pill-status">{statusLabel}</span>}
      </div>
      <div className="scard-loc">
        {timeRight
          ? <span className="pill pill-time">{time}</span>
          : <span className="pill pill-loc">{loc}</span>
        }
      </div>
      <div className="scard-body">
        <p className="scard-name">{role}</p>
        {briefs.map((b, i) => <p key={i} className="scard-brief">{b}</p>)}
      </div>
      <div className="scard-price">
        <div className="big"><span className="d">$</span>{payNum}</div>
        <div className="rate">{rate} BASE PAY</div>
        {rateNote && <div className="rate" style={{ opacity: 0.55 }}>{rateNote}</div>}
      </div>
    </>
  );

  if (href) {
    return <Link href={href} className={classes}>{inner}</Link>;
  }

  return (
    <div className={classes} onClick={onClick}>
      {inner}
    </div>
  );
}
