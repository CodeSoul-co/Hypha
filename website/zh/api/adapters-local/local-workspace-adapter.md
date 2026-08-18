# `@codesoul-co/hypha-adapters-local` / `local-workspace-adapter`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-workspace-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalWorkspaceAdapter` | 类 | <code>new LocalWorkspaceAdapter(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | Adapts a governed Workspace root to Local Process mutation evidence. |
| `LocalWorkspaceAdapterOptions` | 接口 | <code>interface LocalWorkspaceAdapterOptions</code> | Local Workspace Adapter Options 的字段契约；完整字段见下表。 |
| `LocalWorkspaceCaptureOptions` | 接口 | <code>interface LocalWorkspaceCaptureOptions</code> | Local Workspace Capture Options 的字段契约；完整字段见下表。 |

## `LocalWorkspaceAdapter` 公开成员

Adapts a governed Workspace root to Local Process mutation evidence.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertAvailable` | 方法 | <code>assertAvailable(): Promise&lt;void&gt;</code> | 断言 Available。 |
| `capture` | 方法 | <code>capture(options?: LocalWorkspaceCaptureOptions): Promise&lt;LocalWorkspaceSnapshot&gt;</code> | capture 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | 创建该类的实例。 |
| `diff` | 方法 | <code>diff(before: LocalWorkspaceSnapshot, after: LocalWorkspaceSnapshot, detectedAt: string): FileMutation[]</code> | diff 的公开运行时操作。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | workspace Root 字段。 |

## `LocalWorkspaceAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCaptureDurationMs` | 属性 | <code>maxCaptureDurationMs: number</code> | max Capture Duration Ms 字段。 |
| `maxTrackedBytes` | 属性 | <code>maxTrackedBytes: number</code> | max Tracked Bytes 字段。 |
| `maxTrackedFiles` | 属性 | <code>maxTrackedFiles: number</code> | max Tracked Files 字段。 |
| `workspaceRoot` | 属性 | <code>workspaceRoot: string</code> | workspace Root 字段。 |

## `LocalWorkspaceCaptureOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
