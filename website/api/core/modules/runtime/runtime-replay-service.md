# `@codesoul-co/hypha-core` / `modules/runtime/runtime-replay-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-replay-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeReplayService` | class | <code>new RuntimeReplayService(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | Runtime implementation for Runtime Replay Service; see its public constructor and members below. |
| `RuntimeReplayServiceOptions` | interface | <code>interface RuntimeReplayServiceOptions</code> | Field contract for Runtime Replay Service Options; see all contract members below. |

## `RuntimeReplayService` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | Creates an instance of this class. |
| `replay` | method | <code>replay(input: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | Public runtime operation for replay. |
| `verify` | method | <code>verify(input: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | Public runtime operation for verify. |

## `RuntimeReplayServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoints` | property | <code>checkpoints: Pick&lt;RuntimeCheckpointService, "load"&gt;</code> | Public checkpoints property. |
| `events` | property | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | Public events property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
