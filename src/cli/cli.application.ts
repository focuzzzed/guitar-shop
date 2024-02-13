import { Command } from './command.interface';
import { CommandParser } from './command-parser';

type CommandsCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandsCollection = {};
  private readonly defaultCommand = '--help';

  public registerCommands(commandList: Command[]) {
    commandList.forEach((command) => {
      if(this.commands[command.getName()]) {
        throw new Error(`Command ${command.getName()} already registered`);
      }
      this.commands[command.getName()] = command;
    })
  }

  public getDefaultCommand() {
    if(!this.commands[this.defaultCommand]) {
      throw new Error(`Default command ${this.defaultCommand} is not registered`);
    }

    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string) {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public processCommand(argv: string[]) {
    const parsedCommand = CommandParser.parse(argv);
    const [ commandName ] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}