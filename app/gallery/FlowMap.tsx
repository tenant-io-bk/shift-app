'use client';

import { useState } from 'react';

const NW = 136;
const NH = 38;
const CW = 1780;
const CH = 920;

const CLR: Record<string, { bg: string; text: string; border: string }> = {
  entry:   { bg: '#72c15f', text: '#0D0E12', border: '#50a83e' },
  onboard: { bg: '#d2e4ff', text: '#0D0E12', border: '#8cb8f5' },
  core:    { bg: '#0D0E12', text: '#ffffff', border: '#0D0E12' },
  state:   { bg: '#f7dd6d', text: '#0D0E12', border: '#c9b130' },
  active:  { bg: '#E2F1DD', text: '#0D0E12', border: '#96cc88' },
  profile: { bg: '#E8E0FA', text: '#0D0E12', border: '#b8a8f0' },
  utility: { bg: '#F0F1F4', text: '#0D0E12', border: '#c8cad4' },
  emp:     { bg: '#FAD6CE', text: '#0D0E12', border: '#f0a898' },
  gap:     { bg: '#FEF2F2', text: '#B83227', border: '#f4a898' },
};

interface Node {
  id: string; label: string; path: string;
  x: number; y: number; c: string;
  issue?: string; issueType?: 'gap' | 'weak' | 'orphan';
}
interface Edge {
  from: string; to: string; label?: string; dashed?: boolean;
  fs?: 'right' | 'bottom' | 'top' | 'left';
  ts?: 'left' | 'top' | 'bottom' | 'right';
}

const NODES: Node[] = [
  // ENTRY
  { id:'splash',   label:'Splash',         path:'/',                           x:30,   y:82,  c:'entry' },
  { id:'slides',   label:'Slides (×3)',    path:'/worker/slides',             x:196,  y:82,  c:'entry' },
  { id:'role',     label:'Role Choice',    path:'/worker/role',               x:362,  y:82,  c:'entry' },

  // WORKER ONBOARDING (zigzag top)
  { id:'phone',    label:'Phone Verify',   path:'/v3/phone-verify',           x:540,  y:26,  c:'onboard' },
  { id:'sms',      label:'SMS Verify',     path:'/v3/sms-verify',             x:706,  y:26,  c:'onboard' },
  { id:'wonboard', label:'Onboarding',     path:'/worker/onboarding',         x:872,  y:26,  c:'onboard' },
  { id:'avail',    label:'Availability',   path:'/v3/availability',           x:1038, y:26,  c:'onboard' },
  { id:'hood',     label:'Neighborhood',   path:'/v3/neighborhood',           x:1204, y:26,  c:'onboard' },
  { id:'creds',    label:'Credentials',    path:'/v3/credentials',            x:1370, y:26,  c:'onboard' },
  { id:'profset',  label:'Profile Setup',  path:'/v3/profile-setup',          x:1536, y:26,  c:'onboard' },
  { id:'payout',   label:'Payout Setup',   path:'/v3/payout-setup',           x:1536, y:88,  c:'onboard' },
  { id:'cardin',   label:'Card Input',     path:'/v3/card-input',             x:1370, y:88,  c:'onboard' },
  { id:'w9',       label:'W9',             path:'/v3/w9',                     x:1204, y:88,  c:'onboard' },

  // WORKER CORE
  { id:'wmap',     label:'Map / Browse',   path:'/worker/map',                x:196,  y:236, c:'core' },
  { id:'jobdet',   label:'Job Detail',     path:'/worker/job-detail',         x:362,  y:236, c:'core' },
  { id:'wpend',    label:'Pending',        path:'/worker/pending',            x:530,  y:236, c:'state' },
  { id:'wconf',    label:'Confirm',        path:'/worker/confirm',            x:698,  y:236, c:'active' },
  { id:'dayof',    label:'Day Of',         path:'/worker/day-of',             x:866,  y:236, c:'active' },
  { id:'onshift',  label:'On Shift',       path:'/worker/on-shift',           x:1034, y:236, c:'active' },
  { id:'paidout',  label:'Paid Out',       path:'/worker/paid-out',           x:1202, y:236, c:'active' },
  { id:'mreview',  label:'Mutual Review',  path:'/v3/mutual-review',          x:1370, y:236, c:'utility',
    issue:'No CTA from Paid Out — trigger mechanism unclear', issueType:'weak' },

  // WORKER BRANCHES
  { id:'cancel',   label:'Cancel Flow',    path:'/v3/cancel-flow',            x:866,  y:346, c:'utility',
    issue:'Namespace mismatch: /v3/ instead of /worker/', issueType:'gap' },
  { id:'msgs',     label:'Messages',       path:'/worker/messages',           x:1034, y:346, c:'utility',
    issue:'No tab bar entry — hard to discover', issueType:'weak' },
  { id:'report',   label:'Report Issue',   path:'/worker/report',             x:1202, y:346, c:'utility' },
  { id:'dispute',  label:'Dispute',        path:'/v3/dispute',                x:1370, y:346, c:'utility',
    issue:'Not wired from any screen in the app', issueType:'gap' },

  // WORKER PROFILE
  { id:'wprof',    label:'Profile',        path:'/worker/profile',            x:196,  y:446, c:'profile' },
  { id:'wallet',   label:'Wallet',         path:'/worker/wallet',             x:356,  y:446, c:'profile' },
  { id:'wsett',    label:'Settings',       path:'/worker/settings',           x:516,  y:446, c:'profile' },
  { id:'wnotif',   label:'Notifications',  path:'/worker/notifications',      x:676,  y:446, c:'profile' },
  { id:'wbooks',   label:'Books',          path:'/v3/books',                  x:836,  y:446, c:'profile' },

  // ORPHAN
  { id:'whome',    label:'Worker Home',    path:'/worker/home',               x:30,   y:236, c:'gap',
    issue:'/worker/home exists but /worker/map is the real home — dead route', issueType:'orphan' },

  // EMPLOYER ONBOARDING
  { id:'ecreat',   label:'Create Account', path:'/employer/create-account',   x:530,  y:608, c:'onboard' },
  { id:'efind',    label:'Find Business',  path:'/employer/onboarding',       x:698,  y:608, c:'onboard' },
  { id:'everif',   label:'Verify',         path:'/employer/verify',           x:866,  y:608, c:'onboard' },
  { id:'ebizpro',  label:'Biz Profile',    path:'/employer/business-profile', x:1034, y:608, c:'onboard' },

  // EMPLOYER CORE
  { id:'edash',    label:'Dashboard',      path:'/employer/dashboard',        x:1202, y:608, c:'core' },
  { id:'epost',    label:'Post Shift',     path:'/employer/post-shift',       x:1370, y:608, c:'core' },
  { id:'ebpost',   label:'AI Post (beta)', path:'/business/post',             x:1536, y:590, c:'emp',
    issue:'Separate /business/ namespace — not linked from post-shift', issueType:'gap' },
  { id:'eposting', label:'Posting Live',   path:'/employer/posting',          x:1536, y:650, c:'emp' },
  { id:'eposted',  label:'Shift Posted',   path:'/employer/shift-posted',     x:1370, y:710, c:'emp' },
  { id:'eroster',  label:'Roster',         path:'/employer/roster',           x:1202, y:710, c:'core' },
  { id:'elivemap', label:'Live Map',        path:'/employer/live-map',         x:1034, y:710, c:'core' },
  { id:'enoshow',  label:'No Show',        path:'/employer/no-show',          x:866,  y:710, c:'emp' },

  // EMPLOYER PROFILE
  { id:'eacct',    label:'Account',        path:'/employer/account',          x:1202, y:830, c:'profile' },
  { id:'ebill',    label:'Billing',        path:'/employer/billing',          x:1370, y:830, c:'profile' },
  { id:'erate',    label:'Rating',         path:'/employer/rating',           x:1536, y:830, c:'profile' },

  // EMPLOYER GAPS
  { id:'emsgs',    label:'Emp. Messages',  path:'/employer/messages',         x:698,  y:710, c:'gap',
    issue:'Exists but disconnected from employer nav flow', issueType:'weak' },
  { id:'eslides',  label:'Emp. Slides',    path:'/employer/slides',           x:530,  y:710, c:'gap',
    issue:'Exists but skipped in employer onboarding sequence', issueType:'gap' },
];

const EDGES: Edge[] = [
  // Entry
  { from:'splash',   to:'slides' },
  { from:'slides',   to:'role' },
  { from:'role',     to:'phone',    label:'worker' },
  { from:'role',     to:'ecreat',   label:'employer', fs:'bottom', ts:'left' },
  // Worker onboarding
  { from:'phone',    to:'sms' },
  { from:'sms',      to:'wonboard' },
  { from:'wonboard', to:'avail' },
  { from:'avail',    to:'hood' },
  { from:'hood',     to:'creds' },
  { from:'creds',    to:'profset' },
  { from:'profset',  to:'payout',   fs:'bottom', ts:'top' },
  { from:'payout',   to:'cardin',   fs:'left',   ts:'right' },
  { from:'cardin',   to:'w9',       fs:'left',   ts:'right' },
  { from:'w9',       to:'wmap',     fs:'bottom', ts:'top' },
  // Worker core
  { from:'wmap',     to:'jobdet' },
  { from:'jobdet',   to:'wpend',    label:'claim' },
  { from:'wpend',    to:'wconf',    label:'confirmed' },
  { from:'wpend',    to:'wmap',     label:'passed', dashed:true, fs:'bottom', ts:'bottom' },
  { from:'wconf',    to:'dayof' },
  { from:'dayof',    to:'onshift',  label:'clock in' },
  { from:'onshift',  to:'paidout',  label:'clock out' },
  { from:'paidout',  to:'mreview',  dashed:true, label:'?' },
  // Worker branches
  { from:'dayof',    to:'cancel',   fs:'bottom', ts:'top', dashed:true },
  { from:'onshift',  to:'msgs',     fs:'bottom', ts:'top', dashed:true },
  { from:'onshift',  to:'report',   fs:'bottom', ts:'top', dashed:true },
  { from:'paidout',  to:'dispute',  fs:'bottom', ts:'top', dashed:true },
  // Worker profile nav
  { from:'wmap',     to:'wprof',    fs:'bottom', ts:'top', dashed:true },
  // Employer onboarding
  { from:'ecreat',   to:'efind' },
  { from:'efind',    to:'everif' },
  { from:'everif',   to:'ebizpro' },
  { from:'ebizpro',  to:'edash' },
  // Employer core
  { from:'edash',    to:'epost' },
  { from:'epost',    to:'eposting', fs:'right', ts:'left' },
  { from:'epost',    to:'ebpost',   fs:'right', ts:'left', dashed:true },
  { from:'eposting', to:'eposted',  fs:'bottom', ts:'top' },
  { from:'eposted',  to:'eroster',  fs:'left',   ts:'right' },
  { from:'eroster',  to:'elivemap', fs:'left',   ts:'right' },
  { from:'elivemap', to:'enoshow',  fs:'left',   ts:'right' },
  { from:'edash',    to:'eacct',    fs:'bottom', ts:'top', dashed:true },
];

function nodePt(n: Node, side: string) {
  const cx = n.x + NW / 2, cy = n.y + NH / 2;
  if (side === 'right')  return { x: n.x + NW, y: cy };
  if (side === 'left')   return { x: n.x,       y: cy };
  if (side === 'top')    return { x: cx,          y: n.y };
  return { x: cx, y: n.y + NH };
}

function edgePath(nodes: Node[], e: Edge): string {
  const fn = nodes.find(n => n.id === e.from);
  const tn = nodes.find(n => n.id === e.to);
  if (!fn || !tn) return '';
  const fs = e.fs || 'right', ts = e.ts || 'left';
  const p1 = nodePt(fn, fs), p2 = nodePt(tn, ts);
  const adx = Math.abs(p2.x - p1.x), ady = Math.abs(p2.y - p1.y);

  if (fs === 'right' && ts === 'left') {
    const c = Math.max(adx * 0.45, 44);
    return `M ${p1.x} ${p1.y} C ${p1.x+c} ${p1.y} ${p2.x-c} ${p2.y} ${p2.x} ${p2.y}`;
  }
  if (fs === 'left' && ts === 'right') {
    const c = Math.max(adx * 0.45, 44);
    return `M ${p1.x} ${p1.y} C ${p1.x-c} ${p1.y} ${p2.x+c} ${p2.y} ${p2.x} ${p2.y}`;
  }
  if (fs === 'bottom' && ts === 'top') {
    const c = Math.max(ady * 0.45, 30);
    return `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y+c} ${p2.x} ${p2.y-c} ${p2.x} ${p2.y}`;
  }
  if (fs === 'bottom' && ts === 'left') {
    return `M ${p1.x} ${p1.y} C ${p1.x} ${p2.y} ${p2.x-44} ${p2.y} ${p2.x} ${p2.y}`;
  }
  if (fs === 'bottom' && ts === 'bottom') {
    const my = Math.max(p1.y, p2.y) + 36;
    return `M ${p1.x} ${p1.y} C ${p1.x} ${my} ${p2.x} ${my} ${p2.x} ${p2.y}`;
  }
  if (fs === 'top' && ts === 'bottom') {
    const c = Math.max(ady * 0.45, 30);
    return `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y-c} ${p2.x} ${p2.y+c} ${p2.x} ${p2.y}`;
  }
  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
}

function edgeLabelPos(nodes: Node[], e: Edge) {
  const fn = nodes.find(n => n.id === e.from);
  const tn = nodes.find(n => n.id === e.to);
  if (!fn || !tn) return null;
  const fs = e.fs || 'right', ts = e.ts || 'left';
  const p1 = nodePt(fn, fs), p2 = nodePt(tn, ts);
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 - 7 };
}

const ISSUES = NODES.filter(n => n.issue);

const LEGEND = [
  { c: 'entry',   label: 'App entry / splash' },
  { c: 'onboard', label: 'Onboarding step' },
  { c: 'core',    label: 'Core screen' },
  { c: 'state',   label: 'Waiting state' },
  { c: 'active',  label: 'Shift in progress' },
  { c: 'profile', label: 'Profile / account' },
  { c: 'utility', label: 'Utility / sub-flow' },
  { c: 'emp',     label: 'Employer-specific' },
  { c: 'gap',     label: 'Gap / orphan screen' },
];

export default function FlowMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredNode = NODES.find(n => n.id === hovered);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 57px)', overflow: 'hidden' }}>

      {/* Top bar: legend + issue count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 24px', background: '#fff', borderBottom: '1px solid rgba(13,14,18,0.08)', flexShrink: 0, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0E12', flexShrink: 0 }}>Legend</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }}>
          {LEGEND.map(l => (
            <div key={l.c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: CLR[l.c].bg, border: `1.5px solid ${CLR[l.c].border}`, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: '#0D0E12' }}>{l.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: '#B83227', fontWeight: 700 }}>
            {ISSUES.filter(n => n.issueType === 'gap' || n.issueType === 'orphan').length} gaps
          </span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: '#c9830e', fontWeight: 700 }}>
            {ISSUES.filter(n => n.issueType === 'weak').length} weak links
          </span>
        </div>
      </div>

      {/* Main: canvas + issues sidebar */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Scrollable canvas */}
        <div style={{ flex: 1, overflow: 'auto', position: 'relative', background: '#F4F5F7' }}>
          <div style={{ position: 'relative', width: CW, height: CH, margin: '24px' }}>

            {/* Swim lane bands */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 530, background: 'rgba(114,193,95,0.04)', borderRadius: 16, border: '1px solid rgba(114,193,95,0.12)' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: 558, height: 340, background: 'rgba(250,214,206,0.1)', borderRadius: 16, border: '1px solid rgba(240,168,152,0.18)' }} />

            {/* Swim lane labels */}
            <div style={{ position: 'absolute', left: 14, top: 16, fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(13,14,18,0.3)' }}>WORKER</div>
            <div style={{ position: 'absolute', left: 14, top: 574, fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(13,14,18,0.3)' }}>EMPLOYER</div>

            {/* Phase column labels */}
            {[
              { label: 'ENTRY', x: 30 },
              { label: 'ONBOARDING', x: 540 },
              { label: 'CORE LOOP', x: 840 },
              { label: 'POST-SHIFT', x: 1370 },
            ].map(ph => (
              <div key={ph.label} style={{ position: 'absolute', top: 536, left: ph.x, fontFamily: 'var(--body)', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(13,14,18,0.22)' }}>
                {ph.label}
              </div>
            ))}

            {/* SVG edges */}
            <svg style={{ position: 'absolute', inset: 0, width: CW, height: CH, pointerEvents: 'none', overflow: 'visible' }}>
              <defs>
                <marker id="arr" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto">
                  <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(13,14,18,0.35)" />
                </marker>
                <marker id="arr-d" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto">
                  <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(13,14,18,0.18)" />
                </marker>
                <marker id="arr-gap" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto">
                  <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(184,50,39,0.5)" />
                </marker>
              </defs>

              {EDGES.map((e, i) => {
                const d = edgePath(NODES, e);
                const lp = e.label ? edgeLabelPos(NODES, e) : null;
                const toNode = NODES.find(n => n.id === e.to);
                const isGapEdge = toNode?.issueType != null;
                const strokeColor = isGapEdge ? 'rgba(184,50,39,0.3)' : e.dashed ? 'rgba(13,14,18,0.18)' : 'rgba(13,14,18,0.35)';
                const marker = isGapEdge ? 'url(#arr-gap)' : e.dashed ? 'url(#arr-d)' : 'url(#arr)';
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke={strokeColor} strokeWidth={e.dashed ? 1.2 : 1.5}
                      strokeDasharray={e.dashed ? '5,4' : undefined}
                      markerEnd={marker} />
                    {lp && (
                      <text x={lp.x} y={lp.y} textAnchor="middle" style={{ fontFamily: 'var(--body)', fontSize: 9, fill: 'rgba(13,14,18,0.4)' }}>
                        {e.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {NODES.map(n => {
              const c = CLR[n.c];
              const isHov = hovered === n.id;
              const hasIssue = !!n.issue;
              return (
                <div
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: 'absolute', left: n.x, top: n.y,
                    width: NW, height: NH,
                    background: c.bg, border: `1.5px solid ${hasIssue ? (n.issueType === 'weak' ? '#c9830e' : '#B83227') : c.border}`,
                    borderRadius: 8,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'default',
                    boxShadow: isHov ? '0 4px 16px rgba(13,14,18,0.14)' : '0 1px 3px rgba(13,14,18,0.08)',
                    transition: 'box-shadow 0.15s, transform 0.15s',
                    transform: isHov ? 'translateY(-1px)' : 'none',
                    zIndex: isHov ? 10 : 1,
                  }}
                >
                  <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: c.text, textAlign: 'center', lineHeight: 1.25, padding: '0 8px' }}>
                    {n.label}
                  </div>
                  <div style={{ fontFamily: 'var(--body)', fontSize: 8.5, color: n.c === 'core' ? 'rgba(255,255,255,0.45)' : 'rgba(13,14,18,0.38)', marginTop: 2 }}>
                    {n.path}
                  </div>
                  {hasIssue && (
                    <div style={{
                      position: 'absolute', top: -7, right: -7,
                      width: 15, height: 15, borderRadius: '50%',
                      background: n.issueType === 'weak' ? '#f59e0b' : '#B83227',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1.5px solid #fff',
                    }}>
                      <span style={{ fontSize: 8, color: '#fff', fontWeight: 700, lineHeight: 1 }}>
                        {n.issueType === 'weak' ? '~' : '!'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Hover tooltip */}
            {hoveredNode && hoveredNode.issue && (
              <div style={{
                position: 'absolute',
                left: hoveredNode.x + NW / 2,
                top: hoveredNode.y - 54,
                transform: 'translateX(-50%)',
                background: '#0D0E12', color: '#fff',
                padding: '7px 12px', borderRadius: 8,
                fontFamily: 'var(--body)', fontSize: 11, lineHeight: 1.5,
                maxWidth: 240, textAlign: 'center',
                zIndex: 50, pointerEvents: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3, color: hoveredNode.issueType === 'weak' ? '#fbbf24' : '#f87171' }}>
                  {hoveredNode.issueType === 'weak' ? 'Weak link' : hoveredNode.issueType === 'orphan' ? 'Orphan' : 'Gap'}
                </div>
                {hoveredNode.issue}
              </div>
            )}
          </div>
        </div>

        {/* Issues sidebar */}
        <div style={{ width: 280, borderLeft: '1px solid rgba(13,14,18,0.09)', background: '#fff', overflowY: 'auto', padding: '16px 0', flexShrink: 0 }}>
          <div style={{ padding: '0 16px 12px', fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0D0E12', borderBottom: '1px solid rgba(13,14,18,0.08)', marginBottom: 8 }}>
            Issues & gaps
          </div>

          {/* Gaps */}
          <div style={{ padding: '8px 16px 4px', fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B83227' }}>
            Gaps / Orphans
          </div>
          {ISSUES.filter(n => n.issueType === 'gap' || n.issueType === 'orphan').map(n => (
            <div key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ padding: '8px 16px', borderBottom: '1px solid rgba(13,14,18,0.05)', cursor: 'default', background: hovered === n.id ? '#FEF2F2' : 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B83227', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: '#0D0E12' }}>{n.label}</span>
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 10.5, color: 'rgba(13,14,18,0.55)', lineHeight: 1.5, paddingLeft: 12 }}>
                {n.issue}
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 9.5, color: 'rgba(13,14,18,0.35)', paddingLeft: 12, marginTop: 2 }}>{n.path}</div>
            </div>
          ))}

          {/* Weak links */}
          <div style={{ padding: '12px 16px 4px', fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9830e' }}>
            Weak links
          </div>
          {ISSUES.filter(n => n.issueType === 'weak').map(n => (
            <div key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ padding: '8px 16px', borderBottom: '1px solid rgba(13,14,18,0.05)', cursor: 'default', background: hovered === n.id ? '#FFFBEB' : 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, color: '#0D0E12' }}>{n.label}</span>
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 10.5, color: 'rgba(13,14,18,0.55)', lineHeight: 1.5, paddingLeft: 12 }}>
                {n.issue}
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 9.5, color: 'rgba(13,14,18,0.35)', paddingLeft: 12, marginTop: 2 }}>{n.path}</div>
            </div>
          ))}

          {/* Notes */}
          <div style={{ padding: '16px 16px 4px', fontFamily: 'var(--body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(13,14,18,0.4)' }}>
            Notes
          </div>
          {[
            'Onboarding is 11 steps for workers — consider progress indicator',
            'Employer mutual-review screen not yet designed',
            'No push notification screen — workers just get a ping',
            'Worker home nav (tab bar) not shown in any screen',
          ].map((note, i) => (
            <div key={i} style={{ padding: '7px 16px', borderBottom: '1px solid rgba(13,14,18,0.04)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ color: 'rgba(13,14,18,0.3)', fontSize: 11, flexShrink: 0 }}>–</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 10.5, color: 'rgba(13,14,18,0.5)', lineHeight: 1.5 }}>{note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
