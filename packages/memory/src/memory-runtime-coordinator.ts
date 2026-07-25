import type { MemoryManagementCapabilities, NormalizedMemoryError } from './contracts';
import { negotiateMemoryManagementCapabilities } from './external-adapters';
import type { StructuredStoreProvider } from './index';
import {
  validateMemoryRuntimeConfig,
  type MemoryRuntime,
  type MemoryRuntimeConfig,
  type MemoryRuntimeFactory,
} from './memory-runtime-factory';
import { memoryError, normalizeMemoryError, sha256, stableStringify } from './memory-utils';

export type MemoryRuntimeRevisionStatus = 'active' | 'draining' | 'retired' | 'quarantined';

export interface MemoryRuntimeRevisionState {
  id: string;
  coordinatorId: string;
  profileId: string;
  profileRevision: string;
  providerId: string;
  providerRevision: string;
  runtimeId: string;
  profileHash: string;
  capabilityHash: string;
  capabilitySnapshot: MemoryManagementCapabilities;
  status: MemoryRuntimeRevisionStatus;
  generation: number;
  observedAt: string;
  quarantineError?: NormalizedMemoryError;
}

export interface MemoryRuntimeActiveState extends MemoryRuntimeRevisionState {
  id: string;
}

export interface MemoryRuntimeControlStore {
  readonly durability: 'ephemeral' | 'durable';
  getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null>;
  activate(
    coordinatorId: string,
    expectedGeneration: number | null,
    next: MemoryRuntimeActiveState,
    previous?: MemoryRuntimeRevisionState
  ): Promise<boolean>;
  getRevision(
    coordinatorId: string,
    profileRevision: string
  ): Promise<MemoryRuntimeRevisionState | null>;
  setRevision(state: MemoryRuntimeRevisionState): Promise<void>;
  listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]>;
}

export class InMemoryMemoryRuntimeControlStore implements MemoryRuntimeControlStore {
  readonly durability = 'ephemeral' as const;
  private readonly active = new Map<string, MemoryRuntimeActiveState>();
  private readonly revisions = new Map<string, MemoryRuntimeRevisionState>();

  async getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null> {
    const value = this.active.get(coordinatorId);
    return value ? structuredClone(value) : null;
  }

  async activate(
    coordinatorId: string,
    expectedGeneration: number | null,
    next: MemoryRuntimeActiveState,
    previous?: MemoryRuntimeRevisionState
  ): Promise<boolean> {
    const current = this.active.get(coordinatorId);
    if ((current?.generation ?? null) !== expectedGeneration) return false;
    this.active.set(coordinatorId, structuredClone(next));
    this.revisions.set(
      revisionKey(coordinatorId, next.profileRevision),
      structuredClone(asRevisionState(next))
    );
    if (previous) {
      this.revisions.set(
        revisionKey(coordinatorId, previous.profileRevision),
        structuredClone(asRevisionState(previous))
      );
    }
    return true;
  }

  async getRevision(
    coordinatorId: string,
    profileRevision: string
  ): Promise<MemoryRuntimeRevisionState | null> {
    const value = this.revisions.get(revisionKey(coordinatorId, profileRevision));
    return value ? structuredClone(value) : null;
  }

  async setRevision(state: MemoryRuntimeRevisionState): Promise<void> {
    this.revisions.set(
      revisionKey(state.coordinatorId, state.profileRevision),
      structuredClone(state)
    );
  }

  async listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]> {
    return [...this.revisions.values()]
      .filter((state) => state.coordinatorId === coordinatorId)
      .sort((left, right) => left.generation - right.generation)
      .map((state) => structuredClone(state));
  }
}

export interface StructuredMemoryRuntimeControlStoreOptions {
  provider: StructuredStoreProvider;
  activeTable?: string;
  revisionTable?: string;
}

export class StructuredMemoryRuntimeControlStore implements MemoryRuntimeControlStore {
  readonly durability = 'durable' as const;
  private readonly activeTable: string;
  private readonly revisionTable: string;

  constructor(private readonly options: StructuredMemoryRuntimeControlStoreOptions) {
    this.activeTable = options.activeTable ?? 'memory_runtime_active_revision';
    this.revisionTable = options.revisionTable ?? 'memory_runtime_revision_history';
  }

  async getActive(coordinatorId: string): Promise<MemoryRuntimeActiveState | null> {
    return this.options.provider.get<MemoryRuntimeActiveState>(this.activeTable, coordinatorId);
  }

  async activate(
    coordinatorId: string,
    expectedGeneration: number | null,
    next: MemoryRuntimeActiveState,
    previous?: MemoryRuntimeRevisionState
  ): Promise<boolean> {
    return this.options.provider.transaction(async (transaction) => {
      const current = await transaction.get<MemoryRuntimeActiveState>(
        this.activeTable,
        coordinatorId
      );
      if ((current?.generation ?? null) !== expectedGeneration) return false;
      if (current) await transaction.update(this.activeTable, coordinatorId, next);
      else await transaction.insert(this.activeTable, next);
      await upsertRevision(transaction, this.revisionTable, asRevisionState(next));
      if (previous) {
        await upsertRevision(transaction, this.revisionTable, asRevisionState(previous));
      }
      return true;
    });
  }

  async getRevision(
    coordinatorId: string,
    profileRevision: string
  ): Promise<MemoryRuntimeRevisionState | null> {
    return this.options.provider.get<MemoryRuntimeRevisionState>(
      this.revisionTable,
      revisionKey(coordinatorId, profileRevision)
    );
  }

  async setRevision(state: MemoryRuntimeRevisionState): Promise<void> {
    await this.options.provider.transaction(async (transaction) => {
      const current = await transaction.get<MemoryRuntimeRevisionState>(
        this.revisionTable,
        state.id
      );
      if (current) await transaction.update(this.revisionTable, state.id, state);
      else await transaction.insert(this.revisionTable, state);
    });
  }

  async listRevisions(coordinatorId: string): Promise<MemoryRuntimeRevisionState[]> {
    const states = await this.options.provider.query<MemoryRuntimeRevisionState>(
      this.revisionTable,
      { where: { coordinatorId } }
    );
    return states.sort((left, right) => left.generation - right.generation);
  }
}

export interface MemoryRuntimeCreator {
  create(input: unknown, references?: ReadonlyMap<string, unknown>): Promise<MemoryRuntime>;
}

export interface MemoryRuntimeCoordinatorOptions {
  id: string;
  factory: MemoryRuntimeFactory | MemoryRuntimeCreator;
  store: MemoryRuntimeControlStore;
  requireDurableStore?: boolean;
  now?: () => Date;
  capabilityProbeIntervalMs?: number;
}

export interface MemoryRuntimeGeneration {
  generation: number;
  profileId: string;
  profileRevision: string;
  providerId: string;
  providerRevision: string;
  runtimeId: string;
}

export interface MemoryRuntimeSwitchResult extends MemoryRuntimeGeneration {
  previousProfileRevision?: string;
}

interface RuntimeSlot {
  runtime: MemoryRuntime;
  state: MemoryRuntimeActiveState;
  inFlight: number;
  quarantined?: NormalizedMemoryError;
  drainResolve?: () => void;
  closePromise?: Promise<void>;
}

export class MemoryRuntimeCoordinator {
  private readonly now: () => Date;
  private active?: RuntimeSlot;
  private closed = false;
  private transitionTail = Promise.resolve();
  private readonly retired = new Set<Promise<void>>();
  private probeTimer?: ReturnType<typeof setTimeout>;

  constructor(private readonly options: MemoryRuntimeCoordinatorOptions) {
    if (!options.id.trim()) throw new Error('Memory runtime coordinator id is required.');
    if ((options.requireDurableStore ?? true) && options.store.durability !== 'durable') {
      throw memoryError(
        'MEMORY_INVALID_INPUT',
        'Production runtime revision switching requires a durable control store.'
      );
    }
    this.now = options.now ?? (() => new Date());
  }

  initialize(
    input: unknown,
    references: ReadonlyMap<string, unknown> = new Map()
  ): Promise<MemoryRuntimeSwitchResult> {
    return this.serialize(async () => {
      this.assertOpen();
      if (this.active)
        throw memoryError('MEMORY_INVALID_INPUT', 'Memory runtime is already active.');
      const config = validateMemoryRuntimeConfig(input);
      const selected = selectedRuntime(config);
      const persisted = await this.options.store.getActive(this.options.id);
      if (persisted && persisted.profileRevision !== selected.profileRevision) {
        throw memoryError(
          'MEMORY_REVISION_CONFLICT',
          `Persisted Memory revision ${persisted.profileRevision} must be recovered before switching to ${selected.profileRevision}.`,
          false,
          { activeRevision: persisted.profileRevision, requestedRevision: selected.profileRevision }
        );
      }
      if (persisted?.status === 'quarantined') {
        throw persisted.quarantineError ?? quarantinedRevisionError(persisted);
      }

      const runtime = await this.options.factory.create(config, references);
      try {
        const candidate = await this.candidateState(runtime, persisted?.generation ?? 0);
        if (persisted && persisted.capabilityHash !== candidate.capabilityHash) {
          const quarantined = await this.persistQuarantine(
            { ...candidate, generation: persisted.generation },
            capabilityDriftError(candidate.providerId, selected.profileRevision)
          );
          throw quarantined.quarantineError;
        }
        const next = { ...candidate, status: 'active' as const };
        const activated = await this.options.store.activate(
          this.options.id,
          persisted?.generation ?? null,
          next
        );
        if (!activated) {
          throw memoryError(
            'MEMORY_REVISION_CONFLICT',
            'Memory runtime active revision changed during initialization.'
          );
        }
        this.active = { runtime, state: next, inFlight: 0 };
        this.scheduleProbe();
        return generationResult(next);
      } catch (error) {
        await runtime.close();
        throw error;
      }
    });
  }

  switchRevision(
    input: unknown,
    references: ReadonlyMap<string, unknown> = new Map(),
    expectedProfileRevision?: string
  ): Promise<MemoryRuntimeSwitchResult> {
    return this.serialize(async () => {
      this.assertOpen();
      const previous = this.requiredActive();
      if (
        expectedProfileRevision !== undefined &&
        previous.state.profileRevision !== expectedProfileRevision
      ) {
        throw memoryError(
          'MEMORY_REVISION_CONFLICT',
          `Expected active Memory revision ${expectedProfileRevision}, found ${previous.state.profileRevision}.`
        );
      }
      const config = validateMemoryRuntimeConfig(input);
      const selected = selectedRuntime(config);
      if (selected.profileRevision === previous.state.profileRevision) {
        return {
          ...generationResult(previous.state),
          previousProfileRevision: previous.state.profileRevision,
        };
      }
      const priorRevision = await this.options.store.getRevision(
        this.options.id,
        selected.profileRevision
      );
      if (priorRevision?.status === 'quarantined') {
        throw priorRevision.quarantineError ?? quarantinedRevisionError(priorRevision);
      }

      const runtime = await this.options.factory.create(config, references);
      try {
        const candidate = await this.candidateState(runtime, previous.state.generation);
        if (priorRevision && priorRevision.capabilityHash !== candidate.capabilityHash) {
          const quarantined = await this.persistQuarantine(
            candidate,
            capabilityDriftError(candidate.providerId, selected.profileRevision)
          );
          throw quarantined.quarantineError;
        }
        const next = { ...candidate, status: 'active' as const };
        const draining: MemoryRuntimeRevisionState = {
          ...previous.state,
          id: revisionKey(this.options.id, previous.state.profileRevision),
          status: 'draining',
          observedAt: this.now().toISOString(),
        };
        const activated = await this.options.store.activate(
          this.options.id,
          previous.state.generation,
          next,
          draining
        );
        if (!activated) {
          throw memoryError(
            'MEMORY_REVISION_CONFLICT',
            'Memory runtime active revision changed during profile activation.'
          );
        }
        this.active = { runtime, state: next, inFlight: 0 };
        this.retire(previous);
        this.scheduleProbe();
        return {
          ...generationResult(next),
          previousProfileRevision: previous.state.profileRevision,
        };
      } catch (error) {
        await runtime.close();
        throw error;
      }
    });
  }

  async withRuntime<T>(
    operation: (runtime: MemoryRuntime, generation: MemoryRuntimeGeneration) => Promise<T>
  ): Promise<T> {
    this.assertOpen();
    const slot = this.requiredActive();
    if (slot.quarantined || slot.state.status === 'quarantined') {
      throw slot.quarantined ?? slot.state.quarantineError ?? quarantinedRevisionError(slot.state);
    }
    slot.inFlight += 1;
    try {
      return await operation(slot.runtime, generationResult(slot.state));
    } catch (error) {
      const normalized = normalizeMemoryError(error);
      if (
        normalized.details?.quarantined === true ||
        normalized.details?.capabilityDrift === true
      ) {
        await this.quarantineSlot(slot, normalized);
      }
      throw error;
    } finally {
      slot.inFlight -= 1;
      if (slot.inFlight === 0) slot.drainResolve?.();
    }
  }

  async probeActive(): Promise<MemoryRuntimeRevisionState> {
    const slot = this.requiredActive();
    if (slot.quarantined) throw slot.quarantined;
    try {
      const capabilities = negotiateMemoryManagementCapabilities(
        await slot.runtime.provider.capabilities()
      );
      const capabilityHash = sha256(capabilities);
      if (
        capabilityHash !== slot.state.capabilityHash ||
        stableStringify(capabilities) !== stableStringify(slot.state.capabilitySnapshot)
      ) {
        throw capabilityDriftError(slot.state.providerId, slot.state.profileRevision);
      }
      return structuredClone(slot.state);
    } catch (error) {
      const quarantined = await this.quarantineSlot(
        slot,
        normalizeMemoryError(error, 'MEMORY_PROVIDER_UNAVAILABLE')
      );
      throw quarantined;
    }
  }

  current(): MemoryRuntimeGeneration | null {
    return this.active ? generationResult(this.active.state) : null;
  }

  async drain(): Promise<void> {
    await Promise.all([...this.retired]);
  }

  close(): Promise<void> {
    return this.serialize(async () => {
      if (this.closed) {
        await this.drain();
        return;
      }
      this.closed = true;
      if (this.probeTimer) clearTimeout(this.probeTimer);
      this.probeTimer = undefined;
      const active = this.active;
      this.active = undefined;
      if (active) this.retire(active, false);
      await this.drain();
    });
  }

  private async candidateState(
    runtime: MemoryRuntime,
    previousGeneration: number
  ): Promise<MemoryRuntimeActiveState> {
    const capabilities = negotiateMemoryManagementCapabilities(
      await runtime.provider.capabilities()
    );
    const profileRevision = runtime.profile.revision ?? runtime.profile.version;
    const providerRevision = runtime.providerSpec.revision ?? runtime.providerSpec.version;
    return {
      id: this.options.id,
      coordinatorId: this.options.id,
      profileId: runtime.profile.id,
      profileRevision,
      providerId: runtime.provider.id,
      providerRevision,
      runtimeId: runtime.compositionReceipt.runtimeId,
      profileHash: runtime.profileHash,
      capabilityHash: sha256(capabilities),
      capabilitySnapshot: capabilities,
      status: 'active',
      generation: previousGeneration + 1,
      observedAt: this.now().toISOString(),
    };
  }

  private async quarantineSlot(
    slot: RuntimeSlot,
    cause: NormalizedMemoryError
  ): Promise<NormalizedMemoryError> {
    if (slot.quarantined) return slot.quarantined;
    const error: NormalizedMemoryError = {
      ...cause,
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      retryable: false,
      details: {
        ...cause.details,
        quarantined: true,
        capabilityDrift: true,
        profileRevision: slot.state.profileRevision,
        providerRevision: slot.state.providerRevision,
      },
    };
    const quarantined = await this.persistQuarantine(slot.state, error);
    slot.quarantined = error;
    slot.state = quarantined;
    return error;
  }

  private async persistQuarantine(
    state: MemoryRuntimeRevisionState,
    cause: NormalizedMemoryError
  ): Promise<MemoryRuntimeActiveState> {
    const error: NormalizedMemoryError = {
      ...cause,
      code: 'MEMORY_PROVIDER_UNAVAILABLE',
      retryable: false,
      details: {
        ...cause.details,
        quarantined: true,
        capabilityDrift: true,
        profileRevision: state.profileRevision,
        providerRevision: state.providerRevision,
      },
    };
    const quarantined: MemoryRuntimeActiveState = {
      ...state,
      id: this.options.id,
      status: 'quarantined',
      generation: state.generation + 1,
      observedAt: this.now().toISOString(),
      quarantineError: error,
    };
    const active = await this.options.store.getActive(this.options.id);
    if (
      active &&
      active.profileRevision === state.profileRevision &&
      active.generation === state.generation
    ) {
      await this.options.store.activate(this.options.id, active.generation, quarantined);
    } else {
      await this.options.store.setRevision(asRevisionState(quarantined));
    }
    return quarantined;
  }

  private retire(slot: RuntimeSlot, recordRetirement = true): void {
    if (slot.closePromise) return;
    slot.closePromise = (async () => {
      if (slot.inFlight > 0) {
        await new Promise<void>((resolve) => {
          slot.drainResolve = resolve;
        });
      }
      await slot.runtime.close();
      if (recordRetirement) {
        await this.options.store.setRevision({
          ...slot.state,
          id: revisionKey(this.options.id, slot.state.profileRevision),
          status: slot.state.status === 'quarantined' ? 'quarantined' : 'retired',
          observedAt: this.now().toISOString(),
        });
      }
    })();
    this.retired.add(slot.closePromise);
    void slot.closePromise.then(
      () => this.retired.delete(slot.closePromise!),
      () => this.retired.delete(slot.closePromise!)
    );
  }

  private scheduleProbe(): void {
    if (this.probeTimer) clearTimeout(this.probeTimer);
    const interval = this.options.capabilityProbeIntervalMs;
    if (!interval || interval <= 0 || this.closed) return;
    this.probeTimer = setTimeout(() => {
      void this.probeActive()
        .catch(() => undefined)
        .finally(() => this.scheduleProbe());
    }, interval);
  }

  private requiredActive(): RuntimeSlot {
    if (!this.active) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Memory runtime is not initialized.');
    }
    return this.active;
  }

  private assertOpen(): void {
    if (this.closed) {
      throw memoryError('MEMORY_PROVIDER_UNAVAILABLE', 'Memory runtime coordinator is closed.');
    }
  }

  private async serialize<T>(operation: () => Promise<T>): Promise<T> {
    const previous = this.transitionTail;
    let release!: () => void;
    this.transitionTail = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previous;
    try {
      return await operation();
    } finally {
      release();
    }
  }
}

async function upsertRevision(
  provider: StructuredStoreProvider,
  table: string,
  state: MemoryRuntimeRevisionState
): Promise<void> {
  const current = await provider.get<MemoryRuntimeRevisionState>(table, state.id);
  if (current) await provider.update(table, state.id, state);
  else await provider.insert(table, state);
}

function asRevisionState(state: MemoryRuntimeRevisionState): MemoryRuntimeRevisionState {
  return {
    ...state,
    id: revisionKey(state.coordinatorId, state.profileRevision),
  };
}

function selectedRuntime(config: MemoryRuntimeConfig): {
  profileRevision: string;
} {
  const selected = config.profiles[config.activeProfile];
  return { profileRevision: selected.profile.revision ?? selected.profile.version };
}

function generationResult(state: MemoryRuntimeRevisionState): MemoryRuntimeGeneration {
  return {
    generation: state.generation,
    profileId: state.profileId,
    profileRevision: state.profileRevision,
    providerId: state.providerId,
    providerRevision: state.providerRevision,
    runtimeId: state.runtimeId,
  };
}

function revisionKey(coordinatorId: string, profileRevision: string): string {
  return `${coordinatorId}:revision:${sha256(profileRevision).slice(7, 31)}`;
}

function capabilityDriftError(providerId: string, profileRevision: string): NormalizedMemoryError {
  return memoryError(
    'MEMORY_PROVIDER_UNAVAILABLE',
    `Memory provider capability drift detected: ${providerId}`,
    false,
    { quarantined: true, capabilityDrift: true, profileRevision }
  );
}

function quarantinedRevisionError(state: MemoryRuntimeRevisionState): NormalizedMemoryError {
  return memoryError(
    'MEMORY_PROVIDER_UNAVAILABLE',
    `Memory profile revision is quarantined: ${state.profileRevision}`,
    false,
    {
      quarantined: true,
      capabilityDrift: true,
      profileRevision: state.profileRevision,
      providerRevision: state.providerRevision,
    }
  );
}
