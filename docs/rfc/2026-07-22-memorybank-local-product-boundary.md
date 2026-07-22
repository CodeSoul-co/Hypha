# RFC: MemoryBank Local product boundary

Status: accepted

Date: 2026-07-22

## Decision

Hypha does not publish a `memorybank-local` deployment profile. The existing
`hypha.memorybank.v1` HTTP client remains an internal protocol-development fixture, not a supported
product integration. Selecting a local MemoryBank profile therefore fails at configuration/profile
selection because no such profile is shipped.

Use the `mem0-oss` profile when a self-hosted external memory service is required. Use
`memorybank-managed` only for Google Vertex AI Agent Engine Memory Bank under its controlled-test
release gate.

## Context

The previous template named a Hypha-defined protocol but did not identify a distributable service,
container image, upstream version, license, migration policy, or operational owner. A mock transport
contract proves client behavior; it does not create a runnable product. Publishing that template
would make startup configuration appear deployable when no service can satisfy the claim.

The product names also have distinct meanings:

- Mem0 OSS is a self-hosted open-source product with a documented REST server.
- Vertex AI Agent Engine Memory Bank is a Google Cloud managed service addressed by project,
  location, and reasoning-engine resource names.
- `hypha.memorybank.v1` is only a Hypha protocol experiment and is not either product.

## Consequences

- `configs/memory-profiles.yaml` contains no `memorybank-local` profile.
- Public support tables do not report protocol-fixture tests as live product evidence.
- The protocol client and mock contract remain available for adapter development without a release
  claim.
- No new package, workspace entry, service process, or infrastructure dependency is introduced.
- A future local MemoryBank proposal must name a concrete upstream product and version, document its
  license and lifecycle, provide a runnable deployment recipe, and pass the shared live acceptance
  suite before restoring a public profile.

## Alternatives considered

### Relabel Mem0 OSS as MemoryBank Local

Rejected. The existing `mem0-oss` profile already names the product and protocol accurately. An
alias would blur provider identity, capability negotiation, migrations, and support ownership.

### Ship a new Hypha MemoryBank service

Rejected for this stage. That would create a new product and deployment surface rather than adapt an
existing provider, and it would require explicit package/workspace ownership and operational design.

### Keep the placeholder profile as experimental

Rejected. A selectable connection profile implies that a corresponding service can be installed.
An unpublished test fixture preserves protocol work without making that implication.