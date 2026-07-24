import type { StructuredStoreProvider } from './index';
import type { NormalizedMemoryError } from './contracts';
import type {
  MemoryLifecycleTask,
  MemoryLifecycleTaskStore,
  MemoryLifecycleWorkerType,
} from './lifecycle-workers';

export interface StructuredMemoryLifecycleTaskStoreOptions {
  store: StructuredStoreProvider;
  table?: string;
}

export class StructuredMemoryLifecycleTaskStore implements MemoryLifecycleTaskStore {
  private readonly table: string;

  constructor(private readonly options: StructuredMemoryLifecycleTaskStoreOptions) {
    this.table = options.table ?? 'memory_lifecycle_tasks';
  }

  async enqueue(task: MemoryLifecycleTask): Promise<void> {
    await this.options.store.transaction(async (transaction) => {
      if (!(await transaction.get<MemoryLifecycleTask>(this.table, task.id))) {
        await transaction.insert(this.table, structuredClone(task));
      }
    });
  }

  async lease(
    type: MemoryLifecycleWorkerType,
    ownerId: string,
    now: string,
    leaseUntil: string,
    limit: number
  ): Promise<MemoryLifecycleTask[]> {
    return this.options.store.transaction(async (transaction) => {
      const candidates = await transaction.query<MemoryLifecycleTask>(this.table, {
        where: { type },
      });
      const selected = candidates
        .filter((task) => isLeaseable(task, now))
        .sort(compareLifecycleTasks)
        .slice(0, limit);
      const leased: MemoryLifecycleTask[] = [];
      for (const candidate of selected) {
        const current = await transaction.get<MemoryLifecycleTask>(this.table, candidate.id);
        if (!current || !isLeaseable(current, now)) continue;
        const fencingToken = (current.fencingToken ?? 0) + 1;
        const next: MemoryLifecycleTask = {
          ...current,
          state: 'processing',
          attempts: current.attempts + 1,
          leaseOwner: ownerId,
          leaseToken: lifecycleLeaseToken(ownerId, current.id, fencingToken),
          leaseExpiresAt: leaseUntil,
          fencingToken,
          updatedAt: now,
        };
        await transaction.update(this.table, next.id, next);
        leased.push(next);
      }
      return leased.map((task) => structuredClone(task));
    });
  }

  async renew(
    taskId: string,
    ownerId: string,
    leaseToken: string,
    now: string,
    leaseUntil: string
  ): Promise<boolean> {
    return this.options.store.transaction(async (transaction) => {
      const task = await transaction.get<MemoryLifecycleTask>(this.table, taskId);
      if (!hasLifecycleLease(task, ownerId, leaseToken, now) || leaseUntil <= now) return false;
      await transaction.update(this.table, taskId, {
        ...task,
        leaseExpiresAt: leaseUntil,
        updatedAt: now,
      });
      return true;
    });
  }

  async complete(
    taskId: string,
    ownerId: string,
    leaseToken: string,
    now: string
  ): Promise<boolean> {
    return this.options.store.transaction(async (transaction) => {
      const task = await transaction.get<MemoryLifecycleTask>(this.table, taskId);
      if (!hasLifecycleLease(task, ownerId, leaseToken, now)) return false;
      await transaction.update(this.table, taskId, {
        ...task,
        state: 'completed',
        updatedAt: now,
        leaseOwner: undefined,
        leaseToken: undefined,
        leaseExpiresAt: undefined,
      });
      return true;
    });
  }

  async fail(
    taskId: string,
    ownerId: string,
    leaseToken: string,
    now: string,
    error: NormalizedMemoryError,
    retryAt: string,
    deadLetter: boolean
  ): Promise<boolean> {
    return this.options.store.transaction(async (transaction) => {
      const task = await transaction.get<MemoryLifecycleTask>(this.table, taskId);
      if (!hasLifecycleLease(task, ownerId, leaseToken, now)) return false;
      await transaction.update(this.table, taskId, {
        ...task,
        state: deadLetter ? 'dead_letter' : 'failed',
        lastError: error,
        availableAt: retryAt,
        updatedAt: retryAt,
        leaseOwner: undefined,
        leaseToken: undefined,
        leaseExpiresAt: undefined,
      });
      return true;
    });
  }

  async list(type?: MemoryLifecycleWorkerType): Promise<MemoryLifecycleTask[]> {
    const tasks = await this.options.store.query<MemoryLifecycleTask>(this.table, {
      where: type ? { type } : undefined,
    });
    return tasks.sort(compareLifecycleTasks).map((task) => structuredClone(task));
  }
}

function isLeaseable(task: MemoryLifecycleTask, now: string): boolean {
  return (
    task.availableAt <= now &&
    (task.state === 'pending' ||
      task.state === 'failed' ||
      (task.state === 'processing' && (task.leaseExpiresAt ?? '') <= now))
  );
}

function compareLifecycleTasks(left: MemoryLifecycleTask, right: MemoryLifecycleTask): number {
  return left.availableAt.localeCompare(right.availableAt) || left.id.localeCompare(right.id);
}

function lifecycleLeaseToken(ownerId: string, taskId: string, fencingToken: number): string {
  return ownerId + ':' + taskId + ':' + fencingToken;
}

function hasLifecycleLease(
  task: MemoryLifecycleTask | null,
  ownerId: string,
  leaseToken: string,
  now: string
): task is MemoryLifecycleTask {
  return (
    task?.state === 'processing' &&
    task.leaseOwner === ownerId &&
    task.leaseToken === leaseToken &&
    (task.leaseExpiresAt ?? '') > now
  );
}
