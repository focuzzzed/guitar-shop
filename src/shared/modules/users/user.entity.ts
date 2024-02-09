import { Entity, EntityIdType, AuthUser, DefaultSerializedType } from '../../types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './users.const';

export class UserEntity implements AuthUser, Entity<EntityIdType> {
  public id?: EntityIdType;
  public name: string;
  public email: string;
  public passwordHash: string;

  public populate(data: AuthUser) {
    this.id = data?.id;
    this.name = data.name;
    this.email = data.email;
    this.passwordHash = data.passwordHash;

    return this;
  }

  public serialize(): DefaultSerializedType {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<void> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser): UserEntity {
    return new UserEntity().populate(data);
  }
}