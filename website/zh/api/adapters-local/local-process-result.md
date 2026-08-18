# `@codesoul-co/hypha-adapters-local` / `local-process-result`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-result.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Local process result 模块公开 1 函数、2 接口。

### 从包入口导入

```ts
import {
  buildLocalProcessResult,
} from '@codesoul-co/hypha-adapters-local';

import type {
  BuildLocalProcessResultInput,
  LocalProcessOutputArtifactRefs,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildLocalProcessResult` | 函数 | <code>buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult</code> | Build Local Process Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `BuildLocalProcessResultInput` | 接口 | <code>interface BuildLocalProcessResultInput</code> | Build Local Process Result Input 接口，共包含 7 个公开字段或方法。 |
| `LocalProcessOutputArtifactRefs` | 接口 | <code>interface LocalProcessOutputArtifactRefs</code> | Local Process Output Artifact Refs 接口，共包含 2 个公开字段或方法。 |

## `buildLocalProcessResult`

Build Local Process Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { buildLocalProcessResult } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-result`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)

### 声明

```text
export declare function buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult;
```

### 调用签名

```text
buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>BuildLocalProcessResultInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CommandExecutionResult`
- 说明: 返回值契约由上述类型定义。

## `BuildLocalProcessResultInput`

Build Local Process Result Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BuildLocalProcessResultInput } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-result`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)

### 声明

```text
export interface BuildLocalProcessResultInput {
    providerId: string;
    request: CommandExecutionRequest;
    executionId: string;
    processResult: LocalProcessRunResult;
    changedFiles: FileMutation[];
    resourceAccountant: LocalProcessResourceAccountant;
    outputArtifacts?: LocalProcessOutputArtifactRefs;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `changedFiles` | 属性 | <code>changedFiles: FileMutation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputArtifacts` | 属性 | <code>outputArtifacts?: LocalProcessOutputArtifactRefs</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processResult` | 属性 | <code>processResult: LocalProcessRunResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceAccountant` | 属性 | <code>resourceAccountant: LocalProcessResourceAccountant</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalProcessOutputArtifactRefs`

Local Process Output Artifact Refs 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputArtifactRefs } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-result`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)

### 声明

```text
export interface LocalProcessOutputArtifactRefs {
    stdout?: string;
    stderr?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `stderr` | 属性 | <code>stderr?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stdout` | 属性 | <code>stdout?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
