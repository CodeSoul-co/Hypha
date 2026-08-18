# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeCheckpointStore` | 类 | <code>new InMemoryRuntimeCheckpointStore(): InMemoryRuntimeCheckpointStore</code> | In Memory Runtime Checkpoint Store 的运行时实现；公开构造函数与成员见下表。 |
| `runtimeCheckpointChecksum` | 函数 | <code>runtimeCheckpointChecksum(record: Omit&lt;RuntimeCheckpointRecord, "checksum"&gt; &#124; RuntimeCheckpointRecord): string</code> | runtime Checkpoint Checksum 的公开运行时操作。 |
| `verifyRuntimeCheckpointChecksum` | 函数 | <code>verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void</code> | verify Runtime Checkpoint Checksum 的公开运行时操作。 |

## `InMemoryRuntimeCheckpointStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeCheckpointStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 读取 get。 |
| `latest` | 方法 | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | 列出 list。 |
| `put` | 方法 | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | put 的公开运行时操作。 |
