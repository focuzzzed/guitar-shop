#!usr/bin/env node

import { CLIApplication } from './cli/cli.application';
import { HelpCommand } from './cli/help.command';
import { SeedCommand } from './cli/seed.command';

function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new HelpCommand(),
    new SeedCommand(),
  ])

  cliApplication.processCommand(process.argv);
}

bootstrap();