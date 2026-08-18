# `@codesoul-co/hypha-adapters-local` / `local-process-output-stream-registry`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-output-stream-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessOutputStreamRegistry` | 类 | <code>new LocalProcessOutputStreamRegistry(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8. |
| `LocalProcessOutputStreamRegistryOptions` | 接口 | <code>interface LocalProcessOutputStreamRegistryOptions</code> | Local Process Output Stream Registry Options 的字段契约；完整字段见下表。 |

## `LocalProcessOutputStreamRegistry` 公开成员

Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `begin` | 方法 | <code>begin(executionId: string, principal: ExecutionPrincipal): void</code> | begin 的公开运行时操作。 |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `complete` | 方法 | <code>complete(executionId: string): void</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | 创建该类的实例。 |
| `publish` | 方法 | <code>publish(executionId: string, stream: CommandOutputChunk["stream"], bytes: Uint8Array, truncated?: boolean): CommandOutputChunk</code> | publish 的公开运行时操作。 |
| `stream` | 方法 | <code>stream(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | stream 的公开运行时操作。 |

## `LocalProcessOutputStreamRegistryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxRetainedChunks` | 属性 | <code>maxRetainedChunks: number</code> | max Retained Chunks 字段。 |
| `maxTrackedExecutions` | 属性 | <code>maxTrackedExecutions: number</code> | max Tracked Executions 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
