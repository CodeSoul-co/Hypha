import type { CommandExecutionStatus, ExecutionResourceUsage } from './command-execution';
import type { NormalizedExecutionError } from './execution';
import type { ExecutionRecoveryDisposition } from './execution-store';
import type { SandboxCapabilityName } from './sandbox-provider';
import type { SandboxStatus } from './sandbox';
import type { EventCreateInput, FrameworkEvent } from '../events';

export type SandboxFrameworkEventType =
  | 'sandbox.create.requested'
  | 'sandbox.created'
  | 'sandbox.started'
  | 'sandbox.ready'
  | 'sandbox.degraded'
  | 'sandbox.terminate.requested'
  | 'sandbox.terminated'
  | 'sandbox.cleanup.completed'
  | 'sandbox.cleanup.failed';

export type CommandExecutionFrameworkEventType =
  | 'command.execution.requested'
  | 'command.execution.validated'
  | 'command.execution.approval.required'
  | 'command.execution.queued'
  | 'command.execution.started'
  | 'command.execution.output.truncated'
  | 'command.execution.resource.exceeded'
  | 'command.execution.oom_killed'
  | 'command.execution.timeout'
  | 'command.execution.cancellation.requested'
  | 'command.execution.cancelled'
  | 'command.execution.completed'
  | 'command.execution.failed'
  | 'command.execution.result.unknown'
  | 'command.execution.recovered';

export type NetworkAuthorizationFrameworkEventType =
  | 'network.authorization.requested'
  | 'network.authorization.granted'
  | 'network.authorization.denied'
  | 'network.authorization.revoked';

export type ExecutionFrameworkEventType =
  | SandboxFrameworkEventType
  | CommandExecutionFrameworkEventType
  | NetworkAuthorizationFrameworkEventType;

export interface ExecutionEventPayloadBase {
  operationId?: string;
  executionId?: string;
  sandboxId?: string;
  workspaceId?: string;
  environmentId?: string;
  environmentRevision?: string;
  commandHash?: string;
  sourceTreeHash?: string;
  artifactRefs?: string[];
  status?: string;
  latencyMs?: number;
  resourceUsage?: ExecutionResourceUsage;
  error?: NormalizedExecutionError;
  metadata?: Record<string, unknown>;
}

export interface SandboxLifecycleEventPayload extends ExecutionEventPayloadBase {
  sandboxId?: string;
  providerId?: string;
  providerSandboxRef?: string;
  status?: SandboxStatus | 'degraded';
  missingCapabilities?: SandboxCapabilityName[];
}

export interface CommandExecutionEventPayload extends ExecutionEventPayloadBase {
  executionId: string;
  revision?: number;
  providerId?: string;
  status?: CommandExecutionStatus;
  exitCode?: number | null;
  signal?: string;
  outputStream?: 'stdout' | 'stderr';
  outputTruncated?: boolean;
  approvalRef?: string;
  recoveryDisposition?: ExecutionRecoveryDisposition;
}

export interface NetworkAuthorizationEventPayload extends ExecutionEventPayloadBase {
  authorizationId: string;
  networkPolicyHash: string;
  decision: 'requested' | 'granted' | 'denied' | 'revoked';
  expiresAt?: string;
  reason?: string;
}

export type ExecutionEventPayloadMap = {
  [K in SandboxFrameworkEventType]: SandboxLifecycleEventPayload;
} & {
  [K in CommandExecutionFrameworkEventType]: CommandExecutionEventPayload;
} & {
  [K in NetworkAuthorizationFrameworkEventType]: NetworkAuthorizationEventPayload;
};

export type ExecutionFrameworkEvent<
  TType extends ExecutionFrameworkEventType = ExecutionFrameworkEventType,
> = Omit<FrameworkEvent<ExecutionEventPayloadMap[TType]>, 'type'> & { type: TType };

export type ExecutionEventCreateInput<
  TType extends ExecutionFrameworkEventType = ExecutionFrameworkEventType,
> = Omit<EventCreateInput<ExecutionEventPayloadMap[TType]>, 'type'> & { type: TType };
