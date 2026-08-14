/**
 * ╔══════════════════════════════════════════════════════╗
 * ║              Cookie Utility Library                  ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Usage:
 *   import { cookie } from '@/shared/lib/Storage/cookie'
 *
 *   cookie.set('lang', 'en', { days: 30, secure: true })
 *   cookie.get<string>('lang')
 *   cookie.getOrDefault<string>('theme', 'light')
 *   cookie.remove('lang')
 */

import { StorageValue, CookieOptions } from './types';

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

export const cookie = {
  /**
   * Set a cookie.
   * @example cookie.set('lang', 'en', { days: 30, secure: true })
   */
  set(name: string, value: StorageValue, options: CookieOptions = {}): void {
    try {
      if (typeof document === 'undefined') return;
      const { days, path = '/', domain, secure = false, sameSite = 'Lax' } = options;

      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(serialize(value))}`;

      if (days !== undefined) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        cookieStr += `; expires=${expires.toUTCString()}`;
      }

      cookieStr += `; path=${path}`;
      if (domain) cookieStr += `; domain=${domain}`;
      if (secure) cookieStr += `; Secure`;
      cookieStr += `; SameSite=${sameSite}`;

      document.cookie = cookieStr;
    } catch (e) {
      console.error(`[Cookie] set("${name}") failed:`, e);
    }
  },

  /**
   * Get a typed cookie value. Returns `null` if not found.
   * @example cookie.get<string>('lang')  // → 'en' | null
   */
  get<T = StorageValue>(name: string): T | null {
    try {
      if (typeof document === 'undefined') return null;
      const encoded = encodeURIComponent(name);
      const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${encoded}=`));
      if (!match) return null;
      const raw = decodeURIComponent(match.split('=').slice(1).join('='));
      return deserialize<T>(raw);
    } catch (e) {
      console.error(`[Cookie] get("${name}") failed:`, e);
      return null;
    }
  },

  /**
   * Get a cookie or return a fallback default.
   * @example cookie.getOrDefault<string>('lang', 'en')
   */
  getOrDefault<T = StorageValue>(name: string, defaultValue: T): T {
    const val = cookie.get<T>(name);
    return val !== null ? val : defaultValue;
  },

  /**
   * Check if a cookie exists.
   * @example cookie.has('token')  // → true | false
   */
  has(name: string): boolean {
    return cookie.get(name) !== null;
  },

  /**
   * Expire (remove) a cookie.
   * @example cookie.remove('token')
   */
  remove(name: string, path = '/'): void {
    try {
      if (typeof document === 'undefined') return;
      document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    } catch (e) {
      console.error(`[Cookie] remove("${name}") failed:`, e);
    }
  },

  /**
   * Expire multiple cookies at once.
   * @example cookie.removeMany(['token', 'user'])
   */
  removeMany(names: string[], path = '/'): void {
    names.forEach((name) => cookie.remove(name, path));
  },

  /**
   * Clear all cookies accessible under current domain/path.
   * @example cookie.clear()
   */
  clear(path = '/'): void {
    try {
      if (typeof document === 'undefined') return;
      document.cookie.split('; ').forEach((row) => {
        const rawKey = row.split('=')[0];
        if (rawKey) {
          const name = decodeURIComponent(rawKey);
          cookie.remove(name, path);
        }
      });
    } catch (e) {
      console.error('[Cookie] clear() failed:', e);
    }
  },

  /**
   * Get all cookies as a plain key-value object.
   * @example cookie.getAll()  // → { lang: 'en', token: 'abc' }
   */
  getAll(): Record<string, StorageValue> {
    const result: Record<string, StorageValue> = {};
    try {
      if (typeof document === 'undefined') return result;
      document.cookie.split('; ').forEach((row) => {
        const [rawKey, ...rawVal] = row.split('=');
        if (rawKey) {
          const key = decodeURIComponent(rawKey);
          result[key] = deserialize(decodeURIComponent(rawVal.join('='))) as StorageValue;
        }
      });
    } catch (e) {
      console.error('[Cookie] getAll() failed:', e);
    }
    return result;
  },

  /**
   * Get all cookies starting with a given prefix.
   * @example cookie.getByPrefix('app_')
   */
  getByPrefix(prefix: string): Record<string, StorageValue> {
    const all = cookie.getAll();
    const result: Record<string, StorageValue> = {};
    for (const [key, val] of Object.entries(all)) {
      if (key.startsWith(prefix)) {
        result[key.slice(prefix.length)] = val;
      }
    }
    return result;
  },

  /**
   * Remove all cookies starting with a given prefix.
   * @example cookie.removeByPrefix('app_')
   */
  removeByPrefix(prefix: string, path = '/'): void {
    const all = cookie.getAll();
    for (const key of Object.keys(all)) {
      if (key.startsWith(prefix)) {
        cookie.remove(key, path);
      }
    }
  },
};
