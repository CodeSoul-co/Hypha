# `@codesoul-co/hypha-adapters-local` / `local-process-output-artifacts`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-output-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)
- 导出数: **7**

## 模块用法

用于使用该功能边界的公共契约与操作。Local process output artifacts 模块公开 1 类、5 接口、1 类型。

### 从包入口导入

```ts
import {
  ArtifactManagerLocalProcessOutputPort,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerLocalProcessOutputPortOptions,
  LocalProcessOutputArtifactPort,
  LocalProcessOutputArtifactRequest,
  LocalProcessOutputArtifactStream,
  LocalProcessOutputArtifactStreamRequest,
  LocalProcessArtifactStream,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerLocalProcessOutputPort` | 类 | <code>new ArtifactManagerLocalProcessOutputPort(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure. |
| `ArtifactManagerLocalProcessOutputPortOptions` | 接口 | <code>interface ArtifactManagerLocalProcessOutputPortOptions</code> | Artifact Manager Local Process Output Port Options 接口，共包含 3 个公开字段或方法。 |
| `LocalProcessOutputArtifactPort` | 接口 | <code>interface LocalProcessOutputArtifactPort</code> | Local Process Output Artifact Port 接口，共包含 2 个公开字段或方法。 |
| `LocalProcessOutputArtifactRequest` | 接口 | <code>interface LocalProcessOutputArtifactRequest</code> | Local Process Output Artifact Request 接口，共包含 7 个公开字段或方法。 |
| `LocalProcessOutputArtifactStream` | 接口 | <code>interface LocalProcessOutputArtifactStream</code> | Local Process Output Artifact Stream 接口，共包含 3 个公开字段或方法。 |
| `LocalProcessOutputArtifactStreamRequest` | 接口 | <code>interface LocalProcessOutputArtifactStreamRequest</code> | Local Process Output Artifact Stream Request 接口，共包含 3 个公开字段或方法。 |
| `LocalProcessArtifactStream` | 类型 | <code>type LocalProcessArtifactStream = 'stdout' &#124; 'stderr'</code> | Local Process Artifact Stream 公共类型别名；完整类型表达式见声明。 |

## `ArtifactManagerLocalProcessOutputPort`

Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure.

- 种类: 类
- 导入: `import { ArtifactManagerLocalProcessOutputPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### 声明

```text
export declare class ArtifactManagerLocalProcessOutputPort implements LocalProcessOutputArtifactPort {
    constructor(options: ArtifactManagerLocalProcessOutputPortOptions);
    store(request: LocalProcessOutputArtifactRequest): Promise<string>;
    openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | 创建该类的实例。 |
| `openStream` | 方法 | <code>openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | 公开方法；参数与返回类型以签名列为准。 |
| `store` | 方法 | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactManagerLocalProcessOutputPortOptions`

Artifact Manager Local Process Output Port Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactManagerLocalProcessOutputPortOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### 声明

```text
export interface ArtifactManagerLocalProcessOutputPortOptions {
    manager: Pick<ArtifactManager, 'create'>;
    profileRef: SpecRef;
    maxBufferedStreamBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBufferedStreamBytes` | 属性 | <code>maxBufferedStreamBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessOutputArtifactPort`

Local Process Output Artifact Port 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputArtifactPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### 声明

```text
export interface LocalProcessOutputArtifactPort {
    store(request: LocalProcessOutputArtifactRequest): Promise<string>;
    openStream?(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `openStream` | 方法 | <code>openStream?(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | 公开方法；参数与返回类型以签名列为准。 |
| `store` | 方法 | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalProcessOutputArtifactRequest`

Local Process Output Artifact Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputArtifactRequest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### 声明

```text
export interface LocalProcessOutputArtifactRequest {
    executionId: string;
    request: CommandExecutionRequest;
    stream: LocalProcessArtifactStream;
    content: Uint8Array;
    contentHash: string;
    observedBytes: number;
    truncated: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedBytes` | 属性 | <code>observedBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 属性 | <code>stream: LocalProcessArtifactStream</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truncated` | 属性 | <code>truncated: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessOutputArtifactStream`

Local Process Output Artifact Stream 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputArtifactStream } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### 声明

```text
export interface LocalProcessOutputArtifactStream {
    append(chunk: Uint8Array): Promise<void>;
    complete(): Promise<string>;
    abort(error: unknown): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abort` | 方法 | <code>abort(error: unknown): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `append` | 方法 | <code>append(chunk: Uint8Array): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalProcessOutputArtifactStreamRequest`

Local Process Output Artifact Stream Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputArtifactStreamRequest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### 声明

```text
export interface LocalProcessOutputArtifactStreamRequest {
    executionId: string;
    request: CommandExecutionRequest;
    stream: LocalProcessArtifactStream;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 属性 | <code>stream: LocalProcessArtifactStream</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessArtifactStream`

Local Process Artifact Stream 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LocalProcessArtifactStream } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### 声明

```text
export type LocalProcessArtifactStream = 'stdout' | 'stderr';
```
