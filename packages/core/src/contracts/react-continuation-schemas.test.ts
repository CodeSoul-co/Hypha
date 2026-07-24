import { describe, expect, it } from 'vitest';
import {
  continueReActCommandPayloadV1Example,
  reActContinuationContractJsonSchemas,
  reActQuantumDescriptorExample,
  validateContinueReActCommandPayload,
  validateReActQuantumDescriptor,
} from './react-continuation-schemas';

describe('ReAct continuation contracts', () => {
  it('exports versioned payload and descriptor schemas', () => {
    expect(validateContinueReActCommandPayload(continueReActCommandPayloadV1Example)).toEqual(
      continueReActCommandPayloadV1Example
    );
    expect(validateReActQuantumDescriptor(reActQuantumDescriptorExample)).toEqual(
      reActQuantumDescriptorExample
    );
    expect(reActContinuationContractJsonSchemas).toHaveProperty('ContinueReActCommandPayloadV1');
    expect(reActContinuationContractJsonSchemas).toHaveProperty('ReActQuantumDescriptor');
  });

  it('rejects unversioned payloads and incomplete integrity evidence', () => {
    expect(() =>
      validateContinueReActCommandPayload({
        ...continueReActCommandPayloadV1Example,
        version: '2.0.0',
      })
    ).toThrow();
    expect(() =>
      validateReActQuantumDescriptor({
        ...reActQuantumDescriptorExample,
        claimToken: '',
      })
    ).toThrow();
  });

  it('accepts an initial descriptor without Session command claim fields', () => {
    expect(reActQuantumDescriptorExample.trigger).toBe('continuation');
    if (reActQuantumDescriptorExample.trigger !== 'continuation') {
      throw new TypeError('Expected continuation descriptor example');
    }
    const {
      commandId: _commandId,
      commandPayloadHash: _commandPayloadHash,
      claimToken: _claimToken,
      leaseEpoch: _leaseEpoch,
      checkpointRef: _checkpointRef,
      checkpointHash: _checkpointHash,
      checkpointSequence: _checkpointSequence,
      ...base
    } = reActQuantumDescriptorExample;

    expect(validateReActQuantumDescriptor({ ...base, trigger: 'initial' })).toMatchObject({
      trigger: 'initial',
      runId: reActQuantumDescriptorExample.runId,
    });
  });
});
