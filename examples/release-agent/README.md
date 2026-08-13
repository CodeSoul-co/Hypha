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
| `src/contract.test.ts`   | Proves deterministic compilation, Harness system output, output contract, and selected capabilities.                                      |
| `src/run-agent.ts`       | Registers Prompt/Skill and submits a durable Session start-run command over HTTP.                                                         |
| `src/run-fsm.ts`         | Starts the compiled custom FSM, inspects its revision, and applies one governed owner transition.                                         |

The Tool entry is a contract and permission declaration. The concrete `search` adapter is
registered by trusted Server composition; DomainPack YAML does not gain execution authority merely
by naming it.

## Use a published release

Copy this directory into a new repository, replace the package versions with an actually published
release, then install the matching packages:

```bash
npm install
npm run compile-agent
npm test
```

All `@codesoul-co/*` dependencies should remain on one release line. During Hypha repository development,
the root command `npm run typecheck:release-example` checks the same source against workspace packages.
The `1.0.0` manifests in this checkout are a release candidate until the npm registry contains the
matching version; package metadata alone is not evidence that publication happened.

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
bindings. To execute the DomainPack's custom topology directly and advance an allowed edge with
owner/revision evidence, run:

```bash
npm run run:fsm
```

The command returns a durable Session Command. Query
`GET /runtime/sessions/:sessionId/commands` and the resulting
`GET /runtime/runs/:runId`/`events`/`replay` endpoints to follow execution.

Production deployments should register Prompt and Skill revisions during a controlled deployment
phase, pin the resulting hashes, and submit Runs only after `/ready` succeeds.
