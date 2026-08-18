# `@codesoul-co/hypha-core` / `modules/artifact/store-registry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/store-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store-registry.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactStoreProviderRegistry` | 类 | <code>new ArtifactStoreProviderRegistry(): ArtifactStoreProviderRegistry</code> | Provider-neutral DI registry for Artifact Stores. Core owns selection and lifecycle validation without importing a concrete storage adapter. |
| `ArtifactStoreProviderRegistration` | 接口 | <code>interface ArtifactStoreProviderRegistration</code> | Artifact Store Provider Registration 的字段契约；完整字段见下表。 |

## `ArtifactStoreProviderRegistry` 公开成员

Provider-neutral DI registry for Artifact Stores. Core owns selection and lifecycle validation without importing a concrete storage adapter.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ArtifactStoreProviderRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(providerId: string): Promise&lt;ArtifactStoreProvider&gt;</code> | 创建 create。 |
| `list` | 方法 | <code>list(): ArtifactStoreProviderRegistration[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(factory: ArtifactStoreProviderFactory): void</code> | 注册 register。 |
| `resolve` | 方法 | <code>resolve(providerId: string): ArtifactStoreProviderFactory</code> | 解析 resolve。 |
| `unregister` | 方法 | <code>unregister(providerId: string): boolean</code> | unregister 的公开运行时操作。 |

## `ArtifactStoreProviderRegistration` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
