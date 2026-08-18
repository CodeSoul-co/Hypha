# `@codesoul-co/hypha-adapters-local` / `artifact-manager-tool-port`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/artifact-manager-tool-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)
- 导出数: **3**

## 模块用法

用于定义或实现 Provider-neutral Port。Artifact manager tool port 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  ArtifactManagerToolPort,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerToolPortOptions,
  ToolArtifactManagerContext,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerToolPort` | 类 | <code>new ArtifactManagerToolPort(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | Routes governed Tool result bytes through the Core ArtifactManager. |
| `ArtifactManagerToolPortOptions` | 接口 | <code>interface ArtifactManagerToolPortOptions</code> | Artifact Manager Tool Port Options 接口，共包含 2 个公开字段或方法。 |
| `ToolArtifactManagerContext` | 接口 | <code>interface ToolArtifactManagerContext</code> | Tool Artifact Manager Context 接口，共包含 8 个公开字段或方法。 |

## `ArtifactManagerToolPort`

Routes governed Tool result bytes through the Core ArtifactManager.

- 种类: 类
- 导入: `import { ArtifactManagerToolPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`artifact-manager-tool-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)

### 声明

```text
export declare class ArtifactManagerToolPort implements ToolArtifactPort {
    constructor(options: ArtifactManagerToolPortOptions);
    store(request: {
            invocationId: string;
            toolId: string;
            value: unknown;
            mimeType?: string;
            metadata?: Record<string, unknown>;
        }): Promise<string>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | 创建该类的实例。 |
| `store` | 方法 | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactManagerToolPortOptions`

Artifact Manager Tool Port Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactManagerToolPortOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`artifact-manager-tool-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)

### 声明

```text
export interface ArtifactManagerToolPortOptions {
    manager: Pick<ArtifactManager, 'create'>;
    resolveContext(request: {
        invocationId: string;
        toolId: string;
    }): ToolArtifactManagerContext | Promise<ToolArtifactManagerContext>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveContext` | 方法 | <code>resolveContext(request: { invocationId: string; toolId: string; }): ToolArtifactManagerContext &#124; Promise&lt;ToolArtifactManagerContext&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolArtifactManagerContext`

Tool Artifact Manager Context 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolArtifactManagerContext } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`artifact-manager-tool-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)

### 声明

```text
export interface ToolArtifactManagerContext {
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    workspaceId: string;
    tenantId?: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
