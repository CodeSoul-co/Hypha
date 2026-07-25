import { describe, expect, it } from 'vitest';
import { createHash } from 'crypto';
import type {
  ExecutionCacheRecord,
  ExecutionCacheStore,
  ExecutionFingerprintHasher,
} from '../../contracts/execution-cache';
import {
  assessExecutionCacheReuse,
  canonicalizeExecutionFingerprintInput,
  ExecutionResultCache,
  executionCacheEntryProjectionExample,
  executionCacheJsonSchemas,
  executionCacheValidityInputExample,
  executionCommandFingerprintInputExample,
  executionEnvironmentFingerprintExample,
  validateExecutionCacheEntryProjection,
  validateExecutionCacheRecord,
  validateExecutionCacheValidityInput,
  validateExecutionCommandFingerprintInput,
  validateExecutionEnvironmentFingerprint,
  validateExecutionEnvironmentFingerprintResolution,
} from './index';

describe('Execution Cache boundary contracts', () => {
  it('validates the engineering-spec fixtures', () => {
    expect(validateExecutionCacheValidityInput(executionCacheValidityInputExample)).toEqual(
      executionCacheValidityInputExample
    );
    expect(validateExecutionEnvironmentFingerprint(executionEnvironmentFingerprintExample)).toEqual(
      executionEnvironmentFingerprintExample
    );
    expect(
      validateExecutionCommandFingerprintInput(executionCommandFingerprintInputExample)
    ).toEqual(executionCommandFingerprintInputExample);
    expect(validateExecutionCacheEntryProjection(executionCacheEntryProjectionExample)).toEqual(
      executionCacheEntryProjectionExample
    );
  });

  it('exports JSON Schemas for every Cache boundary object', () => {
    expect(Object.keys(executionCacheJsonSchemas)).toEqual(
      expect.arrayContaining([
        'ExecutionCacheValidityInput',
        'ExecutionEnvironmentFingerprint',
        'ExecutionEnvironmentFingerprintResolution',
        'ExecutionCommandFingerprintInput',
        'ExecutionCacheArtifactReference',
        'ExecutionCacheResultMetadata',
        'ExecutionCacheEntryProjection',
        'ExecutionCacheScope',
        'ExecutionCacheRecord',
      ])
    );
    expect(executionCacheJsonSchemas.ExecutionCacheEntryProjection.required).toContain('validity');
  });

  it('rejects unqualified hashes and missing validity inputs', () => {
    expect(() =>
      validateExecutionCacheValidityInput({
        ...executionCacheValidityInputExample,
        argsHash: 'not-qualified',
      })
    ).toThrow(/algorithm-qualified/u);
    const { networkPolicyHash: _networkPolicyHash, ...missingNetworkPolicy } =
      executionCacheValidityInputExample;
    expect(() => validateExecutionCacheValidityInput(missingNetworkPolicy)).toThrow();
  });

  it('fails closed when an environment cannot be proven stable', () => {
    const { imageDigest: _imageDigest, ...withoutImage } = executionEnvironmentFingerprintExample;
    expect(() =>
      validateExecutionEnvironmentFingerprint({
        ...withoutImage,
        platform: undefined,
        executableVersions: undefined,
      })
    ).toThrow(/image digest/u);
    expect(
      validateExecutionEnvironmentFingerprintResolution({
        status: 'unavailable',
        reason: 'Provider could not detect executable versions',
      })
    ).toEqual({
      status: 'unavailable',
      reason: 'Provider could not detect executable versions',
    });
    expect(() =>
      validateExecutionEnvironmentFingerprintResolution({ status: 'unavailable', reason: '' })
    ).toThrow();
  });

  it('rejects raw environment and Secret fields at the fingerprint boundary', () => {
    expect(() =>
      validateExecutionCommandFingerprintInput({
        ...executionCommandFingerprintInputExample,
        env: { TOKEN: 'plaintext' },
      })
    ).toThrow(/Unrecognized key/u);
    expect(() =>
      validateExecutionCommandFingerprintInput({
        ...executionCommandFingerprintInputExample,
        secretValues: ['plaintext'],
      })
    ).toThrow(/Unrecognized key/u);
  });

  it('keeps Cache projections bounded to metadata, references, and hashes', () => {
    expect(() =>
      validateExecutionCacheEntryProjection({
        ...executionCacheEntryProjectionExample,
        stdout: 'large output',
      })
    ).toThrow(/Unrecognized key/u);
    expect(() =>
      validateExecutionCacheEntryProjection({
        ...executionCacheEntryProjectionExample,
        artifacts: [
          ...executionCacheEntryProjectionExample.artifacts,
          executionCacheEntryProjectionExample.artifacts[0],
        ],
      })
    ).toThrow(/duplicate/u);
  });

  it('measures serialized records instead of trusting declared size metadata', () => {
    expect(() =>
      validateExecutionCacheRecord(
        {
          schemaVersion: '1.0',
          keyVersion: '1',
          key: 'execution-cache:v1:sha256:example',
          scope: { userId: 'owner', workspaceId: 'workspace_01' },
          projection: executionCacheEntryProjectionExample,
          createdAt: 1,
          expiresAt: 2,
          sizeBytes: 1,
        },
        100
      )
    ).toThrow(/limit is 100 bytes/u);
  });

  it('canonicalizes key order while preserving argument identity through its hash', () => {
    const reversed = {
      idempotencyKey: executionCommandFingerprintInputExample.idempotencyKey,
      secretVersionSetHash: executionCommandFingerprintInputExample.secretVersionSetHash,
      networkPolicyHash: executionCommandFingerprintInputExample.networkPolicyHash,
      environmentHash: executionCommandFingerprintInputExample.environmentHash,
      sourceTreeHash: executionCommandFingerprintInputExample.sourceTreeHash,
      relevantEnvHash: executionCommandFingerprintInputExample.relevantEnvHash,
      cwd: executionCommandFingerprintInputExample.cwd,
      argsHash: executionCommandFingerprintInputExample.argsHash,
      executable: executionCommandFingerprintInputExample.executable,
    };
    expect(canonicalizeExecutionFingerprintInput(reversed)).toBe(
      canonicalizeExecutionFingerprintInput(executionCommandFingerprintInputExample)
    );
  });

  it('blocks Result Cache reuse for unstable environments and external effects', () => {
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'none',
        environmentFingerprintStatus: 'resolved',
      })
    ).toEqual({ reusable: true });
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'write',
        environmentFingerprintStatus: 'unavailable',
      })
    ).toEqual({ reusable: false, reason: 'environment_fingerprint_unavailable' });
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'write',
        environmentFingerprintStatus: 'resolved',
      })
    ).toEqual({ reusable: false, reason: 'workspace_write' });
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'external_effect',
        environmentFingerprintStatus: 'resolved',
      })
    ).toEqual({ reusable: false, reason: 'external_side_effect' });
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'irreversible',
        environmentFingerprintStatus: 'resolved',
      })
    ).toEqual({ reusable: false, reason: 'irreversible_side_effect' });
  });

  it('stores and reuses only matching scoped, read-only projections', async () => {
    const store = new TestExecutionCacheStore();
    const cache = new ExecutionResultCache({ store, hasher, now: () => 1000 });
    const input = cacheInput();
    const projection = await projectionFor(input.command, input.validity);

    await expect(cache.write({ ...input, projection })).resolves.toBe(true);
    await expect(cache.lookup(input)).resolves.toMatchObject({
      hit: true,
      projection: { resultMetadata: { status: 'completed' } },
    });
    await expect(
      cache.lookup({ ...input, scope: { userId: 'other', workspaceId: 'workspace_01' } })
    ).resolves.toMatchObject({ hit: false, reason: 'not_found' });
  });

  it('never caches Workspace writes or non-completed command results', async () => {
    const cache = new ExecutionResultCache({
      store: new TestExecutionCacheStore(),
      hasher,
    });
    const input = cacheInput();
    const projection = await projectionFor(input.command, input.validity);

    await expect(cache.write({ ...input, sideEffectLevel: 'write', projection })).resolves.toBe(
      false
    );
    await expect(
      cache.write({
        ...input,
        projection: {
          ...projection,
          resultMetadata: { ...projection.resultMetadata, status: 'failed' },
        },
      })
    ).resolves.toBe(false);
  });

  it('fails closed on Artifact references unless their integrity can be verified', async () => {
    const store = new TestExecutionCacheStore();
    const input = cacheInput();
    const projection = await projectionFor(input.command, input.validity, [
      { artifactRef: 'artifact:stdout', contentHash: 'sha256:stdout' },
    ]);
    const writer = new ExecutionResultCache({
      store,
      hasher,
      artifactVerifier: { verify: async () => true },
    });
    expect(await writer.write({ ...input, projection })).toBe(true);

    const unverified = new ExecutionResultCache({ store, hasher });
    await expect(unverified.lookup(input)).resolves.toMatchObject({
      hit: false,
      reason: 'artifact_verification_unavailable',
    });
    const rejected = new ExecutionResultCache({
      store,
      hasher,
      artifactVerifier: { verify: async () => false },
    });
    await expect(rejected.lookup(input)).resolves.toMatchObject({
      hit: false,
      reason: 'artifact_verification_failed',
    });
    expect(store.records.size).toBe(0);
  });

  it('bounds Store waits and preserves strict-mode diagnostics', async () => {
    const hangingStore: ExecutionCacheStore = {
      get: async () => new Promise<ExecutionCacheRecord | null>(() => undefined),
      set: async () => new Promise<void>(() => undefined),
      delete: async () => undefined,
    };
    const bypass = new ExecutionResultCache({
      store: hangingStore,
      hasher,
      operationTimeoutMs: 5,
    });
    await expect(bypass.lookup(cacheInput())).resolves.toMatchObject({
      hit: false,
      reason: 'store_unavailable',
    });

    const strict = new ExecutionResultCache({
      store: hangingStore,
      hasher,
      operationTimeoutMs: 5,
      failureMode: 'strict',
    });
    await expect(strict.lookup(cacheInput())).rejects.toThrow(/exceeded 5ms/u);
  });
});

const hasher: ExecutionFingerprintHasher = {
  algorithm: 'sha256',
  async hashUtf8(value) {
    return `sha256:${createHash('sha256').update(value).digest('hex')}`;
  },
};

function cacheInput() {
  return {
    scope: { userId: 'owner', workspaceId: 'workspace_01' },
    command: executionCommandFingerprintInputExample,
    validity: executionCacheValidityInputExample,
    sideEffectLevel: 'read' as const,
    environmentFingerprintStatus: 'resolved' as const,
  };
}

async function projectionFor(
  command: typeof executionCommandFingerprintInputExample,
  validity: typeof executionCacheValidityInputExample,
  artifacts = executionCacheEntryProjectionExample.artifacts.slice(0, 0)
) {
  return {
    ...executionCacheEntryProjectionExample,
    commandHash: await hasher.hashUtf8(canonicalizeExecutionFingerprintInput(command)),
    validityHash: await hasher.hashUtf8(canonicalizeExecutionFingerprintInput(validity)),
    validity,
    artifacts,
    resultMetadata: {
      ...executionCacheEntryProjectionExample.resultMetadata,
      status: 'completed' as const,
    },
  };
}

class TestExecutionCacheStore implements ExecutionCacheStore {
  readonly records = new Map<string, ExecutionCacheRecord>();

  async get(key: string): Promise<ExecutionCacheRecord | null> {
    return this.records.get(key) ?? null;
  }

  async set(key: string, record: ExecutionCacheRecord): Promise<void> {
    this.records.set(key, record);
  }

  async delete(key: string): Promise<void> {
    this.records.delete(key);
  }
}
