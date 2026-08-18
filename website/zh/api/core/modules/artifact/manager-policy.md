# `@codesoul-co/hypha-core` / `modules/artifact/manager-policy`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/artifact/manager-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertCreateAccess` | 函数 | <code>assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void</code> | 断言 Create Access。 |
| `assertProfilePermission` | 函数 | <code>assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | 断言 Profile Permission。 |
| `assertRecordPermission` | 函数 | <code>assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | 断言 Record Permission。 |
| `canAccessRecord` | 函数 | <code>canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean</code> | 判断能否 Access Record。 |
| `profileReference` | 函数 | <code>profileReference(profile: ArtifactProfileSpec): SpecRef</code> | profile Reference 的公开运行时操作。 |
| `resolveProfileRef` | 函数 | <code>resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec &#124; null</code> | 解析 Profile Ref。 |
| `ArtifactPermission` | 类型 | <code>type ArtifactPermission = 'read' &#124; 'write' &#124; 'delete'</code> | Artifact Permission 的公共类型别名。 |
