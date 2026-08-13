import type {
  ArtifactManager,
  ExecutionCacheArtifactReference,
  ExecutionCacheArtifactVerifier,
  ExecutionCacheScope,
  ExecutionPrincipal,
} from '@codesoul-co/hypha-core';
import {
  artifactReadResultSchema,
  executionCacheArtifactReferenceSchema,
  validateExecutionCacheScope,
  validateExecutionPrincipal,
} from '@codesoul-co/hypha-core';

export interface ArtifactManagerExecutionCacheVerifierOptions {
  manager: Pick<ArtifactManager, 'read'>;
  resolvePrincipal(scope: ExecutionCacheScope): ExecutionPrincipal | Promise<ExecutionPrincipal>;
  now?: () => string;
}

/**
 * Revalidates every cached Artifact through the governed ArtifactManager before
 * an Execution cache hit is reused. Reading the complete stream deliberately
 * completes the Store's verify-on-read digest and immutable-version checks.
 */
export class ArtifactManagerExecutionCacheVerifier implements ExecutionCacheArtifactVerifier {
  private readonly manager: Pick<ArtifactManager, 'read'>;
  private readonly resolvePrincipal: ArtifactManagerExecutionCacheVerifierOptions['resolvePrincipal'];
  private readonly now: () => string;

  constructor(options: ArtifactManagerExecutionCacheVerifierOptions) {
    this.manager = options.manager;
    this.resolvePrincipal = options.resolvePrincipal;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async verify(
    rawScope: ExecutionCacheScope,
    rawArtifacts: ExecutionCacheArtifactReference[]
  ): Promise<boolean> {
    try {
      const scope = validateExecutionCacheScope(rawScope);
      const artifacts = rawArtifacts.map((artifact) =>
        executionCacheArtifactReferenceSchema.parse(artifact)
      );
      const principal = validateExecutionPrincipal(await this.resolvePrincipal(scope));
      if (!principalMatchesScope(principal, scope)) return false;

      const evaluatedAt = Date.parse(this.now());
      if (!Number.isFinite(evaluatedAt)) return false;

      for (const artifact of artifacts) {
        const read = artifactReadResultSchema.parse(
          await this.manager.read({
            principal,
            artifactId: artifact.artifactRef,
            expectedContentHash: artifact.contentHash,
          })
        );
        if (!recordMatchesCacheReference(read.record, artifact, scope, evaluatedAt)) {
          return false;
        }
        if (
          read.content.contentHash !== artifact.contentHash ||
          read.content.sizeBytes !== read.record.sizeBytes
        ) {
          return false;
        }
        if ((await consumeArtifactStream(read.content.stream)) !== read.record.sizeBytes) {
          return false;
        }
      }
      return true;
    } catch {
      // Cache reuse is an optimization. Any identity, policy, Store, or schema
      // uncertainty must fail closed as a cache miss.
      return false;
    }
  }
}

function principalMatchesScope(principal: ExecutionPrincipal, scope: ExecutionCacheScope): boolean {
  return principal.userId === scope.userId && principal.tenantId === scope.tenantId;
}

function recordMatchesCacheReference(
  record: ReturnType<typeof artifactReadResultSchema.parse>['record'],
  artifact: ExecutionCacheArtifactReference,
  scope: ExecutionCacheScope,
  evaluatedAt: number
): boolean {
  if (
    record.id !== artifact.artifactRef ||
    record.contentHash !== artifact.contentHash ||
    record.userId !== scope.userId ||
    record.workspaceId !== scope.workspaceId ||
    record.tenantId !== scope.tenantId
  ) {
    return false;
  }
  if (record.status !== 'final' && record.status !== 'archived') return false;
  if ((record.retention.referencedByCount ?? 0) <= 0) return false;

  const recordExpiry = record.expiresAt;
  const retentionExpiry = record.retention.expiresAt;
  if (recordExpiry && retentionExpiry && recordExpiry !== retentionExpiry) return false;
  const expiresAt = recordExpiry ?? retentionExpiry;
  return expiresAt === undefined || Date.parse(expiresAt) > evaluatedAt;
}

async function consumeArtifactStream(stream: AsyncIterable<Uint8Array>): Promise<number> {
  let sizeBytes = 0;
  for await (const chunk of stream) {
    if (!(chunk instanceof Uint8Array))
      throw new TypeError('Artifact stream yielded invalid data.');
    sizeBytes += chunk.byteLength;
    if (!Number.isSafeInteger(sizeBytes)) throw new RangeError('Artifact stream size overflowed.');
  }
  return sizeBytes;
}
