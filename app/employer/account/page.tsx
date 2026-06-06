'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';

type ToggleKey = 'newApplicants' | 'shiftReminders' | 'payments' | 'reviews';

export default function EmployerAccount() {
  const router = useRouter();
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    newApplicants: true, shiftReminders: true, payments: true, reviews: false,
  });

  function toggle(k: ToggleKey) { setToggles(p => ({ ...p, [k]: !p[k] })); }

  return (
    <div style={{ maxWidth: 390, minHeight: '100vh', margin: '0 auto', background: 'var(--paper)', paddingBottom: 80 }}>
      <StatusBar time="10:12" />

      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--line)', background: 'var(--paper)' }}>
        <div style={{ width: 32 }} />
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mute)' }}>Account</span>
        <div style={{ width: 32 }} />
      </div>

      {/* Greeting + edit profile */}
      <div style={{ padding: '20px 16px 8px' }}>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 200, fontSize: 38, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 0.88 }}>Good morning</div>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 38, color: 'var(--ink)', letterSpacing: '-0.075em', lineHeight: 0.95 }}>Padmore&apos;s Coffee</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--ink)' }}>Café · Bed-Stuy, Brooklyn</div>
          <Link
            href="/employer/business-profile"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'var(--ink)', borderRadius: 99, padding: '8px 14px',
              fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600,
              color: '#fff', textDecoration: 'none', flexShrink: 0,
            }}
          >
            Edit profile →
          </Link>
        </div>
      </div>

      <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>

        <Section title="Business Info">
          <Row label="Business name" value="Padmore's Coffee" />
          <Row label="Type" value="Café" />
          <Row label="Address" value="172 Tompkins Ave" />
          <Row label="Phone" value="+1 347 514 2898" />
          <Row label="Email" value="hello@padmores.com" />
        </Section>

        <Section title="Billing">
          <Row label="Payment method" value="Visa ·· 4471" />
          <Row label="Billing cycle" value="Per shift" />
          <RowLink label="Update payment method" href="/employer/billing" />
          <RowLink label="View invoices" href="#" />
        </Section>

        <Section title="Notifications">
          <RowToggle label="New applicants" sub="When workers apply to your shifts" value={toggles.newApplicants} onToggle={() => toggle('newApplicants')} />
          <RowToggle label="Shift reminders" sub="Day-of reminders before shifts start" value={toggles.shiftReminders} onToggle={() => toggle('shiftReminders')} />
          <RowToggle label="Payment receipts" sub="When workers are paid out" value={toggles.payments} onToggle={() => toggle('payments')} />
          <RowToggle label="Worker reviews" sub="When workers rate your business" value={toggles.reviews} onToggle={() => toggle('reviews')} />
        </Section>

        <Section title="Support">
          <RowLink label="Help & FAQ" href="#" />
          <RowLink label="Contact support" href="#" />
          <RowLink label="Terms of service" href="#" />
          <RowLink label="Privacy policy" href="#" />
        </Section>

        <Link href="/worker/role" style={{ display: 'block', padding: '16px 18px', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink)', textDecoration: 'none', textAlign: 'center', border: '2px solid var(--ink)', borderRadius: 99 }}>
          Sign out
        </Link>

        <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', textAlign: 'center', marginTop: 4 }}>SHIFT · v1.0 · NYC Hyperlocal Labor</p>
      </div>

      <EmployerNav active="account" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', padding: '0 4px', marginBottom: 6 }}>{title}</div>
      <div style={{ background: 'var(--paper)', borderRadius: 14, overflow: 'hidden', border: '2px solid var(--ink)' }}>{children}</div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid var(--line)' }}>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)' }}>{value}</span>
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
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--mute)', marginTop: 2 }}>{sub}</div>
      </div>
      <button onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 99, border: 'none', cursor: 'pointer', flexShrink: 0, background: value ? 'var(--ink)' : 'var(--paper-3)', position: 'relative', transition: 'background 0.2s' }}>
        <div style={{ position: 'absolute', top: 3, left: value ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
      </button>
    </div>
  );
}
