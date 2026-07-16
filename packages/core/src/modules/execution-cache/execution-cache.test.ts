import { describe, expect, it } from 'vitest';
import {
  assessExecutionCacheReuse,
  canonicalizeExecutionFingerprintInput,
  executionCacheEntryProjectionExample,
  executionCacheJsonSchemas,
  executionCacheValidityInputExample,
  executionCommandFingerprintInputExample,
  executionEnvironmentFingerprintExample,
  validateExecutionCacheEntryProjection,
  validateExecutionCacheValidityInput,
  validateExecutionCommandFingerprintInput,
  validateExecutionEnvironmentFingerprint,
  validateExecutionEnvironmentFingerprintResolution,
} from './index';

describe('Execution Cache boundary contracts', () => {
  it('validates the engineering-spec fixtures', () => {
    expect(validateExecutionCacheValidityInput(executionCacheValidityInputExample)).toEqual(
      executionCacheValidityInputExample
    );
    expect(validateExecutionEnvironmentFingerprint(executionEnvironmentFingerprintExample)).toEqual(
      executionEnvironmentFingerprintExample
    );
    expect(
      validateExecutionCommandFingerprintInput(executionCommandFingerprintInputExample)
    ).toEqual(executionCommandFingerprintInputExample);
    expect(validateExecutionCacheEntryProjection(executionCacheEntryProjectionExample)).toEqual(
      executionCacheEntryProjectionExample
    );
  });

  it('exports JSON Schemas for every Cache boundary object', () => {
    expect(Object.keys(executionCacheJsonSchemas)).toEqual(
      expect.arrayContaining([
        'ExecutionCacheValidityInput',
        'ExecutionEnvironmentFingerprint',
        'ExecutionEnvironmentFingerprintResolution',
        'ExecutionCommandFingerprintInput',
        'ExecutionCacheArtifactReference',
        'ExecutionCacheResultMetadata',
        'ExecutionCacheEntryProjection',
      ])
    );
    expect(executionCacheJsonSchemas.ExecutionCacheEntryProjection.required).toContain('validity');
  });

  it('rejects unqualified hashes and missing validity inputs', () => {
    expect(() =>
      validateExecutionCacheValidityInput({
        ...executionCacheValidityInputExample,
        argsHash: 'not-qualified',
      })
    ).toThrow(/algorithm-qualified/u);
    const { networkPolicyHash: _networkPolicyHash, ...missingNetworkPolicy } =
      executionCacheValidityInputExample;
    expect(() => validateExecutionCacheValidityInput(missingNetworkPolicy)).toThrow();
  });

  it('fails closed when an environment cannot be proven stable', () => {
    const { imageDigest: _imageDigest, ...withoutImage } = executionEnvironmentFingerprintExample;
    expect(() =>
      validateExecutionEnvironmentFingerprint({
        ...withoutImage,
        platform: undefined,
        executableVersions: undefined,
      })
    ).toThrow(/image digest/u);
    expect(
      validateExecutionEnvironmentFingerprintResolution({
        status: 'unavailable',
        reason: 'Provider could not detect executable versions',
      })
    ).toEqual({
      status: 'unavailable',
      reason: 'Provider could not detect executable versions',
    });
    expect(() =>
      validateExecutionEnvironmentFingerprintResolution({ status: 'unavailable', reason: '' })
    ).toThrow();
  });

  it('rejects raw environment and Secret fields at the fingerprint boundary', () => {
    expect(() =>
      validateExecutionCommandFingerprintInput({
        ...executionCommandFingerprintInputExample,
        env: { TOKEN: 'plaintext' },
      })
    ).toThrow(/Unrecognized key/u);
    expect(() =>
      validateExecutionCommandFingerprintInput({
        ...executionCommandFingerprintInputExample,
        secretValues: ['plaintext'],
      })
    ).toThrow(/Unrecognized key/u);
  });

  it('keeps Cache projections bounded to metadata, references, and hashes', () => {
    expect(() =>
      validateExecutionCacheEntryProjection({
        ...executionCacheEntryProjectionExample,
        stdout: 'large output',
      })
    ).toThrow(/Unrecognized key/u);
    expect(() =>
      validateExecutionCacheEntryProjection({
        ...executionCacheEntryProjectionExample,
        artifacts: [
          ...executionCacheEntryProjectionExample.artifacts,
          executionCacheEntryProjectionExample.artifacts[0],
        ],
      })
    ).toThrow(/duplicate/u);
  });

  it('canonicalizes key order while preserving argument identity through its hash', () => {
    const reversed = {
      idempotencyKey: executionCommandFingerprintInputExample.idempotencyKey,
      secretVersionSetHash: executionCommandFingerprintInputExample.secretVersionSetHash,
      networkPolicyHash: executionCommandFingerprintInputExample.networkPolicyHash,
      environmentHash: executionCommandFingerprintInputExample.environmentHash,
      sourceTreeHash: executionCommandFingerprintInputExample.sourceTreeHash,
      relevantEnvHash: executionCommandFingerprintInputExample.relevantEnvHash,
      cwd: executionCommandFingerprintInputExample.cwd,
      argsHash: executionCommandFingerprintInputExample.argsHash,
      executable: executionCommandFingerprintInputExample.executable,
    };
    expect(canonicalizeExecutionFingerprintInput(reversed)).toBe(
      canonicalizeExecutionFingerprintInput(executionCommandFingerprintInputExample)
    );
  });

  it('blocks Result Cache reuse for unstable environments and external effects', () => {
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'none',
        environmentFingerprintStatus: 'resolved',
      })
    ).toEqual({ reusable: true });
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'write',
        environmentFingerprintStatus: 'unavailable',
      })
    ).toEqual({ reusable: false, reason: 'environment_fingerprint_unavailable' });
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'external_effect',
        environmentFingerprintStatus: 'resolved',
      })
    ).toEqual({ reusable: false, reason: 'external_side_effect' });
    expect(
      assessExecutionCacheReuse({
        sideEffectLevel: 'irreversible',
        environmentFingerprintStatus: 'resolved',
      })
    ).toEqual({ reusable: false, reason: 'irreversible_side_effect' });
  });
});
