'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBar from '@/app/components/StatusBar';
import { ScreenFlash } from '@/app/components/ScreenFlash';
import { earnBadge, type BadgeTier } from '@/lib/setupProgress';

// ── Quiz content ──────────────────────────────────────────────────────────────
// Scenario questions per role. correct = index of the best answer.

interface Question {
  prompt: string;
  options: string[];
  correct: number;
  why: string;
}

const QUIZZES: Record<string, Question[]> = {
  Barista: [
    {
      prompt: 'Mid-rush, a regular says their flat white is cold and bitter. Best move?',
      options: [
        'Remake it now, apologize, and check your shot time and milk temp',
        'Explain that a flat white is meant to taste strong',
        'Hand them sugar and move to the next order',
        'Refund it and skip the remake',
      ],
      correct: 0,
      why: 'Recover fast and fix the root cause — a remake plus a quick check of extraction and steam keeps the regular and the line happy.',
    },
    {
      prompt: 'Your espresso pulls in 15 seconds and tastes sour. What do you adjust first?',
      options: [
        'Grind finer to slow the extraction',
        'Grind coarser to speed it up',
        'Use less coffee in the basket',
        'Spike the water temperature',
      ],
      correct: 0,
      why: 'A 15-second shot is running too fast and under-extracting (sour). Grinding finer slows flow and balances the shot.',
    },
    {
      prompt: 'Ten deep and you are solo on bar. How do you hold flow?',
      options: [
        'Call drinks in order, steam milk in batches, stage cups ahead',
        'Finish each drink fully before starting the next',
        'Pause orders until the line clears',
        'Make the easy drinks first regardless of order',
      ],
      correct: 0,
      why: 'Batching steam and staging cups is how high-volume bars keep tickets moving without sacrificing order.',
    },
  ],
  Bartender: [
    {
      prompt: 'A regular is visibly intoxicated and orders another double. You…',
      options: [
        'Politely cut them off, offer water, and help arrange a safe ride',
        'Serve it — they are a regular and tip well',
        'Quietly serve a single instead',
        'Ignore the order and hope they leave',
      ],
      correct: 0,
      why: 'Responsible service is non-negotiable and protects the guest, the bar, and your liability. Water and a safe ride is the move.',
    },
    {
      prompt: 'Build a classic Negroni.',
      options: [
        'Equal parts gin, Campari, sweet vermouth — stirred, orange peel',
        'Gin, lime juice, soda over ice',
        'Vodka and coffee liqueur, shaken',
        'Rum, mint, lime, sugar, muddled',
      ],
      correct: 0,
      why: 'A Negroni is equal parts gin, Campari, and sweet vermouth, stirred over ice and garnished with an orange peel.',
    },
    {
      prompt: 'Three tickets land at once during a rush. How do you fire them?',
      options: [
        'Batch by spec — stir and build like drinks together, garnish last',
        'Make every ticket strictly start to finish, one at a time',
        'Start with whichever drink is easiest',
        'Wait until the bar quiets down',
      ],
      correct: 0,
      why: 'Batching by technique and garnishing last is how bartenders clear multiple tickets without losing consistency.',
    },
  ],
  Server: [
    {
      prompt: 'A guest says their dish contains an allergen they flagged. First action?',
      options: [
        'Apologize, remove the plate, alert the kitchen/manager, refire allergen-safe',
        'Scrape the ingredient off and bring it back',
        'Reassure them it is probably fine',
        'Comp a dessert and leave the dish',
      ],
      correct: 0,
      why: 'An allergen error is a safety issue — pull the plate immediately, escalate, and refire a verified-safe dish.',
    },
    {
      prompt: 'A six-top wants separate checks after ordering on one tab. Best handling?',
      options: [
        'Stay calm and split by seat in the POS, then confirm each total',
        'Tell them separate checks are not possible now',
        'Estimate an even split across six',
        'Hand them the one check and let them sort cash',
      ],
      correct: 0,
      why: 'Modern POS systems split by seat — handling it smoothly protects the tip and the guest experience.',
    },
    {
      prompt: 'You get triple-seated at once. How do you manage the floor?',
      options: [
        'Greet all three fast, set expectations, then stagger drinks and orders',
        'Fully finish table one before acknowledging the others',
        'Wait for a host or manager to help',
        'Take one combined order from all tables at once',
      ],
      correct: 0,
      why: 'A quick greet to every table buys you time — guests forgive a wait when they have been acknowledged.',
    },
  ],
};

const ROLES = Object.keys(QUIZZES);

const GRADING_STATUS = [
  'Reading your answers…',
  'Scoring against 2,400 real shifts…',
  'Checking judgment on edge cases…',
  'Finalizing your badge…',
];

type Phase = 'intro' | 'quiz' | 'grading' | 'result';

export default function SkillsQuiz() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('intro');
  const [role, setRole] = useState<string>('');
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [gradeStep, setGradeStep] = useState(0);
  const [flash, setFlash] = useState(0);
  const savedRef = useRef(false);

  const questions = role ? QUIZZES[role] : [];

  // Simulated AI grading — rotate status lines, then reveal the result.
  useEffect(() => {
    if (phase !== 'grading') return;
    setGradeStep(0);
    const iv = setInterval(() => setGradeStep(s => Math.min(s + 1, GRADING_STATUS.length - 1)), 650);
    const done = setTimeout(() => {
      clearInterval(iv);
      setPhase('result');
      setFlash(f => f + 1);
    }, 2600);
    return () => { clearInterval(iv); clearTimeout(done); };
  }, [phase]);

  const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
  const tier: BadgeTier = score === 100 ? 'expert' : 'verified';
  const passed = score >= 67;

  // Persist the badge once, when a passing result is shown.
  useEffect(() => {
    if (phase === 'result' && passed && !savedRef.current) {
      savedRef.current = true;
      earnBadge({ role, score, tier, earnedAt: new Date().toISOString() });
    }
  }, [phase, passed, role, score, tier]);

  function startQuiz(r: string) {
    setRole(r);
    setQIdx(0);
    setAnswers([]);
    setPhase('quiz');
  }

  function answer(optIdx: number) {
    const next = [...answers];
    next[qIdx] = optIdx;
    setAnswers(next);
    if (qIdx < questions.length - 1) {
      setTimeout(() => setQIdx(qIdx + 1), 180);
    } else {
      setTimeout(() => setPhase('grading'), 220);
    }
  }

  function retake() {
    savedRef.current = false;
    setQIdx(0);
    setAnswers([]);
    setPhase('quiz');
  }

  const shell = {
    maxWidth: 390, minHeight: '100vh', margin: '0 auto',
    background: 'var(--paper)', display: 'flex', flexDirection: 'column' as const,
  };

  // ── INTRO ───────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={shell}>
        <StatusBar />
        <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <Link href="/worker/profile" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', width: 32 }}>←</Link>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>Skills Quiz</span>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ padding: '20px 22px 40px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 10 10" fill="none"><path d="M5 0L6.18 3.82L10 5L6.18 6.18L5 10L3.82 6.18L0 5L3.82 3.82L5 0Z" fill="var(--green)" /></svg>
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' }}>AI-graded · ~60 seconds</span>
          </div>
          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 36, letterSpacing: '-0.075em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: 12 }}>
            Prove It. Get a Verified Badge.
          </h1>
          <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 28 }}>
            Three real shift scenarios. SHIFT scores your judgment and adds a <strong>Verified</strong> badge to your profile — verified workers get booked first and unlock higher-paying shifts.
          </p>

          <div style={{ fontFamily: 'var(--body)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 12 }}>
            Pick a role to verify
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ROLES.map(r => (
              <button key={r} onClick={() => startQuiz(r)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 18px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                border: '2px solid var(--ink)', background: 'var(--card)',
              }}>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 18, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{r}</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)' }}>3 questions →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ────────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q = questions[qIdx];
    return (
      <div style={shell}>
        <StatusBar />
        <div style={{ height: 44, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)' }}>
          <button
            onClick={() => qIdx === 0 ? setPhase('intro') : setQIdx(qIdx - 1)}
            style={{ fontSize: 20, color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer', width: 32, textAlign: 'left' }}
          >←</button>
          <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>{role} · Verify</span>
          <div style={{ width: 32 }} />
        </div>

        {/* Progress */}
        <div style={{ padding: '14px 22px 4px', display: 'flex', gap: 6 }}>
          {questions.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= qIdx ? 'var(--ink)' : 'var(--paper-3)', transition: 'background 0.3s' }} />
          ))}
        </div>

        <div style={{ padding: '20px 22px 40px', flex: 1 }}>
          <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 10 }}>
            Scenario {qIdx + 1} of {questions.length}
          </div>
          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: 22 }}>
            {q.prompt}
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              const selected = answers[qIdx] === i;
              return (
                <button key={i} onClick={() => answer(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '15px 16px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                  border: '2px solid var(--ink)',
                  background: selected ? 'var(--ink)' : 'var(--card)',
                  transition: 'background 0.12s',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    border: selected ? '2px solid #fff' : '2px solid var(--ink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 12, color: selected ? '#fff' : 'var(--ink)' }}>{String.fromCharCode(65 + i)}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 14, lineHeight: 1.35, color: selected ? '#fff' : 'var(--ink)' }}>{opt}</span>
                </button>
              );
            })}
          </div>

          <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--ink)', marginTop: 18, textAlign: 'center' }}>
            Pick the answer closest to how you'd actually handle it.
          </p>
        </div>
      </div>
    );
  }

  // ── GRADING (simulated AI) ────────────────────────────────────────────────────
  if (phase === 'grading') {
    return (
      <div style={{ ...shell, alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <style>{`@keyframes brand-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', flexShrink: 0, marginBottom: 24,
          background: 'conic-gradient(#72c15f 0deg, #9A7CE0 90deg, #E5391F 180deg, #f7dd6d 270deg, #72c15f 360deg)',
          WebkitMask: 'radial-gradient(transparent 54%, black 55%)',
          mask: 'radial-gradient(transparent 54%, black 55%)',
          animation: 'brand-spin 1s linear infinite',
        }} />
        <p style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 8 }}>Grading Your Answers</p>
        <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', textAlign: 'center', transition: 'opacity 0.2s' }}>{GRADING_STATUS[gradeStep]}</p>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────────
  return (
    <div style={{ ...shell, background: passed ? 'var(--ink)' : 'var(--paper)' }}>
      <ScreenFlash trigger={flash} />
      {passed ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '56px 22px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>
              {tier === 'expert' ? 'Top score · Expert tier' : 'Badge earned'}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 48, color: '#fff', letterSpacing: '-0.06em', lineHeight: 0.95, marginBottom: 8 }}>
            {role.toUpperCase()}<br />VERIFIED<span style={{ color: 'var(--green)' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24 }}>
            You scored <strong style={{ color: '#fff' }}>{score}%</strong>. This badge now shows on your profile — verified {role}s get surfaced to employers first.
          </p>

          {/* Per-question recap */}
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '6px 16px', marginBottom: 28 }}>
            {questions.map((q, i) => {
              const right = answers[i] === q.correct;
              return (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < questions.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1, background: right ? 'var(--green)' : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {right
                      ? <svg width="9" height="7" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="#0D0E12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <span style={{ color: '#fff', fontSize: 11, lineHeight: 1 }}>·</span>}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 12.5, color: '#fff', lineHeight: 1.3, marginBottom: 3 }}>Scenario {i + 1}</div>
                    <div style={{ fontFamily: 'var(--body)', fontSize: 11.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{q.why}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => router.push('/worker/profile')} style={{
              padding: '16px 22px', borderRadius: 99, background: '#fff', color: 'var(--ink)', border: 'none',
              fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, cursor: 'pointer', letterSpacing: '-0.01em',
            }}>
              Add to Profile →
            </button>
            {tier !== 'expert' && (
              <button onClick={retake} style={{
                padding: '14px 22px', borderRadius: 99, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.3)',
                fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, cursor: 'pointer',
              }}>
                Retake for a Perfect Score
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <StatusBar />
          <div style={{ padding: '40px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: 12 }}>So close</div>
            <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 34, letterSpacing: '-0.06em', lineHeight: 1, color: 'var(--ink)', marginBottom: 12 }}>
              {score}% — Almost There.
            </h1>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 24 }}>
              You need 67% to earn the badge. Here's the thinking on each scenario — give it another go.
            </p>

            <div style={{ background: 'var(--card)', border: '2px solid var(--ink)', borderRadius: 14, padding: '4px 16px', marginBottom: 28 }}>
              {questions.map((q, i) => {
                const right = answers[i] === q.correct;
                return (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < questions.length - 1 ? '1px solid var(--line)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--body)', fontSize: 13, flexShrink: 0, marginTop: 1 }}>{right ? '✓' : '✗'}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 12.5, color: 'var(--ink)', marginBottom: 3 }}>Scenario {i + 1}</div>
                      <div style={{ fontFamily: 'var(--body)', fontSize: 11.5, color: 'var(--ink)', lineHeight: 1.5 }}>{q.why}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={retake} style={{
                padding: '16px 22px', borderRadius: 99, background: 'var(--ink)', color: '#fff', border: 'none',
                fontFamily: 'var(--body)', fontWeight: 500, fontSize: 16, cursor: 'pointer', letterSpacing: '-0.01em',
              }}>
                Try Again →
              </button>
              <Link href="/worker/profile" style={{
                padding: '14px 22px', borderRadius: 99, background: 'transparent', color: 'var(--ink)', border: '2px solid var(--ink)',
                fontFamily: 'var(--body)', fontWeight: 500, fontSize: 15, textAlign: 'center', textDecoration: 'none',
              }}>
                Maybe Later
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
