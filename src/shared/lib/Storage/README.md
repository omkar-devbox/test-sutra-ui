# 📦 Universal Storage Module (`src/shared/lib/Storage`)

A unified, SSR-safe, type-safe, and zero-dependency storage abstraction library supporting **LocalStorage**, **SessionStorage**, **Browser Cookies**, and **IndexedDB**.

---

## 📑 Table of Contents
1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [File Architecture](#-file-architecture)
4. [Storage Engine Comparison](#-storage-engine-comparison)
5. [Quick Start & Import Guide](#-quick-start--import-guide)
6. [Detailed API Documentation & Usage](#-detailed-api-documentation--usage)
   - [1. LocalStorage (`local`)](#1-localstorage-local)
   - [2. SessionStorage (`session`)](#2-sessionstorage-session)
   - [3. Cookie Management (`cookie`)](#3-cookie-management-cookie)
   - [4. IndexedDB (`idb` & `createIndexedDB`)](#4-indexeddb-idb--createindexeddb)
7. [TypeScript Types & Interfaces](#-typescript-types--interfaces)
8. [Best Practices & Security](#-best-practices--security)

---

## 🌟 Overview

The `Storage` module provides clean, uniform JavaScript/TypeScript APIs for accessing browser storage persistence mechanisms. It encapsulates raw browser storage exceptions, handles automatic JSON serialization and deserialization, prevents Server-Side Rendering (SSR / Next.js) crashes, and offers modern utilities like prefix management and shallow object merging.

---

## ✨ Key Features

- 🛡️ **SSR Safe**: Safe checks for `window` and `document` environments to prevent crashes during SSR or static site generation.
- 🔄 **Auto Serialization**: Automatic `JSON.stringify` and `JSON.parse` for complex types (Objects, Arrays, Booleans, Numbers).
- 🏷️ **Strict Type-Safety**: Generic interfaces (`get<T>`, `getOrDefault<T>`, `merge<T>`) for autocompletion and type checking.
- 🧹 **Prefix & Bulk Operations**: Retrieve or delete entries matching custom prefixes (`getByPrefix`, `removeByPrefix`, `removeMany`).
- 🔀 **State Merging**: Native shallow merging for stored objects (`merge<T>`).
- ⚡ **Asynchronous IndexedDB**: Full promise-based wrapper around IndexedDB for large offline data with custom store creation.

---

## 📁 File Architecture

```text
src/shared/lib/Storage/
├── types.ts           # Universal TypeScript types & options interfaces
├── localstorage.ts    # Synchronous LocalStorage helper & main module entry
├── sessionstorage.ts  # Synchronous SessionStorage helper
├── cookie.ts          # Synchronous Document Cookie helper
├── indexeddb.ts       # Asynchronous Promise-based IndexedDB helper & factory
└── README.md          # Comprehensive usage and API documentation
```

---

## 📊 Storage Engine Comparison

| Feature | LocalStorage (`local`) | SessionStorage (`session`) | Cookie (`cookie`) | IndexedDB (`idb`) |
| :--- | :--- | :--- | :--- | :--- |
| **Persistence** | Permanent (until cleared) | Tab / Session duration | Configurable (Days / Session) | Permanent (until cleared) |
| **Storage Limit** | ~5MB - 10MB | ~5MB | ~4KB per cookie | ~50MB+ (Quota dependent) |
| **API Type** | Synchronous | Synchronous | Synchronous | **Asynchronous (Promise)** |
| **Complex Objects** | Auto JSON Serialized | Auto JSON Serialized | Auto JSON Serialized | Native Structured Clone |
| **SSR Safe** | Yes | Yes | Yes | Yes |
| **Expiration (TTL)** | Manual | Automatic on tab close | Native HTTP/Expires | Manual |

---

## 🚀 Quick Start & Import Guide

You can import utilities directly from their individual files:

```typescript
// Import individual drivers
import { local } from '@/shared/lib/Storage/localstorage';
import { session } from '@/shared/lib/Storage/sessionstorage';
import { cookie } from '@/shared/lib/Storage/cookie';
import { idb, createIndexedDB } from '@/shared/lib/Storage/indexeddb';
```

---

## 📖 Detailed API Documentation & Usage

### 1. LocalStorage (`local`)

`local` persists data across browser sessions and tab reloads.

#### Common Methods

##### `local.set<T>(key: string, value: T): void`
Stores any JSON-serializable value under a given key.
```typescript
interface UserProfile {
  id: number;
  name: string;
  email: string;
}

local.set('user_profile', { id: 101, name: 'Alex', email: 'alex@example.com' });
local.set('theme_mode', 'dark');
local.set('is_authenticated', true);
```

##### `local.get<T>(key: string): T | null`
Retrieves a typed value. Returns `null` if key does not exist or environment is non-browser.
```typescript
const theme = local.get<string>('theme_mode'); // 'dark' | null
const user = local.get<UserProfile>('user_profile'); // UserProfile | null
```

##### `local.getOrDefault<T>(key: string, defaultValue: T): T`
Retrieves a value or returns the provided default if null.
```typescript
const language = local.getOrDefault<string>('lang', 'en'); // 'en' if not set
```

##### `local.merge<T>(key: string, partial: Partial<T>): void`
Shallow-merges properties into an existing stored object.
```typescript
// Initial object: { id: 101, name: 'Alex', email: 'alex@example.com' }
local.merge<UserProfile>('user_profile', { name: 'Alexander' });
// Result: { id: 101, name: 'Alexander', email: 'alex@example.com' }
```

##### `local.has(key: string): boolean`
Checks if a key exists in LocalStorage.
```typescript
if (local.has('user_profile')) {
  console.log('User profile loaded');
}
```

##### `local.remove(key: string): void` & `local.removeMany(keys: string[]): void`
Removes single or multiple keys.
```typescript
local.remove('theme_mode');
local.removeMany(['user_profile', 'is_authenticated']);
```

##### `local.getByPrefix(prefix: string): Record<string, StorageValue>`
Gets all entries matching a prefix, returning an object with the prefix stripped from keys.
```typescript
local.set('app_theme', 'dark');
local.set('app_sidebar', 'collapsed');

const settings = local.getByPrefix('app_');
// Output: { theme: 'dark', sidebar: 'collapsed' }
```

##### `local.removeByPrefix(prefix: string): void`
Deletes all stored entries matching a key prefix.
```typescript
local.removeByPrefix('app_');
```

##### `local.clear(): void`
Clears all entries in LocalStorage.
```typescript
local.clear();
```

---

### 2. SessionStorage (`session`)

`session` retains data only for the duration of the current page tab/session. Closing the tab wipes the data.

#### Usage Example

```typescript
import { session } from '@/shared/lib/Storage/sessionstorage';

// Store temporary wizard step state
session.set('checkout_step', 2);
session.set('draft_form', { title: 'New Application', step: 2 });

// Retrieve typed value
const step = session.get<number>('checkout_step'); // 2

// Merge partial updates into session state
session.merge<{ title: string; step: number }>('draft_form', { step: 3 });

// Check & Remove
if (session.has('checkout_step')) {
  session.remove('checkout_step');
}

// Clear all session storage
session.clear();
```

---

### 3. Cookie Management (`cookie`)

`cookie` handles standard HTTP document cookies with options for expiration, path, domain, security, and SameSite policies.

#### Cookie Options Interface (`CookieOptions`)
```typescript
interface CookieOptions {
  days?: number;         // Expiry in days. Omit for session cookie.
  path?: string;         // Cookie path (default: '/')
  domain?: string;       // Cookie domain
  secure?: boolean;      // Send only over HTTPS (default: false)
  sameSite?: 'Strict' | 'Lax' | 'None'; // SameSite policy (default: 'Lax')
}
```

#### Common Methods

##### `cookie.set(name: string, value: StorageValue, options?: CookieOptions): void`
Sets a cookie with expiration and security options.
```typescript
// Session cookie (cleared when browser closes)
cookie.set('session_id', 'xyz789');

// Persistent secure cookie valid for 30 days
cookie.set('auth_token', 'jwt_secret_token_123', {
  days: 30,
  path: '/',
  secure: true,
  sameSite: 'Strict'
});
```

##### `cookie.get<T>(name: string): T | null`
Reads and deserializes a cookie value by name.
```typescript
const token = cookie.get<string>('auth_token');
```

##### `cookie.getOrDefault<T>(name: string, defaultValue: T): T`
Reads a cookie or returns a fallback default.
```typescript
const theme = cookie.getOrDefault<string>('user_theme', 'light');
```

##### `cookie.remove(name: string, path?: string): void`
Removes a cookie by expiring its date.
```typescript
cookie.remove('auth_token', '/');
```

##### `cookie.getAll(): Record<string, StorageValue>`
Gets all accessible cookies as a key-value dictionary object.
```typescript
const cookies = cookie.getAll();
```

##### `cookie.removeByPrefix(prefix: string, path?: string): void`
Removes all cookies starting with a specific prefix.
```typescript
cookie.removeByPrefix('temp_');
```

---

### 4. IndexedDB (`idb` & `createIndexedDB`)

`idb` provides an asynchronous, Promise-based abstraction over IndexedDB for handling larger datasets, offline storage, or binary/complex objects.

#### Default Shared Instance (`idb`)

Uses database name `app_idb_storage` and object store `key_value_store`.

```typescript
import { idb } from '@/shared/lib/Storage/indexeddb';

async function handleCache() {
  // Store object asynchronously
  await idb.set('user_data', { id: 42, preferences: { emailNotifs: true } });

  // Get stored object
  const user = await idb.get<{ id: number; preferences: any }>('user_data');
  console.log(user?.id); // 42

  // Get with fallback default
  const offlineMode = await idb.getOrDefault('offline_mode', false);

  // Merge updates
  await idb.merge('user_data', { preferences: { emailNotifs: false } });

  // Delete key
  await idb.remove('user_data');

  // Clear store
  await idb.clear();
}
```

#### Custom IndexedDB Instance (`createIndexedDB`)

Create separate databases or object stores for dedicated features (e.g., offline media cache, custom logs).

```typescript
import { createIndexedDB } from '@/shared/lib/Storage/indexeddb';

// Create custom store instance
const offlineCache = createIndexedDB({
  dbName: 'my_app_cache',
  storeName: 'api_responses',
  version: 1
});

async function cacheResponse() {
  await offlineCache.set('/api/v1/courses', [{ id: 1, name: 'Computer Science' }]);
  const cachedCourses = await offlineCache.get<any[]>('/api/v1/courses');
}
```

---

## 🛠️ TypeScript Types & Interfaces

Defined in `types.ts`:

```typescript
export type StorageValue = string | number | boolean | object | null;

export interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export interface IndexedDBOptions {
  dbName?: string;
  storeName?: string;
  version?: number;
}
```

---

## 🔒 Best Practices & Security

1. **Security & Sensitive Data**:
   - Never store unencrypted access tokens or sensitive credentials in LocalStorage if your app is vulnerable to XSS.
   - Use secure, `HttpOnly` cookies set by the backend server for critical authentication tokens where possible.
   - When using client-side cookies via `cookie.set()`, always set `secure: true` in production environments.

2. **SSR Considerations**:
   - All helpers are safe to invoke in Next.js Server Components or server context without throwing standard `window is not defined` or `document is not defined` errors.
   - When initializing React state from storage, perform the read inside `useEffect` or `useLayoutEffect` to avoid SSR hydration mismatch warnings.

```typescript
import { useState, useEffect } from 'react';
import { local } from '@/shared/lib/Storage/localstorage';

export function useStoredTheme() {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    setTheme(local.getOrDefault('theme', 'light'));
  }, []);

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    local.set('theme', newTheme);
  };

  return { theme, updateTheme };
}
```
