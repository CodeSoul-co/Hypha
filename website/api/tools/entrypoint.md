# `@codesoul-co/hypha-tools` / `index`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)
- Exports: **85**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-tools`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 51 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 17 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 12 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { toolCacheValidityRecordSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = toolCacheValidityRecordSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `AllowAllToolAuthorizer` | class | <code>new AllowAllToolAuthorizer(): AllowAllToolAuthorizer</code> | Allow All Tool Authorizer class with 2 public constructor or member entries; its exact declarations are listed below. |
| `GovernedToolRunner` | class | <code>new GovernedToolRunner(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "byp...</code> | Governed Tool Runner class with 8 public constructor or member entries; its exact declarations are listed below. |
| `HttpToolAdapter` | class | <code>new HttpToolAdapter(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | Http Tool Adapter class with 7 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryToolApprovalStore` | class | <code>new InMemoryToolApprovalStore(): InMemoryToolApprovalStore</code> | In Memory Tool Approval Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryToolInvocationStore` | class | <code>new InMemoryToolInvocationStore(): InMemoryToolInvocationStore</code> | In Memory Tool Invocation Store class with 8 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryToolResultCache` | class | <code>new InMemoryToolResultCache(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | In Memory Tool Result Cache class with 5 public constructor or member entries; its exact declarations are listed below. |
| `LocalFunctionToolAdapter` | class | <code>new LocalFunctionToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | Local Function Tool Adapter class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MCPToolAdapter` | class | <code>new MCPToolAdapter(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | MCP Tool Adapter class with 7 public constructor or member entries; its exact declarations are listed below. |
| `MockToolAdapter` | class | <code>new MockToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | Mock Tool Adapter class with 6 public constructor or member entries; its exact declarations are listed below. |
| `MockToolRunner` | class | <code>new MockToolRunner(defaultOutput?: unknown): MockToolRunner</code> | Mock Tool Runner class with 4 public constructor or member entries; its exact declarations are listed below. |
| `PermissionScopeToolAuthorizer` | class | <code>new PermissionScopeToolAuthorizer(): PermissionScopeToolAuthorizer</code> | Permission Scope Tool Authorizer class with 2 public constructor or member entries; its exact declarations are listed below. |
| `PluginToolAdapter` | class | <code>new PluginToolAdapter&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | Plugin Tool Adapter class with 6 public constructor or member entries; its exact declarations are listed below. |
| `RedisToolResultCache` | class | <code>new RedisToolResultCache(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments. |
| `ToolRegistry` | class | <code>new ToolRegistry(): ToolRegistry</code> | Tool Registry class with 9 public constructor or member entries; its exact declarations are listed below. |
| `ToolResultCacheEntryTooLargeError` | class | <code>new ToolResultCacheEntryTooLargeError(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | Tool Result Cache Entry Too Large Error class with 11 public constructor or member entries; its exact declarations are listed below. |
| `ToolResultCacheOperationTimeoutError` | class | <code>new ToolResultCacheOperationTimeoutError(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | Tool Result Cache Operation Timeout Error class with 11 public constructor or member entries; its exact declarations are listed below. |
| `ToolResultCacheValidationError` | class | <code>new ToolResultCacheValidationError(message: string): ToolResultCacheValidationError</code> | Tool Result Cache Validation Error class with 9 public constructor or member entries; its exact declarations are listed below. |
| `TOOL_INVOCATION_STATUSES` | constant | <code>const TOOL_INVOCATION_STATUSES: readonly ["created", "validating", "validated", "policy_checked", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "completed", "failed", "timed_out", "expired", "conflict", "denied", "cancelled"]</code> | TOOL INVOCATION STATUSES constant exported by the `index` module. |
| `toolCacheValidityRecordSchema` | constant | <code>const toolCacheValidityRecordSchema: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.ZodString; validUntil: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { toolId: st...</code> | Runtime schema for Tool Cache Validity Record. |
| `toolProfileSpecDefinition` | constant | <code>const toolProfileSpecDefinition: SpecSchemaDefinition&lt;ToolProfileSpec&gt;</code> | Runtime validation entrypoint for the Tool Profile spec, combining its parser, example and JSON Schema. |
| `toolProfileSpecSchema` | constant | <code>const toolProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; toolRefs: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined; }, { id: string; revision?: string &#124; undefined; version?: string &#124; un...</code> | Runtime schema for Tool Profile Spec. |
| `toolResultCacheEntryJsonSchema` | constant | <code>const toolResultCacheEntryJsonSchema: JsonSchema</code> | JSON Schema for Tool Result Cache Entry. |
| `toolResultCacheEntrySchema` | constant | <code>const toolResultCacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; validity: z.ZodObject&lt;{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; capabilityHash: z.ZodOptional&lt;z.ZodString&gt;; externalStateVersion: z.ZodOptional&lt;z.ZodString&gt;; key: z.Zo...</code> | Runtime schema for Tool Result Cache Entry. |
| `toolSpecDefinition` | constant | <code>const toolSpecDefinition: SpecSchemaDefinition&lt;ToolSpec&gt;</code> | Runtime validation entrypoint for the Tool spec, combining its parser, example and JSON Schema. |
| `toolSpecDefinitions` | constant | <code>const toolSpecDefinitions: readonly [SpecSchemaDefinition&lt;ToolSpec&gt;, SpecSchemaDefinition&lt;ToolProfileSpec&gt;]</code> | Tool Spec Definitions constant exported by the `index` module. |
| `toolSpecExample` | constant | <code>const toolSpecExample: ToolSpec</code> | Valid example value for Tool Spec. |
| `toolSpecJsonSchema` | constant | <code>const toolSpecJsonSchema: JsonSchema</code> | JSON Schema for Tool Spec. |
| `toolSpecJsonSchemas` | constant | <code>const toolSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Tool Spec JSON Schemas constant exported by the `index` module. |
| `toolSpecSchema` | constant | <code>const toolSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; revision: z.ZodOptional&lt;z.ZodString&gt;; name: z.ZodOptional&lt;z.ZodString&gt;; displayName: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; outputSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSch...</code> | Runtime schema for Tool Spec. |
| `normalizeToolSpec` | function | <code>normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec</code> | Normalize Tool Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateEffectiveCapabilityAccess` | function | <code>validateEffectiveCapabilityAccess(input: { snapshot: ToolContractSnapshot &#124; null; context: ToolCallContext; spec: ToolSpec; }): string &#124; null</code> | Validate Effective Capability Access function with 1 public call signature; parameters and return types are listed below. |
| `validateToolInput` | function | <code>validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult</code> | Validate Tool Input function with 1 public call signature; parameters and return types are listed below. |
| `validateToolResultCacheEntry` | function | <code>validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry</code> | Validate Tool Result Cache Entry function with 1 public call signature; parameters and return types are listed below. |
| `validateToolSpec` | function | <code>validateToolSpec(input: unknown): ToolSpec</code> | Validate Tool Spec function with 1 public call signature; parameters and return types are listed below. |
| `AdapterCancellationRequest` | interface | <code>interface AdapterCancellationRequest</code> | Adapter Cancellation Request interface with 3 public fields or methods. |
| `AdapterExecutionRequest` | interface | <code>interface AdapterExecutionRequest</code> | Adapter Execution Request interface with 3 public fields or methods. |
| `HttpToolAdapterOptions` | interface | <code>interface HttpToolAdapterOptions</code> | Http Tool Adapter Options interface with 4 public fields or methods. |
| `InMemoryToolResultCacheOptions` | interface | <code>interface InMemoryToolResultCacheOptions</code> | In Memory Tool Result Cache Options interface with 2 public fields or methods. |
| `MCPToolInvocationPort` | interface | <code>interface MCPToolInvocationPort</code> | MCP Tool Invocation Port interface with 3 public fields or methods. |
| `RedisLikeToolResultCacheClient` | interface | <code>interface RedisLikeToolResultCacheClient</code> | Redis Like Tool Result Cache Client interface with 3 public fields or methods. |
| `RedisToolResultCacheOptions` | interface | <code>interface RedisToolResultCacheOptions</code> | Redis Tool Result Cache Options interface with 5 public fields or methods. |
| `ToolAdapter` | interface | <code>interface ToolAdapter</code> | Tool Adapter interface with 7 public fields or methods. |
| `ToolAdapterCapabilities` | interface | <code>interface ToolAdapterCapabilities</code> | Tool Adapter Capabilities interface with 5 public fields or methods. |
| `ToolApprovalGrant` | interface | <code>interface ToolApprovalGrant</code> | Tool Approval Grant interface with 11 public fields or methods. |
| `ToolApprovalRequest` | interface | <code>interface ToolApprovalRequest</code> | Tool Approval Request interface with 15 public fields or methods. |
| `ToolApprovalStore` | interface | <code>interface ToolApprovalStore</code> | Tool Approval Store interface with 5 public fields or methods. |
| `ToolArtifactPort` | interface | <code>interface ToolArtifactPort</code> | Tool Artifact Port interface with 1 public fields or methods. |
| `ToolAuthorizationDecision` | interface | <code>interface ToolAuthorizationDecision</code> | Tool Authorization Decision interface with 3 public fields or methods. |
| `ToolAuthorizationInput` | interface | <code>interface ToolAuthorizationInput</code> | Tool Authorization Input interface with 4 public fields or methods. |
| `ToolAuthorizer` | interface | <code>interface ToolAuthorizer</code> | Tool Authorizer interface with 1 public fields or methods. |
| `ToolCachedResultProjection` | interface | <code>interface ToolCachedResultProjection</code> | Only stable, replay-safe output fields may cross invocation boundaries. |
| `ToolCallContext` | interface | <code>interface ToolCallContext</code> | Tool Call Context interface with 24 public fields or methods. |
| `ToolCallError` | interface | <code>interface ToolCallError</code> | Tool Call Error interface with 5 public fields or methods. |
| `ToolCallRequest` | interface | <code>interface ToolCallRequest</code> | Tool Call Request interface with 3 public fields or methods. |
| `ToolCallResult` | interface | <code>interface ToolCallResult</code> | Tool Call Result interface with 12 public fields or methods. |
| `ToolExecutionEnvelope` | interface | <code>interface ToolExecutionEnvelope</code> | Tool Execution Envelope interface with 7 public fields or methods. |
| `ToolExecutionScope` | interface | <code>interface ToolExecutionScope</code> | Tool Execution Scope interface with 3 public fields or methods. |
| `ToolIdempotencyLookup` | interface | <code>interface ToolIdempotencyLookup</code> | Tool Idempotency Lookup interface with 3 public fields or methods. |
| `ToolInvocationListRequest` | interface | <code>interface ToolInvocationListRequest</code> | Tool Invocation List Request interface with 4 public fields or methods. |
| `ToolInvocationRecord` | interface | <code>interface ToolInvocationRecord</code> | Tool Invocation Record interface with 37 public fields or methods. |
| `ToolInvocationStore` | interface | <code>interface ToolInvocationStore</code> | Tool Invocation Store interface with 7 public fields or methods. |
| `ToolMiddleware` | interface | <code>interface ToolMiddleware</code> | Tool Middleware interface with 5 public fields or methods. |
| `ToolMiddlewareContext` | interface | <code>interface ToolMiddlewareContext</code> | Tool Middleware Context interface with 5 public fields or methods. |
| `ToolObservationPort` | interface | <code>interface ToolObservationPort</code> | Tool Observation Port interface with 1 public fields or methods. |
| `ToolPrincipal` | interface | <code>interface ToolPrincipal</code> | Tool Principal interface with 13 public fields or methods. |
| `ToolProfileSpec` | interface | <code>interface ToolProfileSpec extends VersionedSpec</code> | Tool Profile Spec interface with 11 public fields or methods. |
| `ToolProgressUpdate` | interface | <code>interface ToolProgressUpdate</code> | Tool Progress Update interface with 6 public fields or methods. |
| `ToolReceiptReconciler` | interface | <code>interface ToolReceiptReconciler</code> | Tool Receipt Reconciler interface with 1 public fields or methods. |
| `ToolReceiptReconciliation` | interface | <code>interface ToolReceiptReconciliation</code> | Tool Receipt Reconciliation interface with 3 public fields or methods. |
| `ToolResultCache` | interface | <code>interface ToolResultCache</code> | Tool Result Cache interface with 3 public fields or methods. |
| `ToolResultCacheArtifactVerifier` | interface | <code>interface ToolResultCacheArtifactVerifier</code> | Tool Result Cache Artifact Verifier interface with 1 public fields or methods. |
| `ToolResultCacheEntry` | interface | <code>interface ToolResultCacheEntry</code> | Tool Result Cache Entry interface with 5 public fields or methods. |
| `ToolRunner` | interface | <code>interface ToolRunner</code> | Tool Runner interface with 2 public fields or methods. |
| `ToolSchemaValidationIssue` | interface | <code>interface ToolSchemaValidationIssue</code> | Tool Schema Validation Issue interface with 2 public fields or methods. |
| `ToolSchemaValidationResult` | interface | <code>interface ToolSchemaValidationResult</code> | Tool Schema Validation Result interface with 3 public fields or methods. |
| `ToolSpec` | interface | <code>interface ToolSpec</code> | Tool Spec interface with 33 public fields or methods. |
| `ToolTargetResolution` | interface | <code>interface ToolTargetResolution</code> | Tool Target Resolution interface with 3 public fields or methods. |
| `ToolTargetResolver` | interface | <code>interface ToolTargetResolver</code> | Tool Target Resolver interface with 1 public fields or methods. |
| `MockToolHandler` | type | <code>type MockToolHandler = (request: ToolCallRequest) =&gt; Promise&lt;ToolCallResult&gt; &#124; ToolCallResult</code> | Public type alias for Mock Tool Handler; the declaration contains its complete type expression. |
| `ResolvedToolSpec` | type | <code>type ResolvedToolSpec = ToolSpec &amp; GovernedToolContractSpec</code> | Public type alias for Resolved Tool Spec; the declaration contains its complete type expression. |
| `ToolExecutionPhase` | type | <code>type ToolExecutionPhase = 'resolution' &#124; 'authorization' &#124; 'input_validation' &#124; 'policy' &#124; 'approval' &#124; 'execution' &#124; 'timeout' &#124; 'output_validation'</code> | Public type alias for Tool Execution Phase; the declaration contains its complete type expression. |
| `ToolHandler` | type | <code>type ToolHandler = (input: TInput, context: ToolCallContext) =&gt; Promise&lt;TOutput&gt;</code> | Public type alias for Tool Handler; the declaration contains its complete type expression. |
| `ToolInvocationPatch` | type | <code>type ToolInvocationPatch = Partial&lt;Pick&lt;ToolInvocationRecord, 'status' &#124; 'executionCycle' &#124; 'attemptCount' &#124; 'result' &#124; 'approvalRequest' &#124; 'updatedAt' &#124; 'startedAt' &#124; 'completedAt' &#124; 'lateResultState' &#124; 'outputHash' &#124; 'artifactRefs' &#124; 'observationRefs' &#124; 'externalReceipt'&gt;&gt;</code> | Public type alias for Tool Invocation Patch; the declaration contains its complete type expression. |
| `ToolInvocationStatus` | type | <code>type ToolInvocationStatus = (typeof TOOL_INVOCATION_STATUSES)[number]</code> | Public type alias for Tool Invocation Status; the declaration contains its complete type expression. |
| `ToolResultContent` | type | <code>type ToolResultContent = { type: 'text'; text: string; } &#124; { type: 'json'; value: unknown; } &#124; { type: 'image'; artifactRef?: string; url?: string; mimeType?: string; alt?: string; } &#124; { type: 'resource'; uri: string; mimeType?: string; title?: string; } &#124; { type: 'artifact'; artifactRef: string; title?: string; mimeType?: string; }</code> | Public type alias for Tool Result Content; the declaration contains its complete type expression. |

## `AllowAllToolAuthorizer`

Allow All Tool Authorizer class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { AllowAllToolAuthorizer } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class AllowAllToolAuthorizer implements ToolAuthorizer {
    authorize(): Promise<ToolAuthorizationDecision>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(): Promise&lt;ToolAuthorizationDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): AllowAllToolAuthorizer</code> | Creates an instance of this class. |

## `GovernedToolRunner`

Governed Tool Runner class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { GovernedToolRunner } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approveAndResume` | method | <code>approveAndResume(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolCallResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `cancelInvocation` | method | <code>cancelInvocation(invocationId: string, reason?: string): Promise&lt;ToolCallResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(registry: ToolRegistry, trace: TraceRecorder, policy?: PolicyEngine, options?: { approvalStore?: ToolApprovalStore; invocationStore?: ToolInvocationStore; authorizer?: ToolAuthorizer; middleware?: ToolMiddleware[]; artifactPort?: ToolArtifactPort; snapshotStore?: ToolContractSnapshotStore; receiptReconciler?: ToolReceiptReconciler; resultCache?: ToolResultCache; resultCacheFailureMode?: "bypass" &#124; "strict"; resul...</code> | Creates an instance of this class. |
| `getInvocation` | method | <code>getInvocation(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listInvocations` | method | <code>listInvocations(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recoverPendingInvocations` | method | <code>recoverPendingInvocations(): Promise&lt;ToolCallResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `rejectInvocation` | method | <code>rejectInvocation(invocationId: string): Promise&lt;ToolCallResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `run` | method | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `HttpToolAdapter`

Http Tool Adapter class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { HttpToolAdapter } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(id: string, options: HttpToolAdapterOptions): HttpToolAdapter</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>readonly source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryToolApprovalStore`

In Memory Tool Approval Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryToolApprovalStore } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approve` | method | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryToolApprovalStore</code> | Creates an instance of this class. |
| `getGrant` | method | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRequest` | method | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reject` | method | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `requestApproval` | method | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryToolInvocationStore`

In Memory Tool Invocation Store class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryToolInvocationStore } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryToolInvocationStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `findByIdempotency` | method | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getCompleted` | method | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveCompleted` | method | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryToolResultCache`

In Memory Tool Result Cache class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryToolResultCache } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class InMemoryToolResultCache implements ToolResultCache {
    constructor(options?: InMemoryToolResultCacheOptions);
    get(key: string): Promise<ToolResultCacheEntry | null>;
    set(entry: ToolResultCacheEntry): Promise<void>;
    delete(key: string): Promise<void>;
    size(): number;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: InMemoryToolResultCacheOptions): InMemoryToolResultCache</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `size` | method | <code>size(): number</code> | Public method; parameters and return type are shown in the signature. |

## `LocalFunctionToolAdapter`

Local Function Tool Adapter class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalFunctionToolAdapter } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): LocalFunctionToolAdapter&lt;TInput, TOutput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>readonly source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPToolAdapter`

MCP Tool Adapter class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MCPToolAdapter } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(id: string, serverId: string, capabilityId: string, gateway: MCPToolInvocationPort): MCPToolAdapter</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest): Promise&lt;ToolExecutionEnvelope&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>readonly source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MockToolAdapter`

Mock Tool Adapter class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MockToolAdapter } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class MockToolAdapter<TInput = unknown, TOutput = unknown> extends LocalFunctionToolAdapter<TInput, TOutput> {
    readonly source: ToolSource;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): MockToolAdapter&lt;TInput, TOutput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>readonly source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MockToolRunner`

Mock Tool Runner class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MockToolRunner } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class MockToolRunner implements ToolRunner {
    constructor(defaultOutput?: unknown);
    registerHandler(toolId: string, handler: MockToolHandler): void;
    registerResult(toolId: string, result: ToolCallResult): void;
    run(request: ToolCallRequest): Promise<ToolCallResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(defaultOutput?: unknown): MockToolRunner</code> | Creates an instance of this class. |
| `registerHandler` | method | <code>registerHandler(toolId: string, handler: MockToolHandler): void</code> | Public method; parameters and return type are shown in the signature. |
| `registerResult` | method | <code>registerResult(toolId: string, result: ToolCallResult): void</code> | Public method; parameters and return type are shown in the signature. |
| `run` | method | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PermissionScopeToolAuthorizer`

Permission Scope Tool Authorizer class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { PermissionScopeToolAuthorizer } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class PermissionScopeToolAuthorizer implements ToolAuthorizer {
    authorize(input: ToolAuthorizationInput): Promise<ToolAuthorizationDecision>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): PermissionScopeToolAuthorizer</code> | Creates an instance of this class. |

## `PluginToolAdapter`

Plugin Tool Adapter class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { PluginToolAdapter } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class PluginToolAdapter<TInput = unknown, TOutput = unknown> extends LocalFunctionToolAdapter<TInput, TOutput> {
    readonly source: ToolSource;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>&lt;TInput = unknown, TOutput = unknown&gt;(id: string, handler: ToolHandler&lt;TInput, TOutput&gt;): PluginToolAdapter&lt;TInput, TOutput&gt;</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>readonly source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RedisToolResultCache`

Shared Redis-compatible Store for local, self-hosted, and managed Redis deployments.

- Kind: class
- Import: `import { RedisToolResultCache } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class RedisToolResultCache implements ToolResultCache {
    constructor(options: RedisToolResultCacheOptions);
    get(key: string): Promise<ToolResultCacheEntry | null>;
    set(entry: ToolResultCacheEntry): Promise<void>;
    delete(key: string): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RedisToolResultCacheOptions): RedisToolResultCache</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolRegistry`

Tool Registry class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ToolRegistry } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ToolRegistry</code> | Creates an instance of this class. |
| `getAdapter` | method | <code>getAdapter(toolId: string): ToolAdapter &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `getSpec` | method | <code>getSpec(toolId: string): ResolvedToolSpec &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `getTargetResolver` | method | <code>getTargetResolver(toolId: string): ToolTargetResolver &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): ResolvedToolSpec[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(spec: ToolSpec, handler: ToolHandler, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | Public method; parameters and return type are shown in the signature. |
| `registerAdapter` | method | <code>registerAdapter(spec: ToolSpec, adapter: ToolAdapter, options?: { replace?: boolean; targetResolver?: ToolTargetResolver; }): void</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(ref: { id: string; version?: string; revision?: string; }): { spec: ResolvedToolSpec; adapter: ToolAdapter; } &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `unregister` | method | <code>unregister(toolId: string): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `ToolResultCacheEntryTooLargeError`

Tool Result Cache Entry Too Large Error class with 11 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ToolResultCacheEntryTooLargeError } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class ToolResultCacheEntryTooLargeError extends Error {
    readonly actualBytes: number;
    readonly maxEntryBytes: number;
    readonly code = "TOOL_RESULT_CACHE_ENTRY_TOO_LARGE";
    constructor(actualBytes: number, maxEntryBytes: number);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualBytes` | property | <code>readonly actualBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "TOOL_RESULT_CACHE_ENTRY_TOO_LARGE"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(actualBytes: number, maxEntryBytes: number): ToolResultCacheEntryTooLargeError</code> | Creates an instance of this class. |
| `maxEntryBytes` | property | <code>readonly maxEntryBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `ToolResultCacheOperationTimeoutError`

Tool Result Cache Operation Timeout Error class with 11 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ToolResultCacheOperationTimeoutError } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class ToolResultCacheOperationTimeoutError extends Error {
    readonly operation: 'get' | 'set' | 'delete' | 'verify';
    readonly timeoutMs: number;
    readonly code = "TOOL_RESULT_CACHE_TIMEOUT";
    constructor(operation: 'get' | 'set' | 'delete' | 'verify', timeoutMs: number);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "TOOL_RESULT_CACHE_TIMEOUT"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(operation: "get" &#124; "set" &#124; "delete" &#124; "verify", timeoutMs: number): ToolResultCacheOperationTimeoutError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>readonly operation: "delete" &#124; "verify" &#124; "get" &#124; "set"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `timeoutMs` | property | <code>readonly timeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolResultCacheValidationError`

Tool Result Cache Validation Error class with 9 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ToolResultCacheValidationError } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare class ToolResultCacheValidationError extends Error {
    readonly code = "TOOL_RESULT_CACHE_CORRUPT";
    constructor(message: string);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: "TOOL_RESULT_CACHE_CORRUPT"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(message: string): ToolResultCacheValidationError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `TOOL_INVOCATION_STATUSES`

TOOL INVOCATION STATUSES constant exported by the `index` module.

- Kind: constant
- Import: `import { TOOL_INVOCATION_STATUSES } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const TOOL_INVOCATION_STATUSES: readonly ["created", "validating", "validated", "policy_checked", "waiting_approval", "approved", "rejected", "queued", "running", "cancelling", "completed", "failed", "timed_out", "expired", "conflict", "denied", "cancelled"];
```

## `toolCacheValidityRecordSchema`

Runtime schema for Tool Cache Validity Record.

- Kind: constant
- Import: `import { toolCacheValidityRecordSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolCacheValidityRecordSchema: z.ZodObject<{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional<z.ZodString>; capabilityHash: z.ZodOptional<z.ZodString>; externalStateVersion: z.ZodOptional<z.ZodString>; key: z.ZodString; validUntil: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }>;
```

## `toolProfileSpecDefinition`

Runtime validation entrypoint for the Tool Profile spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { toolProfileSpecDefinition } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolProfileSpecDefinition: SpecSchemaDefinition<ToolProfileSpec>;
```

## `toolProfileSpecSchema`

Runtime schema for Tool Profile Spec.

- Kind: constant
- Import: `import { toolProfileSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolProfileSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolProfileSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `toolResultCacheEntryJsonSchema`

JSON Schema for Tool Result Cache Entry.

- Kind: constant
- Import: `import { toolResultCacheEntryJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolResultCacheEntryJsonSchema: JsonSchema;
```

## `toolResultCacheEntrySchema`

Runtime schema for Tool Result Cache Entry.

- Kind: constant
- Import: `import { toolResultCacheEntrySchema } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolResultCacheEntrySchema: z.ZodObject<{ schemaVersion: z.ZodLiteral<"1.0">; keyVersion: z.ZodLiteral<"1">; validity: z.ZodObject<{ toolId: z.ZodString; toolRevision: z.ZodString; inputHash: z.ZodString; scopeHash: z.ZodString; policyRevision: z.ZodString; contractSnapshotHash: z.ZodOptional<z.ZodString>; capabilityHash: z.ZodOptional<z.ZodString>; externalStateVersion: z.ZodOptional<z.ZodString>; key: z.ZodString; validUntil: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }, { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }>; result: z.ZodObject<{ output: z.ZodOptional<z.ZodUnknown>; content: z.ZodOptional<z.ZodArray<z.ZodType<ToolResultContent, z.ZodTypeDef, ToolResultContent>, "many">>; artifactRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strict", z.ZodTypeAny, { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }, { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }>; createdAt: z.ZodString; }, "strict", z.ZodTypeAny, { schemaVersion: "1.0"; result: { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }; createdAt: string; keyVersion: "1"; validity: { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }; }, { schemaVersion: "1.0"; result: { output?: unknown; artifactRefs?: string[] | undefined; content?: ToolResultContent[] | undefined; }; createdAt: string; keyVersion: "1"; validity: { toolId: string; toolRevision: string; policyRevision: string; scopeHash: string; inputHash: string; key: string; contractSnapshotHash?: string | undefined; capabilityHash?: string | undefined; externalStateVersion?: string | undefined; validUntil?: string | undefined; }; }>;
```

## `toolSpecDefinition`

Runtime validation entrypoint for the Tool spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { toolSpecDefinition } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolSpecDefinition: SpecSchemaDefinition<ToolSpec>;
```

## `toolSpecDefinitions`

Tool Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { toolSpecDefinitions } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolSpecDefinitions: readonly [SpecSchemaDefinition<ToolSpec>, SpecSchemaDefinition<ToolProfileSpec>];
```

## `toolSpecExample`

Valid example value for Tool Spec.

- Kind: constant
- Import: `import { toolSpecExample } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolSpecExample: ToolSpec;
```

## `toolSpecJsonSchema`

JSON Schema for Tool Spec.

- Kind: constant
- Import: `import { toolSpecJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolSpecJsonSchema: JsonSchema;
```

## `toolSpecJsonSchemas`

Tool Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { toolSpecJsonSchemas } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare const toolSpecJsonSchemas: Record<string, JsonSchema>;
```

## `toolSpecSchema`

Runtime schema for Tool Spec.

- Kind: constant
- Import: `import { toolSpecSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolSpecSchema: (typeof import('@codesoul-co/hypha-tools'))['toolSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `normalizeToolSpec`

Normalize Tool Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare function normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec;
```

### Call signature

```text
normalizeToolSpec(spec: ToolSpec): ResolvedToolSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>ToolSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ResolvedToolSpec`
- Description: The return contract is defined by the type shown above.

## `validateEffectiveCapabilityAccess`

Validate Effective Capability Access function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateEffectiveCapabilityAccess } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare function validateEffectiveCapabilityAccess(input: {
    snapshot: ToolContractSnapshot | null;
    context: ToolCallContext;
    spec: ToolSpec;
}): string | null;
```

### Call signature

```text
validateEffectiveCapabilityAccess(input: { snapshot: ToolContractSnapshot | null; context: ToolCallContext; spec: ToolSpec; }): string | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ snapshot: ToolContractSnapshot &#124; null; context: ToolCallContext; spec: ToolSpec; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `validateToolInput`

Validate Tool Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateToolInput } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare function validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult;
```

### Call signature

```text
validateToolInput(schema: JsonSchema, input: unknown): ToolSchemaValidationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `schema` | <code>JsonSchema</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolSchemaValidationResult`
- Description: The return contract is defined by the type shown above.

## `validateToolResultCacheEntry`

Validate Tool Result Cache Entry function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateToolResultCacheEntry } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare function validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry;
```

### Call signature

```text
validateToolResultCacheEntry(value: unknown, maxEntryBytes?: number): ToolResultCacheEntry
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `maxEntryBytes` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolResultCacheEntry`
- Description: The return contract is defined by the type shown above.

## `validateToolSpec`

Validate Tool Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export declare function validateToolSpec(input: unknown): ToolSpec;
```

### Call signature

```text
validateToolSpec(input: unknown): ToolSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolSpec`
- Description: The return contract is defined by the type shown above.

## `AdapterCancellationRequest`

Adapter Cancellation Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { AdapterCancellationRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface AdapterCancellationRequest {
    toolId: string;
    invocationId: string;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AdapterExecutionRequest`

Adapter Execution Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { AdapterExecutionRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface AdapterExecutionRequest<TInput = unknown> {
    toolId: string;
    input: TInput;
    context: ToolCallContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HttpToolAdapterOptions`

Http Tool Adapter Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { HttpToolAdapterOptions } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface HttpToolAdapterOptions {
    endpoint: string;
    headers?: Record<string, string>;
    resolveHeaders?: () => Promise<Record<string, string>>;
    fetch?: typeof fetch;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `endpoint` | property | <code>endpoint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fetch` | method | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `headers` | property | <code>headers?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveHeaders` | method | <code>resolveHeaders?(): Promise&lt;Record&lt;string, string&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryToolResultCacheOptions`

In Memory Tool Result Cache Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryToolResultCacheOptions } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface InMemoryToolResultCacheOptions {
    maxEntries?: number;
    maxEntryBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPToolInvocationPort`

MCP Tool Invocation Port interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MCPToolInvocationPort } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel?(requestId: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(serverId: string): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invoke` | method | <code>invoke(request: { serverId: string; capabilityId: string; input: unknown; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisLikeToolResultCacheClient`

Redis Like Tool Result Cache Client interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RedisLikeToolResultCacheClient } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface RedisLikeToolResultCacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: 'PX', durationMilliseconds?: number): Promise<unknown>;
    del(...keys: string[]): Promise<number>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: string, mode?: "PX", durationMilliseconds?: number): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisToolResultCacheOptions`

Redis Tool Result Cache Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RedisToolResultCacheOptions } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface RedisToolResultCacheOptions {
    client: RedisLikeToolResultCacheClient;
    namespace?: string;
    maxEntryBytes?: number;
    defaultTtlMs?: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeToolResultCacheClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTtlMs` | property | <code>defaultTtlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntryBytes` | property | <code>maxEntryBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespace` | property | <code>namespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |

## `ToolAdapter`

Tool Adapter interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ToolAdapter } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel?(request: AdapterCancellationRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;ToolAdapterCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(request: AdapterExecutionRequest&lt;TInput&gt;): Promise&lt;ToolExecutionEnvelope&lt;TOutput&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>readonly source: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAdapterCapabilities`

Tool Adapter Capabilities interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ToolAdapterCapabilities } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolAdapterCapabilities {
    execute: boolean;
    cancel: boolean;
    health: boolean;
    close: boolean;
    streaming?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | property | <code>cancel: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `close` | property | <code>close: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execute` | property | <code>execute: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `health` | property | <code>health: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streaming` | property | <code>streaming?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolApprovalGrant`

Tool Approval Grant interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ToolApprovalGrant } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvedAt` | property | <code>approvedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvedBy` | property | <code>approvedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionRef` | property | <code>policyDecisionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestId` | property | <code>requestId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolApprovalRequest`

Tool Approval Request interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { ToolApprovalRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionRef` | property | <code>policyDecisionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolApprovalStore`

Tool Approval Store interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ToolApprovalStore } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approve` | method | <code>approve(invocationId: string, approvedBy: string, options?: { approvedAt?: string; expiresAt?: string; }): Promise&lt;ToolApprovalGrant&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getGrant` | method | <code>getGrant(invocationId: string): Promise&lt;ToolApprovalGrant &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getRequest` | method | <code>getRequest(invocationId: string): Promise&lt;ToolApprovalRequest &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reject` | method | <code>reject(invocationId: string): Promise&lt;ToolApprovalRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `requestApproval` | method | <code>requestApproval(request: ToolApprovalRequest): Promise&lt;ToolApprovalRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolArtifactPort`

Tool Artifact Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ToolArtifactPort } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | method | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolAuthorizationDecision`

Tool Authorization Decision interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolAuthorizationDecision } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolAuthorizationDecision {
    allowed: boolean;
    reason?: string;
    missingPermissionScopes?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missingPermissionScopes` | property | <code>missingPermissionScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAuthorizationInput`

Tool Authorization Input interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ToolAuthorizationInput } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolAuthorizationInput {
    tool: ToolSpec;
    request: ToolCallRequest;
    principal?: ToolPrincipal;
    executionScope?: ToolExecutionScope;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionScope` | property | <code>executionScope?: ToolExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal?: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: ToolCallRequest&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tool` | property | <code>tool: ToolSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAuthorizer`

Tool Authorizer interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ToolAuthorizer } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolAuthorizer {
    authorize(input: ToolAuthorizationInput): Promise<ToolAuthorizationDecision>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(input: ToolAuthorizationInput): Promise&lt;ToolAuthorizationDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolCachedResultProjection`

Only stable, replay-safe output fields may cross invocation boundaries.

- Kind: interface
- Import: `import type { ToolCachedResultProjection } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolCachedResultProjection {
    output?: unknown;
    content?: ToolResultContent[];
    artifactRefs?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content?: ToolResultContent[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCallContext`

Tool Call Context interface with 24 public fields or methods.

- Kind: interface
- Import: `import type { ToolCallContext } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityApprovals` | property | <code>capabilityApprovals?: EffectiveCapabilityApproval[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionScope` | property | <code>executionScope?: ToolExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentEventId` | property | <code>parentEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal?: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reportProgress` | method | <code>reportProgress?(update: ToolProgressUpdate): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCallError`

Tool Call Error interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ToolCallError } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolCallError {
    code: string;
    message: string;
    phase: ToolExecutionPhase;
    retryable?: boolean;
    details?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `phase` | property | <code>phase: ToolExecutionPhase</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCallRequest`

Tool Call Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolCallRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolCallRequest<TInput = unknown> {
    toolId: string;
    input: TInput;
    context: ToolCallContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolCallResult`

Tool Call Result interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ToolCallResult } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequest` | property | <code>approvalRequest?: ToolApprovalRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attempts` | property | <code>attempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content?: ToolResultContent[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `durationMs` | property | <code>durationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: string &#124; ToolCallError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalReceipt` | property | <code>externalReceipt?: ToolExternalReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observationRefs` | property | <code>observationRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "human_review_required"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolExecutionEnvelope`

Tool Execution Envelope interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ToolExecutionEnvelope } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content?: ToolResultContent[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalReceipt` | property | <code>externalReceipt?: ToolExternalReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "tool_execution_envelope"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observationRefs` | property | <code>observationRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolExecutionScope`

Tool Execution Scope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolExecutionScope } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolExecutionScope {
    allowedToolIds?: readonly string[];
    policyRefs?: readonly string[];
    fsmState?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedToolIds` | property | <code>allowedToolIds?: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolIdempotencyLookup`

Tool Idempotency Lookup interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolIdempotencyLookup } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolIdempotencyLookup {
    toolId: string;
    idempotencyKey: string;
    scopeHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolInvocationListRequest`

Tool Invocation List Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ToolInvocationListRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolInvocationListRequest {
    statuses?: readonly ToolInvocationStatus[];
    toolId?: string;
    runId?: string;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statuses` | property | <code>statuses?: readonly ("completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolInvocationRecord`

Tool Invocation Record interface with 37 public fields or methods.

- Kind: interface
- Import: `import type { ToolInvocationRecord } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequest` | property | <code>approvalRequest?: ToolApprovalRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvalRequestId` | property | <code>approvalRequestId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attemptCount` | property | <code>attemptCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionCycle` | property | <code>executionCycle: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalReceipt` | property | <code>externalReceipt?: { provider?: string; receiptId: string; status?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyFingerprint` | property | <code>idempotencyFingerprint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lateResultState` | property | <code>lateResultState?: "none" &#124; "accepted" &#124; "quarantined" &#124; "pending" &#124; "discarded"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observationRefs` | property | <code>observationRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputHash` | property | <code>outputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal?: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queuedAt` | property | <code>queuedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redactedInput` | property | <code>redactedInput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: ToolCallRequest&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `result` | property | <code>result?: ToolCallResult&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reusedFromInvocationId` | property | <code>reusedFromInvocationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: { tenantId?: string; userId?: string; workspaceId?: string; sessionId?: string; runId: string; stepId?: string; agentId?: string; fsmState?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel?: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "rejected" &#124; "queued" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "denied" &#124; "expired" &#124; "approved" &#124; "conflict" &#124; "policy_checked" &#124; "waiting_approval" &#124; "validating" &#124; "validated"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRevision` | property | <code>toolRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolVersion` | property | <code>toolVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolInvocationStore`

Tool Invocation Store interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ToolInvocationStore } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(record: ToolInvocationRecord): Promise&lt;ToolInvocationRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `findByIdempotency` | method | <code>findByIdempotency(request: ToolIdempotencyLookup): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(invocationId: string): Promise&lt;ToolInvocationRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getCompleted` | method | <code>getCompleted(invocationId: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request?: ToolInvocationListRequest): Promise&lt;ToolInvocationRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `saveCompleted` | method | <code>saveCompleted(invocationId: string, result: ToolCallResult): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `update` | method | <code>update(invocationId: string, patch: ToolInvocationPatch, options?: { expectedStatuses?: readonly ToolInvocationStatus[]; expectedRevision?: number; }): Promise&lt;ToolInvocationRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolMiddleware`

Tool Middleware interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ToolMiddleware } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolMiddleware {
    id: string;
    beforeAuthorization?(context: ToolMiddlewareContext): Promise<void> | void;
    beforeExecution?(context: ToolMiddlewareContext): Promise<void> | void;
    afterExecution?(context: ToolMiddlewareContext, result: ToolExecutionEnvelope): Promise<ToolExecutionEnvelope | void> | ToolExecutionEnvelope | void;
    onError?(context: ToolMiddlewareContext, error: unknown): Promise<void> | void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterExecution` | method | <code>afterExecution?(context: ToolMiddlewareContext, result: ToolExecutionEnvelope): Promise&lt;ToolExecutionEnvelope &#124; void&gt; &#124; ToolExecutionEnvelope &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `beforeAuthorization` | method | <code>beforeAuthorization?(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `beforeExecution` | method | <code>beforeExecution?(context: ToolMiddlewareContext): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onError` | method | <code>onError?(context: ToolMiddlewareContext, error: unknown): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |

## `ToolMiddlewareContext`

Tool Middleware Context interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ToolMiddlewareContext } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolMiddlewareContext {
    invocationId: string;
    request: ToolCallRequest;
    originalRequest: ToolCallRequest;
    spec: ResolvedToolSpec;
    attempt?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `originalRequest` | property | <code>originalRequest: ToolCallRequest&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: ToolCallRequest&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: ResolvedToolSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolObservationPort`

Tool Observation Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ToolObservationPort } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(request: { invocationId: string; toolId: string; toolRevision: string; runId: string; stepId: string; inputHash: string; outputHash: string; value: unknown; artifactRefs?: string[]; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolPrincipal`

Tool Principal interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { ToolPrincipal } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authenticationContext` | property | <code>authenticationContext?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delegatedBy` | property | <code>delegatedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delegationDepth` | property | <code>delegationDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `roles` | property | <code>roles?: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolProfileSpec`

Tool Profile Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ToolProfileSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractSnapshotMode` | property | <code>contractSnapshotMode?: "run" &#124; "state"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultPermissionScopes` | property | <code>defaultPermissionScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lazyLoad` | property | <code>lazyLoad?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxLoadedTools` | property | <code>maxLoadedTools?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfileRefs` | property | <code>mcpProfileRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRefs` | property | <code>toolRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools?: ToolSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolProgressUpdate`

Tool Progress Update interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ToolProgressUpdate } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `current` | property | <code>current?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `percentage` | property | <code>percentage?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stage` | property | <code>stage?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `total` | property | <code>total?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolReceiptReconciler`

Tool Receipt Reconciler interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ToolReceiptReconciler } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reconcile` | method | <code>reconcile(request: { invocationId: string; tool: ResolvedToolSpec; call: ToolCallRequest; attempt: number; }): Promise&lt;ToolReceiptReconciliation&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolReceiptReconciliation`

Tool Receipt Reconciliation interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolReceiptReconciliation } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolReceiptReconciliation {
    state: 'committed' | 'not_committed' | 'unknown';
    receipt?: ToolExternalReceipt;
    details?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receipt` | property | <code>receipt?: ToolExternalReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: "unknown" &#124; "committed" &#124; "not_committed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolResultCache`

Tool Result Cache interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolResultCache } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolResultCache {
    get(key: string): Promise<ToolResultCacheEntry | null>;
    set(entry: ToolResultCacheEntry): Promise<void>;
    delete?(key: string): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete?(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;ToolResultCacheEntry &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(entry: ToolResultCacheEntry): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolResultCacheArtifactVerifier`

Tool Result Cache Artifact Verifier interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ToolResultCacheArtifactVerifier } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(request: { toolId: string; artifactRefs: readonly string[]; tenantId?: string; userId?: string; workspaceId?: string; }): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolResultCacheEntry`

Tool Result Cache Entry interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ToolResultCacheEntry } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolResultCacheEntry {
    schemaVersion: '1.0';
    keyVersion: '1';
    validity: ToolCacheValidityRecord;
    result: ToolCachedResultProjection;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `keyVersion` | property | <code>keyVersion: "1"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `result` | property | <code>result: ToolCachedResultProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validity` | property | <code>validity: ToolCacheValidityRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolRunner`

Tool Runner interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolRunner } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolRunner {
    run(request: ToolCallRequest): Promise<ToolCallResult>;
    cancelInvocation?(invocationId: string, reason?: string): Promise<ToolCallResult | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelInvocation` | method | <code>cancelInvocation?(invocationId: string, reason?: string): Promise&lt;ToolCallResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `run` | method | <code>run(request: ToolCallRequest): Promise&lt;ToolCallResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolSchemaValidationIssue`

Tool Schema Validation Issue interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolSchemaValidationIssue } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolSchemaValidationIssue {
    path: string;
    message: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolSchemaValidationResult`

Tool Schema Validation Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolSchemaValidationResult } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolSchemaValidationResult {
    valid: boolean;
    error?: string;
    issues: ToolSchemaValidationIssue[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issues` | property | <code>issues: ToolSchemaValidationIssue[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `valid` | property | <code>valid: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolSpec`

Tool Spec interface with 33 public fields or methods.

- Kind: interface
- Import: `import type { ToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `auditPolicy` | property | <code>auditPolicy?: AuditPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cache` | property | <code>cache?: ToolCachePolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deprecated` | property | <code>deprecated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `displayName` | property | <code>displayName?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enabled` | property | <code>enabled?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execution` | property | <code>execution?: ToolExecutionPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `governance` | property | <code>governance?: ToolGovernanceSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanApprovalPolicy` | property | <code>humanApprovalPolicy?: HumanReviewPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyPolicy` | property | <code>idempotencyPolicy?: { mode: "none" &#124; "optional" &#124; "required"; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input?: ToolSchemaSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructions` | property | <code>instructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observability` | property | <code>observability?: ToolObservabilitySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: ToolSchemaSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputSchema` | property | <code>outputSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScope` | property | <code>permissionScope?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `postconditions` | property | <code>postconditions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preconditions` | property | <code>preconditions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replacedBy` | property | <code>replacedBy?: { id: string; version?: string; revision?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryPolicy` | property | <code>retryPolicy?: RetryPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `semantics` | property | <code>semantics?: ToolSemanticSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source?: ToolSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRef` | property | <code>sourceRef?: { serverId?: string; capabilityId?: string; capabilityHash?: string; trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"; declarationSource?: "framework" &#124; "user" &#124; "server" &#124; "unknown"; } &amp; ToolSourceRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streaming` | property | <code>streaming?: ToolStreamingSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutPolicy` | property | <code>timeoutPolicy?: TimeoutPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolTargetResolution`

Tool Target Resolution interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolTargetResolution } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolTargetResolution {
    toolId: string;
    input: unknown;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolTargetResolver`

Tool Target Resolver interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ToolTargetResolver } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export interface ToolTargetResolver {
    resolve(request: ToolCallRequest, registry: ToolRegistry): Promise<ToolTargetResolution>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve(request: ToolCallRequest, registry: ToolRegistry): Promise&lt;ToolTargetResolution&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MockToolHandler`

Public type alias for Mock Tool Handler; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MockToolHandler } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export type MockToolHandler = (request: ToolCallRequest) => Promise<ToolCallResult> | ToolCallResult;
```

## `ResolvedToolSpec`

Public type alias for Resolved Tool Spec; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ResolvedToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export type ResolvedToolSpec = ToolSpec & GovernedToolContractSpec;
```

## `ToolExecutionPhase`

Public type alias for Tool Execution Phase; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ToolExecutionPhase } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export type ToolExecutionPhase = 'resolution' | 'authorization' | 'input_validation' | 'policy' | 'approval' | 'execution' | 'timeout' | 'output_validation';
```

## `ToolHandler`

Public type alias for Tool Handler; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ToolHandler } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export type ToolHandler<TInput = unknown, TOutput = unknown> = (input: TInput, context: ToolCallContext) => Promise<TOutput>;
```

## `ToolInvocationPatch`

Public type alias for Tool Invocation Patch; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ToolInvocationPatch } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export type ToolInvocationPatch = Partial<Pick<ToolInvocationRecord, 'status' | 'executionCycle' | 'attemptCount' | 'result' | 'approvalRequest' | 'updatedAt' | 'startedAt' | 'completedAt' | 'lateResultState' | 'outputHash' | 'artifactRefs' | 'observationRefs' | 'externalReceipt'>>;
```

## `ToolInvocationStatus`

Public type alias for Tool Invocation Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ToolInvocationStatus } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

```text
export type ToolInvocationStatus = (typeof TOOL_INVOCATION_STATUSES)[number];
```

## `ToolResultContent`

Public type alias for Tool Result Content; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ToolResultContent } from '@codesoul-co/hypha-tools';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts)

### Declaration

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
