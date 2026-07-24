import { describe, expect, it } from 'vitest';
import {
  createGovernedToolFamilyBindings,
  governedToolFamilySpecs,
  type GovernedToolFamilyPort,
} from './tool-families';

describe('governed Tool Family catalog', () => {
  it('separates read, write, external-write, and dangerous operations', () => {
    const byId = new Map(governedToolFamilySpecs.map((spec) => [spec.id, spec]));
    expect(byId.get('family.files.read')).toMatchObject({
      sideEffectLevel: 'read',
      permissionScope: ['workspace.files.read'],
    });
    expect(byId.get('family.files.write')).toMatchObject({
      sideEffectLevel: 'write',
      permissionScope: ['workspace.files.write'],
      humanApprovalPolicy: { required: true },
    });
    expect(byId.get('family.files.delete')).toMatchObject({
      sideEffectLevel: 'irreversible',
      permissionScope: ['workspace.files.delete'],
    });
    expect(byId.get('family.messaging.send')).toMatchObject({
      sideEffectLevel: 'external_effect',
      idempotencyPolicy: { mode: 'required' },
    });
    expect(byId.get('family.schedule.mutate')?.description).toContain('durable');
    expect(new Set(governedToolFamilySpecs.map((spec) => spec.id)).size).toBe(
      governedToolFamilySpecs.length
    );
  });

  it('requires an explicit port for every family and delegates with the Tool id', async () => {
    const calls: string[] = [];
    const port: GovernedToolFamilyPort = {
      async execute(input) {
        calls.push(input.toolId);
        return { toolId: input.toolId };
      },
    };
    const ports = Object.fromEntries(governedToolFamilySpecs.map((spec) => [spec.id, port]));
    const bindings = createGovernedToolFamilyBindings(ports);
    await expect(
      bindings[0]?.adapter.execute({
        toolId: governedToolFamilySpecs[0]!.id,
        input: { operation: 'list', path: '.' },
        context: { runId: 'run-1', stepId: 'step-1' },
      })
    ).resolves.toMatchObject({ output: { toolId: governedToolFamilySpecs[0]?.id } });
    expect(calls).toEqual([governedToolFamilySpecs[0]?.id]);
    expect(() => createGovernedToolFamilyBindings({})).toThrow(/port is missing/);
  });
});
