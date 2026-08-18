# `@codesoul-co/hypha-fsm` / `recovery`

- 包索引: [`@codesoul-co/hypha-fsm`](/zh/api/fsm)
- 源码: [`packages/fsm/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)
- 导出数: **27**

## 模块用法

用于处理有界恢复、重试或降级。Recovery 模块公开 7 常量、5 函数、10 接口、5 类型。

### 从包入口导入

```ts
import {
  defaultFSMRecoveryPolicy,
  FSM_ANOMALY_CATEGORIES,
  FSM_ANOMALY_SOURCES,
  FSM_RECOVERY_ACTIONS,
  fsmAnomalySchema,
  fsmRecoveryPolicySpecSchema,
  fsmRecoverySnapshotSchema,
  classifyFSMAnomaly,
} from '@codesoul-co/hypha-fsm';

import type {
  FSMAnomaly,
  FSMAnomalyClassificationInput,
  FSMCircuitBreakerPolicy,
  FSMCircuitSnapshot,
  FSMRecoveryBackoffPolicy,
  FSMRecoveryDecision,
  FSMRecoveryPlan,
  FSMRecoveryPolicySpec,
} from '@codesoul-co/hypha-fsm';

// 完整导出列表见下方。
```

### 使用要点

- 15 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 7 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { fsmAnomalySchema } from '@codesoul-co/hypha-fsm';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fsmAnomalySchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultFSMRecoveryPolicy` | 常量 | <code>const defaultFSMRecoveryPolicy: FSMRecoveryPolicySpec</code> | 由 `recovery` 模块导出的 Default FSM Recovery Policy 常量。 |
| `FSM_ANOMALY_CATEGORIES` | 常量 | <code>const FSM_ANOMALY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | 由 `recovery` 模块导出的 FSM ANOMALY CATEGORIES 常量。 |
| `FSM_ANOMALY_SOURCES` | 常量 | <code>const FSM_ANOMALY_SOURCES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | 由 `recovery` 模块导出的 FSM ANOMALY SOURCES 常量。 |
| `FSM_RECOVERY_ACTIONS` | 常量 | <code>const FSM_RECOVERY_ACTIONS: readonly ["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"]</code> | 由 `recovery` 模块导出的 FSM RECOVERY ACTIONS 常量。 |
| `fsmAnomalySchema` | 常量 | <code>const fsmAnomalySchema: z.ZodObject&lt;{ id: z.ZodString; source: z.ZodEnum&lt;["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]&gt;; category: z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted"...</code> | FSM Anomaly 的运行时 Schema。 |
| `fsmRecoveryPolicySpecSchema` | 常量 | <code>const fsmRecoveryPolicySpecSchema: z.ZodObject&lt;{ maxAttemptsPerState: z.ZodNumber; maxTotalAttempts: z.ZodNumber; maxElapsedMs: z.ZodNumber; retryableCategories: z.ZodArray&lt;z.ZodEnum&lt;["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_fai...</code> | FSM Recovery Policy Spec 的运行时 Schema。 |
| `fsmRecoverySnapshotSchema` | 常量 | <code>const fsmRecoverySnapshotSchema: z.ZodObject&lt;{ startedAt: z.ZodString; updatedAt: z.ZodString; totalAttempts: z.ZodNumber; attemptsByState: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; circuits: z.ZodRecord&lt;z.ZodString, z.ZodObject&lt;{ status: z.ZodEnum&lt;["closed", "open", "half_open"]&gt;; consecutiveFailures: z.ZodNumber; halfOpenAttempts: z.ZodNumber; openedAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { status...</code> | FSM Recovery Snapshot 的运行时 Schema。 |
| `classifyFSMAnomaly` | 函数 | <code>classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly</code> | Classify FSM Anomaly 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `computeFSMRecoveryDelay` | 函数 | <code>computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number</code> | Compute FSM Recovery Delay 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createInitialFSMRecoverySnapshot` | 函数 | <code>createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot</code> | Create Initial FSM Recovery Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `planFSMRecovery` | 函数 | <code>planFSMRecovery(input: { anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }): FSMRecoveryPlan</code> | Plan FSM Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `registerFSMRecoverySuccess` | 函数 | <code>registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot</code> | Register FSM Recovery Success 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `FSMAnomaly` | 接口 | <code>interface FSMAnomaly</code> | FSM Anomaly 接口，共包含 15 个公开字段或方法。 |
| `FSMAnomalyClassificationInput` | 接口 | <code>interface FSMAnomalyClassificationInput</code> | FSM Anomaly Classification Input 接口，共包含 12 个公开字段或方法。 |
| `FSMCircuitBreakerPolicy` | 接口 | <code>interface FSMCircuitBreakerPolicy</code> | FSM Circuit Breaker Policy 接口，共包含 3 个公开字段或方法。 |
| `FSMCircuitSnapshot` | 接口 | <code>interface FSMCircuitSnapshot</code> | FSM Circuit Snapshot 接口，共包含 4 个公开字段或方法。 |
| `FSMRecoveryBackoffPolicy` | 接口 | <code>interface FSMRecoveryBackoffPolicy</code> | FSM Recovery Backoff Policy 接口，共包含 4 个公开字段或方法。 |
| `FSMRecoveryDecision` | 接口 | <code>interface FSMRecoveryDecision</code> | FSM Recovery Decision 接口，共包含 16 个公开字段或方法。 |
| `FSMRecoveryPlan` | 接口 | <code>interface FSMRecoveryPlan</code> | FSM Recovery Plan 接口，共包含 2 个公开字段或方法。 |
| `FSMRecoveryPolicySpec` | 接口 | <code>interface FSMRecoveryPolicySpec</code> | FSM Recovery Policy Spec 接口，共包含 10 个公开字段或方法。 |
| `FSMRecoverySnapshot` | 接口 | <code>interface FSMRecoverySnapshot</code> | FSM Recovery Snapshot 接口，共包含 7 个公开字段或方法。 |
| `FSMRecoveryStateTargets` | 接口 | <code>interface FSMRecoveryStateTargets</code> | FSM Recovery State Targets 接口，共包含 6 个公开字段或方法。 |
| `FSMAnomalyCategory` | 类型 | <code>type FSMAnomalyCategory = RecoveryCategory</code> | FSM Anomaly Category 公共类型别名；完整类型表达式见声明。 |
| `FSMAnomalySource` | 类型 | <code>type FSMAnomalySource = RecoveryModule</code> | FSM Anomaly Source 公共类型别名；完整类型表达式见声明。 |
| `FSMCircuitStatus` | 类型 | <code>type FSMCircuitStatus = 'closed' &#124; 'open' &#124; 'half_open'</code> | FSM Circuit Status 公共类型别名；完整类型表达式见声明。 |
| `FSMRecoveryAction` | 类型 | <code>type FSMRecoveryAction = (typeof FSM_RECOVERY_ACTIONS)[number]</code> | FSM Recovery Action 公共类型别名；完整类型表达式见声明。 |
| `FSMSideEffectState` | 类型 | <code>type FSMSideEffectState = RecoverySideEffectState</code> | FSM Side Effect State 公共类型别名；完整类型表达式见声明。 |

## `defaultFSMRecoveryPolicy`

由 `recovery` 模块导出的 Default FSM Recovery Policy 常量。

- 种类: 常量
- 导入: `import { defaultFSMRecoveryPolicy } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare const defaultFSMRecoveryPolicy: FSMRecoveryPolicySpec;
```

## `FSM_ANOMALY_CATEGORIES`

由 `recovery` 模块导出的 FSM ANOMALY CATEGORIES 常量。

- 种类: 常量
- 导入: `import { FSM_ANOMALY_CATEGORIES } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare const FSM_ANOMALY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"];
```

## `FSM_ANOMALY_SOURCES`

由 `recovery` 模块导出的 FSM ANOMALY SOURCES 常量。

- 种类: 常量
- 导入: `import { FSM_ANOMALY_SOURCES } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare const FSM_ANOMALY_SOURCES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"];
```

## `FSM_RECOVERY_ACTIONS`

由 `recovery` 模块导出的 FSM RECOVERY ACTIONS 常量。

- 种类: 常量
- 导入: `import { FSM_RECOVERY_ACTIONS } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare const FSM_RECOVERY_ACTIONS: readonly ["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"];
```

## `fsmAnomalySchema`

FSM Anomaly 的运行时 Schema。

- 种类: 常量
- 导入: `import { fsmAnomalySchema } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare const fsmAnomalySchema: z.ZodObject<{ id: z.ZodString; source: z.ZodEnum<["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]>; category: z.ZodEnum<["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]>; code: z.ZodString; message: z.ZodString; occurredAt: z.ZodString; retryable: z.ZodOptional<z.ZodBoolean>; retryAfterMs: z.ZodOptional<z.ZodNumber>; circuitKey: z.ZodOptional<z.ZodString>; sideEffectState: z.ZodOptional<z.ZodEnum<["none", "not_started", "committed", "unknown"]>>; compensationAvailable: z.ZodOptional<z.ZodBoolean>; reconciliationAvailable: z.ZodOptional<z.ZodBoolean>; fallbackAvailable: z.ZodOptional<z.ZodBoolean>; degradationAvailable: z.ZodOptional<z.ZodBoolean>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; source: "fsm" | "inference" | "tool" | "memory" | "execution" | "mcp" | "workspace" | "storage" | "message_bus" | "cache" | "policy" | "domain" | "unknown"; category: "unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation"; code: string; message: string; occurredAt: string; retryable?: boolean | undefined; retryAfterMs?: number | undefined; circuitKey?: string | undefined; sideEffectState?: "unknown" | "none" | "not_started" | "committed" | undefined; compensationAvailable?: boolean | undefined; reconciliationAvailable?: boolean | undefined; fallbackAvailable?: boolean | undefined; degradationAvailable?: boolean | undefined; metadata?: Record<string, unknown> | undefined; }, { id: string; source: "fsm" | "inference" | "tool" | "memory" | "execution" | "mcp" | "workspace" | "storage" | "message_bus" | "cache" | "policy" | "domain" | "unknown"; category: "unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation"; code: string; message: string; occurredAt: string; retryable?: boolean | undefined; retryAfterMs?: number | undefined; circuitKey?: string | undefined; sideEffectState?: "unknown" | "none" | "not_started" | "committed" | undefined; compensationAvailable?: boolean | undefined; reconciliationAvailable?: boolean | undefined; fallbackAvailable?: boolean | undefined; degradationAvailable?: boolean | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `fsmRecoveryPolicySpecSchema`

FSM Recovery Policy Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { fsmRecoveryPolicySpecSchema } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare const fsmRecoveryPolicySpecSchema: z.ZodObject<{ maxAttemptsPerState: z.ZodNumber; maxTotalAttempts: z.ZodNumber; maxElapsedMs: z.ZodNumber; retryableCategories: z.ZodArray<z.ZodEnum<["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]>, "many">; nonRetryableCodes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; backoff: z.ZodObject<{ initialDelayMs: z.ZodNumber; maxDelayMs: z.ZodNumber; multiplier: z.ZodNumber; jitterRatio: z.ZodNumber; }, "strip", z.ZodTypeAny, { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }, { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }>; circuitBreaker: z.ZodObject<{ failureThreshold: z.ZodNumber; resetTimeoutMs: z.ZodNumber; halfOpenMaxAttempts: z.ZodNumber; }, "strip", z.ZodTypeAny, { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }, { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }>; stateTargets: z.ZodObject<{ recovering: z.ZodString; compensating: z.ZodString; humanReview: z.ZodString; quarantined: z.ZodString; failed: z.ZodString; cancelled: z.ZodString; }, "strip", z.ZodTypeAny, { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }, { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }>; onExhausted: z.ZodEnum<["human_review", "quarantine", "fail"]>; afterCompensation: z.ZodEnum<["human_review", "quarantine", "fail"]>; }, "strip", z.ZodTypeAny, { maxAttemptsPerState: number; maxTotalAttempts: number; maxElapsedMs: number; retryableCategories: ("unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation")[]; backoff: { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }; circuitBreaker: { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }; stateTargets: { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }; onExhausted: "human_review" | "quarantine" | "fail"; afterCompensation: "human_review" | "quarantine" | "fail"; nonRetryableCodes?: string[] | undefined; }, { maxAttemptsPerState: number; maxTotalAttempts: number; maxElapsedMs: number; retryableCategories: ("unknown" | "validation" | "policy_denied" | "authentication" | "authorization" | "rate_limit" | "timeout" | "transient_dependency" | "permanent_dependency" | "concurrency_conflict" | "resource_exhausted" | "tool_failure" | "inference_failure" | "memory_failure" | "execution_failure" | "storage_failure" | "message_failure" | "cache_failure" | "invariant_violation" | "cancellation")[]; backoff: { initialDelayMs: number; maxDelayMs: number; multiplier: number; jitterRatio: number; }; circuitBreaker: { failureThreshold: number; resetTimeoutMs: number; halfOpenMaxAttempts: number; }; stateTargets: { recovering: string; compensating: string; humanReview: string; quarantined: string; failed: string; cancelled: string; }; onExhausted: "human_review" | "quarantine" | "fail"; afterCompensation: "human_review" | "quarantine" | "fail"; nonRetryableCodes?: string[] | undefined; }>;
```

## `fsmRecoverySnapshotSchema`

FSM Recovery Snapshot 的运行时 Schema。

- 种类: 常量
- 导入: `import { fsmRecoverySnapshotSchema } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare const fsmRecoverySnapshotSchema: z.ZodObject<{ startedAt: z.ZodString; updatedAt: z.ZodString; totalAttempts: z.ZodNumber; attemptsByState: z.ZodRecord<z.ZodString, z.ZodNumber>; circuits: z.ZodRecord<z.ZodString, z.ZodObject<{ status: z.ZodEnum<["closed", "open", "half_open"]>; consecutiveFailures: z.ZodNumber; halfOpenAttempts: z.ZodNumber; openedAt: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }>>; lastAnomalyId: z.ZodOptional<z.ZodString>; lastAction: z.ZodOptional<z.ZodEnum<["retry", "reconcile", "fallback", "degrade", "wait", "compensate", "human_review", "quarantine", "fail", "cancel"]>>; }, "strip", z.ZodTypeAny, { startedAt: string; updatedAt: string; totalAttempts: number; attemptsByState: Record<string, number>; circuits: Record<string, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }>; lastAnomalyId?: string | undefined; lastAction?: "retry" | "reconcile" | "fallback" | "degrade" | "wait" | "compensate" | "human_review" | "quarantine" | "fail" | "cancel" | undefined; }, { startedAt: string; updatedAt: string; totalAttempts: number; attemptsByState: Record<string, number>; circuits: Record<string, { status: "closed" | "open" | "half_open"; consecutiveFailures: number; halfOpenAttempts: number; openedAt?: string | undefined; }>; lastAnomalyId?: string | undefined; lastAction?: "retry" | "reconcile" | "fallback" | "degrade" | "wait" | "compensate" | "human_review" | "quarantine" | "fail" | "cancel" | undefined; }>;
```

## `classifyFSMAnomaly`

Classify FSM Anomaly 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { classifyFSMAnomaly } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare function classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly;
```

### 调用签名

```text
classifyFSMAnomaly(error: unknown, input: FSMAnomalyClassificationInput): FSMAnomaly
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>FSMAnomalyClassificationInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMAnomaly`
- 说明: 返回值契约由上述类型定义。

## `computeFSMRecoveryDelay`

Compute FSM Recovery Delay 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { computeFSMRecoveryDelay } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare function computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number;
```

### 调用签名

```text
computeFSMRecoveryDelay(policy: FSMRecoveryBackoffPolicy, attempt: number, seed: string): number
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `policy` | <code>FSMRecoveryBackoffPolicy</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `attempt` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `seed` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `number`
- 说明: 返回值契约由上述类型定义。

## `createInitialFSMRecoverySnapshot`

Create Initial FSM Recovery Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createInitialFSMRecoverySnapshot } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare function createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot;
```

### 调用签名

```text
createInitialFSMRecoverySnapshot(now?: string): FSMRecoverySnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `now` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMRecoverySnapshot`
- 说明: 返回值契约由上述类型定义。

## `planFSMRecovery`

Plan FSM Recovery 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { planFSMRecovery } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare function planFSMRecovery(input: {
    anomaly: FSMAnomaly;
    stateId: string;
    policy?: FSMRecoveryPolicySpec;
    snapshot?: FSMRecoverySnapshot;
    now?: string;
}): FSMRecoveryPlan;
```

### 调用签名

```text
planFSMRecovery(input: { anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }): FSMRecoveryPlan
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ anomaly: FSMAnomaly; stateId: string; policy?: FSMRecoveryPolicySpec; snapshot?: FSMRecoverySnapshot; now?: string; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMRecoveryPlan`
- 说明: 返回值契约由上述类型定义。

## `registerFSMRecoverySuccess`

Register FSM Recovery Success 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { registerFSMRecoverySuccess } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export declare function registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot;
```

### 调用签名

```text
registerFSMRecoverySuccess(snapshot: FSMRecoverySnapshot, circuitKey: string, now?: string): FSMRecoverySnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `snapshot` | <code>FSMRecoverySnapshot</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `circuitKey` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `now` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMRecoverySnapshot`
- 说明: 返回值契约由上述类型定义。

## `FSMAnomaly`

FSM Anomaly 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMAnomaly } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMAnomaly {
    id: string;
    source: FSMAnomalySource;
    category: FSMAnomalyCategory;
    code: string;
    message: string;
    occurredAt: string;
    retryable?: boolean;
    retryAfterMs?: number;
    circuitKey?: string;
    sideEffectState?: FSMSideEffectState;
    compensationAvailable?: boolean;
    reconciliationAvailable?: boolean;
    fallbackAvailable?: boolean;
    degradationAvailable?: boolean;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `category` | 属性 | <code>category: "unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `circuitKey` | 属性 | <code>circuitKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `degradationAvailable` | 属性 | <code>degradationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackAvailable` | 属性 | <code>fallbackAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliationAvailable` | 属性 | <code>reconciliationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectState` | 属性 | <code>sideEffectState?: RecoverySideEffectState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMAnomalyClassificationInput`

FSM Anomaly Classification Input 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMAnomalyClassificationInput } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMAnomalyClassificationInput {
    id: string;
    source?: FSMAnomalySource;
    occurredAt?: string;
    sideEffectState?: FSMSideEffectState;
    compensationAvailable?: boolean;
    reconciliationAvailable?: boolean;
    fallbackAvailable?: boolean;
    degradationAvailable?: boolean;
    retryable?: boolean;
    retryAfterMs?: number;
    circuitKey?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitKey` | 属性 | <code>circuitKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `degradationAvailable` | 属性 | <code>degradationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackAvailable` | 属性 | <code>fallbackAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliationAvailable` | 属性 | <code>reconciliationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectState` | 属性 | <code>sideEffectState?: RecoverySideEffectState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source?: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMCircuitBreakerPolicy`

FSM Circuit Breaker Policy 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMCircuitBreakerPolicy } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMCircuitBreakerPolicy {
    failureThreshold: number;
    resetTimeoutMs: number;
    halfOpenMaxAttempts: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `failureThreshold` | 属性 | <code>failureThreshold: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `halfOpenMaxAttempts` | 属性 | <code>halfOpenMaxAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resetTimeoutMs` | 属性 | <code>resetTimeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMCircuitSnapshot`

FSM Circuit Snapshot 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMCircuitSnapshot } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMCircuitSnapshot {
    status: FSMCircuitStatus;
    consecutiveFailures: number;
    halfOpenAttempts: number;
    openedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consecutiveFailures` | 属性 | <code>consecutiveFailures: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `halfOpenAttempts` | 属性 | <code>halfOpenAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `openedAt` | 属性 | <code>openedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: FSMCircuitStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryBackoffPolicy`

FSM Recovery Backoff Policy 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryBackoffPolicy } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMRecoveryBackoffPolicy {
    initialDelayMs: number;
    maxDelayMs: number;
    multiplier: number;
    jitterRatio: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `initialDelayMs` | 属性 | <code>initialDelayMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `jitterRatio` | 属性 | <code>jitterRatio: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDelayMs` | 属性 | <code>maxDelayMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `multiplier` | 属性 | <code>multiplier: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryDecision`

FSM Recovery Decision 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryDecision } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMRecoveryDecision {
    anomaly: FSMAnomaly;
    action: FSMRecoveryAction;
    fromState: string;
    transitionState: string;
    resumeState?: string;
    attempt: number;
    totalAttempts: number;
    delayMs: number;
    decidedAt: string;
    nextEligibleAt?: string;
    circuitKey: string;
    circuitStatus: FSMCircuitStatus;
    reason: string;
    quarantineState: string;
    afterCompensationAction?: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
    afterCompensationState?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `afterCompensationAction` | 属性 | <code>afterCompensationAction?: "fail" &#124; "human_review" &#124; "quarantine"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `afterCompensationState` | 属性 | <code>afterCompensationState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `anomaly` | 属性 | <code>anomaly: FSMAnomaly</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attempt` | 属性 | <code>attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `circuitKey` | 属性 | <code>circuitKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `circuitStatus` | 属性 | <code>circuitStatus: FSMCircuitStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decidedAt` | 属性 | <code>decidedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delayMs` | 属性 | <code>delayMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fromState` | 属性 | <code>fromState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextEligibleAt` | 属性 | <code>nextEligibleAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantineState` | 属性 | <code>quarantineState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resumeState` | 属性 | <code>resumeState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalAttempts` | 属性 | <code>totalAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transitionState` | 属性 | <code>transitionState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryPlan`

FSM Recovery Plan 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryPlan } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMRecoveryPlan {
    decision: FSMRecoveryDecision;
    snapshot: FSMRecoverySnapshot;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decision` | 属性 | <code>decision: FSMRecoveryDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: FSMRecoverySnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryPolicySpec`

FSM Recovery Policy Spec 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryPolicySpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMRecoveryPolicySpec {
    maxAttemptsPerState: number;
    maxTotalAttempts: number;
    maxElapsedMs: number;
    retryableCategories: FSMAnomalyCategory[];
    nonRetryableCodes?: string[];
    backoff: FSMRecoveryBackoffPolicy;
    circuitBreaker: FSMCircuitBreakerPolicy;
    stateTargets: FSMRecoveryStateTargets;
    onExhausted: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
    afterCompensation: Extract<FSMRecoveryAction, 'human_review' | 'quarantine' | 'fail'>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterCompensation` | 属性 | <code>afterCompensation: "fail" &#124; "human_review" &#124; "quarantine"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `backoff` | 属性 | <code>backoff: FSMRecoveryBackoffPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `circuitBreaker` | 属性 | <code>circuitBreaker: FSMCircuitBreakerPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttemptsPerState` | 属性 | <code>maxAttemptsPerState: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxElapsedMs` | 属性 | <code>maxElapsedMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalAttempts` | 属性 | <code>maxTotalAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nonRetryableCodes` | 属性 | <code>nonRetryableCodes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onExhausted` | 属性 | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryableCategories` | 属性 | <code>retryableCategories: ("unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateTargets` | 属性 | <code>stateTargets: FSMRecoveryStateTargets</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoverySnapshot`

FSM Recovery Snapshot 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoverySnapshot } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMRecoverySnapshot {
    startedAt: string;
    updatedAt: string;
    totalAttempts: number;
    attemptsByState: Record<string, number>;
    circuits: Record<string, FSMCircuitSnapshot>;
    lastAnomalyId?: string;
    lastAction?: FSMRecoveryAction;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attemptsByState` | 属性 | <code>attemptsByState: Record&lt;string, number&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `circuits` | 属性 | <code>circuits: Record&lt;string, FSMCircuitSnapshot&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastAction` | 属性 | <code>lastAction?: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastAnomalyId` | 属性 | <code>lastAnomalyId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalAttempts` | 属性 | <code>totalAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryStateTargets`

FSM Recovery State Targets 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryStateTargets } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export interface FSMRecoveryStateTargets {
    recovering: string;
    compensating: string;
    humanReview: string;
    quarantined: string;
    failed: string;
    cancelled: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelled` | 属性 | <code>cancelled: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compensating` | 属性 | <code>compensating: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failed` | 属性 | <code>failed: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanReview` | 属性 | <code>humanReview: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantined` | 属性 | <code>quarantined: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recovering` | 属性 | <code>recovering: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMAnomalyCategory`

FSM Anomaly Category 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FSMAnomalyCategory } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export type FSMAnomalyCategory = RecoveryCategory;
```

## `FSMAnomalySource`

FSM Anomaly Source 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FSMAnomalySource } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export type FSMAnomalySource = RecoveryModule;
```

## `FSMCircuitStatus`

FSM Circuit Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FSMCircuitStatus } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export type FSMCircuitStatus = 'closed' | 'open' | 'half_open';
```

## `FSMRecoveryAction`

FSM Recovery Action 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FSMRecoveryAction } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export type FSMRecoveryAction = (typeof FSM_RECOVERY_ACTIONS)[number];
```

## `FSMSideEffectState`

FSM Side Effect State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FSMSideEffectState } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts)

### 声明

```text
export type FSMSideEffectState = RecoverySideEffectState;
```
