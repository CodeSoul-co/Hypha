# `@codesoul-co/hypha-adapters-local` / `artifact-manager-execution-cache-verifier`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerExecutionCacheVerifier` | 类 | <code>new ArtifactManagerExecutionCacheVerifier(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks. |
| `ArtifactManagerExecutionCacheVerifierOptions` | 接口 | <code>interface ArtifactManagerExecutionCacheVerifierOptions</code> | Artifact Manager Execution Cache Verifier Options 的字段契约；完整字段见下表。 |

## `ArtifactManagerExecutionCacheVerifier` 公开成员

Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | 创建该类的实例。 |
| `verify` | 方法 | <code>verify(rawScope: ExecutionCacheScope, rawArtifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | verify 的公开运行时操作。 |

## `ArtifactManagerExecutionCacheVerifierOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "read"&gt;</code> | manager 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `resolvePrincipal` | 方法 | <code>resolvePrincipal(scope: ExecutionCacheScope): ExecutionPrincipal &#124; Promise&lt;ExecutionPrincipal&gt;</code> | 解析 Principal。 |
