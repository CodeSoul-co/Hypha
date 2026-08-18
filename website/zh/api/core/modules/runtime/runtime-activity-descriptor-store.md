# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-descriptor-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactRuntimeActivityDescriptorStore` | 类 | <code>new ArtifactRuntimeActivityDescriptorStore(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | Persists immutable Activity descriptors outside HumanTask Events. |
| `ArtifactRuntimeActivityDescriptorStoreOptions` | 接口 | <code>interface ArtifactRuntimeActivityDescriptorStoreOptions</code> | Artifact Runtime Activity Descriptor Store Options 的字段契约；完整字段见下表。 |
| `RuntimeActivityDescriptorReference` | 接口 | <code>interface RuntimeActivityDescriptorReference</code> | Runtime Activity Descriptor Reference 的字段契约；完整字段见下表。 |
| `RuntimeActivityDescriptorStore` | 接口 | <code>interface RuntimeActivityDescriptorStore</code> | Runtime Activity Descriptor Store 的字段契约；完整字段见下表。 |

## `ArtifactRuntimeActivityDescriptorStore` 公开成员

Persists immutable Activity descriptors outside HumanTask Events.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(input: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | put 的公开运行时操作。 |

## `ArtifactRuntimeActivityDescriptorStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ArtifactStoreProvider</code> | artifacts 字段。 |
| `maxDescriptorBytes` | 属性 | <code>maxDescriptorBytes: number</code> | max Descriptor Bytes 字段。 |

## `RuntimeActivityDescriptorReference` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash: string</code> | activity Descriptor Hash 字段。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef: string</code> | activity Descriptor Ref 字段。 |

## `RuntimeActivityDescriptorStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(descriptor: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | put 的公开运行时操作。 |
