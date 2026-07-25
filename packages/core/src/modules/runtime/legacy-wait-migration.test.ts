import { describe, expect, it } from 'vitest';
import type { FrameworkEvent } from '../../events';
import { hashCanonicalJson } from './canonical-json';
import { migrateLegacyHumanWaitEvent, migrateLegacyHumanWaitEvents } from './legacy-wait-migration';

describe('Legacy Human Wait migration', () => {
  it('deterministically derives the Wait contract from legacy Tool evidence', () => {
    const source = event('wait.legacy', 'run.waiting_human', {
      tool: 'filesystem',
      reason: 'operator approval required',
    });

    const first = migrateLegacyHumanWaitEvent(source);
    const second = migrateLegacyHumanWaitEvent(source);

    expect(first).toEqual(second);
    expect(first.event).not.toBe(source);
    expect(first.event.payload).toMatchObject({
      waitId: 'legacy-human-wait:wait.legacy',
      wait: {
        type: 'human',
        reason: 'operator approval required',
        pendingActionRef: 'tool:filesystem',
      },
    });
    expect(source.payload).toEqual({
      tool: 'filesystem',
      reason: 'operator approval required',
    });
  });

  it('uses preceding Human Review evidence and updates persisted payload integrity', () => {
    const events = [
      event('review.requested', 'human.review.requested', {
        invocationId: 'tool-invocation.1',
      }),
      {
        ...event('wait.legacy', 'run.waiting_human', {
          reason: 'operator approval required',
        }),
        version: '1.0.0',
        userId: 'user.runtime',
        sequence: 2,
        globalSequence: 2,
        recordedAt: timestamp,
        payloadHash: hashCanonicalJson({ reason: 'operator approval required' }),
      },
    ];

    const result = migrateLegacyHumanWaitEvents(events);

    expect(result.report).toMatchObject({
      scannedEvents: 2,
      waitingEvents: 1,
      migratedEvents: 1,
      quarantinedEvents: 0,
    });
    expect(result.events[1].payload).toMatchObject({
      wait: { pendingActionRef: 'tool-invocation.1' },
    });
    expect(result.events[1].payloadHash).toBe(hashCanonicalJson(result.events[1].payload));
  });

  it('quarantines streams whose pending action cannot be reconstructed', () => {
    const result = migrateLegacyHumanWaitEvents([
      event('wait.unknown', 'run.waiting_human', { reason: 'approval required' }),
    ]);

    expect(result.report).toMatchObject({
      migratedEvents: 0,
      quarantinedEvents: 1,
      quarantinedRunIds: ['run.runtime'],
      entries: [
        expect.objectContaining({
          eventId: 'wait.unknown',
          status: 'quarantined',
        }),
      ],
    });
  });
});

const timestamp = '2026-07-23T03:00:00.000Z';

function event(id: string, type: FrameworkEvent['type'], payload: unknown): FrameworkEvent {
  return {
    id,
    type,
    runId: 'run.runtime',
    timestamp,
    payload,
  };
}
