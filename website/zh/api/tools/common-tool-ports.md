# `@codesoul-co/hypha-tools` / `common-tool-ports`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/common-tool-ports.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)
- 导出数: **14**

## 模块用法

用于定义或实现 Provider-neutral Port。Common tool ports 模块公开 9 常量、1 函数、4 接口。

### 从包入口导入

```ts
import {
  artifactUtilityToolSpec,
  commandUtilityToolSpec,
  commonPortToolSpecs,
  fileUtilityToolSpec,
  hashReferenceUtilityToolSpec,
  httpFetchUtilityToolSpec,
  mcpResourceUtilityToolSpec,
  memoryUtilityToolSpec,
} from '@codesoul-co/hypha-tools';

import type {
  CommonToolBinding,
  CommonToolPort,
  CommonToolPortRequest,
  CommonToolPorts,
} from '@codesoul-co/hypha-tools';

// 完整导出列表见下方。
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 9 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactUtilityToolSpec` | 常量 | <code>const artifactUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 Artifact Utility Tool Spec 常量。 |
| `commandUtilityToolSpec` | 常量 | <code>const commandUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 Command Utility Tool Spec 常量。 |
| `commonPortToolSpecs` | 常量 | <code>const commonPortToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | 由 `common-tool-ports` 模块导出的 Common Port Tool Specs 常量。 |
| `fileUtilityToolSpec` | 常量 | <code>const fileUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 File Utility Tool Spec 常量。 |
| `hashReferenceUtilityToolSpec` | 常量 | <code>const hashReferenceUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 Hash Reference Utility Tool Spec 常量。 |
| `httpFetchUtilityToolSpec` | 常量 | <code>const httpFetchUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 Http Fetch Utility Tool Spec 常量。 |
| `mcpResourceUtilityToolSpec` | 常量 | <code>const mcpResourceUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 MCP Resource Utility Tool Spec 常量。 |
| `memoryUtilityToolSpec` | 常量 | <code>const memoryUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 Memory Utility Tool Spec 常量。 |
| `searchUtilityToolSpec` | 常量 | <code>const searchUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 Search Utility Tool Spec 常量。 |
| `createPortBackedCommonToolBindings` | 函数 | <code>createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[]</code> | Create Port Backed Common Tool Bindings 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CommonToolBinding` | 接口 | <code>interface CommonToolBinding</code> | Common Tool Binding 接口，共包含 2 个公开字段或方法。 |
| `CommonToolPort` | 接口 | <code>interface CommonToolPort</code> | Common Tool Port 接口，共包含 1 个公开字段或方法。 |
| `CommonToolPortRequest` | 接口 | <code>interface CommonToolPortRequest</code> | Common Tool Port Request 接口，共包含 3 个公开字段或方法。 |
| `CommonToolPorts` | 接口 | <code>interface CommonToolPorts</code> | Common Tool Ports 接口，共包含 8 个公开字段或方法。 |

## `artifactUtilityToolSpec`

由 `common-tool-ports` 模块导出的 Artifact Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { artifactUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const artifactUtilityToolSpec: ToolSpec;
```

## `commandUtilityToolSpec`

由 `common-tool-ports` 模块导出的 Command Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { commandUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const commandUtilityToolSpec: ToolSpec;
```

## `commonPortToolSpecs`

由 `common-tool-ports` 模块导出的 Common Port Tool Specs 常量。

- 种类: 常量
- 导入: `import { commonPortToolSpecs } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const commonPortToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec];
```

## `fileUtilityToolSpec`

由 `common-tool-ports` 模块导出的 File Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { fileUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const fileUtilityToolSpec: ToolSpec;
```

## `hashReferenceUtilityToolSpec`

由 `common-tool-ports` 模块导出的 Hash Reference Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { hashReferenceUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const hashReferenceUtilityToolSpec: ToolSpec;
```

## `httpFetchUtilityToolSpec`

由 `common-tool-ports` 模块导出的 Http Fetch Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { httpFetchUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const httpFetchUtilityToolSpec: ToolSpec;
```

## `mcpResourceUtilityToolSpec`

由 `common-tool-ports` 模块导出的 MCP Resource Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { mcpResourceUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const mcpResourceUtilityToolSpec: ToolSpec;
```

## `memoryUtilityToolSpec`

由 `common-tool-ports` 模块导出的 Memory Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { memoryUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const memoryUtilityToolSpec: ToolSpec;
```

## `searchUtilityToolSpec`

由 `common-tool-ports` 模块导出的 Search Utility Tool Spec 常量。

- 种类: 常量
- 导入: `import { searchUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare const searchUtilityToolSpec: ToolSpec;
```

## `createPortBackedCommonToolBindings`

Create Port Backed Common Tool Bindings 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createPortBackedCommonToolBindings } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export declare function createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[];
```

### 调用签名

```text
createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `ports` | <code>CommonToolPorts</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CommonToolBinding[]`
- 说明: 返回值契约由上述类型定义。

## `CommonToolBinding`

Common Tool Binding 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommonToolBinding } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export interface CommonToolBinding {
    spec: ToolSpec;
    adapter: ToolAdapter;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapter` | 属性 | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: ToolSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CommonToolPort`

Common Tool Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommonToolPort } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export interface CommonToolPort {
    execute(request: CommonToolPortRequest): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: CommonToolPortRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `CommonToolPortRequest`

Common Tool Port Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommonToolPortRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export interface CommonToolPortRequest {
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

## `CommonToolPorts`

Common Tool Ports 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CommonToolPorts } from '@codesoul-co/hypha-tools';`
- 源码模块: [`common-tool-ports`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)

### 声明

```text
export interface CommonToolPorts {
    files: CommonToolPort;
    artifacts: CommonToolPort;
    httpFetch: CommonToolPort;
    search: CommonToolPort;
    memory: CommonToolPort;
    command: CommonToolPort;
    mcpResource: CommonToolPort;
    hashReference: CommonToolPort;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `command` | 属性 | <code>command: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `files` | 属性 | <code>files: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hashReference` | 属性 | <code>hashReference: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `httpFetch` | 属性 | <code>httpFetch: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpResource` | 属性 | <code>mcpResource: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memory` | 属性 | <code>memory: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `search` | 属性 | <code>search: CommonToolPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
