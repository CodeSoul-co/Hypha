/**
 * `orbit usage` — GET /usage/stats + GET /usage/pricing
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { apiGet } from '../http';

export function registerUsage(program: Command): void {
  program
    .command('usage')
    .description('Show token usage statistics (GET /usage/stats)')
    .action(async () => {
      try {
        const data = await apiGet<any>('/usage/stats');
        const s = data.summary;
        console.log(chalk.bold('Summary'));
        console.log(`  requests:    ${chalk.cyan(s.requestCount)}`);
        console.log(`  prompt:      ${chalk.cyan(s.totalPromptTokens)}`);
        console.log(`  completion:  ${chalk.cyan(s.totalCompletionTokens)}`);
        console.log(`  total:       ${chalk.cyan(s.totalTokens)}`);
        console.log(`  cost (USD):  ${chalk.cyan('$' + (s.totalCost || 0).toFixed(6))}`);
        if (data.byModel?.length) {
          console.log();
          console.log(chalk.bold('By model'));
          for (const m of data.byModel) {
            console.log(
              `  ${m.modelId.padEnd(28)} prov=${chalk.gray(m.modelProvider.padEnd(12))} ` +
              `tokens=${chalk.cyan(String(m.totalTokens).padStart(6))} ` +
              `cost=$${(m.totalCost || 0).toFixed(6)} reqs=${m.requestCount}`,
            );
          }
        }
        if (data.daily?.length) {
          console.log();
          console.log(chalk.bold('Daily'));
          // Server returns `{date, totalTokens, totalCost, requestCount, ...}` —
          // not the raw aggregation `{_id: {year, month, day}}` shape.
          for (const d of data.daily.slice(-7)) {
            const day = d.date || '—';
            console.log(`  ${day}  tokens=${String(d.totalTokens).padStart(6)}  cost=$${(d.totalCost || 0).toFixed(6)}  reqs=${d.requestCount}`);
          }
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  program
    .command('pricing')
    .description('Show model pricing reference (GET /usage/pricing)')
    .action(async () => {
      try {
        const data = await apiGet<any[]>('/usage/pricing');
        console.log(chalk.bold('Pricing (USD per 1M tokens)'));
        for (const p of data) {
          const hit = p.cacheHitPricePerM !== undefined && p.cacheHitPricePerM !== p.inputPricePerM
            ? `  cacheHit=$${p.cacheHitPricePerM}` : '';
          console.log(
            `  ${p.modelId.padEnd(28)}  in=$${p.inputPricePerM}/M  out=$${p.outputPricePerM}/M${hit}`,
          );
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });
}
