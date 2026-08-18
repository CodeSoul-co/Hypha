# `@codesoul-co/hypha-tools` / `index`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)
- Exports: **85**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `AllowAllToolAuthorizer` | class | <code>new AllowAllToolAuthorizer(): AllowAllToolAuthorizer</code> | Runtime implementation for Allow All Tool Authorizer; see its public constructor and members below. |
| `GovernedToolRunner` | class | <code>new GovernedToolRunner(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "byp...</code> | Runtime implementation for Governed Tool Runner; see its public constructor and members below. |
| `HttpToolAdapter` | class | <code>new HttpToolAdapter(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | Runtime implementation for Http Tool Adapter; see its public constructor and members below. |
| `InMemoryToolApprovalStore` | class | <code>new InMemoryToolApprovalStore(): InMemoryToolApprovalStore</code> | Runtime implementation for In Memory Tool Approval Store; see its public constructor and members below. |
| `InMemoryToolInvocationStore` | class | <code>new InMemoryToolInvocationStore(): InMemoryToolInvocationStore</code> | Runtime implementation for In Memory Tool Invocation Store; see its public constructor and members below. |
| `InMemoryToolResultCache` | class | <code>new InMemoryToolResultCache(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | Runtime implementation for In Memory Tool Result Cache; see its public constructor and members below. |
| `LocalFunctionToolAdapter` | class | <code>new LocalFunctionToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | Runtime implementation for Local Function Tool Adapter; see its public constructor and members below. |
| `MCPToolAdapter` | class | <code>new MCPToolAdapter(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | Runtime implementation for MCP Tool Adapter; see its public constructor and members below. |
| `MockToolAdapter` | class | <code>new MockToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | Runtime implementation for Mock Tool Adapter; see its public constructor and members below. |
| `MockToolRunner` | class | <code>new MockToolRunner(defaultOutput?: unknown): MockToolRunner</code> | Runtime implementation for Mock Tool Runner; see its public constructor and members below. |
| `PermissionScopeToolAuthorizer` | class | <code>new PermissionScopeToolAuthorizer(): PermissionScopeToolAuthorizer</code> | Runtime implementation for Permission Scope Tool Authorizer; see its public constructor and members below. |
| `PluginToolAdapter` | class | <code>new PluginToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | Runtime implementation for Plugin Tool Adapter; see its public constructor and members below. |
| `RedisToolResultCache` | class | <code>new RedisToolResultCache(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments. |
| `ToolRegistry` | class | <code>new ToolRegistry(): ToolRegistry</code> | Runtime implementation for Tool Registry; see its public constructor and members below. |
| `ToolResultCacheEntryTooLargeError` | class | <code>new ToolResultCacheEntryTooLargeError(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | Runtime implementation for Tool Result Cache Entry Too Large Error; see its public constructor and members below. |
| `ToolResultCacheOperationTimeoutError` | class | <code>new ToolResultCacheOperationTimeoutError(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | Runtime implementation for Tool Result Cache Operation Timeout Error; see its public constructor and members below. |
| `ToolResultCacheValidationError` | class | <code>new ToolResultCacheValidationError(message: string): ToolResultCacheValidationError</code> | Runtime implementation for Tool Result Cache Validation Error; see its public constructor and members below. |
| `TOOL_INVOCATION_STATUSES` | constant | <code>const TOOL_INVOCATION_STATUSES: readonly ["created", "validating", "validated", "policy_checked", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "completed", "failed", "timed_out", "expired", "conflict", "denied", "cancelled"]</code> | TOOL INVOCATION STATUSES constant exported by the `index` module. |
| `toolCacheValidityRecordSchema` | constant | <code>const toolCacheValidityRecordSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.ZodString; validUntil: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { toolId: st...</code> | Runtime schema for tool Cache Validity Record. |
| `toolProfileSpecDefinition` | constant | <code>const toolProfileSpecDefinition: SpecSchemaDefinition&lt;ToolProfileSpec&gt;</code> | Runtime validation entrypoint for the tool Profile spec, combining its parser, example and JSON Schema. |
| `toolProfileSpecSchema` | constant | <code>const toolProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; toolRefs: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; un...</code> | Runtime schema for tool Profile Spec. |
| `toolResultCacheEntryJsonSchema` | constant | <code>const toolResultCacheEntryJsonSchema: JsonSchema</code> | JSON Schema for tool Result Cache Entry. |
| `toolResultCacheEntrySchema` | constant | <code>const toolResultCacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; validity: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.Zo...</code> | Runtime schema for tool Result Cache Entry. |
| `toolSpecDefinition` | constant | <code>const toolSpecDefinition: SpecSchemaDefinition&lt;ToolSpec&gt;</code> | Runtime validation entrypoint for the tool spec, combining its parser, example and JSON Schema. |
| `toolSpecDefinitions` | constant | <code>const toolSpecDefinitions: readonly [SpecSchemaDefinition&lt;ToolSpec&gt;, SpecSchemaDefinition&lt;ToolProfileSpec&gt;]</code> | tool Spec Definitions constant exported by the `index` module. |
| `toolSpecExample` | constant | <code>const toolSpecExample: ToolSpec</code> | Valid example value for tool Spec. |
| `toolSpecJsonSchema` | constant | <code>const toolSpecJsonSchema: JsonSchema</code> | JSON Schema for tool Spec. |
| `toolSpecJsonSchemas` | constant | <code>const toolSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | tool Spec Json Schemas constant exported by the `index` module. |
| `toolSpecSchema` | constant | <code>const toolSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; outputSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSch...</code> | Runtime schema for tool Spec. |
| `normalizeToolSpec` | function | <code>normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec</code> | Normalizes Tool Spec at this module boundary. |
| `validateEffectiveCapabilityAccess` | function | <code>validateEffectiveCapabilityAccess(input: { snapshot: ToolContractSnapshot &#124; null; context: ToolCallContext; spec: ToolSpec; }): string &#124; null</code> | Validates Effective Capability Access at this module boundary. |
| `validateToolInput` | function | <code>validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult</code> | Validates Tool Input at this module boundary. |
| `validateToolResultCacheEntry` | function | <code>validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry</code> | Validates Tool Result Cache Entry at this module boundary. |
| `validateToolSpec` | function | <code>validateToolSpec(input: unknown): ToolSpec</code> | Validates Tool Spec at this module boundary. |
| `AdapterCancellationRequest` | interface | <code>interface AdapterCancellationRequest</code> | Field contract for Adapter Cancellation Request; see all contract members below. |
| `AdapterExecutionRequest` | interface | <code>interface AdapterExecutionRequest</code> | Field contract for Adapter Execution Request; see all contract members below. |
| `HttpToolAdapterOptions` | interface | <code>interface HttpToolAdapterOptions</code> | Field contract for Http Tool Adapter Options; see all contract members below. |
| `InMemoryToolResultCacheOptions` | interface | <code>interface InMemoryToolResultCacheOptions</code> | Field contract for In Memory Tool Result Cache Options; see all contract members below. |
| `MCPToolInvocationPort` | interface | <code>interface MCPToolInvocationPort</code> | Field contract for MCP Tool Invocation Port; see all contract members below. |
| `RedisLikeToolResultCacheClient` | interface | <code>interface RedisLikeToolResultCacheClient</code> | Field contract for Redis Like Tool Result Cache Client; see all contract members below. |
| `RedisToolResultCacheOptions` | interface | <code>interface RedisToolResultCacheOptions</code> | Field contract for Redis Tool Result Cache Options; see all contract members below. |
| `ToolAdapter` | interface | <code>interface ToolAdapter</code> | Field contract for Tool Adapter; see all contract members below. |
| `ToolAdapterCapabilities` | interface | <code>interface ToolAdapterCapabilities</code> | Field contract for Tool Adapter Capabilities; see all contract members below. |
| `ToolApprovalGrant` | interface | <code>interface ToolApprovalGrant</code> | Field contract for Tool Approval Grant; see all contract members below. |
| `ToolApprovalRequest` | interface | <code>interface ToolApprovalRequest</code> | Field contract for Tool Approval Request; see all contract members below. |
| `ToolApprovalStore` | interface | <code>interface ToolApprovalStore</code> | Field contract for Tool Approval Store; see all contract members below. |
| `ToolArtifactPort` | interface | <code>interface ToolArtifactPort</code> | Field contract for Tool Artifact Port; see all contract members below. |
| `ToolAuthorizationDecision` | interface | <code>interface ToolAuthorizationDecision</code> | Field contract for Tool Authorization Decision; see all contract members below. |
| `ToolAuthorizationInput` | interface | <code>interface ToolAuthorizationInput</code> | Field contract for Tool Authorization Input; see all contract members below. |
| `ToolAuthorizer` | interface | <code>interface ToolAuthorizer</code> | Field contract for Tool Authorizer; see all contract members below. |
| `ToolCachedResultProjection` | interface | <code>interface ToolCachedResultProjection</code> | Only stable, replay-safe output fields may cross invocation boundaries. |
| `ToolCallContext` | interface | <code>interface ToolCallContext</code> | Field contract for Tool Call Context; see all contract members below. |
| `ToolCallError` | interface | <code>interface ToolCallError</code> | Field contract for Tool Call Error; see all contract members below. |
| `ToolCallRequest` | interface | <code>interface ToolCallRequest</code> | Field contract for Tool Call Request; see all contract members below. |
| `ToolCallResult` | interface | <code>interface ToolCallResult</code> | Field contract for Tool Call Result; see all contract members below. |
| `ToolExecutionEnvelope` | interface | <code>interface ToolExecutionEnvelope</code> | Field contract for Tool Execution Envelope; see all contract members below. |
| `ToolExecutionScope` | interface | <code>interface ToolExecutionScope</code> | Field contract for Tool Execution Scope; see all contract members below. |
| `ToolIdempotencyLookup` | interface | <code>interface ToolIdempotencyLookup</code> | Field contract for Tool Idempotency Lookup; see all contract members below. |
| `ToolInvocationListRequest` | interface | <code>interface ToolInvocationListRequest</code> | Field contract for Tool Invocation List Request; see all contract members below. |
| `ToolInvocationRecord` | interface | <code>interface ToolInvocationRecord</code> | Field contract for Tool Invocation Record; see all contract members below. |
| `ToolInvocationStore` | interface | <code>interface ToolInvocationStore</code> | Field contract for Tool Invocation Store; see all contract members below. |
| `ToolMiddleware` | interface | <code>interface ToolMiddleware</code> | Field contract for Tool Middleware; see all contract members below. |
| `ToolMiddlewareContext` | interface | <code>interface ToolMiddlewareContext</code> | Field contract for Tool Middleware Context; see all contract members below. |
| `ToolObservationPort` | interface | <code>interface ToolObservationPort</code> | Field contract for Tool Observation Port; see all contract members below. |
| `ToolPrincipal` | interface | <code>interface ToolPrincipal</code> | Field contract for Tool Principal; see all contract members below. |
| `ToolProfileSpec` | interface | <code>interface ToolProfileSpec extends VersionedSpec</code> | Field contract for Tool Profile Spec; see all contract members below. |
| `ToolProgressUpdate` | interface | <code>interface ToolProgressUpdate</code> | Field contract for Tool Progress Update; see all contract members below. |
| `ToolReceiptReconciler` | interface | <code>interface ToolReceiptReconciler</code> | Field contract for Tool Receipt Reconciler; see all contract members below. |
| `ToolReceiptReconciliation` | interface | <code>interface ToolReceiptReconciliation</code> | Field contract for Tool Receipt Reconciliation; see all contract members below. |
| `ToolResultCache` | interface | <code>interface ToolResultCache</code> | Field contract for Tool Result Cache; see all contract members below. |
| `ToolResultCacheArtifactVerifier` | interface | <code>interface ToolResultCacheArtifactVerifier</code> | Field contract for Tool Result Cache Artifact Verifier; see all contract members below. |
| `ToolResultCacheEntry` | interface | <code>interface ToolResultCacheEntry</code> | Field contract for Tool Result Cache Entry; see all contract members below. |
| `ToolRunner` | interface | <code>interface ToolRunner</code> | Field contract for Tool Runner; see all contract members below. |
| `ToolSchemaValidationIssue` | interface | <code>interface ToolSchemaValidationIssue</code> | Field contract for Tool Schema Validation Issue; see all contract members below. |
| `ToolSchemaValidationResult` | interface | <code>interface ToolSchemaValidationResult</code> | Field contract for Tool Schema Validation Result; see all contract members below. |
| `ToolSpec` | interface | <code>interface ToolSpec</code> | Field contract for Tool Spec; see all contract members below. |
| `ToolTargetResolution` | interface | <code>interface ToolTargetResolution</code> | Field contract for Tool Target Resolution; see all contract members below. |
| `ToolTargetResolver` | interface | <code>interface ToolTargetResolver</code> | Field contract for Tool Target Resolver; see all contract members below. |
| `MockToolHandler` | type | <code>type MockToolHandler = (request: ToolCallRequest) =&gt; Promise&lt;ToolCallResult&gt; &#124; ToolCallResult</code> | Public type alias for Mock Tool Handler. |
| `ResolvedToolSpec` | type | <code>type ResolvedToolSpec = ToolSpec &amp; GovernedToolContractSpec</code> | Public type alias for Resolved Tool Spec. |
| `ToolExecutionPhase` | type | <code>type ToolExecutionPhase = 'resolution' &#124; 'authorization' &#124; 'input_validation' &#124; 'policy' &#124; 'approval' &#124; 'execution' &#124; 'timeout' &#124; 'output_validation'</code> | Public type alias for Tool Execution Phase. |
| `ToolHandler` | type | <code>type ToolHandler = (input: TInput, context: ToolCallContext) =&gt; Promise&lt;TOutput&gt;</code> | Public type alias for Tool Handler. |
| `ToolInvocationPatch` | type | <code>type ToolInvocationPatch = Partial&lt;Pick&lt;ToolInvocationRecord, 'status' &#124; 'executionCycle' &#124; 'attemptCount' &#124; 'result' &#124; 'approvalRequest' &#124; 'updatedAt' &#124; 'startedAt' &#124; 'completedAt' &#124; 'lateResultState' &#124; 'outputHash' &#124; 'artifactRefs' &#124; 'observationRefs' &#124; 'externalReceipt'&gt;&gt;</code> | Public type alias for Tool Invocation Patch. |
| `ToolInvocationStatus` | type | <code>type ToolInvocationStatus = (typeof TOOL_INVOCATION_STATUSES)[number]</code> | Public type alias for Tool Invocation Status. |
| `ToolResultContent` | type | <code>type ToolResultContent = { type: 'text'; text: string; } &#124; { type: 'json'; value: unknown; } &#124; { type: 'image'; artifactRef?: string; url?: string; mimeType?: string; alt?: string; } &#124; { type: 'resource'; uri: string; mimeType?: string; title?: string; } &#124; { type: 'artifact'; artifactRef: string; title?: string; mimeType?: string; }</code> | Public type alias for Tool Result Content. |

## `AllowAllToolAuthorizer` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(): Promise&lt;ToolAuthorizationDecision&gt;</code> | Public runtime operation for authorize. |
| `constructor` | constructor | <code>(): AllowAllToolAuthorizer</code> | Creates an instance of this class. |

## `GovernedToolRunner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approveAndResume` | method | <code>approveAndResume(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolCallResult&gt;</code> | Public runtime operation for approve And Resume. |
| `cancelInvocation` | method | <code>cancelInvocation(invocationId: string, reason?: string): Promise&lt;ToolCallResult&gt;</code> | Cancels Invocation at this module boundary. |
| `constructor` | constructor | <code>(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "bypass" &#124; "strict"; resul...</code> | Creates an instance of this class. |
| `getInvocation` | method | <code>getInvocation(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Gets Invocation at this module boundary. |
| `listInvocations` | method | <code>listInvocations(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Lists Invocations at this module boundary. |
| `recoverPendingInvocations` | method | <code>recoverPendingInvocations(): Promise&lt;ToolCallResult[]&gt;</code> | Public runtime operation for recover Pending Invocations. |
| `rejectInvocation` | method | <code>rejectInvocation(invocationId: string): Promise&lt;ToolCallResult&gt;</code> | Public runtime operation for reject Invocation. |
| `run` | method | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | Public runtime operation for run. |

## `HttpToolAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |

## `InMemoryToolApprovalStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approve` | method | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | Public runtime operation for approve. |
| `constructor` | constructor | <code>(): InMemoryToolApprovalStore</code> | Creates an instance of this class. |
| `getGrant` | method | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | Gets Grant at this module boundary. |
| `getRequest` | method | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | Gets Request at this module boundary. |
| `reject` | method | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | Public runtime operation for reject. |
| `requestApproval` | method | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | Public runtime operation for request Approval. |

## `InMemoryToolInvocationStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryToolInvocationStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | Creates create at this module boundary. |
| `findByIdempotency` | method | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public runtime operation for find By Idempotency. |
| `get` | method | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getCompleted` | method | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Gets Completed at this module boundary. |
| `list` | method | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Lists list at this module boundary. |
| `saveCompleted` | method | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | Saves Completed at this module boundary. |
| `update` | method | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | Public runtime operation for update. |

## `InMemoryToolResultCache` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
| `size` | method | <code>size(): number</code> | Public runtime operation for size. |

## `LocalFunctionToolAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |

## `MCPToolAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |

## `MockToolAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |

## `MockToolRunner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(defaultOutput?: unknown): MockToolRunner</code> | Creates an instance of this class. |
| `registerHandler` | method | <code>registerHandler(toolId: string, handler: MockToolHandler): void</code> | Registers Handler at this module boundary. |
| `registerResult` | method | <code>registerResult(toolId: string, result: ToolCallResult): void</code> | Registers Result at this module boundary. |
| `run` | method | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | Public runtime operation for run. |

## `PermissionScopeToolAuthorizer` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | Public runtime operation for authorize. |
| `constructor` | constructor | <code>(): PermissionScopeToolAuthorizer</code> | Creates an instance of this class. |

## `PluginToolAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |

## `RedisToolResultCache` public members

Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `ToolRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ToolRegistry</code> | Creates an instance of this class. |
| `getAdapter` | method | <code>getAdapter(toolId: string): ToolAdapter &#124; null</code> | Gets Adapter at this module boundary. |
| `getSpec` | method | <code>getSpec(toolId: string): ResolvedToolSpec &#124; null</code> | Gets Spec at this module boundary. |
| `getTargetResolver` | method | <code>getTargetResolver(toolId: string): ToolTargetResolver &#124; null</code> | Gets Target Resolver at this module boundary. |
| `list` | method | <code>list(): ResolvedToolSpec[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(spec: ToolSpec, handler: ToolHandler, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | Registers register at this module boundary. |
| `registerAdapter` | method | <code>registerAdapter(spec: ToolSpec, adapter: ToolAdapter, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | Registers Adapter at this module boundary. |
| `resolve` | method | <code>resolve(ref: { id: string; version?: string; revision?: string; }): { spec: ResolvedToolSpec; adapter: ToolAdapter; } &#124; null</code> | Resolves resolve at this module boundary. |
| `unregister` | method | <code>unregister(toolId: string): boolean</code> | Public runtime operation for unregister. |

## `ToolResultCacheEntryTooLargeError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualBytes` | property | <code>actualBytes: number</code> | Public actual Bytes property. |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: "TOOL_RESULT_CACHE_ENTRY_TOO_LARGE"</code> | Public code property. |
| `constructor` | constructor | <code>(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | Creates an instance of this class. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ToolResultCacheOperationTimeoutError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: "TOOL_RESULT_CACHE_TIMEOUT"</code> | Public code property. |
| `constructor` | constructor | <code>(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `operation` | property | <code>operation: "delete" &#124; "verify" &#124; "get" &#124; "set"</code> | Public operation property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `ToolResultCacheValidationError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: "TOOL_RESULT_CACHE_CORRUPT"</code> | Public code property. |
| `constructor` | constructor | <code>(message: string): ToolResultCacheValidationError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `AdapterCancellationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `AdapterExecutionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public context property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `HttpToolAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `endpoint` | property | <code>endpoint: string</code> | Public endpoint property. |
| `fetch` | method | <code>fetch(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public runtime operation for fetch. |
| `headers` | property | <code>headers: Record&lt;string, string&gt;</code> | Public headers property. |
| `resolveHeaders` | method | <code>resolveHeaders(): Promise&lt;Record&lt;string, string&gt;&gt;</code> | Resolves Headers at this module boundary. |

## `InMemoryToolResultCacheOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |

## `MCPToolInvocationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(requestId: string): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `health` | method | <code>health(serverId: string): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `invoke` | method | <code>invoke(request: { serverId: string; capabilityId: string; input: unknown; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | Public runtime operation for invoke. |

## `RedisLikeToolResultCacheClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public runtime operation for del. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(key: string, value: string, mode?: "PX", durationMilliseconds?: number): Promise&lt;unknown&gt;</code> | Sets set at this module boundary. |

## `RedisToolResultCacheOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeToolResultCacheClient</code> | Public client property. |
| `defaultTtlMs` | property | <code>defaultTtlMs: number</code> | Public default Ttl Ms property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |
| `namespace` | property | <code>namespace: string</code> | Public namespace property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |

## `ToolAdapter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |

## `ToolAdapterCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | property | <code>cancel: boolean</code> | Public cancel property. |
| `close` | property | <code>close: boolean</code> | Public close property. |
| `execute` | property | <code>execute: boolean</code> | Public execute property. |
| `health` | property | <code>health: boolean</code> | Public health property. |
| `streaming` | property | <code>streaming: boolean</code> | Public streaming property. |

## `ToolApprovalGrant` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvedAt` | property | <code>approvedAt: string</code> | Public approved At property. |
| `approvedBy` | property | <code>approvedBy: string</code> | Public approved By property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public policy Decision Ref property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `requestId` | property | <code>requestId: string</code> | Public request Id property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |

## `ToolApprovalRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `policyDecisionRef` | property | <code>policyDecisionRef: string</code> | Public policy Decision Ref property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `status` | property | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | Public status property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `ToolApprovalStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approve` | method | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | Public runtime operation for approve. |
| `getGrant` | method | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | Gets Grant at this module boundary. |
| `getRequest` | method | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | Gets Request at this module boundary. |
| `reject` | method | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | Public runtime operation for reject. |
| `requestApproval` | method | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | Public runtime operation for request Approval. |

## `ToolArtifactPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | method | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public runtime operation for store. |

## `ToolAuthorizationDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public allowed property. |
| `missingPermissionScopes` | property | <code>missingPermissionScopes: string[]</code> | Public missing Permission Scopes property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `ToolAuthorizationInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionScope` | property | <code>executionScope: ToolExecutionScope</code> | Public execution Scope property. |
| `principal` | property | <code>principal: ToolPrincipal</code> | Public principal property. |
| `request` | property | <code>request: ToolCallRequest&lt;unknown&gt;</code> | Public request property. |
| `tool` | property | <code>tool: ToolSpec</code> | Public tool property. |

## `ToolAuthorizer` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | Public runtime operation for authorize. |

## `ToolCachedResultProjection` contract members

Only stable, replay-safe output fields may cross invocation boundaries.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `content` | property | <code>content: ToolResultContent[]</code> | Public content property. |
| `output` | property | <code>output: unknown</code> | Public output property. |

## `ToolCallContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `capabilityApprovals` | property | <code>capabilityApprovals: EffectiveCapabilityApproval[]</code> | Public capability Approvals property. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public capability Snapshot Ref property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `executionScope` | property | <code>executionScope: ToolExecutionScope</code> | Public execution Scope property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `parentEventId` | property | <code>parentEventId: string</code> | Public parent Event Id property. |
| `principal` | property | <code>principal: ToolPrincipal</code> | Public principal property. |
| `reportProgress` | method | <code>reportProgress(update: ToolProgressUpdate): void &#124; Promise&lt;void&gt;</code> | Public runtime operation for report Progress. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ToolCallError` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `phase` | property | <code>phase: ToolExecutionPhase</code> | Public phase property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |

## `ToolCallRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public context property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `ToolCallResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequest` | property | <code>approvalRequest: ToolApprovalRequest</code> | Public approval Request property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `content` | property | <code>content: ToolResultContent[]</code> | Public content property. |
| `durationMs` | property | <code>durationMs: number</code> | Public duration Ms property. |
| `error` | property | <code>error: string &#124; ToolCallError</code> | Public error property. |
| `externalReceipt` | property | <code>externalReceipt: ToolExternalReceipt</code> | Public external Receipt property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `observationRefs` | property | <code>observationRefs: string[]</code> | Public observation Refs property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "human_review_required"</code> | Public status property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `ToolExecutionEnvelope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `content` | property | <code>content: ToolResultContent[]</code> | Public content property. |
| `externalReceipt` | property | <code>externalReceipt: ToolExternalReceipt</code> | Public external Receipt property. |
| `kind` | property | <code>kind: "tool_execution_envelope"</code> | Public kind property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `observationRefs` | property | <code>observationRefs: string[]</code> | Public observation Refs property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |

## `ToolExecutionScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedToolIds` | property | <code>allowedToolIds: readonly string[]</code> | Public allowed Tool Ids property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `policyRefs` | property | <code>policyRefs: readonly string[]</code> | Public policy Refs property. |

## `ToolIdempotencyLookup` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `ToolInvocationListRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `statuses` | property | <code>statuses: readonly ("completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated")[]</code> | Public statuses property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `ToolInvocationRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequest` | property | <code>approvalRequest: ToolApprovalRequest</code> | Public approval Request property. |
| `approvalRequestId` | property | <code>approvalRequestId: string</code> | Public approval Request Id property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `attemptCount` | property | <code>attemptCount: number</code> | Public attempt Count property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `executionCycle` | property | <code>executionCycle: number</code> | Public execution Cycle property. |
| `externalReceipt` | property | <code>externalReceipt: { provider?: string; receiptId: string; status?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | Public external Receipt property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyFingerprint` | property | <code>idempotencyFingerprint: string</code> | Public idempotency Fingerprint property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `lateResultState` | property | <code>lateResultState: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | Public late Result State property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `observationRefs` | property | <code>observationRefs: string[]</code> | Public observation Refs property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `outputHash` | property | <code>outputHash: string</code> | Public output Hash property. |
| `principal` | property | <code>principal: ToolPrincipal</code> | Public principal property. |
| `queuedAt` | property | <code>queuedAt: string</code> | Public queued At property. |
| `redactedInput` | property | <code>redactedInput: unknown</code> | Public redacted Input property. |
| `request` | property | <code>request: ToolCallRequest&lt;unknown&gt;</code> | Public request property. |
| `result` | property | <code>result: ToolCallResult&lt;unknown&gt;</code> | Public result property. |
| `reusedFromInvocationId` | property | <code>reusedFromInvocationId: string</code> | Public reused From Invocation Id property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `scope` | property | <code>scope: { tenantId?: string; userId?: string; workspaceId?: string; sessionId?: string; runId: string; stepId?: string; agentId?: string; fsmState?: string; }</code> | Public scope property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: "completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated"</code> | Public status property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
| `toolRevision` | property | <code>toolRevision: string</code> | Public tool Revision property. |
| `toolVersion` | property | <code>toolVersion: string</code> | Public tool Version property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `ToolInvocationStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | Creates create at this module boundary. |
| `findByIdempotency` | method | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public runtime operation for find By Idempotency. |
| `get` | method | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getCompleted` | method | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Gets Completed at this module boundary. |
| `list` | method | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Lists list at this module boundary. |
| `saveCompleted` | method | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | Saves Completed at this module boundary. |
| `update` | method | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | Public runtime operation for update. |

## `ToolMiddleware` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterExecution` | method | <code>afterExecution(context: ToolMiddlewareContext, result: ToolExecutionEnvelope): Promise&lt;ToolExecutionEnvelope &#124; void&gt; &#124; ToolExecutionEnvelope &#124; void</code> | Public runtime operation for after Execution. |
| `beforeAuthorization` | method | <code>beforeAuthorization(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | Public runtime operation for before Authorization. |
| `beforeExecution` | method | <code>beforeExecution(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | Public runtime operation for before Execution. |
| `id` | property | <code>id: string</code> | Public id property. |
| `onError` | method | <code>onError(context: ToolMiddlewareContext, error: unknown): Promise&lt;void&gt; &#124; void</code> | Handles Error at this module boundary. |

## `ToolMiddlewareContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `originalRequest` | property | <code>originalRequest: ToolCallRequest&lt;unknown&gt;</code> | Public original Request property. |
| `request` | property | <code>request: ToolCallRequest&lt;unknown&gt;</code> | Public request property. |
| `spec` | property | <code>spec: ResolvedToolSpec</code> | Public spec property. |

## `ToolObservationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Records record at this module boundary. |

## `ToolPrincipal` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `authenticationContext` | property | <code>authenticationContext: Record&lt;string, unknown&gt;</code> | Public authentication Context property. |
| `delegatedBy` | property | <code>delegatedBy: string</code> | Public delegated By property. |
| `delegationDepth` | property | <code>delegationDepth: number</code> | Public delegation Depth property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `permissionScopes` | property | <code>permissionScopes: readonly string[]</code> | Public permission Scopes property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `roles` | property | <code>roles: readonly string[]</code> | Public roles property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ToolProfileSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractSnapshotMode` | property | <code>contractSnapshotMode: "run" &#124; "state"</code> | Public contract Snapshot Mode property. |
| `defaultPermissionScopes` | property | <code>defaultPermissionScopes: string[]</code> | Public default Permission Scopes property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lazyLoad` | property | <code>lazyLoad: boolean</code> | Public lazy Load property. |
| `maxLoadedTools` | property | <code>maxLoadedTools: number</code> | Public max Loaded Tools property. |
| `mcpProfileRefs` | property | <code>mcpProfileRefs: SpecRef[]</code> | Public mcp Profile Refs property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `policyRefs` | property | <code>policyRefs: SpecRef[]</code> | Public policy Refs property. |
| `toolRefs` | property | <code>toolRefs: SpecRef[]</code> | Public tool Refs property. |
| `tools` | property | <code>tools: ToolSpec[]</code> | Public tools property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ToolProgressUpdate` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `current` | property | <code>current: number</code> | Public current property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `percentage` | property | <code>percentage: number</code> | Public percentage property. |
| `stage` | property | <code>stage: string</code> | Public stage property. |
| `total` | property | <code>total: number</code> | Public total property. |

## `ToolReceiptReconciler` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reconcile` | method | <code>reconcile(request: { invocationId: string; tool: ResolvedToolSpec; call: ToolCallRequest; attempt: number; }): Promise&lt;ToolReceiptReconciliation&gt;</code> | Public runtime operation for reconcile. |

## `ToolReceiptReconciliation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `receipt` | property | <code>receipt: ToolExternalReceipt</code> | Public receipt property. |
| `state` | property | <code>state: "unknown" &#124; "committed" &#124; "not_committed"</code> | Public state property. |

## `ToolResultCache` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `ToolResultCacheArtifactVerifier` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(request: { toolId: string; artifactRefs: readonly string[]; tenantId?: string; userId?: string; workspaceId?: string; }): Promise&lt;boolean&gt;</code> | Public runtime operation for verify. |

## `ToolResultCacheEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `keyVersion` | property | <code>keyVersion: "1"</code> | Public key Version property. |
| `result` | property | <code>result: ToolCachedResultProjection</code> | Public result property. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public schema Version property. |
| `validity` | property | <code>validity: ToolCacheValidityRecord</code> | Public validity property. |

## `ToolRunner` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelInvocation` | method | <code>cancelInvocation(invocationId: string, reason?: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Cancels Invocation at this module boundary. |
| `run` | method | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | Public runtime operation for run. |

## `ToolSchemaValidationIssue` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `message` | property | <code>message: string</code> | Public message property. |
| `path` | property | <code>path: string</code> | Public path property. |

## `ToolSchemaValidationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: string</code> | Public error property. |
| `issues` | property | <code>issues: ToolSchemaValidationIssue[]</code> | Public issues property. |
| `valid` | property | <code>valid: boolean</code> | Public valid property. |

## `ToolSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `auditPolicy` | property | <code>auditPolicy: AuditPolicySpec</code> | Public audit Policy property. |
| `cache` | property | <code>cache: ToolCachePolicySpec</code> | Public cache property. |
| `deprecated` | property | <code>deprecated: boolean</code> | Public deprecated property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `displayName` | property | <code>displayName: string</code> | Public display Name property. |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `execution` | property | <code>execution: ToolExecutionPolicySpec</code> | Public execution property. |
| `governance` | property | <code>governance: ToolGovernanceSpec</code> | Public governance property. |
| `humanApprovalPolicy` | property | <code>humanApprovalPolicy: HumanReviewPolicySpec</code> | Public human Approval Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyPolicy` | property | <code>idempotencyPolicy: { mode: "none" &#124; "optional" &#124; "required"; }</code> | Public idempotency Policy property. |
| `input` | property | <code>input: ToolSchemaSpec</code> | Public input property. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public input schema property. |
| `instructions` | property | <code>instructions: string</code> | Public instructions property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `observability` | property | <code>observability: ToolObservabilitySpec</code> | Public observability property. |
| `output` | property | <code>output: ToolSchemaSpec</code> | Public output property. |
| `outputSchema` | property | <code>outputSchema: JsonSchema</code> | Public output schema property. |
| `permissionScope` | property | <code>permissionScope: string[]</code> | Public permission Scope property. |
| `postconditions` | property | <code>postconditions: string[]</code> | Public postconditions property. |
| `preconditions` | property | <code>preconditions: string[]</code> | Public preconditions property. |
| `replacedBy` | property | <code>replacedBy: { id: string; version?: string; revision?: string; }</code> | Public replaced By property. |
| `retryPolicy` | property | <code>retryPolicy: RetryPolicySpec</code> | Public retry Policy property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `semantics` | property | <code>semantics: ToolSemanticSpec</code> | Public semantics property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `source` | property | <code>source: ToolSource</code> | Public source property. |
| `sourceRef` | property | <code>sourceRef: { serverId?: string; capabilityId?: string; capabilityHash?: string; trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"; declarationSource?: "framework" &#124; "user" &#124; "server" &#124; "unknown"; } &amp; ToolSourceRef</code> | Public source Ref property. |
| `streaming` | property | <code>streaming: ToolStreamingSpec</code> | Public streaming property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `timeoutPolicy` | property | <code>timeoutPolicy: TimeoutPolicySpec</code> | Public timeout Policy property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ToolTargetResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `ToolTargetResolver` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve(request: ToolCallRequest, registry: ToolRegistry): Promise&lt;ToolTargetResolution&gt;</code> | Resolves resolve at this module boundary. |
