import type { ArtifactStorageRef } from '../../contracts/artifact';
import type { ArtifactStoreProvider } from '../../contracts/artifact-store';
import type { RuntimeActivityDescriptor } from '../../contracts/runtime-activity';
import { validateRuntimeActivityDescriptor } from '../../contracts/runtime-activity-schemas';
import { FrameworkError } from '../../errors';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';

const DESCRIPTOR_REF_PREFIX = 'artifact-ref:';

export interface RuntimeActivityDescriptorReference {
  activityDescriptorRef: string;
  activityDescriptorHash: string;
}

export interface RuntimeActivityDescriptorStore {
  put(descriptor: RuntimeActivityDescriptor): Promise<RuntimeActivityDescriptorReference>;
  get(reference: RuntimeActivityDescriptorReference): Promise<RuntimeActivityDescriptor>;
}

export interface ArtifactRuntimeActivityDescriptorStoreOptions {
  artifacts: ArtifactStoreProvider;
  maxDescriptorBytes?: number;
}

/** Persists immutable Activity descriptors outside HumanTask Events. */
export class ArtifactRuntimeActivityDescriptorStore implements RuntimeActivityDescriptorStore {
  private readonly maxDescriptorBytes: number;

  constructor(private readonly options: ArtifactRuntimeActivityDescriptorStoreOptions) {
    this.maxDescriptorBytes = positiveInteger(
      options.maxDescriptorBytes ?? 256 * 1024,
      'maxDescriptorBytes'
    );
  }

  async put(input: RuntimeActivityDescriptor): Promise<RuntimeActivityDescriptorReference> {
    const descriptor = validateRuntimeActivityDescriptor(input);
    const activityDescriptorHash = hashCanonicalJson(descriptor);
    const activityDigest = hashCanonicalJson(descriptor.activityId).slice('sha256:'.length);
    const content = new TextEncoder().encode(canonicalizeJson(descriptor));
    this.assertSize(content.byteLength);
    const digest = activityDescriptorHash.slice('sha256:'.length);
    const ref = await this.options.artifacts.put({
      operationId: `runtime-activity-descriptor:${activityDigest}`,
      objectKey: `runtime/activity-descriptors/${activityDigest}/${digest}.json`,
      content,
      expectedContentHash: activityDescriptorHash,
      sizeBytes: content.byteLength,
      mimeType: 'application/json',
      metadata: {
        activityId: descriptor.activityId,
        activityDescriptorHash,
      },
    });
    return {
      activityDescriptorRef: encodeArtifactRef(ref),
      activityDescriptorHash,
    };
  }

  async get(reference: RuntimeActivityDescriptorReference): Promise<RuntimeActivityDescriptor> {
    validHash(reference.activityDescriptorHash, 'activityDescriptorHash');
    const ref = decodeArtifactRef(reference.activityDescriptorRef);
    if (ref.storeId !== this.options.artifacts.id) {
      corrupt('Activity descriptor belongs to a different Artifact Store');
    }
    const artifact = await this.options.artifacts.get({
      ref,
      expectedContentHash: reference.activityDescriptorHash,
    });
    this.assertSize(artifact.sizeBytes);
    const bytes = await collect(artifact.stream, this.maxDescriptorBytes);
    if (bytes.byteLength !== artifact.sizeBytes) {
      corrupt('Activity descriptor size does not match Artifact metadata');
    }
    let decoded: unknown;
    try {
      decoded = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    } catch (error) {
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_STREAM_CORRUPT',
        message: 'Activity descriptor is not valid UTF-8 JSON',
        cause: error,
      });
    }
    if (hashCanonicalJson(decoded) !== reference.activityDescriptorHash) {
      corrupt('Activity descriptor hash does not match HumanTask evidence');
    }
    return validateRuntimeActivityDescriptor(decoded);
  }

  private assertSize(sizeBytes: number): void {
    if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 0) {
      corrupt('Activity descriptor size is invalid');
    }
    if (sizeBytes > this.maxDescriptorBytes) {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_EXHAUSTED',
        message: `Activity descriptor exceeds ${this.maxDescriptorBytes} bytes`,
      });
    }
  }
}

function encodeArtifactRef(ref: ArtifactStorageRef): string {
  return `${DESCRIPTOR_REF_PREFIX}${encodeURIComponent(ref.storeId)}:${encodeURIComponent(
    ref.objectKey
  )}`;
}

function decodeArtifactRef(value: string): ArtifactStorageRef {
  if (!value.startsWith(DESCRIPTOR_REF_PREFIX)) corrupt('Activity descriptor reference is invalid');
  const encoded = value.slice(DESCRIPTOR_REF_PREFIX.length);
  const separator = encoded.indexOf(':');
  if (separator < 1 || separator === encoded.length - 1) {
    corrupt('Activity descriptor reference is incomplete');
  }
  try {
    const storeId = decodeURIComponent(encoded.slice(0, separator));
    const objectKey = decodeURIComponent(encoded.slice(separator + 1));
    if (!storeId || !objectKey) corrupt('Activity descriptor reference is incomplete');
    return { storeId, objectKey };
  } catch (error) {
    throw new FrameworkError({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      message: 'Activity descriptor reference cannot be decoded',
      cause: error,
    });
  }
}

async function collect(stream: AsyncIterable<Uint8Array>, maxBytes: number): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let size = 0;
  for await (const chunk of stream) {
    size += chunk.byteLength;
    if (size > maxBytes) {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_EXHAUSTED',
        message: `Activity descriptor stream exceeds ${maxBytes} bytes`,
      });
    }
    chunks.push(chunk);
  }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) invalid(`${label} must be a positive integer`);
  return value;
}

function validHash(value: string, label: string): void {
  if (!/^sha256:[a-f0-9]{64}$/u.test(value)) invalid(`${label} must be a sha256 digest`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}
