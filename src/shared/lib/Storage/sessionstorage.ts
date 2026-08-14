/**
 * ╔══════════════════════════════════════════════════════╗
 * ║            SessionStorage Utility Library            ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Usage:
 *   import { session } from '@/shared/lib/Storage/sessionstorage'
 *
 *   session.set('token', 'abc123')
 *   session.get<string>('token')
 *   session.getOrDefault<string>('step', '1')
 *   session.remove('token')
 */

import { StorageValue } from './types';

function serialize(value: StorageValue): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function deserialize<T = StorageValue>(raw: string | null): T | null {
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as unknown as T;
  }
}

function getSessionStorage(): Storage | null {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    return window.sessionStorage;
  }
  return null;
}

export const session = {
  /**
   * Store any value (objects/arrays are auto-serialized).
   * @example session.set('tempUser', { id: 1, name: 'Sutra-ui' })
   */
  set<T extends StorageValue>(key: string, value: T): void {
    try {
      const store = getSessionStorage();
      if (!store) return;
      store.setItem(key, serialize(value));
    } catch (e) {
      console.error(`[SessionStorage] set("${key}") failed:`, e);
    }
  },

  /**
   * Retrieve a typed value. Returns `null` if key missing.
   * @example session.get<string>('token')  // → 'abc123' | null
   */
  get<T = StorageValue>(key: string): T | null {
    try {
      const store = getSessionStorage();
      if (!store) return null;
      return deserialize<T>(store.getItem(key));
    } catch (e) {
      console.error(`[SessionStorage] get("${key}") failed:`, e);
      return null;
    }
  },

  /**
   * Retrieve a value or return a default when absent.
   * @example session.getOrDefault<string>('step', '1')
   */
  getOrDefault<T = StorageValue>(key: string, defaultValue: T): T {
    const val = session.get<T>(key);
    return val !== null ? val : defaultValue;
  },

  /**
   * Delete a single key.
   * @example session.remove('tempUser')
   */
  remove(key: string): void {
    try {
      const store = getSessionStorage();
      if (!store) return;
      store.removeItem(key);
    } catch (e) {
      console.error(`[SessionStorage] remove("${key}") failed:`, e);
    }
  },

  /**
   * Delete multiple keys in one call.
   * @example session.removeMany(['key1', 'key2'])
   */
  removeMany(keys: string[]): void {
    keys.forEach((key) => session.remove(key));
  },

  /**
   * Clear ALL entries in session storage. Use carefully!
   * @example session.clear()
   */
  clear(): void {
    try {
      const store = getSessionStorage();
      if (!store) return;
      store.clear();
    } catch (e) {
      console.error('[SessionStorage] clear() failed:', e);
    }
  },

  /**
   * Check whether a key exists.
   * @example session.has('token')  // → true | false
   */
  has(key: string): boolean {
    try {
      const store = getSessionStorage();
      if (!store) return false;
      return store.getItem(key) !== null;
    } catch {
      return false;
    }
  },

  /**
   * Get every key-value pair as a plain object.
   * @example session.getAll()
   */
  getAll(): Record<string, StorageValue> {
    const result: Record<string, StorageValue> = {};
    try {
      const store = getSessionStorage();
      if (!store) return result;
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (key) result[key] = deserialize(store.getItem(key)) as StorageValue;
      }
    } catch (e) {
      console.error('[SessionStorage] getAll() failed:', e);
    }
    return result;
  },

  /**
   * Get only entries whose key starts with a given prefix.
   * The returned object strips the prefix from keys.
   * @example session.getByPrefix('temp_')
   */
  getByPrefix(prefix: string): Record<string, StorageValue> {
    const result: Record<string, StorageValue> = {};
    try {
      const store = getSessionStorage();
      if (!store) return result;
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (key && key.startsWith(prefix)) {
          result[key.slice(prefix.length)] = deserialize(store.getItem(key)) as StorageValue;
        }
      }
    } catch (e) {
      console.error(`[SessionStorage] getByPrefix("${prefix}") failed:`, e);
    }
    return result;
  },

  /**
   * Delete all keys that share a prefix.
   * @example session.removeByPrefix('temp_')
   */
  removeByPrefix(prefix: string): void {
    try {
      const store = getSessionStorage();
      if (!store) return;
      const toRemove: string[] = [];
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (key && key.startsWith(prefix)) toRemove.push(key);
      }
      toRemove.forEach((key) => store.removeItem(key));
    } catch (e) {
      console.error(`[SessionStorage] removeByPrefix("${prefix}") failed:`, e);
    }
  },

  /**
   * Shallow-merge a partial object into an existing stored object.
   * @example session.merge<State>('draft', { step: 2 })
   */
  merge<T extends object>(key: string, partial: Partial<T>): void {
    try {
      const existing = session.get<T>(key);
      const merged = { ...(existing ?? {}), ...partial };
      session.set(key, merged);
    } catch (e) {
      console.error(`[SessionStorage] merge("${key}") failed:`, e);
    }
  },
};
