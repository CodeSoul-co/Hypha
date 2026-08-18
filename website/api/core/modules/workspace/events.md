# `@codesoul-co/hypha-core` / `modules/workspace/events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/workspace/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `workspaceEventJsonSchemas` | constant | <code>const workspaceEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | workspace Event Json Schemas constant exported by the `modules/workspace/events` module. |
| `workspaceEventPayloadRequirements` | constant | <code>const workspaceEventPayloadRequirements: { readonly 'workspace.create.requested': { readonly required: readonly ["operationId", "profileRef"]; }; readonly 'workspace.created': { readonly required: readonly ["operationId", "profileRef", "status"]; }; readonly 'workspace.ready': { readonly required: readonly ["operationId", "status"]; readonly status: "ready"; }; readonly 'workspace.busy': { readonly required: reado...</code> | workspace Event Payload Requirements constant exported by the `modules/workspace/events` module. |
| `workspaceFrameworkEventExample` | constant | <code>const workspaceFrameworkEventExample: WorkspaceFrameworkEvent&lt;"workspace.ready"&gt;</code> | Valid example value for workspace Framework Event. |
| `workspaceFrameworkEventJsonSchema` | constant | <code>const workspaceFrameworkEventJsonSchema: JsonSchema</code> | JSON Schema for workspace Framework Event. |
| `workspaceFrameworkEventTypes` | constant | <code>const workspaceFrameworkEventTypes: readonly ["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "wor...</code> | workspace Framework Event Types constant exported by the `modules/workspace/events` module. |
| `workspaceFrameworkEventTypeSchema` | constant | <code>const workspaceFrameworkEventTypeSchema: z.ZodEnum&lt;["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked"...</code> | Runtime schema for workspace Framework Event Type. |
| `createWorkspaceFrameworkEvent` | function | <code>createWorkspaceFrameworkEvent&lt;TType extends WorkspaceFrameworkEventType&gt;(input: WorkspaceEventCreateInput&lt;TType&gt;): WorkspaceFrameworkEvent&lt;TType&gt;</code> | Creates Workspace Framework Event at this module boundary. |
| `validateWorkspaceEventPayloadForType` | function | <code>validateWorkspaceEventPayloadForType&lt;TType extends WorkspaceFrameworkEventType&gt;(type: TType, input: unknown): WorkspaceEventPayloadMap[TType]</code> | Validates Workspace Event Payload For Type at this module boundary. |
| `validateWorkspaceFrameworkEvent` | function | <code>validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent</code> | Validates Workspace Framework Event at this module boundary. |
