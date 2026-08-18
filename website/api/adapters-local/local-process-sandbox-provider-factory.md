# `@codesoul-co/hypha-adapters-local` / `local-process-sandbox-provider-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessSandboxProviderFactory` | class | <code>new LocalProcessSandboxProviderFactory(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands. |
| `LOCAL_PROCESS_SANDBOX_PROVIDER_ID` | constant | <code>const LOCAL_PROCESS_SANDBOX_PROVIDER_ID: "provider.local-process"</code> | LOCAL PROCESS SANDBOX PROVIDER ID constant exported by the `local-process-sandbox-provider-factory` module. |
| `LocalProcessSandboxProviderFactoryOptions` | type | <code>type LocalProcessSandboxProviderFactoryOptions = Omit&lt;LocalProcessExecutionProviderOptions, 'id'&gt; &amp; { providerId?: string; createWorkspaceRoot?: boolean; }</code> | Public type alias for Local Process Sandbox Provider Factory Options. |

## `LocalProcessSandboxProviderFactory` public members

Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): Promise&lt;SandboxProvider&gt;</code> | Creates create at this module boundary. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerType` | property | <code>providerType: "local_process"</code> | Public provider Type property. |
