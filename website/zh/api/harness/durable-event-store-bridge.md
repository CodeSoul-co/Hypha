# `@codesoul-co/hypha-harness` / `durable-event-store-bridge`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/durable-event-store-bridge.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DurableEventStoreBridge` | 类 | <code>new DurableEventStoreBridge(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime. |
| `DurableEventStoreBridgeCoordination` | 接口 | <code>interface DurableEventStoreBridgeCoordination</code> | Durable Event Store Bridge Coordination 的字段契约；完整字段见下表。 |
| `DurableEventStoreBridgeOptions` | 接口 | <code>interface DurableEventStoreBridgeOptions</code> | Durable Event Store Bridge Options 的字段契约；完整字段见下表。 |

## `DurableEventStoreBridge` 公开成员

Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | 列出 list。 |
| `record` | 方法 | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | 记录 record。 |

## `DurableEventStoreBridgeCoordination` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | lease Ttl Ms 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | run Leases 字段。 |

## `DurableEventStoreBridgeOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `coordination` | 属性 | <code>coordination: DurableEventStoreBridgeCoordination</code> | coordination 字段。 |
| `events` | 属性 | <code>events: EventRuntime</code> | events 字段。 |
| `maxAppendAttempts` | 属性 | <code>maxAppendAttempts: number</code> | max Append Attempts 字段。 |
| `streamHeadPageSize` | 属性 | <code>streamHeadPageSize: number</code> | stream Head Page Size 字段。 |
