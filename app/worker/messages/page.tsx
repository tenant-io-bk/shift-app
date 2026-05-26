'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import BottomNav from '@/app/components/BottomNav';

type Message = {
  from: 'worker' | 'employer' | 'system';
  text: string;
  time: string;
};

type Thread = {
  id: string;
  name: string;
  role: string;
  shiftDate: string;
  lastMsg: string;
  lastTime: string;
  unread: number;
  avatar: string;
  avatarBg: string;
  messages: Message[];
};

const THREADS: Thread[] = [
  {
    id: 'padmores',
    name: "Padmore's Coffee",
    role: 'Barista',
    shiftDate: 'Mon 26 May',
    lastMsg: 'Dress code: all black. See you tomorrow!',
    lastTime: '11:42A',
    unread: 1,
    avatar: 'PC',
    avatarBg: '#72c15f',
    messages: [
      { from: 'employer', text: "Hey! Looking forward to having you back tomorrow.", time: '10:15A' },
      { from: 'employer', text: "Door's on Tompkins — just ring the bell.", time: '10:16A' },
      { from: 'worker', text: "Thanks! I'll be there 10 min early.", time: '10:32A' },
      { from: 'employer', text: 'Dress code: all black. See you tomorrow!', time: '11:42A' },
    ],
  },
  {
    id: 'thewren',
    name: 'The Wren',
    role: 'Server',
    shiftDate: 'Wed 28 May',
    lastMsg: 'Got it, see you then!',
    lastTime: 'Yesterday',
    unread: 0,
    avatar: 'TW',
    avatarBg: '#0D0E12',
    messages: [
      {
        from: 'employer',
        text: 'Hi! Confirmed for Wednesday. Please arrive by 5:45P for a quick walkthrough.',
        time: 'Yesterday',
      },
      { from: 'worker', text: 'Got it, see you then!', time: 'Yesterday' },
    ],
  },
  {
    id: 'shift-support',
    name: 'SHIFT Support',
    role: '',
    shiftDate: '',
    lastMsg: 'Your report has been reviewed.',
    lastTime: 'Mon 12',
    unread: 0,
    avatar: 'S↑',
    avatarBg: '#2D6A4F',
    messages: [
      {
        from: 'system',
        text: "Your report has been reviewed by our Trust & Safety team. No further action is required at this time. Thank you for letting us know — it helps keep the platform safe for everyone.",
        time: 'Mon 12',
      },
    ],
  },
];

export default function WorkerMessages() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<Record<string, Message[]>>({});

  const activeThread = activeId ? THREADS.find((t) => t.id === activeId) ?? null : null;

  function sendMessage(threadId: string) {
    const text = (drafts[threadId] ?? '').trim();
    if (!text) return;
    setSent((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] ?? []), { from: 'worker', text, time: 'Now' }],
    }));
    setDrafts((prev) => ({ ...prev, [threadId]: '' }));
  }

  if (activeThread) {
    const allMessages = [...activeThread.messages, ...(sent[activeThread.id] ?? [])];
    const draft = drafts[activeThread.id] ?? '';

    return (
      <div
        style={{
          maxWidth: 390,
          minHeight: '100vh',
          margin: '0 auto',
          background: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <StatusBar time="9:41" />

        {/* Conversation header */}
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 16px',
            borderBottom: '1px solid var(--line)',
            flexShrink: 0,
            background: 'var(--paper)',
          }}
        >
          <button
            onClick={() => setActiveId(null)}
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 20,
              color: 'var(--ink)',
              flexShrink: 0,
            }}
          >
            ←
          </button>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: activeThread.avatarBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 12,
                color: '#fff',
              }}
            >
              {activeThread.avatar}
            </span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--ink)',
              }}
            >
              {activeThread.name}
            </div>
            {activeThread.role && (
              <div
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 11,
                  color: 'var(--mute)',
                }}
              >
                {activeThread.role} · {activeThread.shiftDate}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingBottom: activeThread.id === 'shift-support' ? 32 : 100,
          }}
        >
          {allMessages.map((msg, i) => {
            const isWorker = msg.from === 'worker';
            const isSystem = msg.from === 'system';

            if (isSystem) {
              return (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    padding: '12px 16px',
                    background: 'var(--card)',
                    borderRadius: 12,
                    fontFamily: 'var(--body)',
                    fontSize: 12,
                    color: 'var(--mute)',
                    lineHeight: 1.6,
                    border: '1px solid var(--line)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--hydrant)',
                      marginBottom: 6,
                    }}
                  >
                    SHIFT Support
                  </div>
                  {msg.text}
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 10,
                      color: 'var(--mute)',
                      opacity: 0.6,
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: isWorker ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{ maxWidth: '78%' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: isWorker
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                      background: isWorker ? 'var(--ink)' : 'var(--card)',
                      border: isWorker ? 'none' : '1.5px solid var(--line)',
                      fontFamily: 'var(--body)',
                      fontSize: 14,
                      color: isWorker ? '#fff' : 'var(--ink)',
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 10,
                      color: 'var(--mute)',
                      marginTop: 4,
                      textAlign: isWorker ? 'right' : 'left',
                      padding: '0 4px',
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        {activeThread.id !== 'shift-support' && (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 390,
              padding: '10px 16px 28px',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: 10,
              background: 'var(--paper)',
            }}
          >
            <input
              value={draft}
              onChange={(e) =>
                setDrafts((prev) => ({ ...prev, [activeThread.id]: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(activeThread.id);
                }
              }}
              placeholder="Message..."
              style={{
                flex: 1,
                padding: '11px 16px',
                background: 'var(--card)',
                border: '1.5px solid var(--line)',
                borderRadius: 99,
                fontFamily: 'var(--body)',
                fontSize: 14,
                color: 'var(--ink)',
                outline: 'none',
              }}
            />
            <button
              onClick={() => sendMessage(activeThread.id)}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: draft ? 'var(--ink)' : 'var(--line)',
                border: 'none',
                cursor: draft ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 9h12M9 3l6 6-6 6"
                  stroke={draft ? '#fff' : 'var(--mute)'}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Thread list
  return (
    <div
      style={{
        maxWidth: 390,
        minHeight: '100vh',
        margin: '0 auto',
        background: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 80,
      }}
    >
      <StatusBar time="9:41" />

      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--body)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--mute)',
          }}
        >
          Messages
        </span>
      </div>

      <div style={{ flex: 1 }}>
        {THREADS.map((thread) => (
          <button
            key={thread.id}
            onClick={() => setActiveId(thread.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 22px',
              background: thread.unread > 0 ? 'var(--hydrant-soft)' : 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--line)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: thread.avatarBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#fff',
                }}
              >
                {thread.avatar}
              </span>
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: thread.unread ? 700 : 600,
                    fontSize: 15,
                    color: 'var(--ink)',
                  }}
                >
                  {thread.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 11,
                    color: 'var(--mute)',
                    flexShrink: 0,
                    marginLeft: 8,
                  }}
                >
                  {thread.lastTime}
                </span>
              </div>

              {thread.role && (
                <div
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 11,
                    color: 'var(--hydrant)',
                    marginBottom: 2,
                  }}
                >
                  {thread.role} · {thread.shiftDate}
                </div>
              )}

              <div
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: 12,
                  color: thread.unread ? 'var(--ink)' : 'var(--mute)',
                  fontWeight: thread.unread ? 600 : 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {thread.lastMsg}
              </div>
            </div>

            {thread.unread > 0 && (
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'var(--hydrant)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                  }}
                >
                  {thread.unread}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      <BottomNav active="messages" />
    </div>
  );
}
