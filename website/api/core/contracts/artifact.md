# `@codesoul-co/hypha-core` / `contracts/artifact`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/artifact.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)
- Exports: **18**

## Using this module

Use the Artifact module for declaring and runtime-validating contracts. It exports 15 interfaces, 3 types.

### Import from the package entrypoint

```ts
import type {
  ArtifactAccessPolicySpec,
  ArtifactAccessRecord,
  ArtifactContentAddressingSpec,
  ArtifactLineage,
  ArtifactLineageNode,
  ArtifactPreviewPolicySpec,
  ArtifactProfileSpec,
  ArtifactProvenance,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 18 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactAccessPolicySpec` | interface | <code>interface ArtifactAccessPolicySpec</code> | Artifact Access Policy Spec interface with 8 public fields or methods. |
| `ArtifactAccessRecord` | interface | <code>interface ArtifactAccessRecord</code> | Artifact Access Record interface with 5 public fields or methods. |
| `ArtifactContentAddressingSpec` | interface | <code>interface ArtifactContentAddressingSpec</code> | Artifact Content Addressing Spec interface with 3 public fields or methods. |
| `ArtifactLineage` | interface | <code>interface ArtifactLineage</code> | Artifact Lineage interface with 4 public fields or methods. |
| `ArtifactLineageNode` | interface | <code>interface ArtifactLineageNode</code> | Artifact Lineage Node interface with 6 public fields or methods. |
| `ArtifactPreviewPolicySpec` | interface | <code>interface ArtifactPreviewPolicySpec</code> | Artifact Preview Policy Spec interface with 3 public fields or methods. |
| `ArtifactProfileSpec` | interface | <code>interface ArtifactProfileSpec extends VersionedSpec</code> | Artifact Profile Spec interface with 15 public fields or methods. |
| `ArtifactProvenance` | interface | <code>interface ArtifactProvenance</code> | Artifact Provenance interface with 11 public fields or methods. |
| `ArtifactRecord` | interface | <code>interface ArtifactRecord</code> | Artifact Record interface with 41 public fields or methods. |
| `ArtifactRef` | interface | <code>interface ArtifactRef</code> | Artifact Ref interface with 7 public fields or methods. |
| `ArtifactRetentionPolicySpec` | interface | <code>interface ArtifactRetentionPolicySpec</code> | Artifact Retention Policy Spec interface with 7 public fields or methods. |
| `ArtifactRetentionRecord` | interface | <code>interface ArtifactRetentionRecord</code> | Artifact Retention Record interface with 5 public fields or methods. |
| `ArtifactStorageRef` | interface | <code>interface ArtifactStorageRef</code> | Artifact Storage Ref interface with 7 public fields or methods. |
| `ArtifactValidationPolicySpec` | interface | <code>interface ArtifactValidationPolicySpec</code> | Artifact Validation Policy Spec interface with 7 public fields or methods. |
| `ArtifactVersioningPolicySpec` | interface | <code>interface ArtifactVersioningPolicySpec</code> | Artifact Versioning Policy Spec interface with 3 public fields or methods. |
| `ArtifactHashAlgorithm` | type | <code>type ArtifactHashAlgorithm = 'sha256' &#124; 'blake3'</code> | Public type alias for Artifact Hash Algorithm; the declaration contains its complete type expression. |
| `ArtifactKind` | type | <code>type ArtifactKind = 'document' &#124; 'code' &#124; 'dataset' &#124; 'image' &#124; 'audio' &#124; 'video' &#124; 'table' &#124; 'report' &#124; 'archive' &#124; 'patch' &#124; 'snapshot' &#124; 'test_report' &#124; 'build_output' &#124; 'log' &#124; 'tool_output' &#124; 'execution_receipt' &#124; 'other'</code> | Public type alias for Artifact Kind; the declaration contains its complete type expression. |
| `ArtifactStatus` | type | <code>type ArtifactStatus = 'creating' &#124; 'draft' &#124; 'final' &#124; 'archived' &#124; 'invalidated' &#124; 'deletion_pending' &#124; 'deleted' &#124; 'failed'</code> | Public type alias for Artifact Status; the declaration contains its complete type expression. |

## `ArtifactAccessPolicySpec`

Artifact Access Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactAccessPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactAccessPolicySpec {
    defaultVisibility: 'private' | 'session' | 'workspace' | 'tenant' | 'shared';
    allowedPrincipalTypes?: ExecutionPrincipal['type'][];
    requiredReadScopes?: string[];
    requiredWriteScopes?: string[];
    requiredDeleteScopes?: string[];
    signedUrlTtlSeconds?: number;
    allowRangeRead?: boolean;
    allowCrossWorkspaceCopy?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCrossWorkspaceCopy` | property | <code>allowCrossWorkspaceCopy?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedPrincipalTypes` | property | <code>allowedPrincipalTypes?: ("system" &#124; "agent" &#124; "user" &#124; "service")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowRangeRead` | property | <code>allowRangeRead?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultVisibility` | property | <code>defaultVisibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredDeleteScopes` | property | <code>requiredDeleteScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredReadScopes` | property | <code>requiredReadScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredWriteScopes` | property | <code>requiredWriteScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signedUrlTtlSeconds` | property | <code>signedUrlTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactAccessRecord`

Artifact Access Record interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactAccessRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactAccessRecord {
    visibility: ArtifactAccessPolicySpec['defaultVisibility'];
    ownerPrincipalId: string;
    workspaceId: string;
    allowedPrincipalIds?: string[];
    allowedRoles?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedPrincipalIds` | property | <code>allowedPrincipalIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedRoles` | property | <code>allowedRoles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerPrincipalId` | property | <code>ownerPrincipalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `visibility` | property | <code>visibility: "workspace" &#124; "session" &#124; "private" &#124; "shared" &#124; "tenant"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactContentAddressingSpec`

Artifact Content Addressing Spec interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactContentAddressingSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactContentAddressingSpec {
    hashAlgorithm: ArtifactHashAlgorithm;
    verifyOnRead: boolean;
    deduplicate: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deduplicate` | property | <code>deduplicate: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hashAlgorithm` | property | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifyOnRead` | property | <code>verifyOnRead: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactLineage`

Artifact Lineage interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactLineage } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactLineage {
    artifactId: string;
    ancestors: ArtifactLineageNode[];
    descendants: ArtifactLineageNode[];
    versions: ArtifactRecord[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ancestors` | property | <code>ancestors: ArtifactLineageNode[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `descendants` | property | <code>descendants: ArtifactLineageNode[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versions` | property | <code>versions: ArtifactRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactLineageNode`

Artifact Lineage Node interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactLineageNode } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactLineageNode {
    artifactId: string;
    versionId: string;
    logicalArtifactId: string;
    contentHash: string;
    kind?: ArtifactKind;
    transformation?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: ArtifactKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transformation` | property | <code>transformation?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactPreviewPolicySpec`

Artifact Preview Policy Spec interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactPreviewPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactPreviewPolicySpec {
    enabled: boolean;
    maxPreviewBytes?: number;
    allowedMimeTypes?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMimeTypes` | property | <code>allowedMimeTypes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enabled` | property | <code>enabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPreviewBytes` | property | <code>maxPreviewBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactProfileSpec`

Artifact Profile Spec interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactProfileSpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactProfileSpec extends VersionedSpec {
    revision?: string;
    name?: string;
    storeRef: SpecRef;
    contentAddressing: ArtifactContentAddressingSpec;
    versioning: ArtifactVersioningPolicySpec;
    access: ArtifactAccessPolicySpec;
    retention: ArtifactRetentionPolicySpec;
    validation?: ArtifactValidationPolicySpec;
    preview?: ArtifactPreviewPolicySpec;
    allowedKinds?: ArtifactKind[];
    allowedMimeTypes?: string[];
    maxArtifactBytes?: number;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `access` | property | <code>access: ArtifactAccessPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedKinds` | property | <code>allowedKinds?: ArtifactKind[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedMimeTypes` | property | <code>allowedMimeTypes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentAddressing` | property | <code>contentAddressing: ArtifactContentAddressingSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxArtifactBytes` | property | <code>maxArtifactBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preview` | property | <code>preview?: ArtifactPreviewPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retention` | property | <code>retention: ArtifactRetentionPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storeRef` | property | <code>storeRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validation` | property | <code>validation?: ArtifactValidationPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versioning` | property | <code>versioning: ArtifactVersioningPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactProvenance`

Artifact Provenance interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactProvenance } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactProvenance {
    sourceType: 'user_upload' | 'agent_generated' | 'tool_generated' | 'command_generated' | 'derived' | 'imported' | 'snapshot' | 'patch';
    createdBy: string;
    sourceEventId?: string;
    toolInvocationId?: string;
    executionId?: string;
    workflowState?: string;
    sourceArtifactIds?: string[];
    transformation?: string;
    environmentHash?: string;
    commandHash?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandHash` | property | <code>commandHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdBy` | property | <code>createdBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentHash` | property | <code>environmentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceArtifactIds` | property | <code>sourceArtifactIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceEventId` | property | <code>sourceEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceType` | property | <code>sourceType: "patch" &#124; "snapshot" &#124; "user_upload" &#124; "agent_generated" &#124; "tool_generated" &#124; "command_generated" &#124; "derived" &#124; "imported"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolInvocationId` | property | <code>toolInvocationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transformation` | property | <code>transformation?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowState` | property | <code>workflowState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRecord`

Artifact Record interface with 41 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactRecord {
    id: string;
    versionId: string;
    versionNumber: number;
    revision: number;
    tenantId?: string;
    userId: string;
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
    sizeBytes: number;
    contentHash: string;
    hashAlgorithm: ArtifactHashAlgorithm;
    storageRef: ArtifactStorageRef;
    /** True when this version reused an already committed content-addressed Blob. */
    deduplicated?: boolean;
    logicalArtifactId: string;
    parentVersionId?: string;
    previousVersionId?: string;
    nextVersionId?: string;
    sourceArtifactIds?: string[];
    derivedArtifactIds?: string[];
    provenance: ArtifactProvenance;
    access: ArtifactAccessRecord;
    retention: ArtifactRetentionRecord;
    status: ArtifactStatus;
    immutable?: boolean;
    sensitive?: boolean;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    finalizedAt?: string;
    archivedAt?: string;
    expiresAt?: string;
    deletedAt?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `access` | property | <code>access: ArtifactAccessRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `archivedAt` | property | <code>archivedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deduplicated` | property | <code>deduplicated?: boolean</code> | True when this version reused an already committed content-addressed Blob. |
| `deletedAt` | property | <code>deletedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `derivedArtifactIds` | property | <code>derivedArtifactIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encoding` | property | <code>encoding?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalizedAt` | property | <code>finalizedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hashAlgorithm` | property | <code>hashAlgorithm: ArtifactHashAlgorithm</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `immutable` | property | <code>immutable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logicalArtifactId` | property | <code>logicalArtifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextVersionId` | property | <code>nextVersionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentVersionId` | property | <code>parentVersionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousVersionId` | property | <code>previousVersionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: ArtifactProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retention` | property | <code>retention: ArtifactRetentionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitive` | property | <code>sensitive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceArtifactIds` | property | <code>sourceArtifactIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: ArtifactStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionNumber` | property | <code>versionNumber: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRef`

Artifact Ref interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRef } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactRef {
    artifactId: string;
    versionId?: string;
    contentHash: string;
    kind?: ArtifactKind;
    mimeType?: string;
    sizeBytes?: number;
    accessTokenRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessTokenRef` | property | <code>accessTokenRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: ArtifactKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRetentionPolicySpec`

Artifact Retention Policy Spec interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactRetentionPolicySpec {
    defaultTtlSeconds?: number;
    archiveAfterSeconds?: number;
    deleteAfterSeconds?: number;
    retainFinal?: boolean;
    retainOnFailure?: boolean;
    legalHoldSupported?: boolean;
    garbageCollectUnreferenced?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveAfterSeconds` | property | <code>archiveAfterSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deleteAfterSeconds` | property | <code>deleteAfterSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `garbageCollectUnreferenced` | property | <code>garbageCollectUnreferenced?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legalHoldSupported` | property | <code>legalHoldSupported?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainFinal` | property | <code>retainFinal?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainOnFailure` | property | <code>retainOnFailure?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRetentionRecord`

Artifact Retention Record interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactRetentionRecord {
    policyRef?: SpecRef;
    expiresAt?: string;
    archivedAt?: string;
    legalHold?: boolean;
    referencedByCount?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archivedAt` | property | <code>archivedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legalHold` | property | <code>legalHold?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRef` | property | <code>policyRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `referencedByCount` | property | <code>referencedByCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactStorageRef`

Artifact Storage Ref interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactStorageRef } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactStorageRef {
    storeId: string;
    bucketOrNamespace?: string;
    objectKey: string;
    versionId?: string;
    etag?: string;
    region?: string;
    encrypted?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bucketOrNamespace` | property | <code>bucketOrNamespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encrypted` | property | <code>encrypted?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `etag` | property | <code>etag?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `objectKey` | property | <code>objectKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `region` | property | <code>region?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storeId` | property | <code>storeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactValidationPolicySpec`

Artifact Validation Policy Spec interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactValidationPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactValidationPolicySpec {
    verifyMimeType?: boolean;
    verifyExtension?: boolean;
    malwareScanRef?: SpecRef;
    archiveBombProtection?: boolean;
    maxExpandedBytes?: number;
    checksumRequired?: boolean;
    rejectExecutableUploads?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `archiveBombProtection` | property | <code>archiveBombProtection?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checksumRequired` | property | <code>checksumRequired?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `malwareScanRef` | property | <code>malwareScanRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxExpandedBytes` | property | <code>maxExpandedBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectExecutableUploads` | property | <code>rejectExecutableUploads?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifyExtension` | property | <code>verifyExtension?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifyMimeType` | property | <code>verifyMimeType?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactVersioningPolicySpec`

Artifact Versioning Policy Spec interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactVersioningPolicySpec } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export interface ArtifactVersioningPolicySpec {
    /** E4 guarantees immutable history; replacement semantics are deliberately unsupported. */
    strategy: 'append_only';
    retainPreviousVersions: true;
    maxVersions?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxVersions` | property | <code>maxVersions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainPreviousVersions` | property | <code>retainPreviousVersions: true</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategy` | property | <code>strategy: "append_only"</code> | E4 guarantees immutable history; replacement semantics are deliberately unsupported. |

## `ArtifactHashAlgorithm`

Public type alias for Artifact Hash Algorithm; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactHashAlgorithm } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export type ArtifactHashAlgorithm = 'sha256' | 'blake3';
```

## `ArtifactKind`

Public type alias for Artifact Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export type ArtifactKind = 'document' | 'code' | 'dataset' | 'image' | 'audio' | 'video' | 'table' | 'report' | 'archive' | 'patch' | 'snapshot' | 'test_report' | 'build_output' | 'log' | 'tool_output' | 'execution_receipt' | 'other';
```

## `ArtifactStatus`

Public type alias for Artifact Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact.ts)

### Declaration

```text
export type ArtifactStatus = 'creating' | 'draft' | 'final' | 'archived' | 'invalidated' | 'deletion_pending' | 'deleted' | 'failed';
```
