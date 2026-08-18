# `@codesoul-co/hypha-core` / `contracts/artifact-manager`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/artifact-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)
- Exports: **21**

## Using this module

Use the Artifact manager module for declaring and runtime-validating contracts. It exports 17 interfaces, 4 types.

### Import from the package entrypoint

```ts
import type {
  ArtifactCreateDownloadAccessRequest,
  ArtifactCreateRequest,
  ArtifactFromWorkspaceRequest,
  ArtifactGetRecordRequest,
  ArtifactLatestRequest,
  ArtifactListRequest,
  ArtifactManager,
  ArtifactMutationRequest,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 21 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactCreateDownloadAccessRequest` | interface | <code>interface ArtifactCreateDownloadAccessRequest extends ArtifactGetRecordRequest</code> | Artifact Create Download Access Request interface with 7 public fields or methods. |
| `ArtifactCreateRequest` | interface | <code>interface ArtifactCreateRequest</code> | Artifact Create Request interface with 26 public fields or methods. |
| `ArtifactFromWorkspaceRequest` | interface | <code>interface ArtifactFromWorkspaceRequest</code> | Artifact From Workspace Request interface with 22 public fields or methods. |
| `ArtifactGetRecordRequest` | interface | <code>interface ArtifactGetRecordRequest</code> | Artifact Get Record Request interface with 3 public fields or methods. |
| `ArtifactLatestRequest` | interface | <code>interface ArtifactLatestRequest</code> | Artifact Latest Request interface with 2 public fields or methods. |
| `ArtifactListRequest` | interface | <code>interface ArtifactListRequest</code> | Artifact List Request interface with 8 public fields or methods. |
| `ArtifactManager` | interface | <code>interface ArtifactManager</code> | Artifact Manager interface with 16 public fields or methods. |
| `ArtifactMutationRequest` | interface | <code>interface ArtifactMutationRequest</code> | Artifact Mutation Request interface with 6 public fields or methods. |
| `ArtifactPreviousRequest` | interface | <code>interface ArtifactPreviousRequest</code> | Artifact Previous Request interface with 2 public fields or methods. |
| `ArtifactReadRequest` | interface | <code>interface ArtifactReadRequest extends ArtifactGetRecordRequest</code> | Artifact Read Request interface with 5 public fields or methods. |
| `ArtifactReadResult` | interface | <code>interface ArtifactReadResult</code> | Artifact Read Result interface with 2 public fields or methods. |
| `ArtifactTraceLineageRequest` | interface | <code>interface ArtifactTraceLineageRequest</code> | Artifact Trace Lineage Request interface with 2 public fields or methods. |
| `ArtifactVersionRequest` | interface | <code>interface ArtifactVersionRequest</code> | Artifact Version Request interface with 10 public fields or methods. |
| `ArtifactWorkspaceContent` | interface | <code>interface ArtifactWorkspaceContent</code> | Artifact Workspace Content interface with 4 public fields or methods. |
| `ArtifactWorkspaceContentReader` | interface | <code>interface ArtifactWorkspaceContentReader</code> | Governed Workspace port used by ArtifactManager; it never accepts a host path. |
| `ArtifactWorkspaceContentRequest` | interface | <code>interface ArtifactWorkspaceContentRequest</code> | Artifact Workspace Content Request interface with 4 public fields or methods. |
| `NormalizedArtifactError` | interface | <code>interface NormalizedArtifactError</code> | Normalized Artifact Error interface with 5 public fields or methods. |
| `ArtifactArchiveRequest` | type | <code>type ArtifactArchiveRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Archive Request; the declaration contains its complete type expression. |
| `ArtifactDeleteRequest` | type | <code>type ArtifactDeleteRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Delete Request; the declaration contains its complete type expression. |
| `ArtifactFinalizeRequest` | type | <code>type ArtifactFinalizeRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Finalize Request; the declaration contains its complete type expression. |
| `ArtifactInvalidateRequest` | type | <code>type ArtifactInvalidateRequest = ArtifactMutationRequest</code> | Public type alias for Artifact Invalidate Request; the declaration contains its complete type expression. |

## `ArtifactCreateDownloadAccessRequest`

Artifact Create Download Access Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactCreateDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactCreateDownloadAccessRequest extends ArtifactGetRecordRequest {
    operationId: string;
    expiresInSeconds?: number;
    responseMimeType?: string;
    responseFilename?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresInSeconds` | property | <code>expiresInSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `responseFilename` | property | <code>responseFilename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `responseMimeType` | property | <code>responseMimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactCreateRequest`

Artifact Create Request interface with 26 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactCreateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactCreateRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    name: string;
    description?: string;
    relativePath?: string;
    kind: ArtifactKind;
    mimeType?: string;
    encoding?: string;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    logicalArtifactId?: string;
    provenance: ArtifactProvenance;
    access?: ArtifactAccessRecord;
    retention?: ArtifactRetentionRecord;
    sensitive?: boolean;
    tags?: string[];
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `access` | property | <code>access?: ArtifactAccessRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: ArtifactByteSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encoding` | property | <code>encoding?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logicalArtifactId` | property | <code>logicalArtifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retention` | property | <code>retention?: ArtifactRetentionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitive` | property | <code>sensitive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactFromWorkspaceRequest`

Artifact From Workspace Request interface with 22 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactFromWorkspaceRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactFromWorkspaceRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    relativePath: string;
    name?: string;
    kind: ArtifactKind;
    mimeType?: string;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    logicalArtifactId?: string;
    provenance: ArtifactProvenance;
    retention?: ArtifactRetentionRecord;
    sensitive?: boolean;
    tags?: string[];
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logicalArtifactId` | property | <code>logicalArtifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retention` | property | <code>retention?: ArtifactRetentionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitive` | property | <code>sensitive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGetRecordRequest`

Artifact Get Record Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGetRecordRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactGetRecordRequest {
    principal: ExecutionPrincipal;
    artifactId: string;
    versionId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactLatestRequest`

Artifact Latest Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactLatestRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactLatestRequest {
    principal: ExecutionPrincipal;
    logicalArtifactId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactListRequest`

Artifact List Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactListRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactListRequest {
    principal: ExecutionPrincipal;
    workspaceId: string;
    logicalArtifactId?: string;
    kinds?: ArtifactKind[];
    statuses?: ArtifactRecord['status'][];
    tags?: string[];
    includeDeleted?: boolean;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `includeDeleted` | property | <code>includeDeleted?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kinds` | property | <code>kinds?: ArtifactKind[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logicalArtifactId` | property | <code>logicalArtifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statuses` | property | <code>statuses?: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/artifact").ArtifactStatus[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactManager`

Artifact Manager interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactManager } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactManager {
    create(request: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createFromWorkspace(request: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    createVersion(request: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise<ArtifactRecord>;
    get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null>;
    read(request: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise<ArtifactReadResult>;
    createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
    list(request: ArtifactListRequest): Promise<ArtifactRecord[]>;
    finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
    archive(request: ArtifactArchiveRequest): Promise<ArtifactRecord>;
    invalidate(request: ArtifactInvalidateRequest): Promise<ArtifactRecord>;
    delete(request: ArtifactDeleteRequest): Promise<void>;
    traceLineage(request: ArtifactTraceLineageRequest): Promise<ArtifactLineage>;
    latest(request: ArtifactLatestRequest): Promise<ArtifactRecord | null>;
    previous(request: ArtifactPreviousRequest): Promise<ArtifactRecord | null>;
    profile(ref: SpecRef): Promise<ArtifactProfileSpec | null>;
    health(): Promise<Record<string, ProviderHealth>>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archive` | method | <code>archive(request: ArtifactArchiveRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `create` | method | <code>create(request: ArtifactCreateRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createDownloadAccess` | method | <code>createDownloadAccess(request: ArtifactCreateDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createFromWorkspace` | method | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createVersion` | method | <code>createVersion(request: ArtifactVersionRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(request: ArtifactDeleteRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `finalize` | method | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: ArtifactGetRecordRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(request: ArtifactInvalidateRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latest` | method | <code>latest(request: ArtifactLatestRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(request: ArtifactListRequest): Promise&lt;ArtifactRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `previous` | method | <code>previous(request: ArtifactPreviousRequest): Promise&lt;ArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `profile` | method | <code>profile(ref: SpecRef): Promise&lt;ArtifactProfileSpec &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(request: ArtifactReadRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactReadResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `traceLineage` | method | <code>traceLineage(request: ArtifactTraceLineageRequest): Promise&lt;ArtifactLineage&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactMutationRequest`

Artifact Mutation Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactMutationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactMutationRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    artifactId: string;
    expectedRevision: number;
    reason?: string;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactPreviousRequest`

Artifact Previous Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactPreviousRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactPreviousRequest {
    principal: ExecutionPrincipal;
    versionId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactReadRequest`

Artifact Read Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactReadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactReadRequest extends ArtifactGetRecordRequest {
    range?: ArtifactByteRange;
    expectedContentHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `range` | property | <code>range?: ArtifactByteRange</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactReadResult`

Artifact Read Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactReadResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactReadResult {
    record: ArtifactRecord;
    content: ArtifactContent;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactContent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ArtifactRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactTraceLineageRequest`

Artifact Trace Lineage Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactTraceLineageRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactTraceLineageRequest {
    principal: ExecutionPrincipal;
    artifactId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactVersionRequest`

Artifact Version Request interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactVersionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactVersionRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    artifactId: string;
    expectedRevision: number;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    provenance: ArtifactProvenance;
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: ArtifactByteSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactWorkspaceContent`

Artifact Workspace Content interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactWorkspaceContent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactWorkspaceContent {
    content: ArtifactByteSource;
    contentHash?: string;
    sizeBytes?: number;
    mimeType?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactByteSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactWorkspaceContentReader`

Governed Workspace port used by ArtifactManager; it never accepts a host path.

- Kind: interface
- Import: `import type { ArtifactWorkspaceContentReader } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactWorkspaceContentReader {
    read(request: ArtifactWorkspaceContentRequest): Promise<ArtifactWorkspaceContent>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `read` | method | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactWorkspaceContentRequest`

Artifact Workspace Content Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactWorkspaceContentRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface ArtifactWorkspaceContentRequest {
    principal: ExecutionPrincipal;
    workspaceId: string;
    relativePath: string;
    maxBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedArtifactError`

Normalized Artifact Error interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedArtifactError } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export interface NormalizedArtifactError {
    code: 'ARTIFACT_INVALID_INPUT' | 'ARTIFACT_NOT_FOUND' | 'ARTIFACT_PERMISSION_DENIED' | 'ARTIFACT_TOO_LARGE' | 'ARTIFACT_TYPE_DENIED' | 'ARTIFACT_HASH_MISMATCH' | 'ARTIFACT_VERSION_CONFLICT' | 'ARTIFACT_STORE_UNAVAILABLE' | 'ARTIFACT_UPLOAD_FAILED' | 'ARTIFACT_DOWNLOAD_FAILED' | 'ARTIFACT_DELETE_BLOCKED' | 'ARTIFACT_DELETE_PARTIAL' | 'ARTIFACT_VALIDATION_FAILED' | 'ARTIFACT_INTERNAL_ERROR';
    message: string;
    retryable: boolean;
    details?: Record<string, unknown>;
    causeRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: "ARTIFACT_INVALID_INPUT" &#124; "ARTIFACT_NOT_FOUND" &#124; "ARTIFACT_PERMISSION_DENIED" &#124; "ARTIFACT_TOO_LARGE" &#124; "ARTIFACT_TYPE_DENIED" &#124; "ARTIFACT_HASH_MISMATCH" &#124; "ARTIFACT_VERSION_CONFLICT" &#124; "ARTIFACT_STORE_UNAVAILABLE" &#124; "ARTIFACT_UPLOAD_FAILED" &#124; "ARTIFACT_DOWNLOAD_FAILED" &#124; "ARTIFACT_DELETE_BLOCKED" &#124; "ARTIFACT_DELETE_PARTIAL" &#124; "ARTIFACT_VALIDATION_FAILED" &#124; "ARTIFACT_INTERNAL_ERROR"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactArchiveRequest`

Public type alias for Artifact Archive Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactArchiveRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export type ArtifactArchiveRequest = ArtifactMutationRequest;
```

## `ArtifactDeleteRequest`

Public type alias for Artifact Delete Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactDeleteRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export type ArtifactDeleteRequest = ArtifactMutationRequest;
```

## `ArtifactFinalizeRequest`

Public type alias for Artifact Finalize Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactFinalizeRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export type ArtifactFinalizeRequest = ArtifactMutationRequest;
```

## `ArtifactInvalidateRequest`

Public type alias for Artifact Invalidate Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactInvalidateRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-manager.ts)

### Declaration

```text
export type ArtifactInvalidateRequest = ArtifactMutationRequest;
```
