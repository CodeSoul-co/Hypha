import type {
  RuntimeCheckpointPutResult,
  RuntimeCheckpointRecord,
  RuntimeCheckpointStore,
} from '../../contracts/runtime-checkpoint';
import { validateRuntimeCheckpointRecord } from '../../contracts/runtime-checkpoint-schemas';
import type { RuntimeScope } from '../../contracts/runtime';
import { validateRuntimeScope } from '../../contracts/runtime-schemas';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import { eventStreamKey } from './event-store';

interface CheckpointIdempotencyRecord {
  requestHash: string;
  result: RuntimeCheckpointPutResult;
}

export class InMemoryRuntimeCheckpointStore implements RuntimeCheckpointStore {
  private readonly records = new Map<string, RuntimeCheckpointRecord>();
  private readonly byScope = new Map<string, string[]>();
  private readonly idempotency = new Map<string, CheckpointIdempotencyRecord>();
  private writeBarrier = Promise.resolve();

  async put(
    input: RuntimeCheckpointRecord,
    idempotencyKey: string
  ): Promise<RuntimeCheckpointPutResult> {
    const record = validateRuntimeCheckpointRecord(input);
    verifyRuntimeCheckpointChecksum(record);
    if (!idempotencyKey.trim()) invalid('Checkpoint idempotencyKey is required');
    const snapshot = structuredClone(record);
    const previousWrite = this.writeBarrier;
    let releaseWrite = (): void => undefined;
    this.writeBarrier = new Promise<void>((resolve) => {
      releaseWrite = resolve;
    });
    await previousWrite;
    try {
      return this.putExclusive(snapshot, idempotencyKey);
    } finally {
      releaseWrite();
    }
  }

  async get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null> {
    const validatedScope = validateRuntimeScope(scope);
    if (!checkpointId.trim()) invalid('checkpointId is required');
    const record = this.records.get(checkpointKey(validatedScope, checkpointId));
    return record ? structuredClone(record) : null;
  }

  async latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null> {
    const records = await this.list(scope, 1);
    return records[0] ?? null;
  }

  async list(scope: RuntimeScope, limit = 100): Promise<RuntimeCheckpointRecord[]> {
    const validatedScope = validateRuntimeScope(scope);
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
      invalid('Checkpoint list limit must be between 1 and 1000');
    }
    const ids = this.byScope.get(checkpointScopeKey(validatedScope)) ?? [];
    return ids
      .slice(-limit)
      .reverse()
      .map((id) => this.records.get(checkpointKey(validatedScope, id)))
      .filter((record): record is RuntimeCheckpointRecord => record !== undefined)
      .map((record) => structuredClone(record));
  }

  private putExclusive(
    record: RuntimeCheckpointRecord,
    idempotencyKey: string
  ): RuntimeCheckpointPutResult {
    const scopeKey = checkpointScopeKey(record.scope);
    const idempotencyRecordKey = `${scopeKey}\u0000${idempotencyKey}`;
    const requestHash = hashCanonicalJson(record);
    const prior = this.idempotency.get(idempotencyRecordKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        conflict('Checkpoint idempotency key was reused with different input', record);
      }
      return structuredClone({ ...prior.result, reused: true });
    }
    const key = checkpointKey(record.scope, record.id);
    if (this.records.has(key)) {
      conflict('Checkpoint id was already used', record);
    }
    const ids = this.byScope.get(scopeKey) ?? [];
    const latestId = ids.at(-1);
    const latest = latestId ? this.records.get(checkpointKey(record.scope, latestId)) : undefined;
    const expectedSequence = (latest?.sequence ?? 0) + 1;
    if (record.sequence !== expectedSequence) {
      conflict('Checkpoint sequence must advance by one', record, {
        expectedSequence,
        actualSequence: record.sequence,
      });
    }
    if (latest && record.lastEventSequence < latest.lastEventSequence) {
      conflict('Checkpoint Event sequence cannot move backwards', record, {
        previousLastEventSequence: latest.lastEventSequence,
      });
    }
    this.records.set(key, structuredClone(record));
    this.byScope.set(scopeKey, [...ids, record.id]);
    const result = { record: structuredClone(record), reused: false };
    this.idempotency.set(idempotencyRecordKey, { requestHash, result });
    return structuredClone(result);
  }
}

export function runtimeCheckpointChecksum(
  record: Omit<RuntimeCheckpointRecord, 'checksum'> | RuntimeCheckpointRecord
): string {
  const { checksum, ...content } = record as RuntimeCheckpointRecord;
  void checksum;
  return hashCanonicalJson(content);
}

export function verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void {
  if (runtimeCheckpointChecksum(record) !== record.checksum) {
    throw new FrameworkError({
      code: 'RUNTIME_CHECKPOINT_FAILED',
      message: 'Checkpoint checksum does not match its content',
      context: { checkpointId: record.id, runId: record.scope.runId },
    });
  }
}

function checkpointScopeKey(scope: RuntimeScope): string {
  return eventStreamKey({
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
  });
}

function checkpointKey(scope: RuntimeScope, checkpointId: string): string {
  return `${checkpointScopeKey(scope)}\u0000${checkpointId}`;
}

function conflict(
  message: string,
  record: RuntimeCheckpointRecord,
  context: Record<string, unknown> = {}
): never {
  throw new FrameworkError({
    code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    message,
    context: { checkpointId: record.id, runId: record.scope.runId, ...context },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
