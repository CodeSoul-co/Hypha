# `@codesoul-co/hypha-adapters-local` / `artifact-manager-execution-cache-verifier`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Artifact manager execution cache verifier 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  ArtifactManagerExecutionCacheVerifier,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerExecutionCacheVerifierOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerExecutionCacheVerifier` | 类 | <code>new ArtifactManagerExecutionCacheVerifier(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks. |
| `ArtifactManagerExecutionCacheVerifierOptions` | 接口 | <code>interface ArtifactManagerExecutionCacheVerifierOptions</code> | Artifact Manager Execution Cache Verifier Options 接口，共包含 3 个公开字段或方法。 |

## `ArtifactManagerExecutionCacheVerifier`

Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks.

- 种类: 类
- 导入: `import { ArtifactManagerExecutionCacheVerifier } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`artifact-manager-execution-cache-verifier`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)

### 声明

```text
export declare class ArtifactManagerExecutionCacheVerifier implements ExecutionCacheArtifactVerifier {
    constructor(options: ArtifactManagerExecutionCacheVerifierOptions);
    verify(rawScope: ExecutionCacheScope, rawArtifacts: ExecutionCacheArtifactReference[]): Promise<boolean>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | 创建该类的实例。 |
| `verify` | 方法 | <code>verify(rawScope: ExecutionCacheScope, rawArtifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactManagerExecutionCacheVerifierOptions`

Artifact Manager Execution Cache Verifier Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactManagerExecutionCacheVerifierOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`artifact-manager-execution-cache-verifier`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)

### 声明

```text
export interface ArtifactManagerExecutionCacheVerifierOptions {
    manager: Pick<ArtifactManager, 'read'>;
    resolvePrincipal(scope: ExecutionCacheScope): ExecutionPrincipal | Promise<ExecutionPrincipal>;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "read"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolvePrincipal` | 方法 | <code>resolvePrincipal(scope: ExecutionCacheScope): ExecutionPrincipal &#124; Promise&lt;ExecutionPrincipal&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
