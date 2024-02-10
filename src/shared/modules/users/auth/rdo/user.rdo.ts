import { Expose } from 'class-transformer';

export class UserRDO {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;
}