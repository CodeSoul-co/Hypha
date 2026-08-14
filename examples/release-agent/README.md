# Hypha Release Agent Example

This directory models an application repository that consumes a versioned Hypha npm release. The
application owns its DomainPack, Prompt, Skill, Tool selection, policy, tests, and deployment overlay;
it does not edit framework source.

## Parts

| File                     | Product responsibility                                                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `agent/domain-pack.yaml` | Task/input, output contract, workflow, Tool/Skill allow-lists, Memory/reasoning profiles, policy, evaluation, regression, and deployment. |
| `agent/prompt.json`      | Versioned Agent Prompt registered through the Runtime API.                                                                                |
| `agent/skill.md`         | Progressively loaded Skill instructions and declared trust metadata.                                                                      |
| `agent/hypha.user.yaml`  | Product-owned Server configuration overlay.                                                                                               |
| `src/agent.ts`           | Loads and validates the DomainPack, compiles its custom workflow FSM, and applies the Agent patch.                                        |
| `src/package-tour.ts`    | Imports all 15 public packages and exercises one representative contract or runtime boundary from each.                                   |
| `src/contract.test.ts`   | Proves deterministic compilation, Harness system output, output contract, and selected capabilities.                                      |
| `src/run-agent.ts`       | Registers Prompt/Skill and submits a durable Session start-run command over HTTP.                                                         |
| `src/run-fsm.ts`         | Starts the compiled custom FSM, inspects its revision, and applies one governed owner transition.                                         |

The Tool entry is a contract and permission declaration. The concrete `search` adapter is
registered by trusted Server composition; DomainPack YAML does not gain execution authority merely
by naming it.

## Public packages used

The example pins the complete v1.0.0 release line. The packages remain separate so an application
can depend on only the layers it needs.

| Package                | How this example uses it                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `hypha-core`           | Parses the composed system contract and creates a source-of-truth Run Event.                               |
| `hypha-storage`        | Declares and validates a local SQLite storage topology.                                                    |
| `hypha-fsm`            | Parses the protected Harness process, compiles a separate application workflow FSM, and analyzes topology. |
| `hypha-inference`      | Registers an echo provider and executes a normalized inference request.                                    |
| `hypha-models`         | Registers a deterministic mock model and parses alias routing.                                             |
| `hypha-memory`         | Parses the provider-neutral Memory contract selected by the DomainPack.                                    |
| `hypha-tools`          | Registers the declared search tool behind a local handler boundary.                                        |
| `hypha-skills`         | Registers a versioned skill for progressive selection/loading.                                             |
| `hypha-mcp`            | Parses a governed MCP integration contract without granting execution authority.                           |
| `hypha-domain`         | Loads the YAML DomainPack, resolves bindings, and creates the Agent patch.                                 |
| `hypha-kernel`         | Validates the ReAct Agent contract used by the reasoning layer.                                            |
| `hypha-harness`        | Records an Event and projects a Session view from the evidence stream.                                     |
| `hypha-adapters-local` | Creates local SQLite, vector, and filesystem provider profiles.                                            |
| `hypha-serving-cache`  | Writes and reads a bounded exact-response projection; Events remain authoritative.                         |
| `hypha-testing`        | Asserts the expected FSM state path for a deterministic fixture.                                           |

## Use the published release

Copy this directory into a new repository, replace the package versions with an actually published
release, then install the matching packages:

```bash
npm install
npm run tour
npm run compile-agent
npm test
```

All `@codesoul-co/hypha-*` dependencies should remain on one release line. v1.0.0 is the current
published release represented by this example. During Hypha repository development, the root
command `npm run typecheck:release-example` checks the same source against workspace packages.

`npm run tour` prints a JSON inventory only after all 15 representative boundaries succeed.
`npm run compile-agent` then prints two intentionally separate processes:

- `reactHarnessFsm` is framework-owned and protects ReAct lifecycle, policy, effects, verification,
  memory synchronization, recovery, review, and terminal movement.
- `customWorkflowFsm` is application-owned. Its node names and edges come from the DomainPack
  workflow, are validated by `hypha-fsm`, and can be used for a custom non-ReAct FSM Run.

## Run against the bundled Server

The npm libraries do not include the Express Server. In a separate Hypha Server checkout, start the
Server with the application-owned overlay rather than editing tracked `config.yaml`:

```bash
export HYPHA_CONFIG_PATH=/absolute/path/to/my-agent/agent/hypha.user.yaml
npm run dev
```

Then, from the application repository, provide the configured owner credentials and submit a Run:

```bash
export HYPHA_BASE_URL=http://127.0.0.1:3000/api/v1
export HYPHA_OWNER_EMAIL=owner@example.com
export HYPHA_OWNER_PASSWORD=replace-with-a-private-password
npm run run -- "What guarantees make Hypha Event-first?"
```

ReAct execution keeps the framework-owned Harness FSM and uses the DomainPack for capability
bindings. To execute the separately validated application topology and advance an allowed edge with
owner/revision evidence, run:

```bash
npm run run:fsm
```

The command returns a durable Session Command. Query
`GET /runtime/sessions/:sessionId/commands` and the resulting
`GET /runtime/runs/:runId`/`events`/`replay` endpoints to follow execution.

Production deployments should register Prompt and Skill revisions during a controlled deployment
phase, pin the resulting hashes, and submit Runs only after `/ready` succeeds.
