/**
 * Lightweight session store for the interactive terminal.
 * All client-side, localStorage-backed, fails gracefully on SSR.
 */

const KEY_VISITS = "term:visits";
const KEY_LAST_SECTION = "term:last";
const KEY_NAME = "term:name";

export interface TerminalSession {
  visits: number;
  lastSection: string | null;
  userName: string | null;
  isFirstVisit: boolean;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded or disabled — ignore */
  }
}

export function loadSession(): TerminalSession {
  const visits = read<number>(KEY_VISITS, 0);
  return {
    visits,
    lastSection: read<string | null>(KEY_LAST_SECTION, null),
    userName: read<string | null>(KEY_NAME, null),
    isFirstVisit: visits === 0,
  };
}

export function incrementVisits(): void {
  const v = read<number>(KEY_VISITS, 0);
  write(KEY_VISITS, v + 1);
}

export function setLastSection(section: string): void {
  write(KEY_LAST_SECTION, section);
}

export function setUserName(name: string): void {
  write(KEY_NAME, name);
}

export function resetSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY_VISITS);
  window.localStorage.removeItem(KEY_LAST_SECTION);
  window.localStorage.removeItem(KEY_NAME);
}
