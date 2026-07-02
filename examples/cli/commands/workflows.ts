/**
 * `orbit workflows` — GET /workflows + POST /workflows/:name/execute
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { apiGet, apiPost } from '../http';

interface WorkflowDefinition {
  name: string;
  version: string;
  description?: string;
  stages: Array<{ id: string; type: string; next?: string; description?: string }>;
}

export function registerWorkflows(program: Command): void {
  program
    .command('workflows')
    .description('List loaded workflows (GET /workflows)')
    .action(async () => {
      try {
        const list = await apiGet<WorkflowDefinition[]>('/workflows');
        if (list.length === 0) { console.log(chalk.gray('(no workflows loaded)')); return; }
        for (const w of list) {
          console.log(`${chalk.bold(w.name)} ${chalk.gray('v' + w.version)}`);
          if (w.description) console.log(`  ${chalk.gray(w.description)}`);
          for (const s of w.stages || []) {
            const arr = `   ${s.id} (${chalk.cyan(s.type)})${s.next ? ' → ' + s.next : ''}`;
            console.log(arr);
            if (s.description) console.log(`      ${chalk.gray(s.description)}`);
          }
          console.log();
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  program
    .command('workflow-run <name>')
    .description('Execute a workflow (POST /workflows/:name/execute)')
    .option('-v, --version <v>', 'Workflow version', '1.0.0')
    .option('-c, --context <json>', 'JSON execution context. E.g. \'{"input":"hi"}\'')
    .action(async (name: string, opts) => {
      try {
        const context = opts.context ? JSON.parse(opts.context) : {};
        const data = await apiPost<any>(`/workflows/${encodeURIComponent(name)}/execute`, {
          version: opts.version,
          context,
        });
        console.log(JSON.stringify(data, null, 2));
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });
}
