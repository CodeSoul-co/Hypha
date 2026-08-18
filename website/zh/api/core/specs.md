# `@codesoul-co/hypha-core` / `specs`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/specs.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)
- 导出数: **28**

## 模块用法

用于声明并运行时校验契约。Specs 模块公开 2 常量、2 函数、22 接口、2 类型。

### 从包入口导入

```ts
import {
  allowAllPolicyEngine,
  denyExternalEffectsPolicyEngine,
  assertVersionedSpec,
  createPolicySpecEngine,
} from '@codesoul-co/hypha-core';

import type {
  AuditPolicySpec,
  ContextSourceSpec,
  ContextSpec,
  DeploymentSpec,
  EvaluationSpec,
  HarnessedAgentSystemSpec,
  HumanReviewPolicySpec,
  JsonSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 24 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowAllPolicyEngine` | 常量 | <code>const allowAllPolicyEngine: PolicyEngine</code> | 由 `specs` 模块导出的 Allow All Policy Engine 常量。 |
| `denyExternalEffectsPolicyEngine` | 常量 | <code>const denyExternalEffectsPolicyEngine: PolicyEngine</code> | 由 `specs` 模块导出的 Deny External Effects Policy Engine 常量。 |
| `assertVersionedSpec` | 函数 | <code>assertVersionedSpec(spec: VersionedSpec, label?: string): void</code> | Assert Versioned Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createPolicySpecEngine` | 函数 | <code>createPolicySpecEngine(policy: PolicySpec): PolicyEngine</code> | Create Policy Spec Engine 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `AuditPolicySpec` | 接口 | <code>interface AuditPolicySpec</code> | Audit Policy Spec 接口，共包含 4 个公开字段或方法。 |
| `ContextSourceSpec` | 接口 | <code>interface ContextSourceSpec extends VersionedSpec, SpecMetadata</code> | Context Source Spec 接口，共包含 11 个公开字段或方法。 |
| `ContextSpec` | 接口 | <code>interface ContextSpec extends VersionedSpec, SpecMetadata</code> | Context Spec 接口，共包含 12 个公开字段或方法。 |
| `DeploymentSpec` | 接口 | <code>interface DeploymentSpec extends VersionedSpec, SpecMetadata</code> | Deployment Spec 接口，共包含 11 个公开字段或方法。 |
| `EvaluationSpec` | 接口 | <code>interface EvaluationSpec extends VersionedSpec, SpecMetadata</code> | Evaluation Spec 接口，共包含 11 个公开字段或方法。 |
| `HarnessedAgentSystemSpec` | 接口 | <code>interface HarnessedAgentSystemSpec extends VersionedSpec, SpecMetadata</code> | Harnessed Agent System Spec 接口，共包含 25 个公开字段或方法。 |
| `HumanReviewPolicySpec` | 接口 | <code>interface HumanReviewPolicySpec</code> | Human Review Policy Spec 接口，共包含 4 个公开字段或方法。 |
| `JsonSchema` | 接口 | <code>interface JsonSchema</code> | 的 JSON Schema。 |
| `OutputContractSpec` | 接口 | <code>interface OutputContractSpec extends VersionedSpec, SpecMetadata</code> | Output Contract Spec 接口，共包含 9 个公开字段或方法。 |
| `PolicyDecision` | 接口 | <code>interface PolicyDecision</code> | Policy Decision 接口，共包含 6 个公开字段或方法。 |
| `PolicyEngine` | 接口 | <code>interface PolicyEngine</code> | Policy Engine 接口，共包含 1 个公开字段或方法。 |
| `PolicyEvaluationContext` | 接口 | <code>interface PolicyEvaluationContext</code> | Policy Evaluation Context 接口，共包含 7 个公开字段或方法。 |
| `PolicyRuleSpec` | 接口 | <code>interface PolicyRuleSpec extends VersionedSpec, SpecMetadata</code> | Policy Rule Spec 接口，共包含 12 个公开字段或方法。 |
| `PolicySpec` | 接口 | <code>interface PolicySpec extends VersionedSpec, SpecMetadata</code> | Policy Spec 接口，共包含 10 个公开字段或方法。 |
| `RegressionSpec` | 接口 | <code>interface RegressionSpec extends VersionedSpec, SpecMetadata</code> | Regression Spec 接口，共包含 10 个公开字段或方法。 |
| `ReplaySpec` | 接口 | <code>interface ReplaySpec extends VersionedSpec, SpecMetadata</code> | Replay Spec 接口，共包含 13 个公开字段或方法。 |
| `RetryPolicySpec` | 接口 | <code>interface RetryPolicySpec</code> | Retry Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `SpecMetadata` | 接口 | <code>interface SpecMetadata</code> | Spec Metadata 接口，共包含 6 个公开字段或方法。 |
| `SpecRef` | 接口 | <code>interface SpecRef</code> | Spec Ref 接口，共包含 3 个公开字段或方法。 |
| `TimeoutPolicySpec` | 接口 | <code>interface TimeoutPolicySpec</code> | Timeout Policy Spec 接口，共包含 2 个公开字段或方法。 |
| `TraceSpec` | 接口 | <code>interface TraceSpec extends VersionedSpec, SpecMetadata</code> | Trace Spec 接口，共包含 11 个公开字段或方法。 |
| `VersionedSpec` | 接口 | <code>interface VersionedSpec</code> | Versioned Spec 接口，共包含 2 个公开字段或方法。 |
| `RiskLevel` | 类型 | <code>type RiskLevel = 'low' &#124; 'medium' &#124; 'high' &#124; 'critical'</code> | Risk Level 公共类型别名；完整类型表达式见声明。 |
| `SideEffectLevel` | 类型 | <code>type SideEffectLevel = 'none' &#124; 'read' &#124; 'write' &#124; 'external_effect' &#124; 'irreversible'</code> | Side Effect Level 公共类型别名；完整类型表达式见声明。 |

## `allowAllPolicyEngine`

由 `specs` 模块导出的 Allow All Policy Engine 常量。

- 种类: 常量
- 导入: `import { allowAllPolicyEngine } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export declare const allowAllPolicyEngine: PolicyEngine;
```

## `denyExternalEffectsPolicyEngine`

由 `specs` 模块导出的 Deny External Effects Policy Engine 常量。

- 种类: 常量
- 导入: `import { denyExternalEffectsPolicyEngine } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export declare const denyExternalEffectsPolicyEngine: PolicyEngine;
```

## `assertVersionedSpec`

Assert Versioned Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertVersionedSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export declare function assertVersionedSpec(spec: VersionedSpec, label?: string): void;
```

### 调用签名

```text
assertVersionedSpec(spec: VersionedSpec, label?: string): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>VersionedSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `label` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `createPolicySpecEngine`

Create Policy Spec Engine 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createPolicySpecEngine } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export declare function createPolicySpecEngine(policy: PolicySpec): PolicyEngine;
```

### 调用签名

```text
createPolicySpecEngine(policy: PolicySpec): PolicyEngine
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `policy` | <code>PolicySpec</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PolicyEngine`
- 说明: 返回值契约由上述类型定义。

## `AuditPolicySpec`

Audit Policy Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AuditPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface AuditPolicySpec {
    enabled: boolean;
    includeInput?: boolean;
    includeOutput?: boolean;
    redactPaths?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enabled` | 属性 | <code>enabled: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeInput` | 属性 | <code>includeInput?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeOutput` | 属性 | <code>includeOutput?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactPaths` | 属性 | <code>redactPaths?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextSourceSpec`

Context Source Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextSourceSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface ContextSourceSpec extends VersionedSpec, SpecMetadata {
    type: 'memory' | 'artifact' | 'skill' | 'domain' | 'mcp' | 'user_input' | 'system';
    provenanceRequired?: boolean;
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenanceRequired` | 属性 | <code>provenanceRequired?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "memory" &#124; "artifact" &#124; "skill" &#124; "domain" &#124; "mcp" &#124; "user_input" &#124; "system"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextSpec`

Context Spec 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface ContextSpec extends VersionedSpec, SpecMetadata {
    sources: ContextSourceSpec[];
    tokenBudget?: number;
    provenancePolicy?: 'required' | 'best_effort' | 'none';
    instructionBoundaryPolicy?: 'strict' | 'tagged' | 'none';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructionBoundaryPolicy` | 属性 | <code>instructionBoundaryPolicy?: "none" &#124; "strict" &#124; "tagged"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenancePolicy` | 属性 | <code>provenancePolicy?: "none" &#124; "required" &#124; "best_effort"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sources` | 属性 | <code>sources: ContextSourceSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenBudget` | 属性 | <code>tokenBudget?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DeploymentSpec`

Deployment Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DeploymentSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface DeploymentSpec extends VersionedSpec, SpecMetadata {
    mode: 'local' | 'self_hosted' | 'managed';
    runtimeMode?: 'single-user' | 'multi-user';
    configRefs?: SpecRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `configRefs` | 属性 | <code>configRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "local" &#124; "self_hosted" &#124; "managed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeMode` | 属性 | <code>runtimeMode?: "single-user" &#124; "multi-user"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EvaluationSpec`

Evaluation Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EvaluationSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface EvaluationSpec extends VersionedSpec, SpecMetadata {
    type: 'schema' | 'output_contract' | 'tool_trace' | 'policy' | 'process' | 'cost' | 'latency' | 'regression' | 'human';
    rubric?: JsonSchema;
    deterministic?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deterministic` | 属性 | <code>deterministic?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rubric` | 属性 | <code>rubric?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "schema" &#124; "output_contract" &#124; "tool_trace" &#124; "policy" &#124; "process" &#124; "cost" &#124; "latency" &#124; "regression" &#124; "human"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HarnessedAgentSystemSpec`

Harnessed Agent System Spec 接口，共包含 25 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HarnessedAgentSystemSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface HarnessedAgentSystemSpec extends VersionedSpec, SpecMetadata {
    agentRef: SpecRef;
    fsmProcessRef: SpecRef;
    traceRef: SpecRef;
    policyRefs?: SpecRef[];
    memoryRefs?: SpecRef[];
    toolRefs?: SpecRef[];
    skillRefs?: SpecRef[];
    mcpRefs?: SpecRef[];
    contextRefs?: SpecRef[];
    reasoningRefs?: SpecRef[];
    outputContractRefs?: SpecRef[];
    businessRuleRefs?: SpecRef[];
    modelProfileRef?: SpecRef;
    evaluationRefs?: SpecRef[];
    replayRef?: SpecRef;
    regressionRef?: SpecRef;
    deploymentRef?: SpecRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `businessRuleRefs` | 属性 | <code>businessRuleRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextRefs` | 属性 | <code>contextRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deploymentRef` | 属性 | <code>deploymentRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmProcessRef` | 属性 | <code>fsmProcessRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpRefs` | 属性 | <code>mcpRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryRefs` | 属性 | <code>memoryRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelProfileRef` | 属性 | <code>modelProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContractRefs` | 属性 | <code>outputContractRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningRefs` | 属性 | <code>reasoningRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `regressionRef` | 属性 | <code>regressionRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replayRef` | 属性 | <code>replayRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRefs` | 属性 | <code>skillRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRefs` | 属性 | <code>toolRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceRef` | 属性 | <code>traceRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HumanReviewPolicySpec`

Human Review Policy Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HumanReviewPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface HumanReviewPolicySpec {
    required: boolean;
    reason?: string;
    approverRole?: string;
    timeoutPolicy?: TimeoutPolicySpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approverRole` | 属性 | <code>approverRole?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy?: TimeoutPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `JsonSchema`

 的 JSON Schema。

- 种类: 接口
- 导入: `import type { JsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface JsonSchema {
    type?: string;
    properties?: Record<string, JsonSchema>;
    required?: string[];
    items?: JsonSchema;
    enum?: unknown[];
    additionalProperties?: boolean | JsonSchema;
    [key: string]: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `additionalProperties` | 属性 | <code>additionalProperties?: boolean &#124; JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enum` | 属性 | <code>enum?: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `items` | 属性 | <code>items?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `properties` | 属性 | <code>properties?: Record&lt;string, JsonSchema&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OutputContractSpec`

Output Contract Spec 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OutputContractSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface OutputContractSpec extends VersionedSpec, SpecMetadata {
    schema: JsonSchema;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schema` | 属性 | <code>schema: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PolicyDecision`

Policy Decision 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PolicyDecision } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface PolicyDecision {
    allowed: boolean;
    requiresHumanReview?: boolean;
    policyId?: string;
    ruleId?: string;
    reason?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyId` | 属性 | <code>policyId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ruleId` | 属性 | <code>ruleId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PolicyEngine`

Policy Engine 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PolicyEngine } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface PolicyEngine {
    evaluate(context: PolicyEvaluationContext): Promise<PolicyDecision>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(context: PolicyEvaluationContext): Promise&lt;PolicyDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PolicyEvaluationContext`

Policy Evaluation Context 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PolicyEvaluationContext } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface PolicyEvaluationContext<TInput = unknown> {
    runId: string;
    stepId?: string;
    userId?: string;
    capabilityId?: string;
    sideEffectLevel?: SideEffectLevel;
    input?: TInput;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input?: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel?: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PolicyRuleSpec`

Policy Rule Spec 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PolicyRuleSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface PolicyRuleSpec extends VersionedSpec, SpecMetadata {
    effect: 'allow' | 'deny' | 'require_human_review';
    expression?: string;
    sideEffectLevels?: SideEffectLevel[];
    scopes?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `effect` | 属性 | <code>effect: "allow" &#124; "deny" &#124; "require_human_review"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expression` | 属性 | <code>expression?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopes` | 属性 | <code>scopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevels` | 属性 | <code>sideEffectLevels?: SideEffectLevel[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PolicySpec`

Policy Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface PolicySpec extends VersionedSpec, SpecMetadata {
    rules: PolicyRuleSpec[];
    defaultEffect?: 'allow' | 'deny';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultEffect` | 属性 | <code>defaultEffect?: "allow" &#124; "deny"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rules` | 属性 | <code>rules: PolicyRuleSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RegressionSpec`

Regression Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RegressionSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface RegressionSpec extends VersionedSpec, SpecMetadata {
    fixtureRefs: SpecRef[];
    requiredChecks: Array<'event_types' | 'state_path' | 'tool_calls' | 'policy_decisions' | 'output_contract'>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixtureRefs` | 属性 | <code>fixtureRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredChecks` | 属性 | <code>requiredChecks: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReplaySpec`

Replay Spec 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReplaySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface ReplaySpec extends VersionedSpec, SpecMetadata {
    captureModelIO?: boolean;
    captureToolIO?: boolean;
    captureMemoryReadSet?: boolean;
    capturePolicyDecisions?: boolean;
    snapshotPolicy?: 'none' | 'state_path' | 'full';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `captureMemoryReadSet` | 属性 | <code>captureMemoryReadSet?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `captureModelIO` | 属性 | <code>captureModelIO?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capturePolicyDecisions` | 属性 | <code>capturePolicyDecisions?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `captureToolIO` | 属性 | <code>captureToolIO?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotPolicy` | 属性 | <code>snapshotPolicy?: "none" &#124; "state_path" &#124; "full"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RetryPolicySpec`

Retry Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RetryPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface RetryPolicySpec {
    maxAttempts: number;
    backoffMs?: number;
    maxBackoffMs?: number;
    jitterRatio?: number;
    maxElapsedMs?: number;
    retryableCodes?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backoffMs` | 属性 | <code>backoffMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jitterRatio` | 属性 | <code>jitterRatio?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBackoffMs` | 属性 | <code>maxBackoffMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxElapsedMs` | 属性 | <code>maxElapsedMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryableCodes` | 属性 | <code>retryableCodes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SpecMetadata`

Spec Metadata 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SpecMetadata } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface SpecMetadata {
    name?: string;
    description?: string;
    owner?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SpecRef`

Spec Ref 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SpecRef } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface SpecRef {
    id: string;
    version?: string;
    revision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TimeoutPolicySpec`

Timeout Policy Spec 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TimeoutPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface TimeoutPolicySpec {
    timeoutMs: number;
    onTimeout?: 'fail' | 'retry' | 'human_review';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `onTimeout` | 属性 | <code>onTimeout?: "fail" &#124; "retry" &#124; "human_review"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TraceSpec`

Trace Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TraceSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface TraceSpec extends VersionedSpec, SpecMetadata {
    eventTypes: string[];
    retentionPolicy?: string;
    redactionPolicy?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactionPolicy` | 属性 | <code>redactionPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retentionPolicy` | 属性 | <code>retentionPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VersionedSpec`

Versioned Spec 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VersionedSpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export interface VersionedSpec {
    id: string;
    version: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RiskLevel`

Risk Level 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RiskLevel } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
```

## `SideEffectLevel`

Side Effect Level 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SideEffectLevel } from '@codesoul-co/hypha-core';`
- 源码模块: [`specs`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/specs.ts)

### 声明

```text
export type SideEffectLevel = 'none' | 'read' | 'write' | 'external_effect' | 'irreversible';
```
