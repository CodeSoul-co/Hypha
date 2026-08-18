# `@codesoul-co/hypha-core` / `specs`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/specs.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)
- Exports: **28**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowAllPolicyEngine` | constant | <code>const allowAllPolicyEngine: PolicyEngine</code> | allow All Policy Engine constant exported by the `specs` module. |
| `denyExternalEffectsPolicyEngine` | constant | <code>const denyExternalEffectsPolicyEngine: PolicyEngine</code> | deny External Effects Policy Engine constant exported by the `specs` module. |
| `assertVersionedSpec` | function | <code>assertVersionedSpec(spec: VersionedSpec, label?: string): void</code> | Asserts Versioned Spec at this module boundary. |
| `createPolicySpecEngine` | function | <code>createPolicySpecEngine(policy: PolicySpec): PolicyEngine</code> | Creates Policy Spec Engine at this module boundary. |
| `AuditPolicySpec` | interface | <code>interface AuditPolicySpec</code> | Field contract for Audit Policy Spec; see all contract members below. |
| `ContextSourceSpec` | interface | <code>interface ContextSourceSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Context Source Spec; see all contract members below. |
| `ContextSpec` | interface | <code>interface ContextSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Context Spec; see all contract members below. |
| `DeploymentSpec` | interface | <code>interface DeploymentSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Deployment Spec; see all contract members below. |
| `EvaluationSpec` | interface | <code>interface EvaluationSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Evaluation Spec; see all contract members below. |
| `HarnessedAgentSystemSpec` | interface | <code>interface HarnessedAgentSystemSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Harnessed Agent System Spec; see all contract members below. |
| `HumanReviewPolicySpec` | interface | <code>interface HumanReviewPolicySpec</code> | Field contract for Human Review Policy Spec; see all contract members below. |
| `JsonSchema` | interface | <code>interface JsonSchema</code> | JSON Schema for . |
| `OutputContractSpec` | interface | <code>interface OutputContractSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Output Contract Spec; see all contract members below. |
| `PolicyDecision` | interface | <code>interface PolicyDecision</code> | Field contract for Policy Decision; see all contract members below. |
| `PolicyEngine` | interface | <code>interface PolicyEngine</code> | Field contract for Policy Engine; see all contract members below. |
| `PolicyEvaluationContext` | interface | <code>interface PolicyEvaluationContext</code> | Field contract for Policy Evaluation Context; see all contract members below. |
| `PolicyRuleSpec` | interface | <code>interface PolicyRuleSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Policy Rule Spec; see all contract members below. |
| `PolicySpec` | interface | <code>interface PolicySpec extends VersionedSpec, SpecMetadata</code> | Field contract for Policy Spec; see all contract members below. |
| `RegressionSpec` | interface | <code>interface RegressionSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Regression Spec; see all contract members below. |
| `ReplaySpec` | interface | <code>interface ReplaySpec extends VersionedSpec, SpecMetadata</code> | Field contract for Replay Spec; see all contract members below. |
| `RetryPolicySpec` | interface | <code>interface RetryPolicySpec</code> | Field contract for Retry Policy Spec; see all contract members below. |
| `SpecMetadata` | interface | <code>interface SpecMetadata</code> | Field contract for Spec Metadata; see all contract members below. |
| `SpecRef` | interface | <code>interface SpecRef</code> | Field contract for Spec Ref; see all contract members below. |
| `TimeoutPolicySpec` | interface | <code>interface TimeoutPolicySpec</code> | Field contract for Timeout Policy Spec; see all contract members below. |
| `TraceSpec` | interface | <code>interface TraceSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Trace Spec; see all contract members below. |
| `VersionedSpec` | interface | <code>interface VersionedSpec</code> | Field contract for Versioned Spec; see all contract members below. |
| `RiskLevel` | type | <code>type RiskLevel = 'low' &#124; 'medium' &#124; 'high' &#124; 'critical'</code> | Public type alias for Risk Level. |
| `SideEffectLevel` | type | <code>type SideEffectLevel = 'none' &#124; 'read' &#124; 'write' &#124; 'external_effect' &#124; 'irreversible'</code> | Public type alias for Side Effect Level. |

## `AuditPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `includeInput` | property | <code>includeInput: boolean</code> | Public include Input property. |
| `includeOutput` | property | <code>includeOutput: boolean</code> | Public include Output property. |
| `redactPaths` | property | <code>redactPaths: string[]</code> | Public redact Paths property. |

## `ContextSourceSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `provenanceRequired` | property | <code>provenanceRequired: boolean</code> | Public provenance Required property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |
| `type` | property | <code>type: "memory" &#124; "artifact" &#124; "skill" &#124; "domain" &#124; "mcp" &#124; "user_input" &#124; "system"</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ContextSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `instructionBoundaryPolicy` | property | <code>instructionBoundaryPolicy: "none" &#124; "strict" &#124; "tagged"</code> | Public instruction Boundary Policy property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `provenancePolicy` | property | <code>provenancePolicy: "none" &#124; "required" &#124; "best_effort"</code> | Public provenance Policy property. |
| `sources` | property | <code>sources: ContextSourceSpec[]</code> | Public sources property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `tokenBudget` | property | <code>tokenBudget: number</code> | Public token Budget property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `DeploymentSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `configRefs` | property | <code>configRefs: SpecRef[]</code> | Public config Refs property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mode` | property | <code>mode: "local" &#124; "self_hosted" &#124; "managed"</code> | Public mode property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `runtimeMode` | property | <code>runtimeMode: "single-user" &#124; "multi-user"</code> | Public runtime Mode property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `EvaluationSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `deterministic` | property | <code>deterministic: boolean</code> | Public deterministic property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `rubric` | property | <code>rubric: JsonSchema</code> | Public rubric property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `type` | property | <code>type: "schema" &#124; "output_contract" &#124; "tool_trace" &#124; "policy" &#124; "process" &#124; "cost" &#124; "latency" &#124; "regression" &#124; "human"</code> | Public type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `HarnessedAgentSystemSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `businessRuleRefs` | property | <code>businessRuleRefs: SpecRef[]</code> | Public business Rule Refs property. |
| `contextRefs` | property | <code>contextRefs: SpecRef[]</code> | Public context Refs property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deploymentRef` | property | <code>deploymentRef: SpecRef</code> | Public deployment Ref property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `evaluationRefs` | property | <code>evaluationRefs: SpecRef[]</code> | Public evaluation Refs property. |
| `fsmProcessRef` | property | <code>fsmProcessRef: SpecRef</code> | Public fsm Process Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mcpRefs` | property | <code>mcpRefs: SpecRef[]</code> | Public mcp Refs property. |
| `memoryRefs` | property | <code>memoryRefs: SpecRef[]</code> | Public memory Refs property. |
| `modelProfileRef` | property | <code>modelProfileRef: SpecRef</code> | Public model Profile Ref property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `outputContractRefs` | property | <code>outputContractRefs: SpecRef[]</code> | Public output Contract Refs property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `policyRefs` | property | <code>policyRefs: SpecRef[]</code> | Public policy Refs property. |
| `reasoningRefs` | property | <code>reasoningRefs: SpecRef[]</code> | Public reasoning Refs property. |
| `regressionRef` | property | <code>regressionRef: SpecRef</code> | Public regression Ref property. |
| `replayRef` | property | <code>replayRef: SpecRef</code> | Public replay Ref property. |
| `skillRefs` | property | <code>skillRefs: SpecRef[]</code> | Public skill Refs property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `toolRefs` | property | <code>toolRefs: SpecRef[]</code> | Public tool Refs property. |
| `traceRef` | property | <code>traceRef: SpecRef</code> | Public trace Ref property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `HumanReviewPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approverRole` | property | <code>approverRole: string</code> | Public approver Role property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `timeoutPolicy` | property | <code>timeoutPolicy: TimeoutPolicySpec</code> | Public timeout Policy property. |

## `JsonSchema` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `additionalProperties` | property | <code>additionalProperties: boolean &#124; JsonSchema</code> | Public additional Properties property. |
| `enum` | property | <code>enum: unknown[]</code> | Public enum property. |
| `items` | property | <code>items: JsonSchema</code> | Public items property. |
| `properties` | property | <code>properties: Record&lt;string, JsonSchema&gt;</code> | Public properties property. |
| `required` | property | <code>required: string[]</code> | Public required property. |
| `type` | property | <code>type: string</code> | Public type property. |

## `OutputContractSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `schema` | property | <code>schema: JsonSchema</code> | Public schema property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `PolicyDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public allowed property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `policyId` | property | <code>policyId: string</code> | Public policy Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public requires Human Review property. |
| `ruleId` | property | <code>ruleId: string</code> | Public rule Id property. |

## `PolicyEngine` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(context: PolicyEvaluationContext): Promise&lt;PolicyDecision&gt;</code> | Evaluates evaluate at this module boundary. |

## `PolicyEvaluationContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `PolicyRuleSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `effect` | property | <code>effect: "allow" &#124; "deny" &#124; "require_human_review"</code> | Public effect property. |
| `expression` | property | <code>expression: string</code> | Public expression property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `scopes` | property | <code>scopes: string[]</code> | Public scopes property. |
| `sideEffectLevels` | property | <code>sideEffectLevels: SideEffectLevel[]</code> | Public side Effect Levels property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `PolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaultEffect` | property | <code>defaultEffect: "allow" &#124; "deny"</code> | Public default Effect property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `rules` | property | <code>rules: PolicyRuleSpec[]</code> | Public rules property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `RegressionSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `fixtureRefs` | property | <code>fixtureRefs: SpecRef[]</code> | Public fixture Refs property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `requiredChecks` | property | <code>requiredChecks: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | Public required Checks property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ReplaySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `captureMemoryReadSet` | property | <code>captureMemoryReadSet: boolean</code> | Public capture Memory Read Set property. |
| `captureModelIO` | property | <code>captureModelIO: boolean</code> | Public capture Model IO property. |
| `capturePolicyDecisions` | property | <code>capturePolicyDecisions: boolean</code> | Public capture Policy Decisions property. |
| `captureToolIO` | property | <code>captureToolIO: boolean</code> | Public capture Tool IO property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `snapshotPolicy` | property | <code>snapshotPolicy: "none" &#124; "state_path" &#124; "full"</code> | Public snapshot Policy property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `RetryPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backoffMs` | property | <code>backoffMs: number</code> | Public backoff Ms property. |
| `jitterRatio` | property | <code>jitterRatio: number</code> | Public jitter Ratio property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `maxBackoffMs` | property | <code>maxBackoffMs: number</code> | Public max Backoff Ms property. |
| `maxElapsedMs` | property | <code>maxElapsedMs: number</code> | Public max Elapsed Ms property. |
| `retryableCodes` | property | <code>retryableCodes: string[]</code> | Public retryable Codes property. |

## `SpecMetadata` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `SpecRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `TimeoutPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `onTimeout` | property | <code>onTimeout: "fail" &#124; "retry" &#124; "human_review"</code> | Public on Timeout property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `TraceSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public event Types property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `redactionPolicy` | property | <code>redactionPolicy: string</code> | Public redaction Policy property. |
| `retentionPolicy` | property | <code>retentionPolicy: string</code> | Public retention Policy property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `VersionedSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `version` | property | <code>version: string</code> | Public version property. |
