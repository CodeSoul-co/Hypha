#!/usr/bin/env node
/**
 * `hypha` — example command-line client for the hypha API service.
 *
 * This binary is a presentation client over the REST API. It intentionally
 * does NOT re-implement business logic such as chat, auth, memory, or workflow
 * execution. Every command funnels through examples/cli/http.ts and hits the
 * same public endpoints a web or mobile client would use.
 *
 * Subcommands live in examples/cli/commands/*. Add a new command by creating a
 * file there that exports a Command and registering it below.
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { registerLogin, registerLogout, registerWhoami } from './commands/login';
import { registerChat } from './commands/chat';
import { registerHistory } from './commands/history';
import { registerModels } from './commands/models';
import { registerSkills } from './commands/skills';
import { registerSkillAdmin } from './commands/skill-admin';
import { registerTools } from './commands/tools';
import { registerWorkflows } from './commands/workflows';
import { registerUsage } from './commands/usage';
import { registerConfig } from './commands/config';
import { getHome, readToken, getBaseUrl } from './config';

const program = new Command();

program
  .name('hypha')
  .description('hypha CLI example — thin client over the REST API')
  .version('1.0.0');

// Shared pre-action: print where the CLI is talking to + which user.
program.hook('preAction', () => {
  if (program.opts().verbose) {
    const token = readToken();
    process.stderr.write(chalk.gray(`[hypha] base=${getBaseUrl()} user=${token?.email || 'anonymous'}\n`));
  }
});

registerLogin(program);
registerLogout(program);
registerWhoami(program);
registerChat(program);
registerHistory(program);
registerModels(program);
registerSkills(program);
registerSkillAdmin(program);
registerTools(program);
registerWorkflows(program);
registerUsage(program);
registerConfig(program);

// Default `hypha` with no args -> status line.
program.action(() => {
  const token = readToken();
  console.log(chalk.bold('hypha ') + chalk.gray('- hypha CLI example'));
  console.log(`  base:  ${chalk.cyan(getBaseUrl())}`);
  console.log(`  home:  ${chalk.cyan(getHome())}`);
  console.log(`  user:  ${token ? chalk.green(token.email) : chalk.yellow('not logged in')}  (${chalk.gray('hypha login')})`);
  console.log();
  console.log(`  Try:  ${chalk.cyan('hypha chat "hi"')}  |  ${chalk.cyan('hypha models')}  |  ${chalk.cyan('hypha usage')}`);
  console.log(`  Full: ${chalk.cyan('hypha --help')}`);
});

program.parseAsync(process.argv).catch((err) => {
  // Pretty-print the error from any command. Errors thrown by `unwrap()` in
  // http.ts already carry `code: message` format.
  const message = err?.message || String(err);
  console.error(chalk.red(`✗ ${message}`));
  process.exit(1);
});
