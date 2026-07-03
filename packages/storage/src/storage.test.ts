import { describe, expect, it } from 'vitest';
import {
  assertStorageCapability,
  createFileArtifactStorageProfile,
  createKafkaStorageProfile,
  createLocalVectorStorageProfile,
  createMongoStorageProfile,
  createPineconeStorageProfile,
  createQdrantStorageProfile,
  createRedisStorageProfile,
  createSQLiteStorageProfile,
  redactStorageConnection,
  resolveStorageConnection,
  storageSpecJsonSchemas,
  storageTopologySpecDefinition,
  validateStorageProviderProfile,
  validateStorageTopologySpec,
} from './index';

describe('@hypha/storage contracts', () => {
  it('exports schema definitions and examples for storage profiles', () => {
    expect(
      validateStorageProviderProfile(storageTopologySpecDefinition.example.providers[0]).id
    ).toBe('storage.sqlite.structured');
    expect(
      validateStorageTopologySpec(storageTopologySpecDefinition.example).defaults.messagingRef
    ).toMatchObject({ id: 'storage.redis.messaging' });
    expect(
      validateStorageTopologySpec(storageTopologySpecDefinition.example).defaults.vectorRef
    ).toMatchObject({ id: 'storage.local-vector.semantic' });
    expect(storageSpecJsonSchemas.StorageProviderProfile.required).toContain('engine');
    expect(storageSpecJsonSchemas.StorageTopologySpec.required).toContain('providers');
    const profileProperties = storageSpecJsonSchemas.StorageProviderProfile.properties ?? {};
    const topologyProperties = storageSpecJsonSchemas.StorageTopologySpec.properties ?? {};
    expect((profileProperties.capabilities as any).items.enum).toEqual(
      expect.arrayContaining(['queue', 'pubsub'])
    );
    expect((topologyProperties.defaults as any).properties).toHaveProperty('messagingRef');
  });

  it('resolves MongoDB local and cloud connection profiles without leaking secrets', () => {
    const local = resolveStorageConnection(createMongoStorageProfile(), {});
    expect(local).toMatchObject({
      engine: 'mongodb',
      deployment: 'local',
      uriSource: 'composed',
      uri: 'mongodb://localhost:27017/hypha',
    });
    expect(local.tls).toBeUndefined();
    expect(createMongoStorageProfile().capabilities).not.toContain('managed_backup');

    const cloudProfile = createMongoStorageProfile({ tls: true });
    const cloud = resolveStorageConnection(cloudProfile, {
      MONGODB_URI: 'mongodb+srv://user:secret@example.mongodb.net/hypha',
    });
    expect(cloud.deployment).toBe('cloud');
    expect(cloud.uriSource).toBe('env');
    expect(cloudProfile.capabilities).toContain('tls');
    expect(redactStorageConnection(cloud).uri).toBe(
      'mongodb+srv://%3Credacted%3E:%3Credacted%3E@example.mongodb.net/hypha'
    );
  });

  it('resolves Redis local and TLS cloud profiles', () => {
    expect(createRedisStorageProfile()).toMatchObject({
      id: 'storage.redis.messaging',
      kind: 'messaging',
      role: 'message_queue',
      capabilities: ['cache', 'streams', 'queue', 'pubsub'],
    });

    const local = resolveStorageConnection(createRedisStorageProfile(), {});
    expect(local).toMatchObject({
      engine: 'redis',
      deployment: 'local',
      uri: 'redis://localhost:6379',
    });

    const cloud = resolveStorageConnection(createRedisStorageProfile({ tls: true }), {
      REDIS_URL: 'rediss://:secret@redis.example.com:6380/0',
    });
    expect(cloud.deployment).toBe('cloud');
    expect(cloud.uriSource).toBe('env');
    expect(redactStorageConnection(cloud).uri).toBe(
      'rediss://:%3Credacted%3E@redis.example.com:6380/0'
    );
  });

  it('checks declared storage capabilities', () => {
    const profile = createRedisStorageProfile();
    expect(() => assertStorageCapability(profile, 'cache')).not.toThrow();
    expect(() => assertStorageCapability(profile, 'vector_search')).toThrow(/vector_search/);
  });

  it('creates messaging profiles for queues and streams', () => {
    const kafka = createKafkaStorageProfile({ host: 'kafka.internal', tls: true });
    expect(kafka).toMatchObject({
      kind: 'messaging',
      engine: 'kafka',
      role: 'message_queue',
      capabilities: ['queue', 'pubsub', 'streams', 'tls'],
    });
    expect(resolveStorageConnection(kafka)).toMatchObject({
      uri: 'kafka+ssl://kafka.internal:9092',
      uriSource: 'composed',
    });
  });

  it('creates local relational, vector, and artifact profiles', () => {
    expect(createSQLiteStorageProfile({ role: 'event_log' })).toMatchObject({
      id: 'storage.sqlite.events',
      kind: 'event',
      role: 'event_log',
      capabilities: ['events', 'structured', 'transactions'],
    });
    expect(createLocalVectorStorageProfile()).toMatchObject({
      engine: 'local-vector',
      role: 'semantic_index',
      capabilities: ['vector_search', 'metadata_filter'],
    });
    expect(createFileArtifactStorageProfile()).toMatchObject({
      engine: 'file-artifact',
      role: 'artifact_store',
      capabilities: ['artifact_bytes'],
    });
  });

  it('creates managed and self-hosted vector database profiles', () => {
    const qdrant = createQdrantStorageProfile({
      deployment: 'self_hosted',
      host: 'qdrant.internal',
      port: 6333,
      tls: true,
    });
    expect(resolveStorageConnection(qdrant)).toMatchObject({
      engine: 'qdrant',
      deployment: 'self_hosted',
      uri: 'https://qdrant.internal:6333',
      uriSource: 'composed',
    });
    expect(qdrant.capabilities).toEqual(['vector_search', 'metadata_filter', 'tls']);

    const pinecone = createPineconeStorageProfile({
      uri: 'https://hypha-index.svc.pinecone.io',
    });
    expect(pinecone).toMatchObject({
      engine: 'pinecone',
      deployment: 'managed',
      secrets: { apiKey: { env: 'PINECONE_API_KEY' } },
    });
    expect(pinecone.capabilities).toContain('managed_backup');
  });
});
