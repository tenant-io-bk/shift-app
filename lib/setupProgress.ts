// Tracks which optional worker setup tasks have been completed.
// Persisted in localStorage so the profile checklist survives reloads.

export type SetupTask = 'payout' | 'availability' | 'neighborhood' | 'credentials' | 'w9';

const KEY = 'shift:worker-setup';

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
