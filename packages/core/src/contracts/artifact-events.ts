import type { ArtifactStatus } from './artifact';
import type { NormalizedArtifactError } from './artifact-manager';
import type { EventCreateInput, FrameworkEvent } from '../events';
import type { SpecRef } from '../specs';

export type ArtifactFrameworkEventType =
  | 'artifact.create.requested'
  | 'artifact.created'
  | 'artifact.deduplicated'
  | 'artifact.create.failed'
  | 'artifact.read.requested'
  | 'artifact.read.completed'
  | 'artifact.version.created'
  | 'artifact.finalized'
  | 'artifact.archived'
  | 'artifact.invalidated'
  | 'artifact.delete.requested'
  | 'artifact.delete.blocked'
  | 'artifact.deleted'
  | 'artifact.delete.failed'
  | 'artifact.lineage.recorded'
  | 'artifact.retention.expired'
  | 'artifact.gc.completed'
  | 'artifact.gc.failed';

export interface ArtifactEventPayload {
  operationId?: string;
  artifactId?: string;
  versionId?: string;
  logicalArtifactId?: string;
  profileRef?: SpecRef;
  workspaceId?: string;
  executionId?: string;
  artifactRefs?: string[];
  contentHash?: string;
  sizeBytes?: number;
  status?: ArtifactStatus;
  deduplicated?: boolean;
  candidateObjects?: number;
  deletedObjects?: number;
  missingObjects?: number;
  reclaimedBytes?: number;
  reason?: string;
  error?: NormalizedArtifactError;
  metadata?: Record<string, unknown>;
}

type ArtifactEventPayloadWithRequired<K extends keyof ArtifactEventPayload> =
  ArtifactEventPayload & Required<Pick<ArtifactEventPayload, K>>;

type ArtifactStatusEventPayload<S extends ArtifactStatus> = ArtifactEventPayloadWithRequired<
  'operationId' | 'artifactId' | 'versionId' | 'status'
> & { status: S };

export type ArtifactEventPayloadMap = {
  'artifact.create.requested': ArtifactEventPayloadWithRequired<
    'operationId' | 'workspaceId' | 'profileRef'
  >;
  'artifact.created': ArtifactStatusEventPayload<'draft'> &
    ArtifactEventPayloadWithRequired<'logicalArtifactId' | 'contentHash'>;
  'artifact.deduplicated': ArtifactEventPayloadWithRequired<
    'operationId' | 'artifactId' | 'versionId' | 'contentHash' | 'deduplicated'
  > & { deduplicated: true };
  'artifact.create.failed': ArtifactEventPayloadWithRequired<'operationId' | 'error'>;
  'artifact.read.requested': ArtifactEventPayloadWithRequired<'artifactId'>;
  'artifact.read.completed': ArtifactEventPayloadWithRequired<
    'artifactId' | 'versionId' | 'contentHash' | 'sizeBytes'
  >;
  'artifact.version.created': ArtifactEventPayloadWithRequired<
    | 'operationId'
    | 'artifactId'
    | 'versionId'
    | 'logicalArtifactId'
    | 'contentHash'
    | 'status'
  >;
  'artifact.finalized': ArtifactStatusEventPayload<'final'>;
  'artifact.archived': ArtifactStatusEventPayload<'archived'>;
  'artifact.invalidated': ArtifactStatusEventPayload<'invalidated'>;
  'artifact.delete.requested': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId'>;
  'artifact.delete.blocked': ArtifactEventPayloadWithRequired<
    'operationId' | 'artifactId' | 'error'
  >;
  'artifact.deleted': ArtifactEventPayloadWithRequired<
    'operationId' | 'artifactId' | 'status'
  > & { status: 'deleted' };
  'artifact.delete.failed': ArtifactEventPayloadWithRequired<
    'operationId' | 'artifactId' | 'error'
  >;
  'artifact.lineage.recorded': ArtifactEventPayloadWithRequired<'artifactId' | 'artifactRefs'>;
  'artifact.retention.expired': ArtifactEventPayloadWithRequired<'artifactId' | 'versionId'>;
  'artifact.gc.completed': ArtifactEventPayloadWithRequired<
    | 'operationId'
    | 'candidateObjects'
    | 'deletedObjects'
    | 'missingObjects'
    | 'reclaimedBytes'
  >;
  'artifact.gc.failed': ArtifactEventPayloadWithRequired<'operationId' | 'error'>;
};

export type ArtifactFrameworkEvent<
  TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType,
> = Omit<FrameworkEvent<ArtifactEventPayloadMap[TType]>, 'type'> & { type: TType };

export type ArtifactEventCreateInput<
  TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType,
> = Omit<EventCreateInput<ArtifactEventPayloadMap[TType]>, 'type'> & { type: TType };

export type ArtifactEventPublication<
  TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType,
> = {
  id: string;
  type: TType;
  timestamp: string;
  payload: ArtifactEventPayloadMap[TType];
  workspaceId?: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
};

/** Runtime-owned adapters must durably and idempotently publish by publication ID. */
export interface ArtifactEventPublisher {
  publish(publication: ArtifactEventPublication): Promise<void>;
}
