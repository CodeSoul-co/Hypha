# `@codesoul-co/hypha-core` / `specs`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/specs.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)
- 导出数: **28**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowAllPolicyEngine` | 常量 | <code>const allowAllPolicyEngine: PolicyEngine</code> | 由 `specs` 模块导出的 allow All Policy Engine 常量。 |
| `denyExternalEffectsPolicyEngine` | 常量 | <code>const denyExternalEffectsPolicyEngine: PolicyEngine</code> | 由 `specs` 模块导出的 deny External Effects Policy Engine 常量。 |
| `assertVersionedSpec` | 函数 | <code>assertVersionedSpec(spec: VersionedSpec, label?: string): void</code> | 断言 Versioned Spec。 |
| `createPolicySpecEngine` | 函数 | <code>createPolicySpecEngine(policy: PolicySpec): PolicyEngine</code> | 创建 Policy Spec Engine。 |
| `AuditPolicySpec` | 接口 | <code>interface AuditPolicySpec</code> | Audit Policy Spec 的字段契约；完整字段见下表。 |
| `ContextSourceSpec` | 接口 | <code>interface ContextSourceSpec extends VersionedSpec, SpecMetadata</code> | Context Source Spec 的字段契约；完整字段见下表。 |
| `ContextSpec` | 接口 | <code>interface ContextSpec extends VersionedSpec, SpecMetadata</code> | Context Spec 的字段契约；完整字段见下表。 |
| `DeploymentSpec` | 接口 | <code>interface DeploymentSpec extends VersionedSpec, SpecMetadata</code> | Deployment Spec 的字段契约；完整字段见下表。 |
| `EvaluationSpec` | 接口 | <code>interface EvaluationSpec extends VersionedSpec, SpecMetadata</code> | Evaluation Spec 的字段契约；完整字段见下表。 |
| `HarnessedAgentSystemSpec` | 接口 | <code>interface HarnessedAgentSystemSpec extends VersionedSpec, SpecMetadata</code> | Harnessed Agent System Spec 的字段契约；完整字段见下表。 |
| `HumanReviewPolicySpec` | 接口 | <code>interface HumanReviewPolicySpec</code> | Human Review Policy Spec 的字段契约；完整字段见下表。 |
| `JsonSchema` | 接口 | <code>interface JsonSchema</code> | 的 JSON Schema。 |
| `OutputContractSpec` | 接口 | <code>interface OutputContractSpec extends VersionedSpec, SpecMetadata</code> | Output Contract Spec 的字段契约；完整字段见下表。 |
| `PolicyDecision` | 接口 | <code>interface PolicyDecision</code> | Policy Decision 的字段契约；完整字段见下表。 |
| `PolicyEngine` | 接口 | <code>interface PolicyEngine</code> | Policy Engine 的字段契约；完整字段见下表。 |
| `PolicyEvaluationContext` | 接口 | <code>interface PolicyEvaluationContext</code> | Policy Evaluation Context 的字段契约；完整字段见下表。 |
| `PolicyRuleSpec` | 接口 | <code>interface PolicyRuleSpec extends VersionedSpec, SpecMetadata</code> | Policy Rule Spec 的字段契约；完整字段见下表。 |
| `PolicySpec` | 接口 | <code>interface PolicySpec extends VersionedSpec, SpecMetadata</code> | Policy Spec 的字段契约；完整字段见下表。 |
| `RegressionSpec` | 接口 | <code>interface RegressionSpec extends VersionedSpec, SpecMetadata</code> | Regression Spec 的字段契约；完整字段见下表。 |
| `ReplaySpec` | 接口 | <code>interface ReplaySpec extends VersionedSpec, SpecMetadata</code> | Replay Spec 的字段契约；完整字段见下表。 |
| `RetryPolicySpec` | 接口 | <code>interface RetryPolicySpec</code> | Retry Policy Spec 的字段契约；完整字段见下表。 |
| `SpecMetadata` | 接口 | <code>interface SpecMetadata</code> | Spec Metadata 的字段契约；完整字段见下表。 |
| `SpecRef` | 接口 | <code>interface SpecRef</code> | Spec Ref 的字段契约；完整字段见下表。 |
| `TimeoutPolicySpec` | 接口 | <code>interface TimeoutPolicySpec</code> | Timeout Policy Spec 的字段契约；完整字段见下表。 |
| `TraceSpec` | 接口 | <code>interface TraceSpec extends VersionedSpec, SpecMetadata</code> | Trace Spec 的字段契约；完整字段见下表。 |
| `VersionedSpec` | 接口 | <code>interface VersionedSpec</code> | Versioned Spec 的字段契约；完整字段见下表。 |
| `RiskLevel` | 类型 | <code>type RiskLevel = 'low' &#124; 'medium' &#124; 'high' &#124; 'critical'</code> | Risk Level 的公共类型别名。 |
| `SideEffectLevel` | 类型 | <code>type SideEffectLevel = 'none' &#124; 'read' &#124; 'write' &#124; 'external_effect' &#124; 'irreversible'</code> | Side Effect Level 的公共类型别名。 |

## `AuditPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `includeInput` | 属性 | <code>includeInput: boolean</code> | include Input 字段。 |
| `includeOutput` | 属性 | <code>includeOutput: boolean</code> | include Output 字段。 |
| `redactPaths` | 属性 | <code>redactPaths: string[]</code> | redact Paths 字段。 |

## `ContextSourceSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `provenanceRequired` | 属性 | <code>provenanceRequired: boolean</code> | provenance Required 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |
| `type` | 属性 | <code>type: "memory" &#124; "artifact" &#124; "skill" &#124; "domain" &#124; "mcp" &#124; "user_input" &#124; "system"</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ContextSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `instructionBoundaryPolicy` | 属性 | <code>instructionBoundaryPolicy: "none" &#124; "strict" &#124; "tagged"</code> | instruction Boundary Policy 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `provenancePolicy` | 属性 | <code>provenancePolicy: "none" &#124; "required" &#124; "best_effort"</code> | provenance Policy 字段。 |
| `sources` | 属性 | <code>sources: ContextSourceSpec[]</code> | sources 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `tokenBudget` | 属性 | <code>tokenBudget: number</code> | token Budget 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `DeploymentSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `configRefs` | 属性 | <code>configRefs: SpecRef[]</code> | config Refs 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mode` | 属性 | <code>mode: "local" &#124; "self_hosted" &#124; "managed"</code> | mode 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `runtimeMode` | 属性 | <code>runtimeMode: "single-user" &#124; "multi-user"</code> | runtime Mode 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `EvaluationSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `deterministic` | 属性 | <code>deterministic: boolean</code> | deterministic 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `rubric` | 属性 | <code>rubric: JsonSchema</code> | rubric 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `type` | 属性 | <code>type: "schema" &#124; "output_contract" &#124; "tool_trace" &#124; "policy" &#124; "process" &#124; "cost" &#124; "latency" &#124; "regression" &#124; "human"</code> | type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `HarnessedAgentSystemSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `businessRuleRefs` | 属性 | <code>businessRuleRefs: SpecRef[]</code> | business Rule Refs 字段。 |
| `contextRefs` | 属性 | <code>contextRefs: SpecRef[]</code> | context Refs 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deploymentRef` | 属性 | <code>deploymentRef: SpecRef</code> | deployment Ref 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: SpecRef[]</code> | evaluation Refs 字段。 |
| `fsmProcessRef` | 属性 | <code>fsmProcessRef: SpecRef</code> | fsm Process Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mcpRefs` | 属性 | <code>mcpRefs: SpecRef[]</code> | mcp Refs 字段。 |
| `memoryRefs` | 属性 | <code>memoryRefs: SpecRef[]</code> | memory Refs 字段。 |
| `modelProfileRef` | 属性 | <code>modelProfileRef: SpecRef</code> | model Profile Ref 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `outputContractRefs` | 属性 | <code>outputContractRefs: SpecRef[]</code> | output Contract Refs 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: SpecRef[]</code> | policy Refs 字段。 |
| `reasoningRefs` | 属性 | <code>reasoningRefs: SpecRef[]</code> | reasoning Refs 字段。 |
| `regressionRef` | 属性 | <code>regressionRef: SpecRef</code> | regression Ref 字段。 |
| `replayRef` | 属性 | <code>replayRef: SpecRef</code> | replay Ref 字段。 |
| `skillRefs` | 属性 | <code>skillRefs: SpecRef[]</code> | skill Refs 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `toolRefs` | 属性 | <code>toolRefs: SpecRef[]</code> | tool Refs 字段。 |
| `traceRef` | 属性 | <code>traceRef: SpecRef</code> | trace Ref 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `HumanReviewPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approverRole` | 属性 | <code>approverRole: string</code> | approver Role 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy: TimeoutPolicySpec</code> | timeout Policy 字段。 |

## `JsonSchema` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `additionalProperties` | 属性 | <code>additionalProperties: boolean &#124; JsonSchema</code> | additional Properties 字段。 |
| `enum` | 属性 | <code>enum: unknown[]</code> | enum 字段。 |
| `items` | 属性 | <code>items: JsonSchema</code> | items 字段。 |
| `properties` | 属性 | <code>properties: Record&lt;string, JsonSchema&gt;</code> | properties 字段。 |
| `required` | 属性 | <code>required: string[]</code> | required 字段。 |
| `type` | 属性 | <code>type: string</code> | type 字段。 |

## `OutputContractSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `schema` | 属性 | <code>schema: JsonSchema</code> | schema 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `PolicyDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | allowed 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `policyId` | 属性 | <code>policyId: string</code> | policy Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | requires Human Review 字段。 |
| `ruleId` | 属性 | <code>ruleId: string</code> | rule Id 字段。 |

## `PolicyEngine` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(context: PolicyEvaluationContext): Promise&lt;PolicyDecision&gt;</code> | 评估 evaluate。 |

## `PolicyEvaluationContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `PolicyRuleSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `effect` | 属性 | <code>effect: "allow" &#124; "deny" &#124; "require_human_review"</code> | effect 字段。 |
| `expression` | 属性 | <code>expression: string</code> | expression 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `scopes` | 属性 | <code>scopes: string[]</code> | scopes 字段。 |
| `sideEffectLevels` | 属性 | <code>sideEffectLevels: SideEffectLevel[]</code> | side Effect Levels 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `PolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaultEffect` | 属性 | <code>defaultEffect: "allow" &#124; "deny"</code> | default Effect 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `rules` | 属性 | <code>rules: PolicyRuleSpec[]</code> | rules 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `RegressionSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `fixtureRefs` | 属性 | <code>fixtureRefs: SpecRef[]</code> | fixture Refs 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `requiredChecks` | 属性 | <code>requiredChecks: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | required Checks 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ReplaySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `captureMemoryReadSet` | 属性 | <code>captureMemoryReadSet: boolean</code> | capture Memory Read Set 字段。 |
| `captureModelIO` | 属性 | <code>captureModelIO: boolean</code> | capture Model IO 字段。 |
| `capturePolicyDecisions` | 属性 | <code>capturePolicyDecisions: boolean</code> | capture Policy Decisions 字段。 |
| `captureToolIO` | 属性 | <code>captureToolIO: boolean</code> | capture Tool IO 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `snapshotPolicy` | 属性 | <code>snapshotPolicy: "none" &#124; "state_path" &#124; "full"</code> | snapshot Policy 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `RetryPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backoffMs` | 属性 | <code>backoffMs: number</code> | backoff Ms 字段。 |
| `jitterRatio` | 属性 | <code>jitterRatio: number</code> | jitter Ratio 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `maxBackoffMs` | 属性 | <code>maxBackoffMs: number</code> | max Backoff Ms 字段。 |
| `maxElapsedMs` | 属性 | <code>maxElapsedMs: number</code> | max Elapsed Ms 字段。 |
| `retryableCodes` | 属性 | <code>retryableCodes: string[]</code> | retryable Codes 字段。 |

## `SpecMetadata` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `SpecRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `TimeoutPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `onTimeout` | 属性 | <code>onTimeout: "fail" &#124; "retry" &#124; "human_review"</code> | on Timeout 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `TraceSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | event Types 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `redactionPolicy` | 属性 | <code>redactionPolicy: string</code> | redaction Policy 字段。 |
| `retentionPolicy` | 属性 | <code>retentionPolicy: string</code> | retention Policy 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `VersionedSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
