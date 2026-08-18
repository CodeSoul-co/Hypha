# `@codesoul-co/hypha-adapters-local` / `s3-execution-artifact-store-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/s3-execution-artifact-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `S3ExecutionArtifactStoreFactory` | 类 | <code>new S3ExecutionArtifactStoreFactory(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry. |
| `S3ExecutionArtifactStoreFactoryOptions` | 类型 | <code>type S3ExecutionArtifactStoreFactoryOptions = Omit&lt;S3ExecutionArtifactStoreOptions, 'id'&gt; &amp; { providerId?: string; }</code> | S3 Execution Artifact Store Factory Options 的公共类型别名。 |

## `S3ExecutionArtifactStoreFactory` 公开成员

Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): ArtifactStoreProvider</code> | 创建 create。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
