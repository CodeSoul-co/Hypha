# Upgrading Hypha

Hypha supports two update channels. Application developers should prefer versioned npm packages.
Operators of the bundled Server may update from a signed/tagged source release. Do not treat the
moving `main` branch as a production release.

## Before every upgrade

1. Read `CHANGELOG.md` from the target release and review every breaking, deprecated, migration,
   security, and minimum-runtime entry between the current and target versions.
2. Pin the exact target version or Git tag in a staging environment.
3. Back up MongoDB, Redis persistence when enabled, the configured `data/` volume, external
   Artifact stores, `.env`, and the user-owned configuration directory.
4. Record the current package versions, Git commit, DomainPack versions, Prompt/Skill revisions,
   provider revisions, and `/api/v1/ready` response.
5. Run the application's DomainPack contract, replay, regression, and output-contract tests against
   the target release before changing production traffic.

## npm application upgrade

Keep all `@hypha/*` packages on one release version. Upgrade them together rather than mixing
framework revisions:

```bash
npm install --save-exact \
  @hypha/core@1.0.0 \
  @hypha/domain@1.0.0 \
  @hypha/kernel@1.0.0 \
  @hypha/harness@1.0.0
npm run typecheck
npm test
npm run build
```

Commit the application lockfile. A major version may remove deprecated contracts. A minor version
may add backward-compatible fields and APIs. A patch version contains compatible fixes. Security or
correctness fixes that require a breaking change are documented explicitly rather than hidden in a
patch release.

## Bundled Server source upgrade

Keep product configuration outside the Hypha checkout. `config.yaml` is the tracked base template;
`HYPHA_CONFIG_PATH` points to a user-owned YAML overlay that is merged on top of it.

```bash
export HYPHA_CONFIG_PATH=/srv/my-agent/hypha.user.yaml
export HYPHA_AGENT_CONFIG_PATH=/srv/my-agent/agents.yaml
export HYPHA_TOOL_CONFIG_PATH=/srv/my-agent/tools.yaml
export HYPHA_WORKFLOW_PATH=/srv/my-agent/workflows
export HYPHA_PROMPT_TEMPLATES_PATH=/srv/my-agent/prompts
export HYPHA_PROMPT_REGISTRY_PATH=/srv/my-agent/data/prompt-registry.json
```

Update to an explicit release tag:

```bash
git fetch origin --tags --prune
git switch --detach v1.0.0
npm ci
npm run typecheck
npm run build
npm run test:unit
npm run test:packages
```

For an internal development environment that intentionally tracks the latest integrated source,
the same external configuration boundary allows a fast-forward-only pull without mixing product
files into Hypha:

```bash
git fetch origin --prune
git switch main
git pull --ff-only origin main
npm ci
npm run typecheck
npm run build
npm run test:unit
```

Use this moving-source workflow for development or staged acceptance, not as an unreviewed production
deployment. Production should still pin the accepted tag or commit so rollback remains deterministic.

Start the candidate against a restored staging copy of production data. Hypha runs bounded internal
schema/event compatibility checks during startup; there is no universal command that can replace
provider-specific migration acceptance. Do not send traffic until `/api/v1/ready` succeeds.

## Configuration migration

To move an older checkout that directly edited tracked files:

1. Compare each edited file with the same file from its current release.
2. Copy only product-specific values into an external overlay or external resource directory.
3. Restore tracked templates to the release version.
4. Set the `HYPHA_*_PATH` variables above and verify the resolved configuration in staging.
5. Keep DomainPacks, Prompt templates, Skills, product Tool bindings, fixtures, and regression tests
   in the application repository—not under the Hypha source checkout.

Never copy a new `.env.example` over the real `.env`. Add newly required variables deliberately and
keep credentials in the deployment secret manager.

## Custom FSM migration

Custom `FSMProcessSpec` and compiled DomainPack topology can now execute as workflow-only Runs. Do
not submit a custom `fsm` together with `react`: ReAct continues to require the framework-owned
Harness topology. Existing ReAct clients should omit `fsm` and keep DomainPack capability bindings,
Prompt, Skill, Tool, Memory, and policy references in the request.

Clients that manually advance a custom Run must first read `GET /runtime/runs/:runId/fsm`, then send
the returned process identity, current State, and `runRevision` to the transition endpoint. Treat a
revision conflict as a signal to reread the projection; never retry with a fabricated revision or
edit stored Events/Snapshots.

## Rollback

Stop new work, drain or cancel active Runs according to product policy, restore the previous package
lock or Git tag, and restore data only when the target release performed an explicitly documented
non-backward-compatible migration. Cache data is disposable and may be cleared; Event, Artifact,
receipt, and provider records remain authoritative.

After rollback, verify `/health`, `/ready`, one new Run, Event projection, replay, and a representative
DomainPack regression case before restoring traffic.
