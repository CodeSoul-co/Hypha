# `@codesoul-co/hypha-adapters-local` / `local-artifact-workspace-content-reader`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-workspace-content-reader.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)
- 导出数: **2**

## 模块用法

用于声明并实施 Workspace 作用域边界。Local artifact workspace content reader 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  LocalArtifactWorkspaceContentReader,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactWorkspaceContentReaderOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalArtifactWorkspaceContentReader` | 类 | <code>new LocalArtifactWorkspaceContentReader(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory. |
| `LocalArtifactWorkspaceContentReaderOptions` | 接口 | <code>interface LocalArtifactWorkspaceContentReaderOptions</code> | Local Artifact Workspace Content Reader Options 接口，共包含 5 个公开字段或方法。 |

## `LocalArtifactWorkspaceContentReader`

Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory.

- 种类: 类
- 导入: `import { LocalArtifactWorkspaceContentReader } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-workspace-content-reader`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)

### 声明

```text
export declare class LocalArtifactWorkspaceContentReader implements ArtifactWorkspaceContentReader {
    constructor(options: LocalArtifactWorkspaceContentReaderOptions);
    read(request: ArtifactWorkspaceContentRequest): Promise<ArtifactWorkspaceContent>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | 创建该类的实例。 |
| `read` | 方法 | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalArtifactWorkspaceContentReaderOptions`

Local Artifact Workspace Content Reader Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalArtifactWorkspaceContentReaderOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-artifact-workspace-content-reader`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)

### 声明

```text
export interface LocalArtifactWorkspaceContentReaderOptions {
    workspaceRoot: string;
    workspaceId: string;
    userId: string;
    tenantId?: string;
    chunkSizeBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `chunkSizeBytes` | 属性 | <code>chunkSizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
