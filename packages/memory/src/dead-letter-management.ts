import type { MemoryLifecycleTask, MemoryLifecycleWorkerType } from './lifecycle-workers';
import type { NormalizedMemoryError } from './contracts';
import { memoryError, sha256 } from './memory-utils';

export type MemoryDeadLetterState = 'dead_letter' | 'replay_queued' | 'discarded';
export interface MemoryDeadLetterRecord {
  id: string;
  taskId: string;
  operationId: string;
  workerType: MemoryLifecycleWorkerType;
  scopeHash: string;
  state: MemoryDeadLetterState;
  attempts: number;
  failure: NormalizedMemoryError;
  failureFingerprint: string;
  payload: unknown;
  idempotencyKey?: string;
  createdAt: string;
  updatedAt: string;
  disposition?: { actorId: string; reason: string; occurredAt: string };
}
export interface MemoryDeadLetterQuery {
  workerType?: MemoryLifecycleWorkerType;
  scopeHash?: string;
  state?: MemoryDeadLetterState;
  failureFingerprint?: string;
}
export interface MemoryDeadLetterRepository {
  get(id: string): Promise<MemoryDeadLetterRecord | null>;
  list(query?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]>;
  set(record: MemoryDeadLetterRecord): Promise<void>;
}
export class InMemoryMemoryDeadLetterRepository implements MemoryDeadLetterRepository {
  private readonly values = new Map<string, MemoryDeadLetterRecord>();
  async get(id: string): Promise<MemoryDeadLetterRecord | null> {
    const value = this.values.get(id);
    return value ? structuredClone(value) : null;
  }
  async list(query: MemoryDeadLetterQuery = {}): Promise<MemoryDeadLetterRecord[]> {
    return [...this.values.values()]
      .filter(
        (record) =>
          (!query.workerType || record.workerType === query.workerType) &&
          (!query.scopeHash || record.scopeHash === query.scopeHash) &&
          (!query.state || record.state === query.state) &&
          (!query.failureFingerprint || record.failureFingerprint === query.failureFingerprint)
      )
      .map((record) => structuredClone(record));
  }
  async set(record: MemoryDeadLetterRecord): Promise<void> {
    this.values.set(record.id, structuredClone(record));
  }
}

export interface DeadLetterDispositionRequest {
  deadLetterId: string;
  actorId: string;
  reason: string;
  expectedFailureFingerprint: string;
  confirmation: 'replay' | 'discard';
  idempotencyKey?: string;
  occurredAt?: string;
}

export class MemoryDeadLetterManager {
  constructor(private readonly repository: MemoryDeadLetterRepository) {}
  query(input?: MemoryDeadLetterQuery): Promise<MemoryDeadLetterRecord[]> {
    return this.repository.list(input);
  }
  async replay(request: DeadLetterDispositionRequest): Promise<MemoryDeadLetterRecord> {
    const record = await this.requireCurrent(request, 'replay');
    if (!record.idempotencyKey && !request.idempotencyKey) {
      throw memoryError('MEMORY_INVALID_INPUT', 'Dead-letter replay requires an idempotency key.');
    }
    return this.transition(record, 'replay_queued', request);
  }
  async discard(request: DeadLetterDispositionRequest): Promise<MemoryDeadLetterRecord> {
    const record = await this.requireCurrent(request, 'discard');
    if (request.reason.trim().length < 8) {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        'Dead-letter discard requires a meaningful reason.'
      );
    }
    return this.transition(record, 'discarded', request);
  }
  private async requireCurrent(
    request: DeadLetterDispositionRequest,
    expected: DeadLetterDispositionRequest['confirmation']
  ): Promise<MemoryDeadLetterRecord> {
    if (request.confirmation !== expected) {
      throw memoryError('MEMORY_INVALID_INPUT', 'Dead-letter confirmation does not match action.');
    }
    const record = await this.repository.get(request.deadLetterId);
    if (!record || record.state !== 'dead_letter') {
      throw memoryError('MEMORY_NOT_FOUND', 'Active dead-letter record was not found.');
    }
    if (record.failureFingerprint !== request.expectedFailureFingerprint) {
      throw memoryError(
        'MEMORY_REVISION_CONFLICT',
        'Dead-letter failure fingerprint changed since review.'
      );
    }
    return record;
  }
  private async transition(
    record: MemoryDeadLetterRecord,
    state: MemoryDeadLetterState,
    request: DeadLetterDispositionRequest
  ): Promise<MemoryDeadLetterRecord> {
    const occurredAt = request.occurredAt ?? new Date().toISOString();
    const updated = {
      ...record,
      state,
      idempotencyKey: request.idempotencyKey ?? record.idempotencyKey,
      updatedAt: occurredAt,
      disposition: { actorId: request.actorId, reason: request.reason, occurredAt },
    };
    await this.repository.set(updated);
    return updated;
  }
}

export function deadLetterFromTask(
  task: MemoryLifecycleTask,
  occurredAt = new Date().toISOString()
): MemoryDeadLetterRecord {
  if (task.state !== 'dead_letter' || !task.lastError) {
    throw memoryError('MEMORY_INVALID_INPUT', 'Only failed dead-letter tasks can be imported.');
  }
  const failureFingerprint = sha256({
    workerType: task.type,
    scopeHash: task.scopeHash,
    code: task.lastError.code,
    details: task.lastError.details,
  });
  return {
    id: 'memory:dead-letter:' + task.id,
    taskId: task.id,
    operationId: task.operationId,
    workerType: task.type,
    scopeHash: task.scopeHash,
    state: 'dead_letter',
    attempts: task.attempts,
    failure: task.lastError,
    failureFingerprint,
    payload: structuredClone(task.payload),
    createdAt: task.createdAt,
    updatedAt: occurredAt,
  };
}
