# `@codesoul-co/hypha-core` / `modules/remote-sandbox-provider/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/remote-sandbox-provider/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)
- Exports: **39**

## Using this module

Use the Index module for binding external or local providers to Hypha ports. It exports 1 class, 28 constants, 9 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  RemoteArtifactChunkSequenceValidator,
  remoteArtifactChunkExample,
  remoteArtifactChunkJsonSchema,
  remoteArtifactChunkSchema,
  remoteArtifactChunkSequenceExpectationExample,
  remoteArtifactChunkSequenceExpectationJsonSchema,
  remoteArtifactChunkSequenceExpectationSchema,
  remoteArtifactDownloadRequestExample,
} from '@codesoul-co/hypha-core';

import type {
  RemoteArtifactChunkSequenceProgress,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 9 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 28 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { remoteArtifactChunkSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = remoteArtifactChunkSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RemoteArtifactChunkSequenceValidator` | class | <code>new RemoteArtifactChunkSequenceValidator(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | Validates a remote Artifact transfer incrementally without retaining chunk content. |
| `remoteArtifactChunkExample` | constant | <code>const remoteArtifactChunkExample: RemoteArtifactChunk</code> | Valid example value for Remote Artifact Chunk. |
| `remoteArtifactChunkJsonSchema` | constant | <code>const remoteArtifactChunkJsonSchema: JsonSchema</code> | JSON Schema for Remote Artifact Chunk. |
| `remoteArtifactChunkSchema` | constant | <code>const remoteArtifactChunkSchema: z.ZodEffects&lt;z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sequence: z.ZodNumber; offsetBytes: z.ZodNumber; encoding: z.ZodLiteral&lt;"base64"&gt;; content: z.ZodEffects&lt;z.ZodString, string, string&gt;; byteLength: z.ZodNumber; contentHash: z.ZodString; final: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentHash: string; final: boolean; sequence: number; content: string...</code> | Runtime schema for Remote Artifact Chunk. |
| `remoteArtifactChunkSequenceExpectationExample` | constant | <code>const remoteArtifactChunkSequenceExpectationExample: RemoteArtifactChunkSequenceExpectation</code> | Valid example value for Remote Artifact Chunk Sequence Expectation. |
| `remoteArtifactChunkSequenceExpectationJsonSchema` | constant | <code>const remoteArtifactChunkSequenceExpectationJsonSchema: JsonSchema</code> | JSON Schema for Remote Artifact Chunk Sequence Expectation. |
| `remoteArtifactChunkSequenceExpectationSchema` | constant | <code>const remoteArtifactChunkSequenceExpectationSchema: z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; }, "strict", z.ZodTypeAny, { sizeBytes: number; artifactRef: string; transferId: string; }, { sizeBytes: number; artifactRef: string; transferId: string; }&gt;</code> | Runtime schema for Remote Artifact Chunk Sequence Expectation. |
| `remoteArtifactDownloadRequestExample` | constant | <code>const remoteArtifactDownloadRequestExample: RemoteArtifactDownloadRequest</code> | Valid example value for Remote Artifact Download Request. |
| `remoteArtifactDownloadRequestJsonSchema` | constant | <code>const remoteArtifactDownloadRequestJsonSchema: JsonSchema</code> | JSON Schema for Remote Artifact Download Request. |
| `remoteArtifactDownloadRequestSchema` | constant | <code>const remoteArtifactDownloadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodSt...</code> | Runtime schema for Remote Artifact Download Request. |
| `remoteArtifactTransferReceiptExample` | constant | <code>const remoteArtifactTransferReceiptExample: RemoteArtifactTransferReceipt</code> | Valid example value for Remote Artifact Transfer Receipt. |
| `remoteArtifactTransferReceiptJsonSchema` | constant | <code>const remoteArtifactTransferReceiptJsonSchema: JsonSchema</code> | JSON Schema for Remote Artifact Transfer Receipt. |
| `remoteArtifactTransferReceiptSchema` | constant | <code>const remoteArtifactTransferReceiptSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; providerId: z.ZodString; sandboxId: z.ZodString; artifactRef: z.ZodString; direction: z.ZodEnum&lt;["upload", "download"]&gt;; status: z.ZodEnum&lt;["accepted", "completed", "rejected", "unknown"]&gt;; sizeBytes: z.ZodNumber; contentHash: z.ZodOptional&lt;z.ZodString&gt;; providerTransferRef: z.ZodOptional&lt;z.ZodString&gt;; issuedAt: z.ZodString; rec...</code> | Runtime schema for Remote Artifact Transfer Receipt. |
| `remoteArtifactUploadRequestExample` | constant | <code>const remoteArtifactUploadRequestExample: RemoteArtifactUploadRequest</code> | Valid example value for Remote Artifact Upload Request. |
| `remoteArtifactUploadRequestJsonSchema` | constant | <code>const remoteArtifactUploadRequestJsonSchema: JsonSchema</code> | JSON Schema for Remote Artifact Upload Request. |
| `remoteArtifactUploadRequestSchema` | constant | <code>const remoteArtifactUploadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Runtime schema for Remote Artifact Upload Request. |
| `remoteExecutionReconciliationRequestExample` | constant | <code>const remoteExecutionReconciliationRequestExample: RemoteExecutionReconciliationRequest</code> | Valid example value for Remote Execution Reconciliation Request. |
| `remoteExecutionReconciliationRequestJsonSchema` | constant | <code>const remoteExecutionReconciliationRequestJsonSchema: JsonSchema</code> | JSON Schema for Remote Execution Reconciliation Request. |
| `remoteExecutionReconciliationRequestSchema` | constant | <code>const remoteExecutionReconciliationRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, ...</code> | Runtime schema for Remote Execution Reconciliation Request. |
| `remoteExecutionReconciliationResultExample` | constant | <code>const remoteExecutionReconciliationResultExample: RemoteExecutionReconciliationResult</code> | Valid example value for Remote Execution Reconciliation Result. |
| `remoteExecutionReconciliationResultJsonSchema` | constant | <code>const remoteExecutionReconciliationResultJsonSchema: JsonSchema</code> | JSON Schema for Remote Execution Reconciliation Result. |
| `remoteExecutionReconciliationResultSchema` | constant | <code>const remoteExecutionReconciliationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; sandboxId: z.ZodString; state: z.ZodEnum&lt;["not_found", "accepted", "running", "completed", "failed", "cancelled", "unknown"]&gt;; providerExecutionRef: z.ZodOptional&lt;z.ZodString&gt;; observedAt: z.ZodString; result: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; revision: z.ZodNumber; sandboxId: z.Zo...</code> | Runtime schema for Remote Execution Reconciliation Result. |
| `remoteOutputStreamRequestExample` | constant | <code>const remoteOutputStreamRequestExample: RemoteOutputStreamRequest</code> | Valid example value for Remote Output Stream Request. |
| `remoteOutputStreamRequestJsonSchema` | constant | <code>const remoteOutputStreamRequestJsonSchema: JsonSchema</code> | JSON Schema for Remote Output Stream Request. |
| `remoteOutputStreamRequestSchema` | constant | <code>const remoteOutputStreamRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Runtime schema for Remote Output Stream Request. |
| `remoteSandboxProviderCapabilitiesExample` | constant | <code>const remoteSandboxProviderCapabilitiesExample: RemoteSandboxProviderCapabilities</code> | Valid example value for Remote Sandbox Provider Capabilities. |
| `remoteSandboxProviderCapabilitiesJsonSchema` | constant | <code>const remoteSandboxProviderCapabilitiesJsonSchema: JsonSchema</code> | JSON Schema for Remote Sandbox Provider Capabilities. |
| `remoteSandboxProviderCapabilitiesSchema` | constant | <code>const remoteSandboxProviderCapabilitiesSchema: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; } &amp; { remoteExecution: z.ZodLiteral...</code> | Runtime schema for Remote Sandbox Provider Capabilities. |
| `remoteSandboxProviderContractJsonSchemas` | constant | <code>const remoteSandboxProviderContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Remote Sandbox Provider Contract JSON Schemas constant exported by the `modules/remote-sandbox-provider/index` module. |
| `validateRemoteArtifactChunk` | function | <code>validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk</code> | Validate Remote Artifact Chunk function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteArtifactChunkSequence` | function | <code>validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[]</code> | Validate Remote Artifact Chunk Sequence function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteArtifactDownloadRequest` | function | <code>validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest</code> | Validate Remote Artifact Download Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteArtifactTransferReceipt` | function | <code>validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt</code> | Validate Remote Artifact Transfer Receipt function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteArtifactUploadRequest` | function | <code>validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest</code> | Validate Remote Artifact Upload Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteExecutionReconciliationRequest` | function | <code>validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest</code> | Validate Remote Execution Reconciliation Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteExecutionReconciliationResult` | function | <code>validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult</code> | Validate Remote Execution Reconciliation Result function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteOutputStreamRequest` | function | <code>validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest</code> | Validate Remote Output Stream Request function with 1 public call signature; parameters and return types are listed below. |
| `validateRemoteSandboxProviderCapabilities` | function | <code>validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities</code> | Validate Remote Sandbox Provider Capabilities function with 1 public call signature; parameters and return types are listed below. |
| `RemoteArtifactChunkSequenceProgress` | interface | <code>interface RemoteArtifactChunkSequenceProgress</code> | Remote Artifact Chunk Sequence Progress interface with 3 public fields or methods. |

## `RemoteArtifactChunkSequenceValidator`

Validates a remote Artifact transfer incrementally without retaining chunk content.

- Kind: class
- Import: `import { RemoteArtifactChunkSequenceValidator } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare class RemoteArtifactChunkSequenceValidator {
    constructor(expectationInput: unknown);
    push(input: unknown): RemoteArtifactChunk;
    progress(): RemoteArtifactChunkSequenceProgress;
    finish(): RemoteArtifactChunkSequenceProgress;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | Creates an instance of this class. |
| `finish` | method | <code>finish(): RemoteArtifactChunkSequenceProgress</code> | Public method; parameters and return type are shown in the signature. |
| `progress` | method | <code>progress(): RemoteArtifactChunkSequenceProgress</code> | Public method; parameters and return type are shown in the signature. |
| `push` | method | <code>push(input: unknown): RemoteArtifactChunk</code> | Public method; parameters and return type are shown in the signature. |

## `remoteArtifactChunkExample`

Valid example value for Remote Artifact Chunk.

- Kind: constant
- Import: `import { remoteArtifactChunkExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactChunkExample: RemoteArtifactChunk;
```

## `remoteArtifactChunkJsonSchema`

JSON Schema for Remote Artifact Chunk.

- Kind: constant
- Import: `import { remoteArtifactChunkJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactChunkJsonSchema: JsonSchema;
```

## `remoteArtifactChunkSchema`

Runtime schema for Remote Artifact Chunk.

- Kind: constant
- Import: `import { remoteArtifactChunkSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactChunkSchema: z.ZodEffects<z.ZodObject<{ transferId: z.ZodString; artifactRef: z.ZodString; sequence: z.ZodNumber; offsetBytes: z.ZodNumber; encoding: z.ZodLiteral<"base64">; content: z.ZodEffects<z.ZodString, string, string>; byteLength: z.ZodNumber; contentHash: z.ZodString; final: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }>, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }, { contentHash: string; final: boolean; sequence: number; content: string; encoding: "base64"; artifactRef: string; byteLength: number; transferId: string; offsetBytes: number; }>;
```

## `remoteArtifactChunkSequenceExpectationExample`

Valid example value for Remote Artifact Chunk Sequence Expectation.

- Kind: constant
- Import: `import { remoteArtifactChunkSequenceExpectationExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactChunkSequenceExpectationExample: RemoteArtifactChunkSequenceExpectation;
```

## `remoteArtifactChunkSequenceExpectationJsonSchema`

JSON Schema for Remote Artifact Chunk Sequence Expectation.

- Kind: constant
- Import: `import { remoteArtifactChunkSequenceExpectationJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactChunkSequenceExpectationJsonSchema: JsonSchema;
```

## `remoteArtifactChunkSequenceExpectationSchema`

Runtime schema for Remote Artifact Chunk Sequence Expectation.

- Kind: constant
- Import: `import { remoteArtifactChunkSequenceExpectationSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactChunkSequenceExpectationSchema: z.ZodObject<{ transferId: z.ZodString; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; }, "strict", z.ZodTypeAny, { sizeBytes: number; artifactRef: string; transferId: string; }, { sizeBytes: number; artifactRef: string; transferId: string; }>;
```

## `remoteArtifactDownloadRequestExample`

Valid example value for Remote Artifact Download Request.

- Kind: constant
- Import: `import { remoteArtifactDownloadRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactDownloadRequestExample: RemoteArtifactDownloadRequest;
```

## `remoteArtifactDownloadRequestJsonSchema`

JSON Schema for Remote Artifact Download Request.

- Kind: constant
- Import: `import { remoteArtifactDownloadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactDownloadRequestJsonSchema: JsonSchema;
```

## `remoteArtifactDownloadRequestSchema`

Runtime schema for Remote Artifact Download Request.

- Kind: constant
- Import: `import { remoteArtifactDownloadRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactDownloadRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; artifactRef: z.ZodString; maxBytes: z.ZodNumber; expectedContentHash: z.ZodOptional<z.ZodString>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; maxBytes: number; artifactRef: string; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; expectedContentHash?: string | undefined; }, { operationId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; maxBytes: number; artifactRef: string; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; expectedContentHash?: string | undefined; }>;
```

## `remoteArtifactTransferReceiptExample`

Valid example value for Remote Artifact Transfer Receipt.

- Kind: constant
- Import: `import { remoteArtifactTransferReceiptExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactTransferReceiptExample: RemoteArtifactTransferReceipt;
```

## `remoteArtifactTransferReceiptJsonSchema`

JSON Schema for Remote Artifact Transfer Receipt.

- Kind: constant
- Import: `import { remoteArtifactTransferReceiptJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactTransferReceiptJsonSchema: JsonSchema;
```

## `remoteArtifactTransferReceiptSchema`

Runtime schema for Remote Artifact Transfer Receipt.

- Kind: constant
- Import: `import { remoteArtifactTransferReceiptSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactTransferReceiptSchema: z.ZodEffects<z.ZodObject<{ id: z.ZodString; providerId: z.ZodString; sandboxId: z.ZodString; artifactRef: z.ZodString; direction: z.ZodEnum<["upload", "download"]>; status: z.ZodEnum<["accepted", "completed", "rejected", "unknown"]>; sizeBytes: z.ZodNumber; contentHash: z.ZodOptional<z.ZodString>; providerTransferRef: z.ZodOptional<z.ZodString>; issuedAt: z.ZodString; receiptHash: z.ZodString; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }>, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }, { status: "unknown" | "completed" | "rejected" | "accepted"; id: string; sizeBytes: number; sandboxId: string; providerId: string; issuedAt: string; receiptHash: string; artifactRef: string; direction: "upload" | "download"; contentHash?: string | undefined; metadata?: Record<string, unknown> | undefined; providerTransferRef?: string | undefined; }>;
```

## `remoteArtifactUploadRequestExample`

Valid example value for Remote Artifact Upload Request.

- Kind: constant
- Import: `import { remoteArtifactUploadRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactUploadRequestExample: RemoteArtifactUploadRequest;
```

## `remoteArtifactUploadRequestJsonSchema`

JSON Schema for Remote Artifact Upload Request.

- Kind: constant
- Import: `import { remoteArtifactUploadRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactUploadRequestJsonSchema: JsonSchema;
```

## `remoteArtifactUploadRequestSchema`

Runtime schema for Remote Artifact Upload Request.

- Kind: constant
- Import: `import { remoteArtifactUploadRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteArtifactUploadRequestSchema: z.ZodObject<{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; expectedSandboxRevision: z.ZodNumber; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; contentHash: z.ZodString; mediaType: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { operationId: string; contentHash: string; sizeBytes: number; idempotencyKey: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; artifactRef: string; expectedSandboxRevision: number; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; mediaType?: string | undefined; }, { operationId: string; contentHash: string; sizeBytes: number; idempotencyKey: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; artifactRef: string; expectedSandboxRevision: number; metadata?: Record<string, unknown> | undefined; correlationId?: string | undefined; causationId?: string | undefined; mediaType?: string | undefined; }>;
```

## `remoteExecutionReconciliationRequestExample`

Valid example value for Remote Execution Reconciliation Request.

- Kind: constant
- Import: `import { remoteExecutionReconciliationRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteExecutionReconciliationRequestExample: RemoteExecutionReconciliationRequest;
```

## `remoteExecutionReconciliationRequestJsonSchema`

JSON Schema for Remote Execution Reconciliation Request.

- Kind: constant
- Import: `import { remoteExecutionReconciliationRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteExecutionReconciliationRequestJsonSchema: JsonSchema;
```

## `remoteExecutionReconciliationRequestSchema`

Runtime schema for Remote Execution Reconciliation Request.

- Kind: constant
- Import: `import { remoteExecutionReconciliationRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteExecutionReconciliationRequestSchema: z.ZodEffects<z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; providerExecutionRef: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodOptional<z.ZodString>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }>, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }, { operationId: string; executionId: string; sandboxId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; idempotencyKey?: string | undefined; providerExecutionRef?: string | undefined; }>;
```

## `remoteExecutionReconciliationResultExample`

Valid example value for Remote Execution Reconciliation Result.

- Kind: constant
- Import: `import { remoteExecutionReconciliationResultExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteExecutionReconciliationResultExample: RemoteExecutionReconciliationResult;
```

## `remoteExecutionReconciliationResultJsonSchema`

JSON Schema for Remote Execution Reconciliation Result.

- Kind: constant
- Import: `import { remoteExecutionReconciliationResultJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteExecutionReconciliationResultJsonSchema: JsonSchema;
```

## `remoteExecutionReconciliationResultSchema`

Runtime schema for Remote Execution Reconciliation Result.

- Kind: constant
- Import: `import { remoteExecutionReconciliationResultSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const remoteExecutionReconciliationResultSchema: (typeof import('@codesoul-co/hypha-core'))['remoteExecutionReconciliationResultSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `remoteOutputStreamRequestExample`

Valid example value for Remote Output Stream Request.

- Kind: constant
- Import: `import { remoteOutputStreamRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteOutputStreamRequestExample: RemoteOutputStreamRequest;
```

## `remoteOutputStreamRequestJsonSchema`

JSON Schema for Remote Output Stream Request.

- Kind: constant
- Import: `import { remoteOutputStreamRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteOutputStreamRequestJsonSchema: JsonSchema;
```

## `remoteOutputStreamRequestSchema`

Runtime schema for Remote Output Stream Request.

- Kind: constant
- Import: `import { remoteOutputStreamRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteOutputStreamRequestSchema: z.ZodObject<{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject<{ principalId: z.ZodString; type: z.ZodEnum<["user", "agent", "service", "system"]>; tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; permissionScopes: z.ZodArray<z.ZodString, "many">; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }, { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }>; fromSequence: z.ZodOptional<z.ZodNumber>; maxChunks: z.ZodOptional<z.ZodNumber>; follow: z.ZodOptional<z.ZodBoolean>; correlationId: z.ZodOptional<z.ZodString>; causationId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; fromSequence?: number | undefined; maxChunks?: number | undefined; follow?: boolean | undefined; }, { operationId: string; executionId: string; principal: { type: "user" | "agent" | "service" | "system"; principalId: string; permissionScopes: string[]; metadata?: Record<string, unknown> | undefined; agentId?: string | undefined; tenantId?: string | undefined; userId?: string | undefined; roles?: string[] | undefined; }; correlationId?: string | undefined; causationId?: string | undefined; fromSequence?: number | undefined; maxChunks?: number | undefined; follow?: boolean | undefined; }>;
```

## `remoteSandboxProviderCapabilitiesExample`

Valid example value for Remote Sandbox Provider Capabilities.

- Kind: constant
- Import: `import { remoteSandboxProviderCapabilitiesExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteSandboxProviderCapabilitiesExample: RemoteSandboxProviderCapabilities;
```

## `remoteSandboxProviderCapabilitiesJsonSchema`

JSON Schema for Remote Sandbox Provider Capabilities.

- Kind: constant
- Import: `import { remoteSandboxProviderCapabilitiesJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteSandboxProviderCapabilitiesJsonSchema: JsonSchema;
```

## `remoteSandboxProviderCapabilitiesSchema`

Runtime schema for Remote Sandbox Provider Capabilities.

- Kind: constant
- Import: `import { remoteSandboxProviderCapabilitiesSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteSandboxProviderCapabilitiesSchema: z.ZodObject<{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; } & { remoteExecution: z.ZodLiteral<true>; }, "strict", z.ZodTypeAny, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: true; }, { processIsolation: boolean; filesystemIsolation: boolean; networkIsolation: boolean; cpuLimits: boolean; memoryLimits: boolean; diskLimits: boolean; pidsLimit: boolean; cancellation: boolean; processTreeKill: boolean; snapshots: boolean; imageDigestPinning: boolean; remoteExecution: true; }>;
```

## `remoteSandboxProviderContractJsonSchemas`

Remote Sandbox Provider Contract JSON Schemas constant exported by the `modules/remote-sandbox-provider/index` module.

- Kind: constant
- Import: `import { remoteSandboxProviderContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare const remoteSandboxProviderContractJsonSchemas: Record<string, JsonSchema>;
```

## `validateRemoteArtifactChunk`

Validate Remote Artifact Chunk function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteArtifactChunk } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk;
```

### Call signature

```text
validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteArtifactChunk`
- Description: The return contract is defined by the type shown above.

## `validateRemoteArtifactChunkSequence`

Validate Remote Artifact Chunk Sequence function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteArtifactChunkSequence } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[];
```

### Call signature

```text
validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>readonly unknown[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expectationInput` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteArtifactChunk[]`
- Description: The return contract is defined by the type shown above.

## `validateRemoteArtifactDownloadRequest`

Validate Remote Artifact Download Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteArtifactDownloadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest;
```

### Call signature

```text
validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteArtifactDownloadRequest`
- Description: The return contract is defined by the type shown above.

## `validateRemoteArtifactTransferReceipt`

Validate Remote Artifact Transfer Receipt function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteArtifactTransferReceipt } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt;
```

### Call signature

```text
validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteArtifactTransferReceipt`
- Description: The return contract is defined by the type shown above.

## `validateRemoteArtifactUploadRequest`

Validate Remote Artifact Upload Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteArtifactUploadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest;
```

### Call signature

```text
validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteArtifactUploadRequest`
- Description: The return contract is defined by the type shown above.

## `validateRemoteExecutionReconciliationRequest`

Validate Remote Execution Reconciliation Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteExecutionReconciliationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest;
```

### Call signature

```text
validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteExecutionReconciliationRequest`
- Description: The return contract is defined by the type shown above.

## `validateRemoteExecutionReconciliationResult`

Validate Remote Execution Reconciliation Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteExecutionReconciliationResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult;
```

### Call signature

```text
validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteExecutionReconciliationResult`
- Description: The return contract is defined by the type shown above.

## `validateRemoteOutputStreamRequest`

Validate Remote Output Stream Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteOutputStreamRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest;
```

### Call signature

```text
validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteOutputStreamRequest`
- Description: The return contract is defined by the type shown above.

## `validateRemoteSandboxProviderCapabilities`

Validate Remote Sandbox Provider Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateRemoteSandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export declare function validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities;
```

### Call signature

```text
validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RemoteSandboxProviderCapabilities`
- Description: The return contract is defined by the type shown above.

## `RemoteArtifactChunkSequenceProgress`

Remote Artifact Chunk Sequence Progress interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RemoteArtifactChunkSequenceProgress } from '@codesoul-co/hypha-core';`
- Source module: [`modules/remote-sandbox-provider/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)

### Declaration

```text
export interface RemoteArtifactChunkSequenceProgress {
    chunksValidated: number;
    bytesValidated: number;
    completed: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bytesValidated` | property | <code>bytesValidated: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `chunksValidated` | property | <code>chunksValidated: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completed` | property | <code>completed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
