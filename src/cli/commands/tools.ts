/**
 * `orbit tools` — GET /tools + POST /tools/execute
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { apiGet, apiPost } from '../http';

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema?: any;
}

export function registerTools(program: Command): void {
  program
    .command('tools')
    .description('List registered tools (GET /tools)')
    .action(async () => {
      try {
        const tools = await apiGet<ToolDefinition[]>('/tools');
        if (tools.length === 0) { console.log(chalk.gray('(no tools registered)')); return; }
        for (const t of tools) {
          console.log(`${chalk.bold(t.name)}  ${chalk.gray('— ' + (t.description || ''))}`);
          if (t.inputSchema?.properties) {
            const required = new Set(t.inputSchema.required || []);
            for (const [name, spec] of Object.entries<any>(t.inputSchema.properties)) {
              const req = required.has(name) ? chalk.red('*') : ' ';
              console.log(`  ${req} ${chalk.cyan(name)}: ${spec.type || '?'}${spec.description ? chalk.gray('  // ' + spec.description) : ''}`);
            }
          }
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  program
    .command('exec <name>')
    .description('Run a tool with JSON params (POST /tools/execute)')
    .option('-p, --params <json>', 'JSON object of params, e.g. \'{"operation":"list","path":"."}\'')
    .action(async (name: string, opts) => {
      try {
        const params = opts.params ? JSON.parse(opts.params) : {};
        const data = await apiPost<any>('/tools/execute', { name, params });
        console.log(JSON.stringify(data, null, 2));
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });
}
