# Releases and npm Packages

The repository is a private npm workspace. Framework libraries explicitly marked `private: false`
are public release artifacts named `@hypha/*`; packages still marked private are not published.
“Public” here describes the intended package metadata and access level, not current registry
availability. The Express Server and example CLI remain source/deployment surfaces; publishing a
framework package does not publish or operate a Server.

## Release contract

- All public `@hypha/*` packages in one release use the same Semantic Version.
- Internal `@hypha/*` dependencies use the exact release version.
- Each package publishes only `dist/` plus npm-generated metadata.
- Node.js 22 or newer is required.
- `npm run release:check:npm` builds package output, verifies declared source dependencies, checks
  package metadata, and validates the files that `npm pack` would include.
- `npm run test:acceptance` runs only reproducible local infrastructure acceptance: Native Memory,
  Docker, Postgres, and S3/MinIO.
- Externally provisioned Memory providers and Remote Sandbox remain runtime-validated interfaces,
  but their live acceptance is opt-in through `npm run test:acceptance:online` and user-supplied
  environment variables from `.env.example`.
- Docker daemon-restart recovery remains an explicitly coordinated operational check through
  `npm run test:acceptance:manual`; it is not allowed to restart a maintainer workstation as a side
  effect of the base release command.
- A release is not public until the maintainer has published packages and created the matching Git
  tag and release notes. A version in `package.json` alone is not proof of registry availability.

## Maintainer publication

Run publication only from the fully validated release commit after `dev-merge` has passed every
base release gate. Online-provider maintainers may additionally run `npm run test:acceptance:online`,
and infrastructure operators may run `npm run test:acceptance:manual` when those environments are
available. Both commands fail closed when their required parameters are absent. First authenticate
the authorized npm organization account and verify the scope:

```bash
npm whoami
npm run release:check:npm
npm publish packages/core --access public
```

Publish dependencies before their consumers. Continue with Storage/FSM/Inference/Models/Memory/
Tools, then Skills/MCP, Domain/Kernel, Harness, local adapters, caches, and testing. Use npm
provenance in the release workflow where the registry and CI identity support it. Never publish
from a source or intermediate integration branch.

After publication, create a clean temporary consumer, install exact versions from the registry,
compile it, run its tests, and compare the package metadata with the release commit. Only then create
the matching Git tag and public release entry.

## Consumer example

[`examples/release-agent`](../../examples/release-agent/README.md) shows a product-owned Agent with
separate DomainPack, Prompt, Skill, policy, Tool declaration, compilation, contract test, Server
registration, and Run submission.
