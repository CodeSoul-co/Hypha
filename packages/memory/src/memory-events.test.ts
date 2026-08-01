import { describe, expect, it } from 'vitest';
import { hashMemoryScope, memoryEventIdempotencyKey, sanitizeMemoryEventPayload } from './index';

describe('memory event contracts', () => {
  it('removes sensitive bodies and credentials while retaining safe references', () => {
    const payload = sanitizeMemoryEventPayload({
      operationId: 'operation:event:1',
      scopeHash: hashMemoryScope({ userId: 'user:event' }),
      metadata: {
        content: 'sensitive body',
        embedding: [1, 2, 3],
        token: 'secret',
        safe: 'reference-only',
      },
    });

    expect(payload.metadata).toEqual({ safe: 'reference-only' });
    expect(memoryEventIdempotencyKey('memory.write.committed', payload)).toBe(
      memoryEventIdempotencyKey('memory.write.committed', payload)
    );
  });
});
