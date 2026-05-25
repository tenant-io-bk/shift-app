'use client';

import { useState } from 'react';
import StatusBar from '@/app/components/StatusBar';
import EmployerNav from '@/app/components/EmployerNav';

type Message = {
  from: 'employer' | 'worker';
  text: string;
  time: string;
};

type Thread = {
  id: string;
  workerName: string;
  role: string;
  shiftDate: string;
  lastMsg: string;
  lastTime: string;
  unread: number;
  initial: string;
  avatarBg: string;
  messages: Message[];
};

const THREADS: Thread[] = [
  {
    id: 'marco',
    workerName: 'Marco Reyes',
    role: 'Barista',
    shiftDate: 'Today · 11A–4P',
    lastMsg: "No worries, door's open.",
    lastTime: '9:38A',
    unread: 0,
    initial: 'M',
    avatarBg: '#72c15f',
    messages: [
      {
        from: 'worker',
        text: "Hey! Running about 5 min late — just left DeKalb.",
        time: '9:32A',
      },
      {
        from: 'employer',
        text: "No worries, door's open. Coffee's already going.",
        time: '9:38A',
      },
    ],
  },
  {
    id: 'sam',
    workerName: 'Sam Ortiz',
    role: 'Barista',
    shiftDate: 'Today · 11A–4P',
    lastMsg: "Here! Just rang the bell.",
    lastTime: '9:41A',
    unread: 1,
    initial: 'S',
    avatarBg: '#2D6A4F',
    messages: [
      {
        from: 'worker',
        text: "Here! Just rang the bell.",
        time: '9:41A',
      },
    ],
  },
  {
    id: 'jules',
    workerName: 'Jules L.',
    role: 'Host',
    shiftDate: 'Sat 31 May · 5P–10P',
    lastMsg: "Confirmed! See you Saturday.",
    lastTime: 'Mon 19',
    unread: 0,
    initial: 'JL',
    avatarBg: '#0D0E12',
    messages: [
      {
        from: 'employer',
        text: "Hey Jules! Just confirming you're all set for Saturday the 31st, 5P–10P. Front of house, smart casual.",
        time: 'Mon 19',
      },
      {
        from: 'worker',
        text: "Confirmed! See you Saturday.",
        time: 'Mon 19',
      },
    ],
  },
];

export default function EmployerMessages() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<Record<string, Message[]>>({});

  const activeThread = activeId ? THREADS.find((t) => t.id === activeId) ?? null : null;

  function sendMessage(threadId: string) {
    const text = (drafts[threadId] ?? '').trim();
    if (!text) return;
    setSent((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] ?? []), { from: 'employer', text, time: 'Now' }],
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

        {/* Header */}
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 16px',
            borderBottom: '1px solid var(--line)',
            flexShrink: 0,
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
                fontSize: 13,
                color: '#fff',
              }}
            >
              {activeThread.initial}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--ink)',
              }}
            >
              {activeThread.workerName}
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--mute)',
              }}
            >
              {activeThread.role} · {activeThread.shiftDate}
            </div>
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
            paddingBottom: 100,
          }}
        >
          {allMessages.map((msg, i) => {
            const isEmployer = msg.from === 'employer';
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: isEmployer ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{ maxWidth: '78%' }}>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: isEmployer
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                      background: isEmployer ? 'var(--ink)' : 'var(--card)',
                      border: isEmployer ? 'none' : '1.5px solid var(--line)',
                      fontFamily: 'var(--mono)',
                      fontSize: 14,
                      color: isEmployer ? '#fff' : 'var(--ink)',
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      color: 'var(--mute)',
                      marginTop: 4,
                      textAlign: isEmployer ? 'right' : 'left',
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
        <div
          style={{
            position: 'fixed',
            bottom: 72,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 390,
            padding: '10px 16px 12px',
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
              fontFamily: 'var(--mono)',
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

        <EmployerNav active="messages" />
      </div>
    );
  }

  // Thread list
  const totalUnread = THREADS.reduce((sum, t) => sum + t.unread, 0);

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
            fontFamily: 'var(--mono)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--mute)',
          }}
        >
          Messages{' '}
          {totalUnread > 0 && (
            <span style={{ color: 'var(--hydrant)' }}>· {totalUnread}</span>
          )}
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
                  fontSize: 15,
                  color: '#fff',
                }}
              >
                {thread.initial}
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
                  {thread.workerName}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'var(--mute)',
                    flexShrink: 0,
                    marginLeft: 8,
                  }}
                >
                  {thread.lastTime}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--hydrant)',
                  marginBottom: 2,
                }}
              >
                {thread.role} · {thread.shiftDate}
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
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
                    fontFamily: 'var(--mono)',
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

      <EmployerNav active="messages" />
    </div>
  );
}
