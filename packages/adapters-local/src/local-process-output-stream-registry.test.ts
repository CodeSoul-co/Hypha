import type { CommandOutputChunk, ExecutionPrincipal } from '@codesoul-co/hypha-core';
import { describe, expect, it } from 'vitest';
import { LocalProcessOutputStreamRegistry } from './local-process-output-stream-registry';

const principal: ExecutionPrincipal = {
  principalId: 'principal.output',
  type: 'user',
  userId: 'user.output',
  tenantId: 'tenant.output',
  permissionScopes: ['execution.run'],
};

describe('LocalProcessOutputStreamRegistry', () => {
  it('publishes byte-safe validated chunks with global sequence and truncation evidence', () => {
    const registry = new LocalProcessOutputStreamRegistry({
      now: () => '2026-07-27T06:00:00.000Z',
    });
    registry.begin('execution.output', principal);

    const stdout = registry.publish(
      'execution.output',
      'stdout',
      new TextEncoder().encode('你好')
    );
    const stderr = registry.publish(
      'execution.output',
      'stderr',
      Uint8Array.from([0, 255]),
      true
    );

    expect(stdout).toMatchObject({
      executionId: 'execution.output',
      sequence: 0,
      stream: 'stdout',
      encoding: 'base64',
      byteLength: 6,
      emittedAt: '2026-07-27T06:00:00.000Z',
    });
    expect(Buffer.from(stdout.content, 'base64').toString('utf8')).toBe('你好');
    expect(stdout.contentHash).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(stderr).toMatchObject({
      sequence: 1,
      stream: 'stderr',
      byteLength: 2,
      truncated: true,
    });
    expect([...Buffer.from(stderr.content, 'base64')]).toEqual([0, 255]);
  });

  it('follows live output and completes waiting readers without polling', async () => {
    const registry = new LocalProcessOutputStreamRegistry();
    registry.begin('execution.follow', principal);
    const iterator = registry
      .stream(streamRequest('execution.follow', { follow: true }))[Symbol.asyncIterator]();
    const pending = iterator.next();

    registry.publish('execution.follow', 'stdout', Buffer.from('live'));
    await expect(pending).resolves.toMatchObject({
      done: false,
      value: { sequence: 0, stream: 'stdout' },
    });

    const completion = iterator.next();
    registry.complete('execution.follow');
    await expect(completion).resolves.toEqual({ done: true, value: undefined });
  });

  it('fails closed for a different principal identity', () => {
    const registry = new LocalProcessOutputStreamRegistry();
    registry.begin('execution.private', principal);

    expect(() =>
      registry.stream({
        ...streamRequest('execution.private'),
        principal: { ...principal, principalId: 'principal.other' },
      })
    ).toThrow('Output stream principal does not match the Execution owner.');
  });

  it('bounds replay memory and reports an explicit sequence gap', async () => {
    const registry = new LocalProcessOutputStreamRegistry({ maxRetainedChunks: 2 });
    registry.begin('execution.bounded', principal);
    registry.publish('execution.bounded', 'stdout', Buffer.from('0'));
    registry.publish('execution.bounded', 'stdout', Buffer.from('1'));
    registry.publish('execution.bounded', 'stdout', Buffer.from('2'));
    registry.complete('execution.bounded');

    await expect(collect(registry.stream(streamRequest('execution.bounded')))).resolves.toEqual([
      expect.objectContaining({ sequence: 1 }),
      expect.objectContaining({ sequence: 2 }),
    ]);
    await expect(
      collect(registry.stream(streamRequest('execution.bounded', { fromSequence: 0 })))
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_REVISION_CONFLICT' },
    });
  });

  it('enforces maxChunks without consuming later replay data', async () => {
    const registry = new LocalProcessOutputStreamRegistry();
    registry.begin('execution.page', principal);
    registry.publish('execution.page', 'stdout', Buffer.from('0'));
    registry.publish('execution.page', 'stdout', Buffer.from('1'));
    registry.complete('execution.page');

    const first = await collect(
      registry.stream(streamRequest('execution.page', { maxChunks: 1 }))
    );
    const second = await collect(
      registry.stream(streamRequest('execution.page', { fromSequence: 1 }))
    );

    expect(first.map((chunk) => chunk.sequence)).toEqual([0]);
    expect(second.map((chunk) => chunk.sequence)).toEqual([1]);
  });
});

function streamRequest(
  executionId: string,
  overrides: Partial<{
    fromSequence: number;
    maxChunks: number;
    follow: boolean;
  }> = {}
) {
  return {
    operationId: `operation.stream.${executionId}`,
    executionId,
    principal,
    ...overrides,
  };
}

async function collect(stream: AsyncIterable<CommandOutputChunk>): Promise<CommandOutputChunk[]> {
  const chunks: CommandOutputChunk[] = [];
  for await (const chunk of stream) chunks.push(chunk);
  return chunks;
}
