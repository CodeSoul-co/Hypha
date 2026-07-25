export const RUNTIME_ACTIVITY_DESCRIPTOR_VERSION = '1.0.0' as const;

export const RUNTIME_ACTIVITY_KINDS = [
  'react_quantum',
  'tool',
  'memory',
  'execution',
  'mcp',
  'policy',
] as const;

export type RuntimeActivityKind = (typeof RUNTIME_ACTIVITY_KINDS)[number];

export interface RuntimeActivityDescriptor {
  version: typeof RUNTIME_ACTIVITY_DESCRIPTOR_VERSION;
  activityId: string;
  activityKind: RuntimeActivityKind;
  runId: string;
  stateId: string;
  stateAttempt: number;
  operationId: string;
  inputRef: string;
  inputHash: string;
  providerRef?: string;
  providerRevision?: string;
  idempotencyKey: string;
  deadlineAt?: string;
}
