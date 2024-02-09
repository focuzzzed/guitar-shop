import { BasePostgresRepository, PrismaClientService } from '../../../libs';
import { UserEntity } from './user.entity';
import { AuthUser } from '../../../types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, AuthUser> {
  constructor(
    protected readonly client: PrismaClientService,
  ) { super(client, UserEntity.fromObject) }

  public async findByEmail(email: UserEntity['email']): Promise<UserEntity> {
    const document = await this.client.user.findFirst({
      where: { email }
    });

    return this.createEntityFromDocument(document);
  }

  public async save(entity: UserEntity): Promise<UserEntity> {
    const newRecord = await this.client.user.create({
      data: { ...entity.serialize() }
    });

    entity.id = newRecord.id;

    return entity;
  }
}