import fs from 'fs/promises';
import path from 'path';
import { Command } from 'commander';
import chalk from 'chalk';
import YAML from 'yaml';
import { apiGet, apiPost } from '../http';

interface OutputOptions {
  json?: boolean;
}

export function registerMemoryAdministration(program: Command): void {
  const memory = program.command('memory').description('Administer canonical Memory');
  const profile = memory.command('profile').description('Inspect Memory profiles');
  profile
    .command('validate [file]')
    .description('Strictly validate a Memory profile document')
    .option('--json', 'Print machine-readable JSON')
    .action(async (file: string | undefined, options: OutputOptions) => {
      const body = file
        ? { document: YAML.parse(await fs.readFile(path.resolve(file), 'utf8')) as unknown }
        : undefined;
      const result = await apiPost<any>('/memory/admin/profile/validate', body);
      print(result, options, () => {
        console.log(
          `${chalk.bold('valid:')} ${result.valid ? chalk.green('yes') : chalk.red('no')}`
        );
        if (result.activeProfile) console.log(`profile: ${result.activeProfile}`);
        if (result.provider) {
          console.log(
            `provider: ${result.provider.id} (${result.provider.type}/${result.provider.deployment}) ` +
              `${result.provider.installed ? chalk.green('installed') : chalk.yellow('not installed')}`
          );
        }
        for (const issue of result.issues ?? []) {
          console.log(chalk.red(`- ${issue.path || '<root>'}: ${issue.message}`));
        }
      });
      if (!result.valid) throw new Error('Memory profile validation failed.');
    });

  memory
    .command('health')
    .description('Show Provider health, quota, latency and SLO state')
    .option('--json', 'Print machine-readable JSON')
    .action(async (options: OutputOptions) => {
      const result = await apiGet<any>('/memory/admin/health');
      print(result, options, () => {
        console.log(`${chalk.bold('provider:')} ${result.provider.id}`);
        console.log(`${chalk.bold('health:')} ${result.provider.status}`);
        const metrics = result.telemetry;
        if (!metrics) {
          console.log(chalk.yellow('telemetry: unavailable'));
          return;
        }
        console.log(
          `operations: ${metrics.operations.total} success=${metrics.operations.succeeded} ` +
            `failed=${metrics.operations.failed} inFlight=${metrics.operations.inFlight}`
        );
        console.log(
          `latency(ms): p50=${value(metrics.latencyMs.p50)} p95=${value(metrics.latencyMs.p95)} ` +
            `p99=${value(metrics.latencyMs.p99)}`
        );
        console.log(
          `cost: measured=${metrics.cost.measuredUnits} unpriced=${metrics.cost.unpricedOperations}`
        );
        console.log(`SLO: ${metrics.slo.status} ${metrics.slo.reasons.join(', ')}`.trim());
      });
    });

  const migration = memory.command('migration').description('Inspect retired migration evidence');
  migration
    .command('plan <migrationId>')
    .description('Inspect the archived migration checkpoint')
    .option('--user-id <id>', 'Inspect a specific user as an administrator')
    .option('--json', 'Print machine-readable JSON')
    .action(async (migrationId: string, options: OutputOptions & { userId?: string }) => {
      const result = await apiGet<any>(
        `/memory/admin/migrations/${encodeURIComponent(migrationId)}/plan`,
        options.userId ? { userId: options.userId } : undefined
      );
      printMigration(result, options);
    });

  memory
    .command('reconcile <migrationId>')
    .description('Confirm that the legacy path remains retired')
    .option('--user-id <id>', 'Inspect a specific user as an administrator')
    .option('--json', 'Print machine-readable JSON')
    .action(async (migrationId: string, options: OutputOptions & { userId?: string }) => {
      const result = await apiPost<any>(
        `/memory/admin/migrations/${encodeURIComponent(migrationId)}/reconcile`,
        options.userId ? { userId: options.userId } : undefined
      );
      printMigration(result, options);
    });

  const dlq = memory.command('dlq').description('Inspect Memory dead-letter tasks');
  dlq
    .command('inspect')
    .description('List redacted Memory lifecycle dead letters')
    .option('--worker-type <type>', 'Filter by lifecycle worker type')
    .option('--scope-hash <hash>', 'Filter by hashed Memory scope')
    .option('--json', 'Print machine-readable JSON')
    .action(async (options: OutputOptions & { workerType?: string; scopeHash?: string }) => {
      const result = await apiGet<any[]>('/memory/admin/dlq', {
        ...(options.workerType ? { workerType: options.workerType } : {}),
        ...(options.scopeHash ? { scopeHash: options.scopeHash } : {}),
      });
      print(result, options, () => {
        if (!result.length) {
          console.log(chalk.green('No Memory dead letters.'));
          return;
        }
        for (const item of result) {
          console.log(
            `${item.taskId} worker=${item.workerType} attempts=${item.attempts} ` +
              `error=${item.error.code} payload=${item.payloadHash}`
          );
        }
      });
    });
}

function printMigration(result: any, options: OutputOptions): void {
  print(result, options, () => {
    console.log(`${chalk.bold('migration:')} ${result.migrationId}`);
    console.log(`${chalk.bold('lifecycle:')} ${result.lifecycle}`);
    console.log(`legacy path: ${result.legacyPathAvailable ? 'available' : 'retired'}`);
    console.log(`checkpoint: ${result.checkpoint?.phase ?? 'not archived'}`);
  });
}

function printKeys(label: string, keys: string[]): void {
  if (keys.length) console.log(`${label}: ${keys.join(', ')}`);
}

function print(value: unknown, options: OutputOptions, human: () => void): void {
  if (options.json) console.log(JSON.stringify(value, null, 2));
  else human();
}

function value(input: number | null | undefined): string {
  return input === null || input === undefined ? 'n/a' : String(input);
}
