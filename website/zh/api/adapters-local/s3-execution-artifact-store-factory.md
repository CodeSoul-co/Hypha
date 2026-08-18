# `@codesoul-co/hypha-adapters-local` / `s3-execution-artifact-store-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/s3-execution-artifact-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。S3 execution artifact store factory 模块公开 1 类、1 类型。

### 从包入口导入

```ts
import {
  S3ExecutionArtifactStoreFactory,
} from '@codesoul-co/hypha-adapters-local';

import type {
  S3ExecutionArtifactStoreFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `S3ExecutionArtifactStoreFactory` | 类 | <code>new S3ExecutionArtifactStoreFactory(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry. |
| `S3ExecutionArtifactStoreFactoryOptions` | 类型 | <code>type S3ExecutionArtifactStoreFactoryOptions = Omit&lt;S3ExecutionArtifactStoreOptions, 'id'&gt; &amp; { providerId?: string; }</code> | S3 Execution Artifact Store Factory Options 公共类型别名；完整类型表达式见声明。 |

## `S3ExecutionArtifactStoreFactory`

Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry.

- 种类: 类
- 导入: `import { S3ExecutionArtifactStoreFactory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`s3-execution-artifact-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)

### 声明

```text
export declare class S3ExecutionArtifactStoreFactory implements ArtifactStoreProviderFactory {
    readonly providerId: string;
    constructor(options: S3ExecutionArtifactStoreFactoryOptions);
    create(): ArtifactStoreProvider;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): ArtifactStoreProvider</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `S3ExecutionArtifactStoreFactoryOptions`

S3 Execution Artifact Store Factory Options 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { S3ExecutionArtifactStoreFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`s3-execution-artifact-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)

### 声明

```text
export type S3ExecutionArtifactStoreFactoryOptions = Omit<S3ExecutionArtifactStoreOptions, 'id'> & {
    providerId?: string;
};
```
