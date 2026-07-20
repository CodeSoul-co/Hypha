import type {
  ExecutionCacheArtifactVerifier,
  ExecutionCacheEvent,
  ExecutionCacheFailureMode,
  ExecutionCacheLookupInput,
  ExecutionCacheLookupResult,
  ExecutionCacheMissReason,
  ExecutionCacheRecord,
  ExecutionCacheScope,
  ExecutionCacheStore,
  ExecutionCacheWriteInput,
  ExecutionFingerprintHasher,
} from '../../contracts/execution-cache';
import {
  assessExecutionCacheReuse,
  canonicalizeExecutionFingerprintInput,
  validateExecutionCacheEntryProjection,
  validateExecutionCacheRecord,
  validateExecutionCacheScope,
  validateExecutionCacheValidityInput,
  validateExecutionCommandFingerprintInput,
} from './index';

export interface ExecutionResultCacheOptions {
  store: ExecutionCacheStore;
  hasher: ExecutionFingerprintHasher;
  artifactVerifier?: ExecutionCacheArtifactVerifier;
  failureMode?: ExecutionCacheFailureMode;
  operationTimeoutMs?: number;
  ttlMs?: number;
  maxEntryBytes?: number;
  now?: () => number;
  trace?: (event: ExecutionCacheEvent) => Promise<void> | void;
}

interface ExecutionCacheIdentity {
  key: string;
  commandHash: string;
  validityHash: string;
}

/**
 * Conservative Result Cache for deterministic, read-only command executions.
 * It returns an Execution-owned projection and never fabricates a new receipt,
 * mutates a Workspace, or treats a hit as an executed side effect.
 */
export class ExecutionResultCache {
  private readonly failureMode: ExecutionCacheFailureMode;
  private readonly operationTimeoutMs: number;
  private readonly ttlMs: number;
  private readonly maxEntryBytes: number;
  private readonly now: () => number;

  constructor(private readonly options: ExecutionResultCacheOptions) {
    this.failureMode = options.failureMode ?? 'bypass';
    this.operationTimeoutMs = positiveInteger(
      options.operationTimeoutMs ?? 500,
      'operationTimeoutMs'
    );
    this.ttlMs = positiveInteger(options.ttlMs ?? 1000 * 60 * 60 * 6, 'ttlMs');
    this.maxEntryBytes = positiveInteger(options.maxEntryBytes ?? 1024 * 1024, 'maxEntryBytes');
    this.now = options.now ?? Date.now;
  }

  async lookup(rawInput: ExecutionCacheLookupInput): Promise<ExecutionCacheLookupResult> {
    let scope: ExecutionCacheScope;
    try {
      scope = validateExecutionCacheScope(rawInput.scope);
      const input = validateLookupInput(rawInput, scope);
      const blocked = reuseBlockReason(input);
      if (blocked) return this.miss(scope, blocked, undefined, 'execution.cache.bypass');

      const identity = await this.identity(input);
      await this.emit({ type: 'execution.cache.lookup', key: identity.key, scope });
      const rawRecord = await this.storeOperation('get', this.options.store.get(identity.key));
      if (!rawRecord) return this.miss(scope, 'not_found', identity.key);

      let record: ExecutionCacheRecord;
      try {
        record = validateExecutionCacheRecord(rawRecord);
      } catch {
        await this.safeDelete(identity.key);
        return this.miss(scope, 'corrupt', identity.key, 'execution.cache.invalidate');
      }
      if (record.key !== identity.key) {
        await this.safeDelete(identity.key);
        return this.miss(scope, 'key_mismatch', identity.key, 'execution.cache.invalidate');
      }
      if (!sameScope(record.scope, scope)) {
        await this.safeDelete(identity.key);
        return this.miss(scope, 'scope_mismatch', identity.key, 'execution.cache.invalidate');
      }
      if (record.expiresAt !== undefined && record.expiresAt <= this.now()) {
        await this.safeDelete(identity.key);
        return this.miss(scope, 'expired', identity.key, 'execution.cache.invalidate');
      }
      if (
        record.projection.commandHash !== identity.commandHash ||
        record.projection.validityHash !== identity.validityHash
      ) {
        await this.safeDelete(identity.key);
        return this.miss(scope, 'validity_changed', identity.key, 'execution.cache.invalidate');
      }
      if (record.projection.resultMetadata.status !== 'completed') {
        await this.safeDelete(identity.key);
        return this.miss(scope, 'not_cacheable_status', identity.key, 'execution.cache.invalidate');
      }
      if (record.projection.artifacts.length > 0 && !this.options.artifactVerifier) {
        return this.miss(scope, 'artifact_verification_unavailable', identity.key);
      }
      if (
        this.options.artifactVerifier &&
        !(await this.storeOperation(
          'verifyArtifacts',
          this.options.artifactVerifier.verify(scope, record.projection.artifacts)
        ))
      ) {
        await this.safeDelete(identity.key);
        return this.miss(
          scope,
          'artifact_verification_failed',
          identity.key,
          'execution.cache.invalidate'
        );
      }

      const ageMs = Math.max(0, this.now() - record.createdAt);
      await this.emit({ type: 'execution.cache.hit', key: identity.key, scope, ageMs });
      return {
        hit: true,
        key: identity.key,
        projection: clone(record.projection),
        ageMs,
      };
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
      const fallbackScope = safeScope(rawInput.scope);
      return this.miss(fallbackScope, 'store_unavailable', undefined, 'execution.cache.bypass');
    }
  }

  async write(rawInput: ExecutionCacheWriteInput): Promise<boolean> {
    let scope: ExecutionCacheScope;
    try {
      scope = validateExecutionCacheScope(rawInput.scope);
      const input = validateLookupInput(rawInput, scope);
      const blocked = reuseBlockReason(input);
      if (blocked) {
        await this.miss(scope, blocked, undefined, 'execution.cache.bypass');
        return false;
      }
      const projection = validateExecutionCacheEntryProjection(rawInput.projection);
      if (projection.resultMetadata.status !== 'completed') {
        await this.miss(scope, 'not_cacheable_status', undefined, 'execution.cache.bypass');
        return false;
      }
      const identity = await this.identity(input);
      if (
        projection.commandHash !== identity.commandHash ||
        projection.validityHash !== identity.validityHash
      ) {
        await this.miss(scope, 'validity_changed', identity.key, 'execution.cache.bypass');
        return false;
      }
      const createdAt = this.now();
      const record: ExecutionCacheRecord = {
        schemaVersion: '1.0',
        keyVersion: '1',
        key: identity.key,
        scope,
        projection,
        createdAt,
        expiresAt: createdAt + positiveInteger(rawInput.ttlMs ?? this.ttlMs, 'ttlMs'),
      };
      const serialized = JSON.stringify(record);
      const sizeBytes = Buffer.byteLength(serialized, 'utf8');
      if (sizeBytes > this.maxEntryBytes) {
        await this.miss(scope, 'entry_oversized', identity.key, 'execution.cache.bypass');
        return false;
      }
      const persisted = validateExecutionCacheRecord({ ...record, sizeBytes });
      await this.storeOperation('set', this.options.store.set(identity.key, persisted));
      await this.emit({ type: 'execution.cache.write', key: identity.key, scope });
      return true;
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
      await this.miss(
        safeScope(rawInput.scope),
        'store_unavailable',
        undefined,
        'execution.cache.bypass'
      );
      return false;
    }
  }

  async invalidate(rawInput: ExecutionCacheLookupInput): Promise<boolean> {
    try {
      const scope = validateExecutionCacheScope(rawInput.scope);
      const input = validateLookupInput(rawInput, scope);
      const identity = await this.identity(input);
      await this.storeOperation('delete', this.options.store.delete(identity.key));
      await this.emit({ type: 'execution.cache.invalidate', key: identity.key, scope });
      return true;
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
      await this.miss(
        safeScope(rawInput.scope),
        'store_unavailable',
        undefined,
        'execution.cache.bypass'
      );
      return false;
    }
  }

  async close(): Promise<void> {
    if (!this.options.store.close) return;
    try {
      await this.storeOperation('close', this.options.store.close());
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
    }
  }

  private async identity(input: ExecutionCacheLookupInput): Promise<ExecutionCacheIdentity> {
    const [commandHash, validityHash] = await Promise.all([
      this.options.hasher.hashUtf8(canonicalizeExecutionFingerprintInput(input.command)),
      this.options.hasher.hashUtf8(canonicalizeExecutionFingerprintInput(input.validity)),
    ]);
    const keyHash = await this.options.hasher.hashUtf8(
      JSON.stringify({
        schemaVersion: '1',
        scope: orderedScope(input.scope),
        commandHash,
      })
    );
    return { key: `execution-cache:v1:${keyHash}`, commandHash, validityHash };
  }

  private async safeDelete(key: string): Promise<void> {
    try {
      await this.storeOperation('delete', this.options.store.delete(key));
    } catch (error) {
      if (this.failureMode === 'strict') throw error;
    }
  }

  private async storeOperation<T>(operation: string, promise: Promise<T>): Promise<T> {
    return withTimeout(promise, this.operationTimeoutMs, operation);
  }

  private async miss(
    scope: ExecutionCacheScope,
    reason: ExecutionCacheMissReason,
    key?: string,
    type: ExecutionCacheEvent['type'] = 'execution.cache.miss'
  ): Promise<ExecutionCacheLookupResult> {
    await this.emit({ type, key, scope, reason });
    return { hit: false, reason, ...(key ? { key } : {}) };
  }

  private async emit(event: ExecutionCacheEvent): Promise<void> {
    try {
      await this.options.trace?.(event);
    } catch {
      // Cache observability is optional and cannot change Execution behavior.
    }
  }
}

function validateLookupInput(
  input: ExecutionCacheLookupInput,
  scope: ExecutionCacheScope
): ExecutionCacheLookupInput {
  return {
    scope,
    command: validateExecutionCommandFingerprintInput(input.command),
    validity: validateExecutionCacheValidityInput(input.validity),
    sideEffectLevel: input.sideEffectLevel,
    environmentFingerprintStatus: input.environmentFingerprintStatus,
  };
}

function reuseBlockReason(input: ExecutionCacheLookupInput): ExecutionCacheMissReason | null {
  const assessment = assessExecutionCacheReuse({
    sideEffectLevel: input.sideEffectLevel,
    environmentFingerprintStatus: input.environmentFingerprintStatus,
  });
  return assessment.reusable ? null : assessment.reason;
}

function sameScope(left: ExecutionCacheScope, right: ExecutionCacheScope): boolean {
  return JSON.stringify(orderedScope(left)) === JSON.stringify(orderedScope(right));
}

function orderedScope(scope: ExecutionCacheScope): Record<string, string | undefined> {
  return {
    tenantId: scope.tenantId,
    userId: scope.userId,
    workspaceId: scope.workspaceId,
  };
}

function safeScope(value: unknown): ExecutionCacheScope {
  try {
    return validateExecutionCacheScope(value);
  } catch {
    return { userId: 'invalid-scope', workspaceId: 'invalid-scope' };
  }
}

function positiveInteger(value: number, field: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive integer.`);
  }
  return value;
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  operation: string
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error(`Execution Cache ${operation} exceeded ${timeoutMs}ms.`)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
