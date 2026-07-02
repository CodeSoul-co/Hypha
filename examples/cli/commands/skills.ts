/**
 * `orbit skills` — GET /skills
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { apiGet } from '../http';

interface SkillConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  version?: string;
  triggers?: Array<{ type: string; pattern?: string }>;
}

export function registerSkills(program: Command): void {
  program
    .command('skills')
    .description('List loaded skills (GET /skills)')
    .action(async () => {
      try {
        const skills = await apiGet<SkillConfig[]>('/skills');
        if (skills.length === 0) { console.log(chalk.gray('(no skills loaded)')); return; }
        for (const s of skills) {
          const flag = s.enabled ? chalk.green('●') : chalk.gray('○');
          const trig = s.triggers?.length
            ? chalk.gray(`  triggers: ${s.triggers.map(t => `${t.type}${t.pattern ? `(${t.pattern})` : ''}`).join(', ')}`)
            : '';
          console.log(`${flag} ${chalk.bold(s.id)}  ${chalk.gray('— ' + s.name)}  ${chalk.gray('prio=' + s.priority)}`);
          if (s.description) console.log(`  ${chalk.gray(s.description)}`);
          if (trig) console.log(trig);
        }
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });
}
