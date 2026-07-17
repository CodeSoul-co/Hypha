# RFC: Governed Execution Provider Requests

## Summary

Hypha execution providers should accept structured, runtime-validated request objects for every
stateful Sandbox and command operation. Raw sandbox or execution identifiers are insufficient at
the provider boundary because they cannot carry authorization, optimistic-concurrency, operation,
or idempotency evidence.

## Motivation

Sandbox lifecycle calls are side effects. A call such as `start(sandboxId)` identifies a target but
does not prove who requested the operation, which record revision was observed, or whether a retry
is the same operation. That makes policy enforcement, audit, replay, safe retries, and stale-writer
rejection dependent on hidden caller state.

The provider port should remain provider-neutral while making the governance evidence explicit.
Concrete local-process, container, and remote providers can then share the same contract without
exposing SDK-specific request or response types through Core.

## Proposed API Shape

`SandboxProvider` uses request contracts for stateful operations:

```ts
export interface SandboxProvider {
  readonly id: string;
  capabilities(): Promise<SandboxProviderCapabilities>;
  create(request: SandboxCreateRequest): Promise<SandboxRecord>;
  start(request: SandboxStartRequest): Promise<SandboxRecord>;
  execute(request: CommandExecutionRequest): Promise<CommandExecutionResult>;
  cancel(request: ExecutionCancelRequest): Promise<void>;
  terminate(request: SandboxTerminateRequest): Promise<void>;
  status(request: SandboxStatusRequest): Promise<SandboxRecord | null>;
  cleanup(request: SandboxCleanupRequest): Promise<void>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}
```

Mutation requests carry an `operationId`, `principal`, expected record revision, and optional
idempotency evidence. Status reads carry the principal so adapters can enforce the same ownership
boundary as mutations. Runtime validators reject undeclared fields and malformed boundary input.

Authorization still occurs before the provider side effect. The request records authorization
identity and concurrency evidence; it does not move policy decisions into the provider.

## Compatibility

This is a deliberate tightening of the shorthand provider signature that accepted raw identifiers.
Provider implementations must adapt their method parameters to the structured request objects.
There is no compatibility adapter in Core because silently synthesizing a principal, expected
revision, or operation identity would weaken the governance boundary.

The contracts remain provider-neutral and do not change the ownership split with Runtime, Tools,
Memory, Domain Packs, or Cache. Runtime selects and invokes providers; Tools and policy authorize
side effects; Memory may consume Artifact references; Cache consumes execution validity evidence.

## Validation and Evidence

- TypeScript interfaces define the public port and request shapes.
- Zod validators enforce boundary input at runtime.
- JSON Schemas and fixtures support non-TypeScript consumers and contract tests.
- Sandbox, command, event, store, and capability-negotiation tests guard identity and revision
  semantics.

## Open Questions

- Whether read-only status requests should later carry a correlation id for distributed tracing.
- Whether provider adapters need a shared conformance suite once the first concrete providers are
  implemented.
