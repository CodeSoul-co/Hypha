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

export const RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES = [
  ...RUNTIME_ORCHESTRATION_EVENT_TYPES,
  'runtime.checkpoint.created',
  'runtime.checkpoint.failed',
  'fsm.transition.requested',
  'fsm.transition.rejected',
  'human.review.requested',
  'human.review.approved',
  'human.review.rejected',
  'human.review.expired',
  'human.review.cancelled',
  'human.review.resume.started',
  'human.review.resume.revalidated',
  'human.review.resume.failed',
  'human.review.resolved',
] as const satisfies readonly FrameworkEventType[];

export type RuntimeServiceEmittableEventType =
  (typeof RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES)[number];

/**
 * Event families emitted directly by the Harness RunManager.
 *
 * This list is the migration boundary for the canonical Server RunManager.
 * Module-owned events such as Tool, Model, and Memory observations are not
 * included and must be written through their owning event ports.
 */
export const RUNTIME_RUN_MANAGER_EVENT_TYPES = [
  'session.created',
  'run.created',
  'run.started',
  'run.waiting_human',
  'run.completed',
  'run.failed',
  'run.cancelled',
  'fsm.transition.accepted',
  'fsm.state.entered',
  'human.review.requested',
  'human.review.approved',
  'human.review.rejected',
  'context.build.started',
  'context.build.completed',
  'context.compacted',
  'skill.selected',
  'skill.loaded',
  'skill.completed',
  'thinking.started',
  'thinking.completed',
  'agent.deliberation.started',
  'agent.deliberation.completed',
  'reasoning.decision.recorded',
  'react.step.completed',
] as const satisfies readonly FrameworkEventType[];

export type RuntimeRunManagerEventType = (typeof RUNTIME_RUN_MANAGER_EVENT_TYPES)[number];

export type RuntimeCanonicalEventType =
  | RuntimeServiceEmittableEventType
  | RuntimeRunManagerEventType;

export const RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES = RUNTIME_RUN_MANAGER_EVENT_TYPES.filter(
  (eventType) =>
    !RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES.includes(eventType as RuntimeServiceEmittableEventType)
) as readonly RuntimeRunManagerEventType[];

export const RUNTIME_CANONICAL_EVENT_TYPES = Array.from(
  new Set<FrameworkEventType>([
    ...RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES,
    ...RUNTIME_RUN_MANAGER_EVENT_TYPES,
  ])
) as readonly RuntimeCanonicalEventType[];

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

const payloadSchemas: Record<RuntimeCanonicalEventType, JsonSchema> = {
  'session.created': payload(['id', 'userId', 'metadata', 'status', 'createdAt', 'updatedAt'], {
    id: stringSchema,
    userId: stringSchema,
    domainPackRef: jsonValueSchema,
    sessionProfileRef: jsonValueSchema,
    metadata: metadataSchema,
    status: { type: 'string', enum: ['active', 'closed'] },
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
  }),
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
  'runtime.checkpoint.created': checkpointPayload(),
  'runtime.checkpoint.failed': checkpointPayload(),
  'recovery.case.opened': recoveryCasePayload(),
  'recovery.case.resolved': recoveryCasePayload(),
  'recovery.case.escalated': recoveryCasePayload(),
  'fsm.transition.requested': transitionPayload(),
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
  'fsm.transition.rejected': transitionPayload(),
  'human.review.requested': humanReviewPayload(),
  'human.review.approved': humanReviewPayload(),
  'human.review.rejected': humanReviewPayload(),
  'human.review.expired': humanReviewPayload(),
  'human.review.cancelled': humanReviewPayload(),
  'human.review.resume.started': humanReviewPayload(),
  'human.review.resume.revalidated': humanReviewPayload(),
  'human.review.resume.failed': humanReviewPayload(),
  'human.review.resolved': humanReviewPayload(),
  'context.build.started': openPayload(),
  'context.build.completed': openPayload(),
  'context.compacted': openPayload(),
  'skill.selected': openPayload(),
  'skill.loaded': openPayload(),
  'skill.completed': openPayload(),
  'thinking.started': openPayload(),
  'thinking.completed': openPayload(),
  'agent.deliberation.started': openPayload(),
  'agent.deliberation.completed': openPayload(),
  'reasoning.decision.recorded': openPayload(),
  'react.step.completed': openPayload(),
};

export const runtimeEventSchemaDefinitions: readonly EventSchemaDefinition[] = Object.freeze(
  RUNTIME_CANONICAL_EVENT_TYPES.map((eventType) => {
    const schema = payloadSchemas[eventType];
    return Object.freeze({
      eventType,
      version: RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION,
      schema,
      schemaHash: hashCanonicalJson(schema),
    });
  })
);

export const runtimeOrchestrationEventSchemaDefinitions: readonly EventSchemaDefinition[] =
  Object.freeze(
    runtimeEventSchemaDefinitions.filter((definition) =>
      RUNTIME_ORCHESTRATION_EVENT_TYPES.includes(
        definition.eventType as RuntimeOrchestrationEventType
      )
    )
  );

export async function registerRuntimeOrchestrationEventSchemas(
  registry: EventSchemaRegistry
): Promise<void> {
  assertRuntimeEventCatalogComplete();
  for (const definition of runtimeEventSchemaDefinitions) {
    await registry.register(definition);
  }
}

export function assertRuntimeEventCatalogComplete(
  definitions: readonly EventSchemaDefinition[] = runtimeEventSchemaDefinitions,
  requiredEventTypes: readonly RuntimeCanonicalEventType[] = RUNTIME_CANONICAL_EVENT_TYPES
): void {
  const definitionsByType = new Map<string, EventSchemaDefinition[]>();
  for (const definition of definitions) {
    const current = definitionsByType.get(definition.eventType) ?? [];
    current.push(definition);
    definitionsByType.set(definition.eventType, current);
  }
  const missing = requiredEventTypes.filter((eventType) => !definitionsByType.has(eventType));
  const duplicated = requiredEventTypes.filter(
    (eventType) => (definitionsByType.get(eventType)?.length ?? 0) !== 1
  );
  if (missing.length > 0 || duplicated.length > 0) {
    throw new Error(
      `Runtime Event catalog is incomplete: missing=${missing.join(',') || 'none'}; ` +
        `nonUnique=${duplicated.join(',') || 'none'}`
    );
  }
}

function payload(required: string[], properties: Record<string, JsonSchema>): JsonSchema {
  return { type: 'object', required, properties, additionalProperties: true };
}

function openPayload(): JsonSchema {
  return payload([], {});
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

function checkpointPayload(): JsonSchema {
  return payload(['checkpointId'], {
    checkpointId: stringSchema,
    checkpointSequence: integerSchema,
    lastEventSequence: integerSchema,
    projectionVersion: stringSchema,
    currentState: stringSchema,
    reason: stringSchema,
    requestHash: stringSchema,
    checksum: stringSchema,
    error: stringSchema,
  });
}

function transitionPayload(): JsonSchema {
  return payload(['from', 'to'], {
    commandId: stringSchema,
    commandHash: stringSchema,
    from: stringSchema,
    to: stringSchema,
    reason: stringSchema,
    guard: jsonValueSchema,
    variablesPatch: metadataSchema,
  });
}

function humanReviewPayload(): JsonSchema {
  return payload([], {
    taskId: stringSchema,
    invocationId: stringSchema,
    requestId: stringSchema,
    taskKind: stringSchema,
    subjectRef: stringSchema,
    subjectHash: stringSchema,
    status: stringSchema,
    decidedBy: stringSchema,
    decidedAt: timestampSchema,
    expiresAt: timestampSchema,
    reason: stringSchema,
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
