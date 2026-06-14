// Tracks which optional worker setup tasks have been completed, plus any
// skill badges earned from the (simulated) AI skills quiz.
// Persisted in localStorage so the profile survives reloads.

export type SetupTask = 'payout' | 'availability' | 'neighborhood' | 'credentials' | 'w9' | 'quiz';

const KEY = 'shift:worker-setup';
const BADGE_KEY = 'shift:worker-badges';

export function getCompletedTasks(): Record<SetupTask, boolean> {
  if (typeof window === 'undefined') return {} as Record<SetupTask, boolean>;
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {} as Record<SetupTask, boolean>;
  }
}

export function markTaskComplete(task: SetupTask) {
  if (typeof window === 'undefined') return;
  const current = getCompletedTasks();
  current[task] = true;
  localStorage.setItem(KEY, JSON.stringify(current));
}

// ── Skill badges ─────────────────────────────────────────────────────────────

export type BadgeTier = 'verified' | 'expert';

export interface Badge {
  role: string;
  score: number;     // 0–100
  tier: BadgeTier;
  earnedAt: string;  // ISO date
}

export function getBadges(): Record<string, Badge> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(BADGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function earnBadge(badge: Badge) {
  if (typeof window === 'undefined') return;
  const current = getBadges();
  // Keep the best result if they retake a quiz they already passed.
  const existing = current[badge.role];
  if (!existing || badge.score >= existing.score) {
    current[badge.role] = badge;
    localStorage.setItem(BADGE_KEY, JSON.stringify(current));
  }
  markTaskComplete('quiz');
}
