# `@codesoul-co/hypha-core` / `modules/sandbox-provider/registry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/sandbox-provider/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)
- 导出数: **2**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Registry 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SandboxProviderRegistry,
} from '@codesoul-co/hypha-core';

import type {
  SandboxProviderRegistration,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SandboxProviderRegistry` | 类 | <code>new SandboxProviderRegistry(): SandboxProviderRegistry</code> | Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core. |
| `SandboxProviderRegistration` | 接口 | <code>interface SandboxProviderRegistration</code> | Sandbox Provider Registration 接口，共包含 2 个公开字段或方法。 |

## `SandboxProviderRegistry`

Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core.

- 种类: 类
- 导入: `import { SandboxProviderRegistry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)

### 声明

```text
export declare class SandboxProviderRegistry {
    register(factory: SandboxProviderFactory): void;
    unregister(providerType: SandboxProviderType, providerId: string): boolean;
    list(providerType?: SandboxProviderType): SandboxProviderRegistration[];
    resolve(selection: SandboxProviderSelection): SandboxProviderFactory;
    create(selection: SandboxProviderSelection): Promise<SandboxProvider>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): SandboxProviderRegistry</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(selection: SandboxProviderSelection): Promise&lt;SandboxProvider&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(providerType?: SandboxProviderType): SandboxProviderRegistration[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(factory: SandboxProviderFactory): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(selection: SandboxProviderSelection): SandboxProviderFactory</code> | 公开方法；参数与返回类型以签名列为准。 |
| `unregister` | 方法 | <code>unregister(providerType: SandboxProviderType, providerId: string): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SandboxProviderRegistration`

Sandbox Provider Registration 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SandboxProviderRegistration } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/sandbox-provider/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)

### 声明

```text
export interface SandboxProviderRegistration {
    providerType: SandboxProviderType;
    providerId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerType` | 属性 | <code>providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
