#!usr/bin/env node

import { CLIApplication } from './cli/cli.application';
import { HelpCommand } from './cli/help.command';

function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new HelpCommand(),
  ])

  cliApplication.processCommand(process.argv);
}

bootstrap();