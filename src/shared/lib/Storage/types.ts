/**
 * ╔══════════════════════════════════════════════════════╗
 * ║        Universal Storage Types & Interfaces          ║
 * ╚══════════════════════════════════════════════════════╝
 */

export type StorageValue = string | number | boolean | object | null;

export interface CookieOptions {
  /** Cookie expiry in days. Omit for session cookie. */
  days?: number;
  /** Cookie path (default: '/') */
  path?: string;
  /** Cookie domain */
  domain?: string;
  /** Only send cookie over HTTPS */
  secure?: boolean;
  /** SameSite policy (default: 'Lax') */
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export interface IndexedDBOptions {
  /** Database name (default: 'app_idb_storage') */
  dbName?: string;
  /** Object store name (default: 'key_value_store') */
  storeName?: string;
  /** Database version (default: 1) */
  version?: number;
}
