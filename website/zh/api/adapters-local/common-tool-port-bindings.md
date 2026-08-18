# `@codesoul-co/hypha-adapters-local` / `common-tool-port-bindings`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/common-tool-port-bindings.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)
- 导出数: **7**

## 模块用法

用于定义或实现 Provider-neutral Port。Common tool port bindings 模块公开 3 类、3 接口、1 类型。

### 从包入口导入

```ts
import {
  ArtifactManagerCommonToolPort,
  GovernedCommandCommonToolPort,
  WorkspaceCommonToolPort,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerCommonToolPortOptions,
  CommonToolProviderPort,
  CommonToolProviderRequest,
  GovernedCommandDispatchFactory,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerCommonToolPort` | 类 | <code>new ArtifactManagerCommonToolPort(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed. |
| `GovernedCommandCommonToolPort` | 类 | <code>new GovernedCommandCommonToolPort(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | Binds common.command to the authorization-verifying ExecutionPort boundary. |
| `WorkspaceCommonToolPort` | 类 | <code>new WorkspaceCommonToolPort(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding. |
| `ArtifactManagerCommonToolPortOptions` | 接口 | <code>interface ArtifactManagerCommonToolPortOptions</code> | Artifact Manager Common Tool Port Options 接口，共包含 2 个公开字段或方法。 |
| `CommonToolProviderPort` | 接口 | <code>interface CommonToolProviderPort</code> | Common Tool Provider Port 接口，共包含 1 个公开字段或方法。 |
| `CommonToolProviderRequest` | 接口 | <code>interface CommonToolProviderRequest</code> | Structural mirror of the tools-owned CommonToolPort boundary. |
| `GovernedCommandDispatchFactory` | 类型 | <code>type GovernedCommandDispatchFactory = (request: CommonToolProviderRequest) =&gt; Promise&lt;ExecutionDispatchRequest&gt; &#124; ExecutionDispatchRequest</code> | Governed Command Dispatch Factory 公共类型别名；完整类型表达式见声明。 |

## `ArtifactManagerCommonToolPort`

Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed.

- 种类: 类
- 导入: `import { ArtifactManagerCommonToolPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### 声明

```text
export declare class ArtifactManagerCommonToolPort implements CommonToolProviderPort {
    constructor(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions);
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `GovernedCommandCommonToolPort`

Binds common.command to the authorization-verifying ExecutionPort boundary.

- 种类: 类
- 导入: `import { GovernedCommandCommonToolPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### 声明

```text
export declare class GovernedCommandCommonToolPort implements CommonToolProviderPort {
    constructor(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory);
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `WorkspaceCommonToolPort`

Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding.

- 种类: 类
- 导入: `import { WorkspaceCommonToolPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### 声明

```text
export declare class WorkspaceCommonToolPort implements CommonToolProviderPort {
    constructor(workspace: WorkspaceRuntimePort);
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactManagerCommonToolPortOptions`

Artifact Manager Common Tool Port Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactManagerCommonToolPortOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### 声明

```text
export interface ArtifactManagerCommonToolPortOptions {
    profileRef: SpecRef;
    maxReadBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxReadBytes` | 属性 | <code>maxReadBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CommonToolProviderPort`

Common Tool Provider Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommonToolProviderPort } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### 声明

```text
export interface CommonToolProviderPort {
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `CommonToolProviderRequest`

Structural mirror of the tools-owned CommonToolPort boundary.

- 种类: 接口
- 导入: `import type { CommonToolProviderRequest } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### 声明

```text
export interface CommonToolProviderRequest {
    operation: string;
    input: Record<string, unknown>;
    context: ToolCallContext;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GovernedCommandDispatchFactory`

Governed Command Dispatch Factory 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { GovernedCommandDispatchFactory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### 声明

```text
export type GovernedCommandDispatchFactory = (request: CommonToolProviderRequest) => Promise<ExecutionDispatchRequest> | ExecutionDispatchRequest;
```
