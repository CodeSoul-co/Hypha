import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  ExecutionCancelRequest,
} from './command-execution';
import type { ProviderHealth } from './execution';
import type {
  ExecutionEnvironmentSpec,
  SandboxCleanupRequest,
  SandboxCreateRequest,
  SandboxProviderCapabilities,
  SandboxRecord,
  SandboxStartRequest,
  SandboxStatusRequest,
  SandboxTerminateRequest,
} from './sandbox';

export type SandboxCapabilityName = keyof SandboxProviderCapabilities;

export interface SandboxCapabilityRequirement {
  capability: SandboxCapabilityName;
  source: 'environment' | 'command' | 'policy' | 'runtime';
  reason: string;
}

export interface SandboxCapabilityNegotiationRequest {
  providerId: string;
  capabilities: SandboxProviderCapabilities;
  requirements: SandboxCapabilityRequirement[];
  evaluatedAt: string;
}

export interface SandboxCapabilityNegotiationResult {
  providerId: string;
  compatible: boolean;
  capabilities: SandboxProviderCapabilities;
  requirements: SandboxCapabilityRequirement[];
  missingCapabilities: SandboxCapabilityName[];
  evaluatedAt: string;
}

export interface SandboxCapabilityDerivationInput {
  environment: ExecutionEnvironmentSpec;
  command?: Pick<CommandExecutionRequest, 'snapshotBefore' | 'snapshotAfter' | 'snapshotOnFailure'>;
  additionalRequirements?: SandboxCapabilityRequirement[];
}

export interface SandboxProvider {
  readonly id: string;
  capabilities(): Promise<SandboxProviderCapabilities>;
  create(request: SandboxCreateRequest): Promise<SandboxRecord>;
  start(request: SandboxStartRequest): Promise<SandboxRecord>;
  execute(request: CommandExecutionRequest): Promise<CommandExecutionResult>;
  cancel(request: ExecutionCancelRequest): Promise<void>;
  terminate(request: SandboxTerminateRequest): Promise<void>;
  status(request: SandboxStatusRequest): Promise<SandboxRecord | null>;
  cleanup(request: SandboxCleanupRequest): Promise<void>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}

export type SandboxProviderType = ExecutionEnvironmentSpec['provider'];

/**
 * Composition-root contract for constructing a configured SandboxProvider.
 * Concrete adapters own their options; core only knows the provider type and stable id.
 */
export interface SandboxProviderFactory {
  readonly providerType: SandboxProviderType;
  readonly providerId: string;
  create(): SandboxProvider | Promise<SandboxProvider>;
}

export type SandboxProviderSelection = Pick<ExecutionEnvironmentSpec, 'provider' | 'providerRef'>;
