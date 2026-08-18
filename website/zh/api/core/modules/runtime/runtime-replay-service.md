# `@codesoul-co/hypha-core` / `modules/runtime/runtime-replay-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-replay-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeReplayService` | 类 | <code>new RuntimeReplayService(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | Runtime Replay Service 的运行时实现；公开构造函数与成员见下表。 |
| `RuntimeReplayServiceOptions` | 接口 | <code>interface RuntimeReplayServiceOptions</code> | Runtime Replay Service Options 的字段契约；完整字段见下表。 |

## `RuntimeReplayService` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | 创建该类的实例。 |
| `replay` | 方法 | <code>replay(input: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | replay 的公开运行时操作。 |
| `verify` | 方法 | <code>verify(input: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | verify 的公开运行时操作。 |

## `RuntimeReplayServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoints` | 属性 | <code>checkpoints: Pick&lt;RuntimeCheckpointService, "load"&gt;</code> | checkpoints 字段。 |
| `events` | 属性 | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | events 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
