import { describe, expect, it } from 'vitest';
import type { EventCreateInput } from '../../events';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import {
  RUNTIME_ORCHESTRATION_EVENT_TYPES,
  registerRuntimeOrchestrationEventSchemas,
  runtimeOrchestrationEventSchemaDefinitions,
} from './orchestration-event-schemas';

describe('Runtime orchestration Event schemas', () => {
  it('publishes one hash-verified definition per canonical Event type', () => {
    expect(runtimeOrchestrationEventSchemaDefinitions).toHaveLength(
      RUNTIME_ORCHESTRATION_EVENT_TYPES.length
    );
    expect(new Set(RUNTIME_ORCHESTRATION_EVENT_TYPES).size).toBe(
      RUNTIME_ORCHESTRATION_EVENT_TYPES.length
    );
    for (const definition of runtimeOrchestrationEventSchemaDefinitions) {
      expect(definition.schemaHash).toBe(hashCanonicalJson(definition.schema));
    }
  });

  it('registers idempotently and validates concrete lifecycle payloads', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registerRuntimeOrchestrationEventSchemas(registry);
    await registerRuntimeOrchestrationEventSchemas(registry);

    await expect(registry.validate(event('run.created', { runId: 'run.schema' }))).resolves.toEqual(
      expect.objectContaining({ valid: true })
    );
    await expect(
      registry.validate(
        event('runtime.wait.created', {
          waitId: 'wait.schema',
          stateId: 'HumanReview',
          stateAttempt: 1,
          wait: { type: 'human', reason: 'approval required' },
          createdAt: '2026-07-21T09:00:00.000Z',
        })
      )
    ).resolves.toEqual(expect.objectContaining({ valid: true }));
  });

  it('rejects missing orchestration evidence and unregistered Event types', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registerRuntimeOrchestrationEventSchemas(registry);

    const missingRunId = await registry.validate(event('run.created', {}));
    expect(missingRunId).toMatchObject({
      valid: false,
      issues: [expect.objectContaining({ path: '$.runId', code: 'required' })],
    });
    await expect(
      registry.validate(event('inference.requested', { requestId: 'request.schema' }))
    ).resolves.toMatchObject({
      valid: false,
      issues: [expect.objectContaining({ code: 'schema_not_registered' })],
    });
  });
});

function event(type: EventCreateInput['type'], payload: unknown): EventCreateInput {
  return {
    id: `event.${type}`,
    type,
    version: '1.0.0',
    tenantId: 'tenant.schema',
    userId: 'user.schema',
    runId: 'run.schema',
    timestamp: '2026-07-21T09:00:00.000Z',
    payload,
  };
}
