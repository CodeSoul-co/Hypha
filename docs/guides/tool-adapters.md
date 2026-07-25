# Tool Adapter Guide

Implement `ToolAdapter` for provider-specific execution. The required methods are `capabilities`,
`execute`, and `health`; `cancel` and `close` are declared through capabilities when supported.

```ts
class ExampleAdapter implements ToolAdapter {
  readonly id = 'example';
  readonly source = 'custom' as const;

  async capabilities() {
    return { execute: true, cancel: false, health: true, close: false };
  }

  async execute(request: AdapterExecutionRequest) {
    return { output: await providerCall(request.input) };
  }

  async health() {
    return { status: 'healthy' as const, checkedAt: new Date().toISOString() };
  }
}
```

Register the immutable Tool contract and adapter with `ToolRegistry.registerAdapter`, then invoke
only through `GovernedToolRunner.run`. Do not perform policy, approval, Invocation persistence, or
retry inside the adapter. Preserve `AbortSignal`, normalize provider errors at the boundary, and
return large or binary values for runner-managed artifactization.

Use `LocalFunctionToolAdapter`, `PluginToolAdapter`, `MockToolAdapter`, `HttpToolAdapter`, or
`MCPToolAdapter` when their transport already matches the provider. Command/file adapters must call
an execution port such as `WorkspaceRuntimePort`; MCP adapters call a gateway port and never expose
an SDK client to an Agent or Domain module.

Run `packages/tools/src/adapter-contract.test.ts` for the common contract and add provider-specific
tests for cancellation, timeout, close cleanup, error mapping, and output shape.
