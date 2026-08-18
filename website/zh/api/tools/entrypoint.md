# `@codesoul-co/hypha-tools` / `index`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)
- 导出数: **85**

## 模块用法

聚合 `@codesoul-co/hypha-tools` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  AllowAllToolAuthorizer,
  GovernedToolRunner,
  HttpToolAdapter,
  InMemoryToolApprovalStore,
  InMemoryToolInvocationStore,
  InMemoryToolResultCache,
  LocalFunctionToolAdapter,
  MCPToolAdapter,
} from '@codesoul-co/hypha-tools';

import type {
  AdapterCancellationRequest,
  AdapterExecutionRequest,
  HttpToolAdapterOptions,
  InMemoryToolResultCacheOptions,
  MCPToolInvocationPort,
  RedisLikeToolResultCacheClient,
  RedisToolResultCacheOptions,
  ToolAdapter,
} from '@codesoul-co/hypha-tools';

// 完整导出列表见下方。
```

### 使用要点

- 51 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 17 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 12 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { toolCacheValidityRecordSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = toolCacheValidityRecordSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `AllowAllToolAuthorizer` | 类 | <code>new AllowAllToolAuthorizer(): AllowAllToolAuthorizer</code> | Allow All Tool Authorizer 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `GovernedToolRunner` | 类 | <code>new GovernedToolRunner(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "byp...</code> | Governed Tool Runner 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `HttpToolAdapter` | 类 | <code>new HttpToolAdapter(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | Http Tool Adapter 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryToolApprovalStore` | 类 | <code>new InMemoryToolApprovalStore(): InMemoryToolApprovalStore</code> | In Memory Tool Approval Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryToolInvocationStore` | 类 | <code>new InMemoryToolInvocationStore(): InMemoryToolInvocationStore</code> | In Memory Tool Invocation Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryToolResultCache` | 类 | <code>new InMemoryToolResultCache(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | In Memory Tool Result Cache 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalFunctionToolAdapter` | 类 | <code>new LocalFunctionToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | Local Function Tool Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MCPToolAdapter` | 类 | <code>new MCPToolAdapter(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | MCP Tool Adapter 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MockToolAdapter` | 类 | <code>new MockToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | Mock Tool Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MockToolRunner` | 类 | <code>new MockToolRunner(defaultOutput?: unknown): MockToolRunner</code> | Mock Tool Runner 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `PermissionScopeToolAuthorizer` | 类 | <code>new PermissionScopeToolAuthorizer(): PermissionScopeToolAuthorizer</code> | Permission Scope Tool Authorizer 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `PluginToolAdapter` | 类 | <code>new PluginToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | Plugin Tool Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RedisToolResultCache` | 类 | <code>new RedisToolResultCache(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments. |
| `ToolRegistry` | 类 | <code>new ToolRegistry(): ToolRegistry</code> | Tool Registry 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ToolResultCacheEntryTooLargeError` | 类 | <code>new ToolResultCacheEntryTooLargeError(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | Tool Result Cache Entry Too Large Error 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ToolResultCacheOperationTimeoutError` | 类 | <code>new ToolResultCacheOperationTimeoutError(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | Tool Result Cache Operation Timeout Error 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ToolResultCacheValidationError` | 类 | <code>new ToolResultCacheValidationError(message: string): ToolResultCacheValidationError</code> | Tool Result Cache Validation Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `TOOL_INVOCATION_STATUSES` | 常量 | <code>const TOOL_INVOCATION_STATUSES: readonly ["created", "validating", "validated", "policy_checked", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "completed", "failed", "timed_out", "expired", "conflict", "denied", "cancelled"]</code> | 由 `index` 模块导出的 TOOL INVOCATION STATUSES 常量。 |
| `toolCacheValidityRecordSchema` | 常量 | <code>const toolCacheValidityRecordSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.ZodString; validUntil: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { toolId: st...</code> | Tool Cache Validity Record 的运行时 Schema。 |
| `toolProfileSpecDefinition` | 常量 | <code>const toolProfileSpecDefinition: SpecSchemaDefinition&lt;ToolProfileSpec&gt;</code> | Tool Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `toolProfileSpecSchema` | 常量 | <code>const toolProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; toolRefs: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; un...</code> | Tool Profile Spec 的运行时 Schema。 |
| `toolResultCacheEntryJsonSchema` | 常量 | <code>const toolResultCacheEntryJsonSchema: JsonSchema</code> | Tool Result Cache Entry 的 JSON Schema。 |
| `toolResultCacheEntrySchema` | 常量 | <code>const toolResultCacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; validity: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.Zo...</code> | Tool Result Cache Entry 的运行时 Schema。 |
| `toolSpecDefinition` | 常量 | <code>const toolSpecDefinition: SpecSchemaDefinition&lt;ToolSpec&gt;</code> | Tool Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `toolSpecDefinitions` | 常量 | <code>const toolSpecDefinitions: readonly [SpecSchemaDefinition&lt;ToolSpec&gt;, SpecSchemaDefinition&lt;ToolProfileSpec&gt;]</code> | 由 `index` 模块导出的 Tool Spec Definitions 常量。 |
| `toolSpecExample` | 常量 | <code>const toolSpecExample: ToolSpec</code> | Tool Spec 的有效示例值。 |
| `toolSpecJsonSchema` | 常量 | <code>const toolSpecJsonSchema: JsonSchema</code> | Tool Spec 的 JSON Schema。 |
| `toolSpecJsonSchemas` | 常量 | <code>const toolSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 Tool Spec JSON Schemas 常量。 |
| `toolSpecSchema` | 常量 | <code>const toolSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; outputSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSch...</code> | Tool Spec 的运行时 Schema。 |
| `normalizeToolSpec` | 函数 | <code>normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec</code> | Normalize Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateEffectiveCapabilityAccess` | 函数 | <code>validateEffectiveCapabilityAccess(input: { snapshot: ToolContractSnapshot &#124; null; context: ToolCallContext; spec: ToolSpec; }): string &#124; null</code> | Validate Effective Capability Access 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateToolInput` | 函数 | <code>validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult</code> | Validate Tool Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateToolResultCacheEntry` | 函数 | <code>validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry</code> | Validate Tool Result Cache Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateToolSpec` | 函数 | <code>validateToolSpec(input: unknown): ToolSpec</code> | Validate Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `AdapterCancellationRequest` | 接口 | <code>interface AdapterCancellationRequest</code> | Adapter Cancellation Request 接口，共包含 3 个公开字段或方法。 |
| `AdapterExecutionRequest` | 接口 | <code>interface AdapterExecutionRequest</code> | Adapter Execution Request 接口，共包含 3 个公开字段或方法。 |
| `HttpToolAdapterOptions` | 接口 | <code>interface HttpToolAdapterOptions</code> | Http Tool Adapter Options 接口，共包含 4 个公开字段或方法。 |
| `InMemoryToolResultCacheOptions` | 接口 | <code>interface InMemoryToolResultCacheOptions</code> | In Memory Tool Result Cache Options 接口，共包含 2 个公开字段或方法。 |
| `MCPToolInvocationPort` | 接口 | <code>interface MCPToolInvocationPort</code> | MCP Tool Invocation Port 接口，共包含 3 个公开字段或方法。 |
| `RedisLikeToolResultCacheClient` | 接口 | <code>interface RedisLikeToolResultCacheClient</code> | Redis Like Tool Result Cache Client 接口，共包含 3 个公开字段或方法。 |
| `RedisToolResultCacheOptions` | 接口 | <code>interface RedisToolResultCacheOptions</code> | Redis Tool Result Cache Options 接口，共包含 5 个公开字段或方法。 |
| `ToolAdapter` | 接口 | <code>interface ToolAdapter</code> | Tool Adapter 接口，共包含 7 个公开字段或方法。 |
| `ToolAdapterCapabilities` | 接口 | <code>interface ToolAdapterCapabilities</code> | Tool Adapter Capabilities 接口，共包含 5 个公开字段或方法。 |
| `ToolApprovalGrant` | 接口 | <code>interface ToolApprovalGrant</code> | Tool Approval Grant 接口，共包含 11 个公开字段或方法。 |
| `ToolApprovalRequest` | 接口 | <code>interface ToolApprovalRequest</code> | Tool Approval Request 接口，共包含 15 个公开字段或方法。 |
| `ToolApprovalStore` | 接口 | <code>interface ToolApprovalStore</code> | Tool Approval Store 接口，共包含 5 个公开字段或方法。 |
| `ToolArtifactPort` | 接口 | <code>interface ToolArtifactPort</code> | Tool Artifact Port 接口，共包含 1 个公开字段或方法。 |
| `ToolAuthorizationDecision` | 接口 | <code>interface ToolAuthorizationDecision</code> | Tool Authorization Decision 接口，共包含 3 个公开字段或方法。 |
| `ToolAuthorizationInput` | 接口 | <code>interface ToolAuthorizationInput</code> | Tool Authorization Input 接口，共包含 4 个公开字段或方法。 |
| `ToolAuthorizer` | 接口 | <code>interface ToolAuthorizer</code> | Tool Authorizer 接口，共包含 1 个公开字段或方法。 |
| `ToolCachedResultProjection` | 接口 | <code>interface ToolCachedResultProjection</code> | Only stable, replay-safe output fields may cross invocation boundaries. |
| `ToolCallContext` | 接口 | <code>interface ToolCallContext</code> | Tool Call Context 接口，共包含 24 个公开字段或方法。 |
| `ToolCallError` | 接口 | <code>interface ToolCallError</code> | Tool Call Error 接口，共包含 5 个公开字段或方法。 |
| `ToolCallRequest` | 接口 | <code>interface ToolCallRequest</code> | Tool Call Request 接口，共包含 3 个公开字段或方法。 |
| `ToolCallResult` | 接口 | <code>interface ToolCallResult</code> | Tool Call Result 接口，共包含 12 个公开字段或方法。 |
| `ToolExecutionEnvelope` | 接口 | <code>interface ToolExecutionEnvelope</code> | Tool Execution Envelope 接口，共包含 7 个公开字段或方法。 |
| `ToolExecutionScope` | 接口 | <code>interface ToolExecutionScope</code> | Tool Execution Scope 接口，共包含 3 个公开字段或方法。 |
| `ToolIdempotencyLookup` | 接口 | <code>interface ToolIdempotencyLookup</code> | Tool Idempotency Lookup 接口，共包含 3 个公开字段或方法。 |
| `ToolInvocationListRequest` | 接口 | <code>interface ToolInvocationListRequest</code> | Tool Invocation List Request 接口，共包含 4 个公开字段或方法。 |
| `ToolInvocationRecord` | 接口 | <code>interface ToolInvocationRecord</code> | Tool Invocation Record 接口，共包含 37 个公开字段或方法。 |
| `ToolInvocationStore` | 接口 | <code>interface ToolInvocationStore</code> | Tool Invocation Store 接口，共包含 7 个公开字段或方法。 |
| `ToolMiddleware` | 接口 | <code>interface ToolMiddleware</code> | Tool Middleware 接口，共包含 5 个公开字段或方法。 |
| `ToolMiddlewareContext` | 接口 | <code>interface ToolMiddlewareContext</code> | Tool Middleware Context 接口，共包含 5 个公开字段或方法。 |
| `ToolObservationPort` | 接口 | <code>interface ToolObservationPort</code> | Tool Observation Port 接口，共包含 1 个公开字段或方法。 |
| `ToolPrincipal` | 接口 | <code>interface ToolPrincipal</code> | Tool Principal 接口，共包含 13 个公开字段或方法。 |
| `ToolProfileSpec` | 接口 | <code>interface ToolProfileSpec extends VersionedSpec</code> | Tool Profile Spec 接口，共包含 11 个公开字段或方法。 |
| `ToolProgressUpdate` | 接口 | <code>interface ToolProgressUpdate</code> | Tool Progress Update 接口，共包含 6 个公开字段或方法。 |
| `ToolReceiptReconciler` | 接口 | <code>interface ToolReceiptReconciler</code> | Tool Receipt Reconciler 接口，共包含 1 个公开字段或方法。 |
| `ToolReceiptReconciliation` | 接口 | <code>interface ToolReceiptReconciliation</code> | Tool Receipt Reconciliation 接口，共包含 3 个公开字段或方法。 |
| `ToolResultCache` | 接口 | <code>interface ToolResultCache</code> | Tool Result Cache 接口，共包含 3 个公开字段或方法。 |
| `ToolResultCacheArtifactVerifier` | 接口 | <code>interface ToolResultCacheArtifactVerifier</code> | Tool Result Cache Artifact Verifier 接口，共包含 1 个公开字段或方法。 |
| `ToolResultCacheEntry` | 接口 | <code>interface ToolResultCacheEntry</code> | Tool Result Cache Entry 接口，共包含 5 个公开字段或方法。 |
| `ToolRunner` | 接口 | <code>interface ToolRunner</code> | Tool Runner 接口，共包含 2 个公开字段或方法。 |
| `ToolSchemaValidationIssue` | 接口 | <code>interface ToolSchemaValidationIssue</code> | Tool Schema Validation Issue 接口，共包含 2 个公开字段或方法。 |
| `ToolSchemaValidationResult` | 接口 | <code>interface ToolSchemaValidationResult</code> | Tool Schema Validation Result 接口，共包含 3 个公开字段或方法。 |
| `ToolSpec` | 接口 | <code>interface ToolSpec</code> | Tool Spec 接口，共包含 33 个公开字段或方法。 |
| `ToolTargetResolution` | 接口 | <code>interface ToolTargetResolution</code> | Tool Target Resolution 接口，共包含 3 个公开字段或方法。 |
| `ToolTargetResolver` | 接口 | <code>interface ToolTargetResolver</code> | Tool Target Resolver 接口，共包含 1 个公开字段或方法。 |
| `MockToolHandler` | 类型 | <code>type MockToolHandler = (request: ToolCallRequest) =&gt; Promise&lt;ToolCallResult&gt; &#124; ToolCallResult</code> | Mock Tool Handler 公共类型别名；完整类型表达式见声明。 |
| `ResolvedToolSpec` | 类型 | <code>type ResolvedToolSpec = ToolSpec &amp; GovernedToolContractSpec</code> | Resolved Tool Spec 公共类型别名；完整类型表达式见声明。 |
| `ToolExecutionPhase` | 类型 | <code>type ToolExecutionPhase = 'resolution' &#124; 'authorization' &#124; 'input_validation' &#124; 'policy' &#124; 'approval' &#124; 'execution' &#124; 'timeout' &#124; 'output_validation'</code> | Tool Execution Phase 公共类型别名；完整类型表达式见声明。 |
| `ToolHandler` | 类型 | <code>type ToolHandler = (input: TInput, context: ToolCallContext) =&gt; Promise&lt;TOutput&gt;</code> | Tool Handler 公共类型别名；完整类型表达式见声明。 |
| `ToolInvocationPatch` | 类型 | <code>type ToolInvocationPatch = Partial&lt;Pick&lt;ToolInvocationRecord, 'status' &#124; 'executionCycle' &#124; 'attemptCount' &#124; 'result' &#124; 'approvalRequest' &#124; 'updatedAt' &#124; 'startedAt' &#124; 'completedAt' &#124; 'lateResultState' &#124; 'outputHash' &#124; 'artifactRefs' &#124; 'observationRefs' &#124; 'externalReceipt'&gt;&gt;</code> | Tool Invocation Patch 公共类型别名；完整类型表达式见声明。 |
| `ToolInvocationStatus` | 类型 | <code>type ToolInvocationStatus = (typeof TOOL_INVOCATION_STATUSES)[number]</code> | Tool Invocation Status 公共类型别名；完整类型表达式见声明。 |
| `ToolResultContent` | 类型 | <code>type ToolResultContent = { type: 'text'; text: string; } &#124; { type: 'json'; value: unknown; } &#124; { type: 'image'; artifactRef?: string; url?: string; mimeType?: string; alt?: string; } &#124; { type: 'resource'; uri: string; mimeType?: string; title?: string; } &#124; { type: 'artifact'; artifactRef: string; title?: string; mimeType?: string; }</code> | Tool Result Content 公共类型别名；完整类型表达式见声明。 |

## `AllowAllToolAuthorizer`

Allow All Tool Authorizer 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { AllowAllToolAuthorizer } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class AllowAllToolAuthorizer implements ToolAuthorizer {
    authorize(): Promise<ToolAuthorizationDecision>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(): Promise&lt;ToolAuthorizationDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): AllowAllToolAuthorizer</code> | 创建该类的实例。 |

## `GovernedToolRunner`

Governed Tool Runner 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { GovernedToolRunner } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class GovernedToolRunner implements ToolRunner {
    constructor(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: {
            approvalStore?: ToolApprovalStore;
            invocationStore?: ToolInvocationStore;
            authorizer?: ToolAuthorizer;
            middleware?: ToolMiddleware[];
            artifactPort?: ToolArtifactPort;
            snapshotStore?: ToolContractSnapshotStore;
            receiptReconciler?: ToolReceiptReconciler;
            resultCache?: ToolResultCache;
            resultCacheFailureMode?: 'bypass' | 'strict';
            resultCacheTimeoutMs?: number;
            resultCacheMaxEntryBytes?: number;
            resultCacheArtifactVerifier?: ToolResultCacheArtifactVerifier;
            observationPort?: ToolObservationPort;
            telemetry?: TelemetryRecorder;
            now?: () => string;
        });
    getInvocation(invocationId: string): Promise<ToolInvocationRecord | null>;
    listInvocations(request?: ToolInvocationListRequest): Promise<ToolInvocationRecord[]>;
    recoverPendingInvocations(): Promise<ToolCallResult[]>;
    run(request: ToolCallRequest): Promise<ToolCallResult>;
    approveAndResume(invocationId: string, approvedBy: string, options?: {
            approvedAt?: string;
            expiresAt?: string;
        }): Promise<ToolCallResult>;
    rejectInvocation(invocationId: string): Promise<ToolCallResult>;
    cancelInvocation(invocationId: string, reason?: string): Promise<ToolCallResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approveAndResume` | 方法 | <code>approveAndResume(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolCallResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cancelInvocation` | 方法 | <code>cancelInvocation(invocationId: string, reason?: string): Promise&lt;ToolCallResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "bypass" &#124; "strict"; resul...</code> | 创建该类的实例。 |
| `getInvocation` | 方法 | <code>getInvocation(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listInvocations` | 方法 | <code>listInvocations(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recoverPendingInvocations` | 方法 | <code>recoverPendingInvocations(): Promise&lt;ToolCallResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `rejectInvocation` | 方法 | <code>rejectInvocation(invocationId: string): Promise&lt;ToolCallResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `run` | 方法 | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `HttpToolAdapter`

Http Tool Adapter 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { HttpToolAdapter } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class HttpToolAdapter implements ToolAdapter {
    readonly id: string;
    readonly source: ToolSource;
    constructor(id: string, options: HttpToolAdapterOptions);
    capabilities(): Promise<ToolAdapterCapabilities>;
    execute(request: AdapterExecutionRequest): Promise<ToolExecutionEnvelope>;
    cancel(): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>readonly source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InMemoryToolApprovalStore`

In Memory Tool Approval Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryToolApprovalStore } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class InMemoryToolApprovalStore implements ToolApprovalStore {
    getRequest(invocationId: string): Promise<ToolApprovalRequest | null>;
    requestApproval(request: ToolApprovalRequest): Promise<ToolApprovalRequest>;
    getGrant(invocationId: string): Promise<ToolApprovalGrant | null>;
    approve(invocationId: string, approvedBy: string, options?: {
            approvedAt?: string;
            expiresAt?: string;
        }): Promise<ToolApprovalGrant>;
    reject(invocationId: string): Promise<ToolApprovalRequest>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approve` | 方法 | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryToolApprovalStore</code> | 创建该类的实例。 |
| `getGrant` | 方法 | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRequest` | 方法 | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reject` | 方法 | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `requestApproval` | 方法 | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryToolInvocationStore`

In Memory Tool Invocation Store 类，共公开 8 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryToolInvocationStore } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class InMemoryToolInvocationStore implements ToolInvocationStore {
    get(invocationId: string): Promise<ToolInvocationRecord | null>;
    findByIdempotency(request: ToolIdempotencyLookup): Promise<ToolInvocationRecord | null>;
    list(request?: ToolInvocationListRequest): Promise<ToolInvocationRecord[]>;
    create(record: ToolInvocationRecord): Promise<ToolInvocationRecord>;
    update(invocationId: string, patch: ToolInvocationPatch, options?: {
            expectedStatuses?: readonly ToolInvocationStatus[];
            expectedRevision?: number;
        }): Promise<ToolInvocationRecord>;
    getCompleted(invocationId: string): Promise<ToolCallResult | null>;
    saveCompleted(invocationId: string, result: ToolCallResult): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryToolInvocationStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `findByIdempotency` | 方法 | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getCompleted` | 方法 | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveCompleted` | 方法 | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryToolResultCache`

In Memory Tool Result Cache 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryToolResultCache } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class InMemoryToolResultCache implements ToolResultCache {
    constructor(options?: InMemoryToolResultCacheOptions);
    get(key: string): Promise<ToolResultCacheEntry | null>;
    set(entry: ToolResultCacheEntry): Promise<void>;
    delete(key: string): Promise<void>;
    size(): number;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `size` | 方法 | <code>size(): number</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalFunctionToolAdapter`

Local Function Tool Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalFunctionToolAdapter } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class LocalFunctionToolAdapter<TInput = unknown, TOutput = unknown> implements ToolAdapter<TInput, TOutput> {
    readonly id: string;
    readonly source: ToolSource;
    constructor(id: string, handler: ToolHandler<TInput, TOutput>);
    capabilities(): Promise<ToolAdapterCapabilities>;
    execute(request: AdapterExecutionRequest<TInput>): Promise<ToolExecutionEnvelope<TOutput>>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>readonly source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPToolAdapter`

MCP Tool Adapter 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MCPToolAdapter } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class MCPToolAdapter implements ToolAdapter {
    readonly id: string;
    readonly source: ToolSource;
    constructor(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort);
    capabilities(): Promise<ToolAdapterCapabilities>;
    execute(request: AdapterExecutionRequest): Promise<ToolExecutionEnvelope>;
    cancel(request: AdapterCancellationRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>readonly source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MockToolAdapter`

Mock Tool Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MockToolAdapter } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class MockToolAdapter<TInput = unknown, TOutput = unknown> extends LocalFunctionToolAdapter<TInput, TOutput> {
    readonly source: ToolSource;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>readonly source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MockToolRunner`

Mock Tool Runner 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MockToolRunner } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class MockToolRunner implements ToolRunner {
    constructor(defaultOutput?: unknown);
    registerHandler(toolId: string, handler: MockToolHandler): void;
    registerResult(toolId: string, result: ToolCallResult): void;
    run(request: ToolCallRequest): Promise<ToolCallResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(defaultOutput?: unknown): MockToolRunner</code> | 创建该类的实例。 |
| `registerHandler` | 方法 | <code>registerHandler(toolId: string, handler: MockToolHandler): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerResult` | 方法 | <code>registerResult(toolId: string, result: ToolCallResult): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `run` | 方法 | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PermissionScopeToolAuthorizer`

Permission Scope Tool Authorizer 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { PermissionScopeToolAuthorizer } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class PermissionScopeToolAuthorizer implements ToolAuthorizer {
    authorize(input: ToolAuthorizationInput): Promise<ToolAuthorizationDecision>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): PermissionScopeToolAuthorizer</code> | 创建该类的实例。 |

## `PluginToolAdapter`

Plugin Tool Adapter 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { PluginToolAdapter } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class PluginToolAdapter<TInput = unknown, TOutput = unknown> extends LocalFunctionToolAdapter<TInput, TOutput> {
    readonly source: ToolSource;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>readonly source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RedisToolResultCache`

Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments.

- 种类: 类
- 导入: `import { RedisToolResultCache } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class RedisToolResultCache implements ToolResultCache {
    constructor(options: RedisToolResultCacheOptions);
    get(key: string): Promise<ToolResultCacheEntry | null>;
    set(entry: ToolResultCacheEntry): Promise<void>;
    delete(key: string): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolRegistry`

Tool Registry 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ToolRegistry } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class ToolRegistry {
    register(spec: ToolSpec, handler: ToolHandler, options?: {
            replace?: boolean;
            targetResolver?: ToolTargetResolver;
        }): void;
    registerAdapter(spec: ToolSpec, adapter: ToolAdapter, options?: {
            replace?: boolean;
            targetResolver?: ToolTargetResolver;
        }): void;
    unregister(toolId: string): boolean;
    getSpec(toolId: string): ResolvedToolSpec | null;
    getAdapter(toolId: string): ToolAdapter | null;
    getTargetResolver(toolId: string): ToolTargetResolver | null;
    resolve(ref: {
            id: string;
            version?: string;
            revision?: string;
        }): {
            spec: ResolvedToolSpec;
            adapter: ToolAdapter;
        } | null;
    list(): ResolvedToolSpec[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ToolRegistry</code> | 创建该类的实例。 |
| `getAdapter` | 方法 | <code>getAdapter(toolId: string): ToolAdapter &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getSpec` | 方法 | <code>getSpec(toolId: string): ResolvedToolSpec &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getTargetResolver` | 方法 | <code>getTargetResolver(toolId: string): ToolTargetResolver &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): ResolvedToolSpec[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(spec: ToolSpec, handler: ToolHandler, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerAdapter` | 方法 | <code>registerAdapter(spec: ToolSpec, adapter: ToolAdapter, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(ref: { id: string; version?: string; revision?: string; }): { spec: ResolvedToolSpec; adapter: ToolAdapter; } &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `unregister` | 方法 | <code>unregister(toolId: string): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolResultCacheEntryTooLargeError`

Tool Result Cache Entry Too Large Error 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ToolResultCacheEntryTooLargeError } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class ToolResultCacheEntryTooLargeError extends Error {
    readonly actualBytes: number;
    readonly maxEntryBytes: number;
    readonly code = "TOOL_RESULT_CACHE_ENTRY_TOO_LARGE";
    constructor(actualBytes: number, maxEntryBytes: number);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualBytes` | 属性 | <code>readonly actualBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "TOOL_RESULT_CACHE_ENTRY_TOO_LARGE"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | 创建该类的实例。 |
| `maxEntryBytes` | 属性 | <code>readonly maxEntryBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ToolResultCacheOperationTimeoutError`

Tool Result Cache Operation Timeout Error 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ToolResultCacheOperationTimeoutError } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class ToolResultCacheOperationTimeoutError extends Error {
    readonly operation: 'get' | 'set' | 'delete' | 'verify';
    readonly timeoutMs: number;
    readonly code = "TOOL_RESULT_CACHE_TIMEOUT";
    constructor(operation: 'get' | 'set' | 'delete' | 'verify', timeoutMs: number);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "TOOL_RESULT_CACHE_TIMEOUT"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>readonly operation: "delete" &#124; "verify" &#124; "get" &#124; "set"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `timeoutMs` | 属性 | <code>readonly timeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolResultCacheValidationError`

Tool Result Cache Validation Error 类，共公开 9 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ToolResultCacheValidationError } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare class ToolResultCacheValidationError extends Error {
    readonly code = "TOOL_RESULT_CACHE_CORRUPT";
    constructor(message: string);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "TOOL_RESULT_CACHE_CORRUPT"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(message: string): ToolResultCacheValidationError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `TOOL_INVOCATION_STATUSES`

由 `index` 模块导出的 TOOL INVOCATION STATUSES 常量。

- 种类: 常量
- 导入: `import { TOOL_INVOCATION_STATUSES } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const TOOL_INVOCATION_STATUSES: readonly ["created", "validating", "validated", "policy_checked", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "completed", "failed", "timed_out", "expired", "conflict", "denied", "cancelled"];
```

## `toolCacheValidityRecordSchema`

Tool Cache Validity Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolCacheValidityRecordSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolCacheValidityRecordSchema: z.ZodObject<{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional<z.ZodString>; capabilityHash: z.ZodOptional<z.ZodString>; externalStateVersion: z.ZodOptional<z.ZodString>; key: z.ZodString; validUntil: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }>;
```

## `toolProfileSpecDefinition`

Tool Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { toolProfileSpecDefinition } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolProfileSpecDefinition: SpecSchemaDefinition<ToolProfileSpec>;
```

## `toolProfileSpecSchema`

Tool Profile Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolProfileSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolProfileSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolProfileSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `toolResultCacheEntryJsonSchema`

Tool Result Cache Entry 的 JSON Schema。

- 种类: 常量
- 导入: `import { toolResultCacheEntryJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolResultCacheEntryJsonSchema: JsonSchema;
```

## `toolResultCacheEntrySchema`

Tool Result Cache Entry 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolResultCacheEntrySchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolResultCacheEntrySchema: z.ZodObject<{ schemaVersion: z.ZodLiteral<"1.0">; keyVersion: z.ZodLiteral<"1">; validity: z.ZodObject<{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional<z.ZodString>; capabilityHash: z.ZodOptional<z.ZodString>; externalStateVersion: z.ZodOptional<z.ZodString>; key: z.ZodString; validUntil: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }>; result: z.ZodObject<{ output: z.ZodOptional<z.ZodUnknown>; content: z.ZodOptional<z.ZodArray<z.ZodType<ToolResultContent, z.ZodTypeDef, ToolResultContent>, "many">>; artifactRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strict", z.ZodTypeAny, { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }, { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }>; createdAt: z.ZodString; }, "strict", z.ZodTypeAny, { schemaVersion: "1.0"; result: { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }; createdAt: string; keyVersion: "1"; validity: { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }; }, { schemaVersion: "1.0"; result: { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }; createdAt: string; keyVersion: "1"; validity: { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }; }>;
```

## `toolSpecDefinition`

Tool Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { toolSpecDefinition } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolSpecDefinition: SpecSchemaDefinition<ToolSpec>;
```

## `toolSpecDefinitions`

由 `index` 模块导出的 Tool Spec Definitions 常量。

- 种类: 常量
- 导入: `import { toolSpecDefinitions } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolSpecDefinitions: readonly [SpecSchemaDefinition<ToolSpec>, SpecSchemaDefinition<ToolProfileSpec>];
```

## `toolSpecExample`

Tool Spec 的有效示例值。

- 种类: 常量
- 导入: `import { toolSpecExample } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolSpecExample: ToolSpec;
```

## `toolSpecJsonSchema`

Tool Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { toolSpecJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolSpecJsonSchema: JsonSchema;
```

## `toolSpecJsonSchemas`

由 `index` 模块导出的 Tool Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { toolSpecJsonSchemas } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare const toolSpecJsonSchemas: Record<string, JsonSchema>;
```

## `toolSpecSchema`

Tool Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { toolSpecSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const toolSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `normalizeToolSpec`

Normalize Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare function normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec;
```

### 调用签名

```text
normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>ToolSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ResolvedToolSpec`
- 说明: 返回值契约由上述类型定义。

## `validateEffectiveCapabilityAccess`

Validate Effective Capability Access 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateEffectiveCapabilityAccess } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare function validateEffectiveCapabilityAccess(input: {
    snapshot: ToolContractSnapshot | null;
    context: ToolCallContext;
    spec: ToolSpec;
}): string | null;
```

### 调用签名

```text
validateEffectiveCapabilityAccess(input: { snapshot: ToolContractSnapshot | null; context: ToolCallContext; spec: ToolSpec; }): string | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ snapshot: ToolContractSnapshot &#124; null; context: ToolCallContext; spec: ToolSpec; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `validateToolInput`

Validate Tool Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateToolInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare function validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult;
```

### 调用签名

```text
validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `schema` | <code>JsonSchema</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolSchemaValidationResult`
- 说明: 返回值契约由上述类型定义。

## `validateToolResultCacheEntry`

Validate Tool Result Cache Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateToolResultCacheEntry } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare function validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry;
```

### 调用签名

```text
validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `maxEntryBytes` | <code>number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolResultCacheEntry`
- 说明: 返回值契约由上述类型定义。

## `validateToolSpec`

Validate Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export declare function validateToolSpec(input: unknown): ToolSpec;
```

### 调用签名

```text
validateToolSpec(input: unknown): ToolSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolSpec`
- 说明: 返回值契约由上述类型定义。

## `AdapterCancellationRequest`

Adapter Cancellation Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AdapterCancellationRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface AdapterCancellationRequest {
    toolId: string;
    invocationId: string;
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AdapterExecutionRequest`

Adapter Execution Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AdapterExecutionRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface AdapterExecutionRequest<TInput = unknown> {
    toolId: string;
    input: TInput;
    context: ToolCallContext;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HttpToolAdapterOptions`

Http Tool Adapter Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HttpToolAdapterOptions } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface HttpToolAdapterOptions {
    endpoint: string;
    headers?: Record<string, string>;
    resolveHeaders?: () => Promise<Record<string, string>>;
    fetch?: typeof fetch;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `endpoint` | 属性 | <code>endpoint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `headers` | 属性 | <code>headers?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveHeaders` | 方法 | <code>resolveHeaders?(): Promise&lt;Record&lt;string, string&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryToolResultCacheOptions`

In Memory Tool Result Cache Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryToolResultCacheOptions } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface InMemoryToolResultCacheOptions {
    maxEntries?: number;
    maxEntryBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxEntries` | 属性 | <code>maxEntries?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPToolInvocationPort`

MCP Tool Invocation Port 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPToolInvocationPort } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface MCPToolInvocationPort {
    invoke(request: {
        serverId: string;
        capabilityId: string;
        input: unknown;
        context: ToolCallContext;
    }): Promise<unknown>;
    health(serverId: string): Promise<ProviderHealth>;
    cancel?(requestId: string): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel?(requestId: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(serverId: string): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invoke` | 方法 | <code>invoke(request: { serverId: string; capabilityId: string; input: unknown; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisLikeToolResultCacheClient`

Redis Like Tool Result Cache Client 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisLikeToolResultCacheClient } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface RedisLikeToolResultCacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: 'PX', durationMilliseconds?: number): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: string, mode?: "PX", durationMilliseconds?: number): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisToolResultCacheOptions`

Redis Tool Result Cache Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisToolResultCacheOptions } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface RedisToolResultCacheOptions {
    client: RedisLikeToolResultCacheClient;
    namespace?: string;
    maxEntryBytes?: number;
    defaultTtlMs?: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeToolResultCacheClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultTtlMs` | 属性 | <code>defaultTtlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespace` | 属性 | <code>namespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolAdapter`

Tool Adapter 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAdapter } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolAdapter<TInput = unknown, TOutput = unknown> {
    readonly id: string;
    readonly source: ToolSource;
    capabilities(): Promise<ToolAdapterCapabilities>;
    execute(request: AdapterExecutionRequest<TInput>): Promise<ToolExecutionEnvelope<TOutput>>;
    cancel?(request: AdapterCancellationRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel?(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>readonly source: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAdapterCapabilities`

Tool Adapter Capabilities 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAdapterCapabilities } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolAdapterCapabilities {
    execute: boolean;
    cancel: boolean;
    health: boolean;
    close: boolean;
    streaming?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 属性 | <code>cancel: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `close` | 属性 | <code>close: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execute` | 属性 | <code>execute: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `health` | 属性 | <code>health: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streaming` | 属性 | <code>streaming?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolApprovalGrant`

Tool Approval Grant 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolApprovalGrant } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolApprovalGrant {
    requestId: string;
    invocationId: string;
    toolId: string;
    inputHash: string;
    toolRevision?: string;
    contractSnapshotRef?: string;
    principalId?: string;
    policyDecisionRef?: string;
    approvedBy: string;
    approvedAt: string;
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvedAt` | 属性 | <code>approvedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestId` | 属性 | <code>requestId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolApprovalRequest`

Tool Approval Request 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolApprovalRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolApprovalRequest {
    id: string;
    invocationId: string;
    toolId: string;
    toolRevision?: string;
    contractSnapshotRef?: string;
    principalId?: string;
    policyDecisionRef?: string;
    inputHash: string;
    runId: string;
    stepId: string;
    userId?: string;
    reason?: string;
    requestedAt: string;
    expiresAt?: string;
    status: 'pending' | 'approved' | 'rejected' | 'expired' | 'cancelled';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolApprovalStore`

Tool Approval Store 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolApprovalStore } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolApprovalStore {
    getRequest(invocationId: string): Promise<ToolApprovalRequest | null>;
    requestApproval(request: ToolApprovalRequest): Promise<ToolApprovalRequest>;
    getGrant(invocationId: string): Promise<ToolApprovalGrant | null>;
    approve(invocationId: string, approvedBy: string, options?: {
        approvedAt?: string;
        expiresAt?: string;
    }): Promise<ToolApprovalGrant>;
    reject(invocationId: string): Promise<ToolApprovalRequest>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approve` | 方法 | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getGrant` | 方法 | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRequest` | 方法 | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reject` | 方法 | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `requestApproval` | 方法 | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolArtifactPort`

Tool Artifact Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolArtifactPort } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolArtifactPort {
    store(request: {
        invocationId: string;
        toolId: string;
        value: unknown;
        mimeType?: string;
        metadata?: Record<string, unknown>;
    }): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 方法 | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolAuthorizationDecision`

Tool Authorization Decision 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAuthorizationDecision } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolAuthorizationDecision {
    allowed: boolean;
    reason?: string;
    missingPermissionScopes?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missingPermissionScopes` | 属性 | <code>missingPermissionScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAuthorizationInput`

Tool Authorization Input 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAuthorizationInput } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolAuthorizationInput {
    tool: ToolSpec;
    request: ToolCallRequest;
    principal?: ToolPrincipal;
    executionScope?: ToolExecutionScope;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionScope` | 属性 | <code>executionScope?: ToolExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal?: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: ToolCallRequest&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tool` | 属性 | <code>tool: ToolSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolAuthorizer`

Tool Authorizer 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolAuthorizer } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolAuthorizer {
    authorize(input: ToolAuthorizationInput): Promise<ToolAuthorizationDecision>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolCachedResultProjection`

Only stable, replay-safe output fields may cross invocation boundaries.

- 种类: 接口
- 导入: `import type { ToolCachedResultProjection } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolCachedResultProjection {
    output?: unknown;
    content?: ToolResultContent[];
    artifactRefs?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content?: ToolResultContent[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCallContext`

Tool Call Context 接口，共包含 24 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCallContext } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolCallContext {
    runId: string;
    stepId: string;
    invocationId?: string;
    userId?: string;
    tenantId?: string;
    workspaceId?: string;
    sessionId?: string;
    agentId?: string;
    fsmState?: string;
    idempotencyKey?: string;
    operationId?: string;
    correlationId?: string;
    causationId?: string;
    parentEventId?: string;
    contractSnapshotRef?: string;
    capabilitySnapshotRef?: string;
    capabilityApprovals?: EffectiveCapabilityApproval[];
    deadlineAt?: string;
    signal?: AbortSignal;
    abortSignal?: AbortSignal;
    reportProgress?: (update: ToolProgressUpdate) => void | Promise<void>;
    executionScope?: ToolExecutionScope;
    principal?: ToolPrincipal;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityApprovals` | 属性 | <code>capabilityApprovals?: EffectiveCapabilityApproval[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionScope` | 属性 | <code>executionScope?: ToolExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentEventId` | 属性 | <code>parentEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal?: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reportProgress` | 方法 | <code>reportProgress?(update: ToolProgressUpdate): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCallError`

Tool Call Error 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCallError } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolCallError {
    code: string;
    message: string;
    phase: ToolExecutionPhase;
    retryable?: boolean;
    details?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `phase` | 属性 | <code>phase: ToolExecutionPhase</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCallRequest`

Tool Call Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCallRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolCallRequest<TInput = unknown> {
    toolId: string;
    input: TInput;
    context: ToolCallContext;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolCallResult`

Tool Call Result 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolCallResult } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolCallResult<TOutput = unknown> {
    toolId: string;
    invocationId?: string;
    output?: TOutput;
    error?: ToolCallError | string;
    approvalRequest?: ToolApprovalRequest;
    attempts?: number;
    durationMs?: number;
    content?: ToolResultContent[];
    artifactRefs?: string[];
    observationRefs?: string[];
    externalReceipt?: ToolExternalReceipt;
    status: 'completed' | 'failed' | 'denied' | 'human_review_required' | 'cancelled' | 'conflict';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequest` | 属性 | <code>approvalRequest?: ToolApprovalRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attempts` | 属性 | <code>attempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content?: ToolResultContent[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `durationMs` | 属性 | <code>durationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: string &#124; ToolCallError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalReceipt` | 属性 | <code>externalReceipt?: ToolExternalReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observationRefs` | 属性 | <code>observationRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "human_review_required"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolExecutionEnvelope`

Tool Execution Envelope 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolExecutionEnvelope } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolExecutionEnvelope<TOutput = unknown> {
    kind: 'tool_execution_envelope';
    output?: TOutput;
    content?: ToolResultContent[];
    artifactRefs?: string[];
    observationRefs?: string[];
    externalReceipt?: ToolExternalReceipt;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content?: ToolResultContent[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalReceipt` | 属性 | <code>externalReceipt?: ToolExternalReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "tool_execution_envelope"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observationRefs` | 属性 | <code>observationRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolExecutionScope`

Tool Execution Scope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolExecutionScope } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolExecutionScope {
    allowedToolIds?: readonly string[];
    policyRefs?: readonly string[];
    fsmState?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedToolIds` | 属性 | <code>allowedToolIds?: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolIdempotencyLookup`

Tool Idempotency Lookup 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolIdempotencyLookup } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolIdempotencyLookup {
    toolId: string;
    idempotencyKey: string;
    scopeHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolInvocationListRequest`

Tool Invocation List Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolInvocationListRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolInvocationListRequest {
    statuses?: readonly ToolInvocationStatus[];
    toolId?: string;
    runId?: string;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statuses` | 属性 | <code>statuses?: readonly ("completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolInvocationRecord`

Tool Invocation Record 接口，共包含 37 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolInvocationRecord } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolInvocationRecord {
    id: string;
    operationId?: string;
    toolId: string;
    toolVersion?: string;
    toolRevision?: string;
    contractSnapshotRef?: string;
    principal?: ToolPrincipal;
    scope?: {
        tenantId?: string;
        userId?: string;
        workspaceId?: string;
        sessionId?: string;
        runId: string;
        stepId?: string;
        agentId?: string;
        fsmState?: string;
    };
    status: ToolInvocationStatus;
    inputHash: string;
    redactedInput?: unknown;
    sideEffectLevel?: SideEffectLevel;
    idempotencyKey?: string;
    idempotencyFingerprint?: string;
    reusedFromInvocationId?: string;
    request: ToolCallRequest;
    executionCycle: number;
    attemptCount: number;
    revision: number;
    result?: ToolCallResult;
    approvalRequest?: ToolApprovalRequest;
    approvalRequestId?: string;
    maxAttempts?: number;
    queuedAt?: string;
    deadlineAt?: string;
    outputHash?: string;
    artifactRefs?: string[];
    observationRefs?: string[];
    externalReceipt?: {
        provider?: string;
        receiptId: string;
        status?: string;
        metadata?: Record<string, unknown>;
    };
    lateResultState?: 'none' | 'pending' | 'accepted' | 'discarded' | 'quarantined';
    correlationId?: string;
    causationId?: string;
    metadata?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    startedAt?: string;
    completedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequest` | 属性 | <code>approvalRequest?: ToolApprovalRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvalRequestId` | 属性 | <code>approvalRequestId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attemptCount` | 属性 | <code>attemptCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionCycle` | 属性 | <code>executionCycle: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalReceipt` | 属性 | <code>externalReceipt?: { provider?: string; receiptId: string; status?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyFingerprint` | 属性 | <code>idempotencyFingerprint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lateResultState` | 属性 | <code>lateResultState?: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observationRefs` | 属性 | <code>observationRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputHash` | 属性 | <code>outputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal?: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queuedAt` | 属性 | <code>queuedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redactedInput` | 属性 | <code>redactedInput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: ToolCallRequest&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `result` | 属性 | <code>result?: ToolCallResult&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reusedFromInvocationId` | 属性 | <code>reusedFromInvocationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: { tenantId?: string; userId?: string; workspaceId?: string; sessionId?: string; runId: string; stepId?: string; agentId?: string; fsmState?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel?: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRevision` | 属性 | <code>toolRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolVersion` | 属性 | <code>toolVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolInvocationStore`

Tool Invocation Store 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolInvocationStore } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolInvocationStore {
    get(invocationId: string): Promise<ToolInvocationRecord | null>;
    findByIdempotency(request: ToolIdempotencyLookup): Promise<ToolInvocationRecord | null>;
    list(request?: ToolInvocationListRequest): Promise<ToolInvocationRecord[]>;
    create(record: ToolInvocationRecord): Promise<ToolInvocationRecord>;
    update(invocationId: string, patch: ToolInvocationPatch, options?: {
        expectedStatuses?: readonly ToolInvocationStatus[];
        expectedRevision?: number;
    }): Promise<ToolInvocationRecord>;
    getCompleted(invocationId: string): Promise<ToolCallResult | null>;
    saveCompleted(invocationId: string, result: ToolCallResult): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `findByIdempotency` | 方法 | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getCompleted` | 方法 | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `saveCompleted` | 方法 | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolMiddleware`

Tool Middleware 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolMiddleware } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolMiddleware {
    id: string;
    beforeAuthorization?(context: ToolMiddlewareContext): Promise<void> | void;
    beforeExecution?(context: ToolMiddlewareContext): Promise<void> | void;
    afterExecution?(context: ToolMiddlewareContext, result: ToolExecutionEnvelope): Promise<ToolExecutionEnvelope | void> | ToolExecutionEnvelope | void;
    onError?(context: ToolMiddlewareContext, error: unknown): Promise<void> | void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterExecution` | 方法 | <code>afterExecution?(context: ToolMiddlewareContext, result: ToolExecutionEnvelope): Promise&lt;ToolExecutionEnvelope &#124; void&gt; &#124; ToolExecutionEnvelope &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `beforeAuthorization` | 方法 | <code>beforeAuthorization?(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `beforeExecution` | 方法 | <code>beforeExecution?(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onError` | 方法 | <code>onError?(context: ToolMiddlewareContext, error: unknown): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolMiddlewareContext`

Tool Middleware Context 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolMiddlewareContext } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolMiddlewareContext {
    invocationId: string;
    request: ToolCallRequest;
    originalRequest: ToolCallRequest;
    spec: ResolvedToolSpec;
    attempt?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `originalRequest` | 属性 | <code>originalRequest: ToolCallRequest&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: ToolCallRequest&lt;unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: ResolvedToolSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolObservationPort`

Tool Observation Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolObservationPort } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolObservationPort {
    record(request: {
        invocationId: string;
        toolId: string;
        toolRevision: string;
        runId: string;
        stepId: string;
        inputHash: string;
        outputHash: string;
        value: unknown;
        artifactRefs?: string[];
        provenance: Record<string, unknown>;
    }): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolPrincipal`

Tool Principal 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolPrincipal } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolPrincipal {
    id: string;
    principalId?: string;
    type: 'user' | 'agent' | 'service' | 'system';
    permissionScopes: readonly string[];
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    agentId?: string;
    roles?: readonly string[];
    delegatedBy?: string;
    delegationDepth?: number;
    authenticationContext?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authenticationContext` | 属性 | <code>authenticationContext?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delegatedBy` | 属性 | <code>delegatedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delegationDepth` | 属性 | <code>delegationDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `roles` | 属性 | <code>roles?: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolProfileSpec`

Tool Profile Spec 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolProfileSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolProfileSpec extends VersionedSpec {
    toolRefs: SpecRef[];
    mcpProfileRefs?: SpecRef[];
    policyRefs?: SpecRef[];
    defaultPermissionScopes?: string[];
    contractSnapshotMode?: 'run' | 'state';
    lazyLoad?: boolean;
    maxLoadedTools?: number;
    metadata?: Record<string, unknown>;
    /** @deprecated Register Tool contracts separately and use toolRefs. */
    tools?: ToolSpec[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractSnapshotMode` | 属性 | <code>contractSnapshotMode?: "run" &#124; "state"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultPermissionScopes` | 属性 | <code>defaultPermissionScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lazyLoad` | 属性 | <code>lazyLoad?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxLoadedTools` | 属性 | <code>maxLoadedTools?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfileRefs` | 属性 | <code>mcpProfileRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRefs` | 属性 | <code>toolRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools?: ToolSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolProgressUpdate`

Tool Progress Update 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolProgressUpdate } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolProgressUpdate {
    message?: string;
    current?: number;
    total?: number;
    percentage?: number;
    stage?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `current` | 属性 | <code>current?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `percentage` | 属性 | <code>percentage?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stage` | 属性 | <code>stage?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `total` | 属性 | <code>total?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolReceiptReconciler`

Tool Receipt Reconciler 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolReceiptReconciler } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolReceiptReconciler {
    reconcile(request: {
        invocationId: string;
        tool: ResolvedToolSpec;
        call: ToolCallRequest;
        attempt: number;
    }): Promise<ToolReceiptReconciliation>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reconcile` | 方法 | <code>reconcile(request: { invocationId: string; tool: ResolvedToolSpec; call: ToolCallRequest; attempt: number; }): Promise&lt;ToolReceiptReconciliation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolReceiptReconciliation`

Tool Receipt Reconciliation 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolReceiptReconciliation } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolReceiptReconciliation {
    state: 'committed' | 'not_committed' | 'unknown';
    receipt?: ToolExternalReceipt;
    details?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receipt` | 属性 | <code>receipt?: ToolExternalReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: "unknown" &#124; "committed" &#124; "not_committed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolResultCache`

Tool Result Cache 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolResultCache } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolResultCache {
    get(key: string): Promise<ToolResultCacheEntry | null>;
    set(entry: ToolResultCacheEntry): Promise<void>;
    delete?(key: string): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete?(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolResultCacheArtifactVerifier`

Tool Result Cache Artifact Verifier 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolResultCacheArtifactVerifier } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolResultCacheArtifactVerifier {
    verify(request: {
        toolId: string;
        artifactRefs: readonly string[];
        tenantId?: string;
        userId?: string;
        workspaceId?: string;
    }): Promise<boolean>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(request: { toolId: string; artifactRefs: readonly string[]; tenantId?: string; userId?: string; workspaceId?: string; }): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolResultCacheEntry`

Tool Result Cache Entry 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolResultCacheEntry } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolResultCacheEntry {
    schemaVersion: '1.0';
    keyVersion: '1';
    validity: ToolCacheValidityRecord;
    result: ToolCachedResultProjection;
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `keyVersion` | 属性 | <code>keyVersion: "1"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `result` | 属性 | <code>result: ToolCachedResultProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validity` | 属性 | <code>validity: ToolCacheValidityRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolRunner`

Tool Runner 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolRunner } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolRunner {
    run(request: ToolCallRequest): Promise<ToolCallResult>;
    cancelInvocation?(invocationId: string, reason?: string): Promise<ToolCallResult | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelInvocation` | 方法 | <code>cancelInvocation?(invocationId: string, reason?: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `run` | 方法 | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolSchemaValidationIssue`

Tool Schema Validation Issue 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolSchemaValidationIssue } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolSchemaValidationIssue {
    path: string;
    message: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolSchemaValidationResult`

Tool Schema Validation Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolSchemaValidationResult } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolSchemaValidationResult {
    valid: boolean;
    error?: string;
    issues: ToolSchemaValidationIssue[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issues` | 属性 | <code>issues: ToolSchemaValidationIssue[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `valid` | 属性 | <code>valid: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolSpec`

Tool Spec 接口，共包含 33 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolSpec {
    id: string;
    version: string;
    revision?: string;
    name?: string;
    displayName?: string;
    description: string;
    instructions?: string;
    tags?: string[];
    inputSchema: JsonSchema;
    outputSchema?: JsonSchema;
    input?: ToolSchemaSpec;
    output?: ToolSchemaSpec;
    sideEffectLevel: SideEffectLevel;
    permissionScope?: string[];
    preconditions?: string[];
    postconditions?: string[];
    timeoutPolicy?: TimeoutPolicySpec;
    retryPolicy?: RetryPolicySpec;
    auditPolicy?: AuditPolicySpec;
    humanApprovalPolicy?: HumanReviewPolicySpec;
    idempotencyPolicy?: {
        mode: 'none' | 'optional' | 'required';
    };
    source?: ToolSource;
    sourceRef?: {
        serverId?: string;
        capabilityId?: string;
        capabilityHash?: string;
        trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
        declarationSource?: 'framework' | 'user' | 'server' | 'unknown';
    } & ToolSourceRef;
    semantics?: ToolSemanticSpec;
    execution?: ToolExecutionPolicySpec;
    governance?: ToolGovernanceSpec;
    observability?: ToolObservabilitySpec;
    cache?: ToolCachePolicySpec;
    streaming?: ToolStreamingSpec;
    enabled?: boolean;
    deprecated?: boolean;
    replacedBy?: {
        id: string;
        version?: string;
        revision?: string;
    };
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `auditPolicy` | 属性 | <code>auditPolicy?: AuditPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cache` | 属性 | <code>cache?: ToolCachePolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deprecated` | 属性 | <code>deprecated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `displayName` | 属性 | <code>displayName?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enabled` | 属性 | <code>enabled?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execution` | 属性 | <code>execution?: ToolExecutionPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `governance` | 属性 | <code>governance?: ToolGovernanceSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanApprovalPolicy` | 属性 | <code>humanApprovalPolicy?: HumanReviewPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyPolicy` | 属性 | <code>idempotencyPolicy?: { mode: "none" &#124; "optional" &#124; "required"; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input?: ToolSchemaSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructions` | 属性 | <code>instructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observability` | 属性 | <code>observability?: ToolObservabilitySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: ToolSchemaSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputSchema` | 属性 | <code>outputSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScope` | 属性 | <code>permissionScope?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `postconditions` | 属性 | <code>postconditions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preconditions` | 属性 | <code>preconditions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replacedBy` | 属性 | <code>replacedBy?: { id: string; version?: string; revision?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryPolicy` | 属性 | <code>retryPolicy?: RetryPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `semantics` | 属性 | <code>semantics?: ToolSemanticSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source?: ToolSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRef` | 属性 | <code>sourceRef?: { serverId?: string; capabilityId?: string; capabilityHash?: string; trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"; declarationSource?: "framework" &#124; "user" &#124; "server" &#124; "unknown"; } &amp; ToolSourceRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streaming` | 属性 | <code>streaming?: ToolStreamingSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy?: TimeoutPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolTargetResolution`

Tool Target Resolution 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolTargetResolution } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolTargetResolution {
    toolId: string;
    input: unknown;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolId` | 属性 | <code>toolId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolTargetResolver`

Tool Target Resolver 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolTargetResolver } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export interface ToolTargetResolver {
    resolve(request: ToolCallRequest, registry: ToolRegistry): Promise<ToolTargetResolution>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve(request: ToolCallRequest, registry: ToolRegistry): Promise&lt;ToolTargetResolution&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MockToolHandler`

Mock Tool Handler 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MockToolHandler } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export type MockToolHandler = (request: ToolCallRequest) => Promise<ToolCallResult> | ToolCallResult;
```

## `ResolvedToolSpec`

Resolved Tool Spec 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ResolvedToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export type ResolvedToolSpec = ToolSpec & GovernedToolContractSpec;
```

## `ToolExecutionPhase`

Tool Execution Phase 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ToolExecutionPhase } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export type ToolExecutionPhase = 'resolution' | 'authorization' | 'input_validation' | 'policy' | 'approval' | 'execution' | 'timeout' | 'output_validation';
```

## `ToolHandler`

Tool Handler 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ToolHandler } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export type ToolHandler<TInput = unknown, TOutput = unknown> = (input: TInput, context: ToolCallContext) => Promise<TOutput>;
```

## `ToolInvocationPatch`

Tool Invocation Patch 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ToolInvocationPatch } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export type ToolInvocationPatch = Partial<Pick<ToolInvocationRecord, 'status' | 'executionCycle' | 'attemptCount' | 'result' | 'approvalRequest' | 'updatedAt' | 'startedAt' | 'completedAt' | 'lateResultState' | 'outputHash' | 'artifactRefs' | 'observationRefs' | 'externalReceipt'>>;
```

## `ToolInvocationStatus`

Tool Invocation Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ToolInvocationStatus } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export type ToolInvocationStatus = (typeof TOOL_INVOCATION_STATUSES)[number];
```

## `ToolResultContent`

Tool Result Content 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ToolResultContent } from '@codesoul-co/hypha-tools';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### 声明

```text
export type ToolResultContent = {
    type: 'text';
    text: string;
} | {
    type: 'json';
    value: unknown;
} | {
    type: 'image';
    artifactRef?: string;
    url?: string;
    mimeType?: string;
    alt?: string;
} | {
    type: 'resource';
    uri: string;
    mimeType?: string;
    title?: string;
} | {
    type: 'artifact';
    artifactRef: string;
    title?: string;
    mimeType?: string;
};
```
