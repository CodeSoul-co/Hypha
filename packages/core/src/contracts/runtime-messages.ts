import type { RuntimePrincipal, NormalizedRuntimeError } from './runtime';

export const RUNTIME_MESSAGE_TYPES = [
  'runtime.command.start',
  'runtime.command.resume',
  'runtime.command.cancel',
  'runtime.signal',
  'runtime.timer.fire',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.activity.failed',
  'runtime.agent.message',
  'runtime.child.completed',
  'runtime.projection.rebuild',
  'runtime.recovery.requested',
  'runtime.custom',
] as const;

export const RUNTIME_INBOX_STATUSES = ['processing', 'applied', 'ignored', 'failed'] as const;
export const RUNTIME_OUTBOX_STATES = [
  'pending',
  'publishing',
  'published',
  'failed',
  'dead_letter',
] as const;

export type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number];
export type RuntimeMessageInboxStatus = (typeof RUNTIME_INBOX_STATUSES)[number];
export type RuntimeMessageOutboxState = (typeof RUNTIME_OUTBOX_STATES)[number];

export interface RuntimeMessageEnvelope<TPayload = unknown> {
  messageId: string;
  messageType: RuntimeMessageType;
  schemaVersion: string;
  topic: string;
  partitionKey: string;
  orderingKey?: string;
  sequence?: number;
  tenantId?: string;
  workspaceId?: string;
  userId?: string;
  sessionId?: string;
  runId?: string;
  stepId?: string;
  activityId?: string;
  agentId?: string;
  correlationId?: string;
  causationId?: string;
  traceId?: string;
  principal?: RuntimePrincipal;
  payload: TPayload;
  payloadHash: string;
  priority?: number;
  availableAt?: string;
  expiresAt?: string;
  publishedAt: string;
  producerId: string;
  producerRevision?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeMessageEnvelopeInput<TPayload = unknown> extends Omit<
  RuntimeMessageEnvelope<TPayload>,
  'payloadHash' | 'sequence'
> {
  payloadHash?: string;
  sequence?: number;
}

export interface RuntimeMessageInboxRecord {
  consumerId: string;
  messageId: string;
  payloadHash: string;
  status: RuntimeMessageInboxStatus;
  appliedEventIds?: string[];
  firstReceivedAt: string;
  lastReceivedAt: string;
  attempts: number;
  expiresAt?: string;
  processingOwner?: string;
  processingExpiresAt?: string;
  lastError?: NormalizedRuntimeError;
}

export interface RuntimeMessageOutboxRecord {
  id: string;
  eventId?: string;
  messageId: string;
  topic: string;
  partitionKey: string;
  envelope: RuntimeMessageEnvelope;
  state: RuntimeMessageOutboxState;
  attempts: number;
  availableAt: string;
  leaseOwner?: string;
  leaseExpiresAt?: string;
  lastError?: NormalizedRuntimeError;
  createdAt: string;
  updatedAt: string;
}
