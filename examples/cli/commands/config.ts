/**
 * `orbit config` — read/write ~/.orbit/config.json (baseUrl + model preferences)
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { getBaseUrl, readConfig, writeConfig, getHome } from '../config';
import { resetClient } from '../http';

export function registerConfig(program: Command): void {
  const cmd = new Command('config')
    .description('View/edit CLI config (stored in ~/.orbit/config.json)');

  cmd.command('show')
    .description('Print the current effective config')
    .action(() => {
      const cfg = readConfig() || { baseUrl: getBaseUrl() };
      console.log(JSON.stringify({ home: getHome(), ...cfg }, null, 2));
    });

  cmd.command('set-base <url>')
    .description('Set the backend base URL (e.g. http://192.168.1.5:3000/api/v1)')
    .action((url: string) => {
      const next = writeConfig({ baseUrl: url });
      resetClient();
      console.log(chalk.green(`✓ baseUrl = ${next.baseUrl}`));
    });

  cmd.command('set-model <provider> <model>')
    .description('Persist a default model so you don\'t have to pass --model every time')
    .action((provider: string, model: string) => {
      const next = writeConfig({ defaultProvider: provider, defaultModel: model });
      console.log(chalk.green(`✓ default = ${next.defaultProvider}/${next.defaultModel}`));
    });

  program.addCommand(cmd);
}
