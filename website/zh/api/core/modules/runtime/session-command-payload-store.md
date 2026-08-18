# `@codesoul-co/hypha-core` / `modules/runtime/session-command-payload-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/session-command-payload-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactSessionCommandPayloadStore` | 类 | <code>new ArtifactSessionCommandPayloadStore(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | Stores canonical command JSON outside the Queue while retaining a verified durable reference. |
| `ArtifactSessionCommandPayloadStoreOptions` | 接口 | <code>interface ArtifactSessionCommandPayloadStoreOptions</code> | Artifact Session Command Payload Store Options 的字段契约；完整字段见下表。 |
| `PutSessionCommandPayloadRequest` | 接口 | <code>interface PutSessionCommandPayloadRequest</code> | Put Session Command Payload Request 的字段契约；完整字段见下表。 |
| `SessionCommandPayloadReference` | 接口 | <code>interface SessionCommandPayloadReference</code> | Session Command Payload Reference 的字段契约；完整字段见下表。 |
| `GetSessionCommandPayloadRequest` | 类型 | <code>type GetSessionCommandPayloadRequest = SessionCommandPayloadReference</code> | Get Session Command Payload Request 的公共类型别名。 |

## `ArtifactSessionCommandPayloadStore` 公开成员

Stores canonical command JSON outside the Queue while retaining a verified durable reference.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(request: GetSessionCommandPayloadRequest): Promise&lt;unknown&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(request: PutSessionCommandPayloadRequest): Promise&lt;SessionCommandPayloadReference&gt;</code> | put 的公开运行时操作。 |

## `ArtifactSessionCommandPayloadStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ArtifactStoreProvider</code> | artifacts 字段。 |
| `maxPayloadBytes` | 属性 | <code>maxPayloadBytes: number</code> | max Payload Bytes 字段。 |

## `PutSessionCommandPayloadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `payload` | 属性 | <code>payload: unknown</code> | payload 字段。 |

## `SessionCommandPayloadReference` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | payload Hash 字段。 |
| `payloadRef` | 属性 | <code>payloadRef: string</code> | payload Ref 字段。 |
