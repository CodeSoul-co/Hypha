# RFC: Remote Sandbox Provider Contract

## Summary

Hypha should expose a provider-neutral `RemoteSandboxProvider` contract that extends the governed
`SandboxProvider` lifecycle with remote output streaming and Artifact transfer. The contract must
not expose vendor SDK requests, responses, handles, or transport clients to Core or Kernel code.

## Motivation

The common `SandboxProvider` already covers create, start, execute, cancel, terminate, status,
cleanup, health, and execution receipts. A remote Sandbox also needs a bounded way to stream command
output and transfer Artifact content across the provider boundary. Leaving those operations to
adapter-specific methods would make Runtime depend on provider SDK shapes and would weaken
authorization, idempotency, integrity, and replay evidence.

## Proposed API Shape

`RemoteSandboxProvider` extends `SandboxProvider` and narrows its capabilities so
`remoteExecution` is always `true`. It adds three operations:

```ts
export interface RemoteSandboxProvider extends SandboxProvider {
  capabilities(): Promise<RemoteSandboxProviderCapabilities>;
  streamOutput(request: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
  uploadArtifact(
    request: RemoteArtifactUploadRequest,
    chunks: AsyncIterable<RemoteArtifactChunk>
  ): Promise<RemoteArtifactTransferReceipt>;
  downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable<RemoteArtifactChunk>;
}
```

Requests carry the operation identity, principal, Sandbox or execution identity, correlation
evidence, and bounded transfer expectations. Artifact chunks carry a logical Artifact reference,
monotonic sequence, contiguous byte offset, base64 content, byte length, per-chunk hash, and an
explicit final marker. Transfer receipts carry the provider identity, direction, final status,
observed byte count, whole-content hash, and receipt hash.

The contract defines no remote endpoint, credential, queue, HTTP client, RPC client, object-store
client, or provider job type. Those details remain inside concrete adapters.

## Validation and Failure Rules

- Zod validators reject unknown request, chunk, and receipt fields.
- JSON Schemas remain in parity with public serializable contracts.
- Upload and download chunk sequences start at zero, remain contiguous, use contiguous byte
  offsets, contain exactly one final chunk, and match the declared transfer size.
- Completed transfer receipts require whole-content integrity evidence.
- Provider implementations normalize vendor failures into existing Hypha execution errors and must
  treat unknown remote completion state as unknown rather than successful.
- Runtime or Harness remains responsible for authorization, policy, events, replay, and durable
  records around the provider call.

## Compatibility

Existing Mock, Local Process, and Docker providers continue implementing `SandboxProvider` without
new methods. Only remote adapters implement `RemoteSandboxProvider`. Workspace, Artifact, Runtime,
Memory, Tool, Domain, and Cache ownership does not change. Existing `CommandOutputChunk` and
`ExecutionReceipt` remain the execution streaming and command receipt formats.

## Security and Reliability

- Artifact bytes never appear in provider metadata or receipts.
- Transfer requests are principal-scoped and size-bounded.
- Integrity hashes are evidence, not authorization or trust decisions.
- Stream cancellation is expressed by closing the async iterator and by the existing governed
  execution cancellation operation; no hidden provider cancellation API is introduced.
- A concrete remote adapter must prove retry, idempotency, timeout, cancellation, receipt, and
  cleanup behavior with contract tests before advertising the capability.

## Open Questions

- Whether a future transport-neutral resume token is needed for multi-gigabyte Artifact transfers.
- Whether remote log retention requires a separate durable cursor contract beyond sequence numbers.
- Whether remote attestation should become a separate signed capability contract.
