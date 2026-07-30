import {
  ExecutionResultCache,
  artifactRecordExample,
  canonicalizeExecutionFingerprintInput,
  executionCacheEntryProjectionExample,
  executionCacheValidityInputExample,
  executionCommandFingerprintInputExample,
  type ArtifactReadResult,
  type ExecutionCacheArtifactReference,
  type ExecutionCacheScope,
  type ExecutionPrincipal,
} from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import { ArtifactManagerExecutionCacheVerifier } from './artifact-manager-execution-cache-verifier';
import {
  InMemoryExecutionCacheStore,
  NodeExecutionFingerprintHasher,
} from './in-memory-execution-cache-store';

const scope: ExecutionCacheScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  workspaceId: 'workspace.example',
};

const principal: ExecutionPrincipal = {
  principalId: 'principal.example',
  type: 'user',
  tenantId: scope.tenantId,
  userId: scope.userId,
  permissionScopes: ['artifact:read'],
  metadata: { workspaceId: scope.workspaceId },
};

const artifact: ExecutionCacheArtifactReference = {
  artifactRef: artifactRecordExample.id,
  contentHash: artifactRecordExample.contentHash,
};

describe('ArtifactManagerExecutionCacheVerifier', () => {
  it('consumes and verifies a visible retained Artifact before allowing a cache hit', async () => {
    const bytes = new TextEncoder().encode('cached artifact');
    const read = readResult({
      sizeBytes: bytes.byteLength,
      content: streamOf(bytes),
    });
    const manager = { read: vi.fn(async () => read) };
    const verifier = createVerifier(manager);

    await expect(verifier.verify(scope, [artifact])).resolves.toBe(true);
    expect(manager.read).toHaveBeenCalledWith({
      principal,
      artifactId: artifact.artifactRef,
      expectedContentHash: artifact.contentHash,
    });
  });

  it.each([
    ['artifact id', { id: 'artifact.other' }],
    ['digest', { contentHash: 'sha256:different' }],
    ['user scope', { userId: 'user.other' }],
    ['workspace scope', { workspaceId: 'workspace.other' }],
    ['tenant scope', { tenantId: 'tenant.other' }],
    ['unfinalized status', { status: 'draft', finalizedAt: undefined }],
    ['invalidated status', { status: 'invalidated' }],
    ['unreferenced retention', { retention: { referencedByCount: 0 } }],
    [
      'expired retention',
      {
        expiresAt: '2026-07-29T00:00:00.000Z',
        retention: {
          referencedByCount: 1,
          expiresAt: '2026-07-29T00:00:00.000Z',
        },
      },
    ],
    [
      'inconsistent retention expiry',
      {
        expiresAt: '2026-08-01T00:00:00.000Z',
        retention: {
          referencedByCount: 1,
          expiresAt: '2026-08-02T00:00:00.000Z',
        },
      },
    ],
  ])('fails closed for %s', async (_name, recordPatch) => {
    const manager = {
      read: vi.fn(async () => readResult({ record: recordPatch })),
    };
    await expect(createVerifier(manager).verify(scope, [artifact])).resolves.toBe(false);
  });

  it.each([
    ['principal user', { userId: 'user.other' }],
    ['principal tenant', { tenantId: 'tenant.other' }],
  ])('rejects a resolver that changes the %s scope', async (_name, principalPatch) => {
    const verifier = createVerifier(
      { read: vi.fn(async () => readResult()) },
      { ...principal, ...principalPatch }
    );
    await expect(verifier.verify(scope, [artifact])).resolves.toBe(false);
  });

  it('fails closed on malformed Manager output, unavailable content, and byte-count drift', async () => {
    const malformed = createVerifier({
      read: vi.fn(async () => ({ record: {}, content: {} }) as ArtifactReadResult),
    });
    await expect(malformed.verify(scope, [artifact])).resolves.toBe(false);

    const unavailable = createVerifier({
      read: vi.fn(async () => {
        throw new Error('store unavailable');
      }),
    });
    await expect(unavailable.verify(scope, [artifact])).resolves.toBe(false);

    const truncated = createVerifier({
      read: vi.fn(async () =>
        readResult({
          sizeBytes: 10,
          content: streamOf(new Uint8Array([1])),
        })
      ),
    });
    await expect(truncated.verify(scope, [artifact])).resolves.toBe(false);
  });

  it('fails closed when verify-on-read rejects while the Artifact stream is consumed', async () => {
    const verifier = createVerifier({
      read: vi.fn(async () =>
        readResult({
          sizeBytes: 1,
          content: (async function* () {
            yield new Uint8Array([1]);
            throw new Error('digest changed');
          })(),
        })
      ),
    });
    await expect(verifier.verify(scope, [artifact])).resolves.toBe(false);
  });

  it('allows ExecutionResultCache to reuse only a freshly revalidated Artifact', async () => {
    const manager = { read: vi.fn(async () => readResult()) };
    const artifactVerifier = createVerifier(manager);
    const store = new InMemoryExecutionCacheStore();
    const hasher = new NodeExecutionFingerprintHasher();
    const cache = new ExecutionResultCache({ store, hasher, artifactVerifier, now: () => 1_000 });
    const commandHash = await hasher.hashUtf8(
      canonicalizeExecutionFingerprintInput(executionCommandFingerprintInputExample)
    );
    const validityHash = await hasher.hashUtf8(
      canonicalizeExecutionFingerprintInput(executionCacheValidityInputExample)
    );
    const input = {
      scope,
      command: executionCommandFingerprintInputExample,
      validity: executionCacheValidityInputExample,
      sideEffectLevel: 'read' as const,
      environmentFingerprintStatus: 'resolved' as const,
    };

    await expect(
      cache.write({
        ...input,
        projection: {
          ...executionCacheEntryProjectionExample,
          commandHash,
          validityHash,
          validity: executionCacheValidityInputExample,
          artifacts: [artifact],
          resultMetadata: {
            ...executionCacheEntryProjectionExample.resultMetadata,
            status: 'completed',
          },
        },
      })
    ).resolves.toBe(true);
    await expect(cache.lookup(input)).resolves.toMatchObject({ hit: true });
    expect(manager.read).toHaveBeenCalledTimes(1);
  });
});

function createVerifier(
  manager: { read: (request: unknown) => Promise<ArtifactReadResult> },
  resolvedPrincipal: ExecutionPrincipal = principal
): ArtifactManagerExecutionCacheVerifier {
  return new ArtifactManagerExecutionCacheVerifier({
    manager,
    resolvePrincipal: async () => resolvedPrincipal,
    now: () => '2026-07-30T00:00:00.000Z',
  });
}

function readResult(
  options: {
    record?: Record<string, unknown>;
    sizeBytes?: number;
    content?: AsyncIterable<Uint8Array>;
  } = {}
): ArtifactReadResult {
  const sizeBytes = options.sizeBytes ?? 0;
  return {
    record: {
      ...artifactRecordExample,
      tenantId: scope.tenantId,
      userId: scope.userId,
      workspaceId: scope.workspaceId,
      access: {
        ...artifactRecordExample.access,
        workspaceId: scope.workspaceId,
        ownerPrincipalId: principal.principalId,
      },
      retention: { referencedByCount: 1 },
      sizeBytes,
      ...options.record,
    },
    content: {
      stream: options.content ?? streamOf(new Uint8Array()),
      contentHash: artifact.contentHash,
      sizeBytes,
    },
  };
}

async function* streamOf(bytes: Uint8Array): AsyncIterable<Uint8Array> {
  if (bytes.byteLength > 0) yield bytes;
}
