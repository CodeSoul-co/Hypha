import {
  FrameworkError,
  InMemoryEventSchemaRegistry,
  hashCanonicalJson,
  registerRuntimeOrchestrationEventSchemas,
  runtimeEventSchemaDefinitions,
  type EventStore,
} from '@hypha/core';
import { DurableEventStoreBridge } from '@hypha/harness';
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
  migration: CanonicalEventFamilyMigrationReport;
}

/**
 * Owns the Server cutover from compatibility Events to the canonical Runtime
 * store. Migration and bounded replay complete before the merged EventStore is
 * exposed, so request handling cannot race an unaudited event authority.
 */
export class ServerCanonicalRuntime {
  private readonly lifecycle: RuntimeBackboneLifecycle;
  private bridge?: DurableEventStoreBridge;
  private migration?: CanonicalEventFamilyMigrationReport;
  private composition?: Readonly<ServerCanonicalRuntimeComposition>;
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
          const legacyEvents = await options.legacyEvents.list();
          if (legacyEvents.length > maxLegacyEvents) {
            throw failure(
              'RUNTIME_INTEGRITY_LIMIT_EXCEEDED',
              `Legacy Runtime migration exceeded ${maxLegacyEvents} Events`
            );
          }

          const bridge = new DurableEventStoreBridge({ events: backbone.events });
          const migration = await migrateCanonicalEventFamilies({
            sourceEvents: legacyEvents,
            canonical: bridge,
          });
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
    this.composition = Object.freeze({
      backbone,
      events: new OrchestrationEventStore({
        legacy: this.options.legacyEvents,
        canonical: () => this.requireBridge(),
      }),
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

  isInitialized(): boolean {
    return !this.closed && this.composition !== undefined;
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    this.composition = undefined;
    this.bridge = undefined;
    await this.lifecycle.close();
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
