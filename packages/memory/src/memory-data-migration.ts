import type { StructuredStoreProvider } from './index';
import { normalizeMemoryError, sha256 } from './memory-utils';

export interface MemoryDataMigrationStep {
  id: string;
  apply(): Promise<void>;
  rollback(): Promise<void>;
}

export interface MemoryDataMigrationPlan {
  id: string;
  version: string;
  source: string;
  target: string;
  steps: readonly MemoryDataMigrationStep[];
}

export interface MemoryDataMigrationState {
  id: string;
  planId: string;
  planVersion: string;
  planHash: string;
  state: 'pending' | 'applying' | 'applied' | 'rolling_back' | 'rolled_back' | 'failed';
  appliedStepIds: string[];
  activeStepId?: string;
  lastError?: ReturnType<typeof normalizeMemoryError>;
  updatedAt: string;
}

export interface MemoryDataMigrationStateStore {
  get(planId: string): Promise<MemoryDataMigrationState | null>;
  save(state: MemoryDataMigrationState): Promise<void>;
}

export class StructuredMemoryDataMigrationStateStore implements MemoryDataMigrationStateStore {
  private readonly table: string;

  constructor(
    private readonly store: StructuredStoreProvider,
    table = 'memory_data_migrations'
  ) {
    this.table = table;
  }

  get(planId: string): Promise<MemoryDataMigrationState | null> {
    return this.store.get(this.table, migrationStateId(planId));
  }

  async save(state: MemoryDataMigrationState): Promise<void> {
    await this.store.transaction(async (transaction) => {
      const current = await transaction.get<MemoryDataMigrationState>(this.table, state.id);
      if (current) await transaction.update(this.table, state.id, structuredClone(state));
      else await transaction.insert(this.table, structuredClone(state));
    });
  }
}

export interface MemoryDataMigrationCoordinatorOptions {
  stateStore: MemoryDataMigrationStateStore;
  now?: () => string;
}

/** Resumable migration/rollback runner. Step implementations remain with the data owner. */
export class MemoryDataMigrationCoordinator {
  private readonly now: () => string;

  constructor(private readonly options: MemoryDataMigrationCoordinatorOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async apply(plan: MemoryDataMigrationPlan): Promise<MemoryDataMigrationState> {
    validatePlan(plan);
    let state = await this.load(plan);
    if (state.state === 'applied') return state;
    state = { ...state, state: 'applying', lastError: undefined, updatedAt: this.now() };
    await this.options.stateStore.save(state);
    try {
      for (const step of plan.steps) {
        if (state.appliedStepIds.includes(step.id)) continue;
        state = { ...state, activeStepId: step.id, updatedAt: this.now() };
        await this.options.stateStore.save(state);
        await step.apply();
        state = {
          ...state,
          appliedStepIds: [...state.appliedStepIds, step.id],
          activeStepId: undefined,
          updatedAt: this.now(),
        };
        await this.options.stateStore.save(state);
      }
      state = { ...state, state: 'applied', activeStepId: undefined, updatedAt: this.now() };
      await this.options.stateStore.save(state);
      return state;
    } catch (error) {
      state = {
        ...state,
        state: 'failed',
        lastError: normalizeMemoryError(error),
        updatedAt: this.now(),
      };
      await this.options.stateStore.save(state);
      throw state.lastError;
    }
  }

  async rollback(plan: MemoryDataMigrationPlan): Promise<MemoryDataMigrationState> {
    validatePlan(plan);
    let state = await this.load(plan);
    state = { ...state, state: 'rolling_back', lastError: undefined, updatedAt: this.now() };
    await this.options.stateStore.save(state);
    try {
      for (const step of [...plan.steps].reverse()) {
        if (!state.appliedStepIds.includes(step.id)) continue;
        state = { ...state, activeStepId: step.id, updatedAt: this.now() };
        await this.options.stateStore.save(state);
        await step.rollback();
        state = {
          ...state,
          appliedStepIds: state.appliedStepIds.filter((id) => id !== step.id),
          activeStepId: undefined,
          updatedAt: this.now(),
        };
        await this.options.stateStore.save(state);
      }
      state = { ...state, state: 'rolled_back', activeStepId: undefined, updatedAt: this.now() };
      await this.options.stateStore.save(state);
      return state;
    } catch (error) {
      state = {
        ...state,
        state: 'failed',
        lastError: normalizeMemoryError(error),
        updatedAt: this.now(),
      };
      await this.options.stateStore.save(state);
      throw state.lastError;
    }
  }

  private async load(plan: MemoryDataMigrationPlan): Promise<MemoryDataMigrationState> {
    const planHash = migrationPlanHash(plan);
    const current = await this.options.stateStore.get(plan.id);
    if (current && current.planHash !== planHash) {
      throw normalizeMemoryError(
        new Error(`Memory migration plan ${plan.id} changed after execution started.`),
        'MEMORY_MAINTENANCE_CONFLICT'
      );
    }
    return (
      current ?? {
        id: migrationStateId(plan.id),
        planId: plan.id,
        planVersion: plan.version,
        planHash,
        state: 'pending',
        appliedStepIds: [],
        updatedAt: this.now(),
      }
    );
  }
}

export function migrationPlanHash(plan: MemoryDataMigrationPlan): string {
  return sha256({
    id: plan.id,
    version: plan.version,
    source: plan.source,
    target: plan.target,
    stepIds: plan.steps.map((step) => step.id),
  });
}

function validatePlan(plan: MemoryDataMigrationPlan): void {
  const ids = plan.steps.map((step) => step.id);
  if (!plan.id || !plan.version || ids.some((id) => !id) || new Set(ids).size !== ids.length) {
    throw normalizeMemoryError(
      new Error('Memory migration plan and step IDs must be non-empty and unique.'),
      'MEMORY_INVALID_INPUT'
    );
  }
}

function migrationStateId(planId: string): string {
  return `memory:migration:${sha256(planId).slice(0, 32)}`;
}
