import type { NormalizedMemoryError } from './contracts';
import { normalizeMemoryError } from './memory-utils';

export type MemoryLifecycleWorkerType =
  | 'retention'
  | 'decay'
  | 'consolidation'
  | 'deletion'
  | 'reindex'
  | 'provider_reconciliation';

export interface MemoryLifecycleTask<TPayload = unknown> {
  id: string;
  operationId: string;
  type: MemoryLifecycleWorkerType;
  scopeHash: string;
  payload: TPayload;
  state: 'pending' | 'processing' | 'completed' | 'failed' | 'dead_letter';
  attempts: number;
  availableAt: string;
  leaseOwner?: string;
  leaseToken?: string;
  leaseExpiresAt?: string;
  lastError?: NormalizedMemoryError;
  createdAt: string;
  updatedAt: string;
}

export interface MemoryLifecycleTaskStore {
  enqueue(task: MemoryLifecycleTask): Promise<void>;
  lease(
    type: MemoryLifecycleWorkerType,
    ownerId: string,
    now: string,
    leaseUntil: string,
    limit: number
  ): Promise<MemoryLifecycleTask[]>;
  complete(taskId: string, ownerId: string, leaseToken: string, now: string): Promise<boolean>;
  fail(
    taskId: string,
    ownerId: string,
    leaseToken: string,
    error: NormalizedMemoryError,
    retryAt: string,
    deadLetter: boolean
  ): Promise<boolean>;
  list(type?: MemoryLifecycleWorkerType): Promise<MemoryLifecycleTask[]>;
}

export class InMemoryMemoryLifecycleTaskStore implements MemoryLifecycleTaskStore {
  private readonly tasks = new Map<string, MemoryLifecycleTask>();

  async enqueue(task: MemoryLifecycleTask): Promise<void> {
    if (!this.tasks.has(task.id)) this.tasks.set(task.id, structuredClone(task));
  }

  async lease(
    type: MemoryLifecycleWorkerType,
    ownerId: string,
    now: string,
    leaseUntil: string,
    limit: number
  ): Promise<MemoryLifecycleTask[]> {
    const tasks = Array.from(this.tasks.values())
      .filter((task) => task.type === type)
      .filter(
        (task) =>
          task.state === 'pending' ||
          task.state === 'failed' ||
          (task.state === 'processing' && (task.leaseExpiresAt ?? '') <= now)
      )
      .filter((task) => task.availableAt <= now)
      .sort(
        (left, right) =>
          left.availableAt.localeCompare(right.availableAt) || left.id.localeCompare(right.id)
      )
      .slice(0, limit);
    for (const task of tasks) {
      task.state = 'processing';
      task.attempts += 1;
      task.leaseOwner = ownerId;
      task.leaseToken = lifecycleLeaseToken(ownerId, task.id, task.attempts, leaseUntil);
      task.leaseExpiresAt = leaseUntil;
      task.updatedAt = now;
    }
    return tasks.map((task) => structuredClone(task));
  }

  async complete(
    taskId: string,
    ownerId: string,
    leaseToken: string,
    now: string
  ): Promise<boolean> {
    const task = this.tasks.get(taskId);
    if (!hasLifecycleLease(task, ownerId, leaseToken)) return false;
    task.state = 'completed';
    task.updatedAt = now;
    task.leaseOwner = undefined;
    task.leaseToken = undefined;
    task.leaseExpiresAt = undefined;
    return true;
  }

  async fail(
    taskId: string,
    ownerId: string,
    leaseToken: string,
    error: NormalizedMemoryError,
    retryAt: string,
    deadLetter: boolean
  ): Promise<boolean> {
    const task = this.tasks.get(taskId);
    if (!hasLifecycleLease(task, ownerId, leaseToken)) return false;
    task.state = deadLetter ? 'dead_letter' : 'failed';
    task.lastError = error;
    task.availableAt = retryAt;
    task.updatedAt = retryAt;
    task.leaseOwner = undefined;
    task.leaseToken = undefined;
    task.leaseExpiresAt = undefined;
    return true;
  }

  async list(type?: MemoryLifecycleWorkerType): Promise<MemoryLifecycleTask[]> {
    return Array.from(this.tasks.values())
      .filter((task) => !type || task.type === type)
      .map((task) => structuredClone(task));
  }
}

export interface MemoryLifecycleWorkerEvent {
  type:
    | 'memory.worker.started'
    | 'memory.worker.stopped'
    | 'memory.worker.failed'
    | 'memory.worker.dead_lettered';
  workerType: MemoryLifecycleWorkerType;
  taskId?: string;
  operationId?: string;
  error?: NormalizedMemoryError;
}

export type MemoryLifecycleTaskHandler = (
  task: MemoryLifecycleTask,
  signal: AbortSignal
) => Promise<void>;

export interface MemoryLifecycleWorkerOptions {
  type: MemoryLifecycleWorkerType;
  ownerId: string;
  store: MemoryLifecycleTaskStore;
  handler: MemoryLifecycleTaskHandler;
  batchSize?: number;
  leaseMs?: number;
  retryDelayMs?: number;
  maxAttempts?: number;
  pollIntervalMs?: number;
  now?: () => Date;
  onEvent?: (event: MemoryLifecycleWorkerEvent) => void | Promise<void>;
}

export interface MemoryLifecycleWorkerRunResult {
  leased: number;
  completed: number;
  failed: number;
  deadLettered: number;
}

export class LeasedMemoryLifecycleWorker {
  private running = false;
  private timer?: ReturnType<typeof setTimeout>;
  private controller?: AbortController;
  private activeRun?: Promise<MemoryLifecycleWorkerRunResult>;
  private readonly now: () => Date;

  constructor(protected readonly options: MemoryLifecycleWorkerOptions) {
    this.now = options.now ?? (() => new Date());
  }

  async runOnce(): Promise<MemoryLifecycleWorkerRunResult> {
    const now = this.now();
    const leaseUntil = new Date(now.getTime() + (this.options.leaseMs ?? 30_000));
    const tasks = await this.options.store.lease(
      this.options.type,
      this.options.ownerId,
      now.toISOString(),
      leaseUntil.toISOString(),
      this.options.batchSize ?? 20
    );
    const result: MemoryLifecycleWorkerRunResult = {
      leased: tasks.length,
      completed: 0,
      failed: 0,
      deadLettered: 0,
    };
    for (const task of tasks) {
      const controller = new AbortController();
      this.controller = controller;
      try {
        await this.options.handler(task, controller.signal);
        const completed = await this.options.store.complete(
          task.id,
          this.options.ownerId,
          requiredLeaseToken(task),
          this.now().toISOString()
        );
        if (completed) result.completed += 1;
        else {
          result.failed += 1;
          await this.options.onEvent?.({
            type: 'memory.worker.failed',
            workerType: this.options.type,
            taskId: task.id,
            operationId: task.operationId,
            error: normalizeMemoryError(new Error('Memory lifecycle lease was lost.')),
          });
        }
      } catch (error) {
        const normalized = normalizeMemoryError(error);
        const deadLetter = task.attempts >= (this.options.maxAttempts ?? 5);
        const retryAt = new Date(
          this.now().getTime() + (this.options.retryDelayMs ?? 1_000) * task.attempts
        ).toISOString();
        await this.options.store.fail(
          task.id,
          this.options.ownerId,
          requiredLeaseToken(task),
          normalized,
          retryAt,
          deadLetter
        );
        if (deadLetter) result.deadLettered += 1;
        else result.failed += 1;
        await this.options.onEvent?.({
          type: deadLetter ? 'memory.worker.dead_lettered' : 'memory.worker.failed',
          workerType: this.options.type,
          taskId: task.id,
          operationId: task.operationId,
          error: normalized,
        });
      } finally {
        this.controller = undefined;
      }
    }
    return result;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    void this.options.onEvent?.({
      type: 'memory.worker.started',
      workerType: this.options.type,
    });
    const poll = async (): Promise<void> => {
      if (!this.running) return;
      try {
        this.activeRun = this.runOnce();
        await this.activeRun;
      } catch (error) {
        await this.options.onEvent?.({
          type: 'memory.worker.failed',
          workerType: this.options.type,
          error: normalizeMemoryError(error),
        });
      } finally {
        this.activeRun = undefined;
        if (this.running) {
          this.timer = setTimeout(poll, this.options.pollIntervalMs ?? 1_000);
        }
      }
    };
    void poll();
  }

  stop(): void {
    this.running = false;
    this.controller?.abort();
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
    void this.options.onEvent?.({
      type: 'memory.worker.stopped',
      workerType: this.options.type,
    });
  }

  async drain(): Promise<void> {
    await this.activeRun;
  }

  async stopAndDrain(): Promise<void> {
    this.stop();
    await this.drain();
  }
}

export class MemoryRetentionWorker extends LeasedMemoryLifecycleWorker {
  constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>) {
    super({ ...options, type: 'retention' });
  }
}

export class MemoryDecayWorker extends LeasedMemoryLifecycleWorker {
  constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>) {
    super({ ...options, type: 'decay' });
  }
}

export class MemoryConsolidationWorker extends LeasedMemoryLifecycleWorker {
  constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>) {
    super({ ...options, type: 'consolidation' });
  }
}

export class MemoryDeletionWorker extends LeasedMemoryLifecycleWorker {
  constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>) {
    super({ ...options, type: 'deletion' });
  }
}

export class MemoryReindexWorker extends LeasedMemoryLifecycleWorker {
  constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>) {
    super({ ...options, type: 'reindex' });
  }
}

export class ProviderReconciliationWorker extends LeasedMemoryLifecycleWorker {
  constructor(options: Omit<MemoryLifecycleWorkerOptions, 'type'>) {
    super({ ...options, type: 'provider_reconciliation' });
  }
}

function lifecycleLeaseToken(
  ownerId: string,
  taskId: string,
  attempt: number,
  leaseUntil: string
): string {
  return ownerId + ':' + taskId + ':' + attempt + ':' + leaseUntil;
}

function hasLifecycleLease(
  task: MemoryLifecycleTask | undefined,
  ownerId: string,
  leaseToken: string
): task is MemoryLifecycleTask {
  return (
    task?.state === 'processing' && task.leaseOwner === ownerId && task.leaseToken === leaseToken
  );
}

function requiredLeaseToken(task: MemoryLifecycleTask): string {
  if (!task.leaseToken) throw new Error('Leased Memory lifecycle task is missing its lease token.');
  return task.leaseToken;
}
