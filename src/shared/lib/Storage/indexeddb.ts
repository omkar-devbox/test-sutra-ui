/**
 * ╔══════════════════════════════════════════════════════╗
 * ║             IndexedDB Storage Library                ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Usage:
 *   import { idb, createIndexedDB } from '@/shared/lib/Storage/indexeddb'
 *
 *   await idb.set('user', { id: 1, name: 'Omkar' })
 *   const user = await idb.get<User>('user')
 *   const lang = await idb.getOrDefault('lang', 'en')
 *   await idb.remove('user')
 *   await idb.clear()
 *
 * Custom Store instance:
 *   const customDb = createIndexedDB({ dbName: 'my_app', storeName: 'cache' })
 *   await customDb.set('key', 'value')
 */

import { StorageValue, IndexedDBOptions } from './types';

const DEFAULT_DB_NAME = 'app_idb_storage';
const DEFAULT_STORE_NAME = 'key_value_store';
const DEFAULT_VERSION = 1;

export class IndexedDBStorage {
  private dbPromise: Promise<IDBDatabase> | null = null;
  private dbName: string;
  private storeName: string;
  private version: number;

  constructor(options: IndexedDBOptions = {}) {
    this.dbName = options.dbName || DEFAULT_DB_NAME;
    this.storeName = options.storeName || DEFAULT_STORE_NAME;
    this.version = options.version || DEFAULT_VERSION;
  }

  private getDB(): Promise<IDBDatabase> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return Promise.reject(
        new Error('[IndexedDB] indexedDB is not supported or window is undefined')
      );
    }

    if (!this.dbPromise) {
      this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
        const request = window.indexedDB.open(this.dbName, this.version);

        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName);
          }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => {
          console.error('[IndexedDB] Database open error:', request.error);
          reject(request.error);
        };
      });
    }
    return this.dbPromise;
  }

  private async getStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    const db = await this.getDB();
    const tx = db.transaction(this.storeName, mode);
    return tx.objectStore(this.storeName);
  }

  /**
   * Store any value (objects/arrays are auto-stored).
   * @example await idb.set('user', { id: 1, name: 'Omkar' })
   */
  async set<T extends StorageValue>(key: string, value: T): Promise<void> {
    try {
      const store = await this.getStore('readwrite');
      return new Promise<void>((resolve, reject) => {
        const request = store.put(value, key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error(`[IndexedDB] set("${key}") failed:`, e);
    }
  }

  /**
   * Retrieve a typed value by key. Returns `null` if not found.
   * @example const user = await idb.get<User>('user')
   */
  async get<T = StorageValue>(key: string): Promise<T | null> {
    try {
      const store = await this.getStore('readonly');
      return new Promise<T | null>((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => {
          const result = request.result;
          resolve(result !== undefined ? (result as T) : null);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error(`[IndexedDB] get("${key}") failed:`, e);
      return null;
    }
  }

  /**
   * Retrieve a value or return a default when absent.
   * @example const theme = await idb.getOrDefault<string>('theme', 'dark')
   */
  async getOrDefault<T = StorageValue>(key: string, defaultValue: T): Promise<T> {
    const val = await this.get<T>(key);
    return val !== null ? val : defaultValue;
  }

  /**
   * Delete a single key.
   * @example await idb.remove('user')
   */
  async remove(key: string): Promise<void> {
    try {
      const store = await this.getStore('readwrite');
      return new Promise<void>((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error(`[IndexedDB] remove("${key}") failed:`, e);
    }
  }

  /**
   * Delete multiple keys in one call.
   * @example await idb.removeMany(['user', 'token'])
   */
  async removeMany(keys: string[]): Promise<void> {
    await Promise.all(keys.map((key) => this.remove(key)));
  }

  /**
   * Clear ALL entries in this store. Use carefully!
   * @example await idb.clear()
   */
  async clear(): Promise<void> {
    try {
      const store = await this.getStore('readwrite');
      return new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error('[IndexedDB] clear() failed:', e);
    }
  }

  /**
   * Check whether a key exists.
   * @example const exists = await idb.has('user')  // → true | false
   */
  async has(key: string): Promise<boolean> {
    const val = await this.get(key);
    return val !== null;
  }

  /**
   * Get every key-value pair as a plain object.
   * @example const allData = await idb.getAll()
   */
  async getAll(): Promise<Record<string, StorageValue>> {
    const result: Record<string, StorageValue> = {};
    try {
      const store = await this.getStore('readonly');
      return new Promise<Record<string, StorageValue>>((resolve, reject) => {
        const keysReq = store.getAllKeys();
        const valuesReq = store.getAll();

        let keys: IDBValidKey[] | null = null;
        let values: any[] | null = null;

        const checkDone = () => {
          if (keys && values) {
            for (let i = 0; i < keys.length; i++) {
              result[String(keys[i])] = values[i];
            }
            resolve(result);
          }
        };

        keysReq.onsuccess = () => {
          keys = keysReq.result;
          checkDone();
        };
        keysReq.onerror = () => reject(keysReq.error);

        valuesReq.onsuccess = () => {
          values = valuesReq.result;
          checkDone();
        };
        valuesReq.onerror = () => reject(valuesReq.error);
      });
    } catch (e) {
      console.error('[IndexedDB] getAll() failed:', e);
      return result;
    }
  }

  /**
   * Get only entries whose key starts with a given prefix.
   * The returned object strips the prefix from keys.
   * @example const cachedItems = await idb.getByPrefix('cache_')
   */
  async getByPrefix(prefix: string): Promise<Record<string, StorageValue>> {
    const all = await this.getAll();
    const result: Record<string, StorageValue> = {};
    for (const [key, val] of Object.entries(all)) {
      if (key.startsWith(prefix)) {
        result[key.slice(prefix.length)] = val;
      }
    }
    return result;
  }

  /**
   * Delete all keys that share a prefix.
   * @example await idb.removeByPrefix('cache_')
   */
  async removeByPrefix(prefix: string): Promise<void> {
    const all = await this.getAll();
    const keysToRemove = Object.keys(all).filter((key) => key.startsWith(prefix));
    await this.removeMany(keysToRemove);
  }

  /**
   * Shallow-merge a partial object into an existing stored object.
   * @example await idb.merge<User>('user', { name: 'New Name' })
   */
  async merge<T extends object>(key: string, partial: Partial<T>): Promise<void> {
    try {
      const existing = await this.get<T>(key);
      const merged = { ...(existing ?? {}), ...partial };
      await this.set(key, merged);
    } catch (e) {
      console.error(`[IndexedDB] merge("${key}") failed:`, e);
    }
  }
}

/** Pre-instantiated default IndexedDB storage instance */
export const indexedDBStorage = new IndexedDBStorage();
export const idb = indexedDBStorage;

/** Factory function to create custom IndexedDB store instances */
export function createIndexedDB(options?: IndexedDBOptions): IndexedDBStorage {
  return new IndexedDBStorage(options);
}
