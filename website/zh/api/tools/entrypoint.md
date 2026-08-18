# `@codesoul-co/hypha-tools` / `index`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)
- 导出数: **85**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `AllowAllToolAuthorizer` | 类 | <code>new AllowAllToolAuthorizer(): AllowAllToolAuthorizer</code> | Allow All Tool Authorizer 的运行时实现；公开构造函数与成员见下表。 |
| `GovernedToolRunner` | 类 | <code>new GovernedToolRunner(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "byp...</code> | Governed Tool Runner 的运行时实现；公开构造函数与成员见下表。 |
| `HttpToolAdapter` | 类 | <code>new HttpToolAdapter(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | Http Tool Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryToolApprovalStore` | 类 | <code>new InMemoryToolApprovalStore(): InMemoryToolApprovalStore</code> | In Memory Tool Approval Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryToolInvocationStore` | 类 | <code>new InMemoryToolInvocationStore(): InMemoryToolInvocationStore</code> | In Memory Tool Invocation Store 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryToolResultCache` | 类 | <code>new InMemoryToolResultCache(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | In Memory Tool Result Cache 的运行时实现；公开构造函数与成员见下表。 |
| `LocalFunctionToolAdapter` | 类 | <code>new LocalFunctionToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | Local Function Tool Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `MCPToolAdapter` | 类 | <code>new MCPToolAdapter(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | MCP Tool Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `MockToolAdapter` | 类 | <code>new MockToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | Mock Tool Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `MockToolRunner` | 类 | <code>new MockToolRunner(defaultOutput?: unknown): MockToolRunner</code> | Mock Tool Runner 的运行时实现；公开构造函数与成员见下表。 |
| `PermissionScopeToolAuthorizer` | 类 | <code>new PermissionScopeToolAuthorizer(): PermissionScopeToolAuthorizer</code> | Permission Scope Tool Authorizer 的运行时实现；公开构造函数与成员见下表。 |
| `PluginToolAdapter` | 类 | <code>new PluginToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | Plugin Tool Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `RedisToolResultCache` | 类 | <code>new RedisToolResultCache(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments. |
| `ToolRegistry` | 类 | <code>new ToolRegistry(): ToolRegistry</code> | Tool Registry 的运行时实现；公开构造函数与成员见下表。 |
| `ToolResultCacheEntryTooLargeError` | 类 | <code>new ToolResultCacheEntryTooLargeError(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | Tool Result Cache Entry Too Large Error 的运行时实现；公开构造函数与成员见下表。 |
| `ToolResultCacheOperationTimeoutError` | 类 | <code>new ToolResultCacheOperationTimeoutError(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | Tool Result Cache Operation Timeout Error 的运行时实现；公开构造函数与成员见下表。 |
| `ToolResultCacheValidationError` | 类 | <code>new ToolResultCacheValidationError(message: string): ToolResultCacheValidationError</code> | Tool Result Cache Validation Error 的运行时实现；公开构造函数与成员见下表。 |
| `TOOL_INVOCATION_STATUSES` | 常量 | <code>const TOOL_INVOCATION_STATUSES: readonly ["created", "validating", "validated", "policy_checked", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "completed", "failed", "timed_out", "expired", "conflict", "denied", "cancelled"]</code> | 由 `index` 模块导出的 TOOL INVOCATION STATUSES 常量。 |
| `toolCacheValidityRecordSchema` | 常量 | <code>const toolCacheValidityRecordSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.ZodString; validUntil: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { toolId: st...</code> | tool Cache Validity Record 的运行时 Schema。 |
| `toolProfileSpecDefinition` | 常量 | <code>const toolProfileSpecDefinition: SpecSchemaDefinition&lt;ToolProfileSpec&gt;</code> | tool Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `toolProfileSpecSchema` | 常量 | <code>const toolProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; toolRefs: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; un...</code> | tool Profile Spec 的运行时 Schema。 |
| `toolResultCacheEntryJsonSchema` | 常量 | <code>const toolResultCacheEntryJsonSchema: JsonSchema</code> | tool Result Cache Entry 的 JSON Schema。 |
| `toolResultCacheEntrySchema` | 常量 | <code>const toolResultCacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; validity: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.Zo...</code> | tool Result Cache Entry 的运行时 Schema。 |
| `toolSpecDefinition` | 常量 | <code>const toolSpecDefinition: SpecSchemaDefinition&lt;ToolSpec&gt;</code> | tool Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `toolSpecDefinitions` | 常量 | <code>const toolSpecDefinitions: readonly [SpecSchemaDefinition&lt;ToolSpec&gt;, SpecSchemaDefinition&lt;ToolProfileSpec&gt;]</code> | 由 `index` 模块导出的 tool Spec Definitions 常量。 |
| `toolSpecExample` | 常量 | <code>const toolSpecExample: ToolSpec</code> | tool Spec 的有效示例值。 |
| `toolSpecJsonSchema` | 常量 | <code>const toolSpecJsonSchema: JsonSchema</code> | tool Spec 的 JSON Schema。 |
| `toolSpecJsonSchemas` | 常量 | <code>const toolSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 tool Spec Json Schemas 常量。 |
| `toolSpecSchema` | 常量 | <code>const toolSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; outputSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSch...</code> | tool Spec 的运行时 Schema。 |
| `normalizeToolSpec` | 函数 | <code>normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec</code> | 规范化 Tool Spec。 |
| `validateEffectiveCapabilityAccess` | 函数 | <code>validateEffectiveCapabilityAccess(input: { snapshot: ToolContractSnapshot &#124; null; context: ToolCallContext; spec: ToolSpec; }): string &#124; null</code> | 校验 Effective Capability Access。 |
| `validateToolInput` | 函数 | <code>validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult</code> | 校验 Tool Input。 |
| `validateToolResultCacheEntry` | 函数 | <code>validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry</code> | 校验 Tool Result Cache Entry。 |
| `validateToolSpec` | 函数 | <code>validateToolSpec(input: unknown): ToolSpec</code> | 校验 Tool Spec。 |
| `AdapterCancellationRequest` | 接口 | <code>interface AdapterCancellationRequest</code> | Adapter Cancellation Request 的字段契约；完整字段见下表。 |
| `AdapterExecutionRequest` | 接口 | <code>interface AdapterExecutionRequest</code> | Adapter Execution Request 的字段契约；完整字段见下表。 |
| `HttpToolAdapterOptions` | 接口 | <code>interface HttpToolAdapterOptions</code> | Http Tool Adapter Options 的字段契约；完整字段见下表。 |
| `InMemoryToolResultCacheOptions` | 接口 | <code>interface InMemoryToolResultCacheOptions</code> | In Memory Tool Result Cache Options 的字段契约；完整字段见下表。 |
| `MCPToolInvocationPort` | 接口 | <code>interface MCPToolInvocationPort</code> | MCP Tool Invocation Port 的字段契约；完整字段见下表。 |
| `RedisLikeToolResultCacheClient` | 接口 | <code>interface RedisLikeToolResultCacheClient</code> | Redis Like Tool Result Cache Client 的字段契约；完整字段见下表。 |
| `RedisToolResultCacheOptions` | 接口 | <code>interface RedisToolResultCacheOptions</code> | Redis Tool Result Cache Options 的字段契约；完整字段见下表。 |
| `ToolAdapter` | 接口 | <code>interface ToolAdapter</code> | Tool Adapter 的字段契约；完整字段见下表。 |
| `ToolAdapterCapabilities` | 接口 | <code>interface ToolAdapterCapabilities</code> | Tool Adapter Capabilities 的字段契约；完整字段见下表。 |
| `ToolApprovalGrant` | 接口 | <code>interface ToolApprovalGrant</code> | Tool Approval Grant 的字段契约；完整字段见下表。 |
| `ToolApprovalRequest` | 接口 | <code>interface ToolApprovalRequest</code> | Tool Approval Request 的字段契约；完整字段见下表。 |
| `ToolApprovalStore` | 接口 | <code>interface ToolApprovalStore</code> | Tool Approval Store 的字段契约；完整字段见下表。 |
| `ToolArtifactPort` | 接口 | <code>interface ToolArtifactPort</code> | Tool Artifact Port 的字段契约；完整字段见下表。 |
| `ToolAuthorizationDecision` | 接口 | <code>interface ToolAuthorizationDecision</code> | Tool Authorization Decision 的字段契约；完整字段见下表。 |
| `ToolAuthorizationInput` | 接口 | <code>interface ToolAuthorizationInput</code> | Tool Authorization Input 的字段契约；完整字段见下表。 |
| `ToolAuthorizer` | 接口 | <code>interface ToolAuthorizer</code> | Tool Authorizer 的字段契约；完整字段见下表。 |
| `ToolCachedResultProjection` | 接口 | <code>interface ToolCachedResultProjection</code> | Only stable, replay-safe output fields may cross invocation boundaries. |
| `ToolCallContext` | 接口 | <code>interface ToolCallContext</code> | Tool Call Context 的字段契约；完整字段见下表。 |
| `ToolCallError` | 接口 | <code>interface ToolCallError</code> | Tool Call Error 的字段契约；完整字段见下表。 |
| `ToolCallRequest` | 接口 | <code>interface ToolCallRequest</code> | Tool Call Request 的字段契约；完整字段见下表。 |
| `ToolCallResult` | 接口 | <code>interface ToolCallResult</code> | Tool Call Result 的字段契约；完整字段见下表。 |
| `ToolExecutionEnvelope` | 接口 | <code>interface ToolExecutionEnvelope</code> | Tool Execution Envelope 的字段契约；完整字段见下表。 |
| `ToolExecutionScope` | 接口 | <code>interface ToolExecutionScope</code> | Tool Execution Scope 的字段契约；完整字段见下表。 |
| `ToolIdempotencyLookup` | 接口 | <code>interface ToolIdempotencyLookup</code> | Tool Idempotency Lookup 的字段契约；完整字段见下表。 |
| `ToolInvocationListRequest` | 接口 | <code>interface ToolInvocationListRequest</code> | Tool Invocation List Request 的字段契约；完整字段见下表。 |
| `ToolInvocationRecord` | 接口 | <code>interface ToolInvocationRecord</code> | Tool Invocation Record 的字段契约；完整字段见下表。 |
| `ToolInvocationStore` | 接口 | <code>interface ToolInvocationStore</code> | Tool Invocation Store 的字段契约；完整字段见下表。 |
| `ToolMiddleware` | 接口 | <code>interface ToolMiddleware</code> | Tool Middleware 的字段契约；完整字段见下表。 |
| `ToolMiddlewareContext` | 接口 | <code>interface ToolMiddlewareContext</code> | Tool Middleware Context 的字段契约；完整字段见下表。 |
| `ToolObservationPort` | 接口 | <code>interface ToolObservationPort</code> | Tool Observation Port 的字段契约；完整字段见下表。 |
| `ToolPrincipal` | 接口 | <code>interface ToolPrincipal</code> | Tool Principal 的字段契约；完整字段见下表。 |
| `ToolProfileSpec` | 接口 | <code>interface ToolProfileSpec extends VersionedSpec</code> | Tool Profile Spec 的字段契约；完整字段见下表。 |
| `ToolProgressUpdate` | 接口 | <code>interface ToolProgressUpdate</code> | Tool Progress Update 的字段契约；完整字段见下表。 |
| `ToolReceiptReconciler` | 接口 | <code>interface ToolReceiptReconciler</code> | Tool Receipt Reconciler 的字段契约；完整字段见下表。 |
| `ToolReceiptReconciliation` | 接口 | <code>interface ToolReceiptReconciliation</code> | Tool Receipt Reconciliation 的字段契约；完整字段见下表。 |
| `ToolResultCache` | 接口 | <code>interface ToolResultCache</code> | Tool Result Cache 的字段契约；完整字段见下表。 |
| `ToolResultCacheArtifactVerifier` | 接口 | <code>interface ToolResultCacheArtifactVerifier</code> | Tool Result Cache Artifact Verifier 的字段契约；完整字段见下表。 |
| `ToolResultCacheEntry` | 接口 | <code>interface ToolResultCacheEntry</code> | Tool Result Cache Entry 的字段契约；完整字段见下表。 |
| `ToolRunner` | 接口 | <code>interface ToolRunner</code> | Tool Runner 的字段契约；完整字段见下表。 |
| `ToolSchemaValidationIssue` | 接口 | <code>interface ToolSchemaValidationIssue</code> | Tool Schema Validation Issue 的字段契约；完整字段见下表。 |
| `ToolSchemaValidationResult` | 接口 | <code>interface ToolSchemaValidationResult</code> | Tool Schema Validation Result 的字段契约；完整字段见下表。 |
| `ToolSpec` | 接口 | <code>interface ToolSpec</code> | Tool Spec 的字段契约；完整字段见下表。 |
| `ToolTargetResolution` | 接口 | <code>interface ToolTargetResolution</code> | Tool Target Resolution 的字段契约；完整字段见下表。 |
| `ToolTargetResolver` | 接口 | <code>interface ToolTargetResolver</code> | Tool Target Resolver 的字段契约；完整字段见下表。 |
| `MockToolHandler` | 类型 | <code>type MockToolHandler = (request: ToolCallRequest) =&gt; Promise&lt;ToolCallResult&gt; &#124; ToolCallResult</code> | Mock Tool Handler 的公共类型别名。 |
| `ResolvedToolSpec` | 类型 | <code>type ResolvedToolSpec = ToolSpec &amp; GovernedToolContractSpec</code> | Resolved Tool Spec 的公共类型别名。 |
| `ToolExecutionPhase` | 类型 | <code>type ToolExecutionPhase = 'resolution' &#124; 'authorization' &#124; 'input_validation' &#124; 'policy' &#124; 'approval' &#124; 'execution' &#124; 'timeout' &#124; 'output_validation'</code> | Tool Execution Phase 的公共类型别名。 |
| `ToolHandler` | 类型 | <code>type ToolHandler = (input: TInput, context: ToolCallContext) =&gt; Promise&lt;TOutput&gt;</code> | Tool Handler 的公共类型别名。 |
| `ToolInvocationPatch` | 类型 | <code>type ToolInvocationPatch = Partial&lt;Pick&lt;ToolInvocationRecord, 'status' &#124; 'executionCycle' &#124; 'attemptCount' &#124; 'result' &#124; 'approvalRequest' &#124; 'updatedAt' &#124; 'startedAt' &#124; 'completedAt' &#124; 'lateResultState' &#124; 'outputHash' &#124; 'artifactRefs' &#124; 'observationRefs' &#124; 'externalReceipt'&gt;&gt;</code> | Tool Invocation Patch 的公共类型别名。 |
| `ToolInvocationStatus` | 类型 | <code>type ToolInvocationStatus = (typeof TOOL_INVOCATION_STATUSES)[number]</code> | Tool Invocation Status 的公共类型别名。 |
| `ToolResultContent` | 类型 | <code>type ToolResultContent = { type: 'text'; text: string; } &#124; { type: 'json'; value: unknown; } &#124; { type: 'image'; artifactRef?: string; url?: string; mimeType?: string; alt?: string; } &#124; { type: 'resource'; uri: string; mimeType?: string; title?: string; } &#124; { type: 'artifact'; artifactRef: string; title?: string; mimeType?: string; }</code> | Tool Result Content 的公共类型别名。 |

## `AllowAllToolAuthorizer` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(): Promise&lt;ToolAuthorizationDecision&gt;</code> | authorize 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): AllowAllToolAuthorizer</code> | 创建该类的实例。 |

## `GovernedToolRunner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approveAndResume` | 方法 | <code>approveAndResume(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolCallResult&gt;</code> | approve And Resume 的公开运行时操作。 |
| `cancelInvocation` | 方法 | <code>cancelInvocation(invocationId: string, reason?: string): Promise&lt;ToolCallResult&gt;</code> | 取消 Invocation。 |
| `constructor` | 构造函数 | <code>(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "bypass" &#124; "strict"; resul...</code> | 创建该类的实例。 |
| `getInvocation` | 方法 | <code>getInvocation(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 读取 Invocation。 |
| `listInvocations` | 方法 | <code>listInvocations(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 列出 Invocations。 |
| `recoverPendingInvocations` | 方法 | <code>recoverPendingInvocations(): Promise&lt;ToolCallResult[]&gt;</code> | recover Pending Invocations 的公开运行时操作。 |
| `rejectInvocation` | 方法 | <code>rejectInvocation(invocationId: string): Promise&lt;ToolCallResult&gt;</code> | reject Invocation 的公开运行时操作。 |
| `run` | 方法 | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | run 的公开运行时操作。 |

## `HttpToolAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |

## `InMemoryToolApprovalStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approve` | 方法 | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | approve 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryToolApprovalStore</code> | 创建该类的实例。 |
| `getGrant` | 方法 | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | 读取 Grant。 |
| `getRequest` | 方法 | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | 读取 Request。 |
| `reject` | 方法 | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | reject 的公开运行时操作。 |
| `requestApproval` | 方法 | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | request Approval 的公开运行时操作。 |

## `InMemoryToolInvocationStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryToolInvocationStore</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | 创建 create。 |
| `findByIdempotency` | 方法 | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | find By Idempotency 的公开运行时操作。 |
| `get` | 方法 | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 读取 get。 |
| `getCompleted` | 方法 | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 读取 Completed。 |
| `list` | 方法 | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 列出 list。 |
| `saveCompleted` | 方法 | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | 保存 Completed。 |
| `update` | 方法 | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | update 的公开运行时操作。 |

## `InMemoryToolResultCache` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | 写入 set。 |
| `size` | 方法 | <code>size(): number</code> | size 的公开运行时操作。 |

## `LocalFunctionToolAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |

## `MCPToolAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |

## `MockToolAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |

## `MockToolRunner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(defaultOutput?: unknown): MockToolRunner</code> | 创建该类的实例。 |
| `registerHandler` | 方法 | <code>registerHandler(toolId: string, handler: MockToolHandler): void</code> | 注册 Handler。 |
| `registerResult` | 方法 | <code>registerResult(toolId: string, result: ToolCallResult): void</code> | 注册 Result。 |
| `run` | 方法 | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | run 的公开运行时操作。 |

## `PermissionScopeToolAuthorizer` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | authorize 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): PermissionScopeToolAuthorizer</code> | 创建该类的实例。 |

## `PluginToolAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |

## `RedisToolResultCache` 公开成员

Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | 写入 set。 |

## `ToolRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ToolRegistry</code> | 创建该类的实例。 |
| `getAdapter` | 方法 | <code>getAdapter(toolId: string): ToolAdapter &#124; null</code> | 读取 Adapter。 |
| `getSpec` | 方法 | <code>getSpec(toolId: string): ResolvedToolSpec &#124; null</code> | 读取 Spec。 |
| `getTargetResolver` | 方法 | <code>getTargetResolver(toolId: string): ToolTargetResolver &#124; null</code> | 读取 Target Resolver。 |
| `list` | 方法 | <code>list(): ResolvedToolSpec[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(spec: ToolSpec, handler: ToolHandler, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | 注册 register。 |
| `registerAdapter` | 方法 | <code>registerAdapter(spec: ToolSpec, adapter: ToolAdapter, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | 注册 Adapter。 |
| `resolve` | 方法 | <code>resolve(ref: { id: string; version?: string; revision?: string; }): { spec: ResolvedToolSpec; adapter: ToolAdapter; } &#124; null</code> | 解析 resolve。 |
| `unregister` | 方法 | <code>unregister(toolId: string): boolean</code> | unregister 的公开运行时操作。 |

## `ToolResultCacheEntryTooLargeError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actualBytes` | 属性 | <code>actualBytes: number</code> | actual Bytes 字段。 |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: "TOOL_RESULT_CACHE_ENTRY_TOO_LARGE"</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | 创建该类的实例。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ToolResultCacheOperationTimeoutError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: "TOOL_RESULT_CACHE_TIMEOUT"</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `operation` | 属性 | <code>operation: "delete" &#124; "verify" &#124; "get" &#124; "set"</code> | operation 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `ToolResultCacheValidationError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: "TOOL_RESULT_CACHE_CORRUPT"</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(message: string): ToolResultCacheValidationError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `AdapterCancellationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `AdapterExecutionRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | context 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `HttpToolAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `endpoint` | 属性 | <code>endpoint: string</code> | endpoint 字段。 |
| `fetch` | 方法 | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | fetch 的公开运行时操作。 |
| `headers` | 属性 | <code>headers: Record&lt;string, string&gt;</code> | headers 字段。 |
| `resolveHeaders` | 方法 | <code>resolveHeaders(): Promise&lt;Record&lt;string, string&gt;&gt;</code> | 解析 Headers。 |

## `InMemoryToolResultCacheOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxEntries` | 属性 | <code>maxEntries: number</code> | max Entries 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |

## `MCPToolInvocationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(requestId: string): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `health` | 方法 | <code>health(serverId: string): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `invoke` | 方法 | <code>invoke(request: { serverId: string; capabilityId: string; input: unknown; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | invoke 的公开运行时操作。 |

## `RedisLikeToolResultCacheClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | del 的公开运行时操作。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(key: string, value: string, mode?: "PX", durationMilliseconds?: number): Promise&lt;unknown&gt;</code> | 写入 set。 |

## `RedisToolResultCacheOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeToolResultCacheClient</code> | client 字段。 |
| `defaultTtlMs` | 属性 | <code>defaultTtlMs: number</code> | default Ttl Ms 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |
| `namespace` | 属性 | <code>namespace: string</code> | namespace 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |

## `ToolAdapter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `execute` | 方法 | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |

## `ToolAdapterCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 属性 | <code>cancel: boolean</code> | cancel 字段。 |
| `close` | 属性 | <code>close: boolean</code> | close 字段。 |
| `execute` | 属性 | <code>execute: boolean</code> | execute 字段。 |
| `health` | 属性 | <code>health: boolean</code> | health 字段。 |
| `streaming` | 属性 | <code>streaming: boolean</code> | streaming 字段。 |

## `ToolApprovalGrant` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvedAt` | 属性 | <code>approvedAt: string</code> | approved At 字段。 |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | approved By 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | policy Decision Ref 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `requestId` | 属性 | <code>requestId: string</code> | request Id 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |

## `ToolApprovalRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `policyDecisionRef` | 属性 | <code>policyDecisionRef: string</code> | policy Decision Ref 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `status` | 属性 | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | status 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `ToolApprovalStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approve` | 方法 | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | approve 的公开运行时操作。 |
| `getGrant` | 方法 | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | 读取 Grant。 |
| `getRequest` | 方法 | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | 读取 Request。 |
| `reject` | 方法 | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | reject 的公开运行时操作。 |
| `requestApproval` | 方法 | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | request Approval 的公开运行时操作。 |

## `ToolArtifactPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 方法 | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | store 的公开运行时操作。 |

## `ToolAuthorizationDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | allowed 字段。 |
| `missingPermissionScopes` | 属性 | <code>missingPermissionScopes: string[]</code> | missing Permission Scopes 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `ToolAuthorizationInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionScope` | 属性 | <code>executionScope: ToolExecutionScope</code> | execution Scope 字段。 |
| `principal` | 属性 | <code>principal: ToolPrincipal</code> | principal 字段。 |
| `request` | 属性 | <code>request: ToolCallRequest&lt;unknown&gt;</code> | request 字段。 |
| `tool` | 属性 | <code>tool: ToolSpec</code> | tool 字段。 |

## `ToolAuthorizer` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | authorize 的公开运行时操作。 |

## `ToolCachedResultProjection` 契约字段

Only stable, replay-safe output fields may cross invocation boundaries.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `content` | 属性 | <code>content: ToolResultContent[]</code> | content 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |

## `ToolCallContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `capabilityApprovals` | 属性 | <code>capabilityApprovals: EffectiveCapabilityApproval[]</code> | capability Approvals 字段。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | capability Snapshot Ref 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `executionScope` | 属性 | <code>executionScope: ToolExecutionScope</code> | execution Scope 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `parentEventId` | 属性 | <code>parentEventId: string</code> | parent Event Id 字段。 |
| `principal` | 属性 | <code>principal: ToolPrincipal</code> | principal 字段。 |
| `reportProgress` | 方法 | <code>reportProgress(update: ToolProgressUpdate): void &#124; Promise&lt;void&gt;</code> | report Progress 的公开运行时操作。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ToolCallError` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `phase` | 属性 | <code>phase: ToolExecutionPhase</code> | phase 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |

## `ToolCallRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | context 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `ToolCallResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequest` | 属性 | <code>approvalRequest: ToolApprovalRequest</code> | approval Request 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `attempts` | 属性 | <code>attempts: number</code> | attempts 字段。 |
| `content` | 属性 | <code>content: ToolResultContent[]</code> | content 字段。 |
| `durationMs` | 属性 | <code>durationMs: number</code> | duration Ms 字段。 |
| `error` | 属性 | <code>error: string &#124; ToolCallError</code> | error 字段。 |
| `externalReceipt` | 属性 | <code>externalReceipt: ToolExternalReceipt</code> | external Receipt 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `observationRefs` | 属性 | <code>observationRefs: string[]</code> | observation Refs 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "human_review_required"</code> | status 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `ToolExecutionEnvelope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `content` | 属性 | <code>content: ToolResultContent[]</code> | content 字段。 |
| `externalReceipt` | 属性 | <code>externalReceipt: ToolExternalReceipt</code> | external Receipt 字段。 |
| `kind` | 属性 | <code>kind: "tool_execution_envelope"</code> | kind 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `observationRefs` | 属性 | <code>observationRefs: string[]</code> | observation Refs 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |

## `ToolExecutionScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedToolIds` | 属性 | <code>allowedToolIds: readonly string[]</code> | allowed Tool Ids 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: readonly string[]</code> | policy Refs 字段。 |

## `ToolIdempotencyLookup` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `ToolInvocationListRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `statuses` | 属性 | <code>statuses: readonly ("completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated")[]</code> | statuses 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `ToolInvocationRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequest` | 属性 | <code>approvalRequest: ToolApprovalRequest</code> | approval Request 字段。 |
| `approvalRequestId` | 属性 | <code>approvalRequestId: string</code> | approval Request Id 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `attemptCount` | 属性 | <code>attemptCount: number</code> | attempt Count 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `executionCycle` | 属性 | <code>executionCycle: number</code> | execution Cycle 字段。 |
| `externalReceipt` | 属性 | <code>externalReceipt: { provider?: string; receiptId: string; status?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | external Receipt 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyFingerprint` | 属性 | <code>idempotencyFingerprint: string</code> | idempotency Fingerprint 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `lateResultState` | 属性 | <code>lateResultState: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | late Result State 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `observationRefs` | 属性 | <code>observationRefs: string[]</code> | observation Refs 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | output Hash 字段。 |
| `principal` | 属性 | <code>principal: ToolPrincipal</code> | principal 字段。 |
| `queuedAt` | 属性 | <code>queuedAt: string</code> | queued At 字段。 |
| `redactedInput` | 属性 | <code>redactedInput: unknown</code> | redacted Input 字段。 |
| `request` | 属性 | <code>request: ToolCallRequest&lt;unknown&gt;</code> | request 字段。 |
| `result` | 属性 | <code>result: ToolCallResult&lt;unknown&gt;</code> | result 字段。 |
| `reusedFromInvocationId` | 属性 | <code>reusedFromInvocationId: string</code> | reused From Invocation Id 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `scope` | 属性 | <code>scope: { tenantId?: string; userId?: string; workspaceId?: string; sessionId?: string; runId: string; stepId?: string; agentId?: string; fsmState?: string; }</code> | scope 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated"</code> | status 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
| `toolRevision` | 属性 | <code>toolRevision: string</code> | tool Revision 字段。 |
| `toolVersion` | 属性 | <code>toolVersion: string</code> | tool Version 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `ToolInvocationStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | 创建 create。 |
| `findByIdempotency` | 方法 | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | find By Idempotency 的公开运行时操作。 |
| `get` | 方法 | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | 读取 get。 |
| `getCompleted` | 方法 | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 读取 Completed。 |
| `list` | 方法 | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | 列出 list。 |
| `saveCompleted` | 方法 | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | 保存 Completed。 |
| `update` | 方法 | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | update 的公开运行时操作。 |

## `ToolMiddleware` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterExecution` | 方法 | <code>afterExecution(context: ToolMiddlewareContext, result: ToolExecutionEnvelope): Promise&lt;ToolExecutionEnvelope &#124; void&gt; &#124; ToolExecutionEnvelope &#124; void</code> | after Execution 的公开运行时操作。 |
| `beforeAuthorization` | 方法 | <code>beforeAuthorization(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | before Authorization 的公开运行时操作。 |
| `beforeExecution` | 方法 | <code>beforeExecution(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | before Execution 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `onError` | 方法 | <code>onError(context: ToolMiddlewareContext, error: unknown): Promise&lt;void&gt; &#124; void</code> | 处理 Error。 |

## `ToolMiddlewareContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `originalRequest` | 属性 | <code>originalRequest: ToolCallRequest&lt;unknown&gt;</code> | original Request 字段。 |
| `request` | 属性 | <code>request: ToolCallRequest&lt;unknown&gt;</code> | request 字段。 |
| `spec` | 属性 | <code>spec: ResolvedToolSpec</code> | spec 字段。 |

## `ToolObservationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | 记录 record。 |

## `ToolPrincipal` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `authenticationContext` | 属性 | <code>authenticationContext: Record&lt;string, unknown&gt;</code> | authentication Context 字段。 |
| `delegatedBy` | 属性 | <code>delegatedBy: string</code> | delegated By 字段。 |
| `delegationDepth` | 属性 | <code>delegationDepth: number</code> | delegation Depth 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: readonly string[]</code> | permission Scopes 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `roles` | 属性 | <code>roles: readonly string[]</code> | roles 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ToolProfileSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractSnapshotMode` | 属性 | <code>contractSnapshotMode: "run" &#124; "state"</code> | contract Snapshot Mode 字段。 |
| `defaultPermissionScopes` | 属性 | <code>defaultPermissionScopes: string[]</code> | default Permission Scopes 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lazyLoad` | 属性 | <code>lazyLoad: boolean</code> | lazy Load 字段。 |
| `maxLoadedTools` | 属性 | <code>maxLoadedTools: number</code> | max Loaded Tools 字段。 |
| `mcpProfileRefs` | 属性 | <code>mcpProfileRefs: SpecRef[]</code> | mcp Profile Refs 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: SpecRef[]</code> | policy Refs 字段。 |
| `toolRefs` | 属性 | <code>toolRefs: SpecRef[]</code> | tool Refs 字段。 |
| `tools` | 属性 | <code>tools: ToolSpec[]</code> | tools 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ToolProgressUpdate` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `current` | 属性 | <code>current: number</code> | current 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `percentage` | 属性 | <code>percentage: number</code> | percentage 字段。 |
| `stage` | 属性 | <code>stage: string</code> | stage 字段。 |
| `total` | 属性 | <code>total: number</code> | total 字段。 |

## `ToolReceiptReconciler` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reconcile` | 方法 | <code>reconcile(request: { invocationId: string; tool: ResolvedToolSpec; call: ToolCallRequest; attempt: number; }): Promise&lt;ToolReceiptReconciliation&gt;</code> | reconcile 的公开运行时操作。 |

## `ToolReceiptReconciliation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `details` | 属性 | <code>details: Record&lt;string, unknown&gt;</code> | details 字段。 |
| `receipt` | 属性 | <code>receipt: ToolExternalReceipt</code> | receipt 字段。 |
| `state` | 属性 | <code>state: "unknown" &#124; "committed" &#124; "not_committed"</code> | state 字段。 |

## `ToolResultCache` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | 写入 set。 |

## `ToolResultCacheArtifactVerifier` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(request: { toolId: string; artifactRefs: readonly string[]; tenantId?: string; userId?: string; workspaceId?: string; }): Promise&lt;boolean&gt;</code> | verify 的公开运行时操作。 |

## `ToolResultCacheEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `keyVersion` | 属性 | <code>keyVersion: "1"</code> | key Version 字段。 |
| `result` | 属性 | <code>result: ToolCachedResultProjection</code> | result 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | schema Version 字段。 |
| `validity` | 属性 | <code>validity: ToolCacheValidityRecord</code> | validity 字段。 |

## `ToolRunner` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelInvocation` | 方法 | <code>cancelInvocation(invocationId: string, reason?: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | 取消 Invocation。 |
| `run` | 方法 | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | run 的公开运行时操作。 |

## `ToolSchemaValidationIssue` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |

## `ToolSchemaValidationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: string</code> | error 字段。 |
| `issues` | 属性 | <code>issues: ToolSchemaValidationIssue[]</code> | issues 字段。 |
| `valid` | 属性 | <code>valid: boolean</code> | valid 字段。 |

## `ToolSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `auditPolicy` | 属性 | <code>auditPolicy: AuditPolicySpec</code> | audit Policy 字段。 |
| `cache` | 属性 | <code>cache: ToolCachePolicySpec</code> | cache 字段。 |
| `deprecated` | 属性 | <code>deprecated: boolean</code> | deprecated 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `displayName` | 属性 | <code>displayName: string</code> | display Name 字段。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `execution` | 属性 | <code>execution: ToolExecutionPolicySpec</code> | execution 字段。 |
| `governance` | 属性 | <code>governance: ToolGovernanceSpec</code> | governance 字段。 |
| `humanApprovalPolicy` | 属性 | <code>humanApprovalPolicy: HumanReviewPolicySpec</code> | human Approval Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyPolicy` | 属性 | <code>idempotencyPolicy: { mode: "none" &#124; "optional" &#124; "required"; }</code> | idempotency Policy 字段。 |
| `input` | 属性 | <code>input: ToolSchemaSpec</code> | input 字段。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | input schema 字段。 |
| `instructions` | 属性 | <code>instructions: string</code> | instructions 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `observability` | 属性 | <code>observability: ToolObservabilitySpec</code> | observability 字段。 |
| `output` | 属性 | <code>output: ToolSchemaSpec</code> | output 字段。 |
| `outputSchema` | 属性 | <code>outputSchema: JsonSchema</code> | output schema 字段。 |
| `permissionScope` | 属性 | <code>permissionScope: string[]</code> | permission Scope 字段。 |
| `postconditions` | 属性 | <code>postconditions: string[]</code> | postconditions 字段。 |
| `preconditions` | 属性 | <code>preconditions: string[]</code> | preconditions 字段。 |
| `replacedBy` | 属性 | <code>replacedBy: { id: string; version?: string; revision?: string; }</code> | replaced By 字段。 |
| `retryPolicy` | 属性 | <code>retryPolicy: RetryPolicySpec</code> | retry Policy 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `semantics` | 属性 | <code>semantics: ToolSemanticSpec</code> | semantics 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `source` | 属性 | <code>source: ToolSource</code> | source 字段。 |
| `sourceRef` | 属性 | <code>sourceRef: { serverId?: string; capabilityId?: string; capabilityHash?: string; trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"; declarationSource?: "framework" &#124; "user" &#124; "server" &#124; "unknown"; } &amp; ToolSourceRef</code> | source Ref 字段。 |
| `streaming` | 属性 | <code>streaming: ToolStreamingSpec</code> | streaming 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy: TimeoutPolicySpec</code> | timeout Policy 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ToolTargetResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |

## `ToolTargetResolver` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve(request: ToolCallRequest, registry: ToolRegistry): Promise&lt;ToolTargetResolution&gt;</code> | 解析 resolve。 |
