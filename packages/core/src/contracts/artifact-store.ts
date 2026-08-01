import type { ArtifactStorageRef } from './artifact';
import type { ProviderHealth } from './execution';

export type ArtifactByteSource = Uint8Array | AsyncIterable<Uint8Array>;

export interface ArtifactByteRange {
  start: number;
  endInclusive?: number;
}

export interface ArtifactStoreCapabilities {
  versioning: boolean;
  rangeRead: boolean;
  signedAccess: boolean;
  serverSideCopy: boolean;
  encryption: boolean;
  multipartUpload: boolean;
  contentAddressing: boolean;
}

export interface ArtifactPutRequest {
  operationId: string;
  objectKey: string;
  content: ArtifactByteSource;
  expectedContentHash?: string;
  sizeBytes?: number;
  mimeType?: string;
  metadata?: Record<string, string>;
  ifAbsent?: boolean;
}

export interface ArtifactGetRequest {
  ref: ArtifactStorageRef;
  range?: ArtifactByteRange;
  expectedContentHash?: string;
}

export interface ArtifactContent {
  stream: AsyncIterable<Uint8Array>;
  contentHash: string;
  sizeBytes: number;
  mimeType?: string;
  etag?: string;
  range?: ArtifactByteRange;
}

export interface ArtifactObjectMetadata {
  contentHash: string;
  sizeBytes: number;
  mimeType?: string;
  etag?: string;
  lastModifiedAt?: string;
  metadata?: Record<string, string>;
}

export interface ArtifactCopyRequest {
  operationId: string;
  source: ArtifactStorageRef;
  targetObjectKey: string;
  ifAbsent?: boolean;
}

export interface ArtifactDownloadAccessRequest {
  ref: ArtifactStorageRef;
  expiresInSeconds: number;
  responseMimeType?: string;
  responseFilename?: string;
}

export interface ArtifactDownloadAccess {
  method: 'GET';
  url: string;
  expiresAt: string;
  headers?: Record<string, string>;
}

export interface ArtifactStoreProvider {
  readonly id: string;
  capabilities(): Promise<ArtifactStoreCapabilities>;
  put(request: ArtifactPutRequest): Promise<ArtifactStorageRef>;
  get(request: ArtifactGetRequest): Promise<ArtifactContent>;
  head(ref: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null>;
  exists(ref: ArtifactStorageRef): Promise<boolean>;
  delete(ref: ArtifactStorageRef): Promise<void>;
  copy(request: ArtifactCopyRequest): Promise<ArtifactStorageRef>;
  createDownloadAccess?(request: ArtifactDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}

export interface ArtifactStoreProviderFactory {
  readonly providerId: string;
  create(): ArtifactStoreProvider | Promise<ArtifactStoreProvider>;
}
