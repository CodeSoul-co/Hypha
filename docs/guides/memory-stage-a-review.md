# Memory Stage A Review Handoff

- Review date: 2026-07-21
- Branch: `memory`
- Stage A base: `5536e81da7edbf3063d563c7b54b5118124b9774`
- Decision: `APPROVED_FOR_DEV_INTEGRATION`

This decision means the frozen Memory Framework scope is internally consistent, reviewable, and safe for `dev` to consume through public APIs. It does **not** mean Server integration, every provider deployment, or the complete Memory engineering specification is finished.

## 1. Frozen scope

### Review-ready

- `MemoryApplicationService` and `MemoryRuntimeFactory` public composition contract.
- Strict runtime configuration boundary and fail-fast provider registration.
- `native-lite` Framework profile and single-process topology.
- `native-default` Framework deployment contract: Redis working state, Mongo structured record/history, local vector/artifact adapter references, fenced distributed-store coordination, and outbox; HA remains unpublished.
- Native persistence, outbox, lifecycle, worker, bounded recovery, deletion evidence, and migration contracts already covered by the package suite.
- Three released external profiles at protocol-contract level; the additional local protocol client is an unpublished development fixture.
- Public consumer composition from factory to service, context builder/gateway, health/resources, and close.

### Deferred or controlled

- Server routes, Chat, Workflow, Harness default-path integration, and legacy path retirement belong to `dev`.
- Server assembly of `native-default` Redis/Mongo clients and deployment readiness belongs to `dev`; the repository integration suite did exercise real Redis/Mongo dependencies successfully.
- Mem0 OSS live-service lifecycle tests were not run because its endpoint was absent. Its status is `contract-validated`, not `live-validated`.
- The former MemoryBank Local template is withdrawn: `hypha.memorybank.v1` has no selected deployable product and remains only an unpublished protocol fixture.
- Mem0 Platform and Vertex AI Memory Bank tests were not run because controlled-cloud credentials were absent. Their status is `controlled-test`.
- Windows symlink permission verification remains a CI/environment gate.

No deferred item is represented as working product behavior or as a passed live test.

## 2. Stage A commits

| Commit                                     | Responsibility                                                                                                    | Plan mapping   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | -------------- |
| `3d17a6e52785af59a1c8f2bf90374a855e0852cd` | Align native profile topology, harden credential-reference validation, and synchronize the support matrix         | A1, A5, A7     |
| `7d2071c3c4db158333d3b9447d943ff41660f7f5` | Bind the shared lifecycle to concrete clients, add a public consumer fixture, and extend live integration entries | A2, A3, A6, A7 |
| Review-handoff commit                      | Record evidence, limitations, compatibility, and the unambiguous review decision                                  | A0, A8         |

## 3. Changed files and ownership

| File                                                              | Responsibility                                                                                                                            |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `configs/memory-profiles.yaml`                                    | Honest Framework profile status and native topology declarations                                                                          |
| `packages/memory/src/memory-runtime-factory.ts`                   | Strict rejection of inline credentials while allowing validated environment/secret references                                             |
| `packages/memory/src/memory-runtime-config-validation.test.ts`    | Unknown fields, reference format, profile/provider drift, and duplicate factory rejection                                                 |
| `packages/memory/src/provider-profile-templates.test.ts`          | Profile parity, topology separation, and credential leakage assertions                                                                    |
| `packages/memory/src/external-provider-concrete-contract.test.ts` | Shared full lifecycle against concrete client classes using stateful protocol transports; local protocol coverage is not product evidence |
| `packages/memory/src/memory-consumer-composition.test.ts`         | Public-only consumer assembly and partial-installation fail-fast behavior                                                                 |
| `tests/integration/memory-external-providers.integration.test.ts` | Credential-gated lifecycle entries for local providers and controlled-cloud smoke entries                                                 |
| `docs/guides/memory-provider-profiles.md`                         | Evidence-aligned status definitions, topology, protocol boundary, and handoff boundary                                                    |
| `docs/guides/memory-stage-a-review.md`                            | This review package                                                                                                                       |

All implementation changes are inside the `memory` branch owner boundary. No Server route or composition-root code was changed.

## 4. Framework traceability matrix

| Work package                   | Stage A evidence                                                                                                           | Status after A                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| M1 Single composition contract | Public consumer fixture creates the canonical factory/service/context lifecycle without internal imports                   | Framework review-ready; Server migration deferred             |
| M2 Native Redis + Mongo        | Store topology, fenced lease recovery, and deterministic multi-instance tests; no real partition/shared-vector HA evidence | Framework contract ready; non-HA; Server assembly deferred    |
| M3 Mem0                        | Separate OSS/Platform clients execute the common stateful lifecycle; OSS live entry executes the same fixture when enabled | Contract-ready; live OSS and cloud evidence deferred          |
| M4 MemoryBank                  | Managed client executes the common stateful lifecycle; the local protocol client is an unpublished development fixture     | Managed controlled-test; no local product profile             |
| M5 Context/runtime             | Consumer fixture proves service-to-context builder/gateway wiring and explainability                                       | Framework review-ready; Chat/Workflow/Harness wiring deferred |
| M6 Operational reliability     | Existing health, worker, recovery, dead-letter, quota, deletion, outbox, and restart tests remain green in package suite   | Framework review-ready; Server supervision deferred           |
| M7 Documentation/templates     | Statuses now distinguish framework, contract, controlled, live, skipped, and deferred evidence                             | Review-ready                                                  |

## 5. Verification evidence

Commands were run from the repository root on 2026-07-21.

| Command                              | Result                                                                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                       | Passed                                                                                                                      |
| `npm run typecheck`                  | Passed after correcting an invalid test fixture source enum; rerun passed                                                   |
| `npm run build`                      | Passed for packages, Server, and CLI                                                                                        |
| `npm run test:packages`              | Passed on final full rerun: 161 files, 1,109 tests                                                                          |
| `npm run test:integration`           | Passed: 29 tests passed, 4 tests skipped, 1 suite skipped                                                                   |
| `npm run test:unit`                  | 65/66 passed; the sole failure is the pre-existing Windows symlink `EPERM` in `FilesystemTool.test.ts`, unrelated to Memory |
| Directed Stage A package set         | Passed: 6 files, 15 tests                                                                                                   |
| Final config/profile rerun           | Passed: 2 files, 4 tests                                                                                                    |
| Final concrete-client/consumer rerun | Passed: 2 files, 6 tests                                                                                                    |
| External-provider entry rerun        | 4 skipped because no endpoint or credential was configured; counted as not run                                              |

The first full package run had one transient MCP stdio timeout. The failing MCP test passed on a directed retry, and the subsequent complete package rerun passed all 1,109 tests. The final directed Vitest startup initially encountered sandbox `spawn EPERM`; the same command passed outside that restricted process sandbox.

The Windows symlink exception is not a green result. It must be rerun in a Windows CI agent with symlink permission before release, but it does not indicate a Memory implementation defect.

## 6. Provider evidence

| Provider/profile     | Mock/unit evidence                                          | Concrete contract evidence                                     | Live evidence in this run                                          | Declared status              |
| -------------------- | ----------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------- |
| `native-lite`        | Native/package suite                                        | Public consumer lifecycle                                      | Local package execution                                            | `framework-validated`        |
| `native-default`     | Native recovery, worker, persistence, and integration suite | Fenced multi-instance recovery contract                        | Real Redis/Mongo single-environment pass; no HA partition evidence | `framework-validated-non-ha` |
| `mem0-oss`           | Protocol and failure suites                                 | Full shared lifecycle passed against `Mem0OssClient`           | Not run: `HYPHA_TEST_MEM0_OSS_URL` absent                          | `contract-validated`         |
| `mem0-platform`      | v3 protocol and reconciliation suites                       | Full shared lifecycle passed against `Mem0PlatformClient`      | Not run: controlled token absent                                   | `controlled-test`            |
| `memorybank-managed` | Vertex protocol and resource mapping suites                 | Full shared lifecycle passed against `MemoryBankManagedClient` | Not run: controlled token absent                                   | `controlled-test`            |

The concrete lifecycle covers add, search, list, get, update, history, delete, and health through the common acceptance harness. Broader failure, scope, cancellation, idempotency, reconciliation, and unsupported-capability behavior remains covered by the existing focused package suites.

## 7. Consumer composition result

The consumer fixture imports only `packages/memory/src/index.ts`. It installs a concrete provider factory, creates `MemoryRuntimeFactory`, obtains `MemoryApplicationService`, performs a write and provider health check, builds and explains context through the installed gateway, exposes installation resources, and closes the runtime. A partial context installation fails before provider creation.

This demonstrates that `dev` can assemble the Framework without copying package internals. It does not claim that the current Server already does so.

## 8. Compatibility

- No existing public API, DTO, error code, or provider client constructor was removed or renamed.
- Profile status text and topology metadata were corrected; consumers treating these fields as documentation/config metadata should adopt the new explicit status values.
- Runtime secret scanning is stricter for plaintext values and now intentionally accepts only uppercase `*Env` names or credential-bearing `*Ref` values prefixed by `secret`, `env`, `vault`, or `credential`.
- Missing concrete providers continue to fail closed through registry resolution; no silent fallback was added.
- External local and managed dialect selection remains explicit; it is not inferred from a base URL.

## 9. Security and code hygiene

- `git diff --check` passed before each implementation commit.
- Changed files were scanned for representative API-token, OAuth-token, private-key, TODO, FIXME, placeholder, and silent-success patterns.
- No credential or user data was found. The only sensitive-pattern match is a negative assertion verifying that profile serialization does not contain token/private-key signatures.
- Test credentials are non-secret literals injected into mocked transports and never written to profile configuration.
- No unsupported capability fallback or fake success path was introduced.

## 10. Protocol references checked

- Mem0 Platform v3 add/search endpoint shape and Token authentication were checked against the official [add](https://docs.mem0.ai/api-reference/memory/add-memories) and [search](https://docs.mem0.ai/api-reference/memory/search-memories) references.
- Managed MemoryBank generate/retrieve, scope, direct memory source, resource name, revision, update, and delete mappings were checked against the official [Memory Bank guide](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/memory-bank/fetch-memories) and [Vertex AI RPC reference](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/reference/rpc/google.cloud.aiplatform.v1).

## 11. Known limitations and next ownership

1. `dev` must create the single Server Memory composition root and retire direct legacy Memory access.
2. `dev` must assemble production Redis/Mongo, migrations, readiness, credential resolution, worker start/drain, and shutdown behavior.
3. A release-capable environment must produce a real lifecycle report for Mem0 OSS before it may be called `live-validated`; MemoryBank Local cannot enter release acceptance unless a new RFC selects a concrete product.
4. Controlled cloud accounts must validate Mem0 Platform and Vertex AI Memory Bank before release enablement.
5. The Windows symlink test must pass in an appropriately privileged CI environment.
6. Full product E2E, migration rehearsal, Chat/Workflow/Harness routing, and release gates remain later phases.

## 12. Decision

`APPROVED_FOR_DEV_INTEGRATION`

The Stage A Framework delta contains no known incorrect code, its review-ready scope is supported by green Memory tests and public-consumer evidence, and all unavailable external evidence is explicitly deferred. This approval permits review and integration work; it is not a release approval and not a claim that the complete Memory specification is done.
