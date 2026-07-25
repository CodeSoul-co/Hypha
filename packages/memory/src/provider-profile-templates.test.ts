import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { canonicalMemoryRuntimeConfigSchema } from './canonical-runtime-config';

describe('public memory provider profile templates', () => {
  it('ships canonical profiles with evidence-aligned status and no inline credentials', () => {
    const path = resolve(process.cwd(), 'configs/memory-profiles.yaml');
    const parsed = canonicalMemoryRuntimeConfigSchema.parse(parse(readFileSync(path, 'utf8')));

    expect(parsed.activeProfile).toBe('native-default');
    expect(Object.keys(parsed.profiles).sort()).toEqual([
      'mem0-oss',
      'mem0-platform',
      'memorybank-managed',
      'native-default',
      'native-lite',
    ]);
    expect(parsed.profiles).not.toHaveProperty('memorybank-local');
    expect(parsed.profiles['native-lite']?.profile.metadata).toMatchObject({
      releaseStatus: 'framework-validated',
      topology: 'single-process',
    });
    expect(parsed.profiles['native-default']?.profile.metadata).toMatchObject({
      releaseStatus: 'framework-validated-non-ha',
      topology: 'distributed-contract',
      highAvailability: 'unpublished',
    });
    expect(parsed.profiles['mem0-oss']?.profile.metadata).toMatchObject({
      releaseStatus: 'contract-validated',
    });
    expect(parsed.profiles['mem0-platform']?.profile.metadata).toMatchObject({
      releaseStatus: 'controlled-test',
    });
    expect(parsed.profiles['memorybank-managed']?.profile.metadata).toMatchObject({
      releaseStatus: 'controlled-test',
    });
    expect(parsed.profiles['native-lite']?.profile).toMatchObject({
      workingStoreRef: { id: 'memory.store.working.in-memory' },
      recordStoreRef: { id: 'memory.store.record.sqlite' },
      vectorStoreRefs: [{ id: 'memory.vector.local' }],
      artifactStoreRef: { id: 'memory.artifact.local' },
    });
    expect(parsed.profiles['native-default']?.profile).toMatchObject({
      workingStoreRef: { id: 'memory.store.working.redis' },
      recordStoreRef: { id: 'memory.store.record.mongodb' },
      vectorStoreRefs: [{ id: 'memory.vector.local' }],
      artifactStoreRef: { id: 'memory.artifact.local' },
    });

    const serialized = JSON.stringify(parsed);
    expect(serialized).not.toMatch(/(m0sk_|ya29\.|-----BEGIN PRIVATE KEY-----)/);
    for (const runtime of Object.values(parsed.profiles)) {
      for (const [key, value] of Object.entries(runtime.management.config ?? {})) {
        if (/token|key|credential/i.test(key)) {
          expect(key).toMatch(/(?:Env|Ref)$/);
          if (key.endsWith('Env')) expect(value).toMatch(/^[A-Z][A-Z0-9_]+$/);
          if (key.endsWith('Ref')) expect(value).toMatch(/^(?:secret|env|vault|credential):/);
        }
      }
    }
  });
});
