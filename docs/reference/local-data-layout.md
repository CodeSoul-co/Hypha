# Local Data Layout

hypha keeps local runtime state under `data/`. The directory is ignored by Git and should contain only machine-local records, indexes, artifacts, and logs.

## Default Tree

```text
data/
  runtime/
    events/
      hypha-runtime-events.sqlite
      hypha-runtime-events.sqlite.json
      *.events.jsonl
    structured/
      hypha-structured.sqlite
  storage/
    vector/
      hypha-vectors.json
    artifacts/
  logs/
    system.log
```

## Responsibilities

| Path | Purpose |
| --- | --- |
| `data/runtime/events/` | Event-first runtime facts used for trace, replay, audit, regression, and state projection. |
| `data/runtime/structured/` | Local structured source-of-truth records and projections. |
| `data/storage/vector/` | Rebuildable local semantic indexes. |
| `data/storage/artifacts/` | Files, snapshots, and large tool outputs. |
| `data/logs/system.log` | Detailed system runtime log from the server logger. |

## Configuration

Use `.env` for machine-local overrides:

```bash
HYPHA_STORAGE_EVENT_DB=./data/runtime/events/hypha-runtime-events.sqlite
HYPHA_STORAGE_STRUCTURED_DB=./data/runtime/structured/hypha-structured.sqlite
HYPHA_STORAGE_VECTOR_INDEX=./data/storage/vector/hypha-vectors.json
HYPHA_STORAGE_ARTIFACT_ROOT=./data/storage/artifacts
HYPHA_SYSTEM_LOG_PATH=./data/logs/system.log
```

Do not commit `data/`. If a local record must become a reproducible fixture, export the run as JSONL and move a sanitized copy into `tests/fixtures/` or a documented package test artifact instead.
