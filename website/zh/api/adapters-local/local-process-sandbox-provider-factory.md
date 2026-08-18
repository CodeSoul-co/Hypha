# `@codesoul-co/hypha-adapters-local` / `local-process-sandbox-provider-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)
- 导出数: **3**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Local process sandbox provider factory 模块公开 1 类、1 常量、1 类型。

### 从包入口导入

```ts
import {
  LocalProcessSandboxProviderFactory,
  LOCAL_PROCESS_SANDBOX_PROVIDER_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessSandboxProviderFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessSandboxProviderFactory` | 类 | <code>new LocalProcessSandboxProviderFactory(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands. |
| `LOCAL_PROCESS_SANDBOX_PROVIDER_ID` | 常量 | <code>const LOCAL_PROCESS_SANDBOX_PROVIDER_ID: "provider.local-process"</code> | 由 `local-process-sandbox-provider-factory` 模块导出的 LOCAL PROCESS SANDBOX PROVIDER ID 常量。 |
| `LocalProcessSandboxProviderFactoryOptions` | 类型 | <code>type LocalProcessSandboxProviderFactoryOptions = Omit&lt;LocalProcessExecutionProviderOptions, 'id'&gt; &amp; { providerId?: string; createWorkspaceRoot?: boolean; }</code> | Local Process Sandbox Provider Factory Options 公共类型别名；完整类型表达式见声明。 |

## `LocalProcessSandboxProviderFactory`

Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands.

- 种类: 类
- 导入: `import { LocalProcessSandboxProviderFactory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)

### 声明

```text
export declare class LocalProcessSandboxProviderFactory implements SandboxProviderFactory {
    readonly providerType: "local_process";
    readonly providerId: string;
    constructor(options: LocalProcessSandboxProviderFactoryOptions);
    create(): Promise<SandboxProvider>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): Promise&lt;SandboxProvider&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerType` | 属性 | <code>readonly providerType: "local_process"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LOCAL_PROCESS_SANDBOX_PROVIDER_ID`

由 `local-process-sandbox-provider-factory` 模块导出的 LOCAL PROCESS SANDBOX PROVIDER ID 常量。

- 种类: 常量
- 导入: `import { LOCAL_PROCESS_SANDBOX_PROVIDER_ID } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)

### 声明

```text
export declare const LOCAL_PROCESS_SANDBOX_PROVIDER_ID: "provider.local-process";
```

## `LocalProcessSandboxProviderFactoryOptions`

Local Process Sandbox Provider Factory Options 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { LocalProcessSandboxProviderFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`local-process-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)

### 声明

```text
export type LocalProcessSandboxProviderFactoryOptions = Omit<LocalProcessExecutionProviderOptions, 'id'> & {
    providerId?: string;
    createWorkspaceRoot?: boolean;
};
```
