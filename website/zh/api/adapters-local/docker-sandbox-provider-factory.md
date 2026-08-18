# `@codesoul-co/hypha-adapters-local` / `docker-sandbox-provider-factory`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/docker-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DockerSandboxProviderFactory` | 类 | <code>new DockerSandboxProviderFactory(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry. |
| `DOCKER_SANDBOX_PROVIDER_ID` | 常量 | <code>const DOCKER_SANDBOX_PROVIDER_ID: "provider.docker"</code> | 由 `docker-sandbox-provider-factory` 模块导出的 DOCKER SANDBOX PROVIDER ID 常量。 |
| `DockerSandboxProviderFactoryOptions` | 接口 | <code>interface DockerSandboxProviderFactoryOptions</code> | Docker Sandbox Provider Factory Options 的字段契约；完整字段见下表。 |

## `DockerSandboxProviderFactory` 公开成员

Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(): SandboxProvider</code> | 创建 create。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerType` | 属性 | <code>providerType: "docker"</code> | provider Type 字段。 |

## `DockerSandboxProviderFactoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dockerPath` | 属性 | <code>dockerPath: string</code> | docker Path 字段。 |
| `engineScopeId` | 属性 | <code>engineScopeId: string</code> | engine Scope Id 字段。 |
| `outputArtifacts` | 属性 | <code>outputArtifacts: DockerExecutionArtifactStreamPort</code> | output Artifacts 字段。 |
| `policy` | 属性 | <code>policy: DockerExecutionPolicyResolverOptions</code> | policy 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `transport` | 属性 | <code>transport: DockerCommandTransport</code> | transport 字段。 |
