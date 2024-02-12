import { Injectable } from '@nestjs/common';
import { BasePostgresRepository, PrismaClientService } from '../../../libs';
import { ProductEntity } from './product.entity';
import { PaginationResult, Product } from '../../../types';
import { ProductQuery } from '../query/product.query';
import { Prisma } from '@prisma/client';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository extends BasePostgresRepository<ProductEntity, Product> {
  constructor(
    protected readonly client: PrismaClientService
  ) { super(client, ProductEntity.fromObject) }

  public async find(query?: ProductQuery): Promise<PaginationResult<ProductEntity>> {
    const skip = query?.limit && query?.page
      ? (query.page - 1) * query.limit
      : undefined;
    const take = query?.limit;
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    const sortField = query?.sortField;

    if(query?.guitarTypes) {
      where.guitarType = {
        in: query.guitarTypes,
      }
    }

    if(query?.stringsCount) {
      where.stringsCount = {
        in: query.stringsCount,
      }
    }

    if(query?.sortField && query?.sortDirection) {
      orderBy[sortField] = query.sortDirection;
    }

    const [records, productCount] = await Promise.all([
      this.client.product.findMany({ where, orderBy, skip, take }),
      this.getProductsCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record as Product)),
      totalItems: productCount,
      currentPage: query?.page,
      totalPages: this.calculateProductPage(productCount, take),
      itemsPerPage: take,
    }
  }

  private async getProductsCount(where: Prisma.ProductWhereInput): Promise<number> {
    return this.client.product.count({ where });
  }

  private calculateProductPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async getById(id: string) {
    const document = await this.client.product.findFirst({
      where: { id },
    });

    return this.createEntityFromDocument(document as Product);
  }

  public async save(entity: ProductEntity): Promise<ProductEntity> {
    const newRecord = await this.client.product.create({
      data: {...entity.serialize()}
    });

    return this.createEntityFromDocument(newRecord as Product);
  }

  public async update(id: string, dto: UpdateProductDTO): Promise<ProductEntity> {
    const updatedRecord = await this.client.product.update({
      where: { id },
      data: { ...dto },
    })

    return this.createEntityFromDocument(updatedRecord as Product);
  }

  public async delete(id: string): Promise<void> {
    await this.client.product.delete({
      where: { id },
    });
  }
}