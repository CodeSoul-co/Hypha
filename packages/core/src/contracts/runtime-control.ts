import type { RuntimeJsonValue } from './runtime-helpers';
import type { RuntimeOrchestrationProjection } from './runtime-projection';
import type { RuntimePrincipal, RuntimeScope } from './runtime';

export const RUNTIME_CONTROL_KINDS = ['pause', 'resume', 'signal'] as const;
export const RUNTIME_CONTROL_DISPOSITIONS = ['applied', 'reused', 'lease_unavailable'] as const;

export type RuntimeControlKind = (typeof RUNTIME_CONTROL_KINDS)[number];
export type RuntimeControlDisposition = (typeof RUNTIME_CONTROL_DISPOSITIONS)[number];

interface RuntimeRunControlCommandBase {
  commandId: string;
  scope: RuntimeScope;
  principal: RuntimePrincipal;
  ownerId: string;
  leaseTtlMs: number;
  idempotencyKey?: string;
}

export interface RuntimePauseCommand extends RuntimeRunControlCommandBase {
  kind: 'pause';
  reason: string;
  resumeKey?: string;
  requestedAt: string;
}

export interface RuntimeResumeCommand extends RuntimeRunControlCommandBase {
  kind: 'resume';
  key?: string;
  payload?: RuntimeJsonValue;
  requestedAt: string;
}

export interface RuntimeSignalCommand extends RuntimeRunControlCommandBase {
  kind: 'signal';
  key: string;
  payload: RuntimeJsonValue;
  sentAt: string;
}

export type RuntimeRunControlCommand =
  | RuntimePauseCommand
  | RuntimeResumeCommand
  | RuntimeSignalCommand;

export interface RuntimeRunControlResult {
  commandId: string;
  kind: RuntimeControlKind;
  disposition: RuntimeControlDisposition;
  eventIds: string[];
  runRevision: number;
  projection: RuntimeOrchestrationProjection;
}
