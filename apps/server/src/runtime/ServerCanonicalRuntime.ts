import {
  FrameworkError,
  InMemoryEventSchemaRegistry,
  RuntimeCancellationService,
  RuntimeHumanWaitService,
  hashCanonicalJson,
  registerRuntimeOrchestrationEventSchemas,
  runtimeEventSchemaDefinitions,
  type EventStore,
  type RuntimeActivityCancellationPort,
  type RuntimeCancelCommand,
  type RuntimeCancelResult,
  type RuntimeChildRunCancellationPort,
} from '@codesoul-co/hypha-core';
import { DurableEventStoreBridge } from '@codesoul-co/hypha-harness';
import { randomUUID } from 'crypto';
import {
  BoundedCanonicalRuntimeAudit,
  type CanonicalRuntimeAuditLimits,
} from './BoundedCanonicalRuntimeAudit';
import {
  OrchestrationEventStore,
  migrateCanonicalEventFamilies,
  type CanonicalEventFamilyMigrationReport,
} from './OrchestrationEventStore';
import { createRuntimeBackbone, type RuntimeBackbone } from './RuntimeBackbone';
import { RuntimeBackboneLifecycle } from './RuntimeBackboneLifecycle';
import type { RuntimeComposition } from './RuntimeCompositionRoot';
import {
  createServerRuntimeComposition,
  type ServerRuntimeCompositionBindings,
} from './ServerRuntimeComposition';
import {
  ServerRuntimeWorkerLifecycle,
  type ServerRuntimeWorkerBindings,
  type ServerRuntimeWorkers,
} from './ServerRuntimeWorkerLifecycle';

const projectionRevision = 'runtime-orchestration-projection:1.0.0';
const streamFingerprintRevision = 'runtime-stream-fingerprint:1.0.0';

export interface ServerCanonicalRuntimeOptions {
  filename: string;
  legacyEvents: EventStore;
  auditLimits: CanonicalRuntimeAuditLimits;
  maxLegacyEvents?: number;
  now?: () => string;
  monotonicNow?: () => number;
}

export interface ServerCanonicalRuntimeComposition {
  backbone: RuntimeBackbone;
  events: OrchestrationEventStore;
  humanWaits: RuntimeHumanWaitService;
  migration: CanonicalEventFamilyMigrationReport;
}

export type ServerRuntimeExecutionState =
  | 'not_initialized'
  | 'event_authority_ready'
  | 'execution_graph_ready'
  | 'maintenance_workers_running'
  | 'workers_running'
  | 'closed';

export interface ServerRuntimeExecutionReadiness {
  ready: boolean;
  state: ServerRuntimeExecutionState;
  message: string;
}

export interface ServerRuntimeCancellationBindings {
  activities: RuntimeActivityCancellationPort;
  children: RuntimeChildRunCancellationPort;
}

/**
 * Owns the Server cutover from compatibility Events to the canonical Runtime
 * store. Migration and bounded replay complete before the merged EventStore is
 * exposed, so request handling cannot race an unaudited event authority.
 */
export class ServerCanonicalRuntime {
  private readonly lifecycle: RuntimeBackboneLifecycle;
  private readonly runtimeInstanceId = randomUUID();
  private bridgeLeaseSequence = 0;
  private bridge?: DurableEventStoreBridge;
  private migration?: CanonicalEventFamilyMigrationReport;
  private composition?: Readonly<ServerCanonicalRuntimeComposition>;
  private runtimeComposition?: Readonly<RuntimeComposition>;
  private cancellations?: RuntimeCancellationService;
  private workerLifecycle?: ServerRuntimeWorkerLifecycle;
  private closePromise?: Promise<void>;
  private closed = false;

  constructor(private readonly options: ServerCanonicalRuntimeOptions) {
    const maxLegacyEvents = positiveInteger(
      options.maxLegacyEvents ?? options.auditLimits.maxEvents,
      'maxLegacyEvents'
    );
    this.lifecycle = new RuntimeBackboneLifecycle(
      async () => {
        const schemas = new InMemoryEventSchemaRegistry();
        await registerRuntimeOrchestrationEventSchemas(schemas);
        return createRuntimeBackbone({
          filename: options.filename,
          schemaRegistry: schemas,
          ...(options.now === undefined ? {} : { now: options.now }),
        });
      },
      {
        audit: async (backbone, signal) => {
          const reset = await backbone.eventStore.resetUnauditedImportedEvents();
          if (reset.reason === 'non_imported_events') {
            throw failure(
              'RUNTIME_EVENT_STREAM_CORRUPT',
              'Unaudited canonical Runtime history contains non-imported Events'
            );
          }
          const legacyEvents = await options.legacyEvents.list();
          if (legacyEvents.length > maxLegacyEvents) {
            throw failure(
              'RUNTIME_INTEGRITY_LIMIT_EXCEEDED',
              `Legacy Runtime migration exceeded ${maxLegacyEvents} Events`
            );
          }

          const bridge = new DurableEventStoreBridge({
            events: backbone.events,
            coordination: {
              runLeases: backbone.runLeases,
              ownerId: `server-canonical-runtime:${process.pid}`,
              leaseTtlMs: 30_000,
              nextId: (namespace) =>
                `${namespace}:${this.runtimeInstanceId}:${++this.bridgeLeaseSequence}`,
              ...(options.now === undefined ? {} : { now: options.now }),
            },
          });
          const migrationResult = await migrateCanonicalEventFamilies({
            sourceEvents: legacyEvents,
            canonical: bridge,
          });
          const migration = {
            ...migrationResult,
            resetImportedEvents: reset.deletedEvents,
          };
          if (migration.quarantinedEvents > 0) {
            throw failure(
              'RUNTIME_EVENT_STREAM_CORRUPT',
              'Legacy Runtime migration quarantined one or more canonical Events',
              { migration }
            );
          }

          const audit = new BoundedCanonicalRuntimeAudit({
            scanner: backbone.eventStore,
            integrityStore: backbone.integrityStore,
            limits: options.auditLimits,
            projectionRevision,
            schemaCatalogHash: runtimeSchemaCatalogHash(),
            streamFingerprintRevision,
            ...(options.now === undefined ? {} : { now: options.now }),
            ...(options.monotonicNow === undefined ? {} : { monotonicNow: options.monotonicNow }),
          });
          await audit.audit({ signal });
          this.bridge = bridge;
          this.migration = migration;
        },
      }
    );
  }

  async initialize(signal?: AbortSignal): Promise<Readonly<ServerCanonicalRuntimeComposition>> {
    this.assertOpen();
    if (this.composition) return this.composition;

    const backbone = await this.lifecycle.initialize(signal);
    if (!this.bridge || !this.migration) {
      throw failure(
        'RUNTIME_STARTUP_INCOMPLETE',
        'Canonical Runtime startup completed without migration and audit evidence'
      );
    }
    const humanWaits = new RuntimeHumanWaitService({
      events: backbone.events,
      projections: backbone.projections,
      projectionStore: backbone.projectionStore,
      runLeases: backbone.runLeases,
      nextId: (namespace) => `${namespace}:${this.runtimeInstanceId}:${++this.bridgeLeaseSequence}`,
      ...(this.options.now === undefined ? {} : { now: this.options.now }),
    });
    this.composition = Object.freeze({
      backbone,
      events: new OrchestrationEventStore({
        legacy: this.options.legacyEvents,
        canonical: () => this.requireBridge(),
      }),
      humanWaits,
      migration: this.migration,
    });
    return this.composition;
  }

  get(): Readonly<ServerCanonicalRuntimeComposition> {
    this.assertOpen();
    if (!this.composition) {
      throw failure('RUNTIME_STARTUP_INCOMPLETE', 'Canonical Runtime is not initialized');
    }
    return this.composition;
  }

  /**
   * Composes the execution graph only after canonical migration and audit have
   * established the authoritative Event and coordination dependencies.
   */
  composeRuntime(bindings: ServerRuntimeCompositionBindings): Readonly<RuntimeComposition> {
    this.assertOpen();
    if (this.runtimeComposition) return this.runtimeComposition;

    const canonical = this.get();
    this.runtimeComposition = createServerRuntimeComposition({
      ...bindings,
      backbone: canonical.backbone,
      mergedEvents: canonical.events,
    });
    return this.runtimeComposition;
  }

  composeCancellations(bindings: ServerRuntimeCancellationBindings): RuntimeCancellationService {
    this.assertOpen();
    if (this.cancellations) return this.cancellations;
    const canonical = this.get();
    const backbone = canonical.backbone;
    this.cancellations = new RuntimeCancellationService({
      events: backbone.events,
      projections: backbone.projections,
      projectionStore: backbone.projectionStore,
      runLeases: backbone.runLeases,
      commands: backbone.sessionQueue,
      activities: bindings.activities,
      children: bindings.children,
      nextId: (namespace) => `${namespace}:${this.runtimeInstanceId}:${++this.bridgeLeaseSequence}`,
      ...(this.options.now === undefined ? {} : { now: this.options.now }),
    });
    return this.cancellations;
  }

  cancel(command: RuntimeCancelCommand): Promise<RuntimeCancelResult> {
    this.assertOpen();
    if (!this.cancellations) {
      throw failure(
        'RUNTIME_STATE_EXECUTION_UNAVAILABLE',
        'Canonical Runtime cancellation service is not composed'
      );
    }
    return this.cancellations.cancel(command);
  }

  /**
   * Starts the durable Runtime pollers only after the audited execution graph
   * has been composed. The returned workers are owned by this service.
   */
  startWorkers(bindings: ServerRuntimeWorkerBindings): Promise<Readonly<ServerRuntimeWorkers>> {
    this.assertOpen();
    if (!this.runtimeComposition) {
      throw failure(
        'RUNTIME_STARTUP_INCOMPLETE',
        'Canonical Runtime execution graph is not composed'
      );
    }
    if (!this.workerLifecycle) {
      this.workerLifecycle = new ServerRuntimeWorkerLifecycle(this.runtimeComposition, bindings);
    }
    return this.workerLifecycle.start();
  }

  areWorkersRunning(): boolean {
    return this.workerLifecycle?.isRunning() ?? false;
  }

  /**
   * Reports product execution readiness separately from Event-store health.
   * A healthy Event authority is necessary, but it does not prove that the
   * execution graph or any durable worker loop is active.
   */
  executionReadiness(): Readonly<ServerRuntimeExecutionReadiness> {
    if (this.closed) {
      return Object.freeze({
        ready: false,
        state: 'closed',
        message: 'Canonical Runtime is closed',
      });
    }
    if (!this.composition) {
      return Object.freeze({
        ready: false,
        state: 'not_initialized',
        message: 'Canonical Runtime Event authority is not initialized',
      });
    }
    if (!this.runtimeComposition) {
      return Object.freeze({
        ready: false,
        state: 'event_authority_ready',
        message: 'Canonical Runtime execution graph is not composed',
      });
    }
    const workerStatus = this.workerLifecycle?.status();
    const continuousExecutionReady =
      workerStatus?.commands?.running === true &&
      workerStatus.commands.supportedCommandTypes.includes('continue_react');
    const continuationRepairReady = workerStatus?.continuations?.running === true;
    if (
      workerStatus?.timer.running === true &&
      workerStatus.recovery.running === true &&
      !continuousExecutionReady
    ) {
      return Object.freeze({
        ready: false,
        state: 'maintenance_workers_running',
        message:
          workerStatus.commands === undefined
            ? 'Canonical Runtime maintenance workers are running, but the durable Session Command worker is not configured'
            : 'Canonical Runtime Session Command worker is running, but continue_react is not composed',
      });
    }
    if (continuousExecutionReady && !continuationRepairReady) {
      return Object.freeze({
        ready: false,
        state: 'execution_graph_ready',
        message:
          'Canonical Runtime continuation command worker is running, but durable continuation reconciliation is not configured',
      });
    }
    if (!this.areWorkersRunning()) {
      return Object.freeze({
        ready: false,
        state: 'execution_graph_ready',
        message: 'Canonical Runtime durable execution workers are not running',
      });
    }
    return Object.freeze({
      ready: true,
      state: 'workers_running',
      message: 'Canonical Runtime execution graph and durable workers are running',
    });
  }

  isInitialized(): boolean {
    return !this.closed && this.composition !== undefined;
  }

  close(): Promise<void> {
    if (!this.closePromise) {
      this.closed = true;
      this.closePromise = this.closeInternal();
    }
    return this.closePromise;
  }

  private async closeInternal(): Promise<void> {
    const failures: unknown[] = [];
    try {
      await this.workerLifecycle?.close();
    } catch (error) {
      failures.push(error);
    }
    this.workerLifecycle = undefined;
    this.cancellations = undefined;
    this.runtimeComposition = undefined;
    this.composition = undefined;
    this.bridge = undefined;
    try {
      await this.lifecycle.close();
    } catch (error) {
      failures.push(error);
    }
    if (failures.length > 0) {
      throw new AggregateError(failures, 'One or more canonical Runtime shutdown phases failed');
    }
  }

  private requireBridge(): DurableEventStoreBridge {
    if (!this.bridge) {
      throw failure('RUNTIME_STARTUP_INCOMPLETE', 'Canonical Runtime Event bridge is unavailable');
    }
    return this.bridge;
  }

  private assertOpen(): void {
    if (this.closed) {
      throw failure('RUNTIME_RESOURCE_CONFLICT', 'Canonical Runtime is closed');
    }
  }
}

function runtimeSchemaCatalogHash(): string {
  return hashCanonicalJson(
    runtimeEventSchemaDefinitions.map(({ eventType, version, schemaHash }) => ({
      eventType,
      version,
      schemaHash,
    }))
  );
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: `${label} must be a positive integer`,
    });
  }
  return value;
}

function failure(
  code: ConstructorParameters<typeof FrameworkError>[0]['code'],
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({
    code,
    message,
    ...(context === undefined ? {} : { context }),
  });
}
