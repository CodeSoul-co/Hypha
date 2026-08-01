import type { SpecRef } from '../specs';

export const CONTINUE_REACT_COMMAND_PAYLOAD_VERSION = '1.0.0' as const;
export const REACT_QUANTUM_DESCRIPTOR_VERSION = '1.0.0' as const;

export interface ReActGlobalBudget {
  iterations: number;
  modelCalls: number;
  toolCalls: number;
  totalTokens: number;
}

export interface ContinueReActCommandPayloadV1 {
  version: typeof CONTINUE_REACT_COMMAND_PAYLOAD_VERSION;
  runId: string;
  sessionId: string;
  userId: string;
  stepId: string;
  checkpointRef: string;
  checkpointHash: string;
  checkpointSequence: number;
  scopeHash: string;
  agentRef: SpecRef;
  domainPackRef: SpecRef;
  workflowRef?: SpecRef;
  promptSnapshotRef: string;
  promptSnapshotHash: string;
  capabilitySnapshotRef: string;
  capabilitySnapshotHash: string;
  memoryContextRef?: string;
  workspaceRef?: string;
  executionRef?: string;
  pendingOperationReceipts?: string[];
  globalBudget: ReActGlobalBudget;
  deadlineAt?: string;
  cancellationRevision: number;
  createdAt: string;
}

export type ContinueReActCommandPayload = ContinueReActCommandPayloadV1;

export interface ReActQuantumDescriptorBase {
  version: typeof REACT_QUANTUM_DESCRIPTOR_VERSION;
  runId: string;
  sessionId: string;
  userId: string;
  stepId: string;
  scopeHash: string;
  agentRef: SpecRef;
  domainPackRef: SpecRef;
  workflowRef?: SpecRef;
  promptSnapshotRef: string;
  promptSnapshotHash: string;
  capabilitySnapshotRef: string;
  capabilitySnapshotHash: string;
  memoryContextRef?: string;
  workspaceRef?: string;
  executionRef?: string;
  pendingOperationReceipts?: string[];
  globalBudget: ReActGlobalBudget;
  deadlineAt?: string;
  cancellationRevision: number;
  createdAt: string;
}

export interface InitialReActQuantumDescriptor extends ReActQuantumDescriptorBase {
  trigger: 'initial';
}

export interface ContinuationReActQuantumDescriptor extends ReActQuantumDescriptorBase {
  trigger: 'continuation';
  commandId: string;
  commandPayloadHash: string;
  claimToken: string;
  leaseEpoch: number;
  checkpointRef: string;
  checkpointHash: string;
  checkpointSequence: number;
}

export type ReActQuantumDescriptor =
  | InitialReActQuantumDescriptor
  | ContinuationReActQuantumDescriptor;
