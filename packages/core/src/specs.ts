export interface VersionedSpec {
  id: string;
  version: string;
}

export interface SpecRef {
  id: string;
  version?: string;
}

export interface SpecMetadata {
  name?: string;
  description?: string;
  owner?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface JsonSchema {
  type?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: unknown[];
  additionalProperties?: boolean | JsonSchema;
  [key: string]: unknown;
}

export type SideEffectLevel = 'none' | 'read' | 'write' | 'external_effect' | 'irreversible';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface TimeoutPolicySpec {
  timeoutMs: number;
  onTimeout?: 'fail' | 'retry' | 'human_review';
}

export interface RetryPolicySpec {
  maxAttempts: number;
  backoffMs?: number;
  retryableCodes?: string[];
}

export interface AuditPolicySpec {
  enabled: boolean;
  includeInput?: boolean;
  includeOutput?: boolean;
  redactPaths?: string[];
}

export interface HumanReviewPolicySpec {
  required: boolean;
  reason?: string;
  approverRole?: string;
  timeoutPolicy?: TimeoutPolicySpec;
}

export interface PolicyRuleSpec extends VersionedSpec, SpecMetadata {
  effect: 'allow' | 'deny' | 'require_human_review';
  expression?: string;
  sideEffectLevels?: SideEffectLevel[];
  scopes?: string[];
}

export interface PolicySpec extends VersionedSpec, SpecMetadata {
  rules: PolicyRuleSpec[];
  defaultEffect?: 'allow' | 'deny';
}

export interface PolicyDecision {
  allowed: boolean;
  requiresHumanReview?: boolean;
  policyId?: string;
  ruleId?: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface PolicyEvaluationContext<TInput = unknown> {
  runId: string;
  stepId?: string;
  userId?: string;
  capabilityId?: string;
  sideEffectLevel?: SideEffectLevel;
  input?: TInput;
  metadata?: Record<string, unknown>;
}

export interface PolicyEngine {
  evaluate(context: PolicyEvaluationContext): Promise<PolicyDecision>;
}

export const allowAllPolicyEngine: PolicyEngine = {
  async evaluate(): Promise<PolicyDecision> {
    return { allowed: true };
  },
};

export const denyExternalEffectsPolicyEngine: PolicyEngine = {
  async evaluate(context: PolicyEvaluationContext): Promise<PolicyDecision> {
    const sideEffectLevel = context.sideEffectLevel;
    const denied = sideEffectLevel === 'external_effect' || sideEffectLevel === 'irreversible';
    return denied
      ? {
          allowed: false,
          policyId: 'default-deny-external-effects',
          reason: `Side effect level ${sideEffectLevel} requires an explicit policy override.`,
        }
      : { allowed: true };
  },
};

export interface OutputContractSpec extends VersionedSpec, SpecMetadata {
  schema: JsonSchema;
}

export interface ContextSourceSpec extends VersionedSpec, SpecMetadata {
  type: 'memory' | 'artifact' | 'skill' | 'domain' | 'mcp' | 'user_input' | 'system';
  provenanceRequired?: boolean;
  trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
}

export interface ContextSpec extends VersionedSpec, SpecMetadata {
  sources: ContextSourceSpec[];
  tokenBudget?: number;
  provenancePolicy?: 'required' | 'best_effort' | 'none';
  instructionBoundaryPolicy?: 'strict' | 'tagged' | 'none';
}

export interface TraceSpec extends VersionedSpec, SpecMetadata {
  eventTypes: string[];
  retentionPolicy?: string;
  redactionPolicy?: string;
}

export interface EvaluationSpec extends VersionedSpec, SpecMetadata {
  type:
    | 'schema'
    | 'output_contract'
    | 'tool_trace'
    | 'policy'
    | 'process'
    | 'cost'
    | 'latency'
    | 'regression'
    | 'human';
  rubric?: JsonSchema;
  deterministic?: boolean;
}

export interface ReplaySpec extends VersionedSpec, SpecMetadata {
  captureModelIO?: boolean;
  captureToolIO?: boolean;
  captureMemoryReadSet?: boolean;
  capturePolicyDecisions?: boolean;
  snapshotPolicy?: 'none' | 'state_path' | 'full';
}

export interface RegressionSpec extends VersionedSpec, SpecMetadata {
  fixtureRefs: SpecRef[];
  requiredChecks: Array<'event_types' | 'state_path' | 'tool_calls' | 'policy_decisions' | 'output_contract'>;
}

export interface DeploymentSpec extends VersionedSpec, SpecMetadata {
  mode: 'local' | 'self_hosted' | 'managed';
  runtimeMode?: 'single-user' | 'multi-user';
  configRefs?: SpecRef[];
}

export interface HarnessedAgentSystemSpec extends VersionedSpec, SpecMetadata {
  agentRef: SpecRef;
  fsmProcessRef: SpecRef;
  traceRef: SpecRef;
  policyRefs?: SpecRef[];
  memoryRefs?: SpecRef[];
  toolRefs?: SpecRef[];
  skillRefs?: SpecRef[];
  modelProfileRef?: SpecRef;
  evaluationRefs?: SpecRef[];
  replayRef?: SpecRef;
  regressionRef?: SpecRef;
  deploymentRef?: SpecRef;
}

export function assertVersionedSpec(spec: VersionedSpec, label = 'spec'): void {
  if (!spec.id || !spec.version) {
    throw new Error(`${label} must include id and version`);
  }
}
