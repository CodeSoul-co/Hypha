# `@codesoul-co/hypha-core` / `modules/artifact/manager-policy`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/manager-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertCreateAccess` | function | <code>assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void</code> | Asserts Create Access at this module boundary. |
| `assertProfilePermission` | function | <code>assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | Asserts Profile Permission at this module boundary. |
| `assertRecordPermission` | function | <code>assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | Asserts Record Permission at this module boundary. |
| `canAccessRecord` | function | <code>canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean</code> | Checks whether it can Access Record at this module boundary. |
| `profileReference` | function | <code>profileReference(profile: ArtifactProfileSpec): SpecRef</code> | Public runtime operation for profile Reference. |
| `resolveProfileRef` | function | <code>resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec &#124; null</code> | Resolves Profile Ref at this module boundary. |
| `ArtifactPermission` | type | <code>type ArtifactPermission = 'read' &#124; 'write' &#124; 'delete'</code> | Public type alias for Artifact Permission. |
