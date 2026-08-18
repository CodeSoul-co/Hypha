# `@codesoul-co/hypha-adapters-local` / `docker-sandbox-provider-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/docker-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)
- 导出数: **3**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Docker sandbox provider factory 模块公开 1 类、1 常量、1 接口。

### 从包入口导入

```ts
import {
  DockerSandboxProviderFactory,
  DOCKER_SANDBOX_PROVIDER_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  DockerSandboxProviderFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DockerSandboxProviderFactory` | 类 | <code>new DockerSandboxProviderFactory(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry. |
| `DOCKER_SANDBOX_PROVIDER_ID` | 常量 | <code>const DOCKER_SANDBOX_PROVIDER_ID: "provider.docker"</code> | 由 `docker-sandbox-provider-factory` 模块导出的 DOCKER SANDBOX PROVIDER ID 常量。 |
| `DockerSandboxProviderFactoryOptions` | 接口 | <code>interface DockerSandboxProviderFactoryOptions</code> | Docker Sandbox Provider Factory Options 接口，共包含 6 个公开字段或方法。 |

## `DockerSandboxProviderFactory`

Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry.

- 种类: 类
- 导入: `import { DockerSandboxProviderFactory } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`docker-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)

### 声明

```text
export declare class DockerSandboxProviderFactory implements SandboxProviderFactory {
    readonly providerType: "docker";
    readonly providerId: string;
    constructor(options: DockerSandboxProviderFactoryOptions);
    create(): SandboxProvider;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): SandboxProvider</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerType` | 属性 | <code>readonly providerType: "docker"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DOCKER_SANDBOX_PROVIDER_ID`

由 `docker-sandbox-provider-factory` 模块导出的 DOCKER SANDBOX PROVIDER ID 常量。

- 种类: 常量
- 导入: `import { DOCKER_SANDBOX_PROVIDER_ID } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`docker-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)

### 声明

```text
export declare const DOCKER_SANDBOX_PROVIDER_ID: "provider.docker";
```

## `DockerSandboxProviderFactoryOptions`

Docker Sandbox Provider Factory Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DockerSandboxProviderFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`docker-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)

### 声明

```text
export interface DockerSandboxProviderFactoryOptions {
    engineScopeId: string;
    policy: DockerExecutionPolicyResolverOptions;
    outputArtifacts: DockerExecutionArtifactStreamPort;
    providerId?: string;
    dockerPath?: string;
    transport?: DockerCommandTransport;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dockerPath` | 属性 | <code>dockerPath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `engineScopeId` | 属性 | <code>engineScopeId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputArtifacts` | 属性 | <code>outputArtifacts: DockerExecutionArtifactStreamPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policy` | 属性 | <code>policy: DockerExecutionPolicyResolverOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transport` | 属性 | <code>transport?: DockerCommandTransport</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
