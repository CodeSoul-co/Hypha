# `@codesoul-co/hypha-core` / `modules/sandbox-provider/registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/sandbox-provider/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SandboxProviderRegistry` | class | <code>new SandboxProviderRegistry(): SandboxProviderRegistry</code> | Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core. |
| `SandboxProviderRegistration` | interface | <code>interface SandboxProviderRegistration</code> | Field contract for Sandbox Provider Registration; see all contract members below. |

## `SandboxProviderRegistry` public members

Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): SandboxProviderRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(selection: SandboxProviderSelection): Promise&lt;SandboxProvider&gt;</code> | Creates create at this module boundary. |
| `list` | method | <code>list(providerType?: SandboxProviderType): SandboxProviderRegistration[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(factory: SandboxProviderFactory): void</code> | Registers register at this module boundary. |
| `resolve` | method | <code>resolve(selection: SandboxProviderSelection): SandboxProviderFactory</code> | Resolves resolve at this module boundary. |
| `unregister` | method | <code>unregister(providerType: SandboxProviderType, providerId: string): boolean</code> | Public runtime operation for unregister. |

## `SandboxProviderRegistration` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerType` | property | <code>providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public provider Type property. |
