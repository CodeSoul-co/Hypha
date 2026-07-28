import { describe, expect, it } from 'vitest';
import {
  DefaultContextInjectionGateway,
  DefaultMemoryContextBuilder,
  contextProfileSpecExample,
  hashMemoryScope,
  validateContextEnvelope,
  validateContextProfileSpec,
  type ContextBuildInput,
} from './index';

const scope = { userId: 'user:context', workspaceId: 'workspace:context', runId: 'run:context' };
const principal = {
  principalId: 'user:context',
  type: 'user' as const,
  userId: 'user:context',
  permissionScopes: ['memory:read'],
};

describe('memory context construction', () => {
  it('builds deterministic, scope-filtered envelopes with provenance', async () => {
    expect(validateContextProfileSpec(contextProfileSpecExample)).toEqual(
      contextProfileSpecExample
    );
    const input: ContextBuildInput = {
      operationId: 'operation:context',
      principal,
      scope,
      runId: scope.runId,
      profileRef: {
        id: contextProfileSpecExample.id,
        version: contextProfileSpecExample.version,
        revision: contextProfileSpecExample.revision,
      },
      modelContextWindowTokens: 9000,
      reservedSystemTokens: 100,
      reservedInstructionTokens: 100,
      reservedOutputTokens: 100,
      profile: contextProfileSpecExample,
      sourceItems: [
        {
          id: 'system:1',
          sourceType: 'system',
          sourceId: 'system',
          content: 'Stay concise.',
          text: 'Stay concise.',
          tokenEstimate: 4,
          priority: 100,
          required: true,
        },
        {
          id: 'message:1',
          sourceType: 'messages',
          sourceId: 'messages',
          content: 'Recall my preference.',
          text: 'Recall my preference.',
          tokenEstimate: 6,
          priority: 80,
          required: true,
        },
        {
          id: 'memory:1',
          sourceType: 'long_term_memory',
          sourceId: 'memory',
          content: 'Blue is preferred.',
          text: 'Blue is preferred.',
          tokenEstimate: 5,
          priority: 60,
          metadata: {
            scopeHash: hashMemoryScope(scope),
            memoryId: 'memory:blue',
            memoryVersionId: 'memory:blue:v1',
          },
        },
        {
          id: 'memory:foreign',
          sourceType: 'long_term_memory',
          sourceId: 'memory',
          content: 'Foreign memory.',
          text: 'Foreign memory.',
          tokenEstimate: 4,
          priority: 60,
          metadata: { scopeHash: 'foreign-scope' },
        },
      ],
    };
    const builder = new DefaultMemoryContextBuilder(undefined, () => '2026-07-17T00:00:00.000Z');
    const first = await builder.build(input);
    const second = await builder.build(input);

    expect(first.contextHash).toBe(second.contextHash);
    expect(first.items.map((item) => item.id)).not.toContain('memory:foreign');
    expect(first.rejectedItems).toContainEqual({
      itemId: 'memory:foreign',
      reason: 'scope_denied',
    });

    const envelope = await new DefaultContextInjectionGateway(
      () => '2026-07-17T00:00:00.000Z'
    ).buildEnvelope(first, contextProfileSpecExample);
    expect(() => validateContextEnvelope(envelope)).not.toThrow();
    expect(envelope.provenanceIndex['memory:1']).toMatchObject({
      memoryId: 'memory:blue',
      memoryVersionId: 'memory:blue:v1',
    });
  });
});
