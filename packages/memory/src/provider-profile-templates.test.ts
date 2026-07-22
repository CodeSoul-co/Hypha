import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

describe('public memory provider profile templates', () => {
  it('declares all supported profiles without inline credentials', () => {
    const path = resolve(process.cwd(), 'configs/memory-profiles.yaml');
    const parsed = parse(readFileSync(path, 'utf8')) as {
      profiles: Record<
        string,
        {
          status: string;
          management: { config?: Record<string, unknown> };
          stores?: Record<string, unknown>;
        }
      >;
    };
    expect(Object.keys(parsed.profiles).sort()).toEqual([
      'mem0-oss',
      'mem0-platform',
      'memorybank-managed',
      'native-default',
      'native-lite',
    ]);
    expect(parsed.profiles['native-lite']?.status).toBe('framework-validated');
    expect(parsed.profiles['native-default']?.status).toBe('framework-validated');
    expect(parsed.profiles['mem0-platform']?.status).toBe('controlled-test');
    expect(parsed.profiles['native-lite']?.stores).toMatchObject({
      working: 'working.in-memory.bounded',
      structured: 'storage.sqlite.structured',
      vector: 'vector.local.in-memory',
      artifact: 'artifact.local.filesystem',
      persistence: 'local-durable',
      coordination: 'single-process',
    });
    expect(parsed.profiles['native-default']?.stores).toMatchObject({
      working: 'redis.working',
      structured: 'mongo.memory.structured',
      vector: 'vector.local.in-memory',
      artifact: 'artifact.local.filesystem',
      persistence: 'durable',
      coordination: 'distributed',
      outbox: 'enabled',
    });
    expect(parsed.profiles['native-default']?.stores?.structured).not.toContain('sqlite');
    const serialized = JSON.stringify(parsed);
    expect(serialized).not.toMatch(/(m0sk_|ya29\.|-----BEGIN PRIVATE KEY-----)/);
    for (const profile of Object.values(parsed.profiles)) {
      for (const key of Object.keys(profile.management.config ?? {})) {
        if (/token|key/i.test(key)) expect(key).toMatch(/Env$/);
      }
    }
  });
});
