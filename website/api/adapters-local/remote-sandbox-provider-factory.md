# `@codesoul-co/hypha-adapters-local` / `remote-sandbox-provider-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/remote-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RemoteSandboxProviderFactory` | class | <code>new RemoteSandboxProviderFactory(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory. |
| `REMOTE_SANDBOX_PROVIDER_ID` | constant | <code>const REMOTE_SANDBOX_PROVIDER_ID: "provider.remote-sandbox"</code> | REMOTE SANDBOX PROVIDER ID constant exported by the `remote-sandbox-provider-factory` module. |
| `RemoteSandboxProviderFactoryOptions` | interface | <code>interface RemoteSandboxProviderFactoryOptions extends Omit&lt;RemoteSandboxHttpTransportOptions, 'baseUrl'&gt;</code> | Field contract for Remote Sandbox Provider Factory Options; see all contract members below. |

## `RemoteSandboxProviderFactory` public members

Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): SandboxProvider</code> | Creates create at this module boundary. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerType` | property | <code>providerType: "remote_sandbox"</code> | Public provider Type property. |

## `RemoteSandboxProviderFactoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `credentialProvider` | method | <code>credentialProvider(): Promise&lt;RemoteSandboxHttpCredential&gt;</code> | Public runtime operation for credential Provider. |
| `fetch` | method | <code>fetch(url: string, request: RemoteSandboxHttpRequest): Promise&lt;RemoteSandboxHttpResponse&gt;</code> | Public runtime operation for fetch. |
| `maxCredentialTtlMs` | property | <code>maxCredentialTtlMs: number</code> | Public max Credential Ttl Ms property. |
| `maxNdjsonLineCharacters` | property | <code>maxNdjsonLineCharacters: number</code> | Public max Ndjson Line Characters property. |
| `minCredentialRemainingMs` | property | <code>minCredentialRemainingMs: number</code> | Public min Credential Remaining Ms property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `requestTimeoutMs` | property | <code>requestTimeoutMs: number</code> | Public request Timeout Ms property. |
| `transport` | property | <code>transport: RemoteSandboxTransport</code> | Public transport property. |
