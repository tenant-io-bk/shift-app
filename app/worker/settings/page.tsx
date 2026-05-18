'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';

type ToggleKey = 'newShifts' | 'payments' | 'reminders' | 'rebook';

export default function Settings() {
  const router = useRouter();
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    newShifts: true,
    payments: true,
    reminders: true,
    rebook: false,
  });

  function toggle(key: ToggleKey) {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper-2)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar time="9:41" />

      {/* Nav */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <button onClick={() => router.back()} style={{ fontSize: 20, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', width: 32 }}>←</button>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Settings</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ flex: 1, padding: '16px 16px 48px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Account */}
        <Section title="Account">
          <Row label="Name" value="Marcus Rivera" />
          <Row label="Phone" value="+1 347 514 2898" />
          <Row label="Location" value="Bed-Stuy, Brooklyn" />
        </Section>

        {/* Payout */}
        <Section title="Payout">
          <Row label="Method" value="Debit card" />
          <Row label="Account" value="CHASE ·· 4471" />
          <RowLink label="Change payout method" href="/v3/payout-setup" />
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <RowToggle label="New shift matches" sub="When shifts near you open up" value={toggles.newShifts} onToggle={() => toggle('newShifts')} />
          <RowToggle label="Payment received" sub="When your pay hits" value={toggles.payments} onToggle={() => toggle('payments')} />
          <RowToggle label="Shift reminders" sub="2 hours before a shift starts" value={toggles.reminders} onToggle={() => toggle('reminders')} />
          <RowToggle label="Rebook requests" sub="When an employer wants you back" value={toggles.rebook} onToggle={() => toggle('rebook')} />
        </Section>

        {/* Verification */}
        <Section title="Verification">
          <RowStatus label="ID Verification" status="Verified" ok />
          <RowStatus label="Tax info (W-9)" status="Complete" ok />
          <RowStatus label="Background check" status="Not started" ok={false} href="/v3/w9" />
        </Section>

        {/* Support */}
        <Section title="Support">
          <RowLink label="Help & FAQ" href="#" />
          <RowLink label="Contact support" href="#" />
          <RowLink label="Terms of service" href="#" />
          <RowLink label="Privacy policy" href="#" />
        </Section>

        {/* Sign out */}
        <div style={{ background: 'var(--paper)', borderRadius: 14, overflow: 'hidden', border: '2px solid var(--ink)' }}>
          <Link
            href="/worker/splash"
            style={{
              display: 'block', padding: '16px 18px',
              fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16,
              color: '#EA4B2A', textDecoration: 'none', textAlign: 'center',
            }}
          >
            Sign out
          </Link>
        </div>

        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 4 }}>
          SHIFT · v1.0 · NYC Hyperlocal Labor
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', padding: '0 4px', marginBottom: 6 }}>{title}</div>
      <div style={{ background: 'var(--paper)', borderRadius: 14, overflow: 'hidden', border: '2px solid var(--ink)' }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--line)' }}>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mute)' }}>{value}</span>
    </div>
  );
}

function RowLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--line)', textDecoration: 'none' }}>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}>{label}</span>
      <span style={{ color: 'var(--mute)', fontSize: 16 }}>→</span>
    </Link>
  );
}

function RowToggle({ label, sub, value, onToggle }: { label: string; sub: string; value: boolean; onToggle: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--line)' }}>
      <div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}>{label}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)', marginTop: 2 }}>{sub}</div>
      </div>
      <button
        onClick={onToggle}
        style={{
          width: 44, height: 26, borderRadius: 99, border: 'none', cursor: 'pointer', flexShrink: 0,
          background: value ? 'var(--hydrant)' : 'var(--paper-3)',
          position: 'relative', transition: 'background 0.2s',
        }}
      >
        <div style={{
          position: 'absolute', top: 3, left: value ? 21 : 3,
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          transition: 'left 0.2s',
        }} />
      </button>
    </div>
  );
}

function RowStatus({ label, status, ok, href }: { label: string; status: string; ok: boolean; href?: string }) {
  const inner = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--line)' }}>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: ok ? '#16A34A' : 'var(--hydrant)' }}>
        {ok ? '✓ ' : '→ '}{status}
      </span>
    </div>
  );
  if (href) return <Link href={href} style={{ textDecoration: 'none' }}>{inner}</Link>;
  return inner;
}
