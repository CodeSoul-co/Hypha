import { describe, expect, it } from 'vitest';
import {
  createFrameworkEvent,
  createPolicySpecEngine,
  denyExternalEffectsPolicyEngine,
  FrameworkError,
  formatFrameworkId,
  assertSpecSchemaDefinition,
  coreSpecJsonSchemas,
  InMemoryAppendOnlyEventStore,
  InMemoryEventStore,
  contextSpecDefinition,
  deploymentSpecDefinition,
  evaluationSpecDefinition,
  outputContractSpecDefinition,
  policySpecDefinition,
  regressionSpecDefinition,
  replaySpecDefinition,
  traceSpecDefinition,
  validateContextSpec,
  validateDeploymentSpec,
  validateEvaluationSpec,
  validateHarnessedAgentSystemSpec,
  validateOutputContractSpec,
  validatePolicySpec,
  validateRegressionSpec,
  validateReplaySpec,
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
    await store.append(
      createFrameworkEvent({
        id: 'event_2',
        type: 'context.compacted',
        runId: 'run_1',
        sessionId: 'session_1',
        payload: { previousTokenCount: 4096, nextTokenCount: 1024 },
      })
    );
    await store.append(
      createFrameworkEvent({
        id: 'event_3',
        type: 'human.review.approved',
        runId: 'run_1',
        sessionId: 'session_1',
        payload: { reviewerId: 'owner' },
      })
    );

    await expect(store.list({ sessionId: 'session_1' })).resolves.toHaveLength(3);
    await expect(store.list({ type: 'context.compacted' })).resolves.toMatchObject([
      { id: 'event_2', payload: { nextTokenCount: 1024 } },
    ]);
    await expect(store.list({ type: 'human.review.approved' })).resolves.toMatchObject([
      { id: 'event_3', payload: { reviewerId: 'owner' } },
    ]);
  });

  it('supports append-only event streams with revisions and idempotency', async () => {
    const store = new InMemoryAppendOnlyEventStore();
    const first = await store.appendToStream(
      createFrameworkEvent({
        id: 'event_1',
        type: 'run.created',
        runId: 'run_append_only',
        sessionId: 'session_append_only',
        streamId: 'run_append_only',
        correlationId: 'correlation_1',
        payload: { input: 'start' },
      }),
      { expectedStreamSequence: 0, idempotencyKey: 'create-run' }
    );
    const duplicate = await store.appendToStream(
      createFrameworkEvent({
        id: 'event_1_duplicate',
        type: 'run.created',
        runId: 'run_append_only',
        sessionId: 'session_append_only',
        streamId: 'run_append_only',
        correlationId: 'correlation_1',
        payload: { input: 'start' },
      }),
      { idempotencyKey: 'create-run' }
    );

    expect(first).toMatchObject({
      status: 'appended',
      streamId: 'run_append_only',
      streamSequence: 1,
      globalSequence: 1,
    });
    expect(duplicate).toMatchObject({
      status: 'duplicate',
      streamId: 'run_append_only',
      streamSequence: 1,
      globalSequence: 1,
    });
    await expect(store.getStreamRevision('run_append_only')).resolves.toBe(1);
    await expect(store.list({ correlationId: 'correlation_1' })).resolves.toHaveLength(1);
    await expect(
      store.appendToStream(
        createFrameworkEvent({
          id: 'event_2',
          type: 'run.started',
          runId: 'run_append_only',
          streamId: 'run_append_only',
          payload: {},
        }),
        { expectedStreamSequence: 0 }
      )
    ).rejects.toMatchObject({ code: 'EVENT_STREAM_REVISION_CONFLICT' });
  });

  it('denies external side effects by default', async () => {
    await expect(
      denyExternalEffectsPolicyEngine.evaluate({
        runId: 'run_1',
        sideEffectLevel: 'irreversible',
      })
    ).resolves.toMatchObject({ allowed: false });
  });

  it('evaluates basic PolicySpec rules by side effect and scope', async () => {
    const engine = createPolicySpecEngine({
      id: 'policy.tools',
      version: '0.0.0',
      defaultEffect: 'deny',
      rules: [
        {
          id: 'policy.rule.read',
          version: '0.0.0',
          effect: 'allow',
          sideEffectLevels: ['read'],
        },
        {
          id: 'policy.rule.approve-files',
          version: '0.0.0',
          effect: 'require_human_review',
          sideEffectLevels: ['write'],
          scopes: ['filesystem:write'],
        },
      ],
    });

    await expect(
      engine.evaluate({
        runId: 'run_policy',
        capabilityId: 'search',
        sideEffectLevel: 'read',
      })
    ).resolves.toMatchObject({
      allowed: true,
      ruleId: 'policy.rule.read',
    });

    await expect(
      engine.evaluate({
        runId: 'run_policy',
        capabilityId: 'filesystem',
        sideEffectLevel: 'write',
        metadata: { permissionScope: ['filesystem:write'] },
      })
    ).resolves.toMatchObject({
      allowed: true,
      requiresHumanReview: true,
      ruleId: 'policy.rule.approve-files',
    });

    await expect(
      engine.evaluate({
        runId: 'run_policy',
        capabilityId: 'delete',
        sideEffectLevel: 'irreversible',
      })
    ).resolves.toMatchObject({
      allowed: false,
      policyId: 'policy.tools',
    });
  });

  it('exports parseable core spec schemas and examples', () => {
    expect(validatePolicySpec(policySpecDefinition.example).id).toBe('policy.default');
    expect(validateOutputContractSpec(outputContractSpecDefinition.example).id).toBe(
      'output.default'
    );
    expect(validateContextSpec(contextSpecDefinition.example).id).toBe('context.default');
    expect(validateTraceSpec(traceSpecDefinition.example)).toMatchObject({
      id: 'trace.default',
    });
    expect(validateEvaluationSpec(evaluationSpecDefinition.example).id).toBe('evaluation.default');
    expect(validateReplaySpec(replaySpecDefinition.example).id).toBe('replay.default');
    expect(validateRegressionSpec(regressionSpecDefinition.example).id).toBe('regression.default');
    expect(validateDeploymentSpec(deploymentSpecDefinition.example).id).toBe('deployment.local');
    expect(
      validateHarnessedAgentSystemSpec({
        id: 'system.default',
        version: '0.0.0',
        agentRef: { id: 'agent.default' },
        fsmProcessRef: { id: 'fsm.react.default' },
        traceRef: { id: 'trace.default' },
        mcpRefs: [{ id: 'mcp.default' }],
        contextRefs: [{ id: 'context.default' }],
        reasoningRefs: [{ id: 'reasoning.default' }],
        outputContractRefs: [{ id: 'output.default' }],
        businessRuleRefs: [{ id: 'rule.output-contract' }],
      })
    ).toMatchObject({
      id: 'system.default',
      mcpRefs: [{ id: 'mcp.default' }],
      contextRefs: [{ id: 'context.default' }],
      reasoningRefs: [{ id: 'reasoning.default' }],
      outputContractRefs: [{ id: 'output.default' }],
      businessRuleRefs: [{ id: 'rule.output-contract' }],
    });
    expect(coreSpecJsonSchemas.PolicySpec.required).toContain('rules');
    expect(coreSpecJsonSchemas.OutputContractSpec.required).toContain('schema');
    expect(coreSpecJsonSchemas.ContextSpec.required).toContain('sources');
    expect(coreSpecJsonSchemas.TraceSpec.required).toContain('eventTypes');
    expect(coreSpecJsonSchemas.EvaluationSpec.required).toContain('type');
    expect(coreSpecJsonSchemas.EvaluationSpec.allOf).toBeDefined();
    expect(coreSpecJsonSchemas.ReplaySpec.required).toEqual(['id', 'version']);
    expect(coreSpecJsonSchemas.RegressionSpec.required).toContain('requiredChecks');
    expect(coreSpecJsonSchemas.RegressionSpec.properties?.fixtureRefs).toMatchObject({
      minItems: 1,
    });
    expect(coreSpecJsonSchemas.DeploymentSpec.required).toContain('mode');
    expect(coreSpecJsonSchemas.HarnessedAgentSystemSpec.required).toContain('agentRef');
    expect(coreSpecJsonSchemas.HarnessedAgentSystemSpec.properties).toMatchObject({
      mcpRefs: { type: 'array' },
      contextRefs: { type: 'array' },
      reasoningRefs: { type: 'array' },
      outputContractRefs: { type: 'array' },
      businessRuleRefs: { type: 'array' },
    });
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

  it('rejects underspecified deterministic evaluation and regression specs', () => {
    expect(() =>
      validateEvaluationSpec({
        id: 'eval.schema',
        version: '0.0.0',
        type: 'schema',
        deterministic: true,
      })
    ).toThrow(/requires rubric/);

    expect(() =>
      validateRegressionSpec({
        id: 'regression.empty',
        version: '0.0.0',
        fixtureRefs: [],
        requiredChecks: [],
      })
    ).toThrow();
  });
});
