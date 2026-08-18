# `@codesoul-co/hypha-adapters-local` / `local-process-output-stream-registry`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-output-stream-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)
- 导出数: **2**

## 模块用法

用于注册并解析版本化能力或实现。Local process output stream registry 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  LocalProcessOutputStreamRegistry,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessOutputStreamRegistryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessOutputStreamRegistry` | 类 | <code>new LocalProcessOutputStreamRegistry(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8. |
| `LocalProcessOutputStreamRegistryOptions` | 接口 | <code>interface LocalProcessOutputStreamRegistryOptions</code> | Local Process Output Stream Registry Options 接口，共包含 3 个公开字段或方法。 |

## `LocalProcessOutputStreamRegistry`

Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8.

- 种类: 类
- 导入: `import { LocalProcessOutputStreamRegistry } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-stream-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)

### 声明

```text
export declare class LocalProcessOutputStreamRegistry {
    constructor(options?: LocalProcessOutputStreamRegistryOptions);
    begin(executionId: string, principal: ExecutionPrincipal): void;
    publish(executionId: string, stream: CommandOutputChunk['stream'], bytes: Uint8Array, truncated?: boolean): CommandOutputChunk;
    complete(executionId: string): void;
    stream(request: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `begin` | 方法 | <code>begin(executionId: string, principal: ExecutionPrincipal): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `complete` | 方法 | <code>complete(executionId: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | 创建该类的实例。 |
| `publish` | 方法 | <code>publish(executionId: string, stream: CommandOutputChunk["stream"], bytes: Uint8Array, truncated?: boolean): CommandOutputChunk</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stream` | 方法 | <code>stream(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalProcessOutputStreamRegistryOptions`

Local Process Output Stream Registry Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalProcessOutputStreamRegistryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-output-stream-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)

### 声明

```text
export interface LocalProcessOutputStreamRegistryOptions {
    maxRetainedChunks?: number;
    maxTrackedExecutions?: number;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxRetainedChunks` | 属性 | <code>maxRetainedChunks?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTrackedExecutions` | 属性 | <code>maxTrackedExecutions?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
