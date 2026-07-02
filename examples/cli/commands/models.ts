/**
 * `orbit models` — GET /models + GET /models/health + POST /models/switch
 * `orbit defaults` — GET /models/defaults/current
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { apiGet, apiPost } from '../http';
import { writeConfig } from '../config';

interface ModelInfo {
  id: string;
  provider: string;
  displayName?: string;
  contextWindow?: number;
  description?: string;
  supportedFeatures?: { streaming?: boolean; toolCalling?: boolean; vision?: boolean };
}

export function registerModels(program: Command): void {
  program
    .command('models')
    .description('List available models (GET /models)')
    .option('-p, --provider <name>', 'Filter to a single provider')
    .option('--ids', 'Print only model ids (one per line) — easier for piping into --model)')
    .action(async (opts) => {
      try {
        const all = await apiGet<ModelInfo[]>('/models', opts.provider ? { provider: opts.provider } : undefined);
        if (opts.ids) {
          for (const m of all) process.stdout.write(m.id + '\n');
          return;
        }
        // Group by provider for readability.
        const byProvider = new Map<string, ModelInfo[]>();
        for (const m of all) {
          const k = m.provider || 'unknown';
          if (!byProvider.has(k)) byProvider.set(k, []);
          byProvider.get(k)!.push(m);
        }
        for (const [prov, list] of [...byProvider.entries()].sort()) {
          console.log(chalk.bold(chalk.cyan(prov)));
          for (const m of list) {
            const ctx = m.contextWindow ? `ctx=${m.contextWindow}` : '';
            process.stdout.write(`  ${m.id.padEnd(34)} ${m.displayName ? chalk.gray(m.displayName) : ''} ${ctx ? chalk.gray(ctx) : ''}\n`);
          }
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  program
    .command('health')
    .description('Show LLM provider health (GET /models/health)')
    .action(async () => {
      try {
        const data = await apiGet<any>('/models/health');
        const defaultMark = (id: string) => id === data.defaultProvider ? chalk.green(' (default)') : '';
        console.log(`${data.healthy ? chalk.green('healthy') : chalk.red('unhealthy')} • default: ${data.defaultProvider}/${data.defaultModel}`);
        for (const p of data.providers || []) {
          console.log(`  ${p.id}${defaultMark(p.id)}: ${p.healthy ? chalk.green('ok') : chalk.red('down')}`);
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  program
    .command('switch <provider> <model>')
    .description('Switch the server-side default model (POST /models/switch)')
    .action(async (provider: string, model: string) => {
      try {
        const data = await apiPost<any>('/models/switch', { provider, model });
        console.log(chalk.green(`✓ default → ${data.defaultProvider}/${data.defaultModel}`));
        // Mirror to local config so subsequent `orbit chat` calls use it.
        writeConfig({ defaultProvider: data.defaultProvider, defaultModel: data.defaultModel });
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  program
    .command('defaults')
    .description('Show server-side default model (GET /models/defaults/current)')
    .action(async () => {
      try {
        const data = await apiGet<any>('/models/defaults/current');
        console.log(`${data.defaultProvider}/${data.defaultModel}`);
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });
}
