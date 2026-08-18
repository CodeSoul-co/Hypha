# `@codesoul-co/hypha-adapters-local` / `local-process-output-stream-registry`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-output-stream-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessOutputStreamRegistry` | class | <code>new LocalProcessOutputStreamRegistry(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8. |
| `LocalProcessOutputStreamRegistryOptions` | interface | <code>interface LocalProcessOutputStreamRegistryOptions</code> | Field contract for Local Process Output Stream Registry Options; see all contract members below. |

## `LocalProcessOutputStreamRegistry` public members

Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `begin` | method | <code>begin(executionId: string, principal: ExecutionPrincipal): void</code> | Public runtime operation for begin. |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `complete` | method | <code>complete(executionId: string): void</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | Creates an instance of this class. |
| `publish` | method | <code>publish(executionId: string, stream: CommandOutputChunk["stream"], bytes: Uint8Array, truncated?: boolean): CommandOutputChunk</code> | Public runtime operation for publish. |
| `stream` | method | <code>stream(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | Public runtime operation for stream. |

## `LocalProcessOutputStreamRegistryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxRetainedChunks` | property | <code>maxRetainedChunks: number</code> | Public max Retained Chunks property. |
| `maxTrackedExecutions` | property | <code>maxTrackedExecutions: number</code> | Public max Tracked Executions property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
