import { DefaultSerializedType, Entity, EntityIdType, Repository } from '../../types';
import { PrismaClientService } from '../models/prisma/client';

export abstract class BasePostgresRepository<
  EntityType extends Entity<EntityIdType, DocumentType>,
  DocumentType = DefaultSerializedType
> implements Repository<EntityType, DocumentType> {
  constructor(
    protected readonly client: PrismaClientService,
    private readonly createEntity: (document: DocumentType) => EntityType,
  ) { }

  protected createEntityFromDocument(document: DocumentType) {
    if(!document) {
      return null;
    }

    this.createEntity(document);
  }

  public async findById(id: EntityType['id']): Promise<EntityType> {
    throw new Error('Not Implemented');
  }

  public async save(entity: EntityType): Promise<EntityType> {
    throw new Error('Not Implemented');
  }

  public async update(id: EntityType['id'], entity: EntityType): Promise<EntityType> {
    throw new Error('Not Implemented');
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    throw new Error('Not Implemented');
  }
}