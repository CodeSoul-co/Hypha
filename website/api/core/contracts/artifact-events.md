# `@codesoul-co/hypha-core` / `contracts/artifact-events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/artifact-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)
- Exports: **7**

## Using this module

Use the Artifact events module for declaring and runtime-validating contracts. It exports 2 interfaces, 5 types.

### Import from the package entrypoint

```ts
import type {
  ArtifactEventPayload,
  ArtifactEventPublisher,
  ArtifactEventCreateInput,
  ArtifactEventPayloadMap,
  ArtifactEventPublication,
  ArtifactFrameworkEvent,
  ArtifactFrameworkEventType,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactEventPayload` | interface | <code>interface ArtifactEventPayload</code> | Artifact Event Payload interface with 19 public fields or methods. |
| `ArtifactEventPublisher` | interface | <code>interface ArtifactEventPublisher</code> | Runtime-owned adapters must durably and idempotently publish by publication ID. |
| `ArtifactEventCreateInput` | type | <code>type ArtifactEventCreateInput = Omit&lt;EventCreateInput&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Artifact Event Create Input; the declaration contains its complete type expression. |
| `ArtifactEventPayloadMap` | type | <code>type ArtifactEventPayloadMap = { 'artifact.create.requested': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'workspaceId' &#124; 'profileRef'&gt;; 'artifact.created': ArtifactStatusEventPayload&lt;'draft'&gt; &amp; ArtifactEventPayloadWithRequired&lt;'logicalArtifactId' &#124; 'contentHash'&gt;; 'artifact.deduplicated': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'artifactId' &#124; 'versionId' &#124; 'contentHash' &#124; 'deduplicated'&gt; &amp; { dedupli...</code> | Public type alias for Artifact Event Payload Map; the declaration contains its complete type expression. |
| `ArtifactEventPublication` | type | <code>type ArtifactEventPublication = { id: string; type: TType; timestamp: string; payload: ArtifactEventPayloadMap[TType]; workspaceId?: string; sessionId?: string; runId?: string; agentId?: string; }</code> | Public type alias for Artifact Event Publication; the declaration contains its complete type expression. |
| `ArtifactFrameworkEvent` | type | <code>type ArtifactFrameworkEvent = Omit&lt;FrameworkEvent&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Public type alias for Artifact Framework Event; the declaration contains its complete type expression. |
| `ArtifactFrameworkEventType` | type | <code>type ArtifactFrameworkEventType = 'artifact.create.requested' &#124; 'artifact.created' &#124; 'artifact.deduplicated' &#124; 'artifact.create.failed' &#124; 'artifact.read.requested' &#124; 'artifact.read.completed' &#124; 'artifact.version.created' &#124; 'artifact.finalized' &#124; 'artifact.archived' &#124; 'artifact.invalidated' &#124; 'artifact.delete.requested' &#124; 'artifact.delete.blocked' &#124; 'artifact.deleted' &#124; 'artifact.delete.failed' &#124; 'artifact.lineage....</code> | Public type alias for Artifact Framework Event Type; the declaration contains its complete type expression. |

## `ArtifactEventPayload`

Artifact Event Payload interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactEventPayload } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### Declaration

```text
export interface ArtifactEventPayload {
    operationId?: string;
    artifactId?: string;
    versionId?: string;
    logicalArtifactId?: string;
    profileRef?: SpecRef;
    workspaceId?: string;
    executionId?: string;
    artifactRefs?: string[];
    contentHash?: string;
    sizeBytes?: number;
    status?: ArtifactStatus;
    deduplicated?: boolean;
    candidateObjects?: number;
    deletedObjects?: number;
    missingObjects?: number;
    reclaimedBytes?: number;
    reason?: string;
    error?: NormalizedArtifactError;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `candidateObjects` | property | <code>candidateObjects?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deduplicated` | property | <code>deduplicated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deletedObjects` | property | <code>deletedObjects?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedArtifactError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `logicalArtifactId` | property | <code>logicalArtifactId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missingObjects` | property | <code>missingObjects?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reclaimedBytes` | property | <code>reclaimedBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: ArtifactStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactEventPublisher`

Runtime-owned adapters must durably and idempotently publish by publication ID.

- Kind: interface
- Import: `import type { ArtifactEventPublisher } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### Declaration

```text
export interface ArtifactEventPublisher {
    publish(publication: ArtifactEventPublication): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `publish` | method | <code>publish(publication: ArtifactEventPublication): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactEventCreateInput`

Public type alias for Artifact Event Create Input; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactEventCreateInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### Declaration

```text
export type ArtifactEventCreateInput<TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType> = Omit<EventCreateInput<ArtifactEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ArtifactEventPayloadMap`

Public type alias for Artifact Event Payload Map; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactEventPayloadMap } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### Declaration

```text
export type ArtifactEventPayloadMap = {
    'artifact.create.requested': ArtifactEventPayloadWithRequired<'operationId' | 'workspaceId' | 'profileRef'>;
    'artifact.created': ArtifactStatusEventPayload<'draft'> & ArtifactEventPayloadWithRequired<'logicalArtifactId' | 'contentHash'>;
    'artifact.deduplicated': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'versionId' | 'contentHash' | 'deduplicated'> & {
        deduplicated: true;
    };
    'artifact.create.failed': ArtifactEventPayloadWithRequired<'operationId' | 'error'>;
    'artifact.read.requested': ArtifactEventPayloadWithRequired<'artifactId'>;
    'artifact.read.completed': ArtifactEventPayloadWithRequired<'artifactId' | 'versionId' | 'contentHash' | 'sizeBytes'>;
    'artifact.version.created': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'versionId' | 'logicalArtifactId' | 'contentHash' | 'status'>;
    'artifact.finalized': ArtifactStatusEventPayload<'final'>;
    'artifact.archived': ArtifactStatusEventPayload<'archived'>;
    'artifact.invalidated': ArtifactStatusEventPayload<'invalidated'>;
    'artifact.delete.requested': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId'>;
    'artifact.delete.blocked': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'error'>;
    'artifact.deleted': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'status'> & {
        status: 'deleted';
    };
    'artifact.delete.failed': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'error'>;
    'artifact.lineage.recorded': ArtifactEventPayloadWithRequired<'artifactId' | 'artifactRefs'>;
    'artifact.retention.expired': ArtifactEventPayloadWithRequired<'artifactId' | 'versionId'>;
    'artifact.gc.completed': ArtifactEventPayloadWithRequired<'operationId' | 'candidateObjects' | 'deletedObjects' | 'missingObjects' | 'reclaimedBytes'>;
    'artifact.gc.failed': ArtifactEventPayloadWithRequired<'operationId' | 'error'>;
};
```

## `ArtifactEventPublication`

Public type alias for Artifact Event Publication; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactEventPublication } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### Declaration

```text
export type ArtifactEventPublication<TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType> = {
    id: string;
    type: TType;
    timestamp: string;
    payload: ArtifactEventPayloadMap[TType];
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
};
```

## `ArtifactFrameworkEvent`

Public type alias for Artifact Framework Event; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### Declaration

```text
export type ArtifactFrameworkEvent<TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType> = Omit<FrameworkEvent<ArtifactEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ArtifactFrameworkEventType`

Public type alias for Artifact Framework Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactFrameworkEventType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### Declaration

```text
export type ArtifactFrameworkEventType = 'artifact.create.requested' | 'artifact.created' | 'artifact.deduplicated' | 'artifact.create.failed' | 'artifact.read.requested' | 'artifact.read.completed' | 'artifact.version.created' | 'artifact.finalized' | 'artifact.archived' | 'artifact.invalidated' | 'artifact.delete.requested' | 'artifact.delete.blocked' | 'artifact.deleted' | 'artifact.delete.failed' | 'artifact.lineage.recorded' | 'artifact.retention.expired' | 'artifact.gc.completed' | 'artifact.gc.failed';
```
