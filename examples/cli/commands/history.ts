/**
 * `orbit history <sessionId>` — GET /chat/:sessionId
 * Renders the Redis-stored conversation history for a given session.
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { apiGet } from '../http';
import { fmtDate } from './_util';

export function registerHistory(program: Command): void {
  program
    .command('history <sessionId>')
    .description('Show chat history for a session (GET /chat/:sessionId)')
    .option('-l, --limit <n>', 'Max messages to return', (v) => parseInt(v, 10))
    .action(async (sessionId: string, opts) => {
      try {
        const params: any = {};
        if (opts.limit) params.limit = opts.limit;
        const messages = await apiGet<any[]>(`/chat/${encodeURIComponent(sessionId)}`, params);
        if (!Array.isArray(messages) || messages.length === 0) {
          console.log(chalk.gray(`(no history for ${sessionId})`));
          return;
        }
        for (const m of messages) {
          const who = m.role === 'user' ? chalk.cyan('user') : chalk.green('assistant');
          const when = m.timestamp ? chalk.gray(fmtDate(m.timestamp)) : '';
          process.stdout.write(`${who}  ${when}\n`);
          process.stdout.write(m.content + '\n');
          if (m.modelId) {
            process.stdout.write(chalk.gray(`  ↳ ${m.modelId}/${m.modelProvider || '?'}\n`));
          }
          process.stdout.write('\n');
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });
}
