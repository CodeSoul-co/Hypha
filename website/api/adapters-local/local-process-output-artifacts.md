# `@codesoul-co/hypha-adapters-local` / `local-process-output-artifacts`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-output-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerLocalProcessOutputPort` | class | <code>new ArtifactManagerLocalProcessOutputPort(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure. |
| `ArtifactManagerLocalProcessOutputPortOptions` | interface | <code>interface ArtifactManagerLocalProcessOutputPortOptions</code> | Field contract for Artifact Manager Local Process Output Port Options; see all contract members below. |
| `LocalProcessOutputArtifactPort` | interface | <code>interface LocalProcessOutputArtifactPort</code> | Field contract for Local Process Output Artifact Port; see all contract members below. |
| `LocalProcessOutputArtifactRequest` | interface | <code>interface LocalProcessOutputArtifactRequest</code> | Field contract for Local Process Output Artifact Request; see all contract members below. |
| `LocalProcessOutputArtifactStream` | interface | <code>interface LocalProcessOutputArtifactStream</code> | Field contract for Local Process Output Artifact Stream; see all contract members below. |
| `LocalProcessOutputArtifactStreamRequest` | interface | <code>interface LocalProcessOutputArtifactStreamRequest</code> | Field contract for Local Process Output Artifact Stream Request; see all contract members below. |
| `LocalProcessArtifactStream` | type | <code>type LocalProcessArtifactStream = 'stdout' &#124; 'stderr'</code> | Public type alias for Local Process Artifact Stream. |

## `ArtifactManagerLocalProcessOutputPort` public members

Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | Creates an instance of this class. |
| `openStream` | method | <code>openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | Public runtime operation for open Stream. |
| `store` | method | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | Public runtime operation for store. |

## `ArtifactManagerLocalProcessOutputPortOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | Public manager property. |
| `maxBufferedStreamBytes` | property | <code>maxBufferedStreamBytes: number</code> | Public max Buffered Stream Bytes property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |

## `LocalProcessOutputArtifactPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `openStream` | method | <code>openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | Public runtime operation for open Stream. |
| `store` | method | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | Public runtime operation for store. |

## `LocalProcessOutputArtifactRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | Public content property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `observedBytes` | property | <code>observedBytes: number</code> | Public observed Bytes property. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public request property. |
| `stream` | property | <code>stream: LocalProcessArtifactStream</code> | Public stream property. |
| `truncated` | property | <code>truncated: boolean</code> | Public truncated property. |

## `LocalProcessOutputArtifactStream` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abort` | method | <code>abort(error: unknown): Promise&lt;void&gt;</code> | Public runtime operation for abort. |
| `append` | method | <code>append(chunk: Uint8Array): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `complete` | method | <code>complete(): Promise&lt;string&gt;</code> | Public runtime operation for complete. |

## `LocalProcessOutputArtifactStreamRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public request property. |
| `stream` | property | <code>stream: LocalProcessArtifactStream</code> | Public stream property. |
