import {
  InMemoryEventSchemaRegistry,
  hashCanonicalJson,
  runLeaseGuard,
  stateExecutionClaimGuard,
  type JsonSchema,
  type RunLeaseAuthorization,
} from '@hypha/core';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRuntimeBackbone, type RuntimeBackbone } from './RuntimeBackbone';

const timestamp = '2026-07-21T06:00:00.000Z';
const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

describe('RuntimeBackbone', () => {
  const backbones: RuntimeBackbone[] = [];

  afterEach(() => {
    while (backbones.length > 0) backbones.pop()?.close();
  });

  it('owns one durable Event, Projection, Checkpoint, Lease, and Claim graph', async () => {
    const schemaRegistry = await runtimeSchemas();
    const backbone = open(temporaryDatabase(), schemaRegistry);

    expect(backbone.events).toBeDefined();
    expect(backbone.projections).toBeDefined();
    expect(backbone.projectionStore).toBeDefined();
    expect(backbone.checkpoints).toBeDefined();
    expect(backbone.runLeases).toBeDefined();
    expect(backbone.stateClaims).toBeDefined();
    expect(Object.isFrozen(backbone)).toBe(true);
  });

  it('restores the shared event, lease, and state-claim authority after restart', async () => {
    const filename = temporaryDatabase();
    const schemaRegistry = await runtimeSchemas();
    const first = open(filename, schemaRegistry);
    const scope = {
      tenantId: 'tenant.example',
      userId: 'user.example',
      runId: 'run.example',
      partitionKey: 'session:tenant.example:user.example:session.example',
    };
    await first.events.append({
      scope,
      events: [
        {
          id: 'event.run.created',
          type: 'run.created',
          runId: scope.runId,
          timestamp,
          payload: { runId: scope.runId },
        },
      ],
      expectedLastSequence: 0,
      idempotencyKey: 'append:run.created',
    });
    const lease = (await first.runLeases.acquire({
      ...scope,
      requestedLeaseId: 'lease.run.1',
      ownerId: 'worker.1',
      ttlMs: 60_000,
      acquiredAt: timestamp,
      idempotencyKey: 'acquire:lease.run.1',
    }))!;
    const authorization: RunLeaseAuthorization = {
      scope,
      guard: runLeaseGuard(lease),
    };
    const claimScope = {
      tenantId: scope.tenantId,
      userId: scope.userId,
      runId: scope.runId,
      stateId: 'state.plan',
      stateAttempt: 1,
    };
    const claim = (await first.stateClaims.acquire({
      ...claimScope,
      requestedClaimId: 'claim.state.1',
      processRevision: 'process.example@1.0.0',
      expectedRunRevision: 1,
      runLease: authorization,
      ttlMs: 30_000,
      acquiredAt: '2026-07-21T06:00:01.000Z',
      idempotencyKey: 'acquire:claim.state.1',
    }))!;
    first.close();
    backbones.splice(backbones.indexOf(first), 1);

    const reopened = open(filename, schemaRegistry);
    await expect(reopened.events.latestSequence(scope)).resolves.toBe(1);
    await expect(
      reopened.runLeases.assertCurrent({
        scope,
        guard: runLeaseGuard(lease),
        checkedAt: '2026-07-21T06:00:02.000Z',
      })
    ).resolves.toEqual(lease);
    await expect(
      reopened.stateClaims.assertCurrent({
        scope: claimScope,
        guard: stateExecutionClaimGuard(claim),
        checkedAt: '2026-07-21T06:00:02.000Z',
      })
    ).resolves.toEqual(claim);
  });

  function open(filename: string, schemaRegistry: InMemoryEventSchemaRegistry): RuntimeBackbone {
    const backbone = createRuntimeBackbone({
      filename,
      schemaRegistry,
      now: () => timestamp,
    });
    backbones.push(backbone);
    return backbone;
  }
});

async function runtimeSchemas(): Promise<InMemoryEventSchemaRegistry> {
  const registry = new InMemoryEventSchemaRegistry();
  await registry.register({
    eventType: 'run.created',
    version: '1.0.0',
    schema: payloadSchema,
    schemaHash: hashCanonicalJson(payloadSchema),
  });
  return registry;
}

function temporaryDatabase(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-backbone-'));
  return path.join(root, 'runtime.sqlite');
}
