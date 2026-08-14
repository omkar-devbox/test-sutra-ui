/**
 * ╔══════════════════════════════════════════════════════╗
 * ║             LocalStorage Utility Library             ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Usage:
 *   import { local, session, cookie } from '@/shared/lib/Storage/localstorage'
 *
 *   local.set('theme', 'dark')
 *   local.get<string>('theme')            // → 'dark' | null
 *   local.getOrDefault<string>('lang', 'en')
 *   session.set('token', 'abc123')
 *   cookie.set('lang', 'en', { days: 7, secure: true })
 */

import { StorageValue } from './types';
import { session } from './sessionstorage';
import { cookie } from './cookie';

export * from './types';
export { session, cookie };

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

function getLocalStorage(): Storage | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

export const local = {
  /**
   * Store any value (objects/arrays are auto-serialized).
   * @example local.set('user', { id: 1, name: 'Sutra-ui' })
   */
  set<T extends StorageValue>(key: string, value: T): void {
    try {
      const store = getLocalStorage();
      if (!store) return;
      store.setItem(key, serialize(value));
    } catch (e) {
      console.error(`[LocalStorage] set("${key}") failed:`, e);
    }
  },

  /**
   * Retrieve a typed value. Returns `null` if key missing.
   * @example local.get<string>('theme')  // → 'dark' | null
   */
  get<T = StorageValue>(key: string): T | null {
    try {
      const store = getLocalStorage();
      if (!store) return null;
      return deserialize<T>(store.getItem(key));
    } catch (e) {
      console.error(`[LocalStorage] get("${key}") failed:`, e);
      return null;
    }
  },

  /**
   * Retrieve a value or return a default when absent.
   * @example local.getOrDefault<string>('lang', 'en')
   */
  getOrDefault<T = StorageValue>(key: string, defaultValue: T): T {
    const val = local.get<T>(key);
    return val !== null ? val : defaultValue;
  },

  /**
   * Delete a single key.
   * @example local.remove('theme')
   */
  remove(key: string): void {
    try {
      const store = getLocalStorage();
      if (!store) return;
      store.removeItem(key);
    } catch (e) {
      console.error(`[LocalStorage] remove("${key}") failed:`, e);
    }
  },

  /**
   * Delete multiple keys in one call.
   * @example local.removeMany(['theme', 'lang', 'token'])
   */
  removeMany(keys: string[]): void {
    keys.forEach((key) => local.remove(key));
  },

  /**
   * Clear ALL entries in localStorage. Use carefully!
   * @example local.clear()
   */
  clear(): void {
    try {
      const store = getLocalStorage();
      if (!store) return;
      store.clear();
    } catch (e) {
      console.error('[LocalStorage] clear() failed:', e);
    }
  },

  /**
   * Check whether a key exists.
   * @example local.has('token')  // → true | false
   */
  has(key: string): boolean {
    try {
      const store = getLocalStorage();
      if (!store) return false;
      return store.getItem(key) !== null;
    } catch {
      return false;
    }
  },

  /**
   * Get every key-value pair as a plain object.
   * @example local.getAll()  // → { theme: 'dark', lang: 'en' }
   */
  getAll(): Record<string, StorageValue> {
    const result: Record<string, StorageValue> = {};
    try {
      const store = getLocalStorage();
      if (!store) return result;
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (key) result[key] = deserialize(store.getItem(key)) as StorageValue;
      }
    } catch (e) {
      console.error('[LocalStorage] getAll() failed:', e);
    }
    return result;
  },

  /**
   * Get only entries whose key starts with a given prefix.
   * The returned object strips the prefix from keys.
   * @example local.getByPrefix('tenant_abc_')
   */
  getByPrefix(prefix: string): Record<string, StorageValue> {
    const result: Record<string, StorageValue> = {};
    try {
      const store = getLocalStorage();
      if (!store) return result;
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (key && key.startsWith(prefix)) {
          result[key.slice(prefix.length)] = deserialize(store.getItem(key)) as StorageValue;
        }
      }
    } catch (e) {
      console.error(`[LocalStorage] getByPrefix("${prefix}") failed:`, e);
    }
    return result;
  },

  /**
   * Delete all keys that share a prefix.
   * @example local.removeByPrefix('tenant_abc_')
   */
  removeByPrefix(prefix: string): void {
    try {
      const store = getLocalStorage();
      if (!store) return;
      const toRemove: string[] = [];
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (key && key.startsWith(prefix)) toRemove.push(key);
      }
      toRemove.forEach((key) => store.removeItem(key));
    } catch (e) {
      console.error(`[LocalStorage] removeByPrefix("${prefix}") failed:`, e);
    }
  },

  /**
   * Shallow-merge a partial object into an existing stored object.
   * @example local.merge<Settings>('settings', { darkMode: true })
   */
  merge<T extends object>(key: string, partial: Partial<T>): void {
    try {
      const existing = local.get<T>(key);
      const merged = { ...(existing ?? {}), ...partial };
      local.set(key, merged);
    } catch (e) {
      console.error(`[LocalStorage] merge("${key}") failed:`, e);
    }
  },
};
