# `@codesoul-co/hypha-core` / `modules/workspace/events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/workspace/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `workspaceEventJsonSchemas` | 常量 | <code>const workspaceEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/workspace/events` 模块导出的 workspace Event Json Schemas 常量。 |
| `workspaceEventPayloadRequirements` | 常量 | <code>const workspaceEventPayloadRequirements: { readonly 'workspace.create.requested': { readonly required: readonly ["operationId", "profileRef"]; }; readonly 'workspace.created': { readonly required: readonly ["operationId", "profileRef", "status"]; }; readonly 'workspace.ready': { readonly required: readonly ["operationId", "status"]; readonly status: "ready"; }; readonly 'workspace.busy': { readonly required: reado...</code> | 由 `modules/workspace/events` 模块导出的 workspace Event Payload Requirements 常量。 |
| `workspaceFrameworkEventExample` | 常量 | <code>const workspaceFrameworkEventExample: WorkspaceFrameworkEvent&lt;"workspace.ready"&gt;</code> | workspace Framework Event 的有效示例值。 |
| `workspaceFrameworkEventJsonSchema` | 常量 | <code>const workspaceFrameworkEventJsonSchema: JsonSchema</code> | workspace Framework Event 的 JSON Schema。 |
| `workspaceFrameworkEventTypes` | 常量 | <code>const workspaceFrameworkEventTypes: readonly ["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "wor...</code> | 由 `modules/workspace/events` 模块导出的 workspace Framework Event Types 常量。 |
| `workspaceFrameworkEventTypeSchema` | 常量 | <code>const workspaceFrameworkEventTypeSchema: z.ZodEnum&lt;["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked"...</code> | workspace Framework Event Type 的运行时 Schema。 |
| `createWorkspaceFrameworkEvent` | 函数 | <code>createWorkspaceFrameworkEvent&lt;TType extends WorkspaceFrameworkEventType&gt;(input: WorkspaceEventCreateInput&lt;TType&gt;): WorkspaceFrameworkEvent&lt;TType&gt;</code> | 创建 Workspace Framework Event。 |
| `validateWorkspaceEventPayloadForType` | 函数 | <code>validateWorkspaceEventPayloadForType&lt;TType extends WorkspaceFrameworkEventType&gt;(type: TType, input: unknown): WorkspaceEventPayloadMap[TType]</code> | 校验 Workspace Event Payload For Type。 |
| `validateWorkspaceFrameworkEvent` | 函数 | <code>validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent</code> | 校验 Workspace Framework Event。 |
