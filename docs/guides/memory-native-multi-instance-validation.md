# Native Memory multi-instance validation

`native-default` is a framework-validated, non-HA deployment contract. It is not a released high
availability profile.

## Proven behavior

The deterministic package suite starts independent worker objects against shared stores and verifies:

| Scenario               | Required result                                    | Evidence                                                          |
| ---------------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| Concurrent claim       | one task is leased and handled once                | `native-multi-instance-recovery.test.ts`                          |
| Lease drift/takeover   | a second owner can reclaim only after expiry       | lifecycle and outbox fencing tests                                |
| Stale owner completion | the old lease token is rejected after takeover     | lifecycle and outbox fencing tests                                |
| Restart                | durable task/outbox/idempotency state is recovered | `structured-reliability.test.ts`, `native-memory-runtime.test.ts` |
| Drain                  | shutdown waits for every supervised worker         | supervisor drain test                                             |

Every leased lifecycle or outbox record carries an attempt-specific `leaseToken`. Completion and
failure mutations require the current owner and token inside the store transaction. A worker whose
lease expired can finish its local computation, but it cannot mark a newer owner's claim completed or
failed.

## Deliberately unproven

The suite does not claim production HA because it does not provide all of the following evidence:

- two real Server processes using the release Redis and Mongo topology;
- a shared, multi-instance-safe vector store rather than `vector.local.in-memory`;
- network partition and recovery with real driver/session behavior;
- process kill during a provider side effect, followed by receipt reconciliation;
- rolling drain and restart under sustained traffic;
- measured readiness, lease-expiry, duplicate-effect, and recovery SLOs.

Accordingly, `configs/memory-profiles.yaml` declares `coordination: distributed-contract` and
`highAvailability: unpublished`. The profile must not be described as HA until a release environment
records the missing evidence. Assembly of that environment belongs to `dev`; the generic fencing
contracts and deterministic regression suite remain owned by `memory`.

## Release gate

A future HA claim must run an integration scenario with at least two independent processes and real
shared dependencies. The report must record dependency versions, topology, fault injection, exact
commands, timestamps, skipped cases, duplicate side effects, lease takeovers, drain duration, and
cleanup. A skipped partition or provider-side-effect case is not a pass.
