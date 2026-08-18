# `@codesoul-co/hypha-adapters-local` / `remote-sandbox-provider-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/remote-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)
- 导出数: **3**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Remote sandbox provider factory 模块公开 1 类、1 常量、1 接口。

### 从包入口导入

```ts
import {
  RemoteSandboxProviderFactory,
  REMOTE_SANDBOX_PROVIDER_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  RemoteSandboxProviderFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RemoteSandboxProviderFactory` | 类 | <code>new RemoteSandboxProviderFactory(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory. |
| `REMOTE_SANDBOX_PROVIDER_ID` | 常量 | <code>const REMOTE_SANDBOX_PROVIDER_ID: "provider.remote-sandbox"</code> | 由 `remote-sandbox-provider-factory` 模块导出的 REMOTE SANDBOX PROVIDER ID 常量。 |
| `RemoteSandboxProviderFactoryOptions` | 接口 | <code>interface RemoteSandboxProviderFactoryOptions extends Omit&lt;RemoteSandboxHttpTransportOptions, 'baseUrl'&gt;</code> | Remote Sandbox Provider Factory Options 接口，共包含 10 个公开字段或方法。 |

## `RemoteSandboxProviderFactory`

Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory.

- 种类: 类
- 导入: `import { RemoteSandboxProviderFactory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`remote-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)

### 声明

```text
export declare class RemoteSandboxProviderFactory implements SandboxProviderFactory {
    readonly providerType: "remote_sandbox";
    readonly providerId: string;
    constructor(options: RemoteSandboxProviderFactoryOptions);
    create(): SandboxProvider;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): SandboxProvider</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerType` | 属性 | <code>readonly providerType: "remote_sandbox"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `REMOTE_SANDBOX_PROVIDER_ID`

由 `remote-sandbox-provider-factory` 模块导出的 REMOTE SANDBOX PROVIDER ID 常量。

- 种类: 常量
- 导入: `import { REMOTE_SANDBOX_PROVIDER_ID } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`remote-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)

### 声明

```text
export declare const REMOTE_SANDBOX_PROVIDER_ID: "provider.remote-sandbox";
```

## `RemoteSandboxProviderFactoryOptions`

Remote Sandbox Provider Factory Options 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteSandboxProviderFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`remote-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)

### 声明

```text
export interface RemoteSandboxProviderFactoryOptions extends Omit<RemoteSandboxHttpTransportOptions, 'baseUrl'> {
    baseUrl: string;
    providerId?: string;
    transport?: RemoteSandboxTransport;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `credentialProvider` | 方法 | <code>credentialProvider(): Promise&lt;RemoteSandboxHttpCredential&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, request: RemoteSandboxHttpRequest): Promise&lt;RemoteSandboxHttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `maxCredentialTtlMs` | 属性 | <code>maxCredentialTtlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxNdjsonLineCharacters` | 属性 | <code>maxNdjsonLineCharacters?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `minCredentialRemainingMs` | 属性 | <code>minCredentialRemainingMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestTimeoutMs` | 属性 | <code>requestTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transport` | 属性 | <code>transport?: RemoteSandboxTransport</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
