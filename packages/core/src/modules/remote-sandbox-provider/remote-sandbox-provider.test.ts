import { describe, expect, it } from 'vitest';
import {
  RemoteArtifactChunkSequenceValidator,
  remoteArtifactChunkExample,
  remoteArtifactChunkSequenceExpectationExample,
  remoteArtifactDownloadRequestExample,
  remoteArtifactTransferReceiptExample,
  remoteArtifactUploadRequestExample,
  remoteOutputStreamRequestExample,
  remoteSandboxProviderCapabilitiesExample,
  remoteSandboxProviderContractJsonSchemas,
  validateRemoteArtifactChunk,
  validateRemoteArtifactChunkSequence,
  validateRemoteArtifactDownloadRequest,
  validateRemoteArtifactTransferReceipt,
  validateRemoteArtifactUploadRequest,
  validateRemoteOutputStreamRequest,
  validateRemoteSandboxProviderCapabilities,
} from './index';

describe('Remote Sandbox Provider contract', () => {
  it('publishes and validates provider-neutral examples', () => {
    expect(Object.keys(remoteSandboxProviderContractJsonSchemas).sort()).toEqual([
      'RemoteArtifactChunk',
      'RemoteArtifactChunkSequenceExpectation',
      'RemoteArtifactDownloadRequest',
      'RemoteArtifactTransferReceipt',
      'RemoteArtifactUploadRequest',
      'RemoteOutputStreamRequest',
      'RemoteSandboxProviderCapabilities',
    ]);
    expect(
      validateRemoteSandboxProviderCapabilities(remoteSandboxProviderCapabilitiesExample)
    ).toMatchObject({ remoteExecution: true });
    expect(validateRemoteOutputStreamRequest(remoteOutputStreamRequestExample)).toEqual(
      remoteOutputStreamRequestExample
    );
    expect(validateRemoteArtifactUploadRequest(remoteArtifactUploadRequestExample)).toEqual(
      remoteArtifactUploadRequestExample
    );
    expect(validateRemoteArtifactDownloadRequest(remoteArtifactDownloadRequestExample)).toEqual(
      remoteArtifactDownloadRequestExample
    );
    expect(validateRemoteArtifactChunk(remoteArtifactChunkExample)).toEqual(
      remoteArtifactChunkExample
    );
    expect(validateRemoteArtifactTransferReceipt(remoteArtifactTransferReceiptExample)).toEqual(
      remoteArtifactTransferReceiptExample
    );
  });

  it('requires remoteExecution and rejects undeclared boundary fields', () => {
    expect(() =>
      validateRemoteSandboxProviderCapabilities({
        ...remoteSandboxProviderCapabilitiesExample,
        remoteExecution: false,
      })
    ).toThrow();
    expect(() =>
      validateRemoteOutputStreamRequest({ ...remoteOutputStreamRequestExample, vendorJob: 'raw' })
    ).toThrow();
    expect(() =>
      validateRemoteArtifactUploadRequest({
        ...remoteArtifactUploadRequestExample,
        idempotencyKey: '',
      })
    ).toThrow();
    expect(() =>
      validateRemoteArtifactDownloadRequest({
        ...remoteArtifactDownloadRequestExample,
        maxBytes: 0,
      })
    ).toThrow();
  });

  it('validates decoded chunk size and contiguous transfer ordering', () => {
    const first = {
      ...remoteArtifactChunkExample,
      content: 'YQ==',
      byteLength: 1,
      contentHash: 'sha256:chunk-a',
      final: false,
    };
    const second = {
      ...remoteArtifactChunkExample,
      sequence: 1,
      offsetBytes: 1,
      content: 'YmM=',
      byteLength: 2,
      contentHash: 'sha256:chunk-bc',
      final: true,
    };
    expect(
      validateRemoteArtifactChunkSequence(
        [first, second],
        remoteArtifactChunkSequenceExpectationExample
      )
    ).toEqual([first, second]);

    expect(() => validateRemoteArtifactChunk({ ...first, byteLength: 2 })).toThrow();
    expect(() =>
      validateRemoteArtifactChunkSequence(
        [first, { ...second, sequence: 2 }],
        remoteArtifactChunkSequenceExpectationExample
      )
    ).toThrow();
    expect(() =>
      validateRemoteArtifactChunkSequence(
        [{ ...first, final: true }, second],
        remoteArtifactChunkSequenceExpectationExample
      )
    ).toThrow();
    expect(() =>
      validateRemoteArtifactChunkSequence([first, second], {
        ...remoteArtifactChunkSequenceExpectationExample,
        sizeBytes: 4,
      })
    ).toThrow();
  });

  it('validates streamed Artifact chunks incrementally without buffering the transfer', () => {
    const validator = new RemoteArtifactChunkSequenceValidator(
      remoteArtifactChunkSequenceExpectationExample
    );
    const first = {
      ...remoteArtifactChunkExample,
      content: 'YQ==',
      byteLength: 1,
      contentHash: 'sha256:chunk-a',
      final: false,
    };
    const second = {
      ...remoteArtifactChunkExample,
      sequence: 1,
      offsetBytes: 1,
      content: 'YmM=',
      byteLength: 2,
      contentHash: 'sha256:chunk-bc',
      final: true,
    };

    expect(validator.push(first)).toEqual(first);
    expect(validator.progress()).toEqual({
      chunksValidated: 1,
      bytesValidated: 1,
      completed: false,
    });
    expect(validator.push(second)).toEqual(second);
    expect(validator.finish()).toEqual({
      chunksValidated: 2,
      bytesValidated: 3,
      completed: true,
    });
    expect(() => validator.push(second)).toThrow('after the final chunk');

    const truncated = new RemoteArtifactChunkSequenceValidator(
      remoteArtifactChunkSequenceExpectationExample
    );
    truncated.push(first);
    expect(() => truncated.finish()).toThrow('stream ended before a final chunk');
  });

  it('requires integrity evidence for completed transfer receipts', () => {
    expect(() =>
      validateRemoteArtifactTransferReceipt({
        ...remoteArtifactTransferReceiptExample,
        contentHash: undefined,
      })
    ).toThrow();
    expect(
      validateRemoteArtifactTransferReceipt({
        ...remoteArtifactTransferReceiptExample,
        status: 'accepted',
        contentHash: undefined,
      })
    ).toMatchObject({ status: 'accepted' });
  });
});
