# `@codesoul-co/hypha-adapters-local` / `local-workspace-adapter`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-workspace-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)
- 导出数: **3**

## 模块用法

用于声明并实施 Workspace 作用域边界。Local workspace adapter 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  LocalWorkspaceAdapter,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalWorkspaceAdapterOptions,
  LocalWorkspaceCaptureOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalWorkspaceAdapter` | 类 | <code>new LocalWorkspaceAdapter(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | Adapts a governed Workspace root to Local Process mutation evidence. |
| `LocalWorkspaceAdapterOptions` | 接口 | <code>interface LocalWorkspaceAdapterOptions</code> | Local Workspace Adapter Options 接口，共包含 4 个公开字段或方法。 |
| `LocalWorkspaceCaptureOptions` | 接口 | <code>interface LocalWorkspaceCaptureOptions</code> | Local Workspace Capture Options 接口，共包含 1 个公开字段或方法。 |

## `LocalWorkspaceAdapter`

Adapts a governed Workspace root to Local Process mutation evidence.

- 种类: 类
- 导入: `import { LocalWorkspaceAdapter } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-workspace-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)

### 声明

```text
export declare class LocalWorkspaceAdapter {
    readonly workspaceRoot: string;
    constructor(options: LocalWorkspaceAdapterOptions);
    assertAvailable(): Promise<void>;
    capture(options?: LocalWorkspaceCaptureOptions): Promise<LocalWorkspaceSnapshot>;
    diff(before: LocalWorkspaceSnapshot, after: LocalWorkspaceSnapshot, detectedAt: string): FileMutation[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertAvailable` | 方法 | <code>assertAvailable(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capture` | 方法 | <code>capture(options?: LocalWorkspaceCaptureOptions): Promise&lt;LocalWorkspaceSnapshot&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | 创建该类的实例。 |
| `diff` | 方法 | <code>diff(before: LocalWorkspaceSnapshot, after: LocalWorkspaceSnapshot, detectedAt: string): FileMutation[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `workspaceRoot` | 属性 | <code>readonly workspaceRoot: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalWorkspaceAdapterOptions`

Local Workspace Adapter Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalWorkspaceAdapterOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-workspace-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)

### 声明

```text
export interface LocalWorkspaceAdapterOptions {
    workspaceRoot: string;
    maxTrackedFiles?: number;
    maxTrackedBytes?: number;
    maxCaptureDurationMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCaptureDurationMs` | 属性 | <code>maxCaptureDurationMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTrackedBytes` | 属性 | <code>maxTrackedBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTrackedFiles` | 属性 | <code>maxTrackedFiles?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalWorkspaceCaptureOptions`

Local Workspace Capture Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalWorkspaceCaptureOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-workspace-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)

### 声明

```text
export interface LocalWorkspaceCaptureOptions {
    abortSignal?: AbortSignal;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
