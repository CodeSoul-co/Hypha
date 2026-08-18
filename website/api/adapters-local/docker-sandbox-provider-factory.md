# `@codesoul-co/hypha-adapters-local` / `docker-sandbox-provider-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/docker-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DockerSandboxProviderFactory` | class | <code>new DockerSandboxProviderFactory(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry. |
| `DOCKER_SANDBOX_PROVIDER_ID` | constant | <code>const DOCKER_SANDBOX_PROVIDER_ID: "provider.docker"</code> | DOCKER SANDBOX PROVIDER ID constant exported by the `docker-sandbox-provider-factory` module. |
| `DockerSandboxProviderFactoryOptions` | interface | <code>interface DockerSandboxProviderFactoryOptions</code> | Field contract for Docker Sandbox Provider Factory Options; see all contract members below. |

## `DockerSandboxProviderFactory` public members

Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): SandboxProvider</code> | Creates create at this module boundary. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerType` | property | <code>providerType: "docker"</code> | Public provider Type property. |

## `DockerSandboxProviderFactoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dockerPath` | property | <code>dockerPath: string</code> | Public docker Path property. |
| `engineScopeId` | property | <code>engineScopeId: string</code> | Public engine Scope Id property. |
| `outputArtifacts` | property | <code>outputArtifacts: DockerExecutionArtifactStreamPort</code> | Public output Artifacts property. |
| `policy` | property | <code>policy: DockerExecutionPolicyResolverOptions</code> | Public policy property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `transport` | property | <code>transport: DockerCommandTransport</code> | Public transport property. |
