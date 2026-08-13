import { describe, expect, it } from 'vitest';
import {
  migratePostgresExecutionStore,
  POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
  PostgresExecutionStoreSchemaVersionError,
  type PostgresExecutionStoreSchemaClient,
  type PostgresExecutionStoreSchemaQueryResult,
} from './postgres-execution-store-schema';

describe('Postgres Execution Store schema', () => {
  it('creates the durable schema under a transaction-scoped migration lock', async () => {
    const client = new RecordingSchemaClient([]);

    await migratePostgresExecutionStore(client);

    expect(client.commands[0]).toEqual({ text: 'BEGIN', values: undefined });
    expect(client.commands[1]).toMatchObject({
      text: 'SELECT pg_advisory_xact_lock($1)',
      values: [expect.any(Number)],
    });
    expect(client.commands.at(-1)).toEqual({ text: 'COMMIT', values: undefined });
    expect(client.sql()).toContain('CREATE TABLE execution_records');
    expect(client.sql()).toContain('record_json JSONB NOT NULL');
    expect(client.sql()).toContain('last_fencing_token BIGINT NOT NULL');
    expect(client.sql()).toContain('CREATE TABLE execution_create_idempotency');
    expect(client.sql()).toContain('CREATE TABLE execution_mutation_idempotency');
    expect(client.sql()).toContain('CREATE TABLE execution_lease_history');
    expect(client.sql()).toContain('CREATE TABLE execution_record_quarantine');
    expect(client.sql()).toContain('CREATE UNIQUE INDEX execution_records_scoped_idempotency');
    expect(client.commands).toContainEqual({
      text: expect.stringContaining('INSERT INTO hypha_execution_store_schema'),
      values: [POSTGRES_EXECUTION_STORE_SCHEMA_VERSION],
    });
  });

  it('does not reapply an already current schema', async () => {
    const client = new RecordingSchemaClient([
      { rows: [{ version: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION }] },
    ]);

    await migratePostgresExecutionStore(client);

    expect(client.sql()).not.toContain('CREATE TABLE execution_records');
    expect(client.sql()).not.toContain('INSERT INTO hypha_execution_store_schema');
    expect(client.commands.at(-1)).toEqual({ text: 'COMMIT', values: undefined });
  });

  it('rejects a newer schema and rolls back without applying changes', async () => {
    const client = new RecordingSchemaClient([
      { rows: [{ version: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION + 1 }] },
    ]);

    await expect(migratePostgresExecutionStore(client)).rejects.toEqual(
      new PostgresExecutionStoreSchemaVersionError(
        POSTGRES_EXECUTION_STORE_SCHEMA_VERSION + 1,
        POSTGRES_EXECUTION_STORE_SCHEMA_VERSION
      )
    );
    expect(client.sql()).not.toContain('CREATE TABLE execution_records');
    expect(client.commands.at(-1)).toEqual({ text: 'ROLLBACK', values: undefined });
  });

  it('rejects an invalid persisted schema version', async () => {
    const client = new RecordingSchemaClient([{ rows: [{ version: 'invalid' }] }]);

    await expect(migratePostgresExecutionStore(client)).rejects.toMatchObject({
      name: 'PostgresExecutionStoreSchemaVersionError',
      current: Number.NaN,
      supported: POSTGRES_EXECUTION_STORE_SCHEMA_VERSION,
    });
    expect(client.commands.at(-1)).toEqual({ text: 'ROLLBACK', values: undefined });
  });

  it('rolls back schema creation and preserves the original migration error', async () => {
    const migrationFailure = new Error('schema creation failed');
    const client = new RecordingSchemaClient([], {
      failWhen: (text) => text.includes('CREATE TABLE execution_lease_history'),
      failure: migrationFailure,
      rollbackFailure: new Error('rollback failed'),
    });

    await expect(migratePostgresExecutionStore(client)).rejects.toBe(migrationFailure);
    expect(client.commands.at(-1)).toEqual({ text: 'ROLLBACK', values: undefined });
    expect(client.sql()).not.toContain('INSERT INTO hypha_execution_store_schema');
    expect(client.sql()).not.toContain('COMMIT');
  });
});

interface RecordedCommand {
  text: string;
  values: readonly unknown[] | undefined;
}

interface RecordingSchemaClientOptions {
  failWhen?(text: string): boolean;
  failure?: Error;
  rollbackFailure?: Error;
}

class RecordingSchemaClient implements PostgresExecutionStoreSchemaClient {
  readonly commands: RecordedCommand[] = [];
  private readonly queryResults: PostgresExecutionStoreSchemaQueryResult[];

  constructor(
    queryResults: PostgresExecutionStoreSchemaQueryResult[],
    private readonly options: RecordingSchemaClientOptions = {}
  ) {
    this.queryResults = [...queryResults];
  }

  async query(
    text: string,
    values?: readonly unknown[]
  ): Promise<PostgresExecutionStoreSchemaQueryResult> {
    this.commands.push({ text, values });
    if (text === 'ROLLBACK' && this.options.rollbackFailure) {
      throw this.options.rollbackFailure;
    }
    if (this.options.failWhen?.(text)) {
      throw this.options.failure ?? new Error('query failed');
    }
    if (text.startsWith('SELECT version')) return this.queryResults.shift() ?? { rows: [] };
    return { rows: [] };
  }

  sql(): string {
    return this.commands.map(({ text }) => text).join('\n');
  }
}
