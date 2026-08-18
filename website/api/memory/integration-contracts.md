# `@codesoul-co/hypha-memory` / `integration-contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/integration-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)
- Exports: **32**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryActivityPort` | class | <code>new DefaultMemoryActivityPort(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | Runtime implementation for Default Memory Activity Port; see its public constructor and members below. |
| `MemoryContextInferenceBridge` | class | <code>new MemoryContextInferenceBridge(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | Runtime implementation for Memory Context Inference Bridge; see its public constructor and members below. |
| `createContextBuildActivityHandler` | function | <code>createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler</code> | Creates Context Build Activity Handler at this module boundary. |
| `createDomainMemoryDependencySnapshot` | function | <code>createDomainMemoryDependencySnapshot(input: Omit&lt;DomainMemoryDependencySnapshot, "dependencyHash" &#124; "createdAt"&gt;, now?: string): DomainMemoryDependencySnapshot</code> | Creates Domain Memory Dependency Snapshot at this module boundary. |
| `createMemoryCacheValidityInput` | function | <code>createMemoryCacheValidityInput(input: Omit&lt;MemoryCacheValidityInput, "scopeHash"&gt; &amp; { scope: ManagedMemoryScope; }): MemoryCacheValidityInput</code> | Creates Memory Cache Validity Input at this module boundary. |
| `createMemorySearchActivityHandler` | function | <code>createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler</code> | Creates Memory Search Activity Handler at this module boundary. |
| `memoryCacheValidityHash` | function | <code>memoryCacheValidityHash(input: MemoryCacheValidityInput): string</code> | Public runtime operation for memory Cache Validity Hash. |
| `memoryRecordVersionSetHash` | function | <code>memoryRecordVersionSetHash(versionIds: string[]): string</code> | Public runtime operation for memory Record Version Set Hash. |
| `validateMemoryBindingCapabilities` | function | <code>validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[]</code> | Validates Memory Binding Capabilities at this module boundary. |
| `validateMemoryProfileCapabilities` | function | <code>validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[]</code> | Validates Memory Profile Capabilities at this module boundary. |
| `DefaultMemoryActivityPortOptions` | interface | <code>interface DefaultMemoryActivityPortOptions</code> | Field contract for Default Memory Activity Port Options; see all contract members below. |
| `DomainMemoryDependencySnapshot` | interface | <code>interface DomainMemoryDependencySnapshot</code> | Field contract for Domain Memory Dependency Snapshot; see all contract members below. |
| `InferenceContextInput` | interface | <code>interface InferenceContextInput</code> | Field contract for Inference Context Input; see all contract members below. |
| `InferenceContextPort` | interface | <code>interface InferenceContextPort</code> | Field contract for Inference Context Port; see all contract members below. |
| `MemoryActivityHarnessHook` | interface | <code>interface MemoryActivityHarnessHook</code> | Field contract for Memory Activity Harness Hook; see all contract members below. |
| `MemoryActivityObserver` | interface | <code>interface MemoryActivityObserver</code> | Field contract for Memory Activity Observer; see all contract members below. |
| `MemoryActivityPolicyDecision` | interface | <code>interface MemoryActivityPolicyDecision</code> | Field contract for Memory Activity Policy Decision; see all contract members below. |
| `MemoryActivityPolicyPort` | interface | <code>interface MemoryActivityPolicyPort</code> | Field contract for Memory Activity Policy Port; see all contract members below. |
| `MemoryActivityPort` | interface | <code>interface MemoryActivityPort</code> | Field contract for Memory Activity Port; see all contract members below. |
| `MemoryActivityRequest` | interface | <code>interface MemoryActivityRequest</code> | Field contract for Memory Activity Request; see all contract members below. |
| `MemoryActivityResult` | interface | <code>interface MemoryActivityResult</code> | Field contract for Memory Activity Result; see all contract members below. |
| `MemoryCacheInvalidation` | interface | <code>interface MemoryCacheInvalidation</code> | Field contract for Memory Cache Invalidation; see all contract members below. |
| `MemoryCacheValidityInput` | interface | <code>interface MemoryCacheValidityInput</code> | Field contract for Memory Cache Validity Input; see all contract members below. |
| `MemoryContextInferenceResult` | interface | <code>interface MemoryContextInferenceResult</code> | Field contract for Memory Context Inference Result; see all contract members below. |
| `MemoryEvaluationCase` | interface | <code>interface MemoryEvaluationCase</code> | Field contract for Memory Evaluation Case; see all contract members below. |
| `MemoryEvaluationObservation` | interface | <code>interface MemoryEvaluationObservation</code> | Field contract for Memory Evaluation Observation; see all contract members below. |
| `MemoryEvaluationPort` | interface | <code>interface MemoryEvaluationPort</code> | Field contract for Memory Evaluation Port; see all contract members below. |
| `MemoryReplayReference` | interface | <code>interface MemoryReplayReference</code> | Field contract for Memory Replay Reference; see all contract members below. |
| `SessionMemoryBinding` | interface | <code>interface SessionMemoryBinding</code> | Field contract for Session Memory Binding; see all contract members below. |
| `WorkflowStateMemoryBinding` | interface | <code>interface WorkflowStateMemoryBinding</code> | Field contract for Workflow State Memory Binding; see all contract members below. |
| `MemoryActivityHandler` | type | <code>type MemoryActivityHandler = (request: MemoryActivityRequest, signal?: AbortSignal) =&gt; Promise&lt;Omit&lt;MemoryActivityResult, 'operationId'&gt;&gt;</code> | Public type alias for Memory Activity Handler. |
| `MemoryActivityOperation` | type | <code>type MemoryActivityOperation = 'add' &#124; 'extract' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'write' &#124; 'maintain' &#124; 'delete' &#124; 'history' &#124; 'build_context'</code> | Public type alias for Memory Activity Operation. |

## `DefaultMemoryActivityPort` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | Public runtime operation for execute. |
| `register` | method | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): DefaultMemoryActivityPort</code> | Registers register at this module boundary. |

## `MemoryContextInferenceBridge` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryContextInferenceResult&gt;</code> | Public runtime operation for execute. |

## `DefaultMemoryActivityPortOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: MemoryEventPublisher</code> | Public events property. |
| `harness` | property | <code>harness: MemoryActivityHarnessHook</code> | Public harness property. |
| `observers` | property | <code>observers: MemoryActivityObserver[]</code> | Public observers property. |
| `policy` | property | <code>policy: MemoryActivityPolicyPort</code> | Public policy property. |

## `DomainMemoryDependencySnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: Partial&lt;MemoryManagementCapabilities&gt;</code> | Public capability Snapshot property. |
| `contextProfileRef` | property | <code>contextProfileRef: SpecRef</code> | Public context Profile Ref property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `dependencyHash` | property | <code>dependencyHash: string</code> | Public dependency Hash property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `extractionProfileRef` | property | <code>extractionProfileRef: SpecRef</code> | Public extraction Profile Ref property. |
| `memoryProfileRef` | property | <code>memoryProfileRef: SpecRef</code> | Public memory Profile Ref property. |
| `policyRefs` | property | <code>policyRefs: SpecRef[]</code> | Public policy Refs property. |
| `providerRefs` | property | <code>providerRefs: SpecRef[]</code> | Public provider Refs property. |
| `scopeTemplate` | property | <code>scopeTemplate: Partial&lt;ManagedMemoryScope&gt;</code> | Public scope Template property. |

## `InferenceContextInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextHash` | property | <code>contextHash: string</code> | Public context Hash property. |
| `envelope` | property | <code>envelope: ContextEnvelope</code> | Public envelope property. |
| `provenanceRequired` | property | <code>provenanceRequired: boolean</code> | Public provenance Required property. |

## `InferenceContextPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invoke` | method | <code>invoke(input: InferenceContextInput, signal?: AbortSignal): Promise&lt;TOutput&gt;</code> | Public runtime operation for invoke. |

## `MemoryActivityHarnessHook` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterExecute` | method | <code>afterExecute(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | Public runtime operation for after Execute. |
| `beforeExecute` | method | <code>beforeExecute(request: MemoryActivityRequest, signal: AbortSignal): void &#124; Promise&lt;void&gt;</code> | Public runtime operation for before Execute. |

## `MemoryActivityObserver` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `onCompleted` | method | <code>onCompleted(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | Handles Completed at this module boundary. |
| `onFailed` | method | <code>onFailed(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | Handles Failed at this module boundary. |
| `onStarted` | method | <code>onStarted(request: MemoryActivityRequest): void &#124; Promise&lt;void&gt;</code> | Handles Started at this module boundary. |

## `MemoryActivityPolicyDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public allowed property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `MemoryActivityPolicyPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityPolicyDecision&gt;</code> | Public runtime operation for authorize. |

## `MemoryActivityPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | Public runtime operation for execute. |

## `MemoryActivityRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventContext` | property | <code>eventContext: MemoryEventContext</code> | Public event Context property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operation` | property | <code>operation: MemoryActivityOperation</code> | Public operation property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `payload` | property | <code>payload: unknown</code> | Public payload property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `MemoryActivityResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextEnvelopeRef` | property | <code>contextEnvelopeRef: string</code> | Public context Envelope Ref property. |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `evidence` | property | <code>evidence: MemoryProviderReturnEvidence</code> | Public evidence property. |
| `memoryRefs` | property | <code>memoryRefs: string[]</code> | Public memory Refs property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | Public status property. |

## `MemoryCacheInvalidation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryIds` | property | <code>memoryIds: string[]</code> | Public memory Ids property. |
| `memoryVersionIds` | property | <code>memoryVersionIds: string[]</code> | Public memory Version Ids property. |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public mutation Generation property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `reason` | property | <code>reason: "created" &#124; "invalidated" &#124; "deleted" &#124; "updated" &#124; "provider_revision"</code> | Public reason property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `validityHash` | property | <code>validityHash: string</code> | Public validity Hash property. |

## `MemoryCacheValidityInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextProfileRevision` | property | <code>contextProfileRevision: string</code> | Public context Profile Revision property. |
| `embeddingRevision` | property | <code>embeddingRevision: string</code> | Public embedding Revision property. |
| `memoryProfileRevision` | property | <code>memoryProfileRevision: string</code> | Public memory Profile Revision property. |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public mutation Generation property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `queryHash` | property | <code>queryHash: string</code> | Public query Hash property. |
| `recordSetRevision` | property | <code>recordSetRevision: string</code> | Public record Set Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `selectedMemoryVersionIds` | property | <code>selectedMemoryVersionIds: string[]</code> | Public selected Memory Version Ids property. |

## `MemoryContextInferenceResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: MemoryActivityResult</code> | Public activity property. |
| `inferenceOutput` | property | <code>inferenceOutput: TOutput</code> | Public inference Output property. |

## `MemoryEvaluationCase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `category` | property | <code>category: "lifecycle" &#124; "context" &#124; "extraction" &#124; "retrieval"</code> | Public category property. |
| `expectedRef` | property | <code>expectedRef: string</code> | Public expected Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputRef` | property | <code>inputRef: string</code> | Public input Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `metricIds` | property | <code>metricIds: string[]</code> | Public metric Ids property. |

## `MemoryEvaluationObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `caseId` | property | <code>caseId: string</code> | Public case Id property. |
| `contextHash` | property | <code>contextHash: string</code> | Public context Hash property. |
| `memoryVersionIds` | property | <code>memoryVersionIds: string[]</code> | Public memory Version Ids property. |
| `metrics` | property | <code>metrics: Record&lt;string, number&gt;</code> | Public metrics property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `retrievalSnapshotId` | property | <code>retrievalSnapshotId: string</code> | Public retrieval Snapshot Id property. |
| `traceEventIds` | property | <code>traceEventIds: string[]</code> | Public trace Event Ids property. |

## `MemoryEvaluationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(observation: MemoryEvaluationObservation): Promise&lt;void&gt;</code> | Records record at this module boundary. |

## `MemoryReplayReference` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextHash` | property | <code>contextHash: string</code> | Public context Hash property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `memoryVersionIds` | property | <code>memoryVersionIds: string[]</code> | Public memory Version Ids property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `retrievalSnapshotId` | property | <code>retrievalSnapshotId: string</code> | Public retrieval Snapshot Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |

## `SessionMemoryBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextProfileRef` | property | <code>contextProfileRef: SpecRef</code> | Public context Profile Ref property. |
| `memoryProfileRef` | property | <code>memoryProfileRef: SpecRef</code> | Public memory Profile Ref property. |
| `memoryScopeTemplate` | property | <code>memoryScopeTemplate: Partial&lt;ManagedMemoryScope&gt;</code> | Public memory Scope Template property. |
| `sessionScopeMode` | property | <code>sessionScopeMode: "isolated" &#124; "user_shared" &#124; "workspace_shared"</code> | Public session Scope Mode property. |

## `WorkflowStateMemoryBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMemoryTypes` | property | <code>allowedMemoryTypes: ManagedMemoryType[]</code> | Public allowed Memory Types property. |
| `autoCapture` | property | <code>autoCapture: boolean</code> | Public auto Capture property. |
| `contextProfileRef` | property | <code>contextProfileRef: SpecRef</code> | Public context Profile Ref property. |
| `extractionProfileRef` | property | <code>extractionProfileRef: SpecRef</code> | Public extraction Profile Ref property. |
| `memoryAccessMode` | property | <code>memoryAccessMode: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | Public memory Access Mode property. |
| `memoryProfileRef` | property | <code>memoryProfileRef: SpecRef</code> | Public memory Profile Ref property. |
| `readPolicyRef` | property | <code>readPolicyRef: SpecRef</code> | Public read Policy Ref property. |
| `writePolicyRef` | property | <code>writePolicyRef: SpecRef</code> | Public write Policy Ref property. |
