import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  private readonly name = '--help';

  public getName(): string {
    return this.name;
  }

  public async execute(): Promise<void> {
    console.info(`
    Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --help:                                        # выводит информацию по доступным командам
            --generate <n> <connectionString>:             # наполняет базу данных <n> количеством постов по указанному пути <connectionString>
    `);
  }
}