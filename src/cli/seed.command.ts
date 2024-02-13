import { Command } from './command.interface';
import { PrismaClient } from '@prisma/client';
import { generateProducts } from '../shared/helpers';
import { UserEntity } from '../shared/modules/users/user';

  const DEFAULT_ADMIN_DATA = {
    EMAIL: 'admin@default.local',
    NAME: 'admin',
    PASSWORD_HASH: '',
    PASSWORD: 'admin1'
  } as const;

export class SeedCommand implements Command {
  private readonly name = "--generate";

  public getName(): string {
    return this.name;
  }

  public async execute(count: string, connectionString: string): Promise<void> {
    const prismaClient = new PrismaClient({
      datasourceUrl: connectionString
    });

    try {
      await prismaClient.product.createMany({
        data: [...generateProducts(Number(count))]
      });
      console.log(`Successfully created ${count} products`);
    } catch (err) {
      throw new Error(`Error while seeding the database: ${err.message}`);
    }

    try {
      const defaultAdmin = await UserEntity.fromObject({
        name: DEFAULT_ADMIN_DATA.NAME,
        email: DEFAULT_ADMIN_DATA.EMAIL,
        passwordHash: DEFAULT_ADMIN_DATA.PASSWORD_HASH
      }).setPassword(DEFAULT_ADMIN_DATA.PASSWORD)

      await prismaClient.user.create({
        data: { ...defaultAdmin.serialize() }
      });
      console.log(`Successfully created user with email: ${DEFAULT_ADMIN_DATA.EMAIL} and password: ${DEFAULT_ADMIN_DATA.PASSWORD}`);
    } catch {
      throw new Error(`Default admin already exists`);
    }
  }
}