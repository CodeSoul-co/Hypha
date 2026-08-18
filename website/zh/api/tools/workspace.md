# `@codesoul-co/hypha-tools` / `workspace`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)
- 导出数: **4**

## 模块用法

用于声明并实施 Workspace 作用域边界。Workspace 模块公开 3 接口、1 类型。

### 从包入口导入

```ts
import type {
  WorkspaceRuntimeConfig,
  WorkspaceRuntimePort,
  WorkspaceRuntimeRequest,
  WorkspaceFileOperation,
} from '@codesoul-co/hypha-tools';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `WorkspaceRuntimeConfig` | 接口 | <code>interface WorkspaceRuntimeConfig</code> | Workspace Runtime Config 接口，共包含 5 个公开字段或方法。 |
| `WorkspaceRuntimePort` | 接口 | <code>interface WorkspaceRuntimePort</code> | Workspace Runtime Port 接口，共包含 3 个公开字段或方法。 |
| `WorkspaceRuntimeRequest` | 接口 | <code>interface WorkspaceRuntimeRequest</code> | Workspace Runtime Request 接口，共包含 8 个公开字段或方法。 |
| `WorkspaceFileOperation` | 类型 | <code>type WorkspaceFileOperation = 'read' &#124; 'write' &#124; 'list' &#124; 'execute'</code> | Workspace File Operation 公共类型别名；完整类型表达式见声明。 |

## `WorkspaceRuntimeConfig`

Workspace Runtime Config 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceRuntimeConfig } from '@codesoul-co/hypha-tools';`
- 源码模块: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### 声明

```text
export interface WorkspaceRuntimeConfig {
    workingDirectory: string;
    readPaths: string[];
    writePaths: string[];
    executePaths: string[];
    execution: {
        enabled: boolean;
        timeoutMs: number;
        maxOutputBytes: number;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executePaths` | 属性 | <code>executePaths: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `execution` | 属性 | <code>execution: { enabled: boolean; timeoutMs: number; maxOutputBytes: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `readPaths` | 属性 | <code>readPaths: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workingDirectory` | 属性 | <code>workingDirectory: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writePaths` | 属性 | <code>writePaths: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceRuntimePort`

Workspace Runtime Port 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceRuntimePort } from '@codesoul-co/hypha-tools';`
- 源码模块: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### 声明

```text
export interface WorkspaceRuntimePort {
    execute(request: WorkspaceRuntimeRequest): Promise<unknown>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `WorkspaceRuntimeRequest`

Workspace Runtime Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkspaceRuntimeRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### 声明

```text
export interface WorkspaceRuntimeRequest {
    operation: WorkspaceFileOperation;
    path: string;
    content?: string;
    executable?: boolean;
    args?: string[];
    cwd?: string;
    timeoutMs?: number;
    signal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cwd` | 属性 | <code>cwd?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executable` | 属性 | <code>executable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: WorkspaceFileOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkspaceFileOperation`

Workspace File Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceFileOperation } from '@codesoul-co/hypha-tools';`
- 源码模块: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### 声明

```text
export type WorkspaceFileOperation = 'read' | 'write' | 'list' | 'execute';
```
