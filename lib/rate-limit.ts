type Entry = { count: number; resetAt: number };

const WINDOW_MS = 60_000; // 1 perc
const MAX = 10; // 10 request / perc / IP

const store = new Map<string, Entry>();

export function rateLimit(ip: string) {
  const now = Date.now();
  const current = store.get(ip);

  if (!current || now > current.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (current.count >= MAX) return { ok: false };

  current.count += 1;
  store.set(ip, current);
  return { ok: true };
}
