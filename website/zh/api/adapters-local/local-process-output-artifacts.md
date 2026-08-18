# `@codesoul-co/hypha-adapters-local` / `local-process-output-artifacts`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-output-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerLocalProcessOutputPort` | 类 | <code>new ArtifactManagerLocalProcessOutputPort(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure. |
| `ArtifactManagerLocalProcessOutputPortOptions` | 接口 | <code>interface ArtifactManagerLocalProcessOutputPortOptions</code> | Artifact Manager Local Process Output Port Options 的字段契约；完整字段见下表。 |
| `LocalProcessOutputArtifactPort` | 接口 | <code>interface LocalProcessOutputArtifactPort</code> | Local Process Output Artifact Port 的字段契约；完整字段见下表。 |
| `LocalProcessOutputArtifactRequest` | 接口 | <code>interface LocalProcessOutputArtifactRequest</code> | Local Process Output Artifact Request 的字段契约；完整字段见下表。 |
| `LocalProcessOutputArtifactStream` | 接口 | <code>interface LocalProcessOutputArtifactStream</code> | Local Process Output Artifact Stream 的字段契约；完整字段见下表。 |
| `LocalProcessOutputArtifactStreamRequest` | 接口 | <code>interface LocalProcessOutputArtifactStreamRequest</code> | Local Process Output Artifact Stream Request 的字段契约；完整字段见下表。 |
| `LocalProcessArtifactStream` | 类型 | <code>type LocalProcessArtifactStream = 'stdout' &#124; 'stderr'</code> | Local Process Artifact Stream 的公共类型别名。 |

## `ArtifactManagerLocalProcessOutputPort` 公开成员

Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | 创建该类的实例。 |
| `openStream` | 方法 | <code>openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | open Stream 的公开运行时操作。 |
| `store` | 方法 | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | store 的公开运行时操作。 |

## `ArtifactManagerLocalProcessOutputPortOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | manager 字段。 |
| `maxBufferedStreamBytes` | 属性 | <code>maxBufferedStreamBytes: number</code> | max Buffered Stream Bytes 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |

## `LocalProcessOutputArtifactPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `openStream` | 方法 | <code>openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | open Stream 的公开运行时操作。 |
| `store` | 方法 | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | store 的公开运行时操作。 |

## `LocalProcessOutputArtifactRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | content 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `observedBytes` | 属性 | <code>observedBytes: number</code> | observed Bytes 字段。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | request 字段。 |
| `stream` | 属性 | <code>stream: LocalProcessArtifactStream</code> | stream 字段。 |
| `truncated` | 属性 | <code>truncated: boolean</code> | truncated 字段。 |

## `LocalProcessOutputArtifactStream` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abort` | 方法 | <code>abort(error: unknown): Promise&lt;void&gt;</code> | abort 的公开运行时操作。 |
| `append` | 方法 | <code>append(chunk: Uint8Array): Promise&lt;void&gt;</code> | 追加 append。 |
| `complete` | 方法 | <code>complete(): Promise&lt;string&gt;</code> | complete 的公开运行时操作。 |

## `LocalProcessOutputArtifactStreamRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | request 字段。 |
| `stream` | 属性 | <code>stream: LocalProcessArtifactStream</code> | stream 字段。 |
