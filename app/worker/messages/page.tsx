'use client';

import { useState } from 'react';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

const THREADS = [
  {
    id: 'padmore',
    initials: 'PC',
    name: "Padmore's Coffee",
    role: 'Barista · Today 11A–4P',
    last: 'See you at 10:45 — come to the side entrance.',
    time: '9:58A',
    unread: 1,
    online: true,
    isSystem: false,
  },
  {
    id: 'shift',
    initials: 'S',
    name: 'SHIFT',
    role: 'Platform',
    last: 'Your payout of $130 is on its way.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    isSystem: true,
  },
  {
    id: 'greene',
    initials: 'GB',
    name: "Greene's Bar + Kitchen",
    role: 'Server · Mon May 12',
    last: 'Thanks for covering — great work.',
    time: 'Mon',
    unread: 0,
    online: false,
    isSystem: false,
  },
  {
    id: 'myrtle',
    initials: 'MC',
    name: 'Myrtle Coffee',
    role: 'Barista · Sat May 10',
    last: 'Can you do a double?',
    time: 'Sat',
    unread: 0,
    online: false,
    isSystem: false,
  },
];

const PADMORE_MESSAGES = [
  { from: 'them', text: 'Hi! Confirming you for tomorrow 11–4. Sound good?', time: '8:02A' },
  { from: 'me',   text: "All set, I'll be there.", time: '8:14A' },
  { from: 'them', text: 'Perfect. Uniform is all black. Enter through the side door on Tompkins.', time: '8:31A' },
  { from: 'them', text: 'See you at 10:45 — come to the side entrance.', time: '9:58A' },
];

export default function Messages() {
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const thread = THREADS.find(t => t.id === activeThread);

  if (activeThread && thread) {
    const messages = activeThread === 'padmore' ? PADMORE_MESSAGES : [];

    return (
      <div style={{ maxWidth: 390, height: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
        <StatusBar time="10:12" />

        {/* Thread header */}
        <div style={{ padding: '10px 16px 12px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActiveThread(null)} style={{ fontSize: 20, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>←</button>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: thread.isSystem ? 'var(--ink)' : 'var(--green-soft)', border: thread.isSystem ? 'none' : '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12, color: thread.isSystem ? '#fff' : 'var(--ink)' }}>{thread.initials}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{thread.name}</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 1}}>{thread.role}</div>
          </div>
          {thread.online && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--online)' }} />
              <span style={{ fontFamily: 'var(--body)', fontSize: 10, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active</span>
            </div>
          )}
        </div>

        {/* Shift context card */}
        {activeThread === 'padmore' && (
          <div style={{ margin: '12px 16px 0', background: 'var(--green-soft)', borderRadius: 14, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--ink)', marginBottom: 2 }}>Your Shift</div>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Today · 11A–4P · Barista</div>
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em' }}>$130</div>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 80 }}>
              <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', letterSpacing: '-0.04em' }}>No messages yet</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', textAlign: 'center'}}>Start the conversation below.</div>
            </div>
          ) : messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '78%', padding: '10px 14px',
                borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.from === 'me' ? 'var(--ink)' : 'var(--steel-soft)',
                border: msg.from === 'me' ? 'none' : '1.5px solid var(--line)',
              }}>
                <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: msg.from === 'me' ? '#fff' : 'var(--ink)', lineHeight: 1.45 }}>{msg.text}</span>
              </div>
              <span style={{ fontFamily: 'var(--body)', fontSize: 10, color: 'var(--ink)', marginTop: 3}}>{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div style={{ padding: '12px 16px 40px', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ flex: 1, background: 'var(--paper)', border: '2px solid var(--ink)', borderRadius: 22, padding: '10px 14px', display: 'flex', alignItems: 'center' }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message…"
              rows={1}
              style={{ width: '100%', background: 'none', border: 'none', outline: 'none', fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', resize: 'none', lineHeight: 1.4 }}
            />
          </div>
          <button
            onClick={() => setInput('')}
            style={{ width: 44, height: 44, borderRadius: '50%', background: input.trim() ? 'var(--ink)' : 'var(--paper-3)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'background 0.15s' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke={input.trim() ? '#fff' : 'var(--ink)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Thread list
  return (
    <div style={{ maxWidth: 390, height: '100vh', margin: '0 auto', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <StatusBar time="10:12" />

      <div style={{ padding: '16px 22px 12px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 32, color: 'var(--ink)', letterSpacing: '-0.06em', lineHeight: 1 }}>Messages</h1>
        {THREADS.some(t => t.unread > 0) && (
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', background: 'var(--yellow-soft)', borderRadius: 99, padding: '3px 9px' }}>
            {THREADS.reduce((a, t) => a + t.unread, 0)} unread
          </span>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {THREADS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveThread(t.id)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 22px',
              borderBottom: i < THREADS.length - 1 ? '1px solid var(--line)' : 'none',
              background: 'none', border: 'none',
              cursor: 'pointer', textAlign: 'left',
            } as React.CSSProperties}
          >
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: t.isSystem ? 'var(--ink)' : 'var(--green-soft)', border: t.isSystem ? 'none' : '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: t.isSystem ? 11 : 13, color: t.isSystem ? '#fff' : 'var(--ink)' }}>{t.initials}</span>
              </div>
              {t.online && (
                <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: 'var(--online)', border: '2px solid var(--paper)' }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: t.unread > 0 ? 700 : 600, fontSize: 15, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t.name}</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', flexShrink: 0, marginLeft: 8}}>{t.time}</span>
              </div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginBottom: 2 }}>{t.role}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', fontWeight: t.unread > 0 ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t.last}
              </div>
            </div>

            {/* Unread dot */}
            {t.unread > 0 && (
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--body)', fontWeight: 700, fontSize: 10, color: '#fff' }}>{t.unread}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <BottomNav active="messages" />
    </div>
  );
}
