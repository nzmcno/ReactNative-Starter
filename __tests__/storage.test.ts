import { describe, it, expect, vi, beforeEach } from 'vitest';
import { storage } from '../src/services/storage';

// Mock AsyncStorage
vi.mock('@react-native-async-storage/async-storage', () => {
  let store: Record<string, string> = {};
  return {
    default: {
      getItem: vi.fn(async (key: string) => store[key] ?? null),
      setItem: vi.fn(async (key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn(async (key: string) => {
        delete store[key];
      }),
      clear: vi.fn(async () => {
        store = {};
      }),
    },
  };
});

describe('Storage Service', () => {
  beforeEach(async () => {
    await storage.clear();
    vi.clearAllMocks();
  });

  it('returns default value when key is not present', async () => {
    const result = await storage.get<string>('missing_key', 'fallback');
    expect(result).toBe('fallback');
  });

  it('sets and gets serialized JSON data', async () => {
    const data = { theme: 'dark', notifications: true };
    await storage.set('user_settings', data);

    const result = await storage.get('user_settings', null);
    expect(result).toEqual(data);
  });

  it('removes stored data successfully', async () => {
    await storage.set('temp_token', '12345');
    await storage.remove('temp_token');

    const result = await storage.get('temp_token', null);
    expect(result).toBeNull();
  });

  it('clears all data from storage', async () => {
    await storage.set('key1', 'val1');
    await storage.set('key2', 'val2');
    await storage.clear();

    const val1 = await storage.get('key1', null);
    const val2 = await storage.get('key2', null);

    expect(val1).toBeNull();
    expect(val2).toBeNull();
  });
});
