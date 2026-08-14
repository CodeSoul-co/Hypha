# `@codesoul-co/hypha-memory`

`hypha-memory` defines governed working, episodic, semantic, vector and artifact-backed memory. It separates portable specs and a `MemoryManager` port from local, self-hosted and managed provider implementations.

```bash
npm install @codesoul-co/hypha-memory@1.0.1
```

## Main surfaces

| Area | Representative exports |
| --- | --- |
| Configuration | `memorySpecDefinition`, `memoryProfileSpecDefinition`, validation helpers |
| Runtime | `MemoryManager`, `GovernedMemoryManager`, `NativeMemoryRuntime` |
| Context | `ContextBuilder`, `ContextGateway`, compaction and artifact validation |
| Providers | native, Mem0, Hindsight and MemoryBank factories/clients |
| Reliability | lifecycle workers, outbox, leases, dead letters and reconciliation |
| Evaluation | evaluation cases, operational metrics and provider evidence |

## Validate a portable memory spec

```ts
import {
  memorySpecDefinition,
  validateMemorySpec,
} from '@codesoul-co/hypha-memory';

const memory = validateMemorySpec({
  ...memorySpecDefinition.example,
  id: 'memory.release',
  version: '1.0.0',
});
```

The spec declares behavior and capability requirements. Bind the concrete provider, stores and credentials in trusted application composition.

## Scope every operation

A memory record/search should carry the narrowest available identity:

| Scope | Typical use |
| --- | --- |
| User | Long-lived user preferences or durable knowledge |
| Session | Conversation/product context shared by several Runs |
| Run | Evidence and working context for one execution |
| Workspace | Files/artifacts controlled by one workspace boundary |

Do not collapse these into a single global namespace. Provider keys, cache keys, delete operations and reconciliation jobs must enforce the same scope.

## Govern reads and writes

```text
request
  → validate scope and principal
  → policy/privacy/retention decision
  → provider operation
  → normalized result or error
  → Event + provider-return evidence
  → projection/cache invalidation
```

Memory writes are effects. They require policy, trace and idempotency handling just like Tool or external writes. Retrieval results should retain provenance so the Agent can distinguish verified evidence from recalled context.

## Provider choices

- Native/local composition is suitable for local-first development and deterministic tests.
- Self-hosted factories support controlled infrastructure.
- Managed providers require secret resolution, pagination, capability negotiation and failure normalization.
- Hybrid composition can combine structured records, vector search and artifacts.

Provider availability does not grant permission. Select providers through a profile and expose only approved capabilities to a Domain Pack/Agent.

## Reliability and testing

Test add/search/update/delete, retention, user isolation, cursor pagination, cancellation, provider timeouts, outbox redelivery and permanent failure/dead-letter handling. A replay must rebuild Memory-related product state from Events without assuming the external index is the source of truth.

For local stores, see [`hypha-adapters-local`](./adapters-local).

