import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { canonicalMemoryRuntimeConfigSchema } from './canonical-runtime-config';

describe('Hindsight Local candidate profile', () => {
  it('is schema-valid, disabled, credential-free and pinned by tag plus OCI digest', () => {
    const path = resolve(
      process.cwd(),
      'configs/memory/hindsight-local/memory-profile.candidate.yaml'
    );
    const parsed = canonicalMemoryRuntimeConfigSchema.parse(parse(readFileSync(path, 'utf8')));
    const entry = parsed.profiles['memorybank-hindsight-local'];

    expect(entry.profile.enabled).toBe(false);
    expect(entry.management).toMatchObject({
      id: 'memory.provider.memorybank.hindsight-local',
      type: 'memorybank',
      deployment: 'self_hosted',
      connectionRef: 'memory.connection.hindsight-local',
      config: {
        protocol: 'hindsight-http-v0.8',
        expectedApiVersion: '0.8',
        mappingStoreRef: 'memory.mapping.durable',
        operationStoreRef: 'memory.operation.durable',
      },
      metadata: {
        imageTag: '0.8.5',
        imageDigest: 'sha256:0710076cd1539b4f89537d2e5b0ea1e4d179885bc12809a56cf748c538c8c4fb',
      },
    });
    expect(JSON.stringify(parsed)).not.toMatch(/api[_-]?key|bearerToken|password/i);
  });
});
