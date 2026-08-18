# `@codesoul-co/hypha-memory` / `integration-contracts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/integration-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)
- 导出数: **32**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryActivityPort` | 类 | <code>new DefaultMemoryActivityPort(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | Default Memory Activity Port 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryContextInferenceBridge` | 类 | <code>new MemoryContextInferenceBridge(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | Memory Context Inference Bridge 的运行时实现；公开构造函数与成员见下表。 |
| `createContextBuildActivityHandler` | 函数 | <code>createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler</code> | 创建 Context Build Activity Handler。 |
| `createDomainMemoryDependencySnapshot` | 函数 | <code>createDomainMemoryDependencySnapshot(input: Omit&lt;DomainMemoryDependencySnapshot, "dependencyHash" &#124; "createdAt"&gt;, now?: string): DomainMemoryDependencySnapshot</code> | 创建 Domain Memory Dependency Snapshot。 |
| `createMemoryCacheValidityInput` | 函数 | <code>createMemoryCacheValidityInput(input: Omit&lt;MemoryCacheValidityInput, "scopeHash"&gt; &amp; { scope: ManagedMemoryScope; }): MemoryCacheValidityInput</code> | 创建 Memory Cache Validity Input。 |
| `createMemorySearchActivityHandler` | 函数 | <code>createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler</code> | 创建 Memory Search Activity Handler。 |
| `memoryCacheValidityHash` | 函数 | <code>memoryCacheValidityHash(input: MemoryCacheValidityInput): string</code> | memory Cache Validity Hash 的公开运行时操作。 |
| `memoryRecordVersionSetHash` | 函数 | <code>memoryRecordVersionSetHash(versionIds: string[]): string</code> | memory Record Version Set Hash 的公开运行时操作。 |
| `validateMemoryBindingCapabilities` | 函数 | <code>validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[]</code> | 校验 Memory Binding Capabilities。 |
| `validateMemoryProfileCapabilities` | 函数 | <code>validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[]</code> | 校验 Memory Profile Capabilities。 |
| `DefaultMemoryActivityPortOptions` | 接口 | <code>interface DefaultMemoryActivityPortOptions</code> | Default Memory Activity Port Options 的字段契约；完整字段见下表。 |
| `DomainMemoryDependencySnapshot` | 接口 | <code>interface DomainMemoryDependencySnapshot</code> | Domain Memory Dependency Snapshot 的字段契约；完整字段见下表。 |
| `InferenceContextInput` | 接口 | <code>interface InferenceContextInput</code> | Inference Context Input 的字段契约；完整字段见下表。 |
| `InferenceContextPort` | 接口 | <code>interface InferenceContextPort</code> | Inference Context Port 的字段契约；完整字段见下表。 |
| `MemoryActivityHarnessHook` | 接口 | <code>interface MemoryActivityHarnessHook</code> | Memory Activity Harness Hook 的字段契约；完整字段见下表。 |
| `MemoryActivityObserver` | 接口 | <code>interface MemoryActivityObserver</code> | Memory Activity Observer 的字段契约；完整字段见下表。 |
| `MemoryActivityPolicyDecision` | 接口 | <code>interface MemoryActivityPolicyDecision</code> | Memory Activity Policy Decision 的字段契约；完整字段见下表。 |
| `MemoryActivityPolicyPort` | 接口 | <code>interface MemoryActivityPolicyPort</code> | Memory Activity Policy Port 的字段契约；完整字段见下表。 |
| `MemoryActivityPort` | 接口 | <code>interface MemoryActivityPort</code> | Memory Activity Port 的字段契约；完整字段见下表。 |
| `MemoryActivityRequest` | 接口 | <code>interface MemoryActivityRequest</code> | Memory Activity Request 的字段契约；完整字段见下表。 |
| `MemoryActivityResult` | 接口 | <code>interface MemoryActivityResult</code> | Memory Activity Result 的字段契约；完整字段见下表。 |
| `MemoryCacheInvalidation` | 接口 | <code>interface MemoryCacheInvalidation</code> | Memory Cache Invalidation 的字段契约；完整字段见下表。 |
| `MemoryCacheValidityInput` | 接口 | <code>interface MemoryCacheValidityInput</code> | Memory Cache Validity Input 的字段契约；完整字段见下表。 |
| `MemoryContextInferenceResult` | 接口 | <code>interface MemoryContextInferenceResult</code> | Memory Context Inference Result 的字段契约；完整字段见下表。 |
| `MemoryEvaluationCase` | 接口 | <code>interface MemoryEvaluationCase</code> | Memory Evaluation Case 的字段契约；完整字段见下表。 |
| `MemoryEvaluationObservation` | 接口 | <code>interface MemoryEvaluationObservation</code> | Memory Evaluation Observation 的字段契约；完整字段见下表。 |
| `MemoryEvaluationPort` | 接口 | <code>interface MemoryEvaluationPort</code> | Memory Evaluation Port 的字段契约；完整字段见下表。 |
| `MemoryReplayReference` | 接口 | <code>interface MemoryReplayReference</code> | Memory Replay Reference 的字段契约；完整字段见下表。 |
| `SessionMemoryBinding` | 接口 | <code>interface SessionMemoryBinding</code> | Session Memory Binding 的字段契约；完整字段见下表。 |
| `WorkflowStateMemoryBinding` | 接口 | <code>interface WorkflowStateMemoryBinding</code> | Workflow State Memory Binding 的字段契约；完整字段见下表。 |
| `MemoryActivityHandler` | 类型 | <code>type MemoryActivityHandler = (request: MemoryActivityRequest, signal?: AbortSignal) =&gt; Promise&lt;Omit&lt;MemoryActivityResult, 'operationId'&gt;&gt;</code> | Memory Activity Handler 的公共类型别名。 |
| `MemoryActivityOperation` | 类型 | <code>type MemoryActivityOperation = 'add' &#124; 'extract' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'write' &#124; 'maintain' &#124; 'delete' &#124; 'history' &#124; 'build_context'</code> | Memory Activity Operation 的公共类型别名。 |

## `DefaultMemoryActivityPort` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | execute 的公开运行时操作。 |
| `register` | 方法 | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): DefaultMemoryActivityPort</code> | 注册 register。 |

## `MemoryContextInferenceBridge` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryContextInferenceResult&gt;</code> | execute 的公开运行时操作。 |

## `DefaultMemoryActivityPortOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: MemoryEventPublisher</code> | events 字段。 |
| `harness` | 属性 | <code>harness: MemoryActivityHarnessHook</code> | harness 字段。 |
| `observers` | 属性 | <code>observers: MemoryActivityObserver[]</code> | observers 字段。 |
| `policy` | 属性 | <code>policy: MemoryActivityPolicyPort</code> | policy 字段。 |

## `DomainMemoryDependencySnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: Partial&lt;MemoryManagementCapabilities&gt;</code> | capability Snapshot 字段。 |
| `contextProfileRef` | 属性 | <code>contextProfileRef: SpecRef</code> | context Profile Ref 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `dependencyHash` | 属性 | <code>dependencyHash: string</code> | dependency Hash 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `extractionProfileRef` | 属性 | <code>extractionProfileRef: SpecRef</code> | extraction Profile Ref 字段。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef: SpecRef</code> | memory Profile Ref 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: SpecRef[]</code> | policy Refs 字段。 |
| `providerRefs` | 属性 | <code>providerRefs: SpecRef[]</code> | provider Refs 字段。 |
| `scopeTemplate` | 属性 | <code>scopeTemplate: Partial&lt;ManagedMemoryScope&gt;</code> | scope Template 字段。 |

## `InferenceContextInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextHash` | 属性 | <code>contextHash: string</code> | context Hash 字段。 |
| `envelope` | 属性 | <code>envelope: ContextEnvelope</code> | envelope 字段。 |
| `provenanceRequired` | 属性 | <code>provenanceRequired: boolean</code> | provenance Required 字段。 |

## `InferenceContextPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invoke` | 方法 | <code>invoke(input: InferenceContextInput, signal?: AbortSignal): Promise&lt;TOutput&gt;</code> | invoke 的公开运行时操作。 |

## `MemoryActivityHarnessHook` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterExecute` | 方法 | <code>afterExecute(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | after Execute 的公开运行时操作。 |
| `beforeExecute` | 方法 | <code>beforeExecute(request: MemoryActivityRequest, signal: AbortSignal): void &#124; Promise&lt;void&gt;</code> | before Execute 的公开运行时操作。 |

## `MemoryActivityObserver` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `onCompleted` | 方法 | <code>onCompleted(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | 处理 Completed。 |
| `onFailed` | 方法 | <code>onFailed(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | 处理 Failed。 |
| `onStarted` | 方法 | <code>onStarted(request: MemoryActivityRequest): void &#124; Promise&lt;void&gt;</code> | 处理 Started。 |

## `MemoryActivityPolicyDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | allowed 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `MemoryActivityPolicyPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityPolicyDecision&gt;</code> | authorize 的公开运行时操作。 |

## `MemoryActivityPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | execute 的公开运行时操作。 |

## `MemoryActivityRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventContext` | 属性 | <code>eventContext: MemoryEventContext</code> | event Context 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operation` | 属性 | <code>operation: MemoryActivityOperation</code> | operation 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `payload` | 属性 | <code>payload: unknown</code> | payload 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `MemoryActivityResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextEnvelopeRef` | 属性 | <code>contextEnvelopeRef: string</code> | context Envelope Ref 字段。 |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `evidence` | 属性 | <code>evidence: MemoryProviderReturnEvidence</code> | evidence 字段。 |
| `memoryRefs` | 属性 | <code>memoryRefs: string[]</code> | memory Refs 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | status 字段。 |

## `MemoryCacheInvalidation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryIds` | 属性 | <code>memoryIds: string[]</code> | memory Ids 字段。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds: string[]</code> | memory Version Ids 字段。 |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | mutation Generation 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `reason` | 属性 | <code>reason: "created" &#124; "invalidated" &#124; "deleted" &#124; "updated" &#124; "provider_revision"</code> | reason 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `validityHash` | 属性 | <code>validityHash: string</code> | validity Hash 字段。 |

## `MemoryCacheValidityInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextProfileRevision` | 属性 | <code>contextProfileRevision: string</code> | context Profile Revision 字段。 |
| `embeddingRevision` | 属性 | <code>embeddingRevision: string</code> | embedding Revision 字段。 |
| `memoryProfileRevision` | 属性 | <code>memoryProfileRevision: string</code> | memory Profile Revision 字段。 |
| `mutationGeneration` | 属性 | <code>mutationGeneration: string</code> | mutation Generation 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `queryHash` | 属性 | <code>queryHash: string</code> | query Hash 字段。 |
| `recordSetRevision` | 属性 | <code>recordSetRevision: string</code> | record Set Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `selectedMemoryVersionIds` | 属性 | <code>selectedMemoryVersionIds: string[]</code> | selected Memory Version Ids 字段。 |

## `MemoryContextInferenceResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activity` | 属性 | <code>activity: MemoryActivityResult</code> | activity 字段。 |
| `inferenceOutput` | 属性 | <code>inferenceOutput: TOutput</code> | inference Output 字段。 |

## `MemoryEvaluationCase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `category` | 属性 | <code>category: "lifecycle" &#124; "context" &#124; "extraction" &#124; "retrieval"</code> | category 字段。 |
| `expectedRef` | 属性 | <code>expectedRef: string</code> | expected Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputRef` | 属性 | <code>inputRef: string</code> | input Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `metricIds` | 属性 | <code>metricIds: string[]</code> | metric Ids 字段。 |

## `MemoryEvaluationObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `caseId` | 属性 | <code>caseId: string</code> | case Id 字段。 |
| `contextHash` | 属性 | <code>contextHash: string</code> | context Hash 字段。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds: string[]</code> | memory Version Ids 字段。 |
| `metrics` | 属性 | <code>metrics: Record&lt;string, number&gt;</code> | metrics 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `retrievalSnapshotId` | 属性 | <code>retrievalSnapshotId: string</code> | retrieval Snapshot Id 字段。 |
| `traceEventIds` | 属性 | <code>traceEventIds: string[]</code> | trace Event Ids 字段。 |

## `MemoryEvaluationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(observation: MemoryEvaluationObservation): Promise&lt;void&gt;</code> | 记录 record。 |

## `MemoryReplayReference` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextHash` | 属性 | <code>contextHash: string</code> | context Hash 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `memoryVersionIds` | 属性 | <code>memoryVersionIds: string[]</code> | memory Version Ids 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `retrievalSnapshotId` | 属性 | <code>retrievalSnapshotId: string</code> | retrieval Snapshot Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |

## `SessionMemoryBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextProfileRef` | 属性 | <code>contextProfileRef: SpecRef</code> | context Profile Ref 字段。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef: SpecRef</code> | memory Profile Ref 字段。 |
| `memoryScopeTemplate` | 属性 | <code>memoryScopeTemplate: Partial&lt;ManagedMemoryScope&gt;</code> | memory Scope Template 字段。 |
| `sessionScopeMode` | 属性 | <code>sessionScopeMode: "isolated" &#124; "user_shared" &#124; "workspace_shared"</code> | session Scope Mode 字段。 |

## `WorkflowStateMemoryBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMemoryTypes` | 属性 | <code>allowedMemoryTypes: ManagedMemoryType[]</code> | allowed Memory Types 字段。 |
| `autoCapture` | 属性 | <code>autoCapture: boolean</code> | auto Capture 字段。 |
| `contextProfileRef` | 属性 | <code>contextProfileRef: SpecRef</code> | context Profile Ref 字段。 |
| `extractionProfileRef` | 属性 | <code>extractionProfileRef: SpecRef</code> | extraction Profile Ref 字段。 |
| `memoryAccessMode` | 属性 | <code>memoryAccessMode: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | memory Access Mode 字段。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef: SpecRef</code> | memory Profile Ref 字段。 |
| `readPolicyRef` | 属性 | <code>readPolicyRef: SpecRef</code> | read Policy Ref 字段。 |
| `writePolicyRef` | 属性 | <code>writePolicyRef: SpecRef</code> | write Policy Ref 字段。 |
