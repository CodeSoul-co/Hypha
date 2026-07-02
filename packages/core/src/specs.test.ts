import { describe, expect, it } from 'vitest';
import {
  createFrameworkEvent,
  denyExternalEffectsPolicyEngine,
  FrameworkError,
  formatFrameworkId,
  assertSpecSchemaDefinition,
  coreSpecJsonSchemas,
  InMemoryEventStore,
  traceSpecDefinition,
  validateHarnessedAgentSystemSpec,
  validateTraceSpec,
} from './index';

describe('@hypha/core contracts', () => {
  it('formats stable hypha ids', () => {
    expect(formatFrameworkId({ prefix: 'run', value: 'abc' })).toBe('run_abc');
  });

  it('keeps errors structured', () => {
    const error = new FrameworkError({
      code: 'TEST_ERROR',
      message: 'failed',
      context: { runId: 'run_1' },
    });
    expect(error.code).toBe('TEST_ERROR');
    expect(error.context?.runId).toBe('run_1');
  });

  it('records structured events as source of truth', async () => {
    const store = new InMemoryEventStore();
    await store.append(
      createFrameworkEvent({
        id: 'event_1',
        type: 'run.started',
        runId: 'run_1',
        sessionId: 'session_1',
        payload: { userId: 'owner' },
      })
    );

    await expect(store.list({ sessionId: 'session_1' })).resolves.toHaveLength(1);
  });

  it('denies external side effects by default', async () => {
    await expect(
      denyExternalEffectsPolicyEngine.evaluate({
        runId: 'run_1',
        sideEffectLevel: 'irreversible',
      })
    ).resolves.toMatchObject({ allowed: false });
  });

  it('exports parseable Stage1 core spec schemas and examples', () => {
    expect(validateTraceSpec(traceSpecDefinition.example)).toMatchObject({
      id: 'trace.default',
    });
    expect(validateHarnessedAgentSystemSpec({
      id: 'system.default',
      version: '0.0.0',
      agentRef: { id: 'agent.default' },
      fsmProcessRef: { id: 'fsm.react.default' },
      traceRef: { id: 'trace.default' },
    })).toMatchObject({ id: 'system.default' });
    expect(coreSpecJsonSchemas.TraceSpec.required).toContain('eventTypes');
    expect(coreSpecJsonSchemas.HarnessedAgentSystemSpec.required).toContain('agentRef');
  });

  it('detects spec JSON schema/example drift for required fields', () => {
    expect(() =>
      assertSpecSchemaDefinition({
        ...traceSpecDefinition,
        jsonSchema: {
          ...traceSpecDefinition.jsonSchema,
          required: ['id', 'version', 'missingField'],
          properties: {
            ...traceSpecDefinition.jsonSchema.properties,
            missingField: { type: 'string' },
          },
        },
      })
    ).toThrow(/missing required property/);
  });
});
