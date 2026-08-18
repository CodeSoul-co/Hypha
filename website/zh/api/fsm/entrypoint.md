# `@codesoul-co/hypha-fsm` / `index`

- 包索引: [`@codesoul-co/hypha-fsm`](/zh/api/fsm)
- 源码: [`packages/fsm/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)
- 导出数: **50**

## 模块用法

聚合 `@codesoul-co/hypha-fsm` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  FSMRuntime,
  defaultReActFSMProcessSpec,
  fsmProcessSpecDefinition,
  fsmProcessSpecExample,
  fsmProcessSpecJsonSchema,
  fsmProcessSpecSchema,
  fsmSpecDefinitions,
  fsmSpecJsonSchemas,
} from '@codesoul-co/hypha-fsm';

import type {
  FSMGuardContext,
  FSMProcessSpec,
  FSMRecoveryDecisionRecord,
  FSMRuntimeCancelOptions,
  FSMRuntimeOptions,
  FSMRuntimeTransitionOptions,
  FSMSnapshot,
  FSMStateEnteredRecord,
} from '@codesoul-co/hypha-fsm';

// 完整导出列表见下方。
```

### 使用要点

- 19 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 17 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 13 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { fsmProcessSpecSchema } from '@codesoul-co/hypha-fsm';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fsmProcessSpecSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FSMRuntime` | 类 | <code>new FSMRuntime(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | FSM Runtime 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `defaultReActFSMProcessSpec` | 常量 | <code>const defaultReActFSMProcessSpec: FSMProcessSpec</code> | 由 `index` 模块导出的 Default ReAct FSM Process Spec 常量。 |
| `fsmProcessSpecDefinition` | 常量 | <code>const fsmProcessSpecDefinition: SpecSchemaDefinition&lt;FSMProcessSpec&gt;</code> | FSM Process Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `fsmProcessSpecExample` | 常量 | <code>const fsmProcessSpecExample: FSMProcessSpec</code> | FSM Process Spec 的有效示例值。 |
| `fsmProcessSpecJsonSchema` | 常量 | <code>const fsmProcessSpecJsonSchema: JsonSchema</code> | FSM Process Spec 的 JSON Schema。 |
| `fsmProcessSpecSchema` | 常量 | <code>const fsmProcessSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; states: z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodOptional&lt;z....</code> | FSM Process Spec 的运行时 Schema。 |
| `fsmSpecDefinitions` | 常量 | <code>const fsmSpecDefinitions: readonly [SpecSchemaDefinition&lt;FSMProcessSpec&gt;]</code> | 由 `index` 模块导出的 FSM Spec Definitions 常量。 |
| `fsmSpecJsonSchemas` | 常量 | <code>const fsmSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 FSM Spec JSON Schemas 常量。 |
| `fsmStateSpecSchema` | 常量 | <code>const fsmStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["idle", "run_initialized", "context_built", "reasoning", "action_selected", "poli...</code> | FSM State Spec 的运行时 Schema。 |
| `fsmTransitionSpecSchema` | 常量 | <code>const fsmTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; traceEvent: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; traceEvent?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?...</code> | FSM Transition Spec 的运行时 Schema。 |
| `HARNESS_FSM_STATE_IDS` | 常量 | <code>const HARNESS_FSM_STATE_IDS: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Recovering", "Compensating", "Quarantined", "HumanReview", "Completed", "Failed", "Cancelled"]</code> | Stable Harness states owned by the framework runtime. Domain Packs may bind capabilities and policy to these phases, but must not add, remove, rename, or reconnect them. |
| `HARNESS_STATE_CAPABILITY_AREA` | 常量 | <code>const HARNESS_STATE_CAPABILITY_AREA: Readonly&lt;Record&lt;"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled", HarnessCapabilityArea&gt;&gt;</code> | `activity` is the governed side-effect phase shared by Tool, MCP, Execution, file, Memory-write, and external-write adapters. The concrete activity type remains Event evidence; it never becomes a Domain-defined FSM state. |
| `REACT_FSM_STATE_PATH` | 常量 | <code>const REACT_FSM_STATE_PATH: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Completed"]</code> | 由 `index` 模块导出的 REACT FSM STATE PATH 常量。 |
| `REACT_PHASE_TO_HARNESS_STATE` | 常量 | <code>const REACT_PHASE_TO_HARNESS_STATE: Readonly&lt;{ reason: "Reasoning"; select_action: "ActionSelected"; policy_check: "PolicyChecked"; act: "Acting"; observe_result: "ObservationRecorded"; verify: "Verifying"; memory_sync: "MemorySync"; complete: "Completed"; fail: "Failed"; human_review: "HumanReview"; cancel: "Cancelled"; }&gt;</code> | 由 `index` 模块导出的 REACT PHASE TO HARNESS STATE 常量。 |
| `analyzeFSMTopology` | 函数 | <code>analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis</code> | Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow. |
| `applyTransition` | 函数 | <code>applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string &#124; FSMTransitionOptions): FSMSnapshot</code> | Apply Transition 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `applyTransitionWithRuntimePolicy` | 函数 | <code>applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;FSMSnapshot&gt;</code> | Apply Transition With Runtime Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `assertHarnessFSMProcessSpec` | 函数 | <code>assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void</code> | Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow. |
| `canRetryState` | 函数 | <code>canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean</code> | Can Retry State 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createHarnessFSMProcessSpec` | 函数 | <code>createHarnessFSMProcessSpec(): FSMProcessSpec</code> | Returns an isolated copy so composition code cannot mutate the shared contract. |
| `createInitialSnapshot` | 函数 | <code>createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot</code> | Create Initial Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `evaluateGuardExpression` | 函数 | <code>evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean</code> | Evaluate Guard Expression 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `evaluateStateTimeout` | 函数 | <code>evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation &#124; null</code> | Evaluate State Timeout 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `getAllowedTransitions` | 函数 | <code>getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[]</code> | Get Allowed Transitions 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `harnessStateForReActPhase` | 函数 | <code>harnessStateForReActPhase(phase: string): HarnessFSMStateId &#124; undefined</code> | Harness State For ReAct Phase 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isHarnessFSMProcessSpec` | 函数 | <code>isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean</code> | Returns false for either an invalid process or a valid non-Harness topology. |
| `isHarnessFSMStateId` | 函数 | <code>isHarnessFSMStateId(value: string): value is HarnessFSMStateId</code> | Is Harness FSM State ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `parseFSMProcessSpec` | 函数 | <code>parseFSMProcessSpec(input: unknown): FSMProcessSpec</code> | Parse FSM Process Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `planHarnessCapabilityPath` | 函数 | <code>planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[]</code> | Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work. |
| `validateFSMProcessSpec` | 函数 | <code>validateFSMProcessSpec(spec: FSMProcessSpec): void</code> | Validate FSM Process Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateFSMSnapshot` | 函数 | <code>validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void</code> | Validate FSM Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `FSMGuardContext` | 接口 | <code>interface FSMGuardContext</code> | FSM Guard Context 接口，共包含 3 个公开字段或方法。 |
| `FSMProcessSpec` | 接口 | <code>interface FSMProcessSpec extends VersionedSpec, SpecMetadata</code> | FSM Process Spec 接口，共包含 13 个公开字段或方法。 |
| `FSMRecoveryDecisionRecord` | 接口 | <code>interface FSMRecoveryDecisionRecord</code> | FSM Recovery Decision Record 接口，共包含 4 个公开字段或方法。 |
| `FSMRuntimeCancelOptions` | 接口 | <code>interface FSMRuntimeCancelOptions extends FSMRuntimeTransitionOptions</code> | FSM Runtime Cancel Options 接口，共包含 8 个公开字段或方法。 |
| `FSMRuntimeOptions` | 接口 | <code>interface FSMRuntimeOptions</code> | FSM Runtime Options 接口，共包含 5 个公开字段或方法。 |
| `FSMRuntimeTransitionOptions` | 接口 | <code>interface FSMRuntimeTransitionOptions extends FSMTransitionOptions</code> | FSM Runtime Transition Options 接口，共包含 7 个公开字段或方法。 |
| `FSMSnapshot` | 接口 | <code>interface FSMSnapshot</code> | FSM Snapshot 接口，共包含 8 个公开字段或方法。 |
| `FSMStateEnteredRecord` | 接口 | <code>interface FSMStateEnteredRecord</code> | FSM State Entered Record 接口，共包含 7 个公开字段或方法。 |
| `FSMStateSpec` | 接口 | <code>interface FSMStateSpec extends SpecMetadata</code> | FSM State Spec 接口，共包含 15 个公开字段或方法。 |
| `FSMTimeoutEvaluation` | 接口 | <code>interface FSMTimeoutEvaluation</code> | FSM Timeout Evaluation 接口，共包含 5 个公开字段或方法。 |
| `FSMTopologyAnalysis` | 接口 | <code>interface FSMTopologyAnalysis</code> | FSM Topology Analysis 接口，共包含 5 个公开字段或方法。 |
| `FSMTransitionOptions` | 接口 | <code>interface FSMTransitionOptions</code> | FSM Transition Options 接口，共包含 3 个公开字段或方法。 |
| `FSMTransitionSpec` | 接口 | <code>interface FSMTransitionSpec</code> | FSM Transition Spec 接口，共包含 5 个公开字段或方法。 |
| `StateTransition` | 接口 | <code>interface StateTransition</code> | State Transition 接口，共包含 8 个公开字段或方法。 |
| `FSMGuardEvaluator` | 类型 | <code>type FSMGuardEvaluator = (guard: string, context: FSMGuardContext) =&gt; boolean</code> | FSM Guard Evaluator 公共类型别名；完整类型表达式见声明。 |
| `FSMStateKind` | 类型 | <code>type FSMStateKind = 'idle' &#124; 'run_initialized' &#124; 'context_built' &#124; 'reasoning' &#124; 'action_selected' &#124; 'policy_checked' &#124; 'acting' &#124; 'observation_recorded' &#124; 'verifying' &#124; 'memory_sync' &#124; 'recovering' &#124; 'compensating' &#124; 'quarantined' &#124; 'human_review' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'domain'</code> | FSM State Kind 公共类型别名；完整类型表达式见声明。 |
| `FsmTerminalStatus` | 类型 | <code>type FsmTerminalStatus = 'completed' &#124; 'failed' &#124; 'cancelled'</code> | FSM Terminal Status 公共类型别名；完整类型表达式见声明。 |
| `HarnessCapabilityArea` | 类型 | <code>type HarnessCapabilityArea = 'lifecycle' &#124; 'context' &#124; 'reasoning' &#124; 'policy' &#124; 'activity' &#124; 'observation' &#124; 'verification' &#124; 'memory' &#124; 'recovery' &#124; 'human_review' &#124; 'terminal'</code> | Harness Capability Area 公共类型别名；完整类型表达式见声明。 |
| `HarnessFSMStateId` | 类型 | <code>type HarnessFSMStateId = (typeof HARNESS_FSM_STATE_IDS)[number]</code> | Harness FSM State ID 公共类型别名；完整类型表达式见声明。 |

## `FSMRuntime`

FSM Runtime 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FSMRuntime } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare class FSMRuntime {
    constructor(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot);
    getSnapshot(): FSMSnapshot;
    start(metadata?: Record<string, unknown>): Promise<FSMSnapshot>;
    transition(to: string, options?: FSMRuntimeTransitionOptions): Promise<StateTransition>;
    transitionPath(states: string[], options?: FSMRuntimeTransitionOptions): Promise<StateTransition[]>;
    cancel(options?: FSMRuntimeCancelOptions): Promise<StateTransition>;
    decideRecovery(anomaly: FSMAnomaly, options?: {
            stateId?: string;
            now?: string;
        }): Promise<FSMRecoveryDecision>;
    registerRecoverySuccess(circuitKey: string, now?: string): FSMSnapshot;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(options?: FSMRuntimeCancelOptions): Promise&lt;StateTransition&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | 创建该类的实例。 |
| `decideRecovery` | 方法 | <code>decideRecovery(anomaly: FSMAnomaly, options?: { stateId?: string; now?: string; }): Promise&lt;FSMRecoveryDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getSnapshot` | 方法 | <code>getSnapshot(): FSMSnapshot</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerRecoverySuccess` | 方法 | <code>registerRecoverySuccess(circuitKey: string, now?: string): FSMSnapshot</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(metadata?: Record&lt;string, unknown&gt;): Promise&lt;FSMSnapshot&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transition` | 方法 | <code>transition(to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transitionPath` | 方法 | <code>transitionPath(states: string[], options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `defaultReActFSMProcessSpec`

由 `index` 模块导出的 Default ReAct FSM Process Spec 常量。

- 种类: 常量
- 导入: `import { defaultReActFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const defaultReActFSMProcessSpec: FSMProcessSpec;
```

## `fsmProcessSpecDefinition`

FSM Process Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { fsmProcessSpecDefinition } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const fsmProcessSpecDefinition: SpecSchemaDefinition<FSMProcessSpec>;
```

## `fsmProcessSpecExample`

FSM Process Spec 的有效示例值。

- 种类: 常量
- 导入: `import { fsmProcessSpecExample } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const fsmProcessSpecExample: FSMProcessSpec;
```

## `fsmProcessSpecJsonSchema`

FSM Process Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { fsmProcessSpecJsonSchema } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const fsmProcessSpecJsonSchema: JsonSchema;
```

## `fsmProcessSpecSchema`

FSM Process Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { fsmProcessSpecSchema } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const fsmProcessSpecSchema: (typeof import('@codesoul-co/hypha-fsm'))['fsmProcessSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `fsmSpecDefinitions`

由 `index` 模块导出的 FSM Spec Definitions 常量。

- 种类: 常量
- 导入: `import { fsmSpecDefinitions } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const fsmSpecDefinitions: readonly [SpecSchemaDefinition<FSMProcessSpec>];
```

## `fsmSpecJsonSchemas`

由 `index` 模块导出的 FSM Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { fsmSpecJsonSchemas } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const fsmSpecJsonSchemas: Record<string, JsonSchema>;
```

## `fsmStateSpecSchema`

FSM State Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { fsmStateSpecSchema } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const fsmStateSpecSchema: (typeof import('@codesoul-co/hypha-fsm'))['fsmStateSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `fsmTransitionSpecSchema`

FSM Transition Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { fsmTransitionSpecSchema } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const fsmTransitionSpecSchema: z.ZodObject<{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; traceEvent: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string | undefined; guard?: string | undefined; traceEvent?: string | undefined; }, { from: string; to: string; description?: string | undefined; guard?: string | undefined; traceEvent?: string | undefined; }>;
```

## `HARNESS_FSM_STATE_IDS`

Stable Harness states owned by the framework runtime. Domain Packs may bind capabilities and policy to these phases, but must not add, remove, rename, or reconnect them.

- 种类: 常量
- 导入: `import { HARNESS_FSM_STATE_IDS } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const HARNESS_FSM_STATE_IDS: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Recovering", "Compensating", "Quarantined", "HumanReview", "Completed", "Failed", "Cancelled"];
```

## `HARNESS_STATE_CAPABILITY_AREA`

`activity` is the governed side-effect phase shared by Tool, MCP, Execution, file, Memory-write, and external-write adapters. The concrete activity type remains Event evidence; it never becomes a Domain-defined FSM state.

- 种类: 常量
- 导入: `import { HARNESS_STATE_CAPABILITY_AREA } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const HARNESS_STATE_CAPABILITY_AREA: Readonly<Record<"Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled", HarnessCapabilityArea>>;
```

## `REACT_FSM_STATE_PATH`

由 `index` 模块导出的 REACT FSM STATE PATH 常量。

- 种类: 常量
- 导入: `import { REACT_FSM_STATE_PATH } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const REACT_FSM_STATE_PATH: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Completed"];
```

## `REACT_PHASE_TO_HARNESS_STATE`

由 `index` 模块导出的 REACT PHASE TO HARNESS STATE 常量。

- 种类: 常量
- 导入: `import { REACT_PHASE_TO_HARNESS_STATE } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare const REACT_PHASE_TO_HARNESS_STATE: Readonly<{ reason: "Reasoning"; select_action: "ActionSelected"; policy_check: "PolicyChecked"; act: "Acting"; observe_result: "ObservationRecorded"; verify: "Verifying"; memory_sync: "MemorySync"; complete: "Completed"; fail: "Failed"; human_review: "HumanReview"; cancel: "Cancelled"; }>;
```

## `analyzeFSMTopology`

Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow.

- 种类: 函数
- 导入: `import { analyzeFSMTopology } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis;
```

### 调用签名

```text
analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis
```

Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMTopologyAnalysis`
- 说明: 返回值契约由上述类型定义。

## `applyTransition`

Apply Transition 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { applyTransition } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string | FSMTransitionOptions): FSMSnapshot;
```

### 调用签名

```text
applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string | FSMTransitionOptions): FSMSnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `snapshot` | <code>FSMSnapshot</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `to` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `nowOrOptions` | <code>string &#124; FSMTransitionOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMSnapshot`
- 说明: 返回值契约由上述类型定义。

## `applyTransitionWithRuntimePolicy`

Apply Transition With Runtime Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { applyTransitionWithRuntimePolicy } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise<FSMSnapshot>;
```

### 调用签名

```text
applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise<FSMSnapshot>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `snapshot` | <code>FSMSnapshot</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `to` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>FSMRuntimeTransitionOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<FSMSnapshot>`
- 说明: 返回值契约由上述类型定义。

## `assertHarnessFSMProcessSpec`

Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow.

- 种类: 函数
- 导入: `import { assertHarnessFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void;
```

### 调用签名

```text
assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void
```

Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `canRetryState`

Can Retry State 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canRetryState } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean;
```

### 调用签名

```text
canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `stateId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `attemptedCount` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `createHarnessFSMProcessSpec`

Returns an isolated copy so composition code cannot mutate the shared contract.

- 种类: 函数
- 导入: `import { createHarnessFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function createHarnessFSMProcessSpec(): FSMProcessSpec;
```

### 调用签名

```text
createHarnessFSMProcessSpec(): FSMProcessSpec
```

Returns an isolated copy so composition code cannot mutate the shared contract.

#### 参数

无参数。

#### 返回值

- 类型: `FSMProcessSpec`
- 说明: 返回值契约由上述类型定义。

## `createInitialSnapshot`

Create Initial Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createInitialSnapshot } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot;
```

### 调用签名

```text
createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `runId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `now` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMSnapshot`
- 说明: 返回值契约由上述类型定义。

## `evaluateGuardExpression`

Evaluate Guard Expression 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { evaluateGuardExpression } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean;
```

### 调用签名

```text
evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `guard` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>FSMGuardContext</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `evaluateStateTimeout`

Evaluate State Timeout 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { evaluateStateTimeout } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation | null;
```

### 调用签名

```text
evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `snapshot` | <code>FSMSnapshot</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `now` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMTimeoutEvaluation`
- 说明: 返回值契约由上述类型定义。

## `getAllowedTransitions`

Get Allowed Transitions 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { getAllowedTransitions } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[];
```

### 调用签名

```text
getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `stateId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMTransitionSpec[]`
- 说明: 返回值契约由上述类型定义。

## `harnessStateForReActPhase`

Harness State For ReAct Phase 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { harnessStateForReActPhase } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function harnessStateForReActPhase(phase: string): HarnessFSMStateId | undefined;
```

### 调用签名

```text
harnessStateForReActPhase(phase: string): HarnessFSMStateId | undefined
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `phase` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `"Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled"`
- 说明: 返回值契约由上述类型定义。

## `isHarnessFSMProcessSpec`

Returns false for either an invalid process or a valid non-Harness topology.

- 种类: 函数
- 导入: `import { isHarnessFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean;
```

### 调用签名

```text
isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean
```

Returns false for either an invalid process or a valid non-Harness topology.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `isHarnessFSMStateId`

Is Harness FSM State ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isHarnessFSMStateId } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function isHarnessFSMStateId(value: string): value is HarnessFSMStateId;
```

### 调用签名

```text
isHarnessFSMStateId(value: string): value is HarnessFSMStateId
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `value is "Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled"`
- 说明: 返回值契约由上述类型定义。

## `parseFSMProcessSpec`

Parse FSM Process Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { parseFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function parseFSMProcessSpec(input: unknown): FSMProcessSpec;
```

### 调用签名

```text
parseFSMProcessSpec(input: unknown): FSMProcessSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMProcessSpec`
- 说明: 返回值契约由上述类型定义。

## `planHarnessCapabilityPath`

Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work.

- 种类: 函数
- 导入: `import { planHarnessCapabilityPath } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[];
```

### 调用签名

```text
planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[]
```

Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `from` | <code>"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled"</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `to` | <code>"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled"</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `("Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled")[]`
- 说明: 返回值契约由上述类型定义。

## `validateFSMProcessSpec`

Validate FSM Process Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function validateFSMProcessSpec(spec: FSMProcessSpec): void;
```

### 调用签名

```text
validateFSMProcessSpec(spec: FSMProcessSpec): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `validateFSMSnapshot`

Validate FSM Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateFSMSnapshot } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export declare function validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void;
```

### 调用签名

```text
validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `snapshot` | <code>FSMSnapshot</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expectedRunId` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `FSMGuardContext`

FSM Guard Context 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMGuardContext } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMGuardContext {
    input?: unknown;
    variables?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variables` | 属性 | <code>variables?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMProcessSpec`

FSM Process Spec 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMProcessSpec extends VersionedSpec, SpecMetadata {
    initialState: string;
    states: FSMStateSpec[];
    transitions: FSMTransitionSpec[];
    terminalStates: string[];
    recoveryPolicy?: FSMRecoveryPolicySpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `initialState` | 属性 | <code>initialState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recoveryPolicy` | 属性 | <code>recoveryPolicy?: FSMRecoveryPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `states` | 属性 | <code>states: FSMStateSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalStates` | 属性 | <code>terminalStates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transitions` | 属性 | <code>transitions: FSMTransitionSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRecoveryDecisionRecord`

FSM Recovery Decision Record 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRecoveryDecisionRecord } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMRecoveryDecisionRecord {
    processId: string;
    runId: string;
    decision: FSMRecoveryDecision;
    snapshot: FSMSnapshot;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decision` | 属性 | <code>decision: FSMRecoveryDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processId` | 属性 | <code>processId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRuntimeCancelOptions`

FSM Runtime Cancel Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRuntimeCancelOptions } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMRuntimeCancelOptions extends FSMRuntimeTransitionOptions {
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext?: FSMGuardContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guardEvaluator` | 方法 | <code>guardEvaluator?(guard: string, context: FSMGuardContext): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 属性 | <code>now?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policy` | 属性 | <code>policy?: PolicyEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRuntimeOptions`

FSM Runtime Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRuntimeOptions } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMRuntimeOptions {
    now?: () => string;
    policy?: PolicyEngine;
    onStateEntered?: (record: FSMStateEnteredRecord) => Promise<void> | void;
    onTransition?: (record: StateTransition) => Promise<void> | void;
    onRecoveryDecision?: (record: FSMRecoveryDecisionRecord) => Promise<void> | void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onRecoveryDecision` | 方法 | <code>onRecoveryDecision?(record: FSMRecoveryDecisionRecord): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onStateEntered` | 方法 | <code>onStateEntered?(record: FSMStateEnteredRecord): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onTransition` | 方法 | <code>onTransition?(record: StateTransition): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policy` | 属性 | <code>policy?: PolicyEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMRuntimeTransitionOptions`

FSM Runtime Transition Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMRuntimeTransitionOptions } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMRuntimeTransitionOptions extends FSMTransitionOptions {
    userId?: string;
    stepId?: string;
    policy?: PolicyEngine;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext?: FSMGuardContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guardEvaluator` | 方法 | <code>guardEvaluator?(guard: string, context: FSMGuardContext): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 属性 | <code>now?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policy` | 属性 | <code>policy?: PolicyEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMSnapshot`

FSM Snapshot 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMSnapshot } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMSnapshot {
    processId: string;
    runId: string;
    currentState: string;
    statePath: string[];
    status: 'running' | FsmTerminalStatus;
    updatedAt: string;
    recovery?: FSMRecoverySnapshot;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentState` | 属性 | <code>currentState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processId` | 属性 | <code>processId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recovery` | 属性 | <code>recovery?: FSMRecoverySnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "running" &#124; FsmTerminalStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMStateEnteredRecord`

FSM State Entered Record 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMStateEnteredRecord } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMStateEnteredRecord {
    processId: string;
    runId: string;
    stateId: string;
    fromState?: string;
    snapshot: FSMSnapshot;
    enteredAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enteredAt` | 属性 | <code>enteredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fromState` | 属性 | <code>fromState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processId` | 属性 | <code>processId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMStateSpec`

FSM State Spec 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMStateSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMStateSpec extends SpecMetadata {
    id: string;
    kind?: FSMStateKind;
    entryAction?: string;
    exitAction?: string;
    timeoutPolicy?: TimeoutPolicySpec;
    retryPolicy?: RetryPolicySpec;
    humanReviewPolicy?: HumanReviewPolicySpec;
    policyRefs?: string[];
    traceEvents?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `entryAction` | 属性 | <code>entryAction?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exitAction` | 属性 | <code>exitAction?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanReviewPolicy` | 属性 | <code>humanReviewPolicy?: HumanReviewPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind?: FSMStateKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryPolicy` | 属性 | <code>retryPolicy?: RetryPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy?: TimeoutPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceEvents` | 属性 | <code>traceEvents?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMTimeoutEvaluation`

FSM Timeout Evaluation 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMTimeoutEvaluation } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMTimeoutEvaluation {
    timedOut: boolean;
    action?: NonNullable<TimeoutPolicySpec['onTimeout']>;
    stateId: string;
    elapsedMs: number;
    timeoutMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action?: NonNullable&lt;"fail" &#124; "retry" &#124; "human_review"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `elapsedMs` | 属性 | <code>elapsedMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timedOut` | 属性 | <code>timedOut: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMTopologyAnalysis`

FSM Topology Analysis 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMTopologyAnalysis } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMTopologyAnalysis {
    initialState: string;
    reachableStates: string[];
    unreachableStates: string[];
    deadEndStates: string[];
    cycleStates: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cycleStates` | 属性 | <code>cycleStates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadEndStates` | 属性 | <code>deadEndStates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `initialState` | 属性 | <code>initialState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reachableStates` | 属性 | <code>reachableStates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `unreachableStates` | 属性 | <code>unreachableStates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMTransitionOptions`

FSM Transition Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMTransitionOptions } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMTransitionOptions {
    now?: string;
    guardContext?: FSMGuardContext;
    guardEvaluator?: FSMGuardEvaluator;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext?: FSMGuardContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guardEvaluator` | 方法 | <code>guardEvaluator?(guard: string, context: FSMGuardContext): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 属性 | <code>now?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMTransitionSpec`

FSM Transition Spec 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FSMTransitionSpec } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface FSMTransitionSpec {
    from: string;
    to: string;
    guard?: string;
    description?: string;
    traceEvent?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `from` | 属性 | <code>from: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guard` | 属性 | <code>guard?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceEvent` | 属性 | <code>traceEvent?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StateTransition`

State Transition 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StateTransition } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export interface StateTransition {
    processId: string;
    runId: string;
    from: string;
    to: string;
    transition: FSMTransitionSpec;
    snapshot: FSMSnapshot;
    acceptedAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptedAt` | 属性 | <code>acceptedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `from` | 属性 | <code>from: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processId` | 属性 | <code>processId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transition` | 属性 | <code>transition: FSMTransitionSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FSMGuardEvaluator`

FSM Guard Evaluator 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FSMGuardEvaluator } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export type FSMGuardEvaluator = (guard: string, context: FSMGuardContext) => boolean;
```

## `FSMStateKind`

FSM State Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FSMStateKind } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export type FSMStateKind = 'idle' | 'run_initialized' | 'context_built' | 'reasoning' | 'action_selected' | 'policy_checked' | 'acting' | 'observation_recorded' | 'verifying' | 'memory_sync' | 'recovering' | 'compensating' | 'quarantined' | 'human_review' | 'completed' | 'failed' | 'cancelled' | 'domain';
```

## `FsmTerminalStatus`

FSM Terminal Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { FsmTerminalStatus } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export type FsmTerminalStatus = 'completed' | 'failed' | 'cancelled';
```

## `HarnessCapabilityArea`

Harness Capability Area 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { HarnessCapabilityArea } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export type HarnessCapabilityArea = 'lifecycle' | 'context' | 'reasoning' | 'policy' | 'activity' | 'observation' | 'verification' | 'memory' | 'recovery' | 'human_review' | 'terminal';
```

## `HarnessFSMStateId`

Harness FSM State ID 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { HarnessFSMStateId } from '@codesoul-co/hypha-fsm';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### 声明

```text
export type HarnessFSMStateId = (typeof HARNESS_FSM_STATE_IDS)[number];
```
