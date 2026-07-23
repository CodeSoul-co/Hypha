import type { FrameworkEventType } from '../../events';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import type { EventSchemaDefinition, EventSchemaRegistry } from './event-schema-registry';

export const RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION = '1.0.0';

export const RUNTIME_ORCHESTRATION_EVENT_TYPES = [
  'run.created',
  'run.started',
  'run.resume.requested',
  'run.resumed',
  'run.cancel.requested',
  'run.cancelling',
  'run.waiting_human',
  'run.waiting_signal',
  'run.waiting_timer',
  'run.paused',
  'run.completed',
  'run.failed',
  'run.cancelled',
  'runtime.wait.created',
  'runtime.wait.resolved',
  'runtime.signal.received',
  'runtime.timer.created',
  'runtime.timer.fired',
  'runtime.cancellation.propagated',
  'runtime.cancellation.failed',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.activity.failed',
  'runtime.activity.waiting',
  'runtime.activity.cancelled',
  'recovery.case.opened',
  'recovery.case.resolved',
  'recovery.case.escalated',
  'fsm.state.entered',
  'fsm.state.exited',
  'fsm.transition.accepted',
] as const satisfies readonly FrameworkEventType[];

export type RuntimeOrchestrationEventType = (typeof RUNTIME_ORCHESTRATION_EVENT_TYPES)[number];

const stringSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampSchema: JsonSchema = { type: 'string', format: 'date-time' };
const integerSchema: JsonSchema = { type: 'integer', minimum: 1 };
const jsonValueSchema: JsonSchema = {};
const metadataSchema: JsonSchema = { type: 'object', additionalProperties: jsonValueSchema };
const waitSchema: JsonSchema = {
  type: 'object',
  required: ['type'],
  properties: {
    type: { type: 'string', enum: ['human', 'signal', 'timer', 'pause'] },
    key: stringSchema,
    expectedSchema: { type: 'object', additionalProperties: true },
    expiresAt: timestampSchema,
    timeoutTransitionId: stringSchema,
    pendingActionRef: stringSchema,
    reason: stringSchema,
    metadata: metadataSchema,
  },
  additionalProperties: false,
};
const resumeSchema: JsonSchema = {
  type: 'object',
  required: ['commandId', 'kind', 'waitId', 'principalId', 'resumedAt'],
  properties: {
    commandId: stringSchema,
    kind: { type: 'string', enum: ['manual', 'signal', 'timer'] },
    waitId: stringSchema,
    principalId: stringSchema,
    key: stringSchema,
    payload: jsonValueSchema,
    resumedAt: timestampSchema,
  },
  additionalProperties: false,
};

const payloadSchemas: Record<RuntimeOrchestrationEventType, JsonSchema> = {
  'run.created': payload(['runId'], { runId: stringSchema }),
  'run.started': payload(['runId'], { runId: stringSchema, input: jsonValueSchema }),
  'run.resume.requested': payload(['commandId', 'waitId'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    waitId: stringSchema,
  }),
  'run.resumed': payload(['commandId', 'resume'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    resume: resumeSchema,
  }),
  'run.cancel.requested': payload(['commandId', 'principalId', 'reason', 'requestedAt'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    principalId: stringSchema,
    reason: stringSchema,
    requestedAt: timestampSchema,
    policy: jsonValueSchema,
    command: jsonValueSchema,
  }),
  'run.cancelling': payload(['commandId'], {
    commandId: stringSchema,
    commandHash: stringSchema,
  }),
  'run.waiting_human': waitingRunPayload(),
  'run.waiting_signal': waitingRunPayload(),
  'run.waiting_timer': waitingRunPayload(),
  'run.paused': waitingRunPayload(),
  'run.completed': terminalRunPayload(),
  'run.failed': terminalRunPayload(),
  'run.cancelled': terminalRunPayload(),
  'runtime.wait.created': payload(['waitId', 'stateId', 'stateAttempt', 'wait', 'createdAt'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    waitId: stringSchema,
    stateId: stringSchema,
    stateAttempt: integerSchema,
    wait: waitSchema,
    createdAt: timestampSchema,
  }),
  'runtime.wait.resolved': payload(['waitId'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    waitId: stringSchema,
    resolution: { type: 'string', enum: ['manual', 'signal', 'timer', 'cancelled', 'expired'] },
    resolvedAt: timestampSchema,
  }),
  'runtime.signal.received': payload(['waitId', 'key'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    signalId: stringSchema,
    waitId: stringSchema,
    key: stringSchema,
    payload: jsonValueSchema,
    principalId: stringSchema,
    sentAt: timestampSchema,
  }),
  'runtime.timer.created': payload(['timerId', 'waitId', 'fireAt'], {
    timerId: stringSchema,
    waitId: stringSchema,
    fireAt: timestampSchema,
  }),
  'runtime.timer.fired': payload(['timerId', 'waitId', 'firedAt'], {
    timerId: stringSchema,
    waitId: stringSchema,
    scheduledFor: timestampSchema,
    firedAt: timestampSchema,
  }),
  'runtime.cancellation.propagated': cancellationPropagationPayload(),
  'runtime.cancellation.failed': cancellationPropagationPayload(),
  'runtime.activity.requested': activityPayload(),
  'runtime.activity.completed': activityPayload(),
  'runtime.activity.failed': activityPayload(),
  'runtime.activity.waiting': activityPayload(),
  'runtime.activity.cancelled': activityPayload(),
  'recovery.case.opened': recoveryCasePayload(),
  'recovery.case.resolved': recoveryCasePayload(),
  'recovery.case.escalated': recoveryCasePayload(),
  'fsm.state.entered': payload(['stateId'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    stateId: stringSchema,
    fromState: stringSchema,
    reason: stringSchema,
    observation: jsonValueSchema,
  }),
  'fsm.state.exited': payload(['stateId'], { stateId: stringSchema }),
  'fsm.transition.accepted': payload(['from', 'to'], {
    commandId: stringSchema,
    from: stringSchema,
    to: stringSchema,
    guard: jsonValueSchema,
    reason: stringSchema,
    variablesPatch: metadataSchema,
  }),
};

export const runtimeOrchestrationEventSchemaDefinitions: readonly EventSchemaDefinition[] =
  Object.freeze(
    RUNTIME_ORCHESTRATION_EVENT_TYPES.map((eventType) => {
      const schema = payloadSchemas[eventType];
      return Object.freeze({
        eventType,
        version: RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION,
        schema,
        schemaHash: hashCanonicalJson(schema),
      });
    })
  );

export async function registerRuntimeOrchestrationEventSchemas(
  registry: EventSchemaRegistry
): Promise<void> {
  for (const definition of runtimeOrchestrationEventSchemaDefinitions) {
    await registry.register(definition);
  }
}

function payload(required: string[], properties: Record<string, JsonSchema>): JsonSchema {
  return { type: 'object', required, properties, additionalProperties: true };
}

function waitingRunPayload(): JsonSchema {
  return payload(['waitId'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    waitId: stringSchema,
    stateId: stringSchema,
    wait: waitSchema,
    reason: stringSchema,
  });
}

function terminalRunPayload(): JsonSchema {
  return payload(['terminalState'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    terminalState: stringSchema,
    output: jsonValueSchema,
    error: jsonValueSchema,
    reason: stringSchema,
    targetResults: { type: 'array', items: jsonValueSchema },
    unresolvedActivityIds: { type: 'array', items: stringSchema },
  });
}

function cancellationPropagationPayload(): JsonSchema {
  return payload(['commandId', 'result'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    result: jsonValueSchema,
  });
}

function activityPayload(): JsonSchema {
  return payload(['activityId'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    activityId: stringSchema,
    status: stringSchema,
    result: jsonValueSchema,
    error: jsonValueSchema,
  });
}

function recoveryCasePayload(): JsonSchema {
  return payload(
    [
      'caseId',
      'rootFingerprint',
      'status',
      'cycles',
      'candidateId',
      'candidateHash',
      'reason',
      'safeAction',
    ],
    {
      caseId: stringSchema,
      rootFingerprint: stringSchema,
      status: { type: 'string', enum: ['active', 'recovered', 'suspended'] },
      cycles: integerSchema,
      candidateId: stringSchema,
      candidateHash: stringSchema,
      reason: stringSchema,
      safeAction: stringSchema,
      disposition: {
        type: 'string',
        enum: ['recovered', 'requeued', 'requires_review'],
      },
      activityStatus: stringSchema,
      providerRevision: stringSchema,
      receiptId: stringSchema,
    }
  );
}
