import { describe, expect, it } from 'vitest';
import {
  DefaultContextInjectionGateway,
  DefaultMemoryContextBuilder,
  DefaultMemoryContextGateway,
  type ContextProfileSpec,
  type ContextSourceResolverRegistry,
  type MemoryActivityHarnessHook,
} from './index';

const profile: ContextProfileSpec = {
  id: 'context.gateway',
  version: '1.0.0',
  revision: 'revision-1',
  sources: [{ id: 'messages', type: 'messages', required: true, priority: 10 }],
  maxTokens: 100,
  deduplication: 'hash',
  ranking: { method: 'priority' },
  truncation: { method: 'drop_lowest', preserveRequiredSources: true },
  includeProvenance: true,
  instructionBoundary: 'strict',
  untrustedContentPolicy: 'tag',
};

describe('DefaultMemoryContextGateway', () => {
  it.each(['chat', 'workflow', 'harness'] as const)(
    'uses one governed entry point for %s',
    async (consumer) => {
      const lifecycle: string[] = [];
      const resolver: ContextSourceResolverRegistry = {
        resolve: async () => [
          {
            id: 'message-1',
            sourceType: 'messages',
            sourceId: 'messages',
            content: 'hello',
            text: 'hello',
            tokenEstimate: 2,
            priority: 10,
            required: true,
          },
        ],
      };
      const hook: MemoryActivityHarnessHook = {
        beforeExecute: async (request) => {
          lifecycle.push('before:' + request.operation);
        },
        afterExecute: async (_request, result) => {
          lifecycle.push('after:' + result.status);
        },
      };
      const gateway = new DefaultMemoryContextGateway({
        resolver,
        builder: new DefaultMemoryContextBuilder(),
        injection: new DefaultContextInjectionGateway(),
        activityHook: hook,
      });
      const result = await gateway.build({
        operationId: 'context:' + consumer,
        consumer,
        principal: { principalId: 'user-1', type: 'user', permissionScopes: ['memory:read'] },
        scope: { userId: 'user-1', workspaceId: 'workspace-1' },
        runId: 'run-1',
        profileRef: { id: profile.id, version: profile.version, revision: profile.revision },
        profile,
        modelContextWindowTokens: 200,
        reservedSystemTokens: 10,
        reservedInstructionTokens: 10,
        reservedOutputTokens: 20,
      });
      expect(result.consumer).toBe(consumer);
      expect(result.envelope.dataSegments).toHaveLength(1);
      expect(result.explanation.selectedItemIds).toEqual(['message-1']);
      expect(lifecycle).toEqual(['before:build_context', 'after:completed']);
    }
  );
});
