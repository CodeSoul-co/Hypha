# Runtime Known Limitations

- `apps/server` still contains legacy orchestration paths. It has not completed migration to a
  protocol-only command/query adapter over the event-first Runtime.
- A durable Checkpoint Store and checkpoint compression/retention policy are not yet implemented
  for Runtime V2. Projections can rebuild from events, but large-stream checkpoint acceleration is
  incomplete.
- Redis Streams integration requires an external Redis service and is not part of the default
  offline package test run.
- The full performance, soak, multi-process chaos, and fairness matrix is pending.
- Human review is exposed through a provider-neutral Activity Port; a deployment-specific review
  queue and UI adapter are not included in the Runtime package.
- Two concrete business Agent demonstrations are intentionally not stored in Hypha. They must live
  in independent business repositories that pin a tested Hypha commit.
- Cancellation timeout records unresolved external operations but cannot force a non-cooperative
  provider process to stop. Operators must reconcile or compensate provider-owned state.
