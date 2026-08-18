# `@codesoul-co/hypha-memory` / `context-artifacts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/context-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryContextArtifactStore` | class | <code>new InMemoryContextArtifactStore(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | Runtime implementation for In Memory Context Artifact Store; see its public constructor and members below. |
| `ProviderBackedContextArtifactStore` | class | <code>new ProviderBackedContextArtifactStore(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | Runtime implementation for Provider Backed Context Artifact Store; see its public constructor and members below. |
| `contextArtifactContentHash` | function | <code>contextArtifactContentHash(content: string): string</code> | Public runtime operation for context Artifact Content Hash. |
| `validateContextArtifactReference` | function | <code>validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void</code> | Validates Context Artifact Reference at this module boundary. |
| `ContextArtifactReadExpectation` | interface | <code>interface ContextArtifactReadExpectation</code> | Field contract for Context Artifact Read Expectation; see all contract members below. |
| `ContextArtifactRecord` | interface | <code>interface ContextArtifactRecord</code> | Field contract for Context Artifact Record; see all contract members below. |
| `ContextArtifactRef` | interface | <code>interface ContextArtifactRef</code> | Field contract for Context Artifact Ref; see all contract members below. |
| `ContextArtifactStore` | interface | <code>interface ContextArtifactStore</code> | Field contract for Context Artifact Store; see all contract members below. |
| `ContextArtifactWriteRequest` | interface | <code>interface ContextArtifactWriteRequest</code> | Field contract for Context Artifact Write Request; see all contract members below. |
| `ProviderBackedContextArtifactStoreOptions` | interface | <code>interface ProviderBackedContextArtifactStoreOptions</code> | Field contract for Provider Backed Context Artifact Store Options; see all contract members below. |
| `InMemoryContextArtifactBacking` | type | <code>type InMemoryContextArtifactBacking = Map&lt;string, ContextArtifactRecord&gt;</code> | Public type alias for In Memory Context Artifact Backing. |

## `InMemoryContextArtifactStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `durability` | property | <code>durability: "ephemeral"</code> | Public durability property. |
| `put` | method | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | Public runtime operation for put. |
| `read` | method | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | Public runtime operation for read. |

## `ProviderBackedContextArtifactStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `durability` | property | <code>durability: "ephemeral" &#124; "durable"</code> | Public durability property. |
| `put` | method | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | Public runtime operation for put. |
| `read` | method | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | Public runtime operation for read. |

## `ContextArtifactReadExpectation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |

## `ContextArtifactRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `reference` | property | <code>reference: ContextArtifactRef</code> | Public reference property. |

## `ContextArtifactRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `contentType` | property | <code>contentType: "text/plain; charset=utf-8"</code> | Public content Type property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `sourceItemId` | property | <code>sourceItemId: string</code> | Public source Item Id property. |

## `ContextArtifactStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `durability` | property | <code>durability: "ephemeral" &#124; "durable"</code> | Public durability property. |
| `put` | method | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | Public runtime operation for put. |
| `read` | method | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | Public runtime operation for read. |

## `ContextArtifactWriteRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sourceItemId` | property | <code>sourceItemId: string</code> | Public source Item Id property. |

## `ProviderBackedContextArtifactStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `durability` | property | <code>durability: "ephemeral" &#124; "durable"</code> | Public durability property. |
| `provider` | property | <code>provider: ArtifactStoreProvider</code> | Public provider property. |
